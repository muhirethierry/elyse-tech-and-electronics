export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Only POST requests are allowed.",
    });
  }

  try {
    const {
      name,
      email,
      phone,
      location,
      subject,
      message,
    } = req.body || {};

    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";
    const cleanPhone = typeof phone === "string" ? phone.trim() : "";
    const cleanLocation =
      typeof location === "string" ? location.trim() : "";
    const cleanSubject =
      typeof subject === "string" ? subject.trim() : "";
    const cleanMessage =
      typeof message === "string" ? message.trim() : "";

    if (!cleanName) {
      return res.status(400).json({
        success: false,
        error: "Your name is required.",
      });
    }

    if (!cleanEmail) {
      return res.status(400).json({
        success: false,
        error: "Your email address is required.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid email address.",
      });
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      return res.status(400).json({
        success: false,
        error: "Your message must contain at least 10 characters.",
      });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        success: false,
        error: "RESEND_API_KEY is missing on Vercel.",
      });
    }

    if (!process.env.MAIL_FROM) {
      return res.status(500).json({
        success: false,
        error: "MAIL_FROM is missing on Vercel.",
      });
    }

    if (!process.env.CONTACT_RECIPIENT) {
      return res.status(500).json({
        success: false,
        error: "CONTACT_RECIPIENT is missing on Vercel.",
      });
    }

    const resendResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.MAIL_FROM,
          to: [process.env.CONTACT_RECIPIENT],
          reply_to: cleanEmail,
          subject: `Website enquiry: ${
            cleanSubject || "New customer message"
          }`,
          text: [
            "NEW WEBSITE ENQUIRY",
            "",
            `Name: ${cleanName}`,
            `Email: ${cleanEmail}`,
            `Phone: ${cleanPhone || "Not provided"}`,
            `Location: ${cleanLocation || "Not provided"}`,
            `Subject: ${cleanSubject || "Not provided"}`,
            "",
            "Message:",
            cleanMessage,
          ].join("\n"),
        }),
      }
    );

    const responseText = await resendResponse.text();

    let resendData = {};

    try {
      resendData = responseText ? JSON.parse(responseText) : {};
    } catch {
      resendData = {
        message: responseText,
      };
    }

    if (!resendResponse.ok) {
      const errorMessage =
        typeof resendData.message === "string"
          ? resendData.message
          : typeof resendData.error === "string"
            ? resendData.error
            : "The email service could not send your message.";

      return res.status(502).json({
        success: false,
        error: errorMessage,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your enquiry was sent successfully.",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected server error occurred.",
    });
  }
}
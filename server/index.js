import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, existsSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

/*
|--------------------------------------------------------------------------
| Load environment variables
|--------------------------------------------------------------------------
*/

function loadEnvironment() {
  const envFile = path.join(rootDir, ".env");

  if (!existsSync(envFile)) {
    console.error("❌ The .env file was not found.");
    return;
  }

  const lines = readFileSync(envFile, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();

    let value = trimmedLine.slice(separatorIndex + 1).trim();

    value = value.replace(/^["']|["']$/g, "");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvironment();

/*
|--------------------------------------------------------------------------
| Environment information
|--------------------------------------------------------------------------
*/

console.log("==============================================");
console.log(
  "RESEND_API_KEY:",
  process.env.RESEND_API_KEY ? "Loaded ✅" : "Missing ❌"
);
console.log("MAIL_FROM:", process.env.MAIL_FROM || "Missing ❌");
console.log(
  "CONTACT_RECIPIENT:",
  process.env.CONTACT_RECIPIENT || "Missing ❌"
);
console.log("==============================================");

/*
|--------------------------------------------------------------------------
| Express application
|--------------------------------------------------------------------------
*/

const app = express();
const port = Number(process.env.PORT) || 3000;

app.disable("x-powered-by");

app.use(
  express.json({
    limit: "100kb",
  })
);

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function getCleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}

function getResendErrorMessage(data, statusCode) {
  if (typeof data === "string" && data.trim()) {
    return data.trim();
  }

  if (!data || typeof data !== "object") {
    return `Email service returned an error with status ${statusCode}.`;
  }

  if (typeof data.message === "string") {
    return data.message;
  }

  if (typeof data.error === "string") {
    return data.error;
  }

  if (
    data.error &&
    typeof data.error === "object" &&
    typeof data.error.message === "string"
  ) {
    return data.error.message;
  }

  if (Array.isArray(data.errors)) {
    const messages = data.errors
      .map((error) => {
        if (typeof error === "string") {
          return error;
        }

        if (error && typeof error.message === "string") {
          return error.message;
        }

        return null;
      })
      .filter(Boolean);

    if (messages.length > 0) {
      return messages.join(", ");
    }
  }

  return `Email service returned an error with status ${statusCode}.`;
}

async function readResponseBody(response) {
  const responseText = await response.text();

  if (!responseText) {
    return {};
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return responseText;
  }
}

/*
|--------------------------------------------------------------------------
| Test route
|--------------------------------------------------------------------------
*/

app.get("/api/health", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "Elyse Tech server is running.",
  });
});

/*
|--------------------------------------------------------------------------
| Contact route
|--------------------------------------------------------------------------
*/

app.post("/api/contact", async (req, res) => {
  console.log("\n========== NEW CONTACT REQUEST ==========");

  try {
    const {
      name,
      email,
      phone,
      location,
      subject,
      message,
    } = req.body ?? {};

    const cleanName = getCleanString(name);
    const cleanEmail = getCleanString(email).toLowerCase();
    const cleanPhone = getCleanString(phone);
    const cleanLocation = getCleanString(location);
    const cleanSubject = getCleanString(subject);
    const cleanMessage = getCleanString(message);

    console.log({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      location: cleanLocation,
      subject: cleanSubject,
      messageLength: cleanMessage.length,
    });

    /*
    |--------------------------------------------------------------------------
    | Form validation
    |--------------------------------------------------------------------------
    */

    if (!cleanName) {
      return res.status(400).json({
        success: false,
        error: "Your name is required.",
      });
    }

    if (cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid name.",
      });
    }

    if (!cleanEmail) {
      return res.status(400).json({
        success: false,
        error: "Your email address is required.",
      });
    }

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid email address.",
      });
    }

    if (!cleanMessage) {
      return res.status(400).json({
        success: false,
        error: "Your message is required.",
      });
    }

    if (cleanMessage.length < 10) {
      return res.status(400).json({
        success: false,
        error: "Your message must contain at least 10 characters.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Server configuration validation
    |--------------------------------------------------------------------------
    */

    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY is missing.");

      return res.status(500).json({
        success: false,
        error:
          "The email service is not configured. RESEND_API_KEY is missing.",
      });
    }

    if (!process.env.MAIL_FROM) {
      console.error("❌ MAIL_FROM is missing.");

      return res.status(500).json({
        success: false,
        error: "The email service is not configured. MAIL_FROM is missing.",
      });
    }

    if (!process.env.CONTACT_RECIPIENT) {
      console.error("❌ CONTACT_RECIPIENT is missing.");

      return res.status(500).json({
        success: false,
        error:
          "The email service is not configured. CONTACT_RECIPIENT is missing.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Send message through Resend
    |--------------------------------------------------------------------------
    */

    console.log("Sending email through Resend...");

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

    const resendData = await readResponseBody(resendResponse);

    console.log("----------------------------------------------");
    console.log("Resend status:", resendResponse.status);
    console.log("Resend response:", resendData);
    console.log("----------------------------------------------");

    /*
    |--------------------------------------------------------------------------
    | Handle Resend error
    |--------------------------------------------------------------------------
    */

    if (!resendResponse.ok) {
      const errorMessage = getResendErrorMessage(
        resendData,
        resendResponse.status
      );

      console.error("❌ Resend error:", errorMessage);

      return res.status(502).json({
        success: false,
        error: errorMessage,
      });
    }

    console.log("✅ Email sent successfully.");

    return res.status(200).json({
      success: true,
      message:
        "Your enquiry was sent successfully. We will contact you soon.",
    });
  } catch (error) {
    console.error("❌ Contact server error:", error);

    const errorMessage =
      error instanceof Error && error.message
        ? error.message
        : "An unexpected server error occurred.";

    return res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
});

/*
|--------------------------------------------------------------------------
| Serve the React production build
|--------------------------------------------------------------------------
*/

const distDir = path.join(rootDir, "dist");

if (existsSync(distDir)) {
  app.use(express.static(distDir));

  app.get("/{*splat}", (_req, res) => {
    return res.sendFile(path.join(distDir, "index.html"));
  });
}

/*
|--------------------------------------------------------------------------
| Handle unknown API routes
|--------------------------------------------------------------------------
*/

app.use("/api", (_req, res) => {
  return res.status(404).json({
    success: false,
    error: "The requested API route was not found.",
  });
});

/*
|--------------------------------------------------------------------------
| Start server
|--------------------------------------------------------------------------
*/

app.listen(port, () => {
  console.log("");
  console.log("==============================================");
  console.log(`🚀 Elyse Tech server running`);
  console.log(`🌐 Local address: http://localhost:${port}`);
  console.log(`🩺 Test server: http://localhost:${port}/api/health`);
  console.log("==============================================");
  console.log("");
})
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, existsSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

// Load .env manually
function loadEnvironment() {
  const envFile = path.join(rootDir, ".env");

  if (!existsSync(envFile)) {
    console.log("❌ .env file not found.");
    return;
  }

  const lines = readFileSync(envFile, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);

    if (!match || match[2].startsWith("#")) continue;

    process.env[match[1]] ??= match[2].replace(/^['"]|['"]$/g, "");
  }
}

loadEnvironment();

console.log("================================");
console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY ? "Loaded ✅" : "Missing ❌");
console.log("MAIL_FROM:", process.env.MAIL_FROM || "Missing");
console.log("CONTACT_RECIPIENT:", process.env.CONTACT_RECIPIENT || "Missing");
console.log("================================");

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json());

app.post("/api/contact", async (req, res) => {
  console.log("\n========== NEW CONTACT REQUEST ==========");

  const { name, email, phone, location, subject, message } = req.body ?? {};

  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim() : "";
  const cleanPhone = typeof phone === "string" ? phone.trim() : "";
  const cleanLocation = typeof location === "string" ? location.trim() : "";
  const cleanSubject = typeof subject === "string" ? subject.trim() : "";
  const cleanMessage = typeof message === "string" ? message.trim() : "";

  console.log({
    cleanName,
    cleanEmail,
    cleanPhone,
    cleanLocation,
    cleanSubject,
    cleanMessage,
  });

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({
      error: "Please fill in all required fields.",
    });
  }

  if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
    return res.status(400).json({
      error: "Invalid email address.",
    });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      error: "RESEND_API_KEY is missing.",
    });
  }

  if (!process.env.MAIL_FROM) {
    return res.status(500).json({
      error: "MAIL_FROM is missing.",
    });
  }

  try {
    console.log("Sending email...");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.MAIL_FROM,
        to: [process.env.CONTACT_RECIPIENT],
        reply_to: cleanEmail,
        subject: `Website enquiry: ${cleanSubject || "New Message"}`,
        text: `
Name: ${cleanName}

Email: ${cleanEmail}

Phone: ${cleanPhone || "Not provided"}

Location: ${cleanLocation || "Not provided"}

Subject: ${cleanSubject || "Not provided"}

Message:
${cleanMessage}
`,
      }),
    });

    const body = await response.text();

    console.log("--------------------------------");
    console.log("Resend Status:", response.status);
    console.log("Resend Response:");
    console.log(body);
    console.log("--------------------------------");

    if (!response.ok) {
      return res.status(response.status).json({
        error: body,
      });
    }

    console.log("✅ Email sent successfully.");

    return res.status(200).json({
      message: "Message sent successfully.",
    });
  } catch (err) {
    console.error("SERVER ERROR");
    console.error(err);

    return res.status(500).json({
      error: err.message,
    });
  }
});

const distDir = path.join(rootDir, "dist");

if (existsSync(distDir)) {
  app.use(express.static(distDir));

  app.get("/{*splat}", (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`\n🚀 Elyse Tech server running on http://localhost:${port}\n`);
});
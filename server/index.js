import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, existsSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

function loadEnvironment() {
  const envFile = path.join(rootDir, ".env");
  if (!existsSync(envFile)) return;

  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || match[2].startsWith("#")) continue;
    process.env[match[1]] ??= match[2].replace(/^['"]|['"]$/g, "");
  }
}

loadEnvironment();

const app = express();
const port = Number(process.env.PORT || 3000);
const recipient = process.env.CONTACT_RECIPIENT || "tmuhire06@gmail.com";

app.use(express.json({ limit: "20kb" }));

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};
  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim() : "";
  const cleanSubject = typeof subject === "string" ? subject.trim() : "";
  const cleanMessage = typeof message === "string" ? message.trim() : "";

  if (!cleanName || !/^\S+@\S+\.\S+$/.test(cleanEmail) || !cleanMessage) {
    return res.status(400).json({ error: "Please provide a name, valid email address, and message." });
  }

  if (!process.env.RESEND_API_KEY || !process.env.MAIL_FROM) {
    return res.status(503).json({ error: "Email delivery has not been configured yet." });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.MAIL_FROM,
        to: [recipient],
        reply_to: cleanEmail,
        subject: `Website enquiry: ${cleanSubject || "New message"}`,
        text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nSubject: ${cleanSubject || "Not provided"}\n\nMessage:\n${cleanMessage}`,
      }),
    });

    if (!response.ok) {
      console.error("Resend email error:", await response.text());
      return res.status(502).json({ error: "Email delivery failed. Please try again later." });
    }

    return res.status(200).json({ message: "Message sent." });
  } catch (error) {
    console.error("Email service error:", error);
    return res.status(502).json({ error: "Email delivery failed. Please try again later." });
  }
});

const distDir = path.join(rootDir, "dist");
if (existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get("/{*splat}", (_req, res) => res.sendFile(path.join(distDir, "index.html")));
}

app.listen(port, () => console.log(`Elyse Tech server running on http://localhost:${port}`));

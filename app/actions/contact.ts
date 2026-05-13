"use server";

import { supabase } from "@/lib/supabase";
import type { ContactResult, Lang } from "@/types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const resendEndpoint = "https://api.resend.com/emails";

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailBody(params: { name: string; email: string; message: string; lang: Lang }) {
  const subjectName = params.name.replace(/[\r\n]+/g, " ").slice(0, 90);
  const safeName = escapeHtml(params.name);
  const safeEmail = escapeHtml(params.email);
  const safeMessage = escapeHtml(params.message).replaceAll("\n", "<br />");
  const language = params.lang.toUpperCase();

  return {
    subject: `New portfolio contact: ${subjectName}`,
    text: [
      "New message from portfolio contact form",
      "",
      `Name: ${params.name}`,
      `Email: ${params.email}`,
      `Language: ${language}`,
      "",
      params.message
    ].join("\n"),
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111827; line-height: 1.6;">
        <h1 style="margin: 0 0 16px; font-size: 22px;">New portfolio contact</h1>
        <p style="margin: 0 0 8px;"><strong>Name:</strong> ${safeName}</p>
        <p style="margin: 0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
        <p style="margin: 0 0 18px;"><strong>Language:</strong> ${language}</p>
        <div style="padding: 16px; border-radius: 14px; background: #f3f4f6;">
          ${safeMessage}
        </div>
      </div>
    `
  };
}

async function sendContactEmail(params: { name: string; email: string; message: string; lang: Lang }): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return false;
  }

  const from = process.env.CONTACT_EMAIL_FROM?.trim() || "Nikita Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_EMAIL_TO?.trim() || "maestro_bluentano@proton.me";
  const emailBody = buildEmailBody(params);

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "nikita-kononenko-portfolio/1.0"
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((item) => item.trim()).filter(Boolean),
      subject: emailBody.subject,
      html: emailBody.html,
      text: emailBody.text,
      reply_to: params.email
    })
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Contact email delivery failed", response.status, details);
    return false;
  }

  return true;
}

export async function submitContact(formData: FormData): Promise<ContactResult> {
  const name = readField(formData, "name");
  const email = readField(formData, "email");
  const message = readField(formData, "message");
  const langValue = readField(formData, "lang");
  const lang: Lang = langValue === "ua" ? "ua" : "ru";

  if (!name || !email || !message) {
    return { success: false, error: "required" };
  }

  if (!emailPattern.test(email)) {
    return { success: false, error: "email" };
  }

  let databaseSaved = false;
  let databaseError: string | undefined;

  const { error } = await supabase.from("contacts").insert({
    name,
    email,
    message,
    lang
  });

  if (error) {
    databaseError = error.code || error.message;
    console.error("Contact database insert failed", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint
    });
  } else {
    databaseSaved = true;
  }

  let emailSent = false;

  try {
    emailSent = await sendContactEmail({ name, email, message, lang });
  } catch (emailError) {
    console.error("Contact email delivery failed", emailError);
  }

  if (databaseSaved || emailSent) {
    return { success: true, databaseSaved, emailSent };
  }

  return { success: false, error: databaseError ?? "delivery_failed" };
}

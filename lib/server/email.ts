import { z } from "zod";
import { RequestError } from "./request";

type EmailInput = { subject: string; text: string; replyTo?: string };

export async function sendOwnerEmail(input: EmailInput) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = process.env.CONTACT_EMAIL?.trim();
  const sender = process.env.RESEND_FROM_EMAIL?.trim();
  const emailSchema = z.string().email();
  if (!apiKey || !recipient || !sender || !emailSchema.safeParse(recipient).success || !emailSchema.safeParse(sender).success) {
    throw new RequestError(503, process.env.NODE_ENV === "production"
      ? "The form is temporarily unavailable. Please use a listed contact method or try again later."
      : "Email is not configured. Set RESEND_API_KEY, CONTACT_EMAIL and RESEND_FROM_EMAIL (a verified sender email address) in .env.local, then restart the server.");
  }

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: sender, to: [recipient], subject: input.subject, text: input.text, ...(input.replyTo ? { reply_to: input.replyTo } : {}) }),
      signal: AbortSignal.timeout(12_000),
      cache: "no-store",
    });
  } catch {
    // A timeout or connection failure can happen after the provider accepts an
    // email. Do not claim it was not sent or immediately encourage a duplicate.
    throw new RequestError(503, "We could not confirm delivery with the email service. Your submission may have reached Samuel. Please wait a few minutes before trying again.");
  }
  if (!response.ok) {
    // Avoid exposing provider response bodies, recipient details or credentials.
    await response.body?.cancel();
    throw new RequestError(502, "Your submission could not be delivered. Please try again later or use a listed contact method.");
  }
  const result: unknown = await response.json().catch(() => null);
  if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string" || !result.id) {
    throw new RequestError(502, "We could not confirm delivery with the email service. Your submission may have reached Samuel. Please wait a few minutes before trying again.");
  }
}

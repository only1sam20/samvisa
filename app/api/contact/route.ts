import { contactSchema } from "../../../lib/validation";
import { sendOwnerEmail } from "../../../lib/server/email";
import { handleRequestError, jsonResponse, prepareSubmission } from "../../../lib/server/request";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const result = contactSchema.safeParse(await prepareSubmission(request, "contact"));
    if (!result.success) {
      return jsonResponse({ ok: false, message: "Please check the highlighted fields and try again.", fieldErrors: result.error.flatten().fieldErrors }, 422);
    }
    const data = result.data;
    await sendOwnerEmail({
      subject: `Consultation request: ${data.service}`,
      replyTo: data.email,
      // Plain text prevents user-supplied HTML from being rendered in email.
      text: [
        "NEW CONSULTATION REQUEST",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Country: ${data.country}`,
        `Profession: ${data.profession}`,
        `Years of professional experience: ${data.experience}`,
        `Target service: ${data.service}`,
        `Preferred contact method: ${data.contactMethod}`,
        `LinkedIn: ${data.contactMethod === "LinkedIn" ? data.linkedin : "Not selected"}`,
        "\nCURRENT SITUATION", data.situation,
        "\nREQUESTED HELP", data.help,
        "\nPrivacy consent: given for handling this inquiry and replying to it.",
        `Submitted: ${new Date().toISOString()}`,
      ].join("\n"),
    });
    return jsonResponse({ ok: true, message: "Thank you. Your consultation request has been sent. Samuel will get back to you using your preferred contact method." });
  } catch (error) {
    return handleRequestError(error);
  }
}

import { reviewDisplayName, reviewSchema } from "../../../lib/validation";
import { sendOwnerEmail } from "../../../lib/server/email";
import { handleRequestError, jsonResponse, prepareSubmission } from "../../../lib/server/request";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const result = reviewSchema.safeParse(await prepareSubmission(request, "reviews"));
    if (!result.success) {
      return jsonResponse({ ok: false, message: "Please check the highlighted fields and try again.", fieldErrors: result.error.flatten().fieldErrors }, 422);
    }
    const data = result.data;
    // Optional future Supabase moderation: server-only insert into reviews with
    // id, name, professional_title, company, service, rating, review,
    // privacy_preference, approved: false, created_at. Never accept approved
    // from user input. Keep the service-role key server-side, enable RLS, expose
    // only approved rows through a sanitized public view, and require owner
    // authentication for moderation. This version emails submissions only.
    const anonymous = data.privacyPreference === "anonymous";
    await sendOwnerEmail({
      subject: `Review awaiting approval: ${data.service}`,
      text: [
        "TESTIMONIAL SUBMISSION — MODERATION REQUIRED",
        "approved: false",
        "This review has NOT been published. Verify authenticity and consent before publishing.",
        `Submitted name (private): ${data.name}`,
        `Professional title (private): ${data.professionalTitle}`,
        `Company (private): ${data.company || "Not provided"}`,
        `Service: ${data.service}`,
        `Rating: ${data.rating}/5`,
        `Privacy preference: ${data.privacyPreference}`,
        `Permitted public display name: ${reviewDisplayName(data)}`,
        ...(anonymous ? ["For anonymous publication, omit company, professional title and other identifying details."] : ["Respect the chosen name format; confirm identifying details before publication."]),
        "\nREVIEW", data.review,
        "\nPublication consent: explicitly given, subject to the privacy preference above.",
        "Do not publish the original submission email or private fields. Check the review text itself for identifying details.",
        `Submitted: ${new Date().toISOString()}`,
      ].join("\n"),
    });
    return jsonResponse({ ok: true, message: "Thank you for sharing your experience. Your review has been sent for moderation and will only appear after approval, with your selected privacy preference." });
  } catch (error) {
    return handleRequestError(error);
  }
}

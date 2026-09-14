import { z } from "zod";

export const serviceOptions = [
  "EB-1A Profile Development",
  "O-1A Profile Development",
  "FIET Fellowship",
  "FBCS Fellowship",
  "Scholarly Publication Strategy",
  "Citation Strategy",
  "Professional Profile Assessment",
  "Other",
] as const;

export const privacyOptions = ["full-name", "first-name", "anonymous"] as const;

function hasControlCharacter(value: string, multiline = false) {
  return Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    if (multiline && (code === 9 || code === 10 || code === 13)) return false;
    return code < 32 || code === 127;
  });
}

const service = z.string().refine((value) => serviceOptions.some((option) => option === value), "Please select a service.").pipe(z.enum(serviceOptions));

const singleLine = (label: string, minimum: number, maximum: number) =>
  z.string().trim().min(minimum, `${label} is required.`).max(maximum, `${label} must be ${maximum} characters or fewer.`)
    .refine((value) => !hasControlCharacter(value), `${label} must be a single line.`);

const paragraph = (label: string, minimum: number, maximum: number) =>
  z.string().trim().min(minimum, `Please enter at least ${minimum} characters for ${label.toLowerCase()}.`)
    .max(maximum, `${label} must be ${maximum} characters or fewer.`)
    .refine((value) => !hasControlCharacter(value, true), "Please remove unsupported control characters.");

const consent = z.boolean().refine((value) => value, "Please give your consent before submitting.");
const wholeNumber = (minimum: number, maximum: number, label: string) =>
  z.union([z.number(), z.string().trim().regex(/^\d{1,2}$/, `Enter a whole number for ${label}.`)])
    .transform(Number).pipe(z.number().int().min(minimum).max(maximum));

export const contactSchema = z.object({
  name: singleLine("Full name", 2, 100),
  email: z.string().trim().max(254).email("Enter a valid email address."),
  phone: singleLine("Phone number", 0, 40).default("").refine(
    (value) => !value || (/^[+()\d\s.-]+$/.test(value) && value.replace(/\D/g, "").length >= 7),
    "Enter a valid phone number, including the country code.",
  ),
  country: singleLine("Country", 2, 100),
  profession: singleLine("Profession / job title", 2, 150),
  experience: wholeNumber(0, 80, "years of experience"),
  service,
  situation: paragraph("Current situation", 10, 3000),
  help: paragraph("What you would like help with", 10, 3000),
  contactMethod: z.enum(["Email", "WhatsApp", "LinkedIn"]),
  linkedin: singleLine("LinkedIn profile", 0, 300).default(""),
  consent,
  website: z.string().max(200).default(""),
}).strict().superRefine((value, context) => {
  if (value.contactMethod === "WhatsApp" && !value.phone) {
    context.addIssue({ code: "custom", path: ["phone"], message: "Add your phone number so Samuel can contact you on WhatsApp." });
  }
  if (value.contactMethod === "LinkedIn") {
    let valid = false;
    try {
      const url = new URL(value.linkedin);
      valid = url.protocol === "https:" && !url.username && !url.password && !url.port &&
        (url.hostname === "linkedin.com" || url.hostname.endsWith(".linkedin.com")) && /^\/in\/[^/]+\/?$/.test(url.pathname);
    } catch { /* A missing or malformed profile URL receives the same field error. */ }
    if (!valid) {
      context.addIssue({ code: "custom", path: ["linkedin"], message: "Enter your LinkedIn profile URL, such as https://www.linkedin.com/in/your-name/." });
    }
  }
});

export const reviewSchema = z.object({
  name: singleLine("Full name", 2, 100),
  professionalTitle: singleLine("Professional title", 2, 150),
  company: singleLine("Company / organization", 0, 150).default(""),
  service,
  rating: wholeNumber(1, 5, "rating"),
  review: paragraph("Review / testimonial", 20, 3000),
  privacyPreference: z.enum(privacyOptions),
  consent,
  website: z.string().max(200).default(""),
}).strict();

export type ContactData = z.infer<typeof contactSchema>;
export type ReviewData = z.infer<typeof reviewSchema>;
export type FieldErrors = Record<string, string[] | undefined>;

export function reviewDisplayName(review: Pick<ReviewData, "name" | "privacyPreference">) {
  if (review.privacyPreference === "anonymous") return "Anonymous client";
  if (review.privacyPreference === "first-name") return review.name.split(/\s+/)[0];
  return review.name;
}

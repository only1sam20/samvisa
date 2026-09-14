// Replace these personal contact placeholders before launch.
export const siteConfig = {
  name: "Samuel Adeyemo",
  title: "Professional Profile Development Consultant",
  nationality: "Nigerian",
  location: "Nigeria",
  experience: "10+ Years",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.samueladeyemo.com").replace(/\/$/, ""),
  email: "YOUR_EMAIL",
  linkedin: "YOUR_LINKEDIN_URL",
  whatsapp: "YOUR_WHATSAPP_NUMBER",
  description: "Samuel Adeyemo helps accomplished professionals strengthen EB-1A and O-1A profiles, pursue FIET and FBCS Fellowship, improve scholarly visibility and develop credible professional evidence strategies.",
};

export function isConfigured(value: string): boolean {
  return Boolean(value.trim()) && !value.startsWith("YOUR_");
}

export function linkedInUrl(): string | null {
  if (!isConfigured(siteConfig.linkedin)) return null;
  try {
    const url = new URL(siteConfig.linkedin);
    return url.protocol === "https:" && (url.hostname === "linkedin.com" || url.hostname.endsWith(".linkedin.com")) ? url.href : null;
  } catch { return null; }
}

export function whatsappUrl(): string | null {
  if (!isConfigured(siteConfig.whatsapp)) return null;
  const number = siteConfig.whatsapp.replace(/\D/g, "");
  return /^\d{8,15}$/.test(number) ? `https://wa.me/${number}` : null;
}

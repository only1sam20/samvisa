export type ApprovedTestimonial = {
  id: string;
  name: string;
  title: string;
  quote: string;
  service: string;
  privacyPreference: "full" | "first" | "anonymous";
  approved: boolean;
};

export type TestimonialPlaceholder = {
  id: string;
  name: string;
  title: string;
  quote: string;
  isPlaceholder: true;
};

// Manually add only genuine reviews after checking consent and the selected privacy preference.
// Public components must filter approved === true and apply privacyPreference to the name.
// For "first", store only the name the reviewer consents to show; for "anonymous", use "Anonymous".
// Never copy company details or private contact information from a submission into this public file.
// A future Supabase integration should select approved = true and return only consented public fields.
export const approvedTestimonials: ApprovedTestimonial[] = [];

// These are editorial instructions, not client quotations. Always display a "Placeholder" label.
export const testimonialPlaceholders: TestimonialPlaceholder[] = [
  {
    id: "placeholder-profile",
    name: "Client name pending permission",
    title: "Profile development · placeholder",
    quote: "Add a genuine, approved review here after the client has agreed to the wording and display name.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-fellowship",
    name: "Client name pending permission",
    title: "Fellowship support · placeholder",
    quote: "Replace this placeholder with an authentic client experience, published only with explicit permission.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-research",
    name: "Client name pending permission",
    title: "Scholarly visibility · placeholder",
    quote: "Use this space for a moderated testimonial. Respect the client's selected privacy preference before publishing.",
    isPlaceholder: true,
  },
];

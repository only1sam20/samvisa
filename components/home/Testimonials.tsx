import { MessageSquareQuote, Quote, ShieldCheck } from "lucide-react";
import { approvedTestimonials, testimonialPlaceholders } from "@/lib/data/testimonials";
import ReviewDialog from "@/components/home/ReviewDialog";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Testimonials() {
  const reviews = approvedTestimonials.filter(review => review.approved === true);
  // Filtering and name minimization stay on the server; unpublished entries and
  // full names for anonymous/first-name reviews never enter a client JS bundle.
  return <section className="section testimonials-section" id="testimonials"><div className="container"><div className="section-title-row"><SectionHeading eyebrow="EXPERIENCES, SHARED WITH PERMISSION" title="Trust is built through the work." description="Every published testimonial is reviewed, approved and shared with the client’s consent." /><ReviewDialog /></div>{reviews.length > 0 ? <div className="card-grid">{reviews.map(review => <article className="testimonial-card" key={review.id}><Quote size={24} /><blockquote>{review.quote}</blockquote><h3>{review.privacyPreference === "anonymous" ? "Anonymous professional" : review.privacyPreference === "first" ? review.name.trim().split(/\s+/)[0] : review.name}</h3>{review.privacyPreference !== "anonymous" && <p>{review.title}</p>}<span className="tag">{review.service}</span></article>)}</div> : <><div className="testimonials-empty"><MessageSquareQuote size={22} /><p>Client testimonials will be added with permission.</p><ShieldCheck size={19} /></div><div className="card-grid testimonial-placeholders">{testimonialPlaceholders.map((review, i) => <article className="testimonial-card" key={review.id}><div className="testimonial-placeholder-top"><Quote size={23} /><span className="placeholder-label">Placeholder</span></div><p className="placeholder-review-copy">{review.quote}</p><div className="placeholder-person"><span>0{i + 1}</span><div><h3>Future client experience</h3><p>{review.title.split(" · ")[0]}</p></div></div></article>)}</div></>}</div></section>;
}

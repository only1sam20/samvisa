import { PageIntro } from "@/components/ui/PageIntro";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import ContactCTA from "@/components/home/ContactCTA";
import { caseStudies } from "@/lib/data/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Case Studies", "Explore illustrative professional profile and Fellowship support scenarios. Client case studies will be published with permission.", "/case-studies");

export default function CaseStudiesPage() {
  return (
    <>
      <PageIntro eyebrow="THE WORK, IN CONTEXT" title="Different journeys. Thoughtful strategy." description="Every professional brings a different story. Explore how a profile-development engagement can be shaped around individual goals." />
      <section className="section" aria-labelledby="case-studies-heading"><div className="container"><h2 id="case-studies-heading" className="sr-only">Professional case studies</h2>{caseStudies.some((study) => study.isPlaceholder) && <p className="info-note mb-9">Items marked “Illustrative example” are editable examples of potential work. They do not describe actual client engagements or verified results. Client case studies will be added with permission.</p>}<div className="card-grid">{caseStudies.map((study) => <CaseStudyCard key={study.slug} study={study} />)}</div></div></section>
      <ContactCTA />
    </>
  );
}

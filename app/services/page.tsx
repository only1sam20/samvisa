import { Suspense } from "react";
import { PageIntro } from "@/components/ui/PageIntro";
import ServiceCard from "@/components/ui/ServiceCard";
import ServiceExplorer from "@/components/services/ServiceExplorer";
import ContactCTA from "@/components/home/ContactCTA";
import { services } from "@/lib/data/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Professional Services", "Explore extraordinary-ability profile development, FIET and FBCS Fellowship support, scholarly visibility, and professional evidence strategy.", "/services");

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="PURPOSEFUL SUPPORT. CREDIBLE PROGRESS." title="Your achievements. A clearer direction." description="Thoughtful, focused support for the next chapter of your professional journey. Explore the areas where we can work together." />
      <section className="section" aria-labelledby="services-heading"><div className="container"><h2 id="services-heading" className="sr-only">Explore consulting services</h2><Suspense fallback={<div><p className="result-count" role="status">Loading service filters…</p><div className="card-grid">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></div>}><ServiceExplorer /></Suspense></div></section>
      <div className="container"><p className="info-note">Every engagement starts with your existing achievements. Services focus on professional profile development and evidence strategy. No immigration outcome, Fellowship award, publication acceptance, or citation count is guaranteed.</p></div>
      <ContactCTA />
    </>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data/services";
import ServiceCard from "@/components/ui/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function ServicesPreview() { return <section className="section section-soft" id="services"><div className="container"><div className="section-title-row"><SectionHeading eyebrow="FOCUSED EXPERTISE. THOUGHTFUL SUPPORT." title="Your next chapter starts here." description="Specialist support to turn your professional achievements into a clear, credible and compelling profile." /><Link href="/services" className="text-link">View All Services<ArrowUpRight size={17} /></Link></div><div className="card-grid services-grid">{services.slice(0, 6).map((service, index) => <Reveal key={service.slug} delay={(index % 3) * 0.04}><ServiceCard service={service} /></Reveal>)}</div><div className="services-footnote"><span>Not sure where to start? A profile assessment brings clarity.</span><Link href="/contact" className="text-link">Let’s find your focus<ArrowUpRight size={15} /></Link></div></div></section>; }

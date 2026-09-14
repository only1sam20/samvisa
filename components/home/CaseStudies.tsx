import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/data/content";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
export default function CaseStudies() { return <section className="section section-soft" id="case-studies"><div className="container"><div className="section-title-row"><SectionHeading eyebrow="STRATEGY IN CONTEXT" title="Different journeys. A considered approach." description="Illustrative areas of work. Detailed client stories will be shared only with permission." /><Link href="/case-studies" className="text-link">Explore Case Studies<ArrowUpRight size={17} /></Link></div><div className="card-grid">{caseStudies.map(study => <CaseStudyCard study={study} key={study.slug} />)}</div></div></section>; }

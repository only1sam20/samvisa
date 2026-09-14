import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import type { CaseStudy } from "@/lib/data/content";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="case-card" id={study.slug}>
      <div className="flex items-center justify-between gap-3"><span className="icon-box" aria-hidden="true"><BriefcaseBusiness size={22} strokeWidth={1.6} /></span>{study.isPlaceholder && <span className="placeholder-label">Illustrative example</span>}</div>
      <p className="case-category">{study.category}</p>
      <h3>{study.title}</h3>
      <p><strong>Objective</strong><br />{study.objective}</p>
      <ul className="tag-list" aria-label="Areas addressed">{study.areas.map((area) => <li className="tag" key={area}>{area}</li>)}</ul>
      <p className="case-outcome">{study.outcome}</p>
      <Link href="/contact" className="text-link">Discuss a similar goal <ArrowUpRight size={16} aria-hidden="true" /></Link>
    </article>
  );
}

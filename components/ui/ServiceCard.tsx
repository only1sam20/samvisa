import Link from "next/link";
import { ArrowUpRight, Award, BadgeCheck, BookOpen, ChartNoAxesCombined, ClipboardCheck, Compass, FileCheck2, FilePenLine, Globe2, Network, ScanSearch, Trophy, UserRoundSearch } from "lucide-react";
import { services } from "@/lib/data/services";

type Service = (typeof services)[number];

const icons: Record<string, typeof Award> = {
  Award, BadgeCheck, BookOpen, ChartNoAxesCombined, ClipboardCheck,
  Compass, FileCheck2, FilePenLine, Globe2, Network, ScanSearch,
  Trophy, UserRoundSearch,
};

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon] ?? FileCheck2;

  return (
    <article className="service-card">
      <span className="icon-box" aria-hidden="true"><Icon size={23} strokeWidth={1.65} /></span>
      <h3><Link href={`/services/${service.slug}`}>{service.title}</Link></h3>
      <p>{service.shortDescription}</p>
      <Link href={`/services/${service.slug}`} className="text-link" aria-label={`Learn more about ${service.title}`}>
        Learn more <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}

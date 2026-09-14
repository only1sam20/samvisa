import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/data/insights";
import ArticleCard from "@/components/ui/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
export default function Insights() { return <section className="section section-soft" id="insights"><div className="container"><div className="section-title-row"><SectionHeading eyebrow="PERSPECTIVES THAT BRING CLARITY" title="Professional insights." description="Ideas on professional recognition, meaningful evidence and making your work more visible." /><Link href="/insights" className="text-link">All Insights<ArrowUpRight size={17} /></Link></div><div className="card-grid">{articles.slice(0, 3).map(article => <ArticleCard article={article} key={article.slug} />)}</div></div></section>; }

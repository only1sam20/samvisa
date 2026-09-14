import { Suspense } from "react";
import { PageIntro } from "@/components/ui/PageIntro";
import ArticleCard from "@/components/ui/ArticleCard";
import InsightExplorer from "@/components/insights/InsightExplorer";
import ContactCTA from "@/components/home/ContactCTA";
import { articles } from "@/lib/data/insights";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Professional Insights", "Perspectives on professional profile development, Fellowships, research visibility, ethical citation strategy, and credible evidence.", "/insights");

export default function InsightsPage() {
  return (
    <>
      <PageIntro eyebrow="IDEAS FOR YOUR NEXT CHAPTER" title="The professional perspective." description="Explore the thinking behind stronger professional profiles, meaningful recognition, and a more visible body of work." />
      <section className="section" aria-labelledby="insights-heading"><div className="container"><h2 id="insights-heading" className="sr-only">Browse professional insights</h2>{articles.some((article) => article.isPlaceholder) && <p className="info-note mb-8">Items marked “Sample article” are editorial drafts. They offer general professional-development context and will be replaced or expanded with original insights.</p>}<Suspense fallback={<div><p className="result-count" role="status">Loading insight filters…</p><div className="card-grid">{articles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div></div>}><InsightExplorer /></Suspense></div></section>
      <ContactCTA />
    </>
  );
}

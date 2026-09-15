import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";
import { ArticleArt } from "@/components/ui/ArticleCard";
import ArticleCard from "@/components/ui/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articles } from "@/lib/data/insights";
import { siteConfig } from "@/lib/siteConfig";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return pageMetadata(article.title, article.excerpt, `/insights/${article.slug}`);
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const related = articles.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="page-intro"><div className="container"><Link href="/insights" className="back-link"><ArrowLeft size={16} aria-hidden="true" />All insights</Link><p className="eyebrow"><span />{article.category}</p><h1>{article.title}</h1><p className="body-copy">{article.excerpt}</p><div className="article-byline mt-7 flex flex-wrap items-center gap-5"><span>{siteConfig.name}</span><span className="inline-flex items-center gap-2"><Clock3 size={15} aria-hidden="true" />{article.readTime}</span>{article.isPlaceholder && <span className="placeholder-label">Sample article · Editorial draft</span>}</div></div></header>
        <div className="container article-hero-art"><ArticleArt article={article} /></div>
        <div className="section"><div className="container article-body">
          {article.isPlaceholder && <p className="info-note">This is sample editorial content prepared for this website. It is general professional-development information, not legal advice or a claim about client results.</p>}
          {article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
          <div className="article-endnote"><h2>Put your own profile in perspective.</h2><p>A focused assessment can help you understand where your professional evidence is strong and where there is room to develop.</p><Link href="/contact" className="text-link">Request Profile Assessment <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </div></div>
      </article>
      <section className="section section-soft"><div className="container"><SectionHeading eyebrow="KEEP EXPLORING" title="More professional perspectives." /><div className="card-grid">{related.map((item) => <ArticleCard key={item.slug} article={item} />)}</div></div></section>
    </>
  );
}

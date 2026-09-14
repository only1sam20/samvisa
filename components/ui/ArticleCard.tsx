import Link from "next/link";
import { ArrowUpRight, BookOpen, Compass, GraduationCap, Network, ScanLine } from "lucide-react";
import { articles } from "@/lib/data/insights";

type Article = (typeof articles)[number];

const artIcons = { blueprint: Compass, fellowship: GraduationCap, research: BookOpen, citation: Network, review: ScanLine };

export function ArticleArt({ article }: { article: Article }) {
  const Icon = artIcons[article.art] ?? Compass;

  return (
    <div className={`article-art article-art-${article.art}`} aria-hidden="true">
      <span className="art-grid" />
      <span className="art-ring art-ring-one" />
      <span className="art-ring art-ring-two" />
      <span className="art-symbol"><Icon size={54} strokeWidth={1} /></span>
      <span className="art-caption">THE PROFESSIONAL PERSPECTIVE</span>
    </div>
  );
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <Link href={`/insights/${article.slug}`} tabIndex={-1} aria-hidden="true"><ArticleArt article={article} /></Link>
      <div className="article-card-content">
        <div className="article-meta"><span>{article.category}</span><span>{article.readTime}</span></div>
        <h3><Link href={`/insights/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.excerpt}</p>
        <div className="flex items-center justify-between gap-3">
          <Link href={`/insights/${article.slug}`} className="text-link" aria-label={`Read ${article.title}`}>Read article <ArrowUpRight size={16} aria-hidden="true" /></Link>
          {article.isPlaceholder && <span className="placeholder-label">Sample article</span>}
        </div>
      </div>
    </article>
  );
}

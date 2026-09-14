"use client";

import { useId, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { articles } from "@/lib/data/insights";
import ArticleCard from "@/components/ui/ArticleCard";

const categories = ["All insights", ...new Set(articles.map((article) => article.category))];

export default function InsightExplorer() {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const category = categories.find((item) => item === requestedCategory) ?? "All insights";
  const query = searchParams.get("q") ?? "";
  const searchId = useId();
  const searchInput = useRef<HTMLInputElement>(null);
  const matches = useMemo(() => articles.filter((article) => (
    (category === "All insights" || category === article.category)
    && `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(query.trim().toLowerCase())
  )), [category, query]);

  function updateFilters(nextCategory: string, nextQuery: string) {
    const url = new URL(window.location.href);
    if (nextCategory === "All insights") url.searchParams.delete("category");
    else url.searchParams.set("category", nextCategory);
    if (nextQuery) url.searchParams.set("q", nextQuery);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }

  return (
    <div>
      <div className="filter-bar">
        <div className="filter-tabs" role="group" aria-label="Filter articles by topic">
          {categories.map((item) => <button type="button" key={item} className={`filter-tab${category === item ? " is-active" : ""}`} aria-pressed={category === item} onClick={() => updateFilters(item, query)}>{item}</button>)}
        </div>
        <div className="search-field">
          <Search size={18} aria-hidden="true" />
          <label htmlFor={searchId} className="sr-only">Search insights</label>
          <input id={searchId} ref={searchInput} type="search" value={query} onChange={(event) => updateFilters(category, event.target.value)} placeholder="Search insights" />
          {query && <button type="button" aria-label="Clear insight search" onClick={() => { updateFilters(category, ""); searchInput.current?.focus(); }}><X size={16} aria-hidden="true" /></button>}
        </div>
      </div>
      <p className="result-count" role="status" aria-live="polite">{matches.length} {matches.length === 1 ? "article" : "articles"} to explore</p>
      {matches.length ? <div className="card-grid">{matches.map((article) => <ArticleCard article={article} key={article.slug} />)}</div> : (
        <div className="empty-state"><h3>No matching insights</h3><p>Try a different topic or search term.</p><button type="button" className="button button-secondary" onClick={() => { updateFilters("All insights", ""); searchInput.current?.focus(); }}>View all insights</button></div>
      )}
    </div>
  );
}

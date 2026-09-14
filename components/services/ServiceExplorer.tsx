"use client";

import { useId, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { services } from "@/lib/data/services";
import ServiceCard from "@/components/ui/ServiceCard";

const categories = [
  { value: "all", label: "All services" },
  { value: "extraordinary", label: "Extraordinary ability" },
  { value: "fellowship", label: "Fellowships" },
  { value: "research", label: "Research & visibility" },
  { value: "profile", label: "Profile & evidence" },
] as const;

export default function ServiceExplorer() {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const category = categories.find((item) => item.value === requestedCategory)?.value ?? "all";
  const query = searchParams.get("q") ?? "";
  const searchId = useId();
  const searchInput = useRef<HTMLInputElement>(null);
  const matches = useMemo(() => services.filter((service) => (
    (category === "all" || service.category === category)
    && `${service.title} ${service.shortDescription} ${service.description} ${service.features.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())
  )), [category, query]);

  function updateFilters(nextCategory: string, nextQuery: string) {
    const url = new URL(window.location.href);
    if (nextCategory === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", nextCategory);
    if (nextQuery) url.searchParams.set("q", nextQuery);
    else url.searchParams.delete("q");
    // Next.js synchronizes native history updates with useSearchParams without a server request.
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }

  return (
    <div>
      <div className="filter-bar">
        <div className="filter-tabs" role="group" aria-label="Filter services by area">
          {categories.map((item) => <button key={item.value} type="button" className={`filter-tab${category === item.value ? " is-active" : ""}`} aria-pressed={category === item.value} onClick={() => updateFilters(item.value, query)}>{item.label}</button>)}
        </div>
        <div className="search-field">
          <Search size={18} aria-hidden="true" />
          <label className="sr-only" htmlFor={searchId}>Search services</label>
          <input id={searchId} ref={searchInput} type="search" value={query} onChange={(event) => updateFilters(category, event.target.value)} placeholder="Search services" />
          {query && <button type="button" aria-label="Clear service search" onClick={() => { updateFilters(category, ""); searchInput.current?.focus(); }}><X size={16} aria-hidden="true" /></button>}
        </div>
      </div>
      <p className="result-count" role="status" aria-live="polite">{matches.length} {matches.length === 1 ? "service" : "services"} to explore</p>
      {matches.length ? <div className="card-grid">{matches.map((service) => <ServiceCard service={service} key={service.slug} />)}</div> : (
        <div className="empty-state"><h3>No matching services</h3><p>Try another search or explore all areas of support.</p><button type="button" className="button button-secondary" onClick={() => { updateFilters("all", ""); searchInput.current?.focus(); }}>View all services</button></div>
      )}
    </div>
  );
}

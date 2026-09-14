import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { services } from "@/lib/data/services";
import { articles } from "@/lib/data/insights";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/case-studies", "/insights", "/contact", "/privacy", "/disclaimer", ...services.map(service => `/services/${service.slug}`), ...articles.map(article => `/insights/${article.slug}`)];
  return pages.map(path => ({ url: `${siteConfig.url}${path}`, changeFrequency: path === "" ? "monthly" : "yearly", priority: path === "" ? 1 : path.startsWith("/services") ? 0.8 : 0.6 }));
}

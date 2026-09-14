import { ArrowUpRight } from "lucide-react";
import { linkedInUrl } from "@/lib/siteConfig";

export default function LinkedInLink({ className = "text-link" }: { className?: string }) {
  const url = linkedInUrl();
  return url ? <a href={url} className={className} target="_blank" rel="noopener noreferrer"><span className="linkedin-mark" aria-hidden="true">in</span>Connect on LinkedIn<ArrowUpRight size={15} /></a> : <span className={`${className} unconfigured-link`} title="LinkedIn profile link will be added soon"><span className="linkedin-mark" aria-hidden="true">in</span>LinkedIn <span className="coming-soon">Coming soon</span></span>;
}

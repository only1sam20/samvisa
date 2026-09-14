import { ArrowUpRight, Linkedin } from "lucide-react";
import { linkedInUrl } from "@/lib/siteConfig";

export default function LinkedInLink({ className = "text-link" }: { className?: string }) {
  const url = linkedInUrl();
  return url ? <a href={url} className={className} target="_blank" rel="noopener noreferrer"><Linkedin size={16} />Connect on LinkedIn<ArrowUpRight size={15} /></a> : <span className={`${className} unconfigured-link`} title="LinkedIn profile link will be added soon"><Linkedin size={16} />LinkedIn <span className="coming-soon">Coming soon</span></span>;
}

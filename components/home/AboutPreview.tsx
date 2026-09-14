import Link from "next/link";
import { ArrowUpRight, Fingerprint, ShieldCheck } from "lucide-react";
import CVLink from "@/components/ui/CVLink";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/siteConfig";

export default function AboutPreview() {
  return <section className="section about-preview" id="about"><div className="container about-grid"><Reveal><p className="eyebrow"><span />A PURPOSEFUL APPROACH</p><h2>Behind every strong profile<br />is a story worth<br /><span className="muted-heading">telling well.</span></h2><div className="about-signature"><span>{siteConfig.name}</span><p>Professional Profile & Evidence Strategy</p></div></Reveal><Reveal delay={0.08}><p className="about-lead">Your achievements are the foundation.<br />My role is to help you bring them into focus.</p><p className="body-copy">I’m {siteConfig.name}, a {siteConfig.nationality} professional profile development consultant with {siteConfig.experience.toLowerCase()} of professional experience. I help accomplished professionals strengthen the documentation, positioning, visibility and presentation of their work.</p><p className="body-copy">From extraordinary-ability profiles and professional Fellowships to scholarly visibility, my approach connects your real contributions with a clear, considered evidence strategy.</p><div className="about-values"><span><ShieldCheck size={18} />Integrity at every step</span><span><Fingerprint size={18} />A strategy that is yours</span></div><div className="inline-actions"><Link href="/about" className="text-link">Learn More About Me<ArrowUpRight size={16} /></Link><CVLink /></div></Reveal></div></section>;
}

import Link from "next/link";
import { ArrowUpRight, Compass, FileCheck2, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeading } from "@/components/ui/SectionHeading";
import ProfileImage from "@/components/ui/ProfileImage";
import LinkedInLink from "@/components/ui/LinkedInLink";
import CVLink from "@/components/ui/CVLink";
import ContactCTA from "@/components/home/ContactCTA";
import { experience, expertise } from "@/lib/data/content";
import { siteConfig } from "@/lib/siteConfig";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(`About ${siteConfig.name}`, `Meet ${siteConfig.name}, a Nigerian professional profile development consultant with ${siteConfig.experience.toLowerCase()} of professional experience.`, "/about");

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="THE PERSON BEHIND THE STRATEGY" title="Experience meets perspective." description="Helping accomplished professionals give their achievements the clarity, context, and visibility they deserve." />
      <section className="section"><div className="container two-column items-center">
        <ProfileImage className="about-profile-image" />
        <div><p className="eyebrow">ABOUT {siteConfig.name.toUpperCase()}</p><h2 className="mb-6 text-3xl font-semibold tracking-tight">Your work has a story.<br />Let’s tell it with evidence.</h2>
          <p className="body-copy mb-5">{siteConfig.name} is a {siteConfig.nationality} professional profile development consultant with {siteConfig.experience.toLowerCase()} of professional experience.</p>
          <p className="body-copy mb-5">He works with accomplished professionals seeking to strengthen their professional positioning, document their achievements, and develop stronger evidence across extraordinary-ability profiles, professional Fellowships, scholarly publications, citation visibility, peer review, leadership, industry recognition, and professional contribution.</p>
          <p className="body-copy mb-6">His approach starts with understanding a professional’s existing achievements, identifying gaps, and developing a structured roadmap for improving professional credibility and evidence.</p>
          <dl className="profile-facts"><div><dt>Based in</dt><dd>{siteConfig.location}</dd></div><div><dt>Experience</dt><dd>{siteConfig.experience}</dd></div><div><dt>Specialization</dt><dd>Professional Profile Development &amp; Evidence Strategy</dd></div></dl>
          <div className="mt-7 flex flex-wrap items-center gap-6"><LinkedInLink /><CVLink /></div>
        </div>
      </div></section>
      <section className="section section-soft"><div className="container"><SectionHeading eyebrow="A CONSIDERED APPROACH" title="Built around what makes you credible." description="Good positioning connects genuine achievements with clear, well-organized evidence and realistic next steps." />
        <div className="card-grid">
          <article className="service-card"><span className="icon-box"><Compass size={23} aria-hidden="true" /></span><h3>Individual direction</h3><p>Your goals, field, and existing body of work shape the strategy. There is no single roadmap for every professional.</p></article>
          <article className="service-card"><span className="icon-box"><FileCheck2 size={23} aria-hidden="true" /></span><h3>Evidence with context</h3><p>Achievements become easier to understand when their contribution, relevance, and supporting documentation are clearly connected.</p></article>
          <article className="service-card"><span className="icon-box"><ShieldCheck size={23} aria-hidden="true" /></span><h3>Professional integrity</h3><p>The focus is on real work, ethical visibility, accurate documentation, and honest expectations about decisions made by independent bodies.</p></article>
        </div>
      </div></section>
      <section className="section" id="experience"><div className="container two-column"><div><SectionHeading eyebrow="PROFESSIONAL EXPERIENCE" title={`${siteConfig.experience} of experience.`} description="A practice focused on helping professionals document their contribution and communicate their professional value." /><p className="info-note">Detailed career dates and background will be added by {siteConfig.name}. The entries shown are editable areas-of-practice placeholders.</p></div><div className="experience-list">{experience.map((item) => <article className="experience-item" key={item.title}>{item.period && <span className="tag">{item.period}</span>}<h3>{item.title}</h3><p className="body-copy">{item.description}</p></article>)}</div></div></section>
      <section className="section section-soft"><div className="container"><SectionHeading eyebrow="AREAS OF FOCUS" title="A connected view of your professional profile." /><div className="tag-list expertise-tags">{expertise.map((item) => <span className="tag" key={item}>{item}</span>)}</div><Link className="text-link mt-8" href="/services">Explore all services <ArrowUpRight size={17} aria-hidden="true" /></Link></div></section>
      <ContactCTA />
    </>
  );
}

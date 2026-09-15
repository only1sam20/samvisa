import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, Globe2, MapPin } from "lucide-react";
import ProfileImage from "@/components/ui/ProfileImage";
import LinkedInLink from "@/components/ui/LinkedInLink";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/siteConfig";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <Reveal className="hero-copy">
          <p className="eyebrow"><span />YOUR ACHIEVEMENTS. CLEARLY POSITIONED.</p>
          <h1>{siteConfig.name.split(" ")[0]}<br /><span>{siteConfig.name.split(" ").slice(1).join(" ")}<span className="gold-dot">.</span></span></h1>
          <div className="hero-specialties">
            <span>EB-1A & O-1A Profile Development</span>
            <span>Professional Fellowship Support</span>
            <span>Scholarly Visibility & Citation Strategy</span>
          </div>
          <p className="hero-description">Helping accomplished professionals strengthen their professional profiles, build credible evidence and communicate their achievements more effectively.</p>
          <div className="hero-actions">
            <Link href="/services" className="button button-primary">Explore My Services<ArrowUpRight size={18} /></Link>
            <Link href="/contact" className="button button-secondary">Request Profile Assessment<ArrowUpRight size={18} /></Link>
          </div>
          <LinkedInLink />
          <div className="hero-principle"><span className="principle-check"><Check size={12} /></span>Real achievements. Credible evidence. Ethical strategy.</div>
        </Reveal>
        <Reveal className="hero-visual" delay={0.12}>
          <div className="profile-topline">
            <span><MapPin size={16} />Based in {siteConfig.location}</span>
            <span><Globe2 size={16} />Global perspective</span>
          </div>
          <div className="hero-portrait">
            <ProfileImage />
            <div className="experience-badge">
              <span className="experience-badge-number">{siteConfig.experience.split("+")[0]}<span>{siteConfig.experience.includes("+") ? "+" : ""}</span></span>
              <div>Years of<br /><strong>Professional Experience</strong></div>
              <ArrowUpRight size={24} />
            </div>
          </div>
          <div className="profile-bottomline"><span>{siteConfig.name}</span><span>Profile development consultant</span></div>
        </Reveal>
      </div>
      <div className="container hero-bottom">
        <a href="#services" className="discover-link"><ArrowDown size={16} />Discover what’s possible</a>
        <span>Clarity in your story. Confidence in your next step.</span>
      </div>
    </section>
  );
}

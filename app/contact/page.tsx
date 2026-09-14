import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import ContactForm from "@/components/forms/ContactForm";
import LinkedInLink from "@/components/ui/LinkedInLink";
import { isConfigured, siteConfig, whatsappUrl } from "@/lib/siteConfig";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Request a Consultation", "Tell Samuel Adeyemo about your professional background and goals to begin a conversation about profile development, Fellowships, or scholarly visibility.", "/contact");

export default function ContactPage() {
  const whatsapp = whatsappUrl();

  return (
    <>
      <PageIntro eyebrow="LET’S START A CONVERSATION" title="Your next chapter starts here." description="Tell me a little about your background and where you want to go. We can explore how a focused profile strategy could support your goals." />
      <section className="section"><div className="container detail-layout">
        <div className="contact-form-panel"><h2 className="mb-6 text-2xl font-semibold">Request a profile assessment</h2><ContactForm /></div>
        <aside className="detail-sidebar">
          <p className="eyebrow">GET IN TOUCH</p><h2 className="mb-5 text-2xl font-semibold">A thoughtful first step.</h2><p className="body-copy">The initial conversation is about understanding your achievements, priorities, and the support that may be useful to you.</p>
          <div className="contact-methods">
            <div><Mail size={20} aria-hidden="true" /><div><h3>Email</h3>{isConfigured(siteConfig.email) ? <a className="text-link" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> : <p>Email address coming soon</p>}</div></div>
            <div><MapPin size={20} aria-hidden="true" /><div><h3>Based in {siteConfig.location}</h3><p>Working with professionals internationally</p></div></div>
            <div><MessageCircle size={20} aria-hidden="true" /><div><h3>WhatsApp</h3>{whatsapp ? <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-link">Start a conversation <ArrowUpRight size={15} aria-hidden="true" /></a> : <p>WhatsApp details coming soon</p>}</div></div>
          </div>
          <LinkedInLink />
          <div className="info-note mt-8"><ShieldCheck size={21} aria-hidden="true" /><p>Please share a brief overview. Avoid sending passport details, identification numbers, or confidential documents through this form. Read the <Link href="/privacy" className="underline underline-offset-4">privacy policy</Link>.</p></div>
        </aside>
      </div></section>
    </>
  );
}

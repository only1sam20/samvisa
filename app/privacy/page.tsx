import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { isConfigured, siteConfig } from "@/lib/siteConfig";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Privacy Policy", "How this website handles consultation requests, testimonial submissions, contact information, and service providers.", "/privacy");

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow="YOUR INFORMATION" title="Privacy policy." description="A clear overview of how information shared through this website is handled." />
      <section className="section"><div className="container legal-content">
        <p className="info-note">This policy describes the website’s initial email-based operation. It should be reviewed and updated by the website owner before launch and whenever data-handling practices change.</p>
        <h2>Who handles your information</h2>
        <p>This website presents the professional consulting services of {siteConfig.name}, based in {siteConfig.location}. You can explore its public pages without creating an account.</p>
        <h2>Information you choose to provide</h2>
        <p>Consultation requests collect your name, email address, country, profession, experience, service of interest, preferred contact method, permission to respond, and the information you share about your situation and goals. Your telephone number is optional unless you choose WhatsApp. A LinkedIn profile URL is requested when you choose LinkedIn as your contact method.</p>
        <p>Testimonial submissions collect your name, professional title, optional organization, service used, rating, review text, display preference, and permission to publish. Please avoid including sensitive personal information or confidential material in either form.</p>
        <h2>How information is used</h2>
        <p>Consultation information is used to respond to your enquiry, understand your professional goals, and discuss relevant support. Review information is used to assess feedback and prepare testimonials for moderation. It is not automatically published.</p>
        <p>Only testimonials approved by the owner and submitted with publication consent may appear on the website. Published testimonials should follow the submitter’s chosen name-display preference. Requests to correct or remove a testimonial can be made using the contact details below.</p>
        <h2>Email delivery and other service providers</h2>
        <p>When configured, forms are delivered to the owner by Resend, a third-party email delivery provider. Submissions may also be stored in the owner’s email service. The website does not currently use a reviews database. If a moderation database is added later, this policy should be updated before it starts collecting information.</p>
        <p>The hosting provider may process technical information, such as IP addresses, browser information, request times, and server logs, to deliver and protect the website. The configured service providers may process information in countries other than your own under their applicable terms and privacy policies.</p>
        <h2>Spam prevention and security</h2>
        <p>Forms use validation, a hidden spam-detection field, and basic request limits. Technical request information may be processed temporarily to reduce abuse. No online transmission or storage method can guarantee absolute security.</p>
        <h2>Analytics and cookies</h2>
        <p>The initial website does not include an analytics integration or set advertising or analytics cookies in its application code. If analytics, tracking tools, or cookie-based features are introduced, the owner should update this policy and provide any notices or choices required for those tools.</p>
        <h2>Retention</h2>
        <p>Enquiries and review submissions may remain in email records for as long as needed to respond, manage an engagement, or maintain relevant business records. The owner should periodically review these records and remove information that is no longer needed, subject to applicable recordkeeping obligations. Email and hosting providers may maintain their own backup or log retention schedules.</p>
        <h2>Your choices and contact</h2>
        <p>You may request access to, correction of, or deletion of information you have submitted, or withdraw permission to display a testimonial. Requests will be assessed in light of the information held and any applicable obligations.</p>
        {isConfigured(siteConfig.email) ? <p>For privacy enquiries, email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p> : <p>Privacy contact details will be published here when configured. The owner must add a working contact address before collecting submissions publicly.</p>}
        <p>You can also use the <Link href="/contact">contact page</Link> when the enquiry form has been configured.</p>
        <h2>Policy updates</h2>
        <p>This policy may change when the website’s features or service providers change. The version displayed on this page describes the current published policy.</p>
      </div></section>
    </>
  );
}

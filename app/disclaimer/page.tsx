import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { siteConfig } from "@/lib/siteConfig";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Professional Disclaimer", "The scope and limitations of Samuel Adeyemo’s professional profile development, evidence strategy, Fellowship, and research visibility services.", "/disclaimer");

export default function DisclaimerPage() {
  return (
    <>
      <PageIntro eyebrow="CLARITY & PROFESSIONAL INTEGRITY" title="Professional disclaimer." description="Please read this information to understand the scope of the services and content offered through this website." />
      <section className="section"><div className="container legal-content">
        <h2>Scope of consulting services</h2>
        <p>{siteConfig.name} provides professional profile development, evidence strategy, research visibility, career positioning, Fellowship support, and related consulting services. The work focuses on documenting real achievements, identifying development opportunities, and communicating professional contributions clearly.</p>
        <h2>No legal advice or representation</h2>
        <p>{siteConfig.name} is not an immigration attorney. The information and services provided through this website do not constitute legal advice, immigration legal representation, or attorney-client services. Contacting the website or using a consulting service does not create an attorney-client relationship.</p>
        <p>Immigration laws, policies, and case outcomes vary. Individuals seeking legal advice regarding EB-1A, O-1A, or other immigration matters should consult a qualified U.S. immigration attorney. Legal eligibility, filing strategy, and representation should be discussed with that attorney.</p>
        <h2>No guaranteed outcomes</h2>
        <p>No immigration outcome, Fellowship award, publication acceptance, citation count, or professional recognition is guaranteed. Immigration decisions rest with the relevant authorities; professional bodies, publishers, reviewers, and other independent organizations make their own decisions.</p>
        <h2>Ethical research and evidence</h2>
        <p>Services support authentic achievements, accurate documentation, and legitimate professional visibility. They do not include fabricated research, false claims, fake or purchased citations, citation rings, deceptive authorship, manufactured awards, or misleading recommendation letters.</p>
        <p>Publication and citation support focus on relevant research strategy, author identity, discoverability, dissemination, and professional engagement. Independent academic and editorial standards must be respected.</p>
        <h2>Independent professional support</h2>
        <p>References to EB-1A, O-1A, FIET, FBCS, professional institutions, or publications identify areas of support. They do not imply affiliation, endorsement, accreditation, or authorization by a government authority, professional body, or publisher.</p>
        <h2>Website content and examples</h2>
        <p>Website content provides general professional-development information. It should be considered in the context of your own circumstances and verified where necessary. Sample articles, case studies, and testimonial placeholders are labeled and are not representations of actual client results or endorsements.</p>
        <h2>Your professional information</h2>
        <p>You are responsible for the accuracy of information and supporting materials you provide. Consulting support does not replace the need to verify evidence, satisfy applicable requirements, or obtain advice from appropriately qualified professionals.</p>
        <p>To discuss the scope of a potential engagement, visit the <Link href="/contact">contact page</Link>.</p>
      </div></section>
    </>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { faqs } from "@/lib/data/content";
import FAQAccordion from "@/components/ui/FAQAccordion";
export default function FAQ() { return <section className="section" id="faq"><div className="container faq-grid"><div><p className="eyebrow"><span />A LITTLE MORE CLARITY</p><h2>Your questions,<br />answered.</h2><p className="body-copy">A transparent approach starts with knowing what to expect.</p><Link href="/contact" className="text-link">Have another question?<ArrowUpRight size={16} /></Link></div><FAQAccordion items={faqs} /></div></section>; }

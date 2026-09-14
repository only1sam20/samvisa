import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeading } from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/lib/data/services";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return pageMetadata(service.title, service.shortDescription, `/services/${service.slug}`);
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const related = services.filter((item) => item.slug !== slug && item.category === service.category).slice(0, 3);

  return (
    <>
      <PageIntro eyebrow="PROFESSIONAL SERVICES" title={service.title} description={service.shortDescription} />
      <section className="section"><div className="container"><Link href="/services" className="back-link"><ArrowLeft size={16} aria-hidden="true" />All services</Link><div className="detail-layout">
        <div><h2 className="mb-5 text-3xl font-semibold tracking-tight">A focused approach to your goals.</h2><p className="body-copy mb-9">{service.description}</p><h2 className="mb-6 text-2xl font-semibold">Where we can work together</h2><ul className="feature-list">{service.features.map((feature) => <li key={feature}><Check size={18} aria-hidden="true" /><span>{feature}</span></li>)}</ul><h2 className="mb-4 mt-10 text-2xl font-semibold">Start with your current profile</h2><p className="body-copy">An initial assessment provides a clearer view of your strengths, the evidence you already hold, and areas that could benefit from further development. From there, we can discuss a practical scope of support suited to your circumstances.</p></div>
        <aside className="detail-sidebar"><p className="eyebrow">LET’S FIND YOUR DIRECTION</p><h2 className="mb-4 text-2xl font-semibold">Bring your achievements. We’ll explore the next step.</h2><p className="body-copy mb-6">Share your professional background and goals to begin a conversation about this service.</p><Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="button button-primary">Request Profile Assessment <ArrowUpRight size={16} aria-hidden="true" /></Link><div className="info-note mt-7"><ShieldCheck size={21} aria-hidden="true" /><p>Support is grounded in real achievements and ethical professional practice. No outcome is guaranteed.</p></div><Link href="/disclaimer" className="text-link mt-5">Read the professional disclaimer <ArrowUpRight size={14} aria-hidden="true" /></Link></aside>
      </div></div></section>
      {related.length > 0 && <section className="section section-soft"><div className="container"><SectionHeading eyebrow="A BROADER PERSPECTIVE" title="Related areas of support." /><div className="card-grid">{related.map((item) => <ServiceCard key={item.slug} service={item} />)}</div></div></section>}
    </>
  );
}

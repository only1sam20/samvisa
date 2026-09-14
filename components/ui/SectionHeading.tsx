export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return <div className="section-heading">{eyebrow && <p className="eyebrow"><span />{eyebrow}</p>}<h2>{title}</h2>{description && <p className="body-copy">{description}</p>}</div>;
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-intro"><div className="container"><p className="eyebrow"><span />{eyebrow}</p><h1>{title}</h1><p className="body-copy">{description}</p></div></section>;
}

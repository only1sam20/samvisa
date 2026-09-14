import { Plus } from "lucide-react";
export default function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) { return <div className="faq-list">{items.map(({ question, answer }) => <details className="faq-item" key={question}><summary>{question}<Plus size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>; }

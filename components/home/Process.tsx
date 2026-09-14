import { Compass, FolderCheck, Layers3, ScanSearch, UserRoundSearch } from "lucide-react";
import { processSteps } from "@/lib/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
const icons = [UserRoundSearch, ScanSearch, Compass, Layers3, FolderCheck];
export default function Process() { return <section className="section process-section" id="process"><div className="container"><SectionHeading eyebrow="A CLEAR PATH FORWARD" title="From achievements to a stronger profile." description="A considered, collaborative process. Grounded in your experience. Shaped around your goals." /><div className="process-grid">{processSteps.map((step, index) => { const Icon = icons[index]; return <Reveal className="process-step" key={step.title} delay={index * 0.04}><div className="process-node"><Icon size={23} strokeWidth={1.5} /><span>0{index + 1}</span></div><h3>{step.title}</h3><p>{step.description}</p></Reveal>; })}</div></div></section>; }

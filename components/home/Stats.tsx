import { Award, BriefcaseBusiness, Globe2, GraduationCap } from "lucide-react";
const stats = [
  { icon: BriefcaseBusiness, value: "10+ Years", label: "Professional experience" },
  { icon: Award, value: "EB-1A & O-1A", label: "Profile development" },
  { icon: GraduationCap, value: "FIET & FBCS", label: "Professional Fellowship support" },
  { icon: Globe2, value: "Global Professionals", label: "Across disciplines and industries" },
];
export default function Stats() { return <section className="stats-band" aria-label="Professional focus"><div className="container stats-grid">{stats.map(({ icon: Icon, value, label }) => <div className="stat" key={value}><Icon size={23} strokeWidth={1.35} /><div><strong>{value}</strong><span>{label}</span></div></div>)}</div></section>; }

import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

export default function ProfileImage({ className = "" }: { className?: string }) {
  const hasImage = existsSync(join(process.cwd(), "public/images/samuel-profile.jpg"));
  return <div className={`profile-image ${className}`}>{hasImage ? <Image src="/images/samuel-profile.jpg" alt={siteConfig.name} fill sizes="(max-width: 768px) 90vw, 440px" priority className="object-cover" /> : <div className="profile-monogram" role="img" aria-label="SA, initials of Samuel Adeyemo"><div className="monogram-grid" /><div className="monogram-orbit orbit-one" /><div className="monogram-orbit orbit-two" /><span className="monogram-corner">EST. ON EXPERIENCE. BUILT ON EVIDENCE.</span><span className="monogram-letters">SA<span>.</span></span><span className="monogram-caption">A stronger profile.<br />A clearer story.</span><span className="monogram-footnote">PROFESSIONAL PROFILE & EVIDENCE STRATEGY</span></div>}</div>;
}

import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

export default function ProfileImage({ className = "" }: { className?: string }) {
  const imageFile = ["samuel-profile.jpg", "samuel-profile.png"].find(file => existsSync(join(process.cwd(), "public/images", file)));
  return <div className={`profile-image ${imageFile ? "has-portrait" : ""} ${className}`}>{imageFile ? <Image src={`/images/${imageFile}`} alt={siteConfig.name} fill sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1199px) 44vw, 540px" priority className="object-contain" /> : <div className="profile-monogram" role="img" aria-label={`${siteConfig.name.split(" ").map(part => part[0]).join("")}, initials of ${siteConfig.name}`}><div className="monogram-grid" /><div className="monogram-orbit orbit-one" /><div className="monogram-orbit orbit-two" /><span className="monogram-corner">EST. ON EXPERIENCE. BUILT ON EVIDENCE.</span><span className="monogram-letters">{siteConfig.name.split(" ").map(part => part[0]).join("")}<span>.</span></span><span className="monogram-caption">A stronger profile.<br />A clearer story.</span><span className="monogram-footnote">PROFESSIONAL PROFILE & EVIDENCE STRATEGY</span></div>}</div>;
}

import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";
export const alt = "Samuel Adeyemo — Professional Profile Development & Evidence Strategy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() { return new ImageResponse(<div style={{ width: "100%", height: "100%", background: "#102b46", display: "flex", flexDirection: "column", padding: "70px 80px", color: "#fff", justifyContent: "space-between" }}><div style={{ color: "#c5ad76", fontSize: 20, letterSpacing: 4 }}>PROFESSIONAL PROFILE & EVIDENCE STRATEGY</div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 90, fontWeight: 700 }}>{siteConfig.name}</div><div style={{ fontSize: 28, color: "#c9d3dc", marginTop: 25 }}>Real achievements. Credible evidence. Ethical strategy.</div></div><div style={{ display: "flex", borderTop: "1px solid #3a4e60", paddingTop: 26, color: "#d1bb88", fontSize: 23 }}>EB-1A & O-1A · FIET & FBCS · Scholarly Visibility</div></div>, size); }

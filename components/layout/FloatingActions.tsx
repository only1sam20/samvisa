"use client";
import { ArrowUp, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/siteConfig";

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const whatsapp = whatsappUrl();
  useEffect(() => { const update = () => setVisible(window.scrollY > 700); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  return <div className="floating-actions">{whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="floating-button whatsapp-button" aria-label="Contact Samuel on WhatsApp"><MessageCircle size={20} /></a>}{visible && <button type="button" className="floating-button" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}><ArrowUp size={20} /></button>}</div>;
}

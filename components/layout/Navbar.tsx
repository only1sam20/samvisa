"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

const links = [
  ["Home", "/"], ["About", "/about"], ["Services", "/services"], ["Who I Help", "/#who-i-help"], ["Experience", "/#experience"], ["Case Studies", "/case-studies"], ["Testimonials", "/#testimonials"], ["Insights", "/insights"], ["Contact", "/contact"],
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const closeOnWide = () => { if (window.innerWidth >= 1200) setOpen(false); };
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (event.key === "Tab") {
        const items = [toggleRef.current, ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a") || [])].filter(Boolean) as HTMLElement[];
        const first = items[0], last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector("a")?.focus();
    window.addEventListener("keydown", keydown);
    window.addEventListener("resize", closeOnWide);
    return () => { document.body.style.overflow = prior; window.removeEventListener("keydown", keydown); window.removeEventListener("resize", closeOnWide); };
  }, [open]);
  const navLinks = (mobile = false) => links.map(([label, href]) => {
    const active = !href.includes("#") && (href === "/" ? pathname === "/" : pathname.startsWith(href));
    return <Link key={label} href={href} className={active ? "nav-link active" : "nav-link"} aria-current={active ? "page" : undefined} onClick={() => { setOpen(false); if (mobile) toggleRef.current?.focus(); }}>{label}</Link>;
  });
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}><div className="nav-container"><Link href="/" className="brand" aria-label={`${siteConfig.name}, home`}><span className="brand-mark">sa<span>.</span></span><span className="brand-name">{siteConfig.name}<span>PROFILE & EVIDENCE STRATEGY</span></span></Link><nav className="desktop-nav" aria-label="Main navigation">{navLinks()}</nav><Link href="/contact" className="button button-primary nav-cta">Book a Consultation<ArrowUpRight size={15} /></Link><button ref={toggleRef} className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>{open && <div className="mobile-menu" id="mobile-navigation" ref={menuRef}><nav aria-label="Mobile navigation">{navLinks(true)}<Link href="/contact" className="button button-primary" onClick={() => setOpen(false)}>Book a Consultation<ArrowUpRight size={17} /></Link></nav><p>Credible evidence. Confident positioning.</p></div>}</header>;
}

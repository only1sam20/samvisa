import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import { siteConfig, linkedInUrl } from "@/lib/siteConfig";
import "./globals.css";
import "./inner-pages.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | EB-1A & O-1A Profile Development Consultant`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", siteName: siteConfig.name, title: `${siteConfig.name} | Professional Profile & Evidence Strategy`, description: siteConfig.description, url: "/", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name }] },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const linkedIn = linkedInUrl();
  const structuredData = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "Person", "@id": `${siteConfig.url}/#person`, name: siteConfig.name, nationality: { "@type": "Country", name: "Nigeria" }, jobTitle: siteConfig.title, url: siteConfig.url, ...(linkedIn ? { sameAs: [linkedIn] } : {}) },
      { "@type": "ProfessionalService", "@id": `${siteConfig.url}/#service`, name: `${siteConfig.name} — Profile Development & Evidence Strategy`, url: siteConfig.url, description: siteConfig.description, founder: { "@id": `${siteConfig.url}/#person` }, areaServed: "Worldwide", address: { "@type": "PostalAddress", addressCountry: "NG" } },
      { "@type": "WebSite", "@id": `${siteConfig.url}/#website`, url: siteConfig.url, name: siteConfig.name, inLanguage: "en", publisher: { "@id": `${siteConfig.url}/#person` } },
    ],
  };
  return <html lang="en" className={`${manrope.variable} ${inter.variable}`}><body><a className="skip-link" href="#main-content">Skip to content</a><Navbar /><main id="main-content">{children}</main><Footer /><FloatingActions />{/* JSON-LD requires raw JSON. Escape '<' to prevent markup injection if configuration changes. */}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></body></html>;
}

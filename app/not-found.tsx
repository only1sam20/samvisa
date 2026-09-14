import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() { return <section className="section"><div className="container not-found"><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>A different path<br />forward.</h1><p className="body-copy">This page may have moved, or the address may be incomplete. Let’s get you back to a familiar place.</p><Link href="/" className="button button-primary"><ArrowLeft size={17} />Back to Home</Link></div></section>; }

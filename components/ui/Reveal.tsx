"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? {} : { opacity: [0.6, 1], y: [12, 0] }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.5, delay }}>{children}</motion.div>;
}

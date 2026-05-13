"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  body: string;
}

export function SectionHeader({ eyebrow, title, body }: SectionHeaderProps) {
  return (
    <motion.div
      className="mx-auto mb-14 grid max-w-[980px] justify-items-center gap-5 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 max-w-4xl text-balance font-display text-[clamp(2.5rem,5.4vw,4.9rem)] font-semibold leading-[0.96] text-text-primary">
          {title}
        </h2>
      </div>
      <p className="max-w-[68ch] text-pretty text-[17px] leading-8 text-[var(--text-soft)]">{body}</p>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { useLanguage } from "@/hooks/useLanguage";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function AboutSection() {
  const { lang, content } = useLanguage();

  return (
    <section id="about" className="section-band">
      <div className="shell">
        <motion.div key={lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.28 }}>
          <div className="mx-auto mb-14 grid max-w-[980px] justify-items-center gap-5 text-center">
            <div>
              <p className="eyebrow">{content.about.eyebrow}</p>
              <h2 className="mt-3 max-w-4xl text-balance font-display text-[clamp(2.5rem,5.4vw,4.9rem)] font-semibold leading-[0.96] text-text-primary">
                {content.about.title}
              </h2>
            </div>
            <p className="max-w-[66ch] text-pretty text-[17px] leading-8 text-[var(--text-soft)]">{content.about.body}</p>
          </div>

          <motion.div
            className="grid gap-4 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {content.about.cards.map((card) => (
              <GlassCard key={card.title} className="grid min-h-[280px] content-between gap-10 p-6" variants={fadeUp}>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold leading-tight text-text-primary">{card.title}</h3>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line bg-white/[0.055] font-mono text-xs font-semibold text-[#2997ff] shadow-inner">
                    {card.code}
                  </span>
                </div>
                <p className="text-[15px] leading-7 text-[var(--text-soft)]">{card.body}</p>
              </GlassCard>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

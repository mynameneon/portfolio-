"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { useLanguage } from "@/hooks/useLanguage";
import type { ExperienceCardProps } from "@/types";

export function ExperienceCard({ item, animation, index, onOpen }: ExperienceCardProps) {
  const { content } = useLanguage();
  const label = item.type === "official" ? content.common.official : content.common.freelance;
  const symbol = item.type === "official" ? "✓" : "◆";
  const flip = index % 2 === 1;

  return (
    <article className="relative grid gap-3 pl-7 lg:grid-cols-2 lg:gap-11 lg:pl-0">
      <span className="absolute left-[3px] top-7 z-10 h-[11px] w-[11px] rounded-full bg-[#2997ff] shadow-[0_0_0_8px_var(--page)] lg:left-[calc(50%-5px)]" />
      <div
        className={clsx(
          "grid min-h-[190px] place-items-center overflow-hidden rounded-panel border border-line bg-white/[0.045] shadow-[0_26px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl",
          flip && "lg:order-2"
        )}
      >
        {animation}
      </div>
      <motion.button
        type="button"
        onClick={() => onOpen(item)}
        className={clsx(
          "glass min-h-[190px] w-full p-6 text-left outline-none",
          flip && "lg:order-1"
        )}
        whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.18)", boxShadow: "0 34px 110px rgba(0,0,0,0.5)" }}
        whileTap={{ scale: 0.99 }}
        aria-label={`${content.common.readMore}: ${item.title}`}
      >
        <span
          className="inline-flex min-h-7 items-center gap-2 rounded-full border px-3 font-mono text-[11px]"
          style={{ color: item.accentColor, borderColor: `${item.accentColor}55`, backgroundColor: `${item.accentColor}14` }}
        >
          {symbol} {label}
        </span>
        <h3 className="mt-4 text-[24px] font-semibold leading-tight text-text-primary">
          {item.company ? `${item.company} / ${item.title}` : item.title}
        </h3>
        <p className="mt-3 text-[15px] leading-7 text-[var(--text-soft)]">{item.shortDesc}</p>
      </motion.button>
    </article>
  );
}

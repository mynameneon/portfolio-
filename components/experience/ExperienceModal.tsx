"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { ExperienceAnimation } from "@/components/experience/ExperienceAnimations";
import { useLanguage } from "@/hooks/useLanguage";
import type { ExperienceItem } from "@/types";

interface ExperienceModalProps {
  item: ExperienceItem | null;
  onClose: () => void;
}

export function ExperienceModal({ item, onClose }: ExperienceModalProps) {
  const { content } = useLanguage();

  useEffect(() => {
    if (!item) {
      return undefined;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/72 p-4 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.article
            className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-[30px] border border-line bg-[#08080a] shadow-panel-glow"
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-line bg-black/35 px-5 py-4 backdrop-blur-xl">
              <span className="font-mono text-xs uppercase text-[var(--text-faint)]">{content.experience.modalLabel}</span>
              <motion.button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/[0.055] text-text-primary"
                whileTap={{ scale: 0.94 }}
                aria-label={content.common.close}
              >
                <X size={17} />
              </motion.button>
            </div>
            <div className="grid gap-6 p-5 lg:grid-cols-[0.86fr_1.14fr] lg:p-7">
              <div className="grid place-items-center rounded-panel border border-line bg-white/[0.045]">
                <ExperienceAnimation name={item.animation} accentColor={item.accentColor} large />
              </div>
              <div>
                <span
                  className="inline-flex min-h-7 items-center rounded-full border px-3 font-mono text-[11px]"
                  style={{ color: item.accentColor, borderColor: `${item.accentColor}55`, backgroundColor: `${item.accentColor}14` }}
                >
                  {item.type === "official" ? content.common.official : content.common.freelance}
                </span>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-text-primary">
                  {item.company ? `${item.company} / ${item.title}` : item.title}
                </h2>
                <p className="mt-4 text-pretty text-[15px] leading-7 text-[var(--text-soft)]">{item.fullDesc}</p>
              </div>
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

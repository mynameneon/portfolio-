"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const copy = {
  ru: {
    on: "Подсказки включены",
    off: "Подсказки выключены",
    body: "Подсвечу, где можно нажать, листать или открыть демо.",
    enable: "Включить подсказки",
    disable: "Выключить подсказки"
  },
  ua: {
    on: "Підказки увімкнено",
    off: "Підказки вимкнено",
    body: "Підсвічу, де можна натиснути, гортати або відкрити демо.",
    enable: "Увімкнути підказки",
    disable: "Вимкнути підказки"
  }
} as const;

export function InteractionHints() {
  const { lang } = useLanguage();
  const content = copy[lang];
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.hints = enabled ? "on" : "off";

    return () => {
      document.documentElement.dataset.hints = "off";
    };
  }, [enabled]);

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex items-end gap-3">
      <AnimatePresence>
        {enabled ? (
          <motion.div
            className="hidden max-w-[280px] rounded-[24px] border border-line bg-black/72 p-4 text-sm text-[var(--text-soft)] shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:block"
            initial={{ opacity: 0, x: 16, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, y: 8, scale: 0.96 }}
          >
            <span className="flex items-center gap-2 font-semibold text-text-primary">
              <Sparkles size={16} className="text-[#66c7ff]" />
              {content.on}
            </span>
            <span className="mt-2 block leading-6">{content.body}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-pressed={enabled}
        aria-label={enabled ? content.disable : content.enable}
        onClick={() => setEnabled((value) => !value)}
        className="group relative grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-white text-black shadow-[0_20px_70px_rgba(41,151,255,0.28)]"
        whileHover={{ y: -4, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        data-cursor="interactive"
      >
        <span className="absolute inset-0 rounded-full bg-[#2997ff] opacity-0 blur-xl transition-opacity group-hover:opacity-30" />
        <span className="relative grid h-11 w-11 place-items-center rounded-full bg-black text-xs font-bold text-white">
          {enabled ? <X size={18} /> : <HelpCircle size={18} />}
        </span>
      </motion.button>
    </div>
  );
}

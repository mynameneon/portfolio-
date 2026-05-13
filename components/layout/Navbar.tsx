"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Languages, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";
import { useLanguage } from "@/hooks/useLanguage";
import type { Lang } from "@/types";

export function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, content } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: content.nav.home },
    { href: "/about", label: content.nav.about },
    { href: "/skills", label: content.nav.skills },
    { href: "/experience", label: content.nav.experience },
    { href: "/projects", label: content.nav.projects },
    { href: "/contact", label: content.nav.contact }
  ];

  const isActive = (href: string) => pathname === href;

  const chooseLang = (nextLang: Lang) => {
    setLang(nextLang);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-black/62 backdrop-blur-2xl">
      <nav className="shell flex min-h-[66px] items-center justify-between gap-6" aria-label="Primary navigation">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid h-[34px] w-[34px] place-items-center rounded-xl border border-white/12 bg-white/[0.08] font-mono text-xs text-white shadow-[0_14px_34px_rgba(0,0,0,0.3)]">
            NK
          </span>
          <span className="grid min-w-0 gap-0.5 leading-none">
            <strong className="truncate text-sm font-semibold text-text-primary">Никита Кононенко</strong>
            <span className="hidden font-mono text-[11px] text-[var(--text-faint)] sm:block">portfolio / selected work</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-line bg-white/[0.055] p-1 text-sm text-[var(--text-soft)] shadow-[0_18px_46px_rgba(0,0,0,0.22)] lg:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "grid min-h-8 place-items-center rounded-full border px-3",
                isActive(item.href)
                  ? "border-transparent bg-white text-black shadow-[0_10px_22px_rgba(255,255,255,0.08)]"
                  : "border-transparent hover:bg-white/[0.08] hover:text-text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full border border-line bg-white/[0.055] p-1 shadow-[0_18px_46px_rgba(0,0,0,0.22)] sm:flex" aria-label="Language switcher">
            {(["ru", "ua"] as const).map((item) => (
              <motion.button
                key={item}
                type="button"
                aria-pressed={lang === item}
                onClick={() => chooseLang(item)}
                className={clsx(
                  "grid min-h-8 min-w-10 place-items-center rounded-full border px-2 font-mono text-xs uppercase",
                  lang === item
                    ? "border-transparent bg-[#2997ff] text-black"
                    : "border-transparent text-[var(--text-soft)] hover:text-text-primary"
                )}
                whileTap={{ scale: 0.96 }}
              >
                {item}
              </motion.button>
            ))}
          </div>

          <motion.button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.065] text-text-primary shadow-[0_18px_46px_rgba(0,0,0,0.25)] lg:hidden"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-black/88 backdrop-blur-2xl lg:hidden"
          >
            <div className="shell grid gap-2 py-4">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-line bg-white/[0.055] px-4 py-3 text-sm text-text-primary shadow-[0_18px_46px_rgba(0,0,0,0.22)]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between rounded-2xl border border-line bg-white/[0.055] px-3 py-2 shadow-[0_18px_46px_rgba(0,0,0,0.22)]">
                <span className="inline-flex items-center gap-2 text-sm text-[var(--text-soft)]">
                  <Languages size={16} />
                  Language
                </span>
                <span className="flex gap-1">
                  {(["ru", "ua"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => chooseLang(item)}
                      className={clsx(
                        "rounded-lg border px-3 py-2 font-mono text-xs uppercase",
                        lang === item ? "border-transparent bg-[#2997ff] text-black" : "border-transparent text-[var(--text-soft)]"
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

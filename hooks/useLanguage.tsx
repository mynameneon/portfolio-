"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "@/lib/translations";
import type { Lang, TranslationContent } from "@/types";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  content: TranslationContent;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function resolveString(content: TranslationContent, key: string): string {
  const value = key.split(".").reduce<unknown>((current, part) => {
    if (typeof current === "object" && current !== null && part in current) {
      return (current as Record<string, unknown>)[part];
    }

    return undefined;
  }, content);

  return typeof value === "string" ? value : key;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-lang");
    if (saved === "ru" || saved === "ua") {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((nextLang: Lang) => {
    setLangState(nextLang);
    window.localStorage.setItem("portfolio-lang", nextLang);
  }, []);

  const content = translations[lang];

  const t = useCallback((key: string) => resolveString(content, key), [content]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      content
    }),
    [content, lang, setLang, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}

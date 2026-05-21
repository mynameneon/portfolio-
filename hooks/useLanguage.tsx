"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultSiteContent } from "@/lib/defaultContent";
import type { Lang, ProjectShowcaseItem, SectionId, SiteContent, TranslationContent } from "@/types";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  content: TranslationContent;
  projects: readonly ProjectShowcaseItem[];
  siteContent: SiteContent;
  isSectionVisible: (sectionId: SectionId) => boolean;
  getEditableSection: <T>(sectionKey: string, fallback: T) => T;
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

export function LanguageProvider({
  children,
  initialContent = defaultSiteContent
}: {
  children: React.ReactNode;
  initialContent?: SiteContent;
}) {
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

  const content = initialContent.translations[lang] ?? defaultSiteContent.translations[lang];
  const visibleProjects = useMemo(
    () => (initialContent.projects ?? defaultSiteContent.projects).filter((project) => project.hidden !== true),
    [initialContent.projects]
  );

  const t = useCallback((key: string) => resolveString(content, key), [content]);
  const isSectionVisible = useCallback(
    (sectionId: SectionId) => {
      const sections = initialContent.settings?.sections ?? defaultSiteContent.settings.sections;
      return sections[sectionId]?.hidden !== true;
    },
    [initialContent.settings]
  );
  const getEditableSection = useCallback(
    <T,>(sectionKey: string, fallback: T): T => {
      const value = initialContent.settings?.editableSections?.[sectionKey];
      return value ? (value as T) : fallback;
    },
    [initialContent.settings]
  );

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
      content,
      projects: visibleProjects,
      siteContent: initialContent,
      isSectionVisible,
      getEditableSection
    }),
    [content, getEditableSection, initialContent, isSectionVisible, lang, setLang, t, visibleProjects]
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

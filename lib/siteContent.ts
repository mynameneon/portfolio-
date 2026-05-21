import { defaultSiteContent } from "@/lib/defaultContent";
import { supabase } from "@/lib/supabase";
import type { Lang, SiteContent, SiteContentSettings, TranslationContent } from "@/types";

export const SITE_CONTENT_KEY = "portfolio-site-content-v1";

export interface SiteContentResult {
  content: SiteContent;
  source: "supabase" | "fallback";
  updatedAt: string | null;
  error?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isTranslationContent(value: unknown): value is TranslationContent {
  if (!isRecord(value)) return false;

  return (
    isRecord(value.nav) &&
    isRecord(value.common) &&
    isRecord(value.hero) &&
    isRecord(value.about) &&
    isRecord(value.skills) &&
    isRecord(value.experience) &&
    isRecord(value.projects) &&
    isRecord(value.contact) &&
    isRecord(value.footer) &&
    Array.isArray(value.skills.categories) &&
    Array.isArray(value.experience.items) &&
    Array.isArray(value.contact.links)
  );
}

export function isSiteContent(value: unknown): value is SiteContent {
  if (!isRecord(value) || !isRecord(value.translations) || !Array.isArray(value.projects)) {
    return false;
  }

  return isTranslationContent(value.translations.ru) && isTranslationContent(value.translations.ua);
}

function mergeSettings(settings: unknown): SiteContentSettings {
  const current = isRecord(settings) ? settings : {};
  const sections = isRecord(current.sections) ? current.sections : {};
  const assets = isRecord(current.assets) ? current.assets : {};

  return {
    ...defaultSiteContent.settings,
    ...current,
    sections: {
      ...defaultSiteContent.settings.sections,
      ...sections
    },
    assets: {
      ...defaultSiteContent.settings.assets,
      ...assets,
      images: Array.isArray(assets.images) ? assets.images : defaultSiteContent.settings.assets.images,
      sounds: Array.isArray(assets.sounds) ? assets.sounds : defaultSiteContent.settings.assets.sounds,
      animations: Array.isArray(assets.animations) ? assets.animations : defaultSiteContent.settings.assets.animations
    },
    editableSections: {
      ...(defaultSiteContent.settings.editableSections ?? {}),
      ...(isRecord(current.editableSections) ? current.editableSections : {})
    }
  } as SiteContentSettings;
}

function mergeSiteContent(content: SiteContent): SiteContent {
  return {
    ...defaultSiteContent,
    ...content,
    translations: {
      ru: content.translations.ru ?? defaultSiteContent.translations.ru,
      ua: content.translations.ua ?? defaultSiteContent.translations.ua
    },
    projects: Array.isArray(content.projects) ? content.projects : defaultSiteContent.projects,
    settings: mergeSettings((content as { settings?: unknown }).settings)
  };
}

export function normalizeSiteContent(value: unknown): SiteContent {
  return isSiteContent(value) ? mergeSiteContent(value) : defaultSiteContent;
}

export async function getSiteContent(): Promise<SiteContentResult> {
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("data, updated_at")
      .eq("key", SITE_CONTENT_KEY)
      .maybeSingle();

    if (error) {
      return {
        content: defaultSiteContent,
        source: "fallback",
        updatedAt: null,
        error: error.message
      };
    }

    if (data && isSiteContent(data.data)) {
      return {
        content: normalizeSiteContent(data.data),
        source: "supabase",
        updatedAt: data.updated_at ?? null
      };
    }
  } catch (error) {
    return {
      content: defaultSiteContent,
      source: "fallback",
      updatedAt: null,
      error: error instanceof Error ? error.message : "Unknown content loading error"
    };
  }

  return {
    content: defaultSiteContent,
    source: "fallback",
    updatedAt: null
  };
}

export function getLocalizedContent(content: SiteContent, lang: Lang): TranslationContent {
  return content.translations[lang] ?? defaultSiteContent.translations[lang];
}

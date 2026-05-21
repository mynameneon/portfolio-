import type { ReactNode } from "react";

export type Lang = "ru" | "ua";

export type ContactStatus = "idle" | "loading" | "success" | "error";

export type ExperienceType = "official" | "freelance" | "education";

export type ExperienceFocus = "primary" | "secondary";

export type SectionId =
  | "hero"
  | "parallax"
  | "depthDeck"
  | "threeLab"
  | "services"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "contact";

export type ExperienceAnimationName =
  | "cart"
  | "crane"
  | "battery"
  | "conveyor"
  | "supermarket"
  | "drone"
  | "terminal"
  | "wireframe"
  | "social"
  | "hiring"
  | "charts"
  | "browser"
  | "funnel"
  | "paint";

export interface ContactResult {
  success: boolean;
  error?: string;
  databaseSaved?: boolean;
  emailSent?: boolean;
}

export type ProjectPreviewVariant = "board" | "audio" | "chat" | "dashboard" | "map" | "files" | "stream" | "terminal" | "game" | "key";

export interface LocalizedCopy {
  ru: string;
  ua: string;
}

export interface EditableVisibility {
  hidden?: boolean;
}

export interface ProjectShowcaseItem extends EditableVisibility {
  id: string;
  title: string;
  kind: LocalizedCopy;
  summary: LocalizedCopy;
  highlights: readonly LocalizedCopy[];
  stack: readonly string[];
  variant: ProjectPreviewVariant;
  accent: string;
}

export interface SkillCategory extends EditableVisibility {
  id: string;
  title: string;
  accentColor: string;
  skills: readonly string[];
}

export interface ExperienceItem extends EditableVisibility {
  id: string;
  type: ExperienceType;
  focus?: ExperienceFocus;
  title: string;
  company?: string;
  shortDesc: string;
  fullDesc: string;
  animation: ExperienceAnimationName;
  accentColor: string;
}

export interface ContactLink extends EditableVisibility {
  id: string;
  label: string;
  value: string;
  href: string;
}

export interface EditableAsset extends EditableVisibility {
  id: string;
  label: string;
  src: string;
  kind?: "image" | "sound" | "animation" | "video" | "code";
  alt?: string;
  notes?: string;
}

export interface SectionVisibility {
  label: string;
  hidden?: boolean;
}

export interface SiteContentSettings {
  sections: Record<SectionId, SectionVisibility>;
  assets: {
    images: readonly EditableAsset[];
    sounds: readonly EditableAsset[];
    animations: readonly EditableAsset[];
  };
  editableSections?: Record<string, unknown>;
}

export interface TranslationContent {
  nav: {
    home: string;
    about: string;
    skills: string;
    experience: string;
    projects: string;
    contact: string;
  };
  common: {
    official: string;
    freelance: string;
    education: string;
    open: string;
    readMore: string;
    close: string;
  };
  hero: {
    eyebrow: string;
    greeting: string;
    title: string;
    description: string;
    ctaContact: string;
    ctaExperience: string;
    typewriter: readonly string[];
    portrait: {
      src: string;
      alt: string;
      objectPosition: string;
    };
    stats: ReadonlyArray<{ value: string; label: string; hidden?: boolean }>;
    roles: ReadonlyArray<{ label: string; value: string; hidden?: boolean }>;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    cards: ReadonlyArray<{ title: string; body: string; code: string; hidden?: boolean }>;
  };
  skills: {
    eyebrow: string;
    title: string;
    body: string;
    categories: readonly SkillCategory[];
  };
  experience: {
    eyebrow: string;
    title: string;
    body: string;
    modalLabel: string;
    focusPrimaryTitle: string;
    focusPrimaryBody: string;
    focusSecondaryTitle: string;
    focusSecondaryBody: string;
    items: readonly ExperienceItem[];
  };
  projects: {
    eyebrow: string;
    title: string;
    body: string;
    stack: string;
    highlights: string;
    demo: string;
    cta: string;
    note: string;
    depthLabel: string;
    depthTitle: string;
    depthBody: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    body: string;
    directTitle: string;
    formTitle: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    successHint: string;
    error: string;
    emailDeliveryError: string;
    validationRequired: string;
    validationEmail: string;
    links: readonly ContactLink[];
  };
  footer: {
    line: string;
  };
}

export interface ExperienceCardProps {
  item: ExperienceItem;
  animation: ReactNode;
  index: number;
  onOpen: (item: ExperienceItem) => void;
}

export interface SiteContent {
  translations: Record<Lang, TranslationContent>;
  projects: readonly ProjectShowcaseItem[];
  settings: SiteContentSettings;
}

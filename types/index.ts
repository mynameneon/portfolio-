import type { ReactNode } from "react";

export type Lang = "ru" | "ua";

export type ContactStatus = "idle" | "loading" | "success" | "error";

export type ExperienceType = "official" | "freelance";

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

export interface SkillCategory {
  id: string;
  title: string;
  accentColor: string;
  skills: readonly string[];
}

export interface ExperienceItem {
  id: string;
  type: ExperienceType;
  title: string;
  company?: string;
  shortDesc: string;
  fullDesc: string;
  animation: ExperienceAnimationName;
  accentColor: string;
}

export interface ContactLink {
  id: string;
  label: string;
  value: string;
  href: string;
}

export interface TranslationContent {
  nav: {
    home: string;
    about: string;
    skills: string;
    experience: string;
    contact: string;
  };
  common: {
    official: string;
    freelance: string;
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
    stats: ReadonlyArray<{ value: string; label: string }>;
    roles: ReadonlyArray<{ label: string; value: string }>;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    cards: ReadonlyArray<{ title: string; body: string; code: string }>;
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
    items: readonly ExperienceItem[];
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

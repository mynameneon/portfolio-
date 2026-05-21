import { editableSections } from "@/lib/editableSections";
import { projectShowcaseItems } from "@/lib/projectShowcase";
import { translations } from "@/lib/translations";
import type { SiteContent, SiteContentSettings } from "@/types";

export const defaultSiteSettings: SiteContentSettings = {
  sections: {
    hero: { label: "Главный экран" },
    parallax: { label: "3D Parallax system" },
    depthDeck: { label: "3D page flow" },
    threeLab: { label: "Three.js / Spatial UI" },
    services: { label: "Услуги / pricing" },
    about: { label: "Профиль" },
    skills: { label: "Стек" },
    experience: { label: "Опыт" },
    projects: { label: "Проекты" },
    contact: { label: "Связь / форма" }
  },
  assets: {
    images: [
      {
        id: "hero-portrait",
        label: "Фото на главном экране",
        src: "/images/nikita-portrait.png",
        kind: "image",
        alt: "Никита Кононенко",
        notes: "Меняется в translations.ru.hero.portrait и translations.ua.hero.portrait."
      }
    ],
    sounds: [],
    animations: [
      {
        id: "experience-animation",
        label: "Анимации карточек опыта",
        src: "components/experience/ExperienceAnimations.tsx",
        kind: "code",
        notes: "В карточках опыта меняется поле animation: terminal, drone, battery, browser, charts и другие."
      },
      {
        id: "project-preview-variant",
        label: "Анимации/preview проектов",
        src: "components/projects/ProjectPreview.tsx",
        kind: "code",
        notes: "В проектах меняется поле variant: board, audio, chat, dashboard, map, files, stream, terminal, game, key."
      }
    ]
  },
  editableSections
};

export const defaultSiteContent: SiteContent = {
  translations,
  projects: projectShowcaseItems,
  settings: defaultSiteSettings
};

"use client";

import { useState } from "react";
import { ExperienceAnimation } from "@/components/experience/ExperienceAnimations";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { ExperienceModal } from "@/components/experience/ExperienceModal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { useLanguage } from "@/hooks/useLanguage";
import { pageDepthContent } from "@/lib/editableSections";
import type { ExperienceItem } from "@/types";
import { PageDepthScene } from "./PageDepthScene";

const primaryExperienceOrder = ["computer-academy", "fullstack", "ux-ui", "site-admin", "analytics", "fpv", "atlant"];
const primaryExperienceIds = new Set(primaryExperienceOrder);


function getExperienceFocus(item: ExperienceItem) {
  return item.focus ?? (primaryExperienceIds.has(item.id) ? "primary" : "secondary");
}

function sortPrimaryExperience(items: readonly ExperienceItem[]) {
  return [...items].sort((first, second) => {
    const firstIndex = primaryExperienceOrder.indexOf(first.id);
    const secondIndex = primaryExperienceOrder.indexOf(second.id);
    return (firstIndex === -1 ? 99 : firstIndex) - (secondIndex === -1 ? 99 : secondIndex);
  });
}

function ExperienceGroup({
  title,
  body,
  items,
  offset,
  onOpen
}: {
  title: string;
  body: string;
  items: readonly ExperienceItem[];
  offset: number;
  onOpen: (item: ExperienceItem) => void;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="mb-5 max-w-3xl">
        <h3 className="text-2xl font-semibold text-text-primary">{title}</h3>
        <p className="mt-2 text-[15px] leading-7 text-[var(--text-soft)]">{body}</p>
      </div>
      <div className="relative grid gap-4 lg:gap-6">
        <span className="absolute inset-y-2 left-1/2 hidden w-px bg-line lg:block" aria-hidden="true" />
        {items.map((item, index) => (
          <ExperienceCard
            key={item.id}
            item={item}
            index={index + offset}
            animation={<ExperienceAnimation name={item.animation} accentColor={item.accentColor} />}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const { lang, content, getEditableSection, isSectionVisible } = useLanguage();
  const [selected, setSelected] = useState<ExperienceItem | null>(null);
  const depthContent = getEditableSection("pageDepth", pageDepthContent);
  const depth = depthContent.experience[lang] ?? pageDepthContent.experience[lang];
  const visibleItems = content.experience.items.filter((item) => item.hidden !== true);
  const primaryItems = sortPrimaryExperience(visibleItems.filter((item) => getExperienceFocus(item) === "primary"));
  const secondaryItems = visibleItems.filter((item) => getExperienceFocus(item) === "secondary");

  if (!isSectionVisible("experience")) {
    return null;
  }

  return (
    <section id="experience" className="section-band">
      <div className="shell">
        <div key={lang}>
          <SectionHeader eyebrow={content.experience.eyebrow} title={content.experience.title} body={content.experience.body} />
          <PageDepthScene
            label={depth.label}
            title={depth.title}
            body={depth.body}
            items={primaryItems.slice(0, 6).map((item) => (item.company ? `${item.company} / ${item.title}` : item.title))}
            accent="#af52de"
            hint="experience route / 3D layers"
          />
          <ExperienceGroup
            title={content.experience.focusPrimaryTitle}
            body={content.experience.focusPrimaryBody}
            items={primaryItems}
            offset={0}
            onOpen={setSelected}
          />
          <ExperienceGroup
            title={content.experience.focusSecondaryTitle}
            body={content.experience.focusSecondaryBody}
            items={secondaryItems}
            offset={primaryItems.length}
            onOpen={setSelected}
          />
        </div>
      </div>
      <ExperienceModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

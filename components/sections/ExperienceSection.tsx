"use client";

import { useState } from "react";
import { ExperienceAnimation } from "@/components/experience/ExperienceAnimations";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { ExperienceModal } from "@/components/experience/ExperienceModal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { useLanguage } from "@/hooks/useLanguage";
import type { ExperienceItem } from "@/types";
import { PageDepthScene } from "./PageDepthScene";

const depthCopy = {
  ru: {
    label: "experience path",
    title: "Опыт читается как маршрут задач.",
    body:
      "Официальная работа, фриланс и hardware-практика собраны в один объемный путь: от продаж и логистики до разработки, интерфейсов и FPV-сборок."
  },
  ua: {
    label: "experience path",
    title: "Досвід читається як маршрут задач.",
    body:
      "Офіційна робота, фриланс і hardware-практика зібрані в один об'ємний шлях: від продажів і логістики до розробки, інтерфейсів та FPV-збірок."
  }
} as const;

export function ExperienceSection() {
  const { lang, content } = useLanguage();
  const [selected, setSelected] = useState<ExperienceItem | null>(null);
  const depth = depthCopy[lang];

  return (
    <section id="experience" className="section-band">
      <div className="shell">
        <div key={lang}>
          <SectionHeader eyebrow={content.experience.eyebrow} title={content.experience.title} body={content.experience.body} />
          <PageDepthScene
            label={depth.label}
            title={depth.title}
            body={depth.body}
            items={content.experience.items.slice(0, 6).map((item) => (item.company ? `${item.company} / ${item.title}` : item.title))}
            accent="#af52de"
            hint="experience route / 3D layers"
          />
          <div className="relative grid gap-4 lg:gap-6">
            <span className="absolute inset-y-2 left-1/2 hidden w-px bg-line lg:block" aria-hidden="true" />
            {content.experience.items.map((item, index) => (
              <ExperienceCard
                key={item.id}
                item={item}
                index={index}
                animation={<ExperienceAnimation name={item.animation} accentColor={item.accentColor} />}
                onOpen={setSelected}
              />
            ))}
          </div>
        </div>
      </div>
      <ExperienceModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

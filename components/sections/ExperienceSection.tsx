"use client";

import { useState } from "react";
import { ExperienceAnimation } from "@/components/experience/ExperienceAnimations";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { ExperienceModal } from "@/components/experience/ExperienceModal";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { useLanguage } from "@/hooks/useLanguage";
import type { ExperienceItem } from "@/types";

export function ExperienceSection() {
  const { lang, content } = useLanguage();
  const [selected, setSelected] = useState<ExperienceItem | null>(null);

  return (
    <section id="experience" className="section-band">
      <div className="shell">
        <div key={lang}>
          <SectionHeader eyebrow={content.experience.eyebrow} title={content.experience.title} body={content.experience.body} />
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

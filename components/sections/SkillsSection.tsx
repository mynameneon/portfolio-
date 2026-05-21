"use client";

import { motion } from "framer-motion";
import { BarChart3, Code2, Cpu, Palette, Users, Wrench } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { useLanguage } from "@/hooks/useLanguage";
import { pageDepthContent } from "@/lib/editableSections";
import { fadeUp, staggerContainer } from "@/lib/animations";
import type { SkillCategory } from "@/types";
import { PageDepthScene } from "./PageDepthScene";


function SkillIcon({ id, color }: { id: string; color: string }) {
  const props = { size: 21, color, strokeWidth: 1.9 };

  if (id === "development") return <Code2 {...props} />;
  if (id === "design") return <Palette {...props} />;
  if (id === "marketing") return <BarChart3 {...props} />;
  if (id === "business") return <Wrench {...props} />;
  if (id === "soft") return <Users {...props} />;
  return <Cpu {...props} />;
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <GlassCard
      className="grid min-h-[280px] content-between gap-9 p-6"
      variants={fadeUp}
      custom={index}
      hoverGlow="0 26px 70px rgba(0,0,0,0.11)"
    >
      <div className="flex items-start justify-between gap-5">
        <h3 className="max-w-[14rem] text-2xl font-semibold leading-tight text-text-primary">{category.title}</h3>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line bg-white/[0.055] shadow-inner">
          <SkillIcon id={category.id} color={category.accentColor} />
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <motion.span
            key={skill}
            className="rounded-full border border-line bg-white/[0.045] px-3 py-1.5 text-xs font-medium leading-none text-[var(--text-soft)]"
            whileHover={{
              borderColor: `${category.accentColor}80`,
              backgroundColor: `${category.accentColor}16`,
              color: category.accentColor,
              y: -2
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </GlassCard>
  );
}

export function SkillsSection() {
  const { lang, content, getEditableSection, isSectionVisible } = useLanguage();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });
  const depthContent = getEditableSection("pageDepth", pageDepthContent);
  const depth = depthContent.skills[lang] ?? pageDepthContent.skills[lang];
  const categories = content.skills.categories.filter((category) => category.hidden !== true);

  if (!isSectionVisible("skills")) {
    return null;
  }

  return (
    <section id="skills" className="section-band">
      <div className="shell">
        <motion.div key={lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.28 }}>
          <SectionHeader eyebrow={content.skills.eyebrow} title={content.skills.title} body={content.skills.body} />
          <PageDepthScene
            label={depth.label}
            title={depth.title}
            body={depth.body}
            items={categories.map((category) => category.title)}
            accent="#30d158"
            hint="skill map / parallax"
          />
          <motion.div
            ref={ref}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {categories.map((category, index) => (
              <SkillCard key={category.id} category={category} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

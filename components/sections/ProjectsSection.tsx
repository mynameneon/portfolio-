"use client";

import { motion } from "framer-motion";
import { ArrowRight, FolderGit2, MousePointerClick, PlayCircle } from "lucide-react";
import { useState } from "react";
import { ProjectDemoModal } from "@/components/projects/ProjectDemoModal";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { NeonButton } from "@/components/ui/NeonButton";
import { useLanguage } from "@/hooks/useLanguage";
import { projectShowcaseItems, type ProjectShowcaseItem } from "@/lib/projectShowcase";

const copy = {
  ru: {
    eyebrow: "Projects",
    title: "Проекты, которые можно открыть прямо внутри сайта.",
    body:
      "Здесь не список папок, а витрина сценариев: игры, realtime-аудио, desktop-shell, бизнес-OS, файловый менеджер, Telegram mini app и streaming shell. Нажми на проект, чтобы открыть тест-версию с живыми состояниями.",
    stack: "Стек",
    highlights: "Что внутри",
    demo: "Открыть демо",
    cta: "Обсудить похожий проект",
    note: "Каждое демо работает прямо на этой странице как интерактивный прототип: клиент видит поведение, ключевые экраны и логику без доступа к локальным репозиториям."
  },
  ua: {
    eyebrow: "Projects",
    title: "Проєкти, які можна відкрити прямо всередині сайту.",
    body:
      "Тут не список папок, а вітрина сценаріїв: ігри, realtime-аудіо, desktop-shell, бізнес-OS, файловий менеджер, Telegram mini app і streaming shell. Натисни на проєкт, щоб відкрити тест-версію з живими станами.",
    stack: "Стек",
    highlights: "Що всередині",
    demo: "Відкрити демо",
    cta: "Обговорити схожий проєкт",
    note: "Кожне демо працює прямо на цій сторінці як інтерактивний прототип: клієнт бачить поведінку, ключові екрани й логіку без доступу до локальних репозиторіїв."
  }
} as const;

export function ProjectsSection() {
  const { lang } = useLanguage();
  const content = copy[lang];
  const [activeProject, setActiveProject] = useState<ProjectShowcaseItem | null>(null);

  return (
    <section className="section-band" data-hint={content.demo}>
      <div className="shell">
        <motion.div
          className="mx-auto mb-14 grid max-w-[1000px] justify-items-center gap-5 text-center"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 className="max-w-5xl text-balance font-display text-[clamp(2.75rem,6vw,6rem)] font-semibold leading-[0.94] text-text-primary sm:leading-[0.92]">{content.title}</h1>
          <p className="max-w-[78ch] text-pretty text-[17px] leading-8 text-[var(--text-soft)]">{content.body}</p>
        </motion.div>

        <div className="grid gap-5">
          {projectShowcaseItems.map((project, index) => (
            <motion.article
              key={project.id}
              className="group grid overflow-hidden rounded-[34px] border border-line bg-white/[0.055] shadow-[0_34px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl lg:grid-cols-[0.92fr_1.08fr]"
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.58, delay: Math.min(index * 0.04, 0.3) }}
              data-hint={content.demo}
            >
              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className="relative min-h-[270px] border-b border-white/10 bg-black/28 p-5 text-left outline-none lg:border-b-0 lg:border-r"
                data-cursor="interactive"
                aria-label={`${content.demo}: ${project.title}`}
              >
                <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: `radial-gradient(circle at 50% 0%, ${project.accent}26, transparent 58%)` }} />
                <div className="relative">
                  <ProjectPreview variant={project.variant} accent={project.accent} />
                </div>
                <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-2 text-xs font-semibold text-text-primary backdrop-blur-xl">
                  <PlayCircle size={15} style={{ color: project.accent }} />
                  {content.demo}
                </span>
              </button>

              <div className="p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[11px] uppercase text-[var(--text-soft)]">
                      <FolderGit2 size={14} style={{ color: project.accent }} />
                      {project.kind[lang]}
                    </span>
                    <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-text-primary sm:text-4xl">{project.title}</h2>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 font-mono text-[11px] text-[var(--text-faint)]">#{String(index + 1).padStart(2, "0")}</span>
                </div>

                <p className="mt-5 text-pretty text-[15px] leading-7 text-[var(--text-soft)]">{project.summary[lang]}</p>

                <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.86fr]">
                  <div>
                    <h3 className="font-mono text-[11px] uppercase text-[var(--text-faint)]">{content.highlights}</h3>
                    <div className="mt-3 grid gap-2">
                      {project.highlights.map((item) => (
                        <span key={item.ru} className="rounded-2xl border border-white/10 bg-black/24 px-3 py-2 text-sm text-[var(--text-soft)]">
                          {item[lang]}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-mono text-[11px] uppercase text-[var(--text-faint)]">{content.stack}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={item} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs text-[var(--text-soft)]">
                          {item}
                        </span>
                      ))}
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black"
                      whileTap={{ scale: 0.97 }}
                      data-cursor="interactive"
                    >
                      <MousePointerClick size={15} />
                      {content.demo}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[28px] border border-line bg-white/[0.045] p-5 text-sm text-[var(--text-soft)] shadow-[0_26px_86px_rgba(0,0,0,0.32)] sm:flex-row sm:items-center">
          <span>{content.note}</span>
          <NeonButton href="/contact" className="w-full sm:w-auto">
            {content.cta}
            <ArrowRight size={16} />
          </NeonButton>
        </div>
      </div>
      <ProjectDemoModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}

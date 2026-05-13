"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ChevronDown, Layers3, MousePointer2, Route, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const copy = {
  ru: {
    eyebrow: "3D page flow",
    title: "Листание как у сайта-презентации, а не карточка на фоне.",
    body:
      "Скролл ведет через этапы проекта как через объемные страницы: бриф, прототип, разработка, интеграции и запуск. Панели не просто двигаются, а разворачиваются в перспективе, чтобы показать глубину интерфейса.",
    scroll: "листай вниз",
    hint: "scroll / 3D flip",
    route: "client path",
    frames: [
      {
        stage: "01 / brief",
        title: "Бриф и цель",
        body: "Фиксируем аудиторию, оффер, сценарий заявки и самый важный экран сайта.",
        chips: ["strategy", "offer", "UX map"]
      },
      {
        stage: "02 / prototype",
        title: "Прототип страниц",
        body: "Собираем структуру как продуктовый интерфейс: блоки, навигация, состояния, мобильная логика.",
        chips: ["wireframe", "mobile", "content"]
      },
      {
        stage: "03 / visual",
        title: "Apple-dark визуал",
        body: "Минимум шума, аккуратный стек, мягкий голубой акцент, много воздуха и сильная типографика.",
        chips: ["premium", "motion", "system"]
      },
      {
        stage: "04 / build",
        title: "Разработка",
        body: "Next.js, TypeScript, Supabase, формы, SEO, адаптив, анимации и компоненты без лишнего мусора.",
        chips: ["Next.js", "Supabase", "Netlify"]
      },
      {
        stage: "05 / launch",
        title: "Запуск и рост",
        body: "Проверка, деплой, GitHub, Netlify, аналитика и дальнейшие правки без пересборки проекта с нуля.",
        chips: ["QA", "deploy", "support"]
      }
    ]
  },
  ua: {
    eyebrow: "3D page flow",
    title: "Гортання як у сайту-презентації, а не картка на фоні.",
    body:
      "Скрол веде через етапи проєкту як через об'ємні сторінки: бриф, прототип, розробка, інтеграції та запуск. Панелі не просто рухаються, а розвертаються в перспективі, щоб показати глибину інтерфейсу.",
    scroll: "гортай вниз",
    hint: "scroll / 3D flip",
    route: "client path",
    frames: [
      {
        stage: "01 / brief",
        title: "Бриф і ціль",
        body: "Фіксуємо аудиторію, офер, сценарій заявки й найважливіший екран сайту.",
        chips: ["strategy", "offer", "UX map"]
      },
      {
        stage: "02 / prototype",
        title: "Прототип сторінок",
        body: "Збираємо структуру як продуктовий інтерфейс: блоки, навігація, стани, мобільна логіка.",
        chips: ["wireframe", "mobile", "content"]
      },
      {
        stage: "03 / visual",
        title: "Apple-dark візуал",
        body: "Мінімум шуму, акуратний стек, м'який блакитний акцент, багато повітря й сильна типографіка.",
        chips: ["premium", "motion", "system"]
      },
      {
        stage: "04 / build",
        title: "Розробка",
        body: "Next.js, TypeScript, Supabase, форми, SEO, адаптив, анімації та компоненти без зайвого сміття.",
        chips: ["Next.js", "Supabase", "Netlify"]
      },
      {
        stage: "05 / launch",
        title: "Запуск і ріст",
        body: "Перевірка, деплой, GitHub, Netlify, аналітика й подальші правки без перескладання проєкту з нуля.",
        chips: ["QA", "deploy", "support"]
      }
    ]
  }
} as const;

interface FlowFrame {
  stage: string;
  title: string;
  body: string;
  chips: readonly string[];
}

function FlowPanel({
  frame,
  index,
  total,
  progress
}: {
  frame: FlowFrame;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const center = total === 1 ? 0 : index / (total - 1);
  const input = [center - 0.22, center, center + 0.22];
  const x = useTransform(progress, input, [170 - index * 16, 0, -190 - index * 20]);
  const y = useTransform(progress, input, [96, 0, -96]);
  const rotateY = useTransform(progress, input, [52, 0, -58]);
  const rotateX = useTransform(progress, input, [-8, 0, 10]);
  const scale = useTransform(progress, input, [0.72, 1, 0.7]);
  const opacity = useTransform(progress, input, [0.08, 1, 0.08]);
  const blur = useTransform(progress, input, [5, 0, 6]);
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <motion.article
      className="absolute left-1/2 top-1/2 w-[min(82vw,560px)] overflow-hidden rounded-[34px] border border-white/15 bg-[#06080b]/88 p-5 text-left shadow-[0_42px_130px_rgba(0,0,0,0.62)] backdrop-blur-2xl sm:p-6"
      style={{
        x,
        y,
        rotateY,
        rotateX,
        scale,
        opacity,
        filter,
        zIndex: total - index,
        transformStyle: "preserve-3d"
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 74% 0%, rgba(41,151,255,0.2), transparent 34%), linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "auto, 46px 46px, 46px 46px"
        }}
      />
      <div className="relative flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 font-mono text-[11px] uppercase text-[var(--text-soft)]">
          <Layers3 size={14} className="text-[#2997ff]" />
          {frame.stage}
        </span>
        <motion.span
          className="h-2 w-24 rounded-full bg-[#2997ff]"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="relative">
        <h3 className="mt-8 text-balance font-display text-[clamp(2rem,4vw,4.4rem)] font-semibold leading-[0.95] text-text-primary">{frame.title}</h3>
        <p className="mt-5 max-w-[48ch] text-[15px] leading-7 text-[var(--text-soft)]">{frame.body}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {frame.chips.map((chip) => (
            <span key={chip} className="rounded-full border border-white/10 bg-black/34 px-3 py-1.5 font-mono text-[11px] text-[var(--text-soft)]">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function FlowRail({ frames, progress }: { frames: readonly FlowFrame[]; progress: MotionValue<number> }) {
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="mt-8">
      <div className="h-px overflow-hidden rounded-full bg-white/12">
        <motion.span className="block h-full rounded-full bg-[#2997ff]" style={{ width }} />
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {frames.map((frame, index) => (
          <span key={frame.stage} className="rounded-2xl border border-white/10 bg-white/[0.035] px-2 py-2 text-center font-mono text-[10px] uppercase text-[var(--text-faint)]">
            {String(index + 1).padStart(2, "0")}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DepthDeckSection() {
  const { lang } = useLanguage();
  const content = copy[lang];
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 74, damping: 22, mass: 0.35 });
  const stageRotate = useTransform(smoothProgress, [0, 0.5, 1], [-3, 0, 3]);
  const stageY = useTransform(smoothProgress, [0, 1], [24, -24]);

  return (
    <section ref={sectionRef} className="relative min-h-[250svh] border-t border-line" data-hint={content.hint}>
      <div className="sticky top-[66px] grid min-h-[calc(100svh-66px)] items-center overflow-hidden py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_34%,rgba(41,151,255,0.16),transparent_28rem),radial-gradient(circle_at_34%_74%,rgba(102,199,255,0.06),transparent_24rem)]" />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2997ff]/14"
          animate={{ rotate: 360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        />
        <div className="shell relative grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="max-w-[690px] max-lg:text-center">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="mt-3 text-balance font-display text-[clamp(2.8rem,6.4vw,6.5rem)] font-semibold leading-[0.9] text-text-primary">{content.title}</h2>
            <p className="mt-7 text-pretty text-[17px] leading-8 text-[var(--text-soft)]">{content.body}</p>
            <div className="mt-8 flex flex-wrap gap-3 max-lg:justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.055] px-4 py-2 text-sm text-[var(--text-soft)] shadow-[0_18px_52px_rgba(0,0,0,0.3)]">
                <MousePointer2 size={15} className="text-[#2997ff]" />
                {content.hint}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.055] px-4 py-2 text-sm text-[var(--text-soft)] shadow-[0_18px_52px_rgba(0,0,0,0.3)]">
                <ChevronDown size={15} className="text-[#2997ff]" />
                {content.scroll}
              </span>
            </div>
            <FlowRail frames={content.frames} progress={smoothProgress} />
          </div>

          <motion.div
            className="relative min-h-[590px] [perspective:1800px] max-lg:min-h-[510px]"
            style={{ rotateY: stageRotate, y: stageY, transformStyle: "preserve-3d" }}
          >
            <div className="absolute left-1/2 top-1/2 h-[440px] w-[min(86vw,660px)] -translate-x-1/2 -translate-y-1/2 rounded-[46px] border border-white/10 bg-white/[0.035] shadow-[0_48px_150px_rgba(0,0,0,0.5)]" />
            <div className="absolute left-[9%] top-[12%] hidden rounded-full border border-white/10 bg-black/40 px-3 py-2 font-mono text-[11px] uppercase text-[var(--text-soft)] lg:inline-flex">
              <Route size={14} className="mr-2 text-[#2997ff]" />
              {content.route}
            </div>
            <motion.div
              className="absolute right-[4%] top-[8%] hidden h-20 w-20 rounded-[28px] border border-[#2997ff]/30 bg-[#2997ff]/10 lg:grid lg:place-items-center"
              animate={{ rotateX: [0, 18, 0], rotateY: [-18, 18, -18], y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={24} className="text-[#66c7ff]" />
            </motion.div>
            {content.frames.map((frame, index) => (
              <FlowPanel key={frame.stage} frame={frame} index={index} total={content.frames.length} progress={smoothProgress} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

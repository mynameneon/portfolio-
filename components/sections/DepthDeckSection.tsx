"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Boxes, Layers3, MousePointer2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const copy = {
  ru: {
    eyebrow: "3D page flow",
    title: "Листание как у продуктового интерфейса, не просто карточка на фоне.",
    body:
      "Этот блок показывает, как сайт может вести пользователя через услугу: первый экран, структура, интеграции и запуск перелистываются как объемные страницы. На desktop сцена реагирует на курсор, на mobile остается аккуратной stack-анимацией.",
    hint: "move cursor / flip pages",
    prev: "Предыдущая страница",
    next: "Следующая страница",
    frames: [
      {
        stage: "01 / strategy",
        title: "Бриф и сценарий",
        body: "Сначала фиксируем цель, аудиторию, оффер и действие, которое должен совершить пользователь.",
        chips: ["UX map", "CTA", "conversion"]
      },
      {
        stage: "02 / layout",
        title: "3D-верстка блоков",
        body: "Секции собираются как слои: foreground для действия, middle для контента, background для атмосферы.",
        chips: ["depth", "responsive", "motion"]
      },
      {
        stage: "03 / integrations",
        title: "Формы, CRM, Supabase",
        body: "Заявки уходят в базу, уведомления приходят на почту, а структура остается готовой к расширению.",
        chips: ["Supabase", "Resend", "CRM"]
      },
      {
        stage: "04 / launch",
        title: "Деплой и поддержка",
        body: "Финальная сборка проверяется, пушится в GitHub и автоматически уходит в Netlify.",
        chips: ["Netlify", "QA", "support"]
      }
    ]
  },
  ua: {
    eyebrow: "3D page flow",
    title: "Гортання як у продуктового інтерфейсу, не просто картка на фоні.",
    body:
      "Цей блок показує, як сайт може вести користувача через послугу: перший екран, структура, інтеграції та запуск перегортаються як об'ємні сторінки. На desktop сцена реагує на курсор, на mobile лишається акуратною stack-анімацією.",
    hint: "move cursor / flip pages",
    prev: "Попередня сторінка",
    next: "Наступна сторінка",
    frames: [
      {
        stage: "01 / strategy",
        title: "Бриф і сценарій",
        body: "Спочатку фіксуємо ціль, аудиторію, офер і дію, яку має зробити користувач.",
        chips: ["UX map", "CTA", "conversion"]
      },
      {
        stage: "02 / layout",
        title: "3D-верстка блоків",
        body: "Секції збираються як шари: foreground для дії, middle для контенту, background для атмосфери.",
        chips: ["depth", "responsive", "motion"]
      },
      {
        stage: "03 / integrations",
        title: "Форми, CRM, Supabase",
        body: "Заявки йдуть у базу, сповіщення приходять на пошту, а структура готова до розширення.",
        chips: ["Supabase", "Resend", "CRM"]
      },
      {
        stage: "04 / launch",
        title: "Деплой і підтримка",
        body: "Фінальна збірка перевіряється, пушиться в GitHub і автоматично йде в Netlify.",
        chips: ["Netlify", "QA", "support"]
      }
    ]
  }
} as const;

const wrap = (value: number, length: number) => (value + length) % length;

export function DepthDeckSection() {
  const { lang } = useLanguage();
  const content = copy[lang];
  const [active, setActive] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 100, damping: 22 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 22 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const activeFrame = content.frames[active];

  const surrounding = useMemo(
    () => [
      { offset: -1, frame: content.frames[wrap(active - 1, content.frames.length)] },
      { offset: 0, frame: activeFrame },
      { offset: 1, frame: content.frames[wrap(active + 1, content.frames.length)] }
    ],
    [active, activeFrame, content.frames]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((value) => wrap(value + 1, content.frames.length));
    }, 5200);

    return () => window.clearInterval(timer);
  }, [content.frames.length]);

  const go = (direction: -1 | 1) => {
    setActive((value) => wrap(value + direction, content.frames.length));
  };

  return (
    <section className="section-band overflow-hidden">
      <div className="shell grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr]">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-3 text-balance font-display text-[clamp(2.7rem,5.6vw,5.4rem)] font-semibold leading-[0.94] text-text-primary">{content.title}</h2>
          <p className="mt-7 max-w-[62ch] text-[17px] leading-8 text-[var(--text-soft)]">{content.body}</p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.055] px-4 py-2 text-sm text-[var(--text-soft)] shadow-[0_18px_52px_rgba(0,0,0,0.3)]">
            <MousePointer2 size={15} className="text-[#2997ff]" />
            {content.hint}
          </div>
        </motion.div>

        <motion.div
          className="relative min-h-[620px] rounded-[44px] border border-line bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025))] p-4 shadow-[0_44px_140px_rgba(0,0,0,0.52)] sm:p-6"
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            x.set((event.clientX - rect.left) / rect.width - 0.5);
            y.set((event.clientY - rect.top) / rect.height - 0.5);
          }}
          onPointerLeave={() => {
            x.set(0);
            y.set(0);
          }}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[44px] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[length:52px_52px] opacity-50" />
          <div className="relative flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-black/35 px-3 py-2 font-mono text-xs text-[var(--text-soft)]">
              <Layers3 size={15} className="text-[#2997ff]" />
              {activeFrame.stage}
            </span>
            <div className="flex gap-2">
              <motion.button
                type="button"
                aria-label={content.prev}
                onClick={() => go(-1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-black/35 text-text-primary"
                whileTap={{ scale: 0.94 }}
              >
                <ArrowLeft size={16} />
              </motion.button>
              <motion.button
                type="button"
                aria-label={content.next}
                onClick={() => go(1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-black"
                whileTap={{ scale: 0.94 }}
              >
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </div>

          <div className="relative mt-8 grid min-h-[500px] place-items-center [perspective:1400px]">
            <motion.div className="relative h-[430px] w-full max-w-[650px]" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
              {surrounding.map(({ offset, frame }) => (
                <motion.article
                  key={`${frame.stage}-${offset}`}
                  className="absolute left-1/2 top-1/2 w-[min(92vw,520px)] rounded-[34px] border border-white/12 bg-black/72 p-5 text-left shadow-[0_34px_110px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-6"
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${offset * 74}px)`,
                    y: `calc(-50% + ${Math.abs(offset) * 28}px)`,
                    scale: offset === 0 ? 1 : 0.86,
                    opacity: offset === 0 ? 1 : 0.46,
                    rotateY: offset * -34,
                    zIndex: 20 - Math.abs(offset)
                  }}
                  transition={{ type: "spring", stiffness: 190, damping: 26 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 font-mono text-[11px] uppercase text-[var(--text-soft)]">
                      <Boxes size={14} className="text-[#2997ff]" />
                      {frame.stage}
                    </span>
                    <span className="h-2 w-20 rounded-full bg-[#2997ff]" />
                  </div>
                  <AnimatePresence mode="wait">
                    {offset === 0 ? (
                      <motion.div
                        key={frame.title}
                        initial={{ opacity: 0, rotateX: -18, y: 18 }}
                        animate={{ opacity: 1, rotateX: 0, y: 0 }}
                        exit={{ opacity: 0, rotateX: 16, y: -12 }}
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <h3 className="mt-8 text-balance font-display text-4xl font-semibold leading-tight text-text-primary sm:text-5xl">{frame.title}</h3>
                        <p className="mt-5 text-[15px] leading-7 text-[var(--text-soft)]">{frame.body}</p>
                        <div className="mt-7 flex flex-wrap gap-2">
                          {frame.chips.map((chip) => (
                            <span key={chip} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 font-mono text-[11px] text-[var(--text-soft)]">
                              {chip}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <div>
                        <h3 className="mt-8 text-3xl font-semibold text-text-primary">{frame.title}</h3>
                        <p className="mt-4 text-sm leading-6 text-[var(--text-soft)]">{frame.body}</p>
                      </div>
                    )}
                  </AnimatePresence>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

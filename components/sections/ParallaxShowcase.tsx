"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Box, Layers3, MousePointer2, Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const copy = {
  ru: {
    eyebrow: "3D Parallax system",
    title: "Интерфейс с глубиной, но без визуального шума.",
    body:
      "Сцена реагирует на курсор как аккуратный продуктовый mockup: слои интерфейса, стек задач, live-панель и карточки услуг двигаются с разной глубиной. Это добавляет премиальности, не превращая сайт в перегруженный аттракцион.",
    hint: "depth field active",
    layers: ["Research", "Prototype", "Frontend", "Launch"],
    metrics: ["0.9s LCP target", "SEO-ready", "CRM hooks"]
  },
  ua: {
    eyebrow: "3D Parallax system",
    title: "Інтерфейс із глибиною, але без візуального шуму.",
    body:
      "Сцена реагує на курсор як акуратний продуктовий mockup: шари інтерфейсу, стек задач, live-панель і картки послуг рухаються з різною глибиною. Це додає преміальності, не перетворюючи сайт на перевантажений атракціон.",
    hint: "depth field active",
    layers: ["Research", "Prototype", "Frontend", "Launch"],
    metrics: ["0.9s LCP target", "SEO-ready", "CRM hooks"]
  }
} as const;

export function ParallaxShowcase() {
  const { lang } = useLanguage();
  const content = copy[lang];
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 110, damping: 24, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 110, damping: 24, mass: 0.4 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [9, -9]);
  const layerX = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const layerY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);

  return (
    <section className="section-band overflow-hidden">
      <div className="shell grid items-center gap-12 lg:grid-cols-[0.86fr_1.14fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-3 text-balance font-display text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[0.9] text-text-primary">{content.title}</h2>
          <p className="mt-7 max-w-[58ch] text-[17px] leading-8 text-[var(--text-soft)]">{content.body}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {content.metrics.map((metric) => (
              <span key={metric} className="rounded-full border border-line bg-white/[0.055] px-4 py-2 font-mono text-xs text-[var(--text-soft)]">
                {metric}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative min-h-[560px] rounded-[40px] border border-line bg-[radial-gradient(circle_at_50%_0%,rgba(41,151,255,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-5 shadow-[0_44px_140px_rgba(0,0,0,0.54)]"
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            x.set((event.clientX - rect.left) / rect.width - 0.5);
            y.set((event.clientY - rect.top) / rect.height - 0.5);
          }}
          onPointerLeave={() => {
            x.set(0);
            y.set(0);
          }}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:44px_44px] opacity-45" />
          <div className="relative flex items-center justify-between text-xs text-[var(--text-soft)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-black/35 px-3 py-2">
              <MousePointer2 size={14} className="text-[#2997ff]" />
              {content.hint}
            </span>
            <span className="rounded-full border border-line bg-black/35 px-3 py-2 font-mono">depth / 03</span>
          </div>

          <div className="relative mt-8 grid min-h-[455px] place-items-center [perspective:1200px]">
            <motion.div
              className="relative h-[370px] w-full max-w-[620px]"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute inset-x-8 top-3 z-10 h-[310px] rounded-[34px] border border-white/12 bg-black/70 p-5 shadow-[0_34px_110px_rgba(0,0,0,0.55)]"
                style={{ x: layerX, y: layerY, transform: "translateZ(70px)" }}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary">
                    <Layers3 size={17} className="text-[#2997ff]" />
                    product.surface
                  </span>
                  <span className="rounded-full bg-[#30d158]/15 px-3 py-1 font-mono text-[11px] text-[#30d158]">live</span>
                </div>
                <div className="mt-5 grid grid-cols-[0.7fr_1.3fr] gap-4">
                  <div className="grid gap-3">
                    {content.layers.map((layer, index) => (
                      <motion.span
                        key={layer}
                        className="rounded-2xl border border-white/10 bg-white/[0.055] px-3 py-3 text-sm text-[var(--text-soft)]"
                        animate={{ x: index === 2 ? [0, 8, 0] : 0, borderColor: index === 2 ? ["rgba(255,255,255,0.1)", "rgba(41,151,255,0.45)", "rgba(255,255,255,0.1)"] : undefined }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {layer}
                      </motion.span>
                    ))}
                  </div>
                  <div className="rounded-[26px] border border-white/10 bg-white/[0.045] p-4">
                    <div className="grid h-36 grid-cols-5 items-end gap-2">
                      {[40, 72, 52, 94, 68].map((height, index) => (
                        <motion.span
                          key={index}
                          className="rounded-t-xl bg-[#2997ff]"
                          animate={{ height: [`${height * 0.45}%`, `${height}%`, `${height * 0.55}%`] }}
                          transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.12 }}
                        />
                      ))}
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-white/10">
                      <motion.span className="block h-full rounded-full bg-white" animate={{ width: ["28%", "84%", "48%"] }} transition={{ duration: 3.2, repeat: Infinity }} />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute left-0 top-28 z-20 w-[210px] rounded-[28px] border border-white/12 bg-white/[0.09] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
                style={{ transform: "translateZ(130px) rotateY(-5deg)" }}
                animate={{ y: [-8, 6, -8] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Box size={20} className="text-[#30d158]" />
                <strong className="mt-4 block text-lg text-text-primary">Build stack</strong>
                <span className="mt-2 block text-sm leading-6 text-[var(--text-soft)]">Next.js / Supabase / UX / analytics</span>
              </motion.div>

              <motion.div
                className="absolute bottom-0 right-0 z-20 w-[250px] rounded-[30px] border border-white/12 bg-black/72 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.46)]"
                style={{ transform: "translateZ(160px) rotateY(7deg)" }}
                animate={{ y: [6, -10, 6] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles size={18} className="text-[#ffd60a]" />
                <strong className="mt-4 block text-lg text-text-primary">Premium motion</strong>
                <span className="mt-2 block text-sm leading-6 text-[var(--text-soft)]">Слои, глубина, аккуратные hover-состояния.</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

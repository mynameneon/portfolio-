"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Box, Layers3, MousePointer2, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useCompactMotion } from "@/hooks/useCompactMotion";
import { useLanguage } from "@/hooks/useLanguage";
import { parallaxShowcaseContent } from "@/lib/editableSections";


export function ParallaxShowcase() {
  const { lang, getEditableSection, isSectionVisible } = useLanguage();
  const editableContent = getEditableSection("parallax", parallaxShowcaseContent);
  const content = editableContent[lang] ?? parallaxShowcaseContent[lang];
  const compactMotion = useCompactMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 110, damping: 24, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 110, damping: 24, mass: 0.4 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], compactMotion ? [-4, 4] : [-12, 12]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], compactMotion ? [3, -3] : [9, -9]);
  const layerX = useTransform(smoothX, [-0.5, 0.5], compactMotion ? [-7, 7] : [-22, 22]);
  const layerY = useTransform(smoothY, [-0.5, 0.5], compactMotion ? [-6, 6] : [-18, 18]);
  const scrollSceneY = useTransform(scrollYProgress, [0, 1], compactMotion ? [0, 0] : [82, -88]);
  const scrollSceneScale = useTransform(scrollYProgress, [0, 0.5, 1], compactMotion ? [1, 1, 1] : [0.92, 1.03, 0.96]);
  const scrollTextY = useTransform(scrollYProgress, [0, 1], compactMotion ? [0, 0] : [38, -36]);

  if (!isSectionVisible("parallax")) {
    return null;
  }

  return (
    <section ref={sectionRef} className="section-band overflow-hidden sm:min-h-[112svh]" data-hint={content.hint}>
      <div className="shell grid items-center gap-12 lg:grid-cols-[0.86fr_1.14fr]">
        <motion.div
          style={{ y: scrollTextY }}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="mt-3 text-balance font-display text-[clamp(2.35rem,10vw,5.8rem)] font-semibold leading-[0.9] text-text-primary">{content.title}</h2>
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
          className="relative min-h-[390px] rounded-[28px] border border-line bg-[radial-gradient(circle_at_50%_0%,rgba(41,151,255,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-3 shadow-[0_44px_140px_rgba(0,0,0,0.54)] sm:min-h-[560px] sm:rounded-[40px] sm:p-5"
          style={{ y: scrollSceneY, scale: scrollSceneScale }}
          onPointerMove={(event) => {
            if (compactMotion) {
              return;
            }
            const rect = event.currentTarget.getBoundingClientRect();
            x.set((event.clientX - rect.left) / rect.width - 0.5);
            y.set((event.clientY - rect.top) / rect.height - 0.5);
          }}
          onPointerLeave={() => {
            x.set(0);
            y.set(0);
          }}
          initial={false}
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

          <div className="relative mt-5 grid min-h-[320px] place-items-center [perspective:1200px] sm:mt-8 sm:min-h-[455px]">
            <motion.div
              className="relative h-[320px] w-full max-w-[620px] sm:h-[370px]"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute inset-x-2 top-3 z-10 h-[285px] rounded-[28px] border border-white/12 bg-black/70 p-4 shadow-[0_34px_110px_rgba(0,0,0,0.55)] sm:inset-x-8 sm:h-[310px] sm:rounded-[34px] sm:p-5"
                style={{ x: layerX, y: layerY, transform: "translateZ(70px)" }}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary">
                    <Layers3 size={17} className="text-[#2997ff]" />
                    product.surface
                  </span>
                  <span className="rounded-full bg-[#30d158]/15 px-3 py-1 font-mono text-[11px] text-[#30d158]">live</span>
                </div>
                <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-[0.7fr_1.3fr] sm:gap-4">
                  <div className="grid gap-3">
                    {content.layers.map((layer, index) => (
                      <motion.span
                        key={layer}
                        className="rounded-2xl border border-white/10 bg-white/[0.055] px-3 py-2 text-xs text-[var(--text-soft)] sm:py-3 sm:text-sm"
                        animate={{ x: index === 2 ? [0, 8, 0] : 0, borderColor: index === 2 ? ["rgba(255,255,255,0.1)", "rgba(41,151,255,0.45)", "rgba(255,255,255,0.1)"] : undefined }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {layer}
                      </motion.span>
                    ))}
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-white/[0.045] p-3 sm:rounded-[26px] sm:p-4">
                    <div className="grid h-24 grid-cols-5 items-end gap-2 sm:h-36">
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
                className="absolute left-0 top-28 z-20 hidden w-[210px] rounded-[28px] border border-white/12 bg-white/[0.09] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl md:block"
                style={{ transform: "translateZ(130px) rotateY(-5deg)" }}
                animate={{ y: [-8, 6, -8] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Box size={20} className="text-[#30d158]" />
                <strong className="mt-4 block text-lg text-text-primary">Build stack</strong>
                <span className="mt-2 block text-sm leading-6 text-[var(--text-soft)]">Next.js / Supabase / UX / analytics</span>
              </motion.div>

              <motion.div
                className="absolute bottom-0 right-0 z-20 hidden w-[250px] rounded-[30px] border border-white/12 bg-black/72 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.46)] md:block"
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

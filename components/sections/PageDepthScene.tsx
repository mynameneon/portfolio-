"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Layers3, MousePointer2, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useCompactMotion } from "@/hooks/useCompactMotion";

interface PageDepthSceneProps {
  label: string;
  title: string;
  body: string;
  items: readonly string[];
  accent?: string;
  hint?: string;
}

export function PageDepthScene({
  label,
  title,
  body,
  items,
  accent = "#2997ff",
  hint = "3D parallax / hover"
}: PageDepthSceneProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const compactMotion = useCompactMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 95, damping: 22, mass: 0.35 });
  const smoothY = useSpring(mouseY, { stiffness: 95, damping: 22, mass: 0.35 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], compactMotion ? [-4, 4] : [-10, 10]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], compactMotion ? [3, -3] : [8, -8]);
  const sceneY = useTransform(scrollYProgress, [0, 1], compactMotion ? [0, 0] : [38, -38]);
  const railX = useTransform(scrollYProgress, [0, 1], compactMotion ? ["-12%", "12%"] : ["-34%", "34%"]);

  return (
    <motion.div
      ref={ref}
      className="relative mb-14 grid items-center gap-6 overflow-hidden rounded-[34px] border border-line bg-white/[0.04] p-4 shadow-[0_34px_110px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-5 lg:grid-cols-[0.78fr_1.22fr] lg:p-6"
      data-hint={hint}
      onPointerMove={(event) => {
        if (compactMotion) {
          return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: `radial-gradient(circle at 78% 18%, ${accent}1f, transparent 28rem)` }} />
      <motion.div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-[#2997ff]/20" style={{ x: railX }} />

      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/28 px-3 py-2 font-mono text-[11px] uppercase text-[var(--text-soft)]">
          <MousePointer2 size={14} style={{ color: accent }} />
          {label}
        </span>
        <h3 className="mt-5 text-balance font-display text-[clamp(2rem,4.2vw,4.2rem)] font-semibold leading-[0.96] text-text-primary">{title}</h3>
        <p className="mt-4 max-w-[58ch] text-[15px] leading-7 text-[var(--text-soft)]">{body}</p>
      </div>

      <motion.div
        className="relative min-h-[340px] [perspective:1300px] max-sm:min-h-[300px]"
        style={{ y: sceneY }}
      >
        <motion.div
          className="absolute inset-2 rounded-[32px] border border-white/10 bg-black/34"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[length:42px_42px] opacity-55" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-[36px] border border-white/12 bg-white/[0.045] sm:h-[190px] sm:w-[190px] sm:rounded-[44px]"
            animate={{ rotateX: [0, 20, 0], rotateY: [-18, 18, -18] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: `0 36px 110px ${accent}1f`, transformStyle: "preserve-3d" }}
          >
            <div className="grid h-full place-items-center">
              <Layers3 size={42} style={{ color: accent }} />
            </div>
          </motion.div>

          {items.slice(0, 6).map((item, index) => {
            const positions = [
              "left-[7%] top-[12%]",
              "right-[8%] top-[16%]",
              "left-[12%] bottom-[15%]",
              "right-[10%] bottom-[13%]",
              "left-[34%] top-[4%]",
              "right-[34%] bottom-[5%]"
            ];

            return (
              <motion.div
                key={`${item}-${index}`}
                className={`absolute ${positions[index]} ${index > 3 ? "max-sm:hidden" : ""} max-w-[210px] rounded-2xl border border-white/10 bg-black/58 px-3 py-2 text-sm text-[var(--text-soft)] shadow-[0_20px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl max-sm:max-w-[150px] max-sm:text-xs`}
                animate={{
                  y: index % 2 === 0 ? [-6, 7, -6] : [7, -6, 7],
                  rotate: index % 2 === 0 ? [-1.5, 1.5, -1.5] : [1.5, -1.5, 1.5]
                }}
                transition={{ duration: 4.4 + index * 0.22, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="mr-2 font-mono text-[10px]" style={{ color: accent }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </motion.div>
            );
          })}

          <motion.div
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] sm:right-6 sm:top-6 sm:h-12 sm:w-12"
            animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={18} style={{ color: accent }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

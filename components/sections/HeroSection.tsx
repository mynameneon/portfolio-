"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Send, Sparkles } from "lucide-react";
import Image from "next/image";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { NeonButton } from "@/components/ui/NeonButton";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { useLanguage } from "@/hooks/useLanguage";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function HeroSection() {
  const { lang, content, isSectionVisible } = useLanguage();
  const stats = content.hero.stats.filter((stat) => stat.hidden !== true);
  const roles = content.hero.roles.filter((role) => role.hidden !== true);

  if (!isSectionVisible("hero")) {
    return null;
  }

  return (
    <section id="hero" className="relative overflow-hidden bg-hero-gradient">
      <ParticleCanvas />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="shell relative z-10 grid min-h-[calc(100svh-66px)] items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.62fr)] lg:gap-16 lg:py-24">
        <motion.div key={lang} className="min-w-0 max-lg:text-center" variants={staggerContainer} initial={false} animate="visible">
          <motion.div
            className="mx-auto flex w-full max-w-[17rem] items-center justify-center gap-2 rounded-full border border-line bg-white/[0.055] px-3 py-2 text-left text-xs font-medium text-[var(--text-soft)] shadow-[0_18px_46px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:inline-flex sm:w-auto sm:max-w-full sm:text-sm"
            variants={fadeUp}
          >
            <Sparkles size={15} className="text-[#2997ff]" />
            <span className="min-w-0 truncate sm:whitespace-normal">{content.hero.eyebrow}</span>
          </motion.div>
          <motion.p className="mt-8 text-lg font-medium text-[var(--text-soft)]" variants={fadeUp}>
            {content.hero.greeting}
          </motion.p>
          <motion.h1
            className="mt-3 max-w-[900px] whitespace-normal text-balance font-display text-[clamp(2.65rem,9.2vw,7.7rem)] font-semibold leading-[0.92] text-text-primary max-lg:mx-auto max-sm:max-w-[7.8em] max-sm:text-[clamp(2.15rem,10vw,2.45rem)] sm:leading-[0.88]"
            variants={fadeUp}
          >
            {content.hero.title}
          </motion.h1>
          <motion.div className="mt-6 min-h-9 text-xl font-semibold text-[#2997ff] sm:text-2xl" variants={fadeUp}>
            <AnimatedText texts={content.hero.typewriter} />
          </motion.div>
          <motion.p className="mt-7 max-w-full text-pretty text-[clamp(1.02rem,2vw,1.45rem)] leading-8 text-[var(--text-soft)] max-lg:mx-auto max-sm:max-w-[17rem] max-sm:text-[1.05rem] max-sm:leading-7 sm:max-w-[720px] sm:leading-9" variants={fadeUp}>
            {content.hero.description}
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-3 max-lg:justify-center max-sm:mx-auto max-sm:w-full max-sm:max-w-[17rem]" variants={fadeUp}>
            <NeonButton href="/contact" className="max-sm:w-full">
              <Send size={16} />
              {content.hero.ctaContact}
            </NeonButton>
            <NeonButton href="/experience" variant="ghost" className="max-sm:w-full">
              {content.hero.ctaExperience}
              <ArrowRight size={16} />
            </NeonButton>
          </motion.div>
          <motion.div className="mt-12 grid max-w-[650px] grid-cols-1 gap-3 max-lg:mx-auto max-sm:max-w-[17rem] sm:grid-cols-3" variants={fadeUp}>
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[22px] border border-line bg-white/[0.055] p-4 shadow-[0_20px_52px_rgba(0,0,0,0.28)] backdrop-blur-xl">
                <strong className="block text-3xl font-semibold leading-none text-text-primary">{stat.value}</strong>
                <span className="mt-2 block text-xs leading-5 text-[var(--text-soft)]">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.aside
          className="relative overflow-hidden rounded-[34px] border border-line bg-white/[0.055] p-4 shadow-[0_34px_120px_rgba(0,0,0,0.46)] backdrop-blur-2xl lg:min-h-[560px]"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          aria-label="Profile component preview"
        >
          <div className="grid min-h-[402px] content-center justify-items-center gap-7 rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-6 text-center lg:min-h-[526px]">
            <motion.div
              className="relative aspect-square w-[min(280px,72vw)] overflow-hidden rounded-[56px] border border-white/12 bg-black shadow-[0_34px_90px_rgba(0,0,0,0.42)]"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={content.hero.portrait.src}
                alt={content.hero.portrait.alt}
                fill
                priority
                sizes="(min-width: 1024px) 280px, 72vw"
                className="object-cover"
                style={{ objectPosition: content.hero.portrait.objectPosition }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_35%,rgba(0,0,0,0.18))]" />
            </motion.div>
            <div className="grid w-[min(100%,330px)] gap-2.5">
              {roles.map((role) => (
                <span key={role.label} className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-black/35 px-4 py-3 text-sm text-[var(--text-soft)] shadow-[0_18px_50px_rgba(0,0,0,0.26)] backdrop-blur-xl">
                  <b className="font-semibold text-text-primary">{role.label}</b>
                  {role.value}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-line bg-black/35 px-4 py-2 text-sm font-medium text-[var(--text-soft)] shadow-[0_18px_50px_rgba(0,0,0,0.26)]">
              <CheckCircle2 size={16} className="text-[#34c759]" />
              <span>{content.common.open}</span>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

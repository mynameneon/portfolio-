"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Code2, Gauge, PanelsTopLeft, SearchCheck, ShoppingBag, Wrench, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NeonButton } from "@/components/ui/NeonButton";
import { useLanguage } from "@/hooks/useLanguage";
import { servicesContent } from "@/lib/editableSections";

const serviceIcons = {
  landing: PanelsTopLeft,
  corporate: Code2,
  store: ShoppingBag,
  audit: SearchCheck,
  automation: Wrench,
  support: Gauge
} as const;

const serviceAccents = {
  landing: "#2997ff",
  corporate: "#66c7ff",
  store: "#30d158",
  audit: "#af52de",
  automation: "#ffd60a",
  support: "#ff6b35"
} as const;


type ServiceId = keyof typeof serviceIcons;
type ServicesContent = (typeof servicesContent)[keyof typeof servicesContent];
type Service = ServicesContent["services"][number];

function ServiceLogo({ id, large = false }: { id: ServiceId; large?: boolean }) {
  const Icon = serviceIcons[id];
  const accent = serviceAccents[id];
  const sizeClass = large ? "h-64 min-h-64" : "h-32";

  return (
    <div className={`relative grid ${sizeClass} place-items-center overflow-hidden rounded-[28px] border border-white/10 bg-black/40`}>
      <motion.div
        className="absolute h-40 w-40 rounded-[34px] border border-white/10 bg-white/[0.035]"
        animate={{ rotateX: [0, 18, 0], rotateY: [-16, 18, -16] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ boxShadow: `0 28px 80px ${accent}20` }}
      />
      <motion.div
        className="relative grid h-20 w-20 place-items-center rounded-[24px] border border-white/15 bg-white/[0.07] shadow-[0_24px_70px_rgba(0,0,0,0.42)]"
        animate={{ y: [-5, 5, -5], rotate: id === "automation" ? [0, 8, -8, 0] : 0 }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ color: accent }}
      >
        <Icon size={large ? 34 : 28} />
      </motion.div>
      {id === "landing" ? (
        <motion.div className="absolute bottom-8 flex gap-2" animate={{ x: [-18, 18, -18] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}>
          {[0, 1, 2].map((item) => (
            <span key={item} className="h-3 w-12 rounded-full border border-white/15 bg-white/[0.06]" />
          ))}
        </motion.div>
      ) : null}
      {id === "store" ? (
        <div className="absolute bottom-7 grid grid-cols-3 gap-2">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <motion.span
              key={item}
              className="h-5 w-8 rounded-lg border border-white/15"
              animate={{ backgroundColor: ["rgba(255,255,255,0.04)", `${accent}33`, "rgba(255,255,255,0.04)"] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: item * 0.12 }}
            />
          ))}
        </div>
      ) : null}
      {id === "audit" ? (
        <motion.span
          className="absolute inset-x-10 h-px"
          style={{ backgroundColor: accent }}
          animate={{ top: ["28%", "72%", "28%"], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
      {id === "corporate" || id === "support" ? (
        <div className="absolute bottom-8 left-8 right-8 grid gap-2">
          {[0, 1, 2].map((item) => (
            <motion.span
              key={item}
              className="h-2 rounded-full bg-white/10"
              animate={{ width: [`${44 + item * 12}%`, `${78 - item * 8}%`, `${44 + item * 12}%`] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: item * 0.2 }}
              style={{ backgroundColor: item === 1 ? `${accent}88` : undefined }}
            />
          ))}
        </div>
      ) : null}
      {id === "automation" ? (
        <div className="absolute inset-0">
          {[0, 1, 2, 3].map((item) => (
            <motion.span
              key={item}
              className="absolute h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: accent, left: `${24 + item * 15}%`, top: `${30 + (item % 2) * 28}%` }}
              animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.35, 0.95, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: item * 0.22 }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ServiceModal({
  service,
  onClose,
  content
}: {
  service: Service | null;
  onClose: () => void;
  content: ServicesContent;
}) {
  useEffect(() => {
    if (!service) {
      return undefined;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [service, onClose]);

  if (!service) {
    return null;
  }

  const id = service.id as ServiceId;
  const accent = serviceAccents[id];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] grid place-items-center bg-black/74 p-4 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.article
          className="max-h-[90vh] w-full max-w-6xl overflow-auto rounded-[34px] border border-line bg-[#07080a] shadow-panel-glow"
          initial={{ opacity: 0, rotateX: -10, scale: 0.92, y: 26 }}
          animate={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
          exit={{ opacity: 0, rotateX: 8, scale: 0.96, y: 12 }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          style={{ transformOrigin: "50% 35%" }}
        >
          <div className="flex items-center justify-between gap-4 border-b border-line bg-black/35 px-5 py-4 backdrop-blur-xl">
            <span className="font-mono text-xs uppercase text-[var(--text-faint)]">{content.modalLabel}</span>
            <motion.button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/[0.055] text-text-primary"
              whileTap={{ scale: 0.94 }}
              aria-label="Close"
            >
              <X size={17} />
            </motion.button>
          </div>

          <div className="grid gap-6 p-5 lg:grid-cols-[0.78fr_1.22fr] lg:p-7">
            <div className="grid gap-4">
              <ServiceLogo id={id} large />
              <div className="rounded-[26px] border border-line bg-white/[0.045] p-5">
                <span className="font-mono text-[11px] uppercase text-[var(--text-faint)]">{content.source}</span>
                <strong className="mt-2 block text-5xl font-semibold text-text-primary">{service.price}</strong>
                <span className="mt-2 inline-flex rounded-full border px-3 py-1.5 font-mono text-[11px]" style={{ color: accent, borderColor: `${accent}55`, backgroundColor: `${accent}14` }}>
                  {service.term}
                </span>
              </div>
            </div>

            <div>
              <h2 className="font-display text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[0.96] text-text-primary">{service.title}</h2>
              <p className="mt-4 text-[17px] leading-8 text-[var(--text-soft)]">{service.fullDesc}</p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <div className="rounded-[26px] border border-line bg-white/[0.045] p-5">
                  <h3 className="font-mono text-[11px] uppercase text-[var(--text-faint)]">{content.includes}</h3>
                  <div className="mt-4 grid gap-3">
                    {service.deliverables.map((item) => (
                      <span key={item} className="flex items-start gap-2 text-sm leading-5 text-[var(--text-soft)]">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[26px] border border-line bg-white/[0.045] p-5">
                  <h3 className="font-mono text-[11px] uppercase text-[var(--text-faint)]">{content.process}</h3>
                  <div className="mt-4 grid gap-2">
                    {service.steps.map((item, index) => (
                      <span key={item} className="rounded-2xl border border-white/10 bg-black/28 px-3 py-2 text-sm text-[var(--text-soft)]">
                        {String(index + 1).padStart(2, "0")} / {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[26px] border border-line bg-white/[0.045] p-5">
                <h3 className="font-mono text-[11px] uppercase text-[var(--text-faint)]">{content.result}</h3>
                <p className="mt-3 text-[15px] leading-7 text-[var(--text-soft)]">{service.result}</p>
              </div>

              <div className="mt-6">
                <NeonButton href="/contact">
                  {content.cta}
                  <ArrowRight size={16} />
                </NeonButton>
              </div>
            </div>
          </div>
        </motion.article>
      </motion.div>
    </AnimatePresence>
  );
}

export function ServicesSection() {
  const { lang, getEditableSection, isSectionVisible } = useLanguage();
  const editableContent = getEditableSection("services", servicesContent);
  const content = editableContent[lang] ?? servicesContent[lang];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visibleServices = content.services.filter((service) => (service as { hidden?: boolean }).hidden !== true);
  const activeService = activeIndex === null ? null : visibleServices[activeIndex] ?? null;

  useEffect(() => {
    const onNativeClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const card = target.closest("[data-service-index]");
      if (!(card instanceof HTMLElement)) {
        return;
      }

      const index = Number(card.dataset.serviceIndex);
      if (Number.isInteger(index)) {
        setActiveIndex(index);
      }
    };

    document.addEventListener("click", onNativeClick);
    return () => document.removeEventListener("click", onNativeClick);
  }, []);

  if (!isSectionVisible("services")) {
    return null;
  }

  return (
    <section className="section-band">
      <div className="shell">
        <motion.div
          className="mx-auto mb-14 grid max-w-[980px] justify-items-center gap-5 text-center"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="max-w-4xl text-balance font-display text-[clamp(2.5rem,5.4vw,4.9rem)] font-semibold leading-[0.96] text-text-primary">{content.title}</h2>
          <p className="max-w-[72ch] text-pretty text-[17px] leading-8 text-[var(--text-soft)]">{content.body}</p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 [perspective:1200px]">
          {visibleServices.map((service, index) => {
            const id = service.id as ServiceId;
            const accent = serviceAccents[id];

            return (
              <motion.button
                key={service.title}
                type="button"
                data-service-index={index}
                onClick={() => setActiveIndex(index)}
                className="glass group relative min-h-[430px] overflow-hidden p-0 text-left outline-none"
                initial={false}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{
                  y: -10,
                  rotateX: 3,
                  rotateY: index % 2 === 0 ? -3 : 3,
                  borderColor: "rgba(255,255,255,0.18)",
                  boxShadow: `0 38px 120px ${accent}18, 0 34px 110px rgba(0,0,0,0.54)`
                }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 230, damping: 26, delay: index * 0.04 }}
                style={{ transformStyle: "preserve-3d" }}
                aria-label={`${content.open}: ${service.title}`}
                data-cursor="interactive"
                data-hint={content.open}
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-[42px] blur-3xl opacity-0 group-hover:opacity-100" style={{ backgroundColor: `${accent}22` }} />
                <div className="relative p-5">
                  <ServiceLogo id={id} />
                  <div className="mt-6 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-normal text-text-primary">{service.title}</h3>
                      <p className="mt-2 min-h-[48px] text-sm leading-6 text-[var(--text-soft)]">{service.subtitle}</p>
                    </div>
                    <span className="rounded-full border border-line bg-black/30 px-3 py-1.5 font-mono text-[11px] text-[var(--text-soft)]">{service.term}</span>
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/10 pt-5">
                    <div>
                      <span className="block font-mono text-[11px] uppercase text-[var(--text-faint)]">{content.source}</span>
                      <strong className="mt-1 block text-4xl font-semibold text-text-primary">{service.price}</strong>
                    </div>
                    <motion.span
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white text-black"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight size={19} />
                    </motion.span>
                  </div>

                  <div className="mt-6 grid gap-3">
                    {service.points.map((point) => (
                      <span key={point} className="flex items-start gap-2 text-sm leading-5 text-[var(--text-soft)]">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[28px] border border-line bg-white/[0.045] p-5 text-sm text-[var(--text-soft)] shadow-[0_26px_86px_rgba(0,0,0,0.32)] sm:flex-row sm:items-center">
          <span>{content.note}</span>
          <NeonButton href="/contact" className="w-full sm:w-auto">
            {content.cta}
            <ArrowRight size={16} />
          </NeonButton>
        </div>
      </div>

      <ServiceModal service={activeService} onClose={() => setActiveIndex(null)} content={content} />
    </section>
  );
}

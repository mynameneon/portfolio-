"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Camera, CheckCircle2, ExternalLink, Loader2, Mail, Phone, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { submitContact } from "@/app/actions/contact";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { useLanguage } from "@/hooks/useLanguage";
import type { ContactLink, ContactStatus } from "@/types";
import { PageDepthScene } from "./PageDepthScene";

const depthCopy = {
  ru: {
    label: "lead flow",
    title: "Заявка проходит понятный путь.",
    body:
      "Имя, почта и короткое сообщение сохраняются в Supabase, дублируются email-уведомлением и превращаются в задачу, на которую удобно ответить без потери контекста.",
    items: ["Форма", "Supabase", "Email", "Ответ 24ч"]
  },
  ua: {
    label: "lead flow",
    title: "Заявка проходить зрозумілий шлях.",
    body:
      "Ім'я, пошта й коротке повідомлення зберігаються в Supabase, дублюються email-сповіщенням і перетворюються на задачу, на яку зручно відповісти без втрати контексту.",
    items: ["Форма", "Supabase", "Email", "Відповідь 24г"]
  }
} as const;

function ContactIcon({ id }: { id: string }) {
  if (id === "phone") return <Phone size={17} />;
  if (id === "instagram") return <Camera size={17} />;
  if (id === "telegram") return <Send size={17} />;
  if (id === "linkedin") return <Briefcase size={17} />;
  return <Mail size={17} />;
}

function ContactItem({ item }: { item: ContactLink }) {
  return (
    <motion.a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
      className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-white/[0.045] px-4 py-3 text-sm text-[var(--text-soft)]"
      whileHover={{ x: 4, borderColor: "rgba(41,151,255,0.38)", color: "var(--text)" }}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.055] text-[#2997ff] shadow-[0_18px_46px_rgba(0,0,0,0.22)]">
          <ContactIcon id={item.id} />
        </span>
        <span className="grid min-w-0">
          <b className="font-semibold text-text-primary">{item.label}</b>
          <span className="truncate">{item.value}</span>
        </span>
      </span>
      {item.href.startsWith("http") ? <ExternalLink size={15} className="shrink-0" /> : null}
    </motion.a>
  );
}

export function ContactSection() {
  const { lang, content } = useLanguage();
  const depth = depthCopy[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setError(content.contact.validationRequired);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      setError(content.contact.validationEmail);
      return;
    }

    setStatus("loading");
    const formData = new FormData(event.currentTarget);
    const result = await submitContact(formData);

    if (result.success) {
      if (!result.emailSent) {
        setStatus("error");
        setError(content.contact.emailDeliveryError);
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      return;
    }

    setStatus("error");
    setError(content.contact.error);
  };

  return (
    <section id="contact" className="section-band">
      <div className="shell">
        <motion.div key={lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.28 }}>
          <SectionHeader eyebrow={content.contact.eyebrow} title={content.contact.title} body={content.contact.body} />
          <PageDepthScene
            label={depth.label}
            title={depth.title}
            body={depth.body}
            items={depth.items}
            accent="#2997ff"
            hint="contact flow / form submits"
          />
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
            <GlassCard className="p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">{content.contact.directTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">{content.contact.subtitle}</p>
                </div>
                <span className="rounded-full border border-line bg-white/[0.045] px-3 py-1.5 font-mono text-[11px] text-[var(--text-soft)]">RU / UA</span>
              </div>
              <div className="grid gap-2">
                {content.contact.links.map((item) => (
                  <ContactItem key={item.id} item={item} />
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-text-primary">{content.contact.formTitle}</h3>
                <span className="rounded-full border border-[#30d158]/30 bg-[#30d158]/10 px-3 py-1.5 font-mono text-[11px] text-[#30d158]">success ready</span>
              </div>

              <form className="grid gap-3" onSubmit={handleSubmit}>
                <input type="hidden" name="lang" value={lang} />
                <label className="grid gap-2">
                  <span className="font-mono text-[11px] uppercase text-[var(--text-faint)]">{content.contact.name}</span>
                  <input
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-2xl border border-line bg-white/[0.045] px-4 py-3 text-text-primary outline-none placeholder:text-text-secondary focus:border-[#2997ff]/55 focus:ring-4 focus:ring-[#2997ff]/10"
                    placeholder="Алексей, продуктовая компания"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="font-mono text-[11px] uppercase text-[var(--text-faint)]">{content.contact.email}</span>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-2xl border border-line bg-white/[0.045] px-4 py-3 text-text-primary outline-none placeholder:text-text-secondary focus:border-[#2997ff]/55 focus:ring-4 focus:ring-[#2997ff]/10"
                    placeholder="alex@example.com"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="font-mono text-[11px] uppercase text-[var(--text-faint)]">{content.contact.message}</span>
                  <textarea
                    name="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="min-h-[150px] w-full resize-y rounded-2xl border border-line bg-white/[0.045] px-4 py-3 text-text-primary outline-none placeholder:text-text-secondary focus:border-[#2997ff]/55 focus:ring-4 focus:ring-[#2997ff]/10"
                    placeholder="Нужно обсудить сайт, CRM-интеграцию и дизайн интерфейса."
                  />
                </label>

                <div className="pt-1">
                  <NeonButton type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
                    {status === "loading" ? (
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}>
                        <Loader2 size={16} />
                      </motion.span>
                    ) : (
                      <Send size={16} />
                    )}
                    {status === "loading" ? content.contact.sending : content.contact.submit}
                  </NeonButton>
                </div>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      className="mt-2 flex items-start gap-3 rounded-2xl border border-[#30d158]/30 bg-[#30d158]/10 p-4 text-sm text-[#30d158]"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                      <span>
                        <b className="block text-text-primary">{content.contact.success}</b>
                        {content.contact.successHint}
                      </span>
                    </motion.div>
                  ) : null}
                  {status === "error" && error ? (
                    <motion.div
                      key="error"
                      className="mt-2 rounded-2xl border border-red-400/35 bg-red-500/10 p-4 text-sm text-red-200"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      {error}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </form>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

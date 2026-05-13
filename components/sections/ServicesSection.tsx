"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Code2, Gauge, Megaphone, PanelsTopLeft, SearchCheck, ShoppingBag, Wrench } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { useLanguage } from "@/hooks/useLanguage";

const serviceIcons = {
  landing: PanelsTopLeft,
  corporate: Code2,
  store: ShoppingBag,
  audit: SearchCheck,
  automation: Wrench,
  support: Gauge,
  marketing: Megaphone
} as const;

const copy = {
  ru: {
    eyebrow: "Services / pricing",
    title: "Услуги с понятной ценой до первого созвона.",
    body:
      "Я взял ориентиры с украинского и международного рынка и поставил вилку между студийным бюджетом и нормальной freelance-ценой. Идея простая: клиент получает аккуратный продуктовый уровень, но без переплаты за агентский слой.",
    note: "Ориентир. Финальная цена зависит от контента, интеграций и срочности.",
    cta: "Обсудить задачу",
    source: "Market-based",
    services: [
      {
        id: "landing",
        title: "Лендинг High-End",
        subtitle: "Для услуги, продукта, мероприятия или эксперта",
        price: "от $490",
        term: "7-12 дней",
        points: ["UX-структура и продающие блоки", "Дизайн в стиле бренда", "Next.js / адаптив / SEO basic", "Форма заявки + аналитика"]
      },
      {
        id: "corporate",
        title: "Корпоративный сайт",
        subtitle: "Многостраничный сайт для бизнеса",
        price: "от $950",
        term: "14-24 дня",
        points: ["Архитектура страниц", "Компонентная верстка", "CMS/Supabase по необходимости", "Контакты, формы, деплой"]
      },
      {
        id: "store",
        title: "Интернет-магазин",
        subtitle: "Каталог, корзина, платежи, CRM",
        price: "от $2 200",
        term: "25-40 дней",
        points: ["Каталог и карточки товара", "Корзина / checkout flow", "Оплаты и заявки", "CRM и уведомления"]
      },
      {
        id: "audit",
        title: "UX/UI аудит",
        subtitle: "Разбор сайта до конкретного плана улучшений",
        price: "от $350",
        term: "3-5 дней",
        points: ["Проверка сценариев и конверсии", "Мобильный UX", "Heatmap/analytics логика", "Figma-рекомендации"]
      },
      {
        id: "automation",
        title: "CRM / автоматизация",
        subtitle: "Заявки, боты, таблицы, уведомления",
        price: "от $450",
        term: "5-14 дней",
        points: ["Supabase / Google Sheets / CRM", "Telegram-боты и webhooks", "Email-уведомления", "Документация процесса"]
      },
      {
        id: "support",
        title: "Поддержка сайта",
        subtitle: "Правки, безопасность, скорость, контент",
        price: "от $180/мес",
        term: "ретейнер",
        points: ["Еженедельные правки", "Мониторинг форм и ошибок", "SEO/скорость базово", "Отчет по изменениям"]
      }
    ]
  },
  ua: {
    eyebrow: "Services / pricing",
    title: "Послуги зі зрозумілою ціною до першого дзвінка.",
    body:
      "Я взяв орієнтири з українського та міжнародного ринку й поставив вилку між студійним бюджетом і нормальною freelance-ціною. Ідея проста: клієнт отримує акуратний продуктовий рівень без переплати за агентський шар.",
    note: "Орієнтир. Фінальна ціна залежить від контенту, інтеграцій та терміновості.",
    cta: "Обговорити задачу",
    source: "Market-based",
    services: [
      {
        id: "landing",
        title: "Лендінг High-End",
        subtitle: "Для послуги, продукту, події або експерта",
        price: "від $490",
        term: "7-12 днів",
        points: ["UX-структура і продаючі блоки", "Дизайн у стилі бренду", "Next.js / адаптив / SEO basic", "Форма заявки + аналітика"]
      },
      {
        id: "corporate",
        title: "Корпоративний сайт",
        subtitle: "Багатосторінковий сайт для бізнесу",
        price: "від $950",
        term: "14-24 дні",
        points: ["Архітектура сторінок", "Компонентна верстка", "CMS/Supabase за потреби", "Контакти, форми, деплой"]
      },
      {
        id: "store",
        title: "Інтернет-магазин",
        subtitle: "Каталог, кошик, платежі, CRM",
        price: "від $2 200",
        term: "25-40 днів",
        points: ["Каталог і картки товару", "Кошик / checkout flow", "Оплати та заявки", "CRM і сповіщення"]
      },
      {
        id: "audit",
        title: "UX/UI аудит",
        subtitle: "Розбір сайту до конкретного плану покращень",
        price: "від $350",
        term: "3-5 днів",
        points: ["Перевірка сценаріїв і конверсії", "Мобільний UX", "Heatmap/analytics логіка", "Figma-рекомендації"]
      },
      {
        id: "automation",
        title: "CRM / автоматизація",
        subtitle: "Заявки, боти, таблиці, сповіщення",
        price: "від $450",
        term: "5-14 днів",
        points: ["Supabase / Google Sheets / CRM", "Telegram-боти і webhooks", "Email-сповіщення", "Документація процесу"]
      },
      {
        id: "support",
        title: "Підтримка сайту",
        subtitle: "Правки, безпека, швидкість, контент",
        price: "від $180/міс",
        term: "ретейнер",
        points: ["Щотижневі правки", "Моніторинг форм і помилок", "SEO/швидкість базово", "Звіт по змінах"]
      }
    ]
  }
} as const;

type ServiceId = keyof typeof serviceIcons;

export function ServicesSection() {
  const { lang } = useLanguage();
  const content = copy[lang];

  return (
    <section className="section-band">
      <div className="shell">
        <motion.div
          className="mx-auto mb-14 grid max-w-[980px] justify-items-center gap-5 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="max-w-4xl text-balance font-display text-[clamp(2.5rem,5.4vw,4.9rem)] font-semibold leading-[0.96] text-text-primary">{content.title}</h2>
          <p className="max-w-[72ch] text-pretty text-[17px] leading-8 text-[var(--text-soft)]">{content.body}</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.services.map((service, index) => {
            const Icon = serviceIcons[service.id as ServiceId];

            return (
              <GlassCard
                key={service.title}
                className="group relative overflow-hidden p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#2997ff]/10 blur-3xl opacity-0 group-hover:opacity-100" />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.055] text-[#2997ff] shadow-[0_18px_52px_rgba(0,0,0,0.3)]">
                    <Icon size={21} />
                  </span>
                  <span className="rounded-full border border-line bg-black/30 px-3 py-1.5 font-mono text-[11px] text-[var(--text-soft)]">{service.term}</span>
                </div>

                <div className="relative mt-7">
                  <h3 className="text-2xl font-semibold tracking-normal text-text-primary">{service.title}</h3>
                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-[var(--text-soft)]">{service.subtitle}</p>
                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/10 pt-5">
                    <div>
                      <span className="block font-mono text-[11px] uppercase text-[var(--text-faint)]">{content.source}</span>
                      <strong className="mt-1 block text-4xl font-semibold text-text-primary">{service.price}</strong>
                    </div>
                    <ArrowRight className="text-[#2997ff]" size={22} />
                  </div>
                  <div className="mt-6 grid gap-3">
                    {service.points.map((point) => (
                      <span key={point} className="flex items-start gap-2 text-sm leading-5 text-[var(--text-soft)]">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#30d158]" />
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
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
    </section>
  );
}

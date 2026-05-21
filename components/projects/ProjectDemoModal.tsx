"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowRight, CheckCircle2, MousePointerClick, Play, RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { NeonButton } from "@/components/ui/NeonButton";
import { useLanguage } from "@/hooks/useLanguage";
import type { ProjectPreviewVariant, ProjectShowcaseItem } from "@/types";

interface ProjectDemoModalProps {
  project: ProjectShowcaseItem | null;
  onClose: () => void;
}

interface DemoScenario {
  label: string;
  intro: string;
  actions: readonly string[];
  states: readonly string[];
}

const demoScenarios: Record<"ru" | "ua", Record<ProjectPreviewVariant, DemoScenario>> = {
  ru: {
    board: {
      label: "Игровой sandbox",
      intro: "Можно прогнать мини-сценарий: ход игрока, покупка клетки, realtime-событие и обновление экономики.",
      actions: ["Бросить кубик", "Купить поле", "Открыть чат", "Завершить ход"],
      states: ["Игрок двигается по доске", "Баланс и владение обновлены", "Сообщение ушло в комнату", "Ход передан следующему игроку"]
    },
    game: {
      label: "Онлайн-матч",
      intro: "Тест показывает лобби, быстрый матч, игровое действие и синхронизацию между игроками.",
      actions: ["Создать лобби", "Запустить матч", "Сделать ход", "Показать рейтинг"],
      states: ["Комната создана", "Матч стартовал", "Состояние синхронизировано", "Рейтинг пересчитан"]
    },
    audio: {
      label: "Audio workspace",
      intro: "Мини-студия показывает таймлайн, дорожки, эффекты и экспорт как клиентский сценарий.",
      actions: ["Запустить запись", "Добавить эффект", "Свести дорожки", "Экспорт WAV"],
      states: ["Запись идет на дорожку", "Эффект применен к голосу", "Микс собран", "Файл готов к скачиванию"]
    },
    chat: {
      label: "Desktop shell",
      intro: "Сценарий демонстрирует сервер, канал, сообщение и live-статус пользователя.",
      actions: ["Открыть сервер", "Выбрать канал", "Отправить сообщение", "Показать профиль"],
      states: ["Список серверов активен", "Канал загружен", "Сообщение появилось в чате", "Профиль открыт"]
    },
    dashboard: {
      label: "Business OS",
      intro: "Панель показывает рабочий день бизнеса: метрики, задачи, модуль и быстрый отчет.",
      actions: ["Открыть KPI", "Запустить модуль", "Создать задачу", "Собрать отчет"],
      states: ["KPI обновлены", "Модуль активен", "Задача добавлена", "Отчет готов"]
    },
    map: {
      label: "Route demo",
      intro: "Тестовая карта показывает точки доставки, оптимизацию маршрута и режим курьера.",
      actions: ["Добавить точки", "Оптимизировать", "Включить навигацию", "Закрыть маршрут"],
      states: ["Точки нанесены", "Маршрут перестроен", "Heading-up режим включен", "Доставка завершена"]
    },
    files: {
      label: "File manager",
      intro: "Можно пройти сценарий поиска, тегов, превью и безопасной очистки файлов.",
      actions: ["Поиск файла", "Добавить тег", "Открыть preview", "Очистить кэш"],
      states: ["Файл найден в индексе", "Тег сохранен", "Preview показан", "Кэш очищен"]
    },
    stream: {
      label: "Streaming shell",
      intro: "Сценарий показывает каталог, выбор тайтла, player shell и локальный кэш.",
      actions: ["Открыть каталог", "Выбрать тайтл", "Запустить player", "Сохранить в кэш"],
      states: ["Каталог загружен", "Карточка открыта", "Плеер активен", "Кэш обновлен"]
    },
    terminal: {
      label: "Build console",
      intro: "Тест показывает техническую часть: сборку, синхронизацию, тесты и деплой.",
      actions: ["Build", "Sync data", "Run checks", "Deploy"],
      states: ["Сборка запущена", "Данные синхронизированы", "Проверки прошли", "Деплой готов"]
    },
    key: {
      label: "Key workflow",
      intro: "Демо показывает защищенный сценарий: проверку ключа, доступ, действие и лог события.",
      actions: ["Проверить ключ", "Открыть доступ", "Сделать действие", "Записать лог"],
      states: ["Ключ валиден", "Доступ открыт", "Действие выполнено", "Лог сохранен"]
    }
  },
  ua: {
    board: {
      label: "Ігровий sandbox",
      intro: "Можна прогнати міні-сценарій: хід гравця, купівля клітинки, realtime-подія й оновлення економіки.",
      actions: ["Кинути кубик", "Купити поле", "Відкрити чат", "Завершити хід"],
      states: ["Гравець рухається дошкою", "Баланс і власність оновлено", "Повідомлення пішло в кімнату", "Хід передано наступному гравцю"]
    },
    game: {
      label: "Онлайн-матч",
      intro: "Тест показує лобі, швидкий матч, ігрову дію та синхронізацію між гравцями.",
      actions: ["Створити лобі", "Запустити матч", "Зробити хід", "Показати рейтинг"],
      states: ["Кімнату створено", "Матч стартував", "Стан синхронізовано", "Рейтинг перераховано"]
    },
    audio: {
      label: "Audio workspace",
      intro: "Міні-студія показує таймлайн, доріжки, ефекти та експорт як клієнтський сценарій.",
      actions: ["Запустити запис", "Додати ефект", "Звести доріжки", "Експорт WAV"],
      states: ["Запис іде на доріжку", "Ефект застосовано до голосу", "Мікс зібрано", "Файл готовий до завантаження"]
    },
    chat: {
      label: "Desktop shell",
      intro: "Сценарій демонструє сервер, канал, повідомлення й live-статус користувача.",
      actions: ["Відкрити сервер", "Обрати канал", "Надіслати повідомлення", "Показати профіль"],
      states: ["Список серверів активний", "Канал завантажено", "Повідомлення з'явилось у чаті", "Профіль відкрито"]
    },
    dashboard: {
      label: "Business OS",
      intro: "Панель показує робочий день бізнесу: метрики, задачі, модуль і швидкий звіт.",
      actions: ["Відкрити KPI", "Запустити модуль", "Створити задачу", "Зібрати звіт"],
      states: ["KPI оновлено", "Модуль активний", "Задачу додано", "Звіт готовий"]
    },
    map: {
      label: "Route demo",
      intro: "Тестова карта показує точки доставки, оптимізацію маршруту й режим кур'єра.",
      actions: ["Додати точки", "Оптимізувати", "Увімкнути навігацію", "Закрити маршрут"],
      states: ["Точки нанесено", "Маршрут перебудовано", "Heading-up режим увімкнено", "Доставку завершено"]
    },
    files: {
      label: "File manager",
      intro: "Можна пройти сценарій пошуку, тегів, preview і безпечного очищення файлів.",
      actions: ["Пошук файла", "Додати тег", "Відкрити preview", "Очистити кеш"],
      states: ["Файл знайдено в індексі", "Тег збережено", "Preview показано", "Кеш очищено"]
    },
    stream: {
      label: "Streaming shell",
      intro: "Сценарій показує каталог, вибір тайтла, player shell і локальний кеш.",
      actions: ["Відкрити каталог", "Обрати тайтл", "Запустити player", "Зберегти в кеш"],
      states: ["Каталог завантажено", "Картку відкрито", "Плеєр активний", "Кеш оновлено"]
    },
    terminal: {
      label: "Build console",
      intro: "Тест показує технічну частину: збірку, синхронізацію, тести й деплой.",
      actions: ["Build", "Sync data", "Run checks", "Deploy"],
      states: ["Збірку запущено", "Дані синхронізовано", "Перевірки пройдено", "Деплой готовий"]
    },
    key: {
      label: "Key workflow",
      intro: "Демо показує захищений сценарій: перевірку ключа, доступ, дію та лог події.",
      actions: ["Перевірити ключ", "Відкрити доступ", "Зробити дію", "Записати лог"],
      states: ["Ключ валідний", "Доступ відкрито", "Дію виконано", "Лог збережено"]
    }
  }
};

const labels = {
  ru: {
    sandbox: "Интерактивная тест-версия",
    close: "Закрыть",
    reset: "Сбросить",
    next: "Следующий шаг",
    stack: "Стек",
    highlights: "Что можно проверить",
    cta: "Заказать похожий проект",
    state: "Текущее состояние"
  },
  ua: {
    sandbox: "Інтерактивна тест-версія",
    close: "Закрити",
    reset: "Скинути",
    next: "Наступний крок",
    stack: "Стек",
    highlights: "Що можна перевірити",
    cta: "Замовити схожий проєкт",
    state: "Поточний стан"
  }
} as const;

function DemoVisual({ variant, accent, step }: { variant: ProjectPreviewVariant; accent: string; step: number }) {
  const active = step % 4;

  if (variant === "board" || variant === "game") {
    const positions = [
      ["18%", "72%"],
      ["44%", "72%"],
      ["70%", "44%"],
      ["42%", "18%"]
    ];

    return (
      <div className="relative h-[320px] overflow-hidden rounded-[28px] border border-white/10 bg-black/45 p-5">
        <div className="grid h-full grid-cols-7 gap-2">
          {Array.from({ length: 49 }).map((_, index) => (
            <span key={index} className="rounded-xl border border-white/8 bg-white/[0.035]" style={{ backgroundColor: index % 8 === 0 ? `${accent}22` : undefined }} />
          ))}
        </div>
        <motion.span
          className="absolute h-8 w-8 rounded-full border-4 border-black shadow-[0_18px_46px_rgba(0,0,0,0.35)]"
          style={{ backgroundColor: accent, left: positions[active][0], top: positions[active][1] }}
          layout
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        />
      </div>
    );
  }

  if (variant === "audio") {
    return (
      <div className="grid h-[320px] content-center gap-4 rounded-[28px] border border-white/10 bg-black/45 p-5">
        {[0, 1, 2, 3].map((track) => (
          <div key={track} className="grid grid-cols-[64px_1fr] items-center gap-3">
            <span className="font-mono text-[11px] text-[var(--text-faint)]">TR {track + 1}</span>
            <div className="flex h-12 items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-3">
              {Array.from({ length: 28 }).map((_, index) => (
                <motion.span
                  key={index}
                  className="w-1.5 rounded-full"
                  style={{ backgroundColor: track === active ? accent : "rgba(255,255,255,0.24)" }}
                  animate={{ height: [8, 30 - ((index + track + active) % 12), 10 + ((index + active) % 16)] }}
                  transition={{ duration: 1.15, repeat: Infinity, delay: index * 0.025 }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "map") {
    return (
      <div className="relative h-[320px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[length:42px_42px] p-5">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 320" aria-hidden="true">
          <motion.path
            d="M54 260 C112 86, 188 242, 270 122 S418 74, 470 220"
            fill="none"
            stroke={accent}
            strokeWidth="7"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: (active + 1) / 4 }}
            transition={{ duration: 0.55 }}
          />
        </svg>
        {["12%", "36%", "56%", "82%"].map((left, index) => (
          <motion.span
            key={left}
            className="absolute h-7 w-7 rounded-full border-4 border-black"
            style={{ left, top: index % 2 === 0 ? "67%" : "32%", backgroundColor: accent }}
            animate={{ scale: index <= active ? 1.15 : 0.72, opacity: index <= active ? 1 : 0.36 }}
          />
        ))}
      </div>
    );
  }

  if (variant === "chat") {
    return (
      <div className="grid h-[320px] grid-cols-[88px_1fr] gap-4 rounded-[28px] border border-white/10 bg-black/45 p-5">
        <div className="grid content-start gap-3">
          {[0, 1, 2, 3, 4].map((item) => (
            <span key={item} className="h-11 rounded-2xl border border-white/10 bg-white/[0.045]" style={{ borderColor: item === active ? `${accent}88` : undefined }} />
          ))}
        </div>
        <div className="grid content-end gap-3">
          {[0, 1, 2, 3].map((item) => (
            <motion.div key={item} className="rounded-3xl border border-white/10 bg-white/[0.045] p-4" animate={{ x: item === active ? [0, 8, 0] : 0 }}>
              <span className="block h-2 w-24 rounded-full" style={{ backgroundColor: item === active ? accent : "rgba(255,255,255,0.2)" }} />
              <span className="mt-3 block h-2 rounded-full bg-white/14" />
              <span className="mt-2 block h-2 w-2/3 rounded-full bg-white/10" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "files") {
    return (
      <div className="grid h-[320px] grid-cols-[120px_1fr] gap-4 rounded-[28px] border border-white/10 bg-black/45 p-5">
        <div className="grid content-start gap-2">
          {["Apps", "Media", "Docs", "Cache"].map((item, index) => (
            <span key={item} className="rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-3 text-sm text-[var(--text-soft)]" style={{ color: index === active ? accent : undefined }}>
              {item}
            </span>
          ))}
        </div>
        <div className="grid content-start gap-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-[24px_1fr_52px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3"
              animate={{ borderColor: index === active + 1 ? `${accent}88` : "rgba(255,255,255,0.1)" }}
            >
              <span className="h-5 w-5 rounded-lg" style={{ backgroundColor: index === active + 1 ? accent : "rgba(255,255,255,0.2)" }} />
              <span className="h-2 rounded-full bg-white/14" />
              <span className="h-2 rounded-full bg-white/10" />
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "stream") {
    return (
      <div className="relative h-[320px] overflow-hidden rounded-[28px] border border-white/10 bg-black/45 p-5">
        <motion.div className="flex gap-4" animate={{ x: -active * 92 }} transition={{ type: "spring", stiffness: 180, damping: 22 }}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-[250px] w-[150px] shrink-0 rounded-[26px] border border-white/10 bg-white/[0.055] p-3">
              <span className="block h-36 rounded-[20px]" style={{ backgroundColor: index === active + 1 ? `${accent}77` : "rgba(255,255,255,0.12)" }} />
              <span className="mt-4 block h-2 rounded-full bg-white/16" />
              <span className="mt-2 block h-2 w-2/3 rounded-full bg-white/10" />
            </div>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid h-[320px] content-center gap-3 rounded-[28px] border border-white/10 bg-black/55 p-6 font-mono text-sm text-[var(--text-soft)]">
      {["npm run build", "compile modules", "sync database", "run checks", "deploy preview"].map((line, index) => (
        <motion.span key={line} animate={{ opacity: index <= active + 1 ? 1 : 0.28, x: index === active + 1 ? [0, 8, 0] : 0 }} style={{ color: index === active + 1 ? accent : undefined }}>
          $ {line}
        </motion.span>
      ))}
      <motion.span className="mt-2 h-5 w-2" style={{ backgroundColor: accent }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.9, repeat: Infinity }} />
    </div>
  );
}

export function ProjectDemoModal({ project, onClose }: ProjectDemoModalProps) {
  const { lang } = useLanguage();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    setStep(0);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  const text = labels[lang];
  const scenario = demoScenarios[lang][project.variant] ?? demoScenarios[lang].terminal;
  const activeState = scenario.states[step % scenario.states.length];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] grid place-items-center bg-black/76 p-4 backdrop-blur-2xl"
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
          className="max-h-[92vh] w-full max-w-7xl overflow-auto rounded-[36px] border border-line bg-[#05070a] shadow-[0_44px_150px_rgba(0,0,0,0.68)]"
          initial={{ opacity: 0, rotateX: -10, scale: 0.92, y: 28 }}
          animate={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
          exit={{ opacity: 0, rotateX: 8, scale: 0.96, y: 14 }}
          transition={{ type: "spring", stiffness: 230, damping: 28 }}
          style={{ transformOrigin: "50% 28%" }}
        >
          <div className="flex items-center justify-between gap-4 border-b border-line bg-black/40 px-5 py-4 backdrop-blur-xl">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase text-[var(--text-faint)]">
              <MousePointerClick size={15} className="text-[#2997ff]" />
              {text.sandbox}
            </span>
            <motion.button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white/[0.055] text-text-primary"
              whileTap={{ scale: 0.94 }}
              aria-label={text.close}
            >
              <X size={17} />
            </motion.button>
          </div>

          <div className="grid gap-6 p-5 lg:grid-cols-[0.95fr_1.05fr] lg:p-7">
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] p-4">
                <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at 50% 0%, ${project.accent}24, transparent 55%)` }} />
                <div className="relative">
                  <ProjectPreview variant={project.variant} accent={project.accent} />
                </div>
              </div>
              <DemoVisual variant={project.variant} accent={project.accent} step={step} />
            </div>

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 font-mono text-[11px] uppercase text-[var(--text-soft)]">
                <Activity size={14} style={{ color: project.accent }} />
                {scenario.label}
              </span>
              <h2 className="mt-4 text-balance font-display text-[clamp(2.4rem,5.4vw,5.2rem)] font-semibold leading-[0.92] text-text-primary">{project.title}</h2>
              <p className="mt-5 text-[17px] leading-8 text-[var(--text-soft)]">{scenario.intro}</p>

              <div className="mt-7 rounded-[26px] border border-line bg-white/[0.045] p-5">
                <h3 className="font-mono text-[11px] uppercase text-[var(--text-faint)]">{text.state}</h3>
                <motion.div
                  key={activeState}
                  className="mt-4 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/28 px-4 py-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" style={{ color: project.accent }} />
                  <span className="text-sm leading-6 text-text-primary">{activeState}</span>
                </motion.div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {scenario.actions.map((action, index) => (
                  <motion.button
                    key={action}
                    type="button"
                    onClick={() => setStep(index)}
                    className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-left text-sm text-[var(--text-soft)]"
                    style={{ borderColor: step % scenario.actions.length === index ? `${project.accent}77` : undefined, color: step % scenario.actions.length === index ? "var(--text)" : undefined }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {String(index + 1).padStart(2, "0")} / {action}
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[26px] border border-line bg-white/[0.045] p-5">
                  <h3 className="font-mono text-[11px] uppercase text-[var(--text-faint)]">{text.highlights}</h3>
                  <div className="mt-4 grid gap-2">
                    {project.highlights.map((item) => (
                      <span key={item.ru} className="text-sm leading-6 text-[var(--text-soft)]">
                        {item[lang]}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[26px] border border-line bg-white/[0.045] p-5">
                  <h3 className="font-mono text-[11px] uppercase text-[var(--text-faint)]">{text.stack}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-black/26 px-3 py-1.5 text-xs text-[var(--text-soft)]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <motion.button
                  type="button"
                  onClick={() => setStep((value) => value + 1)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black"
                  whileTap={{ scale: 0.97 }}
                >
                  <Play size={15} />
                  {text.next}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setStep(0)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-white/[0.055] px-5 text-sm font-semibold text-text-primary"
                  whileTap={{ scale: 0.97 }}
                >
                  <RotateCcw size={15} />
                  {text.reset}
                </motion.button>
                <NeonButton href="/contact">
                  {text.cta}
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

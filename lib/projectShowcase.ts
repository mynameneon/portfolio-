export type ProjectPreviewVariant = "board" | "audio" | "chat" | "dashboard" | "map" | "files" | "stream" | "terminal" | "game" | "key";

export interface LocalizedCopy {
  ru: string;
  ua: string;
}

export interface ProjectShowcaseItem {
  id: string;
  title: string;
  folder: string;
  kind: LocalizedCopy;
  summary: LocalizedCopy;
  highlights: readonly LocalizedCopy[];
  stack: readonly string[];
  variant: ProjectPreviewVariant;
  accent: string;
}

export const projectShowcaseItems: readonly ProjectShowcaseItem[] = [
  {
    id: "opus-monopoly",
    title: "Business Monopoly",
    folder: "D:\\Project AI\\opus - monopoly",
    kind: { ru: "Мультиплеерная бизнес-игра", ua: "Мультиплеєрна бізнес-гра" },
    summary: {
      ru: "Полная Monopoly-like платформа: авторизация, лобби, друзья, магазин, достижения, Supabase Realtime и PWA.",
      ua: "Повна Monopoly-like платформа: авторизація, лобі, друзі, магазин, досягнення, Supabase Realtime і PWA."
    },
    highlights: [
      { ru: "Игровая доска и экономика", ua: "Ігрова дошка й економіка" },
      { ru: "Realtime-комнаты и чат", ua: "Realtime-кімнати й чат" },
      { ru: "Магазин, скины, достижения", ua: "Магазин, скіни, досягнення" }
    ],
    stack: ["React", "TypeScript", "Vite", "Supabase", "Zustand"],
    variant: "board",
    accent: "#ffd60a"
  },
  {
    id: "monopoly-online",
    title: "Monopoly Online",
    folder: "D:\\Project AI\\monopoly 50 на 50",
    kind: { ru: "Браузерная онлайн-игра", ua: "Браузерна онлайн-гра" },
    summary: {
      ru: "Мультиплеерная настольная игра с режимами, JWT-авторизацией, Socket.io и отдельным Node-сервером.",
      ua: "Мультиплеєрна настільна гра з режимами, JWT-авторизацією, Socket.io й окремим Node-сервером."
    },
    highlights: [
      { ru: "Лобби и игровые комнаты", ua: "Лобі та ігрові кімнати" },
      { ru: "Режимы: рейтинг, ретро, быстрая", ua: "Режими: рейтинг, ретро, швидка" },
      { ru: "API + realtime backend", ua: "API + realtime backend" }
    ],
    stack: ["React", "Vite", "Express", "Socket.io", "JWT"],
    variant: "game",
    accent: "#30d158"
  },
  {
    id: "qwenaudio",
    title: "QwenAudio Studio",
    folder: "D:\\Project AI\\qwenaudio",
    kind: { ru: "Онлайн-студия дубляжа", ua: "Онлайн-студія дубляжу" },
    summary: {
      ru: "Совместная запись озвучки: комнаты до 8 человек, таймлайн, эффекты, WebRTC-чат и экспорт через FFmpeg.",
      ua: "Спільний запис озвучення: кімнати до 8 людей, таймлайн, ефекти, WebRTC-чат і експорт через FFmpeg."
    },
    highlights: [
      { ru: "Многодорожечный timeline", ua: "Багатодоріжковий timeline" },
      { ru: "Voice changer и soundboard", ua: "Voice changer і soundboard" },
      { ru: "Экспорт MP4/WAV/GIF", ua: "Експорт MP4/WAV/GIF" }
    ],
    stack: ["Next.js", "Node", "Socket.io", "WebRTC", "FFmpeg"],
    variant: "audio",
    accent: "#66c7ff"
  },
  {
    id: "dublab",
    title: "DubLab",
    folder: "D:\\Project AI\\dublab",
    kind: { ru: "Real-time dubbing studio", ua: "Real-time dubbing studio" },
    summary: {
      ru: "Профессиональный интерфейс для совместной озвучки видео: роли, эффекты, видео-плеер, soundboard и экспорт.",
      ua: "Професійний інтерфейс для спільного озвучення відео: ролі, ефекти, відеоплеєр, soundboard і експорт."
    },
    highlights: [
      { ru: "Роль Director / Actor", ua: "Роль Director / Actor" },
      { ru: "Web Audio API эффекты", ua: "Web Audio API ефекти" },
      { ru: "FFmpeg.wasm worker", ua: "FFmpeg.wasm worker" }
    ],
    stack: ["React", "Vite", "Node", "Tone.js", "FFmpeg.wasm"],
    variant: "audio",
    accent: "#af52de"
  },
  {
    id: "vortex",
    title: "Vortex Desktop",
    folder: "D:\\Project AI\\codextest",
    kind: { ru: "Discord-like desktop shell", ua: "Discord-like desktop shell" },
    summary: {
      ru: "Electron-коммуникационная оболочка: серверы, каналы, чат, home feed, профили и backend scaffold.",
      ua: "Electron-комунікаційна оболонка: сервери, канали, чат, home feed, профілі та backend scaffold."
    },
    highlights: [
      { ru: "Desktop-first UI", ua: "Desktop-first UI" },
      { ru: "Express + Socket.io", ua: "Express + Socket.io" },
      { ru: "Prisma-схема для core-сущностей", ua: "Prisma-схема для core-сутностей" }
    ],
    stack: ["Electron", "React", "TypeScript", "Prisma", "Socket.io"],
    variant: "chat",
    accent: "#7c3aed"
  },
  {
    id: "nexus",
    title: "NEXUS Business OS",
    folder: "D:\\Project AI\\nexus - 20 yf 80",
    kind: { ru: "Business OS / desktop platform", ua: "Business OS / desktop platform" },
    summary: {
      ru: "Большая Vite/Electron-платформа с auth, SQLite, мобильной сборкой через Capacitor и визуальным OS-подходом.",
      ua: "Велика Vite/Electron-платформа з auth, SQLite, мобільною збіркою через Capacitor і OS-підходом."
    },
    highlights: [
      { ru: "Desktop + mobile targets", ua: "Desktop + mobile targets" },
      { ru: "SQLite и realtime-связки", ua: "SQLite і realtime-зв'язки" },
      { ru: "Операционная панель для бизнеса", ua: "Операційна панель для бізнесу" }
    ],
    stack: ["React 19", "Electron", "SQLite", "Capacitor", "Vite"],
    variant: "dashboard",
    accent: "#2997ff"
  },
  {
    id: "songless",
    title: "Songless Analog",
    folder: "D:\\Project AI\\songless_analog",
    kind: { ru: "Музыкальная угадайка", ua: "Музична вгадайка" },
    summary: {
      ru: "Мультиплеерная игра по угадыванию треков с progressive clips, режимами, pack editor и live lobby.",
      ua: "Мультиплеєрна гра з вгадування треків з progressive clips, режимами, pack editor і live lobby."
    },
    highlights: [
      { ru: "1-10 игроков в комнате", ua: "1-10 гравців у кімнаті" },
      { ru: "YouTube metadata без API key", ua: "YouTube metadata без API key" },
      { ru: "Free for All / Teams / Speed", ua: "Free for All / Teams / Speed" }
    ],
    stack: ["React", "Vite", "Express", "Socket.io", "YouTube API"],
    variant: "audio",
    accent: "#ff375f"
  },
  {
    id: "nexplorer",
    title: "NexPlorer",
    folder: "D:\\Project AI\\PROVODNIK 80 на 20",
    kind: { ru: "Windows file manager", ua: "Windows file manager" },
    summary: {
      ru: "Замена проводника на PyQt6: индексация, теги, preview panel, автоочистка, шифрование и темы.",
      ua: "Заміна провідника на PyQt6: індексація, теги, preview panel, автоочищення, шифрування і теми."
    },
    highlights: [
      { ru: "Поиск и индексация файлов", ua: "Пошук та індексація файлів" },
      { ru: "Теги, preview, context menu", ua: "Теги, preview, context menu" },
      { ru: "PyQt6 desktop architecture", ua: "PyQt6 desktop architecture" }
    ],
    stack: ["Python", "PyQt6", "SQLAlchemy", "Watchdog", "Pillow"],
    variant: "files",
    accent: "#30d158"
  },
  {
    id: "logist",
    title: "Logist Mini App",
    folder: "D:\\Project AI\\TGBOT_LOGISTIKA",
    kind: { ru: "Telegram bot + mini app", ua: "Telegram bot + mini app" },
    summary: {
      ru: "Навигатор для курьеров в Киеве: бот, mini app, точки доставки, OSRM-маршруты и heading-up карта.",
      ua: "Навігатор для кур'єрів у Києві: бот, mini app, точки доставки, OSRM-маршрути й heading-up карта."
    },
    highlights: [
      { ru: "Оптимизация маршрута", ua: "Оптимізація маршруту" },
      { ru: "Leaflet mini app", ua: "Leaflet mini app" },
      { ru: "aiogram backend", ua: "aiogram backend" }
    ],
    stack: ["Python", "aiogram", "Leaflet", "OSRM", "Docker"],
    variant: "map",
    accent: "#00c7be"
  },
  {
    id: "sakura",
    title: "Sakura Stream",
    folder: "D:\\Project AI\\anime",
    kind: { ru: "Private streaming build", ua: "Private streaming build" },
    summary: {
      ru: "Модульный iOS-проект и desktop-сборка: catalog, player shell, cache, CoreData и installer workflow.",
      ua: "Модульний iOS-проєкт і desktop-збірка: catalog, player shell, cache, CoreData та installer workflow."
    },
    highlights: [
      { ru: "SwiftUI + UIKit", ua: "SwiftUI + UIKit" },
      { ru: "Memory/disk cache", ua: "Memory/disk cache" },
      { ru: "Desktop Electron build", ua: "Desktop Electron build" }
    ],
    stack: ["SwiftUI", "UIKit", "CoreData", "Electron", "Xcode"],
    variant: "stream",
    accent: "#ff9f0a"
  }
];

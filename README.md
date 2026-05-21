# Nikita Kononenko Portfolio

Профессиональный портфолио-сайт на Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion и Supabase.

## Установка

```bash
npm install
npm run dev
```

Локальный сайт будет доступен на `http://localhost:3000`.

## Supabase

В Supabase Dashboard -> SQL Editor выполни SQL из файла `supabase/schema.sql`. Он создает:

- `contacts` для формы связи;
- `site_content` для редактируемого контента сайта;
- `admin_users` для аккаунтов админки без публичной регистрации.

Добавь переменные окружения локально в `.env.local` и в Netlify Environment Variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://zmzeudwugwmfxhpxhzqr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_VGSFECkKfoevDnWA87-5uQ_iO-z-w3f
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Форма связи сохраняет заявки в таблицу `contacts`. Публичный сайт читает только `site_content`, а запись контента и аккаунтов идет через серверный route handler с `SUPABASE_SERVICE_ROLE_KEY`.

## Админка

Открой `/admin`. Публичной регистрации нет: новые логины добавляются внутри админки.

Контент редактируется как один структурированный JSON:

- `translations.ru` и `translations.ua` — тексты, стек, опыт, контакты, hero-картинка;
- `projects` — карточки проектов, стек, accent-цвета и визуальные варианты;
- `experience.items[].animation` — название SVG-анимации карточки опыта.

Для смены bootstrap-пароля задай `ADMIN_PASSWORD_HASH`. Хеш можно сгенерировать локально:

```bash
node -e "const crypto=require('crypto'); const password=process.env.ADMIN_PASSWORD; const salt=crypto.randomBytes(16).toString('hex'); const key=crypto.scryptSync(password,salt,64).toString('hex'); console.log('scrypt:'+salt+':'+key);"
```

## Email-уведомления

Если нужно сразу получать заявки на почту, создай API key в Resend и добавь серверные переменные окружения:

```bash
RESEND_API_KEY=re_xxxxxxxxx
CONTACT_EMAIL_TO=maestro_bluentano@proton.me
CONTACT_EMAIL_FROM="Nikita Portfolio <onboarding@resend.dev>"
```

`RESEND_API_KEY` нельзя делать `NEXT_PUBLIC`. В продакшене лучше заменить `CONTACT_EMAIL_FROM` на адрес с подтвержденного домена в Resend, например `Portfolio <hello@your-domain.com>`.

## Команды

```bash
npm run lint
npm run typecheck
npm run build
```

## Публикация

Разовая публикация изменений в GitHub:

```bash
npm run publish -- -Message "Update portfolio"
```

Автоматический режим для локальной папки:

```bash
npm run publish:watch
```

Watcher ждёт, пока изменения в git не меняются 90 секунд, затем запускает lint, typecheck, build, делает commit и push в GitHub. Если Netlify подключён к репозиторию GitHub, новый deploy стартует автоматически после push.

Чтобы watcher сам запускался после входа в Windows:

```bash
npm run publish:watch:install
```

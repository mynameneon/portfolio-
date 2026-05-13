# Nikita Kononenko Portfolio

Профессиональный портфолио-сайт на Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion и Supabase.

## Установка

```bash
npm install
npm run dev
```

Локальный сайт будет доступен на `http://localhost:3000`.

## Supabase

Создай таблицу в Supabase Dashboard -> SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS contacts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  lang text DEFAULT 'ru',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert contacts" ON contacts;

CREATE POLICY "Anyone can insert contacts"
  ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON TABLE public.contacts TO anon, authenticated;

NOTIFY pgrst, 'reload schema';
```

Добавь переменные окружения локально в `.env.local` и в Netlify Environment Variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://zmzeudwugwmfxhpxhzqr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_VGSFECkKfoevDnWA87-5uQ_iO-z-w3f
```

Форма связи сохраняет заявки в таблицу `contacts`. Для безопасности публичного чтения нет: посетители могут только отправить сообщение.

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

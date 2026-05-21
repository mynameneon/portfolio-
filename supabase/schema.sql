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

CREATE TABLE IF NOT EXISTS site_content (
  key text PRIMARY KEY,
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read site content" ON site_content;

CREATE POLICY "Anyone can read site content"
  ON site_content
  FOR SELECT
  TO anon, authenticated
  USING (true);

GRANT SELECT ON TABLE public.site_content TO anon, authenticated;

CREATE TABLE IF NOT EXISTS admin_users (
  login text PRIMARY KEY,
  password_hash text NOT NULL,
  role text NOT NULL DEFAULT 'editor',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

INSERT INTO admin_users (login, password_hash, role)
VALUES (
  'Nikita',
  'scrypt:92f9888634ee5f2b3382fe0ba884dd43:423807fd9a34a0fd0dd0d816f2f28c8f5fcaee7038a3b7a101d2c72dfabb86fedc28630fc7eabd6bf6524b2d802dcdd540dc766e2654ba95679fbaeb72c35f8b',
  'admin'
)
ON CONFLICT (login) DO NOTHING;

NOTIFY pgrst, 'reload schema';

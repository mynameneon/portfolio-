import { createClient } from "@supabase/supabase-js";

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          lang: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          lang?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          lang?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://zmzeudwugwmfxhpxhzqr.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_VGSFECkKfoevDnWA87-5uQ_iO-z-w3f";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

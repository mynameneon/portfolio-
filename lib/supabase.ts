import { createClient } from "@supabase/supabase-js";

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

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
      site_content: {
        Row: {
          key: string;
          data: Json;
          updated_at: string | null;
        };
        Insert: {
          key: string;
          data: Json;
          updated_at?: string;
        };
        Update: {
          key?: string;
          data?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      admin_users: {
        Row: {
          login: string;
          password_hash: string;
          role: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          login: string;
          password_hash: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          login?: string;
          password_hash?: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
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

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zmzeudwugwmfxhpxhzqr.supabase.co";
export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_VGSFECkKfoevDnWA87-5uQ_iO-z-w3f";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

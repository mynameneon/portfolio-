import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { SITE_CONTENT_KEY, isSiteContent, normalizeSiteContent } from "@/lib/siteContent";
import type { Json } from "@/lib/supabase";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  const session = getAdminSession();

  if (!session) {
    return NextResponse.json({ success: false, error: "Нужно войти в админку." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);

  if (!isSiteContent(body)) {
    return NextResponse.json({ success: false, error: "JSON не похож на структуру контента сайта." }, { status: 400 });
  }

  const content = normalizeSiteContent(body);

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.from("site_content").upsert(
      {
        key: SITE_CONTENT_KEY,
        data: content as unknown as Json,
        updated_at: new Date().toISOString()
      },
      { onConflict: "key" }
    );

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Не удалось сохранить контент."
      },
      { status: 500 }
    );
  }
}

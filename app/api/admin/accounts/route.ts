import { NextResponse } from "next/server";
import { getAdminSession, hashAdminPassword } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const session = getAdminSession();

  if (!session) {
    return NextResponse.json({ success: false, error: "Нужно войти в админку." }, { status: 401 });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("admin_users")
      .select("login, role, created_at, updated_at")
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, accounts: data ?? [] });
  } catch (error) {
    if (error instanceof Error && error.message.includes("SUPABASE_SERVICE_ROLE_KEY")) {
      return NextResponse.json({
        success: true,
        accounts: [],
        warning: "Добавь SUPABASE_SERVICE_ROLE_KEY, чтобы читать и создавать аккаунты из Supabase."
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Не удалось загрузить аккаунты."
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = getAdminSession();

  if (!session) {
    return NextResponse.json({ success: false, error: "Нужно войти в админку." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { login?: string; password?: string; role?: string } | null;
  const login = body?.login?.trim() ?? "";
  const password = body?.password ?? "";
  const role = body?.role?.trim() || "editor";

  if (!login || login.length < 3 || !password || password.length < 8) {
    return NextResponse.json({ success: false, error: "Логин от 3 символов, пароль от 8 символов." }, { status: 400 });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.from("admin_users").upsert(
      {
        login,
        password_hash: hashAdminPassword(password),
        role,
        updated_at: new Date().toISOString()
      },
      { onConflict: "login" }
    );

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Не удалось сохранить аккаунт."
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = getAdminSession();

  if (!session) {
    return NextResponse.json({ success: false, error: "Нужно войти в админку." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { login?: string } | null;
  const login = body?.login?.trim() ?? "";

  if (!login) {
    return NextResponse.json({ success: false, error: "Укажи логин аккаунта." }, { status: 400 });
  }

  if (login === session.login) {
    return NextResponse.json({ success: false, error: "Нельзя удалить аккаунт, под которым ты сейчас вошел." }, { status: 400 });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.from("admin_users").delete().eq("login", login);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Не удалось удалить аккаунт."
      },
      { status: 500 }
    );
  }
}

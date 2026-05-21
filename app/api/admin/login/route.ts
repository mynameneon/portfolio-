import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createAdminSessionToken, verifyAdminCredentials } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { login?: string; password?: string } | null;
  const login = body?.login?.trim() ?? "";
  const password = body?.password ?? "";

  if (!login || !password) {
    return NextResponse.json({ success: false, error: "Введите логин и пароль." }, { status: 400 });
  }

  const admin = await verifyAdminCredentials(login, password);

  if (!admin) {
    return NextResponse.json({ success: false, error: "Неверный логин или пароль." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(admin.login, admin.role), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return response;
}

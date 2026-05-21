import "server-only";

import crypto from "crypto";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const ADMIN_SESSION_COOKIE = "portfolio_admin_session";

const DEFAULT_ADMIN_LOGIN = "Nikita";
const DEFAULT_ADMIN_PASSWORD_HASH =
  "scrypt:92f9888634ee5f2b3382fe0ba884dd43:423807fd9a34a0fd0dd0d816f2f28c8f5fcaee7038a3b7a101d2c72dfabb86fedc28630fc7eabd6bf6524b2d802dcdd540dc766e2654ba95679fbaeb72c35f8b";

function base64Url(input: string) {
  return Buffer.from(input).toString("base64url");
}

function fromBase64Url(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD_HASH || DEFAULT_ADMIN_PASSWORD_HASH;
}

function signPayload(payload: string) {
  return crypto.createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

export function hashAdminPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password: string, encodedHash: string) {
  const [algorithm, salt, expectedHash] = encodedHash.split(":");

  if (algorithm !== "scrypt" || !salt || !expectedHash) {
    return false;
  }

  const expected = Buffer.from(expectedHash, "hex");
  const actual = crypto.scryptSync(password, salt, expected.length);

  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

export async function verifyAdminCredentials(login: string, password: string) {
  const normalizedLogin = login.trim();
  const configuredLogin = process.env.ADMIN_LOGIN || DEFAULT_ADMIN_LOGIN;
  const configuredPasswordHash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_ADMIN_PASSWORD_HASH;

  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data } = await supabaseAdmin
      .from("admin_users")
      .select("login, password_hash, role")
      .eq("login", normalizedLogin)
      .maybeSingle();

    if (data && verifyPassword(password, data.password_hash)) {
      return { login: data.login, role: data.role };
    }
  } catch {
    // Local development can still use the configured bootstrap admin before the service key is added.
  }

  if (normalizedLogin === configuredLogin && verifyPassword(password, configuredPasswordHash)) {
    return { login: configuredLogin, role: "admin" };
  }

  return null;
}

export function createAdminSessionToken(login: string, role: string) {
  const payload = JSON.stringify({
    login,
    role,
    exp: Date.now() + 1000 * 60 * 60 * 8
  });
  const encodedPayload = base64Url(payload);
  return `${encodedPayload}.${signPayload(encodedPayload)}`;
}

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature || signature !== signPayload(encodedPayload)) {
    return null;
  }

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload)) as {
      login?: string;
      role?: string;
      exp?: number;
    };

    if (!payload.login || !payload.role || !payload.exp || payload.exp < Date.now()) {
      return null;
    }

    return {
      login: payload.login,
      role: payload.role
    };
  } catch {
    return null;
  }
}

export function getAdminSession() {
  return verifyAdminSessionToken(cookies().get(ADMIN_SESSION_COOKIE)?.value);
}

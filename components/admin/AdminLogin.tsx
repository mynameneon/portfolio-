"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const router = useRouter();
  const [login, setLogin] = useState("Nikita");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password })
    });
    const result = (await response.json().catch(() => null)) as { success?: boolean; error?: string } | null;

    if (!response.ok || !result?.success) {
      setStatus("error");
      setError(result?.error ?? "Не удалось войти.");
      return;
    }

    router.refresh();
  };

  return (
    <main className="section-band min-h-[calc(100svh-66px)]">
      <div className="shell grid place-items-center">
        <form
          onSubmit={submit}
          className="w-full max-w-md rounded-[30px] border border-line bg-white/[0.055] p-6 shadow-[0_34px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
        >
          <p className="eyebrow">Admin login</p>
          <h1 className="mt-3 text-3xl font-semibold text-text-primary">Вход в редактор сайта</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">Публичной регистрации нет. Аккаунты добавляются только внутри админки.</p>

          <label className="mt-6 grid gap-2">
            <span className="font-mono text-[11px] uppercase text-[var(--text-faint)]">Логин</span>
            <input
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              className="rounded-2xl border border-line bg-black/30 px-4 py-3 text-text-primary outline-none focus:border-[#2997ff]/60"
              autoComplete="username"
            />
          </label>

          <label className="mt-4 grid gap-2">
            <span className="font-mono text-[11px] uppercase text-[var(--text-faint)]">Пароль</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-2xl border border-line bg-black/30 px-4 py-3 text-text-primary outline-none focus:border-[#2997ff]/60"
              type="password"
              autoComplete="current-password"
            />
          </label>

          {status === "error" && error ? <p className="mt-4 rounded-2xl border border-red-400/35 bg-red-500/10 p-3 text-sm text-red-200">{error}</p> : null}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 min-h-12 w-full rounded-full bg-white px-5 text-sm font-semibold text-black disabled:opacity-60"
          >
            {status === "loading" ? "Проверяю..." : "Войти"}
          </button>
        </form>
      </div>
    </main>
  );
}

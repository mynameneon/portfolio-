"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteContent } from "@/types";

interface AdminEditorProps {
  initialContent: SiteContent;
  source: "supabase" | "fallback";
  updatedAt: string | null;
  userLogin: string;
}

interface AdminAccount {
  login: string;
  role: string;
  created_at: string | null;
  updated_at: string | null;
}

export function AdminEditor({ initialContent, source, updatedAt, userLogin }: AdminEditorProps) {
  const router = useRouter();
  const [jsonText, setJsonText] = useState(() => JSON.stringify(initialContent, null, 2));
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [accountLogin, setAccountLogin] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [accountStatus, setAccountStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [accountMessage, setAccountMessage] = useState("");

  const parsedInfo = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonText) as SiteContent;
      return {
        ok: true,
        ruExperience: parsed.translations?.ru?.experience?.items?.length ?? 0,
        uaExperience: parsed.translations?.ua?.experience?.items?.length ?? 0,
        projects: parsed.projects?.length ?? 0,
        sections: Object.keys(parsed.settings?.sections ?? {}).length,
        hiddenSections: Object.values(parsed.settings?.sections ?? {}).filter((section) => section?.hidden === true).length,
        editableSections: Object.keys(parsed.settings?.editableSections ?? {}).length,
        assets:
          (parsed.settings?.assets?.images?.length ?? 0) +
          (parsed.settings?.assets?.sounds?.length ?? 0) +
          (parsed.settings?.assets?.animations?.length ?? 0)
      };
    } catch {
      return { ok: false, ruExperience: 0, uaExperience: 0, projects: 0, sections: 0, hiddenSections: 0, editableSections: 0, assets: 0 };
    }
  }, [jsonText]);

  const loadAccounts = async () => {
    const response = await fetch("/api/admin/accounts");
    const result = (await response.json().catch(() => null)) as { success?: boolean; accounts?: AdminAccount[]; warning?: string; error?: string } | null;

    if (response.ok && result?.success) {
      setAccounts(result.accounts ?? []);
      if (result.warning) {
        setAccountStatus("error");
        setAccountMessage(result.warning);
      }
    } else if (result?.error) {
      setAccountStatus("error");
      setAccountMessage(result.error);
    }
  };

  useEffect(() => {
    void loadAccounts();
  }, []);

  const saveContent = async () => {
    setStatus("loading");
    setMessage("");

    let payload: SiteContent;
    try {
      payload = JSON.parse(jsonText) as SiteContent;
    } catch {
      setStatus("error");
      setMessage("JSON сломан: проверь запятые, кавычки и скобки.");
      return;
    }

    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = (await response.json().catch(() => null)) as { success?: boolean; error?: string } | null;

    if (!response.ok || !result?.success) {
      setStatus("error");
      setMessage(result?.error ?? "Не удалось сохранить контент.");
      return;
    }

    setStatus("success");
    setMessage("Контент сохранен в Supabase. Обнови публичную страницу, чтобы увидеть изменения.");
    router.refresh();
  };

  const resetFormatting = () => {
    try {
      setJsonText(JSON.stringify(JSON.parse(jsonText), null, 2));
      setStatus("idle");
      setMessage("");
    } catch {
      setStatus("error");
      setMessage("Сначала исправь JSON, потом можно форматировать.");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };

  const createAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAccountStatus("loading");
    setAccountMessage("");

    const response = await fetch("/api/admin/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: accountLogin, password: accountPassword, role: "editor" })
    });
    const result = (await response.json().catch(() => null)) as { success?: boolean; error?: string } | null;

    if (!response.ok || !result?.success) {
      setAccountStatus("error");
      setAccountMessage(result?.error ?? "Не удалось создать аккаунт.");
      return;
    }

    setAccountStatus("success");
    setAccountMessage("Аккаунт сохранен. Теперь по этому логину можно войти в админку.");
    setAccountPassword("");
    await loadAccounts();
  };

  const deleteAccount = async (login: string) => {
    if (login === userLogin) {
      setAccountStatus("error");
      setAccountMessage("Нельзя удалить аккаунт, под которым ты сейчас вошел.");
      return;
    }

    const confirmed = window.confirm(`Удалить аккаунт ${login}?`);
    if (!confirmed) {
      return;
    }

    setAccountStatus("loading");
    setAccountMessage("");

    const response = await fetch("/api/admin/accounts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login })
    });
    const result = (await response.json().catch(() => null)) as { success?: boolean; error?: string } | null;

    if (!response.ok || !result?.success) {
      setAccountStatus("error");
      setAccountMessage(result?.error ?? "Не удалось удалить аккаунт.");
      return;
    }

    setAccountStatus("success");
    setAccountMessage("Аккаунт удален.");
    await loadAccounts();
  };

  return (
    <main className="section-band">
      <div className="shell">
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-[30px] border border-line bg-white/[0.055] p-5 shadow-[0_28px_100px_rgba(0,0,0,0.38)] backdrop-blur-2xl lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">Admin panel</p>
            <h1 className="mt-2 text-3xl font-semibold text-text-primary">Редактор контента сайта</h1>
            <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
              Вошел: {userLogin}. Источник контента: {source === "supabase" ? "Supabase" : "локальный fallback"}
              {updatedAt ? `, обновлено ${new Date(updatedAt).toLocaleString("ru-RU")}` : ""}.
            </p>
          </div>
          <button type="button" onClick={logout} className="min-h-11 rounded-full border border-line bg-white/[0.055] px-5 text-sm font-semibold text-text-primary">
            Выйти
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
          <section className="rounded-[30px] border border-line bg-white/[0.045] p-4 shadow-[0_28px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-text-primary">SiteContent JSON</h2>
                <p className="mt-1 text-sm text-[var(--text-soft)]">
                  Меняй тексты, стек, опыт, проекты, ссылки, картинки, accent-цвета, видимость разделов, project variant и experience animation.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={resetFormatting} className="min-h-10 rounded-full border border-line bg-black/30 px-4 text-sm text-text-primary">
                  Форматировать
                </button>
                <button type="button" onClick={saveContent} disabled={status === "loading" || !parsedInfo.ok} className="min-h-10 rounded-full bg-white px-4 text-sm font-semibold text-black disabled:opacity-50">
                  {status === "loading" ? "Сохраняю..." : "Сохранить"}
                </button>
              </div>
            </div>

            <textarea
              value={jsonText}
              onChange={(event) => setJsonText(event.target.value)}
              spellCheck={false}
              className="min-h-[68svh] w-full resize-y rounded-[24px] border border-line bg-black/55 p-4 font-mono text-xs leading-5 text-text-primary outline-none focus:border-[#2997ff]/60"
            />

            {message ? (
              <p className={`mt-4 rounded-2xl border p-3 text-sm ${status === "success" ? "border-[#30d158]/35 bg-[#30d158]/10 text-[#30d158]" : "border-red-400/35 bg-red-500/10 text-red-200"}`}>
                {message}
              </p>
            ) : null}
          </section>

          <aside className="grid content-start gap-5">
            <section className="rounded-[30px] border border-line bg-white/[0.045] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
              <h2 className="text-lg font-semibold text-text-primary">Структура</h2>
              <div className="mt-4 grid gap-2 text-sm text-[var(--text-soft)]">
                <span className={parsedInfo.ok ? "text-[#30d158]" : "text-red-200"}>{parsedInfo.ok ? "JSON валиден" : "JSON сейчас сломан"}</span>
                <span>RU опыт: {parsedInfo.ruExperience}</span>
                <span>UA опыт: {parsedInfo.uaExperience}</span>
                <span>Проекты: {parsedInfo.projects}</span>
                <span>Разделы: {parsedInfo.sections}</span>
                <span>Скрыто разделов: {parsedInfo.hiddenSections}</span>
                <span>Редактируемые 3D/услуги: {parsedInfo.editableSections}</span>
                <span>Ассеты/анимации: {parsedInfo.assets}</span>
              </div>
            </section>

            <section className="rounded-[30px] border border-line bg-white/[0.045] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
              <h2 className="text-lg font-semibold text-text-primary">Как редактировать</h2>
              <div className="mt-4 grid gap-3 text-sm leading-6 text-[var(--text-soft)]">
                <p>
                  <b className="text-text-primary">Скрыть:</b> добавь <code className="rounded bg-black/35 px-1 py-0.5">&quot;hidden&quot;: true</code> в раздел
                  <code className="ml-1 rounded bg-black/35 px-1 py-0.5">settings.sections</code>, проект, контакт, карточку, категорию стека или опыт.
                </p>
                <p>
                  <b className="text-text-primary">Добавить:</b> скопируй объект в нужном массиве, поменяй <code className="rounded bg-black/35 px-1 py-0.5">id</code> и текст.
                </p>
                <p>
                  <b className="text-text-primary">Удалить:</b> убери объект из массива. Картинки меняются через <code className="rounded bg-black/35 px-1 py-0.5">src</code>, анимации опыта через
                  <code className="ml-1 rounded bg-black/35 px-1 py-0.5">animation</code>, preview проектов через <code className="rounded bg-black/35 px-1 py-0.5">variant</code>.
                </p>
                <p>
                  <b className="text-text-primary">3D и услуги:</b> тексты блоков Parallax, DepthDeck, Three.js, Services и PageDepth лежат в
                  <code className="ml-1 rounded bg-black/35 px-1 py-0.5">settings.editableSections</code>.
                </p>
              </div>
            </section>

            <section className="rounded-[30px] border border-line bg-white/[0.045] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
              <h2 className="text-lg font-semibold text-text-primary">Аккаунты</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">Создание только из админки. Публичной регистрации нет.</p>
              <form onSubmit={createAccount} className="mt-4 grid gap-3">
                <input
                  value={accountLogin}
                  onChange={(event) => setAccountLogin(event.target.value)}
                  className="rounded-2xl border border-line bg-black/35 px-4 py-3 text-sm text-text-primary outline-none focus:border-[#2997ff]/60"
                  placeholder="login"
                />
                <input
                  value={accountPassword}
                  onChange={(event) => setAccountPassword(event.target.value)}
                  className="rounded-2xl border border-line bg-black/35 px-4 py-3 text-sm text-text-primary outline-none focus:border-[#2997ff]/60"
                  type="password"
                  placeholder="password"
                />
                <button type="submit" disabled={accountStatus === "loading"} className="min-h-10 rounded-full bg-white px-4 text-sm font-semibold text-black disabled:opacity-60">
                  {accountStatus === "loading" ? "Сохраняю..." : "Добавить / обновить"}
                </button>
              </form>
              {accountMessage ? (
                <p className={`mt-3 rounded-2xl border p-3 text-xs leading-5 ${accountStatus === "success" ? "border-[#30d158]/35 bg-[#30d158]/10 text-[#30d158]" : "border-red-400/35 bg-red-500/10 text-red-200"}`}>
                  {accountMessage}
                </p>
              ) : null}
              <div className="mt-4 grid gap-2">
                {accounts.map((account) => (
                  <span key={account.login} className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-black/28 px-3 py-2 text-sm text-[var(--text-soft)]">
                    <span>
                      <b className="text-text-primary">{account.login}</b> / {account.role}
                    </span>
                    {account.login !== userLogin ? (
                      <button type="button" onClick={() => deleteAccount(account.login)} className="rounded-full border border-red-400/30 px-3 py-1 text-xs text-red-200 hover:bg-red-500/10">
                        Удалить
                      </button>
                    ) : null}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

// src/app/_ui/GoodsSearchBar.js
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function getFirstQ(sp) {
  // Если q повторяется (?q=phone&q=tv), берётся первое значение
  const all = sp.getAll("q");
  return all[0] ?? "";
}

export default function GoodsSearchBar({ basePath = "/goods" }) {
  const router = useRouter();
  const sp = useSearchParams();

  const qFromUrl = getFirstQ(sp);
  const [value, setValue] = useState(qFromUrl);

  // URL изменился (ссылки / Back / Forward) -> поле обновилось
  useEffect(() => {
    setValue(qFromUrl);
  }, [qFromUrl]);

  function buildHref(nextQ) {
    const q = nextQ.trim();
    return q ? `${basePath}?q=${encodeURIComponent(q)}` : basePath;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!canSearch) return;
    router.push(buildHref(value));
  }

  function onReset() {
    // Сбрасываются и URL, и поле (через синхронизацию с URL)
    router.push(basePath);
  }

  const canSearch = useMemo(() => value.trim().length > 0, [value]);
  const canReset = useMemo(() => qFromUrl.length > 0 || value.length > 0, [qFromUrl, value]);

  return (
    <div className="app-card app-stack-sm">
      <form onSubmit={onSubmit} className="app-stack-sm">
        <label className="block text-sm font-semibold text-slate-200" htmlFor="q">
          Поиск (q)
        </label>

        <div className="flex flex-wrap gap-2">
          <input
            id="q"
            name="q"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="например: phone"
            className="w-full max-w-sm rounded-md border border-slate-700/60 bg-slate-950/40 px-3 py-2
             text-slate-100 placeholder:text-slate-400 outline-none
             focus-visible:ring-2 focus-visible:ring-slate-400/40"
          />

          <button type="submit" className="app-btn app-btn-primary" disabled={!canSearch}>
            Найти
          </button>

          <button
            type="button"
            onClick={onReset}
            className="app-btn app-btn-ghost"
            disabled={!canReset}
          >
            Сбросить
          </button>
        </div>

        {/* Мини-диагностика: видно разницу между URL и полем */}
        <div className="text-xs text-slate-500">
          <span className="font-semibold">q из URL:</span>{" "}
          <code className="font-mono">{qFromUrl || "(пусто)"}</code>
          <span className="mx-2">•</span>
          <span className="font-semibold">значение в поле:</span>{" "}
          <code className="font-mono">{value || "(пусто)"}</code>
        </div>

        {/* Быстрые ссылки для проверки */}
        <div className="flex flex-wrap gap-2 text-sm">
          <Link href="/goods?q=phone" className="app-btn app-btn-ghost">
            q=phone
          </Link>
          <Link href="/goods?q=watch" className="app-btn app-btn-ghost">
            q=watch
          </Link>
          <Link href="/goods?q=phone&q=tv" className="app-btn app-btn-ghost">
            q=phone&q=tv
          </Link>
        </div>
      </form>
    </div>
  );
}

// src/app/(app)/goods/history/HistoryListClient.js
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  GOODS_STORAGE_EVENT,
  HISTORY_KEY,
  HISTORY_LIMIT,
  clearHistory,
  readHistoryEntries,
} from "@/app/_storage/goodsStorage";
import EmptyState from "@/components/ui/EmptyState";

export default function HistoryListClient() {
  // SSR выключен в Loader — localStorage безопасен при инициализации
  const [entries, setEntries] = useState(() => readHistoryEntries());

  useEffect(() => {
    const sync = () => setEntries(readHistoryEntries());

    window.addEventListener(GOODS_STORAGE_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(GOODS_STORAGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const handleClear = () => {
    clearHistory(); // очистка через storage-слой + событие обновления
  };

  if (entries.length === 0) {
    return (
      <EmptyState
        title="История пустая"
        description="История заполняется автоматически после просмотра карточек товаров."
        actionHref="/goods"
        actionLabel="Открыть товары"
      />
    );
  }

  return (
    <div className="app-container app-section">
      <div className="app-toolbar">
        <p className="text-sm text-slate-300">
          Последние просмотры (максимум {HISTORY_LIMIT}):{" "}
          <span className="font-mono text-slate-100">{entries.length}</span>
        </p>

        <button type="button" onClick={handleClear} className="app-btn app-btn-ghost">
          Очистить историю
        </button>
      </div>

      <div className="app-card" style={{ padding: 0 }}>
        <ul className="app-list app-list-rows">
          {entries.map(e => (
            <li key={`${e.id}-${e.at ?? "no-at"}`} className="app-card app-card-lift app-stack-sm group">
              <Link className="app-link group-hover:underline" href={`/goods/${e.id}`}>
                {e.title ? e.title : `Товар #${e.id}`}
              </Link>

              {!!e.at && (
                <div className="app-meta">
                  просмотр: <span className="font-mono">{e.at}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-slate-500">
        История хранится в <span className="font-mono">localStorage</span> под ключом{" "}
        <span className="font-mono">{HISTORY_KEY}</span>.
      </p>
    </div>
  );
}

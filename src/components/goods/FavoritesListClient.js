// src/components/goods/FavoritesListClient.js
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FAVORITES_IDS_KEY,
  GOODS_STORAGE_EVENT,
  clearFavorites,
  readFavoriteIds,
} from "@/app/_storage/goodsStorage";
import EmptyState from "@/components/ui/EmptyState";

async function loadFavoriteItems(ids) {
  const results = await Promise.all(
    ids.map(async id => {
      const res = await fetch(`/api/goods/${id}`, { cache: "no-store" });
      const data = await res.json().catch(() => null);

      // Route Handler возвращает { ok, item }
      if (!res.ok || !data?.ok) {
        return { ok: false, id };
      }

      return { ok: true, item: data.item };
    })
  );

  return results.filter(x => x.ok).map(x => x.item);
}

export default function FavoritesListClient() {
  // Компонент рендерится только в браузере (SSR выключен в Loader)
  const [ids, setIds] = useState(() => readFavoriteIds());

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 1) Синхронизация: реагируем на изменения localStorage
  useEffect(() => {
    const sync = () => setIds(readFavoriteIds());

    window.addEventListener(GOODS_STORAGE_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(GOODS_STORAGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // 2) Подгружаем детали товаров по сохранённым id
  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (ids.length === 0) {
        setItems([]);
        setError("");
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const loaded = await loadFavoriteItems(ids);
        if (!cancelled) setItems(loaded);
      } catch (e) {
        if (!cancelled) {
          setItems([]);
          setError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [ids]);

  const handleClear = () => {
    clearFavorites(); // очистка через storage-слой + событие обновления
  };

  if (ids.length === 0) {
    return (
      <EmptyState
        title="Избранное пустое"
        description="Откройте товар и добавьте его в избранное на странице детали."
        actionHref="/goods"
        actionLabel="Перейти к товарам"
      />
    );
  }

  return (
    <div className="app-container app-section">
      <div className="app-toolbar">
        <p className="text-sm text-slate-300">
          Товаров в избранном: <span className="font-mono text-slate-100">{ids.length}</span>
        </p>

        <button
          type="button"
          onClick={handleClear}
          className="app-btn app-btn-ghost"
          disabled={isLoading}
        >
          Очистить избранное
        </button>
      </div>

      {isLoading && (
        <div className="app-card">
          <div className="text-sm text-slate-600">Загрузка...</div>
        </div>
      )}

      {!!error && (
        <div className="app-card app-card--danger">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {!isLoading && !error && (
        <ul className="app-list app-grid app-grid-cards">
          {items.map(it => (
            <li key={it.id} className="app-card app-card-lift app-stack-sm">
              <Link className="app-card-title" href={`/goods/${it.id}`}>
                {it.title}
              </Link>
              <div className="app-meta">${it.price}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

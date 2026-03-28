// src/components/goods/NavCountBadge.js
"use client";

import { useEffect, useState } from "react";
import {
  GOODS_STORAGE_EVENT,
  readFavoriteIds,
  readHistoryEntries,
} from "@/app/_storage/goodsStorage";

function getCount(kind) {
  if (kind === "favorites") return readFavoriteIds().length;
  if (kind === "history") return readHistoryEntries().length;
  return 0;
}

export default function NavCountBadge({ kind }) {
  const [count, setCount] = useState(() => getCount(kind));

  useEffect(() => {
    const update = () => setCount(getCount(kind));

    // Собственное событие (для этой вкладки) + стандартное storage (для других вкладок)
    window.addEventListener(GOODS_STORAGE_EVENT, update);
    window.addEventListener("storage", update);

    return () => {
      window.removeEventListener(GOODS_STORAGE_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, [kind]);

  if (!count) return null;

  return (
    <span className="rounded-full border bg-white px-2 py-0.5 text-xs text-slate-600">
      {count}
    </span>
  );
}

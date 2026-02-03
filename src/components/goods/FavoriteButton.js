// src/components/goods/FavoriteButton.js
"use client";

import { useState } from "react";
import { isFavoriteId, toggleFavoriteId } from "@/app/_storage/goodsStorage";

export default function FavoriteButton({ id }) {
  // SSR отключён в Loader, поэтому чтение localStorage безопасно.
  const [isFav, setIsFav] = useState(() => isFavoriteId(id));

  const handleClick = () => {
    const nextIsFav = toggleFavoriteId(id);
    setIsFav(nextIsFav);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={[
        "rounded-md border px-3 py-1.5 text-sm transition",
        isFav
          ? "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
          : "text-slate-100 hover:bg-slate-50",
      ].join(" ")}
    >
      {isFav ? "✓ В избранном" : "В избранное"}
    </button>
  );
}

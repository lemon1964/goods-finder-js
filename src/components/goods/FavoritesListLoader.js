// src/components/goods/FavoritesListLoader.js
"use client";
import dynamic from "next/dynamic";

const FavoritesListClient = dynamic(() => import("./FavoritesListClient"), {
  ssr: false,
  loading: () => (
    <div className="rounded-md border bg-white p-4 text-sm text-slate-600">
      Загрузка...
    </div>
  ),
});

export default function FavoritesListLoader() {
  return <FavoritesListClient />;
}

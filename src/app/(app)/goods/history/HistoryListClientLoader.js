// src/app/(app)/goods/history/HistoryListClientLoader.js
"use client";

import dynamic from "next/dynamic";

const HistoryListClient = dynamic(() => import("./HistoryListClient"), {
  ssr: false,
  loading: () => (
    <div className="rounded-md border bg-white p-4 text-sm text-slate-600">Загрузка...</div>
  ),
});

export default function HistoryListClientLoader() {
  return <HistoryListClient />;
}

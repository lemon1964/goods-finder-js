// src/app/(demos)/storage-window/StorageWindowClientLoader.js
"use client";

import dynamic from "next/dynamic";

// Рендерим только в браузере, SSR отключён.
// Это убирает класс проблем "Hydration failed", когда UI зависит от browser-only API.
const StorageWindowClient = dynamic(() => import("./StorageWindowClient"), {
  ssr: false,
});

export default function StorageWindowClientLoader(props) {
  return <StorageWindowClient {...props} />;
}

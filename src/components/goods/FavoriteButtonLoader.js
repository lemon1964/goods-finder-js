// src/components/goods/FavoriteButtonLoader.js
"use client";

import dynamic from "next/dynamic";

const FavoriteButton = dynamic(() => import("./FavoriteButton"), {
  ssr: false,
  loading: () => (
    <button
      type="button"
      disabled
      className="rounded-md border px-3 py-1.5 text-sm text-slate-500"
    >
      ...
    </button>
  ),
});

export default function FavoriteButtonLoader(props) {
  return <FavoriteButton {...props} />;
}

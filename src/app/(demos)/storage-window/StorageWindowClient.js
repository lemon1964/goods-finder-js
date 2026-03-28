// src/app/(demos)/storage-window/StorageWindowClient.js
"use client";

import { useState } from "react";

const KEY = "demo:storage-window";

function makeValue() {
  return `saved-at: ${new Date().toISOString()}`;
}

export default function StorageWindowClient({ serverWindowType, serverLocalStorageType }) {
  const clientWindowType = typeof window; // обычно "object"
  const clientLocalStorageType = typeof localStorage; // обычно "object"

  // SSR отключён (см. Loader), поэтому localStorage доступен прямо здесь.
  const [stored, setStored] = useState(() => localStorage.getItem(KEY) || "");

  function save() {
    const v = makeValue();
    localStorage.setItem(KEY, v);
    setStored(v);
  }

  function clear() {
    localStorage.removeItem(KEY);
    setStored("");
  }

  return (
    <main className="mx-auto max-w-2xl space-y-4 p-6">
      <h1 className="text-xl font-semibold">Storage demo: server vs browser</h1>

      <div className="rounded-md border p-4">
        <p className="text-sm text-slate-600">typeof window (на сервере):</p>
        <p className="font-mono">{serverWindowType}</p>

        <p className="mt-3 text-sm text-slate-600">typeof window (в браузере):</p>
        <p className="font-mono">{clientWindowType}</p>
      </div>

      <div className="rounded-md border p-4">
        <p className="text-sm text-slate-600">typeof localStorage (на сервере):</p>
        <p className="font-mono">{serverLocalStorageType}</p>

        <p className="mt-3 text-sm text-slate-600">typeof localStorage (в браузере):</p>
        <p className="font-mono">{clientLocalStorageType}</p>
      </div>

      <div className="rounded-md border p-4">
        <p className="text-sm text-slate-600">localStorage[`demo:storage-window`]:</p>
        <p className="font-mono break-all">{stored ? stored : "(пусто)"}</p>

        <div className="mt-4 flex gap-2">
          <button
            className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white"
            onClick={save}
          >
            Save
          </button>
          <button className="rounded-md border px-3 py-2 text-sm" onClick={clear}>
            Clear
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Значение сохраняется в браузере: после обновления страницы оно остаётся.
        </p>
      </div>
    </main>
  );
}

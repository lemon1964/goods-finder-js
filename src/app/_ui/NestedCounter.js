// src/app/_ui/NestedCounter.js
"use client";

import { useState } from "react";

export default function NestedCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-lg border border-slate-200 bg-white/70 p-3">
      <p className="text-sm text-slate-700">
        Этот счётчик живёт внутри секционного layout. При переходах между
        <code className="mx-1 rounded bg-slate-100 px-1">/routes-demo/nested/*</code>
        он не сбрасывается.
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          +1
        </button>

        <button
          type="button"
          onClick={() => setCount(0)}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          Сброс
        </button>

        <span className="text-sm text-slate-700">
          Значение: <b>{count}</b>
        </span>
      </div>
    </div>
  );
}

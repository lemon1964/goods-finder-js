// src/app/_ui/TemplateCounter.js
"use client";

import { useState } from "react";

export default function TemplateCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-md border border-slate-700 bg-slate-900 p-4 text-slate-100">
      <p className="text-sm text-slate-300">
        Счётчик живёт внутри <code className="font-mono text-slate-200">template.js</code>.
        При переходе между страницами этой ветки он сбросится.
      </p>

      <div className="mt-3 flex items-center gap-3">
        <span className="text-sm">
          Count: <strong className="text-slate-100">{count}</strong>
        </span>

        <button
          type="button"
          className="rounded-md bg-slate-800 px-3 py-1 text-sm hover:bg-slate-700"
          onClick={() => setCount((c) => c + 1)}
        >
          +1
        </button>
      </div>
    </div>
  );
}

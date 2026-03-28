// src/app/(demos)/cache-lab/page.js
import Link from "next/link";

const MODES = [
  { mode: "force-cache", label: "force-cache" },
  { mode: "no-store", label: "no-store" },
  { mode: "revalidate", label: "revalidate=15", n: 15 },
];

function buildQuery(m) {
  const qs = new URLSearchParams({ mode: m.mode });
  if (m.mode === "revalidate") qs.set("n", String(m.n || 15));
  return `?${qs.toString()}`;
}

export default function CacheLabPage() {
  return (
    <div className="rounded-md border bg-white p-4 text-slate-800">
      <h1 className="text-xl font-semibold">Cache Lab</h1>

      <p className="mt-2 text-sm text-slate-600">
        Лаборатория для сравнения режимов Data Cache на списке и на детали.
      </p>

      <div className="mt-4 space-y-2">
        {MODES.map((m) => (
          <div key={m.label} className="flex flex-wrap gap-3">
            <Link
              href={`/cache-lab/goods${buildQuery(m)}`}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-50"
            >
              Список ({m.label})
            </Link>
            <Link
              href={`/cache-lab/goods/1${buildQuery(m)}`}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-50"
            >
              Деталь 1 ({m.label})
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

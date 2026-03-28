// src/app/(app)/goods/not-found.js
import Link from "next/link";

export default function NotFound() {
  const pageClass =
    "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6 space-y-6";

  return (
    <div className={pageClass}>
      <div className="rounded-xl border border-slate-800/70 bg-slate-900/50 p-5">
        <h2 className="text-xl font-semibold text-slate-100">Товар не найден</h2>

        <p className="mt-2 text-sm text-slate-300">
          Запрошенного товара нет в данных. Проверьте адрес или вернитесь к списку.
        </p>

        <div className="mt-4">
          <Link
            href="/goods"
            className="inline-flex w-fit items-center rounded-md border border-slate-700/70 bg-slate-900/40 px-3 py-1.5 text-sm text-slate-100
                       transition hover:bg-slate-900/60"
          >
            Вернуться к списку товаров
          </Link>
        </div>
      </div>
    </div>
  );
}

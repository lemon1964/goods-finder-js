// src/app/goods/error.js
"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GoodsError({ error, reset }) {
  // В dev удобно видеть ошибку в консоли
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="rounded-md border border-rose-200 bg-rose-50 p-4">
      <h2 className="text-lg font-semibold text-rose-800">
        Ошибка в разделе Goods
      </h2>

      <p className="mt-1 text-sm text-rose-700">
        Сбой произошёл внутри сегмента <code className="font-mono">/goods</code>.
        Остальные страницы приложения продолжают работать.
      </p>

      <div className="mt-3 rounded-md border border-rose-200 bg-white p-3">
        <p className="text-sm text-slate-700">
          <span className="font-semibold">Сообщение:</span>{" "}
          <code className="font-mono">{error?.message}</code>
        </p>

        {/* digest чаще полезен в проде (если доступен) */}
        {error?.digest ? (
          <p className="mt-1 text-xs text-slate-500">
            digest: <code className="font-mono">{error.digest}</code>
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-rose-700 px-3 py-1.5 text-white hover:bg-rose-800"
        >
          Повторить попытку
        </button>

        <Link
          href="/goods"
          className="rounded-md border border-rose-200 bg-white px-3 py-1.5 text-rose-800 hover:bg-rose-100"
        >
          Вернуться к списку
        </Link>
      </div>
    </div>
  );
}

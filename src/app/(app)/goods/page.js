// src/app/(app)/goods/page.js
import Link from "next/link";

import { getProducts } from "@/app/_data/goodsApi";
import GoodsSearchBar from "@/app/_ui/GoodsSearchBar";
import GoodsGridMotionClient from "@/app/_ui/GoodsGridMotionClient";
import GoodsToolbar from "@/app/_ui/GoodsToolbar";

export const metadata = {
  title: "Список товаров",
};

export default async function GoodsPage({ searchParams }) {
  const sp = await searchParams;
  const q = typeof sp?.q === "string" ? sp.q : "";

  const data = await getProducts({ q, limit: 12, skip: 0 });

  const isEmpty = !data?.products?.length;
  const hasFilter = !!String(q || "").trim();

  return (
    <div className="app-container app-stack">
      <div className="app-pagehead">
        <div className="app-stack-sm">
          <h1 className="app-h1">Товары</h1>
          <p className="app-subtitle">Поиск по витрине (данные dummyjson.com)</p>
        </div>

        <GoodsSearchBar initialQuery={q} />
      </div>

      <GoodsToolbar q={q} count={data.products.length} />

      {isEmpty ? (
        <div className="app-card app-card--danger app-section">
          <h2 className="text-base font-semibold text-slate-100">Ничего не найдено</h2>

          {hasFilter ? (
            <p className="mt-2 text-sm text-slate-200">
              По запросу <span className="font-mono text-slate-100">{q}</span> нет товаров.
              Попробуйте другой запрос или сбросьте фильтр.
            </p>
          ) : (
            <p className="mt-2 text-sm text-slate-200">Список пуст.</p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/goods" className="app-btn app-btn-primary">
              Открыть все товары
            </Link>

            {hasFilter && (
              <Link href="/goods" className="app-btn app-btn-ghost">
                Сбросить фильтр
              </Link>
            )}
          </div>
        </div>
      ) : (
        <GoodsGridMotionClient products={data.products} />
      )}
    </div>
  );
}
// src/app/products-demo/page.js
import Link from "next/link";

const API_URL = "https://dummyjson.com/products?limit=12&skip=0";

function getFirstString(value) {
  // searchParams может быть string | string[] | undefined
  if (Array.isArray(value)) return value[0] ?? "";
  return typeof value === "string" ? value : "";
}

async function getProducts(url) {
  try {
    const res = await fetch(url);

    // HTTP-ошибка: сервер ответил, но статус плохой
    if (!res.ok) {
      return {
        ok: false,
        error: {
          kind: "http",
          url,
          status: res.status,
          statusText: res.statusText || "",
        },
      };
    }

    const data = await res.json();

    const products = Array.isArray(data?.products) ? data.products : [];

    return {
      ok: true,
      products,
      meta: {
        total: typeof data?.total === "number" ? data.total : null,
        skip: typeof data?.skip === "number" ? data.skip : null,
        limit: typeof data?.limit === "number" ? data.limit : null,
      },
    };
  } catch (e) {
    // Сетевая ошибка: fetch не получил ответа
    return {
      ok: false,
      error: {
        kind: "network",
        url,
        message: e instanceof Error ? e.message : String(e),
      },
    };
  }
}

export default async function ProductsDemoPage({ searchParams }) {
  // В Next 15+ searchParams может приходить как Promise
  const sp = (await searchParams) ?? {};

  // Переключатель для демонстрации ошибки без правки кода
  const demoError = getFirstString(sp.demoError) === "1";

  const url = demoError ? "https://dummyjson.com/__wrong_path__" : API_URL;

  const result = await getProducts(url);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-500">
        Products Demo: обработка ошибок
      </h1>

      <div className="rounded-md border bg-white p-4 space-y-3">
        <p className="text-sm text-slate-600">
          <span className="font-semibold">URL запроса:</span>{" "}
          <a
            className="underline text-blue-600"
            href={url}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {url}
          </a>
        </p>

        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="/products-demo"
            className="rounded-md border px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            Нормальный запрос
          </Link>

          <Link
            href="/products-demo?demoError=1"
            className="rounded-md border px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          >
            Показать 404-ошибку
          </Link>
        </div>
      </div>

      {!result.ok ? (
        <div className="rounded-md border border-rose-200 bg-rose-50 p-4">
          <h2 className="text-base font-semibold text-rose-800">
            Ошибка загрузки данных
          </h2>

          {result.error.kind === "http" ? (
            <p className="mt-2 text-sm text-rose-800">
              Сервер ответил с ошибкой:{" "}
              <code className="font-mono">
                {result.error.status}
                {result.error.statusText ? ` ${result.error.statusText}` : ""}
              </code>
              .
            </p>
          ) : (
            <p className="mt-2 text-sm text-rose-800">
              Сетевая ошибка:{" "}
              <code className="font-mono">{result.error.message}</code>.
            </p>
          )}

          <p className="mt-2 text-sm text-rose-800">
            Проверьте URL, статус ответа и доступность API.
          </p>

          <div className="mt-3">
            <Link
              href="/products-demo"
              className="inline-block rounded-md border border-rose-300 bg-white px-3 py-1.5 text-sm text-rose-800 hover:bg-rose-100"
            >
              Повторить запрос
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-md border bg-white p-4 space-y-3">
          <h2 className="text-base font-semibold text-slate-500">
            Список товаров (минимальный рендер)
          </h2>

          <div className="grid gap-2 sm:grid-cols-3 text-sm">
            <div className="rounded-md border p-3">
              <div className="text-xs text-slate-500">total</div>
              <div className="font-mono text-slate-700">
                {result.meta.total ?? "(нет поля)"}
              </div>
            </div>

            <div className="rounded-md border p-3">
              <div className="text-xs text-slate-500">skip</div>
              <div className="font-mono text-slate-700">
                {result.meta.skip ?? "(нет поля)"}
              </div>
            </div>

            <div className="rounded-md border p-3">
              <div className="text-xs text-slate-500">limit</div>
              <div className="font-mono text-slate-700">
                {result.meta.limit ?? "(нет поля)"}
              </div>
            </div>
          </div>

          <ul className="grid gap-2 sm:grid-cols-2">
            {result.products.map((p) => (
              <li key={p.id} className="rounded-md border p-3">
                <div className="text-sm font-semibold text-slate-700">
                  {p.title}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  id: <code className="font-mono">{p.id}</code> • price:{" "}
                  <code className="font-mono">{p.price}</code>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-sm text-slate-600">
        Правило шага: сначала проверяется{" "}
        <code className="font-mono">response.ok</code>. При{" "}
        <code className="font-mono">ok === false</code> на странице показывается
        понятное сообщение со статусом, а UI продолжает работать.
      </p>
    </div>
  );
}

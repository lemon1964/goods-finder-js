// src/app/dummyjson-preview/page.js

const API_URL = "https://dummyjson.com/products?limit=3&skip=0";

async function getProductsPreview() {
  const res = await fetch(API_URL);

  // Ошибки запроса разберём в следующем шаге.
  // Сейчас цель — посмотреть форму ответа и поля.
  const data = await res.json();

  return {
    ok: res.ok,
    status: res.status,
    data,
  };
}

export default async function DummyJsonPreviewPage() {
  const { ok, status, data } = await getProductsPreview();

  // В ответе dummyjson.com ожидаются поля:
  // products (массив), total, skip, limit
  const products = Array.isArray(data?.products) ? data.products : [];
  const total = typeof data?.total === "number" ? data.total : null;
  const skip = typeof data?.skip === "number" ? data.skip : null;
  const limit = typeof data?.limit === "number" ? data.limit : null;

  const firstProduct = products[0] ?? null;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-500">
        DummyJSON: первый ответ API
      </h1>

      <div className="rounded-md border bg-white p-4 space-y-2">
        <p className="text-sm text-slate-600">
          <span className="font-semibold">Эндпоинт:</span>{" "}
          <a
            className="underline text-blue-600"
            href={API_URL}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {API_URL}
          </a>{" "}
          (смотрите также{" "}
          <a
            className="underline text-blue-600"
            href="https://dummyjson.com/docs/products"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Products API
          </a>
          )
        </p>

        <p className="text-sm text-slate-600">
          <span className="font-semibold">HTTP статус:</span>{" "}
          <code className="font-mono">{status}</code>{" "}
          <span className="ml-2 font-semibold">ok:</span>{" "}
          <code className="font-mono">{String(ok)}</code>
        </p>

        <div className="grid gap-2 sm:grid-cols-3 text-sm">
          <div className="rounded-md border p-3">
            <div className="text-xs text-slate-500">total</div>
            <div className="font-mono text-slate-700">
              {total ?? "(нет поля)"}
            </div>
          </div>

          <div className="rounded-md border p-3">
            <div className="text-xs text-slate-500">skip</div>
            <div className="font-mono text-slate-700">
              {skip ?? "(нет поля)"}
            </div>
          </div>

          <div className="rounded-md border p-3">
            <div className="text-xs text-slate-500">limit</div>
            <div className="font-mono text-slate-700">
              {limit ?? "(нет поля)"}
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600">
          <span className="font-semibold">products.length:</span>{" "}
          <code className="font-mono">{products.length}</code>
        </p>
      </div>

      <div className="rounded-md border bg-white p-4">
        <h2 className="text-base font-semibold text-slate-500">
          Список товаров из data.products
        </h2>

        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {products.map((p) => (
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

      <div className="rounded-md border bg-white p-4">
        <h2 className="text-base font-semibold text-slate-500">
          Пример одного товара (первый)
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Это удобно, чтобы быстро увидеть реальные поля товара: <code className="font-mono">id</code>,{" "}
          <code className="font-mono">title</code>, <code className="font-mono">price</code>,{" "}
          <code className="font-mono">description</code>, <code className="font-mono">thumbnail</code>,{" "}
          <code className="font-mono">images</code> и т.д.
        </p>

        <pre className="mt-3 overflow-auto rounded-md border bg-slate-900 p-3 text-xs text-slate-100">
          {JSON.stringify(firstProduct, null, 2)}
        </pre>
      </div>

      <p className="text-sm text-slate-600">
        Ключевая идея: API диктует форму данных. Дальше задача UI — аккуратно
        взять нужные поля (часто через деструктуризацию) и отрендерить список.
      </p>
    </div>
  );
}

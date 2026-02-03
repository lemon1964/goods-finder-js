// goods-finder/src/app/(app)/fetch-demo/page.js
export default async function FetchDemoPage() {
    const url = "https://dummyjson.com/products/1";
  
    // Этот console.log появится в терминале, а не в DevTools браузера
    console.log("[fetch-demo] server fetch:", url);
  
    const res = await fetch(url);
  
    // Пока без сложной обработки ошибок — она будет отдельным шагом
    const data = await res.json();
  
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold text-slate-500">Fetch Demo</h1>
  
        <p className="text-sm text-slate-600">
          Запрос выполняется в Server Component (на сервере), потому что файл{" "}
          <code className="font-mono">page.js</code> по умолчанию серверный.
        </p>
  
        <div className="rounded-md border bg-white p-4">
          <p className="text-sm text-slate-600">
            <span className="font-semibold">URL:</span>{" "}
            <code className="font-mono">{url}</code>
          </p>
  
          <p className="mt-2 text-sm text-slate-600">
            <span className="font-semibold">status:</span>{" "}
            <code className="font-mono">{res.status}</code>
          </p>
  
          <p className="mt-2 text-sm text-slate-600">
            <span className="font-semibold">title:</span>{" "}
            <code className="font-mono">{data?.title ?? "(нет поля title)"}</code>
          </p>
  
          <pre className="mt-3 overflow-auto rounded-md bg-slate-900 p-3 text-xs text-slate-100">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
  
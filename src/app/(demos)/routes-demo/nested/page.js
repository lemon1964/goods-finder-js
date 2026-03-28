// src/app/routes-demo/nested/page.js
export default function NestedHomePage() {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold text-slate-500">Nested (главная)</h1>

      <p className="text-sm text-slate-300">
        Эта страница живёт в{" "}
        <code className="font-mono">routes-demo/nested/page.js</code>.
      </p>

      <div className="rounded-md border border-slate-700 bg-slate-900 p-3">
        <p className="text-sm text-slate-200">
          Путь получился из структуры папок:{" "}
          <code className="font-mono text-slate-100">/routes-demo/nested</code>
        </p>
      </div>
    </div>
  );
}

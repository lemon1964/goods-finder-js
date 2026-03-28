// src/app/routes-demo/nested/second/page.js
export default function NestedSecondPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold text-slate-500">Nested (вторая)</h1>

      <p className="text-sm text-slate-300">
        Эта страница живёт в{" "}
        <code className="font-mono">routes-demo/nested/second/page.js</code>.
      </p>
    </div>
  );
}
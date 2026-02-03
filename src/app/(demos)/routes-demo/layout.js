// src/app/routes-demo/layout.js
import Link from "next/link";

export default function RoutesDemoLayout({ children }) {
  return (
    <section className="space-y-4">
      <header className="rounded-md border border-slate-700 bg-slate-900 p-4 text-slate-100">
        <h2 className="text-lg font-semibold">Routes Demo</h2>
        <p className="text-sm text-slate-300">
          Вложенный layout: общий для <code className="font-mono text-slate-200">/routes-demo</code> и вложенных страниц
        </p>

        <nav className="mt-3 flex flex-wrap gap-2 text-sm">
          <Link
            className="rounded-md bg-slate-800 px-2 py-1 text-slate-100 hover:bg-slate-700"
            href="/routes-demo"
          >
            Overview
          </Link>

          <Link
            className="rounded-md bg-slate-800 px-2 py-1 text-slate-100 hover:bg-slate-700"
            href="/routes-demo/segments"
          >
            Segments
          </Link>

          <Link
            className="rounded-md bg-slate-800 px-2 py-1 text-slate-100 hover:bg-slate-700"
            href="/routes-demo/nested"
          >
            Nested
          </Link>

          <Link
            className="rounded-md bg-slate-800 px-2 py-1 text-slate-100 hover:bg-slate-700"
            href="/routes-demo/template-demo"
          >
            Template demo
          </Link>
        </nav>
      </header>

      <div className="rounded-md border p-4">{children}</div>
    </section>
  );
}

// src/app/routes-demo/nested/layout.js
import Link from "next/link";
import NestedCounter from "@/app/_ui/NestedCounter";

export default function NestedLayout({ children }) {
  return (
    <section className="space-y-4">
      <header className="rounded-md border border-slate-700 bg-slate-900 p-4 text-slate-100">
        <h3 className="text-base font-semibold">
          Подсекция <code className="font-mono text-slate-200">/routes-demo/nested/*</code>
        </h3>

        <p className="mt-1 text-sm text-slate-300">
          Третий уровень layout: общий только для этой подсекции
        </p>

        <nav className="mt-3 flex flex-wrap gap-2 text-sm">
          <Link
            href="/routes-demo/nested"
            className="rounded-md bg-slate-800 px-2 py-1 text-slate-100 hover:bg-slate-700"
          >
            Nested (главная)
          </Link>

          <Link
            href="/routes-demo/nested/second"
            className="rounded-md bg-slate-800 px-2 py-1 text-slate-100 hover:bg-slate-700"
          >
            Nested (вторая)
          </Link>
        </nav>
      </header>

      <NestedCounter />

      <div className="rounded-md border p-4">{children}</div>
    </section>
  );
}


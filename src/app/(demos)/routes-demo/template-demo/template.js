// src/app/routes-demo/template-demo/template.js
import Link from "next/link";
import TemplateCounter from "@/app/_ui/TemplateCounter";

export default function TemplateDemoTemplate({ children }) {
  return (
    <section className="space-y-4">
      <header className="rounded-md border border-slate-700 bg-slate-900 p-4 text-slate-100">
        <h3 className="text-base font-semibold">
          Ветка{" "}
          <code className="font-mono text-slate-200">/routes-demo/template-demo/*</code>
        </h3>

        <p className="mt-1 text-sm text-slate-300">
          Здесь используется <code className="font-mono text-slate-200">template.js</code>:
          при переходе между страницами ветки компонент перемонтируется.
        </p>

        <nav className="mt-3 flex flex-wrap gap-2 text-sm">
          <Link
            href="/routes-demo/template-demo"
            className="rounded-md bg-slate-800 px-2 py-1 text-slate-100 hover:bg-slate-700"
          >
            Template (главная)
          </Link>

          <Link
            href="/routes-demo/template-demo/second"
            className="rounded-md bg-slate-800 px-2 py-1 text-slate-100 hover:bg-slate-700"
          >
            Template (вторая)
          </Link>
        </nav>
      </header>

      {/* Состояние этого счётчика будет сбрасываться при навигации внутри ветки */}
      <TemplateCounter />

      <div className="rounded-md border p-4">{children}</div>
    </section>
  );
}

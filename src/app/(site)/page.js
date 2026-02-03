// src/app/(site)/page.js
import Link from "next/link";
import MotionFadeIn from "@/components/motion/MotionFadeIn";

export default function HomePage() {
  return (
    <div className="app-container app-stack">
      <MotionFadeIn>
        <section className="rounded-xl bg-linear-to-b from-slate-950 to-slate-900 p-6 text-slate-100">
          <h1 className="text-2xl font-semibold tracking-tight">Goods Finder</h1>

          <p className="mt-2 text-sm text-slate-300">
            Учебная витрина товаров: поиск, избранное и история просмотров.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/goods" className="app-btn app-btn-primary shadow-sm hover:shadow-md">
              Открыть товары
            </Link>

            <Link
              href="/goods/favorites"
              className="app-btn app-btn-ghost border-white/20 text-slate-100 hover:bg-white/10"
            >
              Избранное
            </Link>

            <Link
              href="/goods/history"
              className="app-btn app-btn-ghost border-white/20 text-slate-100 hover:bg-white/10"
            >
              История
            </Link>
          </div>
        </section>
      </MotionFadeIn>

      <MotionFadeIn delay={0.06}>
        <section className="app-card app-stack-sm">
          <h2 className="app-h2">Возможности</h2>

          <ul className="app-grid app-grid-cards">
            <li className="app-card app-stack-sm">
              <div className="inline-flex w-fit rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-slate-100 ring-1 ring-white/15">
                Поиск
              </div>
              <div className="app-muted">Фильтр по запросу в списке товаров.</div>
            </li>

            <li className="app-card app-stack-sm">
              <div className="inline-flex w-fit rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-slate-100 ring-1 ring-white/15">
                Избранное
              </div>
              <div className="app-muted">Быстрый доступ к отмеченным товарам.</div>
            </li>

            <li className="app-card app-stack-sm">
              <div className="inline-flex w-fit rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-slate-100 ring-1 ring-white/15">
                История
              </div>
              <div className="app-muted">Возврат к последним просмотрам.</div>
            </li>
          </ul>
        </section>
      </MotionFadeIn>

      <MotionFadeIn delay={0.12}>
        <section className="app-card app-stack-sm">
          <div className="inline-flex w-fit rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-slate-100 ring-1 ring-white/15">
            Демо маршрутов
          </div>

          <p className="app-muted">
            Небольшой раздел для демонстрации структуры App Router (layout, сегменты, вложенность).
          </p>

          <div>
            <Link href="/routes-demo" className="app-btn app-btn-ghost w-fit">
              Открыть демо
            </Link>
          </div>
        </section>
      </MotionFadeIn>
    </div>
  );
}

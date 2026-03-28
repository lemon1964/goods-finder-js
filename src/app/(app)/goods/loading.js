// src/app/goods/loading.js
export default function Loading() {
    return (
      <div className="space-y-4">
        {/* Карточка-заглушка под заголовок/описание */}
        <div className="rounded-md border bg-white p-4">
          <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-100" />
        </div>
  
        {/* Заглушки под список карточек */}
        <ul className="grid gap-2 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="rounded-md border bg-white p-3">
              <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
              <div className="mt-2 h-3 w-24 animate-pulse rounded bg-slate-100" />
            </li>
          ))}
        </ul>
  
        <p className="text-sm text-slate-500">Загрузка…</p>
      </div>
    );
  }
  
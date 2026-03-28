// src/app/(app)/goods/[id]/loading.js
export default function Loading() {
    return (
      <div className="space-y-4">
        {/* Заглушка под заголовок и мета-информацию */}
        <div className="rounded-md border bg-white p-4">
          <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-100" />
        </div>
  
        {/* Заглушки под описание */}
        <div className="rounded-md border bg-white p-4">
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-100" />
          <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-slate-100" />
        </div>
  
        <p className="text-sm text-slate-500">Загрузка карточки…</p>
      </div>
    );
  }
  
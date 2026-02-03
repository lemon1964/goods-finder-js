// src/app/_ui/GoodsToolbar.js
export default function GoodsToolbar({ q, count }) {
    const query = String(q || "").trim();
  
    return (
      <div className="app-card app-card--soft app-section">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <div className="text-slate-200">
            Фильтр q:{" "}
            <span className="font-mono text-slate-100">
              {query ? query : "(пусто)"}
            </span>
          </div>
  
          <span className="text-slate-500">•</span>
  
          <div className="text-slate-200">
            Получено: <span className="font-semibold text-slate-100">{count}</span>
          </div>
        </div>
      </div>
    );
  }
  
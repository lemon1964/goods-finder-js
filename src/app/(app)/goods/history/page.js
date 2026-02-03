// src/app/(app)/goods/history/page.js
import Link from "next/link";
import HistoryListClientLoader from "./HistoryListClientLoader";

export default function GoodsHistoryPage() {
  return (
    <div className="app-container app-stack">
      <header className="app-toolbar">
        <div className="min-w-0">
          <h1 className="app-title">История</h1>
          <p className="app-muted">
            Последние просмотренные товары.
          </p>
        </div>

        <Link href="/goods" className="app-btn app-btn-ghost">
          К товарам
        </Link>
      </header>

      <HistoryListClientLoader />
    </div>
  );
}

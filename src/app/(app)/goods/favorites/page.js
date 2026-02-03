// src/app/(app)/goods/favorites/page.js
import Link from "next/link";
import FavoritesListLoader from "@/components/goods/FavoritesListLoader";

export default function GoodsFavoritesPage() {
  return (
    <div className="app-container app-stack">
      <header className="app-toolbar">
        <div className="min-w-0">
          <h1 className="app-title">Избранное</h1>
          <p className="app-muted">
            Товары, отмеченные на странице детали.
          </p>
        </div>

        <Link href="/goods" className="app-btn app-btn-ghost">
          К товарам
        </Link>
      </header>

      <FavoritesListLoader />
    </div>
  );
}

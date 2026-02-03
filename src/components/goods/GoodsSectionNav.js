// src/components/goods/GoodsSectionNav.js
import Link from "next/link";
import NavCountBadgeLoader from "@/components/goods/NavCountBadgeLoader";

const linkClass =
  "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50";

export default function GoodsSectionNav() {
  return (
    <div className="border-b bg-white">
      <div className="mx-auto max-w-4xl px-6 py-3">
        <nav className="flex flex-wrap items-center gap-2">
          <Link href="/goods" className={linkClass}>
            Товары
          </Link>

          <Link href="/goods/favorites" className={linkClass}>
            Избранное <NavCountBadgeLoader kind="favorites" />
          </Link>

          <Link href="/goods/history" className={linkClass}>
            История <NavCountBadgeLoader kind="history" />
          </Link>
        </nav>
      </div>
    </div>
  );
}

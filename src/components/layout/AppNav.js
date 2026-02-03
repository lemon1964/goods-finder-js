// src/components/layout/AppNav.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Главная" },
  { href: "/goods", label: "Товары" },
  { href: "/goods/favorites", label: "Избранное" },
  { href: "/goods/history", label: "История" },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";

  if (href === "/goods") {
    return (
      pathname === "/goods" ||
      (pathname.startsWith("/goods/") &&
        !pathname.startsWith("/goods/favorites") &&
        !pathname.startsWith("/goods/history"))
    );
  }

  return pathname === href || pathname.startsWith(href + "/");
}

export default function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-1">
      {NAV_ITEMS.map((it) => {
        const active = isActive(pathname, it.href);

        const base =
          "rounded-md px-3 py-2 text-sm font-semibold transition select-none";
        const inactive = "text-slate-200 hover:bg-white/10 hover:text-white";
        const activeCls =
          "bg-white/15 text-white ring-1 ring-white/15 hover:bg-white/20";

        return (
          <Link
            key={it.href}
            href={it.href}
            aria-current={active ? "page" : undefined}
            className={`${base} ${active ? activeCls : inactive}`}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}

// src/app/_ui/Header.js
import Link from "next/link";

// Простой общий header для всех страниц.
// Это Server Component по умолчанию — "use client" не нужен.
export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="brand">
          Goods Finder
        </Link>

        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/goods">Goods</Link>
          <Link href="/routes-demo">Routes Demo</Link>
        </nav>
      </div>
    </header>
  );
}

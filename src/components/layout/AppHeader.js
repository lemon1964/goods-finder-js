// src/components/layout/AppHeader.js
import Link from "next/link";
import AppNav from "./AppNav";
import AudioToggle from "./AudioToggle";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/80 text-slate-100 backdrop-blur shadow-sm shadow-black/30">
      <div className="app-container flex flex-wrap items-center justify-between gap-3 py-3">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-slate-100 hover:text-white"
        >
          Goods Finder
        </Link>

        <div className="flex items-center gap-2">
          <AudioToggle />
          <AppNav />
        </div>
        {/* <AudioToggle />
        <AppNav /> */}
      </div>
    </header>
  );
}

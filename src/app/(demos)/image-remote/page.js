// src/app/(demos)/image-remote/page.js
import Link from "next/link";

import { getProductById } from "@/app/_data/goodsApi";
import AppImageBox from "@/components/ui/AppImageBox";

export default async function ImageRemotePage() {
  const item = await getProductById(1);
  const src = typeof item?.thumbnail === "string" ? item.thumbnail : "";

  return (
    <div className="app-container app-stack">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-slate-100">Remote image</h1>

        <Link href="/goods/1" className="app-btn app-btn-ghost">
          Открыть товар
        </Link>
      </div>

      <div className="app-card app-card-lift p-4">
        <div className="text-sm font-semibold text-slate-200">LCP: priority</div>

        <p className="mt-2 text-sm text-slate-300">
          Картинка находится в первом экране, поэтому помечается как приоритетная.
        </p>

        <div className="mt-4">
          <AppImageBox
            src={src}
            alt={item?.title || "Product thumbnail"}
            boxClassName="aspect-[4/3]"
            sizes="(min-width: 1024px) 70vw, 100vw"
            priority // LCP-картинка: загрузка раньше остальных
          />
        </div>

        <div className="mt-3 text-xs text-slate-400">
          src: <code className="font-mono">{src || "—"}</code>
        </div>
      </div>
    </div>
  );
}

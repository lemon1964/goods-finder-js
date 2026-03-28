// src/app/(demos)/cache-lab/goods/page.js
import Link from "next/link";
import { headers } from "next/headers";

import { getProducts } from "@/app/_data/dummyjson";
import RenderStamp from "@/app/_ui/RenderStamp";

function normalizeProfile(sp) {
  const mode = sp?.mode || "force-cache";
  const n = Number(sp?.n);
  return { mode, n: Number.isFinite(n) ? n : 15 };
}

function buildQuery(profile) {
  const qs = new URLSearchParams({ mode: profile.mode });
  if (profile.mode === "revalidate") qs.set("n", String(profile.n));
  return `?${qs.toString()}`;
}

export default async function CacheLabGoodsPage({ searchParams }) {
  const sp = await searchParams;
  const profile = normalizeProfile(sp);

  const data = await getProducts({ q: "", limit: 12, skip: 0 }, profile);

  // Делает сегмент динамическим: Full Route Cache не используется
  headers();

  return (
    <div className="rounded-md border bg-white p-4 text-slate-800">
      <div className="flex flex-wrap items-center gap-2">
        <Link href="/cache-lab" className="text-sm underline">
          ← Cache Lab
        </Link>
        <span className="text-sm text-slate-400">•</span>
        <span className="text-sm text-slate-600">
          mode: <code className="font-mono">{profile.mode}</code>
          {profile.mode === "revalidate" ? (
            <>
              {" "}
              n: <code className="font-mono">{profile.n}</code>
            </>
          ) : null}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href={`/cache-lab/goods?mode=force-cache`}
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          force-cache
        </Link>
        <Link
          href={`/cache-lab/goods?mode=no-store`}
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          no-store
        </Link>
        <Link
          href={`/cache-lab/goods?mode=revalidate&n=15`}
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          revalidate=15
        </Link>
      </div>

      <div className="mt-3 space-y-1 text-sm text-slate-700">
        <div>
          data fetched: <code className="font-mono">{data.__fetchedAt}</code>
        </div>
        <div>
          revalidate:{" "}
          <code className="font-mono">{data.__revalidateSec === null ? "—" : `${data.__revalidateSec}s`}</code>{" "}
          • fresh until: <code className="font-mono">{data.__freshUntil || "—"}</code>
        </div>
        <RenderStamp label="/cache-lab/goods render" />
      </div>

      <ul className="mt-4 space-y-2">
        {data.products.map((p) => (
          <li key={p.id} className="flex items-center justify-between gap-3 rounded-md border p-3">
            <div className="min-w-0">
              <Link
                href={`/cache-lab/goods/${p.id}${buildQuery(profile)}`}
                className="block truncate text-sm font-semibold hover:underline"
              >
                {p.title}
              </Link>
              <div className="text-xs text-slate-500">id: {p.id}</div>
            </div>

            <Link
              href={`/cache-lab/goods/${p.id}${buildQuery(profile)}`}
              className="shrink-0 rounded-md border px-3 py-1.5 text-sm hover:bg-slate-50"
            >
              Карточка
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

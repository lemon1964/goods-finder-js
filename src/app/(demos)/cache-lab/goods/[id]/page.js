// src/app/(demos)/cache-lab/goods/[id]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

import { getProductById } from "@/app/_data/dummyjson";
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

export default async function CacheLabGoodDetailsPage({ params, searchParams }) {
  const p = await params;
  const sp = await searchParams;

  const profile = normalizeProfile(sp);
  const id = Number(p.id);

  if (!Number.isFinite(id)) notFound();

  const item = await getProductById(id, profile);

  // Делает сегмент динамическим: Full Route Cache не используется
  headers();

  return (
    <div className="rounded-md border bg-white p-4 text-slate-800">
      <div className="flex flex-wrap items-center gap-2">
        <Link href={`/cache-lab/goods${buildQuery(profile)}`} className="text-sm underline">
          ← К списку
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

      <h2 className="mt-3 text-xl font-semibold">{item.title}</h2>

      <div className="mt-3 space-y-1 text-sm text-slate-700">
        <div>
          data fetched: <code className="font-mono">{item.__fetchedAt}</code>
        </div>
        <div>
          revalidate:{" "}
          <code className="font-mono">{item.__revalidateSec === null ? "—" : `${item.__revalidateSec}s`}</code>{" "}
          • fresh until: <code className="font-mono">{item.__freshUntil || "—"}</code>
        </div>
        <RenderStamp label="/cache-lab/goods/[id] render" />
      </div>
    </div>
  );
}

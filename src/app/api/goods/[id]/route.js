// src/app/api/goods/[id]/route.js
import { getDummyJsonBaseUrl } from "@/app/_config/env";

// --- Нормализация
function toDetailsItem(p) {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    thumbnail: p.thumbnail,
    category: p.category,
    brand: p.brand,
    rating: p.rating,
  };
}

function badRequest(details) {
  return Response.json({ ok: false, error: "Bad Request", details }, { status: 400 });
}

function serverError(details) {
  return Response.json({ ok: false, error: "Server Error", details }, { status: 500 });
}

export async function GET(_request, { params }) {
  const API_BASE = getDummyJsonBaseUrl();
  // В Next 16.1.4 params может быть Promise
  const resolvedParams = await params;
  const idRaw = resolvedParams?.id;

  const idStr = String(idRaw ?? "");
  const idNum = Number(idStr);

  if (!Number.isInteger(idNum) || idNum <= 0) {
    return badRequest({ field: "id", message: 'Param "id" must be a positive integer' });
  }

  const upstream = `${API_BASE}/products/${idNum}`;

  try {
    const res = await fetch(upstream);

    if (res.status === 404) {
      return Response.json({ ok: false, error: "Not Found" }, { status: 404 });
    }

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return serverError({
        message: "Upstream API responded with error",
        upstreamStatus: res.status,
        upstreamStatusText: res.statusText,
        upstreamBodyPreview: text.slice(0, 200),
      });
    }

    const raw = await res.json();
    const item = toDetailsItem(raw);
    return Response.json({ ok: true, item }, { status: 200 });
  } catch (err) {
    return serverError({
      message: "Failed to load data from upstream API",
      name: err?.name || "Error",
      error: err?.message || String(err),
    });
  }
}

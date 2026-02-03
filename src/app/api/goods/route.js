// src/app/api/goods/route.js
import { getDummyJsonBaseUrl } from "@/app/_config/env";

// --- Нормализация (как в шаге 5.1.3) ---
function toListItem(p) {
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    thumbnail: p.thumbnail,
    category: p.category,
    brand: p.brand,
    rating: p.rating,
  };
}

function normalizeGoodsResponse(raw, { q, limit, skip }) {
  const products = Array.isArray(raw?.products) ? raw.products : [];

  return {
    items: products.map(toListItem),
    page: {
      total: Number(raw?.total ?? products.length),
      limit,
      skip,
    },
    query: { q },
  };
}

// --- Ответы об ошибках ---
function badRequest(details) {
  return Response.json(
    {
      ok: false,
      error: "Bad Request",
      details,
    },
    { status: 400 }
  );
}

function serverError(details) {
  return Response.json(
    {
      ok: false,
      error: "Server Error",
      details,
    },
    { status: 500 }
  );
}

// --- Парсинг числовых параметров ---
function parseIntParam(name, raw, { def, min, max }) {
  if (raw === null) return { ok: true, value: def };

  // Разрешены только целые числа в строковом виде
  if (!/^-?\d+$/.test(raw)) {
    return {
      ok: false,
      details: { field: name, message: `Parameter "${name}" must be an integer` },
    };
  }

  const value = Number(raw);

  if (!Number.isFinite(value)) {
    return {
      ok: false,
      details: { field: name, message: `Parameter "${name}" is not a valid number` },
    };
  }

  if (value < min || value > max) {
    return {
      ok: false,
      details: {
        field: name,
        message: `Parameter "${name}" must be in range ${min}..${max}`,
      },
    };
  }

  return { ok: true, value };
}

// GET /api/goods?q=phone&limit=12&skip=0
export async function GET(request) {
  const API_BASE = getDummyJsonBaseUrl();
  const url = new URL(request.url);

  const q = (url.searchParams.get("q") || "").trim();

  // limit: 1..100, skip: 0..10000
  const limitParsed = parseIntParam("limit", url.searchParams.get("limit"), {
    def: 12,
    min: 1,
    max: 100,
  });

  if (!limitParsed.ok) return badRequest(limitParsed.details);

  const skipParsed = parseIntParam("skip", url.searchParams.get("skip"), {
    def: 0,
    min: 0,
    max: 10000,
  });

  if (!skipParsed.ok) return badRequest(skipParsed.details);

  const limit = limitParsed.value;
  const skip = skipParsed.value;

  // URL внешнего API
  const upstream = q
    ? new URL(`${API_BASE}/products/search`)
    : new URL(`${API_BASE}/products`);

  upstream.searchParams.set("limit", String(limit));
  upstream.searchParams.set("skip", String(skip));
  if (q) upstream.searchParams.set("q", q);

  try {
    const res = await fetch(upstream.toString());

    // В этом уроке любые проблемы внешнего API считаются серверной ошибкой (500).
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

    const data = normalizeGoodsResponse(raw, { q, limit, skip });

    return Response.json({ ok: true, ...data }, { status: 200 });
  } catch (err) {
    // Ошибка сети, парсинга JSON или непредвиденное исключение
    return serverError({
      message: "Failed to load data from upstream API",
      name: err?.name || "Error",
      error: err?.message || String(err),
    });
  }
}

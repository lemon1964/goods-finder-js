// src/app/_data/goodsApi.js
import { headers } from "next/headers";

const DEFAULT_REVALIDATE_SECONDS = 60;

// Собирает origin текущего запроса (нужно для server-side fetch к /api/*)
async function getOrigin() {
  const h = await headers();
  const host = h.get("host");

  // На хостингах часто приходит x-forwarded-proto (https/http)
  const proto = h.get("x-forwarded-proto") || "http";

  // Фолбэк на локальную разработку (редко нужен, но полезен для понятной ошибки)
  if (!host) return "http://localhost:3000";

  return `${proto}://${host}`;
}

// Запрос к своему API + понятная ошибка со статусом
async function fetchFromApi(path, init = {}) {
    const origin = await getOrigin();
    const url = `${origin}${path}`;
    const res = await fetch(url, init);
  
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const err = new Error(`API error: ${res.status} ${res.statusText}. ${text}`);
      err.status = res.status;
      throw err;
    }
  
    return res.json();
  }

/**
 * Список товаров через собственный прокси:
 * GET /api/goods?limit=...&skip=...&q=...
 */
export async function getProducts({ q = "", limit = 12, skip = 0 } = {}) {
  const safeQ = String(q).trim();

  const qs = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  // q добавляется только если он реально есть
  if (safeQ) qs.set("q", safeQ);

  const data = await fetchFromApi(`/api/goods?${qs.toString()}`, {
    // Витрина по умолчанию обновляется “раз в минуту”
    next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
  });

  /**
   * В шагах 5.1.2–5.1.3 формат ответа могли нормализовать до { items, total, ... }.
   * UI Goods Finder ожидает { products, total, ... } — приводим к нужной форме.
   */
  if (Array.isArray(data.items)) {
    return {
      products: data.items,
      total: data.total ?? data.items.length,
      limit: data.limit ?? limit,
      skip: data.skip ?? skip,
    };
  }

  return data;
}

/**
 * Деталь товара через собственный прокси:
 * GET /api/goods/:id
 */
export async function getProductById(id) {
  const safeId = encodeURIComponent(String(id));

  const data = await fetchFromApi(`/api/goods/${safeId}`, {
    next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
  });

  // На случай, если Route Handler возвращает { item: {...} }
  return data.item ?? data;
}

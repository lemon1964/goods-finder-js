// src/app/_data/dummyjson.js
const API_BASE = "https://dummyjson.com";

const DEFAULT_REVALIDATE_SECONDS = 60;

// Запрос + понятная ошибка (без учебных маркеров)
async function fetchJson(url, fetchOptions = {}) {
  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`DummyJSON error: ${res.status} ${res.statusText}. ${text}`);
    err.status = res.status;
    throw err;
  }

  return res.json();
}

/**
 * Получить список товаров.
 * - без q: /products
 * - с q:   /products/search?q=...
 */
export async function getProducts({ q = "", limit = 12, skip = 0 } = {}) {
  const safeQ = String(q).trim();
  const qs = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  const url = safeQ
    ? `${API_BASE}/products/search?${qs.toString()}&q=${encodeURIComponent(safeQ)}`
    : `${API_BASE}/products?${qs.toString()}`;

  return fetchJson(url, { next: { revalidate: DEFAULT_REVALIDATE_SECONDS } });
}

/**
 * Получить один товар по id.
 * Endpoint: /products/{id}
 */
export async function getProductById(id) {
  const safeId = encodeURIComponent(String(id));
  const url = `${API_BASE}/products/${safeId}`;

  return fetchJson(url, { next: { revalidate: DEFAULT_REVALIDATE_SECONDS } });
}

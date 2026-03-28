// src/app/api/_stub/products/search/route.js
import { STUB_PRODUCTS } from "@/app/_data/stubProducts";

export async function GET(request) {
  const url = new URL(request.url);

  const q = (url.searchParams.get("q") || "").trim().toLowerCase();
  const limit = Number(url.searchParams.get("limit") || 12);
  const skip = Number(url.searchParams.get("skip") || 0);

  const filtered = q
    ? STUB_PRODUCTS.filter((p) => p.title.toLowerCase().includes(q))
    : STUB_PRODUCTS;

  const products = filtered.slice(skip, skip + limit);

  return Response.json(
    { products, total: filtered.length, skip, limit },
    { status: 200 }
  );
}

// src/app/api/_stub/products/route.js
import { STUB_PRODUCTS } from "@/app/_data/stubProducts";

export async function GET(request) {
  const url = new URL(request.url);

  // limit/skip поддерживаем минимально — этого достаточно для прокси
  const limit = Number(url.searchParams.get("limit") || 12);
  const skip = Number(url.searchParams.get("skip") || 0);

  const products = STUB_PRODUCTS.slice(skip, skip + limit);

  return Response.json(
    { products, total: STUB_PRODUCTS.length, skip, limit },
    { status: 200 }
  );
}

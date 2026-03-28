// src/app/api/_stub/products/[id]/route.js
import { STUB_PRODUCTS } from "@/app/_data/stubProducts";

export async function GET(_request, { params }) {
  const resolvedParams = await params; // на некоторых версиях Next params может быть Promise
  const id = Number(resolvedParams?.id);

  if (!Number.isInteger(id) || id <= 0) {
    return Response.json(
      { ok: false, error: 'Bad Request', details: { field: "id", message: 'Param "id" must be a positive integer' } },
      { status: 400 }
    );
  }

  const item = STUB_PRODUCTS.find((p) => p.id === id);

  if (!item) {
    return Response.json({ ok: false, error: "Not Found" }, { status: 404 });
  }

  // Важно: отдаём “сырой” объект товара, как делает внешний API.
  return Response.json(item, { status: 200 });
}

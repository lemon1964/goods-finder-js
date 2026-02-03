// src/app/(app)/goods/[id]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

import { getProductById } from "@/app/_data/goodsApi";
import GoodDetailsMotionClient from "@/components/goods/GoodDetailsMotionClient";

function getErrorStatus(err) {
  // fetchJson() добавляет err.status
  if (err && typeof err === "object" && "status" in err) {
    const value = err.status;
    return typeof value === "number" ? value : null;
  }
  return null;
}

function getErrorMessage(err) {
  if (err instanceof Error) return err.message;
  return "Unknown error";
}

function toShortText(value, maxLen = 160) {
  // Короткое описание для meta description
  const text = String(value || "").trim().replace(/\s+/g, " ");
  if (!text) return "";
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen - 1)}…`;
}

export async function generateMetadata({ params }) {
  // В актуальных версиях Next (15+) params приходит как Promise
  const p = await params;
  const id = Number(p.id);

  // Некорректный id — неправильный формат URL
  if (!Number.isFinite(id)) {
    return {
      title: "Некорректный id",
      description: "В адресе ожидалось число вида /goods/1.",
    };
  }

  try {
    const item = await getProductById(id);

    // generateMetadata выполняется на сервере, поэтому можно использовать данные товара
    const title = item?.title ? String(item.title) : `Товар #${id}`;
    const description = toShortText(item?.description || "Карточка товара в учебной витрине.");

    // thumbnail из dummyjson.com — внешний URL, его удобно использовать как og:image
    const imageUrl = typeof item?.thumbnail === "string" ? item.thumbnail : "/og-goods-finder.png";

    return {
      title,
      description,

      openGraph: {
        title,
        description,
        type: "website",
        url: `/goods/${id}`, // относительный URL, абсолютный соберётся через metadataBase (из root layout)
        images: [
          {
            url: imageUrl,
            alt: title,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (err) {
    const status = getErrorStatus(err);

    // 404 будет обработан notFound() уже в page(), а для метаданных даётся понятный fallback
    if (status === 404) {
      return {
        title: "Товар не найден",
        description: "Запрошенный товар отсутствует в витрине.",
      };
    }

    return {
      title: "Ошибка загрузки товара",
      description: "Не удалось получить данные для карточки товара.",
    };
  }
}

export default async function GoodDetailsPage({ params }) {
  // В актуальных версиях Next (15+) params приходит как Promise
  const p = await params;
  const id = Number(p.id);

  const pageClass = "mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6 space-y-6";

  // Некорректный id — неправильный формат URL
  if (!Number.isFinite(id)) {
    return (
      <div className={pageClass}>
        <div className="rounded-xl border border-slate-800/70 bg-slate-900/50 p-5 space-y-4">
          <h2 className="text-xl font-semibold text-slate-100">Некорректный id</h2>

          <p className="text-sm text-slate-300">
            В адресе ожидалось число: <code className="font-mono">/goods/1</code>,{" "}
            <code className="font-mono">/goods/25</code>.
          </p>

          <Link
            href="/goods"
            className="inline-flex w-fit items-center rounded-md border border-slate-700/70 bg-slate-900/40 px-3 py-1.5 text-sm text-slate-100 transition hover:bg-slate-900/60"
          >
            Вернуться к списку
          </Link>
        </div>
      </div>
    );
  }

  let item = null;
  let errorText = "";

  try {
    item = await getProductById(id);
    headers(); // делает сегмент динамическим, Full Route Cache не используется
  } catch (err) {
    const status = getErrorStatus(err);
    if (status === 404) notFound();
    errorText = getErrorMessage(err);
  }

  if (errorText) {
    return (
      <div className={pageClass}>
        <div className="rounded-xl border border-slate-800/70 bg-slate-900/50 p-5 space-y-4">
          <h2 className="text-xl font-semibold text-slate-100">Ошибка загрузки товара</h2>
          <p className="text-sm text-slate-300">{errorText}</p>

          <Link
            href="/goods"
            className="inline-flex w-fit items-center rounded-md border border-slate-700/70 bg-slate-900/40 px-3 py-1.5 text-sm text-slate-100 transition hover:bg-slate-900/60"
          >
            Вернуться к списку
          </Link>
        </div>
      </div>
    );
  }

  // Данные получены на сервере — анимация выполняется в клиентском компоненте
  return <GoodDetailsMotionClient item={item} />;
}

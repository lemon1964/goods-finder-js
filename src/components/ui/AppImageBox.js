// src/components/ui/AppImageBox.js
"use client";

import Image from "next/image";

export default function AppImageBox({
  src,
  alt,
  sizes,
  // для LCP-картинок (используется точечно)
  priority = false,
  // загрузка “сразу” для первого экрана (eager) или стандартная (lazy/undefined)
  loading,
  // оформление контейнера и изображения
  boxClassName = "",
  imgClassName = "",
}) {
  // Защита от “пустого src”: удобнее отлаживать витрину и демо-страницы.
  if (!src) {
    return (
      <div className="rounded-md border border-slate-800/60 bg-white p-3 text-sm text-slate-600">
        No image
      </div>
    );
  }

  return (
    <div
      className={[
        "relative w-full overflow-hidden rounded-md border border-slate-800/60 bg-white",
        boxClassName, // геометрия контейнера: aspect-* или h-*
      ].join(" ")}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes} // обязательная подсказка для режима fill
        priority={priority}
        // loading обычно не задаётся руками. В витрине используется только для главной картинки.
        loading={priority ? undefined : loading}
        className={["object-contain", imgClassName].join(" ")}
      />
    </div>
  );
}

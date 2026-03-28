// src/components/goods/GoodDetailsMotionClient.js
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import AppImageBox from "@/components/ui/AppImageBox";
import FavoriteButtonLoader from "@/components/goods/FavoriteButtonLoader";
import HistoryPing from "@/components/goods/HistoryPing";
import MotionFadeIn from "@/components/motion/MotionFadeIn";

function formatRating(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "—";
  return num.toFixed(1);
}

export default function GoodDetailsMotionClient({ item }) {
  // Общий “контейнер экрана” — лёгкий вход без театра
  const pageClass = "app-container app-stack";

  return (
    <motion.div
      className={pageClass}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {/* 1-й слой: шапка товара */}
      <MotionFadeIn delay={0.02}>
        <HistoryPing id={item.id} title={item.title} />

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold text-slate-100">{item.title}</h2>

            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-300">
              <span>
                <span className="font-semibold text-slate-100">price:</span> ${item.price}
              </span>

              <span className="text-slate-500">•</span>

              <span>
                <span className="font-semibold text-slate-100">rating:</span>{" "}
                {formatRating(item.rating)}
              </span>

              <span className="text-slate-500">•</span>

              <span>
                <span className="font-semibold text-slate-100">id:</span> {item.id}
              </span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {/* key заставляет кнопку “перемонтироваться” при переходе на другой id */}
            <FavoriteButtonLoader key={item.id} id={item.id} />

            <Link href="/goods" className="app-btn app-btn-ghost">
              К списку
            </Link>
          </div>
        </div>
      </MotionFadeIn>

      {/* 2-й слой: контент (фото + описание) */}
      <MotionFadeIn delay={0.08}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="app-card app-card-lift p-3">
            {/* Фото товара удобно смотреть на светлом фоне */}
            <AppImageBox
              src={item.thumbnail}
              alt={item.title}
              boxClassName="h-64"
              sizes="(min-width: 640px) 50vw, 100vw"
              priority // LCP-картинка: загрузка раньше остальных
              />
          </div>

          <div className="app-card app-card-lift p-4">
            <div className="space-y-2 text-sm text-slate-200">
              <div>
                <span className="font-semibold text-slate-100">brand:</span> {item.brand || "—"}
              </div>
              <div>
                <span className="font-semibold text-slate-100">category:</span>{" "}
                {item.category || "—"}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm font-semibold text-slate-300">description</div>
              <p className="mt-1 text-sm text-slate-200">{item.description}</p>
            </div>
          </div>
        </div>
      </MotionFadeIn>
    </motion.div>
  );
}

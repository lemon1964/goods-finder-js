// src/app/_ui/GoodsGridMotionClient.js
"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import AppImageBox from "@/components/ui/AppImageBox";

/*
  Паттерн списка:
  - родитель (ul) задаёт stagger для детей
  - каждый item (li) описывает вход/выход
  - layout на ul и li даёт мягкие перестановки без “скачков”
*/

const listVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.16, ease: "easeIn" },
  },
};

export default function GoodsGridMotionClient({ products }) {
  // Сетка карточек: 1 колонка → 2 (sm) → 3 (lg), поэтому sizes описывается “лесенкой”.
  const cardSizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

  return (
    <motion.ul
      className="app-list app-grid app-grid-cards"
      variants={listVariants}
      initial="hidden"
      animate="show"
      layout
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {products.map((p) => (
          <motion.li
            key={p.id} // ключ должен быть стабильным (id), иначе анимация “ломается”
            layout
            variants={itemVariants}
            exit="exit"
            className="app-card app-card-lift group flex flex-col gap-4"
          >
            {/* Миниатюра — кликабельна, ведёт на деталь */}
            <Link href={`/goods/${p.id}`} className="block">
              <AppImageBox
                src={p.thumbnail}
                alt={p.title}
                boxClassName="aspect-[4/3]"
                sizes={cardSizes}
              />
            </Link>

            <div className="app-row">
              <div className="min-w-0">
                <Link
                  href={`/goods/${p.id}`}
                  className="app-card-title truncate group-hover:underline"
                >
                  {p.title}
                </Link>

                <div className="app-meta">id: {p.id} • price: ${p.price}</div>
              </div>

              <Link href={`/goods/${p.id}`} className="app-btn app-btn-ghost shrink-0">
                Открыть
              </Link>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

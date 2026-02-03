// src/components/goods/HistoryPing.js
"use client";

import { useEffect } from "react";
import { addToHistory } from "@/app/_storage/goodsStorage";

export default function HistoryPing({ id, title }) {
  useEffect(() => {
    // Пишем историю “тихо”: без состояния и без UI
    addToHistory(id, title);
  }, [id, title]);

  return null;
}

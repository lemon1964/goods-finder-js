// src/components/providers/AppMotionProvider.js
"use client";

import { MotionConfig } from "framer-motion";

export default function AppMotionProvider({ children }) {
  return (
    /*
      MotionConfig:
      - reducedMotion="user" уважает системную настройку “уменьшить движение”
      - transition задаёт базовый темп (без “прыжков” и без лишней динамики)
    */
    <MotionConfig reducedMotion="user" transition={{ duration: 0.22, ease: "easeOut" }}>
      {children}
    </MotionConfig>
  );
}

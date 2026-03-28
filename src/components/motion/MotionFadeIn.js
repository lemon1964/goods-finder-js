// src/components/motion/MotionFadeIn.js
"use client";

import { motion } from "framer-motion";

export default function MotionFadeIn({ children, className = "", delay = 0 }) {
  return (
    /*
      Минимальная анимация появления:
      - opacity: 0 → 1
      - y: 10 → 0 (очень небольшой сдвиг)
      delay используется для мягкого “порядка” появления секций.
    */
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

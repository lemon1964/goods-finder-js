// src/app/_ui/ProgrammaticNavDemo.js
"use client";

import { useRouter } from "next/navigation";

export default function ProgrammaticNavDemo() {
  const router = useRouter();

  return (
    <div className="actions">
      <button
        type="button"
        className="btn"
        onClick={() => router.push("/goods")}
      >
        Перейти на /goods (push)
      </button>

      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => router.replace("/")}
      >
        Перейти на / (replace)
      </button>

      <button type="button" className="btn btn-ghost" onClick={() => router.back()}>
        Назад (back)
      </button>
    </div>
  );
}

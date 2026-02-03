// src/app/(demos)/env-public/EnvPublicClientLoader.js
"use client";

import dynamic from "next/dynamic";

// Рендер только в браузере (SSR отключён)
const EnvPublicClient = dynamic(() => import("./EnvPublicClient"), { ssr: false });

export default function EnvPublicClientLoader(props) {
  return <EnvPublicClient {...props} />;
}

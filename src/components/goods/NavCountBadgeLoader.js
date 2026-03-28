// src/components/goods/NavCountBadgeLoader.js
"use client";

import dynamic from "next/dynamic";

const NavCountBadge = dynamic(() => import("./NavCountBadge"), {
  ssr: false,
  loading: () => null,
});

export default function NavCountBadgeLoader(props) {
  return <NavCountBadge {...props} />;
}

// src/app/layout.js
import "./globals.css";
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
import AppMotionProvider from "@/components/providers/AppMotionProvider";

// Базовый адрес нужен, чтобы Next мог собрать абсолютные URL для og:image.
// В учебном проекте достаточно localhost.
const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

export const metadata = {
  metadataBase,

  title: {
    default: "Goods Finder",
    template: "%s — Goods Finder",
  },

  description: "Учебная витрина товаров (Next.js App Router)",

  openGraph: {
    title: "Goods Finder",
    description: "Учебная витрина товаров (Next.js App Router)",
    type: "website",
    images: [
      {
        url: "/og-goods-finder.png",
        width: 1200,
        height: 630,
        alt: "Goods Finder — витрина товаров",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <AppMotionProvider>
          <AppHeader />
          <main className="app-main">{children}</main>
          <AppFooter />
        </AppMotionProvider>
      </body>
    </html>
  );
}

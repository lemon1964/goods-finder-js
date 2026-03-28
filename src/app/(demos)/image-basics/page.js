// src/app/(demos)/image-basics/page.js
import Image from "next/image";
import Link from "next/link";

export default function ImageBasicsPage() {
  return (
    <div className="app-container app-stack">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-slate-100">Image basics</h1>

        <Link href="/goods" className="app-btn app-btn-ghost">
          К товарам
        </Link>
      </div>

      <div className="app-card app-card-lift p-4">
        <div className="text-sm font-semibold text-slate-200">Локальный файл из /public</div>

        <p className="mt-2 text-sm text-slate-300">
          src указывает путь от корня сайта. В URL папка <code className="font-mono">public</code> не
          пишется.
        </p>

        <div className="mt-4 overflow-hidden rounded-md border border-slate-800/60 bg-white">
          <Image
            src="/og-goods-finder.png"
            alt="Goods Finder — обложка для предпросмотра"
            width={1200} // “естественный” размер для OG (геометрия + пропорции)
            height={630}
            style={{ width: "100%", height: "auto" }} // масштабирование под контейнер
            className="object-contain"
          />
        </div>

        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-300">
          <li>
            <code className="font-mono">width/height</code> задают пропорции и резервируют место в
            верстке.
          </li>
          <li>
            <code className="font-mono">style</code> делает картинку “резиновой” по ширине блока.
          </li>
          <li>
            <code className="font-mono">alt</code> описывает смысл изображения.
          </li>
        </ul>
      </div>
    </div>
  );
}

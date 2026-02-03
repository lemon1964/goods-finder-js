// src/app/routes-demo/segments/page.js
export default function SegmentsPage() {
    return (
      <div className="space-y-2">
        <h3 className="text-base font-semibold">Segments</h3>
        <p className="text-sm opacity-80">
          Это вложенная страница внутри /routes-demo. Вложенный layout остаётся тем
          же, меняется только содержимое.
        </p>
        <p className="text-xs opacity-60">
          Контрольная точка: путь{" "}
          <span className="font-mono">/routes-demo/segments</span> работает.
        </p>
      </div>
    );
  }
  
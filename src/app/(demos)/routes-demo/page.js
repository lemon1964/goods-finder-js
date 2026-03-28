// src/app/routes-demo/page.js
export default function RoutesDemoPage() {
    return (
      <div className="space-y-2">
        <h3 className="text-base font-semibold">Overview</h3>
        <p className="text-sm opacity-80">
          Эта страница показывает, что вложенный layout остаётся на месте, а
          меняется только содержимое внутри него.
        </p>
        <p className="text-xs opacity-60">
          Контрольная точка: путь <span className="font-mono">/routes-demo</span> работает.
        </p>
      </div>
    );
  }
  
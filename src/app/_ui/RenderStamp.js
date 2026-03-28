// src/app/_ui/RenderStamp.js
export default function RenderStamp({ label = "renderedAt" }) {
    // Значение вычисляется на сервере во время рендера
    const renderedAt = new Date().toISOString();
  
    return (
      <p className="text-xs text-slate-500">
        {label}: <code className="font-mono">{renderedAt}</code>
      </p>
    );
  }
  
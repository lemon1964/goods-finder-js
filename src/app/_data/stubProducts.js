// src/app/_data/stubProducts.js
function svgDataUrl(text, w = 600, h = 400) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
        <rect width="100%" height="100%" fill="#0f172a"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
              font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              font-size="28" fill="#e2e8f0">
          ${text}
        </text>
      </svg>
    `.trim();
  
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

export const STUB_PRODUCTS = [
    {
      id: 1,
      title: "Stub Phone Mini",
      description: "Локальный товар-заглушка для отладки env.",
      category: "smartphones",
      price: 199,
      rating: 4.6,
      stock: 12,
      thumbnail: svgDataUrl("Stub Phone"),
      images: [svgDataUrl("Stub Phone #1"), svgDataUrl("Stub Phone #2")],
    },
    {
      id: 2,
      title: "Stub Laptop Air",
      description: "Второй товар-заглушка. Нужен для списка и поиска.",
      category: "laptops",
      price: 999,
      rating: 4.2,
      stock: 5,
      thumbnail: svgDataUrl("Stub Laptop"),
      images: [svgDataUrl("Stub Laptop #1"), svgDataUrl("Stub Laptop #2")],
    },
    {
      id: 3,
      title: "Stub Coffee Beans",
      description: "Третий товар-заглушка для проверки пагинации.",
      category: "groceries",
      price: 15,
      rating: 4.9,
      stock: 50,
      thumbnail: svgDataUrl("Stub Coffee"),
      images: [svgDataUrl("Stub Coffee #1"), svgDataUrl("Stub Coffee #2")],
    },
  ];
  
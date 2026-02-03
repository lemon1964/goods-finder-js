// sandbox/js-basics.js

// Мини-набор "товаров" (похоже на то, что возвращает API)
const products = [
    { id: 1, title: "Phone Alpha", price: 499, category: "phones", stock: 12 },
    { id: 2, title: "Phone Beta", price: 699, category: "phones", stock: 0 },
    { id: 3, title: "Laptop Pro", price: 1299, category: "laptops", stock: 3 },
    { id: 4, title: "Headphones X", price: 199, category: "audio", stock: 25 },
    { id: 5, title: "Mouse Mini", price: 39, category: "accessories", stock: 50 },
  ];
  
  // Поиск по названию: возвращает новый массив (исходный не меняется)
  function searchByTitle(items, query) {
    const q = query.trim().toLowerCase();
  
    // Частая ошибка новичка: забыть вернуть boolean в filter.
    return items.filter((item) => item.title.toLowerCase().includes(q));
  }
  
  // Только товары "в наличии"
  function onlyInStock(items) {
    return items.filter((item) => item.stock > 0);
  }
  
  // Подготовка данных "как для UI": короткие поля + форматирование
  function toCardView(items) {
    return items.map((item) => {
      // Деструктуризация: быстро берём нужные поля из объекта
      const { id, title, price, category, stock } = item;
  
      // Возвращается новый объект (удобно для отображения)
      return {
        id,
        title,
        subtitle: `${category} • ${stock} in stock`,
        priceLabel: `$${price}`,
      };
    });
  }
  
  // Пример деструктуризации прямо в параметрах функции
  function printCards(cards) {
    cards.forEach(({ id, title, subtitle, priceLabel }) => {
      console.log(`#${id} | ${title} | ${subtitle} | ${priceLabel}`);
    });
  }
  
  // --- Запуск сценария ---
  
  const query = "phone";
  
  // 1) нашли по строке
  const found = searchByTitle(products, query);
  
  // 2) оставили только то, что есть в наличии
  const available = onlyInStock(found);
  
  // 3) подготовили под отображение
  const cards = toCardView(available);
  
  // 4) вывели результат
  console.log(`Query: "${query}"`);
  console.log(`Found: ${found.length}, in stock: ${available.length}`);
  printCards(cards);
  
  // Дополнение: аккуратное копирование объекта (без мутаций)
  const first = products[0];
  const updated = { ...first, stock: first.stock - 1 };
  
  console.log("Original stock:", first.stock);
  console.log("Updated stock:", updated.stock);
  
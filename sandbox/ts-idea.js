// sandbox/ts-idea.js
// @ts-check

/**
 * "Контракт" товара: id, title, price
 * @typedef {{ id: number, title: string, price: number }} Product
 */

/**
 * Форматирует строку цены.
 * @param {Product} product
 * @returns {string}
 */
function formatPrice(product) {
    // toFixed существует у числа, но не у строки
    return `${product.title}: ${product.price.toFixed(2)}`;
  }
  
  const ok = { id: 1, title: "Phone", price: 999 };
  console.log(formatPrice(ok));
  
  // Ниже — типовые ошибки, которые удобно ловить заранее:
  const wrongTypes = { id: "1", title: "Phone", price: "999" }; // типы не совпадают
//   console.log(formatPrice(wrongTypes));
  
  const wrongShape = { id: 2, name: "Phone", price: 999 }; // нет поля title
//   console.log(formatPrice(wrongShape));
  
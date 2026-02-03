// sandbox/fetch-check.js

// Базовая схема: fetch → проверка статуса → чтение тела → разбор JSON
// В Node 18+ fetch доступен без библиотек.

function short(text, maxLen = 140) {
    const s = String(text ?? "");
    return s.length <= maxLen ? s : s.slice(0, maxLen) + "…";
  }
  
  async function fetchText(url, { timeoutMs = 8000 } = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
  
    try {
      const res = await fetch(url, { signal: controller.signal });
      const contentType = res.headers.get("content-type") || "";
  
      // Важно: тело можно прочитать только один раз.
      const bodyText = await res.text();
  
      return {
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
        contentType,
        bodyText,
      };
    } finally {
      clearTimeout(timer);
    }
  }
  
  async function fetchJson(url, options) {
    const result = await fetchText(url, options);
  
    if (!result.ok) {
      // Частая ошибка новичка: делать res.json() даже при 404/500, не глядя на статус.
      throw new Error(
        `HTTP ${result.status} ${result.statusText} | ${url} | body: ${short(result.bodyText)}`
      );
    }
  
    // Частая ошибка новичка: ожидать JSON, а получить HTML (например, с example.com).
    // В этом случае JSON.parse упадёт, и это нормальный сигнал "формат не тот".
    try {
      return JSON.parse(result.bodyText);
    } catch (err) {
      throw new Error(
        `Invalid JSON | ${url} | content-type: ${result.contentType} | body: ${short(result.bodyText)}`
      );
    }
  }
  
  async function runCase(title, fn) {
    console.log("\n---", title, "---");
    try {
      const data = await fn();
      console.log("OK:", data);
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  }
  
  async function main() {
    // 1) Нормальный JSON (похоже на то, что будет использоваться в проекте)
    await runCase("GOOD: dummyjson products (JSON)", async () => {
      const data = await fetchJson("https://dummyjson.com/products?limit=2");
      // Проверка формы данных: полезно смотреть, что именно пришло.
      return {
        hasProducts: Array.isArray(data.products),
        firstTitle: data.products?.[0]?.title,
        total: data.total,
      };
    });
  
    // 2) 404/500: сервер ответил, но статус плохой
    await runCase("BAD: wrong endpoint (HTTP error)", async () => {
      // endpoint заведомо неверный — нужен пример чтения статуса и тела ошибки
      const data = await fetchJson("https://dummyjson.com/this-endpoint-does-not-exist");
      return data;
    });
  
    // 3) Формат не JSON: ответ пришёл, но это HTML
    await runCase("BAD: HTML instead of JSON (format error)", async () => {
      const data = await fetchJson("https://example.com");
      return data;
    });
  
    // 4) Типовая ошибка обработки данных: ожидался массив, пришло не то
    await runCase("BAD: data shape mismatch (logic error)", async () => {
      const data = await fetchJson("https://dummyjson.com/products?limit=2");
  
      // Симуляция ошибки: берётся не то поле
      // (например, перепутали products и product, или ответ другой структуры)
      const list = data.product; // <- здесь будет undefined
  
      // Эта строка покажет классическую ошибку "Cannot read properties of undefined"
      return list.map((x) => x.title);
    });
  }
  
  main();
  
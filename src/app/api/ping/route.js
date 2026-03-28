// src/app/api/ping/route.js

// GET /api/ping
// Используется для быстрой проверки, что Route Handlers работают.
export async function GET(request) {
    const url = new URL(request.url);
  
    return Response.json({
      ok: true,
      method: "GET",
      path: url.pathname,
      at: new Date().toISOString(),
    });
  }
  
  // POST /api/ping
  // Принимает JSON и возвращает его обратно (echo).
  export async function POST(request) {
    let body = null;
  
    try {
      body = await request.json();
    } catch (e) {
      // Тело запроса не JSON или отсутствует
      body = null;
    }
  
    return Response.json({
      ok: true,
      method: "POST",
      at: new Date().toISOString(),
      received: body,
    });
  }
  
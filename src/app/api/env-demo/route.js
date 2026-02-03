// src/app/api/env-demo/route.js
export async function GET() {
    const secret = process.env.ENV_DEMO_SECRET;
  
    return Response.json(
      {
        ok: true,
        // Полное значение не возвращается: это учебная демонстрация серверной зоны
        hasSecret: Boolean(secret),
        secretPreview: secret ? `${secret.slice(0, 3)}...` : null,
      },
      { status: 200 }
    );
  }
  
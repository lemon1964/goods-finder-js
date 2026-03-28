// src/app/api/env-life/route.js

// Эта дата вычисляется один раз при загрузке модуля.
// Если перезапустить сервер — изменится.
const moduleLoadedAt = new Date().toISOString();

export async function GET() {
  const serverValue = process.env.ENV_LIFECYCLE_DEMO || "(missing)";

  return Response.json(
    {
      ok: true,
      moduleLoadedAt,
      // Серверная env-переменная (для эксперимента)
      ENV_LIFECYCLE_DEMO: serverValue,
      // Секреты сюда не возвращаем. Здесь только безопасная диагностика.
    },
    { status: 200 }
  );
}

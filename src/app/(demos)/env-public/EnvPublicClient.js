// src/app/(demos)/env-public/EnvPublicClient.js
"use client";

export default function EnvPublicClient({ hasSecretOnServer }) {
  const publicValue = process.env.NEXT_PUBLIC_ENV_DEMO_PUBLIC;

  // Серверную переменную в браузере прочитать нельзя — здесь будет undefined
  const secretValueInBrowser = process.env.ENV_DEMO_SECRET;

  return (
    <main className="mx-auto max-w-2xl space-y-4 p-6">
      <h1 className="text-xl font-semibold">Env demo: NEXT_PUBLIC_</h1>

      <div className="rounded-md border p-4">
        <p className="text-sm text-slate-600">NEXT_PUBLIC_ENV_DEMO_PUBLIC:</p>
        <p className="font-mono">{String(publicValue)}</p>
      </div>

      <div className="rounded-md border p-4">
        <p className="text-sm text-slate-600">ENV_DEMO_SECRET (на сервере):</p>
        <p className="font-mono">{hasSecretOnServer ? "есть (скрыто)" : "нет"}</p>
      </div>

      <div className="rounded-md border p-4">
        <p className="text-sm text-slate-600">ENV_DEMO_SECRET (в браузере):</p>
        <p className="font-mono">{String(secretValueInBrowser)}</p>
      </div>
    </main>
  );
}

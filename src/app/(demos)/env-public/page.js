// src/app/(demos)/env-public/page.js
import EnvPublicClientLoader from "./EnvPublicClientLoader";

export default function EnvPublicDemoPage() {
  // Серверная зона: секрет доступен здесь
  const hasSecretOnServer = Boolean(process.env.ENV_DEMO_SECRET);

  // В клиент уходит только факт наличия (а не значение)
  return <EnvPublicClientLoader hasSecretOnServer={hasSecretOnServer} />;
}

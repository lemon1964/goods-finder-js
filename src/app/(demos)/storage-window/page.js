// src/app/(demos)/storage-window/page.js
import StorageWindowClientLoader from "./StorageWindowClientLoader";

export default function StorageWindowDemoPage() {
  // На сервере window/localStorage отсутствуют.
  // typeof ... безопасен: не вызывает ReferenceError.
  const serverWindowType = typeof window; // "undefined"
  const serverLocalStorageType = typeof localStorage; // "undefined"

  return (
    <StorageWindowClientLoader
      serverWindowType={serverWindowType}
      serverLocalStorageType={serverLocalStorageType}
    />
  );
}

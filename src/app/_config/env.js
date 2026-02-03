// src/app/_config/env.js
export function requireEnv(name) {
    const value = process.env[name];
  
    // process.env возвращает строки или undefined
    if (!value) {
      throw new Error(
        `Missing env "${name}". Add it to .env.local and restart the dev server.`
      );
    }
  
    return value;
  }
  
  export function getDummyJsonBaseUrl() {
    return requireEnv("DUMMYJSON_API_BASE_URL");
  }
  
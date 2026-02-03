// src/app/_storage/goodsStorage.js

// Единые ключи (используются во всех компонентах)
export const FAVORITES_IDS_KEY = "goods-finder:favorites";
export const HISTORY_KEY = "goods-finder:history";

// Единое событие: срабатывает после любой записи в localStorage, связанной с Goods Finder
export const GOODS_STORAGE_EVENT = "goods-finder:storage";

// Ограничение истории (последние N просмотров)
export const HISTORY_LIMIT = 20;

function emitGoodsStorageEvent() {
  // На сервере window нет — просто выходим
  if (typeof window === "undefined") return;

  // Своё событие — чтобы обновляться в этой же вкладке (storage-событие так не умеет)
  window.dispatchEvent(new Event(GOODS_STORAGE_EVENT));
}

function normalizePositiveInt(value) {
  const n = Number(value);
  if (!Number.isInteger(n)) return null;
  if (n <= 0) return null;
  return n;
}

function normalizeTitle(value) {
  if (typeof value !== "string") return null;
  const s = value.trim();
  return s.length ? s : null;
}

// ===== Favorites =====

export function readFavoriteIds() {
  try {
    const raw = localStorage.getItem(FAVORITES_IDS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((x) => normalizePositiveInt(x))
      .filter((x) => x !== null);
  } catch {
    return [];
  }
}

export function writeFavoriteIds(ids) {
  try {
    // Защита: оставляем только положительные целые и убираем дубли
    const safe = Array.from(
      new Set(ids.map((x) => normalizePositiveInt(x)).filter((x) => x !== null))
    );

    localStorage.setItem(FAVORITES_IDS_KEY, JSON.stringify(safe));
    emitGoodsStorageEvent();
  } catch {
    // ignore
  }
}

export function isFavoriteId(id) {
  const safeId = normalizePositiveInt(id);
  if (!safeId) return false;

  const ids = readFavoriteIds();
  return ids.includes(safeId);
}

export function toggleFavoriteId(id) {
  const safeId = normalizePositiveInt(id);
  if (!safeId) return false;

  const ids = readFavoriteIds();
  const isFav = ids.includes(safeId);

  // Новый элемент кладётся в начало списка
  const nextIds = isFav ? ids.filter((x) => x !== safeId) : [safeId, ...ids];

  writeFavoriteIds(nextIds);
  return !isFav;
}

export function clearFavorites() {
  writeFavoriteIds([]);
}

// ===== History =====

function readHistoryRaw() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeHistoryRaw(list) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
    emitGoodsStorageEvent();
  } catch {
    // ignore
  }
}

export function addToHistory(id, title) {
  const safeId = normalizePositiveInt(id);
  if (!safeId) return;

  const safeTitle = normalizeTitle(title);
  const now = new Date().toISOString();

  const current = readHistoryRaw();

  // Удаляем дубликаты по id и добавляем запись в начало
  const filtered = current.filter((x) => {
    if (!x || typeof x !== "object") return true;
    return Number(x.id) !== safeId;
  });

  const next = [{ id: safeId, title: safeTitle, at: now }, ...filtered].slice(0, HISTORY_LIMIT);
  writeHistoryRaw(next);
}

export function readHistoryEntries() {
  const current = readHistoryRaw();

  // Возвращаем уже «безопасный» формат для UI
  return current
    .map((x) => {
      if (!x || typeof x !== "object") return null;

      const id = normalizePositiveInt(x.id);
      if (!id) return null;

      const at = typeof x.at === "string" ? x.at : null;
      const title = normalizeTitle(x.title);

      return { id, at, title };
    })
    .filter(Boolean);
}

export function clearHistory() {
  writeHistoryRaw([]);
}

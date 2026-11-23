import { useSyncExternalStore } from "react";

const FAV_KEY = "mdd:favorites";
const VIP_KEY = "mdd:vip";
const NAME_KEY = "mdd:name";
const SHARES_KEY = "mdd:shares";

type Listener = () => void;
const listeners = new Set<Listener>();
const cache = new Map<string, string | null>();

function read(key: string): string | null {
  if (typeof window === "undefined") return null;
  if (!cache.has(key)) {
    try {
      cache.set(key, window.localStorage.getItem(key));
    } catch {
      cache.set(key, null);
    }
  }
  return cache.get(key) ?? null;
}

function write(key: string, value: string | null) {
  cache.set(key, value);
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: keep in memory */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: Listener) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key) cache.delete(e.key);
    l();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

function useKey(key: string): string | null {
  return useSyncExternalStore(subscribe, () => read(key), () => null);
}

// Favorites -----------------------------------------------------------------
const EMPTY: string[] = [];
let favRaw: string | null = null;
let favParsed: string[] = EMPTY;
function parseFavs(raw: string | null): string[] {
  if (raw === favRaw) return favParsed;
  favRaw = raw;
  try {
    const v = raw ? JSON.parse(raw) : [];
    favParsed = Array.isArray(v) ? v.filter((x) => typeof x === "string") : EMPTY;
  } catch {
    favParsed = EMPTY;
  }
  return favParsed;
}

export function getFavorites(): string[] {
  return parseFavs(read(FAV_KEY));
}

/** Adds or removes a message; newest favorites first. Returns true when now saved. */
export function toggleFavorite(id: string): boolean {
  const current = getFavorites();
  const saved = current.includes(id);
  const next = saved ? current.filter((x) => x !== id) : [id, ...current];
  write(FAV_KEY, JSON.stringify(next));
  return !saved;
}

export function useFavorites(): string[] {
  return parseFavs(useKey(FAV_KEY));
}

// VIP -------------------------------------------------------------------------
export function setVip(on: boolean) {
  write(VIP_KEY, on ? "1" : null);
}
export function useVip(): boolean {
  return useKey(VIP_KEY) === "1";
}

// Name ------------------------------------------------------------------------
export function setName(name: string) {
  const v = name.trim().slice(0, 30);
  write(NAME_KEY, v ? v : null);
}
export function useName(): string {
  return useKey(NAME_KEY) ?? "";
}

// Share counts ------------------------------------------------------------------
function readShares(): Record<string, number> {
  try {
    const v = JSON.parse(read(SHARES_KEY) ?? "{}");
    return v && typeof v === "object" ? v : {};
  } catch {
    return {};
  }
}
export function recordShare(id: string) {
  const s = readShares();
  s[id] = (s[id] ?? 0) + 1;
  write(SHARES_KEY, JSON.stringify(s));
}
export function useShareCount(id: string, base: number): number {
  useKey(SHARES_KEY);
  return base + (readShares()[id] ?? 0);
}

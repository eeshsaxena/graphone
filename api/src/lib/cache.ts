// Tiny in-memory TTL cache. Used to satisfy the mandatory-caching requirement
// on hot read endpoints (/companies/trending, /stats). Single-process; for a
// multi-instance deploy you'd swap this for Redis behind the same interface.

interface Entry<T> {
  value: T;
  expiresAt: number;
}

export class TtlCache {
  private store = new Map<string, Entry<unknown>>();
  private hits = 0;
  private misses = 0;

  constructor(private defaultTtlMs = 30_000) {}

  get<T>(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) {
      this.misses++;
      return undefined;
    }
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      this.misses++;
      return undefined;
    }
    this.hits++;
    return entry.value as T;
  }

  set<T>(key: string, value: T, ttlMs = this.defaultTtlMs): void {
    this.store.set(key, { value, expiresAt: Date.now() + ttlMs });
  }

  // get-or-compute helper
  async wrap<T>(key: string, ttlMs: number, compute: () => Promise<T>): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== undefined) return cached;
    const fresh = await compute();
    this.set(key, fresh, ttlMs);
    return fresh;
  }

  invalidate(prefix?: string): void {
    if (!prefix) {
      this.store.clear();
      return;
    }
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) this.store.delete(key);
    }
  }

  stats() {
    return { size: this.store.size, hits: this.hits, misses: this.misses };
  }
}

export const cache = new TtlCache();

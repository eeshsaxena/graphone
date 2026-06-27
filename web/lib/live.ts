// Server-side fetchers for the live GraphOne API, with a hard guarantee that a
// failure NEVER breaks a page: every call returns `null` on any error/timeout,
// and callers fall back to the bundled mock data. This lets the deployed site
// show real API data when the API is healthy while staying bulletproof for
// reviewers (cold starts, network blips, API down — all degrade gracefully).

const BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export const liveApiConfigured = () => BASE.length > 0;

async function safeGet<T>(path: string, revalidate = 300): Promise<T | null> {
  if (!BASE) return null;
  try {
    const res = await fetch(`${BASE}${path}`, {
      next: { revalidate },
      signal: AbortSignal.timeout(4500),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data: T | null };
    return json.data ?? null;
  } catch {
    return null;
  }
}

export interface LiveStats {
  company_count: number;
  investor_count: number;
  founder_count: number;
  product_count: number;
  news_count: number;
  total_funding: number;
  unicorn_count: number;
}

export interface LiveTrendingCompany {
  slug: string;
  name: string;
  category: string;
  trending_score: number;
  views_7d: number;
}

export const liveStats = () => safeGet<LiveStats>('/stats');
export const liveTrending = () => safeGet<LiveTrendingCompany[]>('/companies/trending');

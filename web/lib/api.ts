// Typed client for the live GraphOne API.
//
// The deployed demo intentionally renders from the local typed mock data in
// lib/data.ts — it keeps the public site fast, reliable and free of any
// backend/cold-start dependency (exactly what the brief asks for). This client
// exists so the UI can be flipped to live data with a single env var, and the
// response shapes line up 1:1 with the API's `{ data, meta, error }` envelope.
//
// Enable live data by setting in the Vercel project (or .env.local):
//   NEXT_PUBLIC_API_URL=https://api-nine-wine-13.vercel.app
// then call these helpers from a Server Component instead of importing lib/data.

const BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export const isLiveApiEnabled = () => BASE.length > 0;

interface Envelope<T> {
  data: T | null;
  meta: Record<string, unknown> | null;
  error: { code: string; message: string } | null;
}

async function get<T>(path: string, init?: RequestInit): Promise<Envelope<T>> {
  if (!BASE) throw new Error('NEXT_PUBLIC_API_URL is not set');
  const res = await fetch(`${BASE}${path}`, {
    // revalidate hourly when used with Next's fetch cache
    next: { revalidate: 3600 },
    ...init,
  });
  return (await res.json()) as Envelope<T>;
}

export interface ApiCompany {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  logo_url: string;
  stage: string;
  funding_total: number;
  valuation: number;
  is_unicorn: boolean;
  growth_score: number;
  trending_score: number;
}

export const api = {
  trendingCompanies: () => get<ApiCompany[]>('/companies/trending'),
  companies: (q = '') => get<ApiCompany[]>(`/companies${q}`),
  company: (slug: string) => get<ApiCompany>(`/companies/${slug}`),
  companyGraph: (slug: string) => get(`/companies/${slug}/graph`),
  investors: (q = '') => get(`/investors${q}`),
  investor: (slug: string) => get(`/investors/${slug}`),
  coInvestors: (slug: string) => get(`/investors/${slug}/co-investors`),
  products: (q = '') => get(`/products${q}`),
  news: (q = '') => get(`/news${q}`),
  newsTrending: () => get('/news/trending'),
  search: (term: string) => get(`/search?q=${encodeURIComponent(term)}`),
  stats: () => get('/stats'),
  feed: () => get('/feed'),
};

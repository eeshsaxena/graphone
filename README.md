# GraphOne — The Intelligence Layer for the AI Economy

A full-stack build for the GraphOne 3-day engineering trial. One graph connecting
AI **companies, founders, investors, products, funding rounds and news** — a
"Bloomberg for AI startups."

This repo is a monorepo with two independently deployable apps:

| App | Stack | What it is |
|-----|-------|-----------|
| [`web/`](./web) | Next.js 14 (App Router) · TypeScript (strict) · Tailwind · Recharts · Framer Motion | Pixel-perfect frontend — Companies home, Company detail, Investor profile, Investors listing, AI Products + News/Funding/Jobs |
| [`api/`](./api) | Node · Express · TypeScript · Supabase/Postgres · Zod | Production-grade REST API — 23 endpoints, caching, rate limiting, auth, a trending-score engine and a background re-rank cron |

> **Scope note (per the trial Slack):** full-stack = both tracks. Frontend
> requires "any 2–3 screens"; this build ships **5 reference screens** plus 3
> supporting pages. The backend implements the full spec including the updated
> schema (`growth_score`, `data_confidence_score`, `last_scraped_at`,
> `avg_check_size`, `fund_number`, `Tag`, `CompanyRelationship`) and the new
> endpoints (`/companies/:slug/graph`, `/investors/:slug/co-investors`,
> `/feed`, `POST /companies/:slug/claim`).

---

## Quick start

Two terminals, zero external services required (the API runs on an in-memory
seed by default).

```bash
# 1) API  →  http://localhost:4000
cd api
npm install
cp .env.example .env
npm run dev

# 2) Web  →  http://localhost:3000
cd web
npm install
npm run dev
```

The web app ships its own typed mock data, so it runs and deploys standalone
(no login, no backend dependency) — exactly what the brief requires for the
public demo. The API is a fully independent, deployable service.

---

## Repo layout

```
graphone/
├── api/        Express + TypeScript REST API  (see api/README.md)
│   ├── src/
│   │   ├── routes/        one router per domain
│   │   ├── db/            DataStore (query engine) + memory/Postgres drivers
│   │   ├── lib/           trending score, cache, pagination, validation, envelope
│   │   ├── middleware/    auth (X-API-Key), rate limit, error shaper
│   │   ├── jobs/          background trending re-rank cron
│   │   └── data/seed.ts   55 real companies, 24 investors, 120 news, ...
│   ├── db/migration.sql   Postgres schema (deploy to Supabase)
│   └── openapi.yaml        full API spec
└── web/        Next.js 14 frontend  (see web/README.md)
    ├── app/                routes (App Router)
    ├── components/         Navbar, CommandSearch, Donut, EcosystemGraph, ...
    └── lib/                typed mock data + formatters
```

---

## The Trending Score (open-ended challenge)

> *Defined and implemented in [`api/src/lib/trending.ts`](./api/src/lib/trending.ts);
> served as a computed field on `GET /companies/trending` and every company list.*

A company's momentum **right now** is a weighted blend of five independent,
individually-normalised (0–1) signals:

| Signal | Weight | Why |
|--------|:------:|-----|
| **View velocity** | 35% | Week-over-week growth in profile views — the purest "attention is rising" signal. Rewards *change*, not just volume. |
| **Growth score** | 25% | Structural momentum (headcount/hiring growth) already tracked on the company. Real traction, not buzz. |
| **Funding recency** | 20% | A recent round is a strong public momentum event. Exponential decay, **half-life 180 days**; bigger rounds get a small boost. |
| **News buzz** | 12% | Count of news mentions in the trailing 30 days. |
| **Product upvotes** | 8% | Community love for the company's products in the last 30 days — a leading indicator for early-stage companies. |

**Design choices & reasoning**

- **Momentum, not size.** We deliberately do *not* reward raw funding total or
  headcount. A $40B incumbent and a seed startup compete on the same axis —
  which is what makes a "trending" board interesting. (In the seed data, fast
  movers like Anthropic, Cursor and Lovable correctly out-rank larger but
  steadier companies.)
- **Diminishing returns.** Each raw signal is squashed with
  `1 − e^(−x/scale)` so a runaway value (e.g. a viral spike) can't dominate the
  whole score.
- **Recency-weighted.** Funding and news both decay over time so the board
  reflects *now*, not last year.
- Output is scaled to **0–100** with a one-decimal resolution; the per-signal
  breakdown is available for debugging via the same module.

A **background cron** (`api/src/jobs/rerankTrending.ts`) re-ranks the leaderboard
on an interval (default 5 min), refreshes the cache and logs the new top 5 —
so the ranking is observably maintained out-of-band.

---

## Deploying

### API → Supabase + Render/Railway

1. Create a Supabase project. In the SQL editor, run [`api/db/migration.sql`](./api/db/migration.sql).
2. Set `api/.env`:
   ```
   DB_DRIVER=postgres
   DATABASE_URL=postgresql://postgres:[PW]@db.[REF].supabase.co:5432/postgres
   API_KEY=<your-secret>
   ```
3. Seed it: `npm run db:seed` (inserts the full dataset into Postgres).
4. Deploy `api/` to Render or Railway (build `npm run build`, start `npm start`).
   Set the same env vars in the dashboard.

### Web → Vercel

1. Import `web/` as a Vercel project (framework auto-detected as Next.js).
2. Deploy. No env vars required — it's self-contained and public (no auth wall).
3. (Optional) point it at the live API by adding a fetch layer; the UI data
   contract already mirrors the API entities.

---

## What I'd build next with 2 more days

1. **Wire the web app to the live API** behind a typed client + React Query, with
   ISR so detail pages stay fresh while loading instantly. The entity shapes
   already match, so this is mostly a fetch layer + skeletons.
2. **A real graph store for the ecosystem view.** Move `CompanyRelationship`
   into a proper adjacency model (or pgvector + a graph table) and make
   `/companies/:slug/graph` multi-hop with path queries ("how is OpenAI
   connected to Sequoia?").
3. **A scraping/enrichment pipeline** feeding `last_scraped_at` and
   `data_confidence_score`: a scheduled job that pulls funding/news, an
   LLM-based normaliser for messy fields, and confidence scoring per source —
   turning the static seed into a living dataset.
4. **Auth + saved lists + alerts:** API keys per user, "follow company/investor,"
   and a digest job that emails when a watched entity raises, ships or trends.
5. **Test depth + observability:** contract tests against the OpenAPI spec,
   trending-score property tests, and request tracing/metrics on the API.
6. **Frontend polish:** finish the remaining reference screens (Funding
   dashboard parity, News detail), virtualized lists, and an end-to-end visual
   regression suite.

---

## Tech & evaluation mapping

- **Frontend:** Next.js 14 App Router, TypeScript strict, Tailwind only (no UI
  kit), Recharts (donuts), Framer Motion (hero/graph/search), Lucide icons,
  Inter font, dark mode, responsive, `/` command-palette search.
- **Backend:** Express + TS, `{ data, meta, error }` envelope everywhere, Zod
  validation with URL checks, `X-API-Key` on writes, 100 req/min/IP rate limit,
  in-memory TTL cache on `/companies/trending` + `/stats` + more, cursor
  pagination, OpenAPI spec, 55+/24+/120 seed rows of **real** AI companies.

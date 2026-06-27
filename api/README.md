# GraphOne API

Production-grade REST API for the GraphOne intelligence graph. Express +
TypeScript, Supabase/Postgres (with a zero-setup in-memory driver for instant
local runs), Zod validation, caching, rate limiting and a trending-score engine.

## Run locally

```bash
npm install
cp .env.example .env      # DB_DRIVER=memory by default — no DB needed
npm run dev               # http://localhost:4000
curl http://localhost:4000/stats
```

## Environment (`.env`)

| Var | Default | Notes |
|-----|---------|-------|
| `PORT` | `4000` | |
| `DB_DRIVER` | `memory` | `memory` (seeded in-process) or `postgres` |
| `DATABASE_URL` | — | required when `DB_DRIVER=postgres` (Supabase URI) |
| `API_KEY` | `graphone-dev-key` | required in `X-API-Key` for writes |
| `RATE_LIMIT_MAX` | `100` | requests per `RATE_LIMIT_WINDOW_MS` per IP |
| `TRENDING_RERANK_INTERVAL_MS` | `300000` | background re-rank cron interval |
| `CORS_ORIGIN` | `*` | comma-separated origins or `*` |

## Using Postgres / Supabase

```bash
# 1. run the schema in the Supabase SQL editor:
#    api/db/migration.sql
# 2. point .env at it and seed:
DB_DRIVER=postgres DATABASE_URL=... npm run db:seed
# 3. run against it:
npm run dev
```

The data-access layer is one shared `DataStore` query engine. The **memory**
driver seeds it from `src/data/seed.ts`; the **postgres** driver hydrates it
from SQL on boot and writes through on mutations. This keeps the trending
logic, filters and joins identical across both drivers — the dataset is small
enough that in-process querying is fast, and it makes the API instantly runnable
for reviewers while still using Supabase as the system of record in production.

## Response contract

Every response is `{ data, meta, error }`. Exactly one of `data`/`error` is set.

```jsonc
// 200
{ "data": [ ... ], "meta": { "total": 55, "next_cursor": "..." }, "error": null }
// 404
{ "data": null, "meta": null, "error": { "code": "NOT_FOUND", "message": "..." } }
```

## Endpoints (23)

```
GET  /health
GET  /stats                              (cached 60s)
GET  /companies            ?category&stage&country&unicorn&sort&q&limit&cursor
GET  /companies/trending                 (cached 30s, Trending Score)
GET  /companies/fastest-growing          (cached 30s)
POST /companies                          [X-API-Key] Zod + URL validation
GET  /companies/:slug
GET  /companies/:slug/funding
GET  /companies/:slug/products
GET  /companies/:slug/graph              1-hop ecosystem graph
POST /companies/:slug/claim              [X-API-Key]
GET  /investors           ?type&stage_focus&sector
GET  /investors/most-active              (cached 30s, last 90d)
GET  /investors/:slug                    + portfolio breakdown
GET  /investors/:slug/investments
GET  /investors/:slug/co-investors       syndication partners
GET  /products            ?category&sort
GET  /products/:slug
GET  /news                ?tag
GET  /news/trending                      (cached 30s)
GET  /search?q=                          companies, investors, founders, products
GET  /feed                               ranked: news + funding + new companies
GET  /founders/:slug
```

Full spec: [`openapi.yaml`](./openapi.yaml). Import [`postman_collection.json`](./postman_collection.json)
into Postman to exercise every endpoint.

## Examples

```bash
curl localhost:4000/companies/trending
curl "localhost:4000/companies?category=AI%20Coding&sort=funded"
curl localhost:4000/companies/openai/graph
curl localhost:4000/investors/sequoia-capital/co-investors

# write (needs the key)
curl -X POST localhost:4000/companies \
  -H "Content-Type: application/json" -H "X-API-Key: graphone-dev-key" \
  -d '{"name":"Mercor","description":"AI hiring","category":"AI Agents","website":"https://mercor.com","founded_year":2023,"hq_city":"San Francisco","hq_country":"USA"}'
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | hot-reload dev server |
| `npm run build` / `npm start` | compile to `dist/` and run |
| `npm run db:migrate` | apply `db/migration.sql` to `DATABASE_URL` |
| `npm run db:seed` | seed Postgres from `src/data/seed.ts` |
| `npm run typecheck` | `tsc --noEmit` |

See the root [README](../README.md) for the Trending Score formula and the
"what I'd build next" section.

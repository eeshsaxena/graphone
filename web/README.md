# GraphOne Web

Pixel-perfect frontend for GraphOne. Next.js 14 (App Router), TypeScript strict,
Tailwind only (no component library), Recharts, Framer Motion, Lucide, Inter.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production
npm run typecheck            # tsc --noEmit
```

## Screens

| Route | Reference | Highlights |
|-------|-----------|-----------|
| `/` | Screen 1 — AI Companies home | hero + animated visual, trending/fastest-growing/emerging rails, categories, unicorns, frontier labs, open-source, collections, newsletter |
| `/companies/[slug]` | Screen 2 — Company detail (OpenAI) | timeline, funding table, ownership donut, investors, founders, products, acquisitions/investments, competitor landscape, **AI ecosystem graph**, news, jobs, patents, similar |
| `/investors` | Screen 3 — Investors discovery | trending investors, collections, browse by type, most active, capital-graph band |
| `/investors/[slug]` | Screen 4 — Investor profile (Sequoia) | stats strip, thesis, **portfolio-concentration donut**, recent investments, velocity, capital flow, stage evolution, winners, follow-on, market influence, exit intelligence, co-investors |
| `/products` | Screen 5 — AI Products | collection of the week, category tabs, popular now, product list with upvotes/comments, sidebar |
| `/news`, `/funding`, `/jobs` | supporting | on-brand list/dashboard pages so the nav is complete |

## Bonus features

- **`/` command-palette search** (cross-entity, keyboard shortcut) — `components/CommandSearch.tsx`
- **Dark mode** toggle, persisted to `localStorage` — `components/ThemeProvider.tsx`
- **Animated hero** + animated ecosystem graph (Framer Motion)
- **Responsive** across mobile / tablet / desktop
- **Recharts** donuts for ownership & portfolio concentration

## Data

The UI uses hardcoded, typed mock data in [`lib/data.ts`](./lib/data.ts) and
[`lib/detail.ts`](./lib/detail.ts) (real AI companies/investors), matching the
GraphOne entity model. This keeps the deployed site **standalone and public**
(no login, no backend dependency) per the brief. The shapes mirror the API, so
swapping in a live fetch layer is a drop-in change.

## Notes

- Logos/avatars render through `components/SmartImage.tsx`, a drop-in for
  `next/image` that falls back to a branded **initials tile** if a remote image
  fails (host down, rate-limited, unknown domain) — so the UI never shows an
  empty/broken placeholder. Sources: `unavatar.io` (logos) and `i.pravatar.cc`
  (people).
- Brand tokens (accent red/pink, surfaces, shadows) live in `tailwind.config.ts`
  and `app/globals.css`.

## Deploy → Vercel

Import the `web/` directory as a Vercel project — Next.js is auto-detected, no
env vars required. Output is fully static/SSG (see `npm run build`).

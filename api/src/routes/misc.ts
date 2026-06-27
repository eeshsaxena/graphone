import { Router } from 'express';
import { db } from '../db';
import { asyncHandler } from '../lib/async';
import { cache } from '../lib/cache';
import { parsePageParams } from '../lib/pagination';
import { BadRequest, NotFound, ok } from '../lib/response';

// Cross-cutting endpoints: search, stats, feed, founders.
const router = Router();

// GET /search?q= — cross-entity search
router.get(
  '/search',
  asyncHandler(async (req, res) => {
    const q = (req.query.q as string | undefined)?.trim();
    if (!q) throw BadRequest('Query parameter "q" is required');
    const results = db.store.search(q);
    const total =
      results.companies.length + results.investors.length + results.founders.length + results.products.length;
    return ok(res, results, { query: q, total });
  }),
);

// GET /stats — platform aggregate stats (CACHED)
router.get(
  '/stats',
  asyncHandler(async (_req, res) => {
    const data = await cache.wrap('stats', 60_000, async () => db.store.stats());
    return ok(res, data, { cached: true, ttl_seconds: 60 });
  }),
);

// GET /feed — ranked activity feed mixing news, funding and new companies
router.get(
  '/feed',
  asyncHandler(async (req, res) => {
    const page = parsePageParams(req.query as Record<string, unknown>);
    const result = db.store.feed(page);
    return ok(res, result.items, result.meta);
  }),
);

// GET /founders/:slug — founder profile with linked company
router.get(
  '/founders/:slug',
  asyncHandler(async (req, res) => {
    const founder = db.store.getFounderBySlug(req.params.slug);
    if (!founder) throw NotFound(`Founder '${req.params.slug}' not found`);
    return ok(res, founder);
  }),
);

export default router;

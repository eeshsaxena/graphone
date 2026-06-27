import { Router } from 'express';
import { db } from '../db';
import { asyncHandler } from '../lib/async';
import { cache } from '../lib/cache';
import { parsePageParams } from '../lib/pagination';
import { ok } from '../lib/response';

const router = Router();

// GET /news — paginated news feed with tag filter
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const page = parsePageParams(req.query as Record<string, unknown>);
    const result = db.store.listNews({ tag: req.query.tag as string | undefined }, page);
    return ok(res, result.items, result.meta);
  }),
);

// GET /news/trending — most read in the last 24h (CACHED)
router.get(
  '/trending',
  asyncHandler(async (_req, res) => {
    const data = await cache.wrap('news:trending', 30_000, async () => db.store.trendingNews(10));
    return ok(res, data, { cached: true, ttl_seconds: 30 });
  }),
);

export default router;

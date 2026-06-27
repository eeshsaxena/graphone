import { Router } from 'express';
import { db } from '../db';
import { asyncHandler } from '../lib/async';
import { cache } from '../lib/cache';
import { paginate, parsePageParams } from '../lib/pagination';
import { NotFound, ok } from '../lib/response';

const router = Router();

// GET /investors — list with filters: type, stage_focus, sector
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const page = parsePageParams(req.query as Record<string, unknown>);
    const result = db.store.listInvestors(
      {
        type: req.query.type as string | undefined,
        stage_focus: req.query.stage_focus as string | undefined,
        sector: req.query.sector as string | undefined,
      },
      page,
    );
    return ok(res, result.items, result.meta);
  }),
);

// GET /investors/most-active — ranked by deal count (last 90 days) (CACHED)
router.get(
  '/most-active',
  asyncHandler(async (_req, res) => {
    const data = await cache.wrap('investors:most-active', 30_000, async () => db.store.mostActiveInvestors(10));
    return ok(res, data, { cached: true, ttl_seconds: 30 });
  }),
);

// GET /investors/:slug — full profile + portfolio breakdown
router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const investor = db.store.getInvestorBySlug(req.params.slug);
    if (!investor) throw NotFound(`Investor '${req.params.slug}' not found`);
    const breakdown = db.store.portfolioBreakdown(investor.id);
    const recent = db.store.investorInvestments(investor.id).slice(0, 8);
    return ok(res, { ...investor, portfolio_breakdown: breakdown, recent_investments: recent });
  }),
);

// GET /investors/:slug/investments — paginated investment history
router.get(
  '/:slug/investments',
  asyncHandler(async (req, res) => {
    const investor = db.store.getInvestorBySlug(req.params.slug);
    if (!investor) throw NotFound(`Investor '${req.params.slug}' not found`);
    const page = parsePageParams(req.query as Record<string, unknown>);
    const all = db.store.investorInvestments(investor.id);
    const result = paginate(all, page);
    return ok(res, result.items, result.meta);
  }),
);

// GET /investors/:slug/co-investors — syndication partners
router.get(
  '/:slug/co-investors',
  asyncHandler(async (req, res) => {
    const result = db.store.coInvestors(req.params.slug);
    if (!result) throw NotFound(`Investor '${req.params.slug}' not found`);
    return ok(res, result.co_investors, { investor: result.investor.name });
  }),
);

export default router;

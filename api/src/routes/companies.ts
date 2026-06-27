import { Router } from 'express';
import { db } from '../db';
import { asyncHandler } from '../lib/async';
import { cache } from '../lib/cache';
import { parsePageParams } from '../lib/pagination';
import { NotFound, ok } from '../lib/response';
import { requireApiKey } from '../middleware/auth';
import { claimCompanySchema, createCompanySchema } from '../lib/validation';

const router = Router();

// GET /companies — list with filters + sort
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const page = parsePageParams(req.query as Record<string, unknown>);
    const result = db.store.listCompanies(
      {
        category: req.query.category as string | undefined,
        stage: req.query.stage as string | undefined,
        country: req.query.country as string | undefined,
        unicorn: req.query.unicorn === undefined ? undefined : req.query.unicorn === 'true',
        sort: (req.query.sort as 'trending' | 'funded' | 'new') ?? 'trending',
        q: req.query.q as string | undefined,
      },
      page,
    );
    return ok(res, result.items, result.meta);
  }),
);

// GET /companies/trending — top 10 by trending score (CACHED, 30s)
router.get(
  '/trending',
  asyncHandler(async (_req, res) => {
    const data = await cache.wrap('companies:trending', 30_000, async () => db.store.trendingCompanies(10));
    return ok(res, data, { cached: true, ttl_seconds: 30 });
  }),
);

// GET /companies/fastest-growing — top by growth score (CACHED)
router.get(
  '/fastest-growing',
  asyncHandler(async (_req, res) => {
    const data = await cache.wrap('companies:growing', 30_000, async () => db.store.fastestGrowing(10));
    return ok(res, data, { cached: true, ttl_seconds: 30 });
  }),
);

// POST /companies — create (requires X-API-Key, Zod + URL validation)
router.post(
  '/',
  requireApiKey,
  asyncHandler(async (req, res) => {
    const input = createCompanySchema.parse(req.body);
    const company = await db.createCompany(input);
    cache.invalidate('companies:');
    return ok(res, company, null, 201);
  }),
);

// GET /companies/:slug — full profile
router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const company = db.store.getCompanyBySlug(req.params.slug);
    if (!company) throw NotFound(`Company '${req.params.slug}' not found`);
    const founders = db.store.companyFounders(company.id);
    const products = db.store.companyProducts(req.params.slug) ?? [];
    const similar = db.store.similarCompanies(req.params.slug);
    return ok(res, { ...company, founders, products, similar });
  }),
);

// GET /companies/:slug/funding — funding rounds timeline
router.get(
  '/:slug/funding',
  asyncHandler(async (req, res) => {
    const funding = db.store.companyFunding(req.params.slug);
    if (!funding) throw NotFound(`Company '${req.params.slug}' not found`);
    return ok(res, funding.rounds);
  }),
);

// GET /companies/:slug/products — company products
router.get(
  '/:slug/products',
  asyncHandler(async (req, res) => {
    const products = db.store.companyProducts(req.params.slug);
    if (products === null) throw NotFound(`Company '${req.params.slug}' not found`);
    return ok(res, products);
  }),
);

// GET /companies/:slug/graph — 1-hop ecosystem graph
router.get(
  '/:slug/graph',
  asyncHandler(async (req, res) => {
    const graph = db.store.companyGraph(req.params.slug);
    if (!graph) throw NotFound(`Company '${req.params.slug}' not found`);
    return ok(res, graph);
  }),
);

// POST /companies/:slug/claim — claim a company profile (requires X-API-Key)
router.post(
  '/:slug/claim',
  requireApiKey,
  asyncHandler(async (req, res) => {
    const input = claimCompanySchema.parse(req.body);
    const claim = await db.createClaim(req.params.slug, input);
    if (!claim) throw NotFound(`Company '${req.params.slug}' not found`);
    return ok(res, claim, null, 201);
  }),
);

export default router;

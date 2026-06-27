import { Router } from 'express';
import { db } from '../db';
import { asyncHandler } from '../lib/async';
import { parsePageParams } from '../lib/pagination';
import { NotFound, ok } from '../lib/response';

const router = Router();

// GET /products — list with category filter + sort by popular/newest
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const page = parsePageParams(req.query as Record<string, unknown>);
    const result = db.store.listProducts(
      {
        category: req.query.category as string | undefined,
        sort: (req.query.sort as 'popular' | 'newest') ?? 'popular',
      },
      page,
    );
    return ok(res, result.items, result.meta);
  }),
);

// GET /products/:slug — product detail
router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const product = db.store.getProductBySlug(req.params.slug);
    if (!product) throw NotFound(`Product '${req.params.slug}' not found`);
    return ok(res, product);
  }),
);

export default router;

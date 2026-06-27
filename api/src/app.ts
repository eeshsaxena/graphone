import cors from 'cors';
import express, { Request, Response } from 'express';
import { config } from './config';
import { cache } from './lib/cache';
import { ok } from './lib/response';
import { errorHandler, notFoundHandler } from './middleware/error';
import { rateLimit } from './middleware/rateLimit';
import companiesRouter from './routes/companies';
import investorsRouter from './routes/investors';
import miscRouter from './routes/misc';
import newsRouter from './routes/news';
import productsRouter from './routes/products';

export function createApp() {
  const app = express();

  app.set('trust proxy', 1);
  app.use(express.json({ limit: '256kb' }));
  app.use(
    cors({
      origin: config.corsOrigin === '*' ? true : config.corsOrigin.split(','),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'X-API-Key'],
    }),
  );
  app.use(rateLimit);

  // health + meta
  app.get('/', (_req: Request, res: Response) =>
    ok(res, {
      name: 'GraphOne API',
      version: '1.0.0',
      docs: '/openapi.yaml',
      endpoints: [
        'GET /health',
        'GET /companies',
        'GET /companies/trending',
        'GET /companies/fastest-growing',
        'GET /companies/:slug',
        'GET /companies/:slug/funding',
        'GET /companies/:slug/products',
        'GET /companies/:slug/graph',
        'POST /companies',
        'POST /companies/:slug/claim',
        'GET /investors',
        'GET /investors/most-active',
        'GET /investors/:slug',
        'GET /investors/:slug/investments',
        'GET /investors/:slug/co-investors',
        'GET /products',
        'GET /products/:slug',
        'GET /news',
        'GET /news/trending',
        'GET /search?q=',
        'GET /stats',
        'GET /feed',
        'GET /founders/:slug',
      ],
    }),
  );

  app.get('/health', (_req: Request, res: Response) =>
    ok(res, { status: 'ok', uptime_s: Math.round(process.uptime()), cache: cache.stats() }),
  );

  // domain routers
  app.use('/companies', companiesRouter);
  app.use('/investors', investorsRouter);
  app.use('/products', productsRouter);
  app.use('/news', newsRouter);
  app.use('/', miscRouter); // /search, /stats, /feed, /founders/:slug

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

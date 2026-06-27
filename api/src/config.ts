import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT ?? '4000', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  dbDriver: (process.env.DB_DRIVER ?? 'memory') as 'memory' | 'postgres',
  databaseUrl: process.env.DATABASE_URL ?? '',
  apiKey: process.env.API_KEY ?? 'graphone-dev-key',
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? '60000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX ?? '100', 10),
  },
  trendingRerankIntervalMs: parseInt(
    process.env.TRENDING_RERANK_INTERVAL_MS ?? '300000',
    10,
  ),
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
};

export type AppConfig = typeof config;

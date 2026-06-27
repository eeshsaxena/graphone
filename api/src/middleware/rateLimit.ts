import { NextFunction, Request, Response } from 'express';
import { config } from '../config';

// Fixed-window in-memory rate limiter: 100 req/min/IP by default.
// Lightweight and dependency-free; for multi-instance deploys, back it with Redis.

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

function clientIp(req: Request): string {
  const fwd = req.header('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.ip ?? req.socket.remoteAddress ?? 'unknown';
}

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  const { windowMs, max } = config.rateLimit;
  const ip = clientIp(req);
  const now = Date.now();
  let bucket = buckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(ip, bucket);
  }

  bucket.count++;
  const remaining = Math.max(0, max - bucket.count);
  res.setHeader('X-RateLimit-Limit', String(max));
  res.setHeader('X-RateLimit-Remaining', String(remaining));
  res.setHeader('X-RateLimit-Reset', String(Math.ceil(bucket.resetAt / 1000)));

  if (bucket.count > max) {
    const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
    res.setHeader('Retry-After', String(retryAfter));
    return res.status(429).json({
      data: null,
      meta: null,
      error: {
        code: 'RATE_LIMITED',
        message: `Too many requests. Retry in ${retryAfter}s.`,
      },
    });
  }
  return next();
}

// periodic cleanup so the map doesn't grow unbounded
setInterval(() => {
  const now = Date.now();
  for (const [ip, bucket] of buckets) {
    if (now > bucket.resetAt) buckets.delete(ip);
  }
}, 60_000).unref();

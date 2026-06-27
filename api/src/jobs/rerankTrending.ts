import { config } from '../config';
import { db } from '../db';
import { cache } from '../lib/cache';

// Background job: periodically re-rank trending companies. Trending scores are
// computed on read, so this job (a) warms/refreshes the cache and (b) logs the
// fresh leaderboard so the ranking is observably maintained out-of-band, as the
// spec requires ("a background job/cron for re-ranking trending companies").

let timer: NodeJS.Timeout | null = null;

export function runRerankOnce(): { slug: string; trending_score: number }[] {
  const leaderboard = db.rerankTrending();
  // refresh cached hot endpoints so readers get the new ranking immediately
  cache.invalidate('companies:');
  cache.set('companies:trending', db.store.trendingCompanies(10), 30_000);
  // eslint-disable-next-line no-console
  console.log(
    `[cron] re-ranked trending @ ${new Date().toISOString()} — top: ` +
      leaderboard
        .slice(0, 5)
        .map((c) => `${c.slug}(${c.trending_score})`)
        .join(', '),
  );
  return leaderboard;
}

export function startRerankCron(): void {
  if (timer) return;
  // run once on boot, then on the configured interval
  runRerankOnce();
  timer = setInterval(runRerankOnce, config.trendingRerankIntervalMs);
  timer.unref();
}

export function stopRerankCron(): void {
  if (timer) clearInterval(timer);
  timer = null;
}

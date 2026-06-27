import { Company, CompanyWithTrending, FundingRound, NewsArticle, Product } from '../types';

// ============================================================================
// GraphOne Trending Score
// ============================================================================
// The open-ended challenge: define a single 0-100 score capturing how much
// momentum a company has *right now*. We blend five independent signals, each
// normalised to 0-1, then weight them by how strongly they indicate genuine,
// current traction (as opposed to size or legacy reputation).
//
//   1. View velocity  (35%) — week-over-week growth in profile views. The
//      purest "people are paying attention right now" signal.
//   2. Growth score   (25%) — the pre-computed momentum field on the company
//      (headcount growth, hiring, etc.). Structural growth, not just buzz.
//   3. Funding recency(20%) — a recent round is a strong public momentum event;
//      decays with age (half-life ~180 days).
//   4. News buzz      (12%) — count of news mentions in the trailing 30 days.
//   5. Product upvotes( 8%) — community love for the company's products in the
//      trailing 30 days; a leading indicator for early-stage companies.
//
// Each signal is squashed so no single runaway value dominates, and the final
// number is scaled to 0-100 for display. We deliberately do NOT reward raw
// company size — a $40B incumbent and a seed startup compete on momentum, not
// scale, which is what makes a "trending" list interesting.
// ============================================================================

export interface TrendingInputs {
  company: Company;
  fundingRounds: FundingRound[];
  news: NewsArticle[];
  products: Product[];
  now?: Date;
}

const WEIGHTS = {
  viewVelocity: 0.35,
  growthScore: 0.25,
  fundingRecency: 0.2,
  newsBuzz: 0.12,
  productUpvotes: 0.08,
} as const;

const DAY_MS = 86_400_000;

// log-style squash so big numbers don't dominate; saturates toward 1.
const saturate = (value: number, scale: number) =>
  value <= 0 ? 0 : 1 - Math.exp(-value / scale);

function viewVelocitySignal(c: Company): number {
  // week-over-week relative growth, clamped. New attention is worth more.
  const prev = Math.max(c.views_prev_7d, 1);
  const growth = (c.views_7d - c.views_prev_7d) / prev; // can be negative
  const normalisedGrowth = Math.max(0, Math.min(1, (growth + 0.5) / 2)); // -0.5..1.5 -> 0..1
  // also factor absolute volume so a tiny base isn't over-rewarded
  const volume = saturate(c.views_7d, 8000);
  return 0.7 * normalisedGrowth + 0.3 * volume;
}

function fundingRecencySignal(rounds: FundingRound[], now: Date): number {
  if (rounds.length === 0) return 0;
  const mostRecent = rounds.reduce((a, b) => (a.date > b.date ? a : b));
  const ageDays = (now.getTime() - new Date(mostRecent.date).getTime()) / DAY_MS;
  // exponential decay, half-life 180 days
  const recency = Math.pow(0.5, ageDays / 180);
  // bigger rounds count a little more, but recency dominates
  const sizeBoost = saturate(mostRecent.amount, 500_000_000);
  return Math.max(0, Math.min(1, recency * (0.7 + 0.3 * sizeBoost)));
}

function newsBuzzSignal(news: NewsArticle[], now: Date): number {
  const cutoff = now.getTime() - 30 * DAY_MS;
  const recent = news.filter((n) => new Date(n.published_at).getTime() >= cutoff);
  return saturate(recent.length, 4);
}

function productUpvotesSignal(products: Product[], now: Date): number {
  const cutoff = now.getTime() - 30 * DAY_MS;
  const recentUpvotes = products
    .filter((p) => new Date(p.launch_date).getTime() >= cutoff)
    .reduce((sum, p) => sum + p.upvotes, 0);
  return saturate(recentUpvotes, 6000);
}

export function trendingScore(input: TrendingInputs): {
  score: number;
  velocity: number;
  breakdown: Record<string, number>;
} {
  const now = input.now ?? new Date();
  const signals = {
    viewVelocity: viewVelocitySignal(input.company),
    growthScore: Math.max(0, Math.min(1, input.company.growth_score / 100)),
    fundingRecency: fundingRecencySignal(input.fundingRounds, now),
    newsBuzz: newsBuzzSignal(input.news, now),
    productUpvotes: productUpvotesSignal(input.products, now),
  };

  const raw =
    signals.viewVelocity * WEIGHTS.viewVelocity +
    signals.growthScore * WEIGHTS.growthScore +
    signals.fundingRecency * WEIGHTS.fundingRecency +
    signals.newsBuzz * WEIGHTS.newsBuzz +
    signals.productUpvotes * WEIGHTS.productUpvotes;

  const prev = Math.max(input.company.views_prev_7d, 1);
  const velocity = (input.company.views_7d - input.company.views_prev_7d) / prev;

  return {
    score: Math.round(raw * 1000) / 10, // 0-100, one decimal
    velocity: Math.round(velocity * 1000) / 10,
    breakdown: Object.fromEntries(
      Object.entries(signals).map(([k, v]) => [k, Math.round(v * 1000) / 1000]),
    ),
  };
}

export function withTrending(input: TrendingInputs): CompanyWithTrending {
  const { score, velocity } = trendingScore(input);
  return { ...input.company, trending_score: score, view_velocity: velocity };
}

import { ArrowRight, ChevronRight, Flame, Search, Sparkles, Star } from 'lucide-react';
import Image from '@/components/SmartImage';
import Link from 'next/link';
import { HeroVisual } from '@/components/HeroVisual';
import { Icon } from '@/components/Icon';
import { LiveStatsBar } from '@/components/LiveStatsBar';
import { NewsletterForm } from '@/components/NewsletterForm';
import { SectionHeader } from '@/components/ui';
import {
  categories,
  companies,
  fastestGrowing,
  trending,
  unicorns,
} from '@/lib/data';
import { compact, money } from '@/lib/format';
import { liveStats, liveTrending, LiveStats } from '@/lib/live';

const heroPills = ['AI Agents', 'AI Coding', 'AI Search', 'AI Video', 'AI Voice', 'AI Infrastructure'];

const frontierLabs = ['OpenAI', 'Anthropic', 'Google DeepMind', 'xAI', 'Meta AI', 'SSI'];
const openSource = [
  { name: 'Hugging Face', stars: '160K' },
  { name: 'Mistral AI', stars: '28K' },
  { name: 'Ollama', stars: '15K' },
  { name: 'Together AI', stars: '9K' },
  { name: 'Databricks', stars: '9K' },
];
const collections = [
  { title: 'OpenAI Alumni Startups', count: 42, g: 'from-[#1a1330] to-[#0c0a1a]' },
  { title: 'YC AI Startups', count: 263, g: 'from-[#5b3410] to-[#2a1808]' },
  { title: 'AI Agent Leaders', count: 121, g: 'from-[#10243a] to-[#08121d]' },
  { title: 'AI Infrastructure Leaders', count: 186, g: 'from-[#1a2a3a] to-[#0c141d]' },
  { title: 'Most Funded AI Startups', count: 184, g: 'from-[#3a1020] to-[#1d0810]' },
];

// Fallback stats derived from the bundled mock data (used when the live API is
// unreachable, so the page always renders).
const mockStats: LiveStats = {
  company_count: companies.length,
  investor_count: 24,
  founder_count: 20,
  product_count: 24,
  news_count: 120,
  total_funding: companies.reduce((s, c) => s + c.funding_total, 0),
  unicorn_count: companies.filter((c) => c.is_unicorn).length,
};

export default async function HomePage() {
  // Live data from the deployed API, with graceful fallback to mock.
  const [stats, liveTrend] = await Promise.all([liveStats(), liveTrending()]);

  // When the API responds, drive the trending rail's order + scores from it,
  // matched back onto the curated cards by slug (keeps gradients/taglines).
  const trendingCards =
    liveTrend && liveTrend.length > 0
      ? liveTrend
          .map((l) => {
            const c = companies.find((x) => x.slug === l.slug);
            return c ? { ...c, trending_score: l.trending_score, views_7d: l.views_7d } : null;
          })
          .filter((c): c is (typeof companies)[number] => c !== null)
      : trending;

  const [t1, t2, t3, ...restTrending] = trendingCards;
  const emerging = companies.filter((c) => ['Glean', 'Reka AI', 'Hugging Face', 'Mistral AI'].includes(c.name));

  return (
    <div className="pb-10">
      {/* ===== HERO ===== */}
      <section className="page grid items-center gap-8 pt-10 lg:grid-cols-2 lg:pt-14">
        <div>
          <span className="pill border-accent-200 bg-accent-50 text-accent-600">AI COMPANIES</span>
          <h1 className="mt-4 text-[40px] font-extrabold leading-[1.08] tracking-tight sm:text-[48px]">
            Discover the world’s
            <br /> most innovative
            <br /> AI companies
          </h1>
          <p className="mt-4 max-w-md text-[15px] text-muted">
            Explore AI startups, unicorns, frontier labs, and emerging companies shaping the future of artificial intelligence.
          </p>
          <form action="/search" className="mt-6 flex items-center gap-2 rounded-full border border-line bg-[var(--card)] p-1.5 shadow-card">
            <Search className="ml-3 h-4 w-4 text-ink-soft" />
            <input
              name="q"
              placeholder="Search companies, categories, founders, investors…"
              className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-ink-soft"
            />
            <button type="submit" aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full bg-accent text-white transition hover:bg-accent-600">
              <Search className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {heroPills.map((p) => (
              <span key={p} className="pill text-[12px]">
                <Sparkles className="h-3 w-3 text-accent" />
                {p}
              </span>
            ))}
            <span className="pill text-[12px]">More ⌄</span>
          </div>
        </div>
        <HeroVisual />
      </section>

      {/* ===== LIVE STATS (real data from the GraphOne API, mock fallback) ===== */}
      <section className="page mt-8">
        <LiveStatsBar stats={stats ?? mockStats} live={stats !== null} />
      </section>

      {/* ===== 1. TRENDING ===== */}
      <section className="page mt-12">
        <SectionHeader num={1} title="Trending AI Companies" subtitle="The most searched, viewed and discussed AI companies right now." href="/" />
        <div className="grid gap-4 lg:grid-cols-4">
          {[t1, t2, t3].map((c, i) => (
            <Link
              key={c.id}
              href={`/companies/${c.slug}`}
              className={`group relative flex h-56 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${c.gradient ?? 'from-zinc-800 to-zinc-900'} p-5 text-white shadow-card transition hover:shadow-hover`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-white/15 px-2 py-1 text-xs font-semibold backdrop-blur">0{i + 1}</span>
                <Image src={c.logo} alt="" width={36} height={36} className="h-9 w-9 rounded-lg bg-white/90 object-contain p-1" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{c.name}</h3>
                <p className="text-sm text-white/70">{c.category}</p>
                <p className="mt-2 line-clamp-2 text-[13px] text-white/80">{c.tagline}</p>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 font-semibold backdrop-blur">
                    <Flame className="h-3 w-3 text-orange-300" /> Trending #{i + 1}
                  </span>
                  <span className="text-white/70">{compact(c.views_7d)} views (7d)</span>
                </div>
              </div>
            </Link>
          ))}
          <div className="flex flex-col gap-4">
            {restTrending.slice(0, 2).map((c, i) => (
              <Link
                key={c.id}
                href={`/companies/${c.slug}`}
                className="group flex flex-1 items-center gap-3 overflow-hidden rounded-2xl border border-line bg-subtle p-4 transition hover:shadow-card"
              >
                <span className="text-xs font-bold text-ink-soft">0{i + 4}</span>
                <Image src={c.logo} alt="" width={32} height={32} className="h-8 w-8 rounded-lg object-contain" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-muted">{c.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted">{compact(c.views_7d)} views (7d)</p>
                </div>
                <ChevronRight className="h-4 w-4 text-ink-soft transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. FASTEST GROWING ===== */}
      <section className="page mt-12">
        <SectionHeader num={2} title="Fastest Growing AI Companies" subtitle="Companies showing strong momentum across key growth signals." />
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1.4fr]">
          {fastestGrowing.slice(0, 5).map((c) => (
            <Link
              key={c.id}
              href={`/companies/${c.slug}`}
              className="group overflow-hidden rounded-2xl border border-line bg-[var(--card)] shadow-card transition hover:shadow-hover"
            >
              <div className="flex items-center gap-2 p-4">
                <Image src={c.logo} alt="" width={36} height={36} className="h-9 w-9 rounded-lg object-contain" />
              </div>
              <div className="px-4">
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-xs text-muted">{c.category}</p>
              </div>
              <Sparkline />
            </Link>
          ))}
          <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-accent-50 to-violet-50 p-5 dark:from-accent-900/20 dark:to-violet-900/20">
            <div>
              <h3 className="text-lg font-bold leading-snug">Explore tomorrow’s market leaders today.</h3>
              <p className="mt-2 text-sm text-muted">Discover companies with the highest growth potential across the AI landscape.</p>
            </div>
            <button className="btn-accent mt-4 self-start">
              Explore Growth Leaders <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== 3. EMERGING ===== */}
      <section className="page mt-12">
        <SectionHeader num={3} title="Emerging AI Startups to Watch" subtitle="Promising early-stage companies gaining real traction." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {emerging.map((c, i) => (
            <Link
              key={c.id}
              href={`/companies/${c.slug}`}
              className={`group relative flex h-48 flex-col justify-between overflow-hidden rounded-2xl p-5 transition hover:shadow-hover ${
                i === 0 || i === 3
                  ? 'bg-gradient-to-br from-violet-100 to-violet-50 dark:from-violet-900/30 dark:to-violet-900/10'
                  : 'border border-line bg-[var(--card)] shadow-card'
              }`}
            >
              <Image src={c.logo} alt="" width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />
              <div>
                <h3 className="font-bold">{c.name}</h3>
                <p className="text-xs text-muted">{c.category}</p>
                <p className="mt-1 line-clamp-2 text-[13px] text-muted">{c.description}</p>
                <p className="mt-2 text-xs text-ink-soft">
                  {c.founded_year} · {c.employee_count <= 50 ? '11-50' : '51-200'} employees
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== 4. BROWSE BY CATEGORY ===== */}
      <section className="page mt-12">
        <SectionHeader num={4} title="Browse by Category" subtitle="Explore companies by what they’re building." cta="" />
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href="/"
              className="flex min-w-[150px] flex-1 flex-col items-center gap-2 rounded-2xl border border-line bg-[var(--card)] px-4 py-5 text-center shadow-card transition hover:border-accent-200 hover:shadow-hover"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-50 text-accent">
                <Icon name={cat.icon} className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold">{cat.name}</span>
              <span className="text-xs text-muted">{cat.count} companies</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== 5/6/7. THREE COLUMNS ===== */}
      <section className="page mt-12 grid gap-6 lg:grid-cols-3">
        <ListCard num={5} title="Breakout Companies" subtitle="Companies making big moves." rows={[
          { c: companies.find((x) => x.name === 'Pika')!, note: 'Launched new 1.0 video model' },
          { c: companies.find((x) => x.name === 'Cognition')!, note: 'Closed $175M Series B' },
          { c: companies.find((x) => x.name === 'Sierra')!, note: 'Enterprise adoption surged 200%' },
        ]} />
        <ListCard num={6} title="Recently Funded AI Startups" subtitle="Latest funding announcements." rows={[
          { c: companies.find((x) => x.name === 'xAI')!, note: '$6B Series C · May 2025 · a16z' },
          { c: companies.find((x) => x.name === 'Databricks')!, note: '$10B Series J · Dec 2024 · Thrive' },
          { c: companies.find((x) => x.name === 'Mistral AI')!, note: '$640M Series B · Jun 2024 · GC' },
        ]} />
        <ListCard num={7} title="Startups to Watch" subtitle="High-potential companies to keep an eye on." rows={[
          { c: companies.find((x) => x.name === 'Lovable')!, note: 'AI app builder · High growth' },
          { c: companies.find((x) => x.name === 'Granola')!, note: 'AI notetaker for teams' },
          { c: companies.find((x) => x.name === 'Harvey')!, note: 'Legal AI · Series C' },
        ]} />
      </section>

      {/* ===== AI UNICORNS ===== */}
      <section className="page mt-12">
        <div className="rounded-2xl bg-gradient-to-r from-accent-50 to-violet-50 p-6 dark:from-accent-900/20 dark:to-violet-900/20">
          <div className="mb-5 flex items-center gap-2">
            <span className="section-num">8</span>
            <h2 className="text-[17px] font-bold">AI Unicorns</h2>
            <span className="text-sm text-muted">· Private companies valued at $1B+.</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {unicorns.slice(0, 5).map((c) => (
              <Link key={c.id} href={`/companies/${c.slug}`} className="flex items-center gap-2">
                <Image src={c.logo} alt="" width={28} height={28} className="h-7 w-7 rounded-md object-contain" />
                <span className="text-sm font-semibold">{c.name}</span>
                <span className="text-sm text-accent">{money(c.valuation)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FRONTIER LABS (dark) ===== */}
      <section className="page mt-4">
        <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-[#0c1230] to-[#0a0a1a] p-6 text-white sm:flex-row sm:items-center">
          <div className="min-w-[180px]">
            <p className="text-[15px] font-bold">Frontier AI Labs</p>
            <p className="text-xs text-white/60">Organisations advancing the state-of-the-art.</p>
          </div>
          <div className="flex flex-1 flex-wrap items-center gap-x-7 gap-y-3">
            {frontierLabs.map((n) => (
              <span key={n} className="text-sm font-semibold text-white/90">{n}</span>
            ))}
          </div>
          <ChevronRight className="hidden h-5 w-5 text-white/50 sm:block" />
        </div>
      </section>

      {/* ===== OPEN SOURCE (green) ===== */}
      <section className="page mt-4">
        <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-[#0a2a18] to-[#06160d] p-6 text-white sm:flex-row sm:items-center">
          <div className="min-w-[180px]">
            <p className="text-[15px] font-bold">Open Source AI Leaders</p>
            <p className="text-xs text-white/60">Leading the open-source movement.</p>
          </div>
          <div className="flex flex-1 flex-wrap items-center gap-x-7 gap-y-3">
            {openSource.map((o) => (
              <span key={o.name} className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90">
                {o.name} <Star className="h-3 w-3 text-amber-300" /> <span className="text-white/60">{o.stars}</span>
              </span>
            ))}
          </div>
          <ChevronRight className="hidden h-5 w-5 text-white/50 sm:block" />
        </div>
      </section>

      {/* ===== CURATED COLLECTIONS ===== */}
      <section className="page mt-12">
        <SectionHeader num={9} title="Curated Collections" subtitle="Handpicked lists for faster discovery." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {collections.map((col) => (
            <Link key={col.title} href="/" className={`group relative flex h-28 flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br ${col.g} p-4 text-white transition hover:shadow-hover`}>
              <p className="text-sm font-bold leading-tight">{col.title}</p>
              <p className="text-xs text-white/60">{col.count} companies</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="page mt-12">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-subtle p-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-white"><Sparkles className="h-5 w-5" /></span>
            <div>
              <p className="font-bold">Be the first to discover what’s next in AI</p>
              <p className="text-sm text-muted">Join thousands of builders, investors and researchers.</p>
            </div>
          </div>
          <NewsletterForm cta="Get updates" layout="row" />
        </div>
      </section>
    </div>
  );
}

function Sparkline() {
  return (
    <svg viewBox="0 0 200 70" className="mt-3 h-16 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0285A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#F0285A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 55 C30 50 45 30 70 32 S120 18 150 14 200 6 200 6" fill="none" stroke="#F0285A" strokeWidth="2" />
      <path d="M0 55 C30 50 45 30 70 32 S120 18 150 14 200 6 200 6 L200 70 L0 70 Z" fill="url(#spark)" />
    </svg>
  );
}

function ListCard({
  num,
  title,
  subtitle,
  rows,
}: {
  num: number;
  title: string;
  subtitle: string;
  rows: { c: { name: string; slug: string; logo: string }; note: string }[];
}) {
  return (
    <div className="card p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="section-num">{num}</span>
        <div>
          <h3 className="text-[15px] font-bold">{title}</h3>
        </div>
      </div>
      <p className="mb-3 text-xs text-muted">{subtitle}</p>
      <ul className="space-y-1">
        {rows.map(({ c, note }) => (
          <li key={c.slug}>
            <Link href={`/companies/${c.slug}`} className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-subtle">
              <Image src={c.logo} alt="" width={32} height={32} className="h-8 w-8 rounded-lg object-contain" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{c.name}</p>
                <p className="truncate text-xs text-muted">{note}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-ink-soft" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

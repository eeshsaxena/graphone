import { ArrowRight, BadgeCheck, Bookmark, CalendarDays, MapPin, Plus, Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Donut } from '@/components/Donut';
import { Icon } from '@/components/Icon';
import { investorBySlug, investors } from '@/lib/data';
import {
  sequoiaCoInvestors,
  sequoiaExit,
  sequoiaFollowOn,
  sequoiaKeyPeople,
  sequoiaMarketInfluence,
  sequoiaOutcome,
  sequoiaPortfolio,
  sequoiaPreferredStages,
  sequoiaRecent,
  sequoiaResearch,
  sequoiaSectors,
  sequoiaStageEvolution,
  sequoiaStats,
  sequoiaVelocity,
  sequoiaWinners,
  sequoiaCapitalFlow,
} from '@/lib/detail';

export function generateStaticParams() {
  return investors.map((i) => ({ slug: i.slug }));
}

export default function InvestorProfile({ params }: { params: { slug: string } }) {
  const investor = investorBySlug(params.slug);
  if (!investor) notFound();

  return (
    <div className="bg-subtle pb-16">
      <div className="page pt-6 text-sm text-muted">
        <Link href="/" className="hover:text-accent">Home</Link> <span className="px-1">›</span>
        <Link href="/investors" className="hover:text-accent">Investors</Link> <span className="px-1">›</span>
        <span className="text-ink">{investor.name}</span>
      </div>

      {/* ===== HERO ===== */}
      <section className="page mt-4 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card p-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            <BadgeCheck className="h-3.5 w-3.5" /> Verified Investor
          </span>
          <div className="mt-4 flex gap-5">
            <Image src={investor.logo} alt={investor.name} width={88} height={88} className="h-22 w-22 rounded-2xl border border-line bg-white object-contain p-2" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight">{investor.name}</h1>
                <BadgeCheck className="h-5 w-5 text-accent" />
              </div>
              <p className="mt-1 text-[15px] text-muted">Backing the daring from idea to iconic.</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {investor.location}</span>
                <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> Founded in {investor.founded_year}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {['VC', 'Growth Equity', 'Private Equity'].map((t) => (
                  <span key={t} className="pill text-[12px]">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <button className="btn-accent"><Plus className="h-4 w-4" /> Follow Investor</button>
            <button className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted"><Bookmark className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="card p-6">
          <p className="text-sm font-semibold">Key people</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {sequoiaKeyPeople.map((p) => (
              <div key={p.name} className="flex flex-col items-center text-center">
                <Image src={p.photo} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                <p className="mt-2 text-xs font-semibold leading-tight">{p.name}</p>
                <p className="text-[11px] text-muted">{p.title}</p>
              </div>
            ))}
          </div>
          <Link href="#" className="link-accent mt-4">View all team members <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
      </section>

      {/* ===== STAT STRIP ===== */}
      <section className="page mt-4">
        <div className="card grid grid-cols-2 divide-line p-0 sm:grid-cols-3 lg:grid-cols-6">
          {sequoiaStats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1 border-line p-4 text-center [&:not(:last-child)]:border-r [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r lg:[&:nth-child(6)]:border-r-0">
              <Icon name={s.icon} className={`h-4 w-4 ${s.tone}`} />
              <span className={`text-lg font-bold ${s.tone}`}>{s.value}</span>
              {s.label && <span className="text-[11px] text-muted">{s.label}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* ===== THESIS + PORTFOLIO ===== */}
      <section className="page mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <div className="mb-3 flex items-center gap-2">
            <Quote className="h-5 w-5 text-accent-300" />
            <h2 className="text-[15px] font-bold">Investment Thesis</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted">{investor.tagline ? 'Sequoia partners with visionary founders building category-defining companies. Our focus is on technology and innovation that creates long-term impact and shapes the future.' : ''}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {sequoiaSectors.map((s) => (
              <span key={s} className="pill text-[12px]">{s}</span>
            ))}
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-ink-soft">Preferred Stages</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {sequoiaPreferredStages.map((s) => (
              <span key={s} className="rounded-lg border border-line px-3 py-1 text-[13px] font-medium">{s}</span>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h2 className="mb-4 text-[15px] font-bold">Portfolio Concentration</h2>
          <Donut data={sequoiaPortfolio} />
        </div>
      </section>

      {/* ===== RECENT INVESTMENTS ===== */}
      <section className="page mt-6">
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[15px] font-bold">Recent Investments</h2>
            <Link href="#" className="link-accent text-xs">View all investments <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {sequoiaRecent.map((r) => (
              <div key={r.name} className={`flex h-44 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${r.gradient} p-4 text-white`}>
                <Image src={r.logo} alt="" width={36} height={36} className="h-9 w-9 rounded-lg bg-white/90 object-contain p-1" />
                <div>
                  <p className="font-bold">{r.name}</p>
                  <p className="text-[11px] text-white/60">{r.cat}</p>
                  <p className="mt-1 text-[11px] text-white/70">{r.stage}</p>
                  <p className="text-lg font-extrabold">{r.amount}</p>
                  <p className="text-[10px] text-white/60">{r.date} · {r.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VELOCITY / CAPITAL FLOW / STAGE EVOLUTION ===== */}
      <section className="page mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card p-6">
          <h3 className="mb-4 text-sm font-bold">Investment Velocity</h3>
          <ul className="space-y-3">
            {sequoiaVelocity.map((v) => (
              <li key={v.year} className="flex items-center gap-3 text-sm">
                <span className="w-10 text-muted">{v.year}</span>
                <span className="font-bold tabular-nums">{v.deals}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                  <span className="block h-full rounded-full bg-accent" style={{ width: `${(v.deals / 48) * 100}%` }} />
                </span>
                <span className="text-xs text-muted">AI Deals</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="mb-4 text-sm font-bold">Capital Flow</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="mb-2 text-xs font-semibold text-emerald-600">Increasing Capital</p>
              <ul className="space-y-2">
                {sequoiaCapitalFlow.increasing.map((x) => (
                  <li key={x} className="flex items-center gap-1.5 text-muted"><ArrowRight className="h-3 w-3 rotate-[-45deg] text-emerald-500" /> {x}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold text-accent">Decreasing Capital</p>
              <ul className="space-y-2">
                {sequoiaCapitalFlow.decreasing.map((x) => (
                  <li key={x} className="flex items-center gap-1.5 text-muted"><ArrowRight className="h-3 w-3 rotate-45 text-accent" /> {x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="mb-4 text-sm font-bold">Stage Evolution</h3>
          <ul className="space-y-3">
            {sequoiaStageEvolution.map((s) => (
              <li key={s.year} className="flex items-center gap-3 text-sm">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="w-10 text-muted">{s.year}</span>
                <span className="font-medium">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== PORTFOLIO WINNERS + FOLLOW-ON ===== */}
      <section className="page mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="mb-4 text-sm font-bold">Portfolio Winners</h3>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">Notable Winners</p>
          <div className="flex flex-wrap gap-2">
            {sequoiaWinners.map((w) => (
              <span key={w} className="rounded-lg border border-line px-3 py-1.5 text-[13px] font-semibold">{w}</span>
            ))}
          </div>
          <p className="mb-2 mt-5 text-xs font-semibold uppercase tracking-wide text-ink-soft">Outcome Breakdown</p>
          <div className="grid grid-cols-4 gap-3">
            {sequoiaOutcome.map((o) => (
              <div key={o.label} className="rounded-xl bg-subtle p-3 text-center">
                <p className="text-lg font-extrabold text-accent">{o.value}</p>
                <p className="text-[11px] text-muted">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h3 className="mb-4 text-sm font-bold">Follow-On Strength</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {sequoiaFollowOn.map((f) => (
              <div key={f.label} className="text-center">
                <p className={`text-2xl font-extrabold ${f.tone ?? 'text-emerald-600'}`}>{f.value}</p>
                <p className="mt-1 text-[11px] text-muted">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MARKET INFLUENCE + EXIT ===== */}
      <section className="page mt-6 grid gap-6 lg:grid-cols-2">
        <StatGrid title="AI Market Influence" items={sequoiaMarketInfluence} />
        <StatGrid title="Exit Intelligence" items={sequoiaExit} />
      </section>

      {/* ===== RESEARCH + CO-INVESTORS ===== */}
      <section className="page mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold">Research & Mentions</h3>
            <Link href="#" className="link-accent text-xs">View all research <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <ul className="divide-y divide-line">
            {sequoiaResearch.map((r) => (
              <li key={r.title} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-sm font-medium">{r.title}</p>
                  <p className="text-xs text-muted">{r.source}</p>
                </div>
                <span className="text-xs text-muted">{r.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold">Co-Investor Network</h3>
            <Link href="#" className="link-accent text-xs">View all co-investors <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <p className="mb-3 text-xs text-muted">Most Frequent Co-Investors</p>
          <div className="flex flex-wrap gap-3">
            {sequoiaCoInvestors.map((c) => (
              <div key={c.name} className="flex items-center gap-2 rounded-xl border border-line px-3 py-2">
                <Image src={c.logo} alt="" width={22} height={22} className="h-[22px] w-[22px] rounded object-contain" />
                <span className="text-[13px] font-semibold">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatGrid({ title, items }: { title: string; items: { value: string; label: string }[] }) {
  return (
    <div className="card p-6">
      <h3 className="mb-4 text-sm font-bold">{title}</h3>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
        {items.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-lg font-extrabold text-accent">{s.value}</p>
            <p className="mt-1 text-[10px] leading-tight text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

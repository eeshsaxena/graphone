import { ArrowRight, Plus, Search } from 'lucide-react';
import Image from '@/components/SmartImage';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { SectionHeader } from '@/components/ui';
import { investorCollections, investorTypes, investors } from '@/lib/data';

const popular = ['AI Agents', 'Seed Investors', 'Series A', 'YC Backers', 'India', 'OpenAI Portfolio'];

export default function InvestorsPage() {
  return (
    <div className="pb-10">
      {/* hero */}
      <section className="page grid items-center gap-8 pt-10 lg:grid-cols-2">
        <div>
          <h1 className="text-[40px] font-extrabold leading-[1.08] tracking-tight">
            Discover Investors
            <br /> Building the AI Economy
          </h1>
          <p className="mt-4 max-w-md text-[15px] text-muted">
            Find VCs, angels, operators, corporate funds and emerging managers backing the next generation of AI companies.
          </p>
          <div className="mt-6 flex items-center gap-2 rounded-full border border-line bg-[var(--card)] p-1.5 shadow-card">
            <Search className="ml-3 h-4 w-4 text-ink-soft" />
            <input placeholder="Search investors, funds, firms…" className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-ink-soft" />
            <button className="grid h-10 w-10 place-items-center rounded-full bg-accent text-white"><Search className="h-4 w-4" /></button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-muted">Popular searches</span>
            {popular.map((p) => (
              <span key={p} className="pill text-[12px]">{p}</span>
            ))}
          </div>
        </div>
        <div className="relative hidden h-[280px] lg:block">
          <div className="absolute right-10 top-6 h-48 w-48 rounded-full bg-accent-100/60 blur-3xl dark:bg-accent-900/20" />
          {investors.slice(0, 5).map((inv, i) => (
            <div
              key={inv.id}
              className="absolute flex items-center gap-2 rounded-xl border border-line bg-[var(--card)] px-3 py-2 shadow-pop"
              style={{ left: `${[10, 55, 30, 65, 5][i]}%`, top: `${[5, 0, 45, 55, 70][i]}%` }}
            >
              <Image src={inv.logo} alt="" width={20} height={20} className="h-5 w-5 rounded object-contain" />
              <span className="text-xs font-semibold">{inv.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 01 trending investors */}
      <section className="page mt-10">
        <SectionHeader num={1} title="Trending Investors" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {investors.map((inv) => (
            <Link
              key={inv.id}
              href={`/investors/${inv.slug}`}
              className={`group flex h-44 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${inv.gradient} p-4 text-white transition hover:shadow-hover`}
            >
              <Image src={inv.logo} alt="" width={34} height={34} className="h-9 w-9 rounded-lg bg-white/90 object-contain p-1" />
              <div>
                <p className="text-sm font-bold leading-tight">{inv.name}</p>
                <p className="mt-1 line-clamp-2 text-[11px] text-white/70">{inv.tagline}</p>
                <span className="link-accent mt-2 text-white/90">View portfolio <ArrowRight className="h-3 w-3" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 02 collections */}
      <section className="page mt-12">
        <SectionHeader num={2} title="Investor Collections" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {investorCollections.map((c) => (
            <div key={c.title} className={`relative flex h-40 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${c.img} p-5 text-white`}>
              <div>
                <p className="text-base font-bold leading-tight">{c.title}</p>
                <p className="mt-1 text-xs text-white/70">{c.count} Investors</p>
              </div>
              <button className="grid h-8 w-8 place-items-center self-start rounded-full bg-white/15 backdrop-blur"><Plus className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </section>

      {/* 03 browse by type */}
      <section className="page mt-12">
        <SectionHeader num={3} title="Browse by Investor Type" cta="" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {investorTypes.map((t) => (
            <div key={t.name} className="flex items-center gap-3 rounded-2xl border border-line bg-[var(--card)] p-5 shadow-card transition hover:shadow-hover">
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${t.tone}`}>
                <Icon name={t.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted">{t.count.toLocaleString()} Investors</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04 most active */}
      <section className="page mt-12">
        <SectionHeader num={4} title="Most Active Investors" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {investors.slice(0, 4).map((inv) => (
            <div key={inv.id} className="card p-5">
              <div className="flex items-center gap-2">
                <Image src={inv.logo} alt="" width={28} height={28} className="h-7 w-7 rounded-md object-contain" />
                <p className="text-sm font-bold">{inv.name}</p>
              </div>
              <p className="mt-1 text-xs text-muted">{inv.portfolio_count} portfolio companies</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {inv.sector_focus.slice(0, 4).map((s) => (
                  <span key={s} className="rounded-md bg-subtle px-2 py-0.5 text-[11px] text-muted">{s}</span>
                ))}
              </div>
              <Link href={`/investors/${inv.slug}`} className="link-accent mt-3">View portfolio <ArrowRight className="h-3 w-3" /></Link>
            </div>
          ))}
        </div>
      </section>

      {/* capital graph band */}
      <section className="page mt-12">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a0b2e] to-[#0a0a1a] p-8 text-white">
          <h2 className="text-2xl font-extrabold">Visualize How Capital Moves in the AI Economy</h2>
          <p className="mt-2 max-w-lg text-sm text-white/60">Explore the relationships between investors, founders, companies, funding rounds and products.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {['Investor', 'Founder', 'Company', 'Funding Round', 'Product'].map((s, i, arr) => (
              <div key={s} className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-1.5">
                  <span className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${['from-accent-400 to-accent-600', 'from-violet-400 to-violet-600', 'from-sky-400 to-sky-600', 'from-teal-400 to-teal-600', 'from-emerald-400 to-emerald-600'][i]}`}>
                    <span className="text-lg font-bold">{s[0]}</span>
                  </span>
                  <span className="text-[11px] text-white/70">{s}</span>
                </div>
                {i < arr.length - 1 && <ArrowRight className="h-4 w-4 text-white/40" />}
              </div>
            ))}
          </div>
          <button className="btn-accent mt-6">Explore Capital Graph <ArrowRight className="h-4 w-4" /></button>
        </div>
      </section>
    </div>
  );
}

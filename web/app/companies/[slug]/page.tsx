import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Github,
  Globe,
  Linkedin,
  MapPin,
  Twitter,
  Users,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Donut } from '@/components/Donut';
import { EcosystemGraph, GraphLegend } from '@/components/EcosystemGraph';
import { bySlug, companies } from '@/lib/data';
import {
  openaiAcquisitions,
  openaiAlumni,
  openaiCollections,
  openaiCompetitors,
  openaiFounders,
  openaiFunding,
  openaiInvestments,
  openaiInvestors,
  openaiJobs,
  openaiNews,
  openaiOwnership,
  openaiPatents,
  openaiProducts,
  openaiTimeline,
} from '@/lib/detail';

export function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

const tabs = ['Overview', 'Timeline', 'Funding', 'Ownership', 'Investors', 'Leadership', 'Products', 'More'];

export default function CompanyDetail({ params }: { params: { slug: string } }) {
  const company = bySlug(params.slug);
  if (!company) notFound();
  const flagship = company.slug === 'openai';
  const domain = company.logo.split('/').pop() ?? '';
  const similar = companies.filter((c) => c.category === company.category && c.id !== company.id).slice(0, 5);

  return (
    <div className="bg-subtle pb-16">
      {/* breadcrumb */}
      <div className="page pt-6 text-sm text-muted">
        <Link href="/" className="hover:text-accent">Home</Link> <span className="px-1">›</span>
        <Link href="/" className="hover:text-accent">Companies</Link> <span className="px-1">›</span>
        <span className="text-ink">{company.name}</span>
      </div>

      {/* ===== HERO ===== */}
      <section className="page mt-4">
        <div className="card relative overflow-hidden p-6">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-accent-50 to-transparent dark:from-accent-900/10" />
          <div className="relative flex flex-col gap-5 sm:flex-row">
            <Image src={company.logo} alt={company.name} width={84} height={84} className="h-20 w-20 rounded-2xl border border-line bg-white object-contain p-2" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight">{company.name}</h1>
                <BadgeCheck className="h-5 w-5 text-accent" />
              </div>
              <p className="mt-1 max-w-xl text-[15px] text-muted">{company.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5"><Globe className="h-4 w-4" /> {domain}</span>
                <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> Founded {company.founded_year}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {company.hq}</span>
                <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> {company.employee_count.toLocaleString()}+ employees</span>
                <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4" /> {company.stage}</span>
              </div>
              <div className="mt-4 flex items-center gap-3 text-ink-soft">
                <Twitter className="h-4 w-4 cursor-pointer hover:text-accent" />
                <Linkedin className="h-4 w-4 cursor-pointer hover:text-accent" />
                <Youtube className="h-4 w-4 cursor-pointer hover:text-accent" />
                <Github className="h-4 w-4 cursor-pointer hover:text-accent" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[company.category, 'Machine Learning', 'Generative AI', 'Foundation Models', 'AI Research'].map((t) => (
                  <span key={t} className="rounded-full bg-accent-50 px-3 py-1 text-[13px] font-medium text-accent-600">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* tabs */}
      <div className="sticky top-16 z-20 mt-4 border-y border-line bg-[var(--bg)]/90 backdrop-blur">
        <nav className="page flex gap-6 overflow-x-auto py-3 text-sm no-scrollbar">
          {tabs.map((t, i) => (
            <button key={t} className={`whitespace-nowrap font-medium transition ${i === 0 ? 'text-accent' : 'text-muted hover:text-accent'}`}>
              {i + 1 <= 7 ? `${i + 1}. ` : ''}{t}
            </button>
          ))}
        </nav>
      </div>

      {flagship ? (
        <FlagshipBody />
      ) : (
        <CondensedBody company={company} />
      )}

      {/* ===== SIMILAR (all companies) ===== */}
      <section className="page mt-6">
        <Panel title="Similar Companies" n={18}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {similar.map((c) => (
              <Link key={c.id} href={`/companies/${c.slug}`} className="flex items-center gap-2 rounded-xl border border-line p-3 transition hover:shadow-card">
                <Image src={c.logo} alt="" width={28} height={28} className="h-7 w-7 rounded-md object-contain" />
                <span className="truncate text-sm font-semibold">{c.name}</span>
              </Link>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}

/* ============================ FLAGSHIP (OpenAI) ============================ */
function FlagshipBody() {
  return (
    <>
      {/* 2. Timeline */}
      <section className="page mt-6">
        <Panel title="Timeline" n={2}>
          <div className="flex items-start justify-between gap-2 overflow-x-auto pb-2">
            {openaiTimeline.map((t) => (
              <div key={t.year} className="flex min-w-[80px] flex-1 flex-col items-center text-center">
                <span className="text-sm font-bold">{t.year}</span>
                <span className="my-2 h-3 w-3 rounded-full border-2 border-accent bg-[var(--card)]" />
                <span className="text-xs text-muted">{t.label}</span>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      {/* 3 + 4. Funding + Ownership */}
      <section className="page mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Funding Timeline" n={3}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-ink-soft">
                <th className="pb-2 font-medium">Round</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {openaiFunding.map((r) => (
                <tr key={r.round} className="border-t border-line">
                  <td className="py-2.5 font-semibold">{r.round}</td>
                  <td className="py-2.5 text-muted">{r.date}</td>
                  <td className="py-2.5 text-right font-semibold text-accent">{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="#" className="link-accent mt-3">View funding history <ArrowRight className="h-3.5 w-3.5" /></Link>
        </Panel>
        <Panel title="Ownership" n={4}>
          <Donut data={openaiOwnership} />
        </Panel>
      </section>

      {/* 5. Investors */}
      <section className="page mt-6">
        <Panel title="Investors" n={5}>
          <div className="grid gap-6 sm:grid-cols-3">
            {Object.entries(openaiInvestors).map(([group, list]) => (
              <div key={group}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">{group} Investors</p>
                <ul className="space-y-2.5">
                  {list.map((inv) => (
                    <li key={inv.name} className="flex items-center gap-2.5">
                      <Image src={inv.logo} alt="" width={24} height={24} className="h-6 w-6 rounded-md object-contain" />
                      <span className="text-sm font-medium">{inv.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      {/* 6. Founders */}
      <section className="page mt-6">
        <Panel title="Founders & Leadership" n={6} cta="View all leadership">
          <div className="flex flex-wrap gap-6">
            {openaiFounders.map((f) => (
              <div key={f.name} className="flex items-center gap-3">
                <Image src={f.photo} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{f.name}</p>
                  <p className="text-xs text-muted">{f.title}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      {/* 7. Products */}
      <section className="page mt-6">
        <Panel title="Products" n={7}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {openaiProducts.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-2 rounded-xl border border-line p-4 text-center transition hover:shadow-card">
                <Image src={p.logo} alt="" width={36} height={36} className="h-9 w-9 rounded-lg object-contain" />
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-[11px] text-muted">{p.sub}</p>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      {/* 8 + 9. Acquisitions + Investments */}
      <section className="page mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Acquisitions" n={8} cta="View all acquisitions">
          <SimpleTable head={['Company', 'Date', 'Focus']} rows={openaiAcquisitions.map((a) => [a.company, a.date, a.focus])} logos={openaiAcquisitions.map((a) => a.logo)} />
        </Panel>
        <Panel title="Investments" n={9} cta="View all investments">
          <SimpleTable head={['Company', 'Focus', 'Stage']} rows={openaiInvestments.map((a) => [a.company, a.focus, a.stage])} logos={openaiInvestments.map((a) => a.logo)} />
        </Panel>
      </section>

      {/* 10. Competitor Landscape */}
      <section className="page mt-6">
        <Panel title="Competitor Landscape" n={10}>
          <div className="grid gap-6 sm:grid-cols-2">
            {(['direct', 'adjacent'] as const).map((kind) => (
              <div key={kind}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">{kind} Competitors</p>
                <div className="flex flex-wrap gap-4">
                  {openaiCompetitors[kind].map((c) => (
                    <div key={c.name} className="flex flex-col items-center gap-1.5">
                      <Image src={c.logo} alt="" width={36} height={36} className="h-9 w-9 rounded-lg object-contain" />
                      <span className="text-[11px] text-muted">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      {/* 11. Ecosystem Graph */}
      <section className="page mt-6">
        <Panel title="AI Ecosystem Graph" n={11}>
          <div className="grid gap-4 lg:grid-cols-[160px_1fr]">
            <GraphLegend />
            <EcosystemGraph />
          </div>
        </Panel>
      </section>

      {/* 12 + 13. News + Jobs */}
      <section className="page mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="News" n={12} cta="View all news">
          <ul className="divide-y divide-line">
            {openaiNews.map((nws) => (
              <li key={nws.title} className="flex items-center justify-between gap-4 py-2.5">
                <span className="text-sm">{nws.title}</span>
                <span className="whitespace-nowrap text-xs text-muted">{nws.date}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Open Jobs" n={13} cta="View all jobs">
          <ul className="divide-y divide-line">
            {openaiJobs.map((j) => (
              <li key={j.title} className="flex items-center justify-between gap-4 py-2.5">
                <div>
                  <p className="text-sm font-medium">{j.title}</p>
                  <p className="text-xs text-muted">{j.team} · {j.location}</p>
                </div>
                <span className="whitespace-nowrap text-xs text-muted">{j.type}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      {/* 14 + 15. Patents */}
      <section className="page mt-6">
        <Panel title="Patents" n={15} cta="View all patents">
          <SimpleTable
            head={['Patent', 'Category', 'Filed', 'Published']}
            rows={openaiPatents.map((p) => [p.patent, p.category, p.filed, p.published])}
          />
        </Panel>
      </section>

      {/* 16 + 17. Alumni + Collections */}
      <section className="page mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Alumni Companies" n={16} cta="View all alumni companies">
          <div className="flex flex-wrap gap-2">
            {openaiAlumni.map((a) => (
              <span key={a} className="pill">{a}</span>
            ))}
          </div>
        </Panel>
        <Panel title="Collections" n={17} cta="View all collections">
          <div className="flex flex-wrap gap-2">
            {openaiCollections.map((c) => (
              <span key={c} className="pill">{c}</span>
            ))}
          </div>
        </Panel>
      </section>
    </>
  );
}

/* ============================ CONDENSED (others) ============================ */
function CondensedBody({ company }: { company: { name: string; category: string; funding_total: number; valuation: number; growth_score: number; trending_score: number } }) {
  const stats = [
    { label: 'Total Funding', value: company.funding_total ? `$${(company.funding_total / 1e9 >= 1 ? (company.funding_total / 1e9).toFixed(1) + 'B' : Math.round(company.funding_total / 1e6) + 'M')}` : 'Undisclosed' },
    { label: 'Valuation', value: company.valuation ? `$${(company.valuation / 1e9).toFixed(company.valuation / 1e9 >= 10 ? 0 : 1)}B` : '—' },
    { label: 'Growth Score', value: String(company.growth_score) },
    { label: 'Trending Score', value: String(company.trending_score) },
  ];
  return (
    <section className="page mt-6 grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Panel title="About" n={1}>
          <p className="text-sm leading-relaxed text-muted">
            {company.name} is a leading company in the {company.category} category, tracked on GraphOne’s intelligence
            layer for the AI economy. Explore funding, investors, products and ecosystem relationships across the graph.
          </p>
        </Panel>
      </div>
      <Panel title="Key Facts" n={2}>
        <dl className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-xs text-muted">{s.label}</dt>
              <dd className="text-lg font-bold text-accent">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </section>
  );
}

/* ============================ shared bits ============================ */
function Panel({ title, n, cta, children }: { title: string; n: number; cta?: string; children: React.ReactNode }) {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-bold">{n}. {title}</h2>
        {cta && <Link href="#" className="link-accent text-xs">{cta} <ArrowRight className="h-3 w-3" /></Link>}
      </div>
      {children}
    </div>
  );
}

function SimpleTable({ head, rows, logos }: { head: string[]; rows: string[][]; logos?: string[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-xs uppercase text-ink-soft">
          {head.map((h) => (
            <th key={h} className="pb-2 font-medium">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-t border-line">
            {r.map((cell, j) => (
              <td key={j} className="py-2.5">
                {j === 0 && logos ? (
                  <span className="flex items-center gap-2 font-semibold">
                    <Image src={logos[i]} alt="" width={22} height={22} className="h-[22px] w-[22px] rounded object-contain" />
                    {cell}
                  </span>
                ) : (
                  <span className={j === 0 ? 'font-semibold' : 'text-muted'}>{cell}</span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

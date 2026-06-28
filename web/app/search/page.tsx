import { Search } from 'lucide-react';
import Link from 'next/link';
import Image from '@/components/SmartImage';
import { categories, companies, founders, investors } from '@/lib/data';
import { money } from '@/lib/format';

export const metadata = { title: 'Search — GraphOne' };

// Cross-entity search results. Driven by the ?q= param via a native GET form,
// so every search box across the site (home, investors, products) and the
// command palette point here. Filters the typed dataset that powers the UI.
export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? '').trim();
  const needle = q.toLowerCase();
  const has = (s: string) => s.toLowerCase().includes(needle);

  const companyHits = q ? companies.filter((c) => has(c.name) || has(c.category) || has(c.description)) : [];
  const founderHits = q ? founders.filter((f) => has(f.name) || has(f.title) || has(f.companyName)) : [];
  const investorHits = q ? investors.filter((i) => has(i.name) || has(i.tagline) || i.sector_focus.some(has)) : [];
  const categoryHits = q ? categories.filter((c) => has(c.name)) : [];
  const total = companyHits.length + founderHits.length + investorHits.length + categoryHits.length;

  return (
    <div className="page min-h-[60vh] pb-16 pt-10">
      <form action="/search" className="flex items-center gap-2 rounded-full border border-line bg-[var(--card)] p-1.5 shadow-card">
        <Search className="ml-3 h-4 w-4 text-ink-soft" />
        <input
          name="q"
          defaultValue={q}
          autoFocus
          placeholder="Search companies, categories, investors…"
          className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-ink-soft"
        />
        <button type="submit" className="btn-accent h-10">Search</button>
      </form>

      {q && (
        <p className="mt-5 text-sm text-muted">
          {total} result{total === 1 ? '' : 's'} for <span className="font-semibold text-ink">“{q}”</span>
        </p>
      )}

      {!q && <p className="mt-8 text-muted">Type a company, category or investor to search the graph.</p>}

      {q && total === 0 && (
        <div className="mt-10 text-center">
          <p className="text-lg font-semibold">No results for “{q}”.</p>
          <p className="mt-1 text-sm text-muted">Try a company name like “Cursor” or a category like “AI Agents”.</p>
        </div>
      )}

      {companyHits.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-soft">Companies · {companyHits.length}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {companyHits.map((c) => (
              <Link key={c.id} href={`/companies/${c.slug}`} className="card flex items-center gap-3 p-4 transition hover:shadow-hover">
                <Image src={c.logo} name={c.name} width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-muted">{c.category} · {c.stage}</p>
                </div>
                {c.valuation > 0 && <span className="text-xs font-semibold text-accent">{money(c.valuation)}</span>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {founderHits.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-soft">Founders · {founderHits.length}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {founderHits.map((f) => (
              <Link key={f.id} href={`/companies/${f.companySlug}`} className="card flex items-center gap-3 p-4 transition hover:shadow-hover">
                <Image src={f.photo} name={f.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{f.name}</p>
                  <p className="truncate text-xs text-muted">{f.title} · {f.companyName}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {investorHits.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-soft">Investors · {investorHits.length}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {investorHits.map((i) => (
              <Link key={i.id} href={`/investors/${i.slug}`} className="card flex items-center gap-3 p-4 transition hover:shadow-hover">
                <Image src={i.logo} name={i.name} width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{i.name}</p>
                  <p className="truncate text-xs text-muted">{i.type} · {i.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {categoryHits.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink-soft">Categories · {categoryHits.length}</h2>
          <div className="flex flex-wrap gap-2">
            {categoryHits.map((c) => (
              <span key={c.slug} className="pill">{c.name} · {c.count} companies</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

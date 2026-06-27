'use client';

import { ArrowRight, Flame, Heart, MessageSquare, Search, Sparkles } from 'lucide-react';
import Image from '@/components/SmartImage';
import Link from 'next/link';
import { useState } from 'react';
import { NewsletterForm } from '@/components/NewsletterForm';
import { companies } from '@/lib/data';
import { compact } from '@/lib/format';

const logo = (d: string) => `https://unavatar.io/${d}`;

interface ProductRow {
  name: string;
  sub: string;
  domain: string;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  badge?: string;
}

const products: ProductRow[] = [
  { name: 'Cursor', sub: 'The AI-first code editor built for speed and productivity.', domain: 'cursor.com', category: 'Code', tags: ['Code', 'Productivity'], likes: 8300, comments: 173, badge: 'Trending in Coding' },
  { name: 'Claude', sub: 'AI assistant for thoughtful work and collaboration.', domain: 'anthropic.com', category: 'Chat', tags: ['Chat', 'Productivity'], likes: 6700, comments: 201, badge: 'Most used this week' },
  { name: 'Midjourney', sub: 'AI image generation for creators and designers.', domain: 'midjourney.com', category: 'Image', tags: ['Image', 'Design'], likes: 5500, comments: 184, badge: 'Top rated in Image' },
  { name: 'ChatGPT', sub: 'Conversational AI for the questions of everyone.', domain: 'openai.com', category: 'Chat', tags: ['Chat', 'Artificial Intelligence'], likes: 6900, comments: 341, badge: 'Most used this week' },
  { name: 'Runway', sub: 'AI video creation platform for everyone.', domain: 'runwayml.com', category: 'Video', tags: ['Video', 'Creative'], likes: 3900, comments: 210, badge: 'Fastest growing' },
  { name: 'ElevenLabs', sub: 'AI voice synthesis and audio tools.', domain: 'elevenlabs.io', category: 'Voice', tags: ['Voice', 'Audio'], likes: 5100, comments: 170, badge: 'Trending in Voice' },
  { name: 'Perplexity', sub: 'AI search engine for real-time answers.', domain: 'perplexity.ai', category: 'Search', tags: ['Search', 'Productivity'], likes: 7500, comments: 144, badge: 'Most used this week' },
  { name: 'Notion AI', sub: 'AI notes, docs and knowledge workspace.', domain: 'notion.so', category: 'Productivity', tags: ['Productivity', 'Writing'], likes: 7600, comments: 128 },
  { name: 'Descript', sub: 'Edit audio and video like a doc.', domain: 'descript.com', category: 'Video', tags: ['Video', 'Audio'], likes: 3100, comments: 90 },
  { name: 'Canva', sub: 'Design anything with AI, together.', domain: 'canva.com', category: 'Design', tags: ['Design', 'Productivity'], likes: 3900, comments: 85 },
];

const tabs = ['All', 'Chat', 'Code', 'Agents', 'Image', 'Video', 'Voice', 'Productivity'];

const trendingSearches = ['Cursor', 'Claude', 'Vibe Coding', 'Lovable', 'Perplexity', 'Midjourney', 'Runway', 'MCP', 'AI agents', 'AI Notetaker'];

export default function ProductsPage() {
  const [tab, setTab] = useState('All');
  const [sort, setSort] = useState<'popular' | 'newest'>('popular');
  const filtered = products
    .filter((p) => tab === 'All' || p.category === tab)
    .sort((a, b) => (sort === 'popular' ? b.likes - a.likes : 0));

  return (
    <div className="pb-10">
      {/* hero band */}
      <section className="page pt-10">
        <span className="pill border-accent-200 bg-accent-50 text-accent-600"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> LIVE AI INTELLIGENCE</span>
        <h1 className="mt-3 text-[40px] font-extrabold leading-[1.05] tracking-tight">
          The Global Intelligence <span className="text-accent">Layer for AI.</span>
        </h1>
        <p className="mt-3 max-w-lg text-[15px] text-muted">One graph connecting companies, founders, investors, products, funding and news.</p>
        <form action="/search" className="mt-6 flex max-w-2xl items-center gap-2 rounded-full border border-line bg-[var(--card)] p-1.5 shadow-card">
          <Search className="ml-3 h-4 w-4 text-ink-soft" />
          <input name="q" placeholder="Search startups, products, investors, jobs and news" className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-ink-soft" />
          <button type="submit" aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full bg-accent text-white"><ArrowRight className="h-4 w-4" /></button>
        </form>
      </section>

      <section className="page mt-10 grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* main column */}
        <div>
          {/* collection of the week */}
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-accent-50 to-violet-50 p-5 dark:from-accent-900/20 dark:to-violet-900/20">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent"><Flame className="h-3.5 w-3.5" /> COLLECTION OF THE WEEK</span>
              <h3 className="mt-1 text-lg font-bold">Vibe Coding Tools</h3>
              <p className="text-sm text-muted">The best AI tools for vibe coding, building and shipping faster.</p>
            </div>
            <button className="btn-accent shrink-0">Explore Collection <ArrowRight className="h-4 w-4" /></button>
          </div>

          {/* tabs */}
          <div className="mt-5 flex flex-wrap items-center gap-2 border-b border-line pb-3">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${tab === t ? 'bg-accent text-white' : 'text-muted hover:bg-subtle'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* popular right now */}
          <p className="mb-3 mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent"><Flame className="h-3.5 w-3.5" /> Popular right now</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {products.slice(0, 5).map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-2 rounded-xl border border-line p-3 text-center">
                <Image src={logo(p.domain)} alt="" width={32} height={32} className="h-8 w-8 rounded-lg object-contain" />
                <span className="text-xs font-semibold">{p.name}</span>
                <span className="text-[10px] text-muted">{p.category}</span>
              </div>
            ))}
          </div>

          {/* sort row */}
          <div className="mb-2 mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
              <button onClick={() => setSort('popular')} className={`inline-flex items-center gap-1 font-semibold ${sort === 'popular' ? 'text-accent' : 'text-muted'}`}><Flame className="h-3.5 w-3.5" /> Most Popular</button>
              <button onClick={() => setSort('newest')} className={`inline-flex items-center gap-1 font-semibold ${sort === 'newest' ? 'text-accent' : 'text-muted'}`}><Sparkles className="h-3.5 w-3.5" /> Newest</button>
            </div>
            <span className="text-xs text-muted">{companies.length * 900}+ products</span>
          </div>

          {/* product list */}
          <ul className="divide-y divide-line">
            {filtered.map((p) => (
              <li key={p.name} className="flex items-center gap-4 py-4">
                <Image src={logo(p.domain)} alt="" width={44} height={44} className="h-11 w-11 rounded-xl border border-line object-contain p-1" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">{p.name}</p>
                    {p.badge && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">{p.badge}</span>}
                  </div>
                  <p className="truncate text-sm text-muted">{p.sub}</p>
                  <div className="mt-1 flex gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[11px] text-ink-soft">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <span className="inline-flex items-center gap-1"><Heart className="h-4 w-4 text-accent" /> {compact(p.likes)}</span>
                  <span className="inline-flex items-center gap-1"><MessageSquare className="h-4 w-4" /> {p.comments}</span>
                </div>
              </li>
            ))}
          </ul>
          <button className="btn-ghost mt-4 w-full">Load more products</button>
        </div>

        {/* sidebar */}
        <aside className="space-y-5">
          <div className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">🏆 Product of the Day</p>
            <div className="mt-3 flex items-center gap-3">
              <Image src={logo('cursor.com')} alt="" width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />
              <div>
                <p className="text-sm font-bold">Cursor</p>
                <p className="text-xs text-muted">AI-first code editor</p>
              </div>
            </div>
            <button className="btn-accent mt-3 w-full">View Product</button>
          </div>

          <div className="card p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">Trending Searches</p>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((t) => (
                <span key={t} className="pill text-[12px]">{t}</span>
              ))}
            </div>
          </div>

          <div className="card bg-gradient-to-br from-accent-50 to-violet-50 p-5 dark:from-accent-900/20 dark:to-violet-900/20">
            <p className="text-sm font-bold">Stay ahead in AI</p>
            <p className="mt-1 text-xs text-muted">Get weekly updates on new tools and trends.</p>
            <NewsletterForm cta="Subscribe" layout="stack" />
          </div>
        </aside>
      </section>
    </div>
  );
}

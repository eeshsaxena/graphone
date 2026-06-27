import { ExternalLink, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { companies } from '@/lib/data';
import { timeAgo } from '@/lib/format';

const logo = (d: string) => `https://logo.clearbit.com/${d}`;

const news = [
  { title: 'OpenAI launches GPT-4o with multimodal capabilities and native reasoning', tag: 'AI Models', domain: 'openai.com', hours: 2, comments: 24 },
  { title: 'Anthropic releases Claude 3.5 with expanded context window', tag: 'AI Models', domain: 'anthropic.com', hours: 5, comments: 18 },
  { title: 'Cursor raises $900M Series B at a $2.6B valuation', tag: 'Funding', domain: 'cursor.com', hours: 8, comments: 31 },
  { title: 'Mistral AI launches Mistral Large 2, a new flagship model', tag: 'AI Models', domain: 'mistral.ai', hours: 12, comments: 16 },
  { title: 'Perplexity hits 100M queries milestone as AI search booms', tag: 'AI Tools', domain: 'perplexity.ai', hours: 16, comments: 22 },
  { title: 'ElevenLabs launches Voice Design v2 with emotion control', tag: 'AI Tools', domain: 'elevenlabs.io', hours: 20, comments: 8 },
  { title: 'Databricks closes $10B Series J at a $62B valuation', tag: 'Funding', domain: 'databricks.com', hours: 23, comments: 13 },
  { title: 'Runway releases Gen-3 Alpha with cinematic video generation', tag: 'AI Video', domain: 'runwayml.com', hours: 28, comments: 16 },
  { title: 'Cognition unveils Devin, the AI software engineer', tag: 'AI Tools', domain: 'cognition.ai', hours: 30, comments: 11 },
  { title: 'Suno v4 raises the bar for AI-generated music', tag: 'AI Audio', domain: 'suno.com', hours: 34, comments: 19 },
];

const tags = ['All News', 'AI Models', 'AI Tools', 'Funding', 'Research', 'Datasets'];

export default function NewsPage() {
  return (
    <div className="page pb-12 pt-10">
      <span className="pill border-accent-200 bg-accent-50 text-accent-600"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> LIVE AI INTELLIGENCE</span>
      <h1 className="mt-3 text-[36px] font-extrabold tracking-tight">Trending AI News</h1>
      <p className="mt-2 text-[15px] text-muted">Real-time updates on breakthroughs, launches and trends shaping the AI revolution.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="mb-4 flex flex-wrap gap-2 border-b border-line pb-3">
            {tags.map((t, i) => (
              <button key={t} className={`rounded-full px-3 py-1.5 text-sm font-medium ${i === 0 ? 'bg-accent text-white' : 'text-muted hover:bg-subtle'}`}>{t}</button>
            ))}
          </div>
          <ul className="divide-y divide-line">
            {news.map((n, i) => (
              <li key={n.title} className="flex items-center gap-4 py-4">
                <span className="w-6 text-center text-sm font-bold text-ink-soft">{i + 1}</span>
                <Image src={logo(n.domain)} alt="" width={40} height={40} className="h-10 w-10 rounded-lg border border-line object-contain p-1" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-snug">{n.title}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                    <span className="rounded bg-accent-50 px-1.5 py-0.5 font-medium text-accent-600">{n.tag}</span>
                    <span>{timeAgo(new Date(Date.now() - n.hours * 3600_000).toISOString())}</span>
                    <span className="inline-flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {n.comments}</span>
                    <span className="inline-flex items-center gap-1 text-accent">{n.domain} <ExternalLink className="h-3 w-3" /></span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <aside className="space-y-5">
          <div className="card p-5">
            <p className="mb-3 text-sm font-bold">Trending Tags</p>
            <div className="flex flex-wrap gap-2">
              {['Large Language Models', 'AI Models', 'Open Source', 'Funding & Deals', 'AI Research', 'Multimodal'].map((t) => (
                <span key={t} className="pill text-[12px]"># {t}</span>
              ))}
            </div>
          </div>
          <div className="card p-5">
            <p className="mb-3 text-sm font-bold">Trending Startups</p>
            <ul className="space-y-3">
              {companies.slice(0, 5).map((c) => (
                <li key={c.id} className="flex items-center gap-2">
                  <Image src={c.logo} alt="" width={24} height={24} className="h-6 w-6 rounded object-contain" />
                  <span className="text-sm font-medium">{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

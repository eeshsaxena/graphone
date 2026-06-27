import { ArrowUpRight } from 'lucide-react';
import Image from '@/components/SmartImage';
import Link from 'next/link';
import { companies } from '@/lib/data';
import { money } from '@/lib/format';

const stats = [
  { value: '$542B', label: 'Funding Tracked', delta: '18%' },
  { value: '18,420', label: 'Funding Rounds', delta: '16%' },
  { value: '4,800', label: 'Funded Startups', delta: '16%' },
  { value: '7,320', label: 'Active Investors', delta: '12%' },
  { value: '214', label: 'Acquisitions', delta: '20%' },
  { value: '38', label: 'AI Unicorns', delta: '19%' },
];

const biggest = [
  { name: 'OpenAI', domain: 'openai.com', amount: '$40B', round: 'Series F', lead: 'Microsoft' },
  { name: 'Anthropic', domain: 'anthropic.com', amount: '$4B', round: 'Series E', lead: 'Amazon' },
  { name: 'Cursor', domain: 'cursor.com', amount: '$900M', round: 'Series C', lead: 'Thrive Capital' },
  { name: 'Perplexity', domain: 'perplexity.ai', amount: '$500M', round: 'Series D', lead: 'NEA' },
  { name: 'ElevenLabs', domain: 'elevenlabs.io', amount: '$180M', round: 'Series C', lead: 'ICONIQ' },
];

export default function FundingPage() {
  return (
    <div className="page pb-12 pt-10">
      <h1 className="text-[40px] font-extrabold leading-tight tracking-tight">Follow the capital<br /> behind the AI economy</h1>
      <p className="mt-3 max-w-lg text-[15px] text-muted">Track every funding round, acquisition, investor activity and capital trend shaping the future of artificial intelligence.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="card p-4">
            <p className="text-xl font-extrabold">{s.value}</p>
            <p className="text-xs text-muted">{s.label}</p>
            <p className="mt-1 inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600"><ArrowUpRight className="h-3 w-3" /> {s.delta} vs last year</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 mt-10 text-[17px] font-bold">Biggest funding rounds</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {biggest.map((b) => (
          <div key={b.name} className="card p-5 text-center">
            <Image src={`https://unavatar.io/${b.domain}`} name={b.name} alt={b.name} width={40} height={40} className="mx-auto h-10 w-10 rounded-lg object-contain" />
            <p className="mt-3 text-2xl font-extrabold text-accent">{b.amount}</p>
            <p className="text-sm font-semibold">{b.name}</p>
            <p className="text-xs text-muted">{b.round}</p>
            <p className="mt-2 text-[11px] text-ink-soft">Lead investor</p>
            <p className="text-xs font-medium">{b.lead}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-4 mt-10 text-[17px] font-bold">New AI unicorns</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {companies.filter((c) => c.is_unicorn).slice(0, 6).map((c) => (
          <Link key={c.id} href={`/companies/${c.slug}`} className="card flex items-center gap-3 p-4 transition hover:shadow-hover">
            <Image src={c.logo} alt="" width={36} height={36} className="h-9 w-9 rounded-lg object-contain" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{c.name}</p>
              <p className="text-xs text-muted">{c.category}</p>
            </div>
            <span className="text-sm font-bold text-accent">{money(c.valuation)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

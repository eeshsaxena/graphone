import { Activity } from 'lucide-react';
import { LiveStats } from '@/lib/live';
import { money } from '@/lib/format';

// Thin "live from the API" strip. Rendered with real data fetched server-side
// from the deployed GraphOne API when available; the home page passes mock-derived
// numbers as a fallback so this always renders something sensible.
export function LiveStatsBar({ stats, live }: { stats: LiveStats; live: boolean }) {
  const items = [
    { value: stats.company_count.toLocaleString(), label: 'AI Companies' },
    { value: stats.investor_count.toLocaleString(), label: 'Investors' },
    { value: money(stats.total_funding), label: 'Funding Tracked' },
    { value: stats.unicorn_count.toLocaleString(), label: 'Unicorns' },
    { value: stats.news_count.toLocaleString(), label: 'News Items' },
  ];
  return (
    <div className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
      <div className="flex shrink-0 items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          {live && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
          <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${live ? 'bg-emerald-500' : 'bg-ink-soft'}`} />
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
          <Activity className="h-3.5 w-3.5 text-accent" />
          {live ? 'Live from the GraphOne API' : 'GraphOne intelligence graph'}
        </span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-5">
        {items.map((i) => (
          <div key={i.label} className="text-center sm:text-left">
            <p className="text-lg font-extrabold tabular-nums">{i.value}</p>
            <p className="text-[11px] text-muted">{i.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

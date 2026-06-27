import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Numbered section header used across the home page rails.
export function SectionHeader({
  num,
  title,
  subtitle,
  href = '#',
  cta = 'View all',
}: {
  num?: number;
  title: string;
  subtitle?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          {num !== undefined && <span className="section-num">{num}</span>}
          <h2 className="text-[17px] font-bold tracking-tight">{title}</h2>
        </div>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      <Link href={href} className="link-accent shrink-0 text-muted hover:text-accent">
        {cta}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>;
}

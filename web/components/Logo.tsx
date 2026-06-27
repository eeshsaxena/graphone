import Link from 'next/link';

// GraphOne wordmark + faceted cube mark.
export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 shadow-sm">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none">
          <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12 2v9m0 0l8-4.5M12 11l-8-4.5M12 11v9" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
        </svg>
      </span>
      <span className="text-[18px] font-bold tracking-tight">GraphOne</span>
    </Link>
  );
}

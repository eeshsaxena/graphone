'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Image from '@/components/SmartImage';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { companies, founders, investors } from '@/lib/data';

interface Props {
  open: boolean;
  onClose: () => void;
}

// Cross-entity search palette. Opened with the "/" shortcut (see Navbar).
export function CommandSearch({ open, onClose }: Props) {
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
    else setQ('');
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return { companies: companies.slice(0, 5), founders: [], investors: investors.slice(0, 3) };
    return {
      companies: companies.filter((c) => c.name.toLowerCase().includes(needle) || c.category.toLowerCase().includes(needle)).slice(0, 6),
      founders: founders.filter((f) => f.name.toLowerCase().includes(needle) || f.companyName.toLowerCase().includes(needle)).slice(0, 4),
      investors: investors.filter((i) => i.name.toLowerCase().includes(needle)).slice(0, 4),
    };
  }, [q]);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="card w-full max-w-xl overflow-hidden"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <Search className="h-5 w-5 text-ink-soft" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && q.trim()) go(`/search?q=${encodeURIComponent(q.trim())}`);
                }}
                placeholder="Search companies, founders, investors… (Enter for all results)"
                className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-ink-soft"
              />
              <button onClick={onClose} className="rounded-md p-1 text-ink-soft hover:bg-subtle">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {results.companies.length > 0 && (
                <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">Companies</p>
              )}
              {results.companies.map((c) => (
                <button
                  key={c.id}
                  onClick={() => go(`/companies/${c.slug}`)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-subtle"
                >
                  <Image src={c.logo} alt="" width={28} height={28} className="h-7 w-7 rounded-md object-contain" />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold">{c.name}</span>
                    <span className="block text-xs text-muted">{c.category}</span>
                  </span>
                </button>
              ))}
              {results.founders.length > 0 && (
                <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">Founders</p>
              )}
              {results.founders.map((f) => (
                <button
                  key={f.id}
                  onClick={() => go(`/companies/${f.companySlug}`)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-subtle"
                >
                  <Image src={f.photo} alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold">{f.name}</span>
                    <span className="block text-xs text-muted">{f.title} · {f.companyName}</span>
                  </span>
                </button>
              ))}
              {results.investors.length > 0 && (
                <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">Investors</p>
              )}
              {results.investors.map((i) => (
                <button
                  key={i.id}
                  onClick={() => go(`/investors/${i.slug}`)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-subtle"
                >
                  <Image src={i.logo} alt="" width={28} height={28} className="h-7 w-7 rounded-md object-contain" />
                  <span className="flex-1 text-sm font-semibold">{i.name}</span>
                  <span className="text-xs text-muted">{i.type}</span>
                </button>
              ))}
              {results.companies.length === 0 && results.founders.length === 0 && results.investors.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted">No results for “{q}”.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

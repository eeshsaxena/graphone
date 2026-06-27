'use client';

import { Menu, Moon, Search, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { CommandSearch } from './CommandSearch';
import { useTheme } from './ThemeProvider';

const links = [
  { label: 'Companies', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Investors', href: '/investors' },
  { label: 'Funding', href: '/funding' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'News', href: '/news' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const pathname = usePathname();

  // "/" focuses search (ignored while typing in an input)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      const typing = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable;
      if (e.key === '/' && !typing) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[var(--bg)]/85 backdrop-blur">
      <div className="page flex h-16 items-center gap-4">
        <Logo />

        <nav className="ml-4 hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[14px] font-medium transition hover:text-accent ${
                isActive(l.href) ? 'text-accent' : 'text-muted'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setSearchOpen(true)}
          className="ml-auto hidden h-10 w-64 items-center gap-2 rounded-full border border-line bg-subtle px-4 text-sm text-ink-soft transition hover:border-accent-200 md:flex"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search…</span>
          <kbd className="rounded border border-line bg-[var(--bg)] px-1.5 text-xs">/</kbd>
        </button>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button onClick={() => setSearchOpen(true)} className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden">
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:text-accent"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <Link href="#" className="hidden text-sm font-semibold text-muted hover:text-accent sm:block">
            Log in
          </Link>
          <Link href="#" className="btn-accent hidden sm:inline-flex">
            Sign up
          </Link>
          <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-[var(--bg)] lg:hidden">
          <nav className="page flex flex-col py-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-muted">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <CommandSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

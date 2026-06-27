import Link from 'next/link';
import { Logo } from './Logo';

const cols = [
  { title: 'Platform', items: ['For Founders', 'For Investors', 'AI News', 'AI Products', 'AI Jobs'] },
  { title: 'Resources', items: ['Blog', 'Research', 'Reports', 'API', 'Help Center'] },
  { title: 'Company', items: ['About', 'Careers', 'Contact', 'Privacy', 'Terms'] },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-subtle">
      <div className="page grid grid-cols-2 gap-8 py-12 md:grid-cols-5">
        <div className="col-span-2">
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted">
            The intelligence layer for the AI economy. One graph connecting companies, founders, investors, products and funding.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-semibold">{c.title}</p>
            <ul className="mt-3 space-y-2">
              {c.items.map((i) => (
                <li key={i}>
                  <Link href="#" className="text-sm text-muted transition hover:text-accent">
                    {i}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="page flex flex-col items-center justify-between gap-3 py-5 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} GraphOne. All rights reserved.</p>
          <p>Built for the GraphOne engineering trial.</p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';

// Functional newsletter signup with inline validation + success state. No
// backend wired (demo), but it behaves like a real form instead of a dead input.
export function NewsletterForm({ cta = 'Subscribe', layout = 'stack' }: { cta?: string; layout?: 'row' | 'stack' }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError(true);
      return;
    }
    setError(false);
    setDone(true);
  };

  if (done) {
    return (
      <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700">
        <Check className="h-4 w-4" /> You’re on the list — welcome to GraphOne.
      </p>
    );
  }

  const input = (
    <input
      type="email"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        setError(false);
      }}
      placeholder="Enter your email"
      aria-invalid={error}
      className={`rounded-full border bg-[var(--card)] px-4 text-sm outline-none transition focus:border-accent-300 ${
        error ? 'border-accent' : 'border-line'
      } ${layout === 'row' ? 'h-11 flex-1' : 'mt-3 h-10 w-full'}`}
    />
  );

  if (layout === 'row') {
    return (
      <form onSubmit={submit} className="w-full max-w-sm">
        <div className="flex items-center gap-2">
          {input}
          <button type="submit" className="btn-accent h-11 whitespace-nowrap">{cta}</button>
        </div>
        {error && <p className="mt-1 pl-4 text-xs text-accent">Please enter a valid email.</p>}
      </form>
    );
  }

  return (
    <form onSubmit={submit}>
      {input}
      <button type="submit" className="btn-accent mt-2 w-full">{cta}</button>
      {error && <p className="mt-1 text-xs text-accent">Please enter a valid email.</p>}
    </form>
  );
}

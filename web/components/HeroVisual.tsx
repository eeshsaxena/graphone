'use client';

import { motion } from 'framer-motion';
import { AudioLines, Search, Sparkles, Workflow } from 'lucide-react';

const tiles = [
  { Icon: Sparkles, x: '8%', y: '6%', delay: 0, tint: 'text-accent' },
  { Icon: Workflow, x: '62%', y: '0%', delay: 0.6, tint: 'text-orange-500' },
  { Icon: AudioLines, x: '70%', y: '52%', delay: 1.1, tint: 'text-accent' },
  { Icon: Search, x: '24%', y: '58%', delay: 0.3, tint: 'text-violet-500' },
];

// Animated hero: floating frosted tiles with a connecting orbit, echoing the
// reference home page's right-side graphic.
export function HeroVisual() {
  return (
    <div className="relative hidden h-[300px] w-full lg:block">
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-100/50 blur-3xl dark:bg-accent-900/20" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" fill="none">
        <ellipse cx="200" cy="150" rx="150" ry="90" stroke="var(--line)" strokeDasharray="3 5" />
        <circle cx="350" cy="120" r="3" fill="#F0285A" />
        <circle cx="60" cy="210" r="3" fill="#F89BB3" />
        <circle cx="300" cy="240" r="3" fill="#F0285A" opacity="0.5" />
      </svg>
      {tiles.map(({ Icon, x, y, delay, tint }, i) => (
        <motion.div
          key={i}
          className="absolute grid h-16 w-16 place-items-center rounded-2xl border border-line bg-[var(--card)] shadow-pop"
          style={{ left: x, top: y }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          <Icon className={`h-6 w-6 ${tint}`} />
        </motion.div>
      ))}
    </div>
  );
}

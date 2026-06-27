'use client';

import { motion } from 'framer-motion';
import Image from '@/components/SmartImage';
import { openaiGraph } from '@/lib/detail';

// Radial 1-hop ecosystem graph (section 11 of the company detail reference).
// Groups fan out around the company at the centre; edges are drawn in SVG.
export function EcosystemGraph() {
  const { center, groups } = openaiGraph;
  const flat: { label: string; color: string; angle: number; r: number }[] = [];
  const total = groups.reduce((n, g) => n + g.nodes.length, 0);
  let idx = 0;
  groups.forEach((g) => {
    g.nodes.forEach((label) => {
      const angle = (idx / total) * Math.PI * 2 - Math.PI / 2;
      const r = 38 + (idx % 2) * 6; // percent radius, slight stagger
      flat.push({ label, color: g.color, angle, r });
      idx++;
    });
  });

  const pos = (angle: number, r: number) => ({
    left: `${50 + Math.cos(angle) * r}%`,
    top: `${50 + Math.sin(angle) * r * 1.25}%`,
  });

  return (
    <div className="relative h-[440px] w-full overflow-hidden rounded-xl">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {flat.map((n, i) => {
          const p = pos(n.angle, n.r);
          return (
            <line
              key={i}
              x1="50%"
              y1="50%"
              x2={p.left}
              y2={p.top}
              stroke={n.color}
              strokeOpacity="0.25"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* centre node */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-accent-200 bg-[var(--card)] shadow-pop">
          <Image src={center.logo} alt={center.label} width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />
        </div>
      </div>

      {flat.map((n, i) => (
        <motion.div
          key={n.label}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={pos(n.angle, n.r)}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.02 }}
        >
          <span
            className="whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium shadow-sm"
            style={{ borderColor: n.color, color: n.color, background: 'var(--card)' }}
          >
            {n.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function GraphLegend() {
  return (
    <ul className="space-y-2 text-sm">
      {openaiGraph.groups.map((g) => (
        <li key={g.kind} className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: g.color }} />
          <span className="text-muted">{g.kind}</span>
        </li>
      ))}
    </ul>
  );
}

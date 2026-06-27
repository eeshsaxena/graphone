'use client';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

interface Slice {
  label: string;
  value: number;
  color: string;
}

// Donut used for OpenAI ownership and Sequoia portfolio concentration.
export function Donut({ data, size = 180 }: { data: Slice[]; size?: number }) {
  return (
    <div className="flex items-center gap-6">
      <div style={{ width: size, height: size }} className="shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius="62%"
              outerRadius="100%"
              paddingAngle={2}
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((d) => (
                <Cell key={d.label} fill={d.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="flex-1 space-y-2.5">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2.5 text-sm">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
            <span className="font-semibold tabular-nums">{d.value}%</span>
            <span className="text-muted">{d.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

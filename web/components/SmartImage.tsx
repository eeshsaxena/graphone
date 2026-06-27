'use client';

import { useState } from 'react';

// Drop-in replacement for next/image used for logos & avatars. If the remote
// image fails to load (host down, rate-limited, unknown domain), it renders a
// branded initials tile instead of an empty/broken placeholder — guaranteeing
// the UI never shows a blank box. Same prop surface as next/image so existing
// usages work unchanged.

interface Props {
  src: string;
  alt?: string;
  /** explicit label for the fallback initials; defaults to alt, then the src */
  name?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const PALETTE = ['#F0285A', '#6366f1', '#0ea5e9', '#10b981', '#a855f7', '#f59e0b', '#ef4444', '#14b8a6'];

function colorFor(label: string): string {
  let h = 0;
  for (let i = 0; i < label.length; i++) h = (h * 31 + label.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

function labelFrom(name: string | undefined, alt: string | undefined, src: string): string {
  if (name && name.trim()) return name.trim();
  if (alt && alt.trim()) return alt.trim();
  try {
    const u = new URL(src);
    const q = u.searchParams.get('u');
    if (q) return q;
    if (u.pathname.length > 1) return u.pathname.replace(/^\//, '');
    return u.hostname;
  } catch {
    return src || '?';
  }
}

function initials(label: string): string {
  const cleaned = label
    .replace(/^https?:\/\//, '')
    .replace(/\.(com|ai|io|dev|so|co|net|org|app|art)$/i, '')
    .replace(/[^a-zA-Z0-9 .\-_]/g, '');
  const parts = cleaned.split(/[\s.\-_]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return '•';
}

export default function SmartImage({ src, alt = '', name, width, height, className = '' }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    const label = labelFrom(name, alt, src);
    const isAvatar = /pravatar|avatar|\bu=/.test(src);
    return (
      <svg viewBox="0 0 40 40" role="img" aria-label={label} className={className}>
        <rect width="40" height="40" rx={isAvatar ? 20 : 9} fill={colorFor(label)} />
        <text x="20" y="21" dominantBaseline="central" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">
          {initials(label)}
        </text>
      </svg>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

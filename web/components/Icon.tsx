import {
  AudioLines,
  BarChart3,
  Bot,
  Boxes,
  Briefcase,
  Building2,
  Code2,
  Cpu,
  Handshake,
  HeartPulse,
  Search,
  Server,
  Sparkles,
  Sprout,
  TrendingUp,
  Users,
  Video,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  AudioLines, BarChart3, Bot, Boxes, Briefcase, Building2, Code2, Cpu, Handshake,
  HeartPulse, Search, Server, Sparkles, Sprout, TrendingUp, Users, Video,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} />;
}

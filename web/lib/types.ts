export interface Company {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  logo: string;
  stage: string;
  funding_total: number;
  valuation: number;
  employee_count: number;
  founded_year: number;
  hq: string;
  is_unicorn: boolean;
  growth_score: number;
  trending_score: number;
  views_7d: number;
  rank?: number;
  /** optional gradient for hero/feature cards */
  gradient?: string;
}

export interface Investor {
  id: string;
  name: string;
  slug: string;
  type: 'VC' | 'Angel' | 'Corporate';
  tagline: string;
  logo: string;
  location: string;
  founded_year: number;
  portfolio_count: number;
  sector_focus: string[];
  stage_focus: string[];
  gradient?: string;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
  icon: string;
}

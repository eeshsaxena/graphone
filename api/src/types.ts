// ---- GraphOne core entity model ----
// Mirrors the SQL schema in db/migration.sql. These are the canonical shapes
// the API serves and the seed data conforms to.

export type CompanyStage =
  | 'Pre-Seed'
  | 'Seed'
  | 'Series A'
  | 'Series B'
  | 'Series C'
  | 'Series D'
  | 'Series E'
  | 'Series F'
  | 'Series J'
  | 'Growth'
  | 'Public'
  | 'Private';

export type InvestorType = 'VC' | 'Angel' | 'Corporate';

export interface Company {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  funding_total: number; // USD
  employee_count: number;
  founded_year: number;
  hq_city: string;
  hq_country: string;
  logo_url: string;
  website: string;
  stage: CompanyStage;
  is_unicorn: boolean;
  valuation: number; // USD, 0 if undisclosed
  growth_score: number; // 0-100, momentum signal (added in spec update)
  last_scraped_at: string; // ISO timestamp (added in spec update)
  data_confidence_score: number; // 0-1, completeness/quality (added in spec update)
  // views in the trailing 7d window — drives trending velocity
  views_7d: number;
  views_prev_7d: number;
}

export interface Investor {
  id: string;
  name: string;
  slug: string;
  type: InvestorType;
  bio: string;
  aum: number; // assets under management, USD
  portfolio_count: number;
  stage_focus: string[];
  sector_focus: string[];
  location: string;
  logo_url: string;
  avg_check_size: number; // USD (added in spec update)
  fund_number: number; // e.g. Fund III -> 3 (added in spec update)
}

export interface FundingRound {
  id: string;
  company_id: string;
  round_type: string; // Seed, Series A, ...
  amount: number; // USD
  currency: string;
  date: string; // ISO date
  lead_investor_id: string | null;
  co_investors: string[]; // investor ids
}

export interface Founder {
  id: string;
  name: string;
  slug: string;
  title: string;
  company_id: string;
  bio: string;
  twitter: string | null;
  linkedin: string | null;
  location: string;
  photo_url: string;
}

export interface Product {
  id: string;
  company_id: string;
  name: string;
  description: string;
  category: string; // Chat, Code, Image, Video, Voice, ...
  launch_date: string; // ISO date
  upvotes: number;
  website_url: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  url: string;
  published_at: string; // ISO timestamp
  source: string;
  tag: string;
  related_company_ids: string[];
  summary: string;
}

// ---- New entities added in the spec update ----

export interface Tag {
  id: string;
  name: string;
  slug: string;
  kind: 'category' | 'sector' | 'theme';
}

export type RelationshipType =
  | 'competitor'
  | 'investor'
  | 'acquisition'
  | 'alumni'
  | 'product';

export interface CompanyRelationship {
  id: string;
  from_company_id: string;
  to_company_id: string | null; // null when the related node is an investor/product, see related_label
  type: RelationshipType;
  related_label: string; // human label for the far node (e.g. "Microsoft", "ChatGPT")
  weight: number; // strength of the edge, 0-1
}

// ---- Composite / response-only shapes ----

export interface CompanyWithTrending extends Company {
  trending_score: number;
  view_velocity: number;
}

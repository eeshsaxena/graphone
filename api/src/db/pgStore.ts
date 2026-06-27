import { Pool } from 'pg';
import {
  Company,
  CompanyRelationship,
  Founder,
  FundingRound,
  Investor,
  NewsArticle,
  Product,
  Tag,
} from '../types';
import { DataStoreState } from './dataStore';

// Postgres read/write helpers. Reads hydrate the in-memory DataStore on boot;
// writes persist new rows. Column names map 1:1 to db/migration.sql.

export async function hydrateFromPostgres(pool: Pool): Promise<DataStoreState> {
  const [companies, investors, founders, products, rounds, news, tags, rels] = await Promise.all([
    pool.query('SELECT * FROM companies'),
    pool.query('SELECT * FROM investors'),
    pool.query('SELECT * FROM founders'),
    pool.query('SELECT * FROM products'),
    pool.query('SELECT * FROM funding_rounds'),
    pool.query('SELECT * FROM news_articles'),
    pool.query('SELECT * FROM tags'),
    pool.query('SELECT * FROM company_relationships'),
  ]);

  return {
    companies: companies.rows.map(rowToCompany),
    investors: investors.rows.map(rowToInvestor),
    founders: founders.rows.map(rowToFounder),
    products: products.rows.map(rowToProduct),
    fundingRounds: rounds.rows.map(rowToRound),
    news: news.rows.map(rowToNews),
    tags: tags.rows.map((r) => r as Tag),
    relationships: rels.rows.map(rowToRel),
  };
}

export async function insertCompany(pool: Pool, c: Company): Promise<void> {
  await pool.query(
    `INSERT INTO companies
      (id, name, slug, description, category, funding_total, employee_count, founded_year,
       hq_city, hq_country, logo_url, website, stage, is_unicorn, valuation, growth_score,
       last_scraped_at, data_confidence_score, views_7d, views_prev_7d)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)`,
    [
      c.id, c.name, c.slug, c.description, c.category, c.funding_total, c.employee_count,
      c.founded_year, c.hq_city, c.hq_country, c.logo_url, c.website, c.stage, c.is_unicorn,
      c.valuation, c.growth_score, c.last_scraped_at, c.data_confidence_score, c.views_7d, c.views_prev_7d,
    ],
  );
}

export async function insertClaim(pool: Pool, claim: Record<string, unknown>): Promise<void> {
  await pool.query(
    `INSERT INTO company_claims (id, company_id, claimant_name, claimant_email, role, proof_url, message, status, created_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    [
      claim.id, claim.company_id, claim.claimant_name, claim.claimant_email,
      claim.role, claim.proof_url ?? null, claim.message ?? null, claim.status, claim.created_at,
    ],
  );
}

// ---- row mappers (Postgres returns snake_case + JS-native types) ----------
const num = (v: unknown) => (v === null || v === undefined ? 0 : Number(v));
const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : String(v));

function rowToCompany(r: any): Company {
  return {
    id: r.id, name: r.name, slug: r.slug, description: r.description, category: r.category,
    funding_total: num(r.funding_total), employee_count: num(r.employee_count),
    founded_year: num(r.founded_year), hq_city: r.hq_city, hq_country: r.hq_country,
    logo_url: r.logo_url, website: r.website, stage: r.stage, is_unicorn: Boolean(r.is_unicorn),
    valuation: num(r.valuation), growth_score: num(r.growth_score),
    last_scraped_at: iso(r.last_scraped_at), data_confidence_score: num(r.data_confidence_score),
    views_7d: num(r.views_7d), views_prev_7d: num(r.views_prev_7d),
  };
}
function rowToInvestor(r: any): Investor {
  return {
    id: r.id, name: r.name, slug: r.slug, type: r.type, bio: r.bio, aum: num(r.aum),
    portfolio_count: num(r.portfolio_count), stage_focus: r.stage_focus ?? [],
    sector_focus: r.sector_focus ?? [], location: r.location, logo_url: r.logo_url,
    avg_check_size: num(r.avg_check_size), fund_number: num(r.fund_number),
  };
}
function rowToFounder(r: any): Founder {
  return {
    id: r.id, name: r.name, slug: r.slug, title: r.title, company_id: r.company_id,
    bio: r.bio, twitter: r.twitter, linkedin: r.linkedin, location: r.location, photo_url: r.photo_url,
  };
}
function rowToProduct(r: any): Product {
  return {
    id: r.id, company_id: r.company_id, name: r.name, description: r.description,
    category: r.category, launch_date: iso(r.launch_date).slice(0, 10), upvotes: num(r.upvotes),
    website_url: r.website_url,
  };
}
function rowToRound(r: any): FundingRound {
  return {
    id: r.id, company_id: r.company_id, round_type: r.round_type, amount: num(r.amount),
    currency: r.currency, date: iso(r.date).slice(0, 10), lead_investor_id: r.lead_investor_id,
    co_investors: r.co_investors ?? [],
  };
}
function rowToNews(r: any): NewsArticle {
  return {
    id: r.id, title: r.title, url: r.url, published_at: iso(r.published_at), source: r.source,
    tag: r.tag, related_company_ids: r.related_company_ids ?? [], summary: r.summary,
  };
}
function rowToRel(r: any): CompanyRelationship {
  return {
    id: r.id, from_company_id: r.from_company_id, to_company_id: r.to_company_id,
    type: r.type, related_label: r.related_label, weight: num(r.weight),
  };
}

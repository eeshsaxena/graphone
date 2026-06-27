import { Pool } from 'pg';
import { config } from '../config';
import { seedDataset } from '../data/seed';
import { Company } from '../types';
import { CreateCompanyInput, ClaimCompanyInput } from '../lib/validation';
import { DataStore, DataStoreState } from './dataStore';
import { hydrateFromPostgres, insertCompany, insertClaim } from './pgStore';

// Single Db abstraction the routes depend on. Internally it is backed by either
// the in-memory seed (zero setup) or Supabase/Postgres (write-through).

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function seedState(): DataStoreState {
  // deep-ish clone so the live store never mutates the seed module exports
  return {
    companies: seedDataset.companies.map((c) => ({ ...c })),
    investors: seedDataset.investors.map((i) => ({ ...i })),
    founders: seedDataset.founders.map((f) => ({ ...f })),
    products: seedDataset.products.map((p) => ({ ...p })),
    fundingRounds: seedDataset.fundingRounds.map((r) => ({ ...r })),
    news: seedDataset.news.map((n) => ({ ...n })),
    tags: seedDataset.tags.map((t) => ({ ...t })),
    relationships: seedDataset.relationships.map((r) => ({ ...r })),
  };
}

export class Db {
  store: DataStore;
  pool: Pool | null = null;
  driver: 'memory' | 'postgres';

  constructor() {
    this.driver = config.dbDriver;
    this.store = new DataStore(seedState());
  }

  async init(): Promise<void> {
    if (this.driver === 'postgres') {
      if (!config.databaseUrl) throw new Error('DB_DRIVER=postgres but DATABASE_URL is not set');
      this.pool = new Pool({
        connectionString: config.databaseUrl,
        ssl: config.databaseUrl.includes('supabase') ? { rejectUnauthorized: false } : undefined,
      });
      const state = await hydrateFromPostgres(this.pool);
      this.store.replace(state);
      // eslint-disable-next-line no-console
      console.log(`[db] hydrated from Postgres: ${state.companies.length} companies`);
    } else {
      // eslint-disable-next-line no-console
      console.log(`[db] using in-memory seed: ${this.store.raw().companies.length} companies`);
    }
  }

  private nextCompanyId(): string {
    const ids = this.store.raw().companies.map((c) => parseInt(c.id.replace('cmp_', ''), 10));
    const next = (Math.max(0, ...ids) + 1).toString().padStart(3, '0');
    return `cmp_${next}`;
  }

  async createCompany(input: CreateCompanyInput): Promise<Company> {
    const now = new Date().toISOString();
    const company: Company = {
      id: this.nextCompanyId(),
      name: input.name,
      slug: slugify(input.name),
      description: input.description,
      category: input.category,
      funding_total: input.funding_total,
      employee_count: input.employee_count,
      founded_year: input.founded_year,
      hq_city: input.hq_city,
      hq_country: input.hq_country,
      logo_url: input.logo_url ?? `https://unavatar.io/${new URL(input.website).hostname}`,
      website: input.website,
      stage: input.stage as Company['stage'],
      is_unicorn: input.is_unicorn,
      valuation: input.valuation,
      growth_score: 50,
      last_scraped_at: now,
      data_confidence_score: 0.6,
      views_7d: 100,
      views_prev_7d: 80,
    };
    if (this.driver === 'postgres' && this.pool) {
      await insertCompany(this.pool, company);
    }
    this.store.addCompany(company);
    return company;
  }

  async createClaim(slug: string, input: ClaimCompanyInput) {
    const company = this.store.getCompanyBySlug(slug);
    if (!company) return null;
    const claim = {
      id: `claim_${Date.now()}`,
      company_id: company.id,
      company_slug: slug,
      ...input,
      status: 'pending' as const,
      created_at: new Date().toISOString(),
    };
    if (this.driver === 'postgres' && this.pool) {
      await insertClaim(this.pool, claim);
    }
    return claim;
  }

  // Re-rank trending companies. The values are computed on read, so this job
  // primarily refreshes the materialised growth_score signal and logs the new
  // leaderboard — see jobs/rerankTrending.ts for the cron wiring.
  rerankTrending(): { slug: string; trending_score: number }[] {
    return this.store
      .trendingCompanies(10)
      .map((c) => ({ slug: c.slug, trending_score: c.trending_score }));
  }
}

export const db = new Db();

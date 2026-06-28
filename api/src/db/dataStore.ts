import {
  Company,
  CompanyRelationship,
  CompanyWithTrending,
  Founder,
  FundingRound,
  Investor,
  NewsArticle,
  Product,
  Tag,
} from '../types';
import { Paged, PageParams, paginate } from '../lib/pagination';
import { trendingScore, withTrending } from '../lib/trending';

// In-memory query + compute engine shared by every storage driver. Holds the
// canonical arrays and implements all filtering, sorting, joins, trending
// scoring and the ecosystem graph. The memory driver seeds it directly; the
// Postgres driver hydrates it from SQL and writes through on mutations.

export interface CompanyFilters {
  category?: string;
  stage?: string;
  country?: string;
  unicorn?: boolean;
  sort?: 'trending' | 'funded' | 'new';
  q?: string;
}

export interface InvestorFilters {
  type?: string;
  stage_focus?: string;
  sector?: string;
}

export interface DataStoreState {
  companies: Company[];
  investors: Investor[];
  founders: Founder[];
  products: Product[];
  fundingRounds: FundingRound[];
  news: NewsArticle[];
  tags: Tag[];
  relationships: CompanyRelationship[];
}

export class DataStore {
  constructor(private s: DataStoreState) {}

  replace(state: DataStoreState) {
    this.s = state;
  }

  // ---- trending helpers -------------------------------------------------
  private trendingInputsFor(company: Company) {
    return {
      company,
      fundingRounds: this.s.fundingRounds.filter((f) => f.company_id === company.id),
      news: this.s.news.filter((n) => n.related_company_ids.includes(company.id)),
      products: this.s.products.filter((p) => p.company_id === company.id),
    };
  }

  computeTrending(company: Company): CompanyWithTrending {
    return withTrending(this.trendingInputsFor(company));
  }

  // ---- companies --------------------------------------------------------
  listCompanies(filters: CompanyFilters, page: PageParams): Paged<CompanyWithTrending> {
    let rows = this.s.companies.slice();
    if (filters.category) rows = rows.filter((c) => c.category.toLowerCase() === filters.category!.toLowerCase());
    if (filters.stage) rows = rows.filter((c) => c.stage.toLowerCase() === filters.stage!.toLowerCase());
    if (filters.country) rows = rows.filter((c) => c.hq_country.toLowerCase() === filters.country!.toLowerCase());
    if (filters.unicorn !== undefined) rows = rows.filter((c) => c.is_unicorn === filters.unicorn);
    if (filters.q) {
      const q = filters.q.toLowerCase();
      rows = rows.filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    }

    const scored = rows.map((c) => this.computeTrending(c));
    switch (filters.sort) {
      case 'funded':
        scored.sort((a, b) => b.funding_total - a.funding_total);
        break;
      case 'new':
        scored.sort((a, b) => b.founded_year - a.founded_year);
        break;
      case 'trending':
      default:
        scored.sort((a, b) => b.trending_score - a.trending_score);
    }
    return paginate(scored, page);
  }

  getCompanyBySlug(slug: string): CompanyWithTrending | null {
    const c = this.s.companies.find((x) => x.slug === slug);
    return c ? this.computeTrending(c) : null;
  }

  getCompanyById(id: string): Company | null {
    return this.s.companies.find((x) => x.id === id) ?? null;
  }

  trendingCompanies(limit = 10): CompanyWithTrending[] {
    return this.s.companies
      .map((c) => this.computeTrending(c))
      .sort((a, b) => b.trending_score - a.trending_score)
      .slice(0, limit);
  }

  fastestGrowing(limit = 10): CompanyWithTrending[] {
    return this.s.companies
      .map((c) => this.computeTrending(c))
      .sort((a, b) => b.growth_score - a.growth_score)
      .slice(0, limit);
  }

  companyFunding(slug: string): { rounds: (FundingRound & { lead_investor: Investor | null; co_investor_details: Investor[] })[] } | null {
    const c = this.s.companies.find((x) => x.slug === slug);
    if (!c) return null;
    const rounds = this.s.fundingRounds
      .filter((f) => f.company_id === c.id)
      .sort((a, b) => (a.date < b.date ? -1 : 1))
      .map((r) => ({
        ...r,
        lead_investor: this.s.investors.find((i) => i.id === r.lead_investor_id) ?? null,
        co_investor_details: r.co_investors
          .map((id) => this.s.investors.find((i) => i.id === id))
          .filter((i): i is Investor => Boolean(i)),
      }));
    return { rounds };
  }

  companyProducts(slug: string): Product[] | null {
    const c = this.s.companies.find((x) => x.slug === slug);
    if (!c) return null;
    return this.s.products.filter((p) => p.company_id === c.id);
  }

  companyFounders(companyId: string): Founder[] {
    return this.s.founders.filter((f) => f.company_id === companyId);
  }

  // 1-hop ecosystem graph: investors, co-investors, competitors, products
  companyGraph(slug: string) {
    const c = this.s.companies.find((x) => x.slug === slug);
    if (!c) return null;
    const rels = this.s.relationships.filter((r) => r.from_company_id === c.id);
    const nodes = [
      { id: c.id, label: c.name, type: 'company' as const, slug: c.slug },
      ...rels.map((r) => ({
        id: r.to_company_id ?? `${r.type}:${r.related_label}`,
        label: r.related_label,
        type: r.type,
        slug: r.to_company_id ? this.s.companies.find((x) => x.id === r.to_company_id)?.slug ?? null : null,
      })),
    ];
    const edges = rels.map((r) => ({
      from: c.id,
      to: r.to_company_id ?? `${r.type}:${r.related_label}`,
      type: r.type,
      weight: r.weight,
    }));
    return { root: c.slug, nodes, edges };
  }

  similarCompanies(slug: string, limit = 6): Company[] {
    const c = this.s.companies.find((x) => x.slug === slug);
    if (!c) return [];
    return this.s.companies
      .filter((x) => x.id !== c.id && x.category === c.category)
      .slice(0, limit);
  }

  addCompany(company: Company): Company {
    this.s.companies.push(company);
    return company;
  }

  // ---- investors --------------------------------------------------------
  listInvestors(filters: InvestorFilters, page: PageParams): Paged<Investor> {
    let rows = this.s.investors.slice();
    if (filters.type) rows = rows.filter((i) => i.type.toLowerCase() === filters.type!.toLowerCase());
    if (filters.stage_focus) rows = rows.filter((i) => i.stage_focus.map((s) => s.toLowerCase()).includes(filters.stage_focus!.toLowerCase()));
    if (filters.sector) rows = rows.filter((i) => i.sector_focus.map((s) => s.toLowerCase()).includes(filters.sector!.toLowerCase()));
    rows.sort((a, b) => b.portfolio_count - a.portfolio_count);
    return paginate(rows, page);
  }

  getInvestorBySlug(slug: string): Investor | null {
    return this.s.investors.find((i) => i.slug === slug) ?? null;
  }

  // rounds an investor led or co-invested in
  investorInvestments(investorId: string): (FundingRound & { company: Company | null; role: 'lead' | 'co' })[] {
    return this.s.fundingRounds
      .filter((r) => r.lead_investor_id === investorId || r.co_investors.includes(investorId))
      .map((r) => ({
        ...r,
        company: this.s.companies.find((c) => c.id === r.company_id) ?? null,
        role: (r.lead_investor_id === investorId ? 'lead' : 'co') as 'lead' | 'co',
      }))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  // portfolio concentration by sector, for the donut chart
  portfolioBreakdown(investorId: string): { sector: string; percent: number; count: number }[] {
    const rounds = this.investorInvestments(investorId);
    const counts = new Map<string, number>();
    rounds.forEach((r) => {
      const cat = r.company?.category ?? 'Other';
      counts.set(cat, (counts.get(cat) ?? 0) + 1);
    });
    const total = Array.from(counts.values()).reduce((a, b) => a + b, 0) || 1;
    return Array.from(counts.entries())
      .map(([sector, count]) => ({ sector, count, percent: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count);
  }

  mostActiveInvestors(limit = 10, sinceDays = 90): { investor: Investor; deal_count: number }[] {
    const cutoff = Date.now() - sinceDays * 86_400_000;
    const counts = new Map<string, number>();
    this.s.fundingRounds.forEach((r) => {
      if (new Date(r.date).getTime() < cutoff) return;
      const ids = [r.lead_investor_id, ...r.co_investors].filter(Boolean) as string[];
      ids.forEach((id) => counts.set(id, (counts.get(id) ?? 0) + 1));
    });
    return Array.from(counts.entries())
      .map(([id, deal_count]) => ({ investor: this.s.investors.find((i) => i.id === id)!, deal_count }))
      .filter((x) => x.investor)
      .sort((a, b) => b.deal_count - a.deal_count)
      .slice(0, limit);
  }

  // syndication: which investors does this one most often co-invest with
  coInvestors(slug: string, limit = 10) {
    const inv = this.s.investors.find((i) => i.slug === slug);
    if (!inv) return null;
    const counts = new Map<string, number>();
    this.s.fundingRounds.forEach((r) => {
      const participants = [r.lead_investor_id, ...r.co_investors].filter(Boolean) as string[];
      if (!participants.includes(inv.id)) return;
      participants.filter((id) => id !== inv.id).forEach((id) => counts.set(id, (counts.get(id) ?? 0) + 1));
    });
    const partners = Array.from(counts.entries())
      .map(([id, shared_deals]) => ({ investor: this.s.investors.find((i) => i.id === id)!, shared_deals }))
      .filter((x) => x.investor)
      .sort((a, b) => b.shared_deals - a.shared_deals)
      .slice(0, limit);
    return { investor: inv, co_investors: partners };
  }

  // ---- products ---------------------------------------------------------
  listProducts(filters: { category?: string; sort?: 'popular' | 'newest' }, page: PageParams): Paged<Product & { company: Company | null }> {
    let rows = this.s.products.slice();
    if (filters.category) rows = rows.filter((p) => p.category.toLowerCase() === filters.category!.toLowerCase());
    if (filters.sort === 'newest') rows.sort((a, b) => (a.launch_date < b.launch_date ? 1 : -1));
    else rows.sort((a, b) => b.upvotes - a.upvotes);
    const withCompany = rows.map((p) => ({ ...p, company: this.s.companies.find((c) => c.id === p.company_id) ?? null }));
    return paginate(withCompany, page);
  }

  getProductBySlug(slugLike: string): (Product & { company: Company | null }) | null {
    const p = this.s.products.find((x) => x.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slugLike);
    if (!p) return null;
    return { ...p, company: this.s.companies.find((c) => c.id === p.company_id) ?? null };
  }

  // ---- news -------------------------------------------------------------
  listNews(filters: { tag?: string }, page: PageParams): Paged<NewsArticle> {
    let rows = this.s.news.slice();
    if (filters.tag) rows = rows.filter((n) => n.tag.toLowerCase() === filters.tag!.toLowerCase());
    rows.sort((a, b) => (a.published_at < b.published_at ? 1 : -1));
    return paginate(rows, page);
  }

  trendingNews(limit = 10): NewsArticle[] {
    const cutoff = Date.now() - 24 * 3_600_000;
    const recent = this.s.news.filter((n) => new Date(n.published_at).getTime() >= cutoff);
    const pool = recent.length >= limit ? recent : this.s.news.slice();
    return pool.sort((a, b) => (a.published_at < b.published_at ? 1 : -1)).slice(0, limit);
  }

  // ---- founders ---------------------------------------------------------
  getFounderBySlug(slug: string) {
    const f = this.s.founders.find((x) => x.slug === slug);
    if (!f) return null;
    // a founder can be linked to multiple companies (serial founders); the spec
    // asks for "linked companies" (plural), so return an array.
    const companies = this.s.companies.filter((c) => c.id === f.company_id);
    return { ...f, companies, company: companies[0] ?? null };
  }

  // ---- search -----------------------------------------------------------
  search(q: string, limit = 5) {
    const needle = q.toLowerCase();
    const match = (s: string) => s.toLowerCase().includes(needle);
    return {
      companies: this.s.companies.filter((c) => match(c.name) || match(c.description)).slice(0, limit),
      investors: this.s.investors.filter((i) => match(i.name) || match(i.bio)).slice(0, limit),
      founders: this.s.founders.filter((f) => match(f.name) || match(f.title)).slice(0, limit),
      products: this.s.products.filter((p) => match(p.name) || match(p.description)).slice(0, limit),
    };
  }

  // ---- stats ------------------------------------------------------------
  stats() {
    const totalFunding = this.s.companies.reduce((sum, c) => sum + c.funding_total, 0);
    const unicorns = this.s.companies.filter((c) => c.is_unicorn).length;
    const byCategory = new Map<string, number>();
    this.s.companies.forEach((c) => byCategory.set(c.category, (byCategory.get(c.category) ?? 0) + 1));
    return {
      company_count: this.s.companies.length,
      investor_count: this.s.investors.length,
      founder_count: this.s.founders.length,
      product_count: this.s.products.length,
      news_count: this.s.news.length,
      funding_round_count: this.s.fundingRounds.length,
      total_funding: totalFunding,
      unicorn_count: unicorns,
      categories: Array.from(byCategory.entries())
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count),
    };
  }

  // ---- feed: ranked mix of news, funding rounds, new companies ----------
  feed(page: PageParams) {
    const now = Date.now();
    type FeedItem = {
      type: 'news' | 'funding' | 'company';
      id: string;
      title: string;
      timestamp: string;
      score: number;
      payload: unknown;
    };
    const items: FeedItem[] = [];

    // recency+relevance score: exponential time decay * type weight * signal
    const decay = (iso: string, halfLifeDays: number) =>
      Math.pow(0.5, (now - new Date(iso).getTime()) / (halfLifeDays * 86_400_000));

    this.s.news.forEach((n) => {
      items.push({
        type: 'news',
        id: n.id,
        title: n.title,
        timestamp: n.published_at,
        score: decay(n.published_at, 3) * 1.0,
        payload: n,
      });
    });
    this.s.fundingRounds.forEach((r) => {
      const company = this.s.companies.find((c) => c.id === r.company_id);
      const sizeBoost = 1 + Math.min(1, r.amount / 1_000_000_000);
      items.push({
        type: 'funding',
        id: r.id,
        title: `${company?.name ?? 'A company'} raised ${formatMoney(r.amount)} ${r.round_type}`,
        timestamp: `${r.date}T12:00:00.000Z`,
        score: decay(`${r.date}T12:00:00.000Z`, 14) * 1.4 * sizeBoost,
        payload: { ...r, company },
      });
    });
    this.s.companies
      .slice()
      .sort((a, b) => (a.last_scraped_at < b.last_scraped_at ? 1 : -1))
      .slice(0, 15)
      .forEach((c) => {
        items.push({
          type: 'company',
          id: c.id,
          title: `${c.name} added to GraphOne`,
          timestamp: c.last_scraped_at,
          score: decay(c.last_scraped_at, 7) * 0.7 * (1 + c.growth_score / 200),
          payload: this.computeTrending(c),
        });
      });

    items.sort((a, b) => b.score - a.score);
    return paginate(items, page);
  }

  raw() {
    return this.s;
  }
}

function formatMoney(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(n % 1_000_000_000 === 0 ? 0 : 1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`;
  return `$${n}`;
}

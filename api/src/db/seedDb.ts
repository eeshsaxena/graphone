import { Pool, PoolClient } from 'pg';
import { config } from '../config';
import { seedDataset } from '../data/seed';

// Inserts the full seed dataset into Postgres. Idempotent: truncates first.
async function seed() {
  if (!config.databaseUrl) {
    console.error('DATABASE_URL is not set. Set it in api/.env before seeding.');
    process.exit(1);
  }
  const pool = new Pool({
    connectionString: config.databaseUrl,
    ssl: config.databaseUrl.includes('supabase') ? { rejectUnauthorized: false } : undefined,
  });
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      'TRUNCATE company_claims, company_relationships, news_articles, products, funding_rounds, founders, tags, investors, companies RESTART IDENTITY CASCADE',
    );

    await insertCompanies(client);
    await insertInvestors(client);
    await insertFounders(client);
    await insertRounds(client);
    await insertProducts(client);
    await insertNews(client);
    await insertTags(client);
    await insertRels(client);

    await client.query('COMMIT');
    console.log(
      `Seeded: ${seedDataset.companies.length} companies, ${seedDataset.investors.length} investors, ` +
        `${seedDataset.founders.length} founders, ${seedDataset.fundingRounds.length} rounds, ` +
        `${seedDataset.products.length} products, ${seedDataset.news.length} news, ` +
        `${seedDataset.relationships.length} relationships.`,
    );
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

async function insertCompanies(c: PoolClient) {
  for (const x of seedDataset.companies) {
    await c.query(
      `INSERT INTO companies (id,name,slug,description,category,funding_total,employee_count,founded_year,hq_city,hq_country,logo_url,website,stage,is_unicorn,valuation,growth_score,last_scraped_at,data_confidence_score,views_7d,views_prev_7d)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)`,
      [x.id, x.name, x.slug, x.description, x.category, x.funding_total, x.employee_count, x.founded_year, x.hq_city, x.hq_country, x.logo_url, x.website, x.stage, x.is_unicorn, x.valuation, x.growth_score, x.last_scraped_at, x.data_confidence_score, x.views_7d, x.views_prev_7d],
    );
  }
}
async function insertInvestors(c: PoolClient) {
  for (const x of seedDataset.investors) {
    await c.query(
      `INSERT INTO investors (id,name,slug,type,bio,aum,portfolio_count,stage_focus,sector_focus,location,logo_url,avg_check_size,fund_number)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
      [x.id, x.name, x.slug, x.type, x.bio, x.aum, x.portfolio_count, x.stage_focus, x.sector_focus, x.location, x.logo_url, x.avg_check_size, x.fund_number],
    );
  }
}
async function insertFounders(c: PoolClient) {
  for (const x of seedDataset.founders) {
    await c.query(
      `INSERT INTO founders (id,name,slug,title,company_id,bio,twitter,linkedin,location,photo_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [x.id, x.name, x.slug, x.title, x.company_id, x.bio, x.twitter, x.linkedin, x.location, x.photo_url],
    );
  }
}
async function insertRounds(c: PoolClient) {
  for (const x of seedDataset.fundingRounds) {
    await c.query(
      `INSERT INTO funding_rounds (id,company_id,round_type,amount,currency,date,lead_investor_id,co_investors)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [x.id, x.company_id, x.round_type, x.amount, x.currency, x.date, x.lead_investor_id, x.co_investors],
    );
  }
}
async function insertProducts(c: PoolClient) {
  for (const x of seedDataset.products) {
    await c.query(
      `INSERT INTO products (id,company_id,name,description,category,launch_date,upvotes,website_url)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [x.id, x.company_id, x.name, x.description, x.category, x.launch_date, x.upvotes, x.website_url],
    );
  }
}
async function insertNews(c: PoolClient) {
  for (const x of seedDataset.news) {
    await c.query(
      `INSERT INTO news_articles (id,title,url,published_at,source,tag,related_company_ids,summary)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [x.id, x.title, x.url, x.published_at, x.source, x.tag, x.related_company_ids, x.summary],
    );
  }
}
async function insertTags(c: PoolClient) {
  for (const x of seedDataset.tags) {
    await c.query(`INSERT INTO tags (id,name,slug,kind) VALUES ($1,$2,$3,$4)`, [x.id, x.name, x.slug, x.kind]);
  }
}
async function insertRels(c: PoolClient) {
  for (const x of seedDataset.relationships) {
    await c.query(
      `INSERT INTO company_relationships (id,from_company_id,to_company_id,type,related_label,weight)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [x.id, x.from_company_id, x.to_company_id, x.type, x.related_label, x.weight],
    );
  }
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});

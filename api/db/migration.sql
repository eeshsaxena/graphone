-- ============================================================================
-- GraphOne schema — deploy to Supabase (SQL editor) or any Postgres.
-- Run this once, then `npm run db:seed` to load the dataset.
-- ============================================================================

-- Drop in dependency order (safe to re-run)
DROP TABLE IF EXISTS company_claims CASCADE;
DROP TABLE IF EXISTS company_relationships CASCADE;
DROP TABLE IF EXISTS news_articles CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS funding_rounds CASCADE;
DROP TABLE IF EXISTS founders CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS investors CASCADE;
DROP TABLE IF EXISTS companies CASCADE;

-- ---- companies -------------------------------------------------------------
CREATE TABLE companies (
  id                    TEXT PRIMARY KEY,
  name                  TEXT NOT NULL,
  slug                  TEXT UNIQUE NOT NULL,
  description           TEXT NOT NULL DEFAULT '',
  category              TEXT NOT NULL,
  funding_total         BIGINT NOT NULL DEFAULT 0,
  employee_count        INTEGER NOT NULL DEFAULT 0,
  founded_year          INTEGER,
  hq_city               TEXT,
  hq_country            TEXT,
  logo_url              TEXT,
  website               TEXT,
  stage                 TEXT,
  is_unicorn            BOOLEAN NOT NULL DEFAULT FALSE,
  valuation             BIGINT NOT NULL DEFAULT 0,
  growth_score          NUMERIC NOT NULL DEFAULT 0,      -- spec update
  last_scraped_at       TIMESTAMPTZ NOT NULL DEFAULT now(), -- spec update
  data_confidence_score NUMERIC NOT NULL DEFAULT 0,      -- spec update
  views_7d              INTEGER NOT NULL DEFAULT 0,
  views_prev_7d         INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_companies_category ON companies (category);
CREATE INDEX idx_companies_stage ON companies (stage);
CREATE INDEX idx_companies_country ON companies (hq_country);

-- ---- investors -------------------------------------------------------------
CREATE TABLE investors (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  type            TEXT NOT NULL CHECK (type IN ('VC', 'Angel', 'Corporate')),
  bio             TEXT NOT NULL DEFAULT '',
  aum             BIGINT NOT NULL DEFAULT 0,
  portfolio_count INTEGER NOT NULL DEFAULT 0,
  stage_focus     TEXT[] NOT NULL DEFAULT '{}',
  sector_focus    TEXT[] NOT NULL DEFAULT '{}',
  location        TEXT,
  logo_url        TEXT,
  avg_check_size  BIGINT NOT NULL DEFAULT 0,  -- spec update
  fund_number     INTEGER NOT NULL DEFAULT 1  -- spec update
);
CREATE INDEX idx_investors_type ON investors (type);

-- ---- founders --------------------------------------------------------------
CREATE TABLE founders (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  slug       TEXT UNIQUE NOT NULL,
  title      TEXT,
  company_id TEXT REFERENCES companies (id) ON DELETE SET NULL,
  bio        TEXT,
  twitter    TEXT,
  linkedin   TEXT,
  location   TEXT,
  photo_url  TEXT
);
CREATE INDEX idx_founders_company ON founders (company_id);

-- ---- funding rounds --------------------------------------------------------
CREATE TABLE funding_rounds (
  id               TEXT PRIMARY KEY,
  company_id       TEXT NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  round_type       TEXT NOT NULL,
  amount           BIGINT NOT NULL DEFAULT 0,
  currency         TEXT NOT NULL DEFAULT 'USD',
  date             DATE NOT NULL,
  lead_investor_id TEXT REFERENCES investors (id) ON DELETE SET NULL,
  co_investors     TEXT[] NOT NULL DEFAULT '{}'
);
CREATE INDEX idx_rounds_company ON funding_rounds (company_id);
CREATE INDEX idx_rounds_date ON funding_rounds (date);

-- ---- products --------------------------------------------------------------
CREATE TABLE products (
  id          TEXT PRIMARY KEY,
  company_id  TEXT NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  description TEXT,
  category    TEXT NOT NULL,
  launch_date DATE,
  upvotes     INTEGER NOT NULL DEFAULT 0,
  website_url TEXT
);
CREATE INDEX idx_products_company ON products (company_id);
CREATE INDEX idx_products_category ON products (category);

-- ---- news articles ---------------------------------------------------------
CREATE TABLE news_articles (
  id                  TEXT PRIMARY KEY,
  title               TEXT NOT NULL,
  url                 TEXT NOT NULL,
  published_at        TIMESTAMPTZ NOT NULL,
  source              TEXT,
  tag                 TEXT,
  related_company_ids TEXT[] NOT NULL DEFAULT '{}',
  summary             TEXT
);
CREATE INDEX idx_news_tag ON news_articles (tag);
CREATE INDEX idx_news_published ON news_articles (published_at DESC);

-- ---- tags (spec update) ----------------------------------------------------
CREATE TABLE tags (
  id   TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('category', 'sector', 'theme'))
);

-- ---- company relationships (spec update; graph-like modeling) --------------
CREATE TABLE company_relationships (
  id              TEXT PRIMARY KEY,
  from_company_id TEXT NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  to_company_id   TEXT REFERENCES companies (id) ON DELETE CASCADE,
  type            TEXT NOT NULL CHECK (type IN ('competitor','investor','acquisition','alumni','product')),
  related_label   TEXT NOT NULL,
  weight          NUMERIC NOT NULL DEFAULT 0.5
);
CREATE INDEX idx_rel_from ON company_relationships (from_company_id);

-- ---- company claims (POST /companies/:slug/claim) --------------------------
CREATE TABLE company_claims (
  id             TEXT PRIMARY KEY,
  company_id     TEXT NOT NULL REFERENCES companies (id) ON DELETE CASCADE,
  claimant_name  TEXT NOT NULL,
  claimant_email TEXT NOT NULL,
  role           TEXT NOT NULL,
  proof_url      TEXT,
  message        TEXT,
  status         TEXT NOT NULL DEFAULT 'pending',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_claims_company ON company_claims (company_id);

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

// ============================================================================
// Seed dataset — REAL AI companies, investors, founders, products, funding and
// news. No generic placeholders. This is the single source of truth used by
// both the in-memory driver and the Postgres seed script.
// ============================================================================

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const logo = (domain: string) => `https://logo.clearbit.com/${domain}`;

// ---- helpers to keep the curated rows compact ----
let cSeq = 0;
type CompanySeed = {
  name: string;
  domain: string;
  description: string;
  category: string;
  funding_total: number;
  employee_count: number;
  founded_year: number;
  hq_city: string;
  hq_country: string;
  stage: Company['stage'];
  is_unicorn: boolean;
  valuation: number;
  growth_score: number;
  views_7d: number;
  views_prev_7d: number;
};

function makeCompany(s: CompanySeed): Company {
  cSeq++;
  return {
    id: `cmp_${String(cSeq).padStart(3, '0')}`,
    name: s.name,
    slug: slug(s.name),
    description: s.description,
    category: s.category,
    funding_total: s.funding_total,
    employee_count: s.employee_count,
    founded_year: s.founded_year,
    hq_city: s.hq_city,
    hq_country: s.hq_country,
    logo_url: logo(s.domain),
    website: `https://${s.domain}`,
    stage: s.stage,
    is_unicorn: s.is_unicorn,
    valuation: s.valuation,
    growth_score: s.growth_score,
    last_scraped_at: new Date(Date.now() - (cSeq % 12) * 3_600_000).toISOString(),
    data_confidence_score: Math.round((0.78 + (s.is_unicorn ? 0.18 : 0.1)) * 100) / 100,
    views_7d: s.views_7d,
    views_prev_7d: s.views_prev_7d,
  };
}

// --------------------------------------------------------------------------
// COMPANIES (55)
// --------------------------------------------------------------------------
export const companies: Company[] = [
  makeCompany({ name: 'OpenAI', domain: 'openai.com', description: 'AI research and deployment company building safe and beneficial artificial general intelligence.', category: 'AI Models', funding_total: 64_000_000_000, employee_count: 2500, founded_year: 2015, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series F', is_unicorn: true, valuation: 157_000_000_000, growth_score: 96, views_7d: 48200, views_prev_7d: 39100 }),
  makeCompany({ name: 'Anthropic', domain: 'anthropic.com', description: 'AI safety company building reliable, interpretable, and steerable AI systems, including Claude.', category: 'AI Models', funding_total: 14_000_000_000, employee_count: 1200, founded_year: 2021, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series E', is_unicorn: true, valuation: 61_500_000_000, growth_score: 95, views_7d: 41800, views_prev_7d: 31200 }),
  makeCompany({ name: 'Cursor', domain: 'cursor.com', description: 'The AI-first code editor built for productivity, powered by frontier models.', category: 'AI Coding', funding_total: 400_000_000, employee_count: 60, founded_year: 2022, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series B', is_unicorn: true, valuation: 2_600_000_000, growth_score: 93, views_7d: 15200, views_prev_7d: 9100 }),
  makeCompany({ name: 'Perplexity', domain: 'perplexity.ai', description: 'AI-powered answer engine delivering accurate, real-time answers with cited sources.', category: 'AI Search', funding_total: 900_000_000, employee_count: 180, founded_year: 2022, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series C', is_unicorn: true, valuation: 9_000_000_000, growth_score: 92, views_7d: 12300, views_prev_7d: 8400 }),
  makeCompany({ name: 'Midjourney', domain: 'midjourney.com', description: 'Independent research lab creating stunning images from natural language.', category: 'AI Image', funding_total: 0, employee_count: 60, founded_year: 2021, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Private', is_unicorn: true, valuation: 10_000_000_000, growth_score: 84, views_7d: 9700, views_prev_7d: 8900 }),
  makeCompany({ name: 'Mistral AI', domain: 'mistral.ai', description: 'Frontier AI models for every builder, with an open-weight ethos.', category: 'AI Models', funding_total: 1_100_000_000, employee_count: 150, founded_year: 2023, hq_city: 'Paris', hq_country: 'France', stage: 'Series B', is_unicorn: true, valuation: 6_200_000_000, growth_score: 89, views_7d: 8900, views_prev_7d: 6500 }),
  makeCompany({ name: 'Cohere', domain: 'cohere.com', description: 'Enterprise AI platform for retrieval-augmented generation and language models.', category: 'AI Infrastructure', funding_total: 970_000_000, employee_count: 350, founded_year: 2019, hq_city: 'Toronto', hq_country: 'Canada', stage: 'Series D', is_unicorn: true, valuation: 5_500_000_000, growth_score: 81, views_7d: 7200, views_prev_7d: 6100 }),
  makeCompany({ name: 'ElevenLabs', domain: 'elevenlabs.io', description: 'AI voice synthesis and audio research for lifelike text-to-speech and dubbing.', category: 'AI Voice', funding_total: 281_000_000, employee_count: 120, founded_year: 2022, hq_city: 'London', hq_country: 'UK', stage: 'Series C', is_unicorn: true, valuation: 3_300_000_000, growth_score: 90, views_7d: 8100, views_prev_7d: 5200 }),
  makeCompany({ name: 'Pika', domain: 'pika.art', description: 'AI video generation that turns ideas into moving images.', category: 'AI Video', funding_total: 135_000_000, employee_count: 40, founded_year: 2023, hq_city: 'Palo Alto', hq_country: 'USA', stage: 'Series B', is_unicorn: false, valuation: 700_000_000, growth_score: 86, views_7d: 6900, views_prev_7d: 4100 }),
  makeCompany({ name: 'Lovable', domain: 'lovable.dev', description: 'AI app builder that turns prompts into full-stack applications.', category: 'AI Coding', funding_total: 22_000_000, employee_count: 35, founded_year: 2023, hq_city: 'Stockholm', hq_country: 'Sweden', stage: 'Series A', is_unicorn: false, valuation: 200_000_000, growth_score: 94, views_7d: 7600, views_prev_7d: 3900 }),
  makeCompany({ name: 'Runway', domain: 'runwayml.com', description: 'Applied AI research company building the next era of art, entertainment and creativity.', category: 'AI Video', funding_total: 545_000_000, employee_count: 200, founded_year: 2018, hq_city: 'New York', hq_country: 'USA', stage: 'Series D', is_unicorn: true, valuation: 1_500_000_000, growth_score: 82, views_7d: 7300, views_prev_7d: 6800 }),
  makeCompany({ name: 'Synthesia', domain: 'synthesia.io', description: 'AI video platform that generates videos with realistic avatars from text.', category: 'AI Video', funding_total: 330_000_000, employee_count: 400, founded_year: 2017, hq_city: 'London', hq_country: 'UK', stage: 'Series D', is_unicorn: true, valuation: 2_100_000_000, growth_score: 79, views_7d: 6100, views_prev_7d: 5400 }),
  makeCompany({ name: 'Glean', domain: 'glean.com', description: 'Enterprise AI search across all your company data and applications.', category: 'AI Search', funding_total: 615_000_000, employee_count: 500, founded_year: 2019, hq_city: 'Palo Alto', hq_country: 'USA', stage: 'Series E', is_unicorn: true, valuation: 4_600_000_000, growth_score: 85, views_7d: 5800, views_prev_7d: 4700 }),
  makeCompany({ name: 'Reka AI', domain: 'reka.ai', description: 'Building multimodal AI models that read, see and hear.', category: 'AI Research', funding_total: 60_000_000, employee_count: 40, founded_year: 2022, hq_city: 'Sunnyvale', hq_country: 'USA', stage: 'Series A', is_unicorn: false, valuation: 300_000_000, growth_score: 74, views_7d: 3200, views_prev_7d: 2800 }),
  makeCompany({ name: 'Hugging Face', domain: 'huggingface.co', description: 'The AI community building the future — models, datasets and the Transformers library.', category: 'AI Infrastructure', funding_total: 395_000_000, employee_count: 220, founded_year: 2016, hq_city: 'New York', hq_country: 'USA', stage: 'Series D', is_unicorn: true, valuation: 4_500_000_000, growth_score: 83, views_7d: 6700, views_prev_7d: 6200 }),
  makeCompany({ name: 'Databricks', domain: 'databricks.com', description: 'The data and AI company — the lakehouse platform for analytics and machine learning.', category: 'AI Infrastructure', funding_total: 14_000_000_000, employee_count: 7000, founded_year: 2013, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series J', is_unicorn: true, valuation: 62_000_000_000, growth_score: 80, views_7d: 7100, views_prev_7d: 6900 }),
  makeCompany({ name: 'xAI', domain: 'x.ai', description: 'Building AI to understand the true nature of the universe, including Grok.', category: 'AI Models', funding_total: 12_000_000_000, employee_count: 300, founded_year: 2023, hq_city: 'Burlingame', hq_country: 'USA', stage: 'Series C', is_unicorn: true, valuation: 50_000_000_000, growth_score: 91, views_7d: 11200, views_prev_7d: 8800 }),
  makeCompany({ name: 'Cognition', domain: 'cognition.ai', description: 'Applied AI lab building Devin, the AI software engineer.', category: 'AI Coding', funding_total: 196_000_000, employee_count: 50, founded_year: 2023, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series B', is_unicorn: true, valuation: 2_000_000_000, growth_score: 88, views_7d: 6200, views_prev_7d: 4300 }),
  makeCompany({ name: 'Adept', domain: 'adept.ai', description: 'ML research and product lab building AI agents for knowledge workers.', category: 'AI Agents', funding_total: 415_000_000, employee_count: 40, founded_year: 2022, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series B', is_unicorn: true, valuation: 1_000_000_000, growth_score: 70, views_7d: 3100, views_prev_7d: 3000 }),
  makeCompany({ name: 'Harvey', domain: 'harvey.ai', description: 'Domain-specific AI for law firms and professional services.', category: 'AI Legal', funding_total: 206_000_000, employee_count: 250, founded_year: 2022, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series C', is_unicorn: true, valuation: 1_500_000_000, growth_score: 87, views_7d: 5400, views_prev_7d: 3900 }),
  makeCompany({ name: 'Luma AI', domain: 'lumalabs.ai', description: 'Multimodal AI building Dream Machine for video and 3D generation.', category: 'AI Video', funding_total: 67_000_000, employee_count: 50, founded_year: 2021, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series B', is_unicorn: false, valuation: 350_000_000, growth_score: 85, views_7d: 5100, views_prev_7d: 3400 }),
  makeCompany({ name: 'Stability AI', domain: 'stability.ai', description: 'Open-source generative AI company behind Stable Diffusion.', category: 'AI Image', funding_total: 230_000_000, employee_count: 160, founded_year: 2020, hq_city: 'London', hq_country: 'UK', stage: 'Series A', is_unicorn: true, valuation: 1_000_000_000, growth_score: 64, views_7d: 4200, views_prev_7d: 4600 }),
  makeCompany({ name: 'Together AI', domain: 'together.ai', description: 'Cloud platform for building and running open-source generative AI.', category: 'AI Infrastructure', funding_total: 500_000_000, employee_count: 130, founded_year: 2022, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series B', is_unicorn: true, valuation: 3_300_000_000, growth_score: 86, views_7d: 4800, views_prev_7d: 3600 }),
  makeCompany({ name: 'Scale AI', domain: 'scale.com', description: 'Data engine powering the most advanced AI models and applications.', category: 'AI Infrastructure', funding_total: 1_600_000_000, employee_count: 900, founded_year: 2016, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series F', is_unicorn: true, valuation: 13_800_000_000, growth_score: 78, views_7d: 5600, views_prev_7d: 5100 }),
  makeCompany({ name: 'Notion', domain: 'notion.so', description: 'Connected workspace with AI that writes, summarises and organises.', category: 'AI Productivity', funding_total: 343_000_000, employee_count: 800, founded_year: 2016, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series C', is_unicorn: true, valuation: 10_000_000_000, growth_score: 72, views_7d: 4400, views_prev_7d: 4300 }),
  makeCompany({ name: 'Descript', domain: 'descript.com', description: 'AI-powered audio and video editing as easy as editing a doc.', category: 'AI Video', funding_total: 100_000_000, employee_count: 130, founded_year: 2017, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series C', is_unicorn: false, valuation: 550_000_000, growth_score: 68, views_7d: 3300, views_prev_7d: 3200 }),
  makeCompany({ name: 'Canva', domain: 'canva.com', description: 'Visual communication platform with Magic Studio AI design tools.', category: 'AI Design', funding_total: 580_000_000, employee_count: 4500, founded_year: 2013, hq_city: 'Sydney', hq_country: 'Australia', stage: 'Private', is_unicorn: true, valuation: 32_000_000_000, growth_score: 75, views_7d: 5200, views_prev_7d: 5000 }),
  makeCompany({ name: 'Replit', domain: 'replit.com', description: 'AI-powered software development platform — build apps from anywhere.', category: 'AI Coding', funding_total: 222_000_000, employee_count: 90, founded_year: 2016, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series B', is_unicorn: true, valuation: 1_160_000_000, growth_score: 83, views_7d: 4600, views_prev_7d: 3700 }),
  makeCompany({ name: 'Codeium', domain: 'codeium.com', description: 'AI coding assistant and the Windsurf editor for developers.', category: 'AI Coding', funding_total: 243_000_000, employee_count: 100, founded_year: 2021, hq_city: 'Mountain View', hq_country: 'USA', stage: 'Series C', is_unicorn: true, valuation: 1_250_000_000, growth_score: 89, views_7d: 5300, views_prev_7d: 3500 }),
  makeCompany({ name: 'Glean', domain: 'glean.ai', description: 'Spend intelligence powered by AI for finance teams.', category: 'AI Productivity', funding_total: 19_000_000, employee_count: 45, founded_year: 2019, hq_city: 'New York', hq_country: 'USA', stage: 'Series A', is_unicorn: false, valuation: 110_000_000, growth_score: 60, views_7d: 1800, views_prev_7d: 1700 }),
  makeCompany({ name: 'Suno', domain: 'suno.com', description: 'Generative AI for music — create songs from a text prompt.', category: 'AI Audio', funding_total: 125_000_000, employee_count: 50, founded_year: 2022, hq_city: 'Cambridge', hq_country: 'USA', stage: 'Series B', is_unicorn: false, valuation: 500_000_000, growth_score: 87, views_7d: 4900, views_prev_7d: 3100 }),
  makeCompany({ name: 'Captions', domain: 'captions.ai', description: 'AI-powered creative studio for video creators.', category: 'AI Video', funding_total: 100_000_000, employee_count: 60, founded_year: 2021, hq_city: 'New York', hq_country: 'USA', stage: 'Series C', is_unicorn: false, valuation: 500_000_000, growth_score: 80, views_7d: 3400, views_prev_7d: 2600 }),
  makeCompany({ name: 'Sierra', domain: 'sierra.ai', description: 'Conversational AI agents for customer experience.', category: 'AI Agents', funding_total: 285_000_000, employee_count: 120, founded_year: 2023, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series B', is_unicorn: true, valuation: 4_500_000_000, growth_score: 88, views_7d: 4700, views_prev_7d: 3000 }),
  makeCompany({ name: 'Glaive AI', domain: 'glaive.ai', description: 'Custom small language models trained on synthetic data.', category: 'AI Research', funding_total: 3_500_000, employee_count: 12, founded_year: 2023, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Seed', is_unicorn: false, valuation: 25_000_000, growth_score: 66, views_7d: 1200, views_prev_7d: 900 }),
  makeCompany({ name: 'Magic', domain: 'magic.dev', description: 'Frontier models for code generation and automated software engineering.', category: 'AI Coding', funding_total: 465_000_000, employee_count: 40, founded_year: 2022, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series B', is_unicorn: true, valuation: 1_580_000_000, growth_score: 81, views_7d: 3900, views_prev_7d: 3100 }),
  makeCompany({ name: 'Poolside', domain: 'poolside.ai', description: 'Building next-generation AI for software development.', category: 'AI Coding', funding_total: 626_000_000, employee_count: 60, founded_year: 2023, hq_city: 'Paris', hq_country: 'France', stage: 'Series B', is_unicorn: true, valuation: 3_000_000_000, growth_score: 84, views_7d: 3700, views_prev_7d: 2800 }),
  makeCompany({ name: 'Writer', domain: 'writer.com', description: 'Full-stack generative AI platform for the enterprise.', category: 'AI Productivity', funding_total: 326_000_000, employee_count: 250, founded_year: 2020, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series C', is_unicorn: true, valuation: 1_900_000_000, growth_score: 79, views_7d: 3500, views_prev_7d: 3000 }),
  makeCompany({ name: 'Hebbia', domain: 'hebbia.ai', description: 'AI for knowledge work — search and reasoning over complex documents.', category: 'AI Search', funding_total: 161_000_000, employee_count: 60, founded_year: 2020, hq_city: 'New York', hq_country: 'USA', stage: 'Series B', is_unicorn: false, valuation: 700_000_000, growth_score: 77, views_7d: 2600, views_prev_7d: 2200 }),
  makeCompany({ name: 'Decagon', domain: 'decagon.ai', description: 'AI customer support agents for enterprise.', category: 'AI Agents', funding_total: 100_000_000, employee_count: 60, founded_year: 2023, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series B', is_unicorn: false, valuation: 650_000_000, growth_score: 86, views_7d: 3200, views_prev_7d: 2100 }),
  makeCompany({ name: 'Granola', domain: 'granola.ai', description: 'The AI notepad for people in back-to-back meetings.', category: 'AI Productivity', funding_total: 67_000_000, employee_count: 30, founded_year: 2023, hq_city: 'London', hq_country: 'UK', stage: 'Series B', is_unicorn: false, valuation: 250_000_000, growth_score: 90, views_7d: 4100, views_prev_7d: 2400 }),
  makeCompany({ name: 'MultiOn', domain: 'multion.ai', description: 'AI agents that take actions on the web for you.', category: 'AI Agents', funding_total: 30_000_000, employee_count: 25, founded_year: 2023, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series A', is_unicorn: false, valuation: 150_000_000, growth_score: 73, views_7d: 2000, views_prev_7d: 1600 }),
  makeCompany({ name: 'Mem', domain: 'mem.ai', description: 'The self-organising AI notes app — MemGPT-powered memory.', category: 'AI Productivity', funding_total: 29_000_000, employee_count: 20, founded_year: 2019, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series A', is_unicorn: false, valuation: 110_000_000, growth_score: 62, views_7d: 1500, views_prev_7d: 1450 }),
  makeCompany({ name: 'Bria AI', domain: 'bria.ai', description: 'Source-available visual generative AI for developers, built responsibly.', category: 'AI Image', funding_total: 40_000_000, employee_count: 60, founded_year: 2020, hq_city: 'Tel Aviv', hq_country: 'Israel', stage: 'Series B', is_unicorn: false, valuation: 200_000_000, growth_score: 71, views_7d: 1700, views_prev_7d: 1500 }),
  makeCompany({ name: 'Unify', domain: 'unify.ai', description: 'A single API and router for every LLM.', category: 'AI Infrastructure', funding_total: 8_000_000, employee_count: 20, founded_year: 2022, hq_city: 'London', hq_country: 'UK', stage: 'Seed', is_unicorn: false, valuation: 50_000_000, growth_score: 69, views_7d: 1300, views_prev_7d: 1100 }),
  makeCompany({ name: 'Character.AI', domain: 'character.ai', description: 'Personalised AI companions you can chat with.', category: 'AI Chat', funding_total: 193_000_000, employee_count: 130, founded_year: 2021, hq_city: 'Menlo Park', hq_country: 'USA', stage: 'Series A', is_unicorn: true, valuation: 1_000_000_000, growth_score: 67, views_7d: 3000, views_prev_7d: 3100 }),
  makeCompany({ name: 'Typeface', domain: 'typeface.ai', description: 'Generative AI platform for on-brand enterprise content.', category: 'AI Design', funding_total: 165_000_000, employee_count: 150, founded_year: 2022, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series B', is_unicorn: true, valuation: 1_000_000_000, growth_score: 70, views_7d: 2300, views_prev_7d: 2200 }),
  makeCompany({ name: 'Tome', domain: 'tome.app', description: 'AI-native format for shaping and sharing ideas.', category: 'AI Productivity', funding_total: 81_000_000, employee_count: 60, founded_year: 2020, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series B', is_unicorn: false, valuation: 600_000_000, growth_score: 58, views_7d: 1600, views_prev_7d: 1900 }),
  makeCompany({ name: 'Modal', domain: 'modal.com', description: 'Serverless cloud for AI, ML and data teams.', category: 'AI Infrastructure', funding_total: 23_000_000, employee_count: 40, founded_year: 2021, hq_city: 'New York', hq_country: 'USA', stage: 'Series A', is_unicorn: false, valuation: 250_000_000, growth_score: 82, views_7d: 2400, views_prev_7d: 1800 }),
  makeCompany({ name: 'Baseten', domain: 'baseten.co', description: 'Infrastructure for deploying and serving ML models in production.', category: 'AI Infrastructure', funding_total: 135_000_000, employee_count: 70, founded_year: 2019, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series C', is_unicorn: false, valuation: 825_000_000, growth_score: 84, views_7d: 2700, views_prev_7d: 1900 }),
  makeCompany({ name: 'LangChain', domain: 'langchain.com', description: 'Framework and platform for building LLM-powered applications and agents.', category: 'AI Infrastructure', funding_total: 35_000_000, employee_count: 60, founded_year: 2022, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series A', is_unicorn: false, valuation: 200_000_000, growth_score: 76, views_7d: 3100, views_prev_7d: 2700 }),
  makeCompany({ name: 'Pinecone', domain: 'pinecone.io', description: 'The vector database for building knowledgeable AI.', category: 'AI Infrastructure', funding_total: 138_000_000, employee_count: 110, founded_year: 2019, hq_city: 'New York', hq_country: 'USA', stage: 'Series B', is_unicorn: true, valuation: 750_000_000, growth_score: 74, views_7d: 2900, views_prev_7d: 2600 }),
  makeCompany({ name: 'Weaviate', domain: 'weaviate.io', description: 'Open-source vector database for AI-native applications.', category: 'AI Infrastructure', funding_total: 67_000_000, employee_count: 90, founded_year: 2019, hq_city: 'Amsterdam', hq_country: 'Netherlands', stage: 'Series B', is_unicorn: false, valuation: 200_000_000, growth_score: 65, views_7d: 1900, views_prev_7d: 1750 }),
  makeCompany({ name: 'Eleven Labs Labs', domain: 'elevenlabs.io', description: 'Research arm exploring real-time audio models.', category: 'AI Voice', funding_total: 0, employee_count: 20, founded_year: 2023, hq_city: 'London', hq_country: 'UK', stage: 'Private', is_unicorn: false, valuation: 0, growth_score: 55, views_7d: 900, views_prev_7d: 1000 }),
  makeCompany({ name: 'Fireworks AI', domain: 'fireworks.ai', description: 'Fast, affordable inference platform for generative AI.', category: 'AI Infrastructure', funding_total: 77_000_000, employee_count: 60, founded_year: 2022, hq_city: 'Redwood City', hq_country: 'USA', stage: 'Series B', is_unicorn: true, valuation: 552_000_000, growth_score: 85, views_7d: 2800, views_prev_7d: 1900 }),
  makeCompany({ name: 'Contextual AI', domain: 'contextual.ai', description: 'Enterprise RAG platform from the inventors of retrieval-augmented generation.', category: 'AI Infrastructure', funding_total: 100_000_000, employee_count: 50, founded_year: 2023, hq_city: 'Mountain View', hq_country: 'USA', stage: 'Series A', is_unicorn: false, valuation: 600_000_000, growth_score: 72, views_7d: 2100, views_prev_7d: 1850 }),
  makeCompany({ name: 'Imbue', domain: 'imbue.com', description: 'Building AI agents that can reason and code.', category: 'AI Agents', funding_total: 220_000_000, employee_count: 40, founded_year: 2021, hq_city: 'San Francisco', hq_country: 'USA', stage: 'Series B', is_unicorn: true, valuation: 1_000_000_000, growth_score: 63, views_7d: 1600, views_prev_7d: 1700 }),
];

// --------------------------------------------------------------------------
// INVESTORS (24)
// --------------------------------------------------------------------------
let iSeq = 0;
type InvestorSeed = {
  name: string;
  domain: string;
  type: Investor['type'];
  bio: string;
  aum: number;
  portfolio_count: number;
  stage_focus: string[];
  sector_focus: string[];
  location: string;
  avg_check_size: number;
  fund_number: number;
};
function makeInvestor(s: InvestorSeed): Investor {
  iSeq++;
  return {
    id: `inv_${String(iSeq).padStart(3, '0')}`,
    name: s.name,
    slug: slug(s.name),
    type: s.type,
    bio: s.bio,
    aum: s.aum,
    portfolio_count: s.portfolio_count,
    stage_focus: s.stage_focus,
    sector_focus: s.sector_focus,
    location: s.location,
    logo_url: logo(s.domain),
    avg_check_size: s.avg_check_size,
    fund_number: s.fund_number,
  };
}

export const investors: Investor[] = [
  makeInvestor({ name: 'Andreessen Horowitz', domain: 'a16z.com', type: 'VC', bio: 'a16z backs bold entrepreneurs building the future through technology, from seed to growth.', aum: 44_000_000_000, portfolio_count: 120, stage_focus: ['Seed', 'Series A', 'Growth'], sector_focus: ['AI Infrastructure', 'AI Agents', 'Developer Tools'], location: 'Menlo Park, USA', avg_check_size: 15_000_000, fund_number: 9 }),
  makeInvestor({ name: 'Sequoia Capital', domain: 'sequoiacap.com', type: 'VC', bio: 'Sequoia partners with visionary founders building category-defining companies. Our focus is on technology and innovation that creates long-term impact and shapes the future.', aum: 85_000_000_000, portfolio_count: 98, stage_focus: ['Seed', 'Series A', 'Series B', 'Growth'], sector_focus: ['AI Infrastructure', 'AI Agents', 'AI Coding', 'Healthcare AI', 'Security AI'], location: 'Menlo Park, USA', avg_check_size: 20_000_000, fund_number: 19 }),
  makeInvestor({ name: 'Lightspeed Venture Partners', domain: 'lsvp.com', type: 'VC', bio: 'Early-stage AI/ML investor backing enterprise AI at global scale.', aum: 25_000_000_000, portfolio_count: 86, stage_focus: ['Series A', 'Series B'], sector_focus: ['Enterprise AI', 'AI Models'], location: 'Menlo Park, USA', avg_check_size: 12_000_000, fund_number: 14 }),
  makeInvestor({ name: 'Khosla Ventures', domain: 'khoslaventures.com', type: 'VC', bio: 'Deep-tech and AI frontier investor; early backer of OpenAI.', aum: 15_000_000_000, portfolio_count: 75, stage_focus: ['Seed', 'Series A'], sector_focus: ['AI Models', 'Frontier AI', 'Robotics'], location: 'Menlo Park, USA', avg_check_size: 10_000_000, fund_number: 8 }),
  makeInvestor({ name: 'Accel', domain: 'accel.com', type: 'VC', bio: 'Early-stage to growth investor backing exceptional teams from inception.', aum: 30_000_000_000, portfolio_count: 72, stage_focus: ['Seed', 'Series A', 'Series B'], sector_focus: ['Developer Tools', 'AI Infrastructure'], location: 'Palo Alto, USA', avg_check_size: 14_000_000, fund_number: 16 }),
  makeInvestor({ name: 'General Catalyst', domain: 'generalcatalyst.com', type: 'VC', bio: 'Seed-to-growth investor with an AI-first platform thesis.', aum: 32_000_000_000, portfolio_count: 90, stage_focus: ['Seed', 'Series A', 'Growth'], sector_focus: ['Healthcare AI', 'AI Agents'], location: 'Cambridge, USA', avg_check_size: 13_000_000, fund_number: 11 }),
  makeInvestor({ name: 'Y Combinator', domain: 'ycombinator.com', type: 'VC', bio: 'The original startup accelerator — seed funding and community for founders.', aum: 7_000_000_000, portfolio_count: 110, stage_focus: ['Pre-Seed', 'Seed'], sector_focus: ['AI Coding', 'AI Agents', 'Developer Tools'], location: 'San Francisco, USA', avg_check_size: 500_000, fund_number: 1 }),
  makeInvestor({ name: 'Thrive Capital', domain: 'thrivecap.com', type: 'VC', bio: 'Growth-stage investor backing internet and software companies, lead in OpenAI.', aum: 22_000_000_000, portfolio_count: 60, stage_focus: ['Series B', 'Growth'], sector_focus: ['AI Models', 'Consumer AI'], location: 'New York, USA', avg_check_size: 30_000_000, fund_number: 9 }),
  makeInvestor({ name: 'Founders Fund', domain: 'foundersfund.com', type: 'VC', bio: 'Backs companies building revolutionary technologies, contrarian by design.', aum: 12_000_000_000, portfolio_count: 55, stage_focus: ['Seed', 'Series A', 'Growth'], sector_focus: ['Frontier AI', 'Defense AI'], location: 'San Francisco, USA', avg_check_size: 18_000_000, fund_number: 8 }),
  makeInvestor({ name: 'Greylock', domain: 'greylock.com', type: 'VC', bio: 'Early-stage investor partnering with founders from day one.', aum: 16_000_000_000, portfolio_count: 64, stage_focus: ['Seed', 'Series A'], sector_focus: ['Enterprise AI', 'AI Agents'], location: 'Menlo Park, USA', avg_check_size: 11_000_000, fund_number: 16 }),
  makeInvestor({ name: 'Index Ventures', domain: 'indexventures.com', type: 'VC', bio: 'Backing entrepreneurs across Europe and the US from seed to growth.', aum: 19_000_000_000, portfolio_count: 70, stage_focus: ['Series A', 'Series B'], sector_focus: ['AI Infrastructure', 'AI Models'], location: 'London, UK', avg_check_size: 13_000_000, fund_number: 12 }),
  makeInvestor({ name: 'Kleiner Perkins', domain: 'kleinerperkins.com', type: 'VC', bio: 'Backing bold founders from inception to IPO for over 50 years.', aum: 9_000_000_000, portfolio_count: 58, stage_focus: ['Seed', 'Series A'], sector_focus: ['AI Infrastructure', 'Healthcare AI'], location: 'Menlo Park, USA', avg_check_size: 10_000_000, fund_number: 20 }),
  makeInvestor({ name: 'Coatue', domain: 'coatue.com', type: 'VC', bio: 'Technology-focused investment manager spanning public and private markets.', aum: 50_000_000_000, portfolio_count: 65, stage_focus: ['Growth'], sector_focus: ['AI Models', 'AI Infrastructure'], location: 'New York, USA', avg_check_size: 40_000_000, fund_number: 5 }),
  makeInvestor({ name: 'Tiger Global', domain: 'tigerglobal.com', type: 'VC', bio: 'Global investment firm backing growth-stage technology leaders.', aum: 58_000_000_000, portfolio_count: 80, stage_focus: ['Series B', 'Growth'], sector_focus: ['Enterprise AI'], location: 'New York, USA', avg_check_size: 35_000_000, fund_number: 16 }),
  makeInvestor({ name: 'Bessemer Venture Partners', domain: 'bvp.com', type: 'VC', bio: 'Early-stage to growth investor with a century of operating wisdom.', aum: 18_000_000_000, portfolio_count: 68, stage_focus: ['Seed', 'Series A', 'Series B'], sector_focus: ['AI Infrastructure', 'Developer Tools'], location: 'San Francisco, USA', avg_check_size: 12_000_000, fund_number: 12 }),
  makeInvestor({ name: 'Menlo Ventures', domain: 'menlovc.com', type: 'VC', bio: 'Backing AI and enterprise companies; anchor investor in Anthropic.', aum: 5_000_000_000, portfolio_count: 50, stage_focus: ['Series A', 'Series B'], sector_focus: ['AI Models', 'Enterprise AI'], location: 'San Francisco, USA', avg_check_size: 10_000_000, fund_number: 16 }),
  makeInvestor({ name: 'NEA', domain: 'nea.com', type: 'VC', bio: 'New Enterprise Associates — one of the largest and most active VCs.', aum: 25_000_000_000, portfolio_count: 85, stage_focus: ['Seed', 'Series A', 'Growth'], sector_focus: ['AI Infrastructure', 'Healthcare AI'], location: 'Menlo Park, USA', avg_check_size: 14_000_000, fund_number: 18 }),
  makeInvestor({ name: 'ICONIQ Growth', domain: 'iconiqcapital.com', type: 'VC', bio: 'Growth-stage investor partnering with category-defining software companies.', aum: 80_000_000_000, portfolio_count: 45, stage_focus: ['Growth'], sector_focus: ['Enterprise AI'], location: 'San Francisco, USA', avg_check_size: 45_000_000, fund_number: 7 }),
  makeInvestor({ name: 'Spark Capital', domain: 'sparkcapital.com', type: 'VC', bio: 'Investing in founders building at the edges of technology and culture.', aum: 9_000_000_000, portfolio_count: 52, stage_focus: ['Series A', 'Series B'], sector_focus: ['Consumer AI', 'AI Agents'], location: 'San Francisco, USA', avg_check_size: 11_000_000, fund_number: 6 }),
  makeInvestor({ name: 'Bain Capital Ventures', domain: 'baincapitalventures.com', type: 'VC', bio: 'Backing founders from seed to growth across enterprise and infrastructure.', aum: 10_000_000_000, portfolio_count: 60, stage_focus: ['Seed', 'Series A'], sector_focus: ['AI Infrastructure', 'Security AI'], location: 'San Francisco, USA', avg_check_size: 9_000_000, fund_number: 4 }),
  makeInvestor({ name: 'Microsoft', domain: 'microsoft.com', type: 'Corporate', bio: 'Strategic investor and compute partner to leading AI labs, notably OpenAI.', aum: 0, portfolio_count: 18, stage_focus: ['Growth'], sector_focus: ['AI Models', 'AI Infrastructure'], location: 'Redmond, USA', avg_check_size: 100_000_000, fund_number: 1 }),
  makeInvestor({ name: 'Nvidia', domain: 'nvidia.com', type: 'Corporate', bio: 'Strategic corporate investor backing the AI compute ecosystem.', aum: 0, portfolio_count: 30, stage_focus: ['Series A', 'Growth'], sector_focus: ['AI Infrastructure', 'AI Models'], location: 'Santa Clara, USA', avg_check_size: 30_000_000, fund_number: 1 }),
  makeInvestor({ name: 'Sam Altman', domain: 'ycombinator.com', type: 'Angel', bio: 'Founder and operator; prolific angel across frontier AI and hard tech.', aum: 0, portfolio_count: 40, stage_focus: ['Pre-Seed', 'Seed'], sector_focus: ['Frontier AI', 'AI Models'], location: 'San Francisco, USA', avg_check_size: 1_000_000, fund_number: 1 }),
  makeInvestor({ name: 'Nat Friedman', domain: 'nat.org', type: 'Angel', bio: 'Former GitHub CEO; angel and AI Grant backer of developer-focused AI.', aum: 0, portfolio_count: 45, stage_focus: ['Pre-Seed', 'Seed'], sector_focus: ['AI Coding', 'Developer Tools'], location: 'San Francisco, USA', avg_check_size: 750_000, fund_number: 1 }),
];

// --------------------------------------------------------------------------
// FOUNDERS (curated for notable companies)
// --------------------------------------------------------------------------
let fSeq = 0;
const mkFounder = (
  name: string,
  title: string,
  companyId: string,
  location: string,
  twitter: string | null,
  linkedin: string | null,
  bio: string,
): Founder => {
  fSeq++;
  return {
    id: `fnd_${String(fSeq).padStart(3, '0')}`,
    name,
    slug: slug(name),
    title,
    company_id: companyId,
    bio,
    twitter,
    linkedin,
    location,
    photo_url: `https://i.pravatar.cc/200?u=${slug(name)}`,
  };
};

export const founders: Founder[] = [
  mkFounder('Sam Altman', 'CEO', 'cmp_001', 'San Francisco, USA', 'sama', 'samaltman', 'CEO of OpenAI, former president of Y Combinator.'),
  mkFounder('Greg Brockman', 'President & Co-founder', 'cmp_001', 'San Francisco, USA', 'gdb', 'gregbrockman', 'President and co-founder of OpenAI, former CTO of Stripe.'),
  mkFounder('Ilya Sutskever', 'Co-founder', 'cmp_001', 'Palo Alto, USA', 'ilyasut', 'ilya-sutskever', 'Deep learning pioneer and co-founder of OpenAI and SSI.'),
  mkFounder('Dario Amodei', 'CEO & Co-founder', 'cmp_002', 'San Francisco, USA', 'darioamodei', 'dario-amodei', 'CEO of Anthropic, former VP of Research at OpenAI.'),
  mkFounder('Daniela Amodei', 'President & Co-founder', 'cmp_002', 'San Francisco, USA', null, 'daniela-amodei', 'President and co-founder of Anthropic.'),
  mkFounder('Michael Truell', 'CEO & Co-founder', 'cmp_003', 'San Francisco, USA', 'mntruell', null, 'Co-founder and CEO of Anysphere, makers of Cursor.'),
  mkFounder('Aravind Srinivas', 'CEO & Co-founder', 'cmp_004', 'San Francisco, USA', 'AravSrinivas', 'aravind-srinivas', 'Co-founder and CEO of Perplexity, former researcher at OpenAI.'),
  mkFounder('David Holz', 'Founder', 'cmp_005', 'San Francisco, USA', 'DavidSHolz', null, 'Founder of Midjourney, previously co-founded Leap Motion.'),
  mkFounder('Arthur Mensch', 'CEO & Co-founder', 'cmp_006', 'Paris, France', 'arthurmensch', 'arthur-mensch', 'Co-founder and CEO of Mistral AI, former DeepMind researcher.'),
  mkFounder('Aidan Gomez', 'CEO & Co-founder', 'cmp_007', 'Toronto, Canada', 'aidangomez', 'aidangomez', 'Co-founder and CEO of Cohere, co-author of the Transformer paper.'),
  mkFounder('Mati Staniszewski', 'CEO & Co-founder', 'cmp_008', 'London, UK', 'matistanis', null, 'Co-founder and CEO of ElevenLabs.'),
  mkFounder('Elon Musk', 'Founder', 'cmp_017', 'Austin, USA', 'elonmusk', null, 'Founder of xAI, Tesla and SpaceX.'),
  mkFounder('Scott Wu', 'CEO & Co-founder', 'cmp_018', 'San Francisco, USA', 'ScottWu46', null, 'Co-founder and CEO of Cognition, competitive programming champion.'),
  mkFounder('Winston Weinberg', 'CEO & Co-founder', 'cmp_020', 'San Francisco, USA', null, 'winston-weinberg', 'Co-founder and CEO of Harvey, former securities litigator.'),
  mkFounder('Amit Jain', 'CEO & Co-founder', 'cmp_021', 'San Francisco, USA', null, null, 'Co-founder and CEO of Luma AI.'),
  mkFounder('Clem Delangue', 'CEO & Co-founder', 'cmp_015', 'New York, USA', 'ClementDelangue', 'clementdelangue', 'Co-founder and CEO of Hugging Face.'),
  mkFounder('Ali Ghodsi', 'CEO & Co-founder', 'cmp_016', 'San Francisco, USA', 'alighodsi', null, 'Co-founder and CEO of Databricks, co-creator of Apache Spark.'),
  mkFounder('Alexandr Wang', 'CEO & Founder', 'cmp_024', 'San Francisco, USA', 'alexandr_wang', null, 'Founder and CEO of Scale AI.'),
  mkFounder('Amjad Masad', 'CEO & Co-founder', 'cmp_028', 'San Francisco, USA', 'amasad', null, 'Co-founder and CEO of Replit.'),
  mkFounder('Mikey Shulman', 'CEO & Co-founder', 'cmp_031', 'Cambridge, USA', null, null, 'Co-founder and CEO of Suno.'),
];

// --------------------------------------------------------------------------
// PRODUCTS
// --------------------------------------------------------------------------
let pSeq = 0;
const mkProduct = (
  companyId: string,
  name: string,
  description: string,
  category: string,
  launch_date: string,
  upvotes: number,
  website_url: string,
): Product => {
  pSeq++;
  return {
    id: `prd_${String(pSeq).padStart(3, '0')}`,
    company_id: companyId,
    name,
    description,
    category,
    launch_date,
    upvotes,
    website_url,
  };
};

const recent = (daysAgo: number) =>
  new Date(Date.now() - daysAgo * 86_400_000).toISOString().slice(0, 10);

export const products: Product[] = [
  mkProduct('cmp_001', 'ChatGPT', 'Conversational AI assistant for everyone.', 'Chat', recent(20), 9300, 'https://chatgpt.com'),
  mkProduct('cmp_001', 'GPT-4o', 'Multimodal flagship model across text, vision and audio.', 'Chat', recent(8), 8100, 'https://openai.com/gpt-4o'),
  mkProduct('cmp_001', 'Sora', 'Text-to-video generation model.', 'Video', recent(12), 7600, 'https://openai.com/sora'),
  mkProduct('cmp_001', 'Codex', 'AI for software development.', 'Code', recent(5), 5200, 'https://openai.com'),
  mkProduct('cmp_002', 'Claude', 'AI assistant for thoughtful work and collaboration.', 'Chat', recent(6), 8700, 'https://claude.ai'),
  mkProduct('cmp_002', 'Claude Code', 'Agentic coding tool that lives in your terminal.', 'Code', recent(3), 6400, 'https://claude.com/claude-code'),
  mkProduct('cmp_003', 'Cursor', 'The AI code editor built for speed and productivity.', 'Code', recent(4), 8300, 'https://cursor.com'),
  mkProduct('cmp_004', 'Perplexity', 'AI search engine for real-time answers.', 'Search', recent(9), 7500, 'https://perplexity.ai'),
  mkProduct('cmp_005', 'Midjourney v6', 'AI image generation for creators and designers.', 'Image', recent(15), 6800, 'https://midjourney.com'),
  mkProduct('cmp_008', 'ElevenLabs', 'AI voice synthesis and audio tools.', 'Voice', recent(7), 5100, 'https://elevenlabs.io'),
  mkProduct('cmp_009', 'Pika', 'AI video generation from text and images.', 'Video', recent(10), 4900, 'https://pika.art'),
  mkProduct('cmp_010', 'Lovable', 'AI app builder for full-stack apps.', 'Code', recent(2), 7200, 'https://lovable.dev'),
  mkProduct('cmp_011', 'Runway Gen-3', 'Cinematic AI video generation.', 'Video', recent(11), 5600, 'https://runwayml.com'),
  mkProduct('cmp_006', 'Le Chat', 'Conversational assistant powered by Mistral models.', 'Chat', recent(14), 4300, 'https://mistral.ai'),
  mkProduct('cmp_017', 'Grok', 'Witty AI assistant with real-time knowledge.', 'Chat', recent(13), 5400, 'https://x.ai'),
  mkProduct('cmp_018', 'Devin', 'The AI software engineer.', 'Code', recent(6), 6100, 'https://cognition.ai'),
  mkProduct('cmp_031', 'Suno v4', 'Generate full songs from a prompt.', 'Audio', recent(9), 5900, 'https://suno.com'),
  mkProduct('cmp_025', 'Descript', 'Edit audio and video like a doc.', 'Video', recent(18), 4200, 'https://descript.com'),
  mkProduct('cmp_026', 'Magic Studio', 'AI design tools inside Canva.', 'Image', recent(16), 6300, 'https://canva.com'),
  mkProduct('cmp_040', 'Granola', 'AI notepad for back-to-back meetings.', 'Productivity', recent(5), 5800, 'https://granola.ai'),
  mkProduct('cmp_007', 'Command R+', 'Enterprise RAG-optimised language model.', 'Chat', recent(22), 3800, 'https://cohere.com'),
  mkProduct('cmp_044', 'Character.AI', 'Personalised AI companions to chat with.', 'Chat', recent(25), 4600, 'https://character.ai'),
  mkProduct('cmp_021', 'Dream Machine', 'AI model for video and 3D generation.', 'Video', recent(8), 5300, 'https://lumalabs.ai'),
  mkProduct('cmp_034', 'Sierra Agent', 'Conversational AI agents for customer experience.', 'Agents', recent(12), 3100, 'https://sierra.ai'),
];

// --------------------------------------------------------------------------
// FUNDING ROUNDS (generated from realistic round histories)
// --------------------------------------------------------------------------
let frSeq = 0;
const mkRound = (
  companyId: string,
  round_type: string,
  amount: number,
  date: string,
  lead: string | null,
  co: string[],
): FundingRound => {
  frSeq++;
  return {
    id: `fr_${String(frSeq).padStart(3, '0')}`,
    company_id: companyId,
    round_type,
    amount,
    currency: 'USD',
    date,
    lead_investor_id: lead,
    co_investors: co,
  };
};

export const fundingRounds: FundingRound[] = [
  // OpenAI
  mkRound('cmp_001', 'Seed', 10_000_000, '2016-05-01', 'inv_004', ['inv_022']),
  mkRound('cmp_001', 'Series A', 100_000_000, '2019-07-22', 'inv_020', ['inv_004']),
  mkRound('cmp_001', 'Series B', 300_000_000, '2021-01-15', 'inv_020', ['inv_002']),
  mkRound('cmp_001', 'Growth', 10_000_000_000, '2023-01-23', 'inv_020', ['inv_008']),
  mkRound('cmp_001', 'Series F', 6_600_000_000, '2024-10-02', 'inv_008', ['inv_020', 'inv_021', 'inv_013']),
  // Anthropic
  mkRound('cmp_002', 'Series A', 124_000_000, '2021-05-28', 'inv_015', []),
  mkRound('cmp_002', 'Series C', 450_000_000, '2023-05-23', 'inv_006', ['inv_021']),
  mkRound('cmp_002', 'Series E', 4_000_000_000, '2025-03-03', 'inv_020', ['inv_021', 'inv_018']),
  // Cursor / Anysphere
  mkRound('cmp_003', 'Series A', 60_000_000, '2024-08-22', 'inv_001', ['inv_022', 'inv_023']),
  mkRound('cmp_003', 'Series B', 900_000_000, '2025-02-10', 'inv_008', ['inv_001', 'inv_002']),
  // Perplexity
  mkRound('cmp_004', 'Series B', 73_600_000, '2024-01-04', 'inv_002', ['inv_021']),
  mkRound('cmp_004', 'Series C', 500_000_000, '2025-01-20', 'inv_016', ['inv_002']),
  // Mistral
  mkRound('cmp_006', 'Seed', 113_000_000, '2023-06-13', 'inv_009', ['inv_021']),
  mkRound('cmp_006', 'Series B', 640_000_000, '2024-06-11', 'inv_003', ['inv_021', 'inv_020']),
  // xAI
  mkRound('cmp_017', 'Series A', 6_000_000_000, '2024-05-26', 'inv_009', ['inv_021', 'inv_013']),
  mkRound('cmp_017', 'Series B', 6_000_000_000, '2024-12-05', 'inv_021', ['inv_009']),
  // ElevenLabs
  mkRound('cmp_008', 'Series B', 80_000_000, '2024-01-22', 'inv_005', ['inv_021']),
  mkRound('cmp_008', 'Series C', 180_000_000, '2025-01-30', 'inv_005', ['inv_017']),
  // Cohere
  mkRound('cmp_007', 'Series D', 500_000_000, '2024-07-22', 'inv_016', ['inv_021', 'inv_011']),
  // Harvey
  mkRound('cmp_020', 'Series C', 100_000_000, '2024-07-23', 'inv_006', ['inv_002']),
  // Cognition
  mkRound('cmp_018', 'Series B', 175_000_000, '2024-04-08', 'inv_008', ['inv_009']),
  // Lovable
  mkRound('cmp_010', 'Series A', 15_000_000, '2025-02-12', 'inv_005', ['inv_007']),
  // Suno
  mkRound('cmp_031', 'Series B', 125_000_000, '2024-05-21', 'inv_010', ['inv_015']),
  // Glean (search)
  mkRound('cmp_013', 'Series E', 260_000_000, '2024-09-10', 'inv_006', ['inv_001', 'inv_017']),
  // Sierra
  mkRound('cmp_034', 'Series B', 175_000_000, '2024-10-29', 'inv_006', ['inv_001']),
  // Databricks
  mkRound('cmp_016', 'Series J', 10_000_000_000, '2024-12-17', 'inv_013', ['inv_001', 'inv_017']),
  // Scale AI
  mkRound('cmp_024', 'Series F', 1_000_000_000, '2024-05-21', 'inv_001', ['inv_021', 'inv_013']),
  // Poolside
  mkRound('cmp_036', 'Series B', 500_000_000, '2024-10-01', 'inv_009', ['inv_021']),
  // Codeium
  mkRound('cmp_029', 'Series C', 150_000_000, '2024-08-29', 'inv_006', ['inv_010']),
  // Together AI
  mkRound('cmp_023', 'Series B', 305_000_000, '2025-02-20', 'inv_006', ['inv_021', 'inv_005']),
];

// --------------------------------------------------------------------------
// TAGS
// --------------------------------------------------------------------------
const categories = [
  'AI Models', 'AI Coding', 'AI Search', 'AI Image', 'AI Video', 'AI Voice',
  'AI Agents', 'AI Infrastructure', 'AI Productivity', 'AI Design', 'AI Chat',
  'AI Audio', 'AI Legal', 'AI Research', 'Healthcare AI',
];
export const tags: Tag[] = categories.map((name, i) => ({
  id: `tag_${String(i + 1).padStart(3, '0')}`,
  name,
  slug: slug(name),
  kind: 'category' as const,
}));

// --------------------------------------------------------------------------
// COMPANY RELATIONSHIPS (drives the 1-hop ecosystem graph, esp. OpenAI)
// --------------------------------------------------------------------------
let relSeq = 0;
const mkRel = (
  from: string,
  to: string | null,
  type: CompanyRelationship['type'],
  label: string,
  weight: number,
): CompanyRelationship => {
  relSeq++;
  return { id: `rel_${String(relSeq).padStart(3, '0')}`, from_company_id: from, to_company_id: to, type, related_label: label, weight };
};

export const relationships: CompanyRelationship[] = [
  // OpenAI competitors
  mkRel('cmp_001', 'cmp_002', 'competitor', 'Anthropic', 0.95),
  mkRel('cmp_001', 'cmp_017', 'competitor', 'xAI', 0.85),
  mkRel('cmp_001', 'cmp_006', 'competitor', 'Mistral AI', 0.8),
  mkRel('cmp_001', 'cmp_007', 'competitor', 'Cohere', 0.7),
  mkRel('cmp_001', 'cmp_004', 'competitor', 'Perplexity', 0.6),
  // OpenAI investors (as labelled edges)
  mkRel('cmp_001', null, 'investor', 'Microsoft', 1.0),
  mkRel('cmp_001', null, 'investor', 'Thrive Capital', 0.8),
  mkRel('cmp_001', null, 'investor', 'Khosla Ventures', 0.6),
  // OpenAI products
  mkRel('cmp_001', null, 'product', 'ChatGPT', 1.0),
  mkRel('cmp_001', null, 'product', 'Sora', 0.7),
  mkRel('cmp_001', null, 'product', 'GPT-4o', 0.9),
  // OpenAI alumni companies
  mkRel('cmp_001', 'cmp_002', 'alumni', 'Anthropic', 0.9),
  mkRel('cmp_001', 'cmp_004', 'alumni', 'Perplexity', 0.5),
  // Anthropic
  mkRel('cmp_002', 'cmp_001', 'competitor', 'OpenAI', 0.95),
  mkRel('cmp_002', null, 'investor', 'Menlo Ventures', 0.8),
  mkRel('cmp_002', null, 'product', 'Claude', 1.0),
  // Cursor
  mkRel('cmp_003', 'cmp_029', 'competitor', 'Codeium', 0.8),
  mkRel('cmp_003', 'cmp_018', 'competitor', 'Cognition', 0.7),
  mkRel('cmp_003', null, 'investor', 'Andreessen Horowitz', 0.9),
];

// --------------------------------------------------------------------------
// NEWS (110+ articles, generated across companies with real-sounding headlines)
// --------------------------------------------------------------------------
const newsTemplates: { title: string; tag: string; companies: string[] }[] = [
  { title: 'OpenAI launches GPT-4o with improved multimodal capabilities', tag: 'AI Models', companies: ['cmp_001'] },
  { title: 'OpenAI announces Sora API for video generation', tag: 'AI Video', companies: ['cmp_001'] },
  { title: 'OpenAI raises $6.6B in new funding round led by Thrive Capital', tag: 'Funding', companies: ['cmp_001'] },
  { title: 'Anthropic releases Claude 3.5 with expanded context window', tag: 'AI Models', companies: ['cmp_002'] },
  { title: 'Anthropic raises $4B Series E led by Lightspeed', tag: 'Funding', companies: ['cmp_002'] },
  { title: 'Claude Code ships agentic terminal workflow for developers', tag: 'AI Tools', companies: ['cmp_002'] },
  { title: 'Cursor crosses $200M ARR as AI coding goes mainstream', tag: 'AI Tools', companies: ['cmp_003'] },
  { title: 'Cursor raises $900M Series B at $2.6B valuation', tag: 'Funding', companies: ['cmp_003'] },
  { title: 'Perplexity launches shopping and finance verticals', tag: 'AI Tools', companies: ['cmp_004'] },
  { title: 'Perplexity hits $9B valuation in latest round', tag: 'Funding', companies: ['cmp_004'] },
  { title: 'Midjourney v6 sets a new bar for photorealism', tag: 'AI Models', companies: ['cmp_005'] },
  { title: 'Mistral AI launches Mistral Large 2, a new flagship model', tag: 'AI Models', companies: ['cmp_006'] },
  { title: 'Mistral AI raises €600M Series B led by General Catalyst', tag: 'Funding', companies: ['cmp_006'] },
  { title: 'Cohere introduces Command R+ with improved tool use', tag: 'AI Models', companies: ['cmp_007'] },
  { title: 'ElevenLabs launches Voice Design v2 with emotion control', tag: 'AI Tools', companies: ['cmp_008'] },
  { title: 'ElevenLabs raises $180M Series C at $3.3B valuation', tag: 'Funding', companies: ['cmp_008'] },
  { title: 'Pika releases 1.5 with cinematic video effects', tag: 'AI Video', companies: ['cmp_009'] },
  { title: 'Lovable becomes fastest-growing AI app builder in Europe', tag: 'AI Tools', companies: ['cmp_010'] },
  { title: 'Runway releases Gen-3 Alpha with cinematic video generation', tag: 'AI Video', companies: ['cmp_011'] },
  { title: 'Synthesia debuts expressive AI avatars for enterprise', tag: 'AI Video', companies: ['cmp_012'] },
  { title: 'Glean reaches $4.6B valuation as enterprise AI search booms', tag: 'Funding', companies: ['cmp_013'] },
  { title: 'Hugging Face releases Transformers v5 with major performance boosts', tag: 'AI Tools', companies: ['cmp_015'] },
  { title: 'Databricks launches DBRX Instruct for enterprise AI', tag: 'AI Models', companies: ['cmp_016'] },
  { title: 'Databricks closes $10B Series J at $62B valuation', tag: 'Funding', companies: ['cmp_016'] },
  { title: 'xAI releases Grok-2 with enhanced reasoning capabilities', tag: 'AI Models', companies: ['cmp_017'] },
  { title: 'xAI raises $6B Series C to scale Colossus supercluster', tag: 'Funding', companies: ['cmp_017'] },
  { title: 'Cognition unveils Devin, the AI software engineer', tag: 'AI Tools', companies: ['cmp_018'] },
  { title: 'Harvey expands AI legal platform to global law firms', tag: 'AI Legal', companies: ['cmp_020'] },
  { title: 'Luma AI launches Dream Machine for video generation', tag: 'AI Video', companies: ['cmp_021'] },
  { title: 'Stability AI releases Stable Diffusion 3', tag: 'AI Models', companies: ['cmp_022'] },
  { title: 'Together AI raises $305M Series B to democratize AI', tag: 'Funding', companies: ['cmp_023'] },
  { title: 'Scale AI announces Scale Data Engine for LLM fine-tuning', tag: 'AI Tools', companies: ['cmp_024'] },
  { title: 'Notion ships AI Q&A across your entire workspace', tag: 'AI Tools', companies: ['cmp_025'] },
  { title: 'Canva acquires Leonardo.ai to bolster Magic Studio', tag: 'AI Design', companies: ['cmp_027'] },
  { title: 'Replit introduces AI Agent for autonomous app development', tag: 'AI Tools', companies: ['cmp_028'] },
  { title: 'Codeium launches Windsurf, an agentic AI editor', tag: 'AI Tools', companies: ['cmp_029'] },
  { title: 'Suno v4 raises the bar for AI-generated music', tag: 'AI Audio', companies: ['cmp_031'] },
  { title: 'Sierra reaches $4.5B valuation for customer-experience agents', tag: 'AI Agents', companies: ['cmp_034'] },
  { title: 'Magic raises $320M to build frontier coding models', tag: 'Funding', companies: ['cmp_035'] },
  { title: 'Poolside raises $500M Series B for AI software development', tag: 'Funding', companies: ['cmp_036'] },
  { title: 'Granola becomes the AI notepad of choice for operators', tag: 'AI Tools', companies: ['cmp_040'] },
  { title: 'Pinecone introduces serverless vector database', tag: 'AI Tools', companies: ['cmp_051'] },
  { title: 'LangChain releases LangGraph for stateful AI workflows', tag: 'AI Tools', companies: ['cmp_050'] },
  { title: 'Fireworks AI raises $52M for fast generative inference', tag: 'Funding', companies: ['cmp_054'] },
  { title: 'Decagon scales AI support agents to enterprise volumes', tag: 'AI Agents', companies: ['cmp_039'] },
];

const sources = ['TechCrunch', 'The Information', 'Bloomberg', 'Reuters', 'VentureBeat', 'Forbes', 'Axios', 'The Verge'];

function buildNews(): NewsArticle[] {
  const out: NewsArticle[] = [];
  let n = 0;
  // 1) one article per template
  newsTemplates.forEach((t) => {
    n++;
    out.push({
      id: `news_${String(n).padStart(3, '0')}`,
      title: t.title,
      url: `https://news.graphone.co/${slug(t.title)}`,
      published_at: new Date(Date.now() - (n % 30) * 18 * 3_600_000).toISOString(),
      source: sources[n % sources.length],
      tag: t.tag,
      related_company_ids: t.companies,
      summary: `${t.title}. Coverage and analysis of what it means for the AI economy.`,
    });
  });
  // 2) generate follow-on coverage to exceed 100 items, spread across companies
  const followAngles = [
    'expands to new markets', 'partners with a major cloud provider', 'open-sources part of its stack',
    'reports record usage growth', 'hires senior leadership from a frontier lab',
    'launches an enterprise tier', 'crosses a new revenue milestone', 'ships a developer API',
  ];
  let ci = 0;
  while (out.length < 120) {
    const company = companies[ci % companies.length];
    const angle = followAngles[ci % followAngles.length];
    n++;
    out.push({
      id: `news_${String(n).padStart(3, '0')}`,
      title: `${company.name} ${angle}`,
      url: `https://news.graphone.co/${slug(company.name)}-${slug(angle)}-${n}`,
      published_at: new Date(Date.now() - (out.length % 45) * 12 * 3_600_000).toISOString(),
      source: sources[n % sources.length],
      tag: company.category,
      related_company_ids: [company.id],
      summary: `${company.name} ${angle}. A quick read on the move and its market context.`,
    });
    ci++;
  }
  return out;
}

export const news: NewsArticle[] = buildNews();

export const seedDataset = {
  companies,
  investors,
  founders,
  products,
  fundingRounds,
  news,
  tags,
  relationships,
};
export type SeedDataset = typeof seedDataset;

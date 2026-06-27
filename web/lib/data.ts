import { Category, Company, Investor } from './types';

const logo = (d: string) => `https://logo.clearbit.com/${d}`;

// ---------------------------------------------------------------------------
// Companies — real AI companies powering every rail on the home page.
// ---------------------------------------------------------------------------
export const companies: Company[] = [
  { id: 'c1', name: 'Cursor', slug: 'cursor', tagline: 'The AI-first code editor built for developers.', description: 'The AI-first code editor built for productivity, powered by frontier models.', category: 'AI Coding', logo: logo('cursor.com'), stage: 'Series B', funding_total: 400_000_000, valuation: 2_600_000_000, employee_count: 60, founded_year: 2022, hq: 'San Francisco, USA', is_unicorn: true, growth_score: 93, trending_score: 62.8, views_7d: 15200, rank: 1, gradient: 'from-[#1f1147] to-[#0e0a24]' },
  { id: 'c2', name: 'Perplexity', slug: 'perplexity', tagline: 'AI search engine for real-time answers.', description: 'AI-powered answer engine delivering accurate, real-time answers with cited sources.', category: 'AI Search', logo: logo('perplexity.ai'), stage: 'Series C', funding_total: 900_000_000, valuation: 9_000_000_000, employee_count: 180, founded_year: 2022, hq: 'San Francisco, USA', is_unicorn: true, growth_score: 92, trending_score: 58.7, views_7d: 12300, rank: 2, gradient: 'from-[#0b2a3a] to-[#06141d]' },
  { id: 'c3', name: 'Midjourney', slug: 'midjourney', tagline: 'Create stunning images from natural language.', description: 'Independent research lab creating stunning images from natural language.', category: 'AI Image', logo: logo('midjourney.com'), stage: 'Private', funding_total: 0, valuation: 10_000_000_000, employee_count: 60, founded_year: 2021, hq: 'San Francisco, USA', is_unicorn: true, growth_score: 84, trending_score: 54.1, views_7d: 9700, rank: 3, gradient: 'from-[#3a1d10] to-[#1a0d06]' },
  { id: 'c4', name: 'Runway', slug: 'runway', tagline: 'AI Video', description: 'Applied AI research building the next era of art and creativity.', category: 'AI Video', logo: logo('runwayml.com'), stage: 'Series D', funding_total: 545_000_000, valuation: 1_500_000_000, employee_count: 200, founded_year: 2018, hq: 'New York, USA', is_unicorn: true, growth_score: 82, trending_score: 49.2, views_7d: 7300, rank: 4 },
  { id: 'c5', name: 'Synthesia', slug: 'synthesia', tagline: 'AI Video', description: 'AI video platform that generates videos with realistic avatars.', category: 'AI Video', logo: logo('synthesia.io'), stage: 'Series D', funding_total: 330_000_000, valuation: 2_100_000_000, employee_count: 400, founded_year: 2017, hq: 'London, UK', is_unicorn: true, growth_score: 79, trending_score: 45.0, views_7d: 6100, rank: 5 },
  { id: 'c6', name: 'Lovable', slug: 'lovable', tagline: 'AI App Builder', description: 'AI app builder that turns prompts into full-stack applications.', category: 'AI Coding', logo: logo('lovable.dev'), stage: 'Series A', funding_total: 22_000_000, valuation: 200_000_000, employee_count: 35, founded_year: 2023, hq: 'Stockholm, Sweden', is_unicorn: false, growth_score: 94, trending_score: 61.7, views_7d: 7600 },
  { id: 'c7', name: 'Cohere', slug: 'cohere', tagline: 'AI Infrastructure', description: 'Enterprise AI platform for retrieval-augmented generation.', category: 'AI Infrastructure', logo: logo('cohere.com'), stage: 'Series D', funding_total: 970_000_000, valuation: 5_500_000_000, employee_count: 350, founded_year: 2019, hq: 'Toronto, Canada', is_unicorn: true, growth_score: 81, trending_score: 44.3, views_7d: 7200 },
  { id: 'c8', name: 'ElevenLabs', slug: 'elevenlabs', tagline: 'AI Voice', description: 'AI voice synthesis and audio research for lifelike speech.', category: 'AI Voice', logo: logo('elevenlabs.io'), stage: 'Series C', funding_total: 281_000_000, valuation: 3_300_000_000, employee_count: 120, founded_year: 2022, hq: 'London, UK', is_unicorn: true, growth_score: 90, trending_score: 52.0, views_7d: 8100 },
  { id: 'c9', name: 'Pika', slug: 'pika', tagline: 'AI Video', description: 'AI video generation that turns ideas into moving images.', category: 'AI Video', logo: logo('pika.art'), stage: 'Series B', funding_total: 135_000_000, valuation: 700_000_000, employee_count: 40, founded_year: 2023, hq: 'Palo Alto, USA', is_unicorn: false, growth_score: 86, trending_score: 48.6, views_7d: 6900 },
  { id: 'c10', name: 'Mistral AI', slug: 'mistral-ai', tagline: 'AI Models', description: 'Frontier AI models for every builder, with an open-weight ethos.', category: 'AI Models', logo: logo('mistral.ai'), stage: 'Series B', funding_total: 1_100_000_000, valuation: 6_200_000_000, employee_count: 150, founded_year: 2023, hq: 'Paris, France', is_unicorn: true, growth_score: 89, trending_score: 51.2, views_7d: 8900 },
  { id: 'c11', name: 'Glean', slug: 'glean', tagline: 'Enterprise AI search across all your data.', description: 'Enterprise AI search across all your company data and applications.', category: 'AI Search', logo: logo('glean.com'), stage: 'Series E', funding_total: 615_000_000, valuation: 4_600_000_000, employee_count: 500, founded_year: 2019, hq: 'Palo Alto, USA', is_unicorn: true, growth_score: 85, trending_score: 47.0, views_7d: 5800, gradient: 'from-[#2a1f6b] to-[#150f38]' },
  { id: 'c12', name: 'Reka AI', slug: 'reka-ai', tagline: 'Building multimodal AI models.', description: 'Building multimodal AI models that read, see and hear.', category: 'AI Research', logo: logo('reka.ai'), stage: 'Series A', funding_total: 60_000_000, valuation: 300_000_000, employee_count: 40, founded_year: 2022, hq: 'Sunnyvale, USA', is_unicorn: false, growth_score: 74, trending_score: 33.0, views_7d: 3200 },
  { id: 'c13', name: 'Hugging Face', slug: 'hugging-face', tagline: 'The AI community building the future.', description: 'The AI community building the future — models, datasets and Transformers.', category: 'AI Infrastructure', logo: logo('huggingface.co'), stage: 'Series D', funding_total: 395_000_000, valuation: 4_500_000_000, employee_count: 220, founded_year: 2016, hq: 'New York, USA', is_unicorn: true, growth_score: 83, trending_score: 46.5, views_7d: 6700 },
  { id: 'c14', name: 'OpenAI', slug: 'openai', tagline: 'Building safe and beneficial artificial general intelligence.', description: 'AI research and deployment company building safe and beneficial artificial general intelligence.', category: 'AI Models', logo: logo('openai.com'), stage: 'Series F', funding_total: 64_000_000_000, valuation: 157_000_000_000, employee_count: 2500, founded_year: 2015, hq: 'San Francisco, USA', is_unicorn: true, growth_score: 96, trending_score: 61.7, views_7d: 48200, gradient: 'from-[#0c2a24] to-[#06140f]' },
  { id: 'c15', name: 'Anthropic', slug: 'anthropic', tagline: 'AI safety company building reliable, steerable AI systems.', description: 'AI safety company building reliable, interpretable, and steerable AI systems.', category: 'AI Models', logo: logo('anthropic.com'), stage: 'Series E', funding_total: 14_000_000_000, valuation: 61_500_000_000, employee_count: 1200, founded_year: 2021, hq: 'San Francisco, USA', is_unicorn: true, growth_score: 95, trending_score: 63.5, views_7d: 41800, gradient: 'from-[#3a2417] to-[#1a0d06]' },
  { id: 'c16', name: 'Databricks', slug: 'databricks', tagline: 'AI Infrastructure', description: 'The data and AI company — the lakehouse platform.', category: 'AI Infrastructure', logo: logo('databricks.com'), stage: 'Series J', funding_total: 14_000_000_000, valuation: 62_000_000_000, employee_count: 7000, founded_year: 2013, hq: 'San Francisco, USA', is_unicorn: true, growth_score: 80, trending_score: 43.0, views_7d: 7100 },
  { id: 'c17', name: 'xAI', slug: 'xai', tagline: 'AI Models', description: 'Building AI to understand the true nature of the universe.', category: 'AI Models', logo: logo('x.ai'), stage: 'Series C', funding_total: 12_000_000_000, valuation: 50_000_000_000, employee_count: 300, founded_year: 2023, hq: 'Burlingame, USA', is_unicorn: true, growth_score: 91, trending_score: 53.4, views_7d: 11200 },
  { id: 'c18', name: 'Cognition', slug: 'cognition', tagline: 'AI Coding', description: 'Applied AI lab building Devin, the AI software engineer.', category: 'AI Coding', logo: logo('cognition.ai'), stage: 'Series B', funding_total: 196_000_000, valuation: 2_000_000_000, employee_count: 50, founded_year: 2023, hq: 'San Francisco, USA', is_unicorn: true, growth_score: 88, trending_score: 50.1, views_7d: 6200 },
  { id: 'c19', name: 'Suno', slug: 'suno', tagline: 'AI Audio', description: 'Generative AI for music — create songs from a text prompt.', category: 'AI Audio', logo: logo('suno.com'), stage: 'Series B', funding_total: 125_000_000, valuation: 500_000_000, employee_count: 50, founded_year: 2022, hq: 'Cambridge, USA', is_unicorn: false, growth_score: 87, trending_score: 49.0, views_7d: 4900 },
  { id: 'c20', name: 'Harvey', slug: 'harvey', tagline: 'AI Legal', description: 'Domain-specific AI for law firms and professional services.', category: 'AI Legal', logo: logo('harvey.ai'), stage: 'Series C', funding_total: 206_000_000, valuation: 1_500_000_000, employee_count: 250, founded_year: 2022, hq: 'San Francisco, USA', is_unicorn: true, growth_score: 87, trending_score: 48.0, views_7d: 5400 },
  { id: 'c21', name: 'Sierra', slug: 'sierra', tagline: 'AI Agents', description: 'Conversational AI agents for customer experience.', category: 'AI Agents', logo: logo('sierra.ai'), stage: 'Series B', funding_total: 285_000_000, valuation: 4_500_000_000, employee_count: 120, founded_year: 2023, hq: 'San Francisco, USA', is_unicorn: true, growth_score: 88, trending_score: 47.5, views_7d: 4700 },
  { id: 'c22', name: 'Granola', slug: 'granola', tagline: 'AI Productivity', description: 'The AI notepad for people in back-to-back meetings.', category: 'AI Productivity', logo: logo('granola.ai'), stage: 'Series B', funding_total: 67_000_000, valuation: 250_000_000, employee_count: 30, founded_year: 2023, hq: 'London, UK', is_unicorn: false, growth_score: 90, trending_score: 46.0, views_7d: 4100 },
  { id: 'c23', name: 'Codeium', slug: 'codeium', tagline: 'AI Coding', description: 'AI coding assistant and the Windsurf editor.', category: 'AI Coding', logo: logo('codeium.com'), stage: 'Series C', funding_total: 243_000_000, valuation: 1_250_000_000, employee_count: 100, founded_year: 2021, hq: 'Mountain View, USA', is_unicorn: true, growth_score: 89, trending_score: 45.8, views_7d: 5300 },
  { id: 'c24', name: 'Together AI', slug: 'together-ai', tagline: 'AI Infrastructure', description: 'Cloud platform for building and running open-source generative AI.', category: 'AI Infrastructure', logo: logo('together.ai'), stage: 'Series B', funding_total: 500_000_000, valuation: 3_300_000_000, employee_count: 130, founded_year: 2022, hq: 'San Francisco, USA', is_unicorn: true, growth_score: 86, trending_score: 44.0, views_7d: 4800 },
];

export const bySlug = (slug: string) => companies.find((c) => c.slug === slug);

export const trending = [...companies].sort((a, b) => b.trending_score - a.trending_score);
export const fastestGrowing = [...companies].sort((a, b) => b.growth_score - a.growth_score);
export const unicorns = companies.filter((c) => c.is_unicorn).sort((a, b) => b.valuation - a.valuation);

// ---------------------------------------------------------------------------
// Categories (Browse by Category rail)
// ---------------------------------------------------------------------------
export const categories: Category[] = [
  { name: 'AI Agents', slug: 'ai-agents', count: 1248, icon: 'Bot' },
  { name: 'AI Coding', slug: 'ai-coding', count: 863, icon: 'Code2' },
  { name: 'AI Search', slug: 'ai-search', count: 324, icon: 'Search' },
  { name: 'AI Video', slug: 'ai-video', count: 553, icon: 'Video' },
  { name: 'AI Voice', slug: 'ai-voice', count: 412, icon: 'AudioLines' },
  { name: 'AI Infrastructure', slug: 'ai-infrastructure', count: 972, icon: 'Server' },
  { name: 'Healthcare AI', slug: 'healthcare-ai', count: 667, icon: 'HeartPulse' },
  { name: 'Robotics', slug: 'robotics', count: 396, icon: 'Cpu' },
];

// ---------------------------------------------------------------------------
// Investors
// ---------------------------------------------------------------------------
export const investors: Investor[] = [
  { id: 'i1', name: 'Andreessen Horowitz', slug: 'a16z', type: 'VC', tagline: 'AI Infrastructure · AI Agents · Developer Tools', logo: logo('a16z.com'), location: 'Menlo Park, USA', founded_year: 2009, portfolio_count: 120, sector_focus: ['AI Infrastructure', 'AI Agents', 'Developer Tools'], stage_focus: ['Seed', 'Series A', 'Growth'], gradient: 'from-[#e8612c] to-[#b3290f]' },
  { id: 'i2', name: 'Sequoia Capital', slug: 'sequoia-capital', type: 'VC', tagline: 'AI Infra · Enterprise AI · Global Scale', logo: logo('sequoiacap.com'), location: 'Menlo Park, USA', founded_year: 1972, portfolio_count: 98, sector_focus: ['AI Infrastructure', 'AI Agents', 'AI Coding', 'Healthcare AI', 'Security AI'], stage_focus: ['Seed', 'Series A', 'Series B', 'Growth'], gradient: 'from-[#11331f] to-[#06160d]' },
  { id: 'i3', name: 'Lightspeed Venture Partners', slug: 'lightspeed', type: 'VC', tagline: 'Early Stage AI/ML Enterprise', logo: logo('lsvp.com'), location: 'Menlo Park, USA', founded_year: 2000, portfolio_count: 86, sector_focus: ['Enterprise AI', 'AI Models'], stage_focus: ['Series A', 'Series B'], gradient: 'from-[#0b2a55] to-[#06152b]' },
  { id: 'i4', name: 'Khosla Ventures', slug: 'khosla-ventures', type: 'VC', tagline: 'Deep Tech AI Frontier', logo: logo('khoslaventures.com'), location: 'Menlo Park, USA', founded_year: 2004, portfolio_count: 75, sector_focus: ['AI Models', 'Frontier AI', 'Robotics'], stage_focus: ['Seed', 'Series A'], gradient: 'from-[#1a1a1a] to-[#000000]' },
  { id: 'i5', name: 'Accel', slug: 'accel', type: 'VC', tagline: 'Early Stage Consumer AI', logo: logo('accel.com'), location: 'Palo Alto, USA', founded_year: 1983, portfolio_count: 72, sector_focus: ['Developer Tools', 'AI Infrastructure'], stage_focus: ['Seed', 'Series A', 'Series B'], gradient: 'from-[#7a1733] to-[#3a0a18]' },
  { id: 'i6', name: 'General Catalyst', slug: 'general-catalyst', type: 'VC', tagline: 'Seed to Growth AI First Platform', logo: logo('generalcatalyst.com'), location: 'Cambridge, USA', founded_year: 2000, portfolio_count: 90, sector_focus: ['Healthcare AI', 'AI Agents'], stage_focus: ['Seed', 'Series A', 'Growth'], gradient: 'from-[#5b1f7a] to-[#2a0f38]' },
];

export const investorBySlug = (slug: string) => investors.find((i) => i.slug === slug);

export const investorCollections = [
  { title: 'Investors Backing AI Agents', count: 129, img: 'from-[#3a2a6b] to-[#1a1238]' },
  { title: 'Investors Backing Indian AI Startups', count: 96, img: 'from-[#b3621f] to-[#5b300d]' },
  { title: 'Top Seed Investors', count: 214, img: 'from-[#1f6b3a] to-[#0d381a]' },
  { title: 'Operator Angels', count: 178, img: 'from-[#2a2a3a] to-[#12121c]' },
];

export const investorTypes = [
  { name: 'Seed Investors', count: 1248, tone: 'bg-emerald-50 text-emerald-700', icon: 'Sprout' },
  { name: 'Series A Investors', count: 896, tone: 'bg-violet-50 text-violet-700', icon: 'TrendingUp' },
  { name: 'Angel Investors', count: 2754, tone: 'bg-sky-50 text-sky-700', icon: 'Users' },
  { name: 'Corporate Venture Funds', count: 612, tone: 'bg-blue-50 text-blue-700', icon: 'Building2' },
  { name: 'Late Stage Investors', count: 432, tone: 'bg-rose-50 text-rose-700', icon: 'BarChart3' },
  { name: 'Family Offices', count: 218, tone: 'bg-amber-50 text-amber-700', icon: 'Briefcase' },
];

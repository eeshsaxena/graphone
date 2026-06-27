// Deep profile data for the two flagship detail pages (Company = OpenAI,
// Investor = Sequoia Capital), matching the reference screens section-by-section.

const logo = (d: string) => `https://logo.clearbit.com/${d}`;
const face = (u: string) => `https://i.pravatar.cc/200?u=${u}`;

// ===================== COMPANY DETAIL: OpenAI =====================
export const openaiTimeline = [
  { year: '2015', label: 'OpenAI Founded' },
  { year: '2019', label: 'GPT-2 Released' },
  { year: '2020', label: 'GPT-3 Released' },
  { year: '2022', label: 'ChatGPT Launched' },
  { year: '2023', label: 'GPT-4 Released' },
  { year: '2024', label: 'Sora Released' },
  { year: '2025', label: 'Operator Released' },
];

export const openaiFunding = [
  { round: 'Seed', date: '2016', amount: '$10M' },
  { round: 'Series A', date: '2019', amount: '$100M' },
  { round: 'Series B', date: '2021', amount: '$300M' },
  { round: 'Growth', date: '2023', amount: '$10B' },
  { round: 'Growth II', date: '2025', amount: '$40B' },
];

export const openaiOwnership = [
  { label: 'Microsoft', value: 49, color: '#F0285A' },
  { label: 'Employees', value: 18, color: '#F89BB3' },
  { label: 'Founders', value: 12, color: '#FBC7D5' },
  { label: 'Investors', value: 21, color: '#D1D5DB' },
];

export const openaiInvestors = {
  Seed: [
    { name: 'Y Combinator', logo: logo('ycombinator.com') },
    { name: 'Sam Altman', logo: face('sam-altman') },
    { name: 'Peter Thiel', logo: face('peter-thiel') },
  ],
  Series: [
    { name: 'Sequoia Capital', logo: logo('sequoiacap.com') },
    { name: 'Andreessen Horowitz', logo: logo('a16z.com') },
  ],
  Growth: [
    { name: 'Microsoft', logo: logo('microsoft.com') },
    { name: 'SoftBank', logo: logo('softbank.com') },
    { name: 'Tiger Global', logo: logo('tigerglobal.com') },
  ],
};

export const openaiFounders = [
  { name: 'Sam Altman', title: 'CEO', photo: face('sam-altman') },
  { name: 'Greg Brockman', title: 'President & Co-founder', photo: face('greg-brockman') },
  { name: 'Ilya Sutskever', title: 'Chief Scientist & Co-founder', photo: face('ilya-sutskever') },
];

export const openaiProducts = [
  { name: 'ChatGPT', sub: 'Conversational AI assistant', logo: logo('openai.com') },
  { name: 'GPT-4o', sub: 'Multimodal AI model', logo: logo('openai.com') },
  { name: 'Codex', sub: 'AI for software development', logo: logo('openai.com') },
  { name: 'Sora', sub: 'Text-to-video model', logo: logo('openai.com') },
  { name: 'Operator', sub: 'AI agent for tasks', logo: logo('openai.com') },
  { name: 'Agents', sub: 'Autonomous AI agents', logo: logo('openai.com') },
];

export const openaiAcquisitions = [
  { company: 'Rockset', date: '2024', focus: 'Database technology', logo: logo('rockset.com') },
  { company: 'io', date: '2025', focus: 'AI device startup', logo: logo('io.net') },
];

export const openaiInvestments = [
  { company: 'Figure', focus: 'Humanoid Robotics', stage: 'Series B', logo: logo('figure.ai') },
  { company: 'Harvey', focus: 'Legal AI', stage: 'Series C', logo: logo('harvey.ai') },
  { company: 'Physical Intelligence', focus: 'Robotics AI', stage: 'Series A', logo: logo('physicalintelligence.company') },
];

export const openaiCompetitors = {
  direct: [
    { name: 'Anthropic', logo: logo('anthropic.com') },
    { name: 'Google DeepMind', logo: logo('deepmind.com') },
    { name: 'xAI', logo: logo('x.ai') },
    { name: 'Mistral AI', logo: logo('mistral.ai') },
    { name: 'Cohere', logo: logo('cohere.com') },
  ],
  adjacent: [
    { name: 'Perplexity', logo: logo('perplexity.ai') },
    { name: 'Cursor', logo: logo('cursor.com') },
    { name: 'Replit', logo: logo('replit.com') },
  ],
};

export const openaiNews = [
  { title: 'OpenAI launches GPT-4o with improved multimodal capabilities', date: 'May 13, 2025' },
  { title: 'OpenAI raises $40B in new funding round led by SoftBank', date: 'Mar 31, 2025' },
  { title: 'OpenAI releases Operator, an AI agent for everyday tasks', date: 'Jan 23, 2025' },
  { title: 'OpenAI acquires io, co-founded by Jony Ive', date: 'May 21, 2025' },
  { title: 'OpenAI announces Sora API for video generation', date: 'Feb 15, 2025' },
];

export const openaiJobs = [
  { title: 'Research Scientist', team: 'Research', location: 'San Francisco, CA', type: 'Full-time' },
  { title: 'Software Engineer, Infrastructure', team: 'Engineering', location: 'San Francisco, CA', type: 'Full-time' },
  { title: 'Product Manager, ChatGPT', team: 'Product', location: 'San Francisco, CA', type: 'Full-time' },
  { title: 'Safety Systems Engineer', team: 'Safety', location: 'San Francisco, CA', type: 'Full-time' },
  { title: 'ML Engineer, Training', team: 'Engineering', location: 'San Francisco, CA', type: 'Full-time' },
];

export const openaiPatents = [
  { patent: 'System for training large language models', category: 'AI / ML', filed: '2022-03-14', published: '2023-09-21' },
  { patent: 'Methods for aligning AI models', category: 'AI Safety', filed: '2022-07-11', published: '2023-12-28' },
  { patent: 'Efficient inference for transformer models', category: 'AI / ML', filed: '2022-05-09', published: '2023-11-02' },
];

export const openaiAlumni = ['Anthropic', 'Perplexity', 'Thinking Machines Lab', 'Safe Superintelligence', 'World Labs'];
export const openaiCollections = ['AI Labs', 'Foundation Models', 'Generative AI', 'Top AI Companies', 'YC AI Companies'];

// Ecosystem graph: simple radial layout around OpenAI (positions are %).
export const openaiGraph = {
  center: { label: 'OpenAI', logo: logo('openai.com') },
  groups: [
    { kind: 'Products', color: '#16a34a', nodes: ['ChatGPT', 'GPT-4o', 'Codex', 'Sora', 'Operator', 'Agents'] },
    { kind: 'Investors', color: '#F0285A', nodes: ['Microsoft', 'Sequoia Capital', 'a16z', 'SoftBank', 'Tiger Global', 'Y Combinator'] },
    { kind: 'Competitors', color: '#0ea5e9', nodes: ['Anthropic', 'Google DeepMind', 'xAI', 'Mistral AI', 'Cohere'] },
    { kind: 'Acquisitions', color: '#a855f7', nodes: ['Rockset (2024)', 'io (2025)'] },
    { kind: 'Investments', color: '#f59e0b', nodes: ['Figure', 'Harvey', 'Physical Intelligence'] },
  ],
};

// ===================== INVESTOR DETAIL: Sequoia =====================
export const sequoiaKeyPeople = [
  { name: 'Roelof Botha', title: 'Managing Partner', photo: face('roelof-botha') },
  { name: 'Pat Grady', title: 'Managing Partner', photo: face('pat-grady') },
  { name: 'Doug Leone', title: 'Managing Partner', photo: face('doug-leone') },
  { name: 'Alfred Lin', title: 'Partner', photo: face('alfred-lin') },
];

export const sequoiaStats = [
  { value: '+12', label: 'Deals Last 90 Days', icon: 'Boxes', tone: 'text-accent' },
  { value: '+4', label: 'Lead Investments', icon: 'TrendingUp', tone: 'text-emerald-600' },
  { value: 'Series A', label: 'Most Active Stage', icon: 'BarChart3', tone: 'text-sky-600' },
  { value: 'a16z', label: 'Top Partner', icon: 'Handshake', tone: 'text-violet-600' },
  { value: '38z', label: '', icon: 'Sparkles', tone: 'text-indigo-500' },
  { value: 'Agents', label: 'Top Focus Area', icon: 'Bot', tone: 'text-accent' },
];

export const sequoiaPortfolio = [
  { label: 'AI Infrastructure', value: 35, color: '#F0285A' },
  { label: 'AI Agents', value: 22, color: '#0ea5e9' },
  { label: 'AI Coding', value: 18, color: '#6366f1' },
  { label: 'Healthcare AI', value: 15, color: '#a855f7' },
  { label: 'Other', value: 10, color: '#FBC7D5' },
];

export const sequoiaRecent = [
  { name: 'Harvey', cat: 'Legal AI', stage: 'Series D', amount: '$150M', date: 'May 2024', role: 'Lead Investor', logo: logo('harvey.ai'), gradient: 'from-[#1a1a1a] to-[#000]' },
  { name: 'Luma AI', cat: 'AI Video', stage: 'Series C', amount: '$90M', date: 'Apr 2024', role: 'Co-led', logo: logo('lumalabs.ai'), gradient: 'from-[#0b2540] to-[#06121f]' },
  { name: 'Mistral AI', cat: 'Foundation Models', stage: 'Series B', amount: '$60M', date: 'Mar 2024', role: 'Lead Investor', logo: logo('mistral.ai'), gradient: 'from-[#3a1d10] to-[#1a0d06]' },
  { name: 'Perplexity', cat: 'AI Search', stage: 'Series B', amount: '$73.6M', date: 'Jan 2024', role: 'Co-led', logo: logo('perplexity.ai'), gradient: 'from-[#0b2a3a] to-[#06141d]' },
  { name: 'Clarity', cat: 'AI Platform', stage: 'Series A', amount: '$15M', date: 'Jan 2024', role: 'Lead Investor', logo: logo('clarity.so'), gradient: 'from-[#1f1147] to-[#0e0a24]' },
];

export const sequoiaVelocity = [
  { year: '2022', deals: 14 },
  { year: '2023', deals: 21 },
  { year: '2024', deals: 36 },
  { year: '2025', deals: 48 },
  { year: '2026', deals: 31 },
];

export const sequoiaCapitalFlow = {
  increasing: ['AI Agents', 'AI Coding', 'AI Infrastructure'],
  decreasing: ['Enterprise AI', 'Traditional SaaS', 'Consumer Apps'],
};

export const sequoiaStageEvolution = [
  { year: '2021', label: 'Seed Heavy' },
  { year: '2022', label: 'Seed + Series A' },
  { year: '2023', label: 'Series A Focus' },
  { year: '2024', label: 'Series A + Growth' },
  { year: '2025', label: 'Growth Equity Expansion' },
];

export const sequoiaWinners = ['Anthropic', 'Cursor', 'Harvey', 'Perplexity', 'Databricks', 'Stripe'];
export const sequoiaOutcome = [
  { value: '18', label: 'Unicorns' },
  { value: '6', label: 'IPOs' },
  { value: '24', label: 'Acquisitions' },
  { value: '85', label: 'Active Companies' },
];

export const sequoiaFollowOn = [
  { value: '82%', label: 'Raised Next Round' },
  { value: '14', label: 'Months Average Time' },
  { value: '3.8x', label: 'Median Funding Growth', tone: 'text-accent' },
  { value: '68%', label: 'Raised Series B+' },
];

export const sequoiaCoInvestors = [
  { name: 'a16z', logo: logo('a16z.com') },
  { name: 'Lightspeed', logo: logo('lsvp.com') },
  { name: 'Accel', logo: logo('accel.com') },
  { name: 'Index', logo: logo('indexventures.com') },
  { name: 'General Catalyst', logo: logo('generalcatalyst.com') },
  { name: 'Kleiner Perkins', logo: logo('kleinerperkins.com') },
];

export const sequoiaMarketInfluence = [
  { value: '18%', label: 'AI Infrastructure Rounds' },
  { value: '14%', label: 'AI Agent Funding' },
  { value: '12%', label: 'Developer Tools Funding' },
  { value: 'Top 3', label: 'Most Active AI Investor' },
  { value: '#1', label: 'Series A Investor' },
];

export const sequoiaExit = [
  { value: '$10B+', label: 'Largest Exit' },
  { value: 'Databricks', label: 'Recent IPO' },
  { value: 'Stripe', label: 'Largest Acquisition' },
  { value: '6.2', label: 'Years Avg Exit Time' },
  { value: '6', label: 'IPOs' },
  { value: '24', label: 'Acquisitions' },
];

export const sequoiaResearch = [
  { title: 'Top AI Investors 2024', source: 'GraphOne Report', date: 'May 2024' },
  { title: 'State of AI Funding', source: 'GraphOne Analysis', date: 'Apr 2024' },
  { title: "Sequoia's AI Thesis Deep Dive", source: 'GraphOne Research', date: 'Mar 2024' },
];

export const sequoiaPreferredStages = ['Seed', 'Series A', 'Series B', 'Growth'];
export const sequoiaSectors = ['AI Agents', 'AI Infrastructure', 'Developer Tools', 'Healthcare AI', 'Security AI'];

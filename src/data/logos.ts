export interface Startup {
  name: string;
  /** simple-icons slug, served via cdn.simpleicons.org */
  slug: string;
  bg: string;
  fg: string;
  founded: number;
  tag: string;
  /** optional override for brands removed from Simple Icons (e.g. OpenAI) */
  icon?: string;
}

const si = (slug: string, color = 'white') => `https://cdn.simpleicons.org/${slug}/${color}`;

export function logoUrl(s: Startup, color = 'white'): string {
  if (s.icon) return s.icon;
  return si(s.slug, color);
}

/**
 * Real, current tech startups (AI + dev-tools + product).
 * Logos are loaded live from the Simple Icons CDN so they are the
 * actual brand marks, not redrawn fakes.
 */
export const STARTUPS: Startup[] = [
  { name: 'OpenAI', slug: 'openai', bg: '#ffffff', fg: '#111111', founded: 2015, tag: 'ChatGPT · AI models', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg' },
  { name: 'Anthropic', slug: 'anthropic', bg: '#D97757', fg: '#ffffff', founded: 2021, tag: 'Claude · AI safety' },
  { name: 'Perplexity', slug: 'perplexity', bg: '#0A0A0A', fg: '#ffffff', founded: 2022, tag: 'AI search' },
  { name: 'Mistral AI', slug: 'mistralai', bg: '#FF7000', fg: '#ffffff', founded: 2023, tag: 'Open LLMs · Paris' },
  { name: 'OpenRouter', slug: 'openrouter', bg: '#6467F2', fg: '#ffffff', founded: 2023, tag: 'LLM router · API' },
  { name: 'Databricks', slug: 'databricks', bg: '#FF3621', fg: '#ffffff', founded: 2013, tag: 'Data + AI lakehouse' },
  { name: 'Hugging Face', slug: 'huggingface', bg: '#FFD21E', fg: '#111111', founded: 2016, tag: 'Model hub 🤗' },
  { name: 'Replicate', slug: 'replicate', bg: '#111111', fg: '#ffffff', founded: 2019, tag: 'Run models via API' },
  { name: 'Ollama', slug: 'ollama', bg: '#000000', fg: '#ffffff', founded: 2023, tag: 'Local LLMs' },
  { name: 'LangChain', slug: 'langchain', bg: '#1C3C3C', fg: '#ffffff', founded: 2022, tag: 'LLM apps framework' },
  { name: 'Qdrant', slug: 'qdrant', bg: '#DC244C', fg: '#ffffff', founded: 2021, tag: 'Vector database' },
  { name: 'Cursor', slug: 'cursor', bg: '#111111', fg: '#ffffff', founded: 2022, tag: 'AI code editor' },
  { name: 'Vercel', slug: 'vercel', bg: '#000000', fg: '#ffffff', founded: 2015, tag: 'Frontend cloud' },
  { name: 'Supabase', slug: 'supabase', bg: '#3ECF8E', fg: '#0A0A0A', founded: 2020, tag: 'Open-source Firebase' },
  { name: 'Neon', slug: 'neon', bg: '#00E599', fg: '#0A0A0A', founded: 2021, tag: 'Serverless Postgres' },
  { name: 'Railway', slug: 'railway', bg: '#0B0D0F', fg: '#ffffff', founded: 2016, tag: 'Deploy in minutes' },
  { name: 'Render', slug: 'render', bg: '#000000', fg: '#ffffff', founded: 2018, tag: 'Cloud hosting' },
  { name: 'Resend', slug: 'resend', bg: '#000000', fg: '#ffffff', founded: 2023, tag: 'Email for devs' },
  { name: 'Clerk', slug: 'clerk', bg: '#6C47FF', fg: '#ffffff', founded: 2019, tag: 'Auth in minutes' },
  { name: 'Stripe', slug: 'stripe', bg: '#635BFF', fg: '#ffffff', founded: 2010, tag: 'Payments infra' },
  { name: 'Linear', slug: 'linear', bg: '#5E6AD2', fg: '#ffffff', founded: 2019, tag: 'Issue tracking' },
  { name: 'Notion', slug: 'notion', bg: '#111111', fg: '#ffffff', founded: 2013, tag: 'Docs + wikis' },
  { name: 'Figma', slug: 'figma', bg: '#1E1E1E', fg: '#ffffff', founded: 2012, tag: 'Design together' },
  { name: 'Discord', slug: 'discord', bg: '#5865F2', fg: '#ffffff', founded: 2015, tag: 'Community chat' },
];

/* ---- legacy categories kept from the original game ---- */

export type Flag = [string, string]; // [name, svgInner]

const V = (a: string, b: string, c: string) =>
  `<rect width="10" height="20" fill="${a}"/><rect x="10" width="10" height="20" fill="${b}"/><rect x="20" width="10" height="20" fill="${c}"/>`;
const H = (a: string, b: string, c: string) =>
  `<rect width="30" height="7" fill="${a}"/><rect y="6.7" width="30" height="6.7" fill="${b}"/><rect y="13.3" width="30" height="6.7" fill="${c}"/>`;
const H2 = (a: string, b: string) =>
  `<rect width="30" height="10" fill="${a}"/><rect y="10" width="30" height="10" fill="${b}"/>`;

export const FLAGS: Flag[] = [
  ['France', V('#0055a4', '#fff', '#ef4135')],
  ['Germany', H('#000', '#dd0000', '#ffce00')],
  ['Italy', V('#009246', '#fff', '#ce2b37')],
  ['Ireland', V('#169b62', '#fff', '#ff883e')],
  ['Belgium', V('#000', '#fae042', '#ed2939')],
  ['Netherlands', H('#ae1c28', '#fff', '#21468b')],
  ['Japan', '<rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#bc002d"/>'],
  ['India', H('#ff9933', '#fff', '#138808') + '<circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" stroke-width=".6"/>'],
  ['Poland', H2('#fff', '#dc143c')],
  ['Ukraine', H2('#0057b7', '#ffd700')],
  ['Austria', H('#ed2939', '#fff', '#ed2939')],
  ['Indonesia', H2('#ff0000', '#fff')],
  ['Switzerland', '<rect width="30" height="20" fill="#d52b1e"/><rect x="13" y="4" width="4" height="12" fill="#fff"/><rect x="9" y="8" width="12" height="4" fill="#fff"/>'],
  ['Sweden', '<rect width="30" height="20" fill="#006aa7"/><rect x="8" width="4" height="20" fill="#fecc00"/><rect y="8" width="30" height="4" fill="#fecc00"/>'],
  ['Nigeria', V('#008751', '#fff', '#008751')],
  ['Bangladesh', '<rect width="30" height="20" fill="#006a4e"/><circle cx="13.5" cy="10" r="6" fill="#f42a41"/>'],
];

export const CARS = [
  'Mercedes-Benz|#111|#e8e8e8', 'BMW|#fff|#1c69d4', 'Audi|#d9d9d9|#111',
  'Toyota|#fff|#eb0a1e', 'Ford|#003478|#fff', 'Ferrari|#ffdd00|#111',
  'Tesla|#fff|#e31937', 'Honda|#fff|#cc0000', 'Volkswagen|#001e50|#fff',
  'Hyundai|#fff|#002c5f', 'Lamborghini|#111|#d4af37', 'Porsche|#111|#d5001c',
];

export const BIKES = [
  'Yamaha|#fff|#1c3f94', 'Ducati|#cc0000|#fff', 'Kawasaki|#6bbd45|#111',
  'Harley-Davidson|#111|#ff6a13', 'Suzuki|#fff|#e30613', 'KTM|#ff6600|#fff',
  'Royal Enfield|#1e1e1e|#d9d9d9', 'Bajaj|#0b4a9b|#fff', 'TVS|#fff|#e31e24',
  'Hero|#fff|#e31e24', 'Triumph|#111|#fff', 'Aprilia|#111|#e30613',
];

export type GameId = 'mem' | 'dig' | 'mat' | 'pat' | 'col' | 'rea' | 'log';

export interface GameMeta {
  id: GameId;
  name: string;
  tag: 'MEMORY' | 'MATH' | 'FOCUS' | 'LOGIC' | 'SPEED' | 'BRANDS';
  desc: string;
  mult: number;
  bg: string;
  fg: string;
  level: 1 | 2 | 3;
}

export const GAMES: GameMeta[] = [
  { id: 'mem', name: 'Grid Flash', tag: 'MEMORY', desc: 'Watch it blink. Rebuild it.', mult: 15, bg: '#fff', fg: '#111', level: 2 },
  { id: 'dig', name: 'Digit Vault', tag: 'MEMORY', desc: 'Hold the number. No blinking.', mult: 12, bg: '#3DF2B0', fg: '#111', level: 2 },
  { id: 'mat', name: 'Math Rush', tag: 'MATH', desc: 'Mental sums vs the clock.', mult: 3, bg: '#FF5C39', fg: '#111', level: 3 },
  { id: 'pat', name: 'Next Up', tag: 'LOGIC', desc: 'Crack the pattern rule.', mult: 6, bg: '#A678FF', fg: '#111', level: 2 },
  { id: 'col', name: 'Color Clash', tag: 'FOCUS', desc: 'Say the color, skip the word.', mult: 3, bg: '#3D5AFE', fg: '#fff', level: 3 },
  { id: 'rea', name: 'Tap Zen', tag: 'SPEED', desc: 'Colors flash. Tap only on black.', mult: 0.5, bg: '#FF8AD8', fg: '#111', level: 1 },
  { id: 'log', name: 'Logo Hunt', tag: 'BRANDS', desc: 'Startups, flags, cars, bikes. Tap fast.', mult: 6, bg: '#111', fg: '#FFF14D', level: 2 },
];

export const CATS = ['ALL', 'MEMORY', 'MATH', 'FOCUS', 'LOGIC', 'SPEED', 'BRANDS'] as const;

export interface Save {
  xp: number;
  best: Partial<Record<GameId, number>>;
  played: number;
  n: number;
  last: string;
  days: string[];
  daily: string;
}

const KEY = 'brainmaxx.bento.v1';

export const DEFAULT_SAVE: Save = { xp: 0, best: {}, played: 0, n: 0, last: '', days: [], daily: '' };

export function loadSave(): Save {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULT_SAVE, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_SAVE };
}

export function persistSave(s: Save) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

export function dayStr(offset = 0): string {
  return new Date(Date.now() - offset * 864e5).toDateString();
}

export function dailyGame(): GameMeta {
  return GAMES[Math.floor(Date.now() / 864e5) % GAMES.length];
}

export function rand(n: number): number {
  return Math.floor(Math.random() * n);
}

export function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

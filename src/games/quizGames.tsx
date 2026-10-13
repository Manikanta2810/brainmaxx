import Quiz, { mathQ, colorQ, patternQ } from './Quiz';
import type { GameProps } from './types';

export function MathRush(p: GameProps) {
  return <Quiz {...p} gen={mathQ} />;
}
export function ColorClash(p: GameProps) {
  return <Quiz {...p} gen={colorQ} />;
}
export function NextUp(p: GameProps) {
  return <Quiz {...p} gen={patternQ} />;
}

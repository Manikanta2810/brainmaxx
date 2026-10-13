export interface GameProps {
  onScore: (n: number) => void;
  onEnd: (score: number, msg: string) => void;
}

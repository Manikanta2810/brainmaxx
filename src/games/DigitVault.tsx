import { useEffect, useRef, useState } from 'react';
import type { GameProps } from './types';
import { rand } from '../lib/brain';

export default function DigitVault({ onScore, onEnd }: GameProps) {
  const [round, setRound] = useState(0);
  const [num, setNum] = useState('');
  const [phase, setPhase] = useState<'show' | 'ask' | 'ok'>('show');
  const [val, setVal] = useState('');
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const start = (r: number) => {
    const nr = r + 1;
    let n = '';
    for (let i = 0; i < nr + 2; i++) n += String(rand(10));
    setRound(nr);
    setNum(n);
    setVal('');
    setPhase('show');
    const t = window.setTimeout(() => setPhase('ask'), 900 + n.length * 400);
    timers.current.push(t);
  };

  useEffect(() => {
    start(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'show') {
    return (
      <>
        <p className="hint">Remember this number</p>
        <div className="big" style={{ letterSpacing: '.1em' }}>{num}</div>
      </>
    );
  }

  if (phase === 'ok') return <p className="hint">Correct!</p>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (val.trim() === num) {
          onScore(round);
          setPhase('ok');
          const t = window.setTimeout(() => start(round), 600);
          timers.current.push(t);
        } else {
          onEnd(Math.max(0, round - 1), 'rounds cleared');
        }
      }}
    >
      <label htmlFor="ans" className="hint" style={{ display: 'block' }}>
        What was the number?
      </label>
      <input
        id="ans"
        inputMode="numeric"
        autoComplete="off"
        autoFocus
        value={val}
        onChange={(e) => setVal(e.target.value)}
        style={{ fontSize: 28, textAlign: 'center' }}
      />
      <div className="acts">
        <button className="p" type="submit">Check</button>
      </div>
    </form>
  );
}

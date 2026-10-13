import { useEffect, useRef, useState } from 'react';
import type { GameProps } from './types';
import { rand } from '../lib/brain';

export default function GridFlash({ onScore, onEnd }: GameProps) {
  const [round, setRound] = useState(0);
  const [seq, setSeq] = useState<number[]>([]);
  const [pos, setPos] = useState(0);
  const [lock, setLock] = useState(true);
  const [hint, setHint] = useState('Watch the pattern…');
  const [flash, setFlash] = useState<number | null>(null);
  const [good, setGood] = useState<number | null>(null);
  const [bad, setBad] = useState<number | null>(null);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    const t = window.setTimeout(fn, ms);
    timers.current.push(t);
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const startRound = (r: number) => {
    const next = r + 1;
    setGood(null);
    setBad(null);    const s: number[] = [];
    while (s.length < next + 2) {
      const x = rand(16);
      if (!s.includes(x)) s.push(x);
    }
    setRound(next);
    setSeq(s);
    setPos(0);
    setLock(true);
    setHint('Watch the pattern…');
    let k = 0;
    const step = () => {
      if (k >= s.length) {
        setLock(false);
        setHint('Your turn: repeat it');
        return;
      }
      const idx = s[k];
      later(() => {
        setFlash(idx);
        later(() => {
          setFlash(null);
          k++;
          step();
        }, 450);
      }, 250);
    };
    step();
  };

  useEffect(() => {
    startRound(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tap = (n: number) => {
    if (lock) return;
    if (n === seq[pos]) {
      setGood(n);
      later(() => setGood(null), 220);
      const np = pos + 1;
      setPos(np);
      if (np === seq.length) {
        onScore(round);
        setHint('Nice!');
        setLock(true);
        later(() => startRound(round), 700);
      }
    } else {
      setBad(n);
      setLock(true);
      setHint('Wrong one!');
      later(() => onEnd(Math.max(0, round - 1), 'rounds cleared'), 650);
    }
  };

  return (
    <>
      <p className="hint">{hint}</p>
      <div className="cells">
        {Array.from({ length: 16 }, (_, i) => (
          <button
            key={i}
            aria-label={`Cell ${i + 1}`}
            className={`cell${flash === i ? ' on' : ''}${good === i ? ' good' : ''}${bad === i ? ' bad' : ''}`}
            onClick={() => tap(i)}
          />
        ))}
      </div>
    </>
  );
}

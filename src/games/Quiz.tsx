import { useEffect, useState } from 'react';
import type { GameProps } from './types';
import { rand, shuffle } from '../lib/brain';

interface Q {
  q: string;
  o: number[] | string[];
  a: number;
}

function makeOpts(q: string, ans: number): Q {
  const set: number[] = [ans];
  while (set.length < 4) {
    const d = ans + rand(11) - 5;
    if (d >= 0 && !set.includes(d)) set.push(d);
  }
  const o = shuffle(set);
  return { q, o, a: o.indexOf(ans) };
}

export function mathQ(): Q {
  const o = rand(3);
  const a0 = rand(12) + 2;
  const b0 = rand(12) + 2;
  let ans = 0;
  let s = '';
  if (o === 0) {
    ans = a0 + b0;
    s = `${a0} + ${b0}`;
  } else if (o === 1) {
    const hi = Math.max(a0, b0);
    const lo = Math.min(a0, b0);
    ans = hi - lo;
    s = `${hi} − ${lo}`;
  } else {
    const a = rand(11) + 2;
    const b = rand(9) + 2;
    ans = a * b;
    s = `${a} × ${b}`;
  }
  return makeOpts(`${s} = ?`, ans);
}

const CN = ['RED', 'BLUE', 'GREEN', 'YELLOW'];
const CH = ['#ff3b3b', '#2f6bff', '#1fb85a', '#f2b705'];
const TS = '2px 2px 0 #18122b,-2px -2px 0 #18122b,2px -2px 0 #18122b,-2px 2px 0 #18122b';

export function colorQ(): Q {
  const w = rand(4);
  const c = rand(4);
  return {
    q: `<span style="color:${CH[c]};text-shadow:${TS}">${CN[w]}</span>`,
    o: CN.slice(),
    a: c,
  };
}

export function patternQ(): Q {
  const t = rand(3);
  const s: number[] = [];
  if (t === 0) {
    const a = rand(15) + 1;
    const d = rand(8) + 2;
    for (let i = 0; i < 5; i++) s.push(a + d * i);
  } else if (t === 1) {
    const a = rand(3) + 1;
    const d = rand(2) + 2;
    for (let i = 0; i < 5; i++) s.push(a * Math.pow(d, i));
  } else {
    const a = rand(10) + 1;
    const d1 = rand(5) + 1;
    const d2 = rand(5) + 6;
    s.push(a);
    for (let i = 1; i < 5; i++) s.push(s[i - 1] + (i % 2 ? d1 : d2));
  }
  const ans = s.pop()!;
  return makeOpts(`${s.join(', ')}, ?`, ans);
}

export default function Quiz({
  gen,
  onScore,
  onEnd,
}: GameProps & { gen: () => Q }) {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [q, setQ] = useState<Q>(() => gen());

  useEffect(() => {
    onScore(score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  useEffect(() => {
    const iv = setInterval(() => {
      setTime((t) => {
        const nt = t - 1;
        if (nt <= 0) {
          clearInterval(iv);
          setTimeout(() => onEnd(score, 'correct answers in 30 seconds'), 0);
          return 0;
        }
        return nt;
      });
    }, 1000);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  // expose time to parent via DOM event? Instead render local timer chip through callback hack:
  useEffect(() => {
    const el = document.getElementById('time');
    if (el) {
      el.hidden = false;
      el.textContent = `${Math.max(time, 0)}s left`;
    }
  }, [time]);

  const pick = (i: number) => {
    if (i === q.a) {
      const ns = score + 1;
      setScore(ns);
      setQ(gen());
    } else {
      setTime((t) => Math.max(0, t - 3));
      setQ(gen());
    }
  };

  return (
    <div className="quiz-wrap">
      <div className="q" dangerouslySetInnerHTML={{ __html: q.q }} />
      <div className="opts">
        {q.o.map((x, i) => (
          <button key={i} onClick={() => pick(i)}>
            {x}
          </button>
        ))}
      </div>
    </div>
  );
}

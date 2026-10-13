import { useEffect, useRef, useState } from 'react';
import type { GameProps } from './types';
import { rand } from '../lib/brain';

const PAL = ['#ff5fa2', '#6fd3ff', '#ffd23f', '#c6ff3d', '#a678ff', '#ff9e4f', '#2fd36b', '#ff4d4d'];

export default function TapZen({ onEnd }: GameProps) {
  const [rd, setRd] = useState(0);
  const [tot, setTot] = useState(0);
  const [box, setBox] = useState({ bg: '#6fd3ff', txt: 'Get ready…', fg: '#18122b' });
  const [ready, setReady] = useState(false);
  const [hint, setHint] = useState('');
  const st = useRef(0);
  const last = useRef('');
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    const t = window.setTimeout(fn, ms);
    timers.current.push(t);
  };

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    const el = document.getElementById('time');
    if (el) el.hidden = true;
  }, []);

  const finish = (total: number) => {
    const avg = Math.round(total / 3);
    onEnd(Math.max(0, Math.round((600 - avg) / 5)), `average reaction: ${avg} ms`);
  };

  const wait = (round: number) => {
    setReady(false);
    setHint(`Round ${round + 1} of 3: tap only when it turns black`);
    const n = 2 + rand(4);
    let k = 0;
    const step = () => {
      if (k >= n) {
        setReady(true);
        st.current = performance.now();
        setBox({ bg: '#000', txt: 'TAP!', fg: '#fff' });
        return;
      }
      let c = PAL[rand(PAL.length)];
      while (c === last.current) c = PAL[rand(PAL.length)];
      last.current = c;
      setBox({ bg: c, txt: 'Wait for black…', fg: '#18122b' });
      k++;
      later(step, 550 + rand(650));
    };
    step();
  };

  useEffect(() => {
    wait(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tap = () => {
    if (!ready) {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setBox({ bg: 'var(--sun)', txt: 'Too soon! Try again', fg: '#18122b' });
      const nt = tot + 500;
      const nr = rd + 1;
      setTot(nt);
      setRd(nr);
      if (nr >= 3) {
        later(() => finish(nt), 800);
        return;
      }
      later(() => wait(nr), 900);
      return;
    }
    const ms = Math.round(performance.now() - st.current);
    setReady(false);
    const nt = tot + ms;
    const nr = rd + 1;
    setTot(nt);
    setRd(nr);
    setBox({ bg: 'var(--sky)', txt: `${ms} ms`, fg: '#18122b' });
    if (nr >= 3) later(() => finish(nt), 900);
    else later(() => wait(nr), 900);
  };

  return (
    <>
      <button className="tapbox" onClick={tap} style={{ background: box.bg, color: box.fg }}>
        {box.txt}
      </button>
      <p className="hint">{hint}</p>
      <div className="rdots" aria-label={`Round ${Math.min(rd + 1, 3)} of 3`}>
        {[0, 1, 2].map((i) => (
          <i key={i} className={`rdot${i < rd ? ' on' : ''}`} />
        ))}
      </div>
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import type { GameProps } from './types';
import { STARTUPS, FLAGS, CARS, BIKES, logoUrl, type Startup } from '../data/logos';
import { rand, shuffle } from '../lib/brain';

type Cat = 'startups' | 'flags' | 'cars' | 'bikes';

const CATS: { id: Cat; label: string }[] = [
  { id: 'startups', label: '🚀 Startups' },
  { id: 'flags', label: '🏁 Flags' },
  { id: 'cars', label: '🚗 Cars' },
  { id: 'bikes', label: '🏍️ Bikes' },
];

function brandName(item: string): string {
  return item.split('|')[0];
}

export default function LogoHunt({ onScore, onEnd }: GameProps) {
  const [cat, setCat] = useState<Cat | null>(null);
  const [target, setTarget] = useState<string>('');
  const [options, setOptions] = useState<(Startup | string | [string, string])[]>([]);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState('');
  const [locked, setLocked] = useState(false);
  const [roundKey, setRoundKey] = useState(0);
  const [imgErr, setImgErr] = useState<Record<string, boolean>>({});
  const timer = useRef<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.getElementById('time');
    if (el) el.hidden = true;
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    onScore(score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  const newRound = (c: Cat, lv: number, sc: number) => {
    setLocked(false);
    setMsg('');
    let tg = '';
    let opts: (Startup | string | [string, string])[] = [];
    if (c === 'startups') {
      const pool = shuffle([...STARTUPS]);
      const t = pool[0];
      tg = t.name;
      opts = shuffle(pool.slice(0, 6));
    } else if (c === 'flags') {
      const pool = shuffle([...FLAGS]);
      tg = pool[0][0];
      opts = shuffle(pool.slice(0, 6));
    } else if (c === 'cars') {
      const pool = shuffle([...CARS]);
      tg = brandName(pool[0]);
      opts = shuffle(pool.slice(0, 6));
    } else {
      const pool = shuffle([...BIKES]);
      tg = brandName(pool[0]);
      opts = shuffle(pool.slice(0, 6));
    }
    setTarget(tg);
    setOptions(opts);
    setRoundKey((k) => k + 1);
    setMsg(`${c === 'startups' ? 'Startups' : c[0].toUpperCase() + c.slice(1)} · lives ${'♥'.repeat(Math.max(lv, 0))}`);

    if (timer.current) clearTimeout(timer.current);
    const w = 2500 + rand(1000);
    requestAnimationFrame(() => {
      const bar = barRef.current;
      if (bar) {
        bar.style.transition = 'none';
        bar.style.width = '100%';
        void bar.offsetWidth;
        bar.style.transition = `width ${w}ms linear`;
        bar.style.width = '0';
      }
    });
    timer.current = window.setTimeout(() => {
      setLocked(true);
      fail(c, lv, sc, 'Too slow!');
    }, w);
  };

  const fail = (c: Cat, lv: number, sc: number, why: string) => {
    const nl = lv - 1;
    setLives(nl);
    setMsg(`${why} · lives ${'♥'.repeat(Math.max(nl, 0))}`);
    if (nl <= 0) {
      if (timer.current) clearTimeout(timer.current);
      window.setTimeout(() => onEnd(sc, `${c} spotted`), 1000);
    } else {
      if (timer.current) clearTimeout(timer.current);
      window.setTimeout(() => newRound(c, nl, sc), 1000);
    }
  };

  const start = (c: Cat) => {
    setCat(c);
    setLives(3);
    setScore(0);
    setImgErr({});
    setTimeout(() => newRound(c, 3, 0), 0);
  };

  const pick = (item: Startup | string | [string, string]) => {
    if (!cat || locked) return;
    let name = '';
    if (cat === 'startups') name = (item as Startup).name;
    else if (cat === 'flags') name = (item as [string, string])[0];
    else name = brandName(item as string);

    if (timer.current) clearTimeout(timer.current);
    if (name === target) {
      setLocked(true);
      const ns = score + 1;
      setScore(ns);
      window.setTimeout(() => newRound(cat, lives, ns), 450);
    } else {
      setLocked(true);
      fail(cat, lives, score, 'Wrong one!');
    }
  };

  if (!cat) {
    return (
      <>
        <p className="hint">Pick a category — startups use real brand logos</p>
        <div className="opts">
          {CATS.map((c) => (
            <button key={c.id} onClick={() => start(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="startup-strip">
          {STARTUPS.slice(0, 8).map((s) => (
            <span key={s.slug} className="mini-logo" style={{ background: s.bg }} title={s.name}>
              <img src={logoUrl(s)} alt={`${s.name} logo`} loading="lazy" width={22} height={22} />
            </span>
          ))}
        </div>
        <p className="hint small">Real marks via Simple Icons CDN · {STARTUPS.length} startups</p>
      </>
    );
  }

  return (
    <>
      <div className="q" style={{ fontSize: 'clamp(22px,5.5vw,36px)' }}>
        Tap the <u>{target}</u> {cat === 'flags' ? 'flag' : 'logo'}
      </div>
      <div className="lbar">
        <i key={roundKey} ref={barRef} />
      </div>
      <div className="lg">
        {options.map((it, i) => {
          if (cat === 'startups') {
            const s = it as Startup;
            const broken = imgErr[s.slug];
            return (
              <button
                key={s.slug + i}
                className="lt startup-tile"
                style={{ background: s.bg, color: s.fg }}
                onClick={() => pick(it)}
                aria-label={s.name}
              >
                {!broken ? (
                  <img
                    src={logoUrl(s)}
                    alt={`${s.name} logo`}
                    loading="lazy"
                    onError={() => setImgErr((m) => ({ ...m, [s.slug]: true }))}
                  />
                ) : (
                  <span className="fallback">{s.name[0]}</span>
                )}
                <span className="sname">{s.name}</span>
              </button>
            );
          }
          if (cat === 'flags') {
            const f = it as [string, string];
            const isTarget = f[0] === target;
            return (
              <button
                key={f[0] + i}
                className={`lt${locked && isTarget ? ' ok' : ''}`}
                style={{ background: '#fff', padding: 8 }}
                onClick={() => pick(it)}
                aria-label={f[0]}
              >
                <svg viewBox="0 0 30 20" style={{ width: '100%', display: 'block', borderRadius: 6 }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: f[1] }} />
              </button>
            );
          }
          const str = it as string;
          const [n, bg, fg] = str.split('|');
          return (
            <button
              key={n + i}
              className="lt"
              style={{ background: bg, color: fg, fontSize: n.length > 9 ? 14 : 19 }}
              onClick={() => pick(it)}
            >
              {n}
            </button>
          );
        })}
      </div>
      <p className="hint">{msg}</p>
      <div className="acts">
        <button onClick={() => setCat(null)}>Change category</button>
      </div>
    </>
  );
}

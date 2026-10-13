import { useEffect, useMemo, useState } from 'react';
import {
  GAMES,
  CATS,
  loadSave,
  persistSave,
  dayStr,
  dailyGame,
  type GameId,
  type Save,
} from './lib/brain';
import GridFlash from './games/GridFlash';
import DigitVault from './games/DigitVault';
import { MathRush, ColorClash, NextUp } from './games/quizGames';
import TapZen from './games/TapZen';
import LogoHunt from './games/LogoHunt';
import { BrainPlanet, RoboDoodle, RocketDoodle, Star } from './components/space';

const ARROW = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#FFF14D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

function Dots({ level }: { level: number }) {
  return (
    <span className="dts">
      {[1, 2, 3].map((i) => (
        <i key={i} className="dt" style={{ background: i <= level ? 'currentColor' : 'transparent' }} />
      ))}
    </span>
  );
}

export default function App() {
  const [save, setSave] = useState<Save>(() => loadSave());
  const [filter, setFilter] = useState<(typeof CATS)[number]>('ALL');
  const [cur, setCur] = useState<GameId | null>(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<{ score: number; msg: string; gain: number; bonus: boolean; isBest: boolean; up: boolean } | null>(null);
  const [pops, setPops] = useState<{ x: string; y: string; c: string; ch: string; l: string; t: string }[]>([]);

  useEffect(() => {
    persistSave(save);
  }, [save]);

  const dg = useMemo(() => dailyGame(), []);
  const level = Math.floor(save.xp / 200) + 1;
  const into = save.xp % 200;

  const confetti = () => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const E = ['★', '✦', '●', '▲', '■', '✺'];
    const C = ['#FF4FA3', '#3D5AFE', '#3DF2B0', '#111', '#FF5C39'];
    const arr = Array.from({ length: 14 }, () => ({
      x: `${Math.floor(Math.random() * 500) - 250}px`,
      y: `${Math.floor(Math.random() * 500) - 300}px`,
      c: C[Math.floor(Math.random() * C.length)],
      ch: E[Math.floor(Math.random() * E.length)],
      l: `${window.innerWidth / 2}px`,
      t: `${window.innerHeight / 2}px`,
    }));
    setPops(arr);
    setTimeout(() => setPops([]), 1200);
  };

  const play = (id: GameId) => {
    setCur(id);
    setScore(0);
    setResult(null);
    setTimeout(() => window.scrollTo({ top: 0 }), 0);
  };

  const quit = () => {
    setCur(null);
    setResult(null);
    setScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnd = (finalScore: number, msg: string) => {
    if (!cur) return;
    const g = GAMES.find((x) => x.id === cur)!;
    let gain = 10 + Math.round(finalScore * g.mult);
    const pl = Math.floor(save.xp / 200);
    let bonus = false;
    let next = { ...save };
    if (g.id === dg.id && save.daily !== dayStr(0)) {
      gain += 50;
      next.daily = dayStr(0);
      bonus = true;
    }
    const isBest = finalScore > (save.best[g.id] || 0);
    if (isBest) next.best = { ...next.best, [g.id]: finalScore };
    next.xp += gain;
    next.played += 1;
    const d = dayStr(0);
    if (next.last !== d) {
      next.n = next.last === dayStr(1) ? next.n + 1 : 1;
      next.last = d;
    }
    if (!next.days.includes(d)) next.days = [...next.days, d].slice(-30);
    const up = Math.floor(next.xp / 200) > pl;
    setSave(next);
    setScore(finalScore);
    setResult({ score: finalScore, msg, gain, bonus, isBest: isBest && finalScore > 0, up });
    if ((isBest && finalScore > 0) || up || bonus) confetti();
  };

  const bars: [string, number, string][] = [
    ['memory', Math.max(save.best.mem || 0, save.best.dig || 0) * 10, '#3DF2B0'],
    ['math', (save.best.mat || 0) * 4, '#FF5C39'],
    ['focus', (save.best.col || 0) * 4, '#A678FF'],
    ['logic', (save.best.pat || 0) * 5, '#FF8AD8'],
    ['speed', save.best.rea || 0, '#FFF14D'],
    ['brands', (save.best.log || 0) * 8, '#3D5AFE'],
  ];

  const visible = GAMES.filter((g) => filter === 'ALL' || g.tag === filter);
  const curMeta = cur ? GAMES.find((g) => g.id === cur)! : null;

  const renderGame = () => {
    if (!cur) return null;
    const props = { onScore: setScore, onEnd: handleEnd };
    switch (cur) {
      case 'mem': return <GridFlash {...props} />;
      case 'dig': return <DigitVault {...props} />;
      case 'mat': return <MathRush {...props} />;
      case 'pat': return <NextUp {...props} />;
      case 'col': return <ColorClash {...props} />;
      case 'rea': return <TapZen {...props} />;
      case 'log': return <LogoHunt {...props} />;
    }
  };

  const body = result ? (
    <div className="res">
      <div className="big">{result.score}</div>
      <p className="hint">{result.msg}</p>
      <p className="hint">
        <b>+{result.gain} XP</b>
        {result.bonus ? ' · daily drop bonus' : ''}
        {result.isBest ? ' · new best' : ''}
        {result.up ? ' · level up' : ''}
      </p>
      <div className="acts">
        <button className="p" onClick={() => cur && play(cur)}>Play again</button>
        <button onClick={quit}>All games</button>
      </div>
    </div>
  ) : (
    renderGame()
  );

  /* Focus mode: only the picked game is visible — nothing above or below it */
  if (curMeta) {
    return (
      <main className="focus">
        <div className="focus-top">
          <button className="backbtn" onClick={quit}>← All games</button>
          <span className="mo focus-tag">{curMeta.tag} · {curMeta.name}</span>
          <span className="ch">score <b>{score}</b></span>
        </div>
        <section className="t pn focus-panel" style={{ background: curMeta.bg, color: curMeta.fg }} aria-label="Game">
          <div className="ph">
            <h2>{curMeta.name}</h2>
            <div className="pm">
              <span className="ch" id="time" hidden></span>
              <button onClick={quit}>Quit</button>
            </div>
          </div>
          <div id="area" aria-live="polite">{body}</div>
        </section>
        {pops.map((p, i) => (
          <span
            key={i}
            className="pop"
            style={{ color: p.c, left: p.l, top: p.t, ['--x' as string]: p.x, ['--y' as string]: p.y } as React.CSSProperties}
          >
            {p.ch}
          </span>
        ))}
      </main>
    );
  }

  return (
    <main>
      <nav>
        <span className="logo-stack" aria-label="brainmaxx" role="img">
          <span className="logo-word logo-brain">BRAIN</span>
          <span className="logo-word logo-maxx">MAXX</span>
        </span>
        <span className="nch">
          <span className="ch">{save.n} DAY STREAK</span>
          <span className="ch" style={{ background: '#3DF2B0' }}>LVL {level}</span>
        </span>
        <div className="flt filterbar" role="group" aria-label="Filter games">
          {CATS.map((c) => (
            <button key={c} className={`ch fc${c === filter ? ' on' : ''}`} aria-pressed={c === filter} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
      </nav>

      <div className="mq mo" aria-hidden="true">
        <span className="mqt">MEMORY + MATH + FOCUS + LOGIC + SPEED + BRANDS + MEMORY + MATH + FOCUS + LOGIC + SPEED + BRANDS + MEMORY + MATH + FOCUS + LOGIC + SPEED + BRANDS + MEMORY + MATH + FOCUS + LOGIC + SPEED + BRANDS + </span>
      </div>

      <section className="hero">
        <div className="t blue art">
          <BrainPlanet className="art-bg" />
          <Star className="csp b1" />
          <Star className="csp b2" tone="gold" />
          <Star className="csp b3" />
          <span className="ch" style={{ alignSelf: 'flex-start' }}>DAILY DROP</span>
          <h1>calm brain,<br />big brain.</h1>
          <div className="xr">
            <div className="bar"><i style={{ width: `${into / 2}%` }} /></div>
            <span className="mo">LVL {level} / {into} of 200 XP</span>
          </div>
          <div className="act">
            <button className="bt" onClick={() => play(dg.id)}>Play today</button>
            <span className="mo">{save.daily === dayStr(0) ? 'Daily drop done. Nice.' : `Today: ${dg.name} (+50 XP)`}</span>
          </div>
        </div>
        <div className="t blk art">
          <RocketDoodle className="art-bg rk-mini" />
          <Star className="csp r1" tone="gold" />
          <Star className="csp r2" />
          <span className="mo">streak</span>
          <h2>{save.n}<small>{save.n === 1 ? ' day' : ' days'}</small></h2>
          <div className="dots" aria-label="Last 7 days">
            {[6, 5, 4, 3, 2, 1, 0].map((i) => (
              <i key={i} className={`wd${save.days.includes(dayStr(i)) ? ' on' : ''}`} />
            ))}
          </div>
          <p style={{ margin: 'auto 0 0', fontSize: 15 }}>Play once a day to keep it alive.</p>
        </div>
        <div className="t wht art">
          <RoboDoodle className="art-bg robo-t" />
          <span className="mo">brain stats</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {bars.map(([k, v, c]) => {
              const pct = Math.min(100, Math.round(v));
              return (
                <div key={k}>
                  <div className="mo" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span>{k}</span><span>{pct}</span>
                  </div>
                  <div className="bar"><i style={{ width: `${pct}%`, background: c }} /></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="sech">
        <h2>pick your game</h2>
      </div>

      <section className="games" id="games">
        {visible.map((g, idx) => (
          <button
            key={g.id}
            className="t gt"
            style={{ background: g.bg, color: g.fg }}
            onClick={() => play(g.id)}
          >
            <span className="mo gh">
              <span>0{GAMES.indexOf(g) + 1} / {g.tag}</span>
              <Dots level={g.level} />
            </span>
            <span className="vz">
              {g.id === 'mem' ? (
                <span style={{ display: 'grid', gridTemplateColumns: 'repeat(3,14px)', gap: 4 }}>
                  {[1, 0, 0, 0, 1, 0, 0, 0, 1].map((x, i) => (
                    <i key={i} style={{ width: 14, height: 14, border: '2px solid #111', borderRadius: 4, background: x ? '#111' : '#fff' }} />
                  ))}
                </span>
              ) : g.id === 'dig' ? '5 8 2 _'
              : g.id === 'mat' ? '12+9=?'
              : g.id === 'pat' ? '2 4 8 ?'
              : g.id === 'col' ? <span style={{ color: '#FF5C39' }}>BLUE</span>
              : g.id === 'rea' ? 'TAP!'
              : 'LOGO ?'}
            </span>
            <b className="gn">{g.name}{idx === 0 && g.id === 'log' ? '' : ''}</b>
            <span className="gd">{g.desc}</span>
            <span className="gf">
              <span className="mo">best {save.best[g.id] || 0}</span>
              <span className="go">{ARROW}</span>
            </span>
          </button>
        ))}
      </section>

      {pops.map((p, i) => (
        <span
          key={i}
          className="pop"
          style={{ color: p.c, left: p.l, top: p.t, ['--x' as string]: p.x, ['--y' as string]: p.y } as React.CSSProperties}
        >
          {p.ch}
        </span>
      ))}
    </main>
  );
}

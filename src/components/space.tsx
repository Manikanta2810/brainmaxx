import type { GameId } from '../lib/brain';

/* Doodle-style space + game illustrations (thick black outlines, flat fills).
   Everything is hand-drawn inline SVG — no image assets needed. */

export function Star({ className = '', tone = 'white' }: { className?: string; tone?: 'white' | 'gold' | 'ink' }) {
  const fill = tone === 'gold' ? '#FFF14D' : tone === 'ink' ? '#111' : '#fff';
  return (
    <svg className={`sp sp-star ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 1c.9 6.5 2.6 8.2 9.1 9.1-6.5.9-8.2 2.6-9.1 9.1-.9-6.5-2.6-8.2-9.1-9.1C9.4 9.2 11.1 7.5 12 1z"
        fill={fill}
        stroke="#111"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarInline({ size = 26 }: { size?: number }) {
  return (
    <svg className="star-inline" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 1c.9 6.5 2.6 8.2 9.1 9.1-6.5.9-8.2 2.6-9.1 9.1-.9-6.5-2.6-8.2-9.1-9.1C9.4 9.2 11.1 7.5 12 1z"
        fill="#fff"
        stroke="#111"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SaturnMark({ className = '', body = '#8B5CF6', band = '#C9B8FF' }: { className?: string; body?: string; band?: string }) {
  return (
    <svg className={`sat ${className}`} viewBox="0 0 120 90" aria-hidden="true">
      <ellipse cx="60" cy="48" rx="55" ry="16" fill="none" stroke="#111" strokeWidth="8" />
      <ellipse cx="60" cy="48" rx="55" ry="16" fill="none" stroke={band} strokeWidth="3" />
      <circle cx="55" cy="44" r="24" fill={body} stroke="#111" strokeWidth="4" />
      <ellipse cx="47" cy="37" rx="9" ry="6" fill="#fff" opacity=".45" />
      <path d="M5 48 A55 16 0 0 0 115 48" fill="none" stroke="#111" strokeWidth="8" strokeLinecap="round" />
      <path d="M5 48 A55 16 0 0 0 115 48" fill="none" stroke={band} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function MoonCrescent({ className = '' }: { className?: string }) {
  return (
    <svg className={`moon-c ${className}`} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <mask id="mooncapcut">
          <rect width="64" height="64" fill="#fff" />
          <circle cx="44" cy="20" r="20" fill="#000" />
        </mask>
      </defs>
      <g mask="url(#mooncapcut)">
        <circle cx="30" cy="34" r="24" fill="#FFF6BF" stroke="#111" strokeWidth="4" />
        <circle cx="22" cy="28" r="4" fill="#E8D47A" />
        <circle cx="18" cy="42" r="3" fill="#E8D47A" />
      </g>
    </svg>
  );
}

export function MoonBig({ className = '' }: { className?: string }) {
  return (
    <svg className={`moon-big ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="88" fill="#EFE3CC" stroke="#111" strokeWidth="6" />
      <circle cx="70" cy="70" r="18" fill="#D9C8A8" stroke="#111" strokeWidth="4" />
      <circle cx="125" cy="55" r="11" fill="#D9C8A8" stroke="#111" strokeWidth="4" />
      <circle cx="140" cy="120" r="22" fill="#D9C8A8" stroke="#111" strokeWidth="4" />
      <circle cx="80" cy="135" r="12" fill="#D9C8A8" stroke="#111" strokeWidth="4" />
      <circle cx="105" cy="95" r="7" fill="#D9C8A8" stroke="#111" strokeWidth="3" />
    </svg>
  );
}

export function SunScene({ className = '' }: { className?: string }) {
  const long = 'M113 46 L127 46 L123 8 L117 8 Z';
  const short = 'M113 52 L127 52 L123 24 L117 24 Z';
  const rays = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <svg className={`sun-scene ${className}`} viewBox="0 0 240 240" aria-hidden="true">
      <circle cx="120" cy="120" r="106" fill="#FFB84D" opacity=".45" />
      <g className="rays" fill="#F59E0B" stroke="#F59E0B" strokeWidth="3" strokeLinejoin="round">
        {rays.map((i) => (
          <path key={i} d={i % 2 ? short : long} transform={`rotate(${i * 30} 120 120)`} />
        ))}
      </g>
      <circle cx="120" cy="120" r="80" fill="#FF9E4F" />
      <circle cx="120" cy="120" r="62" fill="#FFD23F" />
      <circle cx="101" cy="103" r="16" fill="#FFE89A" opacity=".85" />
    </svg>
  );
}

export function Astro() {
  return (
    <svg className="astro" viewBox="0 0 170 150" aria-hidden="true">
      <path d="M5 150 L5 128 Q40 100 85 102 Q135 104 165 126 L165 150 Z" fill="#B9B3C7" stroke="#111" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="58" cy="122" r="5" fill="#9A93AD" />
      <circle cx="112" cy="117" r="7" fill="#9A93AD" />
      <circle cx="142" cy="128" r="4" fill="#9A93AD" />
      <rect x="108" y="50" width="20" height="42" rx="8" fill="#A678FF" stroke="#111" strokeWidth="4" />
      <circle cx="118" cy="60" r="4" fill="#FF8AD8" stroke="#111" strokeWidth="2.5" />
      <rect x="50" y="96" width="52" height="14" rx="7" fill="#fff" stroke="#111" strokeWidth="4" />
      <rect x="40" y="92" width="18" height="22" rx="8" fill="#8F89A3" stroke="#111" strokeWidth="4" />
      <rect x="80" y="48" width="32" height="58" rx="13" fill="#fff" stroke="#111" strokeWidth="4" />
      <rect x="87" y="60" width="15" height="18" rx="4" fill="#BFE3FF" stroke="#111" strokeWidth="3" />
      <circle cx="94" cy="66" r="3" fill="#FF5C39" />
      <rect x="70" y="54" width="12" height="30" rx="6" fill="#fff" stroke="#111" strokeWidth="4" />
      <circle cx="86" cy="30" r="21" fill="#fff" stroke="#111" strokeWidth="4" />
      <circle cx="80" cy="30" r="13" fill="#241F3D" />
      <circle cx="75" cy="25" r="3.5" fill="#fff" />
      <circle cx="105" cy="28" r="4" fill="#FF8AD8" stroke="#111" strokeWidth="2.5" />
    </svg>
  );
}

export function ShootStar({ className = '' }: { className?: string }) {
  return (
    <svg className={`shoot ${className}`} viewBox="0 0 140 90" aria-hidden="true">
      <path d="M8 78 Q50 70 78 44" fill="none" stroke="#FF5C39" strokeWidth="9" strokeLinecap="round" />
      <path d="M14 60 Q48 56 70 36" fill="none" stroke="#FF9E4F" strokeWidth="6" strokeLinecap="round" />
      <path
        d="M104 4c1.2 9 3.6 11.4 12.6 12.6-9 1.2-11.4 3.6-12.6 12.6-1.2-9-3.6-11.4-12.6-12.6 9-1.2 11.4-3.6 12.6-12.6z"
        fill="#FFF14D"
        stroke="#111"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M126 44c.8 6 2.4 7.6 8.4 8.4-6 .8-7.6 2.4-8.4 8.4-.8-6-2.4-7.6-8.4-8.4 6-.8 7.6-2.4 8.4-8.4z"
        fill="#fff"
        stroke="#111"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EarthCorner({ className = '' }: { className?: string }) {
  return (
    <svg className={`earth ${className}`} viewBox="0 0 160 160" aria-hidden="true">
      <circle cx="80" cy="80" r="72" fill="#4D96FF" stroke="#111" strokeWidth="6" />
      <ellipse cx="58" cy="60" rx="26" ry="20" fill="#3DF2B0" stroke="#111" strokeWidth="4" />
      <ellipse cx="105" cy="100" rx="30" ry="22" fill="#3DF2B0" stroke="#111" strokeWidth="4" />
      <ellipse cx="112" cy="48" rx="12" ry="9" fill="#3DF2B0" stroke="#111" strokeWidth="4" />
      <circle cx="45" cy="110" r="7" fill="#3DF2B0" stroke="#111" strokeWidth="3" />
    </svg>
  );
}

export function MarsHill({ className = '' }: { className?: string }) {
  return (
    <svg className={`mars ${className}`} viewBox="0 0 400 110" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path d="M0 110 L0 72 Q60 30 130 56 Q200 82 270 52 Q340 24 400 62 L400 110 Z" fill="#E85D4D" stroke="#111" strokeWidth="5" strokeLinejoin="round" />
      <ellipse cx="82" cy="72" rx="17" ry="8" fill="#C04336" stroke="#111" strokeWidth="3" />
      <ellipse cx="205" cy="68" rx="23" ry="10" fill="#C04336" stroke="#111" strokeWidth="3" />
      <ellipse cx="322" cy="62" rx="14" ry="7" fill="#C04336" stroke="#111" strokeWidth="3" />
    </svg>
  );
}

/* ---------- games-section background scatter ---------- */

export function RocketDoodle({ className = '' }: { className?: string }) {
  return (
    <svg className={`rocket ${className}`} viewBox="0 0 64 80" aria-hidden="true">
      <g transform="rotate(24 32 40)">
        <path d="M32 4c8 8 10 18 8 28H24c-2-10 0-20 8-28z" fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="32" cy="20" r="6" fill="#3D5AFE" stroke="#111" strokeWidth="2.5" />
        <path d="M24 30l-10 14 10-3z" fill="#FF8AD8" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M40 30l10 14-10-3z" fill="#FF8AD8" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M28 32c0 7 1 11 4 15 3-4 4-8 4-15z" fill="#FFF14D" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M30 34c0 4 1 6 2 8 1-2 2-4 2-8z" fill="#FF5C39" />
      </g>
    </svg>
  );
}

export function MarsMini({ className = '' }: { className?: string }) {
  return (
    <svg className={`mars-mini ${className}`} viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="32" fill="#E85D4D" stroke="#111" strokeWidth="4" />
      <circle cx="28" cy="30" r="7" fill="#C04336" stroke="#111" strokeWidth="3" />
      <circle cx="52" cy="48" r="9" fill="#C04336" stroke="#111" strokeWidth="3" />
      <circle cx="44" cy="26" r="4" fill="#C04336" stroke="#111" strokeWidth="2.5" />
    </svg>
  );
}

export function PurpleMoon({ className = '' }: { className?: string }) {
  return (
    <svg className={`pmoon ${className}`} viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="32" fill="#A678FF" stroke="#111" strokeWidth="4" />
      <circle cx="28" cy="32" r="7" fill="#8B5CF6" stroke="#111" strokeWidth="3" />
      <circle cx="52" cy="50" r="9" fill="#8B5CF6" stroke="#111" strokeWidth="3" />
      <circle cx="50" cy="26" r="4" fill="#8B5CF6" stroke="#111" strokeWidth="2.5" />
    </svg>
  );
}

export function GameSky() {
  return (
    <div className="game-sky" aria-hidden="true">
      <div className="gs-orbit">
        <SaturnMark className="orb-sat" />
        <svg className="orb-swoosh" viewBox="0 0 140 70">
          <path d="M8 58 Q70 8 132 40" fill="none" stroke="#111" strokeWidth="3" strokeDasharray="9 9" strokeLinecap="round" />
        </svg>
      </div>
      <MarsMini className="gs-mars" />
      <RocketDoodle className="gs-rocket" />
      <ShootStar className="gs-shoot" />
      <SaturnMark className="gs-sat" body="#FF6B4A" band="#FFC46B" />
      <PurpleMoon className="gs-pmoon" />
      <MoonBig className="gs-moon" />
      <span className="gs-astro"><Astro /></span>
      <Star className="gs-s1" />
      <Star className="gs-s2" tone="gold" />
      <Star className="gs-s3" />
      <Star className="gs-s4" tone="gold" />
      <Star className="gs-s5" />
      <i className="sdot gd1" />
      <i className="sdot gd2" />
      <i className="sdot gd3" />
      <i className="sdot gd4" />
      <i className="sdot gd5" />
      <i className="sdot gd6" />
    </div>
  );
}

/* ---------- hero card art: brain planet + robot ---------- */

export function BrainPlanet({ className = '' }: { className?: string }) {
  return (
    <svg className={`brain-planet ${className}`} viewBox="0 0 140 140" aria-hidden="true">
      <circle cx="70" cy="70" r="54" fill="none" stroke="#fff" strokeWidth="2.5" strokeDasharray="4 7" strokeLinecap="round" opacity=".9" />
      <g transform="rotate(-18 70 70)">
        <ellipse cx="70" cy="70" rx="60" ry="21" fill="none" stroke="#111" strokeWidth="5" />
      </g>
      <circle cx="70" cy="70" r="30" fill="#F266AB" stroke="#111" strokeWidth="4" />
      <path d="M70 42c-6 12-6 44 0 56" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <path d="M57 54q9-7 17-2M58 70q10-6 19-1M60 85q8 5 15-1" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M83 54q7-4 12 1M84 70q7-3 11 2M82 84q6 3 10-1" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
      <g transform="rotate(-18 70 70)">
        <path d="M10 70 A60 21 0 0 0 130 70" fill="none" stroke="#111" strokeWidth="5" strokeLinecap="round" />
      </g>
      <circle cx="119" cy="44" r="6" fill="#3DF2B0" stroke="#111" strokeWidth="3" />
      <circle cx="127" cy="76" r="5" fill="#FFF14D" stroke="#111" strokeWidth="3" />
      <circle cx="22" cy="90" r="4.5" fill="#fff" stroke="#111" strokeWidth="3" />
      <path d="M30 26c.6 4.4 1.8 5.6 6.2 6.2-4.4.6-5.6 1.8-6.2 6.2-.6-4.4-1.8-5.6-6.2-6.2 4.4-.6 5.6-1.8 6.2-6.2z" fill="#fff" stroke="#111" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M112 102c.5 3.6 1.5 4.6 5.1 5.1-3.6.5-4.6 1.5-5.1 5.1-.5-3.6-1.5-4.6-5.1-5.1 3.6-.5 4.6-1.5 5.1-5.1z" fill="#fff" stroke="#111" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function RoboDoodle({ className = '' }: { className?: string }) {
  return (
    <svg className={`robo ${className}`} viewBox="0 0 64 60" aria-hidden="true">
      <path d="M32 12V6" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="6" r="5" fill="#F266AB" stroke="#111" strokeWidth="3" />
      <rect x="6" y="24" width="9" height="13" rx="3" fill="#3DF2B0" stroke="#111" strokeWidth="3" />
      <circle cx="55" cy="30" r="6" fill="#F266AB" stroke="#111" strokeWidth="3" />
      <rect x="14" y="15" width="36" height="29" rx="9" fill="#3DF2B0" stroke="#111" strokeWidth="3.5" />
      <circle cx="26" cy="28" r="5.5" fill="#fff" stroke="#111" strokeWidth="2.5" />
      <circle cx="38" cy="28" r="5.5" fill="#fff" stroke="#111" strokeWidth="2.5" />
      <circle cx="26" cy="28" r="2.4" fill="#111" />
      <circle cx="38" cy="28" r="2.4" fill="#111" />
      <path d="M27 37q5 4 10 0" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="22" y="44" width="20" height="10" rx="4" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="28" cy="49" r="2" fill="#FF5C39" />
      <circle cx="36" cy="49" r="2" fill="#3D5AFE" />
    </svg>
  );
}

/* ---------- per-game tile doodles ---------- */

export function GameArt({ id }: { id: GameId }) {
  switch (id) {
    case 'mem':
      return (
        <svg viewBox="0 0 64 56" className="gart" aria-hidden="true">
          <path d="M32 5C20 5 10 15 10 29c0 14 10 22 22 22 12 0 22-8 22-22C54 15 44 5 32 5z" fill="#FF8AD8" stroke="#111" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M32 5v46" stroke="#111" strokeWidth="3" />
          <path d="M24 15q-6 4-5 12M24 29q-7 3-6 10M40 15q6 4 5 12M40 29q7 3 6 10" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'dig':
      return (
        <svg viewBox="0 0 64 56" className="gart" aria-hidden="true">
          <circle cx="30" cy="28" r="21" fill="#fff" stroke="#111" strokeWidth="3.5" />
          <circle cx="30" cy="28" r="13" fill="#FF8AD8" stroke="#111" strokeWidth="3" />
          <circle cx="30" cy="28" r="5" fill="#111" />
          <path d="M45 4l-9 14 6 1-4 13 12-15-6-1z" fill="#FFF14D" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
    case 'mat':
      return (
        <svg viewBox="0 0 64 56" className="gart" aria-hidden="true">
          <rect x="15" y="3" width="34" height="50" rx="8" fill="#fff" stroke="#111" strokeWidth="3.5" />
          <rect x="21" y="9" width="22" height="10" rx="3" fill="#3D5AFE" stroke="#111" strokeWidth="2.5" />
          <g fill="#FF5C39" stroke="#111" strokeWidth="2">
            <rect x="21" y="24" width="9" height="7" rx="2" />
            <rect x="34" y="24" width="9" height="7" rx="2" />
            <rect x="21" y="34" width="9" height="7" rx="2" />
            <rect x="34" y="34" width="9" height="7" rx="2" />
            <rect x="21" y="44" width="9" height="6" rx="2" />
            <rect x="34" y="44" width="9" height="6" rx="2" />
          </g>
        </svg>
      );
    case 'pat':
      return (
        <svg viewBox="0 0 64 56" className="gart" aria-hidden="true">
          <g stroke="#111" strokeWidth="3" strokeLinecap="round">
            <path d="M32 2v7M10 10l5 5M54 10l-5 5M5 28h7M52 28h7" />
          </g>
          <circle cx="32" cy="26" r="14" fill="#FFF14D" stroke="#111" strokeWidth="3.5" />
          <path d="M28 22q4-3 7 0M29 29q3 2 6 0" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="26" y="39" width="12" height="7" rx="2" fill="#9AA0B4" stroke="#111" strokeWidth="3" />
          <rect x="28" y="46" width="8" height="5" rx="2" fill="#111" />
        </svg>
      );
    case 'col':
      return (
        <svg viewBox="0 0 64 56" className="gart" aria-hidden="true">
          <circle cx="23" cy="28" r="15" fill="#FF5C39" stroke="#111" strokeWidth="3.5" />
          <circle cx="41" cy="28" r="15" fill="#2F6BFF" stroke="#111" strokeWidth="3.5" />
          <path d="M32 14c.7 5 2 6.3 7 7-5 .7-6.3 2-7 7-.7-5-2-6.3-7-7 5-.7 6.3-2 7-7z" fill="#fff" stroke="#111" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case 'rea':
      return (
        <svg viewBox="0 0 64 56" className="gart" aria-hidden="true">
          <path d="M32 2l5 12 13-4-6 12 13 5-13 5 6 12-13-4-5 12-5-12-13 4 6-12-13-5 13-5-6-12 13 4z" fill="#FFF14D" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M36 14l-9 14 6 1-4 13 12-15-6-1z" fill="#FF5C39" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
    case 'log':
      return (
        <svg viewBox="0 0 64 56" className="gart" aria-hidden="true">
          <g transform="rotate(35 32 28)">
            <path d="M32 3c8 8 10 18 8 28H24c-2-10 0-20 8-28z" fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
            <circle cx="32" cy="20" r="6" fill="#3D5AFE" stroke="#111" strokeWidth="2.5" />
            <path d="M24 30l-9 12 9-2z" fill="#FF8AD8" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M40 30l9 12-9-2z" fill="#FF8AD8" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M28 32c0 6 2 9 4 12 2-3 4-6 4-12z" fill="#FFF14D" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
          </g>
        </svg>
      );
  }
}

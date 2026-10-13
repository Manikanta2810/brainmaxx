# Brainmaxx 🧠

**Calm brain, big brain.** A neo-brutalist brain-training arcade with 7 playable games,
XP levels, daily streaks, and a daily-drop bonus. Built with React + TypeScript + Vite.

## Games

| # | Game | Skill |
|---|------|-------|
| 01 | Grid Flash | Memory — watch it blink, rebuild it |
| 02 | Digit Vault | Memory — hold the number, no blinking |
| 03 | Math Rush | Math — mental sums vs the clock |
| 04 | Next Up | Logic — crack the pattern rule |
| 05 | Color Clash | Focus — say the color, skip the word |
| 06 | Tap Zen | Speed — tap only on black |
| 07 | Logo Hunt | Brands — real startup logos, flags, cars, bikes |

Logo Hunt uses real brand marks served from the Simple Icons CDN
(24 current AI + dev-tool startups).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## Deploy (Vercel)

Import this repo in Vercel — framework, build command (`npm run build`)
and output directory (`dist`) are auto-detected. No env vars needed.

## How it works

- XP, levels (200 XP each), best scores, streaks and play history persist in
  `localStorage` (`brainmaxx.bento.v1`).
- Playing the daily-drop game grants +50 XP bonus once per day.

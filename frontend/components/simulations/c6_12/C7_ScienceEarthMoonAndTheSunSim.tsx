'use client';

import React, { useEffect, useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'The Moon does not make its own light -- it reflects sunlight. As it circles the Earth (about ' +
  'once every 27 days), we see different amounts of its sunlit half: these are the PHASES, from ' +
  'new moon to full moon and back. Half the Moon is ALWAYS lit; only our view changes!';

const PHASES = [
  { at: 0, name: 'New Moon', desc: 'lit side faces away from us' },
  { at: 0.25, name: 'First Quarter', desc: 'right half lit' },
  { at: 0.5, name: 'Full Moon', desc: 'whole face lit' },
  { at: 0.75, name: 'Last Quarter', desc: 'left half lit' },
];

const phaseName = (t: number) => {
  if (t < 0.0625 || t >= 0.9375) return 'New Moon';
  if (t < 0.1875) return 'Waxing Crescent';
  if (t < 0.3125) return 'First Quarter';
  if (t < 0.4375) return 'Waxing Gibbous';
  if (t < 0.5625) return 'Full Moon';
  if (t < 0.6875) return 'Waning Gibbous';
  if (t < 0.8125) return 'Last Quarter';
  if (t < 0.9375) return 'Waning Crescent';
  return 'New Moon';
};

export function C7_ScienceEarthMoonAndTheSunSim() {
  const [t, setT] = useState(0.15); // 0..1 position in moon orbit
  const [playing, setPlaying] = useState(false);
  const [sunRays, setSunRays] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT((v) => (v + 0.004) % 1), 40);
    return () => clearInterval(id);
  }, [playing]);

  const angle = t * 2 * Math.PI;
  // Orbit view (top): Sun at left, Earth centre, Moon on circle radius 90
  const moonOrbit = { x: 300 + 130 * Math.cos(angle), y: 150 + 110 * Math.sin(angle) };
  const name = phaseName(t);
  const nearest = useMemo(() => PHASES.reduce((best, p) => (Math.abs(p.at - t) < Math.abs(best.at - t) ? p : best), PHASES[0]), [t]);

  // View-from-Earth: fraction of the disc that is lit (0 at new moon, 1 at full moon),
  // lit from the right while waxing (t <= 0.5) and from the left while waning.
  const litFrac = (1 - Math.cos(angle)) / 2;
  const shadowW = (1 - litFrac) * 78;
  const shadowRect = t <= 0.5 ? { x: -39, w: shadowW } : { x: 49 - shadowW, w: shadowW };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">Earth, Moon, and the Sun: Moon Phases</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700 overflow-x-auto">
        <svg viewBox="0 0 620 300" className="w-full" style={{ minWidth: 480 }}>
          {/* sunlight arrows */}
          {sunRays &&
            [70, 150, 230].map((y) => (
              <g key={y}>
                <line x1={8} y1={y} x2={60} y2={y} stroke="#fbbf24" strokeWidth={3} />
                <polygon points="60,94 74,100 60,106" transform={`translate(0, ${y - 100})`} fill="#fbbf24" />
              </g>
            ))}
          {/* Sun */}
          <circle cx={30} cy={150} r={26} fill="#fbbf24">
            <animate attributeName="r" values="25;27;25" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x={30} y={192} textAnchor="middle" fill="#fbbf24" fontSize={12}>Sun</text>
          {/* orbit path */}
          <ellipse cx={300} cy={150} rx={130} ry={110} fill="none" stroke="#334155" strokeDasharray="5 5" />
          {/* Earth */}
          <circle cx={300} cy={150} r={24} fill="#3b82f6" />
          <path d="M 285 140 A 24 24 0 0 1 315 140 L 300 150 Z" fill="#22c55e" opacity={0.7} />
          <text x={300} y={192} textAnchor="middle" fill="#60a5fa" fontSize={12}>Earth (you are here)</text>
          {/* Moon in orbit with half-lit ball */}
          <g style={{ transition: 'all 0.1s linear' }}>
            <circle cx={moonOrbit.x} cy={moonOrbit.y} r={16} fill="#0f172a" stroke="#64748b" />
            <clipPath id={`moonball`}>
              <circle cx={moonOrbit.x} cy={moonOrbit.y} r={15} />
            </clipPath>
            <rect x={moonOrbit.x - 16} y={moonOrbit.y - 16} width={15} height={32} fill="#e2e8f0" clipPath="url(#moonball)" />
          </g>
          <text x={moonOrbit.x} y={moonOrbit.y + 34} textAnchor="middle" fill="#e2e8f0" fontSize={11}>Moon</text>

          {/* View from Earth panel */}
          <g transform="translate(470, 110)">
            <rect x={-60} y={-55} width={130} height={120} rx={12} fill="#020617" stroke="#334155" />
            <text x={5} y={-38} textAnchor="middle" fill="#94a3b8" fontSize={10}>what you see</text>
            <circle cx={5} cy={15} r={34} fill="#e2e8f0" />
            <clipPath id="viewdisc">
              <circle cx={5} cy={15} r={34} />
            </clipPath>
            <rect x={shadowRect.x} y={-25} width={shadowRect.w} height={80} fill="#020617" clipPath="url(#viewdisc)" style={{ transition: 'all 0.15s linear' }} />
            <text x={5} y={58} textAnchor="middle" fill="#34d399" fontSize={12} fontWeight="bold">{name}</text>
          </g>
        </svg>
      </div>

      {/* Controls */}
      <div className="mt-4 p-3 bg-slate-800 rounded-2xl border border-slate-600">
        <label className="text-xs text-slate-300 flex justify-between">
          <span>Moon&apos;s position in its trip around Earth (27.3 days)</span>
          <span className="font-mono font-bold text-emerald-300">day {Math.round(t * 27.3)} of 27.3</span>
        </label>
        <input type="range" aria-label="moon orbit position" min={0} max={1} step={0.002} value={t} onChange={(e) => setT(Number(e.target.value))} className="w-full mt-2 accent-emerald-400" />
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setPlaying((p) => !p)}
          className={`px-5 py-2 rounded-xl text-sm font-bold border transition-colors ${playing ? 'bg-rose-600 border-rose-400' : 'bg-emerald-600 border-emerald-400'}`}
        >
          {playing ? 'Pause the trip' : 'Play the trip'}
        </button>
        {PHASES.map((p) => (
          <button
            key={p.name}
            onClick={() => { setPlaying(false); setT(p.at); }}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${Math.abs(t - p.at) < 0.02 ? 'bg-gold-600 border-gold-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
          >
            {p.name}
          </button>
        ))}
        <button
          onClick={() => setSunRays((s) => !s)}
          className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${sunRays ? 'bg-amber-600 border-amber-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
        >
          {sunRays ? 'Hide' : 'Show'} sunlight
        </button>
      </div>

      <div className="mt-4 p-3 bg-slate-950 rounded-2xl border border-slate-700 text-sm text-slate-300">
        {name} ({nearest.desc}): the sunlit half always faces the Sun; the {t < 0.5 ? 'evening sky' : 'late-night sky'} shows{' '}
        {t < 0.25 ? 'a thin growing sliver' : t < 0.45 ? 'more than half, growing' : t < 0.56 ? 'a bright full disc' : t < 0.75 ? 'more than half, shrinking' : 'a thin shrinking sliver'}.
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Press Play and watch the dark shadow sweep across the view-from-Earth disc. Which direction does the lit part grow -- from which side?</li>
          <li>Stop at day 7 and day 21. Both show a HALF-lit moon from Earth. So why are they given different names?</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_ScienceEarthMoonAndTheSunSim;

/**
 * C6 Science -- Beyond Earth (Curiosity)
 *
 * One chapter concept: the solar system -- planets orbit the Sun at
 * different distances and speeds; farther planets take much longer to
 * complete one orbit.
 *
 * Interaction model: watch planets orbit with speeds scaled to their
 * real orbital periods, click a planet to inspect it, toggle
 * true-distance scale, and change time speed.
 */
import React, { useState, useEffect } from 'react';

type Planet = {
  name: string;
  color: string;
  r: number; // drawn radius (compressed scale)
  au: number; // real distance in AU
  period: number; // Earth years for one orbit
  sizeEarth: number; // diameter relative to Earth
  fact: string;
};

const PLANETS: Planet[] = [
  { name: 'Mercury', color: '#a8a29e', r: 4, au: 0.4, period: 0.24, sizeEarth: 0.4, fact: 'Closest to the Sun and fastest -- its year is only 88 Earth days!' },
  { name: 'Venus', color: '#fbbf24', r: 6, au: 0.7, period: 0.62, sizeEarth: 0.95, fact: 'The hottest planet, wrapped in thick clouds of acid.' },
  { name: 'Earth', color: '#3b82f6', r: 6.5, au: 1, period: 1, sizeEarth: 1, fact: 'Our home -- the only planet known to have life and liquid water oceans.' },
  { name: 'Mars', color: '#ef4444', r: 5, au: 1.5, period: 1.9, sizeEarth: 0.5, fact: 'The red planet -- its colour comes from rusty iron dust.' },
  { name: 'Jupiter', color: '#f97316', r: 16, au: 5.2, period: 11.9, sizeEarth: 11, fact: 'The giant -- 11 Earths would fit across it! Its Great Red Spot is a huge storm.' },
  { name: 'Saturn', color: '#fde68a', r: 13, au: 9.5, period: 29.5, sizeEarth: 9.4, fact: 'Famous for its beautiful rings made of ice and rock.' },
  { name: 'Uranus', color: '#67e8f9', r: 9, au: 19.2, period: 84, sizeEarth: 4, fact: 'It rolls around the Sun on its side, like a rolling ball.' },
  { name: 'Neptune', color: '#6366f1', r: 9, au: 30, period: 165, sizeEarth: 3.9, fact: 'The farthest planet -- one Neptune year lasts 165 Earth years!' },
];

const CX = 330;
const CY = 140;

function orbitR(p: Planet, trueScale: boolean): number {
  return trueScale ? 18 + p.au * 8.5 : 26 + Math.log2(1 + p.au * 2) * 34;
}

function C6_ScienceBeyondEarthSim() {
  const [t, setT] = useState(0); // time in Earth years
  const [speed, setSpeed] = useState(2); // years per second
  const [running, setRunning] = useState(true);
  const [trueScale, setTrueScale] = useState(false);
  const [selected, setSelected] = useState<Planet>(PLANETS[2]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setT((v) => v + speed * 0.05), 50);
    return () => clearInterval(id);
  }, [running, speed]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-gold-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-gold-700">Beyond Earth -- our Solar System</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        Eight planets travel around the Sun on almost-circular paths called <b>orbits</b>. Planets near the Sun
        race around quickly; faraway planets crawl -- Neptune needs 165 Earth years for ONE trip! The Sun's
        gravity keeps every planet on its track.
      </p>

      <div className="flex flex-wrap items-center gap-3 mt-3 p-3 rounded-2xl bg-gold-50 border-2 border-gold-100">
        <label className="text-xs font-semibold text-slate-500">
          Time speed: <span className="text-gold-700 font-black">{speed} yr/s</span>
          <input type="range" min={1} max={10} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-36 accent-gold-600 ml-2" />
        </label>
        <button onClick={() => setRunning(!running)} className="px-4 py-1.5 rounded-full text-xs font-black bg-gold-600 text-white hover:bg-gold-700 transition-colors">
          {running ? 'Pause time' : 'Start time'}
        </button>
        <button onClick={() => setTrueScale(!trueScale)} className={'px-4 py-1.5 rounded-full text-xs font-black transition-colors ' + (trueScale ? 'bg-amber-400 text-amber-900' : 'bg-slate-200 text-slate-600 hover:bg-slate-300')}>
          {trueScale ? 'TRUE distances (hard!)' : 'Compressed distances'}
        </button>
        <span className="text-xs text-slate-400 font-mono">elapsed: {t.toFixed(1)} Earth years</span>
      </div>

      <div className="grid md:grid-cols-[1fr_230px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-gold-100 bg-gold-950 overflow-hidden">
          <svg viewBox="0 0 660 280" className="w-full">
            {trueScale && <circle cx={CX} cy={CY} r="130" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="2 4" />}
            {PLANETS.map((p) => {
              const R = orbitR(p, trueScale) * 0.85;
              const ang = (t / p.period) * 2 * Math.PI + p.au * 1.7;
              const x = CX + R * Math.cos(ang);
              const y = CY + R * Math.sin(ang) * 0.42; // slight tilt for depth
              return (
                <g key={p.name}>
                  <ellipse cx={CX} cy={CY} rx={R} ry={R * 0.42} fill="none" stroke={selected.name === p.name ? '#818cf8' : '#334155'} strokeWidth={selected.name === p.name ? 1.5 : 0.7} />
                  {p.name === 'Saturn' && <ellipse cx={x} cy={y} rx={p.r * 1.9} ry={p.r * 0.7} fill="none" stroke="#fde68a" strokeWidth="1.5" opacity="0.8" />}
                  <circle cx={x} cy={y} r={p.r} fill={p.color} className="cursor-pointer transition-all duration-75" onClick={() => setSelected(p)} />
                  {selected.name === p.name && <circle cx={x} cy={y} r={p.r + 4} fill="none" stroke="#fbbf24" strokeWidth="1.5" />}
                  <text x={x} y={y - p.r - 5} textAnchor="middle" fontSize="9" fill="#c7d2fe" className="pointer-events-none">{p.name}</text>
                </g>
              );
            })}
            <circle cx={CX} cy={CY} r="17" fill="#fbbf24" />
            <circle cx={CX} cy={CY} r="23" fill="#fbbf24" opacity="0.25" className="animate-pulse" />
            <text x={CX} y={CY + 38} textAnchor="middle" fontSize="10" fill="#fde68a" fontWeight="bold">SUN</text>
          </svg>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-1.5">
            {PLANETS.map((p) => (
              <button key={p.name} onClick={() => setSelected(p)} className={'px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all ' + (selected.name === p.name ? 'bg-gold-600 text-white' : 'bg-gold-100 text-gold-700 hover:bg-gold-200')}>
                {p.name}
              </button>
            ))}
          </div>
          <div className="p-3 rounded-2xl border-2" style={{ borderColor: selected.color, background: '#eef2ff' }}>
            <div className="text-sm font-black text-gold-900">{selected.name}</div>
            <div className="text-[11px] text-slate-600 mt-1 leading-snug">{selected.fact}</div>
            <div className="text-[11px] font-mono text-gold-700 mt-2 space-y-0.5">
              <div>distance: {selected.au} AU from Sun</div>
              <div>one year: {selected.period} Earth years</div>
              <div>size: {selected.sizeEarth}x Earth across</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-gold-50 border-2 border-gold-200">
        <div className="text-sm font-black text-gold-800">What to try</div>
        <ol className="text-xs text-gold-700 list-decimal list-inside mt-1 space-y-1">
          <li>Start time and count how many laps Earth finishes before Mars finishes ONE. Then check Jupiter -- why do we say a Jupiter year is "not over yet"?</li>
          <li>Switch to TRUE distances and click Neptune. Why do you think no human has ever travelled there?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceBeyondEarthSim };
export default C6_ScienceBeyondEarthSim;

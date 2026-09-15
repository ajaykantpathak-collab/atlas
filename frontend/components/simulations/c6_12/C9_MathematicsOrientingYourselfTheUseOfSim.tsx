'use client';

import React, { useMemo, useState } from 'react';

// ─── GRID HELPERS ───
const CELL = 24;
const ORIGIN = 220;
const toX = (v: number) => ORIGIN + v * CELL;
const toY = (v: number) => ORIGIN - v * CELL;
const randTarget = () => ({
  x: Math.floor(Math.random() * 17) - 8,
  y: Math.floor(Math.random() * 17) - 8,
});

// ─── MAIN COMPONENT: Cartesian plane explorer ───
export function C9_MathematicsOrientingYourselfTheUseOfSim() {
  const [px, setPx] = useState(3);
  const [py, setPy] = useState(4);
  const [target, setTarget] = useState({ x: -5, y: -2 });
  const [showTriangle, setShowTriangle] = useState(true);
  const [foundCount, setFoundCount] = useState(0);

  // ─── REAL NUMERICS ───
  const dOrigin = Math.sqrt(px * px + py * py);
  const dx = target.x - px;
  const dy = target.y - py;
  const dTarget = Math.sqrt(dx * dx + dy * dy);
  const found = dTarget === 0;

  const quadrant = useMemo(() => {
    if (px === 0 && py === 0) return 'the origin (0, 0)';
    if (px === 0) return 'on the y-axis';
    if (py === 0) return 'on the x-axis';
    if (px > 0 && py > 0) return 'Quadrant I (+, +)';
    if (px < 0 && py > 0) return 'Quadrant II (-, +)';
    if (px < 0 && py < 0) return 'Quadrant III (-, -)';
    return 'Quadrant IV (+, -)';
  }, [px, py]);

  const gridLines: number[] = [];
  for (let v = -8; v <= 8; v++) gridLines.push(v);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">CBSE Class 9 Mathematics - Coordinate Geometry</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Orienting Yourself: The Use of Coordinates</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300">
          Treasures found: {foundCount}
        </span>
      </header>

      {/* CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>x-coordinate</span>
            <span className="text-indigo-300 font-mono font-bold">{px}</span>
          </label>
          <input type="range" min={-8} max={8} value={px} aria-label="x coordinate"
            onChange={(e) => setPx(Number(e.target.value))} className="w-full mt-2 accent-indigo-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>y-coordinate</span>
            <span className="text-sky-300 font-mono font-bold">{py}</span>
          </label>
          <input type="range" min={-8} max={8} value={py} aria-label="y coordinate"
            onChange={(e) => setPy(Number(e.target.value))} className="w-full mt-2 accent-sky-500" />
        </div>
        <button
          onClick={() => setShowTriangle(!showTriangle)}
          className={`p-3 rounded-2xl text-sm font-bold border transition-all ${
            showTriangle ? 'bg-amber-950/60 border-amber-700 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          {showTriangle ? 'Rise-run triangle: ON' : 'Rise-run triangle: OFF'}
        </button>
      </div>

      {/* REFLECTION + TARGET CONTROLS */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setPy(-py)} className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800">
          Reflect in x-axis: (x, y) {'->'} (x, -y)
        </button>
        <button onClick={() => setPx(-px)} className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800">
          Reflect in y-axis: (x, y) {'->'} (-x, y)
        </button>
        <button onClick={() => { setPx(-px); setPy(-py); }} className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800">
          Reflect in origin: (x, y) {'->'} (-x, -y)
        </button>
        <button
          onClick={() => { setTarget(randTarget()); if (found) setFoundCount((c) => c + 1); }}
          className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-500"
        >
          {found ? 'Collect treasure + New target' : 'New target'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* PLANE */}
        <div className="md:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 p-2">
          <svg viewBox="0 0 440 440" className="w-full h-72 md:h-96">
            {gridLines.map((v) => (
              <g key={v}>
                <line x1={toX(v)} y1={toY(8)} x2={toX(v)} y2={toY(-8)} stroke={v === 0 ? '#64748b' : '#1e293b'} strokeWidth="1" />
                <line x1={toX(-8)} y1={toY(v)} x2={toX(8)} y2={toY(v)} stroke={v === 0 ? '#64748b' : '#1e293b'} strokeWidth="1" />
                {v !== 0 && (
                  <text x={toX(v)} y={ORIGIN + 14} fill="#475569" fontSize="9" textAnchor="middle">{v}</text>
                )}
              </g>
            ))}
            {/* rise-run triangle */}
            {showTriangle && (dx !== 0 || dy !== 0) && (
              <g>
                <line x1={toX(px)} y1={toY(py)} x2={toX(target.x)} y2={toY(py)} stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 3" />
                <line x1={toX(target.x)} y1={toY(py)} x2={toX(target.x)} y2={toY(target.y)} stroke="#10b981" strokeWidth="2.5" strokeDasharray="5 3" />
                <text x={(toX(px) + toX(target.x)) / 2} y={toY(py) - 6} fill="#fbbf24" fontSize="11" textAnchor="middle">
                  run = {Math.abs(dx)}
                </text>
                <text x={toX(target.x) + 6} y={(toY(py) + toY(target.y)) / 2} fill="#34d399" fontSize="11">
                  rise = {Math.abs(dy)}
                </text>
              </g>
            )}
            {/* target + point */}
            <circle cx={toX(target.x)} cy={toY(target.y)} r="9" fill={found ? '#facc15' : '#f59e0b'} stroke="#78350f" strokeWidth="2" />
            <text x={toX(target.x)} y={toY(target.y) + 4} fill="#422006" fontSize="10" fontWeight="bold" textAnchor="middle">T</text>
            <circle cx={toX(px)} cy={toY(py)} r="9" fill="#6366f1" stroke="#c7d2fe" strokeWidth="2" />
            <text x={toX(px)} y={toY(py) + 4} fill="#eef2ff" fontSize="10" fontWeight="bold" textAnchor="middle">P</text>
            <text x={toX(px)} y={toY(py) - 14} fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">
              P({px}, {py})
            </text>
            <text x={ORIGIN - 8} y={ORIGIN - 8} fill="#94a3b8" fontSize="11">O</text>
          </svg>
        </div>

        {/* READOUTS */}
        <div className="md:col-span-2 space-y-3">
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-1 text-sm">
            <p className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Position report</p>
            <p className="text-slate-300">Location: <span className="font-bold text-white">{quadrant}</span></p>
            <p className="font-mono text-xs text-slate-400">
              Distance to O: sqrt({px}^2 + {py}^2) = sqrt({px * px + py * py}) = <span className="text-indigo-300 font-bold">{dOrigin.toFixed(2)}</span>
            </p>
            <p className="font-mono text-xs text-slate-400">
              To target: sqrt({Math.abs(dx)}^2 + {Math.abs(dy)}^2) = <span className="text-amber-300 font-bold">{dTarget.toFixed(2)}</span>
            </p>
          </div>
          <div className={`p-3 rounded-2xl text-sm font-bold ${found ? 'bg-emerald-950/60 border border-emerald-600 text-emerald-300' : 'bg-slate-900 border border-slate-800 text-slate-400'}`}>
            {found ? 'Treasure reached! The distance is exactly 0. Collect it.' : 'Steer P onto the amber target using the sliders.'}
          </div>
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
            The straight-line distance uses the Pythagoras idea: square the run, square the rise, add, then take the square root. Reflections
            just flip the sign of the coordinate measured across the mirror line.
          </div>
        </div>
      </div>

      {/* TEACHING TEXT */}
      <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <p>
          <span className="font-bold text-indigo-300">Big idea:</span> two numbers fix a position completely. The signs of (x, y) tell you the
          quadrant, the axes act as mirrors for reflections, and any gap between two points splits into a horizontal run plus a vertical rise,
          which is all Pythagoras needs to measure the straight-line distance.
        </p>
      </div>

      {/* WHAT TO TRY */}
      <footer className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Park P at (2, 3), request a new target, and reach it using only reflection buttons - name the rule for each move.</p>
        <p className="mt-1">2. Find a point whose distance from the origin is exactly 5 (there are several integer answers, like (3, 4)).</p>
      </footer>
    </div>
  );
}

export default C9_MathematicsOrientingYourselfTheUseOfSim;

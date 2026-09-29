'use client';

import React, { useMemo, useRef, useState } from 'react';

// ─── FUNCTION LIBRARY (derivatives hand-derived, then verified symbolically) ───
type Fn = { id: string; label: string; f: (x: number) => number; df: (x: number) => number; d2f: (x: number) => number };

const FNS: Fn[] = [
  { id: 'cubic', label: '0.1x^3 - 1.2x^2 + 3x + 2', f: (x) => 0.1 * x * x * x - 1.2 * x * x + 3 * x + 2, df: (x) => 0.3 * x * x - 2.4 * x + 3, d2f: (x) => 0.6 * x - 2.4 },
  { id: 'quad', label: '-0.5x^2 + 4x + 1', f: (x) => -0.5 * x * x + 4 * x + 1, df: (x) => -x + 4, d2f: () => -1 },
];

const X_MIN = -1;
const X_MAX = 6;
const VB = { w: 460, h: 280, pad: 28 };

export function C12_AppliedMathsDifferentiationApplicationsSim() {
  const [fnId, setFnId] = useState('cubic');
  const [x0, setX0] = useState(2);
  const [showDf, setShowDf] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const fn = FNS.find((v) => v.id === fnId) || FNS[0];

  // ─── REAL NUMERICS: sample the actual function to build the y-window ───
  const win = useMemo(() => {
    let lo = Infinity;
    let hi = -Infinity;
    for (let i = 0; i <= 80; i++) {
      const y = fn.f(X_MIN + ((X_MAX - X_MIN) * i) / 80);
      lo = Math.min(lo, y);
      hi = Math.max(hi, y);
    }
    return { yLo: Math.floor(lo) - 1, yHi: Math.ceil(hi) + 1 };
  }, [fn]);

  const sx = (x: number) => VB.pad + ((x - X_MIN) / (X_MAX - X_MIN)) * (VB.w - 2 * VB.pad);
  const sy = (y: number) => VB.h - VB.pad - ((y - win.yLo) / (win.yHi - win.yLo)) * (VB.h - 2 * VB.pad);

  const pathOf = (g: (x: number) => number) => {
    let d = '';
    for (let i = 0; i <= 120; i++) {
      const x = X_MIN + ((X_MAX - X_MIN) * i) / 120;
      d += (i === 0 ? 'M' : 'L') + sx(x).toFixed(1) + ' ' + sy(g(x)).toFixed(1);
    }
    return d;
  };

  const curve = useMemo(() => pathOf(fn.f), [fn, win]);
  const dfCurve = useMemo(() => pathOf(fn.df), [fn, win]);
  const f0 = fn.f(x0);
  const d0 = fn.df(x0);
  const dd0 = fn.d2f(x0);
  // Tangent: y = f(x0) + f'(x0)(x - x0), drawn across a window of +/- 2 units
  const t1 = f0 + d0 * (x0 - 2);
  const t2 = f0 + d0 * (x0 + 2);

  const pickX = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * VB.w;
    setX0(Math.round(Math.min(X_MAX, Math.max(X_MIN, X_MIN + ((px - VB.pad) / (VB.w - 2 * VB.pad)) * (X_MAX - X_MIN))) * 10) / 10);
  };

  const reset = () => {
    setFnId('cubic');
    setX0(2);
    setShowDf(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">CBSE Class 12 Applied Maths - Differentiation and Its Applications</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Tangent Slope Explorer: watch f&apos;(x) ride the curve</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-gold-950 border border-gold-700 text-gold-300">Derivative Lab</span>
      </header>

      {/* CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Point x (click the graph too)</span>
            <span className="text-gold-300 font-mono font-bold">{x0.toFixed(1)}</span>
          </label>
          <input type="range" min={X_MIN} max={X_MAX} step={0.1} value={x0} aria-label="x coordinate of point"
            onChange={(e) => setX0(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-gold-500" />
        </div>
        <div className="flex gap-2">
          {FNS.map((v) => (
            <button key={v.id} onClick={() => setFnId(v.id)} className={`flex-1 min-h-11 px-2 rounded-2xl text-[11px] font-mono font-bold border transition-all ${
              fnId === v.id ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'}`}>
              {v.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowDf(!showDf)} className={`flex-1 min-h-11 px-2 rounded-2xl text-xs font-bold border transition-all ${
            showDf ? 'bg-amber-950/60 border-amber-700 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            {showDf ? 'f(x) curve: ON' : 'f(x) curve: OFF'}
          </button>
          <button onClick={reset} className="min-h-11 px-3 rounded-2xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">Reset</button>
        </div>
      </div>

      {/* GRAPH + LIVE VALUES */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 p-2">
          <svg ref={svgRef} viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full h-56 md:h-64 cursor-crosshair" preserveAspectRatio="xMidYMid meet"
            onPointerDown={(e) => pickX(e.clientX)} onPointerMove={(e) => { if (e.buttons === 1) pickX(e.clientX); }}>
            {/* axes */}
            {[-1, 0, 1, 2, 3, 4, 5, 6].map((t) => (
              <line key={t} x1={sx(t)} y1={sy(win.yLo)} x2={sx(t)} y2={sy(win.yHi)} stroke="#1e293b" strokeWidth="1" />
            ))}
            {[Math.ceil(win.yLo), 0, Math.floor(win.yHi)].map((t, i) => (
              <line key={'h' + i} x1={sx(X_MIN)} y1={sy(t)} x2={sx(X_MAX)} y2={sy(t)} stroke={t === 0 ? '#475569' : '#1e293b'} strokeWidth="1" />
            ))}
            <text x={sx(0) - 4} y={sy(0) + 12} fill="#64748b" fontSize="10" textAnchor="end">0</text>
            {showDf && <path d={dfCurve} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 4" />}
            <path d={curve} fill="none" stroke="#818cf8" strokeWidth="3" />
            <line x1={sx(x0 - 2)} y1={sy(t1)} x2={sx(x0 + 2)} y2={sy(t2)} stroke="#34d399" strokeWidth="2" />
            <circle cx={sx(x0)} cy={sy(f0)} r="6" fill="#34d399" stroke="#0f172a" strokeWidth="2" />
            <text x={sx(x0)} y={sy(f0) - 12} fill="#a7f3d0" fontSize="11" textAnchor="middle" fontWeight="bold">
              slope = {d0.toFixed(2)}
            </text>
            {showDf && <text x={VB.pad + 4} y={16} fill="#f59e0b" fontSize="10">dashed amber = f&apos;(x), the slope at each x</text>}
          </svg>
        </div>

        <div className="md:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Live values at x = {x0.toFixed(1)}</p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-sm font-mono space-y-1">
            <p>f(x) = <span className="text-gold-300 font-bold">{f0.toFixed(2)}</span></p>
            <p>f&apos;(x) = slope = <span className="text-emerald-300 font-bold">{d0.toFixed(2)}</span> (rise per unit x)</p>
            <p>f&apos;&apos;(x) = <span className="text-amber-300 font-bold">{dd0.toFixed(2)}</span></p>
          </div>
          <div className={`p-3 rounded-xl text-xs font-bold border ${d0 > 0 ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300' : d0 < 0 ? 'bg-rose-950/60 border-rose-700 text-rose-300' : 'bg-slate-950 border-slate-700 text-slate-300'}`}>
            {d0 > 0 ? 'f is INCREASING here (slope positive)' : d0 < 0 ? 'f is DECREASING here (slope negative)' : 'Stationary point: slope is zero'}
          </div>
          <div className={`p-3 rounded-xl text-xs font-bold border ${dd0 > 0 ? 'bg-gold-950/60 border-gold-700 text-gold-300' : 'bg-gold-950/60 border-gold-700 text-gold-300'}`}>
            {dd0 > 0 ? 'Curve bends upward: concave UP (min can live here)' : dd0 < 0 ? 'Curve bends downward: concave DOWN (max can live here)' : 'Straight line: constant slope'}
          </div>
          <p className="text-xs text-slate-400">
            Misconception killer: f&apos;(x) is NOT the height of the curve -- it is the slope of the tangent. Turn on the amber
            dashed curve and watch it cross zero exactly where the blue curve peaks or dips.
          </p>
        </div>
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Slide x slowly from 0 to 6 on the cubic. Find the x where slope = 0 -- that is your local maximum; check that f&apos;&apos;(x) is negative there.</p>
        <p className="mt-1">2. Switch to the quadratic, set x = 4 and read the slope. Now drag to x = 2 and x = 6 -- why does the sign flip at exactly 4?</p>
      </footer>
    </div>
  );
}

export default C12_AppliedMathsDifferentiationApplicationsSim;

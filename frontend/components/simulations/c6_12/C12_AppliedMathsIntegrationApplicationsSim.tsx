'use client';

import React, { useMemo, useState } from 'react';

// ─── INTEGRANDS with hand-derived antiderivatives for the exact check ───
type Fn = { id: string; label: string; f: (x: number) => number; exact: (a: number) => number; xMax: number; yMax: number };

const FNS: Fn[] = [
  { id: 'sq', label: 'f(x) = x^2', f: (x) => x * x, exact: (a) => (a * a * a) / 3, xMax: 4, yMax: 16 },
  { id: 'sin', label: 'f(x) = sin(x)', f: (x) => Math.sin(x), exact: (a) => 1 - Math.cos(a), xMax: Math.PI, yMax: 1.2 },
];

export function C12_AppliedMathsIntegrationApplicationsSim() {
  const [fnId, setFnId] = useState('sq');
  const [n, setN] = useState(8);
  const [a, setA] = useState(4);
  const [mid, setMid] = useState(false);

  const fn = FNS.find((v) => v.id === fnId) || FNS[0];
  const cap = fn.xMax;
  const upper = Math.min(a, cap);

  // ─── REAL NUMERICS: Riemann sum (left or midpoint rule) ───
  const sum = useMemo(() => {
    const dx = upper / n;
    let s = 0;
    for (let i = 0; i < n; i++) {
      const x = mid ? (i + 0.5) * dx : i * dx;
      s += fn.f(x) * dx;
    }
    return s;
  }, [fn, n, upper, mid]);

  const exactVal = fn.exact(upper);
  const errPct = Math.abs((sum - exactVal) / exactVal) * 100;

  const sx = (x: number) => 34 + (x / cap) * 400;
  const sy = (y: number) => 216 - (y / fn.yMax) * 176;
  const dxw = (upper / n / cap) * 400;

  const curve = useMemo(() => {
    let d = '';
    for (let i = 0; i <= 160; i++) {
      const x = (cap * i) / 160;
      d += (i === 0 ? 'M' : 'L') + sx(x).toFixed(1) + ' ' + sy(fn.f(x)).toFixed(1);
    }
    return d;
  }, [fn, cap]);

  const reset = () => {
    setFnId('sq');
    setN(8);
    setA(4);
    setMid(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">CBSE Class 12 Applied Maths - Integration and Its Application</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Area Under the Curve: Riemann Strip Factory</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-gold-950 border border-gold-700 text-gold-300">Integral Lab</span>
      </header>

      {/* CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Strips n</span>
            <span className="text-gold-300 font-mono font-bold">{n} strips</span>
          </label>
          <input type="range" min={2} max={48} step={1} value={n} aria-label="number of strips"
            onChange={(e) => setN(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-gold-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Upper limit a</span>
            <span className="text-emerald-300 font-mono font-bold">{upper.toFixed(2)} rad</span>
          </label>
          <input type="range" min={0.5} max={cap} step={0.05} value={upper} aria-label="upper limit of integration"
            onChange={(e) => setA(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-emerald-500" />
        </div>
        <div className="flex gap-2">
          <button onClick={() => setMid(!mid)} className={`flex-1 min-h-11 px-2 rounded-2xl text-xs font-bold border ${mid ? 'bg-amber-950/60 border-amber-700 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            {mid ? 'Midpoint rule' : 'Left rule'}
          </button>
          <button onClick={reset} className="min-h-11 px-3 rounded-2xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">Reset</button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {FNS.map((v) => (
          <button key={v.id} onClick={() => setFnId(v.id)} className={`min-h-11 px-4 rounded-xl text-xs font-mono font-bold border ${fnId === v.id ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
            {v.label}
          </button>
        ))}
      </div>

      {/* STRIPS VISUAL */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 mb-4">
        <svg viewBox="0 0 460 240" className="w-full h-56 md:h-64" preserveAspectRatio="xMidYMid meet">
          {Array.from({ length: n }, (_, i) => {
            const dx = upper / n;
            const x = mid ? (i + 0.5) * dx : i * dx;
            const h = fn.f(x);
            return (
              <rect key={i} x={sx(i * dx)} y={sy(Math.max(0, h))} width={Math.max(dxw, 0.8)} height={Math.max(216 - sy(Math.max(0, h)), 0)}
                fill="#6366f1" opacity="0.55" stroke="#a5b4fc" strokeWidth="0.5" />
            );
          })}
          <line x1="34" y1="216" x2="450" y2="216" stroke="#475569" />
          <path d={curve} fill="none" stroke="#34d399" strokeWidth="2.5" />
          <text x={sx(upper)} y={230} fill="#a7f3d0" fontSize="11" textAnchor="middle">a = {upper.toFixed(2)}</text>
          <text x="34" y="16" fill="#94a3b8" fontSize="10">{n} strips, dx = {(upper / n).toFixed(3)} -- sum their areas to approximate the green curve&apos;s area</text>
        </svg>
      </div>

      {/* LIVE NUMBERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <div className="p-3 bg-slate-900 rounded-2xl border border-gold-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Riemann sum (your estimate)</p>
          <p className="text-lg font-extrabold text-gold-300 font-mono">{sum.toFixed(4)} sq units</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-emerald-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Exact integral</p>
          <p className="text-lg font-extrabold text-emerald-300 font-mono">{exactVal.toFixed(4)} sq units</p>
        </div>
        <div className={`p-3 rounded-2xl border text-center ${errPct < 1 ? 'bg-emerald-950/60 border-emerald-700' : errPct < 5 ? 'bg-amber-950/60 border-amber-700' : 'bg-rose-950/60 border-rose-700'}`}>
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Error</p>
          <p className="text-lg font-extrabold font-mono">{errPct.toFixed(2)} %</p>
        </div>
      </div>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-3">
        <p>
          <span className="font-bold text-gold-300">Big idea:</span> a definite integral is the limit of strip sums as n grows and dx shrinks.
          Integration reverses differentiation, so the exact area comes from the antiderivative.
          <span className="font-bold text-amber-300"> Misconception killer:</span> with few strips the left rule always misses low
          (increasing) or high (decreasing) parts of the curve -- the midpoint rule cancels that bias.
        </p>
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. With x^2, a = 4, set n = 2 and read the error. Keep doubling n (2, 4, 8, 16, 32) -- by what factor does the error shrink each time?</p>
        <p className="mt-1">2. Switch to sin(x) with a = pi (about 3.14) at n = 8. Toggle Left rule vs Midpoint rule -- which lands closer to the exact area of 2 sq units?</p>
      </footer>
    </div>
  );
}

export default C12_AppliedMathsIntegrationApplicationsSim;

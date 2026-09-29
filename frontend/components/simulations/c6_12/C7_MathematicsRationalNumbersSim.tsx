'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Rational numbers are all the fractions of whole numbers (denominator not zero) -- positives, ' +
  'negatives, and everything in between. To compare two fractions, cross-multiply: a/b vs c/d ' +
  'becomes a x d vs c x b. On the number line, the LEFT one is always the smaller one!';

type Frac = { n: number; d: number };

const shorten = (n: number, d: number): Frac => {
  const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y));
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
};

export function C7_MathematicsRationalNumbersSim() {
  const [f1, setF1] = useState<Frac>({ n: 2, d: 3 });
  const [f2, setF2] = useState<Frac>({ n: 3, d: 5 });
  const [showCross, setShowCross] = useState(false);

  const v1 = f1.n / f1.d;
  const v2 = f2.n / f2.d;
  const crossL = f1.n * f2.d;
  const crossR = f2.n * f1.d;
  const cmp = crossL === crossR ? '=' : crossL < crossR ? '<' : '>';

  // number line from -2 to 2
  const toX = (v: number) => 40 + ((v + 2) / 4) * 540;
  const s1 = shorten(f1.n, f1.d);
  const s2 = shorten(f2.n, f2.d);

  const stepper = (label: string, val: number, set: (v: number) => void, min: number, max: number, color: string) => (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-400 w-14">{label}</span>
      <button aria-label={`decrease ${label}`} onClick={() => set(Math.max(min, val - 1))} className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 font-bold">
        -
      </button>
      <span className={`font-mono text-lg font-bold w-8 text-center ${color}`}>{val}</span>
      <button aria-label={`increase ${label}`} onClick={() => set(Math.min(max, val + 1))} className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 font-bold">
        +
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">Rational Numbers on the Line</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Number line */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700 overflow-x-auto">
        <svg viewBox="0 0 620 190" className="w-full" style={{ minWidth: 480 }}>
          <line x1={20} y1={110} x2={600} y2={110} stroke="#94a3b8" strokeWidth={2} />
          {[-2, -1, 0, 1, 2].map((t) => (
            <g key={t}>
              <line x1={toX(t)} y1={102} x2={toX(t)} y2={118} stroke="#94a3b8" strokeWidth={2} />
              <text x={toX(t)} y={140} textAnchor="middle" fill="#cbd5e1" fontSize={13}>{t}</text>
            </g>
          ))}
          {[-1.5, -0.5, 0.5, 1.5].map((t) => (
            <line key={t} x1={toX(t)} y1={105} x2={toX(t)} y2={115} stroke="#64748b" />
          ))}
          {/* markers */}
          <g style={{ transition: 'all 0.3s' }}>
            <line x1={toX(v1)} y1={110} x2={toX(v1)} y2={58} stroke="#38bdf8" strokeWidth={2.5} />
            <circle cx={toX(v1)} cy={54} r={11} fill="#0ea5e9" />
            <text x={toX(v1)} y={59} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="bold">
              {s1.n}/{s1.d}
            </text>
          </g>
          <g style={{ transition: 'all 0.3s' }}>
            <line x1={toX(v2)} y1={110} x2={toX(v2)} y2={162} stroke="#fbbf24" strokeWidth={2.5} />
            <circle cx={toX(v2)} cy={166} r={11} fill="#d97706" />
            <text x={toX(v2)} y={171} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="bold">
              {s2.n}/{s2.d}
            </text>
          </g>
          {Math.abs(toX(v1) - toX(v2)) < 26 && (
            <text x={310} y={30} textAnchor="middle" fill="#f472b6" fontSize={13} fontWeight="bold">
              They landed on the SAME point -- equivalent fractions!
            </text>
          )}
        </svg>
      </div>

      {/* Comparison readout */}
      <div className="mt-4 p-4 bg-slate-800 rounded-2xl border border-slate-600 text-center font-mono">
        <span className="text-gold-300 font-bold text-xl">
          {f1.n}/{f1.d}
        </span>
        <span className={`mx-3 text-2xl font-black ${cmp === '=' ? 'text-emerald-400' : cmp === '<' ? 'text-pink-400' : 'text-amber-300'}`}>{cmp}</span>
        <span className="text-amber-300 font-bold text-xl">
          {f2.n}/{f2.d}
        </span>
        {showCross && (
          <div className="mt-2 text-sm text-slate-300">
            Cross multiply: {f1.n} x {f2.d} = <span className="text-gold-300 font-bold">{crossL}</span> vs {f2.n} x {f1.d} ={' '}
            <span className="text-amber-300 font-bold">{crossR}</span>
            <div className="text-xs text-slate-400 mt-1">
              Simplified: {s1.n}/{s1.d} and {s2.n}/{s2.d}
            </div>
          </div>
        )}
      </div>

      {/* Fraction builders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {[
          { f: f1, set: setF1, title: 'Blue fraction', nColor: 'accent-gold-400', dColor: 'accent-gold-600' },
          { f: f2, set: setF2, title: 'Amber fraction', nColor: 'accent-amber-400', dColor: 'accent-amber-600' },
        ].map((fr, idx) => (
          <div key={idx} className="p-3 bg-slate-800 rounded-2xl border border-slate-600 space-y-2">
            <div className="text-xs uppercase tracking-wide text-slate-400">{fr.title}</div>
            {stepper('top', fr.f.n, (v) => fr.set({ ...fr.f, n: v }), -9, 9, idx === 0 ? 'text-gold-300' : 'text-amber-300')}
            {stepper('bottom', fr.f.d, (v) => fr.set({ ...fr.f, d: v }), 1, 9, 'text-slate-200')}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setShowCross((s) => !s)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${showCross ? 'bg-emerald-600 border-emerald-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
        >
          {showCross ? 'Hide' : 'Show'} cross-multiplication
        </button>
        <button
          onClick={() => { setF1({ n: 2, d: 3 }); setF2({ n: 4, d: 6 }); }}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Load equal twins (2/3 vs 4/6)
        </button>
        <button
          onClick={() => { setF1({ n: -3, d: 4 }); setF2({ n: -1, d: 2 }); }}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Try negatives (-3/4 vs -1/2)
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>With the negatives loaded, decide which is bigger BEFORE pressing show. Careful: -1/2 sits to the RIGHT of -3/4!</li>
          <li>Make the two markers land exactly on the same point three different ways. What pattern do the cross-products show?</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsRationalNumbersSim;

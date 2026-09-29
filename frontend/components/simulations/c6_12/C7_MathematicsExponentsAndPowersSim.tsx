'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Instead of writing 2 x 2 x 2 x 2 x 2, we write 2^5 (2 to the power 5). The small raised number ' +
  'is the EXPONENT -- it counts how many times the base multiplies itself. Powers grow shockingly ' +
  'fast: doubling just 10 times already crosses one thousand!';

export function C7_MathematicsExponentsAndPowersSim() {
  const [base, setBase] = useState(2);
  const [expo, setExpo] = useState(5);
  const [showExpand, setShowExpand] = useState(true);

  const value = useMemo(() => Math.pow(base, expo), [base, expo]);
  const expanded = useMemo(() => Array.from({ length: expo }, () => base).join(' x '), [base, expo]);
  const prevValue = useMemo(() => Math.pow(base, Math.max(0, expo - 1)), [base, expo]);

  // Square visualization: base^2 blocks arranged base x base, for any exponent show last step growth
  const growthPercent = prevValue > 0 ? ((value - prevValue) / prevValue) * 100 : 100;

  const fmt = (n: number) => (n >= 1e12 ? n.toExponential(2) : n.toLocaleString('en-IN'));

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">Exponents and Powers</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Big expression */}
      <div className="mt-4 p-5 bg-slate-950 rounded-2xl border border-slate-700 text-center">
        <div className="font-mono text-4xl md:text-5xl">
          <span className="text-gold-300 font-black">{base}</span>
          <sup className="text-amber-300 text-2xl md:text-3xl font-black">{expo}</sup>
          <span className="text-slate-400 mx-3">=</span>
          <span className="text-emerald-400 font-black">{fmt(value)}</span>
        </div>
        {showExpand && (
          <div className="mt-2 font-mono text-sm text-slate-300 break-words">
            {expanded.length > 90 ? `${expanded.slice(0, 87)}... x ${base}` : expanded}
          </div>
        )}
        <div className="mt-2 text-xs text-slate-400">
          Going from exponent {expo - 1} to {expo}, the value jumps by{' '}
          <span className="text-amber-300 font-bold">{Math.round(growthPercent)}%</span> (from {fmt(prevValue)} to {fmt(value)})
        </div>
      </div>

      {/* Power ladder */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
        <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">The ladder for base {base}</div>
        <div className="space-y-1">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((e) => (
            <button
              key={e}
              onClick={() => setExpo(e)}
              className={`w-full flex items-center gap-2 rounded-lg px-2 py-1 text-left font-mono text-xs transition-colors ${
                expo === e ? 'bg-gold-600/60 border border-gold-400' : 'hover:bg-slate-800 border border-transparent'
              }`}
            >
              <span className="text-gold-300 font-bold w-10">
                {base}
                <sup>{e}</sup>
              </span>
              <span className="text-slate-500 w-24 overflow-hidden whitespace-nowrap text-ellipsis">
                {Array.from({ length: Math.min(e, 6) }, () => base).join('x')}
                {e > 6 ? 'x...' : ''}
              </span>
              <span className="text-emerald-300 font-bold flex-1 text-right">{fmt(Math.pow(base, e))}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Base</span>
            <span className="font-mono font-bold text-gold-300">{base}</span>
          </label>
          <input type="range" aria-label="base" min={2} max={10} value={base} onChange={(e) => setBase(Number(e.target.value))} className="w-full mt-2 accent-gold-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Exponent</span>
            <span className="font-mono font-bold text-amber-300">{expo}</span>
          </label>
          <input type="range" aria-label="exponent" min={1} max={12} value={expo} onChange={(e) => setExpo(Number(e.target.value))} className="w-full mt-2 accent-amber-400" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setShowExpand((s) => !s)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${showExpand ? 'bg-emerald-600 border-emerald-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
        >
          {showExpand ? 'Hide' : 'Show'} repeated multiplication
        </button>
        <button
          onClick={() => setExpo((e) => Math.min(12, e + 1))}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-gold-600 border-gold-400 hover:bg-gold-500"
        >
          Multiply by {base} again
        </button>
        <button
          onClick={() => { setBase(10); setExpo(6); }}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Show 10^6 = one million
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Climb the ladder with base 2: at which exponent does the value first cross 1,000? Predict before you click.</li>
          <li>Find two different base-exponent pairs that give the SAME value. (Hint: try 4 and 2, or 9 and 3.)</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsExponentsAndPowersSim;

'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'An algebraic expression like 3x + 4 is a recipe: "3 groups of x, plus 4 extra ones". ' +
  'The letter x is a placeholder -- it can hold any number. The letter-number rule never changes, ' +
  'but the VALUE of the whole expression changes whenever x changes. Watch the tiles rebuild!';

export function C7_MathematicsAlgebraicExpressionsSim() {
  const [coefA, setCoefA] = useState(3);
  const [constB, setConstB] = useState(4);
  const [xVal, setXVal] = useState(2);
  const [showAdd, setShowAdd] = useState(false);

  const result = coefA * xVal + constB;

  // x-tile rows: coefA rows, each row xVal cells wide, plus constB unit dots
  const rows = useMemo(() => Array.from({ length: coefA }, () => Array.from({ length: xVal }, () => 1)), [coefA, xVal]);
  const dots = useMemo(() => Array.from({ length: constB }, (_, i) => i), [constB]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">Algebraic Expressions: The Tile Machine</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Expression bar */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-700 font-mono">
        <span className="text-slate-400 text-sm">Expression:</span>
        <span className="px-2 py-1 rounded-lg bg-gold-800 text-gold-200 font-bold">{coefA}x</span>
        {constB >= 0 ? (
          <span className="text-slate-300 font-bold">+</span>
        ) : (
          <span className="text-slate-300 font-bold">-</span>
        )}
        <span className="px-2 py-1 rounded-lg bg-amber-700 text-amber-100 font-bold">{Math.abs(constB)}</span>
        <span className="text-slate-400 text-sm">, with x =</span>
        <span className="px-2 py-1 rounded-lg bg-emerald-800 text-emerald-200 font-bold">{xVal}</span>
        <span className="text-slate-300 font-bold">=</span>
        <span className="px-3 py-1 rounded-lg bg-emerald-700 text-white font-black text-lg transition-all">
          {coefA}
          {' × '}
          {xVal}
          {constB >= 0 ? ' + ' : ' - '}
          {Math.abs(constB)} = {result}
        </span>
      </div>

      {/* Tile visualization */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700 overflow-x-auto">
        <svg viewBox={`0 0 ${Math.max(560, xVal * 46 + 120)} 240`} className="w-full" style={{ maxHeight: 260 }}>
          {/* x rows */}
          {rows.map((row, r) => (
            <g key={r} transform={`translate(20, ${28 + r * 40})`} style={{ transition: 'transform 0.3s' }}>
              <rect x={0} y={0} width={row.length * 44} height={34} rx={8} fill="rgba(56,189,248,0.15)" stroke="#38bdf8" strokeWidth={2} />
              {row.map((_, c) => (
                <g key={c}>
                  <rect x={4 + c * 44} y={4} width={38} height={26} rx={6} fill="#0ea5e9" opacity={0.85} />
                  <text x={4 + c * 44 + 19} y={22} textAnchor="middle" fill="#fff" fontSize={13} fontWeight="bold">
                    x
                  </text>
                </g>
              ))}
              <text x={row.length * 44 + 10} y={22} fill="#7dd3fc" fontSize={12}>
                {showAdd ? `${xVal}` : 'x'}
              </text>
            </g>
          ))}
          {/* plus sign + unit dots */}
          <g transform={`translate(20, ${34 + coefA * 40})`}>
            <text x={0} y={0} fill="#e2e8f0" fontSize={18} fontWeight="black">+</text>
            {dots.map((d) => (
              <g key={d} transform={`translate(${24 + d * 34}, -8)`}>
                <rect width={28} height={28} rx={14} fill="#f59e0b" />
                <text x={14} y={19} textAnchor="middle" fill="#fff" fontSize={13} fontWeight="bold">1</text>
              </g>
            ))}
          </g>
          <text x={20} y={232} fill="#94a3b8" fontSize={12}>
            {coefA} blue x-tiles = {coefA * xVal}, plus {constB} amber ones ={' '}
            <tspan fill="#34d399" fontWeight="bold">{result}</tspan>
          </text>
        </svg>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Number of x groups (a)</span>
            <span className="font-mono font-bold">{coefA}</span>
          </label>
          <input type="range" aria-label="coefficient a" min={0} max={6} value={coefA} onChange={(e) => setCoefA(Number(e.target.value))} className="w-full mt-2 accent-gold-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Extra ones (b)</span>
            <span className="font-mono font-bold">{constB}</span>
          </label>
          <input type="range" aria-label="constant b" min={0} max={10} value={constB} onChange={(e) => setConstB(Number(e.target.value))} className="w-full mt-2 accent-amber-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Value of x</span>
            <span className="font-mono font-bold">{xVal}</span>
          </label>
          <input type="range" aria-label="value of x" min={0} max={10} value={xVal} onChange={(e) => setXVal(Number(e.target.value))} className="w-full mt-2 accent-emerald-400" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setShowAdd((s) => !s)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${showAdd ? 'bg-gold-600 border-gold-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
        >
          {showAdd ? 'Hide' : 'Show'} repeated addition ({coefA * xVal} = {Array(coefA).fill(xVal).join(' + ') || '0'})
        </button>
        <button
          onClick={() => { setCoefA(2); setConstB(5); setXVal(3); }}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Load example 2x + 5
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Keep the expression fixed and slide x from 0 to 10. Each time x grows by 1, by how much does the answer grow? (Clue: watch the blue part.)</li>
          <li>Find an expression and an x where the answer is exactly 20. How many different ways can you do it?</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsAlgebraicExpressionsSim;

'use client';
/**
 * C10_ChemistryAlkanesgeneralformulaandpreparationSim (Class 10 Chemistry)
 *
 * ONE concept: every alkane obeys CnH2n+2. Build a chain one carbon at a time
 * and watch formula, molar mass and boiling point follow the rule.
 */
import React, { useMemo, useState } from 'react';

// Real normal boiling points (deg C) for straight-chain alkanes C1..C10
const BOILING: number[] = [-162, -89, -42, -1, 36, 69, 98, 126, 151, 174];
const NAMES: string[] = ['Methane', 'Ethane', 'Propane', 'Butane', 'Pentane', 'Hexane', 'Heptane', 'Octane', 'Nonane', 'Decane'];

function Sub({ n }: { n: number }) {
  return <sub className="text-[0.7em]">{n}</sub>;
}

export function C10_ChemistryAlkanesgeneralformulaandpreparationSim() {
  const [n, setN] = useState(3);
  const [showH, setShowH] = useState(true);
  const [predict, setPredict] = useState(5);

  const H = 2 * n + 2;
  const mass = 12.0 * n + 1.0 * H; // g/mol
  const hcr = H / n;
  const state = n <= 4 ? 'gas' : n <= 16 ? 'liquid' : 'solid';
  const bp = BOILING[n - 1];

  // zig-zag chain positions in SVG space
  const pts = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    for (let i = 0; i < n; i++) out.push({ x: 40 + (i % 10) * 52, y: i % 2 === 0 ? 90 : 140 });
    return out;
  }, [n]);

  const formula = (
    <span>
      C<Sub n={n} />H<Sub n={H} />
    </span>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-slate-950 rounded-3xl border border-slate-800 font-sans text-slate-100">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">The Alkane Machine: CnH2n+2</h1>
      <p className="mt-1 text-sm text-slate-400">
        Drag the slider to add carbons. Every alkane that ever existed obeys one formula — watch it hold.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setN((v) => Math.max(1, v - 1))}
          className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-bold transition-colors"
        >
          − remove C
        </button>
        <button
          onClick={() => setN((v) => Math.min(10, v + 1))}
          className="min-h-11 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-bold transition-colors"
        >
          + add CH2 group
        </button>
        <button
          onClick={() => setShowH((v) => !v)}
          className={`min-h-11 px-4 rounded-xl text-sm font-bold border transition-colors ${showH ? 'bg-violet-600 border-violet-500' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}
        >
          {showH ? 'Hide hydrogens' : 'Show hydrogens'}
        </button>
      </div>

      <div className="mt-3">
        <label className="text-xs font-semibold text-slate-400 flex justify-between">
          <span>Chain length n (carbons)</span>
          <span className="font-mono text-indigo-300">n = {n}</span>
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={n}
          aria-label="number of carbon atoms"
          onChange={(e) => setN(Number(e.target.value))}
          className="w-full mt-1 min-h-11 accent-indigo-500"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
          <svg viewBox="0 0 560 230" className="w-full" role="img" aria-label="alkane chain diagram">
            {pts.map((p, i) =>
              i < n - 1 ? (
                <line
                  key={`b${i}`}
                  x1={p.x}
                  y1={p.y}
                  x2={pts[i + 1].x}
                  y2={pts[i + 1].y}
                  stroke="#818cf8"
                  strokeWidth={4}
                  className="transition-all duration-300"
                />
              ) : null
            )}
            {pts.map((p, i) => (
              <g key={`c${i}`} className="transition-all duration-300">
                <circle cx={p.x} cy={p.y} r={16} fill="#1e293b" stroke="#818cf8" strokeWidth={2.5} />
                <text x={p.x} y={p.y + 5} textAnchor="middle" fill="#e0e7ff" fontSize={14} fontWeight="bold">
                  C
                </text>
                {showH &&
                  [-1, 1].map((s) => (
                    <g key={s}>
                      <line x1={p.x} y1={p.y + s * 16} x2={p.x} y2={p.y + s * 34} stroke="#475569" strokeWidth={2.5} />
                      <circle cx={p.x} cy={p.y + s * 40} r={8} fill="#0f172a" stroke="#64748b" strokeWidth={1.5} />
                      <text x={p.x} y={p.y + s * 40 + 4} textAnchor="middle" fill="#94a3b8" fontSize={10}>
                        H
                      </text>
                    </g>
                  ))}
              </g>
            ))}
            <text x={280} y={26} textAnchor="middle" fill="#a5b4fc" fontSize={16} fontWeight="bold">
              {NAMES[n - 1]}: C{n}H{H} (CnH2n+2 at n={n})
            </text>
          </svg>
          <div className="grid grid-cols-3 gap-2 mt-2 text-center">
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Molar mass</div>
              <div className="font-mono text-indigo-300 font-bold">{mass.toFixed(1)} g/mol</div>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">H/C ratio</div>
              <div className="font-mono text-violet-300 font-bold">{hcr.toFixed(2)}</div>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Boiling point</div>
              <div className="font-mono text-amber-300 font-bold">{bp} °C</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <div className="text-sm text-slate-300">
              Live formula check: n = <span className="font-mono text-indigo-300">{n}</span> gives{' '}
              <span className="font-mono">2( {n} ) + 2 = {H}</span> hydrogens →{' '}
              <span className="text-lg font-bold text-emerald-400">{formula}</span>, a{' '}
              <span className="text-amber-300">{state}</span> at room temperature.
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 flex justify-between">
              <span>Predict before you peek: pick an n for the hidden chain</span>
              <span className="font-mono text-violet-300">predict n = {predict}</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={predict}
              aria-label="prediction chain length"
              onChange={(e) => setPredict(Number(e.target.value))}
              className="w-full mt-1 min-h-11 accent-violet-500"
            />
            <div className={`mt-2 text-sm rounded-xl p-3 border transition-colors ${predict === n ? 'bg-emerald-500/10 border-emerald-700 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-300'}`}>
              {predict === n ? (
                <span>
                  Correct! The hidden chain is {NAMES[n - 1]}, {formula}, mass {mass.toFixed(1)} g/mol, bp {bp} °C.
                </span>
              ) : (
                <span>
                  Your prediction {formula} → mass {(12.0 * predict + 1.0 * (2 * predict + 2)).toFixed(1)} g/mol. Slide n and compare.
                </span>
              )}
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-700/60 rounded-2xl text-xs text-amber-200">
            <span className="font-bold">Misconception killer:</span> alkanes are NOT CnH2n. That formula belongs to
            alkenes and cycloalkanes. Saturated chains always carry the extra two hydrogens — {formula} proves it.
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-800/60 rounded-2xl text-sm">
        <p className="font-bold text-emerald-300 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-300">
          <li>Set n = 8 (octane in petrol). What are its molar mass and boiling point? Why is it a liquid while methane is a gas?</li>
          <li>Predict the formula of the alkane with n = 10, then slide there. Did each extra CH2 add exactly 14 g/mol?</li>
        </ol>
      </div>

      <button
        onClick={() => {
          setN(3);
          setShowH(true);
          setPredict(5);
        }}
        className="mt-4 min-h-11 w-full rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-bold transition-colors"
      >
        Reset
      </button>
    </div>
  );
}

export default C10_ChemistryAlkanesgeneralformulaandpreparationSim;

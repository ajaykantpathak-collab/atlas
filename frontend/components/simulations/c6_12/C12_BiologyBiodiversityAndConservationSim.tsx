'use client';

import React, { useState } from 'react';

/**
 * Class 12 Biology -- Biodiversity and Conservation
 * The species-area relationship S = C A^z on a log-log field: slide z from
 * mainland (0.1-0.2) to island (0.6-0.7) and price habitat loss in species.
 * Self-contained: react + tailwind only.
 */

export function C12_BiologyBiodiversityAndConservationSim() {
  const [cBase, setCBase] = useState(120); // species at A = 1 unit
  const [z, setZ] = useState(0.25);
  const [areaExp, setAreaExp] = useState(3); // A = 10^areaExp km^2
  const [lossFrac, setLossFrac] = useState(0.3); // fraction of area destroyed

  const A = Math.pow(10, areaExp);
  const S = cBase * Math.pow(A, z);
  const A2 = A * (1 - lossFrac);
  const S2 = cBase * Math.pow(A2, z);
  const lostFrac = 1 - Math.pow(1 - lossFrac, z);
  const speciesLost = Math.max(0, S - S2);

  // log-log line: x = log10 A in [0,6], y = log10 S
  const px = (la: number) => 50 + (la / 6) * 390;
  const py = (ls: number) => 235 - ((ls - Math.log10(cBase)) / (Math.log10(cBase * 1e6) - Math.log10(cBase))) * 195;
  const linePts: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const la = (6 * i) / 100;
    linePts.push(`${px(la)},${py(Math.log10(cBase) + z * la)}`);
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-green-950/80 rounded-2xl border border-green-700 font-mono">S~A</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-green-400">Class 12 -- Biodiversity and Conservation</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Species-Area: What Does Losing Habitat Cost?</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 260" className="w-full">
            <line x1={50} y1={235} x2={440} y2={235} stroke="#475569" strokeWidth={2} />
            <line x1={50} y1={20} x2={50} y2={235} stroke="#475569" strokeWidth={2} />
            <text x={245} y={255} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="monospace">log10 Area (km^2, 1 to a million)</text>
            <text x={18} y={130} fill="#64748b" fontSize={10} fontFamily="monospace" transform="rotate(-90 18 130)">log10 species</text>
            {[1, 2, 3, 4, 5].map((la) => (
              <g key={la}>
                <line x1={px(la)} y1={20} x2={px(la)} y2={235} stroke="#1e293b" />
                <text x={px(la)} y={248} textAnchor="middle" fill="#475569" fontSize={9} fontFamily="monospace">10^{la}</text>
              </g>
            ))}
            <polyline points={linePts.join(' ')} fill="none" stroke="#34d399" strokeWidth={2.5} />
            {/* main vs island reference slopes from same intercept */}
            <line x1={px(0)} y1={py(Math.log10(cBase))} x2={px(6)} y2={py(Math.log10(cBase) + 0.15 * 6)}
              stroke="#94a3b8" strokeWidth={1.2} strokeDasharray="4 4" />
            <line x1={px(0)} y1={py(Math.log10(cBase))} x2={px(6)} y2={py(Math.log10(cBase) + 0.7 * 6)}
              stroke="#f87171" strokeWidth={1.2} strokeDasharray="4 4" opacity={0.55} />
            <text x={px(4.7)} y={py(Math.log10(cBase) + 0.15 * 4.7) - 8} fill="#94a3b8" fontSize={9} fontFamily="monospace">z = 0.15 mainland</text>
            <text x={px(3.4)} y={py(Math.log10(cBase) + 0.7 * 3.4) - 8} fill="#f87171" fontSize={9} fontFamily="monospace">z = 0.7 small islands</text>
            {/* current point and post-loss point */}
            <circle cx={px(areaExp)} cy={py(Math.log10(S))} r={6} fill="#34d399" stroke="#fff" strokeWidth={1.5} />
            <text x={px(areaExp) + 9} y={py(Math.log10(S)) - 6} fill="#6ee7b7" fontSize={10} fontFamily="monospace">
              {S.toFixed(0)} species now
            </text>
            <circle cx={px(Math.log10(A2))} cy={py(Math.log10(S2))} r={5} fill="#f87171" />
            <line x1={px(areaExp)} y1={py(Math.log10(S))} x2={px(Math.log10(A2))} y2={py(Math.log10(S2))}
              stroke="#f87171" strokeWidth={1.5} strokeDasharray="3 3" />
            <text x={px(Math.log10(A2)) + 8} y={py(Math.log10(S2)) + 14} fill="#fca5a5" fontSize={10} fontFamily="monospace">
              after loss: {S2.toFixed(0)}
            </text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-3 gap-2">
            <div><span className="text-slate-500">Species at {A >= 1e4 ? A.toExponential(0) : A.toLocaleString()} km^2</span><div className="text-emerald-300 font-bold text-sm">{S.toFixed(0)}</div></div>
            <div><span className="text-slate-500">After {Math.round(lossFrac * 100)}% habitat lost</span><div className="text-rose-300 font-bold text-sm">{S2.toFixed(0)} ({speciesLost.toFixed(0)} gone)</div></div>
            <div><span className="text-slate-500">1-(1-f)^z rule</span><div className="text-amber-300 font-bold text-sm">{(lostFrac * 100).toFixed(1)}% of species</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Slope z (sensitivity)</span><span className={`font-mono font-bold ${z < 0.25 ? 'text-sky-300' : z < 0.45 ? 'text-emerald-300' : 'text-rose-300'}`}>{z.toFixed(2)}</span>
              </div>
              <input type="range" min={0.05} max={0.75} step={0.01} value={z} aria-label="Slope z"
                onChange={(e) => setZ(Number(e.target.value))} className="w-full accent-emerald-500" />
              <div className="flex gap-1 mt-2">
                {[
                  { label: 'Mainland 0.15', v: 0.15 },
                  { label: 'Typical 0.25', v: 0.25 },
                  { label: 'Island 0.7', v: 0.7 },
                ].map((p) => (
                  <button key={p.label} onClick={() => setZ(p.v)}
                    className={`flex-1 py-1 rounded-lg text-[9px] font-bold ${z === p.v ? 'bg-emerald-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Area A</span><span className="font-mono font-bold text-sky-400">10^{areaExp} km^2</span>
              </div>
              <input type="range" min={1} max={6} step={0.1} value={areaExp} aria-label="Area exponent"
                onChange={(e) => setAreaExp(Number(e.target.value))} className="w-full accent-sky-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Habitat destroyed f</span><span className="font-mono font-bold text-rose-400">{Math.round(lossFrac * 100)}%</span>
              </div>
              <input type="range" min={0.05} max={0.95} step={0.05} value={lossFrac} aria-label="Habitat loss fraction"
                onChange={(e) => setLossFrac(Number(e.target.value))} className="w-full accent-rose-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Baseline C (species at 1 km^2)</span><span className="font-mono font-bold text-emerald-400">{cBase}</span>
              </div>
              <input type="range" min={20} max={400} step={5} value={cBase} aria-label="Baseline species C"
                onChange={(e) => setCBase(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Alexander von Humboldt noticed it first, R.H. Whittaker formalised it: species richness
              grows with explored area as a power law, S = C A^z. The exponent z is the whole
              argument for conservation -- on mainlands (z 0.1-0.2) losing half a huge forest costs
              few species, but in a small island or fragmented reserve (z up to 0.7) the SAME loss is
              catastrophic. That is exactly why corridors and large connected reserves beat several
              small zoos of habitat.
            </p>
          </div>

          <div className="bg-green-950/40 rounded-2xl border border-green-800/50 p-4 text-xs">
            <p className="font-bold text-green-300 mb-1">What to try</p>
            <p>1. Fix f = 50%. Compare species lost at z = 0.15 versus z = 0.7 -- the island case should be brutal. Report both percentages.</p>
            <p>2. Find the habitat-loss fraction at z = 0.7 that wipes out half the species. Would you have guessed it is less than 40%?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_BiologyBiodiversityAndConservationSim;

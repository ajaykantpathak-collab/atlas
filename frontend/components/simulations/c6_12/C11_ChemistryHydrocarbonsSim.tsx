'use client';

import React, { useState } from 'react';

/**
 * Class 11 Chemistry -- Hydrocarbons
 * Build a straight-chain hydrocarbon: general formula, IUPAC name, exact
 * structural-isomer count, real boiling points and the balanced combustion
 * equation. Self-contained: react + tailwind only.
 */

type Family = 'alkane' | 'alkene' | 'alkyne';

const NAMES: Record<Family, string[]> = {
  alkane: ['Methane', 'Ethane', 'Propane', 'Butane', 'Pentane', 'Hexane', 'Heptane', 'Octane', 'Nonane', 'Decane'],
  alkene: ['--', 'Ethene', 'Propene', 'But-1-ene', 'Pent-1-ene', 'Hex-1-ene', 'Hept-1-ene', 'Oct-1-ene', 'Non-1-ene', 'Dec-1-ene'],
  alkyne: ['--', 'Ethyne (acetylene)', 'Propyne', 'But-1-yne', 'Pent-1-yne', 'Hex-1-yne', 'Hept-1-yne', 'Oct-1-yne', 'Non-1-yne', 'Dec-1-yne'],
};

// Exact number of constitutional isomers (well-known enumerations)
const ISOMERS: Record<Family, (number | null)[]> = {
  alkane: [1, 1, 1, 2, 3, 5, 9, 18, 35, 75],
  alkene: [null, 1, 1, 3, 5, 13, 27, 47, 84, 136],
  alkyne: [null, 1, 1, 2, 3, 7, 14, 24, 41, 67],
};

// Real normal boiling points, deg C (alkanes exact; terminal alkenes/alkynes standard values)
const BP: Record<Family, (number | null)[]> = {
  alkane: [-161.5, -88.6, -42.1, -0.5, 36.1, 68.7, 98.4, 125.6, 150.8, 174.1],
  alkene: [null, -103.7, -47.7, -6.3, 30.0, 63.5, 93.6, 121.3, 146.0, 170.6],
  alkyne: [null, -84.0, -23.2, 8.1, 40.2, 71.4, 99.7, 125.0, 148.0, 172.0],
};

export function C11_ChemistryHydrocarbonsSim() {
  const [nC, setNC] = useState(4);
  const [family, setFamily] = useState<Family>('alkane');

  const exists = !(family === 'alkane' ? false : nC < 2);
  const nH = family === 'alkane' ? 2 * nC + 2 : family === 'alkene' ? 2 * nC : 2 * nC - 2;
  const o2 = family === 'alkane' ? (3 * nC + 1) / 2 : family === 'alkene' ? (3 * nC) / 2 : (3 * nC - 1) / 2;
  const h2o = family === 'alkane' ? nC + 1 : family === 'alkene' ? nC : nC - 1;
  const molMass = 12.011 * nC + 1.008 * nH;
  const isomers = ISOMERS[family][nC - 1];
  const bp = BP[family][nC - 1];
  const h2ToAlkane = family === 'alkane' ? 0 : family === 'alkene' ? 1 : 2;
  const unsaturation = family === 'alkane' ? 0 : family === 'alkene' ? 1 : 2;
  const iupac = NAMES[family][nC - 1];

  // Skeletal zig-zag drawing
  const zig: string[] = [];
  const nSeg = Math.max(1, nC - 1);
  for (let i = 0; i < nC; i++) {
    const x = 60 + i * (320 / Math.max(1, nSeg)) * 0.5;
    const y = i % 2 === 0 ? 190 : 150;
    zig.push(`${x},${y}`);
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-lime-950/80 rounded-2xl border border-lime-700 font-mono">C-C</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-lime-400">Class 11 -- Hydrocarbons</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Chain Builder: Formula, Isomers, Boiling Trend</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 480 240" className="w-full">
            <text x={240} y={30} textAnchor="middle" fill="#fff" fontSize={16} fontWeight="bold" fontFamily="monospace">
              {exists ? `C${nC}H${nH}` : 'cannot exist'}
            </text>
            <text x={240} y={50} textAnchor="middle" fill="#a3e635" fontSize={12} fontFamily="monospace">
              {exists ? iupac : `${family === 'alkene' ? 'C=C' : 'C=C triple'} needs at least 2 carbons`}
            </text>
            {exists ? (
              nC === 1 ? (
                <text x={240} y={130} textAnchor="middle" fill="#d9f99d" fontSize={18} fontFamily="monospace">H - C(4H) - H ... tetrahedral CH4</text>
              ) : (
                <>
                  <polyline points={zig.join(' ')} fill="none"
                    stroke={family === 'alkane' ? '#94a3b8' : family === 'alkene' ? '#fbbf24' : '#f472b6'}
                    strokeWidth={3.5} />
                  {family !== 'alkane' && nC >= 2 && (() => {
                    const x0 = Number(zig[0].split(',')[0]);
                    const y0 = Number(zig[0].split(',')[1]);
                    const x1 = Number(zig[1].split(',')[0]);
                    const y1 = Number(zig[1].split(',')[1]);
                    const dx = (y1 - y0) * 0.08;
                    const dy = (x1 - x0) * 0.08;
                    const extra = family === 'alkene'
                      ? [`M ${x0} ${y0} L ${x1} ${y1}`, `M ${x0 + dx} ${y0 - dy} L ${x1 + dx} ${y1 - dy}`]
                      : [`M ${x0} ${y0} L ${x1} ${y1}`, `M ${x0 + dx} ${y0 - dy} L ${x1 + dx} ${y1 - dy}`, `M ${x0 + 2 * dx} ${y0 - 2 * dy} L ${x1 + 2 * dx} ${y1 - 2 * dy}`];
                    return extra.map((d, i) => (
                      <path key={i} d={d} stroke={family === 'alkene' ? '#fbbf24' : '#f472b6'} strokeWidth={2.5} fill="none" />
                    ));
                  })()}
                  {zig.map((p, i) => {
                    const [x, y] = p.split(',');
                    return <circle key={i} cx={Number(x)} cy={Number(y)} r={7} fill="#1a2e05" stroke="#a3e635" strokeWidth={2} />;
                  })}
                  <text x={240} y={222} textAnchor="middle" fill="#64748b" fontSize={11} fontFamily="monospace">
                    {exists ? `skeletal chain: ${nC} C, ${nH} H, degree of unsaturation = ${unsaturation}` : ''}
                  </text>
                </>
              )
            ) : (
              <text x={240} y={130} textAnchor="middle" fill="#f87171" fontSize={13} fontFamily="monospace">
                a pi bond needs two adjacent carbons
              </text>
            )}
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
            <div><span className="text-slate-500">Balanced combustion:</span>
              <div className="text-emerald-300 font-bold mt-1">
                {exists ? `C${nC}H${nH} + ${o2 % 1 === 0 ? o2 : o2.toFixed(1)} O2 -> ${nC} CO2 + ${h2o} H2O + heat` : '--'}
              </div>
            </div>
            <div><span className="text-slate-500">Hydrogenation to alkane:</span>
              <span className="text-amber-300 font-bold"> {exists ? (h2ToAlkane === 0 ? 'already saturated' : `+ ${h2ToAlkane} H2 (Ni catalyst, 200 C)`) : '--'}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Carbon atoms n</span><span className="font-mono font-bold text-lime-400">{nC}</span>
              </div>
              <input type="range" min={1} max={10} step={1} value={nC} aria-label="Carbon count"
                onChange={(e) => setNC(Number(e.target.value))} className="w-full accent-lime-500" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['alkane', 'alkene', 'alkyne'] as Family[]).map((f) => (
                <button key={f} onClick={() => setFamily(f)}
                  className={`py-2 rounded-xl text-[11px] font-bold capitalize ${family === f ? 'bg-lime-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                  {f}
                </button>
              ))}
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              General formula: <b className="text-lime-300">{family === 'alkane' ? 'CnH2n+2' : family === 'alkene' ? 'CnH2n' : 'CnH2n-2'}</b>
              {' '}(check: C{nC}H{nH})
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-lime-800/60 p-4 text-xs font-mono grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">Molar mass</span><div className="text-lime-300 font-bold text-sm">{exists ? molMass.toFixed(2) + ' g/mol' : '--'}</div></div>
            <div><span className="text-slate-500">Structural isomers</span><div className="text-amber-300 font-bold text-sm">{isomers === null ? '--' : isomers}</div></div>
            <div><span className="text-slate-500">Boiling point</span><div className="text-gold-300 font-bold text-sm">{bp === null ? '--' : bp + ' deg C'}</div></div>
            <div><span className="text-slate-500">State at 25 C</span><div className="text-slate-300 font-bold text-sm">{bp === null ? '--' : bp < 25 ? 'gas' : 'liquid'}</div></div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Each added CH2 raises the boiling point by roughly 20-30 deg C because London forces
              grow with molecular size and contact area -- decane (174 C) vs ethane (-89 C) is one
              continuous trend, which is why crude oil can be fractionally distilled. Isomer counts
              explode combinatorially: butane 2, pentane 3, octane 18 -- same formula, different
              properties (octane rating!).
            </p>
          </div>

          <div className="bg-lime-950/40 rounded-2xl border border-lime-800/50 p-4 text-xs">
            <p className="font-bold text-lime-300 mb-1">What to try</p>
            <p>1. Find n where the alkane first becomes a liquid at room temperature -- then explain the sign change of the boiling-point column.</p>
            <p>2. Compare C4H10 (2 isomers) with C4H8 (3) and C4H6 (2): which family gains isomers from position of the multiple bond rather than branching?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_ChemistryHydrocarbonsSim;

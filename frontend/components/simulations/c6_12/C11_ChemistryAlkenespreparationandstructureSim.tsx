'use client';
/**
 * C11_ChemistryAlkenespreparationandstructureSim (Class 11 Chemistry)
 *
 * ONE concept: one C=C double bond costs two hydrogens (CnH2n) and creates a
 * site of unsaturation that adds Br2 / H2. Saturate the bond and watch the
 * formula snap back to CnH2n+2.
 */
import React, { useState } from 'react';

function Sub({ n }: { n: number }) {
  return <sub className="text-[0.7em]">{n}</sub>;
}

export function C11_ChemistryAlkenespreparationandstructureSim() {
  const [n, setN] = useState(2);
  const [saturated, setSaturated] = useState(false); // false = alkene (C=C), true = after adding H2
  const [testOn, setTestOn] = useState(true); // bromine water test
  const [addedH2, setAddedH2] = useState(0); // H2 molecules reacted

  const hAlk = 2 * n; // alkene hydrogens
  const hSat = 2 * n + 2;
  const H = saturated ? hSat : hAlk;
  const mass = 12.0 * n + 1.0 * H;
  const dou = (2 * n + 2 - H) / 2; // degree of unsaturation
  const needH2 = dou; // molecules of H2 to fully saturate
  const br2Used = testOn ? dou : 0; // bromine water consumed (colour lost)

  const testColor = br2Used > 0 ? '#a16207' : '#fbbf24'; // brown = decolourised, orange = bromine present
  const testLabel = br2Used > 0 ? 'decolourised' : 'stays orange';

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-slate-950 rounded-3xl border border-slate-800 font-sans text-slate-100">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Unsaturation: the price of a double bond</h1>
      <p className="mt-1 text-sm text-slate-400">
        A C=C double bond means the chain holds two fewer hydrogens. Everything the reagent does follows from that
        missing pair.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setSaturated((v) => !v)}
          className={`min-h-11 px-4 rounded-xl text-sm font-bold transition-colors ${saturated ? 'bg-slate-800 border border-slate-700 hover:bg-slate-700' : 'bg-violet-600 hover:bg-violet-500'}`}
        >
          {saturated ? 'Undo hydrogenation' : 'Add H2 (hydrogenate)'}
        </button>
        <button
          onClick={() => setTestOn((v) => !v)}
          className={`min-h-11 px-4 rounded-xl text-sm font-bold border transition-colors ${testOn ? 'bg-amber-600/80 border-amber-500' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}
        >
          {testOn ? 'Dip in bromine water' : 'Remove test tube'}
        </button>
        <button
          onClick={() => {
            setSaturated(false);
            setAddedH2(0);
          }}
          className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-bold transition-colors"
        >
          Restore C=C
        </button>
      </div>

      <div className="mt-3">
        <label className="text-xs font-semibold text-slate-400 flex justify-between">
          <span>Chain length n</span>
          <span className="font-mono text-indigo-300">n = {n}</span>
        </label>
        <input
          type="range"
          min={2}
          max={8}
          value={n}
          aria-label="number of carbon atoms"
          onChange={(e) => {
            setN(Number(e.target.value));
            setSaturated(false);
            setAddedH2(0);
          }}
          className="w-full mt-1 min-h-11 accent-indigo-500"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
          <svg viewBox="0 0 560 240" className="w-full" role="img" aria-label="chain with optional double bond">
            {Array.from({ length: n }, (_, i) => {
              const x = 45 + (i % 8) * 64;
              const y = i % 2 === 0 ? 110 : 150;
              const nextX = 45 + ((i + 1) % 8) * 64;
              const nextY = (i + 1) % 2 === 0 ? 110 : 150;
              const isDouble = !saturated && i === 0; // the reactive C=C at position 1
              return (
                <g key={i}>
                  {i < n - 1 && (
                    <>
                      <line
                        x1={x}
                        y1={y - (isDouble ? 4 : 0)}
                        x2={nextX}
                        y2={nextY - (isDouble ? 4 : 0)}
                        stroke={isDouble ? '#f472b6' : '#818cf8'}
                        strokeWidth={4}
                        className="transition-all duration-300"
                      />
                      {isDouble && (
                        <line x1={x} y1={y + 6} x2={nextX} y2={nextY + 6} stroke="#f472b6" strokeWidth={4} className="transition-all duration-300" />
                      )}
                    </>
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={16}
                    fill="#1e293b"
                    stroke={i === 0 && !saturated ? '#f472b6' : '#818cf8'}
                    strokeWidth={2.5}
                    className="transition-all duration-300"
                  />
                  <text x={x} y={y + 5} textAnchor="middle" fill="#e0e7ff" fontSize={14} fontWeight="bold">
                    C
                  </text>
                </g>
              );
            })}
            <text x={280} y={30} textAnchor="middle" fill="#a5b4fc" fontSize={15} fontWeight="bold">
              {saturated ? `C${n}H${hSat} (alkane, no double bond)` : `C${n}H${hAlk} (alkene, 1 x C=C)`}
            </text>
            {testOn && (
              <g>
                <rect x={210} y={170} width={140} height={40} rx={8} fill="#1c1917" stroke="#57534e" />
                <rect x={214} y={174} width={132} height={32} rx={6} fill={testColor} opacity={br2Used > 0 ? 0.5 : 0.95} className="transition-all duration-500" />
                <text x={280} y={228} textAnchor="middle" fill="#d6d3d1" fontSize={12}>
                  bromine water: {testLabel}
                </text>
              </g>
            )}
          </svg>
          <div className="grid grid-cols-3 gap-2 mt-2 text-center">
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Molar mass</div>
              <div className="font-mono text-indigo-300 font-bold">{mass.toFixed(1)} g/mol</div>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Unsaturation</div>
              <div className="font-mono text-pink-300 font-bold">{dou.toFixed(0)} site(s)</div>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Br2 consumed</div>
              <div className="font-mono text-amber-300 font-bold">{br2Used.toFixed(0)} mol</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-sm font-mono text-slate-300 space-y-1">
            <div>
              Alkane comparison: C<Sub n={n} />H<Sub n={hSat} /> = {(12.0 * n + hSat).toFixed(1)} g/mol vs current{' '}
              <span className="text-violet-300 font-bold">{mass.toFixed(1)} g/mol</span>
            </div>
            <div>
              H2 needed to saturate: <span className="text-emerald-300 font-bold">{needH2.toFixed(0)} mol H2</span> (added so far: {addedH2})
            </div>
            <div className="text-xs text-slate-500">
              DoU = (2n+2 − H) / 2 = ({2 * n + 2} − {H}) / 2 = {dou.toFixed(0)}
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <button
              onClick={() => setAddedH2((v) => Math.min(needH2, v + 1))}
              className="min-h-11 w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-bold transition-colors"
            >
              Bubble in 1 mol H2 (Ni catalyst, 200 °C)
            </button>
            <div
              className={`mt-2 rounded-xl p-3 text-sm border transition-colors ${addedH2 >= needH2 ? 'bg-emerald-500/10 border-emerald-700 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-300'}`}
            >
              {addedH2 >= needH2
                ? `Fully saturated! The chain is now C${n}H${hSat} — bromine water would stay orange.`
                : `${(needH2 - addedH2).toFixed(0)} mol H2 still needed. Formula so far: C${n}H${hAlk + addedH2}.`}
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-700/60 rounded-2xl text-xs text-amber-200">
            <span className="font-bold">Misconception killer:</span> a double bond is not "stronger" than two single
            bonds. The pi bond is weaker and sticks out — that is exactly why alkenes decolourise bromine water and
            alkanes do not.
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-800/60 rounded-2xl text-sm">
        <p className="font-bold text-emerald-300 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-300">
          <li>Set n = 2, dip in bromine water, then hydrogenate. At what mass does the test stop working?</li>
          <li>Compare the alkene CnH2n with the alkane of the previous n. What do you notice about their masses?</li>
        </ol>
      </div>

      <button
        onClick={() => {
          setN(2);
          setSaturated(false);
          setTestOn(true);
          setAddedH2(0);
        }}
        className="mt-4 min-h-11 w-full rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-bold transition-colors"
      >
        Reset
      </button>
    </div>
  );
}

export default C11_ChemistryAlkenespreparationandstructureSim;

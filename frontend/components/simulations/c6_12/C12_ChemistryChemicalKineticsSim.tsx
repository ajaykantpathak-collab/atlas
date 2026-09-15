'use client';

import React, { useState } from 'react';

/**
 * Class 12 Chemistry -- Chemical Kinetics
 * Arrhenius k = A e^(-Ea/RT) drives a first-order reaction A -> products:
 * exponential decay, half-life, ln[A] linearity and the 10-degree rule.
 * Self-contained: react + tailwind only.
 */

const A_FACTOR = 1e13; // s^-1, typical first-order pre-exponential
const RGAS = 8.314;

export function C12_ChemistryChemicalKineticsSim() {
  const [eaKJ, setEaKJ] = useState(80); // kJ/mol
  const [tempK, setTempK] = useState(300);
  const [showHot, setShowHot] = useState(true);
  const [tCursor, setTCursor] = useState(10); // s

  const k1 = A_FACTOR * Math.exp(-(eaKJ * 1000) / (RGAS * tempK));
  const k2 = A_FACTOR * Math.exp(-(eaKJ * 1000) / (RGAS * (tempK + 10)));
  const halfLife1 = Math.log(2) / k1;
  const halfLife2 = Math.log(2) / k2;
  const tMax = Math.max(20, Math.min(600, 6 * halfLife1));
  const t = Math.min(tCursor, tMax);

  const conc = (kk: number, tt: number) => 100 * Math.exp(-kk * tt); // percent remaining
  const now1 = conc(k1, t);
  const now2 = conc(k2, t);
  const rate1 = (k1 / 100) * now1; // %/s, first order: rate = k[A]
  const t99 = Math.log(100) / k1;

  // Decay trace
  const px = (tt: number) => 50 + (tt / tMax) * 380;
  const py = (c: number) => 240 - (c / 100) * 190;
  let trace1 = `M ${px(0)},${py(100)}`;
  let trace2 = `M ${px(0)},${py(100)}`;
  for (let i = 1; i <= 100; i++) {
    const tt = (tMax * i) / 100;
    trace1 += ` L ${px(tt)},${py(conc(k1, tt))}`;
    trace2 += ` L ${px(tt)},${py(conc(k2, tt))}`;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-cyan-950/80 rounded-2xl border border-cyan-700 font-mono">k</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Class 12 -- Chemical Kinetics</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Arrhenius Energy Barrier Meets First-Order Decay</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 270" className="w-full">
            <line x1={50} y1={240} x2={440} y2={240} stroke="#475569" strokeWidth={2} />
            <line x1={50} y1={240} x2={50} y2={20} stroke="#475569" strokeWidth={2} />
            <text x={245} y={262} textAnchor="middle" fill="#64748b" fontSize={11} fontFamily="monospace">time (s)</text>
            <text x={20} y={135} fill="#64748b" fontSize={11} fontFamily="monospace" transform="rotate(-90 20 135)">[A] (% of initial)</text>
            {showHot && <path d={trace2} fill="none" stroke="#fbbf24" strokeWidth={2} strokeDasharray="5 4" />}
            <path d={trace1} fill="none" stroke="#38bdf8" strokeWidth={3} />
            {[25, 50, 75].map((c) => (
              <g key={c}>
                <line x1={50} y1={py(c)} x2={440} y2={py(c)} stroke="#1e293b" strokeDasharray="3 5" />
                <text x={44} y={py(c) + 4} textAnchor="end" fill="#475569" fontSize={9} fontFamily="monospace">{c}</text>
              </g>
            ))}
            {/* half-life markers on cold curve */}
            {[1, 2, 3].map((i) => (
              <g key={i}>
                <line x1={px(i * halfLife1)} y1={py(100 / Math.pow(2, i))} x2={px(i * halfLife1)} y2={240}
                  stroke="#38bdf8" strokeWidth={1} strokeDasharray="2 4" />
                <text x={px(i * halfLife1)} y={254} textAnchor="middle" fill="#38bdf8" fontSize={9} fontFamily="monospace">
                  {i}t1/2
                </text>
              </g>
            ))}
            <circle cx={px(t)} cy={py(now1)} r={6} fill="#f472b6" stroke="#fff" strokeWidth={1.5} />
            <text x={px(t) + 10} y={py(now1) - 8} fill="#f9a8d4" fontSize={11} fontFamily="monospace">
              t = {t.toFixed(1)} s: {now1.toFixed(1)}% left
            </text>
            {showHot && <circle cx={px(t)} cy={py(now2)} r={4} fill="#fbbf24" />}
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">Rate constant k(T)</span><div className="text-sky-300 font-bold text-sm">{k1.toExponential(3)} s^-1</div></div>
            <div><span className="text-slate-500">Half-life t1/2 = ln2/k</span><div className="text-cyan-300 font-bold text-sm">{halfLife1 < 100 ? halfLife1.toFixed(2) + ' s' : halfLife1.toFixed(0) + ' s'}</div></div>
            <div><span className="text-slate-500">Rate now = k[A]</span><div className="text-pink-300 font-bold text-sm">{rate1.toFixed(3)} %/s</div></div>
            <div><span className="text-slate-500">k(T+10)/k(T)</span><div className="text-amber-300 font-bold text-sm">{(k2 / k1).toFixed(2)}x (10-degree rule)</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Activation energy Ea</span><span className="font-mono font-bold text-rose-400">{eaKJ} kJ/mol</span>
              </div>
              <input type="range" min={40} max={140} step={2} value={eaKJ} aria-label="Activation energy"
                onChange={(e) => setEaKJ(Number(e.target.value))} className="w-full accent-rose-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Temperature T</span><span className="font-mono font-bold text-sky-400">{tempK} K</span>
              </div>
              <input type="range" min={260} max={400} step={5} value={tempK} aria-label="Temperature"
                onChange={(e) => setTempK(Number(e.target.value))} className="w-full accent-sky-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Time cursor t</span><span className="font-mono font-bold text-pink-400">{t.toFixed(1)} s</span>
              </div>
              <input type="range" min={0} max={tMax} step={0.1} value={t} aria-label="Time cursor"
                onChange={(e) => setTCursor(Number(e.target.value))} className="w-full accent-pink-500" />
            </div>
            <button onClick={() => setShowHot((s) => !s)}
              className={`w-full py-2 rounded-xl text-xs font-bold ${showHot ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
              {showHot ? 'Hide T+10 K comparison' : 'Show T+10 K comparison'}
            </button>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-cyan-800/60 p-4 text-xs font-mono space-y-1">
            <div className="text-cyan-300 font-bold">Worked chain (first order)</div>
            <div className="text-slate-400">k = 10^13 x e^(-{eaKJ * 1000}/({RGAS.toFixed(2)}x{tempK}))</div>
            <div className="text-slate-400">[A] = 100 e^(-kt) -- t1/2 independent of [A]0</div>
            <div className="text-slate-400">ln[A] vs t is a straight line, slope = -k</div>
            <div className="text-slate-500">99% completion needs t = ln(100)/k = <b className="text-amber-300">{t99 < 1000 ? t99.toFixed(1) + ' s' : t99.toFixed(0) + ' s'}</b> (about {(Math.log(100) / Math.log(2)).toFixed(2)} half-lives)</div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              The exponent Ea/RT is the Boltzmann odds of a collision carrying at least Ea. A 10 K
              nudge near room temperature roughly doubles k (watch the ratio readout) because the
              high-energy tail of the Maxwell-Boltzmann distribution grows fast even though the mean
              energy barely moves. First order is special: the half-life is a constant, so
              concentration just keeps halving every t1/2.
            </p>
          </div>

          <div className="bg-cyan-950/40 rounded-2xl border border-cyan-800/50 p-4 text-xs">
            <p className="font-bold text-cyan-300 mb-1">What to try</p>
            <p>1. Raise Ea from 60 to 100 kJ at 300 K and record k each time -- roughly how many orders of magnitude does 40 kJ cost?</p>
            <p>2. Use the cursor to find t at 12.5% remaining and divide by t1/2 -- the answer should be 3 for ANY settings. Explain why.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_ChemistryChemicalKineticsSim;

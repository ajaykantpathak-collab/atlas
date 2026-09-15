'use client';

import React, { useState } from 'react';

/**
 * Class 12 Biology -- Environmental Issues
 * Sewage outfall into a river: the Streeter-Phelps dissolved-oxygen sag curve,
 * with BOD load, reaeration and flow speed controlling the fish-kill zone.
 * Self-contained: react + tailwind only.
 */

const K1 = 0.35; // deoxygenation rate, 1/day
const DO_SAT = 9; // mg/L saturation
const D0 = 1; // initial oxygen deficit, mg/L

export function C12_BiologyEnvironmentalIssuesSim() {
  const [bod, setBod] = useState(35); // L0, ultimate BOD mg/L
  const [k2, setK2] = useState(0.4); // reaeration rate 1/day
  const [velocity, setVelocity] = useState(25); // km/day

  const deficit = (xKm: number) => {
    const t = xKm / Math.max(1, velocity);
    if (Math.abs(k2 - K1) < 1e-6) return (K1 * bod * t) * Math.exp(-K1 * t) + D0 * Math.exp(-K1 * t);
    return ((K1 * bod) / (k2 - K1)) * (Math.exp(-K1 * t) - Math.exp(-k2 * t)) + D0 * Math.exp(-k2 * t);
  };
  const doAt = (xKm: number) => DO_SAT - deficit(xKm);

  // Critical point (maximum deficit)
  const ratio = 1 - (D0 * (k2 - K1)) / (K1 * bod);
  const tCrit = ratio > 0 ? (Math.log((k2 / K1) * ratio) / (k2 - K1)) : 0;
  const xCrit = Math.max(0, tCrit * velocity);
  const doMin = doAt(xCrit);
  const recoveryKm = (() => {
    for (let x = xCrit; x < 400; x += 2) if (doAt(x) >= DO_SAT - 1) return x;
    return null;
  })();
  const fishSafe = doMin >= 5;

  // Plot DO vs distance 0..150 km
  const px = (x: number) => 50 + (x / 150) * 390;
  const py = (d: number) => 20 + ((DO_SAT + 1 - d) / (DO_SAT + 1)) * 190;
  const pts: string[] = [];
  for (let i = 0; i <= 200; i++) {
    const x = (150 * i) / 200;
    pts.push(`${px(x)},${py(Math.max(0, doAt(x)))}`);
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-sky-950/80 rounded-2xl border border-sky-700 font-mono">DO</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Class 12 -- Environmental Issues</span>
          <h1 className="text-xl md:text-2xl font-extrabold">The Oxygen Sag: A River Digesting Sewage</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 240" className="w-full">
            <rect x={50} y={py(5)} width={390} height={py(0) - py(5)} fill="rgba(248,113,113,0.10)" />
            <text x={430} y={py(4.4)} textAnchor="end" fill="#f87171" fontSize={9} fontFamily="monospace">fish stress: DO below 5 mg/L</text>
            <line x1={50} y1={230} x2={440} y2={230} stroke="#475569" strokeWidth={2} />
            <line x1={50} y1={20} x2={50} y2={230} stroke="#475569" strokeWidth={2} />
            <text x={245} y={252} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="monospace">distance downstream (km)</text>
            <text x={20} y={130} fill="#64748b" fontSize={10} fontFamily="monospace" transform="rotate(-90 20 130)">dissolved O2 (mg/L)</text>
            <line x1={50} y1={py(DO_SAT)} x2={440} y2={py(DO_SAT)} stroke="#38bdf8" strokeDasharray="4 4" strokeWidth={1.2} />
            <text x={54} y={py(DO_SAT) - 5} fill="#38bdf8" fontSize={9} fontFamily="monospace">saturation {DO_SAT} mg/L</text>
            <polyline points={pts.join(' ')} fill="none" stroke="#34d399" strokeWidth={3} />
            <rect x={px(0) - 2} y={py(DO_SAT)} width={8} height={230 - py(DO_SAT)} fill="#7f1d1d" />
            <text x={60} y={py(DO_SAT) - 16} fill="#f87171" fontSize={9} fontFamily="monospace">outfall: BOD {bod} mg/L dumped</text>
            <circle cx={px(xCrit)} cy={py(Math.max(0, doMin))} r={6} fill="#fbbf24" stroke="#fff" strokeWidth={1.5} />
            <text x={px(xCrit) + 9} y={py(Math.max(0, doMin)) - 8} fill="#fbbf24" fontSize={10} fontFamily="monospace">
              critical: {doMin.toFixed(1)} mg/L at {xCrit.toFixed(0)} km
            </text>
            {recoveryKm !== null && recoveryKm < 150 && (
              <text x={px(recoveryKm)} y={py(DO_SAT - 1) - 10} fill="#6ee7b7" fontSize={9} fontFamily="monospace" textAnchor="middle">
                recovered ~{recoveryKm.toFixed(0)} km
              </text>
            )}
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-3 gap-2">
            <div><span className="text-slate-500">Minimum DO</span><div className={`font-bold text-sm ${fishSafe ? 'text-emerald-300' : 'text-rose-400'}`}>{doMin.toFixed(2)} mg/L</div></div>
            <div><span className="text-slate-500">Aquatic verdict</span><div className={`font-bold text-sm ${fishSafe ? 'text-emerald-300' : 'text-rose-400'}`}>{fishSafe ? 'fish survive' : 'fish kill likely'}</div></div>
            <div><span className="text-slate-500">Clean-zone species return</span><div className="text-sky-300 font-bold text-sm">{recoveryKm !== null ? `after ${recoveryKm.toFixed(0)} km` : 'beyond 400 km'}</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>BOD load at outfall</span><span className="font-mono font-bold text-rose-400">{bod} mg/L</span>
              </div>
              <input type="range" min={5} max={90} step={1} value={bod} aria-label="BOD load"
                onChange={(e) => setBod(Number(e.target.value))} className="w-full accent-rose-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Reaeration rate k2 (turbulence)</span><span className="font-mono font-bold text-sky-400">{k2.toFixed(2)} /day</span>
              </div>
              <input type="range" min={0.1} max={0.9} step={0.01} value={k2} aria-label="Reaeration rate"
                onChange={(e) => setK2(Number(e.target.value))} className="w-full accent-sky-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>River flow speed</span><span className="font-mono font-bold text-emerald-400">{velocity} km/day</span>
              </div>
              <input type="range" min={4} max={60} step={1} value={velocity} aria-label="River flow speed"
                onChange={(e) => setVelocity(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setBod(15); setK2(0.6); setVelocity(40); }}
                className="py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700">Treated effluent</button>
              <button onClick={() => { setBod(80); setK2(0.2); setVelocity(8); }}
                className="py-2 rounded-xl text-xs font-bold bg-rose-900/60 hover:bg-rose-800/60 text-rose-200">Raw sewage, slow river</button>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-sky-800/60 p-4 text-xs font-mono space-y-1">
            <div className="text-sky-300 font-bold">Two competing rates (Streeter-Phelps)</div>
            <div className="text-slate-400">microbes consume O2 at k1 x BOD = {(K1 * bod).toFixed(1)} mg/L/day</div>
            <div className="text-slate-400">surface re-aerates water at k2 x deficit</div>
            <div className="text-slate-500">sag bottom = where consumption just stops beating re-aeration</div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              BOD (biochemical oxygen demand) is the oxygen bill that microbes present while
              digesting sewage. Downstream, DO dips until re-aeration wins, then recovers -- and the
              biology rewrites itself along the way: clean-water species give way to sludge worms and
              blood-red chironomid larvae in the sag zone, then return. Cultural (man-made)
              eutrophication is the same story plus N and P feeding algal blooms.
            </p>
          </div>

          <div className="bg-sky-950/40 rounded-2xl border border-sky-800/50 p-4 text-xs">
            <p className="font-bold text-sky-300 mb-1">What to try</p>
            <p>1. Keep the load but raise flow speed from 8 to 60 km/day: does the MINIMUM DO change, or only the distance where it happens? Why?</p>
            <p>2. Using raw sewage settings, find the k2 (how much turbulence) needed to keep fish alive -- what engineering device mimics this?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_BiologyEnvironmentalIssuesSim;

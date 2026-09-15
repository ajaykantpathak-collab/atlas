'use client';

import React, { useState } from 'react';

/**
 * Class 12 Physics -- Atoms
 * Rutherford alpha scattering: hyperbolic Coulomb trajectories computed from
 * b = (kZe^2 / 2KE) cot(theta/2), with closest approach vs nuclear radius.
 * Self-contained: react + tailwind only.
 */

const KE2 = 2.307e-28; // k e^2 in J m  (8.99e9 x (1.6e-19)^2)
const FM = 1e15;

const TARGETS = [
  { z: 13, name: 'Al', A: 27 },
  { z: 29, name: 'Cu', A: 64 },
  { z: 79, name: 'Au', A: 197 },
];

export function C12_PhysicsAtomsSim() {
  const [keMeV, setKeMeV] = useState(5);
  const [bFm, setBFm] = useState(40);
  const [tIdx, setTIdx] = useState(2);

  const target = TARGETS[tIdx];
  const keJ = keMeV * 1.602e-13;
  const aFm = (KE2 * target.z) / (2 * keJ) * FM; // half head-on distance
  const eps = Math.sqrt(1 + (bFm * bFm) / (aFm * aFm));
  const thetaDeg = (180 - 2 * (Math.acos(1 / eps) * 180) / Math.PI);
  const rMinFm = aFm * (1 + eps);
  const nucRadius = 1.2 * Math.cbrt(target.A); // fm
  const valid = rMinFm > nucRadius;

  // Hyperbolic orbit r = p / (eps cos(phi) - 1), focus = nucleus
  const p = (bFm * bFm) / aFm;
  const phiInf = Math.acos(1 / eps);
  const dPhi = Math.min(0.06, phiInf * 0.25);
  const orbit: [number, number][] = [];
  for (let i = 0; i <= 120; i++) {
    const phi = -(phiInf - dPhi) + (2 * (phiInf - dPhi) * i) / 120;
    const r = p / (eps * Math.cos(phi) - 1);
    orbit.push([r * Math.cos(phi), r * Math.sin(phi)]);
  }
  // Rotate so the incoming velocity is horizontal (+x), beam from the left
  const vx = orbit[1][0] - orbit[0][0];
  const vy = orbit[1][1] - orbit[0][1];
  const ang = Math.atan2(vy, vx);
  const c = Math.cos(-ang);
  const s = Math.sin(-ang);
  const rotated = orbit.map(([x, y]) => [x * c - y * s, x * s + y * c] as [number, number]);
  const rMax = Math.max(...rotated.map(([x, y]) => Math.abs(y)).concat([rMinFm]));
  const scale = Math.min(0.9, 150 / Math.max(rMax, rMinFm * 1.1));
  const path = rotated.map(([x, y]) => `${250 + x * scale},${170 - y * scale}`).join(' ');

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-fuchsia-950/80 rounded-2xl border border-fuchsia-700 font-mono">a</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Class 12 -- Atoms</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Rutherford Scattering: Alpha Meets Nucleus</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 500 340" className="w-full">
            <line x1={10} y1={170} x2={240} y2={170} stroke="#334155" strokeWidth={1} strokeDasharray="4 6" />
            {[30, 90, 150].map((y) => (
              <g key={y}>
                <line x1={10} y1={y} x2={240} y2={y} stroke="#1e293b" strokeWidth={1} />
                <polygon points={`240,${y} 232,${y - 4} 232,${y + 4}`} fill="#334155" />
              </g>
            ))}
            <text x={14} y={22} fill="#64748b" fontSize={10} fontFamily="monospace">alpha beam, KE = {keMeV} MeV</text>
            <polyline points={path} fill="none" stroke="#f472b6" strokeWidth={2.5} />
            <circle cx={250} cy={170} r={Math.max(4, nucRadius * scale)} fill="#fbbf24" />
            <circle cx={250} cy={170} r={10} fill="none" stroke="#fbbf24" strokeWidth={1} strokeDasharray="3 3" />
            <text x={250} y={196} textAnchor="middle" fill="#fbbf24" fontSize={10} fontFamily="monospace">
              {target.name} nucleus, Z = {target.z}
            </text>
            <circle cx={rotated[0][0] * scale + 250} cy={170 - rotated[0][1] * scale} r={5} fill="#34d399" />
            <circle cx={rotated[120][0] * scale + 250} cy={170 - rotated[120][1] * scale} r={5} fill="#38bdf8" />
            <text x={rotated[120][0] * scale + 250 + 8} y={170 - rotated[120][1] * scale - 8} fill="#7dd3fc" fontSize={10} fontFamily="monospace">
              deflected {thetaDeg.toFixed(1)} deg
            </text>
            <line x1={250} y1={170} x2={rotated[60][0] * scale + 250} y2={170 - rotated[60][1] * scale} stroke="#475569" strokeWidth={1} />
            <text x={20} y={322} fill="#64748b" fontSize={10} fontFamily="monospace">
              b = {bFm} fm (impact parameter) &nbsp; r_min = {rMinFm.toFixed(0)} fm
            </text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">Head-on distance a = kZe^2/2KE</span><div className="text-amber-300 font-bold text-sm">{aFm.toFixed(1)} fm</div></div>
            <div><span className="text-slate-500">Closest approach (this b)</span><div className="text-pink-300 font-bold text-sm">{rMinFm.toFixed(1)} fm</div></div>
            <div><span className="text-slate-500">Nuclear radius 1.2 A^(1/3)</span><div className="text-emerald-300 font-bold text-sm">{nucRadius.toFixed(1)} fm</div></div>
            <div><span className="text-slate-500">Formula validity</span><div className={`font-bold text-sm ${valid ? 'text-emerald-300' : 'text-rose-400'}`}>{valid ? 'alpha stays outside nucleus: valid' : 'alpha hits nucleus: Rutherford model breaks'}</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {TARGETS.map((t, i) => (
                <button key={t.z} onClick={() => setTIdx(i)}
                  className={`py-2 rounded-xl text-xs font-bold ${tIdx === i ? 'bg-fuchsia-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                  {t.name} (Z={t.z})
                </button>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Alpha kinetic energy</span><span className="font-mono font-bold text-sky-400">{keMeV} MeV</span>
              </div>
              <input type="range" min={1} max={10} step={0.5} value={keMeV} aria-label="Alpha kinetic energy"
                onChange={(e) => setKeMeV(Number(e.target.value))} className="w-full accent-sky-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Impact parameter b</span><span className="font-mono font-bold text-emerald-400">{bFm} fm</span>
              </div>
              <input type="range" min={2} max={200} step={2} value={bFm} aria-label="Impact parameter"
                onChange={(e) => setBFm(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-fuchsia-800/60 p-4 text-xs font-mono space-y-1">
            <div className="text-fuchsia-300 font-bold">Master relations</div>
            <div className="text-slate-400">cot(theta/2) = 2 KE b / (k Z e^2) = b / a</div>
            <div className="text-slate-400">theta/2 = arctan(a / b) = <b className="text-pink-300">{((Math.atan2(aFm, bFm) * 180) / Math.PI).toFixed(1)} deg</b> --&gt; theta = {(2 * (Math.atan2(aFm, bFm) * 180) / Math.PI).toFixed(1)} deg</div>
            <div className="text-slate-500">Cross-check: hyperbola geometry gives {thetaDeg.toFixed(1)} deg. Match?</div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Only the tiny + nucleus deflects the alpha: at 5 MeV on gold the head-on closest
              approach is ~{aFm.toFixed(0)} fm, about 10^4 times smaller than the atom -- proof that
              nearly all mass and positive charge sit in a femtometre-scale core. The number of
              particles scattered beyond an angle falls extremely fast with b, which is exactly why
              1 in ~8000 bounced back in the original experiment.
            </p>
          </div>

          <div className="bg-fuchsia-950/40 rounded-2xl border border-fuchsia-800/50 p-4 text-xs">
            <p className="font-bold text-fuchsia-300 mb-1">What to try</p>
            <p>1. Make theta exactly 90 deg by sliding b to equal a. Confirm b = a at the 90-degree crossover for every target and energy.</p>
            <p>2. Double the KE at fixed b: what happens to theta? Verify it scales like 1/KE by reading both readouts.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_PhysicsAtomsSim;

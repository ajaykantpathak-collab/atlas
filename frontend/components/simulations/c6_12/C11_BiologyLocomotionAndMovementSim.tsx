'use client';

import React, { useState } from 'react';

/**
 * Class 11 Biology -- Locomotion and Movement
 * Sliding filament geometry: set the sarcomere length and see actin-myosin
 * overlap drive the classic length-tension curve; plus the biceps lever.
 * Self-contained: react + tailwind only.
 */

// Active tension model (Gordon et al style piecewise), normalized to 1
const tensionAt = (s: number) => {
  if (s < 1.27) return 0.1;
  if (s < 1.67) return (s - 1.27) / 0.4 * 0.9 + 0.1;
  if (s <= 2.25) return 1;
  if (s < 3.65) return Math.max(0, (3.65 - s) / 1.4);
  return 0;
};

export function C11_BiologyLocomotionAndMovementSim() {
  const [sarcomere, setSarcomere] = useState(2.2); // um
  const [loadKg, setLoadKg] = useState(10);
  const [insertCm, setInsertCm] = useState(5); // biceps insertion distance from elbow

  const halfS = sarcomere / 2;
  const THICK_HALF = 0.8; // myosin filament half-length
  const THIN = 1.0; // actin filament length
  const overlap = Math.max(0, Math.min(THIN, THICK_HALF + THIN - halfS));
  const tension = tensionAt(sarcomere);
  const maxTension = sarcomere >= 1.67 && sarcomere <= 2.25;

  const loadN = loadKg * 9.8;
  const handCm = 35; // load arm: elbow to hand
  const effortArm = Math.max(1, insertCm);
  const MA = effortArm / handCm;
  const forceNeeded = loadN / MA;

  // Length-tension curve
  const px = (s: number) => 55 + ((s - 1.2) / (4.0 - 1.2)) * 390;
  const py = (t: number) => 230 - t * 190;
  const curvePts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const s = 1.2 + (2.8 * i) / 120;
    curvePts.push(`${px(s)},${py(tensionAt(s))}`);
  }

  // Sarcomere drawing (scale 90 px per um, centered at 235)
  const S = 90;
  const cx = 235;
  const zL = cx - halfS * S;
  const zR = cx + halfS * S;
  const mLineL = cx - THICK_HALF * S;
  const mLineR = cx + THICK_HALF * S;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-orange-950/80 rounded-2xl border border-orange-700 font-mono">mu</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Class 11 -- Locomotion and Movement</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Sliding Filaments and the Muscle Lever</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 250" className="w-full">
            {/* Z lines, myosin (thick), actin (thin) */}
            <rect x={zL - 3} y={60} width={6} height={90} fill="#e2e8f0" />
            <rect x={zR - 3} y={60} width={6} height={90} fill="#e2e8f0" />
            <rect x={mLineL} y={85} width={mLineR - mLineL} height={34} fill="#f472b6" rx={4} />
            <text x={cx} y={107} textAnchor="middle" fill="#fff" fontSize={9} fontFamily="monospace">myosin</text>
            <rect x={zL} y={78} width={Math.max(0, Math.min(THIN, halfS)) * S} height={9} fill="#38bdf8" rx={3} />
            <rect x={zR - Math.max(0, Math.min(THIN, halfS)) * S} y={78} width={Math.max(0, Math.min(THIN, halfS)) * S} height={9} fill="#38bdf8" rx={3} />
            <rect x={zL} y={117} width={Math.max(0, Math.min(THIN, halfS)) * S} height={9} fill="#38bdf8" rx={3} />
            <rect x={zR - Math.max(0, Math.min(THIN, halfS)) * S} y={117} width={Math.max(0, Math.min(THIN, halfS)) * S} height={9} fill="#38bdf8" rx={3} />
            <text x={20} y={55} fill="#38bdf8" fontSize={10} fontFamily="monospace">actin (thin)</text>
            <text x={20} y={200} fill="#94a3b8" fontSize={10} fontFamily="monospace">Z line</text>
            <text x={zL + 4} y={172} fill="#6ee7b7" fontSize={10} fontFamily="monospace">sarcomere length {sarcomere.toFixed(2)} um</text>
            <text x={20} y={222} fill="#64748b" fontSize={10} fontFamily="monospace">
              overlap per half-sarcomere: {overlap.toFixed(2)} um of actin gripping myosin {maxTension ? '(OPTIMAL zone)' : ''}
            </text>
          </svg>

          <svg viewBox="0 0 470 250" className="w-full mt-1 bg-slate-950 rounded-xl border border-slate-800">
            <line x1={55} y1={230} x2={445} y2={230} stroke="#475569" strokeWidth={2} />
            <line x1={55} y1={230} x2={55} y2={20} stroke="#475569" strokeWidth={2} />
            <text x={250} y={246} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="monospace">sarcomere length (um)</text>
            <text x={16} y={135} fill="#64748b" fontSize={10} fontFamily="monospace" transform="rotate(-90 16 135)">active tension</text>
            <polyline points={curvePts.join(' ')} fill="none" stroke="#f472b6" strokeWidth={2.5} />
            <line x1={px(1.67)} y1={py(1)} x2={px(2.25)} y2={py(1)} stroke="#34d399" strokeWidth={1.5} strokeDasharray="4 3" />
            <circle cx={px(sarcomere)} cy={py(tension)} r={6} fill="#fbbf24" stroke="#fff" strokeWidth={1.5} />
            <text x={px(sarcomere) + 9} y={py(tension) - 8} fill="#fbbf24" fontSize={11} fontFamily="monospace">
              {(tension * 100).toFixed(0)}% max force
            </text>
          </svg>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Sarcomere length</span><span className="font-mono font-bold text-orange-400">{sarcomere.toFixed(2)} um</span>
              </div>
              <input type="range" min={1.3} max={3.8} step={0.05} value={sarcomere} aria-label="Sarcomere length"
                onChange={(e) => setSarcomere(Number(e.target.value))} className="w-full accent-orange-500" />
            </div>
            <div className="grid grid-cols-3 gap-1">
              {[
                { label: 'Contracted 1.6', v: 1.6 },
                { label: 'Optimal 2.2', v: 2.2 },
                { label: 'Stretched 3.6', v: 3.6 },
              ].map((p) => (
                <button key={p.label} onClick={() => setSarcomere(p.v)}
                  className={`py-1 rounded-lg text-[10px] font-bold ${sarcomere === p.v ? 'bg-orange-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <p className="text-[11px] font-bold text-emerald-300">Forearm lever (class 3: effort in the middle)</p>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Weight held in hand</span><span className="font-mono font-bold text-emerald-400">{loadKg} kg</span>
              </div>
              <input type="range" min={1} max={30} step={1} value={loadKg} aria-label="Load"
                onChange={(e) => setLoadKg(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Biceps insertion from elbow</span><span className="font-mono font-bold text-gold-400">{insertCm} cm</span>
              </div>
              <input type="range" min={2} max={10} step={1} value={insertCm} aria-label="Insertion distance"
                onChange={(e) => setInsertCm(Number(e.target.value))} className="w-full accent-gold-500" />
            </div>
            <div className="text-xs font-mono text-slate-300 space-y-1 pt-1">
              <div>Mechanical advantage = {effortArm}/{handCm} = <b className="text-amber-300">{MA.toFixed(2)}</b> (always &lt; 1)</div>
              <div>Muscle force = {loadN.toFixed(0)} N / {MA.toFixed(2)} = <b className="text-pink-300">{forceNeeded.toFixed(0)} N</b> to hold {loadKg} kg</div>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Contraction is geometry: myosin heads walk along actin, Z-lines approach, the sarcomere
              shortens -- but force depends on HOW MANY heads can grip. Over-stretch and the filaments
              barely touch; over-shorten and thin filaments collide. The body has the same problem in
              every joint: biceps inserts only ~5 cm from the elbow, so it loses mechanical advantage
              but gains speed and range -- the trade-off of a class 3 lever.
            </p>
          </div>

          <div className="bg-orange-950/40 rounded-2xl border border-orange-800/50 p-4 text-xs">
            <p className="font-bold text-orange-300 mb-1">What to try</p>
            <p>1. Find both sarcomere lengths where force drops to half maximum, and explain the two different mechanisms (no grip vs filament collision).</p>
            <p>2. At 20 kg in the hand, compute the biceps force by hand for a 5 cm insertion -- why does the muscle exert far more than the load weighs?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_BiologyLocomotionAndMovementSim;

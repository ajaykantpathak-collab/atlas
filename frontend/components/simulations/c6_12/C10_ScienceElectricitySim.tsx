'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Science -- Electricity
 * Ohm's law bench: sweep V and R, toggle series/parallel, and watch
 * current, power and bulb brightness obey V = IR. Self-contained.
 */

const PI = Math.PI;

export function C10_ScienceElectricitySim() {
  const [voltage, setVoltage] = useState(6);
  const [r1, setR1] = useState(6);
  const [r2, setR2] = useState(12);
  const [mode, setMode] = useState<'series' | 'parallel'>('series');

  const req = mode === 'series' ? r1 + r2 : (r1 * r2) / (r1 + r2);
  const current = voltage / req;
  const power = voltage * current;
  const glow = Math.min(1, power / 10); // bulb glows fully at 10 W

  // needle angles for meters
  const ammA = -60 + Math.min(current / 2, 1) * 120;
  const voltA = -60 + (voltage / 12) * 120;

  const maxSeriesI = 12 / Math.max(req, 1);

  const drop1 = current * r1;
  const drop2 = current * r2;
  const i1 = mode === 'parallel' ? voltage / r1 : current;
  const i2 = mode === 'parallel' ? voltage / r2 : 0;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-yellow-950/80 rounded-2xl border border-yellow-700">💡</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">Class 10 -- Electricity</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Ohm&apos;s Law Bench: V = IR, Live</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 320" className="w-full">
            {/* circuit rectangle */}
            <rect x={60} y={60} width={340} height={200} rx={12} fill="none"
              stroke={current > 0.02 ? '#fbbf24' : '#475569'} strokeWidth={3}
              className="transition-colors duration-300" />
            {/* battery */}
            <rect x={205} y={44} width={50} height={18} rx={3} fill="#1e293b" stroke="#facc15" strokeWidth={2} />
            <text x={230} y={38} textAnchor="middle" fontSize={11} fill="#facc15" fontFamily="monospace">{voltage} V</text>
            {/* resistor 1 (top) */}
            <rect x={110} y={52} width={70} height={16} rx={3} fill="#1e293b" stroke="#38bdf8" strokeWidth={2} />
            <text x={145} y={30} textAnchor="middle" fontSize={10} fill="#38bdf8" fontFamily="monospace">R1 = {r1} ohm</text>
            {/* resistor 2 */}
            {mode === 'series' ? (
              <g>
                <rect x={300} y={52} width={70} height={16} rx={3} fill="#1e293b" stroke="#f472b6" strokeWidth={2} />
                <text x={335} y={30} textAnchor="middle" fontSize={10} fill="#f472b6" fontFamily="monospace">R2 = {r2} ohm</text>
              </g>
            ) : (
              <g>
                <rect x={52} y={130} width={16} height={70} rx={3} fill="#1e293b" stroke="#f472b6" strokeWidth={2} />
                <text x={40} y={170} textAnchor="end" fontSize={10} fill="#f472b6" fontFamily="monospace">R2 = {r2}</text>
                <line x1={110} y1={140} x2={60} y2={140} stroke="#475569" strokeWidth={3} />
                <line x1={60} y1={190} x2={110} y2={190} stroke="#475569" strokeWidth={3} />
              </g>
            )}
            {/* bulb on right */}
            <circle cx={400} cy={160} r={24} fill={`rgba(251,191,36,${0.15 + glow * 0.85})`}
              stroke="#fbbf24" strokeWidth={2.5} className="transition-all duration-300" />
            <line x1={388} y1={148} x2={412} y2={172} stroke="#92400e" strokeWidth={2} />
            <line x1={412} y1={148} x2={388} y2={172} stroke="#92400e" strokeWidth={2} />
            {/* moving electrons */}
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} r={4} fill={current > 0.02 ? '#22d3ee' : 'transparent'} opacity={0.2 + glow * 0.8}>
                <animateMotion dur={`${Math.max(0.8, 4 / Math.max(current, 0.05))}s`} repeatCount="indefinite"
                  path={mode === 'series'
                    ? 'M145,60 L230,60 M230,60 L335,60 L400,60 L400,160 L400,260 L230,260 L145,260 L60,260 L60,160 L60,60 L145,60'
                    : 'M145,60 L230,60 L400,60 L400,160 L400,260 L230,260 L145,260 L60,260 L60,190 M60,140 L60,60 L145,60'} />
              </circle>
            ))}
            {/* meters */}
            <g>
              <circle cx={145} cy={200} r={34} fill="#0f172a" stroke="#64748b" strokeWidth={2} />
              <line x1={145} y1={200} x2={145 + 26 * Math.cos((ammA * PI) / 180)} y2={200 + 26 * Math.sin((ammA * PI) / 180)}
                stroke="#22d3ee" strokeWidth={2.5} />
              <text x={145} y={222} textAnchor="middle" fontSize={9} fill="#94a3b8">A</text>
              <text x={145} y={185} textAnchor="middle" fontSize={11} fill="#22d3ee" fontFamily="monospace">{(current * 1000).toFixed(0)} mA</text>
              <circle cx={335} cy={200} r={34} fill="#0f172a" stroke="#64748b" strokeWidth={2} />
              <line x1={335} y1={200} x2={335 + 26 * Math.cos((voltA * PI) / 180)} y2={200 + 26 * Math.sin((voltA * PI) / 180)}
                stroke="#facc15" strokeWidth={2.5} />
              <text x={335} y={222} textAnchor="middle" fontSize={9} fill="#94a3b8">V</text>
              <text x={335} y={185} textAnchor="middle" fontSize={11} fill="#facc15" fontFamily="monospace">{voltage.toFixed(1)} V</text>
            </g>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">R equivalent</p>
              <p className="font-mono font-bold text-slate-200">{req.toFixed(1)} ohm</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">I = V/R</p>
              <p className="font-mono font-bold text-gold-300">{(current * 1000).toFixed(0)} mA</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">P = V x I</p>
              <p className="font-mono font-bold text-amber-300">{power.toFixed(2)} W</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setMode('series')}
                className={`py-2 rounded-xl text-xs font-bold ${mode === 'series' ? 'bg-yellow-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Series
              </button>
              <button onClick={() => setMode('parallel')}
                className={`py-2 rounded-xl text-xs font-bold ${mode === 'parallel' ? 'bg-yellow-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Parallel
              </button>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Battery voltage</span><span className="font-mono font-bold text-yellow-400">{voltage} V</span>
              </div>
              <input type="range" min={0} max={12} step={0.5} value={voltage} aria-label="voltage"
                onChange={(e) => setVoltage(Number(e.target.value))} className="w-full accent-yellow-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Resistor R1</span><span className="font-mono font-bold text-gold-400">{r1} ohm</span>
              </div>
              <input type="range" min={1} max={50} value={r1} aria-label="resistance one"
                onChange={(e) => setR1(Number(e.target.value))} className="w-full accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Resistor R2</span><span className="font-mono font-bold text-pink-400">{r2} ohm</span>
              </div>
              <input type="range" min={1} max={50} value={r2} aria-label="resistance two"
                onChange={(e) => setR2(Number(e.target.value))} className="w-full accent-pink-500" />
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-yellow-800/60 p-4 text-xs font-mono space-y-1">
            <p className="text-slate-300">
              {mode === 'series'
                ? `Req = R1+R2 = ${req} ohm ; V splits: ${drop1.toFixed(1)} V + ${drop2.toFixed(1)} V`
                : `Req = R1R2/(R1+R2) = ${req.toFixed(2)} ohm ; I splits: ${(i1 * 1000).toFixed(0)} mA + ${(i2 * 1000).toFixed(0)} mA`}
            </p>
            <p className="text-slate-500">
              {mode === 'series'
                ? 'Same current through both; voltages add up (Kirchhoff check: ' + (drop1 + drop2).toFixed(1) + ' V = ' + voltage + ' V)'
                : 'Same voltage across both; branch currents add to ' + ((i1 + i2) * 1000).toFixed(0) + ' mA'}
            </p>
            <p className="text-slate-600">max safe I at 12 V: {(maxSeriesI * 1000).toFixed(0)} mA</p>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Ohm: current is proportional to voltage at fixed resistance. Series adds resistances (one
              shared lane), parallel adds pathways so R_eq drops below the smallest R -- that is why home
              appliances wire in parallel and why the bulb here brightens with P = V x I.
            </p>
          </div>

          <div className="bg-yellow-950/40 rounded-2xl border border-yellow-800/50 p-4 text-xs">
            <p className="font-bold text-yellow-300 mb-1">What to try</p>
            <p>1. Make R1 = R2 = 10 ohm. Compare series vs parallel current -- predict the ratio 1:4 first.</p>
            <p>2. Find the R1:R2 pair in series that gives exactly 3 ohm... impossible with integers? Prove why (sum of two positive integers is never 3 with both above 0... try 1+2!).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C10_ScienceElectricitySim;

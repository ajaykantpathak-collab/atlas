'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Class 11 Biology -- Body Fluids and Circulation
 * Cardiac output CO = HR x SV with a beating heart and a synced ECG trace
 * (P-QRS-T), comparing rest, exercise and athlete rhythms. Self-contained.
 */

const RHYTHMS = [
  { name: 'Rest', hr: 72, sv: 70 },
  { name: 'Exercise', hr: 150, sv: 110 },
  { name: 'Athlete rest', hr: 50, sv: 100 },
];

export function C11_BiologyBodyFluidsAndCirculationSim() {
  const [hr, setHr] = useState(72);
  const [sv, setSv] = useState(70);
  const [phase, setPhase] = useState(0); // 0..1 within the cardiac cycle
  const rafRef = useRef<number | null>(null);

  const co = (hr * sv) / 1000; // L/min
  const edv = sv + 55; // rough ESV 55 mL
  const ef = (sv / edv) * 100; // ejection fraction %
  const beatSec = 60 / hr;

  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setPhase((p) => (p + dt / Math.max(0.3, beatSec * 1.6)) % 1); // wall-clock slowed 1.6x
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [beatSec]);

  // ECG voltage in one cycle (piecewise P-QRS-T)
  const ecg = (t: number) => {
    if (t < 0.12) return 0.16 * Math.sin((t / 0.12) * Math.PI); // P wave
    if (t < 0.18) return 0; // PR segment
    if (t < 0.21) return -0.25 * ((t - 0.18) / 0.03); // Q dip
    if (t < 0.25) return 1.0 * Math.sin(((t - 0.21) / 0.04) * Math.PI * 0.9); // R spike
    if (t < 0.29) return -0.35 * Math.sin(((t - 0.25) / 0.04) * Math.PI); // S dip
    if (t < 0.40) return 0; // ST segment
    if (t < 0.56) return 0.3 * Math.sin(((t - 0.40) / 0.16) * Math.PI); // T wave
    return 0;
  };
  const systole = phase < 0.35;
  const trace: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const cyc = (i / 240) * 3; // three beats
    trace.push(`${20 + (i / 240) * 440},${110 - ecg(cyc % 1) * 42}`);
  }
  const cursorX = 20 + phase * (440 / 3);

  // heart cross-section scaling
  const ventricleR = systole ? 34 - 10 * Math.sin(phase / 0.35 * Math.PI) : 24 + 10 * Math.sin(((phase - 0.35) / 0.65) * Math.PI);
  const atriumR = systole ? 17 + 5 * Math.sin(phase / 0.35 * Math.PI) : 22 - 5 * Math.sin(((phase - 0.35) / 0.65) * Math.PI);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-red-950/80 rounded-2xl border border-red-700 font-mono">HB</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-400">Class 11 -- Body Fluids and Circulation</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Cardiac Output and the Living ECG</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 480 230" className="w-full">
            <polyline points={trace.join(' ')} fill="none" stroke="#f472b6" strokeWidth={2} />
            <line x1={cursorX} y1={15} x2={cursorX} y2={150} stroke="#fbbf24" strokeWidth={1.5} strokeDasharray="3 3" />
            <text x={22} y={30} fill="#f9a8d4" fontSize={10} fontFamily="monospace">ECG: lead II style (P, QRS, T repeated)</text>
            <text x={cursorX + 5} y={28} fill="#fbbf24" fontSize={10} fontFamily="monospace">{(phase * 100).toFixed(0)}% of cycle</text>
            <text x={22} y={165} fill={systole ? '#f87171' : '#64748b'} fontSize={11} fontWeight="bold" fontFamily="monospace">
              {systole ? 'SYSTOLE: ventricles contracting, blood ejected' : 'DIASTOLE: chambers filling, semilunar valves shut'}
            </text>
            {/* beating heart schematic */}
            <g transform="translate(70,195)">
              <ellipse cx={0} cy={0} rx={atriumR + 8} ry={atriumR} fill="#7f1d1d" stroke="#fca5a5" strokeWidth={1.5} />
              <text x={0} y={4} textAnchor="middle" fontSize={9} fill="#fecaca" fontFamily="monospace">atria</text>
              <ellipse cx={62} cy={2} rx={ventricleR + 10} ry={ventricleR} fill="#991b1b" stroke="#fca5a5" strokeWidth={1.5} />
              <text x={62} y={4} textAnchor="middle" fontSize={9} fill="#fecaca" fontFamily="monospace">ventricles</text>
              <line x1={30} y1={-18} x2={30} y2={18} stroke="#fca5a5" strokeWidth={1} opacity={0.6} />
            </g>
            <text x={210} y={192} fill="#fca5a5" fontSize={10} fontFamily="monospace">
              stroke volume leaving now: {systole ? (sv * Math.sin((phase / 0.35) * Math.PI)).toFixed(0) : 0} mL
            </text>
            <text x={210} y={208} fill="#64748b" fontSize={10} fontFamily="monospace">
              beat every {beatSec.toFixed(2)} s -- heart rate {hr} bpm
            </text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-3 gap-2">
            <div><span className="text-slate-500">Cardiac output</span><div className="text-red-300 font-bold text-sm">{co.toFixed(2)} L/min</div></div>
            <div><span className="text-slate-500">Ejection fraction</span><div className="text-amber-300 font-bold text-sm">{ef.toFixed(0)} % (healthy 55-70)</div></div>
            <div><span className="text-slate-500">Day&apos;s output at this rate</span><div className="text-sky-300 font-bold text-sm">{(co * 1440 / 1000).toFixed(1)} x 10^3 L/day</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-3 gap-1.5">
              {RHYTHMS.map((r) => (
                <button key={r.name} onClick={() => { setHr(r.hr); setSv(r.sv); }}
                  className={`py-2 rounded-xl text-[11px] font-bold ${hr === r.hr && sv === r.sv ? 'bg-red-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                  {r.name}
                </button>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Heart rate (SA node)</span><span className="font-mono font-bold text-red-400">{hr} bpm</span>
              </div>
              <input type="range" min={40} max={200} step={1} value={hr} aria-label="Heart rate"
                onChange={(e) => setHr(Number(e.target.value))} className="w-full accent-red-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Stroke volume</span><span className="font-mono font-bold text-pink-400">{sv} mL</span>
              </div>
              <input type="range" min={30} max={120} step={1} value={sv} aria-label="Stroke volume"
                onChange={(e) => setSv(Number(e.target.value))} className="w-full accent-pink-500" />
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              CO = HR x SV = {hr} x {sv} mL = <b className="text-red-300">{co.toFixed(2)} L/min</b>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-red-800/60 p-4 text-xs font-mono space-y-1">
            <div className="text-red-300 font-bold">Reading the ECG</div>
            <div className="text-slate-400">P wave: atrial depolarisation (atrial systole)</div>
            <div className="text-slate-400">QRS: ventricular depolarisation -- triggers systole</div>
            <div className="text-slate-400">T wave: ventricular repolarisation (relaxation begins)</div>
            <div className="text-slate-500">QRS is huge simply because the ventricles are the biggest muscle mass.</div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Cardiac output is the double product: CO = HR x SV. Exercise raises BOTH (up to 4-5x
              total, roughly 20-25 L/min in elite athletes). Notice SV cannot rise forever: at very
              high HR the filling window (diastole) shrinks, which is why the rhythm presets trade
              rate against volume.
            </p>
          </div>

          <div className="bg-red-950/40 rounded-2xl border border-red-800/50 p-4 text-xs">
            <p className="font-bold text-red-300 mb-1">What to try</p>
            <p>1. Find the HR at which a full ECG no longer fits between beats -- what is the shortest plausible diastole for filling?</p>
            <p>2. An athlete at 50 bpm matches the resting 5 L/min with a bigger SV. Which slider does the heart actually train: rate or volume?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_BiologyBodyFluidsAndCirculationSim;

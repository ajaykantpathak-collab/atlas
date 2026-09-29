'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Class 12 Chemistry -- Biomolecules
 * ONE concept: invert sugar -- why hydrolysing sucrose FLIPS the sign of
 * rotation. Sucrose is dextrorotatory (+66.5 deg); hydrolysis releases
 * glucose (+52.7 deg) and fructose (-92.4 deg) in EQUAL MASS, so fructose's
 * stronger laevo-rotation wins and [alpha] falls from +66.5 deg to about
 * -20.9 deg, crossing zero at 76.1 % hydrolysis. react + tailwind only.
 */

// ─── Knowledge-graph node wiring ───
const NODE_C12_CHEM_082 = 'c12_chem_082'; // Biomolecules - carbohydrates (sucrose, invert sugar)
export const ALL_NODE_IDS = [NODE_C12_CHEM_082];

const R = 8.314; // J mol^-1 K^-1
const ROT = { sucrose: 66.5, glucose: 52.7, fructose: -92.4 }; // deg mL g^-1 dm^-1
const MASS = { sucrose: 342, glucose: 180, fructose: 180 }; // g per mol
const EA_ACID = 108000; // J/mol, acid-catalysed inversion
const EA_ENZYME = 45000; // J/mol, invertase
const K_REF_ACID = 5.0e-5; // s^-1 at 298 K with 1 M H+
const K_REF_ENZYME = 2.0e-3; // s^-1 at 298 K
const ARR = (ea: number, T: number) => Math.exp(-(ea / R) * (1 / T - 1 / 298.15));

// mixture rotation per gram of original sucrose (fixed tube length + volume)
const alphaMix = (x: number) =>
  (MASS.sucrose * ROT.sucrose * (1 - x) + MASS.glucose * ROT.glucose * x + MASS.fructose * ROT.fructose * x) / MASS.sucrose;
// mole fraction hydrolysed at which the mixture's rotation reads exactly zero
const ZERO_X = (MASS.sucrose * ROT.sucrose) / (MASS.sucrose * ROT.sucrose - MASS.glucose * ROT.glucose - MASS.fructose * ROT.fructose);
const END_T = (k: number) => 4.605 / k; // 99.0 % hydrolysed

const fmt = (s: number) => (s < 120 ? `${s.toFixed(0)} s` : s < 7200 ? `${(s / 60).toFixed(1)} min` : `${(s / 3600).toFixed(1)} h`);

export function C12_ChemistryBiomoleculesSim() {
  const [acidM, setAcidM] = useState(1.0);
  const [tempC, setTempC] = useState(25);
  const [enzyme, setEnzyme] = useState(false);
  const [running, setRunning] = useState(false);
  const [timeSec, setTimeSec] = useState(0);
  const raf = useRef(0);
  const warp = useRef(2400);

  const T = tempC + 273.15;
  const denatured = enzyme && tempC > 45;
  const k = denatured
    ? 1.0e-7
    : enzyme
    ? K_REF_ENZYME * ARR(EA_ENZYME, T)
    : K_REF_ACID * acidM * ARR(EA_ACID, T);

  const x = Math.min(1, 1 - Math.exp(-k * timeSec));
  const alpha = alphaMix(x);
  const halfLife = Math.LN2 / k;
  const sign = Math.abs(alpha) < 0.5 ? '0 deg -- optical crossover' : alpha > 0 ? 'dextrorotatory (+)' : 'laevorotatory (-)';

  useEffect(() => {
    if (!running) return;
    warp.current = Math.max(60, END_T(k) / 12); // freeze display speed at run start
    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      setTimeSec((prev) => {
        const rem = Math.max(0.02, Math.exp(-k * prev)); // keep fast runs watchable
        return Math.min(prev + Math.max(warp.current * dt, 0.006 / (k * rem)), END_T(k));
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [running, k]);

  useEffect(() => {
    if (running && timeSec >= END_T(k)) setRunning(false);
  }, [running, timeSec, k]);

  const reset = () => {
    setRunning(false);
    setTimeSec(0);
  };

  const mSuc = (MASS.sucrose * (1 - x) * 100) / (MASS.sucrose + 18 * x);
  const mGlu = (MASS.glucose * x * 100) / (MASS.sucrose + 18 * x);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700">🍬</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 12 Chemistry -- Biomolecules</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Invert Sugar: Watching the Polarimeter Needle Flip Sign</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3 space-y-3">
          <svg viewBox="0 0 320 210" className="w-full">
            <rect x={0} y={0} width={320} height={210} rx={10} fill="#0b1220" />
            <circle cx={22} cy={100} r={9} fill="#fbbf24" />
            <text x={22} y={124} fontSize={9} fill="#94a3b8" textAnchor="middle">light</text>
            {[78, 92, 108, 122].map((y) => (
              <line key={y} x1={34} y1={100} x2={96} y2={y} stroke="#fbbf24" strokeWidth={1} opacity={0.5} />
            ))}
            <rect x={96} y={72} width={90} height={56} rx={8} fill="#1e293b" stroke="#64748b" />
            <text x={141} y={143} fontSize={9} fill="#94a3b8" textAnchor="middle">sugar solution tube</text>
            <g transform={`rotate(${Math.max(-100, Math.min(100, alpha))} 248 100)`} className="transition-transform duration-100">
              <polygon points="248,100 244,106 248,38 252,106" fill={alpha > 0.5 ? '#fbbf24' : alpha < -0.5 ? '#38bdf8' : '#e2e8f0'} />
            </g>
            <circle cx={248} cy={100} r={5} fill="#94a3b8" />
            {[-90, -60, -30, 0, 30, 60, 90].map((a) => {
              const rad = ((a - 90) * Math.PI) / 180;
              return (
                <g key={a}>
                  <line x1={248 + 66 * Math.cos(rad)} y1={100 + 66 * Math.sin(rad)} x2={248 + 74 * Math.cos(rad)} y2={100 + 74 * Math.sin(rad)} stroke="#475569" strokeWidth={2} />
                  {a % 60 === 0 && (
                    <text x={248 + 84 * Math.cos(rad)} y={100 + 84 * Math.sin(rad) + 3} fontSize={8} fill={a === 0 ? '#34d399' : '#64748b'} textAnchor="middle">
                      {a}°
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          <div className="flex h-6 rounded-lg overflow-hidden border border-slate-700 text-[10px] font-bold text-slate-950">
            <div className="bg-slate-400 flex items-center justify-center transition-all duration-150" style={{ width: `${mSuc}%` }}>{mSuc > 12 ? `sucrose ${mSuc.toFixed(0)}%` : ''}</div>
            <div className="bg-amber-400 flex items-center justify-center transition-all duration-150" style={{ width: `${mGlu}%` }}>{mGlu > 12 ? `glucose` : ''}</div>
            <div className="bg-gold-400 flex items-center justify-center transition-all duration-150" style={{ width: `${100 - mSuc - mGlu}%` }}>{100 - mSuc - mGlu > 12 ? `fructose` : ''}</div>
          </div>

          <div className="flex h-4 rounded-full border border-slate-700 relative">
            <div className="absolute inset-y-0 left-0 rounded-l-full bg-gradient-to-r from-amber-500/70 to-rose-500/70 transition-all duration-150" style={{ width: '76.1%' }} />
            <div className="absolute inset-y-0 left-[76.1%] right-0 rounded-r-full bg-gradient-to-r from-gold-500/70 to-gold-500/70" />
            <div className="absolute inset-y-[-4px] w-0.5 bg-emerald-400 left-[76.1%]" />
            <div className="absolute inset-y-[-2px] w-1 rounded bg-white transition-all duration-150" style={{ left: `calc(${(x * 100).toFixed(1)}% - 2px)` }} />
          </div>
          <p className="text-[10px] text-slate-500 -mt-1">hydrolysis progress: zero-rotation crossover at 76.1 % (green line)</p>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800 col-span-2">
              <p className="text-[10px] text-slate-500">Mixture rotation [α]<sub>D</sub></p>
              <p className={`font-mono text-xl font-bold ${alpha > 0.5 ? 'text-amber-300' : alpha < -0.5 ? 'text-gold-300' : 'text-emerald-300'}`}>{alpha >= 0 ? '+' : ''}{alpha.toFixed(1)}°</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Sign</p>
              <p className="font-mono font-bold text-slate-200 text-[11px] leading-tight mt-1">{sign}</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Hydrolysed</p>
              <p className="font-mono font-bold text-gold-300">{(x * 100).toFixed(1)} %</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Half-life</p>
              <p className="font-mono font-bold text-emerald-300">{fmt(halfLife)}</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Reaction clock</p>
              <p className="font-mono font-bold text-slate-200">{fmt(timeSec)}</p>
            </div>
          </div>
          <p className="text-[10px] text-slate-500">k = {k.toExponential(1)} s⁻¹ (first-order in sucrose) · fully inverted end point ≈ −20.9°</p>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Catalyst</p>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setEnzyme(false)} className={`min-h-11 rounded-xl text-xs font-bold ${!enzyme ? 'bg-gold-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>Acid (H⁺)</button>
                <button onClick={() => setEnzyme(true)} className={`min-h-11 rounded-xl text-xs font-bold ${enzyme ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>Invertase</button>
              </div>
              {denatured && <p className="text-[10px] text-rose-400 mt-1">Above 45 °C the enzyme is denatured -- its catalysis is dead.</p>}
            </div>
            <div className={enzyme ? 'opacity-40' : ''}>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Acid concentration</span>
                <span className="font-mono font-bold text-gold-400">{acidM.toFixed(1)} mol/L</span>
              </div>
              <input type="range" min={0.1} max={2} step={0.1} value={acidM} aria-label="acid concentration" disabled={enzyme}
                onChange={(e) => setAcidM(Number(e.target.value))} className="w-full min-h-11 accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Temperature</span>
                <span className="font-mono font-bold text-amber-400">{tempC} °C</span>
              </div>
              <input type="range" min={15} max={100} step={1} value={tempC} aria-label="temperature"
                onChange={(e) => setTempC(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setRunning((v) => !v)} className="min-h-11 rounded-xl text-xs font-bold bg-amber-500 text-slate-950">
                {running ? 'Pause' : timeSec > 0 ? 'Resume' : 'Start hydrolysis'}
              </button>
              <button onClick={reset} className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;The mixture turns optically INACTIVE at zero rotation.&quot; No -- nothing stops there. Equal masses of glucose
              (+52.7°) and fructose (−92.4°) are released, and fructose is the stronger rotator, so the net rotation simply keeps
              sliding past zero until invert sugar settles near −20.9°. The needle never stops mid-way; it INVERTS.
            </p>
          </div>

          <div className="bg-amber-950/40 rounded-2xl border border-amber-800/50 p-4 text-xs">
            <p className="font-bold text-amber-300 mb-1">What to try</p>
            <p>1. Start hydrolysis at 25 °C with 1 M acid, then pause the moment the needle crosses 0°. What % does the readout show -- and why is it 76 %, not 50 %?</p>
            <p>2. Run Invertase at 37 °C against 1 M acid at 25 °C and compare half-lives. Now slide the enzyme to 60 °C -- why does the better catalyst suddenly stop?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_ChemistryBiomoleculesSim;

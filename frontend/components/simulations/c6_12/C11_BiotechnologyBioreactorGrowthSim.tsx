'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

// ─── GROWTH KINETICS: logistic growth, rate set by temperature, ceiling set by nutrient ───
const HOURS = 36;

export function C11_BiotechnologyBioreactorGrowthSim() {
  const [temp, setTemp] = useState(37);
  const [nutrient, setNutrient] = useState(70);
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(true);
  const rafRef = useRef<number>(0);

  // Specific growth rate peaks at 37 deg C (E. coli optimum) and falls off either side
  const r = 0.9 * Math.exp(-((temp - 37) ** 2) / 60);
  const lag = 4 + Math.abs(temp - 37) * 0.35; // poor temperature = longer adaptation
  const K = 1.2 * (nutrient / 100); // carrying capacity from available substrate

  const odAt = (h: number) => (h <= 0 ? 0.02 : Math.max(0.02, (0.02 + K) / (1 + Math.exp(-r * (h - lag))) - 0.02 * Math.exp(-r * (h - lag)) + 0.0));

  const curve = useMemo(() => {
    const pts: number[] = [];
    for (let h = 0; h <= HOURS; h++) pts.push(Math.min(odAt(h), K + 0.005));
    return pts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [r, lag, K]);

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      setT((v) => (v >= HOURS ? 0 : v + 0.12));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  const odNow = curve[Math.round(Math.min(t, HOURS))] || 0.02;
  const phase =
    t < lag - 1 ? { name: 'Lag phase', color: '#fbbf24', note: 'cells adjust, make enzymes, do NOT divide much yet' }
    : odNow < 0.9 * K && t >= lag ? { name: 'Log (exponential) phase', color: '#34d399', note: 'binary fission at maximum rate -- OD doubles in steady beats' }
    : { name: 'Stationary phase', color: '#38bdf8', note: 'nutrient depletion + waste build-up: deaths balance births' };

  const sx = (h: number) => 30 + (h / HOURS) * 420;
  const sy = (v: number) => 210 - (v / 1.25) * 180;
  const path = curve.map((v, i) => `${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(' L');

  const reset = () => {
    setTemp(37);
    setNutrient(70);
    setT(0);
    setRunning(true);
  };

  const doublings = odNow > 0.02 ? Math.log2(odNow / 0.02) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">CBSE Class 11 Biotechnology - Basic Processes</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Bioreactor Growth Curve Console</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full font-mono" style={{ backgroundColor: phase.name.includes('Lag') ? '#78350f' : phase.name.includes('Log') ? '#064e3b' : '#0c4a6e', borderColor: phase.color, color: phase.color }}>
          {phase.name}
        </span>
      </header>

      {/* CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Bioreactor temperature</span>
            <span className="text-rose-300 font-mono font-bold">{temp} deg C</span>
          </label>
          <input type="range" min={20} max={45} step={1} value={temp} aria-label="bioreactor temperature celsius"
            onChange={(e) => setTemp(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-rose-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Nutrient charge</span>
            <span className="text-emerald-300 font-mono font-bold">{nutrient} %</span>
          </label>
          <input type="range" min={20} max={100} step={5} value={nutrient} aria-label="nutrient charge percent"
            onChange={(e) => setNutrient(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-emerald-500" />
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={() => setRunning(!running)} className={`min-h-11 px-3 rounded-xl text-xs font-bold border ${running ? 'bg-amber-950/60 border-amber-700 text-amber-300' : 'bg-emerald-600 border-emerald-500 text-white'}`}>
            {running ? 'Pause culture' : 'Resume culture'}
          </button>
          <button onClick={reset} className="min-h-11 px-3 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">Reset run</button>
        </div>
      </div>

      {/* GROWTH CURVE */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 mb-4">
        <svg viewBox="0 0 470 230" className="w-full h-56 md:h-64" preserveAspectRatio="xMidYMid meet">
          <line x1="30" y1={sy(K)} x2="450" y2={sy(K)} stroke="#334155" strokeDasharray="5 4" />
          <text x="446" y={sy(K) - 5} fill="#64748b" fontSize="9" textAnchor="end">carrying capacity OD {K.toFixed(2)}</text>
          <path d={'M' + path} fill="none" stroke="#34d399" strokeWidth="3" />
          <line x1={sx(t)} y1="20" x2={sx(t)} y2="210" stroke="#fbbf24" strokeWidth="1.5" />
          <circle cx={sx(t)} cy={sy(odNow)} r="6" fill={phase.color} stroke="#0f172a" strokeWidth="2" />
          <text x="452" y="226" fill="#64748b" fontSize="10" textAnchor="end">{HOURS} h</text>
          <text x="32" y="226" fill="#64748b" fontSize="10">culture time (hours), OD measured at 600 nm</text>
        </svg>
      </div>

      {/* LIVE READOUT */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Culture clock</p>
          <p className="text-lg font-extrabold text-amber-300 font-mono">{t.toFixed(1)} h</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-emerald-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">OD (cell density)</p>
          <p className="text-lg font-extrabold text-emerald-300 font-mono">{odNow.toFixed(3)}</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Cells per mL</p>
          <p className="text-lg font-extrabold text-gold-300 font-mono">{(odNow * 8e8).toExponential(1)}</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Generations passed</p>
          <p className="text-lg font-extrabold text-gold-300 font-mono">{doublings.toFixed(1)}</p>
        </div>
      </div>
      <p className="text-xs p-3 rounded-xl bg-slate-900 border border-slate-800 mb-3" style={{ color: phase.color }}>
        {phase.note}. {temp !== 37 && <>Running at {temp} deg C costs growth rate: E. coli enzymes are tuned to 37 deg C.</>}
      </p>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-3">
        <p>
          <span className="font-bold text-emerald-300">Big idea:</span> a bioreactor is a controlled environment that keeps cells in the
          LOG phase as long as possible -- that is where biomass and products accumulate fastest.
          <span className="font-bold text-amber-300"> Misconception killer:</span> bacteria do not grow forever; the flat top of the
          curve is starvation chemistry, not laziness.
        </p>
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Set temperature to 20 deg C and 37 deg C with the same nutrient charge -- compare when the log phase begins and how steep it is.</p>
        <p className="mt-1">2. Charge the reactor with only 20% nutrient. Why does the curve flatten early, and what would a biotechnologist add to restart growth?</p>
      </footer>
    </div>
  );
}

export default C11_BiotechnologyBioreactorGrowthSim;

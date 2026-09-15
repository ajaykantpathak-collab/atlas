'use client';

import React, { useEffect, useRef, useState } from 'react';

// ─── KIDNEY NUMERICS: urine output = GFR x (1 - fraction reabsorbed) ───
export function C11_BiologyExcretoryNephronSim() {
  const [gfr, setGfr] = useState(125);
  const [reabs, setReabs] = useState(99.0);
  const [adh, setAdh] = useState(true);
  const [diabetes, setDiabetes] = useState(false);
  const [t, setT] = useState(0);
  const rafRef = useRef<number>(0);

  const effReabs = Math.min(99.7, adh ? Math.max(reabs, 99.3) : reabs);
  const filtratePerDay = (gfr * 1440) / 1000; // L/day
  const urinePerMin = gfr * (1 - effReabs / 100); // mL/min
  const urinePerDay = (urinePerMin * 1440) / 1000; // L/day

  useEffect(() => {
    const tick = () => {
      setT((v) => (v + 0.004) % 1);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const reset = () => {
    setGfr(125);
    setReabs(99.0);
    setAdh(true);
    setDiabetes(false);
  };

  // dots flowing through the nephron; surviving fraction shrinks with reabsorption
  const survivors = Math.round(((t * 6) % 1) * 6) + 1;
  const flow = 0.4 + (gfr / 140) * 0.8;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">CBSE Class 11 Biology - Excretory Products and their Elimination</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Nephron Flow Counter: from 180 L to 1.5 L</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300">Renal Lab</span>
      </header>

      <p className="text-xs text-slate-400 mb-3 max-w-3xl">
        Your kidneys FILTER about 180 L of blood plasma daily but you pass only about 1.5 L of urine. Slide the
        reabsorption dial and discover where the other 178.5 L goes.
      </p>

      {/* CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>GFR (filtration rate)</span>
            <span className="text-indigo-300 font-mono font-bold">{gfr} mL/min</span>
          </label>
          <input type="range" min={60} max={140} step={1} value={gfr} aria-label="glomerular filtration rate"
            onChange={(e) => setGfr(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-indigo-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Water reabsorbed in tubules</span>
            <span className="text-sky-300 font-mono font-bold">{effReabs.toFixed(1)} %</span>
          </label>
          <input type="range" min={95} max={99.5} step={0.1} value={reabs} aria-label="percentage of water reabsorbed"
            onChange={(e) => setReabs(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-sky-500" />
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={() => setAdh(!adh)} className={`min-h-11 px-3 rounded-xl text-xs font-bold border ${adh ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300' : 'bg-rose-950/60 border-rose-700 text-rose-300'}`}>
            {adh ? 'ADH present (water saved)' : 'No ADH (diuresis!)'}
          </button>
          <button onClick={() => setDiabetes(!diabetes)} className={`min-h-11 px-3 rounded-xl text-xs font-bold border ${diabetes ? 'bg-amber-950/60 border-amber-700 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            {diabetes ? 'High blood glucose: ON' : 'High blood glucose: off'}
          </button>
          <button onClick={reset} className="min-h-11 px-3 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">Reset</button>
        </div>
      </div>

      {/* NEPHRON DIAGRAM */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 mb-4">
        <svg viewBox="0 0 470 190" className="w-full h-48 md:h-52" preserveAspectRatio="xMidYMid meet">
          <path d="M 30 95 H 100 C 160 95 160 40 220 40 C 280 40 280 150 340 150 H 430" fill="none" stroke="#334155" strokeWidth="14" strokeLinecap="round" />
          {/* glomerulus */}
          <circle cx="30" cy="95" r="20" fill="#7f1d1d" stroke="#f87171" strokeWidth="2" />
          <text x="30" y="70" fill="#fca5a5" fontSize="10" textAnchor="middle">glomerulus</text>
          {/* PCT */}
          <text x="130" y="28" fill="#94a3b8" fontSize="10" textAnchor="middle">PCT: glucose + 70% water back</text>
          {/* loop of Henle */}
          <text x="220" y="172" fill="#94a3b8" fontSize="10" textAnchor="middle">loop of Henle: more water leaves</text>
          {/* collecting duct */}
          <text x="430" y="172" fill="#94a3b8" fontSize="10" textAnchor="end">collecting duct (ADH acts here)</text>
          {/* flowing filtrate drops: PCT segment dense, collecting duct sparse */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const phase = (t * flow + i / 6) % 1;
            const x = 30 + phase * 400;
            const y = phase < 0.18 ? 95 : phase < 0.5 ? 40 : phase < 0.82 ? 150 : 150;
            const gone = i >= survivors; // reabsorbed drops vanish
            return gone ? null : <circle key={i} cx={x} cy={y} r="5" fill="#fbbf24" opacity="0.9" />;
          })}
          {diabetes && (
            <text x="130" y="60" fill="#fbbf24" fontSize="10" fontWeight="bold">glucose now in the tubule!</text>
          )}
        </svg>
      </div>

      {/* LIVE COUNTERS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <div className="p-3 bg-slate-900 rounded-2xl border border-indigo-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Filtrate formed</p>
          <p className="text-lg font-extrabold text-indigo-300 font-mono">{filtratePerDay.toFixed(0)} L/day</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-sky-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Water reabsorbed</p>
          <p className="text-lg font-extrabold text-sky-300 font-mono">{(filtratePerDay - urinePerDay).toFixed(1)} L/day</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-amber-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Urine passed</p>
          <p className="text-lg font-extrabold text-amber-300 font-mono">{urinePerDay.toFixed(2)} L/day</p>
        </div>
        <div className={`p-3 rounded-2xl border text-center ${diabetes ? 'bg-amber-950/60 border-amber-700' : 'bg-slate-900 border-slate-800'}`}>
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Glucose in urine</p>
          <p className={`text-lg font-extrabold font-mono ${diabetes ? 'text-amber-300' : 'text-emerald-300'}`}>{diabetes ? 'PRESENT' : 'none'}</p>
        </div>
      </div>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-3">
        <p className="mb-2">
          <span className="font-bold text-sky-300">Healthy urine output: 0.6 - 2.5 L/day.</span> You are
          {urinePerDay >= 0.6 && urinePerDay <= 2.5 ? (
            <span className="font-bold text-emerald-300"> INSIDE the normal range.</span>
          ) : (
            <span className={`font-bold ${urinePerDay < 0.6 ? 'text-rose-300' : 'text-amber-300'}`}>
              {urinePerDay < 0.6 ? ' producing almost no urine (risk: wastes accumulating in blood).' : ' passing excessive water (dehydration risk).'}
            </span>
          )}
        </p>
        <p>
          <span className="font-bold text-emerald-300">Misconception killer:</span> urine is not squirted straight from the blood --
          it is what SURVIVES massive selective reabsorption. And glucose never appears in a healthy urine because the PCT reabsorbs
          100% of it; it spills over only when blood glucose exceeds the tubular maximum.
        </p>
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Turn ADH off at 99% reabsorption and watch urine output -- this is exactly why alcohol (which suppresses ADH) dehydrates you.</p>
        <p className="mt-1">2. Drop GFR to 60 and try to restore urine to 1.5 L/day by reabsorption alone. Why does kidney failure (low GFR) need dialysis rather than just more ADH?</p>
      </footer>
    </div>
  );
}

export default C11_BiologyExcretoryNephronSim;

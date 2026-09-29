'use client';

import React, { useEffect, useRef, useState } from 'react';

// ─── SELECTION MATH (standard population genetics recursion) ───
// p' = (p^2 wAA + p q wAa) / wMean, with q = 1 - p and wMean the mean fitness.
// ─── REAL SELECTION EPISODES AS PRESETS ───
const SCENARIOS = [
  { id: 'none', label: 'No selection', wAA: 1, wAa: 1, waa: 1 },
  { id: 'moth', label: 'Industrial melanism', wAA: 0.7, wAa: 0.9, waa: 1 },
  { id: 'sickle', label: 'Sickle-cell (het advantage)', wAA: 0.8, wAa: 1, waa: 0.2 },
  { id: 'bottle', label: 'Strong bottleneck on aa', wAA: 1, wAa: 0.5, waa: 0 },
];

export function C12_BiologyEvolutionNaturalSelectionSim() {
  const [p, setP] = useState(0.5);
  const [wAA, setWAA] = useState(1);
  const [wAa, setWAa] = useState(0.8);
  const [waa, setWaa] = useState(0.2);
  const [history, setHistory] = useState<number[]>([0.5]);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const noSelection = wAA === 1 && wAa === 1 && waa === 1;

  const step = () => {
    setP((prev) => {
      const q = 1 - prev;
      const wMean = prev * prev * wAA + 2 * prev * q * wAa + q * q * waa;
      const next = Math.min(1, Math.max(0, (prev * prev * wAA + prev * q * wAa) / wMean));
      setHistory((h) => [...h.slice(-79), next]);
      return next;
    });
  };

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(step, 350);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [running, wAA, wAa, waa]);

  const reset = () => {
    setRunning(false);
    setP(0.5);
    setHistory([0.5]);
    setWAA(1);
    setWAa(0.8);
    setWaa(0.2);
  };

  const q = 1 - p;
  const chart = history
    .map((v, i) => `${(20 + (i / 79) * 420).toFixed(1)} ${(216 - v * 180).toFixed(1)}`)
    .join(' L');

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">CBSE Class 12 Biology - Evolution</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Natural Selection: allele frequency machine</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300">Selection Lab</span>
      </header>

      <p className="text-xs text-slate-400 mb-3 max-w-3xl">
        Gene A has two alleles. Genotypes AA, Aa and aa survive to reproduce with fitness w. Press Step or Run and watch
        allele A (frequency p) spread or vanish -- the population evolves, individuals do not.
      </p>

      {/* SCENARIO PRESETS */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs text-slate-400 self-center mr-1">Famous episodes:</span>
        {SCENARIOS.map((s) => (
          <button key={s.id} onClick={() => { setRunning(false); setWAA(s.wAA); setWAa(s.wAa); setWaa(s.waa); setP(0.5); setHistory([0.5]); }}
            className={`min-h-11 px-3 rounded-xl text-xs font-bold border ${wAA === s.wAA && wAa === s.wAa && waa === s.waa ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'}`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Start allele A frequency p</span>
            <span className="text-gold-300 font-mono font-bold">{p.toFixed(2)}</span>
          </label>
          <input type="range" min={0.05} max={0.95} step={0.01} value={p} aria-label="allele A frequency"
            onChange={(e) => { setRunning(false); setP(Number(e.target.value)); setHistory([Number(e.target.value)]); }}
            className="w-full mt-2 min-h-11 accent-gold-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
          {([['w (AA)', wAA, setWAA], ['w (Aa)', wAa, setWAa], ['w (aa)', waa, setWaa]] as [string, number, (v: number) => void][]).map(([lab, val, set]) => (
            <label key={lab} className="text-xs text-slate-400 flex justify-between items-center gap-2">
              <span>{lab}</span>
              <span className="flex items-center gap-2">
                <span className="font-mono font-bold text-emerald-300">{val.toFixed(1)}</span>
                <input type="range" min={0} max={1} step={0.1} value={val} aria-label={`fitness of ${lab}`}
                  onChange={(e) => set(Number(e.target.value))} className="w-24 accent-emerald-500" />
              </span>
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={() => setRunning(!running)} className={`min-h-11 px-4 rounded-2xl text-sm font-bold border ${running ? 'bg-rose-950/60 border-rose-700 text-rose-300' : 'bg-emerald-600 border-emerald-500 text-white'}`}>
            {running ? 'Pause generations' : 'Run generations'}
          </button>
          <button onClick={step} className="min-h-11 px-4 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800">Step 1 generation</button>
          <button onClick={reset} className="min-h-11 px-4 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">Reset</button>
        </div>
      </div>

      {/* CHART + LIVE VALUES */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 p-2">
          <svg viewBox="0 0 460 240" className="w-full h-56 md:h-60" preserveAspectRatio="xMidYMid meet">
            <line x1="20" y1="36" x2="440" y2="36" stroke="#334155" strokeDasharray="4 3" />
            <line x1="20" y1="216" x2="440" y2="216" stroke="#475569" />
            <text x="444" y="40" fill="#64748b" fontSize="10" textAnchor="end">p = 1</text>
            <text x="444" y="220" fill="#64748b" fontSize="10" textAnchor="end">p = 0</text>
            <text x="24" y="232" fill="#64748b" fontSize="10">generations --&gt;</text>
            <polyline points={chart} fill="none" stroke="#34d399" strokeWidth="3" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="md:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-2 text-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Population right now</p>
          <div className="flex h-8 rounded-xl overflow-hidden border border-slate-700 font-mono text-xs font-bold">
            <div className="bg-gold-500 flex items-center justify-center text-white transition-all" style={{ width: `${p * 100}%` }}>A {Math.round(p * 100)}%</div>
            <div className="bg-rose-500 flex items-center justify-center text-white transition-all" style={{ width: `${q * 100}%` }}>a {Math.round(q * 100)}%</div>
          </div>
          <p className="font-mono text-xs text-slate-300 p-2 bg-slate-950 rounded-xl border border-slate-800">
            AA = {(p * p * 100).toFixed(1)}% | Aa = {(2 * p * q * 100).toFixed(1)}% | aa = {(q * q * 100).toFixed(1)}%
          </p>
          <div className={`p-2 rounded-xl text-xs font-bold border ${noSelection ? 'bg-amber-950/60 border-amber-700 text-amber-300' : 'bg-emerald-950/60 border-emerald-700 text-emerald-300'}`}>
            {noSelection ? 'All w = 1: no selection, p stays put (Hardy-Weinberg).' : waa < wAA ? 'Selection favours A: p climbs toward fixation.' : 'Selection favours a: p falls toward zero.'}
          </div>
          <p className="text-xs text-slate-400">
            Misconception killer: no individual moth, bacterium or finch ever changed its genes. Selection only shifts
            WHICH alleles get passed on -- the curve is the proof.
          </p>
        </div>
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Set all fitness to 1 and run 40 generations. Then drop w(aa) to 0.2 and run again -- why does p now march to 1?</p>
        <p className="mt-1">2. Make A harmful: w(AA) = 0.4, w(Aa) = 0.8, w(aa) = 1. Why does allele A shrink fast at first but take very long to vanish completely?</p>
      </footer>
    </div>
  );
}

export default C12_BiologyEvolutionNaturalSelectionSim;

'use client';

import React, { useMemo, useState } from 'react';

// ─── PYTHON SLICING: s[start:stop:step], stop is EXCLUSIVE ───
const SAMPLES = [
  { id: 'py', label: '"PYTHON"', value: 'PYTHON' },
  { id: 'prog', label: '"PROGRAMMING"', value: 'PROGRAMMING' },
  { id: 'hello', label: '"Hello, World!"', value: 'Hello, World!' },
];

// Faithful-enough Python slice semantics for the ranges the sliders allow
const pySlice = (s: string, start: number, stop: number, step: number): string => {
  const len = s.length;
  const norm = (i: number) => (i < 0 ? i + len : i);
  const out: string[] = [];
  if (step > 0) {
    const a = Math.max(0, Math.min(len, norm(start)));
    const b = Math.max(0, Math.min(len, norm(stop)));
    for (let i = a; i < b; i += step) out.push(s[i]);
  } else {
    const a = Math.max(-1, Math.min(len - 1, norm(start)));
    const b = norm(stop) < 0 ? Math.max(-1, norm(stop)) : Math.min(len, norm(stop));
    for (let i = a; i > b; i += step) out.push(s[i]);
  }
  return out.join('');
};

export function C11_ComputerScienceStringSlicingSim() {
  const [sid, setSid] = useState('py');
  const [start, setStart] = useState(0);
  const [stop, setStop] = useState(4);
  const [step, setStep] = useState(1);

  const s = SAMPLES.find((v) => v.id === sid) || SAMPLES[0];
  const len = s.value.length;
  const safeStop = Math.min(stop, len);
  const sliced = useMemo(() => pySlice(s.value, start, safeStop, step), [s, start, safeStop, step]);

  // which indices appear in the slice (to light up boxes)
  const picked = useMemo(() => {
    const set = new Set<number>();
    if (step > 0) {
      for (let i = start; i < safeStop; i += step) set.add(i);
    } else {
      for (let i = Math.min(start, len - 1); i > safeStop; i += step) if (i >= 0) set.add(i);
    }
    return set;
  }, [start, safeStop, step, len]);

  const pickSample = (id: string) => {
    setSid(id);
    setStart(0);
    setStop(Math.min(4, (SAMPLES.find((v) => v.id === id) || SAMPLES[0]).value.length));
    setStep(1);
  };

  const reset = () => pickSample('py');

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">CBSE Class 11 Computer Science - Strings</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">String Slicing Machine: s[start : stop : step]</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-gold-950 border border-gold-700 text-gold-300">len = {len}</span>
      </header>

      {/* SAMPLE PICKER */}
      <div className="flex flex-wrap gap-2 mb-4">
        {SAMPLES.map((v) => (
          <button key={v.id} onClick={() => pickSample(v.id)} className={`min-h-11 px-4 rounded-xl text-xs font-mono font-bold border ${sid === v.id ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
            {v.label}
          </button>
        ))}
      </div>

      {/* SLIDERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>start</span>
            <span className="text-gold-300 font-mono font-bold">{start}</span>
          </label>
          <input type="range" min={0} max={len - 1} step={1} value={start} aria-label="slice start index"
            onChange={(e) => setStart(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-gold-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>stop (excluded!)</span>
            <span className="text-rose-300 font-mono font-bold">{stop}</span>
          </label>
          <input type="range" min={0} max={len} step={1} value={stop} aria-label="slice stop index"
            onChange={(e) => setStop(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-rose-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>step</span>
            <span className="text-emerald-300 font-mono font-bold">{step}</span>
          </label>
          <input type="range" min={-3} max={3} step={1} value={step} aria-label="slice step"
            onChange={(e) => setStep(Number(e.target.value) || 1)} className="w-full mt-2 min-h-11 accent-emerald-500" />
          {step === 0 && <p className="text-[10px] text-rose-300 mt-1">step 0 is an error in Python -- nudged to 1.</p>}
        </div>
      </div>

      {/* INDEX BOXES */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3 mb-4">
        <div className="flex flex-wrap gap-1 justify-center">
          {s.value.split('').map((ch, i) => {
            const inSlice = picked.has(i);
            const isBoundary = i === start || i === safeStop;
            return (
              <div key={i} className="flex flex-col items-center">
                <span className="text-[9px] text-slate-500 font-mono">{i - len}</span>
                <div className={`w-9 h-11 flex items-center justify-center rounded-lg border font-mono text-base font-bold transition-all duration-200 ${
                  inSlice ? 'bg-emerald-950 border-emerald-500 text-emerald-200 scale-105' : 'bg-slate-950 border-slate-700 text-slate-400'}`}>
                  {ch === ' ' ? "' '" : ch}
                </div>
                <span className={`text-[9px] font-mono ${isBoundary ? 'text-amber-300 font-bold' : 'text-slate-500'}`}>{i}</span>
              </div>
            );
          })}
        </div>
        <p className="text-center text-[10px] text-slate-500 mt-2">small numbers above = negative index, below = positive index; amber = boundaries</p>
      </div>

      {/* LIVE EXPRESSION */}
      <div className="bg-slate-900 rounded-2xl border border-emerald-800 p-4 mb-3">
        <p className="text-sm font-mono text-slate-200">
          s = <span className="text-amber-300">&quot;{s.value}&quot;</span>
        </p>
        <p className="text-sm font-mono text-slate-200 mt-1">
          s[{start}:{stop}:{step}] &rarr; <span className="text-emerald-300 font-bold text-lg">&quot;{sliced}&quot;</span>
          <span className="text-slate-500 text-xs ml-2">({sliced.length} characters)</span>
        </p>
        <p className="text-xs text-slate-400 mt-2">
          The stop character is NOT included. {step < 0 ? 'Negative step walks backwards from start down to stop+1.' : 'Characters are taken at start, start+step, ... while index < stop.'}
        </p>
      </div>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-3">
        <p>
          <span className="font-bold text-gold-300">Misconception killer:</span> almost every wrong answer in exams comes from
          thinking stop is included. s[1:4] gives THREE characters (indices 1, 2, 3) -- the character at 4 stays behind. Strings are
          also immutable: slicing makes a new string, never a modified original.
        </p>
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Produce &quot;TY&quot; from PYTHON with one positive-step slice, then produce it again with a negative step. Which indices light up each time?</p>
        <p className="mt-1">2. Set s[::-1] by choosing start = last index, stop = 0, step = -1 -- but compare with s[len:0:-1] and explain why the reverse result is the same.</p>
      </footer>
    </div>
  );
}

export default C11_ComputerScienceStringSlicingSim;

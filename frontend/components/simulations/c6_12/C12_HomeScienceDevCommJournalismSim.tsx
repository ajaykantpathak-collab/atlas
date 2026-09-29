'use client';

import React, { useEffect, useRef, useState } from 'react';

// ─── BASS DIFFUSION MODEL: media reach (p) + word of mouth (q) drive adoption of a development message ───
// A(t+1) = A + (p + q*A/N) * (N - A)
const STEPS = 60;

const CATEGORIES = [
  { upTo: 2.5, label: 'Innovators', color: '#f472b6' },
  { upTo: 16, label: 'Early adopters', color: '#a78bfa' },
  { upTo: 50, label: 'Early majority', color: '#818cf8' },
  { upTo: 84, label: 'Late majority', color: '#38bdf8' },
  { upTo: 100.1, label: 'Laggards', color: '#34d399' },
];

export function C12_HomeScienceDevCommJournalismSim() {
  const [mediaPct, setMediaPct] = useState(1);
  const [wordQ, setWordQ] = useState(0.3);
  const [population, setPopulation] = useState(20000);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(true);
  const rafRef = useRef<number>(0);

  // Precompute the whole adoption curve from the real Bass equations
  const adoption = (() => {
    const p = mediaPct / 100;
    const out: number[] = [0];
    let a = 0;
    for (let t = 0; t < STEPS; t++) {
      a = a + (p + (wordQ * a) / population) * (population - a);
      out.push(a);
    }
    return out;
  })();

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      setStep((s) => (s >= STEPS ? 0 : s + 1));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  const adoptedNow = adoption[step] || 0;
  const pctNow = (adoptedNow / population) * 100;
  const category = CATEGORIES.find((c) => pctNow < c.upTo) || CATEGORIES[4];
  const newThisStep = (adoption[Math.min(step + 1, STEPS)] || 0) - adoptedNow;
  const mediaShare = population <= 0 ? 0 : Math.min(100, ((mediaPct / 100) * (population - adoptedNow)) / Math.max(newThisStep, 1) * 100);

  const sx = (t: number) => 30 + (t / STEPS) * 420;
  const sy = (v: number) => 210 - (v / population) * 180;
  const path = adoption.map((v, i) => `${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(' L');

  const reset = () => {
    setMediaPct(1);
    setWordQ(0.3);
    setPopulation(20000);
    setStep(0);
    setRunning(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">CBSE Class 12 Home Science - Development Communication and Journalism</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Message Spread: media vs word of mouth</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-gold-950 border border-gold-700 text-gold-300">Diffusion Lab</span>
      </header>

      <p className="text-xs text-slate-400 mb-3 max-w-3xl">
        A village health campaign spreads two ways: mass media reaches a fixed share of the remaining people each cycle,
        and interpersonal talk spreads in proportion to people who already adopted. Move the sliders and watch the adoption curve.
      </p>

      {/* CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Mass media reach (radio, TV, press)</span>
            <span className="text-gold-300 font-mono font-bold">{mediaPct.toFixed(1)} %/cycle</span>
          </label>
          <input type="range" min={0} max={8} step={0.1} value={mediaPct} aria-label="mass media reach percent per cycle"
            onChange={(e) => setMediaPct(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-gold-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Word of mouth strength</span>
            <span className="text-emerald-300 font-mono font-bold">{wordQ.toFixed(2)}</span>
          </label>
          <input type="range" min={0} max={0.8} step={0.02} value={wordQ} aria-label="word of mouth coefficient"
            onChange={(e) => setWordQ(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-emerald-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Community size</span>
            <span className="text-gold-300 font-mono font-bold">{population.toLocaleString('en-IN')} people</span>
          </label>
          <input type="range" min={5000} max={100000} step={5000} value={population} aria-label="community population"
            onChange={(e) => setPopulation(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-gold-500" />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setRunning(!running)} className={`flex-1 min-h-11 px-4 rounded-2xl text-sm font-bold border ${running ? 'bg-amber-950/60 border-amber-700 text-amber-300' : 'bg-gold-600 border-gold-500 text-white'}`}>
          {running ? 'Pause campaign' : 'Run campaign'}
        </button>
        <button onClick={reset} className="min-h-11 px-4 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">Reset</button>
      </div>

      {/* S-CURVE */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 mb-4">
        <svg viewBox="0 0 470 230" className="w-full h-56 md:h-64" preserveAspectRatio="xMidYMid meet">
          {[0, 25, 50, 75, 100].map((g) => (
            <g key={g}>
              <line x1="30" y1={210 - g * 1.8} x2="450" y2={210 - g * 1.8} stroke="#1e293b" />
              <text x="26" y={214 - g * 1.8} fill="#475569" fontSize="9" textAnchor="end">{g}%</text>
            </g>
          ))}
          <path d={'M' + path} fill="none" stroke="#818cf8" strokeWidth="3" />
          <circle cx={sx(step)} cy={sy(adoptedNow)} r="6" fill={category.color} stroke="#0f172a" strokeWidth="2" />
          <text x={sx(step)} y={sy(adoptedNow) - 12} fill={category.color} fontSize="10" textAnchor="middle" fontWeight="bold">{category.label}</text>
          <text x="452" y="226" fill="#64748b" fontSize="10" textAnchor="end">cycle {STEPS}</text>
          <text x="32" y="226" fill="#64748b" fontSize="10">cycle 0 (campaign launch)</text>
        </svg>
      </div>

      {/* LIVE READOUT */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Adopted so far</p>
          <p className="text-lg font-extrabold text-gold-300 font-mono">{Math.round(adoptedNow).toLocaleString('en-IN')}</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Penetration</p>
          <p className="text-lg font-extrabold text-emerald-300 font-mono">{pctNow.toFixed(1)} %</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">New this cycle</p>
          <p className="text-lg font-extrabold text-amber-300 font-mono">{Math.max(0, Math.round(newThisStep)).toLocaleString('en-IN')}</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Current adopter group</p>
          <p className="text-sm font-extrabold" style={{ color: category.color }}>{category.label}</p>
        </div>
      </div>
      <p className="text-xs text-slate-400 p-3 rounded-xl bg-slate-900 border border-slate-800 mb-3">
        Of the people persuaded this cycle, about <span className="font-mono font-bold text-gold-300">{mediaShare.toFixed(0)}%</span> came from media
        and the rest from interpersonal channels. Development communication theory: media creates awareness, but word of mouth drives adoption.
      </p>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-3">
        <p>
          <span className="font-bold text-gold-300">Misconception killer:</span> a loud media campaign alone rarely changes behaviour --
          set media to 8% and word of mouth to 0 and watch adoption crawl, then restore word of mouth and watch the S-curve take off.
        </p>
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Set media reach to 0 and word of mouth to 0.5. Does the message still spread? Who starts it, and what does that imply for choosing influencers?</p>
        <p className="mt-1">2. Try to reach 50% adoption by cycle 30 using the smallest possible media spend -- what word-of-mouth strength do you need?</p>
      </footer>
    </div>
  );
}

export default C12_HomeScienceDevCommJournalismSim;

'use client';

import React, { useEffect, useRef, useState } from 'react';

// ─── SIR OUTBREAK MODEL (Euler method, gamma = 1/10 per day) ───
// beta = R0 * gamma. Vaccinated people start immune (moved to R).
const N = 1000;
const DAYS = 180;
const GAMMA = 0.1;

type Curve = { S: number[]; I: number[]; R: number[]; peak: number; total: number };

const simulate = (r0: number, vax: number): Curve => {
  const beta = r0 * GAMMA;
  let s = N * (1 - vax) - 5;
  let i = 5;
  let r = N * vax;
  const S: number[] = [s];
  const I: number[] = [i];
  const R: number[] = [r];
  for (let d = 0; d < DAYS; d++) {
    const nInf = beta * s * i * GAMMA;
    const nRec = GAMMA * i * GAMMA;
    s = Math.max(0, s - nInf);
    i = Math.max(0, i + nInf - nRec);
    r = r + nRec;
    S.push(s); I.push(i); R.push(r);
  }
  return { S, I, R, peak: Math.max(...I), total: N - S[S.length - 1] };
};

const DISEASES = [
  { id: 'flu', label: 'Influenza R0 = 1.3', r0: 1.3 },
  { id: 'covid', label: 'COVID-19 R0 = 3', r0: 3 },
  { id: 'polio', label: 'Polio R0 = 6', r0: 6 },
  { id: 'measles', label: 'Measles R0 = 15', r0: 15 },
];

export function C12_BiologyHumanHealthImmunitySim() {
  const [r0, setR0] = useState(3);
  const [vax, setVax] = useState(0);
  const [day, setDay] = useState(0);
  const [running, setRunning] = useState(true);
  const rafRef = useRef<number>(0);

  const sim = simulate(r0, vax / 100);
  const herdThreshold = (1 - 1 / r0) * 100;
  const protectedEnough = vax >= herdThreshold;
  const rEff = r0 * (sim.S[day] / N);

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      setDay((d) => (d >= DAYS ? 0 : d + 1));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  const sx = (d: number) => 30 + (d / DAYS) * 420;
  const sy = (v: number) => 210 - (v / N) * 180;
  const pathOf = (arr: number[]) => arr.map((v, i) => `${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(' L');

  const reset = () => {
    setR0(3);
    setVax(0);
    setDay(0);
    setRunning(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">CBSE Class 12 Biology - Human Health and Disease</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Outbreak Containment: vaccination coverage lab</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300">Immunity Lab</span>
      </header>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-2 mb-3">
        {DISEASES.map((d) => (
          <button key={d.id} onClick={() => { setR0(d.r0); setDay(0); }} className={`min-h-11 px-3 rounded-xl text-xs font-bold border ${r0 === d.r0 ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
            {d.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 md:col-span-2">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Vaccination coverage (people immune on day 0)</span>
            <span className="text-emerald-300 font-mono font-bold">{vax} %</span>
          </label>
          <input type="range" min={0} max={95} step={1} value={vax} aria-label="vaccination coverage percent"
            onChange={(e) => { setVax(Number(e.target.value)); setDay(0); }} className="w-full mt-2 min-h-11 accent-emerald-500" />
        </div>
        <div className="flex gap-2">
          <button onClick={() => setRunning(!running)} className={`flex-1 min-h-11 px-2 rounded-2xl text-xs font-bold border ${running ? 'bg-amber-950/60 border-amber-700 text-amber-300' : 'bg-emerald-600 border-emerald-500 text-white'}`}>
            {running ? 'Pause clock' : 'Run clock'}
          </button>
          <button onClick={reset} className="min-h-11 px-3 rounded-2xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">Reset</button>
        </div>
      </div>

      {/* EPIDEMIC CURVE */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 mb-4">
        <svg viewBox="0 0 470 230" className="w-full h-56 md:h-64" preserveAspectRatio="xMidYMid meet">
          <path d={'M' + pathOf(sim.S)} fill="none" stroke="#818cf8" strokeWidth="2" />
          <path d={'M' + pathOf(sim.I)} fill="none" stroke="#f43f5e" strokeWidth="3" />
          <path d={'M' + pathOf(sim.R)} fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="5 4" />
          <line x1={sx(day)} y1="20" x2={sx(day)} y2="210" stroke="#fbbf24" strokeWidth="1.5" />
          <circle cx={sx(day)} cy={sy(sim.I[day])} r="5" fill="#f43f5e" stroke="#0f172a" strokeWidth="2" />
          <text x="34" y="18" fill="#f43f5e" fontSize="10" fontWeight="bold">infected</text>
          <text x="100" y="18" fill="#818cf8" fontSize="10">susceptible</text>
          <text x="180" y="18" fill="#34d399" fontSize="10">recovered/immune</text>
          <text x="452" y="224" fill="#64748b" fontSize="10" textAnchor="end">day {DAYS}</text>
          <text x="34" y="224" fill="#64748b" fontSize="10">day 0 (5 infected travellers arrive)</text>
        </svg>
      </div>

      {/* LIVE PANEL */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Clock</p>
          <p className="text-lg font-extrabold text-amber-300 font-mono">day {day}</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-rose-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Infected now</p>
          <p className="text-lg font-extrabold text-rose-300 font-mono">{Math.round(sim.I[day])} people</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Herd threshold</p>
          <p className="text-lg font-extrabold text-indigo-300 font-mono">{herdThreshold.toFixed(0)} %</p>
        </div>
        <div className={`p-3 rounded-2xl border text-center ${protectedEnough ? 'bg-emerald-950/60 border-emerald-700' : 'bg-rose-950/60 border-rose-700'}`}>
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Peak infected</p>
          <p className="text-lg font-extrabold font-mono">{Math.round(sim.peak)} people</p>
        </div>
      </div>
      <p className={`text-xs font-bold p-3 rounded-xl border mb-3 ${protectedEnough ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300' : 'bg-rose-950/60 border-rose-700 text-rose-300'}`}>
        R-effective today = {rEff.toFixed(2)}. {protectedEnough
          ? 'Coverage beats the herd-immunity threshold: every new case infects less than 1 person -- the outbreak dies out.'
          : 'Coverage is BELOW the herd-immunity threshold -- watch the red curve explode.'}
      </p>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-3">
        <p>
          <span className="font-bold text-emerald-300">Big idea:</span> vaccination protects the whole herd, not just the vaccinated --
          immune people are walls the pathogen cannot cross. Measles needs about 92% coverage because it is ferociously contagious (R0 = 15).
          <span className="font-bold text-amber-300"> Misconception killer:</span> a vaccine need not be 100% effective or universal --
          it only has to push R-effective below 1.
        </p>
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Select Measles and slide coverage up from 0 in steps of 10. Find the exact coverage where the peak infected collapses.</p>
        <p className="mt-1">2. Set Influenza with 0% coverage, then compare day-90 infected counts at 30% vs 50% coverage -- is the drop linear?</p>
      </footer>
    </div>
  );
}

export default C12_BiologyHumanHealthImmunitySim;

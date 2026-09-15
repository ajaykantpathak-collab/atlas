'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Sample { t: number; xa: number; xb: number }

// ─── MAIN COMPONENT: uniform vs accelerated motion on a 100 m track ───
export function C9_ScienceDescribingMotionAroundUsSim() {
  const [vA, setVA] = useState(6); // runner A: constant speed m/s
  const [vB, setVB] = useState(4); // runner B: starting speed m/s
  const [aB, setAB] = useState(0.6); // runner B: acceleration m/s^2
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);
  const [winner, setWinner] = useState<'A' | 'B' | null>(null);
  const [history, setHistory] = useState<Sample[]>([]);
  const histRef = useRef<Sample[]>([]);

  // ─── REAL NUMERICS (equations of motion) ───
  const posA = Math.min(100, vA * t);
  const posB = Math.min(100, vB * t + 0.5 * aB * t * t);
  const instB = vB + aB * t; // instantaneous speed of B

  useEffect(() => {
    if (!running || winner) return;
    const id = setInterval(() => {
      setT((prev) => prev + 0.2);
    }, 100);
    return () => clearInterval(id);
  }, [running, winner]);

  useEffect(() => {
    if (!running || winner) return;
    histRef.current = [...histRef.current.slice(-599), { t, xa: posA, xb: posB }];
    setHistory(histRef.current);
    if (posA >= 100 && posB >= 100) setWinner(posA <= posB ? 'A' : 'B');
    else if (posA >= 100) setWinner('A');
    else if (posB >= 100) setWinner('B');
  }, [t, running, winner, posA, posB]);

  const reset = () => {
    setRunning(false);
    setT(0);
    setWinner(null);
    histRef.current = [];
    setHistory([]);
  };

  // ─── GRAPH MAPPING: t in 0..30 s, x in 0..100 m ───
  const gx = (tv: number) => 40 + (tv / 30) * 500;
  const gy = (xv: number) => 200 - (xv / 100) * 180;
  const ptsA = history.map((s) => `${gx(s.t)},${gy(s.xa)}`).join(' ');
  const ptsB = history.map((s) => `${gx(s.t)},${gy(s.xb)}`).join(' ');

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">CBSE Class 9 Science - Motion</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Describing Motion Around Us: The 100 m Photo Finish</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-sky-950 border border-sky-700 text-sky-300 font-mono">
          t = {t.toFixed(1)} s
        </span>
      </header>

      {/* CONTROLS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>A speed</span>
            <span className="text-emerald-300 font-mono font-bold">{vA} m/s</span>
          </label>
          <input type="range" min={2} max={12} value={vA} aria-label="runner A speed"
            onChange={(e) => { setVA(Number(e.target.value)); reset(); }} className="w-full mt-2 accent-emerald-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>B start speed</span>
            <span className="text-sky-300 font-mono font-bold">{vB} m/s</span>
          </label>
          <input type="range" min={0} max={10} value={vB} aria-label="runner B starting speed"
            onChange={(e) => { setVB(Number(e.target.value)); reset(); }} className="w-full mt-2 accent-sky-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>B acceleration</span>
            <span className="text-indigo-300 font-mono font-bold">{aB.toFixed(1)} m/s2</span>
          </label>
          <input type="range" min={0} max={2} step={0.1} value={aB} aria-label="runner B acceleration"
            onChange={(e) => { setAB(Number(e.target.value)); reset(); }} className="w-full mt-2 accent-indigo-500" />
        </div>
        <button
          onClick={() => setRunning(!running)}
          disabled={!!winner}
          className={`p-3 rounded-2xl text-sm font-bold ${winner ? 'bg-slate-800 text-slate-500' : running ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'}`}
        >
          {running ? 'Pause' : 'Start race'}
        </button>
        <button onClick={reset} className="p-3 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800">
          Reset
        </button>
      </div>

      {/* TRACK */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3 mb-4">
        <svg viewBox="0 0 560 110" className="w-full h-24">
          <rect x="20" y="30" width="500" height="18" rx="6" fill="#1e293b" />
          <rect x="20" y="60" width="500" height="18" rx="6" fill="#1e293b" />
          <line x1="520" y1="20" x2="520" y2="90" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 4" />
          <text x="525" y="15" fill="#fbbf24" fontSize="10">100 m</text>
          <circle cx={20 + (posA / 100) * 500} cy="39" r="9" fill="#34d399" />
          <text x={20 + (posA / 100) * 500} y="43" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#052e16">A</text>
          <circle cx={20 + (posB / 100) * 500} cy="69" r="9" fill="#38bdf8" />
          <text x={20 + (posB / 100) * 500} y="73" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#082f49">B</text>
          <text x="20" y="20" fill="#64748b" fontSize="10">0 m</text>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* DISTANCE-TIME GRAPH */}
        <div className="md:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 560 220" className="w-full h-52 md:h-60">
            <line x1="40" y1="200" x2="550" y2="200" stroke="#475569" strokeWidth="1.5" />
            <line x1="40" y1="200" x2="40" y2="10" stroke="#475569" strokeWidth="1.5" />
            {[0, 10, 20, 30].map((tv) => (
              <text key={tv} x={gx(tv)} y="214" fill="#64748b" fontSize="10" textAnchor="middle">{tv}s</text>
            ))}
            {[0, 50, 100].map((xv) => (
              <text key={xv} x="32" y={gy(xv) + 4} fill="#64748b" fontSize="10" textAnchor="end">{xv}m</text>
            ))}
            {history.length > 1 && (
              <>
                <polyline points={ptsA} fill="none" stroke="#34d399" strokeWidth="2.5" />
                <polyline points={ptsB} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
              </>
            )}
            <circle cx={gx(t)} cy={gy(posA)} r="4" fill="#34d399" />
            <circle cx={gx(t)} cy={gy(posB)} r="4" fill="#38bdf8" />
          </svg>
          <p className="text-center text-[10px] text-slate-500">Distance-time graph: A is a straight line (uniform), B curves upward (accelerated).</p>
        </div>

        {/* READOUTS */}
        <div className="md:col-span-2 space-y-3">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1 text-sm font-mono">
            <p className="text-xs uppercase font-bold text-indigo-400 tracking-wider font-sans">Live data</p>
            <p className="text-emerald-300">A: {posA.toFixed(1)} m at {vA} m/s (uniform)</p>
            <p className="text-sky-300">B: {posB.toFixed(1)} m at {instB.toFixed(1)} m/s (changing)</p>
            <p className="text-slate-400">xA = v t = {vA} x {t.toFixed(1)}</p>
            <p className="text-slate-400">xB = u t + (1/2) a t^2</p>
          </div>
          {winner && (
            <div className="p-3 rounded-2xl bg-amber-950/60 border border-amber-700 text-amber-200 text-sm font-bold">
              {winner === 'A' ? 'Runner A' : 'Runner B'} wins at t = {t.toFixed(1)} s!
              <span className="block font-normal text-xs mt-1">Average speed = 100 m / {t.toFixed(1)} s = {(100 / t).toFixed(1)} m/s</span>
            </div>
          )}
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
            A straight distance-time line means uniform motion (equal distances in equal times). A curve that steepens means the object
            covers more distance each second - that is acceleration.
          </div>
        </div>
      </div>

      {/* TEACHING TEXT */}
      <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <p>
          <span className="font-bold text-indigo-300">Big idea:</span> motion is described by distance covered per unit time. For uniform
          motion x = v t, a straight-line graph whose slope is the speed. With constant acceleration x = u t + (1/2) a t^2 and the
          instantaneous speed grows as v = u + a t, so the graph bends upward.
        </p>
      </div>

      {/* WHAT TO TRY */}
      <footer className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Give B u = 0 and a = 1.0 m/s2 and find which A speed produces a dead heat (both cross 100 m at the same instant).</p>
        <p className="mt-1">2. Set aB = 0 so both runners are uniform, then explain what the graph looks like when A and B have equal speeds.</p>
      </footer>
    </div>
  );
}

export default C9_ScienceDescribingMotionAroundUsSim;

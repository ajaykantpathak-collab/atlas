'use client';

import React, { useEffect, useMemo, useState } from 'react';

const G = 9.8; // m/s^2

interface Trial { L: number; m: number; amp: number; T: number }

const DISCOVERY = {
  question: 'You want a pendulum clock to tick faster (shorter period). Which single change should you test?',
  options: ['Use a heavier bob', 'Shorten the string', 'Pull it back to a wider angle', 'Any of these works equally'],
  correctIndex: 1,
  explain: 'T = 2 x pi x sqrt(L/g) depends only on the string length L (for small swings). Mass and angle drop out of the formula.',
};

// ─── MAIN COMPONENT: scientific-inquiry pendulum investigation ───
export function C9_ScienceExplorationEnteringTheWorldOfSim() {
  const [length, setLength] = useState(50); // cm
  const [mass, setMass] = useState(50); // g
  const [amplitude, setAmplitude] = useState(15); // degrees
  const [running, setRunning] = useState(true);
  const [simTime, setSimTime] = useState(0);
  const [trials, setTrials] = useState<Trial[]>([]);
  const [picked, setPicked] = useState(-1);

  // ─── REAL NUMERICS: ideal pendulum period ───
  const period = useMemo(() => 2 * Math.PI * Math.sqrt(length / 100 / G), [length]);
  const swings = simTime / period;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSimTime((t) => t + 0.05), 50);
    return () => clearInterval(id);
  }, [running]);

  const thetaDeg = amplitude * Math.sin((2 * Math.PI * simTime) / period);
  const theta = (thetaDeg * Math.PI) / 180;

  // fair-test insight: same length, different mass or amplitude gives the same period
  const discoveryMade = useMemo(() => {
    for (const a of trials) {
      for (const b of trials) {
        if (a === b) continue;
        const sameLen = Math.abs(a.L - b.L) < 1;
        const diffVar = Math.abs(a.m - b.m) > 20 || Math.abs(a.amp - b.amp) > 5;
        if (sameLen && diffVar) return true;
      }
    }
    return false;
  }, [trials]);

  const record = () => {
    setTrials((prev) => [...prev.slice(-7), { L: length, m: mass, amp: amplitude, T: Math.round(period * 100) / 100 }]);
  };

  // SVG geometry
  const PX = 250, PY = 40;
  const rodPx = 30 + length * 1.5;
  const bobR = 6 + mass / 12;
  const bobX = PX + rodPx * Math.sin(theta);
  const bobY = PY + rodPx * Math.cos(theta);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">CBSE Class 9 Science - Scientific Inquiry</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Exploration Lab: What Really Controls a Pendulum?</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-gold-950 border border-gold-700 text-gold-300 font-mono">
          T = {period.toFixed(2)} s
        </span>
      </header>

      {/* CONTROLS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>String L</span>
            <span className="text-gold-300 font-mono font-bold">{length} cm</span>
          </label>
          <input type="range" min={20} max={100} value={length} aria-label="string length"
            onChange={(e) => setLength(Number(e.target.value))} className="w-full mt-2 accent-gold-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Bob mass</span>
            <span className="text-emerald-300 font-mono font-bold">{mass} g</span>
          </label>
          <input type="range" min={10} max={200} step={5} value={mass} aria-label="bob mass"
            onChange={(e) => setMass(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Release angle</span>
            <span className="text-amber-300 font-mono font-bold">{amplitude} deg</span>
          </label>
          <input type="range" min={5} max={40} value={amplitude} aria-label="release angle"
            onChange={(e) => setAmplitude(Number(e.target.value))} className="w-full mt-2 accent-amber-500" />
        </div>
        <button onClick={() => setRunning(!running)} className={`p-3 rounded-2xl text-sm font-bold ${running ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'}`}>
          {running ? 'Pause' : 'Release'}
        </button>
        <button onClick={record} className="p-3 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800">
          Record trial ({trials.length})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* PENDULUM */}
        <div className="md:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 p-2">
          <svg viewBox="0 0 500 330" className="w-full h-64 md:h-80">
            <rect x="150" y="24" width="200" height="10" rx="4" fill="#475569" />
            <line x1={PX} y1={PY} x2={bobX} y2={bobY} stroke="#94a3b8" strokeWidth="2.5" />
            <line x1={PX} y1={PY} x2={PX + rodPx * Math.sin((amplitude * Math.PI) / 180)} y2={PY + rodPx * Math.cos((amplitude * Math.PI) / 180)} stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1={PX} y1={PY} x2={PX - rodPx * Math.sin((amplitude * Math.PI) / 180)} y2={PY + rodPx * Math.cos((amplitude * Math.PI) / 180)} stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx={bobX} cy={bobY} r={bobR} fill="#6366f1" stroke="#c7d2fe" strokeWidth="2" />
            <text x={PX} y="20" fill="#64748b" fontSize="11" textAnchor="middle">pivot</text>
            <text x={PX + 12} y={PY + rodPx * 0.55} fill="#a5b4fc" fontSize="11">L = {length} cm</text>
            <text x={bobX} y={bobY + bobR + 16} fill="#94a3b8" fontSize="11" textAnchor="middle">{mass} g</text>
            <text x="250" y="318" fill="#64748b" fontSize="11" textAnchor="middle">
              Swings completed: {swings.toFixed(2)} | one full swing every {period.toFixed(2)} s
            </text>
          </svg>
        </div>

        {/* TRIALS + DISCOVERY */}
        <div className="md:col-span-2 space-y-3">
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-xs uppercase font-bold text-gold-400 tracking-wider mb-2">Trial log (fair test)</p>
            <table className="w-full text-[11px] font-mono text-slate-300">
              <thead>
                <tr className="text-slate-500 text-left">
                  <th className="pr-2">L(cm)</th><th className="pr-2">m(g)</th><th className="pr-2">ang</th><th>T(s)</th>
                </tr>
              </thead>
              <tbody>
                {trials.length === 0 && (
                  <tr><td colSpan={4} className="text-slate-500 py-2">Change one slider, record, repeat.</td></tr>
                )}
                {trials.map((tr, i) => (
                  <tr key={i} className="border-t border-slate-800">
                    <td className="pr-2">{tr.L}</td><td className="pr-2">{tr.m}</td><td className="pr-2">{tr.amp}</td>
                    <td className="text-gold-300 font-bold">{tr.T.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {discoveryMade && (
              <p className="mt-2 p-2 rounded-lg bg-emerald-950/60 border border-emerald-700 text-emerald-300 text-[11px] font-bold">
                Discovery unlocked: with L fixed, changing mass or angle left T unchanged. Only L matters.
              </p>
            )}
          </div>
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold text-amber-300 mb-2">{DISCOVERY.question}</p>
            <div className="grid grid-cols-1 gap-1.5">
              {DISCOVERY.options.map((opt, i) => (
                <button key={i} onClick={() => setPicked(i)} disabled={picked >= 0}
                  className={`p-2 text-left text-xs rounded-lg border transition-all ${
                    picked < 0 ? 'bg-slate-950 border-slate-700 text-slate-200 hover:bg-slate-800'
                    : i === DISCOVERY.correctIndex ? 'bg-emerald-950/70 border-emerald-600 text-emerald-200'
                    : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                  {opt}
                </button>
              ))}
            </div>
            {picked >= 0 && (
              <p className={`mt-2 text-xs font-bold ${picked === DISCOVERY.correctIndex ? 'text-emerald-300' : 'text-amber-300'}`}>
                {picked === DISCOVERY.correctIndex ? 'Correct!' : 'Re-test it.'} {DISCOVERY.explain}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* TEACHING TEXT */}
      <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <p>
          <span className="font-bold text-gold-300">Big idea:</span> science begins with a testable question and a fair test - change one
          variable at a time and log the result. For a simple pendulum the measured period T = 2 x pi x sqrt(L/g) confirms what the trial
          log shows: length controls the timing, mass and small release angles do not.
        </p>
      </div>

      {/* WHAT TO TRY */}
      <footer className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Record four trials at L = 40, 60, 80, 100 cm (keep mass and angle fixed) and check that T grows roughly as sqrt(L).</p>
        <p className="mt-1">2. Double the length from 20 cm to 80 cm. Predict the new period first, then measure: it should be 2 times longer, not 4.</p>
      </footer>
    </div>
  );
}

export default C9_ScienceExplorationEnteringTheWorldOfSim;

'use client';

import React, { useEffect, useMemo, useState } from 'react';

const G = 9.8;

// ─── MAIN COMPONENT: Newton's second law with friction on a track ───
export function C9_ScienceHowForcesAffectMotionSim() {
  const [mass, setMass] = useState(5); // kg
  const [force, setForce] = useState(20); // N (signed)
  const [mu, setMu] = useState(0.2); // friction coefficient
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);
  const [x, setX] = useState(0);
  const [v, setV] = useState(0);

  // ─── REAL NUMERICS: F_net = m a with friction ───
  const frictionMax = Math.round(mu * mass * G * 10) / 10;

  const dynamics = useMemo(() => {
    if (v === 0 && Math.abs(force) <= frictionMax) {
      return { fNet: 0, a: 0, balanced: true };
    }
    const dir = v !== 0 ? Math.sign(v) : Math.sign(force);
    const fNet = force - dir * frictionMax;
    return { fNet, a: fNet / mass, balanced: false };
  }, [force, v, frictionMax, mass]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setT((p) => p + 0.1);
      setV((prevV) => {
        // recompute friction direction with the freshest velocity
        const dir = prevV !== 0 ? Math.sign(prevV) : Math.sign(force);
        const moving = prevV !== 0 || Math.abs(force) > frictionMax;
        const a = moving ? (force - dir * frictionMax) / mass : 0;
        const nv = prevV + a * 0.1;
        // friction cannot reverse the motion in one step
        return prevV !== 0 && Math.sign(nv) !== Math.sign(prevV) ? 0 : Math.round(nv * 100) / 100;
      });
      setX((prevX) => Math.max(0, prevX + v * 0.1));
    }, 100);
    return () => clearInterval(id);
  }, [running, force, frictionMax, mass, v]);

  const reset = () => { setT(0); setX(0); setV(0); setRunning(false); };

  const blockX = 30 + Math.min(x, 80) * 5.5; // px
  const arrowLen = (mag: number) => Math.min(70, mag * 1.1);
  const fDir = force >= 0 ? 1 : -1;
  const frDir = dynamics.balanced ? 0 : -Math.sign(dynamics.fNet || 1) * -1; // friction opposes motion

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">CBSE Class 9 Science - Force and Laws of Motion</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">How Forces Affect Motion: Push a Crate</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-sky-950 border border-sky-700 text-sky-300 font-mono">
          t = {t.toFixed(1)} s
        </span>
      </header>

      {/* CONTROLS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Mass m</span>
            <span className="text-indigo-300 font-mono font-bold">{mass} kg</span>
          </label>
          <input type="range" min={1} max={20} value={mass} aria-label="mass"
            onChange={(e) => { setMass(Number(e.target.value)); reset(); }} className="w-full mt-2 accent-indigo-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Push F</span>
            <span className="text-rose-300 font-mono font-bold">{force} N</span>
          </label>
          <input type="range" min={-50} max={50} step={5} value={force} aria-label="applied force"
            onChange={(e) => setForce(Number(e.target.value))} className="w-full mt-2 accent-rose-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Roughness mu</span>
            <span className="text-amber-300 font-mono font-bold">{mu.toFixed(2)}</span>
          </label>
          <input type="range" min={0} max={0.6} step={0.05} value={mu} aria-label="friction coefficient"
            onChange={(e) => { setMu(Number(e.target.value)); reset(); }} className="w-full mt-2 accent-amber-500" />
        </div>
        <button onClick={() => setRunning(!running)} className={`p-3 rounded-2xl text-sm font-bold ${running ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'}`}>
          {running ? 'Hold' : 'Push!'}
        </button>
        <button onClick={reset} className="p-3 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800">
          Reset
        </button>
      </div>

      {/* TRACK */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3 mb-4">
        <svg viewBox="0 0 560 150" className="w-full h-32 md:h-40">
          <line x1="10" y1="120" x2="550" y2="120" stroke="#475569" strokeWidth="3" />
          {Array.from({ length: 15 }).map((_, i) => (
            <line key={i} x1={20 + i * 38} y1="120" x2={14 + i * 38} y2="132" stroke="#334155" strokeWidth="2" />
          ))}
          {/* crate */}
          <rect x={blockX} y={80} width="46" height="40" rx="4" fill={dynamics.balanced ? '#f59e0b' : '#6366f1'} opacity="0.9" />
          <text x={blockX + 23} y="104" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#eef2ff">{mass}kg</text>
          {/* applied force arrow */}
          <line x1={fDir > 0 ? blockX + 46 : blockX} y1="88" x2={fDir > 0 ? blockX + 46 + arrowLen(Math.abs(force)) : blockX - arrowLen(Math.abs(force))} y2="88" stroke="#fb7185" strokeWidth="3" />
          <text x={fDir > 0 ? blockX + 50 + arrowLen(Math.abs(force)) : blockX - 4 - arrowLen(Math.abs(force))} y="82" fontSize="10" fill="#fb7185" textAnchor={fDir > 0 ? 'start' : 'end'}>F = {force} N</text>
          {/* friction arrow */}
          {!dynamics.balanced && frictionMax > 0 && (
            <>
              <line x1={frDir > 0 ? blockX + 46 : blockX} y1="112" x2={frDir > 0 ? blockX + 46 + arrowLen(frictionMax) : blockX - arrowLen(frictionMax)} y2="112" stroke="#fbbf24" strokeWidth="3" />
              <text x={blockX + 23} y="140" fontSize="10" fill="#fbbf24" textAnchor="middle">friction {frictionMax} N (opposes motion)</text>
            </>
          )}
          {dynamics.balanced && (
            <text x={blockX + 23} y="140" fontSize="10" fill="#fbbf24" textAnchor="middle">push {Math.abs(force)} N = friction {frictionMax} N: balanced, crate stays put</text>
          )}
          <text x="540" y="138" fontSize="10" fill="#64748b" textAnchor="end">{Math.min(x, 80).toFixed(1)} m</text>
        </svg>
      </div>

      {/* READOUTS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] text-slate-400 uppercase">F_net</p>
          <p className="text-sm font-mono font-bold text-rose-300">{dynamics.fNet.toFixed(1)} N</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] text-slate-400 uppercase">a = F/m</p>
          <p className="text-sm font-mono font-bold text-indigo-300">{dynamics.a.toFixed(2)} m/s2</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] text-slate-400 uppercase">Velocity</p>
          <p className="text-sm font-mono font-bold text-sky-300">{v.toFixed(2)} m/s</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] text-slate-400 uppercase">Position</p>
          <p className="text-sm font-mono font-bold text-emerald-300">{x.toFixed(2)} m</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] text-slate-400 uppercase">Friction limit</p>
          <p className="text-sm font-mono font-bold text-amber-300">{frictionMax} N</p>
        </div>
      </div>

      {/* TEACHING TEXT */}
      <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <p>
          <span className="font-bold text-indigo-300">Big idea:</span> a net force changes velocity, never position directly. The crate
          accelerates only when the push beats friction: a = (F - friction) / m. When the push exactly balances friction the forces cancel
          and the crate keeps whatever velocity it has (first law); bigger mass means smaller acceleration for the same net force (second law).
        </p>
      </div>

      {/* WHAT TO TRY */}
      <footer className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Set m = 10 kg and mu = 0.25. Find the smallest push that just starts the crate moving (compare with friction limit = 24.5 N).</p>
        <p className="mt-1">2. Push hard for 3 s, then slide the force to 0 N and watch friction decelerate the crate to rest - read the stopping time.</p>
      </footer>
    </div>
  );
}

export default C9_ScienceHowForcesAffectMotionSim;

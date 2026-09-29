'use client';

import React, { useEffect, useState } from 'react';

const G = 9.8;

// ─── MAIN COMPONENT: work-energy conversion + lever mechanical advantage ───
export function C9_ScienceWorkEnergyAndSimpleMachinesSim() {
  const [tab, setTab] = useState<'energy' | 'lever'>('energy');

  // energy drop state
  const [mass, setMass] = useState(5); // kg
  const [height, setHeight] = useState(10); // m
  const [dropT, setDropT] = useState<number | null>(null); // null = at rest on top

  // lever state
  const [load, setLoad] = useState(120); // N
  const [loadArm, setLoadArm] = useState(1.5); // m
  const [effortArm, setEffortArm] = useState(3); // m
  const [effort, setEffort] = useState(60); // N (user-set)

  // ─── REAL NUMERICS: PE = mgh, v = sqrt(2gh), lever torque balance ───
  const pe = Math.round(mass * G * height);
  const impactV = Math.sqrt(2 * G * height);
  const fallen = dropT === null ? 0 : Math.min(height, 0.5 * G * dropT * dropT);

  useEffect(() => {
    if (dropT === null) return;
    const tFinal = Math.sqrt(2 * height / G);
    if (dropT >= tFinal) return;
    const id = setTimeout(() => setDropT((t) => (t === null ? null : Math.min(t + 0.05, tFinal))), 50);
    return () => clearTimeout(id);
  }, [dropT, height]);

  const ma = effortArm / loadArm; // mechanical advantage
  const effortNeeded = load / ma;
  const netTorque = load * loadArm - effort * effortArm;
  const balanced = Math.abs(netTorque) < 1;

  // SVG: falling ball
  const ballY = 30 + (fallen / height) * 180;

  // SVG: lever beam
  const angleDeg = Math.max(-12, Math.min(12, netTorque / 25));
  const beamHalf = 220;
  const loadX = -80 - loadArm * 40;
  const effortX = 80 + effortArm * 40;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">CBSE Class 9 Science - Work and Energy</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Work, Energy, and Simple Machines</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setTab('energy')} className={`px-3 py-1.5 rounded-full text-xs font-bold ${tab === 'energy' ? 'bg-gold-600 text-white' : 'bg-slate-900 border border-slate-700 text-slate-400'}`}>
            Energy drop
          </button>
          <button onClick={() => setTab('lever')} className={`px-3 py-1.5 rounded-full text-xs font-bold ${tab === 'lever' ? 'bg-amber-600 text-white' : 'bg-slate-900 border border-slate-700 text-slate-400'}`}>
            Lever machine
          </button>
        </div>
      </header>

      {tab === 'energy' ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 p-3">
            <svg viewBox="0 0 400 260" className="w-full h-56 md:h-64">
              <line x1="20" y1="240" x2="380" y2="240" stroke="#475569" strokeWidth="3" />
              {[0, 5, 10, 15, 20].map((h) => (
                <text key={h} x="368" y={240 - (h / 20) * 200 + 4} fontSize="9" fill="#64748b" textAnchor="end">{h}m</text>
              ))}
              <line x1="60" y1="30" x2="60" y2="240" stroke="#334155" strokeDasharray="4 4" />
              {/* energy bars */}
              <rect x="320" y={240 - (pe / (mass * G * 20)) * 200} width="18" height={(pe / (mass * G * 20)) * 200} fill="#f59e0b" opacity="0.9" rx="3" />
              <rect x="344" y={240 - ((height - fallen) / height) * (pe / (mass * G * 20)) * 200} width="18" height={((height - fallen) / height) * (pe / (mass * G * 20)) * 200} fill="#6366f1" opacity="0.9" rx="3" />
              <text x="329" y="252" fontSize="9" fill="#fbbf24" textAnchor="middle">PE</text>
              <text x="353" y="252" fontSize="9" fill="#a5b4fc" textAnchor="middle">KE</text>
              {/* ball */}
              <circle cx="120" cy={ballY} r={8 + mass / 3} fill="#38bdf8" />
              <text x="120" y={ballY + 26} fontSize="10" fill="#7dd3fc" textAnchor="middle">{mass} kg</text>
            </svg>
          </div>
          <div className="md:col-span-2 space-y-3">
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <label className="text-xs text-slate-400 flex justify-between"><span>Mass</span><span className="text-gold-300 font-mono font-bold">{mass} kg</span></label>
              <input type="range" min={1} max={20} value={mass} aria-label="mass" onChange={(e) => setMass(Number(e.target.value))} className="w-full mt-2 accent-gold-500" />
              <label className="text-xs text-slate-400 flex justify-between mt-3"><span>Drop height</span><span className="text-gold-300 font-mono font-bold">{height} m</span></label>
              <input type="range" min={1} max={20} value={height} aria-label="drop height" onChange={(e) => { setHeight(Number(e.target.value)); setDropT(null); }} className="w-full mt-2 accent-gold-500" />
              <button onClick={() => setDropT(0)} className="w-full mt-3 py-2 rounded-lg bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold">
                Drop the ball
              </button>
            </div>
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-sm space-y-1 font-mono">
              <p className="text-xs uppercase font-bold text-gold-400 tracking-wider font-sans">Energy audit</p>
              <p className="text-amber-300">PE at top = mgh = {pe} J</p>
              <p className="text-gold-300">Height now: {Math.max(0, height - fallen).toFixed(1)} m</p>
              <p className="text-emerald-300">Speed now: {fallen === 0 ? '0.00' : (Math.sqrt(2 * G * fallen)).toFixed(2)} m/s</p>
              <p className="text-slate-400">At impact all {pe} J is KE at {impactV.toFixed(1)} m/s</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 p-3">
            <svg viewBox="0 0 560 240" className="w-full h-52 md:h-60">
              <polygon points="280,190 258,220 302,220" fill="#a16207" />
              <g transform={`rotate(${angleDeg} 280 190)`}>
                <rect x={280 - beamHalf} y="182" width={beamHalf * 2} height="10" rx="4" fill={balanced ? '#f59e0b' : '#a8a29e'} />
                <rect x={280 + loadX - 16} y="150" width="34" height="30" rx="4" fill="#ef4444" opacity="0.9" />
                <text x={280 + loadX} y="142" fontSize="10" fill="#fca5a5" textAnchor="middle">load {load} N</text>
                <polygon points={`${280 + effortX},${150} ${280 + effortX - 12},${150} ${280 + effortX - 6},${168}`} fill="#22c55e" />
                <polygon points={`${280 + effortX},${150} ${280 + effortX + 12},${150} ${280 + effortX + 6},${168}`} fill="#22c55e" />
                <text x={280 + effortX} y="142" fontSize="10" fill="#86efac" textAnchor="middle">effort {effort} N</text>
              </g>
              <text x="280" y="236" fontSize="10" fill="#a1a1aa" textAnchor="middle">
                {balanced ? 'Balanced: torque of load equals torque of effort' : netTorque > 0 ? 'Load side sinks - push harder or lengthen the effort arm' : 'Effort side wins - too much push'}
              </text>
            </svg>
          </div>
          <div className="md:col-span-2 space-y-3">
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <div>
                <label className="text-xs text-slate-400 flex justify-between"><span>Load</span><span className="text-rose-300 font-mono font-bold">{load} N</span></label>
                <input type="range" min={20} max={200} step={10} value={load} aria-label="load" onChange={(e) => setLoad(Number(e.target.value))} className="w-full mt-1 accent-rose-500" />
              </div>
              <div>
                <label className="text-xs text-slate-400 flex justify-between"><span>Load arm</span><span className="text-amber-300 font-mono font-bold">{loadArm.toFixed(1)} m</span></label>
                <input type="range" min={0.5} max={3} step={0.1} value={loadArm} aria-label="load arm" onChange={(e) => setLoadArm(Number(e.target.value))} className="w-full mt-1 accent-amber-500" />
              </div>
              <div>
                <label className="text-xs text-slate-400 flex justify-between"><span>Effort arm</span><span className="text-emerald-300 font-mono font-bold">{effortArm.toFixed(1)} m</span></label>
                <input type="range" min={0.5} max={3} step={0.1} value={effortArm} aria-label="effort arm" onChange={(e) => setEffortArm(Number(e.target.value))} className="w-full mt-1 accent-emerald-500" />
              </div>
              <div>
                <label className="text-xs text-slate-400 flex justify-between"><span>Your effort</span><span className="text-lime-300 font-mono font-bold">{effort} N</span></label>
                <input type="range" min={10} max={400} step={5} value={effort} aria-label="effort" onChange={(e) => setEffort(Number(e.target.value))} className="w-full mt-1 accent-lime-500" />
              </div>
            </div>
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-sm space-y-1 font-mono">
              <p className="text-xs uppercase font-bold text-gold-400 tracking-wider font-sans">Machine maths</p>
              <p className="text-emerald-300">MA = effort arm / load arm = {ma.toFixed(2)}</p>
              <p className="text-amber-300">Effort needed = load / MA = {effortNeeded.toFixed(1)} N</p>
              <p className={balanced ? 'text-lime-300 font-bold' : 'text-slate-400'}>
                {balanced ? 'Beam balanced. You matched the ideal effort!' : `Net torque = ${netTorque.toFixed(0)} N m`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TEACHING TEXT */}
      <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <p>
          <span className="font-bold text-gold-300">Big idea:</span> work W = F x d transfers energy, measured in joules. A ball of mass m at
          height h stores PE = mgh; as it falls, PE converts into KE until at the bottom v = sqrt(2gh) - energy is transformed, never lost.
          A lever trades distance for force: the mechanical advantage MA = effort arm / load arm lets a small effort balance a big load.
        </p>
      </div>

      {/* WHAT TO TRY */}
      <footer className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Double the drop height from 5 m to 20 m and check that the impact speed only doubles (v depends on sqrt(h), not h).</p>
        <p className="mt-1">2. Set the load to 160 N and load arm 2.0 m, then tune your effort until the beam balances and compare with load / MA.</p>
      </footer>
    </div>
  );
}

export default C9_ScienceWorkEnergyAndSimpleMachinesSim;

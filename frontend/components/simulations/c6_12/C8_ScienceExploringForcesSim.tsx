'use client';
/**
 * C8_ScienceExploringForcesSim (Class 8 Science)
 *
 * ELI5: A force is a push or a pull. Whether the crate moves depends on the
 battle between your push and friction - the grip of the surface.
 * Net force = push - friction, and Newton's second law says
 * acceleration = net force / mass. Bigger mass = lazier to speed up.
 */
import React, { useEffect, useState } from 'react';

const SURFACES = [
  { name: 'Ice', mu: 0.05, color: '#7dd3fc' },
  { name: 'Wood floor', mu: 0.3, color: '#d6a05c' },
  { name: 'Rough carpet', mu: 0.7, color: '#94a3b8' },
];

const G = 9.8;

export function C8_ScienceExploringForcesSim() {
  const [push, setPush] = useState(30); // N
  const [mass, setMass] = useState(10); // kg
  const [surface, setSurface] = useState(1);
  const [pos, setPos] = useState(0);
  const [vel, setVel] = useState(0);
  const [running, setRunning] = useState(false);

  const mu = SURFACES[surface].mu;
  const friction = Math.round(mu * mass * G * 10) / 10;
  const netForce = Math.round((push - friction) * 10) / 10;
  const accel = netForce / mass;
  const moving = vel > 0.01;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setVel((v) => {
        const a = (push - friction) / mass;
        const nv = Math.max(0, v + a * 0.08);
        return nv;
      });
      setPos((p) => p + vel * 0.8 * 8);
    }, 50);
    return () => clearInterval(id);
  }, [running, push, friction, mass, vel]);

  const reset = () => {
    setPos(0);
    setVel(0);
    setRunning(false);
  };

  const boxX = Math.min(320, 40 + pos);

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-orange-700">Exploring Forces: Push, Pull and Friction</h1>

      <div className="mt-3 p-4 bg-orange-50 border border-orange-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-orange-700">Force detective work:</span> friction fights
          any motion and equals mu x weight (mass x g). If your push is smaller, the box stays put
          - static friction wins and the NET force is zero. Once you win, Newton&apos;s second law
          takes over: a = net force / mass. Halve the friction or double the push and watch a grow.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Applied push (N)</span><span className="font-mono text-orange-600">{push}</span></label>
            <input type="range" min={0} max={200} value={push} aria-label="applied force" onChange={(e) => setPush(Number(e.target.value))} className="w-full mt-1 accent-orange-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Mass of box (kg)</span><span className="font-mono text-gold-600">{mass}</span></label>
            <input type="range" min={1} max={40} value={mass} aria-label="mass" onChange={(e) => { setMass(Number(e.target.value)); }} className="w-full mt-1 accent-gold-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1">Surface (sets friction mu)</p>
            <div className="flex gap-2">
              {SURFACES.map((s, i) => (
                <button key={s.name} onClick={() => { setSurface(i); reset(); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${surface === i ? 'bg-orange-600 text-white' : 'bg-slate-200 hover:bg-slate-300'}`}>
                  {s.name} (mu {s.mu})
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setRunning((r) => !r)} className={`px-4 py-2 rounded-xl text-sm font-bold text-white transition-all ${running ? 'bg-rose-600 hover:bg-rose-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}>
              {running ? 'Let go (pause)' : 'Push it!'}
            </button>
            <button onClick={reset} className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-200 hover:bg-slate-300 transition-all">
              Reset box
            </button>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div>friction to beat: mu x m x g = {mu} x {mass} x 9.8 = <span className="font-bold text-rose-600">{friction} N</span></div>
            <div>net force = {push} - {friction} = <span className="font-bold" style={{ color: netForce > 0 ? '#059669' : '#64748b' }}>{moving ? netForce : Math.min(push, friction)} N</span></div>
            <div>acceleration a = F/m = <span className="font-bold text-gold-700">{netForce > 0 ? (Math.round(accel * 100) / 100).toFixed(2) : 0} m/s2</span></div>
            <div className="text-xs mt-1" style={{ color: moving ? '#059669' : '#b45309' }}>
              {moving ? `sliding at ${vel.toFixed(2)} m/s` : netForce > 0 ? 'about to slip - press Push it!' : 'stuck: static friction is winning'}
            </div>
          </div>
        </div>

        <div className="p-2 bg-gradient-to-b from-gold-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 360 220" className="w-full">
            {/* ground */}
            <rect x={10} y={160} width={340} height={26} fill={SURFACES[surface].color} rx={4} style={{ transition: 'fill 300ms' }} />
            {/* friction arrows */}
            <line x1={boxX + 36} y1={150} x2={boxX + 36 - Math.min(70, friction)} y2={150} stroke="#e11d48" strokeWidth={3} markerEnd="" />
            <text x={boxX - Math.min(70, friction) + 10} y={142} fontSize="9" fill="#9f1239">friction {friction} N</text>
            <line x1={boxX + 36} y1={120} x2={boxX + 36 + Math.min(80, push)} y2={120} stroke="#ea580c" strokeWidth={3} />
            <text x={boxX + 44 + Math.min(80, push) - 60} y={112} fontSize="9" fill="#9a3412">push {push} N</text>
            {/* box with mass */}
            <rect x={boxX} y={110} width={40} height={50} rx={4} fill="#c2410c" style={{ transition: 'x 60ms linear' }} />
            <text x={boxX + 20} y={140} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="bold">{mass}kg</text>
            {moving && [0, 1, 2].map((i) => (
              <path key={i} d={`M ${boxX - 8 - i * 9} 172 q -4 -4 0 -8`} stroke="#94a3b8" fill="none" strokeWidth={2} />
            ))}
            {!moving && netForce <= 0 && <text x={boxX + 20} y={190} textAnchor="middle" fontSize="10" fill="#b45309">won&apos;t budge!</text>}
            {/* status */}
            <text x={180} y={30} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
              {moving ? 'Motion! Net force speeds the box up.' : 'Static battle: push vs friction.'}
            </text>
            <text x={180} y={205} textAnchor="middle" fontSize="10" fill="#475569">on {SURFACES[surface].name.toLowerCase()} (mu = {mu})</text>
          </svg>
          <div className="px-2 pb-1 h-4 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full bg-orange-400" style={{ width: `${Math.min(100, (boxX - 40) / 320 * 100)}%`, transition: 'width 60ms linear' }} />
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>On wood with 10 kg, find the smallest push that just moves the box. Switch to ice - how much easier?</li>
          <li>Set push = 100 N on carpet: compare acceleration for 5 kg vs 20 kg. What does that prove about mass and inertia?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_ScienceExploringForcesSim;

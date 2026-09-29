'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Class 11 Physics -- Gravitation
 * Newton's law of universal gravitation: surface gravity, escape velocity and
 * circular orbital motion around a user-designed planet. Self-contained: react + tailwind only.
 */

const G = 6.674e-11; // N m^2 / kg^2
const M_EARTH = 5.972e24; // kg
const PRESETS: { name: string; mass: number; radius: number }[] = [
  { name: 'Moon', mass: 0.0123, radius: 1737 },
  { name: 'Mars', mass: 0.107, radius: 3390 },
  { name: 'Earth', mass: 1, radius: 6371 },
  { name: 'Jupiter', mass: 317.8, radius: 69911 },
];

export function C11_PhysicsGravitationSim() {
  const [massE, setMassE] = useState(1); // planet mass in Earth masses
  const [radiusKm, setRadiusKm] = useState(6371);
  const [altitudeKm, setAltitudeKm] = useState(400);
  const [playing, setPlaying] = useState(true);
  const [angle, setAngle] = useState(0);
  const rafRef = useRef<number | null>(null);

  // Real physics
  const M = massE * M_EARTH;
  const Rm = radiusKm * 1000;
  const gSurface = (G * M) / (Rm * Rm); // m/s^2
  const vEsc = Math.sqrt((2 * G * M) / Rm) / 1000; // km/s
  const rOrbit = Rm + altitudeKm * 1000;
  const vOrb = Math.sqrt((G * M) / rOrbit) / 1000; // km/s
  const periodSec = 2 * Math.PI * Math.sqrt((rOrbit * rOrbit * rOrbit) / (G * M));
  const periodMin = periodSec / 60;
  const gAtOrbit = gSurface * (Rm / rOrbit) * (Rm / rOrbit);

  // Kepler III sanity check: T^2 proportional to r^3, ratio vs a 400 km Earth orbit
  const keplerRatio = (rOrbit * rOrbit * rOrbit) / ((6771e3) ** 3);

  // Orbit animation (period mapped to 4 s wall-clock for watchability)
  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setAngle((a) => (a + (dt * 2 * Math.PI) / 4) % (2 * Math.PI));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  // Planet drawing scales logarithmically so Jupiter still fits
  const maxR = 71500;
  const planetR = 18 + 92 * (Math.log(radiusKm / 500) / Math.log(maxR / 500));
  const cx = 240;
  const cy = 210;
  const orbitR = planetR + 18 + 78 * (Math.log((altitudeKm + 500) / 500) / Math.log(80000 / 500));
  const satX = cx + orbitR * Math.cos(angle);
  const satY = cy - orbitR * Math.sin(angle);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700 font-mono">g</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 11 -- Gravitation</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Design a Planet, Launch a Satellite</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 480 420" className="w-full">
            <defs>
              <radialGradient id="planetGrad" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#312e81" />
              </radialGradient>
            </defs>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line key={i} x1={cx + 170 * Math.cos((i * Math.PI) / 4)} y1={cy + 170 * Math.sin((i * Math.PI) / 4)}
                x2={cx + 205 * Math.cos((i * Math.PI) / 4)} y2={cy + 205 * Math.sin((i * Math.PI) / 4)}
                stroke="#334155" strokeWidth={1.5} />
            ))}
            <circle cx={cx} cy={cy} r={orbitR} fill="none" stroke="#475569" strokeWidth={1.5} strokeDasharray="5 6" />
            <circle cx={cx} cy={cy} r={planetR} fill="url(#planetGrad)" stroke="#6366f1" strokeWidth={2} />
            <text x={cx} y={cy + planetR + 18} textAnchor="middle" fill="#a5b4fc" fontSize={12} fontFamily="monospace">
              M = {massE >= 10 ? massE.toFixed(0) : massE.toFixed(3)} M_E, R = {radiusKm} km
            </text>
            <line x1={satX} y1={satY} x2={cx} y2={cy} stroke="#475569" strokeWidth={1} />
            <circle cx={satX} cy={satY} r={7} fill="#34d399" />
            <line x1={satX} y1={satY} x2={satX - 26 * Math.sin(angle)} y2={satY - 26 * Math.cos(angle)}
              stroke="#fbbf24" strokeWidth={2.5} markerEnd="" />
            <polygon
              points={`${satX - 26 * Math.sin(angle)},${satY - 26 * Math.cos(angle)}
                ${satX - 36 * Math.sin(angle) + 6 * Math.cos(angle)},${satY - 36 * Math.cos(angle) - 6 * Math.sin(angle)}
                ${satX - 36 * Math.sin(angle) - 6 * Math.cos(angle)},${satY - 36 * Math.cos(angle) + 6 * Math.sin(angle)}`}
              fill="#fbbf24" />
            <text x={satX + 12} y={satY - 12} fill="#34d399" fontSize={11} fontFamily="monospace">
              v = {vOrb.toFixed(2)} km/s
            </text>
            <text x={cx} y={404} textAnchor="middle" fill="#64748b" fontSize={11} fontFamily="monospace">
              gravity always points to the center: F = G M m / r^2
            </text>
          </svg>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="flex gap-1.5 flex-wrap">
              {PRESETS.map((p) => (
                <button key={p.name}
                  onClick={() => { setMassE(p.mass); setRadiusKm(p.radius); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${massE === p.mass ? 'bg-gold-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                  {p.name}
                </button>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Mass M</span><span className="font-mono font-bold text-gold-400">{massE.toFixed(2)} Earth masses</span>
              </div>
              <input type="range" min={0.01} max={320} step={0.01} value={massE} aria-label="Planet mass"
                onChange={(e) => setMassE(Number(e.target.value))} className="w-full accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Radius R</span><span className="font-mono font-bold text-gold-400">{radiusKm} km</span>
              </div>
              <input type="range" min={500} max={71500} step={10} value={radiusKm} aria-label="Planet radius"
                onChange={(e) => setRadiusKm(Number(e.target.value))} className="w-full accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Orbit altitude h</span><span className="font-mono font-bold text-emerald-400">{altitudeKm} km</span>
              </div>
              <input type="range" min={100} max={40000} step={50} value={altitudeKm} aria-label="Orbit altitude"
                onChange={(e) => setAltitudeKm(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <button onClick={() => setPlaying((p) => !p)}
              className="w-full py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 transition">
              {playing ? 'Pause orbit' : 'Resume orbit'}
            </button>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-gold-800/60 p-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs font-mono">
            <div><span className="text-slate-500">g surface</span><div className="text-gold-300 font-bold text-sm">{gSurface.toFixed(2)} m/s^2</div></div>
            <div><span className="text-slate-500">v escape</span><div className="text-gold-300 font-bold text-sm">{vEsc.toFixed(2)} km/s</div></div>
            <div><span className="text-slate-500">v orbit</span><div className="text-emerald-300 font-bold text-sm">{vOrb.toFixed(2)} km/s</div></div>
            <div><span className="text-slate-500">Period T</span><div className="text-amber-300 font-bold text-sm">{periodMin < 200 ? `${periodMin.toFixed(1)} min` : `${(periodMin / 60).toFixed(1)} h`}</div></div>
            <div className="col-span-2"><span className="text-slate-500">g at orbit altitude</span>
              <div className="text-rose-300 font-bold text-sm">{gAtOrbit.toFixed(2)} m/s^2 (weightlessness = free fall, not zero g field)</div></div>
            <div className="col-span-2 text-[10px] text-slate-500 border-t border-slate-800 pt-2">
              Kepler check: T^2/r^3 ratio vs 400 km Earth orbit = {keplerRatio.toFixed(3)} (must be 1 at same central mass).
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Surface gravity g = GM/R^2 -- Jupiter has 318 times Earth&apos;s mass but only 11x its radius,
              so g lands near 25 m/s^2, not 3180. Escape velocity v = sqrt(2GM/R) is root-2 times the
              circular orbital speed at the same radius. An orbiting astronaut is NOT beyond gravity:
              the spacecraft and astronaut fall together, so nothing pushes on the astronaut.
            </p>
          </div>

          <div className="bg-gold-950/40 rounded-2xl border border-gold-800/50 p-4 text-xs">
            <p className="font-bold text-gold-300 mb-1">What to try</p>
            <p>1. Make the Moon&apos;s mass with Earth&apos;s radius: what is g? Now shrink Earth to lunar size -- which change hurts g more, and why?</p>
            <p>2. Find the altitude where the period becomes exactly 24 h (a geostationary orbit). Verify r^3/T^2 is identical to the 400 km case.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_PhysicsGravitationSim;

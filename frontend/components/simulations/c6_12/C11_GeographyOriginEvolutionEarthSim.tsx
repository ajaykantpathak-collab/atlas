'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 Geography -- The Origin and Evolution of the Earth
 * ONE concept: the nebular hypothesis -- a cloud collapses into a spinning
 * disk; planets accrete from rings. Scrub the timeline, grow the planets.
 * react + tailwind only.
 */

const STAGES = [
  {
    t: 0, name: 'Nebula', note: 'huge cloud of H + He and dust, cold, spread thin',
    detail: 'The solar nebula: mostly hydrogen, some helium, traces of heavier dust from older stars.'
  },
  {
    t: 1, name: 'Contraction + spin', note: 'gravity pulls in; conservation of angular momentum spins it faster',
    detail: 'As the cloud shrinks it spins faster (ice-skater effect) and flattens into a disk.'
  },
  {
    t: 2, name: 'Protosun ignites', note: 'core pressure and heat fuse hydrogen; the disk glows',
    detail: 'The central bulge becomes a protostar, then a true star. Temperature gradient appears across the disk.'
  },
  {
    t: 3, name: 'Planetesimals', note: 'dust clumps into km-sized bodies near their orbit rings',
    detail: 'Inside the frost line only rock and metal condense -- terrestrial planets. Beyond it, ices allow giants.'
  },
  {
    t: 4, name: 'Planets + moons', note: 'accretion builds the 8 planets; giant impact makes the Moon',
    detail: 'Collisions merge planetesimals into planets. A Mars-sized body strikes Earth; debris forms the Moon.'
  }
];

export function C11_GeographyOriginEvolutionEarthSim() {
  const [stage, setStage] = useState(0);
  const [spin, setSpin] = useState(50); // initial spin of the cloud
  const [mass, setMass] = useState(50); // cloud mass

  const flatten = stage; // 0 cloud blob ... 4 thin disk
  const diskRx = 150 - flatten * 18;
  const diskRy = 90 - flatten * 15;
  const sunR = stage >= 2 ? 14 + mass * 0.06 : 8 + mass * 0.04;
  const orbitSpeed = Math.max(1.2, 8 - spin / 10);
  const planetCount = stage >= 4 ? 8 : stage >= 3 ? 4 : 0;
  const moonShown = stage >= 4;

  const stars = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({ x: (i * 53) % 440, y: (i * 37) % 260, r: 0.8 + (i % 3) }), []),
  []);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700">🌌</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 11 -- Origin and Evolution of the Earth</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Nebula to Planets: Build the Solar System</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            <rect x={0} y={0} width={460} height={300} rx={10} fill="#020617" />
            {stars.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#e2e8f0" opacity={0.5} />)}
            {/* nebula / disk */}
            <ellipse cx={230} cy={150} rx={diskRx} ry={Math.max(diskRy, 16)}
              fill={stage === 0 ? 'rgba(129,140,248,0.12)' : 'rgba(251,191,36,0.10)'}
              stroke={stage === 0 ? '#818cf8' : '#fbbf24'} strokeDasharray={stage <= 1 ? '6 6' : 'none'}
              className="transition-all duration-700" />
            {/* protosun */}
            <circle cx={230} cy={150} r={sunR} fill={stage >= 2 ? '#fbbf24' : '#a78bfa'}
              className="transition-all duration-700">
              {stage >= 2 && <animate attributeName="r" values={`${sunR};${sunR + 2};${sunR}`} dur="2s" repeatCount="indefinite" />}
            </circle>
            {/* orbit rings appear with disk */}
            {stage >= 2 && [46, 74, 102, 130].map((r) => (
              <ellipse key={r} cx={230} cy={150} rx={r} ry={Math.max(10, r * (diskRy / diskRx))}
                fill="none" stroke="#334155" strokeWidth={0.8} />
            ))}
            {/* planetesimals -> planets */}
            {Array.from({ length: planetCount }, (_, i) => {
              const r = 46 + i * 12;
              const size = i < 4 ? 3 : 4.5 + (i - 4);
              const col = i < 4 ? '#e07a5f' : i === 4 || i === 5 ? '#d4a86a' : '#93c5fd';
              return (
                <g key={i}>
                  <circle r={size} fill={col}>
                    <animateMotion dur={`${(orbitSpeed * (1 + i * 0.35)).toFixed(2)}s`} repeatCount="indefinite"
                      path={`M${230 + r},150 a${r},${Math.max(8, r * (diskRy / diskRx))} 0 1,0 0.1,0`} />
                  </circle>
                </g>
              );
            })}
            {/* moon-forming impact */}
            {moonShown && (
              <g>
                <circle cx={368} cy={90} r={9} fill="#e07a5f" />
                <circle cx={384} cy={76} r={2.5} fill="#e2e8f0" />
                <line x1={374} y1={86} x2={382} y2={78} stroke="#f87171" strokeWidth={1.5} strokeDasharray="2 2" />
                <text x={396} y={78} fontSize={8} fill="#fca5a5">giant impact -{'>'} Moon</text>
              </g>
            )}
            <text x={230} y={288} textAnchor="middle" fontSize={11} fill="#e2e8f0" fontWeight="bold">
              Stage {stage + 1}: {STAGES[stage].name}
            </text>
            <text x={230} y={302} textAnchor="middle" fontSize={9} fill="#94a3b8">{STAGES[stage].note}</text>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Stage</p>
              <p className="font-mono font-bold text-gold-300">{stage + 1}/5</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Disk flatness</p>
              <p className="font-mono font-bold text-amber-300">{Math.round((flatten / 4) * 100)}%</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Bodies formed</p>
              <p className="font-mono font-bold text-emerald-300">{planetCount}{moonShown ? ' + Moon' : ''}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Scrub the timeline</span><span className="font-mono font-bold text-gold-300">{STAGES[stage].name}</span>
              </div>
              <input type="range" min={0} max={4} step={1} value={stage} aria-label="stage"
                onChange={(e) => setStage(Number(e.target.value))} className="w-full min-h-11 accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Initial spin of cloud</span><span className="font-mono font-bold text-amber-400">{spin}</span>
              </div>
              <input type="range" min={5} max={100} step={5} value={spin} aria-label="spin"
                onChange={(e) => setSpin(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Cloud mass</span><span className="font-mono font-bold text-rose-400">{mass}</span>
              </div>
              <input type="range" min={10} max={100} step={5} value={mass} aria-label="mass"
                onChange={(e) => setMass(Number(e.target.value))} className="w-full min-h-11 accent-rose-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setStage(Math.max(0, stage - 1))} disabled={stage === 0}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 disabled:opacity-40">
                &lt; Back
              </button>
              <button onClick={() => setStage(Math.min(4, stage + 1))} disabled={stage === 4}
                className="min-h-11 rounded-xl text-xs font-bold bg-gold-600 hover:bg-gold-500 disabled:opacity-40">
                Next &gt;
              </button>
            </div>
            <button onClick={() => { setStage(0); setSpin(50); setMass(50); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-300">
            <p className="font-bold text-gold-300 mb-1">{STAGES[stage].name}</p>
            <p>{STAGES[stage].detail}</p>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Planets were pulled out of the Sun by a passing star.&quot; The tidal theory is dead --
              planets grew IN PLACE from the same flattened disk, which is exactly why they all orbit
              in one plane and spin the same way.
            </p>
          </div>

          <div className="bg-gold-950/40 rounded-2xl border border-gold-800/50 p-4 text-xs">
            <p className="font-bold text-gold-300 mb-1">What to try</p>
            <p>1. Increase the cloud spin. What happens to the planet orbital speeds -- and why must a shrinking cloud spin faster?</p>
            <p>2. Jump straight to stage 3. Why do the first four bodies look rocky while the outer ones balloon with ices?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_GeographyOriginEvolutionEarthSim;

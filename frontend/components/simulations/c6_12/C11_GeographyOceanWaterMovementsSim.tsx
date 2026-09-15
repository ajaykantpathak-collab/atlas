'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 Geography -- Movements of Ocean Water
 * ONE concept: wind builds waves. Fetch x wind speed x duration decide
 * wave height, while water particles just orbit in place.
 * react + tailwind only. (Tides/currents live in the ocean-properties
 * sim; this one owns wave generation.)
 */

export function C11_GeographyOceanWaterMovementsSim() {
  const [wind, setWind] = useState(10); // m/s
  const [fetchKm, setFetchKm] = useState(200); // open water distance, km
  const [hours, setHours] = useState(6); // wind duration
  const [showOrbits, setShowOrbits] = useState(true);
  const [shore, setShore] = useState(120); // depth at shore station, m

  // Simplified SMB-style growth: H ~ 0.03 * U^2 * sqrt(F/1000) capped by duration
  const waveHeight = useMemo(() => {
    const hFetch = 0.026 * wind * wind * Math.sqrt(Math.max(fetchKm, 1) / 1000) * (1 / 9.81) * 9.81;
    const hTime = 0.026 * wind * wind * Math.sqrt(Math.max(hours, 0.2) * 4) * 0.35;
    return Math.min(hFetch, hTime, 14);
  }, [wind, fetchKm, hours]);

  const period = Math.max(2, 0.55 * Math.sqrt(waveHeight) * 4); // seconds, rough
  const steepness = waveHeight / Math.max(1, waveLength()); // H/L, breaks near 1/7
  function waveLength() { return (1.56 * period * period); } // deep-water L = 1.56 T^2 m

  // orbital radius shrinks with depth: r = r0 * exp(-2*pi*z/L)
  const orbitAt = (depthM: number) => Math.max(0.2, waveHeight / 2 * Math.exp((-2 * Math.PI * depthM) / Math.max(waveLength(), 1)));

  const breaking = shore < waveLength() / 2;
  const breakerH = waveHeight * 1.3;

  const surfPath = useMemo(() => {
    let d = 'M0,190 ';
    for (let x = 0; x <= 460; x += 8) {
      const amp = (waveHeight / 14) * 22 * (x / 460);
      const y = 190 - amp * Math.sin((x / 460) * Math.PI * 4);
      d += `L${x},${y.toFixed(1)} `;
    }
    return d + 'L460,300 L0,300 Z';
  }, [waveHeight]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-cyan-950/80 rounded-2xl border border-cyan-700">🌊</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Class 11 -- Movements of Ocean Water</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Wave Factory: Wind, Fetch and Duration</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            <rect x={0} y={0} width={460} height={300} rx={10} fill="#082f49" />
            {/* moving wave surface */}
            <path d={surfPath} fill="#0ea5e9" opacity={0.55} className="transition-all duration-500">
              <animateTransform attributeName="transform" type="translate" values="0,0; -32,0; 0,0"
                dur={`${Math.max(1.2, period / 2).toFixed(2)}s`} repeatCount="indefinite" />
            </path>
            {/* wind streaks */}
            {[40, 70, 100].map((y, i) => (
              <line key={i} x1={20 + i * 30} y1={y} x2={90 + i * 30} y2={y} stroke="#e2e8f0" strokeWidth={2}
                opacity={Math.min(0.9, wind / 25)} strokeLinecap="round">
                <animate attributeName="x1" values={`${20 + i * 30};${60 + i * 30};${20 + i * 30}`}
                  dur={`${Math.max(0.6, 3 - wind / 12).toFixed(2)}s`} repeatCount="indefinite" />
              </line>
            ))}
            {/* orbital motion column: particles orbit, radius decays with depth */}
            {showOrbits && [0, 30, 70, 120, 180].map((depth, i) => {
              const r = orbitAt(depth) * 3.2 + 1;
              return (
                <g key={i} transform={`translate(${340 - depth * 0.35},${205 + depth * 0.42})`}>
                  <ellipse rx={r} ry={r * 0.55} fill="none" stroke="#67e8f9" strokeDasharray="2 2" opacity={0.6} />
                  <circle r={2.5} fill="#a5f3fc">
                    <animateMotion dur={`${Math.max(1.5, period).toFixed(2)}s`} repeatCount="indefinite"
                      path={`M${r},0 a${r},${r * 0.55} 0 1,0 ${-2 * r},0 a${r},${r * 0.55} 0 1,0 ${2 * r},0`} />
                  </circle>
                </g>
              );
            })}
            <text x={340} y={196} fontSize={9} fill="#67e8f9" textAnchor="middle">orbit shrinks with depth</text>
            {/* depth/ shore profile right side */}
            <path d={`M460,300 L460,${300 - shore * 0.6} L${460 - 60},${300 - shore * 0.4} L${460 - 110},300 Z`}
              fill="#a8a29e" opacity={0.9} className="transition-all duration-500" />
            <text x={430} y={40 + shore * 0.4} fontSize={9} fill="#e7e5e4">{shore} m deep</text>
            {breaking && (
              <g>
                <circle cx={400} cy={150} r={breakerH * 2.2} fill="none" stroke="#fbbf24" strokeWidth={2} strokeDasharray="4 3" />
                <text x={400} y={150 - breakerH * 2.2 - 6} fontSize={10} fill="#fbbf24" textAnchor="middle">breakers!</text>
              </g>
            )}
          </svg>
          <div className="grid grid-cols-4 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Wave height</p>
              <p className="font-mono font-bold text-cyan-300">{waveHeight.toFixed(1)} m</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Period</p>
              <p className="font-mono font-bold text-sky-300">{period.toFixed(1)} s</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Length</p>
              <p className="font-mono font-bold text-indigo-300">{waveLength().toFixed(0)} m</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Steepness H/L</p>
              <p className={`font-mono font-bold ${steepness > 0.14 ? 'text-rose-400' : 'text-emerald-300'}`}>{steepness.toFixed(3)}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Wind speed</span><span className="font-mono font-bold text-slate-200">{wind} m/s</span>
              </div>
              <input type="range" min={2} max={30} step={1} value={wind} aria-label="wind speed"
                onChange={(e) => setWind(Number(e.target.value))} className="w-full min-h-11 accent-sky-400" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Fetch (open water)</span><span className="font-mono font-bold text-emerald-400">{fetchKm} km</span>
              </div>
              <input type="range" min={10} max={2000} step={10} value={fetchKm} aria-label="fetch"
                onChange={(e) => setFetchKm(Number(e.target.value))} className="w-full min-h-11 accent-emerald-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Wind duration</span><span className="font-mono font-bold text-amber-400">{hours} h</span>
              </div>
              <input type="range" min={1} max={48} step={1} value={hours} aria-label="duration"
                onChange={(e) => setHours(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Depth at shore station</span><span className="font-mono font-bold text-stone-300">{shore} m</span>
              </div>
              <input type="range" min={5} max={150} step={5} value={shore} aria-label="shore depth"
                onChange={(e) => setShore(Number(e.target.value))} className="w-full min-h-11 accent-stone-400" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setShowOrbits(!showOrbits)}
                className={`min-h-11 rounded-xl text-xs font-bold ${showOrbits ? 'bg-cyan-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Orbits: {showOrbits ? 'ON' : 'OFF'}
              </button>
              <button onClick={() => { setWind(10); setFetchKm(200); setHours(6); setShore(120); setShowOrbits(true); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Waves carry water toward the shore.&quot; Watch the orbiting particles: each one just
              loops in place -- the WAVE moves, the water does not (until it breaks). Touch bottom,
              slow down, pile up: that is a breaker, not a delivery service.
            </p>
          </div>

          <div className="bg-cyan-950/40 rounded-2xl border border-cyan-800/50 p-4 text-xs">
            <p className="font-bold text-cyan-300 mb-1">What to try</p>
            <p>1. Triple the wind from 10 to 30 m/s. By what factor does wave height grow -- 3, 6 or 9? (Hint: it scales with wind squared.)</p>
            <p>2. Shrink the shore depth until breakers appear. Why does a 6 m wave suddenly stand up there?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_GeographyOceanWaterMovementsSim;

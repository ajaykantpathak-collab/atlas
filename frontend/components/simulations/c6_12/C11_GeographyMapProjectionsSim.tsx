'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 Geography -- Map Projections
 * ONE concept: you cannot flatten a sphere without lying somewhere.
 * Mercator keeps shapes but inflates area near the poles; equal-area
 * keeps area but crushes shapes. react + tailwind only.
 */

type Proj = 'mercator' | 'equalarea' | 'sinusoidal';

const RAD = Math.PI / 180;

function projX(lon: number, proj: Proj, lat: number) {
  if (proj === 'sinusoidal') return lon * Math.cos(lat * RAD);
  return lon;
}
function projY(lat: number, proj: Proj) {
  if (proj === 'mercator') return Math.log(Math.tan(Math.PI / 4 + (lat * RAD) / 2)) / RAD;
  return lat; // cylindrical equal-area (Lambert): y = lat (scaled), area-true
}

const PARALLELS = [-60, -30, 0, 30, 60];

export function C11_GeographyMapProjectionsSim() {
  const [proj, setProj] = useState<Proj>('mercator');
  const [lat, setLat] = useState(60); // Tissot circle latitude
  const [lon, setLon] = useState(0);
  const [showTissot, setShowTissot] = useState(true);

  const sec = 1 / Math.cos(lat * RAD); // horizontal scale factor
  const areaFactor = proj === 'mercator' ? sec * sec : proj === 'equalarea' ? 1 : Math.cos(lat * RAD);

  const grid = useMemo(() => {
    const lines: string[] = [];
    for (const p of PARALLELS) {
      let d = '';
      for (let l = -180; l <= 180; l += 6) {
        const x = 230 + projX(l, proj, p) * 0.62;
        const y = 150 - projY(p, proj) * 0.62;
        d += `${l === -180 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)} `;
      }
      lines.push(d);
    }
    return lines;
  }, [proj]);

  const meridians = useMemo(() => {
    const lines: string[] = [];
    for (let l = -150; l <= 150; l += 30) {
      let d = '';
      for (let p = -80; p <= 80; p += 4) {
        const x = 230 + projX(l, proj, p) * 0.62;
        const y = 150 - projY(p, proj) * 0.62;
        d += `${p === -80 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)} `;
      }
      lines.push(d);
    }
    return lines;
  }, [proj]);

  // Tissot circle drawn as an ellipse: rx = sec(lat), ry depends on projection
  const rx = proj === 'mercator' ? 14 * sec : proj === 'equalarea' ? 14 / sec : 14;
  const ry = proj === 'mercator' ? 14 * sec : proj === 'equalarea' ? 14 * sec : 14 * sec;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700">🗺️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Class 11 -- Map Projections</span>
          <h1 className="text-xl md:text-2xl font-extrabold">The Lying Grid: Shape vs Area</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            <rect x={40} y={20} width={380} height={260} rx={8} fill="#0b1220" stroke="#1e293b" />
            {grid.map((d, i) => (
              <path key={`p${i}`} d={d} fill="none" stroke="#334155" strokeWidth={1}
                className="transition-all duration-500" />
            ))}
            {meridians.map((d, i) => (
              <path key={`m${i}`} d={d} fill="none" stroke="#1e293b" strokeWidth={1}
                className="transition-all duration-500" />
            ))}
            {/* Tissot indicatrix at (lon, lat) */}
            {showTissot && (() => {
              const cx = 230 + projX(lon, proj, lat) * 0.62;
              const cy = 150 - projY(lat, proj) * 0.62;
              return (
                <g className="transition-all duration-300">
                  <ellipse cx={cx} cy={Math.max(30, Math.min(270, cy))} rx={Math.min(rx, 90)}
                    ry={Math.min(ry, 90)} fill="rgba(244,114,182,0.25)" stroke="#f472b6" strokeWidth={2} />
                  <text x={cx + Math.min(rx, 90) + 6} y={cy} fontSize={9} fill="#f472b6" fontFamily="monospace">
                    area x{areaFactor.toFixed(2)}
                  </text>
                </g>
              );
            })()}
            {/* reference circles on a true globe for comparison */}
            <circle cx={418} cy={268} r={0.1} fill="none" />
            <text x={48} y={34} fontSize={10} fill="#94a3b8">
              {proj === 'mercator' ? 'Mercator: conformal, poles explode'
                : proj === 'equalarea' ? 'Cylindrical equal-area: area true, shape crushed'
                : 'Sinusoidal: equal-area, meridians curve'}
            </text>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Circle latitude</p>
              <p className="font-mono font-bold text-pink-400">{lat}&deg;</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Area distortion</p>
              <p className="font-mono font-bold text-rose-300">x{areaFactor.toFixed(2)}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Stretch (E-W)</p>
              <p className="font-mono font-bold text-amber-300">x{rx / 14 > 4 ? '>4' : (rx / 14).toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {(['mercator', 'equalarea', 'sinusoidal'] as Proj[]).map((p) => (
                <button key={p} onClick={() => setProj(p)}
                  className={`min-h-11 rounded-xl text-[10px] font-bold ${proj === p ? 'bg-indigo-500 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  {p === 'equalarea' ? 'Equal-area' : p === 'mercator' ? 'Mercator' : 'Sinusoidal'}
                </button>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Move the test circle</span><span className="font-mono font-bold text-pink-400">{lat}&deg; {lat >= 0 ? 'N' : 'S'}</span>
              </div>
              <input type="range" min={-80} max={80} step={2} value={lat} aria-label="latitude"
                onChange={(e) => setLat(Number(e.target.value))} className="w-full min-h-11 accent-pink-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>East-west position</span><span className="font-mono font-bold text-amber-400">{lon}&deg;</span>
              </div>
              <input type="range" min={-150} max={150} step={5} value={lon} aria-label="longitude"
                onChange={(e) => setLon(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setShowTissot(!showTissot)}
                className={`min-h-11 rounded-xl text-xs font-bold ${showTissot ? 'bg-pink-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Tissot circle
              </button>
              <button onClick={() => { setProj('mercator'); setLat(60); setLon(0); setShowTissot(true); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Greenland is as big as Africa.&quot; On the globe, Greenland (~2.2 million km2) is
              about 1/14 of Africa (~30 million km2). Park the circle at 60&deg; N on Mercator: area
              x{areaFactor.toFixed(1)} -- four such inflations manufacture the myth.
            </p>
          </div>

          <div className="bg-indigo-950/40 rounded-2xl border border-indigo-800/50 p-4 text-xs">
            <p className="font-bold text-indigo-300 mb-1">What to try</p>
            <p>1. Slide the circle from 0 to 80&deg; N on Mercator. At what latitude does area distortion pass x10?</p>
            <p>2. Switch to Equal-area at 60&deg; N. Area says x1.00 -- but look at the circle&apos;s shape. What did you trade away?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_GeographyMapProjectionsSim;

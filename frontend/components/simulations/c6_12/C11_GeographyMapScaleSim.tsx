'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 Geography -- Map Scale
 * ONE concept: scale is a ratio (RF). The same map distance means wildly
 * different ground distances, and detail lives only at large scales.
 * react + tailwind only.
 */

type Mode = 'rf' | 'verbal' | 'graphic';

export function C11_GeographyMapScaleSim() {
  const [rf, setRf] = useState(50000); // 1:RF denominator (log-ish)
  const [mapCm, setMapCm] = useState(6); // measured map distance
  const [mode, setMode] = useState<Mode>('rf');
  const [detail, setDetail] = useState(true);

  const groundKm = (mapCm * 100000) / rf / 100000; // cm -> km via ratio: mapCm * RF / 100000
  // large scale = small denominator
  const scaleLabel = rf <= 25000 ? 'Large scale' : rf <= 250000 ? 'Medium scale' : 'Small scale';
  const detailLevel = Math.round(Math.max(0, Math.min(10, (500000 / rf) * 10)));
  const gridGap = useMemo(() => Math.max(8, Math.min(60, Math.sqrt(rf / 2500))), [rf]);

  const kmPerCm = rf / 100000;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-amber-950/80 rounded-2xl border border-amber-700">📐</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Class 11 -- Map Scale</span>
          <h1 className="text-xl md:text-2xl font-extrabold">One Ratio, Three Costumes: RF, Verbal, Graphic</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            <rect x={0} y={0} width={460} height={300} rx={10} fill="#0b1220" />
            {/* detail grid: density = scale */}
            <g className="transition-all duration-500">
              {detail && Array.from({ length: Math.ceil(440 / gridGap) + 1 }, (_, i) => (
                <line key={`v${i}`} x1={10 + i * gridGap} y1={10} x2={10 + i * gridGap} y2={230}
                  stroke="#1e293b" strokeWidth={1} />
              ))}
              {detail && Array.from({ length: Math.ceil(220 / gridGap) + 1 }, (_, i) => (
                <line key={`h${i}`} x1={10} y1={10 + i * gridGap} x2={450} y2={10 + i * gridGap}
                  stroke="#1e293b" strokeWidth={1} />
              ))}
            </g>
            {/* a road of mapCm length (1 cm = 30 px) */}
            <line x1={40} y1={120} x2={40 + mapCm * 30} y2={120} stroke="#fbbf24" strokeWidth={5}
              className="transition-all duration-300" strokeLinecap="round" />
            <circle cx={40} cy={120} r={6} fill="#38bdf8" />
            <text x={40} y={104} fontSize={10} fill="#38bdf8">Home</text>
            <circle cx={40 + mapCm * 30} cy={120} r={6} fill="#f472b6" />
            <text x={24 + mapCm * 30} y={104} fontSize={10} fill="#f472b6">School</text>
            <text x={40 + mapCm * 15} y={142} fontSize={11} fill="#fbbf24" fontFamily="monospace" textAnchor="middle">
              {mapCm.toFixed(1)} cm on paper = {groundKm.toFixed(2)} km on ground
            </text>
            {/* graphic scale bar */}
            <g transform="translate(40,250)">
              <text x={0} y={-8} fontSize={10} fill="#94a3b8">graphic scale (updates live)</text>
              {Array.from({ length: 6 }, (_, i) => (
                  <rect key={i} x={i * 60} y={0} width={60} height={14}
                    fill={i % 2 === 0 ? '#e2e8f0' : '#334155'} stroke="#020617" />
              ))}
              <text x={0} y={30} fontSize={9} fill="#64748b">0</text>
              <text x={120} y={30} fontSize={9} fill="#64748b">{(2 * kmPerCm).toFixed(1)} km</text>
              <text x={300} y={30} fontSize={9} fill="#64748b">{(6 * kmPerCm).toFixed(1)} km</text>
            </g>
            <text x={40} y={40} fontSize={12} fill="#e2e8f0" fontFamily="monospace">
              {mode === 'rf' ? `RF  1 : ${rf.toLocaleString('en-US')}`
                : mode === 'verbal' ? `1 cm = ${kmPerCm.toFixed(kmPerCm < 1 ? 2 : 1)} km`
                : 'use the bar below the map'}
            </text>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Scale class</p>
              <p className="font-mono font-bold text-amber-300">{scaleLabel}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">1 cm on paper</p>
              <p className="font-mono font-bold text-sky-300">{kmPerCm.toFixed(kmPerCm < 1 ? 2 : 1)} km</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Detail level</p>
              <p className="font-mono font-bold text-emerald-300">{detailLevel}/10</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>RF denominator (log slider)</span>
                <span className="font-mono font-bold text-amber-400">1 : {rf.toLocaleString('en-US')}</span>
              </div>
              <input type="range" min={0} max={100} step={1} value={Math.round((Math.log10(rf) - 3) * 33.3)}
                aria-label="scale denominator"
                onChange={(e) => setRf(Math.round(Math.pow(10, 3 + Number(e.target.value) / 33.3) / 500) * 500)}
                className="w-full min-h-11 accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Distance measured on map</span><span className="font-mono font-bold text-sky-400">{mapCm.toFixed(1)} cm</span>
              </div>
              <input type="range" min={0.5} max={12} step={0.5} value={mapCm} aria-label="map distance"
                onChange={(e) => setMapCm(Number(e.target.value))} className="w-full min-h-11 accent-sky-500" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['rf', 'verbal', 'graphic'] as Mode[]).map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  className={`min-h-11 rounded-xl text-[10px] font-bold ${mode === m ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  {m === 'rf' ? 'RF' : m === 'verbal' ? 'Verbal' : 'Graphic'}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setDetail(!detail)}
                className={`min-h-11 rounded-xl text-xs font-bold ${detail ? 'bg-emerald-600 text-white' : 'bg-slate-800'}`}>
                Detail grid
              </button>
              <button onClick={() => { setRf(50000); setMapCm(6); setMode('rf'); setDetail(true); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;1:1,000,000 is bigger than 1:50,000 because the number is bigger.&quot; It is the
              opposite -- 1:50,000 is the LARGE scale (1 km shows as 2 cm: you see streets). At
              1:1,000,000 that same km is a hair-thin 1 mm: whole districts fit, detail dies.
            </p>
          </div>

          <div className="bg-amber-950/40 rounded-2xl border border-amber-800/50 p-4 text-xs">
            <p className="font-bold text-amber-300 mb-1">What to try</p>
            <p>1. Set RF so that your 6 cm road equals exactly 30 km. What is the denominator?</p>
            <p>2. Drag the denominator to 1,000,000 and watch the detail level. Would you plan a trekking route on this map? Why not?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_GeographyMapScaleSim;

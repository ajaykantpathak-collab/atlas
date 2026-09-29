'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 Geography -- Atmospheric Circulation and Weather Systems
 * ONE concept: why surface winds curve. Pressure gradient starts the flow,
 * Earth's rotation (Coriolis) bends it. Spin the planet, place the probe,
 * read the belt. Self-contained, react + tailwind only.
 */

type Hemisphere = 'north' | 'south';

const BELTS = [
  { lat: 0, name: 'ITCZ / Doldrums', pressure: 'Low', wind: 'air rises, calm' },
  { lat: 30, name: 'Subtropical High', pressure: 'High', wind: 'air sinks, calm' },
  { lat: 60, name: 'Subpolar Low', pressure: 'Low', wind: 'rising, stormy' },
  { lat: 90, name: 'Polar High', pressure: 'High', wind: 'sinking, calm' }
];

function beltFor(lat: number) {
  const a = Math.abs(lat);
  if (a < 12) return BELTS[0];
  if (a < 45) return { lat: 30, name: 'Trade Winds belt', pressure: 'High to Low', wind: 'steady trades' };
  if (a < 75) return { lat: 60, name: 'Westerlies belt', pressure: 'Low', wind: 'variable westerlies' };
  return BELTS[3];
}

function surfaceWind(lat: number, spin: number, hemi: Hemisphere) {
  const a = Math.abs(lat);
  const side = (lat >= 0 ? 'north' : 'south') as Hemisphere;
  // base flow: poleward in Hadley cell, equatorward in Ferrel/Polar (simplified)
  let baseDeg: number; // 0 = due poleward, measured clockwise on screen
  if (a <= 30) baseDeg = side === 'north' ? 20 : -20;
  else baseDeg = side === 'north' ? 200 : -200;
  // Coriolis deflects right in NH, left in SH; strength = sin(lat) * spin
  const corr = Math.sin((a * Math.PI) / 180) * spin * 60 * (hemi === side ? 1 : -1);
  return baseDeg + corr;
}

export function C11_GeographyAtmosphericCirculationSim() {
  const [spin, setSpin] = useState(1); // Earth rotation speed, 0 = stopped
  const [lat, setLat] = useState(20); // probe latitude, -90..90
  const [showCells, setShowCells] = useState(true);
  const [hemiView, setHemiView] = useState<Hemisphere>('north');

  const belt = useMemo(() => beltFor(lat), [lat]);
  const windDeg = useMemo(() => surfaceWind(lat, spin, hemiView), [lat, spin, hemiView]);
  const coriolisFactor = Math.abs(Math.sin((Math.abs(lat) * Math.PI) / 180)) * spin;
  const deflectPct = Math.round(coriolisFactor * 100);

  const cellRise = (a: number) => (a < 30 || (a >= 55 && a <= 65)); // rising at 0 and 60

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700">🌀</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 11 -- Atmospheric Circulation</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Why Winds Curve: the Three-Cell Machine</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 340" className="w-full">
            {/* hemispheres */}
            <rect x={30} y={40} width={190} height={260} rx={10} fill="#0b1220" stroke="#1e293b" />
            <rect x={240} y={40} width={190} height={260} rx={10} fill="#0b1220" stroke="#1e293b" />
            <text x={125} y={32} textAnchor="middle" fontSize={11} fill="#94a3b8">North Hemisphere</text>
            <text x={335} y={32} textAnchor="middle" fontSize={11} fill="#94a3b8">South Hemisphere</text>
            {/* equator + belts gridlines */}
            {[{ y: 170, l: '0 (Equator)' }, { y: 80, l: '30' }, { y: 130, l: '' }, { y: 225, l: '60' }, { y: 270, l: '90 pole' }].map((g, i) => (
              <g key={i}>
                <line x1={30} y1={g.y} x2={430} y2={g.y} stroke="#334155" strokeDasharray="4 4" />
                {g.l && <text x={435} y={g.y + 4} fontSize={9} fill="#64748b">{g.l}</text>}
              </g>
            ))}
            {/* circulation cells as ellipses with rising/sinking arrows */}
            {showCells && ([
              { cxN: 125, cxS: 335, y: 125, r: 38, rising: true },   // Hadley
              { cxN: 125, cxS: 335, y: 170, r: 22, rising: false },  // Ferrel
              { cxN: 125, cxS: 335, y: 245, r: 24, rising: false }   // Polar
            ] as const).map((c, i) => (
              <g key={i} className="transition-all duration-500"
                 style={{ opacity: spin > 0.05 ? 1 : 0.35 }}>
                <ellipse cx={c.cxN} cy={c.y} rx={c.r} ry={c.r * 0.8} fill="none" stroke="#818cf8" strokeWidth={2} />
                <ellipse cx={c.cxS} cy={c.y} rx={c.r} ry={c.r * 0.8} fill="none" stroke="#818cf8" strokeWidth={2} />
                <circle r={3.5} fill="#22d3ee">
                  <animateMotion dur={`${(6 / Math.max(spin, 0.15)).toFixed(2)}s`} repeatCount="indefinite"
                    path={`M${c.cxN - c.r},${c.y} a${c.r},${c.r * 0.8} 0 1,0 ${c.r * 2},0 a${c.r},${c.r * 0.8} 0 1,0 -${c.r * 2},0`} />
                </circle>
                <circle r={3.5} fill="#22d3ee">
                  <animateMotion dur={`${(6 / Math.max(spin, 0.15)).toFixed(2)}s`} repeatCount="indefinite"
                    path={`M${c.cxS + c.r},${c.y} a${c.r},${c.r * 0.8} 0 1,1 -${c.r * 2},0 a${c.r},${c.r * 0.8} 0 1,1 ${c.r * 2},0`} />
                </circle>
                <text x={c.cxN + c.r + 6} y={c.y - 12} fontSize={8} fill={c.rising ? '#fbbf24' : '#38bdf8'}>
                  {i === 0 ? 'Hadley' : i === 1 ? 'Ferrel' : 'Polar'}
                </text>
              </g>
            ))}
            {/* probe marker + rotating wind arrow */}
            {(() => {
              const px = lat >= 0 ? 125 : 335;
              const py = 170 - Math.max(-1, Math.min(1, Math.abs(lat) / 90)) * (lat >= 0 ? 130 : -130);
              return (
                <g className="transition-all duration-300"
                   style={{ transform: `translate(${px}px, ${py}px)` }}>
                  <circle r={5} fill="#f472b6" stroke="#fff" />
                  <g className="transition-transform duration-500"
                     style={{ transform: `rotate(${windDeg}deg)` }}>
                    <line x1={0} y1={0} x2={46} y2={0} stroke="#f472b6" strokeWidth={3} />
                    <polygon points="46,0 38,-4 38,4" fill="#f472b6" />
                  </g>
                </g>
              );
            })()}
            <text x={230} y={322} textAnchor="middle" fontSize={10} fill="#94a3b8">
              surface wind at probe = {windDeg >= 0 ? '' : '-'}{Math.round(((windDeg % 360) + 360) % 360)} deg screen
            </text>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Probe latitude</p>
              <p className="font-mono font-bold text-pink-400">{lat}&deg; {lat >= 0 ? 'N' : 'S'}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Coriolis strength</p>
              <p className="font-mono font-bold text-gold-300">{deflectPct}%</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Belt</p>
              <p className="font-mono font-bold text-gold-300">{belt.name}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Earth rotation speed</span>
                <span className="font-mono font-bold text-amber-400">{spin.toFixed(2)}x real</span>
              </div>
              <input type="range" min={0} max={2} step={0.05} value={spin} aria-label="rotation speed"
                onChange={(e) => setSpin(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Probe latitude</span>
                <span className="font-mono font-bold text-pink-400">{lat}&deg;</span>
              </div>
              <input type="range" min={-90} max={90} step={1} value={lat} aria-label="probe latitude"
                onChange={(e) => setLat(Number(e.target.value))} className="w-full min-h-11 accent-pink-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setShowCells(!showCells)}
                className={`min-h-11 rounded-xl text-xs font-bold ${showCells ? 'bg-gold-500 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                {showCells ? 'Cells: ON' : 'Cells: OFF'}
              </button>
              <button onClick={() => setHemiView(hemiView === 'north' ? 'south' : 'north')}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700">
                Arrow side: {hemiView === 'north' ? 'NH rule' : 'SH rule'}
              </button>
            </div>
            <button onClick={() => { setSpin(1); setLat(20); setShowCells(true); setHemiView('north'); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">
              Reset
            </button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Wind blows in a straight line from high to low pressure.&quot; It would -- if Earth
              did not spin. Set rotation to 0 and watch every arrow straighten; restore it and the same
              pressure gradient bends the flow {deflectPct}% (right in the north, left in the south:
              Coriolis = sin(latitude)).
            </p>
          </div>

          <div className="bg-gold-950/40 rounded-2xl border border-gold-800/50 p-4 text-xs">
            <p className="font-bold text-gold-300 mb-1">What to try</p>
            <p>1. Slide the probe to 30&deg; N and 60&deg; N. Which belt gives the calm, dry deserts, and which gives stormy lows?</p>
            <p>2. Stop the planet (rotation 0). Now find any latitude where winds still curve. Explain why you cannot.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_GeographyAtmosphericCirculationSim;

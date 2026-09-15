'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 Geography -- Movements of Ocean Water
 * ONE concept: surface CURRENTS. Trade winds + westerlies + Coriolis spin
 * a subtropical GYRE. Warm water rides the WESTERN boundary poleward (fast);
 * cold water returns on the EASTERN side (slow). That split decides coastal
 * winter warmth, fog, deserts, fisheries and sailing times.
 * react + tailwind only.
 */

type Coast = 'west' | 'east';

const CX = 205, CY = 152, RX = 112, RY = 94;

export function C11_GeographyOceanCurrentsSim() {
  const [south, setSouth] = useState(false);
  const [wind, setWind] = useState(18); // m/s, trade/westerly strength
  const [coast, setCoast] = useState<Coast>('west');
  const [sailWith, setSailWith] = useState(true);

  // speeds: basin drift ~ wind*0.012; western boundary intensified ~6x (Stommel)
  const vBase = 0.10 + wind * 0.012; // m/s
  const vWest = vBase * 6;
  const vEast = vBase * 1.5;
  const warmName = south ? 'Brazil Current' : 'Gulf Stream';
  const coldName = south ? 'Benguela Current' : 'Canary Current';

  const fx = useMemo(() => {
    const warm = coast === 'west';
    const v = warm ? vWest : vEast; // m/s
    const anomaly = warm ? Math.min(9, 1.5 + vWest * 3.2) : -Math.min(7, 1 + vEast * 8);
    const fogDays = warm ? Math.round(8 + vWest * 2) : Math.round(Math.min(160, 25 + vEast * 250));
    const fishery = warm ? 1.2 : Math.min(9.5, 0.5 + wind * 0.26); // upwelling index /10
    const stormFuel = warm ? Math.min(10, 3 + vWest * 2.4) : 1.5; // cyclone fuel /10
    return { warm, v, anomaly, fogDays, fishery, stormFuel };
  }, [coast, vWest, vEast, wind]);

  // navigation: 5000 km crossing, hull 22 km/h, warm current adds/subtracts
  const alongKmh = vWest * 3.6;
  const shipSpeed = Math.max(8, sailWith ? 22 + alongKmh : 22 - alongKmh);
  const days = 5000 / shipSpeed / 24;
  const calmDays = 5000 / 22 / 24;

  const sign = south ? -1 : 1;
  const arrows = Array.from({ length: 12 }, (_, i) => {
    const th = (i / 12) * 2 * Math.PI;
    const x = CX + RX * Math.cos(th), y = CY + RY * Math.sin(th);
    let tx = -RX * Math.sin(th), ty = RY * Math.cos(th);
    const n = Math.hypot(tx, ty);
    tx = (tx / n) * sign; ty = (ty / n) * sign;
    const isWest = x < CX;
    const v = isWest ? vWest : vEast;
    const color = isWest ? '#fb923c' : '#38bdf8';
    const w = Math.min(9, 1.5 + (v / vBase) * 0.7);
    const dur = Math.max(0.45, 3.2 / Math.max(0.25, v));
    return { x, y, tx, ty, color, w, dur, key: i };
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-sky-950/80 rounded-2xl border border-sky-700">🌀</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Class 11 -- Movements of Ocean Water</span>
          <h1 className="text-xl md:text-2xl font-extrabold">The Gyre Engine: Warm West, Cold East</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            <rect x={0} y={0} width={460} height={300} rx={10} fill="#082f49" />
            <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="#0c4a6e" stroke="#155e75" strokeWidth={2} />
            {/* wind belts: westerlies (top), trades (bottom) */}
            {[0, 1, 2].map((i) => (
              <g key={`w${i}`} opacity={0.35 + (wind / 35) * 0.5}>
                <line x1={90 + i * 30} y1={26} x2={140 + i * 30} y2={26} stroke="#e2e8f0" strokeWidth={2.5}>
                  <animate attributeName="x1" values={`${90 + i * 30};${112 + i * 30};${90 + i * 30}`} dur="1.1s" repeatCount="indefinite" />
                </line>
                <text x={36} y={30} fontSize={9} fill="#e2e8f0">westerlies &rarr;</text>
                <line x1={150 - i * 30} y1={278} x2={100 - i * 30} y2={278} stroke="#cbd5e1" strokeWidth={2.5}>
                  <animate attributeName="x1" values={`${150 - i * 30};${128 - i * 30};${150 - i * 30}`} dur="1.3s" repeatCount="indefinite" />
                </line>
                <text x={330} y={282} fontSize={9} fill="#cbd5e1">&larr; trade winds</text>
              </g>
            ))}
            {/* gyre arrows: fast warm west, slow cold east */}
            {arrows.map((a) => (
              <g key={a.key}>
                <line x1={a.x - a.tx * 12} y1={a.y - a.ty * 12} x2={a.x + a.tx * 12} y2={a.y + a.ty * 12}
                  stroke={a.color} strokeWidth={a.w} strokeLinecap="round" strokeDasharray="7 9" opacity={0.95}>
                  <animate attributeName="stroke-dashoffset" values="0;-16" dur={`${a.dur}s`} repeatCount="indefinite" />
                </line>
                <polygon
                  points={`${a.x + a.tx * 18},${a.y + a.ty * 18} ${a.x + a.tx * 6 - a.ty * 5},${a.y + a.ty * 6 + a.tx * 5} ${a.x + a.tx * 6 + a.ty * 5},${a.y + a.ty * 6 - a.tx * 5}`}
                  fill={a.color} />
              </g>
            ))}
            {/* coast stations */}
            <circle cx={CX - RX - 8} cy={CY} r={7} fill="#fb923c" className="transition-all duration-300" />
            <text x={CX - RX - 8} y={CY + 24} fontSize={9} fill="#fdba74" textAnchor="middle">{warmName}</text>
            <circle cx={CX + RX + 8} cy={CY} r={7} fill="#38bdf8" className="transition-all duration-300" />
            <text x={CX + RX + 8} y={CY + 24} fontSize={9} fill="#7dd3fc" textAnchor="middle">{coldName}</text>
            <text x={14} y={70} fontSize={9} fill="#94a3b8">{south ? 'S' : 'N'} hemisphere: gyre turns {south ? 'anticlockwise' : 'clockwise'}</text>
            <text x={446} y={118} fontSize={9} fill="#fdba74" textAnchor="end">warm, fast</text>
            <text x={446} y={190} fontSize={9} fill="#7dd3fc" textAnchor="end">cold, slow</text>
          </svg>
          <div className="grid grid-cols-4 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">West current</p>
              <p className="font-mono font-bold text-orange-300">{vWest.toFixed(2)} m/s</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">East current</p>
              <p className="font-mono font-bold text-sky-300">{vEast.toFixed(2)} m/s</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Winter anomaly</p>
              <p className={`font-mono font-bold ${fx.anomaly >= 0 ? 'text-orange-300' : 'text-sky-300'}`}>{fx.anomaly >= 0 ? '+' : ''}{fx.anomaly.toFixed(1)} &deg;C</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Crossing (5000 km)</p>
              <p className="font-mono font-bold text-emerald-300">{days.toFixed(1)} days</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setSouth(false)}
                className={`min-h-11 rounded-xl text-xs font-bold ${!south ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                North hemisphere
              </button>
              <button onClick={() => setSouth(true)}
                className={`min-h-11 rounded-xl text-xs font-bold ${south ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                South hemisphere
              </button>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Wind strength (trades + westerlies)</span><span className="font-mono font-bold text-slate-200">{wind} m/s</span>
              </div>
              <input type="range" min={5} max={35} step={1} value={wind} aria-label="wind strength"
                onChange={(e) => setWind(Number(e.target.value))} className="w-full min-h-11 accent-slate-300" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setCoast('west')}
                className={`min-h-11 rounded-xl text-[10px] font-bold ${coast === 'west' ? 'bg-orange-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Station: {warmName}
              </button>
              <button onClick={() => setCoast('east')}
                className={`min-h-11 rounded-xl text-[10px] font-bold ${coast === 'east' ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Station: {coldName}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setSailWith(true)}
                className={`min-h-11 rounded-xl text-[10px] font-bold ${sailWith ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Sail with the current
              </button>
              <button onClick={() => setSailWith(false)}
                className={`min-h-11 rounded-xl text-[10px] font-bold ${!sailWith ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Sail against it
              </button>
            </div>
            <button onClick={() => { setSouth(false); setWind(18); setCoast('west'); setSailWith(true); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-slate-500">Coast water source</p>
              <p className={`font-bold ${fx.warm ? 'text-orange-300' : 'text-sky-300'}`}>{fx.warm ? 'tropical, 26 &deg;C' : 'subpolar, 12 &deg;C'}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500">Fog days / year</p>
              <p className="font-bold text-slate-200">{fx.fogDays} days</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500">Fishery index (upwelling)</p>
              <p className="font-bold text-emerald-300">{fx.fishery.toFixed(1)} / 10</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500">Coast landscape</p>
              <p className="font-bold text-amber-200">{fx.warm ? 'humid, storm-fuelled, green' : 'fog-desert coast'}</p>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Britain is mild because it sits at a low latitude.&quot; Britain is at ~51&deg;N -- north of
              most of Canada. Same gyre, two fates: the warm current gives Europe +{ (1.5 + vWest * 3.2).toFixed(0) }&deg;C
              winters while the cold current locks Labrador in ice at the same latitude.
            </p>
          </div>

          <div className="bg-sky-950/40 rounded-2xl border border-sky-800/50 p-4 text-xs">
            <p className="font-bold text-sky-300 mb-1">What to try</p>
            <p>1. Flip to the Southern Hemisphere. Which way does the gyre turn now -- and which coast keeps the cold, foggy, fish-rich current?</p>
            <p>2. Set wind to 5 m/s, then 35. How many days does the crossing swing by -- and why does the western current grow about six times faster?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_GeographyOceanCurrentsSim;

'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 Geography -- Water in the Atmosphere
 * ONE concept: relative humidity is how full the air's water tank is,
 * and the tank shrinks as air cools. Cross the dew point and you get
 * dew, fog, cloud or rain. react + tailwind only.
 */

// saturation vapour pressure (hPa), Magnus-like approximation
function es(T: number) {
  return 6.11 * Math.exp((17.27 * T) / (T + 237.3));
}

export function C11_GeographyWaterAtmosphereSim() {
  const [temp, setTemp] = useState(30); // deg C
  const [water, setWater] = useState(15); // g/kg absolute humidity
  const [lift, setLift] = useState(0); // parcel lift, km

  const parcelTemp = temp - 6.5 * lift; // environmental lapse inside parcel
  // actual vapour pressure from mixing ratio (g/kg) ~ e = w*p/ (0.622 + w*0.001?) simplified
  const eAct = (water * 1013) / (622 + water);
  const eSat = es(parcelTemp);
  const rh = Math.min(100, (eAct / eSat) * 100);
  // dew point: temperature where es(T) = eAct, invert numerically
  const dewPoint = useMemo(() => {
    let lo = -40, hi = 60;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (es(mid) < eAct) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  }, [water]);

  const condensing = rh >= 100;
  const form = condensing
    ? lift >= 1 ? 'CLOUD (and rain if it grows)'
      : temp <= 2 ? 'FOG'
        : dewPoint >= 25 ? 'HEAVY DEW'
          : 'DEW'
    : 'clear air, nothing forms';

  const tankPct = rh;
  const cloudAlpha = condensing ? Math.min(0.85, (rh - 100) / 60 + 0.25) : 0;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-sky-950/80 rounded-2xl border border-sky-700">💧</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Class 11 -- Water in the Atmosphere</span>
          <h1 className="text-xl md:text-2xl font-extrabold">The Shrinking Tank: Dew Point Chamber</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            <rect x={0} y={0} width={460} height={300} rx={10} fill="#0b1220" />
            {/* chamber */}
            <rect x={30} y={30} width={200} height={230} rx={12} fill="#0f172a" stroke="#1e293b" strokeWidth={2} />
            {/* water vapour molecules: density ~ water */}
            {Array.from({ length: Math.round(water * 2.2) }, (_, i) => (
              <circle key={i} cx={48 + ((i * 37) % 164)} cy={50 + ((i * 53) % 150)} r={3} fill="#38bdf8" opacity={0.8}>
                <animate attributeName="cy" values={`${50 + ((i * 53) % 150)};${40 + ((i * 53) % 150)};${50 + ((i * 53) % 150)}`}
                  dur={`${2 + (i % 5) * 0.4}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {/* condensed droplets near the top when saturated */}
            {condensing && Array.from({ length: Math.round(cloudAlpha * 24) }, (_, i) => (
              <circle key={`d${i}`} cx={55 + ((i * 41) % 150)} cy={42 + ((i * 29) % 40)} r={4.5} fill="#93c5fd"
                opacity={cloudAlpha}>
                <animate attributeName="r" values="4.5;6;4.5" dur="1.6s" repeatCount="indefinite" />
              </circle>
            ))}
            {/* thermometer */}
            <rect x={250} y={60} width={14} height={170} rx={7} fill="#1e293b" stroke="#334155" />
            <rect x={253} y={62 + Math.max(0, (45 - parcelTemp) / 90) * 166} width={8}
              height={Math.max(4, Math.min(166, ((parcelTemp + 45) / 90) * 166))} rx={4} fill="#fb7185"
              className="transition-all duration-300" />
            <circle cx={257} cy={242} r={11} fill="#fb7185" />
            <text x={272} y={80} fontSize={11} fill="#fb7185" fontFamily="monospace">{parcelTemp.toFixed(1)} C parcel</text>
            {/* RH tank gauge */}
            <g transform="translate(310,60)">
              <text x={0} y={-8} fontSize={10} fill="#94a3b8">RH water tank</text>
              <rect x={0} y={0} width={40} height={150} rx={8} fill="#1e293b" stroke="#334155" />
              <rect x={3} y={150 - (tankPct / 100) * 144} width={34} height={(tankPct / 100) * 144} rx={6}
                fill={tankPct >= 100 ? '#f43f5e' : tankPct > 70 ? '#fbbf24' : '#38bdf8'}
                className="transition-all duration-300" />
              <text x={50} y={20} fontSize={11} fill="#38bdf8" fontFamily="monospace">{rh.toFixed(0)}%</text>
              <text x={50} y={40} fontSize={9} fill="#64748b">dew point</text>
              <text x={50} y={56} fontSize={11} fill="#93c5fd" fontFamily="monospace">{dewPoint.toFixed(1)} C</text>
              <text x={50} y={150} fontSize={9} fill={condensing ? '#fb7185' : '#34d399'}>{condensing ? 'SATURATED' : 'unsaturated'}</text>
            </g>
            <text x={230} y={285} textAnchor="middle" fontSize={12} fontWeight="bold"
              fill={condensing ? '#93c5fd' : '#34d399'}>
              {form}
            </text>
          </svg>
          <div className="grid grid-cols-4 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Air temp</p>
              <p className="font-mono font-bold text-amber-300">{temp} C</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Water vapour</p>
              <p className="font-mono font-bold text-sky-300">{water} g/kg</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Relative humidity</p>
              <p className={`font-mono font-bold ${rh >= 100 ? 'text-rose-400' : 'text-cyan-300'}`}>{rh.toFixed(0)}%</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Dew point</p>
              <p className="font-mono font-bold text-indigo-300">{dewPoint.toFixed(1)} C</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Air temperature</span><span className="font-mono font-bold text-amber-400">{temp} C</span>
              </div>
              <input type="range" min={-10} max={45} step={1} value={temp} aria-label="temperature"
                onChange={(e) => setTemp(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Water vapour added</span><span className="font-mono font-bold text-sky-400">{water} g/kg</span>
              </div>
              <input type="range" min={0} max={30} step={1} value={water} aria-label="water vapour"
                onChange={(e) => setWater(Number(e.target.value))} className="w-full min-h-11 accent-sky-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Lift the air parcel</span><span className="font-mono font-bold text-violet-400">{lift.toFixed(1)} km</span>
              </div>
              <input type="range" min={0} max={5} step={0.1} value={lift} aria-label="parcel lift"
                onChange={(e) => setLift(Number(e.target.value))} className="w-full min-h-11 accent-violet-500" />
            </div>
            <button onClick={() => { setTemp(30); setWater(15); setLift(0); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Clouds form because water is added from below.&quot; Usually nothing is added --
              air is LIFTED, it cools about 6.5 C per km, the saturation tank shrinks until it
              overflows at the dew point. Same vapour, smaller tank.
            </p>
          </div>

          <div className="bg-sky-950/40 rounded-2xl border border-sky-800/50 p-4 text-xs">
            <p className="font-bold text-sky-300 mb-1">What to try</p>
            <p>1. At 30 C and 15 g/kg, find the exact lift where the parcel saturates. Predict first: is it near 2 km?</p>
            <p>2. Keep vapour fixed and cool the air from 30 C to 5 C. Watch dew point stay still while RH climbs -- why does only one of them move?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_GeographyWaterAtmosphereSim;

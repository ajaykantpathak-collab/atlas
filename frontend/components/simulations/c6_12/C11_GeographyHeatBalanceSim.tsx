'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 Geography -- Solar Radiation, Heat Balance and Temperature
 * ONE concept: the global heat ledger. Low latitudes run a surplus,
 * high latitudes a deficit; winds and currents settle the bill.
 * react + tailwind only.
 */

export function C11_GeographyHeatBalanceSim() {
  const [lat, setLat] = useState(0); // latitude of the ground station
  const [albedo, setAlbedo] = useState(30); // % reflected
  const [cloud, setCloud] = useState(50); // % cloudiness
  const [gh, setGh] = useState(1.0); // greenhouse multiplier 0.5-1.5

  const { incoming, reflected, absorbed, outgoing, net } = useMemo(() => {
    // insolation scales with cos(latitude); 100 units at the top of equatorial atmosphere
    const beam = 100 * Math.max(0.05, Math.cos((lat * Math.PI) / 180));
    const cloudCut = 1 - (cloud / 100) * 0.35; // clouds block a third of the beam
    const inc = beam * cloudCut;
    const refl = inc * (albedo / 100) + inc * (cloud / 100) * 0.35 * 0.5;
    const abs = inc - refl;
    // outgoing longwave: warmer surfaces emit more, but poles still lose steady heat
    const outw = 45 + 42 * Math.cos((lat * Math.PI) / 180) * (gh * 0.72);
    return { incoming: inc, reflected: refl, absorbed: abs, outgoing: outw, net: abs - outw };
  }, [lat, albedo, cloud, gh]);

  const surplus = net >= 0;
  const arrowScale = Math.min(90, Math.abs(net) * 3);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-amber-950/80 rounded-2xl border border-amber-700">☀️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Class 11 -- Solar Radiation, Heat Balance and Temperature</span>
          <h1 className="text-xl md:text-2xl font-extrabold">The Global Heat Ledger: Surplus and Deficit Belts</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            <rect x={0} y={0} width={460} height={300} rx={10} fill="#0b1220" />
            {/* ground arc */}
            <rect x={0} y={250} width={460} height={50} fill="#1c1917" />
            <text x={230} y={280} textAnchor="middle" fontSize={11} fill="#a8a29e">
              surface at {Math.abs(lat)}&deg; {lat >= 0 ? 'N' : 'S'}: net {net >= 0 ? '+' : ''}{net.toFixed(0)} units
            </text>
            {/* sun rays: angle depends on latitude */}
            <g className="transition-all duration-300">
              {[0, 1, 2, 3].map((i) => (
                <g key={i} transform={`rotate(${lat * 0.9}, ${110 + i * 26}, 20)`}>
                  <line x1={110 + i * 26} y1={20} x2={110 + i * 26} y2={110}
                    stroke="#fbbf24" strokeWidth={3} opacity={0.9} strokeDasharray="8 5">
                    <animate attributeName="stroke-dashoffset" values="0;-26" dur="0.8s" repeatCount="indefinite" />
                  </line>
                  <polygon points={`${110 + i * 26},118 ${105 + i * 26},106 ${115 + i * 26},106`} fill="#fbbf24" />
                </g>
              ))}
            </g>
            <text x={60} y={34} fontSize={10} fill="#fbbf24">beam spread x{(1 / Math.max(0.3, Math.cos((lat * Math.PI) / 180))).toFixed(1)} wider here</text>
            {/* reflected up arrows */}
            <g opacity={reflected / 100 + 0.25}>
              <line x1={210} y1={240} x2={210} y2={240 - arrowScale * 0.5 - 30} stroke="#e2e8f0" strokeWidth={2} strokeDasharray="4 4" />
              <text x={216} y={235 - arrowScale * 0.5} fontSize={10} fill="#e2e8f0">reflected {reflected.toFixed(0)}</text>
            </g>
            {/* longwave out */}
            <g>
              <line x1={280} y1={240} x2={280} y2={240 - 60 - outgoing * 0.4} stroke="#fb7185" strokeWidth={2.5} />
              <polygon points={`280,${170 - outgoing * 0.4} 275,${182 - outgoing * 0.4} 285,${182 - outgoing * 0.4}`} fill="#fb7185" />
              <text x={286} y={200 - outgoing * 0.4} fontSize={10} fill="#fb7185">terrestrial radiation {outgoing.toFixed(0)}</text>
            </g>
            {/* greenhouse back-radiation */}
            {gh > 0.55 && (
              <g opacity={Math.min(1, gh - 0.4)}>
                <path d={`M310,${150} q40,40 -40,70`} fill="none" stroke="#a78bfa" strokeWidth={2} strokeDasharray="3 3" />
                <text x={330} y={140} fontSize={10} fill="#a78bfa">greenhouse x{gh.toFixed(2)}</text>
              </g>
            )}
            {/* ledger bars */}
            <g transform="translate(30,150)">
              <text x={0} y={-6} fontSize={10} fill="#94a3b8">ledger: absorbed vs emitted</text>
              <rect x={0} y={0} width={Math.min(190, absorbed * 1.9)} height={16} fill="#fbbf24" className="transition-all duration-300" />
              <text x={Math.min(190, absorbed * 1.9) + 6} y={13} fontSize={10} fill="#fbbf24">{absorbed.toFixed(0)} in</text>
              <rect x={0} y={26} width={Math.min(190, outgoing * 1.9)} height={16} fill="#fb7185" className="transition-all duration-300" />
              <text x={Math.min(190, outgoing * 1.9) + 6} y={39} fontSize={10} fill="#fb7185">{outgoing.toFixed(0)} out</text>
              <text x={0} y={62} fontSize={11} fontFamily="monospace" fill={surplus ? '#34d399' : '#fb7185'}>
                {surplus ? 'SURPLUS belt' : 'DEFICIT belt'} ({net >= 0 ? '+' : ''}{net.toFixed(1)} units)
              </text>
            </g>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Absorbed</p>
              <p className="font-mono font-bold text-amber-300">{absorbed.toFixed(1)} units</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Emitted</p>
              <p className="font-mono font-bold text-rose-300">{outgoing.toFixed(1)} units</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Balance</p>
              <p className={`font-mono font-bold ${surplus ? 'text-emerald-300' : 'text-rose-400'}`}>{net >= 0 ? '+' : ''}{net.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Station latitude</span><span className="font-mono font-bold text-pink-400">{lat}&deg;</span>
              </div>
              <input type="range" min={-90} max={90} step={5} value={lat} aria-label="latitude"
                onChange={(e) => setLat(Number(e.target.value))} className="w-full min-h-11 accent-pink-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Surface albedo (ice/snow high)</span><span className="font-mono font-bold text-slate-200">{albedo}%</span>
              </div>
              <input type="range" min={5} max={85} step={5} value={albedo} aria-label="albedo"
                onChange={(e) => setAlbedo(Number(e.target.value))} className="w-full min-h-11 accent-slate-300" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Cloudiness</span><span className="font-mono font-bold text-gold-300">{cloud}%</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={cloud} aria-label="cloudiness"
                onChange={(e) => setCloud(Number(e.target.value))} className="w-full min-h-11 accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Greenhouse strength</span><span className="font-mono font-bold text-gold-300">x{gh.toFixed(2)}</span>
              </div>
              <input type="range" min={0.5} max={1.5} step={0.05} value={gh} aria-label="greenhouse"
                onChange={(e) => setGh(Number(e.target.value))} className="w-full min-h-11 accent-gold-500" />
            </div>
            <button onClick={() => { setLat(0); setAlbedo(30); setCloud(50); setGh(1.0); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;The tropics are hot because they are closer to the Sun.&quot; The distance difference
              is trivial -- the real reason is the BEAM ANGLE: cos(latitude) spreads the same energy
              over more surface, and poleward albedo (ice) bounces even that away.
            </p>
          </div>

          <div className="bg-amber-950/40 rounded-2xl border border-amber-800/50 p-4 text-xs">
            <p className="font-bold text-amber-300 mb-1">What to try</p>
            <p>1. Slide from 0 to 90&deg; and record where the ledger flips from surplus to deficit. Near which latitude does it cross?</p>
            <p>2. At 70&deg; N, can clouds + greenhouse pull the pole into surplus? Why does the planet still not freeze solid there?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_GeographyHeatBalanceSim;

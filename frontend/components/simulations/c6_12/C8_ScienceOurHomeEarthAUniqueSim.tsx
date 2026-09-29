'use client';
/**
 * C8_ScienceOurHomeEarthAUniqueSim (Class 8 Science)
 *
 * ELI5: Earth is a life-sustaining planet because three gifts line up: just
 * the right distance from the Sun, a blanket of atmosphere, and plenty of
 * water. Move any dial too far and the planet freezes, burns, or dries out.
 */
import React, { useState } from 'react';

export function C8_ScienceOurHomeEarthAUniqueSim() {
  const [dist, setDist] = useState(1.0); // AU
  const [atmos, setAtmos] = useState(1.0); // x Earth atmosphere
  const [water, setWater] = useState(71); // % surface

  // very simplified energy balance: base temp falls with distance, rises with greenhouse
  const baseC = 279 / Math.sqrt(dist) - 273;
  const greenhouse = 33 * Math.log2(atmos + 1) / 1;
  const tempC = Math.round((baseC + greenhouse) * 10) / 10;

  // habitability score
  const tScore = Math.max(0, 1 - Math.abs(tempC - 15) / 60);
  const wScore = Math.max(0, 1 - Math.abs(water - 70) / 95);
  const score = Math.round((tScore * 0.6 + wScore * 0.4) * 100);

  const verdict =
    score >= 75 ? 'LIFE-SUSTAINING - blue oceans, breathable skies, rain and seasons' :
    tempC < -15 ? 'FROZEN WORLD - oceans locked in ice, like a giant snowball' :
    tempC > 55 ? 'RUNAWAY HEAT - oceans evaporating, a Venus-like furnace' :
    water < 25 ? 'DESERT PLANET - too little water for stable life' :
    'MARGINAL - life struggles at the edges';

  const oceanColor = water < 25 ? '#d9c69a' : tempC < -15 ? '#dbeafe' : '#1d4ed8';
  const planetColor = tempC > 55 ? '#b45309' : water < 25 ? '#d6b672' : '#3b82f6';
  const barPct = Math.max(2, Math.min(100, ((tempC + 60) / 200) * 100));

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-emerald-700">Our Home: Earth, a Unique Life-Sustaining Planet</h1>

      <div className="mt-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-emerald-700">The goldilocks trio:</span> (1) DISTANCE -
          Earth sits about 150 million km (1 AU) from the Sun, where water stays liquid. (2)
          ATMOSPHERE - nitrogen-oxygen air with a pinch of CO2 traps just enough heat (the natural
          greenhouse effect: without it Earth would be about -18 deg C!). (3) WATER - 71% of the
          surface is ocean, the cradle of life. Try breaking any one of them.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Distance from Sun (AU)</span><span className="font-mono text-amber-600">{dist}</span></label>
            <input type="range" min={0.4} max={2} step={0.05} value={dist} aria-label="distance in AU" onChange={(e) => setDist(Number(e.target.value))} className="w-full mt-1 accent-amber-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Atmosphere thickness</span><span className="font-mono text-gold-600">{atmos}x Earth</span></label>
            <input type="range" min={0} max={3} step={0.1} value={atmos} aria-label="atmosphere" onChange={(e) => setAtmos(Number(e.target.value))} className="w-full mt-1 accent-gold-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Water coverage (%)</span><span className="font-mono text-gold-600">{water}%</span></label>
            <input type="range" min={0} max={100} value={water} aria-label="water coverage" onChange={(e) => setWater(Number(e.target.value))} className="w-full mt-1 accent-gold-600" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[['Earth (today)', 1, 1, 71], ['Early Mars-like', 1.5, 0.1, 5], ['Venus-like', 0.7, 2.8, 2]].map(([label, d, a, w]) => (
              <button key={label as string} onClick={() => { setDist(d as number); setAtmos(a as number); setWater(w as number); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gold-100 text-gold-700 hover:bg-gold-200 transition-all">
                {label as string}
              </button>
            ))}
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div>surface temperature: <span className="font-bold" style={{ color: tempC > 45 ? '#e11d48' : tempC < 0 ? '#0891b2' : '#059669' }}>{tempC} deg C</span></div>
            <div className="text-xs text-slate-500 mt-1">= sunlight energy ({Math.round(baseC)} deg base) + greenhouse (+{Math.round(greenhouse)} deg)</div>
          </div>
          <div className={`p-3 rounded-xl border text-sm font-bold ${score >= 75 ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800'}`}>
            {verdict} (habitability {score}/100)
          </div>
        </div>

        <div className="p-2 bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl border border-slate-200">
          <svg viewBox="0 0 300 250" className="w-full">
            <circle cx={40} cy={125} r={16} fill="#fbbf24" />
            <circle cx={40} cy={125} r={24} fill="#fbbf24" opacity={0.25} />
            {/* atmosphere shell */}
            <circle cx={190} cy={125} r={78} fill="#38bdf8" opacity={0.08 + atmos * 0.12} style={{ transition: 'all 300ms' }} />
            <circle cx={190} cy={125} r={62} fill={planetColor} style={{ transition: 'fill 400ms' }} />
            {/* water patches */}
            {water > 30 && (
              <>
                <path d="M160 100 q 20 -14 44 -6 q 10 10 -6 18 q -26 8 -38 -12 Z" fill={oceanColor} opacity={0.85} style={{ transition: 'fill 400ms' }} />
                <path d="M205 150 q 16 -10 30 -2 q 4 10 -10 14 q -20 4 -20 -12 Z" fill={oceanColor} opacity={0.8} style={{ transition: 'fill 400ms' }} />
              </>
            )}
            {water > 55 && <ellipse cx={175} cy={160} rx={26} ry={12} fill={oceanColor} opacity={0.85} style={{ transition: 'fill 400ms' }} />}
            {water < 20 && <circle cx={190} cy={125} r={62} fill="#d6b672" opacity={0.55} />}
            {tempC < -10 && <ellipse cx={190} cy={78} rx={34} ry={16} fill="#f8fafc" opacity={0.9} />}
            <text x={190} y={225} textAnchor="middle" fontSize="11" fill="#e2e8f0">
              {tempC > 55 ? 'a scorching, steaming planet' : tempC < -15 ? 'an ice-locked world' : water < 25 ? 'a parched desert planet' : 'a living blue planet'}
            </text>
          </svg>
          <div className="px-2 pb-1">
            <div className="relative h-4 rounded-full bg-slate-700 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gold-400 via-emerald-400 to-rose-500" style={{ width: `${barPct}%`, transition: 'width 300ms' }} />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>-60 frozen</span><span>15 deg C (Earth)</span><span>+140 roasting</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Keep atmosphere at 1x: find the distance range that keeps the planet above 0 deg C. How narrow is the habitable zone?</li>
          <li>Set Earth conditions, then slide atmosphere to 0: what temperature does a bare rock Earth have? Why do we call air a blanket?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_ScienceOurHomeEarthAUniqueSim;

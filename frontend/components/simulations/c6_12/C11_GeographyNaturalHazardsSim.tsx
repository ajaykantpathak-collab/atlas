'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 Geography -- Natural Hazards and Disasters
 * ONE concept: a hazard only becomes a DISASTER when hazard size meets
 * vulnerable people and exposed buildings: Risk = H x V x E.
 * react + tailwind only.
 */

type Hazard = 'earthquake' | 'cyclone' | 'flood' | 'drought';

const HAZARDS: { id: Hazard; label: string; speed: string; onset: string }[] = [
  { id: 'earthquake', label: 'Earthquake', speed: 'seconds', onset: 'no warning' },
  { id: 'cyclone', label: 'Tropical cyclone', speed: 'days', onset: 'tracked in advance' },
  { id: 'flood', label: 'Flood', speed: 'hours-days', onset: 'often forecastable' },
  { id: 'drought', label: 'Drought', speed: 'months', onset: 'slow creep' }
];

export function C11_GeographyNaturalHazardsSim() {
  const [hazard, setHazard] = useState<Hazard>('cyclone');
  const [magnitude, setMagnitude] = useState(6); // 1-10 hazard size
  const [population, setPopulation] = useState(40); // 0-100 density index
  const [preparedness, setPreparedness] = useState(30); // 0-100 (vulnerability inverse)
  const [buildQuality, setBuildQuality] = useState(40); // 0-100 exposure robustness

  const { risk, isDisaster, deaths, econ } = useMemo(() => {
    const v = (100 - preparedness) / 100; // vulnerability 0-1
    const e = (100 - buildQuality) / 100; // fragility 0-1
    const H = magnitude / 10;
    const popFactor = population / 100;
    const r = H * v * e * popFactor * 10; // 0-10 risk index
    const disaster = r >= 2.5 && popFactor > 0.1;
    const d = Math.round(r * r * popFactor * (hazard === 'earthquake' ? 900 : hazard === 'cyclone' ? 400 : 120));
    const loss = Math.round(r * r * (hazard === 'flood' ? 1.4 : 1) * popFactor * 900);
    return { risk: r, isDisaster: disaster, deaths: d, econ: loss };
  }, [magnitude, population, preparedness, buildQuality, hazard]);

  const bar = (val: number, max: number, color: string) => (
    <div className="h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
      <div className={`h-full ${color} transition-all duration-300`} style={{ width: `${Math.min(100, (val / max) * 100)}%` }} />
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-rose-950/80 rounded-2xl border border-rose-700">⚠️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Class 11 -- Natural Hazards and Disasters</span>
          <h1 className="text-xl md:text-2xl font-extrabold">When Does a Hazard Become a Disaster?</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {HAZARDS.map((h) => (
              <button key={h.id} onClick={() => setHazard(h.id)}
                className={`min-h-11 rounded-xl text-[10px] font-bold ${hazard === h.id ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                {h.label}
              </button>
            ))}
          </div>

          <svg viewBox="0 0 460 220" className="w-full">
            {/* hazard x vulnerability x exposure = risk panel */}
            <rect x={10} y={10} width={130} height={60} rx={10} fill="#1e1b4b" stroke="#4338ca" />
            <text x={75} y={35} textAnchor="middle" fontSize={11} fill="#a5b4fc">HAZARD</text>
            <text x={75} y={55} textAnchor="middle" fontSize={14} fontFamily="monospace" fill="#e0e7ff">{magnitude}/10</text>
            <text x={148} y={45} textAnchor="middle" fontSize={16} fill="#94a3b8">x</text>
            <rect x={165} y={10} width={130} height={60} rx={10} fill="#4c1d24" stroke="#be123c" />
            <text x={230} y={35} textAnchor="middle" fontSize={11} fill="#fda4af">VULNERABILITY</text>
            <text x={230} y={55} textAnchor="middle" fontSize={14} fontFamily="monospace" fill="#ffe4e6">{Math.round((100 - preparedness) / 2)}%</text>
            <text x={303} y={45} textAnchor="middle" fontSize={16} fill="#94a3b8">x</text>
            <rect x={320} y={10} width={130} height={60} rx={10} fill="#422006" stroke="#b45309" />
            <text x={385} y={35} textAnchor="middle" fontSize={11} fill="#fcd34d">EXPOSURE</text>
            <text x={385} y={55} textAnchor="middle" fontSize={14} fontFamily="monospace" fill="#fef3c7">{population}% density</text>
            {/* result */}
            <rect x={10} y={90} width={440} height={80} rx={12}
              fill={isDisaster ? 'rgba(190,18,60,0.18)' : 'rgba(6,95,70,0.18)'}
              stroke={isDisaster ? '#f43f5e' : '#10b981'} className="transition-all duration-300" />
            <text x={230} y={122} textAnchor="middle" fontSize={15} fontWeight="bold"
              fill={isDisaster ? '#fb7185' : '#34d399'}>
              {isDisaster ? 'DISASTER' : 'Hazard only (manageable)'}
            </text>
            <text x={230} y={145} textAnchor="middle" fontSize={11} fill="#cbd5e1" fontFamily="monospace">
              risk index {risk.toFixed(2)} / 10
            </text>
            {/* speed strip */}
            <text x={230} y={195} textAnchor="middle" fontSize={11} fill="#94a3b8">
              {HAZARDS.find((h) => h.id === hazard)?.label}: strikes in {HAZARDS.find((h) => h.id === hazard)?.speed}, {HAZARDS.find((h) => h.id === hazard)?.onset}
            </text>
          </svg>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
              <p className="text-[10px] text-slate-500 mb-1">Potential lives at risk</p>
              <p className="font-mono font-bold text-rose-300">{deaths.toLocaleString('en-US')}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
              <p className="text-[10px] text-slate-500 mb-1">Economic loss (million)</p>
              <p className="font-mono font-bold text-amber-300">{econ.toLocaleString('en-US')}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Hazard magnitude</span><span className="font-mono font-bold text-indigo-300">{magnitude}/10</span>
              </div>
              <input type="range" min={1} max={10} step={1} value={magnitude} aria-label="magnitude"
                onChange={(e) => setMagnitude(Number(e.target.value))} className="w-full min-h-11 accent-indigo-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Population exposed</span><span className="font-mono font-bold text-amber-300">{population}%</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={population} aria-label="population"
                onChange={(e) => setPopulation(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Preparedness (warning + drills)</span><span className="font-mono font-bold text-emerald-300">{preparedness}%</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={preparedness} aria-label="preparedness"
                onChange={(e) => setPreparedness(Number(e.target.value))} className="w-full min-h-11 accent-emerald-500" />
              {bar(preparedness, 100, 'bg-emerald-500')}
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Building quality</span><span className="font-mono font-bold text-sky-300">{buildQuality}%</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={buildQuality} aria-label="building quality"
                onChange={(e) => setBuildQuality(Number(e.target.value))} className="w-full min-h-11 accent-sky-500" />
              {bar(buildQuality, 100, 'bg-sky-500')}
            </div>
            <button onClick={() => { setHazard('cyclone'); setMagnitude(6); setPopulation(40); setPreparedness(30); setBuildQuality(40); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Big hazard = big disaster, always.&quot; A 9/10 quake under empty wilderness is a
              geological footnote. Drop population to 0 and watch DISASTER flip off -- the same
              magnitude with dense, unprepared cities is catastrophic. Disasters are social.
            </p>
          </div>

          <div className="bg-rose-950/40 rounded-2xl border border-rose-800/50 p-4 text-xs">
            <p className="font-bold text-rose-300 mb-1">What to try</p>
            <p>1. Keep magnitude at 9. Find the preparedness + building quality combo that turns a DISASTER back into a manageable hazard.</p>
            <p>2. Compare earthquake vs drought at identical settings. Why do the casualty models differ so much (speed of onset)?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_GeographyNaturalHazardsSim;

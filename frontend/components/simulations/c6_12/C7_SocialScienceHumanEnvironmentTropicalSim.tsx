'use client';
/**
 * C7_SocialScienceHumanEnvironmentTropicalSim (Class 7 Social Science)
 *
 * ELI5: The Amazon basin is hot and wet EVERY month, so the rainforest grows
 * in storeys -- emergent, canopy, understorey, forest floor. Click a layer to
 * meet it, slide the month for the climate graph, and clear forest to see why
 * the soil fails fast.
 */
import React, { useMemo, useState } from 'react';

// Manaus (Amazon basin) monthly means: rainfall mm, temp deg C
const RAIN = [260, 289, 309, 283, 180, 84, 61, 44, 62, 108, 164, 243];
const TEMP = [26.5, 26.5, 26.8, 27.2, 27.4, 27.6, 27.9, 28.2, 28.4, 28.2, 27.6, 26.9];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
interface Layer { id: string; name: string; y: number; h: number; label: string; who: string; fact: string }
const LAYERS: Layer[] = [
  { id: 'emergent', name: 'Emergent', y: 30, h: 45, label: '45 m', who: 'harpy eagle, macaw', fact: 'Tall trees poke above the canopy, getting full sun and strong wind.' },
  { id: 'canopy', name: 'Canopy', y: 60, h: 30, label: '25-30 m', who: 'sloth, toucan, monkey', fact: 'A dense green roof with most animals; it catches 70-90% of the sunlight.' },
  { id: 'understorey', name: 'Understorey', y: 90, h: 30, label: '15 m', who: 'jaguar, tree frog, orchids', fact: 'Shady, humid mid-level of saplings and broad leaves waiting for a light gap.' },
  { id: 'floor', name: 'Forest floor', y: 120, h: 30, label: '0 m', who: 'anteater, leafcutter ants', fact: 'Nearly dark; fungi and termites recycle fallen leaves within weeks.' },
];

export function C7_SocialScienceHumanEnvironmentTropicalSim() {
  const [month, setMonth] = useState(2); // March index
  const [layer, setLayer] = useState('canopy');
  const [clear, setClear] = useState(0); // % forest cleared
  const [unit, setUnit] = useState<'mm' | 'inch'>('mm');

  const annual = useMemo(() => RAIN.reduce((a, b) => a + b, 0), []);
  const conv = (v: number) => (unit === 'mm' ? `${Math.round(v)} mm` : `${(v / 25.4).toFixed(1)} in`);
  const sel = LAYERS.find((l) => l.id === layer)!;
  const soilHealth = Math.max(0, Math.round(100 - clear * 1.6)); // nutrients leave with the trees
  const height = Math.round(45 * (1 - clear / 100));

  const bars = RAIN.map((r, i) => ({ i, h: (r / 320) * 70 }));

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">Class 7 Geography - Human-Environment Interactions: the Tropical Lands</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Amazon Rainforest Storeys and the Climate That Builds Them</h1>
        </div>
        <button onClick={() => { setMonth(2); setLayer('canopy'); setClear(0); }}
          className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 bg-slate-900/70 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 300 160" className="w-full" preserveAspectRatio="xMidYMid meet">
            <rect x="0" y="0" width="300" height="150" fill="#0b1220" />
            {LAYERS.map((l) => (
              <g key={l.id} onClick={() => setLayer(l.id)} style={{ cursor: 'pointer' }}>
                <rect x="4" y={l.y} width="292" height={l.h} rx="6"
                  fill={l.id === layer ? '#4338ca' : '#14532d'} fillOpacity={l.id === layer ? 0.9 : 0.55}
                  stroke={l.id === layer ? '#a5b4fc' : '#166534'} strokeWidth="1.5"
                  style={{ transition: 'all 300ms' }} />
                <text x="12" y={l.y + 13} fontSize="9" fontWeight="bold" fill="#e2e8f0">{l.name} ({l.label})</text>
                <text x="12" y={l.y + 24} fontSize="7.5" fill="#cbd5e1">{l.who}</text>
              </g>
            ))}
            <rect x="4" y="148" width="292" height="8" rx="3" fill="#7c4a21" />
            <text x="150" y="157" fontSize="7" fill="#fde68a" textAnchor="middle">forest floor soil</text>
          </svg>
          <div className="flex flex-wrap gap-1 mt-2">
            {LAYERS.map((l) => (
              <button key={l.id} onClick={() => setLayer(l.id)}
                className={`min-h-11 px-2 rounded-lg text-[10px] font-bold border transition-all ${l.id === layer ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-500'}`}>
                {l.name}
              </button>
            ))}
          </div>
          <div className="p-3 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mt-2">
            <p><span className="font-bold text-sky-300">And the subtropical half of the chapter:</span> the Ganga-Brahmaputra basin is the opposite extreme -- monsoon (rain mostly Jun-Sep), flat fertile plains of silt, so the interaction is dense life: paddy fields, fishing, and one of the world&apos;s busiest river deltas. Same river-plan, different climate, different human life.</p>
            <p className="mt-1"><span className="font-bold text-emerald-300">From the forest itself:</span> rubber, acai, Brazil nuts, hardwoods -- plus jungle homes built on stilts against the floods, and small boats instead of roads. People live FROM the storeys, not under them.</p>
          </div>
          <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs leading-relaxed">
            <p className="font-bold text-indigo-300">{sel.name} storey ({sel.label})</p>
            <p className="text-slate-300">{sel.fact}</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-400">Month: {MONTHS[month]}</label>
              <button onClick={() => setUnit((u) => (u === 'mm' ? 'inch' : 'mm'))}
                className="min-h-11 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-all">rain in {unit}</button>
            </div>
            <input type="range" min={0} max={11} value={month} aria-label="month"
              onChange={(e) => setMonth(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-indigo-500" />
            <div className="flex justify-between text-xs font-mono mt-1">
              <span className="text-sky-300">{conv(RAIN[month])} rain</span>
              <span className="text-amber-300">{TEMP[month].toFixed(1)} deg C</span>
            </div>
            <svg viewBox="0 0 300 100" className="w-full mt-2">
              {bars.map((b) => (
                <g key={b.i} onClick={() => setMonth(b.i)} style={{ cursor: 'pointer' }}>
                  <rect x={8 + b.i * 24} y={92 - b.h} width="16" height={b.h} rx="2"
                    fill={b.i === month ? '#38bdf8' : '#1e40af'} style={{ transition: 'all 300ms' }} />
                  <text x={16 + b.i * 24} y="99" fontSize="6.5" fill="#94a3b8" textAnchor="middle">{MONTHS[b.i][0]}</text>
                </g>
              ))}
              <text x="150" y="12" fontSize="8" fill="#94a3b8" textAnchor="middle">monthly rainfall, Manaus-type station (every month is wet: no dry season)</text>
            </svg>
            <p className="text-xs text-slate-300 mt-1">Year total: <span className="font-mono text-sky-300">{conv(annual)}</span> -- more than 20 times Delhi gets. Temp barely moves: <span className="font-mono text-amber-300">26.5-28.4 deg C</span> all year. Tap any bar to jump to that month.</p>
            <div className="mt-2">
              <p className="text-[10px] text-slate-500 mb-1">Annual rainfall compared (mm)</p>
              {[['Manaus (Amazon)', 2300], ['Delhi', 800], ['London', 600]].map(([city, mm]) => (
                <div key={city as string} className="flex items-center gap-2 mt-1">
                  <span className="w-24 text-[10px] text-slate-400 text-right">{city}</span>
                  <div className="flex-1 h-3 rounded bg-slate-950 border border-slate-800 overflow-hidden">
                    <div className="h-full bg-sky-600" style={{ width: `${((mm as number) / 2300) * 100}%` }} />
                  </div>
                  <span className="w-12 text-[10px] font-mono text-sky-300">{mm}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <label className="text-xs font-semibold text-slate-400 flex justify-between">
              <span>Forest cleared (roads, farms, dams)</span>
              <span className="font-mono text-rose-300">{clear}%</span>
            </label>
            <input type="range" min={0} max={100} step={5} value={clear} aria-label="clearing"
              onChange={(e) => setClear(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-rose-500" />
            <div className="grid grid-cols-3 gap-2 mt-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800"><p className="text-[10px] text-slate-400">Tree height left</p><p className="font-mono text-emerald-300">{height} m</p></div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800"><p className="text-[10px] text-slate-400">Soil fertility</p><p className={`font-mono ${soilHealth > 60 ? 'text-emerald-300' : 'text-rose-300'}`}>{soilHealth}/100</p></div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800"><p className="text-[10px] text-slate-400">Storeys standing</p><p className="font-mono text-indigo-300">{Math.max(0, 4 - Math.floor(clear / 25))}/4</p></div>
            </div>
            <div className="h-2 mt-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${soilHealth}%` }} />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> rainforest soil is NOT rich. The nutrients live in the plants; when trees are cleared, heavy rain washes them away in a few years and the land turns useless.
          </div>
        </div>
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Slide through all 12 months and note the lowest monthly rainfall -- would you call any month dry? Now explain in one line why the trees grow in storeys.</p>
        <p className="mt-1">2. Clear 50% of the forest -- which storey disappears first, and what happens to soil fertility after the trees are gone?</p>
      </footer>
    </div>
  );
}

export default C7_SocialScienceHumanEnvironmentTropicalSim;

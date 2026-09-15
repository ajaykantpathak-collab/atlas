'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 History -- An Empire Across Three Continents (Rome)
 * ONE concept: the Roman Empire was an integrated trade system across
 * Europe, Asia (West) and Africa. Pax Romana, roads and the grain fleet
 * decide how well the three continents are stitched together.
 * react + tailwind only.
 */

type Port = 'rome' | 'gaul' | 'egypt' | 'spain' | 'syria';

const PORTS: { id: Port; x: number; y: number; name: string; good: string; continent: string }[] = [
  { id: 'rome', x: 200, y: 95, name: 'Rome (Italia)', good: 'consumes grain, wine, oil', continent: 'Europe' },
  { id: 'gaul', x: 120, y: 60, name: 'Gaul', good: 'wine, metal ores', continent: 'Europe' },
  { id: 'spain', x: 75, y: 105, name: 'Hispania', good: 'olive oil, silver, garum', continent: 'Europe' },
  { id: 'egypt', x: 320, y: 200, name: 'Egypt (Alexandria)', good: 'GRAIN -- the imperial lifeline', continent: 'Africa' },
  { id: 'syria', x: 375, y: 120, name: 'Syria', good: 'purple dye, glass, silk trade', continent: 'Asia (West)' }
];

export function C11_HistoryEmpireThreeContinentsSim() {
  const [pax, setPax] = useState(80); // Pax Romana / internal security 0-100
  const [roads, setRoads] = useState(60); // road + shipping infrastructure 0-100
  const [fleet, setFleet] = useState(70); // grain fleet capacity 0-100
  const [sel, setSel] = useState<Port>('rome');

  // trade volume per route: base * pax factor * road factor
  const trade = useMemo(() => {
    const pf = pax / 100; // banditry and piracy choke trade
    const rf = 0.4 + (roads / 100) * 1.1;
    const routes: { from: Port; to: Port; vol: number; sea: boolean }[] = [
      { from: 'egypt', to: 'rome', vol: Math.round(40 * pf * (0.5 + fleet / 100) * 10) / 10, sea: true },
      { from: 'spain', to: 'rome', vol: Math.round(25 * pf * rf * 10) / 10, sea: true },
      { from: 'gaul', to: 'rome', vol: Math.round(20 * pf * rf * 10) / 10, sea: false },
      { from: 'syria', to: 'rome', vol: Math.round(15 * pf * rf * 10) / 10, sea: true }
    ];
    return routes;
  }, [pax, roads, fleet]);

  const totalIn = Math.round(trade.reduce((s, t) => s + t.vol, 0) * 10) / 10;
  const grainSupply = trade.find((t) => t.from === 'egypt')!.vol;
  const unrest = grainSupply < 25;

  const coords = (id: Port) => PORTS.find((p) => p.id === id)!;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-rose-950/80 rounded-2xl border border-rose-700">🏛️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Class 11 -- An Empire Across Three Continents</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Stitch Three Continents: Rome&apos;s Trade Web</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 280" className="w-full">
            <rect x={0} y={0} width={460} height={280} rx={10} fill="#0b1220" />
            {/* continents hinted */}
            <rect x={20} y={20} width={150} height={110} rx={14} fill="#14532d" opacity={0.25} />
            <rect x={250} y={30} width={190} height={130} rx={14} fill="#78350f" opacity={0.25} />
            <rect x={260} y={170} width={150} height={90} rx={14} fill="#7c2d12" opacity={0.25} />
            <text x={30} y={38} fontSize={9} fill="#4ade80">EUROPE</text>
            <text x={360} y={48} fontSize={9} fill="#fbbf24">ASIA (West)</text>
            <text x={320} y={188} fontSize={9} fill="#fb923c">AFRICA</text>
            <text x={180} y={160} fontSize={9} fill="#0ea5e9">Mare Nostrum (Mediterranean)</text>
            {/* trade routes with animated flow; opacity by volume */}
            {trade.map((t) => {
              const a = coords(t.from), b = coords(t.to);
              const op = Math.min(0.95, t.vol / 50);
              return (
                <g key={`${t.from}-${t.to}`}>
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#f59e0b" strokeWidth={Math.max(1, t.vol / 8)}
                    opacity={op} strokeDasharray="7 5" className="transition-all duration-500">
                    <animate attributeName="stroke-dashoffset" values="0;-24" dur="1.2s" repeatCount="indefinite" />
                  </line>
                  <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 5} fontSize={9} fill="#fcd34d" textAnchor="middle" fontFamily="monospace"
                    opacity={Math.min(1, t.vol / 20)}>
                    {t.vol}
                  </text>
                </g>
              );
            })}
            {/* ports */}
            {PORTS.map((p) => (
              <g key={p.id} onClick={() => setSel(p.id)} className="cursor-pointer">
                <circle cx={p.x} cy={p.y} r={sel === p.id ? 9 : 6} fill={sel === p.id ? '#f43f5e' : '#94a3b8'}
                  className="transition-all duration-300" />
                <text x={p.x} y={p.y - 12} fontSize={9} fill={sel === p.id ? '#fda4af' : '#cbd5e1'} textAnchor="middle">{p.name.split(' (')[0]}</text>
              </g>
            ))}
            {unrest && (
              <g>
                <text x={200} y={45} fontSize={12} fill="#fb7185" fontWeight="bold">
                  grain below 25: Rome riots!
                </text>
              </g>
            )}
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Total trade into Rome</p>
              <p className="font-mono font-bold text-amber-300">{totalIn} units</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Grain lifeline</p>
              <p className={`font-mono font-bold ${unrest ? 'text-rose-400' : 'text-emerald-300'}`}>{grainSupply}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Status</p>
              <p className={`font-mono font-bold ${unrest ? 'text-rose-400' : 'text-emerald-300'}`}>{unrest ? 'crisis' : 'stable'}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Pax Romana (internal security)</span><span className="font-mono font-bold text-rose-400">{pax}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={pax} aria-label="pax romana"
                onChange={(e) => setPax(Number(e.target.value))} className="w-full min-h-11 accent-rose-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Roads and harbours</span><span className="font-mono font-bold text-stone-300">{roads}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={roads} aria-label="roads"
                onChange={(e) => setRoads(Number(e.target.value))} className="w-full min-h-11 accent-stone-400" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Grain fleet capacity</span><span className="font-mono font-bold text-amber-400">{fleet}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={fleet} aria-label="fleet"
                onChange={(e) => setFleet(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <button onClick={() => { setPax(80); setRoads(60); setFleet(70); setSel('rome'); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-300">
            <p className="font-bold text-rose-300 mb-1">{PORTS.find((p) => p.id === sel)!.name} -- source card</p>
            <p>Sends: {PORTS.find((p) => p.id === sel)!.good}</p>
            <p>Continent: {PORTS.find((p) => p.id === sel)!.continent}</p>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Rome conquered for glory alone.&quot; Look at the web: conquest bought SECURITY
              (Pax Romana) that let Egyptian grain feed an Italian city of a million. Cut security to
              20 and watch the empire starve -- the army existed to keep ships sailing.
            </p>
          </div>

          <div className="bg-rose-950/40 rounded-2xl border border-rose-800/50 p-4 text-xs">
            <p className="font-bold text-rose-300 mb-1">What to try</p>
            <p>1. Drop Pax Romana to 0. Which continent&apos;s trade dies first, and what happens to the grain number?</p>
            <p>2. Keep security at 100 but sink the fleet to 20. Can good roads compensate for lost ships? Why not?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_HistoryEmpireThreeContinentsSim;

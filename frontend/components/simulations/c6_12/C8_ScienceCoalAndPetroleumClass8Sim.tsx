'use client';
/**
 * C8_ScienceCoalAndPetroleumClass8Sim (Class 8 Science)
 *
 * ELI5: Coal and petroleum are FOSSIL fuels made from ancient plants and sea
 * creatures buried for millions of years. Petroleum is a mixture, so refineries
 * heat it in a tall column: each fraction boils off at its own temperature
 * band - gas at the top, tar at the bottom. They are exhaustible: use them
 * and they are gone for millions of years.
 */
import React, { useState } from 'react';

const FRACTIONS = [
  { name: 'Petroleum gas', top: 40, color: '#f472b6', use: 'LPG for cooking' },
  { name: 'Petrol', top: 170, color: '#fbbf24', use: 'cars and bikes' },
  { name: 'Kerosene', top: 250, color: '#fb923c', use: 'lamps and stoves' },
  { name: 'Diesel', top: 350, color: '#a78bfa', use: 'trucks and buses' },
  { name: 'Fuel oil + residue', top: 999, color: '#64748b', use: 'ships, roads, lubricants' },
];

const COAL_STAGES = [
  { name: 'Dense forests buried', carbon: 45, note: 'plants die in swampy water, air cannot reach them' },
  { name: 'Peat', carbon: 55, note: 'spongy brown stuff - first step of coalification' },
  { name: 'Lignite (brown coal)', carbon: 67, note: 'soft, leaves visible, high moisture' },
  { name: 'Bituminous coal', carbon: 80, note: 'black and harder - most common fuel coal' },
  { name: 'Anthracite', carbon: 94, note: 'hardest, shiniest, hottest burning - highest carbon' },
];

export function C8_ScienceCoalAndPetroleumClass8Sim() {
  const [tab, setTab] = useState<'refinery' | 'coal'>('refinery');
  const [temp, setTemp] = useState(20);
  const [collected, setCollected] = useState<string[]>([]);
  const [millionYears, setMillionYears] = useState(0);

  const active = FRACTIONS.filter((f) => temp >= f.top);
  const stageIdx = millionYears <= 0 ? 0 : Math.min(4, Math.floor((millionYears / 50) * 5));
  const stage = COAL_STAGES[stageIdx];

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-indigo-700">Coal and Petroleum: Treasure Made Slowly, Used Quickly</h1>

      <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-indigo-700">Fossil fuels 101:</span> nature cooked ancient
          biomass for millions of years to store energy in coal and petroleum. A refinery sorts
          petroleum by BOILING POINT - raise the temperature and each fraction leaves the column at
          its band. A quarry digs coal that got purer (more carbon, less junk) the longer it cooked.
          Both are exhaustible resources: no new batch for millions of years.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {([['refinery', 'Petroleum refinery'], ['coal', 'Coal formation clock']] as ['refinery' | 'coal', string][]).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === t ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'refinery' ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <label className="text-xs font-semibold text-slate-500 flex justify-between">
              <span>Column temperature</span>
              <span className="font-mono text-rose-600">{temp} deg C</span>
            </label>
            <input type="range" min={20} max={400} value={temp} aria-label="temperature" onChange={(e) => setTemp(Number(e.target.value))} className="w-full mt-2 accent-rose-600" />
            <div className="mt-2 flex gap-2">
              <button onClick={() => setCollected((c) => Array.from(new Set([...c, ...FRACTIONS.filter((f) => temp >= f.top).map((f) => f.name)])))} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-all">
                Collect what is boiling now
              </button>
              <button onClick={() => setCollected([])} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 hover:bg-slate-300 transition-all">
                Empty tray
              </button>
            </div>
            <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-sm">
              <p className="font-bold text-slate-600">Collection tray ({collected.length}/5)</p>
              <ul className="mt-1 text-xs space-y-1">
                {FRACTIONS.map((f) => (
                  <li key={f.name} className={collected.includes(f.name) ? 'font-bold' : 'text-slate-400'}>
                    {collected.includes(f.name) ? '[x] ' : '[ ] '}
                    {f.name} - {f.use}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-2 bg-gradient-to-b from-rose-50 to-white rounded-2xl border border-slate-200">
            <svg viewBox="0 0 300 280" className="w-full">
              <rect x={100} y={20} width={100} height={230} fill="#e2e8f0" stroke="#475569" strokeWidth={2} rx={8} />
              <rect x={100} y={240} width={100} height={26} fill="#334155" rx={4} />
              <text x={150} y={258} textAnchor="middle" fontSize="10" fill="#fbbf24">furnace: {temp} deg</text>
              {[40, 170, 250, 350].map((t, i) => (
                <line key={t} x1={100} y1={40 + i * 48} x2={200} y2={40 + i * 48} stroke="#94a3b8" strokeDasharray="4 3" />
              ))}
              {FRACTIONS.map((f, i) => {
                const y = 40 + i * 48;
                const boiling = temp >= f.top;
                return (
                  <g key={f.name}>
                    <circle cx={150} cy={y} r={boiling ? 9 : 5} fill={f.color} opacity={boiling ? 1 : 0.3} style={{ transition: 'all 300ms' }} />
                    {boiling && (
                      <>
                        <path d={`M 150 ${y - 9} L 150 ${y - 24}`} stroke={f.color} strokeWidth={2} strokeLinecap="round" />
                        <circle cx={150} cy={y - 28} r={3.5} fill={f.color} className="opacity-80" />
                      </>
                    )}
                    <text x={210} y={y + 4} fontSize="10" fill={boiling ? '#1e293b' : '#94a3b8'} fontWeight={boiling ? 'bold' : 'normal'}>
                      {f.name}
                    </text>
                  </g>
                );
              })}
              <text x={150} y={12} textAnchor="middle" fontSize="10" fill="#475569">coolest at top, hottest at bottom</text>
            </svg>
            <div className="px-2 text-xs text-slate-500">
              Currently escaping the column: {active.length === 0 ? 'nothing yet - heat more!' : active.map((f) => f.name).join(', ')}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <label className="text-xs font-semibold text-slate-500 flex justify-between">
              <span>Time machine (million years)</span>
              <span className="font-mono text-amber-600">{millionYears} My</span>
            </label>
            <input type="range" min={0} max={50} value={millionYears} aria-label="million years" onChange={(e) => setMillionYears(Number(e.target.value))} className="w-full mt-2 accent-amber-600" />
            <div className="mt-2 flex gap-2">
              {[10, 25, 50].map((v) => (
                <button key={v} onClick={() => setMillionYears(v)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all">
                  {v} My
                </button>
              ))}
              <button onClick={() => setMillionYears(0)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 hover:bg-slate-300 transition-all">
                Reset
              </button>
            </div>
            <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-sm">
              <div className="font-bold text-indigo-700">{stage.name}</div>
              <div className="text-xs text-slate-500 mt-1">{stage.note}</div>
              <div className="mt-2 text-xs font-mono">
                carbon content: <span className="text-emerald-700 font-bold">{stage.carbon}%</span>
              </div>
              <div className="mt-1 h-3 rounded bg-slate-200 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${stage.carbon}%`, transition: 'width 300ms' }} />
              </div>
            </div>
            <div className="mt-2 text-xs text-slate-500 leading-relaxed">
              Rule to remember: slow process + high pressure + high temperature + no air = coal.
              And "coal" and "petroleum" are both called fossil fuels or exhaustible resources.
            </div>
          </div>
          <div className="p-2 bg-gradient-to-b from-amber-50 to-white rounded-2xl border border-slate-200">
            <svg viewBox="0 0 300 260" className="w-full">
              <rect x={30} y={200} width={240} height={40} fill="#78350f" opacity={0.8} />
              <text x={150} y={224} textAnchor="middle" fontSize="10" fill="#fde68a">bedrock</text>
              {[0, 1, 2, 3, 4].map((i) => {
                const visible = stageIdx >= i;
                const depth = 200 - i * 38;
                const shade = ['#65a30d', '#a16207', '#92400e', '#292524', '#0f172a'][i];
                return (
                  <g key={i} opacity={visible ? 1 : 0.15} style={{ transition: 'opacity 300ms' }}>
                    <rect x={40} y={depth} width={220} height={30} rx={6} fill={shade} />
                    <text x={150} y={depth + 19} textAnchor="middle" fontSize="9" fill="#fde68a">
                      {COAL_STAGES[i].name}
                    </text>
                  </g>
                );
              })}
              {[55, 45, 35, 25, 15].map((h, i) =>
                stageIdx <= 1 && i < 5 ? (
                  <g key={i} opacity={0.9}>
                    <rect x={60 + i * 40} y={200 - h} width={4} height={h} fill="#166534" />
                    <circle cx={62 + i * 40} cy={200 - h - 6} r={7} fill="#22c55e" />
                  </g>
                ) : null
              )}
              <text x={150} y={248} textAnchor="middle" fontSize="10" fill="#475569">layers pile up: older fuel buried deeper and darker</text>
            </svg>
          </div>
        </div>
      )}

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Find the temperature window where ONLY diesel boils but kerosene has already left. Collect exactly diesel.</li>
          <li>At what million-year mark does carbon cross 80%? Which stage is that, and why is anthracite the hottest fuel?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_ScienceCoalAndPetroleumClass8Sim;

'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 12 Geography -- Human Settlements
 * ONE concept: settlements form a hierarchy -- hamlet to megacity --
 * and the rank-size relationship plus rural-urban functions shift as
 * urbanisation rises. react + tailwind only.
 */

type Site = 'hamlet' | 'village' | 'town' | 'city' | 'megacity';

const LEVELS: { id: Site; label: string; pop: number; services: number; color: string }[] = [
  { id: 'hamlet', label: 'Hamlet', pop: 300, services: 1, color: '#4ade80' },
  { id: 'village', label: 'Village', pop: 4000, services: 4, color: '#22d3ee' },
  { id: 'town', label: 'Town', pop: 80000, services: 12, color: '#818cf8' },
  { id: 'city', label: 'City', pop: 1500000, services: 40, color: '#f59e0b' },
  { id: 'megacity', label: 'Megacity', pop: 12000000, services: 90, color: '#f43f5e' }
];

export function C12_GeographyHumanSettlementsSim() {
  const [level, setLevel] = useState<Site>('town');
  const [urbanPop, setUrbanPop] = useState(31); // % urbanisation of the region
  const [growth, setGrowth] = useState(2); // % per year
  const [showRank, setShowRank] = useState(true);

  const idx = LEVELS.findIndex((l) => l.id === level);
  const cur = LEVELS[idx];

  // rank-size rule (Zipf): Pn = P1 / n with a bend for primate cities
  const primate = urbanPop > 60 && growth > 2.5; // primacy develops with fast urban growth
  const ranks = useMemo(() => {
    const p1 = cur.pop;
    return Array.from({ length: 6 }, (_, i) => {
      const bend = primate && i === 0 ? 1 : primate ? Math.pow(i + 1, -1.6) : Math.pow(i + 1, -1.0);
      return { rank: i + 1, pop: Math.max(200, Math.round((p1 * bend) / 200) * 200) };
    });
  }, [cur, primate]);

  const maxPop = Math.max(...ranks.map((r) => r.pop));

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-violet-950/80 rounded-2xl border border-violet-700">🏘️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400">Class 12 -- Human Settlements</span>
          <h1 className="text-xl md:text-2xl font-extrabold">From Hamlet to Megacity: the Settlement Ladder</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            <rect x={0} y={0} width={460} height={300} rx={10} fill="#0b1220" />
            {/* settlement drawing grows with level */}
            <g className="transition-all duration-500">
              {/* huts/houses/blocks */}
              {Array.from({ length: 4 + idx * 5 }, (_, i) => {
                const w = 26 - idx * 3;
                const h = 14 + idx * 4 + (i % 3) * 4;
                const x = 40 + (i % 6) * (w + 8);
                const y = 160 - Math.floor(i / 6) * (h + 8) - h;
                return (
                  <g key={i}>
                    <rect x={x} y={y} width={w} height={h} fill={cur.color} opacity={0.85} rx={1.5} />
                    {idx >= 2 && <rect x={x + w * 0.3} y={y + h * 0.4} width={w * 0.4} height={h * 0.6} fill="#0b1220" />}
                    {idx >= 3 && <circle cx={x + w / 2} cy={y + h * 0.25} r={1.6} fill="#fde68a" />}
                  </g>
                );
              })}
              {/* central function: temple/mall/tower */}
              <rect x={190} y={60 - idx * 8} width={44 - idx * 4} height={100 + idx * 8} fill={cur.color} rx={2} />
              {idx >= 4 && (
                <g>
                  <circle cx={212} cy={54 - idx * 8} r={6} fill="#fde68a">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <text x={220} y={44} fontSize={9} fill="#fde68a">metro + airport + university</text>
                </g>
              )}
            </g>
            {/* rank-size chart */}
            {showRank && (
              <g transform="translate(240,180)">
                <text x={0} y={-8} fontSize={10} fill="#94a3b8">
                  rank-size: {primate ? 'primate pattern (one giant)' : 'log-normal (balanced)'}
                </text>
                {ranks.map((r, i) => {
                  const w = 60 + (r.pop / maxPop) * 150;
                  return (
                    <g key={r.rank}>
                      <rect x={0} y={i * 18} width={w} height={13} rx={3} fill={cur.color} opacity={0.4 + 0.12 * i}
                        className="transition-all duration-500" />
                      <text x={w + 6} y={i * 18 + 11} fontSize={9} fill="#94a3b8" fontFamily="monospace">
                        #{r.rank}: {r.pop >= 1e6 ? `${(r.pop / 1e6).toFixed(1)}M` : `${(r.pop / 1000).toFixed(0)}k`}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}
            <text x={230} y={290} textAnchor="middle" fontSize={11} fill="#e2e8f0" fontWeight="bold">
              {cur.label}: {cur.pop.toLocaleString('en-US')} people, ~{cur.services} specialised services
            </text>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Level</p>
              <p className="font-mono font-bold text-violet-300">{cur.label}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Urbanisation</p>
              <p className="font-mono font-bold text-amber-300">{urbanPop}%</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Rank pattern</p>
              <p className="font-mono font-bold text-rose-300">{primate ? 'primate' : 'balanced'}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-5 gap-1">
              {LEVELS.map((l) => (
                <button key={l.id} onClick={() => setLevel(l.id)}
                  className={`min-h-11 rounded-lg text-[9px] font-bold ${level === l.id ? 'text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
                  style={level === l.id ? { backgroundColor: l.color } : {}}>
                  {l.label}
                </button>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Regional urbanisation</span><span className="font-mono font-bold text-amber-400">{urbanPop}%</span>
              </div>
              <input type="range" min={10} max={90} step={1} value={urbanPop} aria-label="urbanisation"
                onChange={(e) => setUrbanPop(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Urban growth rate</span><span className="font-mono font-bold text-rose-400">{growth.toFixed(1)} %/yr</span>
              </div>
              <input type="range" min={0.5} max={5} step={0.5} value={growth} aria-label="growth rate"
                onChange={(e) => setGrowth(Number(e.target.value))} className="w-full min-h-11 accent-rose-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setShowRank(!showRank)}
                className={`min-h-11 rounded-xl text-xs font-bold ${showRank ? 'bg-violet-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Rank-size chart
              </button>
              <button onClick={() => { setLevel('town'); setUrbanPop(31); setGrowth(2); setShowRank(true); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;A megacity is just a big village.&quot; Climb the ladder: at each step new FUNCTIONS
              appear (college, specialised hospital, airport) -- services do not merely multiply, they
              CHANGE KIND. That is why you travel to the city, not the hamlet, for an operation.
            </p>
          </div>

          <div className="bg-violet-950/40 rounded-2xl border border-violet-800/50 p-4 text-xs">
            <p className="font-bold text-violet-300 mb-1">What to try</p>
            <p>1. Push urbanisation past 60% with growth above 2.5. Watch the rank-size curve bend -- which ONE city hogs everything?</p>
            <p>2. Drop the growth rate below 2.5 at the same urbanisation. Does primacy survive? What does that say about managing migration?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_GeographyHumanSettlementsSim;

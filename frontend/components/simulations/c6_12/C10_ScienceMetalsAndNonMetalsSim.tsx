'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Science -- Metals and Non-metals
 * Displacement bench: dip a metal strip into another metal's salt solution
 * and let the reactivity series decide. Plus a properties comparator.
 * Self-contained: react + tailwind only.
 */

const SERIES: { metal: string; color: string; ion: string; note: string }[] = [
  { metal: 'K', color: '#f87171', ion: 'K+', note: 'explodes in cold water' },
  { metal: 'Na', color: '#fb923c', ion: 'Na+', note: 'darts on water surface' },
  { metal: 'Ca', color: '#fbbf24', ion: 'Ca2+', note: 'bubbles steadily in water' },
  { metal: 'Mg', color: '#a3e635', ion: 'Mg2+', note: 'burns with dazzling white light' },
  { metal: 'Al', color: '#94a3b8', ion: 'Al3+', note: 'protective oxide coat' },
  { metal: 'Zn', color: '#67e8f9', ion: 'Zn2+', note: 'fizzles in dilute acid' },
  { metal: 'Fe', color: '#9ca3af', ion: 'Fe2+', note: 'rusts slowly' },
  { metal: 'Pb', color: '#64748b', ion: 'Pb2+', note: 'dull grey, soft' },
  { metal: 'H', color: '#e879f9', ion: 'H+', note: 'reference line for acids' },
  { metal: 'Cu', color: '#f97316', ion: 'Cu2+', note: 'blue salts, does not react with dilute HCl' },
  { metal: 'Hg', color: '#c084fc', ion: 'Hg2+', note: 'liquid metal at room temperature' },
  { metal: 'Ag', color: '#e2e8f0', ion: 'Ag+', note: 'tarnishes to black Ag2S' },
  { metal: 'Au', color: '#fcd34d', ion: 'Au3+', note: 'least reactive; found native' },
];

const METAL_PROPS = [
  { prop: 'Malleability', metal: 'Can be hammered into sheets', non: 'Brittle, shatter on hammering' },
  { prop: 'Ductility', metal: 'Drawn into thin wires (Cu)', non: 'Cannot be drawn into wires' },
  { prop: 'Conduction', metal: 'Good conductors of heat + electricity', non: 'Insulators (except graphite)' },
  { prop: 'Lustre', metal: 'Metallic shine when polished', non: 'Dull (except iodine, graphite)' },
  { prop: 'Sonority', metal: 'Ringing sound when struck', non: 'No ringing sound' },
  { prop: 'Oxides', metal: 'Basic or amphoteric oxides', non: 'Acidic or neutral oxides' },
];

export function C10_ScienceMetalsAndNonMetalsSim() {
  const [stripIdx, setStripIdx] = useState(6); // Fe
  const [saltIdx, setSaltIdx] = useState(9); // Cu
  const [dipped, setDipped] = useState(false);
  const [showProps, setShowProps] = useState(false);

  const strip = SERIES[stripIdx];
  const salt = SERIES[saltIdx];
  const reacts = stripIdx < saltIdx && salt.metal !== 'H' ? true : stripIdx < saltIdx;
  const gap = saltIdx - stripIdx;

  const observation = !dipped
    ? 'Dip the strip to find out.'
    : reacts
    ? saltIdx === 9
      ? `Blue colour of CuSO4 fades; ${strip.metal} deposits reddish-brown copper. (${strip.metal} is ${gap} places more reactive)`
      : `${salt.ion.replace(/[0-9+]/g, '')} salt colour fades; ${salt.metal} is displaced and coats the strip.`
    : `No reaction: ${strip.metal} sits BELOW ${salt.metal} in the series, so it cannot push ${salt.metal} out of its salt.`;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-zinc-800 rounded-2xl border border-zinc-600">🔗</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">Class 10 -- Metals and Non-metals</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Reactivity Series Displacement Bench</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 440 300" className="w-full">
            {/* reactivity ladder */}
            <text x={14} y={26} fontSize={11} fontWeight="bold" fill="#94a3b8">most reactive</text>
            {SERIES.map((s, i) => {
              const y = 38 + i * 19;
              const isStrip = i === stripIdx;
              const isSalt = i === saltIdx;
              return (
                <g key={s.metal}>
                  <rect x={14} y={y} width={92} height={15} rx={4}
                    fill={isStrip ? strip.color : isSalt ? `${salt.color}55` : '#1e293b'}
                    stroke={isStrip || isSalt ? '#fff' : '#334155'} strokeWidth={isStrip || isSalt ? 2 : 1} />
                  <text x={60} y={y + 11.5} textAnchor="middle" fontSize={10} fontFamily="monospace"
                    fontWeight={isStrip || isSalt ? 'bold' : 'normal'} fill={isStrip ? '#0f172a' : '#cbd5e1'}>
                    {s.metal} {s.ion}
                  </text>
                </g>
              );
            })}
            <text x={14} y={38 + SERIES.length * 19 + 6} fontSize={11} fontWeight="bold" fill="#94a3b8">least reactive</text>

            {/* beaker */}
            <g>
              <path d="M 250,80 L 250,250 Q 250,268 275,268 L 395,268 Q 420,268 420,250 L 420,80"
                fill="none" stroke="#64748b" strokeWidth={3} />
              <rect x={253} y={140} width={164} height={126}
                fill={dipped && reacts ? (saltIdx === 9 ? '#1d4ed844' : '#3f621255') : saltIdx === 9 ? '#1d4ed866' : '#3f621266'}
                className="transition-all duration-700" />
              <text x={335} y={205} textAnchor="middle" fontSize={11} fill="#e2e8f0" fontFamily="monospace">
                {salt.metal}SO4 solution
              </text>
              {/* strip */}
              <g className="transition-transform duration-700" style={{ transform: dipped ? 'translateY(75px)' : 'translateY(0)' }}>
                <rect x={320} y={60} width={18} height={110} rx={3} fill={strip.color} stroke="#0f172a" strokeWidth={2} />
                <text x={329} y={95} textAnchor="middle" fontSize={11} fontWeight="black" fill="#0f172a" fontFamily="monospace">{strip.metal}</text>
              </g>
              {dipped && reacts && (
                <g>
                  {[0, 1, 2].map((i) => (
                    <circle key={i} r={3} fill="#fcd34d">
                      <animate attributeName="cy" values="240;150" dur={`${1 + i * 0.4}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="1;0" dur={`${1 + i * 0.4}s`} repeatCount="indefinite" />
                      <animate attributeName="cx" values={`${335 + i * 18};${330 + i * 18}`} dur={`${1 + i * 0.4}s`} repeatCount="indefinite" />
                    </circle>
                  ))}
                </g>
              )}
            </g>
          </svg>
          <div className={`mt-2 rounded-xl px-3 py-2 text-xs border transition-colors ${
            dipped ? (reacts ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200' : 'bg-slate-950 border-slate-700 text-slate-400') : 'bg-slate-950 border-slate-800 text-slate-500'
          }`}>
            {observation}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Metal strip</p>
              <select value={stripIdx} onChange={(e) => { setStripIdx(Number(e.target.value)); setDipped(false); }}
                aria-label="metal strip" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono">
                {SERIES.map((s, i) => <option key={s.metal} value={i}>{s.metal} strip ({s.note})</option>)}
              </select>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Salt solution</p>
              <select value={saltIdx} onChange={(e) => { setSaltIdx(Number(e.target.value)); setDipped(false); }}
                aria-label="salt solution" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono">
                {SERIES.map((s, i) => <option key={s.metal} value={i}>{s.metal}SO4 of {s.metal}</option>)}
              </select>
            </div>
            <button onClick={() => setDipped((d) => !d)}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-zinc-700 hover:bg-zinc-600 transition">
              {dipped ? 'Lift strip out' : 'Dip strip into solution'}
            </button>
            <button onClick={() => setShowProps((p) => !p)}
              className="w-full py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 transition">
              {showProps ? 'Hide' : 'Show'} metals vs non-metals properties
            </button>
            {dipped && reacts && (
              <p className="text-[11px] font-mono text-emerald-300 bg-slate-950 rounded-lg px-2 py-1.5 border border-emerald-900">
                {strip.metal} + {salt.metal}SO4 -&gt; {strip.metal}SO4 + {salt.metal}
              </p>
            )}
          </div>

          {showProps && (
            <div className="bg-slate-900/80 rounded-2xl border border-zinc-700 p-4">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="text-zinc-400">
                    <th className="text-left pb-1">Property</th>
                    <th className="text-left pb-1">Metals</th>
                    <th className="text-left pb-1">Non-metals</th>
                  </tr>
                </thead>
                <tbody>
                  {METAL_PROPS.map((p) => (
                    <tr key={p.prop} className="border-t border-slate-800">
                      <td className="py-1 pr-2 text-slate-300 font-bold">{p.prop}</td>
                      <td className="py-1 pr-2 text-emerald-300">{p.metal}</td>
                      <td className="py-1 text-rose-300">{p.non}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              The reactivity series is a tournament ranking: a metal displaces every ion below it.
              Metals above hydrogen even strip H+ from dilute acids (that hissing is H2); copper and
              below ignore acids entirely. Displacement reactions are how we win copper from scrap
              iron and why iron pipes corrode before copper ones.
            </p>
          </div>

          <div className="bg-zinc-900/60 rounded-2xl border border-zinc-700 p-4 text-xs">
            <p className="font-bold text-zinc-200 mb-1">What to try</p>
            <p>1. Try Zn strip in FeSO4, then Fe strip in ZnSO4. Which direction works and why?</p>
            <p>2. Find every metal that fails to react with CuSO4. What do they share in position?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C10_ScienceMetalsAndNonMetalsSim;

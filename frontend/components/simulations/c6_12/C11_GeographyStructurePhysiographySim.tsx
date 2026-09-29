'use client';

import React, { useState } from 'react';

/**
 * Class 11 Geography -- Structure and Physiography
 * ONE concept: India is a three-part geological assembly -- young fold
 * mountains, ancient plateau, recent plains -- each with its own age,
 * rocks and landforms. Click the divisions, cross-section the country.
 * react + tailwind only.
 */

type Div = 'himalaya' | 'plains' | 'plateau' | 'coast' | 'islands';

const DIVS: { id: Div; name: string; age: string; rock: string; landform: string; rivers: string }[] = [
  { id: 'himalaya', name: 'The Himalayas', age: 'Tertiary (youngest, still rising)', rock: 'folded sediments: shale, limestone', landform: 'peaks, valleys, glaciers', rivers: 'youthful, perennial (glacier-fed)' },
  { id: 'plains', name: 'Northern Plains', age: 'Quaternary (newest)', rock: 'alluvium: silt, clay, sand', landform: 'bhabar, terai, bhangar, khadar', rivers: 'mature, meandering, depositional' },
  { id: 'plateau', name: 'Peninsular Plateau', age: 'Precambrian (oldest, ~3600 Ma)', rock: 'hard crystalline: granite, gneiss, basalt', landform: 'broad shallow valleys, rounded hills', rivers: 'old, seasonal, cut ravines (Chambal)' },
  { id: 'coast', name: 'Coastal Plains', age: 'Tertiary-Quaternary', rock: 'sediments, lagoon deposits', landform: 'kayals (Kerala), estuaries, bars', rivers: 'short, fast to the sea' },
  { id: 'islands', name: 'Island Groups', age: 'varied', rock: 'coral (Lakshadweep), volcanic + sediment (Andaman)', landform: 'atolls vs barbed islands', rivers: 'tiny, negligible' }
];

export function C11_GeographyStructurePhysiographySim() {
  const [sel, setSel] = useState<Div>('himalaya');
  const [crossOn, setCrossOn] = useState(true);
  const [drainage, setDrainage] = useState<'perennial' | 'seasonal'>('perennial');

  const d = DIVS.find((x) => x.id === sel)!;

  const fillFor = (id: Div, active: boolean) => {
    const c: Record<Div, string> = {
      himalaya: active ? '#818cf8' : '#3730a3',
      plains: active ? '#34d399' : '#065f46',
      plateau: active ? '#fbbf24' : '#92400e',
      coast: active ? '#22d3ee' : '#155e75',
      islands: active ? '#f472b6' : '#9d174d'
    };
    return c[id];
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700">🏔️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Class 11 -- Structure and Physiography</span>
          <h1 className="text-xl md:text-2xl font-extrabold">India in Three Moves: Fold, Fill, Shield</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            {/* stylised India map */}
            <g>
              <path d="M150,40 L200,30 L235,55 L280,50 L300,80 L290,120 L310,170 L300,220 L265,255 L230,270 L200,240 L185,200 L150,150 L130,100 Z"
                fill="#0f172a" stroke="#334155" strokeWidth={2} />
              {/* clickable divisions */}
              <path d="M150,40 L200,30 L235,55 L280,50 L300,80 L285,95 L160,95 Z" fill={fillFor('himalaya', sel === 'himalaya')}
                onClick={() => setSel('himalaya')} className="cursor-pointer" />
              <path d="M160,95 L285,95 L292,135 L165,135 Z" fill={fillFor('plains', sel === 'plains')}
                onClick={() => setSel('plains')} className="cursor-pointer" />
              <path d="M165,135 L292,135 L310,170 L300,220 L265,255 L230,270 L200,240 L185,200 L150,150 Z"
                fill={fillFor('plateau', sel === 'plateau')} onClick={() => setSel('plateau')} className="cursor-pointer" />
              <path d="M230,270 L265,255 L300,220 L296,238 L262,268 L232,282 Z" fill={fillFor('coast', sel === 'coast')}
                onClick={() => setSel('coast')} className="cursor-pointer" />
              <circle cx={330} cy={120} r={10} fill={fillFor('islands', sel === 'islands')} onClick={() => setSel('islands')} className="cursor-pointer" />
              <circle cx={342} cy={165} r={8} fill={fillFor('islands', sel === 'islands')} onClick={() => setSel('islands')} className="cursor-pointer" />
            </g>
            {/* cross-section along ~80E */}
            {crossOn && (
              <g className="transition-all duration-500">
                <path d="M30,40 L30,285 L430,285 L430,40" fill="none" stroke="#334155" />
                <path d="M30,285 L60,200 L110,140 L150,175 L230,255 L320,235 L400,270 L430,265 L430,285 Z"
                  fill="none" stroke="#94a3b8" strokeWidth={2} />
                {/* geology bands */}
                <path d="M55,215 L110,150 L125,165 L80,250 L50,260 Z" fill={fillFor('himalaya', sel === 'himalaya')} opacity={sel === 'himalaya' ? 1 : 0.5} />
                <path d="M130,175 L225,258 L225,272 L128,205 Z" fill={fillFor('plains', sel === 'plains')} opacity={sel === 'plains' ? 1 : 0.5} />
                <path d="M225,258 L320,235 L400,272 L228,272 Z" fill={fillFor('plateau', sel === 'plateau')} opacity={sel === 'plateau' ? 1 : 0.5} />
                <text x={35} y={38} fontSize={9} fill="#64748b">cross-section west-east: mountains-plain-shield</text>
              </g>
            )}
            {/* rivers: perennial from glaciers vs seasonal plateau-fed */}
            {drainage === 'perennial' ? (
              <path d="M270,55 C265,110 240,150 235,200 C232,235 245,262 250,278" fill="none" stroke="#38bdf8" strokeWidth={2.5}>
                <animate attributeName="stroke-dasharray" values="6,6;10,6" dur="0.6s" repeatCount="indefinite" />
              </path>
            ) : (
              <path d="M280,170 C268,200 250,235 245,275" fill="none" stroke="#818cf8" strokeWidth={2} strokeDasharray="5 7" />
            )}
            <text x={255} y={296} fontSize={9} fill={drainage === 'perennial' ? '#38bdf8' : '#818cf8'}>
              {drainage === 'perennial' ? 'glacier-fed river: flows all year' : 'plateau river: monsoon-fed, seasonal'}
            </text>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Selected division</p>
              <p className="font-mono font-bold text-emerald-300">{d.name}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Geologic age</p>
              <p className="font-mono font-bold text-amber-300 text-[11px] leading-tight">{d.age.split(' (')[0]}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Cross-section</p>
              <p className="font-mono font-bold text-slate-300">{crossOn ? 'visible' : 'hidden'}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-2">
            {DIVS.map((x) => (
              <button key={x.id} onClick={() => setSel(x.id)}
                className={`min-h-11 w-full rounded-xl text-xs font-bold text-left px-3 ${sel === x.id ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                {x.name}
              </button>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button onClick={() => setDrainage(drainage === 'perennial' ? 'seasonal' : 'perennial')}
                className="min-h-11 rounded-xl text-xs font-bold bg-gold-700 hover:bg-gold-600">
                River: {drainage === 'perennial' ? 'glacier-fed' : 'monsoon-fed'}
              </button>
              <button onClick={() => setCrossOn(!crossOn)}
                className={`min-h-11 rounded-xl text-xs font-bold ${crossOn ? 'bg-gold-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Cross-section
              </button>
            </div>
            <button onClick={() => { setSel('himalaya'); setCrossOn(true); setDrainage('perennial'); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-300">
            <p className="font-bold text-emerald-300 mb-1">{d.name} -- fact card</p>
            <p>Age: {d.age}</p>
            <p>Rocks: {d.rock}</p>
            <p>Landforms: {d.landform}</p>
            <p>Rivers: {d.rivers}</p>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;The Himalayas are ancient like the plateau.&quot; Backwards -- the Peninsular
              plateau is a ~3600-million-year-old shield; the Himalayas are babies (~40-50 Ma) still
              growing as India pushes into Asia.
            </p>
          </div>

          <div className="bg-emerald-950/40 rounded-2xl border border-emerald-800/50 p-4 text-xs">
            <p className="font-bold text-emerald-300 mb-1">What to try</p>
            <p>1. Click Plains, then Plateau. Which division is geologically OLDER, and which one is still being DEPOSITED today?</p>
            <p>2. Flip the river from glacier-fed to monsoon-fed. Why does the Peninsular plateau never host a perennial Ganga?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_GeographyStructurePhysiographySim;

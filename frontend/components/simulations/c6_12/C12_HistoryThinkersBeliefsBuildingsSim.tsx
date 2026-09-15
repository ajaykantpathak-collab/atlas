'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 12 History -- Thinkers, Beliefs and Buildings (Sanchi)
 * ONE concept: a stupa is a walk-through cosmology. Donate the parts
 * (dome, harmika, vedika, torana), then take the pradakshina patha and
 * read what each part teaches the pilgrim's body. react + tailwind only.
 */

type Part = 'dome' | 'harmika' | 'vedika' | 'torana' | 'patha';

const PARTS: { id: Part; label: string; donor: string; meaning: string; cost: number }[] = [
  { id: 'dome', label: 'The Anda (dome)', donor: 'royal women like Nangamla/Nicakaki funded extensions; Ashoka began the Great Stupa', meaning: 'the egg of creation -- the Buddha beyond the body', cost: 40 },
  { id: 'harmika', label: 'Harmika + chhatri', donor: 'the sangha from collective merit', meaning: 'a symbolic parasol crowning the world-axis', cost: 15 },
  { id: 'vedika', label: 'Vedika railing', donor: 'guilds, monks, nuns -- hundreds of small gifts', meaning: 'marks the sacred boundary between worlds', cost: 20 },
  { id: 'torana', label: 'Torana gateways x4', donor: 'Satavahana-era ivory carvers of Vidisha', meaning: 'jataka stories in stone -- enter, then walk clockwise', cost: 25 },
  { id: 'patha', label: 'Pradakshina patha', donor: 'maintained by pilgrims\' offerings', meaning: 'the circumambulation: sun-wise, keeping the stupa on the RIGHT', cost: 10 }
];

export function C12_HistoryThinkersBeliefsBuildingsSim() {
  const [built, setBuilt] = useState<Part[]>(['dome']);
  const [sel, setSel] = useState<Part>('dome');
  const [steps, setSteps] = useState(0); // pilgrim circumambulation progress 0-360 deg

  const total = useMemo(() => built.reduce((s, p) => s + (PARTS.find((x) => x.id === p)?.cost || 0), 0), [built]);
  const donation = Math.min(140, total * 2 + 40); // merit points grow with completeness

  const partAngle = steps;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-amber-950/80 rounded-2xl border border-amber-700">🛕</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Class 12 -- Thinkers, Beliefs and Buildings</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Build Sanchi: Donate the Stupa, Walk the Path</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 280" className="w-full">
            <rect x={0} y={0} width={460} height={280} rx={10} fill="#0b1220" />
            {/* stupa elevation */}
            <g className="transition-all duration-500">
              <rect x={90} y={210} width={220} height={30} rx={4} fill="#57534e" stroke="#78716c" />
              {built.includes('vedika') && <rect x={80} y={185} width={240} height={22} rx={4} fill="#a8a29e" stroke="#d6d3d1" />}
              {built.includes('dome') && <path d="M110,185 C110,120 290,120 290,185 Z" fill="#d6d3d1" stroke="#78716c" strokeWidth={2} />}
              {built.includes('harmika') && (
                <g>
                  <rect x={188} y={98} width={24} height={16} fill="#e7e5e4" stroke="#57534e" />
                  <line x1={200} y1={98} x2={200} y2={78} stroke="#57534e" strokeWidth={2} />
                  <rect x={193} y={74} width={14} height={6} rx={3} fill="#e7e5e4" stroke="#57534e" />
                </g>
              )}
              {built.includes('torana') && (
                <g stroke="#b45309" strokeWidth={5} fill="none">
                  <line x1={300} y1={210} x2={300} y2={140} />
                  <line x1={322} y1={210} x2={322} y2={140} />
                  <line x1={292} y1={140} x2={330} y2={140} />
                  <line x1={292} y1={128} x2={330} y2={128} />
                  <circle cx={311} cy={120} r={7} fill="#fbbf24" stroke="#b45309" />
                </g>
              )}
              {built.includes('torana') && (
                <g opacity={0.4}>
                  {[0, 1, 2].map((i) => (
                    <circle key={i} cx={450} cy={40 + i * 18} r={0} />
                  ))}
                  <text x={312} y={166} fontSize={7.5} fill="#fbbf24">jataka carvings</text>
                </g>
              )}
            </g>
            {/* pilgrim on pradakshina patha (plan view, bottom right) */}
            <g transform="translate(375,215)">
              <circle r={42} fill="none" stroke={built.includes('patha') ? '#94a3b8' : '#1e293b'} strokeWidth={8}
                strokeDasharray={built.includes('patha') ? 'none' : '4 5'} />
              <circle r={22} fill={built.includes('dome') ? '#d6d3d1' : '#1e293b'} />
              {built.includes('patha') && (
                <g transform={`rotate(${partAngle})`} className="transition-transform duration-200">
                  <circle cx={42} cy={0} r={5} fill="#f472b6" />
                </g>
              )}
              <text x={0} y={58} fontSize={8.5} fill="#94a3b8" textAnchor="middle">plan: clockwise, stupa on the right</text>
            </g>
            {/* selected part annotation */}
            <rect x={20} y={20} width={250} height={54} rx={10} fill="#1c1917" stroke="#a16207" />
            <text x={32} y={38} fontSize={11} fill="#fbbf24" fontWeight="bold">
              {PARTS.find((p) => p.id === sel)!.label}
            </text>
            <text x={32} y={56} fontSize={8.5} fill="#d6d3d1">
              {PARTS.find((p) => p.id === sel)!.meaning}
            </text>
            <text x={32} y={69} fontSize={8} fill="#94a3b8">donors: {PARTS.find((p) => p.id === sel)!.donor}</text>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Parts raised</p>
              <p className="font-mono font-bold text-amber-300">{built.length}/5</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Merit (punya) index</p>
              <p className="font-mono font-bold text-fuchsia-300">{donation}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Circumambulations</p>
              <p className="font-mono font-bold text-sky-300">{Math.floor(steps / 360)}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-2">
            <p className="text-[11px] text-slate-400 font-bold">Fund a part (each donation adds to the stupa):</p>
            {PARTS.map((p) => {
              const done = built.includes(p.id);
              return (
                <button key={p.id} onClick={() => { setBuilt((b) => (done ? b.filter((x) => x !== p.id) : [...b, p.id])); setSel(p.id); }}
                  className={`min-h-11 w-full rounded-xl text-xs font-bold text-left px-3 flex justify-between items-center ${done ? 'bg-amber-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  <span>{p.label}</span>
                  <span className="font-mono opacity-80">{done ? 'BUILT' : `${p.cost}k karshapana`}</span>
                </button>
              );
            })}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button onClick={() => setSteps((s) => (s + 30) % 7200)}
                className="min-h-11 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-500">
                Walk pradakshina
              </button>
              <button onClick={() => { setBuilt(['dome']); setSel('dome'); setSteps(0); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Kings built the great monuments alone.&quot; Sanchi&apos;s own inscriptions list
              hundreds of ordinary donors -- nuns like Nangamla, ivory workers of Vidisha, guilds.
              Remove the vedika and torana (non-royal gifts) and the stupa is unreadable: belief was
              crowdfunded.
            </p>
          </div>

          <div className="bg-amber-950/40 rounded-2xl border border-amber-800/50 p-4 text-xs">
            <p className="font-bold text-amber-300 mb-1">What to try</p>
            <p>1. Build everything EXCEPT the toranas. What does the pilgrim lose -- which stories never get told in stone?</p>
            <p>2. Walk five circumambulations. Which side of the stupa is always toward you if you walk correctly -- and why is that direction solar?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_HistoryThinkersBeliefsBuildingsSim;

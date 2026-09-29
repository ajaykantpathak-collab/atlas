'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 12 History -- The Meerut Mutiny of 1857
 * ONE concept: the revolt spread along the Ganga valley by rumour,
 * cartridge grievance and seized communication lines. Fire the spark at
 * Meerut, then open or close routes and watch the uprising travel.
 * react + tailwind only.
 */

type City = 'meerut' | 'delhi' | 'kanpur' | 'lucknow' | 'jhansi';

const CITIES: { id: City; x: number; y: number; name: string; note: string }[] = [
  { id: 'meerut', x: 330, y: 60, name: 'Meerut', note: '10 May 1857: sepoys refuse cartridges, march out' },
  { id: 'delhi', x: 245, y: 90, name: 'Delhi', note: 'sepoy columns proclaim Bahadur Shah Zafar emperor' },
  { id: 'kanpur', x: 170, y: 150, name: 'Kanpur', note: 'Nana Saheb takes the magazine' },
  { id: 'lucknow', x: 240, y: 185, name: 'Lucknow', note: 'Awadh annexation grievance; Residency besieged' },
  { id: 'jhansi', x: 130, y: 230, name: 'Jhansi', note: 'Rani Lakshmibai joins after her annexation' }
];

const LINKS: [City, City][] = [
  ['meerut', 'delhi'], ['delhi', 'kanpur'], ['delhi', 'lucknow'], ['kanpur', 'lucknow'], ['kanpur', 'jhansi']
];

export function C12_HistoryMeerutMutinySim() {
  const [grievance, setGrievance] = useState(70); // cartridge + annexation anger
  const [telegraph, setTelegraph] = useState(true); // British comms intact?
  const [week, setWeek] = useState(0); // weeks after 10 May

  const spread = useMemo(() => {
    const out: { city: City; week: number }[] = [{ city: 'meerut', week: 0 }];
    let frontier: City[] = ['meerut'];
    let w = 0;
    while (frontier.length && w < 12) {
      w += 1;
      const next: City[] = [];
      for (const f of frontier) {
        for (const [a, b] of LINKS) {
          const t = a === f ? b : b === f ? a : null;
          if (t && !out.some((o) => o.city === t) && !next.includes(t)) {
            const gate = (grievance / 100) * (telegraph ? 0.85 : 1.15);
            if (gate > 0.3) next.push(t);
          }
        }
      }
      if (!next.length) break;
      for (const n of next) out.push({ city: n, week: w });
      frontier = next;
    }
    return out;
  }, [grievance, telegraph]);

  const litCities = spread.filter((s) => s.week <= week).map((s) => s.city);
  const suppressed = spread.length < 5 && week >= Math.max(4, ...spread.map((s) => s.week));

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-red-950/80 rounded-2xl border border-red-700">🔥</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-400">Class 12 -- The Meerut Mutiny of 1857</span>
          <h1 className="text-xl md:text-2xl font-extrabold">March of the Revolt: Ganga Valley, May-June 1857</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 280" className="w-full">
            <rect x={0} y={0} width={460} height={280} rx={10} fill="#0b1220" />
            {/* Ganga hint */}
            <path d="M280,40 C220,90 190,140 160,230" stroke="#0e7490" strokeWidth={3} fill="none" opacity={0.4} />
            {/* links */}
            {LINKS.map(([a, b]) => {
              const A = CITIES.find((c) => c.id === a)!, B = CITIES.find((c) => c.id === b)!;
              const hot = litCities.includes(a) && litCities.includes(b);
              return (
                <g key={`${a}-${b}`}>
                  <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={hot ? '#f43f5e' : '#334155'} strokeWidth={hot ? 3 : 2}
                    strokeDasharray={hot ? 'none' : '5 5'} className="transition-all duration-500">
                    {hot && <animate attributeName="stroke-dashoffset" values="0;-14" dur="0.8s" repeatCount="indefinite" />}
                  </line>
                </g>
              );
            })}
            {/* cities */}
            {CITIES.map((c) => {
              const up = litCities.includes(c.id);
              return (
                <g key={c.id}>
                  {up && <circle cx={c.x} cy={c.y} r={13} fill="rgba(244,63,94,0.3)" className="transition-all duration-500">
                    <animate attributeName="r" values="13;17;13" dur="1.4s" repeatCount="indefinite" />
                  </circle>}
                  <circle cx={c.x} cy={c.y} r={7} fill={up ? '#f43f5e' : '#475569'} className="transition-colors duration-500" />
                  <text x={c.x} y={c.y - 14} fontSize={10} fill={up ? '#fda4af' : '#94a3b8'} textAnchor="middle" fontWeight="bold">{c.name}</text>
                  {up && <text x={c.x} y={c.y + 22} fontSize={7.5} fill="#94a3b8" textAnchor="middle" opacity={0.85}>
                    week {spread.find((s) => s.city === c.id)?.week}
                  </text>}
                </g>
              );
            })}
            {/* telegraph line */}
            <path d="M330,60 C360,140 340,200 250,240" fill="none" stroke={telegraph ? '#22d3ee' : '#1e293b'}
              strokeWidth={1.5} strokeDasharray="3 4" className="transition-colors duration-500" />
            <text x={352} y={168} fontSize={9} fill={telegraph ? '#67e8f9' : '#334155'}>
              {telegraph ? 'British telegraph: warning travels fast' : 'telegraph cut: British blind, rebels move'}
            </text>
            <text x={20} y={266} fontSize={10} fill="#e2e8f0" fontWeight="bold">
              week {week}: {litCities.length}/5 towns in revolt {suppressed ? '-- rising contained' : litCities.length === 5 ? '-- valley aflame' : ''}
            </text>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Towns in revolt</p>
              <p className="font-mono font-bold text-rose-300">{litCities.length}/5</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Week reached Jhansi</p>
              <p className="font-mono font-bold text-amber-300">
                {spread.find((s) => s.city === 'jhansi')?.week ?? '--'}
              </p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Grievance index</p>
              <p className="font-mono font-bold text-orange-300">{grievance}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Weeks after 10 May 1857</span><span className="font-mono font-bold text-red-400">{week}</span>
              </div>
              <input type="range" min={0} max={12} step={1} value={week} aria-label="week"
                onChange={(e) => setWeek(Number(e.target.value))} className="w-full min-h-11 accent-red-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Shared grievances (cartridges, annexations)</span><span className="font-mono font-bold text-orange-400">{grievance}</span>
              </div>
              <input type="range" min={20} max={100} step={5} value={grievance} aria-label="grievance"
                onChange={(e) => setGrievance(Number(e.target.value))} className="w-full min-h-11 accent-orange-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setTelegraph(!telegraph)}
                className={`min-h-11 rounded-xl text-[10px] font-bold ${telegraph ? 'bg-gold-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Telegraph: {telegraph ? 'British-run' : 'CUT'}
              </button>
              <button onClick={() => { setWeek(0); setGrievance(70); setTelegraph(true); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-300">
            <p className="font-bold text-red-300 mb-1">City card</p>
            {CITIES.filter((c) => litCities.includes(c.id)).slice(-1).map((c) => (
              <p key={c.id}>{c.name}: {c.note}</p>
            ))}
            {litCities.length === 0 && <p className="text-slate-500">Advance the clock -- Meerut ignites on 10 May.</p>}
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;1857 was just a sepoy mutiny over greased cartridges.&quot; Cut the grievance to 40:
              even with the spark, the fire will not jump towns. It spread because annexation, tax
              and taluqdari anger had already stacked the valley -- cartridges only lit it.
            </p>
          </div>

          <div className="bg-red-950/40 rounded-2xl border border-red-800/50 p-4 text-xs">
            <p className="font-bold text-red-300 mb-1">What to try</p>
            <p>1. Cut the telegraph and set grievances to 90. How many weeks sooner does Jhansi join -- and why did the Delhi telegraph matter so much?</p>
            <p>2. Freeze grievances at 40 and march the clock to week 12. Which links stay cold, and what does that say about &quot;spontaneous&quot; revolt?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_HistoryMeerutMutinySim;

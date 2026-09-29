'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 12 Geography -- Tertiary and Quaternary Activities
 * ONE concept: as an economy develops, work shifts from fields to
 * services (tertiary) and then to knowledge (quaternary). Set the
 * development dial, watch employment and GDP-by-sector rebalance.
 * react + tailwind only.
 */

export function C12_GeographyTertiaryQuaternarySim() {
  const [dev, setDev] = useState(35); // development index 0-100
  const [outsourcing, setOutsourcing] = useState(40); // global connectivity / BPO pull
  const [education, setEducation] = useState(30); // skills investment
  const [view, setView] = useState<'jobs' | 'gdp'>('jobs');

  const sectors = useMemo(() => {
    const primary = Math.max(4, 72 - dev * 0.68); // % employment
    const tertiary = Math.min(62, 18 + dev * 0.44);
    const quaternary = Math.min(30, (education / 100) * (dev / 100) * 90 + (outsourcing / 100) * 8);
    const secondary = Math.max(100 - primary - tertiary - quaternary, 5);
    return { primary, secondary, tertiary, quaternary };
  }, [dev, education, outsourcing]);

  const kv = (n: number) => n / 100;

  const data = [
    { k: 'Primary', v: sectors.primary, c: '#34d399', note: 'farming, fishing, mining' },
    { k: 'Secondary', v: sectors.secondary, c: '#fbbf24', note: 'manufacturing, construction' },
    { k: 'Tertiary', v: sectors.tertiary, c: '#38bdf8', note: 'trade, transport, tourism, health' },
    { k: 'Quaternary', v: sectors.quaternary, c: '#a78bfa', note: 'IT, R&D, finance analytics, teaching' }
  ];
  // tertiary + quaternary combined value for the service banner
  const serviceShare = sectors.tertiary + sectors.quaternary;
  const gapTQ = Math.max(2, sectors.tertiary * 0.55 - sectors.quaternary);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700">💼</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 12 -- Tertiary and Quaternary Activities</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Field to Fax to PhD: the Work Shift Machine</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            <rect x={0} y={0} width={460} height={300} rx={10} fill="#0b1220" />
            {/* stacked bar: employment or GDP by sector */}
            <text x={20} y={26} fontSize={11} fill="#94a3b8">
              {view === 'jobs' ? 'Share of EMPLOYMENT (%)' : 'Share of NATIONAL INCOME (%)'} -- services now {serviceShare.toFixed(0)}%
            </text>
            {(() => {
              let x = 30;
              const mult = view === 'jobs' ? 1 : 0.82; // services contribute relatively less to GDP early
              return data.map((s) => {
                const w = s.v * (view === 'jobs' ? 4 : 4) * (view === 'gdp' && (s.k === 'Tertiary' || s.k === 'Quaternary') ? 1.05 : 1) * 0.98;
                const rect = (
                  <g key={s.k}>
                    <rect x={x} y={50} width={Math.max(2, w)} height={54} fill={s.c}
                      className="transition-all duration-500" />
                    <text x={x + Math.max(2, w) / 2} y={82} fontSize={10} textAnchor="middle"
                      fill="#0b1220" fontFamily="monospace" fontWeight="bold">
                      {Math.round(s.v * (view === 'gdp' && (s.k === 'Tertiary' || s.k === 'Quaternary') ? 1.05 : 1))}
                    </text>
                    <text x={x + Math.max(2, w) / 2} y={122} fontSize={9} textAnchor="middle" fill={s.c}>{s.k}</text>
                  </g>
                );
                x += Math.max(2, w) + 4;
                void mult;
                return rect;
              });
            })()}
            {/* people icons row: 10 icons, colour = sector of employment */}
            <text x={20} y={168} fontSize={10} fill="#94a3b8">every 10th worker does...</text>
            {Array.from({ length: 10 }, (_, i) => {
              let acc = 0;
              const pos = i * 10 + 5;
              let color = '#34d399';
              for (const s of data) {
                if (pos < acc + s.v) { color = s.c; break; }
                acc += s.v;
              }
              return (
                <g key={i} transform={`translate(${48 + i * 38}, 190)`} className="transition-all duration-500">
                  <circle cx={0} cy={-8} r={6} fill={color} />
                  <rect x={-7} y={0} width={14} height={20} rx={5} fill={color} />
                </g>
              );
            })}
            {/* quaternary growth dial arc */}
            <path d="M 230 285 A 70 70 0 0 1 300 285" fill="none" stroke="#334155" strokeWidth={10} />
            <path d="M 230 285 A 70 70 0 0 1 300 285" fill="none" stroke="#a78bfa" strokeWidth={10}
              strokeDasharray={`${(sectors.quaternary / 30) * 220} 400`} className="transition-all duration-500" />
            <text x={265} y={278} textAnchor="middle" fontSize={11} fill="#a78bfa" fontFamily="monospace">
              quaternary {sectors.quaternary.toFixed(1)}%
            </text>
          </svg>
          <div className="grid grid-cols-4 gap-2 text-center text-xs mt-1">
            {data.map((s) => (
              <div key={s.k} className="bg-slate-950 rounded-xl p-2 border border-slate-800">
                <p className="text-[10px] text-slate-500">{s.k}</p>
                <p className="font-mono font-bold" style={{ color: s.c }}>{s.v.toFixed(1)}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Development level</span><span className="font-mono font-bold text-emerald-400">{dev}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={dev} aria-label="development"
                onChange={(e) => setDev(Number(e.target.value))} className="w-full min-h-11 accent-emerald-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Global outsourcing pull</span><span className="font-mono font-bold text-gold-400">{outsourcing}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={outsourcing} aria-label="outsourcing"
                onChange={(e) => setOutsourcing(Number(e.target.value))} className="w-full min-h-11 accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Education and skills spend</span><span className="font-mono font-bold text-gold-400">{education}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={education} aria-label="education"
                onChange={(e) => setEducation(Number(e.target.value))} className="w-full min-h-11 accent-gold-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setView(view === 'jobs' ? 'gdp' : 'jobs')}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700">
                Show: {view === 'jobs' ? 'employment' : 'GDP share'}
              </button>
              <button onClick={() => { setDev(35); setOutsourcing(40); setEducation(30); setView('jobs'); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Know the border</p>
            <p>
              Tertiary = services delivered to people (shop, bus, nurse). Quaternary = knowledge
              produced about knowledge (software, research, analytics). Current gap in this economy:
              the tertiary tier is {gapTQ.toFixed(0)} points ahead -- quaternary needs education +
              connectivity to grow.
            </p>
            <p className="font-bold text-slate-300 mt-2 mb-1">Misconception killer</p>
            <p>
              &quot;Services are unproductive because they make no thing.&quot; Raise education at high
              development: the quaternary band grows fastest, and that is where GDP per worker peaks.
            </p>
          </div>

          <div className="bg-gold-950/40 rounded-2xl border border-gold-800/50 p-4 text-xs">
            <p className="font-bold text-gold-300 mb-1">What to try</p>
            <p>1. Slide development 0 to 100 and log primary employment. Near what level does tertiary overtake it?</p>
            <p>2. Max outsourcing but keep education at 10. Why does quaternary stay stunted? Fix it with the third slider.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_GeographyTertiaryQuaternarySim;

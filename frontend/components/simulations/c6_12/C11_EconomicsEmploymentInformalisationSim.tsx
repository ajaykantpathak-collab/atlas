'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Economists split the economy into a FORMAL sector (registered firms, written contracts) and an INFORMAL sector. ' +
  'But workers are a different cut: even inside the formal sector, many jobs are informal -- contract or casual, ' +
  'no pension, no paid leave. This lab splits 100 Indian workers. About 18 in 100 work in the formal sector -- ' +
  'now check how many of THOSE actually hold formal jobs.';

interface Preset {
  label: string;
  formalSectorShare: number;
  informalWithinFormal: number;
}

const PRESETS: Preset[] = [
  { label: 'India ~2011-12', formalSectorShare: 18, informalWithinFormal: 45 },
  { label: 'Even split model', formalSectorShare: 50, informalWithinFormal: 45 },
  { label: 'Textbook ideal', formalSectorShare: 50, informalWithinFormal: 0 },
];

export function C11_EconomicsEmploymentInformalisationSim() {
  const [formalSectorShare, setFormalSectorShare] = useState(18); // % of 100 workers in formal sector
  const [informalWithinFormal, setInformalWithinFormal] = useState(45); // % of formal-sector jobs that are informal

  const stats = useMemo(() => {
    const formalSectorWorkers = formalSectorShare;
    const informalJobsInFormal = Math.round(formalSectorWorkers * (informalWithinFormal / 100));
    const formalWorkers = formalSectorWorkers - informalJobsInFormal;
    const informalSectorWorkers = 100 - formalSectorWorkers;
    const totalInformalWorkers = informalJobsInFormal + informalSectorWorkers;
    return { formalSectorWorkers, informalJobsInFormal, formalWorkers, informalSectorWorkers, totalInformalWorkers };
  }, [formalSectorShare, informalWithinFormal]);

  const colorOf = (i: number) => {
    if (i < stats.formalWorkers) return '#34d399'; // formal job in formal sector
    if (i < stats.formalSectorWorkers) return '#fbbf24'; // informal job inside formal sector
    return '#f87171'; // informal sector worker
  };

  const reset = () => {
    setFormalSectorShare(18);
    setInformalWithinFormal(45);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">100 Workers: Who Really Has a Formal Job?</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Worker grid */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <svg viewBox="0 0 380 260" className="w-full">
            {Array.from({ length: 100 }, (_, i) => {
              const col = i % 10;
              const row = Math.floor(i / 10);
              return (
                <rect
                  key={i}
                  x={15 + col * 35}
                  y={35 + row * 21}
                  width={30}
                  height={16}
                  rx={3}
                  fill={colorOf(i)}
                  style={{ transition: 'fill 0.35s' }}
                />
              );
            })}
            <text x={190} y={18} textAnchor="middle" fontSize={13} fontWeight="bold" fill="#e2e8f0">
              100 workers, {formalSectorShare} in the formal sector
            </text>
            {/* legend */}
            <rect x={15} y={244} width={12} height={12} rx={2} fill="#34d399" />
            <text x={32} y={254} fontSize={10} fill="#94a3b8">formal job</text>
            <rect x={110} y={244} width={12} height={12} rx={2} fill="#fbbf24" />
            <text x={127} y={254} fontSize={10} fill="#94a3b8">informal job inside formal sector</text>
            <rect x={290} y={244} width={12} height={12} rx={2} fill="#f87171" />
            <text x={307} y={254} fontSize={10} fill="#94a3b8">informal sector</text>
          </svg>
        </div>

        {/* Live tally */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-400">Live tally (per 100 workers)</div>
          <div className="flex justify-between text-slate-300">
            <span>Formal jobs (security + benefits)</span>
            <span className="font-mono text-emerald-300 font-bold">{stats.formalWorkers}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Informal jobs inside the formal sector</span>
            <span className="font-mono text-amber-300">{stats.informalJobsInFormal}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Workers in the informal sector</span>
            <span className="font-mono text-rose-300">{stats.informalSectorWorkers}</span>
          </div>
          <div className="border-t border-slate-800 pt-2 flex justify-between text-slate-300">
            <span className="font-semibold">ALL informal workers</span>
            <span className="font-mono text-rose-300 font-bold">{stats.totalInformalWorkers}%</span>
          </div>
          <div className="h-3 bg-slate-800 rounded mt-1 overflow-hidden flex">
            <div className="h-3 bg-emerald-500" style={{ width: `${stats.formalWorkers}%`, transition: 'width 0.35s' }} />
            <div className="h-3 bg-amber-500" style={{ width: `${stats.informalJobsInFormal}%`, transition: 'width 0.35s' }} />
            <div className="h-3 bg-rose-500" style={{ width: `${stats.informalSectorWorkers}%`, transition: 'width 0.35s' }} />
          </div>
          <div className="text-xs text-slate-400 pt-1">
            Sector line: formal sector holds {stats.formalSectorWorkers} of 100 workers; worker line: only {stats.formalWorkers} of 100 hold formal jobs.
          </div>
          <div className="text-amber-300 text-xs pt-2 border-t border-slate-800">
            Misconception killer: &quot;a job in the organised sector IS a formal job.&quot; Wrong -- a large slice of formal-sector jobs are
            contract or casual work. That is why informalisation can rise even when the formal sector grows.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Workers in the formal sector</span>
            <span className="font-mono font-bold text-gold-300">{formalSectorShare} per 100</span>
          </label>
          <input type="range" aria-label="formal sector share" min={5} max={60} value={formalSectorShare}
            onChange={(e) => setFormalSectorShare(Number(e.target.value))} className="w-full mt-2 accent-gold-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Formal-sector jobs that are informal (contract/casual)</span>
            <span className="font-mono font-bold text-amber-300">{informalWithinFormal}%</span>
          </label>
          <input type="range" aria-label="informal jobs within formal sector" min={0} max={90} value={informalWithinFormal}
            onChange={(e) => setInformalWithinFormal(Number(e.target.value))} className="w-full mt-2 accent-amber-400" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => { setFormalSectorShare(p.formalSectorShare); setInformalWithinFormal(p.informalWithinFormal); }}
            className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-gold-600 border-gold-400 hover:bg-gold-500"
          >
            {p.label}
          </button>
        ))}
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Load &quot;India ~2011-12&quot;. How many of the 18 formal-sector workers still lack job security? Now set the informal-within-formal slider to 0 -- by how much does total informality fall?</li>
          <li>Push the formal-sector slider up to 60 while keeping informal-within-formal at 80. Does a bigger formal sector guarantee more formal JOBS? What is the tipping point?</li>
        </ol>
      </div>
    </div>
  );
}

export default C11_EconomicsEmploymentInformalisationSim;

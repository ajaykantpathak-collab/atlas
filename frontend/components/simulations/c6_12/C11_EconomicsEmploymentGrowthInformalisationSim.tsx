'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Five decades of Indian employment in one chart. Workers moved OUT of farming (primary) -- but mostly into ' +
  'services (tertiary), not factories (secondary). Scrub the timeline and watch the stacked bar breathe. ' +
  'Data: approximate workforce shares and totals (NCERT / NSO decades, usual status).';

interface Decade {
  label: string;
  total: number; // million workers, approximate
  primary: number; // % share
  secondary: number;
  tertiary: number;
}

const DECADES: Decade[] = [
  { label: '1972-73', total: 178, primary: 74, secondary: 11, tertiary: 15 },
  { label: '1983', total: 235, primary: 69, secondary: 13, tertiary: 18 },
  { label: '1993-94', total: 315, primary: 64, secondary: 16, tertiary: 20 },
  { label: '1999-2000', total: 342, primary: 60, secondary: 17, tertiary: 23 },
  { label: '2011-12', total: 470, primary: 49, secondary: 24, tertiary: 27 },
];

type Sector = 'primary' | 'secondary' | 'tertiary';
const SECTORS: Sector[] = ['primary', 'secondary', 'tertiary'];
const SECTOR_COLOR: Record<Sector, string> = { primary: '#34d399', secondary: '#818cf8', tertiary: '#fbbf24' };

export function C11_EconomicsEmploymentGrowthInformalisationSim() {
  const [idx, setIdx] = useState(0);
  const [absoluteMode, setAbsoluteMode] = useState(false);
  const [highlight, setHighlight] = useState<Sector>('primary');

  const d = DECADES[idx];
  const dEnd = DECADES[DECADES.length - 1];

  const workers = useMemo(() => {
    const out = {} as Record<Sector, number>;
    SECTORS.forEach((s) => {
      out[s] = Math.round(d[s] * d.total) / 100;
    });
    return out;
  }, [d]);

  const endWorkers = useMemo(() => {
    const out = {} as Record<Sector, number>;
    SECTORS.forEach((s) => {
      out[s] = Math.round(dEnd[s] * dEnd.total) / 100;
    });
    return out;
  }, [dEnd]);

  const changePct = ((workers[highlight] / (DECADES[0][highlight] * DECADES[0].total / 100) - 1) * 100).toFixed(0);
  const shareShift = (d[highlight] - DECADES[0][highlight]).toFixed(1);

  const reset = () => {
    setIdx(0);
    setAbsoluteMode(false);
    setHighlight('primary');
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Where India Works: Five Decades, Three Sectors</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Stacked bar chart */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <svg viewBox="0 0 400 260" className="w-full">
            <text x={200} y={18} textAnchor="middle" fontSize={13} fontWeight="bold" fill="#e2e8f0">
              Workforce structure, {d.label}
            </text>
            {SECTORS.map((s, i) => {
              const below = SECTORS.slice(0, i).reduce((acc, k) => acc + d[k], 0);
              const h = (d[s] / 100) * 190;
              const y = 210 - ((below + d[s]) / 100) * 190;
              return (
                <rect
                  key={s}
                  x={110}
                  y={y}
                  width={110}
                  height={Math.max(h, 0.5)}
                  rx={4}
                  fill={SECTOR_COLOR[s]}
                  opacity={highlight === s ? 0.95 : 0.45}
                  style={{ transition: 'all 0.35s' }}
                />
              );
            })}
            {/* ghost bar: 2011-12 for comparison */}
            {SECTORS.map((s, i) => {
              const below = SECTORS.slice(0, i).reduce((acc, k) => acc + dEnd[k], 0);
              const h = (dEnd[s] / 100) * 190;
              const y = 210 - ((below + dEnd[s]) / 100) * 190;
              return (
                <rect key={s} x={260} y={y} width={110} height={Math.max(h, 0.5)} rx={4}
                  fill={SECTOR_COLOR[s]} opacity={0.22} style={{ transition: 'all 0.35s' }} />
              );
            })}
            <text x={165} y={228} textAnchor="middle" fontSize={11} fill="#94a3b8">{d.label}</text>
            <text x={315} y={228} textAnchor="middle" fontSize={11} fill="#64748b">2011-12 (ghost)</text>
            {/* sector share labels on live bar */}
            {SECTORS.map((s, i) => {
              const below = SECTORS.slice(0, i).reduce((acc, k) => acc + d[k], 0);
              const midY = 210 - ((below + d[s] / 2) / 100) * 190;
              return (
                <text key={s} x={165} y={midY + 4} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#0f172a" style={{ transition: 'all 0.35s' }}>
                  {d[s]}%
                </text>
              );
            })}
            <text x={200} y={252} textAnchor="middle" fontSize={11} fill="#e2e8f0">
              Total workers: {d.total} million
            </text>
          </svg>
        </div>

        {/* Live numbers panel */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-400">Live decade account: {d.label}</div>
          {SECTORS.map((s) => (
            <div key={s}>
              <div className="flex justify-between text-xs text-slate-400">
                <span style={{ color: SECTOR_COLOR[s] }}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                <span className="font-mono">
                  {absoluteMode ? `${workers[s]} million` : `${d[s]}%`}
                  {!absoluteMode && <span className="text-slate-500"> ({workers[s]} M)</span>}
                </span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded mt-1">
                <div className="h-2.5 rounded" style={{ width: `${d[s]}%`, background: SECTOR_COLOR[s], opacity: highlight === s ? 1 : 0.5, transition: 'width 0.35s' }} />
              </div>
            </div>
          ))}
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            Since 1972-73 the <span style={{ color: SECTOR_COLOR[highlight] }}>{highlight}</span> share moved{' '}
            <span className="font-mono text-amber-300">{shareShift.startsWith('-') ? '' : '+'}{shareShift}</span> percentage points,
            while its headcount changed <span className="font-mono text-sky-300">{changePct}%</span>.
          </div>
          <div className="text-amber-300 text-xs pt-2 border-t border-slate-800">
            Misconception check: &quot;workers leaving farms means industrialisation.&quot; Look again -- most who left farming landed in
            services (many of them low-paid informal jobs), not in factories. Share of secondary employment stayed thin for 40 years.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Time travel</span>
            <span className="font-mono font-bold text-sky-300">{d.label}</span>
          </label>
          <input
            type="range"
            aria-label="decade"
            min={0}
            max={DECADES.length - 1}
            step={1}
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
            className="w-full mt-2 accent-sky-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 px-1">
            {DECADES.map((x) => (
              <span key={x.label}>{x.label.slice(0, 4)}</span>
            ))}
          </div>
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600 flex flex-col justify-between">
          <div>
            <label className="text-xs text-slate-300">Highlight a sector</label>
            <div className="flex gap-2 mt-2">
              {SECTORS.map((s) => (
                <button
                  key={s}
                  onClick={() => setHighlight(s)}
                  className={`flex-1 min-h-11 rounded-xl text-[11px] font-semibold border ${highlight === s ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-900 border-slate-600 hover:bg-slate-700'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setAbsoluteMode((a) => !a)}
            className="w-full min-h-11 mt-3 rounded-xl text-xs font-semibold border bg-slate-900 border-slate-600 hover:bg-slate-700"
          >
            Show: {absoluteMode ? 'absolute workers (million)' : 'share of workforce (%)'}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setIdx((i) => (i + 1) % DECADES.length)}
          className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-indigo-600 border-indigo-400 hover:bg-indigo-500"
        >
          Step forward one period
        </button>
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset
        </button>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Slide from 1972-73 to 2011-12. Primary share falls by 25 points -- but does the NUMBER of farm workers actually fall? (Check absolute mode.)</li>
          <li>Compare the live bar with the 2011-12 ghost bar at every stop. Which sector absorbed the most extra workers, and what does that suggest about the quality of new jobs?</li>
        </ol>
      </div>
    </div>
  );
}

export default C11_EconomicsEmploymentGrowthInformalisationSim;

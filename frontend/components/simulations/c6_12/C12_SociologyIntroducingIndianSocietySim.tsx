'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Indian society is often described as deeply diverse -- but diversity can be MEASURED. This explorer reads ' +
  'the census like a textbook table: religious groups, major mother tongues, and the rural-urban split. Pick a ' +
  'composition, tap its segments, and read the live "different pairs" meter: the chance that two randomly chosen ' +
  'Indians fall in different groups.';

type View = 'religion' | 'language' | 'settlement';

const RELIGION = [
  { label: 'Hindu', pct: 79.8 }, { label: 'Muslim', pct: 14.2 }, { label: 'Christian', pct: 2.3 },
  { label: 'Sikh', pct: 1.7 }, { label: 'Buddhist', pct: 0.7 }, { label: 'Jain', pct: 0.4 }, { label: 'Other', pct: 0.9 },
];
const LANGUAGE = [
  { label: 'Hindi', pct: 43.6 }, { label: 'Bengali', pct: 8.0 }, { label: 'Marathi', pct: 6.9 },
  { label: 'Telugu', pct: 6.7 }, { label: 'Tamil', pct: 5.7 }, { label: 'Gujarati', pct: 4.5 },
  { label: 'Urdu', pct: 4.2 }, { label: 'Kannada', pct: 3.6 }, { label: 'All other mother tongues', pct: 16.8 },
];
const URBAN_HISTORY = [
  { year: 1901, rural: 89.2 }, { year: 1951, rural: 82.7 }, { year: 1991, rural: 74.3 }, { year: 2011, rural: 68.8 },
];
const COLORS = ['#f59e0b', '#38bdf8', '#34d399', '#a78bfa', '#f87171', '#fbbf24', '#22d3ee', '#f472b6', '#94a3b8'];

const VIEW_LABEL: Record<View, string> = {
  religion: 'Religious groups (census 2011, %)',
  language: 'Mother tongues (census 2011, % of speakers)',
  settlement: 'Where people live: rural vs urban',
};

export function C12_SociologyIntroducingIndianSocietySim() {
  const [view, setView] = useState<View>('religion');
  const [decadeIdx, setDecadeIdx] = useState(URBAN_HISTORY.length - 1);
  const [picked, setPicked] = useState<number | null>(null);

  const segments: { label: string; pct: number }[] = useMemo(() => {
    if (view === 'religion') return RELIGION;
    if (view === 'language') return LANGUAGE;
    const d = URBAN_HISTORY[decadeIdx];
    return [{ label: `Rural ${d.year}`, pct: d.rural }, { label: `Urban ${d.year}`, pct: 100 - d.rural }];
  }, [view, decadeIdx]);

  // Simpson diversity: probability two random people are in different groups
  const diversity = useMemo(() => {
    const sumSq = segments.reduce((a, s) => a + (s.pct / 100) ** 2, 0);
    return Math.round((1 - sumSq) * 1000) / 10;
  }, [segments]);

  const perTen = Math.round(diversity / 10);
  const biggest = segments.reduce((a, b) => (b.pct > a.pct ? b : a));
  const pickedSeg = picked !== null ? segments[picked] : null;

  const pick = (i: number) => setPicked(picked === i ? null : i);
  const reset = () => {
    setView('religion');
    setDecadeIdx(URBAN_HISTORY.length - 1);
    setPicked(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">India in Numbers: The Diversity Explorer</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Composition bars */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <svg viewBox="0 0 400 250" className="w-full">
            <text x={200} y={16} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#e2e8f0">{VIEW_LABEL[view]}</text>
            {segments.map((s, i) => {
              const y = 30 + i * 24;
              const active = picked === null || picked === i;
              return (
                <g key={s.label} onClick={() => pick(i)} className="cursor-pointer" opacity={active ? 1 : 0.3} style={{ transition: 'opacity 0.3s' }}>
                  <rect x={120} y={y} width={(s.pct / 100) * 250} height={17} rx={3} fill={COLORS[i % COLORS.length]} style={{ transition: 'width 0.35s, opacity 0.3s' }} />
                  <text x={114} y={y + 13} textAnchor="end" fontSize={9.5} fill="#cbd5e1">{s.label}</text>
                  <text x={124 + (s.pct / 100) * 250} y={y + 13} fontSize={9.5} fill="#e2e8f0">{s.pct}%</text>
                </g>
              );
            })}
            <text x={200} y={246} textAnchor="middle" fontSize={10} fill="#64748b">tap a bar to focus that group</text>
          </svg>
        </div>

        {/* Diversity meter */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-400">Live diversity meter</div>
          <div className="text-slate-300">
            Chance two random people differ: <span className="font-mono text-sky-300 font-bold">{diversity}%</span>
            <span className="text-slate-400"> (about {perTen} in every 10 pairs)</span>
          </div>
          <div className="h-3 bg-slate-800 rounded">
            <div className="h-3 rounded bg-gradient-to-r from-emerald-500 to-sky-500" style={{ width: `${diversity}%`, transition: 'width 0.35s' }} />
          </div>
          <div className="text-slate-300">Largest group: <span className="font-mono text-amber-300">{biggest.label}</span> at {biggest.pct}%</div>
          {pickedSeg && (
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              Focus: <span className="font-mono text-indigo-300">{pickedSeg.label}</span> -- {pickedSeg.pct}% of the population,{' '}
              which is {Math.round(pickedSeg.pct * 10) / 10} times the smallest listed group&apos;s share ({Math.min(...segments.map((s) => s.pct))}%).
            </div>
          )}
          {view === 'language' && (
            <div className="text-xs text-slate-400">Census 2011 recorded 122 major languages and more than 1,600 mother tongues -- the bar chart shows only the top speakers.</div>
          )}
          {view === 'settlement' && (
            <div className="text-xs text-slate-400">Structural change: urban share moved from {100 - URBAN_HISTORY[0].rural}% ({URBAN_HISTORY[0].year}) to {100 - URBAN_HISTORY[URBAN_HISTORY.length - 1].rural}% ({URBAN_HISTORY[URBAN_HISTORY.length - 1].year}). India remains majority rural.</div>
          )}
          <div className="text-amber-300 text-xs pt-2 border-t border-slate-800">
            Misconception killer: &quot;diverse means everyone is a minority.&quot; Each composition has a clear majority group -- yet the
            &quot;different pairs&quot; meter still reads high. Plurality and diversity coexist; the census measures both.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300">Choose a composition</label>
          <div className="flex gap-2 mt-2">
            {(['religion', 'language', 'settlement'] as View[]).map((v) => (
              <button key={v} onClick={() => { setView(v); setPicked(null); }}
                className={`flex-1 min-h-11 rounded-xl text-[11px] font-semibold border ${view === v ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-900 border-slate-600 hover:bg-slate-700'}`}>
                {v === 'settlement' ? 'rural-urban' : v}
              </button>
            ))}
          </div>
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Census year (rural-urban view)</span>
            <span className="font-mono font-bold text-emerald-300">{URBAN_HISTORY[decadeIdx].year}</span>
          </label>
          <input type="range" aria-label="census year" min={0} max={URBAN_HISTORY.length - 1} step={1} value={decadeIdx}
            onChange={(e) => { setDecadeIdx(Number(e.target.value)); setView('settlement'); }} className="w-full mt-2 accent-emerald-400" />
          <div className="flex justify-between text-[10px] text-slate-500 px-1">
            {URBAN_HISTORY.map((d) => (
              <span key={d.year}>{d.year}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={() => { setView('settlement'); setDecadeIdx(0); setPicked(null); }} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-indigo-600 border-indigo-400 hover:bg-indigo-500">
          Show 1901 village India
        </button>
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset
        </button>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Compare the diversity meter for religion vs mother tongues. Why does language diversity read higher even though Hindi speakers are the biggest group?</li>
          <li>Slide the census year from 1901 to 2011. The urban share tripled -- read the &quot;different pairs&quot; meter at both ends. Why does it climb as the two groups grow more equal?</li>
        </ol>
      </div>
    </div>
  );
}

export default C12_SociologyIntroducingIndianSocietySim;

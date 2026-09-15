'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'India, Pakistan and China started planning around the same time (1950s). Today their stories differ. ' +
  'This dashboard compares REAL development indicators (NCERT table, approximate 2013-15 values). Pick an ' +
  'indicator and watch the bars reorder. Development is multidimensional: income alone does not decide the ranking.';

type Country = 'India' | 'Pakistan' | 'China';

const COUNTRIES: Country[] = ['India', 'Pakistan', 'China'];

type IndicatorKey = 'gni' | 'life' | 'school' | 'imr' | 'poverty' | 'hdi';

interface Indicator {
  key: IndicatorKey;
  label: string;
  unit: string;
  higherBetter: boolean;
  values: Record<Country, number>;
}

const INDICATORS: Indicator[] = [
  { key: 'gni', label: 'GNI per capita (PPP)', unit: 'US $', higherBetter: true, values: { India: 5663, Pakistan: 5031, China: 13335 } },
  { key: 'life', label: 'Life expectancy at birth', unit: 'years', higherBetter: true, values: { India: 68.3, Pakistan: 66.6, China: 76.0 } },
  { key: 'school', label: 'Mean years of schooling', unit: 'years', higherBetter: true, values: { India: 5.4, Pakistan: 5.1, China: 7.6 } },
  { key: 'imr', label: 'Infant mortality rate', unit: 'per 1000 births', higherBetter: false, values: { India: 38, Pakistan: 66, China: 11 } },
  { key: 'poverty', label: 'People below poverty line', unit: '% of population', higherBetter: false, values: { India: 21.3, Pakistan: 29.5, China: 1.9 } },
  { key: 'hdi', label: 'HDI rank in the world', unit: 'rank (lower = better)', higherBetter: false, values: { India: 131, Pakistan: 147, China: 90 } },
];

const STRATEGY: Record<Country, string> = {
  India: 'Mixed economy: Five-Year Plans from 1951, green revolution, wide service sector, big market reforms in 1991.',
  Pakistan: 'Plans from 1956, green revolution in the 1960s, remittances and aid; manufacturing stayed narrow.',
  China: 'Soviet-style planning from 1953; after 1978, decollectivisation and the household responsibility system plus special economic zones.',
};

const COUNTRY_COLOR: Record<Country, string> = { India: '#f59e0b', Pakistan: '#34d399', China: '#f87171' };

export function C11_EconomicsComparativeDevelopmentSim() {
  const [indKey, setIndKey] = useState<IndicatorKey>('gni');
  const [focused, setFocused] = useState<Country>('China');
  const [shareMode, setShareMode] = useState(false);

  const ind = INDICATORS.find((i) => i.key === indKey)!;

  const ranked = useMemo(() => {
    const arr = COUNTRIES.map((c) => ({ c, v: ind.values[c] }));
    arr.sort((a, b) => (ind.higherBetter ? b.v - a.v : a.v - b.v));
    return arr;
  }, [ind]);

  const bestVal = ind.higherBetter ? Math.max(...ranked.map((r) => r.v)) : Math.min(...ranked.map((r) => r.v));
  const worstVal = ind.higherBetter ? Math.min(...ranked.map((r) => r.v)) : Math.max(...ranked.map((r) => r.v));
  const leader = ranked[0].c;
  const laggard = ranked[2].c;

  const barWidth = (v: number) => {
    if (!shareMode) return (v / worstVal) * 100;
    return ind.higherBetter ? (v / bestVal) * 100 : (bestVal / v) * 100;
  };

  const focusRank = ranked.findIndex((r) => r.c === focused) + 1;
  const gap = ind.higherBetter ? bestVal - ind.values[focused] : ind.values[focused] - bestVal;

  const reset = () => {
    setIndKey('gni');
    setFocused('China');
    setShareMode(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Three Roads from 1950: India, Pakistan, China</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Bar comparison */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <svg viewBox="0 0 400 230" className="w-full">
            <text x={200} y={18} textAnchor="middle" fontSize={13} fontWeight="bold" fill="#e2e8f0">
              {ind.label} ({ind.unit})
            </text>
            {ranked.map((r, i) => (
              <g key={r.c} style={{ transition: 'all 0.3s' }}>
                <text x={90} y={62 + i * 52} textAnchor="end" fontSize={13} fill="#cbd5e1">{r.c}</text>
                <rect x={100} y={48 + i * 52} width={Math.max(4, (barWidth(r.v) / 100) * 240)} height={30} rx={6}
                  fill={COUNTRY_COLOR[r.c]} opacity={focused === r.c ? 0.95 : 0.55} style={{ transition: 'all 0.3s' }} />
                <text x={104 + Math.max(4, (barWidth(r.v) / 100) * 240)} y={68 + i * 52} fontSize={12} fill="#e2e8f0" fontWeight="bold">
                  {shareMode ? `${Math.round(barWidth(r.v))}% of best` : r.v.toLocaleString()}
                </text>
                <text x={100} y={92 + i * 52} fontSize={10} fill="#94a3b8">
                  position #{i + 1} {i === 0 ? '-- leads' : i === 2 ? '-- trails' : ''}
                </text>
              </g>
            ))}
            <text x={200} y={222} textAnchor="middle" fontSize={11} fill="#fbbf24">
              Leader: {leader} | Trails: {laggard}
            </text>
          </svg>
        </div>

        {/* Focus panel */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-400">Focused country: {focused}</div>
          <div className="text-slate-300">
            {ind.label}: <span className="font-mono text-sky-300 font-bold">{ind.values[focused].toLocaleString()}</span> {ind.unit}
          </div>
          <div className="text-slate-300">
            Position on this indicator: <span className="font-mono text-amber-300">#{focusRank}</span> of 3
          </div>
          <div className="text-slate-300">
            Gap to the leader ({leader}): <span className="font-mono text-rose-300">{gap.toLocaleString()}</span> {ind.unit}
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">{STRATEGY[focused]}</div>
          <div className="text-amber-300 text-xs pt-2 border-t border-slate-800">
            Misconception check: &quot;higher income automatically means better human development.&quot; China leads on income AND on health,
            education and poverty -- but the income gap is 2.3x while the infant-mortality gap is 3.5x. Money is only part of the story;
            policy on health and schooling moves the rest.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300">Pick an indicator</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {INDICATORS.map((i) => (
              <button
                key={i.key}
                onClick={() => setIndKey(i.key)}
                className={`min-h-11 rounded-xl text-[11px] font-semibold border px-1 ${indKey === i.key ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-900 border-slate-600 hover:bg-slate-700'}`}
              >
                {i.label}
                <span className="block text-[9px] font-normal text-slate-400">{i.higherBetter ? 'higher = better' : 'lower = better'}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600 flex flex-col justify-between">
          <div>
            <label className="text-xs text-slate-300">Focus on</label>
            <div className="flex gap-2 mt-2">
              {COUNTRIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setFocused(c)}
                  className={`flex-1 min-h-11 rounded-xl text-xs font-semibold border ${focused === c ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-900 border-slate-600 hover:bg-slate-700'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShareMode((s) => !s)}
            className="w-full min-h-11 mt-3 rounded-xl text-xs font-semibold border bg-slate-900 border-slate-600 hover:bg-slate-700"
          >
            Bar scale: {shareMode ? '% of best performer' : 'raw values (bars scale to max)'}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={() => { setIndKey('imr'); setFocused('Pakistan'); }} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-indigo-600 border-indigo-400 hover:bg-indigo-500">
          Show the starkest gap (infant mortality)
        </button>
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset
        </button>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Switch between GNI per capita and HDI rank. Does the leader ever change? What does that tell you about China vs its neighbours?</li>
          <li>Focus on India and flip the scale to &quot;% of best performer&quot;. On which indicator is India closest to China, and on which is it furthest behind?</li>
        </ol>
      </div>
    </div>
  );
}

export default C11_EconomicsComparativeDevelopmentSim;

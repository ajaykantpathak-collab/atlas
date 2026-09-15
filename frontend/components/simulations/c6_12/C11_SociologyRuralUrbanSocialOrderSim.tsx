'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'A village and a city are not just big and small -- they run on different RULES for keeping ORDER. ' +
  'In the village, order comes from CUSTOM: everyone knows everyone, elders judge, reputation punishes. ' +
  'In the city, you live among STRANGERS, so order must come from FORMAL control: police, courts, contracts. ' +
  'Push the settlement from hamlet to metropolis and watch informal control fade -- then decide how fast ' +
  'formal institutions must grow to prevent disorder.';

export function C11_SociologyRuralUrbanSocialOrderSim() {
  const [urbanism, setUrbanism] = useState(10); // 0 hamlet - 100 metropolis
  const [changeSpeed, setChangeSpeed] = useState(2); // how fast society is changing
  const [institutions, setInstitutions] = useState(30); // courts/police/schools capacity

  const derived = useMemo(() => {
    const heterogeneity = Math.min(100, Math.round(12 + urbanism * 0.9));
    const informalControl = Math.max(0, Math.round(95 - urbanism * 0.95 - heterogeneity * 0.15));
    const formalControl = Math.min(100, Math.round(institutions * 1.05));
    // disorder grows with speed of change and heterogeneity, but is contained by total control
    const totalControl = informalControl * 0.55 + formalControl * 0.45;
    const disorder = Math.max(0, Math.round(changeSpeed * 6 + heterogeneity * 0.35 - totalControl * 0.8));
    return { heterogeneity, informalControl, formalControl, disorder };
  }, [urbanism, institutions, changeSpeed]);

  const placeName =
    urbanism < 20 ? 'Hamlet' : urbanism < 45 ? 'Village' : urbanism < 70 ? 'Town' : urbanism < 90 ? 'City' : 'Metropolis';

  const buildings = useMemo(() => {
    const n = 4 + Math.round(urbanism * 0.12);
    return Array.from({ length: n }, (_, i) => ({
      h: 14 + (i % 3) * 10 + (urbanism / 100) * 90 + (i % 2) * 12,
    }));
  }, [urbanism]);

  const reset = () => {
    setUrbanism(10);
    setChangeSpeed(2);
    setInstitutions(30);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Change and Order: From Village Custom to City Law</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Settlement visual */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <svg viewBox="0 0 400 250" className="w-full">
            <text x={200} y={20} textAnchor="middle" fontSize={14} fontWeight="bold" fill="#e2e8f0">
              {placeName} -- {buildings.length} dwellings shown
            </text>
            <line x1={10} y1={200} x2={390} y2={200} stroke="#475569" strokeWidth={2} />
            {buildings.map((b, i) => {
              const w = Math.max(18, 46 - urbanism * 0.2);
              const x = 24 + i * Math.max(26, (352 / buildings.length));
              const isCity = urbanism > 55;
              return (
                <g key={i} style={{ transition: 'all 0.3s' }}>
                  <rect
                    x={x}
                    y={200 - b.h}
                    width={w}
                    height={b.h}
                    rx={isCity ? 2 : 4}
                    fill={isCity ? 'rgba(129,140,248,0.5)' : 'rgba(251,191,36,0.4)'}
                    stroke={isCity ? '#818cf8' : '#fbbf24'}
                    style={{ transition: 'all 0.3s' }}
                  />
                  {isCity ? (
                    <rect x={x + w / 2 - 3} y={200 - b.h - 8} width={6} height={8} fill="#64748b" />
                  ) : (
                    <polygon points={`${x - 3},${200 - b.h} ${x + w / 2},${200 - b.h - 12} ${x + w + 3},${200 - b.h}`} fill="#f59e0b" opacity={0.8} />
                  )}
                </g>
              );
            })}
            {/* strangers vs acquaintances dots */}
            <text x={200} y={228} textAnchor="middle" fontSize={11} fill="#94a3b8">
              People who know you personally: {Math.max(0, 100 - derived.heterogeneity)}% -- who you know: {derived.heterogeneity}%
            </text>
          </svg>
        </div>

        {/* Order panel */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-3">
          <div className="text-xs uppercase tracking-wide text-slate-400">Who keeps order here?</div>
          <div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Informal control (elders, custom, reputation)</span>
              <span className="font-mono text-amber-300">{derived.informalControl}%</span>
            </div>
            <div className="h-3 bg-slate-800 rounded mt-1">
              <div className="h-3 bg-amber-500 rounded" style={{ width: `${derived.informalControl}%`, transition: 'width 0.3s' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Formal control (police, courts, contracts)</span>
              <span className="font-mono text-sky-300">{derived.formalControl}%</span>
            </div>
            <div className="h-3 bg-slate-800 rounded mt-1">
              <div className="h-3 bg-sky-500 rounded" style={{ width: `${derived.formalControl}%`, transition: 'width 0.3s' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Heterogeneity (strangers, different groups)</span>
              <span className="font-mono text-violet-300">{derived.heterogeneity}%</span>
            </div>
            <div className="h-3 bg-slate-800 rounded mt-1">
              <div className="h-3 bg-violet-500 rounded" style={{ width: `${derived.heterogeneity}%`, transition: 'width 0.3s' }} />
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-400">Social disorder (crime, riots, rule-breaking)</span>
            <span className={`font-mono font-bold ${derived.disorder > 40 ? 'text-rose-400' : derived.disorder > 20 ? 'text-amber-300' : 'text-emerald-300'}`}>
              {derived.disorder}%
            </span>
          </div>
          <div className="h-4 bg-slate-800 rounded">
            <div
              className={`h-4 rounded ${derived.disorder > 40 ? 'bg-rose-500' : derived.disorder > 20 ? 'bg-amber-500' : 'bg-emerald-500'}`}
              style={{ width: `${derived.disorder}%`, transition: 'width 0.3s' }}
            />
          </div>
          <div className="text-xs text-amber-300 pt-2 border-t border-slate-800">
            Misconception killer: cities are NOT disorderly because city people are bad. Disorder appears when customary control dies faster than formal control grows.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Settlement size</span>
            <span className="font-mono font-bold text-sky-300">{placeName}</span>
          </label>
          <input type="range" aria-label="urbanism" min={0} max={100} step={5} value={urbanism} onChange={(e) => setUrbanism(Number(e.target.value))} className="w-full mt-2 accent-sky-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Speed of social change</span>
            <span className="font-mono font-bold text-rose-300">{changeSpeed}</span>
          </label>
          <input type="range" aria-label="change speed" min={0} max={10} value={changeSpeed} onChange={(e) => setChangeSpeed(Number(e.target.value))} className="w-full mt-2 accent-rose-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Institutions keeping up (courts, police, schools)</span>
            <span className="font-mono font-bold text-emerald-300">{institutions}%</span>
          </label>
          <input type="range" aria-label="institutions" min={0} max={100} step={5} value={institutions} onChange={(e) => setInstitutions(Number(e.target.value))} className="w-full mt-2 accent-emerald-400" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => { setUrbanism(70); setChangeSpeed(8); setInstitutions(35); }}
          className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-rose-600 border-rose-400 hover:bg-rose-500"
        >
          A fast-growing city
        </button>
        <button
          onClick={() => { setUrbanism(70); setChangeSpeed(8); setInstitutions(85); }}
          className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-emerald-600 border-emerald-400 hover:bg-emerald-500"
        >
          Same city, strong institutions
        </button>
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset
        </button>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Slide settlement size from Hamlet to Metropolis with institutions fixed at 30. At what point do the two control bars swap -- and what happens to disorder?</li>
          <li>Compare &quot;A fast-growing city&quot; with &quot;Same city, strong institutions&quot;. Same city, same change speed -- what alone changed the disorder score?</li>
        </ol>
      </div>
    </div>
  );
}

export default C11_SociologyRuralUrbanSocialOrderSim;

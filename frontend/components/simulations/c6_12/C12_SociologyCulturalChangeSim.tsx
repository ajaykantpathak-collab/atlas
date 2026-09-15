'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Material culture (phones, machines, roads) changes FAST. Non-material culture (laws, family norms, ' +
  'beliefs) changes SLOWLY. William Ogburn called the gap CULTURE LAG -- and said most "modern social ' +
  'problems" are really lags: the tool arrived, the rule did not. Drag technology forward, then decide how ' +
  'fast norms adapt, and watch the lag become visible problems -- or close.';

export function C12_SociologyCulturalChangeSim() {
  const [material, setMaterial] = useState(70); // material culture change 0-100
  const [normative, setNormative] = useState(30); // laws/norms adaptation 0-100
  const [channel, setChannel] = useState<'school' | 'media' | 'market'>('media'); // agent of change
  const [year, setYear] = useState(1995);

  const derived = useMemo(() => {
    const lag = Math.max(0, material - normative);
    // problems scale with lag; the channel changes how fast norms can even catch up
    const channelBoost = channel === 'school' ? 10 : channel === 'media' ? 5 : 0;
    const problems = Math.max(0, Math.round(lag * 0.85 - channelBoost * 0.5));
    // secularisation: tradition loses grip as material + normative change proceed
    const secularisation = Math.round((material * 0.35 + normative * 0.65) * 0.9);
    return { lag, problems, secularisation };
  }, [material, normative, channel]);

  const problems = [
    { label: 'Cyber fraud on new apps', on: material > 40 && normative < 50 },
    { label: 'Old-age loneliness (children migrate)', on: material > 55 && normative < 60 },
    { label: 'Dowry demanded by new-wealth families', on: material > 30 && normative < 45 },
    { label: 'Road accidents before traffic rules sink in', on: material > 60 && normative < 55 },
  ];

  const advanceYear = () => {
    setYear((y) => Math.min(2025, y + 10));
    setMaterial((m) => Math.min(100, m + 8)); // technology marches on by itself
  };

  const reset = () => {
    setMaterial(70);
    setNormative(30);
    setChannel('media');
    setYear(1995);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Culture Lag: The Tool Is Ready, the Rule Is Not</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Gap visual */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <svg viewBox="0 0 400 250" className="w-full">
            <text x={200} y={20} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#e2e8f0">
              India in {year} (stylised)
            </text>
            {/* material bar */}
            <text x={24} y={52} fontSize={11} fill="#38bdf8">Material culture (tools, tech)</text>
            <rect x={24} y={60} width={352} height={26} rx={6} fill="#1e293b" />
            <rect x={24} y={60} width={material * 3.52} height={26} rx={6} fill="#38bdf8" opacity={0.85} style={{ transition: 'width 0.3s' }} />
            <text x={24 + material * 3.52 + 8 > 370 ? 370 : 24 + material * 3.52 + 8} y={78} fontSize={11} fill="#e0f2fe" fontWeight="bold">
              {material}
            </text>
            {/* normative bar */}
            <text x={24} y={116} fontSize={11} fill="#34d399">Normative culture (laws, family norms)</text>
            <rect x={24} y={124} width={352} height={26} rx={6} fill="#1e293b" />
            <rect x={24} y={124} width={normative * 3.52} height={26} rx={6} fill="#34d399" opacity={0.85} style={{ transition: 'width 0.3s' }} />
            <text x={24 + normative * 3.52 + 8 > 370 ? 370 : 24 + normative * 3.52 + 8} y={142} fontSize={11} fill="#d1fae5" fontWeight="bold">
              {normative}
            </text>
            {/* lag gap */}
            {derived.lag > 4 && (
              <g style={{ transition: 'all 0.3s' }}>
                <rect x={24 + normative * 3.52} y={60} width={Math.max(0, (material - normative) * 3.52)} height={90} fill="#f87171" opacity={0.15} />
                <text x={24 + ((material + normative) / 2) * 3.52} y={112} textAnchor="middle" fontSize={11} fontWeight="bold" fill="#f87171">
                  CULTURE LAG = {derived.lag}
                </text>
              </g>
            )}
            <text x={200} y={185} textAnchor="middle" fontSize={11} fill="#94a3b8">
              Red zone: technology people use, rules people do not have yet.
            </text>
            <text x={200} y={225} textAnchor="middle" fontSize={12} fontWeight="bold" fill={derived.problems > 40 ? '#f87171' : '#fbbf24'}>
              Social problems from lag: {derived.problems}%
            </text>
          </svg>
        </div>

        {/* Problems panel */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-400">Visible strains right now</div>
          {problems.map((p) => (
            <div key={p.label} className={`text-xs px-3 py-2 rounded-lg border ${p.on ? 'border-rose-700 bg-rose-950/50 text-rose-200' : 'border-slate-800 bg-slate-900 text-slate-500'}`}>
              {p.on ? '! ' : '- '}
              {p.label}
            </div>
          ))}
          <div className="text-slate-300 pt-2">
            Secularisation index (customs judged by reason, not only tradition): <span className="font-mono text-emerald-300 font-bold">{derived.secularisation}%</span>
          </div>
          <div className="text-xs text-slate-400">Agent of change you are using: {channel}</div>
          <div className="text-xs text-amber-300 pt-2 border-t border-slate-800">
            Misconception killer: adopting phones and jeans is NOT &quot;becoming Western&quot;. Modernisation means tools and science; Westernisation is one particular culture. India modernised while staying Indian.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Material change (tech arrives)</span>
            <span className="font-mono font-bold text-sky-300">{material}</span>
          </label>
          <input type="range" aria-label="material change" min={0} max={100} step={5} value={material} onChange={(e) => setMaterial(Number(e.target.value))} className="w-full mt-2 accent-sky-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Norms adapt (laws, family rules)</span>
            <span className="font-mono font-bold text-emerald-300">{normative}</span>
          </label>
          <input type="range" aria-label="normative change" min={0} max={100} step={5} value={normative} onChange={(e) => setNormative(Number(e.target.value))} className="w-full mt-2 accent-emerald-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300">Agent helping norms catch up</label>
          <div className="flex gap-2 mt-2">
            {(['school', 'media', 'market'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setChannel(c)}
                className={`flex-1 min-h-11 rounded-xl text-xs font-semibold capitalize border ${channel === c ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-900 border-slate-600 hover:bg-slate-700'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={advanceYear} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-indigo-600 border-indigo-400 hover:bg-indigo-500">
          Advance 10 years (tech moves alone)
        </button>
        <button
          onClick={() => setNormative(material)}
          className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-emerald-600 border-emerald-400 hover:bg-emerald-500"
        >
          Pass the missing laws
        </button>
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset to 1995
        </button>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Press &quot;Advance 10 years&quot; four times without touching norms. Which strains switch on -- and why does technology raise the lag all by itself?</li>
          <li>Set the lag high, then try each agent (school / media / market). Which one keeps secularisation rising while problems fall -- and why might market be weakest?</li>
        </ol>
      </div>
    </div>
  );
}

export default C12_SociologyCulturalChangeSim;

'use client';

import React, { useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'M.N. Srinivas, studying Rampura village, saw lower castes claim a HIGHER PLACE by copying the customs ' +
  'of higher castes -- vegetarian food, teetotalism, temple worship, surname style. He called this ' +
  'SANSKRITIZATION. It moves a caste one or two rungs over GENERATIONS -- and, he warned, economic money ' +
  'alone does NOT buy ritual rank. The higher caste also pushes back. Move the levers and watch the ladder.';

const RUNGS = ['Landless labour', 'Artisan / service caste', 'Peasant caste', 'Dominant caste claim', 'Twice-born rank claimed'];

export function C11_SociologyIndianSociologistsSim() {
  const [generations, setGenerations] = useState(2); // 0-5 generations of adopting customs
  const [adoption, setAdoption] = useState(30); // % of higher-caste customs adopted
  const [landOwned, setLandOwned] = useState(20); // economic rise, 0-100
  const [pushback, setPushback] = useState(true); // dominant caste resists claims
  const [log, setLog] = useState<string[]>([]);

  // Sanskritization model: ritual claim grows with custom adoption x generations,
  // but NOT with money; pushback slows the top two rungs.
  const claimScore = Math.min(100, adoption * 0.7 + generations * 8 - (pushback ? generations > 3 ? 12 : 6 : 0));
  const rungIndex = Math.min(4, Math.floor(claimScore / 21));
  const moneyRung = Math.min(4, Math.floor(landOwned / 22));
  const gapNote =
    moneyRung > rungIndex
      ? 'Wealthy but low rank: money bought land, not ritual STATUS. Other castes still will not take water from their hand.'
      : rungIndex >= 3 && adoption > 60
      ? 'Claimed rank is high: they now say they were ALWAYS high caste -- the claim is rewritten into legend.'
      : 'Rank roughly matches wealth: the ladder has not moved yet.';

  const record = () =>
    setLog((l) => [
      ...l.slice(-5),
      `Gen ${generations}, customs ${adoption}%, land ${landOwned} -> claimed rung: ${RUNGS[rungIndex]}`,
    ]);

  const reset = () => {
    setGenerations(2);
    setAdoption(30);
    setLandOwned(20);
    setPushback(true);
    setLog([]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Sanskritization: Climbing the Caste Ladder with Customs</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Ladder visual */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <svg viewBox="0 0 400 250" className="w-full">
            {RUNGS.map((name, i) => {
              const y = 218 - i * 46;
              const isActive = i <= rungIndex;
              const isMoney = i <= moneyRung;
              return (
                <g key={i}>
                  <rect
                    x={70}
                    y={y - 18}
                    width={260}
                    height={36}
                    rx={8}
                    fill={isActive ? 'rgba(129,140,248,0.35)' : isMoney ? 'rgba(251,191,36,0.15)' : 'rgba(30,41,59,0.8)'}
                    stroke={isActive ? '#818cf8' : '#334155'}
                    style={{ transition: 'all 0.3s' }}
                  />
                  <text x={200} y={y + 4} textAnchor="middle" fontSize={11} fill={isActive ? '#e0e7ff' : '#64748b'}>
                    {name}
                  </text>
                </g>
              );
            })}
            {/* family marker */}
            <g style={{ transition: 'transform 0.4s' }} transform={`translate(0, ${-(rungIndex * 46)})`}>
              <circle cx={46} cy={205} r={13} fill="#f472b6" />
              <text x={46} y={210} textAnchor="middle" fontSize={11} fontWeight="bold" fill="#0f172a">
                U
              </text>
              <text x={16} y={182} fontSize={9} fill="#f472b6">
                your caste
              </text>
            </g>
          </svg>
          <div className="text-xs text-slate-400 mt-1">Purple rungs = ritual rank CLAIMED. Yellow tint = rank money could reach.</div>
        </div>

        {/* Live working */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-400">Live field notes</div>
          <div className="text-slate-300">Customs adopted: <span className="font-mono text-sky-300">{adoption}%</span></div>
          <div className="text-slate-300">Generations of effort: <span className="font-mono text-sky-300">{generations}</span></div>
          <div className="text-slate-300">Claim strength: <span className="font-mono text-indigo-300">{Math.round(claimScore)}/100</span></div>
          <div className="text-slate-300">Claimed rung: <span className="font-bold text-emerald-300">{RUNGS[rungIndex]}</span></div>
          <div className={`text-xs pt-1 border-t border-slate-800 ${gapNote.startsWith('Wealthy') ? 'text-amber-300' : 'text-emerald-300'}`}>{gapNote}</div>
          <div className="text-xs text-rose-300">
            {pushback ? 'Dominant caste is RESISTING: they boycott, mock the new vegetarianism, deny temple entry.' : 'No resistance: the claim settles into accepted custom over time.'}
          </div>
          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">Recorded observations</div>
          {log.length === 0 && <div className="text-xs text-slate-500">Press Record observation to save a rung reading.</div>}
          {log.map((s, i) => (
            <div key={i} className="text-xs text-slate-300 font-mono">
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Higher-caste customs adopted (food, worship, names)</span>
            <span className="font-mono font-bold text-sky-300">{adoption}%</span>
          </label>
          <input type="range" aria-label="customs adopted" min={0} max={100} step={5} value={adoption} onChange={(e) => setAdoption(Number(e.target.value))} className="w-full mt-2 accent-sky-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Generations of claiming</span>
            <span className="font-mono font-bold text-sky-300">{generations}</span>
          </label>
          <input type="range" aria-label="generations" min={0} max={5} value={generations} onChange={(e) => setGenerations(Number(e.target.value))} className="w-full mt-2 accent-indigo-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Economic rise (land bought, cash earned)</span>
            <span className="font-mono font-bold text-amber-300">{landOwned}</span>
          </label>
          <input type="range" aria-label="economic rise" min={0} max={100} step={5} value={landOwned} onChange={(e) => setLandOwned(Number(e.target.value))} className="w-full mt-2 accent-amber-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600 flex items-center justify-between gap-2">
          <span className="text-xs text-slate-300">Dominant caste resists?</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPushback((p) => !p)}
              className="px-4 min-h-11 rounded-xl text-sm font-semibold border bg-slate-900 border-slate-600 hover:bg-slate-700"
            >
              {pushback ? 'Yes' : 'No'}
            </button>
            <button onClick={record} className="px-4 min-h-11 rounded-xl text-sm font-semibold border bg-indigo-600 border-indigo-400 hover:bg-indigo-500">
              Record
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => { setAdoption(0); setGenerations(2); setLandOwned(95); }}
          className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-amber-600 border-amber-400 hover:bg-amber-500"
        >
          Try money-only rise
        </button>
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset village
        </button>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Press &quot;Try money-only rise&quot;: land is high, customs are zero. How many rungs did money move? Now add customs and generations slowly -- which lever moves the rung?</li>
          <li>Set customs to 80% with resistance ON for 4 generations, then OFF. How much faster does the claim stick when the dominant caste stops resisting?</li>
        </ol>
      </div>
    </div>
  );
}

export default C11_SociologyIndianSociologistsSim;

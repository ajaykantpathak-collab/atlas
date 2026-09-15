'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Globalisation is not one force -- it is trade, capital, media and migration arriving together, and it does ' +
  'NOT touch everyone equally. Open a town to the world economy and choose whose shoes you stand in: an ' +
  'unskilled worker, a skilled technician or a professional. The same town becomes a land of opportunity for ' +
  'one and a land of insecurity for another.';

type Worker = 'unskilled' | 'skilled' | 'professional';

export function C12_SociologyGlobalisationSim() {
  const [integration, setIntegration] = useState(20); // 0 closed .. 100 fully global town
  const [worker, setWorker] = useState<Worker>('unskilled');
  const [protection, setProtection] = useState(true); // local industry protected
  const [log, setLog] = useState<string[]>([]);

  const derived = useMemo(() => {
    const open = integration / 100;
    const wageIndex = { unskilled: 100, skilled: 100, professional: 100 } as Record<Worker, number>;
    wageIndex.unskilled = Math.round(100 + open * 30 - (protection ? 0 : open * 45));
    wageIndex.skilled = Math.round(100 + open * 85 - (protection ? 20 : 0));
    wageIndex.professional = Math.round(100 + open * 140);
    const jobSecurity = {
      unskilled: Math.max(5, Math.round(90 - open * 75 + (protection ? 15 : 0))),
      skilled: Math.round(85 - open * 25 + 10),
      professional: Math.round(90 - open * 5),
    } as Record<Worker, number>;
    const variety = Math.round(20 + open * 75);
    const culturalExposure = Math.round(open * 90);
    return { wage: wageIndex[worker], security: jobSecurity[worker], variety, culturalExposure };
  }, [integration, worker, protection]);

  const verdict =
    derived.wage >= 120 && derived.security >= 60
      ? 'A WINNER: your wages and choices are rising with the world economy.'
      : derived.security < 45
      ? 'A LOSER: the world buys cheaper than your town can make -- jobs are leaking away.'
      : 'MIXED: more goods and ideas, but no promise of a secure pay cheque.';

  const record = () => setLog((l) => [...l.slice(-4), `Integration ${integration}% as ${worker} -> wage ${derived.wage}, security ${derived.security}`]);

  const reset = () => {
    setIntegration(20);
    setWorker('unskilled');
    setProtection(true);
    setLog([]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Globalisation: One Town, Three Fortunes</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Town visual */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <svg viewBox="0 0 400 250" className="w-full">
            <text x={200} y={20} textAnchor="middle" fontSize={13} fontWeight="bold" fill="#e2e8f0">
              Your town at {integration}% openness to the world
            </text>
            {/* container ships / goods flow */}
            {[0, 1, 2].map((i) => (
              <rect key={i} x={16 + i * 26} y={40} width={20} height={8} rx={2} fill={i < integration / 34 ? '#38bdf8' : '#1e293b'} stroke="#334155" style={{ transition: 'fill 0.3s' }} />
            ))}
            <text x={16} y={62} fontSize={10} fill="#7dd3fc">imports &amp; exports</text>
            {/* media dishes */}
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={330 + i * 22} cy={48} r={6 + (i < integration / 34 ? 2 : 0)} fill={i < integration / 34 ? '#a78bfa' : '#1e293b'} stroke="#334155" style={{ transition: 'fill 0.3s' }} />
            ))}
            <text x={330} y={68} fontSize={10} fill="#c4b5fd">global media</text>
            {/* local factory health */}
            <rect x={40} y={150 - (derived.security / 100) * 80} width={70} height={(derived.security / 100) * 80} rx={4} fill={derived.security > 55 ? '#34d399' : derived.security > 40 ? '#fbbf24' : '#f87171'} opacity={0.8} style={{ transition: 'all 0.3s' }} />
            <text x={75} y={162} textAnchor="middle" fontSize={10} fill="#94a3b8">factory jobs</text>
            {/* mall / offices rise with integration */}
            {[0, 1, 2].map((i) => {
              const h = integration > 25 + i * 25 ? 40 + i * 12 : 8;
              return (
                <g key={i} style={{ transition: 'all 0.3s' }}>
                  <rect x={220 + i * 46} y={150 - h} width={30} height={h} rx={3} fill="rgba(129,140,248,0.6)" stroke="#818cf8" />
                </g>
              );
            })}
            <text x={290} y={162} textAnchor="middle" fontSize={10} fill="#94a3b8">new offices &amp; malls</text>
            <line x1={10} y1={150} x2={390} y2={150} stroke="#475569" strokeWidth={2} />
            <text x={200} y={185} textAnchor="middle" fontSize={11} fill="#94a3b8">
              Consumption variety index: {derived.variety} &nbsp;|&nbsp; Cultural exposure: {derived.culturalExposure}%
            </text>
            <text x={200} y={228} textAnchor="middle" fontSize={12} fontWeight="bold" fill={derived.security < 45 ? '#f87171' : derived.wage >= 120 ? '#34d399' : '#fbbf24'}>
              Standing in the {worker} worker&apos;s shoes: {verdict.split(':')[0]}
            </text>
          </svg>
        </div>

        {/* Fortune panel */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-3">
          <div className="text-xs uppercase tracking-wide text-slate-400">Your fortune as a {worker} worker</div>
          <div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Real wage index (closed town = 100)</span>
              <span className={`font-mono font-bold ${derived.wage >= 100 ? 'text-emerald-300' : 'text-rose-300'}`}>{derived.wage}</span>
            </div>
            <div className="h-3 bg-slate-800 rounded mt-1">
              <div className={`h-3 rounded ${derived.wage >= 100 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${Math.min(100, derived.wage / 2.5)}%`, transition: 'width 0.3s' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Job security</span>
              <span className={`font-mono font-bold ${derived.security >= 60 ? 'text-emerald-300' : 'text-amber-300'}`}>{derived.security}%</span>
            </div>
            <div className="h-3 bg-slate-800 rounded mt-1">
              <div className="h-3 bg-amber-500 rounded" style={{ width: `${derived.security}%`, transition: 'width 0.3s' }} />
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">{verdict}</div>
          <button
            onClick={() => setProtection((p) => !p)}
            className={`w-full min-h-11 rounded-xl text-sm font-semibold border ${protection ? 'bg-emerald-700 border-emerald-400' : 'bg-slate-800 border-slate-600'}`}
          >
            Tariff wall on local goods: {protection ? 'UP' : 'DOWN'}
          </button>
          <div className="text-xs text-amber-300 pt-2 border-t border-slate-800">
            Misconception killer: &quot;globalisation makes everyone richer&quot; and &quot;globalisation ruins everyone&quot; are BOTH wrong. It redistributes -- ask WHO gains, WHO loses.
          </div>
          <div className="pt-1 text-xs text-slate-400">Notes</div>
          {log.length === 0 && <div className="text-xs text-slate-500">Press Record observation.</div>}
          {log.map((s, i) => (
            <div key={i} className="text-xs font-mono text-slate-300">{s}</div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Global integration of your town</span>
            <span className="font-mono font-bold text-sky-300">{integration}%</span>
          </label>
          <input type="range" aria-label="integration" min={0} max={100} step={5} value={integration} onChange={(e) => setIntegration(Number(e.target.value))} className="w-full mt-2 accent-sky-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600 flex items-end gap-2">
          <div className="flex-1">
            <label className="text-xs text-slate-300">Whose shoes?</label>
            <div className="flex gap-2 mt-2">
              {(['unskilled', 'skilled', 'professional'] as Worker[]).map((w) => (
                <button
                  key={w}
                  onClick={() => setWorker(w)}
                  className={`flex-1 min-h-11 rounded-xl text-[11px] font-semibold capitalize border ${worker === w ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-900 border-slate-600 hover:bg-slate-700'}`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
          <button onClick={record} className="px-3 min-h-11 rounded-xl text-xs font-semibold border bg-amber-600 border-amber-400 hover:bg-amber-500">
            Record
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={() => setIntegration(90)} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-indigo-600 border-indigo-400 hover:bg-indigo-500">
          Throw the town open (1991-style reforms)
        </button>
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset
        </button>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Set integration to 90%. Check all three shoes. Who is the clear winner, who is the clear loser -- and what single number decides it?</li>
          <li>As the unskilled worker at 90% integration, compare the tariff wall UP vs DOWN. Protection helps security -- what does it cost the skilled worker?</li>
        </ol>
      </div>
    </div>
  );
}

export default C12_SociologyGlobalisationSim;

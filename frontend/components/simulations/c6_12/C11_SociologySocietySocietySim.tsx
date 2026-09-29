'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'C. Wright Mills called the sociological IMAGINATION the switch between two ways of seeing one event. ' +
  'One worker losing a job is a PERSONAL TROUBLE: look at her skills, her luck, her savings. A whole town ' +
  'losing its jobs is a PUBLIC ISSUE: the factory closed, the demand moved -- no amount of personal virtue ' +
  'fixes it. Same unemployment, different cause, different cure. Slide how many people it touches and watch ' +
  'the lens flip.';

export function C11_SociologySocietySocietySim() {
  const [affected, setAffected] = useState(1); // 1 .. 100000 (log slider)
  const [townDependence, setTownDependence] = useState(80); // one-industry town dependence on the factory
  const [lens, setLens] = useState<'personal' | 'structural'>('personal');
  const [noteLog, setNoteLog] = useState<string[]>([]);

  // log slider: 1 to 100000
  const nAffected = Math.round(Math.pow(10, affected));
  const shareOfWorkers = Math.min(100, Math.round((nAffected / 10000) * (townDependence / 100) * 100));
  const isPublicIssue = shareOfWorkers > 10;
  const diagnosis = isPublicIssue ? 'Public issue: the STRUCTURE failed' : 'Personal trouble: examine the INDIVIDUAL';

  const remedies = isPublicIssue
    ? 'Cure: reopen demand, new industry, government job programme, retraining the WHOLE town.'
    : 'Cure: counselling, skills course, job search help -- for this one person.';

  const gridPeople = useMemo(() => Math.min(60, Math.max(1, Math.round(nAffected / 1700))), [nAffected]);

  const record = () => setNoteLog((l) => [...l.slice(-4), `${nAffected.toLocaleString('en-IN')} affected -> ${diagnosis}`]);

  const reset = () => {
    setAffected(1);
    setTownDependence(80);
    setLens('personal');
    setNoteLog([]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">The Sociological Imagination: Trouble or Issue?</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* People visual */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <svg viewBox="0 0 400 250" className="w-full">
            <text x={200} y={22} textAnchor="middle" fontSize={13} fontWeight="bold" fill="#e2e8f0">
              {nAffected.toLocaleString('en-IN')} workers lost their jobs
            </text>
            <rect x={30} y={40} width={340} height={150} rx={12} fill="#0b1220" stroke="#334155" />
            {Array.from({ length: gridPeople }, (_, i) => {
              const col = i % 12;
              const row = Math.floor(i / 12);
              const isOrange = lens === 'personal' ? i === 0 : true;
              return (
                <g key={i} style={{ transition: 'fill 0.3s' }}>
                  <circle cx={50 + col * 27} cy={70 + row * 26} r={7} fill={isOrange ? '#fb923c' : '#475569'} opacity={isOrange ? 0.95 : 0.8} />
                  <rect x={50 + col * 27 - 5} y={70 + row * 26 + 9} width={10} height={11} rx={3} fill={isOrange ? '#fb923c' : '#475569'} opacity={isOrange ? 0.95 : 0.8} />
                </g>
              );
            })}
            <text x={200} y={216} textAnchor="middle" fontSize={11} fill="#94a3b8">
              Each dot ≈ {nAffected < 1700 ? nAffected.toLocaleString('en-IN') : Math.round(nAffected / gridPeople).toLocaleString('en-IN')} real workers
            </text>
            <text x={200} y={236} textAnchor="middle" fontSize={12} fontWeight="bold" fill={isPublicIssue ? '#f87171' : '#34d399'}>
              {diagnosis}
            </text>
          </svg>
        </div>

        {/* Lens panel */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-400">Live diagnosis</div>
          <div className="text-slate-300">Town depends on the one factory: <span className="font-mono text-gold-300">{townDependence}%</span></div>
          <div className="text-slate-300">Share of town workers hit: <span className="font-mono text-amber-300">{shareOfWorkers}%</span></div>
          <div className="text-slate-300">Current lens: <span className={`font-bold ${lens === 'personal' ? 'text-emerald-300' : 'text-rose-300'}`}>{lens === 'personal' ? 'personal trouble' : 'public issue'}</span></div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">{remedies}</div>
          {lens === 'personal' && isPublicIssue && (
            <div className="text-xs text-rose-300">Lens mismatch! You are counselling individuals for a problem made by the economy itself.</div>
          )}
          {lens === 'structural' && !isPublicIssue && (
            <div className="text-xs text-amber-300">Lens mismatch! This one person&apos;s case may really be about skills or luck.</div>
          )}
          <div className="text-xs text-amber-300 pt-2 border-t border-slate-800">
            Misconception killer: sociology is not &quot;common sense with big words&quot;. Common sense blames the nearest person; the imagination checks the structure first.
          </div>
          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">Case log</div>
          {noteLog.length === 0 && <div className="text-xs text-slate-500">Press Record case.</div>}
          {noteLog.map((s, i) => (
            <div key={i} className="text-xs font-mono text-slate-300">{s}</div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Workers affected (logarithmic)</span>
            <span className="font-mono font-bold text-gold-300">{nAffected.toLocaleString('en-IN')}</span>
          </label>
          <input type="range" aria-label="workers affected" min={0} max={5} step={0.05} value={affected} onChange={(e) => setAffected(Number(e.target.value))} className="w-full mt-2 accent-gold-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Town dependence on the factory</span>
            <span className="font-mono font-bold text-gold-300">{townDependence}%</span>
          </label>
          <input type="range" aria-label="town dependence" min={10} max={100} step={5} value={townDependence} onChange={(e) => setTownDependence(Number(e.target.value))} className="w-full mt-2 accent-gold-400" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setLens('personal')}
          className={`px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border ${lens === 'personal' ? 'bg-emerald-600 border-emerald-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
        >
          Lens: blame the person
        </button>
        <button
          onClick={() => setLens('structural')}
          className={`px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border ${lens === 'structural' ? 'bg-gold-600 border-gold-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
        >
          Lens: blame the structure
        </button>
        <button onClick={record} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-amber-600 border-amber-400 hover:bg-amber-500">
          Record case
        </button>
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Slide workers affected from 1 to 100,000 with dependence at 80%. At roughly how many workers does the verdict flip from trouble to issue?</li>
          <li>Set 10,000 affected. Now drag town dependence from 100% down to 10%. Why does the SAME layoff change its sociological meaning?</li>
        </ol>
      </div>
    </div>
  );
}

export default C11_SociologySocietySocietySim;

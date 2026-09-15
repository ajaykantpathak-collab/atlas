'use client';

import React, { useEffect, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Breathing pulls air in (inhale) and pushes it out (exhale) -- about 15 to 18 times a minute ' +
  'at rest. Running or climbing makes your muscles demand more oxygen, so the rate climbs. ' +
  'Fishes do the same job with gills, counting flows of water instead of breaths of air.';

const ACTIVITIES = [
  { id: 'sleep', name: 'Sleeping', emoji: '😴', rate: 13 },
  { id: 'sit', name: 'Sitting', emoji: '🪑', rate: 16 },
  { id: 'walk', name: 'Walking', emoji: '🚶', rate: 22 },
  { id: 'run', name: 'Running', emoji: '🏃', rate: 40 },
] as const;

type Act = (typeof ACTIVITIES)[number]['id'];

export function C7_ScienceRespirationInOrganismsSim() {
  const [act, setAct] = useState<Act>('sit');
  const [organism, setOrganism] = useState<'human' | 'fish'>('human');
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const [count, setCount] = useState(0);
  const [measuring, setMeasuring] = useState(false);

  const rate = ACTIVITIES.find((a) => a.id === act)!.rate * (organism === 'fish' ? 1.6 : 1);
  const periodMs = Math.round(60000 / rate / 2); // half cycle = inhale or exhale

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => {
        if (p === 'in') return 'out';
        if (measuring) setCount((c) => c + 1);
        return 'in';
      });
    }, periodMs);
    return () => clearInterval(id);
  }, [periodMs, measuring]);

  const scale = phase === 'in' ? 1.12 : 0.92;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Respiration in Organisms: Breathing in Action</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Activity + organism pickers */}
      <div className="flex flex-wrap gap-2 mt-4">
        {ACTIVITIES.map((a) => (
          <button
            key={a.id}
            onClick={() => { setAct(a.id); setCount(0); }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${act === a.id ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
          >
            {a.emoji} {a.name}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          {(['human', 'fish'] as const).map((o) => (
            <button
              key={o}
              onClick={() => { setOrganism(o); setCount(0); }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border capitalize transition-colors ${organism === o ? 'bg-emerald-600 border-emerald-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
            >
              {o === 'human' ? 'Human (lungs)' : 'Fish (gills)'}
            </button>
          ))}
        </div>
      </div>

      {/* Breathing figure */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
        <svg viewBox="0 0 600 230" className="w-full">
          {organism === 'human' ? (
            <g transform="translate(300, 115)">
              <circle cx={0} cy={-55} r={22} fill="#fcd34d" />
              <rect x={-26} y={-30} width={52} height={80} rx={16} fill="#3b82f6" />
              {/* lungs inflate/deflate */}
              <g style={{ transform: `scale(${scale})`, transition: `transform ${periodMs}ms ease-in-out`, transformOrigin: '0px 0px' }}>
                <ellipse cx={-14} cy={-8} rx={14} ry={phase === 'in' ? 24 : 18} fill="#f87171" opacity={0.85} style={{ transition: `all ${periodMs}ms ease-in-out` }} />
                <ellipse cx={14} cy={-8} rx={14} ry={phase === 'in' ? 24 : 18} fill="#f87171" opacity={0.85} style={{ transition: `all ${periodMs}ms ease-in-out` }} />
              </g>
              {/* air stream */}
              {phase === 'in' ? (
                <g>
                  <text x={95} y={-12} fill="#34d399" fontSize={15} fontWeight="bold">air IN (oxygen rich)</text>
                  <line x1={90} y1={-6} x2={40} y2={-6} stroke="#34d399" strokeWidth={3} />
                  <polygon points="40,-11 28,-6 40,-1" fill="#34d399" />
                </g>
              ) : (
                <g>
                  <text x={95} y={-12} fill="#fb923c" fontSize={15} fontWeight="bold">air OUT (carbon dioxide)</text>
                  <line x1={40} y1={-6} x2={90} y2={-6} stroke="#fb923c" strokeWidth={3} />
                  <polygon points="90,-11 102,-6 90,-1" fill="#fb923c" />
                </g>
              )}
            </g>
          ) : (
            <g transform="translate(300, 115)">
              {/* fish */}
              <ellipse cx={0} cy={0} rx={70} ry={34} fill="#38bdf8" opacity={0.9} />
              <polygon points="-70,0 -105,-22 -105,22" fill="#0ea5e9" />
              <circle cx={40} cy={-8} r={5} fill="#0f172a" />
              {/* gill flow */}
              <g style={{ transform: `scale(${scale})`, transition: `transform ${periodMs}ms ease-in-out` }}>
                {[...Array(3)].map((_, i) => (
                  <path key={i} d={`M ${18 + i * 10} -20 Q ${10 + i * 10} 0 ${18 + i * 10} 20`} stroke="#e0f2fe" strokeWidth={3} fill="none" />
                ))}
              </g>
              <text x={phase === 'in' ? 110 : 110} y={-30} fill={phase === 'in' ? '#34d399' : '#fb923c'} fontSize={14} fontWeight="bold">
                {phase === 'in' ? 'water IN through mouth' : 'water OUT over gills'}
              </text>
            </g>
          )}
          <text x={300} y={205} textAnchor="middle" fill="#94a3b8" fontSize={13}>
            {phase === 'in' ? 'Inhale -- chest expands, air rushes in' : 'Exhale -- chest relaxes, air pushed out'}
          </text>
        </svg>
      </div>

      {/* Rate readout + 1-minute counter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-slate-800 rounded-2xl border border-slate-600 text-center">
          <div className="text-xs uppercase text-slate-400">{organism === 'human' ? 'Breathing rate' : 'Gill flow rate'}</div>
          <div className="text-3xl font-black font-mono text-sky-400">{Math.round(rate)}/min</div>
          <div className="text-xs text-slate-400 mt-1">{ACTIVITIES.find((a) => a.id === act)!.name} pace</div>
        </div>
        <div className="p-4 bg-slate-800 rounded-2xl border border-slate-600 text-center">
          <div className="text-xs uppercase text-slate-400">Counted breaths (stopwatch tool)</div>
          <div className="text-3xl font-black font-mono text-emerald-400">{count}</div>
          <button
            onClick={() => { setCount(0); setMeasuring((m) => !m); }}
            className={`mt-2 px-4 py-1.5 rounded-xl text-xs font-bold border ${measuring ? 'bg-rose-600 border-rose-400' : 'bg-emerald-600 border-emerald-400'}`}
          >
            {measuring ? 'Stop & reset' : 'Start counting'}
          </button>
          {measuring && <div className="text-[10px] text-slate-400 mt-1">counting full breaths (in + out)...</div>}
        </div>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Move from Sleeping to Running: how many times faster is the rate? Now guess: why can you talk while walking but not while sprinting?</li>
          <li>Switch to the fish while Running and count 10 breaths with the stopwatch. Does the gill rhythm feel like your own breathing after PE class?</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_ScienceRespirationInOrganismsSim;

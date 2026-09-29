'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Every society RANKS people -- that is stratification. What differs is how CLOSED the ladder is. ' +
  'In a caste-like closed society your rank is ASCRIPTIVE: fixed at birth. In an open society rank leans on ' +
  'ACHIEVEMENT: education, effort, jobs. Slide the openness dial and launch children from the same family -- ' +
  'where do they land, and how much of the parents\' rank do they inherit?';

const LAYERS = [
  { name: 'Top: professionals, big owners', color: '#818cf8' },
  { name: 'Upper-middle: small business', color: '#38bdf8' },
  { name: 'Middle: clerks, skilled work', color: '#34d399' },
  { name: 'Working: casual labour', color: '#fbbf24' },
  { name: 'Bottom: landless, insecure work', color: '#f87171' },
];

export function C11_SociologySocialStratificationSim() {
  const [openness, setOpenness] = useState(20); // 0 caste-closed .. 100 merit-open
  const [parentStatus, setParentStatus] = useState(20); // 0-100 social status index
  const [effort, setEffort] = useState(70); // child education/effort 0-100
  const [children, setChildren] = useState<{ status: number; effort: number }[]>([]);

  // Child status = inherited share shrinks with openness
  const childStatus = useMemo(() => {
    const inherited = (parentStatus / 100) * (1 - openness / 100);
    const achieved = (effort / 100) * (openness / 100);
    return Math.round((inherited + achieved) * 100);
  }, [parentStatus, effort, openness]);

  const layerOf = (status: number) => Math.min(4, Math.floor((1 - status / 100) * 5));
  const parentLayer = layerOf(parentStatus);
  const childLayer = layerOf(childStatus);
  const mobility = parentStatus - childStatus;

  const launchChild = () =>
    setChildren((c) => [...c.slice(-7), { status: childStatus, effort }]);

  const avgChild = children.length ? Math.round(children.reduce((a, b) => a + b.status, 0) / children.length) : childStatus;

  const reset = () => {
    setOpenness(20);
    setParentStatus(20);
    setEffort(70);
    setChildren([]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">Stratification: How Closed Is the Ladder?</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Pyramid */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <svg viewBox="0 0 400 250" className="w-full">
            {LAYERS.map((l, i) => {
              const w = 90 + i * 66;
              const y = 18 + i * 42;
              return (
                <g key={i}>
                  <rect x={200 - w / 2} y={y} width={w} height={34} rx={6} fill={l.color} opacity={0.3} stroke="#334155" />
                  <text x={200} y={y + 21} textAnchor="middle" fontSize={9.5} fill="#cbd5e1">
                    {l.name}
                  </text>
                  {i === parentLayer && (
                    <g>
                      <circle cx={44} cy={y + 17} r={9} fill="#f59e0b" />
                      <text x={44} y={y + 21} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#0f172a">P</text>
                    </g>
                  )}
                  {i === childLayer && (
                    <g style={{ transition: 'transform 0.35s' }}>
                      <circle cx={352} cy={y + 17} r={9} fill="#f472b6" />
                      <text x={352} y={y + 21} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#0f172a">C</text>
                    </g>
                  )}
                </g>
              );
            })}
            <text x={44} y={244} textAnchor="middle" fontSize={10} fill="#f59e0b">parents</text>
            <text x={352} y={244} textAnchor="middle" fontSize={10} fill="#f472b6">child</text>
          </svg>
        </div>

        {/* Live working */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-400">Live mobility arithmetic</div>
          <div className="text-slate-300 font-mono text-xs leading-relaxed">
            child status =<br />
            &nbsp;&nbsp;parent x (1 - openness) + effort x openness<br />
            = {parentStatus} x {((100 - openness) / 100).toFixed(2)} + {effort} x {(openness / 100).toFixed(2)}
            = <span className="text-emerald-300 font-bold">{childStatus}</span>
          </div>
          <div className="text-slate-300">
            Society type: <span className="font-bold text-gold-300">{openness < 25 ? 'Closed (ascription rules)' : openness < 65 ? 'Semi-open' : 'Open (achievement rules)'}</span>
          </div>
          <div className="text-slate-300">
            Child lands in: <span className="font-bold text-pink-300">{LAYERS[childLayer].name}</span>
          </div>
          <div className={`text-xs ${mobility > 5 ? 'text-emerald-300' : mobility < -5 ? 'text-rose-300' : 'text-slate-400'}`}>
            {mobility > 5 ? 'Upward mobility: the child rose above the parents.' : mobility < -5 ? 'Downward slide: the child fell below the parents.' : 'Stuck at the parents level.'}
          </div>
          <div className="text-slate-300 pt-1 border-t border-slate-800">
            Children launched so far: {children.length} -- average landing status {avgChild}
          </div>
          <div className="text-xs text-amber-300">
            Misconception killer: an OPEN society is not an EQUAL one. Openness removes the birth barrier; talent and luck still spread people across layers.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Ladder openness (ascription vs achievement)</span>
            <span className="font-mono font-bold text-gold-300">{openness}%</span>
          </label>
          <input type="range" aria-label="openness" min={0} max={100} step={5} value={openness} onChange={(e) => setOpenness(Number(e.target.value))} className="w-full mt-2 accent-gold-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Parents&apos; status</span>
            <span className="font-mono font-bold text-amber-300">{parentStatus}</span>
          </label>
          <input type="range" aria-label="parent status" min={5} max={95} step={5} value={parentStatus} onChange={(e) => setParentStatus(Number(e.target.value))} className="w-full mt-2 accent-amber-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Child&apos;s effort and education</span>
            <span className="font-mono font-bold text-emerald-300">{effort}</span>
          </label>
          <input type="range" aria-label="child effort" min={0} max={100} step={5} value={effort} onChange={(e) => setEffort(Number(e.target.value))} className="w-full mt-2 accent-emerald-400" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={launchChild} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-gold-600 border-gold-400 hover:bg-gold-500">
          Launch this child
        </button>
        <button
          onClick={() => { setOpenness(0); setParentStatus(15); }}
          className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-rose-600 border-rose-400 hover:bg-rose-500"
        >
          Born at the bottom, closed ladder
        </button>
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Press &quot;Born at the bottom, closed ladder&quot;. Set effort to 100 and launch five children (vary openness 0, 25, 50, 75, 100). At which openness does effort finally pay?</li>
          <li>Keep openness at 80. Launch one child at effort 20 and one at 100 from rich parents. Does openness guarantee the harder-working child wins?</li>
        </ol>
      </div>
    </div>
  );
}

export default C11_SociologySocialStratificationSim;

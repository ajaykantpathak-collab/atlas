'use client';

import React, { useState } from 'react';

/**
 * Class 11 Maths -- Probability
 * Two dice: pick an event, read its theoretical probability from the 36-outcome
 * sample space, then watch a Monte Carlo frequency converge toward it.
 * Self-contained: react + tailwind only.
 */

type EventKey = 'sum7' | 'sum10' | 'doubles' | 'even' | 'diff1';
const EVENTS: Record<EventKey, { label: string; check: (a: number, b: number) => boolean; count: number }> = {
  sum7: { label: 'sum = 7', check: (a, b) => a + b === 7, count: 6 },
  sum10: { label: 'sum >= 10', check: (a, b) => a + b >= 10, count: 6 },
  doubles: { label: 'doubles (a = b)', check: (a, b) => a === b, count: 6 },
  even: { label: 'sum is even', check: (a, b) => (a + b) % 2 === 0, count: 18 },
  diff1: { label: '|a - b| = 1', check: (a, b) => Math.abs(a - b) === 1, count: 10 },
};

export function C11_MathematicsProbabilitySim() {
  const [eventKey, setEventKey] = useState<EventKey>('sum7');
  const [trials, setTrials] = useState(0);
  const [hits, setHits] = useState(0);
  const [history, setHistory] = useState<number[]>([]); // 1/0 running results
  const [lastRoll, setLastRoll] = useState<[number, number] | null>(null);

  const ev = EVENTS[eventKey];
  const theoretical = ev.count / 36;

  const rollN = (times: number) => {
    let h = 0;
    const results: number[] = [];
    let last: [number, number] = [0, 0];
    for (let i = 0; i < times; i++) {
      const a = 1 + Math.floor(Math.random() * 6);
      const b = 1 + Math.floor(Math.random() * 6);
      const win = ev.check(a, b) ? 1 : 0;
      h += win;
      results.push(win);
      last = [a, b];
    }
    setTrials((t) => t + times);
    setHits((x) => x + h);
    setHistory((prev) => {
      const next = [...prev, ...results];
      return next.length > 4000 ? next.slice(next.length - 4000) : next;
    });
    setLastRoll(last);
  };

  const reset = () => { setTrials(0); setHits(0); setHistory([]); setLastRoll(null); };
  const switchEvent = (k: EventKey) => { setEventKey(k); setTrials(0); setHits(0); setHistory([]); setLastRoll(null); };

  const empirical = trials > 0 ? hits / trials : 0;
  const gap = Math.abs(empirical - theoretical);

  // Running frequency trace (downsample to <= 120 points)
  const tracePts: string[] = [];
  let run = 0;
  const H = history;
  const stepN = Math.max(1, Math.floor(H.length / 120));
  const px = (i: number) => 50 + (i / Math.max(1, H.length)) * 390;
  const py = (p: number) => 230 - (p / 1) * 190;
  for (let i = 0; i < H.length; i += stepN) {
    run += H[i];
    if (i % stepN === 0) tracePts.push(`${px(i + 1)},${py(run / (i + 1))}`);
  }
  if (H.length > 0) tracePts.push(`${px(H.length)},${py(hits / H.length)}`);

  // Sample-space 6x6 grid highlighting the winning outcomes
  const cellWins = (a: number, b: number) => ev.check(a, b);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-red-950/80 rounded-2xl border border-red-700 font-mono">P</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-400">Class 11 -- Probability</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Theory vs Dice: Watch the Law of Large Numbers</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 260" className="w-full">
            <line x1={50} y1={230} x2={440} y2={230} stroke="#475569" strokeWidth={2} />
            <line x1={50} y1={230} x2={50} y2={20} stroke="#475569" strokeWidth={2} />
            <text x={245} y={252} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="monospace">rolls (t)</text>
            <text x={22} y={130} fill="#64748b" fontSize={10} fontFamily="monospace" transform="rotate(-90 22 130)">P(event)</text>
            <line x1={50} y1={py(theoretical)} x2={440} y2={py(theoretical)} stroke="#34d399" strokeWidth={2} strokeDasharray="7 5" />
            <text x={44} y={py(theoretical) - 6} textAnchor="end" fill="#34d399" fontSize={10} fontFamily="monospace">
              theory {theoretical.toFixed(4)}
            </text>
            {tracePts.length > 1 && <polyline points={tracePts.join(' ')} fill="none" stroke="#f87171" strokeWidth={2} />}
            <text x={58} y={36} fill="#f87171" fontSize={10} fontFamily="monospace">
              running frequency after {trials.toLocaleString()} rolls: {trials > 0 ? empirical.toFixed(4) : '--'} (gap {trials > 0 ? gap.toFixed(4) : '--'})
            </text>
          </svg>

          <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 flex gap-4 items-center">
            <svg viewBox="0 0 200 110" className="w-56">
              {[1, 2, 3, 4, 5, 6].map((a) => [1, 2, 3, 4, 5, 6].map((b) => (
                <rect key={`${a}${b}`} x={10 + (a - 1) * 30} y={5 + (6 - b) * 17} width={28} height={15} rx={3}
                  fill={cellWins(a, b) ? '#f87171' : '#1e293b'}
                  opacity={cellWins(a, b) ? 0.9 : 0.6} />
              )))}
              <text x={100} y={108} textAnchor="middle" fill="#64748b" fontSize={9} fontFamily="monospace">
                sample space 6 x 6 = 36 outcomes; red = event
              </text>
            </svg>
            <div className="text-xs font-mono space-y-1">
              <div className="text-slate-400">Event: <b className="text-red-300">{ev.label}</b></div>
              <div className="text-slate-400">Favourable: <b className="text-amber-300">{ev.count}</b> of 36</div>
              <div className="text-slate-400">P(E) = {ev.count}/36 = <b className="text-emerald-300">{theoretical.toFixed(4)}</b></div>
              {lastRoll && <div className="text-slate-500">last roll: ({lastRoll[0]}, {lastRoll[1]})</div>}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-2">
            <p className="text-[11px] text-slate-400">Choose the event (resets the run)</p>
            <div className="grid grid-cols-1 gap-1.5">
              {(Object.keys(EVENTS) as EventKey[]).map((k) => (
                <button key={k} onClick={() => switchEvent(k)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold text-left ${eventKey === k ? 'bg-red-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                  {EVENTS[k].label} <span className="opacity-70 font-mono">({EVENTS[k].count}/36)</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-2">
            <p className="text-[11px] text-slate-400">Roll the dice</p>
            <div className="grid grid-cols-3 gap-2">
              {[1, 10, 100].map((t) => (
                <button key={t} onClick={() => rollN(t)}
                  className="py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 transition">
                  x{t}
                </button>
              ))}
            </div>
            <button onClick={reset} className="w-full py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700">
              Reset experiment
            </button>
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-mono">
              <div><span className="text-slate-500">Rolls</span><div className="text-slate-200 font-bold">{trials.toLocaleString()}</div></div>
              <div><span className="text-slate-500">Hits</span><div className="text-slate-200 font-bold">{hits.toLocaleString()}</div></div>
              <div><span className="text-slate-500">Empirical P</span><div className="text-red-300 font-bold">{trials > 0 ? (hits / trials).toFixed(4) : '--'}</div></div>
              <div><span className="text-slate-500">Theoretical P</span><div className="text-emerald-300 font-bold">{theoretical.toFixed(4)}</div></div>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Classical probability counts equally likely outcomes of the sample space S with |S| = 36:
              P(E) = n(E)/n(S). The empirical frequency refuses to sit still for small runs, but past a
              few thousand rolls it clamps onto the theoretical line -- that convergence IS the law of
              large numbers, and it is why casinos never sweat a single night.
            </p>
          </div>

          <div className="bg-red-950/40 rounded-2xl border border-red-800/50 p-4 text-xs">
            <p className="font-bold text-red-300 mb-1">What to try</p>
            <p>1. Roll x100 about ten times (1000 rolls) and read the gap -- then decide: which event converges fastest, and does its P being larger matter?</p>
            <p>2. Before switching, predict |a-b| = 1 by counting pairs on the grid. Click it: does the red cell count match the 10/36 shown?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_MathematicsProbabilitySim;

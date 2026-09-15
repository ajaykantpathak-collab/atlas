'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Number play hides inside digits. Take any 3-digit number, flip it backwards and subtract the ' +
  'smaller from the bigger. Repeat with the answer. No matter which number you start with, you ' +
  'ALWAYS land on 495 -- the Kaprekar constant! Mathematicians love such surprises.';

const digitsOf = (n: number) => String(n).padStart(3, '0').split('').map(Number);
const kaprekarStep = (n: number) => {
  const asc = [...digitsOf(n)].sort((a, b) => a - b);
  const big = asc[2] * 100 + asc[1] * 10 + asc[0];
  const small = asc[0] * 100 + asc[1] * 10 + asc[2];
  return { big, small, next: big - small };
};

export function C7_MathematicsNumberPlaySim() {
  const [d1, setD1] = useState(3);
  const [d2, setD2] = useState(2);
  const [d3, setD3] = useState(7);
  const [chain, setChain] = useState<number[]>([]);
  const [showSteps, setShowSteps] = useState(true);

  const current = chain.length ? chain[chain.length - 1] : d1 * 100 + d2 * 10 + d3;
  const step = useMemo(() => kaprekarStep(current), [current]);
  const reached = current === 495;

  const start = () => setChain([d1 * 100 + d2 * 10 + d3]);
  const stepOnce = () => setChain((c) => (c.length ? [...c, kaprekarStep(c[c.length - 1]).next] : [d1 * 100 + d2 * 10 + d3]));
  const runAll = () => {
    let n = chain.length ? chain[chain.length - 1] : d1 * 100 + d2 * 10 + d3;
    const c = chain.length ? [...chain] : [n];
    let guard = 0;
    while (n !== 495 && guard < 12) {
      n = kaprekarStep(n).next;
      c.push(n);
      guard++;
    }
    setChain(c);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Number Play: The Secret of 495</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Digit pickers */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { v: d1, set: setD1, label: 'hundreds' },
          { v: d2, set: setD2, label: 'tens' },
          { v: d3, set: setD3, label: 'ones' },
        ].map((d) => (
          <div key={d.label} className="p-3 bg-slate-800 rounded-2xl border border-slate-600 text-center">
            <div className="text-[10px] uppercase text-slate-400">{d.label}</div>
            <div className="font-mono text-3xl font-black text-sky-300">{d.v}</div>
            <input type="range" aria-label={`${d.label} digit`} min={0} max={9} value={d.v} onChange={(e) => d.set(Number(e.target.value))} className="w-full mt-1 accent-sky-400" />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <button onClick={start} className="px-4 py-2 rounded-xl text-sm font-semibold border bg-indigo-600 border-indigo-400 hover:bg-indigo-500">
          Start with {d1 * 100 + d2 * 10 + d3}
        </button>
        <button onClick={stepOnce} disabled={!chain.length || reached} className="px-4 py-2 rounded-xl text-sm font-semibold border bg-amber-600 border-amber-400 hover:bg-amber-500 disabled:opacity-40">
          Do one flip-subtract
        </button>
        <button onClick={runAll} disabled={!chain.length || reached} className="px-4 py-2 rounded-xl text-sm font-semibold border bg-emerald-600 border-emerald-400 hover:bg-emerald-500 disabled:opacity-40">
          Repeat until it locks
        </button>
        <button
          onClick={() => { setChain([]); setD1(1 + Math.floor(Math.random() * 9)); setD2(Math.floor(Math.random() * 10)); setD3(Math.floor(Math.random() * 10)); }}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Random number
        </button>
      </div>

      {/* Chain of steps */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700 min-h-[120px]">
        {chain.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">Pick three digits and press Start. Which number will win -- yours or 495?</p>
        ) : (
          <div className="space-y-2">
            {chain.map((n, i) => {
              const st = i === 0 ? null : kaprekarStep(chain[i - 1]);
              return (
                <div key={i}>
                  {showSteps && st && (
                    <div className="text-xs font-mono text-slate-400">
                      {st.big} - {st.small} =
                    </div>
                  )}
                  <div
                    className={`inline-block px-3 py-1 rounded-lg font-mono font-bold text-lg transition-colors ${
                      n === 495 ? 'bg-emerald-700 border border-emerald-400 text-white' : 'bg-slate-800 border border-slate-600 text-sky-200'
                    }`}
                  >
                    {String(n).padStart(3, '0')}
                    {n === 495 && <span className="text-emerald-300 text-sm ml-2">LOCKED!</span>}
                  </div>
                </div>
              );
            })}
            {reached && (
              <p className="text-sm text-emerald-400 font-semibold pt-1">
                Reached 495 in {chain.length - 1} step(s) -- and if you keep going it stays 495 forever (495 - 495? No: 954 - 459 = 495!).
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => setShowSteps((s) => !s)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${showSteps ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
        >
          {showSteps ? 'Hide' : 'Show'} the working (big - small)
        </button>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Try 100, then 594, then a number with all SAME digits like 555. Which one refuses to reach 495, and why?</li>
          <li>Find the starting number that takes the MOST steps to lock onto 495. (Keep it a real 3-digit number, first digit not zero.)</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsNumberPlaySim;

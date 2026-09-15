'use client';

import React, { useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'An equation is a balance scale: whatever sits on the left weighs exactly the same as the right. ' +
  'To find the unknown x, do the SAME thing to both sides -- remove loose blocks first, then ' +
  'split the x-crate pile equally. The scale stays balanced and x is revealed!';

export function C7_MathematicsFindingTheUnknownSim() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(5);
  const [c, setC] = useState(20);
  const [stage, setStage] = useState(0); // 0: ax+b=c, 1: ax=c-b, 2: solved
  const [guess, setGuess] = useState('');

  const rhs1 = c - b;
  const solution = rhs1 / a;
  const isNice = Number.isInteger(solution);
  const lhs = a * Number(guess || 0) + b;

  const tilt = (left: number, right: number) => Math.max(-12, Math.min(12, (left - right) * (3 / Math.max(3, Math.max(left, right)))));

  const Peg = ({ n, color }: { n: number; color: string }) => (
    <div className="flex flex-wrap gap-0.5 max-w-[190px] justify-center">
      {Array.from({ length: Math.min(n, 24) }, (_, i) => (
        <span key={i} className={`inline-block w-2.5 h-2.5 rounded-sm ${color}`} />
      ))}
      {n > 24 && <span className="text-[10px] text-slate-400">+{n - 24}</span>}
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Finding the Unknown: The Balance Method</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Balance scale */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
        <svg viewBox="0 0 600 250" className="w-full">
          <polygon points="300,40 320,60 280,60" fill="#fbbf24" />
          <rect x="296" y="60" width="8" height={90} fill="#94a3b8" />
          <g style={{ transform: `rotate(${stage === 2 ? 0 : tilt(lhs, c)}deg)`, transformOrigin: '300px 60px', transition: 'transform 0.4s' }}>
            <line x1="110" y1="62" x2="490" y2="62" stroke="#cbd5e1" strokeWidth={5} strokeLinecap="round" />
            {/* left pan */}
            <g>
              <line x1="110" y1="64" x2="80" y2="130" stroke="#94a3b8" strokeWidth={2} />
              <line x1="110" y1="64" x2="140" y2="130" stroke="#94a3b8" strokeWidth={2} />
              <path d="M 60 130 A 50 22 0 0 0 160 130 Z" fill="#334155" stroke="#64748b" />
              <text x="110" y="150" textAnchor="middle" fill="#7dd3fc" fontSize={15} fontWeight="bold">
                {stage === 2 ? `${a}x` : `${a}x + ${b}`}
              </text>
              {stage === 0 && (
                <g transform="translate(88, 96)">
                  <Peg n={b} color="bg-amber-400" />
                </g>
              )}
              <g transform="translate(96, 112)">
                <Peg n={Math.min(a, 8)} color="bg-sky-400" />
              </g>
            </g>
            {/* right pan */}
            <g>
              <line x1="490" y1="64" x2="460" y2="130" stroke="#94a3b8" strokeWidth={2} />
              <line x1="490" y1="64" x2="520" y2="130" stroke="#94a3b8" strokeWidth={2} />
              <path d="M 440 130 A 50 22 0 0 0 540 130 Z" fill="#334155" stroke="#64748b" />
              <text x="490" y="150" textAnchor="middle" fill="#fbbf24" fontSize={15} fontWeight="bold">
                {stage === 0 ? c : stage === 1 ? rhs1 : solution}
              </text>
            </g>
          </g>
          <text x="300" y="215" textAnchor="middle" fill="#94a3b8" fontSize={13}>
            {stage === 0 && `Balance: ${a}x + ${b} = ${c}. Step 1: take ${b} loose blocks off BOTH pans.`}
            {stage === 1 && `Now ${a}x = ${rhs1}. Step 2: split the right side into ${a} EQUAL crates.`}
            {stage === 2 && `x = ${solution}. Check: ${a} x ${solution} + ${b} = ${a * solution + b} = ${c}. Balanced!`}
          </text>
        </svg>
      </div>

      {/* Step controls */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setStage(1)}
          disabled={stage !== 0}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-amber-600 border-amber-400 hover:bg-amber-500 disabled:opacity-40"
        >
          Subtract {b} from both sides
        </button>
        <button
          onClick={() => setStage(2)}
          disabled={stage !== 1}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-emerald-600 border-emerald-400 hover:bg-emerald-500 disabled:opacity-40"
        >
          Divide both sides by {a}
        </button>
        <button
          onClick={() => setStage(0)}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Reset balance
        </button>
      </div>

      {/* Guess check */}
      <div className="mt-4 p-4 bg-slate-800 rounded-2xl border border-slate-600">
        <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">Check your own x (the scale never lies)</div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number"
            aria-label="your guess for x"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="try a value for x"
            className="w-36 px-3 py-2 rounded-xl bg-slate-950 border border-slate-600 text-sm font-mono"
          />
          <div className="font-mono text-sm">
            {a}x + {b} = <span className={lhs === c && guess !== '' ? 'text-emerald-400 font-bold' : 'text-slate-300'}>{guess === '' ? '--' : lhs}</span>{' '}
            {guess !== '' && (
              <span className={lhs === c ? 'text-emerald-400' : 'text-pink-400'}>
                {lhs === c ? 'BALANCED -- x found!' : lhs < c ? '(too light, go bigger)' : '(too heavy, go smaller)'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Equation builders */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between"><span>x-crates (a)</span><span className="font-mono font-bold text-sky-300">{a}</span></label>
          <input type="range" aria-label="coefficient a" min={2} max={6} value={a} onChange={(e) => { setA(Number(e.target.value)); setStage(0); }} className="w-full mt-2 accent-sky-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between"><span>loose blocks (b)</span><span className="font-mono font-bold text-amber-300">{b}</span></label>
          <input type="range" aria-label="constant b" min={0} max={12} value={b} onChange={(e) => { setB(Number(e.target.value)); setStage(0); }} className="w-full mt-2 accent-amber-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between"><span>right total (c)</span><span className="font-mono font-bold text-emerald-300">{c}</span></label>
          <input type="range" aria-label="total c" min={6} max={60} value={c} onChange={(e) => { setC(Number(e.target.value)); setStage(0); }} className="w-full mt-2 accent-emerald-400" />
        </div>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Find settings a, b, c where the answer x is a whole number, then hunt for one where x is NOT whole. What did you notice about c?</li>
          <li>Guess x BEFORE pressing any step button -- use the balance feedback (too light / too heavy) to zero in on the answer.</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsFindingTheUnknownSim;

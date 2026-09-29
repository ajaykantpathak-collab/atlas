'use client';
/**
 * C8_MathematicsLinearEquationsInOneVariableSim (Class 8 Maths)
 *
 * ELI5: An equation like 3x + 5 = 2x + 11 has exactly ONE hidden value of x.
 * The balancing way to find it: bring all x-terms to one side and all numbers
 * to the other (transposing), then divide. The see-saw shows both sides
 * weighed at your guess - it only levels off at the true solution.
 */
import React, { useState } from 'react';

export function C8_MathematicsLinearEquationsInOneVariableSim() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(5);
  const [c2, setC2] = useState(2);
  const [d, setD] = useState(11);
  const [guess, setGuess] = useState(0);
  const [showSteps, setShowSteps] = useState(false);

  const lhsAt = (x: number) => a * x + b;
  const rhsAt = (x: number) => c2 * x + d;
  const diff = lhsAt(guess) - rhsAt(guess);
  const tilt = Math.max(-13, Math.min(13, diff * 1.6));
  const denom = a - c2;
  const solution = denom === 0 ? null : (d - b) / denom;
  const isSol = denom === 0 ? b === d : Number.isInteger(solution!);

  const fmt = (co: number, k: number) => {
    const t = co === 1 ? 'x' : co === -1 ? '-x' : `${co}x`;
    if (k === 0) return t;
    return `(${t} ${k > 0 ? '+' : '-'} ${Math.abs(k)})`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-gold-700">Linear Equations: Weigh and Solve</h1>

      <div className="mt-3 p-4 bg-gold-50 border border-gold-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-gold-700">Strategy:</span> slide the four sliders to
          build an equation. Test guesses on the see-saw to feel where the balance point hides, then
          transpose: move every x to the left, every number to the right, flip signs as they cross
          the equals sign, and divide by the coefficient of x.
        </p>
      </div>

      <div className="mt-4 p-3 bg-slate-900 rounded-2xl text-center">
        <span className="font-mono text-xl md:text-2xl text-emerald-300 font-bold">
          {a === 1 ? 'x' : `${a}x`} {b >= 0 ? '+' : '-'} {Math.abs(b)} = {c2 === 1 ? 'x' : `${c2}x`} {d >= 0 ? '+' : '-'} {Math.abs(d)}
        </span>
      </div>

      <div className="mt-4 p-4 bg-gradient-to-b from-gold-50 to-white rounded-2xl border border-slate-200">
        <svg viewBox="0 0 560 170" className="w-full">
          <polygon points="280,140 262,165 298,165" fill="#78350f" />
          <g transform={`rotate(${-tilt} 280 130)`} style={{ transition: 'transform 400ms ease' }}>
            <rect x={90} y={124} width={380} height={9} rx={4} fill="#b45309" />
            <rect x={130} y={88} width={150} height={32} rx={8} fill="#6366f1" />
            <text x={205} y={109} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="monospace">
              LHS = {lhsAt(guess)}
            </text>
            <rect x={310} y={88} width={150} height={32} rx={8} fill="#10b981" />
            <text x={385} y={109} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="monospace">
              RHS = {rhsAt(guess)}
            </text>
          </g>
          <circle cx={280} cy={130} r={6} fill="#451a03" />
          <text x={280} y={26} textAnchor="middle" fontSize="13" fontWeight="bold" fill={diff === 0 ? '#059669' : '#475569'}>
            {diff === 0 ? `PERFECT BALANCE at x = ${guess}` : `x = ${guess}: ${diff > 0 ? 'LHS heavier' : 'RHS heavier'} by ${Math.abs(diff)}`}
          </text>
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          {([['Coefficient of x (LHS)', a, setA, 0, 9], ['Constant (LHS)', b, setB, -9, 9], ['Coefficient of x (RHS)', c2, setC2, 0, 9], ['Constant (RHS)', d, setD, -9, 9]] as [string, number, (v: number) => void, number, number][]).map(([label, val, setter, lo, hi]) => (
            <div key={label}>
              <label className="text-xs font-semibold text-slate-500 flex justify-between">
                <span>{label}</span>
                <span className="font-mono text-gold-600">{val}</span>
              </label>
              <input type="range" min={lo} max={hi} value={val} aria-label={label} onChange={(e) => setter(Number(e.target.value))} className="w-full mt-1 accent-gold-600" />
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between">
              <span>Your guess for x</span>
              <span className="font-mono text-amber-600">{guess}</span>
            </label>
            <input type="range" min={-10} max={15} value={guess} aria-label="guess x" onChange={(e) => setGuess(Number(e.target.value))} className="w-full mt-1 accent-amber-600" />
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <button onClick={() => setShowSteps((s) => !s)} className="px-4 py-2 rounded-xl text-sm font-bold bg-gold-600 text-white hover:bg-gold-500 transition-all">
            {showSteps ? 'Hide solution steps' : 'Show solution steps'}
          </button>
          {showSteps && (
            <div className="mt-3 font-mono text-sm space-y-1.5 text-slate-700">
              <div>1. Bring x-terms left, numbers right:</div>
              <div className="pl-4 text-gold-700">{fmt(a - c2, 0)} = {d - b}</div>
              {denom !== 0 && (
                <>
                  <div>2. Divide both sides by {denom}:</div>
                  <div className="pl-4 text-gold-700">x = ({d - b}) / ({denom}) = {Math.round(((d - b) / denom) * 1000) / 1000}</div>
                </>
              )}
              {denom === 0 && (
                <div className="text-rose-600">a = c, so x vanished: {b === d ? 'EVERY x works (identity)' : 'NO x works (contradiction)'}</div>
              )}
              <div className="pt-1 text-emerald-700 font-bold">
                {denom !== 0 && (isSol ? `Neat whole-number solution: x = ${solution}` : `Solution (fraction): x = ${Math.round(((d - b) / denom) * 1000) / 1000}`)}
              </div>
            </div>
          )}
          <div className="mt-3 text-xs text-slate-500 leading-relaxed">
            Distance from balance: the see-saw tilt per unit of guess equals ({a} - {c2}) = {a - c2}.
            Bigger coefficient difference = more sensitive balance.
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Build an equation whose answer is exactly x = 4, solve it with the steps, then confirm the see-saw levels at 4.</li>
          <li>Make a = c equal: what kind of equations can you still build, and when do they have no solution at all?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsLinearEquationsInOneVariableSim;

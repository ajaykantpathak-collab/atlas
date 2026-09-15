'use client';
/**
 * C8_MathematicsSquaresAndSquareRootsSim (Class 8 Maths)
 *
 * ELI5: Square numbers are built from L-shaped layers of odd numbers:
 * 1 + 3 + 5 + 7 = 16 = 4^2. To guess a square root, hunt for the nearest
 * perfect squares below and above - the root must sit between their roots.
 */
import React, { useState } from 'react';

const ODDS = [1, 3, 5, 7, 9, 11, 13, 15];

export function C8_MathematicsSquaresAndSquareRootsSim() {
  const [n, setN] = useState(5);
  const [m, setM] = useState(50);
  const [showLayers, setShowLayers] = useState(true);
  const [picked, setPicked] = useState<number | null>(null);

  const sq = n * n;
  const layers = ODDS.slice(0, n);
  const oddSum = layers.reduce((s, v) => s + v, 0);

  const root = Math.floor(Math.sqrt(m));
  const loSq = root * root;
  const hiSq = (root + 1) * (root + 1);
  const isPerfect = loSq === m;
  const frac = hiSq === loSq ? 0 : (m - loSq) / (hiSq - loSq);
  const estimate = Math.round((root + frac) * 100) / 100;

  const guessCheck = picked === null ? null : picked * picked === m;

  // units digit of m vs possible units digits of its root
  const unitsDigitPairs: Record<number, number[]> = { 0: [0], 1: [1, 9], 4: [2, 8], 5: [5], 6: [4, 6], 9: [3, 7] };

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-indigo-700">Squares and Square Roots: L-Layers and Root Hunting</h1>

      <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-indigo-700">Two ideas:</span> (1) every square number is a
          pile of L-shaped odd layers - that is why 1 + 3 + ... + (2n-1) = n^2. (2) To find a square
          root, trap M between two perfect squares: root(M) lives between their roots. The units
          digit of M even tells you how the root must end!
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Part 1: L layers */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 mb-2">PART 1 - BUILD n^2 FROM ODD LAYERS</p>
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => setN((v) => Math.min(8, v + 1))} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all">
              Add layer ({n})
            </button>
            <button onClick={() => setN((v) => Math.max(1, v - 1))} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 hover:bg-slate-300 transition-all">
              Remove
            </button>
            <button onClick={() => setShowLayers((s) => !s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${showLayers ? 'bg-amber-500 text-white' : 'bg-slate-200'}`}>
              {showLayers ? 'Colors: ON' : 'Colors: OFF'}
            </button>
          </div>
          <svg viewBox="0 0 220 220" className="w-full mt-2">
            {Array.from({ length: n }).flatMap((_, r) =>
              Array.from({ length: n }).map((__, c) => {
                const layerIndex = n - 1 - Math.min(r, c); // which L layer covers this cell
                const isL = r === n - 1 || c === n - 1;
                const color = showLayers ? ['#f59e0b', '#10b981', '#6366f1', '#ec4899', '#0891b2', '#8b5cf6', '#ef4444', '#84cc16'][(n - 1 - layerIndex) % 8] : '#a5b4fc';
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={10 + c * (200 / 8)}
                    y={10 + r * (200 / 8)}
                    width={200 / 8 - 3}
                    height={200 / 8 - 3}
                    rx={3}
                    fill={isL ? color : '#e0e7ff'}
                    stroke="#94a3b8"
                    strokeWidth={0.5}
                    style={{ transition: 'fill 300ms' }}
                  />
                );
              })
            )}
          </svg>
          <div className="mt-2 p-2 bg-white rounded-xl border border-slate-200 font-mono text-xs">
            <div>{layers.join(' + ')} = <span className="text-indigo-700 font-bold">{oddSum} = {n}^2</span></div>
            <div className="text-slate-500">each colored L adds the next odd number</div>
          </div>
        </div>

        {/* Part 2: root hunting */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 mb-2">PART 2 - HUNT root(M)</p>
          <label className="text-xs font-semibold text-slate-500 flex justify-between">
            <span>M (1 to 144)</span>
            <span className="font-mono text-indigo-600">{m}</span>
          </label>
          <input type="range" min={1} max={144} value={m} aria-label="number M" onChange={(e) => { setM(Number(e.target.value)); setPicked(null); }} className="w-full mt-2 accent-indigo-600" />
          <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div>
              trap: {loSq} = {root}^2 &lt;= {m} &lt; {hiSq} = {root + 1}^2
            </div>
            <div>
              so root(M) is between <span className="font-bold">{root}</span> and <span className="font-bold">{root + 1}</span> (about {estimate})
            </div>
            {isPerfect ? (
              <div className="mt-1 text-emerald-600 font-bold">M is a perfect square! root = {root}</div>
            ) : (
              <div className="mt-1 text-slate-500 text-xs">units digit of M is {m % 10}: a root must end in {(unitsDigitPairs[m % 10] || ['none']).join(' or ')} (if M were square)</div>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {Array.from({ length: 12 }).map((_, i) => {
              const g = i + 1;
              return (
                <button
                  key={g}
                  onClick={() => setPicked(g)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${picked === g ? 'bg-indigo-600 text-white' : guessCheck !== null && g === Math.round(estimate) ? 'bg-emerald-200 text-emerald-800' : 'bg-slate-200 hover:bg-slate-300'}`}
                >
                  {g}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className={`mt-2 p-2 rounded-xl text-sm font-bold ${guessCheck ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
              {picked}^2 = {picked * picked} - {guessCheck ? 'EXACT MATCH!' : picked * picked < m ? 'too small, go up' : 'too big, go down'}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Grow the square to n = 6 and verify the odd sum: 1+3+5+7+9+11 = 36. Now predict 7^2 by adding which odd number?</li>
          <li>Hunt root(90) using the trap: between which two squares does it sit? Which single digit square should you test first?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsSquaresAndSquareRootsSim;

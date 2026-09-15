'use client';
/**
 * C8_MathematicsCubesAndCubeRootsSim (Class 8 Maths)
 *
 * ELI5: A number is a PERFECT CUBE if its prime factors can be grouped in
 * triples of the same prime. 216 = 2x2x2 x 3x3x3 -> one triple of 2s and one
 * triple of 3s -> cube root = 2 x 3 = 6. Numbers whose factors cannot be
 * grouped in triples are not perfect cubes.
 */
import React, { useMemo, useState } from 'react';

function primeFactorise(m: number): [number, number][] {
  const out: [number, number][] = [];
  let n = m;
  for (let p = 2; p * p <= n; p++) {
    let c = 0;
    while (n % p === 0) {
      n /= p;
      c++;
    }
    if (c > 0) out.push([p, c]);
  }
  if (n > 1) out.push([n, 1]);
  return out;
}

export function C8_MathematicsCubesAndCubeRootsSim() {
  const [m, setM] = useState(216);
  const [showTriples, setShowTriples] = useState(true);

  const factors = useMemo(() => primeFactorise(m), [m]);
  const isPerfectCube = factors.every(([, e]) => e % 3 === 0) && m > 1;
  const cubeRoot = isPerfectCube
    ? factors.reduce((r, [p, e]) => r * Math.pow(p, e / 3), 1)
    : 0;
  const root = Math.round(Math.cbrt(m));
  const lo = root * root * root;
  const hi = (root + 1) * (root + 1) * (root + 1);
  const maxExp = Math.max(...factors.map(([, e]) => e), 1);

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-indigo-700">Cubes and Cube Roots - Prime Triple Machine</h1>

      <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-indigo-700">The triple test:</span> break the number into
          prime factors. If every prime appears a multiple of 3 times, the factors group into
          triples - one number from each triple multiplies to the cube root. Prime colors and card
          stacks below show exactly how the grouping works.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <label className="text-xs font-semibold text-slate-500 flex justify-between">
            <span>Number M (8 to 1000)</span>
            <span className="font-mono text-indigo-600 text-base">{m}</span>
          </label>
          <input type="range" min={8} max={1000} value={m} aria-label="number to test" onChange={(e) => setM(Number(e.target.value))} className="w-full mt-2 accent-indigo-600" />
          <div className="flex flex-wrap gap-2 mt-3">
            {[27, 64, 125, 216, 243, 500].map((v) => (
              <button key={v} onClick={() => setM(v)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-all">
                {v}
              </button>
            ))}
            <button onClick={() => setShowTriples((s) => !s)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${showTriples ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
              {showTriples ? 'Triple grouping: ON' : 'Triple grouping: OFF'}
            </button>
          </div>
          <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 text-sm">
            <div className="font-mono">
              <span className="text-slate-500">Prime factorisation: </span>
              <span className="text-indigo-700 font-bold">
                {factors.map(([p, e], i) => `${i > 0 ? ' x ' : ''}${p}^${e}`).join('')}
              </span>
            </div>
            <div className={`mt-2 font-bold ${isPerfectCube ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isPerfectCube
                ? `Perfect cube! Cube root = ${factors.map(([p, e]) => Math.pow(p, e / 3)).join(' x ')} = ${cubeRoot}`
                : `Not a perfect cube - a prime is left without a full triple.`}
            </div>
            {!isPerfectCube && (
              <div className="mt-1 text-xs text-slate-500 font-mono">
                It lies between {lo} = {root}^3 and {hi} = {root + 1}^3, so cube root is between {root} and {root + 1}.
              </div>
            )}
          </div>
        </div>

        {/* Card-stack visualization */}
        <div className="p-4 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 380 240" className="w-full">
            {factors.map(([p, e], idx) => {
              const groupW = 84;
              const x0 = 18 + idx * groupW;
              const color = ['#6366f1', '#10b981', '#f59e0b', '#ec4899'][idx % 4];
              const cards: JSX.Element[] = [];
              for (let c = 0; c < e; c++) {
                const y = 170 - c * 16;
                const isTripleStart = showTriples && c % 3 === 0;
                const tripleColor = showTriples ? ['#6366f1', '#10b981', '#f59e0b'][Math.floor(c / 3) % 3] : color;
                cards.push(
                  <g key={c}>
                    <rect
                      x={x0}
                      y={y}
                      width={58}
                      height={14}
                      rx={3}
                      fill={tripleColor}
                      opacity={isPerfectCube || !showTriples ? 0.95 : c % 3 === 2 ? 0.95 : 0.55}
                      style={{ transition: 'all 300ms' }}
                    />
                    <text x={x0 + 29} y={y + 11} textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">
                      {p}
                    </text>
                    {showTriples && c % 3 === 2 && (
                      <path d={`M ${x0 - 5} ${y - 2} Q ${x0 - 16} ${y + 8} ${x0 - 5} ${y + 40}`} stroke="#475569" fill="none" strokeDasharray="3" />
                    )}
                  </g>
                );
              }
              return (
                <g key={p}>
                  {cards}
                  <text x={x0 + 29} y={196} textAnchor="middle" fontSize="11" fill="#475569">
                    {p} appears {e}x {e % 3 === 0 ? '(triples!)' : `(needs ${3 - (e % 3)} more)`}
                  </text>
                </g>
              );
            })}
            <line x1={10} y1={184} x2={370} y2={184} stroke="#94a3b8" />
            <text x={190} y={228} textAnchor="middle" fontSize="11" fill="#334155">
              {showTriples ? 'Each color block = one triple; one card per block forms the root' : 'Plain stacks of prime factors'}
            </text>
            <text x={190} y={22} textAnchor="middle" fontSize="13" fontWeight="bold" fill={isPerfectCube ? '#059669' : '#e11d48'}>
              {isPerfectCube ? `${m} = (${cubeRoot})^3` : `${m} is not a perfect cube`}
            </text>
          </svg>
          <div className="mt-1 text-xs text-slate-500">
            Tallest stack has {maxExp} cards. A perfect cube needs every stack to be a multiple of 3.
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Find the smallest number to multiply by 392 so the result becomes a perfect cube (use the "needs more" hints).</li>
          <li>Predict which of 512 and 576 is a perfect cube, then check with the slider and explain using triples.</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsCubesAndCubeRootsSim;

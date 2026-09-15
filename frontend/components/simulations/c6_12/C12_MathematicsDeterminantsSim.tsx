'use client';

import React, { useState } from 'react';

/**
 * Class 12 Maths -- Determinants
 * Live 2x2 / 3x3 determinant: admissible entry editing, cofactor expansion
 * shown term by term, invertibility verdict and the triangle-area formula.
 * Self-contained: react + tailwind only.
 */

const init3 = () => [
  [2, -1, 3],
  [1, 2, -2],
  [0, 1, 4],
];

export function C12_MathematicsDeterminantsSim() {
  const [size, setSize] = useState<2 | 3>(3);
  const [m3, setM3] = useState<number[][]>(init3);

  const m2 = [m3[0].slice(0, 2), m3[1].slice(0, 2)];
  const M = size === 3 ? m3 : m2;

  const det2 = (a: number[][]) => a[0][0] * a[1][1] - a[0][1] * a[1][0];
  const det = size === 2
    ? det2(m2)
    : m3[0][0] * (m3[1][1] * m3[2][2] - m3[1][2] * m3[2][1])
      - m3[0][1] * (m3[1][0] * m3[2][2] - m3[1][2] * m3[2][0])
      + m3[0][2] * (m3[1][0] * m3[2][1] - m3[1][1] * m3[2][0]);

  // Cofactor expansion terms along row 1 for 3x3
  const cof = size === 3 ? [
    { sign: '+', term: m3[0][0], sub: m3[1][1] * m3[2][2] - m3[1][2] * m3[2][1], subTxt: `(${m3[1][1]}x${m3[2][2]} - ${m3[1][2]}x${m3[2][1]})` },
    { sign: '-', term: m3[0][1], sub: m3[1][0] * m3[2][2] - m3[1][2] * m3[2][0], subTxt: `(${m3[1][0]}x${m3[2][2]} - ${m3[1][2]}x${m3[2][0]})` },
    { sign: '+', term: m3[0][2], sub: m3[1][0] * m3[2][1] - m3[1][1] * m3[2][0], subTxt: `(${m3[1][0]}x${m3[2][1]} - ${m3[1][1]}x${m3[2][0]})` },
  ] : [];

  const area = Math.abs(det) / 2; // triangle (0,0), row1, row2

  const bump = (r: number, c: number, d: number) => {
    setM3((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = Math.min(9, Math.max(-9, next[r][c] + d));
      return next;
    });
  };

  const randomize = () => {
    setM3(() => Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => Math.floor(Math.random() * 19) - 9)));
  };

  const cellBox = (val: number, r: number, c: number, active: boolean) => (
    <div key={`${r}-${c}`} className={`flex flex-col items-center gap-0.5 ${active ? '' : 'opacity-35'}`}>
      <button onClick={() => bump(r, c, 1)} disabled={!active} aria-label={`increase entry ${r + 1},${c + 1}`}
        className="w-8 h-4 rounded-t bg-slate-700 hover:bg-slate-600 text-[9px] leading-none text-slate-200">+</button>
      <div className={`w-12 h-9 flex items-center justify-center font-mono font-bold text-lg rounded border ${active ? 'bg-slate-950 border-slate-600 text-white' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
        {active ? val : '-'}
      </div>
      <button onClick={() => bump(r, c, -1)} disabled={!active} aria-label={`decrease entry ${r + 1},${c + 1}`}
        className="w-8 h-4 rounded-b bg-slate-700 hover:bg-slate-600 text-[9px] leading-none text-slate-200">-</button>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700 font-mono">|A|</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Class 12 -- Determinants</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Cofactor Expansion and the Geometry of |A|</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
          <div className="flex items-center justify-center gap-2">
            <div className="text-4xl font-light text-slate-500">|</div>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1">{M.map((row, r) => (
                <div key={r} className="flex gap-2">{row.map((v, c) => cellBox(v, r, c, size === 3 || r < 2))}</div>
              ))}</div>
            </div>
            <div className="text-4xl font-light text-slate-500">|</div>
            <div className="ml-4 text-center">
              <div className="text-xs text-slate-400">det A</div>
              <div className={`text-3xl font-black font-mono ${det === 0 ? 'text-rose-400' : 'text-emerald-300'}`}>{det}</div>
              <div className={`mt-1 text-[10px] font-mono ${det === 0 ? 'text-rose-400' : 'text-emerald-300'}`}>
                {det === 0 ? 'SINGULAR: A^-1 does not exist' : 'invertible: A^-1 exists'}
              </div>
            </div>
          </div>

          {size === 3 ? (
            <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-emerald-300 font-bold">Expansion along row 1:</div>
              {cof.map((cf, i) => (
                <div key={i} className="text-slate-400">
                  {cf.sign} {cf.term} x {cf.subTxt} = {cf.sign} {cf.term} x {cf.sub} = <b className="text-slate-200">{cf.sign === '-' ? -cf.term * cf.sub : cf.term * cf.sub}</b>
                </div>
              ))}
              <div className="pt-1 border-t border-slate-800 text-slate-200">
                det = {cof.map((cf) => `${cf.sign === '-' ? '-' : '+'}${Math.abs(cf.term * cf.sub)}`).join(' ')} = <b className="text-emerald-300">{det}</b>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-400">
              det = ({m2[0][0]})({m2[1][1]}) - ({m2[0][1]})({m2[1][0]}) = <b className="text-emerald-300">{det2(m2)}</b>
            </div>
          )}

          <div className="mt-3 p-3 bg-emerald-950/30 rounded-xl border border-emerald-800/50 text-xs font-mono">
            <div className="text-emerald-300 font-bold mb-1">Geometry: area of triangle (0,0), ({size === 3 ? m3[0][0] : m2[0][0]},{size === 3 ? m3[0][1] : m2[0][1]}), ({size === 3 ? m3[1][0] : m2[1][0]},{size === 3 ? m3[1][1] : m2[1][1]})</div>
            <div className="text-slate-300">Area = 1/2 |det| = 1/2 x {Math.abs(det)} = <b className="text-emerald-300">{area.toFixed(1)} sq units</b> (det &lt; 0 means orientation flipped)</div>
            <svg viewBox="0 0 300 120" className="w-full mt-2">
              <line x1={30} y1={100} x2={280} y2={100} stroke="#334155" />
              <line x1={30} y1={10} x2={30} y2={110} stroke="#334155" />
              {(() => {
                const s = 10;
                const x1 = m2[0][0] * s, y1 = m2[0][1] * s, x2 = m2[1][0] * s, y2 = m2[1][1] * s;
                return (
                  <polygon points={`30,100 ${30 + x1},${100 - y1} ${30 + x2},${100 - y2}`}
                    fill="rgba(52,211,153,0.25)" stroke="#34d399" strokeWidth={2} />
                );
              })()}
            </svg>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setSize(2)} className={`py-2 rounded-xl text-xs font-bold ${size === 2 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                2 x 2
              </button>
              <button onClick={() => setSize(3)} className={`py-2 rounded-xl text-xs font-bold ${size === 3 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                3 x 3
              </button>
            </div>
            <button onClick={randomize} className="w-full py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700">
              Randomize entries (-9..9)
            </button>
            <button onClick={() => { setM3([[1, 2, 3], [2, 4, 6], [1, 1, 1]]); }} className="w-full py-2 rounded-xl text-xs font-bold bg-rose-900/60 hover:bg-rose-800/60 text-rose-200">
              Load a SINGULAR example
            </button>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-emerald-800/60 p-4 text-xs font-mono space-y-1">
            <div className="text-emerald-300 font-bold">Properties to spot</div>
            <div className="text-slate-400">Swap two rows --&gt; det changes sign</div>
            <div className="text-slate-400">A row of zeros --&gt; det = 0</div>
            <div className="text-slate-400">Two equal rows --&gt; det = 0 (try it!)</div>
            <div className="text-slate-400">det(AB) = det(A) det(B)</div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              A determinant is a signed AREA (2x2) or signed VOLUME (3x3) of the box its rows span.
              det = 0 collapses the box flat: rows become dependent, no inverse, and a system Ax = b
              loses its unique solution -- the single number that gatekeeps all of Chapter 4.
            </p>
          </div>

          <div className="bg-emerald-950/40 rounded-2xl border border-emerald-800/50 p-4 text-xs">
            <p className="font-bold text-emerald-300 mb-1">What to try</p>
            <p>1. Randomize until you hit a det of exactly 0 -- inspect the rows. Are two of them proportional?</p>
            <p>2. Build a det of +12 in 2x2 mode, then swap its two rows and confirm the triangle redraws below the x-axis (orientation -12).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_MathematicsDeterminantsSim;

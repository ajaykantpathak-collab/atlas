'use client';

import React, { useState } from 'react';

/**
 * Class 11 Maths -- Permutations and Combinations
 * Exact integer nPr and nCr with a selection visual, plus permutation-of-a-word
 * counts with repeated letters computed from the letter multiplicities.
 * Self-contained: react + tailwind only.
 */

const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
const nCr = (n: number, r: number) => factorial(n) / (factorial(r) * factorial(n - r));
const nPr = (n: number, r: number) => factorial(n) / factorial(n - r);

const WORDS = ['APPLE', 'LEVEL', 'BANANA', 'MISSISSIPPI'];

export function C11_MathematicsPermutationsAndCombinationsSim() {
  const [n, setN] = useState(6);
  const [r, setR] = useState(2);
  const [word, setWord] = useState('APPLE');

  const rClamped = Math.min(r, n);
  const pr = nPr(n, rClamped);
  const cr = nCr(n, rClamped);

  // Word permutations with repetition: n!/ (product of letter factorials)
  const counts: Record<string, number> = {};
  for (const ch of word) counts[ch] = (counts[ch] || 0) + 1;
  const denom = Object.values(counts).reduce((acc, c) => acc * factorial(c), 1);
  const wordPerm = factorial(word.length) / denom;
  const denomTxt = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([ch, c]) => (c > 1 ? `${c}!` : null))
    .filter(Boolean)
    .join(' x ');

  const letters = 'ABCDEFGHIJ'.slice(0, n);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-fuchsia-950/80 rounded-2xl border border-fuchsia-700 font-mono">!</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Class 11 -- Permutations and Combinations</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Choose, Then Arrange: nCr vs nPr</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
          <p className="text-xs text-slate-400 mb-2">
            Select <b className="text-fuchsia-300">{rClamped}</b> of <b className="text-gold-300">{n}</b> letters -- green = chosen (a combination), and each green set can be ordered in <b className="text-amber-300">{pr.toLocaleString()}</b> ways.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {letters.split('').map((ch, i) => (
              <div key={ch}
                className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-lg border-2 transition-all ${i < rClamped ? 'bg-emerald-950 border-emerald-400 text-emerald-300 scale-105' : 'bg-slate-950 border-slate-700 text-slate-500'}`}>
                {ch}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-950 rounded-xl border border-fuchsia-800/60">
              <div className="text-[11px] text-slate-400">Permutations nPr (order matters)</div>
              <div className="font-mono text-xs text-slate-400 mt-1">{n}! / ({n} - {rClamped})! = {n}!/{factorial(n - rClamped)}!</div>
              <div className="font-mono font-black text-2xl text-fuchsia-300 mt-1">{pr.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-emerald-800/60">
              <div className="text-[11px] text-slate-400">Combinations nCr (order ignored)</div>
              <div className="font-mono text-xs text-slate-400 mt-1">{n}! / ({rClamped}! x {n - rClamped}!)</div>
              <div className="font-mono font-black text-2xl text-emerald-300 mt-1">{cr.toLocaleString()}</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            Check: each of the {cr.toLocaleString()} selections has exactly {factorial(rClamped).toLocaleString()} orderings, and {cr.toLocaleString()} x {factorial(rClamped).toLocaleString()} = {pr.toLocaleString()} = nPr.
          </p>

          <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-amber-800/60">
            <div className="text-xs text-amber-300 font-bold mb-1">Permutations of a word with repeats: &quot;{word}&quot;</div>
            <div className="font-mono text-sm text-slate-300">
              {word.length}! / {denomTxt || '1'} = {factorial(word.length).toLocaleString()} / {denom.toLocaleString()} = <b className="text-amber-300 text-lg">{wordPerm.toLocaleString()}</b>
            </div>
            <div className="text-[11px] text-slate-500 mt-1 font-mono">
              letter counts: {Object.entries(counts).map(([ch, c]) => `${ch}x${c}`).join(', ')}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Total items n</span><span className="font-mono font-bold text-gold-400">{n}</span>
              </div>
              <input type="range" min={2} max={10} step={1} value={n} aria-label="Total items n"
                onChange={(e) => { const v = Number(e.target.value); setN(v); if (rClamped > v) setR(v); }}
                className="w-full accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Chosen r</span><span className="font-mono font-bold text-fuchsia-400">{rClamped}</span>
              </div>
              <input type="range" min={0} max={n} step={1} value={rClamped} aria-label="Chosen r"
                onChange={(e) => setR(Number(e.target.value))} className="w-full accent-fuchsia-500" />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { n: 5, r: 2 },
                { n: 8, r: 3 },
                { n: 10, r: 4 },
              ].map((p) => (
                <button key={`${p.n}-${p.r}`} onClick={() => { setN(p.n); setR(p.r); }}
                  className="py-1 rounded-lg text-[11px] font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-300">
                  C({p.n},{p.r})
                </button>
              ))}
              <button onClick={() => { setN(10); setR(10); }}
                className="py-1 rounded-lg text-[11px] font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-300">
                C(10,10)
              </button>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-2">
            <p className="text-[11px] text-slate-400">Try a word (repeated letters!)</p>
            <div className="grid grid-cols-2 gap-1.5">
              {WORDS.map((w) => (
                <button key={w} onClick={() => setWord(w)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold tracking-wider ${word === w ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                  {w}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              A permutation is a combination WITH an order stamped on it, which is why nPr =
              r! x nCr always. Repetition divides: of the 5! = 120 arrangements of APPLE, the double
              P makes pairs of arrangements indistinguishable, so the visible count is 120/2! = 60.
            </p>
          </div>

          <div className="bg-fuchsia-950/40 rounded-2xl border border-fuchsia-800/50 p-4 text-xs">
            <p className="font-bold text-fuchsia-300 mb-1">What to try</p>
            <p>1. Set r = 0 and r = n: both give nPr = nCr = 1. Explain why in words, then find r where nCr is largest for n = 10 (is it at n/2?).</p>
            <p>2. Predict MISSISSIPPI by hand as 11!/(4!4!2!) before clicking it -- does 34650 match your arithmetic?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_MathematicsPermutationsAndCombinationsSim;

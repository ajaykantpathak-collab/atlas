'use client';

import React, { useMemo, useState } from 'react';

type SeqType = 'ap' | 'gp' | 'squares' | 'triangular' | 'fib';

const SEQ_OPTIONS: { id: SeqType; label: string; rule: string }[] = [
  { id: 'ap', label: 'Arithmetic (AP)', rule: 'Tn = a + (n - 1)d' },
  { id: 'gp', label: 'Geometric (GP)', rule: 'Tn = a x r^(n-1)' },
  { id: 'squares', label: 'Square numbers', rule: 'Tn = n^2' },
  { id: 'triangular', label: 'Triangular numbers', rule: 'Tn = n(n+1)/2' },
  { id: 'fib', label: 'Fibonacci', rule: 'Tn = T(n-1) + T(n-2)' },
];

function buildTerms(type: SeqType, a: number, d: number, r: number, n: number): number[] {
  const t: number[] = [];
  if (type === 'ap') for (let i = 0; i < n; i++) t.push(a + i * d);
  else if (type === 'gp') for (let i = 0; i < n; i++) t.push(Math.round(a * Math.pow(r, i) * 100) / 100);
  else if (type === 'squares') for (let i = 1; i <= n; i++) t.push(i * i);
  else if (type === 'triangular') for (let i = 1; i <= n; i++) t.push((i * (i + 1)) / 2);
  else {
    let x = 1, y = 1;
    for (let i = 0; i < n; i++) { t.push(x); const z = x + y; x = y; y = z; }
  }
  return t;
}

// ─── MAIN COMPONENT ───
export function C9_MathematicsPredictingWhatComesNextExploringSim() {
  const [seqType, setSeqType] = useState<SeqType>('ap');
  const [a, setA] = useState(2);
  const [d, setD] = useState(3);
  const [r, setR] = useState(2);
  const [n, setN] = useState(7);
  const [guess, setGuess] = useState('');
  const [verdict, setVerdict] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [score, setScore] = useState({ hits: 0, tries: 0 });

  const terms = useMemo(() => buildTerms(seqType, a, d, r, n), [seqType, a, d, r, n]);
  const hidden = terms[terms.length - 1];
  const shown = terms.slice(0, -1);
  const total = terms.reduce((s, v) => s + v, 0);
  const activeOpt = SEQ_OPTIONS.find((o) => o.id === seqType)!;
  const maxTerm = Math.max(...terms, 1);

  const reseed = (nextType?: SeqType) => {
    setVerdict('idle');
    setGuess('');
    if (nextType) setSeqType(nextType);
  };

  const checkGuess = () => {
    const g = parseFloat(guess);
    if (isNaN(g)) return;
    const ok = Math.abs(g - hidden) < 0.01;
    setVerdict(ok ? 'correct' : 'wrong');
    setScore((s) => ({ hits: s.hits + (ok ? 1 : 0), tries: s.tries + 1 }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">CBSE Class 9 Mathematics - Number Patterns</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Predicting What Comes Next: Sequences and Progressions</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300">
          Score {score.hits}/{score.tries}
        </span>
      </header>

      {/* CONTROLS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 block mb-1">Pattern family</label>
          <select
            value={seqType}
            aria-label="sequence type"
            onChange={(e) => reseed(e.target.value as SeqType)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-sm text-slate-200"
          >
            {SEQ_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>First term a</span>
            <span className="text-gold-300 font-mono font-bold">{a}</span>
          </label>
          <input type="range" min={1} max={10} value={a} aria-label="first term"
            onChange={(e) => { setA(Number(e.target.value)); reseed(); }} className="w-full mt-2 accent-gold-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>{seqType === 'gp' ? 'Ratio r' : 'Difference d'}</span>
            <span className="text-emerald-300 font-mono font-bold">{seqType === 'gp' ? r : d}</span>
          </label>
          {seqType === 'gp' ? (
            <input type="range" min={1} max={4} step={0.5} value={r} aria-label="common ratio"
              onChange={(e) => { setR(Number(e.target.value)); reseed(); }} className="w-full mt-2 accent-emerald-500" />
          ) : (
            <input type="range" min={1} max={10} value={d} aria-label="common difference"
              onChange={(e) => { setD(Number(e.target.value)); reseed(); }} className="w-full mt-2 accent-emerald-500" />
          )}
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Terms shown</span>
            <span className="text-gold-300 font-mono font-bold">{n}</span>
          </label>
          <input type="range" min={5} max={12} value={n} aria-label="number of terms"
            onChange={(e) => { setN(Number(e.target.value)); reseed(); }} className="w-full mt-2 accent-gold-500" />
        </div>
      </div>

      {/* TERM BARS */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3 mb-4">
        <svg viewBox="0 0 560 200" className="w-full h-40 md:h-48">
          <line x1="20" y1="170" x2="550" y2="170" stroke="#334155" strokeWidth="2" />
          {terms.map((t, i) => {
            const isHidden = i === terms.length - 1;
            const h = Math.max(6, (t / maxTerm) * 145);
            const x = 35 + i * (500 / terms.length);
            return (
              <g key={i}>
                <rect x={x} y={170 - h} width="34" height={h} rx="4" fill={isHidden ? '#f59e0b' : '#6366f1'} opacity={isHidden ? 0.9 : 0.85} />
                <text x={x + 17} y={164 - h} fill={isHidden ? '#fbbf24' : '#e2e8f0'} fontSize="11" fontWeight="bold" textAnchor="middle">
                  {isHidden ? '?' : t}
                </text>
                <text x={x + 17} y="186" fill="#64748b" fontSize="10" textAnchor="middle">T{i + 1}</text>
              </g>
            );
          })}
        </svg>
        <p className="text-center font-mono text-xs text-slate-400 mt-1">
          {shown.join(', ')}, <span className="text-amber-300 font-bold">?</span> &nbsp;|&nbsp; Sum of all {n} terms = {total}
        </p>
      </div>

      {/* GUESS PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
          <p className="text-sm font-bold text-white">Predict the missing term T{n}</p>
          <p className="text-xs text-slate-400">Rule card: <span className="font-mono text-amber-300">{activeOpt.rule}</span></p>
          <div className="flex gap-2">
            <input
              type="number"
              value={guess}
              aria-label="your predicted term"
              onChange={(e) => { setGuess(e.target.value); setVerdict('idle'); }}
              placeholder="Your prediction"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-slate-100"
            />
            <button onClick={checkGuess} className="px-4 py-2 rounded-lg bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold">
              Check
            </button>
          </div>
          {verdict !== 'idle' && (
            <p className={`text-sm font-bold ${verdict === 'correct' ? 'text-emerald-300' : 'text-rose-300'}`}>
              {verdict === 'correct' ? `Correct! T${n} = ${hidden}.` : `Not yet - the hidden term is ${hidden}. Adjust the sliders and look again.`}
            </p>
          )}
        </div>
        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
          <p><span className="font-bold text-gold-300">How to think:</span> first check whether consecutive terms differ by a constant amount
          (add d each step) or grow by a constant factor (multiply by r). Squares grow by successive odd numbers, triangular numbers by
          1, 2, 3, ..., and each Fibonacci term is the sum of the two before it.</p>
        </div>
      </div>

      {/* TEACHING TEXT */}
      <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <p>
          <span className="font-bold text-gold-300">Big idea:</span> a sequence is predictable when its terms follow a fixed rule. In an AP a
          constant is added (linear growth); in a GP a constant is multiplied (exponential growth). Spotting which of the two is happening is
          the fastest way to predict any future term.
        </p>
      </div>

      {/* WHAT TO TRY */}
      <footer className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Build the AP 5, 9, 13, ... and predict T12 without opening the bar; verify with the Check button.</p>
        <p className="mt-1">2. Set the GP with a = 1 and r = 2, then explain in one line why its sum overtakes the AP with a = 1, d = 10 by T10.</p>
      </footer>
    </div>
  );
}

export default C9_MathematicsPredictingWhatComesNextExploringSim;

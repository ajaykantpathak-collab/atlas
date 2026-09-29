'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'In a long sum the order of operations decides who goes first: BRACKETS, then OF/ORDER (powers), ' +
  'then DIVISION and MULTIPLICATION (left to right), then ADDITION and SUBTRACTION (left to right). ' +
  'Solve the same sum in the wrong order and you land on a different answer!';

type Step = { text: string; expr: string; highlight: string };

export function C7_MathematicsArithmeticExpressionsSim() {
  const [a, setA] = useState(4);
  const [b, setB] = useState(3);
  const [c, setC] = useState(5);
  const [d, setD] = useState(2);
  const [op1, setOp1] = useState<'+' | '-'>('+');
  const [stepIdx, setStepIdx] = useState(0);
  const [mode, setMode] = useState<'brackets' | 'plain'>('plain');

  // Expression: a [op1] b x c - d   (b x c evaluated first in plain mode)
  const steps: Step[] = useMemo(() => {
    if (mode === 'brackets') {
      const inner = op1 === '+' ? a + b : a - b;
      const prod = b * c;
      return [
        { text: `Brackets first: ${a} ${op1} ${b} = ${inner}`, expr: `[${inner}] x ${c} - ${d}`, highlight: 'bracket' },
        { text: `Now multiply: ${inner} x ${c} = ${inner * prod / b}`, expr: `${inner * prod / b} - ${d}`, highlight: 'mul' },
        { text: `Subtract last: ${inner * prod / b} - ${d} = ${inner * prod / b - d}`, expr: `${inner * prod / b - d}`, highlight: 'sub' },
      ];
    }
    const prod = b * c;
    const after = op1 === '+' ? a + prod : a - prod;
    return [
      { text: `Multiply first: ${b} x ${c} = ${prod}`, expr: `${a} ${op1} [${prod}] - ${d}`, highlight: 'mul' },
      { text: `${op1 === '+' ? 'Add' : 'Subtract'} left to right: ${a} ${op1} ${prod} = ${after}`, expr: `[${after}] - ${d}`, highlight: op1 === '+' ? 'add' : 'sub' },
      { text: `Subtract last: ${after} - ${d} = ${after - d}`, expr: `${after - d}`, highlight: 'sub' },
    ];
  }, [a, b, c, d, op1, mode]);

  const bracketAnswer = (op1 === '+' ? a + b : a - b) * b * c - d;
  const plainAnswer = (op1 === '+' ? a + prodOf(b, c) : a - prodOf(b, c)) - d;
  const done = stepIdx >= steps.length;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">Arithmetic Expressions: Who Goes First?</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Mode switch */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="text-xs text-slate-400">Solving style:</span>
        {([
          { id: 'plain' as const, label: 'Rule order (DMAS)' },
          { id: 'brackets' as const, label: 'Same sum with brackets ( )' },
        ]).map((m) => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); setStepIdx(0); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${mode === m.id ? 'bg-gold-600 border-gold-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Expression strip */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700 text-center font-mono text-2xl">
        {mode === 'brackets' && <span className="text-slate-400">( </span>}
        <span className="text-gold-300">{a}</span>
        <span className="text-white mx-2">{op1}</span>
        <span className="text-emerald-300">{b}</span>
        <span className="text-white mx-2">x</span>
        <span className="text-emerald-300">{c}</span>
        {mode === 'brackets' && <span className="text-slate-400"> )</span>}
        <span className="text-white mx-2">-</span>
        <span className="text-amber-300">{d}</span>
        <span className="text-white mx-2">=</span>
        <span className={`font-black transition-colors ${done ? 'text-emerald-400' : 'text-slate-500'}`}>
          {done ? steps[steps.length - 1].expr : '?'}
        </span>
      </div>

      {/* Step viewer */}
      <div className="mt-4 p-4 bg-slate-800 rounded-2xl border border-slate-600 min-h-[90px]">
        {done ? (
          <div>
            <p className="text-emerald-400 font-bold text-sm">All steps done!</p>
            <p className="text-slate-300 text-sm mt-1">
              Final answer: <span className="font-mono font-bold">{steps[steps.length - 1].expr}</span>
              {mode === 'plain' && (
                <span className="text-pink-300"> -- with brackets the answer was {bracketAnswer}, different from {plainAnswer}!</span>
              )}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-xs text-gold-300 font-semibold uppercase tracking-wide">Step {stepIdx + 1} of {steps.length}</p>
            <p className="text-slate-200 text-sm mt-1">{steps[stepIdx].text}</p>
            <p className="font-mono text-lg mt-2 text-amber-300">{steps[stepIdx].expr}</p>
          </div>
        )}
      </div>

      {/* Stepper controls */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setStepIdx((s) => Math.max(0, s - 1))}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Back
        </button>
        <button
          onClick={() => setStepIdx((s) => Math.min(steps.length, s + 1))}
          disabled={done}
          className="px-5 py-2 rounded-xl text-sm font-bold border bg-gold-600 border-gold-400 hover:bg-gold-500 disabled:opacity-40"
        >
          Do next step
        </button>
        <button
          onClick={() => setStepIdx(0)}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Restart
        </button>
      </div>

      {/* Number controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between"><span>a</span><span className="font-mono font-bold text-gold-300">{a}</span></label>
          <input type="range" aria-label="value a" min={1} max={12} value={a} onChange={(e) => { setA(Number(e.target.value)); setStepIdx(0); }} className="w-full mt-2 accent-gold-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between"><span>b</span><span className="font-mono font-bold text-emerald-300">{b}</span></label>
          <input type="range" aria-label="value b" min={1} max={12} value={b} onChange={(e) => { setB(Number(e.target.value)); setStepIdx(0); }} className="w-full mt-2 accent-emerald-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between"><span>c</span><span className="font-mono font-bold text-emerald-300">{c}</span></label>
          <input type="range" aria-label="value c" min={1} max={12} value={c} onChange={(e) => { setC(Number(e.target.value)); setStepIdx(0); }} className="w-full mt-2 accent-emerald-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between"><span>d</span><span className="font-mono font-bold text-amber-300">{d}</span></label>
          <input type="range" aria-label="value d" min={1} max={12} value={d} onChange={(e) => { setD(Number(e.target.value)); setStepIdx(0); }} className="w-full mt-2 accent-amber-400" />
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        {(['+', '-'] as const).map((o) => (
          <button
            key={o}
            onClick={() => { setOp1(o); setStepIdx(0); }}
            className={`px-5 py-2 rounded-xl text-sm font-bold border transition-colors ${op1 === o ? 'bg-gold-600 border-gold-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
          >
            a {o} b...
          </button>
        ))}
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Solve the plain sum to the end, then switch to the bracket version. Do the two answers match or differ? Try to find numbers where they are EQUAL.</li>
          <li>Predict on paper first: with a=4, b=3, c=5, d=2, what should each step give? Then check with the stepper.</li>
        </ol>
      </div>
    </div>
  );
}

function prodOf(x: number, y: number) {
  return x * y;
}

export default C7_MathematicsArithmeticExpressionsSim;

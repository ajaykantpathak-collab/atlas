'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Decimals add and subtract exactly like whole numbers -- you just must line up the decimal point! ' +
  'Then ones go with ones, tenths with tenths, hundredths with hundredths. When a column overflows, ' +
  'carry one to the left; when a column is too small, borrow one from the left.';

const D = (n: number) => {
  const h = Math.abs(Math.round(n * 100));
  return [Math.floor(h / 100), Math.floor(h / 10) % 10, h % 10] as const;
};

export function C7_MathematicsAnotherPeekBeyondThePointSim() {
  const [numA, setNumA] = useState(2.37);
  const [numB, setNumB] = useState(1.85);
  const [op, setOp] = useState<'add' | 'sub'>('add');
  const [showWork, setShowWork] = useState(true);

  const result = op === 'add' ? Math.round((numA + numB) * 100) / 100 : Math.round((numA - numB) * 100) / 100;
  const a = D(numA);
  const b = D(numB);
  const r = D(Math.abs(result));

  // Column-by-column carries / borrows, right to left (real regrouping logic)
  const { carries, borrows } = useMemo(() => {
    const carries: boolean[] = [false, false];
    const borrows: boolean[] = [false, false];
    if (op === 'add') {
      let carry = 0;
      for (let i = 2; i >= 1; i--) {
        const s = a[i] + b[i] + carry;
        carry = s >= 10 ? 1 : 0;
        carries[i - 1] = carry === 1;
      }
    } else {
      let borrow = 0;
      for (let i = 2; i >= 1; i--) {
        const top = a[i] - borrow;
        borrow = top < b[i] ? 1 : 0;
        borrows[i - 1] = borrow === 1;
      }
    }
    return { carries, borrows };
  }, [numA, numB, op]);

  const cellNoFlag = (digit: number, color: string) => (
    <div className={`w-11 h-11 flex items-center justify-center rounded-xl border text-xl font-black font-mono ${color}`}>
      {digit}
    </div>
  );

  const cell = cellNoFlag;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Another Peek Beyond the Point</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Column working */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700 overflow-x-auto">
        <div className="inline-flex flex-col items-center gap-1 mx-auto font-mono">
          {/* column headers: op | ones | dot | tenths | hundredths */}
          <div className="flex items-end">
            <div className="w-7" />
            <div className="w-11 text-center text-[10px] uppercase text-slate-500">Ones</div>
            <div className="w-4" />
            <div className="w-11 text-center text-[10px] uppercase text-slate-500">Tenths</div>
            <div className="w-11 text-center text-[10px] uppercase text-slate-500">Hundredths</div>
          </div>
          {/* number A */}
          <div className="flex items-end">
            <div className="w-7 flex justify-center">
              {showWork && (op === 'add' ? carries[0] : borrows[0]) ? (
                <span className={`text-[11px] font-bold ${op === 'add' ? 'text-emerald-400' : 'text-pink-400'}`}>{op === 'add' ? '+1' : '-1'}</span>
              ) : null}
            </div>
            {cell(a[0], 'bg-slate-800 border-slate-500 text-sky-200')}
            <div className="w-4" />
            <div className="relative">
              {showWork && (op === 'add' ? carries[1] : borrows[1]) ? (
                <span className={`absolute -top-4 left-1/2 -translate-x-1/2 text-[11px] font-bold ${op === 'add' ? 'text-emerald-400' : 'text-pink-400'}`}>{op === 'add' ? '+1' : '-1'}</span>
              ) : null}
              {cellNoFlag(a[1], 'bg-slate-800 border-slate-500 text-emerald-200')}
            </div>
            {cellNoFlag(a[2], 'bg-slate-800 border-slate-500 text-amber-200')}
          </div>
          {/* number B */}
          <div className="flex items-end border-t-2 border-slate-600 pt-1">
            <div className="w-7 text-center text-xl font-black">{op === 'add' ? '+' : '-'}</div>
            {cellNoFlag(b[0], 'bg-slate-800 border-slate-500 text-sky-200')}
            <div className="w-4 text-center text-2xl font-black text-slate-400 leading-none">.</div>
            {cellNoFlag(b[1], 'bg-slate-800 border-slate-500 text-emerald-200')}
            {cellNoFlag(b[2], 'bg-slate-800 border-slate-500 text-amber-200')}
          </div>
          {/* result */}
          <div className="flex items-end border-t-2 border-indigo-500 pt-1 mt-1">
            <div className="w-7" />
            {cellNoFlag(r[0], 'bg-indigo-800 border-indigo-400 text-white')}
            <div className="w-4 text-center text-2xl font-black text-slate-400 leading-none">.</div>
            {cellNoFlag(r[1], 'bg-indigo-800 border-indigo-400 text-white')}
            {cellNoFlag(r[2], 'bg-indigo-800 border-indigo-400 text-white')}
          </div>
        </div>
        <div className="mt-3 text-center font-mono text-sm">
          <span className="text-sky-300">{numA.toFixed(2)}</span>{' '}
          <span className="text-white font-bold">{op === 'add' ? '+' : '-'}</span>{' '}
          <span className="text-emerald-300">{numB.toFixed(2)}</span>{' '}
          <span className="text-white font-bold">=</span>{' '}
          <span className="text-indigo-300 font-bold">{result.toFixed(2)}</span>
          {op === 'sub' && numA < numB && (
            <span className="text-pink-400"> (the answer dips below zero -- swap the order to stay positive!)</span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>First number</span>
            <span className="font-mono font-bold text-sky-300">{numA.toFixed(2)}</span>
          </label>
          <input type="range" aria-label="first number" min={0} max={9.99} step={0.01} value={numA} onChange={(e) => setNumA(Number(e.target.value))} className="w-full mt-2 accent-sky-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Second number</span>
            <span className="font-mono font-bold text-emerald-300">{numB.toFixed(2)}</span>
          </label>
          <input type="range" aria-label="second number" min={0} max={9.99} step={0.01} value={numB} onChange={(e) => setNumB(Number(e.target.value))} className="w-full mt-2 accent-emerald-400" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {(['add', 'sub'] as const).map((o) => (
          <button
            key={o}
            onClick={() => setOp(o)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${op === o ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
          >
            {o === 'add' ? 'Add (+)' : 'Subtract (-)'}
          </button>
        ))}
        <button
          onClick={() => setShowWork((s) => !s)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${showWork ? 'bg-amber-600 border-amber-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
        >
          {showWork ? 'Hide' : 'Show'} carry / borrow marks
        </button>
        <button
          onClick={() => { setNumA(Math.round(Math.random() * 999) / 100); setNumB(Math.round(Math.random() * 999) / 100); }}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Random pair
        </button>
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Set the sliders so BOTH columns carry at once (green and blue carry marks both appear). What is the smallest first number that can do this?</li>
          <li>Switch to subtract and find a pair where a borrow happens in the tenths column. Check the answer by adding it back -- do you get the first number?</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsAnotherPeekBeyondThePointSim;

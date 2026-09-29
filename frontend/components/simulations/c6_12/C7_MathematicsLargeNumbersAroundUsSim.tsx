'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Big numbers are built from place values: ones, tens, hundreds, then THOUSANDS, LAKHS, CRORES... ' +
  'Each new place is 10 times the one before. In the Indian system we group 3 digits, then 2, then 2: ' +
  '9,87,65,432 is read as ninety-eight crore seventy-six lakh five thousand four hundred thirty-two.';

const PLACES = [
  { name: 'Ones', mult: 1 },
  { name: 'Tens', mult: 10 },
  { name: 'Hundreds', mult: 100 },
  { name: 'Thousands', mult: 1000 },
  { name: 'Ten Thousands', mult: 10000 },
  { name: 'Lakhs', mult: 100000 },
  { name: 'Ten Lakhs', mult: 1000000 },
  { name: 'Crores', mult: 10000000 },
];

const IN_WORDS = (n: number): string => {
  const a = Math.floor(n / 10000000);
  const b = Math.floor((n % 10000000) / 100000);
  const c = Math.floor((n % 100000) / 1000);
  const d = n % 1000;
  const parts: string[] = [];
  if (a) parts.push(`${a} crore`);
  if (b) parts.push(`${b} lakh`);
  if (c) parts.push(`${c} thousand`);
  if (d) parts.push(`${d}`);
  return parts.join(' ') || '0';
};

const indianCommas = (n: number) => {
  const s = String(n);
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  const groups: string[] = [];
  while (rest.length > 2) {
    groups.unshift(rest.slice(-2));
    rest = rest.slice(0, -2);
  }
  if (rest) groups.unshift(rest);
  return `${groups.join(',')},${last3}`;
};

export function C7_MathematicsLargeNumbersAroundUsSim() {
  const [digits, setDigits] = useState<number[]>([9, 8, 7, 6, 5, 4, 3, 2]);
  const [x10count, setX10count] = useState(0);

  const number = useMemo(() => digits.reduce((acc, d, i) => acc + d * PLACES[i].mult, 0), [digits]);
  const shifted = number * Math.pow(10, x10count);

  const setDigit = (i: number, v: number) =>
    setDigits((ds) => ds.map((d, j) => (j === i ? v : d)));

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">Large Numbers Around Us</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Number display */}
      <div className="mt-4 p-5 bg-slate-950 rounded-2xl border border-slate-700 text-center">
        <div className="font-mono text-3xl md:text-4xl font-black text-emerald-400 tracking-wide">
          {indianCommas(shifted)}
        </div>
        <div className="text-sm text-slate-300 mt-2">{IN_WORDS(shifted)}</div>
        {x10count > 0 && (
          <div className="text-xs text-amber-300 mt-1">
            = original number x 10<sup>{x10count}</sup> -- every x10 slides all digits ONE place left!
          </div>
        )}
      </div>

      {/* Place value digit steppers */}
      <div className="mt-4 p-4 bg-slate-800 rounded-2xl border border-slate-600">
        <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">Build your number, place by place</div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {PLACES.map((p, i) => (
            <div key={p.name} className="bg-slate-950 rounded-xl p-2 text-center border border-slate-700">
              <div className="text-[9px] text-slate-400 leading-tight h-6 flex items-center justify-center">{p.name}</div>
              <div className="font-mono text-2xl font-black text-gold-300">{digits[i]}</div>
              <div className="flex justify-center gap-1 mt-1">
                <button
                  aria-label={`decrease ${p.name}`}
                  onClick={() => setDigit(i, (digits[i] + 9) % 10)}
                  className="w-6 h-5 rounded bg-slate-700 hover:bg-slate-600 text-xs"
                >
                  -
                </button>
                <button
                  aria-label={`increase ${p.name}`}
                  onClick={() => setDigit(i, (digits[i] + 1) % 10)}
                  className="w-6 h-5 rounded bg-slate-700 hover:bg-slate-600 text-xs"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* x10 machine */}
      <div className="mt-4 p-4 bg-slate-800 rounded-2xl border border-slate-600 flex flex-wrap items-center gap-3">
        <span className="text-xs text-slate-300">x10 machine:</span>
        <button
          onClick={() => setX10count((k) => Math.min(6, k + 1))}
          className="px-4 py-2 rounded-xl text-sm font-bold border bg-gold-600 border-gold-400 hover:bg-gold-500"
        >
          Multiply by 10
        </button>
        <button
          onClick={() => setX10count(0)}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Undo all
        </button>
        <span className="font-mono text-xs text-slate-400">
          pressed {x10count} time(s) -- value is now 10<sup>{x10count}</sup> times bigger
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setDigits([1, 0, 0, 0, 0, 0, 0, 0])}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Make 1 crore
        </button>
        <button
          onClick={() => setDigits(Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)))}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Random big number
        </button>
        <button
          onClick={() => setDigits([9, 9, 9, 9, 9, 9, 9, 9])}
          className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700"
        >
          Make the biggest 8-digit number
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Press the x10 machine starting from 999. What happens to the display the FIRST time? Where did the new digit come from?</li>
          <li>Make the largest number with digits in DECREASING order and then the smallest with INCREASING order (no leading zero). How far apart are they?</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_MathematicsLargeNumbersAroundUsSim;

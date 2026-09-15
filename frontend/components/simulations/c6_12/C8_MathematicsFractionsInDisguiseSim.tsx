'use client';
/**
 * C8_MathematicsFractionsInDisguiseSim (Class 8 Maths)
 *
 * ELI5: Every fraction is a decimal in disguise! Feed a fraction into the
 * long-division machine: if the remainders run out, the decimal TERMINATES
 * (like 3/8 = 0.375). If a remainder repeats forever, the digits repeat
 * (like 1/7 = 0.142857...). The secret is hidden in the denominator's
 * prime factors: only 2s and 5s allow a terminating decimal.
 */
import React, { useMemo, useState } from 'react';

function longDivision(num: number, den: number) {
  // returns { intPart, digits: string, repetendStart: number | null }
  let r = num % den;
  const digits: number[] = [];
  const seen = new Map<number, number>();
  let repetendStart: number | null = null;
  while (r !== 0 && repetendStart === null && digits.length < 24) {
    if (seen.has(r)) {
      repetendStart = seen.get(r)!;
      break;
    }
    seen.set(r, digits.length);
    r *= 10;
    digits.push(Math.floor(r / den));
    r = r % den;
  }
  return { intPart: Math.floor(num / den), digits, repetendStart };
}

function primeFac(d: number): number[] {
  const out: number[] = [];
  let n = d;
  for (let p = 2; p * p <= n; p++) while (n % p === 0) { out.push(p); n /= p; }
  if (n > 1) out.push(n);
  return out;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function C8_MathematicsFractionsInDisguiseSim() {
  const [num, setNum] = useState(3);
  const [den, setDen] = useState(8);
  const [zoom, setZoom] = useState(0);

  const g = gcd(num, den);
  const rNum = num / g;
  const rDen = den / g;
  const res = useMemo(() => longDivision(num, den), [num, den]);
  const primes = useMemo(() => primeFac(rDen), [rDen]);
  const terminates = primes.every((p) => p === 2 || p === 5);

  const digitStr = res.digits.join('');
  const shown = zoom === 0 ? digitStr.slice(0, 12) : digitStr.slice(zoom - 1, zoom - 1 + 12);
  const repetendColor = (i: number) => {
    const absIdx = zoom === 0 ? i : zoom - 1 + i;
    if (res.repetendStart !== null && absIdx >= res.repetendStart) return 'text-rose-600';
    return 'text-slate-700';
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-indigo-700">Fractions in Disguise: The Division Machine</h1>

      <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-indigo-700">Disguise decoder:</span> divide numerator by
          denominator. The decimal TERMINATES exactly when the reduced denominator has no prime
          factors except 2s and 5s (they fit our base-10 place value!). Any other prime leaves a
          remainder that cycles forever - a RECURRING decimal.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Numerator</span><span className="font-mono text-indigo-600">{num}</span></label>
            <input type="range" min={1} max={20} value={num} aria-label="numerator" onChange={(e) => setNum(Number(e.target.value))} className="w-full mt-1 accent-indigo-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Denominator</span><span className="font-mono text-emerald-600">{den}</span></label>
            <input type="range" min={2} max={24} value={den} aria-label="denominator" onChange={(e) => setDen(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Scroll digits</span><span className="font-mono text-amber-600">{zoom}</span></label>
            <input type="range" min={0} max={12} value={zoom} aria-label="scroll digits" onChange={(e) => setZoom(Number(e.target.value))} className="w-full mt-1 accent-amber-600" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[['1/2', 1, 2], ['3/8', 3, 8], ['1/3', 1, 3], ['1/7', 1, 7], ['5/12', 5, 12]].map(([label, a, b]) => (
              <button key={label as string} onClick={() => { setNum(a as number); setDen(b as number); setZoom(0); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-all">
                {label as string}
              </button>
            ))}
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-sm">
            <div className="font-mono">
              {num}/{den} = {rNum}/{rDen} <span className="text-slate-400">(divided by HCF {g})</span>
            </div>
            <div className="font-mono mt-1">
              denominator {rDen} = {primes.join(' x ')} {terminates ? '- only 2s and 5s!' : '- hides another prime!'}
            </div>
            <div className={`mt-1 font-bold ${terminates ? 'text-emerald-600' : 'text-rose-600'}`}>
              {terminates ? `Terminating decimal: ${res.intPart}.${digitStr}` : `Recurring decimal: repeats after ${res.digits.length - (res.repetendStart ?? 0)} digits`}
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-slate-200">
          <p className="text-xs font-bold text-slate-500 mb-2">LONG DIVISION - REMAINDER TRACKER</p>
          <svg viewBox="0 0 340 150" className="w-full">
            <text x={10} y={30} fontSize="18" fontFamily="monospace" fill="#1e293b">
              {res.intPart}.
            </text>
            {shown.split('').map((d, i) => {
              const absIdx = zoom === 0 ? i : zoom - 1 + i;
              const inRep = res.repetendStart !== null && absIdx >= res.repetendStart;
              const barTop = inRep ? 42 : 46;
              return (
                <g key={i}>
                  <text x={44 + i * 24} y={30} fontSize="18" fontFamily="monospace" className={repetendColor(i)} fontWeight={inRep ? 'bold' : 'normal'}>
                    {d}
                  </text>
                  <rect x={40 + i * 24} y={barTop} width={20} height={4} fill={inRep ? '#e11d48' : '#94a3b8'} style={{ transition: 'all 300ms' }} />
                </g>
              );
            })}
            {res.repetendStart !== null && zoom === 0 && (
              <>
                <rect x={40 + res.repetendStart * 24} y={36} width={Math.min(12, res.digits.length - res.repetendStart) * 24} height={14} fill="none" stroke="#e11d48" rx={4} />
                <text x={44 + res.repetendStart * 24} y={68} fontSize="10" fill="#e11d48">repeating block (bar)</text>
              </>
            )}
            <text x={10} y={110} fontSize="11" fill="#475569">
              {terminates
                ? 'Remainders hit 0 - the decimal stops cleanly.'
                : res.repetendStart !== null
                  ? `Remainder ${res.digits.length >= 24 ? '(pattern)' : ''} came back - digits cycle forever.`
                  : 'Remainders still going...'}
            </text>
            <text x={10} y={130} fontSize="10" fill="#64748b">red bars mark digits inside the repeating block</text>
          </svg>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Find the fraction with denominator 12 whose decimal terminates (hint: reduce it first). Which prime vanished?</li>
          <li>Set 1/7 and scroll the digits: write down the repeating block. Predict digit number 15 before you scroll to it.</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsFractionsInDisguiseSim;

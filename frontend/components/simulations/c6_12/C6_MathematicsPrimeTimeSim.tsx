/**
 * C6 Mathematics -- Prime Time (Ganita Prakash)
 *
 * One chapter concept: prime numbers have exactly two factors; every
 * number breaks into a unique chain of prime factors.
 *
 * Interaction model: click any number on the 1-100 board (or step with
 * +/-), then toggle prime highlights, multiples of your number, and the
 * factor-pair map to discover patterns like Eratosthenes' sieve.
 */
import React, { useState } from 'react';

function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) return false;
  }
  return true;
}

function primeFactors(n: number): number[] {
  const out: number[] = [];
  let x = n;
  for (let d = 2; d * d <= x; d++) {
    while (x % d === 0) {
      out.push(d);
      x = x / d;
    }
  }
  if (x > 1) out.push(x);
  return out;
}

function factorPairs(n: number): [number, number][] {
  const pairs: [number, number][] = [];
  for (let d = 1; d <= n; d++) {
    if (n % d === 0) pairs.push([d, n / d]);
  }
  return pairs;
}

function C6_MathematicsPrimeTimeSim() {
  const [selected, setSelected] = useState(12);
  const [showPrimes, setShowPrimes] = useState(true);
  const [showMultiples, setShowMultiples] = useState(false);
  const [showPairs, setShowPairs] = useState(false);

  const primes = primeFactors(selected);
  const pairs = factorPairs(selected);

  const cellStyle = (n: number): string => {
    if (n === selected) return 'bg-indigo-600 text-white scale-110 shadow-lg ring-2 ring-indigo-300';
    if (showPrimes && isPrime(n)) return 'bg-amber-300 text-amber-900 font-black';
    if (showMultiples && n % selected === 0 && n >= selected) return 'bg-sky-300 text-sky-900 font-bold';
    return 'bg-white text-slate-600 hover:bg-slate-100';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-indigo-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-indigo-700">Prime Time -- the Number Detective Board</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        A <b>prime number</b> can be made by multiplying only 1 and itself -- like 2, 3, 5, 7, 11.
        A <b>composite number</b> has more factors, and every one of them secretly hides a chain of
        prime numbers inside. Click a number to catch its factors!
      </p>

      <div className="grid md:grid-cols-[1fr_260px] gap-4 mt-4">
        <div className="grid grid-cols-10 gap-1 p-2 rounded-2xl bg-indigo-50 border-2 border-indigo-100">
          {Array.from({ length: 100 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setSelected(n)}
              className={
                'aspect-square rounded-lg text-xs transition-all duration-200 ' + cellStyle(n) + (isPrime(n) ? ' ' : ' ')
              }
            >
              {n}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-indigo-600 text-white text-center">
            <div className="text-xs uppercase tracking-widest opacity-80">Selected number</div>
            <div className="text-4xl font-black">{selected}</div>
            <div className="text-xs mt-1">
              {selected < 2 ? 'Neither prime nor composite' : isPrime(selected) ? 'PRIME -- only 1 and ' + selected + ' make it' : 'Composite -- it has more factors'}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button onClick={() => setSelected(Math.max(1, selected - 1))} className="px-3 py-1.5 rounded-xl bg-indigo-100 text-indigo-700 font-black hover:bg-indigo-200 transition-colors">
              &lt; prev
            </button>
            <button onClick={() => setSelected(Math.min(100, selected + 1))} className="px-3 py-1.5 rounded-xl bg-indigo-100 text-indigo-700 font-black hover:bg-indigo-200 transition-colors">
              next &gt;
            </button>
          </div>

          {[
            { on: showPrimes, set: setShowPrimes, label: 'Light up all primes' },
            { on: showMultiples, set: setShowMultiples, label: 'Show multiples of ' + selected },
            { on: showPairs, set: setShowPairs, label: 'Show factor pairs' },
          ].map((t) => (
            <button
              key={t.label}
              onClick={() => t.set(!t.on)}
              className={
                'w-full px-3 py-2 rounded-xl text-xs font-bold text-left transition-all duration-200 ' +
                (t.on ? 'bg-amber-100 text-amber-800 border-2 border-amber-300' : 'bg-slate-100 text-slate-400 border-2 border-slate-200')
              }
            >
              {t.on ? '[ON] ' : '[OFF] '}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Prime factor chain</div>
          <div className="text-lg font-black text-emerald-800">
            {selected} = {primes.length ? primes.join(' x ') : '1 (nothing to break!)'}
          </div>
          {primes.length > 0 && <div className="text-xs text-emerald-600">Every number has ONE unique prime chain -- this is why primes are the "atoms" of numbers.</div>}
        </div>
        {showPairs && (
          <div className="p-3 rounded-2xl bg-sky-50 border-2 border-sky-200">
            <div className="text-xs font-bold text-sky-700 uppercase tracking-wide">Factor pairs</div>
            <div className="text-sm font-bold text-sky-800">{pairs.map((p) => p[0] + ' x ' + p[1]).join(',  ')}</div>
            <div className="text-xs text-sky-600">{pairs.length} pairs -- an odd count means a square number!</div>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-amber-50 border-2 border-amber-200">
        <div className="text-sm font-black text-amber-800">What to try</div>
        <ol className="text-xs text-amber-700 list-decimal list-inside mt-1 space-y-1">
          <li>Turn on "Light up all primes", then find the ONLY even prime on the board. Why can no other even number be prime?</li>
          <li>Pick 30 and turn on multiples. How many multiples light up? Compare with prime 29 -- how many?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_MathematicsPrimeTimeSim };
export default C6_MathematicsPrimeTimeSim;

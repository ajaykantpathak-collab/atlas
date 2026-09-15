'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Class 10 Maths -- Real Numbers
 * Euclid's Division Lemma (HCF ladder) plus the Fundamental Theorem of
 * Arithmetic (prime factorisation) and the HCF x LCM = product identity.
 * Self-contained: react + tailwind only.
 */

function primeFactorise(n: number): { p: number; e: number }[] {
  const out: { p: number; e: number }[] = [];
  let x = n;
  for (let p = 2; p * p <= x; p++) {
    let e = 0;
    while (x % p === 0) {
      x /= p;
      e++;
    }
    if (e > 0) out.push({ p, e });
  }
  if (x > 1) out.push({ p: x, e: 1 });
  return out;
}

function formatFactors(f: { p: number; e: number }[]): string {
  return f.map((x) => (x.e === 1 ? `${x.p}` : `${x.p}^${x.e}`)).join(' x ') || '1';
}

// ─── Class 10 board-depth drill bank ───
// Each item targets one uncovered board diagnostic for this chapter's nodes
// (see backend/its/competency/CLASS10_NODE_DEPTH.json). Static and deterministic.
interface DepthQuizItem {
  nodeId: string;
  q: string;
  options: string[];
  answer: number;
  why: string;
}

const DEPTH_QUIZ: DepthQuizItem[] = [
  {
    nodeId: 'c10_math_cbse_01_001',
    q: 'The Fundamental Theorem of Arithmetic states that...',
    options: [
      'every composite number can be factorised as a product of primes, and this factorisation is unique apart from the order of factors',
      'every number has infinitely many prime factorisations',
      'the HCF of two primes is always their product',
      'every even number is the sum of two primes',
    ],
    answer: 0,
    why: 'FTA: every composite number > 1 factors into primes, and the factorisation is UNIQUE except for order (e.g. 2310 = 2 x 3 x 5 x 7 x 11, one way only).',
  },
  {
    nodeId: 'c10_math_cbse_01_001',
    q: 'Write 2310 as a product of primes in exponential form.',
    options: ['2 x 3 x 5 x 7 x 11 (all exponents 1)', '2^2 x 3 x 5 x 7', '3^2 x 5 x 7 x 11', '2 x 5^2 x 7 x 11'],
    answer: 0,
    why: '2310 = 2 x 1155 = 2 x 3 x 385 = 2 x 3 x 5 x 77 = 2 x 3 x 5 x 7 x 11. Five distinct primes, each to the first power -- a "5-distinct-prime" composite between 100 and 2000.',
  },
  {
    nodeId: 'c10_math_cbse_01_002',
    q: 'When 144 and 192 are prime-factorised (144 = 2^4 x 3^2, 192 = 2^6 x 3), why does HCF take the SMALLEST exponent of each common prime while LCM takes the LARGEST?',
    options: [
      'HCF must divide both numbers (so it cannot contain more of a prime than either has); LCM must be divisible by both (so it needs at least what each has)',
      'It is a convention with no mathematical reason',
      'Smallest exponents keep the LCM small and the HCF large',
      'Because 144 and 192 are co-prime',
    ],
    answer: 0,
    why: 'HCF = 2^min(4,6) x 3^min(2,1) = 2^4 x 3 = 48 divides both. LCM = 2^max(4,6) x 3^max(2,1) = 2^6 x 3^2 = 576 is a multiple of both. Min = biggest common container; max = smallest common container.',
  },
  {
    nodeId: 'c10_math_cbse_01_003',
    q: 'The HCF of two numbers is 15 and their product is 6300. Their LCM is...',
    options: ['420', '4200', '94.5', '6300'],
    answer: 0,
    why: 'HCF x LCM = product of the numbers, so LCM = 6300 / 15 = 420. (It must also come out a whole number multiple of the HCF: 420 / 15 = 28, consistent.)',
  },
  {
    nodeId: 'c10_math_cbse_01_003',
    q: 'A student writes: HCF = 8, LCM = 120, one number = 24, so other = (8 x 120)/24 = 40. What single check confirms this answer is consistent?',
    options: [
      'Check that the other number (40) is a multiple of the HCF 8 -- it is',
      'Check that 24 + 40 = 64 is even',
      'Check that LCM 120 is smaller than the product',
      'No check is possible with only HCF and LCM',
    ],
    answer: 0,
    why: 'Both numbers must be multiples of their HCF, and the LCM must be a multiple of both numbers. 40 is a multiple of 8 and 120 is a multiple of 40 -- consistent. (Note: the identity HCF x LCM = a x b is only valid for TWO numbers.)',
  },
  {
    nodeId: 'c10_math_cbse_01_004',
    q: 'Why can 12^n never end with the digit 0 for any natural number n?',
    options: [
      '12^n = 2^n x 3^n has no prime factor 5, but a number ending in 0 needs both 2 and 5 in its factorisation',
      'Because 12 is even, its powers end in 2, 4, 8, 6 cyclically',
      'Because 12^n is always odd',
      'Because 12 has no factor 3',
    ],
    answer: 0,
    why: 'By uniqueness of prime factorisation, 12^n = (2^2 x 3)^n = 2^(2n) x 3^n never contains the prime 5. A number ending in 0 is divisible by 10 = 2 x 5, which would force a 5 into the factorisation -- impossible.',
  },
  {
    nodeId: 'c10_math_cbse_01_004',
    q: 'The proofs of "6^n cannot end with 0" and "15^n cannot end with 2" share what structure?',
    options: [
      'Both compare the primes present in a^n with the primes that the required last digit forces (10 needs 2 and 5; ending in 2 needs factor 2), and find a missing prime',
      'Both use long division until the remainder repeats',
      'Both check n = 1, 2, 3 and generalise by pattern',
      'Both require proving the number is prime first',
    ],
    answer: 0,
    why: 'Ending digit d forces divisibility by a fixed small number (0 -> divisible by 10 = 2 x 5; 2 -> even). Then compare forced primes with the primes of a^n via FTA: 6^n lacks 5; 15^n = 3^n x 5^n lacks 2. Same contradiction shape.',
  },
  {
    nodeId: 'c10_math_cbse_01_005',
    q: 'State the prime-divisibility theorem used everywhere in this chapter.',
    options: [
      'If a prime p divides a^2, then p divides a (equivalently: if p divides a^2, p divides a; the converse -- p divides a implies p divides a^2 -- is trivially true)',
      'If p divides a^2 then p divides a, and the same holds for any composite p',
      'A prime can never divide a perfect square',
      'If p divides a + b then p divides a and p divides b',
    ],
    answer: 0,
    why: 'If p | a^2, unique factorisation of a^2 shows p appears among the primes of a, so p | a. The converse (p | a => p | a^2) is obvious by multiplying. For composite p the forward step FAILS: 9 | 15^2 = 225 but 9 does not divide 15.',
  },
  {
    nodeId: 'c10_math_cbse_01_005',
    q: 'A student claims: "9 divides 15^2 = 225, so by the theorem 9 must divide 15." Where is the error?',
    options: [
      'The theorem needs p PRIME; 9 = 3^2 is composite, so the deduction is invalid (although 3 divides 15)',
      'The theorem only works for p = 2',
      '225 is not actually divisible by 9',
      'The student is completely correct',
    ],
    answer: 0,
    why: 'Composite divisors of a square need not divide the base: 9 | 225 but 9 x (does not divide) 15. Primality is essential because unique prime factorisation is what forces the prime into the base.',
  },
  {
    nodeId: 'c10_math_cbse_01_006',
    q: 'In the proof that the square root of 2 is irrational, what exactly do we ASSUME to start the contradiction?',
    options: [
      'The square root of 2 is rational, i.e. it equals a/b with a, b co-prime integers, b not 0',
      'The square root of 2 is irrational',
      'All integers are even',
      '2 is a prime number',
    ],
    answer: 0,
    why: 'Proof by contradiction assumes the NEGATIVE of what we want: the square root of 2 is rational with a, b co-prime (fraction in lowest terms). The contradiction at the end (both even) destroys the co-prime assumption.',
  },
  {
    nodeId: 'c10_math_cbse_01_006',
    q: 'After deducing a^2 = 2b^2 the proof says "a is even". Which fact justifies that step?',
    options: [
      'The theorem: if a prime p divides a^2 then p divides a (here p = 2 divides a^2, so 2 divides a)',
      'Every square is even',
      'b must be even',
      'Squares of odd numbers are even',
    ],
    answer: 0,
    why: '2 | a^2 and 2 is prime, so by the prime-divisibility theorem 2 | a; write a = 2k. The same machinery then gives 2 | b, contradicting co-primality -- so the square root of 2 is not a/b.',
  },
  {
    nodeId: 'c10_math_cbse_01_007',
    q: 'Which theorem is essential to prove that the square root of 3 is irrational?',
    options: [
      'If a prime p divides a^2 then p divides a -- applied with p = 3',
      'The Fundamental Theorem of Arithmetic alone, with no prime-divisibility step',
      'Pythagoras theorem',
      'Euclid\'s division lemma',
    ],
    answer: 0,
    why: 'Assume the square root of 3 = a/b co-prime. Then a^2 = 3b^2, so 3 | a^2; since 3 is prime, 3 | a, write a = 3c. Then 3b^2 = 9c^2 gives b^2 = 3c^2, so 3 | b too -- both divisible by 3, contradicting co-primality.',
  },
  {
    nodeId: 'c10_math_cbse_01_008',
    q: 'Prove-style: 5 minus the square root of 3 is irrational because...',
    options: [
      'if it were rational r, then the square root of 3 = 5 - r would be rational (rationals are closed under subtraction), contradicting its known irrationality',
      '5 is irrational',
      'the square root of 3 is rational',
      'subtraction always produces irrationals',
    ],
    answer: 0,
    why: 'Rationals are closed under subtraction: if 5 - the square root of 3 = r (rational), then the square root of 3 = 5 - r is rational -- contradiction. The same closure argument shows 5 + the square root of 3 and the square root of 3 - 5 are irrational (note the square root of 3 - 5 = -(5 - the square root of 3), irrational up to sign).',
  },
  {
    nodeId: 'c10_math_cbse_01_009',
    q: 'Show 3 x (square root of 2) is irrational. The key theorem is:',
    options: [
      'the product of a NON-ZERO rational number and an irrational number is always irrational',
      'the product of two irrationals is always irrational',
      'the sum of two rationals can be irrational',
      '3 is irrational',
    ],
    answer: 0,
    why: 'If 3 x the square root of 2 = p/q (rational), then the square root of 2 = p/(3q) is a ratio of integers with 3q not 0 -- rational, contradiction. The non-zero condition matters: 0 x irrational = 0 is rational.',
  },
  {
    nodeId: 'c10_math_cbse_01_010',
    q: 'For HCF of THREE numbers by prime factorisation, a prime factor that appears in only one or two of the numbers is...',
    options: [
      'excluded from the HCF (take only primes common to ALL three, with the smallest exponent); for LCM take every prime that appears in ANY of them with the largest exponent',
      'included in the HCF with its largest exponent',
      'included in both HCF and LCM',
      'ignored for the LCM as well',
    ],
    answer: 0,
    why: 'For 18, 24, 36: HCF = 2^1 x 3^1 = 6 (primes common to all, min powers). LCM = 2^3 x 3^2 = 72 (every prime occurring anywhere, max powers). A prime missing from one number cannot divide the common divisor.',
  },
  {
    nodeId: 'c10_math_cbse_01_011',
    q: 'Without long division: the decimal expansion of p/q (lowest terms) terminates exactly when...',
    options: [
      'the denominator q is of the form 2^m x 5^n (m, n non-negative integers)',
      'q is prime',
      'q is odd',
      'p is even',
    ],
    answer: 0,
    why: '7/20: 20 = 2^2 x 5 -- terminates (0.35). 7/30: 30 = 2 x 3 x 5 has the prime 3 -- non-terminating recurring. And 14587/1250 terminates since 1250 = 2 x 5^4 (5 decimal places after scaling).',
  },
  {
    nodeId: 'c10_math_cbse_01_012',
    q: 'In a gift-pack problem -- "greatest number of identical packs from 48 pens and 72 erasers with nothing left over" -- why HCF and not LCM?',
    options: [
      'Each pack must divide BOTH totals exactly (a common divisor), and we want the biggest such pack -- the HCF',
      'The packs must be a multiple of both totals',
      'LCM gives the number of packs, not the pack size',
      'HCF is always easier to compute',
    ],
    answer: 0,
    why: 'HCF = 24 packs of 2 pens + 3 erasers. Flip side: "traffic lights blink together after how long?" needs the LCM (48, 72, 108 -> 432 s) because the meet-again time is a common MULTIPLE. Divisor -> HCF, multiple -> LCM.',
  },
  {
    nodeId: 'c10_math_cbse_01_012',
    q: 'Greatest 4-digit number exactly divisible by 12, 18 and 24. A student picks LCM = 72 and answers 9999. The fix is:',
    options: [
      'take the largest 4-digit MULTIPLE of 72: 9999 divided by 72 leaves remainder 63, so answer = 9999 - 63 = 9936',
      'the answer is simply 9999',
      'take HCF of the three numbers',
      'multiply LCM by 10',
    ],
    answer: 0,
    why: 'LCM gives the STEP; the answer is the biggest number <= 9999 lying on that step: 72 x 138 = 9936. Subtracting the remainder of 9999 divided by the LCM is the standard finish.',
  },
];

function DepthDrill() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState({ right: 0, done: 0 });
  const item = DEPTH_QUIZ[idx];
  const answered = picked !== null;

  const pick = (i: number) => {
    if (answered) return;
    setPicked(i);
    setScore((s) => ({ right: s.right + (i === item.answer ? 1 : 0), done: s.done + 1 }));
  };

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-amber-800/60 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Board-depth drill</p>
        <span className="text-[11px] font-mono text-slate-400">
          {idx + 1}/{DEPTH_QUIZ.length} -- {score.right}/{score.done} correct
        </span>
      </div>
      <p className="text-sm text-slate-200 leading-relaxed">{item.q}</p>
      <div className="space-y-1.5">
        {item.options.map((opt, i) => {
          const state = !answered
            ? 'bg-slate-800 hover:bg-slate-700 border-slate-700'
            : i === item.answer
              ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100'
              : i === picked
                ? 'bg-rose-900/60 border-rose-600 text-rose-100'
                : 'bg-slate-800/40 border-slate-800 opacity-60';
          return (
            <button key={i} onClick={() => pick(i)} disabled={answered}
              className={`w-full text-left px-3 py-2 rounded-xl border text-xs leading-snug transition ${state}`}>
              <span className="font-bold mr-1.5">{'ABCD'[i]}.</span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="text-xs leading-relaxed text-amber-200 bg-amber-950/40 border border-amber-800/50 rounded-xl px-3 py-2">
          <span className="font-bold">Misconception killed: </span>
          {item.why}
        </div>
      )}
      <div className="flex gap-2">
        <button onClick={() => { setIdx((i) => (i + 1) % DEPTH_QUIZ.length); setPicked(null); }}
          className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 transition">
          Next question
        </button>
        <button onClick={() => { setIdx(0); setPicked(null); setScore({ right: 0, done: 0 }); }}
          className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-rose-900 transition">
          Reset
        </button>
      </div>
    </div>
  );
}

export function C10_MathematicsRealNumbersSim() {
  const [a, setA] = useState(4052);
  const [b, setB] = useState(12576);
  const [stepsShown, setStepsShown] = useState(0);
  const [autoRun, setAutoRun] = useState(false);

  const ladder = useMemo(() => {
    const steps: { dividend: number; divisor: number; q: number; r: number }[] = [];
    let x = Math.max(a, b);
    let y = Math.min(a, b);
    while (y > 0) {
      const q = Math.floor(x / y);
      const r = x % y;
      steps.push({ dividend: x, divisor: y, q, r });
      x = y;
      y = r;
    }
    return steps;
  }, [a, b]);

  const hcf = ladder.length ? ladder[ladder.length - 1].divisor : a;
  const lcm = a && b ? Math.round((a * b) / hcf) : 0;
  const fA = useMemo(() => primeFactorise(a), [a]);
  const fB = useMemo(() => primeFactorise(b), [b]);
  const visible = Math.min(stepsShown, ladder.length);

  const step = useCallback(() => {
    setStepsShown((s) => Math.min(s + 1, ladder.length));
  }, [ladder.length]);

  const runAll = () => {
    setStepsShown(ladder.length);
    setAutoRun(false);
  };

  // Auto-step: reveal one division every 700 ms while enabled
  useEffect(() => {
    if (!autoRun) return;
    if (stepsShown >= ladder.length) {
      setAutoRun(false);
      return;
    }
    const t = setTimeout(() => setStepsShown((s) => s + 1), 700);
    return () => clearTimeout(t);
  }, [autoRun, stepsShown, ladder.length]);

  const stepper = (label: string, val: number, set: (v: number) => void, color: string) => (
    <div>
      <div className="flex justify-between text-[11px] text-slate-400">
        <span>{label}</span>
        <span className={`font-mono font-bold ${color}`}>{val}</span>
      </div>
      <div className="flex gap-1 mt-1">
        <button onClick={() => set(Math.max(1, val - 10))} className="flex-1 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold">-10</button>
        <button onClick={() => set(Math.max(1, val - 1))} className="flex-1 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold">-1</button>
        <input
          type="number"
          min={1}
          max={99999}
          value={val}
          aria-label={label}
          onChange={(e) => set(Math.max(1, Math.min(99999, Math.floor(Number(e.target.value) || 1))))}
          className={`flex-[2] bg-slate-950 border border-slate-700 rounded-lg px-2 text-center text-xs font-mono ${color}`}
        />
        <button onClick={() => set(val + 1)} className="flex-1 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold">+1</button>
        <button onClick={() => set(val + 10)} className="flex-1 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold">+10</button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-violet-950/80 rounded-2xl border border-violet-700">🔗</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400">Class 10 -- Real Numbers</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Euclid&apos;s Ladder and Prime Factories</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Euclid&apos;s Division Lemma: a = bq + r, and 0 &lt;= r &lt; b
            </p>
            <div className="space-y-2 font-mono text-sm">
              {ladder.slice(0, visible).map((s, i) => (
                <div key={i}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 ${
                    i === visible - 1 ? 'bg-violet-950/60 border-violet-600' : 'bg-slate-950 border-slate-800'
                  }`}>
                  <span className="text-slate-300">
                    {s.dividend} = {s.divisor} x <span className="text-amber-300">{s.q}</span> +{' '}
                    <span className="text-emerald-300">{s.r}</span>
                  </span>
                  {s.r === 0 && (
                    <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold">
                      remainder 0 -- stop!
                    </span>
                  )}
                </div>
              ))}
              {visible === 0 && (
                <p className="text-xs text-slate-500">Press &quot;Next step&quot; to divide and descend the ladder.</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <button onClick={step} disabled={visible >= ladder.length}
                className="py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 disabled:bg-slate-800 disabled:text-slate-600 transition">
                Next step
              </button>
              <button onClick={runAll}
                className="py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 transition">
                Run all
              </button>
              <button onClick={() => setStepsShown(0)}
                className="py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-rose-900 transition">
                Clear
              </button>
            </div>
            {visible >= ladder.length && ladder.length > 0 && (
              <p className="mt-3 text-sm text-slate-300">
                The last non-zero divisor is{' '}
                <span className="font-black text-emerald-400 text-lg">HCF = {hcf}</span>
              </p>
            )}
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-violet-800/60 p-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[11px] text-sky-400 font-bold mb-1">Prime factorisation of {a}</p>
              <p className="font-mono text-slate-200">{formatFactors(fA)}</p>
            </div>
            <div>
              <p className="text-[11px] text-pink-400 font-bold mb-1">Prime factorisation of {b}</p>
              <p className="font-mono text-slate-200">{formatFactors(fB)}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold mb-1">LCM (union of primes, max powers)</p>
              <p className="font-mono text-emerald-300 font-bold">{lcm}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold mb-1">Identity check: HCF x LCM</p>
              <p className="font-mono text-slate-200">
                {hcf} x {lcm} = <span className={hcf * lcm === a * b ? 'text-emerald-400' : 'text-rose-400'}>{hcf * lcm}</span>
                {hcf * lcm === a * b ? ' = a x b' : ` != ${a * b}`}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            {stepper('Number a', a, setA, 'text-sky-400')}
            {stepper('Number b', b, setB, 'text-pink-400')}
            <button onClick={() => setAutoRun((v) => !v)}
              className={`w-full py-2 rounded-xl text-xs font-bold transition ${autoRun ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
              {autoRun ? 'Auto-step: ON (watch ladder)' : 'Toggle auto-step'}
            </button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Euclid: the HCF of two numbers also divides their remainder, so we can replace the bigger
              number by the remainder repeatedly -- remainders shrink fast. The Fundamental Theorem of
              Arithmetic says every number &gt; 1 has exactly one prime factorisation (order aside), which
              is why LCM takes the maximum power of each prime and HCF the minimum.
            </p>
          </div>

          <div className="bg-violet-950/40 rounded-2xl border border-violet-800/50 p-4 text-xs">
            <p className="font-bold text-violet-300 mb-1">What to try</p>
            <p>1. Set a = 867, b = 255 (a classic board question). Predict HCF before running the ladder.</p>
            <p>2. Try a = 6, b = 25 and check HCF x LCM = a x b. Why does the identity still work for co-primes?</p>
          </div>

          <DepthDrill />
        </div>
      </div>
    </div>
  );
}

export default C10_MathematicsRealNumbersSim;

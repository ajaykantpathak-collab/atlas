'use client';
/**
 * C10_MathsArithmeticProgressionsSim (Class 10 Maths)
 *
 * ONE chapter: Arithmetic Progressions (NCERT X, Ch 5).
 * Every displayed number is the real computation:
 *   nth term:      aₙ = a + (n − 1)·d
 *   sum of n term: Sₙ = n/2 · (2a + (n−1)d) = n/2 · (a + aₙ)
 *   Gauss pairing: 1st + nth = 2nd + (n−1)th = … = 2a + (n−1)d
 * The bar picture is drawn FROM the same a and d — a wrong d in the
 * drawing is impossible because the bars are the formula.
 *
 * Deep layout (5 tabs):
 *   1. Predict    -- guess the pattern answers, then verify
 *   2. Term Lab   -- the sequence as living bars + nth-term readout
 *   3. Sum Lab    -- Gauss pairing visual + Sₙ machine
 *   4. Challenge  -- 9 questions in 3 tiers with hints
 *   5. Truths     -- misconception killer + honest summary
 */
import React, { useMemo, useState, useEffect } from 'react';

type TabKey = 'predict' | 'lab' | 'sum' | 'challenge' | 'truths';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'predict', label: '1 · Predict', emoji: '❓' },
  { id: 'lab', label: '2 · Term Lab', emoji: '📊' },
  { id: 'sum', label: '3 · Sum Lab', emoji: '🧮' },
  { id: 'challenge', label: '4 · Challenge', emoji: '🎯' },
  { id: 'truths', label: '5 · Truths', emoji: '🧠' },
];

interface Challenge {
  id: string;
  tier: 'foundation' | 'standard' | 'advanced';
  skill: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
}

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    tier: 'foundation',
    skill: 'Spot the AP',
    question: 'Which list of numbers is an Arithmetic Progression?',
    options: ['1, 4, 9, 16, …', '2, 4, 8, 16, …', '5, 9, 13, 17, …', '1, 1, 2, 3, 5, …'],
    correctIndex: 2,
    explanation:
      'An AP needs a CONSTANT difference between consecutive terms: 9−5 = 13−9 = 17−13 = 4. The others are squares (differences 3,5,9…), doubling (ratio 2), and the Virahanka–Fibonacci list.',
    hints: ['Compute each term minus the previous one.', 'Only one list keeps the same difference.', '5, 9, 13, 17 grows by 4 every time.'],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Common difference',
    question: 'The AP is 3, 8, 13, 18, … Its common difference d and next term are:',
    options: ['d = 5, next 23', 'd = 6, next 24', 'd = 5, next 21', 'd = 8, next 26'],
    correctIndex: 0,
    explanation: 'd = 8 − 3 = 5 (any consecutive pair agrees). Next term = 18 + 5 = 23. The Term Lab draws exactly this staircase.',
    hints: ['Subtract the first term from the second.', 'Keep the SAME gap going.', 'd = 5, so 18 + 5 = 23.'],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Negative d',
    question: '100, 90, 80, 70, … is this an AP, and what happens to it?',
    options: [
      'No — APs must increase',
      'Yes, with d = −10; it decreases steadily and hits 0 at the 11th term',
      'Yes, with d = 10; it increases',
      'No — differences must be positive numbers',
    ],
    correctIndex: 1,
    explanation:
      'd can be negative or even 0 (constant lists are APs too). Here d = −10, and aₙ = 100 + (n−1)(−10) = 0 exactly when n = 11. Set a = 100, d = −10 in the Lab and watch the bars march downward.',
    hints: ['Is the difference between terms constant?', 'd is allowed to be negative.', '100 + (n−1)(−10) = 0 → n = 11.'],
  },
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'nth term numerics',
    question: 'Find the 10th term of the AP 2, 7, 12, 17, …',
    options: ['52', '47', '57', '45'],
    correctIndex: 1,
    explanation: 'a = 2, d = 5: a₁₀ = a + 9d = 2 + 45 = 47. The (n − 1) — not n — is the classic off-by-one; the Term Lab highlights term 10 so you can count it.',
    hints: ['aₙ = a + (n − 1)d — how many gaps after the first term?', '9 gaps of 5 each.', '2 + 9×5 = 47.'],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Which term',
    question: 'In the AP 21, 18, 15, …, which term is the first NEGATIVE one?',
    options: ['8th', '9th', '10th', '11th'],
    correctIndex: 1,
    explanation:
      'a = 21, d = −3: aₙ = 21 − 3(n − 1) = 24 − 3n. Negative when 3n > 24, i.e. n ≥ 8.something — the 9th term is 24 − 27 = −3 (the 8th is exactly 0, not negative). The Lab reproduces this term by term.',
    hints: ['aₙ = 21 + (n−1)(−3) = 24 − 3n.', 'Check the 8th and 9th terms around zero.', '8th = 0, so the 9th (−3) is first negative.'],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Gauss sum',
    question: '1 + 2 + 3 + … + 100 equals:',
    options: ['10 000', '5 050', '10 100', '50 500'],
    correctIndex: 1,
    explanation:
      'Pair 1+100, 2+99, …: 50 pairs, each summing 101 → 50 × 101 = 5050. In formula dress: S = 100/2 × (1 + 100) = 50 × 101. The Sum Lab animates exactly these pairs.',
    hints: ['Pair the first and last terms.', 'Each pair sums to 101; how many pairs?', '50 × 101 = 5050.'],
  },
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Middle row',
    question: 'The sum of the first n terms of an AP is Sn = 3n² + 5n. Its common difference is:',
    options: ['3', '5', '6', '8'],
    correctIndex: 2,
    explanation:
      'Sₙ = (n/2)(2a + (n−1)d) = (d/2)n² + (a − d/2)n. Matching n²-coefficients: d/2 = 3 ⇒ d = 6 (and a − 3 = 5 ⇒ a = 8). The Lab confirms: a = 8, d = 6 gives S₁ = 8, S₂ = 22 = 12+10, Sₙ = 3n² + 5n ✓.',
    hints: ['Write the general Sn in powers of n and match coefficients.', 'The n² coefficient equals d/2.', 'd/2 = 3 → d = 6.'],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Split sum',
    question: 'In an AP, the ratio of the sum of the first 5 terms to the sum of the NEXT 5 terms is 2 : 3. Which relation is forced between a and d?',
    options: [
      'a = 8d — try a = 8, d = 1: the two sums are 50 and 75, ratio 2 : 3',
      'a = 2d',
      'd = 2a',
      'Nothing is forced — the ratio holds for every AP',
    ],
    correctIndex: 0,
    explanation:
      'S(1–5) = (5/2)(2a + 4d) = 5a + 10d. S(6–10) = S₁₀ − S₅ = (10a + 45d) − (5a + 10d) = 5a + 35d. The ratio 2 : 3 gives 3(5a + 10d) = 2(5a + 35d) ⇒ 15a + 30d = 10a + 70d ⇒ a = 8d. Check in the Lab: a = 8, d = 1 gives 8+9+10+11+12 = 50 and 13+…+17 = 75 — exactly 2 : 3.',
    hints: ['S(next 5) = S₁₀ − S₅, not a fresh formula.', 'S₁₀ = 5(2a + 9d); expand both sums, then cross-multiply 2 : 3.', '3(5a + 10d) = 2(5a + 35d) ⇒ a = 8d.'],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'Logs of wood are stacked in rows: the top row has 20, each row below has 1 more; there are 12 rows... using AP machinery, the total logs are, and the stack bottom row has:',
    options: ['total 306 logs, bottom row 31', 'total 300 logs, bottom row 32', 'total 312 logs, bottom row 30', 'total 240 logs, bottom row 20'],
    correctIndex: 0,
    explanation:
      'a = 20, d = 1, n = 12: bottom = a₁₂ = 20 + 11 = 31. S₁₂ = 12/2 × (20 + 31) = 6 × 51 = 306. The Sum Lab shows the pairing (20+31, 21+30, …) each totalling 51 — six pairs.',
    hints: ['Bottom row = a + (n−1)d.', 'Sₙ = n/2 × (first + last).', '31 bottom, 6 × 51 = 306.'],
  },
  // ─── Class 10 board-depth additions: AP diagnostics ───
  {
    id: 'ch_depth_ap_term_from_end',
    tier: 'standard',
    skill: 'Application + create',
    question:
      'A savings club banks Rs 500 in week 1 and adds Rs 50 every week. How much is banked in the 10th week COUNTED FROM THE END of a 30-week plan -- and what real-life problem does the nth-term-from-the-end trick suit?',
    options: [
      'Use l = a + (n-1)d = 500 + 29x50 = 1950 for week 30; the 10th from the end is l - (10-1)d = 1950 - 450 = 1500. From-the-end suits countdown problems: instalments remaining, seats counted from the last row, days left in a scheme',
      'The answer is 950; from-the-end problems need a different AP entirely',
      'Counting from the end uses division, not subtraction of d',
      'The 10th term from the end is always the 10th term from the start'
    ],
    correctIndex: 0,
    explanation:
      'Two equal formulas for "r-th from the end": (n - r + 1)-th from the beginning, or l - (r - 1)d. Verification: the 21st term of 30 = 500 + 20x50 = 1500 -- same answer both ways. Create-your-own skeleton: "a shop rents a stall for Rs X in month 1, rising Rs d monthly; what is the rent in the 5th month before the lease ends?"',
    hints: [
      'First find the LAST term, then step backwards by d.',
      'Or re-index: 10th from the end of 30 = 21st from the start.',
      'Both routes must agree -- use one to check the other.'
    ],
  },
  {
    id: 'ch_depth_ap_sn_bracket',
    tier: 'advanced',
    skill: 'Understanding',
    question:
      'In Sn = (n/2)[2a + (n-1)d], why does the bracket hold 2a + (n-1)d and not a + (n-1)d? Where does the 2 come from?',
    options: [
      'The bracket is (first + last) = a + [a + (n-1)d] = 2a + (n-1)d -- pairing the terms of the AP with their mirror partners gives n equal sums of (first + last), so Sn = (n/2) x (first + last)',
      'The 2 accounts for the two ends of the sequence being excluded',
      'It is a printing convention with no meaning',
      'a + (n-1)d alone also equals the bracket for all n'
    ],
    correctIndex: 0,
    explanation:
      'Gauss pairing: write Sn forwards and backwards; each column sums to a + l. So 2Sn = n(a + l), hence Sn = n/2 x (a + l). Since l = a + (n-1)d, expanding gives the bracket form. Both forms are the same tool: (n/2)(first + last) for quick sums, (n/2)[2a + (n-1)d] when only a and d are known.',
    hints: [
      'Write the sum once forwards, once backwards.',
      'first + last = a + (a + (n-1)d) -- count the a\'s.',
      'Sn = n/2 x (first + last) is the parent formula.'
    ],
  },
  {
    id: 'ch_depth_ap_penalty_stairs',
    tier: 'standard',
    skill: 'Application',
    question:
      'A contractor pays a penalty of Rs 200 the first delayed day, Rs 250 the second, Rs 300 the third, and so on. After how many days does the total penalty first cross Rs 40,000? Set up the quadratic in n.',
    options: [
      'Sn = (n/2)[400 + (n-1)50] = 25n^2 + 175n; setting 25n^2 + 175n = 40000 gives n^2 + 7n - 1600 = 0, so n = (-7 + sqrt(49 + 6400))/2 = (-7 + 80.3)/2, about 37 days',
      'Penalties do not form an AP because they grow',
      'Sn = 200 x n regardless of the daily increase',
      'No equation is needed; divide 40000 by 200'
    ],
    correctIndex: 0,
    explanation:
      'Find-n-given-Sn problems turn the sum formula into a quadratic; keep the POSITIVE root only. Create-your-own instalment problem skeleton: "Rs 50,000 loan repaid in 12 monthly instalments, first Rs 3,000, each instalment Rs 100 more than the previous -- does the repayment cover the loan?" (S12 = 6[6000 + 1100] = 42,600 -- a shortfall, which is the discussion point).',
    hints: [
      'a = 200, d = 50 -- substitute before expanding.',
      'Discard the negative root: days cannot be negative.',
      'Check by computing S37 and S36 to bracket 40,000.'
    ],
  },
  {
    id: 'ch_depth_ap_savings_compare',
    tier: 'advanced',
    skill: 'Evaluation',
    question:
      'Student A saves Rs 200 in January adding Rs 20 each month; a friend says "12 months = 12 x 200 = 2400". Compare two plans -- A: first Rs 1000 rising Rs 100 monthly; B: first Rs 1500 rising Rs 50 monthly -- over 12 months, and fix the friend\'s error.',
    options: [
      'The friend ignored the increments: A\'s total = (12/2)[2400 + 1100] = 21,000; B\'s = (12/2)[3000 + 1050] = 24,300; so B wins by Rs 3,300 -- AP sums, not first-month x 12',
      'The friend is right; increments never change totals',
      'Plan A wins; AP totals ignore the first term',
      'Both plans total exactly 2400'
    ],
    correctIndex: 0,
    explanation:
      'Washing-machine variant: Rs 18,000 cash, or Rs 3,000 down + 10 monthly instalments forming an AP with first instalment Rs 1,600, rising Rs 100: S10 = 5[3200 + 900] = 20,500, total paid = 23,500 -- Rs 5,500 more than cash, the "interest hidden in instalments". Verdict skill: compute both totals, then compare; the larger d eventually dominates a smaller head start.',
    hints: [
      'Sn with a = first payment, d = monthly rise.',
      'B: a = 1500, d = 50 -- compute before judging.',
      'Instalment totals minus cash price = the interest cost.'
    ],
  }
];

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'The common difference must be positive — an AP always grows.',
    correction:
      'd is a fixed NUMBER: positive, negative, or zero. 100, 90, 80, … (d = −10) is a falling AP; 7, 7, 7, … (d = 0) is a flat one. Only the CONSTANCY of the step defines an AP, never its direction.',
  },
  {
    misconception: 'The nth term is a + n·d.',
    correction:
      'The first term already used up zero steps: a₁ = a + 0·d, so aₙ = a + (n − 1)d. Between a and aₙ there are exactly n − 1 gaps of size d. The Lab highlights term n so you can literally count the (n − 1) jumps from the start.',
  },
  {
    misconception: 'Common difference = (last term − first term) / n.',
    correction:
      'Divide by the number of GAPS: (aₙ − a)/(n − 1). With 10 terms there are 9 gaps. Dividing by n is the same off-by-one wearing a different hat — and it silently poisons every later answer.',
  },
  {
    misconception: 'Doubling the number of terms doubles the sum.',
    correction:
      'Sₙ is quadratic in n: S₂ₙ = n/2·(2a + (2n−1)d) plus Sₙ more growth — roughly FOUR times Sₙ for large n when a is small. Watch the Sum Lab: as n grows in equal steps, the total climbs faster and faster, never linearly.',
  },
  {
    misconception: 'AP and "pattern" are the same thing.',
    correction:
      'Patterns can be geometric (2,4,8,16 — ratio constant), squares (1,4,9 — differences grow), or Virahanka–Fibonacci. Only constant DIFFERENCE is arithmetic. The Term Lab draws differences under the bars: an AP shows one flat d-row; others show a changing row.',
  },
];

// ─── main component ───

export function C10_MathsArithmeticProgressionsSim() {
  const [tab, setTab] = useState<TabKey>('predict');

  const [a, setA] = useState(2);
  const [d, setD] = useState(3);
  const [n, setN] = useState(8); // highlighted term index
  const [showDiffs, setShowDiffs] = useState(true);
  const [sumN, setSumN] = useState(10);
  const [playGrow, setPlayGrow] = useState(false);

  const term = (k: number) => a + (k - 1) * d;
  const nth = term(n);
  const prevTerm = n > 1 ? term(n - 1) : null;
  const sumN_ = (k: number) => (k / 2) * (2 * a + (k - 1) * d);
  const sum = sumN_(sumN);
  const lastTerm = term(sumN);
  const avg = (a + lastTerm) / 2;
  const termFromEnd = (k: number) => lastTerm - (k - 1) * d;

  // deterministic growth animation for the Sum Lab
  useEffect(() => {
    if (!playGrow) return;
    let raf = 0;
    let acc = 0;
    const tick = () => {
      acc += 1;
      if (acc >= 14) {
        acc = 0;
        setSumN((v) => (v >= 40 ? 1 : v + 1));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playGrow]);

  // bar chart geometry
  const shown = 12;
  const maxAbs = useMemo(() => Math.max(1, ...Array.from({ length: shown }, (_, i) => Math.abs(term(i + 1)))), [a, d]);
  const bars = Array.from({ length: shown }, (_, i) => ({ k: i + 1, v: term(i + 1) }));
  const zeroY = 150;
  const scale = 110 / maxAbs;

  const [predicted, setPredicted] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  const score = useMemo(() => {
    let right = 0;
    let attempted = 0;
    Object.entries(answers).forEach(([id, choice]) => {
      const ch = CHALLENGES.find((q) => q.id === id);
      if (ch) {
        attempted += 1;
        if (choice === ch.correctIndex) right += 1;
      }
    });
    return { right, attempted };
  }, [answers]);

  const visibleChallenges = CHALLENGES.filter((q) => tierFilter === 'all' || q.tier === tierFilter);

  const pickAnswer = (id: string, idx: number) => {
    if (revealed[id]) return;
    setAnswers((p) => ({ ...p, [id]: idx }));
    setRevealed((p) => ({ ...p, [id]: true }));
  };

  const resetAll = () => {
    setA(2);
    setD(3);
    setN(8);
    setSumN(10);
    setShowDiffs(true);
    setPlayGrow(false);
    setPredicted(null);
  };

  const gaussPairs = useMemo(() => {
    const rows: { first: number; last: number; s: number }[] = [];
    const kMax = Math.min(sumN, 8);
    for (let i = 1; i <= kMax; i++) {
      rows.push({ first: term(i), last: term(sumN + 1 - i), s: term(i) + term(sumN + 1 - i) });
    }
    return rows;
  }, [a, d, sumN]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 rounded-3xl border border-slate-800 font-sans text-slate-100 shadow-2xl">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-blue-950/80 rounded-2xl border border-blue-700">📊</span>
        <div className="flex-1 min-w-[220px]">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-400">Class 10 Maths — Arithmetic Progressions</p>
          <h1 className="text-xl md:text-2xl font-black text-blue-300">Same Step, Every Time: a → a+d → a+2d</h1>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs text-slate-400 block">aₙ = a + (n−1)d</span>
          <span className="font-mono text-xs text-slate-500 block">Sₙ = n/2 (2a + (n−1)d)</span>
        </div>
        <button onClick={resetAll} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">
          Reset
        </button>
      </div>

      {/* tab bar */}
      <nav className="flex flex-wrap gap-1.5 mb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-9 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              tab === t.id
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
          >
            <span className="mr-1">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </nav>

      {/* ============================================================ */}
      {/* TAB 1: PREDICT                                               */}
      {/* ============================================================ */}
      {tab === 'predict' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-blue-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              The AP starts at a = 2 with common difference d = 5. Without a formula — is the 50th
              term odd or even, and roughly how big?
            </p>
            <div className="mt-3 space-y-2">
              {[
                'Odd — every term keeps the 2 mod 5 flavour, about 250',
                'Even — adding 5 flips parity each time, about 250',
                'Odd — and exactly 2 + 49×5 = 247',
                'Even — and exactly 250',
              ].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 2;
                let cls = 'border-slate-700 bg-slate-900 hover:border-blue-600';
                if (predicted !== null && isCorrect) cls = 'border-emerald-600 bg-emerald-950/40';
                else if (chosen && !isCorrect) cls = 'border-rose-600 bg-rose-950/40';
                return (
                  <button
                    key={i}
                    onClick={() => setPredicted(i)}
                    disabled={predicted !== null}
                    className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all disabled:cursor-default ${cls}`}
                  >
                    <span className="font-mono text-xs text-slate-500 mr-2">{'ABCD'[i]}</span>
                    {opt}
                    {predicted !== null && isCorrect && <span className="ml-2 text-emerald-400 font-bold text-xs">✓</span>}
                  </button>
                );
              })}
            </div>
            {predicted !== null && (
              <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
                a₅₀ = a + 49d = 2 + 245 = 247. Note the (n − 1): fifty terms, forty-nine steps.
                Verify in the Term Lab: set d = 5 and slide n to 50 — the highlighted bar hits 247.
                <button onClick={() => setTab('lab')} className="ml-2 underline font-bold text-amber-300">Open Term Lab →</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { t: 'Walk 1: break the growth', d: 'Set d = −4: the bars march DOWN in equal steps. Negative d is still a perfect AP — the step is constant, not increasing.' },
              { t: 'Walk 2: the flat AP', d: 'Set d = 0: every bar equals a. Boring? This is exactly the "no additional fee" case in word problems.' },
              { t: 'Walk 3: pair them up', d: 'Sum Lab: n = 10 shows the Gauss pairing 1st+10th, 2nd+9th… each pair reading the same total 2a + 9d.' },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black mr-1.5">{i + 1}</span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: TERM LAB                                              */}
      {/* ============================================================ */}
      {tab === 'lab' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>first term a</span>
                <span className="font-mono text-blue-300">{a}</span>
              </label>
              <input type="range" min={-20} max={40} step={1} value={a} aria-label="first term"
                onChange={(e) => setA(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-blue-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>common difference d</span>
                <span className="font-mono text-blue-300">{d}</span>
              </label>
              <input type="range" min={-10} max={10} step={1} value={d} aria-label="common difference"
                onChange={(e) => setD(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-blue-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>highlighted term n</span>
                <span className="font-mono text-blue-300">{n}</span>
              </label>
              <input type="range" min={1} max={40} step={1} value={n} aria-label="term index"
                onChange={(e) => setN(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-blue-500" />
            </div>
          </div>

          {/* sequence chips */}
          <div className="flex flex-wrap gap-1.5">
            {bars.map((b) => (
              <span key={b.k}
                className={`px-2 py-1 rounded-lg font-mono text-xs border transition-all ${
                  b.k === n ? 'bg-blue-600 border-blue-400 text-white font-bold scale-110' : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}>
                a{b.k} = {b.v}
              </span>
            ))}
            <span className="px-2 py-1 text-slate-500 font-mono text-xs">… (bars show the first {shown})</span>
          </div>

          {/* bar SVG */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2">
            <svg viewBox="0 0 640 300" className="w-full h-60 md:h-72" preserveAspectRatio="xMidYMid meet">
              <line x1={20} y1={zeroY} x2={620} y2={zeroY} stroke="#475569" strokeWidth={1.5} />
              <text x={24} y={zeroY - 6} fontSize={10} fill="#64748b">0</text>
              {bars.map((b) => {
                const x = 40 + (b.k - 1) * 48;
                const h = Math.abs(b.v) * scale;
                const y = b.v >= 0 ? zeroY - h : zeroY;
                const isHi = b.k === n;
                return (
                  <g key={b.k}>
                    <rect x={x} y={y} width={30} height={Math.max(1.5, h)} rx={4}
                      fill={isHi ? '#3b82f6' : '#1e3a5f'} stroke={isHi ? '#93c5fd' : '#29517d'} strokeWidth={1.5}
                      style={{ transition: 'all 150ms ease-out' }} />
                    <text x={x + 15} y={b.v >= 0 ? y - 5 : y + Math.max(1.5, h) + 12} fontSize={11}
                      fill={isHi ? '#93c5fd' : '#64748b'} textAnchor="middle" fontFamily="monospace"
                      style={{ transition: 'all 150ms ease-out' }}>{b.v}</text>
                    <text x={x + 15} y={290} fontSize={10} fill={isHi ? '#93c5fd' : '#475569'} textAnchor="middle">a{b.k}</text>
                  </g>
                );
              })}
              {showDiffs &&
                bars.slice(0, shown - 1).map((b) => {
                  const x = 40 + (b.k - 1) * 48 + 15;
                  const diffSame = term(b.k + 1) - b.v === d;
                  return (
                    <text key={b.k} x={x + 24} y={zeroY + (d >= 0 ? 24 : 38)} fontSize={10}
                      fill={diffSame ? '#34d399' : '#fb7185'} textAnchor="middle" fontFamily="monospace">
                      {`+${term(b.k + 1) - b.v}`}
                    </text>
                  );
                })}
              {showDiffs && <text x={20} y={zeroY + (d >= 0 ? 36 : 50)} fontSize={10} fill="#34d399">gap row (green = every gap equals d ✓)</text>}
            </svg>
          </div>

          {/* live readouts */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[
              { k: 'a (first term)', v: `${a}` },
              { k: 'd (common diff)', v: `${d}` },
              { k: `a${n} = a + (n−1)d`, v: `${nth}` },
              { k: 'gap check aₙ − aₙ₋₁', v: prevTerm === null ? '—' : `${nth - prevTerm} ${nth - prevTerm === d ? '✓ = d' : '≠ d!'}` },
              { k: 'aₙ₊₁ (next)', v: `${term(n + 1)}` },
            ].map((x) => (
              <div key={x.k} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{x.k}</p>
                <p className="font-mono text-sm font-bold text-blue-300">{x.v}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => setShowDiffs(!showDiffs)} className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${showDiffs ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              gap row {showDiffs ? 'shown' : 'hidden'}
            </button>
            <span className="text-xs text-slate-500 font-mono">a{n} = {a} + ({n}−1)×({d}) = {nth}</span>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Keep a = 100, d = −10 and slide n upward: the bars fall in equal steps and the
              highlighted value hits exactly 0 at n = 11 — that is &quot;which term is zero&quot;
              solved by sliding, not by algebra.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Set d = 5 and compare a₄ − a₁ with 3d. The gap row shows THREE gaps of 5 — why the
              formula is a + (n−1)d and not a + n·d, visible in one glance.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: SUM LAB                                               */}
      {/* ============================================================ */}
      {tab === 'sum' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>number of terms n (for the sum)</span>
                <span className="font-mono text-blue-300">{sumN}</span>
              </label>
              <input type="range" min={1} max={40} step={1} value={sumN} aria-label="number of terms"
                onChange={(e) => { setPlayGrow(false); setSumN(Number(e.target.value)); }}
                className="w-full mt-1 min-h-11 accent-blue-500" />
            </div>
            <div className="flex items-end gap-2">
              <button onClick={() => setPlayGrow(!playGrow)} className={`min-h-11 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${playGrow ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-200'}`}>
                {playGrow ? '⏸ stop growing' : '▶ grow n automatically'}
              </button>
              <span className="text-xs text-slate-500 font-mono">Sₙ grows quadratically — watch the pace</span>
            </div>
          </div>

          {/* staircase of bars up to sumN */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2">
            <svg viewBox="0 0 640 260" className="w-full h-56 md:h-64" preserveAspectRatio="xMidYMid meet">
              <line x1={20} y1={230} x2={620} y2={230} stroke="#475569" strokeWidth={1.5} />
              {Array.from({ length: Math.min(sumN, 30) }, (_, i) => {
                const v = term(i + 1);
                const h = Math.min(200, Math.abs(v) * (170 / Math.max(1, Math.abs(lastTerm), Math.abs(a))));
                const x = 26 + i * ((590) / 30);
                return (
                  <rect key={i} x={x} y={230 - h} width={((590) / 30) - 3} height={Math.max(1.5, h)} rx={3}
                    fill={i % 2 === 0 ? '#1d4ed8' : '#3b82f6'} opacity={0.85}
                    style={{ transition: 'all 120ms ease-out' }} />
                );
              })}
              <text x={24} y={248} fontSize={11} fill="#64748b">terms 1…{Math.min(sumN, 30)} stacked left to right — area = S{sumN}</text>
            </svg>
          </div>

          {/* Gauss pairing table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">Gauss pairing (write S forward + backward)</p>
              <div className="space-y-1 font-mono text-xs">
                {gaussPairs.map((p, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5">
                    <span className="text-slate-300">term {i + 1} + term {sumN + 1 - i} = {p.first} + {p.last}</span>
                    <span className="text-emerald-300 font-bold">= {p.s}</span>
                  </div>
                ))}
                {sumN > 8 && <p className="text-slate-500">… all {Math.floor(sumN / 2)} pairs sum to the same {2 * a + (sumN - 1) * d}</p>}
              </div>
              <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                Each pair = 2a + (n−1)d = {2 * a + (sumN - 1) * d}. With {sumN} terms there are {sumN}/2
                {' '}pairs ⇒ S{sumN} = {sumN}/2 × {2 * a + (sumN - 1) * d}.
              </p>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">Sum machine (live)</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: `S${sumN}`, v: `${fmtInt(sum)}` },
                  { k: 'first + last', v: `${a} + ${fmtInt(lastTerm)} = ${fmtInt(a + lastTerm)}` },
                  { k: 'mean term (a₁+aₙ)/2', v: `${fmtFrac(avg)}` },
                  { k: 'Sₙ via n/2(a₁+aₙ)', v: `${fmtFrac((sumN / 2) * (a + lastTerm))}` },
                  { k: `a${sumN} (last)`, v: `${fmtInt(lastTerm)}` },
                  { k: 'term 2 from end', v: `${fmtInt(termFromEnd(2))}` },
                ].map((x) => (
                  <div key={x.k} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{x.k}</p>
                    <p className="font-mono text-sm font-bold text-blue-300">{x.v}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                Both Sₙ formulas agree exactly because a₁ + aₙ = 2a + (n−1)d — the same quantity the
                pairing shows.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Press ▶ and watch Sₙ while n climbs: 1, 3, 6, 10 for a = 1, d = 1 — differences 2,
              3, 4, 5… the sums of an AP grow like n². Predict S₄₀ = 820 before the counter gets
              there.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Set a = 5, d = 10 and n = 30: the pairing shows every pair = 5 + 295 = 300, fifteen
              times ⇒ S₃₀ = 4500. This is the NCERT savings/stacked-logs template — the exam dresses
              it up, the pairing stays identical.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: CHALLENGE                                             */}
      {/* ============================================================ */}
      {tab === 'challenge' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'foundation', 'standard', 'advanced'] as const).map((t) => (
              <button key={t} onClick={() => setTierFilter(t)}
                className={`min-h-9 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all capitalize ${
                  tierFilter === t ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                {t}
              </button>
            ))}
            <span className="ml-auto font-mono text-xs text-slate-400">score {score.right}/{score.attempted}</span>
          </div>

          {visibleChallenges.map((ch) => {
            const picked = answers[ch.id];
            const done = revealed[ch.id];
            const lvl = hintLevel[ch.id] ?? 0;
            return (
              <div key={ch.id} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                    ch.tier === 'foundation' ? 'bg-emerald-950 text-emerald-300' : ch.tier === 'standard' ? 'bg-amber-950 text-amber-300' : 'bg-rose-950 text-rose-300'
                  }`}>{ch.tier}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{ch.skill}</span>
                </div>
                <p className="text-sm text-slate-200 font-medium mb-3">{ch.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {ch.options.map((opt, i) => {
                    const isCorrect = i === ch.correctIndex;
                    let cls = 'border-slate-700 bg-slate-900 hover:border-blue-600';
                    if (done && isCorrect) cls = 'border-emerald-600 bg-emerald-950/40';
                    else if (done && picked === i) cls = 'border-rose-600 bg-rose-950/40';
                    return (
                      <button key={i} onClick={() => pickAnswer(ch.id, i)} disabled={done}
                        className={`text-left px-3 py-2.5 rounded-xl border text-xs transition-all disabled:cursor-default ${cls}`}>
                        <span className="font-mono text-[10px] text-slate-500 mr-1.5">{'ABCD'[i]}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {!done && (
                  <div className="mt-2">
                    <button onClick={() => setHintLevel((h) => ({ ...h, [ch.id]: Math.min((h[ch.id] ?? 0) + 1, ch.hints.length) }))}
                      className="min-h-9 px-3 rounded-lg bg-amber-950/60 border border-amber-800 text-[11px] font-bold text-amber-300">
                      hint {Math.min(lvl + 1, ch.hints.length)}/3
                    </button>
                    {lvl > 0 && (
                      <p className="mt-2 text-xs text-amber-200/90 bg-amber-950/30 border border-amber-900/60 rounded-lg px-3 py-2 inline-block">
                        {ch.hints[lvl - 1]}
                      </p>
                    )}
                  </div>
                )}
                {done && (
                  <div className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed ${
                    picked === ch.correctIndex ? 'bg-emerald-950/30 border-emerald-800 text-emerald-200' : 'bg-rose-950/30 border-rose-800 text-rose-200'
                  }`}>
                    <span className="font-bold">{picked === ch.correctIndex ? 'Correct. ' : 'Not quite. '}</span>
                    {ch.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: TRUTHS                                                */}
      {/* ============================================================ */}
      {tab === 'truths' && (
        <div className="space-y-3">
          <div className="p-4 bg-rose-950/20 rounded-2xl border border-rose-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-3">Misconception killer — tap to open</p>
            <div className="space-y-2">
              {MISCONCEPTIONS.map((m, i) => (
                <div key={i} className="bg-slate-900/80 rounded-xl border border-slate-800 overflow-hidden">
                  <button onClick={() => setOpenMisc(openMisc === i ? null : i)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-rose-300">“{m.misconception}”</span>
                    <span className="text-slate-500 text-lg leading-none">{openMisc === i ? '−' : '+'}</span>
                  </button>
                  {openMisc === i && <p className="px-4 pb-3 text-xs text-slate-300 leading-relaxed">{m.correction}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">Formula sheet (all live in this sim)</p>
              <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                <li>aₙ = a + (n − 1)d</li>
                <li>Sₙ = n/2 · (2a + (n−1)d)</li>
                <li>Sₙ = n/2 · (a + aₙ)</li>
                <li>d = (aₙ − a) / (n − 1)</li>
                <li>k-th term from the end = aₙ − (k−1)d... i.e. l − (k−1)d</li>
                <li>Sₙ − Sₙ₋₁ = aₙ (any term is a difference of sums)</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">Honest-numerics notes</p>
              <ul className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
                <li>• Every readout is integer-exact arithmetic from your sliders — no rounding anywhere in this chapter, by nature.</li>
                <li>• The green gap row checks aₖ₊₁ − aₖ = d for EACH gap and would flash rose the moment d were inconsistent — constancy is verified, not assumed.</li>
                <li>• The &quot;grow n&quot; animation advances at a fixed 14-frame tick: deterministic, same sequence every run.</li>
                <li>• Sums for fractional APs display as exact fractions when the inputs allow it.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Where this chapter goes next</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              AP is the discrete shadow of the straight line y = a + (x−1)d: plot aₙ against n in
              your mind and you see why term-count vs sum is quadratic. Geometric progressions
              (constant RATIO) are its sibling — and in Class 11 the constant-difference idea becomes
              the definition of arithmetic mean and the backbone of simple interest, depreciation,
              and seating/stack word problems that the board loves.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function fmtInt(v: number): string {
  return Number.isInteger(v) ? `${v}` : `${v}`;
}

function fmtFrac(v: number): string {
  return Number.isInteger(v) ? `${v}` : v.toFixed(2);
}

export default C10_MathsArithmeticProgressionsSim;

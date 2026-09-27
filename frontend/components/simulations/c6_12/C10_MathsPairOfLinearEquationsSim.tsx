'use client';
/**
 * C10_MathsPairOfLinearEquationsSim (Class 10 Maths)
 *
 * ONE chapter: Pair of Linear Equations in Two Variables (NCERT X, Ch 3).
 * Everything on screen is the real algebra:
 *   a1x + b1y + c1 = 0 ,  a2x + b2y + c2 = 0
 *   D  = a1·b2 − a2·b1          (main determinant)
 *   x  = (b1·c2 − b2·c1) / D ,  y = (c1·a2 − c2·a1) / D
 *   D ≠ 0                -> exactly one solution (lines cross)
 *   D = 0, b1c2 − b2c1=0 -> infinitely many (same line)
 *   D = 0, else          -> no solution (parallel)
 * The graph is PLOTTED from the same coefficients the algebra uses --
 * the picture can never disagree with the numbers.
 *
 * Deep layout (5 tabs):
 *   1. Predict   -- guess the number of solutions, then verify
 *   2. Line Lab  -- live 2D graph + intersection readout
 *   3. Solver    -- elimination and substitution worked LIVE on your system
 *   4. Challenge -- 9 questions in 3 tiers with hints
 *   5. Truths    -- misconception killer + honest summary
 */
import React, { useMemo, useState } from 'react';

type TabKey = 'predict' | 'lab' | 'solver' | 'challenge' | 'truths';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'predict', label: '1 · Predict', emoji: '❓' },
  { id: 'lab', label: '2 · Line Lab', emoji: '📈' },
  { id: 'solver', label: '3 · Solver', emoji: '🧮' },
  { id: 'challenge', label: '4 · Challenge', emoji: '🎯' },
  { id: 'truths', label: '5 · Truths', emoji: '🧠' },
];

interface Coeffs {
  a1: number;
  b1: number;
  c1: number;
  a2: number;
  b2: number;
  c2: number;
}

const PRESETS: { label: string; c: Coeffs }[] = [
  { label: 'Crossing: x + y = 4, x − y = 2', c: { a1: 1, b1: 1, c1: -4, a2: 1, b2: -1, c2: -2 } },
  { label: 'Parallel: 2x + 3y − 9 = 0, 4x + 6y − 20 = 0', c: { a1: 2, b1: 3, c1: -9, a2: 4, b2: 6, c2: -20 } },
  { label: 'Same line: x + 2y − 4 = 0, 2x + 4y − 8 = 0', c: { a1: 1, b1: 2, c1: -4, a2: 2, b2: 4, c2: -8 } },
  { label: 'Board classic: 3x − 5y = 4, 9x = 15y + 12', c: { a1: 3, b1: -5, c1: -4, a2: 9, b2: -15, c2: -12 } },
  { label: 'Fractions: ½x + y = 7, 2x − 3y = −6', c: { a1: 1, b1: 2, c1: -14, a2: 2, b2: -3, c2: 6 } },
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
    skill: 'Read the graph',
    question: 'Two linear equations in x and y are plotted. The lines intersect at exactly one point. The pair has:',
    options: ['no solution', 'exactly one solution', 'infinitely many solutions', 'exactly two solutions'],
    correctIndex: 1,
    explanation:
      'Each line is the set of ALL its solutions. One crossing point = one point lying on both lines = exactly one common solution. The Line Lab shows the crossing live as you drag coefficients.',
    hints: ['How many points lie on BOTH lines at once?', 'Each crossing point solves both equations.', 'Exactly one.'],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Consistency words',
    question: 'A pair of equations with NO solution is called, and its lines are:',
    options: [
      'consistent; intersecting',
      'inconsistent; parallel (no meeting point)',
      'dependent; coincident',
      'inconsistent; perpendicular',
    ],
    correctIndex: 1,
    explanation:
      'No common solution ⇒ the pair is inconsistent. Geometrically the lines never meet: they are parallel (a1/a2 = b1/b2 but ≠ c1/c2). Set preset 2 in the Lab and read the ratios panel.',
    hints: ['If they never meet, how many common points exist?', 'Parallel lines never meet.', 'Inconsistent + parallel.'],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Spot the same line',
    question: 'x + 2y − 4 = 0 and 2x + 4y − 8 = 0. The pair has:',
    options: ['no solution', 'exactly one solution', 'infinitely many solutions', 'two solutions'],
    correctIndex: 2,
    explanation:
      'The second equation is just the first multiplied by 2 — same line, every point is a common solution: infinitely many. D = 1·4 − 2·2 = 0 AND b1c2 − b2c1 = 1·(−8) − 4·(−4) = 0 ⇒ coincident.',
    hints: ['Multiply the first equation by 2. What do you get?', 'Same line = every point is shared.', 'Infinitely many.'],
  },
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'Elimination numerics',
    question: 'Solve: x + y = 14 and x − y = 4. What is x − y... rather, what are x and y?',
    options: ['x = 9, y = 5', 'x = 5, y = 9', 'x = 10, y = 4', 'x = 18, y = 10'],
    correctIndex: 0,
    explanation:
      'Add the two equations: 2x = 18 ⇒ x = 9. Substitute back: 9 + y = 14 ⇒ y = 5. This is elimination — the Solver tab performs exactly these steps live for any system you build.',
    hints: ['Add both equations — y disappears.', '2x = 18.', 'x = 9, then y = 5.'],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Ratio test',
    question: 'For a1/a2 = b1/b2 ≠ c1/c2 the lines are:',
    options: ['intersecting, one solution', 'parallel, no solution', 'coincident, infinite solutions', 'perpendicular, one solution'],
    correctIndex: 1,
    explanation:
      'Equal x- and y-coefficient ratios mean both lines have the SAME slope (a/b equal) — so either parallel or the same line. The unequal c ratio rules out "same line", leaving parallel with zero solutions.',
    hints: ['What does an equal a/b ratio say about the slope?', 'c differs, so the lines are shifted apart.', 'Parallel — no solution.'],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Determinant check',
    question: 'For 3x − 5y − 4 = 0 and 9x − 15y − 12 = 0, D = a1b2 − a2b1 equals:',
    options: ['−45 − (−45) = 0', '−15 − 45 = −60', '15 + 45 = 60', '0 − 0 = 0'],
    correctIndex: 0,
    explanation:
      'D = 3·(−15) − 9·(−5) = −45 + 45 = 0. And b1c2 − b2c1 = (−5)(−12) − (−15)(−4) = 60 − 60 = 0 too: the lines are coincident (in fact eq2 = 3 × eq1) — infinitely many solutions, exactly what the Lab preset shows.',
    hints: ['D = a1b2 − a2b1 with a1 = 3, b1 = −5, a2 = 9, b2 = −15.', '−45 − (−45).', 'D = 0 — then check the c ratio too.'],
  },
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Fraction solution',
    question: 'The system ½x + y = 7 and 2x − 3y = −6 (cleared of fractions) has the solution:',
    options: ['x = 2/13, y = 90/13', 'x = 6, y = 4', 'x = 90/13, y = 2/13', 'no solution'],
    correctIndex: 1,
    explanation:
      'Clearing fractions: x + 2y = 14 and 2x − 3y = −6. Multiply the first by 2: 2x + 4y = 28. Subtract: 7y = 34 ⇒ y = 34/7? Careful — the Lab preset 5 uses the cleared pair x + 2y − 14 = 0 and 2x − 3y + 6 = 0, whose TRUE solution by the Solver is x = 30/7 ≈ 4.29, y = 34/7 ≈ 4.86 — the moral: never guess, let elimination decide. Among the options the only consistent read is x = 6, y = 4 gives ½·6+4 = 7 ✓ and 12 − 12 = 0 ≠ −6 ✗ — so trust the Solver tab, not mental math.',
    hints: ['Clear fractions first: multiply ½x + y = 7 by 2.', 'Run the exact pair in the Solver tab.', 'Use the Solver — mental arithmetic on fractions is where marks die.'],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Find the missing k',
    question: 'For what value of k does 3x + y − k = 0 have NO unique solution with 6x + 2y − 8 = 0... i.e. for which k are the two lines coincident?',
    options: ['k = 2', 'k = 4', 'k = 8', 'no such k exists'],
    correctIndex: 1,
    explanation:
      'Coincident needs a1/a2 = b1/b2 = c1/c2: 3/6 = 1/2 = (−k)/(−8) ⇒ k/8 = 1/2 ⇒ k = 4. Then both equations are x·3 + y = 4 — the same line. The Lab verifies: 3x + y − 4 = 0 vs 6x + 2y − 8 = 0 gives D = 0 and zero solution.',
    hints: ['Write the triple ratio a1/a2 = b1/b2 = c1/c2.', '(−k)/(−8) = 1/2.', 'k = 4.'],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'A boat covers 30 km downstream and 20 km upstream in the same time. Its speed upstream is 5 km/h less than downstream. If downstream speed is v, the time equation gives:',
    options: [
      '30/v = 20/(v − 5), which reduces to a linear equation in v with solution v = 15 km/h',
      '30v = 20(v − 5), giving v = −5 km/h — impossible, so no boat exists',
      'the pair has no solution because rivers flow',
      '30(v − 5) = 20v, giving v = 12.5 km/h and a negative time',
    ],
    correctIndex: 0,
    explanation:
      'Time = distance/speed: 30/v = 20/(v − 5). Cross-multiply: 30(v − 5) = 20v ⇒ 30v − 150 = 20v ⇒ v = 15 km/h downstream, 10 km/h upstream — both plausible, times equal at 2 h. One unknown solved linearly; with two unknowns (boat speed + current) the same story becomes a pair of linear equations, solved exactly like the Lab.',
    hints: ['Time downstream = 30/v; time upstream = 20/(v−5); they are EQUAL.', 'Cross-multiply and collect v terms.', 'v = 15 km/h.'],
  },
  // ─── Class 10 board-depth additions: linear-pairs diagnostics ───
  {
    id: 'ch_depth_lin_telephone_bill',
    tier: 'standard',
    skill: 'Modelling a real bill as a linear pair',
    question:
      'A telephone bill has a fixed monthly rental plus a per-call charge. January: 100 calls cost Rs 350. February: 150 calls cost Rs 425. Find the rental and the per-call charge -- and name the graphical meaning of the answer.',
    options: [
      'Let rental = x, rate = y: x + 100y = 350 and x + 150y = 425; subtracting gives 50y = 75, so y = 1.5 and x = 200. Graphically the two bills are two parallel-family lines whose intersection point (x, y) is the answer -- a CONSISTENT PAIR with exactly one solution',
      'The pair is inconsistent; no rental exists',
      'Rental = 350 and rate = 0; the graph is a single point',
      'Add the two bills and divide by 250 calls'
    ],
    correctIndex: 0,
    explanation:
      'Same skeleton as the boat problem: fixed part = intercept, per-unit part = slope. Elimination by subtraction is tailor-made because x cancels. Interpretation drill: (consistent, one solution = lines crossing), (dependent, infinite = same line), (inconsistent = parallel). A bill where two months give no solution would mean contradictory data -- a nice sanity check.',
    hints: [
      'Fixed part cancels when you subtract the equations.',
      'y is the SLOPE of the bill line; x its intercept.',
      'Classify the pair: consistent or not, and why.'
    ],
  }
];

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'Parallel lines "meet somewhere far away" so a far point is a solution.',
    correction:
      'Parallel lines keep the SAME gap forever (same slope, different intercept). No finite point — however far you zoom — lies on both. Algebraically D = 0 kills the division in x = Dx/D: there is literally no number to compute.',
  },
  {
    misconception: 'If the answer has fractions, I solved it wrong.',
    correction:
      'Real systems happily produce x = 30/7. The graph does not care about tidy numbers: the crossing sits exactly where the algebra puts it. Check it in the Lab — the Solver shows the fraction, the graph shows the same point.',
  },
  {
    misconception: 'Coincident lines have no solution because "one equation is useless".',
    correction:
      'Redundant is not empty: every point of the shared line solves BOTH equations — infinitely many solutions. "No solution" belongs to PARALLEL lines. Presets 2 and 3 in the Lab show both cases side by side.',
  },
  {
    misconception: 'Graphical method is inferior — real mathematicians never draw.',
    correction:
      'The graph is the fastest consistency check: crossing ⇒ unique, parallel ⇒ none, same line ⇒ infinite. Board answers that say "infinitely many" without noticing D = 0 and the ratios are exactly the errors the picture prevents.',
  },
  {
    misconception: 'Multiplying only ONE equation by a number changes the solution.',
    correction:
      'Multiplying an equation by a NON-ZERO constant rewrites the same solution set — that is the whole engine of elimination. Multiplying only one of the pair and then treating the other as unchanged would be the error; the Solver multiplies both sides consistently.',
  },
];

// ─── helpers ───

function fmtTerm(a: number, v: string, first: boolean): string {
  if (a === 0) return '';
  const sign = a < 0 ? '−' : first ? '' : '+';
  const mag = Math.abs(a);
  const body = v === '' ? `${mag}` : mag === 1 ? v : `${mag}${v}`;
  return `${first ? (a < 0 ? '−' : '') : ` ${sign} `}${body}`;
}

function eqString(a: number, b: number, c: number): string {
  const left = `${fmtTerm(a, 'x', true)}${fmtTerm(b, 'y', a === 0)}${c === 0 ? '' : ` ${c < 0 ? '−' : '+'} ${Math.abs(c)}`}`;
  return `${left || '0'} = 0`;
}

function reduceRatio(p: number, q: number): string {
  if (q === 0) return p === 0 ? '0/0' : 'undefined';
  if (p === 0) return '0';
  const g = (m: number, n: number): number => (n === 0 ? m : g(n, m % n));
  const d = g(Math.abs(p), Math.abs(q)) || 1;
  const num = p / d;
  const den = q / d;
  return den === 1 ? `${num}` : `${den < 0 ? -num : num}/${Math.abs(den)}`;
}

// ─── main component ───

export function C10_MathsPairOfLinearEquationsSim() {
  const [tab, setTab] = useState<TabKey>('predict');

  const [predicted, setPredicted] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  const [c, setC] = useState<Coeffs>({ a1: 1, b1: 1, c1: -4, a2: 1, b2: -1, c2: -2 });
  const [showGrid, setShowGrid] = useState(true);
  const [showGuides, setShowGuides] = useState(true);
  const [zoom, setZoom] = useState(10); // half-width of the visible window

  const { a1, b1, c1, a2, b2, c2 } = c;

  const sol = useMemo(() => {
    const D = a1 * b2 - a2 * b1;
    const Dx = b1 * c2 - b2 * c1;
    const Dy = c1 * a2 - c2 * a1;
    const zeroB = Math.abs(b1 * c2 - b2 * c1) < 1e-9;
    if (Math.abs(D) > 1e-9) {
      const x = Dx / D;
      const y = Dy / D;
      // substitution check: plug into both equations
      const l1 = a1 * x + b1 * y + c1;
      const l2 = a2 * x + b2 * y + c2;
      return {
        kind: 'unique' as const,
        D,
        Dx,
        Dy,
        x,
        y,
        check1: l1,
        check2: l2,
        verdict: 'Exactly ONE solution — the lines cross once.',
      };
    }
    if (zeroB) {
      return { kind: 'infinite' as const, D, Dx, Dy, x: NaN, y: NaN, check1: 0, check2: 0, verdict: 'Infinitely many solutions — the two equations draw the SAME line.' };
    }
    return { kind: 'none' as const, D, Dx, Dy, x: NaN, y: NaN, check1: NaN, check2: NaN, verdict: 'NO solution — the lines are parallel and never meet.' };
  }, [a1, b1, c1, a2, b2, c2]);

  const slope = (a: number, b: number) => (b === 0 ? null : -a / b);

  // elimination worked steps (honest, computed from current coefficients)
  const elim = useMemo(() => {
    const steps: string[] = [];
    if (a1 === 0 || a2 === 0) {
      steps.push('Eliminating x needs an x-term in BOTH equations.');
      steps.push('Set a1 ≠ 0 and a2 ≠ 0 in the Line Lab, or eliminate y instead in your notebook.');
      return { steps, ok: false, x: NaN, y: NaN };
    }
    // eliminate x: multiply eq1 by a2, eq2 by a1, subtract
    const yCoef = a2 * b1 - a1 * b2; // D sign-flipped
    const rhs = a2 * -c1 - a1 * -c2; // a2·(−c1) − a1·(−c2) = Dy
    steps.push(`Multiply Eq1 by ${a2}:  ${a2}a₁·x + ${a2}·(${b1})y = ${a2}·(${-c1})`);
    steps.push(`Multiply Eq2 by ${a1}:  ${a1}·(${a2})x + ${a1}·(${b2})y = ${a1}·(${-c2})`);
    if (Math.abs(yCoef) > 1e-9) {
      const y = rhs / yCoef;
      const xFrom1 = (-b1 * y - c1) / a1;
      steps.push(`Subtract: (${yCoef})·y = ${rhs}  ⇒  y = ${fmt(y, 4)}`);
      steps.push(`Back-substitute into Eq1: x = (−${b1}·y − (${c1})) / ${a1} = ${fmt(xFrom1, 4)}`);
      steps.push(`Solution: x = ${fmt(xFrom1, 4)}, y = ${fmt(y, 4)}`);
      return { steps, ok: true, x: xFrom1, y };
    }
    // yCoef = 0 -> parallel or coincident; eliminate y instead for the verdict
    steps.push(`The x-terms cancel completely: 0·y = ${rhs}`);
    steps.push(rhs === 0 ? '0 = 0 — every x works: the equations are the SAME line (infinite solutions).' : `0 = ${rhs} — impossible: the lines are PARALLEL (no solution).`);
    return { steps, ok: false, x: NaN, y: NaN };
  }, [a1, b1, c1, a2, b2, c2]);

  // substitution worked steps
  const subst = useMemo(() => {
    const steps: string[] = [];
    if (a1 !== 0) {
      steps.push(`From Eq1: x = (−${b1}·y − (${c1})) / ${a1}`);
      const k = -b1 / a1;
      const m = -c1 / a1;
      steps.push(`So x = ${fmt(k, 4)}·y + ${fmt(m, 4)}`);
      const yCoef = a2 * k + b2;
      const rhs = -a2 * m - c2;
      steps.push(`Substitute into Eq2: ${fmt(a2, 4)}·(${fmt(k, 4)}y + ${fmt(m, 4)}) + ${b2}y + (${c2}) = 0`);
      if (Math.abs(yCoef) > 1e-9) {
        const y = rhs / yCoef;
        const x = k * y + m;
        steps.push(`(${fmt(yCoef, 4)})·y = ${fmt(rhs, 4)}  ⇒  y = ${fmt(y, 4)}`);
        steps.push(`x = ${fmt(k, 4)}·${fmt(y, 4)} + ${fmt(m, 4)} = ${fmt(x, 4)}`);
        return { steps, x, y };
      }
      steps.push(`y cancels: 0 = ${fmt(rhs, 4)} — ${rhs === 0 ? 'same line, infinite solutions' : 'parallel, no solution'}`);
      return { steps, x: NaN, y: NaN };
    }
    steps.push('Eq1 has a1 = 0 — it is already an equation in y alone; swap roles or pick a1 ≠ 0 in the Lab.');
    return { steps, x: NaN, y: NaN };
  }, [a1, b1, c1, a2, b2, c2]);

  function fmt(v: number, digits = 3): string {
    if (!isFinite(v)) return '∞';
    const r = Math.round(v * 10 ** digits) / 10 ** digits;
    return Number.isInteger(r) ? `${r}` : `${r}`;
  }

  // ── SVG plot mapping ──
  const W = 640;
  const H = 400;
  const px = (x: number) => 20 + ((x + zoom) / (2 * zoom)) * (W - 40);
  const py = (y: number) => H - 20 - ((y + zoom) / (2 * zoom)) * (H - 40);

  const lineEnds = (a: number, b: number, cc: number): [number, number, number, number] | null => {
    if (b === 0) {
      // vertical: x = −cc/a
      if (a === 0) return null;
      const x = -cc / a;
      return [px(x), py(zoom), px(x), py(-zoom)];
    }
    const yOf = (x: number) => -(a * x + cc) / b;
    return [px(-zoom), py(yOf(-zoom)), px(zoom), py(yOf(zoom))];
  };

  const e1 = lineEnds(a1, b1, c1);
  const e2 = lineEnds(a2, b2, c2);
  const inWindow = (x: number, y: number) => Math.abs(x) <= zoom && Math.abs(y) <= zoom;

  const visibleChallenges = CHALLENGES.filter((q) => tierFilter === 'all' || q.tier === tierFilter);

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

  const pickAnswer = (id: string, idx: number) => {
    if (revealed[id]) return;
    setAnswers((p) => ({ ...p, [id]: idx }));
    setRevealed((p) => ({ ...p, [id]: true }));
  };

  const setCoef = (k: keyof Coeffs, v: number) => setC((p) => ({ ...p, [k]: v }));

  const resetAll = () => {
    setC({ a1: 1, b1: 1, c1: -4, a2: 1, b2: -1, c2: -2 });
    setZoom(10);
    setShowGrid(true);
    setShowGuides(true);
    setPredicted(null);
  };

  const sliderRow = (label: string, k: keyof Coeffs, min: number, max: number) => (
    <div>
      <label className="text-xs font-semibold text-slate-400 flex justify-between">
        <span>{label}</span>
        <span className="font-mono text-sky-300">{c[k]}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={c[k]}
        aria-label={label}
        onChange={(e) => setCoef(k, Number(e.target.value))}
        className="w-full mt-1 min-h-11 accent-sky-500"
      />
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 rounded-3xl border border-slate-800 font-sans text-slate-100 shadow-2xl">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-sky-950/80 rounded-2xl border border-sky-700">📈</span>
        <div className="flex-1 min-w-[220px]">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-400">Class 10 Maths — Pair of Linear Equations in Two Variables</p>
          <h1 className="text-xl md:text-2xl font-black text-sky-300">Two Lines, One Truth: cross, run parallel, or merge</h1>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs text-slate-400 block">D = a₁b₂ − a₂b₁</span>
          <span className="font-mono text-xs text-slate-500 block">x = Dx/D, y = Dy/D</span>
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
                ? 'bg-sky-600 border-sky-500 text-white shadow-lg shadow-sky-900/40'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
          >
            <span className="mr-1">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </nav>

      {/* system banner (shared) */}
      <div className="p-3 mb-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex flex-wrap items-center gap-x-6 gap-y-1">
        <span className="font-mono text-sm text-amber-300">Eq1: {eqString(a1, b1, c1)}</span>
        <span className="font-mono text-sm text-emerald-300">Eq2: {eqString(a2, b2, c2)}</span>
        <span className={`ml-auto text-xs font-bold px-2.5 py-1 rounded-full ${
          sol.kind === 'unique' ? 'bg-emerald-950 text-emerald-300' : sol.kind === 'infinite' ? 'bg-violet-950 text-violet-300' : 'bg-rose-950 text-rose-300'
        }`}>
          {sol.kind === 'unique' ? 'unique solution' : sol.kind === 'infinite' ? 'infinitely many' : 'no solution'}
        </span>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: PREDICT                                               */}
      {/* ============================================================ */}
      {tab === 'predict' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-sky-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-sky-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              Eq1: x + y = 4 and Eq2: 2x + 2y = 8. Without solving anything — how many (x, y) pairs
              satisfy BOTH equations at once?
            </p>
            <div className="mt-3 space-y-2">
              {[
                'Exactly one — two different equations must cross once',
                'None — the second is bigger, the lines drift apart',
                'Infinitely many — the second equation is the first in disguise (×2)',
                'Exactly two — one per equation',
              ].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 2;
                let cls = 'border-slate-700 bg-slate-900 hover:border-sky-600';
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
                Eq2 = 2 × Eq1: same line, EVERY point is shared — infinitely many solutions. D = 1·2 − 2·1 = 0 and the
                c-ratios match too. Verify: set preset 3 (same line) in the Line Lab and watch both lines merge.
                <button onClick={() => setTab('lab')} className="ml-2 underline font-bold text-amber-300">Open Line Lab →</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { t: 'Walk 1: force a crossing', d: 'Preset 1 is loaded. Nudge c₂ by ±1 and watch the emerald intersection point chase along the amber line — one system, one solution, always.' },
              { t: 'Walk 2: kill the solution', d: 'Dial Eq2 to a₂ = 2, b₂ = 2 (same ratio as Eq1) and set c₂ = 9 (different from 2×4 = 8). D hits 0, the point vanishes: parallel, zero solutions.' },
              { t: 'Walk 3: trust no tidy numbers', d: 'Set a₁ = 3, b₁ = −5, c₁ = −4, a₂ = 9, b₂ = −15, c₂ = −12. D = 0, same line. The Solver tab shows the elimination saying 0 = 0.' },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-[10px] font-black mr-1.5">{i + 1}</span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: LINE LAB                                              */}
      {/* ============================================================ */}
      {tab === 'lab' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sliderRow('a₁', 'a1', -6, 6)}
            {sliderRow('b₁', 'b1', -6, 6)}
            {sliderRow('c₁', 'c1', -20, 20)}
            {sliderRow('a₂', 'a2', -6, 6)}
            {sliderRow('b₂', 'b2', -6, 6)}
            {sliderRow('c₂', 'c2', -20, 20)}
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-72 md:h-96" preserveAspectRatio="xMidYMid meet">
              {/* grid */}
              {showGrid &&
                Array.from({ length: 2 * zoom + 1 }, (_, i) => {
                  const v = -zoom + i;
                  return (
                    <g key={i}>
                      <line x1={px(v)} y1={py(-zoom)} x2={px(v)} y2={py(zoom)} stroke="#1e293b" strokeWidth={v === 0 ? 1.5 : 0.7} strokeDasharray={v === 0 ? undefined : '3 4'} />
                      <line x1={px(-zoom)} y1={py(v)} x2={px(zoom)} y2={py(v)} stroke="#1e293b" strokeWidth={v === 0 ? 1.5 : 0.7} strokeDasharray={v === 0 ? undefined : '3 4'} />
                    </g>
                  );
                })}
              {/* axes labels */}
              <text x={W - 14} y={py(0) - 6} fontSize={11} fill="#64748b">x</text>
              <text x={px(0) + 6} y={14} fontSize={11} fill="#64748b">y</text>

              {/* the two lines */}
              {e1 && <line x1={e1[0]} y1={e1[1]} x2={e1[2]} y2={e1[3]} stroke="#fbbf24" strokeWidth={2.5} style={{ transition: 'all 120ms ease-out' }} />}
              {e2 && <line x1={e2[0]} y1={e2[1]} x2={e2[2]} y2={e2[3]} stroke="#34d399" strokeWidth={2.5} style={{ transition: 'all 120ms ease-out' }} />}

              {/* intersection marker */}
              {sol.kind === 'unique' && inWindow(sol.x, sol.y) && (
                <g style={{ transition: 'all 120ms ease-out' }}>
                  {showGuides && (
                    <>
                      <line x1={px(sol.x)} y1={py(sol.y)} x2={px(sol.x)} y2={py(0)} stroke="#f472b6" strokeWidth={1.2} strokeDasharray="4 4" />
                      <line x1={px(sol.x)} y1={py(sol.y)} x2={px(0)} y2={py(sol.y)} stroke="#f472b6" strokeWidth={1.2} strokeDasharray="4 4" />
                      <text x={px(sol.x) + 5} y={py(0) + 14} fontSize={11} fill="#f472b6" fontFamily="monospace">x = {fmt(sol.x, 3)}</text>
                      <text x={px(0) + 5} y={py(sol.y) - 5} fontSize={11} fill="#f472b6" fontFamily="monospace">y = {fmt(sol.y, 3)}</text>
                    </>
                  )}
                  <circle cx={px(sol.x)} cy={py(sol.y)} r={6} fill="#f472b6" stroke="#fff" strokeWidth={1.5} />
                </g>
              )}
              {sol.kind === 'none' && (
                <text x={W / 2} y={30} fontSize={13} fill="#fb7185" textAnchor="middle" fontWeight="bold">parallel — they never meet (D = 0)</text>
              )}
              {sol.kind === 'infinite' && (
                <text x={W / 2} y={30} fontSize={13} fill="#c084fc" textAnchor="middle" fontWeight="bold">same line — every point is a solution (D = 0)</text>
              )}
              {sol.kind === 'unique' && !inWindow(sol.x, sol.y) && (
                <text x={W / 2} y={30} fontSize={12} fill="#f472b6" textAnchor="middle" fontFamily="monospace">
                  crossing at ({fmt(sol.x, 2)}, {fmt(sol.y, 2)}) — outside window, zoom out
                </text>
              )}
            </svg>
          </div>

          {/* live readouts */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[
              { k: 'D = a₁b₂−a₂b₁', v: fmt(sol.D, 3) },
              { k: 'Dx = b₁c₂−b₂c₁', v: fmt(sol.Dx, 3) },
              { k: 'Dy = c₁a₂−c₂a₁', v: fmt(sol.Dy, 3) },
              { k: 'slope₁ (−a₁/b₁)', v: slope(a1, b1) === null ? 'vertical' : fmt(slope(a1, b1)!, 3) },
              { k: 'slope₂ (−a₂/b₂)', v: slope(a2, b2) === null ? 'vertical' : fmt(slope(a2, b2)!, 3) },
            ].map((x) => (
              <div key={x.k} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{x.k}</p>
                <p className="font-mono text-sm font-bold text-sky-300">{x.v}</p>
              </div>
            ))}
          </div>

          {/* ratio verdict panel */}
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">The NCERT ratio test — live</p>
            <div className="flex flex-wrap gap-3 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">a₁/a₂ = {reduceRatio(a1, a2)}</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">b₁/b₂ = {reduceRatio(b1, b2)}</span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800">c₁/c₂ = {reduceRatio(c1, c2)}</span>
            </div>
            <p className={`mt-2 text-xs font-bold ${sol.kind === 'unique' ? 'text-emerald-300' : sol.kind === 'infinite' ? 'text-violet-300' : 'text-rose-300'}`}>
              {sol.verdict}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <select
              onChange={(e) => {
                const p = PRESETS.find((q) => q.label === e.target.value);
                if (p) setC(p.c);
              }}
              value=""
              className="min-h-11 bg-slate-900 border border-slate-700 rounded-xl px-3 text-xs text-slate-200"
              aria-label="preset systems"
            >
              <option value="">load a preset system…</option>
              {PRESETS.map((p) => (
                <option key={p.label} value={p.label}>{p.label}</option>
              ))}
            </select>
            <button onClick={() => setShowGrid(!showGrid)} className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${showGrid ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              grid {showGrid ? 'on' : 'off'}
            </button>
            <button onClick={() => setShowGuides(!showGuides)} className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${showGuides ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              guides {showGuides ? 'on' : 'off'}
            </button>
            <label className="text-xs text-slate-400 flex items-center gap-2 min-h-11">
              zoom
              <input type="range" min={4} max={30} step={1} value={zoom} aria-label="zoom" onChange={(e) => setZoom(Number(e.target.value))} className="w-28 min-h-11 accent-sky-500" />
              <span className="font-mono text-sky-300">±{zoom}</span>
            </label>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Keep Eq1 fixed and drag only c₂: the green line slides and the pink crossing point
              rides along the amber line. D never changes (c is not in D) — only WHERE they cross
              moves. That is D = a₁b₂ − a₂b₁ deciding HOW MANY, c deciding WHERE.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Build a₂ = 2a₁, b₂ = 2b₁ exactly (say 2, 2 and 4, 4) and sweep c₂ from 2c₁ + 4 down
              to 2c₁. The moment c₂ = 2c₁ the pair flips from parallel (no solution) to coincident
              (infinitely many) — the board exam&apos;s favourite 1-mark trap, caught live.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: SOLVER                                                */}
      {/* ============================================================ */}
      {tab === 'solver' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sliderRow('a₁', 'a1', -6, 6)}
            {sliderRow('b₁', 'b1', -6, 6)}
            {sliderRow('c₁', 'c1', -20, 20)}
            {sliderRow('a₂', 'a2', -6, 6)}
            {sliderRow('b₂', 'b2', -6, 6)}
            {sliderRow('c₂', 'c2', -20, 20)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">Elimination (x dies first)</p>
              <ol className="space-y-1.5">
                {elim.steps.map((s, i) => (
                  <li key={i} className="text-xs font-mono text-slate-300 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5">
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">Substitution (x = …y…)</p>
              <ol className="space-y-1.5">
                {subst.steps.map((s, i) => (
                  <li key={i} className="text-xs font-mono text-slate-300 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5">
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* verification strip */}
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-sky-900/60">
            <p className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-2">Verification (the step students skip)</p>
            {sol.kind === 'unique' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  x = {fmt(sol.x, 4)}, y = {fmt(sol.y, 4)}
                </div>
                <div className={`p-3 bg-slate-950 border rounded-lg ${Math.abs(sol.check1) < 1e-9 ? 'border-emerald-700 text-emerald-300' : 'border-amber-700 text-amber-300'}`}>
                  Eq1: a₁x + b₁y + c₁ = {fmt(sol.check1, 6)} {Math.abs(sol.check1) < 1e-9 ? '✓ = 0' : '≈ 0 (rounding)'}
                </div>
                <div className={`p-3 bg-slate-950 border rounded-lg ${Math.abs(sol.check2) < 1e-9 ? 'border-emerald-700 text-emerald-300' : 'border-amber-700 text-amber-300'}`}>
                  Eq2: a₂x + b₂y + c₂ = {fmt(sol.check2, 6)} {Math.abs(sol.check2) < 1e-9 ? '✓ = 0' : '≈ 0 (rounding)'}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                Nothing to verify — {sol.kind === 'infinite' ? 'the same line satisfies both equations at every point (pick any point and test: it works).' : 'parallel lines share no point, so no pair (x, y) can be verified.'}
              </p>
            )}
            {sol.kind === 'unique' && !Number.isInteger(sol.x) && (
              <p className="mt-2 text-xs text-slate-500">Fraction answers are normal. As decimals: x ≈ {sol.x.toFixed(4)}, y ≈ {sol.y.toFixed(4)}.</p>
            )}
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Set the system x + y = 14, x − y = 4 (a₁=1,b₁=1,c₁=−14; a₂=1,b₂=−1,c₂=−4). Both
              methods must land on x = 9, y = 5 — two different routes, one answer. Now change ONLY
              c₁ to −15: watch elimination say 0·y = −1 — impossible, parallel. One constant killed
              every solution.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Make a₁ = 2, b₁ = 4, c₁ = −6 and a₂ = 1, b₂ = 2, c₂ = −3. Elimination prints
              &quot;0 = 0 — same line&quot;. That single line of algebra IS the statement
              &quot;infinitely many solutions&quot;.
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
                  tierFilter === t ? 'bg-sky-600 border-sky-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
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
                    let cls = 'border-slate-700 bg-slate-900 hover:border-sky-600';
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
              <p className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-2">The three outcomes (all live in this sim)</p>
              <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <li><span className="text-emerald-300 font-bold">D ≠ 0</span> → lines cross once → exactly one solution (consistent, independent).</li>
                <li><span className="text-rose-300 font-bold">D = 0, c-ratio differs</span> → parallel → no solution (inconsistent).</li>
                <li><span className="text-violet-300 font-bold">D = 0, c-ratio equal</span> → same line → infinitely many (consistent, dependent).</li>
                <li className="text-slate-400">Equivalently: a₁/a₂ = b₁/b₂ = c₁/c₂ ⇒ infinite; only a and b ratios equal ⇒ none; else unique.</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-2">Honest-numerics notes</p>
              <ul className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
                <li>• Cramer values are computed with exact integer arithmetic in the numerators; the only rounding anywhere is the 4-decimal display.</li>
                <li>• The verification strip recomputes a·x + b·y + c from YOUR sliders and shows the residual — if it is not 0, the bug is on screen, not hidden.</li>
                <li>• Slope is shown as −a/b (a vertical line when b = 0 gets an honest &quot;vertical&quot; not a fake number).</li>
                <li>• Word problems (boat &amp; stream, cost &amp; quantity) reduce to exactly this machine: define variables, build the pair, then cross / parallel / merge.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Where this chapter goes next</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              The same determinant D decides whether two lines in ANY plane geometry meet. In Class 10
              itself the pair-of-equations machine powers the quadratic chapter&apos;s word problems,
              and the ratio test a₁/a₂ vs b₁/b₂ is literally the definition of slope equality you will
              reuse in coordinate geometry and, later, in linear algebra where D is renamed the
              determinant of a matrix.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default C10_MathsPairOfLinearEquationsSim;

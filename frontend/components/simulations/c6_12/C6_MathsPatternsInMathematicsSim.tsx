'use client';
/**
 * C6_MathsPatternsInMathematicsSim (Class 6 Maths)
 *
 * ONE chapter: Patterns in Mathematics (Ganita Prakash VI, Ch 1).
 * Two live stations, all integer-exact:
 *   • Sequence Lab: 8 famous number sequences drawn as dot pictures.
 *     The difference row under each sequence tells the deep story:
 *     counting/odd/even grow by a CONSTANT step; squares grow by the
 *     odd numbers 3,5,7…; triangular by 2,3,4…; Virahanka by itself!
 *   • Picture Proof: the animated identity 1 + 3 + 5 + … + (2n−1) = n².
 *     Each odd number arrives as an L-shaped gnomon that wraps the
 *     previous square — you WATCH why the sum of odd numbers is a
 *     square, no formula memorised.
 *
 * Deep layout (5 tabs):
 *   1. Predict   -- guess the pattern's secret before measuring it
 *   2. Sequences -- dot pictures + live difference rows
 *   3. Picture Proof -- odd numbers build squares, layer by layer
 *   4. Challenge -- 9 questions in 3 tiers with hints
 *   5. Truths    -- misconception killer + honest summary
 */
import React, { useMemo, useState, useEffect } from 'react';

type TabKey = 'predict' | 'seq' | 'proof' | 'challenge' | 'truths';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'predict', label: '1 · Predict', emoji: '❓' },
  { id: 'seq', label: '2 · Sequence Lab', emoji: '🔵' },
  { id: 'proof', label: '3 · Picture Proof', emoji: '🟨' },
  { id: 'challenge', label: '4 · Challenge', emoji: '🎯' },
  { id: 'truths', label: '5 · Truths', emoji: '🧠' },
];

type SeqKey = 'counting' | 'odd' | 'even' | 'triangular' | 'square' | 'cube' | 'virahanka' | 'powers3';

const SEQUENCES: Record<SeqKey, { label: string; rule: string; term: (n: number) => number }> = {
  counting: { label: 'Counting numbers', rule: '1, 2, 3, 4, …  add 1 each time', term: (n) => n },
  odd: { label: 'Odd numbers', rule: '1, 3, 5, 7, …  add 2 each time', term: (n) => 2 * n - 1 },
  even: { label: 'Even numbers', rule: '2, 4, 6, 8, …  add 2 each time', term: (n) => 2 * n },
  triangular: { label: 'Triangular numbers', rule: '1, 3, 6, 10, …  add the next counting number', term: (n) => (n * (n + 1)) / 2 },
  square: { label: 'Square numbers', rule: '1, 4, 9, 16, …  n × n', term: (n) => n * n },
  cube: { label: 'Cube numbers', rule: '1, 8, 27, …  n × n × n', term: (n) => n * n * n },
  virahanka: { label: 'Virahanka numbers', rule: '1, 1, 2, 3, 5, 8, …  add the TWO previous terms', term: (n) => (n <= 2 ? 1 : virahankaCache(n - 1) + virahankaCache(n - 2)) },
  powers3: { label: 'Powers of 3', rule: '1, 3, 9, 27, …  multiply by 3 each time', term: (n) => Math.pow(3, n - 1) },
};

function virahankaCache(n: number): number {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}

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
    skill: 'Name the sequence',
    question: '1, 3, 6, 10, 15, … is the famous sequence of:',
    options: ['odd numbers', 'square numbers', 'triangular numbers', 'powers of 3'],
    correctIndex: 2,
    explanation:
      'Each term counts dots needed for a growing TRIANGLE: +2, +3, +4, +5… The Sequence Lab draws the dot triangles so the name stops being a memory task.',
    hints: ['Look at the steps: +2, +3, +4, +5.', 'Arrange the dots in rows of 1, 2, 3…', 'Triangular numbers.'],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Constant step',
    question: 'Which sequence grows by the SAME amount at every step?',
    options: ['1, 4, 9, 16 (squares)', '3, 7, 11, 15', '1, 3, 6, 10 (triangular)', '1, 2, 4, 8 (doubling)'],
    correctIndex: 1,
    explanation:
      '3, 7, 11, 15 climbs by +4, +4, +4 — a constant step (an arithmetic pattern). Squares climb +3, +5, +7; triangular +2, +3, +4; doubling doubles. The difference row in the Lab shows every sequence\'s fingerprint.',
    hints: ['Compute each gap between neighbours.', 'Which list keeps its gap identical?', '+4 every time.'],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Virahanka rule',
    question: 'In the Virahanka (Fibonacci) sequence 1, 1, 2, 3, 5, the next term is:',
    options: ['6', '7', '8', '10'],
    correctIndex: 2,
    explanation:
      'Each term is the SUM OF THE TWO BEFORE IT: 3 + 5 = 8. The rule "add the previous two" is why the Sequence Lab shows Virahanka\'s difference row looking like a shifted copy of itself.',
    hints: ['Add the last TWO numbers.', '3 + 5.', '8.'],
  },
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'Odds build squares',
    question: '1 + 3 + 5 + 7 + 9 (the first five odd numbers) equals:',
    options: ['24', '25', '26', '20'],
    correctIndex: 1,
    explanation:
      'Five odd numbers sum to 5² = 25. The Picture Proof tab stacks the five L-shaped gnomons into one 5×5 square — the identity n odd numbers sum to n², seen instead of memorised.',
    hints: ['Count how many odd numbers you are adding.', 'Watch the Picture Proof with 5 layers.', '5² = 25.'],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Between squares',
    question: 'How many numbers lie strictly between 5² = 25 and 6² = 36?',
    options: ['9', '10', '11', '8'],
    correctIndex: 1,
    explanation:
      'From 26 to 35 inclusive: 35 − 26 + 1 = 10. In general there are 2n numbers between n² and (n+1)² — and they split into the even number 2n or the odd pair (2n+1) added. Patterns answer "how many between" instantly.',
    hints: ['List 26 … 35 and count.', 'Count both ends carefully with the +1.', '10 numbers.'],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Triangular splits',
    question: 'Which statement about triangular numbers Tₙ = 1 + 2 + … + n is TRUE?',
    options: [
      'every triangular number is odd',
      'adding two consecutive triangular numbers always gives a SQUARE (T₃ + T₄ = 6 + 10 = 16 = 4²)',
      'triangular numbers never exceed 100',
      'Tₙ grows by a constant amount',
    ],
    correctIndex: 1,
    explanation:
      'Slide one triangle into an upside-down copy and they interlock into an n × (n+1) rectangle — Tₙ + Tₙ₋₁ = n². Try it: 1+3=4, 3+6=9, 6+10=16, 10+15=25 — every one a square. The Sequence Lab lists Tₙ so you can test the claim on many rows.',
    hints: ['Add pairs: T₁+T₂, T₂+T₃, T₃+T₄…', '4, 9, 16, 25 — recognisable?', 'Squares appear every time.'],
  },
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Cube jumps',
    question: 'The gaps between consecutive cubes 1, 8, 27, 64, 125 are 7, 19, 37, 61. The gaps between THOSE gaps are 12, 18, 24. What comes next in that second-gap row?',
    options: ['28', '30', '32', '36'],
    correctIndex: 1,
    explanation:
      'Second differences of cubes rise by 6 each time (12, 18, 24, 30, …) — a beautiful fingerprint: cubes grow "third-degree fast". Set the Lab to cubes and read the two difference rows to verify.',
    hints: ['The second-gap row increases by a constant itself.', '24 + 6.', '30.'],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Same term, two homes',
    question: 'The number 36 appears in which TWO of the Lab\'s sequences (beyond trivial starts)?',
    options: [
      'triangular and square (T₈ = 36 and 6² = 36)',
      'odd and even',
      'powers of 3 and cubes',
      '36 belongs to only one sequence ever',
    ],
    correctIndex: 0,
    explanation:
      'T₈ = 1+2+…+8 = 36 and 6² = 36. Numbers can wear several pattern hats — 36 is both a triangle and a square (the only such numbers are 1, 36, 1225, … an entire research story!). Set the Lab to triangular and slide to n = 8, then squares at n = 6.',
    hints: ['Compute 1+2+…+8.', 'And 6 × 6.', 'Triangular and square.'],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'A fruit seller stacks cans in a triangle: 1 can on top, 2 below it, 3 below that… up to 9 rows. Using patterns, the total cans are, and this number is:',
    options: [
      '45 — a triangular number, T₉',
      '81 — a square number, 9²',
      '90 — double a triangular number',
      '100 — a perfect square',
    ],
    correctIndex: 0,
    explanation:
      '1+2+…+9 = 9 × 10/2 = 45 = T₉. The stack IS the dot-triangle of the Lab with 9 rows. Grocery shelves, bowling pins (10 = T₄), snooker balls (15 = T₅) — triangular numbers are hiding in every shop.',
    hints: ['The stack is 1+2+…+9.', 'n(n+1)/2 with n = 9.', '45, the 9th triangular number.'],
  },
];

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'All number patterns grow by the same step.',
    correction:
      'Only SOME do (1, 2, 3… and 2, 4, 6…). Squares grow by the odd numbers 3, 5, 7; triangular by 2, 3, 4; Virahanka grows by ITSELF. The difference row under each Sequence Lab chart is the pattern\'s fingerprint — always check it before guessing a rule.',
  },
  {
    misconception: 'Patterns are just decoration — they don\'t DO anything.',
    correction:
      'Patterns PREDICT. Knowing 1+3+5+…+(2n−1) = n² tells you instantly that the first 1000 odd numbers sum to 1 000 000 — no adding. Knowing Virahanka\'s rule counts bees in a hive line, petals on flowers and beats in Indian poetry (that is why it is called the Virahanka sequence).',
  },
  {
    misconception: 'Square numbers and odd numbers are unrelated families.',
    correction:
      'They are secretly the SAME story: each square is built by WRAPPING the previous square with the next odd number (the Picture Proof tab draws it). 1, 4, 9, 16 IS 1, 1+3, 1+3+5, 1+3+5+7.',
  },
  {
    misconception: 'The Virahanka sequence starts 1, 2, 3, 5.',
    correction:
      'It starts 1, 1, 2, 3, 5: the second 1 matters because each term adds the TWO before it (1+1=2). Miss the double-one and every later term shifts.',
  },
  {
    misconception: 'If a number is not "in" a famous sequence, patterns don\'t apply to it.',
    correction:
      'Every whole number sits inside patterns many times: 36 is triangular AND square; 8 is even, a cube AND in Virahanka (1,1,2,3,5,8). Sequences are lenses, not clubs — the same number wears different hats in different patterns.',
  },
];

// ─── main component ───

export function C6_MathsPatternsInMathematicsSim() {
  const [tab, setTab] = useState<TabKey>('predict');

  // sequence lab state
  const [seq, setSeq] = useState<SeqKey>('square');
  const [terms, setTerms] = useState(7);
  const [hi, setHi] = useState(7); // highlighted term index
  const [showDots, setShowDots] = useState(true);
  const [showDiffs, setShowDiffs] = useState(true);

  // picture proof state
  const [layers, setLayers] = useState(5);
  const [play, setPlay] = useState(false);
  const [built, setBuilt] = useState(5);

  // predict/challenge/truths
  const [predicted, setPredicted] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  const cfg = SEQUENCES[seq];
  const termList = useMemo(() => Array.from({ length: terms }, (_, i) => cfg.term(i + 1)), [seq, terms]);
  const hiTerm = hi >= 1 && hi <= terms ? termList[hi - 1] : cfg.term(hi);
  const prevTerm = hi >= 2 ? termList[hi - 2] : null;
  const sumAll = termList.reduce((a, b) => a + b, 0);

  // deterministic build animation for the proof
  useEffect(() => {
    setBuilt(layers);
  }, [layers]);
  useEffect(() => {
    if (!play) return;
    let raf = 0;
    let acc = 0;
    const tick = () => {
      acc += 1;
      if (acc >= 30) {
        acc = 0;
        setBuilt((v) => {
          if (v >= layers) {
            setPlay(false);
            return v;
          }
          return v + 1;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, layers]);

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
    setSeq('square');
    setTerms(7);
    setHi(7);
    setShowDots(true);
    setShowDiffs(true);
    setLayers(5);
    setPlay(false);
    setBuilt(5);
    setPredicted(null);
  };

  // dot grid for a term value that is a perfect square (square numbers)
  const isDotFriendly = seq === 'square' || seq === 'counting' || seq === 'even' || seq === 'odd';

  const seqColors: Record<SeqKey, string> = {
    counting: '#38bdf8', odd: '#f59e0b', even: '#34d399', triangular: '#f472b6',
    square: '#a78bfa', cube: '#fb7185', virahanka: '#fbbf24', powers3: '#22d3ee',
  };
  const accent = seqColors[seq];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 rounded-3xl border border-slate-800 font-sans text-slate-100 shadow-2xl">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700">🔵</span>
        <div className="flex-1 min-w-[220px]">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 6 Maths — Patterns in Mathematics</p>
          <h1 className="text-xl md:text-2xl font-black text-gold-300">Sequences You Can See: dots, gaps &amp; gnomons</h1>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs text-slate-400 block">1 + 3 + … + (2n−1) = n²</span>
          <span className="font-mono text-xs text-slate-500 block">Tₙ = n(n+1)/2</span>
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
                ? 'bg-gold-600 border-gold-500 text-white shadow-lg shadow-gold-900/40'
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
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-gold-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gold-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              Add the first five ODD numbers: 1 + 3 + 5 + 7 + 9. Before any arithmetic — which
              &quot;famous&quot; number do you bet the total is?
            </p>
            <div className="mt-3 space-y-2">
              {[
                'A triangular number — odds stack like triangles',
                'A perfect SQUARE — five odds make 5²',
                'A power of 3 — odds love threes',
                'Nothing famous — odd sums stay odd and random',
              ].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 1;
                let cls = 'border-slate-700 bg-slate-900 hover:border-gold-600';
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
                1 + 3 + 5 + 7 + 9 = 25 = 5². The Picture Proof tab SHOWS it: each odd number wraps
                the growing square as an L-shaped layer. Slide layers to 9 — the square becomes 9 × 9
                = 81, the sum of nine odds.
                <button onClick={() => setTab('proof')} className="ml-2 underline font-bold text-amber-300">Open Picture Proof →</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { t: 'Walk 1: read the fingerprints', d: 'Sequence Lab: switch between sequences and read the difference row. Constant row = steady stepper; changing row = a deeper pattern (squares hide the odds!).' },
              { t: 'Walk 2: Virahanka looks in the mirror', d: 'Set Virahanka and read its gaps: 0, 1, 1, 2, 3, … the sequence sees ITSELF in the gaps. That self-similarity is why it appears in sunflowers.' },
              { t: 'Walk 3: triangles to squares', d: 'In triangular numbers check T₄ + T₅ = 10 + 15 = 25. Any consecutive pair makes a square — the Lab gives you the numbers to test it ten times.' },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold-600 text-[10px] font-black mr-1.5">{i + 1}</span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: SEQUENCE LAB                                          */}
      {/* ============================================================ */}
      {tab === 'seq' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(SEQUENCES) as SeqKey[]).map((k) => (
              <button key={k} onClick={() => { setSeq(k); setHi(7); }}
                className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${seq === k ? 'text-white' : 'text-slate-400'}`}
                style={seq === k ? { background: seqColors[k], borderColor: seqColors[k] } : { background: '#0f172a', borderColor: '#1e293b' }}>
                {SEQUENCES[k].label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>terms shown</span>
                <span className="font-mono text-gold-300">{terms}</span>
              </label>
              <input type="range" min={4} max={12} step={1} value={terms} aria-label="terms shown"
                onChange={(e) => { setTerms(Number(e.target.value)); setHi(Math.min(hi, Number(e.target.value))); }}
                className="w-full mt-1 min-h-11 accent-gold-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>highlighted term n</span>
                <span className="font-mono text-gold-300">{hi}</span>
              </label>
              <input type="range" min={1} max={terms} step={1} value={hi} aria-label="highlighted term"
                onChange={(e) => setHi(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-gold-500" />
            </div>
          </div>

          {/* term chips */}
          <div className="flex flex-wrap gap-1.5">
            {termList.map((v, i) => (
              <span key={i}
                className={`px-2.5 py-1 rounded-lg font-mono text-sm border transition-all ${i + 1 === hi ? 'text-white font-bold scale-110' : 'text-slate-300'}`}
                style={i + 1 === hi ? { background: accent, borderColor: accent } : { background: '#0f172a', borderColor: '#1e293b' }}>
                {v}
              </span>
            ))}
          </div>

          {/* dot pictures + difference rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">term bars (height = value)</p>
              <svg viewBox="0 0 560 240" className="w-full h-48 md:h-56" preserveAspectRatio="xMidYMid meet">
                <line x1={20} y1={210} x2={540} y2={210} stroke="#475569" strokeWidth={1.5} />
                {(() => {
                  const maxV = Math.max(...termList, 1);
                  return termList.map((v, i) => {
                    const h = (v / maxV) * 170;
                    const x = 30 + i * ((520 / 12));
                    const isHi = i + 1 === hi;
                    return (
                      <g key={i}>
                        {isDotFriendly && showDots &&
                          Array.from({ length: Math.min(v, 64) }, (_, d) => (
                            <circle key={d} cx={x + 6 + (d % 8) * 3.4} cy={205 - h - 4 - Math.floor(d / 8) * 3.4} r={1.3} fill={accent} opacity={0.65} />
                          ))}
                        <rect x={x} y={210 - h} width={30} height={Math.max(2, h)} rx={4}
                          fill={isHi ? accent : '#1e293b'} stroke={isHi ? '#fff' : '#334155'} strokeWidth={isHi ? 2 : 1}
                          opacity={isHi ? 0.95 : 0.9}
                          style={{ transition: 'all 150ms ease-out' }} />
                        <text x={x + 15} y={206 - h} fontSize={11} fill={isHi ? '#fff' : '#64748b'} textAnchor="middle" fontFamily="monospace">{v}</text>
                        <text x={x + 15} y={228} fontSize={10} fill={isHi ? accent : '#475569'} textAnchor="middle">t{i + 1}</text>
                      </g>
                    );
                  });
                })()}
              </svg>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: `term ${hi}`, v: `${hiTerm}` },
                  { k: 'previous term', v: prevTerm === null ? '—' : `${prevTerm}` },
                  { k: 'gap from previous', v: prevTerm === null ? '—' : `+${hiTerm - prevTerm}` },
                  { k: 'sum of shown terms', v: `${sumAll}` },
                ].map((x) => (
                  <div key={x.k} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{x.k}</p>
                    <p className="font-mono text-sm font-bold text-gold-300">{x.v}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">rule</p>
                <p className="text-xs text-slate-300 leading-relaxed">{cfg.rule}</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">difference row (the fingerprint)</p>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {termList.slice(1).map((v, i) => (
                    <span key={i} className={`px-2 py-0.5 rounded border ${showDiffs ? (v - termList[i] === termList[1] - termList[0] ? 'border-emerald-700 text-emerald-300' : 'border-amber-700 text-amber-300') : 'border-slate-800 text-slate-600'}`}>
                      +{v - termList[i]}
                    </span>
                  ))}
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500">
                  {termList.slice(1).every((v, i) => v - termList[i] === termList[1] - termList[0])
                    ? 'constant gaps — a steady stepper'
                    : 'gaps CHANGE — look for the pattern inside the gaps'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={() => setShowDots(!showDots)} className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${showDots ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              dot crowns {showDots ? 'shown' : 'hidden'}
            </button>
            <button onClick={() => setShowDiffs(!showDiffs)} className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${showDiffs ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              fingerprint colouring {showDiffs ? 'on' : 'off'}
            </button>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Set SQUARE numbers and read the difference row: +3, +5, +7, +9… the ODD numbers
              appear. Then switch to ODD numbers — a constant +2 row. Two famous families, one hiding
              inside the other&#39;s gaps.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Slide the highlighted term on POWERS OF 3: 1, 3, 9, 27, 81… the gaps 2, 6, 18, 54
              each TRIPLE — multiplication patterns show themselves in gaps that grow by the same
              ratio.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: PICTURE PROOF                                         */}
      {/* ============================================================ */}
      {tab === 'proof' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>layers (odd numbers)</span>
                <span className="font-mono text-gold-300">{layers}</span>
              </label>
              <input type="range" min={1} max={9} step={1} value={layers} aria-label="layers"
                onChange={(e) => setLayers(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-gold-500" />
            </div>
            <div className="flex items-end gap-2">
              <button onClick={() => { setBuilt(0); setPlay(true); }} className="min-h-11 px-4 py-2 rounded-xl bg-gold-600 border border-gold-500 text-xs font-bold text-white transition-all">
                ▶ build the square
              </button>
              <button onClick={() => setBuilt(layers)} className="min-h-11 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200">
                show all
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3">
              <svg viewBox="0 0 340 340" className="w-full h-64 md:h-80" preserveAspectRatio="xMidYMid meet">
                {(() => {
                  const cell = Math.min(30, 300 / layers);
                  const ox = (340 - cell * layers) / 2;
                  const oy = 330 - cell * layers;
                  const cells: { x: number; y: number; layer: number }[] = [];
                  for (let L = 1; L <= built; L++) {
                    // gnomon L: new bottom row + right column
                    for (let i = 0; i < L - 1; i++) {
                      cells.push({ x: ox + i * cell, y: oy + (L - 1) * cell, layer: L });
                      cells.push({ x: ox + (L - 1) * cell, y: oy + i * cell, layer: L });
                    }
                    cells.push({ x: ox + (L - 1) * cell, y: oy + (L - 1) * cell, layer: L });
                  }
                  const layerCols = ['#c084fc', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#f472b6', '#f59e0b', '#34d399', '#38bdf8'];
                  return (
                    <g>
                      {cells.map((c, i) => (
                        <rect key={i} x={c.x} y={c.y} width={cell - 2} height={cell - 2} rx={3}
                          fill={layerCols[(c.layer - 1) % layerCols.length]} opacity={0.92}
                          style={{ transition: 'all 120ms ease-out' }} />
                      ))}
                      <text x={170} y={oy - 10} fontSize={12} fill="#e2e8f0" textAnchor="middle" fontFamily="monospace">
                        {built} × {built} = {built * built}
                      </text>
                      <text x={170} y={340} fontSize={10} fill="#64748b" textAnchor="middle">
                        each colour = one odd number wrapped as an L (gnomon)
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">the identity, live</p>
                <p className="font-mono text-sm text-slate-200 leading-relaxed">
                  1 + 3 + … + {2 * built - 1} = {built * built} = {built}²
                </p>
                <p className="font-mono text-xs text-slate-500 mt-1">
                  ({built} odd numbers, sum {built * built})
                </p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">layer ledger</p>
                <div className="space-y-1 font-mono text-xs max-h-52 overflow-y-auto">
                  {Array.from({ length: built }, (_, i) => (
                    <div key={i} className="flex justify-between bg-slate-950 border border-slate-800 rounded-lg px-3 py-1">
                      <span className="text-slate-400">layer {i + 1}: odd number {2 * i + 1}</span>
                      <span className="text-emerald-300">square becomes {(i + 1) * (i + 1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Press ▶ with layers = 6: watch six L-layers wrap into a 6 × 6 square while the
              ledger counts 1, 4, 9, 16, 25, 36. Now predict BEFORE pressing: 9 layers should end at…
              81.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Set layers = 4 and ask the reverse question: 16 − 9 = 7 — the 4th odd number. Every
              difference of consecutive squares IS the odd row. That is the Sequence Lab&#39;s square
              fingerprint, seen from the other side.
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
                  tierFilter === t ? 'bg-gold-600 border-gold-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
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
                    let cls = 'border-slate-700 bg-slate-900 hover:border-gold-600';
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
              <p className="text-xs font-bold text-gold-300 uppercase tracking-wider mb-2">Pattern dictionary (all live in this sim)</p>
              <ul className="text-xs text-slate-300 space-y-1.5 font-mono leading-relaxed">
                <li>counting: 1, 2, 3 … (+1)</li>
                <li>odd / even: +2 steppers</li>
                <li>triangular Tₙ = n(n+1)/2</li>
                <li>squares: n²  (gaps = odd numbers)</li>
                <li>cubes: n³ (2nd gaps rise by 6)</li>
                <li>Virahanka: tₙ = tₙ₋₁ + tₙ₋₂</li>
                <li>powers of 3: ×3 each step</li>
                <li>odds sum to squares: 1+3+…+(2n−1) = n²</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-gold-300 uppercase tracking-wider mb-2">Honest-numerics notes</p>
              <ul className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
                <li>• Every term on screen is integer arithmetic from the rule — no rounding anywhere in this chapter.</li>
                <li>• The green/amber colouring of gap chips is computed per row: a row lights green ONLY when every gap is truly identical.</li>
                <li>• The Picture Proof grid places each gnomon cell at its true square position — the drawing IS the identity.</li>
                <li>• Virahanka terms are computed by iteration, not a closed formula — matching how you&#39;d build them on paper.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Where this chapter goes next</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Constant-gap patterns are exactly the arithmetic progressions of Class 10 (with its own
              sim); the dot triangles become the formulas for sums (Tₙ = n(n+1)/2) used in Class 7
              onwards; Virahanka numbers return in Class 8 algebra and Class 11 as the Fibonacci
              sequence; and &quot;read the gaps&quot; is the analyst&#39;s first move on any data
              table, ever.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default C6_MathsPatternsInMathematicsSim;

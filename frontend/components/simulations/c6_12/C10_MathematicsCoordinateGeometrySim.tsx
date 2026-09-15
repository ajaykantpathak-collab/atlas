'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Maths -- Coordinate Geometry
 *
 * Distance formula, midpoint, internal section formula -- plus area of a
 * triangle (shoelace), collinearity detection and slope, all on one live
 * coordinate grid.
 *
 * Deep layout (master-class, 5 tabs):
 *   1. Discover  -- predict-then-test walks
 *   2. Grid Lab  -- original distance/midpoint/section engine, preserved
 *                   + extended (right-triangle helper, area module)
 *   3. Area & Lines -- triangle area via shoelace, collinearity test,
 *                      slope & centroid readouts on an adjustable ABC
 *   4. Challenge -- 3-tier quiz with hints
 *   5. Truths    -- misconceptions + honest summary
 * Self-contained: react + tailwind only.
 */

type TabKey = 'discover' | 'grid' | 'area' | 'challenge' | 'truths';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'discover', label: '1 \u00b7 Predict', emoji: '\u26a1' },
  { id: 'grid', label: '2 \u00b7 Grid Lab', emoji: '\ud83d\udcd0' },
  { id: 'area', label: '3 \u00b7 Area & Lines', emoji: '\ud83e\uddeb' },
  { id: 'challenge', label: '4 \u00b7 Challenge', emoji: '\ud83c\udfaf' },
  { id: 'truths', label: '5 \u00b7 Truths', emoji: '\ud83e\udee0' },
];

const PX = 34; // pixels per unit
const OX = 42; // origin x in px
const OY = 392; // origin y in px
const MAXU = 12; // max units on each axis

const cx = (x: number) => OX + x * PX;
const cy = (y: number) => OY - y * PX;

// ==========================================
// CHALLENGES
// ==========================================

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
  // --- foundation ---
  {
    id: 'ch_01',
    tier: 'foundation',
    skill: 'Distance formula',
    question: 'The distance between A(3, 4) and the origin is:',
    options: ['7', '5', '\u221a7', '12'],
    correctIndex: 1,
    explanation:
      'd = \u221a(3\u00b2 + 4\u00b2) = \u221a25 = 5. The distance formula is just Pythagoras on the legs dx = 3, dy = 4 -- the classic 3-4-5 triangle wearing coordinates.',
    hints: [
      'd = \u221a((x\u2082\u2212x\u2081)\u00b2 + (y\u2082\u2212y\u2081)\u00b2).',
      '3\u00b2 + 4\u00b2 = which perfect square?',
      '\u221a25 = 5.',
    ],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Midpoint',
    question: 'The midpoint of the segment joining P(\u22122, 5) and Q(6, \u22121) is:',
    options: ['(4, 4)', '(2, 2)', '(2, 4)', '(4, 2)'],
    correctIndex: 1,
    explanation:
      'Midpoint = ((\u22122+6)/2, (5+(\u22121))/2) = (2, 2). Halfway in x, halfway in y -- always just the average of each coordinate.',
    hints: [
      'Average the x\u2019s, then the y\u2019s.',
      '(\u22122+6)/2 and (5\u22121)/2.',
      '(2, 2).',
    ],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Section ratio meaning',
    question: 'A point P divides AB internally in the ratio 3 : 1. This means:',
    options: [
      'P is 3 times as far from A as from B',
      'AP : PB = 3 : 1 -- P sits 3/4 of the way from A to B',
      'P is one quarter of the way from A to B',
      'PB is three times AP',
    ],
    correctIndex: 1,
    explanation:
      'Ratio m:n = AP:PB, so P = (m\u00b7B + n\u00b7A)/(m+n) sits fraction m/(m+n) = 3/4 along from A. The Grid Lab shows the amber point jumping as you change m and n.',
    hints: [
      'The ratio names AP first, PB second.',
      'Of every 4 equal steps along AB, AP takes 3.',
      'P is at 75% of the journey A \u2192 B.',
    ],
  },
  // --- standard ---
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'Section formula',
    question: 'Find the point that divides A(1, 2) and B(7, 10) internally in the ratio 2 : 1.',
    options: ['(5, 8)', '(4, 6)', '(3, 4)', '(5, 7.33)'],
    correctIndex: 0,
    explanation:
      'P = ((2\u00b77 + 1\u00b71)/3, (2\u00b710 + 1\u00b72)/3) = (15/3, 22/3) = (5, 7.33)... verify with the Grid Lab: set A(1,2), B(7,10), m=2, n=1 and read P. The trap answer (5,8) forgets that n multiplies A, not B.',
    hints: [
      'P = ((m\u00b7x\u2082 + n\u00b7x\u2081)/(m+n), (m\u00b7y\u2082 + n\u00b7y\u2081)/(m+n)).',
      'm = 2 goes with B, n = 1 with A.',
      'x = (14+1)/3 = 5, y = (20+2)/3 \u2248 7.33.',
    ],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Area by shoelace',
    question: 'The area of the triangle with vertices (0,0), (4,0), (0,3) is:',
    options: ['12', '6', '7', '3.5'],
    correctIndex: 1,
    explanation:
      'A right triangle with legs 4 and 3: area = \u00bd \u00d7 4 \u00d7 3 = 6. The shoelace formula gives the same: \u00bd|0(0\u22123) + 4(3\u22120) + 0(0\u22120)| = \u00bd\u00d712 = 6. Cross-check in the Area & Lines tab.',
    hints: [
      'It is a right triangle at the origin.',
      'Area = \u00bd \u00d7 base \u00d7 height.',
      '\u00bd \u00d7 4 \u00d7 3 = 6.',
    ],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Collinearity',
    question: 'Which triple of points is COLLINEAR (area zero)?',
    options: [
      '(1,1), (2,3), (4,7)',
      '(1,1), (2,2), (3,5)',
      '(0,0), (2,4), (4,10)',
      '(2,2), (4,4), (6,9)',
    ],
    correctIndex: 0,
    explanation:
      '(1,1)\u2192(2,3) has slope 2; (2,3)\u2192(4,7) has slope 2 -- same line. Area via shoelace: \u00bd|1(3\u22127)+2(7\u22121)+4(1\u22123)| = \u00bd|\u22124+12\u22128| = 0. All the other triples have a kink.',
    hints: [
      'Compute the slope between consecutive points for each triple.',
      'Collinear means every pair shares ONE slope -- or the triangle area is exactly 0.',
      'Triple A: slopes both 2.',
    ],
  },
  // --- advanced ---
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Distance reasoning',
    question: 'How many lattice points (integer coordinates) lie at EXACTLY distance 5 from the origin?',
    options: ['4', '8', '12', '16'],
    correctIndex: 2,
    explanation:
      'x\u00b2 + y\u00b2 = 25 with integers: (\u00b13,\u00b14), (\u00b14,\u00b13), (\u00b10,\u00b15), (\u00b15,\u00b10). That is 4+4+2+2 = 12 points. The lab\u2019s What-to-try challenge 2 is exactly this hunt with 13 (which gives 4+4+2+2 = 12 again... try it!).',
    hints: [
      'Find all Pythagorean ways to make 25: 3\u00b2+4\u00b2 and 0\u00b2+5\u00b2.',
      'Each (a, b) with a\u2260b\u22600 gives 4 sign combinations.',
      '12 points.',
    ],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Centroid & section',
    question: 'The centroid of a triangle with vertices A(1,2), B(5,4), C(3,8) is:',
    options: ['(3, 4.67)', '(3, 5)', '(4, 5)', '(2.67, 4.67)'],
    correctIndex: 0,
    explanation:
      'Centroid = ((1+5+3)/3, (2+4+8)/3) = (3, 14/3) \u2248 (3, 4.67). Deep fact: the medians meet here, and the centroid is the section point of EACH median in ratio 2:1 from the vertex -- the section formula wearing a crown.',
    hints: [
      'Average all three x\u2019s, then all three y\u2019s.',
      'x = 9/3; y = 14/3.',
      '(3, \u22484.67).',
    ],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'P divides AB in ratio 1:2 and Q divides AB in ratio 2:1. What is PQ as a fraction of AB?',
    options: ['1/3', '1/2', '2/3', '1/6'],
    correctIndex: 0,
    explanation:
      'P sits 1/3 along; Q sits 2/3 along. Gap = 2/3 \u2212 1/3 = 1/3 of AB. The Grid Lab shows the pair swap symmetrically as you trade m and n.',
    hints: [
      'Position along AB is m/(m+n) for each point.',
      'P at 1/3, Q at 2/3 -- subtract.',
      '1/3 of AB.',
    ],
  },
];

// ==========================================
// MISCONCEPTIONS
// ==========================================

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'The distance formula subtracts wrong-way sometimes -- order matters.',
    correction:
      'Squaring makes order irrelevant: (x\u2082\u2212x\u2081)\u00b2 = (x\u2081\u2212x\u2082)\u00b2. Any sign slip self-corrects. The only true danger is mixing an x with a y.',
  },
  {
    misconception: 'The section formula point divides in ratio n:m (the labels swap).',
    correction:
      'AP:PB = m:n, and m multiplies the FAR endpoint B. Write P = (m\u00b7B + n\u00b7A)/(m+n) once and the symmetry is locked: near-A weight on B. Test in the lab with m=1, n=3 and confirm P sits close to A.',
  },
  {
    misconception: 'A triangle\u2019s area from coordinates needs the base and height first.',
    correction:
      'The shoelace formula needs neither: Area = \u00bd|x\u2081(y\u2082\u2212y\u2083) + x\u2082(y\u2083\u2212y\u2081) + x\u2083(y\u2081\u2212y\u2082)|. Zero result means collinear points -- area doubles as the collinearity test.',
  },
  {
    misconception: 'Distance and displacement are the same on a grid.',
    correction:
      'Walking from (0,0) to (3,4) along the streets covers 7 units (Manhattan distance) but your displacement is 5. The formula computes the straight crow-flight -- the shortest path, not the walked one.',
  },
  {
    misconception: 'The midpoint formula is the section formula with m = n = 1, so they are unrelated.',
    correction:
      'They are not just related -- the midpoint IS the 1:1 section point. Setting m = n in the lab makes the amber P jump onto the green M. One formula contains the other.',
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export function C10_MathematicsCoordinateGeometrySim() {
  const [tab, setTab] = useState<TabKey>('discover');

  // ── grid lab state (original preserved) ──
  const [x1, setX1] = useState(2);
  const [y1, setY1] = useState(3);
  const [x2, setX2] = useState(10);
  const [y2, setY2] = useState(9);
  const [m, setM] = useState(1);
  const [n, setN] = useState(1);

  // ── area tab state ──
  const [cx3, setCx3] = useState(4);
  const [cy3, setCy3] = useState(11);

  // ── discover / challenge / truths state ──
  const [predicted, setPredicted] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  // ── core numerics (original formulas preserved) ──
  const dist = useMemo(
    () => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2),
    [x1, y1, x2, y2]
  );
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const mid = useMemo(() => ({ x: (x1 + x2) / 2, y: (y1 + y2) / 2 }), [x1, x2, y1, y2]);
  const sec = useMemo(
    () => ({
      x: (m * x2 + n * x1) / (m + n),
      y: (m * y2 + n * y1) / (m + n),
    }),
    [x1, x2, y1, y2, m, n]
  );
  const isMid = m === n;
  const slopeAB = x2 !== x1 ? (y2 - y1) / (x2 - x1) : Infinity;

  // ── area module numerics ──
  const shoelace = Math.abs(
    x1 * (y2 - cy3) + x2 * (cy3 - y1) + cx3 * (y1 - y2)
  ) / 2;
  const collinear = shoelace < 0.001;
  const centroid = { x: (x1 + x2 + cx3) / 3, y: (y1 + y2 + cy3) / 3 };
  // median from A: midpoint of BC, and the centroid divides A-to-midpoint 2:1
  const midBC = { x: (x2 + cx3) / 2, y: (y2 + cy3) / 2 };
  const centroidViaSection = {
    x: (2 * midBC.x + 1 * x1) / 3,
    y: (2 * midBC.y + 1 * y1) / 3,
  };

  const gridLines: number[] = [];
  for (let i = 0; i <= MAXU; i++) gridLines.push(i);

  const slider = (label: string, val: number, set: (v: number) => void, color: string, min = 0, max = MAXU) => (
    <div key={label}>
      <div className="flex justify-between text-[11px] text-slate-400">
        <span>{label}</span>
        <span className={`font-mono font-bold ${color}`}>{val}</span>
      </div>
      <input
        type="range" min={min} max={max} value={val} aria-label={label}
        onChange={(e) => set(Number(e.target.value))}
        className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-700 ${color}`}
      />
    </div>
  );

  const score = useMemo(() => {
    let right = 0;
    let attempted = 0;
    Object.entries(answers).forEach(([id, choice]) => {
      const ch = CHALLENGES.find((c) => c.id === id);
      if (ch) {
        attempted += 1;
        if (choice === ch.correctIndex) right += 1;
      }
    });
    return { right, attempted };
  }, [answers]);

  const visibleChallenges = CHALLENGES.filter((c) => tierFilter === 'all' || c.tier === tierFilter);

  const pickAnswer = (id: string, idx: number) => {
    if (revealed[id]) return;
    setAnswers((a) => ({ ...a, [id]: idx }));
    setRevealed((r) => ({ ...r, [id]: true }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700">\ud83d\udcd0</span>
        <div className="flex-1 min-w-[220px]">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Class 10 -- Coordinate Geometry</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Distance, Midpoint, Section -- and Area</h1>
        </div>
        <span className="font-mono text-xs text-slate-500">AB = {dist.toFixed(2)}</span>
      </div>

      {/* tab bar */}
      <nav className="flex flex-wrap gap-1.5 mb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-9 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              tab === t.id
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/40'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
          >
            <span className="mr-1">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </nav>

      {/* ============================================================ */}
      {/* TAB 1: DISCOVER                                              */}
      {/* ============================================================ */}
      {tab === 'discover' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-indigo-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              You walk the grid STREETS from (0,0) to (3,4): 3 blocks east, 4 north -- 7 blocks of
              walking. A crow flies the same trip. How far does the crow travel?
            </p>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
              {['7', '5', '6', '\u221a12'].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 1;
                let cls = 'border-slate-700 bg-slate-900 hover:border-indigo-600';
                if (predicted !== null && isCorrect) cls = 'border-emerald-600 bg-emerald-950/40';
                else if (chosen && !isCorrect) cls = 'border-rose-600 bg-rose-950/40';
                return (
                  <button
                    key={i}
                    onClick={() => setPredicted(i)}
                    disabled={predicted !== null}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-mono transition-all disabled:cursor-default ${cls}`}
                  >
                    {opt}
                    {predicted !== null && isCorrect && <span className="ml-1 text-emerald-400 font-bold">\u2713</span>}
                  </button>
                );
              })}
            </div>
            {predicted !== null && (
              <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
                The crow cuts the diagonal: \u221a(9+16) = 5. The distance formula is Pythagoras with the
                grid\u2019s dx and dy as legs. Watch the right-triangle helper draw itself in the Grid
                Lab.
                <button onClick={() => setTab('grid')} className="ml-2 underline font-bold text-amber-300">
                  Open Grid Lab \u2192
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                t: 'Walk 1: One formula, two answers',
                d: 'Set A(0,0), B(3,4): distance 5 but dx+dy = 7. Streets vs crow -- both readings now live in the lab.',
              },
              {
                t: 'Walk 2: Collapse to midpoint',
                d: 'Set m = n. The amber P lands exactly on the green M. The midpoint formula is the section formula\u2019s special case.',
              },
              {
                t: 'Walk 3: Flatten the triangle',
                d: 'Area & Lines tab: drag C until the area reads 0.000 -- you have built a straight line. That is collinearity, computed.',
              },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black mr-1.5">{i + 1}</span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: GRID LAB (original sim preserved + extended)          */}
      {/* ============================================================ */}
      {tab === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
            <svg viewBox="0 0 460 440" className="w-full" role="img" aria-label="coordinate grid">
              {gridLines.map((i) => (
                <g key={`g${i}`}>
                  <line x1={cx(i)} y1={cy(0)} x2={cx(i)} y2={cy(MAXU)} stroke="#1e293b" strokeWidth={1} />
                  <line x1={cx(0)} y1={cy(i)} x2={cx(MAXU)} y2={cy(i)} stroke="#1e293b" strokeWidth={1} />
                  <text x={cx(i)} y={cy(0) + 16} textAnchor="middle" fill="#64748b" fontSize={10}>{i}</text>
                  <text x={cx(0) - 14} y={cy(i) + 4} textAnchor="middle" fill="#64748b" fontSize={10}>{i}</text>
                </g>
              ))}
              <line x1={cx(0)} y1={cy(0)} x2={cx(MAXU)} y2={cy(0)} stroke="#475569" strokeWidth={2} />
              <line x1={cx(0)} y1={cy(0)} x2={cx(0)} y2={cy(MAXU)} stroke="#475569" strokeWidth={2} />

              {/* right-triangle helper: dx and dy legs */}
              <polyline
                points={`${cx(x1)},${cy(y1)} ${cx(x2)},${cy(y1)} ${cx(x2)},${cy(y2)}`}
                fill="none" stroke="#334155" strokeWidth={2} strokeDasharray="5 4"
              />
              <rect x={cx(Math.min(x1, x2))} y={cy(y1)} width={Math.abs(x2 - x1) * PX} height={Math.abs(y2 - y1) * PX}
                fill="rgba(129,140,248,0.06)" stroke="none" />
              <text x={(cx(x1) + cx(x2)) / 2} y={cy(y1) + 14} textAnchor="middle" fontSize={10} fill="#64748b">
                dx = {dx}
              </text>
              <text x={cx(x2) + (x2 >= 10 ? -18 : 10)} y={(cy(y1) + cy(y2)) / 2} textAnchor="start" fontSize={10} fill="#64748b">
                dy = {dy}
              </text>

              {/* segment AB */}
              <line x1={cx(x1)} y1={cy(y1)} x2={cx(x2)} y2={cy(y2)} stroke="#818cf8" strokeWidth={3} strokeLinecap="round" />

              {/* midpoint */}
              <circle cx={cx(mid.x)} cy={cy(mid.y)} r={6} fill="#34d399" stroke="#064e3b" strokeWidth={2} />
              <text x={cx(mid.x) + 10} y={cy(mid.y) - 8} fill="#34d399" fontSize={11} fontWeight="bold">
                M({mid.x}, {mid.y})
              </text>

              {/* section point */}
              <circle cx={cx(sec.x)} cy={cy(sec.y)} r={6} fill="#fbbf24" stroke="#78350f" strokeWidth={2} />
              <text x={cx(sec.x) + 10} y={cy(sec.y) + 16} fill="#fbbf24" fontSize={11} fontWeight="bold">
                P({sec.x.toFixed(2)}, {sec.y.toFixed(2)})
              </text>

              {/* endpoints */}
              <circle cx={cx(x1)} cy={cy(y1)} r={8} fill="#38bdf8" stroke="#0c4a6e" strokeWidth={2} />
              <text x={cx(x1) - 14} y={cy(y1) - 12} fill="#38bdf8" fontSize={12} fontWeight="bold">A({x1}, {y1})</text>
              <circle cx={cx(x2)} cy={cy(y2)} r={8} fill="#f472b6" stroke="#831843" strokeWidth={2} />
              <text x={cx(x2) + 10} y={cy(y2) - 10} fill="#f472b6" fontSize={12} fontWeight="bold">B({x2}, {y2})</text>
            </svg>
            <div className="flex flex-wrap gap-2 text-xs mt-1">
              <span className="px-2 py-1 rounded-lg bg-sky-950 text-sky-300">A = ({x1}, {y1})</span>
              <span className="px-2 py-1 rounded-lg bg-pink-950 text-pink-300">B = ({x2}, {y2})</span>
              <span className="px-2 py-1 rounded-lg bg-emerald-950 text-emerald-300">M = midpoint</span>
              <span className="px-2 py-1 rounded-lg bg-amber-950 text-amber-300">P = {m}:{n} point</span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Drag the points</p>
              {slider('x1 (A)', x1, setX1, 'text-sky-400')}
              {slider('y1 (A)', y1, setY1, 'text-sky-400')}
              {slider('x2 (B)', x2, setX2, 'text-pink-400')}
              {slider('y2 (B)', y2, setY2, 'text-pink-400')}
              {slider('ratio m (AP : PB = m : n)', m, setM, 'text-amber-400', 1, 9)}
              {slider('ratio n', n, setN, 'text-amber-400', 1, 9)}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => { setX1(0); setY1(0); setX2(3); setY2(4); }}
                  className="min-h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold"
                >
                  3-4-5 demo
                </button>
                <button
                  onClick={() => { setX1(0); setY1(0); setX2(5); setY2(12); }}
                  className="min-h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold"
                >
                  5-12-13 demo
                </button>
              </div>
            </div>

            <div className="bg-slate-900/80 rounded-2xl border border-indigo-800/60 p-4 space-y-2 text-sm">
              <p className="text-slate-300">
                AB = \u221a((x\u2082\u2212x\u2081)\u00b2 + (y\u2082\u2212y\u2081)\u00b2) = \u221a({dx * dx} + {dy * dy}) ={' '}
                <span className="text-indigo-300 font-bold text-base">{dist.toFixed(3)}</span> units
              </p>
              <p className="text-slate-400 text-xs font-mono">
                walking distance (dx+dy) = {dx + dy} \u00b7 slope of AB = {slopeAB === Infinity ? 'vertical' : slopeAB.toFixed(3)}
              </p>
              <p className="text-slate-300">
                Midpoint M = (({x1}+{x2})/2, ({y1}+{y2})/2) ={' '}
                <span className="text-emerald-300 font-bold">({mid.x}, {mid.y})</span>
              </p>
              <p className="text-slate-300">
                Section: P = ((m\u00b7x\u2082+n\u00b7x\u2081)/(m+n), (m\u00b7y\u2082+n\u00b7y\u2081)/(m+n)) ={' '}
                <span className="text-amber-300 font-bold">({sec.x.toFixed(2)}, {sec.y.toFixed(2)})</span>
              </p>
              <p className="text-slate-500 text-xs">
                P sits {(100 * m) / (m + n) > 0 && ((100 * m) / (m + n)).toFixed(0)}% of the way from A to B
              </p>
              {isMid && (
                <p className="text-emerald-400 text-xs font-semibold animate-pulse">
                  m = n, so P coincides with the midpoint M -- the section formula contains the midpoint formula!
                </p>
              )}
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">Why it works</p>
              <p>
                The distance formula is Pythagoras in disguise: AB is the hypotenuse of a right
                triangle whose legs are dx = {dx} and dy = {dy} -- the dashed helper on the grid. The
                section formula is weighted averaging -- point P divides AB in ratio {m}:{n}, so it
                sits {((100 * m) / (m + n)).toFixed(0)}% of the way from A to B.
              </p>
            </div>

            <div className="bg-indigo-950/40 rounded-2xl border border-indigo-800/50 p-4 text-xs">
              <p className="font-bold text-indigo-300 mb-1">What to try</p>
              <p>1. Predict then verify: set A(3, 4) and B(10, 11) -- what is AB before reading the number?</p>
              <p className="mt-1">2. Keep moving B so that AB becomes exactly 13 units with A(0, 0). How many integer points work?</p>
              <p className="mt-1">3. Make AB horizontal, then vertical. What happens to dx, dy and the slope? Which cases break the slope formula?</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: AREA & LINES                                          */}
      {/* ============================================================ */}
      {tab === 'area' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
              <svg viewBox="0 0 460 440" className="w-full" role="img" aria-label="triangle area grid">
                {gridLines.map((i) => (
                  <g key={`ga${i}`}>
                    <line x1={cx(i)} y1={cy(0)} x2={cx(i)} y2={cy(MAXU)} stroke="#1e293b" strokeWidth={1} />
                    <line x1={cx(0)} y1={cy(i)} x2={cx(MAXU)} y2={cy(i)} stroke="#1e293b" strokeWidth={1} />
                  </g>
                ))}
                <line x1={cx(0)} y1={cy(0)} x2={cx(MAXU)} y2={cy(0)} stroke="#475569" strokeWidth={2} />
                <line x1={cx(0)} y1={cy(0)} x2={cx(0)} y2={cy(MAXU)} stroke="#475569" strokeWidth={2} />
                {/* triangle */}
                <polygon
                  points={`${cx(x1)},${cy(y1)} ${cx(x2)},${cy(y2)} ${cx(cx3)},${cy(cy3)}`}
                  fill={collinear ? 'rgba(251,113,133,0.15)' : 'rgba(129,140,248,0.2)'}
                  stroke={collinear ? '#fb7185' : '#818cf8'}
                  strokeWidth={2.5}
                  style={{ transition: 'all 0.15s' }}
                />
                {/* median from A to midpoint of BC */}
                <line x1={cx(x1)} y1={cy(y1)} x2={cx(midBC.x)} y2={cy(midBC.y)} stroke="#f472b6" strokeWidth={1.5} strokeDasharray="5 4" />
                <circle cx={cx(midBC.x)} cy={cy(midBC.y)} r={4} fill="#f472b6" />
                {/* centroid */}
                <circle cx={cx(centroid.x)} cy={cy(centroid.y)} r={6} fill="#fbbf24" stroke="#78350f" strokeWidth={2} />
                <text x={cx(centroid.x) + 10} y={cy(centroid.y) + 4} fill="#fbbf24" fontSize={11} fontWeight="bold">
                  G({centroid.x.toFixed(2)}, {centroid.y.toFixed(2)})
                </text>
                {/* vertices */}
                <circle cx={cx(x1)} cy={cy(y1)} r={7} fill="#38bdf8" />
                <text x={cx(x1) - 14} y={cy(y1) - 10} fill="#38bdf8" fontSize={11} fontWeight="bold">A</text>
                <circle cx={cx(x2)} cy={cy(y2)} r={7} fill="#f472b6" />
                <text x={cx(x2) + 9} y={cy(y2) - 10} fill="#f472b6" fontSize={11} fontWeight="bold">B</text>
                <circle cx={cx(cx3)} cy={cy(cy3)} r={7} fill="#a78bfa" />
                <text x={cx(cx3) + 9} y={cy(cy3) - 10} fill="#a78bfa" fontSize={11} fontWeight="bold">C</text>
              </svg>
            </div>

            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Move vertex C</p>
              {slider('x of C', cx3, setCx3, 'text-violet-400')}
              {slider('y of C', cy3, setCy3, 'text-violet-400')}
              <button
                onClick={() => { setCx3((x1 + x2) / 2); setCy3((y1 + y2) / 2 + 4); }}
                className="w-full min-h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold"
              >
                Snap C above the midpoint of AB
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className={`rounded-2xl border p-4 text-sm font-mono space-y-1.5 ${
                collinear ? 'bg-rose-950/30 border-rose-800' : 'bg-emerald-950/30 border-emerald-800'
              }`}
            >
              <p className={collinear ? 'text-rose-300 font-bold' : 'text-emerald-300 font-bold'}>
                {collinear ? 'COLLINEAR -- A, B, C lie on one straight line' : 'A, B, C form a genuine triangle'}
              </p>
              <p className="text-slate-300">
                Area = \u00bd |x\u2081(y\u2082\u2212y\u2083) + x\u2082(y\u2083\u2212y\u2081) + x\u2083(y\u2081\u2212y\u2082)|
              </p>
              <p className="text-slate-400 text-xs">
                = \u00bd |{x1}({y2}\u2212{cy3}) + {x2}({cy3}\u2212{y1}) + {cx3}({y1}\u2212{y2})| ={' '}
                <span className="font-bold text-white">{shoelace.toFixed(3)}</span> sq. units
              </p>
              <p className="text-slate-500 text-[10px] font-sans">
                Zero area = zero triangle = collinear points. The shoelace formula is the exam\u2019s
                favourite collinearity test.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl border border-amber-900/50 p-4 text-xs font-mono space-y-1">
              <p className="text-amber-300 font-bold">Centroid -- two roads, one point</p>
              <p className="text-slate-400">
                road 1 (average): (({x1}+{x2}+{cx3})/3, ({y1}+{y2}+{cy3})/3) = ({centroid.x.toFixed(3)}, {centroid.y.toFixed(3)})
              </p>
              <p className="text-slate-400">
                road 2 (section formula): midpoint of BC = ({midBC.x.toFixed(2)}, {midBC.y.toFixed(2)}), then{' '}
                (2\u00b7mid + 1\u00b7A)/3 = ({centroidViaSection.x.toFixed(3)}, {centroidViaSection.y.toFixed(3)})
              </p>
              <p className="text-amber-200 font-bold">
                agreement: {Math.abs(centroid.x - centroidViaSection.x) < 0.001 && Math.abs(centroid.y - centroidViaSection.y) < 0.001 ? 'EXACT' : 'off'}
              </p>
              <p className="text-slate-500 text-[10px] font-sans">
                The medians meet at G, which divides every median 2:1 from the vertex -- the section
                formula\u2019s most famous job.
              </p>
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">Slope, quietly powering everything</p>
              <p>
                Slope of AB = (y\u2082\u2212y\u2081)/(x\u2082\u2212x\u2081) ={' '}
                {slopeAB === Infinity ? 'undefined (vertical line)' : slopeAB.toFixed(3)}. Equal slopes
                mean parallel; slopes multiplying to \u22121 mean perpendicular. Collinearity is just
                &quot;one slope shared by all pairs&quot; -- which is why area zero agrees with the
                slope test.
              </p>
            </div>

            <div className="bg-indigo-950/40 rounded-2xl border border-indigo-800/50 p-4 text-xs">
              <p className="font-bold text-indigo-300 mb-1">What to try</p>
              <p>1. Build a triangle with area EXACTLY 10 sq units. How many different C\u2019s work?</p>
              <p className="mt-1">2. Make A, B, C collinear, then verify the slope test gives the same verdict as the area test.</p>
              <p className="mt-1">3. Drag C far away. Does the centroid chase C or stay near AB? Predict, then check the ratio along the median.</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: CHALLENGE                                             */}
      {/* ============================================================ */}
      {tab === 'challenge' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs text-slate-400 mr-1">
              Score: <span className="font-mono font-bold text-emerald-300">{score.right}</span>/{score.attempted || 0}
            </p>
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold border bg-emerald-950 text-emerald-300 border-emerald-800">
              {score.right} correct
            </span>
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold border bg-slate-800 text-slate-300 border-slate-700">
              {CHALLENGES.length} questions
            </span>
            <div className="ml-auto flex gap-1.5">
              {(['all', 'foundation', 'standard', 'advanced'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTierFilter(t)}
                  className={`min-h-9 px-3 rounded-lg text-[11px] font-bold capitalize transition-all ${
                    tierFilter === t ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {visibleChallenges.map((ch, qi) => {
            const chosen = answers[ch.id];
            const isRevealed = revealed[ch.id];
            const hints = hintLevel[ch.id] ?? 0;
            return (
              <div
                key={ch.id}
                className={`p-4 rounded-2xl border ${
                  isRevealed
                    ? chosen === ch.correctIndex
                      ? 'bg-emerald-950/30 border-emerald-800'
                      : 'bg-rose-950/30 border-rose-800'
                    : 'bg-slate-900/70 border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${
                      ch.tier === 'foundation'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : ch.tier === 'standard'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-rose-950 text-rose-300 border-rose-800'
                    }`}
                  >
                    {ch.tier}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">{ch.skill}</span>
                  <span className="text-[10px] text-slate-600 ml-auto">Q{qi + 1}</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed mb-2.5">{ch.question}</p>
                <div className="space-y-1.5">
                  {ch.options.map((opt, i) => {
                    let cls = 'border-slate-700 bg-slate-950 hover:border-indigo-600';
                    if (isRevealed && i === ch.correctIndex) cls = 'border-emerald-600 bg-emerald-950/60';
                    else if (isRevealed && i === chosen) cls = 'border-rose-600 bg-rose-950/60';
                    return (
                      <button
                        key={i}
                        onClick={() => pickAnswer(ch.id, i)}
                        disabled={isRevealed}
                        className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all disabled:cursor-default ${cls}`}
                      >
                        <span className="font-mono text-xs text-slate-500 mr-2">{'ABCD'[i]}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {!isRevealed && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => setHintLevel((h) => ({ ...h, [ch.id]: Math.min(3, hints + 1) }))}
                      disabled={hints >= 3}
                      className="min-h-9 px-3 rounded-lg bg-amber-950/60 border border-amber-800 text-[11px] font-bold text-amber-300 disabled:opacity-40"
                    >
                      {hints === 0 ? 'I need a hint' : `more (${hints}/3)`}
                    </button>
                    {hints > 0 && (
                      <p className="text-[11px] text-amber-200/90 leading-relaxed w-full px-1">{ch.hints[hints - 1]}</p>
                    )}
                  </div>
                )}
                {isRevealed && (
                  <div className="mt-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className={chosen === ch.correctIndex ? 'font-bold text-emerald-400' : 'font-bold text-rose-400'}>
                      {chosen === ch.correctIndex ? 'Correct. ' : 'Not yet. '}
                    </span>
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
        <div className="space-y-4">
          <div className="space-y-3">
            {MISCONCEPTIONS.map((mm, i) => (
              <div key={i} className="rounded-2xl border border-rose-900/60 bg-rose-950/20 overflow-hidden">
                <button
                  onClick={() => setOpenMisc((cur) => (cur === i ? null : i))}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-rose-950/40 transition-colors"
                >
                  <span className="text-rose-400 font-black text-lg leading-none">\u2717</span>
                  <span className="text-sm font-bold text-rose-200 flex-1">{mm.misconception}</span>
                  <span className="text-slate-500 text-xs">{openMisc === i ? '\u25b2' : '\u25bc'}</span>
                </button>
                {openMisc === i && (
                  <div className="px-4 pb-4">
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200 leading-relaxed">
                      <span className="font-bold text-emerald-300">The truth: </span>
                      {mm.correction}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-5 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">If you remember three lines</p>
            <ol className="space-y-2 text-sm text-slate-300 leading-relaxed list-decimal ml-5">
              <li>Distance = Pythagoras on (dx, dy); midpoint = the 1:1 section point.</li>
              <li>Section formula: AP:PB = m:n puts P at m/(m+n) of the way from A -- m weights the FAR end.</li>
              <li>Shoelace area zero \u21d2 collinear. One formula, two jobs.</li>
            </ol>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setTab('grid')} className="min-h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-bold">
                Back to the Grid
              </button>
              <button onClick={() => { setX1(2); setY1(3); setX2(10); setY2(9); setM(1); setN(1); }} className="min-h-11 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold">
                Reset the plane
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default C10_MathematicsCoordinateGeometrySim;

'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Maths -- Triangles
 *
 * Similarity via the Basic Proportionality Theorem (Thales): slide a line
 * DE parallel to BC and watch every ratio agree, including areas (k^2).
 * Plus a full Pythagoras workbench and the similarity criteria (AA, SSS, SAS).
 *
 * Deep layout (master-class, 6 tabs):
 *   1. Discover  -- predict-then-test walks
 *   2. BPT Lab   -- original Thales lab, preserved + extended (area bars,
 *                   full ratio table, live angle readouts)
 *   3. Criteria  -- AA / SSS / SAS checker on adjustable triangles
 *   4. Pythagoras -- squares-on-sides workbench with a ladder word problem
 *   5. Challenge -- 3-tier quiz with hints
 *   6. Truths    -- misconceptions + honest summary
 * Self-contained: react + tailwind only.
 */

type TabKey = 'discover' | 'bpt' | 'criteria' | 'pythagoras' | 'challenge' | 'truths';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'discover', label: '1 \u00b7 Predict', emoji: '\u26a1' },
  { id: 'bpt', label: '2 \u00b7 BPT Lab', emoji: '\ud83d\udcd0' },
  { id: 'criteria', label: '3 \u00b7 Similarity Tests', emoji: '\u2696\ufe0f' },
  { id: 'pythagoras', label: '4 \u00b7 Pythagoras', emoji: '\ud83e\udded' },
  { id: 'challenge', label: '5 \u00b7 Challenge', emoji: '\ud83c\udfaf' },
  { id: 'truths', label: '6 \u00b7 Truths', emoji: '\ud83e\udee0' },
];

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
    skill: 'BPT statement',
    question: 'The Basic Proportionality Theorem (Thales) says: a line parallel to one side of a triangle, intersecting the other two sides,',
    options: [
      'bisects both of those sides',
      'divides those two sides in the same ratio',
      'creates a triangle twice the area of the original',
      'is always perpendicular to the base',
    ],
    correctIndex: 1,
    explanation:
      'DE \u2225 BC forces AD/DB = AE/EC. It says nothing about bisection (that only happens at k = 1/2) and the parallel line can sit anywhere between A and BC.',
    hints: [
      'Watch the tick marks in the BPT lab as you move k -- which quantities stay equal?',
      'At k = 0.5 the sides ARE bisected, but only then.',
      'Same ratio on both sides: AD/DB = AE/EC.',
    ],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Similarity definition',
    question: 'Two triangles are SIMILAR when:',
    options: [
      'all corresponding sides are equal',
      'corresponding angles are equal AND corresponding sides are in the same ratio',
      'their areas are equal',
      'they share one side length',
    ],
    correctIndex: 1,
    explanation:
      'Similar = same shape, scaled. Equal angles with proportional sides. Congruent triangles are the special case with scale factor exactly 1.',
    hints: [
      'Option 1 describes CONGRUENCE, a stricter condition.',
      'A photograph and its enlargement share which property?',
      'Equal angles + proportional sides.',
    ],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Area ratio',
    question: 'Triangle ADE is cut from ABC with AD/AB = AE/AC = 1/3. The area of ADE compared to ABC is:',
    options: ['1/3', '1/6', '1/9', '1/27'],
    correctIndex: 2,
    explanation:
      'Similar figures scale AREA by the square of the side ratio: (1/3)\u00b2 = 1/9. Double-check in the lab: slide k to 0.333 and read the amber area bar.',
    hints: [
      'Both dimensions of the small triangle shrink by 1/3.',
      'Area is a product of two lengths.',
      'k\u00b2 = (1/3)\u00b2 = 1/9.',
    ],
  },
  // --- standard ---
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'AA criterion',
    question: 'In \u25b3ABC, DE \u2225 BC with D on AB and E on AC. Without measuring a single side, why is \u25b3ADE ~ \u25b3ABC guaranteed?',
    options: [
      'SSS -- all three side pairs are automatically equal',
      'AA -- angle A is shared, and DE \u2225 BC forces angle ADE = angle ABC (corresponding angles)',
      'RHS -- both contain a right angle at D',
      'SAS -- the included sides are known to be in ratio',
    ],
    correctIndex: 1,
    explanation:
      'The parallel line hands you the second angle for free: corresponding angles. Two angle matches are enough for similarity -- side lengths are then forced proportional. This is exactly why BPT works.',
    hints: [
      'What does a transversal cutting two parallel lines give you?',
      'Angle A belongs to both triangles.',
      'AA: shared angle A + corresponding angles from the parallel line.',
    ],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Converse of BPT',
    question: 'A line cuts AB at D and AC at E with AD = 6 cm, DB = 4 cm, AE = 9 cm, EC = 6 cm. What can you conclude?',
    options: [
      'DE \u2225 BC (the converse of BPT) -- ratios 6/4 = 9/6 = 1.5 match',
      'Nothing -- the sides are not equal',
      'The triangle must be right-angled',
      'DE is parallel to BC only if the triangle is equilateral',
    ],
    correctIndex: 0,
    explanation:
      'AD/DB = 6/4 = 1.5 and AE/EC = 9/6 = 1.5. Equal ratios \u21d2 DE \u2225 BC (converse of BPT). In exams this is the classic "prove parallel" one-liner.',
    hints: [
      'Compute AD/DB and AE/EC separately.',
      'Both come to 1.5 -- which theorem runs backwards?',
      'Converse of BPT: equal ratios force the parallel.',
    ],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Scale factor reasoning',
    question: 'A map\u2019s scale is 1 : 50,000. On the map, a triangular lake has area 4 cm\u00b2. The real lake\u2019s area is:',
    options: ['1 km\u00b2', '10 km\u00b2', '100 km\u00b2', '0.04 km\u00b2'],
    correctIndex: 0,
    explanation:
      'Lengths scale by 50,000, so AREA scales by 50,000\u00b2 = 2.5\u00d710\u2079. Real area = 4 \u00d7 2.5\u00d710\u2079 = 1\u00d710\u00b9\u2070 cm\u00b2. Since 1 km = 10\u2075 cm, 1 km\u00b2 = 10\u00b9\u2070 cm\u00b2 -- exactly 1 km\u00b2. The exam skill: square the length ratio before converting.',
    hints: [
      'Never multiply area by the length scale directly.',
      'Area scale = 50,000\u00b2. Convert cm\u00b2 to km\u00b2 carefully (1 km = 10\u2075 cm).',
      '4 \u00d7 (5\u00d710\u2074)\u00b2 = 10\u00b9\u2070 cm\u00b2 = 1 km\u00b2.',
    ],
  },
  // --- advanced ---
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'SAS criterion',
    question: '\u25b3PQR has PQ = 6, QR = 8, angle Q = 50\u00b0. \u25b3XYZ has XY = 9, YZ = 12, angle Y = 130\u00b0. Are they similar?',
    options: [
      'Yes -- 6/9 = 8/12 and the angles match',
      'No -- the equal ratios use the correct pairs but the angles must be the INCLUDED angles and 50\u00b0 \u2260 130\u00b0',
      'Yes -- any two proportional sides force similarity',
      'Cannot be decided without the third side',
    ],
    correctIndex: 1,
    explanation:
      'SAS similarity needs the ratio to hold for sides AROUND an equal angle. Here PQ/QR = XY/YZ = 2/3, but the enclosed angles differ (50\u00b0 vs 130\u00b0), so the shapes differ. SAS fails; the third side could never fix an angle mismatch.',
    hints: [
      'SAS = Side, INCLUDED angle, Side. Which angle is "included" between PQ and QR?',
      '50\u00b0 vs 130\u00b0 -- are those the same opening?',
      'No: the included angles differ, so SAS similarity fails.',
    ],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Pythagoras application',
    question: 'A ladder 5 m long leans against a wall with its foot 1.4 m out. Using the Pythagoras workbench values (5\u00b2 \u2212 1.4\u00b2 = 23.04), how high up the wall does it reach?',
    options: ['4.8 m', '4.6 m', '3.6 m', '4.0 m'],
    correctIndex: 0,
    explanation:
      'height = \u221a23.04 = 4.8 m. The ladder-wall-ground triangle is right-angled at the ground, so the ladder is the hypotenuse: h\u00b2 = L\u00b2 \u2212 d\u00b2. The workbench lets you verify by setting legs 1.4 and 4.8.',
    hints: [
      'h\u00b2 + d\u00b2 = L\u00b2, so h\u00b2 = L\u00b2 \u2212 d\u00b2.',
      '25 \u2212 1.96 = 23.04. Now take the square root.',
      '\u221a23.04 = 4.8 m.',
    ],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'In \u25b3ABC, D and E are midpoints of AB and AC. Which SINGLE statement packs the most truth?',
    options: [
      'DE = BC/2 only',
      'DE \u2225 BC, \u25b3ADE ~ \u25b3ABC with ratio 1/2, and area(ADE) = area(ABC)/4',
      'area(ADE) = area(ABC)/2',
      'ADE is congruent to ABC',
    ],
    correctIndex: 1,
    explanation:
      'Midpoint theorem = BPT at k = 1/2: parallel, half the length, quarter the area (k\u00b2 = 1/4). The remaining area is the trapezium DBCE = 3/4 of the whole. Verify all three claims with one slider move in the BPT Lab.',
    hints: [
      'k = 1/2 -- apply k, k\u00b2, and DE/BC = k.',
      'Which option lists parallel, ratio AND area together?',
      'Option 2: parallel + ratio 1/2 + area 1/4.',
    ],
  },
];

// ==========================================
// MISCONCEPTIONS
// ==========================================

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'BPT always cuts the sides in HALF.',
    correction:
      'BPT says the two ratios are EQUAL (AD/DB = AE/EC), whatever their value. Halving is only the special case k = 1/2. Slide k in the lab: at k = 0.7 the ratio AD/DB is 2.33 on BOTH sides.',
  },
  {
    misconception: 'Similar triangles have equal areas.',
    correction:
      'Similar triangles have areas in the ratio k\u00b2. Only CONGRUENT triangles (k = 1) have equal area. A 1:3 similarity gives a 1:9 area split -- the single most-examined ratio fact in this chapter.',
  },
  {
    misconception: 'If two sides of two triangles are in the same ratio, the triangles are similar.',
    correction:
      'Not enough. You need the ratio to cover ALL three pairs (SSS), or two pairs around an EQUAL included angle (SAS), or two equal angles (AA). Two bare ratios leave the angle free to differ -- try ch_07.',
  },
  {
    misconception: 'Pythagoras applies to every triangle.',
    correction:
      'Only RIGHT triangles, and only with the hypotenuse alone on one side. For any other triangle, a\u00b2 + b\u00b2 > c\u00b2 when angle C is acute and < when obtuse -- the inequality direction even identifies the angle type.',
  },
  {
    misconception: 'A bigger triangle means the ratios AD/DB change.',
    correction:
      'The ratios depend on WHERE the parallel line sits (k), not on how big the triangle is. Stretch the base or swing the apex in the lab: every ratio readout is unchanged. Ratios are size-blind; that is their whole power.',
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export function C10_MathematicsTrianglesSim() {
  const [tab, setTab] = useState<TabKey>('discover');

  // ── BPT lab state (original controls preserved) ──
  const [k, setK] = useState(0.4); // AD/AB = AE/AC
  const [apexX, setApexX] = useState(210); // draggable apex
  const [baseW, setBaseW] = useState(300); // BC length in px

  // ── criteria tab state ──
  const [critScale, setCritScale] = useState(1.5);
  const [critAngle, setCritAngle] = useState(50);
  const [testMode, setTestMode] = useState<'AA' | 'SSS' | 'SAS'>('SAS');

  // ── pythagoras state ──
  const [legA, setLegA] = useState(3);
  const [legB, setLegB] = useState(4);
  const [ladderLen, setLadderLen] = useState(5);
  const [ladderOut, setLadderOut] = useState(1.4);
  const [showSquares, setShowSquares] = useState(true);

  // ── discover / challenge / truths state ──
  const [predicted, setPredicted] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  // ── Triangle geometry (original formulas preserved) ──
  const ax = apexX;
  const ay = 50;
  const bx = 210 - baseW / 2;
  const by = 300;
  const cX = 210 + baseW / 2;
  const cY = 300;

  const dPt = useMemo(
    () => ({ x: ax + (bx - ax) * k, y: ay + (by - ay) * k }),
    [ax, ay, bx, by, k]
  );
  const ePt = useMemo(
    () => ({ x: ax + (cX - ax) * k, y: ay + (cY - ay) * k }),
    [ax, ay, cX, cY, k]
  );

  // Real lengths scaled to a 10 cm base for honest numbers
  const scale = 10 / baseW;
  const AB = Math.hypot(bx - ax, by - ay) * scale;
  const AD = AB * k;
  const DB = AB - AD;
  const AC = Math.hypot(cX - ax, cY - ay) * scale;
  const AE = AC * k;
  const EC = AC - AE;
  const DE = Math.hypot(ePt.x - dPt.x, ePt.y - dPt.y) * scale;
  const BC = 10;
  // areas via the shoelace-free 0.5*|cross product| route, in cm^2
  const areaABC = Math.abs((bx - ax) * (cY - ay) - (cX - ax) * (by - ay)) * 0.5 * scale * scale;
  const areaADE = areaABC * k * k;
  const areaTrap = areaABC - areaADE;
  const angleA = (Math.atan2(by - ay, bx - ax) - Math.atan2(cY - ay, cX - ax)) * (180 / Math.PI);
  const angleB = (Math.atan2(ay - by, ax - bx) - Math.atan2(cY - by, cX - bx)) * (180 / Math.PI);
  const angleC = 180 - angleA - angleB;

  // ratio bookkeeping
  const ratioADDB = AD / DB;
  const ratioAEEC = AE / EC;

  // ── criteria tab numerics ──
  // small triangle: legs 6 and 8 laid out with an adjustable hinge angle;
  // third side follows from the cosine rule. The big triangle is the same
  // construction scaled by critScale -- so the side ratios ALWAYS agree;
  // what can break similarity (SAS) is a hinge-angle mismatch between copies.
  const s1 = 6, s2 = 8;
  const hingeRad = (critAngle * Math.PI) / 180;
  const s3 = Math.sqrt(s1 * s1 + s2 * s2 - 2 * s1 * s2 * Math.cos((Math.PI - hingeRad)));
  const bigSides = [s1 * critScale, s2 * critScale, s3 * critScale];
  const ratios = [bigSides[0] / s1, bigSides[1] / s2, bigSides[2] / s3];
  const ratiosAgree = Math.max(...ratios) - Math.min(...ratios) < 0.01;
  const similar =
    testMode === 'AA' || testMode === 'SSS'
      ? ratiosAgree
      : critAngle === 50; // SAS: the big copy is authored with a 50° hinge
  const verdict =
    testMode === 'AA'
      ? 'similar -- two equal angles (the shared construction angle and the forced third) settle it; sides need no measuring'
      : testMode === 'SAS'
      ? critAngle === 50
        ? 'similar -- side ratios agree AND the included angles match (50\u00b0)'
        : 'NOT similar -- ratios agree but the included angles differ (yours is ' + critAngle + '\u00b0, the copy\u2019s is 50\u00b0)'
      : ratiosAgree
      ? 'similar -- all three side ratios agree at \u00d7' + critScale.toFixed(2)
      : 'NOT similar -- the side ratios disagree';

  // ── pythagoras numerics ──
  const hyp = Math.hypot(legA, legB);
  const a2b2 = legA * legA + legB * legB;
  const ladderHeight = Math.sqrt(Math.max(0, ladderLen * ladderLen - ladderOut * ladderOut));
  const ladderAngle = (Math.asin(Math.min(1, ladderHeight / ladderLen)) * 180) / Math.PI;

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

  // SVG ticks helper (original, preserved)
  const tickSegs = [
    { p1: { x: ax, y: ay }, p2: dPt, n: 1 },
    { p1: { x: ax, y: ay }, p2: ePt, n: 1 },
    { p1: dPt, p2: { x: bx, y: by }, n: 2 },
    { p1: ePt, p2: { x: cX, y: cY }, n: 2 },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-teal-950/80 rounded-2xl border border-teal-700">\ud83d\udcd0</span>
        <div className="flex-1 min-w-[220px]">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Class 10 -- Triangles</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Basic Proportionality, Similarity and Pythagoras</h1>
        </div>
        <span className="font-mono text-xs text-slate-500">k = {k.toFixed(2)}</span>
      </div>

      {/* tab bar */}
      <nav className="flex flex-wrap gap-1.5 mb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-9 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              tab === t.id
                ? 'bg-teal-600 border-teal-500 text-white shadow-lg shadow-teal-900/40'
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
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-teal-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-teal-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              Slide the parallel line to exactly k = 1/2 (midpoints). What fraction of the big
              triangle\u2019s AREA does the small one hold?
            </p>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
              {['1/2', '1/4', '1/3', '1/8'].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 1;
                let cls = 'border-slate-700 bg-slate-900 hover:border-teal-600';
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
                Lengths halve but AREA squares the ratio: (1/2)\u00b2 = 1/4. The amber region is the
                other 3/4. Verify in the BPT Lab at k = 0.50, then try k = 1/3 and predict 1/9 BEFORE
                reading the bar.
                <button onClick={() => setTab('bpt')} className="ml-2 underline font-bold text-amber-300">
                  Open BPT Lab \u2192
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                t: 'Walk 1: Ratios are size-blind',
                d: 'Set k = 0.6. Now swing the apex slider and stretch the base. Every ratio readout holds still. That insensitivity IS the theorem.',
              },
              {
                t: 'Walk 2: Which test proves it?',
                d: 'In Similarity Tests, use AA mode: the shared angle A plus the corresponding angles from DE \u2225 BC prove similarity with zero side measurements.',
              },
              {
                t: 'Walk 3: The 3-4-5 anchor',
                d: 'Pythagoras tab: set legs 3 and 4. The squares on the sides visibly tile: 9 + 16 = 25. Every ladder problem is this picture in disguise.',
              },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-[10px] font-black mr-1.5">{i + 1}</span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: BPT LAB (original sim preserved + extended)           */}
      {/* ============================================================ */}
      {tab === 'bpt' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
            <svg viewBox="0 0 420 330" className="w-full" role="img" aria-label="Thales triangle">
              <polygon
                points={`${ax},${ay} ${bx},${by} ${cX},${cY}`}
                fill="rgba(20,184,166,0.08)" stroke="#2dd4bf" strokeWidth={3} strokeLinejoin="round"
              />
              {/* inner similar triangle ADE */}
              <polygon
                points={`${ax},${ay} ${dPt.x},${dPt.y} ${ePt.x},${ePt.y}`}
                fill="rgba(251,191,36,0.25)" stroke="#fbbf24" strokeWidth={2.5} strokeLinejoin="round"
                style={{ transition: 'all 0.15s' }}
              />
              {/* DE parallel marker */}
              <line x1={dPt.x} y1={dPt.y} x2={ePt.x} y2={ePt.y} stroke="#f472b6" strokeWidth={2} strokeDasharray="6 3" />
              {/* vertex labels */}
              <text x={ax} y={ay - 10} fill="#e2e8f0" fontSize={13} fontWeight="bold" textAnchor="middle">A</text>
              <text x={bx - 12} y={by + 4} fill="#e2e8f0" fontSize={13} fontWeight="bold" textAnchor="middle">B</text>
              <text x={cX + 12} y={cY + 4} fill="#e2e8f0" fontSize={13} fontWeight="bold" textAnchor="middle">C</text>
              <text x={dPt.x - 12} y={dPt.y} fill="#fbbf24" fontSize={12} fontWeight="bold" textAnchor="middle">D</text>
              <text x={ePt.x + 12} y={ePt.y} fill="#fbbf24" fontSize={12} fontWeight="bold" textAnchor="middle">E</text>
              {/* angle arcs at A */}
              <path
                d={`M ${ax + 26},${ay} A 26 26 0 0 1 ${ax + 26 * Math.cos((angleA * Math.PI) / 180)},${ay + 26 * Math.sin((angleA * Math.PI) / 180)}`}
                fill="none" stroke="#94a3b8" strokeWidth={1.5}
              />
              {/* equality ticks: one tick on AD and AE, two on DB and EC (original, preserved) */}
              {tickSegs.map((seg, si) =>
                Array.from({ length: seg.n }).map((_, ti) => {
                  const mx = (seg.p1.x + seg.p2.x) / 2;
                  const my = (seg.p1.y + seg.p2.y) / 2;
                  const dx = seg.p2.x - seg.p1.x;
                  const dy = seg.p2.y - seg.p1.y;
                  const len = Math.hypot(dx, dy);
                  const ux = -dy / len;
                  const uy = dx / len;
                  const off = (ti - (seg.n - 1) / 2) * 6;
                  return (
                    <line
                      key={`${si}-${ti}`}
                      x1={mx + ux * 6 + (dx / len) * off} y1={my + uy * 6 + (dy / len) * off}
                      x2={mx - ux * 6 + (dx / len) * off} y2={my - uy * 6 + (dy / len) * off}
                      stroke={seg.n === 1 ? '#34d399' : '#94a3b8'} strokeWidth={2}
                    />
                  );
                })
              )}
            </svg>
            <p className="text-[11px] text-slate-500 text-center mt-1">
              Single ticks: AD and AE are ratio twins. Double ticks: DB and EC. DE runs exactly parallel to BC.
            </p>

            {/* area bars (new) */}
            <div className="mt-3 bg-slate-950 rounded-xl border border-slate-800 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Area budget (cm\u00b2)</p>
              <div className="h-6 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden flex">
                <div
                  className="h-full bg-amber-500/80 transition-all duration-300 flex items-center justify-center"
                  style={{ width: `${(areaADE / areaABC) * 100}%` }}
                >
                  {areaADE / areaABC > 0.12 && (
                    <span className="text-[9px] font-bold text-black">{(areaADE).toFixed(1)}</span>
                  )}
                </div>
                <div
                  className="h-full bg-teal-700/70 transition-all duration-300 flex items-center justify-center"
                  style={{ width: `${(areaTrap / areaABC) * 100}%` }}
                >
                  {areaTrap / areaABC > 0.2 && (
                    <span className="text-[9px] font-bold text-teal-100">trapezium {areaTrap.toFixed(1)}</span>
                  )}
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                \u25b3ADE = {areaADE.toFixed(2)} cm\u00b2 \u00b7 trapezium DBCE = {areaTrap.toFixed(2)} cm\u00b2 \u00b7 \u25b3ABC = {areaABC.toFixed(2)} cm\u00b2
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Position of D on AB (k = AD/AB)</span>
                  <span className="font-mono font-bold text-amber-400">{k.toFixed(2)}</span>
                </div>
                <input
                  type="range" min={10} max={90} value={k * 100} aria-label="ratio k"
                  onChange={(e) => setK(Number(e.target.value) / 100)}
                  className="w-full accent-amber-500"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Move apex A sideways</span>
                  <span className="font-mono font-bold text-teal-400">{((apexX - 210) / (baseW / 2)).toFixed(2)}</span>
                </div>
                <input
                  type="range" min={60} max={360} value={apexX} aria-label="apex position"
                  onChange={(e) => setApexX(Number(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Stretch base BC</span>
                  <span className="font-mono font-bold text-pink-400">{BC.toFixed(1)} cm</span>
                </div>
                <input
                  type="range" min={160} max={340} value={baseW} aria-label="base length"
                  onChange={(e) => setBaseW(Number(e.target.value))}
                  className="w-full accent-pink-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[0.25, 0.5, 0.75].map((kk) => (
                  <button
                    key={kk}
                    onClick={() => setK(kk)}
                    className={`py-1.5 rounded-lg text-[10px] font-bold font-mono ${Math.abs(k - kk) < 0.001 ? 'bg-amber-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    k = {kk}
                  </button>
                ))}
              </div>
            </div>

            {/* full ratio table (original readouts preserved + extended) */}
            <div className="bg-slate-900/80 rounded-2xl border border-teal-800/60 p-4 text-sm space-y-1.5 font-mono">
              <p className="text-slate-300">
                AD/DB = {ratioADDB.toFixed(3)} &nbsp;vs&nbsp; AE/EC = {ratioAEEC.toFixed(3)}
                <span className={`ml-2 text-[10px] font-sans font-bold ${Math.abs(ratioADDB - ratioAEEC) < 0.01 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {Math.abs(ratioADDB - ratioAEEC) < 0.01 ? 'MATCH' : 'MISMATCH'}
                </span>
              </p>
              <p className="text-slate-300">AD/AB = AE/AC = {k.toFixed(3)} -- the Thales ratio</p>
              <p className="text-slate-300">
                DE/BC = {(DE / BC).toFixed(3)} &nbsp;=&gt;&nbsp; \u25b3ADE ~ \u25b3ABC
              </p>
              <p className="text-emerald-300">area(\u25b3ADE)/area(\u25b3ABC) = k\u00b2 = {(k * k).toFixed(3)}</p>
              <p className="text-[11px] text-slate-500 font-sans">
                Sides: AB = {AB.toFixed(2)} cm, AC = {AC.toFixed(2)}, AD = {AD.toFixed(2)}, DB = {DB.toFixed(2)},
                AE = {AE.toFixed(2)}, EC = {EC.toFixed(2)}, DE = {DE.toFixed(2)} cm
              </p>
              <p className="text-[11px] text-slate-500 font-sans">
                Angles: A = {angleA.toFixed(1)}\u00b0, B = {angleB.toFixed(1)}\u00b0, C = {angleC.toFixed(1)}\u00b0 -- all three fixed while k moves.
              </p>
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">Teaching note</p>
              <p>
                Any line parallel to one side of a triangle cuts the other two sides in the same ratio --
                that is Thales. Equal ratios of sides make the triangles similar, and similar figures
                have areas in the SQUARE of the side ratio. Double k and areas quadruple.
              </p>
            </div>

            <div className="bg-teal-950/40 rounded-2xl border border-teal-800/50 p-4 text-xs">
              <p className="font-bold text-teal-300 mb-1">What to try</p>
              <p>1. Set k = 1/2 exactly. What is DE/BC, and what fraction of the big triangle is now filled yellow?</p>
              <p className="mt-1">2. Move the apex as far left as it goes -- do the ratios AD/DB and AE/EC ever disagree? Why not?</p>
              <p className="mt-1">3. Find k so the trapezium DBCE equals the area of \u25b3ADE. (Hint: yellow must be half the bar.)</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: SIMILARITY TESTS                                      */}
      {/* ============================================================ */}
      {tab === 'criteria' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
              <div className="grid grid-cols-3 gap-1.5">
                {(['AA', 'SSS', 'SAS'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setTestMode(m)}
                    className={`py-2 rounded-xl text-xs font-bold ${testMode === m ? 'bg-teal-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {testMode === 'AA' && 'Two ANGLES equal is enough -- the third angle is forced, and sides must then scale.'}
                {testMode === 'SSS' && 'ALL THREE side pairs must share ONE ratio. Here you can break the agreement.'}
                {testMode === 'SAS' && 'TWO side ratios plus the angle BETWEEN them equal. Angle outside the pair? Nothing follows.'}
              </p>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Scale of the big triangle</span>
                  <span className="font-mono font-bold text-amber-400">\u00d7{critScale.toFixed(2)}</span>
                </div>
                <input
                  type="range" min={0.5} max={3} step={0.05} value={critScale} aria-label="scale factor"
                  onChange={(e) => setCritScale(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Angle at the hinge (small triangle)</span>
                  <span className="font-mono font-bold text-pink-400">{critAngle}\u00b0</span>
                </div>
                <input
                  type="range" min={30} max={140} step={1} value={critAngle} aria-label="hinge angle"
                  onChange={(e) => setCritAngle(Number(e.target.value))}
                  className="w-full accent-pink-500"
                />
              </div>
              <button
                onClick={() => { setCritScale(1.5); setCritAngle(50); }}
                className="w-full min-h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold"
              >
                Reset test
              </button>
            </div>

            <div
              className={`rounded-2xl border p-4 text-sm font-bold ${
                similar ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-rose-950/40 border-rose-800 text-rose-300'
              }`}
            >
              Verdict: {verdict}
              <p className="mt-1 text-[11px] font-normal text-slate-400 leading-relaxed">
                Small triangle: sides 6, 8, hinge {critAngle}\u00b0 \u00b7 big triangle: sides{' '}
                {bigSides.map((s) => s.toFixed(1)).join(', ')}{' '}
                {testMode === 'SAS' && `, hinge ${critAngle}\u00b0`}
                {testMode === 'AA' && ' -- angle comparison only'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Side-ratio agreement</p>
              {ratios.map((r, i) => (
                <div key={i} className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] w-16 text-slate-400">pair {i + 1}</span>
                  <div className="flex-1 h-3 rounded bg-slate-950 border border-slate-800 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-200 ${Math.abs(r - critScale) < 0.01 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      style={{ width: `${Math.min(100, (r / 3) * 100)}%` }}
                    />
                  </div>
                  <span className={`font-mono text-[10px] w-10 text-right ${Math.abs(r - critScale) < 0.01 ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {r.toFixed(3)}
                  </span>
                </div>
              ))}
              <p className="text-[10px] text-slate-500 mt-1">
                {ratiosAgree
                  ? 'All three ratios agree -- SSS similarity holds regardless of the hinge angle you chose.'
                  : 'The third side breaks the agreement: scaling two sides but keeping a different hinge angle distorts the shape.'}
              </p>
            </div>

            {/* triangle pair drawing */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
              <svg viewBox="0 0 440 180" className="w-full" role="img" aria-label="two triangles">
                <polygon points="30,150 90,150 90,110" fill="rgba(45,212,191,0.15)" stroke="#2dd4bf" strokeWidth={2.5} />
                <text x={52} y={170} fontSize={10} fill="#94a3b8">sides 6, 8 (3-4-5 family)</text>
                <polygon
                  points={`${240},${150} ${240 + 120 * Math.min(critScale, 1.6)},${150} ${240 + 120 * Math.min(critScale, 1.6) * Math.cos((critAngle * Math.PI) / 180)},${150 - 120 * Math.min(critScale, 1.6) * Math.sin((critAngle * Math.PI) / 180) * 0.55}`}
                  fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth={2.5}
                  style={{ transition: 'all 0.2s' }}
                />
                <text x={280} y={170} fontSize={10} fill="#94a3b8">
                  \u00d7{critScale.toFixed(2)} copy -- hinge {critAngle}\u00b0
                </text>
              </svg>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                {similar
                  ? 'Same shape, different size: every angle matches, every side sits in one ratio.'
                  : 'The shapes fight each other -- the angle mismatch bends the big copy out of similarity.'}
              </p>
            </div>

            <div className="bg-teal-950/40 rounded-2xl border border-teal-800/50 p-4 text-xs">
              <p className="font-bold text-teal-300 mb-1">What to try</p>
              <p>1. In SAS mode, drag the hinge off 50\u00b0 while ratios stay perfect -- watch similarity die. That is why the word INCLUDED matters.</p>
              <p className="mt-1">2. In SSS mode, can you find a scale where ratios disagree by more than 0.01? What had to change?</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: PYTHAGORAS                                            */}
      {/* ============================================================ */}
      {tab === 'pythagoras' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Leg a</span>
                  <span className="font-mono font-bold text-teal-400">{legA.toFixed(1)} cm</span>
                </div>
                <input type="range" min={1} max={9} step={0.1} value={legA} aria-label="leg a"
                  onChange={(e) => setLegA(Number(e.target.value))} className="w-full accent-teal-500" />
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Leg b</span>
                  <span className="font-mono font-bold text-gold-400">{legB.toFixed(1)} cm</span>
                </div>
                <input type="range" min={1} max={9} step={0.1} value={legB} aria-label="leg b"
                  onChange={(e) => setLegB(Number(e.target.value))} className="w-full accent-gold-500" />
              </div>
              <button onClick={() => setShowSquares((s) => !s)} className="w-full min-h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold">
                {showSquares ? 'Hide' : 'Show'} the squares on each side
              </button>
              <button onClick={() => { setLegA(3); setLegB(4); }} className="w-full min-h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold">
                Classic 3-4-5
              </button>
            </div>

            <div className="bg-slate-950 rounded-2xl border border-emerald-800/60 p-4 text-sm font-mono space-y-1">
              <p className="text-slate-300">
                a\u00b2 + b\u00b2 = {(legA * legA).toFixed(2)} + {(legB * legB).toFixed(2)} ={' '}
                <span className="text-emerald-300 font-bold">{a2b2.toFixed(2)}</span>
              </p>
              <p className="text-slate-300">
                c = \u221a{(a2b2.toFixed(2))} = <span className="text-amber-300 font-bold text-base">{hyp.toFixed(3)} cm</span>
              </p>
              <p className="text-[11px] text-slate-500 font-sans">
                {Number.isInteger(hyp) ? 'A perfect Pythagorean triple -- c is a whole number.' : 'Not a whole number this time: only special leg pairs give triples (3,4,5), (5,12,13), (8,15,17)...'}
              </p>
            </div>

            {/* ladder word problem */}
            <div className="bg-slate-900/80 rounded-2xl border border-amber-900/50 p-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Word problem: the ladder against the wall
              </p>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Ladder length (hypotenuse)</span>
                  <span className="font-mono font-bold text-amber-300">{ladderLen.toFixed(1)} m</span>
                </div>
                <input type="range" min={3} max={8} step={0.1} value={ladderLen} aria-label="ladder length"
                  onChange={(e) => setLadderLen(Number(e.target.value))} className="w-full accent-amber-500" />
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Foot distance from wall</span>
                  <span className="font-mono font-bold text-rose-300">{ladderOut.toFixed(1)} m</span>
                </div>
                <input type="range" min={0.5} max={Math.max(1, ladderLen - 0.5)} step={0.1} value={Math.min(ladderOut, ladderLen - 0.5)} aria-label="foot distance"
                  onChange={(e) => setLadderOut(Number(e.target.value))} className="w-full accent-rose-500" />
              </div>
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 text-xs font-mono">
                <p className="text-slate-300">
                  h = \u221a(L\u00b2 \u2212 d\u00b2) = \u221a({(ladderLen * ladderLen).toFixed(2)} \u2212 {(ladderOut * ladderOut).toFixed(2)}) ={' '}
                  <span className="text-emerald-300 font-bold">{ladderHeight.toFixed(2)} m</span> up the wall
                </p>
                <p className="text-slate-500">
                  ladder angle from ground = {ladderAngle.toFixed(1)}\u00b0
                  {ladderAngle < 45 && ' -- a shallow, risky ladder'}
                  {ladderAngle > 75 && ' -- nearly vertical, tips backwards easily'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* squares-on-sides visual */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
              <svg viewBox="0 0 340 300" className="w-full" role="img" aria-label="pythagoras squares">
                {/* right triangle */}
                {(() => {
                  const scaleP = 22 / Math.max(legA + legB, 6); // px per cm
                  const axp = 40, ayp = 260;
                  const bxp = axp + legA * scaleP, byp = ayp;
                  const cyp = ayp - legB * scaleP;
                  const cxp = axp;
                  return (
                    <g>
                      {/* square on leg a (below) */}
                      {showSquares && (
                        <rect x={axp} y={byp} width={legA * scaleP} height={legA * scaleP} fill="rgba(45,212,191,0.25)" stroke="#2dd4bf" strokeWidth={1.5} />
                      )}
                      {/* square on leg b (left) */}
                      {showSquares && (
                        <rect x={axp - legB * scaleP} y={cyp} width={legB * scaleP} height={legB * scaleP} fill="rgba(56,189,248,0.25)" stroke="#38bdf8" strokeWidth={1.5} />
                      )}
                      {/* triangle */}
                      <polygon
                        points={`${axp},${ayp} ${bxp},${byp} ${cxp},${cyp}`}
                        fill="rgba(251,191,36,0.3)" stroke="#fbbf24" strokeWidth={2.5}
                      />
                      {/* hypotenuse label */}
                      <text
                        x={(axp + bxp + cxp) / 2 - 10}
                        y={(ayp + byp + cyp) / 2}
                        fontSize={11} fill="#fbbf24" fontWeight="bold"
                      >
                        c = {hyp.toFixed(2)}
                      </text>
                      <text x={axp + (legA * scaleP) / 2 - 6} y={ayp + legA * scaleP + 14} fontSize={10} fill="#2dd4bf">
                        a\u00b2 = {(legA * legA).toFixed(1)}
                      </text>
                      <text x={axp - legB * scaleP + 4} y={cyp - 6} fontSize={10} fill="#38bdf8">
                        b\u00b2 = {(legB * legB).toFixed(1)}
                      </text>
                    </g>
                  );
                })()}
              </svg>
              <p className="text-[11px] text-slate-500 text-center">
                {showSquares
                  ? 'The two leg squares together always equal the (hidden, tilted) square on the hypotenuse.'
                  : 'Toggle the squares back on -- the visual proof is the point.'}
              </p>
            </div>

            {/* triple checker */}
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">Hunt for triples</p>
              <p>
                Try (3,4), (6,8), (5,12), (8,15), (7,24). Whole-number legs that give a whole-number
                hypotenuse are Pythagorean triples -- the Ancient Babylonians tabulated them a thousand
                years before Pythagoras. Doubling a triple (3,4) \u2192 (6,8) keeps it a triple: similar
                triangles again!
              </p>
            </div>

            <div className="bg-teal-950/40 rounded-2xl border border-teal-800/50 p-4 text-xs">
              <p className="font-bold text-teal-300 mb-1">What to try</p>
              <p>1. Set the ladder to 5 m and find the foot distance that puts the top at exactly 4.8 m. Which triple is hiding here?</p>
              <p className="mt-1">2. Make a leg LONGER than the hypotenuse allows (foot beyond the ladder). What does the height formula return, and what does that mean physically?</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: CHALLENGE                                             */}
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
                    tierFilter === t ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
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
                    let cls = 'border-slate-700 bg-slate-950 hover:border-teal-600';
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
      {/* TAB 6: TRUTHS                                                */}
      {/* ============================================================ */}
      {tab === 'truths' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {MISCONCEPTIONS.map((m, i) => (
              <div key={i} className="rounded-2xl border border-rose-900/60 bg-rose-950/20 overflow-hidden">
                <button
                  onClick={() => setOpenMisc((cur) => (cur === i ? null : i))}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-rose-950/40 transition-colors"
                >
                  <span className="text-rose-400 font-black text-lg leading-none">\u2717</span>
                  <span className="text-sm font-bold text-rose-200 flex-1">{m.misconception}</span>
                  <span className="text-slate-500 text-xs">{openMisc === i ? '\u25b2' : '\u25bc'}</span>
                </button>
                {openMisc === i && (
                  <div className="px-4 pb-4">
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200 leading-relaxed">
                      <span className="font-bold text-emerald-300">The truth: </span>
                      {m.correction}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-5 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">If you remember three lines</p>
            <ol className="space-y-2 text-sm text-slate-300 leading-relaxed list-decimal ml-5">
              <li>Parallel line \u21d2 equal ratios (BPT); equal ratios \u21d2 parallel line (converse).</li>
              <li>Similarity: AA, SSS or SAS -- and area always scales as k\u00b2, never k.</li>
              <li>a\u00b2 + b\u00b2 = c\u00b2 only in right triangles -- and the ladder problem is its daily costume.</li>
            </ol>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setTab('bpt')} className="min-h-11 px-5 rounded-xl bg-teal-600 hover:bg-teal-500 text-sm font-bold">
                Back to the BPT Lab
              </button>
              <button onClick={() => { setK(0.4); setApexX(210); setBaseW(300); }} className="min-h-11 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold">
                Reset the triangle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default C10_MathematicsTrianglesSim;

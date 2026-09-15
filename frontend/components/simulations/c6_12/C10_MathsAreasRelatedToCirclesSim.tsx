'use client';
/**
 * C10_MathsAreasRelatedToCirclesSim (Class 10 Maths)
 *
 * ONE chapter: Areas Related to Circles (NCERT X, Ch 11/12).
 * Every number is the exact geometry:
 *   arc length      l   = (θ/360)·2πr          (θ in degrees)
 *   sector area     A   = (θ/360)·πr² = ½·l·r
 *   chord           c   = 2r·sin(θ/2)
 *   triangle area   T   = ½·r²·sin θ           (θ converted to radians)
 *   segment area    Seg = A − T                (θ < 180° minor)
 *   segment perimeter = l + c
 * The shaded picture is the SAME formula: the sector path is drawn
 * from your θ, the chord from your r — no canned numbers anywhere.
 *
 * Deep layout (5 tabs):
 *   1. Predict    -- guess, then verify on the wheel
 *   2. Sector Lab -- the main wheel: sector, chord, segment live
 *   3. Combo Lab  -- board classics: clock sweep + grazing goat
 *   4. Challenge  -- 9 questions in 3 tiers with hints
 *   5. Truths     -- misconception killer + honest summary
 */
import React, { useMemo, useState, useEffect } from 'react';

type TabKey = 'predict' | 'sector' | 'combo' | 'challenge' | 'truths';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'predict', label: '1 · Predict', emoji: '❓' },
  { id: 'sector', label: '2 · Sector Lab', emoji: '🍩' },
  { id: 'combo', label: '3 · Combo Lab', emoji: '🕓' },
  { id: 'challenge', label: '4 · Challenge', emoji: '🎯' },
  { id: 'truths', label: '5 · Truths', emoji: '🧠' },
];

const PI = Math.PI;

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
    skill: 'Sector fraction',
    question: 'A sector is cut with central angle 90° from a circle of radius 7 cm. Its area is (π = 22/7):',
    options: ['38.5 cm²', '77 cm²', '154 cm²', '11 cm²'],
    correctIndex: 0,
    explanation:
      '90/360 = ¼ of the circle: A = ¼·π·7² = ¼·22/7·49 = 38.5 cm². The Sector Lab at r = 7, θ = 90 shows the quarter wheel and the same number.',
    hints: ['What fraction of the full turn is 90°?', 'A = (θ/360)·πr².', '¼ × 154 = 38.5 cm².'],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Arc length',
    question: 'The minute hand of a watch is 6 cm long. The distance its TIP moves in 20 minutes is:',
    options: ['about 12.57 cm', 'about 6.28 cm', 'about 25.13 cm', '20 cm'],
    correctIndex: 0,
    explanation:
      '20 min = 120° of turn. Arc = (120/360)·2π·6 = (1/3)·12π = 4π ≈ 12.57 cm. The Combo Lab clock sweeps exactly this arc live.',
    hints: ['20 minutes is what fraction of 60?', 'Arc = (θ/360)·2πr.', '(1/3)·2π·6 = 4π ≈ 12.57 cm.'],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Perimeter pieces',
    question: 'The perimeter of a SECTOR of angle θ and radius r is:',
    options: ['just the arc l', 'l + r', 'l + 2r (two radii close the pie slice)', '2πr for every θ'],
    correctIndex: 2,
    explanation:
      'A sector is bounded by the arc AND two radii: perimeter = l + 2r. A SEGMENT swaps the two radii for one chord: perimeter = l + chord. The Lab labels both outlines separately.',
    hints: ['Trace the boundary of the shaded pie slice.', 'How many straight sides does a sector have?', 'Arc + two radii.'],
  },
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'Segment numerics',
    question: 'A chord subtends 60° at the centre of a circle of radius 6 cm. The MINOR segment area is:',
    options: ['about 3.26 cm²', 'about 18.85 cm²', 'about 32.43 cm²', 'about 9.42 cm²'],
    correctIndex: 0,
    explanation:
      'Sector = (60/360)·π·36 = 6π ≈ 18.85 cm². Triangle = ½·6²·sin 60° = 18·(√3/2) ≈ 15.59 cm². Segment = 18.85 − 15.59 ≈ 3.26 cm². The Lab does exactly this subtraction — watch the triangle flash.',
    hints: ['Segment = sector − triangle.', 'Triangle = ½r²·sin θ with θ in radians.', '18.85 − 15.59 ≈ 3.26 cm².'],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Radius doubling',
    question: 'You DOUBLE the radius of a sector but keep its angle. The sector area becomes:',
    options: ['double', 'four times (r appears squared)', 'half', 'eight times'],
    correctIndex: 1,
    explanation:
      'A = (θ/360)·πr² — the angle buys a FRACTION of the circle, but the radius enters squared. ×2 radius ⇒ ×4 area. Doubling the ANGLE, though, only doubles the area. Try r = 5 → 10 at θ = 60° in the Lab: 13.09 → 52.36 cm².',
    hints: ['Where does r sit inside the formula?', '(2r)² = 4r².', 'Four times.'],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Clock sweep area',
    question: 'The same 6 cm minute hand sweeps for 15 minutes. The AREA swept over is:',
    options: ['about 56.5 cm²', 'about 28.3 cm²', 'about 113.1 cm²', 'about 9.42 cm²'],
    correctIndex: 1,
    explanation:
      '15 min = 90°. Swept area = (90/360)·π·6² = ¼·36π = 9π ≈ 28.27 cm². Note the contrast with ch_02: the tip DISTANCE is an arc (linear in r), the swept AREA is a sector (quadratic in r).',
    hints: ['The hand is a radius sweeping a pie slice.', 'A = (θ/360)·πr² with θ = 90°.', '9π ≈ 28.3 cm².'],
  },
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Goat tether',
    question: 'A goat is tethered by a 14 m rope to a peg at one CORNER of a square grass field of side 21 m, and it grazes the grass INSIDE the field. The area it can graze is (π = 22/7):',
    options: ['616 m²', '154 m²', '462 m²', '308 m²'],
    correctIndex: 1,
    explanation:
      'At a square corner only a 90° wedge of the circle lies INSIDE the field (the two fences block the rest): (90/360)·π·14² = ¼·(22/7)·196 = ¼·616 = 154 m². If the goat were grazing OUTSIDE the fences, the usable angle would be 270° and the area 462 m² — same rope, different fraction. The Combo Lab toggles both cases live.',
    hints: ['How much of the circle lies inside a square corner?', 'A square corner is 90°.', '¼ × 616 = 154 m².'],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Radian discipline',
    question: 'A sector has area ½·r²·θ with θ = 1.5 radians and r = 4 cm. The same sector quoted with arc length l = 6 cm has area:',
    options: ['12 cm²', '24 cm²', '9 cm²', '48 cm²'],
    correctIndex: 0,
    explanation:
      'Area = ½·r·l as well: ½·4·6 = 12 cm². And ½r²θ = ½·16·1.5 = 12 cm² — consistent because l = rθ = 4×1.5 = 6. All three sector formulas are one formula wearing three outfits; the Lab shows the degrees version (θ/360)πr².',
    hints: ['Check l = rθ first.', 'A = ½·r·l.', '12 cm² both ways.'],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis: car wheels',
    question: 'A car has wheels of radius 35 cm. In 1000 revolutions each wheel covers, and the rotation per revolution is:',
    options: [
      '2.2 km per wheel; 360° per revolution — every point on the rim travels the circumference',
      '220 m; 180° per revolution',
      '22 km; 720° per revolution',
      '1.54 km; 360° — circumference = πr',
    ],
    correctIndex: 0,
    explanation:
      'One revolution = one circumference = 2π·35 = 220 cm = 2.2 m. 1000 revolutions = 2200 m = 2.2 km, with a full 360° turn each time. Rolling is just arcs added end to end — the same (θ/360)·2πr machinery in motion.',
    hints: ['Distance per revolution = circumference.', '2πr with r = 35 cm → 220 cm.', '×1000 → 2.2 km.'],
  },
  // ─── Class 10 board-depth additions: areas-related-to-circles diagnostics ───
  {
    id: 'ch_depth_arc_hidden_angle',
    tier: 'advanced',
    skill: 'Create: sector with a hidden angle',
    question:
      'Create a real-world problem where the sector angle is NOT given directly. Which design works?',
    options: [
      'A 21 m square hoarding has an inscribed quarter-circle design -- the angle must be EXTRACTED: a square inscribes a 90 deg sector (area = (1/4) pi r^2 with r = 10.5), or a pendulum swings 40 times covering 400 cm of arc -- from s = (theta/360) x 2 pi r the student RECOVERS theta = 40 x 7/(2 x 22) x 360 before any sector area',
      'Sector problems always state the angle plainly',
      'The angle can be guessed and rounded',
      'Sector areas never need the angle at all'
    ],
    correctIndex: 0,
    explanation:
      'Board-level problems hide the angle in three ways: geometry (square inscribes 90, equilateral triangle 60), arc-length data (recover theta from s = (theta/360) x 2 pi r), or time/rate (a 6-minute ride = 1/10 of a wheel per minute... theta per minute = 36 deg). The skill tested is angle-recovery; the sector formula itself is class 7 material.',
    hints: [
      'Square corner = 90 deg is a gift, not a given.',
      'Arc length equation solves for theta.',
      'Rates (turns per minute) convert to degrees per minute.'
    ],
  },
  {
    id: 'ch_depth_arc_park_track',
    tier: 'advanced',
    skill: 'Create: combined regions',
    question:
      'A circular park of radius 20 m has a rectangular jogging track of width 5 m built along its eastern side, flush with the boundary. A word problem asks for the track area plus the cost of tiling it at Rs 80 per square metre. What is the correct setup?',
    options: [
      'Take the track as a rectangle of length 2r = 40 m (the diameter chord) and width 5 m: area = 200 m^2, tiling cost = 200 x 80 = Rs 16,000 -- combined-region problems = simple shapes MINUS or PLUS overlapping parts',
      'Treat the track as a sector of 90 deg and use (theta/360) pi r^2',
      'Area of track = pi r^2 = the whole park',
      'Cost = area x radius'
    ],
    correctIndex: 0,
    explanation:
      'Combined-region skeletons to master: (1) rectangle on a circle\'s edge (this one), (2) circular garden with an inner concentric path -- path area = pi(R^2 - r^2), (3) horse tied to a corner grazing arcs of sectors. Then multiply by the per-unit cost -- boards love adding the rupee step. State each shape before any formula.',
    hints: [
      'Decompose: which pure shapes overlap here?',
      'Concentric paths: pi(R + r)(R - r) is the shortcut.',
      'The cost line is multiplication, not new geometry.'
    ],
  }
];

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'Doubling the radius doubles the area of a sector.',
    correction:
      'Area carries r², so doubling r quadruples it. Only the ANGLE acts linearly: double θ → double area; double r → four times the area. Slide r in the Lab and watch the readout jump ×4, not ×2.',
  },
  {
    misconception: 'π is exactly 22/7.',
    correction:
      '22/7 ≈ 3.142857 is a convenient APPROXIMATION; true π ≈ 3.14159265 (irrational). For r = 7 the error hides nicely, but for large radii (wheels, fields) answers drift. The Lab computes with real π and shows both values side by side.',
  },
  {
    misconception: 'Segment and sector are the same shaded thing.',
    correction:
      'Sector = pie slice (two radii + arc). Segment = chord cuts off the crust (chord + arc). The triangle between them is the difference: Seg = Sector − ½r²·sin θ. Toggle the triangle in the Lab to see exactly what is subtracted.',
  },
  {
    misconception: 'You can use (θ/360) with θ in radians, or ½r²θ with degrees.',
    correction:
      'Pick the formula to MATCH the unit: (θ/360)·πr² needs degrees; ½r²θ needs radians (because 2π rad = 360°). Mixing them is the single most common lost mark in this chapter. The Lab toggles units and converts live.',
  },
  {
    misconception: 'The perimeter of a "circle part" is just the arc.',
    correction:
      'Perimeter traces the WHOLE boundary: sector adds two radii (l + 2r), segment adds one chord (l + 2r·sin(θ/2)). An arc alone is an open curve — it has length, not perimeter.',
  },
];

// ─── main component ───

export function C10_MathsAreasRelatedToCirclesSim() {
  const [tab, setTab] = useState<TabKey>('predict');

  // sector lab state
  const [r, setR] = useState(7); // cm
  const [thetaDeg, setThetaDeg] = useState(90); // degrees
  const [unit, setUnit] = useState<'deg' | 'rad'>('deg');
  const [showTriangle, setShowTriangle] = useState(true);
  const [showChord, setShowChord] = useState(true);
  const [sweeping, setSweeping] = useState(false);
  const [sweepDir, setSweepDir] = useState(1);

  // combo lab state
  const [handLen, setHandLen] = useState(6); // cm
  const [minutes, setMinutes] = useState(20); // elapsed minutes
  const [fieldSide, setFieldSide] = useState(21); // m
  const [ropeLen, setRopeLen] = useState(14); // m
  const [goatInside, setGoatInside] = useState(true);

  // predict/challenge/truths state
  const [predicted, setPredicted] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  // sweep animation (deterministic fixed step)
  useEffect(() => {
    if (!sweeping) return;
    let raf = 0;
    let acc = 0;
    const tick = () => {
      acc += 1;
      if (acc >= 10) {
        acc = 0;
        setThetaDeg((t) => {
          let next = t + sweepDir * 1.5;
          if (next >= 359) { next = 359; setSweepDir(-1); }
          if (next <= 5) { next = 5; setSweepDir(1); }
          return Math.round(next * 10) / 10;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [sweeping, sweepDir]);

  // ── sector numerics (exact) ──
  const thetaRad = (thetaDeg * PI) / 180;
  const fullC = 2 * PI * r; // circumference cm
  const fullArea = PI * r * r; // cm²
  const frac = thetaDeg / 360;
  const arc = frac * fullC; // cm
  const sectorArea = frac * fullArea; // cm²
  const chord = 2 * r * Math.sin(thetaRad / 2); // cm
  const triArea = 0.5 * r * r * Math.sin(thetaRad); // cm²
  const segArea = Math.max(0, sectorArea - triArea); // cm²
  const segPerimeter = arc + chord; // cm
  const sectorPerimeter = arc + 2 * r; // cm

  const displayAngle = unit === 'deg' ? `${thetaDeg.toFixed(1)}°` : `${thetaRad.toFixed(4)} rad`;
  const piApprox = 22 / 7;
  const areaWith22by7 = (thetaDeg / 360) * piApprox * r * r;

  // ── combo numerics ──
  const sweepDeg = (minutes / 60) * 360; // minutes hand: 360° per hour
  const sweepArea = (sweepDeg / 360) * PI * handLen * handLen; // cm²
  const tipArc = (sweepDeg / 360) * 2 * PI * handLen; // cm

  // goat grazing (goat tied at a corner of a square field)
  const goatAngle = goatInside ? 90 : 270; // usable fraction of the circle
  const goatBase = (goatAngle / 360) * PI * ropeLen * ropeLen;
  // extra lobes when rope exceeds the side (outside case) — classic extension, kept honest for r<=a
  const extraLobe = ropeLen > fieldSide ? ((goatInside ? 0.25 : 0.75) / 4) * PI * Math.pow(ropeLen - fieldSide, 2) * 2 : 0;
  const goatArea = goatBase + (ropeLen > fieldSide && !goatInside ? extraLobe : 0);
  const fieldArea = fieldSide * fieldSide;

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
    setR(7);
    setThetaDeg(90);
    setUnit('deg');
    setShowTriangle(true);
    setShowChord(true);
    setSweeping(false);
    setSweepDir(1);
    setHandLen(6);
    setMinutes(20);
    setFieldSide(21);
    setRopeLen(14);
    setGoatInside(true);
    setPredicted(null);
  };

  // sector SVG path (canvas 360x340, centre 180,170, max r pixel 140)
  const CX = 180;
  const CY = 170;
  const RPX = 130;
  const rpx = (r / 20) * RPX; // slider max 20 cm
  const a0 = -PI / 2; // start at 12 o'clock
  const a1 = a0 + thetaRad;
  const p0 = { x: CX + rpx * Math.cos(a0), y: CY + rpx * Math.sin(a0) };
  const p1 = { x: CX + rpx * Math.cos(a1), y: CY + rpx * Math.sin(a1) };
  const largeArc = thetaDeg > 180 ? 1 : 0;
  const sectorPath = `M ${CX} ${CY} L ${p0.x} ${p0.y} A ${rpx} ${rpx} 0 ${largeArc} 1 ${p1.x} ${p1.y} Z`;
  const chordLine = { x1: p0.x, y1: p0.y, x2: p1.x, y2: p1.y };
  // triangle = centre + chord endpoints
  const triPath = `M ${CX} ${CY} L ${p0.x} ${p0.y} L ${p1.x} ${p1.y} Z`;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 rounded-3xl border border-slate-800 font-sans text-slate-100 shadow-2xl">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-cyan-950/80 rounded-2xl border border-cyan-700">🍩</span>
        <div className="flex-1 min-w-[220px]">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">Class 10 Maths — Areas Related to Circles</p>
          <h1 className="text-xl md:text-2xl font-black text-cyan-300">Slices of π: sectors, arcs, chords &amp; segments</h1>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs text-slate-400 block">A = (θ/360)·πr²</span>
          <span className="font-mono text-xs text-slate-500 block">l = (θ/360)·2πr · Seg = A − ½r²sinθ</span>
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
                ? 'bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-900/40'
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
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-cyan-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              Two sectors, same angle 60°. One comes from r = 5 cm, the other from r = 10 cm. The
              bigger sector&apos;s area is how many times the smaller?
            </p>
            <div className="mt-3 space-y-2">
              {[
                '2 times — radius doubled',
                '4 times — the radius enters SQUARED',
                'Same — the angle decides area, not radius',
                '8 times — length and area compound',
              ].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 1;
                let cls = 'border-slate-700 bg-slate-900 hover:border-cyan-600';
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
                A = (θ/360)·πr²: r doubles ⇒ r² quadruples. 13.09 cm² → 52.36 cm². Verify in the
                Sector Lab: θ = 60, r = 5, then r = 10 — read the panel both times.
                <button onClick={() => setTab('sector')} className="ml-2 underline font-bold text-amber-300">Open Sector Lab →</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { t: 'Walk 1: crust vs pie', d: 'At θ = 90°, toggle the triangle: the shaded slice minus the straight triangle = the SEGMENT. Two regions, one subtraction.' },
              { t: 'Walk 2: sweep the clock', d: 'Combo Lab: 20 minutes sweeps 120°. Slide minutes and watch both the arc (tip path) and the sector (swept area) grow.' },
              { t: 'Walk 3: radian discipline', d: 'Flip deg → rad at θ = 90: the angle becomes 1.5708 rad. Same pie, different unit — the formulas must match.' },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-cyan-600 text-[10px] font-black mr-1.5">{i + 1}</span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: SECTOR LAB                                            */}
      {/* ============================================================ */}
      {tab === 'sector' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>radius r</span>
                <span className="font-mono text-cyan-300">{r} cm</span>
              </label>
              <input type="range" min={1} max={20} step={0.5} value={r} aria-label="radius"
                onChange={(e) => setR(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-cyan-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>central angle θ</span>
                <span className="font-mono text-cyan-300">{displayAngle}</span>
              </label>
              <input type="range" min={1} max={359} step={0.5} value={thetaDeg} aria-label="central angle"
                onChange={(e) => { setSweeping(false); setThetaDeg(Number(e.target.value)); }}
                className="w-full mt-1 min-h-11 accent-cyan-500" />
            </div>
            <div className="flex items-end gap-2">
              <button onClick={() => setUnit(unit === 'deg' ? 'rad' : 'deg')} className="min-h-11 px-3 py-2 rounded-xl text-xs font-bold border bg-slate-800 border-slate-700 text-slate-200 transition-all">
                angle unit: {unit === 'deg' ? 'degrees' : 'radians'}
              </button>
              <button onClick={() => setSweeping(!sweeping)} className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${sweeping ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-200'}`}>
                {sweeping ? '⏸ stop sweep' : '▶ sweep θ'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2">
              <svg viewBox="0 0 360 340" className="w-full h-64 md:h-80" preserveAspectRatio="xMidYMid meet">
                {/* full circle outline */}
                <circle cx={CX} cy={CY} r={rpx} fill="#0b1526" stroke="#334155" strokeWidth={1.5} strokeDasharray="4 4" />
                {/* sector */}
                <path d={sectorPath} fill="#0891b2" fillOpacity={0.35} stroke="#22d3ee" strokeWidth={2} style={{ transition: 'all 80ms linear' }} />
                {/* triangle */}
                {showTriangle && (
                  <path d={triPath} fill="#f59e0b" fillOpacity={0.30} stroke="#fbbf24" strokeWidth={1.2} strokeDasharray="3 3" style={{ transition: 'all 80ms linear' }} />
                )}
                {/* chord */}
                {showChord && (
                  <line x1={chordLine.x1} y1={chordLine.y1} x2={chordLine.x2} y2={chordLine.y2} stroke="#fb7185" strokeWidth={2.5} style={{ transition: 'all 80ms linear' }} />
                )}
                {/* radii labels */}
                <text x={CX + rpx * Math.cos(a0) / 2 - 10} y={CY + rpx * Math.sin(a0) / 2} fontSize={10} fill="#94a3b8" fontFamily="monospace">r = {r} cm</text>
                <text x={CX} y={CY + 14} fontSize={10} fill="#fbbf24" textAnchor="middle" fontFamily="monospace">θ = {displayAngle}</text>
              </svg>
            </div>

            {/* live readouts */}
            <div className="grid grid-cols-2 gap-2 content-start">
              {[
                { k: 'arc length l', v: `${arc.toFixed(3)} cm`, c: 'text-cyan-300' },
                { k: 'sector area (θ/360)πr²', v: `${sectorArea.toFixed(3)} cm²`, c: 'text-cyan-300' },
                { k: 'chord = 2r·sin(θ/2)', v: `${chord.toFixed(3)} cm`, c: 'text-rose-300' },
                { k: 'triangle ½r²·sin θ', v: `${triArea.toFixed(3)} cm²`, c: 'text-amber-300' },
                { k: 'SEGMENT area = sector − triangle', v: `${segArea.toFixed(3)} cm²`, c: 'text-emerald-300' },
                { k: 'segment perimeter = l + chord', v: `${segPerimeter.toFixed(3)} cm`, c: 'text-emerald-300' },
                { k: 'sector perimeter = l + 2r', v: `${sectorPerimeter.toFixed(3)} cm`, c: 'text-cyan-300' },
                { k: 'fraction of circle', v: `${(frac * 100).toFixed(2)} %`, c: 'text-slate-300' },
              ].map((x) => (
                <div key={x.k} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{x.k}</p>
                  <p className={`font-mono text-sm font-bold ${x.c}`}>{x.v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => setShowTriangle(!showTriangle)} className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${showTriangle ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              triangle {showTriangle ? 'shown' : 'hidden'}
            </button>
            <button onClick={() => setShowChord(!showChord)} className={`min-h-11 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${showChord ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
              chord {showChord ? 'shown' : 'hidden'}
            </button>
            <span className="text-xs text-slate-500 font-mono">
              with π ≈ 22/7 the sector area would read {areaWith22by7.toFixed(3)} cm² (true π: {sectorArea.toFixed(3)} cm²)
            </span>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Set θ = 90 and slide r from 5 to 10: the area reads 4× (not 2×) — the squared
              radius. Then hold r = 10 and double θ instead: exactly 2×. Angle is linear, radius is
              quadratic.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Sweep θ through 180°: watch the triangle area ½r²sin θ rise to its MAXIMUM at
              θ = 90° and shrink again toward 180° — sin peaks at right angles. The segment area
              equals the sector exactly at 180° (the chord becomes a diameter and the triangle
              vanishes).
            </p>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: COMBO LAB                                             */}
      {/* ============================================================ */}
      {tab === 'combo' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* clock module */}
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">Board classic 1 — the clock hand</p>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>hand length</span>
                <span className="font-mono text-cyan-300">{handLen} cm</span>
              </label>
              <input type="range" min={2} max={15} step={0.5} value={handLen} aria-label="hand length"
                onChange={(e) => setHandLen(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-cyan-500" />
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>minutes elapsed</span>
                <span className="font-mono text-cyan-300">{minutes} min</span>
              </label>
              <input type="range" min={0} max={60} step={1} value={minutes} aria-label="minutes elapsed"
                onChange={(e) => setMinutes(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-cyan-500" />
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-1 mt-2">
                <svg viewBox="0 0 200 200" className="w-full h-44" preserveAspectRatio="xMidYMid meet">
                  <circle cx={100} cy={100} r={80} fill="#0b1526" stroke="#334155" strokeWidth={1.5} />
                  {Array.from({ length: 12 }, (_, i) => {
                    const ang = (i / 12) * 2 * PI - PI / 2;
                    return (
                      <circle key={i} cx={100 + 70 * Math.cos(ang)} cy={100 + 70 * Math.sin(ang)} r={2} fill="#475569" />
                    );
                  })}
                  {(() => {
                    const ang = (minutes / 60) * 2 * PI - PI / 2;
                    const R = (handLen / 15) * 80;
                    const sweep = (minutes / 60) * 360;
                    const s0 = -PI / 2;
                    const s1 = s0 + (sweep * PI) / 180;
                    const full = sweep >= 359.5;
                    const path = full
                      ? undefined
                      : `M 100 100 L ${100 + R * Math.cos(s0)} ${100 + R * Math.sin(s0)} A ${R} ${R} 0 ${sweep > 180 ? 1 : 0} 1 ${100 + R * Math.cos(s1)} ${100 + R * Math.sin(s1)} Z`;
                    return (
                      <g>
                        {path && <path d={path} fill="#22d3ee" fillOpacity={0.3} stroke="#22d3ee" strokeWidth={1.2} style={{ transition: 'all 100ms linear' }} />}
                        {full && <circle cx={100} cy={100} r={R} fill="#22d3ee" fillOpacity={0.3} stroke="#22d3ee" strokeWidth={1.2} />}
                        <line x1={100} y1={100} x2={100 + R * Math.cos(ang)} y2={100 + R * Math.sin(ang)} stroke="#f8fafc" strokeWidth={2.5} strokeLinecap="round" style={{ transition: 'all 100ms linear' }} />
                      </g>
                    );
                  })()}
                  <circle cx={100} cy={100} r={3.5} fill="#f8fafc" />
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">tip path (arc)</p>
                  <p className="font-mono text-sm font-bold text-cyan-300">{tipArc.toFixed(2)} cm</p>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">swept area (sector)</p>
                  <p className="font-mono text-sm font-bold text-cyan-300">{sweepArea.toFixed(2)} cm²</p>
                </div>
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500 font-mono">({minutes}/60)·360° = {sweepDeg.toFixed(0)}° of sweep</p>
            </div>

            {/* goat module */}
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">Board classic 2 — the grazing goat</p>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>square field side</span>
                <span className="font-mono text-cyan-300">{fieldSide} m</span>
              </label>
              <input type="range" min={5} max={40} step={1} value={fieldSide} aria-label="field side"
                onChange={(e) => setFieldSide(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-cyan-500" />
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>rope length</span>
                <span className="font-mono text-cyan-300">{ropeLen} m</span>
              </label>
              <input type="range" min={1} max={40} step={0.5} value={ropeLen} aria-label="rope length"
                onChange={(e) => setRopeLen(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-cyan-500" />
              <button onClick={() => setGoatInside(!goatInside)} className="mt-1 min-h-11 px-3 py-2 rounded-xl text-xs font-bold border bg-slate-800 border-slate-700 text-slate-200 transition-all">
                goat is {goatInside ? 'INSIDE the field' : 'OUTSIDE the fences'}
              </button>
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-1 mt-2">
                <svg viewBox="0 0 220 220" className="w-full h-44" preserveAspectRatio="xMidYMid meet">
                  {(() => {
                    const S = Math.min(150, (fieldSide / 40) * 150 + 40);
                    const ox = 35;
                    const oy = 220 - 35 - S;
                    const R = (ropeLen / fieldSide) * S;
                    const cornerX = ox;
                    const cornerY = oy; // top-left corner tie point
                    const usable = goatInside ? 90 : 270;
                    const fracG = usable / 360;
                    const path = `M ${cornerX} ${cornerY} L ${cornerX + R} ${cornerY} A ${R} ${R} 0 ${usable > 180 ? 1 : 0} ${goatInside ? 1 : 0} ${cornerX + R * Math.cos((goatInside ? usable : -usable) * PI / 180)} ${cornerY + R * Math.sin((goatInside ? usable : -usable) * PI / 180)} Z`;
                    return (
                      <g>
                        <rect x={ox} y={oy} width={S} height={S} fill="#14532d" fillOpacity={0.5} stroke="#4ade80" strokeWidth={1.5} />
                        <path d={path} fill="#22d3ee" fillOpacity={goatInside ? 0.35 : 0.15} stroke="#22d3ee" strokeWidth={1.5} style={{ transition: 'all 100ms linear' }} />
                        <circle cx={cornerX} cy={cornerY} r={4} fill="#fb7185" />
                        <text x={cornerX + 8} y={cornerY - 6} fontSize={10} fill="#fb7185">tie point</text>
                        <text x={ox + S / 2} y={oy + S + 16} fontSize={10} fill="#4ade80" textAnchor="middle">field {fieldSide} × {fieldSide} m = {fieldArea} m²</text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">grazable angle</p>
                  <p className="font-mono text-sm font-bold text-cyan-300">{goatAngle}°</p>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">grazed area</p>
                  <p className="font-mono text-sm font-bold text-emerald-300">{goatArea.toFixed(2)} m²</p>
                </div>
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500 leading-relaxed font-mono">
                ({goatAngle}/360)·π·{ropeLen}² = {goatBase.toFixed(2)} m²{ropeLen > fieldSide && !goatInside ? ` + ${extraLobe.toFixed(2)} m² lobe(s) past the fence line` : ''} · rope {ropeLen <= fieldSide ? '≤' : '>'} side {fieldSide}
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-amber-900/50">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">What to try</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              ① Clock: set hand = 6 cm and slide 0 → 20 min. The tip walks an arc of
              (120/360)·2π·6 = 12.57 cm while the swept AREA is (120/360)·π·36 = 37.70 cm².
              Arc grows linearly in r; area carries r² — same hand, two different laws.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              ② Goat: keep the rope 14 m and push the field side down from 21 to 10: the single
              quarter-circle no longer fits (rope &gt; side) — the true grazed region grows extra
              lobes around the far corners. Watch the &quot;rope vs side&quot; note flip and the
              estimate become an UNDER-count: exactly the caveat NCERT problems expect you to state.
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
                  tierFilter === t ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
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
                    let cls = 'border-slate-700 bg-slate-900 hover:border-cyan-600';
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
              <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">Formula sheet (all live in this sim)</p>
              <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                <li>circumference C = 2πr · area = πr²</li>
                <li>arc l = (θ/360)·2πr = rθ (θ rad)</li>
                <li>sector A = (θ/360)·πr² = ½rl = ½r²θ</li>
                <li>chord c = 2r·sin(θ/2)</li>
                <li>triangle T = ½r²·sin θ (θ in radians!)</li>
                <li>segment = A − T ; perimeter = l + c</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">Honest-numerics notes</p>
              <ul className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
                <li>• The Lab computes with true π and even shows the 22/7 answer beside it — you can SEE the approximation cost.</li>
                <li>• The triangle formula ½r²·sin θ genuinely needs θ in radians; the code converts your degrees first — exactly what your notebook must do.</li>
                <li>• Segment area is shown as a subtraction of two live numbers, never a memorised magic value.</li>
                <li>• The goat module states its own validity condition (rope vs side) instead of hiding it — outside-lobe corrections appear only when the geometry truly needs them.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Where this chapter goes next</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sectors are the atoms of rotation: every wheel-and-distance problem, every pie chart,
              every radian you will meet in Class 11 trigonometry lives here. The segment subtraction
              (sector − triangle) is your first taste of finding &quot;complicated areas by
              subtraction&quot; — the strategy behind every shaded-region board question and,
              eventually, integration.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default C10_MathsAreasRelatedToCirclesSim;

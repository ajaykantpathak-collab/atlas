'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 12 MATHEMATICS NODE CONSTANTS ───
const NODE_C12_MATH_031 = 'c12_math_031'; // Consistency and inconsistency of systems of equations
const NODE_C12_MATH_032 = 'c12_math_032'; // Continuity of a function at a point
const NODE_C12_MATH_033 = 'c12_math_033'; // Continuity in an interval and algebra of continuous functions
const NODE_C12_MATH_034 = 'c12_math_034'; // Removable discontinuity
const NODE_C12_MATH_035 = 'c12_math_035'; // Differentiability and relation to continuity
const NODE_C12_MATH_036 = 'c12_math_036'; // Derivatives of composite functions (chain rule)
const NODE_C12_MATH_037 = 'c12_math_037'; // Derivatives of inverse trigonometric functions
const NODE_C12_MATH_038 = 'c12_math_038'; // Derivatives of exponential and logarithmic functions
const NODE_C12_MATH_039 = 'c12_math_039'; // Implicit differentiation
const NODE_C12_MATH_040 = 'c12_math_040'; // Logarithmic differentiation

const ALL_NODE_IDS = [
  NODE_C12_MATH_031,
  NODE_C12_MATH_032,
  NODE_C12_MATH_033,
  NODE_C12_MATH_034,
  NODE_C12_MATH_035,
  NODE_C12_MATH_036,
  NODE_C12_MATH_037,
  NODE_C12_MATH_038,
  NODE_C12_MATH_039,
  NODE_C12_MATH_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Autonomous Orbital Flight & Trajectory Control',
  intro: 'You are the Chief Guidance, Navigation, and Calculus Specialist at ISRO Telemetry, Tracking and Command Network (ISTRAC) in Bengaluru. Your team is steering an automated orbital transfer module towards a lunar orbit.',
  context: 'To achieve orbital insertion, the flight computer must resolve systems of linear sensor equations (AX = B), verify continuous propulsion transitions without thrust jumps, ensure smooth differentiable flight paths around gravitational cusps, and compute dynamic rate changes using composite, inverse trig, implicit, and logarithmic derivatives.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'When analyzing dual thruster vector equations AX = B, the telemetry reports det(A) = |A| = 0. A trainee engineer immediately flags: "System has zero thrust solutions! Mission failed!" Is this diagnosis necessarily true?',
  options: [
    'Yes, |A| = 0 always means there are zero solutions (complete inconsistency).',
    'No, if |A| = 0, the system could still have infinitely many solutions if (adj A)B = O.',
    'No, |A| = 0 always means there is a unique stable solution.',
    'Yes, Martin\'s Rule guarantees no solutions whenever |A| is singular.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: |A| = 0 is a fork in the road. It splits into Inconsistent (no solution) OR Dependent (infinitely many solutions) depending on (adj A)B!',
};

// ─── SVG DIAGRAM 1: Matrix Consistency Decision Flowchart ───
const MatrixConsistencyTreeSVG: React.FC<{ det: number; adjBZero: boolean }> = ({ det, adjBZero }) => {
  const isNonSingular = det !== 0;
  const isInfinite = det === 0 && adjBZero;
  const isInconsistent = det === 0 && !adjBZero;

  return (
    <svg viewBox="0 0 540 240" className="w-full h-auto max-w-lg mx-auto bg-slate-950/80 rounded-xl border border-slate-800 p-2" aria-label="Matrix consistency decision tree diagram">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#818cf8" />
        </marker>
      </defs>
      {/* Root node */}
      <rect x="180" y="10" width="180" height="38" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
      <text x="270" y="34" textAnchor="middle" fill="#e0e7ff" fontSize="13" fontWeight="bold">System Matrix AX = B</text>

      {/* Left Branch: |A| != 0 */}
      <path d="M 220 48 L 110 90" stroke={isNonSingular ? '#10b981' : '#475569'} strokeWidth={isNonSingular ? '3' : '1.5'} markerEnd="url(#arrow)" />
      <text x="140" y="70" fill={isNonSingular ? '#34d399' : '#94a3b8'} fontSize="11" fontWeight="bold">|A| ≠ 0</text>

      {/* Right Branch: |A| == 0 */}
      <path d="M 320 48 L 410 90" stroke={!isNonSingular ? '#f59e0b' : '#475569'} strokeWidth={!isNonSingular ? '3' : '1.5'} markerEnd="url(#arrow)" />
      <text x="385" y="70" fill={!isNonSingular ? '#fbbf24' : '#94a3b8'} fontSize="11" fontWeight="bold">|A| = 0 (Singular)</text>

      {/* Left Target: Unique Solution */}
      <rect x="20" y="90" width="180" height="52" rx="8" fill={isNonSingular ? '#064e3b' : '#0f172a'} stroke={isNonSingular ? '#10b981' : '#334155'} strokeWidth="2" />
      <text x="110" y="112" textAnchor="middle" fill={isNonSingular ? '#6ee7b7' : '#cbd5e1'} fontSize="12" fontWeight="bold">✓ UNIQUE SOLUTION</text>
      <text x="110" y="130" textAnchor="middle" fill="#94a3b8" fontSize="11">X = A⁻¹B (Consistent)</text>

      {/* Right Intermediate: Check (adj A)B */}
      <rect x="330" y="90" width="170" height="42" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
      <text x="415" y="115" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Evaluate (adj A)B</text>

      {/* Sub-branches from |A| == 0 */}
      <path d="M 370 132 L 310 170" stroke={isInfinite ? '#10b981' : '#475569'} strokeWidth={isInfinite ? '2.5' : '1'} markerEnd="url(#arrow)" />
      <text x="315" y="152" fill={isInfinite ? '#34d399' : '#94a3b8'} fontSize="10">(adj A)B = O</text>

      <path d="M 460 132 L 480 170" stroke={isInconsistent ? '#ef4444' : '#475569'} strokeWidth={isInconsistent ? '2.5' : '1'} markerEnd="url(#arrow)" />
      <text x="495" y="152" fill={isInconsistent ? '#f87171' : '#94a3b8'} fontSize="10">(adj A)B ≠ O</text>

      {/* Infinitely many */}
      <rect x="210" y="172" width="160" height="52" rx="8" fill={isInfinite ? '#064e3b' : '#0f172a'} stroke={isInfinite ? '#10b981' : '#334155'} strokeWidth="2" />
      <text x="290" y="194" textAnchor="middle" fill={isInfinite ? '#6ee7b7' : '#cbd5e1'} fontSize="11" fontWeight="bold">✓ INFINITELY MANY</text>
      <text x="290" y="212" textAnchor="middle" fill="#94a3b8" fontSize="10">Dependent / Coincident</text>

      {/* Inconsistent */}
      <rect x="390" y="172" width="140" height="52" rx="8" fill={isInconsistent ? '#4c0519' : '#0f172a'} stroke={isInconsistent ? '#ef4444' : '#334155'} strokeWidth="2" />
      <text x="460" y="194" textAnchor="middle" fill={isInconsistent ? '#fca5a5' : '#cbd5e1'} fontSize="11" fontWeight="bold">✗ INCONSISTENT</text>
      <text x="460" y="212" textAnchor="middle" fill="#94a3b8" fontSize="10">No Solution (Parallel)</text>
    </svg>
  );
};

// ─── SVG DIAGRAM 2: Continuity at Point x = a ───
const ContinuityConceptSVG: React.FC<{ isContinuous: boolean; lhl: number; rhl: number; fa: number }> = ({ isContinuous, lhl, rhl, fa }) => {
  return (
    <svg viewBox="0 0 400 180" className="w-full h-auto bg-slate-950/80 rounded-xl border border-slate-800 p-2" aria-label="Continuity of function at a point diagram">
      {/* Axes */}
      <line x1="40" y1="150" x2="360" y2="150" stroke="#475569" strokeWidth="1.5" />
      <line x1="50" y1="20" x2="50" y2="160" stroke="#475569" strokeWidth="1.5" />
      <text x="350" y="140" fill="#94a3b8" fontSize="11">x</text>
      <text x="60" y="30" fill="#94a3b8" fontSize="11">y</text>

      {/* x = a vertical dotted line */}
      <line x1="200" y1="20" x2="200" y2="150" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" />
      <text x="195" y="165" fill="#818cf8" fontSize="11" fontWeight="bold">x = a</text>

      {/* Left Curve */}
      <path d="M 60 120 Q 140 100 195 70" fill="none" stroke="#38bdf8" strokeWidth="3" />
      {/* Left Limit Arrow */}
      <line x1="140" y1="110" x2="175" y2="90" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="90" y="80" fill="#38bdf8" fontSize="10">lim x→a⁻ (LHL = {lhl.toFixed(1)})</text>

      {/* Right Curve */}
      <path d={isContinuous ? "M 205 70 Q 260 50 340 30" : "M 205 40 Q 260 30 340 20"} fill="none" stroke="#34d399" strokeWidth="3" />
      <text x="240" y="35" fill="#34d399" fontSize="10">lim x→a⁺ (RHL = {rhl.toFixed(1)})</text>

      {/* Point f(a) */}
      {isContinuous ? (
        <circle cx="200" cy="70" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
      ) : (
        <>
          <circle cx="200" cy="70" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="200" cy="40" r="5" fill="#34d399" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="200" cy="100" r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
          <text x="210" y="105" fill="#f43f5e" fontSize="9">f(a) = {fa.toFixed(1)} (isolated)</text>
        </>
      )}

      {/* Status Badge */}
      <rect x="250" y="125" width="135" height="24" rx="4" fill={isContinuous ? '#064e3b' : '#4c0519'} />
      <text x="317" y="141" textAnchor="middle" fill={isContinuous ? '#6ee7b7' : '#fca5a5'} fontSize="10" fontWeight="bold">
        {isContinuous ? '✓ LHL = RHL = f(a)' : '✗ Discontinuous'}
      </text>
    </svg>
  );
};

// ─── SVG DIAGRAM 3: Differentiability vs Continuity Sharp Corner ───
const DifferentiabilityCornerSVG: React.FC<{ type: 'abs' | 'parabola'; probeX: number }> = ({ type, probeX }) => {
  return (
    <svg viewBox="0 0 380 180" className="w-full h-auto bg-slate-950/80 rounded-xl border border-slate-800 p-2" aria-label="Differentiability and corner comparison diagram">
      <line x1="30" y1="140" x2="350" y2="140" stroke="#475569" strokeWidth="1.5" />
      <line x1="190" y1="20" x2="190" y2="155" stroke="#475569" strokeWidth="1.5" />
      <text x="340" y="132" fill="#94a3b8" fontSize="10">x</text>
      <text x="200" y="30" fill="#94a3b8" fontSize="10">y</text>

      {type === 'abs' ? (
        <>
          {/* Absolute value V shape */}
          <path d="M 70 40 L 190 140 L 310 40" fill="none" stroke="#fbbf24" strokeWidth="3" />
          {/* Sharp cusp indicator */}
          <circle cx="190" cy="140" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
          {/* LHD vector */}
          <line x1="140" y1="98" x2="185" y2="136" stroke="#ef4444" strokeWidth="2.5" />
          <text x="80" y="115" fill="#ef4444" fontSize="10" fontWeight="bold">LHD = -1 (Slope)</text>
          {/* RHD vector */}
          <line x1="195" y1="136" x2="240" y2="98" stroke="#22c55e" strokeWidth="2.5" />
          <text x="235" y="115" fill="#22c55e" fontSize="10" fontWeight="bold">RHD = +1 (Slope)</text>

          <rect x="60" y="10" width="260" height="22" rx="4" fill="#451a03" />
          <text x="190" y="25" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">
            f(x) = |x|: Continuous at 0, but NOT Differentiable (LHD ≠ RHD)
          </text>
        </>
      ) : (
        <>
          {/* Parabola smooth curve */}
          <path d="M 90 40 Q 190 150 290 40" fill="none" stroke="#a855f7" strokeWidth="3" />
          <circle cx="190" cy="135" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
          {/* Horizontal Tangent line at vertex */}
          <line x1="130" y1="135" x2="250" y2="135" stroke="#10b981" strokeWidth="2.5" />
          <text x="190" y="155" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">LHD = RHD = 0 (Smooth Tangent)</text>

          <rect x="60" y="10" width="260" height="22" rx="4" fill="#2e1065" />
          <text x="190" y="25" textAnchor="middle" fill="#e9d5ff" fontSize="10" fontWeight="bold">
            f(x) = x²: Smooth & Differentiable everywhere (f'(0) = 0)
          </text>
        </>
      )}
    </svg>
  );
};

// ─── CHALLENGE INTERFACE (NEP 2020 Competency Aligned) ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  sortItems?: string[];
  correctOrder?: number[];
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  availableParts?: string[];
  targetState?: string;
  validationHint?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // Foundation: c12_math_031
  {
    id: 'ch_01',
    nodeId: NODE_C12_MATH_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Martin\'s Rule for a non-homogeneous system AX = B, what condition guarantees a unique, well-defined solution?',
    options: [
      '|A| = 0 and (adj A)B = O',
      '|A| ≠ 0 (Matrix A is non-singular and invertible: X = A⁻¹B)',
      '|A| = 0 and (adj A)B ≠ O',
      'adj(A) = O regardless of |A|',
    ],
    correctIndex: 1,
    explanation: 'When |A| ≠ 0, A is non-singular. The inverse A⁻¹ = adj(A)/|A| exists uniquely, giving the single unique solution X = A⁻¹B.',
    hints: [
      'Think about when matrix inversion A⁻¹ is algebraically valid.',
      'A⁻¹ requires dividing by the determinant |A|.',
      'If |A| is non-zero, A is invertible and X = A⁻¹B yields one exact vector.',
    ],
    misconceptionIndex: 0,
  },
  // Foundation: c12_math_032
  {
    id: 'ch_02',
    nodeId: NODE_C12_MATH_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'For a function f(x) to be continuous at point x = a, which triple equality must hold simultaneously?',
    options: [
      'f\'(a) = LHL = RHL',
      'lim_{x→a⁻} f(x) = lim_{x→a⁺} f(x) = f(a) [LHL = RHL = f(a)]',
      'f(a) is defined and f\'(a) exists',
      'LHL = RHL even if f(a) is undefined',
    ],
    correctIndex: 1,
    explanation: 'Continuity requires: (1) f(a) is defined, (2) two-sided limit exists (LHL = RHL), and (3) limit equals the actual value: LHL = RHL = f(a).',
    hints: [
      'Continuity means drawing the curve without lifting your stylus.',
      'The left path, right path, and central point must all meet at the exact same elevation.',
      'Therefore: LHL = RHL = f(a).',
    ],
    misconceptionIndex: 1,
  },
  // Foundation: c12_math_034
  {
    id: 'ch_03',
    nodeId: NODE_C12_MATH_034,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Flight software defines target speed v(t) = (t² - 9)/(t - 3) km/s for t ≠ 3. To remove the discontinuity at t = 3, what continuous extension value v(3) must be assigned?',
    correctAnswer: 6,
    tolerance: 0.1,
    unit: 'km/s',
    explanation: 'Factoring: (t² - 9)/(t - 3) = (t - 3)(t + 3)/(t - 3) = t + 3 for t ≠ 3. The limit as t → 3 is 3 + 3 = 6. Assigning v(3) = 6 patches the missing point.',
    hints: [
      'Factorize the numerator t² - 9 into difference of squares.',
      'Cancel the (t - 3) factor and evaluate the limit as t approaches 3.',
      '3 + 3 = 6.',
    ],
  },
  // Foundation: c12_math_035
  {
    id: 'ch_04',
    nodeId: NODE_C12_MATH_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Consider the altitude function h(x) = |x| at x = 0. Which statement accurately describes its continuity and differentiability?',
    options: [
      'Continuous at x = 0, but NOT differentiable at x = 0 (LHD = -1 ≠ +1 = RHD)',
      'Neither continuous nor differentiable at x = 0',
      'Both continuous and differentiable at x = 0 with derivative 0',
      'Differentiable at x = 0, but not continuous',
    ],
    correctIndex: 0,
    explanation: 'At x = 0, lim |x| = 0 = |0| (continuous). However, LHD = lim_{h→0⁻} (-h)/h = -1 while RHD = lim_{h→0⁺} h/h = +1. The sharp corner prevents a unique tangent.',
    hints: [
      'Look at the V-shape of the absolute value graph at the origin.',
      'Can you draw a single unambiguous tangent line on the sharp tip?',
      'LHD is -1 (downward slope) and RHD is +1 (upward slope).',
    ],
    misconceptionIndex: 2,
  },
  // Foundation: c12_math_036
  {
    id: 'ch_05',
    nodeId: NODE_C12_MATH_036,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Given sensor reading y = (2x + 5)⁴, evaluate dy/dx at x = -2 using the Chain Rule.',
    correctAnswer: 8,
    tolerance: 0.1,
    unit: 'units',
    explanation: 'Let u = 2x + 5, then y = u⁴. dy/dx = (dy/du)(du/dx) = 4(2x + 5)³ · 2 = 8(2x + 5)³. At x = -2: 8(2(-2) + 5)³ = 8(1)³ = 8.',
    hints: [
      'Differentiate the outer power: 4(2x + 5)³.',
      'Multiply by the inner derivative d/dx(2x + 5) = 2.',
      'Substitute x = -2 into 8(2x + 5)³.',
    ],
  },
  // Standard: c12_math_031
  {
    id: 'ch_06',
    nodeId: NODE_C12_MATH_031,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'ISRO mission protocol: Arrange the exact algorithmic steps to solve the linear thruster system AX = B in ISC exam format.',
    sortItems: [
      'Write the system in matrix form AX = B and extract matrix A, X, and B',
      'Calculate the determinant |A| to test for non-singularity',
      'Compute the cofactor matrix and transpose it to obtain adj(A)',
      'Form the inverse A⁻¹ = (1/|A|) adj(A) (if |A| ≠ 0)',
      'Multiply X = A⁻¹B to extract the unique coordinate solutions',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Correct ISC protocol: Express AX = B → Compute |A| → If |A| ≠ 0, find cofactors & adj(A) → Form A⁻¹ = adj(A)/|A| → Multiply X = A⁻¹B.',
    hints: [
      'You cannot compute A⁻¹ before you know |A| ≠ 0.',
      'Adjoint comes from transposing the matrix of cofactors.',
      'Final step is always X = A⁻¹B.',
    ],
  },
  // Standard: c12_math_037
  {
    id: 'ch_07',
    nodeId: NODE_C12_MATH_037,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Differentiate y = tan⁻¹(2x / (1 - x²)) for |x| < 1 with respect to x using trigonometric substitution.',
    options: [
      'dy/dx = 2 / (1 + x²)',
      'dy/dx = 1 / (1 + x²)',
      'dy/dx = 2x / (1 - x⁴)',
      'dy/dx = -2 / √(1 - x²)',
    ],
    correctIndex: 0,
    explanation: 'Put x = tan θ. Then 2x/(1 - x²) = 2 tan θ / (1 - tan²θ) = tan 2θ. So y = tan⁻¹(tan 2θ) = 2θ = 2 tan⁻¹x. Differentiating gives dy/dx = 2/(1 + x²).',
    hints: [
      'Recall the double angle formula: tan(2θ) = 2 tan θ / (1 - tan²θ).',
      'Substitute x = tan θ so the inner expression collapses to tan 2θ.',
      'Differentiate 2 tan⁻¹x with standard derivative formula.',
    ],
    misconceptionIndex: 3,
  },
  // Standard: c12_math_038
  {
    id: 'ch_08',
    nodeId: NODE_C12_MATH_038,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A propulsion temperature profile is modeled as T(x) = 5^(sin x). What is the instantaneous rate of temperature change dT/dx?',
    options: [
      '5^(sin x) · cos x · ln 5',
      '(sin x) · 5^(sin x - 1) · cos x',
      '5^(cos x) · ln 5',
      '5^(sin x) / ln 5',
    ],
    correctIndex: 0,
    explanation: 'For a general base a^(u(x)), d/dx[a^u] = a^u · ln a · u\'(x). With a = 5 and u = sin x, dT/dx = 5^(sin x) · (ln 5) · cos x.',
    hints: [
      'Base 5 is a constant; the exponent has the variable x.',
      'Do NOT use the power rule n·x^(n-1)! This is an exponential function.',
      'Remember the ln(base) factor and the chain rule on sin x.',
    ],
    misconceptionIndex: 4,
  },
  // Standard: c12_math_039
  {
    id: 'ch_09',
    nodeId: NODE_C12_MATH_039,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the correct derivative dy/dx for the orbital constraint circle x² + y² = 25 using implicit differentiation parts.',
    availableParts: ['dy/dx =', '-x', '/', 'y', '+x', '2y', '-y'],
    targetState: 'dy/dx = -x / y',
    validationHint: 'Differentiate: 2x + 2y(dy/dx) = 0. Solve for dy/dx.',
    explanation: 'Differentiating both sides w.r.t x: 2x + 2y(dy/dx) = 0 ⇒ 2y(dy/dx) = -2x ⇒ dy/dx = -x/y.',
    hints: [
      'Differentiating y² w.r.t x yields 2y · (dy/dx) by the chain rule.',
      'Move 2x to the RHS to get -2x.',
      'Divide by 2y to isolate dy/dx.',
    ],
  },
  // Standard: c12_math_040
  {
    id: 'ch_10',
    nodeId: NODE_C12_MATH_040,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does differentiating y = x^x REQUIRE logarithmic differentiation rather than the standard Power Rule or Exponential Rule?',
    options: [
      'Because both the base f(x) = x and exponent g(x) = x vary with x simultaneously.',
      'Because x^x is discontinuous at all rational points.',
      'Because the determinant of x^x is undefined.',
      'Because Martin\'s Rule prohibits exponents in polynomial algebra.',
    ],
    correctIndex: 0,
    explanation: 'The power rule requires a CONSTANT exponent (x^n); the exponential rule requires a CONSTANT base (a^x). When both base and exponent vary, ln must be applied to bring the exponent down: ln y = x ln x.',
    hints: [
      'Is the exponent a fixed number like 3? No, it is x.',
      'Is the base a fixed number like e or 2? No, it is x.',
      'When both base and exponent are variable functions, taking ln y is mandatory.',
    ],
  },
  // Standard: c12_math_033
  {
    id: 'ch_11',
    nodeId: NODE_C12_MATH_033,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A piecewise thrust curve is given by f(x) = x² for 0 ≤ x ≤ 2, and f(x) = kx - 4 for 2 < x ≤ 5. Find the exact constant k that ensures continuity across [0, 5].',
    correctAnswer: 4,
    tolerance: 0.1,
    unit: 'constant',
    explanation: 'At junction x = 2: LHL = lim_{x→2⁻} x² = 4. RHL = lim_{x→2⁺} (kx - 4) = 2k - 4. For continuity, LHL = RHL ⇒ 4 = 2k - 4 ⇒ 2k = 8 ⇒ k = 4.',
    hints: [
      'Compute the left limit at x = 2 using the first branch x².',
      'Compute the right limit at x = 2 using the second branch k(2) - 4.',
      'Set 4 = 2k - 4 and solve for k.',
    ],
  },
  // Advanced: c12_math_031
  {
    id: 'ch_12',
    nodeId: NODE_C12_MATH_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Consider the antenna alignment system: x + 2y = 5 and 2x + 4y = 6. Evaluate the determinant and (adj A)B to classify this system.',
    options: [
      '|A| = 0 and (adj A)B = [8, -4]ᵀ ≠ O ⇒ System is INCONSISTENT (No solution; parallel lines)',
      '|A| = 0 and (adj A)B = [0, 0]ᵀ ⇒ System is CONSISTENT with infinitely many solutions',
      '|A| = -2 ≠ 0 ⇒ Unique solution via Martin\'s Rule',
      '|A| = 4 ≠ 0 ⇒ Consistent with intersecting planes',
    ],
    correctIndex: 0,
    explanation: 'A = [[1, 2], [2, 4]], |A| = 4 - 4 = 0. adj(A) = [[4, -2], [-2, 1]]. (adj A)B = [[4, -2], [-2, 1]] * [[5], [6]] = [[20 - 12], [-10 + 6]] = [[8], [-4]] ≠ O. Hence, inconsistent.',
    hints: [
      'Find |A| = 1(4) - 2(2) = 0.',
      'Multiply the adjoint [[4, -2], [-2, 1]] by the vector [5, 6]ᵀ.',
      'Since the result is [8, -4]ᵀ (not zero vector), the system has no solution.',
    ],
    misconceptionIndex: 0,
  },
  // Advanced: c12_math_035
  {
    id: 'ch_13',
    nodeId: NODE_C12_MATH_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Evaluate the ISC theorem: "Differentiability implies Continuity, but Continuity does NOT imply Differentiability." Which counter-proof validates the second half?',
    options: [
      'f(x) = |x| at x = 0 is continuous (limit = 0), but LHD (-1) ≠ RHD (+1), so not differentiable.',
      'f(x) = x² is everywhere differentiable but has jump discontinuities.',
      'f(x) = [x] is differentiable at all integer points.',
      'f(x) = 1/x is continuous on the entire real line including x = 0.',
    ],
    correctIndex: 0,
    explanation: 'The standard counter-example is f(x) = |x| at 0. It is continuous (no break), yet possesses a sharp cusp where tangent slopes from left (-1) and right (+1) disagree.',
    hints: [
      'Recall the classic V-shaped curve.',
      'It is unbroken at x = 0, proving continuity.',
      'Its one-sided slopes are -1 and +1, proving non-differentiability.',
    ],
    misconceptionIndex: 2,
  },
  // Advanced: c12_math_036
  {
    id: 'ch_14',
    nodeId: NODE_C12_MATH_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Differentiate the 3-layer composite guidance waveform y = sin((3x + 2)²). What is dy/dx?',
    options: [
      'dy/dx = 6(3x + 2) cos((3x + 2)²)',
      'dy/dx = cos((3x + 2)²)',
      'dy/dx = 2(3x + 2) sin((3x + 2)²)',
      'dy/dx = 3 cos(6x + 4)',
    ],
    correctIndex: 0,
    explanation: 'Layer 1 (outer): cos((3x + 2)²). Layer 2 (middle power): 2(3x + 2). Layer 3 (inner linear): 3. Product: cos((3x + 2)²) · 2(3x + 2) · 3 = 6(3x + 2) cos((3x + 2)²).',
    hints: [
      'Peel the onion: outer = sin(u), middle = v², inner = 3x + 2.',
      'Multiply all 3 derivatives: cos(u) · 2v · 3.',
      'Combine constants: 2 × 3 = 6.',
    ],
  },
  // Advanced: c12_math_039
  {
    id: 'ch_15',
    nodeId: NODE_C12_MATH_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For the folium contour x³ + y³ = 3axy, find the implicit derivative dy/dx.',
    options: [
      'dy/dx = (ay - x²) / (y² - ax)',
      'dy/dx = (x² - ay) / (y² - ax)',
      'dy/dx = (3x² + 3y²) / 3a',
      'dy/dx = -x² / y²',
    ],
    correctIndex: 0,
    explanation: 'Differentiating: 3x² + 3y²(dy/dx) = 3a(y · 1 + x · dy/dx). Divide by 3: x² + y²(dy/dx) = ay + ax(dy/dx). Grouping: (y² - ax) dy/dx = ay - x² ⇒ dy/dx = (ay - x²)/(y² - ax).',
    hints: [
      'Use product rule on 3axy: 3a(y + x dy/dx).',
      'Use chain rule on y³: 3y² (dy/dx).',
      'Collect all terms containing dy/dx on the LHS and factor out.',
    ],
  },
  // Advanced: c12_math_040
  {
    id: 'ch_16',
    nodeId: NODE_C12_MATH_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Using logarithmic differentiation, find dy/dx for the variable thrust equation y = x^(sin x) for x > 0.',
    options: [
      'dy/dx = x^(sin x) · [cos x · ln x + (sin x) / x]',
      'dy/dx = (sin x) · x^(sin x - 1)',
      'dy/dx = x^(sin x) · cos x · ln x',
      'dy/dx = x^(cos x) + (sin x) / x',
    ],
    correctIndex: 0,
    explanation: 'ln y = sin x · ln x. Differentiating implicitly: (1/y)(dy/dx) = (cos x)(ln x) + (sin x)(1/x). Multiply by y = x^(sin x) to get x^(sin x)[cos x ln x + (sin x)/x].',
    hints: [
      'Take natural log of both sides: ln y = sin x · ln x.',
      'Differentiate LHS to get (1/y) dy/dx.',
      'Apply Product Rule to RHS: d/dx[sin x] · ln x + sin x · d/dx[ln x].',
    ],
  },
  // Drag-Label: c12_math_032 & c12_math_034
  {
    id: 'ch_17',
    nodeId: NODE_C12_MATH_034,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag the correct classification labels to each discontinuity diagram position.',
    dragItems: [
      { label: 'Removable (Hole)', targetId: 'box_hole' },
      { label: 'Jump Discontinuity', targetId: 'box_jump' },
      { label: 'Essential (Asymptote)', targetId: 'box_inf' },
      { label: 'Smooth Continuous', targetId: 'box_cont' },
    ],
    correctMapping: {
      box_hole: 'Removable (Hole)',
      box_jump: 'Jump Discontinuity',
      box_inf: 'Essential (Asymptote)',
      box_cont: 'Smooth Continuous',
    },
    explanation: 'Hole = Removable (limit exists, missing/redefined point). Step = Jump (LHL ≠ RHL). Vertical spike = Infinite/Essential. Unbroken line = Continuous.',
    hints: [
      'A missing single point on an otherwise straight line is a Removable Hole.',
      'When left and right branches end at different heights, it is a Jump.',
      'When values explode to ±infinity, it is Essential.',
    ],
  },
  // Advanced: c12_math_038 & Product Rule
  {
    id: 'ch_18',
    nodeId: NODE_C12_MATH_038,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A deceleration sensor reads y = x² · e^(3x). Find the numerical value of [e^(-3) · dy/dx] evaluated at x = 1.',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: 'units',
    explanation: 'dy/dx = 2x · e^(3x) + x² · 3e^(3x) = e^(3x)(2x + 3x²). At x = 1: dy/dx = e³(2(1) + 3(1)²) = 5e³. Dividing by e³ yields 5.',
    hints: [
      'Apply product rule: u\'v + uv\'.',
      'u = x² ⇒ u\' = 2x. v = e^(3x) ⇒ v\' = 3e^(3x).',
      'dy/dx = e^(3x)(2x + 3x²). At x = 1, expression inside bracket is 2 + 3 = 5.',
    ],
  },
  // Advanced Competency: c12_math_031
  {
    id: 'ch_19',
    nodeId: NODE_C12_MATH_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You must design a redundant sensor system with 3 equations in 3 variables that has INFINITELY many calibration solutions. Which matrix condition must you enforce?',
    options: [
      'Construct dependent equations such that |A| = 0 and every cofactor C_ij = 0, giving (adj A)B = O',
      'Set |A| = 1 and (adj A)B = I',
      'Ensure |A| ≠ 0 so that Martin\'s Rule yields a single focal point',
      'Make |A| = 0 and (adj A)B = [1, 2, 3]ᵀ',
    ],
    correctIndex: 0,
    explanation: 'Infinitely many solutions occur when the coefficient matrix is singular (|A| = 0) and the system equations are linearly dependent multiples, ensuring (adj A)B = O.',
    hints: [
      'All 3 equations must represent the exact same geometrical plane or line of planes.',
      '|A| must equal 0 (singular).',
      '(adj A)B must be the ZERO matrix O.',
    ],
  },
  // Competency Evaluation: c12_math_039
  {
    id: 'ch_20',
    nodeId: NODE_C12_MATH_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Telemetry equation: sin(xy) = x. A flight programmer proposes dy/dx = 1/cos(xy). Evaluate this code module.',
    options: [
      'CRITICAL BUG: Programmer treated xy as single variable, omitting product rule inside chain rule. Correct dy/dx = (1 - y cos(xy)) / (x cos(xy)).',
      'VALID CODE: Differentiating sin(u) yields cos(u) and 1/cos(u) is exact.',
      'CRITICAL BUG: The right side derivative of x is 0, not 1.',
      'VALID CODE: Because x and y are independent variables in telemetry.',
    ],
    correctIndex: 0,
    explanation: 'sin(xy) is a composite function whose inner term is a product: d/dx[sin(xy)] = cos(xy) · (y + x dy/dx) = 1 ⇒ dy/dx = (1 - y cos(xy))/(x cos(xy)).',
    hints: [
      'What is the derivative of the inner product xy with respect to x?',
      'd/dx(xy) = y + x(dy/dx).',
      'Multiplying by cos(xy) gives cos(xy)[y + x dy/dx] = 1. Solve for dy/dx.',
    ],
    misconceptionIndex: 1,
  },
  // Foundation: c12_math_037
  {
    id: 'ch_21',
    nodeId: NODE_C12_MATH_037,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the standard derivative of y = sin⁻¹(x) on its valid domain |x| < 1?',
    options: [
      '1 / √(1 - x²)',
      '-1 / √(1 - x²)',
      '1 / (1 + x²)',
      '1 / (|x|√(x² - 1))',
    ],
    correctIndex: 0,
    explanation: 'If y = sin⁻¹x, then x = sin y ⇒ 1 = cos y (dy/dx) ⇒ dy/dx = 1/cos y = 1/√(1 - sin²y) = 1/√(1 - x²).',
    hints: [
      'Recall the derivative of sin⁻¹x from the principal branch [-π/2, π/2].',
      'Cosine is positive on this branch, so the root is positive.',
      'The formula is 1 / √(1 - x²).',
    ],
  },
  // Advanced: c12_math_040
  {
    id: 'ch_22',
    nodeId: NODE_C12_MATH_040,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Build the derivative expression for y = x^x by ordering the key differentiated factors.',
    availableParts: ['x^x', '·', '(1 + ln x)', '(ln x - 1)', 'x^(x-1)', '+', '1/x'],
    targetState: 'x^x · (1 + ln x)',
    validationHint: 'ln y = x ln x ⇒ (1/y) dy/dx = ln x + 1 ⇒ dy/dx = y(1 + ln x).',
    explanation: 'Taking ln: ln y = x ln x. Differentiating: (1/y) dy/dx = 1 · ln x + x · (1/x) = ln x + 1. Multiplying by y gives x^x · (1 + ln x).',
    hints: [
      'The outer multiplier is the original function x^x.',
      'Inside the brackets is 1 plus the natural log of x.',
      'Combine: x^x · (1 + ln x).',
    ],
  },
];

// ─── INTERACTIVE EXPLORATION LABS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Systems of Equations & Matrix Determinants',
    instruction: 'Adjust the determinant |A| slider to observe the transition from a Unique Single Intersection to Parallel (Inconsistent) and Overlapping (Infinite) lines.',
    interactionType: 'slider-matrix',
    nodeId: NODE_C12_MATH_031,
  },
  {
    title: 'Lab 2: Continuity & Limits at a Junction',
    instruction: 'Drag the probe x towards the critical junction x = 2. Match Left-Hand Limit (LHL) and Right-Hand Limit (RHL) with the dot height f(2).',
    interactionType: 'slider-limit',
    nodeId: NODE_C12_MATH_032,
  },
  {
    title: 'Lab 3: Differentiability vs Continuity (|x| vs x²)',
    instruction: 'Toggle between the smooth parabola y = x² and the sharp corner y = |x|. Watch the Left-Hand Derivative (LHD) and Right-Hand Derivative (RHD) tangent vectors.',
    interactionType: 'toggle-tangent',
    nodeId: NODE_C12_MATH_035,
  },
  {
    title: 'Lab 4: The Chain Rule Onion Peeler',
    instruction: 'Click each layer of y = sin((2x + 1)³) to reveal its derivative contribution: Outer Trig × Middle Power × Inner Linear.',
    interactionType: 'layer-peeler',
    nodeId: NODE_C12_MATH_036,
  },
  {
    title: 'Lab 5: Implicit & Logarithmic Power Transformer',
    instruction: 'Slide the variable exponent of y = x^x and watch the logarithmic transform ln y = x ln x turn an intractable power into a simple product.',
    interactionType: 'log-transform',
    nodeId: NODE_C12_MATH_040,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you continuously tilt a pair of lines until their slopes become identical (parallel) with different y-intercepts, what happens to |A| and the solution set?',
    options: [
      '|A| becomes 0, and the system switches from 1 solution to 0 solutions (Inconsistent)',
      '|A| remains non-zero, and solutions double',
      '|A| becomes 0, and solutions become infinite immediately',
      '|A| becomes negative, but the unique point is preserved',
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the Determinant slider to |A| = 0 in the Matrix Lab below and check the parallel line geometry!',
    nodeId: NODE_C12_MATH_031,
  },
  {
    question: 'Predict: For f(x) = |x| at the vertex x = 0, as you approach from the left (h → 0⁻), what is the slope of the secant line?',
    options: ['-1.0', '+1.0', '0.0', 'Undefined / Infinite'],
    correctIndex: 0,
    verifyInstruction: 'Check Lab 3: Observe the red LHD tangent arrow showing a constant slope of -1.0 coming into the origin.',
    nodeId: NODE_C12_MATH_035,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the tangent arrows on the sharp cusp of y = |x| at x = 0?',
    observableOptions: [
      'The left tangent (LHD = -1) and right tangent (RHD = +1) do not align, creating a sudden jump in slope.',
      'Both tangents smoothly blend to horizontal slope 0.',
      'The function has a vertical asymptote at x = 0.',
      'The left and right limits do not meet at y = 0.',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_MATH_035,
  },
  {
    question: 'When the determinant |A| becomes exactly 0 in the systems lab, what geometric transformation occurs to the two system lines?',
    observableOptions: [
      'The lines become parallel (same slope) and either never meet or lie on top of each other.',
      'The lines become perpendicular to each other at (0,0).',
      'One line curves into a parabola while the other remains linear.',
      'The intersection point moves directly to the origin (0,0).',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_MATH_031,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Trajectory Insertion Engineer Mission',
  description: 'Apply ISC Class 12 Calculus to a real aerospace mission: Design a continuous and differentiable docking thruster curve connecting an approach trajectory to an orbit.',
  steps: [
    'Define approach profile: f(t) = a t² + b for t ≤ 2, and docking line g(t) = 4t - 1 for t > 2.',
    'Enforce Continuity: Equate f(2) = g(2) ⇒ 4a + b = 7.',
    'Enforce Differentiability (Smooth Tangent): Equate f\'(2) = g\'(2) ⇒ 4a = 4 ⇒ a = 1.',
    'Solve the 2x2 linear system using Martin\'s Rule (AX = B) to find calibration parameters a = 1, b = 3.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── PROPS INTERFACE ───
interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: { misconception: string; correction: string }[];
  diagnosticQuestions?: { question: string; options: string[]; correctIndex: number }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

// ─── DEFAULT ENRICHED PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_MATH_031,
  title: 'Consistency of Linear Systems & Differential Calculus Mastery',
  definition: 'Comprehensive mastery of matrix systems consistency (Martin\'s Rule |A| and (adj A)B), continuity (LHL = RHL = f(a)), differentiability (LHD = RHD), and advanced differentiation rules (Chain, Inverse Trig, Exponential/Logarithmic, Implicit, and Logarithmic Differentiation).',
  eli5: 'Think of linear systems as searching for where searchlight beams cross in the sky. If they meet at one point, you have a unique solution. If they are parallel, they never meet (inconsistent). If they lie directly on top of each other, you get infinitely many solutions! In calculus, continuity means drawing a path without lifting your pencil, and differentiability means the path is so smooth you never hit a sharp jerk or corner.',
  misconceptions: [
    {
      misconception: 'If |A| = 0, the system automatically has no solution.',
      correction: '|A| = 0 only indicates singularity. You must test (adj A)B: if (adj A)B = O, the system has infinitely many dependent solutions; only if (adj A)B ≠ O is it inconsistent.',
    },
    {
      misconception: 'Existence of lim_{x→a} f(x) guarantees continuity at x = a.',
      correction: 'Limit existence only means LHL = RHL. Continuity additionally requires f(a) to be defined AND equal to that limit (LHL = RHL = f(a)).',
    },
    {
      misconception: 'If a function is continuous at a point, it is automatically differentiable there.',
      correction: 'Continuity does NOT imply differentiability. The classic counter-example is f(x) = |x| at x = 0: it is unbroken, but its sharp V-corner produces LHD = -1 ≠ +1 = RHD.',
    },
    {
      misconception: 'When differentiating y = sin(2x), you just get cos(2x).',
      correction: 'You must apply the Chain Rule! Multiply by the inner derivative d/dx(2x) = 2, yielding 2 cos(2x).',
    },
    {
      misconception: 'Power rule d/dx[x^n] = n x^(n-1) applies to y = 5^x or y = x^x.',
      correction: 'Power rule is strictly for constant exponents. 5^x is exponential (5^x ln 5), while x^x requires logarithmic differentiation (x^x(1 + ln x)).',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the matrix condition for a unique solution under Martin\'s Rule?', options: ['|A| = 0', '|A| ≠ 0', '(adj A)B = O', 'adj(A) = O'], correctIndex: 1 },
    { question: 'What is the derivative of sin⁻¹(x) with respect to x for |x| < 1?', options: ['1/√(1-x²)', '-1/√(1-x²)', '1/(1+x²)', '1/(x√(x²-1))'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student achieves ≥80% mastery across matrix system consistency tests and differential calculus techniques.',
};

// ─── MAIN COMPONENT ───
function C12_MathematicsConsistencyInconsistencySystemsSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C12_MATH_031,
    title = DEFAULT_PROPS.title || 'Consistency of Linear Systems & Differential Calculus',
    misconceptions = DEFAULT_PROPS.misconceptions,
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ─── STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Interactive UI / Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [discoverySelectedIdx, setDiscoverySelectedIdx] = useState(-1);

  // Challenge Input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Interactive Lab Visual Controls
  const [matrixA11, setMatrixA11] = useState(1);
  const [matrixA12, setMatrixA12] = useState(2);
  const [matrixA21, setMatrixA21] = useState(2);
  const [matrixA22, setMatrixA22] = useState(4);
  const [vectorB1, setVectorB1] = useState(5);
  const [vectorB2, setVectorB2] = useState(6);

  const [continuityX, setContinuityX] = useState(2.0);
  const [junctionK, setJunctionK] = useState(4.0);

  const [selectedFuncType, setSelectedFuncType] = useState<'abs' | 'parabola'>('abs');
  const [probeX, setProbeX] = useState(0.0);

  const [peeledLayers, setPeeledLayers] = useState<number[]>([]);
  const [powerBaseX, setPowerBaseX] = useState(2.0);

  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);

  // Reflection answers
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge?.hints?.[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    setDiscoverySelectedIdx(idx);
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction! Let us inspect the geometry.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Calculus Labs. Explore each step hands-on!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all parameters without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing flight telemetry certification challenges. Do your best!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now verify by interacting with the simulation.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission accomplished! You achieved a score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    if (!challenge) return;
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Rigorous mathematical proof.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the step-by-step mathematical reasoning.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  const toggleLayerPeel = useCallback((layerIndex: number) => {
    audioManager.play('pop');
    setPeeledLayers(prev =>
      prev.includes(layerIndex) ? prev.filter(i => i !== layerIndex) : [...prev, layerIndex]
    );
  }, []);

  // ─── CALCULATED MATRIX VALUES ───
  const detA = useMemo(() => {
    return matrixA11 * matrixA22 - matrixA12 * matrixA21;
  }, [matrixA11, matrixA12, matrixA21, matrixA22]);

  const adjA_times_B = useMemo(() => {
    const d = matrixA22;
    const neg_b = -matrixA12;
    const neg_c = -matrixA21;
    const a = matrixA11;
    const res1 = d * vectorB1 + neg_b * vectorB2;
    const res2 = neg_c * vectorB1 + a * vectorB2;
    return [res1, res2];
  }, [matrixA11, matrixA12, matrixA21, matrixA22, vectorB1, vectorB2]);

  const isAdjBZero = adjA_times_B[0] === 0 && adjA_times_B[1] === 0;

  const systemClassification = useMemo(() => {
    if (detA !== 0) {
      return { status: '✓ Unique Solution', color: 'text-emerald-400', desc: 'Consistent (Intersecting Lines at a single point).' };
    }
    if (isAdjBZero) {
      return { status: '✓ Infinitely Many Solutions', color: 'text-amber-400', desc: 'Consistent & Dependent (Lines completely coincide).' };
    }
    return { status: '✗ Inconsistent (No Solution)', color: 'text-rose-400', desc: 'Inconsistent (Lines are strictly parallel and disjoint).' };
  }, [detA, isAdjBZero]);

  // ─── 2D CANVAS GRAPH RENDERING ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 26;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.stroke();

      if (phase === 'explore' || phase === 'sandbox') {
        if (currentSlide === 0 || phase === 'sandbox') {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let px = 0; px < width; px += 2) {
            const mathX = (px - centerX) / scale;
            if (matrixA12 !== 0) {
              const mathY = (vectorB1 - matrixA11 * mathX) / matrixA12;
              const py = centerY - mathY * scale;
              if (px === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
          }
          ctx.stroke();

          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let px = 0; px < width; px += 2) {
            const mathX = (px - centerX) / scale;
            if (matrixA22 !== 0) {
              const mathY = (vectorB2 - matrixA21 * mathX) / matrixA22;
              const py = centerY - mathY * scale;
              if (px === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
          }
          ctx.stroke();
        } else if (currentSlide === 2) {
          ctx.strokeStyle = selectedFuncType === 'abs' ? '#fbbf24' : '#a855f7';
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let px = 0; px < width; px += 2) {
            const mathX = (px - centerX) / scale;
            const mathY = selectedFuncType === 'abs' ? Math.abs(mathX) : mathX * mathX * 0.5;
            const py = centerY - mathY * scale;
            if (px === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();

          const pxPoint = centerX + probeX * scale;
          const pyPoint = centerY - (selectedFuncType === 'abs' ? Math.abs(probeX) : probeX * probeX * 0.5) * scale;

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(pxPoint, pyPoint, 6, 0, Math.PI * 2);
          ctx.fill();

          const lSlope = selectedFuncType === 'abs' ? (probeX <= 0 ? -1 : 1) : probeX;
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(pxPoint - 35, pyPoint + 35 * lSlope);
          ctx.lineTo(pxPoint, pyPoint);
          ctx.stroke();

          const rSlope = selectedFuncType === 'abs' ? (probeX >= 0 ? 1 : -1) : probeX;
          ctx.strokeStyle = '#22c55e';
          ctx.beginPath();
          ctx.moveTo(pxPoint, pyPoint);
          ctx.lineTo(pxPoint + 35, pyPoint - 35 * rSlope);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentSlide, matrixA11, matrixA12, matrixA21, matrixA22, vectorB1, vectorB2, selectedFuncType, probeX]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 backdrop-blur rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-xl border border-indigo-800/60 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">ISC CLASS 12 CALCULUS & SYSTEMS</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">CISCE 2026</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-xl text-xs font-bold border ${
              difficulty === 'foundation' ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300' :
              difficulty === 'advanced' ? 'bg-rose-950/80 border-rose-700 text-rose-300' :
              'bg-blue-950/80 border-blue-700 text-blue-300'
            }`}
          >
            {difficulty.toUpperCase()} TIER
          </motion.div>

          <div className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300 font-semibold">
            BKT Mastery: <span className="text-amber-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🚀</span> {SCENARIO.title}
            </div>
            <p className="text-slate-200 text-base leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-sm mt-3 pt-3 border-t border-slate-800/80">{SCENARIO.context}</p>
          </div>

          {/* MULTI-REPRESENTATION SECTION (Interactive Decision Diagram + Matrix Truth Table) */}
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Multi-Representation: Algebraic vs Decision Tree</span>
              <span className="text-xs text-slate-400">Martin's Rule Core Conditions</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
              {/* Representation A: SVG Flow Diagram */}
              <div>
                <MatrixConsistencyTreeSVG det={detA} adjBZero={isAdjBZero} />
              </div>
              {/* Representation B: Matrix Truth Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400">
                      <th className="p-2">Condition</th>
                      <th className="p-2">Geometric Meaning</th>
                      <th className="p-2">Solution Set</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-2 font-mono text-emerald-400">|A| ≠ 0</td>
                      <td className="p-2">Intersecting lines/planes</td>
                      <td className="p-2 text-emerald-300 font-bold">✓ Unique (X = A⁻¹B)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-2 font-mono text-amber-400">|A| = 0 & (adj A)B = O</td>
                      <td className="p-2">Coincident / overlapping</td>
                      <td className="p-2 text-amber-300 font-bold">✓ Infinitely Many</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-2 font-mono text-rose-400">|A| = 0 & (adj A)B ≠ O</td>
                      <td className="p-2">Strictly parallel & disjoint</td>
                      <td className="p-2 text-rose-300 font-bold">✗ Inconsistent (0 Solutions)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-xs font-bold">
              PRE-FLIGHT INTUITION CHALLENGE
            </div>
            <h3 className="text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</h3>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-semibold'
                      : discoveryAnswered && idx === discoverySelectedIdx
                      ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-700 text-xs font-bold text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                    {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && <span className="ml-auto text-emerald-400 font-bold">✓</span>}
                    {discoveryAnswered && idx === discoverySelectedIdx && idx !== DISCOVERY_QUESTION.correctIndex && <span className="ml-auto text-rose-400 font-bold">✗</span>}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                <div className={`p-4 rounded-xl text-sm border ${discoveryCorrect ? 'bg-emerald-950/70 border-emerald-700 text-emerald-300' : 'bg-amber-950/70 border-amber-700 text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! |A| = 0 can mean Inconsistent OR Infinitely Many Solutions.' : `ℹ ${DISCOVERY_QUESTION.hintAfter}`}
                </div>
                <motion.button
                  aria-label="Enter Interactive Flight Labs"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Flight Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentSlide ? 'w-8 bg-indigo-500' : 'w-3 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-sm mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── LAB 1: SYSTEMS OF EQUATIONS ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                        <div className="text-xs text-slate-400 font-bold uppercase">Matrix A (2×2 Thruster Coefficients)</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-slate-400" htmlFor="a11-slider">A₁₁: {matrixA11}</label>
                            <input id="a11-slider" aria-label="Matrix coefficient A11" type="range" min={-4} max={4} step={1} value={matrixA11} onChange={(e) => setMatrixA11(Number(e.target.value))} className="w-full" />
                          </div>
                          <div>
                            <label className="text-xs text-slate-400" htmlFor="a12-slider">A₁₂: {matrixA12}</label>
                            <input id="a12-slider" aria-label="Matrix coefficient A12" type="range" min={-4} max={4} step={1} value={matrixA12} onChange={(e) => setMatrixA12(Number(e.target.value))} className="w-full" />
                          </div>
                          <div>
                            <label className="text-xs text-slate-400" htmlFor="a21-slider">A₂₁: {matrixA21}</label>
                            <input id="a21-slider" aria-label="Matrix coefficient A21" type="range" min={-4} max={4} step={1} value={matrixA21} onChange={(e) => setMatrixA21(Number(e.target.value))} className="w-full" />
                          </div>
                          <div>
                            <label className="text-xs text-slate-400" htmlFor="a22-slider">A₂₂: {matrixA22}</label>
                            <input id="a22-slider" aria-label="Matrix coefficient A22" type="range" min={-4} max={4} step={1} value={matrixA22} onChange={(e) => setMatrixA22(Number(e.target.value))} className="w-full" />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                        <div className="text-xs text-slate-400 font-bold uppercase">Vector B (Constants)</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-slate-400" htmlFor="b1-slider">B₁: {vectorB1}</label>
                            <input id="b1-slider" aria-label="Vector constant B1" type="range" min={-10} max={10} step={1} value={vectorB1} onChange={(e) => setVectorB1(Number(e.target.value))} className="w-full" />
                          </div>
                          <div>
                            <label className="text-xs text-slate-400" htmlFor="b2-slider">B₂: {vectorB2}</label>
                            <input id="b2-slider" aria-label="Vector constant B2" type="range" min={-10} max={10} step={1} value={vectorB2} onChange={(e) => setVectorB2(Number(e.target.value))} className="w-full" />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-300">Determinant |A|:</span>
                          <span className={`font-mono font-bold ${detA === 0 ? 'text-rose-400' : 'text-emerald-400'}`}>{detA}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-300">(adj A)B Product:</span>
                          <span className="font-mono font-bold text-indigo-300">[{adjA_times_B[0]}, {adjA_times_B[1]}]ᵀ</span>
                        </div>
                        <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                          <span className="text-xs text-slate-400">Classification:</span>
                          <span className={`text-xs font-bold ${systemClassification.color}`}>{systemClassification.status}</span>
                        </div>
                        <p className="text-xs text-slate-400 italic">{systemClassification.desc}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <canvas ref={canvasRef} width={340} height={240} className="rounded-lg shadow-inner bg-slate-900 border border-slate-800" />
                      <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-sky-400 rounded-sm"></span> Line 1: {matrixA11}x + {matrixA12}y = {vectorB1}</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-rose-500 rounded-sm"></span> Line 2: {matrixA21}x + {matrixA22}y = {vectorB2}</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Multi-rep decision tree update */}
                  <MatrixConsistencyTreeSVG det={detA} adjBZero={isAdjBZero} />
                </div>
              )}

              {/* ─── LAB 2: CONTINUITY & JUNCTION LIMITS ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <label className="text-xs text-slate-400" htmlFor="probe-x-slider">Probe Position x: {continuityX.toFixed(2)}</label>
                        <input id="probe-x-slider" aria-label="Continuity probe position x" type="range" min={0} max={4} step={0.05} value={continuityX} onChange={(e) => setContinuityX(Number(e.target.value))} className="w-full" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400" htmlFor="junction-k-slider">Junction Constant k: {junctionK.toFixed(1)}</label>
                        <input id="junction-k-slider" aria-label="Piecewise function slope parameter k" type="range" min={1} max={8} step={0.5} value={junctionK} onChange={(e) => setJunctionK(Number(e.target.value))} className="w-full" />
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <div className="text-[11px] text-slate-400">LHL (x→2⁻)</div>
                          <div className="text-sm font-bold text-sky-400 mt-1">4.00</div>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <div className="text-[11px] text-slate-400">RHL (x→2⁺)</div>
                          <div className="text-sm font-bold text-emerald-400 mt-1">{(junctionK * 2 - 4).toFixed(2)}</div>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <div className="text-[11px] text-slate-400">Status</div>
                          <div className={`text-sm font-bold mt-1 ${Math.abs(4 - (junctionK * 2 - 4)) < 0.05 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {Math.abs(4 - (junctionK * 2 - 4)) < 0.05 ? '✓ Continuous' : '✗ Jump'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SVG Diagram 2: Continuity Visualization */}
                    <ContinuityConceptSVG
                      isContinuous={Math.abs(4 - (junctionK * 2 - 4)) < 0.05}
                      lhl={4.0}
                      rhl={junctionK * 2 - 4}
                      fa={4.0}
                    />
                  </div>

                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-800 space-y-3">
                      <p className="text-sm text-indigo-200 font-semibold">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, idx) => (
                          <motion.button
                            key={idx}
                            aria-label={`Prediction option ${idx + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(idx)}
                            className="text-left p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ─── LAB 3: DIFFERENTIABILITY VS CONTINUITY ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <motion.button
                          aria-label="Select absolute value function f(x) = |x|"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedFuncType('abs')}
                          className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${
                            selectedFuncType === 'abs' ? 'bg-amber-950/80 border-amber-500 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          f(x) = |x| (Sharp Vertex at 0)
                        </motion.button>
                        <motion.button
                          aria-label="Select smooth parabola function f(x) = x squared"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedFuncType('parabola')}
                          className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${
                            selectedFuncType === 'parabola' ? 'bg-purple-950/80 border-purple-500 text-purple-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          f(x) = x² (Smooth Parabola)
                        </motion.button>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                        <label className="text-xs text-slate-400" htmlFor="diff-probe-slider">Move Probe x: {probeX.toFixed(2)}</label>
                        <input id="diff-probe-slider" aria-label="Differentiability probe position" type="range" min={-3} max={3} step={0.1} value={probeX} onChange={(e) => setProbeX(Number(e.target.value))} className="w-full" />
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Left-Hand Derivative (LHD):</span>
                          <span className="font-mono font-bold text-rose-400">
                            {selectedFuncType === 'abs' ? (probeX <= 0 ? '-1.00' : '+1.00') : probeX.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Right-Hand Derivative (RHD):</span>
                          <span className="font-mono font-bold text-emerald-400">
                            {selectedFuncType === 'abs' ? (probeX >= 0 ? '+1.00' : '-1.00') : probeX.toFixed(2)}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-slate-800 flex justify-between font-bold">
                          <span className="text-slate-300">Differentiability:</span>
                          <span className={selectedFuncType === 'abs' && probeX === 0 ? 'text-rose-400' : 'text-emerald-400'}>
                            {selectedFuncType === 'abs' && probeX === 0 ? '✗ NOT Differentiable (Corner)' : '✓ Differentiable'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* SVG Diagram 3: Differentiability Corner Comparison */}
                    <div className="flex flex-col items-center justify-center">
                      <DifferentiabilityCornerSVG type={selectedFuncType} probeX={probeX} />
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: CHAIN RULE ONION PEELER ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-2">
                    <span className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Composite Target Function</span>
                    <h4 className="text-2xl font-black text-white font-mono">y = sin( (2x + 1)³ )</h4>
                    <p className="text-xs text-slate-400">Click each layer below to differentiate outer-to-inner.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { layer: 0, title: '1. Outer Layer', expr: 'sin(u)', deriv: 'cos((2x + 1)³)', color: 'border-sky-500 bg-sky-950/40 text-sky-300' },
                      { layer: 1, title: '2. Middle Layer', expr: 'v³ (Power)', deriv: '3(2x + 1)²', color: 'border-amber-500 bg-amber-950/40 text-amber-300' },
                      { layer: 2, title: '3. Inner Layer', expr: '2x + 1 (Linear)', deriv: '2', color: 'border-rose-500 bg-rose-950/40 text-rose-300' },
                    ].map((item) => (
                      <motion.button
                        key={item.layer}
                        aria-label={`Toggle differentiation layer ${item.title}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleLayerPeel(item.layer)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          peeledLayers.includes(item.layer) ? item.color : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="text-xs font-bold uppercase">{item.title}</div>
                        <div className="text-sm font-mono mt-1 font-semibold">{item.expr}</div>
                        {peeledLayers.includes(item.layer) ? (
                          <div className="mt-3 text-xs font-mono font-bold text-white pt-2 border-t border-slate-700/60">
                            ✓ Factor: {item.deriv}
                          </div>
                        ) : (
                          <div className="mt-3 text-xs text-slate-500">Click to peel</div>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-slate-400 font-semibold">Total Assembled Chain Rule Product dy/dx:</span>
                    <span className="font-mono text-sm sm:text-base font-bold text-emerald-400">
                      {peeledLayers.length === 3 ? '✓ 6(2x + 1)² cos((2x + 1)³)' : 'Peel all 3 layers above...'}
                    </span>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: LOG TRANSFORMER ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <div>
                      <label className="text-xs text-slate-400" htmlFor="power-base-slider">Base x Value: {powerBaseX.toFixed(2)}</label>
                      <input id="power-base-slider" aria-label="Logarithmic differentiation base x slider" type="range" min={1.1} max={4.0} step={0.1} value={powerBaseX} onChange={(e) => setPowerBaseX(Number(e.target.value))} className="w-full" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <div className="text-xs text-rose-400 font-bold uppercase">Original Intractable Power</div>
                        <div className="text-xl font-mono font-bold text-white">y = x^x = {Math.pow(powerBaseX, powerBaseX).toFixed(2)}</div>
                        <p className="text-xs text-slate-400">Both base and exponent vary; ordinary power and exponential rules fail!</p>
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <div className="text-xs text-emerald-400 font-bold uppercase">Natural Logarithm Transform</div>
                        <div className="text-xl font-mono font-bold text-white">ln y = x · ln x = {(powerBaseX * Math.log(powerBaseX)).toFixed(2)}</div>
                        <p className="text-xs text-slate-400">Exponent brought down as multiplier; simple product rule applies!</p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-sm">
                      <span className="text-slate-300 font-semibold">Instantaneous dy/dx = x^x(1 + ln x):</span>
                      <span className="font-mono font-bold text-amber-400">
                        {(Math.pow(powerBaseX, powerBaseX) * (1 + Math.log(powerBaseX))).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* NAVIGATION BUTTONS */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  aria-label="Previous Lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Next Lab"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Enter Free Sandbox"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX ��── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">🎛️ Free Calculus & Systems Sandbox</h3>
                <p className="text-slate-400 text-xs mt-1">Freely manipulate coefficients and functions without scoring or time limits.</p>
              </div>
              <motion.button
                aria-label="Proceed to Certification Challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Ready for Certification Challenges →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs text-indigo-400 font-bold uppercase">Dynamic 2×2 Matrix Generator</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400" htmlFor="sb-a11">A₁₁: {matrixA11}</label>
                      <input id="sb-a11" aria-label="Sandbox A11" type="range" min={-5} max={5} value={matrixA11} onChange={(e) => setMatrixA11(Number(e.target.value))} className="w-full" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400" htmlFor="sb-a12">A₁₂: {matrixA12}</label>
                      <input id="sb-a12" aria-label="Sandbox A12" type="range" min={-5} max={5} value={matrixA12} onChange={(e) => setMatrixA12(Number(e.target.value))} className="w-full" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400" htmlFor="sb-a21">A₂₁: {matrixA21}</label>
                      <input id="sb-a21" aria-label="Sandbox A21" type="range" min={-5} max={5} value={matrixA21} onChange={(e) => setMatrixA21(Number(e.target.value))} className="w-full" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400" htmlFor="sb-a22">A₂₂: {matrixA22}</label>
                      <input id="sb-a22" aria-label="Sandbox A22" type="range" min={-5} max={5} value={matrixA22} onChange={(e) => setMatrixA22(Number(e.target.value))} className="w-full" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex justify-between text-xs">
                  <span>Computed Determinant |A|: <strong className="text-amber-400">{detA}</strong></span>
                  <span>Status: <strong className={systemClassification.color}>{systemClassification.status}</strong></span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-4 bg-slate-950 rounded-xl border border-slate-800">
                <canvas ref={canvasRef} width={340} height={240} className="rounded-lg shadow-inner bg-slate-900 border border-slate-800" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SUITE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 font-bold uppercase tracking-wider">
                Competency: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-semibold uppercase">
                {challenge.nodeId}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                Tier: {challenge.difficulty}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
              {challenge.question}
            </h3>

            {/* 1. MCQ Variant with Framer Motion Shake Animation */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-700 text-xs font-bold text-slate-300">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                      {showExplanation && i === challenge.correctIndex && <span className="ml-auto text-emerald-400 font-bold">✓ Correct</span>}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. Drag-Label Variant */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'box_hole', label: 'Missing Point Hole' },
                    { id: 'box_jump', label: 'Step Jump' },
                    { id: 'box_inf', label: 'Infinite Spike' },
                    { id: 'box_cont', label: 'Smooth Unbroken' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      aria-label={`Drop target area for ${target.label}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center flex flex-col items-center justify-center min-h-[90px]"
                    >
                      <span className="text-xs text-slate-400 font-medium">{target.label}</span>
                      <span className="text-sm font-bold text-amber-300 mt-2">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : '[Drop Label Here]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify drag and drop labels"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Labels
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Variant */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Drag or click to re-order the procedure into correct sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sortable item position ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Validate step sequence"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Validate Sequence
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Input Variant */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    aria-label="Calculated numeric value"
                    type="number"
                    step="0.01"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500 w-48"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct Variant */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="text-xs text-slate-400">{challenge.validationHint}</div>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      aria-label={`Add component ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-mono font-bold text-white shadow"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-800 text-amber-300 font-mono text-xs font-bold rounded flex items-center gap-1.5">
                      {part}
                      <button aria-label={`Remove part ${part}`} onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))} className="text-rose-400 hover:text-rose-300">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click pieces above to construct formula...</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify constructed mathematical formula"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Formula
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
                  <span>📖</span> Step-by-Step Mathematical Explanation:
                </div>

                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs sm:text-sm text-amber-200 leading-relaxed font-sans"
                  >
                    <strong className="text-amber-400 font-mono">{idx + 1}.</strong> {sentence}{!sentence.endsWith('.') ? '.' : ''}
                  </motion.p>
                ))}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next step of solution"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Proceed to next challenge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Score →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, MASTERY SUMMARY & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700 text-center space-y-4 shadow-2xl">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Mission Certification Complete!</h2>
            <div className="flex justify-center items-center gap-6 text-sm">
              <span className="text-slate-300">Final Score: <strong className="text-emerald-400 font-mono text-xl">{Math.max(0, 100 - errors * 5)}%</strong></span>
              <span className="text-slate-300">Errors Incurred: <strong className="text-rose-400 font-mono text-xl">{errors}</strong></span>
              <span className="text-slate-300">Mastery Level: <strong className="text-amber-400 font-bold uppercase">{masteryLevel}</strong></span>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-sm text-slate-200 leading-relaxed">
              {errors === 0
                ? '🌟 Flawless Mastery! You navigated matrix singularity checks and differential calculus operations with absolute precision.'
                : errors <= 3
                ? '👍 Exceptional Competency! You possess strong analytical calculus foundations for the ISC board examination.'
                : '📈 Good Effort! Continue reviewing the matrix adjoint test and chain rule factors below to reinforce your skills.'}
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-indigo-800/80 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider">
              <span>💭</span> Post-Simulation Deep Reflection
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  aria-label="Reflection question 1: What was the most surprising thing you learned?"
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                  placeholder="e.g., That |A| = 0 doesn't automatically mean no solution—it can still have infinitely many solutions if (adj A)B = O..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 h-20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  aria-label="Reflection question 2: How would you explain this to a friend?"
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                  placeholder="e.g., Continuity is drawing a path without lifting the pen; differentiability means it is so smooth there are no sharp jerks..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 h-20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  aria-label="Reflection question 3: Where in real life might you use this?"
                  value={reflection3}
                  onChange={(e) => setReflection3(e.target.value)}
                  placeholder="e.g., Spacecraft docking maneuvers, automated vehicle steering trajectories, financial rate-of-change modeling..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 h-20"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h4 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Identified Conceptual Gaps to Review:</h4>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-rose-900/60 text-xs space-y-1">
                      <div className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</div>
                      <div className="text-emerald-400 font-medium">✓ Correction: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-amber-950/40 rounded-2xl border border-amber-800 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-amber-300 uppercase">Spaced Repetition Schedule (SM-2):</span>
            <p>
              Based on your accuracy, your next retrieval review is due in{' '}
              <strong className="text-white font-bold">
                {errors === 0 ? REVIEW_INTERVAL_DAYS[2] : errors <= 3 ? REVIEW_INTERVAL_DAYS[1] : REVIEW_INTERVAL_DAYS[0]} days
              </strong>
              .
            </p>
          </div>

          {/* Real-World Activity */}
          <div className="p-6 bg-indigo-950/40 rounded-2xl border border-indigo-800 space-y-3">
            <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1 text-xs text-slate-400 list-disc list-inside">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Feedback Popups */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Telemetry Validation Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_MathematicsConsistencyInconsistencySystemsSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE CONSTANTS ─────────────────────────────���───────────────────────────
const NODE_C12_APPMATH_021 = 'c12_appmath_021';
const NODE_C12_APPMATH_022 = 'c12_appmath_022';
const NODE_C12_APPMATH_023 = 'c12_appmath_023';
const NODE_C12_APPMATH_024 = 'c12_appmath_024';
const NODE_C12_APPMATH_025 = 'c12_appmath_025';
const NODE_C12_APPMATH_026 = 'c12_appmath_026';
const NODE_C12_APPMATH_027 = 'c12_appmath_027';
const NODE_C12_APPMATH_028 = 'c12_appmath_028';
const NODE_C12_APPMATH_029 = 'c12_appmath_029';
const NODE_C12_APPMATH_030 = 'c12_appmath_030';

const ALL_NODE_IDS = [
  NODE_C12_APPMATH_021,
  NODE_C12_APPMATH_022,
  NODE_C12_APPMATH_023,
  NODE_C12_APPMATH_024,
  NODE_C12_APPMATH_025,
  NODE_C12_APPMATH_026,
  NODE_C12_APPMATH_027,
  NODE_C12_APPMATH_028,
  NODE_C12_APPMATH_029,
  NODE_C12_APPMATH_030,
];

// ─── NARRATIVE SCENARIO ───────────────────────────────────────────────────
const SCENARIO = {
  title: 'Apex Logistics & Algorithmic Dispatch Optimization',
  intro: 'You are the Lead Quantitative Analyst at Apex Logistics in Mumbai. Fleet routing, fuel rates, revenue systems, and freight dynamics require seamless matrix inversion, consistency checks, and multi-tier calculus modeling.',
  context: 'Manage fleet equations AX = B, test system singularities, compute marginal acceleration d²y/dx², and calculate dynamic rates using chain, implicit, and logarithmic differentiation.',
};

// ─── DISCOVERY HOOK ───────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'If a 2×2 matrix A scales delivery volume and |A| = 0, what happens when dispatch attempts to invert A to calculate original stock demands?',
  options: [
    'A⁻¹ is easily found by swapping diagonals and taking reciprocals of elements',
    'A⁻¹ does not exist because inversion divides by |A|, making division by zero impossible',
    'A⁻¹ always equals the identity matrix regardless of determinant',
    'A⁻¹ is simply the negative transpose matrix',
  ],
  correctIndex: 1,
  hintAfter: 'A singular matrix (|A| = 0) collapses area to 0. You cannot divide by zero to undo this collapse! Let us explore why.',
};

// ─── CHALLENGE INTERFACE ───────────────────────────────────────────────────
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

// ─── CHALLENGES DATA ─────────────────────────────────────────────────���─────
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_mat_001',
    nodeId: NODE_C12_APPMATH_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For a 2×2 matrix A = [[a, b], [c, d]], which matrix correctly represents adj(A)?',
    options: [
      '[[d, -b], [-c, a]]',
      '[[-d, b], [c, -a]]',
      '[[a, -c], [-b, d]]',
      '[[1/a, 1/b], [1/c, 1/d]]',
    ],
    correctIndex: 0,
    explanation: 'For any 2×2 matrix, the adjoint is obtained by interchanging principal diagonal elements (a and d) and reversing the signs of the off-diagonal elements (b and c).',
    hints: [
      'Think about swapping diagonal elements and negating off-diagonals.',
      'Cofactor of a is d; cofactor of b is -c; taking the transpose yields [[d, -b], [-c, a]].',
      'The diagonal elements swap positions (a ↔ d), and b, c become -b, -c.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_mat_002',
    nodeId: NODE_C12_APPMATH_021,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map the correct adjoint positions for matrix A = [[4, 7], [3, 5]].',
    dragItems: [
      { label: '5', targetId: 'adj_11' },
      { label: '-7', targetId: 'adj_12' },
      { label: '-3', targetId: 'adj_21' },
      { label: '4', targetId: 'adj_22' },
    ],
    correctMapping: {
      adj_11: '5',
      adj_12: '-7',
      adj_21: '-3',
      adj_22: '4',
    },
    explanation: 'Swap diagonal entries: 4 ↔ 5, giving (1,1)=5 and (2,2)=4. Negate off-diagonals: 7 → -7 at (1,2) and 3 → -3 at (2,1).',
    hints: [
      'The top-left item becomes the bottom-right original value (5).',
      'The top-right item gets a negative sign (-7).',
      'The bottom-left gets -3, and bottom-right gets 4.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_mat_003',
    nodeId: NODE_C12_APPMATH_021,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Calculate the determinant |A| for the matrix A = [[4, 7], [3, 5]].',
    correctAnswer: -1,
    tolerance: 0,
    unit: '',
    explanation: '|A| = (4)(5) - (7)(3) = 20 - 21 = -1.',
    hints: [
      'Use the 2×2 determinant formula: ad - bc.',
      'Multiply (4 × 5) and subtract (7 × 3).',
      '20 - 21 equals -1.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_mat_004',
    nodeId: NODE_C12_APPMATH_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Apex Logistics solves AX = B using Martin\'s Rule. If A = [[1, 2], [3, -1]] and B = [[5], [4]], what is X = [x, y]ᵀ?',
    options: [
      'x = 13/7, y = 11/7',
      'x = 11/7, y = 13/7',
      'x = 2, y = 1',
      'x = 7/13, y = 7/11',
    ],
    correctIndex: 0,
    explanation: '|A| = (1)(-1) - (2)(3) = -7. A⁻¹ = (1/-7)[[-1, -2], [-3, 1]] = [[1/7, 2/7], [3/7, -1/7]]. Multiplying A⁻¹B gives [5/7 + 8/7, 15/7 - 4/7]ᵀ = [13/7, 11/7]ᵀ.',
    hints: [
      'First compute |A| = -1 - 6 = -7.',
      'Multiply A⁻¹ on the left of B.',
      'x = (1/7)(5) + (2/7)(4) = 13/7; y = (3/7)(5) - (1/7)(4) = 11/7.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_mat_005',
    nodeId: NODE_C12_APPMATH_022,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the systematic steps of solving a 3×3 linear system AX = B using Cramer\'s Rule in order.',
    sortItems: [
      'Calculate coefficient determinant |A| and check |A| ≠ 0',
      'Form matrix A₁ by replacing column 1 of A with constant vector B',
      'Form matrices A₂ and A₃ by replacing columns 2 and 3 with B',
      'Compute x = |A₁|/|A|, y = |A₂|/|A|, z = |A₃|/|A|',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First verify |A| ≠ 0. Next construct column-replaced matrices A₁, A₂, A₃. Finally compute the unknown ratios.',
    hints: [
      'Always start by finding the base determinant |A| to ensure invertibility.',
      'Replace columns systematically with constant vector B.',
      'Finish by dividing each specialized determinant by |A|.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_mat_006',
    nodeId: NODE_C12_APPMATH_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'For the system 2x + 3y = 7 and 4x + ky = 14, which value of k makes the system consistent with INFINITELY MANY solutions?',
    options: [
      'k = 6, because |A| = 0 and (adj A)B = [[0], [0]]',
      'k ≠ 6, because |A| ≠ 0',
      'k = 0, because off-diagonals vanish',
      'k = -6, because determinant becomes negative',
    ],
    correctIndex: 0,
    explanation: '|A| = 2k - 12. For k = 6, |A| = 0. The second equation 4x + 6y = 14 is identical to 2(2x + 3y = 7), representing coincident lines, so (adj A)B = 0 yielding infinitely many solutions.',
    hints: [
      'Find when determinant 2k - 12 = 0.',
      'Check whether the equations become scalar multiples of each other at k = 6.',
      'When both equations represent the exact same line, infinite solutions exist.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_mat_007',
    nodeId: NODE_C12_APPMATH_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'If |A| = 0 for a system AX = B, and (adj A)·B ≠ O (non-zero matrix), what is the geometric interpretation?',
    options: [
      'The equations represent parallel, non-intersecting planes/lines; system is inconsistent with NO solution',
      'The equations represent coincident lines; system has infinitely many solutions',
      'The equations intersect at the origin uniquely',
      'The system has exactly two distinct solutions',
    ],
    correctIndex: 0,
    explanation: 'When |A| = 0 and (adj A)B ≠ O, the equations represent distinct parallel lines/planes with contradictory constraints, meaning no common point exists (inconsistent).',
    hints: [
      'Think of parallel train tracks that never meet.',
      'The determinant being 0 eliminates unique solution; non-zero (adj A)B eliminates infinite solutions.',
      'Contradictory constraints imply zero solutions (inconsistency).',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_diff_008',
    nodeId: NODE_C12_APPMATH_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Using the Chain Rule, what is the derivative dy/dx of y = (2x² + 1)⁵?',
    options: [
      '20x(2x² + 1)⁴',
      '5(2x² + 1)⁴',
      '10x(2x² + 1)⁴',
      '20x(4x)⁴',
    ],
    correctIndex: 0,
    explanation: 'Let u = 2x² + 1. Then dy/du = 5u⁴ and du/dx = 4x. By chain rule, dy/dx = (dy/du)(du/dx) = 5(2x² + 1)⁴ · (4x) = 20x(2x² + 1)⁴.',
    hints: [
      'Differentiate the outer power: 5(2x² + 1)⁴.',
      'Multiply by the derivative of the inside bracket: d/dx(2x² + 1) = 4x.',
      '5 × 4x = 20x.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_diff_009',
    nodeId: NODE_C12_APPMATH_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A logistics drone delivery rate is modeled by y = e^(cos x). What is dy/dx?',
    options: [
      '-sin x · e^(cos x)',
      'cos x · e^(cos x)',
      'e^(-sin x)',
      '-e^(cos x)',
    ],
    correctIndex: 0,
    explanation: 'Outer function is e^u with u = cos x. dy/du = e^u and du/dx = -sin x. Therefore dy/dx = -sin x · e^(cos x).',
    hints: [
      'The derivative of e^u is e^u.',
      'The derivative of cos x is -sin x.',
      'Multiply outer derivative by inner derivative.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_diff_010',
    nodeId: NODE_C12_APPMATH_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the standard derivative d/dx(tan⁻¹(x)) for all real numbers x?',
    options: [
      '1 / (1 + x²)',
      '1 / √(1 - x²)',
      '-1 / (1 + x²)',
      'sec²(x)',
    ],
    correctIndex: 0,
    explanation: 'The standard derivative of tan⁻¹(x) is 1/(1 + x²). It requires no radical sign and is defined across all real x.',
    hints: [
      'Inverse tangent derivative has no square root in the denominator.',
      'The denominator is the sum of 1 and x squared.',
      'd/dx(tan⁻¹ x) = 1/(1 + x²).',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_diff_011',
    nodeId: NODE_C12_APPMATH_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Evaluate d/dx(sin⁻¹(3x)) for |3x| < 1 using the chain rule.',
    options: [
      '3 / √(1 - 9x²)',
      '1 / √(1 - 9x²)',
      '3 / √(1 - 3x²)',
      '-3 / √(1 - 9x²)',
    ],
    correctIndex: 0,
    explanation: 'Outer derivative: 1/√(1 - u²) where u = 3x. Inner derivative: du/dx = 3. dy/dx = 3/√(1 - (3x)²) = 3/√(1 - 9x²).',
    hints: [
      'Replace x in the standard formula with 3x.',
      'Remember to square 3x entirely: (3x)² = 9x².',
      'Multiply by the derivative of 3x, which is 3.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_diff_012',
    nodeId: NODE_C12_APPMATH_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is d/dx(5^x) equal to 5^x · ln 5 rather than x · 5^(x-1)?',
    options: [
      'Because 5^x is an exponential function (variable in exponent), not a power function (variable in base)',
      'Because the power rule only works for prime numbers',
      'Because natural logarithm must always multiply polynomials',
      'Because 5^x is the reciprocal of ln 5',
    ],
    correctIndex: 0,
    explanation: 'The power rule d/dx(x^n) = n x^(n-1) applies strictly when base is variable and exponent is constant. For constant base a > 0, d/dx(a^x) = a^x ln a.',
    hints: [
      'Notice where the variable x is located: in the exponent.',
      'Power rule is for x^n, exponential rule is for a^x.',
      'Base 5 is constant, exponent x is variable.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_diff_013',
    nodeId: NODE_C12_APPMATH_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find dy/dx for y = ln(x² + 3).',
    options: [
      '2x / (x² + 3)',
      '1 / (x² + 3)',
      '2x ln(x² + 3)',
      '(x² + 3) / 2x',
    ],
    correctIndex: 0,
    explanation: 'By chain rule, d/dx[ln(u)] = (1/u) · du/dx. Here u = x² + 3, du/dx = 2x, so dy/dx = 2x/(x² + 3).',
    hints: [
      'Derivative of ln(u) is 1/u · u\'.',
      'Inner function u = x² + 3 has derivative 2x.',
      'Combine into rational fraction 2x / (x² + 3).',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_diff_014',
    nodeId: NODE_C12_APPMATH_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Differentiating x² + y² = 25 implicitly with respect to x gives dy/dx = ?',
    options: [
      '-x / y',
      'x / y',
      '-2x',
      '-y / x',
    ],
    correctIndex: 0,
    explanation: 'Differentiating both sides: 2x + 2y(dy/dx) = 0 → 2y(dy/dx) = -2x → dy/dx = -x/y.',
    hints: [
      'Differentiate x² to get 2x.',
      'Differentiate y² using chain rule to get 2y(dy/dx).',
      'Isolate dy/dx: 2y(dy/dx) = -2x.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_diff_015',
    nodeId: NODE_C12_APPMATH_027,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For the curve x³ + y³ = 3axy, what is the exact expression for dy/dx?',
    options: [
      '(ay - x²) / (y² - ax)',
      '(3ay - 3x²) / (3y²)',
      '(x² - ay) / (y² - ax)',
      '-x² / y²',
    ],
    correctIndex: 0,
    explanation: 'Differentiating: 3x² + 3y²(dy/dx) = 3a[y + x(dy/dx)] = 3ay + 3ax(dy/dx). Grouping: (3y² - 3ax)dy/dx = 3ay - 3x² → dy/dx = (ay - x²)/(y² - ax).',
    hints: [
      'Use the product rule on 3axy: 3a(1·y + x·dy/dx).',
      'Collect all dy/dx terms on the left: (3y² - 3ax) dy/dx.',
      'Factor 3 from numerator and denominator.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_diff_016',
    nodeId: NODE_C12_APPMATH_028,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the correct derivative expression for y = xˣ using logarithmic differentiation.',
    availableParts: ['x^x', '·', '(1 + ln x)', '(ln x - 1)', 'x^(x-1)', '/ x'],
    targetState: 'x^x · (1 + ln x)',
    validationHint: 'Take ln y = x ln x, differentiate to get (1/y)dy/dx = ln x + 1, then multiply by y = xˣ.',
    explanation: 'ln y = x ln x → (1/y)dy/dx = 1·ln x + x(1/x) = ln x + 1 → dy/dx = xˣ(1 + ln x).',
    hints: [
      'First take natural log: ln y = x ln x.',
      'Differentiate right side using product rule to get ln x + 1.',
      'Multiply by y = x^x.',
    ],
    misconceptionIndex: 9,
  },
  {
    id: 'ch_diff_017',
    nodeId: NODE_C12_APPMATH_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Differentiate y = (sin x)ˣ with respect to x for sin x > 0.',
    options: [
      '(sin x)ˣ [ln(sin x) + x cot x]',
      '(sin x)ˣ [x cos x + ln(sin x)]',
      'x (sin x)ˣ⁻¹ cos x',
      '(sin x)ˣ ln(cos x)',
    ],
    correctIndex: 0,
    explanation: 'ln y = x ln(sin x). Differentiating: (1/y)dy/dx = 1·ln(sin x) + x · (1/sin x · cos x) = ln(sin x) + x cot x. Thus dy/dx = (sin x)ˣ [ln(sin x) + x cot x].',
    hints: [
      'Take ln on both sides: ln y = x ln(sin x).',
      'Derivative of ln(sin x) is (cos x)/(sin x) = cot x.',
      'Product rule yields 1·ln(sin x) + x cot x.',
    ],
    misconceptionIndex: 9,
  },
  {
    id: 'ch_diff_018',
    nodeId: NODE_C12_APPMATH_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A logistics robot path is parameterized by x = 3t², y = 2t³. What is the path slope dy/dx in terms of parameter t?',
    options: [
      't',
      '1 / t',
      '6t²',
      '36t³',
    ],
    correctIndex: 0,
    explanation: 'dx/dt = 6t and dy/dt = 6t². The slope dy/dx = (dy/dt) / (dx/dt) = (6t²) / (6t) = t.',
    hints: [
      'Find dx/dt = 6t.',
      'Find dy/dt = 6t².',
      'Divide dy/dt by dx/dt (do not multiply!).',
    ],
    misconceptionIndex: 10,
  },
  {
    id: 'ch_diff_019',
    nodeId: NODE_C12_APPMATH_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'What is the derivative of sin(x²) with respect to x²?',
    options: [
      'cos(x²)',
      '2x cos(x²)',
      '-cos(x²)',
      '2x sin(x²)',
    ],
    correctIndex: 0,
    explanation: 'Let u = x². We are differentiating sin(u) with respect to u, which is simply cos(u) = cos(x²). By ratio: (d/dx sin x²) / (d/dx x²) = (2x cos x²) / (2x) = cos(x²).',
    hints: [
      'Set intermediate variable u = x².',
      'The expression becomes sin(u) differentiated with respect to u.',
      'd/du(sin u) = cos u = cos(x²).',
    ],
    misconceptionIndex: 10,
  },
  {
    id: 'ch_diff_020',
    nodeId: NODE_C12_APPMATH_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the crucial mathematical distinction between d²y/dx² and (dy/dx)²?',
    options: [
      'd²y/dx² is the second derivative (rate of change of slope), whereas (dy/dx)² is the algebraic square of the first derivative',
      'They are identical notations for the same quantity',
      'd²y/dx² is only used for trigonometric curves',
      '(dy/dx)² represents acceleration',
    ],
    correctIndex: 0,
    explanation: 'd²y/dx² denotes successive differentiation d/dx(dy/dx) measuring curvature/acceleration. (dy/dx)² is squaring the velocity/slope value.',
    hints: [
      'Think of velocity vs acceleration.',
      'd²y/dx² differentiates twice.',
      '(dy/dx)² takes the first derivative and multiplies it by itself.',
    ],
    misconceptionIndex: 11,
  },
  {
    id: 'ch_diff_021',
    nodeId: NODE_C12_APPMATH_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For the displacement y = x ln x, what is the second order derivative d²y/dx²?',
    options: [
      '1 / x',
      'ln x + 1',
      '-1 / x²',
      '1 / x²',
    ],
    correctIndex: 0,
    explanation: 'First derivative: dy/dx = 1·ln x + x(1/x) = ln x + 1. Second derivative: d²y/dx² = d/dx(ln x + 1) = 1/x + 0 = 1/x.',
    hints: [
      'Use product rule for first derivative: ln x + 1.',
      'Differentiate (ln x + 1) with respect to x.',
      'd/dx(ln x) = 1/x, d/dx(1) = 0.',
    ],
    misconceptionIndex: 11,
  },
  {
    id: 'ch_diff_022',
    nodeId: NODE_C12_APPMATH_030,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate d²y/dx² at x = 0 for y = eˣ cos x.',
    correctAnswer: 0,
    tolerance: 0,
    unit: '',
    explanation: 'dy/dx = eˣ(cos x - sin x). d²y/dx² = eˣ(-sin x - cos x) + eˣ(cos x - sin x) = -2eˣ sin x. At x = 0, -2e⁰ sin(0) = -2(1)(0) = 0.',
    hints: [
      'Find first derivative: e^x(cos x - sin x).',
      'Find second derivative: -2e^x sin x.',
      'Plug in x = 0: sin(0) = 0.',
    ],
    misconceptionIndex: 11,
  },
];

// ─── PROPS INTERFACE ───────────────────────────────────────────────────────
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

// ─── DEFAULT PROPS ─────────────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_APPMATH_021,
  title: 'Applied Matrix & Calculus Suite',
  definition: 'Comprehensive mastery of matrix adjoints, inverses, system consistency (Martin\'s and Cramer\'s Rules), and multi-tier differential calculus (chain, inverse trig, log/exp, implicit, parametric, and second-order derivatives).',
  eli5: 'Matrices help us solve giant systems of equations by turning locks with inverse keys. Calculus lets us measure rates of change step-by-step through nested functions, implicit curves, and accelerating motions.',
  misconceptions: [
    { misconception: 'Squaring a matrix means squaring every individual element.', correction: 'Matrix squaring A² = A × A requires row-by-column dot product multiplication.' },
    { misconception: 'Matrix inverse is taking the reciprocal of every element.', correction: 'A⁻¹ = adj(A)/|A|. Element-wise reciprocal is mathematically invalid.' },
    { misconception: 'Order does not matter in matrix equations: X = BA⁻¹ is fine.', correction: 'Matrix multiplication is non-commutative; X = A⁻¹B must be pre-multiplied.' },
    { misconception: 'Cramer\'s rule replaces all columns simultaneously.', correction: 'Replace only the specific column corresponding to the variable being solved (A₁, A₂, A₃).' },
    { misconception: 'If |A| = 0, the system must immediately be inconsistent.', correction: '|A| = 0 can also mean infinitely many solutions if (adj A)B = O.' },
    { misconception: 'Chain rule only requires differentiating the outside bracket.', correction: 'You must always multiply by the inner derivative du/dx: dy/dx = (dy/du)(du/dx).' },
    { misconception: 'd/dx(tan⁻¹ x) has a square root in the denominator.', correction: 'd/dx(tan⁻¹ x) = 1/(1 + x²); radicals appear only in sin⁻¹, cos⁻¹, sec⁻¹, cosec⁻¹.' },
    { misconception: 'd/dx(aˣ) uses the power rule x aˣ⁻¹.', correction: 'Constant base with variable exponent is exponential: d/dx(aˣ) = aˣ ln a.' },
    { misconception: 'Differentiating y² with respect to x gives 2y.', correction: 'By implicit chain rule, d/dx(y²) = 2y(dy/dx).' },
    { misconception: 'Logarithmic differentiation is optional for xˣ.', correction: 'Neither power rule nor exponential rule applies to xˣ; you MUST take ln first.' },
    { misconception: 'Parametric slope dy/dx = (dy/dt) × (dx/dt).', correction: 'Parametric derivative is a ratio of rates: dy/dx = (dy/dt) / (dx/dt).' },
    { misconception: 'd²y/dx² equals (dy/dx)².', correction: 'd²y/dx² is the derivative of the derivative (acceleration), not the square of slope.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the adjoint of [[2, 5], [1, 3]]?', options: ['[[3, -5], [-1, 2]]', '[[-3, 5], [1, -2]]', '[[3, 1], [5, 2]]', '[[1/2, 1/5], [1, 1/3]]'], correctIndex: 0 },
    { question: 'Under what condition does AX = B have a unique solution?', options: ['|A| ≠ 0', '|A| = 0', '(adj A)B = O', 'A is singular'], correctIndex: 0 },
    { question: 'What is d/dx(e^(3x))?', options: ['3e^(3x)', 'e^(3x)', '3x e^(3x-1)', 'e³'], correctIndex: 0 },
    { question: 'What is d/dx(sin⁻¹(x))?', options: ['1/√(1 - x²)', '-1/√(1 - x²)', '1/(1 + x²)', 'cos⁻¹(x)'], correctIndex: 0 },
    { question: 'For x² + y² = 16, what is dy/dx at (0, 4)?', options: ['0', 'undefined', '-1', '4'], correctIndex: 0 },
    { question: 'What is d/dx(xˣ)?', options: ['xˣ(1 + ln x)', 'x·xˣ⁻¹', 'xˣ ln x', 'xˣ'], correctIndex: 0 },
    { question: 'If x = t², y = t³, what is dy/dx?', options: ['1.5 t', '3t²', '2t', '6t⁵'], correctIndex: 0 },
    { question: 'What is the 2nd derivative of x³?', options: ['6x', '3x²', '6', '3x'], correctIndex: 0 },
  ],
  masteryCriteria: 'Demonstrate fluent matrix adjoint/inverse computation, consistency diagnostics, and exact multi-stage calculus derivations.',
};

// ─── BRILLIANT-STYLE INTERACTIVE EXPLORATION STEPS ─────────────────���───────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: 2×2 Matrix Inversion & Geometric Determinant Area',
    instruction: 'Adjust matrix entries [a, b; c, d] and observe the real-time transformation of the unit square, determinant area, and adjoint matrix.',
    nodeId: NODE_C12_APPMATH_021,
  },
  {
    title: 'Lab 2: Cramer\'s Rule & Linear Systems Consistency',
    instruction: 'Modify the coefficient parameter k to see when lines intersect uniquely, become parallel (inconsistent), or merge completely.',
    nodeId: NODE_C12_APPMATH_022,
  },
  {
    title: 'Lab 3: The Chain Rule & Composite Rate Multipliers',
    instruction: 'Slide the x-input to see how outer and inner rates multiply in real-time for nested functions.',
    nodeId: NODE_C12_APPMATH_024,
  },
  {
    title: 'Lab 4: Implicit & Logarithmic Derivative Analyzer',
    instruction: 'Trace points along the circle x² + y² = 25 and observe instantaneous tangents and implicit slopes dy/dx = -x/y.',
    nodeId: NODE_C12_APPMATH_027,
  },
  {
    title: 'Lab 5: Parametric Motion & Second-Order Curvature (Acceleration)',
    instruction: 'Vary parameter t to inspect the trajectory (x(t), y(t)), velocity slope dy/dx, and acceleration curvature d²y/dx².',
    nodeId: NODE_C12_APPMATH_029,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ──────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you change matrix entry a from 4 to 0 in A = [[a, 2], [3, 1]], what happens to the determinant |A| = a(1) - (2)(3)?',
    options: [
      'It decreases to -6, making the matrix invertible with negative determinant',
      'It becomes 0, collapsing the system into singularity',
      'It increases to +6',
      'Determinant is unaffected by entry a',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the a-slider to 0 on the interactive grid below and check the live determinant display.',
    nodeId: NODE_C12_APPMATH_021,
  },
  {
    question: 'Predict: If parameter k is set to 6 in the linear system 2x + 3y = 7 and 4x + ky = 14, what will happen to the system lines?',
    options: [
      'The two lines will become coincident (identical), giving infinitely many solutions',
      'The lines will become parallel and never intersect, giving no solution',
      'The lines will intersect at a single unique point (0, 0)',
      'The lines will become perpendicular to each other',
    ],
    correctIndex: 0,
    verifyInstruction: 'Switch to Lab 2 and drag the k-slider to 6 to see the two equations represent identical lines.',
    nodeId: NODE_C12_APPMATH_022,
  },
];

// ─── OBSERVATION QUESTIONS ─────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What happens to the transformed grid area when the determinant |A| equals 0?',
    observableOptions: [
      'The 2D area collapses into a 1D flat line or point, making inversion mathematically impossible',
      'The area expands infinitely',
      'The grid rotates by exactly 90 degrees without area loss',
      'The matrix becomes the identity matrix',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_APPMATH_021,
  },
  {
    question: 'Observation: In Lab 5 (parametric curve x = 3t², y = 2t³), as parameter t increases from 0 to 2, what happens to the slope dy/dx?',
    observableOptions: [
      'The tangent line slope increases linearly with t, confirming dy/dx = (6t²)/(6t) = t',
      'The slope remains constant at 1 everywhere',
      'The slope becomes negative and approaches minus infinity',
      'The curve becomes completely vertical at all points',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_APPMATH_029,
  },
];

// ─── REAL WORLD ACTIVITY ───────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Apex Fleet Route & Logistics Optimization Strategy',
  description: 'Apply Martin\'s Rule and differential calculus to optimize real-world transport matrices and fuel-acceleration trajectories in Indian supply corridors.',
  steps: [
    'Model the 3-warehouse supply vector B = [Delhi, Mumbai, Bengaluru]ᵀ and solve AX = B using matrix inversion.',
    'Verify that determinant |A| ≠ 0 so distribution demands do not collapse into an inconsistent deadlock.',
    'Compute fuel burn rate df/dt = (df/dv) · (dv/dt) using the chain rule along national highway gradients.',
    'Assess traffic inflection and deceleration using second-order derivatives d²s/dt².',
  ],
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
function C12_AppliedMathsAdjointInverseMatrixSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['appmath'] || { name: 'Applied Mathematics', emoji: '��', color: 'indigo' };

  // ─── PHASE STATE ──────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── DISCOVERY STATE ──────────────────────────────────────────────────────
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── PREDICT & OBSERVE STATE ────────────��─────────────────────────────────
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── HINTS & REVEAL STATE ─────────────────────────────────────────────────
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── DRAG & CONSTRUCT STATE ───────────────────────────────────────────────
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── FEEDBACK & SHAKE STATE ───────────────────────────────────────────────
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── REFLECTION RESPONSES STATE ──────────────────────────────────────────
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // ─── MULTI-REPRESENTATION VIEW STATE ─────────────────────────────────────
  const [representationMode, setRepresentationMode] = useState<'visual' | 'equation' | 'tabular'>('visual');

  // ─── INTERACTIVE LAB & SIMULATION STATE ────────────────────────────────────
  const [matA, setMatA] = useState(4);
  const [matB, setMatB] = useState(7);
  const [matC, setMatC] = useState(3);
  const [matD, setMatD] = useState(5);
  const [systemK, setSystemK] = useState(6);
  const [chainX, setChainX] = useState(1);
  const [circleAngle, setCircleAngle] = useState(45);
  const [paramT, setParamT] = useState(1.5);
  const [isSingularWarning, setIsSingularWarning] = useState(false);
  const [animSpeed, setAnimSpeed] = useState(1);

  // ─── REFS ───────────────────────────────────────────────────────���─────────
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const labCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───────────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── CALCULATED MATRIX DERIVATIONS ────────────────────────────────────────
  const determinant = useMemo(() => matA * matD - matB * matC, [matA, matB, matC, matD]);
  const adjoint = useMemo(() => ({
    a11: matD,
    a12: -matB,
    a21: -matC,
    a22: matA,
  }), [matA, matB, matC, matD]);

  const inverseMatrix = useMemo(() => {
    if (determinant === 0) return null;
    return {
      a11: (matD / determinant).toFixed(2),
      a12: (-matB / determinant).toFixed(2),
      a21: (-matC / determinant).toFixed(2),
      a22: (matA / determinant).toFixed(2),
    };
  }, [determinant, matA, matB, matC, matD]);

  // ─── LOAD MASTERY ON MOUNT ────────────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY EFFECT ───────────────────────────────────────────────────
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner')
      ? 'foundation'
      : mastery === 'developing'
      ? 'standard'
      : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── LIVE DETERMINANT SYNC EFFECT ─────────────────────────────────────────
  useEffect(() => {
    setIsSingularWarning(determinant === 0);
  }, [determinant]);

  // ─── CANVAS ANIMATION FOR CHALLENGE HEADER ────────────────────────────────
  useEffect(() => {
    if (phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#6366f1';
      ctx.font = '12px monospace';
      ctx.fillText(`Matrix Determinant Radar: |A| = ${determinant}`, 10, 18);

      const pulse = 4 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 25, 14, pulse, 0, Math.PI * 2);
      ctx.fillStyle = determinant === 0 ? '#ef4444' : '#22c55e';
      ctx.fill();

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase, determinant]);

  // ─── LAB 2D CANVAS VISUALIZER ─────────────────────────────────────────────
  useEffect(() => {
    const canvas = labCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Coordinate axes
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(canvas.width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, canvas.height);
      ctx.stroke();

      if (currentSlide === 0 || phase === 'sandbox') {
        const scale = 25;
        const v1x = cx + matA * scale;
        const v1y = cy - matC * scale;
        const v2x = cx + matB * scale;
        const v2y = cy - matD * scale;
        const v3x = cx + (matA + matB) * scale;
        const v3y = cy - (matC + matD) * scale;

        ctx.fillStyle = determinant === 0 ? 'rgba(239, 68, 68, 0.25)' : 'rgba(99, 102, 241, 0.35)';
        ctx.strokeStyle = determinant === 0 ? '#ef4444' : '#818cf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(v1x, v1y);
        ctx.lineTo(v3x, v3y);
        ctx.lineTo(v2x, v2y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#a5b4fc';
        ctx.font = '11px sans-serif';
        ctx.fillText(`v1(${matA},${matC})`, v1x + 4, v1y - 4);
        ctx.fillText(`v2(${matB},${matD})`, v2x + 4, v2y - 4);
      } else if (currentSlide === 1) {
        const scale = 20;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let px = -150; px <= 150; px += 10) {
          const vx = px / scale;
          const vy = (7 - 2 * vx) / 3;
          const scrX = cx + px;
          const scrY = cy - vy * scale;
          if (px === -150) ctx.moveTo(scrX, scrY);
          else ctx.lineTo(scrX, scrY);
        }
        ctx.stroke();

        ctx.strokeStyle = systemK === 6 ? '#22c55e' : '#f43f5e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let px = -150; px <= 150; px += 10) {
          const vx = px / scale;
          const vy = systemK !== 0 ? (14 - 4 * vx) / systemK : 0;
          const scrX = cx + px;
          const scrY = cy - vy * scale;
          if (px === -150) ctx.moveTo(scrX, scrY);
          else ctx.lineTo(scrX, scrY);
        }
        ctx.stroke();
      } else if (currentSlide === 4) {
        const scale = 8;
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let t = -2.5; t <= 2.5; t += 0.1) {
          const px = 3 * t * t;
          const py = 2 * t * t * t;
          const scrX = cx + px * scale - 60;
          const scrY = cy - py * scale;
          if (t === -2.5) ctx.moveTo(scrX, scrY);
          else ctx.lineTo(scrX, scrY);
        }
        ctx.stroke();

        const curX = 3 * paramT * paramT;
        const curY = 2 * paramT * paramT * paramT;
        const scrCurX = cx + curX * scale - 60;
        const scrCurY = cy - curY * scale;

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(scrCurX, scrCurY, 5, 0, Math.PI * 2);
        ctx.fill();

        const slope = paramT;
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(scrCurX - 40, scrCurY + 40 * slope);
        ctx.lineTo(scrCurX + 40, scrCurY - 40 * slope);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentSlide, phase, matA, matB, matC, matD, determinant, systemK, paramT, animSpeed]);

  // ─── ESCALATING HINTS CALLBACK ───────────────────────────��───────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  // ─── INACTIVITY TIMER ─────────────────────────────────────────────────────
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY HANDLER ─────────────��──────────────────────────────────────
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE ADVANCE HANDLERS ───────────────────────────────────────────────
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration labs. Manipulate variables to discover mathematical principles.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all parameters without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase activated. Test your mastery with adaptive questions.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ────────────────────────────────────
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now verify by interacting with the simulation.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding observation!' : 'Check the visualization closely.');
  }, []);

  // ─── COMPLETION HANDLER ───────────────────────────────────────────────��───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Applied Matrix and Calculus Suite.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───────────────────────────────────────────────
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

  // ─── ANSWER VALIDATION HANDLER ────────────────────────────────────────────
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us study the complete mathematical step-by-step resolution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // ─── DRAG & SORT HANDLERS ─────────────────────────────────────────────────
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
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
    const answer = sortArrangement.length > 0
      ? sortArrangement
      : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── CLEANUP ON UNMOUNT ───────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* ─── HEADER BAR ───────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="text-3xl p-2 bg-indigo-950/80 rounded-xl border border-indigo-700"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-indigo-300 font-medium">ISC Class 12 • 10 Connected Topics • Applied Mathematics</p>
          </div>
        </div>

        {/* Difficulty Tier Badge & Navigation */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-300 border-rose-600'
                : 'bg-indigo-950/80 text-indigo-300 border-indigo-600'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700"
          >
            Mastery: <strong className="text-amber-400 capitalize">{masteryLevel}</strong>
          </motion.span>
        </div>
      </motion.div>

      {/* ─── 3 TOPIC-SPECIFIC EDUCATIONAL SVG DIAGRAMS ────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* SVG Diagram 1: Matrix Inversion & Parallelogram Area Transformation */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-3 bg-slate-900/80 border border-indigo-900/50 rounded-2xl flex flex-col items-center"
        >
          <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wide mb-1">
            1. Determinant Area & Inversion
          </span>
          <svg viewBox="0 0 200 120" className="w-full h-24">
            <defs>
              <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <line x1="20" y1="100" x2="180" y2="100" stroke="#475569" strokeWidth="1.5" />
            <line x1="100" y1="10" x2="100" y2="110" stroke="#475569" strokeWidth="1.5" />
            <polygon points="100,100 140,75 160,35 120,60" fill="url(#gridGrad)" stroke="#6366f1" strokeWidth="2" />
            <circle cx="100" cy="100" r="3" fill="#ffffff" />
            <text x="110" y="70" fill="#a5b4fc" fontSize="9" fontFamily="monospace">Area = |A|</text>
            <text x="125" y="28" fill="#38bdf8" fontSize="8" fontFamily="sans-serif">A⁻¹ = adj(A)/|A|</text>
          </svg>
        </motion.div>

        {/* SVG Diagram 2: Cramer's Rule & Consistency Diagnostics */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-3 bg-slate-900/80 border border-indigo-900/50 rounded-2xl flex flex-col items-center"
        >
          <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wide mb-1">
            2. System Consistency Pipeline
          </span>
          <svg viewBox="0 0 200 120" className="w-full h-24">
            <rect x="15" y="15" width="55" height="30" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
            <text x="42" y="34" fill="#e0e7ff" fontSize="9" textAnchor="middle" fontWeight="bold">|A| ≠ 0</text>
            <text x="42" y="60" fill="#34d399" fontSize="8" textAnchor="middle">Unique (A⁻¹B)</text>

            <rect x="130" y="15" width="55" height="30" rx="4" fill="#450a0a" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="157" y="34" fill="#ffe4e6" fontSize="9" textAnchor="middle" fontWeight="bold">|A| = 0</text>
            <text x="157" y="60" fill="#fb7185" fontSize="8" textAnchor="middle">(adj A)B ≠ 0 → ∅</text>

            <path d="M 72 30 L 128 30" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="100" y="90" fill="#fbbf24" fontSize="8" textAnchor="middle">(adj A)B = O → ∞ Sol.</text>
          </svg>
        </motion.div>

        {/* SVG Diagram 3: Calculus Chain Rule & Tangent Curvature */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-3 bg-slate-900/80 border border-indigo-900/50 rounded-2xl flex flex-col items-center"
        >
          <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wide mb-1">
            3. Chain Rule & Curvature
          </span>
          <svg viewBox="0 0 200 120" className="w-full h-24">
            <path d="M 20 100 Q 80 90 110 50 T 180 20" fill="none" stroke="#c084fc" strokeWidth="2.5" />
            <line x1="75" y1="90" x2="145" y2="10" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2,2" />
            <circle cx="110" cy="50" r="4" fill="#f59e0b" />
            <text x="118" y="55" fill="#fde68a" fontSize="8" fontFamily="monospace">dy/dx</text>
            <text x="30" y="30" fill="#a78bfa" fontSize="8" fontFamily="monospace">d²y/dx² (d/dx dy/dx)</text>
          </svg>
        </motion.div>
      </motion.div>

      {/* ─── MULTI-REPRESENTATION TOGGLE BAR ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 p-2 bg-slate-900/70 border border-slate-800 rounded-2xl flex items-center justify-between"
      >
        <span className="text-xs font-bold text-slate-400 px-3">Representations:</span>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRepresentationMode('visual')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              representationMode === 'visual'
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            📊 Visual Grid & Graph
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRepresentationMode('equation')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              representationMode === 'equation'
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            🔣 Symbolic Equation Form
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRepresentationMode('tabular')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              representationMode === 'tabular'
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            📋 Matrix & Rate Table
          </motion.button>
        </div>
      </motion.div>

      {/* Representation Render Card */}
      {representationMode === 'equation' && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mb-6 p-4 bg-slate-900 border border-indigo-800/60 rounded-2xl text-xs font-mono space-y-2"
        >
          <p className="text-indigo-300 font-bold">1. Matrix Inverse Law: A · A⁻¹ = I = (1/|A|) · adj(A)</p>
          <p className="text-emerald-300 font-bold">2. Martin's Rule Formulation: AX = B ⟹ X = A⁻¹ B</p>
          <p className="text-amber-300 font-bold">3. Chain Rule Calculus: (f ∘ g)'(x) = f'(g(x)) · g'(x)</p>
          <p className="text-purple-300 font-bold">4. Parametric Derivative: dy/dx = (dy/dt) / (dx/dt)</p>
        </motion.div>
      )}

      {representationMode === 'tabular' && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mb-6 p-4 bg-slate-900 border border-indigo-800/60 rounded-2xl text-xs overflow-x-auto"
        >
          <table className="w-full text-left font-mono">
            <thead>
              <tr className="border-b border-slate-700 text-indigo-400">
                <th className="py-1 px-2">Operation</th>
                <th className="py-1 px-2">Active Formula</th>
                <th className="py-1 px-2">Current Lab Value</th>
                <th className="py-1 px-2">Singularity Status</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-800">
                <td className="py-1.5 px-2 font-bold text-white">Determinant |A|</td>
                <td className="py-1.5 px-2">ad - bc</td>
                <td className="py-1.5 px-2 text-amber-300">{determinant}</td>
                <td className="py-1.5 px-2">{determinant === 0 ? '❌ Singular' : '✅ Invertible'}</td>
              </tr>
              <tr className="border-b border-slate-800">
                <td className="py-1.5 px-2 font-bold text-white">Chain Rate dy/dx</td>
                <td className="py-1.5 px-2">dy/du · du/dx</td>
                <td className="py-1.5 px-2 text-emerald-300">{chainX * 4} · 5u⁴</td>
                <td className="py-1.5 px-2">✅ Continuous</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 font-bold text-white">Parametric dy/dx</td>
                <td className="py-1.5 px-2">(dy/dt) / (dx/dt)</td>
                <td className="py-1.5 px-2 text-purple-300">{paramT.toFixed(2)}</td>
                <td className="py-1.5 px-2">{paramT === 0 ? '⚠️ Zero Slope' : '✅ Defined'}</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      )}

      {/* ─── PHASE: DISCOVERY ─────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/80"
            >
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Scenario Introduction</span>
              <h2 className="text-2xl font-black text-white mt-1 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-xs mt-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                ⚡ <strong>Context:</strong> {SCENARIO.context}
              </p>
            </motion.div>

            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-500/20 text-amber-300 rounded-md text-xs font-bold">Curiosity Hook</span>
                <p className="text-base font-bold text-white">{DISCOVERY_QUESTION.question}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Discovery option: ${opt}`}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/90 border-slate-700 hover:border-indigo-500 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-indigo-400 font-bold">0{i + 1}.</span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Spot on! Division by zero makes inverting singular matrices impossible.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE: EXPLORE (Guided Interactive Labs) ──────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div key="explore" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
                <h2 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              </div>
              <motion.span whileHover={{ scale: 1.05 }} className="text-xs text-slate-400 font-mono">
                Node: {EXPLORATION_STEPS[currentSlide].nodeId}
              </motion.span>
            </div>

            <motion.p
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="text-amber-300 text-sm bg-amber-950/30 border border-amber-900/50 p-3 rounded-xl flex items-center gap-2"
            >
              <span>👉</span> <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
            </motion.p>

            {/* Dynamic Interactive Visualizer Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
              {/* Canvas Diagram Area */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950 rounded-xl p-3 border border-slate-800/80 relative min-h-[300px]">
                <canvas
                  ref={labCanvasRef}
                  width={460}
                  height={280}
                  className="w-full max-w-[460px] h-[280px] rounded-lg"
                />
                {isSingularWarning && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4 bg-rose-950/90 border border-rose-600 text-rose-300 text-xs px-2.5 py-1 rounded-md font-bold"
                  >
                    ⚠️ Singular Matrix: |A| = 0
                  </motion.div>
                )}
              </div>

              {/* Interactive Control Dashboard */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                {currentSlide === 0 && (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-indigo-300">Matrix A = [[a, b], [c, d]]</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-slate-400">a: {matA}</label>
                        <input
                          type="range"
                          min={-5}
                          max={5}
                          value={matA}
                          onChange={e => setMatA(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                          aria-label="Set matrix entry a"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">b: {matB}</label>
                        <input
                          type="range"
                          min={-5}
                          max={5}
                          value={matB}
                          onChange={e => setMatB(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                          aria-label="Set matrix entry b"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">c: {matC}</label>
                        <input
                          type="range"
                          min={-5}
                          max={5}
                          value={matC}
                          onChange={e => setMatC(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                          aria-label="Set matrix entry c"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">d: {matD}</label>
                        <input
                          type="range"
                          min={-5}
                          max={5}
                          value={matD}
                          onChange={e => setMatD(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                          aria-label="Set matrix entry d"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono text-xs">
                      <p className="text-emerald-400 font-bold">|A| = ({matA})({matD}) - ({matB})({matC}) = {determinant}</p>
                      <p className="text-indigo-300">adj(A) = [[{adjoint.a11}, {adjoint.a12}], [{adjoint.a21}, {adjoint.a22}]]</p>
                      <p className="text-slate-300">
                        A⁻¹ = {inverseMatrix ? `(1/${determinant}) adj(A)` : 'Undefined (|A| = 0)'}
                      </p>
                    </div>
                  </div>
                )}

                {currentSlide === 1 && (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-indigo-300">System: 2x + 3y = 7 and 4x + ky = 14</span>
                    <div>
                      <label className="text-xs text-slate-400">Parameter k: {systemK}</label>
                      <input
                        type="range"
                        min={0}
                        max={12}
                        value={systemK}
                        onChange={e => setSystemK(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set system parameter k"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-slate-300">Determinant |A| = 2({systemK}) - 12 = <strong className="text-amber-400">{2 * systemK - 12}</strong></p>
                      <p className="font-bold text-emerald-400">
                        Status: {systemK === 6 ? 'Consistent (Infinitely Many Solutions - Coincident)' : 'Consistent (Unique Solution)'}
                      </p>
                    </div>
                  </div>
                )}

                {currentSlide === 2 && (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-indigo-300">y = (2x² + 1)⁵ → u = 2x² + 1</span>
                    <div>
                      <label className="text-xs text-slate-400">x-coordinate: {chainX}</label>
                      <input
                        type="range"
                        min={-3}
                        max={3}
                        step={0.5}
                        value={chainX}
                        onChange={e => setChainX(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set chain rule x coordinate"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                      <p className="text-indigo-300">du/dx = 4x = {4 * chainX}</p>
                      <p className="text-indigo-300">dy/du = 5u⁴ = 5({(2 * chainX * chainX + 1).toFixed(1)})⁴</p>
                      <p className="text-emerald-400 font-bold">dy/dx = (dy/du) · (du/dx) = {(20 * chainX * Math.pow(2 * chainX * chainX + 1, 4)).toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {currentSlide === 3 && (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-indigo-300">Implicit Curve x² + y² = 25</span>
                    <div>
                      <label className="text-xs text-slate-400">Angle θ on circle: {circleAngle}°</label>
                      <input
                        type="range"
                        min={10}
                        max={80}
                        value={circleAngle}
                        onChange={e => setCircleAngle(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set circle angle"
                      />
                    </div>
                    {(() => {
                      const rad = (circleAngle * Math.PI) / 180;
                      const px = (5 * Math.cos(rad)).toFixed(2);
                      const py = (5 * Math.sin(rad)).toFixed(2);
                      const slope = (-parseFloat(px) / parseFloat(py)).toFixed(2);
                      return (
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                          <p className="text-slate-300">Point (x, y) = ({px}, {py})</p>
                          <p className="text-amber-400 font-bold">dy/dx = -x/y = -({px})/({py}) = {slope}</p>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {currentSlide === 4 && (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-indigo-300">Parametric: x = 3t², y = 2t³</span>
                    <div>
                      <label className="text-xs text-slate-400">Parameter t: {paramT}</label>
                      <input
                        type="range"
                        min={-2}
                        max={2}
                        step={0.1}
                        value={paramT}
                        onChange={e => setParamT(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set parametric variable t"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                      <p className="text-slate-300">dx/dt = 6t = {(6 * paramT).toFixed(1)} | dy/dt = 6t² = {(6 * paramT * paramT).toFixed(2)}</p>
                      <p className="text-amber-400 font-bold">dy/dx = (6t²)/(6t) = t = {paramT.toFixed(2)}</p>
                      <p className="text-emerald-400">d²y/dx² = [d/dt(t)] / (dx/dt) = 1/(6t) = {(1 / (6 * (paramT || 0.001))).toFixed(2)}</p>
                    </div>
                  </div>
                )}

                {currentSlide === 0 && !predictionMade && (
                  <div className="p-3 bg-indigo-950/50 rounded-xl border border-indigo-800">
                    <p className="text-xs font-bold text-indigo-200 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="space-y-1.5">
                      {PREDICTION_QUESTIONS[0].options.map((opt, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(idx)}
                          className="w-full text-left p-2 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Slide Navigation Bar */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-sm font-bold disabled:opacity-40"
              >
                ← Previous Lab
              </motion.button>

              <div className="flex gap-1.5">
                {EXPLORATION_STEPS.map((_, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentSlide ? 'bg-indigo-500 scale-125' : 'bg-slate-800'
                    }`}
                    aria-label={`Jump to lab ${idx + 1}`}
                  />
                ))}
              </div>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => s + 1)}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold"
                >
                  Unlock Sandbox Mode →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE: SANDBOX (Free Play Mode) ──────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div key="sandbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Free Sandbox</span>
                <h2 className="text-xl font-bold text-white">Full Matrix & Calculus Playground</h2>
                <p className="text-slate-400 text-xs mt-1">Manipulate all parameters without evaluation. Observe area transformations and derivative slopes freely.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
              >
                Ready for Adaptive Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950 rounded-xl p-3 border border-slate-800">
                <canvas ref={labCanvasRef} width={460} height={280} className="w-full max-w-[460px] h-[280px]" />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-indigo-300">Interactive 2×2 Matrix Rig</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400">Entry a: {matA}</label>
                    <input type="range" min={-4} max={4} value={matA} onChange={e => setMatA(Number(e.target.value))} className="w-full accent-indigo-500" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Entry b: {matB}</label>
                    <input type="range" min={-4} max={4} value={matB} onChange={e => setMatB(Number(e.target.value))} className="w-full accent-indigo-500" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Entry c: {matC}</label>
                    <input type="range" min={-4} max={4} value={matC} onChange={e => setMatC(Number(e.target.value))} className="w-full accent-indigo-500" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Entry d: {matD}</label>
                    <input type="range" min={-4} max={4} value={matD} onChange={e => setMatD(Number(e.target.value))} className="w-full accent-indigo-500" />
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                  <p className="text-emerald-400">Determinant |A| = {determinant}</p>
                  <p className="text-indigo-300">adj(A) = [[{adjoint.a11}, {adjoint.a12}], [{adjoint.a21}, {adjoint.a22}]]</p>
                  <p className="text-slate-300">A⁻¹ = {inverseMatrix ? `[[${inverseMatrix.a11}, ${inverseMatrix.a12}], [${inverseMatrix.a21}, ${inverseMatrix.a22}]]` : 'Singular (No Inverse)'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE: CHALLENGE ─────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div key="challenge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <canvas ref={canvasRef} width={600} height={28} className="w-full rounded-lg bg-slate-900 border border-slate-800" />

            {/* Progress & Difficulty Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-white">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
                <span className="font-mono text-indigo-400">Competency: {challenge.competencyLevel.toUpperCase()}</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Challenge Card */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between gap-2">
                <motion.span whileHover={{ scale: 1.05 }} className="px-2.5 py-1 bg-indigo-950 text-indigo-300 border border-indigo-700 rounded-md text-xs font-bold">
                  Node: {challenge.nodeId}
                </motion.span>
                <span className="text-xs text-slate-400 font-mono">Hints Used: {hintCount}/3</span>
              </div>

              <h3 className="text-base font-bold text-white leading-relaxed">{challenge.question}</h3>

              {/* MCQ Types */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-2.5 pt-2">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option: ${opt}`}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                        wrongFlash
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/90 border-slate-700 hover:border-indigo-500 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-mono text-xs text-indigo-300">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Drag-label Type */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 w-full mb-1">Drag entries to target matrix cells:</span>
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        role="button"
                        aria-label={`Draggable matrix entry ${item.label}`}
                        className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-sm font-mono font-bold cursor-grab active:cursor-grabbing shadow-md"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto p-4 bg-slate-950 rounded-xl border border-slate-800">
                    {['adj_11', 'adj_12', 'adj_21', 'adj_22'].map(slotId => (
                      <motion.div
                        key={slotId}
                        whileHover={{ scale: 1.02 }}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(slotId)}
                        className={`h-16 rounded-lg border-2 border-dashed flex items-center justify-center text-sm font-mono font-bold ${
                          droppedLabels[slotId]
                            ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                            : 'border-slate-700 bg-slate-900/60 text-slate-500'
                        }`}
                      >
                        {droppedLabels[slotId] || slotId.replace('_', ' ')}
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm"
                  >
                    Verify Adjoint Mapping
                  </motion.button>
                </div>
              )}

              {/* Drag-sort Type */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs text-slate-400">Drag to reorder steps:</span>
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-sm flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-6 h-6 rounded-md bg-indigo-950 border border-indigo-700 flex items-center justify-center text-xs font-bold text-indigo-300">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm"
                  >
                    Check Systematic Sequence
                  </motion.button>
                </div>
              )}

              {/* Numeric Type */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      placeholder="Enter calculated value"
                      className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-indigo-500 outline-none w-48"
                      aria-label="Numeric answer input"
                    />
                    <span className="text-slate-400 text-sm font-mono">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm disabled:opacity-50"
                    >
                      Submit Answer
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Construct Type */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4 pt-2">
                  <p className="text-xs text-indigo-300 font-mono">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.availableParts.map((part, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 border border-indigo-700 rounded-lg text-xs font-mono font-bold"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="min-h-[60px] p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center gap-2">
                    {constructParts.map((part, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="px-3 py-1 bg-indigo-700 text-white font-mono text-xs rounded-md flex items-center gap-2 shadow"
                      >
                        <span>{part}</span>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-indigo-200 hover:text-white"
                          aria-label={`Remove part ${part}`}
                        >
                          ✕
                        </motion.button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-slate-500 text-xs italic">Click components above to build equation</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm disabled:opacity-50"
                  >
                    Verify Constructed Derivative
                  </motion.button>
                </div>
              )}

              {/* Step-by-Step Progressive Disclosure Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-amber-950/40 border border-amber-800/80 rounded-2xl space-y-3"
                >
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Step-by-Step Mathematical Proof</span>
                  <div className="space-y-2">
                    {challenge.explanation
                      .split('. ')
                      .filter(s => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, idx) => (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-amber-200 text-sm flex items-start gap-2"
                        >
                          <span className="font-mono text-amber-400 font-bold">{idx + 1}.</span>
                          <span>{sentence}{!sentence.endsWith('.') && '.'}</span>
                        </motion.p>
                      ))}
                  </div>

                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE: COMPLETE (With Reflection & Real World Synthesis) ────── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div key="complete" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-8 bg-gradient-to-br from-indigo-950/80 to-slate-900 rounded-3xl border border-indigo-800 text-center space-y-4"
            >
              <span className="text-4xl">🏆</span>
              <h2 className="text-3xl font-black text-white">Applied Mathematics Simulation Mastered!</h2>
              <p className="text-indigo-300 text-sm max-w-xl mx-auto">
                You successfully solved matrix inverses, checked multi-variable consistency, and performed multi-layer differential calculus.
              </p>

              <div className="flex justify-center gap-6 pt-2 font-mono">
                <motion.div whileHover={{ scale: 1.05 }} className="px-5 py-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">Final Score</span>
                  <span className="text-2xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="px-5 py-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block">Mastery Level</span>
                  <span className="text-2xl font-bold text-amber-400 capitalize">{masteryLevel}</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Personalized Performance Feedback */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-800 text-sm text-emerald-300"
            >
              {errors === 0
                ? '🌟 Flawless Mastery! Perfect score achieved across all ten Class 12 Applied Mathematics syllabus nodes!'
                : errors <= 3
                ? '✨ Excellent work! High competence demonstrated. Review your specific misconception profile below.'
                : '📈 Good progress! You are consolidating matrix transformations and calculus rules. Re-test challenging nodes to reinforce.'}
            </motion.div>

            {/* ─── REQUIRED REFLECTION SECTION ────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-indigo-900/80 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🧠</span>
                <h3 className="text-base font-bold text-white">Metacognitive Self-Reflection</h3>
              </div>
              <p className="text-xs text-indigo-300">
                Consolidate your long-term understanding by reflecting on what you just solved.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    1. What was the most surprising thing you learned?
                  </label>
                  <input
                    type="text"
                    value={reflectionResponses.surprising}
                    onChange={e => setReflectionResponses({ ...reflectionResponses, surprising: e.target.value })}
                    placeholder="e.g., How determinant = 0 collapses the geometric area completely..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    2. How would you explain Martin's Rule vs Cramer's Rule to a friend?
                  </label>
                  <input
                    type="text"
                    value={reflectionResponses.explain}
                    onChange={e => setReflectionResponses({ ...reflectionResponses, explain: e.target.value })}
                    placeholder="e.g., Martin uses inverse pre-multiplication X = A⁻¹B, while Cramer uses column replacement..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    3. Where in real life or engineering might you use logarithmic differentiation?
                  </label>
                  <input
                    type="text"
                    value={reflectionResponses.realLife}
                    onChange={e => setReflectionResponses({ ...reflectionResponses, realLife: e.target.value })}
                    placeholder="e.g., Analyzing power-law growth rates or compound elasticity in logistics..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:border-indigo-500 outline-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setReflectionSubmitted(true);
                    audioManager.play('success');
                    speechManager.speak('Reflection saved! Outstanding metacognition.');
                  }}
                  disabled={reflectionSubmitted || (!reflectionResponses.surprising && !reflectionResponses.explain)}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow disabled:opacity-50"
                >
                  {reflectionSubmitted ? '✓ Reflection Saved' : 'Save Reflection Log'}
                </motion.button>
              </div>
            </motion.div>

            {/* Misconception Diagnostic Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Identified Misconceptions & Corrections</h3>
                <div className="space-y-2">
                  {hitMisconceptions.map(mIdx => {
                    const m = misconceptions?.[mIdx];
                    if (!m) return null;
                    return (
                      <motion.div
                        key={mIdx}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1"
                      >
                        <p className="text-rose-400 font-bold">❌ {m.misconception}</p>
                        <p className="text-emerald-400">✓ {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Spaced Repetition SRS Interval Schedule */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-5 bg-amber-950/40 rounded-2xl border border-amber-800 text-xs space-y-2"
            >
              <span className="font-bold text-amber-400 uppercase tracking-wider block">SM-2 Spaced Repetition Review Schedule</span>
              <p className="text-slate-300">
                Based on your response precision, review these 10 applied calculus & matrix nodes in{' '}
                <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
              </p>
            </motion.div>

            {/* Real World Application Section */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
            >
              <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={{ x: 4 }}
                    className="text-xs text-slate-400 flex items-start gap-2"
                  >
                    <span className="text-indigo-400 font-bold">{idx + 1}.</span>
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIM-ENGINE FEEDBACK OVERLAYS ────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Matrix & Calculus Module Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C12_AppliedMathsAdjointInverseMatrixSim;
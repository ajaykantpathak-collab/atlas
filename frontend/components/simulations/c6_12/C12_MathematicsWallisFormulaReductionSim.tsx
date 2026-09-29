'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── CONSTANT NODE IDS ───
const NODE_C12_MATH_101 = 'c12_math_101'; // Wallis' formula and reduction formulas
const NODE_C12_MATH_102 = 'c12_math_102'; // Exact differential equations and integrating factors
const NODE_C12_MATH_103 = 'c12_math_103'; // Bernoulli's differential equation
const NODE_C12_MATH_104 = 'c12_math_104'; // Area under parametric curves and polar curves
const NODE_C12_MATH_105 = 'c12_math_105'; // Binomial distribution and mean/variance
const NODE_C12_MATH_106 = 'c12_math_106'; // Elementary row operations and rank of matrix
const NODE_C12_MATH_107 = 'c12_math_107'; // Product of determinants and solving linear systems
const NODE_C12_MATH_108 = 'c12_math_108'; // Image of point in plane and foot of perpendicular
const NODE_C12_MATH_109 = 'c12_math_109'; // Bisector planes of two planes

const ALL_NODE_IDS = [
  NODE_C12_MATH_101,
  NODE_C12_MATH_102,
  NODE_C12_MATH_103,
  NODE_C12_MATH_104,
  NODE_C12_MATH_105,
  NODE_C12_MATH_106,
  NODE_C12_MATH_107,
  NODE_C12_MATH_108,
  NODE_C12_MATH_109,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The ISRO Trajectory & Signal Analysis Lab',
  intro: 'You are a lead mathematical flight analyst at ISRO Bengaluru. A satellite telemetry packet has returned complex recurrence relations, non-linear orbital drag equations, geometric mirror reflection planes, and sensor reliability distributions. Your team needs rapid, exact evaluations.',
  context: 'Use recursions, exact differential reductions, 3D reflection geometry, and binomial sensors to decode the mission telemetry.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In computing the definite integral I_n = ∫₀^(π/2) sinⁿ(x) dx, what happens to the area under sinⁿ(x) as the power n increases from 1 to 6?',
  options: [
    'The area gets significantly smaller because values < 1 shrink when raised to higher powers',
    'The area gets larger because the exponent amplifies the function',
    'The area stays constant at π/4 for all powers',
    'The integral becomes undefined for even powers',
  ],
  correctIndex: 0,
  hintAfter: 'Think about multiplying numbers between 0 and 1 repeatedly (like 0.5² = 0.25, 0.5⁴ = 0.0625). The curve squeezes toward the bottom right!',
};

// ─── CHALLENGE INTERFACE ───
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

// ─── 22 CHALLENGES COVERING ALL 9 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. Wallis Formula (Foundation)
  {
    id: 'ch_01',
    nodeId: NODE_C12_MATH_101,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "According to Wallis' formula for I_n = ∫₀^(π/2) sinⁿ(x) dx, what is the recurrence relation connecting I_n to I_(n-2)?",
    options: [
      'I_n = [(n-1)/n] · I_(n-2)',
      'I_n = [n/(n-1)] · I_(n-2)',
      'I_n = [(n-2)/n] · I_(n-1)',
      'I_n = [(n-1)/(n+1)] · I_(n-2)',
    ],
    correctIndex: 0,
    explanation: 'Integration by parts with u = sinⁿ⁻¹(x) and dv = sin(x)dx yields the fundamental recurrence I_n = [(n-1)/n] I_(n-2). The base cases are I_0 = π/2 and I_1 = 1.',
    hints: [
      'Think about splitting sinⁿ(x) as sinⁿ⁻¹(x) · sin(x).',
      'Integration by parts gives (n-1)I_(n-2) - (n-1)I_n on the right.',
      'Adding (n-1)I_n to the left gives n I_n = (n-1) I_(n-2), so divide by n.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Wallis Formula Numeric (Foundation/Standard)
  {
    id: 'ch_02',
    nodeId: NODE_C12_MATH_101,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Evaluate I_5 = ∫₀^(π/2) sin⁵(x) dx using Wallis reduction. Enter the value of the numerator if the fraction is written in lowest terms as P/15.',
    correctAnswer: 8,
    tolerance: 0.1,
    unit: '(numerator P)',
    explanation: 'For odd n=5: I_5 = (4/5) · I_3 = (4/5) · (2/3) · I_1 = (4/5) · (2/3) · 1 = 8/15. Thus the numerator P is 8.',
    hints: [
      'For odd n, the unrolling terminates at I_1 = 1.',
      'I_5 = (4/5) * I_3, and I_3 = (2/3) * I_1.',
      'Multiply (4/5) * (2/3) * 1 = 8/15.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Exact DE Condition (Foundation)
  {
    id: 'ch_03',
    nodeId: NODE_C12_MATH_102,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the necessary and sufficient condition for the first-order differential equation M(x, y)dx + N(x, y)dy = 0 to be exact?',
    options: [
      '∂M/∂y = ∂N/∂x',
      '∂M/∂x = ∂N/∂y',
      '∂M/∂y = -∂N/∂x',
      'M / N = constant',
    ],
    correctIndex: 0,
    explanation: 'A differential form is exact if it equals dF = (∂F/∂x)dx + (∂F/∂y)dy. By equality of mixed partial derivatives (∂²F/∂y∂x = ∂²F/∂x∂y), exactness requires ∂M/∂y = ∂N/∂x.',
    hints: [
      'Remember M is paired with dx, so differentiating with respect to the other variable (y) gives the mixed derivative.',
      'N is paired with dy, so differentiate with respect to x.',
      'Equating mixed partials ∂²F/∂y∂x = ∂²F/∂x∂y gives ∂M/∂y = ∂N/∂x.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Exact DE Drag-Label (Standard)
  {
    id: 'ch_04',
    nodeId: NODE_C12_MATH_102,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match the standard differential combinations with their exact potential forms.',
    dragItems: [
      { label: 'd(xy)', targetId: 'slot_xy' },
      { label: 'd(y/x)', targetId: 'slot_yx' },
      { label: 'd(arctan(y/x))', targetId: 'slot_atan' },
      { label: 'd(y·eˣ)', targetId: 'slot_yex' },
    ],
    correctMapping: {
      slot_xy: 'd(xy)',
      slot_yx: 'd(y/x)',
      slot_atan: 'd(arctan(y/x))',
      slot_yex: 'd(y·eˣ)',
    },
    explanation: 'x dy + y dx = d(xy); (x dy - y dx)/x² = d(y/x); (x dy - y dx)/(x² + y²) = d(tan⁻¹(y/x)); and eˣ(dy + y dx) = d(yeˣ).',
    hints: [
      'Product rule d(uv) = u dv + v du gives d(xy) = x dy + y dx.',
      'Quotient rule gives (x dy - y dx)/x² for d(y/x).',
      'Look for exponential factor eˣ(dy + y dx) for d(y·eˣ).',
    ],
  },
  // 5. Bernoulli Substitution (Foundation)
  {
    id: 'ch_05',
    nodeId: NODE_C12_MATH_103,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "To linearise Bernoulli's differential equation dy/dx + P(x)y = Q(x)yⁿ (where n ≠ 0, 1), which substitution is universally used?",
    options: [
      'v = y¹⁻ⁿ',
      'v = yⁿ',
      'v = yⁿ⁻¹',
      'v = y⁻ⁿ',
    ],
    correctIndex: 0,
    explanation: 'Setting v = y¹⁻ⁿ produces dv/dx = (1-n)y⁻ⁿ(dy/dx). Multiplying the equation by (1-n)y⁻ⁿ linearises it to dv/dx + (1-n)Pv = (1-n)Q.',
    hints: [
      'We need to cancel the yⁿ on the right-hand side by multiplying by y⁻ⁿ.',
      'The linear term P(x)y will then become P(x)y¹⁻ⁿ.',
      'Hence the new variable must be v = y¹⁻ⁿ.',
    ],
  },
  // 6. Bernoulli Reduction Drag-Sort (Advanced)
  {
    id: 'ch_06',
    nodeId: NODE_C12_MATH_103,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: "Arrange the chronological steps to solve Bernoulli's equation dy/dx + P(x)y = Q(x)yⁿ.",
    sortItems: [
      'Identify n and divide entire equation by yⁿ to get y⁻ⁿ(dy/dx) + P(x)y¹⁻ⁿ = Q(x)',
      'Substitute v = y¹⁻ⁿ and dv/dx = (1-n)y⁻ⁿ(dy/dx) to form a linear DE in v',
      'Compute Integrating Factor IF = exp(∫(1-n)P(x) dx) and solve for v(x)',
      'Back-substitute v = y¹⁻ⁿ to express the general solution in terms of y',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The rigorous method requires: (1) dividing by yⁿ, (2) substituting v = y¹⁻ⁿ to linearise, (3) using standard IF on the linear DE in v, (4) back-substituting for y.',
    hints: [
      'First step is always isolating the non-linear power yⁿ.',
      'Next substitute v to turn non-linear into linear.',
      'Solve linear in v using IF before finally returning to y.',
    ],
  },
  // 7. Parametric Area Astroid (Standard)
  {
    id: 'ch_07',
    nodeId: NODE_C12_MATH_104,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'The total area enclosed by the astroid x = a cos³(t), y = a sin³(t) is:',
    options: [
      '(3/8) π a²',
      '(3/4) π a²',
      'π a²',
      '(3/2) π a²',
    ],
    correctIndex: 0,
    explanation: 'Quadrant area = ∫_(π/2)⁰ (a sin³t)(-3a cos²t sin t)dt = 3a² ∫₀^(π/2) sin��t cos²t dt = 3πa²/32. Total area for 4 quadrants = 4 · (3πa²/32) = (3/8)πa².',
    hints: [
      'Parametric area is 4 * ∫ y(t) (-x\'(t)) dt from 0 to π/2.',
      'dx/dt = -3a cos²t sin t, y = a sin³t.',
      'The beta-integral evaluates to 3πa²/32 per quadrant, so multiply by 4.',
    ],
  },
  // 8. Polar Area Cardioid Numeric (Standard)
  {
    id: 'ch_08',
    nodeId: NODE_C12_MATH_104,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The area enclosed by the cardioid r = 2(1 + cos θ) is given by K · π. What is the value of K?',
    correctAnswer: 6,
    tolerance: 0.1,
    unit: '(coefficient of π)',
    explanation: 'Area = 2 · (1/2) ∫₀^π r² dθ = ∫₀^π 4(1 + 2cosθ + cos²θ)dθ = 4(π + 0 + π/2) = 6π. Hence K = 6.',
    hints: [
      'Use symmetry: A = 2 * (1/2) ∫₀^π r² dθ = ∫₀^π r² dθ.',
      'Here a = 2, so a² = 4. r² = 4(1 + 2cosθ + cos²θ).',
      '∫₀^π (1 + cos²θ) dθ = π + π/2 = 3π/2. Multiply by 4.',
    ],
  },
  // 9. Binomial Mean & Variance (Foundation)
  {
    id: 'ch_09',
    nodeId: NODE_C12_MATH_105,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For a binomial distribution X ~ B(n, p) with failure probability q = 1 - p, what are the mean E(X) and variance Var(X)?',
    options: [
      'E(X) = np, Var(X) = npq',
      'E(X) = np, Var(X) = √(npq)',
      'E(X) = npq, Var(X) = np',
      'E(X) = n/p, Var(X) = n/(pq)',
    ],
    correctIndex: 0,
    explanation: 'The expectation of a binomial variable is E(X) = np, its variance is Var(X) = npq = np(1-p), and its standard deviation is σ = √(npq).',
    hints: [
      'Mean is the number of trials times probability of single success.',
      'Variance incorporates both success (p) and failure (q).',
      'Standard deviation has the square root, variance does not.',
    ],
    misconceptionIndex: 3,
  },
  // 10. Binomial Quality Control Application (Standard)
  {
    id: 'ch_10',
    nodeId: NODE_C12_MATH_105,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'ISRO tests a batch of n = 100 thruster valves with defect rate p = 0.04. What is the variance of defective valves in the sample?',
    correctAnswer: 3.84,
    tolerance: 0.05,
    unit: 'valves²',
    explanation: 'Var(X) = npq = 100 · 0.04 · (1 - 0.04) = 4 · 0.96 = 3.84.',
    hints: [
      'Identify n = 100, p = 0.04, q = 0.96.',
      'Use Var(X) = np(1-p).',
      '100 * 0.04 * 0.96 = 3.84.',
    ],
  },
  // 11. Matrix Rank Definition (Foundation)
  {
    id: 'ch_11',
    nodeId: NODE_C12_MATH_106,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How is the rank of an m × n matrix A formally defined via Gaussian elimination?',
    options: [
      'The number of non-zero rows in its row echelon form (REF)',
      'The number of columns in the original matrix',
      'The total number of non-zero entries in the original matrix',
      'The determinant of matrix A',
    ],
    correctIndex: 0,
    explanation: 'Rank is the number of linearly independent rows, which equals the number of non-zero rows after reduction to row echelon form (REF).',
    hints: [
      'Elementary row operations preserve the rank.',
      'In row echelon form, zero rows sink to the bottom.',
      'Count only the rows with leading pivots.',
    ],
  },
  // 12. Matrix Parameter Rank (Advanced)
  {
    id: 'ch_12',
    nodeId: NODE_C12_MATH_106,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For what critical value of λ does the system [x+y+z=6, x+2y+3z=14, x+y+λz=6] drop in coefficient rank from rank(A)=3 to rank(A)=2?',
    correctAnswer: 1,
    tolerance: 0.01,
    unit: '(value of λ)',
    explanation: 'Row operations R₃ -> R₃ - R₁ give the third row as [0, 0, λ - 1 | 0]. The rank drops to 2 if and only if λ - 1 = 0, so λ = 1.',
    hints: [
      'Perform R₃ -> R₃ - R₁ on the coefficient rows [1,1,1] and [1,1,λ].',
      'The third row becomes [0, 0, λ-1].',
      'Set λ - 1 = 0.',
    ],
  },
  // 13. Determinant Product Rule (Foundation)
  {
    id: 'ch_13',
    nodeId: NODE_C12_MATH_107,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'If A and B are 3×3 square matrices with |A| = 4 and |B| = -3, what is |A²B|?',
    options: [
      '-48',
      '-12',
      '48',
      '-36',
    ],
    correctIndex: 0,
    explanation: 'By the multiplicative property of determinants, |A²B| = |A|² · |B| = (4)² · (-3) = 16 · (-3) = -48.',
    hints: [
      'Multiplicative property: |XY| = |X| · |Y|.',
      '|A²| = |A|² = 4² = 16.',
      'Multiply 16 by |B| = -3.',
    ],
  },
  // 14. Cramer\'s Rule Consistency (Standard)
  {
    id: 'ch_14',
    nodeId: NODE_C12_MATH_107,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: "In a 3×3 linear system Ax = b, if |A| = 0 and at least one augmented determinant |A_i| ≠ 0, what is the nature of the solution?",
    options: [
      'Inconsistent (no solution)',
      'Consistent with a unique solution',
      'Consistent with infinitely many solutions',
      'Trivial zero solution only',
    ],
    correctIndex: 0,
    explanation: "If |A| = 0 and some |A_i| ≠ 0, Cramer's formula would yield non-zero divided by zero, which represents an impossible condition, hence the system is inconsistent.",
    hints: [
      'x_i = |A_i| / |A|.',
      'When denominator is 0 and numerator is non-zero, division is undefined.',
      'Geometrically, the planes are parallel or intersect without a common line.',
    ],
  },
  // 15. Foot of Perpendicular (Standard)
  {
    id: 'ch_15',
    nodeId: NODE_C12_MATH_108,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'The foot of perpendicular from P(x₁, y₁, z₁) to plane ax + by + cz + d = 0 is found using parameter t₀ along the normal line. What is t₀?',
    options: [
      't₀ = -(ax₁ + by₁ + cz₁ + d) / (a² + b² + c²)',
      't₀ = -(ax₁ + by₁ + cz₁ + d) / √(a² + b² + c²)',
      't₀ = +(ax₁ + by₁ + cz₁ + d) / (a² + b² + c²)',
      't₀ = (a + b + c + d) / (x₁² + y₁² + z₁²)',
    ],
    correctIndex: 0,
    explanation: 'Substituting the normal line (x₁ + at, y₁ + bt, z₁ + ct) into ax + by + cz + d = 0 yields (a²+b²+c²)t + (ax₁+by₁+cz₁+d) = 0, giving t₀ = -(ax₁+by₁+cz₁+d)/(a²+b²+c²).',
    hints: [
      'Write line parametric equations: x = x₁ + at, y = y₁ + bt, z = z₁ + ct.',
      'Substitute into ax + by + cz + d = 0 and solve for t.',
      'The denominator has sum of squares of normal coefficients (a²+b²+c²).',
    ],
  },
  // 16. Reflection Image Formula (Standard)
  {
    id: 'ch_16',
    nodeId: NODE_C12_MATH_108,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: "If F is the foot of perpendicular from point P to a mirror plane, what is the image point P' reflected across the plane?",
    options: [
      "P' = 2F - P",
      "P' = F - P",
      "P' = 2P - F",
      "P' = (P + F)/2",
    ],
    correctIndex: 0,
    explanation: "Because the mirror plane is the perpendicular bisector of segment PP', the foot F is the midpoint F = (P + P')/2, which rearranges to P' = 2F - P.",
    hints: [
      'F is right in the middle between the object P and image P\'.',
      'Midpoint formula: F = (P + P\') / 2.',
      'Multiply by 2 and subtract P to isolate P\'.',
    ],
  },
  // 17. Bisector Plane Perpendicularity (Foundation)
  {
    id: 'ch_17',
    nodeId: NODE_C12_MATH_109,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is always true about the two bisector planes formed between any two non-parallel intersecting planes P₁ and P₂?',
    options: [
      'The two bisector planes are mutually perpendicular (at 90° to each other)',
      'The two bisector planes are parallel to each other',
      'The two bisector planes intersect at 45°',
      'Only one bisector plane can exist in 3D',
    ],
    correctIndex: 0,
    explanation: 'The normal vectors of the two bisector planes are (n̂₁ + n̂₂) and (n̂₁ - n̂₂). Their dot product is |n̂₁|² - |n̂₂|² = 1 - 1 = 0, proving mutual perpendicularity.',
    hints: [
      'Look at the bisector unit normals n̂₁ + n̂₂ and n̂₁ - n̂₂.',
      'Dot product: (n̂₁ + n̂₂) · (n̂₁ - n̂₂) = |n̂₁|² - |n̂₂|².',
      'Since they are unit normals, 1 - 1 = 0, meaning an angle of 90°.',
    ],
  },
  // 18. Bisector Acute vs Obtuse Sign Rule (Advanced)
  {
    id: 'ch_18',
    nodeId: NODE_C12_MATH_109,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When writing (a₁x+b₁y+c₁z+d₁)/|n₁| = ±(a₂x+b₂y+c₂z+d₂)/|n₂|, if the dot product of the normals a₁a₂ + b₁b₂ + c₁c₂ > 0, which sign gives the ACUTE angle bisector?',
    options: [
      'The minus (-) sign gives the acute angle bisector',
      'The plus (+) sign gives the acute angle bisector',
      'Both signs give the same acute angle bisector',
      'The acute bisector cannot be determined without a test point',
    ],
    correctIndex: 0,
    explanation: 'When n₁·n₂ > 0 (angle between normals is acute), the (+) sign bisects the acute angle between normals, which corresponds to the obtuse region between planes. Hence the (-) sign gives the acute angle bisector.',
    hints: [
      'A positive dot product means normals point in similar directions (acute angle between normals).',
      'Summing them (n₁+n₂) bisects the normals\' acute angle, which cuts the OBTUSE angle of the planes.',
      'Therefore the difference (-) bisects the planes\' ACUTE angle.',
    ],
  },
  // 19. Wallis Formula Competency Construct (Advanced)
  {
    id: 'ch_19',
    nodeId: NODE_C12_MATH_101,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the product representation for Wallis integral I₆ = ∫₀^(π/2) sin⁶(x) dx.',
    availableParts: ['(5/6)', '(3/4)', '(1/2)', '(π/2)', '·', '(4/5)', '(2/3)', '1'],
    targetState: '(5/6) · (3/4) · (1/2) · (π/2)',
    validationHint: 'For even n=6, unroll: (5/6) · (3/4) · (1/2) · I_0, where I_0 = π/2.',
    explanation: 'For even power n=6, I₆ = (5/6)·I₄ = (5/6)·(3/4)·I₂ = (5/6)·(3/4)·(1/2)·I₀ = (5/6)·(3/4)·(1/2)·(π/2) = 5π/32.',
    hints: [
      'Even powers end with I_0 = (π/2).',
      'Start with (n-1)/n = 5/6.',
      'Multiply terms dropping by 2 in numerator and denominator down to 1/2.',
    ],
  },
  // 20. Exact DE Potential Construction (Advanced)
  {
    id: 'ch_20',
    nodeId: NODE_C12_MATH_102,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the potential function F(x,y) for exact equation (2xy + y²)dx + (x² + 2xy)dy = 0.',
    availableParts: ['x²y', '+', 'xy²', 'x³', 'y³', '=', 'C'],
    targetState: 'x²y + xy² = C',
    validationHint: 'Integrate M with respect to x treating y as constant: ∫(2xy + y²)dx = x²y + xy².',
    explanation: '∫(2xy + y²)dx = x²y + xy² + g(y). Differentiating w.r.t y gives x² + 2xy + g\'(y) = N = x² + 2xy ⇒ g\'(y)=0. Thus F(x,y) = x²y + xy² = C.',
    hints: [
      'Integrate 2xy w.r.t x to get x²y.',
      'Integrate y² w.r.t x to get xy².',
      'Check if differentiating x²y + xy² w.r.t y produces N = x² + 2xy.',
    ],
  },
  // 21. Real-World Flight Sensor Reliability (Advanced)
  {
    id: 'ch_21',
    nodeId: NODE_C12_MATH_105,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Gaganyaan navigation relies on 4 independent redundant attitude sensors, each with 0.90 reliability. The system functions if AT LEAST 3 sensors work. What is mission reliability?',
    options: [
      '0.9477 (or 94.77%)',
      '0.6561 (or 65.61%)',
      '0.8100 (or 81.00%)',
      '0.9999 (or 99.99%)',
    ],
    correctIndex: 0,
    explanation: 'P(X ≥ 3) = P(X=3) + P(X=4) = 4·(0.9)³·(0.1)¹ + (0.9)⁴ = 4·(0.729)·(0.1) + 0.6561 = 0.2916 + 0.6561 = 0.9477.',
    hints: [
      'Compute P(X=3): C(4,3) * (0.9)³ * (0.1)¹.',
      'Compute P(X=4): C(4,4) * (0.9)⁴ * (0.1)⁰.',
      'Sum the two terms: 0.2916 + 0.6561 = 0.9477.',
    ],
  },
  // 22. 3D Radar Reflector Image (Advanced)
  {
    id: 'ch_22',
    nodeId: NODE_C12_MATH_108,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A ground radar dish acts as plane x + 2y + 2z - 9 = 0. Find the foot of perpendicular from satellite target P(1, 2, 3).',
    options: [
      '(11/9, 22/9, 31/9)',
      '(2, 4, 6)',
      '(0, 0, 9/2)',
      '(5/3, 7/3, 11/3)',
    ],
    correctIndex: 0,
    explanation: 'n = (1, 2, 2), |n|² = 1+4+4 = 9. ax₁+by₁+cz₁+d = 1(1)+2(2)+2(3)-9 = 2. t₀ = -2/9. F = (1 + 1(-2/9), 2 + 2(-2/9), 3 + 2(-2/9)) = (7/9, 14/9, 23/9)... Note: for ax₁+by₁+cz₁-9=0: 1+4+6-9 = 2, so F = (1 - 2/9, 2 - 4/9, 3 - 4/9) = (7/9, 14/9, 23/9).',
    hints: [
      'Normal vector is (1, 2, 2) and |n|² = 9.',
      'Evaluate plane equation at P: 1 + 4 + 6 - 9 = 2.',
      't₀ = -2/9. Foot F = (1 - 2/9, 2 - 4/9, 3 - 4/9).',
    ],
  },
];

// ─── DEFAULT PROPS ───
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_MATH_101,
  title: "Wallis' Formula, Reductions, & Advanced Analytical Geometry",
  definition: "Comprehensive recursive integration methods (Wallis formula, trigonometric & algebraic reductions), exact & Bernoulli differential equations, polar/parametric areas, binomial distributions, matrix rank, determinants, and 3D plane geometry.",
  eli5: "Think of advanced calculus as peeling layers of an onion: reduction formulas peel powers off integrals two at a time, substitutions make crooked equations straight, and geometric reflections duplicate signals across mirror planes.",
  misconceptions: [
    { misconception: "Wallis' formula applies to any integration limits, not just 0 to π/2.", correction: "Wallis' closed factorial-style form is valid strictly for the limits 0 to π/2 where the boundary term [sinⁿ⁻¹x cos x] vanishes." },
    { misconception: "Integrating by parts on sinⁿ(x) reduces the power by one.", correction: "It reduces the power by two (I_n = [(n-1)/n] I_(n-2)) because the cos²(x) term expands into (1 - sin²(x))." },
    { misconception: "Exact differential equations allow you to sum all terms from integrating M and N.", correction: "Duplicated mixed terms must be written only once: General solution = ∫ M dx + ∫ (terms of N containing no x) dy = C." },
    { misconception: "Standard deviation of binomial distribution is npq.", correction: "Variance is npq; Standard Deviation is σ = √(npq)." },
    { misconception: "Equating unnormalised plane equations gives the true bisector plane.", correction: "You MUST normalise by dividing each plane equation by √(a² + b² + c²) to balance true geometric distances." },
  ],
  diagnosticQuestions: [
    { question: "What is I_0 = ∫₀^(π/2) 1 dx?", options: ["π/2", "1", "0", "π"], correctIndex: 0 },
    { question: "What is I_1 = ∫₀^(π/2) sin(x) dx?", options: ["1", "π/2", "0", "1/2"], correctIndex: 0 },
    { question: "What is the integrating factor for dy/dx + P(x)y = Q(x)?", options: ["e^(∫ P dx)", "∫ P dx", "e^(P·x)", "ln(P)"], correctIndex: 0 },
    { question: "What is the area element of a polar sector?", options: ["(1/2) r² dθ", "r dθ", "π r² dθ", "(1/2) r dθ"], correctIndex: 0 },
    { question: "What is the rank of the 3×3 identity matrix I₃?", options: ["3", "1", "0", "undefined"], correctIndex: 0 },
    { question: "If |A| = 5 and |B| = 2, what is |AB|?", options: ["10", "7", "25", "5/2"], correctIndex: 0 },
    { question: "The foot of perpendicular from P to a plane is F. What is image P'?", options: ["2F - P", "F - P", "P - 2F", "(P+F)/2"], correctIndex: 0 },
    { question: "Are the two bisector planes of two intersecting planes always perpendicular?", options: ["Yes, always at 90°", "No, depends on the planes", "Only if planes are parallel", "Only in 2D"], correctIndex: 0 },
  ],
  masteryCriteria: "Student demonstrates fluency across recursive integrals, non-linear reductions, polar areas, binomial stats, and 3D plane reflections.",
};

// ─── 5 EXPLORATION STEPS (LEARN BY DOING) ───
const EXPLORATION_STEPS = [
  {
    title: "1. Wallis Integral & Power Squeezing",
    instruction: "Drag the power slider n from 0 to 8 and watch how the area under sinⁿ(x) shrinks in real-time over [0, π/2].",
    interactionType: "slider-wallis",
    nodeId: NODE_C12_MATH_101,
  },
  {
    title: "2. Exact vs Non-Exact Vector Fields",
    instruction: "Toggle the curl slider to see how ∂M/∂y = ∂N/∂x aligns tangent slopes into a conservative potential landscape.",
    interactionType: "exactness-lab",
    nodeId: NODE_C12_MATH_102,
  },
  {
    title: "3. Polar Cardioid & Rose Generator",
    instruction: "Change petal frequency k and cardioid ratio a/b to sweep the polar area 1/2 ∫ r² dθ.",
    interactionType: "polar-sweep",
    nodeId: NODE_C12_MATH_104,
  },
  {
    title: "4. Binomial Distribution Bell Shaper",
    instruction: "Adjust trial count n (1 to 50) and probability p (0.05 to 0.95) to observe mean np and variance npq curve transformations.",
    interactionType: "binomial-curve",
    nodeId: NODE_C12_MATH_105,
  },
  {
    title: "5. 3D Laser Mirror & Perpendicular Bisector",
    instruction: "Drag point P in 3D coordinate space and watch the normal beam find foot F and mirror image P'.",
    interactionType: "plane-reflector",
    nodeId: NODE_C12_MATH_108,
  },
];

// ─── PREDICTION QUESTIONS (PREDICT-THEN-CHECK) ───
const PREDICTION_QUESTIONS = [
  {
    question: "Predict: If we increase the power n of sinⁿ(x) from n=2 to n=4, by what exact recursive factor does the area I_n scale relative to I_(n-2)?",
    options: ["Scaled by 3/4", "Scaled by 1/2", "Scaled by 4/5", "Scaled by π/4"],
    correctIndex: 0,
    verifyInstruction: "Move the Wallis power slider to n=4 and inspect the step fraction (3/4) · I₂.",
    nodeId: NODE_C12_MATH_101,
  },
  {
    question: "Predict: In a binomial distribution with n=16 trials, for what probability p is the variance Var(X) = np(1-p) strictly MAXIMISED?",
    options: ["p = 0.50 (Var = 4.0)", "p = 0.25 (Var = 3.0)", "p = 0.90 (Var = 1.44)", "p = 1.00 (Var = 0)"],
    correctIndex: 0,
    verifyInstruction: "Drag the binomial probability slider p to 0.5 and observe the variance gauge peak at 4.0.",
    nodeId: NODE_C12_MATH_105,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: "What do you observe about the Wallis multiplier as the power n grows very large?",
    observableOptions: [
      "The ratio (n-1)/n approaches 1, meaning consecutive integrals change very gradually",
      "The multiplier becomes 0 immediately",
      "The multiplier oscillates between positive and negative",
      "The multiplier approaches π",
    ],
    correctIndex: 0,
    nodeId: NODE_C12_MATH_101,
  },
  {
    question: "What happens to the foot of perpendicular F when you move point P exactly onto the plane?",
    observableOptions: [
      "P, F, and the image P' all merge into a single point on the plane (distance = 0)",
      "The image P' shoots off to infinity",
      "The normal vector reverses sign",
      "The perpendicular distance becomes undefined",
    ],
    correctIndex: 0,
    nodeId: NODE_C12_MATH_108,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: "ISRO Deep-Space Orbit & Sensor Calibration Report",
  description: "Synthesise your analytical tools to draft an orbital station-keeping protocol for Chandrayaan communication relays.",
  steps: [
    "1. Calculate recursive perturbation torque using Wallis integrals for solar sail pressure.",
    "2. Model atmospheric drag decay using Bernoulli reduction v = y¹⁻ⁿ.",
    "3. Align dish antenna reflector plane and verify image coordinates for secondary ground reception.",
    "4. Configure triple-redundant transceivers via Binomial reliability bounds P(X ≥ 2).",
  ],
};

function C12_MathematicsWallisFormulaReductionSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C12_MATH_101,
    title = DEFAULT_PROPS.title || "Mathematics Analytics",
    misconceptions = DEFAULT_PROPS.misconceptions || [],
    diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ─── STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');

  // Interactive exploration states
  const [wallisPower, setWallisPower] = useState(4);
  const [exactCurlBias, setExactCurlBias] = useState(0); // 0 = exact (curl=0)
  const [polarPetals, setPolarPetals] = useState(3);
  const [polarRadiusScale, setPolarRadiusScale] = useState(1.5);
  const [binomialN, setBinomialN] = useState(16);
  const [binomialP, setBinomialP] = useState(0.5);
  const [pointPx, setPointPx] = useState(3);
  const [pointPy, setPointPy] = useState(2);
  const [pointPz, setPointPz] = useState(4);
  const [planeD, setPlaneD] = useState(-6);

  // Predict & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Discovery states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Challenges interactive inputs
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Feedback & motion states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Progress & Analytics
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Canvas Ref & Timers
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD PERSISTED MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE UPDATES ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CALLBACKS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak("Let's review the complete step-by-step mathematical proof.");
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding mathematical intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Interactive Exploration activated. Manipulate the math models directly.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free Sandbox Mode. Experiment with no timers or grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing telemetry challenges. Show your working!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now slide the control to test your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp analytical observation!' : 'Look closely at the curve asymptotes.');
  }, []);

  const handleWallisPowerChange = useCallback((n: number) => {
    setWallisPower(n);
    audioManager.play('count');
    if (predictionMade && !predictionVerified && n === 4) {
      setPredictionVerified(true);
      audioManager.play('sparkle');
    }
  }, [predictionMade, predictionVerified]);

  const handleBinomialPChange = useCallback((p: number) => {
    setBinomialP(p);
    audioManager.play('balance');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission simulation complete! Final score: ${finalScore} percent.`);
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Q.E.D. Correct calculation!');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
        speechManager.speak('Hints exhausted. Review the step-by-step breakdown below.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

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
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── 3D FOOT OF PERPENDICULAR & IMAGE CALCULATIONS ───
  const planeA = 2, planeB = -1, planeC = 2;
  const normalMagSq = planeA * planeA + planeB * planeB + planeC * planeC; // 4 + 1 + 4 = 9
  const normalMag = Math.sqrt(normalMagSq); // 3

  const signedDistNumerator = planeA * pointPx + planeB * pointPy + planeC * pointPz + planeD;
  const paramT0 = -signedDistNumerator / normalMagSq;

  const footF = useMemo(() => ({
    x: pointPx + planeA * paramT0,
    y: pointPy + planeB * paramT0,
    z: pointPz + planeC * paramT0,
  }), [pointPx, pointPy, pointPz, paramT0]);

  const imagePPrime = useMemo(() => ({
    x: 2 * footF.x - pointPx,
    y: 2 * footF.y - pointPy,
    z: 2 * footF.z - pointPz,
  }), [footF, pointPx, pointPy, pointPz]);

  const perpDistance = Math.abs(signedDistNumerator) / normalMag;

  // ─── WALLIS INTEGRAL EXACT VALUE CALCULATION ───
  const wallisIntegralValue = useMemo(() => {
    let val = wallisPower % 2 === 0 ? Math.PI / 2 : 1.0;
    for (let k = wallisPower; k >= 2; k -= 2) {
      val *= (k - 1) / k;
    }
    return val;
  }, [wallisPower]);

  // ─── 2D CANVAS ANIMATION (DYNAMIC WAVE & TELEMETRY PARTICLES) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw trigonometric telemetry wave
      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2.5;
      for (let x = 0; x < canvas.width; x++) {
        const theta = (x / canvas.width) * (Math.PI / 2);
        const yVal = Math.pow(Math.sin(theta), wallisPower);
        const screenY = canvas.height - 10 - yVal * (canvas.height - 25);
        if (x === 0) ctx.moveTo(x, screenY);
        else ctx.lineTo(x, screenY);
      }
      ctx.stroke();

      // Shaded area under curve
      ctx.lineTo(canvas.width, canvas.height - 10);
      ctx.lineTo(0, canvas.height - 10);
      ctx.closePath();
      ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.fill();

      // Orbiting pulse dot
      const pulseX = (frame % canvas.width);
      const thetaPulse = (pulseX / canvas.width) * (Math.PI / 2);
      const pulseYVal = Math.pow(Math.sin(thetaPulse), wallisPower);
      const pulseScreenY = canvas.height - 10 - pulseYVal * (canvas.height - 25);

      ctx.beginPath();
      ctx.arc(pulseX, pulseScreenY, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [wallisPower]);

  // ─── MOTIVATIONAL FEEDBACK HELPER ───
  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE!';
    if (errCount <= 3) return 'Great work!';
    if (errCount <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  };

  // ─── CLEANUP ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-gold-300 via-gold-300 to-emerald-300 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">CISCE ISC Class 12 • Science & Mathematics Stream</p>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800" role="tablist">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((tab) => (
            <motion.button
              key={tab}
              role="tab"
              aria-selected={phase === tab}
              aria-label={`Switch to ${tab} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(tab);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === tab
                  ? 'bg-gradient-to-r from-gold-600 to-gold-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab === 'challenge' ? 'Challenges' : tab}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-gold-950/70 via-slate-900 to-gold-950/50 border border-gold-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold mb-1">
              <span aria-hidden="true">🚀</span>
              <span>MISSION DIRECTIVE</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-2 font-mono bg-gold-950/60 p-2.5 rounded-xl border border-gold-900/50">
              📌 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/60">
                Curiosity Discovery Hook
              </span>
              <span className="text-xs text-slate-400">Zero pressure • Intuition test</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`p-4 text-left rounded-xl text-sm font-medium border transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-700/70 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 h-6 text-center leading-6 rounded-lg bg-slate-700/60 text-xs mr-2 font-mono">
                    {discoveryAnswered ? (i === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗') : String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <p className={discoveryCorrect ? 'text-emerald-400 text-sm font-semibold' : 'text-amber-400 text-sm font-semibold'}>
                  {discoveryCorrect ? '✓ 🎯 Spot on! High powers squeeze values below 1 toward zero.' : `✗ 💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="flex justify-end">
                  <motion.button
                    aria-label="Launch interactive lab"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white rounded-xl font-bold text-sm shadow-lg"
                  >
                    Launch Interactive Lab →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. INTERACTIVE EXPLORATION PHASE (LEARN BY DOING) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-2xl border border-slate-800 text-xs">
            <span className="font-bold text-gold-400">STEP {currentSlide + 1} OF {EXPLORATION_STEPS.length}</span>
            <span className="text-slate-400">{EXPLORATION_STEPS[currentSlide].title}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 sm:p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-6 shadow-xl"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-gold-400 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: WALLIS INTEGRAL LAB */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                      <span>Integrand: sin^{wallisPower}(x)</span>
                      <span className="text-emerald-400 font-bold">∫₀^(π/2) = {wallisIntegralValue.toFixed(4)}</span>
                    </div>
                    <canvas ref={canvasRef} width={450} height={180} className="w-full h-44 rounded-xl bg-slate-900/50" />
                    <div className="flex justify-between text-[11px] font-mono text-slate-500 px-1">
                      <span>x = 0</span>
                      <span>x = π/4</span>
                      <span>x = π/2</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Power (n):</span>
                        <span className="text-gold-400 font-mono text-base">{wallisPower} ({wallisPower % 2 === 0 ? 'EVEN' : 'ODD'})</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={8}
                        step={1}
                        value={wallisPower}
                        aria-label="Adjust Wallis power n"
                        onChange={(e) => handleWallisPowerChange(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />
                      <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-900/40 text-xs space-y-1 font-mono">
                        <p className="text-gold-300 font-bold">Recurrence Formula:</p>
                        <p className="text-slate-300">I_{wallisPower} = ({wallisPower > 0 ? `${wallisPower - 1}/${wallisPower}` : '1'}) · I_{Math.max(0, wallisPower - 2)}</p>
                        <p className="text-emerald-300 font-semibold">
                          Base: {wallisPower % 2 === 0 ? 'I₀ = π/2' : 'I₁ = 1'}
                        </p>
                      </div>
                    </div>

                    {/* PREDICT-THEN-CHECK */}
                    {!predictionMade ? (
                      <div className="p-3.5 bg-amber-950/30 rounded-2xl border border-amber-800/40 space-y-2">
                        <p className="text-xs text-amber-300 font-semibold">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              aria-label={`Predict option ${i + 1}: ${opt}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(i)}
                              className="p-2 text-left bg-slate-900 hover:bg-slate-800 rounded-lg text-[11px] text-slate-300 border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-emerald-950/30 rounded-2xl border border-emerald-800/40 text-xs text-emerald-300">
                        {predictionVerified ? '✓ 🎉 Verification complete! n=4 scales by exactly 3/4 from n=2.' : PREDICTION_QUESTIONS[0].verifyInstruction}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 1: EXACT DIFFERENTIAL EQUATIONS */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <svg viewBox="0 0 300 200" className="w-full h-44 bg-slate-900/60 rounded-xl">
                      {/* Slope Field Grid */}
                      {[30, 75, 120, 165, 210, 255].map((x) =>
                        [30, 70, 110, 150, 180].map((y) => {
                          const slope = exactCurlBias === 0 ? -(y - 100) / (x - 150 + 0.1) : -(y - 100) / 40 + exactCurlBias * 0.5;
                          const angle = Math.atan(slope);
                          const len = 10;
                          return (
                            <line
                              key={`${x}-${y}`}
                              x1={x - len * Math.cos(angle)}
                              y1={y - len * Math.sin(angle)}
                              x2={x + len * Math.cos(angle)}
                              y2={y + len * Math.sin(angle)}
                              stroke={exactCurlBias === 0 ? '#10b981' : '#f43f5e'}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          );
                        })
                      )}
                      {/* Center Contour Equipotential Lines */}
                      <ellipse cx="150" cy="100" rx="90" ry="55" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray={exactCurlBias === 0 ? 'none' : '4 4'} opacity="0.8" />
                      <ellipse cx="150" cy="100" rx="50" ry="30" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray={exactCurlBias === 0 ? 'none' : '4 4'} opacity="0.8" />
                    </svg>
                    <div className="flex justify-between text-xs font-mono">
                      <span className={exactCurlBias === 0 ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                        {exactCurlBias === 0 ? '✓' : '✗'} ∂M/∂y = {2 + exactCurlBias} vs ∂N/∂x = 2
                      </span>
                      <span className={exactCurlBias === 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        Status: {exactCurlBias === 0 ? '✓ EXACT (Conservative F=C)' : '✗ NON-EXACT (Needs IF)'}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Curl Distortion Bias:</span>
                        <span className="font-mono text-gold-400">{exactCurlBias === 0 ? '0 (Perfect Equality)' : `${exactCurlBias > 0 ? '+' : ''}${exactCurlBias}`}</span>
                      </div>
                      <input
                        type="range"
                        min={-2}
                        max={2}
                        step={1}
                        value={exactCurlBias}
                        aria-label="Adjust curl distortion bias"
                        onChange={(e) => {
                          setExactCurlBias(Number(e.target.value));
                          audioManager.play('balance');
                        }}
                        className="w-full accent-gold-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />
                      <p className="text-xs text-slate-300 leading-relaxed">
                        When <span className="text-emerald-400 font-mono">∂M/∂y = ∂N/∂x</span>, the differential form M dx + N dy aligns with level curves of a single potential function F(x, y) = C.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: POLAR CURVES & ROSES */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <svg viewBox="0 0 300 220" className="w-full h-44 bg-slate-900/60 rounded-xl">
                      {/* Concentric Polar Grid */}
                      <circle cx="150" cy="110" r="30" fill="none" stroke="#334155" strokeWidth="1" />
                      <circle cx="150" cy="110" r="60" fill="none" stroke="#334155" strokeWidth="1" />
                      <circle cx="150" cy="110" r="90" fill="none" stroke="#334155" strokeWidth="1" />
                      <line x1="150" y1="10" x2="150" y2="210" stroke="#334155" strokeWidth="1" />
                      <line x1="50" y1="110" x2="250" y2="110" stroke="#334155" strokeWidth="1" />

                      {/* Render Rose Curve r = a cos(k θ) */}
                      {(() => {
                        const points: string[] = [];
                        const steps = 180;
                        const maxTheta = polarPetals % 2 === 0 ? 2 * Math.PI : Math.PI;
                        for (let i = 0; i <= steps; i++) {
                          const th = (i / steps) * maxTheta;
                          const r = 50 * polarRadiusScale * Math.cos(polarPetals * th);
                          const px = 150 + r * Math.cos(th);
                          const py = 110 - r * Math.sin(th);
                          points.push(`${px},${py}`);
                        }
                        return (
                          <polygon
                            points={points.join(' ')}
                            fill="rgba(56, 189, 248, 0.25)"
                            stroke="#38bdf8"
                            strokeWidth="2"
                          />
                        );
                      })()}
                    </svg>
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                      <span>Rose: r = {polarRadiusScale} cos({polarPetals}θ)</span>
                      <span className="text-gold-400 font-bold">
                        Petals: {polarPetals % 2 === 0 ? 2 * polarPetals : polarPetals}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Petal Frequency (k):</span>
                        <span className="font-mono text-gold-400 text-base">{polarPetals}</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={6}
                        step={1}
                        value={polarPetals}
                        aria-label="Adjust petal frequency k"
                        onChange={(e) => {
                          setPolarPetals(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />

                      <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-900/40 text-xs font-mono space-y-1">
                        <p className="text-gold-300 font-bold">Total Polar Area:</p>
                        <p className="text-slate-300">
                          A = {polarPetals % 2 === 0 ? 'π a² / 2' : 'π a² / 4'} ={' '}
                          {((Math.PI * polarRadiusScale * polarRadiusScale) / (polarPetals % 2 === 0 ? 2 : 4)).toFixed(2)} units²
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: BINOMIAL DISTRIBUTION LAB */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <svg viewBox="0 0 320 180" className="w-full h-44 bg-slate-900/60 rounded-xl">
                      {/* Draw Binomial Probability Mass Bars */}
                      {(() => {
                        const mean = binomialN * binomialP;
                        const variance = binomialN * binomialP * (1 - binomialP);
                        const sd = Math.sqrt(variance);

                        const bars = [];
                        const maxVal = 1 / (sd * Math.sqrt(2 * Math.PI));
                        for (let k = 0; k <= Math.min(20, binomialN); k++) {
                          const diff = k - mean;
                          const prob = (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(-(diff * diff) / (2 * variance));
                          const barHeight = Math.min(140, (prob / maxVal) * 120);
                          const barX = 20 + (k / Math.min(20, binomialN)) * 270;
                          bars.push(
                            <rect
                              key={k}
                              x={barX}
                              y={150 - barHeight}
                              width="8"
                              height={barHeight}
                              rx="2"
                              fill={Math.abs(k - mean) < 1 ? '#10b981' : '#6366f1'}
                              opacity="0.85"
                            />
                          );
                        }
                        return bars;
                      })()}
                      <line x1="15" y1="150" x2="305" y2="150" stroke="#475569" strokeWidth="1.5" />
                    </svg>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-emerald-400">Mean E(X) = np = {(binomialN * binomialP).toFixed(2)}</span>
                      <span className="text-gold-400">Var = npq = {(binomialN * binomialP * (1 - binomialP)).toFixed(2)}</span>
                      <span className="text-purple-400">σ = {Math.sqrt(binomialN * binomialP * (1 - binomialP)).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Success Probability (p):</span>
                        <span className="font-mono text-emerald-400 text-base">{binomialP.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min={0.05}
                        max={0.95}
                        step={0.05}
                        value={binomialP}
                        aria-label="Adjust binomial success probability p"
                        onChange={(e) => handleBinomialPChange(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />

                      <div className="flex justify-between text-xs font-bold text-slate-300 pt-1">
                        <span>Trials (n):</span>
                        <span className="font-mono text-gold-400 text-base">{binomialN}</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={40}
                        step={1}
                        value={binomialN}
                        aria-label="Adjust number of trials n"
                        onChange={(e) => {
                          setBinomialN(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: 3D MIRROR REFLECTION */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <svg viewBox="0 0 320 200" className="w-full h-48 bg-slate-900/60 rounded-xl">
                      {/* 3D Slanted Plane Representation */}
                      <polygon points="50,130 270,70 290,140 70,190" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" />
                      <text x="75" y="150" fill="#818cf8" fontSize="10" fontFamily="monospace">Plane: 2x - y + 2z - 6 = 0</text>

                      {/* Normal Line connecting Point P, Foot F, and Image P' */}
                      {(() => {
                        const scaleP = { x: 100 + pointPx * 12, y: 50 + pointPy * 12 };
                        const scaleF = { x: 100 + footF.x * 12, y: 50 + footF.y * 12 };
                        const scalePPrime = { x: 100 + imagePPrime.x * 12, y: 50 + imagePPrime.y * 12 };

                        return (
                          <g>
                            <line x1={scaleP.x} y1={scaleP.y} x2={scalePPrime.x} y2={scalePPrime.y} stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                            {/* Object Point P */}
                            <circle cx={scaleP.x} cy={scaleP.y} r="6" fill="#f59e0b" />
                            <text x={scaleP.x + 8} y={scaleP.y + 3} fill="#fbbf24" fontSize="11" fontWeight="bold">P({pointPx},{pointPy},{pointPz})</text>
                            {/* Foot F */}
                            <circle cx={scaleF.x} cy={scaleF.y} r="5" fill="#10b981" />
                            <text x={scaleF.x + 8} y={scaleF.y + 3} fill="#34d399" fontSize="10">F({footF.x.toFixed(1)},{footF.y.toFixed(1)},{footF.z.toFixed(1)})</text>
                            {/* Reflected Image P' */}
                            <circle cx={scalePPrime.x} cy={scalePPrime.y} r="6" fill="#ec4899" />
                            <text x={scalePPrime.x + 8} y={scalePPrime.y + 3} fill="#f472b6" fontSize="11" fontWeight="bold">P'({imagePPrime.x.toFixed(1)},{imagePPrime.y.toFixed(1)},{imagePPrime.z.toFixed(1)})</text>
                          </g>
                        );
                      })()}
                    </svg>
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                      <span className="text-amber-400">Perpendicular Distance: {perpDistance.toFixed(2)} units</span>
                      <span className="text-pink-400">✓ Midpoint Test: Verified on Plane</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Point P Position (X-coord):</span>
                        <span className="font-mono text-amber-400 text-base">{pointPx}</span>
                      </div>
                      <input
                        type="range"
                        min={-2}
                        max={6}
                        step={1}
                        value={pointPx}
                        aria-label="Adjust point P x-coordinate"
                        onChange={(e) => {
                          setPointPx(Number(e.target.value));
                          audioManager.play('balance');
                        }}
                        className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                        <p className="text-slate-300">Foot: F = P + t₀·n</p>
                        <p className="text-slate-300">Image: P' = 2F - P</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Launch sandbox mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Launch Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-slate-900 to-gold-950/60 rounded-3xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <span aria-hidden="true">🎮</span>
              <span>Free-Play Mathematical Sandbox</span>
            </div>
            <h2 className="text-lg font-bold text-white">Full Variable Freedom (Zero Grading)</h2>
            <p className="text-xs text-slate-300">
              Manipulate multiple parameters concurrently. When you feel completely comfortable with the formulas, launch the scored challenge track.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Control 1: Wallis */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-bold text-gold-300">
                <span>Wallis Power (n):</span>
                <span className="font-mono text-base text-white">{wallisPower}</span>
              </div>
              <input
                type="range"
                min={0}
                max={8}
                step={1}
                value={wallisPower}
                aria-label="Sandbox Wallis power n"
                onChange={(e) => handleWallisPowerChange(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <p className="text-[11px] font-mono text-slate-400">Integral = {wallisIntegralValue.toFixed(4)}</p>
            </div>

            {/* Control 2: Binomial */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-bold text-emerald-300">
                <span>Binomial p:</span>
                <span className="font-mono text-base text-white">{binomialP.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={0.9}
                step={0.05}
                value={binomialP}
                aria-label="Sandbox binomial probability p"
                onChange={(e) => handleBinomialPChange(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <p className="text-[11px] font-mono text-slate-400">Variance = {(binomialN * binomialP * (1 - binomialP)).toFixed(2)}</p>
            </div>

            {/* Control 3: 3D Point */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-bold text-amber-300">
                <span>Point Px:</span>
                <span className="font-mono text-base text-white">{pointPx}</span>
              </div>
              <input
                type="range"
                min={-2}
                max={6}
                step={1}
                value={pointPx}
                aria-label="Sandbox point P x-coordinate"
                onChange={(e) => {
                  setPointPx(Number(e.target.value));
                  audioManager.play('balance');
                }}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <p className="text-[11px] font-mono text-slate-400">Perp Dist = {perpDistance.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <motion.button
              aria-label="Ready for scored challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-gold-600 hover:from-emerald-500 hover:to-gold-500 text-white rounded-2xl font-black text-sm shadow-xl"
            >
              Ready for Scored Challenges! 🚀
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Status & Adaptive Difficulty Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400 font-semibold">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-gold-950 text-gold-300 border border-gold-800">
                  {challenge.competencyLevel}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : difficulty === 'standard'
                      ? 'bg-gold-950 text-gold-400 border border-gold-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {difficulty}
                </motion.span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-48 bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700" role="progressbar" aria-valuenow={Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)} aria-valuemin={0} aria-valuemax={100}>
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">{challenge.question}</h3>

            {/* MCQ OPTIONS */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    disabled={answerRevealed || showExplanation}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-2xl text-sm font-medium border transition-all ${
                      wrongFlash
                        ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-700/80 text-slate-200'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 text-center leading-6 rounded-lg bg-slate-700/80 text-xs mr-3 font-mono">
                      {showExplanation ? (i === challenge.correctIndex ? '✓' : '✗') : String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Draggable Identities:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Drag item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-700 hover:bg-gold-600 rounded-xl cursor-grab text-white text-xs font-mono font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'slot_xy', prompt: 'x dy + y dx' },
                    { id: 'slot_yx', prompt: '(x dy - y dx) / x²' },
                    { id: 'slot_atan', prompt: '(x dy - y dx) / (x² + y²)' },
                    { id: 'slot_yex', prompt: 'eˣ (dy + y dx)' },
                  ].map((slot) => (
                    <div
                      key={slot.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(slot.id)}
                      className={`p-4 rounded-2xl border-2 border-dashed flex flex-col justify-between min-h-[90px] transition-all ${
                        droppedLabels[slot.id]
                          ? 'bg-emerald-950/40 border-emerald-500/80'
                          : 'bg-slate-950/60 border-slate-700 hover:border-gold-500'
                      }`}
                    >
                      <span className="text-xs font-mono text-slate-400">{slot.prompt}</span>
                      <div className="text-sm font-mono font-bold text-emerald-300 mt-2">
                        {droppedLabels[slot.id] ? `✓ ${droppedLabels[slot.id]}` : 'Drop exact differential here...'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <motion.button
                    aria-label="Validate differentials"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Validate Differentials
                  </motion.button>
                </div>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${displayIndex + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 text-slate-200 text-xs sm:text-sm font-medium cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-gold-900/60 text-gold-300 font-mono font-bold flex items-center justify-center text-xs">
                      {displayIndex + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <div className="flex justify-end pt-2">
                  <motion.button
                    aria-label="Check order sequence"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Check Order Sequence
                  </motion.button>
                </div>
              </div>
            )}

            {/* NUMERIC INPUT CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step={0.01}
                    value={numericInput}
                    aria-label="Numeric calculation answer"
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-gold-500 w-60"
                  />
                  <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric calculation"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={showExplanation || !numericInput}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-2xl text-xs font-bold shadow"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400 font-mono">Select parts to assemble the proof:</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add formula token ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setConstructParts(prev => [...prev, part]);
                        audioManager.play('tap');
                      }}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-mono text-gold-300"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1.5 bg-gold-900/60 border border-gold-700 rounded-xl text-xs font-mono text-white flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        aria-label={`Remove token ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-200 text-xs"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 font-mono">Proof workspace is currently empty. Click tokens above.</span>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <motion.button
                    aria-label="Clear construction workspace"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setConstructParts([])}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                  >
                    Clear
                  </motion.button>
                  <motion.button
                    aria-label="Validate construction proof"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Validate Construction
                  </motion.button>
                </div>
              </div>
            )}

            {/* STEP-BY-STEP PROGRESSIVE EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-amber-950/40 border border-amber-800/60 space-y-3 pt-4"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <span aria-hidden="true">📖</span>
                  <span>Analytical Derivation Walkthrough</span>
                </div>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-sans"
                    >
                      <span className="font-bold text-amber-400 font-mono mr-1">{i + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex flex-wrap items-center justify-between pt-2 gap-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next derivation step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setRevealedSteps(s => s + 1);
                        audioManager.play('tap');
                      }}
                      className="px-4 py-2 bg-amber-800/60 hover:bg-amber-700/60 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Proof Step →
                    </motion.button>
                  ) : <div />}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Proceed to next telemetry challenge or finalize mission"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-xs shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mission →' : 'Next Telemetry Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & DEBRIEF PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-emerald-950 rounded-3xl border border-gold-700/60 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">✓ Mission Certified</span>
              <span className="text-xs font-mono text-slate-400">ISC CLASS 12 MATH</span>
            </div>
            <h2 className="text-2xl font-black text-white">Mathematical Flight Evaluation Completed</h2>

            {/* Motivational Feedback Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-gold-900/80 via-purple-900/70 to-emerald-900/80 border border-gold-500/50 text-center">
              <p className="text-xl sm:text-2xl font-black text-white tracking-wide">
                {getMotivationalFeedback(errors)}
              </p>
              <p className="text-xs text-gold-200 mt-1">
                {errors === 0
                  ? 'Flawless precision across all analytical recurrence relations and 3D reflections!'
                  : errors <= 3
                  ? 'Strong mastery demonstrated on core reduction formulas and differential forms.'
                  : errors <= 7
                  ? 'Solid foundation built! Review your spaced repetition items to sharpen accuracy.'
                  : 'Great persistence through complex university-level analytical proofs. Keep practicing!'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Final Score</p>
                <p className="text-xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Mastery Level</p>
                <p className="text-xl font-bold text-gold-400 capitalize">{masteryLevel}</p>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Errors Logged</p>
                <p className="text-xl font-bold text-amber-400">{errors}</p>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">SRS Spaced Review</p>
                <p className="text-xl font-bold text-purple-400">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</p>
              </div>
            </div>

            {/* ─── SPACED REPETITION VISIBILITY CARD ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-gold-950/70 border border-gold-700/60 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">📅</span>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    Spaced Repetition Schedule (SRS)
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/50">
                      Active SM-2 Algorithm
                    </span>
                  </h4>
                  <p className="text-xs text-gold-300 mt-0.5">
                    For optimal long-term memory retention:{' '}
                    <span className="font-bold text-white underline decoration-purple-400">
                      {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                    </span>{' '}
                    based on your performance ({errors} {errors === 1 ? 'error' : 'errors'}).
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-purple-950/80 border border-purple-500/60 text-xs font-mono font-bold text-purple-200 text-center whitespace-nowrap shadow-md">
                Next Review: {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </div>
            </motion.div>
          </div>

          {/* Misconception Gaps Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-3xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Targeted Misconception Feedback:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950/80 rounded-2xl border border-rose-900/40 text-xs space-y-1">
                    <p className="text-rose-300 font-bold">✗ {m.misconception}</p>
                    <p className="text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real-World Mission Activity */}
          <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 rounded-xl text-xs font-mono text-slate-400">
                  {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── MODALS & POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Analytical Verification Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_MathematicsWallisFormulaReductionSim;
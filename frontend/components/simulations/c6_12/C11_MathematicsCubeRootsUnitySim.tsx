'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC MATHEMATICS NODE IDS ───
const NODE_C11_MATH_041 = 'c11_math_041'; // Cube roots of unity and their properties
const NODE_C11_MATH_043 = 'c11_math_043'; // Solving quadratic equations using the formula
const NODE_C11_MATH_044 = 'c11_math_044'; // Equations reducible to quadratic form
const NODE_C11_MATH_045 = 'c11_math_045'; // Nature of roots - sum and product, types of roots
const NODE_C11_MATH_046 = 'c11_math_046'; // Framing quadratic equations with given roots
const NODE_C11_MATH_047 = 'c11_math_047'; // Quadratic equations with common roots
const NODE_C11_MATH_048 = 'c11_math_048'; // Sign of quadratic expression
const NODE_C11_MATH_049 = 'c11_math_049'; // Graph of quadratic function, maximum/minimum value
const NODE_C11_MATH_050 = 'c11_math_050'; // Linear and quadratic inequalities
const NODE_C11_MATH_051 = 'c11_math_051'; // Inequalities involving rational expressions

const ALL_NODE_IDS = [
  NODE_C11_MATH_041,
  NODE_C11_MATH_043,
  NODE_C11_MATH_044,
  NODE_C11_MATH_045,
  NODE_C11_MATH_046,
  NODE_C11_MATH_047,
  NODE_C11_MATH_048,
  NODE_C11_MATH_049,
  NODE_C11_MATH_050,
  NODE_C11_MATH_051,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Trajectory & Harmony Lab',
  intro: 'You are a flight-dynamics mathematician at ISRO Bengaluru designing orbit stabilization pulses. Satellite resonance depends on the symmetric roots of unity on the complex plane, while thruster parabolic trajectories and fuel-flow safety bands are governed by quadratic curves and rational inequalities.',
  context: 'Navigate the full continuum: from the three equilateral keys on the Argand plane (1, ω, ω²) to parabolic vertices, common-root orbital crossings, and sign intervals for safe thruster activation.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If you take the three numbers whose cube equals 1 (that is, x³ = 1) and plot them on the complex Argand plane, what geometric shape do their vertices form?',
  options: [
    'A straight collinear line along the real axis',
    'A perfect equilateral triangle inscribed in the unit circle',
    'A right-angled isosceles triangle at (0,0)',
    'Three random unconnected points in the complex plane',
  ],
  correctIndex: 1,
  hintAfter: 'Let us see why! The three roots sit at 0°, 120°, and 240° on the unit circle, perfectly balancing each other out to a vector sum of zero.',
};

// ──��� CHALLENGE INTERFACE ───
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

// ─── 22 CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // Foundation 1: Cube roots of unity sum property (recall)
  {
    id: 'ch_01_cube_sum',
    nodeId: NODE_C11_MATH_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'If ω is a non-real complex cube root of unity, what is the exact algebraic value of the sum 1 + ω + ω²?',
    options: ['3', '1', '0', '-1'],
    correctIndex: 2,
    explanation: 'The sum of all three cube roots of unity is 1 + ω + ω² = 0. This follows from Vieta’s formulas on x³ - 1 = (x - 1)(x² + x + 1) = 0 where the x² coefficient is zero.',
    hints: [
      'Factorise x³ - 1 = (x - 1)(x² + x + 1) = 0.',
      'The non-real roots ω and ω² satisfy the quadratic equation x² + x + 1 = 0.',
      'Substitute x = ω into x² + x + 1 to get ω² + ω + 1 = 0.',
    ],
    misconceptionIndex: 0,
  },
  // Foundation 2: Power reduction modulo 3 (understanding)
  {
    id: 'ch_02_cube_power',
    nodeId: NODE_C11_MATH_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Using the cyclic property ω³ = 1, simplify ω²⁰ + ω²¹.',
    options: ['ω', '-ω', 'ω²', '-1'],
    correctIndex: 1,
    explanation: '20 = 3(6) + 2 so ω²⁰ = ω². 21 = 3(7) + 0 so ω²¹ = 1. Therefore ω²⁰ + ω²¹ = ω² + 1. Since 1 + ω + ω² = 0, we get ω² + 1 = -ω.',
    hints: [
      'Divide the exponents by 3 and keep the remainder: 20 mod 3 and 21 mod 3.',
      'ω²⁰ = ω² and ω²¹ = 1, so the expression is ω² + 1.',
      'Use the fundamental sum identity 1 + ω + ω² = 0 to replace 1 + ω² with -ω.',
    ],
    misconceptionIndex: 2,
  },
  // Foundation 3: Discriminant classification (recall)
  {
    id: 'ch_03_quad_disc',
    nodeId: NODE_C11_MATH_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For a quadratic equation ax² + bx + c = 0 with real coefficients, what type of roots occur when the discriminant D = b² - 4ac < 0?',
    options: [
      'Two distinct rational roots',
      'One repeated real root of multiplicity 2',
      'Two complex conjugate roots p ± qi (q ≠ 0)',
      'No roots exist in any number system',
    ],
    correctIndex: 2,
    explanation: 'When D < 0, √D = i√|D|. The quadratic formula delivers two complex conjugate roots: x = -b/(2a) ± i√|D|/(2a). By the Fundamental Theorem of Algebra, every degree-2 polynomial has exactly 2 roots.',
    hints: [
      'Recall that the square root of a negative real number involves the imaginary unit i = √(-1).',
      'The quadratic formula gives x = (-b ± √D)/(2a).',
      'When D is negative, the ± yields a pair of complex conjugates p + qi and p - qi.',
    ],
    misconceptionIndex: 3,
  },
  // Foundation 4: Drag label root properties (understanding)
  {
    id: 'ch_04_drag_nature',
    nodeId: NODE_C11_MATH_045,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each discriminant condition with the corresponding geometric nature of the quadratic graph y = ax² + bx + c.',
    dragItems: [
      { label: 'Cuts x-axis at 2 points', targetId: 'slot_d_pos' },
      { label: 'Touches x-axis at vertex', targetId: 'slot_d_zero' },
      { label: 'Never crosses x-axis', targetId: 'slot_d_neg' },
    ],
    correctMapping: {
      slot_d_pos: 'Cuts x-axis at 2 points',
      slot_d_zero: 'Touches x-axis at vertex',
      slot_d_neg: 'Never crosses x-axis',
    },
    explanation: 'D > 0 produces two real x-intercepts. D = 0 places the vertex directly on the x-axis (one touch point). D < 0 keeps the entire parabola above or below the x-axis with zero real x-intercepts.',
    hints: [
      'Real roots correspond directly to points where the parabola crosses the horizontal x-axis (y = 0).',
      'D = 0 means a single repeated root, so the parabola touches without crossing.',
      'D < 0 means no real solutions, so no real intersections occur.',
    ],
  },
  // Foundation 5: Vieta sum and product (recall)
  {
    id: 'ch_05_vieta_direct',
    nodeId: NODE_C11_MATH_045,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For the quadratic equation 3x² - 12x + 7 = 0, what are the sum (S) and product (P) of the roots α and β?',
    options: ['S = -4, P = 7/3', 'S = 4, P = 7/3', 'S = 12, P = 7', 'S = -12, P = -7/3'],
    correctIndex: 1,
    explanation: 'By Vieta’s relations, S = α + β = -b/a = -(-12)/3 = +4, and P = αβ = c/a = 7/3. Note the mandatory negative sign in -b/a.',
    hints: [
      'Vieta’s sum formula is S = -b/a. Watch out for the double negative!',
      'Vieta’s product formula is P = c/a.',
      'Substitute a = 3, b = -12, c = 7: S = -(-12)/3 = 4, P = 7/3.',
    ],
    misconceptionIndex: 4,
  },
  // Foundation 6: Framing monic quadratic (application)
  {
    id: 'ch_06_frame_basic',
    nodeId: NODE_C11_MATH_046,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Construct the monic quadratic equation whose roots are α = 5 and β = -3.',
    options: ['x² + 2x - 15 = 0', 'x² - 2x - 15 = 0', 'x² - 8x + 15 = 0', 'x² + 2x + 15 = 0'],
    correctIndex: 1,
    explanation: 'Sum S = 5 + (-3) = 2. Product P = 5 × (-3) = -15. The monic equation is x² - Sx + P = 0, giving x² - 2x - 15 = 0.',
    hints: [
      'Calculate the sum S = α + β and product P = αβ.',
      'The formula for framing is x² - (sum)x + (product) = 0.',
      'S = 2 so the linear term is -2x. P = -15 so the constant term is -15.',
    ],
  },
  // Foundation 7: Linear inequality sign flip (application)
  {
    id: 'ch_07_ineq_linear',
    nodeId: NODE_C11_MATH_050,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Solve the linear inequality 5 - 3x ≤ 17 over the set of real numbers.',
    options: ['x ≤ -4', 'x ≥ -4', 'x ≥ 4', 'x ≤ 4'],
    correctIndex: 1,
    explanation: 'Subtract 5: -3x ≤ 12. Divide by -3 and reverse the inequality sign: x ≥ 12 / (-3) = -4. The solution set is [-4, ∞).',
    hints: [
      'First isolate the variable term: subtract 5 from both sides.',
      'When dividing or multiplying both sides of an inequality by a negative number, you MUST reverse the inequality direction.',
      '-3x ≤ 12 becomes x ≥ -4.',
    ],
    misconceptionIndex: 5,
  },
  // Standard 8: Cube roots identity evaluation (analysis)
  {
    id: 'ch_08_cube_identity',
    nodeId: NODE_C11_MATH_041,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Evaluate the algebraic value of (1 - ω + ω²) · (1 + ω - ω²).',
    options: ['1', '2', '4', '0'],
    correctIndex: 2,
    explanation: 'From 1 + ω + ω² = 0, we have 1 + ω² = -ω and 1 + ω = -ω². The first factor becomes (-ω - ω) = -2ω. The second factor becomes (-ω² - ω²) = -2ω². Their product is (-2ω)(-2ω²) = 4ω³ = 4(1) = 4.',
    hints: [
      'Use 1 + ω + ω² = 0 to substitute for (1 + ω²) and (1 + ω).',
      '1 + ω² = -ω, so the first bracket is -2ω.',
      '1 + ω = -ω², so the second bracket is -2ω². Now multiply (-2ω)(-2ω²).',
    ],
  },
  // Standard 9: Biquadratic substitution (application)
  {
    id: 'ch_09_biquadratic',
    nodeId: NODE_C11_MATH_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Solve the biquadratic equation x⁴ - 13x² + 36 = 0 for all real values of x.',
    options: ['x = ±2, ±3', 'x = 4, 9', 'x = ±4, ±9', 'x = ±√2, ±√3'],
    correctIndex: 0,
    explanation: 'Let y = x². The equation transforms into y² - 13y + 36 = 0 => (y - 4)(y - 9) = 0, so y = 4 or y = 9. Back-substituting: x² = 4 => x = ±2; x² = 9 => x = ±3. All 4 roots are real.',
    hints: [
      'Substitute y = x² to turn the degree-4 equation into a standard quadratic in y.',
      'Factorise y² - 13y + 36 = 0 to find the values of y.',
      'Remember that y = x², so x = ±√y for each positive y.',
    ],
    misconceptionIndex: 6,
  },
  // Standard 10: Reciprocal roots condition (analysis)
  {
    id: 'ch_10_reciprocal_cond',
    nodeId: NODE_C11_MATH_045,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the necessary and sufficient condition on the coefficients of ax² + bx + c = 0 for its roots to be reciprocals of each other (α = 1/β)?',
    options: ['b = 0', 'b² - 4ac = 0', 'c = a', 'c = -a'],
    correctIndex: 2,
    explanation: 'Reciprocal roots mean αβ = 1. By Vieta’s relation, αβ = c/a. Setting c/a = 1 immediately gives c = a. The equation has the symmetric form ax² + bx + a = 0.',
    hints: [
      'If α and β are reciprocals, what is their product α · β?',
      'Vieta’s relation states αβ = c/a.',
      'Equate c/a = 1 to find the relationship between c and a.',
    ],
  },
  // Standard 11: Drag sort common root elimination (analysis)
  {
    id: 'ch_11_sort_common_root',
    nodeId: NODE_C11_MATH_047,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the logical steps to derive the cross-multiplication condition for two quadratics ax² + bx + c = 0 and a\'x² + b\'x + c\' = 0 to share a common root α.',
    sortItems: [
      'Substitute common root α into both equations: aα² + bα + c = 0 and a\'α² + b\'α + c\' = 0',
      'Apply cross-multiplication: α²/(bc\' - b\'c) = α/(ca\' - c\'a) = 1/(ab\' - a\'b)',
      'Express α and α² as ratios with denominator (ab\' - a\'b)',
      'Equate (α)² = α² to obtain (bc\' - b\'c)(ab\' - a\'b) = (ca\' - c\'a)²',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'We first write the simultaneous linear system in α² and α, apply cross-multiplication, isolate the ratios, and finally eliminate α by setting (α)² = α².',
    hints: [
      'Start by setting x = α in both equations.',
      'Treat α² and α as two independent variables in a 2x2 linear system.',
      'The final step must yield the condition relating the three cross-terms squared.',
    ],
  },
  // Standard 12: Parabola vertex & extremum (application)
  {
    id: 'ch_12_parabola_vertex',
    nodeId: NODE_C11_MATH_049,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For the quadratic function f(x) = 2x² - 8x + 11, calculate its absolute minimum value.',
    correctAnswer: 3,
    tolerance: 0.01,
    unit: '',
    explanation: 'a = 2 > 0 so f has a minimum at vertex x = -b/(2a) = -(-8)/(2 × 2) = 2. The minimum value is f(2) = 2(2)² - 8(2) + 11 = 8 - 16 + 11 = 3.',
    hints: [
      'Find the x-coordinate of the vertex using x = -b/(2a).',
      'x_v = 8 / 4 = 2.',
      'Substitute x = 2 into f(x): f(2) = 2(4) - 16 + 11.',
    ],
  },
  // Standard 13: Sign of quadratic with D < 0 (analysis)
  {
    id: 'ch_13_quad_sign',
    nodeId: NODE_C11_MATH_048,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the sign of the quadratic expression Q(x) = -2x² + 4x - 5 for all real values of x?',
    options: [
      'Always strictly positive (> 0)',
      'Always strictly negative (< 0)',
      'Positive between x = 1 and x = 2, negative elsewhere',
      'Changes sign at x = 0',
    ],
    correctIndex: 1,
    explanation: 'Discriminant D = b² - 4ac = 16 - 4(-2)(-5) = 16 - 40 = -24 < 0. Since D < 0, the expression never crosses zero. Since leading coefficient a = -2 < 0, Q(x) is strictly negative for all real x.',
    hints: [
      'Compute the discriminant D = b² - 4ac.',
      'D = 16 - 40 = -24, which is strictly negative.',
      'When D < 0, the quadratic retains the sign of its leading coefficient a for all real x.',
    ],
    misconceptionIndex: 1,
  },
  // Standard 14: Rational inequality with excluded denominator (application)
  {
    id: 'ch_14_rational_ineq',
    nodeId: NODE_C11_MATH_051,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Solve the rational inequality (x - 3) / (x + 2) ≤ 0 over real numbers.',
    options: ['[-2, 3]', '(-2, 3]', '(-2, 3)', '(-∞, -2) ∪ [3, ∞)'],
    correctIndex: 1,
    explanation: 'Critical points are x = 3 (numerator zero, included as \'[\') and x = -2 (denominator zero, ALWAYS excluded as \'(\'). On (-2, 3], numerator and denominator have opposite signs, so the quotient is ≤ 0. Solution: (-2, 3].',
    hints: [
      'Identify the critical points: numerator is zero at x = 3, denominator is zero at x = -2.',
      'Division by zero is undefined, so x = -2 can NEVER be included in the solution set.',
      'Test the intervals: (-∞, -2), (-2, 3), and (3, ∞). The expression is negative between -2 and 3.',
    ],
    misconceptionIndex: 7,
  },
  // Standard 15: Transformed roots α² and β² (application)
  {
    id: 'ch_15_frame_squares',
    nodeId: NODE_C11_MATH_046,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If α and β are the roots of x² - 4x + 2 = 0, find the quadratic equation whose roots are α² and β².',
    options: ['x² - 12x + 4 = 0', 'x² - 16x + 4 = 0', 'x² - 12x + 2 = 0', 'x² - 8x + 4 = 0'],
    correctIndex: 0,
    explanation: 'Original: S = α + β = 4, P = αβ = 2. New sum S\' = α² + β² = (α + β)² - 2αβ = 4² - 2(2) = 16 - 4 = 12. New product P\' = (αβ)² = 2² = 4. New equation: x² - 12x + 4 = 0.',
    hints: [
      'Find the original sum S = 4 and product P = 2.',
      'Use the identity α² + β² = S² - 2P to find the new sum.',
      'The new product is P² = 4. Frame x² - S\'x + P\' = 0.',
    ],
  },
  // Advanced 16: Cube roots of unity nth power generalisation (analysis)
  {
    id: 'ch_16_cube_general',
    nodeId: NODE_C11_MATH_041,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For an integer n that is NOT a multiple of 3, what is the value of 1 + ωⁿ + ω²ⁿ?',
    options: ['3', '1', '0', '-1'],
    correctIndex: 2,
    explanation: 'When n is not a multiple of 3, n mod 3 is either 1 or 2. If n ≡ 1 (mod 3), the terms are 1, ω, ω² which sum to 0. If n ≡ 2 (mod 3), the terms are 1, ω², ω⁴ = 1 + ω² + ω = 0. In both non-multiple cases, the sum is exactly 0.',
    hints: [
      'Test n = 1: 1 + ω + ω² = 0.',
      'Test n = 2: 1 + ω² + ω⁴ = 1 + ω² + ω = 0.',
      'Because powers of ω cycle modulo 3, {1, ωⁿ, ω²ⁿ} is always a permutation of {1, ω, ω²} whenever 3 does not divide n.',
    ],
  },
  // Advanced 17: Parameter k for common root (evaluation)
  {
    id: 'ch_17_common_root_param',
    nodeId: NODE_C11_MATH_047,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Find the positive non-zero value of k for which x² - 5x + k = 0 and x² - 7x + 2k = 0 share a common root.',
    options: ['k = 3', 'k = 6', 'k = 12', 'k = 4'],
    correctIndex: 1,
    explanation: 'Let α be the common root: α² - 5α + k = 0 and α² - 7α + 2k = 0. Subtracting the two gives 2α - k = 0 => α = k/2. Substitute into the first equation: (k/2)² - 5(k/2) + k = 0 => k²/4 - 3k/2 = 0 => k(k - 6) = 0. Since k > 0, k = 6 (yielding common root α = 3).',
    hints: [
      'Subtract the two equations to eliminate α²: (x² - 5x + k) - (x² - 7x + 2k) = 0.',
      'This yields 2α - k = 0, so α = k/2.',
      'Substitute α = k/2 into x² - 5x + k = 0: k²/4 - 5k/2 + k = 0 => k²/4 = 3k/2.',
    ],
  },
  // Advanced 18: Equation reducible by nested substitution (application)
  {
    id: 'ch_18_nested_quad',
    nodeId: NODE_C11_MATH_044,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Find the sum of all real roots of the nested equation (x² + 3x)² - 8(x² + 3x) - 20 = 0.',
    options: ['-3', '-6', '3', '0'],
    correctIndex: 1,
    explanation: 'Let y = x² + 3x. y² - 8y - 20 = 0 => (y - 10)(y + 2) = 0. Case 1: x² + 3x - 10 = 0 has D = 9 + 40 = 49 > 0, so 2 real roots with sum = -3. Case 2: x² + 3x + 2 = 0 has D = 9 - 8 = 1 > 0, so 2 real roots with sum = -3. All 4 roots are real, and their total sum is (-3) + (-3) = -6.',
    hints: [
      'Substitute y = x² + 3x to get y² - 8y - 20 = 0.',
      'Solve for y: y = 10 or y = -2.',
      'For each quadratic x² + 3x - y = 0, check that D ≥ 0, then sum the roots using Vieta: sum = -3 each time.',
    ],
  },
  // Advanced 19: Construct quadratic inequality (creativity)
  {
    id: 'ch_19_construct_ineq',
    nodeId: NODE_C11_MATH_050,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the factor pieces to create an inequality whose solution set on the real number line is exactly [-3, 5].',
    availableParts: ['(x + 3)', '(x - 5)', '(x - 3)', '(x + 5)', '≤ 0', '≥ 0'],
    targetState: '(x + 3) (x - 5) ≤ 0',
    validationHint: 'The roots must be -3 and 5, and the product of (x - α)(x - β) must be non-positive between the roots.',
    explanation: '(x + 3)(x - 5) ≤ 0 has critical roots x = -3 and x = 5. Since the leading coefficient is +1, the quadratic is negative or zero between the roots: [-3, 5].',
    hints: [
      'A root at x = -3 comes from factor (x + 3).',
      'A root at x = 5 comes from factor (x - 5).',
      'For the region between roots to be selected, the inequality sign must be ≤ 0.',
    ],
  },
  // Advanced 20: Rational inequality with RHS non-zero (evaluation)
  {
    id: 'ch_20_rational_eval',
    nodeId: NODE_C11_MATH_051,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Solve (2x + 1) / (x - 4) ≤ 1 over real numbers. What is the correct solution set?',
    options: ['[-5, 4)', '(-5, 4]', '(-∞, -5] ∪ (4, ∞)', '(-∞, -5) ∪ [4, ∞)'],
    correctIndex: 0,
    explanation: 'Never cross-multiply! Bring 1 to LHS: (2x + 1)/(x - 4) - 1 ≤ 0 => [(2x + 1) - (x - 4)]/(x - 4) ≤ 0 => (x + 5)/(x - 4) ≤ 0. Critical points: x = -5 (numerator zero, included) and x = 4 (denominator zero, excluded). Product is ≤ 0 between the roots: [-5, 4).',
    hints: [
      'Do NOT multiply across by (x - 4) because its sign changes at x = 4!',
      'Subtract 1 from both sides and combine into a single fraction: (x + 5)/(x - 4) ≤ 0.',
      'Critical points are -5 (closed dot) and 4 (open dot). The solution is [-5, 4).',
    ],
  },
  // Advanced 21: One root square of other (analysis)
  {
    id: 'ch_21_root_squared',
    nodeId: NODE_C11_MATH_045,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'If one root of ax² + bx + c = 0 is the square of the other (α = β²), which relationship holds between the coefficients?',
    options: [
      'b³ + a²c + ac² = 3abc',
      'b³ - 3abc + a²c = 0',
      'a³ + b³ + c³ = 3abc',
      'b² = 4ac',
    ],
    correctIndex: 0,
    explanation: 'Roots are β and β². Sum β + β² = -b/a, product β³ = c/a. Cubing the sum: (β + β²)³ = β³ + β⁶ + 3β³(β + β²) = c/a + c²/a² + 3(c/a)(-b/a) = -b³/a³. Multiplying by a³ gives b³ + a²c + ac² = 3abc.',
    hints: [
      'Let the roots be β and β². Express their sum and product via Vieta.',
      'Sum S = β + β² = -b/a and product P = β³ = c/a.',
      'Use the algebraic identity (x + y)³ = x³ + y³ + 3xy(x + y) on (β + β²)³.',
    ],
  },
  // Advanced 22: Maximum height trajectory context (creativity)
  {
    id: 'ch_22_trajectory_max',
    nodeId: NODE_C11_MATH_049,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'An ISRO sounding rocket follows altitude h(t) = -5t² + 60t + 20 metres. At what time t (in seconds) does it reach its peak altitude?',
    correctAnswer: 6,
    tolerance: 0.1,
    unit: 's',
    explanation: 'h(t) is a downward parabola with a = -5 < 0, b = 60. Peak altitude occurs at vertex time t = -b/(2a) = -60 / (2 × -5) = 6 seconds. Peak height is h(6) = -5(36) + 360 + 20 = 200 m.',
    hints: [
      'The peak of a downward parabola occurs at the vertex t = -b/(2a).',
      'Substitute b = 60 and a = -5.',
      't = -60 / (-10) = 6 seconds.',
    ],
  },
];

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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_MATH_041,
  title: 'Cube Roots of Unity & Quadratic Continuum',
  definition: 'The cube roots of unity 1, ω = (-1 + i√3)/2, and ω² = (-1 - i√3)/2 satisfy 1 + ω + ω² = 0 and ω³ = 1, forming an equilateral triangle on the Argand plane. Together with quadratic equations ax² + bx + c = 0, Vieta’s relations, common roots, and the wavy curve sign-chart method, they form the foundation of polynomial algebra.',
  eli5: 'Think of 1, ω, and ω² as three symmetric spokes on a 3-way steering wheel centered at zero. If you push all three at once, they perfectly cancel out to zero! Quadratic curves work like water fountain arcs: looking at their roots and vertex tells you exactly where they go positive or negative.',
  misconceptions: [
    { misconception: 'ω³ = 1 implies that ω = 1.', correction: 'ω³ = 1 is a power equation with 3 solutions. ω is a non-real complex root at 120°, distinct from 1.' },
    { misconception: 'When D < 0, a quadratic equation has no roots.', correction: 'It has no REAL roots, but it has exactly two complex conjugate roots p ± qi.' },
    { misconception: 'To simplify ωⁿ, divide n by 3 and take the quotient.', correction: 'You take the remainder of n mod 3: ω⁷ = ω³⁽²⁾⁺¹ = ω¹ = ω.' },
    { misconception: 'The sum of quadratic roots is b/a.', correction: 'The sum of roots is -b/a. The negative sign is non-negotiable.' },
    { misconception: 'Dividing an inequality by a negative number keeps the inequality direction.', correction: 'Multiplying or dividing by a negative number MUST reverse the inequality sign.' },
    { misconception: 'In rational inequalities, you can freely cross-multiply by the denominator.', correction: 'Cross-multiplication fails because the denominator can change sign. Bring all terms to one side.' },
    { misconception: 'Denominator zeros can be included with a closed bracket if the inequality is ≤.', correction: 'Division by zero is undefined. Denominator critical points are ALWAYS excluded (open circle).' },
    { misconception: 'Solving y in a reducible equation completes the problem.', correction: 'y is an auxiliary substitution variable. You must back-substitute to find x.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the sum of the three cube roots of unity 1 + ω + ω²?', options: ['3', '0', '1', '-1'], correctIndex: 1 },
    { question: 'What is the value of ω⁹⁹?', options: ['ω', 'ω²', '1', '0'], correctIndex: 2 },
    { question: 'For 2x² - 6x + 5 = 0, what is the nature of the roots?', options: ['Real and distinct', 'Real and equal', 'Complex conjugates', 'Rational'], correctIndex: 2 },
    { question: 'What is the sum of the roots of 4x² + 8x - 1 = 0?', options: ['2', '-2', '1/4', '-1/4'], correctIndex: 1 },
    { question: 'At what x does f(x) = x² - 6x + 8 achieve its minimum?', options: ['x = 3', 'x = 6', 'x = -3', 'x = 4'], correctIndex: 0 },
    { question: 'What is the solution to (x - 1)(x - 4) < 0?', options: ['x < 1 or x > 4', '1 < x < 4', 'x ≤ 1', 'x ≥ 4'], correctIndex: 1 },
    { question: 'Why is x = 5 excluded from the solution of (x - 2)/(x - 5) ≤ 0?', options: ['Numerator is zero', 'Denominator cannot be zero', '5 is odd', '5 is positive'], correctIndex: 1 },
    { question: 'What condition gives reciprocal roots in ax² + bx + c = 0?', options: ['b = 0', 'c = a', 'b² = 4ac', 'a = 1'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery of cube roots of unity identities, discriminant analysis, Vieta relations, common roots, and the wavy curve method for rational inequalities.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Argand Equilateral Trio',
    instruction: 'Rotate the power slider to cycle through powers of ω (ω⁰, ω¹, ω², ω³, ω⁴...) and watch the vector sum balance at (0,0).',
    interactionType: 'slider-omega',
    nodeId: NODE_C11_MATH_041,
  },
  {
    title: 'Lab 2: Parabola Architecture & Sign Zones',
    instruction: 'Adjust coefficients a, b, and c to see the vertex shift, discriminant update, and positive/negative shaded regions in real time.',
    interactionType: 'slider-parabola',
    nodeId: NODE_C11_MATH_048,
  },
  {
    title: 'Lab 3: Common Orbit Crossing',
    instruction: 'Vary parameter k to align two quadratic curves until they intersect at a single shared common root.',
    interactionType: 'slider-common-root',
    nodeId: NODE_C11_MATH_047,
  },
  {
    title: 'Lab 4: The Wavy Curve Number Line',
    instruction: 'Move critical zeros along the number line and toggle factors to see how signs alternate across intervals.',
    interactionType: 'slider-wavy-curve',
    nodeId: NODE_C11_MATH_051,
  },
  {
    title: 'Lab 5: Auxiliary Variable Transformer',
    instruction: 'Inspect how substitution y = x² compresses a 4th-degree biquadratic curve into a manageable quadratic.',
    interactionType: 'click-transform',
    nodeId: NODE_C11_MATH_044,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you raise ω to the 100th power (ω¹⁰⁰), what will its position on the Argand plane be?',
    options: ['At 1 (0°)', 'At ω (120°)', 'At ω² (240°)', 'At the origin (0,0)'],
    correctIndex: 1,
    verifyInstruction: 'Now set the power slider to n = 100 or test 100 mod 3 to check your prediction!',
    nodeId: NODE_C11_MATH_041,
  },
  {
    question: 'Predict: If a > 0 and discriminant D < 0, where is the quadratic graph located relative to the x-axis?',
    options: [
      'Entirely strictly above the x-axis',
      'Entirely strictly below the x-axis',
      'Crossing at two symmetric points',
      'Touching the x-axis at x = 0',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust a to +1.5 and c to +4 so D < 0, and observe how the parabola hovers completely above y = 0.',
    nodeId: NODE_C11_MATH_049,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the vector sum of 1, ω, and ω² on the Argand plane?',
    observableOptions: [
      'The arrows chain together into a closed equilateral triangle returning to (0,0)',
      'The arrows all point in the same direction along the real axis',
      'The arrows double in length with every rotation',
      'The arrows cancel only along the imaginary axis',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_MATH_041,
  },
  {
    question: 'When a < 0 in the quadratic parabola, what happens to the vertex turning point?',
    observableOptions: [
      'It becomes a global maximum (highest point of the hill)',
      'It becomes a global minimum (lowest point of the valley)',
      'It disappears entirely',
      'It shifts into the imaginary plane',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_MATH_049,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Trajectory Analyst Mission',
  description: 'Design a 3-phase thruster firing window for a geostationary satellite where thruster output thrust T(t) = -2t² + 24t - 40 must satisfy T(t) ≥ 0, and verify resonance avoidance using 3-phase complex pulse harmonics (1 + ω + ω² = 0).',
  steps: [
    'Factorise -2t² + 24t - 40 = -2(t - 2)(t - 10) ≥ 0',
    'Determine the safe burn window t ∈ [2, 10] seconds using the sign chart',
    'Calculate maximum thrust at vertex time t = -24 / (2 × -2) = 6 seconds',
    'Verify that symmetric 120° thruster pulses yield zero net disturbance torque',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
function C11_MathematicsCubeRootsUnitySim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant patterns state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [sandboxReady, setSandboxReady] = useState(false);

  // Interactive Lab Visual States (Sliders & Controls)
  const [omegaPower, setOmegaPower] = useState(1);
  const [quadA, setQuadA] = useState(1);
  const [quadB, setQuadB] = useState(-4);
  const [quadC, setQuadC] = useState(3);
  const [paramK, setParamK] = useState(6);
  const [wavyR1, setWavyR1] = useState(-2);
  const [wavyR2, setWavyR2] = useState(3);
  const [wavyStrict, setWavyStrict] = useState(false);
  const [selectedArgandRoot, setSelectedArgandRoot] = useState<'1' | 'omega' | 'omega2' | null>(null);
  const [biquadExpanded, setBiquadExpanded] = useState(false);

  // Reflection text inputs
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Performance & SRS/BKT state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Drag & Sort & Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT Ref & Timer Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── MOTIVATIONAL FEEDBACK HELPER ───
  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE!';
    if (errCount >= 1 && errCount <= 3) return 'Great work!';
    if (errCount >= 4 && errCount <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  };

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') {
      return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    }
    if (difficulty === 'standard') {
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    }
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT UPDATE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (Argand Orbit Particle) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = 35;

      // Draw Orbit Circle
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating satellite pulse
      const px = cx + r * Math.cos(angle);
      const py = cy + r * Math.sin(angle);
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw 3 static cube root vertices
      for (let i = 0; i < 3; i++) {
        const rootAngle = (i * 2 * Math.PI) / 3;
        const rx = cx + r * Math.cos(rootAngle);
        const ry = cy + r * Math.sin(rootAngle);
        ctx.fillStyle = i === 0 ? '#10b981' : i === 1 ? '#f59e0b' : '#ec4899';
        ctx.beginPath();
        ctx.arc(rx, ry, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      angle += 0.03;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── ESCALATING HINTS CALLBACK ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
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

  // ─── INACTIVITY AUTO-HINT ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── NAVIGATION & ADVANCE HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect ? 'Outstanding insight! The roots form an equilateral triangle.' : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate each simulation to discover the mathematical laws.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Test any parameters without time limits or grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the rigorous challenge suite. Apply your discoveries!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive controls to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Look closely at how the vectors meet at origin.');
  }, []);

  const handleArgandSelect = useCallback((rootKey: '1' | 'omega' | 'omega2') => {
    setSelectedArgandRoot(rootKey);
    audioManager.play('tap');
    if (rootKey === '1') speechManager.speak('1 is at 0 degrees on the real axis.');
    if (rootKey === 'omega') speechManager.speak('Omega is at 120 degrees, minus half plus i root 3 over 2.');
    if (rootKey === 'omega2') speechManager.speak('Omega squared is at 240 degrees, the complex conjugate.');
  }, []);

  // ─── DRAG & DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const base = prev.length > 0 ? prev : [0, 1, 2, 3];
      const arr = [...base];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Module completed! You have mastered the algebraic and geometric foundations.');
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── MASTER ANSWER EVALUATION ───
  const handleAnswer = useCallback(
    (ans: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = ans === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        const orderToTest = Array.isArray(ans) && ans.length > 0 ? ans : [0, 1, 2, 3];
        isCorrect = JSON.stringify(orderToTest) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const num = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
      } else if (challenge.type === 'construct') {
        isCorrect = typeof ans === 'string' && ans.trim() === challenge.targetState?.trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Brilliant deduction.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step mathematical proof.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  // Derived Quadratic properties for Lab 2
  const quadDisc = useMemo(() => quadB * quadB - 4 * quadA * quadC, [quadA, quadB, quadC]);
  const quadVertexX = useMemo(() => -quadB / (2 * (quadA === 0 ? 0.001 : quadA)), [quadA, quadB]);
  const quadVertexY = useMemo(() => (4 * quadA * quadC - quadB * quadB) / (4 * (quadA === 0 ? 0.001 : quadA)), [quadA, quadB, quadC]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-xl border border-gold-700/50">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">ISC Mathematics Class 11</span>
              <span className="px-2 py-0.5 text-[10px] bg-slate-800 text-slate-300 rounded-full border border-slate-700">NEP 2020 Aligned</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Dynamic Status & Canvas Orb */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-xs text-slate-400">Mastery Level</p>
            <p className="text-sm font-bold text-gold-400 capitalize">{masteryLevel}</p>
          </div>
          <div className="w-20 h-10 relative bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
            <canvas ref={canvasRef} width={80} height={40} className="w-full h-full" />
          </div>
        </div>
      </motion.header>

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 1: DISCOVERY HOOK
         ═══════════════════════════════════════════════════════════════════ */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Narrative Scenario Box */}
          <div className="p-5 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-950 rounded-2xl border border-gold-800/40">
            <div className="flex items-center gap-2 text-gold-300 font-semibold mb-2">
              <span className="text-lg">🚀</span> {SCENARIO.title}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic">{SCENARIO.context}</p>
          </div>

          {/* Interactive Curiosity Hook */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>⚡</span> Curiosity Prediction Challenge
            </div>
            <h2 className="text-base md:text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all duration-200 border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-gold-500'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="text-xs text-slate-300 leading-relaxed">
                  <span className={discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {discoveryCorrect ? '✓ Spot on!' : '💡 Fascinating property:'}{' '}
                  </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter interactive labs"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-gold-600/30 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 2: INTERACTIVE EXPLORATION (Brilliant.org Core)
         ═══════════════════════════════════════════════════════════════════ */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Navigation Pill Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gold-400 uppercase">Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}:</span>
              <span className="text-xs font-semibold text-white">{EXPLORATION_STEPS[currentSlide].title}</span>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-gold-500' : 'w-2 bg-slate-700'
                  }`}
                  aria-label={`Jump to lab step ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Lab Workspace */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs md:text-sm font-medium text-amber-300">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-slate-800 text-slate-400 rounded">
                  {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              {/* ─── LAB 1: ARGAND PLANE CUBE ROOTS ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 360 320" className="w-full max-w-[340px]">
                      {/* Grid and Axes */}
                      <circle cx="180" cy="160" r="110" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="20" y1="160" x2="340" y2="160" stroke="#475569" strokeWidth="1.5" />
                      <line x1="180" y1="20" x2="180" y2="300" stroke="#475569" strokeWidth="1.5" />
                      <text x="330" y="152" fill="#94a3b8" fontSize="10">Re</text>
                      <text x="186" y="32" fill="#94a3b8" fontSize="10">Im</text>

                      {/* Equilateral Triangle Perimeter */}
                      <polygon
                        points="290,160 125,64.7 125,255.3"
                        fill="rgba(99, 102, 241, 0.08)"
                        stroke="#6366f1"
                        strokeWidth="2"
                      />

                      {/* Root 1: (1, 0) */}
                      <g onClick={() => handleArgandSelect('1')} className="cursor-pointer">
                        <circle cx="290" cy="160" r={selectedArgandRoot === '1' ? 8 : 6} fill="#10b981" />
                        <text x="300" y="164" fill="#10b981" fontSize="11" fontWeight="bold">1 (0°)</text>
                      </g>

                      {/* Root 2: ω = -1/2 + i√3/2 */}
                      <g onClick={() => handleArgandSelect('omega')} className="cursor-pointer">
                        <circle cx="125" cy="64.7" r={selectedArgandRoot === 'omega' ? 8 : 6} fill="#f59e0b" />
                        <text x="75" y="60" fill="#f59e0b" fontSize="11" fontWeight="bold">ω (120°)</text>
                      </g>

                      {/* Root 3: ω² = -1/2 - i√3/2 */}
                      <g onClick={() => handleArgandSelect('omega2')} className="cursor-pointer">
                        <circle cx="125" cy="255.3" r={selectedArgandRoot === 'omega2' ? 8 : 6} fill="#ec4899" />
                        <text x="70" y="270" fill="#ec4899" fontSize="11" fontWeight="bold">ω² (240°)</text>
                      </g>

                      {/* Animated Power Pointer Vector */}
                      {(() => {
                        const effectiveRem = ((omegaPower % 3) + 3) % 3;
                        const targetX = effectiveRem === 0 ? 290 : 125;
                        const targetY = effectiveRem === 0 ? 160 : effectiveRem === 1 ? 64.7 : 255.3;
                        return (
                          <line
                            x1="180"
                            y1="160"
                            x2={targetX}
                            y2={targetY}
                            stroke="#38bdf8"
                            strokeWidth="3"
                          />
                        );
                      })()}
                    </svg>

                    <div className="text-[11px] text-slate-400 mt-2 text-center">
                      Equilateral vertices: 1 + ω + ω² = (1 + 0i) + (-0.5 + 0.866i) + (-0.5 - 0.866i) = <strong className="text-emerald-400">0 + 0i</strong>
                    </div>
                  </div>

                  {/* Interactive Controls & Modulo Display */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-bold">Cycle Exponent: n = {omegaPower}</span>
                        <span className="px-2 py-0.5 bg-gold-950 text-gold-300 font-mono text-[11px] rounded">
                          {omegaPower} mod 3 = {((omegaPower % 3) + 3) % 3}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={20}
                        value={omegaPower}
                        onChange={(e) => setOmegaPower(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Adjust exponent n for omega^n"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>n = 0</span>
                        <span>n = 10</span>
                        <span>n = 20</span>
                      </div>
                    </div>

                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-900/50 space-y-2">
                      <div className="text-xs font-bold text-gold-200">Cyclic Evaluation:</div>
                      <div className="font-mono text-sm text-gold-300">
                        ω^{omegaPower} = (ω³)
                        <span className="text-slate-400">^{Math.floor(omegaPower / 3)}</span> · ω
                        <span className="text-amber-400">^{((omegaPower % 3) + 3) % 3}</span> ={' '}
                        <strong className="text-emerald-400">
                          {((omegaPower % 3) + 3) % 3 === 0
                            ? '1'
                            : ((omegaPower % 3) + 3) % 3 === 1
                            ? 'ω'
                            : 'ω²'}
                        </strong>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Notice how the powers strictly loop in a 3-hour modulo clock: 1 → ω → ω² → 1.
                      </p>
                    </div>

                    {/* Observation Question */}
                    {!observationAnswered && (
                      <div className="p-3 bg-slate-800 rounded-xl space-y-2">
                        <p className="text-xs text-slate-200 font-semibold">{OBSERVATION_QUESTIONS[0].question}</p>
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleObservation(i)}
                            className="block w-full text-left p-2 rounded bg-slate-900 hover:bg-slate-700 text-[11px] text-slate-300"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── LAB 2: PARABOLA ARCHITECTURE & SIGN ZONES ─── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 360 260" className="w-full max-w-[340px]">
                      {/* Coordinate Axes */}
                      <line x1="20" y1="130" x2="340" y2="130" stroke="#475569" strokeWidth="1.5" />
                      <line x1="180" y1="20" x2="180" y2="240" stroke="#475569" strokeWidth="1.5" />
                      <text x="330" y="122" fill="#94a3b8" fontSize="10">x</text>
                      <text x="186" y="32" fill="#94a3b8" fontSize="10">y</text>

                      {/* Dynamic Parabola Path */}
                      {(() => {
                        let pathD = '';
                        for (let px = -6; px <= 6; px += 0.2) {
                          const py = quadA * px * px + quadB * px + quadC;
                          const svgX = 180 + px * 22;
                          const svgY = 130 - py * 8;
                          if (svgX >= 20 && svgX <= 340 && svgY >= 20 && svgY <= 240) {
                            pathD += (pathD === '' ? 'M ' : ' L ') + `${svgX.toFixed(1)} ${svgY.toFixed(1)}`;
                          }
                        }
                        const svgVx = 180 + quadVertexX * 22;
                        const svgVy = 130 - quadVertexY * 8;
                        return (
                          <>
                            <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" />
                            {svgVx >= 20 && svgVx <= 340 && svgVy >= 20 && svgVy <= 240 && (
                              <g>
                                <circle cx={svgVx} cy={svgVy} r="5" fill="#f59e0b" />
                                <text x={svgVx + 6} y={svgVy - 6} fill="#fbbf24" fontSize="10" fontWeight="bold">
                                  V({quadVertexX.toFixed(1)}, {quadVertexY.toFixed(1)})
                                </text>
                              </g>
                            )}
                          </>
                        );
                      })()}
                    </svg>

                    <div className="flex flex-wrap gap-3 mt-3 text-xs justify-center">
                      <span className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800">
                        Discriminant D = <strong className={quadDisc > 0 ? 'text-emerald-400' : quadDisc === 0 ? 'text-amber-400' : 'text-rose-400'}>{quadDisc.toFixed(1)}</strong>
                      </span>
                      <span className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800">
                        Extremum: <strong className="text-amber-300">{quadA > 0 ? 'Min' : 'Max'} = {quadVertexY.toFixed(2)}</strong>
                      </span>
                    </div>
                  </div>

                  {/* 3 Interactive Sliders (a, b, c) */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Leading Coefficient a: {quadA}</span>
                        <span className="text-[10px] text-gold-400">{quadA > 0 ? 'Opens Up (Min)' : 'Opens Down (Max)'}</span>
                      </div>
                      <input
                        type="range"
                        min={-3}
                        max={3}
                        step={0.5}
                        value={quadA}
                        onChange={(e) => setQuadA(Number(e.target.value) === 0 ? 0.1 : Number(e.target.value))}
                        className="w-full accent-gold-500"
                        aria-label="Set leading coefficient a"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Linear Coefficient b: {quadB}</span>
                        <span className="text-[10px] text-slate-400">Axis x = {-quadB / (2 * (quadA || 1))}</span>
                      </div>
                      <input
                        type="range"
                        min={-8}
                        max={8}
                        step={1}
                        value={quadB}
                        onChange={(e) => setQuadB(Number(e.target.value))}
                        className="w-full accent-gold-500"
                        aria-label="Set coefficient b"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Constant c (y-intercept): {quadC}</span>
                        <span className="text-[10px] text-slate-400">(0, {quadC})</span>
                      </div>
                      <input
                        type="range"
                        min={-6}
                        max={6}
                        step={1}
                        value={quadC}
                        onChange={(e) => setQuadC(Number(e.target.value))}
                        className="w-full accent-gold-500"
                        aria-label="Set constant c"
                      />
                    </div>

                    {/* Sign Summary Card */}
                    <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-900 text-xs space-y-1">
                      <div className="font-bold text-gold-300">Sign of Expression ax² + bx + c:</div>
                      <p className="text-slate-300 text-[11px]">
                        {quadDisc < 0
                          ? `D < 0: Expression is strictly ${quadA > 0 ? 'POSITIVE (> 0)' : 'NEGATIVE (< 0)'} for ALL real x.`
                          : quadDisc === 0
                          ? `D = 0: Expression has same sign as a everywhere except at vertex root where it is 0.`
                          : `D > 0: Expression has opposite sign of a inside the roots and same sign outside.`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: COMMON ORBIT CROSSING ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 360 260" className="w-full max-w-[340px]">
                      <line x1="20" y1="130" x2="340" y2="130" stroke="#475569" strokeWidth="1.5" />
                      <line x1="180" y1="20" x2="180" y2="240" stroke="#475569" strokeWidth="1.5" />

                      {/* Curve 1: y = x² - 5x + k */}
                      {(() => {
                        let path1 = '';
                        let path2 = '';
                        for (let px = -2; px <= 8; px += 0.2) {
                          const y1 = px * px - 5 * px + paramK;
                          const y2 = px * px - 7 * px + 2 * paramK;
                          const sx = 100 + px * 22;
                          const sy1 = 160 - y1 * 8;
                          const sy2 = 160 - y2 * 8;
                          if (sx >= 20 && sx <= 340) {
                            if (sy1 >= 20 && sy1 <= 240) path1 += (path1 === '' ? 'M ' : ' L ') + `${sx.toFixed(1)} ${sy1.toFixed(1)}`;
                            if (sy2 >= 20 && sy2 <= 240) path2 += (path2 === '' ? 'M ' : ' L ') + `${sx.toFixed(1)} ${sy2.toFixed(1)}`;
                          }
                        }
                        const isAligned = paramK === 6;
                        return (
                          <>
                            <path d={path1} fill="none" stroke="#38bdf8" strokeWidth="2" />
                            <path d={path2} fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray={isAligned ? 'none' : '4 4'} />
                            {isAligned && (
                              <g>
                                <circle cx={100 + 3 * 22} cy={160 - 0 * 8} r="6" fill="#10b981" />
                                <text x={100 + 3 * 22 + 8} y={150} fill="#10b981" fontSize="11" fontWeight="bold">
                                  Shared Root α = 3
                                </text>
                              </g>
                            )}
                          </>
                        );
                      })()}
                    </svg>

                    <div className="text-[11px] text-slate-400 mt-2 text-center">
                      Blue: <span className="text-gold-400 font-mono">x² - 5x + {paramK}</span> | Red:{' '}
                      <span className="text-rose-400 font-mono">x² - 7x + {2 * paramK}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-bold">Parameter k = {paramK}</span>
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${paramK === 6 ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                          {paramK === 6 ? 'Common Root Active (x = 3)' : 'No Non-Zero Shared Root'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={12}
                        step={1}
                        value={paramK}
                        onChange={(e) => setParamK(Number(e.target.value))}
                        className="w-full accent-gold-500"
                        aria-label="Adjust parameter k for common roots"
                      />
                    </div>

                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-900 text-xs space-y-2">
                      <div className="font-bold text-gold-200">Cross-Multiplication Condition:</div>
                      <div className="font-mono text-[11px] text-slate-300">
                        (bc\' - b\'c)(ab\' - a\'b) = (ca\' - c\'a)²
                      </div>
                      <div className="font-mono text-[11px] text-amber-300">
                        (-10k + 7k)(-7 + 5) = (k - 2k)² ⇒ 6k = k² ⇒ k = 6
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: THE WAVY CURVE NUMBER LINE ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 360 200" className="w-full max-w-[340px]">
                      {/* Number Line */}
                      <line x1="20" y1="100" x2="340" y2="100" stroke="#64748b" strokeWidth="2" />

                      {/* Interval Shading for (x - r1)/(x - r2) <= 0 */}
                      {(() => {
                        const low = Math.min(wavyR1, wavyR2);
                        const high = Math.max(wavyR1, wavyR2);
                        const sx1 = 180 + low * 24;
                        const sx2 = 180 + high * 24;
                        return (
                          <>
                            <rect x={sx1} y="88" width={sx2 - sx1} height="24" fill="rgba(16, 185, 129, 0.25)" rx="4" />
                            {/* Wavy curve sinusoid */}
                            <path
                              d={`M 20 60 Q ${(20 + sx1) / 2} 40 ${sx1} 100 Q ${(sx1 + sx2) / 2} 150 ${sx2} 100 Q ${(sx2 + 340) / 2} 40 340 60`}
                              fill="none"
                              stroke="#6366f1"
                              strokeWidth="2.5"
                            />
                            {/* Critical Point 1: Numerator (Included) */}
                            <circle cx={sx1} cy="100" r="6" fill={wavyStrict ? '#0f172a' : '#10b981'} stroke="#10b981" strokeWidth="2" />
                            <text x={sx1} y="80" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">
                              x = {low} (Num)
                            </text>

                            {/* Critical Point 2: Denominator (ALWAYS Excluded) */}
                            <circle cx={sx2} cy="100" r="6" fill="#0f172a" stroke="#f43f5e" strokeWidth="2.5" />
                            <text x={sx2} y="130" textAnchor="middle" fill="#f43f5e" fontSize="10" fontWeight="bold">
                              x = {high} (Denom Open!)
                            </text>
                          </>
                        );
                      })()}
                    </svg>

                    <div className="text-xs text-slate-300 font-mono mt-3">
                      Solution Set: <strong className="text-emerald-400">[{Math.min(wavyR1, wavyR2)}, {Math.max(wavyR1, wavyR2)})</strong>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Numerator Root: x = {wavyR1}</span>
                        <span className="text-emerald-400 text-[10px]">Included (●)</span>
                      </div>
                      <input
                        type="range"
                        min={-5}
                        max={1}
                        value={wavyR1}
                        onChange={(e) => setWavyR1(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Set numerator critical root"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Denominator Zero: x = {wavyR2}</span>
                        <span className="text-rose-400 text-[10px]">Always Excluded (○)</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={6}
                        value={wavyR2}
                        onChange={(e) => setWavyR2(Number(e.target.value))}
                        className="w-full accent-rose-500"
                        aria-label="Set denominator critical root"
                      />
                    </div>

                    <div className="p-3 bg-rose-950/40 rounded-xl border border-rose-900 text-xs">
                      <strong className="text-rose-300">CISCE Golden Rule:</strong> Even when the inequality is ≤ 0, denominator zeros can NEVER be closed dots because dividing by zero is undefined!
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: AUXILIARY VARIABLE TRANSFORMER ─── */}
              {currentSlide === 4 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-gold-400 uppercase">Degree-4 Disguise:</div>
                      <h4 className="text-lg font-mono font-bold text-white">x⁴ - 13x² + 36 = 0</h4>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setBiquadExpanded(!biquadExpanded)}
                      className="px-4 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl"
                    >
                      {biquadExpanded ? 'Hide Substitution' : 'Apply Substitution y = x²'}
                    </motion.button>
                  </div>

                  {biquadExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 bg-gold-950/40 rounded-xl border border-gold-800 space-y-3"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 bg-slate-900 rounded-lg">
                          <span className="text-gold-400 font-bold block mb-1">Step 1: Auxiliary Quadratic</span>
                          <span className="font-mono text-slate-200">y² - 13y + 36 = 0</span>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg">
                          <span className="text-gold-400 font-bold block mb-1">Step 2: Solve for y</span>
                          <span className="font-mono text-slate-200">(y - 4)(y - 9) = 0 ⇒ y = 4, 9</span>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg">
                          <span className="text-gold-400 font-bold block mb-1">Step 3: Back-Substitute</span>
                          <span className="font-mono text-emerald-400">x² = 4 ⇒ x = ±2<br />x² = 9 ⇒ x = ±3</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Notice how the auxiliary quadratic in y generates all 4 real roots of the original degree-4 polynomial.
                      </p>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Previous interactive lab"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-500 font-mono">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                aria-label="Next interactive lab"
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Proceed to free exploration sandbox"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 3: SANDBOX / FREE PLAY
         ═══════════════════════════════════════════════════════════════════ */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-emerald-300">Free Mathematical Sandbox</h3>
              <p className="text-xs text-slate-400 mt-1">
                Zero grading, zero time pressure. Test unusual coefficient combinations (like a &lt; 0 with D &lt; 0 or large exponents of ω).
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Start graded challenges"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 whitespace-nowrap"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sandbox Module A: Argand Explorer */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gold-300 uppercase">1. Argand Power Clock</span>
                <span className="text-xs font-mono text-emerald-400">ω^{omegaPower}</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={omegaPower}
                onChange={(e) => setOmegaPower(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer"
                aria-label="Sandbox omega power slider"
              />
              <p className="text-[11px] text-slate-400 font-mono">
                Remainder: {omegaPower} mod 3 = {((omegaPower % 3) + 3) % 3} ⇒{' '}
                <strong className="text-amber-300">
                  {((omegaPower % 3) + 3) % 3 === 0 ? '1' : ((omegaPower % 3) + 3) % 3 === 1 ? 'ω' : 'ω²'}
                </strong>
              </p>
            </div>

            {/* Sandbox Module B: Parabola Shape Explorer */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gold-300 uppercase">2. Parabola Sign Scanner</span>
                <span className="text-xs font-mono text-gold-400">
                  y = {quadA}x² {quadB >= 0 ? `+ ${quadB}` : quadB}x {quadC >= 0 ? `+ ${quadC}` : quadC}
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="range"
                  min={-2}
                  max={2}
                  step={0.5}
                  value={quadA}
                  onChange={(e) => setQuadA(Number(e.target.value) === 0 ? 0.1 : Number(e.target.value))}
                  className="w-1/3 accent-gold-500 cursor-pointer"
                  aria-label="Sandbox quad A"
                />
                <input
                  type="range"
                  min={-6}
                  max={6}
                  step={1}
                  value={quadB}
                  onChange={(e) => setQuadB(Number(e.target.value))}
                  className="w-1/3 accent-gold-500 cursor-pointer"
                  aria-label="Sandbox quad B"
                />
                <input
                  type="range"
                  min={-5}
                  max={5}
                  step={1}
                  value={quadC}
                  onChange={(e) => setQuadC(Number(e.target.value))}
                  className="w-1/3 accent-gold-500 cursor-pointer"
                  aria-label="Sandbox quad C"
                />
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                D = {quadDisc.toFixed(1)} | Vertex: ({quadVertexX.toFixed(2)}, {quadVertexY.toFixed(2)})
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 4: CHALLENGE SUITE (20+ Adaptive Questions)
         ═══════════════════════════════════════════════════════════════════ */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Progress Bar */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-slate-400 rounded">
                  Node: {challenge.nodeId}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950/80 border-rose-600 text-rose-300'
                      : 'bg-gold-950/80 border-gold-600 text-gold-300'
                  }`}
                >
                  {difficulty}
                </motion.span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-amber-950/60 border border-amber-800/40 text-amber-300 rounded">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
            </div>

            {/* Animated Progress Bar */}
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-pink-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Active Challenge Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-colors duration-300 ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900/90 border-slate-800 shadow-xl'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {challenge.question}
            </h3>

            {/* MCQ Type Render */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`p-4 text-left rounded-xl text-xs md:text-sm font-medium transition-all duration-200 border ${
                        showExplanation
                          ? i === challenge.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-500 opacity-50'
                          : 'bg-slate-800/90 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-gold-500'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-700/80 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Type Render */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag cards:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white text-xs font-semibold rounded-lg cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'slot_d_pos', title: 'D > 0 (Positive)' },
                    { id: 'slot_d_zero', title: 'D = 0 (Zero)' },
                    { id: 'slot_d_neg', title: 'D < 0 (Negative)' },
                  ].map((slot) => (
                    <div
                      key={slot.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(slot.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 min-h-[90px] flex flex-col justify-between"
                    >
                      <span className="text-xs text-slate-400 font-bold">{slot.title}</span>
                      <div className="text-xs font-mono font-bold text-gold-300 mt-2">
                        {droppedLabels[slot.id] || <span className="text-slate-600 italic">Drop label here</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  Verify Mapping →
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type Render */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or reorder steps into correct derivation order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement
                    : [0, 1, 2, 3]
                  ).map((itemIdx, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-gold-950 text-gold-300 font-bold flex items-center justify-center shrink-0">
                        {displayIdx + 1}
                      </span>
                      <span>{challenge.sortItems![itemIdx]}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3])}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Logical Sequence →
                </motion.button>
              </div>
            )}

            {/* Numeric Type Render */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-gold-500 w-48 font-mono"
                  />
                  <span className="text-slate-400 text-xs font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl disabled:opacity-40"
                  >
                    Check Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type Render */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-gold-700 text-slate-200 text-xs font-mono rounded-lg border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gold-950 text-gold-300 font-mono text-xs rounded border border-gold-800 flex items-center gap-1">
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 text-[10px] ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">Click pieces above to build algebraic inequality</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  Verify Construction →
                </motion.button>
              </div>
            )}

            {/* ─── STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-gold-950/60 to-slate-950 rounded-xl border border-gold-800/50 space-y-3"
              >
                <div className="flex items-center gap-2 text-gold-300 font-bold text-xs uppercase tracking-wider">
                  <span>📖</span> Step-by-Step Mathematical Explanation
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-slate-200 text-xs md:text-sm leading-relaxed"
                    >
                      <span className="font-bold text-gold-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-1.5 bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold rounded-lg"
                  >
                    Show Next Deduction Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Module →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PHASE 5: COMPLETION & REAL-WORLD RETENTION
         ═══════════════════════════════════════════════════════════════════ */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-950 rounded-2xl border border-gold-700/50 text-center space-y-3">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-extrabold text-white">Simulation Completed!</h2>

            {/* Motivational Feedback Banner */}
            <div className="p-3 bg-gold-950/90 rounded-xl border border-gold-500/40 inline-block px-6">
              <span className="text-lg md:text-xl font-black text-amber-400 tracking-wide uppercase">
                {getMotivationalFeedback(errors)}
              </span>
            </div>

            <div className="flex justify-center gap-6 text-sm">
              <span className="text-slate-300">
                Final Score: <strong className="text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong>
              </span>
              <span className="text-slate-300">
                Mastery: <strong className="text-gold-400 capitalize">{masteryLevel}</strong>
              </span>
              <span className="text-slate-300">
                Errors: <strong className={errors === 0 ? 'text-emerald-400' : 'text-amber-400'}>{errors}</strong>
              </span>
            </div>
            <p className="text-xs text-gold-300 max-w-lg mx-auto">
              {errors === 0
                ? 'Flawless accuracy! You have demonstrated master-level fluency across all 10 CISCE quadratic & complex nodes.'
                : errors <= 3
                ? 'Outstanding performance! You are well-prepared for competitive exams and board assessments.'
                : 'Solid foundation built! Review the highlighted misconception cards below to cement your understanding.'}
            </p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Personalized Misconception Profile
              </h3>
              <p className="text-xs text-slate-400">Review the exact traps that caught you during the challenge:</p>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={mIdx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reflection Section */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wider flex items-center gap-2">
              <span>🤔</span> Reflection & Metacognition
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionResponses.surprising}
                  onChange={(e) =>
                    setReflectionResponses((prev) => ({ ...prev, surprising: e.target.value }))
                  }
                  placeholder="e.g., How the 3 cube roots of unity balance vectorially to 0..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500 resize-none h-16"
                />
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionResponses.explain}
                  onChange={(e) =>
                    setReflectionResponses((prev) => ({ ...prev, explain: e.target.value }))
                  }
                  placeholder="e.g., Think of roots of unity as symmetric spokes on a 3-way steering wheel..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500 resize-none h-16"
                />
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionResponses.realLife}
                  onChange={(e) =>
                    setReflectionResponses((prev) => ({ ...prev, realLife: e.target.value }))
                  }
                  placeholder="e.g., 3-phase AC power systems, satellite thruster pulse cycles, audio DSP..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500 resize-none h-16"
                />
              </div>
            </div>
          </div>

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-900/50 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-300">
              <span className="font-bold text-amber-300">📅 Spaced Repetition Active:</span> Based on your error rate, this module is scheduled for your next memory refresh in{' '}
              <strong className="text-amber-300 font-mono">
                {errors === 0 ? REVIEW_INTERVAL_DAYS[2] : errors <= 3 ? REVIEW_INTERVAL_DAYS[1] : REVIEW_INTERVAL_DAYS[0]} days
              </strong>.
            </div>
          </div>

          {/* Real World Mission Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-gold-400 uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</div>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-lg text-[11px] text-slate-400 flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK BUBBLE OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Perfected!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C11_MathematicsCubeRootsUnitySim };
export default C11_MathematicsCubeRootsUnitySim;
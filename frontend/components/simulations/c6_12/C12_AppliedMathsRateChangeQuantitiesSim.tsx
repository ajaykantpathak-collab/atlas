'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC APPLIED MATHS NODE CONSTANTS ───
const NODE_C12_APPMATH_031 = 'c12_appmath_031'; // Rate of change of quantities
const NODE_C12_APPMATH_032 = 'c12_appmath_032'; // Increasing and decreasing functions
const NODE_C12_APPMATH_033 = 'c12_appmath_033'; // Maxima and minima - first and second derivative tests
const NODE_C12_APPMATH_034 = 'c12_appmath_034'; // Integration as inverse of differentiation
const NODE_C12_APPMATH_035 = 'c12_appmath_035'; // Standard integrals and integration by substitution
const NODE_C12_APPMATH_036 = 'c12_appmath_036'; // Integration by partial fractions and by parts
const NODE_C12_APPMATH_037 = 'c12_appmath_037'; // Definite integral and Fundamental Theorem of Calculus
const NODE_C12_APPMATH_038 = 'c12_appmath_038'; // Properties of definite integrals
const NODE_C12_APPMATH_039 = 'c12_appmath_039'; // Application of calculus in commerce - cost, revenue, profit
const NODE_C12_APPMATH_040 = 'c12_appmath_040'; // Application of calculus - marginal cost, marginal revenue, breakeven

const ALL_NODE_IDS = [
  NODE_C12_APPMATH_031,
  NODE_C12_APPMATH_032,
  NODE_C12_APPMATH_033,
  NODE_C12_APPMATH_034,
  NODE_C12_APPMATH_035,
  NODE_C12_APPMATH_036,
  NODE_C12_APPMATH_037,
  NODE_C12_APPMATH_038,
  NODE_C12_APPMATH_039,
  NODE_C12_APPMATH_040,
];

// ─── NARRATIVE REAL-WORLD SCENARIO ───
const SCENARIO = {
  title: 'The Smart EV Battery Manufacturing Venture (Bengaluru Tech Hub)',
  intro: 'A green mobility startup in Bengaluru produces lithium-ion power packs. As the chief operations analyst, you manage dynamic tank cooling rates, calculate maximum thermal efficiency, determine optimal batch production to maximize profit, and reconstruct total financial flows from marginal data.',
  context: 'Calculus powers every decision: from the rate of liquid nitrogen evaporation to the exact production quantity where Marginal Revenue equals Marginal Cost.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'If you double the radius of a spherical cooling tank from 5 m to 10 m while pumping coolant at a constant rate dV/dt = 100 L/min, what happens to the rate at which the radius expands (dr/dt)?',
  options: [
    'dr/dt doubles because the tank is bigger',
    'dr/dt stays exactly the same',
    'dr/dt drops to 1/4 of its initial speed because surface area quadrupled',
    'dr/dt drops to 1/8 because volume grew 8 times',
  ],
  correctIndex: 2,
  hintAfter: "Because dV/dt = 4πr² (dr/dt), solving for dr/dt gives (dV/dt)/(4πr²). Doubling r multiplies the denominator by 4, cutting radial growth rate to 1/4!",
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

// ─── CHALLENGES DATA (22 Total, 7 Foundation, 8 Standard, 7 Advanced) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall Rate Measure (c12_appmath_031)
  {
    id: 'ch_rate_01',
    nodeId: NODE_C12_APPMATH_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A circular solar cell expands such that its radius r grows with time. If A = πr², what is the correct relation for dA/dt using the chain rule?',
    options: ['dA/dt = 2πr', 'dA/dt = 2πr · (dr/dt)', 'dA/dt = πr² · (dr/dt)', 'dA/dt = 2π(dr/dt)'],
    correctIndex: 1,
    explanation: 'By the chain rule, differentiating A = πr² with respect to time t gives dA/dt = (dA/dr) · (dr/dt) = 2πr(dr/dt). Never omit dr/dt!',
    hints: [
      'Remember that radius r is also changing with time t.',
      'Differentiate πr² with respect to r first to get 2πr.',
      'Multiply by dr/dt because of the chain rule: dA/dt = 2πr · (dr/dt).',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label Commerce Calculus (c12_appmath_039 / 040)
  {
    id: 'ch_label_comm_02',
    nodeId: NODE_C12_APPMATH_039,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the mathematical expressions to their corresponding business concepts for cost function C(x) and revenue R(x).',
    dragItems: [
      { label: 'C(0)', targetId: 'box_fixed' },
      { label: 'C(x)/x', targetId: 'box_avg' },
      { label: 'dC/dx', targetId: 'box_mc' },
      { label: 'dR/dx', targetId: 'box_mr' },
    ],
    correctMapping: {
      box_fixed: 'C(0)',
      box_avg: 'C(x)/x',
      box_mc: 'dC/dx',
      box_mr: 'dR/dx',
    },
    explanation: 'Fixed Cost is C(0), Average Cost is C(x)/x, Marginal Cost is the derivative dC/dx, and Marginal Revenue is dR/dx.',
    hints: [
      'Fixed cost is the expense when zero units (x=0) are produced.',
      'Average cost is total cost divided by quantity x.',
      'Marginal quantities are always the instantaneous derivatives dC/dx and dR/dx.',
    ],
    misconceptionIndex: 2,
  },
  // 3. Foundation - Increasing/Decreasing (c12_appmath_032)
  {
    id: 'ch_incdec_03',
    nodeId: NODE_C12_APPMATH_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'For a continuous cost model f(x) = x² - 8x + 12 on x > 0, on which open interval is the function strictly decreasing?',
    options: ['(0, 4)', '(4, ∞)', '(0, 2)', '(2, 6)'],
    correctIndex: 0,
    explanation: "f'(x) = 2x - 8. For strictly decreasing, f'(x) < 0 => 2x - 8 < 0 => x < 4. Since x > 0, the interval is (0, 4).",
    hints: [
      "Compute the first derivative f'(x) = 2x - 8.",
      "A function is strictly decreasing where f'(x) < 0.",
      'Solve 2x - 8 < 0 to find x < 4, which gives interval (0, 4).',
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - Inverse Differentiation Concept (c12_appmath_034)
  {
    id: 'ch_int_inv_04',
    nodeId: NODE_C12_APPMATH_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why does every indefinite integral ∫ f(x) dx require the arbitrary constant of integration + C?',
    options: [
      'Because integration is an approximation of area',
      'Because differentiation eliminates constant terms (d/dx[C] = 0)',
      'Because C represents the upper limit of integration',
      'Because the function might not be continuous everywhere',
    ],
    correctIndex: 1,
    explanation: 'Since the derivative of any constant is zero, multiple functions differing by a constant have identical derivatives. Integration recovers an entire family of curves F(x) + C.',
    hints: [
      'Think about what d/dx (x² + 5) and d/dx (x² + 99) equal.',
      'Both equal 2x, so when reversing the process, we cannot know the original constant.',
      'Thus, + C is required to represent all possible antiderivatives.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation - Standard Integral (c12_appmath_035)
  {
    id: 'ch_sub_linear_05',
    nodeId: NODE_C12_APPMATH_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'What is the indefinite integral ∫ (4x + 7)⁵ dx?',
    options: [
      '(4x + 7)⁶ / 6 + C',
      '(4x + 7)⁶ / 24 + C',
      '4(4x + 7)⁶ / 6 + C',
      '(4x + 7)⁴ / 4 + C',
    ],
    correctIndex: 1,
    explanation: 'Using the linear form ∫ (ax+b)ⁿ dx = (ax+b)ⁿ⁺¹ / [a(n+1)] + C, we get (4x + 7)⁶ / (4 · 6) + C = (4x + 7)⁶ / 24 + C.',
    hints: [
      'Use the reverse chain rule for linear inside terms (ax + b).',
      'You must divide by the coefficient of x, which is a = 4.',
      '(n+1) = 6, so the denominator is 4 × 6 = 24.',
    ],
    misconceptionIndex: 0,
  },
  // 6. Foundation - Fundamental Theorem of Calculus (c12_appmath_037)
  {
    id: 'ch_ftc_06',
    nodeId: NODE_C12_APPMATH_037,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Evaluate the definite integral ∫₁⁴ (3x² - 2x) dx.',
    correctAnswer: 48,
    tolerance: 0.1,
    unit: 'units',
    explanation: 'Antiderivative F(x) = x³ - x². F(4) = 4³ - 4² = 64 - 16 = 48. F(1) = 1³ - 1² = 0. F(4) - F(1) = 48 - 0 = 48.',
    hints: [
      'Find the antiderivative: ∫ 3x² dx = x³ and ∫ -2x dx = -x².',
      'Evaluate F(4) = (4)³ - (4)² = 64 - 16 = 48.',
      'Evaluate F(1) = 1 - 1 = 0. Subtract F(4) - F(1) = 48.',
    ],
  },
  // 7. Foundation - Drag Sort LIATE priority (c12_appmath_036)
  {
    id: 'ch_liate_sort_07',
    nodeId: NODE_C12_APPMATH_036,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the function types in the standard priority order (LIATE) for selecting u in Integration by Parts (∫ u dv = uv - ∫ v du).',
    sortItems: [
      'Logarithmic functions (e.g. ln x)',
      'Inverse trigonometric functions (e.g. tan⁻¹ x)',
      'Algebraic functions (e.g. x², 3x)',
      'Trigonometric functions (e.g. sin x, cos x)',
      'Exponential functions (e.g. eˣ, 2ˣ)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'LIATE stands for Logarithmic, Inverse Trigonometric, Algebraic, Trigonometric, Exponential. The function appearing higher is chosen as u.',
    hints: [
      'L comes first (Logarithmic).',
      'I and A follow (Inverse trig, then Algebraic).',
      'T and E are last (Trigonometric, then Exponential).',
    ],
  },
  // 8. Standard - Related Rates Cube Expanding (c12_appmath_031)
  {
    id: 'ch_rate_cube_08',
    nodeId: NODE_C12_APPMATH_031,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An aluminium battery casing heats up and expands as a cube with edge x. If dx/dt = 0.3 cm/s, what is the rate of increase of volume dV/dt (in cm³/s) when x = 5 cm?',
    correctAnswer: 22.5,
    tolerance: 0.1,
    unit: 'cm³/s',
    explanation: 'V = x³ => dV/dt = 3x² · (dx/dt). At x = 5 cm and dx/dt = 0.3 cm/s: dV/dt = 3(25)(0.3) = 22.5 cm³/s.',
    hints: [
      'Formula for volume of cube is V = x³.',
      'Differentiate with respect to time t: dV/dt = 3x² · (dx/dt).',
      'Substitute x = 5 and dx/dt = 0.3: 3 × 25 × 0.3 = 22.5 cm³/s.',
    ],
  },
  // 9. Standard - Second Derivative Test for Maxima/Minima (c12_appmath_033)
  {
    id: 'ch_maxmin_09',
    nodeId: NODE_C12_APPMATH_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'For f(x) = 2x³ - 9x² + 12x + 5, what is the nature of the critical point at x = 1 and x = 2?',
    options: [
      'x = 1 is local minimum, x = 2 is local maximum',
      'x = 1 is local maximum, x = 2 is local minimum',
      'Both are points of inflection because f\'\'(x) = 0',
      'Both are local minima',
    ],
    correctIndex: 1,
    explanation: "f'(x) = 6x² - 18x + 12 = 6(x-1)(x-2). f''(x) = 12x - 18. At x = 1, f''(1) = -6 < 0 (local maximum). At x = 2, f''(2) = +6 > 0 (local minimum).",
    hints: [
      "Find f''(x) = 12x - 18.",
      "Check the sign of f''(1): 12(1) - 18 = -6 (negative means concave down = local max).",
      "Check the sign of f''(2): 12(2) - 18 = +6 (positive means concave up = local min).",
    ],
    misconceptionIndex: 1,
  },
  // 10. Standard - Breakeven vs Profit Max (c12_appmath_040)
  {
    id: 'ch_comm_be_mr_10',
    nodeId: NODE_C12_APPMATH_040,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A junior analyst claims: "To find the breakeven output, we set Marginal Revenue equal to Marginal Cost (MR = MC)." Evaluate this claim.',
    options: [
      'Correct: MR = MC is the exact definition of breakeven',
      'Incorrect: MR = MC maximizes profit (or minimizes loss); Breakeven requires Total Profit P(x) = 0 (i.e. Total Revenue = Total Cost)',
      'Incorrect: Breakeven requires Average Cost = Marginal Revenue',
      'Correct: Only when fixed cost is zero',
    ],
    correctIndex: 1,
    explanation: 'Breakeven is the point of zero net profit where R(x) = C(x). In contrast, MR = MC is the first-order condition for PROFIT MAXIMIZATION (where dP/dx = 0).',
    hints: [
      'Think about what breakeven means: zero profit, zero loss.',
      'MR = MC means the slope of the profit curve is zero (peak profit).',
      'Therefore, breakeven is P(x) = 0, whereas MR = MC is profit maximization.',
    ],
    misconceptionIndex: 2,
  },
  // 11. Standard - Fixed Cost Recovery via Integration (c12_appmath_040)
  {
    id: 'ch_rec_fc_11',
    nodeId: NODE_C12_APPMATH_040,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Surat factory has marginal cost MC = 20 + 0.04x rupees/unit with a fixed overhead cost of ₹5,000. Find the total cost C(x) of producing x = 100 units (in ₹).',
    correctAnswer: 7200,
    tolerance: 1,
    unit: '₹',
    explanation: 'C(x) = ∫ (20 + 0.04x) dx + Fixed Cost = 20x + 0.02x² + 5000. At x = 100: C(100) = 20(100) + 0.02(10000) + 5000 = 2000 + 200 + 5000 = ₹7,200.',
    hints: [
      'Integrate MC: ∫ (20 + 0.04x) dx = 20x + 0.02x² + K.',
      'The constant K is the fixed cost C(0) = ₹5,000.',
      'Calculate 20(100) + 0.02(10000) + 5000 = 2000 + 200 + 5000 = 7200.',
    ],
    misconceptionIndex: 2,
  },
  // 12. Standard - Substitution Shortcut f'(x)/f(x) (c12_appmath_035)
  {
    id: 'ch_log_sub_12',
    nodeId: NODE_C12_APPMATH_035,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Evaluate the integral ∫ (2x + 3)/(x² + 3x + 8) dx.',
    options: [
      'ln|x² + 3x + 8| + C',
      '1/(x² + 3x + 8)² + C',
      '(2x + 3) ln|x² + 3x + 8| + C',
      '2 ln|2x + 3| + C',
    ],
    correctIndex: 0,
    explanation: 'Notice that d/dx (x² + 3x + 8) = 2x + 3. This matches the standard form ∫ f\'(x)/f(x) dx = ln|f(x)| + C.',
    hints: [
      'Check if the numerator is the exact derivative of the denominator.',
      'Let u = x² + 3x + 8, then du = (2x + 3) dx.',
      '∫ du/u = ln|u| + C = ln|x² + 3x + 8| + C.',
    ],
  },
  // 13. Standard - King\'s Property on Definite Integral (c12_appmath_038)
  {
    id: 'ch_king_prop_13',
    nodeId: NODE_C12_APPMATH_038,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Using King\'s property ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx, evaluate I = ∫₀^(π/2) (sin x)/(sin x + cos x) dx.',
    options: ['π', 'π/2', 'π/4', '0'],
    correctIndex: 2,
    explanation: 'By King\'s property, I = ∫₀^(π/2) (cos x)/(cos x + sin x) dx. Adding the two gives 2I = ∫₀^(π/2) 1 dx = π/2 => I = π/4.',
    hints: [
      'Replace x with (π/2 - x) in the integrand. sin(π/2 - x) = cos x.',
      'Add the original integral I and the transformed integral I: 2I = ∫₀^(π/2) ((sin x + cos x)/(sin x + cos x)) dx.',
      '2I = ∫₀^(π/2) 1 dx = π/2, so I = π/4.',
    ],
  },
  // 14. Standard - Partial Fraction Decomposition (c12_appmath_036)
  {
    id: 'ch_partial_frac_14',
    nodeId: NODE_C12_APPMATH_036,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Decompose 1/((x + 2)(x + 5)) into partial fractions A/(x + 2) + B/(x + 5). What are the constants A and B?',
    options: [
      'A = 1/3, B = -1/3',
      'A = -1/3, B = 1/3',
      'A = 1/7, B = -1/7',
      'A = 1, B = -1',
    ],
    correctIndex: 0,
    explanation: '1 = A(x + 5) + B(x + 2). Setting x = -2 gives 1 = 3A => A = 1/3. Setting x = -5 gives 1 = -3B => B = -1/3.',
    hints: [
      'Multiply both sides by (x+2)(x+5) to get 1 = A(x+5) + B(x+2).',
      'Set x = -2 to eliminate B and find A.',
      'Set x = -5 to eliminate A and find B.',
    ],
  },
  // 15. Standard - Definite Integral Symmetry Even/Odd (c12_appmath_038)
  {
    id: 'ch_even_odd_15',
    nodeId: NODE_C12_APPMATH_038,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Evaluate without extensive integration: ∫₋₂² (x⁵ + 3x³ - sin x + 4) dx.',
    correctAnswer: 16,
    tolerance: 0.1,
    unit: 'units',
    explanation: 'The terms x⁵, 3x³, and -sin x are all odd functions, so their integrals over [-2, 2] vanish to 0. The remaining constant 4 is even: ∫₋₂² 4 dx = 4 × (2 - (-2)) = 16.',
    hints: [
      'Remember ∫₋ₐᵃ (odd function) dx = 0.',
      'Identify which terms are odd: x⁵, 3x³, and sin x are all odd.',
      'Only the constant 4 remains: 4 × (2 - (-2)) = 4 × 4 = 16.',
    ],
  },
  // 16. Advanced - Real-world Profit Maximization (c12_appmath_040)
  {
    id: 'ch_profit_max_adv_16',
    nodeId: NODE_C12_APPMATH_040,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A Bengaluru EV battery firm has demand price p = 600 - 2x and cost C(x) = 1000 + 40x + 0.5x² (in ₹). What production output x maximizes total profit?',
    correctAnswer: 112,
    tolerance: 0.5,
    unit: 'units',
    explanation: 'Revenue R(x) = x(600 - 2x) = 600x - 2x². Profit P(x) = R(x) - C(x) = (600x - 2x²) - (1000 + 40x + 0.5x²) = -2.5x² + 560x - 1000. Set dP/dx = -5x + 560 = 0 => x = 112 units. d²P/dx² = -5 < 0 confirms maximum.',
    hints: [
      'Build Total Revenue R(x) = x · p = 600x - 2x².',
      'Form Profit P(x) = R(x) - C(x) = -2.5x² + 560x - 1000.',
      'Set derivative dP/dx = -5x + 560 = 0 to solve for x = 112.',
    ],
    misconceptionIndex: 2,
  },
  // 17. Advanced - Inconclusive Second Derivative Fallback (c12_appmath_033)
  {
    id: 'ch_fallback_17',
    nodeId: NODE_C12_APPMATH_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For f(x) = (x - 3)⁴ + 2, f\'(3) = 0 and f\'\'(3) = 0. How must we classify the stationary point at x = 3?',
    options: [
      'It is automatically a point of inflection with no extreme value',
      'The 2nd derivative test is inconclusive; First Derivative Test reveals f\'(x) changes from negative to positive, so x = 3 is a local minimum',
      'The function has no stationary point at x = 3',
      'It is a local maximum because 4 is an even power',
    ],
    correctIndex: 1,
    explanation: 'When f\'\'(c) = 0, the second derivative test is inconclusive. We must fall back to the First Derivative Test: for x < 3, f\'(x) = 4(x-3)³ < 0; for x > 3, f\'(x) = 4(x-3)³ > 0. The change from - to + proves x = 3 is a local minimum.',
    hints: [
      'f\'\'(3) = 0 means the second derivative test gives NO conclusive answer.',
      'Check the sign of f\'(x) = 4(x-3)³ to the left (e.g. x=2.9) and right (x=3.1).',
      'f\'(2.9) < 0 and f\'(3.1) > 0: decreasing then increasing gives a local minimum.',
    ],
    misconceptionIndex: 1,
  },
  // 18. Advanced - Integration by Parts with Definite Limits (c12_appmath_036 / 037)
  {
    id: 'ch_byparts_adv_18',
    nodeId: NODE_C12_APPMATH_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Evaluate the definite integral ∫₀¹ x · e^(2x) dx using Integration by Parts.',
    options: [
      '(e² + 1) / 4',
      '(e² - 1) / 4',
      'e² / 2',
      '(3e² + 1) / 4',
    ],
    correctIndex: 0,
    explanation: 'Let u = x, dv = e^(2x) dx => du = dx, v = e^(2x)/2. ∫ x e^(2x) dx = [x e^(2x)/2] - ∫ (e^(2x)/2) dx = [x e^(2x)/2 - e^(2x)/4] from 0 to 1 = (e²/2 - e²/4) - (0 - 1/4) = e²/4 + 1/4 = (e² + 1)/4.',
    hints: [
      'LIATE chooses u = x (algebraic) and dv = e^(2x) dx (exponential).',
      'v = e^(2x)/2. Formula gives [x e^(2x)/2]₀¹ - ∫₀¹ (e^(2x)/2) dx.',
      'Evaluate limits carefully: at x=1 you get e²/4, at x=0 you get -(-1/4) = +1/4.',
    ],
  },
  // 19. Advanced - Net Signed vs Geometric Area (c12_appmath_037)
  {
    id: 'ch_geom_vs_net_19',
    nodeId: NODE_C12_APPMATH_037,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Find the total GEOMETRIC area (in sq. units) enclosed between y = cos x and the x-axis from x = 0 to x = π. (Hint: split at the zero crossing)',
    correctAnswer: 2,
    tolerance: 0.05,
    unit: 'sq units',
    explanation: 'Net signed area is ∫₀^π cos x dx = 0. But GEOMETRIC area splits at x = π/2: Area = ∫₀^(π/2) cos x dx + |∫_{π/2}^π cos x dx| = [sin x]₀^(π/2) + |[sin x]_{π/2}^π| = (1 - 0) + |0 - 1| = 1 + 1 = 2.',
    hints: [
      'Do not just integrate from 0 to π (that gives 0 because positive and negative lobes cancel).',
      'cos x crosses the x-axis at x = π/2.',
      'Geometric area is [sin x]₀^(π/2) + |[sin x]_{π/2}^π| = 1 + 1 = 2.',
    ],
    misconceptionIndex: 3,
  },
  // 20. Advanced - Modulus Split Integral (c12_appmath_038)
  {
    id: 'ch_mod_split_20',
    nodeId: NODE_C12_APPMATH_038,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Using the interval splitting property, evaluate ∫₀⁴ |2x - 4| dx.',
    correctAnswer: 8,
    tolerance: 0.1,
    unit: 'units',
    explanation: '2x - 4 = 0 at x = 2. Split into ∫₀² -(2x - 4) dx + ∫₂⁴ (2x - 4) dx = [4x - x²]₀² + [x² - 4x]₂⁴ = (8 - 4) + ((16 - 16) - (4 - 8)) = 4 + 4 = 8.',
    hints: [
      'The expression inside |2x - 4| changes sign at x = 2.',
      'For x in [0, 2], |2x - 4| = -(2x - 4) = 4 - 2x. Integral = 4.',
      'For x in [2, 4], |2x - 4| = 2x - 4. Integral = 4. Total = 4 + 4 = 8.',
    ],
    misconceptionIndex: 3,
  },
  // 21. Advanced - Conical Pile Related Rate (c12_appmath_031)
  {
    id: 'ch_cone_rate_21',
    nodeId: NODE_C12_APPMATH_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Sand pours at 12 cm³/s forming a conical pile where height h is always equal to radius r. At what rate is height h increasing when h = 3 cm? (V = 1/3 π r² h)',
    options: [
      '4 / (3π) cm/s',
      '12 / (9π) = 4 / (3π) cm/s',
      '4 / π cm/s',
      '3 / (4π) cm/s',
    ],
    correctIndex: 0,
    explanation: 'Since r = h, V = (1/3)π h³. Differentiating with respect to t: dV/dt = π h² (dh/dt). Given dV/dt = 12 and h = 3: 12 = π (9) (dh/dt) => dh/dt = 12 / (9π) = 4 / (3π) cm/s.',
    hints: [
      'Substitute r = h into the volume formula first to get V = (1/3)π h³.',
      'Differentiate: dV/dt = π h² · (dh/dt).',
      'Substitute dV/dt = 12 and h = 3: 12 = 9π (dh/dt) => dh/dt = 4 / (3π).',
    ],
  },
  // 22. Advanced - Breakeven Quadratic Analysis (c12_appmath_039)
  {
    id: 'ch_be_quad_22',
    nodeId: NODE_C12_APPMATH_039,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A tiffin service has cost C(x) = 1800 + 20x + 0.5x² and sells each tiffin at a flat price p = ₹90 (R(x) = 90x). What is the lower breakeven quantity x (in tiffins)?',
    correctAnswer: 40,
    tolerance: 0.5,
    unit: 'tiffins',
    explanation: 'Set Profit P(x) = 0 => 90x - (1800 + 20x + 0.5x²) = 0 => -0.5x² + 70x - 1800 = 0 => x² - 140x + 3600 = 0. Factor as (x - 40)(x - 100) = 0. Lower breakeven output is x = 40 units.',
    hints: [
      'Set R(x) = C(x) => 90x = 1800 + 20x + 0.5x².',
      'Rearrange into standard quadratic: 0.5x² - 70x + 1800 = 0 => x² - 140x + 3600 = 0.',
      'Factor as (x - 40)(x - 100) = 0. The lower breakeven output is 40.',
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_APPMATH_031,
  title: 'Rate of Change & Applied Calculus Lab',
  definition: 'Calculus in Applied Mathematics links derivatives (rates of change, marginal analysis, optimization) and integrals (total accumulated change, consumer surplus, cost recovery from marginal rates) into unified quantitative tools.',
  eli5: 'Derivatives are speedometers telling you how fast something changes right now; integrals are odometers that add up all the tiny changes to tell you the grand total.',
  misconceptions: [
    {
      misconception: 'Forgetting the chain rule (dr/dt) when differentiating with respect to time',
      correction: 'Because r is a function of time t, d/dt[πr²] must be 2πr · (dr/dt), never just 2πr.',
    },
    {
      misconception: 'Confusing critical points with turning points without testing f\'(x) or f\'\'(x)',
      correction: 'f\'(c) = 0 is only a necessary condition. You must verify a sign change in f\'(x) or check f\'\'(c) ≠ 0.',
    },
    {
      misconception: 'Omitting the fixed cost constant of integration when recovering total cost from MC',
      correction: '∫ MC dx gives only the variable cost. Total cost requires adding C(0) = Fixed Cost.',
    },
    {
      misconception: 'Equating net signed area with geometric area when crossing the x-axis',
      correction: 'Definite integral gives net signed area (lobes below x-axis are negative). Geometric area requires splitting at zeros.',
    },
    {
      misconception: 'Confusing profit maximization (MR = MC) with breakeven (Total Revenue = Total Cost)',
      correction: 'Breakeven is where Profit P(x) = 0. Setting MR = MC finds the peak of the profit parabola.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the derivative of Area A = πr² with respect to time t?', options: ['2πr', '2πr (dr/dt)', 'πr (dr/dt)', '2π (dr/dt)'], correctIndex: 1 },
    { question: 'If f\'(x) > 0 on an open interval I, the function is:', options: ['Strictly Decreasing', 'Strictly Increasing', 'Constant', 'Stationary'], correctIndex: 1 },
    { question: 'At a stationary point x = c, if f\'\'(c) < 0, the point is a:', options: ['Local Minimum', 'Local Maximum', 'Inflection Point', 'Discontinuity'], correctIndex: 1 },
    { question: 'The indefinite integral ∫ 1/x dx equals:', options: ['-1/x² + C', 'ln|x| + C', 'x + C', 'eˣ + C'], correctIndex: 1 },
    { question: 'According to LIATE, which function should be chosen as u first in ∫ x · ln x dx?', options: ['x (Algebraic)', 'ln x (Logarithmic)', 'Either one', 'dx'], correctIndex: 1 },
    { question: 'What does ∫₋ₐᵃ f(x) dx evaluate to if f(x) is an odd function?', options: ['2 ∫₀ᵃ f(x) dx', '0', 'a', 'f(a) - f(-a)'], correctIndex: 1 },
    { question: 'How is Average Cost AC(x) calculated from Total Cost C(x)?', options: ['dC/dx', 'C(x) / x', 'C(x) · x', 'C(x) - C(0)'], correctIndex: 1 },
    { question: 'At the breakeven output:', options: ['MR = MC', 'Profit P(x) = 0', 'Cost is minimized', 'Revenue is maximized'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery is achieved when the student accurately models related rates with the chain rule, classifies extrema via 1st/2nd derivative tests, computes integrals with substitution and parts, and conducts complete marginal commerce analysis.',
};

// ─── INTERACTIVE EXPLORATION LAB STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Related Rates & The Expanding Tank',
    instruction: 'Drag the radius slider to see how surface area affects the radial expansion rate dr/dt at a constant inflow dV/dt = 100 L/s.',
    interactionType: 'slider-rate',
    nodeId: NODE_C12_APPMATH_031,
  },
  {
    title: 'Lab 2: Dynamic Slope & Increasing / Decreasing Regions',
    instruction: 'Drag the tangent point x along the curve f(x) = x³ - 3x to observe where slope f\'(x) is positive (rising), negative (falling), or zero (turning points).',
    interactionType: 'slider-slope',
    nodeId: NODE_C12_APPMATH_032,
  },
  {
    title: 'Lab 3: Commerce Curves — Cost, Revenue & Breakeven',
    instruction: 'Adjust output quantity x to visualize Fixed Cost, Total Cost C(x), Revenue R(x), and locate the exact breakeven & maximum profit points.',
    interactionType: 'slider-commerce',
    nodeId: NODE_C12_APPMATH_039,
  },
  {
    title: 'Lab 4: Fundamental Theorem & Net Signed Area',
    instruction: 'Adjust the upper limit b for ∫₀ᵇ sin(x) dx to visualize the accumulation of area and discover how positive and negative lobes interact.',
    interactionType: 'slider-integral',
    nodeId: NODE_C12_APPMATH_037,
  },
  {
    title: 'Lab 5: King\'s Mirror Symmetry in Definite Integrals',
    instruction: 'Toggle the King\'s transformation mirror x → (a - x) to observe how the integrand flips without altering the total area value.',
    interactionType: 'toggle-mirror',
    nodeId: NODE_C12_APPMATH_038,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: At the production level where Total Profit P(x) is MAXIMIZED, what must be true about Marginal Cost (MC) and Marginal Revenue (MR)?',
    options: [
      'MR must be much greater than MC',
      'MC must equal MR (the slopes of Revenue and Cost curves are identical)',
      'MC must be equal to zero',
      'Total Revenue equals Fixed Cost',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the Production Quantity slider to peak profit and watch the tangent slopes of Cost and Revenue become parallel!',
    nodeId: NODE_C12_APPMATH_040,
  },
  {
    question: 'Predict: If you evaluate the definite integral ∫₀^(2π) sin(x) dx, what will the net signed area equal?',
    options: [
      '2.0 (the area of one hump)',
      '4.0 (the sum of both absolute humps)',
      '0.0 (the positive lobe [0, π] cancels the equal negative lobe [π, 2π])',
      '-2.0',
    ],
    correctIndex: 2,
    verifyInstruction: 'Drag the upper limit slider to 2π and observe how the positive area and negative area sum to 0.00!',
    nodeId: NODE_C12_APPMATH_037,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the radial growth rate dr/dt as the tank radius r gets larger while inflow dV/dt remains constant?',
    observableOptions: [
      'dr/dt decreases rapidly because the same volume of liquid spreads over a much larger surface area',
      'dr/dt increases because a larger tank sucks in more liquid',
      'dr/dt remains completely constant',
      'dr/dt oscillates between positive and negative',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_APPMATH_031,
  },
  {
    question: 'What do you observe about the Marginal Cost curve at high production levels in the commerce simulator?',
    observableOptions: [
      'Marginal Cost drops to zero',
      'Marginal Cost rises due to diminishing returns and overtime expenses, eventually exceeding Marginal Revenue',
      'Marginal Cost stays below Fixed Cost forever',
      'Revenue becomes negative',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_APPMATH_040,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Consulting Project: Indian EV Fleet Energy & Cost Optimization',
  description: 'Apply calculus models to a real-world fleet of 500 electric delivery vans operating across Mumbai and Bengaluru.',
  steps: [
    'Model the daily battery degradation rate dE/dt = -k√t based on ambient temperature and fast-charging cycles.',
    'Formulate the total maintenance cost C(x) = 50000 + 120x + 0.15x² and determine the optimal batch overhaul size.',
    'Calculate the breakeven fare per kilometer using definite integral accumulated demand curves.',
    'Present a 1-page report detailing how MC = MR prevents capital waste in fleet expansion.',
  ],
};

// ─── COMPONENT IMPLEMENTATION ───
function C12_AppliedMathsRateChangeQuantitiesSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['appmath'] || { name: 'Applied Mathematics', emoji: '📐', color: 'cyan' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-then-check & Observation States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab State Variables
  const [tankRadius, setTankRadius] = useState<number>(5); // meters
  const [tankInflow, setTankInflow] = useState<number>(100); // L/s
  const [curveX, setCurveX] = useState<number>(0); // x coordinate for f(x) = x³ - 3x
  const [commUnits, setCommUnits] = useState<number>(60); // output x in commerce lab
  const [intUpperLimit, setIntUpperLimit] = useState<number>(3.14); // upper limit b for integral of sin
  const [mirrorActive, setMirrorActive] = useState<boolean>(false);
  const [showTangentLine, setShowTangentLine] = useState<boolean>(true);
  const [showSignedArea, setShowSignedArea] = useState<boolean>(true);
  const [activeCommerceTab, setActiveCommerceTab] = useState<'totals' | 'marginals' | 'profit'>('totals');

  // Adaptive Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // Escalating Hints & Explanations
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Interactive Challenge Inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // UI Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Inactivity auto-hint timer ref
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Rate of change: dV/dt = 4πr² (dr/dt) => dr/dt = (dV/dt) / (4πr²)
  const rateDrDt = useMemo(() => {
    const inflowM3 = tankInflow / 1000;
    const surfaceArea = 4 * Math.PI * tankRadius * tankRadius;
    return surfaceArea > 0 ? (inflowM3 / surfaceArea) * 100 : 0;
  }, [tankRadius, tankInflow]);

  // Curve f(x) = x³ - 3x: f'(x) = 3x² - 3, f''(x) = 6x
  const curveY = useMemo(() => Math.pow(curveX, 3) - 3 * curveX, [curveX]);
  const curveSlope = useMemo(() => 3 * Math.pow(curveX, 2) - 3, [curveX]);
  const curveConcavity = useMemo(() => 6 * curveX, [curveX]);
  const curveMonotonicity = useMemo(() => {
    if (Math.abs(curveSlope) < 0.05) return 'Stationary / Turning Point (f\' = 0)';
    return curveSlope > 0 ? 'Strictly Increasing (f\' > 0)' : 'Strictly Decreasing (f\' < 0)';
  }, [curveSlope]);

  // Commerce Model
  const commCost = useMemo(() => 2000 + 15 * commUnits + 0.1 * Math.pow(commUnits, 2), [commUnits]);
  const commRevenue = useMemo(() => 95 * commUnits - 0.25 * Math.pow(commUnits, 2), [commUnits]);
  const commProfit = useMemo(() => commRevenue - commCost, [commRevenue, commCost]);
  const commMC = useMemo(() => 15 + 0.2 * commUnits, [commUnits]);
  const commMR = useMemo(() => 95 - 0.5 * commUnits, [commUnits]);
  const commAC = useMemo(() => (commUnits > 0 ? commCost / commUnits : 0), [commCost, commUnits]);

  // Integral accumulation of sin(x)
  const netIntegralValue = useMemo(() => 1 - Math.cos(intUpperLimit), [intUpperLimit]);
  const geometricAreaValue = useMemo(() => {
    if (intUpperLimit <= Math.PI) {
      return 1 - Math.cos(intUpperLimit);
    }
    const firstLobe = 2;
    return firstLobe + (1 + Math.cos(intUpperLimit));
  }, [intUpperLimit]);

  // Filter challenges by difficulty
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
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Canvas background simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.02 + t) * 28;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const tracerX = (t * 40) % canvas.width;
      const tracerY = canvas.height / 2 + Math.sin(tracerX * 0.02 + t) * 28;
      const slope = 0.02 * 28 * Math.cos(tracerX * 0.02 + t);

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tracerX - 25, tracerY - slope * 25);
      ctx.lineTo(tracerX + 25, tracerY + slope * 25);
      ctx.stroke();

      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(tracerX, tracerY, 5, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
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
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! Surface area spreads the incoming coolant.'
        : 'Notice how doubling the radius quadrupled the surface area!'
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore rate measures, extrema, integrals, and commerce calculus step by step.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Sandbox unlocked! Feel free to manipulate all mathematical variables without limits.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge stage activated. Solve the ISC questions to prove mastery.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulator below to verify your answer.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent deduction!' : 'Observe the graphs closely to see the trend.');
  }, []);

  const handleTankRadiusChange = useCallback((val: number) => {
    setTankRadius(val);
    audioManager.play('count');
  }, []);

  const handleCurveXChange = useCallback((val: number) => {
    setCurveX(val);
    audioManager.play('count');
  }, []);

  const handleCommUnitsChange = useCallback((val: number) => {
    setCommUnits(val);
    audioManager.play('count');
  }, []);

  const handleIntUpperLimitChange = useCallback((val: number) => {
    setIntUpperLimit(val);
    audioManager.play('count');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
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
    },
    [challenge]
  );

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the Applied Calculus laboratory with distinction.');
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Rigorous calculus proof achieved.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3000);
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
          speechManager.speak('Let us study the complete step-by-step calculus derivation.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 3000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <motion.div initial={{ x: -20 }} animate={{ x: 0 }} className="flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="text-3xl p-2 bg-cyan-950/70 border border-cyan-700/50 rounded-2xl shadow-inner cursor-pointer"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-900/60 border border-cyan-500/30 text-cyan-300"
              >
                ISC Class 12
              </motion.span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Rate of Change • Extrema • Integral Calculus • Marginal Analysis</p>
          </div>
        </motion.div>

        {/* Phase Pills Navigation */}
        <motion.div initial={{ x: 20 }} animate={{ x: 0 }} className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </motion.div>
      </motion.header>

      {/* ─── ANIMATE PRESENCE MAIN PHASES ─── */}
      <AnimatePresence mode="wait">
        {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Narrative Scenario Box */}
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-5 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 rounded-2xl border border-indigo-700/40 shadow-lg"
            >
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm tracking-wide uppercase">
                <span>⚡ Narrative Mission</span>
              </div>
              <h2 className="text-lg font-extrabold text-white mt-1">{SCENARIO.title}</h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-indigo-300/80 mt-2 font-medium bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-800/30"
              >
                💡 {SCENARIO.context}
              </motion.p>
            </motion.div>

            {/* Curiosity Hook Interactive Question */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                  Discovery Challenge (Not Graded — Test Your Intuition)
                </h3>
              </div>

              <p className="text-base text-white font-medium">{DISCOVERY_QUESTION.question}</p>

              {/* Visual Tank Preview */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center"
              >
                <svg viewBox="0 0 400 160" className="w-full max-w-md h-36">
                  {/* Small sphere r=5 */}
                  <circle cx="120" cy="80" r="35" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="4 2" />
                  <circle cx="120" cy="80" r="28" fill="#06b6d4" fillOpacity="0.25" />
                  <line x1="120" y1="80" x2="155" y2="80" stroke="#f59e0b" strokeWidth="2" />
                  <text x="135" y="74" fill="#f59e0b" fontSize="11" textAnchor="middle">r = 5m</text>
                  <text x="120" y="130" fill="#94a3b8" fontSize="11" textAnchor="middle">Area = 4π(5)² = 100π</text>

                  {/* Arrow */}
                  <path d="M 175 80 L 225 80 M 215 73 L 225 80 L 215 87" stroke="#64748b" strokeWidth="2" fill="none" />

                  {/* Large sphere r=10 */}
                  <circle cx="300" cy="80" r="55" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="4 2" />
                  <circle cx="300" cy="80" r="45" fill="#3b82f6" fillOpacity="0.2" />
                  <line x1="300" y1="80" x2="355" y2="80" stroke="#f59e0b" strokeWidth="2" />
                  <text x="325" y="74" fill="#f59e0b" fontSize="11" textAnchor="middle">r = 10m</text>
                  <text x="300" y="150" fill="#94a3b8" fontSize="11" textAnchor="middle">Area = 4π(10)² = 400π (4×)</text>
                </svg>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-3.5 text-left rounded-xl text-sm font-medium transition-all border ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400 opacity-60'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-cyan-500/50'
                    }`}
                  >
                    <span className="font-bold text-cyan-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                >
                  <motion.p
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                    className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}
                  >
                    {discoveryCorrect ? '✓ Exactly right!' : '⚡ Great intuition check!'}
                  </motion.p>
                  <p className="text-xs text-slate-300 leading-relaxed">{DISCOVERY_QUESTION.hintAfter}</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-900/30 flex items-center gap-2"
                  >
                    Start Interactive Lab Visualizer →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Step Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800"
            >
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  Interactive Exploration {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h2 className="text-base font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded-lg border border-slate-700"
                >
                  ← Prev
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextSlide}
                  disabled={currentSlide === EXPLORATION_STEPS.length - 1}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-xs font-bold rounded-lg text-white"
                >
                  Next →
                </motion.button>
              </div>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-amber-300 font-semibold px-1">
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </motion.p>

            {/* DYNAMIC LAB WORKSPACE */}
            <motion.div
              initial={{ scale: 0.99 }}
              animate={{ scale: 1 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 shadow-xl"
            >
              {/* LAB 1: RATE OF CHANGE */}
              {currentSlide === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center"
                    >
                      <svg viewBox="0 0 300 220" className="w-full h-48">
                        <rect x="135" y="0" width="30" height="40" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                        <path d="M 145 10 L 155 35 M 150 5 L 150 35" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 3" />
                        <text x="150" y="32" fill="#06b6d4" fontSize="9" textAnchor="middle">dV/dt={tankInflow}L/s</text>

                        <circle cx="150" cy="125" r={Math.min(75, 20 + tankRadius * 5.5)} fill="#0f172a" stroke="#3b82f6" strokeWidth="3" />
                        <circle cx="150" cy="125" r={Math.min(70, 16 + tankRadius * 5.5)} fill="#0284c7" fillOpacity="0.25" />

                        <line x1="150" y1="125" x2={150 + Math.min(70, 16 + tankRadius * 5.5)} y2="125" stroke="#f59e0b" strokeWidth="2.5" />
                        <circle cx="150" cy="125" r="3" fill="#f59e0b" />
                        <text x={150 + Math.min(35, 10 + tankRadius * 2.5)} y="118" fill="#f59e0b" fontSize="12" fontWeight="bold">
                          r = {tankRadius.toFixed(1)} m
                        </text>
                      </svg>
                    </motion.div>

                    <div className="flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                            <span>Current Radius (r):</span>
                            <span className="text-cyan-400 font-mono">{tankRadius.toFixed(1)} m</span>
                          </div>
                          <input
                            type="range"
                            min={2}
                            max={12}
                            step={0.5}
                            value={tankRadius}
                            onChange={e => handleTankRadiusChange(parseFloat(e.target.value))}
                            aria-label="Adjust Tank Radius"
                            className="w-full accent-cyan-500 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                            <span>Inflow Rate (dV/dt):</span>
                            <span className="text-cyan-400 font-mono">{tankInflow} L/s</span>
                          </div>
                          <input
                            type="range"
                            min={20}
                            max={300}
                            step={10}
                            value={tankInflow}
                            onChange={e => setTankInflow(parseInt(e.target.value))}
                            aria-label="Adjust Inflow Rate"
                            className="w-full accent-cyan-500 cursor-pointer"
                          />
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2"
                      >
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Surface Area A = 4πr²:</span>
                          <span className="text-slate-200 font-mono">{(4 * Math.PI * tankRadius * tankRadius).toFixed(1)} m²</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Formula dr/dt = (dV/dt) / (4πr²):</span>
                          <span className="text-amber-400 font-mono font-bold">{rateDrDt.toFixed(4)} cm/s</span>
                        </div>
                        <p className="text-[11px] text-slate-400 italic">
                          Notice: As radius increases, dr/dt slows down quadratically (1/r²) because the same coolant volume must fill a broader boundary.
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  <motion.div initial={{ y: 10 }} animate={{ y: 0 }} className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-amber-400 mb-2">Observation Check:</p>
                    <div className="space-y-1.5">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className={`w-full p-2.5 text-left text-xs rounded-lg border transition-all ${
                            observationAnswered
                              ? i === OBSERVATION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* LAB 2: DYNAMIC SLOPE */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center"
                    >
                      <svg viewBox="-3 -5 6 10" className="w-full h-56 transform scale-y-[-1]">
                        <line x1="-3" y1="0" x2="3" y2="0" stroke="#475569" strokeWidth="0.08" />
                        <line x1="0" y1="-5" x2="0" y2="5" stroke="#475569" strokeWidth="0.08" />

                        <path
                          d={Array.from({ length: 61 }, (_, i) => {
                            const px = -2.5 + (i * 5) / 60;
                            const py = Math.pow(px, 3) - 3 * px;
                            return `${i === 0 ? 'M' : 'L'} ${px.toFixed(3)} ${py.toFixed(3)}`;
                          }).join(' ')}
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="0.12"
                        />

                        {showTangentLine && (
                          <line
                            x1={curveX - 1.2}
                            y1={curveY - curveSlope * 1.2}
                            x2={curveX + 1.2}
                            y2={curveY + curveSlope * 1.2}
                            stroke="#f59e0b"
                            strokeWidth="0.1"
                          />
                        )}

                        <circle cx={curveX} cy={curveY} r="0.18" fill="#ec4899" />
                      </svg>
                      <span className="text-[11px] text-slate-400 mt-1">Plot of f(x) = x³ - 3x on [-2.5, 2.5]</span>
                    </motion.div>

                    <div className="space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                          <span>Position (x):</span>
                          <span className="text-cyan-400 font-mono">{curveX.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min={-2.2}
                          max={2.2}
                          step={0.1}
                          value={curveX}
                          onChange={e => handleCurveXChange(parseFloat(e.target.value))}
                          aria-label="Adjust Curve X coordinate"
                          className="w-full accent-cyan-500 cursor-pointer"
                        />
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2"
                      >
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Function Value f(x):</span>
                          <span className="text-slate-200 font-mono font-bold">{curveY.toFixed(3)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">1st Derivative f&apos;(x) = 3x² - 3:</span>
                          <span className={`font-mono font-bold ${curveSlope > 0 ? 'text-emerald-400' : curveSlope < 0 ? 'text-rose-400' : 'text-amber-400'}`}>
                            {curveSlope.toFixed(3)}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">2nd Derivative f&apos;&apos;(x) = 6x:</span>
                          <span className="text-indigo-300 font-mono font-bold">{curveConcavity.toFixed(3)}</span>
                        </div>
                        <div className="pt-1 border-t border-slate-800">
                          <span className="text-xs font-bold text-amber-300">{curveMonotonicity}</span>
                        </div>
                      </motion.div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCurveXChange(-1)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 border border-slate-700"
                        >
                          Go to Local Max (x = -1)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCurveXChange(1)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 border border-slate-700"
                        >
                          Go to Local Min (x = 1)
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* LAB 3: COMMERCE CALCULUS */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {!predictionMade && (
                    <motion.div
                      initial={{ scale: 0.98 }}
                      animate={{ scale: 1 }}
                      className="p-4 bg-indigo-950/50 rounded-xl border border-indigo-800 space-y-2"
                    >
                      <p className="text-xs font-bold text-indigo-300 uppercase">Predict-Then-Check:</p>
                      <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {predictionMade && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-amber-300 bg-amber-950/40 p-2.5 rounded-lg border border-amber-700/40"
                    >
                      🔍 {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </motion.p>
                  )}

                  <div className="flex gap-2 border-b border-slate-800 pb-2">
                    {(['totals', 'marginals', 'profit'] as const).map(tab => (
                      <motion.button
                        key={tab}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCommerceTab(tab)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg capitalize transition-all ${
                          activeCommerceTab === tab
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-400 hover:text-slate-200 bg-slate-800'
                        }`}
                      >
                        {tab} Curves
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center"
                    >
                      <svg viewBox="0 0 320 200" className="w-full h-48">
                        <line x1="30" y1="180" x2="310" y2="180" stroke="#475569" strokeWidth="1.5" />
                        <line x1="30" y1="20" x2="30" y2="180" stroke="#475569" strokeWidth="1.5" />
                        <text x="300" y="195" fill="#94a3b8" fontSize="10">Units (x)</text>
                        <text x="10" y="18" fill="#94a3b8" fontSize="10">₹</text>

                        {activeCommerceTab === 'totals' && (
                          <>
                            <path
                              d={Array.from({ length: 30 }, (_, i) => {
                                const x = i * 6;
                                const c = 2000 + 15 * x + 0.1 * x * x;
                                const svgX = 30 + (x / 180) * 270;
                                const svgY = 180 - (c / 10000) * 160;
                                return `${i === 0 ? 'M' : 'L'} ${svgX} ${svgY}`;
                              }).join(' ')}
                              fill="none"
                              stroke="#f43f5e"
                              strokeWidth="2.5"
                            />
                            <path
                              d={Array.from({ length: 30 }, (_, i) => {
                                const x = i * 6;
                                const r = 95 * x - 0.25 * x * x;
                                const svgX = 30 + (x / 180) * 270;
                                const svgY = 180 - (r / 10000) * 160;
                                return `${i === 0 ? 'M' : 'L'} ${svgX} ${svgY}`;
                              }).join(' ')}
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="2.5"
                            />
                          </>
                        )}

                        <line
                          x1={30 + (commUnits / 180) * 270}
                          y1="20"
                          x2={30 + (commUnits / 180) * 270}
                          y2="180"
                          stroke="#f59e0b"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                        <circle
                          cx={30 + (commUnits / 180) * 270}
                          cy={180 - (commRevenue / 10000) * 160}
                          r="4"
                          fill="#10b981"
                        />
                        <circle
                          cx={30 + (commUnits / 180) * 270}
                          cy={180 - (commCost / 10000) * 160}
                          r="4"
                          fill="#f43f5e"
                        />
                      </svg>
                      <div className="flex justify-center gap-4 text-[11px] mt-2">
                        <span className="text-rose-400 font-semibold">— Total Cost C(x)</span>
                        <span className="text-emerald-400 font-semibold">— Revenue R(x)</span>
                      </div>
                    </motion.div>

                    <div className="space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                          <span>Production Output (x):</span>
                          <span className="text-cyan-400 font-mono font-bold">{commUnits} units</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={160}
                          step={1}
                          value={commUnits}
                          onChange={e => handleCommUnitsChange(parseInt(e.target.value))}
                          aria-label="Adjust Production Output"
                          className="w-full accent-cyan-500 cursor-pointer"
                        />
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs"
                      >
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Revenue R(x):</span>
                          <span className="text-emerald-400 font-mono font-bold">₹{commRevenue.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Cost C(x):</span>
                          <span className="text-rose-400 font-mono font-bold">₹{commCost.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Net Profit P(x) = R - C:</span>
                          <span className={`font-mono font-bold ${commProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            ₹{commProfit.toFixed(0)}
                          </span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-slate-800">
                          <span className="text-slate-400">Marginal Revenue (MR):</span>
                          <span className="text-cyan-400 font-mono">₹{commMR.toFixed(2)}/unit</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Marginal Cost (MC):</span>
                          <span className="text-amber-400 font-mono">₹{commMC.toFixed(2)}/unit</span>
                        </div>
                      </motion.div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleCommUnitsChange(114)}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
                      >
                        Jump to Optimal Profit (MR = MC at x ≈ 114)
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* LAB 4: INTEGRAL ACCUMULATION */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center"
                    >
                      <svg viewBox="-0.5 -1.8 7.5 3.6" className="w-full h-48 transform scale-y-[-1]">
                        <line x1="0" y1="0" x2="6.5" y2="0" stroke="#475569" strokeWidth="0.04" />
                        <line x1="0" y1="-1.5" x2="0" y2="1.5" stroke="#475569" strokeWidth="0.04" />

                        <path
                          d={`M 0 0 ${Array.from({ length: 41 }, (_, i) => {
                            const px = (i * intUpperLimit) / 40;
                            const py = Math.sin(px);
                            return `L ${px.toFixed(3)} ${py.toFixed(3)}`;
                          }).join(' ')} L ${intUpperLimit.toFixed(3)} 0 Z`}
                          fill={intUpperLimit <= Math.PI ? '#06b6d4' : '#f43f5e'}
                          fillOpacity="0.35"
                        />

                        <path
                          d={Array.from({ length: 61 }, (_, i) => {
                            const px = (i * 6.28) / 60;
                            const py = Math.sin(px);
                            return `${i === 0 ? 'M' : 'L'} ${px.toFixed(3)} ${py.toFixed(3)}`;
                          }).join(' ')}
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="0.07"
                        />

                        <line x1={intUpperLimit} y1="-1.5" x2={intUpperLimit} y2="1.5" stroke="#f59e0b" strokeWidth="0.05" strokeDasharray="0.1 0.1" />
                      </svg>
                      <span className="text-[11px] text-slate-400 mt-1">Shaded Area for ∫₀ᵇ sin(x) dx</span>
                    </motion.div>

                    <div className="space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                          <span>Upper Limit (b):</span>
                          <span className="text-cyan-400 font-mono font-bold">
                            {intUpperLimit.toFixed(2)} rad ({(intUpperLimit / Math.PI).toFixed(2)}π)
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0.2}
                          max={6.28}
                          step={0.1}
                          value={intUpperLimit}
                          onChange={e => handleIntUpperLimitChange(parseFloat(e.target.value))}
                          aria-label="Adjust Integral Upper Limit"
                          className="w-full accent-cyan-500 cursor-pointer"
                        />
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs"
                      >
                        <div className="flex justify-between">
                          <span className="text-slate-400">Antiderivative [-cos(x)]₀ᵇ:</span>
                          <span className="text-slate-200 font-mono">-cos({intUpperLimit.toFixed(2)}) - (-1)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-bold">Net Signed Area:</span>
                          <span className="text-cyan-400 font-mono font-bold">{netIntegralValue.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-bold">Total Geometric Area:</span>
                          <span className="text-amber-400 font-mono font-bold">{geometricAreaValue.toFixed(4)}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800">
                          Notice how at b = 2π (6.28 rad), the net signed area becomes exactly 0.00, but geometric area equals 4.00!
                        </p>
                      </motion.div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleIntUpperLimitChange(3.1415)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300"
                        >
                          Set b = π (Peak Net Area = 2)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleIntUpperLimitChange(6.283)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300"
                        >
                          Set b = 2π (Net Area = 0)
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* LAB 5: KING'S PROPERTY */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold text-cyan-300">
                        King&apos;s Rule: ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setMirrorActive(!mirrorActive);
                          audioManager.play('pop');
                        }}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          mirrorActive
                            ? 'bg-amber-600 border-amber-500 text-white shadow-lg'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {mirrorActive ? '✓ Mirror Transformation Active (x → a - x)' : 'Apply King\'s Mirror Flip'}
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-xs font-bold text-slate-400 mb-1">Original Integral I:</p>
                        <p className="text-sm font-mono text-cyan-300">
                          I = ∫₀^(π/2) (sin¹⁰ x) / (sin¹⁰ x + cos¹⁰ x) dx
                        </p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-xs font-bold text-slate-400 mb-1">Transformed Integral (Mirror):</p>
                        <p className="text-sm font-mono text-amber-300">
                          I = ∫₀^(π/2) (cos¹⁰ x) / (cos¹⁰ x + sin¹⁰ x) dx
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/60 space-y-2"
                    >
                      <p className="text-xs font-bold text-indigo-300">The 2I Algebraic Magic:</p>
                      <p className="text-xs text-slate-200 font-mono leading-relaxed">
                        2I = ∫₀^(π/2) [(sin¹⁰ x + cos¹⁰ x) / (sin¹⁰ x + cos¹⁰ x)] dx = ∫₀^(π/2) 1 dx = π/2
                      </p>
                      <p className="text-xs font-bold text-emerald-400">
                        ∴ I = (π/2) / 2 = <span className="underline">π/4</span> (No complex trigonometric substitution needed!)
                      </p>
                    </motion.div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAdvanceToSandbox}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg"
                  >
                    Enter Free Exploration Sandbox →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.99 }}
              animate={{ scale: 1 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>🎮 Applied Calculus Interactive Sandbox</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Free play environment — zero grading. Test variables simultaneously to build deep geometric intuition.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToChallenge}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg"
                >
                  Ready for ISC Exam Challenges! →
                </motion.button>
              </div>

              {/* Live 2D requestAnimationFrame Canvas */}
              <motion.div whileHover={{ scale: 1.005 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <canvas ref={canvasRef} width={500} height={100} className="w-full rounded-lg h-24" />
              </motion.div>

              {/* Multi-slider controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-300">Tank Radius: {tankRadius}m</span>
                  <input
                    type="range"
                    min={2}
                    max={12}
                    step={0.5}
                    value={tankRadius}
                    onChange={e => handleTankRadiusChange(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 mt-2"
                  />
                  <span className="text-[11px] text-cyan-400 font-mono mt-1 block">dr/dt = {rateDrDt.toFixed(3)} cm/s</span>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-300">Curve X: {curveX.toFixed(1)}</span>
                  <input
                    type="range"
                    min={-2}
                    max={2}
                    step={0.1}
                    value={curveX}
                    onChange={e => handleCurveXChange(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 mt-2"
                  />
                  <span className="text-[11px] text-amber-400 font-mono mt-1 block">Slope f&apos;(x) = {curveSlope.toFixed(2)}</span>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-300">Batch Output: {commUnits} units</span>
                  <input
                    type="range"
                    min={10}
                    max={160}
                    step={2}
                    value={commUnits}
                    onChange={e => handleCommUnitsChange(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 mt-2"
                  />
                  <span className="text-[11px] text-emerald-400 font-mono mt-1 block">Profit = ₹{commProfit.toFixed(0)}</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 4: CHALLENGE STAGE ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Challenge Header & Difficulty Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800"
            >
              <div>
                <span className="text-xs font-bold text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <motion.span
                    key={difficulty}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      difficulty === 'foundation'
                        ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-400'
                        : difficulty === 'standard'
                        ? 'bg-blue-950 border border-blue-500/40 text-blue-400'
                        : 'bg-rose-950 border border-rose-500/40 text-rose-400'
                    }`}
                  >
                    {difficulty}
                  </motion.span>
                  <span className="text-xs text-slate-400 capitalize">• NEP Competency: {challenge.competencyLevel}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 font-mono">
                  Accuracy: {scoreBreakdown.total > 0 ? Math.round((scoreBreakdown.correct / scoreBreakdown.total) * 100) : 100}%
                </span>
              </div>
            </motion.div>

            {/* Animated Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-2 bg-slate-800 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            {/* QUESTION CARD */}
            <motion.div
              initial={{ scale: 0.99 }}
              animate={{ scale: 1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5 shadow-xl"
            >
              <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">{challenge.question}</p>

              {/* 1. MCQ OPTIONS */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                        wrongFlash
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/50'
                          : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-cyan-500/40'
                      }`}
                    >
                      <span className="font-bold text-cyan-400 mr-2.5">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 2. DRAG-LABEL CHALLENGE */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="flex flex-wrap gap-2.5 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 w-full mb-1">Drag each term into the correct diagram slot:</span>
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        role="button"
                        aria-label={`Draggable ${item.label}`}
                        className="px-4 py-2 bg-indigo-700/80 hover:bg-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab shadow border border-indigo-500/40"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 180" className="w-full h-44">
                      {[
                        { id: 'box_fixed', label: 'Fixed Cost C(0)', x: 20, y: 20 },
                        { id: 'box_avg', label: 'Average Cost AC(x)', x: 220, y: 20 },
                        { id: 'box_mc', label: 'Marginal Cost (MC)', x: 20, y: 100 },
                        { id: 'box_mr', label: 'Marginal Revenue (MR)', x: 220, y: 100 },
                      ].map(b => (
                        <g
                          key={b.id}
                          onDragOver={e => e.preventDefault()}
                          onDrop={() => handleDragDrop(b.id)}
                          className="cursor-pointer"
                        >
                          <rect
                            x={b.x}
                            y={b.y}
                            width="160"
                            height="60"
                            rx="8"
                            fill="#0f172a"
                            stroke={droppedLabels[b.id] ? '#10b981' : '#475569'}
                            strokeWidth="2"
                            strokeDasharray={droppedLabels[b.id] ? 'none' : '4 4'}
                          />
                          <text x={b.x + 80} y={b.y + 24} textAnchor="middle" fill="#94a3b8" fontSize="10">
                            {b.label}
                          </text>
                          <text x={b.x + 80} y={b.y + 45} textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
                            {droppedLabels[b.id] || '[ Drop Here ]'}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl"
                  >
                    Verify Mappings
                  </motion.button>
                </motion.div>
              )}

              {/* 3. DRAG-SORT CHALLENGE */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <span className="text-xs text-slate-400">Drag to arrange steps in the correct top-to-bottom sequence:</span>
                  <div className="space-y-2">
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
                        whileTap={{ scale: 0.99 }}
                        role="button"
                        aria-label={`Sort step ${displayIdx + 1}`}
                        className="p-3.5 bg-slate-800/90 rounded-xl text-slate-200 text-xs font-semibold cursor-grab border border-slate-700 flex items-center gap-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500 text-cyan-400 flex items-center justify-center text-[10px]">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const ans =
                        sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
                      handleAnswer(ans);
                    }}
                    className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl"
                  >
                    Check Sequence
                  </motion.button>
                </motion.div>
              )}

              {/* 4. NUMERIC CHALLENGE */}
              {challenge.type === 'numeric' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="flex items-center gap-3 max-w-sm">
                    <input
                      type="number"
                      step="any"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      placeholder="Enter value"
                      aria-label="Enter numeric answer"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                    />
                    <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl"
                  >
                    Submit Calculated Value
                  </motion.button>
                </motion.div>
              )}

              {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-amber-950/40 border border-amber-600/50 rounded-2xl space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                      Step-by-Step Proof & Walkthrough:
                    </span>
                  </div>

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
                          className="text-xs sm:text-sm text-amber-200 leading-relaxed font-sans"
                        >
                          <span className="font-bold text-amber-400 mr-1.5">Step {idx + 1}:</span>
                          {sentence}
                          {!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {revealedSteps <
                      challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                      >
                        Show Next Step →
                      </motion.button>
                    )}

                    {revealedSteps >=
                      challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950/50"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Laboratory Assessment →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETION & REAL-WORLD CAPSTONE ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Hero Banner */}
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="p-6 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 rounded-3xl border border-emerald-600/50 text-center space-y-2"
            >
              <h2 className="text-2xl sm:text-3xl font-black text-white">Laboratory Certification Complete!</h2>
              <p className="text-sm text-slate-300">
                Final Calculated Score: <span className="text-emerald-400 font-bold font-mono">{Math.max(0, 100 - errors * 5)}%</span> | Mastery Tier: <span className="text-cyan-300 font-bold capitalize">{masteryLevel}</span>
              </p>
            </motion.div>

            {/* Motivational Feedback Banner */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl border ${
                errors === 0
                  ? 'bg-emerald-950/70 border-emerald-500/80'
                  : errors <= 3
                  ? 'bg-cyan-950/70 border-cyan-500/80'
                  : errors <= 7
                  ? 'bg-blue-950/70 border-blue-500/80'
                  : 'bg-amber-950/70 border-amber-500/80'
              } space-y-2 text-center`}
            >
              <motion.h3
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-lg font-black tracking-wide uppercase text-white"
              >
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </motion.h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {errors === 0
                  ? '🌟 Flawless Mastery! You executed all derivatives, chain-rule rates, extrema tests, standard integrals, and marginal calculations without a single error.'
                  : errors <= 3
                  ? '👍 Exceptional Competency! You exhibit strong analytical mastery over ISC Applied Mathematics calculus topics.'
                  : errors <= 7
                  ? '🌱 Commendable Effort! You have built solid foundational intuition. Review your misconception profile below to reach 100% precision.'
                  : '💪 Persistence is the path to mastery in applied mathematics. Re-engage with the interactive sandboxes and step walkthroughs to master every theorem!'}
              </p>
            </motion.div>

            {/* Misconception Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3"
              >
                <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                  Your Individual Misconception Diagnostic Profile:
                </h3>
                <div className="space-y-2.5">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs"
                      >
                        <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                        <p className="text-emerald-300 font-medium">✓ Correction: {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Spaced Repetition (SM-2) Visible Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-cyan-950/40 rounded-2xl border border-cyan-800/50 flex items-center justify-between"
            >
              <div>
                <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Spaced Review Schedule (SM-2):</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Next automated review scheduled in{' '}
                  <span className="text-cyan-300 font-bold font-mono">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
                </p>
              </div>
              <motion.span whileHover={{ rotate: 20 }} className="text-2xl cursor-pointer">
                📅
              </motion.span>
            </motion.div>

            {/* Reflection Prompts */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2"
            >
              <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Metacognitive Reflection:</h3>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>1. Why is setting MR = MC the profit peak, whereas R = C is breakeven?</li>
                <li>2. How does the chain rule link the geometric expansion of a 3D tank to 1D radial growth?</li>
                <li>3. In what industrial scenarios does net signed area differ from total geometric area?</li>
              </ul>
            </motion.div>

            {/* Real-World Activity Capstone */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-indigo-950/50 rounded-2xl border border-indigo-700/50 space-y-3"
            >
              <h3 className="text-sm font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <motion.li key={i} whileHover={{ x: 3 }} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">{i + 1}.</span>
                    <span>{st}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Laboratory Milestone Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C12_AppliedMathsRateChangeQuantitiesSim;
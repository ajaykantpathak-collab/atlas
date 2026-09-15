'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst,
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───────────────���───────────────────
const NODE_C12_MATH_041 = 'c12_math_041'; // Derivatives of parametric functions
const NODE_C12_MATH_042 = 'c12_math_042'; // Differentiation of one function w.r.t. another
const NODE_C12_MATH_043 = 'c12_math_043'; // Second order derivatives
const NODE_C12_MATH_044 = 'c12_math_044'; // Applications - rate of change of quantities
const NODE_C12_MATH_045 = 'c12_math_045'; // Increasing and decreasing functions
const NODE_C12_MATH_046 = 'c12_math_046'; // Tangent and normal, angle between curves
const NODE_C12_MATH_047 = 'c12_math_047'; // Maxima and minima - critical points, first derivative test
const NODE_C12_MATH_048 = 'c12_math_048'; // Maxima and minima - second derivative test and applications
const NODE_C12_MATH_049 = 'c12_math_049'; // Integration as inverse of differentiation
const NODE_C12_MATH_050 = 'c12_math_050'; // Standard integrals (polynomials, sin x, cos x, sec^2x, etc.)

const ALL_NODE_IDS = [
  NODE_C12_MATH_041,
  NODE_C12_MATH_042,
  NODE_C12_MATH_043,
  NODE_C12_MATH_044,
  NODE_C12_MATH_045,
  NODE_C12_MATH_046,
  NODE_C12_MATH_047,
  NODE_C12_MATH_048,
  NODE_C12_MATH_049,
  NODE_C12_MATH_050,
];

// ─── NARRATIVE SCENARIO ─────────────────────────────────────────────────────
const SCENARIO = {
  title: 'Mission Gaganyaan: Flight Trajectory Telemetry',
  intro:
    'You are the Chief Flight Dynamics Analyst at ISRO Telemetry, Tracking and Command Network (ISTRAC) in Bengaluru. Gaganyaan is ascending through the stratosphere.',
  context:
    'Radar measures horizontal displacement x(t) and vertical altitude y(t) as parametric functions of time t. To maintain aerodynamic stability, calculate payload fuel-burn rates, maximize altitude, and reconstruct trajectory paths, you must harness parametric derivatives, extrema tests, rate measures, and reverse integration.',
};

// ─── DISCOVERY QUESTION ─────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question:
    'A rocket trajectory is logged as x(t) = t² (km) and y(t) = t³ (km). What is the trajectory slope dy/dx at time t = 2 seconds?',
  options: [
    'dy/dx = 3 km/km (Slope = (3t)/2 = 3)',
    'dy/dx = 1.5 km/km (Slope = t/2 = 1)',
    'dy/dx = 6 km/km (Slope = 3t² = 12)',
    'dy/dx = 0.67 km/km (Slope = 2/(3t) = 1/3)',
  ],
  correctIndex: 0,
  hintAfter:
    'Think: The rocket moves horizontally at dx/dt = 2t and vertically at dy/dt = 3t². The curve slope dy/dx is the ratio (dy/dt)/(dx/dt) = (3t²)/(2t) = 3t/2 = 3!',
};

// ─── CHALLENGE INTERFACE ────────────────────────────────────────────────────
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

// ─── 22 COMPREHENSIVE CHALLENGES ────────────────────────────────────────────
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c12_math_041)
  {
    id: 'ch_01_param_formula',
    nodeId: NODE_C12_MATH_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'For parametric equations x = f(t) and y = g(t), what is the formula for dy/dx and its necessary condition?',
    options: [
      'dy/dx = (dy/dt) / (dx/dt), valid only when dx/dt ≠ 0',
      'dy/dx = (dx/dt) / (dy/dt), valid for all real t',
      'dy/dx = (dy/dt) × (dx/dt), valid only when dy/dt ≠ 0',
      'dy/dx = d²y/dt², valid when t > 0',
    ],
    correctIndex: 0,
    explanation:
      'By the chain rule, dy/dt = (dy/dx) · (dx/dt). Rearranging yields dy/dx = (dy/dt)/(dx/dt). If dx/dt = 0, the tangent is vertical and the standard slope is undefined.',
    hints: [
      'Think of how vertical speed and horizontal speed combine to give slope.',
      'Slope is vertical change over horizontal change: Δy / Δx.',
      'Divide the time derivative of y by the time derivative of x: (dy/dt) / (dx/dt), provided dx/dt ≠ 0.',
    ],
    misconceptionIndex: 0,
  },

  // 2. Foundation - Application (c12_math_041)
  {
    id: 'ch_02_circle_param',
    nodeId: NODE_C12_MATH_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question:
      'A satellite tracks an orbit x = a cos(t), y = a sin(t). Find the trajectory slope dy/dx in terms of parameter t.',
    options: ['-cot(t)', '-tan(t)', 'tan(t)', 'cot(t)'],
    correctIndex: 0,
    explanation:
      'dy/dt = a cos(t) and dx/dt = -a sin(t). Therefore dy/dx = (a cos t)/(-a sin t) = -cot(t), provided sin(t) ≠ 0.',
    hints: [
      'Differentiate x = a cos(t) w.r.t t to find dx/dt.',
      'Differentiate y = a sin(t) w.r.t t to find dy/dt.',
      'Form the quotient dy/dx = (a cos t) / (-a sin t) = -cot(t).',
    ],
    misconceptionIndex: 1,
  },

  // 3. Foundation - Understanding (c12_math_042)
  {
    id: 'ch_03_func_wrt_func',
    nodeId: NODE_C12_MATH_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Differentiate u = sin(x³) with respect to v = x³. What is du/dv?',
    options: ['cos(x³)', '3x² cos(x³)', 'cos(x³) / (3x²)', '-cos(x³)'],
    correctIndex: 0,
    explanation:
      'Let u = sin(x³) and v = x³. Then du/dx = cos(x³) · 3x² and dv/dx = 3x². du/dv = (du/dx)/(dv/dx) = [3x² cos(x³)] / [3x²] = cos(x³). The inner derivative 3x² cancels cleanly.',
    hints: [
      'Define a common variable x, then compute du/dx and dv/dx.',
      'Apply chain rule: du/dx = cos(x³) · 3x²; dv/dx = 3x².',
      'Divide du/dx by dv/dx: the 3x² factors divide out, leaving cos(x³).',
    ],
    misconceptionIndex: 2,
  },

  // 4. Foundation - Drag Label (c12_math_046)
  {
    id: 'ch_04_tangent_normal_label',
    nodeId: NODE_C12_MATH_046,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Drag each geometric property to its corresponding formula for curve y = f(x) at point (a, f(a)).',
    dragItems: [
      { label: "Tangent Slope m_t = f'(a)", targetId: 'box_tangent_slope' },
      { label: "Normal Slope m_n = -1/f'(a)", targetId: 'box_normal_slope' },
      { label: 'Tangent Line: y - f(a) = f\'(a)(x - a)', targetId: 'box_tangent_eq' },
      { label: 'Orthogonality: 1 + m1·m2 = 0', targetId: 'box_ortho_cond' },
    ],
    correctMapping: {
      box_tangent_slope: "Tangent Slope m_t = f'(a)",
      box_normal_slope: "Normal Slope m_n = -1/f'(a)",
      box_tangent_eq: 'Tangent Line: y - f(a) = f\'(a)(x - a)',
      box_ortho_cond: 'Orthogonality: 1 + m1·m2 = 0',
    },
    explanation:
      "The tangent slope is f'(a). The normal is perpendicular, so its slope is -1/f'(a). The point-slope form gives y - f(a) = m(x - a). Two curves are orthogonal when m1·m2 = -1.",
    hints: [
      'Tangent slope is given directly by the first derivative f\'(a).',
      'Normal slope is the negative reciprocal of the tangent slope.',
      'Two lines are perpendicular when the product of their slopes is -1 (1 + m1·m2 = 0).',
    ],
  },

  // 5. Foundation - Recall (c12_math_049)
  {
    id: 'ch_05_inv_diff',
    nodeId: NODE_C12_MATH_049,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Why is the arbitrary constant of integration (+ C) mandatory in evaluating indefinite integrals ∫ f(x) dx = F(x) + C?',
    options: [
      'Because d/dx(C) = 0, so infinitely many anti-derivatives share the identical derivative f(x)',
      'Because C represents the numerical area under the curve between 0 and 1',
      'Because the integral sign is undefined without a boundary condition',
      'Because C is required only when f(x) is a trigonometric function',
    ],
    correctIndex: 0,
    explanation:
      'Differentiation eliminates constant terms because d/dx(C) = 0. Thus F(x) + 1, F(x) - 7, and F(x) + C all have the derivative f(x). Omitting + C loses infinitely many valid solutions.',
    hints: [
      'What happens when you differentiate any constant number like 5 or -100?',
      'The derivative of any constant is zero: d/dx(C) = 0.',
      'Since differentiation wipes out constants, reversing it requires adding an arbitrary constant + C.',
    ],
    misconceptionIndex: 3,
  },

  // 6. Foundation - Numeric (c12_math_043)
  {
    id: 'ch_06_second_deriv_poly',
    nodeId: NODE_C12_MATH_043,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question:
      'For displacement y = x⁴ - 2x³ + 5, calculate the second-order derivative d²y/dx² at x = 2.',
    correctAnswer: 24,
    tolerance: 0.1,
    unit: 'units',
    explanation:
      'First derivative: dy/dx = 4x³ - 6x². Second derivative: d²y/dx² = 12x² - 12x. At x = 2: 12(4) - 12(2) = 48 - 24 = 24.',
    hints: [
      'Find dy/dx first using the power rule d/dx(xⁿ) = n·xⁿ⁻¹.',
      'dy/dx = 4x³ - 6x². Now differentiate this result again with respect to x.',
      'd²y/dx² = 12x² - 12x. Substitute x = 2: 12(4) - 12(2) = 24.',
    ],
  },

  // 7. Foundation - Application (c12_math_050)
  {
    id: 'ch_07_std_integral_cos',
    nodeId: NODE_C12_MATH_050,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question:
      'Evaluate the standard indefinite integral: ∫ (sin x - 3e^x + 4/x) dx for x > 0.',
    options: [
      '-cos x - 3e^x + 4 ln(x) + C',
      'cos x - 3e^x + 4 ln(x) + C',
      '-cos x - 3e^x - 4/x² + C',
      '-cos x + 3e^x + 4 ln(x) + C',
    ],
    correctIndex: 0,
    explanation:
      '∫ sin x dx = -cos x + C (watch the negative sign!). ∫ -3e^x dx = -3e^x. ∫ 4/x dx = 4 ln|x|. Combining linearly gives -cos x - 3e^x + 4 ln|x| + C.',
    hints: [
      'Recall: d/dx(-cos x) = sin x, so ∫ sin x dx = -cos x.',
      'The exponential e^x is its own anti-derivative: ∫ e^x dx = e^x.',
      '∫ (1/x) dx = ln|x|. Combine terms with a single + C at the end.',
    ],
    misconceptionIndex: 4,
  },

  // 8. Standard - Application (c12_math_044)
  {
    id: 'ch_08_ripple_rate',
    nodeId: NODE_C12_MATH_044,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A sensor wave ripple expands on a radar screen such that its radius grows at dr/dt = 4 cm/s. At what rate is the area increasing when r = 5 cm? (Enter value in terms of π coefficient, i.e., if answer is 40π, enter 40)',
    correctAnswer: 40,
    tolerance: 0.1,
    unit: 'π cm²/s',
    explanation:
      'Area A = πr². Differentiating w.r.t time t: dA/dt = 2πr · (dr/dt). Substituting r = 5 and dr/dt = 4 gives dA/dt = 2π(5)(4) = 40π cm²/s.',
    hints: [
      'Write the geometric formula connecting Area and radius: A = πr².',
      'Apply the time-derivative chain rule: dA/dt = (dA/dr) · (dr/dt) = 2πr · (dr/dt).',
      'Substitute r = 5 cm and dr/dt = 4 cm/s: dA/dt = 2π(5)(4) = 40π cm²/s.',
    ],
  },

  // 9. Standard - Analysis (c12_math_045)
  {
    id: 'ch_09_inc_dec_intervals',
    nodeId: NODE_C12_MATH_045,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'For f(x) = 2x³ - 9x² + 12x + 1, on which interval is the function strictly decreasing?',
    options: ['(1, 2)', '(-∞, 1)', '(2, ∞)', '(-∞, 1) ∪ (2, ∞)'],
    correctIndex: 0,
    explanation:
      "f'(x) = 6x² - 18x + 12 = 6(x² - 3x + 2) = 6(x - 1)(x - 2). Critical points are x = 1 and x = 2. For x ∈ (1, 2), f'(x) < 0 (e.g. at x = 1.5, f' = 6(0.5)(-0.5) = -1.5 < 0), so f is strictly decreasing on (1, 2).",
    hints: [
      'Find the first derivative f\'(x) and factorize it completely.',
      'f\'(x) = 6(x - 1)(x - 2). Critical points partition the line at x = 1 and x = 2.',
      'Test a point between 1 and 2, such as x = 1.5: (1.5-1)(1.5-2) < 0, meaning f\'(x) < 0 (decreasing).',
    ],
  },

  // 10. Standard - Drag Sort (c12_math_048)
  {
    id: 'ch_10_opt_steps',
    nodeId: NODE_C12_MATH_048,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Arrange the systematic steps for solving an ISC real-world Optimization (Maxima/Minima) problem in correct order.',
    sortItems: [
      'Identify objective quantity & express in a single variable using constraints',
      'Differentiate to find critical points by solving f\'(x) = 0 in domain',
      'Compute second derivative f\'\'(x) and evaluate at critical points',
      'Verify f\'\'(c) < 0 (max) or f\'\'(c) > 0 (min) and calculate optimum value',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "Optimization requires: (1) Single-variable objective formulation, (2) Solving f'(x) = 0 for critical candidates, (3) Computing f''(x), and (4) Second-derivative classification and state final answer with units.",
    hints: [
      'First reduce the problem to one variable using physical constraints.',
      'Next find critical points where the first derivative equals zero.',
      'Compute the second derivative to test concavity and verify max/min.',
    ],
  },

  // 11. Standard - Application (c12_math_047)
  {
    id: 'ch_11_closed_interval_extrema',
    nodeId: NODE_C12_MATH_047,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Find the absolute maximum value of f(x) = 2x³ - 15x² + 36x + 1 on the closed interval [1, 5].',
    options: ['56 (at endpoint x = 5)', '29 (at critical point x = 2)', '28 (at critical point x = 3)', '24 (at endpoint x = 1)'],
    correctIndex: 0,
    explanation:
      "f'(x) = 6x² - 30x + 36 = 6(x - 2)(x - 3). Critical points inside (1, 5) are x = 2, 3. Evaluate: f(1) = 24, f(2) = 29, f(3) = 28, f(5) = 2(125) - 15(25) + 36(5) + 1 = 250 - 375 + 180 + 1 = 56. The absolute maximum is 56 at the endpoint x = 5.",
    hints: [
      'Find critical points in the open interval (1, 5) by solving f\'(x) = 0.',
      'Evaluate f(x) at critical points x = 2 and x = 3, AND at endpoints x = 1 and x = 5.',
      'Compare f(1)=24, f(2)=29, f(3)=28, and f(5)=56. The largest is 56.',
    ],
    misconceptionIndex: 1,
  },

  // 12. Standard - Analysis (c12_math_046)
  {
    id: 'ch_12_angle_curves',
    nodeId: NODE_C12_MATH_046,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Find the acute angle θ between the parabolas y = x² and x = y² at their point of intersection (1, 1).',
    options: [
      'θ = arctan(3/4)',
      'θ = arctan(1/7)',
      'θ = π/2 (Orthogonal)',
      'θ = arctan(4/3)',
    ],
    correctIndex: 0,
    explanation:
      "For y = x², dy/dx = 2x ⇒ m1 = 2 at (1,1). For x = y², 1 = 2y(dy/dx) ⇒ dy/dx = 1/(2y) ⇒ m2 = 1/2 at (1,1). tan(θ) = |(m1 - m2)/(1 + m1·m2)| = |(2 - 1/2)/(1 + 2·(1/2))| = (3/2)/2 = 3/4. Thus θ = arctan(3/4).",
    hints: [
      'Find slope m1 of y = x² at x = 1.',
      'Find slope m2 of x = y² at (1, 1) by implicit differentiation.',
      'Use the angle formula tan θ = |(m1 - m2) / (1 + m1·m2)| = |(2 - 0.5) / (1 + 1)| = 1.5 / 2 = 3/4.',
    ],
  },

  // 13. Standard - Construct (c12_math_050)
  {
    id: 'ch_13_construct_trig_int',
    nodeId: NODE_C12_MATH_050,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Construct the anti-derivative formula for ∫ sin²(x) dx by selecting the correct algebraic terms.',
    availableParts: ['x/2', '-', '+', '(sin 2x)/4', '(cos 2x)/4', 'x', '+ C'],
    targetState: 'x/2 - (sin 2x)/4 + C',
    validationHint:
      'Recall the power-reduction identity sin²(x) = (1 - cos 2x)/2 and integrate term by term.',
    explanation:
      '∫ sin²(x) dx = ∫ (1 - cos 2x)/2 dx = (1/2)∫ 1 dx - (1/2)∫ cos 2x dx = x/2 - (sin 2x)/4 + C.',
    hints: [
      'Use identity sin²(x) = (1 - cos 2x)/2.',
      'Integrate 1/2 to get x/2.',
      'Integrate -(cos 2x)/2 to get -(sin 2x)/4, and append + C.',
    ],
  },

  // 14. Standard - Application (c12_math_043)
  {
    id: 'ch_14_diff_eq_verify',
    nodeId: NODE_C12_MATH_043,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'For y = e^(2x) sin(3x), which second-order differential equation is satisfied identically by y?',
    options: [
      'd²y/dx² - 4(dy/dx) + 13y = 0',
      'd²y/dx² + 4(dy/dx) + 13y = 0',
      'd²y/dx² - 2(dy/dx) + 9y = 0',
      'd²y/dx² - 4(dy/dx) - 13y = 0',
    ],
    correctIndex: 0,
    explanation:
      "dy/dx = 2e^(2x) sin(3x) + 3e^(2x) cos(3x). d²y/dx² = 4e^(2x) sin(3x) + 6e^(2x) cos(3x) + 6e^(2x) cos(3x) - 9e^(2x) sin(3x) = -5e^(2x) sin(3x) + 12e^(2x) cos(3x). Then d²y/dx² - 4(dy/dx) + 13y = [-5y/sin(3x) + 12cos...] - 4[2y + 3e^(2x)cos(3x)] + 13y = 0.",
    hints: [
      'Use product rule to compute dy/dx = e^(2x)[2 sin(3x) + 3 cos(3x)].',
      'Differentiate again using product rule to find d²y/dx².',
      'Substitute dy/dx and d²y/dx² into d²y/dx² - 4(dy/dx) + 13y and observe that both sine and cosine terms cancel to 0.',
    ],
  },

  // 15. Advanced - Analysis (c12_math_041)
  {
    id: 'ch_15_cycloid_slope',
    nodeId: NODE_C12_MATH_041,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'For the cycloid x = a(θ - sin θ), y = a(1 - cos θ), find the slope dy/dx simplified using half-angle trigonometric identities.',
    options: ['cot(θ/2)', 'tan(θ/2)', '-cot(θ/2)', '-tan(θ/2)'],
    correctIndex: 0,
    explanation:
      'dy/dθ = a sin θ and dx/dθ = a(1 - cos θ). dy/dx = (a sin θ)/[a(1 - cos θ)] = [2 sin(θ/2) cos(θ/2)] / [2 sin²(θ/2)] = cos(θ/2)/sin(θ/2) = cot(θ/2).',
    hints: [
      'Compute dy/dθ = a sin θ and dx/dθ = a(1 - cos θ).',
      'Use half-angle identities: sin θ = 2 sin(θ/2) cos(θ/2) and 1 - cos θ = 2 sin²(θ/2).',
      'Form the ratio and cancel 2 sin(θ/2) from numerator and denominator to get cot(θ/2).',
    ],
  },

  // 16. Advanced - Application (c12_math_048)
  {
    id: 'ch_16_open_box_max_vol',
    nodeId: NODE_C12_MATH_048,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'An open metal box is made from a square sheet of side a = 18 cm by cutting equal squares of side x from each corner. What corner cutout length x (in cm) maximizes the box volume?',
    correctAnswer: 3,
    tolerance: 0.05,
    unit: 'cm',
    explanation:
      "V(x) = x(18 - 2x)². Domain: 0 < x < 9. V'(x) = (18 - 2x)(18 - 6x) = 0 ⇒ x = 9 (boundary) or x = 3 cm. V''(x) = -192 + 24x ⇒ V''(3) = -192 + 72 = -120 < 0 (confirmed Local Maximum).",
    hints: [
      'Volume V = x · (18 - 2x)².',
      'Differentiate: V\'(x) = (18 - 2x)(18 - 6x).',
      'Set 18 - 6x = 0 to find the interior critical point x = 3 cm.',
    ],
  },

  // 17. Advanced - Evaluation (c12_math_042)
  {
    id: 'ch_17_eval_diff_wrt',
    nodeId: NODE_C12_MATH_042,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Differentiate u = tan⁻¹( (2x)/(1 - x²) ) with respect to v = sin⁻¹( (2x)/(1 + x²) ) for |x| < 1.',
    options: [
      'du/dv = 1 (Both represent 2 tan⁻¹(x), so their relative rate of change is 1)',
      'du/dv = 2/(1 + x²)',
      'du/dv = (1 - x²)/(1 + x²)',
      'du/dv = -1',
    ],
    correctIndex: 0,
    explanation:
      'For |x| < 1, substitution x = tan θ reveals u = 2 tan⁻¹(x) and v = 2 tan⁻¹(x). Thus du/dx = 2/(1+x²) and dv/dx = 2/(1+x²). du/dv = (du/dx)/(dv/dx) = 1.',
    hints: [
      'Use inverse trigonometric standard substitutions: let x = tan θ.',
      'Notice that tan⁻¹(2 tan θ / (1 - tan²θ)) = 2θ = 2 tan⁻¹ x.',
      'Notice that sin⁻¹(2 tan θ / (1 + tan²θ)) = sin⁻¹(sin 2θ) = 2θ = 2 tan⁻¹ x. Since u = v, du/dv = 1.',
    ],
  },

  // 18. Advanced - Application (c12_math_044)
  {
    id: 'ch_18_conical_tank_leak',
    nodeId: NODE_C12_MATH_044,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'Water pours into an inverted cone (semi-vertical angle 45°, so r = h) at 12π cm³/s. At what rate (in cm/s) is the water depth h rising when depth h = 6 cm? (Enter numerical value)',
    correctAnswer: 0.33,
    tolerance: 0.05,
    unit: 'cm/s',
    explanation:
      'V = (1/3)πr²h = (π/3)h³. Differentiating w.r.t time: dV/dt = πh² · (dh/dt). Given dV/dt = 12π and h = 6: 12π = π(36) · (dh/dt) ⇒ dh/dt = 12/36 = 1/3 ≈ 0.33 cm/s.',
    hints: [
      'Since semi-vertical angle is 45°, tan 45° = r/h = 1 ⇒ r = h.',
      'Volume in single variable: V = (π/3)h³.',
      'dV/dt = πh² (dh/dt). Substitute dV/dt = 12π and h = 6: 12π = 36π(dh/dt) ⇒ dh/dt = 1/3 cm/s.',
    ],
  },

  // 19. Advanced - Analysis (c12_math_047)
  {
    id: 'ch_19_rational_monotonicity',
    nodeId: NODE_C12_MATH_045,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Evaluate student Arjun’s claim: "Because f\'(x) = -1/x² < 0 for all x ≠ 0, f(x) = 1/x is strictly decreasing on (-∞, 0) ∪ (0, ∞)." Is this claim mathematically valid?',
    options: [
      'Invalid: f(x) is decreasing on (-∞, 0) and (0, ∞) separately, but not on their union because f(-1) = -1 < 1 = f(1)',
      'Valid: Negative derivative everywhere in domain guarantees strict decrease across all unions',
      'Invalid: Because 1/x has a horizontal tangent at infinity',
      'Valid: Because 1/x is continuous at x = 0',
    ],
    correctIndex: 0,
    explanation:
      'The Mean Value Theorem requires continuity on a connected interval. At x = -1 < 1, f(-1) = -1 < f(1) = 1, which violates the monotonic decreasing definition f(x1) > f(x2) for x1 < x2 across the discontinuity.',
    hints: [
      'Check definition of decreasing: if x1 < x2, then f(x1) must be > f(x2).',
      'Pick x1 = -1 and x2 = 1. Is f(-1) > f(1)?',
      'f(-1) = -1 and f(1) = 1. Since -1 is NOT greater than 1, f is NOT decreasing across the union of disconnected intervals.',
    ],
    misconceptionIndex: 0,
  },

  // 20. Advanced - Creativity (c12_math_048)
  {
    id: 'ch_20_inscribed_cone_sphere',
    nodeId: NODE_C12_MATH_048,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'ISRO engineers design a conical nose-cone inscribed in a spherical payload fairing of radius R. What cone height h maximizes payload volume?',
    options: [
      'h = (4/3) R',
      'h = (3/2) R',
      'h = (2/3) R',
      'h = R',
    ],
    correctIndex: 0,
    explanation:
      "r² = R² - (h - R)² = 2Rh - h². Volume V = (π/3)r²h = (π/3)(2Rh² - h³). V'(h) = (π/3)(4Rh - 3h²) = 0 ⇒ h = 4R/3. V''(4R/3) = (π/3)(4R - 8R) = -4πR/3 < 0 (Maximum confirmed).",
    hints: [
      'Express base radius squared in terms of sphere radius R and height h: r² = 2Rh - h².',
      'Substitute into cone volume: V = (π/3)(2Rh² - h³).',
      'Differentiate w.r.t h and set to zero: 4Rh - 3h² = 0 ⇒ h = 4R/3.',
    ],
  },

  // 21. Advanced - Application (c12_math_050)
  {
    id: 'ch_21_linear_composite_int',
    nodeId: NODE_C12_MATH_050,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'Evaluate ∫ (3x + 2)⁴ dx = (3x + 2)⁵ / k + C. What is the exact integer value of the denominator coefficient k?',
    correctAnswer: 15,
    tolerance: 0.1,
    unit: '',
    explanation:
      'Reversing the chain rule: ∫ (ax + b)ⁿ dx = (ax + b)ⁿ⁺¹ / [a(n + 1)] + C. Here a = 3 and n = 4, so denominator k = 3 × (4 + 1) = 3 × 5 = 15.',
    hints: [
      'Recall the composite linear rule: ∫ (ax + b)ⁿ dx = (ax + b)ⁿ⁺¹ / [a(n+1)] + C.',
      'Identify a = 3, n = 4, and n + 1 = 5.',
      'Multiply a by (n + 1): k = 3 × 5 = 15.',
    ],
    misconceptionIndex: 0,
  },

  // 22. Advanced - Evaluation (c12_math_048)
  {
    id: 'ch_22_second_deriv_test_critique',
    nodeId: NODE_C12_MATH_048,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      "A student tests f(x) = x⁴ at x = 0, finds f''(0) = 0, and concludes that x = 0 is NOT a local extremum. Critically evaluate this conclusion.",
    options: [
      "Incorrect: f''(0) = 0 is inconclusive. The first derivative test shows f'(x) changes from negative to positive, proving x = 0 is a local minimum.",
      "Correct: If f''(0) = 0, the curve is flat and can never have a minimum or maximum.",
      "Incorrect: Because f''(0) = 0 always proves that x = 0 is a point of inflection.",
      "Correct: Because x⁴ is symmetric about the y-axis.",
    ],
    correctIndex: 0,
    explanation:
      "f''(c) = 0 makes the second derivative test inconclusive, NOT non-extremal. For f(x) = x⁴, f'(x) = 4x³ is negative for x < 0 and positive for x > 0, so x = 0 is clearly an absolute and local minimum.",
    hints: [
      'What does f\'\'(c) = 0 really tell us in the second derivative test?',
      'Recall: f\'\'(c) = 0 is inconclusive; you must fall back to the first derivative test.',
      'Check f\'(x) = 4x³ around x = 0: it flips from negative to positive, which defines a local minimum.',
    ],
    misconceptionIndex: 0,
  },
];

// ─── PROPS INTERFACE ────────────────────────────────────────────────────────
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

// ─── DEFAULT PROPS ──────────────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_MATH_041,
  title: 'Derivatives of Parametric Functions & Applications of Calculus',
  definition:
    'Parametric differentiation computes dy/dx = (dy/dt)/(dx/dt) for curves defined as x(t), y(t). Calculus applications encompass rates of change, tangents/normals, monotonic intervals, maxima/minima optimization, and anti-derivative integration as the inverse process.',
  eli5:
    'Think of flying a drone with a joystick dial t. Dial t moves the drone horizontal distance x(t) and vertical altitude y(t). The path slope is just (vertical speed) / (horizontal speed). Integration is the rewind button that rebuilds distance from speed.',
  misconceptions: [
    {
      misconception: 'To find dy/dx for parametric x(t), y(t), differentiate y w.r.t x directly by treating t as x.',
      correction: 'You must compute dy/dt and dx/dt separately and form the quotient (dy/dt)/(dx/dt), provided dx/dt ≠ 0.',
    },
    {
      misconception: 'The slope of the normal line is simply the same as the tangent slope f\'(a).',
      correction: 'The normal is perpendicular to the tangent, so its slope is the negative reciprocal: m_n = -1/f\'(a).',
    },
    {
      misconception: 'If f\'\'(c) = 0, the point c cannot be a maximum or a minimum.',
      correction: 'f\'\'(c) = 0 makes the 2nd derivative test inconclusive. Use the 1st derivative sign test (e.g. y = x⁴ has min at 0).',
    },
    {
      misconception: 'The constant of integration + C is optional in indefinite integrals.',
      correction: '+ C is mandatory because d/dx(C) = 0; omitting it discards an infinite family of valid anti-derivatives.',
    },
    {
      misconception: '∫ (ax + b)ⁿ dx is simply (ax + b)ⁿ⁺¹ / (n + 1) + C without dividing by a.',
      correction: 'Reversing the chain rule requires dividing by the inner derivative a, yielding (ax + b)ⁿ⁺¹ / [a(n + 1)] + C.',
    },
  ],
  diagnosticQuestions: [
    { question: 'If x = t², y = t³, what is dy/dx at t = 2?', options: ['3', '1.5', '6', '12'], correctIndex: 0 },
    { question: 'What is the slope of the normal to y = x² at x = 2?', options: ['-1/4', '4', '-4', '1/4'], correctIndex: 0 },
    { question: 'If f\'(c) = 0 and f\'\'(c) < 0, what is point c?', options: ['Local Maximum', 'Local Minimum', 'Point of Inflection', 'Discontinuity'], correctIndex: 0 },
    { question: 'Evaluate ∫ cos(3x) dx.', options: ['(sin 3x)/3 + C', '-3 sin(3x) + C', 'sin(3x) + C', '-(sin 3x)/3 + C'], correctIndex: 0 },
    { question: 'A circle radius grows at 2 cm/s. At r = 3 cm, area grows at:', options: ['12π cm²/s', '6π cm²/s', '4π cm²/s', '36π cm²/s'], correctIndex: 0 },
    { question: 'Differentiate sin(x²) w.r.t x².', options: ['cos(x²)', '2x cos(x²)', 'cos(x²)/(2x)', '-cos(x²)'], correctIndex: 0 },
    { question: 'The function f(x) = x³ - 3x is strictly decreasing on:', options: ['(-1, 1)', '(-∞, -1)', '(1, ∞)', '(-∞, ∞)'], correctIndex: 0 },
    { question: 'For f(x) = x⁴, at x = 0, f\'\'(0) = 0. The point x = 0 is a:', options: ['Local Minimum', 'Local Maximum', 'Inflection only', 'Vertical Asymptote'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery across ISC Class 12 Parametric Derivatives, Tangents/Normals, Optimization, and Standard Integrals.',
};

// ─── INTERACTIVE EXPLORATION STEPS ──────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Parametric Rocket Flight & Tangent Slope',
    instruction: 'Scrub time parameter t to observe velocity vectors dx/dt, dy/dt and live tangent slope dy/dx.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MATH_041,
  },
  {
    title: 'Differentiation of Function w.r.t Another',
    instruction: 'Manipulate x to compare du/dx and dv/dx, observing how inner derivative cancels in du/dv.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MATH_042,
  },
  {
    title: 'Tangents, Normals & Orthogonality',
    instruction: 'Select a point on the parabola to watch the tangent and perpendicular normal line update in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MATH_046,
  },
  {
    title: 'Maxima, Minima & Second Derivative Test',
    instruction: 'Adjust x along the cubic curve to track f\'(x) (slope) and f\'\'(x) (concavity) at peaks and valleys.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MATH_048,
  },
  {
    title: 'Integration as Inverse Differentiation (+ C)',
    instruction: 'Shift the constant of integration C to visualize the entire family of parallel anti-derivative curves.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_MATH_049,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ─────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: For trajectory x = t², y = t³, as time t increases from 1 to 4, what happens to the slope dy/dx = (3t)/2?',
    options: [
      'Slope increases linearly with time t',
      'Slope remains constant',
      'Slope decreases toward zero',
      'Slope oscillates sinusoidally',
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag time slider t from 1 to 4 and observe the tangent line steepening continuously.',
    nodeId: NODE_C12_MATH_041,
  },
  {
    question: 'Predict: At a local maximum of a smooth curve f(x), what must be the sign of the second derivative f\'\'(x)?',
    options: [
      'Negative (f\'\'(x) < 0, concave downwards dome)',
      'Positive (f\'\'(x) > 0, concave upwards bowl)',
      'Zero always',
      'Undefined',
    ],
    correctIndex: 0,
    verifyInstruction: 'Scrub x to the local crest at x = -1 in the cubic lab to confirm f\'\'(-1) = -6 < 0.',
    nodeId: NODE_C12_MATH_048,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the product of tangent slope m_t and normal slope m_n at any point where f\'(x) ≠ 0?',
    observableOptions: [
      'm_t · m_n = -1 always (Perpendicularity condition)',
      'm_t · m_n = +1 always',
      'm_t + m_n = 0',
      'm_t / m_n = 1',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_MATH_046,
  },
  {
    question: 'What do you observe about the slopes of all anti-derivative curves y = x³ + C at the same vertical line x = 2?',
    observableOptions: [
      'All curves have the EXACT same slope dy/dx = 12 regardless of C value',
      'Curves with larger C have much steeper slopes',
      'Curves with negative C have negative slopes',
      'Slope depends only on C and not on x',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_MATH_049,
  },
];

// ─── REAL WORLD ACTIVITY ────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Telemetry Flight Trajectory Design',
  description:
    'Using what you mastered, design an optimal launch profile for a launch vehicle: formulate parametric equations x(t) and y(t), identify the max q-pressure point using derivatives, and compute orbital cutoff altitude using anti-differentiation.',
  steps: [
    'Choose parametric ascent equations: x(t) = 50 t² and y(t) = 20 t³ (t in seconds).',
    'Calculate the climb slope dy/dx = (dy/dt)/(dx/dt) at t = 10s and t = 60s.',
    'Formulate fuel tank weight vs volume optimization using the second derivative test.',
    'Integrate stage-2 acceleration a(t) = 15 - 0.2t to compute velocity v(t) with initial velocity v(0) = 2400 m/s.',
  ],
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM 1: PARAMETRIC ROCKET TRAJECTORY & VECTOR DECOMPOSITION ───
function ParametricTrajectorySVG({ tVal }: { tVal: number }) {
  const tNorm = Math.max(0.5, Math.min(3.5, Math.abs(tVal) || 1.8));
  const posX = 40 + tNorm * 75;
  const posY = 200 - Math.pow(tNorm, 1.8) * 22;
  const dx = 2 * tNorm * 12;
  const dy = -1.8 * Math.pow(tNorm, 0.8) * 22;
  const slope = (-dy / dx).toFixed(2);

  return (
    <svg viewBox="0 0 420 230" className="w-full h-auto rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
      <defs>
        <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#10b981" />
        </marker>
        <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#38bdf8" />
        </marker>
        <marker id="arrow-rose" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#f43f5e" />
        </marker>
        <linearGradient id="curveGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      {/* Grid Lines & Coordinate Axes */}
      <line x1="40" y1="20" x2="40" y2="200" stroke="#475569" strokeWidth="1.5" />
      <line x1="40" y1="200" x2="390" y2="200" stroke="#475569" strokeWidth="1.5" />
      <text x="395" y="204" fill="#94a3b8" fontSize="11" fontFamily="monospace">x(t)</text>
      <text x="32" y="16" fill="#94a3b8" fontSize="11" fontFamily="monospace">y(t)</text>

      {/* Trajectory Curve */}
      <path
        d="M 40,200 Q 150,195 240,140 T 360,40"
        fill="none"
        stroke="url(#curveGrad)"
        strokeWidth="3.5"
      />

      {/* Tangent Line through current point */}
      <line
        x1={posX - 45}
        y1={posY - 45 * (-dy / dx)}
        x2={posX + 55}
        y2={posY + 55 * (-dy / dx)}
        stroke="#fbbf24"
        strokeWidth="1.8"
        strokeDasharray="4 3"
      />

      {/* Horizontal velocity vector dx/dt */}
      <line
        x1={posX}
        y1={posY}
        x2={posX + dx}
        y2={posY}
        stroke="#38bdf8"
        strokeWidth="2.5"
        markerEnd="url(#arrow-blue)"
      />
      <text x={posX + dx / 2 - 12} y={posY + 14} fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">
        dx/dt
      </text>

      {/* Vertical velocity vector dy/dt */}
      <line
        x1={posX + dx}
        y1={posY}
        x2={posX + dx}
        y2={posY + dy}
        stroke="#10b981"
        strokeWidth="2.5"
        markerEnd="url(#arrow-green)"
      />
      <text x={posX + dx + 6} y={posY + dy / 2 + 4} fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="bold">
        dy/dt
      </text>

      {/* Resultant Tangent Velocity Vector */}
      <line
        x1={posX}
        y1={posY}
        x2={posX + dx}
        y2={posY + dy}
        stroke="#f43f5e"
        strokeWidth="2.5"
        markerEnd="url(#arrow-rose)"
      />
      <text x={posX + dx / 2 - 25} y={posY + dy / 2 - 8} fill="#f43f5e" fontSize="10" fontFamily="monospace" fontWeight="bold">
        v_tan
      </text>

      {/* Telemetry Target Dot */}
      <circle cx={posX} cy={posY} r="5.5" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />

      {/* Telemetry Overlay Box */}
      <rect x="230" y="15" width="175" height="52" rx="8" fill="#0f172a" fillOpacity="0.85" stroke="#334155" />
      <text x="240" y="32" fill="#e2e8f0" fontSize="10" fontFamily="monospace" fontWeight="bold">
        Parametric Telemetry:
      </text>
      <text x="240" y="47" fill="#fbbf24" fontSize="10" fontFamily="monospace">
        dy/dx = (dy/dt)/(dx/dt) = {slope}
      </text>
      <text x="240" y="60" fill="#94a3b8" fontSize="9" fontFamily="monospace">
        t = {tNorm.toFixed(2)}s | Rocket Heading
      </text>
    </svg>
  );
}

// ─── TOPIC-SPECIFIC SVG DIAGRAM 2: TANGENT & NORMAL ORTHOGONALITY ───────────
function TangentNormalOrthogonalitySVG({ xVal }: { xVal: number }) {
  const cx = 210;
  const cy = 180;
  const scale = 25;
  const clampX = Math.max(-2.2, Math.min(2.2, xVal || 1.2));
  const px = cx + clampX * scale;
  const py = cy - 0.45 * clampX * clampX * scale;

  const mt = 0.9 * clampX; // Tangent slope in SVG user space
  const mn = Math.abs(mt) > 0.05 ? -1 / mt : -10;

  return (
    <svg viewBox="0 0 420 220" className="w-full h-auto rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
      {/* Grid Axes */}
      <line x1="30" y1={cy} x2="390" y2={cy} stroke="#334155" strokeWidth="1.2" />
      <line x1={cx} y1="20" x2={cx} y2="205" stroke="#334155" strokeWidth="1.2" />
      <text x="395" y={cy + 4} fill="#64748b" fontSize="10" fontFamily="monospace">x</text>
      <text x={cx + 6} y="22" fill="#64748b" fontSize="10" fontFamily="monospace">y</text>

      {/* Parabola Curve y = 0.45 x² */}
      <path
        d={`M ${cx - 2.6 * scale},${cy - 0.45 * 2.6 * 2.6 * scale} Q ${cx},${cy} ${cx + 2.6 * scale},${cy - 0.45 * 2.6 * 2.6 * scale}`}
        fill="none"
        stroke="#818cf8"
        strokeWidth="3"
      />

      {/* Tangent Line (Green) */}
      <line
        x1={px - 70}
        y1={py + 70 * mt}
        x2={px + 70}
        y2={py - 70 * mt}
        stroke="#10b981"
        strokeWidth="2.5"
      />

      {/* Normal Line (Rose, Perpendicular) */}
      <line
        x1={px - 50}
        y1={py + 50 * mn}
        x2={px + 50}
        y2={py - 50 * mn}
        stroke="#f43f5e"
        strokeWidth="2.5"
      />

      {/* Point of Contact */}
      <circle cx={px} cy={py} r="5" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />

      {/* Orthogonality Right Angle Square Indicator */}
      <rect
        x={px + 2}
        y={py - 10}
        width="8"
        height="8"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1.2"
        transform={`rotate(${Math.atan(mt) * (180 / Math.PI)}, ${px}, ${py})`}
      />

      {/* Legend & Equation Badges */}
      <rect x="20" y="16" width="180" height="58" rx="8" fill="#0f172a" fillOpacity="0.88" stroke="#334155" />
      <text x="28" y="32" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="bold">
        Tangent: m_t = f'(a)
      </text>
      <text x="28" y="47" fill="#f43f5e" fontSize="10" fontFamily="monospace" fontWeight="bold">
        Normal: m_n = -1/f'(a)
      </text>
      <text x="28" y="62" fill="#fbbf24" fontSize="9" fontFamily="monospace">
        Orthogonality: m_t · m_n = -1
      </text>
    </svg>
  );
}

// ─── TOPIC-SPECIFIC SVG DIAGRAM 3: EXTREMA, CRITICAL POINTS & CONCAVITY ─────
function ExtremaConcavitySVG({ cubicVal }: { cubicVal: number }) {
  const normX = Math.max(-2, Math.min(2, cubicVal || 0));
  const cx = 210;
  const cy = 110;
  const scaleX = 45;
  const scaleY = 16;
  const currentPx = cx + normX * scaleX;
  const currentPy = cy - (Math.pow(normX, 3) - 3 * normX) * scaleY;
  const slope = 3 * normX * normX - 3;
  const fDoublePrime = 6 * normX;

  return (
    <svg viewBox="0 0 420 220" className="w-full h-auto rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
      {/* Coordinates */}
      <line x1="20" y1={cy} x2="400" y2={cy} stroke="#334155" strokeWidth="1.2" />
      <line x1={cx} y1="15" x2={cx} y2="205" stroke="#334155" strokeWidth="1.2" />

      {/* Cubic Curve f(x) = x³ - 3x */}
      <path
        d={`M 80,${cy - (-8 + 6) * scaleY} C 130,${cy - 2 * scaleY - 35} 140,${cy - 2 * scaleY} 165,${cy - 2 * scaleY} C 190,${cy - 2 * scaleY} 200,${cy} 210,${cy} C 220,${cy} 230,${cy + 2 * scaleY} 255,${cy + 2 * scaleY} C 280,${cy + 2 * scaleY} 290,${cy + 2 * scaleY + 35} 340,${cy - (8 - 6) * scaleY}`}
        fill="none"
        stroke="#a855f7"
        strokeWidth="3.2"
      />

      {/* Peak: Local Max (x = -1, y = 2) */}
      <circle cx={cx - 1 * scaleX} cy={cy - 2 * scaleY} r="5" fill="#38bdf8" />
      <line
        x1={cx - 1 * scaleX - 30}
        y1={cy - 2 * scaleY}
        x2={cx - 1 * scaleX + 30}
        y2={cy - 2 * scaleY}
        stroke="#38bdf8"
        strokeWidth="1.8"
        strokeDasharray="3 3"
      />
      <text x={cx - 1 * scaleX - 45} y={cy - 2 * scaleY - 8} fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">
        MAX (f'=0, f''&lt;0)
      </text>

      {/* Valley: Local Min (x = 1, y = -2) */}
      <circle cx={cx + 1 * scaleX} cy={cy + 2 * scaleY} r="5" fill="#10b981" />
      <line
        x1={cx + 1 * scaleX - 30}
        y1={cy + 2 * scaleY}
        x2={cx + 1 * scaleX + 30}
        y2={cy + 2 * scaleY}
        stroke="#10b981"
        strokeWidth="1.8"
        strokeDasharray="3 3"
      />
      <text x={cx + 1 * scaleX - 15} y={cy + 2 * scaleY + 18} fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">
        MIN (f'=0, f''&gt;0)
      </text>

      {/* Inflection Point at origin */}
      <circle cx={cx} cy={cy} r="4" fill="#f59e0b" />
      <text x={cx + 6} y={cy - 6} fill="#f59e0b" fontSize="8" fontFamily="monospace">
        Inflection (f''=0)
      </text>

      {/* Dynamic Inspector Point */}
      <circle cx={currentPx} cy={currentPy} r="6" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />
      <line
        x1={currentPx - 30}
        y1={currentPy + 30 * (slope * 0.35)}
        x2={currentPx + 30}
        y2={currentPy - 30 * (slope * 0.35)}
        stroke="#f43f5e"
        strokeWidth="2"
      />

      {/* Telemetry Status Box */}
      <rect x="230" y="16" width="175" height="54" rx="8" fill="#0f172a" fillOpacity="0.9" stroke="#334155" />
      <text x="240" y="32" fill="#e2e8f0" fontSize="10" fontFamily="monospace" fontWeight="bold">
        Extrema Sign Matrix:
      </text>
      <text x="240" y="47" fill="#fbbf24" fontSize="9" fontFamily="monospace">
        f'(x) = {slope.toFixed(2)} | Slope
      </text>
      <text x="240" y="60" fill={fDoublePrime > 0 ? '#10b981' : fDoublePrime < 0 ? '#38bdf8' : '#f59e0b'} fontSize="9" fontFamily="monospace">
        f''(x) = {fDoublePrime.toFixed(2)} | {fDoublePrime > 0 ? 'Concave UP' : fDoublePrime < 0 ? 'Concave DOWN' : 'Flat'}
      </text>
    </svg>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function C12_MathematicsDerivativesParametricFunctionsSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Multi-representation tab view state
  const [representationMode, setRepresentationMode] = useState<'equation' | 'graph' | 'table' | 'vector'>('graph');

  // Simulation parameters (5+ interactive variables)
  const [paramT, setParamT] = useState<number>(2); // for parametric lab
  const [xValFuncWrt, setXValFuncWrt] = useState<number>(1.2); // for function w.r.t function
  const [tangentX, setTangentX] = useState<number>(1.5); // for tangent/normal lab
  const [cubicX, setCubicX] = useState<number>(1.0); // for extrema lab
  const [intConstC, setIntConstC] = useState<number>(0); // for integration + C lab
  const [rippleRadius, setRippleRadius] = useState<number>(5); // for rate of change
  const [rippleRate, setRippleRate] = useState<number>(3); // dr/dt

  // Adaptive difficulty & mastery
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints & feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive challenge inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual effects
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 2D HTML Canvas Ref for real-time dynamic curve rendering
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECT: LOAD STORED MASTERY ON MOUNT ─────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── EFFECT: ADAPTIVE DIFFICULTY ON SCORE UPDATE ──────────────────────────
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

  // ─── EFFECT: DYNAMIC 2D CANVAS GRAPH RENDERING ───────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const ox = width / 2;
      const oy = height / 2;
      const scaleX = 35;
      const scaleY = 25;

      // Draw coordinate axes
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, oy);
      ctx.lineTo(width, oy);
      ctx.moveTo(ox, 0);
      ctx.lineTo(ox, height);
      ctx.stroke();

      // Draw grid tick labels
      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.fillText('x', width - 15, oy - 6);
      ctx.fillText('y', ox + 8, 15);

      // Render based on active slide or phase
      if (currentSlide === 0 || phase === 'sandbox') {
        // Parametric curve: x(t) = t², y(t) = 0.5 t³
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        let first = true;
        for (let t = -2.8; t <= 2.8; t += 0.05) {
          const px = ox + t * t * 15 - 40;
          const py = oy - 0.25 * Math.pow(t, 3) * 15;
          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();

        // Current param point & tangent line
        const curPx = ox + paramT * paramT * 15 - 40;
        const curPy = oy - 0.25 * Math.pow(paramT, 3) * 15;
        const dx_dt = 2 * paramT;
        const dy_dt = 0.75 * paramT * paramT;
        const slope = dx_dt !== 0 ? dy_dt / dx_dt : 999;

        // Tangent line
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(curPx - 60, curPy + (60 / 15) * slope * 15);
        ctx.lineTo(curPx + 60, curPy - (60 / 15) * slope * 15);
        ctx.stroke();
        ctx.setLineDash([]);

        // Rocket marker dot
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(curPx, curPy, 6, 0, 2 * Math.PI);
        ctx.fill();
      } else if (currentSlide === 2) {
        // Tangent & normal on parabola y = 0.5 x²
        ctx.strokeStyle = '#818cf8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let x = -4; x <= 4; x += 0.1) {
          const px = ox + x * scaleX;
          const py = oy - 0.5 * x * x * scaleY;
          if (x === -4) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        const curPx = ox + tangentX * scaleX;
        const curPy = oy - 0.5 * tangentX * tangentX * scaleY;
        const mt = tangentX; // dy/dx = x
        const mn = mt !== 0 ? -1 / mt : 0;

        // Tangent (Green)
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(curPx - 80, curPy + 80 * mt * (scaleY / scaleX));
        ctx.lineTo(curPx + 80, curPy - 80 * mt * (scaleY / scaleX));
        ctx.stroke();

        // Normal (Rose)
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(curPx - 80, curPy + 80 * mn * (scaleY / scaleX));
        ctx.lineTo(curPx + 80, curPy - 80 * mn * (scaleY / scaleX));
        ctx.stroke();

        // Marker
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(curPx, curPy, 5, 0, 2 * Math.PI);
        ctx.fill();
      } else if (currentSlide === 3) {
        // Cubic: y = x³ - 3x
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let x = -2.5; x <= 2.5; x += 0.05) {
          const px = ox + x * scaleX;
          const py = oy - (Math.pow(x, 3) - 3 * x) * scaleY;
          if (x === -2.5) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        const curPx = ox + cubicX * scaleX;
        const curPy = oy - (Math.pow(cubicX, 3) - 3 * cubicX) * scaleY;
        const slope = 3 * cubicX * cubicX - 3;

        // Tangent line
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(curPx - 60, curPy + 60 * slope * (scaleY / scaleX));
        ctx.lineTo(curPx + 60, curPy - 60 * slope * (scaleY / scaleX));
        ctx.stroke();

        // Marker
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(curPx, curPy, 6, 0, 2 * Math.PI);
        ctx.fill();
      } else if (currentSlide === 4) {
        // Anti-derivative family: y = x³/3 - x + C
        const colors = ['#0284c7', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];
        [-2, -1, 0, 1, 2].forEach((cVal, idx) => {
          ctx.strokeStyle = cVal === intConstC ? '#fbbf24' : colors[idx % colors.length];
          ctx.lineWidth = cVal === intConstC ? 3 : 1.2;
          ctx.beginPath();
          for (let x = -2.4; x <= 2.4; x += 0.05) {
            const px = ox + x * scaleX;
            const py = oy - ((Math.pow(x, 3) / 3 - x + cVal) * scaleY);
            if (x === -2.4) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentSlide, phase, paramT, tangentX, cubicX, intConstC]);

  // ─── CALLBACK HANDLERS (12+ MEMOIZED HANDLERS) ────────────────────────────
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding trajectory calculation!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive calculus laboratory. Let us explore parametric flight dynamics.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all calculus controls freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Mission challenges started. Put your calculus skills to the test!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the slider to test your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === 0;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation!' : 'Look closely at the live values.');
  }, []);

  const handleParamTSlider = useCallback((val: number) => {
    setParamT(val);
    audioManager.play('count');
    if (predictionMade && !predictionVerified) setPredictionVerified(true);
  }, [predictionMade, predictionVerified]);

  const handleTangentXSlider = useCallback((val: number) => {
    setTangentX(val);
    audioManager.play('count');
  }, []);

  const handleCubicXSlider = useCallback((val: number) => {
    setCubicX(val);
    audioManager.play('count');
  }, []);

  const handleIntConstCSlider = useCallback((val: number) => {
    setIntConstC(val);
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
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Flight trajectory mission completed with high distinction!');
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
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Method validated.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
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
          speechManager.speak('Let us review the step-by-step calculus derivation together.');
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

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Derived calculations for exploration visual feedback
  const paramDerivs = useMemo(() => {
    const dx_dt = 2 * paramT;
    const dy_dt = 3 * paramT * paramT;
    const slope = dx_dt !== 0 ? dy_dt / dx_dt : 0;
    return { dx_dt, dy_dt, slope };
  }, [paramT]);

  const funcWrtDerivs = useMemo(() => {
    const uVal = Math.sin(Math.pow(xValFuncWrt, 2));
    const vVal = Math.pow(xValFuncWrt, 2);
    const du_dx = 2 * xValFuncWrt * Math.cos(Math.pow(xValFuncWrt, 2));
    const dv_dx = 2 * xValFuncWrt;
    const du_dv = Math.cos(Math.pow(xValFuncWrt, 2));
    return { uVal, vVal, du_dx, dv_dx, du_dv };
  }, [xValFuncWrt]);

  const cubicDerivs = useMemo(() => {
    const yVal = Math.pow(cubicX, 3) - 3 * cubicX;
    const fPrime = 3 * cubicX * cubicX - 3;
    const fDoublePrime = 6 * cubicX;
    let classification = 'Inflection / Transitional';
    if (Math.abs(fPrime) < 0.15) {
      if (fDoublePrime > 0) classification = 'Local Minimum (Valley)';
      else if (fDoublePrime < 0) classification = 'Local Maximum (Crest)';
    } else {
      classification = fPrime > 0 ? 'Strictly Increasing' : 'Strictly Decreasing';
    }
    return { yVal, fPrime, fDoublePrime, classification };
  }, [cubicX]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
            <p className="text-xs text-indigo-400 font-semibold tracking-wide">
              ISC Class 12 Science & Engineering | Telemetry Calculus Suite
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700'
                : difficulty === 'standard'
                ? 'bg-indigo-950/80 text-indigo-400 border-indigo-700'
                : 'bg-rose-950/80 text-rose-400 border-rose-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs text-slate-300 font-medium">
            Score: <span className="font-bold text-amber-400">{Math.max(0, 100 - errors * 5)}%</span>
          </div>
        </div>
      </motion.header>

      {/* ─── MULTI-REPRESENTATION MATRIX BAR (EQUATION + GRAPH + TABLE + VECTOR) ── */}
      <div className="mb-6 p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Multi-Representation Matrix
            </span>
            <span className="text-[11px] text-slate-400">
              (Observe the same telemetry calculus concepts through 4 mathematical representations)
            </span>
          </div>
          <div className="flex gap-1.5">
            {(['graph', 'equation', 'table', 'vector'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setRepresentationMode(mode)}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                  representationMode === mode
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {mode} View
              </button>
            ))}
          </div>
        </div>

        {/* Representation Panel Content */}
        {representationMode === 'equation' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono p-3 bg-slate-950 rounded-xl border border-slate-800">
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-indigo-400 font-bold block mb-1">1. Parametric Chain Rule</span>
              <p className="text-slate-200">dy/dx = (dy/dt) ÷ (dx/dt)</p>
              <p className="text-slate-400 text-[10px] mt-1">Condition: dx/dt ≠ 0</p>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">2. Tangent & Normal Slope</span>
              <p className="text-slate-200">m_t = f'(a), m_n = -1/f'(a)</p>
              <p className="text-slate-400 text-[10px] mt-1">Orthogonality: m_t · m_n = -1</p>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">3. Second Derivative Extrema</span>
              <p className="text-slate-200">f'(c)=0 & f''(c)&lt;0 ⇒ Local MAX</p>
              <p className="text-slate-200">f'(c)=0 & f''(c)&gt;0 ⇒ Local MIN</p>
            </div>
          </div>
        )}

        {representationMode === 'table' && (
          <div className="overflow-x-auto p-2 bg-slate-950 rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-indigo-400 border-b border-slate-800">
                  <th className="p-2">Interval / Point</th>
                  <th className="p-2">f'(x) Sign</th>
                  <th className="p-2">f''(x) Sign</th>
                  <th className="p-2">Geometric Monotonicity</th>
                  <th className="p-2">Telemetry Classification</th>
                </tr>
              </thead>
              <tbody className="text-slate-300 divide-y divide-slate-800/60">
                <tr>
                  <td className="p-2">(-∞, -1)</td>
                  <td className="p-2 text-emerald-400">+ (Positive)</td>
                  <td className="p-2 text-rose-400">- (Negative)</td>
                  <td className="p-2">Strictly Increasing</td>
                  <td className="p-2">Ascending Climb</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-white">x = -1 (Critical Point)</td>
                  <td className="p-2 text-amber-400">0 (Zero Tangent)</td>
                  <td className="p-2 text-rose-400">-6 &lt; 0</td>
                  <td className="p-2 text-sky-400 font-bold">Local Maximum Crest</td>
                  <td className="p-2 text-sky-400">Peak Trajectory Apogee</td>
                </tr>
                <tr>
                  <td className="p-2">(-1, 1)</td>
                  <td className="p-2 text-rose-400">- (Negative)</td>
                  <td className="p-2 text-slate-400">Transitions at x=0</td>
                  <td className="p-2">Strictly Decreasing</td>
                  <td className="p-2">Descent Stage</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-white">x = 1 (Critical Point)</td>
                  <td className="p-2 text-amber-400">0 (Zero Tangent)</td>
                  <td className="p-2 text-emerald-400">+6 &gt; 0</td>
                  <td className="p-2 text-emerald-400 font-bold">Local Minimum Valley</td>
                  <td className="p-2 text-emerald-400">Valley Re-ignition</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {representationMode === 'graph' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-sky-400 block">SVG 1: Parametric Trajectory Curve</span>
              <ParametricTrajectorySVG tVal={paramT} />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 block">SVG 2: Orthogonal Tangent & Normal</span>
              <TangentNormalOrthogonalitySVG xVal={tangentX} />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-purple-400 block">SVG 3: Maxima, Minima & Concavity</span>
              <ExtremaConcavitySVG cubicVal={cubicX} />
            </div>
          </div>
        )}

        {representationMode === 'vector' && (
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <ParametricTrajectorySVG tVal={paramT} />
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-bold block mb-1">Vector Decomposition of Trajectory:</span>
                <p className="text-slate-300">Horizontal Velocity Vector: v_x = dx/dt = 2t</p>
                <p className="text-slate-300">Vertical Velocity Vector: v_y = dy/dt = 1.5t²</p>
                <p className="text-indigo-400 font-bold mt-1">Trajectory Slope: dy/dx = v_y / v_x</p>
              </div>
              <p className="text-slate-400 text-[11px]">
                The tangent line direction in spatial coordinates (x, y) is precisely the angle of the instantaneous velocity vector v = (dx/dt)î + (dy/dt)ĵ.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ──────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/60 to-slate-900/90 rounded-2xl border border-indigo-700/50 shadow-lg">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-1">
              Mission Scenario
            </span>
            <h2 className="text-xl font-extrabold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-2 italic bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-900/40">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
              Discovery Challenge (Pre-Lab Curiosity Hook)
            </span>
            <p className="text-base font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  className={`p-3.5 text-left text-sm rounded-xl border transition-all ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">({String.fromCharCode(65 + idx)})</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 space-y-4">
                <div
                  className={`p-3.5 rounded-xl text-sm border ${
                    discoveryCorrect
                      ? 'bg-emerald-950/50 border-emerald-600 text-emerald-300'
                      : 'bg-amber-950/50 border-amber-600 text-amber-300'
                  }`}
                >
                  {discoveryCorrect ? '✓ Exceptional intuition!' : '💡 Exploration insight:'}{' '}
                  {DISCOVERY_QUESTION.hintAfter}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  Enter Interactive Flight Dynamics Laboratory →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ───────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800 gap-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Lab Module {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-5"
            >
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-xs text-amber-300/90 font-medium mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── INTERACTIVE LAB VISUALIZATIONS ─── */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800/80">
                {/* Visual Canvas Viewport (7 cols) */}
                <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900/60 rounded-xl p-3 border border-slate-800 relative">
                  <canvas
                    ref={canvasRef}
                    width={480}
                    height={260}
                    className="w-full h-auto max-h-[260px] rounded-lg shadow-inner"
                  />
                  <span className="text-[10px] text-slate-500 mt-2 font-mono">
                    Real-time HTML5 2D Calculus Engine
                  </span>
                </div>

                {/* Interactive Controls & Live Telemetry (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                  {/* SLIDE 0: PARAMETRIC DERIVATIVES */}
                  {currentSlide === 0 && (
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs">
                        <div className="text-slate-400 font-mono">Curve: x(t) = t², y(t) = 0.5 t³</div>
                        <div className="text-emerald-400 font-mono font-bold">dx/dt = 2t = {paramDerivs.dx_dt.toFixed(2)}</div>
                        <div className="text-indigo-400 font-mono font-bold">dy/dt = 1.5 t² = {paramDerivs.dy_dt.toFixed(2)}</div>
                        <div className="text-amber-400 font-mono font-bold text-sm pt-1 border-t border-slate-800">
                          dy/dx = (dy/dt)/(dx/dt) = {paramDerivs.slope.toFixed(2)}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Time Parameter t:</span>
                          <span className="font-mono font-bold text-indigo-400">{paramT.toFixed(2)} s</span>
                        </div>
                        <input
                          type="range"
                          min={-2.5}
                          max={2.5}
                          step={0.1}
                          value={paramT}
                          onChange={(e) => handleParamTSlider(parseFloat(e.target.value))}
                          aria-label="Time Parameter t slider"
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>

                      {/* Predict-Then-Check Embedded in Slide 0 */}
                      {!predictionMade ? (
                        <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/40 space-y-2">
                          <p className="text-xs font-semibold text-indigo-200">{PREDICTION_QUESTIONS[0].question}</p>
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handlePrediction(i)}
                              className="w-full text-left p-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-xs text-emerald-300">
                          ✓ Prediction recorded! {PREDICTION_QUESTIONS[0].verifyInstruction}
                        </div>
                      )}
                    </div>
                  )}

                  {/* SLIDE 1: FUNCTION W.R.T ANOTHER */}
                  {currentSlide === 1 && (
                    <div className="space-y-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5 font-mono">
                        <div className="text-slate-400">u(x) = sin(x²), v(x) = x²</div>
                        <div className="text-indigo-300">du/dx = cos(x²) · 2x = {funcWrtDerivs.du_dx.toFixed(3)}</div>
                        <div className="text-sky-300">dv/dx = 2x = {funcWrtDerivs.dv_dx.toFixed(3)}</div>
                        <div className="text-emerald-400 font-bold border-t border-slate-800 pt-1">
                          du/dv = (du/dx)/(dv/dx) = cos(x²) = {funcWrtDerivs.du_dv.toFixed(3)}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Common Variable x:</span>
                          <span className="font-mono font-bold text-indigo-400">{xValFuncWrt.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min={0.2}
                          max={2.5}
                          step={0.1}
                          value={xValFuncWrt}
                          onChange={(e) => setXValFuncWrt(parseFloat(e.target.value))}
                          aria-label="Common Variable x slider"
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 italic">
                        Notice how the inner derivative 2x cancels out cleanly because both u and v share inner function x²!
                      </p>
                    </div>
                  )}

                  {/* SLIDE 2: TANGENT, NORMAL & ANGLE */}
                  {currentSlide === 2 && (
                    <div className="space-y-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5 font-mono">
                        <div className="text-slate-400">Curve: y = 0.5 x²</div>
                        <div className="text-emerald-400">
                          Tangent Slope m_t = x = {tangentX.toFixed(2)}
                        </div>
                        <div className="text-rose-400">
                          Normal Slope m_n = -1/x = {tangentX !== 0 ? (-1 / tangentX).toFixed(2) : 'Undefined'}
                        </div>
                        <div className="text-amber-400 font-bold border-t border-slate-800 pt-1">
                          Product m_t · m_n = {tangentX !== 0 ? (-1).toFixed(1) : '0'} (Orthogonal)
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Point of Contact x:</span>
                          <span className="font-mono font-bold text-indigo-400">{tangentX.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min={-3}
                          max={3}
                          step={0.1}
                          value={tangentX}
                          onChange={(e) => handleTangentXSlider(parseFloat(e.target.value))}
                          aria-label="Point of contact x slider"
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>

                      {/* Observation Question */}
                      {!observationAnswered ? (
                        <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                          <p className="text-[11px] font-semibold text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleObservation(i)}
                              className="w-full text-left p-1.5 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-2 bg-emerald-950/40 border border-emerald-800/40 rounded-lg text-[11px] text-emerald-300">
                          ✓ Correct! Perpendicular slopes always multiply to -1.
                        </div>
                      )}
                    </div>
                  )}

                  {/* SLIDE 3: MAXIMA / MINIMA CUBIC */}
                  {currentSlide === 3 && (
                    <div className="space-y-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 font-mono">
                        <div className="text-slate-400">Function: f(x) = x³ - 3x</div>
                        <div className="text-sky-400">f'(x) = 3x² - 3 = {cubicDerivs.fPrime.toFixed(2)}</div>
                        <div className="text-purple-400">f''(x) = 6x = {cubicDerivs.fDoublePrime.toFixed(2)}</div>
                        <div className="text-amber-400 font-bold border-t border-slate-800 pt-1">
                          State: {cubicDerivs.classification}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Inspect Point x:</span>
                          <span className="font-mono font-bold text-indigo-400">{cubicX.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min={-2.2}
                          max={2.2}
                          step={0.1}
                          value={cubicX}
                          onChange={(e) => handleCubicXSlider(parseFloat(e.target.value))}
                          aria-label="Inspect Point x slider"
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400">
                        At x = -1, f' = 0 and f'' = -6 &lt; 0 (Local Max). At x = 1, f' = 0 and f'' = +6 &gt; 0 (Local Min).
                      </p>
                    </div>
                  )}

                  {/* SLIDE 4: INTEGRATION & + C FAMILY */}
                  {currentSlide === 4 && (
                    <div className="space-y-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5 font-mono">
                        <div className="text-slate-400">Integrand: f(x) = x² - 1</div>
                        <div className="text-emerald-400">
                          ∫ (x² - 1) dx = x³/3 - x + C
                        </div>
                        <div className="text-amber-400 font-bold border-t border-slate-800 pt-1">
                          Selected Curve Constant: C = {intConstC}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Constant of Integration C:</span>
                          <span className="font-mono font-bold text-amber-400">{intConstC}</span>
                        </div>
                        <input
                          type="range"
                          min={-2}
                          max={2}
                          step={1}
                          value={intConstC}
                          onChange={(e) => handleIntConstCSlider(parseInt(e.target.value))}
                          aria-label="Constant of Integration C slider"
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Each curve in the family has the exact same tangent slope at any fixed x, differing only by vertical shift C!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Step Navigation */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-mono text-slate-400">
              Module {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-extrabold rounded-xl shadow-lg"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX / PLAYGROUND ────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Calculus Simulation Sandbox</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Free play mode with zero grading pressure. Manipulate the parameter sliders and watch real-time physics/geometry responses.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-lg"
              >
                I am Ready for Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <canvas
                  ref={canvasRef}
                  width={480}
                  height={280}
                  className="w-full h-auto rounded-lg shadow-inner"
                />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Parametric Telemetry Time (t):</span>
                    <span className="font-mono font-bold text-indigo-400">{paramT.toFixed(2)} s</span>
                  </div>
                  <input
                    type="range"
                    min={-2.5}
                    max={2.5}
                    step={0.05}
                    value={paramT}
                    onChange={(e) => handleParamTSlider(parseFloat(e.target.value))}
                    aria-label="Sandbox Time slider"
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Tangent Contact Point (x):</span>
                    <span className="font-mono font-bold text-emerald-400">{tangentX.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={-3}
                    max={3}
                    step={0.1}
                    value={tangentX}
                    onChange={(e) => handleTangentXSlider(parseFloat(e.target.value))}
                    aria-label="Sandbox Contact Point slider"
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Cubic Point Inspector (x):</span>
                    <span className="font-mono font-bold text-purple-400">{cubicX.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={-2.2}
                    max={2.2}
                    step={0.05}
                    value={cubicX}
                    onChange={(e) => handleCubicXSlider(parseFloat(e.target.value))}
                    aria-label="Sandbox Cubic Inspector slider"
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1 font-mono">
                  <div className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Live Telemetry Matrix</div>
                  <div className="text-sky-400">dy/dx (Parametric) = {paramDerivs.slope.toFixed(2)}</div>
                  <div className="text-emerald-400">Tangent Slope m_t = {tangentX.toFixed(2)}</div>
                  <div className="text-purple-400">Concavity f''(x) = {cubicDerivs.fDoublePrime.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ASSESSED CHALLENGES ──────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Progress Bar & Badges */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 font-mono">
                Competency: {challenge.competencyLevel.toUpperCase()}
              </span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Challenge Card */}
          <div
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 shadow-rose-950/50'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-950 text-indigo-300 text-[11px] font-mono font-bold border border-indigo-800">
                {challenge.nodeId}
              </span>
              <span className="text-xs text-slate-400 font-medium capitalize">
                Type: {challenge.type}
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-white mb-5 leading-snug">
              {challenge.question}
            </h2>

            {/* MCQ TYPE (classify / distinguish / match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.012 }}
                      whileTap={{ scale: 0.988 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-2xl border text-sm transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-emerald-950/50 shadow-md'
                          : showExplanation && i !== challenge.correctIndex
                          ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-2 text-indigo-400">({String.fromCharCode(65 + i)})</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2.5 p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-xl cursor-grab text-white text-xs font-semibold shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {['box_tangent_slope', 'box_normal_slope', 'box_tangent_eq', 'box_ortho_cond'].map((boxId) => (
                    <div
                      key={boxId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(boxId)}
                      className={`p-4 rounded-2xl border-2 border-dashed min-h-[70px] flex items-center justify-center text-center text-xs font-medium transition-all ${
                        droppedLabels[boxId]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      {droppedLabels[boxId] || `Drop target for: ${boxId.replace('box_', '').replace('_', ' ')}`}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-800 hover:bg-slate-700/90 rounded-2xl border border-slate-700 text-slate-200 text-xs flex items-center gap-3 cursor-grab shadow-sm"
                    >
                      <span className="w-6 h-6 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center font-bold text-indigo-300">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Confirm Ordering
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                  />
                  {challenge.unit && <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white text-xs font-mono rounded-lg shadow-sm"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700/80 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-indigo-600 rounded-lg text-white font-mono text-xs flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-300 hover:text-rose-100 font-bold"
                      >
                        ×
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click formula blocks above to assemble</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Validate Construction
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-700/60 rounded-2xl space-y-3.5 shadow-xl"
              >
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <span>💡</span>
                  <span>Step-by-Step Derivation & Verification:</span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans"
                      >
                        <span className="font-bold text-amber-400 font-mono mr-1.5">{idx + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow"
                    >
                      Show Next Derivation Step →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-xl shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Telemetry Assessment →'
                        : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: MISSION COMPLETION & MASTERY PROFILE ─────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl border border-indigo-700/60 shadow-2xl text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-3xl shadow-lg"
            >
              🚀
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Mission Certified!</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              You have completed the full ISC Class 12 Calculus & Trajectory Telemetry suite across all standard nodes.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <div className="px-5 py-3 bg-slate-900/80 rounded-2xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 block">Flight Dynamics Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="px-5 py-3 bg-slate-900/80 rounded-2xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 block">BKT Mastery Level</span>
                <span className="text-2xl font-black text-indigo-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK (MANDATORY EXACT ERROR TIERS) */}
          <div
            className={`p-5 rounded-2xl border text-center font-bold text-base sm:text-lg shadow-lg ${
              errors === 0
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : errors <= 3
                ? 'bg-indigo-950/80 border-indigo-500 text-indigo-300'
                : errors <= 7
                ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                : 'bg-rose-950/80 border-rose-500 text-rose-300'
            }`}
          >
            <span className="block text-xl sm:text-2xl mb-1 tracking-wide uppercase font-black">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </span>
            <p className="text-xs sm:text-sm font-normal opacity-90">
              {errors === 0
                ? 'Flawless mathematical execution across all 22 parametric derivatives, tangents, and optimization challenges!'
                : errors <= 3
                ? 'High accuracy achieved with minimal slips. Your calculus modeling skills are flight-ready.'
                : errors <= 7
                ? 'Solid foundational understanding. Practice the critical points sign tests to solidify concepts.'
                : 'Calculus mastery is built through iterative practice. Review the step-by-step guides and retry!'}
            </p>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span>
                <span>Identified Cognitive Misconceptions:</span>
              </h3>
              <div className="space-y-2.5">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-300 font-semibold">❌ Trap: {m.misconception}</div>
                      <div className="text-emerald-300">✓ Remediation: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Schedule */}
          <div className="p-5 bg-amber-950/40 rounded-2xl border border-amber-800/60 text-xs text-amber-200 space-y-1">
            <span className="font-bold text-amber-300 block text-sm">SM-2 Spaced Repetition Protocol:</span>
            <p>
              Based on your telemetry score, your next review session is scheduled in{' '}
              <span className="font-bold text-white underline">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </span>
              . Returning on schedule guarantees long-term retention for board and JEE examinations.
            </p>
          </div>

          {/* Reflection Prompts */}
          <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 space-y-2 text-xs">
            <span className="font-bold text-indigo-300 block text-sm">Self-Reflection Prompts:</span>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>How does the chain rule link horizontal speed, vertical speed, and spatial curve slope?</li>
              <li>Why does finding the second derivative f''(c) save computation time compared to sign charts?</li>
              <li>How is the arbitrary constant of integration + C connected to physical initial conditions?</li>
            </ul>
          </div>

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="list-decimal list-inside text-xs text-slate-400 space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ──────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Telemetry Check Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C12_MathematicsDerivativesParametricFunctionsSim };
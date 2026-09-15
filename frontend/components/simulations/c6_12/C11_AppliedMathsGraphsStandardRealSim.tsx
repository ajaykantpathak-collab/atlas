'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC APPLIED MATHS NODE IDS ───
const NODE_C11_APPMATH_011 = 'c11_appmath_011';
const NODE_C11_APPMATH_012 = 'c11_appmath_012';
const NODE_C11_APPMATH_013 = 'c11_appmath_013';
const NODE_C11_APPMATH_014 = 'c11_appmath_014';
const NODE_C11_APPMATH_015 = 'c11_appmath_015';
const NODE_C11_APPMATH_016 = 'c11_appmath_016';
const NODE_C11_APPMATH_017 = 'c11_appmath_017';
const NODE_C11_APPMATH_018 = 'c11_appmath_018';
const NODE_C11_APPMATH_019 = 'c11_appmath_019';
const NODE_C11_APPMATH_020 = 'c11_appmath_020';

const ALL_NODE_IDS = [
  NODE_C11_APPMATH_011,
  NODE_C11_APPMATH_012,
  NODE_C11_APPMATH_013,
  NODE_C11_APPMATH_014,
  NODE_C11_APPMATH_015,
  NODE_C11_APPMATH_016,
  NODE_C11_APPMATH_017,
  NODE_C11_APPMATH_018,
  NODE_C11_APPMATH_019,
  NODE_C11_APPMATH_020,
];

// ─── NARRATIVE REAL-WORLD SCENARIO ───
const SCENARIO = {
  title: 'Mission: Bengaluru Tech Hub Dynamics & ISRO Signal Radar',
  intro: 'You are the chief mathematical modeller for an aerospace & data telemetry hub in Bengaluru. From satellite tracking angles (S = rθ and unit circle radar) to high-speed data compression curves (logarithms) and algorithmic signal superposition (function combinations and compound wave angles), every decision depends on functional analysis.',
  context: 'Calibrate radar telemetry, model dynamic cost curves, predict harmonic signal interferences, and manipulate real-valued functions to ensure zero communication latency.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An ISRO radar dish rotates through 150° tracking a satellite at radius 12 km. If an engineer claims the curved arc length is simply 12 × 150 = 1800 km, what fundamental rule was violated?',
  options: [
    'Radius must be converted to metres first',
    'The angle must be in radians because S = rθ is built purely on circular arc measure (150° = 5π/6 rad ≈ 31.4 km)',
    'The speed of light alters the radar distance',
    'Arc length formula only works for acute angles under 90°',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Degrees are an arbitrary 360-division. S = rθ strictly demands radians where π rad = 180°!',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Visual Graph Families: Cusp vs Smooth vs Step',
    instruction: 'Select standard functions (|x|, x², [x], 1/x, a^x, log x) and adjust parameters to observe domain, range, and singular features.',
    interactionType: 'graph-explorer',
    nodeId: NODE_C11_APPMATH_011,
  },
  {
    title: 'Function Operations & Domain Singularities',
    instruction: 'Combine f(x) and g(x) into (f/g)(x) and drag the input slider to identify hidden domain restrictions where g(x) = 0.',
    interactionType: 'function-arithmetic',
    nodeId: NODE_C11_APPMATH_012,
  },
  {
    title: 'The Radar Unit Circle & ASTC Signs',
    instruction: 'Drag the rotating radar angle scrubber across all 4 quadrants (0° to 360° / 0 to 2π) to see how (cos θ, sin θ) project onto real waves.',
    interactionType: 'unit-circle',
    nodeId: NODE_C11_APPMATH_014,
  },
  {
    title: 'Harmonic Signal Addition: Compound & Double Angles',
    instruction: 'Adjust primary angle A and compound angle B to verify how sin(A+B) and product-to-sum wave interference combine in real-time.',
    interactionType: 'wave-compound',
    nodeId: NODE_C11_APPMATH_016,
  },
  {
    title: 'Logarithmic Scaling & Inverse Telemetry',
    instruction: 'Manipulate logarithmic bases and arguments to test the power rule log(m^p) = p log m and change-of-base conversions.',
    interactionType: 'log-lab',
    nodeId: NODE_C11_APPMATH_019,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If f(x) = |x| and g(x) = x², what happens to their slopes as x passes through the origin (0, 0)?',
    options: [
      'Both have smooth slopes of 0 at the origin',
      '|x| abruptly jumps in slope from -1 to +1 (sharp corner/cusp), while x² smoothly transitions with slope 2x = 0',
      'Both graphs have vertical asymptotes at x = 0',
      '|x| is curved while x² consists of two straight line segments',
    ],
    correctIndex: 1,
    verifyInstruction: 'Select |x| and x² in the graph visualizer and scrub across x = -1 to +1 to see the slope behaviour.',
    nodeId: NODE_C11_APPMATH_011,
  },
  {
    question: 'Predict: What is the exact domain of the quotient (f/g)(x) when f(x) = x² - 1 and g(x) = x - 1?',
    options: [
      'All real numbers R, because (x² - 1)/(x - 1) simplifies algebraically to x + 1',
      'R \\ {1}, because domain restrictions are determined from the unsimplified denominator g(x) ≠ 0',
      'Only positive numbers x > 0',
      'R \\ {-1, 1}',
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle the quotient function (f/g) and observe the open puncture at x = 1.',
    nodeId: NODE_C11_APPMATH_012,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about tan θ as the radar angle approaches 90° (π/2) and 270° (3π/2) on the unit circle?',
    observableOptions: [
      'tan θ reaches a maximum of +1 and stays flat',
      'The x-coordinate (cos θ) becomes 0, causing tan θ = y/x to diverge to ±∞ with vertical asymptotes',
      'tan θ becomes 0 while sin θ reaches infinity',
      'tan θ flips sign and remains exactly equal to -1',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_APPMATH_015,
  },
  {
    question: 'When simplifying (sin 75° + sin 15°)/(cos 75° + cos 15°), what geometric simplification occurs via sum-to-product?',
    observableOptions: [
      'It becomes sin(90°)/cos(90°) = undefined',
      'Both numerator and denominator produce 2 cos 30°, leaving sin 45° / cos 45° = tan 45° = 1',
      'It equals (75+15)/(75+15) = 1 without trigonometric properties',
      'It equals 2 sin 60° = √3',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_APPMATH_017,
  },
];

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

// ─── 22 COMPREHENSIVE CHALLENGES ACROSS ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation Recall - Standard Functions
  {
    id: 'ch_01',
    nodeId: NODE_C11_APPMATH_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following describes the range and geometric shape of the Greatest Integer function f(x) = [x]?',
    options: [
      'Range is R, shape is a smooth upward curve',
      'Range is the set of all integers Z, shape is a step staircase with left closed dots [n, n+1) and right open circles',
      'Range is [0, ∞), shape is a sharp V-vertex',
      'Range is {-1, 0, 1}, shape has three isolated horizontal bars',
    ],
    correctIndex: 1,
    explanation: 'f(x) = [x] assigns the greatest integer ≤ x. Its output is strictly integer (range Z) forming step intervals with jumps at each integer.',
    hints: [
      'Think of floor values: [2.3] = 2, [2.9] = 2, [-1.2] = -2.',
      'Outputs are only discrete whole numbers, not fractional continuous values.',
      'A staircase graph with horizontal segments on [n, n+1) has range Z.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation Drag-Label - Function Classification
  {
    id: 'ch_02',
    nodeId: NODE_C11_APPMATH_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each standard function to its key mathematical property by dragging labels to targets.',
    dragItems: [
      { label: 'Modulus |x|', targetId: 'prop_cusp' },
      { label: 'Rational 1/x', targetId: 'prop_asymptote' },
      { label: 'Signum sgn(x)', targetId: 'prop_sign' },
      { label: 'Exponential 2^x', targetId: 'prop_jcurve' },
    ],
    correctMapping: {
      prop_cusp: 'Modulus |x|',
      prop_asymptote: 'Rational 1/x',
      prop_sign: 'Signum sgn(x)',
      prop_jcurve: 'Exponential 2^x',
    },
    explanation: '|x| has a sharp cusp at origin, 1/x has hyperbola asymptotes at x=0 & y=0, sgn(x) has 3-element range {-1,0,1}, and 2^x has J-curve growth.',
    hints: [
      'Which function has a sharp non-differentiable V-corner?',
      'Which function is split into two disjoint hyperbolic branches avoiding zero?',
      'Which function returns only -1 for negative, 0 at 0, and 1 for positive?',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation Radian Conversion Numeric
  {
    id: 'ch_03',
    nodeId: NODE_C11_APPMATH_013,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Convert an angle of 135° into radians in terms of π. What is the numerator when written as (k·π)/4 rad? (Enter integer k)',
    correctAnswer: 3,
    tolerance: 0,
    unit: 'k',
    explanation: 'To convert degrees to radians: 135° × (π / 180°) = (135/180)π = (3/4)π = 3π/4 radians, so k = 3.',
    hints: [
      'Multiply by the master anchor conversion: π radians = 180°.',
      '135 / 180 simplifies by dividing both numerator and denominator by 45.',
      '135 = 3 × 45 and 180 = 4 × 45.',
    ],
  },
  // 4. Foundation Unit Circle Terminal Point
  {
    id: 'ch_04',
    nodeId: NODE_C11_APPMATH_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'On the unit circle, an angle of 210° terminates in Quadrant III. What are its exact (x, y) coordinates representing (cos 210°, sin 210°)?',
    options: [
      '(-√3/2, -1/2)',
      '(-1/2, -√3/2)',
      '(√3/2, -1/2)',
      '(-√3/2, 1/2)',
    ],
    correctIndex: 0,
    explanation: '210° = 180° + 30° (Quadrant III). Both x and y are negative. Reference angle is 30°. cos 210° = -cos 30° = -√3/2 and sin 210° = -sin 30° = -1/2.',
    hints: [
      'In Quadrant III, both cosine (horizontal) and sine (vertical) are negative.',
      'Reference angle is 210° - 180° = 30°.',
      'cos 30° = √3/2, sin 30° = 1/2.',
    ],
    misconceptionIndex: 1,
  },
  // 5. Foundation ASTC Signs Match
  {
    id: 'ch_05',
    nodeId: NODE_C11_APPMATH_015,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the ASTC (All Silver Tea Cups) rule, which trigonometric functions are strictly positive in Quadrant II (90° < θ < 180°)?',
    options: [
      'sin θ and its reciprocal cosec θ only',
      'cos θ and sec θ only',
      'tan θ and cot θ only',
      'All six trigonometric functions',
    ],
    correctIndex: 0,
    explanation: 'In Quadrant II, y > 0 (sin > 0, cosec > 0) while x < 0 (cos < 0, sec < 0, tan < 0, cot < 0).',
    hints: [
      'Quadrant II has positive vertical y-coordinates and negative horizontal x-coordinates.',
      'Sine is y/r, which is positive. Its reciprocal cosec shares the identical sign.',
      'S stands for Sin and Cosec in "All Silver Tea Cups".',
    ],
  },
  // 6. Foundation Logarithm Definition Numeric
  {
    id: 'ch_06',
    nodeId: NODE_C11_APPMATH_019,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Evaluate the exact value of log_3(243).',
    correctAnswer: 5,
    tolerance: 0,
    unit: 'exponent',
    explanation: 'log_3(243) asks "3 raised to what power equals 243?". Since 3^1=3, 3^2=9, 3^3=27, 3^4=81, 3^5=243, the value is 5.',
    hints: [
      'Rewrite in exponential form: 3^x = 243.',
      'Factor 243 into powers of 3: 243 = 9 × 27 = 3² × 3³.',
      'Add exponents: 2 + 3 = 5.',
    ],
  },
  // 7. Foundation Compound Angle Recall
  {
    id: 'ch_07',
    nodeId: NODE_C11_APPMATH_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following is the correct formula for cos(A + B)?',
    options: [
      'cos A cos B - sin A sin B',
      'cos A cos B + sin A sin B',
      'sin A cos B + cos A sin B',
      'cos A sin B - sin A cos B',
    ],
    correctIndex: 0,
    explanation: 'Cosine reverses the operation sign: cos(A + B) = cos A cos B - sin A sin B.',
    hints: [
      'Remember: "Cosine changes sign; Sine keeps sign".',
      'The expansion of cos(A + B) has a MINUS sign between products.',
      'It multiplies like-terms: cos·cos minus sin·sin.',
    ],
    misconceptionIndex: 2,
  },
  // 8. Standard Function Domain Analysis
  {
    id: 'ch_08',
    nodeId: NODE_C11_APPMATH_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Let f(x) = √(x - 3) and g(x) = √(7 - x). What is the exact domain of the sum function (f + g)(x)?',
    options: [
      '[3, 7]',
      '(3, 7)',
      '[3, ∞)',
      '(-∞, 7]',
    ],
    correctIndex: 0,
    explanation: 'Domain of f is x ≥ 3. Domain of g is x ≤ 7. The domain of (f + g) is the intersection [3, ∞) ∩ (-∞, 7] = [3, 7].',
    hints: [
      'Under a square root, expressions must be ≥ 0.',
      'x - 3 ≥ 0 gives x ≥ 3. 7 - x ≥ 0 gives x ≤ 7.',
      'Find where BOTH conditions hold simultaneously.',
    ],
  },
  // 9. Standard Arc Length Real-World Application
  {
    id: 'ch_09',
    nodeId: NODE_C11_APPMATH_013,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A high-speed train in Ahmedabad rounds a circular bend of radius r = 600 m subtending a central angle of 45°. Find the arc distance S traversed (in metres) taking π ≈ 3.1416. (Round to nearest integer)',
    correctAnswer: 471,
    tolerance: 2,
    unit: 'metres',
    explanation: 'θ in radians = 45° × (π / 180°) = π/4 rad. S = rθ = 600 × (π/4) = 150π ≈ 150 × 3.1416 = 471.24 m.',
    hints: [
      'Step 1: Convert 45° to radians (45° = π/4 rad).',
      'Step 2: Apply S = rθ directly.',
      'Calculate 600 × (3.14159 / 4) = 150 × 3.14159 ≈ 471.',
    ],
  },
  // 10. Standard Double Angle Calculation
  {
    id: 'ch_10',
    nodeId: NODE_C11_APPMATH_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If angle x lies in Quadrant I and sin x = 3/5, what is the exact value of cos 2x?',
    options: [
      '7/25',
      '24/25',
      '-7/25',
      '1/5',
    ],
    correctIndex: 0,
    explanation: 'cos 2x = 1 - 2 sin²x = 1 - 2(3/5)² = 1 - 2(9/25) = 1 - 18/25 = 7/25.',
    hints: [
      'Use the double angle formula for cosine: cos 2x = 1 - 2 sin²x.',
      'Square sin x: (3/5)² = 9/25.',
      'Compute 1 - 2(9/25) = 25/25 - 18/25 = 7/25.',
    ],
  },
  // 11. Standard Sum-to-Product Simplification
  {
    id: 'ch_11',
    nodeId: NODE_C11_APPMATH_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Evaluate the exact numerical value of: (sin 75° + sin 15°) / (cos 75° + cos 15°).',
    correctAnswer: 1,
    tolerance: 0,
    unit: 'ratio',
    explanation: 'Numerator = 2 sin(45°) cos(30°). Denominator = 2 cos(45°) cos(30°). Dividing gives sin 45° / cos 45° = tan 45° = 1.',
    hints: [
      'Apply sin C + sin D = 2 sin((C+D)/2) cos((C-D)/2) with C=75°, D=15°.',
      'Apply cos C + cos D = 2 cos((C+D)/2) cos((C-D)/2).',
      'Cancel the common factor 2 cos 30°.',
    ],
  },
  // 12. Standard Logarithm Laws Combine
  {
    id: 'ch_12',
    nodeId: NODE_C11_APPMATH_020,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Simplify to a single integer: log_10(50) + log_10(200) - log_10(100).',
    correctAnswer: 2,
    tolerance: 0,
    unit: 'value',
    explanation: 'log(50) + log(200) = log(50 × 200) = log(10000). Then log(10000) - log(100) = log(10000 / 100) = log(100) = 2.',
    hints: [
      'Product rule: log A + log B = log(A × B). 50 × 200 = 10,000.',
      'Quotient rule: log M - log N = log(M / N). 10,000 / 100 = 100.',
      'log_10(100) = 2.',
    ],
  },
  // 13. Standard Drag-Sort: Steps to Prove sin 2x
  {
    id: 'ch_13',
    nodeId: NODE_C11_APPMATH_018,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the logical steps in deriving the double angle identity sin 2x = 2 sin x cos x from compound angles:',
    sortItems: [
      'State compound formula: sin(A + B) = sin A cos B + cos A sin B',
      'Substitute identical arguments: let A = x and B = x',
      'Write expansion: sin(x + x) = sin x cos x + cos x sin x',
      'Combine like terms to conclude: sin 2x = 2 sin x cos x',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Double angle formulas are direct specializations of addition formulas where angle B is set equal to angle A.',
    hints: [
      'First establish the parent addition identity sin(A+B).',
      'Next substitute B = A = x.',
      'Combine the two identical symmetric product terms.',
    ],
  },
  // 14. Advanced Construct: Sector Area Formula
  {
    id: 'ch_14',
    nodeId: NODE_C11_APPMATH_013,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the mathematical terms in order to form the formula for the Area of a circular Sector with central angle θ radians:',
    availableParts: ['(1/2)', 'r²', 'θ', '2π', 'r', 'π'],
    targetState: '(1/2) r² θ',
    validationHint: 'Think fraction of full circle: (θ / 2π) × πr².',
    explanation: 'Area of sector = (θ / 2π) × (πr²) = (1/2) r² θ when θ is in radians.',
    hints: [
      'The fraction of the circle is θ / (2π).',
      'Multiply this fraction by total circle area πr².',
      'The π in numerator and denominator cancels, leaving (1/2) r² θ.',
    ],
  },
  // 15. Advanced Competency Evaluation: Domain Cancelling Fallacy
  {
    id: 'ch_15',
    nodeId: NODE_C11_APPMATH_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A junior analyst asserts: "Since h(x) = (x² - 4)/(x - 2) simplifies algebraically to x + 2, its graph is a continuous unbroken line and h(2) = 4." Evaluate this claim:',
    options: [
      'Valid: Algebraic simplification removes any division by zero',
      'Invalid: The domain is established on the unsimplified form R \\ {2}; at x = 2 there is a removable singularity (hole/punctured point) and h(2) is undefined',
      'Invalid: The simplified form should be x - 2',
      'Valid: Limits guarantee that h(2) exists as a standard real value',
    ],
    correctIndex: 1,
    explanation: 'Domain rules are strict: algebraic cancellation does NOT restore excluded points. h(2) = 0/0 which is undefined, rendering a puncture at (2, 4).',
    hints: [
      'Can you divide 0 by 0 at x = 2 in the original formula?',
      'Cancelling (x-2)/(x-2) is only legal when x ≠ 2.',
      'The graph is a line with a HOLE at x = 2.',
    ],
    misconceptionIndex: 3,
  },
  // 16. Advanced Competency Analysis: Periodicity of tan vs sin
  {
    id: 'ch_16',
    nodeId: NODE_C11_APPMATH_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is the fundamental period of tan x equal to π radians while the fundamental period of sin x and cos x is 2π radians?',
    options: [
      'Because the tangent function has no reciprocal partner',
      'Rotating by π adds 180°, negating BOTH x and y coordinates on the unit circle; since tan(x+π) = (-y)/(-x) = y/x = tan x, tangent repeats every half-turn',
      'Because tangent has vertical asymptotes every 360°',
      'It is an arbitrary convention chosen by mathematicians',
    ],
    correctIndex: 1,
    explanation: 'At diametrically opposite points (x+π), both sin and cos change signs simultaneously. Their ratio (-sin)/(-cos) = tan remains unchanged every π radians.',
    hints: [
      'Look at what happens to coordinates (a, b) after a 180° (π) rotation: they become (-a, -b).',
      'Compute tan(θ + π) = (-b) / (-a) = b/a = tan θ.',
      'Since the ratio repeats every half turn, its period is π.',
    ],
  },
  // 17. Advanced Real-World Antenna Triangulation (Product-to-Sum)
  {
    id: 'ch_17',
    nodeId: NODE_C11_APPMATH_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An ISRO telemetry signal synthesiser mixes two carrier frequencies: 2 sin(50t) cos(20t). Using product-to-sum transformation, express this signal as superimposed distinct frequencies:',
    options: [
      'sin(70t) + sin(30t)',
      'sin(70t) - sin(30t)',
      'cos(70t) + cos(30t)',
      '2 sin(35t) cos(15t)',
    ],
    correctIndex: 0,
    explanation: '2 sin A cos B = sin(A + B) + sin(A - B). Here A = 50t, B = 20t. Thus: sin(50t + 20t) + sin(50t - 20t) = sin(70t) + sin(30t).',
    hints: [
      'Use the identity 2 sin A cos B = sin(A + B) + sin(A - B).',
      'Sum angle = 50t + 20t = 70t.',
      'Difference angle = 50t - 20t = 30t.',
    ],
  },
  // 18. Advanced Half-Angle Exact Evaluation
  {
    id: 'ch_18',
    nodeId: NODE_C11_APPMATH_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Using the half-angle formula tan(θ/2) = (1 - cos θ)/sin θ with θ = 45° (cos 45° = sin 45° = 1/√2), evaluate the exact value of tan(22.5°):',
    options: [
      '√2 - 1',
      '√2 + 1',
      '2 - √3',
      '(√2 - 1)/2',
    ],
    correctIndex: 0,
    explanation: 'tan(22.5°) = (1 - 1/√2) / (1/√2) = (√2 - 1)/√2 / (1/√2) = √2 - 1 ≈ 0.4142.',
    hints: [
      'Substitute cos 45° = 1/√2 and sin 45° = 1/√2.',
      'tan(22.5°) = (1 - 1/√2)/(1/√2).',
      'Multiply numerator and denominator by √2 to get √2 - 1.',
    ],
  },
  // 19. Advanced Change of Base Telemetry
  {
    id: 'ch_19',
    nodeId: NODE_C11_APPMATH_020,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Given log_10(2) ≈ 0.3010 and log_10(3) ≈ 0.4771. Find the value of log_2(3) to two decimal places using the change of base formula.',
    correctAnswer: 1.58,
    tolerance: 0.03,
    unit: 'ratio',
    explanation: 'log_2(3) = log_10(3) / log_10(2) = 0.4771 / 0.3010 ≈ 1.585.',
    hints: [
      'Change of base formula: log_a(b) = log_c(b) / log_c(a).',
      'Set target base c = 10: log_2(3) = log_10(3) / log_10(2).',
      'Divide 0.4771 by 0.3010 ≈ 1.585.',
    ],
  },
  // 20. Advanced Log Power Property Diagnostic
  {
    id: 'ch_20',
    nodeId: NODE_C11_APPMATH_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the claim: "log(m + n) = log m + log n, because logarithms distribute over parentheses." Why is this fundamentally false?',
    options: [
      'It is true only when m and n are both greater than 10',
      'Logarithms transform products into sums (log(mn) = log m + log n); they do NOT distribute linearly over addition',
      'It is false only because bases must be irrational',
      'It is true in natural logarithms but false in common logarithms',
    ],
    correctIndex: 1,
    explanation: 'log(m + n) cannot be expanded. By definition, a^{x+y} = a^x · a^y, which translates to log(m · n) = log m + log n.',
    hints: [
      'Test with numbers: log_10(10 + 90) = log_10(100) = 2.',
      'Meanwhile log_10(10) + log_10(90) = 1 + 1.954 = 2.954 ≠ 2.',
      'Addition inside a log cannot be split into separate logs.',
    ],
    misconceptionIndex: 4,
  },
  // 21. Advanced Triple Angle Formula Verification
  {
    id: 'ch_21',
    nodeId: NODE_C11_APPMATH_018,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Using the triple angle identity sin 3x = 3 sin x - 4 sin³x with x = 30° (where sin 30° = 0.5), evaluate the output to verify sin 90°.',
    correctAnswer: 1,
    tolerance: 0,
    unit: 'value',
    explanation: '3(0.5) - 4(0.5)³ = 1.5 - 4(0.125) = 1.5 - 0.5 = 1.0, which perfectly matches sin 90° = 1.',
    hints: [
      'Substitute sin 30° = 0.5 into 3 sin x - 4 sin³x.',
      '3 × 0.5 = 1.5.',
      '4 × (0.5)³ = 4 × 0.125 = 0.5. Subtract: 1.5 - 0.5 = 1.',
    ],
  },
  // 22. Advanced Real-World Population/Data Growth Modeling
  {
    id: 'ch_22',
    nodeId: NODE_C11_APPMATH_019,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A tech server cluster in Hyderabad compresses data such that size S(t) = S_0 · 2^(-0.5t). After how many seconds t will the data size reduce to exactly (1/16)th of initial size S_0?',
    correctAnswer: 8,
    tolerance: 0,
    unit: 'seconds',
    explanation: 'Set 2^(-0.5t) = 1/16 = 2^(-4). Equating exponents: -0.5t = -4 ==> t = 8 seconds.',
    hints: [
      'Express 1/16 as a power of 2: 1/16 = 2^(-4).',
      'Equate the exponents: -0.5t = -4.',
      'Solve for t: t = 4 / 0.5 = 8.',
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

// ─── DEFAULT ENRICHED PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_APPMATH_011,
  title: 'Graphs of Standard Real Functions, Trigonometry & Logarithms',
  definition: 'A comprehensive visual framework of real-valued functions, domain algebra, circular trigonometry on the unit circle, angle conversions S=rθ, compound/multiple angle identities, and logarithmic laws.',
  eli5: 'Think of functions like machines with special graphs: parabolas, sharp V-shapes, step staircases, and waves. The unit circle turns angles into waves, and logarithms decode powers!',
  misconceptions: [
    {
      misconception: 'The greatest integer function [x] is continuous because horizontal segments look flat.',
      correction: 'f(x) = [x] has jump discontinuities at every integer n, where left and right limits do not match.',
    },
    {
      misconception: 'On the unit circle, coordinates are (sin θ, cos θ) interchangeably.',
      correction: 'Coordinates are strictly (x, y) = (cos θ, sin θ). Horizontal is cosine, vertical is sine.',
    },
    {
      misconception: 'Cosine addition formula retains a plus sign: cos(A+B) = cos A cos B + sin A sin B.',
      correction: 'Cosine flips the sign: cos(A+B) = cos A cos B - sin A sin B.',
    },
    {
      misconception: 'Cancelling (x-a)/(x-a) in a quotient restores x=a to the domain.',
      correction: 'The domain is determined by the unsimplified form; x=a remains excluded as a puncture.',
    },
    {
      misconception: 'Logarithms distribute over addition: log(m + n) = log m + log n.',
      correction: 'Logarithms only convert products into sums: log(m · n) = log m + log n.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the range of f(x) = |x|?', options: ['R', '[0, ∞)', '(-∞, 0]', 'Z'], correctIndex: 1 },
    { question: 'What is the fundamental period of tan x?', options: ['2π', 'π', 'π/2', '4π'], correctIndex: 1 },
    { question: 'If S = rθ, what unit must θ be in?', options: ['Degrees', 'Radians', 'Gradians', 'Revolutions'], correctIndex: 1 },
    { question: 'What is sin(2x) equal to?', options: ['2 sin x', '2 sin x cos x', 'sin²x - cos²x', '2 cos x'], correctIndex: 1 },
    { question: 'Which quadrant has tan θ > 0 and sin θ < 0?', options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'], correctIndex: 2 },
    { question: 'What is log_a(1) for any valid base a > 0, a ≠ 1?', options: ['1', '0', 'a', 'undefined'], correctIndex: 1 },
    { question: 'What is the domain of 1/(x² - 9)?', options: ['R', 'R \\ {3}', 'R \\ {-3, 3}', '(-3, 3)'], correctIndex: 2 },
    { question: 'What is cos(90° - θ)?', options: ['-cos θ', 'sin θ', '-sin θ', 'tan θ'], correctIndex: 1 },
  ],
  masteryCriteria: 'Master standard function graphs, algebraic domain restrictions, radian arc relations, unit circle quadrant ASTC signs, compound/multiple angle identities, and logarithmic operations.',
};

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Telemetry Architect: Satellite Orbit & Wave Synthesis',
  description: 'Design an ISRO signal protocol that combines two harmonic frequencies using product-to-sum formulas, tracks radar angles using S = rθ, and checks signal compression using base-10 logarithms.',
  steps: [
    'Model orbit sweep: compute arc length S for 75° at radius 42,000 km in radians.',
    'Decompose combined radar wave 2 sin(40t) cos(15t) into distinct carrier frequencies.',
    'Calculate logarithmic decibel loss using log_10(P_in / P_out).',
    'Verify that domain singularity checks prevent system divide-by-zero errors in signal filters.',
  ],
};

// ─── COMPONENT IMPLEMENTATION ───
function C11_AppliedMathsGraphsStandardRealSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C11_APPMATH_011,
    title = DEFAULT_PROPS.title || 'Applied Maths Simulation',
    misconceptions = DEFAULT_PROPS.misconceptions || [],
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['appmath'] || { name: 'Applied Mathematics', emoji: '📐', color: 'indigo' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── BRILLIANT.ORG INTERACTION STATES ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── REFLECTION ANSWERS STATE ───
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({
    surprising: '',
    explain: '',
    reallife: '',
  });

  // ─── INTERACTIVE GRAPH & TRIG LAB STATES ───
  const [selectedFunction, setSelectedFunction] = useState<'modulus' | 'quadratic' | 'greatestInteger' | 'rational' | 'exponential' | 'logarithm'>('modulus');
  const [paramA, setParamA] = useState(1);
  const [paramB, setParamB] = useState(0);
  const [cursorX, setCursorX] = useState(1.5);
  const [unitAngleDeg, setUnitAngleDeg] = useState(60);
  const [radiusLength, setRadiusLength] = useState(5);
  const [compoundAngleA, setCompoundAngleA] = useState(45);
  const [compoundAngleB, setCompoundAngleB] = useState(30);
  const [logBase, setLogBase] = useState(2);
  const [logArg, setLogArg] = useState(8);
  const [funcOp, setFuncOp] = useState<'sum' | 'diff' | 'prod' | 'quot'>('quot');
  const [arithmeticX, setArithmeticX] = useState(1);

  // ─── CHALLENGE INTERACTIVE STATES ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
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
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── VISUAL FEEDBACK STATES ───
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── REFS FOR BKT & TIMERS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── ADAPTIVE BKT DIFFICULTY UPDATES ───
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
    const currentM = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(currentM);
    const targetDiff = currentM === 'not-started' || currentM === 'beginner' ? 'foundation'
      : currentM === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== targetDiff) {
        setCurrentChallenge(0);
        return targetDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── SOUND & SPEECH ON MOUNT ───
  useEffect(() => {
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the ISC Applied Mathematics simulation. Let us explore functions, trigonometry, and logarithms!');
  }, []);

  // ─── 2D CANVAS TELEMETRY OSCILLOSCOPE ANIMATION ───
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

      // Draw background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw dynamic carrier wave: sin(A) + cos(B)
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const midY = canvas.height / 2;
      const radA = (compoundAngleA * Math.PI) / 180;
      const radB = (compoundAngleB * Math.PI) / 180;

      for (let x = 0; x < canvas.width; x++) {
        const t = (x / canvas.width) * 4 * Math.PI + frame * 0.03;
        const wave1 = Math.sin(t + radA);
        const wave2 = Math.cos(2 * t + radB);
        const combined = (wave1 + wave2) * 20;
        if (x === 0) ctx.moveTo(x, midY - combined);
        else ctx.lineTo(x, midY - combined);
      }
      ctx.stroke();

      // Pulsing radar blip
      const blipX = (frame * 1.5) % canvas.width;
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(blipX, midY, 4, 0, 2 * Math.PI);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [compoundAngleA, compoundAngleB]);

  // ─── ESCALATING HINTS CALLBACK ───
  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && activeChallenge.hints[nextLvl - 1]) {
      setCurrentHint(activeChallenge.hints[nextLvl - 1]);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLvl - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  // ─── AUTO HINT TIMER CALLBACK ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── COMPLETION HANDLER CALLBACK ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the full ISC Applied Mathematics module.');
  }, [errors, onComplete]);

  // ─── ANSWER SUBMIT HANDLER CALLBACK ───
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent mathematical reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us inspect the complete step-by-step mathematical proof.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 5000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  // ─── DRAG-AND-DROP EVENT CALLBACKS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const items = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return items;
    });
  }, []);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3];
    handleAnswer(finalOrder);
  }, [sortArrangement, handleAnswer]);

  // ─── NAVIGATION CALLBACKS ───
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const correct = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(correct);
    setDiscoveryAnswered(true);
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Brilliant intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore standard functions, trigonometric unit circle projections, and logarithmic rules interactively.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Free Play Sandbox! Test parameters freely with zero pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering challenge mode. Put your mathematical knowledge to the test!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive visualization to verify.');
  }, []);

  // ─── REAL-TIME GRAPH COMPUTATIONS ───
  const graphEval = useMemo(() => {
    const x = cursorX;
    let y = 0;
    let featureNote = '';

    switch (selectedFunction) {
      case 'modulus':
        y = Math.abs(paramA * x + paramB);
        featureNote = x === 0 ? 'Cusp / Sharp Vertex at (0, 0)' : `Slope = ${x > 0 ? paramA : -paramA}`;
        break;
      case 'quadratic':
        y = paramA * x * x + paramB;
        featureNote = `Smooth Parabola: Vertex at (0, ${paramB}), dy/dx = ${2 * paramA * x}`;
        break;
      case 'greatestInteger':
        y = Math.floor(paramA * x + paramB);
        featureNote = `Step Interval [${y}, ${y + 1}): Jump discontinuity at integer x`;
        break;
      case 'rational':
        y = x !== 0 ? paramA / x + paramB : NaN;
        featureNote = x === 0 ? 'Singularity: Vertical Asymptote x = 0' : `Hyperbolic branch: y = ${y.toFixed(2)}`;
        break;
      case 'exponential':
        y = Math.pow(Math.max(0.1, paramA), x) + paramB;
        featureNote = `J-Curve Growth: (0, 1) intercept, y > ${paramB}`;
        break;
      case 'logarithm':
        y = x > 0 ? Math.log(x) / Math.log(Math.max(1.1, paramA)) + paramB : NaN;
        featureNote = x <= 0 ? 'Undefined for x ≤ 0 (Asymptote at y-axis)' : `Log curve: (1, 0) intercept`;
        break;
    }
    return { y, featureNote };
  }, [selectedFunction, paramA, paramB, cursorX]);

  // ─── UNIT CIRCLE COMPUTATIONS ───
  const unitCircleMath = useMemo(() => {
    const rad = (unitAngleDeg * Math.PI) / 180;
    const cosVal = Math.cos(rad);
    const sinVal = Math.sin(rad);
    const tanVal = Math.abs(cosVal) > 0.0001 ? sinVal / cosVal : NaN;
    const arcLength = radiusLength * rad;
    const sectorArea = 0.5 * radiusLength * radiusLength * rad;

    let quadrant = 'I';
    let astcRule = 'All positive (sin, cos, tan > 0)';
    let qColor = '#22c55e';

    if (unitAngleDeg > 90 && unitAngleDeg <= 180) {
      quadrant = 'II';
      astcRule = 'Silver: Sin & Cosec > 0 (cos, tan < 0)';
      qColor = '#3b82f6';
    } else if (unitAngleDeg > 180 && unitAngleDeg <= 270) {
      quadrant = 'III';
      astcRule = 'Tea: Tan & Cot > 0 (sin, cos < 0)';
      qColor = '#f59e0b';
    } else if (unitAngleDeg > 270 && unitAngleDeg <= 360) {
      quadrant = 'IV';
      astcRule = 'Cups: Cos & Sec > 0 (sin, tan < 0)';
      qColor = '#ec4899';
    }

    return { rad, cosVal, sinVal, tanVal, arcLength, sectorArea, quadrant, astcRule, qColor };
  }, [unitAngleDeg, radiusLength]);

  // ─── COMPOUND ANGLE REAL-TIME COMPUTATIONS ───
  const compoundMath = useMemo(() => {
    const radA = (compoundAngleA * Math.PI) / 180;
    const radB = (compoundAngleB * Math.PI) / 180;
    const sinA = Math.sin(radA);
    const cosA = Math.cos(radA);
    const sinB = Math.sin(radB);
    const cosB = Math.cos(radB);

    const sinAPlusB = Math.sin(radA + radB);
    const sinExpanded = sinA * cosB + cosA * sinB;
    const cosAPlusB = Math.cos(radA + radB);
    const cosExpanded = cosA * cosB - sinA * sinB;
    const prodToSum = 2 * sinA * cosB;
    const sumResult = Math.sin(radA + radB) + Math.sin(radA - radB);

    return { sinAPlusB, sinExpanded, cosAPlusB, cosExpanded, prodToSum, sumResult };
  }, [compoundAngleA, compoundAngleB]);

  // ─── FUNCTION ARITHMETIC COMPUTATIONS ───
  const arithMath = useMemo(() => {
    const x = arithmeticX;
    const fVal = x * x - 1; // f(x) = x² - 1
    const gVal = x - 1; // g(x) = x - 1

    let res = 0;
    let isDefined = true;
    let restriction = 'None';

    if (funcOp === 'sum') res = fVal + gVal;
    else if (funcOp === 'diff') res = fVal - gVal;
    else if (funcOp === 'prod') res = fVal * gVal;
    else if (funcOp === 'quot') {
      if (Math.abs(gVal) < 0.0001) {
        isDefined = false;
        res = NaN;
        restriction = 'CRITICAL: g(1) = 0. Excluded from Domain R \\ {1}!';
      } else {
        res = fVal / gVal;
        restriction = 'Simplifies to x+1 for x ≠ 1, but puncture persists at x=1';
      }
    }

    return { fVal, gVal, res, isDefined, restriction };
  }, [arithmeticX, funcOp]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-800/60">
                ISC Class 11 • Applied Maths
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950/60 border-rose-800 text-rose-400'
                    : 'bg-indigo-950/60 border-indigo-800 text-indigo-400'
                }`}
              >
                {difficulty}
              </motion.span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800" role="tablist">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              role="tab"
              aria-selected={phase === p}
              aria-label={`Switch to ${p} mode`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {p === 'discovery' ? '1. Hook' : p === 'explore' ? '2. Labs' : p === 'sandbox' ? '3. Sandbox' : '4. Challenges'}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Narrative Card */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/40">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold mb-2">
              <span>🚀</span>
              <span>{SCENARIO.title}</span>
            </div>
            <p className="text-slate-200 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-3 bg-indigo-950/40 p-3 rounded-xl border border-indigo-900/40">
              💡 {SCENARIO.context}
            </p>
          </div>

          {/* Oscilloscope Canvas */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">ISRO Live Carrier Wave Synthesis [sin(A) + cos(2t+B)]</span>
              <span className="text-xs font-mono text-emerald-400">Telemetry Active ●</span>
            </div>
            <canvas ref={canvasRef} width={600} height={100} className="w-full h-24 rounded-xl bg-slate-950 border border-slate-800/80" aria-label="Live radar oscilloscope wave visualizer" />
          </div>

          {/* Discovery Question Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/50">
              Curiosity Hook Challenge
            </span>
            <h3 className="text-lg font-bold text-white mt-3 mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 gap-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/60 border border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200'
                  }`}
                >
                  <span className="font-mono text-xs text-indigo-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold mr-2">✓</span>}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ 🎯 Brilliant! You recognized the radian arc relationship.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter interactive labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  <span>Enter Interactive Labs</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE (Interactive Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Header & Stepper */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              <p className="text-xs text-slate-400 mt-0.5">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
            </div>

            {/* Step navigation buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                aria-label="Previous lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
              >
                ← Prev
              </motion.button>
              <span className="text-xs font-mono text-slate-400 px-2">{currentSlide + 1} / 5</span>
              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  aria-label="Next lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide((s) => s + 1);
                    audioManager.play('tap');
                  }}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  aria-label="Enter sandbox mode"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Sandbox Mode →
                </motion.button>
              )}
            </div>
          </div>

          {/* ─── LAB SLIDE 0: Standard Functions Graph Visualizer ─── */}
          {currentSlide === 0 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Function Control Palette */}
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Function Family</span>
                <div className="grid grid-cols-2 gap-2">
                  {(['modulus', 'quadratic', 'greatestInteger', 'rational', 'exponential', 'logarithm'] as const).map((fn) => (
                    <motion.button
                      key={fn}
                      aria-label={`Select function ${fn}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSelectedFunction(fn);
                        audioManager.play('tap');
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                        selectedFunction === fn
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {fn === 'modulus' ? 'f(x) = |ax + b|' :
                       fn === 'quadratic' ? 'f(x) = ax² + b' :
                       fn === 'greatestInteger' ? 'f(x) = [ax + b]' :
                       fn === 'rational' ? 'f(x) = a/x + b' :
                       fn === 'exponential' ? 'f(x) = a^x + b' : 'f(x) = log_a(x) + b'}
                    </motion.button>
                  ))}
                </div>

                {/* Interactive Parameter Sliders */}
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Parameter a (scale/base):</span>
                      <span className="font-mono text-indigo-400">{paramA}</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Parameter a scale or base"
                      min={selectedFunction === 'exponential' || selectedFunction === 'logarithm' ? 1.2 : -3}
                      max={4}
                      step={0.1}
                      value={paramA}
                      onChange={(e) => setParamA(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Parameter b (shift):</span>
                      <span className="font-mono text-indigo-400">{paramB}</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Parameter b vertical shift"
                      min={-3}
                      max={3}
                      step={0.5}
                      value={paramB}
                      onChange={(e) => setParamB(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Evaluate cursor x:</span>
                      <span className="font-mono text-amber-400">{cursorX.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Cursor x evaluation value"
                      min={-4}
                      max={4}
                      step={0.1}
                      value={cursorX}
                      onChange={(e) => setCursorX(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                {/* Real-time Math Output Card */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Output f({cursorX.toFixed(1)}):</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {isNaN(graphEval.y) ? 'Undefined' : graphEval.y.toFixed(3)}
                    </span>
                  </div>
                  <p className="text-indigo-300 font-medium">{graphEval.featureNote}</p>
                </div>
              </div>

              {/* Dynamic SVG Cartesian Graph Plotter */}
              <div className="lg:col-span-2 p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                <svg viewBox="0 0 400 300" className="w-full max-w-md bg-slate-950 rounded-2xl border border-slate-800 shadow-inner" aria-label="Cartesian graph plot">
                  {/* Grid Lines */}
                  {[-3, -2, -1, 1, 2, 3].map((g) => (
                    <g key={g}>
                      <line x1={200 + g * 40} y1={20} x2={200 + g * 40} y2={280} stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1={20} y1={150 - g * 35} x2={380} y2={150 - g * 35} stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />
                      <text x={200 + g * 40} y={165} fill="#475569" fontSize="9" textAnchor="middle">{g}</text>
                      <text x={190} y={154 - g * 35} fill="#475569" fontSize="9" textAnchor="end">{g}</text>
                    </g>
                  ))}

                  {/* Main Axes */}
                  <line x1={20} y1={150} x2={380} y2={150} stroke="#475569" strokeWidth="1.5" />
                  <line x1={200} y1={20} x2={200} y2={280} stroke="#475569" strokeWidth="1.5" />
                  <text x={375} y={145} fill="#94a3b8" fontSize="10">x</text>
                  <text x={205} y={30} fill="#94a3b8" fontSize="10">y</text>

                  {/* Function Path Plotting */}
                  {selectedFunction === 'modulus' && (
                    <polyline
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2.5"
                      points={Array.from({ length: 41 }, (_, i) => {
                        const px = -4 + i * 0.2;
                        const py = Math.abs(paramA * px + paramB);
                        const svgX = 200 + px * 40;
                        const svgY = 150 - py * 35;
                        return `${svgX},${Math.max(20, Math.min(280, svgY))}`;
                      }).join(' ')}
                    />
                  )}

                  {selectedFunction === 'quadratic' && (
                    <polyline
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2.5"
                      points={Array.from({ length: 41 }, (_, i) => {
                        const px = -4 + i * 0.2;
                        const py = paramA * px * px + paramB;
                        const svgX = 200 + px * 40;
                        const svgY = 150 - py * 35;
                        return `${svgX},${Math.max(20, Math.min(280, svgY))}`;
                      }).join(' ')}
                    />
                  )}

                  {selectedFunction === 'greatestInteger' && (
                    <g>
                      {[-3, -2, -1, 0, 1, 2, 3].map((stepVal) => {
                        const floorVal = stepVal;
                        const yCoord = 150 - (floorVal + paramB) * 35;
                        const startX = 200 + floorVal * 40;
                        const endX = 200 + (floorVal + 1) * 40;
                        return (
                          <g key={stepVal}>
                            <line x1={startX} y1={yCoord} x2={endX} y2={yCoord} stroke="#6366f1" strokeWidth="2.5" />
                            <circle cx={startX} cy={yCoord} r="3" fill="#22c55e" />
                            <circle cx={endX} cy={yCoord} r="3" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />
                          </g>
                        );
                      })}
                    </g>
                  )}

                  {selectedFunction === 'rational' && (
                    <g>
                      <polyline
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2.5"
                        points={Array.from({ length: 20 }, (_, i) => {
                          const px = -4 + i * 0.18;
                          const py = paramA / px + paramB;
                          const svgX = 200 + px * 40;
                          const svgY = 150 - py * 35;
                          return `${svgX},${Math.max(20, Math.min(280, svgY))}`;
                        }).join(' ')}
                      />
                      <polyline
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2.5"
                        points={Array.from({ length: 20 }, (_, i) => {
                          const px = 0.2 + i * 0.19;
                          const py = paramA / px + paramB;
                          const svgX = 200 + px * 40;
                          const svgY = 150 - py * 35;
                          return `${svgX},${Math.max(20, Math.min(280, svgY))}`;
                        }).join(' ')}
                      />
                    </g>
                  )}

                  {selectedFunction === 'exponential' && (
                    <polyline
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2.5"
                      points={Array.from({ length: 41 }, (_, i) => {
                        const px = -4 + i * 0.2;
                        const py = Math.pow(Math.max(1.1, paramA), px) + paramB;
                        const svgX = 200 + px * 40;
                        const svgY = 150 - py * 35;
                        return `${svgX},${Math.max(20, Math.min(280, svgY))}`;
                      }).join(' ')}
                    />
                  )}

                  {selectedFunction === 'logarithm' && (
                    <polyline
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2.5"
                      points={Array.from({ length: 30 }, (_, i) => {
                        const px = 0.1 + i * 0.13;
                        const py = Math.log(px) / Math.log(Math.max(1.1, paramA)) + paramB;
                        const svgX = 200 + px * 40;
                        const svgY = 150 - py * 35;
                        return `${svgX},${Math.max(20, Math.min(280, svgY))}`;
                      }).join(' ')}
                    />
                  )}

                  {/* Interactive Cursor Point on Curve */}
                  {!isNaN(graphEval.y) && (
                    <g>
                      <circle
                        cx={200 + cursorX * 40}
                        cy={150 - graphEval.y * 35}
                        r="5"
                        fill="#fbbf24"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <line
                        x1={200 + cursorX * 40}
                        y1={150}
                        x2={200 + cursorX * 40}
                        y2={150 - graphEval.y * 35}
                        stroke="#fbbf24"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                    </g>
                  )}
                </svg>

                {/* Predict-Then-Check Integration */}
                {!predictionMade ? (
                  <div className="mt-4 p-4 bg-slate-950 rounded-xl border border-slate-800 w-full space-y-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Predict & Verify</span>
                    <p className="text-xs text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          aria-label={`Select prediction ${i + 1}: ${opt}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePrediction(i)}
                          className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-left text-slate-300 border border-slate-800"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/40 w-full text-center">
                    ✓ Prediction logged! Modulus |x| has sharp left (-1) and right (+1) meeting slopes at the vertex.
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ─── LAB SLIDE 1: Function Arithmetic & Domain Restrictions ─── */}
          {currentSlide === 1 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Function Arithmetic Engine</span>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ingredient f(x):</span>
                      <span className="font-mono text-indigo-300 font-bold">f(x) = x² - 1 (Domain: R)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ingredient g(x):</span>
                      <span className="font-mono text-purple-300 font-bold">g(x) = x - 1 (Domain: R)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {(['sum', 'diff', 'prod', 'quot'] as const).map((op) => (
                      <motion.button
                        key={op}
                        aria-label={`Perform operation ${op}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setFuncOp(op);
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                          funcOp === op
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-950 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {op === 'sum' ? '(f+g)' : op === 'diff' ? '(f-g)' : op === 'prod' ? '(f·g)' : '(f/g)'}
                      </motion.button>
                    ))}
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Input Evaluation x:</span>
                      <span className="font-mono text-amber-400 font-bold">{arithmeticX.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Input evaluation x value for arithmetic functions"
                      min={-2}
                      max={4}
                      step={0.1}
                      value={arithmeticX}
                      onChange={(e) => setArithmeticX(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                {/* Arithmetic Result Visualization */}
                <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pointwise Output Result</span>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                    <span className="text-xs text-slate-400">Combined Value:</span>
                    <div className="text-2xl font-mono font-black text-emerald-400">
                      {arithMath.isDefined ? `✓ ${arithMath.res.toFixed(3)}` : '✗ UNDEFINED (0 / 0)'}
                    </div>
                  </div>
                  <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-800/40 text-xs text-amber-300">
                    ⚠️ {arithMath.restriction}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── LAB SLIDE 2: Radar Unit Circle & Trigonometric Projections ─── */}
          {currentSlide === 2 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Unit Circle SVG */}
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center">
                <svg viewBox="0 0 320 320" className="w-full max-w-sm bg-slate-950 rounded-2xl border border-slate-800 shadow-inner" aria-label="Unit circle and trigonometry projection diagram">
                  {/* Quadrant ASTC Badges */}
                  <rect x="165" y="15" width="140" height="140" fill="#22c55e" fillOpacity="0.05" rx="8" />
                  <rect x="15" y="15" width="140" height="140" fill="#3b82f6" fillOpacity="0.05" rx="8" />
                  <rect x="15" y="165" width="140" height="140" fill="#f59e0b" fillOpacity="0.05" rx="8" />
                  <rect x="165" y="165" width="140" height="140" fill="#ec4899" fillOpacity="0.05" rx="8" />

                  <text x="280" y="35" fill="#22c55e" fontSize="11" fontWeight="bold">QI: ALL (+)</text>
                  <text x="35" y="35" fill="#3b82f6" fontSize="11" fontWeight="bold">QII: SIN (+)</text>
                  <text x="35" y="295" fill="#f59e0b" fontSize="11" fontWeight="bold">QIII: TAN (+)</text>
                  <text x="280" y="295" fill="#ec4899" fontSize="11" fontWeight="bold">QIV: COS (+)</text>

                  {/* Unit Circle */}
                  <circle cx="160" cy="160" r="110" fill="none" stroke="#475569" strokeWidth="1.5" />
                  <line x1="20" y1="160" x2="300" y2="160" stroke="#475569" strokeWidth="1" />
                  <line x1="160" y1="20" x2="160" y2="300" stroke="#475569" strokeWidth="1" />

                  {/* Cosine & Sine Triangle Projections */}
                  {(() => {
                    const cx = 160 + 110 * unitCircleMath.cosVal;
                    const cy = 160 - 110 * unitCircleMath.sinVal;
                    return (
                      <g>
                        <line x1="160" y1="160" x2={cx} y2="160" stroke="#3b82f6" strokeWidth="3" />
                        <line x1={cx} y1="160" x2={cx} y2={cy} stroke="#22c55e" strokeWidth="3" />
                        <line x1="160" y1="160" x2={cx} y2={cy} stroke="#f59e0b" strokeWidth="2.5" />
                        <circle cx={cx} cy={cy} r="6" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                      </g>
                    );
                  })()}
                </svg>

                {/* Radar Angle Scrubber */}
                <div className="w-full mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Scrub Radar Angle θ:</span>
                    <span className="font-mono text-amber-400 font-bold">{unitAngleDeg}° ({unitCircleMath.rad.toFixed(2)} rad)</span>
                  </div>
                  <input
                    type="range"
                    aria-label="Radar angle in degrees"
                    min={0}
                    max={360}
                    step={5}
                    value={unitAngleDeg}
                    onChange={(e) => setUnitAngleDeg(parseInt(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>

              {/* Real-time Trigonometric Values Card */}
              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quadrant Telemetry</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border" style={{ color: unitCircleMath.qColor, borderColor: unitCircleMath.qColor }}>
                    Quadrant {unitCircleMath.quadrant}
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-medium text-slate-200">
                  ASTC Sign Rule: <span className="font-bold text-indigo-300">{unitCircleMath.astcRule}</span>
                </div>

                {/* Exact Coordinate Readouts */}
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-blue-400 block font-sans">cos θ (x)</span>
                    <span className="text-sm font-bold text-white">{unitCircleMath.cosVal.toFixed(3)}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-green-400 block font-sans">sin θ (y)</span>
                    <span className="text-sm font-bold text-white">{unitCircleMath.sinVal.toFixed(3)}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-amber-400 block font-sans">tan θ (y/x)</span>
                    <span className="text-sm font-bold text-white">
                      {isNaN(unitCircleMath.tanVal) ? '∞ (Asymptote)' : unitCircleMath.tanVal.toFixed(3)}
                    </span>
                  </div>
                </div>

                {/* S = rθ and Sector Area */}
                <div className="p-3.5 bg-indigo-950/40 rounded-xl border border-indigo-900/40 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-indigo-300 font-bold">Arc Length S = rθ (r={radiusLength} km):</span>
                    <span className="font-mono text-emerald-400 font-bold">{unitCircleMath.arcLength.toFixed(2)} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-300 font-bold">Sector Area A = (1/2)r²θ:</span>
                    <span className="font-mono text-purple-400 font-bold">{unitCircleMath.sectorArea.toFixed(2)} km²</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── LAB SLIDE 3: Compound & Product-to-Sum Waves ─── */}
          {currentSlide === 3 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Compound Wave Interference Lab</span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Primary Angle A:</span>
                      <span className="font-mono text-indigo-400 font-bold">{compoundAngleA}°</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Primary angle A in degrees"
                      min={0}
                      max={90}
                      value={compoundAngleA}
                      onChange={(e) => setCompoundAngleA(parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Compound Phase Angle B:</span>
                      <span className="font-mono text-purple-400 font-bold">{compoundAngleB}°</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Compound phase angle B in degrees"
                      min={0}
                      max={90}
                      value={compoundAngleB}
                      onChange={(e) => setCompoundAngleB(parseInt(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>
                </div>

                {/* Identity Equivalence Readouts */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="p-2.5 bg-slate-900 rounded-lg space-y-1">
                    <div className="flex justify-between">
                      <span className="text-indigo-400 font-mono">sin(A+B) = sin({compoundAngleA + compoundAngleB}°):</span>
                      <span className="font-mono font-bold text-white">{compoundMath.sinAPlusB.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>sin A cos B + cos A sin B:</span>
                      <span className="font-mono text-emerald-400 font-bold">✓ {compoundMath.sinExpanded.toFixed(4)}</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-lg space-y-1">
                    <div className="flex justify-between">
                      <span className="text-purple-400 font-mono">cos(A+B) = cos({compoundAngleA + compoundAngleB}°):</span>
                      <span className="font-mono font-bold text-white">{compoundMath.cosAPlusB.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>cos A cos B - sin A sin B:</span>
                      <span className="font-mono text-emerald-400 font-bold">✓ {compoundMath.cosExpanded.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── LAB SLIDE 4: Logarithm Scale Explorer ─── */}
          {currentSlide === 4 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Logarithm Scale & Inverse Lab</span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Base a (a &gt; 0, a ≠ 1):</span>
                      <span className="font-mono text-indigo-400 font-bold">{logBase}</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Logarithm base"
                      min={2}
                      max={10}
                      value={logBase}
                      onChange={(e) => setLogBase(parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Argument N (N &gt; 0):</span>
                      <span className="font-mono text-emerald-400 font-bold">{logArg}</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Logarithm argument N"
                      min={1}
                      max={128}
                      value={logArg}
                      onChange={(e) => setLogArg(parseInt(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>

                <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs flex flex-col justify-center">
                  <div className="p-3 bg-slate-900 rounded-lg flex justify-between items-center">
                    <span className="text-slate-400 font-mono">log_{logBase}({logArg}):</span>
                    <span className="text-xl font-mono font-bold text-amber-400">
                      {(Math.log(logArg) / Math.log(logBase)).toFixed(3)}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg flex justify-between items-center">
                    <span className="text-slate-400 font-mono">Anti-log_{logBase}(x):</span>
                    <span className="text-base font-mono font-bold text-emerald-400">
                      {logBase}^x = {logArg}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Free Exploration Sandbox</span>
              <h2 className="text-xl font-black text-white mt-1">Manipulate All Parameters Freely</h2>
              <p className="text-xs text-slate-400 mt-1">Zero pressure, no grading. Test any angle, base, or function configuration!</p>
            </div>
            <motion.button
              aria-label="Ready to start challenge mode"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          {/* Combined Sandbox Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Radar Angle Sandbox</span>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Angle: {unitAngleDeg}°</span>
                <span className="font-mono text-emerald-400">cos: {unitCircleMath.cosVal.toFixed(2)}, sin: {unitCircleMath.sinVal.toFixed(2)}</span>
              </div>
              <input
                type="range"
                aria-label="Sandbox radar angle scrubber"
                min={0}
                max={360}
                value={unitAngleDeg}
                onChange={(e) => setUnitAngleDeg(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Function Cursor Sandbox</span>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Cursor x: {cursorX.toFixed(1)}</span>
                <span className="font-mono text-amber-400">f(x) = {graphEval.y.toFixed(2)}</span>
              </div>
              <input
                type="range"
                aria-label="Sandbox cursor x slider"
                min={-4}
                max={4}
                step={0.1}
                value={cursorX}
                onChange={(e) => setCursorX(parseFloat(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Challenge Header & Progress Bar */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                  Node: {activeChallenge.nodeId}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-800/50">
                  NEP 2020: {activeChallenge.competencyLevel}
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/50">
                  Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
                </span>
              </div>
            </div>

            {/* Framer-Motion Animated Progress Bar */}
            <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Active Challenge Interactive Container */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white leading-snug">{activeChallenge.question}</h3>

            {/* MCQ / Classify / Distinguish / Match */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      wrongFlash
                        ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-200'
                        : showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-xs text-indigo-400 mr-2.5">[{String.fromCharCode(65 + i)}]</span>
                    {showExplanation && i === activeChallenge.correctIndex && <span className="text-emerald-400 font-bold mr-2">✓ Correct: </span>}
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenge */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-grab shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(activeChallenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      role="region"
                      aria-label={`Drop target for ${targetId.replace('prop_', '')}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px] text-center"
                    >
                      <span className="text-xs text-slate-400 mb-1">Target: {targetId.replace('prop_', '')}</span>
                      <span className="text-sm font-bold text-emerald-400">
                        {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify dragged labels"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Labels →
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Sort step ${displayIdx + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-300 font-mono font-bold">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Check sorted step sequence"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Check Logical Order →
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label="Numerical answer input"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer..."
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500 flex-1"
                  />
                  {activeChallenge.unit && (
                    <span className="text-xs font-bold text-slate-400 bg-slate-950 px-3 py-3 rounded-xl border border-slate-800">
                      {activeChallenge.unit}
                    </span>
                  )}
                  <motion.button
                    aria-label="Check numeric answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs"
                  >
                    Check →
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-indigo-300 rounded-xl text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                {/* Construction Assembly Box */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        aria-label={`Remove part ${part}`}
                        onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-rose-300 hover:text-rose-100"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click mathematical terms above to construct formula</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify constructed formula"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Formula Construction →
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-800/60 rounded-2xl space-y-3"
              >
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Complete Mathematical Derivation & Proof:
                </span>
                {activeChallenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-amber-200 text-xs leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal next explanation step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold mt-2"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Proceed to next challenge or complete mission"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs mt-3 shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Mission →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 rounded-3xl border border-indigo-800/60 text-center space-y-4">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Module Mastery Achieved!</h2>
            <div className="flex justify-center gap-6 text-sm font-mono">
              <span className="text-slate-300">Final Score: <strong className="text-emerald-400">✓ {Math.max(0, 100 - errors * 5)}%</strong></span>
              <span className="text-slate-300">BKT Mastery: <strong className="text-indigo-400 uppercase">{masteryLevel}</strong></span>
            </div>

            {/* Motivational Performance Message */}
            <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/40 text-xs text-emerald-300 max-w-xl mx-auto">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have demonstrated flawless mastery over standard functions, trigonometry, and logarithms.'
                : errors <= 3
                ? '🎯 Excellent comprehension! Review the slight misconceptions below to lock in a 100% score next round.'
                : '💪 Good perseverance! Applied mathematics builds step by step. Revisit the interactive labs and retry for full mastery!'}
            </div>
          </div>

          {/* ─── SPACED REPETITION (SRS) SCHEDULE CARD ─── */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-indigo-900/30 rounded-2xl border-2 border-indigo-500/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📅</span>
                <div>
                  <h3 className="text-sm font-bold text-indigo-200 uppercase tracking-wider">
                    Spaced Repetition Schedule (SRS)
                  </h3>
                  <p className="text-xs text-slate-400">Next scheduled memory consolidation review interval</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-indigo-500/20 border border-indigo-400/50 rounded-xl text-center">
                <span className="text-xs text-indigo-300 block uppercase font-bold tracking-wider">Recommended Action</span>
                <span className="text-base sm:text-lg font-black text-emerald-400">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className={`p-3.5 rounded-xl border transition-all ${errors === 0 ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200 shadow-md shadow-emerald-900/20' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div className="font-bold flex items-center justify-between mb-1">
                  <span>0 Errors (Perfect)</span>
                  {errors === 0 && <span className="text-emerald-400 font-bold">● Active Interval</span>}
                </div>
                <p className="text-xs"><strong>review in 7 days</strong> for long-term memory maintenance.</p>
              </div>

              <div className={`p-3.5 rounded-xl border transition-all ${errors >= 1 && errors <= 3 ? 'bg-amber-950/70 border-amber-500/80 text-amber-200 shadow-md shadow-amber-900/20' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div className="font-bold flex items-center justify-between mb-1">
                  <span>1–3 Errors (Good)</span>
                  {errors >= 1 && errors <= 3 && <span className="text-amber-400 font-bold">● Active Interval</span>}
                </div>
                <p className="text-xs"><strong>review in 3 days</strong> to reinforce subtle function domain rules.</p>
              </div>

              <div className={`p-3.5 rounded-xl border transition-all ${errors >= 4 ? 'bg-rose-950/70 border-rose-500/80 text-rose-200 shadow-md shadow-rose-900/20' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div className="font-bold flex items-center justify-between mb-1">
                  <span>4+ Errors (Review Needed)</span>
                  {errors >= 4 && <span className="text-rose-400 font-bold">● Active Interval</span>}
                </div>
                <p className="text-xs"><strong>review in 1 day</strong> to clear core formula and sign misconceptions.</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-indigo-900/40 text-xs text-slate-400">
              <span>Target retention rate: <strong className="text-white">90%+ SM-2 Algorithm</strong></span>
              <motion.button
                aria-label="Replay interactive labs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('explore');
                  setCurrentSlide(0);
                  audioManager.play('tap');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs"
              >
                Replay Labs ↺
              </motion.button>
            </div>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <span className="text-lg">💭</span>
              <h3 className="text-sm font-bold uppercase tracking-wider">Metacognitive Reflection</h3>
            </div>
            <p className="text-xs text-slate-400">Deepen your conceptual mastery by reflecting on these key takeaways:</p>

            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  1. What was the most surprising thing you learned?
                </label>
                <input
                  type="text"
                  aria-label="Reflection question 1: What was the most surprising thing you learned?"
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., How algebraic cancellation does NOT remove domain punctures at x = 1..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  2. How would you explain this to a friend?
                </label>
                <input
                  type="text"
                  aria-label="Reflection question 2: How would you explain this to a friend?"
                  value={reflectionAnswers.explain}
                  onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g., On the unit circle, horizontal is cosine and vertical is sine; ASTC gives the quadrant signs..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  3. Where in real life might you use this?
                </label>
                <input
                  type="text"
                  aria-label="Reflection question 3: Where in real life might you use this?"
                  value={reflectionAnswers.reallife}
                  onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, reallife: e.target.value }))}
                  placeholder="e.g., Radar satellite tracking angles, audio synthesizer compound frequencies, or decibel power scaling..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-900/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span>
                <span>Personalised Misconception Diagnosis</span>
              </h3>
              <p className="text-xs text-slate-400">Review the precise misconceptions flagged during your session:</p>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">✗ {m.misconception}</p>
                      <p className="text-emerald-400">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Capstone Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-indigo-400">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-400">
                  <span className="text-indigo-400 font-mono font-bold mr-1.5">{i + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE CONDITIONAL POPUP COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_AppliedMathsGraphsStandardRealSim;
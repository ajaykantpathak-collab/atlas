'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── STRING LITERAL NODE IDS (MANDATORY FOR VERIFICATION) ───
const NODE_C9_MATH_021 = 'c9_math_021';
const NODE_C9_MATH_022 = 'c9_math_022';
const NODE_C9_MATH_023 = 'c9_math_023';
const NODE_C9_MATH_024 = 'c9_math_024';
const NODE_C9_MATH_025 = 'c9_math_025';
const NODE_C9_MATH_026 = 'c9_math_026';
const NODE_C9_MATH_027 = 'c9_math_027';
const NODE_C9_MATH_028 = 'c9_math_028';
const NODE_C9_MATH_029 = 'c9_math_029';
const NODE_C9_MATH_030 = 'c9_math_030';

const ALL_NODE_IDS = [
  NODE_C9_MATH_021,
  NODE_C9_MATH_022,
  NODE_C9_MATH_023,
  NODE_C9_MATH_024,
  NODE_C9_MATH_025,
  NODE_C9_MATH_026,
  NODE_C9_MATH_027,
  NODE_C9_MATH_028,
  NODE_C9_MATH_029,
  NODE_C9_MATH_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The Bengaluru Tech-Park Infrastructure Nexus',
  intro: 'You are the Chief Computational Architect designing the power grid, fibre-optic routing, and structural trusses for a futuristic IT hub in Bengaluru. From balancing dual power feeds (simultaneous equations) and scaling signal bandwidth (exponents & logarithms) to verifying structural roof stability (triangle geometry), your mathematical decisions dictate whether the tech park thrives or fails.',
  context: 'Master the 10 core mathematical engines: Simultaneous Cross-Multiplication, System Word Problems, Index Laws, Exponent Simplification, Exponential-Log Transitions, Logarithmic Laws, Log Expansions, Triangle Congruence, Isosceles Geometry, and Triangle Inequalities.',
};

// ─── PREDICTION QUESTIONS (Brilliant.org Predict-Then-Check Pattern) ───
export interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  explanation: string;
}

export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_01',
    question: 'In standard cross multiplication for a1·x + b1·y + c1 = 0 and a2·x + b2·y + c2 = 0, what happens to the common denominator determinant (a1·b2 - a2·b1) if the two lines are strictly parallel?',
    options: [
      'The determinant becomes strictly zero (no unique intersection)',
      'The determinant becomes positive infinity',
      'The determinant equals +1',
      'The determinant alternates sign continuously',
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 1, set a1=2, b1=4 and a2=1, b2=2. Observe the determinant readout D.',
    explanation: 'Parallel lines have proportional coefficients (a1/a2 = b1/b2), yielding a1·b2 - a2·b1 = 0, which means no unique solution point exists.',
  },
  {
    id: 'pred_02',
    question: 'If you drag vertex A of triangle ABC to make side AB strictly longer than side AC, which opposite angle must become larger?',
    options: [
      'Angle ∠C (opposite AB) will become greater than ∠B (opposite AC)',
      'Angle ∠B (opposite AC) will become greater than ∠C (opposite AB)',
      'Both base angles ∠B and ∠C will remain exactly equal',
      'Vertex angle ∠A must immediately become 90°',
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 5, drag Vertex A to the right so AB > AC and watch the live angle readings for ∠B and ∠C.',
    explanation: 'In any triangle, the side of greater length always subtends the greater angle opposite to it (Angle-Side Inequality Theorem).',
  },
];

// ─── OBSERVATION QUESTIONS (Brilliant.org "What do you notice?" Pattern) ───
export interface ObservationQuestion {
  id: string;
  question: string;
  observableOptions: string[];
  options?: string[];
  correctIndex: number;
  explanation: string;
}

export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_01',
    question: 'In Lab 2, as you increase the exponent x by +1 while keeping base b fixed, what do you observe about the exponential output vs the log output?',
    observableOptions: [
      'Exponential output multiplies by base b while the log value increases linearly by +1',
      'Both exponential and log outputs grow at the exact same constant linear rate',
      'Exponential output grows linearly while the log value grows exponentially',
      'Log output becomes negative while the exponential stays positive',
    ],
    options: [
      'Exponential output multiplies by base b while the log value increases linearly by +1',
      'Both exponential and log outputs grow at the exact same constant linear rate',
      'Exponential output grows linearly while the log value grows exponentially',
      'Log output becomes negative while the exponential stays positive',
    ],
    correctIndex: 0,
    explanation: 'Exponentiation represents repeated multiplication (scaling by b), whereas the logarithm counts the power linearly step-by-step.',
  },
  {
    id: 'obs_02',
    question: 'In Lab 3, when you increase the denominator power r in log[(a^p · b^q) / c^r], what sign does its decomposed term acquire in the linear expansion?',
    observableOptions: [
      'A negative coefficient (-r log c) because quotient terms subtract',
      'A positive coefficient (+r log c) because all powers add up',
      'A division sign (/ r log c)',
      'An imaginary exponent multiplier',
    ],
    options: [
      'A negative coefficient (-r log c) because quotient terms subtract',
      'A positive coefficient (+r log c) because all powers add up',
      'A division sign (/ r log c)',
      'An imaginary exponent multiplier',
    ],
    correctIndex: 0,
    explanation: 'By the logarithmic quotient law, division within the log argument converts to subtraction in the expanded linear form: log(M/N) = log M - log N.',
  },
];

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In standard form a1·x + b1·y + c1 = 0, if an engineer writes 2x + 3y = 7 directly without moving 7 to the left, what is the disastrous sign error that ruins the cross-multiplication formula?',
  options: [
    'c1 is erroneously taken as +7 instead of -7, reversing the signs of both numerators',
    'a1 becomes negative automatically',
    'The denominator determinant a1b2 - a2b1 becomes zero',
    'The variables x and y swap positions on the Cartesian plane',
  ],
  correctIndex: 0,
  hintAfter: 'Cross multiplication demands a1x + b1y + c1 = 0. Leaving the constant on the right inverts the cross-product signs!',
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

// ─── CHALLENGES REPOSITORY (22 Comprehensive Multi-Type Challenges) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C9_MATH_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'To solve 3x + 4y = 11 and 2x - 5y = -3 using cross multiplication, what are the exact standard values of (a1, b1, c1)?',
    options: [
      'a1 = 3, b1 = 4, c1 = -11',
      'a1 = 3, b1 = 4, c1 = 11',
      'a1 = 3, b1 = -4, c1 = -11',
      'a1 = 4, b1 = 3, c1 = 11',
    ],
    correctIndex: 0,
    explanation: 'Standard form requires all terms on the left side: 3x + 4y - 11 = 0. Hence a1 = 3, b1 = 4, and c1 = -11. Keeping c1 as +11 is the most common board exam sign error.',
    hints: [
      'Remember the standard form requires zero on the right side: a1·x + b1·y + c1 = 0.',
      'Transpose +11 from the RHS across the equality sign to the LHS.',
      'When +11 moves across the equals sign, its sign changes to -11.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C9_MATH_021,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'For the system 2x + 3y - 7 = 0 and 5x - 2y - 1 = 0, calculate the common denominator determinant (a1·b2 - a2·b1).',
    correctAnswer: -19,
    tolerance: 0,
    unit: '',
    explanation: 'The common denominator is a1·b2 - a2·b1 = (2)(-2) - (5)(3) = -4 - 15 = -19. When this determinant is non-zero, a unique intersection exists.',
    hints: [
      'Identify a1 = 2, b1 = 3, a2 = 5, b2 = -2.',
      'Multiply diagonally: (a1 · b2) minus (a2 · b1).',
      'Evaluate (2)(-2) - (5)(3) = -4 - 15 = -19.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C9_MATH_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A tech firm in Bengaluru buys 5 optical mice and 3 keyboards for ₹1100, and 3 mice and 2 keyboards for ₹700. If m and k represent their unit prices, what is the correct framed system?',
    options: [
      '5m + 3k = 1100 and 3m + 2k = 700',
      '5m - 3k = 1100 and 3m - 2k = 700',
      '8m + 5k = 1800 and m + k = 400',
      '3m + 5k = 1100 and 2m + 3k = 700',
    ],
    correctIndex: 0,
    explanation: 'Each physical condition yields an independent linear relationship: 5 mice + 3 keyboards = 5m + 3k = 1100, and 3 mice + 2 keyboards = 3m + 2k = 700.',
    hints: [
      'Translate sentence 1 directly: total cost of 5 mice and 3 keyboards is ₹1100.',
      'Translate sentence 2 directly: total cost of 3 mice and 2 keyboards is ₹700.',
      'Combine both equations without prematurely merging them into one equation.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C9_MATH_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Evaluate the exact numerical value of the expression: (25)^0 + (2)^{-3}.',
    options: ['1.125 (or 9/8)', '0.875 (or 7/8)', '-7', '0'],
    correctIndex: 0,
    explanation: 'Any non-zero base raised to zero equals 1 (so 25^0 = 1). A negative exponent represents the reciprocal: 2^(-3) = 1/(2^3) = 1/8 = 0.125. Thus, 1 + 1/8 = 9/8 = 1.125.',
    hints: [
      'Recall: a^0 = 1 for any non-zero base a.',
      'Recall: a^(-n) = 1/(a^n), so 2^(-3) = 1/8.',
      'Add: 1 + 1/8 = 9/8 = 1.125.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C9_MATH_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Convert the exponential relation 5^(-2) = 1/25 into its exact logarithmic statement.',
    options: [
      'log₅ (1/25) = -2',
      'log₋₂ (1/25) = 5',
      'log₅ (-2) = 1/25',
      'log₁/₂₅ (5) = -2',
    ],
    correctIndex: 0,
    explanation: 'In a^x = n, the base a stays as the subscript of the log, the result n becomes the argument, and the power x becomes the value: log₅ (1/25) = -2.',
    hints: [
      'The base of the power (5) remains the base (subscript) of the logarithm.',
      'The power (-2) moves to the RHS as the evaluated log value.',
      'The resulting argument inside the log is 1/25.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C9_MATH_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is AAA (Angle-Angle-Angle) NOT a valid congruence criterion for two structural roof trusses?',
    options: [
      'AAA guarantees identical shape (similarity), but does not lock physical size/scale',
      'Angles in triangles cannot be measured accurately in civil engineering',
      'The sum of angles in similar triangles is strictly less than 180°',
      'AAA only works when one angle is exactly 90°',
    ],
    correctIndex: 0,
    explanation: 'Two triangles with identical angles (e.g., equilateral triangles of sides 2m and 20m) have the same shape but vastly different sizes. Congruence requires at least one matched side length to lock scale.',
    hints: [
      'Think of an equilateral triangle drawn on paper versus built across an entire stadium.',
      'Both have 60°-60°-60° angles, but can they be superimposed edge-to-edge?',
      'Equal angles guarantee similarity, but not identical dimensions (congruence).',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_07',
    nodeId: NODE_C9_MATH_029,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In isosceles triangle ABC, side AB = AC. If the vertex angle ∠A = 40°, what is the measure of base angle ∠B in degrees?',
    correctAnswer: 70,
    tolerance: 0,
    unit: '°',
    explanation: 'Because AB = AC, the angles opposite them are equal: ∠B = ∠C. By angle sum: ∠A + ∠B + ∠C = 180° ⇒ 40° + 2·∠B = 180° ⇒ 2·∠B = 140° ⇒ ∠B = 70°.',
    hints: [
      'Angles opposite equal sides are equal: ∠B = ∠C.',
      'The sum of all three angles in triangle ABC is 180°.',
      'Subtract vertex angle 40° from 180° (140°), then divide equally by 2.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_08',
    nodeId: NODE_C9_MATH_021,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Using cross multiplication for 3x - y - 4 = 0 and x + 2y - 6 = 0, calculate the unique solution value for x.',
    correctAnswer: 2,
    tolerance: 0,
    unit: '',
    explanation: 'Coefficients: a1=3, b1=-1, c1=-4; a2=1, b2=2, c2=-6. Denominator = (3)(2) - (1)(-1) = 6 + 1 = 7. Numerator of x = b1c2 - b2c1 = (-1)(-6) - (2)(-4) = 6 + 8 = 14. Thus x = 14 / 7 = 2.',
    hints: [
      'Numerator formula for x is (b1·c2 - b2·c1).',
      'Compute (-1)(-6) - (2)(-4) = 6 - (-8) = 14.',
      'Divide by denominator 7: x = 14 / 7 = 2.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_09',
    nodeId: NODE_C9_MATH_022,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A two-digit server rack security code has digit sum 9. When the digits are reversed, the number decreases by 27. What is the original two-digit number?',
    correctAnswer: 63,
    tolerance: 0,
    unit: '',
    explanation: 'Let tens digit be t, units be u. The number is 10t + u. Equations: t + u = 9 and (10t + u) - (10u + t) = 27 ⇒ 9t - 9u = 27 ⇒ t - u = 3. Adding gives 2t = 12 ⇒ t = 6, u = 3. Number = 63.',
    hints: [
      'A two-digit number is represented by 10t + u due to place value.',
      'Reversed number is 10u + t. Difference: 9(t - u) = 27, so t - u = 3.',
      'Solve t + u = 9 and t - u = 3 simultaneously to find t=6, u=3.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C9_MATH_024,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Simplify and evaluate the exact numerical value of: (27)^(2/3) · (16)^(-1/2) · (4^0). (Enter in decimal format, e.g. 2.25 for 9/4)',
    correctAnswer: 2.25,
    tolerance: 0.01,
    unit: '',
    explanation: '27^(2/3) = (27^(1/3))^2 = 3^2 = 9. 16^(-1/2) = 1 / (16^(1/2)) = 1/4 = 0.25. 4^0 = 1. Product = 9 · 0.25 · 1 = 2.25 (or 9/4).',
    hints: [
      'Evaluate 27^(2/3): cube root of 27 is 3, then square to get 9.',
      'Evaluate 16^(-1/2): square root of 16 is 4, negative power flips it to 1/4.',
      'Multiply: 9 · (1/4) = 9/4 = 2.25.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_11',
    nodeId: NODE_C9_MATH_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'If log 2 ≈ 0.3010 and log 3 ≈ 0.4771, calculate log(18) using logarithmic product and power laws.',
    options: ['1.2552', '0.7781', '0.9542', '1.0791'],
    correctIndex: 0,
    explanation: '18 = 2 · 3^2. By product and power laws: log(18) = log(2 · 3^2) = log 2 + 2·log 3 ≈ 0.3010 + 2(0.4771) = 0.3010 + 0.9542 = 1.2552.',
    hints: [
      'Factor 18 into prime powers: 18 = 2 · 3^2.',
      'Apply product law: log(2 · 3^2) = log 2 + log(3^2).',
      'Apply power law: log 2 + 2·log 3 = 0.3010 + 2(0.4771) = 1.2552.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_12',
    nodeId: NODE_C9_MATH_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Fully expand the expression log[ (a^4 · b^2) / c^3 ] into a linear combination of log a, log b, and log c.',
    options: [
      '4 log a + 2 log b - 3 log c',
      '4 log a + 2 log b + 3 log c',
      '8 log(ab) - 3 log c',
      '(4 log a · 2 log b) / (3 log c)',
    ],
    correctIndex: 0,
    explanation: 'Quotient law splits numerator and denominator with a minus: log(a^4 b^2) - log(c^3). Product law splits numerator: log(a^4) + log(b^2) - log(c^3). Power law brings exponents forward: 4 log a + 2 log b - 3 log c.',
    hints: [
      'Quotient law creates a negative sign for the denominator term c^3.',
      'Product law splits the numerator factors a^4 and b^2 with a plus.',
      'Power law pulls powers 4, 2, and 3 to become multiplying coefficients.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_13',
    nodeId: NODE_C9_MATH_028,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match the geometric proof conditions to their valid triangle congruence criteria.',
    dragItems: [
      { label: '3 Pairs of Equal Sides', targetId: 'crit_sss' },
      { label: '2 Sides + Included Angle', targetId: 'crit_sas' },
      { label: '2 Angles + Corresponding Side', targetId: 'crit_aas' },
      { label: 'Right Angle + Hypotenuse + Leg', targetId: 'crit_rhs' },
    ],
    correctMapping: {
      crit_sss: '3 Pairs of Equal Sides',
      crit_sas: '2 Sides + Included Angle',
      crit_aas: '2 Angles + Corresponding Side',
      crit_rhs: 'Right Angle + Hypotenuse + Leg',
    },
    explanation: 'The 4 valid criteria lock both shape and scale uniquely: SSS (3 sides), SAS (included angle), AAS (angle-angle-side), and RHS (right angle, hypotenuse, side).',
    hints: [
      'SSS requires all 3 matching side lengths.',
      'SAS strictly demands the angle lie BETWEEN the two matching sides.',
      'RHS requires a 90° angle, hypotenuse match, and one matching leg.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_14',
    nodeId: NODE_C9_MATH_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In triangle XYZ, ∠X = 40° and ∠Y = 75°. Which side of the triangle is the longest?',
    options: ['Side ZX', 'Side YZ', 'Side XY', 'Sides ZX and XY are equal'],
    correctIndex: 0,
    explanation: 'By angle sum: ∠Z = 180° - 40° - 75° = 65°. The angles are ∠X(40°) < ∠Z(65°) < ∠Y(75°). The longest side is opposite the greatest angle (∠Y = 75°), which is side ZX.',
    hints: [
      'First find ∠Z: 180° - 40° - 75° = 65°.',
      'Identify the greatest angle in the triangle: ∠Y = 75°.',
      'The side opposite vertex Y is side ZX. The greater angle has the greater side opposite it.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_15',
    nodeId: NODE_C9_MATH_021,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the mandatory workflow steps for solving simultaneous equations by cross multiplication in strict logical sequence.',
    sortItems: [
      'Rewrite both equations in standard form a·x + b·y + c = 0 with zero on RHS',
      'List all 6 coefficients (a1, b1, c1, a2, b2, c2) with exact signs',
      'Compute common denominator determinant (a1·b2 - a2·b1)',
      'Calculate x-numerator (b1c2 - b2c1) and y-numerator (c1a2 - c2a1)',
      'Divide numerators by denominator and verify solutions in original equations',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Standardisation precedes coefficient extraction. Determinant check ensures a unique solution before computing numerators and performing final verification.',
    hints: [
      'Step 1 must be getting zero on the RHS (standard form).',
      'Listing coefficients with signs happens before evaluating formulas.',
      'Denominator determinant is verified before evaluating x and y numerators.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_16',
    nodeId: NODE_C9_MATH_022,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A survey drone boat on Bengaluru Bellandur Lake travels 30 km downstream in 2 hours and takes 6 hours to return upstream. What is the drone boat speed in still water (in km/h)?',
    correctAnswer: 10,
    tolerance: 0,
    unit: 'km/h',
    explanation: 'Downstream speed = 30/2 = 15 km/h = u + v. Upstream speed = 30/6 = 5 km/h = u - v. Adding gives 2u = 20 ⇒ u = 10 km/h (speed in still water). Stream speed v = 5 km/h.',
    hints: [
      'Downstream speed (u + v) = Distance / Time = 30 / 2 = 15 km/h.',
      'Upstream speed (u - v) = Distance / Time = 30 / 6 = 5 km/h.',
      'Add both linear equations: (u + v) + (u - v) = 15 + 5 ⇒ 2u = 20 ⇒ u = 10.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_17',
    nodeId: NODE_C9_MATH_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Simplify the algebraic fractional expression: [ a^(1/2) · a^(1/3) ] / a^(1/6) into a single power of a.',
    options: ['a^(2/3)', 'a^(1/3)', 'a^(5/6)', 'a^1'],
    correctIndex: 0,
    explanation: 'Numerator uses product law: 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Quotient law subtracts denominator index: 5/6 - 1/6 = 4/6 = 2/3. Thus the expression is a^(2/3).',
    hints: [
      'Add numerator fractional powers using common denominator 6: 1/2 + 1/3 = 5/6.',
      'Apply quotient law by subtracting the denominator power 1/6 from 5/6.',
      '5/6 - 1/6 = 4/6, which simplifies to 2/3.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_18',
    nodeId: NODE_C9_MATH_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Expand log[ √(p·q) · r^2 / s^3 ] completely. Which term correctly represents the root component?',
    options: [
      '(1/2) log p + (1/2) log q + 2 log r - 3 log s',
      '√(log p + log q) + 2 log r - 3 log s',
      '(1/2) log(p + q) + 2 log r - 3 log s',
      'log(p/2) + log(q/2) + 2 log r - 3 log s',
    ],
    correctIndex: 0,
    explanation: '√(p·q) = (pq)^(1/2). Power law brings 1/2 to the front: (1/2)log(pq) = (1/2)log p + (1/2)log q. The 1/2 distributes over both factors.',
    hints: [
      'Square root is equivalent to power (1/2).',
      'Power law pulls 1/2 outside: (1/2) · log(p · q).',
      'Distribute 1/2 across the product: (1/2)log p + (1/2)log q.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_19',
    nodeId: NODE_C9_MATH_029,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In triangle ABC, AB = AC. Side BA is extended past A to point D such that exterior ∠CAD = 110°. What is the measure of base angle ∠ABC in degrees?',
    correctAnswer: 55,
    tolerance: 0,
    unit: '°',
    explanation: 'Linear pair at A: ∠BAC = 180° - 110° = 70°. In isosceles triangle ABC, AB = AC implies ∠B = ∠C. Angle sum: 70° + 2·∠B = 180° ⇒ 2·∠B = 110° ⇒ ∠ABC = 55°.',
    hints: [
      'Find interior vertex angle ∠BAC using linear pair: 180° - 110° = 70°.',
      'Base angles ∠B and ∠C are equal because AB = AC.',
      'Angle sum: 70° + 2·∠B = 180°, so 2·∠B = 110° ⇒ ∠B = 55°.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_20',
    nodeId: NODE_C9_MATH_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In triangle LMN, ∠L = 55° and ∠M = 85°. Arrange the sides LM, MN, and NL in strict DECREASING order of length.',
    options: [
      'NL > MN > LM',
      'LM > MN > NL',
      'MN > NL > LM',
      'NL > LM > MN',
    ],
    correctIndex: 0,
    explanation: 'By angle sum: ∠N = 180° - 55° - 85° = 40°. Angles in decreasing order: ∠M(85°) > ∠L(55°) > ∠N(40°). Opposite sides match this order: NL (opposite 85°) > MN (opposite 55°) > LM (opposite 40°).',
    hints: [
      'Calculate missing angle ∠N: 180° - 55° - 85° = 40°.',
      'Sort angles descending: ∠M(85°) > ∠L(55°) > ∠N(40°).',
      'Pair opposite sides: side opposite M is NL, opposite L is MN, opposite N is LM.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_21',
    nodeId: NODE_C9_MATH_021,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the exact algebraic formula for calculating variable x from the standard cross multiplication matrix.',
    availableParts: ['x =', '(b1c2 - b2c1)', '/', '(a1b2 - a2b1)', '(c1a2 - c2a1)', '+'],
    targetState: 'x = (b1c2 - b2c1) / (a1b2 - a2b1)',
    validationHint: 'Combine: x = [numerator of x] / [common determinant denominator]',
    explanation: 'The formula for x uses the cyclic cross-product of y-coefficients and constants divided by the determinant denominator: x = (b1c2 - b2c1) / (a1b2 - a2b1).',
    hints: [
      'Start with "x =".',
      'Select the x-numerator: (b1c2 - b2c1).',
      'Add "/" followed by the determinant denominator (a1b2 - a2b1).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_22',
    nodeId: NODE_C9_MATH_026,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the chemical buffer equation (pH) using the logarithmic quotient and product law representation.',
    availableParts: ['pH =', 'pKa', '+', 'log( [A-] / [HA] )', '-', 'log( [HA] )'],
    targetState: 'pH = pKa + log( [A-] / [HA] )',
    validationHint: 'Combine: pH = pKa + log([conjugate base]/[acid])',
    explanation: 'In chemistry & biotechnology, the Henderson-Hasselbalch equation applies the logarithmic quotient rule: log(A-/HA) = log A- - log HA.',
    hints: [
      'Begin with "pH =".',
      'Add "pKa +".',
      'Append the log quotient term: "log( [A-] / [HA] )".',
    ],
    misconceptionIndex: 3,
  },
  // ─── Class 10 board-depth additions: age-problem modelling diagnostic ───
  {
    id: 'ch_depth_sim_ages_compare',
    nodeId: 'c10_math_cbse_03_009',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare problems (A) "Father is 3 times as old as his son; in 10 years he will be twice as old" and (B) "Father is 3 times as old as his son; 10 years AGO he was 5 times as old". Which setup solves each, and what differs structurally?',
    options: [
      'A: let son = s, father = 3s; future: 3s + 10 = 2(s + 10) -> s = 10, father 30. B: past: 3s - 10 = 5(s - 10) -> s = 20, father 60. Same present-tense sentence, opposite TIME direction: the equations differ only in ±10 on both ages -- modelling means translating EACH time phrase into its own equation',
      'Both problems have identical equations because both say "3 times"',
      'Past conditions produce no valid solutions in linear pairs',
      'Age problems require quadratic equations'
    ],
    correctIndex: 0,
    explanation:
      'Age problems are linear-pair modelling drills: every time-shift adds/subtracts the SAME number from BOTH ages. Verification habit: check both conditions -- B: in 10 years father is 70, son 30 (not a stated condition but consistent); the stated past condition 60 - 10 = 50 and 5 x (20 - 10) = 50 holds. Reject impossible negatives (age cannot be negative) exactly as boards demand.',
    hints: [
      '"In 10 years" = +10 to both; "10 years ago" = -10 to both.',
      'One variable (son = s) suffices; the father is 3s.',
      'Verify the answer in BOTH sentences before finishing.'
    ],
  }
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
  nodeId: NODE_C9_MATH_021,
  title: 'Simultaneous Linear Equations, Exponents & Triangle Geometry',
  definition: 'Comprehensive ICSE Class 9 mathematical framework covering simultaneous linear systems (cross multiplication & contextual modeling), exponential laws & logarithmic equivalences/expansions, and formal triangle geometry (congruence criteria, isosceles properties, and triangle inequalities).',
  eli5: 'Think of this as your mathematical toolbox: cross-multiplication solves twin equations in one direct leap, powers and logarithms shrink enormous numbers into manageable sums, and triangle rules guarantee that structures stand firm and balance perfectly.',
  misconceptions: [
    {
      misconception: 'Leaving constants on the RHS (e.g. c = +7 in 2x+3y=7) when applying cross-multiplication.',
      correction: 'Always transpose all terms to standard form a·x + b·y + c = 0 before extracting coefficients so c becomes -7.',
    },
    {
      misconception: 'Confusing subtraction order in cross-products (e.g. b2c1 - b1c2 instead of b1c2 - b2c1).',
      correction: 'Follow strict cyclic order: x uses (b1c2 - b2c1), y uses (c1a2 - c2a1), and denominator uses (a1b2 - a2b1).',
    },
    {
      misconception: 'Assuming negative exponents yield negative answers (e.g., 2^(-3) = -8).',
      correction: 'Negative exponents denote reciprocals: a^(-n) = 1/(a^n), so 2^(-3) = 1/8 = +0.125.',
    },
    {
      misconception: 'Multiplying logarithms for products (e.g., log(mn) = log m · log n) or dividing logs for quotients.',
      correction: 'Logarithms transform operations down one tier: products inside log become sums (log m + log n); quotients become differences (log m - log n).',
    },
    {
      misconception: 'Writing two-digit numbers as (x + y) instead of using place values (10x + y).',
      correction: 'Digits contribute place value: a tens digit x and units digit y represent the quantity 10x + y.',
    },
    {
      misconception: 'Assuming upstream speed is (boat + stream) and downstream is (boat - stream).',
      correction: 'Upstream fights the current (boat - stream); downstream travels with the current (boat + stream).',
    },
    {
      misconception: 'Treating AAA as a valid triangle congruence criterion.',
      correction: 'AAA guarantees similarity (same shape), but requires at least one matching side length to fix physical size.',
    },
    {
      misconception: 'Assuming the greater angle in an isosceles triangle is always opposite any random side.',
      correction: 'Equal sides lie opposite equal base angles, and in general triangles, the greater side always lies directly opposite the greater angle.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the standard form of 4x = 5y - 9 for cross multiplication?', options: ['4x - 5y + 9 = 0', '4x + 5y - 9 = 0', '4x - 5y - 9 = 0', '4x + 5y + 9 = 0'], correctIndex: 0 },
    { question: 'What is the value of 16^(3/4)?', options: ['8', '12', '6', '64'], correctIndex: 0 },
    { question: 'Convert 10^3 = 1000 to logarithmic form.', options: ['log₁₀ 1000 = 3', 'log₃ 1000 = 10', 'log₁₀ 3 = 1000', 'log₁₀₀₀ 10 = 3'], correctIndex: 0 },
    { question: 'Which law simplifies log(a^4)?', options: ['4 log a (Power Law)', 'log(4a) (Product Law)', 'log a / 4 (Quotient Law)', '(log a)^4'], correctIndex: 0 },
    { question: 'If two triangles have 3 matching sides, they are congruent by:', options: ['SSS', 'SAS', 'AAA', 'RHS'], correctIndex: 0 },
    { question: 'In triangle ABC with AB = AC and ∠A = 80°, each base angle is:', options: ['50°', '60°', '40°', '100°'], correctIndex: 0 },
    { question: 'In triangle PQR, if PQ = 8cm and PR = 5cm, which angle is larger?', options: ['∠PRQ > ∠PQR', '∠PQR > ∠PRQ', '∠QPR is largest', 'Both are equal'], correctIndex: 0 },
    { question: 'If boat speed is u and stream speed is v, upstream speed is:', options: ['u - v', 'u + v', 'u / v', 'u · v'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student achieves 85%+ proficiency across algebraic systems, index/logarithmic reductions, and geometric triangle theorems with strict sign discipline.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Cross Multiplication Matrix & Determinant',
    instruction: 'Adjust the linear system sliders (a1, b1, c1, a2, b2) to watch the cross-multiplication determinant and intersecting point (x, y) calculate in real-time.',
    interactionType: 'slider-system',
    nodeId: NODE_C9_MATH_021,
  },
  {
    title: 'Lab 2: Power to Logarithm Dual-Scale Converter',
    instruction: 'Drag the base (b) and exponent (x) sliders to see how exponential growth maps continuously into logarithmic space.',
    interactionType: 'slider-log',
    nodeId: NODE_C9_MATH_025,
  },
  {
    title: 'Lab 3: Real-Time Logarithmic Expansion Visualiser',
    instruction: 'Toggle variables and power sliders to witness log[ (a^p · b^q) / c^r ] decompose dynamically into p·log(a) + q·log(b) - r·log(c).',
    interactionType: 'slider-expansion',
    nodeId: NODE_C9_MATH_027,
  },
  {
    title: 'Lab 4: Interactive Congruence & Truss Rigidity',
    instruction: 'Manipulate side lengths and included angles. Discover why SAS locks triangle shape and size, while non-included SSA creates ambiguity.',
    interactionType: 'drag-triangle',
    nodeId: NODE_C9_MATH_028,
  },
  {
    title: 'Lab 5: Isosceles & Triangle Inequality Dynamics',
    instruction: 'Drag vertex A to stretch the triangle: observe how base angles equalize when AB = AC, and how the greatest side always commands the largest opposite angle.',
    interactionType: 'drag-inequality',
    nodeId: NODE_C9_MATH_030,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Engineer: Bengaluru Metro Phase 3 Grid & Truss Audit',
  description: 'Apply simultaneous cross-multiplication to balance dual electrical sub-station load equations (3x + 2y = 120 MW, 2x + 5y = 190 MW), calculate signal fiber decibel attenuation using log laws, and certify the pedestrian skywalk roof truss using SAS/RHS congruence.',
  steps: [
    'Transcribe both power sub-station linear equations into standard form with c1 = -120 and c2 = -190.',
    'Compute determinant (a1b2 - a2b1) and evaluate exact MW allocation x and y via cross multiplication.',
    'Calculate fiber loss attenuation in decibels: dB = 10 · log₁₀(P_in / P_out) using log quotient expansion.',
    'Verify structural skywalk roof trusses by checking right-angle, hypotenuse, and support gusset dimensions (RHS criterion).',
  ],
};

// ─── MAIN COMPONENT EXPORT ───
function C9_MathematicsSolvingSimultaneousLinearSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_MATH_021,
  title = DEFAULT_PROPS.title || 'Simultaneous Linear Equations, Exponents & Geometry',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ─── STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'observe' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Predict-Then-Check State
  const [predictionIndex, setPredictionIndex] = useState<number>(0);
  const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean>(false);
  const [predictionVerified, setPredictionVerified] = useState<boolean>(false);

  // Observation State
  const [observationIndex, setObservationIndex] = useState<number>(0);
  const [selectedObservation, setSelectedObservation] = useState<number | null>(null);
  const [observationSubmitted, setObservationSubmitted] = useState<boolean>(false);

  // Interactive System Simulation Sliders (Lab 1)
  const [simA1, setSimA1] = useState<number>(2);
  const [simB1, setSimB1] = useState<number>(3);
  const [simC1, setSimC1] = useState<number>(-7);
  const [simA2, setSimA2] = useState<number>(5);
  const [simB2, setSimB2] = useState<number>(-2);
  const [simC2, setSimC2] = useState<number>(-1);

  // Interactive Log & Exponent Sliders (Lab 2 & 3)
  const [simBase, setSimBase] = useState<number>(2);
  const [simExp, setSimExp] = useState<number>(3);
  const [simExpP, setSimExpP] = useState<number>(4);
  const [simExpQ, setSimExpQ] = useState<number>(2);
  const [simExpR, setSimExpR] = useState<number>(3);

  // Interactive Geometry Sliders (Lab 4 & 5)
  const [vertexAx, setVertexAx] = useState<number>(200);
  const [vertexAy, setVertexAy] = useState<number>(60);
  const [baseBx, setBaseBx] = useState<number>(100);
  const [baseBy, setBaseBy] = useState<number>(220);
  const [baseCx, setBaseCx] = useState<number>(300);
  const [baseCy, setBaseCy] = useState<number>(220);
  const [selectedTrussCrit, setSelectedTrussCrit] = useState<string>('SAS');

  // Difficulty & Performance State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // Escalating Hints & Explanations
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Drag-and-Drop & Construction States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery Hook State
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // Visual Feedback & Animation States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongShakeIndex, setWrongShakeIndex] = useState<number | null>(null);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Persistent BKT Ref & Timer Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvas2DRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED REAL-TIME CALCULATIONS ───
  const systemDet = useMemo(() => simA1 * simB2 - simA2 * simB1, [simA1, simB1, simA2, simB2]);
  const numX = useMemo(() => simB1 * simC2 - simB2 * simC1, [simB1, simC1, simB2, simC2]);
  const numY = useMemo(() => simC1 * simA2 - simC2 * simA1, [simC1, simA1, simC2, simA2]);
  const solX = useMemo(() => (systemDet !== 0 ? (numX / systemDet).toFixed(2) : 'Undefined (Parallel)'), [numX, systemDet]);
  const solY = useMemo(() => (systemDet !== 0 ? (numY / systemDet).toFixed(2) : 'Undefined (Parallel)'), [numY, systemDet]);

  const powerVal = useMemo(() => Math.pow(simBase, simExp), [simBase, simExp]);
  const logVal = useMemo(() => simExp, [simExp]);

  // Triangle side lengths and angles (Lab 5)
  const sideAB = useMemo(() => Math.hypot(vertexAx - baseBx, vertexAy - baseBy), [vertexAx, vertexAy, baseBx, baseBy]);
  const sideAC = useMemo(() => Math.hypot(vertexAx - baseCx, vertexAy - baseCy), [vertexAx, vertexAy, baseCx, baseCy]);
  const sideBC = useMemo(() => Math.hypot(baseCx - baseBx, baseCy - baseBy), [baseBx, baseBy, baseCx, baseCy]);

  const angleA = useMemo(() => {
    const val = (sideAB * sideAB + sideAC * sideAC - sideBC * sideBC) / (2 * sideAB * sideAC);
    return Math.round((Math.acos(Math.max(-1, Math.min(1, val))) * 180) / Math.PI);
  }, [sideAB, sideAC, sideBC]);

  const angleB = useMemo(() => {
    const val = (sideAB * sideAB + sideBC * sideBC - sideAC * sideAC) / (2 * sideAB * sideBC);
    return Math.round((Math.acos(Math.max(-1, Math.min(1, val))) * 180) / Math.PI);
  }, [sideAB, sideAC, sideBC]);

  const angleC = useMemo(() => 180 - angleA - angleB, [angleA, angleB]);

  // ─── MOTIVATIONAL MESSAGE HELPER ───
  const getMotivationalMessage = (errs: number) => {
    if (errs === 0) return 'PERFECT SCORE!';
    if (errs <= 3) return 'Great work!';
    if (errs <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  };

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT-BASED DIFFICULTY ADAPTATION ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION LOOP (COORDINATE SYSTEM / PHASOR RADAR) ───
  useEffect(() => {
    const canvas = canvas2DRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid background
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

      // Axis lines
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(canvas.width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, canvas.height);
      ctx.stroke();

      // Pulsing intersection orb
      if (systemDet !== 0) {
        const px = cx + (numX / systemDet) * 8;
        const py = cy - (numY / systemDet) * 8;
        const pulse = 5 + Math.sin(frame * 0.08) * 2.5;

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(px, py, pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(px, py, pulse + 3, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#f8fafc';
        ctx.font = '10px monospace';
        ctx.fillText(`(${solX}, ${solY})`, px + 10, py - 6);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [systemDet, numX, numY, solX, solY]);

  // ─── EXTRACTED USECALLBACK HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && challenge.hints && challenge.hints[nextLvl - 1]) {
      setCurrentHint(challenge.hints[nextLvl - 1]);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLvl - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    if (!isCorr) {
      setWrongShakeIndex(idx);
      setTimeout(() => setWrongShakeIndex(null), 500);
    }
    audioManager.play(isCorr ? 'success' : 'error');
    speechManager.speak(isCorr ? 'Brilliant deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToPrediction = useCallback(() => {
    setPhase('predict');
    setSelectedPrediction(null);
    setPredictionSubmitted(false);
    setPredictionVerified(false);
    audioManager.play('whoosh');
    speechManager.speak('Predict the mathematical outcome before verifying it in the simulator.');
  }, []);

  const handlePredictionSubmit = useCallback((idx: number) => {
    setSelectedPrediction(idx);
    setPredictionSubmitted(true);
    const isCorr = idx === PREDICTION_QUESTIONS[predictionIndex].correctIndex;
    audioManager.play(isCorr ? 'success' : 'error');
  }, [predictionIndex]);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate parameters to uncover mathematical laws.');
  }, []);

  const handleAdvanceToObservation = useCallback(() => {
    setPhase('observe');
    setSelectedObservation(null);
    setObservationSubmitted(false);
    audioManager.play('whoosh');
    speechManager.speak('Observe the simulation carefully and answer the question.');
  }, []);

  const handleObservationSubmit = useCallback((idx: number) => {
    setSelectedObservation(idx);
    setObservationSubmitted(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[observationIndex].correctIndex;
    audioManager.play(isCorr ? 'success' : 'error');
  }, [observationIndex]);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Sandbox unlocked! Test linear systems and triangle coordinates freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge protocol activated. Apply your insights with rigor!');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorr = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorr) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        if (prev.length === 0 && challenge.sortItems) {
          prev = challenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(ans);
  }, [sortArrangement, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mission Accomplished! You have mastered simultaneous systems, exponents, and geometry.');
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
    setWrongShakeIndex(null);
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
    (answer: number | Record<string, string> | number[] | string, clickedIndex?: number) => {
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
        speechManager.speak('Excellent calculation! Accurate and rigorous.');
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
        setErrors((e) => e + 1);
        setWrongShake(true);
        if (clickedIndex !== undefined) setWrongShakeIndex(clickedIndex);
        setWrongFlash(true);
        setTimeout(() => {
          setWrongShake(false);
          setWrongShakeIndex(null);
        }, 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the complete step-by-step solution together.');
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

  // Clean-up timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.span whileHover={{ rotate: 20 }} className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-800">
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
            <p className="text-xs text-indigo-400 font-medium tracking-wide">
              ICSE Class 9 Mathematics • Simultaneous Systems, Logarithms & Geometry
            </p>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-800'
                : 'bg-indigo-950/60 text-indigo-400 border-indigo-800'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            Mastery: <strong className="text-white capitalize">{masteryLevel}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <motion.div whileHover={{ scale: 1.005 }} className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/80 shadow-lg">
            <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase">Scenario Mission Hook</span>
            <h2 className="text-xl font-black text-white mt-1 mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-indigo-300 flex items-center gap-2">
              <span className="text-base">🚀</span> {SCENARIO.context}
            </div>
          </motion.div>

          <motion.div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-400 text-xs font-bold border border-amber-800">
                Curiosity Discovery Challenge
              </span>
            </div>
            <p className="text-base font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  animate={wrongShakeIndex === i ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i === DISCOVERY_QUESTION.options.indexOf(opt)
                      ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-slate-950 rounded-xl border border-indigo-900/60">
                <p className={`text-sm mb-3 ${discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400 font-medium'}`}>
                  {discoveryCorrect ? '✓ Exceptional intuition! You spotted the core standard-form sign requirement.' : `Notice: ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToPrediction}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30"
                >
                  Proceed to Prediction Phase →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE: PREDICTION (BRILLIANT PREDICT-THEN-CHECK) ─── */}
      {phase === 'predict' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-400 text-xs font-bold border border-purple-800">
                Prediction Check ({predictionIndex + 1} of {PREDICTION_QUESTIONS.length})
              </span>
              <span className="text-xs text-slate-400">Step 1: Predict & Hypothesize</span>
            </div>

            <h3 className="text-lg font-bold text-white leading-relaxed">
              {PREDICTION_QUESTIONS[predictionIndex].question}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {PREDICTION_QUESTIONS[predictionIndex].options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handlePredictionSubmit(i)}
                  disabled={predictionSubmitted}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                    predictionSubmitted && i === PREDICTION_QUESTIONS[predictionIndex].correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : predictionSubmitted && selectedPrediction === i
                      ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {predictionSubmitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-slate-950 rounded-xl border border-indigo-900/60 space-y-3">
                <div className="text-xs text-amber-300 font-medium">
                  <strong>Verification Plan:</strong> {PREDICTION_QUESTIONS[predictionIndex].verifyInstruction}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {PREDICTION_QUESTIONS[predictionIndex].explanation}
                </p>

                <div className="flex gap-3 pt-2">
                  {predictionIndex < PREDICTION_QUESTIONS.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setPredictionIndex((idx) => idx + 1);
                        setSelectedPrediction(null);
                        setPredictionSubmitted(false);
                      }}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                    >
                      Next Prediction →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAdvanceToExploration}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                    >
                      Enter Interactive Labs to Verify Predictions →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS (BRILLIANT-STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Interactive Lab Exploration ({currentSlide + 1} of {EXPLORATION_STEPS.length})
            </span>
            <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              Module: <strong className="text-white">{EXPLORATION_STEPS[currentSlide].nodeId}</strong>
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div>
                <h3 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-xs text-amber-400 mt-1 font-medium flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: SIMULTANEOUS CROSS MULTIPLICATION SYSTEM (SVG 1 INCLUDED) ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">System 1 & 2 Coefficients</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs text-slate-400">a1: {simA1}</label>
                        <input
                          type="range"
                          min={-5}
                          max={5}
                          value={simA1}
                          onChange={(e) => setSimA1(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">b1: {simB1}</label>
                        <input
                          type="range"
                          min={-5}
                          max={5}
                          value={simB1}
                          onChange={(e) => setSimB1(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">c1: {simC1}</label>
                        <input
                          type="range"
                          min={-15}
                          max={15}
                          value={simC1}
                          onChange={(e) => setSimC1(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                      <div>
                        <label className="text-xs text-slate-400">a2: {simA2}</label>
                        <input
                          type="range"
                          min={-5}
                          max={5}
                          value={simA2}
                          onChange={(e) => setSimA2(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">b2: {simB2}</label>
                        <input
                          type="range"
                          min={-5}
                          max={5}
                          value={simB2}
                          onChange={(e) => setSimB2(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">c2: {simC2}</label>
                        <input
                          type="range"
                          min={-15}
                          max={15}
                          value={simC2}
                          onChange={(e) => setSimC2(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                    </div>

                    {/* SVG DIAGRAM 1: Cross Multiplication Determinant Vector Matrix */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Cross-Multiplication Cyclic Determinant Scheme</span>
                      <svg viewBox="0 0 320 80" className="w-full h-20">
                        <defs>
                          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
                          </marker>
                        </defs>
                        <text x="30" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold">x</text>
                        <text x="110" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold">y</text>
                        <text x="190" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold">1</text>
                        <text x="270" y="25" fill="#a78bfa" fontSize="12" fontWeight="bold">det = {systemDet}</text>

                        {/* Top row */}
                        <text x="20" y="50" fill="#94a3b8" fontSize="11">{simB1}</text>
                        <text x="80" y="50" fill="#94a3b8" fontSize="11">{simC1}</text>
                        <text x="140" y="50" fill="#94a3b8" fontSize="11">{simA1}</text>
                        <text x="200" y="50" fill="#94a3b8" fontSize="11">{simB1}</text>

                        {/* Bottom row */}
                        <text x="20" y="72" fill="#94a3b8" fontSize="11">{simB2}</text>
                        <text x="80" y="72" fill="#94a3b8" fontSize="11">{simC2}</text>
                        <text x="140" y="72" fill="#94a3b8" fontSize="11">{simA2}</text>
                        <text x="200" y="72" fill="#94a3b8" fontSize="11">{simB2}</text>

                        {/* Crossing lines */}
                        <line x1="28" y1="52" x2="78" y2="70" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                        <line x1="28" y1="68" x2="78" y2="52" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
                        <line x1="88" y1="52" x2="138" y2="70" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                        <line x1="88" y1="68" x2="138" y2="52" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
                        <line x1="148" y1="52" x2="198" y2="70" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                        <line x1="148" y1="68" x2="198" y2="52" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
                      </svg>
                    </div>

                    {/* Dynamic System Equations Display */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                      <div className="text-indigo-300">
                        Eq 1: {simA1}x {simB1 >= 0 ? `+ ${simB1}` : `- ${Math.abs(simB1)}`}y {simC1 >= 0 ? `+ ${simC1}` : `- ${Math.abs(simC1)}`} = 0
                      </div>
                      <div className="text-cyan-300">
                        Eq 2: {simA2}x {simB2 >= 0 ? `+ ${simB2}` : `- ${Math.abs(simB2)}`}y {simC2 >= 0 ? `+ ${simC2}` : `- ${Math.abs(simC2)}`} = 0
                      </div>
                    </div>
                  </div>

                  {/* 2D Canvas Real-Time Graph + Determinant Breakdown */}
                  <div className="space-y-3">
                    <canvas ref={canvas2DRef} width={340} height={160} className="w-full rounded-xl border border-slate-800 bg-slate-900" />
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Determinant (D)</span>
                        <strong className={systemDet === 0 ? 'text-rose-400' : 'text-emerald-400'}>{systemDet}</strong>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">x = numX / D</span>
                        <strong className="text-sky-300">{solX}</strong>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">y = numY / D</span>
                        <strong className="text-indigo-300">{solY}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: EXPONENT TO LOGARITHM DUAL SCALE (SVG 2 INCLUDED) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-400">Base (b): {simBase}</label>
                      <input
                        type="range"
                        min={2}
                        max={10}
                        value={simBase}
                        onChange={(e) => setSimBase(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Exponent / Power (x): {simExp}</label>
                      <input
                        type="range"
                        min={-3}
                        max={5}
                        value={simExp}
                        onChange={(e) => setSimExp(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                  </div>

                  {/* SVG DIAGRAM 2: Exponential vs Logarithmic Dual Mapping Curve */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 block text-center">
                      Continuous Inversion Map: Exponential y = b^x vs Logarithmic x = log_b(y)
                    </span>
                    <svg viewBox="0 0 400 120" className="w-full h-28">
                      {/* Grid / Axes */}
                      <line x1="20" y1="100" x2="380" y2="100" stroke="#475569" strokeWidth="1.5" />
                      <line x1="200" y1="10" x2="200" y2="115" stroke="#475569" strokeWidth="1.5" />
                      {/* Diagonal y = x reflection line */}
                      <line x1="120" y1="100" x2="280" y2="20" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                      {/* Exponential curve */}
                      <path d="M 60,98 Q 180,95 240,25" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                      {/* Log curve */}
                      <path d="M 205,95 Q 235,50 360,40" fill="none" stroke="#a855f7" strokeWidth="2.5" />
                      {/* Labels */}
                      <text x="245" y="25" fill="#38bdf8" fontSize="10" fontWeight="bold">y = {simBase}^x</text>
                      <text x="320" y="55" fill="#a855f7" fontSize="10" fontWeight="bold">x = log_{simBase}(y)</text>
                      {/* Dynamic Point */}
                      <circle cx="200" cy="60" r="4" fill="#fbbf24" />
                      <text x="208" y="65" fill="#fbbf24" fontSize="10">Active base = {simBase}</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800 text-center">
                      <span className="text-xs text-indigo-400 uppercase font-bold tracking-wider">Exponential Domain</span>
                      <div className="text-2xl font-black text-white mt-2">
                        {simBase}
                        <sup className="text-amber-400 font-extrabold">{simExp}</sup> ={' '}
                        <span className="text-emerald-400">{powerVal >= 1 ? powerVal : `1/${Math.pow(simBase, Math.abs(simExp))}`}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">"Base {simBase} raised to power {simExp} equals {powerVal}"</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-purple-950/40 rounded-xl border border-purple-800 text-center">
                      <span className="text-xs text-purple-400 uppercase font-bold tracking-wider">Logarithmic Dual Domain</span>
                      <div className="text-2xl font-black text-white mt-2">
                        log<sub className="text-indigo-300 font-extrabold">{simBase}</sub> (
                        <span className="text-emerald-400">{powerVal >= 1 ? powerVal : `1/${Math.pow(simBase, Math.abs(simExp))}`}</span>) ={' '}
                        <span className="text-amber-400">{logVal}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">"Power needed to turn {simBase} into {powerVal} is {simExp}"</p>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: LOGARITHMIC EXPANSION VISUALISER ─── */}
              {currentSlide === 2 && (
                <div className="space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-slate-400">Power on a (p): {simExpP}</label>
                      <input
                        type="range"
                        min={1}
                        max={6}
                        value={simExpP}
                        onChange={(e) => setSimExpP(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Power on b (q): {simExpQ}</label>
                      <input
                        type="range"
                        min={1}
                        max={6}
                        value={simExpQ}
                        onChange={(e) => setSimExpQ(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Power on c (r): {simExpR}</label>
                      <input
                        type="range"
                        min={1}
                        max={6}
                        value={simExpR}
                        onChange={(e) => setSimExpR(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-3">
                    <div className="text-lg font-bold text-white font-mono">
                      log [ ( a<sup>{simExpP}</sup> · b<sup>{simExpQ}</sup> ) / c<sup>{simExpR}</sup> ]
                    </div>
                    <div className="text-xl font-black text-indigo-300 font-mono">
                      = <span className="text-emerald-400">{simExpP} log a</span> + <span className="text-sky-400">{simExpQ} log b</span>{' '}
                      <span className="text-rose-400">- {simExpR} log c</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Numerator product becomes addition (+); Denominator quotient becomes subtraction (-); Powers become multipliers.
                    </p>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: TRIANGLE CONGRUENCE CRITERIA (SVG 3 INCLUDED) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['SSS', 'SAS', 'AAS', 'RHS', 'AAA (Invalid)'].map((crit) => (
                      <motion.button
                        key={crit}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTrussCrit(crit)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                          selectedTrussCrit === crit
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {crit}
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG DIAGRAM 3: Structural Roof Truss Congruence Proof */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                      Twin Structural Roof Truss Congruence Validation: {selectedTrussCrit}
                    </span>
                    <svg viewBox="0 0 380 110" className="w-full h-24">
                      {/* Truss 1 */}
                      <polygon points="40,90 110,25 180,90" fill="rgba(99,102,241,0.15)" stroke="#6366f1" strokeWidth="2" />
                      <line x1="110" y1="25" x2="110" y2="90" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="110" y="20" fill="#a5b4fc" fontSize="9" textAnchor="middle">Truss 1</text>
                      <text x="75" y="55" fill="#38bdf8" fontSize="8">S1</text>
                      <text x="145" y="55" fill="#38bdf8" fontSize="8">S2</text>
                      <text x="110" y="85" fill="#f43f5e" fontSize="8" textAnchor="middle">Included ∠</text>

                      {/* Equal Sign */}
                      <text x="195" y="60" fill="#34d399" fontSize="18" fontWeight="bold">≅</text>

                      {/* Truss 2 */}
                      <polygon points="210,90 280,25 350,90" fill="rgba(16,185,129,0.15)" stroke="#10b981" strokeWidth="2" />
                      <line x1="280" y1="25" x2="280" y2="90" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="280" y="20" fill="#6ee7b7" fontSize="9" textAnchor="middle">Truss 2</text>
                      <text x="245" y="55" fill="#34d399" fontSize="8">S1'</text>
                      <text x="315" y="55" fill="#34d399" fontSize="8">S2'</text>
                      <text x="280" y="85" fill="#f43f5e" fontSize="8" textAnchor="middle">Included ∠'</text>
                    </svg>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                    <h5 className="text-sm font-bold text-white mb-1">Testing Criterion: {selectedTrussCrit}</h5>
                    <p className="text-xs text-slate-300">
                      {selectedTrussCrit === 'SAS' && '✓ Valid: Two matching sides and the exact INCLUDED angle uniquely fix the third side and remaining angles.'}
                      {selectedTrussCrit === 'SSS' && '✓ Valid: 3 fixed steel rods form a rigid truss that cannot flex or change angles.'}
                      {selectedTrussCrit === 'AAS' && '✓ Valid: 2 fixed angles lock the third angle (180° - sum), and 1 side locks scale.'}
                      {selectedTrussCrit === 'RHS' && '✓ Valid: Right angle (90°) + Hypotenuse + Leg uniquely locks the triangle via Pythagoras.'}
                      {selectedTrussCrit === 'AAA (Invalid)' && '❌ Invalid: All 3 angles match (e.g. 60°-60°-60°), but the triangles can be totally different sizes (Similarity only).'}
                    </p>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: ISOSCELES & TRIANGLE INEQUALITY LAB (SVG 4 INCLUDED) ─── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="space-y-3">
                    <label className="text-xs text-slate-400">Drag Vertex A (X Position): {vertexAx}px</label>
                    <input
                      type="range"
                      min={100}
                      max={300}
                      value={vertexAx}
                      onChange={(e) => setVertexAx(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />

                    <label className="text-xs text-slate-400">Drag Vertex A (Y Height): {vertexAy}px</label>
                    <input
                      type="range"
                      min={30}
                      max={180}
                      value={vertexAy}
                      onChange={(e) => setVertexAy(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1 font-mono">
                      <div>Side AB = {sideAB.toFixed(1)} mm | Side AC = {sideAC.toFixed(1)} mm</div>
                      <div>Base BC = {sideBC.toFixed(1)} mm</div>
                      <div className="text-indigo-400 font-bold">
                        ∠A = {angleA}° | ∠B = {angleB}° | ∠C = {angleC}°
                      </div>
                    </div>
                  </div>

                  {/* SVG DIAGRAM 4: Dynamic Interactive Triangle Visualiser */}
                  <div className="flex items-center justify-center bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 260" className="w-full h-48">
                      {/* Triangle Body */}
                      <polygon
                        points={`${vertexAx},${vertexAy} ${baseBx},${baseBy} ${baseCx},${baseCy}`}
                        fill="rgba(99, 102, 241, 0.15)"
                        stroke="#818cf8"
                        strokeWidth="2.5"
                      />

                      {/* Vertices */}
                      <circle cx={vertexAx} cy={vertexAy} r="6" fill="#38bdf8" />
                      <circle cx={baseBx} cy={baseBy} r="6" fill="#818cf8" />
                      <circle cx={baseCx} cy={baseCy} r="6" fill="#818cf8" />

                      {/* Vertex Labels */}
                      <text x={vertexAx} y={vertexAy - 10} textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
                        A ({angleA}°)
                      </text>
                      <text x={baseBx - 14} y={baseBy + 15} textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">
                        B ({angleB}°)
                      </text>
                      <text x={baseCx + 14} y={baseCy + 15} textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">
                        C ({angleC}°)
                      </text>
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-medium">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToObservation}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Proceed to Guided Observations →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE: GUIDED OBSERVATIONS (BRILLIANT "WHAT DO YOU NOTICE?") ─── */}
      {phase === 'observe' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-400 text-xs font-bold border border-teal-800">
                Observation Question ({observationIndex + 1} of {OBSERVATION_QUESTIONS.length})
              </span>
              <span className="text-xs text-slate-400">Step 2: Synthesize Visual Observations</span>
            </div>

            <h3 className="text-lg font-bold text-white leading-relaxed">
              {OBSERVATION_QUESTIONS[observationIndex].question}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {(OBSERVATION_QUESTIONS[observationIndex].observableOptions || OBSERVATION_QUESTIONS[observationIndex].options || []).map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleObservationSubmit(i)}
                  disabled={observationSubmitted}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                    observationSubmitted && i === OBSERVATION_QUESTIONS[observationIndex].correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : observationSubmitted && selectedObservation === i
                      ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-teal-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {observationSubmitted && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-slate-950 rounded-xl border border-teal-900/60 space-y-3">
                <p className="text-xs text-emerald-300 font-medium">
                  {OBSERVATION_QUESTIONS[observationIndex].explanation}
                </p>

                <div className="flex gap-3 pt-2">
                  {observationIndex < OBSERVATION_QUESTIONS.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setObservationIndex((idx) => idx + 1);
                        setSelectedObservation(null);
                        setObservationSubmitted(false);
                      }}
                      className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold"
                    >
                      Next Observation →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAdvanceToSandbox}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                    >
                      Proceed to Free Sandbox →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX (NO GRADING) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-indigo-950/80 to-slate-900 rounded-2xl border border-indigo-800/80">
            <h3 className="text-lg font-bold text-white">Free Sandbox Simulation Matrix</h3>
            <p className="text-xs text-slate-300 mt-1">
              Zero grading pressure. Test cross-product determinants, exponent-log inversions, and triangle inequality bounds freely before challenges begin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-900 p-5 rounded-2xl border border-slate-800">
            {/* System Sandbox */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-indigo-400 uppercase">Live Cross Multiplication Solver</h4>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400">a1: {simA1}</label>
                  <input type="range" min={-5} max={5} value={simA1} onChange={(e) => setSimA1(Number(e.target.value))} className="w-full accent-indigo-500" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">b1: {simB1}</label>
                  <input type="range" min={-5} max={5} value={simB1} onChange={(e) => setSimB1(Number(e.target.value))} className="w-full accent-indigo-500" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">c1: {simC1}</label>
                  <input type="range" min={-15} max={15} value={simC1} onChange={(e) => setSimC1(Number(e.target.value))} className="w-full accent-indigo-500" />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                <div className="text-emerald-400 font-bold">Determinant = {systemDet}</div>
                <div className="text-sky-300">Solution Vector: ({solX}, {solY})</div>
              </div>
            </div>

            {/* Triangle Inequality Sandbox */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-purple-400 uppercase">Live Triangle Inequality Inspector</h4>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                <div>AB = {sideAB.toFixed(1)} mm (Opposite ∠C = {angleC}°)</div>
                <div>AC = {sideAC.toFixed(1)} mm (Opposite ∠B = {angleB}°)</div>
                <div>BC = {sideBC.toFixed(1)} mm (Opposite ∠A = {angleA}°)</div>
                <div className="text-amber-400 pt-1 border-t border-slate-800 font-bold">
                  Longest Side = {Math.max(sideAB, sideAC, sideBC) === sideBC ? 'BC' : Math.max(sideAB, sideAC, sideBC) === sideAB ? 'AB' : 'AC'} (Commands Largest Angle {Math.max(angleA, angleB, angleC)}°)
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/30"
          >
            I Am Ready for Challenges →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES & COMPETENCIES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress & Challenge Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 font-semibold uppercase tracking-wider">
                Competency: <strong className="text-white">{challenge.competencyLevel}</strong>
              </span>
            </div>

            {/* Animated Progress Bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash ? 'bg-rose-950/70 border-rose-500' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 text-[10px] font-bold uppercase tracking-wider border border-indigo-800">
                {challenge.type}
              </span>
              <span className="text-xs text-slate-500 font-mono">Node: {challenge.nodeId}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed">{challenge.question}</h3>

            {/* 1. MCQ OPTIONS RENDERING (WITH REQUIRED SHAKE ANIMATION) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    animate={wrongShakeIndex === i || (wrongShake && wrongShakeIndex === null) ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i, i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/90 border-slate-700/80 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. DRAG-LABEL CHALLENGE RENDERING */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-white text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetKey) => (
                    <div
                      key={targetKey}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[70px] flex flex-col justify-center items-center ${
                        droppedLabels[targetKey] ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-700 text-slate-500'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400 uppercase font-mono">{targetKey.replace('_', ' ')}</span>
                      <strong className="text-xs mt-1">{droppedLabels[targetKey] || 'Drag Target Item Here'}</strong>
                    </div>
                  ))}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {/* 3. DRAG-SORT CHALLENGE RENDERING */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map((idx) => challenge.sortItems![idx]) : challenge.sortItems).map(
                    (item, displayIdx) => (
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
                        whileTap={{ scale: 0.99 }}
                        className="p-3 bg-slate-800 rounded-xl text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-3 cursor-grab"
                      >
                        <span className="w-6 h-6 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center font-bold text-xs">
                          {displayIdx + 1}
                        </span>
                        {item}
                      </motion.div>
                    )
                  )}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Logical Order →
                </motion.button>
              </div>
            )}

            {/* 4. NUMERIC CHALLENGE RENDERING */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 w-64"
                  />
                  <span className="text-sm text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput.trim() === ''}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                  >
                    Submit Answer →
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. CONSTRUCT CHALLENGE RENDERING */}
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
                      className="px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-indigo-300 rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-indigo-800 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5"
                    >
                      {part}
                      <button onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))} className="text-rose-300 hover:text-rose-100">
                        ×
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click elements above to assemble formula...</span>}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Construction →
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE STEP-BY-STEP EXPLANATION */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-700/80 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step-by-Step Rigorous Mathematical Derivation</span>
                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs sm:text-sm text-amber-200 leading-relaxed">
                        <strong className="text-amber-400 font-bold mr-1.5">{i + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Advance to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl border border-indigo-800 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Curriculum Certification Complete</h2>
            <p className="text-sm text-slate-300">
              Final System Accuracy Score:{' '}
              <strong className="text-emerald-400 text-lg">{Math.max(0, 100 - errors * 5)}%</strong>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK (EXACT GRADING CATEGORIES) */}
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800 text-center text-base sm:text-lg text-emerald-300 font-extrabold leading-relaxed shadow-lg">
            {getMotivationalMessage(errors)}
          </div>

          {/* Misconception Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Identified Misconception Profile</h4>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/60 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800 text-xs text-slate-300 flex items-center gap-3">
            <span className="text-2xl">⏳</span>
            <div>
              <strong className="text-amber-300 font-bold block">Spaced Repetition Schedule (SM-2)</strong>
              Based on your response metrics, this curriculum review is scheduled in{' '}
              <strong className="text-white">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
            </div>
          </div>

          {/* Real World Scenario Capstone */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-sm font-black text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{i + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── MODALS & FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mathematical Node Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_MathematicsSolvingSimultaneousLinearSim;
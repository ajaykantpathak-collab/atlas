'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERALS ───
const NODE_C11_MATH_021 = 'c11_math_021';
const NODE_C11_MATH_022 = 'c11_math_022';
const NODE_C11_MATH_023 = 'c11_math_023';
const NODE_C11_MATH_024 = 'c11_math_024';
const NODE_C11_MATH_025 = 'c11_math_025';
const NODE_C11_MATH_026 = 'c11_math_026';
const NODE_C11_MATH_027 = 'c11_math_027';
const NODE_C11_MATH_028 = 'c11_math_028';
const NODE_C11_MATH_029 = 'c11_math_029';
const NODE_C11_MATH_030 = 'c11_math_030';

const ALL_NODE_IDS = [
  NODE_C11_MATH_021,
  NODE_C11_MATH_022,
  NODE_C11_MATH_023,
  NODE_C11_MATH_024,
  NODE_C11_MATH_025,
  NODE_C11_MATH_026,
  NODE_C11_MATH_027,
  NODE_C11_MATH_028,
  NODE_C11_MATH_029,
  NODE_C11_MATH_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Radar & Signal Synthesis at ISRO Telemetry Centre',
  intro: 'You are an orbital tracking and radar signal engineer at Sriharikota. Deep space radio waves and radar tracking pulses oscillate across quadrants, combine via compound angle superposition, and require rapid trigonometric identity reduction to lock onto spacecraft signals.',
  context: 'From determining the sign of phase shifts in 4 radar sectors to transforming wave products into harmonic sums, mastering the unit circle and angle identities is essential to maintain mission telemetry.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In standard right-triangle trigonometry, all ratios (sin, cos, tan) are positive. When an angle swings into Quadrant II (e.g. 150°), why does cosine become negative while sine remains positive?',
  options: [
    'Cosine is inverted by definition whenever an angle exceeds 90°',
    'On the unit circle, cos θ represents the x-coordinate (which is negative in Q2) while sin θ is the y-coordinate (positive)',
    'Angles above 90° are non-physical imaginary constructs where trigonometric rules reverse',
    'Sine absorbs the negative sign because it is an odd function while cosine is even',
  ],
  correctIndex: 1,
  hintAfter: 'Think of coordinates: point P on the unit circle is (cos θ, sin θ). In the top-left quadrant, x is negative and y is positive!',
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
  bloomLevel?: string;
}

// ─── CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_quadrant_signs',
    nodeId: NODE_C11_MATH_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the ASTC rule (All-Sin-Tan-Cos), which trigonometric functions are positive in Quadrant III (180° < θ < 270°)?',
    options: [
      'Sin and Cosec only',
      'Cos and Sec only',
      'Tan and Cot only',
      'All functions are positive',
    ],
    correctIndex: 2,
    explanation: 'In Quadrant III, both x < 0 and y < 0. Thus cos θ < 0 and sin θ < 0, but their ratio tan θ = y/x > 0 and cot θ = x/y > 0. Only Tan and Cot are positive.',
    hints: [
      'Remember the mnemonic: Add Sugar To Coffee (Q1: All, Q2: Sin, Q3: Tan, Q4: Cos).',
      'In Q3, x is negative and y is negative.',
      'A negative divided by a negative is positive, so tan and cot are positive.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_02_unit_circle_coords',
    nodeId: NODE_C11_MATH_021,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the quadrant labels to their corresponding ASTC sign identities.',
    dragItems: [
      { label: 'All (+) [x>0, y>0]', targetId: 'quad_1' },
      { label: 'Sin & Cosec (+) [x<0, y>0]', targetId: 'quad_2' },
      { label: 'Tan & Cot (+) [x<0, y<0]', targetId: 'quad_3' },
      { label: 'Cos & Sec (+) [x>0, y<0]', targetId: 'quad_4' },
    ],
    correctMapping: {
      quad_1: 'All (+) [x>0, y>0]',
      quad_2: 'Sin & Cosec (+) [x<0, y>0]',
      quad_3: 'Tan & Cot (+) [x<0, y<0]',
      quad_4: 'Cos & Sec (+) [x>0, y<0]',
    },
    explanation: 'Coordinates on the unit circle are (cos θ, sin θ). Q1 is top-right (both positive), Q2 is top-left (y positive), Q3 is bottom-left (both negative, ratio positive), Q4 is bottom-right (x positive).',
    hints: [
      'Quadrant 1 is 0° to 90° where all coordinates are positive.',
      'Quadrant 2 has x negative (cos < 0) and y positive (sin > 0).',
      'Quadrant 4 has x positive (cos > 0) and y negative (sin < 0).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03_sin150_numeric',
    nodeId: NODE_C11_MATH_021,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Calculate the exact decimal value of sin(150°).',
    correctAnswer: 0.5,
    tolerance: 0.01,
    unit: '',
    explanation: '150° is in Q2 where sine is positive. Reference angle = 180° - 150° = 30°. sin(150°) = +sin(30°) = 0.5.',
    hints: [
      'Determine the quadrant of 150° first: it is between 90° and 180° (Q2).',
      'In Q2, sine is positive. The reference angle is 180° - 150° = 30°.',
      'sin(30°) is 1/2 = 0.5.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_04_tan_domain',
    nodeId: NODE_C11_MATH_022,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the domain of the tangent function f(x) = tan x?',
    options: [
      'R (all real numbers)',
      'R - {nπ : n ∈ Z}',
      'R - {(2n + 1)π/2 : n ∈ Z}',
      '[-1, 1]',
    ],
    correctIndex: 2,
    explanation: 'tan x = sin x / cos x. It is undefined wherever cos x = 0, which occurs at odd multiples of π/2, namely (2n + 1)π/2 for integer n.',
    hints: [
      'tan x is a fraction: sin x / cos x. When is the denominator zero?',
      'cos x = 0 at π/2, 3π/2, 5π/2, -π/2, etc.',
      'These are all odd multiples of π/2, represented by (2n + 1)π/2.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_05_sec_range',
    nodeId: NODE_C11_MATH_022,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why can sec x NEVER take a value in the open interval (-1, 1)?',
    options: [
      'Because sec x is only defined for positive angles',
      'Because sec x = 1/cos x and |cos x| ≤ 1, so |sec x| = 1/|cos x| ≥ 1',
      'Because sec x is an asymptote function that only exists at infinity',
      'Because the square root in sec x prevents fractional values',
    ],
    correctIndex: 1,
    explanation: 'Since cosine is bounded by -1 ≤ cos x ≤ 1 (excluding 0), the reciprocal 1/cos x must have absolute value ≥ 1. Therefore sec x ∈ (-∞, -1] ∪ [1, ∞).',
    hints: [
      'sec x is the reciprocal of cos x.',
      'If |cos x| ≤ 1, what happens when you divide 1 by a number between 0 and 1?',
      '1 / 0.5 = 2, 1 / 0.1 = 10. The output is always ≥ 1 in magnitude.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_06_periods',
    nodeId: NODE_C11_MATH_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What are the fundamental periods of sin x, cos x, and tan x respectively?',
    options: [
      '2π, 2π, 2π',
      '2π, 2π, π',
      'π, π, π',
      '2π, π, π',
    ],
    correctIndex: 1,
    explanation: 'sin(x + 2π) = sin x and cos(x + 2π) = cos x give period 2π. For tangent, tan(x + π) = (-sin x)/(-cos x) = tan x, so its fundamental period is π.',
    hints: [
      'A full circle on the unit circle is 2π radians for sine and cosine.',
      'In tangent, adding π flips both x and y signs: (-y)/(-x) = y/x.',
      'The sign cancellation halves the repetition interval for tan to π.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_07_sin2x_construct',
    nodeId: NODE_C11_MATH_029,
    type: 'construct',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Build the identity for sin 2x by selecting the correct algebraic components.',
    availableParts: ['2', 'sin x', 'cos x', 'cos²x', '- sin²x', 'tan x'],
    targetState: '2 sin x cos x',
    validationHint: 'Substitute y = x into sin(x + y) = sin x cos y + cos x sin y.',
    explanation: 'sin 2x = sin(x + x) = sin x cos x + cos x sin x = 2 sin x cos x.',
    hints: [
      'Recall compound angle: sin(A + B) = sin A cos B + cos A sin B.',
      'Let A = x and B = x.',
      'sin(x + x) = sin x cos x + cos x sin x = 2 sin x cos x.',
    ],
  },
  {
    id: 'ch_08_cos15_app',
    nodeId: NODE_C11_MATH_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Using compound angle formula cos(45° - 30°), what is the exact value of cos 15°?',
    options: [
      '(√6 - √2) / 4',
      '(√6 + √2) / 4',
      '(√3 + 1) / 2',
      '(√3 - 1) / 2√2',
    ],
    correctIndex: 1,
    explanation: 'cos(45° - 30°) = cos 45° cos 30° + sin 45° sin 30° = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4.',
    hints: [
      'Formula: cos(A - B) = cos A cos B + sin A sin B (note the plus sign!).',
      'cos 45° = √2/2, cos 30° = √3/2, sin 45° = √2/2, sin 30° = 1/2.',
      'Multiply terms: √6/4 + √2/4 = (√6 + √2)/4.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_09_tan_compound_deriv',
    nodeId: NODE_C11_MATH_026,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In deriving tan(x + y) from (sin x cos y + cos x sin y)/(cos x cos y - sin x sin y), which operation converts the numerator and denominator to tangent form?',
    options: [
      'Multiplying by sin x sin y',
      'Dividing every term by cos x cos y',
      'Applying the Pythagorean identity sin²x + cos²x = 1',
      'Dividing every term by sin x cos y',
    ],
    correctIndex: 1,
    explanation: 'Dividing numerator and denominator by cos x cos y gives (sin x/cos x + sin y/cos y) / (1 - (sin x sin y)/(cos x cos y)) = (tan x + tan y)/(1 - tan x tan y).',
    hints: [
      'We want terms like sin x / cos x which equal tan x.',
      'Notice that the leading term in the denominator becomes 1.',
      'Dividing cos x cos y by cos x cos y gives 1.',
    ],
  },
  {
    id: 'ch_10_cos3x_sort',
    nodeId: NODE_C11_MATH_030,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the steps in the correct logical order to derive cos 3x = 4 cos³x - 3 cos x.',
    sortItems: [
      'Write cos 3x = cos(2x + x) and expand as cos 2x cos x - sin 2x sin x',
      'Substitute double angles: cos 2x = 2 cos²x - 1 and sin 2x = 2 sin x cos x',
      'Expand: (2 cos²x - 1) cos x - 2 sin²x cos x = 2 cos³x - cos x - 2 sin²x cos x',
      'Replace sin²x with (1 - cos²x) and collect like terms to get 4 cos³x - 3 cos x',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'We split 3x = 2x + x, apply compound cosine, replace double angles, convert sin²x to 1 - cos²x, and group cubic and linear terms.',
    hints: [
      'Start by splitting 3x into 2x + x.',
      'Next substitute the known double angle formulas for 2x.',
      'Finally eliminate sin²x using 1 - cos²x to obtain a pure polynomial in cos x.',
    ],
  },
  {
    id: 'ch_11_sum_to_prod_eval',
    nodeId: NODE_C11_MATH_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ISRO radar receives two overlapping carrier waves sin(75°) and sin(15°). Transform sin 75° + sin 15° into product form and find its exact value.',
    options: [
      '2 sin 45° cos 30° = √3 / √2',
      '2 cos 45° sin 30° = 1 / 2√2',
      '2 sin 45° cos 30° = √6 / 2',
      '2 sin 45° cos 30° = √3 / 2',
    ],
    correctIndex: 0,
    explanation: 'sin C + sin D = 2 sin((C+D)/2) cos((C-D)/2). Here (75+15)/2 = 45° and (75-15)/2 = 30°. Value = 2(1/√2)(√3/2) = √3/√2 = √6/2.',
    hints: [
      'Formula: sin C + sin D = 2 sin((C+D)/2) cos((C-D)/2).',
      '(75 + 15)/2 = 45°, (75 - 15)/2 = 30°.',
      '2 × sin 45° × cos 30° = 2 × (1/√2) × (√3/2) = √3/√2.',
    ],
  },
  {
    id: 'ch_12_prod_to_sum_sign',
    nodeId: NODE_C11_MATH_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which of the following is the CORRECT identity for 2 sin A sin B?',
    options: [
      'cos(A + B) - cos(A - B)',
      'cos(A - B) - cos(A + B)',
      'sin(A + B) + sin(A - B)',
      'sin(A + B) - sin(A - B)',
    ],
    correctIndex: 1,
    explanation: 'Subtracting cos(A+B) = cosA cosB - sinA sinB from cos(A-B) = cosA cosB + sinA sinB yields cos(A-B) - cos(A+B) = 2 sin A sin B. The (A-B) term comes first!',
    hints: [
      'cos(A - B) has + sin A sin B, whereas cos(A + B) has - sin A sin B.',
      'Subtracting them: cos(A-B) - cos(A+B) = 2 sin A sin B.',
      'Remember that setting A = B gives 2 sin²A = 1 - cos 2A.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_13_cos2x_calc',
    nodeId: NODE_C11_MATH_029,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If sin x = 3/5, calculate the exact decimal value of cos 2x using the formula cos 2x = 1 - 2 sin²x.',
    correctAnswer: 0.28,
    tolerance: 0.01,
    unit: '',
    explanation: 'cos 2x = 1 - 2 sin²x = 1 - 2(3/5)² = 1 - 2(9/25) = 1 - 18/25 = 7/25 = 0.28.',
    hints: [
      'Square sin x: (3/5)² = 9/25.',
      'Multiply by 2: 2 × 9/25 = 18/25.',
      'Subtract from 1: 1 - 18/25 = 7/25 = 0.28.',
    ],
  },
  {
    id: 'ch_14_tan_construct',
    nodeId: NODE_C11_MATH_026,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Assemble the numerator and denominator for tan(x + y).',
    availableParts: ['(tan x + tan y)', '/', '(1 - tan x tan y)', '(1 + tan x tan y)', '(tan x - tan y)'],
    targetState: '(tan x + tan y) / (1 - tan x tan y)',
    validationHint: 'Numerator has same sign as angle (+), denominator has opposite sign (-).',
    explanation: 'tan(x + y) = (tan x + tan y) / (1 - tan x tan y).',
    hints: [
      'Sign rule: numerator matches angle (+), denominator flips (-).',
      'Select (tan x + tan y), then division /, then (1 - tan x tan y).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_15_triangle_tan_identity',
    nodeId: NODE_C11_MATH_026,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In any acute triangle ABC where A + B + C = π, why does tan A + tan B + tan C = tan A tan B tan C hold?',
    options: [
      'Because tangent is an odd function that cancels around π',
      'Because tan(A + B + C) = tan π = 0, which forces the numerator of the 3-angle tangent expansion (tan A + tan B + tan C - tan A tan B tan C) to equal 0',
      'Because the sum of angles of a triangle equals the product of their cosines',
      'Because all three angles in an acute triangle must be 60°',
    ],
    correctIndex: 1,
    explanation: 'tan(A+B+C) = [∑tan A - ∏tan A] / [1 - ∑tan A tan B]. Since A+B+C = π, tan π = 0. Assuming the denominator is non-zero, the numerator must equal 0, yielding tan A + tan B + tan C = tan A tan B tan C.',
    hints: [
      'What is tan(π)? It equals 0.',
      'A fraction equals 0 only when its numerator is 0 (with non-zero denominator).',
      'Numerator of tan(A+B+C) is tan A + tan B + tan C - tan A tan B tan C.',
    ],
  },
  {
    id: 'ch_16_solve_cos3x_cosx',
    nodeId: NODE_C11_MATH_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How many solutions does the equation cos 3x = cos x have in the closed interval [0, 2π]?',
    options: ['3 solutions', '4 solutions', '5 solutions', '6 solutions'],
    correctIndex: 2,
    explanation: 'cos 3x - cos x = -2 sin 2x sin x = -4 sin²x cos x = 0. Thus sin x = 0 (x = 0, π, 2π) or cos x = 0 (x = π/2, 3π/2). That gives 5 distinct solutions: 0, π/2, π, 3π/2, 2π.',
    hints: [
      'Use difference to product: cos C - cos D = -2 sin((C+D)/2) sin((C-D)/2).',
      'Here: -2 sin(2x) sin(x) = 0, so sin 2x = 0 or sin x = 0.',
      'List roots in [0, 2π]: 0, π/2, π, 3π/2, 2π.',
    ],
  },
  {
    id: 'ch_17_signal_synthesis',
    nodeId: NODE_C11_MATH_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'An ISRO engineer synthesises a high-frequency tracking beam: f(t) = 4 sin(5ωt) cos(2ωt). Express this as a sum of fundamental carrier harmonics.',
    options: [
      '2 sin(7ωt) + 2 sin(3ωt)',
      '2 sin(7ωt) - 2 sin(3ωt)',
      '4 sin(7ωt) + 4 sin(3ωt)',
      '2 cos(7ωt) + 2 cos(3ωt)',
    ],
    correctIndex: 0,
    explanation: 'Using 2 sin A cos B = sin(A+B) + sin(A-B): 4 sin(5ωt) cos(2ωt) = 2 [2 sin(5ωt) cos(2ωt)] = 2 [sin(7ωt) + sin(3ωt)] = 2 sin(7ωt) + 2 sin(3ωt).',
    hints: [
      'Factor out 2 from 4: 2 × [2 sin(5ωt) cos(2ωt)].',
      'Apply 2 sin A cos B = sin(A+B) + sin(A-B).',
      'A + B = 7ωt, A - B = 3ωt.',
    ],
  },
  {
    id: 'ch_18_quotient_proof',
    nodeId: NODE_C11_MATH_027,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does (sin 5x + sin 3x) / (cos 5x + cos 3x) simplify directly to tan 4x?',
    options: [
      'Because sines and cosines cancel term-by-term (5x and 3x)',
      'Sum-to-product turns numerator to 2 sin 4x cos x and denominator to 2 cos 4x cos x; the factor 2 cos x cancels leaving sin 4x / cos 4x = tan 4x',
      'Because tan is distributive over sums',
      'Because 5x + 3x = 8x and dividing by 2 gives 4x',
    ],
    correctIndex: 1,
    explanation: 'sin 5x + sin 3x = 2 sin 4x cos x, and cos 5x + cos 3x = 2 cos 4x cos x. Dividing them, 2 cos x cancels completely, leaving sin 4x / cos 4x = tan 4x.',
    hints: [
      'Apply sin C + sin D to the top and cos C + cos D to the bottom.',
      'Half-sum is (5x+3x)/2 = 4x. Half-difference is (5x-3x)/2 = x.',
      'Notice the common half-difference factor 2 cos x on top and bottom.',
    ],
  },
  {
    id: 'ch_19_tan75_numeric',
    nodeId: NODE_C11_MATH_026,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Evaluate tan 75° = 2 + √3 in exact decimal format to 2 decimal places (use √3 ≈ 1.732).',
    correctAnswer: 3.73,
    tolerance: 0.02,
    unit: '',
    explanation: 'tan 75° = tan(45° + 30°) = (1 + 1/√3)/(1 - 1/√3) = (√3 + 1)/(√3 - 1) = 2 + √3 ≈ 3.732.',
    hints: [
      'Formula: tan(45° + 30°) = (tan 45° + tan 30°) / (1 - tan 45° tan 30°).',
      'Rationalising gives 2 + √3.',
      '2 + 1.732 = 3.732 ≈ 3.73.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_20_rationalise_sort',
    nodeId: NODE_C11_MATH_026,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Sort the steps to rationalise (√3 + 1) / (√3 - 1) to obtain tan 75° = 2 + √3.',
    sortItems: [
      'Multiply numerator and denominator by conjugate (√3 + 1)',
      'Expand numerator: (√3 + 1)² = 3 + 2√3 + 1 = 4 + 2√3',
      'Expand denominator: (√3 - 1)(√3 + 1) = (√3)² - 1² = 3 - 1 = 2',
      'Divide numerator by denominator: (4 + 2√3) / 2 = 2 + √3',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Rationalisation multiplies by the conjugate (√3 + 1), yielding (4 + 2√3)/2 = 2 + √3.',
    hints: [
      'First multiply top and bottom by the conjugate of the denominator.',
      'Expand (√3 + 1)² on top and difference of squares on bottom.',
      'Finally divide through by 2.',
    ],
  },
  {
    id: 'ch_21_sin2_period',
    nodeId: NODE_C11_MATH_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Using the identity sin²x = (1 - cos 2x)/2, what is the fundamental period of f(x) = sin²x?',
    options: ['2π', 'π', 'π/2', '4π'],
    correctIndex: 1,
    explanation: 'Since sin²x = 1/2 - (1/2)cos 2x, its periodicity is governed by cos 2x, whose fundamental period is 2π / 2 = π.',
    hints: [
      'Express sin²x using the double angle formula for cosine: sin²x = (1 - cos 2x)/2.',
      'What is the period of cos(2x)?',
      'Period of cos(kx) is 2π / k. Here k = 2, so period is 2π / 2 = π.',
    ],
  },
  {
    id: 'ch_22_sin3x_construct',
    nodeId: NODE_C11_MATH_030,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'understanding',
    question: 'Construct the cubic polynomial formula for sin 3x in terms of sin x.',
    availableParts: ['3 sin x', '- 4 sin³x', '+ 4 sin³x', '4 cos³x', '- 3 cos x'],
    targetState: '3 sin x - 4 sin³x',
    validationHint: 'sin 3x starts with 3 sin x and subtracts 4 sin³x.',
    explanation: 'sin 3x = 3 sin x - 4 sin³x. (In contrast, cos 3x = 4 cos³x - 3 cos x).',
    hints: [
      'sin 3x is a cubic polynomial in sin x.',
      'The linear coefficient is +3, and the cubic coefficient is -4.',
    ],
    misconceptionIndex: 0,
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
  nodeId: NODE_C11_MATH_021,
  title: 'Signs & Identities of Trigonometric Functions',
  definition: 'Trigonometric functions map any real angle θ on the unit circle to coordinate point (cos θ, sin θ). Their signs across the 4 quadrants follow the ASTC convention. Compound, double, and multiple angle identities convert complex angle sums into harmonic products and single-angle polynomials.',
  eli5: 'Think of the unit circle as a 4-room radar tower. In Room 1 (0° to 90°), all 6 signals are positive. In Room 2, only Sine is positive. In Room 3, only Tangent is positive. In Room 4, only Cosine is positive. When waves collide, compound angle formulas tell you exactly how the new wave oscillates!',
  misconceptions: [
    {
      misconception: 'All trig functions are always positive because sides of a triangle are positive lengths.',
      correction: 'In Class 11, angles live on the unit circle where cos θ is the x-coordinate and sin θ is the y-coordinate. Negative coordinates produce negative trig values in quadrants II, III, and IV.',
    },
    {
      misconception: 'ASTC rule is read clockwise starting from Quadrant 1.',
      correction: 'ASTC is read ANTICLOCKWISE following increasing positive angles: Q1 (All) -> Q2 (Sin) -> Q3 (Tan) -> Q4 (Cos).',
    },
    {
      misconception: 'tan(x + y) equals tan x + tan y (distributive assumption).',
      correction: 'Trig functions are non-linear. The correct formula is tan(x + y) = (tan x + tan y)/(1 - tan x tan y) with a crucial denominator.',
    },
    {
      misconception: 'The range of sec x and cosec x is [-1, 1], identical to sin and cos.',
      correction: 'sec and cosec are reciprocals of cos and sin. Since |cos x| ≤ 1, |sec x| ≥ 1, so the range is (-∞, -1] ∪ [1, ∞).',
    },
    {
      misconception: '2 sin A sin B equals cos(A + B) - cos(A - B).',
      correction: '2 sin A sin B equals cos(A - B) - cos(A + B). The difference term (A - B) comes first with a positive sign.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the sign of cos(210°)?', options: ['Positive (+)', 'Negative (-)', 'Zero', 'Undefined'], correctIndex: 1 },
    { question: 'Which quadrant has sin θ < 0 and cos θ > 0?', options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'], correctIndex: 3 },
    { question: 'What is the fundamental period of tan(x)?', options: ['2π', 'π', 'π/2', '4π'], correctIndex: 1 },
    { question: 'Evaluate sin(2x) when sin x = 3/5 and cos x = 4/5.', options: ['7/25', '24/25', '12/25', '1'], correctIndex: 1 },
    { question: 'Where is sec(x) undefined?', options: ['x = nπ', 'x = (2n + 1)π/2', 'x = 2nπ', 'Never undefined'], correctIndex: 1 },
    { question: 'What is the value of cos(75°)?', options: ['(√6 - √2)/4', '(√6 + √2)/4', '1/2', '√3/2'], correctIndex: 0 },
    { question: 'Simplify 2 cos 45° cos 15°.', options: ['(1 + √3)/2', '(√6 + √2)/2', '√3/2', '1/√2'], correctIndex: 0 },
    { question: 'Expand sin(3x) as a polynomial in sin x.', options: ['3 sin x - 4 sin³x', '4 sin³x - 3 sin x', '3 sin x + 4 sin³x', '3 sin x - sin³x'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student can identify ASTC signs across all 4 quadrants, state domains and ranges, and manipulate compound, double, triple, and product-sum identities with precision.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'ASTC Unit Circle & Quadrant Signs',
    instruction: 'Drag the angle slider θ from 0° to 360°. Observe how the point P(cos θ, sin θ) moves across quadrants and which ASTC badge lights up.',
    interactionType: 'angle-unit-circle',
    nodeId: NODE_C11_MATH_021,
  },
  {
    title: 'Wave Graphs, Asymptotes & Periodicity',
    instruction: 'Toggle between sin, cos, and tan. Move the phase cursor to inspect zeros, peaks, and the vertical asymptotes of tangent at ±90° (±π/2).',
    interactionType: 'graph-explorer',
    nodeId: NODE_C11_MATH_023,
  },
  {
    title: 'Compound Angle Vector Superposition',
    instruction: 'Adjust angles A and B on the dual-pointer dial to see how sin(A + B) splits into sin A cos B + cos A sin B.',
    interactionType: 'compound-mixer',
    nodeId: NODE_C11_MATH_025,
  },
  {
    title: 'Double Angle & Power-Reduction Geometries',
    instruction: 'Move angle x and compare the rapid oscillation of sin(2x) and cos(2x) against single-angle products.',
    interactionType: 'double-angle-lab',
    nodeId: NODE_C11_MATH_029,
  },
  {
    title: 'Product-to-Sum Harmonic Frequency Synthesizer',
    instruction: 'Mix carrier frequency A and modulating frequency B to witness wave multiplication transforming into twin sideband sum/difference frequencies.',
    interactionType: 'harmonic-synthesizer',
    nodeId: NODE_C11_MATH_028,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you rotate angle θ to 225° (in Quadrant III), what will be the signs of (cos θ, sin θ, tan θ)?',
    options: [
      '(+, +, +)',
      '(-, +, -)',
      '(-, -, +)',
      '(+, -, -)',
    ],
    correctIndex: 2,
    verifyInstruction: 'Drag the slider to 225° and check the ASTC quadrant badge and coordinate readout.',
    nodeId: NODE_C11_MATH_021,
  },
  {
    question: 'Predict: What happens to the value of tan θ as angle θ approaches 90° from the left (89.9°)?',
    options: [
      'It levels off smoothly at 1.0',
      'It plunges toward negative infinity',
      'It explodes toward positive infinity because cos θ → 0⁺ in the denominator',
      'It oscillates between -1 and +1',
    ],
    correctIndex: 2,
    verifyInstruction: 'Drag the angle slider to 89° and observe the tangent gauge soaring.',
    nodeId: NODE_C11_MATH_022,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the symmetry of cos θ versus sin θ on the unit circle as you reflect across the y-axis (e.g. 30° vs 150°)?',
    observableOptions: [
      'Both sine and cosine remain identical in sign and value',
      'Sine values remain identical (positive y), while cosine values flip sign (+x becomes -x)',
      'Cosine remains identical while sine flips sign',
      'Both values flip their signs simultaneously',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_MATH_021,
  },
  {
    question: 'Look at the graph of tan x compared to sin x. How many complete branches of tan x fit in the interval 0 to 2π?',
    observableOptions: [
      '1 branch (period 2π)',
      '2 full branches (period π)',
      '4 branches (period π/2)',
      'Infinite branches with no periodic interval',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_MATH_024,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Telemetry Radar Waveform Designer',
  description: 'Design a dual-frequency Doppler radar pulse to track Chandrayaan orbital velocity. Formulate a 2 sin(A) cos(B) radar waveform, convert it to harmonic sum components sin(A+B) + sin(A-B), and verify quadrant phase stability.',
  steps: [
    'Select a carrier frequency A = 60° and Doppler offset B = 15°.',
    'Use product-to-sum identity to calculate the sum frequency (75°) and difference frequency (45°).',
    'Evaluate exact values: sin 75° = (√6 + √2)/4 and sin 45° = √2/2.',
    'Confirm that the synthesized amplitude equals 2 × sin(60°) × cos(15°) in telemetry units.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C11_MathematicsSignsTrigonometricFunctionsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_MATH_021,
  title = DEFAULT_PROPS.title || 'Signs & Identities of Trigonometric Functions',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Interactive State
  const [angleDeg, setAngleDeg] = useState<number>(45);
  const [angleRad, setAngleRad] = useState<number>(Math.PI / 4);
  const [angleA, setAngleA] = useState<number>(45);
  const [angleB, setAngleB] = useState<number>(30);
  const [doubleAngleX, setDoubleAngleX] = useState<number>(30);
  const [activeFunc, setActiveFunc] = useState<'sin' | 'cos' | 'tan' | 'sec' | 'cosec' | 'cot'>('sin');
  const [carrierFreq, setCarrierFreq] = useState<number>(5);
  const [modFreq, setModFreq] = useState<number>(2);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showUnitCircleDetails, setShowUnitCircleDetails] = useState<boolean>(true);
  const [showProjections, setShowProjections] = useState<boolean>(true);
  const [selectedQuadrant, setSelectedQuadrant] = useState<number | null>(1);
  const [animatingWave, setAnimatingWave] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // Escalating hints and reveal states
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Drag-and-drop & Construction States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery & Observation States
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);
  const [predictionMade, setPredictionMade] = useState<boolean>(false);
  const [predictionIndex, setPredictionIndex] = useState<number>(-1);
  const [observationAnswered, setObservationAnswered] = useState<boolean>(false);
  const [observationIndex, setObservationIndex] = useState<number>(-1);

  // Feedback States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongOptionIndex, setWrongOptionIndex] = useState<number | null>(null);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const harmonicCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Derived values from angleDeg
  const cosVal = useMemo(() => Math.cos((angleDeg * Math.PI) / 180), [angleDeg]);
  const sinVal = useMemo(() => Math.sin((angleDeg * Math.PI) / 180), [angleDeg]);
  const tanVal = useMemo(() => {
    const rad = (angleDeg * Math.PI) / 180;
    const c = Math.cos(rad);
    if (Math.abs(c) < 1e-6) return null;
    return Math.tan(rad);
  }, [angleDeg]);

  const currentQuadrant = useMemo(() => {
    const norm = ((angleDeg % 360) + 360) % 360;
    if (norm >= 0 && norm < 90) return 1;
    if (norm >= 90 && norm < 180) return 2;
    if (norm >= 180 && norm < 270) return 3;
    return 4;
  }, [angleDeg]);

  // Adaptive Challenges Filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Motivational message based on errors
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE! Flawless mathematical mastery!';
    if (errors <= 3) return 'Great work! Excellent trigonometric understanding!';
    if (errors <= 7) return 'Good effort! Review the missed concepts to master all identities!';
    return 'Do not give up — You WILL get this! Practice makes perfect.';
  }, [errors]);

  // ─── INITIAL MASTERY LOAD EFFECT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY EFFECT ───
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
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── ANGLE UPDATE EFFECT ───
  useEffect(() => {
    setAngleRad((angleDeg * Math.PI) / 180);
  }, [angleDeg]);

  // ─── CANVAS GRAPH ANIMATION EFFECT ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.stroke();

      ctx.strokeStyle = activeFunc === 'sin' ? '#38bdf8' : activeFunc === 'cos' ? '#a855f7' : '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const scaleX = (w / (4 * Math.PI)) * zoomLevel;
      const scaleY = 40 * zoomLevel;

      for (let px = 0; px < w; px++) {
        const x = (px - w / 4) / scaleX;
        let yVal = 0;
        if (activeFunc === 'sin') yVal = Math.sin(x);
        else if (activeFunc === 'cos') yVal = Math.cos(x);
        else if (activeFunc === 'tan') {
          const c = Math.cos(x);
          yVal = Math.abs(c) > 0.08 ? Math.tan(x) : NaN;
        } else if (activeFunc === 'sec') {
          const c = Math.cos(x);
          yVal = Math.abs(c) > 0.08 ? 1 / c : NaN;
        } else if (activeFunc === 'cosec') {
          const s = Math.sin(x);
          yVal = Math.abs(s) > 0.08 ? 1 / s : NaN;
        } else if (activeFunc === 'cot') {
          const s = Math.sin(x);
          yVal = Math.abs(s) > 0.08 ? Math.cos(x) / s : NaN;
        }

        const py = midY - yVal * scaleY;
        if (isNaN(yVal) || Math.abs(yVal) > 6) {
          ctx.stroke();
          ctx.beginPath();
        } else {
          if (px === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      }
      ctx.stroke();

      const currentPx = w / 4 + angleRad * scaleX;
      let currentYVal = 0;
      if (activeFunc === 'sin') currentYVal = Math.sin(angleRad);
      else if (activeFunc === 'cos') currentYVal = Math.cos(angleRad);
      else if (activeFunc === 'tan') currentYVal = Math.tan(angleRad);
      else if (activeFunc === 'sec') currentYVal = 1 / Math.cos(angleRad);
      else if (activeFunc === 'cosec') currentYVal = 1 / Math.sin(angleRad);
      else if (activeFunc === 'cot') currentYVal = Math.cos(angleRad) / Math.sin(angleRad);

      const currentPy = midY - currentYVal * scaleY;
      if (!isNaN(currentYVal) && Math.abs(currentYVal) <= 6 && currentPx >= 0 && currentPx <= w) {
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(currentPx, currentPy, 5 + Math.sin(frame * 0.1) * 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
      }

      if (animatingWave) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeFunc, angleRad, zoomLevel, animatingWave]);

  // ─── HARMONIC SYNTHESIZER CANVAS EFFECT ───
  useEffect(() => {
    const canvas = harmonicCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let hFrame = 0;
    let hAnimId: number;

    const renderHarmonic = () => {
      hFrame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.stroke();

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let px = 0; px < w; px++) {
        const t = (px / w) * 4 * Math.PI + hFrame * 0.02;
        const y = 2 * Math.sin(carrierFreq * t) * Math.cos(modFreq * t);
        const py = midY - y * 18;
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let px = 0; px < w; px++) {
        const t = (px / w) * 4 * Math.PI + hFrame * 0.02;
        const ySum = Math.sin((carrierFreq + modFreq) * t) + Math.sin((carrierFreq - modFreq) * t);
        const py = midY - ySum * 18;
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      hAnimId = requestAnimationFrame(renderHarmonic);
    };

    renderHarmonic();
    return () => cancelAnimationFrame(hAnimId);
  }, [carrierFreq, modFreq]);

  // ─── HANDLERS ───

  const handleAngleChange = useCallback((newDeg: number) => {
    setAngleDeg(newDeg);
    audioManager.play('count');
  }, []);

  const handleAngleAChange = useCallback((newA: number) => {
    setAngleA(newA);
    audioManager.play('count');
  }, []);

  const handleAngleBChange = useCallback((newB: number) => {
    setAngleB(newB);
    audioManager.play('count');
  }, []);

  const handleDoubleAngleChange = useCallback((newX: number) => {
    setDoubleAngleX(newX);
    audioManager.play('count');
  }, []);

  const handleFuncSelect = useCallback((fn: 'sin' | 'cos' | 'tan' | 'sec' | 'cosec' | 'cot') => {
    setActiveFunc(fn);
    audioManager.play('tap');
    speechManager.speak(`Viewing ${fn} function`);
  }, []);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (!isCorrect) {
      setWrongOptionIndex(selectedIndex);
    }
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect ? 'Outstanding radar deduction!' : 'Great intuition! Let us master the quadrant coordinate geometry.'
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Step 1: Explore the ASTC unit circle.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter the free trigonometric sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commence ISRO trigonometric flight challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Now verify on the unit circle dial!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp mathematical observation!' : 'Look closely at the coordinate reflections.');
  }, []);

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
      speechManager.speak('Review the step-by-step mathematical proof.');
    }
  }, [hintCount, challenge]);

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
      const arr = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
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
    speechManager.speak('Telemetry mission complete! Trigonometric mastery achieved.');
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
    setWrongOptionIndex(null);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
        if (!isCorrect && typeof answer === 'number') {
          setWrongOptionIndex(answer);
        }
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        const order = Array.isArray(answer) && answer.length > 0 ? answer : [0, 1, 2, 3];
        isCorrect = JSON.stringify(order) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setWrongOptionIndex(null);
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Identity correctly verified!');
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
          speechManager.speak('Let us study the complete identity proof.');
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
    [challenge, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]
  );

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
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <motion.span
            whileHover={{ scale: 1.15, rotate: 10 }}
            className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700 inline-block cursor-default"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300">
              {title}
            </h1>
            <p className="text-xs text-slate-400">Class 11 ISC Mathematics • Trigonometry & Angular Analysis</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 bg-slate-900 rounded-full text-xs text-slate-300 border border-slate-800"
          >
            Phase: <strong className="capitalize text-sky-400">{phase}</strong>
          </motion.span>
        </motion.div>
      </motion.div>

      {/* ─── TAB / PHASE TRANSITION CONTAINER ─── */}
      <AnimatePresence mode="wait">
        {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/80 shadow-lg"
            >
              <div className="flex items-center gap-2 text-indigo-300 font-bold mb-2">
                <span className="text-lg">🛰️</span>
                <h2 className="text-lg">{SCENARIO.title}</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
              <p className="text-xs text-slate-400 italic bg-slate-950/50 p-3 rounded-xl border border-slate-800">{SCENARIO.context}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Initial Radar Discovery Hook</span>
                <span className="text-xs text-slate-500">Ungraded Intuition Check</span>
              </div>
              <p className="text-base sm:text-lg font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</p>
              <div className="grid grid-cols-1 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => {
                  const isWrong = discoveryAnswered && wrongOptionIndex === i;
                  return (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={isWrong ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={isWrong ? { duration: 0.4 } : { duration: 0.15 }}
                      onClick={() => handleDiscoveryAnswer(i)}
                      disabled={discoveryAnswered}
                      className={`w-full text-left p-4 rounded-xl text-sm transition-all border flex items-center justify-between ${
                        discoveryAnswered
                          ? i === DISCOVERY_QUESTION.correctIndex
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                            : isWrong
                            ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 opacity-60'
                          : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-indigo-500'
                      }`}
                    >
                      <div>
                        <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </div>
                      {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                        <span className="text-emerald-400 font-bold ml-2">✓</span>
                      )}
                      {discoveryAnswered && isWrong && (
                        <span className="text-rose-400 font-bold ml-2">✗</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {discoveryAnswered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className={`text-sm flex items-center gap-1.5 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    <span>{discoveryCorrect ? '✓' : '💡'}</span>
                    {discoveryCorrect ? 'Spot on! Point (cos θ, sin θ) maps cosine directly to the x-axis!' : `${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    aria-label="Enter Interactive Exploration Lab"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-sky-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                  >
                    Enter Interactive Exploration Lab →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Step Indicator Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs"
            >
              <span className="font-bold text-sky-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}</span>
              <span className="text-slate-400">Node Ref: <code className="text-indigo-300">{EXPLORATION_STEPS[currentSlide].nodeId}</code></span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800"
              >
                <h3 className="text-lg font-bold text-indigo-300 mb-1">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-300 text-sm mb-4">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>

                {/* ─── SLIDE 0: ASTC UNIT CIRCLE LAB ─── */}
                {currentSlide === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                  >
                    {/* Left: Interactive SVG Unit Circle (SVG #1) */}
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                      <svg viewBox="-140 -140 280 280" className="w-full max-w-[320px] aspect-square" role="img" aria-label="ASTC Unit Circle Diagram showing 4 quadrants and trigonometric coordinates">
                        <title>ASTC Unit Circle</title>
                        {/* Quadrant Tint Backgrounds */}
                        <rect x="0" y="-120" width="120" height="120" fill={currentQuadrant === 1 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(30, 41, 59, 0.2)'} />
                        <rect x="-120" y="-120" width="120" height="120" fill={currentQuadrant === 2 ? 'rgba(56, 189, 248, 0.15)' : 'rgba(30, 41, 59, 0.2)'} />
                        <rect x="-120" y="0" width="120" height="120" fill={currentQuadrant === 3 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(30, 41, 59, 0.2)'} />
                        <rect x="0" y="0" width="120" height="120" fill={currentQuadrant === 4 ? 'rgba(236, 72, 153, 0.15)' : 'rgba(30, 41, 59, 0.2)'} />

                        {/* Quadrant ASTC Labels */}
                        <text x="55" y="-55" fill="#22c55e" fontSize="11" fontWeight="bold" textAnchor="middle">Q1: ALL (+)</text>
                        <text x="-55" y="-55" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Q2: SIN (+)</text>
                        <text x="-55" y="65" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Q3: TAN (+)</text>
                        <text x="55" y="65" fill="#ec4899" fontSize="11" fontWeight="bold" textAnchor="middle">Q4: COS (+)</text>

                        {/* Axes */}
                        <line x1="-125" y1="0" x2="125" y2="0" stroke="#64748b" strokeWidth="1.5" />
                        <line x1="0" y1="-125" x2="0" y2="125" stroke="#64748b" strokeWidth="1.5" />
                        <text x="128" y="4" fill="#94a3b8" fontSize="9">+x</text>
                        <text x="-135" y="4" fill="#94a3b8" fontSize="9">-x</text>
                        <text x="4" y="-126" fill="#94a3b8" fontSize="9">+y</text>
                        <text x="4" y="132" fill="#94a3b8" fontSize="9">-y</text>

                        {/* Unit Circle (radius = 95) */}
                        <circle cx="0" cy="0" r="95" fill="none" stroke="#475569" strokeWidth="2" />

                        {/* Projections */}
                        {showProjections && (
                          <>
                            <line x1="0" y1="0" x2={95 * cosVal} y2="0" stroke="#a855f7" strokeWidth="3" />
                            <line x1={95 * cosVal} y1="0" x2={95 * cosVal} y2={-95 * sinVal} stroke="#38bdf8" strokeWidth="3" strokeDasharray="3 3" />
                          </>
                        )}

                        {/* Radius Vector */}
                        <line x1="0" y1="0" x2={95 * cosVal} y2={-95 * sinVal} stroke="#f8fafc" strokeWidth="2.5" />

                        {/* Arc for Angle */}
                        <path
                          d={`M 25 0 A 25 25 0 ${angleDeg > 180 ? 1 : 0} 0 ${25 * Math.cos(-angleRad)} ${25 * Math.sin(-angleRad)}`}
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="2"
                        />

                        {/* Point P */}
                        <circle cx={95 * cosVal} cy={-95 * sinVal} r="6" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                        <text x={95 * cosVal + (cosVal >= 0 ? 8 : -36)} y={-95 * sinVal + (sinVal >= 0 ? -8 : 14)} fill="#ffffff" fontSize="10" fontWeight="bold">
                          P(cos, sin)
                        </text>
                      </svg>

                      <div className="w-full mt-3">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Angle θ: <strong className="text-amber-400">{angleDeg}°</strong> ({(angleRad).toFixed(2)} rad)</span>
                          <span className="text-emerald-400 font-bold">Quadrant {currentQuadrant}</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={360}
                          value={angleDeg}
                          aria-label="Angle theta slider from 0 to 360 degrees"
                          onChange={(e) => handleAngleChange(Number(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Right: Real-time Values & ASTC Breakdown */}
                    <div className="lg:col-span-5 space-y-3">
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Unit Circle Coordinates</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-2 bg-slate-900 rounded-lg border border-purple-500/30"
                          >
                            <p className="text-xs text-purple-400">x = cos(θ)</p>
                            <p className="font-mono font-bold text-lg">{cosVal.toFixed(3)}</p>
                            <span className={`text-xs px-2 py-0.5 rounded font-semibold flex items-center gap-1 w-fit ${cosVal >= 0 ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                              <span>{cosVal >= 0 ? '✓' : '✗'}</span>
                              {cosVal >= 0 ? 'Positive (+)' : 'Negative (-)'}
                            </span>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-2 bg-slate-900 rounded-lg border border-sky-500/30"
                          >
                            <p className="text-xs text-sky-400">y = sin(θ)</p>
                            <p className="font-mono font-bold text-lg">{sinVal.toFixed(3)}</p>
                            <span className={`text-xs px-2 py-0.5 rounded font-semibold flex items-center gap-1 w-fit ${sinVal >= 0 ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                              <span>{sinVal >= 0 ? '✓' : '✗'}</span>
                              {sinVal >= 0 ? 'Positive (+)' : 'Negative (-)'}
                            </span>
                          </motion.div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className="mt-2 p-2 bg-slate-900 rounded-lg border border-amber-500/30 text-sm"
                        >
                          <p className="text-xs text-amber-400">tan(θ) = y / x</p>
                          <p className="font-mono font-bold text-lg">{tanVal !== null ? tanVal.toFixed(3) : 'Undefined (Asymptote)'}</p>
                          {tanVal !== null && (
                            <span className={`text-xs px-2 py-0.5 rounded font-semibold flex items-center gap-1 w-fit ${tanVal >= 0 ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'}`}>
                              <span>{tanVal >= 0 ? '✓' : '✗'}</span>
                              {tanVal >= 0 ? 'Positive (+)' : 'Negative (-)'}
                            </span>
                          )}
                        </motion.div>
                      </div>

                      {/* Predict-then-Check Hook */}
                      {!predictionMade ? (
                        <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/60">
                          <p className="text-xs font-bold text-indigo-300 mb-2">⚡ Quick Predict: {PREDICTION_QUESTIONS[0].question}</p>
                          <div className="space-y-1">
                            {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                              <motion.button
                                key={i}
                                aria-label={`Prediction Option ${i + 1}: ${opt}`}
                                whileHover={{ scale: 1.02, x: 2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handlePrediction(i)}
                                className="w-full text-left text-xs p-2 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700 text-slate-200"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40 text-xs"
                        >
                          <p className="text-emerald-400 font-bold mb-1 flex items-center gap-1">
                            <span>{predictionIndex === PREDICTION_QUESTIONS[0].correctIndex ? '✓' : '💡'}</span>
                            {predictionIndex === PREDICTION_QUESTIONS[0].correctIndex ? 'Prediction verified!' : 'Look at the signs!'}
                          </p>
                          <p className="text-slate-300">{PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ─── SLIDE 1: GRAPH & ASYMPTOTE EXPLORER ─── */}
                {currentSlide === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                        {(['sin', 'cos', 'tan', 'sec', 'cosec', 'cot'] as const).map((fn) => (
                          <motion.button
                            key={fn}
                            aria-label={`Select function ${fn}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleFuncSelect(fn)}
                            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                              activeFunc === fn ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {fn}
                          </motion.button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-slate-400" htmlFor="zoom-slider">Zoom:</label>
                        <input
                          id="zoom-slider"
                          type="range"
                          min={0.6}
                          max={2}
                          step={0.1}
                          aria-label="Graph zoom slider"
                          value={zoomLevel}
                          onChange={(e) => setZoomLevel(Number(e.target.value))}
                          className="w-24 accent-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                      <canvas ref={canvasRef} width={800} height={220} className="w-full rounded-xl bg-slate-950" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-slate-500 uppercase font-bold block mb-1">Domain & Excluded Points</span>
                        <p className="text-slate-200">
                          {activeFunc === 'sin' || activeFunc === 'cos'
                            ? 'Domain: R (all real numbers)'
                            : activeFunc === 'tan' || activeFunc === 'sec'
                            ? 'Domain: R - {(2n + 1)π/2 : n ∈ Z} (Vertical Asymptotes at odd π/2)'
                            : 'Domain: R - {nπ : n ∈ Z} (Vertical Asymptotes at integer multiples of π)'}
                        </p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-slate-500 uppercase font-bold block mb-1">Range of Output</span>
                        <p className="text-slate-200">
                          {activeFunc === 'sin' || activeFunc === 'cos'
                            ? 'Range: [-1, 1]'
                            : activeFunc === 'tan' || activeFunc === 'cot'
                            ? 'Range: R (-∞, +∞)'
                            : 'Range: (-∞, -1] ∪ [1, +∞)'}
                        </p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-slate-500 uppercase font-bold block mb-1">Fundamental Period</span>
                        <p className="text-slate-200">
                          {activeFunc === 'tan' || activeFunc === 'cot'
                            ? 'Period: π radians (180°)'
                            : 'Period: 2π radians (360°)'}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* ─── SLIDE 2: COMPOUND ANGLE SUPERPOSITION (with SVG #2) ─── */}
                {currentSlide === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Angle A: <strong className="text-indigo-400">{angleA}°</strong></span>
                          <span>Angle B: <strong className="text-pink-400">{angleB}°</strong></span>
                          <span>(A+B): <strong className="text-emerald-400">{angleA + angleB}°</strong></span>
                        </div>
                        <div className="space-y-2 mb-3">
                          <div>
                            <label className="text-[10px] text-slate-500 uppercase" htmlFor="angleA-slider">Set Angle A (0° to 90°)</label>
                            <input
                              id="angleA-slider"
                              type="range"
                              min={0}
                              max={90}
                              aria-label="Angle A slider"
                              value={angleA}
                              onChange={(e) => handleAngleAChange(Number(e.target.value))}
                              className="w-full accent-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-500 uppercase" htmlFor="angleB-slider">Set Angle B (0° to 90°)</label>
                            <input
                              id="angleB-slider"
                              type="range"
                              min={0}
                              max={90}
                              aria-label="Angle B slider"
                              value={angleB}
                              onChange={(e) => handleAngleBChange(Number(e.target.value))}
                              className="w-full accent-pink-500"
                            />
                          </div>
                        </div>

                        {/* SVG #2: Compound Angle Geometric Vector Superposition */}
                        <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800 flex justify-center">
                          <svg viewBox="-10 -110 130 120" className="w-full max-w-[200px] aspect-[13/12]" role="img" aria-label="Compound Angle Vector Superposition Diagram">
                            <title>Compound Angle Superposition</title>
                            {/* Base line */}
                            <line x1="0" y1="0" x2="110" y2="0" stroke="#64748b" strokeWidth="1.5" />
                            {/* Vector A */}
                            <line
                              x1="0"
                              y1="0"
                              x2={90 * Math.cos((angleA * Math.PI) / 180)}
                              y2={-90 * Math.sin((angleA * Math.PI) / 180)}
                              stroke="#818cf8"
                              strokeWidth="2.5"
                            />
                            {/* Vector A+B */}
                            <line
                              x1="0"
                              y1="0"
                              x2={90 * Math.cos(((angleA + angleB) * Math.PI) / 180)}
                              y2={-90 * Math.sin(((angleA + angleB) * Math.PI) / 180)}
                              stroke="#34d399"
                              strokeWidth="2.5"
                            />
                            {/* Arc A */}
                            <path
                              d={`M 30 0 A 30 30 0 0 0 ${30 * Math.cos((angleA * Math.PI) / 180)} ${-30 * Math.sin((angleA * Math.PI) / 180)}`}
                              fill="none"
                              stroke="#818cf8"
                              strokeWidth="1.5"
                            />
                            {/* Arc B */}
                            <path
                              d={`M ${40 * Math.cos((angleA * Math.PI) / 180)} ${-40 * Math.sin((angleA * Math.PI) / 180)} A 40 40 0 0 0 ${40 * Math.cos(((angleA + angleB) * Math.PI) / 180)} ${-40 * Math.sin(((angleA + angleB) * Math.PI) / 180)}`}
                              fill="none"
                              stroke="#f472b6"
                              strokeWidth="1.5"
                            />
                            <text x="35" y="-6" fill="#818cf8" fontSize="8" fontWeight="bold">A</text>
                            <text
                              x={46 * Math.cos(((angleA + angleB / 2) * Math.PI) / 180)}
                              y={-46 * Math.sin(((angleA + angleB / 2) * Math.PI) / 180)}
                              fill="#f472b6"
                              fontSize="8"
                              fontWeight="bold"
                            >
                              B
                            </text>
                          </svg>
                        </div>

                        <div className="mt-3 p-3 bg-slate-900 rounded-lg border border-slate-700 font-mono text-xs space-y-1">
                          <p className="text-indigo-300 font-bold">sin(A + B) Expansion:</p>
                          <p className="text-slate-300">
                            = sin({angleA}°) cos({angleB}°) + cos({angleA}°) sin({angleB}°)
                          </p>
                          <p className="text-emerald-400 font-bold">
                            = {(Math.sin((angleA * Math.PI) / 180) * Math.cos((angleB * Math.PI) / 180)).toFixed(4)} +{' '}
                            {(Math.cos((angleA * Math.PI) / 180) * Math.sin((angleB * Math.PI) / 180)).toFixed(4)} ={' '}
                            {Math.sin(((angleA + angleB) * Math.PI) / 180).toFixed(4)}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Key Compound Identities</h4>
                          <ul className="text-xs text-slate-300 space-y-2 font-mono">
                            <motion.li whileHover={{ scale: 1.01 }} className="p-2 bg-slate-900 rounded border border-slate-800">
                              <span className="text-sky-400 font-bold">sin(x ± y)</span> = sin x cos y ± cos x sin y
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.01 }} className="p-2 bg-slate-900 rounded border border-slate-800">
                              <span className="text-purple-400 font-bold">cos(x ± y)</span> = cos x cos y ∓ sin x sin y
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.01 }} className="p-2 bg-slate-900 rounded border border-slate-800">
                              <span className="text-amber-400 font-bold">tan(x ± y)</span> = (tan x ± tan y) / (1 ∓ tan x tan y)
                            </motion.li>
                          </ul>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-3 italic">
                          Notice that cosine formulas invert the internal operator (+ in argument yields - in expansion).
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ─── SLIDE 3: DOUBLE & TRIPLE ANGLE LAB (with SVG #3) ─── */}
                {currentSlide === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Single Angle x: <strong className="text-sky-400">{doubleAngleX}°</strong></span>
                          <span>Double Angle 2x: <strong className="text-emerald-400">{2 * doubleAngleX}°</strong></span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={180}
                          aria-label="Single angle x slider"
                          value={doubleAngleX}
                          onChange={(e) => handleDoubleAngleChange(Number(e.target.value))}
                          className="w-full accent-emerald-500 mb-3"
                        />

                        {/* SVG #3: Double Angle Harmonic Frequency Comparison */}
                        <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800 mb-3">
                          <svg viewBox="0 0 240 70" className="w-full h-16" role="img" aria-label="Double Angle Wave Frequency Comparison Diagram">
                            <title>Double Angle Harmonic Doubling</title>
                            <line x1="0" y1="35" x2="240" y2="35" stroke="#475569" strokeWidth="1" />
                            {/* sin(x) wave in Sky Blue */}
                            <path
                              d={Array.from({ length: 240 }, (_, i) => {
                                const rad = (i / 240) * 2 * Math.PI;
                                const y = 35 - Math.sin(rad) * 25;
                                return `${i === 0 ? 'M' : 'L'} ${i} ${y}`;
                              }).join(' ')}
                              fill="none"
                              stroke="#38bdf8"
                              strokeWidth="2"
                            />
                            {/* sin(2x) wave in Emerald Green */}
                            <path
                              d={Array.from({ length: 240 }, (_, i) => {
                                const rad = (i / 240) * 4 * Math.PI;
                                const y = 35 - Math.sin(rad) * 25;
                                return `${i === 0 ? 'M' : 'L'} ${i} ${y}`;
                              }).join(' ')}
                              fill="none"
                              stroke="#34d399"
                              strokeWidth="1.5"
                              strokeDasharray="3 2"
                            />
                            <text x="10" y="14" fill="#38bdf8" fontSize="8" fontWeight="bold">sin(x) [f]</text>
                            <text x="80" y="14" fill="#34d399" fontSize="8" fontWeight="bold">sin(2x) [2f]</text>
                          </svg>
                        </div>

                        <div className="space-y-2 text-xs font-mono">
                          <motion.div whileHover={{ scale: 1.01 }} className="p-2 bg-slate-900 rounded border border-slate-800">
                            <p className="text-sky-300 font-bold">sin(2x) = 2 sin x cos x</p>
                            <p className="text-slate-400">
                              2 × ({Math.sin((doubleAngleX * Math.PI) / 180).toFixed(3)}) × ({Math.cos((doubleAngleX * Math.PI) / 180).toFixed(3)}) ={' '}
                              <strong className="text-white">{Math.sin((2 * doubleAngleX * Math.PI) / 180).toFixed(4)}</strong>
                            </p>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.01 }} className="p-2 bg-slate-900 rounded border border-slate-800">
                            <p className="text-purple-300 font-bold">cos(2x) = cos²x - sin²x = 1 - 2 sin²x = 2 cos²x - 1</p>
                            <p className="text-slate-400">
                              cos({2 * doubleAngleX}°) = <strong className="text-white">{Math.cos((2 * doubleAngleX * Math.PI) / 180).toFixed(4)}</strong>
                            </p>
                          </motion.div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                        <h4 className="text-amber-400 font-bold uppercase tracking-wider">Triple Angle Polynomials</h4>
                        <motion.div whileHover={{ scale: 1.01 }} className="p-2 bg-slate-900 rounded border border-slate-800">
                          <p className="text-indigo-300 font-bold">sin(3x) = 3 sin x - 4 sin³x</p>
                          <p className="text-slate-400 text-[11px] mt-1">Converts triple angle into a pure cubic in sin x.</p>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.01 }} className="p-2 bg-slate-900 rounded border border-slate-800">
                          <p className="text-pink-300 font-bold">cos(3x) = 4 cos³x - 3 cos x</p>
                          <p className="text-slate-400 text-[11px] mt-1">Converts triple angle into a pure cubic in cos x.</p>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.01 }} className="p-2 bg-slate-900 rounded border border-slate-800">
                          <p className="text-amber-300 font-bold">tan(3x) = (3 tan x - tan³x) / (1 - 3 tan²x)</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ─── SLIDE 4: HARMONIC SYNTHESIZER ─── */}
                {currentSlide === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                          <span>Carrier Frequency A: <strong className="text-sky-400">{carrierFreq} Hz</strong></span>
                          <span>Modulating Frequency B: <strong className="text-pink-400">{modFreq} Hz</strong></span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label className="text-[10px] text-slate-500 uppercase" htmlFor="carrier-slider">Carrier A (1 to 10)</label>
                            <input
                              id="carrier-slider"
                              type="range"
                              min={1}
                              max={10}
                              aria-label="Carrier Frequency A slider"
                              value={carrierFreq}
                              onChange={(e) => setCarrierFreq(Number(e.target.value))}
                              className="w-full accent-sky-500"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-500 uppercase" htmlFor="mod-slider">Modulating B (1 to 5)</label>
                            <input
                              id="mod-slider"
                              type="range"
                              min={1}
                              max={5}
                              aria-label="Modulating Frequency B slider"
                              value={modFreq}
                              onChange={(e) => setModFreq(Number(e.target.value))}
                              className="w-full accent-pink-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                        <h4 className="text-amber-400 font-bold uppercase tracking-wider mb-2">Product-to-Sum Conversion</h4>
                        <p className="text-sky-300 font-bold">2 sin(A) cos(B) = sin(A + B) + sin(A - B)</p>
                        <p className="text-slate-300 mt-2">
                          Harmonics generated: <strong className="text-emerald-400">sin({carrierFreq + modFreq}t)</strong> +{' '}
                          <strong className="text-pink-400">sin({carrierFreq - modFreq}t)</strong>
                        </p>
                        <p className="text-[11px] text-slate-500 mt-2">
                          Solid blue line shows carrier product; dashed pink line shows twin sideband harmonic sum.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                      <canvas ref={harmonicCanvasRef} width={800} height={160} className="w-full rounded-xl bg-slate-950" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center pt-2">
              <motion.button
                aria-label="Previous Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold disabled:opacity-40"
              >
                ← Previous Lab
              </motion.button>
              <span className="text-xs text-slate-500 font-mono">
                Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
              </span>
              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  aria-label="Next Lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((s) => s + 1)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  aria-label="Proceed to Free Sandbox"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
                >
                  Proceed to Free Sandbox →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950/60 rounded-2xl border border-indigo-800/60 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-bold text-white">Free Trigonometric Testing Sandbox</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Explore any angle, test identities, examine signs, and inspect wave graphs with zero grading pressure.
                </p>
              </div>
              <motion.button
                aria-label="Ready for Challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/30 whitespace-nowrap"
              >
                I am Ready for Challenges! 🚀
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-6 bg-slate-900 p-5 rounded-2xl border border-slate-800"
              >
                <h4 className="text-xs font-bold text-sky-400 uppercase mb-3">Unit Circle Angle Manipulator</h4>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Angle θ: <strong className="text-amber-400 text-base">{angleDeg}°</strong></span>
                  <span className="text-emerald-400 font-bold">Quadrant {currentQuadrant}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  aria-label="Sandbox Angle slider"
                  value={angleDeg}
                  onChange={(e) => handleAngleChange(Number(e.target.value))}
                  className="w-full accent-indigo-500 mb-4"
                />
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <motion.div whileHover={{ scale: 1.03 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">sin θ</span>
                    <strong className={`flex items-center justify-center gap-1 ${sinVal >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      <span>{sinVal >= 0 ? '✓' : '✗'}</span>
                      {sinVal.toFixed(3)}
                    </strong>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">cos θ</span>
                    <strong className={`flex items-center justify-center gap-1 ${cosVal >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      <span>{cosVal >= 0 ? '✓' : '✗'}</span>
                      {cosVal.toFixed(3)}
                    </strong>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">tan θ</span>
                    <strong className={`flex items-center justify-center gap-1 ${tanVal !== null ? (tanVal >= 0 ? 'text-emerald-400' : 'text-rose-400') : 'text-slate-500'}`}>
                      {tanVal !== null ? (
                        <>
                          <span>{tanVal >= 0 ? '✓' : '✗'}</span>
                          {tanVal.toFixed(3)}
                        </>
                      ) : (
                        'undef'
                      )}
                    </strong>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-6 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3"
              >
                <h4 className="text-xs font-bold text-purple-400 uppercase">Interactive Identity Checker</h4>
                <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                  <p className="text-amber-400">Pythagorean Verification:</p>
                  <p className="text-slate-300">
                    sin²({angleDeg}°) + cos²({angleDeg}°) = {(sinVal * sinVal).toFixed(3)} + {(cosVal * cosVal).toFixed(3)} ={' '}
                    <strong className="text-emerald-400 font-bold">1.000 ✓</strong>
                  </p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                  <p className="text-sky-400">Double Angle sin(2θ):</p>
                  <p className="text-slate-300">
                    sin({2 * angleDeg}°) = 2 sin({angleDeg}°) cos({angleDeg}°) ={' '}
                    <strong className="text-white">{(2 * sinVal * cosVal).toFixed(3)}</strong>
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 4: STRUCTURED CHALLENGES ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {/* Challenge Header & Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                  {challenge.competencyLevel}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-mono">
                  Score: {scoreBreakdown.correct} / {scoreBreakdown.total}
                </span>
              </div>
            </motion.div>

            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="text-xs text-indigo-300 mt-1">
              📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
            </div>

            {/* ─── CHALLENGE CARD ─── */}
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 15 }}
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
              transition={wrongShake ? { duration: 0.4 } : { duration: 0.2 }}
              className={`p-6 bg-slate-900 rounded-2xl border transition-all duration-300 ${
                wrongFlash ? 'bg-rose-950/40 border-rose-500 shadow-rose-900/30' : 'border-slate-800 shadow-xl'
              }`}
            >
              <p className="text-base sm:text-lg font-semibold text-white mb-4 leading-snug">{challenge.question}</p>

              {/* MCQ OPTIONS */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => {
                    const isSelectedWrong = wrongOptionIndex === i;
                    return (
                      <motion.button
                        key={i}
                        aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        animate={isSelectedWrong ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                        transition={isSelectedWrong ? { duration: 0.4 } : {}}
                        onClick={() => handleAnswer(i)}
                        disabled={answerRevealed || showExplanation}
                        className={`w-full text-left p-4 rounded-xl text-sm transition-all border flex items-center justify-between ${
                          showExplanation && i === challenge.correctIndex
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-medium'
                            : isSelectedWrong
                            ? 'bg-rose-950/70 border-rose-500 text-rose-200 font-medium'
                            : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:bg-slate-800/80 hover:border-indigo-500'
                        }`}
                      >
                        <div>
                          <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                          {opt}
                        </div>
                        {showExplanation && i === challenge.correctIndex && (
                          <span className="text-emerald-400 font-bold ml-2">✓</span>
                        )}
                        {isSelectedWrong && (
                          <span className="text-rose-400 font-bold ml-2">✗</span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* DRAG-LABEL CHALLENGE */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable sign rule: ${item.label}`}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg cursor-grab text-xs font-bold"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {['quad_1', 'quad_2', 'quad_3', 'quad_4'].map((targetId) => (
                      <div
                        key={targetId}
                        role="region"
                        aria-label={`Drop target for ${targetId}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 min-h-[70px] flex flex-col justify-center items-center text-center"
                      >
                        <span className="text-[10px] text-slate-500 uppercase font-bold">
                          {targetId === 'quad_1' ? 'Quadrant I (0°-90°)' : targetId === 'quad_2' ? 'Quadrant II (90°-180°)' : targetId === 'quad_3' ? 'Quadrant III (180°-270°)' : 'Quadrant IV (270°-360°)'}
                        </span>
                        <span className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
                          {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop Sign Rule Here'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Verify Quadrant Mappings"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm"
                  >
                    Verify Quadrant Mappings
                  </motion.button>
                </div>
              )}

              {/* DRAG-SORT CHALLENGE */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag or click items to reorder steps into correct mathematical sequence:</p>
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map((idx) => challenge.sortItems![idx]) : challenge.sortItems).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        role="button"
                        tabIndex={0}
                        aria-label={`Step ${displayIdx + 1}: ${item}`}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIdx);
                        }}
                        whileHover={{ scale: 1.01 }}
                        className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                      >
                        <span className="px-2 py-1 bg-indigo-950 text-indigo-400 rounded font-mono font-bold">{displayIdx + 1}</span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    aria-label="Verify Sequence Order"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3])}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm"
                  >
                    Verify Sequence
                  </motion.button>
                </div>
              )}

              {/* NUMERIC CHALLENGE */}
              {challenge.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="0.01"
                      aria-label="Numeric answer input"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter decimal answer..."
                      className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500 w-64"
                    />
                    <span className="text-sm text-slate-400">{challenge.unit}</span>
                    <motion.button
                      aria-label="Submit numeric answer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || numericInput === ''}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm disabled:opacity-50"
                    >
                      Check
                    </motion.button>
                  </div>
                </div>
              )}

              {/* CONSTRUCT CHALLENGE */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, idx) => (
                      <motion.button
                        key={idx}
                        aria-label={`Add part ${part}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts((prev) => [...prev, part])}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-mono text-indigo-300"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                    {constructParts.map((p, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-900/80 text-white rounded-lg font-mono text-xs flex items-center gap-2">
                        {p}
                        <motion.button
                          aria-label={`Remove part ${p}`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 font-bold"
                        >
                          ✕
                        </motion.button>
                      </span>
                    ))}
                    {constructParts.length === 0 && <span className="text-xs text-slate-600 italic">Click parts above to construct the formula.</span>}
                  </div>
                  <motion.button
                    aria-label="Verify Constructed Identity"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm"
                  >
                    Verify Constructed Identity
                  </motion.button>
                </div>
              )}

              {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-slate-950 rounded-2xl border border-amber-600/50 space-y-3"
                >
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step-by-Step Mathematical Proof:</h4>
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-slate-300 leading-relaxed"
                      >
                        <strong className="text-amber-400 mr-1.5">{sIdx + 1}.</strong>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  <div className="pt-2 flex items-center justify-between">
                    {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        aria-label="Show Next Proof Step"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setRevealedSteps((s) => s + 1)}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold"
                      >
                        Show Next Proof Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Telemetry Mission' : 'Next Challenge'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Telemetry Mission 🎯' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETION & SYNTHESIS ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 rounded-3xl border border-emerald-500/40 text-center shadow-2xl"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="text-5xl mb-2 block"
              >
                🛰️
              </motion.span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">ISC Trigonometric Mission Accomplished!</h2>
              <p className="text-sm text-slate-300 mt-2">Telemetry and radar angular coordinates successfully locked.</p>

              {/* Motivational Personalized Feedback Banner */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`mt-4 p-4 rounded-2xl border text-sm font-bold ${
                  errors === 0
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                    : errors <= 3
                    ? 'bg-sky-950/80 border-sky-500 text-sky-300'
                    : errors <= 7
                    ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                    : 'bg-rose-950/80 border-rose-500 text-rose-300'
                }`}
              >
                <p className="text-base font-extrabold">{motivationalMessage}</p>
                <p className="text-xs font-normal text-slate-300 mt-1">Total errors encountered: {errors}</p>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 text-center">
                <motion.div whileHover={{ scale: 1.04 }} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">Accuracy Score</span>
                  <strong className="text-xl text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">Correct Answers</span>
                  <strong className="text-xl text-sky-400">{scoreBreakdown.correct}</strong>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">BKT Mastery Level</span>
                  <strong className="text-xl text-indigo-400 capitalize">{masteryLevel}</strong>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">SRS Review Due</span>
                  <strong className="text-xl text-amber-400">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</strong>
                </motion.div>
              </div>

              {/* Prominent Spaced Repetition Visibility Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-4 bg-slate-900/90 rounded-2xl border border-amber-500/40 text-center"
              >
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-1">📅 Spaced Repetition Schedule (SM-2 Algorithm)</span>
                <p className="text-sm text-slate-200">
                  Next recommended review:{' '}
                  <strong className="text-amber-300 font-bold">
                    {errors === 0
                      ? 'In 7 days (Mastery tier achieved! Long-term retention check)'
                      : errors <= 3
                      ? 'In 3 days (Solid understanding — short review to reinforce)'
                      : 'In 1 day (Immediate reinforcement recommended)'}
                  </strong>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Active recall at these intervals cements trigonometric angle transformations into permanent memory.
                </p>
              </motion.div>
            </motion.div>

            {/* MISCONCEPTION PROFILE */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/80 space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Your Personalized Misconception Profile:</h3>
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 rounded-xl border border-rose-900/40 text-xs"
                    >
                      <p className="text-rose-300 font-bold">❌ {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ {m.correction}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* REAL-WORLD SYNTHESIS ACTIVITY */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800"
            >
              <h3 className="text-base font-bold text-indigo-300 mb-2">🔭 {REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="space-y-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-start gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800/60 text-xs text-slate-300"
                  >
                    <span className="px-2 py-0.5 bg-indigo-950 text-indigo-400 rounded font-mono font-bold">{idx + 1}</span>
                    <span>{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIM-ENGINE FEEDBACK NOTIFICATIONS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Identity Verified Successfully!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C11_MathematicsSignsTrigonometricFunctionsSim };
export default C11_MathematicsSignsTrigonometricFunctionsSim;
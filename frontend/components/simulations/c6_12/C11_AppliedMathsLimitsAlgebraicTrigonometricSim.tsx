'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───────────────────────────────────
const NODE_C11_APPMATH_051 = 'c11_appmath_051';
const NODE_C11_APPMATH_052 = 'c11_appmath_052';
const NODE_C11_APPMATH_053 = 'c11_appmath_053';
const NODE_C11_APPMATH_054 = 'c11_appmath_054';
const NODE_C11_APPMATH_055 = 'c11_appmath_055';
const NODE_C11_APPMATH_056 = 'c11_appmath_056';
const NODE_C11_APPMATH_057 = 'c11_appmath_057';
const NODE_C11_APPMATH_058 = 'c11_appmath_058';
const NODE_C11_APPMATH_059 = 'c11_appmath_059';
const NODE_C11_APPMATH_060 = 'c11_appmath_060';

const ALL_NODE_IDS = [
  NODE_C11_APPMATH_051,
  NODE_C11_APPMATH_052,
  NODE_C11_APPMATH_053,
  NODE_C11_APPMATH_054,
  NODE_C11_APPMATH_055,
  NODE_C11_APPMATH_056,
  NODE_C11_APPMATH_057,
  NODE_C11_APPMATH_058,
  NODE_C11_APPMATH_059,
  NODE_C11_APPMATH_060,
];

// ─── NARRATIVE SCENARIO ─────────────────────────────────────────────────────
const SCENARIO = {
  title: 'The Smart Metro & High-Frequency Trading Launch',
  intro:
    'You are the Chief Quantitative Analyst for the Bengaluru Metro Expansion & Financial Transit Hub. You must calculate instantaneous speed limits and surge rates using calculus, while profiling passenger density, train delay distributions, and revenue volatility using rigorous statistical dispersion and skewness metrics.',
  context:
    'Two key analytical engines are at your disposal: (1) The Calculus Rate Lab for limits, tangents, and product-quotient dynamics; and (2) The Statistical Dispersion & Shape Engine for quartiles, variance, Karl Pearson coefficients, and combined distributions.',
};

// ─── DISCOVERY HOOK ─────────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question:
    'A high-speed train travels with position function s(t) = t² + 4t meters. If you calculate the average speed between t = 2s and t = 2.0001s, what value is the instantaneous speedometer reading approaching at exactly t = 2s?',
  options: [
    '0 m/s — because Δt approaches 0 resulting in 0/0',
    '8 m/s — the limiting slope of the secants lim(h→0) [(2+h)²+4(2+h)-12]/h',
    '12 m/s — the total position evaluated directly at t = 2',
    '4 m/s — only the linear coefficient survives',
  ],
  correctIndex: 1,
  hintAfter:
    'Notice that 0/0 is an indeterminate signal, not a dead end! Factoring out h reveals the true instantaneous velocity: 2(2) + 4 = 8 m/s.',
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
  bloomLevel?: string;
}

// ─── 22 CHALLENGES ACROSS ALL 10 NODES (FOUNDATION, STANDARD, ADVANCED) ─────
const CHALLENGES: Challenge[] = [
  // Node 051 - Foundation
  {
    id: 'ch_lim_001',
    nodeId: NODE_C11_APPMATH_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the exact value of the standard trigonometric limit lim(x→0) (sin 5x) / x ?',
    options: ['0', '1', '5', 'Undefined (0/0)'],
    correctIndex: 2,
    explanation: 'Rewrite the expression as 5 · lim(5x→0) [sin(5x) / (5x)]. Since lim(u→0) (sin u)/u = 1, the result is 5 × 1 = 5.',
    hints: [
      'Remember that the angle inside the sine must match the denominator exactly.',
      'Multiply and divide the denominator by 5: (5/5) · (sin 5x)/x = 5 · (sin 5x)/(5x).',
      'As x → 0, u = 5x → 0, making (sin u)/u equal to 1. The multiplier 5 yields 5.',
    ],
    misconceptionIndex: 0,
  },
  // Node 051 - Standard (Drag Label standard limits)
  {
    id: 'ch_lim_002',
    nodeId: NODE_C11_APPMATH_051,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match each standard limit expression as x → 0 (or x → a) to its exact theoretical evaluation.',
    dragItems: [
      { label: '1', targetId: 'slot_exp' },
      { label: '1/2', targetId: 'slot_cos' },
      { label: 'n·a^(n-1)', targetId: 'slot_alg' },
      { label: '1', targetId: 'slot_ln' },
    ],
    correctMapping: {
      slot_exp: '1',
      slot_cos: '1/2',
      slot_alg: 'n·a^(n-1)',
      slot_ln: '1',
    },
    explanation:
      'lim(x→0)(e^x-1)/x = 1, lim(x→0)(1-cos x)/x² = 1/2 (via 2sin²(x/2)/x²), lim(x→a)(x^n-a^n)/(x-a) = n·a^(n-1), and lim(x→0)ln(1+x)/x = 1.',
    hints: [
      'For (1 - cos x)/x², use the identity 1 - cos x = 2 sin²(x/2).',
      'Exponential standard form lim(x→0) (e^x - 1)/x yields 1.',
      'Algebraic difference of nth powers yields n·a^(n-1).',
    ],
    misconceptionIndex: 0,
  },
  // Node 051 - Advanced Numeric
  {
    id: 'ch_lim_003',
    nodeId: NODE_C11_APPMATH_051,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Evaluate the algebraic limit: lim(x→2) (x⁴ - 16) / (x - 2).',
    correctAnswer: 32,
    tolerance: 0.1,
    unit: '',
    explanation: 'Using the standard formula lim(x→a) (xⁿ - aⁿ)/(x - a) = n·aⁿ⁻¹ with n=4 and a=2 gives 4·(2)³ = 4 × 8 = 32.',
    hints: [
      'Notice that 16 is 2⁴, so the expression has the form (xⁿ - aⁿ)/(x - a).',
      'Apply the formula: n · a^(n - 1) where a = 2 and n = 4.',
      '4 × (2³) = 4 × 8 = 32.',
    ],
    misconceptionIndex: 0,
  },
  // Node 052 - Foundation
  {
    id: 'ch_der_001',
    nodeId: NODE_C11_APPMATH_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Geometrically, what does the first principles limit f\'(a) = lim(h→0) [f(a+h) - f(a)]/h represent?',
    options: [
      'The length of the chord joining (0,0) to (a, f(a))',
      'The slope of the tangent line to y = f(x) at the point (a, f(a))',
      'The area under the curve between x = 0 and x = a',
      'The average rate of change over a large finite interval',
    ],
    correctIndex: 1,
    explanation: 'The incremental quotient [f(a+h)-f(a)]/h represents the slope of a secant line. As h→0, the secant pivots to become the tangent at x = a.',
    hints: [
      'Think about what happens as the point Q(a+h, f(a+h)) slides along the curve toward P(a, f(a)).',
      'The line passing through P and Q is a secant line.',
      'In the limit as h approaches 0, the secant line becomes the tangent line.',
    ],
    misconceptionIndex: 1,
  },
  // Node 052 - Standard (Drag Sort first principles steps)
  {
    id: 'ch_der_002',
    nodeId: NODE_C11_APPMATH_052,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the logical steps to find the derivative of f(x) = x² from first principles.',
    sortItems: [
      'Write incremental quotient: [(x+h)² - x²] / h',
      'Expand numerator: [x² + 2xh + h² - x²] / h',
      'Factor out h: [h(2x + h)] / h = 2x + h (for h ≠ 0)',
      'Evaluate limit as h → 0 to obtain f\'(x) = 2x',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'We must form the difference quotient, expand the binomial, cancel the denominator h algebraically, and then safely evaluate the limit as h→0.',
    hints: [
      'Start with the definition quotient [f(x+h) - f(x)]/h.',
      'Expand (x+h)² before simplifying.',
      'Cancel h before letting h approach 0 to prevent a 0/0 impasse.',
    ],
    misconceptionIndex: 1,
  },
  // Node 053 - Foundation
  {
    id: 'ch_der_003',
    nodeId: NODE_C11_APPMATH_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the derivative of f(x) = 1/x³ with respect to x?',
    options: ['1 / (3x²)', '-3 / x⁴', '-3 / x²', '3x⁻²'],
    correctIndex: 1,
    explanation: 'Rewrite 1/x³ as x⁻³. Applying the power rule d/dx(xⁿ) = n·xⁿ⁻¹ gives -3·x⁻⁴ = -3/x⁴.',
    hints: [
      'Convert the reciprocal to negative index notation first: x^(-3).',
      'Apply power rule: multiply by the power (-3) and reduce exponent by 1: (-3 - 1 = -4).',
      'x^(-4) equals 1/x⁴, giving -3/x⁴.',
    ],
    misconceptionIndex: 2,
  },
  // Node 053 - Standard
  {
    id: 'ch_der_004',
    nodeId: NODE_C11_APPMATH_053,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'Which list contains ONLY correctly stated standard trigonometric derivatives?',
    options: [
      'd/dx(cos x) = sin x, d/dx(tan x) = sec² x',
      'd/dx(cos x) = -sin x, d/dx(sec x) = sec x tan x, d/dx(cosec x) = -cosec x cot x',
      'd/dx(sin x) = -cos x, d/dx(cot x) = cosec² x',
      'd/dx(sec x) = -sec x tan x, d/dx(tan x) = sec x',
    ],
    correctIndex: 1,
    explanation: 'All trigonometric co-functions (cos, cosec, cot) carry a leading negative sign in their derivatives: cos x → -sin x, sec x → sec x tan x, cosec x → -cosec x cot x.',
    hints: [
      'Remember the "C-rule": functions beginning with "c" have negative derivatives.',
      'The derivative of cos x must be negative sine.',
      'The derivative of sec x is sec x tan x (positive).',
    ],
    misconceptionIndex: 2,
  },
  // Node 054 - Foundation
  {
    id: 'ch_rule_001',
    nodeId: NODE_C11_APPMATH_054,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the product rule for differentiating y = u(x) · v(x)?',
    options: [
      'dy/dx = u\' · v\'',
      'dy/dx = u · v\' + v · u\'',
      'dy/dx = (u · v\' - v · u\') / v²',
      'dy/dx = u\' + v\'',
    ],
    correctIndex: 1,
    explanation: 'Because both functions are changing simultaneously, d/dx[u·v] = u·(dv/dx) + v·(du/dx).',
    hints: [
      'The derivative of a product is NEVER just the product of the individual derivatives.',
      'Each function takes turns being differentiated while multiplying the other untouched function.',
      'The formula contains two additive terms: u·v\' + v·u\'.',
    ],
    misconceptionIndex: 3,
  },
  // Node 054 - Standard Numeric (Application)
  {
    id: 'ch_rule_002',
    nodeId: NODE_C11_APPMATH_054,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given revenue function R(x) = (x² + 5x)/(2x + 1) in thousands of rupees, find the instantaneous rate of change dR/dx at x = 1.',
    correctAnswer: 1,
    tolerance: 0.05,
    unit: 'k ₹/day',
    explanation: 'Quotient rule: [(2x+1)(2x+5) - (x²+5x)(2)] / (2x+1)². At x=1: [(3)(7) - (6)(2)] / 3² = (21 - 12) / 9 = 9/9 = 1.',
    hints: [
      'Let u = x² + 5x (u\' = 2x + 5) and v = 2x + 1 (v\' = 2).',
      'Apply quotient rule: [v·u\' - u·v\'] / v².',
      'Substitute x = 1 into numerator (3 × 7 - 6 × 2 = 9) and denominator (3² = 9). 9 / 9 = 1.',
    ],
    misconceptionIndex: 3,
  },
  // Node 054 - Advanced Construct
  {
    id: 'ch_rule_003',
    nodeId: NODE_C11_APPMATH_054,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Construct the simplified derivative expression for y = x² · sin x.',
    availableParts: ['x²', '2x', 'sin x', 'cos x', '+', '-', '·', 'x² cos x', '2x sin x'],
    targetState: 'x² cos x + 2x sin x',
    validationHint: 'Use product rule: (first · derivative of second) + (second · derivative of first).',
    explanation: 'By product rule: u=x² (u\'=2x) and v=sin x (v\'=cos x). d/dx[u·v] = x²·cos x + 2x·sin x.',
    hints: [
      'Differentiate sin x to get cos x; multiply by x² to form the first term.',
      'Differentiate x² to get 2x; multiply by sin x to form the second term.',
      'Combine them with an addition operator: x² cos x + 2x sin x.',
    ],
  },
  // Node 055 - Foundation
  {
    id: 'ch_stat_001',
    nodeId: NODE_C11_APPMATH_055,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For a dataset with first quartile Q1 = 30 and third quartile Q3 = 70, what is the Semi-Interquartile Range (Quartile Deviation)?',
    options: ['40', '20', '50', '0.40'],
    correctIndex: 1,
    explanation: 'Interquartile range IQR = Q3 - Q1 = 70 - 30 = 40. The Quartile Deviation (QD) = IQR / 2 = 40 / 2 = 20.',
    hints: [
      'First calculate the Interquartile Range: IQR = Q3 - Q1.',
      '70 - 30 = 40.',
      'Quartile Deviation is half of the IQR: 40 / 2 = 20.',
    ],
    misconceptionIndex: 4,
  },
  // Node 055 - Standard Numeric
  {
    id: 'ch_stat_002',
    nodeId: NODE_C11_APPMATH_055,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For an ordered dataset with Q1 = 40 and Q3 = 60, calculate the Coefficient of Quartile Deviation (round to 2 decimals).',
    correctAnswer: 0.2,
    tolerance: 0.02,
    unit: '',
    explanation: 'Coefficient of Quartile Deviation = (Q3 - Q1) / (Q3 + Q1) = (60 - 40) / (60 + 40) = 20 / 100 = 0.20.',
    hints: [
      'Formula is (Q3 - Q1) / (Q3 + Q1).',
      'Numerator is 60 - 40 = 20; denominator is 60 + 40 = 100.',
      '20 / 100 = 0.20.',
    ],
    misconceptionIndex: 4,
  },
  // Node 056 - Foundation
  {
    id: 'ch_stat_003',
    nodeId: NODE_C11_APPMATH_056,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does Mean Deviation use absolute deviations |xi - x̄| rather than ordinary signed differences (xi - x̄)?',
    options: [
      'Because negative numbers cannot be divided by N',
      'Because the algebraic sum of deviations from the arithmetic mean Σ(xi - x̄) is always exactly zero',
      'Because standard deviation already uses signed differences',
      'Because distances must always be measured in square units',
    ],
    correctIndex: 1,
    explanation: 'A fundamental mathematical property of the arithmetic mean is that Σ(xi - x̄) = 0. Absolute values prevent positive and negative distances from canceling out.',
    hints: [
      'What is the sum of (xi - x̄) across any entire sample?',
      'Deviations to the right balance deviations to the left exactly.',
      'Without absolute signs, the numerator sum would always equal 0.',
    ],
  },
  // Node 056 - Standard Numeric
  {
    id: 'ch_stat_004',
    nodeId: NODE_C11_APPMATH_056,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the Mean Deviation about the Mean for the dataset: 10, 20, 30, 40, 50.',
    correctAnswer: 12,
    tolerance: 0.1,
    unit: '',
    explanation: 'Mean x̄ = (10+20+30+40+50)/5 = 30. Deviations |xi - 30|: 20, 10, 0, 10, 20. Sum = 60. MD = 60 / 5 = 12.',
    hints: [
      'Find the mean x̄ first: (150)/5 = 30.',
      'Compute absolute differences from 30: |10-30|=20, |20-30|=10, |30-30|=0, |40-30|=10, |50-30|=20.',
      'Sum the absolute deviations (60) and divide by N=5: 60 / 5 = 12.',
    ],
  },
  // Node 057 - Foundation
  {
    id: 'ch_sd_001',
    nodeId: NODE_C11_APPMATH_057,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'If a dataset has a standard deviation of σ = 8 and a mean of x̄ = 40, what is its Coefficient of Variation (CV)?',
    options: ['5%', '20%', '320%', '0.20%'],
    correctIndex: 1,
    explanation: 'Coefficient of Variation CV = (σ / x̄) × 100 = (8 / 40) × 100 = 0.20 × 100 = 20%.',
    hints: [
      'Formula for Coefficient of Variation is (σ / x̄) × 100.',
      'Divide 8 by 40 to get 0.2.',
      'Multiply by 100 to express as a percentage: 20%.',
    ],
  },
  // Node 057 - Standard (Comparison / Evaluation)
  {
    id: 'ch_sd_002',
    nodeId: NODE_C11_APPMATH_057,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Batsman Rohit has mean = 50, SD = 10 (CV = 20%). Batsman Virat has mean = 40, SD = 6 (CV = 15%). Which batsman is MORE CONSISTENT?',
    options: [
      'Rohit — because his average runs (mean 50) is higher',
      'Virat — because his relative dispersion (lower CV of 15%) is smaller',
      'Both are equally consistent',
      'Rohit — because his standard deviation is larger',
    ],
    correctIndex: 1,
    explanation: 'Consistency in statistics is judged by lower relative variability (lower Coefficient of Variation). Since Virat has CV = 15% < 20%, Virat is more consistent.',
    hints: [
      'Higher mean indicates higher scoring, but consistency is measured by dispersion.',
      'Compare their Coefficients of Variation (CV).',
      'A lower CV means greater consistency.',
    ],
  },
  // Node 058 - Foundation
  {
    id: 'ch_comb_001',
    nodeId: NODE_C11_APPMATH_058,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Class Section A has 30 students with mean 60. Section B has 20 students with mean 70. What is the correct combined mean x̄c?',
    options: ['65.0 (simple average)', '64.0 (weighted average)', '66.6', '62.0'],
    correctIndex: 1,
    explanation: 'Combined mean must be weighted by group size: x̄c = (30×60 + 20×70) / (30 + 20) = (1800 + 1400) / 50 = 3200 / 50 = 64.0.',
    hints: [
      'Do not simply average (60 + 70)/2 because the class sizes are unequal (30 vs 20).',
      'Compute total marks: 30 × 60 + 20 × 70 = 1800 + 1400 = 3200.',
      'Divide by total students (50): 3200 / 50 = 64.',
    ],
  },
  // Node 058 - Standard Numeric
  {
    id: 'ch_comb_002',
    nodeId: NODE_C11_APPMATH_058,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Group 1 has n₁=10, x̄₁=15, σ₁=3. Group 2 has n₂=10, x̄₂=25, σ₂=3. Combined mean x̄c = 20. Find the combined variance σc².',
    correctAnswer: 34,
    tolerance: 0.2,
    unit: '',
    explanation: 'd₁ = 15 - 20 = -5 (d₁²=25), d₂ = 25 - 20 = 5 (d₂²=25). σc² = [10(3²+25) + 10(3²+25)] / 20 = [10(34) + 10(34)] / 20 = 680 / 20 = 34.',
    hints: [
      'Calculate distances of group means from combined mean: d₁ = 15 - 20 = -5, d₂ = 25 - 20 = 5.',
      'Each group contributes n·(σ² + d²) = 10·(9 + 25) = 10 × 34 = 340.',
      'Total combined variance = (340 + 340) / 20 = 680 / 20 = 34.',
    ],
  },
  // Node 059 - Foundation
  {
    id: 'ch_skew_001',
    nodeId: NODE_C11_APPMATH_059,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a unimodal frequency distribution, the right tail is much longer than the left tail. What is this distribution and the relative order of its central values?',
    options: [
      'Negatively skewed: Mean < Median < Mode',
      'Symmetric: Mean = Median = Mode',
      'Positively skewed: Mean > Median > Mode',
      'Platykurtic with Mean = 0',
    ],
    correctIndex: 2,
    explanation: 'A longer tail to the right means extreme high values pull the mean rightwards: Positively skewed with Mean > Median > Mode.',
    hints: [
      'The mean is sensitive to extreme values in the longer tail and gets pulled toward it.',
      'A longer right tail pulls the mean to higher values.',
      'Therefore, Mean > Median > Mode.',
    ],
  },
  // Node 059 - Standard
  {
    id: 'ch_skew_002',
    nodeId: NODE_C11_APPMATH_059,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A frequency curve has a tall, sharp central peak with heavy tails compared to a normal distribution. What is its kurtosis classification?',
    options: ['Platykurtic', 'Mesokurtic', 'Leptokurtic', 'Negatively Skewed'],
    correctIndex: 2,
    explanation: 'Leptokurtic curves have a sharp, slender peak and fat tails (β₂ > 3). Platykurtic is flat-topped (β₂ < 3), and Mesokurtic is normal (β₂ = 3).',
    hints: [
      '"Lepto" comes from the Greek word for slender or thin.',
      'A sharp high peak with fat tails corresponds to leptokurtic.',
      'Mesokurtic represents the standard bell curve.',
    ],
  },
  // Node 060 - Foundation
  {
    id: 'ch_karl_001',
    nodeId: NODE_C11_APPMATH_060,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is Karl Pearson\'s coefficient of skewness formula when the mode is well-defined?',
    options: [
      'Sk = (Mean - Mode) / SD',
      'Sk = (Mean + Mode) / SD',
      'Sk = (Q3 + Q1 - 2 Median) / (Q3 - Q1)',
      'Sk = (Mean - Median) / Variance',
    ],
    correctIndex: 0,
    explanation: 'Karl Pearson\'s primary coefficient is Sk = (Mean - Mode) / SD. If mode is ill-defined, the empirical alternative is 3(Mean - Median) / SD.',
    hints: [
      'Skewness measures the distance between the mean and the peak (mode), scaled by standard deviation.',
      'The numerator is the difference: Mean - Mode.',
      'The denominator is the standard deviation (SD).',
    ],
  },
  // Node 060 - Standard Numeric
  {
    id: 'ch_karl_002',
    nodeId: NODE_C11_APPMATH_060,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For a distribution of Kolkata metro ticket sales, Mean = 58, Mode = 52, and SD = 12. Calculate Karl Pearson\'s coefficient of skewness.',
    correctAnswer: 0.5,
    tolerance: 0.05,
    unit: '',
    explanation: 'Sk = (Mean - Mode) / SD = (58 - 52) / 12 = 6 / 12 = 0.50 (moderately positively skewed).',
    hints: [
      'Use formula Sk = (Mean - Mode) / SD.',
      'Substitute: (58 - 52) / 12.',
      '6 / 12 = 0.50.',
    ],
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
  nodeId: NODE_C11_APPMATH_051,
  title: 'Applied Calculus & Statistical Distribution Dynamics',
  definition:
    'Applied Calculus establishes instantaneous rates of change via limits and derivatives of algebraic/trigonometric models, while Statistics quantifies dispersion, central tendency convergence, and higher-order shape metrics (skewness and kurtosis) across continuous and grouped distributions.',
  eli5:
    'Calculus is your instantaneous speedometer zooming in until a curved track looks straight. Statistics is your bird-eye camera showing how tightly packed your crowd is, and whether the line stretches far to the left or right!',
  misconceptions: [
    {
      misconception: '0/0 means the limit is zero or does not exist.',
      correction:
        '0/0 is an indeterminate signal requiring factoring, rationalising, or standard limit identities to reveal the true limiting value.',
    },
    {
      misconception: 'The derivative at a point is identical to the average rate over a broad interval.',
      correction:
        'Average rate is secant slope [f(b)-f(a)]/(b-a). Derivative is the instantaneous tangent slope as interval h shrinks to 0.',
    },
    {
      misconception: 'd/dx(cos x) is positive sin x, or d/dx(1/x³) is 1/(3x²).',
      correction:
        'All "co" trigonometric derivatives carry minus signs (cos x → -sin x), and reciprocals must be converted to negative powers x⁻³ → -3x⁻⁴.',
    },
    {
      misconception: 'Derivative of a product u·v is simply u\'·v\'.',
      correction:
        'Because both factors change simultaneously, product rule requires u·v\' + v·u\'.',
    },
    {
      misconception: 'Range is always superior to Quartile Deviation because it includes all data points.',
      correction:
        'Range is corrupted by a single outlier. Quartile deviation is robust because it focuses on the stable central 50%.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is lim(x→0) (e^(3x) - 1) / x ?',
      options: ['1', '3', '0', 'e³'],
      correctIndex: 1,
    },
    {
      question: 'The slope of the tangent to y = x² - 2x at x = 3 is:',
      options: ['4', '3', '6', '1'],
      correctIndex: 0,
    },
    {
      question: 'd/dx (x³ · cos x) equals:',
      options: ['3x² · cos x - x³ · sin x', '-3x² · sin x', '3x² · sin x', 'x³ · cos x + 3x² · sin x'],
      correctIndex: 0,
    },
    {
      question: 'If Q1 = 20 and Q3 = 60, what is the Semi-Interquartile Range?',
      options: ['40', '20', '80', '0.5'],
      correctIndex: 1,
    },
    {
      question: 'The algebraic sum of deviations of observations from their arithmetic mean Σ(xi - x̄) is always:',
      options: ['1', 'Greater than 0', '0', 'Equal to the variance'],
      correctIndex: 2,
    },
    {
      question: 'If two groups have n₁=30, x̄₁=50 and n₂=20, x̄₂=60, their combined mean is:',
      options: ['55', '54', '56', '52'],
      correctIndex: 1,
    },
    {
      question: 'In a positively skewed distribution, the correct order of central tendencies is:',
      options: ['Mean > Median > Mode', 'Mode > Median > Mean', 'Median > Mean > Mode', 'Mean = Median = Mode'],
      correctIndex: 0,
    },
    {
      question: 'Karl Pearson\'s coefficient of skewness for Mean=45, Mode=39, SD=12 is:',
      options: ['+0.50', '-0.50', '+0.25', '+1.50'],
      correctIndex: 0,
    },
  ],
  masteryCriteria:
    'Demonstrate fluency across standard limits, first-principle tangents, algebraic/trigonometric differentiation rules, quartile & mean deviations, variance & CV comparisons, combined distribution weighting, and Karl Pearson skewness evaluation.',
};

// ─── EXPLORATION STEPS (BRILLIANT.ORG STYLE) ────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Zooming into the Indeterminate Limit',
    instruction: 'Slide delta x (h) toward 0. Observe how the secant line morphs into the exact tangent without hitting a 0/0 divide error.',
    interactionType: 'slider-secant',
    nodeId: NODE_C11_APPMATH_051,
  },
  {
    title: 'First Principles & Tangent Slopes',
    instruction: 'Drag the point of contact along the parabola y = x². Watch the instantaneous slope 2x update in real-time.',
    interactionType: 'slider-point',
    nodeId: NODE_C11_APPMATH_052,
  },
  {
    title: 'Product & Quotient Differentiation Pulse',
    instruction: 'Toggle between polynomial and trigonometric waveforms to see how u(x)·v(x) combines instantaneous rates.',
    interactionType: 'toggle-product',
    nodeId: NODE_C11_APPMATH_054,
  },
  {
    title: 'Dispersion: Range vs Quartile Robustness',
    instruction: 'Inject an extreme outlier passenger delay into the dataset. Watch the range explode while IQR stays rock-solid.',
    interactionType: 'button-outlier',
    nodeId: NODE_C11_APPMATH_055,
  },
  {
    title: 'Skewness & Kurtosis Morphing Lab',
    instruction: 'Shift the distribution skewness slider from negative to positive. Watch how the Mean pulls away from the Mode.',
    interactionType: 'slider-skew',
    nodeId: NODE_C11_APPMATH_059,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ─────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: As the secant step h shrinks from 1.0 to 0.001 on the curve f(x) = x² at x = 2, what will the secant slope [(2+h)² - 4]/h approach?',
    options: ['It will drop to 0', 'It will approach exactly 4', 'It will grow toward infinity', 'It will fluctuate randomly'],
    correctIndex: 1,
    verifyInstruction: 'Now slide h to 0.01 in the visualizer and observe the slope readout lock onto 4.00.',
    nodeId: NODE_C11_APPMATH_052,
  },
  {
    question:
      'Predict: If you add an extreme delay of 500 minutes to a metro transit dataset where 90% of delays are under 10 minutes, what happens to IQR vs Range?',
    options: [
      'Both Range and IQR will multiply by 50',
      'Range increases massively, but IQR remains practically unchanged',
      'IQR increases massively, but Range stays constant',
      'Neither metric changes',
    ],
    correctIndex: 1,
    verifyInstruction: 'Click "Inject Outlier" in the Dispersion Lab to visually compare the Range bar with the IQR box.',
    nodeId: NODE_C11_APPMATH_055,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'When positive skewness is increased on the distribution curve, which average is pulled farthest to the right tail?',
    observableOptions: [
      'The Mean is pulled farthest right',
      'The Mode is pulled farthest right',
      'The Median moves farthest right',
      'All three averages stay locked together',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_APPMATH_059,
  },
  {
    question: 'In the Product Rule visualization for y = x² · sin x, what composed the total rate of change?',
    observableOptions: [
      'Simply multiplying the two individual rates: 2x · cos x',
      'Two additive terms: (x² · cos x) + (2x · sin x)',
      'The quotient of the two rates: (2x) / (cos x)',
      'Only the derivative of the polynomial part',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_APPMATH_054,
  },
];

// ─── REAL WORLD ACTIVITY ────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'High-Frequency Quantitative Transit Report',
  description:
    'Design an operational stability metric for the Bengaluru Namma Metro Purple Line. Model train deceleration rates using polynomial derivatives and measure headway time consistency across 20 stations using Bowley\'s and Karl Pearson\'s skewness coefficients.',
  steps: [
    'Calculate instantaneous deceleration a(t) = s\'\'(t) entering Majestic interchange',
    'Compile 1,000 peak-hour passenger boarding intervals into grouped frequency intervals',
    'Evaluate Q1, Median, and Q3 to compute Bowley\'s Skewness Sk_b = (Q3 + Q1 - 2M)/(Q3 - Q1)',
    'Compare Coefficient of Variation CV = (σ/x̄)×100 against Mumbai Metro Line 1 benchmarks',
  ],
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
function C11_AppliedMathsLimitsAlgebraicTrigonometricSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_APPMATH_051,
  title = DEFAULT_PROPS.title || 'Applied Calculus & Statistical Distribution Dynamics',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['appmath'] || { name: 'Applied Mathematics', emoji: '📐', color: 'indigo' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);

  // Brilliant Exploration Interactive State
  const [secantH, setSecantH] = useState(1.5);
  const [tangentX, setTangentX] = useState(1.5);
  const [productRuleMode, setProductRuleMode] = useState<'product' | 'quotient'>('product');
  const [hasOutlier, setHasOutlier] = useState(false);
  const [distributionSkew, setDistributionSkew] = useState(0); // -1 (neg) to 0 (sym) to +1 (pos)

  // Sandbox Live Variables
  const [sandboxPolyA, setSandboxPolyA] = useState(1);
  const [sandboxPolyPower, setSandboxPolyPower] = useState(2);
  const [sandboxGroupMean1, setSandboxGroupMean1] = useState(50);
  const [sandboxGroupN1, setSandboxGroupN1] = useState(30);
  const [sandboxGroupMean2, setSandboxGroupMean2] = useState(70);
  const [sandboxGroupN2, setSandboxGroupN2] = useState(20);

  // Predict & Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Challenge Handling State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive Drag / Sort / Numeric / Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Reflection State
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Misconception & BKT State
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ─��──────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── CALCULATED LIVE DERIVATIVES & METRICS ───────────────────────────────────
  const secantSlope = useMemo(() => {
    const x0 = 2;
    const y0 = x0 * x0;
    const x1 = x0 + secantH;
    const y1 = x1 * x1;
    return (y1 - y0) / secantH;
  }, [secantH]);

  const liveTangentSlope = useMemo(() => {
    return 2 * tangentX;
  }, [tangentX]);

  const sandboxCombinedMean = useMemo(() => {
    const total = sandboxGroupN1 * sandboxGroupMean1 + sandboxGroupN2 * sandboxGroupMean2;
    const count = sandboxGroupN1 + sandboxGroupN2;
    return count > 0 ? (total / count).toFixed(2) : '0';
  }, [sandboxGroupN1, sandboxGroupMean1, sandboxGroupN2, sandboxGroupMean2]);

  // ─── MOTIVATIONAL FEEDBACK HELPER ───────────────────────────────────────────
  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE! 🌟';
    if (errCount <= 3) return 'Great work! 👍';
    if (errCount <= 7) return 'Good effort! 👏';
    return 'Do not give up — You WILL get this! 💪';
  };

  // ─── LOAD INITIAL MASTERY ON MOUNT ──────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTATION EFFECT ──────────────────────────────────────────────────
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

  // ─── CANVAS 2D WAVE & TANGENT ANIMATION ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid background
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

      // Live waveform pulse (Product rule representation)
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const u = ((x - canvas.width / 2) / 40);
        const y = canvas.height / 2 - Math.sin(u + t) * (productRuleMode === 'product' ? Math.cos(u * 0.5) * 45 : 35);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Tangent indicator particle
      const px = canvas.width / 2 + Math.sin(t * 0.5) * 100;
      const pu = (px - canvas.width / 2) / 40;
      const py = canvas.height / 2 - Math.sin(pu + t) * 40;

      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [productRuleMode]);

  // ─── CALLBACKS ─────────────────────────────────────────────────────────────
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
      speechManager.speak('Let us study the complete step-by-step resolution.');
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
    setDiscoverySelected(idx);
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent physical intuition! The limiting slope is 8.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Let us explore calculus and distributions.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test custom polynomial coefficients, trigonometric rates, and combined group metrics.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Good luck with your quantitative analysis!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now adjust the visual slider to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation! The extreme tail pulls the arithmetic mean.' : 'Look closely at the relative shifts.');
  }, []);

  const handleSecantChange = useCallback((val: number) => {
    setSecantH(val);
    audioManager.play('count');
    if (val <= 0.05 && predictionMade) {
      setPredictionVerified(true);
    }
  }, [predictionMade]);

  const handleTangentXChange = useCallback((val: number) => {
    setTangentX(val);
    audioManager.play('count');
  }, []);

  const handleProductToggle = useCallback((mode: 'product' | 'quotient') => {
    setProductRuleMode(mode);
    audioManager.play('pop');
  }, []);

  const handleOutlierToggle = useCallback(() => {
    setHasOutlier((prev) => !prev);
    audioManager.play('balance');
  }, []);

  const handleSkewChange = useCallback((val: number) => {
    setDistributionSkew(val);
    audioManager.play('count');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Simulation complete with a score of ${finalScore} percent!`);
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
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding analysis.');
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
          speechManager.speak('Let us review the step-by-step derivation.');
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

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
      setDraggedItem(null);
    },
    [draggedItem]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const initial = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
      const [moved] = initial.splice(fromIndex, 1);
      initial.splice(toIndex, 0, moved);
      return initial;
    });
  }, []);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3];
    handleAnswer(finalOrder);
  }, [sortArrangement, handleAnswer]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      {/* ─── HEADER BAR ───────────────────────────────────────────────���────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-2xl shadow-inner"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-indigo-400 font-medium">Class 11 ISC Applied Mathematics • Calculus & Statistics</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
            Phase: <span className="text-indigo-400 capitalize">{phase}</span>
          </span>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950 text-rose-400 border border-rose-700'
                : 'bg-indigo-950 text-indigo-400 border border-indigo-700'
            }`}
          >
            {difficulty}
          </motion.span>
        </div>
      </div>

      {/* ─── DISCOVERY PHASE ───────────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <h2 className="text-lg md:text-xl font-bold text-indigo-300 flex items-center gap-2">
              🚇 {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-indigo-900/30 rounded-xl border border-indigo-700/40 text-xs text-indigo-200">
              💡 <strong>Quant Analyst Challenge:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-white">
              🔍 Discovery Curiosity Question: {DISCOVERY_QUESTION.question}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl text-sm transition-all border ${
                    discoverySelected === i
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/70 border-rose-500 text-rose-200'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800'
                  }`}
                  aria-label={`Option ${i + 1}: ${opt}`}
                >
                  <span className="font-mono text-indigo-400 mr-2">[{i + 1}]</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
                <p className={`text-sm mb-4 font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Instantaneous velocity is the exact tangent slope.' : `⚡ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Launch Interactive Discovery Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── EXPLORE PHASE (BRILLIANT INTERACTIVE STEPS) ────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-indigo-300">
                  Step {currentSlide + 1}: {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-amber-300 text-sm font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── INTERACTIVE VISUALIZATION AREA ─── */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[320px]">
                {/* STEP 0: Secant to Tangent Limit Zoom */}
                {currentSlide === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">Fixed Point P</span>
                        <p className="text-sm font-mono font-bold text-emerald-400">(2.0, 4.0)</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">Moving Point Q (2+h, (2+h)²)</span>
                        <p className="text-sm font-mono font-bold text-indigo-400">
                          ({(2 + secantH).toFixed(3)}, {((2 + secantH) ** 2).toFixed(3)})
                        </p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">Secant Slope Δy/Δx</span>
                        <p className="text-base font-mono font-black text-amber-400">{secantSlope.toFixed(4)}</p>
                      </div>
                    </div>

                    <svg viewBox="0 0 400 200" className="w-full bg-slate-900/60 rounded-xl border border-slate-800">
                      <path
                        d="M 50 180 Q 200 180 350 40"
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth={3}
                      />
                      <line x1="80" y1="180" x2="320" y2="20" stroke="#22c55e" strokeWidth={1.5} strokeDasharray="4 4" />
                      <line
                        x1="120"
                        y1="150"
                        x2={120 + secantH * 80}
                        y2={150 - (secantSlope * secantH * 25)}
                        stroke="#f59e0b"
                        strokeWidth={2.5}
                      />
                      <circle cx="120" cy="150" r="5" fill="#22c55e" />
                      <text x="110" y="140" fill="#22c55e" fontSize="10">P(2, 4)</text>
                      <circle cx={120 + secantH * 80} cy={150 - (secantSlope * secantH * 25)} r="5" fill="#f59e0b" />
                      <text x={125 + secantH * 80} y={145 - (secantSlope * secantH * 25)} fill="#f59e0b" fontSize="10">
                        Q
                      </text>
                    </svg>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400 font-mono">
                        <span>Secant Increment h: {secantH.toFixed(3)}</span>
                        <span>Approaching Tangent (h → 0)</span>
                      </div>
                      <input
                        type="range"
                        min={0.001}
                        max={2.0}
                        step={0.01}
                        value={secantH}
                        onChange={(e) => handleSecantChange(parseFloat(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                        aria-label="Set secant step increment h"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 1: Point along curve (First principles derivative) */}
                {currentSlide === 1 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-xs text-slate-400">Position x</span>
                        <p className="text-sm font-mono font-bold text-indigo-400">{tangentX.toFixed(2)}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400">f(x) = x²</span>
                        <p className="text-sm font-mono font-bold text-white">{(tangentX ** 2).toFixed(2)}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400">Instantaneous Derivative f\'(x) = 2x</span>
                        <p className="text-lg font-mono font-black text-emerald-400">{liveTangentSlope.toFixed(2)}</p>
                      </div>
                    </div>

                    <svg viewBox="0 0 400 180" className="w-full bg-slate-900/60 rounded-xl">
                      <path d="M 50 160 Q 200 160 350 20" fill="none" stroke="#6366f1" strokeWidth={2.5} />
                      <line
                        x1={100 + tangentX * 50 - 50}
                        y1={160 - (tangentX ** 2) * 20 + liveTangentSlope * 15}
                        x2={100 + tangentX * 50 + 50}
                        y2={160 - (tangentX ** 2) * 20 - liveTangentSlope * 15}
                        stroke="#22c55e"
                        strokeWidth={3}
                      />
                      <circle cx={100 + tangentX * 50} cy={160 - (tangentX ** 2) * 20} r="6" fill="#22c55e" />
                    </svg>

                    <input
                      type="range"
                      min={0.2}
                      max={2.8}
                      step={0.05}
                      value={tangentX}
                      onChange={(e) => handleTangentXChange(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                      aria-label="Set point along curve"
                    />
                  </div>
                )}

                {/* STEP 2: Product & Quotient Waves */}
                {currentSlide === 2 && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleProductToggle('product')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold ${
                          productRuleMode === 'product' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        Product Rule: u·v\' + v·u\'
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleProductToggle('quotient')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold ${
                          productRuleMode === 'quotient' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        Quotient Rule: (v·u\' - u·v\') / v²
                      </motion.button>
                    </div>
                    <canvas ref={canvasRef} width={500} height={160} className="w-full rounded-xl border border-slate-800" />
                    <p className="text-xs text-slate-400">
                      Live animated representation of coupled oscillating waveforms combining rates simultaneously.
                    </p>
                  </div>
                )}

                {/* STEP 3: Dispersion Outlier Lab */}
                {currentSlide === 3 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-300">
                        Metro Station Delay Sample (mins): 2, 4, 5, 5, 6, 7, 8, 9, 10 {hasOutlier && '... and 180! (Broken Track)'}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOutlierToggle}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          hasOutlier ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white'
                        }`}
                      >
                        {hasOutlier ? 'Remove Outlier' : 'Inject Severe Outlier'}
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">Range = Max - Min</span>
                        <p className="text-2xl font-mono font-bold text-rose-400">{hasOutlier ? '178 mins' : '8 mins'}</p>
                        <span className="text-[10px] text-rose-400/80">Extremely sensitive to anomalies</span>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">IQR = Q3 - Q1 (Central 50%)</span>
                        <p className="text-2xl font-mono font-bold text-emerald-400">{hasOutlier ? '4.5 mins' : '4.0 mins'}</p>
                        <span className="text-[10px] text-emerald-400/80">Robust & stable metric</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Skewness Morphing Lab */}
                {currentSlide === 4 && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-mono">
                      <span className={distributionSkew < -0.2 ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                        Negative Skew (Mean &lt; Mode)
                      </span>
                      <span className={Math.abs(distributionSkew) <= 0.2 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                        Symmetric (Mean ≈ Mode)
                      </span>
                      <span className={distributionSkew > 0.2 ? 'text-indigo-400 font-bold' : 'text-slate-400'}>
                        Positive Skew (Mean &gt; Mode)
                      </span>
                    </div>

                    <svg viewBox="0 0 400 160" className="w-full bg-slate-900/60 rounded-xl border border-slate-800">
                      <path
                        d={`M 40 140 C ${160 + distributionSkew * 100} 140, ${200 + distributionSkew * 60} 20, 360 140`}
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth={3}
                      />
                      <line x1={200 + distributionSkew * 70} y1="30" x2={200 + distributionSkew * 70} y2="140" stroke="#f43f5e" strokeWidth={2} strokeDasharray="3 3" />
                      <text x={190 + distributionSkew * 70} y="25" fill="#f43f5e" fontSize="10">Mean</text>

                      <line x1="200" y1="30" x2="200" y2="140" stroke="#22c55e" strokeWidth={2} />
                      <text x="190" y="155" fill="#22c55e" fontSize="10">Mode</text>
                    </svg>

                    <input
                      type="range"
                      min={-1}
                      max={1}
                      step={0.05}
                      value={distributionSkew}
                      onChange={(e) => handleSkewChange(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                      aria-label="Set distribution skewness"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* PREDICT-THEN-CHECK & OBSERVATION HOOKS */}
          {currentSlide === 0 && !predictionMade && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-900 rounded-xl border border-indigo-800/50 space-y-3">
              <h4 className="text-sm font-bold text-indigo-300">🎯 {PREDICTION_QUESTIONS[0].question}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePrediction(i)}
                    className="text-left p-2.5 bg-slate-800 text-slate-200 text-xs rounded-lg hover:bg-slate-700"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {currentSlide === 4 && !observationAnswered && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-900 rounded-xl border border-emerald-800/50 space-y-3">
              <h4 className="text-sm font-bold text-emerald-300">👁️ Observation Check: {OBSERVATION_QUESTIONS[0].question}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleObservation(i)}
                    className="text-left p-2.5 bg-slate-800 text-slate-200 text-xs rounded-lg hover:bg-slate-700"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Slide Navigation */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-mono">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-5 py-2 bg-indigo-600 text-white text-xs rounded-xl font-bold shadow-md shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 text-white text-xs rounded-xl font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── SANDBOX PHASE ────────────────────────────────────────��────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-indigo-300">Free Quantitative Modeling Sandbox</h3>
                <p className="text-xs text-slate-400">Manipulate both the Calculus Engine and Statistical Merger with no grading.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Ready for Graded Challenges →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Sandbox Panel 1: Polynomial Calculus */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-indigo-400">Calculus Power Engine: f(x) = a · xⁿ</h4>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-400">Coefficient a: {sandboxPolyA}</label>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={sandboxPolyA}
                      onChange={(e) => setSandboxPolyA(parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-400">Power n: {sandboxPolyPower}</label>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={sandboxPolyPower}
                      onChange={(e) => setSandboxPolyPower(parseInt(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono space-y-1">
                  <p className="text-slate-300">Function: f(x) = {sandboxPolyA}x^{sandboxPolyPower}</p>
                  <p className="text-emerald-400 font-bold">
                    Derivative f\'(x) = {sandboxPolyA * sandboxPolyPower}x^{sandboxPolyPower - 1}
                  </p>
                </div>
              </div>

              {/* Sandbox Panel 2: Combined Group Mean */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-emerald-400">Combined Statistics Merger</h4>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                  <div>
                    <label>Group 1 Size: {sandboxGroupN1}</label>
                    <input
                      type="range"
                      min={5}
                      max={100}
                      value={sandboxGroupN1}
                      onChange={(e) => setSandboxGroupN1(parseInt(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <label>Group 1 Mean: {sandboxGroupMean1}</label>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={sandboxGroupMean1}
                      onChange={(e) => setSandboxGroupMean1(parseInt(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono">
                  <p className="text-slate-300">Weighted Combined Mean x̄c = (n₁x̄₁ + n₂x̄₂)/(n₁+n₂):</p>
                  <p className="text-emerald-400 text-base font-bold">{sandboxCombinedMean} units</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ───────────────────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 font-mono">Competency: {challenge.competencyLevel.toUpperCase()}</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Challenge Box */}
          <div
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md">
                Node: {challenge.nodeId}
              </span>
              <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wide">
                NEP 2020 Competency Target
              </span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">{challenge.question}</h3>

            {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`text-left p-3.5 rounded-xl text-xs md:text-sm transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/70 border-slate-700 text-slate-200 hover:bg-slate-800'
                      }`}
                      aria-label={`Option: ${opt}`}
                    >
                      <span className="font-mono text-indigo-400 mr-2">({String.fromCharCode(65 + i)})</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* TYPE 2: Drag Label */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag standard values:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((slotKey) => (
                    <div
                      key={slotKey}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(slotKey)}
                      className="p-3 bg-slate-800 rounded-xl border border-dashed border-slate-600 text-center text-xs"
                    >
                      <span className="text-slate-400 block mb-1">
                        {slotKey === 'slot_exp'
                          ? 'lim(x→0)(e^x-1)/x'
                          : slotKey === 'slot_cos'
                          ? 'lim(x→0)(1-cos x)/x²'
                          : slotKey === 'slot_alg'
                          ? 'lim(x→a)(x^n-a^n)/(x-a)'
                          : 'lim(x→0)ln(1+x)/x'}
                      </span>
                      <span className="font-mono font-bold text-emerald-400">{droppedLabels[slotKey] || '[ Drop Value Here ]'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {/* TYPE 3: Drag Sort */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3]).map((itemIdx, displayPos) => (
                  <motion.div
                    key={displayPos}
                    draggable
                    onDragStart={() => setDraggedItem(displayPos.toString())}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromPos = parseInt(draggedItem || '0');
                      handleSortMove(fromPos, displayPos);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-xl text-xs flex items-center gap-3 cursor-grab border border-slate-700"
                  >
                    <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 font-mono flex items-center justify-center font-bold">
                      {displayPos + 1}
                    </span>
                    <span className="text-slate-200">{challenge.sortItems![itemIdx]}</span>
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Check Step Sequence →
                </motion.button>
              </div>
            )}

            {/* TYPE 4: Numeric */}
            {challenge.type === 'numeric' && (
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step="0.01"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter exact numerical value"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
                />
                <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold disabled:opacity-50"
                >
                  Submit Metric →
                </motion.button>
              </div>
            )}

            {/* TYPE 5: Construct */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 text-indigo-300 text-xs rounded-lg border border-slate-700 hover:bg-slate-700 font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex items-center gap-2 flex-wrap">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-indigo-900/60 text-indigo-200 text-xs rounded-md font-mono border border-indigo-700">
                      {part}
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click blocks to construct expression</span>}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0 || showExplanation}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                  >
                    Validate Expression →
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setConstructParts([])}
                    className="px-3 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs"
                  >
                    Clear
                  </motion.button>
                </div>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-amber-950/30 border border-amber-800/60 rounded-xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step-by-step Mathematical Derivation:</span>
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-slate-200 leading-relaxed">
                      <span className="font-mono text-amber-400 mr-1">[{i + 1}]</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-amber-700/80 text-white text-xs font-bold rounded-lg"
                    >
                      Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment →' : 'Continue to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE ──────────────────────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/80 to-slate-900 rounded-2xl border border-indigo-700 shadow-xl space-y-4 text-center">
            <h2 className="text-2xl md:text-3xl font-black text-white">Simulation Completed!</h2>
            
            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <div className="p-3 bg-indigo-900/40 rounded-xl border border-indigo-500/40 max-w-md mx-auto">
              <span className="text-sm md:text-base font-black text-amber-300">
                {getMotivationalFeedback(errors)}
              </span>
            </div>

            <div className="flex justify-center gap-6">
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400">Final Score</span>
                <p className="text-3xl font-mono font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400">Mastery Level</span>
                <p className="text-2xl font-mono font-bold text-indigo-400 capitalize">{masteryLevel}</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              {errors === 0
                ? '🌟 Flawless quantitative performance! You have thoroughly mastered Class 11 Applied Calculus & Statistical Distribution dynamics.'
                : errors <= 3
                ? 'Great analytical proficiency! Review the targeted misconceptions below to lock in complete syllabus mastery.'
                : 'Good progressive effort! Re-explore the visual limit secant and skewness labs to solidify these foundational concepts.'}
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-indigo-800/50 space-y-4">
            <h3 className="text-base md:text-lg font-bold text-indigo-300 flex items-center gap-2">
              🤔 Post-Simulation Reflection
            </h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  1. What was the most surprising thing you learned?
                </label>
                <input
                  type="text"
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. How 0/0 is an indeterminate signal revealing hidden tangent slopes..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  2. How would you explain this to a friend?
                </label>
                <input
                  type="text"
                  value={reflectionAnswers.explain}
                  onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. Calculus zooms in on velocity while statistics captures consistency and skew..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-200">
                  3. Where in real life might you use this?
                </label>
                <input
                  type="text"
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. Metro passenger delay monitoring and algorithmic stock volatility profiling..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Targeted Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                🎯 Targeted Misconception Diagnostics
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const item = misconceptions?.[idx];
                if (!item) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">❌ {item.misconception}</p>
                    <p className="text-emerald-400">✓ {item.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
            <div>
              <span className="text-slate-400 block">SM-2 Spaced Repetition Schedule:</span>
              <span className="text-indigo-300 font-semibold">
                Scheduled review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </span>
            </div>
            <span className="text-emerald-400 font-mono font-bold">SM-2 Active</span>
          </div>

          {/* Real World Activity Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-indigo-300">📊 {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-lg text-xs text-slate-300 border border-slate-800/80">
                  <span className="text-indigo-400 font-mono mr-2">0{i + 1}.</span> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION ENGINE NOTIFICATIONS ───────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Benchmark Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_AppliedMathsLimitsAlgebraicTrigonometricSim;
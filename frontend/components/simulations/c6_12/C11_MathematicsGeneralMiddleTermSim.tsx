'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C11_MATH_062 = 'c11_math_062';
const NODE_C11_MATH_063 = 'c11_math_063';
const NODE_C11_MATH_064 = 'c11_math_064';
const NODE_C11_MATH_065 = 'c11_math_065';
const NODE_C11_MATH_066 = 'c11_math_066';
const NODE_C11_MATH_067 = 'c11_math_067';
const NODE_C11_MATH_068 = 'c11_math_068';
const NODE_C11_MATH_069 = 'c11_math_069';
const NODE_C11_MATH_070 = 'c11_math_070';
const NODE_C11_MATH_071 = 'c11_math_071';

const ALL_NODE_IDS = [
  NODE_C11_MATH_062,
  NODE_C11_MATH_063,
  NODE_C11_MATH_064,
  NODE_C11_MATH_065,
  NODE_C11_MATH_066,
  NODE_C11_MATH_067,
  NODE_C11_MATH_068,
  NODE_C11_MATH_069,
  NODE_C11_MATH_070,
  NODE_C11_MATH_071
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The ISRO Satellite Trajectory & Data Pipeline Lab',
  intro: 'You are a mission flight dynamics and mathematical modeling engineer at ISRO headquarters in Bengaluru. You are calibrating the telemetry algorithms for the Chandrayaan & Aditya orbital paths.',
  context: 'From power series expansions of gravitational perturbation (Binomial Theorem), sensor calibration sequences (AP, GP, Infinite Series, AM-GM), to laser telemetry line alignments in shifting coordinate frames (Straight Lines & Slopes), your mathematical precision ensures orbit insertion success.'
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In the binomial trajectory expansion of (x + 2y)^6, an engineer needs the single central middle term. What is the power of (2y) and its numerical coefficient factor?',
  options: [
    'Term 3 with k = 3 giving 20 · (2y)³ = 160 x³ y³',
    'Term 4 with k = 3 giving 20 · (2y)³ = 160 x³ y³',
    'Term 4 with k = 4 giving 15 · (2y)⁴ = 240 x² y⁴',
    'Term 3 with k = 2 giving 15 · (2y)² = 60 x⁴ y²'
  ],
  correctIndex: 1,
  hintAfter: 'Remember: (x + y)⁶ has n + 1 = 7 terms! The 4th term is the exact middle, where index k = term number - 1 = 3.'
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

// ─── 24 PROGRESSIVE CHALLENGES (NEP 2020 & CISCE Standards) ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1-8)
  {
    id: 'ch_f01',
    nodeId: NODE_C11_MATH_062,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the binomial expansion of (x + y)^n, what is the formula for the general (k+1)-th term T(k+1)?',
    options: [
      'T(k+1) = nCk · x^(n-k) · y^k',
      'T(k+1) = nCk · x^k · y^(n-k)',
      'T(k+1) = nC(k+1) · x^(n-k) · y^k',
      'T(k+1) = nCk · x^(n-k+1) · y^(k-1)'
    ],
    correctIndex: 0,
    explanation: 'The standard general term formula is T(k+1) = nCk · x^(n-k) · y^k. Here k is one less than the term number, and the sum of exponents (n - k) + k = n.',
    hints: [
      'Look at the first term T1 where k = 0: it is nC0 · x^n · y^0.',
      'The term number is (k + 1), so k is the power of the second term y.',
      'Formula: T(k+1) = nCk · x^(n-k) · y^k.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_f02',
    nodeId: NODE_C11_MATH_063,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'An antenna ping interval follows an A.P. with first term a = 7 and common difference d = 3. What is the 10th term T10?',
    options: ['34', '37', '40', '31'],
    correctIndex: 0,
    explanation: 'Using Tn = a + (n - 1)d, we have T10 = 7 + (10 - 1) · 3 = 7 + 9 · 3 = 7 + 27 = 34.',
    hints: [
      'Recall the general term formula for AP: Tn = a + (n - 1)d.',
      'Here a = 7, d = 3, and n = 10.',
      'T10 = 7 + 9 × 3 = 34.'
    ]
  },
  {
    id: 'ch_f03',
    nodeId: NODE_C11_MATH_064,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Calculate the single Arithmetic Mean (A.M.) between telemetry voltages 14 V and 38 V.',
    correctAnswer: 26,
    tolerance: 0.1,
    unit: 'V',
    explanation: 'The Arithmetic Mean of two numbers a and c is (a + c) / 2 = (14 + 38) / 2 = 52 / 2 = 26.',
    hints: [
      'The arithmetic mean b between a and c satisfies 2b = a + c.',
      'Add the two numbers: 14 + 38 = 52.',
      'Divide by 2: 52 / 2 = 26.'
    ]
  },
  {
    id: 'ch_f04',
    nodeId: NODE_C11_MATH_065,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For a Geometric Progression with first term a = 5 and common ratio r = 2, what is the 5th term T5?',
    options: ['80', '160', '40', '320'],
    correctIndex: 0,
    explanation: 'The general term of a GP is Tn = a · r^(n-1). For n = 5, T5 = 5 · 2^(5-1) = 5 · 2⁴ = 5 · 16 = 80.',
    hints: [
      'The exponent of r is (n - 1), not n.',
      'Calculate 2^(5 - 1) = 2⁴ = 16.',
      'Multiply: 5 × 16 = 80.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_f05',
    nodeId: NODE_C11_MATH_066,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Under what precise mathematical condition does an infinite Geometric Series a + ar + ar² + ... converge to a finite sum S_inf = a / (1 - r)?',
    options: ['|r| < 1', '|r| ≤ 1', 'r > 0', 'r ≠ 1'],
    correctIndex: 0,
    explanation: 'The infinite GP sum formula S_inf = a / (1 - r) is valid strictly when |r| < 1, because r^n → 0 as n → ∞ only when the magnitude of r is strictly less than 1.',
    hints: [
      'Think about what happens to r^n when |r| ≥ 1: it does not vanish!',
      'For convergence, each successive term must shrink in magnitude towards zero.',
      'The gatekeeper condition is |r| < 1.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_f06',
    nodeId: NODE_C11_MATH_069,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each coordinate transformation rule and property to its corresponding geometry label.',
    dragItems: [
      { label: 'X = x - h, Y = y - k', targetId: 'shift_rule' },
      { label: 'Area = 0', targetId: 'collinear_rule' },
      { label: '((mx2+nx1)/(m+n), (my2+ny1)/(m+n))', targetId: 'section_rule' },
      { label: 'm = tan(θ)', targetId: 'slope_rule' }
    ],
    correctMapping: {
      shift_rule: 'X = x - h, Y = y - k',
      collinear_rule: 'Area = 0',
      section_rule: '((mx2+nx1)/(m+n), (my2+ny1)/(m+n))',
      slope_rule: 'm = tan(θ)'
    },
    explanation: 'Shifting the origin to (h, k) yields X = x - h, Y = y - k. Collinear points enclose zero triangle area. Internal division uses the section formula, and slope is the tangent of inclination.',
    hints: [
      'When the origin moves to (h, k), we subtract (h, k) from old coordinates.',
      'Collinear points form a triangle with zero area.',
      'Slope is rise over run = tan(θ).'
    ]
  },
  {
    id: 'ch_f07',
    nodeId: NODE_C11_MATH_070,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A sensor beacon line passes through P(2, 5) and Q(6, 17). What is the slope m of this line?',
    options: ['3', '4', '1/3', '12'],
    correctIndex: 0,
    explanation: 'm = (y2 - y1) / (x2 - x1) = (17 - 5) / (6 - 2) = 12 / 4 = 3.',
    hints: [
      'Slope formula is (y2 - y1) / (x2 - x1).',
      'y-difference = 17 - 5 = 12; x-difference = 6 - 2 = 4.',
      '12 / 4 = 3.'
    ]
  },
  {
    id: 'ch_f08',
    nodeId: NODE_C11_MATH_063,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Find the sum of the first 20 natural numbers using Sn = n(n+1)/2.',
    correctAnswer: 210,
    tolerance: 0.1,
    unit: '',
    explanation: 'S20 = 20 × (20 + 1) / 2 = 20 × 21 / 2 = 210.',
    hints: [
      'Use the AP sum formula Sn = n(a + l)/2 where a=1, l=20, n=20.',
      'Compute 20 × 21 / 2.',
      'Answer is 210.'
    ]
  },

  // Standard Tier (9-16)
  {
    id: 'ch_s09',
    nodeId: NODE_C11_MATH_062,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In the payload vibration expansion (x + 2)^8, find the numerical coefficient of the x⁵ term.',
    correctAnswer: 448,
    tolerance: 0.1,
    unit: '',
    explanation: 'In (x + 2)⁸, Tk+1 = 8Ck · x^(8-k) · 2^k. For x⁵, 8 - k = 5 ⇒ k = 3. Coefficient = 8C3 · 2³ = 56 · 8 = 448.',
    hints: [
      'Set the power of x to 5: 8 - k = 5, which gives k = 3.',
      'Calculate 8C3 = (8 × 7 × 6) / (3 × 2 × 1) = 56.',
      'Multiply by 2³ = 8: 56 × 8 = 448.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_s10',
    nodeId: NODE_C11_MATH_063,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Three solar array outputs are in A.P. Their sum is 27 and their product is 504. Using the symmetric representation (a - d, a, a + d), what are the three values?',
    options: ['4, 9, 14', '3, 9, 15', '5, 9, 13', '2, 9, 16'],
    correctIndex: 0,
    explanation: 'Sum = 3a = 27 ⇒ a = 9. Product = a(a² - d²) = 9(81 - d²) = 504 ⇒ 81 - d² = 56 ⇒ d² = 25 ⇒ d = 5. The terms are 9 - 5 = 4, 9, 9 + 5 = 14.',
    hints: [
      'With (a - d, a, a + d), the sum is 3a = 27, so a = 9 immediately.',
      'The product is 9(81 - d²) = 504, giving 81 - d² = 56.',
      'd² = 25, so d = 5. Terms: 4, 9, 14.'
    ]
  },
  {
    id: 'ch_s11',
    nodeId: NODE_C11_MATH_064,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of 3 inserted arithmetic means between 5 and 29 in ascending order.',
    sortItems: ['11', '17', '23'],
    correctOrder: [0, 1, 2],
    explanation: 'Inserting n = 3 means between a = 5 and l = 29 gives step d = (29 - 5)/(3 + 1) = 24/4 = 6. The inserted means are 5 + 6 = 11, 5 + 12 = 17, and 5 + 18 = 23.',
    hints: [
      'Number of steps is n + 1 = 3 + 1 = 4 steps.',
      'Common difference d = (29 - 5) / 4 = 6.',
      'Means are 5+6=11, 11+6=17, 17+6=23.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_s12',
    nodeId: NODE_C11_MATH_066,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Convert the repeating radar signal timestamp 0.272727... (0.27 recurring) to a simplified fraction a/b. Enter the denominator b when numerator a = 3.',
    correctAnswer: 11,
    tolerance: 0.1,
    unit: '',
    explanation: '0.2727... = 0.27 + 0.0027 + ... = 0.27 / (1 - 0.01) = 0.27 / 0.99 = 27 / 99 = 3 / 11. Hence when numerator is 3, denominator b = 11.',
    hints: [
      'Write as infinite GP: a = 0.27, r = 0.01.',
      'S_inf = 0.27 / (1 - 0.01) = 27 / 99.',
      'Divide top and bottom by 9: 27/99 = 3/11.'
    ]
  },
  {
    id: 'ch_s13',
    nodeId: NODE_C11_MATH_067,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'For two positive thruster efficiency ratings a = 4 and b = 16, verify the AM-GM relationship. What are A.M. and G.M. respectively?',
    options: [
      'A.M. = 10, G.M. = 8 (confirming A.M. > G.M.)',
      'A.M. = 8, G.M. = 10 (violating A.M. ≥ G.M.)',
      'A.M. = 10, G.M. = 10 (equality since 16 = 4²)',
      'A.M. = 12, G.M. = 8 (confirming A.M. > G.M.)'
    ],
    correctIndex: 0,
    explanation: 'A.M. = (4 + 16) / 2 = 20 / 2 = 10. G.M. = √(4 · 16) = √64 = 8. Since a ≠ b, A.M. (10) is strictly greater than G.M. (8).',
    hints: [
      'Arithmetic Mean = (a + b) / 2 = 20 / 2 = 10.',
      'Geometric Mean = √(a · b) = √64 = 8.',
      '10 > 8, which satisfies the AM-GM theorem.'
    ]
  },
  {
    id: 'ch_s14',
    nodeId: NODE_C11_MATH_068,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Using the special sum formula Σn² = n(n+1)(2n+1)/6, evaluate the sum of squares of the first 10 integers (1² + 2² + ... + 10²).',
    correctAnswer: 385,
    tolerance: 0.1,
    unit: '',
    explanation: 'Σn² for n = 10 is 10 · 11 · (2·10 + 1) / 6 = 10 · 11 · 21 / 6 = 2310 / 6 = 385.',
    hints: [
      'Substitute n = 10 into n(n + 1)(2n + 1) / 6.',
      'Numerator: 10 × 11 × 21 = 2310.',
      'Divide by 6: 2310 / 6 = 385.'
    ]
  },
  {
    id: 'ch_s15',
    nodeId: NODE_C11_MATH_070,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the acute angle θ between two radar tracking tracks with slopes m1 = 2 and m2 = -3.',
    options: ['45°', '30°', '60°', '90°'],
    correctIndex: 0,
    explanation: 'tan(θ) = |(m1 - m2) / (1 + m1·m2)| = |(2 - (-3)) / (1 + 2(-3))| = |5 / (1 - 6)| = |5 / (-5)| = |-1| = 1. tan(θ) = 1 ⇒ θ = 45°.',
    hints: [
      'Use the angle formula tan(θ) = |(m1 - m2) / (1 + m1·m2)|.',
      'Numerator is |2 - (-3)| = 5; Denominator is 1 + (2)(-3) = 1 - 6 = -5.',
      'tan(θ) = |5 / -5| = 1 ⇒ θ = 45°.'
    ]
  },
  {
    id: 'ch_s16',
    nodeId: NODE_C11_MATH_071,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The optical path line 4x - ky + 9 = 0 is perpendicular to line 2x + 8y - 3 = 0. Find the exact value of parameter k.',
    correctAnswer: 1,
    tolerance: 0.05,
    unit: '',
    explanation: 'Slope m1 = -4/(-k) = 4/k. Slope m2 = -2/8 = -1/4. For perpendicular lines, m1 · m2 = -1 ⇒ (4/k) · (-1/4) = -1 ��� -1/k = -1 ⇒ k = 1.',
    hints: [
      'Extract slope of first line: m1 = 4/k.',
      'Extract slope of second line: m2 = -2/8 = -1/4.',
      'Set m1 · m2 = -1: (4/k) · (-1/4) = -1/k = -1, hence k = 1.'
    ]
  },

  // Advanced Tier (17-24)
  {
    id: 'ch_a17',
    nodeId: NODE_C11_MATH_062,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In the satellite orbital expansion (2x² + 3/x³)¹⁰, find the term independent of x (the constant term).',
    options: ['1088640', '544320', '272160', 'No constant term exists'],
    correctIndex: 0,
    explanation: 'General term Tk+1 = 10Ck · (2x²)^(10-k) · (3/x³)^k = 10Ck · 2^(10-k) · 3^k · x^(20 - 2k - 3k) = 10Ck · 2^(10-k) · 3^k · x^(20 - 5k). For x⁰: 20 - 5k = 0 ⇒ k = 4 (an integer!). Term = 10C4 · 2⁶ · 3⁴ = 210 · 64 · 81 = 1,088,640.',
    hints: [
      'Combine exponents of x: (x²)^(10-k) · (x⁻³)^k = x^(20 - 5k).',
      'For constant term, set 20 - 5k = 0, giving k = 4.',
      'Calculate 10C4 × 2⁶ × 3⁴ = 210 × 64 × 81 = 1,088,640.'
    ]
  },
  {
    id: 'ch_a18',
    nodeId: NODE_C11_MATH_065,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Three sensor calibration readings form a G.P. Their product is 216 and their sum is 26. Using the symmetric representation a/r, a, ar, what are the readings?',
    options: ['2, 6, 18', '3, 6, 12', '1, 6, 36', '4, 6, 16'],
    correctIndex: 0,
    explanation: 'Product = (a/r) · a · (ar) = a³ = 216 ⇒ a = 6. Sum = 6(1/r + 1 + r) = 26 ⇒ 1/r + r = 20/6 = 10/3. 3r² - 10r + 3 = 0 ⇒ (3r - 1)(r - 3) = 0 ⇒ r = 3 or 1/3. The terms are 2, 6, 18.',
    hints: [
      'In symmetric GP, product = a³ = 216, giving the middle term a = 6 instantly.',
      'Substitute a into the sum: 6/r + 6 + 6r = 26 ⇒ 1/r + r = 10/3.',
      'Multiply by 3r to get 3r² - 10r + 3 = 0, which factors to r = 3 or 1/3.'
    ]
  },
  {
    id: 'ch_a19',
    nodeId: NODE_C11_MATH_067,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the minimum possible power consumption of an amplifier module given by P(x) = 9x + 16/x for x > 0 using the AM-GM inequality.',
    options: ['24 Watts at x = 4/3', '25 Watts at x = 1', '12 Watts at x = 2/3', '48 Watts at x = 4/3'],
    correctIndex: 0,
    explanation: 'By AM-GM on positive terms 9x and 16/x: (9x + 16/x)/2 ≥ √(9x · 16/x) = √(144) = 12. Thus 9x + 16/x ≥ 24. Equality occurs when 9x = 16/x ⇒ x² = 16/9 ⇒ x = 4/3.',
    hints: [
      'Apply AM-GM: (a + b)/2 ≥ √(ab) where a = 9x and b = 16/x.',
      'Notice that the variable x cancels in the product: 9x · (16/x) = 144.',
      'Min value = 2 × √144 = 2 × 12 = 24. Equality at 9x = 16/x ⇒ x = 4/3.'
    ]
  },
  {
    id: 'ch_a20',
    nodeId: NODE_C11_MATH_068,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A telemetry packet series has values 5, 12, 25, 44, 69, 100... Using the method of differences (1st diff: 7, 13, 19, 25...; 2nd diff: 6, 6, 6...), determine the formula for Tn.',
    options: ['Tn = 3n² - 2n + 4', 'Tn = 3n² + 4n - 2', 'Tn = 2n² + 3n', 'Tn = 6n² - 7n + 6'],
    correctIndex: 0,
    explanation: 'a = 5, d1 = 7, d2 = 6. Tn = a + (n-1)d1 + [(n-1)(n-2)/2] · d2 = 5 + 7(n-1) + 3(n² - 3n + 2) = 5 + 7n - 7 + 3n² - 9n + 6 = 3n² - 2n + 4.',
    hints: [
      'Second differences are constant d2 = 6, so Tn is quadratic.',
      'Use reconstruction: Tn = a + (n-1)d1 + [(n-1)(n-2)/2]d2.',
      'Substitute a = 5, d1 = 7, d2 = 6: 5 + 7n - 7 + 3(n² - 3n + 2) = 3n² - 2n + 4.'
    ]
  },
  {
    id: 'ch_a21',
    nodeId: NODE_C11_MATH_069,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'The origin of a ground station coordinate frame is translated to (h, k) = (4, -3). If a space probe is at old coordinates (x, y) = (-2, 7), find its new Y-coordinate.',
    correctAnswer: 10,
    tolerance: 0.1,
    unit: '',
    explanation: 'New coordinates are given by X = x - h and Y = y - k. Here Y = 7 - (-3) = 7 + 3 = 10.',
    hints: [
      'Remember the translation formula: Y = y - k.',
      'Old y = 7, and k = -3.',
      'Y = 7 - (-3) = 7 + 3 = 10.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_a22',
    nodeId: NODE_C11_MATH_071,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the equation condition proving three points A(1, 2), B(3, 6), and C(5, 10) are collinear using their pairwise segment slopes.',
    availableParts: ['m_AB = 2', 'm_BC = 2', 'm_AC = 2', 'm_AB · m_BC = -1', 'm_AB + m_BC = 0'],
    targetState: 'm_AB = 2 m_BC = 2 m_AC = 2',
    validationHint: 'Select all three equal slope segments that demonstrate collinearity.',
    explanation: 'm_AB = (6-2)/(3-1) = 2, m_BC = (10-6)/(5-3) = 2, m_AC = (10-2)/(5-1) = 2. Since all slopes are equal and share common vertices, points A, B, and C are collinear.',
    hints: [
      'Compute slope AB: (6 - 2)/(3 - 1) = 2.',
      'Compute slope BC: (10 - 6)/(5 - 3) = 2.',
      'Equal slopes through a common point establish collinearity.'
    ]
  },
  {
    id: 'ch_a23',
    nodeId: NODE_C11_MATH_068,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the identity Σ(2n - 1) for the sum of the first n odd positive integers. Which closed-form expression is mathematically proven by Σ(2n - 1) = 2Σn - Σ1?',
    options: ['n²', 'n(n + 1)', 'n² + n', '2n² - n'],
    correctIndex: 0,
    explanation: 'Σ(2n - 1) = 2Σn - Σ1 = 2 · [n(n+1)/2] - n = n(n+1) - n = n² + n - n = n². Thus the sum of the first n odd numbers is always n².',
    hints: [
      'Use linearity: Σ(2n - 1) = 2Σn - Σ1.',
      'Substitute Σn = n(n+1)/2 and Σ1 = n.',
      '2 · [n(n+1)/2] - n = n(n+1) - n = n².'
    ]
  },
  {
    id: 'ch_a24',
    nodeId: NODE_C11_MATH_062,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Find the greatest binomial coefficient in the expansion of (1 + x)^12.',
    correctAnswer: 924,
    tolerance: 0.1,
    unit: '',
    explanation: 'For even index n = 12, the maximum binomial coefficient is nC(n/2) = 12C6 = (12 × 11 × 10 × 9 × 8 × 7) / (6 × 5 × 4 × 3 × 2 × 1) = 924.',
    hints: [
      'For even n, the peak coefficient is at k = n/2.',
      'Calculate 12C6.',
      '12C6 = 924.'
    ]
  }
];

// ─── PROPS & DEFAULTS ───
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
  nodeId: NODE_C11_MATH_062,
  title: 'ISC Class 11 Mathematics: Binomials, Progressions, Special Sums & Coordinate Lines',
  definition: 'Comprehensive mastery of binomial term selection, arithmetic & geometric progressions, infinite series convergence, AM-GM optimization, polynomial difference summation, and coordinate line kinematics.',
  eli5: 'Think of this as your mathematical flight control center: jump straight to any term in big algebraic powers, find hidden patterns in number ladders, discover why averages always beat products, and steer straight lines across shifting radar grids.',
  misconceptions: [
    {
      misconception: 'The 4th term in binomial expansion means k = 4.',
      correction: 'The term number is (k + 1), so the 4th term corresponds to k = 3. Always subtract 1 from the term number.'
    },
    {
      misconception: 'In a G.P., the nth term is Tn = a · r^n.',
      correction: 'The first term has no ratio multiplied (n=1 gives r⁰), so Tn = a · r^(n-1).'
    },
    {
      misconception: 'The infinite GP sum a / (1 - r) works for any ratio r.',
      correction: 'It is strictly valid only when |r| < 1. If |r| ≥ 1, the series diverges and has no finite sum.'
    },
    {
      misconception: 'When inserting n arithmetic means, common difference is (l - a)/n.',
      correction: 'Inserting n means creates (n + 2) total terms, so there are (n + 1) intervals: d = (l - a)/(n + 1).'
    },
    {
      misconception: 'Shifting the origin to (h, k) adds h and k to the old coordinates.',
      correction: 'The frame moves to (h, k), so the new coordinates of a fixed point are X = x - h and Y = y - k.'
    }
  ],
  diagnosticQuestions: [
    { question: 'What is the index k for the 6th term of (a + b)^9?', options: ['k = 5', 'k = 6', 'k = 4', 'k = 9'], correctIndex: 0 },
    { question: 'What is the sum of 1 + 2 + 3 + ... + 20?', options: ['210', '200', '190', '420'], correctIndex: 0 },
    { question: 'What is the Geometric Mean of 9 and 25?', options: ['15', '17', '225', '16'], correctIndex: 0 },
    { question: 'If two lines are perpendicular, what is the product of their slopes?', options: ['-1', '0', '1', 'Undefined'], correctIndex: 0 },
    { question: 'What is 1² + 2² + 3² + 4²?', options: ['30', '25', '36', '20'], correctIndex: 0 },
    { question: 'If origin shifts to (3, 2), what are the new coordinates of (7, 9)?', options: ['(4, 7)', '(10, 11)', '(4, 11)', '(10, 7)'], correctIndex: 0 },
    { question: 'What is the sum to infinity of 1 + 1/2 + 1/4 + 1/8 + ...?', options: ['2', '1.5', 'Infinity', '0.5'], correctIndex: 0 },
    { question: 'Lines y = 3x + 1 and y = 3x - 8 are:', options: ['Parallel', 'Perpendicular', 'Intersecting at 45°', 'Coincident'], correctIndex: 0 }
  ],
  masteryCriteria: 'Master general binomial terms, AP/GP sequences, infinite convergence, AM-GM inequalities, method of differences, origin translation, and slope orthogonality.'
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Binomial Term & Middle Term Inspector',
    instruction: 'Adjust binomial power n and term index k. Watch the binomial coefficient nCk and term powers update in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_MATH_062
  },
  {
    title: 'Lab 2: AP vs GP Growth Dynamics & Progression Ladders',
    instruction: 'Compare linear step additions (AP) against multiplicative exponential scaling (GP). Toggle common difference d and ratio r.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_MATH_065
  },
  {
    title: 'Lab 3: The Geometric AM-GM Visual Proof',
    instruction: 'Drag dimensions a and b. Compare the area of the rectangle (a × b) against the square of the arithmetic mean ((a+b)/2)²',
    interactionType: 'drag-position',
    nodeId: NODE_C11_MATH_067
  },
  {
    title: 'Lab 4: Coordinate Grid & Origin Shifting Frame',
    instruction: 'Translate the origin (h, k) across the radar display and observe how point (x, y) transforms into (X, Y) without moving.',
    interactionType: 'drag-classify',
    nodeId: NODE_C11_MATH_069
  },
  {
    title: 'Lab 5: Line Inclination, Slopes & Orthogonality Angle Arc',
    instruction: 'Rotate line slopes m1 and m2. Observe the acute angle θ, parallelism (m1 = m2), and perpendicularity (m1 · m2 = -1).',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_MATH_070
  }
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you expand (x + y)⁸, how many total terms will there be, and how many middle terms?',
    options: [
      '8 terms, 1 middle term',
      '9 terms, 1 middle term (the 5th term)',
      '9 terms, 2 middle terms (4th and 5th)',
      '8 terms, 2 middle terms'
    ],
    correctIndex: 1,
    verifyInstruction: 'Set binomial power n = 8 in Lab 1. Notice there are 8 + 1 = 9 total terms, with exactly one central term at k = 4 (the 5th term).',
    nodeId: NODE_C11_MATH_062
  },
  {
    question: 'Predict: For any two distinct positive real numbers a ≠ b, which average is strictly larger?',
    options: [
      'Arithmetic Mean (A.M.) is strictly greater than Geometric Mean (G.M.)',
      'Geometric Mean (G.M.) is strictly greater than Arithmetic Mean (A.M.)',
      'They are always identical',
      'It depends on whether the numbers are fractions or integers'
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust sliders in Lab 3 with unequal a and b. Notice the square of side A.M. always encloses a strictly larger area than the rectangle a × b!',
    nodeId: NODE_C11_MATH_067
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the product of slopes m1 · m2 when the angle between two lines is set to exactly 90° (perpendicular)?',
    observableOptions: [
      'The product m1 · m2 equals -1',
      'The product m1 · m2 equals 0',
      'The product m1 · m2 equals +1',
      'The sum m1 + m2 equals 0'
    ],
    correctIndex: 0,
    nodeId: NODE_C11_MATH_071
  },
  {
    question: 'In the infinite geometric series 1 + r + r² + ..., what happens when |r| is increased from 0.5 to 1.2?',
    observableOptions: [
      'The sum increases but stays finite',
      'The series stops converging and explodes to infinity with no finite sum',
      'The sum becomes negative',
      'The sum oscillates between 0 and 1'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_MATH_066
  }
];

// ─── REAL-WORLD APPLICATION ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Deep Space Laser Telemetry Calibration',
  description: 'Design a laser alignment relay for deep-space tracking. You have two tracking stations with transmitter lines L1: 3x - 4y + 12 = 0 and L2: 4x + 3y - 24 = 0.',
  steps: [
    'Extract slope m1 = 3/4 and slope m2 = -4/3 from the general line equations.',
    'Verify that m1 · m2 = (3/4) · (-4/3) = -1, proving the beams intersect at an exact 90° right-angle crosshair.',
    'Shift the ground control origin to the intersection point (h, k) = (2.4, 4.8) to simplify target tracking equations.',
    'Use the infinite GP pulse decay model P_total = P0 / (1 - r) with r = 0.8 to ensure received laser energy exceeds the 5-milliwatt detector threshold.'
  ]
};

// ─── HELPER: BINOMIAL COEFFICIENT ───
function getCombinations(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let c = 1;
  for (let i = 1; i <= k; i++) {
    c = (c * (n - (k - i))) / i;
  }
  return Math.round(c);
}

// ─── MAIN SIMULATION COMPONENT ───
export function C11_MathematicsGeneralMiddleTermSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase state: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-then-check & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Adaptive difficulty & scoring
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Drag & Sort & Input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection responses state
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Interactive Lab Sliders & Variables
  // Lab 1: Binomial
  const [binomialN, setBinomialN] = useState(6);
  const [binomialK, setBinomialK] = useState(3);
  const [binomialA, setBinomialA] = useState(1);
  const [binomialB, setBinomialB] = useState(2);

  // Lab 2: AP & GP
  const [apStart, setApStart] = useState(2);
  const [apDiff, setApDiff] = useState(3);
  const [gpStart, setGpStart] = useState(2);
  const [gpRatio, setGpRatio] = useState(2);
  const [ladderTerms, setLadderTerms] = useState(6);

  // Lab 3: AM-GM
  const [amGmA, setAmGmA] = useState(4);
  const [amGmB, setAmGmB] = useState(16);

  // Lab 4: Coordinate Shift
  const [originH, setOriginH] = useState(3);
  const [originK, setOriginK] = useState(2);
  const [pointX, setPointX] = useState(7);
  const [pointY, setPointY] = useState(8);

  // Lab 5: Slopes & Lines
  const [line1Slope, setLine1Slope] = useState(1);
  const [line2Slope, setLine2Slope] = useState(2);
  const [isPerpendicularLocked, setIsPerpendicularLocked] = useState(false);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM LOCAL STORAGE ───
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
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS ANIMATION LOOP ───
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

      // Radar Grid Line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();

      // Pulsing telemetry beam
      const pulse = (Math.sin(frame * 0.05) + 1) * 0.5;
      ctx.strokeStyle = `rgba(99, 102, 241, ${0.4 + pulse * 0.4})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 30 + pulse * 20, 0, Math.PI * 2);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── REAL-TIME CALCULATIONS ───
  const binomialCoeff = useMemo(() => getCombinations(binomialN, binomialK), [binomialN, binomialK]);
  const binomialTermValue = useMemo(() => {
    const coeff = getCombinations(binomialN, binomialK);
    const aPow = Math.pow(binomialA, binomialN - binomialK);
    const bPow = Math.pow(binomialB, binomialK);
    return coeff * aPow * bPow;
  }, [binomialN, binomialK, binomialA, binomialB]);

  const amValue = useMemo(() => (amGmA + amGmB) / 2, [amGmA, amGmB]);
  const gmValue = useMemo(() => Math.sqrt(amGmA * amGmB), [amGmA, amGmB]);

  const shiftedX = useMemo(() => pointX - originH, [pointX, originH]);
  const shiftedY = useMemo(() => pointY - originK, [pointY, originK]);

  const angleBetweenLinesDeg = useMemo(() => {
    const m1 = line1Slope;
    const m2 = line2Slope;
    const denom = 1 + m1 * m2;
    if (Math.abs(denom) < 0.001) return 90;
    const tanTheta = Math.abs((m1 - m2) / denom);
    return (Math.atan(tanTheta) * 180) / Math.PI;
  }, [line1Slope, line2Slope]);

  // ─── MOTIVATIONAL FEEDBACK CALCULATION ───
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return { title: 'PERFECT SCORE! 🏆', desc: 'Flawless mathematical execution! You have mastered ISC Class 11 sequences, binomials, and coordinate analysis with 100% precision.' };
    if (errors <= 3) return { title: 'Great work! 🌟', desc: 'Strong analytical skills demonstrated. With minor calibration on edge cases, your mathematical models will be rock solid.' };
    if (errors <= 7) return { title: 'Good effort! 🚀', desc: 'Good foundation shown! Review the misconception guides and re-verify intermediate algebraic steps.' };
    return { title: 'Do not give up — You WILL get this! 💪', desc: 'Every great mathematician learns through iterative refinement. Revisit the interactive labs and master the fundamentals.' };
  }, [errors]);

  // ─── SPACED REPETITION SCHEDULE ───
  const srsScheduleDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  // ─── USECALLBACK HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

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
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction! Let us explore the mechanics.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Explore each concept directly.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration unlocked. Test any parameters without time limits.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge sequence initiated. Apply your insights to solve each mission task.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now adjust the visual sliders to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp mathematical observation!' : 'Check the angle arc on the canvas again.');
  }, []);

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
  }, [sortArrangement, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mission simulation completed successfully. Excellent telemetry analysis!');
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
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Rigorous algebraic proof.');
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
        speechManager.speak('Review the step-by-step breakdown below.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50 shadow-inner" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-gold-400 font-medium">ISC Mathematics Class 11 · Core Mathematical Physics & Telemetry</p>
          </div>
        </div>

        {phase === 'challenge' && (
          <div className="flex items-center gap-3">
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/50'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950 text-rose-400 border border-rose-700/50'
                  : 'bg-gold-950 text-gold-400 border border-gold-700/50'
              }`}
            >
              {difficulty} Level
            </motion.span>
            <span className="text-xs text-slate-400 font-mono">
              Q{currentChallenge + 1}/{filteredChallenges.length}
            </span>
          </div>
        )}
      </motion.div>

      {/* ─── DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/50 shadow-xl">
            <h2 className="text-xl font-bold text-gold-300 mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-gold-900/40">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-300 rounded font-semibold">Discovery Probe</span>
              <p className="text-sm text-slate-400">Test your mathematical intuition before entering the labs:</p>
            </div>
            <p className="text-base font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 flex items-center justify-between'
                        : 'bg-slate-900 text-slate-500 border border-slate-800'
                      : 'bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700'
                  }`}
                >
                  <div>
                    <span className="text-xs font-mono mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </div>
                  {discoveryAnswered && (
                    <span className="ml-2 font-bold text-base">
                      {i === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗'}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! (n+1) = 7 terms, so the 4th term (k=3) is the exact middle.' : `👉 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter interactive laboratories"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl shadow-lg shadow-gold-600/30"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── EXPLORATION PHASE (Interactive Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">Interactive Concept Lab</span>
              <h2 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          <p className="text-sm text-amber-300 bg-amber-950/30 border border-amber-800/40 p-3 rounded-xl">
            ⚡ <strong>Mission Directive:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* DYNAMIC LAB VIEWPORT */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 min-h-[420px] flex flex-col justify-between">
            {/* LAB 1: BINOMIAL INSPECTOR */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-binomial-n" className="text-xs text-slate-400 block mb-1">Index Power (n): {binomialN}</label>
                    <input
                      id="range-binomial-n"
                      aria-label={`Binomial index power n: ${binomialN}`}
                      type="range"
                      min={2}
                      max={10}
                      value={binomialN}
                      onChange={e => {
                        const newN = Number(e.target.value);
                        setBinomialN(newN);
                        if (binomialK > newN) setBinomialK(newN);
                      }}
                      className="w-full accent-gold-500"
                    />
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-binomial-k" className="text-xs text-slate-400 block mb-1">Term Index (k): {binomialK} (Term T{binomialK + 1})</label>
                    <input
                      id="range-binomial-k"
                      aria-label={`Term index k: ${binomialK}`}
                      type="range"
                      min={0}
                      max={binomialN}
                      value={binomialK}
                      onChange={e => setBinomialK(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-binomial-a" className="text-xs text-slate-400 block mb-1">Coefficient a: {binomialA}</label>
                    <input
                      id="range-binomial-a"
                      aria-label={`Coefficient a: ${binomialA}`}
                      type="range"
                      min={1}
                      max={4}
                      value={binomialA}
                      onChange={e => setBinomialA(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-binomial-b" className="text-xs text-slate-400 block mb-1">Coefficient b: {binomialB}</label>
                    <input
                      id="range-binomial-b"
                      aria-label={`Coefficient b: ${binomialB}`}
                      type="range"
                      min={1}
                      max={4}
                      value={binomialB}
                      onChange={e => setBinomialB(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                </div>

                {/* VISUAL BINOMIAL TERM BAR GRAPH */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs font-mono text-slate-400 mb-2">Expansion Profile for ({binomialA}x + {binomialB}y)^{binomialN}:</p>
                  <div className="flex items-end gap-1.5 h-36 pt-4 px-2 border-b border-slate-800">
                    {Array.from({ length: binomialN + 1 }).map((_, idx) => {
                      const cVal = getCombinations(binomialN, idx);
                      const isMiddle = binomialN % 2 === 0
                        ? idx === binomialN / 2
                        : idx === (binomialN - 1) / 2 || idx === (binomialN + 1) / 2;
                      const isSelected = idx === binomialK;

                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                          <motion.div
                            animate={{ height: `${(cVal / getCombinations(binomialN, Math.floor(binomialN / 2))) * 100}%` }}
                            className={`w-full rounded-t transition-colors ${
                              isSelected
                                ? 'bg-gold-500 shadow-lg shadow-gold-500/50'
                                : isMiddle
                                ? 'bg-emerald-600/80'
                                : 'bg-slate-800'
                            }`}
                          />
                          <span className={`text-[10px] font-mono ${isSelected ? 'text-gold-300 font-bold' : 'text-slate-500'}`}>
                            k={idx}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 p-3 bg-gold-950/40 rounded-lg border border-gold-800/40 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="text-slate-400">Selected Term T({binomialK + 1}): </span>
                      <strong className="text-gold-300 font-mono">
                        {binomialCoeff} · ({binomialA}x)^{binomialN - binomialK} · ({binomialB}y)^{binomialK} = {binomialTermValue} x^{binomialN - binomialK} y^{binomialK}
                      </strong>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[11px] font-semibold">
                      {binomialN % 2 === 0 ? `1 Middle Term at k=${binomialN/2} (Term ${binomialN/2 + 1})` : `2 Middle Terms at k=${(binomialN-1)/2}, ${(binomialN+1)/2}`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: AP VS GP LADDER */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-ap-diff" className="text-xs text-slate-400 block mb-1">AP Common Diff (d): {apDiff}</label>
                    <input id="range-ap-diff" aria-label={`AP common difference: ${apDiff}`} type="range" min={1} max={8} value={apDiff} onChange={e => setApDiff(Number(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-gp-ratio" className="text-xs text-slate-400 block mb-1">GP Common Ratio (r): {gpRatio}</label>
                    <input id="range-gp-ratio" aria-label={`GP common ratio: ${gpRatio}`} type="range" min={1.5} max={3} step={0.5} value={gpRatio} onChange={e => setGpRatio(Number(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-ap-start" className="text-xs text-slate-400 block mb-1">Start Value (a): {apStart}</label>
                    <input id="range-ap-start" aria-label={`Progression starting value: ${apStart}`} type="range" min={1} max={5} value={apStart} onChange={e => { setApStart(Number(e.target.value)); setGpStart(Number(e.target.value)); }} className="w-full accent-gold-500" />
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-ladder-terms" className="text-xs text-slate-400 block mb-1">Terms: {ladderTerms}</label>
                    <input id="range-ladder-terms" aria-label={`Number of ladder terms: ${ladderTerms}`} type="range" min={3} max={7} value={ladderTerms} onChange={e => setLadderTerms(Number(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-gold-400">Arithmetic Ladder (+{apDiff} each step)</span>
                    <div className="mt-3 space-y-2">
                      {Array.from({ length: ladderTerms }).map((_, i) => {
                        const val = apStart + i * apDiff;
                        return (
                          <div key={i} className="flex items-center justify-between text-xs font-mono bg-slate-900 px-3 py-1.5 rounded">
                            <span className="text-slate-400">T{i+1}: a + {i}d</span>
                            <span className="text-gold-300 font-bold">{val}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400">Geometric Ladder (×{gpRatio} each step)</span>
                    <div className="mt-3 space-y-2">
                      {Array.from({ length: ladderTerms }).map((_, i) => {
                        const val = gpStart * Math.pow(gpRatio, i);
                        return (
                          <div key={i} className="flex items-center justify-between text-xs font-mono bg-slate-900 px-3 py-1.5 rounded">
                            <span className="text-slate-400">T{i+1}: a · r^{i}</span>
                            <span className="text-amber-300 font-bold">{val}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: AM-GM GEOMETRIC PROOF */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-am-a" className="text-xs text-slate-400 block mb-1">Dimension a: {amGmA}</label>
                    <input id="range-am-a" aria-label={`Dimension a for AM-GM: ${amGmA}`} type="range" min={1} max={25} value={amGmA} onChange={e => setAmGmA(Number(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-am-b" className="text-xs text-slate-400 block mb-1">Dimension b: {amGmB}</label>
                    <input id="range-am-b" aria-label={`Dimension b for AM-GM: ${amGmB}`} type="range" min={1} max={25} value={amGmB} onChange={e => setAmGmB(Number(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                </div>

                {/* SVG Visual Proof of AM >= GM */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-6">
                  <svg viewBox="0 0 280 180" className="w-64 h-44 bg-slate-900 rounded-lg p-2 border border-slate-800" aria-label="Visual proof rectangle vs square AM-GM">
                    {/* Rectangle area = a * b */}
                    <rect x="20" y="20" width={Math.min(100, amGmA * 6)} height={Math.min(100, amGmB * 6)} fill="#f59e0b" opacity="0.4" stroke="#f59e0b" strokeWidth="2" />
                    <text x="25" y="40" fill="#fef3c7" fontSize="10" fontWeight="bold">Rectangle (a × b)</text>
                    <text x="25" y="55" fill="#fef3c7" fontSize="9">Area = {amGmA * amGmB}</text>

                    {/* Square of side AM = (a+b)/2 */}
                    <rect x="140" y="20" width={Math.min(110, amValue * 6)} height={Math.min(110, amValue * 6)} fill="#6366f1" opacity="0.4" stroke="#6366f1" strokeWidth="2" />
                    <text x="145" y="40" fill="#e0e7ff" fontSize="10" fontWeight="bold">Square of side AM</text>
                    <text x="145" y="55" fill="#e0e7ff" fontSize="9">Area = {(amValue * amValue).toFixed(1)}</text>
                  </svg>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-3 bg-gold-950/60 border border-gold-800/60 rounded-lg">
                      <span className="text-gold-300 font-bold">Arithmetic Mean (AM): </span>
                      <span className="text-white">({amGmA} + {amGmB})/2 = {amValue.toFixed(2)}</span>
                    </div>
                    <div className="p-3 bg-amber-950/60 border border-amber-800/60 rounded-lg">
                      <span className="text-amber-300 font-bold">Geometric Mean (GM): </span>
                      <span className="text-white">√({amGmA} × {amGmB}) = {gmValue.toFixed(2)}</span>
                    </div>
                    <div className="p-2 bg-emerald-950/60 border border-emerald-800/60 rounded text-emerald-300 font-bold text-center">
                      AM - GM = {(amValue - gmValue).toFixed(2)} ≥ 0 {amGmA === amGmB ? '(EQUALITY: a = b)' : '(STRICT INEQUALITY)'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: ORIGIN SHIFTING */}
            {currentSlide === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-shift-h" className="text-xs text-slate-400 block mb-1">Shift h: {originH}</label>
                    <input id="range-shift-h" aria-label={`Origin translation x-offset h: ${originH}`} type="range" min={-5} max={5} value={originH} onChange={e => setOriginH(Number(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-shift-k" className="text-xs text-slate-400 block mb-1">Shift k: {originK}</label>
                    <input id="range-shift-k" aria-label={`Origin translation y-offset k: ${originK}`} type="range" min={-5} max={5} value={originK} onChange={e => setOriginK(Number(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-point-x" className="text-xs text-slate-400 block mb-1">Point x: {pointX}</label>
                    <input id="range-point-x" aria-label={`Fixed point x-coordinate: ${pointX}`} type="range" min={-8} max={8} value={pointX} onChange={e => setPointX(Number(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-point-y" className="text-xs text-slate-400 block mb-1">Point y: {pointY}</label>
                    <input id="range-point-y" aria-label={`Fixed point y-coordinate: ${pointY}`} type="range" min={-8} max={8} value={pointY} onChange={e => setPointY(Number(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-4">
                  <svg viewBox="0 0 300 200" className="w-72 h-48 bg-slate-900 rounded-lg border border-slate-800" aria-label="Coordinate translation graph">
                    {/* Old Origin O(0,0) axes */}
                    <line x1="150" y1="0" x2="150" y2="200" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="0" y1="100" x2="300" y2="100" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="150" cy="100" r="3" fill="#94a3b8" />
                    <text x="155" y="115" fill="#94a3b8" fontSize="9">O(0,0)</text>

                    {/* New Shifted Origin O'(h,k) axes */}
                    <line x1={150 + originH * 10} y1="0" x2={150 + originH * 10} y2="200" stroke="#6366f1" strokeWidth="1.5" />
                    <line x1="0" y1={100 - originK * 10} x2="300" y2={100 - originK * 10} stroke="#6366f1" strokeWidth="1.5" />
                    <circle cx={150 + originH * 10} cy={100 - originK * 10} r="4" fill="#6366f1" />
                    <text x={155 + originH * 10} y={115 - originK * 10} fill="#818cf8" fontSize="9" fontWeight="bold">O'({originH},{originK})</text>

                    {/* Fixed Point P */}
                    <circle cx={150 + pointX * 10} cy={100 - pointY * 10} r="5" fill="#f43f5e" />
                    <text x={155 + pointX * 10} y={95 - pointY * 10} fill="#f43f5e" fontSize="10" fontWeight="bold">P</text>
                  </svg>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-3 bg-slate-900 rounded border border-slate-800">
                      <span className="text-slate-400">Old Frame (x, y): </span>
                      <strong className="text-white">({pointX}, {pointY})</strong>
                    </div>
                    <div className="p-3 bg-gold-950/80 rounded border border-gold-800">
                      <span className="text-gold-300">New Frame X = x - h: </span>
                      <strong className="text-gold-200">{pointX} - ({originH}) = {shiftedX}</strong>
                      <br />
                      <span className="text-gold-300">New Frame Y = y - k: </span>
                      <strong className="text-gold-200">{pointY} - ({originK}) = {shiftedY}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: SLOPES & ORTHOGONALITY ARC */}
            {currentSlide === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-line1-slope" className="text-xs text-slate-400 block mb-1">Line 1 Slope (m1): {line1Slope.toFixed(2)}</label>
                    <input id="range-line1-slope" aria-label={`Line 1 slope m1: ${line1Slope}`} type="range" min={-4} max={4} step={0.25} value={line1Slope} onChange={e => setLine1Slope(Number(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label htmlFor="range-line2-slope" className="text-xs text-slate-400 block mb-1">Line 2 Slope (m2): {line2Slope.toFixed(2)}</label>
                    <input
                      id="range-line2-slope"
                      aria-label={`Line 2 slope m2: ${line2Slope}`}
                      type="range"
                      min={-4}
                      max={4}
                      step={0.25}
                      value={line2Slope}
                      onChange={e => {
                        setLine2Slope(Number(e.target.value));
                        setIsPerpendicularLocked(false);
                      }}
                      className="w-full accent-gold-500"
                    />
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-4">
                  <svg viewBox="0 0 300 200" className="w-72 h-48 bg-slate-900 rounded-lg border border-slate-800" aria-label="Line slope orthogonality arc">
                    {/* Coordinate axes */}
                    <line x1="150" y1="0" x2="150" y2="200" stroke="#334155" strokeWidth="1" />
                    <line x1="0" y1="100" x2="300" y2="100" stroke="#334155" strokeWidth="1" />

                    {/* Line 1 (Indigo) */}
                    <line
                      x1="0"
                      y1={100 + (150 * line1Slope)}
                      x2="300"
                      y2={100 - (150 * line1Slope)}
                      stroke="#818cf8"
                      strokeWidth="2"
                    />

                    {/* Line 2 (Amber) */}
                    <line
                      x1="0"
                      y1={100 + (150 * line2Slope)}
                      x2="300"
                      y2={100 - (150 * line2Slope)}
                      stroke="#fbbf24"
                      strokeWidth="2"
                    />

                    <circle cx="150" cy="100" r="4" fill="#f8fafc" />
                  </svg>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2 bg-slate-900 rounded border border-slate-800">
                      <span className="text-slate-400">Product m1 · m2: </span>
                      <strong className={`${Math.abs(line1Slope * line2Slope + 1) < 0.05 ? 'text-emerald-400' : 'text-slate-200'}`}>
                        {(line1Slope * line2Slope).toFixed(2)}
                      </strong>
                    </div>
                    <div className="p-2 bg-slate-900 rounded border border-slate-800">
                      <span className="text-slate-400">Acute Angle θ: </span>
                      <strong className="text-gold-300">{angleBetweenLinesDeg.toFixed(1)}°</strong>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        aria-label="Set lines parallel"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setLine2Slope(line1Slope);
                          setIsPerpendicularLocked(false);
                          audioManager.play('pop');
                        }}
                        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] rounded font-semibold text-slate-300"
                      >
                        Set Parallel (m1 = m2)
                      </motion.button>
                      <motion.button
                        aria-label="Set lines orthogonal at 90 degrees"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (line1Slope !== 0) {
                            setLine2Slope(-1 / line1Slope);
                            setIsPerpendicularLocked(true);
                            audioManager.play('pop');
                          }
                        }}
                        className="px-2.5 py-1.5 bg-gold-700 hover:bg-gold-600 text-[11px] rounded font-semibold text-white"
                      >
                        Set 90° Orthogonal
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB NAVIGATION FOOTER */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800">
              <motion.button
                aria-label="Previous lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
              >
                ← Previous Lab
              </motion.button>

              <div className="flex gap-1.5" role="tablist" aria-label="Laboratory selector">
                {EXPLORATION_STEPS.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={currentSlide === i}
                    aria-label={`Select Lab ${i + 1}`}
                    onClick={() => {
                      setCurrentSlide(i);
                      audioManager.play('tap');
                    }}
                    className={`h-2 rounded-full transition-all ${currentSlide === i ? 'w-6 bg-gold-500' : 'w-2 bg-slate-700'}`}
                  />
                ))}
              </div>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  aria-label="Next lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('tap');
                  }}
                  className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  aria-label="Proceed to sandbox"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
                >
                  Proceed to Sandbox →
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Free Exploration Mode</span>
                <h2 className="text-lg font-black text-white">Full Telemetry & Coordinate Sandbox</h2>
              </div>
              <motion.button
                aria-label="Ready for assessment challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 text-xs"
              >
                Ready for Assessment Challenges! →
              </motion.button>
            </div>
            <p className="text-xs text-slate-400">
              Manipulate all five mathematical dimensions simultaneously without evaluation pressure. Verify patterns before taking on graded challenges.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-xs font-bold text-gold-400 mb-2">Live Radar Scope (2D Canvas)</p>
                <canvas ref={canvasRef} width={280} height={160} className="w-full bg-slate-900 rounded-lg border border-slate-800" aria-label="Interactive radar scope canvas animation" />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs font-mono">
                <p className="font-bold text-amber-400">Live Equation Status:</p>
                <div className="p-2 bg-slate-900 rounded">
                  <span className="text-slate-400">Binomial Center Term: </span>
                  <span className="text-gold-300">T{binomialK + 1} = {binomialTermValue} x^{binomialN - binomialK} y^{binomialK}</span>
                </div>
                <div className="p-2 bg-slate-900 rounded">
                  <span className="text-slate-400">AM vs GM: </span>
                  <span className="text-emerald-300">{amValue.toFixed(2)} ≥ {gmValue.toFixed(2)}</span>
                </div>
                <div className="p-2 bg-slate-900 rounded">
                  <span className="text-slate-400">Line Orthogonality: </span>
                  <span className={Math.abs(line1Slope * line2Slope + 1) < 0.05 ? 'text-emerald-400' : 'text-slate-300'}>
                    θ = {angleBetweenLinesDeg.toFixed(1)}°
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* PROGRESS BAR */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Challenge Progress: {currentChallenge + 1} of {filteredChallenges.length}</span>
              <span>Score: {Math.max(0, 100 - errors * 5)}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* CHALLENGE CARD */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900/90 rounded-2xl border transition-colors ${
              wrongFlash ? 'border-rose-500 bg-rose-950/20' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-2.5 py-0.5 text-[11px] rounded-full bg-gold-950 text-gold-300 font-bold border border-gold-700/40">
                {challenge.competencyLevel.toUpperCase()}
              </span>
              <span className="text-xs text-slate-500 font-mono">ID: {challenge.nodeId}</span>
            </div>

            <p className="text-base font-semibold text-white mb-6 leading-relaxed">{challenge.question}</p>

            {/* MCQ TYPE (classify, distinguish, match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200 flex items-center justify-between'
                        : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-mono mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </div>
                    {showExplanation && (
                      <span className="ml-2 font-bold text-base">
                        {i === challenge.correctIndex ? '✓' : ''}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      role="region"
                      aria-label={`Drop target for ${targetId}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 min-h-[70px] flex items-center justify-between"
                    >
                      <span className="text-xs text-slate-400 font-mono capitalize">{targetId.replace('_', ' ')}:</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded ${droppedLabels[targetId] ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'text-slate-500 border border-dashed border-slate-700'}`}>
                        {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop matching rule here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify dragged mappings"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={wrongShake ? { duration: 0.4 } : {}}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into correct ascending order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-gold-400 text-[10px]">#{displayIdx + 1}</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  aria-label="Confirm sort arrangement"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={wrongShake ? { duration: 0.4 } : {}}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold mt-2"
                >
                  Confirm Ordering
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Calculated numerical answer"
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value..."
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-64 focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-xs font-mono text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit calculated numeric answer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Check Telemetry
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-gold-300 rounded-lg border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-gold-950 text-gold-300 text-xs font-mono flex items-center gap-1 border border-gold-800">
                      {part}
                      <button aria-label={`Remove part: ${part}`} onClick={() => setConstructParts(prev => prev.filter((_, pIdx) => pIdx !== idx))} className="text-rose-400 hover:text-rose-300 ml-1 font-bold">✗</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Select statements to form the proof...</span>}
                </div>

                <motion.button
                  aria-label="Verify proof construction"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={wrongShake ? { duration: 0.4 } : {}}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Proof Construction
                </motion.button>
              </div>
            )}

            {/* STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3">
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">Step-by-Step Mathematical Derivation:</p>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, sIdx) => (
                  <motion.p key={sIdx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-amber-100 font-mono leading-relaxed">
                    <span className="text-amber-400 font-bold mr-1">Step {sIdx + 1}:</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Reveal next step of explanation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-800/80 hover:bg-amber-700 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Proceed to next challenge or finish"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 ml-auto"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Assessment →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* MOTIVATIONAL BANNER */}
          <div className="p-8 bg-gradient-to-br from-gold-950 to-slate-900 rounded-3xl border border-gold-700/60 shadow-2xl text-center space-y-4">
            <span className="text-5xl" aria-hidden="true">🎯</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">{motivationalMessage.title}</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              {motivationalMessage.desc}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 py-4">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[140px]">
                <span className="text-xs text-slate-400 uppercase font-mono block">Final Accuracy</span>
                <strong className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[140px]">
                <span className="text-xs text-slate-400 uppercase font-mono block">Mastery Rating</span>
                <strong className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</strong>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[140px]">
                <span className="text-xs text-slate-400 uppercase font-mono block">Total Errors</span>
                <strong className="text-2xl font-black text-amber-400">{errors}</strong>
              </div>
            </div>
          </div>

          {/* SPACED REPETITION VISIBILITY CARD */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-gold-700/50 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">📅</span>
              <h3 className="text-base font-bold text-gold-300">Spaced Repetition Schedule (SRS Active)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on your SM-2 telemetry calibration algorithm:
            </p>
            <div className="p-4 bg-gold-950/70 border border-gold-800/80 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Recommended Next Review:</p>
                <p className="text-xs text-gold-300">Retain maximum binomial & progression neural pathways.</p>
              </div>
              <span className="px-4 py-2 bg-gold-600 text-white rounded-xl text-sm font-black shadow">
                Review in {srsScheduleDays} {srsScheduleDays === 1 ? 'day' : 'days'}
              </span>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">💡</span>
              <h3 className="text-base font-bold text-gold-300">Student Self-Reflection</h3>
            </div>
            <p className="text-xs text-slate-400">
              Metacognitive reflection solidifies long-term mathematical memory. Articulate your insights:
            </p>

            <div className="space-y-3">
              <div>
                <label htmlFor="reflect-q1" className="text-xs font-semibold text-slate-300 block mb-1">
                  1. What was the most surprising thing you learned about binomial middle terms or AM-GM?
                </label>
                <textarea
                  id="reflect-q1"
                  aria-label="Reflection response for most surprising thing learned"
                  rows={2}
                  value={reflection1}
                  onChange={e => setReflection1(e.target.value)}
                  placeholder="e.g., How (n+1) terms create single vs double middle terms..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label htmlFor="reflect-q2" className="text-xs font-semibold text-slate-300 block mb-1">
                  2. How would you explain origin shifting (X = x - h) to a friend?
                </label>
                <textarea
                  id="reflect-q2"
                  aria-label="Reflection response for explaining origin shifting to a friend"
                  rows={2}
                  value={reflection2}
                  onChange={e => setReflection2(e.target.value)}
                  placeholder="e.g., The point stays still, the grid moves under it..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label htmlFor="reflect-q3" className="text-xs font-semibold text-slate-300 block mb-1">
                  3. Where in real life might you use infinite geometric series or line slopes?
                </label>
                <textarea
                  id="reflect-q3"
                  aria-label="Reflection response for real life applications"
                  rows={2}
                  value={reflection3}
                  onChange={e => setReflection3(e.target.value)}
                  placeholder="e.g., Calculating signal pulse decay, radar tracking angles..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold-500"
                />
              </div>

              <motion.button
                aria-label="Save reflections"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setReflectionSaved(true);
                  audioManager.play('success');
                }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
              >
                {reflectionSaved ? '✓ Reflections Recorded' : 'Save Reflection Log'}
              </motion.button>
            </div>
          </div>

          {/* MISCONCEPTION AUDIT */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Concept Calibrations Required:</h3>
              {hitMisconceptions.map((mIdx, i) => {
                const m = misconceptions[mIdx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">✗ Misconception: {m.misconception}</p>
                    <p className="text-emerald-400 font-medium">✓ Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* REAL-WORLD ACTIVITY */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs font-mono text-slate-300">
                  <span className="text-gold-400 font-bold mr-2">[{idx + 1}]</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* FEEDBACK OVERLAYS */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Assessment Unit Validated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_MathematicsGeneralMiddleTermSim;
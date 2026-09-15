'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDENTIFIERS ───
const NODE_C10_MATH_011 = 'c10_math_011';
const NODE_C10_MATH_012 = 'c10_math_012';
const NODE_C10_MATH_013 = 'c10_math_013';
const NODE_C10_MATH_014 = 'c10_math_014';
const NODE_C10_MATH_015 = 'c10_math_015';
const NODE_C10_MATH_016 = 'c10_math_016';
const NODE_C10_MATH_017 = 'c10_math_017';
const NODE_C10_MATH_018 = 'c10_math_018';
const NODE_C10_MATH_019 = 'c10_math_019';
const NODE_C10_MATH_020 = 'c10_math_020';

const ALL_NODE_IDS = [
  NODE_C10_MATH_011,
  NODE_C10_MATH_012,
  NODE_C10_MATH_013,
  NODE_C10_MATH_014,
  NODE_C10_MATH_015,
  NODE_C10_MATH_016,
  NODE_C10_MATH_017,
  NODE_C10_MATH_018,
  NODE_C10_MATH_019,
  NODE_C10_MATH_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The ISRO Launch Arc & Fuel Mixing Lab',
  intro: 'At the Satish Dhawan Space Centre in Sriharikota, aerospace engineers are calculating the parabolic flight trajectory of the PSLV rocket stage, tuning the oxidizer-to-fuel ratio via continued proportions, and using polynomial stress factors to prevent tank resonance.',
  context: 'Every launch trajectory requires solving ax² + bx + c = 0, verifying discriminant bounds (D ≥ 0), balancing proportions with componendo-dividendo, and confirming zero residual stress via the Factor Theorem f(a) = 0.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An engineer tracks rocket altitude with y = -5t² + 40t + 45. What happens when the rocket touches ground (y = 0)?',
  options: [
    'The trajectory produces 2 mathematical roots for time t, but one negative root must be rejected in real physics.',
    'Only linear equations can describe time of flight; quadratic equations have no physical meaning.',
    'Both roots will always be valid flight times including negative seconds.',
    'The discriminant will always be negative because the rocket eventually drops.',
  ],
  correctIndex: 0,
  hintAfter: 'Quadratic models generate two roots, but physical constraints (time t ≥ 0) require contextual interpretation! Let us explore why.',
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

// ─── 22 CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c10_math_011)
  {
    id: 'ch_01',
    nodeId: NODE_C10_MATH_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following represents the standard form of a quadratic equation in one variable?',
    options: [
      'ax² + bx + c = 0, where a, b, c ∈ ℝ and a ≠ 0',
      'ax + b = 0, where a ≠ 0',
      'ax³ + bx² + cx + d = 0, where a ≠ 0',
      'ax² + bx + c > 0, where a ≠ 0',
    ],
    correctIndex: 0,
    explanation: 'Standard form requires ax² + bx + c = 0 with descending powers, all terms on one side equal to zero, and leading coefficient a ≠ 0.',
    hints: [
      'The highest power (degree) of the variable x must be exactly 2.',
      'All terms must be collected on one side equal to zero.',
      'If a = 0, the equation degenerates into a linear equation bx + c = 0.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Understanding (c10_math_011)
  {
    id: 'ch_02',
    nodeId: NODE_C10_MATH_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'After simplifying (x + 2)² = x² - 5, is this equation quadratic?',
    options: [
      'No, because expanding gives x² + 4x + 4 = x² - 5, so x² cancels leaving 4x + 9 = 0 (linear).',
      'Yes, because x² is visible in the original formulation.',
      'Yes, because any bracket squared always forms a quadratic equation.',
      'No, because it turns into a cubic equation.',
    ],
    correctIndex: 0,
    explanation: 'Expanding (x + 2)² gives x² + 4x + 4. Subtracting x² from both sides cancels the degree 2 term, leaving 4x + 9 = 0, which is linear.',
    hints: [
      'Expand the left hand side first: (x + 2)² = x² + 4x + 4.',
      'Subtract x² from both sides of x² + 4x + 4 = x² - 5.',
      'Notice that the leading coefficient of x² becomes 0, so it is NOT quadratic.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Understanding (c10_math_012)
  {
    id: 'ch_03',
    nodeId: NODE_C10_MATH_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is it incorrect to solve 3x² = 9x by dividing both sides by x to get x = 3?',
    options: [
      'Dividing by variable x assumes x ≠ 0, thus illegally discarding the root x = 0.',
      'Dividing by x is always valid and x = 3 is the only true root.',
      'Because 9 divided by 3 is not 3.',
      'Because quadratic equations can never have zero as a root.',
    ],
    correctIndex: 0,
    explanation: 'Never divide by an unknown variable! Rearrange to 3x² - 9x = 0, factorise as 3x(x - 3) = 0, yielding two roots: x = 0 and x = 3.',
    hints: [
      'Think what happens when x = 0: division by zero is undefined.',
      'Rearrange all terms to standard form: 3x² - 9x = 0.',
      'Factor out 3x to see both roots: 3x(x - 3) = 0 gives x = 0 or x = 3.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - Application (c10_math_016)
  {
    id: 'ch_04',
    nodeId: NODE_C10_MATH_016,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Find the mean proportion between 4 and 36 (i.e. b = √(ac)).',
    correctAnswer: 12,
    tolerance: 0.1,
    unit: '',
    explanation: 'The mean proportion b satisfies b² = ac. Here b = √(4 × 36) = √144 = 12.',
    hints: [
      'The mean proportional formula is b = √(a × c).',
      'Calculate the product 4 × 36 = 144.',
      'Take the positive square root: √144 = 12.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation - Recall (c10_math_019)
  {
    id: 'ch_05',
    nodeId: NODE_C10_MATH_019,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'By the Remainder Theorem, find the remainder when f(x) = x³ - 3x + 5 is divided by (x - 2).',
    correctAnswer: 7,
    tolerance: 0.1,
    unit: '',
    explanation: 'By the Remainder Theorem, dividing by (x - a) gives remainder R = f(a). Here R = f(2) = 2³ - 3(2) + 5 = 8 - 6 + 5 = 7.',
    hints: [
      'Identify a in the divisor (x - a): here a = 2.',
      'Substitute x = 2 into f(x) = x³ - 3x + 5.',
      'Calculate: (2)³ - 3(2) + 5 = 8 - 6 + 5 = 7.',
    ],
  },
  // 6. Foundation - Understanding (c10_math_020)
  {
    id: 'ch_06',
    nodeId: NODE_C10_MATH_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The Factor Theorem states that (x - a) is a factor of polynomial f(x) if and only if:',
    options: [
      'f(a) = 0 (the remainder is zero)',
      'f(a) > 0',
      'f(-a) = 0',
      'f\'(a) = 0',
    ],
    correctIndex: 0,
    explanation: 'A binomial (x - a) divides f(x) exactly with no remainder if and only if the remainder f(a) = 0.',
    hints: [
      'Recall the Remainder Theorem: remainder = f(a).',
      'For something to be an exact factor, what must the remainder be?',
      'The remainder must be exactly zero, so f(a) = 0.',
    ],
  },
  // 7. Foundation - Drag Label (c10_math_014)
  {
    id: 'ch_07',
    nodeId: NODE_C10_MATH_014,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each Discriminant condition (D = b² - 4ac) to its root geometry.',
    dragItems: [
      { label: '2 Distinct Real Roots', targetId: 'target_pos' },
      { label: '2 Equal Real Roots', targetId: 'target_zero' },
      { label: 'No Real Roots', targetId: 'target_neg' },
    ],
    correctMapping: {
      target_pos: '2 Distinct Real Roots',
      target_zero: '2 Equal Real Roots',
      target_neg: 'No Real Roots',
    },
    explanation: 'D > 0 produces 2 distinct x-intercepts, D = 0 touches x-axis at 1 tangent vertex (equal roots), D < 0 never meets the x-axis.',
    hints: [
      'When D > 0, the square root √D gives two distinct values (±√D).',
      'When D = 0, ±√0 = 0, collapsing both roots into x = -b/(2a).',
      'When D < 0, √D is not a real number in ICSE syllabus, so no real roots exist.',
    ],
    misconceptionIndex: 2,
  },
  // 8. Standard - Application (c10_math_012)
  {
    id: 'ch_08',
    nodeId: NODE_C10_MATH_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Solve 2x² - 7x + 3 = 0 by splitting the middle term.',
    options: [
      'x = 3 or x = 1/2',
      'x = -3 or x = -1/2',
      'x = 6 or x = 1',
      'x = 7 or x = 3/2',
    ],
    correctIndex: 0,
    explanation: 'ac = 2 × 3 = 6, sum = -7. Factors are -6 and -1: 2x² - 6x - x + 3 = 2x(x - 3) - 1(x - 3) = (2x - 1)(x - 3) = 0 ⇒ x = 1/2, 3.',
    hints: [
      'Find two numbers whose product is a × c = 6 and whose sum is b = -7.',
      'The numbers are -6 and -1 because (-6) × (-1) = 6 and -6 + (-1) = -7.',
      'Group terms: 2x(x - 3) - 1(x - 3) = 0 gives (2x - 1)(x - 3) = 0.',
    ],
  },
  // 9. Standard - Application (c10_math_013)
  {
    id: 'ch_09',
    nodeId: NODE_C10_MATH_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Solve 3x² + 5x - 1 = 0 using the quadratic formula in simplest surd form.',
    options: [
      'x = (-5 ± √37) / 6',
      'x = (-5 ± √13) / 6',
      'x = (5 ± √37) / 6',
      'x = (-5 ± √37) / 3',
    ],
    correctIndex: 0,
    explanation: 'a = 3, b = 5, c = -1. D = 5² - 4(3)(-1) = 25 + 12 = 37. Formula: x = (-b ± √D)/(2a) = (-5 ± √37)/6.',
    hints: [
      'Careful with sign of c: -4ac = -4(3)(-1) = +12.',
      'Calculate D = 25 + 12 = 37.',
      'Denominator is 2a = 2(3) = 6. Result: (-5 ± √37)/6.',
    ],
  },
  // 10. Standard - Analysis (c10_math_014)
  {
    id: 'ch_10',
    nodeId: NODE_C10_MATH_014,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Find the positive value of k such that 4x² + 8x + k = 0 has equal real roots.',
    correctAnswer: 4,
    tolerance: 0.1,
    unit: '',
    explanation: 'For equal roots, D = b² - 4ac = 0. Here 8² - 4(4)(k) = 0 ⇒ 64 - 16k = 0 ⇒ 16k = 64 ⇒ k = 4.',
    hints: [
      'Equal roots condition is D = b² - 4ac = 0.',
      'Substitute: 8² - 4(4)(k) = 0.',
      '64 - 16k = 0 ⇒ k = 64/16 = 4.',
    ],
  },
  // 11. Standard - Application (c10_math_015)
  {
    id: 'ch_11',
    nodeId: NODE_C10_MATH_015,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The product of two consecutive positive integers is 210. What is the smaller integer?',
    correctAnswer: 14,
    tolerance: 0.1,
    unit: '',
    explanation: 'Let integers be x and x + 1. x(x + 1) = 210 ⇒ x² + x - 210 = 0 ⇒ (x + 15)(x - 14) = 0. Since positive, x = 14.',
    hints: [
      'Set up equation: x(x + 1) = 210.',
      'Rearrange: x² + x - 210 = 0.',
      'Factorise (x + 15)(x - 14) = 0 and reject the negative root x = -15.',
    ],
    misconceptionIndex: 4,
  },
  // 12. Standard - Analysis (c10_math_017)
  {
    id: 'ch_12',
    nodeId: NODE_C10_MATH_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'If 4a = 7b, which property converts a/b = 7/4 directly into (a + b)/b = 11/4?',
    options: [
      'Componendo: adding denominator to numerator on both sides',
      'Dividendo: subtracting denominator from numerator',
      'Invertendo: taking reciprocal of both sides',
      'Alternendo: swapping the means',
    ],
    correctIndex: 0,
    explanation: 'Componendo states: if a/b = c/d, then (a + b)/b = (c + d)/d. Here (7 + 4)/4 = 11/4.',
    hints: [
      'Look at the operation: numerator becomes (a + b) while denominator remains b.',
      'Adding 1 to both sides of a/b = 7/4 gives a/b + 1 = 7/4 + 1.',
      '(a + b)/b = 11/4 is called Componendo.',
    ],
  },
  // 13. Standard - Application (c10_math_018)
  {
    id: 'ch_13',
    nodeId: NODE_C10_MATH_018,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Solve for x using Componendo-Dividendo: (x + 5) / (x - 5) = 7 / 3.',
    correctAnswer: 12.5,
    tolerance: 0.1,
    unit: '',
    explanation: 'Applying Componendo and Dividendo: [(x + 5) + (x - 5)] / [(x + 5) - (x - 5)] = (7 + 3)/(7 - 3) ⇒ 2x / 10 = 10 / 4 ⇒ x/5 = 5/2 ⇒ x = 25/2 = 12.5.',
    hints: [
      'Apply (Numerator + Denominator) / (Numerator - Denominator) on both sides.',
      'Left becomes 2x / 10 and right becomes (7 + 3)/(7 - 3) = 10 / 4.',
      '2x / 10 = 2.5 ⇒ 2x = 25 ⇒ x = 12.5.',
    ],
  },
  // 14. Standard - Evaluation (c10_math_020)
  {
    id: 'ch_14',
    nodeId: NODE_C10_MATH_020,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'If (x - 2) is a factor of f(x) = x³ + kx - 10, find the value of k.',
    correctAnswer: 1,
    tolerance: 0.1,
    unit: '',
    explanation: 'By the Factor Theorem, f(2) = 0. 2³ + k(2) - 10 = 0 ⇒ 8 + 2k - 10 = 0 ⇒ 2k - 2 = 0 ⇒ k = 1.',
    hints: [
      'Since (x - 2) is a factor, substitute x = 2 into f(x) and set equal to 0.',
      'f(2) = 2³ + 2k - 10 = 8 + 2k - 10.',
      '2k - 2 = 0 ⇒ 2k = 2 ⇒ k = 1.',
    ],
  },
  // 15. Standard - Drag Sort (c10_math_015)
  {
    id: 'ch_15',
    nodeId: NODE_C10_MATH_015,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the 4 scientific steps for solving real-world quadratic word problems in correct order.',
    sortItems: [
      'Assign unknown variable x and define units',
      'Translate narrative conditions into standard equation ax² + bx + c = 0',
      'Solve using factorisation or quadratic formula',
      'Interpret roots in physical context and reject extraneous values',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Correct workflow: (1) Assign variable, (2) Frame standard equation, (3) Solve algebraically, (4) Filter non-physical roots and verify.',
    hints: [
      'Always start by defining what variable x represents.',
      'Transform the English text into an algebraic equation equal to zero.',
      'Solve mathematically before filtering for physical validity (e.g. positive speed or time).',
    ],
  },
  // 16. Advanced - Application (c10_math_015)
  {
    id: 'ch_16',
    nodeId: NODE_C10_MATH_015,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A Vande Bharat express train travels 360 km. If speed was 5 km/h higher, trip takes 1 hour less. Find original speed in km/h.',
    correctAnswer: 40,
    tolerance: 0.1,
    unit: 'km/h',
    explanation: 'Time difference: 360/x - 360/(x + 5) = 1 ⇒ 360(5) = x(x + 5) ⇒ x² + 5x - 1800 = 0 ⇒ (x + 45)(x - 40) = 0. Speed > 0 ⇒ x = 40 km/h.',
    hints: [
      'Time taken is Distance / Speed. Equation: 360/x - 360/(x + 5) = 1.',
      'Multiply through by x(x + 5) to obtain x² + 5x - 1800 = 0.',
      'Solve: factors of -1800 that add to 5 are +45 and -40. Reject negative speed.',
    ],
    misconceptionIndex: 4,
  },
  // 17. Advanced - Evaluation (c10_math_014)
  {
    id: 'ch_17',
    nodeId: NODE_C10_MATH_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'ISRO engineers test rocket nozzle pressure with p(t) = 2t² - 4t + 5. Will pressure ever reach 0 in real time?',
    options: [
      'No, because D = (-4)² - 4(2)(5) = 16 - 40 = -24 < 0 (no real roots)',
      'Yes, at t = 2 seconds exactly',
      'Yes, pressure touches zero once because the leading coefficient is positive',
      'Yes, at t = -1.5 seconds',
    ],
    correctIndex: 0,
    explanation: 'Discriminant D = b² - 4ac = 16 - 40 = -24 < 0. A negative discriminant proves the parabola never touches or cuts the horizontal axis in real numbers.',
    hints: [
      'Compute the discriminant D = b² - 4ac for a = 2, b = -4, c = 5.',
      'D = (-4)² - 4(2)(5) = 16 - 40 = -24.',
      'Because D < 0, there are no real solutions where p(t) = 0.',
    ],
    misconceptionIndex: 2,
  },
  // 18. Advanced - Construct (c10_math_018)
  {
    id: 'ch_18',
    nodeId: NODE_C10_MATH_018,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the Componendo-Dividendo identity from the given algebraic fragments for a/b = c/d.',
    availableParts: ['(a + b)/(a - b)', '=', '(c + d)/(c - d)', '(a - b)/(a + b)', '(c - d)/(c + d)'],
    targetState: '(a + b)/(a - b) = (c + d)/(c - d)',
    validationHint: 'Assemble: [Left Ratio] [Equals] [Right Ratio]',
    explanation: 'Componendo and dividendo applied simultaneously yields (a + b)/(a - b) = (c + d)/(c - d).',
    hints: [
      'First select the combined numerator/denominator for the left side.',
      'Add the equality sign =.',
      'Select the matching combined ratio for the right side.',
    ],
  },
  // 19. Advanced - Analysis (c10_math_019)
  {
    id: 'ch_19',
    nodeId: NODE_C10_MATH_019,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Find the remainder when f(x) = 2x³ - 5x² + 7x - 4 is divided by (2x - 1).',
    correctAnswer: -1.5,
    tolerance: 0.1,
    unit: '',
    explanation: 'Zero of (2x - 1) is x = 1/2. Remainder = f(1/2) = 2(1/8) - 5(1/4) + 7(1/2) - 4 = 1/4 - 5/4 + 14/4 - 16/4 = -6/4 = -1.5.',
    hints: [
      'For divisor (ax + b), the substitution point is x = -b/a. Here x = 1/2.',
      'Substitute x = 0.5 into 2(0.5)³ - 5(0.5)² + 7(0.5) - 4.',
      '2(0.125) - 5(0.25) + 3.5 - 4 = 0.25 - 1.25 + 3.5 - 4 = -1.5.',
    ],
  },
  // 20. Advanced - Evaluation (c10_math_020)
  {
    id: 'ch_20',
    nodeId: NODE_C10_MATH_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Is (2x + 1) a factor of 4x³ + 4x² - x - 1?',
    options: [
      'Yes, because evaluating f(-1/2) = 4(-1/8) + 4(1/4) - (-1/2) - 1 = -1/2 + 1 + 1/2 - 1 = 0.',
      'No, because remainder is +2.',
      'No, because leading coefficient is 4 which is not equal to 2.',
      'Cannot be determined without full polynomial long division.',
    ],
    correctIndex: 0,
    explanation: 'Zero of (2x + 1) is x = -1/2. f(-1/2) = 4(-1/8) + 4(1/4) + 1/2 - 1 = -1/2 + 1 + 1/2 - 1 = 0. By Factor Theorem, (2x + 1) is a factor.',
    hints: [
      'Set 2x + 1 = 0 to get x = -1/2.',
      'Calculate f(-1/2) step by step.',
      'Since f(-1/2) = 0 exactly, (2x + 1) is confirmed as a factor.',
    ],
  },
  // 21. Advanced - Creativity / Real-world (c10_math_016)
  {
    id: 'ch_21',
    nodeId: NODE_C10_MATH_016,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Three satellite antenna signal amplifiers a, b, c are in continued proportion. If a = 8 and c = 50, what is amplifier gain b?',
    correctAnswer: 20,
    tolerance: 0.1,
    unit: 'dB',
    explanation: 'In continued proportion a:b = b:c ⇒ b² = ac ⇒ b = √(8 × 50) = √400 = 20.',
    hints: [
      'Use the continued proportion formula: b² = a × c.',
      'Compute 8 × 50 = 400.',
      'Take the square root: √400 = 20.',
    ],
  },
  // 22. Advanced - Analysis (c10_math_017)
  {
    id: 'ch_22',
    nodeId: NODE_C10_MATH_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Given proportion x/y = 9/5. By Dividendo, what is the exact value of (x - y) / y?',
    options: [
      '4/5',
      '14/5',
      '5/4',
      '9/4',
    ],
    correctIndex: 0,
    explanation: 'Dividendo subtracts denominator from numerator: (x - y)/y = (9 - 5)/5 = 4/5.',
    hints: [
      'Dividendo rule: (x - y)/y = (c - d)/d.',
      'Here c = 9, d = 5.',
      '(9 - 5)/5 = 4/5.',
    ],
  },
  // ─── Class 10 board-depth additions: quadratic-application diagnostic ───
  {
    id: 'ch_depth_quad_boat_stream',
    nodeId: 'c10_math_cbse_04_012',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A boat goes 12 km upstream and 40 km downstream in 8 hours; it goes 16 km upstream and 32 km downstream in the same 8 hours. A student writes u = upstream speed, v = downstream speed, and gets stuck. Which system solves it?',
    options: [
      'Two TIME equations: 12/u + 40/v = 8 and 16/u + 32/v = 8; substitute x = 1/u, y = 1/v to get 12x + 40y = 8 and 16x + 32y = 8 -- a LINEAR pair in x, y. Solving: x = 1/4, y = 1/8, so u = 4 km/h upstream and v = 8 km/h downstream (boat 6, stream 2)',
      'Multiply the distances together and divide by 8',
      'The problem has no solution because boats vary in speed',
      'One equation suffices because the times are equal'
    ],
    correctIndex: 0,
    explanation:
      'This is the classic reducible-to-linear problem: reciprocals of the unknown speeds become new variables (x = 1/u, y = 1/v), the pair solves linearly (x = 1/4, y = 1/8), and back-substitution gives u = 4, v = 8. Verification: 12/4 + 40/8 = 3 + 5 = 8 and 16/4 + 32/8 = 4 + 4 = 8 -- both original equations hold. Substitution habits like this turn "quadratic-looking" stories into clean linear systems.',
    hints: [
      'Time = distance/speed, once per journey leg.',
      'Reciprocal substitution converts the pair to linear.',
      'Always substitute back into BOTH original equations.'
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
  nodeId: NODE_C10_MATH_011,
  title: 'Class 10 ICSE Quadratic Equations & Proportions Master Suite',
  definition: 'A quadratic equation in one variable is ax² + bx + c = 0 (a ≠ 0). Properties of continued proportion b² = ac, Componendo-Dividendo transformations, and polynomial Factor/Remainder theorems form core algebraic tools.',
  eli5: 'Think of a quadratic equation as drawing a parabolic rocket curve. The discriminant tells you if it touches the ground, the formula finds the exact landing spot, and proportion rules balance the fuel mixture.',
  misconceptions: [
    {
      misconception: 'If I see x² in an equation, it must be quadratic without simplifying.',
      correction: 'Always expand and collect like terms. In equations like (x+2)² = x² - 5, the x² terms cancel out, leaving a linear equation.',
    },
    {
      misconception: 'You can divide both sides of 3x² = 9x by x to get x = 3 directly.',
      correction: 'Dividing by variable x discards the valid root x = 0. Always rearrange to 3x² - 9x = 0 and factorise.',
    },
    {
      misconception: 'If D = 0, there is only one root.',
      correction: 'When D = 0, there are TWO EQUAL (coincident) real roots at x = -b/(2a). In ICSE terminology, they are two coincident roots.',
    },
    {
      misconception: 'The mean proportion between a and c is the arithmetic average (a + c)/2.',
      correction: 'The mean proportional is the geometric mean b = √(ac), satisfying a:b = b:c.',
    },
    {
      misconception: 'Both algebraic roots of a quadratic word problem are automatically valid physical answers.',
      correction: 'Real world physical parameters like length, time, or speed cannot be negative. Extraneous negative roots must be discarded with stated reason.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the degree of a quadratic equation in one variable?',
      options: ['1', '2', '3', 'Any integer'],
      correctIndex: 1,
    },
    {
      question: 'For ax² + bx + c = 0, what is the discriminant D?',
      options: ['b² - 4ac', 'b² + 4ac', '4ac - b²', '√(b² - 4ac)'],
      correctIndex: 0,
    },
    {
      question: 'What does D > 0 imply about the roots?',
      options: ['Two distinct real roots', 'Two equal real roots', 'No real roots', 'Zero roots'],
      correctIndex: 0,
    },
    {
      question: 'If a, b, c are in continued proportion, which relation holds?',
      options: ['b² = ac', '2b = a + c', 'b = ac', 'a² = bc'],
      correctIndex: 0,
    },
    {
      question: 'If a/b = c/d, what does Componendo state?',
      options: ['(a+b)/b = (c+d)/d', '(a-b)/b = (c-d)/d', 'b/a = d/c', 'a/c = b/d'],
      correctIndex: 0,
    },
    {
      question: 'When f(x) is divided by (x - a), the remainder is:',
      options: ['f(a)', 'f(-a)', '0', 'f\'(a)'],
      correctIndex: 0,
    },
    {
      question: 'The Factor Theorem states (x - a) is a factor if and only if:',
      options: ['f(a) = 0', 'f(a) > 0', 'f(-a) = 0', 'f(0) = a'],
      correctIndex: 0,
    },
    {
      question: 'What is the zero of divisor (2x - 3)?',
      options: ['3/2', '-3/2', '2/3', '-2/3'],
      correctIndex: 0,
    },
  ],
  masteryCriteria: 'Mastery of ICSE Class 10 Quadratic Equations (standard form, factorisation, quadratic formula, discriminant nature of roots, contextual word problems), Proportions (continued, mean, Componendo-Dividendo), and Remainder & Factor Theorems.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Parabola Morphology & Standard Form',
    instruction: 'Drag sliders a, b, and c to see how the flight curve y = ax² + bx + c morphs in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_MATH_011,
  },
  {
    title: 'Lab 2: The Discriminant Radar (D = b² - 4ac)',
    instruction: 'Adjust parameters to shift D across positive, zero, and negative states to watch root intercepts.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_MATH_014,
  },
  {
    title: 'Lab 3: The Geometric Mean & Continued Proportion',
    instruction: 'Modify extremes a and c to observe how the mean proportion b = √(ac) preserves identical aspect ratios.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_MATH_016,
  },
  {
    title: 'Lab 4: Componendo & Dividendo Visual Balance',
    instruction: 'Observe how transforming a/b = c/d into (a+b)/(a-b) = (c+d)/(c-d) preserves symmetry.',
    interactionType: 'click-parts',
    nodeId: NODE_C10_MATH_017,
  },
  {
    title: 'Lab 5: Remainder & Factor Theorem Probe',
    instruction: 'Move test point x = a along the cubic polynomial curve to inspect f(a) and detect factors where f(a) = 0.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_MATH_019,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If leading coefficient a = 1, b = -4, and c = 4, what will happen to the parabola and its roots?',
    options: [
      'Discriminant D = 16 - 16 = 0: the parabola will touch the x-axis at exactly 1 vertex point (2 coincident roots at x = 2).',
      'The parabola will cut the x-axis at two distinct spots x = -2 and x = 2.',
      'The parabola will float above the x-axis with no real roots.',
      'The equation becomes linear because c is a square number.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Set slider a = 1, b = -4, c = 4 in the interactive simulator below to verify the vertex touchpoint!',
    nodeId: NODE_C10_MATH_014,
  },
  {
    question: 'Predict: In rocket fuel mixing, if tanks have volumes a = 2 litres and c = 32 litres in continued proportion, what must tank b contain?',
    options: [
      'b = √(2 × 32) = √64 = 8 litres',
      'b = (2 + 32) / 2 = 17 litres',
      'b = 32 - 2 = 30 litres',
      'b = 32 / 2 = 16 litres',
    ],
    correctIndex: 0,
    verifyInstruction: 'Check using continued proportion formula b² = ac in the lab below!',
    nodeId: NODE_C10_MATH_016,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the curve when coefficient a changes from positive to negative?',
    observableOptions: [
      'When a > 0 the parabola opens upward (U-shape); when a < 0 it inverts and opens downward (∩-shape).',
      'The parabola shifts only left and right without changing curvature.',
      'The x-intercepts immediately disappear whenever a is negative.',
      'The curve turns into a straight line.',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_MATH_011,
  },
  {
    question: 'When D = b² - 4ac < 0, what does the graph show about real roots?',
    observableOptions: [
      'The parabola lies entirely above or below the x-axis and never touches the horizontal line.',
      'The parabola passes directly through the origin (0,0).',
      'The parabola intersects the x-axis at imaginary ticks.',
      'The curve collapses into a single vertical ray.',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_MATH_014,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Flight Dynamics Portfolio Project',
  description: 'Design a sounding rocket trajectory equation h(t) = -5t² + vt + h₀ where the rocket reaches a peak of 80m and lands in 8 seconds. Compute discriminant, verify physical roots, and construct a continued proportion fuel ratio.',
  steps: [
    'Write the standard quadratic equation with a = -5, h(0) = 0, and h(8) = 0.',
    'Factorise the flight trajectory: -5t(t - 8) = 0 to verify roots t = 0s (launch) and t = 8s (splashdown).',
    'Calculate the apex time t_peak = -b/(2a) = 4s and maximum altitude h(4) = 80m.',
    'Select oxidizer mass a = 18 kg and fuel mass c = 50 kg to determine the mean proportion pump buffer b = √(18 × 50) = 30 kg.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C10_MathematicsQuadraticEquationsIntroductionSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_MATH_011,
  title = DEFAULT_PROPS.title || 'Quadratic Equations & Proportions',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── INTERACTIVE EXPLORATION & LAB STATES ───
  const [sliderA, setSliderA] = useState(1);
  const [sliderB, setSliderB] = useState(-2);
  const [sliderC, setSliderC] = useState(-3);
  const [propA, setPropA] = useState(4);
  const [propC, setPropC] = useState(16);
  const [compA, setCompA] = useState(6);
  const [compB, setCompB] = useState(2);
  const [polyA, setPolyA] = useState(1);
  const [polyB, setPolyB] = useState(-2);
  const [polyC, setPolyC] = useState(-5);
  const [polyD, setPolyD] = useState(6);
  const [testA, setTestA] = useState(2);
  const [activeTab, setActiveTab] = useState<'parabola' | 'discriminant' | 'proportion' | 'remainder'>('parabola');

  // ─── REFLECTION ANSWERS ───
  const [reflections, setReflections] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // ─── PREDICT & OBSERVE STATES ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── CHALLENGE ENGINE STATES ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── VISUAL FEEDBACK & ANIMATION STATES ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [graphZoom, setGraphZoom] = useState(25);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const graphCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── COMPUTED MATHEMATICAL VALUES ───
  const discriminant = useMemo(() => {
    return sliderB * sliderB - 4 * sliderA * sliderC;
  }, [sliderA, sliderB, sliderC]);

  const roots = useMemo(() => {
    if (sliderA === 0) return { r1: null, r2: null, type: 'linear' };
    const D = sliderB * sliderB - 4 * sliderA * sliderC;
    if (D > 0) {
      const r1 = (-sliderB + Math.sqrt(D)) / (2 * sliderA);
      const r2 = (-sliderB - Math.sqrt(D)) / (2 * sliderA);
      return { r1: parseFloat(r1.toFixed(2)), r2: parseFloat(r2.toFixed(2)), type: 'distinct' };
    } else if (D === 0) {
      const r = -sliderB / (2 * sliderA);
      return { r1: parseFloat(r.toFixed(2)), r2: parseFloat(r.toFixed(2)), type: 'equal' };
    } else {
      return { r1: null, r2: null, type: 'no-real' };
    }
  }, [sliderA, sliderB, sliderC]);

  const meanProportionVal = useMemo(() => {
    if (propA < 0 || propC < 0) return 0;
    return parseFloat(Math.sqrt(propA * propC).toFixed(2));
  }, [propA, propC]);

  const polynomialVal = useMemo(() => {
    return polyA * Math.pow(testA, 3) + polyB * Math.pow(testA, 2) + polyC * testA + polyD;
  }, [polyA, polyB, polyC, polyD, testA]);

  // ─── ADAPTIVE CHALLENGES FILTER ───
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

  // ─── INITIAL LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const currentM = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(currentM);
    const targetDiff =
      currentM === 'not-started' || currentM === 'beginner'
        ? 'foundation'
        : currentM === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty((prev) => {
      if (prev !== targetDiff) {
        setCurrentChallenge(0);
        return targetDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── AUTO-HINT INACTIVITY TIMER ───
  useEffect(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
      inactivityTimerRef.current = setTimeout(() => {
        if (challenge && challenge.hints && challenge.hints[0]) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Here is a hint to guide you.');
        }
      }, 12000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [phase, currentChallenge, answerRevealed, hintCount, challenge]);

  // ─── LIVE PARABOLA CANVAS GRAPH ───
  useEffect(() => {
    const canvas = graphCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const renderGraph = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const originX = width / 2;
      const originY = height / 2;
      const scale = graphZoom;

      // Draw Grid Lines
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      for (let x = originX % scale; x < width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = originY % scale; y < height; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Axes
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, originY);
      ctx.lineTo(width, originY);
      ctx.moveTo(originX, 0);
      ctx.lineTo(originX, height);
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '11px monospace';
      ctx.fillText('x', width - 15, originY - 6);
      ctx.fillText('y', originX + 6, 14);

      // Plot Parabola: y = a x^2 + b x + c
      ctx.beginPath();
      ctx.strokeStyle = sliderA >= 0 ? '#38bdf8' : '#f43f5e';
      ctx.lineWidth = 3;

      let firstPoint = true;
      for (let px = 0; px <= width; px += 2) {
        const xVal = (px - originX) / scale;
        const yVal = sliderA * xVal * xVal + sliderB * xVal + sliderC;
        const py = originY - yVal * scale;

        if (py >= -200 && py <= height + 200) {
          if (firstPoint) {
            ctx.moveTo(px, py);
            firstPoint = false;
          } else {
            ctx.lineTo(px, py);
          }
        }
      }
      ctx.stroke();

      // Draw Vertex
      if (sliderA !== 0) {
        const vx = -sliderB / (2 * sliderA);
        const vy = sliderA * vx * vx + sliderB * vx + sliderC;
        const vpx = originX + vx * scale;
        const vpy = originY - vy * scale;

        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(vpx, vpy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText(`V(${vx.toFixed(1)}, ${vy.toFixed(1)})`, vpx + 8, vpy - 8);
      }

      // Mark Roots on X-Axis if real
      if (roots.r1 !== null) {
        const rx1 = originX + roots.r1 * scale;
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(rx1, originY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText(`x₁=${roots.r1}`, rx1 - 15, originY + 20);
      }
      if (roots.r2 !== null && roots.type === 'distinct') {
        const rx2 = originX + roots.r2 * scale;
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(rx2, originY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText(`x₂=${roots.r2}`, rx2 - 15, originY + 20);
      }
    };

    renderGraph();
    return () => cancelAnimationFrame(animId);
  }, [sliderA, sliderB, sliderC, roots, graphZoom]);

  // ─── PULSING HUD ANIMATION CANVAS ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const animateHUD = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#4f46e5');
      gradient.addColorStop(1, '#06b6d4');

      ctx.fillStyle = gradient;
      ctx.font = '12px sans-serif';
      ctx.fillText(
        `STATUS: ${difficulty.toUpperCase()} | P_KNOWN: ${(bktStateRef.current.pKnown * 100).toFixed(0)}%`,
        12,
        18
      );

      const pulseRadius = 5 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 20, 14, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      animId = requestAnimationFrame(animateHUD);
    };

    animateHUD();
    return () => cancelAnimationFrame(animId);
  }, [difficulty]);

  // ─── HANDLERS ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : 'Notice how mathematical models meet physical bounds!');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Experiment with variables directly.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Play with the equations freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenges. Do your best!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to see what happens.');
  }, []);

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
      speechManager.speak('Let us study the complete step-by-step solution.');
    }
  }, [hintCount, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the session.');
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
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent mathematics.');
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
          speechManager.speak('Here is the structured solution.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
    },
    [challenge, hintCount, hitMisconceptions, showNextHint]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isTargetMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isTargetMatch) {
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
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const base = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
        const [moved] = base.splice(fromIndex, 1);
        base.splice(toIndex, 0, moved);
        return base;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const finalOrder =
      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleRevealNextStep = useCallback(() => {
    setRevealedSteps((s) => s + 1);
    audioManager.play('tap');
  }, []);

  const handleResetLab = useCallback(() => {
    setSliderA(1);
    setSliderB(-2);
    setSliderC(-3);
    setPropA(4);
    setPropC(16);
    setCompA(6);
    setCompB(2);
    setTestA(2);
    audioManager.play('whoosh');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-900/40 rounded-2xl border border-indigo-700/50">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-indigo-400 font-medium">
              ICSE Class 10 Mathematics • Pure & Applied Algebra Core
            </p>
          </div>
        </div>

        {/* Phase Navigation */}
        <div className="flex items-center bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold gap-1">
          <button
            onClick={() => setPhase('discovery')}
            className={`px-3 py-1 rounded-xl transition-colors ${
              phase === 'discovery' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Discovery
          </button>
          <button
            onClick={() => setPhase('explore')}
            className={`px-3 py-1 rounded-xl transition-colors ${
              phase === 'explore' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Explore Labs
          </button>
          <button
            onClick={() => setPhase('sandbox')}
            className={`px-3 py-1 rounded-xl transition-colors ${
              phase === 'sandbox' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Free Sandbox
          </button>
          <button
            onClick={() => setPhase('challenge')}
            className={`px-3 py-1 rounded-xl transition-colors ${
              phase === 'challenge' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Challenges
          </button>
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.section
          key="discovery-phase"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Box */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-700/40 shadow-inner">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🚀</span> {SCENARIO.title}
            </div>
            <p className="text-slate-200 text-base leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80">{SCENARIO.context}</p>
          </div>

          {/* Curiosity Hook Card */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <span>💡</span> Initial Intuition Check (Ungraded Discovery)
            </h3>
            <p className="text-white text-base font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-slate-950 border border-indigo-900/50 space-y-3"
              >
                <p className={discoveryCorrect ? 'text-emerald-400 text-sm' : 'text-amber-400 text-sm'}>
                  {discoveryCorrect
                    ? '✨ Brilliant intuition! In applied mechanics, math gives all solutions while physics filters valid domains.'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                >
                  Enter Interactive Exploration Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── 2. EXPLORE LABS PHASE ─── */}
      {phase === 'explore' && (
        <motion.section
          key="explore-phase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Lab Step Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  currentSlide === idx
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                Lab {idx + 1}
              </button>
            ))}
          </div>

          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-5 shadow-xl">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h3 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-xs font-semibold mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>
              <span className="text-xs font-mono bg-slate-800 px-3 py-1 rounded-full text-indigo-300">
                Node: {EXPLORATION_STEPS[currentSlide].nodeId}
              </span>
            </div>

            {/* ── LAB 1 & 2: DYNAMIC PARABOLA & DISCRIMINANT (SVG DIAGRAM #1 INCLUDED) ── */}
            {(currentSlide === 0 || currentSlide === 1) && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Live SVG Parabola Visualizer (SVG #1) */}
                <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 relative space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                    <span className="font-bold text-indigo-300">SVG #1: TRAJECTORY & DISCRIMINANT GEOMETRY</span>
                    <span className="text-cyan-400 font-mono">D = {discriminant}</span>
                  </div>

                  {/* SVG Parabola Visualizer */}
                  <div className="w-full bg-slate-900/70 rounded-xl border border-slate-800 p-2 flex items-center justify-center">
                    <svg viewBox="0 0 400 220" className="w-full h-auto max-h-[220px]">
                      {/* Grid background */}
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                        </pattern>
                      </defs>
                      <rect width="400" height="220" fill="url(#grid)" rx="8" />

                      {/* Coordinate Axes */}
                      <line x1="20" y1="120" x2="380" y2="120" stroke="#64748b" strokeWidth="1.5" />
                      <line x1="200" y1="10" x2="200" y2="210" stroke="#64748b" strokeWidth="1.5" />
                      <text x="375" y="115" fill="#94a3b8" fontSize="10" fontFamily="monospace">x</text>
                      <text x="205" y="20" fill="#94a3b8" fontSize="10" fontFamily="monospace">y</text>

                      {/* Parabola Curve Path */}
                      {(() => {
                        const pts: string[] = [];
                        for (let px = 20; px <= 380; px += 4) {
                          const xVal = (px - 200) / 20;
                          const yVal = sliderA * xVal * xVal + sliderB * xVal + sliderC;
                          const py = 120 - yVal * 8;
                          if (py >= 5 && py <= 215) {
                            pts.push(`${px},${py}`);
                          }
                        }
                        return pts.length > 1 ? (
                          <path
                            d={`M ${pts.join(' L ')}`}
                            fill="none"
                            stroke={sliderA >= 0 ? '#38bdf8' : '#f43f5e'}
                            strokeWidth="3"
                          />
                        ) : null;
                      })()}

                      {/* Vertex Marker */}
                      {(() => {
                        const vx = -sliderB / (2 * (sliderA === 0 ? 1 : sliderA));
                        const vy = sliderA * vx * vx + sliderB * vx + sliderC;
                        const vpx = 200 + vx * 20;
                        const vpy = 120 - vy * 8;
                        if (vpx >= 20 && vpx <= 380 && vpy >= 10 && vpy <= 210) {
                          return (
                            <g>
                              <circle cx={vpx} cy={vpy} r="5" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
                              <text x={vpx + 7} y={vpy - 4} fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">
                                V({vx.toFixed(1)}, {vy.toFixed(1)})
                              </text>
                            </g>
                          );
                        }
                        return null;
                      })()}

                      {/* Root Intercept Indicators */}
                      {roots.r1 !== null && (
                        <circle
                          cx={200 + roots.r1 * 20}
                          cy="120"
                          r="5"
                          fill="#22c55e"
                          stroke="#14532d"
                          strokeWidth="1.5"
                        />
                      )}
                      {roots.r2 !== null && roots.type === 'distinct' && (
                        <circle
                          cx={200 + roots.r2 * 20}
                          cy="120"
                          r="5"
                          fill="#22c55e"
                          stroke="#14532d"
                          strokeWidth="1.5"
                        />
                      )}

                      {/* Discriminant Classification Badge in SVG */}
                      <rect x="25" y="15" width="130" height="26" rx="6" fill="#0f172a" stroke="#334155" />
                      <text x="32" y="32" fill={discriminant > 0 ? '#34d399' : discriminant === 0 ? '#fbbf24' : '#f87171'} fontSize="10" fontWeight="bold">
                        {discriminant > 0 ? 'D > 0 (2 Real Roots)' : discriminant === 0 ? 'D = 0 (Equal Roots)' : 'D < 0 (No Real Roots)'}
                      </text>
                    </svg>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="p-1.5 bg-indigo-950/80 rounded-lg text-indigo-300 border border-indigo-800">
                      Eq: {sliderA}x² {sliderB >= 0 ? `+ ${sliderB}` : `- ${Math.abs(sliderB)}`}x{' '}
                      {sliderC >= 0 ? `+ ${sliderC}` : `- ${Math.abs(sliderC)}`} = 0
                    </span>
                    <span
                      className={`p-1.5 rounded-lg border ${
                        discriminant > 0
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                          : discriminant === 0
                          ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                          : 'bg-rose-950/80 text-rose-300 border-rose-800'
                      }`}
                    >
                      D = {sliderB}² - 4({sliderA})({sliderC}) = {discriminant}
                    </span>
                  </div>
                </div>

                {/* Slider Manipulators */}
                <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Parameter Sliders (Real-time)</h4>

                  {/* Slider a */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-300">Leading Coefficient (a ≠ 0):</span>
                      <span className="text-cyan-400 font-bold">{sliderA}</span>
                    </div>
                    <input
                      type="range"
                      min={-4}
                      max={4}
                      step={1}
                      value={sliderA}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSliderA(val === 0 ? 1 : val);
                      }}
                      className="w-full accent-cyan-500 cursor-pointer"
                      aria-label="Coefficient a"
                    />
                  </div>

                  {/* Slider b */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-300">Middle Coefficient (b):</span>
                      <span className="text-indigo-400 font-bold">{sliderB}</span>
                    </div>
                    <input
                      type="range"
                      min={-8}
                      max={8}
                      step={1}
                      value={sliderB}
                      onChange={(e) => setSliderB(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                      aria-label="Coefficient b"
                    />
                  </div>

                  {/* Slider c */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-300">Constant Term (c):</span>
                      <span className="text-amber-400 font-bold">{sliderC}</span>
                    </div>
                    <input
                      type="range"
                      min={-10}
                      max={10}
                      step={1}
                      value={sliderC}
                      onChange={(e) => setSliderC(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                      aria-label="Constant c"
                    />
                  </div>

                  {/* Live Root Inspection Panel */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="font-bold text-slate-200">Mathematical Nature of Roots:</p>
                    {roots.type === 'distinct' && (
                      <p className="text-emerald-400">
                        ✓ Two Distinct Real Roots: x₁ = {roots.r1}, x₂ = {roots.r2}
                      </p>
                    )}
                    {roots.type === 'equal' && (
                      <p className="text-amber-400">
                        ✓ Two Equal (Coincident) Roots: x = {roots.r1}
                      </p>
                    )}
                    {roots.type === 'no-real' && (
                      <p className="text-rose-400">
                        ✗ No Real Roots (Parabola does not intersect x-axis)
                      </p>
                    )}
                  </div>

                  {/* Predict Check for Slide 1 */}
                  {currentSlide === 1 && !predictionMade && (
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <p className="text-xs text-indigo-300 font-bold">{PREDICTION_QUESTIONS[0].question}</p>
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePrediction(i)}
                          className="w-full text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── LAB 3: CONTINUED PROPORTION & GEOMETRIC MEAN (SVG DIAGRAM #2 INCLUDED) ── */}
            {currentSlide === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-indigo-300">Three Quantities in Continued Proportion (a : b = b : c)</h4>
                  <p className="text-xs text-slate-400">
                    By cross-multiplication, b × b = a × c ⇒ <strong className="text-amber-300">b² = ac</strong>, meaning middle quantity{' '}
                    <strong>b = √(ac)</strong> is the Geometric Mean.
                  </p>

                  <div>
                    <label className="text-xs text-slate-300 flex justify-between">
                      <span>Extreme a:</span> <span className="font-bold text-cyan-400">{propA}</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={25}
                      value={propA}
                      onChange={(e) => setPropA(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 flex justify-between">
                      <span>Extreme c:</span> <span className="font-bold text-emerald-400">{propC}</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={64}
                      value={propC}
                      onChange={(e) => setPropC(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                    <p className="text-xs text-slate-400">Computed Mean Proportion b = √(a × c):</p>
                    <p className="text-2xl font-black text-amber-300 font-mono mt-1">
                      b = √({propA} × {propC}) = {meanProportionVal}
                    </p>
                  </div>
                </div>

                {/* SVG Visualizer #2: Geometric Mean & Aspect Ratio Rectangles */}
                <div className="flex flex-col items-center justify-center p-4 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-indigo-300 font-bold">SVG #2: GEOMETRIC MEAN PROPORTION RATIOS</span>
                  <svg viewBox="0 0 340 200" className="w-full max-w-sm">
                    <rect width="340" height="200" fill="#0b1120" rx="10" stroke="#334155" />

                    {/* Rectangle 1: a by b */}
                    <rect
                      x="25"
                      y="50"
                      width={Math.min(90, Math.max(25, propA * 4))}
                      height={Math.min(100, Math.max(30, meanProportionVal * 3))}
                      fill="#0ea5e9"
                      fillOpacity="0.5"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      rx="4"
                    />
                    <text x="30" y="42" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      a={propA} × b={meanProportionVal}
                    </text>

                    {/* Proportion Equality Arrow / Symbol */}
                    <text x="160" y="105" fill="#f59e0b" fontSize="18" fontWeight="bold" textAnchor="middle">
                      =
                    </text>

                    {/* Rectangle 2: b by c */}
                    <rect
                      x="190"
                      y="50"
                      width={Math.min(100, Math.max(30, meanProportionVal * 3))}
                      height={Math.min(110, Math.max(25, propC * 1.8))}
                      fill="#10b981"
                      fillOpacity="0.5"
                      stroke="#34d399"
                      strokeWidth="2"
                      rx="4"
                    />
                    <text x="195" y="42" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">
                      b={meanProportionVal} × c={propC}
                    </text>

                    <text x="170" y="180" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontFamily="monospace">
                      Area 1 / Area 2 = ({propA}/{meanProportionVal}) = ({meanProportionVal}/{propC})
                    </text>
                  </svg>
                  <p className="text-xs text-slate-400 font-mono">
                    Ratio {propA} : {meanProportionVal} ≡ {meanProportionVal} : {propC}
                  </p>
                </div>
              </div>
            )}

            {/* ── LAB 4: COMPONENDO & DIVIDENDO (SVG DIAGRAM #3 INCLUDED) ── */}
            {currentSlide === 3 && (
              <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h4 className="text-base font-bold text-indigo-300">
                  The Four Named Proportion Operations for a/b = c/d
                </h4>

                {/* SVG Visualizer #3: Componendo-Dividendo Balance */}
                <div className="w-full bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                  <div className="flex justify-between w-full max-w-md items-center mb-2">
                    <span className="text-xs font-mono font-bold text-amber-300">SVG #3: RATIO TRANSFORMATION BALANCE</span>
                    <div className="flex gap-4 text-xs font-mono">
                      <span>a={compA}, b={compB}</span>
                      <span className="text-emerald-400">(a+b)/(a-b) = {(compA + compB) / (compA - compB)}</span>
                    </div>
                  </div>

                  <div className="w-full max-w-md mb-3 flex gap-4">
                    <div className="flex-1">
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Numerator a:</span> <span>{compA}</span>
                      </label>
                      <input
                        type="range"
                        min={3}
                        max={12}
                        value={compA}
                        onChange={(e) => setCompA(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-slate-400 flex justify-between">
                        <span>Denominator b:</span> <span>{compB}</span>
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={Math.max(1, compA - 1)}
                        value={compB}
                        onChange={(e) => setCompB(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <svg viewBox="0 0 400 160" className="w-full max-w-md">
                    <rect width="400" height="160" fill="#0b1120" rx="10" stroke="#334155" />

                    {/* Scale balance fulcrum */}
                    <polygon points="200,130 185,150 215,150" fill="#64748b" />
                    <line x1="60" y1="130" x2="340" y2="130" stroke="#94a3b8" strokeWidth="3" />

                    {/* Left Plate (Componendo: a + b) */}
                    <rect x="70" y={100 - (compA + compB) * 3} width="70" height={(compA + compB) * 3} fill="#0ea5e9" opacity="0.8" rx="4" />
                    <text x="105" y="95" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                      a+b = {compA + compB}
                    </text>

                    {/* Right Plate (Dividendo: a - b) */}
                    <rect x="260" y={100 - Math.max(1, compA - compB) * 3} width="70" height={Math.max(1, compA - compB) * 3} fill="#f43f5e" opacity="0.8" rx="4" />
                    <text x="295" y="95" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                      a-b = {compA - compB}
                    </text>

                    <text x="200" y="30" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      (a + b) / (a - b) = {((compA + compB) / Math.max(1, compA - compB)).toFixed(2)}
                    </text>
                  </svg>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-cyan-400">1. Invertendo</p>
                    <p className="text-sm font-mono text-white mt-1">b/a = d/c</p>
                    <p className="text-xs text-slate-400 mt-1">Take reciprocal on both sides.</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-indigo-400">2. Alternendo</p>
                    <p className="text-sm font-mono text-white mt-1">a/c = b/d</p>
                    <p className="text-xs text-slate-400 mt-1">Swap the middle means.</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-amber-400">3. Componendo</p>
                    <p className="text-sm font-mono text-white mt-1">(a+b)/b = (c+d)/d</p>
                    <p className="text-xs text-slate-400 mt-1">Add denominator to numerator.</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-emerald-400">4. Dividendo</p>
                    <p className="text-sm font-mono text-white mt-1">(a-b)/b = (c-d)/d</p>
                    <p className="text-xs text-slate-400 mt-1">Subtract denominator from numerator.</p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-indigo-950 to-slate-900 rounded-xl border border-indigo-700/50">
                  <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Combined Powerhouse:</p>
                  <p className="text-lg font-black text-amber-300 font-mono mt-1">
                    (a + b) / (a - b) = (c + d) / (c - d)
                  </p>
                  <p className="text-xs text-slate-300 mt-2">
                    Directly solves fraction structures like (x + k)/(x - k) = q/r in one stroke without messy binomial expansions!
                  </p>
                </div>
              </div>
            )}

            {/* ── LAB 5: REMAINDER & FACTOR THEOREM PROBE ── */}
            {currentSlide === 4 && (
              <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center">
                  <h4 className="text-base font-bold text-indigo-300">
                    Polynomial f(x) = {polyA}x³ + ({polyB})x² + ({polyC})x + ({polyD})
                  </h4>
                  <span className="text-xs font-mono bg-slate-800 px-3 py-1 rounded-full text-cyan-300">
                    Target Divisor: (x - a)
                  </span>
                </div>

                <div>
                  <label className="text-xs text-slate-300 flex justify-between">
                    <span>Move substitution probe (a):</span>
                    <span className="font-bold text-amber-300 font-mono">a = {testA}</span>
                  </label>
                  <input
                    type="range"
                    min={-3}
                    max={3}
                    step={1}
                    value={testA}
                    onChange={(e) => setTestA(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                  <p className="text-slate-300">
                    f({testA}) = {polyA}({testA})³ + ({polyB})({testA})² + ({polyC})({testA}) + ({polyD})
                  </p>
                  <p className="text-slate-300">
                    = {polyA * Math.pow(testA, 3)} + {polyB * Math.pow(testA, 2)} + {polyC * testA} + {polyD}
                  </p>
                  <p
                    className={`text-lg font-black pt-2 border-t border-slate-800 ${
                      polynomialVal === 0 ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    Remainder R = f({testA}) = {polynomialVal}
                  </p>
                  {polynomialVal === 0 ? (
                    <p className="text-emerald-400 font-sans font-bold">
                      🎉 Since f({testA}) = 0, (x - {testA}) IS AN EXACT FACTOR by the Factor Theorem!
                    </p>
                  ) : (
                    <p className="text-slate-400 font-sans">
                      Since f({testA}) ≠ 0, (x - {testA}) leaves remainder {polynomialVal} and is NOT a factor.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Controls */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
              >
                ← Previous Lab
              </motion.button>

              <span className="text-xs text-slate-400 font-mono">
                {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide((s) => s + 1);
                    audioManager.play('tap');
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20"
                >
                  Enter Free Sandbox Mode →
                </motion.button>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── 3. FREE SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.section
          key="sandbox-phase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <h3 className="text-xl font-black text-emerald-400">Free Exploration Sandbox</h3>
                <p className="text-xs text-slate-400">
                  Zero pressure, no timers, no grading. Tune any equation or test proportions freely.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResetLab}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-300"
              >
                Reset Default Values
              </motion.button>
            </div>

            {/* Sandbox Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('parabola')}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${
                  activeTab === 'parabola' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Quadratic & Parabola
              </button>
              <button
                onClick={() => setActiveTab('proportion')}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${
                  activeTab === 'proportion' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Continued Proportion
              </button>
              <button
                onClick={() => setActiveTab('remainder')}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${
                  activeTab === 'remainder' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Polynomial Roots
              </button>
            </div>

            {/* Active Sandbox View */}
            {activeTab === 'parabola' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-400">Interactive Controls</h4>
                  <div>
                    <label className="text-xs text-slate-300">a: {sliderA}</label>
                    <input
                      type="range"
                      min={-3}
                      max={3}
                      value={sliderA}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSliderA(val === 0 ? 1 : val);
                      }}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300">b: {sliderB}</label>
                    <input
                      type="range"
                      min={-6}
                      max={6}
                      value={sliderB}
                      onChange={(e) => setSliderB(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300">c: {sliderC}</label>
                    <input
                      type="range"
                      min={-8}
                      max={8}
                      value={sliderC}
                      onChange={(e) => setSliderC(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                  <p className="text-indigo-300 font-bold">Real-time Computed Properties:</p>
                  <p className="text-slate-200">
                    Standard Form: {sliderA}x² {sliderB >= 0 ? `+ ${sliderB}` : `- ${Math.abs(sliderB)}`}x{' '}
                    {sliderC >= 0 ? `+ ${sliderC}` : `- ${Math.abs(sliderC)}`} = 0
                  </p>
                  <p className="text-amber-300">Discriminant D: {discriminant}</p>
                  <p className="text-emerald-400">
                    Roots: {roots.r1 !== null ? `x₁ = ${roots.r1}, x₂ = ${roots.r2}` : 'No Real Roots'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'proportion' && (
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300">Extreme a: {propA}</label>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      value={propA}
                      onChange={(e) => setPropA(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300">Extreme c: {propC}</label>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      value={propC}
                      onChange={(e) => setPropC(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl text-center">
                  <p className="text-xs text-slate-400">Mean Proportional b = √(ac)</p>
                  <p className="text-xl font-bold text-amber-300 font-mono">
                    b = √({propA} × {propC}) = {meanProportionVal}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'remainder' && (
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <label className="text-xs text-slate-300">Evaluate f(x) = x³ - 2x² - 5x + 6 at x = {testA}</label>
                <input
                  type="range"
                  min={-3}
                  max={3}
                  value={testA}
                  onChange={(e) => setTestA(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="p-4 bg-slate-900 rounded-xl text-xs font-mono space-y-1">
                  <p className="text-slate-200">f({testA}) = {polynomialVal}</p>
                  <p className={polynomialVal === 0 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                    {polynomialVal === 0 ? `(x - ${testA}) IS a factor!` : `Remainder = ${polynomialVal}`}
                  </p>
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAdvanceToChallenge}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl font-black text-sm tracking-wide shadow-xl flex items-center justify-center gap-2"
            >
              Ready to Take the Competency Challenges! 🎯
            </motion.button>
          </div>
        </motion.section>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.section
          key="challenge-phase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* HUD Status Canvas */}
          <canvas ref={canvasRef} width={400} height={28} className="w-full bg-slate-900/60 rounded-xl border border-slate-800" />

          {/* Progress Header */}
          <div className="flex justify-between items-center bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono text-slate-400">
                CHALLENGE {currentChallenge + 1} OF {filteredChallenges.length}
              </span>
              <h3 className="text-base font-bold text-white">Competency Level: {challenge.competencyLevel.toUpperCase()}</h3>
            </div>

            <div className="flex items-center gap-2">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : difficulty === 'standard'
                    ? 'bg-blue-950 text-blue-400 border border-blue-800'
                    : 'bg-purple-950 text-purple-400 border border-purple-800'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="text-xs font-mono text-slate-400">
                Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-3xl border space-y-5 shadow-2xl transition-all ${
              wrongFlash
                ? 'bg-rose-950/40 border-rose-500'
                : 'border-slate-800'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg p-2 bg-indigo-950 rounded-xl border border-indigo-800 text-indigo-400 font-mono">
                Q{currentChallenge + 1}
              </span>
              <div>
                <p className="text-base md:text-lg font-semibold text-slate-100 leading-snug">{challenge.question}</p>
                <span className="text-xs text-indigo-400 font-mono mt-1 block">Topic Node: {challenge.nodeId}</span>
              </div>
            </div>

            {/* 1. MCQ OPTIONS */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                          : 'bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. DRAG LABEL ON DIAGRAM */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 w-full mb-1">Drag items to correct targets:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-indigo-700/80 hover:bg-indigo-600 rounded-xl text-xs font-bold text-white cursor-grab shadow-md border border-indigo-500/40"
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['target_pos', 'target_zero', 'target_neg'].map((targetId) => {
                    const titleMap: Record<string, string> = {
                      target_pos: 'D > 0 (Positive)',
                      target_zero: 'D = 0 (Zero)',
                      target_neg: 'D < 0 (Negative)',
                    };
                    return (
                      <div
                        key={targetId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className={`p-4 rounded-2xl border-2 border-dashed text-center min-h-[110px] flex flex-col items-center justify-center transition-colors ${
                          droppedLabels[targetId]
                            ? 'bg-indigo-950/50 border-emerald-500 text-emerald-300'
                            : 'bg-slate-950/60 border-slate-700 text-slate-500'
                        }`}
                      >
                        <p className="text-xs font-mono font-bold mb-1">{titleMap[targetId]}</p>
                        <span className="text-sm font-bold text-white">
                          {droppedLabels[targetId] || 'Drop matching condition here'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Verify Target Placements
                </motion.button>
              </div>
            )}

            {/* 3. DRAG SORT STEPS */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <span className="text-xs text-slate-400">Drag to rearrange sequence into correct workflow:</span>
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
                      className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                    >
                      <span className="p-1 bg-indigo-950 rounded text-indigo-400 font-bold">{displayIndex + 1}</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Confirm Process Order
                </motion.button>
              </div>
            )}

            {/* 4. NUMERIC INPUT */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    aria-label="Numerical answer input"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500 w-64"
                  />
                  {challenge.unit && <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. CONSTRUCT FORMULA */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-indigo-400 font-mono">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-700/50 rounded-lg text-xs font-mono text-indigo-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex items-center flex-wrap gap-2">
                  {constructParts.map((part, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-mono flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((p) => p.filter((_, i) => i !== idx))}
                        className="text-rose-300 font-bold hover:text-rose-100"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-600 text-xs italic font-mono">Click formula fragments above...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Verify Constructed Identity
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-gradient-to-br from-indigo-950/70 to-slate-900 border border-indigo-800/80 rounded-2xl space-y-3 shadow-inner"
              >
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <span>📘</span> Step-by-Step Rigorous Mathematical Breakdown:
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-slate-200 text-xs md:text-sm font-medium leading-relaxed"
                    >
                      <strong className="text-indigo-400 font-mono mr-1">{idx + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex justify-between items-center flex-wrap gap-2">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleRevealNextStep}
                      className="px-4 py-2 bg-indigo-700/60 hover:bg-indigo-600 rounded-xl text-xs font-bold text-white"
                    >
                      Show Next Derivation Step →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30 ml-auto"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Portfolio →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── 5. COMPLETION, MOTIVATIONAL FEEDBACK & REFLECTION PHASE ─── */}
      {phase === 'complete' && (
        <motion.section
          key="complete-phase"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-4 shadow-2xl">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">ICSE Algebra Mastery Portfolio Achieved!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have successfully completed the rigorous curriculum module for ICSE Class 10 Quadratic Equations, Continued Proportions, Componendo-Dividendo transformations, and Remainder/Factor theorems.
            </p>

            <div className="flex justify-center gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <p className="text-xs text-slate-400">Final Score</p>
                <p className="text-2xl font-black text-emerald-400 font-mono">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <p className="text-xs text-slate-400">Mastery Level</p>
                <p className="text-2xl font-black text-cyan-400 font-mono uppercase">{masteryLevel}</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <p className="text-xs text-slate-400">Total Errors</p>
                <p className="text-2xl font-black text-amber-400 font-mono">{errors}</p>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK SECTION (Explicit 4-tier error categories) */}
          <div
            className={`p-6 rounded-2xl border text-center shadow-lg ${
              errors === 0
                ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200'
                : errors <= 3
                ? 'bg-blue-950/60 border-blue-500/80 text-blue-200'
                : errors <= 7
                ? 'bg-amber-950/60 border-amber-500/80 text-amber-200'
                : 'bg-rose-950/60 border-rose-500/80 text-rose-200'
            }`}
          >
            <h3 className="text-xl font-black tracking-wide uppercase mb-1">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-xs md:text-sm font-medium opacity-90">
              {errors === 0
                ? 'Flawless execution! You mastered every quadratic model, proportion identity, and theorem with total precision.'
                : errors <= 3
                ? 'You demonstrated strong mathematical comprehension across quadratic equations and algebraic proportions.'
                : errors <= 7
                ? 'You persevered through challenging multi-step polynomial derivations. A quick review will solidify your skills.'
                : 'Mathematics requires iterative practice. Revisit the exploration labs and step through the hints to build mastery!'}
            </p>
          </div>

          {/* SPACED REPETITION SCHEDULE & VISIBILITY BANNER */}
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-indigo-950/50 rounded-3xl border border-amber-500/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 bg-amber-900/50 rounded-xl border border-amber-700/60 text-amber-300">
                  📅
                </span>
                <div>
                  <h3 className="text-base font-bold text-amber-300">
                    Spaced Repetition Review Schedule (SM-2 Algorithm)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Adaptive memory retention timeline based on your performance ({errors} error{errors === 1 ? '' : 's'})
                  </p>
                </div>
              </div>
              <div className="px-3 py-1.5 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-200 text-xs font-mono font-bold tracking-wider uppercase">
                SRS Active
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  errors === 0
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase">0 Errors (Mastery)</span>
                  {errors === 0 && <span className="text-xs font-bold text-emerald-400">● CURRENT</span>}
                </div>
                <p className="text-xl font-black text-emerald-300 font-mono">Review in 7 days</p>
                <p className="text-[11px] mt-1 text-slate-300">Long interval: Memory traces are consolidated strongly.</p>
              </div>

              <div
                className={`p-4 rounded-2xl border transition-all ${
                  errors >= 1 && errors <= 3
                    ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200 ring-2 ring-cyan-500/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase">1–3 Errors (Solid)</span>
                  {errors >= 1 && errors <= 3 && <span className="text-xs font-bold text-cyan-400">● CURRENT</span>}
                </div>
                <p className="text-xl font-black text-cyan-300 font-mono">Review in 3 days</p>
                <p className="text-[11px] mt-1 text-slate-300">Medium interval: Reinforce slight algebraic ambiguities soon.</p>
              </div>

              <div
                className={`p-4 rounded-2xl border transition-all ${
                  errors >= 4
                    ? 'bg-rose-950/70 border-rose-500 text-rose-200 ring-2 ring-rose-500/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase">4+ Errors (Practice)</span>
                  {errors >= 4 && <span className="text-xs font-bold text-rose-400">● CURRENT</span>}
                </div>
                <p className="text-xl font-black text-rose-300 font-mono">Review in 1 day</p>
                <p className="text-[11px] mt-1 text-slate-300">Short interval: Immediate retrieval tomorrow to prevent decay.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
              <span className="text-amber-400 font-bold">⏰ Next Scheduled Session:</span>
              <span>
                Your personalized next review is scheduled for{' '}
                <strong className="text-amber-300 font-mono">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>{' '}
                from today.
              </span>
            </div>
          </div>

          {/* REFLECTION SECTION (3 Required Prompts) */}
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-indigo-800/60 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
              <span>💭</span> Structured Metacognitive Reflection
            </div>

            <div className="space-y-4">
              {/* Question 1 */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-slate-200 mb-1.5">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflections.surprising}
                  onChange={(e) => setReflections((prev) => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. How the discriminant instantly reveals if a trajectory cuts or misses the ground..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs md:text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none h-20"
                />
              </div>

              {/* Question 2 */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-slate-200 mb-1.5">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflections.explain}
                  onChange={(e) => setReflections((prev) => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. Componendo and Dividendo combines addition and subtraction of fractions to eliminate unknown terms in one step..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs md:text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none h-20"
                />
              </div>

              {/* Question 3 */}
              <div>
                <label className="block text-xs md:text-sm font-semibold text-slate-200 mb-1.5">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflections.realLife}
                  onChange={(e) => setReflections((prev) => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. Calculating peak height for sports projectile arcs or fuel ratios in aerospace engineering..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs md:text-sm text-slate-200 focus:outline-none focus:border-indigo-500 resize-none h-20"
                />
              </div>
            </div>
          </div>

          {/* Misconception Tracking Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-3xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <span>⚠️</span> Targeted Diagnostic Review Items:
              </h3>
              {hitMisconceptions.map((idx) => {
                const item = misconceptions?.[idx];
                if (!item) return null;
                return (
                  <div key={idx} className="p-4 bg-slate-900/90 rounded-2xl border border-rose-900/40 text-xs space-y-1">
                    <p className="text-rose-300 font-bold">❌ Misconception: {item.misconception}</p>
                    <p className="text-emerald-300">✓ ICSE Correction: {item.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real World Capstone Project */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-3xl border border-indigo-700/40 space-y-3">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>🛰️</span> Capstone: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-mono text-indigo-400 font-bold">{i + 1}.</span> {st}
                </li>
              ))}
            </ul>
          </div>

          {/* Restart Session */}
          <div className="text-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('discovery');
                setCurrentSlide(0);
                setCurrentChallenge(0);
                setScoreBreakdown({ correct: 0, total: 0 });
                setErrors(0);
                setHitMisconceptions([]);
                setDiscoveryAnswered(false);
                setReflections({ surprising: '', explain: '', realLife: '' });
                audioManager.play('whoosh');
              }}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30"
            >
              Restart Simulation Module ↺
            </motion.button>
          </div>
        </motion.section>
      )}

      {/* ─── MODALS & FLOATING FEEDBACK ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Confirmed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_MathematicsQuadraticEquationsIntroductionSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// ���── NODE IDS AS STRING LITERALS ───
const NODE_C9_MATH_001 = 'c9_math_001';
const NODE_C9_MATH_002 = 'c9_math_002';
const NODE_C9_MATH_003 = 'c9_math_003';
const NODE_C9_MATH_004 = 'c9_math_004';
const NODE_C9_MATH_005 = 'c9_math_005';
const NODE_C9_MATH_006 = 'c9_math_006';
const NODE_C9_MATH_007 = 'c9_math_007';
const NODE_C9_MATH_008 = 'c9_math_008';
const NODE_C9_MATH_009 = 'c9_math_009';
const NODE_C9_MATH_010 = 'c9_math_010';

const ALL_NODE_IDS = [
  NODE_C9_MATH_001,
  NODE_C9_MATH_002,
  NODE_C9_MATH_003,
  NODE_C9_MATH_004,
  NODE_C9_MATH_005,
  NODE_C9_MATH_006,
  NODE_C9_MATH_007,
  NODE_C9_MATH_008,
  NODE_C9_MATH_009,
  NODE_C9_MATH_010,
];

// ─── PREDICTION QUESTIONS (Predict-then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If you double the principal P in compound interest, how does the final compound interest (CI) after 2 years change at the same rate r?',
    options: [
      'CI doubles exactly (linear scaling with P)',
      'CI quadruples (quadratic scaling with P)',
      'CI remains constant because rate is unchanged',
      'CI increases by √2 times',
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 5 (Compounding Snowball), double the Principal slider from ₹10,000 to ₹20,000 and observe how the total CI doubles proportionally.',
    explanation: 'Since Amount A = P(1 + r/100)ⁿ and CI = P[(1 + r/100)ⁿ - 1], CI is directly proportional to principal P when rate and time are held constant.',
  },
  {
    id: 'pred_2',
    question: 'When simplifying a surd like √72, what happens when you factor out the largest perfect square factor (36) compared to a smaller one (9)?',
    options: [
      'Factoring 36 immediately leaves the smallest possible square-free radicand (√2)',
      'Factoring 9 is required first because 9 is an odd square',
      'Both methods give completely different numerical results',
      'Factoring 36 results in a fractional surd',
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 3 (Surd Unpacker), set the radicand slider to 72 and observe how the engine extracts 36 = 6² to leave the irreducible surd 6√2.',
    explanation: 'Extracting the largest perfect square factor (36) directly reduces √72 to lowest mixed surd form 6√2 in a single step.',
  },
];

// ─── OBSERVATION QUESTIONS (What do you notice? Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'Looking at the Theodorus Spiral construction, what is the geometric relationship between each successive hypotenuse and the next right triangle?',
    options: [
      'Each hypotenuse becomes the base leg for the next unit-altitude right triangle',
      'Each hypotenuse is parallel to the horizontal number line',
      'The triangles get smaller and smaller as the hypotenuse increases',
      'The altitude doubles at every single step',
    ],
    observableOptions: [
      'Each hypotenuse becomes the base leg for the next unit-altitude right triangle',
      'Each hypotenuse is parallel to the horizontal number line',
      'The triangles get smaller and smaller as the hypotenuse increases',
      'The altitude doubles at every single step',
    ],
    correctIndex: 0,
    explanation: 'In the Spiral of Theodorus, the hypotenuse of length √k becomes the base leg of the next triangle with unit altitude 1, generating √(k+1).',
  },
  {
    id: 'obs_2',
    question: 'In the Compound Interest growth curves over time, what do you observe about the gap between Simple Interest and Compound Interest as years increase?',
    options: [
      'The gap widens at an accelerating exponential rate each year',
      'The gap stays exactly constant every year',
      'Simple Interest overtakes Compound Interest after year 3',
      'The gap narrows and becomes zero',
    ],
    observableOptions: [
      'The gap widens at an accelerating exponential rate each year',
      'The gap stays exactly constant every year',
      'Simple Interest overtakes Compound Interest after year 3',
      'The gap narrows and becomes zero',
    ],
    correctIndex: 0,
    explanation: 'Because interest earned in earlier periods is added to the principal base, compound interest grows exponentially, widening the gap over linear simple interest.',
  },
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Royal Treasury & The Architect of Infinity',
  intro: 'In ancient Pataliputra, the royal treasury needs to calculate compound tax revenues on growing crop yields, while the Chief Architect is constructing sacred geometric altars whose diagonal lengths defy rational fractions. You are appointed Master Mathematician to unlock real numbers, master surd constructions, and engineer compounding growth.',
  context: 'Discover why some lengths cannot be measured by simple fractions, construct the spiral of Theodorus on the real number line, rationalize radical denominators, and master the compounding power of wealth growth.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If you build a square with side exactly 1 meter, can its diagonal length be written exactly as a fraction of two integers (p/q)?',
  options: [
    'Yes, it is exactly 1.414 meters = 1414/1000',
    'Yes, it is exactly 7/5 meters',
    'No, its exact length is √2 which has non-terminating, non-repeating decimals',
    'No, diagonals cannot be measured in meters at all',
  ],
  correctIndex: 2,
  hintAfter: 'Geometric lengths like √2 can be physically drawn, yet no fraction p/q can ever describe them exactly! Let us explore the Real Number System.',
};

// ─── INTERFACES ───
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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C9_MATH_001,
  title: 'Rational & Real Numbers, Surds and Compounding Growth',
  definition: 'Real numbers comprise rational numbers (p/q with q ≠ 0, terminating or recurring decimals) and irrational numbers (non-terminating, non-recurring decimals like surds). Compounding interest applies repeated simple interest on a continuously growing principal base.',
  eli5: 'Real numbers are all points on an unbroken ruler: tidy fractions, repeating decimals, and wild roots like √2 that never repeat. Compounding is money growing like a rolling snowball, where past gains generate their own future gains.',
  misconceptions: [
    {
      misconception: 'π is rational because it equals 22/7.',
      correction: '22/7 is merely a convenient rational approximation of π. π is truly irrational with non-terminating, non-repeating decimals.',
    },
    {
      misconception: 'Every radical sign represents a surd (e.g. √4 is a surd).',
      correction: 'A surd must be an irrational root. √4 = 2 is an integer and rational, so it is not a surd.',
    },
    {
      misconception: 'To rationalize 1/(a + √b), multiply numerator and denominator by (a + √b).',
      correction: 'Multiplying by the same binomial creates cross-terms. You must multiply by the conjugate (a - √b) to use the difference of squares (a² - b).',
    },
    {
      misconception: 'In compound interest, Year 2 interest equals Year 1 interest.',
      correction: 'In CI, the principal grows every period as interest is added, so each successive period earns more interest than the previous period.',
    },
    {
      misconception: 'For half-yearly compounding, just double the time n without changing the rate.',
      correction: 'For half-yearly compounding, you must halve the annual rate (r/2) AND double the number of periods (2n).',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which of the following is an irrational number?',
      options: ['0.333...', '√9', '√7', '22/7'],
      correctIndex: 2,
    },
    {
      question: 'What is the simplest mixed surd form of √72?',
      options: ['3√8', '2√18', '6√2', '√36 × 2'],
      correctIndex: 2,
    },
    {
      question: 'What is the conjugate of the binomial surd (3 + √5)?',
      options: ['(3 + √5)', '(-3 - √5)', '(3 - √5)', '(√5 - 3)'],
      correctIndex: 2,
    },
    {
      question: 'What is the compound interest on ₹10,000 at 10% per annum for 2 years compounded annually?',
      options: ['₹2,000', '₹2,100', '₹12,100', '₹2,200'],
      correctIndex: 1,
    },
    {
      question: 'In the proof by contradiction that √2 is irrational, assuming p/q in lowest terms leads to:',
      options: ['p is odd, q is even', 'both p and q are even, contradicting coprimality', 'p² = q²', 'q = 0'],
      correctIndex: 1,
    },
    {
      question: 'When interest is compounded half-yearly for 1.5 years at 12% p.a., what are r_effective and n_periods?',
      options: ['r = 12%, n = 1.5', 'r = 6%, n = 3', 'r = 6%, n = 1.5', 'r = 24%, n = 3'],
      correctIndex: 1,
    },
    {
      question: 'The difference between CI and SI on ₹5,000 for 2 years at 10% p.a. is:',
      options: ['₹50', '₹100', '₹25', '₹500'],
      correctIndex: 0,
    },
    {
      question: 'Every integer n is a rational number because:',
      options: ['It is greater than zero', 'It can be written as n/1 where n, 1 are integers and 1 ≠ 0', 'It has no decimal point', 'It is on the right of 0'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Master real numbers classification, Pythagoras compass surd construction, surd simplification, rationalization, proof by contradiction, and direct/inverse compound interest equations.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Real Number System Universe',
    instruction: 'Click each layer of the nested number system to examine its members and properties.',
    interactionType: 'click-hierarchy',
    nodeId: NODE_C9_MATH_001,
  },
  {
    title: '2. The Geometric Root Ladder (Spiral of Theodorus)',
    instruction: 'Step through the right-triangle ladder to see how Pythagoras generates exact surd lengths on the number line.',
    interactionType: 'pythagoras-ladder',
    nodeId: NODE_C9_MATH_003,
  },
  {
    title: '3. Surd Unpacker & Simplifier',
    instruction: 'Drag the radicand slider to extract perfect squares and convert pure surds into simplest mixed form.',
    interactionType: 'surd-unpacker',
    nodeId: NODE_C9_MATH_004,
  },
  {
    title: '4. Conjugate Rationalizer Balance',
    instruction: 'Toggle conjugate multipliers to eliminate square roots from denominators using the Difference of Squares (a² - b).',
    interactionType: 'conjugate-balance',
    nodeId: NODE_C9_MATH_005,
  },
  {
    title: '5. The Compounding Snowball Engine',
    instruction: 'Adjust Principal, Rate, and Compounding Frequency to observe year-by-year growing interest vs Simple Interest.',
    interactionType: 'ci-snowball',
    nodeId: NODE_C9_MATH_007,
  },
];

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION (1 - 7)
  {
    id: 'ch_math_01',
    nodeId: NODE_C9_MATH_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following numbers belongs to the set of Rational Numbers (Q)?',
    options: ['-7 = -7/1', '√3', 'π', '0.1010010001...'],
    correctIndex: 0,
    explanation: 'Every integer n is rational because it can be expressed as n/1 with non-zero integer denominator.',
    hints: [
      'A rational number must be expressible as p/q with integers p and q (q ≠ 0).',
      'Check which number can be written as a simple fraction with integer numerator and denominator.',
      '-7 = -7/1 satisfies the p/q rule perfectly.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_math_02',
    nodeId: NODE_C9_MATH_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is the decimal 0.272727... (0.2̄7̄) classified as a rational number?',
    options: [
      'Because it terminates after two decimal places',
      'Because it is non-terminating but recurring, which equals the fraction 3/11',
      'Because all decimals with 7 are rational',
      'It is actually irrational because it goes on forever',
    ],
    correctIndex: 1,
    explanation: 'Non-terminating recurring decimals are always rational. If x = 0.2727..., 100x = 27.2727..., so 99x = 27 -> x = 27/99 = 3/11.',
    hints: [
      'Does this decimal repeat a regular block of digits forever?',
      'Let x = 0.2727... and subtract x from 100x.',
      '99x = 27 gives x = 3/11 (a p/q fraction).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_math_03',
    nodeId: NODE_C9_MATH_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following expressions is NOT a surd?',
    options: ['√5', '√12', '√16', '∛7'],
    correctIndex: 2,
    explanation: '√16 evaluates to the rational integer 4. A surd must be an irrational root.',
    hints: [
      'A surd is an irrational root. If the radicand is a perfect square, it is not a surd.',
      'Check if any radicand simplifies to an exact integer.',
      '√16 = 4, so it is rational and NOT a surd.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_math_04',
    nodeId: NODE_C9_MATH_004,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Simplify the pure surd √50 into its simplest mixed form a√b. What is the integer coefficient a?',
    correctAnswer: 5,
    tolerance: 0,
    unit: '',
    explanation: '√50 = √(25 × 2) = √25 × √2 = 5√2. The coefficient a is 5.',
    hints: [
      'Find the largest perfect square that divides 50.',
      '50 = 25 × 2. Take √25 outside the radical sign.',
      '√25 = 5, leaving √2 inside.',
    ],
  },
  {
    id: 'ch_math_05',
    nodeId: NODE_C9_MATH_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the conjugate surd of (5 - √3)?',
    options: ['(5 + √3)', '(-5 - √3)', '-(5 - √3)', '(√3 - 5)'],
    correctIndex: 0,
    explanation: 'The conjugate of a binomial surd is formed by flipping the sign of the radical term: (5 - √3) -> (5 + √3).',
    hints: [
      'To form the conjugate of (a - √b), reverse the central mathematical sign.',
      'The conjugate of (a - √b) is (a + √b).',
      'Change the minus sign to plus: (5 + √3).',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_math_06',
    nodeId: NODE_C9_MATH_007,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Calculate simple interest on ₹4,000 at 5% per annum for 1 year in rupees.',
    correctAnswer: 200,
    tolerance: 0,
    unit: '₹',
    explanation: 'SI = (P × R × T)/100 = (4000 × 5 × 1)/100 = ₹200.',
    hints: [
      'Use the formula SI = (P × R × T)/100.',
      'Substitute P = 4000, R = 5, T = 1.',
      '(4000 × 5)/100 = 200.',
    ],
  },
  {
    id: 'ch_math_07',
    nodeId: NODE_C9_MATH_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the formula A = P(1 + r/100)ⁿ, what does the factor (1 + r/100) represent?',
    options: [
      'The simple interest per year',
      'The annual growth multiplier for each rupee invested',
      'The total number of years',
      'The depreciation rate',
    ],
    correctIndex: 1,
    explanation: '(1 + r/100) is the annual growth factor by which the principal is multiplied each compounding year.',
    hints: [
      'If you have ₹1, after 1 year at r% you have 1 + r/100 rupees.',
      'It acts as the multiplying factor that compounds over n years.',
      'It is called the growth factor / growth multiplier.',
    ],
  },

  // STANDARD (8 - 15)
  {
    id: 'ch_math_08',
    nodeId: NODE_C9_MATH_003,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag the correct geometric side lengths to their corresponding roles in constructing √2 and √3 on the number line.',
    dragItems: [
      { label: 'Unit base = 1', targetId: 'slot_base' },
      { label: 'Unit altitude = 1', targetId: 'slot_alt1' },
      { label: 'Hypotenuse = √2', targetId: 'slot_hyp1' },
      { label: 'Hypotenuse = √3', targetId: 'slot_hyp2' },
    ],
    correctMapping: {
      slot_base: 'Unit base = 1',
      slot_alt1: 'Unit altitude = 1',
      slot_hyp1: 'Hypotenuse = √2',
      slot_hyp2: 'Hypotenuse = √3',
    },
    explanation: 'By Pythagoras: 1² + 1² = (√2)². Then (√2)² + 1² = 2 + 1 = 3 = (√3)². Arcs transfer these exact hypotenuse lengths to the number line.',
    hints: [
      'Start with a right triangle of legs 1 and 1. Its hypotenuse is √(1+1) = √2.',
      'Next, erect a unit perpendicular (1) on the √2 segment to form a triangle of hypotenuse √(2+1) = √3.',
      'Match each label to the base, first altitude, first hypotenuse, and second hypotenuse.',
    ],
  },
  {
    id: 'ch_math_09',
    nodeId: NODE_C9_MATH_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Rationalize the denominator of 1/(2 + √3). What is the fully simplified result?',
    options: ['2 - √3', '(2 - √3)/7', '2 + √3', '(2 - √3)/4'],
    correctIndex: 0,
    explanation: 'Multiply top and bottom by (2 - √3): 1(2 - √3) / ((2)² - (√3)²) = (2 - √3) / (4 - 3) = 2 - √3.',
    hints: [
      'Multiply numerator and denominator by conjugate (2 - √3).',
      'Denominator becomes 2² - (√3)² = 4 - 3.',
      'Since 4 - 3 = 1, the fraction simplifies to 2 - √3.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_math_10',
    nodeId: NODE_C9_MATH_006,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the logical steps in the proof by contradiction that √2 is irrational:',
    sortItems: [
      'Assume √2 = p/q where p, q are coprime integers (q ≠ 0)',
      'Square both sides to obtain p² = 2q², implying p² is even, so p is even (p = 2k)',
      'Substitute p = 2k to get 4k² = 2q² => q² = 2k², implying q is even',
      'Conclude contradiction: both p and q are even, violating coprimality; hence √2 is irrational',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Proof by contradiction: Assume rational in lowest terms -> deduce numerator is even -> back-substitute -> deduce denominator is even -> contradict coprime assumption.',
    hints: [
      'Start with the assumption that √2 is rational (p/q coprime).',
      'Square both sides and deduce p is divisible by 2.',
      'Substitute p = 2k to prove q is also divisible by 2.',
      'Conclude with the contradiction.',
    ],
  },
  {
    id: 'ch_math_11',
    nodeId: NODE_C9_MATH_007,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Using the step-by-step growing principal method, find the compound interest on ₹8,000 at 5% p.a. for 2 years (in ₹).',
    correctAnswer: 820,
    tolerance: 0,
    unit: '₹',
    explanation: 'Year 1: SI = (8000 × 5 × 1)/100 = ₹400. New P = ₹8,400. Year 2: SI = (8400 × 5 × 1)/100 = ₹420. Total CI = 400 + 420 = ₹820.',
    hints: [
      'Calculate Year 1 interest: 5% of 8000 = 400.',
      'Add to principal: Year 2 Principal is 8400.',
      'Calculate Year 2 interest: 5% of 8400 = 420. Add both years: 400 + 420 = 820.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_math_12',
    nodeId: NODE_C9_MATH_008,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the total Amount A on ₹20,000 invested at 10% p.a. for 2 years compounded annually (in ₹).',
    correctAnswer: 24200,
    tolerance: 0,
    unit: '₹',
    explanation: 'A = P(1 + r/100)ⁿ = 20000(1.10)² = 20000 × 1.21 = ₹24,200.',
    hints: [
      'Use formula A = P(1 + r/100)ⁿ.',
      'A = 20000 × (1.10)²',
      '20000 × 1.21 = 24200.',
    ],
  },
  {
    id: 'ch_math_13',
    nodeId: NODE_C9_MATH_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the Amount when ₹4,000 is compounded half-yearly at 10% p.a. for 1 year (in ₹).',
    correctAnswer: 4410,
    tolerance: 0,
    unit: '₹',
    explanation: 'Half-yearly rate = 10/2 = 5%. Periods = 1 × 2 = 2. A = 4000(1 + 5/100)² = 4000(1.05)² = 4000 × 1.1025 = ₹4,410.',
    hints: [
      'Halve the rate: 10% / 2 = 5%. Double the time: 1 year = 2 periods.',
      'Formula: A = 4000(1.05)²',
      '4000 × 1.1025 = 4410.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_math_14',
    nodeId: NODE_C9_MATH_010,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The difference between CI and SI on ₹10,000 for 2 years at 10% p.a. is (in ₹):',
    correctAnswer: 100,
    tolerance: 0,
    unit: '₹',
    explanation: 'Shortcut for 2 years: Difference = P(r/100)² = 10000(10/100)² = 10000(0.01) = ₹100.',
    hints: [
      '2-year difference formula: CI - SI = P(r/100)²',
      'P = 10000, r/100 = 0.1, (r/100)² = 0.01.',
      '10000 × 0.01 = 100.',
    ],
  },
  {
    id: 'ch_math_15',
    nodeId: NODE_C9_MATH_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Simplify the mixed surd 3√72 to lowest radical form.',
    options: ['18√2', '9√8', '6√6', '36√2'],
    correctIndex: 0,
    explanation: '√72 = √(36 × 2) = 6√2. Therefore 3√72 = 3 × 6√2 = 18√2.',
    hints: [
      'Simplify √72 first by factoring out 36.',
      '√72 = 6√2.',
      'Multiply by front coefficient 3: 3 × 6√2 = 18√2.',
    ],
  },

  // ADVANCED (16 - 22)
  {
    id: 'ch_math_16',
    nodeId: NODE_C9_MATH_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Rationalize and simplify: (√5 - √2) / (√5 + √2). What is the exact result?',
    options: ['(7 - 2√10)/3', '(7 + 2√10)/3', '(3 - 2√10)/3', '1'],
    correctIndex: 0,
    explanation: 'Multiply top & bottom by (√5 - √2): Numerator = (√5 - √2)² = 5 - 2√10 + 2 = 7 - 2√10. Denominator = (√5)² - (√2)² = 5 - 2 = 3. Result: (7 - 2√10)/3.',
    hints: [
      'Multiply top and bottom by conjugate (√5 - √2).',
      'Numerator becomes (√5 - √2)² = (√5)² - 2(√5)(√2) + (√2)² = 7 - 2√10.',
      'Denominator is 5 - 2 = 3.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_math_17',
    nodeId: NODE_C9_MATH_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A sum amounts to ₹2,420 in 2 years at 10% p.a. compound interest. Find the Principal sum P (in ₹).',
    correctAnswer: 2000,
    tolerance: 0,
    unit: '₹',
    explanation: 'P = A / (1 + r/100)ⁿ = 2420 / (1.10)² = 2420 / 1.21 = ₹2,000.',
    hints: [
      'Rearrange formula: P = A / (1 + r/100)²',
      'P = 2420 / (1.10)²',
      '2420 / 1.21 = 2000.',
    ],
  },
  {
    id: 'ch_math_18',
    nodeId: NODE_C9_MATH_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'At what rate percent p.a. will ₹2,000 amount to ₹2,662 in 3 years compounded annually?',
    correctAnswer: 10,
    tolerance: 0,
    unit: '%',
    explanation: '(1 + r/100)³ = A/P = 2662/2000 = 1331/1000 = (11/10)³. So 1 + r/100 = 1.1 -> r = 10%.',
    hints: [
      'Form ratio A/P = 2662 / 2000 = 1.331.',
      'Take cube root of 1.331: ∛1.331 = 1.1.',
      '1 + r/100 = 1.1 => r/100 = 0.1 => r = 10%.',
    ],
  },
  {
    id: 'ch_math_19',
    nodeId: NODE_C9_MATH_006,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the prime divisibility step for proving √3 is irrational. Assemble the true deductive implication:',
    availableParts: ['3 divides a²', '=>', '3 is prime', '3 divides a', 'a = 3m', 'a = 2k'],
    targetState: '3 divides a² => 3 is prime => 3 divides a => a = 3m',
    validationHint: 'Connect divisibility of square to primality, then to divisibility of variable, and substitution form.',
    explanation: 'If 3 divides a², since 3 is prime, Euclid\'s lemma ensures 3 divides a, allowing substitution a = 3m.',
    hints: [
      'Start with "3 divides a²".',
      'Next state "=> 3 is prime".',
      'Then "=> 3 divides a => a = 3m".',
    ],
  },
  {
    id: 'ch_math_20',
    nodeId: NODE_C9_MATH_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'The difference between CI and SI on a certain sum for 2 years at 8% per annum is ₹32. Find the principal sum P (in ₹).',
    correctAnswer: 5000,
    tolerance: 0,
    unit: '₹',
    explanation: 'CI - SI = P(r/100)² -> 32 = P(8/100)² = P(64/10000) -> P = (32 × 10000) / 64 = ₹5,000.',
    hints: [
      'Use CI - SI = P(r/100)²',
      '32 = P × (0.08)² = P × 0.0064',
      'P = 32 / 0.0064 = 5000.',
    ],
  },
  {
    id: 'ch_math_21',
    nodeId: NODE_C9_MATH_009,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Find the Compound Interest on ₹25,000 at 12% p.a. compounded half-yearly for 1.5 years (in ₹).',
    correctAnswer: 4775.4,
    tolerance: 0.5,
    unit: '₹',
    explanation: 'r_half = 6%, n_periods = 3. A = 25000(1.06)³ = 25000 × 1.191016 = ₹29,775.40. CI = 29775.40 - 25000 = ₹4,775.40.',
    hints: [
      'Half-yearly rate = 12/2 = 6%. Periods = 1.5 × 2 = 3.',
      'Amount = 25000 × (1.06)³ = 25000 × 1.191016 = 29775.40.',
      'CI = Amount - 25000 = 4775.40.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_math_22',
    nodeId: NODE_C9_MATH_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the statement: "Between any two rational numbers on the number line, there exist infinitely many irrational numbers."',
    options: [
      'True, real numbers are dense and irrationals fill every gap between rationals',
      'False, rationals are continuous and leave no gaps',
      'False, only one irrational exists between two fractions',
      'True, but only for positive numbers',
    ],
    correctIndex: 0,
    explanation: 'Both rational and irrational numbers are dense in R. Between any two distinct real numbers lie infinitely many rational and irrational numbers.',
    hints: [
      'Think about whether you can construct numbers like q1 + (q2 - q1) × (√2 / 2) between any two rationals q1 and q2.',
      'The real number line has no holes because irrationals weave seamlessly between all rationals.',
      'The statement is completely True.',
    ],
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Financial Architect of the High-Yield Infrastructure Fund',
  description: 'Design an investment strategy for a state solar infrastructure project needing ₹50 Lakhs over 3 years. Compare an annual compounded coupon bond at 9% vs a semi-annual compounding bank deposit at 8.8%.',
  steps: [
    'Calculate total maturity yield A_annual = 50,00,000 × (1 + 0.09)³.',
    'Calculate total maturity yield A_semi = 50,00,000 × (1 + 0.044)⁶.',
    'Determine the effective annual rate (EAR) for semi-annual compounding: (1.044)² - 1 = 8.9936%.',
    'Formulate an executive recommendation on which instrument offers optimal capital growth with minimal risk.',
  ],
};

function C9_MathematicsRationalNumbersRealSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_MATH_001,
  title = DEFAULT_PROPS.title || 'Rational & Real Numbers Sim',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── BRILLIANT-STYLE INTERACTIVE LAB STATES ───
  const [selectedHierarchy, setSelectedHierarchy] = useState<'N' | 'W' | 'Z' | 'Q' | 'Irr' | 'R'>('Q');
  const [ladderStep, setLadderStep] = useState<number>(2);
  const [radicandInput, setRadicandInput] = useState<number>(72);
  const [conjugateA, setConjugateA] = useState<number>(3);
  const [conjugateB, setConjugateB] = useState<number>(2);
  const [isConjugateApplied, setIsConjugateApplied] = useState<boolean>(false);
  const [simPrincipal, setSimPrincipal] = useState<number>(10000);
  const [simRate, setSimRate] = useState<number>(10);
  const [simYears, setSimYears] = useState<number>(3);

  // ─── PREDICTION & OBSERVATION STATE ───
  const [predictionAnswers, setPredictionAnswers] = useState<Record<string, number>>({});
  const [predictionChecked, setPredictionChecked] = useState<Record<string, boolean>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<string, number>>({});
  const [observationChecked, setObservationChecked] = useState<Record<string, boolean>>({});

  // ─── REFLECTION ANSWERS STATE ───
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // ─── PREDICT & OBSERVE STATES ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── ADAPTIVE & BKT STATES ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── HINTS & CHALLENGE MECHANICS ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── INTERACTION INPUTS ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── FEEDBACK STATES ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY CURRENT DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── SURD SIMPLIFICATION COMPUTATION HELPER ───
  const surdSimplification = useMemo(() => {
    const n = Math.max(1, Math.floor(radicandInput));
    let largestSquare = 1;
    for (let i = Math.floor(Math.sqrt(n)); i >= 1; i--) {
      if (n % (i * i) === 0) {
        largestSquare = i * i;
        break;
      }
    }
    const coeff = Math.sqrt(largestSquare);
    const remainder = n / largestSquare;
    return { n, largestSquare, coeff, remainder, isPerfect: remainder === 1 };
  }, [radicandInput]);

  // ─── COMPOUND INTEREST CHART DATA COMPUTATION ───
  const compoundingChartData = useMemo(() => {
    const data = [];
    for (let yr = 0; yr <= simYears; yr++) {
      if (yr === 0) {
        data.push({
          year: `Yr 0`,
          SimpleInterestAmt: Math.round(simPrincipal),
          AnnualCIAmt: Math.round(simPrincipal),
          HalfYearlyCIAmt: Math.round(simPrincipal),
        });
      } else {
        const siVal = simPrincipal + (simPrincipal * simRate * yr) / 100;
        const ciAnn = simPrincipal * Math.pow(1 + simRate / 100, yr);
        const ciSemi = simPrincipal * Math.pow(1 + simRate / 200, yr * 2);
        data.push({
          year: `Yr ${yr}`,
          SimpleInterestAmt: Math.round(siVal),
          AnnualCIAmt: Math.round(ciAnn),
          HalfYearlyCIAmt: Math.round(ciSemi),
        });
      }
    }
    return data;
  }, [simPrincipal, simRate, simYears]);

  // ─── INITIAL LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY ON SCORE CHANGE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS 2D ANIMATION (Spiral of Theodorus / Real Line) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height - 40;
      const unitScale = 80;

      // Draw Number Line axis
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(20, cy);
      ctx.lineTo(canvas.width - 20, cy);
      ctx.stroke();

      // Draw Tick marks
      for (let i = -1; i <= 3; i++) {
        const x = cx + i * unitScale;
        ctx.strokeStyle = '#94a3b8';
        ctx.beginPath();
        ctx.moveTo(x, cy - 8);
        ctx.lineTo(x, cy + 8);
        ctx.stroke();

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${i}`, x, cy + 24);
      }

      // Draw active Pythagoras Right Triangle for ladderStep
      ctx.save();
      const originX = cx;
      const originY = cy;

      if (ladderStep === 2) {
        const p1x = originX + unitScale;
        const p1y = originY;
        const p2x = originX + unitScale;
        const p2y = originY - unitScale;

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(p1x, p1y);
        ctx.stroke();

        ctx.strokeStyle = '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.stroke();

        ctx.strokeStyle = '#ec4899';
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(p2x, p2y);
        ctx.stroke();

        const r = Math.SQRT2 * unitScale;
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.5)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(originX, originY, r, -Math.PI / 4, 0);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.arc(originX + r, originY, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('√2 ≈ 1.414', originX + r, originY - 12);
      } else if (ladderStep === 3) {
        const baseLen = Math.SQRT2 * unitScale;
        const p2x = originX + baseLen;
        const p2y = originY - unitScale;

        const r3 = Math.sqrt(3) * unitScale;
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(p2x, p2y);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(originX, originY, r3, -Math.asin(unitScale / r3), 0);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(originX + r3, originY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('√3 ≈ 1.732', originX + r3, originY - 12);
      } else if (ladderStep === 5) {
        const p2x = originX + 2 * unitScale;
        const p2y = originY - unitScale;

        const r5 = Math.sqrt(5) * unitScale;
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(p2x, p2y);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(originX, originY, r5, -Math.asin(unitScale / r5), 0);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#8b5cf6';
        ctx.beginPath();
        ctx.arc(originX + r5, originY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('√5 ≈ 2.236', originX + r5, originY - 12);
      }

      ctx.restore();
      frameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId);
  }, [ladderStep, phase]);

  // ─── CALLBACK HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You understand exact geometric roots.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToPredict = useCallback(() => {
    setPhase('predict');
    audioManager.play('whoosh');
    speechManager.speak('Make your initial mathematical predictions before checking interactive models.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the real number system and the compounding engine.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter the free sandbox to test surd unpacking, conjugate rationalization, and compounding curves.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Prepare for challenges. Read carefully and extract exact values.');
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
      speechManager.speak('Let us analyze the complete step-by-step ICSE solution.');
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

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered Rational and Real Numbers, Surds, and Compounding!');
  }, [errors, onComplete]);

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
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Excellent deduction! That is mathematically precise.');
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

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 border border-gold-700/50 rounded-2xl">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-gold-300 via-gold-300 to-emerald-300 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">ICSE Class 9 Mathematics • CISCE Real Numbers & Surds Hub</p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'predict', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              aria-label={`Navigate to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all capitalize ${
                phase === p
                  ? 'bg-gradient-to-r from-gold-600 to-gold-600 text-white shadow-md shadow-gold-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-950 rounded-2xl border border-gold-800/50 shadow-inner">
            <h2 className="text-lg font-bold text-gold-300 flex items-center gap-2">
              <span>🏛️</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-gold-900/30 rounded-xl border border-gold-700/30 text-xs text-gold-200">
              💡 <strong>Scenario Challenge:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <p className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Select option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left text-xs md:text-sm rounded-xl border transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-gold-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                  {discoveryAnswered && (i === DISCOVERY_QUESTION.correctIndex ? '✓ ' : '✗ ')}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <p className={discoveryCorrect ? 'text-emerald-400 text-xs md:text-sm' : 'text-amber-400 text-xs md:text-sm'}>
                  {discoveryCorrect
                    ? '✓ Spot on! Exact geometric diagonals cannot be represented by rational fractions p/q.'
                    : `⚠️ ✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="flex gap-2">
                  <motion.button
                    aria-label="Predict before exploring"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToPredict}
                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs md:text-sm font-bold rounded-xl shadow-lg"
                  >
                    Predict Then Explore →
                  </motion.button>
                  <motion.button
                    aria-label="Launch Interactive Labs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-4 py-2 bg-gradient-to-r from-gold-600 to-gold-600 text-white text-xs md:text-sm font-bold rounded-xl shadow-lg shadow-gold-500/25"
                  >
                    Direct to Labs →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PREDICT-THEN-CHECK PHASE ─── */}
      {phase === 'predict' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 rounded-3xl border border-amber-600/40 space-y-2">
            <h2 className="text-lg font-black text-amber-300 flex items-center gap-2">
              <span>🔮</span> Brilliant Predict-then-Check Lab
            </h2>
            <p className="text-xs text-slate-300">
              Formulate your hypothesis first. Then interact with the live mathematical models to verify!
            </p>
          </div>

          <div className="space-y-6">
            {PREDICTION_QUESTIONS.map((pq, qIdx) => {
              const userChoice = predictionAnswers[pq.id];
              const isChecked = predictionChecked[pq.id];
              const isCorrect = userChoice === pq.correctIndex;

              return (
                <div key={pq.id} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-amber-900/60 text-amber-300 text-[11px] font-bold rounded-md">
                      Prediction {qIdx + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-100">{pq.question}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pq.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          setPredictionAnswers(prev => ({ ...prev, [pq.id]: optIdx }));
                          audioManager.play('tap');
                        }}
                        disabled={isChecked}
                        className={`p-3 text-left text-xs rounded-xl border transition-all ${
                          userChoice === optIdx
                            ? isChecked
                              ? isCorrect
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950/80 border-rose-500 text-rose-200'
                              : 'bg-gold-950 border-gold-500 text-gold-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <span className="font-bold mr-1.5 text-amber-400">{String.fromCharCode(65 + optIdx)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>

                  {!isChecked ? (
                    <button
                      onClick={() => {
                        if (userChoice !== undefined) {
                          setPredictionChecked(prev => ({ ...prev, [pq.id]: true }));
                          audioManager.play(isCorrect ? 'success' : 'pop');
                        }
                      }}
                      disabled={userChoice === undefined}
                      className="px-4 py-1.5 bg-amber-600 text-white text-xs font-bold rounded-lg disabled:opacity-40"
                    >
                      Lock In Prediction
                    </button>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                      <p className={`text-xs font-bold ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {isCorrect ? '✓ Your prediction is mathematically correct!' : '🔍 Interesting hypothesis! Let\'s test why:'}
                      </p>
                      <p className="text-xs text-slate-300">{pq.explanation}</p>
                      <p className="text-[11px] text-gold-300 bg-gold-950/40 p-2 rounded border border-gold-800/40">
                        🔭 <strong>How to verify:</strong> {pq.verifyInstruction}
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAdvanceToExploration}
              className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-600 text-white text-sm font-bold rounded-xl shadow-lg"
            >
              Enter Interactive Labs →
            </button>
          </div>
        </motion.div>
      )}

      {/* ─── INTERACTIVE EXPLORATION PHASE (5 LABS WITH 3+ TOPIC SVGS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base md:text-lg font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-xs text-amber-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <span className="text-xs font-mono px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>

              {/* ── LAB 0: Real Number Hierarchy (SVG 1: Nested Sets Diagram) ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="col-span-1 md:col-span-2 p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center min-h-[260px]">
                    <svg viewBox="0 0 500 300" className="w-full h-auto max-h-[280px]" role="img" aria-label="Real Number System Hierarchy Diagram">
                      <title>Real Number System Classification Hierarchy</title>
                      <ellipse cx="200" cy="150" rx="190" ry="130" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" opacity="0.4" />
                      <text x="350" y="50" fill="#a5b4fc" fontSize="12" fontWeight="bold">Real Numbers (ℝ)</text>

                      <ellipse cx="170" cy="150" rx="150" ry="110" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
                      <text x="260" y="80" fill="#38bdf8" fontSize="11" fontWeight="bold">Rational (ℚ) [p/q]</text>

                      <ellipse cx="140" cy="150" rx="110" ry="85" fill="#1e293b" stroke="#10b981" strokeWidth="2" opacity="0.7" />
                      <text x="200" y="105" fill="#34d399" fontSize="10" fontWeight="bold">Integers (ℤ)</text>

                      <ellipse cx="115" cy="150" rx="75" ry="60" fill="#334155" stroke="#f59e0b" strokeWidth="2" opacity="0.8" />
                      <text x="150" y="130" fill="#fbbf24" fontSize="9" fontWeight="bold">Whole (𝕎)</text>

                      <ellipse cx="90" cy="150" rx="40" ry="35" fill="#475569" stroke="#ec4899" strokeWidth="2" />
                      <text x="90" y="153" fill="#f472b6" fontSize="9" fontWeight="bold" textAnchor="middle">Nat (ℕ)</text>

                      <ellipse cx="410" cy="180" rx="70" ry="80" fill="#3b0764" stroke="#c084fc" strokeWidth="2" opacity="0.6" />
                      <text x="410" y="140" fill="#e9d5ff" fontSize="11" fontWeight="bold" textAnchor="middle">Irrational (ℚ')</text>
                      <text x="410" y="165" fill="#c084fc" fontSize="9" textAnchor="middle">√2, √3, π, e</text>
                      <text x="410" y="185" fill="#c084fc" fontSize="8" textAnchor="middle">Non-term & Non-rep</text>
                    </svg>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <p className="text-xs font-bold text-gold-300">Select Nested Set:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'N' as const, name: 'ℕ Naturals', ex: '1, 2, 3, ...' },
                        { id: 'W' as const, name: '𝕎 Whole', ex: '0, 1, 2, ...' },
                        { id: 'Z' as const, name: 'ℤ Integers', ex: '-3, -2, 0, 5' },
                        { id: 'Q' as const, name: 'ℚ Rationals', ex: '3/4, -5/1, 0.3̄' },
                        { id: 'Irr' as const, name: 'ℚ\' Irrationals', ex: '√2, √3, π' },
                        { id: 'R' as const, name: 'ℝ Reals', ex: 'ℚ ∪ ℚ\' (Full Line)' },
                      ].map((item) => (
                        <motion.button
                          key={item.id}
                          aria-label={`Select set ${item.name}`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setSelectedHierarchy(item.id);
                            audioManager.play('tap');
                            speechManager.speak(`${item.name}: examples are ${item.ex}`);
                          }}
                          className={`p-2 rounded-xl text-left text-xs border transition-all ${
                            selectedHierarchy === item.id
                              ? 'bg-gold-950 border-gold-500 text-gold-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <p className="font-bold">{item.name}</p>
                          <p className="text-[10px] text-slate-400">{item.ex}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 1: Pythagoras Ladder & Number Line (SVG 2: Theodorus Spiral Construction) ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <p className="text-xs text-gold-300 font-bold mb-2">Dynamic Canvas Projection</p>
                      <canvas ref={canvasRef} width={400} height={180} className="w-full h-auto bg-slate-950 rounded-xl" />
                    </div>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-center">
                      <p className="text-xs text-gold-300 font-bold mb-1">SVG Geometric Root Construction Blueprint</p>
                      <svg viewBox="0 0 320 180" className="w-full h-auto max-h-[170px]" role="img" aria-label="Spiral of Theodorus Geometric Construction">
                        <title>Pythagoras Geometric Root Generator</title>
                        <line x1="30" y1="140" x2="290" y2="140" stroke="#475569" strokeWidth="2" />
                        <circle cx="50" cy="140" r="3" fill="#94a3b8" />
                        <text x="50" y="155" fill="#94a3b8" fontSize="10" textAnchor="middle">0</text>
                        <circle cx="110" cy="140" r="3" fill="#94a3b8" />
                        <text x="110" y="155" fill="#94a3b8" fontSize="10" textAnchor="middle">1</text>
                        <circle cx="135" cy="140" r="3" fill="#ec4899" />
                        <text x="135" y="155" fill="#ec4899" fontSize="10" textAnchor="middle">√2</text>
                        <circle cx="154" cy="140" r="3" fill="#10b981" />
                        <text x="154" y="155" fill="#10b981" fontSize="10" textAnchor="middle">√3</text>
                        <circle cx="184" cy="140" r="3" fill="#8b5cf6" />
                        <text x="184" y="155" fill="#8b5cf6" fontSize="10" textAnchor="middle">√5</text>

                        <polygon points="50,140 110,140 110,80" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1.5" />
                        <line x1="50" y1="140" x2="110" y2="80" stroke="#ec4899" strokeWidth="2" />
                        <path d="M 110,80 A 85 85 0 0 1 135,140" fill="none" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3,3" />
                        <text x="75" y="105" fill="#ec4899" fontSize="9" fontWeight="bold">√2</text>

                        <line x1="110" y1="80" x2="70" y2="40" stroke="#f59e0b" strokeWidth="1.5" />
                        <line x1="50" y1="140" x2="70" y2="40" stroke="#10b981" strokeWidth="2" />
                        <path d="M 70,40 A 104 104 0 0 1 154,140" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
                        <text x="50" y="80" fill="#10b981" fontSize="9" fontWeight="bold">√3</text>
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-300">Select Surd Hypotenuse to Construct:</span>
                    <div className="flex gap-2">
                      {[
                        { step: 2, label: 'Construct √2 (Base 1, Alt 1)' },
                        { step: 3, label: 'Construct √3 (Base √2, Alt 1)' },
                        { step: 5, label: 'Construct √5 (Base 2, Alt 1)' },
                      ].map(btn => (
                        <motion.button
                          key={btn.step}
                          aria-label={btn.label}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setLadderStep(btn.step);
                            audioManager.play('tap');
                            speechManager.speak(`Constructing ${btn.label}`);
                          }}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                            ladderStep === btn.step
                              ? 'bg-gold-600 border-gold-400 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {btn.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: Surd Unpacker ── */}
              {currentSlide === 2 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label htmlFor="radicand-slider" className="text-xs text-slate-300">
                      Radicand Input (n): <span className="text-gold-300 font-mono font-bold text-sm">{surdSimplification.n}</span>
                    </label>
                    <span className="text-xs text-slate-400">Pure Surd: √{surdSimplification.n}</span>
                  </div>
                  <input
                    id="radicand-slider"
                    aria-label="Adjust radicand value"
                    type="range"
                    min={2}
                    max={150}
                    value={radicandInput}
                    onChange={(e) => {
                      setRadicandInput(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-gold-500"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-slate-400 uppercase">Factored Radicand</p>
                      <p className="text-base font-bold text-amber-300 mt-1">
                        √({surdSimplification.largestSquare} × {surdSimplification.remainder})
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-slate-400 uppercase">Extracted Perfect Square</p>
                      <p className="text-base font-bold text-emerald-300 mt-1">
                        √{surdSimplification.largestSquare} = {surdSimplification.coeff}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-slate-400 uppercase">Simplest Form</p>
                      <p className="text-base font-bold text-gold-300 mt-1">
                        {surdSimplification.isPerfect
                          ? `${surdSimplification.coeff} (Rational ✓)`
                          : surdSimplification.coeff === 1
                          ? `√${surdSimplification.remainder}`
                          : `${surdSimplification.coeff}√${surdSimplification.remainder}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: Conjugate Rationalizer Balance (SVG 3: Difference of Squares Model) ── */}
              {currentSlide === 3 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                    <p className="text-xs text-center text-teal-300 font-bold mb-1">SVG Geometric Difference of Squares Elimination</p>
                    <svg viewBox="0 0 400 120" className="w-full h-auto max-h-[120px]" role="img" aria-label="Conjugate Difference of Squares Area Diagram">
                      <title>Conjugate Multiplication Elimination of Radicals</title>
                      <rect x="30" y="20" width="100" height="80" fill="#0f766e" opacity="0.6" stroke="#2dd4bf" strokeWidth="1.5" />
                      <text x="80" y="65" fill="#ccfbf1" fontSize="11" textAnchor="middle" fontWeight="bold">a² = {conjugateA * conjugateA}</text>

                      <text x="145" y="65" fill="#f87171" fontSize="16" fontWeight="bold">−</text>

                      <rect x="170" y="35" width="65" height="50" fill="#991b1b" opacity="0.6" stroke="#f87171" strokeWidth="1.5" />
                      <text x="202" y="65" fill="#fee2e2" fontSize="11" textAnchor="middle" fontWeight="bold">(√b)² = {conjugateB}</text>

                      <text x="250" y="65" fill="#38bdf8" fontSize="16" fontWeight="bold">=</text>

                      <rect x="275" y="25" width="90" height="70" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                      <text x="320" y="55" fill="#c7d2fe" fontSize="10" textAnchor="middle">Rational Denom</text>
                      <text x="320" y="75" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">{conjugateA * conjugateA - conjugateB} ✓</text>
                    </svg>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                    <p className="text-xs text-slate-400 mb-2">Original Expression with Irrational Denominator:</p>
                    <p className="text-lg font-mono font-bold text-amber-300">
                      1 / ({conjugateA} + √{conjugateB})
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <motion.button
                      aria-label="Toggle conjugate multiplication"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsConjugateApplied(!isConjugateApplied);
                        audioManager.play('sparkle');
                        speechManager.speak(
                          isConjugateApplied ? 'Conjugate removed' : 'Conjugate applied! Notice the rational denominator.'
                        );
                      }}
                      className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs md:text-sm font-bold rounded-xl"
                    >
                      {isConjugateApplied ? 'Reset Multiplication' : `Multiply Top & Bottom by Conjugate (${conjugateA} - √${conjugateB})`}
                    </motion.button>
                  </div>

                  {isConjugateApplied && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-700/50 space-y-2 text-center">
                      <p className="text-xs text-emerald-300 font-bold">✓ Applying Difference of Squares: (a + √b)(a - √b) = a² - b</p>
                      <p className="text-sm font-mono text-slate-200">
                        = ({conjugateA} - √{conjugateB}) / ({conjugateA}² - (√{conjugateB})²)
                      </p>
                      <p className="text-base font-mono font-bold text-emerald-300">
                        = ({conjugateA} - √{conjugateB}) / ({conjugateA * conjugateA - conjugateB})
                      </p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── LAB 4: Compounding Snowball Engine ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div>
                      <label htmlFor="p-slider" className="text-xs text-slate-400">Principal (P): ₹{simPrincipal}</label>
                      <input
                        id="p-slider"
                        aria-label="Adjust Principal Amount"
                        type="range"
                        min={1000}
                        max={50000}
                        step={1000}
                        value={simPrincipal}
                        onChange={(e) => setSimPrincipal(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="r-slider" className="text-xs text-slate-400">Rate (r): {simRate}% p.a.</label>
                      <input
                        id="r-slider"
                        aria-label="Adjust Annual Interest Rate"
                        type="range"
                        min={2}
                        max={20}
                        value={simRate}
                        onChange={(e) => setSimRate(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="t-slider" className="text-xs text-slate-400">Duration (n): {simYears} Years</label>
                      <input
                        id="t-slider"
                        aria-label="Adjust Duration in Years"
                        type="range"
                        min={1}
                        max={5}
                        value={simYears}
                        onChange={(e) => setSimYears(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={compoundingChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="year" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                        <Legend />
                        <Line type="monotone" dataKey="SimpleInterestAmt" name="Simple Interest" stroke="#f59e0b" strokeWidth={2} />
                        <Line type="monotone" dataKey="AnnualCIAmt" name="CI (Annual)" stroke="#38bdf8" strokeWidth={2} />
                        <Line type="monotone" dataKey="HalfYearlyCIAmt" name="CI (Half-Yearly)" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── OBSERVATION QUESTIONS SECTION (What do you notice?) ── */}
          <div className="p-5 bg-slate-900/90 rounded-3xl border border-gold-900/40 space-y-4">
            <h4 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>👁️</span> Guided Observations ("What do you notice?")
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OBSERVATION_QUESTIONS.map((oq, oIdx) => {
                const userChoice = observationAnswers[oq.id];
                const isChecked = observationChecked[oq.id];
                const isCorrect = userChoice === oq.correctIndex;

                return (
                  <div key={oq.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
                    <p className="text-xs font-semibold text-slate-200">
                      <span className="text-gold-400 font-bold mr-1">{oIdx + 1}.</span> {oq.question}
                    </p>
                    <div className="space-y-1.5">
                      {(oq.observableOptions || oq.options).map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setObservationAnswers(prev => ({ ...prev, [oq.id]: optIdx }));
                            setObservationChecked(prev => ({ ...prev, [oq.id]: true }));
                            audioManager.play(optIdx === oq.correctIndex ? 'success' : 'pop');
                          }}
                          className={`w-full p-2 text-left text-[11px] rounded-lg border transition-all ${
                            userChoice === optIdx
                              ? isChecked
                                ? isCorrect
                                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium'
                                  : 'bg-rose-950/80 border-rose-500 text-rose-200'
                                : 'bg-gold-950 border-gold-500 text-gold-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {isChecked && (
                      <p className="text-[10px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
                        💡 {oq.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slide Navigation */}
          <div className="flex justify-between items-center">
            <motion.button
              aria-label="Go to Previous Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-200 text-xs md:text-sm font-bold rounded-xl disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">
              Step {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-4 py-2 bg-gold-600 text-white text-xs md:text-sm font-bold rounded-xl"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter Free Sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs md:text-sm font-bold rounded-xl shadow-lg shadow-emerald-500/20"
              >
                Enter Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── FREE SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-emerald-300">Free Mathematical Sandbox</h3>
                <p className="text-xs text-slate-400">Freely combine surds and analyze compound interest variables without grading pressure.</p>
              </div>
              <motion.button
                aria-label="Proceed to graded challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-5 py-2 bg-gradient-to-r from-gold-600 to-gold-600 text-white text-xs md:text-sm font-bold rounded-xl shadow-lg"
              >
                I Am Ready For Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <p className="text-xs font-bold text-gold-300">Real-Time Surd Factoring Machine</p>
                <div className="flex items-center gap-2">
                  <label htmlFor="sandbox-radicand" className="text-xs text-slate-400">Radicand:</label>
                  <input
                    id="sandbox-radicand"
                    aria-label="Radicand input value"
                    type="number"
                    min={2}
                    max={500}
                    value={radicandInput}
                    onChange={(e) => setRadicandInput(Number(e.target.value))}
                    className="w-24 px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-sm text-gold-300 font-mono"
                  />
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-400">Simplification Result:</p>
                  <p className="text-base font-bold text-emerald-300 font-mono mt-1">
                    ✓ √{surdSimplification.n} = {surdSimplification.coeff === 1 ? '' : surdSimplification.coeff}
                    {surdSimplification.isPerfect ? '' : `√${surdSimplification.remainder}`}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <p className="text-xs font-bold text-gold-300">Instant Compounding Gap Checker</p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <span className="text-slate-400">SI Yield</span>
                    <p className="font-bold text-amber-400">₹{(simPrincipal * simRate * simYears) / 100}</p>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <span className="text-slate-400">CI Annual</span>
                    <p className="font-bold text-gold-400">
                      ₹{Math.round(simPrincipal * Math.pow(1 + simRate / 100, simYears) - simPrincipal)}
                    </p>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <span className="text-slate-400">Excess (CI - SI)</span>
                    <p className="font-bold text-emerald-400">
                      ✓ ₹
                      {Math.round(
                        simPrincipal * Math.pow(1 + simRate / 100, simYears) -
                          simPrincipal -
                          (simPrincipal * simRate * simYears) / 100
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div>
              <p className="text-xs text-slate-400">
                Challenge <span className="text-slate-100 font-bold">{currentChallenge + 1}</span> of{' '}
                <span className="text-slate-100 font-bold">{filteredChallenges.length}</span>
              </p>
              <div className="w-48 md:w-64 h-2 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 via-gold-400 to-emerald-400"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 text-[10px] font-extrabold uppercase rounded-full border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700/50'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950/60 text-rose-400 border-rose-700/50'
                    : 'bg-gold-950/60 text-gold-400 border-gold-700/50'
                }`}
              >
                {difficulty} TIER
              </motion.span>
              <span className="px-2.5 py-1 text-[10px] font-mono bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                {challenge.competencyLevel.toUpperCase()}
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/40 border-rose-600'
                : 'bg-slate-900/90 border-slate-800 shadow-xl'
            }`}
          >
            <p className="text-sm md:text-base font-semibold text-slate-100 mb-4">{challenge.question}</p>

            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`p-4 text-left text-xs md:text-sm rounded-2xl border transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-gold-500'
                    }`}
                  >
                    <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                    {showExplanation && (i === challenge.correctIndex ? '✓ ' : '✗ ')}
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  aria-label="Enter numeric answer"
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric answer"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-gold-500 font-mono"
                />
                <span className="text-slate-400 text-xs font-bold">{challenge.unit}</span>
                <motion.button
                  aria-label="Submit numeric answer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-5 py-2.5 bg-gold-600 text-white text-xs md:text-sm font-bold rounded-xl"
                >
                  Submit Answer
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 text-white text-xs font-bold rounded-lg cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['slot_base', 'slot_alt1', 'slot_hyp1', 'slot_hyp2'].map((slotId) => (
                    <div
                      key={slotId}
                      aria-label={`Drop target area ${slotId}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(slotId)}
                      className="p-3 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[60px] flex items-center justify-center"
                    >
                      <span className="text-xs text-gold-300 font-bold">
                        {droppedLabels[slotId] ? `✓ ${droppedLabels[slotId]}` : `Drop: ${slotId}`}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check Diagram Labels"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl"
                >
                  Check Diagram Labels
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${displayIndex + 1}: ${item}. Drag to rearrange.`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-700 text-xs md:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="px-2 py-0.5 bg-slate-800 text-gold-300 font-bold rounded-md">{displayIndex + 1}</span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Verify Logical Sequence"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(answer);
                  }}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl"
                >
                  Verify Logical Sequence
                </motion.button>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add token ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(p => [...p, part])}
                      className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-gold-300"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-gold-950 border border-gold-700 rounded text-xs text-gold-200 flex items-center gap-1.5">
                      {part}
                      <button aria-label={`Remove token ${part}`} onClick={() => setConstructParts(p => p.filter((_, i) => i !== idx))} className="text-rose-400">✕</button>
                    </span>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Constructed Proof Step"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl"
                >
                  Verify Constructed Proof Step
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-amber-950/40 border border-amber-700/50 rounded-2xl space-y-3">
                <p className="text-xs font-bold text-amber-300">✓ Step-by-Step Solution Breakdown:</p>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).map((sentence, i) => (
                  <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-amber-200 leading-relaxed">
                    <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="flex justify-end pt-2">
                  <motion.button
                    aria-label="Proceed to next challenge or finish"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs md:text-sm font-bold rounded-xl shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Simulation →' : 'Next Challenge →'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── COMPLETION, SYNTHESIS & REFLECTION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-950 rounded-3xl border border-gold-700/50 text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-emerald-300 via-gold-300 to-gold-300 bg-clip-text text-transparent">
              ✓ Mastery Certified!
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Final Composite Score: <span className="font-bold text-emerald-400 font-mono text-lg">{Math.max(0, 100 - errors * 5)}%</span>
            </p>
            <p className="text-xs text-slate-400">
              BKT Adaptive Mastery Level: <span className="text-gold-300 font-bold uppercase">{masteryLevel}</span>
            </p>
          </div>

          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-700/40">
            <p className="text-xs md:text-sm text-emerald-300 font-medium">
              {errors === 0
                ? '🏆 PERFECT SCORE! You have mastered Rational and Irrational Numbers, Surds, and Compounding with mathematical elegance!'
                : errors <= 3
                ? '🌟 Strong work! You demonstrated solid command over surd operations and compounding growth models.'
                : '📈 Good progress! Re-explore the surd unpacker and compound interest curves to solidify your foundations.'}
            </p>
          </div>

          {/* ─── SPACED REPETITION VISIBILITY CARD (SRS INTERVAL) ─── */}
          <div className="p-5 bg-gradient-to-br from-gold-950/60 via-slate-900 to-gold-950/60 rounded-3xl border border-gold-600/40 space-y-3 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gold-300 flex items-center gap-2">
                  <span>📅</span> SM-2 Spaced Repetition Memory Schedule
                </h4>
                <p className="text-xs text-slate-300">
                  Adaptive review timing based on your performance ({errors} {errors === 1 ? 'error' : 'errors'} recorded):
                </p>
              </div>
              <div className="px-4 py-2 bg-gold-900/80 border border-gold-400 rounded-2xl text-center shadow">
                <p className="text-[10px] text-gold-200 uppercase font-bold tracking-wider">Next Recommended Review</p>
                <p className="text-base font-extrabold text-gold-300">
                  {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px]">
              <div className={`p-2.5 rounded-xl border ${errors === 0 ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}>
                <p>0 Errors</p>
                <p className="text-xs">7 Days</p>
              </div>
              <div className={`p-2.5 rounded-xl border ${errors >= 1 && errors <= 3 ? 'bg-amber-950/80 border-amber-500 text-amber-200 font-bold' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}>
                <p>1 - 3 Errors</p>
                <p className="text-xs">3 Days</p>
              </div>
              <div className={`p-2.5 rounded-xl border ${errors >= 4 ? 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}>
                <p>4+ Errors</p>
                <p className="text-xs">1 Day</p>
              </div>
            </div>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-gold-900/60 space-y-4">
            <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>💭</span> Key Synthesis & Reflection
            </h3>
            <p className="text-xs text-slate-400">Solidify your long-term memory by thinking about these three core concepts:</p>

            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label htmlFor="ref-surprising" className="text-xs font-semibold text-slate-200">
                  1. What was the most surprising thing you learned?
                </label>
                <input
                  id="ref-surprising"
                  type="text"
                  aria-label="Reflection on the most surprising thing learned"
                  placeholder="e.g., How exact irrational lengths like √2 can be physically drawn with Pythagoras..."
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label htmlFor="ref-explain" className="text-xs font-semibold text-slate-200">
                  2. How would you explain this to a friend?
                </label>
                <input
                  id="ref-explain"
                  type="text"
                  aria-label="Reflection on explaining the concept to a friend"
                  placeholder="e.g., Surds are square roots that can't simplify to integers, and multiplying conjugates clears radicals..."
                  value={reflectionAnswers.explain}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label htmlFor="ref-real-life" className="text-xs font-semibold text-slate-200">
                  3. Where in real life might you use this?
                </label>
                <input
                  id="ref-real-life"
                  type="text"
                  aria-label="Reflection on real-life applications"
                  placeholder="e.g., Calculating bank fixed deposit growth or engineering diagonal braces in architecture..."
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/40 space-y-3">
              <h3 className="text-xs md:text-sm font-bold text-rose-300">Your Diagnostic Misconception Review:</h3>
              {hitMisconceptions.map((idx) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300 font-medium">✓ ICSE Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-gold-400">{i + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK MODALS & BURSTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Cleared!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_MathematicsRationalNumbersRealSim;
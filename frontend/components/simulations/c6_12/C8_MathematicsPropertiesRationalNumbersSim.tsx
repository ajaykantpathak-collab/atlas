'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDENTIFIERS ───
const NODE_C8_MATH_001 = 'c8_math_001'; // Properties of rational numbers using general form
const NODE_C8_MATH_002 = 'c8_math_002'; // Representation on number line
const NODE_C8_MATH_003 = 'c8_math_003'; // Density property (between any two rationals)
const NODE_C8_MATH_004 = 'c8_math_004'; // Two-operation word problems (mensuration/area)
const NODE_C8_MATH_005 = 'c8_math_005'; // Laws of exponents with integral powers
const NODE_C8_MATH_006 = 'c8_math_006'; // Squares & square roots (factor & division methods)
const NODE_C8_MATH_007 = 'c8_math_007'; // Cubes and cube roots (factor method, up to 3 digits)
const NODE_C8_MATH_008 = 'c8_math_008'; // Generalized form (100a + 10b + c) & puzzles
const NODE_C8_MATH_009 = 'c8_math_009'; // Deducing divisibility rules (2, 3, 5, 9, 10)
const NODE_C8_MATH_010 = 'c8_math_010'; // Union and intersection of sets with Venn diagrams

const ALL_NODE_IDS = [
  NODE_C8_MATH_001,
  NODE_C8_MATH_002,
  NODE_C8_MATH_003,
  NODE_C8_MATH_004,
  NODE_C8_MATH_005,
  NODE_C8_MATH_006,
  NODE_C8_MATH_007,
  NODE_C8_MATH_008,
  NODE_C8_MATH_009,
  NODE_C8_MATH_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Architectural Number Lab',
  intro: 'ISRO engineers and architectural planners in Bengaluru are designing a modular lunar research hub. Precise structural ratios, thermal exponents, tile area layouts, grid divisibility, and telemetry set partitions all rely on fundamental rational number laws and algebra.',
  context: 'You are the lead mathematical analyst. You will examine rational properties, zoom infinitely into number lines, manipulate exponents, deduce divisibility rules from algebraic place value, and verify set partitions.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Between the fractions 1/2 and 3/4, a student claims there is only ONE single rational number (5/8). Is this true or false?',
  options: [
    'True — exactly one fraction sits in the exact middle.',
    'False — there are exactly two more fractions.',
    'False — there are infinitely many rational numbers between them.',
    'True — whole numbers leave no room for fractions.',
  ],
  correctIndex: 2,
  hintAfter: "Let's explore why rational numbers are 'dense' and obey beautiful algebraic properties!",
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

// ─── CHALLENGES ARRAY (24 Items Covering All Nodes & Competency Levels) ───
const CHALLENGES: Challenge[] = [
  // Foundation (8 challenges)
  {
    id: 'ch_001_f',
    nodeId: NODE_C8_MATH_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the additive inverse of 5/8 and the multiplicative inverse of 5/8?',
    options: [
      'Additive inverse is -5/8; Multiplicative inverse is 8/5',
      'Additive inverse is 8/5; Multiplicative inverse is -5/8',
      'Additive inverse is -5/8; Multiplicative inverse is -8/5',
      'Additive inverse is 0; Multiplicative inverse is 1',
    ],
    correctIndex: 0,
    explanation: 'The additive inverse of a/b is -a/b (since a/b + (-a/b) = 0). The multiplicative inverse (reciprocal) is b/a (since (a/b) * (b/a) = 1).',
    hints: [
      'Additive inverse adds to 0 (additive identity).',
      'Multiplicative inverse multiplies to 1 (multiplicative identity).',
      'For 5/8, negate for additive (-5/8) and flip for multiplicative (8/5).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_002_f',
    nodeId: NODE_C8_MATH_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which statement correctly compares the negative rational numbers -3/4 and -1/2 on a number line?',
    options: [
      '-3/4 is greater than -1/2 because 3/4 > 1/2',
      '-1/2 is greater than -3/4 because -1/2 lies to the right of -3/4',
      'Both are equal in magnitude so they occupy the same position',
      '-3/4 lies to the right of 0 while -1/2 lies to the left of 0',
    ],
    correctIndex: 1,
    explanation: 'On the number line, numbers further to the right are greater. Since -0.5 is closer to 0 than -0.75, -1/2 lies to the right of -3/4, meaning -1/2 > -3/4.',
    hints: [
      'Convert both to decimals or common denominators: -0.75 and -0.50.',
      'Negative numbers closer to zero lie further to the right.',
      'The number further to the right is always the greater number.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_003_f',
    nodeId: NODE_C8_MATH_003,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Find the midpoint rational number between 1/4 and 3/4. Enter the decimal equivalent.',
    correctAnswer: 0.5,
    tolerance: 0.01,
    unit: '',
    explanation: 'Midpoint = (1/4 + 3/4) / 2 = (4/4) / 2 = 1/2 = 0.5.',
    hints: [
      'Use the midpoint formula: (a + b) / 2.',
      '1/4 + 3/4 = 4/4 = 1.',
      '1 divided by 2 is 1/2 or 0.5.',
    ],
  },
  {
    id: 'ch_004_f',
    nodeId: NODE_C8_MATH_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Evaluate 5^0 + 2^(-3) in fractional form.',
    options: ['1 + 1/8 = 9/8', '0 + (-8) = -8', '1 + (-6) = -5', '5 + 1/6 = 31/6'],
    correctIndex: 0,
    explanation: 'Any non-zero number to power 0 equals 1 (a^0 = 1). A negative power a^(-n) = 1/a^n, so 2^(-3) = 1/2^3 = 1/8. Thus 1 + 1/8 = 9/8.',
    hints: [
      'What does a^0 equal when a is not zero?',
      'What does 2^(-3) turn into? Remember negative exponent means reciprocal.',
      '1 + 1/8 = 9/8.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_005_f',
    nodeId: NODE_C8_MATH_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is 72 NOT a perfect square according to prime factorisation?',
    options: [
      'Because 72 is an even number',
      'Because 72 = 2^3 * 3^2, leaving one factor of 2 unpaired',
      'Because 72 ends in digit 2 and no squares end in 2',
      'Both B and C are valid mathematical proofs',
    ],
    correctIndex: 1,
    explanation: 'In 72 = 2 * 2 * 2 * 3 * 3 = (2*2) * 2 * (3*3), the factor 2 is left unpaired. Although squares cannot end in 2, the definitive prime factor test is the pairing of prime factors.',
    hints: [
      'Look at the powers of prime factors in 72.',
      'A perfect square must have all even powers for its prime factors.',
      '2 has exponent 3 (odd), so it cannot be fully paired into integer squares.',
    ],
  },
  {
    id: 'ch_006_f',
    nodeId: NODE_C8_MATH_007,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the cube root of 343? (cbrt(343))',
    correctAnswer: 7,
    tolerance: 0,
    unit: '',
    explanation: '343 = 7 * 7 * 7 = 7^3, so the cube root is 7.',
    hints: [
      'Test odd single digits: 5^3 = 125, 6^3 = 216...',
      'Check 7 * 7 = 49; 49 * 7 = 343.',
      'The answer is 7.',
    ],
  },
  {
    id: 'ch_007_f',
    nodeId: NODE_C8_MATH_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In generalized form 100a + 10b + c for a three-digit number, which digit CANNOT be 0?',
    options: [
      'c (units digit)',
      'b (tens digit)',
      'a (hundreds digit)',
      'None, all digits can be 0',
    ],
    correctIndex: 2,
    explanation: 'If a = 0, 100(0) + 10b + c collapses into a two-digit or single-digit number. The leading digit a must be from 1 to 9.',
    hints: [
      'What happens if the hundreds place is 0 in a 3-digit number like 045?',
      '045 is just 45, which has only 2 digits.',
      'The leading digit a cannot be zero.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_008_f',
    nodeId: NODE_C8_MATH_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'If Set A = {2, 4, 6} and Set B = {4, 6, 8}, what is A ∩ B (intersection) and A ∪ B (union)?',
    options: [
      'A ∩ B = {4, 6} and A ∪ B = {2, 4, 6, 8}',
      'A ∩ B = {2, 4, 6, 8} and A ∪ B = {4, 6}',
      'A ∩ B = {4, 6} and A ∪ B = {2, 4, 4, 6, 6, 8}',
      'A ∩ B = {} and A ∪ B = {2, 4, 6, 8}',
    ],
    correctIndex: 0,
    explanation: 'Intersection A ∩ B contains elements present in BOTH sets ({4, 6}). Union A ∪ B combines elements without duplicates ({2, 4, 6, 8}).',
    hints: [
      'Intersection is the common overlap.',
      'Union merges all elements, writing shared elements once.',
      'Common are 4 and 6; merged are 2, 4, 6, 8.',
    ],
    misconceptionIndex: 4,
  },

  // Standard (8 challenges)
  {
    id: 'ch_009_s',
    nodeId: NODE_C8_MATH_001,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag each rational algebraic property to its general identity equation.',
    dragItems: [
      { label: 'Closure', targetId: 'prop_closure' },
      { label: 'Commutative', targetId: 'prop_comm' },
      { label: 'Associative', targetId: 'prop_assoc' },
      { label: 'Distributive', targetId: 'prop_dist' },
    ],
    correctMapping: {
      prop_closure: 'Closure',
      prop_comm: 'Commutative',
      prop_assoc: 'Associative',
      prop_dist: 'Distributive',
    },
    explanation: 'Closure: a+b is rational. Commutative: a+b = b+a. Associative: (a+b)+c = a+(b+c). Distributive: a*(b+c) = a*b + a*c.',
    hints: [
      'Commutative means order swapping (a+b = b+a).',
      'Associative means grouping changes ((a+b)+c = a+(b+c)).',
      'Distributive spreads multiplication over addition (a*(b+c) = ab + ac).',
    ],
  },
  {
    id: 'ch_010_s',
    nodeId: NODE_C8_MATH_004,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A rectangular solar panel in Bengaluru is 15/2 metres long and 8/3 metres wide. Fencing the border costs ₹12 per metre. What is the total cost in ₹?',
    correctAnswer: 244,
    tolerance: 0,
    unit: '₹',
    explanation: 'Perimeter = 2 * (l + b) = 2 * (15/2 + 8/3) = 2 * (45/6 + 16/6) = 2 * (61/6) = 61/3 m. Cost = (61/3) * 12 = 61 * 4 = ₹244.',
    hints: [
      'First calculate the perimeter using 2*(length + breadth).',
      '15/2 + 8/3: common denominator is 6 -> (45 + 16)/6 = 61/6.',
      'Perimeter = 2 * 61/6 = 61/3 m. Total cost = (61/3) * 12 = 244.',
    ],
  },
  {
    id: 'ch_011_s',
    nodeId: NODE_C8_MATH_004,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ISRO water coolant tank is 2/5 full. 3/4 of this water is used in a test. The remaining water is poured equally into 3 containers. What fraction of the full tank is in each container? Enter the denominator for numerator 1 (i.e. if 1/30, enter 30).',
    correctAnswer: 30,
    tolerance: 0,
    unit: 'denominator (1/X)',
    explanation: 'Used water = (3/4) * (2/5) = 6/20 = 3/10. Remaining = 2/5 - 3/10 = 4/10 - 3/10 = 1/10. Each container = (1/10) / 3 = 1/30.',
    hints: [
      'Calculate used water: (3/4) * (2/5) = 3/10.',
      'Calculate remaining water: 2/5 - 3/10 = 1/10.',
      'Divide remaining 1/10 by 3: (1/10) * (1/3) = 1/30.',
    ],
  },
  {
    id: 'ch_012_s',
    nodeId: NODE_C8_MATH_005,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Simplify ((4^2 * 4^(-5)) / 4^(-1)) and evaluate the denominator of 1/X.',
    correctAnswer: 16,
    tolerance: 0,
    unit: 'denominator (1/X)',
    explanation: 'Numerator: 4^(2 + (-5)) = 4^(-3). Quotient: 4^(-3) / 4^(-1) = 4^(-3 - (-1)) = 4^(-2) = 1/4^2 = 1/16.',
    hints: [
      'Add exponents in numerator: 2 + (-5) = -3.',
      'Subtract exponent in division: -3 - (-1) = -2.',
      '4^(-2) = 1/4^2 = 1/16. So the denominator is 16.',
    ],
  },
  {
    id: 'ch_013_s',
    nodeId: NODE_C8_MATH_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Using the division method, calculate sqrt(42.25).',
    correctAnswer: 6.5,
    tolerance: 0.01,
    unit: '',
    explanation: 'Pairing gives 42 . 25. 6^2 = 36, remainder 6. Bring down 25 -> 625. Double quotient 6 -> 12. 125 * 5 = 625. Hence sqrt(42.25) = 6.5.',
    hints: [
      'Pair 42 and 25 around decimal point.',
      'Largest square <= 42 is 6^2 = 36.',
      'Remainder 6 + 25 -> 625. Divisor is 120 + d. 125 * 5 = 625 -> 6.5.',
    ],
  },
  {
    id: 'ch_014_s',
    nodeId: NODE_C8_MATH_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'By bracketing between known cubes (7^3 = 343, 8^3 = 512), what is the best estimate for cbrt(500)?',
    options: [
      'Between 7 and 8, significantly closer to 8 (approx 7.9)',
      'Between 7 and 8, exactly in the middle (7.5)',
      'Between 8 and 9 (approx 8.2)',
      'Between 6 and 7 (approx 6.8)',
    ],
    correctIndex: 0,
    explanation: '500 is very close to 512 (diff 12) compared to 343 (diff 157). Thus cbrt(500) is just below 8, approx 7.93.',
    hints: [
      '7^3 = 343 and 8^3 = 512.',
      'Check difference: 500 - 343 = 157, whereas 512 - 500 = 12.',
      'Because 500 is much closer to 512, its cube root is very close to 8.',
    ],
  },
  {
    id: 'ch_015_s',
    nodeId: NODE_C8_MATH_008,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the classic cryptarithm puzzle AB + BA = 99, what is the value of A + B?',
    correctAnswer: 9,
    tolerance: 0,
    unit: '',
    explanation: 'AB = 10A + B, BA = 10B + A. (10A + B) + (10B + A) = 11A + 11B = 11(A + B) = 99. Therefore A + B = 9.',
    hints: [
      'Write AB as 10A + B and BA as 10B + A.',
      'Add them: 10A + A + 10B + B = 11A + 11B.',
      '11(A + B) = 99 -> A + B = 9.',
    ],
  },
  {
    id: 'ch_016_s',
    nodeId: NODE_C8_MATH_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does the algebraic deduction 100a + 10b + c = 99a + 9b + (a + b + c) prove the divisibility rule of 3 and 9?',
    options: [
      'Because 99a and 9b are always divisible by 3 and 9, leaving (a+b+c) as the sole deciding remainder.',
      'Because all three-digit numbers are divisible by 9.',
      'Because 100 and 10 are divisible by 3.',
      'Because a, b, and c must all be multiples of 3.',
    ],
    correctIndex: 0,
    explanation: '99a = 9(11a) and 9b = 9(b) are divisible by both 3 and 9. Thus the divisibility of the entire sum depends exclusively on whether the digit sum (a + b + c) is divisible by 3 or 9.',
    hints: [
      'Notice that 99 = 3*33 = 9*11 and 9 = 3*3 = 9*1.',
      'The leading terms contribute zero remainder when divided by 3 or 9.',
      'Only the leftover sum (a + b + c) determines whether the remainder is zero.',
    ],
  },

  // Advanced (8 challenges)
  {
    id: 'ch_017_a',
    nodeId: NODE_C8_MATH_001,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Construct the algebraic proof showing why addition of rationals p/q and r/s is commutative by selecting the correct sequence of equality steps.',
    availableParts: [
      '(ps + rq)/(qs)',
      '=',
      '(rq + ps)/(sq)',
      'r/s + p/q',
      'since ps+rq = rq+ps in integers',
    ],
    targetState: '(ps + rq)/(qs) = (rq + ps)/(sq) since ps+rq = rq+ps in integers = r/s + p/q',
    validationHint: 'Start with (ps + rq)/(qs), equate to (rq + ps)/(sq), cite integer commutativity, and end with r/s + p/q.',
    explanation: 'p/q + r/s = (ps + rq)/(qs) = (rq + ps)/(sq) = r/s + p/q because integer addition and multiplication are commutative.',
    hints: [
      'Express p/q + r/s in common denominator form (ps + rq)/(qs).',
      'Swap the integer terms in numerator and denominator: rq + ps and sq.',
      'Show that this equals r/s + p/q.',
    ],
  },
  {
    id: 'ch_018_a',
    nodeId: NODE_C8_MATH_003,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the midpoint calculations in order to generate 3 evenly spaced rational numbers between -1/3 and 1/3.',
    sortItems: [
      'Find midpoint of endpoints: (-1/3 + 1/3)/2 = 0',
      'Find midpoint of left sub-interval: (-1/3 + 0)/2 = -1/6',
      'Find midpoint of right sub-interval: (0 + 1/3)/2 = 1/6',
      'Order resulting set: -1/6 < 0 < 1/6',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Step 1: average endpoints gives 0. Step 2 & 3: average 0 with -1/3 gives -1/6, and with 1/3 gives 1/6. Step 4: verify order -1/6 < 0 < 1/6.',
    hints: [
      'First find the central midpoint between -1/3 and 1/3.',
      'Next find the left midpoint between -1/3 and the center.',
      'Next find the right midpoint between the center and 1/3.',
    ],
  },
  {
    id: 'ch_019_a',
    nodeId: NODE_C8_MATH_004,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'The area of an architectural rectangular courtyard is 35/6 m^2 and its length is 7/3 m. What is its perimeter in metres? (Enter 29/3 as a decimal approx to 2 decimal places, i.e., 9.67).',
    correctAnswer: 9.67,
    tolerance: 0.02,
    unit: 'm',
    explanation: 'Breadth = Area / Length = (35/6) / (7/3) = (35/6) * (3/7) = 5/2 m. Perimeter = 2 * (7/3 + 5/2) = 2 * (14/6 + 15/6) = 2 * (29/6) = 29/3 = 9.67 m.',
    hints: [
      'First find breadth: Area divided by length.',
      'Breadth = (35/6) * (3/7) = 5/2 m.',
      'Perimeter = 2 * (7/3 + 5/2) = 29/3 ≈ 9.67 m.',
    ],
  },
  {
    id: 'ch_020_a',
    nodeId: NODE_C8_MATH_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims that 2^3 * 3^2 = 6^5. Evaluate this claim.',
    options: [
      'Incorrect — product law requires IDENTICAL bases. 2^3 * 3^2 = 8 * 9 = 72, whereas 6^5 = 7776.',
      'Correct — bases multiply to 6 and powers add to 5.',
      'Incorrect — powers multiply so it should be 6^6 = 46656.',
      'Correct — by the distributive law of exponents.',
    ],
    correctIndex: 0,
    explanation: 'The law a^m * a^n = a^(m+n) applies ONLY when bases are equal. 2^3 * 3^2 = 8 * 9 = 72 ≠ 7776.',
    hints: [
      'Evaluate 2^3 and 3^2 directly: 8 and 9.',
      '8 * 9 = 72. What is 6^5? (6*6*6*6*6 = 7776).',
      'The exponential product rule cannot combine different bases.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_021_a',
    nodeId: NODE_C8_MATH_006,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Using prime factorisation, what is the square root of 784? (sqrt(784))',
    correctAnswer: 28,
    tolerance: 0,
    unit: '',
    explanation: '784 = 2^4 * 7^2 = (2^2 * 7)^2 = 28^2. Therefore sqrt(784) = 28.',
    hints: [
      'Factor 784: 784 / 16 = 49.',
      '784 = (2*2*2*2) * (7*7).',
      'Take one factor from each pair: 2 * 2 * 7 = 28.',
    ],
  },
  {
    id: 'ch_022_a',
    nodeId: NODE_C8_MATH_008,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Find the single-digit value of A in the puzzle: 31A + 1A3 = 457. What is A?',
    correctAnswer: 4,
    tolerance: 0,
    unit: '',
    explanation: '31A = 310 + A. 1A3 = 100 + 10A + 3 = 103 + 10A. (310 + A) + (103 + 10A) = 413 + 11A = 457 -> 11A = 44 -> A = 4.',
    hints: [
      '31A = 300 + 10 + A = 310 + A.',
      '1A3 = 100 + 10A + 3 = 103 + 10A.',
      '310 + A + 103 + 10A = 413 + 11A = 457 -> 11A = 44 -> A = 4.',
    ],
  },
  {
    id: 'ch_023_a',
    nodeId: NODE_C8_MATH_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An Indian postal code contains the number 420. Using deduced rules, why is 420 divisible by 2, 3, 5, 10 but NOT by 9?',
    options: [
      'Units digit 0 satisfies 2, 5, 10. Digit sum 4+2+0=6 is divisible by 3 (6=3*2) but NOT by 9.',
      'It is divisible by 9 because any number divisible by 3 is divisible by 9.',
      'It is divisible only by 10 because it ends in 0.',
      'It fails divisibility by 2 because 420 is a 3-digit number.',
    ],
    correctIndex: 0,
    explanation: 'Units digit 0 implies divisible by 2, 5, 10. Digit sum is 6, which is a multiple of 3 but not a multiple of 9.',
    hints: [
      'Check units digit: 0 -> divisible by 2, 5, 10.',
      'Check digit sum: 4 + 2 + 0 = 6.',
      'Is 6 divisible by 3? Yes. Is 6 divisible by 9? No.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_024_a',
    nodeId: NODE_C8_MATH_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Set P = {x: x is prime < 15} = {2, 3, 5, 7, 11, 13} (size 6). Set Q = {x: x is odd < 15} = {1, 3, 5, 7, 9, 11, 13} (size 7). How many elements are in P ∩ Q?',
    correctAnswer: 5,
    tolerance: 0,
    unit: 'elements',
    explanation: 'P ∩ Q = {3, 5, 7, 11, 13}. (2 is excluded because it is even; 1 and 9 are excluded because they are not prime). Number of elements = 5.',
    hints: [
      'List the shared elements of both sets.',
      'Which primes are odd? 3, 5, 7, 11, 13.',
      'Count them: {3, 5, 7, 11, 13} has 5 elements.',
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
  nodeId: NODE_C8_MATH_001,
  title: 'Properties of Rational Numbers & Exponent Laws',
  definition: 'A rational number is any number expressible as p/q (integers p, q with q ≠ 0). Properties include closure, commutativity, associativity, distributivity, identities, and inverses.',
  eli5: 'Rational numbers are fractions made of whole numbers. They can be added, multiplied, flipped, zoomed into endlessly on a number line, and obey algebraic rules.',
  misconceptions: [
    {
      misconception: 'Since 3/4 > 1/2, -3/4 must be greater than -1/2',
      correction: 'On the negative axis, numbers closer to 0 are greater. Thus -1/2 > -3/4.',
    },
    {
      misconception: 'The additive inverse and multiplicative inverse are identical',
      correction: 'Additive inverse negates (-p/q, sums to 0). Multiplicative inverse flips (q/p, multiplies to 1).',
    },
    {
      misconception: 'Negative exponents make numbers negative (e.g. 2^(-3) = -8)',
      correction: 'Negative exponent means reciprocal: 2^(-3) = 1/2^3 = 1/8 (a positive fraction).',
    },
    {
      misconception: 'Leading digits in generalized form 100a + 10b + c can be zero',
      correction: 'The leading digit a must be 1-9; if a=0, it collapses to a two-digit number.',
    },
    {
      misconception: 'Union lists shared elements twice',
      correction: 'Sets contain unique distinct elements; union merges without duplicate entries.',
    },
    {
      misconception: 'Any number divisible by 3 is also divisible by 9',
      correction: 'Divisibility by 9 requires digit sum to be a multiple of 9, not merely 3 (e.g. 12 is divisible by 3, not 9).',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the additive identity for rational numbers?', options: ['1', '0', '-1', 'Undefined'], correctIndex: 1 },
    { question: 'What is the multiplicative identity for rational numbers?', options: ['0', '1', '10', 'Reciprocal'], correctIndex: 1 },
    { question: 'What is 4^(-2)?', options: ['-8', '-16', '1/16', '1/8'], correctIndex: 2 },
    { question: 'How many rational numbers lie between 1/5 and 2/5?', options: ['0', '1', '10', 'Infinitely many'], correctIndex: 3 },
    { question: 'What is the value of sqrt(17.64)?', options: ['4.2', '4.14', '3.8', '4.8'], correctIndex: 0 },
    { question: 'What is the cube root of 216?', options: ['4', '6', '8', '16'], correctIndex: 1 },
    { question: 'For a three-digit number 100a + 10b + c, divisibility by 5 depends on:', options: ['a', 'b', 'c', 'a + b + c'], correctIndex: 2 },
    { question: 'If A ∩ B = ∅, sets A and B are:', options: ['Equal sets', 'Universal sets', 'Disjoint sets', 'Equivalent sets'], correctIndex: 2 },
  ],
  masteryCriteria: 'Master properties of rational numbers, number line representation, density, exponents, roots, place value algebra, and sets.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Number Line & Density Zoom',
    instruction: 'Drag the midpoint slider to continuously bisect the interval between fractions and watch new rational numbers appear.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_MATH_003,
  },
  {
    title: 'Lab 2: Rational Balance & Property Verification',
    instruction: 'Toggle between Commutative, Associative, and Distributive laws to see algebraic balance scales update in real-time.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C8_MATH_001,
  },
  {
    title: 'Lab 3: Exponent Power Inversion Chamber',
    instruction: 'Adjust the integral exponent slider from -3 to +3 to observe how negative exponents flip into reciprocal heights.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_MATH_005,
  },
  {
    title: 'Lab 4: Divisibility Algebraic Dissector',
    instruction: 'Change the hundreds, tens, and units digits to see the algebraic split 99a + 9b + (a+b+c) in action.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_MATH_009,
  },
  {
    title: 'Lab 5: Interactive Venn Partition Machine',
    instruction: 'Click regions to highlight Set A (Primes), Set B (Odds), their Intersection (A ∩ B), or Union (A ∪ B).',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C8_MATH_010,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you take 2^(-3), will the visual tower be below 0, equal to 0, or a positive fraction above 0?',
    options: ['Below 0 (negative)', 'Equal to 0', 'A positive fraction (1/8)', 'A large whole number (8)'],
    correctIndex: 2,
    verifyInstruction: 'Drag the Exponent slider to -3 and observe the height gauge!',
    nodeId: NODE_C8_MATH_005,
  },
  {
    question: 'Predict: If you calculate the digit sum of 729 (7 + 2 + 9 = 18), will 729 be divisible by 9?',
    options: ['No, only by 3', 'Yes, because 18 is a multiple of 9', 'No, because it ends in 9', 'Only if the hundreds digit is even'],
    correctIndex: 1,
    verifyInstruction: 'Set the digits to 7, 2, 9 and check the algebraic remainder split!',
    nodeId: NODE_C8_MATH_009,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the number of divisions possible between any two fractions on the number line?',
    observableOptions: [
      'You can keep bisecting indefinitely without ever running out of rational points',
      'The number line stops after 5 subdivisions',
      'Fractions turn into whole numbers when zoomed',
      'Only even denominators are possible',
    ],
    correctIndex: 0,
    nodeId: NODE_C8_MATH_003,
  },
  {
    question: 'What happens to a^(-n) as n increases positively?',
    observableOptions: [
      'The value becomes deeply negative',
      'The fraction 1/a^n becomes smaller and closer to 0, but stays positive',
      'The value stays equal to 1',
      'The base changes',
    ],
    correctIndex: 1,
    nodeId: NODE_C8_MATH_005,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Architectural Blueprint Challenge',
  description: 'Design a modular room floor plan using rational numbers. Calculate the exact tile border perimeter and area when dimensions are fractional (e.g. length = 11/2 m, width = 7/3 m).',
  steps: [
    'Choose fractional room dimensions (e.g., 9/2 m by 8/3 m).',
    'Calculate the area using rational multiplication (l * w).',
    'Calculate the perimeter using 2 * (l + w) with common denominators.',
    'Verify that the resulting border cost at ₹25/m is a closed rational value.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ─��─
function C8_MathematicsPropertiesRationalNumbersSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Difficulty & Mastery
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Reflection State
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Interactive Exploration & Sandbox Sliders / Controls
  const [numberLineZoom, setNumberLineZoom] = useState(1);
  const [numLineLeft, setNumLineLeft] = useState(0);
  const [numLineRight, setNumLineRight] = useState(1);
  const [subdivisionDepth, setSubdivisionDepth] = useState(1);
  const [activePropertyTab, setActivePropertyTab] = useState<'commutative' | 'associative' | 'distributive'>('commutative');
  const [propA, setPropA] = useState(3);
  const [propB, setPropB] = useState(5);
  const [propC, setPropC] = useState(2);
  const [exponentBase, setExponentBase] = useState(2);
  const [exponentPower, setExponentPower] = useState(3);
  const [divDigitA, setDivDigitA] = useState(4);
  const [divDigitB, setDivDigitB] = useState(7);
  const [divDigitC, setDivDigitC] = useState(1);
  const [selectedVennRegion, setSelectedVennRegion] = useState<'none' | 'A_only' | 'B_only' | 'intersection' | 'union'>('none');
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Drag and Drop & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [sandboxFreeMode, setSandboxFreeMode] = useState<'numberline' | 'balance' | 'exponents' | 'divisibility' | 'venn'>('numberline');

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered Challenges based on adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM LOCALSTORAGE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION ───
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
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS WAVE ANIMATION (2D Live Visualization) ───
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore' && phase !== 'sandbox') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 4) {
        const y = canvas.height / 2 + Math.sin(x * 0.05 + frame * 0.05) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulsing rational node indicator
      const cx = (frame * 1.5) % canvas.width;
      const cy = canvas.height / 2 + Math.sin(cx * 0.05 + frame * 0.05) * 8;
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── AUTO-HINT INACTIVITY TIMER ───
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on! Density means infinite fractions!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Rational Number Labs. Let us experiment with density, properties, and exponents.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Play with any interactive lab with no grades.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode active! Apply your understanding to solve real-world problems.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now interact with the visualization below to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation! You are thinking like a mathematician.' : 'Look closely at how the numbers divide endlessly.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Rational Numbers and Exponents mastery module.');
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
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding reasoning.');
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
          speechManager.speak('Here is the complete step-by-step mathematical derivation.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 5000);
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

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleSliderNumberLine = useCallback((val: number) => {
    setSubdivisionDepth(val);
    audioManager.play('count');
  }, []);

  const handleSliderPower = useCallback((val: number) => {
    setExponentPower(val);
    audioManager.play('count');
  }, []);

  const handleTabSwitchProperty = useCallback((tab: 'commutative' | 'associative' | 'distributive') => {
    setActivePropertyTab(tab);
    audioManager.play('tap');
  }, []);

  // ─── DERIVED VALUES FOR VISUALIZATIONS ───
  const exponentCalculated = useMemo(() => {
    if (exponentPower >= 0) {
      return { val: Math.pow(exponentBase, exponentPower), text: `${Math.pow(exponentBase, exponentPower)}` };
    } else {
      const denom = Math.pow(exponentBase, Math.abs(exponentPower));
      return { val: 1 / denom, text: `1/${denom} (= ${(1 / denom).toFixed(4)})` };
    }
  }, [exponentBase, exponentPower]);

  const divisibilityData = useMemo(() => {
    const fullNum = divDigitA * 100 + divDigitB * 10 + divDigitC;
    const digitSum = divDigitA + divDigitB + divDigitC;
    const split99 = 99 * divDigitA + 9 * divDigitB;
    return {
      fullNum,
      digitSum,
      split99,
      div2: divDigitC % 2 === 0,
      div3: digitSum % 3 === 0,
      div5: divDigitC === 0 || divDigitC === 5,
      div9: digitSum % 9 === 0,
      div10: divDigitC === 0,
    };
  }, [divDigitA, divDigitB, divDigitC]);

  // Midpoints generator for number line
  const densityPoints = useMemo(() => {
    const pts = [0, 1];
    let currentMidpoints = [0.5];
    if (subdivisionDepth >= 2) {
      currentMidpoints.push(0.25, 0.75);
    }
    if (subdivisionDepth >= 3) {
      currentMidpoints.push(0.125, 0.375, 0.625, 0.875);
    }
    if (subdivisionDepth >= 4) {
      currentMidpoints.push(0.0625, 0.1875, 0.3125, 0.4375, 0.5625, 0.6875, 0.8125, 0.9375);
    }
    return currentMidpoints.sort((a, b) => a - b);
  }, [subdivisionDepth]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-gold-300 font-medium">CISCE Class 8 Mathematics • Brilliant Interactive Simulator</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700'
                : difficulty === 'standard'
                ? 'bg-gold-950/80 text-gold-400 border-gold-700'
                : 'bg-purple-950/80 text-purple-400 border-purple-700'
            }`}
          >
            {difficulty} Mastery
          </motion.span>
          <div className="text-right">
            <span className="text-xs text-slate-400">Score</span>
            <p className="text-sm font-bold text-amber-400">{Math.max(0, 100 - errors * 5)}%</p>
          </div>
        </div>
      </motion.div>

      {/* ─── DISCOVERY PHASE (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-800/60 rounded-2xl border border-gold-800/40">
            <h2 className="text-xl font-bold text-gold-300 flex items-center gap-2">
              <span>🚀</span> {SCENARIO.title}
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">Curiosity Discovery Hook</p>
            <h3 className="text-lg font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-855 opacity-40 text-slate-400 border border-slate-800'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-slate-900 border border-gold-800/60">
                <p className={discoveryCorrect ? 'text-emerald-400 text-sm font-semibold' : 'text-amber-400 text-sm font-semibold'}>
                  {discoveryCorrect
                    ? '✓ Brilliant intuition! Rational numbers are continuous and dense — you can zoom and cut forever.'
                    : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="mt-4 px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  <span>Enter Interactive Labs</span> →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── EXPLORE PHASE (5 Interactive Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    i === currentSlide ? 'bg-gold-500' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700"
            >
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="p-1.5 bg-gold-900/60 rounded-lg text-gold-300">⚙️</span>
                {EXPLORATION_STEPS[currentSlide].title}
              </h2>
              <p className="text-amber-300 text-sm mt-2 mb-6 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>

              {/* LAB 1: Number Line & Density Zoom */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>Bisection Depth (Repeated Midpoint Law): Level {subdivisionDepth}</span>
                      <span className="text-emerald-400 font-bold">{densityPoints.length} Rational Points Inserted</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={4}
                      value={subdivisionDepth}
                      onChange={e => handleSliderNumberLine(Number(e.target.value))}
                      aria-label="Adjust bisection depth for density property"
                      className="w-full accent-gold-500 cursor-pointer"
                    />

                    {/* SVG Number Line */}
                    <svg viewBox="0 0 700 160" className="w-full mt-4">
                      {/* Base Line */}
                      <line x1="50" y1="80" x2="650" y2="80" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                      <polygon points="40,80 50,75 50,85" fill="#475569" />
                      <polygon points="660,80 650,75 650,85" fill="#475569" />

                      {/* Major Integer Endpoints 0 and 1 */}
                      <circle cx="100" cy="80" r="7" fill="#3b82f6" />
                      <text x="100" y="110" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="bold">0 (0/1)</text>

                      <circle cx="600" cy="80" r="7" fill="#3b82f6" />
                      <text x="600" y="110" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="bold">1 (1/1)</text>

                      {/* Density Subdivisions */}
                      {densityPoints.map((pt, idx) => {
                        const cx = 100 + pt * 500;
                        return (
                          <g key={idx}>
                            <line x1={cx} y1="70" x2={cx} y2="90" stroke="#10b981" strokeWidth="2.5" />
                            <circle cx={cx} cy="80" r="4" fill="#34d399" />
                            <text x={cx} y="60" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">
                              {pt === 0.5 ? '1/2' : pt === 0.25 ? '1/4' : pt === 0.75 ? '3/4' : pt === 0.125 ? '1/8' : pt === 0.375 ? '3/8' : pt === 0.625 ? '5/8' : pt === 0.875 ? '7/8' : `${pt}`}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    <div className="mt-3 p-3 bg-gold-950/40 rounded-xl border border-gold-900/50 text-xs text-gold-300">
                      <strong>The Density Law:</strong> For any rational a/b and c/d, the midpoint <code className="bg-slate-900 px-1.5 py-0.5 rounded text-amber-300 font-mono">((a/b) + (c/d)) / 2</code> is ALWAYS another rational number strictly between them. This process repeats infinitely.
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2: Rational Balance & Property Verification */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(['commutative', 'associative', 'distributive'] as const).map(tab => (
                      <motion.button
                        key={tab}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleTabSwitchProperty(tab)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors ${
                          activePropertyTab === tab
                            ? 'bg-gold-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-750'
                        }`}
                      >
                        {tab} Law
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="text-xs text-slate-400">Numerator p = {propA}</label>
                        <input
                          type="range"
                          min={1}
                          max={9}
                          value={propA}
                          onChange={e => setPropA(Number(e.target.value))}
                          aria-label="Set numerator p"
                          className="w-full accent-gold-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Numerator r = {propB}</label>
                        <input
                          type="range"
                          min={1}
                          max={9}
                          value={propB}
                          onChange={e => setPropB(Number(e.target.value))}
                          aria-label="Set numerator r"
                          className="w-full accent-gold-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Constant k = {propC}</label>
                        <input
                          type="range"
                          min={1}
                          max={5}
                          value={propC}
                          onChange={e => setPropC(Number(e.target.value))}
                          aria-label="Set constant k"
                          className="w-full accent-gold-500"
                        />
                      </div>
                    </div>

                    {/* SVG Balance Scale Visualizer */}
                    <svg viewBox="0 0 600 180" className="w-full">
                      <rect x="295" y="60" width="10" height="90" fill="#64748b" rx="4" />
                      <polygon points="280,150 320,150 300,60" fill="#475569" />
                      <line x1="120" y1="60" x2="480" y2="60" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />

                      {/* Left Pan */}
                      <line x1="150" y1="60" x2="120" y2="100" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="150" y1="60" x2="180" y2="100" stroke="#94a3b8" strokeWidth="2" />
                      <rect x="100" y="100" width="100" height="24" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" rx="6" />
                      <text x="150" y="116" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">
                        {activePropertyTab === 'commutative' && `${propA}/7 + ${propB}/7 = ${(propA + propB)}/7`}
                        {activePropertyTab === 'associative' && `(${propA} + ${propB}) + ${propC} = ${propA + propB + propC}`}
                        {activePropertyTab === 'distributive' && `${propC} * (${propA} + ${propB}) = ${propC * (propA + propB)}`}
                      </text>

                      {/* Right Pan */}
                      <line x1="450" y1="60" x2="420" y2="100" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="450" y1="60" x2="480" y2="100" stroke="#94a3b8" strokeWidth="2" />
                      <rect x="400" y="100" width="100" height="24" fill="#1e293b" stroke="#10b981" strokeWidth="2" rx="6" />
                      <text x="450" y="116" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                        {activePropertyTab === 'commutative' && `${propB}/7 + ${propA}/7 = ${(propB + propA)}/7`}
                        {activePropertyTab === 'associative' && `${propA} + (${propB} + ${propC}) = ${propA + propB + propC}`}
                        {activePropertyTab === 'distributive' && `(${propC}*${propA}) + (${propC}*${propB}) = ${propC * propA + propC * propB}`}
                      </text>

                      <circle cx="300" cy="60" r="8" fill="#e11d48" />
                    </svg>

                    <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-xl text-center text-xs text-emerald-300">
                      ✓ <strong>Balanced Algebraic Truth:</strong> Left Side = Right Side. Rational numbers preserve algebraic identities identically to integers.
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: Exponent Power Inversion Chamber */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* PREDICT-THEN-CHECK */}
                  {!predictionMade && (
                    <div className="p-4 bg-slate-900 rounded-xl border border-amber-500/40">
                      <p className="text-xs text-amber-400 font-bold uppercase mb-1">Step 1: Predict Before Interacting</p>
                      <h4 className="text-sm font-semibold text-white mb-3">{PREDICTION_QUESTIONS[0].question}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 bg-slate-800 text-left rounded-lg text-xs hover:bg-slate-700 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-xs text-slate-400">Base a = {exponentBase}</label>
                        <input
                          type="range"
                          min={2}
                          max={5}
                          value={exponentBase}
                          onChange={e => setExponentBase(Number(e.target.value))}
                          aria-label="Set exponent base"
                          className="w-full accent-gold-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Integral Power n = {exponentPower}</label>
                        <input
                          type="range"
                          min={-3}
                          max={3}
                          value={exponentPower}
                          onChange={e => handleSliderPower(Number(e.target.value))}
                          aria-label="Set integral power exponent"
                          className="w-full accent-gold-500"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-around p-4 bg-slate-900 rounded-xl gap-4">
                      <div className="text-center">
                        <span className="text-xs text-slate-400">Algebraic Form</span>
                        <div className="text-2xl font-black text-gold-400 mt-1 font-mono">
                          {exponentBase}<sup>{exponentPower}</sup>
                        </div>
                      </div>

                      <div className="text-center">
                        <span className="text-xs text-slate-400">Law In Action</span>
                        <div className="text-sm font-bold text-amber-300 mt-1 font-mono">
                          {exponentPower > 0 && `${Array(exponentPower).fill(exponentBase).join(' * ')}`}
                          {exponentPower === 0 && `${exponentBase}^0 = 1 (Zero Exponent Law)`}
                          {exponentPower < 0 && `1 / (${exponentBase}^${Math.abs(exponentPower)}) = 1 / ${Math.pow(exponentBase, Math.abs(exponentPower))}`}
                        </div>
                      </div>

                      <div className="text-center">
                        <span className="text-xs text-slate-400">Evaluated Value</span>
                        <div className="text-xl font-black text-emerald-400 mt-1 font-mono">
                          {exponentCalculated.text}
                        </div>
                      </div>
                    </div>

                    {/* OBSERVATION QUESTION */}
                    {predictionMade && !observationAnswered && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-slate-900/90 rounded-xl border border-gold-700/60">
                        <p className="text-xs font-bold text-gold-300 uppercase mb-1">Scientific Observation</p>
                        <h4 className="text-sm font-semibold text-white mb-3">{OBSERVATION_QUESTIONS[1].question}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleObservation(i)}
                              className="p-2.5 bg-slate-800 text-left rounded-lg text-xs hover:bg-slate-700 text-slate-200"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* LAB 4: Divisibility Algebraic Dissector */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="text-xs text-slate-400">Hundreds Digit a = {divDigitA}</label>
                        <input
                          type="range"
                          min={1}
                          max={9}
                          value={divDigitA}
                          onChange={e => setDivDigitA(Number(e.target.value))}
                          aria-label="Set hundreds digit a"
                          className="w-full accent-gold-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Tens Digit b = {divDigitB}</label>
                        <input
                          type="range"
                          min={0}
                          max={9}
                          value={divDigitB}
                          onChange={e => setDivDigitB(Number(e.target.value))}
                          aria-label="Set tens digit b"
                          className="w-full accent-gold-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Units Digit c = {divDigitC}</label>
                        <input
                          type="range"
                          min={0}
                          max={9}
                          value={divDigitC}
                          onChange={e => setDivDigitC(Number(e.target.value))}
                          aria-label="Set units digit c"
                          className="w-full accent-gold-500"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl space-y-3 font-mono text-xs">
                      <div className="text-gold-300 font-bold text-sm">
                        Generalized Place Value: 100({divDigitA}) + 10({divDigitB}) + {divDigitC} = {divisibilityData.fullNum}
                      </div>
                      <div className="text-amber-300">
                        Algebraic Split for 3 & 9: [99({divDigitA}) + 9({divDigitB})] + ({divDigitA} + {divDigitB} + {divDigitC})
                      </div>
                      <div className="text-slate-300">
                        = [{divisibilityData.split99} (always divisible by 9 & 3)] + [Digit Sum = {divisibilityData.digitSum}]
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-2 text-center">
                        <div className={`p-2 rounded-lg ${divisibilityData.div2 ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-rose-950/40 text-rose-400'}`}>
                          Div by 2: {divisibilityData.div2 ? '✓ YES' : '✗ NO'}
                        </div>
                        <div className={`p-2 rounded-lg ${divisibilityData.div3 ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-rose-950/40 text-rose-400'}`}>
                          Div by 3: {divisibilityData.div3 ? '✓ YES' : '✗ NO'}
                        </div>
                        <div className={`p-2 rounded-lg ${divisibilityData.div5 ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-rose-950/40 text-rose-400'}`}>
                          Div by 5: {divisibilityData.div5 ? '✓ YES' : '✗ NO'}
                        </div>
                        <div className={`p-2 rounded-lg ${divisibilityData.div9 ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-rose-950/40 text-rose-400'}`}>
                          Div by 9: {divisibilityData.div9 ? '✓ YES' : '✗ NO'}
                        </div>
                        <div className={`p-2 rounded-lg ${divisibilityData.div10 ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-rose-950/40 text-rose-400'}`}>
                          Div by 10: {divisibilityData.div10 ? '✓ YES' : '✗ NO'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: Interactive Venn Partition Machine */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <p className="text-xs text-slate-400 mb-3">Click on any Venn partition to inspect its set elements:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(['none', 'A_only', 'B_only', 'intersection', 'union'] as const).map(reg => (
                        <motion.button
                          key={reg}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedVennRegion(reg)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize ${
                            selectedVennRegion === reg
                              ? 'bg-gold-600 text-white'
                              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {reg.replace('_', ' ')}
                        </motion.button>
                      ))}
                    </div>

                    {/* Interactive Venn Diagram SVG */}
                    <svg viewBox="0 0 500 220" className="w-full">
                      <rect x="20" y="20" width="460" height="180" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      <text x="40" y="45" fill="#64748b" fontSize="12" fontWeight="bold">Universal Set U (Numbers &lt; 15)</text>

                      {/* Circle A: Primes */}
                      <circle
                        cx="190"
                        cy="110"
                        r="75"
                        fill={selectedVennRegion === 'A_only' || selectedVennRegion === 'union' ? '#4f46e5' : '#312e81'}
                        fillOpacity={selectedVennRegion === 'A_only' || selectedVennRegion === 'union' ? 0.7 : 0.3}
                        stroke="#6366f1"
                        strokeWidth="2"
                        className="cursor-pointer"
                        onClick={() => setSelectedVennRegion('A_only')}
                      />
                      <text x="140" y="70" fill="#818cf8" fontSize="12" fontWeight="bold">Set A (Primes)</text>
                      <text x="150" y="115" fill="#c7d2fe" fontSize="11">{'{2}'}</text>

                      {/* Circle B: Odds */}
                      <circle
                        cx="310"
                        cy="110"
                        r="75"
                        fill={selectedVennRegion === 'B_only' || selectedVennRegion === 'union' ? '#059669' : '#064e3b'}
                        fillOpacity={selectedVennRegion === 'B_only' || selectedVennRegion === 'union' ? 0.7 : 0.3}
                        stroke="#10b981"
                        strokeWidth="2"
                        className="cursor-pointer"
                        onClick={() => setSelectedVennRegion('B_only')}
                      />
                      <text x="320" y="70" fill="#34d399" fontSize="12" fontWeight="bold">Set B (Odds)</text>
                      <text x="340" y="115" fill="#a7f3d0" fontSize="11">{'{1, 9}'}</text>

                      {/* Overlap / Intersection */}
                      <text x="250" y="115" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                        {'{3, 5, 7, 11, 13}'}
                      </text>
                    </svg>

                    <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300">
                      <strong>Current Selection Elements:</strong>{' '}
                      {selectedVennRegion === 'intersection' && <span className="text-amber-400 font-mono font-bold">A ∩ B = {'{3, 5, 7, 11, 13}'} (Size 5)</span>}
                      {selectedVennRegion === 'union' && <span className="text-gold-400 font-mono font-bold">A ∪ B = {'{1, 2, 3, 5, 7, 9, 11, 13}'} (Size 8)</span>}
                      {selectedVennRegion === 'A_only' && <span className="text-gold-300 font-mono font-bold">A Only = {'{2}'} (Even Prime)</span>}
                      {selectedVennRegion === 'B_only' && <span className="text-emerald-300 font-mono font-bold">B Only = {'{1, 9}'} (Composite/Non-prime Odds)</span>}
                      {selectedVennRegion === 'none' && <span className="text-slate-500 font-mono">Click a region above to inspect</span>}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
              >
                Open Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── SANDBOX PHASE (Free Play Before Challenges) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">🎮 Mathematical Sandbox Lab</h2>
                <p className="text-xs text-slate-400 mt-1">Free un-graded exploration. Switch between visual tools and manipulate variables freely.</p>
              </div>
              <div className="flex gap-2">
                {(['numberline', 'balance', 'exponents', 'divisibility', 'venn'] as const).map(mode => (
                  <motion.button
                    key={mode}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSandboxFreeMode(mode)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize ${
                      sandboxFreeMode === mode ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-750'
                    }`}
                  >
                    {mode}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sandbox Visual Body */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              {sandboxFreeMode === 'numberline' && (
                <div className="space-y-3">
                  <span className="text-xs text-slate-400">Subdivision Level: {subdivisionDepth}</span>
                  <input
                    type="range"
                    min={1}
                    max={4}
                    value={subdivisionDepth}
                    onChange={e => setSubdivisionDepth(Number(e.target.value))}
                    aria-label="Sandbox bisection depth slider"
                    className="w-full accent-gold-500"
                  />
                  <div className="text-center font-mono text-sm text-emerald-400 font-bold">
                    Inserted {densityPoints.length} rational fractions between 0 and 1.
                  </div>
                </div>
              )}

              {sandboxFreeMode === 'exponents' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-400">Base = {exponentBase}</span>
                    <input
                      type="range"
                      min={2}
                      max={6}
                      value={exponentBase}
                      onChange={e => setExponentBase(Number(e.target.value))}
                      aria-label="Sandbox exponent base"
                      className="w-full accent-gold-500"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Power = {exponentPower}</span>
                    <input
                      type="range"
                      min={-3}
                      max={3}
                      value={exponentPower}
                      onChange={e => setExponentPower(Number(e.target.value))}
                      aria-label="Sandbox exponent power"
                      className="w-full accent-gold-500"
                    />
                  </div>
                  <div className="col-span-2 text-center text-lg font-mono text-gold-300">
                    {exponentBase}<sup>{exponentPower}</sup> = {exponentCalculated.text}
                  </div>
                </div>
              )}

              {sandboxFreeMode === 'divisibility' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="range"
                      min={1}
                      max={9}
                      value={divDigitA}
                      onChange={e => setDivDigitA(Number(e.target.value))}
                      aria-label="Sandbox digit a"
                      className="accent-gold-500"
                    />
                    <input
                      type="range"
                      min={0}
                      max={9}
                      value={divDigitB}
                      onChange={e => setDivDigitB(Number(e.target.value))}
                      aria-label="Sandbox digit b"
                      className="accent-gold-500"
                    />
                    <input
                      type="range"
                      min={0}
                      max={9}
                      value={divDigitC}
                      onChange={e => setDivDigitC(Number(e.target.value))}
                      aria-label="Sandbox digit c"
                      className="accent-gold-500"
                    />
                  </div>
                  <div className="text-center text-amber-300 font-mono text-sm">
                    Number: {divisibilityData.fullNum} | Digit Sum: {divisibilityData.digitSum} (Divisible by 3: {divisibilityData.div3 ? 'Yes' : 'No'}, by 9: {divisibilityData.div9 ? 'Yes' : 'No'})
                  </div>
                </div>
              )}

              {(sandboxFreeMode === 'balance' || sandboxFreeMode === 'venn') && (
                <div className="text-center py-6 text-slate-400 text-sm">
                  Interact with property balances or Venn sets directly using the parameters configured above.
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAdvanceToChallenge}
              className="mt-6 w-full py-3.5 bg-gradient-to-r from-emerald-600 to-gold-600 text-white rounded-xl font-black text-sm shadow-xl flex items-center justify-center gap-2"
            >
              <span>🚀 Ready For CISCE Board & Competency Challenges!</span> →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Live Wave Indicator Canvas */}
          <canvas ref={canvasRef} width={600} height={26} className="w-full bg-slate-950/60 rounded-xl border border-slate-800" />

          {/* Progress Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded bg-gold-950 text-gold-300 border border-gold-800 font-mono uppercase">
                  NEP: {challenge.competencyLevel}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  Node: {challenge.nodeId}
                </span>
              </div>
            </div>
            <motion.span
              key={challenge.difficulty}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                challenge.difficulty === 'foundation'
                  ? 'bg-emerald-950/70 text-emerald-400 border-emerald-700'
                  : challenge.difficulty === 'standard'
                  ? 'bg-gold-950/70 text-gold-400 border-gold-700'
                  : 'bg-purple-950/70 text-purple-400 border-purple-700'
              }`}
            >
              {challenge.difficulty}
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.35 }}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'bg-slate-800/80 border-slate-700'
            }`}
          >
            <h3 className="text-base md:text-lg font-semibold text-white mb-4 leading-snug">{challenge.question}</h3>

            {/* MCQ Types (classify, distinguish, match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 hover:bg-slate-750 text-slate-200 border border-slate-700/60'
                    }`}
                  >
                    <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numeric value..."
                    disabled={showExplanation}
                    aria-label="Enter numeric answer"
                    className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-base font-mono w-64 focus:outline-none focus:border-gold-500"
                  />
                  {challenge.unit && <span className="text-slate-400 text-sm font-medium">{challenge.unit}</span>}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* Drag Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag these labels onto their matching properties below:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'prop_closure', title: 'a + b is always rational' },
                    { id: 'prop_comm', title: 'a + b = b + a' },
                    { id: 'prop_assoc', title: '(a + b) + c = a + (b + c)' },
                    { id: 'prop_dist', title: 'a * (b + c) = a*b + a*c' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-between"
                    >
                      <span className="text-xs font-mono text-slate-300">{target.title}</span>
                      <span className={`px-3 py-1 rounded text-xs font-bold ${
                        droppedLabels[target.id] ? 'bg-emerald-900 text-emerald-300 border border-emerald-600' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {droppedLabels[target.id] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-sm font-bold shadow-lg"
                >
                  Verify All Labels
                </motion.button>
              </div>
            )}

            {/* Drag Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-slate-400">Re-order items into the correct chronological mathematical order:</p>
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
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-900 rounded-xl border border-slate-700/80 flex items-center gap-3 cursor-grab text-xs font-medium text-slate-200"
                  >
                    <span className="font-mono text-gold-400 font-bold">{displayIdx + 1}.</span>
                    {item}
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-3 px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-sm font-bold"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-4 space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1 bg-gold-800 text-white rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gold-900/80 border border-gold-700 text-gold-200 rounded text-xs font-mono flex items-center gap-1">
                      {p}
                      <button onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-400 ml-1">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-500 text-xs">Assemble mathematical expression...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-sm font-bold"
                >
                  Verify Constructed Proof
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Explanation Banner with Progressive Disclosure */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3">
                <p className="text-amber-300 text-xs font-bold uppercase tracking-wider">Step-by-Step Mathematical Derivation:</p>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-amber-200 text-xs md:text-sm leading-relaxed font-sans">
                      <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-amber-800 text-amber-100 rounded-lg text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Module →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-gold-950/80 to-slate-900 rounded-3xl border border-gold-700/50 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Module Mastery Achieved!</h2>
            <p className="text-gold-200 text-sm max-w-xl mx-auto">
              You have completed all Class 8 rational number, exponent, root, divisibility, and set partition challenges.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-center min-w-[120px]">
                <span className="text-xs text-slate-400">Final Score</span>
                <p className="text-2xl font-black text-amber-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-center min-w-[120px]">
                <span className="text-xs text-slate-400">Mastery Level</span>
                <p className="text-2xl font-black text-emerald-400 uppercase">{masteryLevel}</p>
              </div>
            </div>

            {/* Motivational Feedback */}
            <div className="p-4 bg-emerald-950/50 rounded-xl border border-emerald-800 text-emerald-300 text-xs font-semibold max-w-2xl mx-auto">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have mastered every concept flawlessly!'
                : errors <= 3
                ? '✨ Outstanding work! You have robust conceptual clarity across all properties.'
                : errors <= 7
                ? '📈 Good solid effort! Review the misconception profile below to solidify your understanding.'
                : '💪 Step-by-step progress! Review the rules and retry the interactive labs to reach full mastery.'}
            </div>
          </div>

          {/* ─── REFLECTION & METACOGNITION SECTION ─── */}
          <div className="p-6 bg-gradient-to-br from-slate-900 via-gold-950/40 to-slate-900 rounded-3xl border border-gold-700/60 shadow-xl space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl p-2 bg-gold-900/60 rounded-xl border border-gold-600/40">🤔</span>
              <div>
                <h3 className="text-lg font-bold text-white">Reflect & Deepen Understanding</h3>
                <p className="text-xs text-gold-300 font-medium">Metacognitive synthesis: solidifying insights beyond formula memorization.</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Reflection Question 1 */}
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-amber-300 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">1</span>
                  What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionResponses.surprising}
                  onChange={e => setReflectionResponses(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., Negative exponents make numbers into reciprocals, not negative numbers; or density allows infinite rational numbers between any two fractions..."
                  rows={2}
                  className="w-full p-3 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              {/* Reflection Question 2 */}
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">2</span>
                  How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionResponses.explain}
                  onChange={e => setReflectionResponses(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g., Rational numbers are fractions that follow algebra rules. Divisibility works because place values like 100a + 10b split cleanly into multiples of 9 plus digit sums..."
                  rows={2}
                  className="w-full p-3 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              {/* Reflection Question 3 */}
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-gold-300 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs">3</span>
                  Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionResponses.realLife}
                  onChange={e => setReflectionResponses(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g., In engineering blueprints, calculating scale factors, solar panel tiling budgets, modular construction dimensions, or satellite telemetry set filters..."
                  rows={2}
                  className="w-full p-3 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 italic">
                {reflectionSaved ? '✓ Your reflection responses are saved to your learning log.' : 'Take a moment to write your thoughts.'}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setReflectionSaved(true);
                  audioManager.play('success');
                  speechManager.speak('Great reflections! Thinking about what you learned solidifies mastery.');
                }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
              >
                {reflectionSaved ? 'Update Reflection' : 'Save Reflection'}
              </motion.button>
            </div>
          </div>

          {/* Misconception Tracking Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <span>⚠️</span> Specific Misconceptions To Review
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/50 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SRS) Visibility */}
          <div className="p-6 bg-amber-950/30 rounded-2xl border border-amber-800/60">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-2">
              📅 Spaced Repetition Review Schedule
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on the SM-2 learning curve, your next retention checkpoint is due in{' '}
              <strong className="text-amber-300 font-bold">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>
              . Revisiting concepts strengthens long-term neural pathways.
            </p>
          </div>

          {/* Real World Activity */}
          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>📐</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-2.5 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                  <span className="font-bold text-gold-400 mr-1.5">{i + 1}.</span> {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK SYSTEM POPUPS (sim-engine) ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Milestone Reached!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_MathematicsPropertiesRationalNumbersSim;
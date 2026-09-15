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

// ─── NODE CONSTANTS ────────────────────────────────────────────────────────
const NODE_C8_MATH_011 = 'c8_math_011'; // Disjoint set
const NODE_C8_MATH_012 = 'c8_math_012'; // Complement of a set
const NODE_C8_MATH_013 = 'c8_math_013'; // Advanced problems on percentages, profit, overhead, discount, tax
const NODE_C8_MATH_014 = 'c8_math_014'; // Difference between simple and compound interest
const NODE_C8_MATH_015 = 'c8_math_015'; // Direct and inverse variations
const NODE_C8_MATH_016 = 'c8_math_016'; // Time and work problems
const NODE_C8_MATH_017 = 'c8_math_017'; // Formula for compound interest
const NODE_C8_MATH_018 = 'c8_math_018'; // Multiplication & division of algebraic expressions
const NODE_C8_MATH_019 = 'c8_math_019'; // Identities: (a+b)^2, (a-b)^2, a^2-b^2
const NODE_C8_MATH_020 = 'c8_math_020'; // Properties of inequalities

const ALL_NODE_IDS = [
  NODE_C8_MATH_011,
  NODE_C8_MATH_012,
  NODE_C8_MATH_013,
  NODE_C8_MATH_014,
  NODE_C8_MATH_015,
  NODE_C8_MATH_016,
  NODE_C8_MATH_017,
  NODE_C8_MATH_018,
  NODE_C8_MATH_019,
  NODE_C8_MATH_020,
];

// ─── NARRATIVE SCENARIO ────────────���────────────────────────────────────────
const SCENARIO = {
  title: 'The Smart City Math Architect',
  intro: 'You are appointed Chief Operations Analyst for "Dholera Smart City". From zoning disjoint industrial/residential sectors and auditing municipal infrastructure finances, to calculating compound municipal bond yields and balancing worker efficiency on transit projects, your mathematical mastery determines the city’s success.',
  context: 'Manage 10 mission-critical domains: Set Partitioning, Budget Auditing, Growth Projection, Algebraic Layouts, and Structural Inequalities.',
};

// ─── DISCOVERY HOOK ─────────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'In the city layout, Sector A has odd plot IDs {1, 3, 5} and Sector B has even plot IDs {2, 4, 6}. If an engineer claims Sectors A and B overlap because both belong to the city (Universal Set U), is she right?',
  options: [
    'Yes — because they share the same master city grid U',
    'No — because they share zero plot IDs (A ∩ B = ∅), making them strictly disjoint',
    'Yes — all sectors in a city must intersect by definition',
    'No — because Sector A has more plots than Sector B'
  ],
  correctIndex: 1,
  hintAfter: 'Belonging to the same Universal Set does not mean sets overlap! Disjointness is purely about whether they share any elements.',
};

// ─── CHALLENGE INTERFACE ───────────────────────────────────────────────────
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

// ─── CHALLENGES ARRAY (24 Comprehensive ICSE Challenges) ────────────────────
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (1-8) ---
  {
    id: 'ch_math_01',
    nodeId: NODE_C8_MATH_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Two sets X = {multiples of 3 < 10} = {3, 6, 9} and Y = {multiples of 5 < 10} = {5} are compared. What is X ∩ Y?',
    options: ['{15}', '{3, 5, 6, 9}', '∅ (Empty Set)', '{0}'],
    correctIndex: 2,
    explanation: 'Since no number less than 10 is both a multiple of 3 and 5, X ∩ Y = ∅. Therefore, X and Y are disjoint sets.',
    hints: [
      'Check if any single element appears in both sets.',
      'List members: X={3,6,9}, Y={5}. Do they have any common item?',
      'There is no common element, so the intersection is the null set ∅.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_math_02',
    nodeId: NODE_C8_MATH_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Let Universal Set U = {1, 2, 3, 4, 5, 6} and Set A = {2, 4, 6}. What is the complement A\' (or U - A)?',
    options: ['{1, 3, 5}', '{2, 4, 6}', '{1, 2, 3, 4, 5, 6}', '∅'],
    correctIndex: 0,
    explanation: 'The complement A\' contains all elements of U that are NOT in A. Removing {2, 4, 6} from U leaves {1, 3, 5}. Notice A ∪ A\' = U and A ∩ A\' = ∅.',
    hints: [
      'Complement means everything in the Universal Set EXCEPT set A.',
      'Take U={1,2,3,4,5,6} and cross out 2, 4, and 6.',
      'The leftover elements are {1, 3, 5}.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_math_03',
    nodeId: NODE_C8_MATH_013,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A dealer buys solar equipment for ₹10,000 and pays ₹1,500 transport + ₹500 installation. What is the Effective Cost Price (in ₹)?',
    correctAnswer: 12000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Effective CP = Purchase Price + All Overhead Expenses = ₹10,000 + ₹1,500 + ₹500 = ₹12,000. Profit or loss must always be calculated on this base.',
    hints: [
      'Overhead expenses must be added to the purchase cost.',
      'Add ₹10,000 + ₹1,500 + ₹500.',
      'The sum is ₹12,000.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_math_04',
    nodeId: NODE_C8_MATH_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In municipal water piping, if 4 pumps take 18 hours to fill a reservoir, how long will 6 pumps take (at the same rate)?',
    options: ['27 hours', '12 hours', '15 hours', '8 hours'],
    correctIndex: 1,
    explanation: 'Pumps and time vary INVERSELY (xy = k). Total work = 4 × 18 = 72 pump-hours. For 6 pumps: Time = 72 / 6 = 12 hours.',
    hints: [
      'More pumps working together take LESS time. This is inverse variation.',
      'Calculate total pump-hours: 4 × 18 = 72.',
      'Divide 72 by 6 pumps to get 12 hours.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_math_05',
    nodeId: NODE_C8_MATH_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Multiply the monomials: (-3x²y) × (4xy³).',
    options: ['-12x³y⁴', '-12x²y³', '1x³y⁴', '-7x³y⁴'],
    correctIndex: 0,
    explanation: 'Multiply coefficients (-3 × 4 = -12) and add exponents for matching variables: x^(2+1) = x³ and y^(1+3) = y⁴, giving -12x³y⁴.',
    hints: [
      'Multiply numerical coefficients first: -3 × 4.',
      'Apply exponent rule: x^m × x^n = x^(m+n).',
      'The result is -12 * x^(2+1) * y^(1+3) = -12x³y⁴.'
    ],
  },
  {
    id: 'ch_math_06',
    nodeId: NODE_C8_MATH_019,
    type: 'construct',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Construct the correct algebraic identity expansion for (x + 4)²',
    availableParts: ['x²', '+ 8x', '+ 16', '+ 4x', '+ 8', '- 8x'],
    targetState: 'x² + 8x + 16',
    validationHint: 'Use the identity (a + b)² = a² + 2ab + b² with a=x and b=4.',
    explanation: '(x + 4)² = x² + 2(x)(4) + 4² = x² + 8x + 16. The middle term 2ab is essential and cannot be omitted!',
    hints: [
      'Recall (a+b)² = a² + 2ab + b².',
      'Here a = x and b = 4. 2ab = 2 × x × 4 = 8x, and b² = 16.',
      'Assemble: x² followed by + 8x followed by + 16.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_math_07',
    nodeId: NODE_C8_MATH_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What happens to the inequality sign in -4x < 20 when both sides are divided by -4?',
    options: [
      'The sign stays < (x < -5)',
      'The sign REVERSES to > (x > -5)',
      'The sign becomes = (x = -5)',
      'The sign becomes ≤ (x ≤ -5)'
    ],
    correctIndex: 1,
    explanation: 'Dividing or multiplying an inequality by a NEGATIVE number reverses the direction of the inequality sign. Thus, -4x < 20 becomes x > -5.',
    hints: [
      'Remember the critical rule: multiplying or dividing by a negative flips the direction.',
      'Dividing by -4 reflects values across 0 on the number line.',
      'Flip < to >: x > 20 / (-4) = -5.'
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_math_08',
    nodeId: NODE_C8_MATH_014,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Calculate Simple Interest on ₹8,000 at 10% per annum for 2 years (in ₹).',
    correctAnswer: 1600,
    tolerance: 0,
    unit: '₹',
    explanation: 'SI = (P × R × T) / 100 = (8000 × 10 × 2) / 100 = ₹1,600.',
    hints: [
      'Use the formula SI = (P × R × T) / 100.',
      'P = 8000, R = 10, T = 2.',
      'SI = 8000 × 10 × 2 / 100 = 1600.'
    ],
  },

  // --- STANDARD TIER (9-16) ---
  {
    id: 'ch_math_09',
    nodeId: NODE_C8_MATH_011,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Let P = {x : x is a prime number < 12} and Q = {x : x is an even natural number < 12}. Are P and Q disjoint sets?',
    options: [
      'Yes — prime numbers and even numbers never overlap',
      'No — the number 2 belongs to both P and Q (P ∩ Q = {2})',
      'Yes — because their universal sets are different',
      'No — because all numbers under 12 are included'
    ],
    correctIndex: 1,
    explanation: 'P = {2, 3, 5, 7, 11} and Q = {2, 4, 6, 8, 10}. Because 2 is the only even prime, P ∩ Q = {2} ≠ ∅. Therefore, they are NOT disjoint.',
    hints: [
      'List all elements of P and Q explicitly.',
      'Is 2 a prime number? Is 2 an even number?',
      'Since 2 is in both, P ∩ Q = {2}, so the intersection is not empty.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_math_10',
    nodeId: NODE_C8_MATH_013,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A smart grid meter has a Marked Price of ₹5,000. It receives a 10% discount, followed by an 18% GST on the discounted price. What is the final price paid by the city (in ₹)?',
    correctAnswer: 5310,
    tolerance: 1,
    unit: '₹',
    explanation: 'Step 1: Discount = 10% of 5000 = ₹500. Discounted Price = ₹4,500. Step 2: GST = 18% of 4500 = ₹810. Final Bill = 4500 + 810 = ₹5,310.',
    hints: [
      'Find the selling price after discount first (₹5,000 - 10%).',
      'Discounted SP = ₹4,500.',
      'Add 18% GST on ₹4,500: 4500 × 1.18 = ₹5,310.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_math_11',
    nodeId: NODE_C8_MATH_014,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'For ₹10,000 at 10% p.a. for 2 years compounded yearly, find the DIFFERENCE between Compound Interest and Simple Interest (in ₹).',
    correctAnswer: 100,
    tolerance: 0,
    unit: '₹',
    explanation: 'SI = (10000 × 10 × 2)/100 = ₹2,000. For CI: Year 1 = ₹1,000 (Amount ₹11,000). Year 2 Interest = 10% of 11,000 = ₹1,100 (Total CI = ₹2,100). Difference = 2100 - 2000 = ₹100 (which is 10% interest on Year 1 interest).',
    hints: [
      'Calculate SI: (10000 × 10 × 2)/100 = ₹2,000.',
      'Calculate CI: A = 10000 × (1.1)² = ₹12,100, so CI = ₹2,100.',
      'CI - SI = 2100 - 2000 = ₹100.'
    ],
  },
  {
    id: 'ch_math_12',
    nodeId: NODE_C8_MATH_016,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: '6 technicians can wire a telecom hub in 15 days. How many days will 10 technicians take to complete the exact same task?',
    correctAnswer: 9,
    tolerance: 0,
    unit: 'days',
    explanation: 'Total work in technician-days = 6 × 15 = 90 man-days. Time for 10 technicians = 90 / 10 = 9 days.',
    hints: [
      'Fixed total work = Technicians × Days = 6 × 15 = 90.',
      'More workers mean fewer days.',
      'Divide 90 man-days by 10 technicians = 9 days.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_math_13',
    nodeId: NODE_C8_MATH_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the Compound Interest on ₹8,000 at 5% per annum compounded HALF-YEARLY for 1 year (in ₹).',
    correctAnswer: 405,
    tolerance: 1,
    unit: '₹',
    explanation: 'Half-yearly rate = 5/2 = 2.5%. Number of steps = 2 half-years. Step 1: 8000 + 2.5%(8000) = ₹8,200. Step 2: 8200 + 2.5%(8200) = ₹8,405. CI = 8405 - 8000 = ₹405.',
    hints: [
      'For half-yearly compounding: rate becomes R/2 = 2.5%, periods become 2n = 2.',
      'Amount = 8000 × (1 + 2.5/100)² = 8000 × (1.025)² = 8000 × 1.050625 = ₹8,405.',
      'CI = Amount - Principal = 8405 - 8000 = ₹405.'
    ],
  },
  {
    id: 'ch_math_14',
    nodeId: NODE_C8_MATH_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Divide the polynomial (18x⁴ - 12x³ + 6x²) by 6x².',
    options: [
      '3x² - 2x + 1',
      '3x² - 2x',
      '3x² - 2x + 6',
      '12x² - 6x + 1'
    ],
    correctIndex: 0,
    explanation: 'Divide each term separately: (18x⁴/6x²) - (12x³/6x²) + (6x²/6x²) = 3x² - 2x + 1. Notice 6x²/6x² = 1, NOT 0.',
    hints: [
      'Divide each term of the numerator by 6x².',
      '18x⁴ / 6x² = 3x², -12x³ / 6x² = -2x.',
      'Remember 6x² / 6x² = 1.'
    ],
  },
  {
    id: 'ch_math_15',
    nodeId: NODE_C8_MATH_019,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Using the identity a² - b² = (a - b)(a + b), evaluate 105² - 95² without long squaring.',
    correctAnswer: 2000,
    tolerance: 0,
    unit: '',
    explanation: '105² - 95² = (105 - 95)(105 + 95) = (10) × (200) = 2,000. Quick, elegant, and error-proof!',
    hints: [
      'Identify a = 105 and b = 95.',
      'Compute (a - b) = 10 and (a + b) = 200.',
      'Multiply (10)(200) = 2000.'
    ],
  },
  {
    id: 'ch_math_16',
    nodeId: NODE_C8_MATH_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Solve the inequality: 7 - 3x ≤ 19.',
    options: ['x ≥ -4', 'x ≤ -4', 'x ≥ 4', 'x ≤ 4'],
    correctIndex: 0,
    explanation: 'Subtract 7 from both sides: -3x ≤ 12. Divide both sides by -3 and REVERSE the inequality: x ≥ -4.',
    hints: [
      'Step 1: Subtract 7 from both sides to isolate -3x.',
      '-3x ≤ 19 - 7 => -3x ≤ 12.',
      'Step 2: Divide by -3 and flip the sign: x ≥ 12 / (-3) = -4.'
    ],
    misconceptionIndex: 5,
  },

  // --- ADVANCED TIER (17-24) ---
  {
    id: 'ch_math_17',
    nodeId: NODE_C8_MATH_012,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Drag the correct Set Theory region identities to the Venn Diagram components.',
    dragItems: [
      { label: 'A ∩ B (Intersection)', targetId: 'target_center' },
      { label: 'A only (A - B)', targetId: 'target_left' },
      { label: 'B only (B - A)', targetId: 'target_right' },
      { label: '(A ∪ B)\' (Outside both in U)', targetId: 'target_outside' },
    ],
    correctMapping: {
      target_left: 'A only (A - B)',
      target_center: 'A ∩ B (Intersection)',
      target_right: 'B only (B - A)',
      target_outside: '(A ∪ B)\' (Outside both in U)',
    },
    explanation: 'The Venn diagram partitions U into 4 mutually disjoint sets: A-only, Shared (Intersection), B-only, and Outside Complement.',
    hints: [
      'The overlapping lens in the middle is the intersection A ∩ B.',
      'The left crescent is elements in A but not in B (A - B).',
      'The exterior rectangle region is everything outside A and B: (A ∪ B)\'.'
    ],
  },
  {
    id: 'ch_math_18',
    nodeId: NODE_C8_MATH_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An electronics retailer offers two successive discounts of 20% and 10% on a laptop marked at ₹40,000. A customer claims this equals a 30% single discount. Evaluate this claim.',
    options: [
      'The claim is TRUE: 20% + 10% = 30% discount (Pay ₹28,000)',
      'The claim is FALSE: Successive discounts give 40000 × 0.80 × 0.90 = ₹28,800 (Effective discount is 28%)',
      'The claim is FALSE: Successive discounts give ₹27,500 (Effective discount is 31.25%)',
      'The claim is TRUE only if tax is added first'
    ],
    correctIndex: 1,
    explanation: 'Successive discounts apply to the reducing balance: After 20% off ₹40,000 = ₹32,000. Then 10% off ₹32,000 = ��3,200 discount, making SP = ₹28,800. Net discount is ₹11,200 (28%), NOT 30%.',
    hints: [
      'Discounts multiply: Price = MP × (1 - d1) × (1 - d2).',
      '40,000 × 0.8 × 0.9 = 40,000 × 0.72 = ₹28,800.',
      'The discount received is 100% - 72% = 28%, not 30%.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_math_19',
    nodeId: NODE_C8_MATH_017,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the logical pattern steps in deriving the Compound Interest formula A = P(1 + R/100)ⁿ.',
    sortItems: [
      'Year 1 End: A₁ = P + P(R/100) = P(1 + R/100)',
      'Year 2 End: A₂ = A₁(1 + R/100) = P(1 + R/100)²',
      'Year 3 End: A₃ = A₂(1 + R/100) = P(1 + R/100)³',
      'Generalization after n years: A = P(1 + R/100)ⁿ'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Each compounding cycle multiplies the previous accumulated amount by the growth factor (1 + R/100), leading directly to the exponential formula A = P(1 + R/100)ⁿ.',
    hints: [
      'Start with Year 1 where interest is added to original Principal P.',
      'Next is Year 2 where Year 1 amount becomes the new Principal.',
      'Year 3 multiplies by (1+R/100) again, and finally generalize to power n.'
    ],
  },
  {
    id: 'ch_math_20',
    nodeId: NODE_C8_MATH_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Evaluate (0.97)² using the algebraic identity (a - b)² = a² - 2ab + b².',
    options: ['0.9409', '0.9400', '0.9609', '0.9109'],
    correctIndex: 0,
    explanation: 'Write 0.97 as (1 - 0.03). (1 - 0.03)² = 1² - 2(1)(0.03) + (0.03)² = 1 - 0.06 + 0.0009 = 0.9409.',
    hints: [
      'Set a = 1 and b = 0.03.',
      'Compute 1² - 2(1)(0.03) + (0.03)² = 1 - 0.06 + 0.0009.',
      '1 - 0.06 = 0.94, add 0.0009 = 0.9409.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_math_21',
    nodeId: NODE_C8_MATH_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Solve for x ∈ W (Whole Numbers: {0, 1, 2, ...}): -5 ≤ 2x - 1 < 7.',
    options: [
      '{0, 1, 2, 3}',
      '{-2, -1, 0, 1, 2, 3}',
      '{1, 2, 3}',
      '{0, 1, 2, 3, 4}'
    ],
    correctIndex: 0,
    explanation: 'Add 1 across all parts: -4 ≤ 2x < 8. Divide by 2: -2 ≤ x < 4. Since domain is Whole numbers W (≥ 0), the solution set is {0, 1, 2, 3}.',
    hints: [
      'Solve compound inequality by adding 1: -4 ≤ 2x < 8.',
      'Divide by 2: -2 ≤ x < 4.',
      'Filter for Whole numbers (x ≥ 0): {0, 1, 2, 3}.'
    ],
  },
  {
    id: 'ch_math_22',
    nodeId: NODE_C8_MATH_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate whether the simplification (2x - 3)(3x + 4) = 6x² - 12 is mathematically sound.',
    options: [
      'Sound — you multiply the first terms and the last terms',
      'Flawed — it drops the outer and inner middle terms (+8x - 9x = -x), correct is 6x² - x - 12',
      'Flawed — the sign of 12 should be +12',
      'Sound — provided x is an integer'
    ],
    correctIndex: 1,
    explanation: '(2x - 3)(3x + 4) = 2x(3x + 4) - 3(3x + 4) = 6x² + 8x - 9x - 12 = 6x² - x - 12. Dropping middle cross-terms is a frequent ICSE board error.',
    hints: [
      'Use the distributive law for all 4 terms: First, Outer, Inner, Last.',
      'Outer is 2x(4)=+8x; Inner is -3(3x)=-9x.',
      'Sum of middle terms: +8x - 9x = -x.'
    ],
  },
  {
    id: 'ch_math_23',
    nodeId: NODE_C8_MATH_015,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A contractor calculates that 12 excavators can dig a metro tunnel in 20 days. If the project timeline is slashed to 15 days, how many EXTRA excavators must be deployed?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'excavators',
    explanation: 'Total work = 12 × 20 = 240 excavator-days. Excavators needed for 15 days = 240 / 15 = 16 excavators. Extra excavators needed = 16 - 12 = 4.',
    hints: [
      'Find total work: 12 × 20 = 240 machine-days.',
      'Find total machines needed for 15 days: 240 / 15 = 16.',
      'The question asks for EXTRA machines: 16 - 12 = 4.'
    ],
  },
  {
    id: 'ch_math_24',
    nodeId: NODE_C8_MATH_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'True or False: "If Sets A and B are unequal (A ≠ B), they MUST be disjoint."',
    options: [
      'True — different sets never share elements',
      'False — e.g. A = {1, 2, 3} and B = {3, 4, 5} are unequal, yet share {3} so they are NOT disjoint',
      'True — as long as both belong to the same universal set',
      'False — disjoint sets can never be subsets of U'
    ],
    correctIndex: 1,
    explanation: 'Unequal simply means not identical. Disjoint is a much stricter condition requiring zero common members (A ∩ B = ∅). Unequal sets frequently overlap.',
    hints: [
      'Think of a counterexample: do {1, 2} and {2, 3} have different members?',
      'Yes, they are unequal. Do they share anything? Yes, {2}.',
      'Hence, inequality does NOT imply disjointness.'
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
  nodeId: NODE_C8_MATH_011,
  title: 'Class 8 ICSE Mathematics Master Simulation',
  definition: 'Comprehensive mastery of Set Operations (Disjoint & Complements), Commercial Arithmetic (Compound Interest, Overheads, GST), Algebraic Products & Identities, Variation, and Inequalities.',
  eli5: 'Think of this as your interactive engineering toolbox for smart city math: from Venn diagrams and interest snowballs to algebra area models and balance scales!',
  misconceptions: [
    { misconception: 'Two unequal sets (A ≠ B) are automatically disjoint.', correction: 'Disjointness strictly requires A ∩ B = ∅ (zero shared elements). Unequal sets often overlap.' },
    { misconception: 'The complement A\' means everything in the world outside A.', correction: 'Complement is strictly relative to the Universal Set U (A\' = U - A).' },
    { misconception: 'Two successive discounts of 10% and 5% equal a 15% discount.', correction: 'Successive discounts apply to the reducing balance, yielding 14.5% total discount.' },
    { misconception: 'Time & work is direct variation (more workers = more days).', correction: 'When work is fixed, workers and time vary inversely (workers × days = constant).' },
    { misconception: '(a + b)² equals a² + b².', correction: 'Squaring a binomial produces three terms: a² + 2ab + b². Never omit the middle term!' },
    { misconception: 'Multiplying/dividing an inequality by a negative number preserves the sign.', correction: 'Multiplying or dividing by a negative number flips the inequality direction.' },
  ],
  diagnosticQuestions: [
    { question: 'What condition defines two sets A and B as disjoint?', options: ['A = B', 'A ∪ B = U', 'A ∩ B = ∅', 'n(A) = n(B)'], correctIndex: 2 },
    { question: 'If U = {1..10} and A = {even numbers}, what is A\'?', options: ['{odd numbers in U}', '{even numbers}', '∅', 'U'], correctIndex: 0 },
    { question: 'Effective Cost Price equals:', options: ['Purchase Price - Overheads', 'Purchase Price + Overheads', 'Selling Price + Tax', 'Marked Price - Discount'], correctIndex: 1 },
    { question: 'What is the formula for CI Amount after n years?', options: ['P(1 + R/100)ⁿ', 'P + (PRT/100)', 'P(1 + nR/100)', 'P(R/100)ⁿ'], correctIndex: 0 },
    { question: 'If 8 men build a wall in 6 days, 12 men will take:', options: ['9 days', '4 days', '5 days', '3 days'], correctIndex: 1 },
    { question: 'Expand (2x - 3)²:', options: ['4x² - 9', '4x² - 12x + 9', '4x² - 6x + 9', '4x² + 9'], correctIndex: 1 },
    { question: 'If -2x > 8, then:', options: ['x > -4', 'x < -4', 'x > 4', 'x < 4'], correctIndex: 1 },
    { question: 'Factorise 49x² - 36:', options: ['(7x - 6)²', '(7x - 6)(7x + 6)', '(49x - 6)(x + 6)', '(7x + 6)²'], correctIndex: 1 },
  ],
  masteryCriteria: 'Demonstrate rigorous procedural and conceptual competency across ICSE Class 8 sets, arithmetic, algebra, and inequalities.',
};

// ─── INTERACTIVE EXPLORATION STEPS ──────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Set Architect: Disjoint & Complement',
    instruction: 'Toggle elements in Sets A and B. Observe when A ∩ B becomes empty (Disjoint) and how A\' shades the universal space.',
    interactionType: 'venn-toggle',
    nodeId: NODE_C8_MATH_011,
  },
  {
    title: 'Commercial Finance: Overheads to GST Pipeline',
    instruction: 'Adjust Purchase Price, Overheads, Discount %, and GST %. Trace how each cost tier compounds into the final customer bill.',
    interactionType: 'commercial-pipeline',
    nodeId: NODE_C8_MATH_013,
  },
  {
    title: 'Interest Snowball: Simple vs Compound Growth',
    instruction: 'Move the timeline slider from Year 1 to Year 3. Notice how Compound Interest pulls ahead due to "interest on interest".',
    interactionType: 'interest-snowball',
    nodeId: NODE_C8_MATH_014,
  },
  {
    title: 'Inverse Variation Seesaw: Work & Workers',
    instruction: 'Change the number of workers. Watch the project timeline dynamically shrink while total man-days remain strictly constant.',
    interactionType: 'work-seesaw',
    nodeId: NODE_C8_MATH_016,
  },
  {
    title: 'Algebraic Visual Proof: (a + b)²',
    instruction: 'Drag sliders for dimension "a" and "b". Observe the 4 geometric regions: a², ab, ab, and b² summing to (a+b)²',
    interactionType: 'algebra-area',
    nodeId: NODE_C8_MATH_019,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you invest ₹10,000 at 10% p.a., what will be the difference between CI and SI in Year 1?',
    options: ['₹100 extra in CI', '₹0 (They are completely identical in Year 1)', '₹50 extra in CI', 'SI will be higher'],
    correctIndex: 1,
    verifyInstruction: 'Drag the Interest Timeline slider to Year 1 to verify that SI and CI amounts match exactly!',
    nodeId: NODE_C8_MATH_014,
  },
  {
    question: 'Predict: If you multiply both sides of -3 < 5 by -2, what must happen to the sign?',
    options: ['Sign stays < (6 < -10)', 'Sign flips to > because 6 is greater than -10', 'Sign turns into equal', 'Cannot multiply by negatives'],
    correctIndex: 1,
    verifyInstruction: 'Notice on the number line that 6 is to the RIGHT of -10, proving that -3 < 5 becomes +6 > -10.',
    nodeId: NODE_C8_MATH_020,
  },
];

// ─── OBSERVATION QUESTIONS ──────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the "Middle Term" (2ab) in the geometric area model as "b" increases?',
    observableOptions: [
      'The two rectangular strips (ab) grow, proving (a+b)² is always larger than a² + b²',
      'The middle term disappears',
      'The middle term becomes negative',
      'Only the a² square expands'
    ],
    correctIndex: 0,
    nodeId: NODE_C8_MATH_019,
  },
  {
    question: 'When workers double from 4 to 8 on a fixed task, what happens to completion days?',
    observableOptions: [
      'Days double',
      'Days are halved (Inverse Variation)',
      'Days remain unchanged',
      'Days increase by 4'
    ],
    correctIndex: 1,
    nodeId: NODE_C8_MATH_016,
  },
];

// ─── REAL-WORLD ACTIVITY ────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Smart City Metro & Finance Project',
  description: 'Apply your mathematical tools to real-world infrastructure: calculate the compound yield on a ₹50 Crore municipal green bond, zone disjoint hospital/industrial land parcels, and budget project procurement with GST.',
  steps: [
    'Calculate 3-year compound interest on ₹50 Cr at 8% p.a. municipal bond yield.',
    'Formulate the set intersection of Residential and Chemical Hazard zones to guarantee disjointness (A ∩ B = ∅).',
    'Calculate total man-days needed for 4.5 km track laying and determine worker allocation.',
    'Solve structural stress safety inequalities: Ensure Maximum Load ≤ Critical Threshold.'
  ],
};

function C8_MathematicsDisjointSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C8_MATH_011,
  title = DEFAULT_PROPS.title || 'Class 8 ICSE Mathematics',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow state
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Prediction & Observation state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Discovery phase state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Hints & Explanations
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual feedback animations
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Interactive Exploration & Sandbox States
  // 1. Sets interactive state
  const [setAItems, setSetAItems] = useState<number[]>([1, 3, 5]);
  const [setBItems, setSetBItems] = useState<number[]>([2, 4, 6]);
  const [activeSetView, setActiveSetView] = useState<'both' | 'complementA' | 'intersection'>('both');

  // 2. Commercial Math interactive state
  const [purchasePrice, setPurchasePrice] = useState<number>(10000);
  const [overheadCost, setOverheadCost] = useState<number>(2000);
  const [discountPercent, setDiscountPercent] = useState<number>(15);
  const [gstPercent, setGstPercent] = useState<number>(18);
  const [markedPriceVal, setMarkedPriceVal] = useState<number>(16000);

  // 3. Interest interactive state
  const [principalVal, setPrincipalVal] = useState<number>(10000);
  const [rateVal, setRateVal] = useState<number>(10);
  const [yearsTimeline, setYearsTimeline] = useState<number>(2);

  // 4. Time & Work interactive state
  const [workerCount, setWorkerCount] = useState<number>(6);
  const totalManDaysFixed = 72; // constant work

  // 5. Algebra Area Model interactive state
  const [dimA, setDimA] = useState<number>(4);
  const [dimB, setDimB] = useState<number>(2);

  // 6. Inequality visualizer state
  const [inequalityA, setInequalityA] = useState<number>(-3);
  const [inequalityB, setInequalityB] = useState<number>(6);
  const [inequalityOp, setInequalityOp] = useState<'<' | '≤' | '>' | '≥'>('<');

  // Challenge dynamic inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── MOTIVATIONAL FEEDBACK HELPER ──────────────────────────────────────────
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // ─── DERIVED VALUES ───────────────────────────────────────────────────────
  // Sets: Intersection and Disjointness
  const setIntersection = useMemo(() => {
    return setAItems.filter(x => setBItems.includes(x));
  }, [setAItems, setBItems]);

  const isDisjoint = useMemo(() => setIntersection.length === 0, [setIntersection]);

  // Commercial Math calculations
  const effectiveCP = useMemo(() => purchasePrice + overheadCost, [purchasePrice, overheadCost]);
  const discountedSP = useMemo(() => markedPriceVal * (1 - discountPercent / 100), [markedPriceVal, discountPercent]);
  const gstAmount = useMemo(() => discountedSP * (gstPercent / 100), [discountedSP, gstPercent]);
  const finalCustomerPayable = useMemo(() => discountedSP + gstAmount, [discountedSP, gstAmount]);
  const netProfit = useMemo(() => discountedSP - effectiveCP, [discountedSP, effectiveCP]);
  const profitPercentage = useMemo(() => (effectiveCP > 0 ? (netProfit / effectiveCP) * 100 : 0), [netProfit, effectiveCP]);

  // Interest Calculations
  const siAmount = useMemo(() => {
    const interest = (principalVal * rateVal * yearsTimeline) / 100;
    return principalVal + interest;
  }, [principalVal, rateVal, yearsTimeline]);

  const ciAmount = useMemo(() => {
    return principalVal * Math.pow(1 + rateVal / 100, yearsTimeline);
  }, [principalVal, rateVal, yearsTimeline]);

  const interestDifference = useMemo(() => Math.max(0, ciAmount - siAmount), [ciAmount, siAmount]);

  // Work & Days Calculation
  const completionDays = useMemo(() => {
    return workerCount > 0 ? (totalManDaysFixed / workerCount).toFixed(1) : '0';
  }, [workerCount]);

  // Algebra Area calculation
  const areaTotal = useMemo(() => Math.pow(dimA + dimB, 2), [dimA, dimB]);
  const areaA2 = useMemo(() => dimA * dimA, [dimA]);
  const areaB2 = useMemo(() => dimB * dimB, [dimB]);
  const area2AB = useMemo(() => 2 * dimA * dimB, [dimA, dimB]);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD MASTERY ────────────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE UPDATES ─────────────────────────────────────────────────
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

  // ─── 2D CANVAS ANIMATION (Snowball & Set Pulse) ───────────────────────────
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

      // Draw background dynamic grid
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw mathematical waveform
      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + frame * 2) * 0.05) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulsing indicator
      const pulseR = 4 + Math.sin(frame * 0.1) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 25, canvas.height / 2, pulseR, 0, Math.PI * 2);
      ctx.fillStyle = isDisjoint ? '#10b981' : '#f59e0b';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [isDisjoint]);

  // ─── AUTO-HINT TIMER ──────────────────────────────────────────────────────
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        if (activeChallenge.hints && activeChallenge.hints.length > 0) {
          setCurrentHint(activeChallenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Here is a hint to help you solve this.');
        }
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, activeChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallenge]);

  // ─── CALLBACK HANDLERS ────────────────────────────────────────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the core mathematics through interactive labs.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with any variables with no pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the ICSE challenges. Solve each problem with precision.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Precise mathematical observation!' : 'Look closely at the visual geometry.');
  }, []);

  const toggleSetElement = useCallback((setKey: 'A' | 'B', element: number) => {
    audioManager.play('tap');
    if (setKey === 'A') {
      setSetAItems(prev => prev.includes(element) ? prev.filter(x => x !== element) : [...prev, element]);
    } else {
      setSetBItems(prev => prev.includes(element) ? prev.filter(x => x !== element) : [...prev, element]);
    }
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered ICSE Class 8 Mathematics.');
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
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Spot on! Excellent working.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us analyze the step-by-step solution together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === activeChallenge.sortItems?.length ? [...prev] : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-inner"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              {title}
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono">
                ICSE Class 8
              </span>
            </h1>
            <p className="text-xs text-slate-400">Adaptive Smart City Mathematics Simulation Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <canvas ref={canvasRef} width={140} height={36} className="rounded-lg bg-slate-900 border border-slate-800 hidden sm:block" />
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950 text-rose-400 border-rose-700'
                : 'bg-indigo-950 text-indigo-400 border-indigo-700'
            }`}
          >
            {difficulty} Tier
          </motion.span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ───────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-400">Mission Briefing</span>
            <h2 className="text-2xl font-black text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-indigo-300 flex items-center gap-2">
              <span className="text-base" aria-hidden="true">📍</span> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" aria-hidden="true" />
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wide">Intuition Hook Question</h3>
            </div>
            <p className="text-base font-semibold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/50 border-slate-800 text-slate-500'
                      : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-indigo-500 hover:bg-slate-800'
                  }`}
                >
                  <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-slate-950 border border-indigo-900/60 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm">
                  <p className={discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400 font-semibold'}>
                    {discoveryCorrect ? '✓ Spot-on intuition!' : '✗ 💡 Key Concept:'}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Launch interactive labs"
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                >
                  Launch Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (Brilliant.org Core) ─────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-indigo-400 font-mono tracking-widest uppercase">
                Interactive Concept Lab ({currentSlide + 1} of {EXPLORATION_STEPS.length})
              </span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-1.5" aria-hidden="true">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentSlide ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-800'
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
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800"
            >
              <p className="text-sm text-amber-300 font-medium mb-4 flex items-center gap-2">
                <span aria-hidden="true">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ── LAB 0: SETS (Disjoint & Complement) ── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold uppercase text-indigo-400 mb-2">Set A Elements (Click to Toggle)</h4>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <motion.button
                            key={num}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleSetElement('A', num)}
                            aria-label={`Toggle number ${num} in Set A`}
                            className={`w-9 h-9 rounded-lg font-mono font-bold text-xs ${
                              setAItems.includes(num)
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                          >
                            {num}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold uppercase text-teal-400 mb-2">Set B Elements (Click to Toggle)</h4>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <motion.button
                            key={num}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleSetElement('B', num)}
                            aria-label={`Toggle number ${num} in Set B`}
                            className={`w-9 h-9 rounded-lg font-mono font-bold text-xs ${
                              setBItems.includes(num)
                                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/40'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                          >
                            {num}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SVG Venn Diagram */}
                  <div className="relative p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 500 240" className="w-full max-w-lg" aria-label="Venn Diagram visualizer for Set A and Set B">
                      {/* Universal Set Rectangle */}
                      <rect x="10" y="10" width="480" height="220" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      <text x="30" y="36" fill="#94a3b8" fontSize="12" fontWeight="bold">Universal Set U = {'{1..8}'}</text>

                      {/* Circle A */}
                      <circle
                        cx="190"
                        cy="125"
                        r="80"
                        fill="rgba(99, 102, 241, 0.25)"
                        stroke="#6366f1"
                        strokeWidth="2.5"
                      />
                      <text x="140" y="70" fill="#a5b4fc" fontSize="12" fontWeight="bold">Set A</text>

                      {/* Circle B */}
                      <circle
                        cx="310"
                        cy="125"
                        r="80"
                        fill="rgba(20, 184, 166, 0.25)"
                        stroke="#14b8a6"
                        strokeWidth="2.5"
                      />
                      <text x="340" y="70" fill="#99f6e4" fontSize="12" fontWeight="bold">Set B</text>

                      {/* Elements Rendering */}
                      <text x="150" y="130" fill="#c7d2fe" fontSize="11" textAnchor="middle">
                        {setAItems.filter(x => !setBItems.includes(x)).join(', ') || '∅'}
                      </text>
                      <text x="250" y="130" fill="#fbbf24" fontSize="11" textAnchor="middle" fontWeight="bold">
                        {setIntersection.join(', ') || '∅'}
                      </text>
                      <text x="350" y="130" fill="#99f6e4" fontSize="11" textAnchor="middle">
                        {setBItems.filter(x => !setAItems.includes(x)).join(', ') || '∅'}
                      </text>
                    </svg>

                    <div className="mt-3 flex items-center gap-4 text-xs font-mono">
                      <span className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        A ∩ B = {'{'}{setIntersection.join(', ') || '∅'}{'}'}
                      </span>
                      <span
                        className={`p-2 rounded-lg border font-bold ${
                          isDisjoint
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                            : 'bg-amber-950 text-amber-300 border-amber-600'
                        }`}
                      >
                        {isDisjoint ? '✓ Disjoint Sets (A ∩ B = ∅)' : '✗ Overlapping (A ∩ B ≠ ∅)'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 1: COMMERCIAL FINANCIAL PIPELINE ── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label htmlFor="p-price" className="text-[10px] text-slate-400 font-bold uppercase block">Purchase Price: ₹{purchasePrice}</label>
                      <input
                        id="p-price"
                        type="range"
                        min={5000}
                        max={25000}
                        step={1000}
                        value={purchasePrice}
                        onChange={e => setPurchasePrice(Number(e.target.value))}
                        aria-label="Purchase Price Slider"
                        className="w-full accent-indigo-500 mt-2"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label htmlFor="p-overhead" className="text-[10px] text-slate-400 font-bold uppercase block">Overheads: ₹{overheadCost}</label>
                      <input
                        id="p-overhead"
                        type="range"
                        min={0}
                        max={5000}
                        step={500}
                        value={overheadCost}
                        onChange={e => setOverheadCost(Number(e.target.value))}
                        aria-label="Overhead Costs Slider"
                        className="w-full accent-indigo-500 mt-2"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label htmlFor="p-disc" className="text-[10px] text-slate-400 font-bold uppercase block">Discount: {discountPercent}%</label>
                      <input
                        id="p-disc"
                        type="range"
                        min={0}
                        max={40}
                        step={5}
                        value={discountPercent}
                        onChange={e => setDiscountPercent(Number(e.target.value))}
                        aria-label="Discount Percentage Slider"
                        className="w-full accent-teal-500 mt-2"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label htmlFor="p-gst" className="text-[10px] text-slate-400 font-bold uppercase block">GST: {gstPercent}%</label>
                      <input
                        id="p-gst"
                        type="range"
                        min={0}
                        max={28}
                        step={1}
                        value={gstPercent}
                        onChange={e => setGstPercent(Number(e.target.value))}
                        aria-label="GST Percentage Slider"
                        className="w-full accent-amber-500 mt-2"
                      />
                    </div>
                  </div>

                  {/* Pipeline Flow Visualization */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[11px] text-slate-400 block font-bold">1. Effective Cost Price</span>
                        <span className="text-sm font-black text-indigo-400 font-mono">₹{effectiveCP.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-500 block">Purchase + Overheads</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[11px] text-slate-400 block font-bold">2. Discounted SP</span>
                        <span className="text-sm font-black text-teal-400 font-mono">₹{discountedSP.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-500 block">MP ({markedPriceVal}) - {discountPercent}%</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[11px] text-slate-400 block font-bold">3. Final Bill (+GST)</span>
                        <span className="text-sm font-black text-amber-400 font-mono">₹{finalCustomerPayable.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-500 block">SP + {gstPercent}% Tax</span>
                      </div>
                    </div>

                    <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-900 flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">Dealer Return on Investment:</span>
                      <span className={`font-mono font-bold ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {netProfit >= 0 ? '✓ +' : '✗ '}₹{netProfit.toLocaleString()} ({profitPercentage.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: INTEREST SNOWBALL ACCUMULATOR ── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {/* PREDICT-THEN-CHECK */}
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/50 rounded-xl border border-indigo-800 mb-4">
                      <p className="text-xs text-amber-300 font-bold uppercase tracking-wider mb-2">⚡ Predict before Interacting</p>
                      <p className="text-sm text-slate-200 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Prediction option ${i + 1}: ${opt}`}
                            className="p-2.5 text-xs text-left bg-slate-900 border border-slate-700 rounded-lg text-slate-300 hover:border-indigo-400"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label htmlFor="int-p" className="text-[10px] text-slate-400 font-bold uppercase block">Principal: ₹{principalVal.toLocaleString()}</label>
                      <input
                        id="int-p"
                        type="range"
                        min={5000}
                        max={50000}
                        step={5000}
                        value={principalVal}
                        onChange={e => setPrincipalVal(Number(e.target.value))}
                        aria-label="Principal Amount Slider"
                        className="w-full accent-indigo-500 mt-2"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label htmlFor="int-r" className="text-[10px] text-slate-400 font-bold uppercase block">Interest Rate: {rateVal}% p.a.</label>
                      <input
                        id="int-r"
                        type="range"
                        min={5}
                        max={20}
                        step={1}
                        value={rateVal}
                        onChange={e => setRateVal(Number(e.target.value))}
                        aria-label="Interest Rate Slider"
                        className="w-full accent-teal-500 mt-2"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label htmlFor="int-t" className="text-[10px] text-slate-400 font-bold uppercase block">Time Period: {yearsTimeline} Years</label>
                      <input
                        id="int-t"
                        type="range"
                        min={1}
                        max={3}
                        step={1}
                        value={yearsTimeline}
                        onChange={e => setYearsTimeline(Number(e.target.value))}
                        aria-label="Timeline in Years Slider"
                        className="w-full accent-amber-500 mt-2"
                      />
                    </div>
                  </div>

                  {/* Side-by-Side Comparison Bars */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span className="text-slate-400">Simple Interest Total Amount:</span>
                          <span className="text-indigo-400 font-bold">₹{siAmount.toFixed(0)}</span>
                        </div>
                        <div className="h-4 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                          <motion.div
                            className="h-full bg-indigo-500 rounded-full"
                            animate={{ width: `${Math.min(100, (siAmount / (principalVal * 2)) * 100)}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span className="text-slate-400">Compound Interest Total Amount (Snowball):</span>
                          <span className="text-teal-400 font-bold">₹{ciAmount.toFixed(0)}</span>
                        </div>
                        <div className="h-4 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                          <motion.div
                            className="h-full bg-teal-500 rounded-full"
                            animate={{ width: `${Math.min(100, (ciAmount / (principalVal * 2)) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                      <span className="text-amber-400 font-bold">CI - SI Surplus (Interest on Interest):</span>
                      <span className="font-mono text-amber-300 font-extrabold text-sm">
                        +₹{interestDifference.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: TIME & WORK INVERSE SEESAW ── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                      <label htmlFor="w-count">Deployment Size: {workerCount} Workers</label>
                      <span className="font-mono text-indigo-400">Total Fixed Work: {totalManDaysFixed} Man-Days</span>
                    </div>
                    <input
                      id="w-count"
                      type="range"
                      min={1}
                      max={18}
                      step={1}
                      value={workerCount}
                      onChange={e => setWorkerCount(Number(e.target.value))}
                      aria-label="Worker Count Slider"
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                    {/* Visual Seesaw */}
                    <svg viewBox="0 0 400 120" className="w-full max-w-md" aria-label="Work and Workers inverse variation seesaw">
                      {/* Fulcrum */}
                      <polygon points="200,80 180,110 220,110" fill="#475569" />
                      {/* Plank */}
                      <motion.line
                        x1="50"
                        y1={80 - (workerCount - 9) * 2}
                        x2="350"
                        y2={80 + (workerCount - 9) * 2}
                        stroke="#6366f1"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      {/* Workers Side */}
                      <circle cx="70" cy={70 - (workerCount - 9) * 2} r="14" fill="#6366f1" />
                      <text x="70" y={74 - (workerCount - 9) * 2} fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">
                        {workerCount}W
                      </text>
                      {/* Days Side */}
                      <circle cx="330" cy={70 + (workerCount - 9) * 2} r="14" fill="#14b8a6" />
                      <text x="330" y={74 + (workerCount - 9) * 2} fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">
                        {completionDays}D
                      </text>
                    </svg>

                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 text-center font-mono text-xs">
                      <span className="text-slate-400">Equation: </span>
                      <span className="text-indigo-400 font-bold">{workerCount} workers</span> ×{' '}
                      <span className="text-teal-400 font-bold">{completionDays} days</span> ={' '}
                      <span className="text-amber-400 font-bold">72 Man-Days (Constant)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: ALGEBRAIC GEOMETRIC AREA PROOF ── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label htmlFor="dim-a" className="text-[10px] text-slate-400 font-bold uppercase block">Dimension a: {dimA}</label>
                      <input
                        id="dim-a"
                        type="range"
                        min={1}
                        max={6}
                        value={dimA}
                        onChange={e => setDimA(Number(e.target.value))}
                        aria-label="Dimension a Slider"
                        className="w-full accent-indigo-500 mt-2"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label htmlFor="dim-b" className="text-[10px] text-slate-400 font-bold uppercase block">Dimension b: {dimB}</label>
                      <input
                        id="dim-b"
                        type="range"
                        min={1}
                        max={6}
                        value={dimB}
                        onChange={e => setDimB(Number(e.target.value))}
                        aria-label="Dimension b Slider"
                        className="w-full accent-teal-500 mt-2"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                    {/* SVG Geometric Area Model */}
                    <svg viewBox="0 0 280 280" className="w-56 h-56" aria-label="Algebraic geometric area proof">
                      {/* Region a^2 */}
                      <rect
                        x="20"
                        y="20"
                        width={dimA * 20}
                        height={dimA * 20}
                        fill="#6366f1"
                        opacity="0.8"
                        stroke="#4338ca"
                        strokeWidth="1.5"
                      />
                      <text x={20 + (dimA * 20) / 2} y={20 + (dimA * 20) / 2} fill="white" fontSize="10" textAnchor="middle">
                        a² ({areaA2})
                      </text>

                      {/* Region ab (top right) */}
                      <rect
                        x={20 + dimA * 20}
                        y="20"
                        width={dimB * 20}
                        height={dimA * 20}
                        fill="#14b8a6"
                        opacity="0.7"
                        stroke="#0f766e"
                        strokeWidth="1.5"
                      />
                      <text x={20 + dimA * 20 + (dimB * 20) / 2} y={20 + (dimA * 20) / 2} fill="white" fontSize="9" textAnchor="middle">
                        ab ({dimA * dimB})
                      </text>

                      {/* Region ab (bottom left) */}
                      <rect
                        x="20"
                        y={20 + dimA * 20}
                        width={dimA * 20}
                        height={dimB * 20}
                        fill="#14b8a6"
                        opacity="0.7"
                        stroke="#0f766e"
                        strokeWidth="1.5"
                      />
                      <text x={20 + (dimA * 20) / 2} y={20 + dimA * 20 + (dimB * 20) / 2} fill="white" fontSize="9" textAnchor="middle">
                        ab ({dimA * dimB})
                      </text>

                      {/* Region b^2 */}
                      <rect
                        x={20 + dimA * 20}
                        y={20 + dimA * 20}
                        width={dimB * 20}
                        height={dimB * 20}
                        fill="#f59e0b"
                        opacity="0.8"
                        stroke="#d97706"
                        strokeWidth="1.5"
                      />
                      <text x={20 + dimA * 20 + (dimB * 20) / 2} y={20 + dimA * 20 + (dimB * 20) / 2} fill="white" fontSize="9" textAnchor="middle">
                        b² ({areaB2})
                      </text>
                    </svg>

                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-center">
                      <span className="text-white font-bold">({dimA} + {dimB})²</span> ={' '}
                      <span className="text-indigo-400">{areaA2} (a²)</span> +{' '}
                      <span className="text-teal-400">{area2AB} (2ab)</span> +{' '}
                      <span className="text-amber-400">{areaB2} (b²)</span> ={' '}
                      <span className="text-emerald-400 font-black">{areaTotal}</span>
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
              aria-label="Previous interactive lab"
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-30 text-xs font-bold"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-500 font-mono">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                aria-label="Next interactive lab"
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter sandbox mode"
                className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE PLAY ───────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider">Free Exploration Sandbox</span>
            <h3 className="text-lg font-bold text-white mt-1">Multi-Domain Math Workbench</h3>
            <p className="text-xs text-slate-400 mt-1">Manipulate all parameters across systems without time limits or grading.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Inequality Visualizer Widget */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-indigo-400 uppercase">Interactive Inequality Solver</h4>
              <div className="flex items-center gap-2 text-sm font-mono">
                <span>{inequalityA}x</span>
                <select
                  value={inequalityOp}
                  onChange={e => setInequalityOp(e.target.value as '<' | '≤' | '>' | '≥')}
                  aria-label="Inequality operator select"
                  className="bg-slate-900 border border-slate-700 rounded p-1 text-xs text-white"
                >
                  <option value="<">&lt;</option>
                  <option value="≤">≤</option>
                  <option value=">">&gt;</option>
                  <option value="≥">≥</option>
                </select>
                <span>{inequalityB}</span>
              </div>
              <label htmlFor="ineq-slider" className="sr-only">Inequality Coefficient Slider</label>
              <input
                id="ineq-slider"
                type="range"
                min={-10}
                max={10}
                value={inequalityA}
                onChange={e => setInequalityA(Number(e.target.value))}
                aria-label="Inequality coefficient A slider"
                className="w-full accent-indigo-500"
              />
              <div className="p-3 bg-slate-900 rounded-xl text-xs font-mono">
                Result:{' '}
                <span className="text-amber-400 font-bold">
                  {inequalityA === 0
                    ? 'Undefined (a=0)'
                    : inequalityA < 0
                    ? `x ${inequalityOp === '<' ? '>' : inequalityOp === '≤' ? '≥' : inequalityOp === '>' ? '<' : '≤'} ${(inequalityB / inequalityA).toFixed(1)} (SIGN FLIPPED!)`
                    : `x ${inequalityOp} ${(inequalityB / inequalityA).toFixed(1)}`}
                </span>
              </div>
            </div>

            {/* Compound Interest Mini Simulator */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-teal-400 uppercase">3-Year Snowball Accumulator</h4>
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>P: ₹{principalVal}</span>
                <span>R: {rateVal}%</span>
                <span>T: {yearsTimeline} Yrs</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl space-y-1 text-xs font-mono">
                <div className="text-slate-300">Simple Interest: ₹{siAmount.toFixed(0)}</div>
                <div className="text-teal-400 font-bold">Compound Interest: ₹{ciAmount.toFixed(0)}</div>
                <div className="text-amber-400 font-semibold">Surplus: +₹{interestDifference.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Start Graded ICSE Challenges"
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-600/30 text-sm"
            >
              Start Graded ICSE Challenges →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: GRADED CHALLENGES ────────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 font-mono capitalize">
                Competency: {activeChallenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800" aria-label={`Progress: challenge ${currentChallenge + 1} of ${filteredChallenges.length}`}>
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-teal-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            animate={wrongShake ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <h3 className="text-base font-semibold text-slate-100 mb-4 leading-relaxed">
              {activeChallenge.question}
            </h3>

            {/* MCQ Types */}
            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="grid grid-cols-1 gap-2.5">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`text-left p-4 rounded-xl text-sm transition-all border ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-indigo-500 hover:bg-slate-800/80'
                      }`}
                    >
                      <span className="font-mono text-indigo-400 font-bold mr-2">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                      {showExplanation && i === activeChallenge.correctIndex && (
                        <span className="ml-2 text-emerald-400 font-bold">✓</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag Label Type */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3 py-1.5 bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {['target_left', 'target_center', 'target_right', 'target_outside'].map(target => (
                    <div
                      key={target}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target)}
                      aria-label={`Drop target region: ${target}`}
                      className="p-4 bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl min-h-[60px] flex items-center justify-center text-xs text-slate-400 text-center"
                    >
                      {droppedLabels[target] ? (
                        <span className="text-emerald-400 font-bold">✓ {droppedLabels[target]}</span>
                      ) : (
                        `Drop Target: ${target.replace('target_', '').toUpperCase()}`
                      )}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Verify Diagram Labels"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* Drag Sort Type */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to arrange in logical sequential order:</p>
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, idx) => (
                  <motion.div
                    key={idx}
                    role="button"
                    tabIndex={0}
                    draggable
                    onDragStart={() => setDraggedItem(String(idx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, idx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    aria-label={`Sort step ${idx + 1}: ${item}`}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                      {idx + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  aria-label="Verify step order"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold mt-2"
                >
                  Verify Order
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {activeChallenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value..."
                  aria-label="Numeric answer input"
                  className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-indigo-500 outline-none"
                />
                <span className="text-xs text-slate-400 font-mono">{activeChallenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  aria-label="Submit numeric answer"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Submit
                </motion.button>
              </div>
            )}

            {/* Construct Type */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add formula part ${part}`}
                      className="px-3 py-1.5 bg-indigo-800/60 border border-indigo-700 rounded-lg text-xs text-white"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap items-center gap-2 font-mono text-xs">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-indigo-900 text-indigo-200 rounded-lg flex items-center gap-1">
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        aria-label={`Remove part ${part}`}
                        className="text-rose-400 hover:text-rose-200 ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-600">Click components to assemble formula...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  aria-label="Validate Expression"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Validate Expression
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/30 border border-amber-800/60 rounded-2xl space-y-3"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Detailed Mathematical Derivation:
                </span>
                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-amber-200/90 leading-relaxed font-mono"
                    >
                      <span className="font-bold text-amber-400 mr-1.5">Step {i + 1}:</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex flex-wrap gap-2">
                  {revealedSteps <
                    activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal next step of derivation"
                      className="px-4 py-1.5 bg-amber-800/60 border border-amber-600 text-amber-200 rounded-lg text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Score' : 'Next Challenge'}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 ml-auto"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Score →' : 'Next Challenge →'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD REPORT ───────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950 to-slate-900 rounded-2xl border border-indigo-800/80 text-center space-y-3">
            <span className="text-4xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl font-black text-white">ICSE Mathematics Simulation Completed!</h2>
            <div className="flex justify-center gap-6 text-sm font-mono pt-2">
              <span className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                Final Score: <strong className="text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong>
              </span>
              <span className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                Mastery: <strong className="text-indigo-400 capitalize">{masteryLevel}</strong>
              </span>
            </div>
          </div>

          {/* Motivational Feedback Banner */}
          <div className={`p-4 rounded-xl border text-center font-bold text-base ${
            errors === 0
              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
              : errors <= 3
              ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300'
              : errors <= 7
              ? 'bg-amber-950/60 border-amber-500 text-amber-300'
              : 'bg-rose-950/60 border-rose-500 text-rose-300'
          }`}>
            <span className="text-lg mr-2" aria-hidden="true">
              {errors === 0 ? '🌟' : errors <= 3 ? '✨' : errors <= 7 ? '👍' : '💪'}
            </span>
            {motivationalMessage}
          </div>

          {/* Misconception Review Card */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/50 space-y-3">
              <h4 className="text-xs font-bold uppercase text-rose-400 tracking-wider">
                Targeted Misconceptions Detected:
              </h4>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300">✗ {m.misconception}</p>
                    <p className="text-emerald-300 font-medium">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800 flex items-center justify-between text-xs">
            <span className="text-indigo-300">Spaced Repetition Schedule (SM-2):</span>
            <span className="font-bold text-amber-300">
              Next Review in {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
            </span>
          </div>

          {/* Real-World Mission Culmination */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase text-indigo-400">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                  <span className="font-bold text-indigo-400 mr-2">{idx + 1}.</span> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── MODAL FEEDBACK COMPONENTS ─────────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Validated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_MathematicsDisjointSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C7_MATH_001 = 'c7_math_001'; // Multiplication and division of integers
const NODE_C7_MATH_002 = 'c7_math_002'; // Properties of operations on integers
const NODE_C7_MATH_003 = 'c7_math_003'; // Problem solving using operations on integers (BODMAS)
const NODE_C7_MATH_004 = 'c7_math_004'; // Word problems on integers (temperature, elevation, finance)
const NODE_C7_MATH_005 = 'c7_math_005'; // Introduction to rational numbers & number line
const NODE_C7_MATH_006 = 'c7_math_006'; // Word problems on rational numbers
const NODE_C7_MATH_007 = 'c7_math_007'; // Decimal representation of rational numbers (terminating / recurring)
const NODE_C7_MATH_008 = 'c7_math_008'; // Problem solving with rational numbers and decimal fractions
const NODE_C7_MATH_009 = 'c7_math_009'; // Fraction as an operator ('of' and paper-folding models)
const NODE_C7_MATH_010 = 'c7_math_010'; // Reciprocal of a fraction & division of fractions

const ALL_NODE_IDS = [
  NODE_C7_MATH_001,
  NODE_C7_MATH_002,
  NODE_C7_MATH_003,
  NODE_C7_MATH_004,
  NODE_C7_MATH_005,
  NODE_C7_MATH_006,
  NODE_C7_MATH_007,
  NODE_C7_MATH_008,
  NODE_C7_MATH_009,
  NODE_C7_MATH_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission Antarctic & Indian Deep-Sea Expedition',
  intro: 'You are the lead telemetry scientist for India’s Maitri Antarctic Research Station and the Samudrayaan Deep-Sea Submersible mission. You must calculate extreme temperature swings, submarine elevation shifts, fuel rationing ratios, and scientific probe data using integers, rational numbers, and fractions.',
  context: 'A telemetry glitch requires precise integer sign tracking, rational conversions, and fractional operations to keep the mission crew and equipment safe!',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In Antarctica, the temperature drops by 4°C every hour for 3 consecutive hours. If you remove 3 penalties of 4 debts (-4), what is (-3) × (-4)?',
  options: [
    '-12 (Multiplying negatives stays negative)',
    '+12 (Taking away 3 debts of 4 gives a gain of 12)',
    '-7 (Add the numbers and keep the sign)',
    '0 (The negatives cancel out to nothing)',
  ],
  correctIndex: 1,
  hintAfter: 'Removing debts or reversing a downward trend results in a positive gain! Let us explore why geometrically and algebraically.',
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

// ─── CHALLENGES ARRAY (22 Progressive Challenges: 7 Foundation, 8 Standard, 7 Advanced) ───
const CHALLENGES: Challenge[] = [
  // ── 1. Foundation: Integer Multiply Signs (c7_math_001)
  {
    id: 'ch_01_f',
    nodeId: NODE_C7_MATH_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Calculate the telemetry reading: (-7) × (-8). What is the sign and value?',
    options: ['-56 (opposite rule)', '+56 (same signs give positive)', '-15 (addition rule)', '+1 (subtraction)'],
    correctIndex: 1,
    explanation: 'Both factors have the same negative sign. By the sign rule for integer multiplication, negative × negative = positive. The absolute value is 7 × 8 = 56, so the result is +56.',
    hints: [
      'Look at the signs of both integers: are they the same or opposite?',
      'Multiplying two integers with the SAME sign always yields a positive product.',
      'Absolute value is 7 × 8 = 56. Since both are negative, the answer is +56.',
    ],
    misconceptionIndex: 0,
  },
  // ── 2. Foundation: Integer Division (c7_math_001)
  {
    id: 'ch_02_f',
    nodeId: NODE_C7_MATH_001,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Compute (-72) ÷ 9. Which integer multiplied by 9 gives -72?',
    correctAnswer: -8,
    tolerance: 0,
    unit: '',
    explanation: 'Division is the inverse of multiplication: we find the number which multiplied by 9 gives -72. Since (-8) × 9 = -72, (-72) ÷ 9 = -8. Opposite signs give a negative quotient.',
    hints: [
      'Recall: Negative dividend divided by positive divisor gives a negative quotient.',
      'Ask: what number multiplied by 9 gives 72? That is 8.',
      'Attach the negative sign: -8.',
    ],
    misconceptionIndex: 1,
  },
  // ── 3. Foundation: Properties - Additive & Multiplicative Identity (c7_math_002)
  {
    id: 'ch_03_f',
    nodeId: NODE_C7_MATH_002,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which statement correctly pairs the identity elements for integers?',
    options: [
      'Additive identity is 0; Multiplicative identity is 1',
      'Additive identity is 1; Multiplicative identity is 0',
      'Additive identity is -1; Multiplicative identity is 1',
      'Additive identity is 0; Multiplicative identity is -1',
    ],
    correctIndex: 0,
    explanation: 'For any integer a: a + 0 = a (so 0 is the additive identity) and a × 1 = a (so 1 is the multiplicative identity).',
    hints: [
      'What number can you ADD to -5 without changing it? (0)',
      'What number can you MULTIPLY with -5 without changing it? (1)',
      'Additive identity is 0, multiplicative identity is 1.',
    ],
    misconceptionIndex: 2,
  },
  // ── 4. Foundation: Rational Number Definition (c7_math_005)
  {
    id: 'ch_04_f',
    nodeId: NODE_C7_MATH_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following is NOT a valid rational number in p/q form?',
    options: ['-3/7', '0/5', '5/0', '9/1'],
    correctIndex: 2,
    explanation: 'A rational number is defined as p/q where p and q are integers and q ≠ 0. 5/0 has denominator zero, which is mathematically undefined.',
    hints: [
      'Remember the condition for the denominator q in p/q.',
      'Can you divide any number by zero in mathematics?',
      'q cannot be 0. Thus 5/0 is undefined and not a rational number.',
    ],
    misconceptionIndex: 3,
  },
  // ── 5. Foundation: Drag-Label Rational Number Line (c7_math_005)
  {
    id: 'ch_05_f',
    nodeId: NODE_C7_MATH_005,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Drag each rational number tag to its correct relative zone on the number line.',
    dragItems: [
      { label: '-3/2 (-1.5)', targetId: 'zone_left' },
      { label: '-1/2 (-0.5)', targetId: 'zone_midleft' },
      { label: '+3/4 (+0.75)', targetId: 'zone_midright' },
      { label: '+5/2 (+2.5)', targetId: 'zone_right' },
    ],
    correctMapping: {
      zone_left: '-3/2 (-1.5)',
      zone_midleft: '-1/2 (-0.5)',
      zone_midright: '+3/4 (+0.75)',
      zone_right: '+5/2 (+2.5)',
    },
    explanation: 'On the number line: -1.5 sits to the left of -1; -0.5 is between -1 and 0; +0.75 is between 0 and 1; +2.5 sits to the right of +2.',
    hints: [
      'Numbers more negative than -1 go furthest left.',
      'Positive numbers greater than 2 go furthest right.',
      'Map: -3/2 → Left, -1/2 → Mid-Left, +3/4 → Mid-Right, +5/2 → Right.',
    ],
  },
  // ── 6. Foundation: Fraction as Operator 'of' (c7_math_009)
  {
    id: 'ch_06_f',
    nodeId: NODE_C7_MATH_009,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'The Antarctic station generator has 48 litres of emergency coolant. If 3/4 of it is used, how many litres were consumed?',
    correctAnswer: 36,
    tolerance: 0,
    unit: 'litres',
    explanation: 'Using the operator rhythm: divide by the denominator first: 48 ÷ 4 = 12. Then multiply by numerator: 12 × 3 = 36 litres.',
    hints: [
      'The word "of" means multiplication: 3/4 × 48.',
      'Divide 48 by 4 to find 1 quarter.',
      '12 × 3 = 36 litres.',
    ],
  },
  // ── 7. Foundation: Reciprocal Concept (c7_math_010)
  {
    id: 'ch_07_f',
    nodeId: NODE_C7_MATH_010,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the reciprocal (multiplicative inverse) of the mixed fraction 2 1/3?',
    options: ['3/7', '2 3/1', '-7/3', '7/3'],
    correctIndex: 0,
    explanation: 'First convert the mixed fraction to an improper fraction: 2 1/3 = (2×3 + 1)/3 = 7/3. Then invert numerator and denominator to get 3/7. Notice (7/3) × (3/7) = 1.',
    hints: [
      'Do not flip whole and fractional parts separately!',
      'Convert 2 1/3 to improper fraction: 7/3.',
      'Interchange top and bottom: 3/7.',
    ],
    misconceptionIndex: 4,
  },
  // ── 8. Standard: Distributive Property with Integers (c7_math_002)
  {
    id: 'ch_08_s',
    nodeId: NODE_C7_MATH_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Use the distributive property to compute: (-6) × [20 + (-3)]. Which evaluation is correct?',
    options: [
      '(-6)×20 + (-6)×(-3) = -120 + 18 = -102',
      '(-6)×20 - (-6)×(-3) = -120 - 18 = -138',
      '(-6)×17 = -102 (valid, but does not use distributivity explicitly)',
      '-120 - 18 = -138',
    ],
    correctIndex: 0,
    explanation: 'By distributivity: a × (b + c) = a×b + a×c. (-6)×20 = -120, and (-6)×(-3) = +18. Summing gives -120 + 18 = -102.',
    hints: [
      'Distribute (-6) to both 20 and (-3).',
      'Watch signs: (-6) × (-3) = +18.',
      '-120 + 18 = -102.',
    ],
  },
  // ── 9. Standard: Combined BODMAS on Integers (c7_math_003)
  {
    id: 'ch_09_s',
    nodeId: NODE_C7_MATH_003,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Evaluate telemetry expression: (-48) ÷ 6 + (-3) × (-4) - (-5). Enter the final integer.',
    correctAnswer: 9,
    tolerance: 0,
    unit: '',
    explanation: 'BODMAS steps: 1) Division: (-48) ÷ 6 = -8. 2) Multiplication: (-3) × (-4) = +12. 3) Expression: -8 + 12 - (-5) = 4 + 5 = 9.',
    hints: [
      'Do division and multiplication first left to right: (-48)/6 = -8 and (-3)*(-4) = +12.',
      'Now replace: -8 + 12 - (-5).',
      '4 - (-5) = 4 + 5 = 9.',
    ],
  },
  // ── 10. Standard: Altitude Submersible Word Problem (c7_math_004)
  {
    id: 'ch_10_s',
    nodeId: NODE_C7_MATH_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The Matsya-6000 submarine was at -350 m depth in the Indian Ocean. It descended 180 m further, then ascended 210 m. What is its current depth?',
    options: [
      '-320 m (320 m below sea level)',
      '-40 m (40 m below sea level)',
      '+40 m (40 m above sea level)',
      '-740 m (740 m below sea level)',
    ],
    correctIndex: 0,
    explanation: 'Initial = -350 m. Descend 180 m: -350 + (-180) = -530 m. Ascend 210 m: -530 + (+210) = -320 m (320 m below sea level).',
    hints: [
      'Descending means adding a negative number (-180).',
      '-350 - 180 = -530 m.',
      '-530 + 210 = -320 m.',
    ],
  },
  // ── 11. Standard: Rational Word Problem - Tank Volume (c7_math_006)
  {
    id: 'ch_11_s',
    nodeId: NODE_C7_MATH_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A research lab beaker has 7/2 litres of saline. If experiments consume 3/4 litres in the morning and 5/4 litres in the afternoon, how many litres remain? (Enter in decimal fraction form)',
    correctAnswer: 1.5,
    tolerance: 0.05,
    unit: 'litres',
    explanation: 'Total consumed = 3/4 + 5/4 = 8/4 = 2 litres. Remaining = 7/2 - 2 = 3.5 - 2 = 1.5 litres (or 3/2 litres).',
    hints: [
      'Add the two fractions consumed: 3/4 + 5/4 = 8/4 = 2 litres.',
      'Convert 7/2 to decimal: 3.5 litres.',
      '3.5 - 2 = 1.5 litres.',
    ],
  },
  // ── 12. Standard: Prime Factorization Decimals (c7_math_007)
  {
    id: 'ch_12_s',
    nodeId: NODE_C7_MATH_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Without long division, determine which fraction yields a TERMINATING decimal.',
    options: ['7/75 (75 = 3 × 5²)', '9/40 (40 = 2³ × 5)', '5/21 (21 = 3 × 7)', '4/33 (33 = 3 × 11)'],
    correctIndex: 1,
    explanation: 'A rational number in lowest terms terminates if and only if the prime factorization of its denominator contains ONLY factors of 2 and/or 5. 40 = 2³ × 5 satisfies this condition (9/40 = 0.225).',
    hints: [
      'Check the prime factors of each denominator.',
      'If any prime other than 2 or 5 is present, it is non-terminating recurring.',
      '40 = 2 × 2 × 2 × 5 has only 2s and 5s, so 9/40 terminates.',
    ],
  },
  // ── 13. Standard: Decimal to Fraction p/q (c7_math_007)
  {
    id: 'ch_13_s',
    nodeId: NODE_C7_MATH_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Convert the terminating decimal 0.375 into lowest p/q rational form.',
    options: ['375/100', '3/8', '7/20', '15/32'],
    correctIndex: 1,
    explanation: '0.375 = 375/1000. Dividing numerator and denominator by their HCF 125 gives 3/8.',
    hints: [
      'Write as 375/1000.',
      'Divide top and bottom by 25: 15/40.',
      'Divide by 5 again: 3/8.',
    ],
  },
  // ── 14. Standard: Fraction of a Fraction Paper Folding (c7_math_009)
  {
    id: 'ch_14_s',
    nodeId: NODE_C7_MATH_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A paper strip is folded in half (1/2), then 2/3 of that shaded half is marked with dots. What fraction of the entire sheet is double-marked?',
    options: ['1/3 of the whole', '2/5 of the whole', '5/6 of the whole', '1/6 of the whole'],
    correctIndex: 0,
    explanation: '2/3 of 1/2 = (2×1)/(3×2) = 2/6. Simplifying 2/6 gives 1/3 of the whole sheet.',
    hints: [
      'The word "of" means multiply: (2/3) × (1/2).',
      'Numerator = 2 × 1 = 2; Denominator = 3 × 2 = 6.',
      '2/6 simplifies to 1/3.',
    ],
  },
  // ── 15. Standard: Fraction Division using Reciprocal (c7_math_010)
  {
    id: 'ch_15_s',
    nodeId: NODE_C7_MATH_010,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Solve: (15/4) ÷ (5/8). How many portions of 5/8 fit into 15/4?',
    correctAnswer: 6,
    tolerance: 0,
    unit: 'portions',
    explanation: 'Rule for division: Multiply dividend by reciprocal of divisor: (15/4) × (8/5) = (15×8)/(4×5) = 120/20 = 6.',
    hints: [
      'Invert the second fraction: 5/8 becomes 8/5.',
      'Multiply: (15/4) × (8/5).',
      '(15 ÷ 5) × (8 ÷ 4) = 3 × 2 = 6.',
    ],
  },
  // ── 16. Advanced: Converting Recurring Decimal to Rational (c7_math_007)
  {
    id: 'ch_16_a',
    nodeId: NODE_C7_MATH_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Convert the recurring decimal 0.454545... (0.45) into lowest p/q rational form.',
    options: ['45/100 = 9/20', '45/99 = 5/11', '45/90 = 1/2', '4/9'],
    correctIndex: 1,
    explanation: 'Let x = 0.4545... (1). Then 100x = 45.4545... (2). Subtract (1) from (2): 99x = 45 → x = 45/99. Dividing top and bottom by 9 yields 5/11.',
    hints: [
      'Since 2 digits repeat, multiply x by 100.',
      '100x - x = 45.45... - 0.45... = 45.',
      '99x = 45 → x = 45/99 = 5/11.',
    ],
  },
  // ── 17. Advanced: Multi-step Temperature Sequence (c7_math_004)
  {
    id: 'ch_17_a',
    nodeId: NODE_C7_MATH_004,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'At Maitri Base, temperature at 4 PM was -12°C. It dropped 2.5°C per hour for 4 hours, then a warm blizzard raised it by 8°C. What was the temperature at 9 PM?',
    correctAnswer: -14,
    tolerance: 0.1,
    unit: '°C',
    explanation: 'Drop over 4 hours = 4 × (-2.5) = -10°C. Temperature becomes -12 + (-10) = -22°C. Then rise of +8°C gives -22 + 8 = -14°C.',
    hints: [
      'Calculate total drop: 4 × (-2.5) = -10°C.',
      'New temperature = -12 + (-10) = -22°C.',
      'Add rise: -22 + 8 = -14°C.',
    ],
  },
  // ── 18. Advanced: Drag-Sort Order of Operations in Complex Rational (c7_math_008)
  {
    id: 'ch_18_a',
    nodeId: NODE_C7_MATH_008,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the mathematical steps in correct BODMAS order to evaluate: [3.5 - (1/2 × 4)] ÷ (-0.5)',
    sortItems: [
      'Multiply inside bracket: 1/2 × 4 = 2',
      'Subtract inside bracket: 3.5 - 2 = 1.5',
      'Convert division to fraction/decimal: 1.5 ÷ (-0.5)',
      'Compute signed quotient: -3',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'By BODMAS: evaluate inside brackets first (multiplication before subtraction), then perform the division outside, tracking the negative sign to get -3.',
    hints: [
      'Inner bracket multiplication comes first (1/2 × 4).',
      'Then resolve bracket subtraction (3.5 - 2).',
      'Finally divide by -0.5 to obtain -3.',
    ],
  },
  // ── 19. Advanced: Evaluation of Inverse Properties Claim (c7_math_002)
  {
    id: 'ch_19_a',
    nodeId: NODE_C7_MATH_002,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate this statement: "The set of all integers is closed under both additive inverses and multiplicative inverses." Is this claim mathematically sound?',
    options: [
      'True: every integer has both opposites and reciprocals that are integers',
      'False: integers have additive inverses, but only 1 and -1 have multiplicative inverses that are integers',
      'False: 0 has no additive inverse',
      'True: because rational numbers contain integers',
    ],
    correctIndex: 1,
    explanation: 'Every integer a has an additive inverse -a in integers. However, for any integer other than 1 and -1 (such as 5), the multiplicative inverse is 1/5, which is a fraction, not an integer.',
    hints: [
      'Is the reciprocal of 4 (which is 1/4) an integer?',
      'Integers are closed under additive inverses (e.g. -7 + 7 = 0).',
      'Only 1 and -1 have integer reciprocals (1/1=1, -1/-1=-1).',
    ],
  },
  // ── 20. Advanced: Complex Word Problem Rationing (c7_math_006)
  {
    id: 'ch_20_a',
    nodeId: NODE_C7_MATH_006,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A scientist prepares 18 kg of dehydrated nutrition powder. She packs 2/3 of it into 3/4 kg daily expedition packs. How many complete daily packs can she create?',
    correctAnswer: 16,
    tolerance: 0,
    unit: 'packs',
    explanation: 'Amount packed = 2/3 of 18 kg = (18÷3)×2 = 12 kg. Number of packs = 12 ÷ (3/4) = 12 × (4/3) = 48/3 = 16 packs.',
    hints: [
      'Step 1: Calculate 2/3 of 18 kg = 12 kg.',
      'Step 2: Divide 12 kg by 3/4 kg per pack.',
      '12 × (4/3) = 16 packs.',
    ],
  },
  // ── 21. Advanced: Construct Sign Rule Verification (c7_math_001)
  {
    id: 'ch_21_a',
    nodeId: NODE_C7_MATH_001,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the mathematical terms that prove why (-2) × (-3) = +6 using the distributive law starting with (-2) × [3 + (-3)] = 0',
    availableParts: ['(-2)×3', '+', '(-2)×(-3)', '=', '0', '→', '-6', '+6'],
    targetState: '(-2)×3 + (-2)×(-3) = 0 → -6 + +6 = 0',
    validationHint: 'Click parts in order: (-2)×3 + (-2)×(-3) = 0 → -6 + +6 = 0',
    explanation: 'By distributivity: (-2)×0 = 0 → (-2)×[3 + (-3)] = (-2)×3 + (-2)×(-3) = -6 + (-2)×(-3) = 0. For the sum to equal 0, (-2)×(-3) MUST equal +6.',
    hints: [
      'Start with (-2)×3 + (-2)×(-3) = 0',
      'Next is →',
      'Then -6 + +6 = 0',
    ],
  },
  // ── 22. Advanced: Decimal Fraction Arithmetic & Change (c7_math_008)
  {
    id: 'ch_22_a',
    nodeId: NODE_C7_MATH_008,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Station supplies: 4.5 kg of heating wax at ₹84.40/kg and 3 canisters of oxygen at ₹125.60 each. If paid with a ₹1000 note, what change is returned in Rupees?',
    correctAnswer: 243.4,
    tolerance: 0.1,
    unit: '₹',
    explanation: 'Wax cost = 4.5 × 84.40 = ₹379.80. Oxygen cost = 3 × 125.60 = ₹376.80. Total bill = 379.80 + 376.80 = ₹756.60. Change = 1000 - 756.60 = ₹243.40.',
    hints: [
      'Wax: 4.5 × 84.40 = 379.80',
      'Oxygen: 3 × 125.60 = 376.80',
      'Total: ₹756.60; Change = 1000 - 756.60 = 243.40',
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
  nodeId: NODE_C7_MATH_001,
  title: 'Multiplication & Division of Integers, Rational Numbers & Fractions',
  definition: 'Comprehensive arithmetic framework covering signed integer multiplication/division, algebraic properties, BODMAS problem solving, rational numbers p/q on number line, decimal terminations/recurrences, fractions as operators, and reciprocal multiplicative inverses.',
  eli5: 'Think of numbers like steps on a snowy mountain: positive is climbing up, negative is descending into caves. Multiplying negative steps reverses direction, rational numbers fill all gaps between integers, and reciprocals flip fractions upside-down to balance everything to 1.',
  misconceptions: [
    {
      misconception: 'A negative times a negative is negative because two minuses stay minus.',
      correction: 'Pattern continuity and removing debts prove that same signs produce a positive: (-a) × (-b) = +ab.',
    },
    {
      misconception: 'Dividing by a negative number always gives a negative answer.',
      correction: 'Dividing two negatives yields a positive quotient: (-20) ÷ (-5) = +4 because 4 × (-5) = -20.',
    },
    {
      misconception: '0 is the multiplicative identity and 1 is the additive identity.',
      correction: '0 is the additive identity (a + 0 = a) while 1 is the multiplicative identity (a × 1 = a).',
    },
    {
      misconception: 'The denominator q in rational number p/q can be zero if p is zero.',
      correction: 'Division by zero is undefined; q must never equal zero under any circumstance.',
    },
    {
      misconception: 'To find the reciprocal of a mixed fraction like 2 1/3, you just flip the fractional part to 2 3/1.',
      correction: 'You must convert the entire mixed fraction to an improper fraction (7/3) first, then invert to get 3/7.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is (-9) × (-6)?', options: ['-54', '+54', '-15', '+15'], correctIndex: 1 },
    { question: 'What is the additive inverse of -14?', options: ['14', '-14', '1/14', '0'], correctIndex: 0 },
    { question: 'Which rational number lies exactly midway between -1 and 0?', options: ['-1/4', '-1/2', '-3/4', '+1/2'], correctIndex: 1 },
    { question: 'What is 3/5 of 50?', options: ['10', '25', '30', '150'], correctIndex: 2 },
    { question: 'What is the reciprocal of 4/9?', options: ['-4/9', '9/4', '-9/4', '4/9'], correctIndex: 1 },
    { question: 'Which fraction yields a non-terminating recurring decimal?', options: ['3/8', '7/20', '2/3', '1/4'], correctIndex: 2 },
    { question: 'Compute: (-30) ÷ (-5) + (-2) × 3', options: ['0', '12', '-12', '-6'], correctIndex: 0 },
    { question: 'Is every integer a rational number?', options: ['Yes, n can be written as n/1', 'No, only positive integers', 'No, integers have no denominators', 'Only when squared'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student achieves 80%+ BKT probability across signed integer arithmetic, rational number line placement, decimal conversions, fraction operators, and reciprocal division.',
};

// ─── INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Integer Sign Machine & Debt Grid',
    instruction: 'Drag the factor sliders below and watch how moving into negative territory flips the direction of the product arrow!',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_MATH_001,
  },
  {
    title: 'Lab 2: The Rational Number Line Explorer',
    instruction: 'Select numerator and denominator to see how p/q subdivides the unit segment between integers with precision markers.',
    interactionType: 'click-parts',
    nodeId: NODE_C7_MATH_005,
  },
  {
    title: 'Lab 3: Fraction as Operator ("of") & Paper Shading',
    instruction: 'Adjust the horizontal and vertical folds to see a fraction of a fraction double-shaded in real-time!',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_MATH_009,
  },
  {
    title: 'Lab 4: The Reciprocal See-Saw Balancer',
    instruction: 'Change the fraction on the left and see how its inverse on the right perfectly balances the torque to exactly 1.0!',
    interactionType: 'drag-position',
    nodeId: NODE_C7_MATH_010,
  },
  {
    title: 'Lab 5: Decimal Expansion Probe (Terminating vs Recurring)',
    instruction: 'Pick denominators with primes 2 & 5 versus 3, 7 & 11 to see if the long-division remainder cycles or hits zero!',
    interactionType: 'drag-match',
    nodeId: NODE_C7_MATH_007,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you multiply (-4) by (-3), will the result be to the right (positive) or left (negative) of 0 on the number line?',
    options: ['To the right (+12)', 'To the left (-12)', 'At zero', 'Undefined'],
    correctIndex: 0,
    verifyInstruction: 'Drag factor A to -4 and factor B to -3 on Lab 1 to verify your prediction in real-time.',
    nodeId: NODE_C7_MATH_001,
  },
  {
    question: 'Predict: If a pizza slice is 1/2 of the whole, and you take 1/3 OF that slice, will the piece be larger or smaller than 1/3?',
    options: ['Smaller (1/6)', 'Larger (5/6)', 'Same size (1/3)', 'Twice as big (2/3)'],
    correctIndex: 0,
    verifyInstruction: 'Check Lab 3: 1/3 of 1/2 double-shades 1 part out of 6 total squares!',
    nodeId: NODE_C7_MATH_009,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the product sign whenever BOTH factor sliders are set to negative numbers?',
    observableOptions: [
      'The product arrow points to the positive (green) side',
      'The product arrow points to the negative (red) side',
      'The product becomes 0',
      'The product becomes undefined',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_MATH_001,
  },
  {
    question: 'What do you observe about the torque on the see-saw when any fraction a/b is multiplied by its reciprocal b/a?',
    observableOptions: [
      'The see-saw balances exactly at unity (1.0)',
      'The see-saw tilts heavily to the left',
      'The see-saw tilts heavily to the right',
      'The see-saw oscillates wildly',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_MATH_010,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Antarctic Station Quartermaster Audit',
  description: 'Apply your integer and rational number skills to plan daily survival rations for a 6-person Antarctic field crew over 10 sub-zero days.',
  steps: [
    'Calculate the net temperature variation if day starts at -18°C, drops 3°C/hr for 5 hrs, then rises 8°C during solar noon.',
    'Ration 45 kg of dried pulses so that 3/5 is used for hot stew and 1/3 of the remaining is saved for emergency packs.',
    'Express the emergency fuel usage of 7/8 litres per hour as a terminating decimal and calculate total litres for a 24-hour cycle.',
    'Verify all calculation signs with a peer to avoid critical supply shortfalls!',
  ],
};

// ─── MAIN COMPONENT ───
export function C7_MathematicsMultiplicationDivisionIntegersSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C7_MATH_001,
    title = DEFAULT_PROPS.title || 'Multiplication & Division of Integers & Rationals',
    misconceptions = DEFAULT_PROPS.misconceptions,
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'blue' };

  // ─��─ PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── BKT & ADAPTIVE DIFFICULTY STATE ───
  const bktStateRef = useRef(createBKTState());
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── BRILLIANT.ORG INTERACTION STATES ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── DISCOVERY STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── LAB 1: INTEGER MULTIPLICATION STATE ───
  const [factorA, setFactorA] = useState(-3);
  const [factorB, setFactorB] = useState(-4);
  const integerProduct = useMemo(() => factorA * factorB, [factorA, factorB]);

  // ─── LAB 2: RATIONAL NUMBER LINE STATE ───
  const [rationalP, setRationalP] = useState(-3);
  const [rationalQ, setRationalQ] = useState(4);
  const rationalDecimal = useMemo(() => (rationalQ !== 0 ? rationalP / rationalQ : 0), [rationalP, rationalQ]);

  // ─── LAB 3: FRACTION AS OPERATOR STATE ───
  const [fracOpNum1, setFracOpNum1] = useState(2);
  const [fracOpDen1, setFracOpDen1] = useState(3);
  const [fracOpNum2, setFracOpNum2] = useState(1);
  const [fracOpDen2, setFracOpDen2] = useState(2);
  const operatorProductNum = useMemo(() => fracOpNum1 * fracOpNum2, [fracOpNum1, fracOpNum2]);
  const operatorProductDen = useMemo(() => fracOpDen1 * fracOpDen2, [fracOpDen1, fracOpDen2]);

  // ─── LAB 4: RECIPROCAL BALANCE STATE ───
  const [recipNum, setRecipNum] = useState(3);
  const [recipDen, setRecipDen] = useState(5);

  // ─── LAB 5: DECIMAL CONVERSION STATE ───
  const [selectedFractionDemo, setSelectedFractionDemo] = useState<'7/20' | '1/3' | '5/11' | '3/8'>('7/20');

  // ─── CHALLENGE INTERACTION STATE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── REFLECTION RESPONSES STATE ───
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // ─── FEEDBACK OVERLAYS STATE ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // ─── TIMERS & CANVAS REFS ───
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGE FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE DIFFICULTY EFFECT AFTER ANSWERS ───
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

  // ─── CANVAS PARTICLE & TELEMETRY ANIMATION ───
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

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 4) {
        const y = canvas.height / 2 + Math.sin((x + frame * 2) * 0.05) * 8 * Math.cos(frame * 0.02);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── AUTO-HINT INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const autoHint = challenge.hints[0] || 'Take a close look at the signs and operation order!';
        setCurrentHint(autoHint);
        setShowHint(true);
        setHintCount(1);
        audioManager.play('hint');
        speechManager.speak('Need a quick hint? Remember the sign rules.');
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, challenge]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      const hText = challenge.hints[nextLevel - 1];
      setCurrentHint(hText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
      speechManager.speak('Let us study the complete step-by-step solution together.');
    }
  }, [hintCount, challenge]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Spot on! Removing debts leaves you richer.');
    } else {
      audioManager.play('pop');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  // ─── PHASE TRANSITIONS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Let us explore integer multiplication and rational number lines.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore freely! Move the sliders without any test pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for the mission challenges! Put your mastery to work.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in. Now adjust the sliders to test it!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Great mathematical observation!');
    } else {
      audioManager.play('pop');
      speechManager.speak('Look closely at the product gauge arrow color and direction.');
    }
  }, []);

  // ─── DRAG AND DROP HANDLERS ───
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
      const items = prev.length > 0 ? [...prev] : challenge.sortItems?.map((_, i) => i) || [];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return items;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const currentOrder = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Excellent! The order of operations is perfectly sequenced.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
    resetInactivityTimer();
  }, [sortArrangement, challenge, showNextHint, resetInactivityTimer]);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Expedition calculations verified! Your overall mission score is ${finalScore} percent.`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
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

  // ─── GENERAL ANSWER VALIDATION ───
  const handleAnswer = useCallback((userResponse: number | Record<string, string> | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = userResponse === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(userResponse) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'numeric') {
      const numVal = typeof userResponse === 'string' ? parseFloat(userResponse) : (userResponse as number);
      isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = userResponse === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Accurate calculation.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // ─── MOTIVATIONAL MESSAGE HELPER ───
  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) {
      return {
        title: 'PERFECT SCORE!',
        desc: 'Flawless execution! You handled every signed integer rule, reciprocal operation, and rational placement without a single mistake.',
        color: 'text-emerald-400',
        badge: '✓ 100% Mastery',
      };
    } else if (errCount >= 1 && errCount <= 3) {
      return {
        title: 'Great work!',
        desc: 'Strong mathematical thinking! You navigated complex rational signs and multi-step BODMAS problems with impressive competence.',
        color: 'text-gold-400',
        badge: '✓ High Proficiency',
      };
    } else if (errCount >= 4 && errCount <= 7) {
      return {
        title: 'Good effort!',
        desc: 'You made steady progress through challenging topics! Revisit the targeted clarifications to convert tricky sign patterns into second nature.',
        color: 'text-amber-400',
        badge: '✓ Solid Foundation',
      };
    } else {
      return {
        title: 'Do not give up — You WILL get this!',
        desc: 'Every challenge is a stepping stone. Integer rules and rational numbers become completely intuitive with a little structured practice!',
        color: 'text-rose-400',
        badge: '✗ Needs Revision',
      };
    }
  };

  const motivation = getMotivationalFeedback(errors);

  // ─── SRS INTERVAL COMPUTATION ───
  const srsIntervalDays = errors === 0 ? 7 : errors <= 3 ? 3 : 1;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gold-600 to-gold-500 flex items-center justify-center text-2xl shadow-lg shadow-gold-500/20"
            aria-label="Simulation Category Icon"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 7 ICSE Mathematics</span>
            <h1 className="text-lg md:text-xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Difficulty Badge & Score HUD */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            aria-label={`Difficulty level: ${difficulty}`}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-700'
                : 'bg-gold-950/60 text-gold-400 border-gold-700'
            }`}
          >
            <span>{difficulty === 'foundation' ? '✓' : difficulty === 'advanced' ? '★' : '◆'}</span>
            {difficulty} Tier
          </motion.span>
          <div className="bg-slate-900 px-3 py-1 rounded-full border border-slate-800 text-xs text-slate-300" aria-label={`Current mastery: ${masteryLevel}`}>
            Mastery: <span className="text-gold-400 font-bold capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── CANVAS TELEMETRY MONITOR ─── */}
      <div className="relative w-full h-10 mt-3 rounded-xl overflow-hidden bg-slate-900 border border-slate-800/80">
        <canvas ref={canvasRef} width={800} height={40} className="w-full h-full opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 flex items-center justify-between px-4 text-[10px] font-mono text-gold-400 tracking-widest">
          <span>✓ TELEMETRY: ACTIVE</span>
          <span>NODES: 10/10 LOADED</span>
          <span>PHASE: {phase.toUpperCase()}</span>
        </div>
      </div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-gold-950/40 via-gold-950/20 to-slate-900 border border-gold-800/40">
            <h2 className="text-lg font-bold text-gold-300 flex items-center gap-2">
              <span>❄️</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Curiosity Discovery Hook</span>
            <p className="text-base text-white font-bold mt-2">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                  className={`p-4 rounded-xl text-left text-sm transition-all border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 opacity-50'
                      : 'bg-slate-800/90 border-slate-700 hover:bg-slate-800 text-slate-200 hover:border-gold-500'
                  }`}
                >
                  <div className="flex items-center gap-2 font-medium">
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white">
                      {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex ? '✓' : String.fromCharCode(65 + idx)}
                    </span>
                    {option}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-gold-800/60">
                <p className={`text-sm flex items-center gap-2 ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                  <span>{discoveryCorrect ? '✓' : '💡'}</span>
                  {discoveryCorrect ? 'Correct intuition! Removing debts results in positive net worth.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <div className="mt-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Enter Interactive Labs"
                    className="px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-xl font-bold shadow-lg shadow-gold-500/30 flex items-center gap-2"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. INTERACTIVE EXPLORATION PHASE (BRILLIANT.ORG) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-4">
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-gold-400">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5" aria-hidden="true">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? 'w-6 bg-gold-400' : 'w-2 bg-slate-700'
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
              className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div>
                <h3 className="text-lg font-black text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-300 text-sm mt-1 flex items-center gap-2">
                  <span>🔍</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── LAB 1: INTEGER MULTIPLICATION ── */}
              {currentSlide === 0 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  {!predictionMade ? (
                    <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40">
                      <p className="text-xs font-semibold text-gold-300">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Predict: ${opt}`}
                            className="p-2 rounded-lg bg-slate-800 text-xs text-left text-slate-200 hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                      <span>✓</span> Prediction recorded! Check the live gauge below as you manipulate the factor sliders.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-300 font-mono">
                        <span>Factor A (Multiplier):</span>
                        <span className={factorA < 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>{factorA}</span>
                      </div>
                      <input
                        type="range"
                        min={-5}
                        max={5}
                        value={factorA}
                        aria-label="Factor A Multiplier slider"
                        onChange={e => {
                          setFactorA(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-gold-400 cursor-pointer"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-300 font-mono">
                        <span>Factor B (Value):</span>
                        <span className={factorB < 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>{factorB}</span>
                      </div>
                      <input
                        type="range"
                        min={-5}
                        max={5}
                        value={factorB}
                        aria-label="Factor B Value slider"
                        onChange={e => {
                          setFactorB(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-gold-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="w-full overflow-x-auto bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 120" className="w-full min-w-[500px]" aria-label="Visual Number Line Vector Indicator">
                      <line x1="30" y1="60" x2="570" y2="60" stroke="#475569" strokeWidth="2" />
                      <polygon points="25,60 35,55 35,65" fill="#475569" />
                      <polygon points="575,60 565,55 565,65" fill="#475569" />

                      {[-25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25].map(val => {
                        const x = 300 + val * 10;
                        return (
                          <g key={val}>
                            <line x1={x} y1="52" x2={x} y2="68" stroke={val === 0 ? '#38bdf8' : '#64748b'} strokeWidth={val === 0 ? 3 : 1} />
                            <text x={x} y="85" fill={val === 0 ? '#38bdf8' : '#94a3b8'} fontSize="10" textAnchor="middle" fontFamily="monospace">
                              {val}
                            </text>
                          </g>
                        );
                      })}

                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <line
                          x1="300"
                          y1="35"
                          x2={300 + integerProduct * 10}
                          y2="35"
                          stroke={integerProduct >= 0 ? '#10b981' : '#f43f5e'}
                          strokeWidth="4"
                          strokeDasharray="4 2"
                        />
                        <circle cx={300 + integerProduct * 10} cy="35" r="5" fill={integerProduct >= 0 ? '#10b981' : '#f43f5e'} />
                        <text
                          x={300 + integerProduct * 10}
                          y="22"
                          fill={integerProduct >= 0 ? '#34d399' : '#fb7185'}
                          fontSize="11"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {factorA} × {factorB} = {integerProduct > 0 ? `+${integerProduct}` : integerProduct}
                        </text>
                      </motion.g>
                    </svg>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl flex items-center justify-between text-xs border border-slate-800">
                    <span className="text-slate-400 font-mono">Sign Logic:</span>
                    <span className="font-bold text-gold-300">
                      {factorA < 0 && factorB < 0 && '(-) × (-) = (+) [Same signs → Positive product]'}
                      {factorA > 0 && factorB > 0 && '(+) × (+) = (+) [Same signs → Positive product]'}
                      {((factorA < 0 && factorB > 0) || (factorA > 0 && factorB < 0)) && '(+) × (-) = (-) [Opposite signs → Negative product]'}
                      {(factorA === 0 || factorB === 0) && 'Multiplying by zero = 0'}
                    </span>
                  </div>

                  {factorA < 0 && factorB < 0 && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-amber-950/40 rounded-xl border border-amber-700/50">
                      <p className="text-xs font-bold text-amber-300">Observation Check: {OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Select observation: ${opt}`}
                            className="p-2 rounded-lg bg-slate-800 text-xs text-left text-slate-200 hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── LAB 2: RATIONAL NUMBER LINE ── */}
              {currentSlide === 1 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-300 font-mono">
                        <span>Numerator p (Integer):</span>
                        <span className="text-gold-400 font-bold">{rationalP}</span>
                      </div>
                      <input
                        type="range"
                        min={-6}
                        max={6}
                        value={rationalP}
                        aria-label="Numerator p slider"
                        onChange={e => {
                          setRationalP(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-gold-400 cursor-pointer"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-300 font-mono">
                        <span>Denominator q (q ≠ 0):</span>
                        <span className="text-purple-400 font-bold">{rationalQ}</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={6}
                        value={rationalQ}
                        aria-label="Denominator q slider"
                        onChange={e => {
                          setRationalQ(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-purple-400 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 130" className="w-full" aria-label="Rational Number Line Graph">
                      <line x1="30" y1="70" x2="570" y2="70" stroke="#475569" strokeWidth="2" />
                      <polygon points="25,70 35,65 35,75" fill="#475569" />
                      <polygon points="575,70 565,65 565,75" fill="#475569" />

                      {[-2, -1, 0, 1, 2].map(intVal => {
                        const cx = 300 + intVal * 120;
                        return (
                          <g key={intVal}>
                            <line x1={cx} y1="58" x2={cx} y2="82" stroke="#38bdf8" strokeWidth="3" />
                            <text x={cx} y="102" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                              {intVal}
                            </text>
                          </g>
                        );
                      })}

                      {[-2, -1, 0, 1].map(baseInt => {
                        const baseCx = 300 + baseInt * 120;
                        const subLines = [];
                        for (let k = 1; k < rationalQ; k++) {
                          const subX = baseCx + (k * 120) / rationalQ;
                          subLines.push(
                            <line key={k} x1={subX} y1="64" x2={subX} y2="76" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                          );
                        }
                        return <g key={baseInt}>{subLines}</g>;
                      })}

                      <motion.g
                        animate={{ x: 300 + rationalDecimal * 120 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      >
                        <circle cx={0} cy={70} r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                        <text x={0} y={45} fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                          {rationalP}/{rationalQ} = {rationalDecimal.toFixed(2)}
                        </text>
                      </motion.g>
                    </svg>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 font-mono flex items-center justify-between">
                    <span>Classification:</span>
                    <span className="font-bold text-gold-300">
                      {rationalP === 0 ? 'Zero Rational (0/q = 0)' : (rationalP > 0 ? 'Positive Rational (+)' : 'Negative Rational (-)')}
                    </span>
                  </div>
                </div>
              )}

              {/* ── LAB 3: FRACTION AS OPERATOR ── */}
              {currentSlide === 2 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-[11px] text-slate-400">Op 1 Num: {fracOpNum1}</label>
                      <input type="range" min={1} max={3} value={fracOpNum1} aria-label="Fraction 1 Numerator" onChange={e => setFracOpNum1(Number(e.target.value))} className="w-full accent-gold-400" />
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-[11px] text-slate-400">Op 1 Den: {fracOpDen1}</label>
                      <input type="range" min={2} max={4} value={fracOpDen1} aria-label="Fraction 1 Denominator" onChange={e => setFracOpDen1(Number(e.target.value))} className="w-full accent-gold-400" />
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-[11px] text-slate-400">Op 2 Num: {fracOpNum2}</label>
                      <input type="range" min={1} max={3} value={fracOpNum2} aria-label="Fraction 2 Numerator" onChange={e => setFracOpNum2(Number(e.target.value))} className="w-full accent-purple-400" />
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-[11px] text-slate-400">Op 2 Den: {fracOpDen2}</label>
                      <input type="range" min={2} max={4} value={fracOpDen2} aria-label="Fraction 2 Denominator" onChange={e => setFracOpDen2(Number(e.target.value))} className="w-full accent-purple-400" />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-6">
                    <div
                      className="relative w-48 h-48 bg-slate-950 border-2 border-slate-700 rounded-lg overflow-hidden grid"
                      aria-label="2D Area Model for Fraction Multiplication"
                      style={{
                        gridTemplateColumns: `repeat(${fracOpDen2}, 1fr)`,
                        gridTemplateRows: `repeat(${fracOpDen1}, 1fr)`,
                      }}
                    >
                      {Array.from({ length: fracOpDen1 * fracOpDen2 }).map((_, cellIdx) => {
                        const row = Math.floor(cellIdx / fracOpDen2);
                        const col = cellIdx % fracOpDen2;
                        const isRowShaded = row < fracOpNum1;
                        const isColShaded = col < fracOpNum2;
                        const isDoubleShaded = isRowShaded && isColShaded;

                        return (
                          <div
                            key={cellIdx}
                            className={`border border-slate-800/60 flex items-center justify-center transition-colors ${
                              isDoubleShaded
                                ? 'bg-gradient-to-br from-emerald-500/80 to-teal-500/80 text-white font-bold text-xs'
                                : isRowShaded
                                ? 'bg-gold-900/30'
                                : isColShaded
                                ? 'bg-purple-900/30'
                                : 'bg-transparent'
                            }`}
                          >
                            {isDoubleShaded && '★'}
                          </div>
                        );
                      })}
                    </div>

                    <div className="space-y-2 text-center md:text-left">
                      <p className="text-xs font-mono text-slate-400">Mathematical Interpretation:</p>
                      <p className="text-base font-bold text-gold-300">
                        {fracOpNum1}/{fracOpDen1} OF {fracOpNum2}/{fracOpDen2} = ({fracOpNum1} × {fracOpNum2}) / ({fracOpDen1} × {fracOpDen2})
                      </p>
                      <p className="text-xl font-extrabold text-emerald-400">
                        = {operatorProductNum} / {operatorProductDen}
                      </p>
                      <p className="text-xs text-slate-400 max-w-xs">
                        Double-shaded cells = {operatorProductNum} out of {operatorProductDen} total grid squares.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: RECIPROCAL SEE-SAW ── */}
              {currentSlide === 3 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex gap-4">
                    <div className="w-1/2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400">Numerator a: {recipNum}</label>
                      <input type="range" min={1} max={9} value={recipNum} aria-label="Numerator a for reciprocal" onChange={e => setRecipNum(Number(e.target.value))} className="w-full accent-gold-400" />
                    </div>
                    <div className="w-1/2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400">Denominator b: {recipDen}</label>
                      <input type="range" min={1} max={9} value={recipDen} aria-label="Denominator b for reciprocal" onChange={e => setRecipDen(Number(e.target.value))} className="w-full accent-purple-400" />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 160" className="w-full" aria-label="Reciprocal Balance Scale">
                      <polygon points="300,110 280,150 320,150" fill="#475569" stroke="#334155" strokeWidth="2" />
                      <circle cx="300" cy="110" r="5" fill="#38bdf8" />
                      <line x1="120" y1="110" x2="480" y2="110" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />

                      <g>
                        <rect x="150" y="60" width="70" height="46" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="185" y="88" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">
                          {recipNum}/{recipDen}
                        </text>
                      </g>

                      <text x="300" y="80" fill="#fbbf24" fontSize="22" fontWeight="black" textAnchor="middle">
                        ×
                      </text>

                      <g>
                        <rect x="380" y="60" width="70" height="46" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                        <text x="415" y="88" fill="#c084fc" fontSize="14" fontWeight="bold" textAnchor="middle">
                          {recipDen}/{recipNum}
                        </text>
                      </g>

                      <rect x="250" y="10" width="100" height="28" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="300" y="28" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                        ✓ PRODUCT = 1.0 (UNITY)
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ── LAB 5: DECIMAL PROBE ── */}
              {currentSlide === 4 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(['7/20', '1/3', '5/11', '3/8'] as const).map(frac => (
                      <motion.button
                        key={frac}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedFractionDemo(frac);
                          audioManager.play('tap');
                        }}
                        aria-label={`Inspect fraction ${frac}`}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedFractionDemo === frac
                            ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/30'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        Probe Fraction: {frac}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-mono">Prime Factorization of Denominator:</span>
                      <span className="text-gold-300 font-bold">
                        {selectedFractionDemo === '7/20' && '20 = 2² × 5 (Only 2 and 5)'}
                        {selectedFractionDemo === '1/3' && '3 = 3 (Contains prime 3)'}
                        {selectedFractionDemo === '5/11' && '11 = 11 (Contains prime 11)'}
                        {selectedFractionDemo === '3/8' && '8 = 2³ (Only prime 2)'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-800">
                      <span className="text-slate-400 font-mono">Decimal Form:</span>
                      <span className="text-emerald-400 font-mono font-bold text-base flex items-center gap-1.5">
                        <span>✓</span>
                        {selectedFractionDemo === '7/20' && '0.35 (Terminating)'}
                        {selectedFractionDemo === '1/3' && '0.3333... = 0.3 (Non-Terminating Recurring)'}
                        {selectedFractionDemo === '5/11' && '0.4545... = 0.45 (Non-Terminating Recurring)'}
                        {selectedFractionDemo === '3/8' && '0.375 (Terminating)'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  aria-label="Previous Lab Slide"
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('whoosh');
                    }}
                    aria-label="Next Lab Slide"
                    className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Open Sandbox Simulator"
                    className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/30"
                  >
                    Open Sandbox Simulator 🧪
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          <div className="p-5 bg-gradient-to-r from-gold-950/40 to-slate-900 rounded-2xl border border-gold-800/40">
            <h3 className="text-base font-black text-gold-300">Free Mathematical Sandbox</h3>
            <p className="text-xs text-slate-300 mt-1">
              Zero pressure, no timers, no grading! Experiment with multiplying signed integers and converting rationals before entering challenges.
            </p>
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Signed Multiplier Lab</h4>
              <div className="flex gap-3">
                <div className="w-1/2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <label className="text-[11px] text-slate-400">Int A: {factorA}</label>
                  <input type="range" min={-8} max={8} value={factorA} aria-label="Sandbox Factor A" onChange={e => setFactorA(Number(e.target.value))} className="w-full accent-gold-400" />
                </div>
                <div className="w-1/2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <label className="text-[11px] text-slate-400">Int B: {factorB}</label>
                  <input type="range" min={-8} max={8} value={factorB} aria-label="Sandbox Factor B" onChange={e => setFactorB(Number(e.target.value))} className="w-full accent-purple-400" />
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-center border border-slate-800">
                <span className="text-xs text-slate-400">Computed Product:</span>
                <p className="text-xl font-mono font-bold text-emerald-400">
                  ({factorA}) × ({factorB}) = {integerProduct > 0 ? `+${integerProduct}` : integerProduct}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Rational Inverter Lab</h4>
              <div className="flex gap-3">
                <div className="w-1/2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <label className="text-[11px] text-slate-400">p: {rationalP}</label>
                  <input type="range" min={-9} max={9} value={rationalP} aria-label="Sandbox Numerator p" onChange={e => setRationalP(Number(e.target.value))} className="w-full accent-gold-400" />
                </div>
                <div className="w-1/2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <label className="text-[11px] text-slate-400">q (≠0): {rationalQ}</label>
                  <input type="range" min={1} max={9} value={rationalQ} aria-label="Sandbox Denominator q" onChange={e => setRationalQ(Number(e.target.value))} className="w-full accent-purple-400" />
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-center border border-slate-800">
                <span className="text-xs text-slate-400">Decimal Value & Reciprocal:</span>
                <p className="text-sm font-mono font-bold text-gold-300">
                  {rationalP}/{rationalQ} = {rationalDecimal.toFixed(3)}
                </p>
                <p className="text-xs text-purple-400 mt-1">
                  Reciprocal = {rationalP !== 0 ? `${rationalQ}/${rationalP}` : 'Undefined (cannot divide by zero)'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for Mission Challenges"
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-gold-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-500/20 flex items-center gap-2"
            >
              Ready for Mission Challenges! 🚀
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-gold-400 border border-slate-700">
                {challenge.competencyLevel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Score:</span>
              <span className="text-xs font-bold text-emerald-400">{scoreBreakdown.correct}/{scoreBreakdown.total}</span>
            </div>
          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden" aria-hidden="true">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 md:p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/40 border-rose-600 shadow-lg shadow-rose-900/30'
                : 'bg-slate-900/95 border-slate-800'
            }`}
          >
            <p className="text-sm md:text-base font-bold text-white leading-relaxed">{challenge.question}</p>

            {/* ── MCQ / CLASSIFY / MATCH ── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Select option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`p-3.5 rounded-xl text-left text-xs md:text-sm font-medium transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/30'
                        : 'bg-slate-800/90 border-slate-700 hover:bg-slate-800 text-slate-200 hover:border-gold-500'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[11px] text-white">
                        {showExplanation && i === challenge.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* ── DRAG-LABEL CHALLENGE ─��� */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable tag: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg cursor-grab text-white text-xs font-bold shadow"
                    >
                      🏷️ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  {['zone_left', 'zone_midleft', 'zone_midright', 'zone_right'].map(zoneId => (
                    <div
                      key={zoneId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(zoneId)}
                      aria-label={`Drop target zone: ${zoneId}`}
                      className="p-3 bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[70px] flex flex-col justify-center items-center"
                    >
                      <span className="text-[10px] text-slate-500 uppercase font-mono">{zoneId.replace('_', ' ')}</span>
                      <span className="text-xs font-bold text-gold-300 mt-1 flex items-center gap-1">
                        {droppedLabels[zoneId] ? `✓ ${droppedLabels[zoneId]}` : 'Drop Tag Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Verify Number Line Tags"
                  className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                >
                  Verify Number Line Tags
                </motion.button>
              </div>
            )}

            {/* ── DRAG-SORT CHALLENGE ── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-4 space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Sortable step ${idx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl text-xs md:text-sm text-slate-200 cursor-grab flex items-center justify-between border border-slate-700 hover:border-gold-500"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-gold-900 text-gold-300 flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        {item}
                      </div>
                      <span className="text-slate-500 text-xs">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Verify Step Order"
                  className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                >
                  Verify Step Order
                </motion.button>
              </div>
            )}

            {/* ── NUMERIC INPUT CHALLENGE ── */}
            {challenge.type === 'numeric' && (
              <div className="mt-4 flex items-center gap-3">
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter numeric answer"
                  aria-label={`Numeric input for ${challenge.question}`}
                  className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500"
                />
                <span className="text-xs text-slate-400">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || numericInput.trim() === ''}
                  aria-label="Submit numeric answer"
                  className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                >
                  Submit Value
                </motion.button>
              </div>
            )}

            {/* ── CONSTRUCT CHALLENGE ── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add token ${part}`}
                      className="px-3 py-1.5 bg-gold-700 rounded-lg text-white text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[50px] p-3 bg-slate-950 rounded-xl border border-slate-700 flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-gold-900 border border-gold-600 rounded-lg text-xs font-mono text-gold-200 flex items-center gap-1.5"
                    >
                      {p}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        aria-label={`Remove token ${p}`}
                        className="text-rose-400 text-xs font-bold"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click the tokens above to assemble the proof equation</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify Equation Proof"
                  className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                >
                  Verify Equation Proof
                </motion.button>
              </div>
            )}

            {/* ── STEP-BY-STEP EXPLANATION ── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-slate-950 border border-gold-800/60 space-y-3"
              >
                <div className="flex items-center gap-2 text-gold-300 text-xs font-bold uppercase tracking-wider">
                  <span>✓</span> Detailed Pedagogical Breakdown:
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 font-sans leading-relaxed"
                    >
                      <span className="font-bold text-gold-400">Step {sIdx + 1}:</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    aria-label="Show Next Step in Explanation"
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-gold-300 rounded-lg text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <div className="pt-2 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to Next Challenge or Finish"
                      className="px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-xl text-xs font-black shadow-lg shadow-gold-500/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Score →' : 'Next Challenge →'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-tr from-gold-950/60 to-slate-900 border border-gold-500/40 text-center space-y-3">
            <span className="text-4xl">���️</span>
            <h2 className="text-2xl font-black text-white">Antarctic Telemetry Audit Complete!</h2>
            <p className="text-sm text-slate-300">
              Final Accuracy Score:{' '}
              <span className="text-gold-300 font-bold font-mono text-lg">{Math.max(0, 100 - errors * 5)}%</span>
            </p>
            <p className="text-xs text-slate-400">
              Mastery Tier Achieved:{' '}
              <span className="text-emerald-400 font-bold uppercase">{masteryLevel}</span>
            </p>
          </div>

          {/* ── MOTIVATIONAL FEEDBACK SECTION ── */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className={`text-base font-black ${motivation.color}`}>{motivation.title}</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {motivation.badge}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans">{motivation.desc}</p>
          </div>

          {/* ── SPACED REPETITION VISIBILITY CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-slate-900 border border-amber-600/50 shadow-lg space-y-3"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🧠</span>
                <div>
                  <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                    Spaced Repetition Schedule (SM-2 SRS)
                  </h3>
                  <p className="text-xs text-slate-300">
                    Optimal cognitive retention timing based on your performance ({errors} error{errors === 1 ? '' : 's'})
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold text-sm">
                Next Review in: <span className="text-white text-base underline">{srsIntervalDays} day{srsIntervalDays > 1 ? 's' : ''}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className={`p-2.5 rounded-xl border transition-all ${errors === 0 ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/30' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                <div className="text-[10px] uppercase tracking-wider">0 Errors</div>
                <div className="text-sm font-black mt-0.5">Review in 7 Days</div>
                <div className="text-[10px] text-slate-400">Consolidated Memory</div>
              </div>
              <div className={`p-2.5 rounded-xl border transition-all ${errors >= 1 && errors <= 3 ? 'bg-amber-950/70 border-amber-500 text-amber-200 font-bold ring-2 ring-amber-500/30' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                <div className="text-[10px] uppercase tracking-wider">1–3 Errors</div>
                <div className="text-sm font-black mt-0.5">Review in 3 Days</div>
                <div className="text-[10px] text-slate-400">Targeted Reinforcement</div>
              </div>
              <div className={`p-2.5 rounded-xl border transition-all ${errors >= 4 ? 'bg-rose-950/70 border-rose-500 text-rose-200 font-bold ring-2 ring-rose-500/30' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                <div className="text-[10px] uppercase tracking-wider">4+ Errors</div>
                <div className="text-sm font-black mt-0.5">Review in 1 Day</div>
                <div className="text-[10px] text-slate-400">Active Recall Needed</div>
              </div>
            </div>
          </motion.div>

          {/* ── REFLECTION SECTION ── */}
          <div className="p-5 bg-gradient-to-br from-slate-900 to-gold-950/40 rounded-2xl border border-gold-800/40 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gold-300 flex items-center gap-2">
              <span>💭</span> Expedition Mathematical Reflection
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-gold-300 block mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. Why multiplying two negative integers always yields a positive value..."
                  aria-label="Reflection Question: What was the most surprising thing you learned?"
                  className="w-full text-xs p-2.5 bg-slate-900 rounded-lg text-slate-200 border border-slate-700 focus:outline-none focus:border-gold-500 resize-none h-16"
                />
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-gold-300 block mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. Dividing by a fraction is like multiplying by its upside-down reciprocal..."
                  aria-label="Reflection Question: How would you explain this to a friend?"
                  className="w-full text-xs p-2.5 bg-slate-900 rounded-lg text-slate-200 border border-slate-700 focus:outline-none focus:border-gold-500 resize-none h-16"
                />
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-gold-300 block mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. Tracking sub-zero temperature changes, diving depths, or fuel budgeting..."
                  aria-label="Reflection Question: Where in real life might you use this?"
                  className="w-full text-xs p-2.5 bg-slate-900 rounded-lg text-slate-200 border border-slate-700 focus:outline-none focus:border-gold-500 resize-none h-16"
                />
              </div>
            </div>
          </div>

          {/* Misconception Tracking Gaps */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/30 rounded-2xl border border-rose-800/40 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300">Targeted Concept Clarifications:</h3>
              {hitMisconceptions.map((mIdx, i) => {
                const item = misconceptions?.[mIdx];
                if (!item) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl text-xs space-y-1 border border-rose-900/40">
                    <p className="text-rose-300 font-bold flex items-center gap-1.5">
                      <span>✗</span> Misconception: {item.misconception}
                    </p>
                    <p className="text-emerald-300 font-sans flex items-center gap-1.5">
                      <span>✓</span> Correction: {item.correction}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{idx + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mathematical Calculation Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C7_MathematicsMultiplicationDivisionIntegersSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERAL CONSTANTS ───────────────────────���─────────────────
const NODE_C6_MATH_021 = 'c6_math_021'; // Cardinality of a set
const NODE_C6_MATH_022 = 'c6_math_022'; // Revision of fractions & part of whole
const NODE_C6_MATH_023 = 'c6_math_023'; // Representation (pictorial, number line) & division
const NODE_C6_MATH_024 = 'c6_math_024'; // Proper, improper & mixed fractions
const NODE_C6_MATH_025 = 'c6_math_025'; // Equivalent fractions
const NODE_C6_MATH_026 = 'c6_math_026'; // Comparison of fractions
const NODE_C6_MATH_027 = 'c6_math_027'; // Operations on fractions
const NODE_C6_MATH_028 = 'c6_math_028'; // Decimal fraction & place value
const NODE_C6_MATH_029 = 'c6_math_029'; // Interconversion of fractions & decimals
const NODE_C6_MATH_030 = 'c6_math_030'; // Decimal word problems (money, mass, length, temp)

const ALL_NODE_IDS = [
  NODE_C6_MATH_021,
  NODE_C6_MATH_022,
  NODE_C6_MATH_023,
  NODE_C6_MATH_024,
  NODE_C6_MATH_025,
  NODE_C6_MATH_026,
  NODE_C6_MATH_027,
  NODE_C6_MATH_028,
  NODE_C6_MATH_029,
  NODE_C6_MATH_030,
];

// ─── NARRATIVE SCENARIO ───────────────────────────────���───────────────────────
const SCENARIO = {
  title: 'The Great Indian Mathematics & Science Fair',
  intro: 'You are the chief logistics officer at the ICSE National STEM Exhibition in Bengaluru. Your team must count attendee set cardinalities, partition prize cakes and ribbon lengths into exact fractions, adjust decimal weights of chemical samples in grams/kilograms, and compute change in Rupees & Paise with precision.',
  context: 'Mastering sets, proper/improper fractions, equivalent scales, and decimal place values will allow you to solve every logistical challenge across the exhibition pavilions!',
};

// ─── DISCOVERY HOOK QUESTION ───────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'At the registration desk, five badge numbers are recorded: {4, 7, 7, 9, 9}. How many distinct participants are in this set, and what is its cardinality n(S)?',
  options: [
    'n(S) = 5 (because 5 badge numbers are written down)',
    'n(S) = 3 (because duplicates 7 and 9 are counted only once)',
    'n(S) = 9 (the highest badge value in the set)',
    'n(S) = 0 (because the set contains repetitions)',
  ],
  correctIndex: 1,
  hintAfter: "In mathematics, sets contain only distinct members. Duplicates don't add to the count! Let's explore why.",
};

// ─── CHALLENGE INTERFACE ───────────────────────────────────────────────────────
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

// ─── 22 COMPREHENSIVE CHALLENGES ──────────────────────────────────────────────
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (1 to 7) ──
  {
    id: 'ch_01_cardinality_empty',
    nodeId: NODE_C6_MATH_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The set E represents all students in your Class 6 who are older than 100 years. What is the cardinality n(E)?',
    options: ['n(E) = 0', 'n(E) = 100', 'n(E) is undefined / nothing', 'n(E) = 1'],
    correctIndex: 0,
    explanation: 'The set E has no members because no Class 6 student is over 100. It is an empty set {}, and its cardinality is the exact whole number 0.',
    hints: [
      'Ask yourself how many students actually meet this condition.',
      'An empty set has zero elements in it.',
      'The cardinality of the null set {} is written as 0, not "undefined".',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_02_cardinality_duplicates',
    nodeId: NODE_C6_MATH_021,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Find the cardinality n(V) of the set of distinct letters in the word "BANANA".',
    correctAnswer: 3,
    tolerance: 0,
    unit: 'elements',
    explanation: 'The letters in "BANANA" are B, A, N, A, N, A. The distinct letters are {B, A, N}. Counting each letter only once gives cardinality 3.',
    hints: [
      'List the unique letters without repeating any letter.',
      'B, A, and N are the only distinct letters used.',
      'Count them: B (1), A (2), N (3). The answer is 3.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_fraction_part_of_whole',
    nodeId: NODE_C6_MATH_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A pizza is cut into 8 equal slices and Kabir eats 3 slices. What fraction of the pizza did Kabir eat?',
    options: ['3/8', '8/3', '5/8', '3/5'],
    correctIndex: 0,
    explanation: 'The denominator represents the total equal parts (8) and the numerator represents the parts taken (3). Thus, Kabir ate 3/8.',
    hints: [
      'Denominator goes at the bottom and indicates the total number of slices.',
      'Numerator goes at the top and indicates how many slices were eaten.',
      'Total is 8, eaten is 3. So the fraction is 3/8.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_04_proper_improper_classify',
    nodeId: NODE_C6_MATH_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Classify the fraction 11/4. Why does it belong to this category?',
    options: [
      'Improper fraction, because the numerator (11) is greater than the denominator (4)',
      'Proper fraction, because 11 and 4 are whole numbers',
      'Mixed fraction, because it contains two digits in the numerator',
      'Unit fraction, because the denominator is an even number',
    ],
    correctIndex: 0,
    explanation: 'Whenever the numerator is greater than or equal to the denominator, the fraction represents 1 whole or more and is termed an improper fraction.',
    hints: [
      'Compare the top number with the bottom number.',
      '11 is strictly greater than 4.',
      'Since numerator > denominator, it is an improper fraction.',
    ],
  },
  {
    id: 'ch_05_decimal_place_value',
    nodeId: NODE_C6_MATH_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the number 23.456, what is the exact place value of the digit 5?',
    options: [
      '5 hundredths (5/100 or 0.05)',
      '5 tenths (5/10 or 0.5)',
      '5 tens (50)',
      '5 thousandths (5/1000 or 0.005)',
    ],
    correctIndex: 0,
    explanation: 'The first place to the right of the decimal point is tenths (4/10), the second place is hundredths (5/100), and the third is thousandths (6/1000).',
    hints: [
      'Look at the position of 5: it is the second digit after the decimal point.',
      '1st place = tenths (1/10), 2nd place = hundredths (1/100).',
      'Therefore, 5 represents 5 hundredths (5/100).',
    ],
  },
  {
    id: 'ch_06_drag_label_fraction_types',
    nodeId: NODE_C6_MATH_024,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each fraction to its matching category label on the diagram.',
    dragItems: [
      { label: '3/7', targetId: 'proper_box' },
      { label: '9/4', targetId: 'improper_box' },
      { label: '2 1/4', targetId: 'mixed_box' },
      { label: '1/6', targetId: 'unit_box' },
    ],
    correctMapping: {
      proper_box: '3/7',
      improper_box: '9/4',
      mixed_box: '2 1/4',
      unit_box: '1/6',
    },
    explanation: '3/7 is proper (num < den), 9/4 is improper (num > den), 2 1/4 is a mixed number (whole + proper), and 1/6 is a unit fraction (num = 1).',
    hints: [
      'Look for the fraction with a whole number and a fraction: that is mixed.',
      'Numerator = 1 means unit fraction.',
      'Compare numerator and denominator for proper vs improper.',
    ],
  },
  {
    id: 'ch_07_decimal_fraction_convert_tenths',
    nodeId: NODE_C6_MATH_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Write 7/100 as a decimal number.',
    options: ['0.07', '0.7', '0.007', '7.00'],
    correctIndex: 0,
    explanation: 'The denominator 100 has two zeros, requiring two digits after the decimal point. We place a placeholder zero: 7/100 = 0.07.',
    hints: [
      'Count the zeros in the denominator: 100 has 2 zeros.',
      'Two zeros mean the decimal must have two digits after the point.',
      'We write 0.07 so that 7 sits in the hundredths place.',
    ],
    misconceptionIndex: 0,
  },

  // ── STANDARD TIER (8 to 15) ──
  {
    id: 'ch_08_improper_to_mixed',
    nodeId: NODE_C6_MATH_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Convert the improper fraction 17/5 into a mixed fraction.',
    options: ['3 2/5', '2 3/5', '3 5/2', '5 2/3'],
    correctIndex: 0,
    explanation: 'Divide 17 by 5: 17 ÷ 5 = 3 with remainder 2. The quotient (3) becomes the whole number, the remainder (2) is the numerator, giving 3 2/5.',
    hints: [
      'Divide 17 by 5 to find how many complete wholes you have.',
      '5 × 3 = 15, leaving a remainder of 2.',
      'Whole part is 3, remainder 2 over denominator 5 gives 3 2/5.',
    ],
  },
  {
    id: 'ch_09_mixed_to_improper',
    nodeId: NODE_C6_MATH_024,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Convert the mixed fraction 3 5/8 to an improper fraction of the form N/8. What is the value of numerator N?',
    correctAnswer: 29,
    tolerance: 0,
    unit: 'numerator value',
    explanation: 'Formula: (whole × denominator + numerator) / denominator = (3 × 8 + 5) / 8 = (24 + 5) / 8 = 29/8.',
    hints: [
      'Multiply the whole number 3 by the denominator 8.',
      '3 × 8 = 24. Now add the top numerator 5.',
      '24 + 5 = 29. So the fraction is 29/8.',
    ],
  },
  {
    id: 'ch_10_equivalent_hcf',
    nodeId: NODE_C6_MATH_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Reduce 84/126 to its simplest form by dividing by the Highest Common Factor (HCF = 42).',
    options: ['2/3', '4/6', '14/21', '42/63'],
    correctIndex: 0,
    explanation: '84 ÷ 42 = 2 and 126 ÷ 42 = 3. Thus 84/126 = 2/3 in lowest terms. While 4/6 and 14/21 are equivalent, 2/3 is the only simplest form.',
    hints: [
      'Find 84 ÷ 42 and 126 ÷ 42.',
      '84 = 42 × 2, 126 = 42 × 3.',
      'Dividing both terms by 42 gives 2/3.',
    ],
  },
  {
    id: 'ch_11_fraction_division_model',
    nodeId: NODE_C6_MATH_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Seven chocolate bars are shared equally among 8 children. Which expression and decimal value represents each child\'s share?',
    options: [
      '7/8 and 7 ÷ 8 = 0.875 chocolate bar',
      '8/7 and 8 ÷ 7 = 1.142 chocolate bars',
      '7/8 and 8 ÷ 7 = 0.875 chocolate bar',
      '1/8 and 1 ÷ 8 = 0.125 chocolate bar',
    ],
    correctIndex: 0,
    explanation: 'Sharing 7 items among 8 people equals the fraction 7/8. Treating fraction as division gives 7 ÷ 8 = 0.875 of a bar per child.',
    hints: [
      'Total items divided by number of people = 7 ÷ 8.',
      'A fraction a/b is identical to the division a ÷ b.',
      '7 ÷ 8 = 0.875.',
    ],
  },
  {
    id: 'ch_12_fraction_compare_lcm',
    nodeId: NODE_C6_MATH_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Asha completed 3/5 of her science project while Rahul completed 4/7 of his. Who completed more, and why?',
    options: [
      'Asha completed more (3/5 = 21/35 while 4/7 = 20/35; 21/35 > 20/35)',
      'Rahul completed more (because 4 and 7 are both bigger numbers than 3 and 5)',
      'Rahul completed more (3/5 = 15/35 while 4/7 = 28/35)',
      'Both completed the exact same amount',
    ],
    correctIndex: 0,
    explanation: 'LCM of denominators 5 and 7 is 35. Equivalent fractions: 3/5 = 21/35 and 4/7 = 20/35. Since 21 > 20, Asha completed more.',
    hints: [
      'You cannot compare numerators directly because the denominators are different.',
      'Find the common denominator: LCM(5, 7) = 35.',
      '3/5 = 21/35 and 4/7 = 20/35. Compare 21 and 20.',
    ],
  },
  {
    id: 'ch_13_fraction_addition_unlike',
    nodeId: NODE_C6_MATH_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate: 1/3 + 1/4. Why can you NOT simply add 1+1 over 3+4 = 2/7?',
    options: [
      '7/12 (LCM of 3 and 4 is 12; 4/12 + 3/12 = 7/12. Denominators represent slice size and must be equal)',
      '2/7 (add top numbers and add bottom numbers)',
      '2/12 = 1/6 (add numerators and multiply denominators)',
      '5/12 (3/12 + 2/12 = 5/12)',
    ],
    correctIndex: 0,
    explanation: 'Thirds and fourths are different-sized pieces. Converting to twelfths via LCM gives 4/12 + 3/12 = 7/12. Adding denominators is a severe mathematical error.',
    hints: [
      'Find the LCM of 3 and 4.',
      'LCM(3, 4) = 12. Rewrite 1/3 as 4/12 and 1/4 as 3/12.',
      'Add the numerators only: 4 + 3 = 7 over 12.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_14_interconvert_fraction_to_decimal',
    nodeId: NODE_C6_MATH_029,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Convert 9/20 to a decimal using equivalent fractions (multiply top and bottom by 5 to get denominator 100).',
    correctAnswer: 0.45,
    tolerance: 0.01,
    unit: 'decimal',
    explanation: '9/20 = (9 × 5) / (20 × 5) = 45/100 = 0.45.',
    hints: [
      'What number times 20 equals 100? 20 × 5 = 100.',
      'Multiply the numerator 9 by 5 as well: 9 × 5 = 45.',
      '45/100 is written in decimal form as 0.45.',
    ],
  },
  {
    id: 'ch_15_drag_sort_steps_unlike_fractions',
    nodeId: NODE_C6_MATH_026,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the systematic steps for comparing two unlike fractions (e.g., 2/3 vs 3/4) in correct sequence.',
    sortItems: [
      'Identify the denominators and find their Least Common Multiple (LCM)',
      'Convert each fraction to an equivalent fraction having the LCM as denominator',
      'Compare the new numerators of the like fractions',
      'Conclude using the original fractions and inequality symbol (> or <)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Step 1: Find LCM of denominators. Step 2: Form equivalent fractions. Step 3: Compare numerators. Step 4: Write final inequality with original fractions.',
    hints: [
      'You cannot compare before finding a common base.',
      'Finding the LCM must be step 1.',
      'The final step is always stating the conclusion with the original fractions.',
    ],
  },

  // ── ADVANCED TIER (16 to 22) ──
  {
    id: 'ch_16_fraction_division_reciprocal',
    nodeId: NODE_C6_MATH_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Calculate: 3/4 ÷ 2/5. Show the correct use of the multiplicative inverse (reciprocal).',
    options: [
      '3/4 × 5/2 = 15/8 = 1 7/8',
      '4/3 × 2/5 = 8/15',
      '3/4 × 2/5 = 6/20 = 3/10',
      '3/2 ÷ 4/5 = 15/8',
    ],
    correctIndex: 0,
    explanation: 'To divide by a fraction, multiply the dividend by the reciprocal of the divisor. Divisor 2/5 has reciprocal 5/2: 3/4 × 5/2 = 15/8.',
    hints: [
      'Keep the first fraction unchanged: 3/4.',
      'Flip the second fraction (divisor): 2/5 becomes 5/2.',
      'Multiply: (3 × 5) / (4 × 2) = 15/8.',
    ],
  },
  {
    id: 'ch_17_terminating_check_factors',
    nodeId: NODE_C6_MATH_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which of the following fractions produces a terminating decimal, and why?',
    options: [
      '7/8, because the denominator 8 = 2³ contains ONLY prime factor 2',
      '1/6, because 6 has prime factors 2 and 3',
      '2/7, because 7 is a prime number',
      '5/12, because 12 is divisible by 4',
    ],
    correctIndex: 0,
    explanation: 'A fraction in lowest terms produces a terminating decimal if and only if the prime factorization of its denominator contains only 2s and/or 5s. 8 = 2³, so 7/8 = 0.875 terminates.',
    hints: [
      'Check the prime factors of each denominator.',
      'Powers of 10 are made solely of 2 and 5.',
      'Only denominators with factors of 2 and 5 can divide evenly into 10, 100, 1000.',
    ],
  },
  {
    id: 'ch_18_word_problem_money',
    nodeId: NODE_C6_MATH_030,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Ananya bought a notebook for ₹32.40 and a geometry box for ₹45.85. She handed a ₹100 note to the shopkeeper. How much change (in ₹) did she receive back?',
    correctAnswer: 21.75,
    tolerance: 0.05,
    unit: '₹',
    explanation: 'Step 1 (Total cost): 32.40 + 45.85 = ₹78.25. Step 2 (Change): 100.00 - 78.25 = ₹21.75.',
    hints: [
      'Add ₹32.40 + ₹45.85 with decimal points vertically aligned.',
      'Total spent = ₹78.25.',
      'Pad ₹100 as 100.00 and subtract: 100.00 - 78.25 = ₹21.75.',
    ],
  },
  {
    id: 'ch_19_word_problem_length_mass',
    nodeId: NODE_C6_MATH_030,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A tailor had a roll of cloth measuring 5.40 m. He cut 1.85 m for a kurta and 2.30 m for trousers. How many metres of cloth remain?',
    correctAnswer: 1.25,
    tolerance: 0.05,
    unit: 'm',
    explanation: 'Total cloth cut = 1.85 + 2.30 = 4.15 m. Remaining cloth = 5.40 - 4.15 = 1.25 m.',
    hints: [
      'First calculate the total length used: 1.85 + 2.30 m.',
      'Total used = 4.15 m.',
      'Subtract used cloth from original 5.40 m: 5.40 - 4.15 = 1.25 m.',
    ],
  },
  {
    id: 'ch_20_temperature_drop_rise',
    nodeId: NODE_C6_MATH_030,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In Shimla, the temperature at 2:00 PM was 18.6 °C. By midnight it dropped by 9.4 °C, and by 6:00 AM it rose by 2.1 °C. What was the 6:00 AM temperature in °C?',
    correctAnswer: 11.3,
    tolerance: 0.1,
    unit: '°C',
    explanation: 'Step 1 (Drop): 18.6 - 9.4 = 9.2 °C at midnight. Step 2 (Rise): 9.2 + 2.1 = 11.3 °C at 6:00 AM.',
    hints: [
      '"Dropped" means subtract: 18.6 - 9.4.',
      'Midnight reading = 9.2 °C.',
      '"Rose" means add: 9.2 + 2.1 = 11.3 °C.',
    ],
  },
  {
    id: 'ch_21_construct_fraction_addition',
    nodeId: NODE_C6_MATH_027,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct mathematical expression showing the addition of 1/2 and 1/3 via LCM 6.',
    availableParts: ['3/6', '+', '2/6', '=', '5/6', '1/5', '2/5'],
    targetState: '3/6 + 2/6 = 5/6',
    validationHint: 'Select 3/6, then +, then 2/6, then =, then 5/6.',
    explanation: '1/2 = 3/6 and 1/3 = 2/6. Adding them gives 3/6 + 2/6 = 5/6.',
    hints: [
      'Convert 1/2 to sixths: 3/6.',
      'Convert 1/3 to sixths: 2/6.',
      'Put together: 3/6 + 2/6 = 5/6.',
    ],
  },
  {
    id: 'ch_22_evaluate_infinite_cardinality',
    nodeId: NODE_C6_MATH_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "The set of natural numbers N = {1, 2, 3, ...} has a cardinality of 1,000,000,000,000 because it is huge." Evaluate this claim.',
    options: [
      'The claim is incorrect: N is infinite, so it has no finite whole-number cardinality',
      'The claim is correct: one trillion is the official upper limit of counting in ICSE',
      'The claim is correct: infinite sets have cardinality equal to their largest element',
      'The claim is incorrect: the cardinality of N is 0',
    ],
    correctIndex: 0,
    explanation: 'Natural numbers continue endlessly. Because counting never terminates, infinite sets do NOT have a finite cardinality at this school stage.',
    hints: [
      'Does counting natural numbers ever reach a stopping point?',
      'The three dots (...) indicate that the elements continue without bound.',
      'Infinity is not a finite whole number; infinite sets have no finite cardinality.',
    ],
  },
];

// ─── PROPS INTERFACE ──────────────────────────────────────────────────────────
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

// ─── DEFAULT PROPS ───────────────────────────────────────────────────��───────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C6_MATH_021,
  title: 'Sets, Fractions & Decimal Systems Masterclass',
  definition: 'A comprehensive study of set cardinality n(A), pictorial & number-line representations of proper, improper, mixed, and equivalent fractions, operations via LCM & reciprocals, decimal place-value, and real-world multi-step decimal word problems.',
  eli5: 'Think of sets as trays where you count unique items, fractions as sharing pizza slices of equal sizes, and decimals as measuring money in rupees and paise with a dot in the middle!',
  misconceptions: [
    { misconception: 'Writing 7/100 as 0.7 instead of 0.07', correction: 'Two zeros in denominator 100 require two digits after the decimal point: 0.07.' },
    { misconception: 'Counting duplicates when finding set cardinality (e.g. {1,2,2,3} = 4)', correction: 'Sets contain distinct elements only. {1, 2, 2, 3} has cardinality 3.' },
    { misconception: 'Thinking the cardinality of the empty set {} is undefined', correction: 'The cardinality of the empty set is the definite number 0.' },
    { misconception: 'Adding unlike fractions by adding tops and bottoms (1/3 + 1/4 = 2/7)', correction: 'You must first find the common denominator using LCM: 4/12 + 3/12 = 7/12.' },
    { misconception: 'Omitting units in real-world decimal problems (writing 41.85 instead of ₹41.85)', correction: 'Physical and financial quantities are incomplete without their respective units (₹, m, kg, °C).' },
  ],
  diagnosticQuestions: [
    { question: 'What is the cardinality of the set V = {a, e, i, o, u}?', options: ['n(V) = 5', 'n(V) = 26', 'n(V) = 1', 'n(V) = 0'], correctIndex: 0 },
    { question: 'What is the cardinality of the empty set {}?', options: ['0', '1', 'Undefined', 'Infinity'], correctIndex: 0 },
    { question: 'In the fraction 5/9, which number is the denominator?', options: ['9', '5', '14', '4'], correctIndex: 0 },
    { question: 'Convert 9/4 into a mixed fraction.', options: ['2 1/4', '1 5/4', '4 1/2', '2 3/4'], correctIndex: 0 },
    { question: 'Which fraction is equivalent to 3/5?', options: ['9/15', '6/15', '3/10', '15/20'], correctIndex: 0 },
    { question: 'Compare 2/3 and 3/4.', options: ['3/4 > 2/3', '2/3 > 3/4', '2/3 = 3/4', 'Cannot compare'], correctIndex: 0 },
    { question: 'What is 0.75 expressed as a fraction in simplest form?', options: ['3/4', '75/10', '7/5', '1/4'], correctIndex: 0 },
    { question: 'Calculate: ₹50.00 - ₹23.45.', options: ['₹26.55', '₹27.55', '₹26.45', '₹36.55'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of set cardinality, fraction forms, LCM-based operations, decimal place value, and real-world unit problem solving.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ──────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Set Cardinality & The Duplicate Filter',
    instruction: 'Click items to add them to Set S. Observe how duplicate cards do not increase cardinality n(S)!',
    interactionType: 'click-set-builder',
    nodeId: NODE_C6_MATH_021,
  },
  {
    title: 'Lab 2: The Pizza Fraction Partitioning Lab',
    instruction: 'Adjust the total slice slider and shaded slice slider to observe proper vs improper fractions in real time.',
    interactionType: 'slider-pizza',
    nodeId: NODE_C6_MATH_022,
  },
  {
    title: 'Lab 3: Number Line & Common Denominator Balancer',
    instruction: 'Drag denominator multipliers to align two fractions on the exact same common grid tick marks.',
    interactionType: 'slider-lcm',
    nodeId: NODE_C6_MATH_026,
  },
  {
    title: 'Lab 4: The 100-Square Decimal Grid & Place Value',
    instruction: 'Click tenths strips and hundredths tiles to build decimals like 0.47 and view their expanded notation.',
    interactionType: 'click-grid',
    nodeId: NODE_C6_MATH_028,
  },
  {
    title: 'Lab 5: Real-World Cash & Mass Decimal Register',
    instruction: 'Adjust the purchased items to see vertical decimal alignment and automatic change calculation.',
    interactionType: 'register-calc',
    nodeId: NODE_C6_MATH_030,
  },
];

// ─── PREDICTION QUESTIONS ──────────────────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you take the set A = {2, 4, 6} and add another number 4 to it, what will happen to the cardinality n(A)?',
    options: [
      'Cardinality remains n(A) = 3 because 4 is already in the set',
      'Cardinality increases to n(A) = 4 because a 4th card was placed',
      'Cardinality becomes 0 because sets cannot have duplicates',
      'Cardinality doubles to 6',
    ],
    correctIndex: 0,
    verifyInstruction: 'Try clicking number 4 in the Set Lab below and observe the cardinality counter!',
    nodeId: NODE_C6_MATH_021,
  },
  {
    question: 'Predict: If you cut a chocolate bar into 12 pieces and eat 8 pieces, is that equal to eating 2 pieces of a 3-piece bar?',
    options: [
      'Yes, because 8/12 reduces to 2/3 by dividing top and bottom by 4',
      'No, because 8 is more pieces than 2',
      'No, because 12 pieces make you fuller',
      'Yes, but only if the chocolate is dark chocolate',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the fraction simulator to 8/12 and watch it simplify to 2/3.',
    nodeId: NODE_C6_MATH_025,
  },
];

// ─── OBSERVATION QUESTIONS ────────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice when the numerator equals the denominator (e.g. 8/8 slices)?',
    observableOptions: [
      'The fraction exactly equals 1 whole circle',
      'The fraction becomes 0',
      'The fraction is less than half',
      'The fraction is infinite',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_MATH_022,
  },
  {
    question: 'What happens to the decimal 0.7 if we write it as hundredths?',
    observableOptions: [
      'It becomes 0.70, which covers exactly 70 squares out of 100',
      'It becomes 0.07, which is 10 times smaller',
      'It changes value to 7.0',
      'It cannot be represented on a 100-grid',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_MATH_028,
  },
];

// ─── REAL WORLD ACTIVITY ───────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'The Bengaluru STEM Fair Budget & Inventory Audit',
  description: 'Act as the Chief Financial Comptroller: Calculate the exact cost of 3.75 m display cloth at ₹45.50/m and compute the leftover ribbon from 10.00 m after using 4.25 m for badges.',
  steps: [
    'Write down the original cloth length: 10.00 m',
    'Align decimals vertically to subtract badge ribbon: 10.00 - 4.25 = 5.75 m',
    'Verify that 5.75 m can also be expressed as the mixed fraction 5 3/4 m',
    'Record your finding in your exhibition log book!',
  ],
};

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export function C6_MathematicsCardinalitySim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ── Stream Subject Config ──
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ── Phase Flow ──
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ── Adaptive & Scoring States ──
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ── Escalating Hints & Explanations ──
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ── Visual Feedback States ──
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ── Discovery & Prediction States ──
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // ── Interactive Exploration Lab 1: Sets ──
  const [setItems, setSetItems] = useState<number[]>([2, 5]);
  const distinctCount = useMemo(() => Array.from(new Set(setItems)).length, [setItems]);

  // ── Interactive Exploration Lab 2: Pizza Fraction ──
  const [pizzaTotal, setPizzaTotal] = useState(8);
  const [pizzaShaded, setPizzaShaded] = useState(3);

  // ── Interactive Exploration Lab 3: Fractions Balancer ──
  const [fracNum1, setFracNum1] = useState(2);
  const [fracDen1, setFracDen1] = useState(3);
  const [fracNum2, setFracNum2] = useState(3);
  const [fracDen2, setFracDen2] = useState(4);

  // ── Interactive Exploration Lab 4: Decimal 100-Grid ──
  const [gridTenths, setGridTenths] = useState(4);
  const [gridHundredths, setGridHundredths] = useState(7);

  // ── Interactive Exploration Lab 5: Cash Register ──
  const [item1Price, setItem1Price] = useState(25.75);
  const [item2Price, setItem2Price] = useState(32.40);
  const [cashGiven, setCashGiven] = useState(100.00);

  // ── Sandbox States ──
  const [sandboxDenominator, setSandboxDenominator] = useState(6);
  const [sandboxNumerator, setSandboxNumerator] = useState(4);

  // ── Non-MCQ Challenge Inputs ──
  const [draggedLabel, setDraggedLabel] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ── Reflection Responses ──
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // ── Refs ──
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ── Adaptive Filtering of Challenges ──
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ── Check Existing Mastery on Mount ──
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ── BKT Difficulty Adjustment ──
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

  // ── Canvas 2D Animation Loop ──
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

      const width = canvas.width;
      const height = canvas.height;
      ctx.strokeStyle = '#4f46e5';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < width; x += 5) {
        const y = height / 2 + Math.sin((x + frame * 2) * 0.04) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const pulse = 3 + Math.sin(frame * 0.08) * 2;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(width - 25, height / 2, pulse, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge]);

  // ── HANDLERS ──

  const showNextHint = useCallback(() => {
    const next = hintCount + 1;
    if (next <= 3 && challenge.hints[next - 1]) {
      setCurrentHint(challenge.hints[next - 1]);
      setShowHint(true);
      setHintCount(next);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[next - 1]);
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb logic! Duplicates do not add to set cardinality.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration laboratories!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to experiment with any fractions and place values in sandbox mode.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time to put your mastery to the test with these challenges!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the interactive model to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp mathematical observation!' : 'Look closely at how the whole shapes relate.');
  }, []);

  const handleAddItemToSet = useCallback((val: number) => {
    setSetItems(prev => [...prev, val]);
    audioManager.play('pickup');
  }, []);

  const handleClearSet = useCallback(() => {
    setSetItems([]);
    audioManager.play('pop');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Magnificent! You have conquered the Sets, Fractions, and Decimals masterclass.');
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
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Spot on! Excellent calculation.');
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
        speechManager.speak('Let us review the step-by-step solution together.');

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

  const handleDragStart = useCallback((label: string) => {
    setDraggedLabel(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedLabel) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedLabel;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedLabel }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedLabel(null);
  }, [draggedLabel, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleSparkleClick = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSparklePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setShowSparkle(true);
    audioManager.play('sparkle');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden font-sans">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── HEADER ── */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20 cursor-pointer"
            onClick={handleSparkleClick}
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-indigo-300 font-medium">
              ICSE Class 6 Mathematics • <span className="text-emerald-400 font-mono">10 Curricular Units</span>
            </p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : difficulty === 'standard'
                ? 'bg-blue-950/80 border-blue-500 text-blue-300'
                : 'bg-rose-950/80 border-rose-500 text-rose-300'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs font-semibold text-slate-300">
            Mastery: <span className="text-indigo-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </header>

      {/* ── PHASE 1: DISCOVERY HOOK ── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-5 md:p-6 bg-gradient-to-r from-indigo-950/90 via-slate-900 to-slate-900 rounded-2xl border border-indigo-700/50 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">
              <span>🚀 Mission Scenario</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic bg-slate-950/40 p-2 rounded-lg border border-slate-800">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Curiosity Discovery Challenge
              </span>
              <span className="text-xs text-slate-400">Zero pressure • Non-graded</span>
            </div>

            <p className="text-base font-semibold text-white leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all duration-200 border ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/30'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                  aria-label={`Option ${idx + 1}: ${option}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Brilliant start! Distinct elements define the cardinality.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 text-sm"
                >
                  Enter Interactive Discovery Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ── PHASE 2: INTERACTIVE GUIDED EXPLORATION ── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  currentSlide === idx
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Lab {idx + 1}: {step.title.split(':')[1] || step.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-indigo-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <span className="text-xs text-amber-400 bg-amber-950/40 border border-amber-800/60 px-3 py-1 rounded-full font-medium">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </span>
              </div>

              {/* ── LAB 1: SET CARDINALITY SIMULATOR (SVG 1: SET VENN DIAGRAM) ── */}
              {currentSlide === 0 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* TOPIC SVG 1: VENN SET CONTAINER */}
                    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-2xl border border-slate-800">
                      <svg viewBox="0 0 240 180" className="w-56 h-40">
                        <defs>
                          <radialGradient id="setGrad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.8" />
                          </radialGradient>
                        </defs>
                        <rect x="5" y="5" width="230" height="170" rx="15" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                        <text x="20" y="25" fill="#94a3b8" fontSize="12" fontWeight="bold">Universal Set U</text>
                        <ellipse cx="120" cy="100" rx="90" ry="60" fill="url(#setGrad)" stroke="#6366f1" strokeWidth="3" strokeDasharray="4 2" />
                        <text x="120" y="58" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">Set S (Distinct Members)</text>

                        {/* Distinct Element bubbles rendered in SVG */}
                        {Array.from(new Set(setItems)).map((num, i, arr) => {
                          const angle = (i / Math.max(1, arr.length)) * 2 * Math.PI - Math.PI / 2;
                          const cx = 120 + 50 * Math.cos(angle);
                          const cy = 105 + 30 * Math.sin(angle);
                          return (
                            <g key={i}>
                              <circle cx={cx} cy={cy} r="14" fill="#6366f1" stroke="#c7d2fe" strokeWidth="1.5" />
                              <text x={cx} y={cy + 4} textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">{num}</text>
                            </g>
                          );
                        })}
                        {setItems.length === 0 && (
                          <text x="120" y="110" textAnchor="middle" fill="#64748b" fontSize="12" fontStyle="italic">Empty Set {'{ }'} : n(S)=0</text>
                        )}
                      </svg>
                      <p className="text-xs text-indigo-300 mt-2 font-mono">
                        Venn Diagram: n(S) = {distinctCount} unique item{distinctCount !== 1 ? 's' : ''}
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Click cards to add to Set S:</p>
                        <div className="flex flex-wrap gap-2">
                          {[1, 2, 3, 4, 5, 5, 7, 9].map((val, idx) => (
                            <motion.button
                              key={idx}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleAddItemToSet(val)}
                              className="w-10 h-10 rounded-xl bg-indigo-900/70 border border-indigo-600 text-white font-bold text-sm flex items-center justify-center hover:bg-indigo-800 shadow-md"
                            >
                              {val}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleClearSet}
                          className="px-3 py-2 bg-rose-900/40 hover:bg-rose-900/60 border border-rose-700 text-rose-200 text-xs font-semibold rounded-xl"
                        >
                          Clear Set {}
                        </motion.button>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                        <p className="text-slate-300">Raw Array: <span className="font-mono text-amber-300">[{setItems.join(', ') || 'empty'}]</span></p>
                        <p className="text-slate-300">Roster Form: <span className="font-mono text-emerald-400">S = {'{' + Array.from(new Set(setItems)).join(', ') + '}'}</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Predict-Then-Check Hook in Lab 1 */}
                  {!predictionMade && (
                    <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs font-bold text-amber-300">🤔 {PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2 text-left bg-slate-800 rounded-lg text-xs text-slate-200 hover:bg-slate-700 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                  {predictionMade && (
                    <p className="text-xs text-emerald-400 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800">
                      ✓ Prediction tested! Notice how duplicates do not increase the cardinality count n(S).
                    </p>
                  )}
                </div>
              )}

              {/* ── LAB 2: PIZZA FRACTION PARTITIONING (SVG 2: PIE WHEEL) ── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* TOPIC SVG 2: FRACTION SECTOR WHEEL */}
                    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-2xl border border-slate-800">
                      <svg viewBox="0 0 200 200" className="w-48 h-48">
                        <circle cx="100" cy="100" r="90" fill="#1e293b" stroke="#334155" strokeWidth="4" />
                        {Array.from({ length: pizzaTotal }).map((_, i) => {
                          const angle = (2 * Math.PI) / pizzaTotal;
                          const startAngle = i * angle - Math.PI / 2;
                          const endAngle = (i + 1) * angle - Math.PI / 2;
                          const x1 = 100 + 90 * Math.cos(startAngle);
                          const y1 = 100 + 90 * Math.sin(startAngle);
                          const x2 = 100 + 90 * Math.cos(endAngle);
                          const y2 = 100 + 90 * Math.sin(endAngle);
                          const isShaded = i < pizzaShaded;

                          return (
                            <path
                              key={i}
                              d={`M100,100 L${x1},${y1} A90,90 0 0,1 ${x2},${y2} Z`}
                              fill={isShaded ? '#6366f1' : '#0f172a'}
                              stroke="#1e293b"
                              strokeWidth="2"
                              className="transition-colors duration-200"
                            />
                          );
                        })}
                        <circle cx="100" cy="100" r="15" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                        <text x="100" y="105" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                          {pizzaShaded}/{pizzaTotal}
                        </text>
                      </svg>
                      <p className="text-xs text-slate-400 mt-2 font-mono">
                        Visual Model: {pizzaShaded} out of {pizzaTotal} equal sectors shaded
                      </p>
                    </div>

                    {/* Sliders & Analysis */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Denominator (Total Equal Slices):</span>
                          <span className="font-mono font-bold text-indigo-400">{pizzaTotal}</span>
                        </div>
                        <input
                          type="range"
                          min={2}
                          max={12}
                          value={pizzaTotal}
                          onChange={e => {
                            setPizzaTotal(Number(e.target.value));
                            if (pizzaShaded > Number(e.target.value)) setPizzaShaded(Number(e.target.value));
                          }}
                          className="w-full accent-indigo-500"
                          aria-label="Denominator slider"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Numerator (Shaded Slices Taken):</span>
                          <span className="font-mono font-bold text-emerald-400">{pizzaShaded}</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={pizzaTotal}
                          value={pizzaShaded}
                          onChange={e => setPizzaShaded(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                          aria-label="Numerator slider"
                        />
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                        <p className="text-slate-300">
                          Classification:{' '}
                          <span className="font-bold text-indigo-300">
                            {pizzaShaded < pizzaTotal
                              ? 'Proper Fraction (Value < 1)'
                              : 'Whole / Improper (Value = 1)'}
                          </span>
                        </p>
                        <p className="text-slate-400 font-mono">
                          Fraction as Division: {pizzaShaded} ÷ {pizzaTotal} = {(pizzaShaded / pizzaTotal).toFixed(3)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {!observationAnswered && (
                    <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2 mt-3">
                      <p className="text-xs font-bold text-amber-300">👁️ {OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2 text-left bg-slate-800 rounded-lg text-xs text-slate-200 hover:bg-slate-700 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── LAB 3: FRACTIONS COMPARISON (SVG 3: COMPARISON BAR STRIPS) ── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <p className="text-xs text-slate-400">
                    Compare Fraction A (<span className="text-indigo-400 font-bold">{fracNum1}/{fracDen1}</span>) with Fraction B (<span className="text-purple-400 font-bold">{fracNum2}/{fracDen2}</span>) visually:
                  </p>

                  {/* TOPIC SVG 3: FRACTION STRIP COMPARISON */}
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 320 100" className="w-full max-w-md h-28">
                      <rect x="10" y="15" width="300" height="25" fill="#1e293b" rx="4" stroke="#475569" strokeWidth="1" />
                      {Array.from({ length: fracDen1 }).map((_, i) => {
                        const segW = 300 / fracDen1;
                        const isShaded = i < fracNum1;
                        return (
                          <rect
                            key={`a-${i}`}
                            x={10 + i * segW}
                            y="15"
                            width={segW}
                            height="25"
                            fill={isShaded ? '#6366f1' : 'transparent'}
                            stroke="#0f172a"
                            strokeWidth="1.5"
                          />
                        );
                      })}
                      <text x="15" y="32" fill="#ffffff" fontSize="10" fontWeight="bold">A: {fracNum1}/{fracDen1}</text>

                      <rect x="10" y="55" width="300" height="25" fill="#1e293b" rx="4" stroke="#475569" strokeWidth="1" />
                      {Array.from({ length: fracDen2 }).map((_, i) => {
                        const segW = 300 / fracDen2;
                        const isShaded = i < fracNum2;
                        return (
                          <rect
                            key={`b-${i}`}
                            x={10 + i * segW}
                            y="55"
                            width={segW}
                            height="25"
                            fill={isShaded ? '#a855f7' : 'transparent'}
                            stroke="#0f172a"
                            strokeWidth="1.5"
                          />
                        );
                      })}
                      <text x="15" y="72" fill="#ffffff" fontSize="10" fontWeight="bold">B: {fracNum2}/{fracDen2}</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-indigo-900/60 space-y-2">
                      <p className="text-xs font-bold text-indigo-400">Fraction A</p>
                      <div className="flex gap-2">
                        <label className="text-xs text-slate-400">Num: </label>
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={fracNum1}
                          onChange={e => setFracNum1(Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-white"
                        />
                        <label className="text-xs text-slate-400">Den: </label>
                        <input
                          type="number"
                          min={1}
                          max={12}
                          value={fracDen1}
                          onChange={e => setFracDen1(Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-purple-900/60 space-y-2">
                      <p className="text-xs font-bold text-purple-400">Fraction B</p>
                      <div className="flex gap-2">
                        <label className="text-xs text-slate-400">Num: </label>
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={fracNum2}
                          onChange={e => setFracNum2(Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-white"
                        />
                        <label className="text-xs text-slate-400">Den: </label>
                        <input
                          type="number"
                          min={1}
                          max={12}
                          value={fracDen2}
                          onChange={e => setFracDen2(Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {(() => {
                    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
                    const lcm = (fracDen1 * fracDen2) / gcd(fracDen1, fracDen2);
                    const eqNum1 = fracNum1 * (lcm / fracDen1);
                    const eqNum2 = fracNum2 * (lcm / fracDen2);
                    const comparison = eqNum1 > eqNum2 ? '>' : eqNum1 < eqNum2 ? '<' : '=';

                    return (
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-xs space-y-1">
                          <p className="text-slate-300">
                            LCM of Denominators ({fracDen1}, {fracDen2}) = <span className="font-bold text-amber-400">{lcm}</span>
                          </p>
                          <p className="font-mono text-indigo-300">
                            {fracNum1}/{fracDen1} = {eqNum1}/{lcm}
                          </p>
                          <p className="font-mono text-purple-300">
                            {fracNum2}/{fracDen2} = {eqNum2}/{lcm}
                          </p>
                        </div>
                        <div className="p-3 bg-indigo-950/80 rounded-xl border border-indigo-600 text-center">
                          <p className="text-xs text-slate-300">Inequality Verdict</p>
                          <p className="text-lg font-black text-white">
                            {fracNum1}/{fracDen1} {comparison} {fracNum2}/{fracDen2}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ── LAB 4: 100-SQUARE DECIMAL GRID ── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="flex flex-col items-center">
                      <div className="grid grid-cols-10 gap-0.5 p-2 bg-slate-900 rounded-xl border border-slate-800">
                        {Array.from({ length: 100 }).map((_, i) => {
                          const totalShaded = gridTenths * 10 + gridHundredths;
                          const isShaded = i < totalShaded;
                          return (
                            <div
                              key={i}
                              className={`w-4 h-4 rounded-xs transition-colors duration-150 ${
                                isShaded ? 'bg-emerald-500 shadow-xs' : 'bg-slate-800'
                              }`}
                            />
                          );
                        })}
                      </div>
                      <p className="text-xs text-slate-400 mt-2 font-mono">
                        {gridTenths * 10 + gridHundredths} / 100 squares shaded
                      </p>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Tenths Columns (1/10 each):</span>
                          <span className="font-mono font-bold text-emerald-400">{gridTenths} tenths (0.{gridTenths})</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={9}
                          value={gridTenths}
                          onChange={e => setGridTenths(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                          aria-label="Tenths slider"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Extra Hundredths Squares (1/100 each):</span>
                          <span className="font-mono font-bold text-indigo-400">{gridHundredths} hundredths (0.0{gridHundredths})</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={9}
                          value={gridHundredths}
                          onChange={e => setGridHundredths(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                          aria-label="Hundredths slider"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <p className="font-bold text-white text-sm">
                          Decimal Value: 0.{gridTenths}{gridHundredths}
                        </p>
                        <p className="text-slate-400 font-mono">
                          Expanded Form = {gridTenths}/10 + {gridHundredths}/100 = {gridTenths * 10 + gridHundredths}/100
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 5: REAL-WORLD DECIMAL CASH REGISTER ── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <p className="text-xs font-bold text-indigo-400 uppercase">Itemized Bill (Vertical Alignment)</p>
                      <div className="space-y-2 text-xs">
                        <div>
                          <label className="text-slate-400">Pen / Notebook (₹): </label>
                          <input
                            type="number"
                            step="0.05"
                            value={item1Price}
                            onChange={e => setItem1Price(Number(e.target.value))}
                            className="w-24 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400">Geometry Box (₹): </label>
                          <input
                            type="number"
                            step="0.05"
                            value={item2Price}
                            onChange={e => setItem2Price(Number(e.target.value))}
                            className="w-24 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400">Cash Tendered (₹): </label>
                          <input
                            type="number"
                            step="1.00"
                            value={cashGiven}
                            onChange={e => setCashGiven(Number(e.target.value))}
                            className="w-24 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                      <p className="text-slate-400">Step 1: Aligned Addition</p>
                      <div className="pl-4 border-l-2 border-indigo-500 text-slate-200">
                        <p>  ₹ {item1Price.toFixed(2)}</p>
                        <p>+ ₹ {item2Price.toFixed(2)}</p>
                        <p className="border-t border-slate-700 font-bold text-amber-300">
                          = ₹ {(item1Price + item2Price).toFixed(2)} Total
                        </p>
                      </div>

                      <p className="text-slate-400 pt-1">Step 2: Aligned Subtraction (Change)</p>
                      <div className="pl-4 border-l-2 border-emerald-500 text-slate-200">
                        <p>  ₹ {cashGiven.toFixed(2)}</p>
                        <p>- ₹ {(item1Price + item2Price).toFixed(2)}</p>
                        <p className="border-t border-slate-700 font-bold text-emerald-400">
                          = ₹ {(cashGiven - (item1Price + item2Price)).toFixed(2)} Change Due
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold disabled:opacity-40 border border-slate-700"
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
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ── PHASE 3: FREE SANDBOX EXPLORATION ── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Interactive Sandbox & Visual Prover</h3>
              <p className="text-xs text-slate-400 mt-1">
                Freely manipulate proper, improper, mixed, and decimal representations without any time or score pressure.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 text-sm whitespace-nowrap"
            >
              I am Ready for Challenges! 🎯
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            {/* Visual Number Line & Fraction Bar */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-indigo-400 uppercase">Live Number Line [0 to 2]</p>
              <div className="relative h-16 bg-slate-900 rounded-xl border border-slate-800 flex items-center px-4">
                <div className="w-full h-1 bg-slate-700 relative">
                  <div className="absolute -top-2 left-0 w-0.5 h-5 bg-white"><span className="absolute top-6 -left-1 text-xs font-bold">0</span></div>
                  <div className="absolute -top-2 left-1/2 w-0.5 h-5 bg-white"><span className="absolute top-6 -left-1 text-xs font-bold">1</span></div>
                  <div className="absolute -top-2 right-0 w-0.5 h-5 bg-white"><span className="absolute top-6 -left-1 text-xs font-bold">2</span></div>

                  <motion.div
                    className="absolute -top-3 w-7 h-7 bg-indigo-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-indigo-500/50"
                    animate={{ left: `${Math.min(100, (sandboxNumerator / sandboxDenominator / 2) * 100)}%` }}
                    style={{ transform: 'translateX(-50%)' }}
                  >
                    •
                  </motion.div>
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                <p className="text-slate-300">
                  Improper Form: <span className="font-bold text-indigo-400">{sandboxNumerator}/{sandboxDenominator}</span>
                </p>
                <p className="text-slate-300">
                  Mixed Form:{' '}
                  <span className="font-bold text-emerald-400">
                    {Math.floor(sandboxNumerator / sandboxDenominator)} {sandboxNumerator % sandboxDenominator}/{sandboxDenominator}
                  </span>
                </p>
                <p className="text-slate-300">
                  Decimal Value: <span className="font-bold text-amber-400">{(sandboxNumerator / sandboxDenominator).toFixed(4)}</span>
                </p>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Numerator:</span>
                  <span className="font-bold font-mono text-indigo-400">{sandboxNumerator}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={24}
                  value={sandboxNumerator}
                  onChange={e => setSandboxNumerator(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Denominator:</span>
                  <span className="font-bold font-mono text-emerald-400">{sandboxDenominator}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={sandboxDenominator}
                  onChange={e => setSandboxDenominator(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 p-2">
                <canvas ref={canvasRef} width={400} height={40} className="w-full h-10" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── PHASE 4: PROGRESSIVE CHALLENGES ── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>
                Challenge <span className="text-white font-bold">{currentChallenge + 1}</span> of{' '}
                <span className="text-white font-bold">{filteredChallenges.length}</span>
              </span>
              <span className="text-indigo-400 uppercase font-mono tracking-wider">
                Competency: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-colors duration-300 ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 shadow-xl shadow-rose-950/50'
                : 'bg-slate-900/90 border-slate-800 shadow-xl'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ Type */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                    }`}
                    aria-label={`Option ${i + 1}: ${opt}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-700/80 flex items-center justify-center text-xs font-mono shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                      role="button"
                      aria-label={`Draggable label ${item.label}`}
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'proper_box', title: 'Proper Fraction' },
                    { id: 'improper_box', title: 'Improper Fraction' },
                    { id: 'mixed_box', title: 'Mixed Fraction' },
                    { id: 'unit_box', title: 'Unit Fraction' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/60 text-center flex flex-col justify-center items-center min-h-[90px]"
                    >
                      <span className="text-xs text-slate-400 font-semibold mb-1">{target.title}</span>
                      <span className="text-sm font-bold text-emerald-400">
                        {droppedLabels[target.id] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Verify All Targets
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to rearrange in systematic logical sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => setDraggedLabel(String(idx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedLabel || '0');
                        handleSortMove(from, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl text-xs text-slate-200 border border-slate-700 flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Submit Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-indigo-500 outline-none w-48"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-900/80 border border-indigo-600 text-indigo-200 text-xs font-mono font-bold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex items-center gap-2 flex-wrap">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-3 py-1 bg-indigo-700 text-white font-mono font-bold text-xs rounded-md">
                      {part}
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click buttons above to construct expression</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    className="px-5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow"
                  >
                    Validate Expression
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setConstructParts([])}
                    className="px-3 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Reset
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-amber-950/40 border border-amber-800/80 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Step-by-Step Mathematical Explanation
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-amber-100">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="leading-relaxed"
                      >
                        <span className="font-bold text-amber-400">Step {idx + 1}:</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-3 py-1.5 bg-amber-800/80 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Masterclass 🏆' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ── PHASE 5: COMPLETION, MOTIVATIONAL FEEDBACK & REFLECTION ── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-tr from-indigo-950/80 via-slate-900 to-emerald-950/80 rounded-3xl border border-indigo-700/50 shadow-2xl text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-white">Masterclass Completed! 🎖️</h2>
            <p className="text-sm text-slate-300">
              Final Score: <span className="font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span> • Overall Mastery:{' '}
              <span className="font-bold text-indigo-300 capitalize">{masteryLevel}</span> • Total Errors:{' '}
              <span className="font-bold text-amber-400">{errors}</span>
            </p>

            {/* PERSONALISED MOTIVATIONAL FEEDBACK */}
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 text-sm font-bold text-white shadow-inner">
              {errors === 0 && (
                <div className="text-emerald-400 space-y-1">
                  <p className="text-lg">🌟 PERFECT SCORE!</p>
                  <p className="text-xs font-normal text-emerald-200">
                    Flawless mastery! You calculated every fraction, set cardinality, and decimal with supreme precision.
                  </p>
                </div>
              )}
              {errors >= 1 && errors <= 3 && (
                <div className="text-indigo-400 space-y-1">
                  <p className="text-lg">👏 Great work!</p>
                  <p className="text-xs font-normal text-indigo-200">
                    Your understanding of set cardinality, fraction conversions, and decimal place values is robust and confident.
                  </p>
                </div>
              )}
              {errors >= 4 && errors <= 7 && (
                <div className="text-amber-400 space-y-1">
                  <p className="text-lg">👍 Good effort!</p>
                  <p className="text-xs font-normal text-amber-200">
                    You have laid a strong foundation. Reviewing the fraction LCM conversions will make you unstoppable!
                  </p>
                </div>
              )}
              {errors >= 8 && (
                <div className="text-rose-400 space-y-1">
                  <p className="text-lg">💪 Do not give up — You WILL get this!</p>
                  <p className="text-xs font-normal text-rose-200">
                    Every mathematician learns by solving mistakes. Walk through the interactive discovery labs again to master the concepts!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── REFLECTION SECTION ── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-indigo-900/60 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <span>💭 Metacognitive Reflection</span>
            </div>
            <h3 className="text-base font-bold text-white">Consolidate Your Mathematical Thinking</h3>

            <div className="space-y-4">
              {/* Question 1 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-indigo-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., That duplicate elements in a set do not increase its cardinality, or why 1/3 + 1/4 isn't 2/7..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-indigo-500 outline-none resize-none"
                />
              </div>

              {/* Question 2 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-purple-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g., I would use pizza slices to show how different denominator pieces need common sizing before adding..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-purple-500 outline-none resize-none"
                />
              </div>

              {/* Question 3 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-emerald-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g., When calculating grocery bills, sharing food equally among friends, or measuring fabric in metres and centimetres..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-emerald-500 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Misconception Gaps Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/80 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Personalised Diagnostic Gaps Addressed:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl text-xs space-y-1 border border-slate-800">
                      <p className="text-rose-300 font-bold">❌ Common Trap: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Mathematical Truth: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 flex items-center justify-between gap-4 text-xs">
            <span className="text-slate-300">
              📅 Spaced Review Scheduled in:{' '}
              <span className="font-bold text-indigo-300">
                {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
              </span>
            </span>
            <span className="text-slate-400 font-mono">SM-2 Active</span>
          </div>

          {/* Real World Application Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <h3 className="font-bold text-emerald-400 text-sm">🌍 {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-2 bg-slate-950 rounded-lg border border-slate-800/80 text-slate-400">
                  <span className="font-bold text-indigo-400">{i + 1}.</span> {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── SIM ENGINE POPUP OVERLAYS ── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_MathematicsCardinalitySim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C6_MATH_011 = 'c6_math_011';
const NODE_C6_MATH_012 = 'c6_math_012';
const NODE_C6_MATH_013 = 'c6_math_013';
const NODE_C6_MATH_014 = 'c6_math_014';
const NODE_C6_MATH_015 = 'c6_math_015';
const NODE_C6_MATH_016 = 'c6_math_016';
const NODE_C6_MATH_017 = 'c6_math_017';
const NODE_C6_MATH_018 = 'c6_math_018';
const NODE_C6_MATH_019 = 'c6_math_019';
const NODE_C6_MATH_020 = 'c6_math_020';

const ALL_NODE_IDS = [
  NODE_C6_MATH_011,
  NODE_C6_MATH_012,
  NODE_C6_MATH_013,
  NODE_C6_MATH_014,
  NODE_C6_MATH_015,
  NODE_C6_MATH_016,
  NODE_C6_MATH_017,
  NODE_C6_MATH_018,
  NODE_C6_MATH_019,
  NODE_C6_MATH_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Siachen Glacier & Deep Arabian Sea Expedition',
  intro: 'You are the Chief Expedition Navigator & Mathematical Analyst for an elite Indian scientific mission. Your team navigates between the freezing Himalayan altitudes of Siachen & Drass (-10°C to -35°C), sea level ground zero at Mumbai Harbour (0 m), and deep robotic submersibles exploring submarine trenches in the Arabian Sea (-250 m).',
  context: 'To balance thermal systems, chart submarine trajectories, record expedition finances, and categorize catalogued biodiversity samples into well-defined mathematical sets, you need the visual power of the Number Line, Integers, and Set Theory.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In Drass (Ladakh), the midnight thermometer records -6°C. By afternoon, the sun breaks through and the temperature rises by 9°C. What is the new temperature reading?',
  options: ['-15°C', '+3°C', '-3°C', '+15°C'],
  correctIndex: 1,
  hintAfter: 'Rising means moving rightward past zero origin into positive territory: (-6) + (+9) = +3°C! Let us explore how the visual number line makes integer arithmetic intuitive and concrete.',
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

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you start at -8 on the number line and move 5 steps to the right, where will you land?',
    options: ['-13', '-3', '+3', '+13'],
    correctIndex: 1,
    verifyInstruction: 'Drag the red marker to -8 on the number line, then click "Move Right 5" to verify you land on -3.',
  },
  {
    question: 'Predict: The submarine is at -45 m depth. It descends another 20 m. What is the new depth?',
    options: ['-25 m', '-65 m', '+25 m', '-45 m'],
    correctIndex: 1,
    verifyInstruction: 'Set the submarine depth slider to -45 m, then click "Descend 20 m" to verify the new depth reads -65 m.',
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the distance between -3 and +3 on the number line?',
    observableOptions: [
      'They are 6 units apart, equidistant from zero (✓)',
      'They are 3 units apart (✗)',
      'They are 0 units apart — same position (✗)',
      'They are 9 units apart (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'When you add two negative integers like -4 and -7, what direction does the marker move on the number line?',
    observableOptions: [
      'Further left (more negative) because both are negative (✓)',
      'Rightward toward zero (✗)',
      'It stays at zero (✗)',
      'It jumps to positive territory (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── 24+ EXTENSIVE NEP 2020 ALIGNED CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c6_math_011)
  {
    id: 'ch_math_001',
    nodeId: NODE_C6_MATH_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the additive identity of whole numbers and integers, and why?',
    options: [
      '1, because multiplying by 1 keeps the number unchanged',
      '0, because adding 0 to any number leaves its value unchanged (a + 0 = a)',
      '-1, because it represents the first step to the left of the origin',
      'None exists for negative integers',
    ],
    correctIndex: 1,
    explanation: 'Zero (0) is known as the additive identity because adding 0 to any whole number or integer leaves its identity completely unchanged: a + 0 = 0 + a = a. On the number line, adding zero means taking a step of length 0, staying stationary.',
    hints: [
      'Think of what value you can add to 14 so that the sum remains exactly 14.',
      'Moving 0 steps on a ruler leaves you on the exact same mark.',
      '0 is the unique additive identity: x + 0 = x.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Understanding (c6_math_012)
  {
    id: 'ch_math_002',
    nodeId: NODE_C6_MATH_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A naval research submarine dives 75 metres below sea level in the Bay of Bengal. Which signed integer represents its depth relative to sea level?',
    options: ['+75 m', '-75 m', '0 m', '75/0 m'],
    correctIndex: 1,
    explanation: 'Sea level serves as the natural reference origin (0 m). Heights above sea level are represented by positive integers (+), while depths below sea level are represented by negative integers (-). Thus, 75 m below sea level is -75 m.',
    hints: [
      'Identify the reference datum: Sea level = 0 m.',
      'Moving downward below zero requires a negative sign (-).',
      '75 metres below 0 is represented as -75 m.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Drag Label (c6_math_013)
  {
    id: 'ch_math_003',
    nodeId: NODE_C6_MATH_013,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Place each integer onto its correct coordinate spot symmetrically distributed around origin 0:',
    dragItems: [
      { label: '-4', targetId: 'spot_left_4' },
      { label: '-1', targetId: 'spot_left_1' },
      { label: '0', targetId: 'spot_zero' },
      { label: '+3', targetId: 'spot_right_3' },
    ],
    correctMapping: {
      spot_left_4: '-4',
      spot_left_1: '-1',
      spot_zero: '0',
      spot_right_3: '+3',
    },
    explanation: 'On a horizontal number line, negative numbers lie to the left of zero with increasing distance as magnitude grows. Zero is the central origin, and positive integers lie to the right.',
    hints: [
      'Zero sits directly in the middle as the origin reference.',
      '-1 is one unit to the left of 0, while -4 is four units to the left of 0.',
      '+3 is three units to the right of zero.',
    ],
  },
  // 4. Foundation - Comparison (c6_math_014)
  {
    id: 'ch_math_004',
    nodeId: NODE_C6_MATH_014,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following inequality statements is TRUE?',
    options: ['-9 > -2', '-2 > -9', '-9 = 9', '0 < -5'],
    correctIndex: 1,
    explanation: 'On the standard number line, numbers positioned further to the right are always greater. Because -2 is to the right of -9 (closer to 0), -2 > -9.',
    hints: [
      'Golden rule: On the number line, Right is Greater, Left is Smaller.',
      '-2°C in Srinagar is warmer than -9°C in Drass.',
      'Therefore, -2 is greater than -9 (-2 > -9).',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation - Identification (c6_math_015)
  {
    id: 'ch_math_005',
    nodeId: NODE_C6_MATH_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following numbers is an INTEGER (Z)?',
    options: ['3/4', '-12', '4.5', '√2'],
    correctIndex: 1,
    explanation: 'The set of integers Z = {..., -3, -2, -1, 0, 1, 2, 3, ...} includes all whole numbers and their negative opposites. Fractions (3/4), decimals (4.5), and irrationals (√2) are not integers.',
    hints: [
      'Integers fall exactly on the evenly spaced discrete marks of a number line.',
      'Fractions and decimals lie in between integer marks.',
      '-12 is the negative of the whole number 12, so it is an integer.',
    ],
  },
  // 6. Foundation - Set Concept (c6_math_018)
  {
    id: 'ch_math_006',
    nodeId: NODE_C6_MATH_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following collections represents a mathematically WELL-DEFINED set?',
    options: [
      'The collection of all interesting science fiction novels in the library',
      'The collection of all tall trees in Himachal Pradesh',
      'The collection of all vowels in the English alphabet',
      'The collection of all delicious Indian sweets',
    ],
    correctIndex: 2,
    explanation: 'A mathematical set must be well-defined: there must be an objective rule to decide whether any given object belongs to the collection. "Interesting", "tall", and "delicious" are subjective opinions, whereas vowels {a, e, i, o, u} are strictly defined.',
    hints: [
      'Can everyone in the world agree 100% on membership without personal preference?',
      '"Delicious", "interesting", and "tall" depend on human opinion.',
      'The vowels {a, e, i, o, u} are unambiguous and rule-based.',
    ],
    misconceptionIndex: 3,
  },
  // 7. Standard - Application (c6_math_016)
  {
    id: 'ch_math_007',
    nodeId: NODE_C6_MATH_016,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An expedition bank account has a starting balance of ₹450. A research equipment payment of -₹700 occurs. What is the resulting account balance in rupees?',
    correctAnswer: -250,
    tolerance: 0,
    unit: '₹',
    explanation: '450 + (-700) = 450 - 700 = -250. The negative sign denotes that the account is overdrawn by ₹250.',
    hints: [
      'Start at +450 on the number line.',
      'Move 700 units to the left.',
      '450 - 700 = -250.',
    ],
  },
  // 8. Standard - Drag Sort Ordering (c6_math_014)
  {
    id: 'ch_math_008',
    nodeId: NODE_C6_MATH_014,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange these recorded winter temperatures in ASCENDING order (coldest to warmest / leftmost to rightmost on the number line):',
    sortItems: ['-14°C', '-4°C', '0°C', '+6°C'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Ascending order moves from lowest value to highest value (left to right along the number line): -14°C < -4°C < 0°C < +6°C.',
    hints: [
      'The coldest temperature is the most negative number (farthest left on the number line).',
      '-14 is colder than -4.',
      'Order: -14°C < -4°C < 0°C < +6°C.',
    ],
  },
  // 9. Standard - Subtraction as Additive Inverse (c6_math_016)
  {
    id: 'ch_math_009',
    nodeId: NODE_C6_MATH_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the exact value of (+5) - (-8)?',
    options: ['-3', '+3', '+13', '-13'],
    correctIndex: 2,
    explanation: 'Subtracting an integer is mathematically defined as adding its opposite (additive inverse): (+5) - (-8) = (+5) + (+8) = +13.',
    hints: [
      'Key axiom: a - (-b) = a + b.',
      'Convert subtraction of a negative into addition of a positive.',
      '5 + 8 = 13.',
    ],
    misconceptionIndex: 4,
  },
  // 10. Standard - Set Representation (c6_math_019)
  {
    id: 'ch_math_010',
    nodeId: NODE_C6_MATH_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What is the roster representation of the set of all letters in the word "MATHEMATICS"?',
    options: [
      '{M, A, T, H, E, M, A, T, I, C, S}',
      '{M, A, T, H, E, I, C, S}',
      'M, A, T, H, E, I, C, S',
      '{x : x is a letter in MATH}',
    ],
    correctIndex: 1,
    explanation: 'In set roster notation, elements are enclosed within curly braces { } separated by commas, and duplicate elements are listed only once. The 8 unique letters in MATHEMATICS are {M, A, T, H, E, I, C, S}.',
    hints: [
      'A set requires curly braces { } and comma separation.',
      'No element is repeated inside a set.',
      'The letters M, A, and T appear twice in the word, so include each only once.',
    ],
    misconceptionIndex: 5,
  },
  // 11. Standard - Set Classification (c6_math_020)
  {
    id: 'ch_math_011',
    nodeId: NODE_C6_MATH_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Classify the set E = {x : x is an odd natural number divisible by 2}.',
    options: [
      'Finite set with 1 element {0}',
      'Infinite set',
      'Empty (Null) set denoted by ∅ or { }',
      'Universal set',
    ],
    correctIndex: 2,
    explanation: 'Odd natural numbers are {1, 3, 5, 7, ...}. By definition, no odd number is divisible by 2 without a remainder. Therefore, set E contains 0 elements, making it an empty (null) set ∅.',
    hints: [
      'List sample odd natural numbers: 1, 3, 5, 7, 9...',
      'Can any of these be divided evenly by 2?',
      'Since no number meets the condition, the set is Empty (∅).',
    ],
  },
  // 12. Standard - Integer Comparison with Zero (c6_math_017)
  {
    id: 'ch_math_012',
    nodeId: NODE_C6_MATH_017,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is 0 strictly greater than any negative integer (for example, 0 > -100)?',
    options: [
      'Because zero has no physical size while negative numbers have negative size',
      'Because 0 lies to the right of all negative integers on the number line',
      'Because 100 is larger than 0',
      'This statement is only true for temperatures in Celsius',
    ],
    correctIndex: 1,
    explanation: 'On the standard number line, value increases continuously from left to right. Since 0 is the origin and all negative integers are positioned to its left, 0 is strictly greater than every negative integer.',
    hints: [
      'Recall the spatial layout of the number line.',
      'All negative integers extend leftward from 0.',
      'Any position to the right represents a greater value.',
    ],
  },
  // 13. Advanced - Division by Zero Rule (c6_math_011)
  {
    id: 'ch_math_013',
    nodeId: NODE_C6_MATH_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is 12 ÷ 0 mathematically "not defined" rather than equal to 0 or infinity in arithmetic?',
    options: [
      'Because infinity is too large to write in standard notation',
      'Because division is the inverse of multiplication: there is no number k such that k × 0 = 12',
      'Because dividing by 0 always produces 0',
      'Because zero cancels all mathematical expressions',
    ],
    correctIndex: 1,
    explanation: 'Division a ÷ b = k means finding a number k such that k × b = a. For 12 ÷ 0 = k, we require k × 0 = 12. However, for any real number k, k × 0 = 0. It is impossible to equal 12, so 12 ÷ 0 has no solution and is strictly "not defined".',
    hints: [
      'Think of division as reverse multiplication.',
      'What number times 0 equals 12?',
      'Since k × 0 is always 0, no such number k exists.',
    ],
    misconceptionIndex: 6,
  },
  // 14. Advanced - Multi-Step Elevation Application (c6_math_016)
  {
    id: 'ch_math_014',
    nodeId: NODE_C6_MATH_016,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A weather drone starts at an altitude of +120 m, drops 180 m into a valley, and then ascends 45 m. What is its final altitude relative to ground zero?',
    correctAnswer: -15,
    tolerance: 0,
    unit: 'm',
    explanation: '(+120) + (-180) + (+45) = (120 - 180) + 45 = -60 + 45 = -15 m (15 m below ground zero).',
    hints: [
      'Write the expression: 120 - 180 + 45.',
      'First calculate: 120 - 180 = -60.',
      'Then calculate: -60 + 45 = -15 m.',
    ],
  },
  // 15. Advanced - Construct Set-Builder Notation (c6_math_019)
  {
    id: 'ch_math_015',
    nodeId: NODE_C6_MATH_019,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the precise Set-Builder representation for the set of prime numbers less than 10: {2, 3, 5, 7}',
    availableParts: ['{', 'x', ':', 'x is a prime number', '< 10', 'and x', '}'],
    targetState: '{ x : x is a prime number and x < 10 }',
    validationHint: 'Assemble the tokens into proper set-builder notation format: { x : property }',
    explanation: 'Set-builder notation specifies the general element variable, the colon separator ("such that"), and the defining condition: { x : x is a prime number and x < 10 }.',
    hints: [
      'Begin with opening brace { and variable x.',
      'Insert the colon : separator.',
      'Add the prime property, the conjunction and x, the inequality < 10, and close with }.',
    ],
  },
  // 16. Advanced - Cardinality & Finite vs Infinite (c6_math_020)
  {
    id: 'ch_math_016',
    nodeId: NODE_C6_MATH_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which of the following statements about set cardinality is TRUE?',
    options: [
      'The set {0} is an empty set with cardinality 0',
      'The set {0} is a finite set with cardinality 1',
      'The set of all grains of sand on Goa beach is infinite because it is very large',
      'The set of whole numbers W = {0, 1, 2, 3, ...} has cardinality 1,000,000',
    ],
    correctIndex: 1,
    explanation: '{0} contains one distinct element (the integer 0), so its cardinality n({0}) = 1. An empty set contains no elements { } or ∅. Sand grains on a beach are finite (countable in principle), whereas whole numbers W continue infinitely.',
    hints: [
      'Does {0} contain an element inside the braces?',
      'Yes, the number 0 is an element. Thus cardinality = 1.',
      'Large finite numbers are still finite; infinite sets continue without end.',
    ],
    misconceptionIndex: 7,
  },
  // 17. Advanced - Multi-operation Integer Evaluation (c6_math_016)
  {
    id: 'ch_math_017',
    nodeId: NODE_C6_MATH_016,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Evaluate the integer expression: (-15) - (-20) + (-8) - (+7)',
    correctAnswer: -10,
    tolerance: 0,
    unit: '',
    explanation: 'Step 1: (-15) - (-20) = -15 + 20 = +5. Step 2: +5 + (-8) = -3. Step 3: -3 - (+7) = -3 - 7 = -10.',
    hints: [
      'Rewrite subtractions as addition of opposites: -15 + 20 + (-8) + (-7).',
      'Sum positive terms: 20. Sum negative terms: -15 - 8 - 7 = -30.',
      '20 + (-30) = -10.',
    ],
  },
  // 18. Advanced - Creative Set Modeling (c6_math_018)
  {
    id: 'ch_math_018',
    nodeId: NODE_C6_MATH_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'If Set A = {2, 2, 4, 4, 6, 8} and Set B = {8, 6, 4, 2}, evaluate the mathematical relationship between A and B.',
    options: [
      'Set A has 6 elements and Set B has 4 elements, so A ≠ B',
      'Set A and Set B are equal sets (A = B) because repetition and ordering do not change a set',
      'Set B is greater because it starts with 8',
      'Set A is invalid mathematical syntax',
    ],
    correctIndex: 1,
    explanation: 'In set theory, duplicates are ignored and element order does not matter. Set A simplifies to {2, 4, 6, 8} and Set B is {2, 4, 6, 8}. Because both contain identical distinct elements, A = B.',
    hints: [
      'Do repeated elements add new unique members to a set?',
      'No, {2, 2, 4, 4, 6, 8} contains only 4 distinct numbers: 2, 4, 6, 8.',
      'Since both sets have identical unique members, A = B.',
    ],
  },
  // 19. Advanced - Real-world Weather Analysis (c6_math_017)
  {
    id: 'ch_math_019',
    nodeId: NODE_C6_MATH_017,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Order the four Indian stations from LOWEST (coldest) to HIGHEST (warmest) recorded winter temperature:',
    sortItems: ['Drass (-22°C)', 'Kargil (-15°C)', 'Shimla (-2°C)', 'Jaipur (+14°C)'],
    correctOrder: [0, 1, 2, 3],
    explanation: '-22 < -15 < -2 < +14. On the horizontal number line, -22 is farthest left, followed by -15, -2, and +14.',
    hints: [
      'Lowest temperature = most negative value (furthest to the left).',
      '-22 is colder than -15, which is colder than -2.',
      'Order: Drass (-22°C) < Kargil (-15°C) < Shimla (-2°C) < Jaipur (+14°C).',
    ],
  },
  // 20. Advanced - Set Membership Assertion (c6_math_018)
  {
    id: 'ch_math_020',
    nodeId: NODE_C6_MATH_018,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Let P = {x : x is a prime number between 10 and 20}. Which statement using ∈ (belongs to) and ∉ (does not belong to) is INCORRECT?',
    options: ['13 ∈ P', '15 ∉ P', '19 ∈ P', '11 ∉ P'],
    correctIndex: 3,
    explanation: 'The prime numbers strictly between 10 and 20 are 11, 13, 17, and 19. Therefore 11 ∈ P is true. The assertion "11 ∉ P" is false.',
    hints: [
      'List all elements of P: P = {11, 13, 17, 19}.',
      'Check if 11 is prime. Since 11 has only factors 1 and 11, 11 is in P.',
      'Therefore, stating 11 ∉ P is incorrect.',
    ],
  },
  // 21. Advanced - Absolute Value Distance (c6_math_013)
  {
    id: 'ch_math_021',
    nodeId: NODE_C6_MATH_013,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'What is the absolute geometric distance on the number line between coordinate -9 and coordinate +7?',
    correctAnswer: 16,
    tolerance: 0,
    unit: 'units',
    explanation: 'Distance = |(+7) - (-9)| = |7 + 9| = |16| = 16 units. From -9 to 0 is 9 units, and from 0 to +7 is 7 units: 9 + 7 = 16 units.',
    hints: [
      'Distance is always a non-negative quantity.',
      'Count steps from -9 to 0 (9 steps) and from 0 to +7 (7 steps).',
      '9 + 7 = 16.',
    ],
  },
  // 22. Advanced - Set Cardinality Computation (c6_math_020)
  {
    id: 'ch_math_022',
    nodeId: NODE_C6_MATH_020,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Find the cardinality n(S) of the set S = {x : x is a single-digit positive composite number}.',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'elements',
    explanation: 'Single-digit positive integers are {1, 2, 3, 4, 5, 6, 7, 8, 9}. 1 is neither prime nor composite. Primes are {2, 3, 5, 7}. Composite numbers with more than two factors are {4, 6, 8, 9}. The set S = {4, 6, 8, 9}, so n(S) = 4.',
    hints: [
      'List single-digit numbers: 1 to 9.',
      'Exclude 1 (neither) and primes {2, 3, 5, 7}.',
      'Composite numbers remaining: {4, 6, 8, 9}. Count = 4.',
    ],
  },
  // 23. Advanced - Subtraction Coordinate Modeling (c6_math_016)
  {
    id: 'ch_math_023',
    nodeId: NODE_C6_MATH_016,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Simplify the expression: -| -14 | + (-6) - (-25)',
    correctAnswer: 5,
    tolerance: 0,
    unit: '',
    explanation: '|-14| = 14, so -|-14| = -14. Expression becomes: -14 + (-6) - (-25) = -14 - 6 + 25 = -20 + 25 = +5.',
    hints: [
      'Calculate the absolute value: |-14| = 14, so -|-14| is -14.',
      'Expression: -14 - 6 + 25.',
      '-20 + 25 = 5.',
    ],
  },
  // 24. Advanced - Set Disjoint Analysis (c6_math_018)
  {
    id: 'ch_math_024',
    nodeId: NODE_C6_MATH_018,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Two sets A and B are called disjoint if they share no common elements (A ∩ B = ∅). Which pair represents disjoint sets?',
    options: [
      'A = {even integers}, B = {prime numbers}',
      'A = {negative integers}, B = {whole numbers}',
      'A = {factors of 12}, B = {multiples of 3}',
      'A = {vowels in "HIMALAYA"}, B = {consonants in "LADAKH"}',
    ],
    correctIndex: 1,
    explanation: 'Negative integers = {-1, -2, -3, ...} and whole numbers = {0, 1, 2, 3, ...}. These two sets have zero common elements (intersection is empty ∅), making them mutually disjoint. (Note: 2 is both even and prime, so the first pair is not disjoint).',
    hints: [
      'Check if any number can be simultaneously in both sets.',
      'Whole numbers are non-negative {0, 1, 2, ...}.',
      'Negative integers contain only negative values. They share nothing.',
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
  nodeId: 'c6_math_011',
  title: 'Visual Number Line, Integers & Set Theory',
  definition: 'The number line is a continuous geometric framework representing all positive whole numbers, zero origin, and negative integers. Sets are well-defined collections of distinct objects classified by roster form, set-builder form, and cardinality.',
  eli5: 'Imagine a long two-way road with 0 at the centre. Moving right means higher mountain heights, warm temperatures, and bank deposits (+). Moving left means deep submarine depths, freezing sub-zero cold, and withdrawals (-). Sets are labelled boxes where duplicates are never counted twice!',
  misconceptions: [
    { misconception: 'Adding 0 changes or clears a number', correction: 'Zero is the additive identity: adding 0 keeps the original number completely unchanged (a + 0 = a).' },
    { misconception: 'Negative numbers simply mean smaller quantities of positive values', correction: 'A negative number indicates an opposite direction from a chosen zero reference point.' },
    { misconception: '-8 is larger than -2 because 8 is larger than 2', correction: 'On the number line, numbers further to the left are smaller. Because -8 is further left than -2, -8 < -2.' },
    { misconception: 'Any list of items is a set, even if subjective like "best songs"', correction: 'A mathematical set must be well-defined so membership is unambiguous, objective, and testable.' },
    { misconception: 'Subtracting a negative makes a number smaller', correction: 'Subtracting an integer means adding its additive inverse: a - (-b) = a + b, which increases the value.' },
    { misconception: 'Repeating items in a set increases its size: {2, 2, 4} has 3 items', correction: 'Sets contain distinct elements only. {2, 2, 4} = {2, 4} with cardinality 2.' },
    { misconception: 'Division by zero equals infinity or zero', correction: 'Division by zero is strictly not defined because no number times zero can produce a non-zero dividend.' },
    { misconception: '{0} is the empty null set ∅', correction: '{0} contains one distinct element (the integer 0) with cardinality 1. The empty set has 0 elements ({ } or ∅).' },
  ],
  diagnosticQuestions: [
    { question: 'What is the additive identity for whole numbers?', options: ['1', '0', '-1', '10'], correctIndex: 1 },
    { question: 'Which signed integer represents 15 m below sea level?', options: ['+15 m', '0 m', '-15 m', '15/0 m'], correctIndex: 2 },
    { question: 'Which inequality is correct?', options: ['-7 > -3', '-3 > -7', '-7 = 7', '0 < -4'], correctIndex: 1 },
    { question: 'What is (+4) + (-9)?', options: ['+13', '-5', '+5', '-13'], correctIndex: 1 },
    { question: 'What is (+6) - (-4)?', options: ['+2', '-2', '+10', '-10'], correctIndex: 2 },
    { question: 'Which of the following is an empty set?', options: ['{0}', '{ }', '{∅}', '{1}'], correctIndex: 1 },
    { question: 'How many elements are in the set {A, B, B, C, C, C}?', options: ['6', '3', '1', '0'], correctIndex: 1 },
    { question: 'Why is 6 ÷ 0 not defined?', options: ['Because zero has no value', 'Because no number multiplied by 0 gives 6', 'Because the answer is infinity', 'It is defined as 0'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student can visually manipulate integer operations on the number line, compare and order signed integers, and represent, classify, and evaluate mathematical sets.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Interactive Number Line Origin & Frog Jumps',
    instruction: 'Drag the frog start slider and jump magnitude to observe integer addition (stepping right) and subtraction (stepping left) with dynamic visual arcs!',
    interactionType: 'slider-observe',
    nodeId: NODE_C6_MATH_011,
  },
  {
    title: '2. The Himalayan Thermometer & Submersible Depth Gauge',
    instruction: 'Toggle between Siachen Peak Altitude (+h) and Arabian Sea Trench Depth (-d) to visualize how reference zero divides physical reality.',
    interactionType: 'click-parts',
    nodeId: NODE_C6_MATH_012,
  },
  {
    title: '3. Integer Comparison & The "Right is Greater" Axiom',
    instruction: 'Adjust values A and B on the dual ruler to test geometric ordering and verify that rightward coordinates are strictly greater.',
    interactionType: 'drag-position',
    nodeId: NODE_C6_MATH_014,
  },
  {
    title: '4. Subtraction Laboratory: Adding the Additive Inverse',
    instruction: 'Toggle subtraction modes to observe how subtracting a negative integer reverses direction, turning into rightward addition!',
    interactionType: 'slider-observe',
    nodeId: NODE_C6_MATH_016,
  },
  {
    title: '5. The Set Theory Deduplication Chamber & Venn Visualizer',
    instruction: 'Add items and specimens to the Set Chamber to see automatic deduplication, roster notation brackets, and cardinality calculations.',
    interactionType: 'drag-classify',
    nodeId: NODE_C6_MATH_018,
  },
];

// ─── REAL WORLD EXPEDITION ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Indian Meteorological & Oceanographic Data Analyst Project',
  description: 'Track winter temperatures for 5 Indian stations (Leh, Drass, Shimla, Manali, Srinagar), map their elevations relative to sea level, and express their data as a well-defined mathematical set.',
  steps: [
    'Record winter night temperatures in °C (e.g., Leh: -12°C, Drass: -22°C, Shimla: -2°C, Srinagar: -5°C, Manali: -8°C)',
    'Plot and arrange all 5 stations in ascending order on a drawn number line with positive and negative arrows',
    'Calculate the net thermal rise from midnight to noon for two stations: (-22°C) to (+4°C) = net change of +26°C',
    'Express your dataset in Set Roster form T = {-22, -12, -8, -5, -2} and verify that cardinality n(T) = 5 (Finite Set)',
  ],
};

// ─── MAIN COMPONENT ───
function C6_MathematicsNumberLineSeeingSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'blue' };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── DISCOVERY STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── NUMBER LINE INTERACTIVE LAB STATE ───
  const [frogStart, setFrogStart] = useState<number>(2);
  const [frogJump, setFrogJump] = useState<number>(3);
  const [operationType, setOperationType] = useState<'add' | 'subtract'>('add');
  const [jumpSign, setJumpSign] = useState<'+' | '-'>('+');

  // ─── THERMOMETER & ALTITUDE LAB STATE ───
  const [elevationMode, setElevationMode] = useState<'mountain' | 'sea'>('mountain');
  const [altitudeValue, setAltitudeValue] = useState<number>(1500);

  // ─── COMPARISON LAB STATE ───
  const [compA, setCompA] = useState<number>(-5);
  const [compB, setCompB] = useState<number>(2);

  // ─── SETS INTERACTIVE CHAMBER STATE ───
  const [chamberItems, setChamberItems] = useState<string[]>(['Apple', 'Mango', 'Apple', 'Orange']);

  // ─── ADAPTIVE & SRS STATE ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── FEEDBACK & HINT STATE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── CHALLENGE INPUTS STATE ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── REFLECTION STATE ───
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explanation: '',
    realLife: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // ─── REFS ───
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── DERIVED VALUES ───
  const effectiveJump = useMemo(() => {
    const mag = Math.abs(frogJump);
    return jumpSign === '+' ? mag : -mag;
  }, [frogJump, jumpSign]);

  const frogLanding = useMemo(() => {
    if (operationType === 'add') {
      return frogStart + effectiveJump;
    } else {
      return frogStart - effectiveJump;
    }
  }, [frogStart, effectiveJump, operationType]);

  const distinctSetMembers = useMemo(() => {
    return Array.from(new Set(chamberItems));
  }, [chamberItems]);

  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION ───
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

  // ─── CANVAS WAVE & NUMBER LINE ANIMATION LOOP ───
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

      // Draw background grid
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const midY = canvas.height / 2;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(20, midY);
      ctx.lineTo(canvas.width - 20, midY);
      ctx.stroke();

      // Left arrow
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(20, midY);
      ctx.lineTo(30, midY - 6);
      ctx.lineTo(30, midY + 6);
      ctx.fill();

      // Right arrow
      ctx.beginPath();
      ctx.moveTo(canvas.width - 20, midY);
      ctx.lineTo(canvas.width - 30, midY - 6);
      ctx.lineTo(canvas.width - 30, midY + 6);
      ctx.fill();

      // Tick marks from -10 to +10
      const totalUnits = 20;
      const stepWidth = (canvas.width - 80) / totalUnits;
      const originX = 40 + 10 * stepWidth;

      for (let i = -10; i <= 10; i++) {
        const x = originX + i * stepWidth;
        const isZero = i === 0;
        ctx.strokeStyle = isZero ? '#f59e0b' : '#64748b';
        ctx.lineWidth = isZero ? 3 : 1.5;
        ctx.beginPath();
        ctx.moveTo(x, midY - (isZero ? 14 : 7));
        ctx.lineTo(x, midY + (isZero ? 14 : 7));
        ctx.stroke();

        ctx.fillStyle = isZero ? '#fbbf24' : i > 0 ? '#4ade80' : '#f87171';
        ctx.font = isZero ? 'bold 12px sans-serif' : '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(i > 0 ? `+${i}` : i.toString(), x, midY + 26);
      }

      // Frog jump arc
      const frogX = originX + frogStart * stepWidth;
      const landX = originX + Math.max(-10, Math.min(10, frogLanding)) * stepWidth;

      ctx.strokeStyle = '#c084fc';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(frogX, midY - 14);
      const controlX = (frogX + landX) / 2;
      const controlY = midY - 50 - Math.sin(frame * 0.05) * 6;
      ctx.quadraticCurveTo(controlX, controlY, landX, midY - 14);
      ctx.stroke();
      ctx.setLineDash([]);

      // Start Marker
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(frogX, midY - 14, 7, 0, Math.PI * 2);
      ctx.fill();

      // Landing Marker
      const pulseRadius = 7 + Math.sin(frame * 0.1) * 2;
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(landX, midY - 14, pulseRadius, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [frogStart, frogLanding]);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
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
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding prediction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the visual Number Line and Sets laboratory. Explore each interactive tool!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enjoy free exploration in the sandbox without any grading pressure!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for real-world mathematical challenges. You have got this!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Number Line, Integers, and Sets expedition!');
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

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
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Well done.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
          speechManager.speak('Let us study the complete step-by-step reasoning.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const base = prev.length > 0 ? prev : (challenge.sortItems || []).map((_, i) => i);
      const updated = [...base];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder =
      sortArrangement.length === (challenge.sortItems?.length || 0)
        ? sortArrangement
        : (challenge.sortItems || []).map((_, i) => i);
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleAddChamberItem = useCallback((item: string) => {
    setChamberItems((prev) => [...prev, item]);
    audioManager.play('pop');
  }, []);

  const handleRemoveChamberItem = useCallback((idx: number) => {
    setChamberItems((prev) => prev.filter((_, i) => i !== idx));
    audioManager.play('tap');
  }, []);

  const handleClearChamber = useCallback(() => {
    setChamberItems([]);
    audioManager.play('whoosh');
  }, []);

  const handleReflectionSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setReflectionSubmitted(true);
    audioManager.play('success');
    speechManager.speak('Thank you for reflecting on your learning journey!');
  }, []);

  // ─── CLEANUP ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: [0, -10, 10, 0] }}
            className="text-3xl p-2 bg-blue-900/40 border border-blue-600/50 rounded-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-blue-400 font-medium">Class 6 ICSE Mathematics • NEP 2020 Conceptual Mastery</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold border tracking-wider uppercase ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-600'
                : 'bg-indigo-950/60 text-indigo-400 border-indigo-600'
            }`}
          >
            {difficulty} Tier
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-mono border border-slate-700"
          >
            BKT Mastery: {masteryLevel}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 sm:p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-blue-950/40 rounded-2xl border border-indigo-800/60 shadow-lg"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Mission Briefing</span>
            <h2 className="text-xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-3 bg-indigo-900/30 p-3 rounded-xl border border-indigo-700/40">
              {SCENARIO.context}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
          >
            <div className="flex items-center gap-2 text-amber-400">
              <span className="text-xl">💡</span>
              <h3 className="font-bold text-sm uppercase tracking-wide">Discovery Challenge (Intuition Check)</h3>
            </div>
            <p className="text-white text-base font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-semibold border transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-50'
                      : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-blue-500'
                  }`}
                >
                  <span className="text-xs text-slate-400 mr-2 font-mono">[{String.fromCharCode(65 + i)}]</span>
                  {opt}
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                    <span className="ml-2 text-emerald-400 font-bold">✓ Correct</span>
                  )}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                    <span className="ml-2 text-rose-400 font-bold">✗</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Your intuition is ready for formal mathematics.' : `ℹ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Launch interactive exploration lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  Launch Interactive Lab →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── EXPLORE PHASE (Guided Brilliant.org Style) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Tracker */}
          <motion.div className="flex items-center justify-between px-2 text-xs font-semibold text-slate-400">
            <span>Exploration Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-blue-500' : idx < currentSlide ? 'w-2 bg-emerald-500' : 'w-2 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-5 sm:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-xs text-amber-400 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-blue-950 text-blue-300 rounded-lg font-mono border border-blue-800">
                  {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              {/* SLIDE 0: Dynamic Number Line Canvas & Controls */}
              {currentSlide === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-2">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
                    <canvas ref={canvasRef} width={700} height={130} className="w-full rounded-lg" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        Starting Position (a): <span className="text-pink-400 font-mono font-bold text-sm">{frogStart}</span>
                      </label>
                      <input
                        aria-label="Starting coordinate slider"
                        type="range"
                        min={-8}
                        max={8}
                        value={frogStart}
                        onChange={(e) => {
                          setFrogStart(parseInt(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-pink-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        Jump Magnitude (|b|): <span className="text-purple-400 font-mono font-bold text-sm">{frogJump}</span>
                      </label>
                      <input
                        aria-label="Jump magnitude slider"
                        type="range"
                        min={0}
                        max={8}
                        value={frogJump}
                        onChange={(e) => {
                          setFrogJump(parseInt(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-purple-500"
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <span className="text-xs font-semibold text-slate-400 mb-1">Operation & Direction</span>
                      <div className="flex gap-2">
                        <motion.button
                          aria-label="Toggle sign"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setJumpSign((s) => (s === '+' ? '-' : '+'));
                            audioManager.play('tap');
                          }}
                          className="px-3 py-1.5 bg-slate-800 border border-slate-700 hover:border-purple-500 rounded-lg text-xs font-mono font-bold text-purple-300"
                        >
                          Sign: {jumpSign}
                        </motion.button>
                        <motion.button
                          aria-label="Toggle addition or subtraction"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setOperationType((o) => (o === 'add' ? 'subtract' : 'add'));
                            audioManager.play('tap');
                          }}
                          className="px-3 py-1.5 bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-lg text-xs font-bold text-blue-300 uppercase"
                        >
                          {operationType}
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ scale: 0.98 }}
                    animate={{ scale: 1 }}
                    className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-xl flex items-center justify-between text-xs sm:text-sm"
                  >
                    <span className="text-slate-300">Live Mathematical Formula:</span>
                    <span className="font-mono font-bold text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
                      ({frogStart}) {operationType === 'add' ? '+' : '-'} ({jumpSign === '+' ? `+${frogJump}` : `-${frogJump}`}) ={' '}
                      <span className="text-emerald-400 font-extrabold">{frogLanding}</span>
                    </span>
                  </motion.div>
                </motion.div>
              )}

              {/* SLIDE 1: TOPIC-SPECIFIC SVG 1 — Himalayan Mountain vs Arabian Sea Trench */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-2">
                  <div className="flex gap-2 mb-2">
                    <motion.button
                      aria-label="View Himalayan Mountain Peak"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setElevationMode('mountain');
                        setAltitudeValue(1500);
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        elevationMode === 'mountain' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      🏔️ Himalayan Peak (+ Altitude)
                    </motion.button>
                    <motion.button
                      aria-label="View Deep Submersible Trench"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setElevationMode('sea');
                        setAltitudeValue(-300);
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        elevationMode === 'sea' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      🌊 Deep Trench (- Submersible Depth)
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex flex-col justify-center space-y-3">
                      <label className="text-xs font-semibold text-slate-400">
                        {elevationMode === 'mountain' ? 'Elevation Slider (+h metres):' : 'Depth Below Sea Level (-d metres):'}
                      </label>
                      <input
                        aria-label="Elevation depth slider"
                        type="range"
                        min={elevationMode === 'mountain' ? 0 : -500}
                        max={elevationMode === 'mountain' ? 3000 : 0}
                        step={25}
                        value={altitudeValue}
                        onChange={(e) => {
                          setAltitudeValue(parseInt(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-cyan-500"
                      />
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-sm space-y-1">
                        <p className="text-slate-400 text-xs">Reference Origin:</p>
                        <p className="text-amber-400 font-bold">Sea Level Datum = 0 m</p>
                        <p className="text-slate-300">
                          Signed Position:{' '}
                          <span className={altitudeValue >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                            {altitudeValue >= 0 ? `+${altitudeValue} m` : `${altitudeValue} m`}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* SVG DIAGRAM 1: Elevation & Submersible Real-time Visualizer */}
                    <div className="flex items-center justify-center p-4 bg-slate-900/80 rounded-xl border border-slate-800 relative min-h-[190px]">
                      <svg viewBox="0 0 280 180" className="w-full h-full max-w-[260px]">
                        <defs>
                          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
                          </linearGradient>
                          <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0369a1" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#082f49" stopOpacity="0.95" />
                          </linearGradient>
                        </defs>
                        {/* Atmosphere */}
                        <rect x="0" y="0" width="280" height="90" fill="url(#skyGrad)" />
                        {/* Mountain contour */}
                        <polygon points="30,90 90,20 150,90" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                        <polygon points="75,38 90,20 105,38" fill="#f8fafc" />
                        {/* Ocean Trench */}
                        <rect x="0" y="90" width="280" height="90" fill="url(#seaGrad)" />
                        {/* Sea floor contour */}
                        <path d="M 0 170 Q 140 180 280 165 L 280 180 L 0 180 Z" fill="#0f172a" />
                        {/* Zero Sea Level Datum Line */}
                        <line x1="10" y1="90" x2="270" y2="90" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5 3" />
                        <text x="140" y="86" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontWeight="bold">
                          ORIGIN ZERO (Sea Level 0 m)
                        </text>
                        {/* Scale ticks */}
                        <text x="260" y="30" textAnchor="end" fill="#94a3b8" fontSize="8">+2500m</text>
                        <text x="260" y="150" textAnchor="end" fill="#94a3b8" fontSize="8">-400m</text>
                        {/* Dynamic Probe Marker */}
                        {altitudeValue >= 0 ? (
                          <g transform={`translate(140, ${Math.max(18, 90 - (altitudeValue / 3000) * 70)})`}>
                            <circle cx="0" cy="0" r="10" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                            <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0f172a">
                              🏔️
                            </text>
                            <text x="14" y="3" fontSize="8" fill="#fbbf24" fontWeight="bold">
                              +{altitudeValue}m
                            </text>
                          </g>
                        ) : (
                          <g transform={`translate(140, ${Math.min(165, 90 - (altitudeValue / 500) * 65)})`}>
                            <circle cx="0" cy="0" r="10" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                            <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0f172a">
                              🚢
                            </text>
                            <text x="14" y="3" fontSize="8" fill="#38bdf8" fontWeight="bold">
                              {altitudeValue}m
                            </text>
                          </g>
                        )}
                      </svg>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SLIDE 2: TOPIC-SPECIFIC SVG 2 — Dual Coordinate Comparison Ruler */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        First Integer (Coordinate A): <span className="text-blue-400 font-mono font-bold">{compA}</span>
                      </label>
                      <input
                        aria-label="First integer coordinate slider"
                        type="range"
                        min={-10}
                        max={10}
                        value={compA}
                        onChange={(e) => {
                          setCompA(parseInt(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">
                        Second Integer (Coordinate B): <span className="text-emerald-400 font-mono font-bold">{compB}</span>
                      </label>
                      <input
                        aria-label="Second integer coordinate slider"
                        type="range"
                        min={-10}
                        max={10}
                        value={compB}
                        onChange={(e) => {
                          setCompB(parseInt(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                  </div>

                  {/* SVG DIAGRAM 2: Dynamic Comparison Dual Ruler */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 100" className="w-full h-auto">
                      <rect x="10" y="10" width="480" height="80" rx="8" fill="#090d16" stroke="#1e293b" />
                      {/* Axis */}
                      <line x1="30" y1="50" x2="470" y2="50" stroke="#475569" strokeWidth="2.5" />
                      {/* Markers */}
                      {Array.from({ length: 21 }, (_, idx) => {
                        const val = idx - 10;
                        const x = 40 + idx * 21;
                        const isOrigin = val === 0;
                        return (
                          <g key={val}>
                            <line
                              x1={x}
                              y1={isOrigin ? 36 : 42}
                              x2={x}
                              y2={isOrigin ? 64 : 58}
                              stroke={isOrigin ? '#f59e0b' : '#334155'}
                              strokeWidth={isOrigin ? 3 : 1.5}
                            />
                            <text
                              x={x}
                              y={76}
                              textAnchor="middle"
                              fontSize="8"
                              fill={isOrigin ? '#fbbf24' : '#64748b'}
                              fontWeight={isOrigin ? 'bold' : 'normal'}
                            >
                              {val}
                            </text>
                          </g>
                        );
                      })}
                      {/* Position Marker A */}
                      <g transform={`translate(${40 + (compA + 10) * 21}, 35)`}>
                        <polygon points="0,0 -5,-10 5,-10" fill="#3b82f6" />
                        <circle cx="0" cy="-14" r="7" fill="#3b82f6" />
                        <text x="0" y="-11" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                          A
                        </text>
                      </g>
                      {/* Position Marker B */}
                      <g transform={`translate(${40 + (compB + 10) * 21}, 35)`}>
                        <polygon points="0,0 -5,-10 5,-10" fill="#10b981" />
                        <circle cx="0" cy="-14" r="7" fill="#10b981" />
                        <text x="0" y="-11" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                          B
                        </text>
                      </g>
                    </svg>
                  </div>

                  <motion.div
                    initial={{ scale: 0.98 }}
                    animate={{ scale: 1 }}
                    className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-xl border border-slate-800 text-center space-y-2"
                  >
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Inequality Evaluation</span>
                    <div className="text-2xl sm:text-3xl font-mono font-black text-white">
                      <span className="text-blue-400">{compA}</span>{' '}
                      <span className="text-amber-400 px-3 py-1 bg-slate-800 rounded-xl border border-slate-700">
                        {compA > compB ? '>' : compA < compB ? '<' : '='}
                      </span>{' '}
                      <span className="text-emerald-400">{compB}</span>
                    </div>
                    <p className="text-xs text-slate-400 pt-1">
                      {compA > compB
                        ? `✓ ${compA} is strictly greater because it lies to the RIGHT of ${compB} on the number line.`
                        : compA < compB
                        ? `✓ ${compA} is strictly smaller because it lies to the LEFT of ${compB} on the number line.`
                        : `✓ Both values occupy the exact same coordinate on the number line.`}
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {/* SLIDE 3: Subtraction as Additive Inverse Axiom */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-xs text-slate-300 font-medium">
                      Fundamental Axiom:{' '}
                      <span className="text-amber-400 font-mono font-bold">a - b = a + (-b)</span> (Subtracting equals adding the opposite).
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-xs text-slate-500 block">Original Subtraction Expression:</span>
                        <span className="font-mono text-base font-bold text-white">(+4) - (-6)</span>
                      </div>
                      <div className="p-3 bg-emerald-950/40 rounded-lg border border-emerald-800">
                        <span className="text-xs text-emerald-400 block">Converted into Additive Inverse:</span>
                        <span className="font-mono text-base font-bold text-emerald-300">(+4) + (+6) = +10</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SLIDE 4: TOPIC-SPECIFIC SVG 3 — Venn Diagram & Set Theory Visualizer */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs text-slate-400 self-center mr-2 font-bold">Add specimen to set:</span>
                      {['Apple', 'Banana', 'Mango', 'Orange', 'Apple'].map((fruit, idx) => (
                        <motion.button
                          key={idx}
                          aria-label={`Add ${fruit} to set`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddChamberItem(fruit)}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-semibold text-slate-200"
                        >
                          + {fruit}
                        </motion.button>
                      ))}
                      <motion.button
                        aria-label="Clear all specimens"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClearChamber}
                        className="px-3 py-1 bg-rose-950 hover:bg-rose-900 border border-rose-800 rounded-lg text-xs font-semibold text-rose-300 ml-auto"
                      >
                        Clear Set
                      </motion.button>
                    </div>

                    {/* SVG DIAGRAM 3: Venn Chamber & Deduplication Visualizer */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center gap-4">
                      <div className="w-full md:w-1/2 flex justify-center">
                        <svg viewBox="0 0 240 150" className="w-full max-w-[220px]">
                          {/* Outer Universal Box */}
                          <rect x="5" y="5" width="230" height="140" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                          <text x="18" y="24" fill="#94a3b8" fontSize="10" fontWeight="bold">Universal ξ</text>
                          {/* Venn Circle for Set S */}
                          <circle cx="120" cy="80" r="50" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2.5" fillOpacity="0.7" />
                          <text x="120" y="46" textAnchor="middle" fill="#a5b4fc" fontSize="10" fontWeight="bold">
                            Set S
                          </text>
                          {/* Dynamic Members inside Venn */}
                          {distinctSetMembers.slice(0, 4).map((item, idx) => {
                            const angles = [0, 90, 180, 270];
                            const rad = (angles[idx] * Math.PI) / 180;
                            const cx = 120 + Math.cos(rad) * 22;
                            const cy = 82 + Math.sin(rad) * 22;
                            return (
                              <g key={item}>
                                <circle cx={cx} cy={cy} r="10" fill="#4338ca" stroke="#818cf8" strokeWidth="1" />
                                <text x={cx} y={cy + 3} textAnchor="middle" fontSize="7" fill="#ffffff" fontWeight="bold">
                                  {item.slice(0, 3)}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>

                      <div className="w-full md:w-1/2 space-y-2 font-mono text-xs">
                        <div className="text-slate-400">Raw Chamber Items: {chamberItems.length}</div>
                        <div className="flex flex-wrap gap-1">
                          {chamberItems.map((item, i) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-xs flex items-center gap-1">
                              {item}
                              <button
                                aria-label={`Remove ${item}`}
                                onClick={() => handleRemoveChamberItem(i)}
                                className="text-rose-400 hover:text-rose-300"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                        <p className="text-blue-300 pt-1">
                          Roster Form S = {'{'}{distinctSetMembers.join(', ')}{'}'}
                        </p>
                        <p className="text-emerald-400 font-bold">
                          Cardinality n(S) = {distinctSetMembers.length}{' '}
                          <span className="text-slate-500 font-sans text-xs">(Duplicates eliminated)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Navigate to previous exploration lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-sm font-semibold rounded-xl border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Navigate to next exploration lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Open free sandbox mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Open Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── SANDBOX PHASE (Pressure-Free Experimentation) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">🎮 Free Exploration Sandbox</h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero pressure, zero timers. Test integer jumps, coordinates, and set groupings freely!
              </p>
            </div>
            <motion.button
              aria-label="Advance to graded challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 whitespace-nowrap"
            >
              Ready for Graded Challenges! 🎯
            </motion.button>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <canvas ref={canvasRef} width={700} height={130} className="w-full rounded-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-semibold">Move Start Slider: {frogStart}</label>
                <input
                  aria-label="Sandbox start slider"
                  type="range"
                  min={-10}
                  max={10}
                  value={frogStart}
                  onChange={(e) => {
                    setFrogStart(parseInt(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-semibold">Move Jump Distance: {frogJump}</label>
                <input
                  aria-label="Sandbox jump slider"
                  type="range"
                  min={0}
                  max={10}
                  value={frogJump}
                  onChange={(e) => {
                    setFrogJump(parseInt(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-mono text-blue-400">
                CHALLENGE {currentChallenge + 1} OF {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {challenge.nodeId}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 uppercase tracking-wider font-bold">
                  NEP Level: {challenge.competencyLevel}
                </span>
              </div>
            </div>

            <div className="w-full sm:w-48 h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="text-xs text-indigo-300 mt-1">
            📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
          </div>

          {/* Question Box */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">{challenge.question}</p>

            {/* MCQ Types */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-sm font-semibold border transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-blue-500'
                      }`}
                    >
                      <span className="text-xs text-slate-400 font-mono mr-3">[{String.fromCharCode(65 + i)}]</span>
                      {opt}
                      {showExplanation && i === challenge.correctIndex && (
                        <span className="ml-2 text-emerald-400 font-bold">✓ Correct</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Enter numerical answer"
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    disabled={showExplanation}
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-blue-500 outline-none w-48"
                  />
                  {challenge.unit && <span className="text-slate-400 font-semibold">{challenge.unit}</span>}
                  <motion.button
                    aria-label="Submit numeric answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold rounded-xl shadow-md"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* Drag Sort Ordering */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400 mb-2">Drag cards to arrange in correct order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-sm font-semibold flex items-center justify-between cursor-grab"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-950 border border-blue-700 text-blue-300 text-xs flex items-center justify-center font-mono">
                          {displayIdx + 1}
                        </span>
                        {item}
                      </span>
                      <span className="text-slate-500 text-xs">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  aria-label="Confirm sorted order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-3 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                >
                  Confirm Sequence
                </motion.button>
              </div>
            )}

            {/* Drag Label */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Available Markers:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      aria-label={`Draggable label ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-mono text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'spot_left_4', name: '4 Units Left (-4)' },
                    { id: 'spot_left_1', name: '1 Unit Left (-1)' },
                    { id: 'spot_zero', name: 'Center Origin (0)' },
                    { id: 'spot_right_3', name: '3 Units Right (+3)' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl text-center space-y-1"
                    >
                      <span className="text-xs text-slate-500 block">{target.name}</span>
                      <span className="font-mono text-base font-bold text-amber-400">
                        {droppedLabels[target.id] || '[Drop Here]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check coordinate placements"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                >
                  Check Coordinates
                </motion.button>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add token ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setConstructParts((prev) => [...prev, part]);
                        audioManager.play('pop');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-mono font-bold text-blue-300"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 font-mono text-sm text-amber-400">
                    {constructParts.map((p, idx) => (
                      <span key={idx} className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {p}
                      </span>
                    ))}
                    {constructParts.length === 0 && <span className="text-slate-600 text-xs">Tap parts to assemble expression...</span>}
                  </div>
                  {constructParts.length > 0 && (
                    <motion.button
                      aria-label="Clear constructed formula"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts([])}
                      className="text-xs text-rose-400 hover:text-rose-300"
                    >
                      Clear
                    </motion.button>
                  )}
                </div>

                <motion.button
                  aria-label="Verify constructed set syntax"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                >
                  Verify Constructed Set
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Progressive Explanation Disclosure Card */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-2xl border border-indigo-800/80 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  📖 Complete Step-by-Step Mathematical Explanation
                </span>
                <span className="text-xs text-slate-400">
                  Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(Boolean).length}
                </span>
              </div>

              <div className="space-y-2">
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-slate-200 text-sm leading-relaxed"
                    >
                      <span className="text-indigo-400 font-bold font-mono mr-2">{idx + 1}.</span>
                      {sentence.endsWith('.') ? sentence : `${sentence}.`}
                    </motion.p>
                  ))}
              </div>

              <div className="pt-2 flex justify-between items-center">
                {revealedSteps < challenge.explanation.split('. ').filter(Boolean).length - 1 ? (
                  <motion.button
                    aria-label="Reveal next reasoning step"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-2 bg-indigo-900/60 hover:bg-indigo-900 text-indigo-200 border border-indigo-700 text-xs font-bold rounded-xl"
                  >
                    Reveal Next Step →
                  </motion.button>
                ) : (
                  <div />
                )}

                {revealedSteps >= challenge.explanation.split('. ').filter(Boolean).length - 1 && (
                  <motion.button
                    aria-label="Advance to next challenge"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Expedition →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── COMPLETION & REFLECTION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-emerald-950/40 rounded-3xl border border-emerald-600/50 space-y-3"
          >
            <motion.span
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
              className="text-5xl inline-block"
            >
              ����
            </motion.span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Expedition Successfully Completed!</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              You have mastered visual number line arithmetic, negative integers, sea-level datums, and mathematical set classifications.
            </p>
            <div className="flex justify-center gap-4 pt-3">
              <motion.div whileHover={{ scale: 1.05 }} className="bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-xl font-mono font-black text-emerald-400">{Math.max(0, 100 - errors * 4)}%</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Mastery Level</span>
                <span className="text-xl font-mono font-black text-blue-400 capitalize">{masteryLevel}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Motivational Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-emerald-950/40 border border-emerald-800 rounded-2xl text-emerald-200 text-sm leading-relaxed"
          >
            {errors === 0
              ? '🌟 Flawless Mastery! You solved all integer operations and set classifications with 100% precision.'
              : errors <= 3
              ? '👍 Excellent performance! You have built solid intuition for both positive and negative axes.'
              : '💪 Good effort! Learning negative numbers and sets requires deliberate practice. Review your misconceptions below to reinforce mastery.'}
          </motion.div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-rose-950/40 border border-rose-800 rounded-2xl space-y-3"
            >
              <h3 className="text-rose-300 font-bold text-sm uppercase tracking-wider">
                🎯 Target Misconception Review Profile
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Mathematical Truth: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Spaced Repetition Notification */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-amber-950/30 border border-amber-800 rounded-2xl text-xs sm:text-sm text-amber-200 flex items-center justify-between"
          >
            <div>
              <span className="font-bold block">🔁 Spaced Repetition Schedule (SM-2 Algorithm)</span>
              <span className="text-slate-400">
                Next automated review recommended in{' '}
                <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
              </span>
            </div>
            <span className="text-2xl">📅</span>
          </motion.div>

          {/* Real-World Activity */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
          >
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🧭</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-blue-400 font-bold font-mono">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ─── REFLECTION SECTION ─── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-blue-900/60 space-y-4"
          >
            <div className="flex items-center gap-2 text-blue-400">
              <span className="text-xl">🤔</span>
              <h3 className="text-base font-bold text-white">Reflective Synthesis & Metacognition</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthesizing concepts in your own words creates durable long-term neural connections.
            </p>

            {!reflectionSubmitted ? (
              <form onSubmit={handleReflectionSubmit} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    1. What was the most surprising thing you learned about integers or sets?
                  </label>
                  <textarea
                    aria-label="Reflection question 1"
                    rows={2}
                    value={reflectionAnswers.surprising}
                    onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, surprising: e.target.value })}
                    placeholder="E.g., Subtracting a negative integer actually moves to the right and increases value..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-blue-500 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    2. How would you explain negative integers and reference zero to a friend?
                  </label>
                  <textarea
                    aria-label="Reflection question 2"
                    rows={2}
                    value={reflectionAnswers.explanation}
                    onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, explanation: e.target.value })}
                    placeholder="E.g., Zero is sea level or freezing point; negative is stepping opposite from the zero mark..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-blue-500 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    3. Where in real life (outside of school) might you use number lines or sets?
                  </label>
                  <textarea
                    aria-label="Reflection question 3"
                    rows={2}
                    value={reflectionAnswers.realLife}
                    onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, realLife: e.target.value })}
                    placeholder="E.g., Bank account balances, elevator basements, flight altitudes, organizing unique music playlists..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-blue-500 outline-none"
                    required
                  />
                </div>

                <motion.button
                  aria-label="Submit reflections"
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30"
                >
                  Submit Reflections ✓
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-emerald-950/60 border border-emerald-700 rounded-xl space-y-2 text-xs"
              >
                <p className="text-emerald-300 font-bold">✓ Reflection recorded in your expedition logbook!</p>
                <p className="text-slate-300">
                  Your ability to contextualize mathematical concepts demonstrates true conceptual mastery.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── SIM FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C6_MathematicsNumberLineSeeingSim;
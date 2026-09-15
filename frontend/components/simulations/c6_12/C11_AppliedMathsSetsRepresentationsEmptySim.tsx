'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { LineChart, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line } from 'recharts';

// Node IDs as string literals
const NODE_C11_APPMATH_001 = 'c11_appmath_001';
const NODE_C11_APPMATH_002 = 'c11_appmath_002';
const NODE_C11_APPMATH_003 = 'c11_appmath_003';
const NODE_C11_APPMATH_004 = 'c11_appmath_004';
const NODE_C11_APPMATH_005 = 'c11_appmath_005';
const NODE_C11_APPMATH_006 = 'c11_appmath_006';
const NODE_C11_APPMATH_007 = 'c11_appmath_007';
const NODE_C11_APPMATH_008 = 'c11_appmath_008';
const NODE_C11_APPMATH_009 = 'c11_appmath_009';
const NODE_C11_APPMATH_010 = 'c11_appmath_010';

const ALL_NODE_IDS = [
  NODE_C11_APPMATH_001,
  NODE_C11_APPMATH_002,
  NODE_C11_APPMATH_003,
  NODE_C11_APPMATH_004,
  NODE_C11_APPMATH_005,
  NODE_C11_APPMATH_006,
  NODE_C11_APPMATH_007,
  NODE_C11_APPMATH_008,
  NODE_C11_APPMATH_009,
  NODE_C11_APPMATH_010,
];

// Narrative Scenario
const SCENARIO = {
  title: 'Data Flow & Market Mapping in Bengaluru',
  intro: 'You are an analytics consultant for a rapid-delivery logistics network in Bengaluru. To allocate riders, track product catalogs, compute tiered tariff bills, and filter customer preferences, you must build robust mathematical models using sets, relations, intervals, and real-valued functions.',
  context: 'From filtering empty item queries in warehouse databases to charting non-linear delivery fees f(x), your set and function mechanics determine logistics efficiency across the metro.',
};

// Discovery Question
const DISCOVERY_QUESTION = {
  question: 'An inventory query searches for all delivery hubs inside Bengaluru with Atlantic Ocean coastline. What mathematical set describes this search result?',
  options: [
    'The set {0} containing a zero identifier',
    'The empty set ∅ (no elements at all)',
    'An infinite set with unbounded capacity',
    'A universal set U containing all metro hubs'
  ],
  correctIndex: 1,
  hintAfter: 'Let us see why ∅ (empty set) is completely distinct from the singleton set {0} and how set models structure logic!',
};

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

const CHALLENGES: Challenge[] = [
  // Foundation 1
  {
    id: 'ch_set_001',
    nodeId: NODE_C11_APPMATH_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following correctly denotes an empty set containing no elements?',
    options: ['{0}', '∅ or { }', '{∅}', '{null}'],
    correctIndex: 1,
    explanation: 'The empty set has zero elements and is written as ∅ or { }. In contrast, {0} contains the number 0, and {∅} contains the empty set as an element.',
    hints: [
      'Think about whether the number zero is the same as the absence of elements.',
      'A set with one item is a singleton, not empty.',
      'The symbol ∅ or empty curly braces { } represent the empty set.'
    ],
    misconceptionIndex: 0,
  },
  // Foundation 2: Drag Label on Set Diagram
  {
    id: 'ch_set_002',
    nodeId: NODE_C11_APPMATH_004,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each set operation label to its corresponding Venn diagram region.',
    dragItems: [
      { label: 'A − B (Only A)', targetId: 'reg_left' },
      { label: 'A ∩ B (Both)', targetId: 'reg_mid' },
      { label: 'B − A (Only B)', targetId: 'reg_right' },
      { label: "(A ∪ B)' (Neither)", targetId: 'reg_out' },
    ],
    correctMapping: {
      reg_left: 'A − B (Only A)',
      reg_mid: 'A ∩ B (Both)',
      reg_right: 'B − A (Only B)',
      reg_out: "(A ∪ B)' (Neither)",
    },
    explanation: 'The left crescent represents elements exclusive to A (A − B), the middle lens is the intersection (A ∩ B), the right crescent is exclusive to B (B − A), and the exterior rectangle area is the complement of the union.',
    hints: [
      'The overlapping central lens contains items shared by both sets.',
      'The left wing represents items in A but not in B.',
      'The region outside both circles within the universal box is the complement of their union.'
    ],
    misconceptionIndex: 2,
  },
  // Foundation 3: Numeric
  {
    id: 'ch_set_003',
    nodeId: NODE_C11_APPMATH_006,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Hub A has 4 delivery vans and Hub B has 5 drivers. How many distinct ordered pairs (van, driver) exist in the Cartesian product A × B?',
    correctAnswer: 20,
    tolerance: 0,
    unit: 'pairs',
    explanation: 'By the multiplication principle for Cartesian products, n(A × B) = n(A) × n(B) = 4 × 5 = 20 distinct pairings.',
    hints: [
      'Do not add the numbers; each item from A pairs with every item from B.',
      'Multiply the cardinality of set A by the cardinality of set B.',
      '4 multiplied by 5 equals 20.'
    ],
    misconceptionIndex: 1,
  },
  // Foundation 4
  {
    id: 'ch_set_004',
    nodeId: NODE_C11_APPMATH_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which interval notation strictly represents the real numbers x such that −2 ≤ x < 5?',
    options: ['(−2, 5)', '[−2, 5]', '[−2, 5)', '(−2, 5]'],
    correctIndex: 2,
    explanation: 'A square bracket [ includes the endpoint (≤ or ≥), while a round parenthesis ) excludes it (< or >). Hence −2 ≤ x < 5 translates to [−2, 5).',
    hints: [
      'Look at the inequality signs at both ends.',
      'Less than or equal to (≤) requires a square bracket [.',
      'Strict less than (<) requires a round parenthesis ).'
    ],
    misconceptionIndex: 1,
  },
  // Foundation 5: Drag Sort
  {
    id: 'ch_set_005',
    nodeId: NODE_C11_APPMATH_002,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'Arrange the subsets of set S = {1, 2} in increasing order of cardinality (number of elements).',
    sortItems: [
      'The empty set ∅',
      'Singletons {1} and {2}',
      'The full improper subset {1, 2}'
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Cardinality sequence: ∅ has 0 elements, singletons {1} and {2} have 1 element, and the set {1, 2} has 2 elements.',
    hints: [
      'Start with the set that contains zero elements.',
      'Next come the sets containing exactly one element.',
      'Finish with the set containing both elements.'
    ],
    misconceptionIndex: 2,
  },
  // Foundation 6
  {
    id: 'ch_set_006',
    nodeId: NODE_C11_APPMATH_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Given the relation R = {(Delhi, UP), (Mumbai, MH), (Chennai, TN)}, what is the domain of R?',
    options: [
      '{UP, MH, TN}',
      '{Delhi, Mumbai, Chennai}',
      '{Delhi, UP, Mumbai, MH, Chennai, TN}',
      'The universal set of all Indian cities'
    ],
    correctIndex: 1,
    explanation: 'The domain of a relation R is the set of all first components of the ordered pairs: {Delhi, Mumbai, Chennai}.',
    hints: [
      'Domain corresponds to the first entries in each ordered pair.',
      'Extract the starting elements: Delhi, Mumbai, and Chennai.',
      'Second elements form the range, not the domain.'
    ],
  },
  // Foundation 7
  {
    id: 'ch_set_007',
    nodeId: NODE_C11_APPMATH_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is the relation R = {(1, 2), (1, 3), (2, 4)} NOT a function?',
    options: [
      'Because it contains numbers greater than 3',
      'Because input 1 is mapped to two distinct outputs (2 and 3)',
      'Because 4 has no pre-image',
      'Because it is not written in interval notation'
    ],
    correctIndex: 1,
    explanation: 'In a function, every input from the domain must be paired with exactly one output. Here input 1 maps to both 2 and 3, violating the definition.',
    hints: [
      'Examine if any input appears more than once with different values.',
      'Input 1 has output 2 AND output 3.',
      'A function must assign a single, unique output to each input.'
    ],
  },
  // Standard 1
  {
    id: 'ch_set_008',
    nodeId: NODE_C11_APPMATH_003,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a survey of 50 delivery riders, 32 know Hindi, 28 know Kannada, and 6 know neither. How many riders know BOTH languages?',
    correctAnswer: 16,
    tolerance: 0,
    unit: 'riders',
    explanation: 'Total who know at least one = 50 − 6 = 44. By inclusion-exclusion: n(H ∩ K) = n(H) + n(K) − n(H ∪ K) = 32 + 28 − 44 = 16.',
    hints: [
      'First find the number of riders who know at least one language: 50 − 6.',
      'Use the formula: n(A ∪ B) = n(A) + n(B) − n(A ∩ B).',
      'n(A ∩ B) = 32 + 28 − 44 = 16.'
    ],
    misconceptionIndex: 2,
  },
  // Standard 2
  {
    id: 'ch_set_009',
    nodeId: NODE_C11_APPMATH_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: "According to De Morgan's Law for sets, what is the equivalent expression for (A ∪ B)'?",
    options: ["A' ∪ B'", "A' ∩ B'", "A ∩ B", "(A ∩ B)'"],
    correctIndex: 1,
    explanation: "De Morgan's law states that the complement of a union is the intersection of the complements: (A ∪ B)' = A' ∩ B'.",
    hints: [
      'Taking the complement flips the union symbol ∪ to intersection ∩.',
      'Not in (A or B) means not in A AND not in B.',
      "(A ∪ B)' = A' ∩ B'."
    ],
  },
  // Standard 3: Construct
  {
    id: 'ch_set_010',
    nodeId: NODE_C11_APPMATH_005,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the simplified form of (A ∩ B) ∪ (A ∩ B\') using algebraic set laws.',
    availableParts: ['A', '∩', '∪', '(', 'B', "B'", 'U', '∅', ')'],
    targetState: 'A',
    validationHint: 'Factor out A using the distributive law: A ∩ (B ∪ B\') = A ∩ U = A.',
    explanation: 'Using distributive law in reverse: (A ∩ B) ∪ (A ∩ B\') = A ∩ (B ∪ B\') = A ∩ U = A.',
    hints: [
      'Use the distributive law to factor out A ∩.',
      "Notice that B ∪ B' is the universal set U.",
      'A ∩ U simplifies directly to A.'
    ],
  },
  // Standard 4
  {
    id: 'ch_set_011',
    nodeId: NODE_C11_APPMATH_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What is the domain of the rational function f(x) = (2x + 1) / (x² − 9)?',
    options: ['R', 'R − {3}', 'R − {−3, 3}', '[−3, 3]'],
    correctIndex: 2,
    explanation: 'A rational function is undefined where the denominator is zero. x² − 9 = 0 ⇒ x = ±3. Thus, the domain is R − {−3, 3}.',
    hints: [
      'Find the values of x where the denominator becomes 0.',
      'Solve x² − 9 = 0.',
      'x = 3 and x = −3 must be excluded from all real numbers R.'
    ],
    misconceptionIndex: 3,
  },
  // Standard 5
  {
    id: 'ch_set_012',
    nodeId: NODE_C11_APPMATH_010,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Evaluate the greatest integer (floor) function at a negative decimal: what is [−3.4]?',
    correctAnswer: -4,
    tolerance: 0,
    unit: '',
    explanation: '[x] gives the greatest integer less than or equal to x. On the number line, the greatest integer ≤ −3.4 is −4, NOT −3.',
    hints: [
      'Remember that [x] rounds to the left (downwards) on the number line.',
      '−3 is greater than −3.4, so it cannot be the floor.',
      'The largest integer less than or equal to −3.4 is −4.'
    ],
    misconceptionIndex: 4,
  },
  // Standard 6
  {
    id: 'ch_set_013',
    nodeId: NODE_C11_APPMATH_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the range of the signum function f(x) = sgn(x) for all real inputs x ∈ R?',
    options: ['R', '[0, ∞)', '{−1, 0, 1}', '[−1, 1]'],
    correctIndex: 2,
    explanation: 'The signum function outputs only three discrete values: −1 for negative numbers, 0 for zero, and +1 for positive numbers. Hence Range = {−1, 0, 1}.',
    hints: [
      'Signum only indicates sign/direction, not magnitude.',
      'Outputs are restricted to negative one, zero, or positive one.',
      'The range is the discrete set {−1, 0, 1}.'
    ],
  },
  // Standard 7
  {
    id: 'ch_set_014',
    nodeId: NODE_C11_APPMATH_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If Set A = {10, 20, 30} and Set B = {20, 30, 40}, what is the symmetric difference A △ B?',
    options: ['{20, 30}', '{10, 40}', '{10, 20, 30, 40}', '{10}'],
    correctIndex: 1,
    explanation: 'Symmetric difference A △ B = (A − B) ∪ (B − A) = {10} ∪ {40} = {10, 40}. It contains elements in exactly one set, omitting the intersection.',
    hints: [
      'Identify elements exclusive to A and elements exclusive to B.',
      'A − B = {10} and B − A = {40}.',
      'Combine them: {10, 40}.'
    ],
  },
  // Advanced 1
  {
    id: 'ch_set_015',
    nodeId: NODE_C11_APPMATH_002,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A logistics tag has 5 independent binary features. How many total subsets are in its power set P(S)?',
    correctAnswer: 32,
    tolerance: 0,
    unit: 'subsets',
    explanation: 'For a set with n elements, the power set has cardinality 2^n. For n = 5, |P(S)| = 2⁵ = 32 subsets.',
    hints: [
      'Each element has 2 independent choices: either included or excluded.',
      'Use the formula 2 raised to the power n.',
      '2⁵ = 32.'
    ],
  },
  // Advanced 2
  {
    id: 'ch_set_016',
    nodeId: NODE_C11_APPMATH_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the claim: "The functions f(x) = (x² − 4)/(x − 2) and g(x) = x + 2 are identical functions across the real numbers R."',
    options: [
      'True, because algebraic factorization cancels (x − 2) completely.',
      'False, because f is undefined at x = 2 (Domain = R − {2}) while g is defined everywhere (Domain = R).',
      'True, because both have the exact same range [2, ∞).',
      'False, because f(x) produces imaginary numbers when x < 2.'
    ],
    correctIndex: 1,
    explanation: 'Two functions are equal if and only if they have the same domain, codomain, and identical rule. f(2) is undefined, while g(2) = 4; hence their domains differ.',
    hints: [
      'Check if their domains are exactly identical.',
      'Can you substitute x = 2 into f(x)?',
      'Division by zero at x = 2 excludes it from the domain of f.'
    ],
    misconceptionIndex: 3,
  },
  // Advanced 3
  {
    id: 'ch_set_017',
    nodeId: NODE_C11_APPMATH_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is the logarithmic function f(x) = log_e(x) undefined for x ≤ 0 in real-valued mathematics?',
    options: [
      'Because e raised to any real power is strictly positive (e^y > 0), so no real power yields ≤ 0.',
      'Because negative numbers lack absolute value.',
      'Because the signum of log is always zero.',
      'Because logarithms only apply to prime numbers.'
    ],
    correctIndex: 0,
    explanation: 'Since the exponential function e^y > 0 for all y ∈ R, its inverse log_e(x) can only accept strictly positive arguments x ∈ (0, ∞).',
    hints: [
      'Think of log as the inverse of the exponential function.',
      'Can e^y ever equal a negative number or zero for any real y?',
      'Since e^y is always strictly positive, domain of log is (0, ∞).'
    ],
  },
  // Advanced 4
  {
    id: 'ch_set_018',
    nodeId: NODE_C11_APPMATH_007,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Let Set A = {1, 2, 3} and Set B = {a, b}. How many TOTAL distinct relations can be defined from set A to set B?',
    correctAnswer: 64,
    tolerance: 0,
    unit: 'relations',
    explanation: 'A relation from A to B is any subset of A × B. Since n(A × B) = 3 × 2 = 6, the number of subsets (and thus relations) is 2⁶ = 64.',
    hints: [
      'First calculate the number of elements in A × B: 3 × 2 = 6.',
      'A relation is any subset of the Cartesian product.',
      'The number of subsets of a set with 6 elements is 2⁶ = 64.'
    ],
  },
  // Advanced 5: Drag Sort
  {
    id: 'ch_set_019',
    nodeId: NODE_C11_APPMATH_010,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Arrange these function outputs in increasing numerical order: [−2.1], sgn(−50), |−1.5|, 2²',
    sortItems: [
      '[−2.1] (which equals −3)',
      'sgn(−50) (which equals −1)',
      '|−1.5| (which equals 1.5)',
      '2² (which equals 4)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Values: [−2.1] = −3; sgn(−50) = −1; |−1.5| = 1.5; 2² = 4. Ordered: −3 < −1 < 1.5 < 4.',
    hints: [
      'Evaluate each: [−2.1] is −3, sgn(−50) is −1.',
      '|−1.5| is +1.5, 2² is 4.',
      'Arrange from most negative to largest positive: −3, −1, 1.5, 4.'
    ],
    misconceptionIndex: 4,
  },
  // Advanced 6
  {
    id: 'ch_set_020',
    nodeId: NODE_C11_APPMATH_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A delivery fee model is defined by f(x) = 40 + 15[x], where x is delivery distance in km and [x] is the floor function. What is the fee for a 3.8 km delivery?',
    options: ['₹85', '₹97', '₹100', '₹55'],
    correctIndex: 0,
    explanation: 'For x = 3.8, [3.8] = 3. Fee = 40 + 15(3) = 40 + 45 = ₹85.',
    hints: [
      'Evaluate [3.8] first: the greatest integer ≤ 3.8 is 3.',
      'Multiply: 15 × 3 = 45.',
      'Add fixed fee: 40 + 45 = ₹85.'
    ],
  },
];

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
  nodeId: NODE_C11_APPMATH_001,
  title: 'Sets, Relations & Real-Valued Functions Laboratory',
  definition: 'A comprehensive study of sets, intervals, Cartesian products, relation mappings, and specialized real functions (modulus, signum, polynomial, floor, exponential, logarithmic) for ISC Class 11 Applied Mathematics.',
  eli5: 'Think of sets as labeled containers, Cartesian products as pairing grids, relations as connection lines, and functions as precise machines that take an input number and transform it into exactly one output.',
  misconceptions: [
    { misconception: 'The empty set ∅ is the same as {0} or zero.', correction: '∅ has zero elements (empty box). {0} has one element: the number 0.' },
    { misconception: 'Round ( ) and square [ ] brackets in intervals are just stylistic.', correction: '[a, b] includes endpoints (≤), while (a, b) excludes endpoints (<).' },
    { misconception: 'A − B and B − A are identical operations.', correction: 'A − B has elements exclusive to A; B − A has elements exclusive to B.' },
    { misconception: 'Cancelling (x − 2)/(x − 2) eliminates the domain restriction.', correction: 'The original function remains undefined at x = 2; domain is R − {2}.' },
    { misconception: 'The floor function [−1.2] rounds to −1.', correction: '[−1.2] = −2 because −2 is the greatest integer strictly less than or equal to −1.2.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the cardinality of the empty set ∅?', options: ['0', '1', 'Undefined', 'Infinity'], correctIndex: 0 },
    { question: 'Which interval represents {x ∈ R : 3 < x ≤ 8}?', options: ['[3, 8]', '(3, 8]', '[3, 8)', '(3, 8)'], correctIndex: 1 },
    { question: 'If n(A) = 3, how many elements are in its power set P(A)?', options: ['6', '8', '9', '3'], correctIndex: 1 },
    { question: 'Is every relation also a function?', options: ['Yes', 'No, each input must have exactly one output', 'Only for infinite sets', 'Only for linear rules'], correctIndex: 1 },
    { question: 'What is the value of sgn(−12)?', options: ['12', '−12', '−1', '0'], correctIndex: 2 },
    { question: 'What is the domain of f(x) = log(x)?', options: ['R', '[0, ∞)', '(0, ∞)', 'R − {0}'], correctIndex: 2 },
    { question: 'What is the value of [2.9]?', options: ['2', '3', '2.9', '0'], correctIndex: 0 },
    { question: 'What is the value of [−2.1]?', options: ['−2', '−3', '−2.1', '2'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery of roster/set-builder representations, power sets, Venn operations, Cartesian relations, and domains/ranges of all real-valued function types.',
};

const EXPLORATION_STEPS = [
  {
    title: '1. Roster vs Set-Builder & The Empty Set',
    instruction: 'Toggle elements to observe real-time set-builder rule generation and inspect the empty set ∅ vs {0}.',
    interactionType: 'set-builder-toggle',
    nodeId: NODE_C11_APPMATH_001,
  },
  {
    title: '2. Continuous Real Intervals & Power Sets',
    instruction: 'Drag interval sliders and switch endpoint brackets to visualize intervals on the number line.',
    interactionType: 'interval-slider',
    nodeId: NODE_C11_APPMATH_002,
  },
  {
    title: '3. Venn Diagrams & Set Operations',
    instruction: 'Adjust set sizes and overlap to inspect union, intersection, difference, and symmetric difference.',
    interactionType: 'venn-explorer',
    nodeId: NODE_C11_APPMATH_004,
  },
  {
    title: '4. Relations & Function Mapping',
    instruction: 'Map inputs to outputs to test whether a relation satisfies the single-output function condition.',
    interactionType: 'mapping-diagram',
    nodeId: NODE_C11_APPMATH_008,
  },
  {
    title: '5. Real-Valued Function Analyzer',
    instruction: 'Switch between modulus, signum, polynomial, floor, and rational functions to explore domain & live curves.',
    interactionType: 'function-plotter',
    nodeId: NODE_C11_APPMATH_010,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an interval is changed from (2, 7) to [2, 7], does the number of elements in the set change?',
    options: [
      'Yes, exactly 2 elements are added to an already infinite set of reals.',
      'No, because intervals have finite integer elements only.',
      'Yes, it changes from 4 elements to 6 elements.',
      'No, both contain only rational numbers.'
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the interval toggles below to observe boundary inclusion on the real line.',
    nodeId: NODE_C11_APPMATH_002,
  },
  {
    question: 'Predict: What happens to [x] (floor function) when x is negative, such as x = −1.7?',
    options: [
      'It rounds to −1 (closest to zero)',
      'It rounds to −2 (greatest integer strictly ≤ −1.7)',
      'It drops the sign and becomes 1',
      'It is undefined for negative decimals'
    ],
    correctIndex: 1,
    verifyInstruction: 'Slide the x-input slider to negative values in the function visualizer to test!',
    nodeId: NODE_C11_APPMATH_010,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the symmetric difference (A △ B) as set overlap increases?',
    observableOptions: [
      'The symmetric difference region shrinks because the common intersection is excluded',
      'The symmetric difference expands and equals the universal set',
      'It always equals the sum of set sizes regardless of overlap',
      'It becomes negative'
    ],
    correctIndex: 0,
    nodeId: NODE_C11_APPMATH_004,
  },
  {
    question: 'What happens to the graph of a rational function f(x) = 1/(x − c) at x = c?',
    observableOptions: [
      'The curve crosses y = 0 smoothly',
      'A vertical asymptote / domain gap occurs because division by zero is undefined',
      'The function turns into a horizontal line',
      'The output becomes zero'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_APPMATH_009,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Bangalore Metro Tariff & Zone Modeling',
  description: 'Model real metro fare stages using piecewise floor functions f(d) = 10 + 5[d/2], where d is travel distance in kilometers. Verify continuity, interval boundaries, and passenger set queries across 3 line interchanges.',
  steps: [
    'Define the universal set U of all 65 metro stations on the Purple and Green lines.',
    'Express express-stop skip intervals as semi-open subsets [d₁, d₂).',
    'Calculate the fare for 7.5 km using the greatest integer function [7.5/2].',
    'Model the student concession relation and determine if it forms an injective function.',
  ],
};

export function C11_AppliedMathsSetsRepresentationsEmptySim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['appmath'] || { name: 'Applied Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant-style Interactive state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [sandboxReady, setSandboxReady] = useState(false);

  // Set visualizer interactive variables
  const [selectedElements, setSelectedElements] = useState<number[]>([2, 4, 6]);
  const [intervalLeft, setIntervalLeft] = useState(-3);
  const [intervalRight, setIntervalRight] = useState(4);
  const [leftClosed, setLeftClosed] = useState(true);
  const [rightClosed, setRightClosed] = useState(false);

  // Venn explorer state
  const [vennSizeA, setVennSizeA] = useState(25);
  const [vennSizeB, setVennSizeB] = useState(20);
  const [vennOverlap, setVennOverlap] = useState(10);
  const [activeVennOp, setActiveVennOp] = useState<'union' | 'intersection' | 'diffA' | 'diffB' | 'symDiff'>('union');

  // Function explorer state
  const [activeFuncType, setActiveFuncType] = useState<'modulus' | 'signum' | 'polynomial' | 'floor' | 'rational'>('floor');
  const [funcInputX, setFuncInputX] = useState(-2.4);
  const [polyDegree, setPolyDegree] = useState(2);
  const [rationalAsymptote, setRationalAsymptote] = useState(1);

  // Mapping explorer state (Function vs Relation)
  const [mappingPairs, setMappingPairs] = useState<{ from: string; to: string }[]>([
    { from: 'x₁', to: 'y₁' },
    { from: 'x₂', to: 'y₂' },
    { from: 'x₃', to: 'y₃' },
  ]);

  // Scoring & Adaptive state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Non-MCQ challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback components state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Visual feedback animations
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses state
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // BKT state ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered challenges based on adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Derived function output computation
  const liveFunctionOutput = useMemo(() => {
    const x = funcInputX;
    switch (activeFuncType) {
      case 'modulus':
        return Math.abs(x);
      case 'signum':
        return x > 0 ? 1 : x < 0 ? -1 : 0;
      case 'floor':
        return Math.floor(x);
      case 'polynomial':
        return polyDegree === 1 ? 2 * x + 1 : polyDegree === 2 ? x * x - 2 : x * x * x - x;
      case 'rational':
        return x === rationalAsymptote ? NaN : (2 * x) / (x - rationalAsymptote);
      default:
        return x;
    }
  }, [activeFuncType, funcInputX, polyDegree, rationalAsymptote]);

  // Generate dynamic chart data for function visualizer
  const chartData = useMemo(() => {
    const points = [];
    for (let x = -5; x <= 5; x += 0.25) {
      const roundedX = parseFloat(x.toFixed(2));
      let y = 0;
      if (activeFuncType === 'modulus') y = Math.abs(roundedX);
      else if (activeFuncType === 'signum') y = roundedX > 0 ? 1 : roundedX < 0 ? -1 : 0;
      else if (activeFuncType === 'floor') y = Math.floor(roundedX);
      else if (activeFuncType === 'polynomial') {
        y = polyDegree === 1 ? 2 * roundedX + 1 : polyDegree === 2 ? roundedX * roundedX - 2 : roundedX * roundedX * roundedX - roundedX;
      } else if (activeFuncType === 'rational') {
        y = Math.abs(roundedX - rationalAsymptote) < 0.1 ? NaN : (2 * roundedX) / (roundedX - rationalAsymptote);
      }
      points.push({ x: roundedX, y: isNaN(y) || Math.abs(y) > 15 ? null : parseFloat(y.toFixed(2)) });
    }
    return points;
  }, [activeFuncType, polyDegree, rationalAsymptote]);

  // Derived mapping validation
  const isMappingAFunction = useMemo(() => {
    const fromCounts: Record<string, number> = {};
    mappingPairs.forEach(p => {
      fromCounts[p.from] = (fromCounts[p.from] || 0) + 1;
    });
    return Object.values(fromCounts).every(count => count === 1);
  }, [mappingPairs]);

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty when BKT changes
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

  // HTML5 Canvas pulse animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#6366f1';
      ctx.font = '12px sans-serif';
      ctx.fillText(`ISC Class 11 Applied Maths | ${difficulty.toUpperCase()}`, 10, 18);

      const pulse = 4 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 25, 14, pulse, 0, Math.PI * 2);
      ctx.fillStyle = difficulty === 'foundation' ? '#22c55e' : difficulty === 'standard' ? '#3b82f6' : '#ec4899';
      ctx.fill();
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [difficulty]);

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const nextHint = challenge.hints[0];
        if (nextHint) {
          setCurrentHint(nextHint);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Need a nudge? Check the hint on screen.');
        }
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, challenge]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Escalating hints handler
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
    }
  }, [hintCount, challenge]);

  // Discovery answer handler
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate! ∅ represents absolute emptiness.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // Navigation callbacks
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive set and function laboratory.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore freely with no grading pressure!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for applied challenges. Think carefully!');
  }, []);

  // Prediction & Observation callbacks
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now manipulate the visual controls to check.');
  }, []);

  // Interactive controls callbacks
  const toggleElementInSet = useCallback((num: number) => {
    setSelectedElements(prev =>
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num].sort((a, b) => a - b)
    );
    audioManager.play('tap');
  }, []);

  const handleIntervalChange = useCallback((left: number, right: number) => {
    if (left < right) {
      setIntervalLeft(left);
      setIntervalRight(right);
      audioManager.play('count');
    }
  }, []);

  const handleVennChange = useCallback((sizeA: number, sizeB: number, overlap: number) => {
    setVennSizeA(sizeA);
    setVennSizeB(sizeB);
    setVennOverlap(Math.min(overlap, Math.min(sizeA, sizeB)));
    audioManager.play('count');
  }, []);

  const handleMappingToggle = useCallback((from: string, to: string) => {
    setMappingPairs(prev => {
      const exists = prev.some(p => p.from === from && p.to === to);
      if (exists) {
        return prev.filter(p => !(p.from === from && p.to === to));
      } else {
        return [...prev, { from, to }];
      }
    });
    audioManager.play('tap');
  }, []);

  // Drag & drop handlers
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
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  // Drag sort handlers
  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const initial = prev.length === (challenge.sortItems?.length || 0) ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = initial.splice(fromIdx, 1);
      initial.splice(toIdx, 0, moved);
      return initial;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const current = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(current) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      setShowConfetti(true);
      setShowExplanation(true);
      audioManager.play('success');
      speechManager.speak('Accurately arranged in proper mathematical order!');
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
      bktStateRef.current = bktUpdate(bktStateRef.current, false);
    }
  }, [sortArrangement, challenge, showNextHint]);

  // Completion handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the Sets and Functions Simulation.');
  }, [errors, onComplete]);

  // Next challenge handler
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

  // Main answer handler
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Brilliant deduction.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
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
        speechManager.speak('Let us review the step-by-step logic.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-900/40 rounded-xl border border-indigo-700/50" aria-hidden="true">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
              {title}
            </h1>
            <p className="text-xs text-slate-400">ISC Class 11 Applied Mathematics | NEP 2020 Competency Lab</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <canvas ref={canvasRef} width={280} height={32} className="rounded-lg bg-slate-900 border border-slate-800" aria-label="Visual topic and tier status indicator" />
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2 py-1 rounded">
              Logistics Scenario Hook
            </span>
            <h2 className="text-xl font-bold text-white mt-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <h3 className="text-md font-semibold text-amber-300 mb-3 flex items-center gap-2">
              <span>🔍 Curiosity Discovery Puzzle:</span>
            </h3>
            <p className="text-white text-base mb-4 font-medium">{DISCOVERY_QUESTION.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-800/40 text-slate-500 border border-slate-800'
                      : 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span>{opt}</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold ml-2">✓</span>}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="text-rose-400 font-bold ml-2">✗</span>}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! No Bangalore hub has an Atlantic coastline, so the query result is literally empty ∅.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Step Into Interactive Labs"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  Step Into Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (Brilliant.org Core) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span>🔬 Step {currentSlide + 1} of {EXPLORATION_STEPS.length}:</span>
              <span className="text-white">{EXPLORATION_STEPS[currentSlide].title}</span>
            </h2>
            <div className="flex gap-1.5" aria-hidden="true">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-amber-400 text-sm font-medium bg-amber-950/30 border border-amber-800/40 px-3.5 py-2 rounded-xl">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 min-h-[380px]"
            >
              {/* Slide 0: Set Builder vs Roster */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-300">Toggle Numbers to Form Set S:</h4>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => {
                        const isSelected = selectedElements.includes(num);
                        return (
                          <motion.button
                            key={num}
                            aria-label={`Toggle number ${num} in set S. Currently ${isSelected ? 'included' : 'excluded'}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleElementInSet(num)}
                            className={`w-11 h-11 rounded-xl font-bold flex items-center justify-center transition-all ${
                              isSelected
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                          >
                            {num}
                          </motion.button>
                        );
                      })}
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-xs text-slate-400 uppercase font-semibold">Roster Notation:</p>
                      <p className="text-sm font-mono text-emerald-400">
                        S = {'{ '}{selectedElements.length === 0 ? '∅' : selectedElements.join(', ')}{' }'}
                      </p>
                      <p className="text-xs text-slate-400 uppercase font-semibold mt-2">Set-Builder Representation:</p>
                      <p className="text-sm font-mono text-sky-400">
                        {selectedElements.length === 0
                          ? 'S = { x ∈ N | x ≠ x } (Empty Set ∅)'
                          : `S = { x ∈ N | x is selected from universe U, |S| = ${selectedElements.length} }`}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
                    <svg viewBox="0 0 240 180" className="w-full max-w-[240px]" aria-label="Set diagram showing set S inside Universal set U">
                      <rect x="10" y="10" width="220" height="160" rx="16" fill="#1e1b4b" stroke="#4338ca" strokeWidth="2" />
                      <text x="25" y="32" fill="#818cf8" fontSize="12" fontWeight="bold">Universal U</text>
                      <circle cx="120" cy="95" r="55" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
                      <text x="120" y="65" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">Set S</text>
                      <text x="120" y="105" textAnchor="middle" fill="#38bdf8" fontSize="16" fontWeight="bold">
                        {selectedElements.length === 0 ? '∅' : `{ ${selectedElements.slice(0, 4).join(', ')}${selectedElements.length > 4 ? '...' : ''} }`}
                      </text>
                      <text x="120" y="125" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        Cardinality n(S) = {selectedElements.length}
                      </text>
                    </svg>
                    <p className="text-xs text-slate-400 mt-2">
                      Notice: Empty set ∅ has <span className="text-amber-300 font-bold">0 elements</span>, whereas {'{0}'} has 1 element!
                    </p>
                  </div>
                </div>
              )}

              {/* Slide 1: Continuous Intervals & Power Sets */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* Predict-then-check block */}
                  {!predictionMade ? (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/50">
                      <p className="text-sm text-indigo-200 font-semibold mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Predict option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-2.5 bg-emerald-950/40 rounded-xl border border-emerald-800/40 text-xs text-emerald-300">
                      <span>✓ Prediction logged! Now drag endpoints & toggles below.</span>
                      <button aria-label="Change prediction" onClick={() => setPredictionMade(false)} className="text-slate-400 underline">Change</button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">Left Endpoint: {intervalLeft}</span>
                        <motion.button
                          aria-label={`Toggle left boundary bracket. Currently ${leftClosed ? 'closed' : 'open'}`}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setLeftClosed(!leftClosed)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${leftClosed ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-amber-300 border border-slate-700'}`}
                        >
                          {leftClosed ? '[ Closed (≤)' : '( Open (<)'}
                        </motion.button>
                      </div>
                      <input
                        type="range"
                        aria-label="Left interval endpoint slider"
                        min={-5}
                        max={intervalRight - 1}
                        value={intervalLeft}
                        onChange={e => handleIntervalChange(Number(e.target.value), intervalRight)}
                        className="w-full accent-indigo-500"
                      />

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-semibold text-slate-400">Right Endpoint: {intervalRight}</span>
                        <motion.button
                          aria-label={`Toggle right boundary bracket. Currently ${rightClosed ? 'closed' : 'open'}`}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setRightClosed(!rightClosed)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${rightClosed ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-amber-300 border border-slate-700'}`}
                        >
                          {rightClosed ? '] Closed (≤)' : ') Open (<)'}
                        </motion.button>
                      </div>
                      <input
                        type="range"
                        aria-label="Right interval endpoint slider"
                        min={intervalLeft + 1}
                        max={6}
                        value={intervalRight}
                        onChange={e => handleIntervalChange(intervalLeft, Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center">
                      <p className="text-xs text-slate-400 uppercase font-semibold">Resulting Real Interval:</p>
                      <p className="text-2xl font-mono text-emerald-400 font-bold my-1">
                        {leftClosed ? '[' : '('}{intervalLeft}, {intervalRight}{rightClosed ? ']' : ')'}
                      </p>
                      <p className="text-xs font-mono text-sky-400">
                        {`{ x ∈ R | ${intervalLeft} ${leftClosed ? '≤' : '<'} x ${rightClosed ? '≤' : '<'} ${intervalRight} }`}
                      </p>
                      <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
                        <span>Power Set Formula Preview: </span>
                        <span className="text-amber-300 font-bold">|P(S)| = 2ⁿ subsets</span> (for discrete sets).
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 2: Venn Operations Explorer */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'union', label: 'A ∪ B (Union)' },
                      { id: 'intersection', label: 'A ∩ B (Intersection)' },
                      { id: 'diffA', label: 'A − B (Difference)' },
                      { id: 'diffB', label: 'B − A' },
                      { id: 'symDiff', label: 'A △ B (Symmetric Diff)' },
                    ].map(op => (
                      <motion.button
                        key={op.id}
                        aria-label={`Select Venn operation ${op.label}`}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setActiveVennOp(op.id as any);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          activeVennOp === op.id
                            ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {op.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 320 200" className="w-full" aria-label={`Venn diagram showing ${activeVennOp}`}>
                        <rect x="5" y="5" width="310" height="190" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                        <text x="20" y="28" fill="#64748b" fontSize="12" fontWeight="bold">Universal Set U</text>
                        {/* Circle A */}
                        <circle
                          cx="120"
                          cy="105"
                          r="60"
                          fill={
                            activeVennOp === 'union' || activeVennOp === 'diffA' || activeVennOp === 'symDiff'
                              ? '#4f46e5'
                              : '#1e293b'
                          }
                          fillOpacity="0.6"
                          stroke="#6366f1"
                          strokeWidth="2"
                        />
                        {/* Circle B */}
                        <circle
                          cx="200"
                          cy="105"
                          r="60"
                          fill={
                            activeVennOp === 'union' || activeVennOp === 'diffB' || activeVennOp === 'symDiff'
                              ? '#0284c7'
                              : '#1e293b'
                          }
                          fillOpacity="0.6"
                          stroke="#38bdf8"
                          strokeWidth="2"
                        />
                        {/* Overlap override */}
                        <path
                          d="M 160 55 A 60 60 0 0 1 160 155 A 60 60 0 0 1 160 55"
                          fill={
                            activeVennOp === 'intersection' || activeVennOp === 'union'
                              ? '#10b981'
                              : activeVennOp === 'symDiff'
                              ? '#0f172a'
                              : '#1e293b'
                          }
                          fillOpacity={activeVennOp === 'symDiff' ? '1' : '0.8'}
                        />
                        <text x="95" y="110" fill="#ffffff" fontSize="12" fontWeight="bold">A</text>
                        <text x="225" y="110" fill="#ffffff" fontSize="12" fontWeight="bold">B</text>
                        <text x="160" y="110" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                          {activeVennOp === 'intersection' ? 'A ∩ B' : ''}
                        </text>
                      </svg>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs text-slate-400">
                        <span>Active Region: </span>
                        <span className="text-amber-300 font-bold">
                          {activeVennOp === 'union'
                            ? 'A ∪ B = All elements in A or B or both'
                            : activeVennOp === 'intersection'
                            ? 'A ∩ B = Common overlapping elements'
                            : activeVennOp === 'diffA'
                            ? 'A − B = Elements strictly in A but not in B'
                            : activeVennOp === 'diffB'
                            ? 'B − A = Elements strictly in B but not in A'
                            : 'A △ B = (A − B) ∪ (B − A) = Exclusive to exactly one set'}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                        <p className="font-semibold text-indigo-300">Inclusion-Exclusion Principle:</p>
                        <p className="font-mono text-emerald-400 mt-1">n(A ∪ B) = n(A) + n(B) − n(A ∩ B)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 3: Relations vs Functions Mapping */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400">Click lines below to toggle mappings from Domain A to Codomain B:</p>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${isMappingAFunction ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-rose-950 text-rose-300 border border-rose-700'}`}>
                      {isMappingAFunction ? '✓ Valid Function (f: A → B)' : '✗ Not a Function (Relation only)'}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 360 180" className="w-full" aria-label="Mapping diagram between Domain A and Codomain B">
                      {/* Set A oval */}
                      <ellipse cx="70" cy="90" rx="45" ry="75" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="70" y="35" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">Domain A</text>
                      {/* Set B oval */}
                      <ellipse cx="290" cy="90" rx="45" ry="75" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                      <text x="290" y="35" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="bold">Codomain B</text>

                      {/* Domain points */}
                      {['x₁', 'x₂', 'x₃'].map((pt, i) => (
                        <g key={pt}>
                          <circle cx="70" cy={60 + i * 35} r="6" fill="#818cf8" />
                          <text x="50" y={64 + i * 35} fill="#ffffff" fontSize="11">{pt}</text>
                        </g>
                      ))}

                      {/* Codomain points */}
                      {['y₁', 'y₂', 'y₃'].map((pt, i) => (
                        <g key={pt}>
                          <circle cx="290" cy={60 + i * 35} r="6" fill="#38bdf8" />
                          <text x="305" y={64 + i * 35} fill="#ffffff" fontSize="11">{pt}</text>
                        </g>
                      ))}

                      {/* Mapping lines */}
                      {mappingPairs.map((p, idx) => {
                        const fromY = p.from === 'x₁' ? 60 : p.from === 'x₂' ? 95 : 130;
                        const toY = p.to === 'y₁' ? 60 : p.to === 'y₂' ? 95 : 130;
                        return (
                          <line
                            key={idx}
                            x1="76"
                            y1={fromY}
                            x2="284"
                            y2={toY}
                            stroke={isMappingAFunction ? '#10b981' : '#f43f5e'}
                            strokeWidth="2.5"
                            strokeDasharray="4"
                          />
                        );
                      })}
                    </svg>

                    <div className="flex justify-center gap-2 mt-2">
                      <button
                        aria-label="Toggle pair x1 to y2"
                        onClick={() => handleMappingToggle('x₁', 'y₂')}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-mono"
                      >
                        Toggle (x₁, y₂)
                      </button>
                      <button
                        aria-label="Toggle pair x2 to y3"
                        onClick={() => handleMappingToggle('x₂', 'y₃')}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-mono"
                      >
                        Toggle (x₂, y₃)
                      </button>
                      <button
                        aria-label="Reset mapping to 1-to-1 function"
                        onClick={() => setMappingPairs([{ from: 'x₁', to: 'y₁' }, { from: 'x₂', to: 'y₂' }, { from: 'x₃', to: 'y₃' }])}
                        className="px-2.5 py-1 bg-indigo-900/60 text-indigo-200 rounded text-xs font-mono"
                      >
                        Reset 1-to-1
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide 4: Real-Valued Function Plotter */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'floor', label: 'Greatest Integer [x]' },
                      { id: 'modulus', label: 'Modulus |x|' },
                      { id: 'signum', label: 'Signum sgn(x)' },
                      { id: 'polynomial', label: 'Polynomial P(x)' },
                      { id: 'rational', label: 'Rational P(x)/Q(x)' },
                    ].map(fn => (
                      <motion.button
                        key={fn.id}
                        aria-label={`Select function curve: ${fn.label}`}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setActiveFuncType(fn.id as any);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          activeFuncType === fn.id
                            ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {fn.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 h-52">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="x" stroke="#64748b" fontSize={10} />
                          <YAxis stroke="#64748b" fontSize={10} domain={[-5, 8]} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                          <Line type="monotone" dataKey="y" stroke="#38bdf8" strokeWidth={2.5} dot={false} isAnimationActive={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div>
                        <span className="text-xs text-slate-400">Interactive Input x: </span>
                        <span className="text-sm font-bold text-amber-300 font-mono">{funcInputX.toFixed(2)}</span>
                        <input
                          type="range"
                          aria-label="Function input x slider"
                          min={-4}
                          max={4}
                          step={0.1}
                          value={funcInputX}
                          onChange={e => setFuncInputX(parseFloat(e.target.value))}
                          className="w-full accent-indigo-500 mt-1"
                        />
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                        <p className="text-xs text-slate-400">Live Evaluation:</p>
                        <p className="text-sm font-mono text-emerald-400 font-bold">
                          f({funcInputX.toFixed(1)}) = {isNaN(liveFunctionOutput) ? 'UNDEFINED (Domain Gap)' : liveFunctionOutput.toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-400">
                          Domain: <span className="text-indigo-300 font-semibold">{activeFuncType === 'rational' ? `R − {${rationalAsymptote}}` : 'R'}</span> | Range: <span className="text-indigo-300 font-semibold">{activeFuncType === 'floor' ? 'Z (All Integers)' : activeFuncType === 'signum' ? '{−1, 0, 1}' : activeFuncType === 'modulus' ? '[0, ∞)' : 'R'}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Previous Lab Step"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-medium">Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab Step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter Free Sandbox Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-sm shadow-lg"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-bold text-white">Free Sandbox: Sets & Functions Multi-Lab</h3>
              <p className="text-xs text-slate-400">Play with all mathematical controls simultaneously without scoring pressure.</p>
            </div>
            <motion.button
              aria-label="Ready for Graded Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-sky-600 text-white font-bold rounded-xl shadow-lg text-sm"
            >
              Ready for Graded Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Sandbox Panel: Set Venn Simulator */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-indigo-300 uppercase">Live Venn Calculator</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Size n(A): {vennSizeA}</span>
                  <span>Size n(B): {vennSizeB}</span>
                  <span>Overlap n(A ∩ B): {vennOverlap}</span>
                </div>
                <input
                  type="range"
                  aria-label="Venn diagram overlap slider"
                  min={0}
                  max={Math.min(vennSizeA, vennSizeB)}
                  value={vennOverlap}
                  onChange={e => handleVennChange(vennSizeA, vennSizeB, Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <p>Union n(A ∪ B) = {vennSizeA + vennSizeB - vennOverlap}</p>
                <p>Only A n(A − B) = {vennSizeA - vennOverlap}</p>
                <p>Only B n(B − A) = {vennSizeB - vennOverlap}</p>
                <p className="text-amber-300 font-bold">Symmetric Difference n(A △ B) = {vennSizeA + vennSizeB - 2 * vennOverlap}</p>
              </div>
            </div>

            {/* Right Sandbox Panel: Real-Valued Function Evaluator */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-sky-300 uppercase">Live Function Evaluator</h4>
              <div className="flex gap-1.5 flex-wrap">
                {(['modulus', 'signum', 'floor', 'polynomial', 'rational'] as const).map(type => (
                  <button
                    key={type}
                    aria-label={`Select function type ${type}`}
                    onClick={() => setActiveFuncType(type)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      activeFuncType === type ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <input
                type="range"
                aria-label="Sandbox function input x slider"
                min={-5}
                max={5}
                step={0.1}
                value={funcInputX}
                onChange={e => setFuncInputX(parseFloat(e.target.value))}
                className="w-full accent-sky-500"
              />
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <p>Input x = {funcInputX.toFixed(2)}</p>
                <p className="text-emerald-400 font-bold text-sm">
                  f(x) = {isNaN(liveFunctionOutput) ? 'UNDEFINED' : liveFunctionOutput.toFixed(2)}
                </p>
                <p className="text-slate-400">Testing Floor: [{funcInputX.toFixed(1)}] = {Math.floor(funcInputX)}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Challenge Header & Adaptive Tier Badge */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <span>Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
                <span className="text-xs text-slate-400 font-normal">| Score: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
              </h2>
              <p className="text-xs text-slate-400">Competency: <span className="text-indigo-300 font-bold uppercase">{challenge.competencyLevel}</span></p>
            </div>
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                  : difficulty === 'standard'
                  ? 'bg-sky-950 text-sky-400 border border-sky-700'
                  : 'bg-rose-950 text-rose-400 border border-rose-700'
              }`}
            >
              {difficulty} Tier
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Box */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <p className="text-base font-bold text-white leading-relaxed">{challenge.question}</p>

            {/* MCQ Type */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                      wrongFlash
                        ? 'bg-rose-950/70 border-2 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-2 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-900/20'
                        : 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 font-bold ml-2">✓</span>}
                    {wrongFlash && <span className="text-rose-400 font-bold ml-2">✗</span>}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-semibold self-center mr-2">Drag Labels:</span>
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
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg cursor-grab text-xs font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'reg_left', label: 'Region: Left Crescent (Exclusive A)' },
                    { id: 'reg_mid', label: 'Region: Central Lens (Overlap)' },
                    { id: 'reg_right', label: 'Region: Right Crescent (Exclusive B)' },
                    { id: 'reg_out', label: 'Region: Outside Circles (Complement)' },
                  ].map(target => (
                    <div
                      key={target.id}
                      aria-label={`Drop target for ${target.label}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-center items-center text-center min-h-[90px] transition-all ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs text-slate-500 font-medium mb-1">{target.label}</span>
                      <span className="text-sm font-bold flex items-center gap-1">
                        {droppedLabels[target.id] ? (
                          <>
                            <span>✓</span>
                            <span>{droppedLabels[target.id]}</span>
                          </>
                        ) : (
                          'Drop Here 🎯'
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Dropped Labels"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg disabled:opacity-40"
                >
                  Verify Dropped Labels →
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">Drag or re-order these cards into the correct mathematical sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      role="button"
                      tabIndex={0}
                      aria-label={`Position ${displayIndex + 1}: ${item}. Drag to reorder`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl cursor-grab text-sm font-medium border border-slate-700 flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                      <span className="w-6 h-6 rounded-full bg-indigo-900 text-indigo-300 text-xs font-bold flex items-center justify-center">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  aria-label="Verify Sorting Arrangement"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg"
                >
                  Verify Arrangement →
                </motion.button>
              </div>
            )}

            {/* Numeric Input Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label={`Numerical answer input in ${challenge.unit || 'units'}`}
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-indigo-500 outline-none w-56"
                  />
                  <span className="text-sm text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    aria-label="Check numerical answer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg disabled:opacity-40"
                  >
                    Check Number
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add symbol ${part} to construction`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 font-mono font-bold rounded-lg text-sm border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex items-center flex-wrap gap-2">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-900 text-white font-mono rounded-lg text-sm flex items-center gap-1.5">
                      {part}
                      <button aria-label={`Remove part ${part}`} onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-400 text-xs">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click symbols above to build set expression</span>}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    aria-label="Verify expression construction"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(constructParts.join(''))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg disabled:opacity-40"
                  >
                    Verify Construction
                  </motion.button>
                  <button aria-label="Clear expression" onClick={() => setConstructParts([])} className="px-3 py-2 text-xs text-slate-400 hover:text-white">Clear</button>
                </div>
              </div>
            )}

            {/* Explanation / Progressive Disclosure */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-5 bg-slate-950 rounded-2xl border border-amber-800/60 space-y-3">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step-by-Step Mathematical Explanation:</p>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((step, i) => (
                  <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-slate-200 leading-relaxed">
                    <span className="text-amber-400 font-bold mr-1.5">{i + 1}.</span> {step}{!step.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2 flex gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show Next Explanation Step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-900/60 hover:bg-amber-800/80 text-amber-200 rounded-xl text-xs font-bold"
                    >
                      Show Next Explanation Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'View Final Results' : 'Next Challenge'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-sm shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'View Final Results →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD REVIEW ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-800 text-center space-y-3">
            <span className="text-4xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl font-black text-white">Module Mastery Achieved!</h2>
            <p className="text-sm text-slate-300">
              Final Accuracy Score: <span className="text-emerald-400 font-bold text-lg">{Math.max(0, 100 - errors * 5)}%</span> | Mastery Tier: <span className="text-indigo-400 font-bold capitalize">{masteryLevel}</span>
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-gradient-to-r from-indigo-950/70 to-slate-900 border-2 border-indigo-600/50 rounded-2xl shadow-lg">
            <h3 className="text-lg font-black text-amber-300 mb-1">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors >= 1 && errors <= 3
                ? 'Great work!'
                : errors >= 4 && errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {errors === 0
                ? '🌟 Flawless mastery! You navigated all set operations, Cartesian products, intervals, and real-valued functions with 100% precision.'
                : errors <= 3
                ? '✨ Excellent performance! You have a solid grasp of sets and functions. Review the fine details below to make your intuition foolproof.'
                : errors <= 7
                ? '💪 Solid progress! Function domains and floor properties take repeated visualization. Review the steps below and give it another spin.'
                : '🚀 Every complex mathematical model becomes clear with practice. Keep analyzing the visual curves and you will master these concepts!'}
            </p>
          </div>

          {/* Reflection Section */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-md font-bold text-indigo-300 flex items-center gap-2">
              <span>🤔 Conceptual Reflection</span>
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label htmlFor="reflection-surprising" className="text-xs font-semibold text-slate-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="reflection-surprising"
                  aria-label="What was the most surprising thing you learned?"
                  value={reflectionResponses.surprising}
                  onChange={e => setReflectionResponses({ ...reflectionResponses, surprising: e.target.value })}
                  placeholder="e.g., How floor functions handle negative decimals, or how intervals contain infinite real numbers..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label htmlFor="reflection-explain" className="text-xs font-semibold text-slate-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="reflection-explain"
                  aria-label="How would you explain this to a friend?"
                  value={reflectionResponses.explain}
                  onChange={e => setReflectionResponses({ ...reflectionResponses, explain: e.target.value })}
                  placeholder="e.g., Explain the difference between an empty set and zero, or why a function must have only one output per input..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label htmlFor="reflection-reallife" className="text-xs font-semibold text-slate-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="reflection-reallife"
                  aria-label="Where in real life might you use this?"
                  value={reflectionResponses.realLife}
                  onChange={e => setReflectionResponses({ ...reflectionResponses, realLife: e.target.value })}
                  placeholder="e.g., Designing delivery pricing slabs, querying customer databases, or filtering sensor inputs..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 border border-rose-800/60 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Your Diagnostic Misconception Review:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <p className="text-xs font-bold text-rose-400">✗ {m.misconception}</p>
                    <p className="text-xs text-emerald-300">✓ Correct Rule: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-amber-950/30 border border-amber-800/50 rounded-2xl flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="text-amber-300 font-semibold">📅 Spaced Repetition (SM-2):</span>
            <span className="text-slate-300">
              Next scheduled review in <span className="font-bold text-white">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
            </span>
          </div>

          {/* Real-World Applied Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-md font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Floating feedback overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Tier Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_AppliedMathsSetsRepresentationsEmptySim;
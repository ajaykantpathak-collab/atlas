'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC MATHEMATICS SYLLABUS NODE CONSTANTS ───
const NODE_C11_MATH_052 = 'c11_math_052'; // Fundamental principle of counting
const NODE_C11_MATH_053 = 'c11_math_053'; // Factorial notation n!
const NODE_C11_MATH_054 = 'c11_math_054'; // Permutations (nPr) & restricted permutations
const NODE_C11_MATH_055 = 'c11_math_055'; // Permutations - together & never occur
const NODE_C11_MATH_056 = 'c11_math_056'; // Permutations - alike & repeated items
const NODE_C11_MATH_057 = 'c11_math_057'; // Circular permutations
const NODE_C11_MATH_058 = 'c11_math_058'; // Combinations (nCr) & properties
const NODE_C11_MATH_059 = 'c11_math_059'; // Mixed P & C problems
const NODE_C11_MATH_060 = 'c11_math_060'; // Binomial Theorem - statement & combinatorial proof
const NODE_C11_MATH_061 = 'c11_math_061'; // Pascal's triangle & Meru Prastara

const ALL_NODE_IDS = [
  NODE_C11_MATH_052,
  NODE_C11_MATH_053,
  NODE_C11_MATH_054,
  NODE_C11_MATH_055,
  NODE_C11_MATH_056,
  NODE_C11_MATH_057,
  NODE_C11_MATH_058,
  NODE_C11_MATH_059,
  NODE_C11_MATH_060,
  NODE_C11_MATH_061,
];

// ─── NARRATIVE SCENARIO (Indian Aerospace & Cryptography Lab) ───
const SCENARIO = {
  title: 'Mission Gaganyaan: Combinatorial Logistics & Codebreaker',
  intro: 'You are the Chief Mission Specialist for ISRO’s upcoming Gaganyaan orbital mission. From designing security OTPs and routing communication relays across Bengaluru, Sriharikota, and Mauritius, to seating astronauts at the circular console and expanding payload thermal dispersion polynomials — every decision is governed by the mathematics of counting!',
  context: 'Master the fundamental rules of counting, permutations with strict constraints, symmetry in combinations, and the Binomial expansion to ensure mission success.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'An astronaut needs to set a 3-digit access PIN using digits {1, 2, 3, 4, 5}. If NO digits can be repeated, how many possible codes exist compared to when repetition IS allowed?',
  options: [
    'No repetition: 15 codes | With repetition: 15 codes (both are 3 × 5)',
    'No repetition: 60 codes (5×4×3) | With repetition: 125 codes (5³)',
    'No repetition: 120 codes (5!) | With repetition: 243 codes (3⁵)',
    'No repetition: 10 codes (5C3) | With repetition: 15 codes (5+5+5)',
  ],
  correctIndex: 1,
  hintAfter: 'Notice how each sequential choice reduces available slots when items cannot repeat (5×4×3 = 60), whereas repetition gives independent choices (5×5×5 = 125)! Let’s explore this visually.',
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

// ─── CHALLENGES ARRAY (20 Comprehensive Multi-Type Challenges) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation: c11_math_052 - Recall
  {
    id: 'ch_01',
    nodeId: NODE_C11_MATH_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A mission canteen offers 3 types of breakfast dosas AND 4 hot beverages. A scientist must select ONE dosa AND ONE beverage. By the Fundamental Principle of Counting, how many total breakfast combinations exist?',
    options: ['7 (3 + 4)', '12 (3 × 4)', '64 (4³)', '81 (3⁴)'],
    correctIndex: 1,
    explanation: 'Both choices must occur sequentially together ("AND" condition), so the Multiplication Principle applies: 3 × 4 = 12 distinct meals.',
    hints: [
      'Look at the connector keyword: is it "OR" (mutually exclusive) or "AND" (sequential stages)?',
      'Each of the 3 dosas can be paired with any of the 4 beverages.',
      'Multiply the choices: 3 × 4 = 12.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation: c11_math_053 - Understanding
  {
    id: 'ch_02',
    nodeId: NODE_C11_MATH_053,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Simplify the factorial ratio: 8! / (5! × 3!). Calculate the exact integer value without evaluating full 8! manually.',
    correctAnswer: 56,
    tolerance: 0,
    unit: '',
    explanation: '8! / (5! × 3!) = (8 × 7 × 6 × 5!) / (5! × 6) = (8 × 7 × 6) / 6 = 56. The 5! cancels completely.',
    hints: [
      'Expand 8! down to 5!: 8! = 8 × 7 × 6 × 5!.',
      'Cancel the 5! in numerator and denominator.',
      'Now simplify (8 × 7 × 6) / 3! where 3! = 6.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation: c11_math_054 - Recall / Drag-Label
  {
    id: 'ch_03',
    nodeId: NODE_C11_MATH_054,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match each combinatorial symbol to its core mathematical meaning and formula structure.',
    dragItems: [
      { label: 'n! / (n - r)!', targetId: 'slot_npr' },
      { label: 'n! / [r!(n - r)!]', targetId: 'slot_ncr' },
      { label: '(n - 1)!', targetId: 'slot_circular' },
      { label: 'n^r', targetId: 'slot_repetition' },
    ],
    correctMapping: {
      slot_npr: 'n! / (n - r)!',
      slot_ncr: 'n! / [r!(n - r)!]',
      slot_circular: '(n - 1)!',
      slot_repetition: 'n^r',
    },
    explanation: 'nPr counts ordered arrangements without repetition; nCr counts selections where order does not matter (divided by r!); (n-1)! counts circular seating removing rotational symmetry; n^r counts choices when repetition is allowed.',
    hints: [
      'Permutations nPr have no r! in denominator because order is distinct.',
      'Combinations nCr divide by r! to eliminate internal ordering.',
      'Circular permutations fix 1 item, leaving (n-1)!.',
    ],
  },
  // 4. Foundation: c11_math_057 - Understanding
  {
    id: 'ch_04',
    nodeId: NODE_C11_MATH_057,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does seating 6 astronauts around a circular console yield (6 - 1)! = 120 arrangements, whereas stringing 6 distinct sensor beads into a loop necklace yields (6 - 1)! / 2 = 60 arrangements?',
    options: [
      'Necklaces have fewer beads than chairs.',
      'Astronauts have left and right distinction (cannot be flipped over), whereas a necklace can be flipped in 3D space, making clockwise and anticlockwise identical.',
      'Chairs can be rotated freely, but necklaces are fixed in one orientation.',
      'Human seating always multiplies by 2, while physical objects divide by 2.',
    ],
    correctIndex: 1,
    explanation: 'In round table seating, clockwise and counterclockwise orderings are distinct because humans distinguish their left neighbour from their right. A necklace can be flipped over in space (reflection symmetry), collapsing clockwise and anticlockwise views into one.',
    hints: [
      'Think about what happens if you turn a garland or necklace upside down.',
      'Can you turn an astronaut seating arrangement upside down without moving people?',
      'Flippable objects have reflective symmetry, requiring division by 2.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation: c11_math_061 - Recall
  {
    id: 'ch_05',
    nodeId: NODE_C11_MATH_061,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the sum of all binomial coefficients in Row 6 of Pascal’s Triangle (i.e. 6C0 + 6C1 + 6C2 + 6C3 + 6C4 + 6C5 + 6C6)?',
    correctAnswer: 64,
    tolerance: 0,
    unit: '',
    explanation: 'The sum of all coefficients in row n of Pascal’s Triangle is 2ⁿ. For n = 6, 2⁶ = 64.',
    hints: [
      'Recall the algebraic property: (1 + 1)ⁿ = nC0 + nC1 + ... + nCn.',
      'Substitute n = 6 into 2ⁿ.',
      '2⁶ = 64.',
    ],
    misconceptionIndex: 4,
  },
  // 6. Foundation: c11_math_058 - Application
  {
    id: 'ch_06',
    nodeId: NODE_C11_MATH_058,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'If 12Cx = 12C(x + 4), find the value of x where x is a non-negative integer.',
    options: ['x = 4', 'x = 6', 'x = 8', 'x = 12'],
    correctIndex: 0,
    explanation: 'By the symmetry property nCa = nCb implies either a = b (which gives x = x + 4, impossible) OR a + b = n. Thus, x + (x + 4) = 12 => 2x + 4 = 12 => 2x = 8 => x = 4.',
    hints: [
      'Recall that nCa = nCb means either a = b or a + b = n.',
      'Here, x cannot equal x + 4, so their sum must equal n = 12.',
      'Solve 2x + 4 = 12.',
    ],
    misconceptionIndex: 3,
  },
  // 7. Foundation: c11_math_060 - Recall
  {
    id: 'ch_07',
    nodeId: NODE_C11_MATH_060,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many total terms are present in the binomial expansion of (3x - 2y)¹¹ when fully expanded?',
    correctAnswer: 12,
    tolerance: 0,
    unit: 'terms',
    explanation: 'The expansion of (a + b)ⁿ always contains exactly (n + 1) terms because k runs from 0 to n inclusive. For n = 11, terms = 11 + 1 = 12.',
    hints: [
      'Remember that k starts at 0 and goes up to n.',
      'Total terms = n + 1.',
      '11 + 1 = 12.',
    ],
    misconceptionIndex: 4,
  },
  // 8. Standard: c11_math_055 - Application (Block Method)
  {
    id: 'ch_08',
    nodeId: NODE_C11_MATH_055,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: '7 telemetry scientists (including Dr. Aditi and Dr. Vikram) are lined up in a row for a press briefing. In how many ways can they be arranged so that Dr. Aditi and Dr. Vikram ALWAYS sit together?',
    correctAnswer: 1440,
    tolerance: 0,
    unit: 'ways',
    explanation: 'Tie Aditi and Vikram into a single block (AV). Now we arrange (7 - 2 + 1) = 6 units in 6! = 720 ways. Inside their block, Aditi and Vikram can swap in 2! = 2 ways. Total = 6! × 2! = 720 × 2 = 1440.',
    hints: [
      'Treat the two scientists as 1 single composite block.',
      'Count the total units: 1 block + 5 other scientists = 6 units.',
      'Multiply the arrangements of units (6!) by the internal arrangement of the block (2!).',
    ],
    misconceptionIndex: 2,
  },
  // 9. Standard: c11_math_055 - Analysis (Complementary Method)
  {
    id: 'ch_09',
    nodeId: NODE_C11_MATH_055,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Using the previous scenario of 7 scientists, in how many arrangements will Dr. Aditi and Dr. Vikram NEVER sit together?',
    correctAnswer: 3600,
    tolerance: 0,
    unit: 'ways',
    explanation: 'Use Complementary Counting: Total Unrestricted Arrangements minus "Together" arrangements. Total = 7! = 5040. Together = 1440. Never together = 5040 - 1440 = 3600.',
    hints: [
      'Total arrangements without restriction = 7! = 5040.',
      'We already know "Always Together" = 1440.',
      'Subtract: Never Together = Total - Together.',
    ],
  },
  // 10. Standard: c11_math_056 - Application (Alike items)
  {
    id: 'ch_10',
    nodeId: NODE_C11_MATH_056,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the total number of distinct permutations of the letters in the telemetry code word "GAGANYAAN".',
    correctAnswer: 3780,
    tolerance: 0,
    unit: 'words',
    explanation: 'GAGANYAAN has 9 letters: G=2, A=4, N=2, Y=1. Distinct arrangements = 9! / (2! × 4! × 2! × 1!) = 362880 / (2 × 24 × 2) = 362880 / 96 = 3780.',
    hints: [
      'Count frequency of each letter: G (2), A (4), N (2), Y (1). Total = 9 letters.',
      'Apply multinomial formula: 9! / (2! × 4! × 2!).',
      'Compute: 362,880 / (2 × 24 × 2) = 362,880 / 96 = 3780.',
    ],
    misconceptionIndex: 0,
  },
  // 11. Standard: c11_math_059 - Drag-Sort (Algorithm Steps)
  {
    id: 'ch_11',
    nodeId: NODE_C11_MATH_059,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the correct logical procedure to solve: "From 6 male engineers and 4 female engineers, form a 5-member flight console team with at least 3 female engineers."',
    sortItems: [
      'Identify and enumerate mutually exclusive cases for female count: (3F, 2M) and (4F, 1M)',
      'Compute selections for Case 1 using combinations: 4C3 × 6C2',
      'Compute selections for Case 2 using combinations: 4C4 × 6C1',
      'Sum the mutually exclusive case counts: (4 × 15) + (1 × 6) = 60 + 6 = 66',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First break into disjoint admissible cases satisfying "at least 3 females", evaluate each case via combinations product, then add the cases together.',
    hints: [
      'Start by defining the exact composition cases that satisfy "at least 3".',
      'Calculate the combinations for each case separately.',
      'Add the resulting cases together using the Addition Principle.',
    ],
  },
  // 12. Standard: c11_math_060 - Application (Binomial coefficient)
  {
    id: 'ch_12',
    nodeId: NODE_C11_MATH_060,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the coefficient of x⁴ in the expansion of (x + 3)⁶.',
    correctAnswer: 135,
    tolerance: 0,
    unit: '',
    explanation: 'General term T_{k+1} = 6Ck · x^(6-k) · 3^k. For x⁴, power of x is 6 - k = 4 => k = 2. Coefficient = 6C2 · 3² = 15 · 9 = 135.',
    hints: [
      'General term has x^(6-k) and 3^k.',
      'Set 6 - k = 4 to find k = 2.',
      'Evaluate 6C2 × 3² = 15 × 9.',
    ],
    misconceptionIndex: 4,
  },
  // 13. Standard: c11_math_058 - Evaluation
  {
    id: 'ch_13',
    nodeId: NODE_C11_MATH_058,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'An avionics engineer writes: "Selecting a primary captain and a secondary navigator from a crew of 8 is the same as choosing a 2-person maintenance committee." How would you evaluate this claim?',
    options: [
      'Correct — both scenarios use 8C2 = 28 ways.',
      'Incorrect — Crew positions have distinct roles (Order Matters -> Permutation 8P2 = 56), while a committee has indistinguishable roles (Order Does Not Matter -> Combination 8C2 = 28).',
      'Incorrect — The maintenance committee is 8P2 = 56 while the crew is 8C2 = 28.',
      'Correct — because captain and navigator work together as a team.',
    ],
    correctIndex: 1,
    explanation: 'Whenever positions have distinct roles, titles, or sequences (Captain vs Navigator), swapping members produces a different outcome (AB != BA -> Permutation 8P2 = 56). In an unranked committee, {A, B} is identical to {B, A} (Combination 8C2 = 28).',
    hints: [
      'Ask the Swap Test: if Astronaut A is Captain and B is Navigator, is that the same as B being Captain and A being Navigator?',
      'Since roles are distinct, order matters for the crew!',
      'Unordered committee uses nCr; distinct roles use nPr.',
    ],
    misconceptionIndex: 3,
  },
  // 14. Standard: c11_math_056 - Application
  {
    id: 'ch_14',
    nodeId: NODE_C11_MATH_056,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How many 4-digit security codes can be generated using digits {1, 2, 3, 4, 5, 6, 7} if repetition of digits IS allowed?',
    correctAnswer: 2401,
    tolerance: 0,
    unit: 'codes',
    explanation: 'Each of the 4 positions independently has 7 available digits: 7 × 7 × 7 × 7 = 7⁴ = 2401 codes.',
    hints: [
      'Since repetition is allowed, every slot has 7 independent choices.',
      'Formula is n^r where n = 7 and r = 4.',
      '7⁴ = 2401.',
    ],
    misconceptionIndex: 0,
  },
  // 15. Advanced: c11_math_059 - Analysis (Number formation with zero)
  {
    id: 'ch_15',
    nodeId: NODE_C11_MATH_059,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How many 4-digit even numbers can be formed using digits {0, 1, 2, 3, 4, 5} without repetition? (A 4-digit number cannot have leading 0).',
    correctAnswer: 156,
    tolerance: 0,
    unit: 'numbers',
    explanation: 'Split into two mutually exclusive cases based on units digit: Case 1 (Units digit = 0): 1 choice for units. Remaining 3 positions chosen from 5 digits (1,2,3,4,5) in 5P3 = 5×4×3 = 60 ways. Case 2 (Units digit = 2 or 4): 2 choices for units. Thousands place cannot be 0 or units digit (4 choices). Hundreds place has 4 choices, Tens place has 3 choices. Ways = 2 × 4 × 4 × 3 = 96. Total = 60 + 96 = 156.',
    hints: [
      'Zero is tricky because it affects both evenness (units) and validity of thousands place (cannot be 0).',
      'Case 1: Units digit is 0. Then thousands place can be any of remaining 5 digits.',
      'Case 2: Units digit is 2 or 4 (2 choices). Thousands place has 4 choices (excluding 0 and units digit). Add the cases: 60 + 96.',
    ],
  },
  // 16. Advanced: c11_math_054 - Construct (Algebraic Proof Construction)
  {
    id: 'ch_16',
    nodeId: NODE_C11_MATH_054,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the algebraic derivation step showing why nPr = n! / (n - r)! by assembling the mathematical factors in order.',
    availableParts: ['n(n-1)(n-2)...(n-r+1)', '×', '(n-r)!', '/', '(n-r)!', '=', 'n! / (n-r)!'],
    targetState: 'n(n-1)(n-2)...(n-r+1) × (n-r)! / (n-r)! = n! / (n-r)!',
    validationHint: 'Multiply and divide the falling product of r terms by (n-r)! to complete the factorial in numerator.',
    explanation: 'Multiplying the falling product of r factors by (n-r)! completes all factors from n down to 1 (giving n! in the numerator) while retaining (n-r)! in the denominator.',
    hints: [
      'Start with the falling product of r choices: n(n-1)...(n-r+1).',
      'Multiply and divide by the missing tail: (n-r)! / (n-r)!.',
      'The numerator becomes n!, giving n! / (n-r)!.',
    ],
  },
  // 17. Advanced: c11_math_057 - Analysis (Circular restricted)
  {
    id: 'ch_17',
    nodeId: NODE_C11_MATH_057,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: '5 Indian scientists and 5 French payload specialists sit around a circular conference table. In how many ways can they sit such that NO TWO French specialists sit next to each other?',
    correctAnswer: 2880,
    tolerance: 0,
    unit: 'ways',
    explanation: 'Step 1: Seat the 5 Indian scientists around the circle first. Circular arrangements = (5 - 1)! = 4! = 24. Step 2: This creates 5 distinct gaps between them. Step 3: Arrange the 5 French specialists in these 5 gaps. Since the circle orientation is now fixed by the seated Indians, the gaps are distinct linear positions! Ways = 5P5 = 5! = 120. Total = 24 × 120 = 2880.',
    hints: [
      'Use the Gap Method: seat the unconstrained group around the circle first.',
      '5 Indian scientists create 5 gaps around the circle in (5-1)! = 24 ways.',
      'Once Indians are seated, the 5 gaps are distinguishable! French specialists sit in 5! = 120 ways. Total = 24 × 120.',
    ],
    misconceptionIndex: 2,
  },
  // 18. Advanced: c11_math_058 - Application (Pascal Identity)
  {
    id: 'ch_18',
    nodeId: NODE_C11_MATH_058,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Using Pascal’s Identity nCr + nC(r-1) = (n+1)Cr, evaluate the simplified value of: 15C4 + 15C3 + 16C5 + 17C6.',
    correctAnswer: 18564,
    tolerance: 0,
    unit: '',
    explanation: 'Apply identity recursively: (15C4 + 15C3) = 16C4. Then (16C4 + 16C5) = 17C5. Then (17C5 + 17C6) = 18C6. 18C6 = (18×17×16×15×14×13) / (6×5×4×3×2×1) = 18,564.',
    hints: [
      'Combine the first two terms: 15C4 + 15C3 = 16C4.',
      'Now combine 16C4 + 16C5 = 17C5.',
      'Finally combine 17C5 + 17C6 = 18C6 and compute its value.',
    ],
  },
  // 19. Advanced: c11_math_060 - Evaluation (Independent Term)
  {
    id: 'ch_19',
    nodeId: NODE_C11_MATH_060,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Find the term independent of x (the constant term) in the expansion of (2x - 1/x²)⁹.',
    correctAnswer: -5376,
    tolerance: 0,
    unit: '',
    explanation: 'General term T_{k+1} = 9Ck (2x)^(9-k) (-x⁻²)^k = 9Ck · 2^(9-k) · (-1)^k · x^(9 - k - 2k) = 9Ck · 2^(9-k) · (-1)^k · x^(9 - 3k). For constant term, 9 - 3k = 0 => k = 3. Value = 9C3 · 2⁶ · (-1)³ = 84 · 64 · (-1) = -5376.',
    hints: [
      'Write the general term power of x: x^(9-k) · (x⁻²)^k = x^(9 - 3k).',
      'For term independent of x, set power = 0: 9 - 3k = 0 => k = 3.',
      'Carefully evaluate 9C3 × 2⁶ × (-1)³.',
    ],
    misconceptionIndex: 4,
  },
  // 20. Advanced: c11_math_059 - Creativity (Real-World Network Optimization)
  {
    id: 'ch_20',
    nodeId: NODE_C11_MATH_059,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'In a satellite communication mesh with 10 ground stations in India, how many distinct bidirectional communication relay links (connecting pairs of stations) can be established?',
    correctAnswer: 45,
    tolerance: 0,
    unit: 'links',
    explanation: 'A bidirectional link between Station A and Station B is identical to link B-A (order does not matter). The number of straight links connecting pairs of 10 points is 10C2 = (10 × 9) / 2 = 45 links.',
    hints: [
      'Does link A <-> B differ from link B <-> A? No, it is bidirectional.',
      'Choosing any 2 stations out of 10 forms 1 distinct link.',
      'Compute 10C2 = (10 × 9) / 2 = 45.',
    ],
    misconceptionIndex: 3,
  },
];

// ─── EXPLORATION STEPS (Visual Labs) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Multiplication Tree (Stages vs Alternatives)',
    instruction: 'Adjust the sliders for Routes and Vehicle Modes to watch the decision tree split in real-time!',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_MATH_052,
  },
  {
    title: 'Lab 2: Factorial Accelerator (n!)',
    instruction: 'Drag the items count slider to see how slot options cascade: n × (n-1) × ... × 1.',
    interactionType: 'drag-classify',
    nodeId: NODE_C11_MATH_053,
  },
  {
    title: 'Lab 3: Permutation vs Combination Console',
    instruction: 'Toggle between Order Matters (nPr) and Order Irrelevant (nCr) to see duplicate subsets collapse.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C11_MATH_058,
  },
  {
    title: 'Lab 4: Circular Symmetry & Necklace Flip',
    instruction: 'Rotate the circular console or flip the 3D necklace to observe rotational and reflective invariance.',
    interactionType: 'drag-position',
    nodeId: NODE_C11_MATH_057,
  },
  {
    title: 'Lab 5: Meru Prastara / Pascal’s Triangle & Binomial Generator',
    instruction: 'Click any cell in Pascal’s Triangle to see the two parent numbers that add up to form it (n+1Cr = nCr + nC(r-1)).',
    interactionType: 'drag-match',
    nodeId: NODE_C11_MATH_061,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you have 4 distinct books on a shelf, and you tie 2 specific books together into a single block, how does the arrangement count change compared to total unrestricted (24)?',
    options: [
      'It halves to 12 (4! / 2)',
      'It becomes 12 (3! × 2! = 6 × 2 = 12)',
      'It stays 24',
      'It drops to 6 (3!)',
    ],
    correctIndex: 1,
    verifyInstruction: 'Notice how treating the pair as 1 unit gives 3 units (3! = 6), and internally the pair swaps in 2! ways => 6 × 2 = 12!',
    nodeId: NODE_C11_MATH_055,
  },
  {
    question: 'Predict: When expanding (x + y)⁵, what will be the sum of all coefficients across all 6 terms?',
    options: ['10', '25', '32 (which is 2⁵)', '64'],
    correctIndex: 2,
    verifyInstruction: 'Check by summing Row 5 of Pascal’s Triangle: 1 + 5 + 10 + 10 + 5 + 1 = 32 = 2⁵!',
    nodeId: NODE_C11_MATH_060,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the number of combinations nCr as r increases from 0 to n?',
    observableOptions: [
      'It strictly increases continuously.',
      'It strictly decreases continuously.',
      'It rises symmetrically to a maximum at the center (r = n/2) and then decreases symmetrically back to 1.',
      'It fluctuates randomly.',
    ],
    correctIndex: 2,
    nodeId: NODE_C11_MATH_058,
  },
  {
    question: 'When comparing linear seating vs round table seating for n people, what factor is removed?',
    observableOptions: [
      'A factor of 2 is subtracted.',
      'A factor of n is divided out because any of the n rotations is the same circular seating.',
      'A factor of (n-1) is multiplied.',
      'Nothing changes.',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_MATH_057,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Telemetry & Gaganyaan Mission Log',
  description: 'Design a high-reliability satellite command encoder for the Gaganyaan ground stations located at Bengaluru, Mauritius, and Svalbard.',
  steps: [
    'Calculate the total distinct 6-character transmission header codes formed from 4 letters and 2 digits with no repetition.',
    'Form an emergency response team of 4 specialists from 6 Flight Dynamics officers and 5 Life Support engineers ensuring at least 2 Life Support engineers are included.',
    'Expand the thermal radiation polynomial (T + 2K)⁴ using Pascal’s 4th row to identify the leading coefficient.',
    'Share your mission log with your classmates to verify each counting principle!',
  ],
};

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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_MATH_052,
  title: 'Fundamental Principle of Counting, Permutations & Combinations',
  definition: 'The foundational rules of combinatorics: Multiplication Principle (sequential stages m × n), Addition Principle (mutually exclusive alternatives m + n), Permutations nPr = n!/(n-r)! (ordered arrangements), Combinations nCr = n!/[r!(n-r)!] (unordered selections), and the Binomial Theorem (x+y)^n = Σ nCk x^(n-k) y^k.',
  eli5: 'When making choices: if you do this AND that, multiply choices! If you choose this OR that, add choices. If order in a line matters, use permutations. If just picking a team, use combinations. Pascal’s triangle is the secret cheat-sheet for expanding binomial powers!',
  misconceptions: [
    { misconception: 'For a 4-digit PIN, multiplying positions by options (4 × 10 = 40).', correction: 'Each position has 10 independent options, so the total is 10 × 10 × 10 × 10 = 10,000 (10⁴), not 4 × 10.' },
    { misconception: 'Adding choices when choices are sequential ("AND").', correction: 'Sequential compound stages must be multiplied (Multiplication Principle). Addition only applies to mutually exclusive alternatives ("OR").' },
    { misconception: 'In "together" restrictions, forgetting the internal arrangement of the block.', correction: 'Treat the group as 1 block to arrange with other items (e.g., 4!), but ALWAYS multiply by the internal arrangements within that block (e.g., 2!).' },
    { misconception: 'Using nPr for committee or team selection problems.', correction: 'A committee of {Aarav, Vikram} is identical to {Vikram, Aarav}. Since order does not matter, use nCr, not nPr.' },
    { misconception: 'Confusing round-table seating with flippable necklaces.', correction: 'Round table seating has left-right orientation ((n-1)!), while necklaces can be flipped in space, halving the count ((n-1)! / 2).' },
  ],
  diagnosticQuestions: [
    { question: 'A journey from Bengaluru to Chennai has 3 flights and 4 trains. How many total travel options exist?', options: ['12', '7', '81', '64'], correctIndex: 1 },
    { question: 'Evaluate 0! based on mathematical convention.', options: ['0', '1', 'Undefined', 'Infinity'], correctIndex: 1 },
    { question: 'In how many ways can 5 distinct books be arranged on a shelf?', options: ['5', '25', '120 (5!)', '24'], correctIndex: 2 },
    { question: 'What is the value of 10C3?', options: ['720', '120', '30', '1000'], correctIndex: 1 },
    { question: 'Which property represents Pascal’s identity?', options: ['nCr = nC(n-r)', 'nCr + nC(r-1) = (n+1)Cr', 'nPr = r! × nCr', 'Σ nCr = 2ⁿ'], correctIndex: 1 },
    { question: 'How many distinct arrangements of letters in "ISRO" exist?', options: ['24 (4!)', '12', '16', '64'], correctIndex: 0 },
    { question: 'How many distinct arrangements of letters in "INDIA" exist?', options: ['120 (5!)', '60 (5! / 2!)', '30', '24'], correctIndex: 1 },
    { question: 'In the expansion of (a + b)⁸, how many terms exist in total?', options: ['8', '9', '16', '64'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates deep conceptual and practical fluency in counting principles, permutations (linear, restricted, alike, circular), combinations (properties & casework), and the Binomial Theorem expansion.',
};

// ─── MAIN SIMULATION COMPONENT ───
function C11_MathematicsFundamentalPrincipleCountingSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_MATH_052,
  title = DEFAULT_PROPS.title || 'Fundamental Principle of Counting',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ─── STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints & Visual Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback components
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 200, y: 200 });

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);

  // Interactive Lab & Sandbox Variables
  const [labStageCount, setLabStageCount] = useState(3);
  const [labOptionCount, setLabOptionCount] = useState(4);
  const [isAlternativeMode, setIsAlternativeMode] = useState(false);
  const [factorialN, setFactorialN] = useState(5);
  const [combN, setCombN] = useState(6);
  const [combR, setCombR] = useState(3);
  const [isPermutationMode, setIsPermutationMode] = useState(true);
  const [circularSeatCount, setCircularSeatCount] = useState(5);
  const [isNecklaceFlipped, setIsNecklaceFlipped] = useState(false);
  const [pascalHoverCell, setPascalHoverCell] = useState<{ row: number; col: number } | null>(null);
  const [binomialPower, setBinomialPower] = useState(4);
  const [sandboxTab, setSandboxTab] = useState<'tree' | 'slots' | 'circular' | 'pascal'>('tree');

  // Drag & Sort & Input State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // BKT State Ref & Inactivity Timer
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

  // ─── BKT DIFFICULTY ADAPTATION ───
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

  // ─── CALLBACK HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const nextLevel = 1;
        if (challenge?.hints?.[0]) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(nextLevel);
          audioManager.play('hint');
          speechManager.speak(challenge.hints[0]);
        }
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, challenge]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge?.hints?.[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete mathematical explanation.');
    }
    resetInactivityTimer();
  }, [hintCount, challenge, resetInactivityTimer]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding prediction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive counting laboratory.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter the Combinatorics Sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Mission Challenge phase initiated!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive visualization to verify.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission accomplished with a mastery score of ${finalScore} percent!`);
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
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Rigorous combinatorial logic.');
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
    },
    [challenge, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]
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

  const handleStageCountChange = useCallback((val: number) => {
    setLabStageCount(val);
    audioManager.play('count');
  }, []);

  const handleOptionCountChange = useCallback((val: number) => {
    setLabOptionCount(val);
    audioManager.play('count');
  }, []);

  const handleFactorialChange = useCallback((val: number) => {
    setFactorialN(val);
    audioManager.play('count');
  }, []);

  const handleCombNChange = useCallback((val: number) => {
    setCombN(val);
    if (combR > val) setCombR(val);
    audioManager.play('count');
  }, [combR]);

  const handleCombRChange = useCallback((val: number) => {
    setCombR(val);
    audioManager.play('count');
  }, []);

  // ─── 2D CANVAS ANIMATION ───
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

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 1.5;

      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4 + frame * 0.01;
        const radius = 35 + Math.sin(frame * 0.05 + i) * 12;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#ec4899';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── HELPER CALCULATIONS ───
  const factorial = (num: number): number => {
    if (num <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  const nPr = (n: number, r: number): number => {
    if (r > n || r < 0) return 0;
    return factorial(n) / factorial(n - r);
  };

  const nCr = (n: number, r: number): number => {
    if (r > n || r < 0) return 0;
    return factorial(n) / (factorial(r) * factorial(n - r));
  };

  const pascalTriangle = useMemo(() => {
    const rows: number[][] = [];
    for (let i = 0; i <= 6; i++) {
      const row: number[] = [];
      for (let j = 0; j <= i; j++) {
        row.push(nCr(i, j));
      }
      rows.push(row);
    }
    return rows;
  }, []);

  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE! You have demonstrated flawless mastery across all ISC Counting, Permutation, and Binomial Theorem principles.';
    if (errCount <= 3) return 'Great work! Your combinatorial reasoning is highly solid. Check the spaced review schedule below.';
    if (errCount <= 7) return 'Good effort! Review the misconception diagnostics below and retry to solidify your counting intuition.';
    return 'Do not give up — You WILL get this! Keep practicing the fundamental principles and you will master it.';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER & REAL-TIME STATUS ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gold-300 via-gold-300 to-pink-300 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">ISC Class 11 Mathematics • Combinatorics & Binomial Theorem</p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl capitalize font-medium transition-all ${
                phase === p
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label={`Switch to ${p} phase`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-3xl border border-gold-800/50 shadow-xl">
            <span className="text-xs font-semibold px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full border border-gold-500/30">
              MISSION SCENARIO
            </span>
            <h2 className="text-2xl font-bold text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 text-sm sm:text-base leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-2">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800">
            <h3 className="text-lg font-semibold text-gold-300 mb-2">Curiosity Discovery: Slot Machine PIN</h3>
            <p className="text-slate-200 mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-sm sm:text-base ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-gold-500'
                  }`}
                  aria-label={`Option ${i + 1}: ${opt}`}
                >
                  <span className="font-mono text-xs px-2 py-1 bg-slate-800 rounded-lg mr-3 text-gold-300">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-gold-950/40 rounded-2xl border border-gold-800/40 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className="text-sm text-gold-200">{DISCOVERY_QUESTION.hintAfter}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-500 text-white font-bold rounded-xl shadow-lg shadow-gold-500/25 whitespace-nowrap"
                  aria-label="Proceed to Interactive Labs"
                >
                  Launch Interactive Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED LABS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full border border-gold-500/30">
              STEP {currentSlide + 1} OF {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-3 py-1 bg-slate-800 rounded-lg text-xs disabled:opacity-40"
              >
                ← Previous
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1))}
                disabled={currentSlide === EXPLORATION_STEPS.length - 1}
                className="px-3 py-1 bg-slate-800 rounded-lg text-xs disabled:opacity-40"
              >
                Next Step →
              </motion.button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-950 rounded-3xl border border-slate-800 shadow-xl space-y-5"
            >
              <div>
                <h3 className="text-xl font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: MULTIPLICATION TREE VISUALIZATION */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <div>
                      <label className="text-xs text-slate-400">
                        Stage 1 (Primary Routes: {labStageCount})
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={4}
                        value={labStageCount}
                        onChange={e => handleStageCountChange(Number(e.target.value))}
                        className="w-full accent-gold-500"
                        aria-label="Set Stage 1 Routes"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">
                        Stage 2 (Vehicles: {labOptionCount})
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={4}
                        value={labOptionCount}
                        onChange={e => handleOptionCountChange(Number(e.target.value))}
                        className="w-full accent-gold-500"
                        aria-label="Set Stage 2 Vehicles"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsAlternativeMode(!isAlternativeMode)}
                        className={`w-full py-2 rounded-xl text-xs font-bold border transition-all ${
                          isAlternativeMode
                            ? 'bg-pink-900/60 border-pink-500 text-pink-200'
                            : 'bg-gold-900/60 border-gold-500 text-gold-200'
                        }`}
                      >
                        Mode: {isAlternativeMode ? 'ADDITION (Either/Or)' : 'MULTIPLICATION (Sequential AND)'}
                      </motion.button>
                    </div>
                  </div>

                  {/* SVG Tree Graph */}
                  <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 overflow-x-auto">
                    <svg viewBox="0 0 500 240" className="w-full min-w-[400px] h-52">
                      <circle cx="40" cy="120" r="14" fill="#6366f1" />
                      <text x="40" y="124" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">
                        Start
                      </text>

                      {Array.from({ length: labStageCount }).map((_, i) => {
                        const y1 = 40 + (160 / (labStageCount > 1 ? labStageCount - 1 : 1)) * i;
                        return (
                          <g key={i}>
                            <line x1="54" y1="120" x2="160" y2={y1} stroke="#4f46e5" strokeWidth="2" />
                            <circle cx="160" cy={y1} r="10" fill="#38bdf8" />
                            <text x="160" y={y1 + 3} fill="white" fontSize="8" textAnchor="middle">
                              R{i + 1}
                            </text>

                            {!isAlternativeMode &&
                              Array.from({ length: labOptionCount }).map((_, j) => {
                                const offset = (j - (labOptionCount - 1) / 2) * 14;
                                const y2 = y1 + offset;
                                return (
                                  <g key={j}>
                                    <line x1="170" y1={y1} x2="320" y2={y2} stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 2" />
                                    <circle cx="320" cy={y2} r="6" fill="#ec4899" />
                                    <text x="335" y={y2 + 3} fill="#cbd5e1" fontSize="8">
                                      Option ({i + 1},{j + 1})
                                    </text>
                                  </g>
                                );
                              })}
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800 text-center">
                    <span className="text-sm font-semibold text-gold-200">
                      Mathematical Result:{' '}
                      {isAlternativeMode ? (
                        <span className="text-pink-300 font-mono text-base">{labStageCount} + {labOptionCount} = {labStageCount + labOptionCount} Alternatives</span>
                      ) : (
                        <span className="text-gold-300 font-mono text-base">{labStageCount} × {labOptionCount} = {labStageCount * labOptionCount} Distinct Compound Outcomes</span>
                      )}
                    </span>
                  </div>
                </div>
              )}

              {/* SLIDE 1: FACTORIAL TOWER */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <span className="text-sm text-slate-300">Set n items: {factorialN}</span>
                    <input
                      type="range"
                      min={1}
                      max={7}
                      value={factorialN}
                      onChange={e => handleFactorialChange(Number(e.target.value))}
                      className="flex-1 accent-gold-500"
                      aria-label="Set Factorial n"
                    />
                    <span className="text-xs px-2.5 py-1 bg-gold-500/20 text-gold-300 rounded-lg font-mono">
                      {factorialN}! = {factorial(factorialN)}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-7 gap-2">
                    {Array.from({ length: factorialN }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className="p-3 bg-slate-950 rounded-xl border border-gold-700/50 text-center"
                      >
                        <span className="text-xs text-slate-400">Slot {i + 1}</span>
                        <div className="text-xl font-bold text-gold-400 font-mono mt-1">
                          {factorialN - i}
                        </div>
                        <span className="text-[10px] text-slate-500">choices</span>
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-400 text-center">
                    Notice how each filled position consumes one object, leaving (n - 1), (n - 2)... down to 1.
                  </p>
                </div>
              )}

              {/* SLIDE 2: PERMUTATION VS COMBINATION */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Total items (n): {combN}</span>
                      <input
                        type="range"
                        min={3}
                        max={7}
                        value={combN}
                        onChange={e => handleCombNChange(Number(e.target.value))}
                        className="accent-gold-500 w-24"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Chosen (r): {combR}</span>
                      <input
                        type="range"
                        min={1}
                        max={combN}
                        value={combR}
                        onChange={e => handleCombRChange(Number(e.target.value))}
                        className="accent-gold-500 w-24"
                      />
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsPermutationMode(!isPermutationMode)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        isPermutationMode
                          ? 'bg-gold-900/60 border-gold-500 text-gold-200'
                          : 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                      }`}
                    >
                      {isPermutationMode ? 'Arrangements nPr (Order Matters)' : 'Selections nCr (Order Irrelevant)'}
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gold-950/30 rounded-2xl border border-gold-800/50 text-center">
                      <span className="text-xs text-gold-300 font-semibold">PERMUTATIONS (nPr)</span>
                      <div className="text-2xl font-bold text-white font-mono mt-1">
                        {nPr(combN, combR)}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{combN}! / ({combN} - {combR})!</p>
                    </div>
                    <div className="p-4 bg-emerald-950/30 rounded-2xl border border-emerald-800/50 text-center">
                      <span className="text-xs text-emerald-300 font-semibold">COMBINATIONS (nCr)</span>
                      <div className="text-2xl font-bold text-emerald-300 font-mono mt-1">
                        {nCr(combN, combR)}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {nPr(combN, combR)} / {combR}! (Divided by r!)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: CIRCULAR PERMUTATIONS */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-300">Seats (n): {circularSeatCount}</span>
                      <input
                        type="range"
                        min={3}
                        max={8}
                        value={circularSeatCount}
                        onChange={e => setCircularSeatCount(Number(e.target.value))}
                        className="accent-gold-500"
                      />
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsNecklaceFlipped(!isNecklaceFlipped)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        isNecklaceFlipped
                          ? 'bg-pink-900/60 border-pink-500 text-pink-200'
                          : 'bg-gold-900/60 border-gold-500 text-gold-200'
                      }`}
                    >
                      {isNecklaceFlipped ? '3D Necklace View (Flipped: /2)' : 'Round Table View ((n-1)!)'}
                    </motion.button>
                  </div>

                  <div className="flex justify-center p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 260 200" className="w-56 h-44">
                      <circle cx="130" cy="100" r="60" fill="none" stroke="#475569" strokeWidth="3" strokeDasharray="4 4" />
                      {Array.from({ length: circularSeatCount }).map((_, i) => {
                        const angle = (i * 2 * Math.PI) / circularSeatCount - Math.PI / 2;
                        const x = 130 + 60 * Math.cos(angle);
                        const y = 100 + 60 * Math.sin(angle);
                        return (
                          <g key={i}>
                            <circle cx={x} cy={y} r="12" fill={i === 0 ? '#6366f1' : '#38bdf8'} />
                            <text x={x} y={y + 4} fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">
                              {i === 0 ? 'Ref' : i + 1}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl text-center text-xs text-slate-300">
                    {isNecklaceFlipped ? (
                      <span>Necklace/Garland count = ({circularSeatCount} - 1)! / 2 = <strong className="text-pink-300">{factorial(circularSeatCount - 1) / 2}</strong></span>
                    ) : (
                      <span>Round table seating = ({circularSeatCount} - 1)! = <strong className="text-gold-300">{factorial(circularSeatCount - 1)}</strong></span>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 4: PASCAL'S TRIANGLE & BINOMIAL EXPANSION */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <p className="text-xs text-slate-400 mb-3">Hover over any interior cell to witness Pascal’s Addition Property:</p>
                    <div className="space-y-1.5 font-mono text-xs">
                      {pascalTriangle.map((row, rIdx) => (
                        <div key={rIdx} className="flex justify-center gap-2">
                          {row.map((val, cIdx) => {
                            const isHovered =
                              pascalHoverCell?.row === rIdx && pascalHoverCell?.col === cIdx;
                            const isParent =
                              pascalHoverCell &&
                              pascalHoverCell.row === rIdx + 1 &&
                              (pascalHoverCell.col === cIdx || pascalHoverCell.col === cIdx + 1);

                            return (
                              <motion.button
                                key={cIdx}
                                whileHover={{ scale: 1.2 }}
                                onMouseEnter={() => setPascalHoverCell({ row: rIdx, col: cIdx })}
                                className={`w-8 h-7 rounded-lg flex items-center justify-center font-bold transition-all ${
                                  isHovered
                                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/50'
                                    : isParent
                                    ? 'bg-gold-500 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                              >
                                {val}
                              </motion.button>
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    {pascalHoverCell && pascalHoverCell.row > 0 && pascalHoverCell.col > 0 && pascalHoverCell.col < pascalHoverCell.row && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-2 bg-slate-950 rounded-xl border border-amber-500/40 text-xs text-amber-300">
                        {pascalHoverCell.row}C{pascalHoverCell.col} = {pascalHoverCell.row - 1}C{pascalHoverCell.col - 1} + {pascalHoverCell.row - 1}C{pascalHoverCell.col} (i.e.{' '}
                        {pascalTriangle[pascalHoverCell.row - 1][pascalHoverCell.col - 1]} +{' '}
                        {pascalTriangle[pascalHoverCell.row - 1][pascalHoverCell.col]} ={' '}
                        {pascalTriangle[pascalHoverCell.row][pascalHoverCell.col]})
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Predict-Then-Check Section */}
          <div className="p-5 bg-slate-950 rounded-3xl border border-slate-800 space-y-3">
            <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
              PREDICT-THEN-CHECK
            </span>
            <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>

            {!predictionMade ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePrediction(i)}
                    className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-left text-slate-300 hover:border-gold-500"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-gold-950/40 rounded-xl border border-gold-800 text-xs text-gold-200">
                {PREDICTION_QUESTIONS[0].verifyInstruction}
              </motion.div>
            )}
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-slate-400">Explore all labs freely before challenges</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToSandbox}
              className="px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold rounded-xl shadow-lg shadow-gold-500/20"
            >
              Open Sandbox Mode →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: COMBINATORICS SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gold-300">Combinatorics Sandbox</h3>
                <p className="text-xs text-slate-400">Manipulate mathematical structures freely</p>
              </div>

              <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                {(['tree', 'slots', 'circular', 'pascal'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSandboxTab(tab)}
                    className={`px-3 py-1 rounded-lg capitalize font-medium ${
                      sandboxTab === tab ? 'bg-gold-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-[220px] p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
              {sandboxTab === 'tree' && (
                <div className="space-y-3 text-center">
                  <p className="text-xs text-slate-400">Total outcomes = 4 routes × 3 vehicle modes = 12 paths</p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1.5 bg-gold-950 rounded-xl border border-gold-700/50 text-xs font-mono text-gold-300"
                      >
                        Path #{i + 1}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {sandboxTab === 'slots' && (
                <div className="space-y-3">
                  <div className="flex justify-center items-center gap-3">
                    <span className="text-xs text-slate-400">Slots:</span>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="w-12 h-12 bg-slate-950 rounded-xl border border-gold-500 flex items-center justify-center font-bold text-gold-300 text-lg">
                        {7 - i}
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-xs text-gold-300">7P4 = 7 × 6 × 5 × 4 = 840 arrangements</p>
                </div>
              )}

              {sandboxTab === 'circular' && (
                <div className="text-center space-y-2">
                  <p className="text-xs text-slate-300">Seating 6 people at a round table: (6 - 1)! = 120 ways</p>
                  <p className="text-xs text-pink-300">Stringing 6 beads on a necklace: (6 - 1)! / 2 = 60 ways</p>
                </div>
              )}

              {sandboxTab === 'pascal' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs text-slate-400">Binomial Power (n): {binomialPower}</span>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={binomialPower}
                      onChange={e => setBinomialPower(Number(e.target.value))}
                      className="accent-gold-500"
                    />
                  </div>
                  <p className="text-center font-mono text-sm text-gold-300">
                    (x + y)^{binomialPower} ={' '}
                    {Array.from({ length: binomialPower + 1 })
                      .map((_, k) => {
                        const coeff = nCr(binomialPower, k);
                        const xPow = binomialPower - k;
                        const yPow = k;
                        return `${coeff > 1 || (xPow === 0 && yPow === 0) ? coeff : ''}${xPow > 0 ? (xPow === 1 ? 'x' : `x^${xPow}`) : ''}${yPow > 0 ? (yPow === 1 ? 'y' : `y^${yPow}`) : ''}`;
                      })
                      .join(' + ')}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20"
              >
                I Am Ready for Challenges! →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE STAGE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-0.5 rounded-full uppercase font-bold border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : difficulty === 'standard'
                    ? 'bg-gold-500/20 text-gold-300 border-gold-500/30'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md">
                NEP: {challenge.competencyLevel}
              </span>
            </div>

            <canvas ref={canvasRef} width={80} height={30} className="rounded-lg border border-slate-800" />
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-pink-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          <div
            className={`p-6 bg-slate-950 rounded-3xl border transition-all ${
              wrongFlash ? 'border-rose-500 bg-rose-950/30' : 'border-slate-800'
            }`}
          >
            <p className="text-base sm:text-lg text-white font-semibold leading-relaxed mb-4">
              {challenge.question}
            </p>

            {/* MCQ TYPE WITH SHAKE ANIMATION */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-2xl border text-sm sm:text-base transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-gold-500'
                      }`}
                    >
                      <span className="font-mono text-xs px-2 py-1 bg-slate-800 rounded-lg mr-3 text-gold-300">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <motion.div
                animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-wrap items-center gap-3"
              >
                <input
                  type="number"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter computed value"
                  className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-lg focus:outline-none focus:border-gold-500"
                  disabled={showExplanation}
                />
                <span className="text-slate-400 text-sm">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || numericInput === ''}
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl shadow-lg shadow-gold-600/30"
                >
                  Verify
                </motion.button>
              </motion.div>
            )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      className="px-3.5 py-2 bg-gold-600 text-white rounded-xl text-xs font-mono cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {Object.keys(challenge.correctMapping || {}).map(slotId => (
                    <div
                      key={slotId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(slotId)}
                      className="p-4 bg-slate-900 border border-dashed border-slate-700 rounded-2xl text-center min-h-[60px] flex items-center justify-center text-xs font-mono text-gold-300"
                    >
                      {droppedLabels[slotId] || `Drop Formula: ${slotId.replace('slot_', '')}`}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl font-bold text-sm"
                >
                  Confirm Mapping
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-2">
                {(sortArrangement.length > 0
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, dIdx) => (
                  <motion.div
                    key={dIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(dIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, dIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-gold-400 font-bold flex items-center justify-center text-xs">
                      {dIdx + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-3 px-6 py-2.5 bg-gold-600 text-white rounded-xl font-bold text-sm"
                >
                  Validate Order
                </motion.button>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 text-gold-300 rounded-lg text-xs font-mono border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gold-950 text-white rounded-md text-xs font-mono border border-gold-700 flex items-center gap-1.5">
                      {p}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click mathematical tokens above to assemble proof</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl font-bold text-sm"
                >
                  Verify Algebraic Proof
                </motion.button>
              </div>
            )}

            {/* STEP-BY-STEP EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-600/50 rounded-2xl space-y-3"
              >
                <h4 className="text-sm font-bold text-amber-300">Mathematical Proof & Explanation:</h4>
                <div className="space-y-2 text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((step, idx) => (
                      <motion.p key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                        <span className="font-bold text-amber-400">{idx + 1}.</span> {step}
                        {!step.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-amber-700 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Deductive Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mission →' : 'Next Mission Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: MISSION COMPLETION & MASTERY PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-950 rounded-3xl border border-gold-700/50 shadow-2xl text-center space-y-4">
            <span className="text-4xl">🛰️</span>
            <h2 className="text-3xl font-extrabold text-white">Gaganyaan Mission Complete!</h2>
            <p className="text-gold-300 text-sm sm:text-base">
              Mastery Score:{' '}
              <strong className="text-emerald-400 text-xl">{Math.max(0, 100 - errors * 5)}%</strong> (Status:{' '}
              <span className="capitalize text-gold-300">{masteryLevel}</span>)
            </p>

            {/* MOTIVATIONAL FEEDBACK WITH EXACT TIERS */}
            <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-600/40 text-xs sm:text-sm text-emerald-200 max-w-2xl mx-auto font-medium">
              {getMotivationalFeedback(errors)}
            </div>
          </div>

          {/* Misconception Tracking Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-3xl border border-rose-800/50 space-y-3">
              <h3 className="text-base font-bold text-rose-300">Your Diagnostic Learning Gaps:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-rose-900/60 text-xs space-y-1">
                      <p className="text-rose-300 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-5 bg-amber-950/40 rounded-3xl border border-amber-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-amber-300">Spaced Repetition Schedule (SM-2):</h4>
              <p className="text-xs text-slate-300 mt-1">
                Next scheduled retention review:{' '}
                <strong className="text-amber-200">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : 'Tomorrow (1 Day)'}
                </strong>
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('explore');
                setCurrentChallenge(0);
                setErrors(0);
              }}
              className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold"
            >
              Re-explore Labs
            </motion.button>
          </div>

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-lg font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
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

      {/* ─── SIM-ENGINE FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Solved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_MathematicsFundamentalPrincipleCountingSim;
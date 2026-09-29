'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERALS ───
const NODE_C6_MATH_031 = 'c6_math_031';
const NODE_C6_MATH_032 = 'c6_math_032';
const NODE_C6_MATH_033 = 'c6_math_033';
const NODE_C6_MATH_034 = 'c6_math_034';
const NODE_C6_MATH_035 = 'c6_math_035';
const NODE_C6_MATH_036 = 'c6_math_036';
const NODE_C6_MATH_037 = 'c6_math_037';
const NODE_C6_MATH_038 = 'c6_math_038';
const NODE_C6_MATH_039 = 'c6_math_039';
const NODE_C6_MATH_040 = 'c6_math_040';

const ALL_NODE_IDS = [
  NODE_C6_MATH_031,
  NODE_C6_MATH_032,
  NODE_C6_MATH_033,
  NODE_C6_MATH_034,
  NODE_C6_MATH_035,
  NODE_C6_MATH_036,
  NODE_C6_MATH_037,
  NODE_C6_MATH_038,
  NODE_C6_MATH_039,
  NODE_C6_MATH_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Indian Festival Bazaar & Math Workshop',
  intro: 'You are the Chief Inventory & Pricing Architect for the grand Diwali Mela in Jaipur. You must organise festival gift boxes using BODMAS order, group decorative diya lamps into equal factor trays, test shipment crate numbers for divisibility, balance sweet recipes with ratio & proportion, and calculate express transport rates using the unitary method!',
  context: 'Mastering brackets, number properties, prime building blocks, and proportional reasoning will make the festival run seamlessly and earn you the Grand Gold Artisan Medal.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In festival budgeting, if you calculate: 20 - 4 + 3. What is the true result according to BODMAS?',
  options: [
    '19 (work left-to-right: 20 - 4 = 16, then 16 + 3 = 19)',
    '13 (add first: 4 + 3 = 7, then 20 - 7 = 13)',
    '27 (add everything together)',
    '11 (subtract both from 20)',
  ],
  correctIndex: 0,
  hintAfter: 'Remember: Addition and subtraction have equal priority in BODMAS. We work strictly from left to right!',
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

// ─── CHALLENGES ARRAY (21 Challenges: Foundation, Standard, Advanced across all 10 nodes) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - BODMAS Nested Brackets (c6_math_031)
  {
    id: 'ch_01',
    nodeId: NODE_C6_MATH_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Simplify the nested gift-box expression: 25 - [10 - {6 - (4 - 2)}]. Which layer must be evaluated first?',
    options: [
      'Innermost parentheses (4 - 2) = 2',
      'Square brackets [10 - 6] = 4',
      'Outer subtraction 25 - 10 = 15',
      'Curly braces {6 - 4} = 2',
    ],
    correctIndex: 0,
    explanation: 'Always evaluate innermost brackets first. (4 - 2) = 2, then {6 - 2} = 4, then [10 - 4] = 6, and finally 25 - 6 = 19.',
    hints: [
      'Think of nested gift boxes: you must unwrap the smallest innermost box first.',
      'Parentheses ( ) sit inside curly braces { } which sit inside square brackets [ ].',
      'Evaluate (4 - 2) first, which gives 2.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation - Drag Label: BODMAS Layers (c6_math_031)
  {
    id: 'ch_02',
    nodeId: NODE_C6_MATH_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each bracket type to its correct nesting order priority from inside to outside.',
    dragItems: [
      { label: 'Parentheses ( )', targetId: 'layer_inner' },
      { label: 'Curly Braces { }', targetId: 'layer_middle' },
      { label: 'Square Brackets [ ]', targetId: 'layer_outer' },
    ],
    correctMapping: {
      layer_inner: 'Parentheses ( )',
      layer_middle: 'Curly Braces { }',
      layer_outer: 'Square Brackets [ ]',
    },
    explanation: 'Parentheses ( ) are innermost (Step 1), curly braces { } are middle (Step 2), and square brackets [ ] are outermost (Step 3).',
    hints: [
      'The round brackets ( ) are solved first at the deepest core.',
      'Curly braces { } enclose the round ones.',
      'Square brackets [ ] form the outermost shell.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Factors & Multiples (c6_math_032)
  {
    id: 'ch_03',
    nodeId: NODE_C6_MATH_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A potter packs 24 diyas into equal rectangular trays. Which of the following is a complete list of factors of 24?',
    options: [
      '1, 2, 3, 4, 6, 8, 12, 24',
      '2, 4, 6, 8, 12, 24 (omitting 1 and 3)',
      '1, 2, 4, 6, 12, 24 (omitting 3 and 8)',
      '24, 48, 72, 96 (these are multiples, not factors)',
    ],
    correctIndex: 0,
    explanation: 'Pairs that multiply to 24: 1x24, 2x12, 3x8, 4x6. The full list in ascending order is 1, 2, 3, 4, 6, 8, 12, 24.',
    hints: [
      'Factors divide 24 with 0 remainder. Look for factor pairs.',
      'Do not forget 1 and 24 itself.',
      'Pairs are (1,24), (2,12), (3,8), (4,6). Total 8 factors.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Divisibility by 3 and 9 (c6_math_033)
  {
    id: 'ch_04',
    nodeId: NODE_C6_MATH_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A shipment batch code is 3468. How do we test whether 3468 is divisible by 3?',
    options: [
      'Sum the digits: 3+4+6+8 = 21. Since 21 is divisible by 3, 3468 is divisible by 3.',
      'Check only the last digit 8; since 8 is even, it is divisible by 3.',
      'Check the last two digits 68; since 68/4 = 17, it is divisible by 3.',
      'Subtract the last digit from the rest: 346 - 8 = 338.',
    ],
    correctIndex: 0,
    explanation: 'Divisibility by 3 and 9 uses digit sum. 3 + 4 + 6 + 8 = 21, and 21 / 3 = 7 (no remainder), so 3468 is divisible by 3.',
    hints: [
      'Powers of 10 leave remainder 1 when divided by 3, so digit sum works.',
      'Add 3 + 4 + 6 + 8.',
      '21 is a multiple of 3.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation - Prime vs Composite (c6_math_034)
  {
    id: 'ch_05',
    nodeId: NODE_C6_MATH_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following statements about prime numbers is TRUE?',
    options: [
      '2 is the only even prime number; 1 is neither prime nor composite.',
      'All odd numbers are prime numbers.',
      '1 is the smallest prime number.',
      '9 is a prime number because it is odd.',
    ],
    correctIndex: 0,
    explanation: 'A prime has exactly two distinct factors: 1 and itself. 2 is prime (factors 1, 2) and the only even prime. 1 has only one factor. 9 has factors 1, 3, 9 so it is composite.',
    hints: [
      'A prime number must have exactly two distinct factors.',
      'Does 1 have two distinct factors? No, only one.',
      '2 has factors 1 and 2, so it is the smallest and only even prime.',
    ],
    misconceptionIndex: 4,
  },
  // 6. Foundation - Fraction vs Ratio (c6_math_036)
  {
    id: 'ch_06',
    nodeId: NODE_C6_MATH_036,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a festival stall, there are 20 gulab jamuns and 15 rasgullas (total 35 sweets). Which statement correctly distinguishes fraction from ratio?',
    options: [
      'Fraction of gulab jamuns is 20/35 (part-to-whole); ratio of gulab jamuns to rasgullas is 20:15 or 4:3 (quantity-to-quantity).',
      'The fraction and the ratio are identical: both are 20/15.',
      'Ratio is part-to-whole (20:35) and fraction is quantity-to-quantity (20/15).',
      'A ratio has units like "sweets", while a fraction has no units.',
    ],
    correctIndex: 0,
    explanation: 'A fraction compares part to whole (20 out of 35 = 4/7). A ratio compares two independent quantities directly (20 to 15 = 4:3).',
    hints: [
      'Fraction = Part / Total Whole.',
      'Ratio = Quantity A : Quantity B.',
      'Gulab jamuns / Total = 20/35; Gulab jamuns : Rasgullas = 20:15.',
    ],
    misconceptionIndex: 5,
  },
  // 7. Foundation - Concept of Ratio (c6_math_037)
  {
    id: 'ch_07',
    nodeId: NODE_C6_MATH_037,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A tea master mixes 600 ml of milk with 400 ml of brewed decoction. When expressed in simplest form a:b, what is antecedent a if consequent b is 2?',
    correctAnswer: 3,
    tolerance: 0,
    unit: '',
    explanation: '600:400 = (600/200):(400/200) = 3:2. The antecedent is 3 and the consequent is 2.',
    hints: [
      'Divide both 600 and 400 by their HCF 200.',
      '600/200 = 3 and 400/200 = 2.',
      'The ratio is 3:2. Antecedent is 3.',
    ],
    misconceptionIndex: 6,
  },
  // 8. Standard - Drag Sort: Solving Nested Expression (c6_math_031)
  {
    id: 'ch_08',
    nodeId: NODE_C6_MATH_031,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the steps in correct mathematical order to simplify: 40 - [20 - {15 - (12 - 7)}].',
    sortItems: [
      'Solve parentheses: (12 - 7) = 5 to get 40 - [20 - {15 - 5}]',
      'Solve curly braces: {15 - 5} = 10 to get 40 - [20 - 10]',
      'Solve square brackets: [20 - 10] = 10 to get 40 - 10',
      'Perform final subtraction: 40 - 10 = 30',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: '1. Innermost (12 - 7) = 5. 2. Curly {15 - 5} = 10. 3. Square [20 - 10] = 10. 4. Outermost 40 - 10 = 30.',
    hints: [
      'Start with the innermost round bracket (12 - 7).',
      'Next unwrap the curly brace {15 - 5}.',
      'Then evaluate the square bracket [20 - 10], followed by 40 - 10.',
    ],
    misconceptionIndex: 1,
  },
  // 9. Standard - Divisibility by 11 Rule (c6_math_033)
  {
    id: 'ch_09',
    nodeId: NODE_C6_MATH_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Test crate code 2541 for divisibility by 11 using the alternating sum rule (counting from right: units is place 1).',
    options: [
      'Odd places (1 + 5 = 6), Even places (4 + 2 = 6). Difference 6 - 6 = 0. Yes, divisible by 11.',
      'Odd places (2 + 4 = 6), Even places (5 + 1 = 6). Difference 0, but 2541 is odd so not divisible.',
      'Sum all digits: 2+5+4+1 = 12. Since 12 is not 11, it is not divisible.',
      'Last two digits 41 / 11 has remainder, so not divisible.',
    ],
    correctIndex: 0,
    explanation: 'From right: Place 1=1 (odd), Place 2=4 (even), Place 3=5 (odd), Place 4=2 (even). Odd sum = 1+5=6; Even sum = 4+2=6; Difference = 6-6=0. Since difference is 0, 2541 is divisible by 11 (2541 = 11 x 231).',
    hints: [
      'Count places from right to left: Units=1 (odd), Tens=2 (even), Hundreds=3 (odd), Thousands=4 (even).',
      'Sum of odd places: 1 + 5 = 6. Sum of even places: 4 + 2 = 6.',
      'Difference = 6 - 6 = 0. A difference of 0 or multiple of 11 means divisible!',
    ],
    misconceptionIndex: 3,
  },
  // 10. Standard - Co-Prime Analysis (c6_math_034)
  {
    id: 'ch_10',
    nodeId: NODE_C6_MATH_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why are the numbers 8 and 15 called co-prime, even though neither 8 nor 15 is a prime number?',
    options: [
      'Factors of 8 are {1,2,4,8} and factors of 15 are {1,3,5,15}; their only common factor is 1.',
      'Because both numbers are composite and odd.',
      'Because their sum 8 + 15 = 23 is a prime number.',
      'Because 8 divides 15 with remainder 7.',
    ],
    correctIndex: 0,
    explanation: 'Co-prime is a property of a PAIR of numbers whose Highest Common Factor (HCF) is 1. Neither number needs to be prime individually.',
    hints: [
      'List all factors of 8: 1, 2, 4, 8.',
      'List all factors of 15: 1, 3, 5, 15.',
      'What factors do they share? Only 1. Hence HCF = 1.',
    ],
    misconceptionIndex: 4,
  },
  // 11. Standard - Prime Factorisation by Division (c6_math_034)
  {
    id: 'ch_11',
    nodeId: NODE_C6_MATH_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Express 84 as a product of prime factors in index form using successive division by prime numbers.',
    options: [
      '2�� × 3 × 7 (i.e., 2 × 2 × 3 × 7 = 84)',
      '4 × 21 (4 and 21 are not prime)',
      '2³ × 3 × 7 (which equals 168)',
      '2 × 3² × 7 (which equals 126)',
    ],
    correctIndex: 0,
    explanation: '84 ÷ 2 = 42; 42 ÷ 2 = 21; 21 ÷ 3 = 7; 7 ÷ 7 = 1. Prime factors: 2, 2, 3, 7 = 2² × 3 × 7.',
    hints: [
      'Divide by smallest prime 2: 84 / 2 = 42.',
      'Divide 42 by 2 = 21.',
      'Divide 21 by 3 = 7. Prime factorisation is 2 × 2 × 3 × 7.',
    ],
    misconceptionIndex: 4,
  },
  // 12. Standard - HCF and LCM Product Formula (c6_math_035)
  {
    id: 'ch_12',
    nodeId: NODE_C6_MATH_035,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Two decorative light string lengths are 12 m and 18 m. Their HCF is 6. Using LCM × HCF = Product of two numbers, what is their LCM?',
    correctAnswer: 36,
    tolerance: 0,
    unit: 'm',
    explanation: 'Product of numbers = 12 × 18 = 216. LCM = Product / HCF = 216 / 6 = 36.',
    hints: [
      'Formula: LCM × HCF = Number A × Number B.',
      '12 × 18 = 216.',
      'LCM = 216 ÷ 6 = 36.',
    ],
    misconceptionIndex: 7,
  },
  // 13. Standard - Proportion Cross Product (c6_math_038)
  {
    id: 'ch_13',
    nodeId: NODE_C6_MATH_038,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Are the four numbers 6, 9, 10, 15 in proportion (6:9 = 10:15)? Verify using extremes and means.',
    options: [
      'Yes, because Product of Extremes (6 × 15 = 90) equals Product of Means (9 × 10 = 90).',
      'No, because 6 + 15 = 21 while 9 + 10 = 19.',
      'No, because 6 and 9 are single digits while 10 and 15 are double digits.',
      'Yes, because 9 - 6 = 3 and 15 - 10 = 5.',
    ],
    correctIndex: 0,
    explanation: 'In a proportion a:b = c:d, Product of Extremes (a × d) = Product of Means (b × c). Here 6 × 15 = 90 and 9 × 10 = 90. Equal, so they form a proportion.',
    hints: [
      'Extremes are outer terms: 6 and 15.',
      'Means are inner terms: 9 and 10.',
      'Check if 6 × 15 equals 9 × 10.',
    ],
    misconceptionIndex: 8,
  },
  // 14. Standard - Unitary Method Direct Variation (c6_math_039)
  {
    id: 'ch_14',
    nodeId: NODE_C6_MATH_039,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If 6 kg of premium Basmati rice costs ₹240, what is the cost of 9 kg using the unitary method?',
    correctAnswer: 360,
    tolerance: 0,
    unit: '₹',
    explanation: 'Step 1: Cost of 1 kg = 240 ÷ 6 = ₹40 (unit rate). Step 2: Cost of 9 kg = 40 × 9 = ₹360.',
    hints: [
      'Step 1: Find cost of 1 kg by dividing 240 by 6.',
      '1 kg costs ₹40.',
      'Step 2: Multiply unit cost ₹40 by 9 kg.',
    ],
    misconceptionIndex: 9,
  },
  // 15. Advanced - Real-life HCF Problem (c6_math_035)
  {
    id: 'ch_15',
    nodeId: NODE_C6_MATH_035,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A sweet vendor has 30 kaju katlis and 45 besan laddoos. He wants to pack them into identical gift boxes with equal numbers of each sweet and none left over. What is the MAXIMUM number of boxes he can make?',
    correctAnswer: 15,
    tolerance: 0,
    unit: 'boxes',
    explanation: 'Maximum equal grouping requires HCF of 30 and 45. 30 = 2 × 3 × 5, 45 = 3² × 5. Common prime powers: 3¹ × 5¹ = 15. Each of the 15 boxes gets 2 kaju katlis and 3 laddoos.',
    hints: [
      '"Maximum equal groups with none left over" indicates HCF.',
      'Find the Highest Common Factor of 30 and 45.',
      'Factors of 30 are 1,2,3,5,6,10,15,30. Factors of 45 are 1,3,5,9,15,45. The highest common is 15.',
    ],
    misconceptionIndex: 7,
  },
  // 16. Advanced - Real-life LCM Problem (c6_math_035)
  {
    id: 'ch_16',
    nodeId: NODE_C6_MATH_035,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Two festival temple bells toll at intervals of 4 minutes and 6 minutes. If they toll together at 9:00 AM, after how many minutes will they next toll together?',
    correctAnswer: 12,
    tolerance: 0,
    unit: 'minutes',
    explanation: 'Next common simultaneous occurrence requires LCM of 4 and 6. 4 = 2², 6 = 2 × 3. LCM = 2² × 3 = 12 minutes (at 9:12 AM).',
    hints: [
      '"Next repeating coincidence time" indicates Lowest Common Multiple (LCM).',
      'Multiples of 4: 4, 8, 12, 16, 20...',
      'Multiples of 6: 6, 12, 18, 24... The smallest common multiple is 12.',
    ],
    misconceptionIndex: 7,
  },
  // 17. Advanced - Construct Distributive Expression (c6_math_031)
  {
    id: 'ch_17',
    nodeId: NODE_C6_MATH_031,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the expanded distributive expression for 7 × (10 + 4). Click terms in order to build the formula.',
    availableParts: ['7×10', '+', '7×4', '-', '10×4', '7+10', '7+4'],
    targetState: '7×10 + 7×4',
    validationHint: 'The distributive property says a × (b + c) = a×b + a×c.',
    explanation: 'By the distributive property, multiplying across addition gives 7 × (10 + 4) = 7×10 + 7×4 = 70 + 28 = 98.',
    hints: [
      'Distribute the factor 7 to both 10 and 4.',
      'Part 1 is 7×10, operator is +, Part 2 is 7×4.',
      'Select 7×10, then +, then 7×4.',
    ],
    misconceptionIndex: 1,
  },
  // 18. Advanced - Ratio Sharing Word Problem (c6_math_040)
  {
    id: 'ch_18',
    nodeId: NODE_C6_MATH_040,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A festival cash prize of ₹960 is shared between Priya and Riya in the ratio 3:5. How much money in rupees does Riya receive?',
    correctAnswer: 600,
    tolerance: 0,
    unit: '₹',
    explanation: 'Total parts = 3 + 5 = 8. Value of 1 part = 960 ÷ 8 = ₹120. Riya has 5 parts = 5 × 120 = ₹600 (Priya gets 3 × 120 = ₹360).',
    hints: [
      'Step 1: Total parts = 3 + 5 = 8 parts.',
      'Step 2: 1 part = ₹960 ÷ 8 = ₹120.',
      'Step 3: Riya has 5 parts. 5 × ₹120 = ₹600.',
    ],
    misconceptionIndex: 6,
  },
  // 19. Advanced - Speed Distance Unitary Method (c6_math_040)
  {
    id: 'ch_19',
    nodeId: NODE_C6_MATH_040,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'The Jaipur Superfast Express travels 240 km in 4 hours at constant speed. How far will it travel in 7 hours at this same speed?',
    correctAnswer: 420,
    tolerance: 0,
    unit: 'km',
    explanation: 'Speed (unit rate) = 240 km ÷ 4 h = 60 km/h. Distance in 7 hours = 60 km/h × 7 h = 420 km.',
    hints: [
      'Find speed in 1 hour: 240 ÷ 4.',
      'Speed is 60 km per hour.',
      'Distance in 7 hours = 60 × 7 = 420 km.',
    ],
    misconceptionIndex: 9,
  },
  // 20. Advanced - Evaluation: Identifying Common Error (c6_math_031)
  {
    id: 'ch_20',
    nodeId: NODE_C6_MATH_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Student A simplifies 16 - 8 + 4 as 16 - (8 + 4) = 16 - 12 = 4. Student B simplifies it as (16 - 8) + 4 = 8 + 4 = 12. Evaluate who is correct and why.',
    options: [
      'Student B is correct: Addition and subtraction have equal rank and must be done strictly Left-to-Right.',
      'Student A is correct: In BODMAS, A (Addition) comes before S (Subtraction) so you must add 8+4 first.',
      'Both are correct depending on how the brackets are placed.',
      'Neither is correct; the answer is 16.',
    ],
    correctIndex: 0,
    explanation: 'In BODMAS, Multiplication and Division have equal rank (Left-to-Right), and Addition and Subtraction have equal rank (Left-to-Right). 16 - 8 + 4 must be calculated left-to-right: (16 - 8) + 4 = 8 + 4 = 12. Inserting brackets changes the expression.',
    hints: [
      'BODMAS does not mean addition always beats subtraction.',
      'When operations of equal priority appear, work strictly from left to right.',
      'Left to right: 16 - 8 = 8, then 8 + 4 = 12.',
    ],
    misconceptionIndex: 0,
  },
  // 21. Advanced - Missing Term of Proportion (c6_math_038)
  {
    id: 'ch_21',
    nodeId: NODE_C6_MATH_038,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'On a festival map scale, 3 cm represents 45 km. If two bazaar pavilions are 7 cm apart on the map, what is their real distance in km (find x in 3:45 = 7:x)?',
    correctAnswer: 105,
    tolerance: 0,
    unit: 'km',
    explanation: 'In 3:45 = 7:x, product of extremes = product of means: 3 × x = 45 × 7 = 315. x = 315 ÷ 3 = 105 km.',
    hints: [
      'Set up cross multiplication: 3 × x = 45 × 7.',
      '45 × 7 = 315.',
      'x = 315 ÷ 3 = 105 km.',
    ],
    misconceptionIndex: 8,
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
  nodeId: NODE_C6_MATH_031,
  title: 'Simplification of Brackets, Factors, Primes, HCF/LCM & Proportion',
  definition: 'Systematic calculation of numerical expressions using BODMAS order of operations, factor and divisibility rules, prime factorisation, HCF/LCM product relations, ratio comparisons, proportions, and direct unitary methods.',
  eli5: 'Like nested gift boxes, unwrap math from inside out! Break numbers into prime building blocks, compare parts to find secret ratios, and scale rates using the price of one.',
  misconceptions: [
    { misconception: 'Addition always comes before subtraction because A comes before S in BODMAS', correction: 'Addition and Subtraction have equal priority; evaluate strictly from left to right.' },
    { misconception: 'Solve outermost square brackets before inner round parentheses', correction: 'Always solve the innermost bracket first and peel outward layer by layer.' },
    { misconception: 'A bigger number always has more factors than a smaller number', correction: 'Factor count depends on prime structure (e.g. 12 has 6 factors, while 13 has only 2).' },
    { misconception: 'For divisibility by 4, only the last digit needs to be even', correction: 'The last TWO digits must form a number divisible by 4 (e.g. 78 is even but not divisible by 4).' },
    { misconception: 'All odd numbers are prime numbers or co-prime requires both numbers to be prime', correction: '9 and 15 are odd composites; 8 and 15 are composite but co-prime since their HCF is 1.' },
    { misconception: 'A ratio 3:4 is the same as a fraction 3/4', correction: 'Fraction is part-to-whole (3 out of 4), while ratio is quantity-to-quantity (3 of A for every 4 of B).' },
    { misconception: 'For HCF choose highest powers of prime factors', correction: 'HCF uses LOWEST powers of common prime factors; LCM uses HIGHEST powers of all prime factors.' },
    { misconception: 'Proportion is true if numbers simply grow or add up', correction: 'Proportion requires equal cross-products: Product of Extremes = Product of Means (ad = bc).' },
    { misconception: 'Unitary method can jump to the final amount without finding unit value', correction: 'Must first compute the unit rate (value of 1) by division, then multiply to find the required amount.' },
  ],
  diagnosticQuestions: [
    { question: 'What is 18 - 6 + 4 according to BODMAS?', options: ['16 (left to right: 18-6=12, 12+4=16)', '8 (18 - 10)', '20', '14'], correctIndex: 0 },
    { question: 'What is the innermost bracket in 20 - [12 - {5 - (3 - 1)}]?', options: ['Parentheses (3 - 1)', 'Curly braces {5 - ...}', 'Square brackets [12 - ...]', '20 - 12'], correctIndex: 0 },
    { question: 'Is 9 a prime number?', options: ['No, factors are 1, 3, 9 (composite)', 'Yes, it is odd', 'Yes, it is divisible by 3', 'Neither'], correctIndex: 0 },
    { question: 'Which pair of numbers is co-prime?', options: ['8 and 15 (HCF is 1)', '12 and 18 (HCF is 6)', '6 and 9 (HCF is 3)', '10 and 25 (HCF is 5)'], correctIndex: 0 },
    { question: 'What is the HCF of 12 and 18?', options: ['6 (common 2¹ × 3¹)', '36', '2', '3'], correctIndex: 0 },
    { question: 'If 4 pens cost ₹20, what is the cost of 7 pens?', options: ['₹35 (1 pen = ₹5, 7 × 5 = ₹35)', '₹40', '₹28', '₹50'], correctIndex: 0 },
    { question: 'In ratio 4:3, what is 4 called?', options: ['Antecedent', 'Consequent', 'Denominator', 'Mean'], correctIndex: 0 },
    { question: 'Is 2541 divisible by 11?', options: ['Yes (difference of odd and even digit sums is 0)', 'No (ends in 1)', 'No (sum is 12)', 'Only divisible by 3'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery is achieved when students correctly simplify multi-layer brackets, factorise primes, verify HCF/LCM relations, and solve ratio-proportion word problems with >80% accuracy.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (Brilliant.org style) ───
const EXPLORATION_STEPS = [
  {
    title: 'Interactive BODMAS Box Peeler',
    instruction: 'Click each bracket layer from inside out to peel the expression and observe the intermediate values.',
    interactionType: 'click-bracket-layers',
    nodeId: NODE_C6_MATH_031,
  },
  {
    title: 'Factor Grid & Multiples Matrix',
    instruction: 'Adjust the target number slider to see counters arrange into perfect rectangular factor arrays.',
    interactionType: 'slider-factor-grid',
    nodeId: NODE_C6_MATH_032,
  },
  {
    title: 'Divisibility Rule Pattern Inspector',
    instruction: 'Type or slide any number to watch the digit sum, last digits, and alternating sums light up in real time.',
    interactionType: 'divisibility-inspector',
    nodeId: NODE_C6_MATH_033,
  },
  {
    title: 'Prime Factorisation & HCF-LCM Venn Balance',
    instruction: 'Adjust Number A and Number B to see their prime factors populate a Venn diagram and compute HCF and LCM instantly.',
    interactionType: 'prime-venn-balance',
    nodeId: NODE_C6_MATH_035,
  },
  {
    title: 'Proportion & Unitary Rate Scale',
    instruction: 'Slide the item count to watch the unitary scale find the price of 1 unit and calculate total cost proportionally.',
    interactionType: 'unitary-rate-scale',
    nodeId: NODE_C6_MATH_039,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you have the expression 20 - (8 + 2), what happens if you mistakenly remove the bracket without adding first?',
    options: [
      'You get 20 - 8 + 2 = 14, which is 4 more than the true answer (10)!',
      'You get the exact same answer 10.',
      'You get 20 - 10 = 10.',
      'The result becomes negative.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Click the bracket layers in Step 1 to see how (8 + 2) = 10 forces 20 - 10 = 10.',
    nodeId: NODE_C6_MATH_031,
  },
  {
    question: 'Predict: If Number A is 12 and Number B is 18, will their HCF × LCM equal 12 × 18 = 216?',
    options: [
      'Yes, for any two numbers, HCF × LCM ALWAYS equals their product (6 × 36 = 216).',
      'No, LCM is always twice the product.',
      'Only if both numbers are prime.',
      'Only if one number is odd.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the sliders in Step 4 to 12 and 18 to observe HCF=6, LCM=36 and their product balance.',
    nodeId: NODE_C6_MATH_035,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What pattern do you observe when arranging 24 counters into rectangles on the factor grid?',
    observableOptions: [
      'Factor pairs meet in the middle at 4 × 6; beyond that they just repeat (6 × 4, 8 × 3).',
      'Odd numbers cannot form any rectangular grids.',
      'Every number has exactly 10 factors.',
      'Only prime numbers can form rectangles.',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_MATH_032,
  },
  {
    question: 'In the Unitary Method visualizer, what remains CONSTANT as you change the number of items?',
    observableOptions: [
      'The unit rate (cost of 1 item) remains completely unchanged.',
      'The total cost remains constant.',
      'The number of items multiplied by cost is constant.',
      'The tax percentage keeps doubling.',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_MATH_039,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Diwali Sweet Box Budget Architect',
  description: 'Design your own 3-item festival gift box using ratios, HCF grouping, and unitary pricing for a school community event.',
  steps: [
    'Choose 3 sweet types (e.g., 24 Laddoos, 36 Barfis, 48 Pedas).',
    'Calculate the HCF of the quantities to find the maximum number of identical boxes.',
    'Find the ratio of each sweet type per box.',
    'Use the unitary method to calculate the total cost if 1 kg of sweets costs ₹320.',
  ],
};

// ─── MAIN COMPONENT ───
export function C6_MathematicsSimplificationBracketsSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'blue' };

  // ─── CORE APP STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── DISCOVERY STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [selectedDiscoveryOption, setSelectedDiscoveryOption] = useState<number | null>(null);

  // ─── PREDICTION & OBSERVATION STATE ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── REFLECTION ANSWERS STATE ───
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // ─── INTERACTIVE LAB 1 STATE: BODMAS Bracket Peeler ───
  const [bracketLayerStep, setBracketLayerStep] = useState(0);
  const [exprNumA, setExprNumA] = useState(25);
  const [exprNumB, setExprNumB] = useState(10);
  const [exprNumC, setExprNumC] = useState(6);
  const [exprNumD, setExprNumD] = useState(4);
  const [exprNumE, setExprNumE] = useState(2);

  // ─── INTERACTIVE LAB 2 STATE: Factor Grid ───
  const [factorTargetNum, setFactorTargetNum] = useState(24);
  const [selectedFactorPair, setSelectedFactorPair] = useState<[number, number]>([4, 6]);

  // ─── INTERACTIVE LAB 3 STATE: Divisibility Inspector ───
  const [testNumber, setTestNumber] = useState(2574);

  // ─── INTERACTIVE LAB 4 STATE: Prime Venn & HCF/LCM ───
  const [vennNumA, setVennNumA] = useState(12);
  const [vennNumB, setVennNumB] = useState(18);

  // ─── INTERACTIVE LAB 5 STATE: Unitary Rate Scale ───
  const [unitItemCount, setUnitItemCount] = useState(5);
  const [baseTotalCost, setBaseTotalCost] = useState(200);
  const [targetItemCount, setTargetItemCount] = useState(8);

  // ─── CHALLENGE INTERACTION STATE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── VISUAL FEEDBACK & FX STATE ───
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGES FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── HELPER COMPUTATIONS ───
  const factorsOfTarget = useMemo(() => {
    const list: number[] = [];
    for (let i = 1; i <= factorTargetNum; i++) {
      if (factorTargetNum % i === 0) list.push(i);
    }
    return list;
  }, [factorTargetNum]);

  const factorPairs = useMemo(() => {
    const pairs: [number, number][] = [];
    for (let i = 1; i * i <= factorTargetNum; i++) {
      if (factorTargetNum % i === 0) {
        pairs.push([i, factorTargetNum / i]);
      }
    }
    return pairs;
  }, [factorTargetNum]);

  // Divisibility checks for testNumber
  const divisibilityResults = useMemo(() => {
    const n = Math.abs(testNumber) || 0;
    const str = String(n);
    const digits = str.split('').map(Number);
    const sumDigits = digits.reduce((a, b) => a + b, 0);
    const last1 = n % 10;
    const last2 = n % 100;
    const last3 = n % 1000;

    let oddSum = 0;
    let evenSum = 0;
    const revDigits = [...digits].reverse();
    revDigits.forEach((d, idx) => {
      if ((idx + 1) % 2 === 1) oddSum += d;
      else evenSum += d;
    });
    const diff11 = Math.abs(oddSum - evenSum);

    return {
      by2: n % 2 === 0,
      by3: sumDigits % 3 === 0,
      by4: last2 % 4 === 0,
      by5: last1 === 0 || last1 === 5,
      by6: n % 2 === 0 && sumDigits % 3 === 0,
      by8: last3 % 8 === 0,
      by9: sumDigits % 9 === 0,
      by10: last1 === 0,
      by11: diff11 % 11 === 0,
      sumDigits,
      last2,
      last3,
      diff11,
      oddSum,
      evenSum,
    };
  }, [testNumber]);

  const getPrimeFactors = (num: number): number[] => {
    let n = num;
    const factors: number[] = [];
    let d = 2;
    while (d * d <= n) {
      while (n % d === 0) {
        factors.push(d);
        n /= d;
      }
      d++;
    }
    if (n > 1) factors.push(n);
    return factors;
  };

  const primeFactorsA = useMemo(() => getPrimeFactors(vennNumA), [vennNumA]);
  const primeFactorsB = useMemo(() => getPrimeFactors(vennNumB), [vennNumB]);

  const { commonPrimes, onlyPrimesA, onlyPrimesB, computedHCF, computedLCM } = useMemo(() => {
    const aList = [...primeFactorsA];
    const bList = [...primeFactorsB];
    const common: number[] = [];

    aList.forEach(p => {
      const idx = bList.indexOf(p);
      if (idx !== -1) {
        common.push(p);
        bList.splice(idx, 1);
      }
    });

    const onlyA = [...primeFactorsA];
    common.forEach(p => {
      const idx = onlyA.indexOf(p);
      if (idx !== -1) onlyA.splice(idx, 1);
    });

    const hcf = common.reduce((acc, val) => acc * val, 1);
    const lcm = (vennNumA * vennNumB) / hcf;

    return {
      commonPrimes: common,
      onlyPrimesA: onlyA,
      onlyPrimesB: bList,
      computedHCF: hcf,
      computedLCM: lcm,
    };
  }, [primeFactorsA, primeFactorsB, vennNumA, vennNumB]);

  const unitRate = useMemo(() => {
    return unitItemCount > 0 ? baseTotalCost / unitItemCount : 0;
  }, [baseTotalCost, unitItemCount]);

  const targetTotalCost = useMemo(() => {
    return unitRate * targetItemCount;
  }, [unitRate, targetItemCount]);

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTATION EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner'
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

  // ─── CANVAS PARTICLE & WAVE EFFECT ───
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 15 + Math.sin(x * 0.05 + frame * 0.04) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── HANDLERS ───
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    setSelectedDiscoveryOption(selectedIndex);
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! Left to right is the key rule.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive workshop. Explore each math tool by clicking and sliding!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Play with all tools without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for the grand math challenges! Do your best.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Great prediction! Now test it in the interactive tool.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! Mathematics is full of such symmetry.' : 'Look closer at how the pairs fold in the middle.');
  }, []);

  const handleBracketStepChange = useCallback((step: number) => {
    setBracketLayerStep(step);
    audioManager.play('count');
    const msgs = [
      'Full nested expression ready.',
      'Step 1: Inner parentheses evaluated first.',
      'Step 2: Curly braces resolved.',
      'Step 3: Square brackets resolved.',
      'Final answer simplified completely!',
    ];
    if (msgs[step]) speechManager.speak(msgs[step]);
  }, []);

  const handleFactorTargetChange = useCallback((val: number) => {
    setFactorTargetNum(val);
    audioManager.play('tap');
  }, []);

  const handleSelectFactorPair = useCallback((pair: [number, number]) => {
    setSelectedFactorPair(pair);
    audioManager.play('pop');
  }, []);

  const handleDivisibilityNumberChange = useCallback((val: number) => {
    setTestNumber(val);
    audioManager.play('count');
  }, []);

  const handleVennNumberChange = useCallback((which: 'A' | 'B', val: number) => {
    if (which === 'A') setVennNumA(val);
    else setVennNumB(val);
    audioManager.play('balance');
  }, []);

  const handleUnitaryItemCountChange = useCallback((val: number) => {
    setUnitItemCount(val);
    audioManager.play('count');
  }, []);

  const handleTargetItemCountChange = useCallback((val: number) => {
    setTargetItemCount(val);
    audioManager.play('count');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Magnificent! You have completed the workshop.');
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
      speechManager.speak('Spot on! Excellent working.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, String(Math.min(100, (scoreBreakdown.correct + 1) * 20)));
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
        speechManager.speak('Let us study the complete solution step by step.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, scoreBreakdown.correct, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('pop');
    setDraggedItem(null);
  }, [draggedItem]);

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

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-gradient-to-r from-slate-900 via-gold-950/60 to-slate-900 rounded-2xl border border-gold-900/50 shadow-inner"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-900/60 rounded-xl border border-gold-700 shadow">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 bg-gold-500/20 text-gold-300 rounded border border-gold-500/40">
                ICSE Class 6
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/40">
                NEP 2020 Aligned
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-wide">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'explore') handleAdvanceToExploration();
                else if (p === 'sandbox') handleAdvanceToSandbox();
                else if (p === 'challenge') handleAdvanceToChallenge();
                else setPhase(p);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                phase === p
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/80 to-slate-900 rounded-2xl border border-gold-700/50 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🏮</span> Festival Scenario Narrative
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-gold-900/30 rounded-xl border border-gold-800/60 text-xs text-gold-200">
              💡 <span className="font-semibold">Architect Quest:</span> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-amber-300">Curiosity Discovery Challenge</h3>
              <span className="text-xs px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/40 font-mono">
                No Pressure • Explore First
              </span>
            </div>
            <p className="text-white text-base font-semibold">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                    selectedDiscoveryOption === i
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/80 border-rose-500 text-rose-200'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700/80 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-gold-400 font-bold">[{String.fromCharCode(65 + i)}]</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 bg-slate-800/90 rounded-xl border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div>
                  <p className={`text-sm font-bold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Spot on! Left to right prevents sign confusion.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Let us explore the interactive BODMAS peeler and multi-representation tools!
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 whitespace-nowrap"
                >
                  Enter Math Workshop →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (Brilliant.org Core) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Navigation Bar */}
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-white rounded-xl disabled:opacity-40 text-xs font-bold"
            >
              ← Prev Tool
            </motion.button>
            <div className="flex items-center gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === idx ? 'bg-gold-500 w-8' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (currentSlide < EXPLORATION_STEPS.length - 1) setCurrentSlide(s => s + 1);
                else handleAdvanceToSandbox();
              }}
              className="px-4 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
            >
              {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Tool →' : 'Try Free Play →'}
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6 shadow-2xl"
            >
              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-gold-300">
                    Tool {currentSlide + 1}: {EXPLORATION_STEPS[currentSlide].title}
                  </h3>
                  <span className="text-xs px-2.5 py-1 bg-gold-500/20 text-gold-300 rounded-full font-mono">
                    Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                  </span>
                </div>
                <p className="text-amber-400 text-sm mt-1 font-semibold">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── TOOL 1: BODMAS BOX PEELER (c6_math_031) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {!predictionMade && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-gold-950/60 rounded-2xl border border-gold-700/60"
                    >
                      <p className="text-xs text-gold-300 font-bold uppercase tracking-wider mb-1">
                        🎯 Step 1: Make a Scientific Prediction
                      </p>
                      <p className="text-white text-sm font-semibold mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 bg-slate-800 rounded-xl text-left text-xs text-slate-200 hover:bg-slate-700 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Interactive Nested Expression Box Visualizer */}
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <div className="text-xs text-slate-400 mb-4 uppercase tracking-wider font-bold">
                      Layer Unwrapping Stage: {bracketLayerStep}/4
                    </div>

                    <svg viewBox="0 0 600 240" className="w-full max-w-2xl h-auto">
                      <rect
                        x="30"
                        y="20"
                        width="540"
                        height="200"
                        rx="16"
                        fill={bracketLayerStep >= 3 ? '#1e293b' : '#1e1b4b'}
                        stroke="#6366f1"
                        strokeWidth={bracketLayerStep === 3 ? 4 : 2}
                        strokeDasharray={bracketLayerStep >= 3 ? '4,4' : 'none'}
                        className="transition-all duration-500"
                      />
                      <text x="50" y="45" fill="#a5b4fc" fontSize="13" fontWeight="bold">
                        Square Layer [ ]
                      </text>

                      <rect
                        x="110"
                        y="50"
                        width="420"
                        height="140"
                        rx="14"
                        fill={bracketLayerStep >= 2 ? '#0f172a' : '#2e1065'}
                        stroke="#a855f7"
                        strokeWidth={bracketLayerStep === 2 ? 4 : 2}
                        strokeDasharray={bracketLayerStep >= 2 ? '4,4' : 'none'}
                        className="transition-all duration-500"
                      />
                      <text x="130" y="75" fill="#d8b4fe" fontSize="13" fontWeight="bold">
                        Curly Layer {'{ }'}
                      </text>

                      <rect
                        x="220"
                        y="80"
                        width="270"
                        height="85"
                        rx="12"
                        fill={bracketLayerStep >= 1 ? '#020617' : '#042f2e'}
                        stroke="#14b8a6"
                        strokeWidth={bracketLayerStep === 1 ? 4 : 2}
                        strokeDasharray={bracketLayerStep >= 1 ? '4,4' : 'none'}
                        className="transition-all duration-500"
                      />
                      <text x="240" y="105" fill="#5eead4" fontSize="12" fontWeight="bold">
                        Inner Core ( )
                      </text>

                      <text x="70" y="135" fill="#ffffff" fontSize="16" fontWeight="bold">
                        {exprNumA} - [
                      </text>
                      <text x="150" y="135" fill="#e0e7ff" fontSize="16" fontWeight="bold">
                        {exprNumB} - {'{'}
                      </text>
                      <text x="260" y="135" fill="#fbcfe8" fontSize="16" fontWeight="bold">
                        {bracketLayerStep === 0
                          ? `${exprNumC} - (${exprNumD} - ${exprNumE})`
                          : bracketLayerStep === 1
                          ? `${exprNumC} - ${exprNumD - exprNumE}`
                          : bracketLayerStep === 2
                          ? `${exprNumC - (exprNumD - exprNumE)}`
                          : ''}
                      </text>
                      <text x="510" y="135" fill="#e0e7ff" fontSize="16" fontWeight="bold">
                        {'}'}]
                      </text>

                      {bracketLayerStep === 4 && (
                        <g>
                          <rect x="180" y="60" width="240" height="120" rx="16" fill="#065f46" stroke="#34d399" strokeWidth="3" />
                          <text x="300" y="115" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="black">
                            Final Value = {exprNumA - (exprNumB - (exprNumC - (exprNumD - exprNumE)))}
                          </text>
                          <text x="300" y="145" textAnchor="middle" fill="#a7f3d0" fontSize="12">
                            Step-by-step BODMAS complete!
                          </text>
                        </g>
                      )}
                    </svg>

                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                      {[
                        { step: 0, label: '0. Original Expression' },
                        { step: 1, label: `1. Solve (${exprNumD}-${exprNumE}) = ${exprNumD - exprNumE}` },
                        { step: 2, label: `2. Solve {${exprNumC}-${exprNumD - exprNumE}} = ${exprNumC - (exprNumD - exprNumE)}` },
                        { step: 3, label: `3. Solve [${exprNumB}-${exprNumC - (exprNumD - exprNumE)}] = ${exprNumB - (exprNumC - (exprNumD - exprNumE))}` },
                        { step: 4, label: `4. Final ${exprNumA} - ${exprNumB - (exprNumC - (exprNumD - exprNumE))} = ${exprNumA - (exprNumB - (exprNumC - (exprNumD - exprNumE)))}` },
                      ].map(btn => (
                        <motion.button
                          key={btn.step}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleBracketStepChange(btn.step)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            bracketLayerStep === btn.step
                              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/50'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {btn.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── TOOL 2: FACTOR MATRIX & MULTIPLES (c6_math_032) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="w-full md:w-1/2">
                      <label className="text-xs font-bold text-gold-300 uppercase tracking-wider block mb-1">
                        Select Target Diya Count: <span className="text-amber-300 font-mono text-base">{factorTargetNum}</span>
                      </label>
                      <input
                        type="range"
                        min={6}
                        max={48}
                        value={factorTargetNum}
                        onChange={e => handleFactorTargetChange(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Adjust factor target number slider"
                      />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-wrap gap-1.5">
                      <span className="text-xs text-slate-400 w-full">Factor Pairs (click to render array):</span>
                      {factorPairs.map(([r, c], i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSelectFactorPair([r, c])}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                            selectedFactorPair[0] === r && selectedFactorPair[1] === c
                              ? 'bg-amber-500 text-slate-950 shadow'
                              : 'bg-slate-800 text-amber-300 hover:bg-slate-700'
                          }`}
                        >
                          {r} × {c}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <div className="text-xs text-slate-400 mb-3">
                      Array Arrangement: <span className="text-amber-400 font-bold">{selectedFactorPair[0]} rows</span> of{' '}
                      <span className="text-emerald-400 font-bold">{selectedFactorPair[1]} counters</span> = {factorTargetNum} total
                    </div>

                    <div
                      className="grid gap-1.5 p-4 bg-slate-900 rounded-xl border border-slate-800 max-h-64 overflow-auto shadow-inner"
                      style={{
                        gridTemplateColumns: `repeat(${Math.min(selectedFactorPair[1], 16)}, minmax(0, 1fr))`,
                      }}
                    >
                      {Array.from({ length: factorTargetNum }).map((_, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: idx * 0.005 }}
                          className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center text-[10px] text-slate-950 font-bold shadow"
                        >
                          🪔
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-4 text-xs text-slate-300 text-center">
                      <span className="text-gold-400 font-bold">All Factors of {factorTargetNum}:</span>{' '}
                      {factorsOfTarget.join(', ')} ({factorsOfTarget.length} factors total •{' '}
                      {factorsOfTarget.length === 2 ? 'PRIME NUMBER' : 'COMPOSITE NUMBER'})
                    </div>
                  </div>

                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
                      <p className="text-xs text-amber-300 font-bold uppercase tracking-wider mb-1">
                        🔍 Brilliant Scientific Observation
                      </p>
                      <p className="text-white text-sm font-semibold mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2.5 bg-slate-900 rounded-xl text-left text-xs text-slate-200 hover:bg-slate-700 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── TOOL 3: DIVISIBILITY INSPECTOR (c6_math_033) ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-4">
                    <div className="w-full md:w-1/3">
                      <label className="text-xs font-bold text-gold-300 uppercase tracking-wider block mb-1">
                        Type Any Shipment Number:
                      </label>
                      <input
                        type="number"
                        value={testNumber}
                        onChange={e => handleDivisibilityNumberChange(Number(e.target.value))}
                        className="w-full px-4 py-2 bg-slate-900 border border-gold-700 rounded-xl text-amber-300 font-mono text-lg font-bold"
                        aria-label="Input number to test divisibility rules"
                      />
                    </div>
                    <div className="w-full md:w-2/3 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">Digit Sum (3 & 9):</span>
                        <span className="text-amber-400 font-bold font-mono text-sm">{divisibilityResults.sumDigits}</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">Last 2 Digits (4):</span>
                        <span className="text-teal-400 font-bold font-mono text-sm">{divisibilityResults.last2}</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">Alt. Diff for 11:</span>
                        <span className="text-purple-400 font-bold font-mono text-sm">
                          |{divisibilityResults.oddSum} - {divisibilityResults.evenSum}| = {divisibilityResults.diff11}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {[
                      { div: 2, pass: divisibilityResults.by2, reason: 'Last digit is even' },
                      { div: 3, pass: divisibilityResults.by3, reason: `Digit sum ${divisibilityResults.sumDigits} is div by 3` },
                      { div: 4, pass: divisibilityResults.by4, reason: `Last 2 digits ${divisibilityResults.last2} div by 4` },
                      { div: 5, pass: divisibilityResults.by5, reason: 'Last digit is 0 or 5' },
                      { div: 6, pass: divisibilityResults.by6, reason: 'Divisible by BOTH 2 & 3' },
                      { div: 8, pass: divisibilityResults.by8, reason: `Last 3 digits ${divisibilityResults.last3} div by 8` },
                      { div: 9, pass: divisibilityResults.by9, reason: `Digit sum ${divisibilityResults.sumDigits} div by 9` },
                      { div: 10, pass: divisibilityResults.by10, reason: 'Last digit is 0' },
                      { div: 11, pass: divisibilityResults.by11, reason: `Alt diff ${divisibilityResults.diff11} is div by 11` },
                    ].map(item => (
                      <motion.div
                        key={item.div}
                        whileHover={{ scale: 1.03 }}
                        className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                          item.pass
                            ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200'
                            : 'bg-slate-900/80 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-black text-sm">÷ {item.div}</span>
                          <span className="text-base">{item.pass ? '✓' : '✗'}</span>
                        </div>
                        <p className="text-[11px] mt-2 leading-tight">{item.reason}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── TOOL 4: PRIME VENN & HCF/LCM PRODUCT BALANCE (c6_math_034 & 035) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div>
                      <label className="text-xs font-bold text-gold-300 uppercase block mb-1">
                        Number A: <span className="text-gold-300 font-mono text-base">{vennNumA}</span> (Primes: {primeFactorsA.join(' × ') || '1'})
                      </label>
                      <input
                        type="range"
                        min={4}
                        max={60}
                        value={vennNumA}
                        onChange={e => handleVennNumberChange('A', Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Adjust number A slider"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gold-300 uppercase block mb-1">
                        Number B: <span className="text-pink-300 font-mono text-base">{vennNumB}</span> (Primes: {primeFactorsB.join(' × ') || '1'})
                      </label>
                      <input
                        type="range"
                        min={4}
                        max={60}
                        value={vennNumB}
                        onChange={e => handleVennNumberChange('B', Number(e.target.value))}
                        className="w-full accent-pink-500 cursor-pointer"
                        aria-label="Adjust number B slider"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 500 220" className="w-full max-w-lg h-auto">
                      <circle cx="180" cy="110" r="85" fill="rgba(6, 182, 212, 0.25)" stroke="#06b6d4" strokeWidth="2.5" />
                      <circle cx="320" cy="110" r="85" fill="rgba(236, 72, 153, 0.25)" stroke="#ec4899" strokeWidth="2.5" />

                      <text x="130" y="50" fill="#67e8f9" fontSize="13" fontWeight="bold">
                        Only A ({vennNumA})
                      </text>
                      <text x="250" y="30" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">
                        Intersection (HCF)
                      </text>
                      <text x="370" y="50" fill="#f472b6" fontSize="13" fontWeight="bold">
                        Only B ({vennNumB})
                      </text>

                      <text x="140" y="115" fill="#a5f3fc" fontSize="15" fontWeight="bold" textAnchor="middle">
                        {onlyPrimesA.join(', ') || '—'}
                      </text>
                      <text x="250" y="115" fill="#fde047" fontSize="16" fontWeight="black" textAnchor="middle">
                        {commonPrimes.join(', ') || '1'}
                      </text>
                      <text x="360" y="115" fill="#fbcfe8" fontSize="15" fontWeight="bold" textAnchor="middle">
                        {onlyPrimesB.join(', ') || '—'}
                      </text>
                    </svg>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 w-full text-center text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Highest Common Factor (HCF):</span>
                        <span className="text-amber-400 font-bold font-mono text-base">{computedHCF}</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Least Common Multiple (LCM):</span>
                        <span className="text-gold-400 font-bold font-mono text-base">{computedLCM}</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-emerald-800/60 bg-emerald-950/20">
                        <span className="text-emerald-300 block">Product Theorem Verification:</span>
                        <span className="text-white font-mono font-bold text-xs">
                          {computedHCF} × {computedLCM} = {computedHCF * computedLCM} (A×B = {vennNumA * vennNumB}) ✓
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── TOOL 5: PROPORTION & UNITARY METHOD RATE SCALE (c6_math_038, 039, 040) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div>
                      <label className="text-xs font-bold text-gold-300 uppercase block mb-1">
                        Given Baseline: <span className="text-amber-300 font-mono font-bold">{unitItemCount} kg</span> costs{' '}
                        <span className="text-emerald-400 font-mono font-bold">₹{baseTotalCost}</span>
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={unitItemCount}
                        onChange={e => handleUnitaryItemCountChange(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                        aria-label="Adjust baseline item count slider"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gold-300 uppercase block mb-1">
                        Calculate Required: <span className="text-gold-300 font-mono font-bold">{targetItemCount} kg</span>
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={20}
                        value={targetItemCount}
                        onChange={e => handleTargetItemCountChange(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Adjust target item count slider"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-center text-center">
                      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                        <span className="text-xs text-slate-400 font-bold block mb-1">GIVEN TOTAL</span>
                        <div className="text-xl font-black text-amber-300">{unitItemCount} kg</div>
                        <div className="text-sm text-slate-300 mt-1">₹{baseTotalCost}</div>
                      </div>

                      <div className="p-4 bg-gold-950 rounded-2xl border-2 border-gold-500 shadow-lg shadow-gold-600/30">
                        <span className="text-xs text-gold-300 font-bold block mb-1">STEP 1: UNIT RATE (1 kg)</span>
                        <div className="text-2xl font-black text-white">₹{unitRate.toFixed(2)}</div>
                        <div className="text-[11px] text-gold-200 mt-1">
                          ₹{baseTotalCost} ÷ {unitItemCount} = ₹{unitRate}/kg
                        </div>
                      </div>

                      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                        <span className="text-xs text-slate-400 font-bold block mb-1">STEP 2: TARGET ({targetItemCount} kg)</span>
                        <div className="text-2xl font-black text-emerald-400">₹{targetTotalCost.toFixed(2)}</div>
                        <div className="text-[11px] text-slate-300 mt-1">
                          {targetItemCount} × ₹{unitRate.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                      Proportion Form: {unitItemCount} : {baseTotalCost} = {targetItemCount} : {targetTotalCost.toFixed(0)} (Extremes Product = Means Product)
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX (Brilliant.org Core) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gold-300">Free Mathematical Sandbox</h3>
              <p className="text-slate-400 text-sm mt-1">
                Zero pressure, no timers, no grading. Experiment with all bracket formulas, divisibility filters, and ratios!
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-black text-sm shadow-lg shadow-emerald-600/40 whitespace-nowrap"
            >
              Start Challenges Now →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-amber-300 uppercase">Distributive Property Live Multiplier</h4>
              <p className="text-xs text-slate-400">Observe: a × (b + c) = a×b + a×c</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={exprNumA}
                  onChange={e => setExprNumA(Number(e.target.value))}
                  className="w-16 p-2 bg-slate-950 border border-slate-700 rounded-lg text-center font-bold text-amber-300"
                  aria-label="Set value a"
                />
                <span className="self-center font-bold">× (</span>
                <input
                  type="number"
                  value={exprNumB}
                  onChange={e => setExprNumB(Number(e.target.value))}
                  className="w-16 p-2 bg-slate-950 border border-slate-700 rounded-lg text-center font-bold text-gold-300"
                  aria-label="Set value b"
                />
                <span className="self-center font-bold">+</span>
                <input
                  type="number"
                  value={exprNumC}
                  onChange={e => setExprNumC(Number(e.target.value))}
                  className="w-16 p-2 bg-slate-950 border border-slate-700 rounded-lg text-center font-bold text-pink-300"
                  aria-label="Set value c"
                />
                <span className="self-center font-bold">)</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                <div>Route 1: {exprNumA} × ({exprNumB + exprNumC}) = <span className="text-emerald-400 font-bold">{exprNumA * (exprNumB + exprNumC)}</span></div>
                <div>Route 2: ({exprNumA}×{exprNumB}) + ({exprNumA}×{exprNumC}) = {exprNumA * exprNumB} + {exprNumA * exprNumC} = <span className="text-emerald-400 font-bold">{exprNumA * exprNumB + exprNumA * exprNumC}</span></div>
              </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-gold-300 uppercase">Live Cross-Product Proportion Checker</h4>
              <p className="text-xs text-slate-400">Test if a : b = c : d is a true proportion</p>
              <div className="grid grid-cols-4 gap-2 text-center">
                <input type="number" value={6} readOnly className="p-2 bg-slate-950 border border-slate-700 rounded-lg font-bold text-gold-400" />
                <input type="number" value={9} readOnly className="p-2 bg-slate-950 border border-slate-700 rounded-lg font-bold text-gold-400" />
                <input type="number" value={10} readOnly className="p-2 bg-slate-950 border border-slate-700 rounded-lg font-bold text-pink-400" />
                <input type="number" value={15} readOnly className="p-2 bg-slate-950 border border-slate-700 rounded-lg font-bold text-pink-400" />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <div>Product of Extremes: 6 × 15 = <span className="text-amber-400 font-bold">90</span></div>
                <div>Product of Means: 9 × 10 = <span className="text-amber-400 font-bold">90</span></div>
                <div className="text-emerald-400 font-bold">Since 90 = 90, numbers are in true proportion!</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES WITH ADAPTIVE BKT & ESCALATING HINTS ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <canvas ref={canvasRef} width={600} height={30} className="w-full h-8 rounded-lg" />

          {/* Top Status Bar */}
          <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400 block">Challenge Progress</span>
              <div className="text-base font-black text-white">
                {currentChallenge + 1} of {filteredChallenges.length}
              </div>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : difficulty === 'standard'
                  ? 'bg-gold-500/20 text-gold-300 border-gold-500/40'
                  : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
              }`}
            >
              Tier: {difficulty}
            </motion.span>

            <span className="text-xs px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/40 font-mono capitalize">
              NEP: {challenge.competencyLevel}
            </span>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [-10, 10, -10, 10, 0] } : { opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500 shadow-rose-900/40 shadow-2xl'
                : 'bg-slate-900 border-slate-800 shadow-2xl'
            }`}
          >
            <div className="text-xs text-gold-400 font-bold uppercase tracking-wider mb-2">
              Node: {challenge.nodeId} • Challenge ID: {challenge.id}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
              {challenge.question}
            </h3>

            {/* MCQ Type Render */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(idx)}
                    disabled={showExplanation || answerRevealed}
                    className={`w-full p-4 rounded-2xl text-left text-sm font-medium border transition-all flex items-start gap-3 ${
                      showExplanation && idx === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700/80 hover:border-slate-600'
                    }`}
                  >
                    <span className="font-mono font-bold text-gold-400">[{String.fromCharCode(65 + idx)}]</span>
                    <span>{opt}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label Type Render */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag Labels from palette:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-600 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['layer_inner', 'layer_middle', 'layer_outer'].map((slotId) => (
                    <div
                      key={slotId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(slotId)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-gold-700/60 flex flex-col items-center justify-center min-h-[90px]"
                    >
                      <span className="text-xs text-slate-400 mb-1">
                        {slotId === 'layer_inner' ? '1. Innermost (Core)' : slotId === 'layer_middle' ? '2. Middle Layer' : '3. Outermost Shell'}
                      </span>
                      <span className="text-sm font-bold text-amber-300">
                        {droppedLabels[slotId] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Layer Map →
                </motion.button>
              </div>
            )}

            {/* Drag Sort Type Render */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <div className="space-y-2">
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
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-xs md:text-sm cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-gold-900 text-gold-300 flex items-center justify-center text-xs font-mono font-bold">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Sequence →
                </motion.button>
              </div>
            )}

            {/* Numeric Type Render */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-3 bg-slate-950 border border-gold-700 rounded-xl text-white font-mono text-lg font-bold w-48"
                    aria-label="Input numeric answer"
                  />
                  {challenge.unit && <span className="text-slate-400 font-bold">{challenge.unit}</span>}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(parseFloat(numericInput))}
                    disabled={showExplanation || numericInput === ''}
                    className="px-6 py-3 bg-gold-600 text-white rounded-xl font-bold text-sm"
                  >
                    Check →
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type Render */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-gold-300 font-semibold">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-900/80 border border-gold-700 text-white rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[80px] p-4 bg-slate-950 rounded-2xl border border-slate-700 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-gold-600 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-300 font-bold hover:text-rose-100"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click blocks above to construct the formula</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Check Construction →
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <span>📖</span> Detailed Step-by-Step Solution
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-amber-100 text-xs md:text-sm leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 font-mono">Step {i + 1}:</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-amber-700 text-white rounded-lg text-xs font-bold shadow"
                  >
                    Reveal Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-black text-sm shadow-lg shadow-emerald-600/40"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Workshop →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL SUMMARY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-950 rounded-3xl border border-gold-700 text-center space-y-4 shadow-2xl">
            <span className="text-5xl">🏆</span>
            <h2 className="text-3xl font-black text-white">Class 6 Math Workshop Complete!</h2>
            <p className="text-gold-200 text-sm max-w-xl mx-auto">
              You have engineered the Jaipur Diwali Mela with precision arithmetic, prime factorisations, and proportional mastery.
            </p>
            <div className="inline-flex gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="w-px bg-slate-800" />
              <div>
                <span className="text-xs text-slate-400 block">Mastery Rating</span>
                <span className="text-2xl font-black text-gold-400 uppercase">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* ─── MOTIVATIONAL FEEDBACK ─── */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-700/60 text-center">
            <h3 className="text-lg font-black text-emerald-300 tracking-wide">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors >= 1 && errors <= 3
                ? 'Great work!'
                : errors >= 4 && errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-xs text-emerald-200/80 mt-1">
              {errors === 0
                ? 'You solved every problem with flawless mathematical precision!'
                : errors <= 3
                ? 'Superb performance on brackets, primes, and ratios!'
                : errors <= 7
                ? 'Consistent effort! Review the step-by-step solutions to strengthen your fundamentals.'
                : 'Learning math takes persistence and practice. Keep exploring and you will master this!'}
            </p>
          </div>

          {/* ─── SPACED REPETITION SCHEDULE CARD (SM-2 VISIBILITY) ─── */}
          <div className="p-6 bg-gradient-to-r from-amber-950/70 via-slate-900 to-gold-950/70 rounded-3xl border-2 border-amber-500/60 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/20 border border-amber-500/50 rounded-2xl text-2xl">
                  🧠
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                      Spaced Repetition System (SRS)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/40 font-mono">
                      SM-2 Algorithm
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-white mt-0.5">Recommended Review Schedule</h4>
                </div>
              </div>

              {/* Prominent Next Review Callout Badge */}
              <div className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-2xl text-sm md:text-base shadow-lg shadow-amber-500/30 flex items-center gap-2">
                <span>⏰</span>
                <span>
                  {errors === 0
                    ? 'Review in 7 days'
                    : errors >= 1 && errors <= 3
                    ? 'Review in 3 days'
                    : 'Review in 1 day'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div
                className={`p-3 rounded-2xl border text-center transition-all ${
                  errors === 0
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-xs font-bold uppercase">0 Errors (Mastered)</div>
                <div className="text-base font-black text-emerald-400 mt-1">Review in 7 days</div>
                <p className="text-[11px] text-slate-400 mt-1">Memory consolidation stage</p>
              </div>

              <div
                className={`p-3 rounded-2xl border text-center transition-all ${
                  errors >= 1 && errors <= 3
                    ? 'bg-amber-950/70 border-amber-500 text-amber-200 ring-2 ring-amber-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-xs font-bold uppercase">1 – 3 Errors (Developing)</div>
                <div className="text-base font-black text-amber-400 mt-1">Review in 3 days</div>
                <p className="text-[11px] text-slate-400 mt-1">Reinforce bracket order & rules</p>
              </div>

              <div
                className={`p-3 rounded-2xl border text-center transition-all ${
                  errors >= 4
                    ? 'bg-rose-950/70 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-xs font-bold uppercase">4+ Errors (Practice)</div>
                <div className="text-base font-black text-rose-400 mt-1">Review in 1 day</div>
                <p className="text-[11px] text-slate-400 mt-1">Immediate active recall needed</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center pt-1">
              💡 Spaced retrieval locks mathematical concepts into long-term memory far more effectively than cramming!
            </p>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-gold-900/60 space-y-4">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-wider">
              <span>💭</span> Reflection & Metacognition
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-amber-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionResponses.surprising}
                  onChange={e => setReflectionResponses(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. Addition and subtraction have equal rank and must be done left-to-right..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500 resize-none h-16"
                  aria-label="Reflection question 1"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-gold-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionResponses.explain}
                  onChange={e => setReflectionResponses(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. Brackets are like nested gift boxes: always unwrap the innermost first..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500 resize-none h-16"
                  aria-label="Reflection question 2"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-pink-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionResponses.realLife}
                  onChange={e => setReflectionResponses(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. Splitting costs when buying bulk festival groceries or scaling recipes..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500 resize-none h-16"
                  aria-label="Reflection question 3"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconceptions Profile & Corrections
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <p className="text-xs font-bold text-rose-400">❌ {m.misconception}</p>
                    <p className="text-xs text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real World Activity Arc */}
          <div className="p-6 bg-gold-950/50 rounded-2xl border border-gold-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i}>
                  <span className="font-bold text-gold-400">{i + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── GLOBAL FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Level Up!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_MathematicsSimplificationBracketsSim;
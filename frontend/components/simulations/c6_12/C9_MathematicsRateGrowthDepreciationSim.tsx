'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERALS ───
const NODE_C9_MATH_011 = 'c9_math_011'; // Rate of growth and depreciation using CI
const NODE_C9_MATH_012 = 'c9_math_012'; // Expansion of (a +/- b)^2
const NODE_C9_MATH_013 = 'c9_math_013'; // Expansion of (a +/- b)^3
const NODE_C9_MATH_014 = 'c9_math_014'; // Expansion of (x +/- a)(x +/- b)
const NODE_C9_MATH_015 = 'c9_math_015'; // Expansion of (a +/- b +/- c)^2
const NODE_C9_MATH_016 = 'c9_math_016'; // Factorisation of a^2 - b^2
const NODE_C9_MATH_017 = 'c9_math_017'; // Factorisation of a^3 +/- b^3
const NODE_C9_MATH_018 = 'c9_math_018'; // Factorisation of ax^2 + bx + c by splitting middle term
const NODE_C9_MATH_019 = 'c9_math_019'; // Solving simultaneous linear equations by elimination
const NODE_C9_MATH_020 = 'c9_math_020'; // Solving simultaneous linear equations by substitution

const ALL_NODE_IDS = [
  NODE_C9_MATH_011,
  NODE_C9_MATH_012,
  NODE_C9_MATH_013,
  NODE_C9_MATH_014,
  NODE_C9_MATH_015,
  NODE_C9_MATH_016,
  NODE_C9_MATH_017,
  NODE_C9_MATH_018,
  NODE_C9_MATH_019,
  NODE_C9_MATH_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Smart City Expansion & Infrastructure Engine',
  intro: 'You are the Chief Quantitative Architect for "Navi Pragati", a newly planned futuristic tech city in India. You must model exponential population surges, industrial machine wear & tear, optimise plot layouts using algebraic geometry, and solve simultaneous resource allocation networks.',
  context: 'Real engineers and economists do not compute blindly with memorised rules. They use algebraic identities, compound growth models, and simultaneous linear systems to make multimillion-rupee decisions.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Navi Pragati purchases an advanced solar generator for ₹1,00,000. It depreciates by 10% each year. A rookie planner estimates its value after 2 years as: ₹1,00,000 - 10% - 10% = ₹80,000. Is this correct?',
  options: [
    'Yes, 10% + 10% = 20% total loss, so it becomes ₹80,000',
    'No, depreciation is applied on the reduced base: Year 1 = ₹90,000, Year 2 = ₹81,000',
    'No, machines appreciate in value over time',
    'No, after 2 years the machine drops to exactly zero',
  ],
  correctIndex: 1,
  hintAfter: 'Compound depreciation behaves like compound interest in reverse: the second year\'s 10% is calculated on ₹90,000, not ₹1,00,000!',
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

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the value of an asset over time when depreciation is applied at a fixed rate?',
    observableOptions: [
      'The value decreases exponentially — each year loses a percentage of the remaining value (✓)',
      'The value decreases by the same absolute amount each year (✗)',
      'The value increases over time (✗)',
      'The value stays constant (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'When comparing simple interest growth versus compound interest growth, what pattern emerges?',
    observableOptions: [
      'Compound interest grows exponentially; simple interest grows linearly (✓)',
      'Both grow at the same rate (✗)',
      'Simple interest grows faster than compound (✗)',
      'Neither grows over time (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── CHALLENGES ARRAY (21 Challenges: Mixed types & Competency Levels) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C9_MATH_011,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A town\'s population is 10,000 and grows at 5% per annum. Using A = P(1 + r/100)ⁿ, find the population after 2 years.',
    correctAnswer: 11025,
    tolerance: 0,
    unit: 'people',
    explanation: 'Year 1: 10,000 + 500 = 10,500. Year 2: 10,500 + 5% of 10,500 (525) = 11,025. Using formula: 10,000 × (1.05)² = 10,000 × 1.1025 = 11,025 people.',
    hints: [
      'Use the formula A = P(1 + r/100)ⁿ with P = 10000, r = 5, n = 2.',
      '(1 + 5/100) = 1.05. Calculate 1.05 squared.',
      '1.05 × 1.05 = 1.1025. Multiply 1.1025 by 10,000 to get 11025.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C9_MATH_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When expanding (3x + 4)², what is the middle term (2ab)?',
    options: ['12x', '24x', '7x', '14x'],
    correctIndex: 1,
    explanation: 'Here a = 3x and b = 4. The middle term is 2ab = 2 × (3x) × (4) = 24x.',
    hints: [
      'The expansion formula is (a + b)² = a² + 2ab + b².',
      'Multiply 2 by the first term (3x) and then by the second term (4).',
      '2 × 3x = 6x; 6x × 4 = 24x.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C9_MATH_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'A student wrote: (2x - 5)² = 4x² - 20x - 25. Why is this expansion incorrect?',
    options: [
      'The middle term should be -10x',
      'The last term (-5)² must be +25, because squaring a real number is always non-negative',
      'The leading term should be 2x²',
      'All signs in a minus square must be negative',
    ],
    correctIndex: 1,
    explanation: 'In (a - b)² = a² - 2ab + b², the last term is (-b)² = +b². Thus (-5)² = +25, not -25. Only the middle term is negative.',
    hints: [
      'Look at the sign of the constant term: (-5) × (-5) = ?',
      'The square of any real number is always positive or zero.',
      'Therefore (-5)² = +25. The correct expansion is 4x² - 20x + 25.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C9_MATH_012,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Evaluate 99² mentally using the identity (100 - 1)².',
    correctAnswer: 9801,
    tolerance: 0,
    unit: '',
    explanation: '(100 - 1)² = 100² - 2(100)(1) + 1² = 10,000 - 200 + 1 = 9,801.',
    hints: [
      'Write 99 as (100 - 1) and expand using a² - 2ab + b².',
      '100² = 10,000; 2ab = 200; 1² = 1.',
      '10,000 - 200 = 9,800; add 1 to get 9801.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C9_MATH_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following represents the full expansion of (a + b)³?',
    options: [
      'a³ + b³',
      'a³ + 3a²b + 3ab² + b³',
      'a³ + 3ab + b³',
      'a³ + a²b + ab² + b³',
    ],
    correctIndex: 1,
    explanation: 'The binomial cube expansion has 4 terms with Pascal coefficients 1, 3, 3, 1: (a + b)³ = a³ + 3a²b + 3ab² + b³.',
    hints: [
      'Remember Pascal\'s triangle row 3: coefficients are 1, 3, 3, 1.',
      'The powers of \'a\' decrease (3 to 0) while powers of \'b\' increase (0 to 3).',
      'The four terms are a³, 3a²b, 3ab², and b³.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C9_MATH_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the correct sequence of signs for the four terms in (a - b)³ = _ a³ _ 3a²b _ 3ab² _ b³?',
    options: ['+, -, -, -', '+, -, +, -', '-, -, -, -', '+, +, -, -'],
    correctIndex: 1,
    explanation: 'In (a - b)³, the signs alternate: +a³, -3a²b, +3ab² (since (-b)² = +b²), and -b³ (since (-b)³ = -b³).',
    hints: [
      'Check the power of (-b) in each term.',
      'Odd powers of (-b) give negative signs; even powers give positive signs.',
      'Term 1: (+), Term 2: (-b)¹ gives (-), Term 3: (-b)² gives (+), Term 4: (-b)³ gives (-).',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_07',
    nodeId: NODE_C9_MATH_014,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the algebraic meaning to each component of the expansion: (x + a)(x + b) = x² + (a + b)x + ab.',
    dragItems: [
      { label: 'Leading Term (x · x)', targetId: 'box_leading' },
      { label: 'Middle Coefficient (Sum: a + b)', targetId: 'box_middle' },
      { label: 'Constant Term (Product: a · b)', targetId: 'box_constant' },
    ],
    correctMapping: {
      box_leading: 'Leading Term (x · x)',
      box_middle: 'Middle Coefficient (Sum: a + b)',
      box_constant: 'Constant Term (Product: a · b)',
    },
    explanation: 'In (x + a)(x + b), the x² term is the product of variables, the x-coefficient is the sum of constants (a + b), and the constant is the product (ab).',
    hints: [
      'What is x multiplied by x? That is the leading term.',
      'The linear x-term combines ax and bx into (a + b)x (the sum).',
      'The final standalone number is the product of constants a and b.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C9_MATH_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Expand (x - 4)(x + 7) using the sum-and-product identity.',
    options: ['x² + 3x - 28', 'x² - 3x - 28', 'x² + 11x - 28', 'x² + 3x + 28'],
    correctIndex: 0,
    explanation: 'Sum of constants = (-4) + (+7) = +3. Product of constants = (-4) × (+7) = -28. Thus, x² + 3x - 28.',
    hints: [
      'Middle coefficient is (-4 + 7). What is -4 + 7?',
      'Constant term is (-4) × 7. What is -4 × 7?',
      'Combine x² + (+3)x + (-28) = x�� + 3x - 28.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_09',
    nodeId: NODE_C9_MATH_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Expand (2x - y + 3z)². How many terms are in the simplified result and what is the coefficient of the xy cross term?',
    options: [
      '6 terms total, xy coefficient is -4',
      '6 terms total, xy coefficient is +4',
      '4 terms total, xy coefficient is -2',
      '7 terms total including a 2xyz term',
    ],
    correctIndex: 0,
    explanation: '(2x - y + 3z)² = (2x)² + (-y)² + (3z)² + 2(2x)(-y) + 2(-y)(3z) + 2(3z)(2x) = 4x² + y² + 9z² - 4xy - 6yz + 12zx (6 terms, xy term is -4xy).',
    hints: [
      'The expansion has 3 squared terms + 3 paired cross terms = 6 terms total (no xyz term).',
      'Cross term for (x, y) is 2 · (2x) · (-y).',
      '2 × 2 × (-1) = -4, so -4xy.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C9_MATH_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Factorise completely: 49x² - 64y².',
    options: [
      '(7x - 8y)²',
      '(49x + 64y)(49x - 64y)',
      '(7x + 8y)(7x - 8y)',
      '(7x² + 8y²)(7x² - 8y²)',
    ],
    correctIndex: 2,
    explanation: '49x² = (7x)² and 64y² = (8y)². Using a² - b² = (a + b)(a - b), we get (7x + 8y)(7x - 8y).',
    hints: [
      'Take the square root of both numerical coefficients: √49 = 7, √64 = 8.',
      'Write as a² - b² with a = 7x and b = 8y.',
      'Substitute into (a + b)(a - b).',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_11',
    nodeId: NODE_C9_MATH_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Factorise and simplify: (x + 3)² - 16.',
    options: ['(x + 7)(x - 1)', '(x - 1)²', '(x + 19)(x - 13)', '(x + 7)(x + 1)'],
    correctIndex: 0,
    explanation: 'Here a = (x + 3) and b = 4. (a + b)(a - b) = ((x + 3) + 4)((x + 3) - 4) = (x + 7)(x - 1).',
    hints: [
      '16 is 4². Treat (x + 3) as single entity \'a\' and 4 as \'b\'.',
      'First factor: (x + 3 + 4). Second factor: (x + 3 - 4).',
      'Simplify: 3 + 4 = 7; 3 - 4 = -1. Result is (x + 7)(x - 1).',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C9_MATH_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following is the correct factorisation of x³ + 27?',
    options: [
      '(x + 3)(x² - 3x + 9)',
      '(x + 3)(x² + 3x + 9)',
      '(x - 3)(x² + 3x + 9)',
      '(x + 3)³',
    ],
    correctIndex: 0,
    explanation: 'For a³ + b³, the identity is (a + b)(a² - ab + b²). With a = x and b = 3: (x + 3)(x² - 3x + 9). The middle term flips to -ab!',
    hints: [
      '27 is 3³. So a = x, b = 3.',
      'Linear factor keeps the original sign (+): (x + 3).',
      'Quadratic factor flips the middle sign: a² - ab + b² = x² - 3x + 9.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_13',
    nodeId: NODE_C9_MATH_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Factorise 8a³ - 125b³.',
    options: [
      '(2a - 5b)(4a² + 10ab + 25b²)',
      '(2a - 5b)(4a² - 10ab + 25b²)',
      '(2a + 5b)(4a² - 10ab + 25b²)',
      '(2a - 5b)³',
    ],
    correctIndex: 0,
    explanation: '8a³ = (2a)³ and 125b³ = (5b)³. Using a³ - b³ = (a - b)(a² + ab + b²), we get (2a - 5b)(4a² + 10ab + 25b²).',
    hints: [
      'Find cube roots: ∛8a³ = 2a and ∛125b³ = 5b.',
      'The linear factor is (2a - 5b).',
      'The quadratic middle term flips to +ab: +(2a)(5b) = +10ab.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C9_MATH_018,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the logical steps to factorise ax² + bx + c by splitting the middle term.',
    sortItems: [
      'Compute the target product ac',
      'Find two integers p and q such that p · q = ac and p + q = b',
      'Rewrite bx as px + qx to make four terms',
      'Group in pairs and pull out common binomial factor (rx + s)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First compute ac, find factors p, q summing to b, rewrite bx as px + qx, and finally group in pairs to factor out the common binomial.',
    hints: [
      'Always start by multiplying the leading coefficient a and constant c.',
      'Next find the pair of factors that add up to middle coefficient b.',
      'Split the middle term, then group in pairs.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C9_MATH_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Factorise: 2x² + 7x + 3.',
    options: [
      '(2x + 1)(x + 3)',
      '(2x + 3)(x + 1)',
      '(x + 1)(x + 6)',
      '(2x + 7)(x + 3)',
    ],
    correctIndex: 0,
    explanation: 'ac = 2 × 3 = 6. Factors of 6 that add to 7 are 1 and 6. 2x² + x + 6x + 3 = x(2x + 1) + 3(2x + 1) = (2x + 1)(x + 3).',
    hints: [
      'ac = 2 × 3 = 6. What two numbers multiply to 6 and add to 7?',
      'The numbers are 1 and 6. Split 7x into 1x + 6x.',
      'Group: x(2x + 1) + 3(2x + 1) = (2x + 1)(x + 3).',
    ],
    misconceptionIndex: 9,
  },
  {
    id: 'ch_16',
    nodeId: NODE_C9_MATH_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Given the system: (1) 5x - 2y = 4 and (2) 3x + 2y = 12. What is the most efficient first step to solve this system?',
    options: [
      'Multiply equation (1) by 3 and equation (2) by 5 to eliminate x',
      'Directly add equations (1) and (2) because the y-coefficients (-2 and +2) are already opposite in sign',
      'Solve equation (1) for x = (4 + 2y)/5 and substitute into (2)',
      'Subtract equation (2) from equation (1)',
    ],
    correctIndex: 1,
    explanation: 'Scanning for already matched coefficients saves time! -2y and +2y cancel immediately upon adding: (5x - 2y) + (3x + 2y) = 4 + 12 => 8x = 16 => x = 2.',
    hints: [
      'Look at the y coefficients in both equations: -2 and +2.',
      'What happens if you add -2y + 2y?',
      'They cancel out instantly to 0 with zero multiplication needed!',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C9_MATH_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Solve the simultaneous equations: 2x + 3y = 12 and 3x - y = 7.',
    options: ['(x = 3, y = 2)', '(x = 2, y = 3)', '(x = 4, y = 1)', '(x = 1, y = 4)'],
    correctIndex: 0,
    explanation: 'Multiply second equation by 3: 9x - 3y = 21. Add to first: (2x + 3y) + (9x - 3y) = 12 + 21 => 11x = 33 => x = 3. Back-substitute: 2(3) + 3y = 12 => 3y = 6 => y = 2.',
    hints: [
      'Multiply the second equation by 3 so the y-coefficients become +3 and -3.',
      'Add the two equations to eliminate y: 2x + 9x = 12 + 21.',
      '11x = 33, so x = 3. Put x = 3 back in 3(3) - y = 7 => y = 2.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C9_MATH_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'In the system 2x + y = 10 and 3x - 2y = 8, why is isolating y from the first equation strategically better than isolating x?',
    options: [
      'Because y has coefficient 1, so y = 10 - 2x avoids creating fractions early',
      'Because x is always the independent variable in algebra',
      'Because y must always be positive',
      'There is no mathematical difference; both take identical effort',
    ],
    correctIndex: 0,
    explanation: 'Isolating y gives y = 10 - 2x (integer coefficients). Isolating x would give x = (10 - y)/2, introducing fractions that increase arithmetic slip risks.',
    hints: [
      'Look at the coefficients: x has 2, y has 1.',
      'If you isolate x, you must divide by 2, introducing fractions.',
      'Isolating a variable with coefficient 1 keeps all calculations in clean integers.',
    ],
    misconceptionIndex: 10,
  },
  {
    id: 'ch_19',
    nodeId: NODE_C9_MATH_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Solve using substitution: x = 3 - y and 5x + 2y = 11.',
    options: [
      '(x = 5/3, y = 4/3)',
      '(x = 4/3, y = 5/3)',
      '(x = 2, y = 1)',
      '(x = 1, y = 2)',
    ],
    correctIndex: 0,
    explanation: 'Substitute (3 - y) for x: 5(3 - y) + 2y = 11 => 15 - 5y + 2y = 11 => 15 - 3y = 11 => -3y = -4 => y = 4/3. Then x = 3 - 4/3 = 5/3.',
    hints: [
      'Substitute x = 3 - y into 5x + 2y = 11: 5(3 - y) + 2y = 11.',
      'Expand carefully: 15 - 5y + 2y = 11 => 15 - 3y = 11.',
      '-3y = -4 => y = 4/3. Then x = 3 - 4/3 = 5/3.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C9_MATH_011,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A transport fleet bought for ₹4,00,000 depreciates at 10% per annum. What is its net loss in value (P - A) after 2 years in rupees?',
    correctAnswer: 76000,
    tolerance: 0,
    unit: '₹',
    explanation: 'After 2 years, A = 4,00,000 × (1 - 0.10)² = 4,00,000 × 0.81 = ₹3,24,000. Net depreciation = P - A = 4,00,000 - 3,24,000 = ₹76,000.',
    hints: [
      'Calculate the depreciated value A = 400000 × (0.9)²',
      '0.9 × 0.9 = 0.81. A = 400000 × 0.81 = 324000.',
      'The question asks for the NET LOSS (P - A): 400000 - 324000 = 76000.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C9_MATH_018,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the factors of 6x² + 11x - 10 by clicking the correct binomial tiles.',
    availableParts: ['(2x + 5)', '(3x - 2)', '(2x - 5)', '(3x + 2)', '(6x - 1)', '(x + 10)'],
    targetState: '(2x + 5) (3x - 2)',
    validationHint: 'Target: ac = -60, sum = +11. Factors are +15 and -4.',
    explanation: '6x² + 15x - 4x - 10 = 3x(2x + 5) - 2(2x + 5) = (2x + 5)(3x - 2).',
    hints: [
      'ac = 6 × (-10) = -60. Factor pair of -60 that adds to +11 is 15 and -4.',
      'Split: 6x² + 15x - 4x - 10 = 3x(2x + 5) - 2(2x + 5).',
      'Select tile (2x + 5) followed by tile (3x - 2).',
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
  nodeId: NODE_C9_MATH_011,
  title: 'Rate of Growth, Depreciation & Algebraic Foundations',
  definition: 'Comprehensive ICSE Class 9 mastery: Compound growth & depreciation formulas, algebraic binomial and trinomial expansions, difference of squares/cubes, middle-term splitting, and simultaneous linear system solvers.',
  eli5: 'Think of algebra and growth like building with modular Lego bricks: formulas expand small blocks into big structures, factorisation packs big structures back into neat boxes, and simultaneous equations help two separate clues meet at one exact point.',
  misconceptions: [
    { misconception: 'Depreciation uses flat simple interest subtraction every year', correction: 'Depreciation compounds on the REDUCED value at the start of each year: A = P(1 - r/100)ⁿ.' },
    { misconception: 'In (a - b)², the last term is negative (-b²)', correction: 'Squaring any real number is non-negative: (-b)² = +b². Only the middle term 2ab is negative.' },
    { misconception: 'In (a + b)³, (a + b)³ equals a³ + b³', correction: 'Dropping mixed cross terms is a major error. (a + b)³ = a³ + 3a²b + 3ab² + b³.' },
    { misconception: 'In (a - b)³, all terms are negative', correction: 'Signs alternate +, -, +, - because (-b)² is positive and (-b)³ is negative.' },
    { misconception: 'In (x - a)(x - b), the constant term is negative', correction: '(-a) · (-b) = +ab. The product of two negatives is always positive.' },
    { misconception: 'In (a + b - c)², c² becomes -c²', correction: 'Squared terms are always positive: a² + b² + c². The minus on c affects only cross terms involving c.' },
    { misconception: 'Forgetting to take square roots of coefficients in a² - b²', correction: 'In 9x² - 25y², square roots must be taken: (3x + 5y)(3x - 5y), NOT (9x + 25y).' },
    { misconception: 'In a³ + b³, keeping a positive middle term in the quadratic', correction: 'The quadratic factor middle term ALWAYS flips: a³ + b³ = (a + b)(a² - ab + b²).' },
    { misconception: 'When a ≠ 1 in ax² + bx + c, looking for factors of c instead of ac', correction: 'You must multiply a · c to find the target product before finding numbers that add to b.' },
    { misconception: 'Substituting an isolated variable back into the SAME equation', correction: 'Always substitute into the OTHER (untouched) equation to collapse 2 variables into 1.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the formula for asset depreciation over n years at r% p.a.?', options: ['A = P(1 + r/100)ⁿ', 'A = P(1 - r/100)ⁿ', 'A = P(1 - nr/100)', 'A = P / (1 + r/100)ⁿ'], correctIndex: 1 },
    { question: 'Expand (x + 5)².', options: ['x² + 25', 'x² + 10x + 25', 'x² + 5x + 25', '2x + 10'], correctIndex: 1 },
    { question: 'What is the expansion of (a - b)³?', options: ['a³ - b³', 'a³ - 3a²b + 3ab² - b³', 'a³ - 3a²b - 3ab² - b³', 'a³ + 3a²b - 3ab² - b³'], correctIndex: 1 },
    { question: 'Expand (x - 3)(x - 4).', options: ['x² - 7x - 12', 'x² - 7x + 12', 'x² + 7x + 12', 'x² - x + 12'], correctIndex: 1 },
    { question: 'Factorise 25x² - 36.', options: ['(5x - 6)²', '(25x + 36)(25x - 36)', '(5x + 6)(5x - 6)', '(5x + 6)²'], correctIndex: 2 },
    { question: 'Factorise a³ - b³.', options: ['(a - b)(a² + ab + b²)', '(a - b)(a² - ab + b²)', '(a + b)(a² + ab + b²)', '(a - b)³'], correctIndex: 0 },
    { question: 'In 3x² + 10x + 8, what is the target product for splitting the middle term?', options: ['8', '10', '24', '30'], correctIndex: 2 },
    { question: 'If 2x + y = 7 and y = 3, what is x?', options: ['1', '2', '4', '5'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student achieves fluent mastery across compound growth/depreciation, 5 core algebraic identities, 3 factorisation patterns, and simultaneous linear systems.',
};

// ─── INTERACTIVE EXPLORATION STEPS (5 Interactive Steps) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Exponential Growth & Depreciation Engine',
    instruction: 'Adjust the initial Principal P, annual Rate r, and toggle Growth (+) vs Depreciation (-). Observe how the year-by-year curve diverges from linear simple change!',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_MATH_011,
  },
  {
    title: 'Lab 2: Geometric Area Model of Binomial Expansion (a + b)²',
    instruction: 'Drag sliders for dimensions "a" and "b". Watch how the big square (a + b)² visibly partitions into 4 geometric sub-rectangles: a² + ab + ab + b² = a² + 2ab + b²!',
    interactionType: 'geometric-area',
    nodeId: NODE_C9_MATH_012,
  },
  {
    title: 'Lab 3: Product of Two Binomials (x + a)(x + b)',
    instruction: 'Manipulate constants \'a\' and \'b\' (positive or negative). Notice how the middle coefficient is the exact SUM (a + b) and the corner box is the PRODUCT (ab).',
    interactionType: 'product-grid',
    nodeId: NODE_C9_MATH_014,
  },
  {
    title: 'Lab 4: Visual Splitting of the Middle Term in ax² + bx + c',
    instruction: 'Select a quadratic. Click the factor pairs of \'ac\' to see which pair sums to \'b\' and mechanically unlocks the 4-term grouping rectangle.',
    interactionType: 'middle-split',
    nodeId: NODE_C9_MATH_018,
  },
  {
    title: 'Lab 5: Interactive Linear System Intersection (Simultaneous Equations)',
    instruction: 'Adjust slopes and intercepts for Line 1 (2x + y = 10) and Line 2 (x - y = 2). Drag the marker to the exact intersection point (x, y) where both equations balance!',
    interactionType: 'line-intersect',
    nodeId: NODE_C9_MATH_019,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an asset worth ₹1,00,000 depreciates at 20% per year for 2 years, will its value after 2 years be greater than, equal to, or less than ₹60,000?',
    options: [
      'Greater than ₹60,000 (It will be ₹64,000)',
      'Exactly ₹60,000 (20% + 20% = 40% loss)',
      'Less than ₹60,000 (Loss accelerates)',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now set P = 100,000, r = 20%, n = 2 in the simulator below to verify the exact compounded value!',
    nodeId: NODE_C9_MATH_011,
  },
  {
    question: 'Predict: When expanding (x + 3)(x - 5), what will be the sign of the middle term and the sign of the constant term?',
    options: [
      'Middle term negative (-2x), Constant term negative (-15)',
      'Middle term positive (+2x), Constant term negative (-15)',
      'Both terms positive (+2x, +15)',
      'Both terms negative (-8x, -15)',
    ],
    correctIndex: 0,
    verifyInstruction: 'Set a = 3, b = -5 in Lab 3 to see the sum (+3 - 5 = -2) and product (3 × -5 = -15) update!',
    nodeId: NODE_C9_MATH_014,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Navi Pragati Master Infrastructure Architect',
  description: 'Design the 5-year budget and physical layout for Navi Pragati\'s high-speed metro hub. Model the 8% annual ridership growth, calculate maintenance depreciation on the electric train coaches, and solve the power-grid simultaneous equation network.',
  steps: [
    'Calculate Year-5 passenger capacity starting from 50,000 daily commuters at 8% annual growth using A = P(1 + r/100)⁵.',
    'Model the salvage value of ₹10 crore train sets depreciating at 12% p.a. after 4 years.',
    'Use difference of squares (L + 15)² - (L - 15)² to compute the exact ring-track clearance area.',
    'Solve the power-load system: 3x + 2y = 120 MW, 2x + 4y = 160 MW for sub-stations x and y.',
  ],
};

// ─── MAIN COMPONENT ───
function C9_MathematicsRateGrowthDepreciationSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_MATH_011,
  title = DEFAULT_PROPS.title || 'Rate of Growth, Depreciation & Algebraic Foundations',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Prediction state
  const [predictionMade, setPredictionMade] = useState(false);

  // Lab 1 (CI Growth / Depreciation) State - Instant real-time slider updates
  const [ciPrincipal, setCiPrincipal] = useState(10000);
  const [ciRate, setCiRate] = useState(10);
  const [ciYears, setCiYears] = useState(3);
  const [ciMode, setCiMode] = useState<'growth' | 'depreciation'>('growth');

  // Lab 2 (Binomial Area Model) State
  const [geoA, setGeoA] = useState(40);
  const [geoB, setGeoB] = useState(25);
  const [activeTile, setActiveTile] = useState<string | null>(null);

  // Lab 3 (Product of Binomials Grid) State
  const [prodA, setProdA] = useState(3);
  const [prodB, setProdB] = useState(-5);

  // Lab 4 (Middle-term splitting interactive tool) State
  const [quadChoice, setQuadChoice] = useState<'q1' | 'q2' | 'q3'>('q1');
  const [selectedPair, setSelectedPair] = useState<number | null>(null);

  // Lab 5 (Linear system intersection) State
  const [line1C, setLine1C] = useState(10); // 2x + y = line1C
  const [line2C, setLine2C] = useState(2);  // x - y = line2C

  // Reflection responses state
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Adaptive difficulty & SRS / BKT
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
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive challenge inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback animation state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered challenges by difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Calculated compound value for Lab 1 (updates in real time as sliders move)
  const ciCalculated = useMemo(() => {
    const factor = ciMode === 'growth' ? (1 + ciRate / 100) : (1 - ciRate / 100);
    const amount = ciPrincipal * Math.pow(factor, ciYears);
    const netChange = Math.abs(amount - ciPrincipal);
    return {
      amount: Math.round(amount * 100) / 100,
      netChange: Math.round(netChange * 100) / 100,
      yearly: Array.from({ length: ciYears + 1 }, (_, i) => {
        return Math.round(ciPrincipal * Math.pow(factor, i));
      }),
    };
  }, [ciPrincipal, ciRate, ciYears, ciMode]);

  // Calculated intersection for Lab 5: 2x + y = C1, x - y = C2 => 3x = C1 + C2 => x = (C1+C2)/3, y = x - C2
  const linearIntersection = useMemo(() => {
    const x = (line1C + line2C) / 3;
    const y = x - line2C;
    return {
      x: Math.round(x * 100) / 100,
      y: Math.round(y * 100) / 100,
      isValid: Number.isFinite(x) && Number.isFinite(y),
    };
  }, [line1C, line2C]);

  // Mount effect: load existing mastery
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty effect
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // 2D Canvas Wave Animation Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2.5;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + frame * 1.5) * 0.03) * 15 * Math.sin(frame * 0.02);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const pulseX = (frame * 2) % canvas.width;
      const pulseY = canvas.height / 2 + Math.sin((pulseX + frame * 1.5) * 0.03) * 15 * Math.sin(frame * 0.02);
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 4, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Handlers
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the step-by-step mathematical explanation together.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding mathematical intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Mathematics Labs. Manipulate each visual model to uncover algebraic identities.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Sandbox unlocked. Freely test growth curves and binomial dimensions without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Beginning the Board Examination Challenges. Solve with accuracy!');
  }, []);

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to see the compounded math in real-time.');
  }, []);

  const handleTileClick = useCallback((tileId: string) => {
    setActiveTile(tileId);
    audioManager.play('tap');
  }, []);

  const handleSelectQuadPair = useCallback((pairIndex: number) => {
    setSelectedPair(pairIndex);
    audioManager.play('tap');
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

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered Rate of Growth, Expansions, Factorisations, and Simultaneous Systems!');
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof ans === 'string' ? parseFloat(ans) : ans as number;
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = ans === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent algebraic derivation.');
      setShowConfetti(true);
      setShowSparkle(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, 'mastered');
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
        speechManager.speak('Review the full mathematical solution steps.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleConstructToggle = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => {
      if (prev.includes(part)) return prev.filter(p => p !== part);
      return [...prev, part];
    });
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-800/40">
                ICSE Class 9 Mathematics
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : difficulty === 'standard'
                    ? 'bg-blue-950 text-blue-400 border border-blue-800'
                    : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
              aria-label={`Switch to ${p} phase`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Mini 2D Canvas Wave Banner */}
      <div className="my-3 rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80">
        <canvas ref={canvasRef} width={900} height={32} className="w-full h-8 block" />
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 my-4"
          >
            <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/40 shadow-xl">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm tracking-wide">
                <span>🏙️ SCENARIO SIMULATION</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-indigo-300/80 mt-3 p-3 bg-indigo-950/40 rounded-xl border border-indigo-900/40">
                💡 {SCENARIO.context}
              </p>
            </div>

            <div className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700">
              <span className="text-xs font-black tracking-widest text-amber-400 uppercase">Pre-Lab Intuition Challenge</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015, x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400'
                        : 'bg-slate-900/90 hover:bg-indigo-950/40 border-slate-700 text-slate-200 hover:border-indigo-500'
                    }`}
                    aria-label={`Discovery option ${i + 1}: ${opt}`}
                  >
                    <span className="font-bold mr-2 text-indigo-400">({String.fromCharCode(65 + i)})</span> {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {discoveryCorrect ? '✓ Spot on! Compounding applies to the dynamic reduced base each year.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 my-4"
          >
            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-700/80">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Interactive Discovery Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                  </span>
                  <h2 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
                </div>
                <div className="flex gap-1.5">
                  {EXPLORATION_STEPS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentSlide(idx);
                        audioManager.play('tap');
                      }}
                      className={`h-2.5 rounded-full transition-all ${
                        idx === currentSlide ? 'w-8 bg-indigo-500' : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                      }`}
                      aria-label={`Jump to lab ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm text-amber-300/90 my-3 font-medium flex items-center gap-2">
                <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── VISUALIZATION 1: Compound Growth & Depreciation Curve ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
                      <button
                        onClick={() => {
                          setCiMode('growth');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                          ciMode === 'growth' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        📈 Growth (A = P(1 + r/100)ⁿ)
                      </button>
                      <button
                        onClick={() => {
                          setCiMode('depreciation');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                          ciMode === 'depreciation' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        📉 Depreciation (A = P(1 - r/100)ⁿ)
                      </button>
                    </div>

                    {/* Real-time Slider Controls */}
                    <div className="space-y-3 bg-slate-900/70 p-4 rounded-xl border border-slate-800/80">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>Initial Principal (P):</span>
                          <span className="text-indigo-400 font-mono font-bold">₹{ciPrincipal.toLocaleString()}</span>
                        </div>
                        <input
                          type="range"
                          min={1000}
                          max={100000}
                          step={1000}
                          value={ciPrincipal}
                          onChange={(e) => setCiPrincipal(Number(e.target.value))}
                          className="w-full mt-1 accent-indigo-500"
                          aria-label="Set principal value"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>Annual Rate (r):</span>
                          <span className="text-indigo-400 font-mono font-bold">{ciRate}% p.a.</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={30}
                          value={ciRate}
                          onChange={(e) => setCiRate(Number(e.target.value))}
                          className="w-full mt-1 accent-indigo-500"
                          aria-label="Set annual rate"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>Time Period (n):</span>
                          <span className="text-indigo-400 font-mono font-bold">{ciYears} Years</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={6}
                          value={ciYears}
                          onChange={(e) => setCiYears(Number(e.target.value))}
                          className="w-full mt-1 accent-indigo-500"
                          aria-label="Set years"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/50 space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Final Value (A):</span>
                        <span className="font-mono font-bold text-emerald-400 text-sm">₹{ciCalculated.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Net {ciMode === 'growth' ? 'Appreciation' : 'Depreciation'} (|A - P|):</span>
                        <span className="font-mono font-bold text-amber-400 text-sm">₹{ciCalculated.netChange.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Real-time Multi-Year Bar Chart */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div className="w-full h-56 bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-end justify-around gap-2">
                      {ciCalculated.yearly.map((val, idx) => {
                        const maxVal = Math.max(...ciCalculated.yearly, ciPrincipal * 1.8);
                        const heightPct = Math.max(10, Math.min(100, (val / maxVal) * 100));
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                            <span className="text-[10px] font-mono font-bold text-slate-400 mb-1">
                              ₹{val > 9999 ? `${(val / 1000).toFixed(1)}k` : val}
                            </span>
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${heightPct}%` }}
                              transition={{ duration: 0.15 }}
                              className={`w-full rounded-t-lg transition-colors ${
                                ciMode === 'growth'
                                  ? 'bg-gradient-to-t from-indigo-700 to-emerald-500'
                                  : 'bg-gradient-to-t from-indigo-700 to-rose-500'
                              }`}
                            />
                            <span className="text-xs font-bold text-slate-400 mt-2">Yr {idx}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800">
                      {!predictionMade ? (
                        <div>
                          <p className="text-xs font-bold text-white mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                          <div className="flex flex-wrap gap-2">
                            {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                              <motion.button
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handlePrediction(i)}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-indigo-900/60 rounded-lg text-xs text-slate-200 border border-slate-700"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-emerald-400 font-semibold">
                            ✓ Compounded formula yields ₹64,000 (Loss is ₹20,000 in Yr 1, then 20% of ₹80,000 = ₹16,000 in Yr 2).
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── VISUALIZATION 2: Geometric Area Model for (a + b)² ─── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>Dimension a:</span>
                          <span className="text-indigo-400 font-mono font-bold">{geoA} px</span>
                        </div>
                        <input
                          type="range"
                          min={20}
                          max={60}
                          value={geoA}
                          onChange={(e) => setGeoA(Number(e.target.value))}
                          className="w-full mt-1 accent-indigo-500"
                          aria-label="Set dimension a"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>Dimension b:</span>
                          <span className="text-emerald-400 font-mono font-bold">{geoB} px</span>
                        </div>
                        <input
                          type="range"
                          min={15}
                          max={45}
                          value={geoB}
                          onChange={(e) => setGeoB(Number(e.target.value))}
                          className="w-full mt-1 accent-emerald-500"
                          aria-label="Set dimension b"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/60 font-mono text-xs space-y-1.5">
                      <p className="text-indigo-300 font-bold">Total Area = (a + b)²</p>
                      <p className="text-slate-300">
                        = ({geoA} + {geoB})² = ({geoA + geoB})² = <span className="text-amber-400 font-bold">{(geoA + geoB) ** 2}</span>
                      </p>
                      <div className="pt-2 border-t border-indigo-800/40 text-slate-400 text-[11px] space-y-0.5">
                        <p>• a² = {geoA * geoA}</p>
                        <p>• 2ab = 2 × ({geoA} × {geoB}) = {2 * geoA * geoB}</p>
                        <p>• b² = {geoB * geoB}</p>
                        <p className="text-emerald-300 font-bold">Sum = {geoA * geoA + 2 * geoA * geoB + geoB * geoB}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 320 260" className="w-full max-w-sm">
                      <g onClick={() => handleTileClick('a2')} className="cursor-pointer">
                        <rect
                          x="30"
                          y="20"
                          width={geoA * 2.2}
                          height={geoA * 2.2}
                          fill="#4f46e5"
                          opacity={activeTile === 'a2' ? 1 : 0.85}
                          stroke="#818cf8"
                          strokeWidth="2"
                          rx="4"
                        />
                        <text
                          x={30 + (geoA * 2.2) / 2}
                          y={20 + (geoA * 2.2) / 2 + 5}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="13"
                          fontWeight="bold"
                        >
                          a² ({geoA * geoA})
                        </text>
                      </g>

                      <g onClick={() => handleTileClick('ab1')} className="cursor-pointer">
                        <rect
                          x={30 + geoA * 2.2 + 4}
                          y="20"
                          width={geoB * 2.2}
                          height={geoA * 2.2}
                          fill="#059669"
                          opacity={activeTile === 'ab1' ? 1 : 0.85}
                          stroke="#34d399"
                          strokeWidth="2"
                          rx="4"
                        />
                        <text
                          x={30 + geoA * 2.2 + 4 + (geoB * 2.2) / 2}
                          y={20 + (geoA * 2.2) / 2 + 5}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          ab ({geoA * geoB})
                        </text>
                      </g>

                      <g onClick={() => handleTileClick('ab2')} className="cursor-pointer">
                        <rect
                          x="30"
                          y={20 + geoA * 2.2 + 4}
                          width={geoA * 2.2}
                          height={geoB * 2.2}
                          fill="#059669"
                          opacity={activeTile === 'ab2' ? 1 : 0.85}
                          stroke="#34d399"
                          strokeWidth="2"
                          rx="4"
                        />
                        <text
                          x={30 + (geoA * 2.2) / 2}
                          y={20 + geoA * 2.2 + 4 + (geoB * 2.2) / 2 + 4}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          ab ({geoA * geoB})
                        </text>
                      </g>

                      <g onClick={() => handleTileClick('b2')} className="cursor-pointer">
                        <rect
                          x={30 + geoA * 2.2 + 4}
                          y={20 + geoA * 2.2 + 4}
                          width={geoB * 2.2}
                          height={geoB * 2.2}
                          fill="#d97706"
                          opacity={activeTile === 'b2' ? 1 : 0.85}
                          stroke="#fbbf24"
                          strokeWidth="2"
                          rx="4"
                        />
                        <text
                          x={30 + geoA * 2.2 + 4 + (geoB * 2.2) / 2}
                          y={20 + geoA * 2.2 + 4 + (geoB * 2.2) / 2 + 4}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          b² ({geoB * geoB})
                        </text>
                      </g>
                    </svg>

                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      Click any block to inspect its area. Notice there are exactly two <span className="text-emerald-400 font-bold">ab</span> cross-term blocks!
                    </p>
                  </div>
                </div>
              )}

              {/* ─── VISUALIZATION 3: Binomial Product Grid (x + a)(x + b) ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>Constant a:</span>
                          <span className="text-indigo-400 font-mono font-bold">{prodA > 0 ? `+${prodA}` : prodA}</span>
                        </div>
                        <input
                          type="range"
                          min={-8}
                          max={8}
                          value={prodA}
                          onChange={(e) => setProdA(Number(e.target.value))}
                          className="w-full mt-1 accent-indigo-500"
                          aria-label="Set constant a"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>Constant b:</span>
                          <span className="text-amber-400 font-mono font-bold">{prodB > 0 ? `+${prodB}` : prodB}</span>
                        </div>
                        <input
                          type="range"
                          min={-8}
                          max={8}
                          value={prodB}
                          onChange={(e) => setProdB(Number(e.target.value))}
                          className="w-full mt-1 accent-amber-500"
                          aria-label="Set constant b"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/60 font-mono text-xs space-y-2">
                      <p className="text-indigo-300 font-bold">
                        (x {prodA >= 0 ? `+ ${prodA}` : `- ${Math.abs(prodA)}`})(x {prodB >= 0 ? `+ ${prodB}` : `- ${Math.abs(prodB)}`})
                      </p>
                      <p className="text-slate-200">
                        = x² + ({prodA} + {prodB})x + ({prodA} × {prodB})
                      </p>
                      <p className="text-emerald-400 font-bold text-sm">
                        = x² {prodA + prodB >= 0 ? `+ ${prodA + prodB}` : `- ${Math.abs(prodA + prodB)}`}x {prodA * prodB >= 0 ? `+ ${prodA * prodB}` : `- ${Math.abs(prodA * prodB)}`}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-7 flex flex-col justify-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono font-bold">
                      <div className="p-3 bg-slate-950 text-slate-500 rounded-lg flex items-center justify-center">×</div>
                      <div className="p-3 bg-indigo-950/80 text-indigo-300 rounded-lg border border-indigo-800/60">x</div>
                      <div className="p-3 bg-amber-950/80 text-amber-300 rounded-lg border border-amber-800/60">
                        {prodB >= 0 ? `+${prodB}` : prodB}
                      </div>

                      <div className="p-3 bg-indigo-950/80 text-indigo-300 rounded-lg border border-indigo-800/60">x</div>
                      <div className="p-4 bg-indigo-900/60 text-white rounded-lg border border-indigo-600">x²</div>
                      <div className="p-4 bg-slate-800 text-amber-300 rounded-lg border border-slate-700">
                        {prodB >= 0 ? `+${prodB}x` : `${prodB}x`}
                      </div>

                      <div className="p-3 bg-indigo-950/80 text-indigo-300 rounded-lg border border-indigo-800/60">
                        {prodA >= 0 ? `+${prodA}` : prodA}
                      </div>
                      <div className="p-4 bg-slate-800 text-indigo-300 rounded-lg border border-slate-700">
                        {prodA >= 0 ? `+${prodA}x` : `${prodA}x`}
                      </div>
                      <div className="p-4 bg-emerald-950/80 text-emerald-300 rounded-lg border border-emerald-700">
                        {prodA * prodB >= 0 ? `+${prodA * prodB}` : `${prodA * prodB}`}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 text-center mt-3">
                      The diagonal terms combine by addition: ({prodA}x + {prodB}x) = <span className="text-white font-bold">{prodA + prodB}x</span>.
                    </p>
                  </div>
                </div>
              )}

              {/* ─── VISUALIZATION 4: Middle Term Splitting Lab ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex gap-2">
                    {[
                      { id: 'q1', title: '2x² + 7x + 3', a: 2, b: 7, c: 3, ac: 6, pairs: [[1, 6, 7], [2, 3, 5]] },
                      { id: 'q2', title: '6x² + 11x - 10', a: 6, b: 11, c: -10, ac: -60, pairs: [[15, -4, 11], [12, -5, 7], [20, -3, 17]] },
                      { id: 'q3', title: 'x² + 7x + 12', a: 1, b: 7, c: 12, ac: 12, pairs: [[3, 4, 7], [2, 6, 8], [1, 12, 13]] },
                    ].map((q) => (
                      <button
                        key={q.id}
                        onClick={() => {
                          setQuadChoice(q.id as 'q1' | 'q2' | 'q3');
                          setSelectedPair(null);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          quadChoice === q.id
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {q.title}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400">
                      Step 1: Compute Target Product <span className="text-indigo-400 font-mono font-bold">ac = a × c</span>
                    </p>
                    <p className="text-sm font-bold text-white mt-1">
                      Target Product = {quadChoice === 'q1' ? '2 × 3 = 6' : quadChoice === 'q2' ? '6 × (-10) = -60' : '1 × 12 = 12'}. Need factors that sum to middle coefficient b = {quadChoice === 'q1' ? '7' : quadChoice === 'q2' ? '11' : '7'}.
                    </p>

                    <p className="text-xs font-semibold text-slate-300 mt-4 mb-2">Click the correct factor pair (p, q):</p>
                    <div className="flex flex-wrap gap-3">
                      {(quadChoice === 'q1'
                        ? [{ p: 1, q: 6, sum: 7, correct: true }, { p: 2, q: 3, sum: 5, correct: false }]
                        : quadChoice === 'q2'
                        ? [{ p: 15, q: -4, sum: 11, correct: true }, { p: 12, q: -5, sum: 7, correct: false }, { p: 20, q: -3, sum: 17, correct: false }]
                        : [{ p: 3, q: 4, sum: 7, correct: true }, { p: 2, q: 6, sum: 8, correct: false }, { p: 1, q: 12, sum: 13, correct: false }]
                      ).map((item, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleSelectQuadPair(idx)}
                          className={`p-3 rounded-xl border text-xs font-mono font-bold transition-all ${
                            selectedPair === idx
                              ? item.correct
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                : 'bg-rose-950 border-rose-500 text-rose-300'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-indigo-500'
                          }`}
                        >
                          ({item.p}) × ({item.q}) = {item.p * item.q} | Sum = {item.sum}
                          {selectedPair === idx && (item.correct ? ' ✓ (Match!)' : ' ✗ (Sum ≠ b)')}
                        </motion.button>
                      ))}
                    </div>

                    {selectedPair !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 font-mono text-xs space-y-1.5"
                      >
                        <p className="text-indigo-300 font-bold">Step 2: Rewrite & Group 4 Terms</p>
                        {quadChoice === 'q1' && (
                          <p className="text-slate-200">
                            2x² + 7x + 3 = 2x² + x + 6x + 3 = x(2x + 1) + 3(2x + 1) = <span className="text-emerald-400 font-bold">(2x + 1)(x + 3)</span>
                          </p>
                        )}
                        {quadChoice === 'q2' && (
                          <p className="text-slate-200">
                            6x² + 11x - 10 = 6x² + 15x - 4x - 10 = 3x(2x + 5) - 2(2x + 5) = <span className="text-emerald-400 font-bold">(2x + 5)(3x - 2)</span>
                          </p>
                        )}
                        {quadChoice === 'q3' && (
                          <p className="text-slate-200">
                            x² + 7x + 12 = x² + 3x + 4x + 12 = x(x + 3) + 4(x + 3) = <span className="text-emerald-400 font-bold">(x + 3)(x + 4)</span>
                          </p>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── VISUALIZATION 5: Simultaneous Linear System Intersection ─── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>Line 1: 2x + y = C₁</span>
                          <span className="text-indigo-400 font-mono font-bold">C₁ = {line1C}</span>
                        </div>
                        <input
                          type="range"
                          min={6}
                          max={16}
                          value={line1C}
                          onChange={(e) => setLine1C(Number(e.target.value))}
                          className="w-full mt-1 accent-indigo-500"
                          aria-label="Set constant for line 1"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300">
                          <span>Line 2: x - y = C₂</span>
                          <span className="text-emerald-400 font-mono font-bold">C₂ = {line2C}</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={6}
                          value={line2C}
                          onChange={(e) => setLine2C(Number(e.target.value))}
                          className="w-full mt-1 accent-emerald-500"
                          aria-label="Set constant for line 2"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-950/50 rounded-xl border border-indigo-800/60 font-mono text-xs space-y-2">
                      <p className="text-indigo-300 font-bold">Simultaneous Solution (Elimination)</p>
                      <p className="text-slate-300">Add (2x + y) + (x - y) = {line1C} + {line2C}</p>
                      <p className="text-slate-300">3x = {line1C + line2C} =&gt; <span className="text-emerald-400 font-bold">x = {linearIntersection.x}</span></p>
                      <p className="text-slate-300">y = x - {line2C} =&gt; <span className="text-amber-400 font-bold">y = {linearIntersection.y}</span></p>
                    </div>
                  </div>

                  <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 300 240" className="w-full max-w-sm">
                      <line x1="20" y1="200" x2="280" y2="200" stroke="#475569" strokeWidth="1.5" />
                      <line x1="40" y1="20" x2="40" y2="220" stroke="#475569" strokeWidth="1.5" />
                      <text x="285" y="204" fill="#94a3b8" fontSize="10">x</text>
                      <text x="36" y="15" fill="#94a3b8" fontSize="10">y</text>

                      <line
                        x1={40}
                        y1={200 - line1C * 16}
                        x2={40 + (line1C / 2) * 25}
                        y2={200}
                        stroke="#818cf8"
                        strokeWidth="2.5"
                      />

                      <line
                        x1={40 + line2C * 25}
                        y1={200}
                        x2={40 + (line2C + 7) * 25}
                        y2={200 - 7 * 16}
                        stroke="#34d399"
                        strokeWidth="2.5"
                      />

                      {linearIntersection.isValid && (
                        <g>
                          <circle
                            cx={40 + linearIntersection.x * 25}
                            cy={200 - linearIntersection.y * 16}
                            r="6"
                            fill="#f59e0b"
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                          <text
                            x={40 + linearIntersection.x * 25 + 10}
                            y={200 - linearIntersection.y * 16 - 8}
                            fill="#f59e0b"
                            fontSize="11"
                            fontWeight="bold"
                          >
                            ({linearIntersection.x}, {linearIntersection.y})
                          </text>
                        </g>
                      )}
                    </svg>

                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      Moving sliders recalculates the intersection point where both equations balance simultaneously!
                    </p>
                  </div>
                </div>
              )}

              {/* Lab Navigation Controls */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs font-semibold text-slate-400">
                  {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('tap');
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
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
                  >
                    Unlock Free Sandbox →
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6 my-4"
          >
            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Free Play Mode</span>
                  <h2 className="text-2xl font-black text-white mt-0.5">Algebraic Sandbox</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToChallenge}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30"
                >
                  Ready for Exam Challenges →
                </motion.button>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm mt-2">
                Experiment freely without grading constraints. Drag the sliders to observe instant recalculation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-indigo-400">1. Compound Rate Engine</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCiMode('growth')}
                      className={`flex-1 py-1 text-xs font-bold rounded-lg ${ciMode === 'growth' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                    >
                      Growth
                    </button>
                    <button
                      onClick={() => setCiMode('depreciation')}
                      className={`flex-1 py-1 text-xs font-bold rounded-lg ${ciMode === 'depreciation' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                    >
                      Depreciation
                    </button>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={25}
                    value={ciRate}
                    onChange={(e) => setCiRate(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                    aria-label="Adjust rate in sandbox"
                  />
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Rate: {ciRate}% p.a.</span>
                    <span className="text-emerald-400 font-bold">A = ₹{ciCalculated.amount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-emerald-400">2. (a + b)² Expansion Area</span>
                  <input
                    type="range"
                    min={20}
                    max={50}
                    value={geoA}
                    onChange={(e) => setGeoA(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                    aria-label="Adjust dimension a in sandbox"
                  />
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">a = {geoA}, b = {geoB}</span>
                    <span className="text-amber-400 font-bold">(a + b)² = {(geoA + geoB) ** 2}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: BOARD EXAMINATION CHALLENGES ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 my-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black tracking-wider uppercase text-indigo-400">
                  Question {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    Node: {challenge.nodeId}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800">
                    Competency: {challenge.competencyLevel}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Mastery Level</span>
                <p className="text-xs font-bold text-indigo-300 capitalize">{masteryLevel}</p>
              </div>
            </div>

            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                initial={{ width: 0 }}
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-2xl border transition-colors ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-500'
                  : 'bg-slate-800/90 border-slate-700'
              }`}
            >
              <h3 className="text-lg font-bold text-white mb-4 leading-relaxed">{challenge.question}</h3>

              {/* MCQ */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015, x: 4 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                        showExplanation
                          ? i === challenge.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400'
                          : 'bg-slate-900 hover:bg-indigo-950/40 border-slate-700 text-slate-200 hover:border-indigo-500'
                      }`}
                      aria-label={`Option ${i + 1}: ${opt}`}
                    >
                      <span className="font-bold mr-2 text-indigo-400">({String.fromCharCode(65 + i)})</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* NUMERIC */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter exact calculated value"
                      disabled={showExplanation}
                      className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-indigo-500 outline-none w-64"
                      aria-label="Numeric input answer"
                    />
                    {challenge.unit && <span className="text-slate-400 font-bold text-sm">{challenge.unit}</span>}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || numericInput.trim() === ''}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl font-bold text-sm shadow-md"
                    >
                      Submit Answer
                    </motion.button>
                  </div>
                </div>
              )}

              {/* DRAG-LABEL */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2.5 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-bold self-center mr-2">Available Labels:</span>
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3.5 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold cursor-grab shadow-sm"
                        role="button"
                        aria-label={`Drag label: ${item.label}`}
                      >
                        ⠿ {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['box_leading', 'box_middle', 'box_constant'].map((targetId) => (
                      <div
                        key={targetId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] transition-colors ${
                          droppedLabels[targetId]
                            ? 'bg-emerald-950/40 border-emerald-500'
                            : 'bg-slate-950/60 border-slate-700 hover:border-indigo-500'
                        }`}
                      >
                        <span className="text-[11px] text-slate-400 uppercase font-semibold mb-1">
                          {targetId === 'box_leading' ? 'x² Term' : targetId === 'box_middle' ? '(a + b)x Term' : 'ab Term'}
                        </span>
                        <span className="text-xs font-bold text-emerald-300 text-center">
                          {droppedLabels[targetId] || 'Drop Label Here'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl font-bold text-xs shadow-md"
                  >
                    Verify Label Mapping
                  </motion.button>
                </div>
              )}

              {/* DRAG-SORT */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map(idx => challenge.sortItems![idx])
                      : challenge.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIdx);
                        }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="p-3 bg-slate-950 hover:bg-slate-900 border border-slate-700 rounded-xl flex items-center gap-3 cursor-grab text-xs font-medium text-slate-200"
                        role="button"
                        aria-label={`Step ${displayIdx + 1}: ${item}`}
                      >
                        <span className="w-6 h-6 rounded-full bg-indigo-900/70 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center text-xs">
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
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-md"
                  >
                    Check Logical Order
                  </motion.button>
                </div>
              )}

              {/* CONSTRUCT */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 font-semibold">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleConstructToggle(part)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                          constructParts.includes(part)
                            ? 'bg-emerald-700 border-emerald-400 text-white'
                            : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-indigo-500'
                        }`}
                      >
                        {part} {constructParts.includes(part) && '✓'}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                    <span className="text-slate-500 mr-2">Selected Product:</span>
                    <span className="text-emerald-400 font-bold">{constructParts.join(' ') || 'None selected'}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl font-bold text-xs shadow-md"
                  >
                    Check Constructed Expression
                  </motion.button>
                </div>
              )}

              {/* EXPLANATION */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-indigo-950/60 border border-indigo-700/60 rounded-2xl space-y-3"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step-by-Step Board Solution</span>

                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono"
                    >
                      <span className="font-bold text-indigo-400 mr-2">Step {idx + 1}:</span>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setRevealedSteps(s => s + 1);
                        audioManager.play('tap');
                      }}
                      className="px-4 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Derivation Step →
                    </motion.button>
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 mt-3"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Examination →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION, MASTERY PROFILE & REFLECTION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 my-6"
          >
            <div className="text-center space-y-2">
              <span className="text-5xl">🏆</span>
              <h2 className="text-3xl font-black text-white">Curriculum Mastery Achieved!</h2>
              <p className="text-slate-300 text-sm">
                Score: <span className="text-emerald-400 font-bold font-mono text-lg">{Math.max(0, 100 - errors * 5)}%</span> | Level: <span className="text-indigo-400 font-bold capitalize">{masteryLevel}</span>
              </p>
            </div>

            {/* Performance Feedback */}
            <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-700/60 text-sm text-emerald-200">
              <p className="font-bold">
                {errors === 0
                  ? '🌟 PERFECT SCORE: Full mastery across Rate of Growth, Expansions, Factorisations & Simultaneous Systems!'
                  : errors <= 3
                  ? '👏 EXCELLENT WORK: Solid algebraic foundations! Review the minor misconceptions below to lock in 100% precision.'
                  : '📈 COMMENDABLE EFFORT: You are building true conceptual intuition. Review the diagnostic corrections below and re-run the simulation.'}
              </p>
            </div>

            {/* Misconception Diagnostic */}
            {hitMisconceptions.length > 0 && (
              <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                  Targeted Misconception Diagnostic
                </span>
                <div className="space-y-2">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions[idx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/40 text-xs space-y-1">
                        <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                        <p className="text-emerald-300 font-medium">✓ ICSE Correction: {m.correction}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── REQUIRED REFLECTION SECTION ─── */}
            <div className="p-6 bg-slate-800/90 rounded-2xl border border-indigo-700/60 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤔</span>
                <h3 className="text-lg font-black text-white">Post-Simulation Reflection</h3>
              </div>
              <p className="text-xs text-slate-300">
                Reflect on your learning journey to consolidate conceptual understanding and transfer knowledge.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-indigo-300 flex items-center gap-2">
                    <span>1.</span> What was the most surprising thing you learned?
                  </label>
                  <textarea
                    value={reflection1}
                    onChange={(e) => setReflection1(e.target.value)}
                    placeholder="e.g. How depreciation is calculated on the reduced value each year, or why (a-b)² always ends in +b²..."
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    rows={2}
                  />
                </div>

                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-indigo-300 flex items-center gap-2">
                    <span>2.</span> How would you explain this to a friend?
                  </label>
                  <textarea
                    value={reflection2}
                    onChange={(e) => setReflection2(e.target.value)}
                    placeholder="e.g. I would explain binomial expansion using the 4-rectangle area model where total area is a² + 2ab + b²..."
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    rows={2}
                  />
                </div>

                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-indigo-300 flex items-center gap-2">
                    <span>3.</span> Where in real life might you use this?
                  </label>
                  <textarea
                    value={reflection3}
                    onChange={(e) => setReflection3(e.target.value)}
                    placeholder="e.g. Calculating the resale value of a car or electronics over time, or calculating intersection points for city budgets..."
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    rows={2}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      setReflectionSaved(true);
                      audioManager.play('success');
                    }}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    {reflectionSaved ? '✓ Reflection Saved' : 'Save Reflection'}
                  </button>
                  {reflectionSaved && (
                    <span className="text-xs text-emerald-400 font-semibold">
                      Your reflections have been recorded to your learning journal!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Spaced Repetition */}
            <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 text-xs text-slate-300 flex items-center justify-between">
              <div>
                <span className="font-bold text-indigo-300">Spaced Repetition Engine (SM-2):</span>
                <p className="text-slate-400 mt-0.5">
                  Optimal review scheduled in{' '}
                  <span className="text-amber-400 font-bold">
                    {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                  </span>{' '}
                  to cement long-term neural pathways.
                </p>
              </div>
              <span className="text-2xl">📅</span>
            </div>

            {/* Real World Capstone */}
            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
              <h3 className="text-lg font-black text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="space-y-1.5 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-400 font-mono">
                    <span className="font-bold text-indigo-400">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Restart Button */}
            <div className="text-center pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('explore');
                  setCurrentChallenge(0);
                  setErrors(0);
                  audioManager.play('tap');
                }}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-600/30"
              >
                Re-explore Interactive Labs ↺
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals & Feedback */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSparkle && <SparkleBurst x={0} y={0} onComplete={() => setShowSparkle(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Completed Successfully!" onComplete={() => setShowSuccess(false)} />}
    </div>
  );
}

export default C9_MathematicsRateGrowthDepreciationSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C7_MATH_011 = 'c7_math_011'; // Multiplication & division of decimal fractions
const NODE_C7_MATH_012 = 'c7_math_012'; // Exponents (natural numbers)
const NODE_C7_MATH_013 = 'c7_math_013'; // Laws of exponents
const NODE_C7_MATH_014 = 'c7_math_014'; // Application of laws of exponents
const NODE_C7_MATH_015 = 'c7_math_015'; // Revision of idea of sets
const NODE_C7_MATH_016 = 'c7_math_016'; // Equal, equivalent, universal sets
const NODE_C7_MATH_017 = 'c7_math_017'; // Cardinal property of sets
const NODE_C7_MATH_018 = 'c7_math_018'; // Ratio and proportion
const NODE_C7_MATH_019 = 'c7_math_019'; // Unitary method (direct & inverse)
const NODE_C7_MATH_020 = 'c7_math_020'; // Percentage introduction

const ALL_NODE_IDS = [
  NODE_C7_MATH_011, NODE_C7_MATH_012, NODE_C7_MATH_013, NODE_C7_MATH_014, NODE_C7_MATH_015,
  NODE_C7_MATH_016, NODE_C7_MATH_017, NODE_C7_MATH_018, NODE_C7_MATH_019, NODE_C7_MATH_020
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Smart City Architecture Lab',
  intro: 'You are the Lead Math Engineer designing Bengaluru’s newest Smart Tech Corridor. To build sustainable towers, allocate water pipelines, optimize server clouds, and partition solar grids, you must master decimals, powers of 10, sets, ratios, and percentages.',
  context: 'Every calculation directly affects resource allocation, energy efficiency, and municipal budgeting across 10 vital city sectors.'
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'A high-efficiency solar panel captures 0.1 of incoming sunlight, and an anti-reflective coating transmits 0.1 of that energy. What is the combined efficiency fraction?',
  options: [
    '0.1 — because one-tenth multiplied stays one-tenth',
    '0.01 — because one-tenth of one-tenth is one-hundredth',
    '0.2 — because 0.1 + 0.1 = 0.2',
    '1.0 — multiplying small numbers scales them up to whole units'
  ],
  correctIndex: 1,
  hintAfter: 'Multiplying proper decimal fractions always gives an even smaller decimal fraction: 1/10 × 1/10 = 1/100 = 0.01. Let us explore why using 100-grid area models!'
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 & ICSE ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1 - 7)
  {
    id: 'ch_01',
    nodeId: NODE_C7_MATH_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Calculate 0.12 × 0.4. How many total decimal places must the final product contain?',
    options: [
      '1 decimal place (0.48)',
      '2 decimal places (0.48)',
      '3 decimal places (0.048)',
      '4 decimal places (0.0048)'
    ],
    correctIndex: 2,
    explanation: 'Count the decimal places in the factors: 0.12 has 2 places and 0.4 has 1 place. 2 + 1 = 3 places. 12 × 4 = 48 -> 0.048.',
    hints: [
      'Look at the number of digits after the decimal point in 0.12 (2 places) and 0.4 (1 place).',
      'Add the number of decimal places: 2 in 0.12 plus 1 in 0.4 equals 3 places.',
      'Multiply whole numbers 12 × 4 = 48, then place decimal 3 spots from the right: 0.048.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_02',
    nodeId: NODE_C7_MATH_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In the exponential expression 5³, what do 5 and 3 represent, and what is its evaluated value?',
    options: [
      '5 is exponent, 3 is base; value = 15',
      '5 is base, 3 is exponent; value = 15 (5 × 3)',
      '5 is base, 3 is exponent; value = 125 (5 × 5 × 5)',
      '5 is multiplier, 3 is power; value = 243'
    ],
    correctIndex: 2,
    explanation: '5 is the base (the repeated factor) and 3 is the exponent (the counter of factors). 5³ = 5 × 5 × 5 = 125.',
    hints: [
      'The big number on the main line is the base; the superscript is the exponent/index.',
      'The exponent is NOT a multiplier. It indicates repeated multiplication.',
      '5 × 5 = 25; 25 × 5 = 125.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_03',
    nodeId: NODE_C7_MATH_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to the multiplication law of exponents, simplify 2⁴ × 2³.',
    options: ['2¹² (multiply powers)', '2⁷ (add powers)', '4⁷ (multiply bases)', '2¹ (subtract powers)'],
    correctIndex: 1,
    explanation: 'When multiplying powers with the identical base, add the exponents: aᵐ × aⁿ = aᵐ⁺ⁿ. 2⁴ × 2³ = 2⁴⁺³ = 2⁷ = 128.',
    hints: [
      'Check if the bases are the same (both are 2).',
      'Joining a group of 4 twos with 3 twos gives 4 + 3 = 7 twos multiplied together.',
      'Keep base 2 unchanged and add exponents: 4 + 3 = 7 -> 2⁷.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_04',
    nodeId: NODE_C7_MATH_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following correctly represents the distinct set of letters in the word "KOLKATA"?',
    options: ['{K, O, L, K, A, T, A}', '{K, O, L, A, T}', '{K, O, L, T}', '(K, O, L, A, T)'],
    correctIndex: 1,
    explanation: 'In roster notation, sets contain only distinct objects inside curly braces with no duplicate elements. KOLKATA has unique letters K, O, L, A, T; so n = 5.',
    hints: [
      'Remember that elements in a mathematical set must not be repeated.',
      'Look for curly braces { } and eliminate duplicate letters K and A.',
      'The unique letters are K, O, L, A, T enclosed in { }.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_05',
    nodeId: NODE_C7_MATH_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Set P = {1, 2, 3} and Set Q = {x, y, z}. What is the exact relationship between P and Q?',
    options: [
      'P = Q (Equal sets)',
      'P ~ Q (Equivalent sets only, because n(P) = n(Q) = 3)',
      'Neither equal nor equivalent',
      'P is a universal set of Q'
    ],
    correctIndex: 1,
    explanation: 'P and Q have identical cardinality n(P) = n(Q) = 3, so they are equivalent (P ~ Q). Since their elements are different, they are not equal.',
    hints: [
      'Count the number of elements in each set.',
      'Equal sets must have the exact same members. Equivalent sets only need the same count.',
      'Both have 3 elements, but numbers are not letters; hence equivalent only.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_06',
    nodeId: NODE_C7_MATH_018,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Express the ratio 15 : 25 in simplest form. What is the consequent (second term)?',
    correctAnswer: 5,
    tolerance: 0,
    unit: '',
    explanation: 'The HCF of 15 and 25 is 5. Dividing both terms: (15÷5) : (25÷5) = 3 : 5. The antecedent is 3 and the consequent is 5.',
    hints: [
      'Find the Highest Common Factor (HCF) of 15 and 25.',
      'Divide both 15 and 25 by 5.',
      'The simplified ratio is 3 : 5. The consequent is the second term (5).'
    ]
  },
  {
    id: 'ch_07',
    nodeId: NODE_C7_MATH_020,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Convert the fraction 3/4 into a percentage (enter just the numerical value).',
    correctAnswer: 75,
    tolerance: 0,
    unit: '%',
    explanation: 'To convert any fraction to a percentage, multiply by 100: (3/4) × 100 = 300 / 4 = 75%.',
    hints: [
      'To convert a fraction to percent, multiply by 100.',
      '3/4 × 100 = 3 × 25.',
      '3 × 25 = 75.'
    ]
  },

  // Standard Tier (8 - 15)
  {
    id: 'ch_08',
    nodeId: NODE_C7_MATH_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A smart optical fibre cable costs ₹42.30 per metre. What is the total cost for 2.5 metres of cable in rupees?',
    correctAnswer: 105.75,
    tolerance: 0.05,
    unit: '₹',
    explanation: '2.5 × 42.30. Count 1 + 2 = 3 decimal places. 25 × 4230 = 105750 -> 105.750 = ₹105.75.',
    hints: [
      'Multiply 2.5 by 42.30.',
      'Multiply the whole numbers 25 × 4230 = 105750.',
      'Place decimal 3 places from right: 105.750 = 105.75.'
    ]
  },
  {
    id: 'ch_09',
    nodeId: NODE_C7_MATH_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Evaluate: 4.5 ÷ 0.5. A junior engineer claims the answer is 0.9 because division makes numbers smaller. Is this claim correct?',
    options: [
      'Correct: 4.5 ÷ 0.5 = 0.9',
      'Incorrect: Dividing by a number < 1 increases the quotient. Shift 1 decimal place: 45 ÷ 5 = 9',
      'Incorrect: The answer is 4.0',
      'Correct: Always shift decimal to the left'
    ],
    correctIndex: 1,
    explanation: 'Shift decimal 1 place in both divisor and dividend: 4.5 / 0.5 = 45 / 5 = 9. Dividing by a fraction < 1 is equivalent to multiplying by its reciprocal (here × 2).',
    hints: [
      'Shift the decimal point to make the divisor a whole number: 0.5 becomes 5.',
      'Perform the exact same shift to the dividend: 4.5 becomes 45.',
      '45 ÷ 5 = 9. Dividing by half doubles the original amount!'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_10',
    nodeId: NODE_C7_MATH_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Simplify the server load expression: (3²)⁴ ÷ 3⁵.',
    options: ['3³ = 27', '3¹ = 3', '3⁸ = 6561', '3² = 9'],
    correctIndex: 0,
    explanation: 'First apply power-of-a-power law: (3²)⁴ = 3²ˣ⁴ = 3⁸. Next apply division law: 3⁸ ÷ 3⁵ = 3⁸⁻�� = 3³ = 27.',
    hints: [
      'First simplify (3²)⁴ by multiplying powers: 2 × 4 = 8.',
      'Now divide: 3⁸ ÷ 3⁵ by subtracting exponents: 8 - 5 = 3.',
      'Evaluate: 3³ = 3 × 3 × 3 = 27.'
    ]
  },
  {
    id: 'ch_11',
    nodeId: NODE_C7_MATH_014,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A microbial water purifier begins with 8 bacteria (2³) and doubles every hour. How many bacteria exist after 4 hours?',
    correctAnswer: 128,
    tolerance: 0,
    unit: 'bacteria',
    explanation: 'Initial = 2³. In 4 hours, population multiplies by 2⁴. Total = 2³ × 2⁴ = 2³⁺⁴ = 2⁷ = 128 bacteria.',
    hints: [
      'Express initial count 8 as 2³.',
      'Doubling for 4 hours means multiplying by 2⁴.',
      'Use exponent addition law: 2³ × 2⁴ = 2⁷ = 128.'
    ]
  },
  {
    id: 'ch_12',
    nodeId: NODE_C7_MATH_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Let Universal set U = {1, 2, 3, ..., 10}. If Set D = {x : x is a prime number in U}, what is n(D)?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'elements',
    explanation: 'Prime numbers between 1 and 10 are 2, 3, 5, 7. (1 is neither prime nor composite). Thus D = {2, 3, 5, 7} and n(D) = 4.',
    hints: [
      'List all prime numbers in the range 1 to 10.',
      'Remember 1 is NOT a prime number; 2 is the only even prime.',
      'The prime set is {2, 3, 5, 7}. Count the elements: 4.'
    ]
  },
  {
    id: 'ch_13',
    nodeId: NODE_C7_MATH_018,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the missing term x in the proportion: 4 : 5 = x : 20.',
    correctAnswer: 16,
    tolerance: 0,
    unit: '',
    explanation: 'By the cross-product rule (product of extremes = product of means): 4 × 20 = 5 × x -> 80 = 5x -> x = 80 / 5 = 16.',
    hints: [
      'Use cross-multiplication: Product of extremes = Product of means.',
      '4 × 20 = 5 × x.',
      '80 = 5x -> x = 80 / 5 = 16.'
    ]
  },
  {
    id: 'ch_14',
    nodeId: NODE_C7_MATH_019,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If 3 technicians build a solar sub-station in 12 days, how many days will 6 technicians take at the same pace?',
    correctAnswer: 6,
    tolerance: 0,
    unit: 'days',
    explanation: 'This is inverse variation (more workers = fewer days). Total effort = 3 × 12 = 36 worker-days. 6 technicians take 36 ÷ 6 = 6 days.',
    hints: [
      'Ask: If workers increase, does time increase or decrease? (Inverse variation).',
      'Multiply first to find total worker-days: 3 × 12 = 36.',
      'Divide total work by 6 workers: 36 / 6 = 6 days.'
    ]
  },
  {
    id: 'ch_15',
    nodeId: NODE_C7_MATH_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a tech department, the ratio of software engineers to designers is 3 : 2. What percentage of the TOTAL team are software engineers?',
    options: ['150% (3 ÷ 2 × 100)', '60% (3 ÷ 5 × 100)', '40% (2 ÷ 5 × 100)', '30%'],
    correctIndex: 1,
    explanation: 'The base is the whole team: 3 + 2 = 5 parts. Engineers form 3 out of 5 parts -> (3/5) × 100 = 60%. (Dividing 3 by 2 is the common mistake of using the wrong base).',
    hints: [
      'Identify the total parts in the whole group: 3 + 2 = 5 parts.',
      'Fraction of software engineers is 3 / 5.',
      'Multiply by 100: (3/5) × 100 = 60%.'
    ],
    misconceptionIndex: 4
  },

  // Advanced Tier (16 - 22)
  {
    id: 'ch_16',
    nodeId: NODE_C7_MATH_011,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A chemical plant has 3.5 kg of catalyst reagent. It is packaged into 0.25 kg mini-packs. How many total mini-packs are created?',
    correctAnswer: 14,
    tolerance: 0,
    unit: 'packs',
    explanation: 'Packs = Total weight ÷ Pack weight = 3.5 ÷ 0.25. Shift decimal 2 places in both numbers: 350 ÷ 25 = 14 packs.',
    hints: [
      'Set up the division: 3.5 ÷ 0.25.',
      'Shift the decimal point 2 places right in both numbers: 350 ÷ 25.',
      '350 / 25 = 14.'
    ]
  },
  {
    id: 'ch_17',
    nodeId: NODE_C7_MATH_014,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the steps to simplify: [(10²)³ × 10⁴] ÷ 10⁷ into standard integer form.',
    sortItems: [
      'Apply power-of-a-power: (10²)³ = 10⁶',
      'Apply multiplication law: 10⁶ × 10⁴ = 10¹⁰',
      'Apply division law: 10¹⁰ ÷ 10⁷ = 10³',
      'Convert to standard integer: 10³ = 1,000'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First expand inner power: (10²)³ = 10⁶. Multiply: 10⁶ × 10⁴ = 10¹⁰. Divide: 10¹⁰⁻⁷ = 10³. Standard form: 1,000.',
    hints: [
      'Start inside the brackets with power-of-a-power.',
      'Next combine factors with the multiplication law.',
      'Then divide using subtraction of exponents and finally evaluate 10³.'
    ]
  },
  {
    id: 'ch_18',
    nodeId: NODE_C7_MATH_016,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Drag the correct classification label to each set pair relationship.',
    dragItems: [
      { label: 'Equal (A = B)', targetId: 'box_equal' },
      { label: 'Equivalent Only (A ~ B)', targetId: 'box_equiv' },
      { label: 'Universal Container (U)', targetId: 'box_univ' }
    ],
    correctMapping: {
      box_equal: 'Equal (A = B)',
      box_equiv: 'Equivalent Only (A ~ B)',
      box_univ: 'Universal Container (U)'
    },
    explanation: '{1,2,3} and {3,1,2} have identical members (Equal). {a,b,c} and {x,y,z} have same count 3 but different members (Equivalent only). The encompassing context set is Universal.',
    hints: [
      'Equal sets have identical elements regardless of order.',
      'Equivalent sets have identical counts n(A)=n(B) but distinct elements.',
      'The big reference set containing all sub-elements is Universal.'
    ]
  },
  {
    id: 'ch_19',
    nodeId: NODE_C7_MATH_019,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: '5 water inlet pumps fill the central city reservoir in 48 minutes. How many minutes will 8 pumps take at the same rate?',
    correctAnswer: 30,
    tolerance: 0,
    unit: 'minutes',
    explanation: 'Inverse variation: Total pump-minutes = 5 × 48 = 240. With 8 pumps: 240 ÷ 8 = 30 minutes.',
    hints: [
      'More pumps mean less time needed (inverse variation).',
      'Find total work capacity: 5 × 48 = 240 pump-minutes.',
      'Divide 240 by 8 to get 30 minutes.'
    ]
  },
  {
    id: 'ch_20',
    nodeId: NODE_C7_MATH_018,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Divide a smart corridor budget of ₹12,000 between Zone A and Zone B in the ratio 3 : 5. How much does Zone B receive in rupees?',
    correctAnswer: 7500,
    tolerance: 0,
    unit: '₹',
    explanation: 'Total ratio parts = 3 + 5 = 8. Value of 1 part = 12000 ÷ 8 = 1500. Zone B has 5 parts = 5 × 1500 = ₹7,500.',
    hints: [
      'Add the ratio terms: 3 + 5 = 8 total parts.',
      'Find the value of 1 part: ₹12,000 / 8 = ₹1,500.',
      'Zone B gets 5 parts: 5 × 1,500 = ₹7,500.'
    ]
  },
  {
    id: 'ch_21',
    nodeId: NODE_C7_MATH_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Aarav scored 36 out of 40 in Maths, and Priya scored 44 out of 50 in Science. Who had the higher percentage score?',
    options: [
      'Priya because 44 > 36 raw marks',
      'Aarav because 36/40 = 90% while 44/50 = 88%',
      'Both are exactly equal at 85%',
      'Cannot compare because the maximum marks differ'
    ],
    correctIndex: 1,
    explanation: 'Percentages standardize comparisons: Aarav = (36/40) × 100 = 90%. Priya = (44/50) × 100 = 88%. Aarav performed higher.',
    hints: [
      'Raw marks cannot be compared directly when totals differ.',
      'Convert Aarav: (36/40) × 100 = 90%.',
      'Convert Priya: (44/50) × 100 = 88%.'
    ]
  },
  {
    id: 'ch_22',
    nodeId: NODE_C7_MATH_013,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the simplified law formula for dividing powers with identical bases: aᵐ ÷ aⁿ = ?',
    availableParts: ['a', 'm', 'n', '+', '-', '×', 'ᵐ⁻ⁿ', 'ᵐ⁺ⁿ', 'ᵐⁿ'],
    targetState: 'a ᵐ⁻ⁿ',
    validationHint: 'Select base "a" followed by exponent symbol "ᵐ⁻ⁿ".',
    explanation: 'The division law for natural number exponents states that aᵐ ÷ aⁿ = aᵐ⁻ⁿ (where m > n).',
    hints: [
      'The base remains "a".',
      'In division, exponents are subtracted.',
      'Click "a" and then "ᵐ⁻ⁿ" to construct the simplified law.'
    ]
  }
];

// ─── EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Decimal Area Model',
    instruction: 'Adjust the height (0.1 to 0.9) and width (0.1 to 0.9) to see how tenths × tenths generate hundredths on the 100-grid.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_MATH_011
  },
  {
    title: 'Lab 2: Exponent Power Tower & Growth Curve',
    instruction: 'Adjust base (2 to 5) and exponent (1 to 5) to watch exponential growth vs linear multiplication.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_MATH_012
  },
  {
    title: 'Lab 3: Exponent Law Discoverer',
    instruction: 'Select power m and n to verify why aᵐ × aⁿ = aᵐ⁺ⁿ by counting total factor blocks.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_MATH_013
  },
  {
    title: 'Lab 4: Sets, Venn Diagrams & Cardinality',
    instruction: 'Inspect Set A and Set B inside Universal Set U to verify equal, equivalent, and disjoint set structures.',
    interactionType: 'click-parts',
    nodeId: NODE_C7_MATH_016
  },
  {
    title: 'Lab 5: Unitary Variation & Ratio Seesaw',
    instruction: 'Toggle Direct Variation vs Inverse Variation and test the doubling / halving rule with the visual seesaw.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_MATH_019
  }
];

// ─── PREDICT-THEN-CHECK ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you cut a 0.5 m ribbon into 0.1 m segments, how many segments will you get?',
    options: ['0.05 segments', '0.5 segments', '5 segments', '50 segments'],
    correctIndex: 2,
    verifyInstruction: 'Set Height to 0.5 and observe how 5 rows of 0.1 fit perfectly into 0.5!',
    nodeId: NODE_C7_MATH_011
  },
  {
    question: 'Predict: If 2 workers take 10 days to wire a tower floor, how long will 4 workers take?',
    options: ['20 days (doubles)', '10 days (stays same)', '5 days (halves)', '2.5 days'],
    correctIndex: 2,
    verifyInstruction: 'In the Unitary Seesaw lab, set workers to 4 under Inverse Variation to verify 5 days!',
    nodeId: NODE_C7_MATH_019
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the shaded area when you multiply 0.3 by 0.2 on a 10×10 unit square?',
    observableOptions: [
      'It covers 6 whole large squares',
      'It covers 6 small grid squares out of 100, which equals 0.06',
      'It covers 50 squares',
      'It covers 0.6 of the entire grid'
    ],
    correctIndex: 1,
    nodeId: NODE_C7_MATH_011
  },
  {
    question: 'Comparing 2⁵ (32) and 2 × 5 (10), what fundamental pattern do you observe?',
    observableOptions: [
      'They are identical values',
      '2 × 5 is larger than 2⁵',
      '2⁵ multiplies 2 repeatedly five times, growing rapidly compared to simple linear multiplication',
      'Exponents are simply shorthand for multiplying base by exponent'
    ],
    correctIndex: 2,
    nodeId: NODE_C7_MATH_012
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Smart City Metro & Power Planner',
  description: 'Apply your Class 7 arithmetic foundations to budget a 12.5 km solar metro corridor in your home state.',
  steps: [
    'Calculate total cable cost for 12.5 km at ₹84.50 per metre using decimal multiplication.',
    'Express total peak power of 100,000,000 Watts in compact exponent form (10⁸ W).',
    'Divide the maintenance squad of 40 staff between Track & Signals in the ratio 3 : 2.',
    'Calculate the percentage of solar energy utilized if 450 MWh out of 500 MWh generated is consumed.'
  ]
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
  nodeId: NODE_C7_MATH_011,
  title: 'Decimals, Exponents, Sets, Ratios & Percentages',
  definition: 'Comprehensive Class 7 arithmetic & algebraic foundations covering decimal operations, laws of natural exponents, set theory & cardinality, ratio/proportion, unitary variation, and percentages.',
  eli5: 'Think of decimals as slicing grids into tiny squares, exponents as giant growth copy machines, sets as organized club boxes, ratios as recipe balances, and percentages as measuring everything out of a 100-tile ruler!',
  misconceptions: [
    { misconception: '0.1 × 0.1 = 0.1 because multiplying keeps small numbers unchanged.', correction: '0.1 means 1/10. 1/10 × 1/10 = 1/100 = 0.01. Multiplying fractions less than 1 produces a smaller fraction.' },
    { misconception: '2³ means 2 × 3 = 6.', correction: 'The exponent is a counter of factors, not a multiplier. 2³ = 2 × 2 × 2 = 8.' },
    { misconception: 'When multiplying powers like 2³ × 2⁴, multiply exponents to get 2¹².', correction: 'With identical bases, exponents add: 2³ × 2⁴ = 2³⁺⁴ = 2⁷.' },
    { misconception: 'In roster form for sets, {1, 1, 2, 3} has cardinality 4.', correction: 'Sets contain unique items only; duplicate elements are ignored. n({1, 2, 3}) = 3.' },
    { misconception: 'For ratio 3:2, the percentage of the first part is (3/2) × 100 = 150%.', correction: 'Percentages must be calculated over the TOTAL whole (3 + 2 = 5 parts): (3/5) × 100 = 60%.' }
  ]
};

function C7_MathematicsMultiplicationDivisionDecimalSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['mathematics'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant Exploration & Interactive State
  const [decA, setDecA] = useState(0.3);
  const [decB, setDecB] = useState(0.4);
  const [expBase, setExpBase] = useState(2);
  const [expPower, setExpPower] = useState(3);
  const [lawM, setLawM] = useState(2);
  const [lawN, setLawN] = useState(3);
  const [activeSetTab, setActiveSetTab] = useState<'equal' | 'equivalent' | 'universal'>('equivalent');
  const [setItemsA] = useState<number[]>([1, 2, 3]);
  const [setItemsB] = useState<string[]>(['p', 'q', 'r']);
  const [unitaryMode, setUnitaryMode] = useState<'direct' | 'inverse'>('direct');
  const [unitaryInput, setUnitaryInput] = useState(4);

  // Prediction & Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Challenge Engine State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection State
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explainFriend: '',
    realLife: ''
  });
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Hints & Progressive Reveal
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interaction feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Challenge input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Persistence and BKT Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter challenges by adaptive difficulty
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

  // ─── BKT ADAPTIVE EFFECT ───
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

  // ─── 2D CANVAS ANIMATION ───
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
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 10; i++) {
        const x = (i + 1) * (canvas.width / 11);
        const y = (canvas.height / 2) + Math.sin((frame + i * 15) * 0.05) * 5;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.cos((frame + x) * 0.04) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── INACTIVITY & AUTO-HINT ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const nextH = challenge.hints[0];
        if (nextH) {
          setCurrentHint(nextH);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Here is a gentle hint to guide you.');
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge]);

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
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Brilliant intuition! Let us master the mathematics behind it.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive concept laboratory!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Experiment freely across all labs without tests.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the adaptive smart challenges!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive lab to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[1].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Great observation! The math confirms exponential growth.' : 'Take a closer look at the growth comparison.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the Class 7 arithmetic foundations.');
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding deduction.');
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
        speechManager.speak('Let us walk through the step-by-step reasoning together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorr = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorr) {
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

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleDecAChange = useCallback((val: number) => {
    setDecA(val);
    audioManager.play('count');
  }, []);

  const handleDecBChange = useCallback((val: number) => {
    setDecB(val);
    audioManager.play('count');
  }, []);

  const handleExpBaseChange = useCallback((val: number) => {
    setExpBase(val);
    audioManager.play('count');
  }, []);

  const handleExpPowerChange = useCallback((val: number) => {
    setExpPower(val);
    audioManager.play('count');
  }, []);

  const handleConstructAdd = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => [...prev, part]);
  }, []);

  const handleConstructRemove = useCallback((idx: number) => {
    audioManager.play('pop');
    setConstructParts(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE! Flawless conceptual mastery across all Class 7 modules!';
    if (errors >= 1 && errors <= 3) return 'Great work! You have strong mastery with minor room for precision.';
    if (errors >= 4 && errors <= 7) return 'Good effort! Review the decimal shifts and exponent laws to sharpen your intuition.';
    return 'Do not give up — You WILL get this! Practice makes arithmetic second nature.';
  }, [errors]);

  const srsDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans space-y-6"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-indigo-400 font-medium">Class 7 ICSE & CBSE | 10 Unified Mastery Modules</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.span
            key={phase}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-800 border border-slate-700 text-indigo-300"
          >
            Phase: {phase}
          </motion.span>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
              difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
              'bg-blue-500/20 text-blue-400 border border-blue-500/40'
            }`}
          >
            {difficulty}
          </motion.span>
        </div>
      </motion.header>

      {/* ─── CANVAS WAVE INDICATOR ─── */}
      <canvas ref={canvasRef} width={600} height={20} className="w-full h-4 rounded-lg opacity-75" />

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/40"
          >
            <h2 className="text-xl font-bold text-indigo-300">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic">{SCENARIO.context}</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <p className="text-xs uppercase tracking-wider font-bold text-amber-400">Curiosity Diagnostic Hook</p>
            </div>
            <h3 className="text-base font-semibold text-white leading-relaxed">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className="w-full text-left p-4 rounded-xl text-sm font-medium bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 transition-all text-slate-200"
                >
                  <span className="font-bold text-indigo-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! 0.1 × 0.1 = 0.01 (one-tenth of one-tenth is one-hundredth).' : `✕ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Concept Labs →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── 2. INTERACTIVE EXPLORATION PHASE (BRILLIANT LABS) ─── */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Interactive Lab {currentSlide + 1} of 5</span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <motion.span
              key={EXPLORATION_STEPS[currentSlide].nodeId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-slate-400 font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-800"
            >
              Node: {EXPLORATION_STEPS[currentSlide].nodeId}
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-amber-300 bg-amber-950/30 border border-amber-800/50 p-3.5 rounded-xl"
          >
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800"
            >
              {/* SLIDE 0: DECIMAL AREA MODEL (SVG #1) */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Vertical Height (A): <strong>{decA.toFixed(1)}</strong></span>
                          <span>{Math.round(decA * 10)} / 10 rows</span>
                        </div>
                        <input
                          type="range"
                          min={0.1}
                          max={0.9}
                          step={0.1}
                          value={decA}
                          onChange={(e) => handleDecAChange(parseFloat(e.target.value))}
                          aria-label="Set vertical decimal height"
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Horizontal Width (B): <strong>{decB.toFixed(1)}</strong></span>
                          <span>{Math.round(decB * 10)} / 10 columns</span>
                        </div>
                        <input
                          type="range"
                          min={0.1}
                          max={0.9}
                          step={0.1}
                          value={decB}
                          onChange={(e) => handleDecBChange(parseFloat(e.target.value))}
                          aria-label="Set horizontal decimal width"
                          className="w-full accent-cyan-500 cursor-pointer"
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2"
                      >
                        <p className="text-slate-300">
                          Fraction Form: <span className="text-indigo-400 font-bold">{Math.round(decA * 10)}/10</span> × <span className="text-cyan-400 font-bold">{Math.round(decB * 10)}/10</span> = <span className="text-emerald-400 font-bold">{Math.round(decA * 10 * decB * 10)}/100</span>
                        </p>
                        <p className="text-slate-300">
                          Decimal Product: <span className="font-mono text-emerald-400 font-black text-sm">{(decA * decB).toFixed(2)}</span>
                        </p>
                        <p className="text-slate-400 text-[11px]">
                          Place Value Rule: 1 place + 1 place = 2 decimal places in product!
                        </p>
                      </motion.div>
                    </div>

                    {/* TOPIC SVG #1: 100-Grid Decimal Area Model */}
                    <div className="flex flex-col items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                      <svg viewBox="0 0 220 220" className="w-56 h-56">
                        <defs>
                          <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect width="20" height="20" fill="none" stroke="#334155" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect x="10" y="10" width="200" height="200" fill="url(#gridPattern)" />
                        {Array.from({ length: 10 }).map((_, r) =>
                          Array.from({ length: 10 }).map((_, c) => {
                            const isRowActive = r < Math.round(decA * 10);
                            const isColActive = c < Math.round(decB * 10);
                            const isOverlap = isRowActive && isColActive;

                            return (
                              <rect
                                key={`${r}-${c}`}
                                x={10 + c * 20 + 1}
                                y={10 + r * 20 + 1}
                                width="18"
                                height="18"
                                rx="2"
                                fill={isOverlap ? '#10b981' : isRowActive ? '#6366f1' : isColActive ? '#06b6d4' : 'transparent'}
                                opacity={isOverlap ? 0.95 : 0.35}
                              />
                            );
                          })
                        )}
                        <rect x="10" y="10" width="200" height="200" fill="none" stroke="#64748b" strokeWidth="2" rx="4" />
                      </svg>
                      <span className="text-xs text-emerald-400 mt-2 font-mono font-bold">
                        Overlap Area = {Math.round(decA * 10 * decB * 10)} / 100 hundredths = {(decA * decB).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* PREDICT & OBSERVATION WIDGET */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-900/50 space-y-3"
                  >
                    {!predictionMade ? (
                      <div>
                        <p className="text-xs font-bold text-indigo-300 mb-2">Predict-then-Check: {PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(i)}
                              className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 border border-slate-700/50"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-emerald-300 font-medium">
                        ✓ Prediction locked! {PREDICTION_QUESTIONS[0].verifyInstruction}
                      </div>
                    )}
                  </motion.div>
                </div>
              )}

              {/* SLIDE 1: EXPONENT POWER TOWER & GROWTH CURVE (SVG #2) */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-slate-300 flex justify-between">
                          <span>Base (a): <strong>{expBase}</strong></span>
                          <span>The repeated factor</span>
                        </label>
                        <input
                          type="range"
                          min={2}
                          max={5}
                          step={1}
                          value={expBase}
                          onChange={(e) => handleExpBaseChange(parseInt(e.target.value))}
                          aria-label="Set base"
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 flex justify-between">
                          <span>Exponent / Index (n): <strong>{expPower}</strong></span>
                          <span>Factor counter</span>
                        </label>
                        <input
                          type="range"
                          min={1}
                          max={5}
                          step={1}
                          value={expPower}
                          onChange={(e) => handleExpPowerChange(parseInt(e.target.value))}
                          aria-label="Set exponent"
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2"
                      >
                        <p className="text-slate-200 font-mono">
                          Exponential Form: <span className="text-amber-400 font-bold text-base">{expBase}<sup>{expPower}</sup></span>
                        </p>
                        <p className="text-slate-300 font-mono">
                          Expanded Form: {Array.from({ length: expPower }).map(() => expBase).join(' × ')}
                        </p>
                        <p className="text-slate-200">
                          Evaluated Value: <span className="text-emerald-400 font-bold text-base">{Math.pow(expBase, expPower)}</span>
                        </p>
                        <p className="text-rose-400 font-mono text-[11px]">
                          Common mistake: {expBase} × {expPower} = {expBase * expPower} (LINEAR, NOT EXPONENTIAL!)
                        </p>
                      </motion.div>
                    </div>

                    {/* TOPIC SVG #2: Exponential Growth vs Linear Growth SVG Diagram */}
                    <div className="flex flex-col items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                      <svg viewBox="0 0 240 180" className="w-60 h-44">
                        {/* Axes */}
                        <line x1="30" y1="150" x2="220" y2="150" stroke="#475569" strokeWidth="2" />
                        <line x1="30" y1="150" x2="30" y2="20" stroke="#475569" strokeWidth="2" />
                        <text x="210" y="165" fill="#94a3b8" fontSize="10">n</text>
                        <text x="15" y="25" fill="#94a3b8" fontSize="10">f(n)</text>

                        {/* Linear line (expBase * n) */}
                        <path
                          d={`M 30 150 L 70 ${150 - (expBase * 1 * 6)} L 110 ${150 - (expBase * 2 * 6)} L 150 ${150 - (expBase * 3 * 6)} L 190 ${150 - (expBase * 4 * 6)}`}
                          fill="none"
                          stroke="#94a3b8"
                          strokeDasharray="3 3"
                          strokeWidth="2"
                        />

                        {/* Exponential Curve (expBase^n) */}
                        <path
                          d={`M 30 150 Q 110 ${150 - Math.min(130, Math.pow(expBase, 2) * 2)} 190 ${150 - Math.min(130, Math.pow(expBase, expPower) * (130 / Math.pow(expBase, 5)))}`}
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="3"
                        />

                        {/* Current value point */}
                        <circle
                          cx={30 + expPower * 32}
                          cy={150 - Math.min(130, Math.pow(expBase, expPower) * (130 / Math.pow(5, 5)) * 12)}
                          r="6"
                          fill="#fbbf24"
                        />
                        <text
                          x={30 + expPower * 32 - 10}
                          y={135 - Math.min(130, Math.pow(expBase, expPower) * (130 / Math.pow(5, 5)) * 12)}
                          fill="#fbbf24"
                          fontSize="10"
                          fontWeight="bold"
                        >
                          {Math.pow(expBase, expPower)}
                        </text>
                      </svg>
                      <div className="flex gap-4 text-[10px] text-slate-400 mt-2">
                        <span className="text-rose-400">● Exponential {expBase}ⁿ</span>
                        <span className="text-slate-400">--- Linear {expBase} × n</span>
                      </div>
                    </div>
                  </div>

                  {/* OBSERVATION CHECK */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2"
                  >
                    <p className="text-xs font-bold text-indigo-300">Observation Check: {OBSERVATION_QUESTIONS[1].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className={`p-2.5 text-left text-xs rounded-lg transition-colors border ${
                            observationAnswered && i === OBSERVATION_QUESTIONS[1].correctIndex
                              ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold'
                              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

              {/* SLIDE 2: LAWS OF EXPONENTS */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-xl border border-indigo-800/40">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase">1. Multiplication Law</h4>
                      <div className="my-2 text-xs font-mono text-slate-300">
                        2<sup>{lawM}</sup> × 2<sup>{lawN}</sup> = 2<sup>{lawM + lawN}</sup>
                      </div>
                      <p className="text-[11px] text-slate-400">Add powers when bases match: aᵐ × aⁿ = aᵐ⁺ⁿ</p>
                      <div className="mt-3 text-xs text-emerald-400 font-bold">
                        {Math.pow(2, lawM)} × {Math.pow(2, lawN)} = {Math.pow(2, lawM + lawN)}
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-xl border border-cyan-800/40">
                      <h4 className="text-xs font-bold text-cyan-400 uppercase">2. Division Law</h4>
                      <div className="my-2 text-xs font-mono text-slate-300">
                        2<sup>{lawM + lawN}</sup> ÷ 2<sup>{lawN}</sup> = 2<sup>{lawM}</sup>
                      </div>
                      <p className="text-[11px] text-slate-400">Subtract powers when dividing: aᵐ ÷ aⁿ = aᵐ⁻ⁿ</p>
                      <div className="mt-3 text-xs text-cyan-400 font-bold">
                        {Math.pow(2, lawM + lawN)} ÷ {Math.pow(2, lawN)} = {Math.pow(2, lawM)}
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-xl border border-amber-800/40">
                      <h4 className="text-xs font-bold text-amber-400 uppercase">3. Power of a Power</h4>
                      <div className="my-2 text-xs font-mono text-slate-300">
                        (2<sup>{lawM}</sup>)<sup>2</sup> = 2<sup>{lawM * 2}</sup>
                      </div>
                      <p className="text-[11px] text-slate-400">Multiply powers when bracketed: (aᵐ)ⁿ = aᵐⁿ</p>
                      <div className="mt-3 text-xs text-amber-400 font-bold">
                        ({Math.pow(2, lawM)})² = {Math.pow(2, lawM * 2)}
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex gap-6 items-center justify-center p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-300 flex items-center gap-2">
                      <span>Power m: <strong>{lawM}</strong></span>
                      <input type="range" min={1} max={4} value={lawM} onChange={(e) => setLawM(parseInt(e.target.value))} className="accent-indigo-500" />
                    </label>
                    <label className="text-xs text-slate-300 flex items-center gap-2">
                      <span>Power n: <strong>{lawN}</strong></span>
                      <input type="range" min={1} max={4} value={lawN} onChange={(e) => setLawN(parseInt(e.target.value))} className="accent-cyan-500" />
                    </label>
                  </div>
                </div>
              )}

              {/* SLIDE 3: SETS, EQUALITY & VENN DIAGRAM (SVG #3) */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="flex gap-2">
                    {(['equivalent', 'equal', 'universal'] as const).map((tab) => (
                      <motion.button
                        key={tab}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveSetTab(tab)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                          activeSetTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {tab} Sets Demo
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 bg-slate-950 rounded-2xl border border-slate-800">
                    <div>
                      {activeSetTab === 'equivalent' && (
                        <div className="space-y-3">
                          <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-500/30">
                            <span className="text-xs text-indigo-400 font-bold">Set A (Numbers)</span>
                            <div className="text-sm font-mono text-white mt-1">{`{ ${setItemsA.join(', ')} }`}</div>
                            <span className="text-xs text-slate-400">Cardinality n(A) = {setItemsA.length}</span>
                          </div>
                          <div className="p-4 bg-cyan-950/40 rounded-xl border border-cyan-500/30">
                            <span className="text-xs text-cyan-400 font-bold">Set B (Letters)</span>
                            <div className="text-sm font-mono text-white mt-1">{`{ ${setItemsB.join(', ')} }`}</div>
                            <span className="text-xs text-slate-400">Cardinality n(B) = {setItemsB.length}</span>
                          </div>
                          <p className="text-xs text-emerald-300 font-medium">
                            ✓ Equivalent (A ~ B): n(A) = n(B) = 3. Elements differ, but counts match!
                          </p>
                        </div>
                      )}

                      {activeSetTab === 'equal' && (
                        <div className="space-y-3">
                          <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
                            <span className="text-xs text-emerald-400 font-bold">Set P = {'{ 1, 2, 3 }'}</span>
                            <span className="text-xs text-slate-400 block mt-1">Order does not matter</span>
                          </div>
                          <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
                            <span className="text-xs text-emerald-400 font-bold">Set Q = {'{ 3, 1, 2 }'}</span>
                            <span className="text-xs text-slate-400 block mt-1">Same members</span>
                          </div>
                          <p className="text-xs text-emerald-300 font-medium">
                            ✓ Equal Sets (P = Q): Exactly the same elements, regardless of order!
                          </p>
                        </div>
                      )}

                      {activeSetTab === 'universal' && (
                        <div className="space-y-3">
                          <div className="p-4 bg-purple-950/40 rounded-xl border border-purple-500/30">
                            <span className="text-xs text-purple-400 font-bold">Universal Set U = {'{ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 }'}</span>
                            <p className="text-xs text-slate-300 mt-2">Even E = {'{ 2, 4, 6, 8, 10 }'} ⊆ U</p>
                            <p className="text-xs text-slate-300">Primes D = {'{ 2, 3, 5, 7 }'} ⊆ U</p>
                          </div>
                          <p className="text-xs text-indigo-300 font-medium">
                            All subsets live within the boundaries of the Universal Container U.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* TOPIC SVG #3: Venn Diagram Visualization */}
                    <div className="flex flex-col items-center justify-center p-2">
                      <svg viewBox="0 0 240 180" className="w-60 h-44">
                        {/* Universal Set Rectangle */}
                        <rect x="10" y="10" width="220" height="160" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                        <text x="20" y="30" fill="#a5b4fc" fontSize="12" fontWeight="bold">Universal Set U</text>

                        {/* Set A Circle */}
                        <circle cx="90" cy="100" r="50" fill="#4338ca" opacity="0.6" stroke="#818cf8" strokeWidth="2" />
                        <text x="65" y="105" fill="#ffffff" fontSize="11" fontWeight="bold">Set A</text>

                        {/* Set B Circle */}
                        <circle cx="150" cy="100" r="50" fill="#0e7490" opacity="0.6" stroke="#38bdf8" strokeWidth="2" />
                        <text x="155" y="105" fill="#ffffff" fontSize="11" fontWeight="bold">Set B</text>

                        {/* Elements in A */}
                        <text x="65" y="85" fill="#e0e7ff" fontSize="9">1, 2</text>
                        {/* Intersection */}
                        <text x="115" y="105" fill="#fef08a" fontSize="10" fontWeight="bold">3</text>
                        {/* Elements in B */}
                        <text x="165" y="85" fill="#cffafe" fontSize="9">4, 5</text>
                        {/* Outside elements */}
                        <text x="200" y="45" fill="#94a3b8" fontSize="9">6, 7</text>
                      </svg>
                      <span className="text-[11px] text-indigo-300 mt-2 font-mono">
                        Venn Diagram: Elements inside U with A ∩ B = {'{ 3 }'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: UNITARY METHOD & SEESAW */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="flex gap-3 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setUnitaryMode('direct')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold ${
                        unitaryMode === 'direct' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Direct Variation (Pens & Cost)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setUnitaryMode('inverse')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold ${
                        unitaryMode === 'inverse' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Inverse Variation (Workers & Days)
                    </motion.button>
                  </div>

                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800">
                    {unitaryMode === 'direct' ? (
                      <div className="space-y-4">
                        <p className="text-xs text-indigo-300">Direct Rule: More pens = More cost. Find 1 unit (Divide), then multiply.</p>
                        <label className="text-xs text-slate-300 flex justify-between">
                          <span>Quantity of Pens: <strong>{unitaryInput}</strong></span>
                          <span>Cost = {unitaryInput} × ₹15 = <strong>₹{unitaryInput * 15}</strong></span>
                        </label>
                        <input
                          type="range"
                          min={1}
                          max={10}
                          value={unitaryInput}
                          onChange={(e) => setUnitaryInput(parseInt(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                        <div className="p-3 bg-slate-900 rounded-xl text-xs font-mono text-slate-300">
                          Calculation: (₹60 ÷ 4 pens) = ₹15/pen → ₹15 × {unitaryInput} = ₹{unitaryInput * 15}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-xs text-rose-300">Inverse Rule: More workers = Fewer days. Total work (Multiply), then divide.</p>
                        <label className="text-xs text-slate-300 flex justify-between">
                          <span>Number of Workers: <strong>{unitaryInput}</strong></span>
                          <span>Days Required = 36 ÷ {unitaryInput} = <strong>{(36 / unitaryInput).toFixed(1)} days</strong></span>
                        </label>
                        <input
                          type="range"
                          min={1}
                          max={12}
                          value={unitaryInput}
                          onChange={(e) => setUnitaryInput(parseInt(e.target.value))}
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                        <div className="p-3 bg-slate-900 rounded-xl text-xs font-mono text-slate-300">
                          Total Effort = 3 × 12 = 36 worker-days. For {unitaryInput} workers: 36 ÷ {unitaryInput} = {(36 / unitaryInput).toFixed(1)} days.
                        </div>
                      </div>
                    )}
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
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-bold text-slate-400">Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800"
          >
            <h2 className="text-lg font-bold text-indigo-300">Free Mathematical Sandbox</h2>
            <p className="text-xs text-slate-400 mt-1">Play freely with decimal products, powers, sets, and percentages without scores.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <h3 className="text-xs font-bold uppercase text-indigo-400">100-Grid Percentage & Decimal Simulator</h3>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Active Tenths: {(decA * 10).toFixed(0)} / 10</span>
                <span>Percentage: {Math.round(decA * 100)}%</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={1.0}
                step={0.1}
                value={decA}
                onChange={(e) => handleDecAChange(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="grid grid-cols-10 gap-1 p-2 bg-slate-950 rounded-xl">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 rounded-sm transition-colors ${
                      i < Math.round(decA * 100) ? 'bg-indigo-500' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <h3 className="text-xs font-bold uppercase text-amber-400">Instant Exponent Scaler</h3>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Base: {expBase}</span>
                <span>Index: {expPower}</span>
                <span>Value: <strong>{Math.pow(expBase, expPower)}</strong></span>
              </div>
              <input
                type="range"
                min={2}
                max={6}
                value={expBase}
                onChange={(e) => handleExpBaseChange(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <input
                type="range"
                min={1}
                max={5}
                value={expPower}
                onChange={(e) => handleExpPowerChange(parseInt(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-emerald-400">
                {expBase}<sup>{expPower}</sup> = {Array.from({ length: expPower }).map(() => expBase).join(' × ')} = {Math.pow(expBase, expPower)}
              </div>
            </motion.div>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
            >
              Ready for Adaptive Challenges! →
            </motion.button>
          </div>
        </motion.section>
      )}

      {/* ─── 4. ADAPTIVE CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress & Badge */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="font-mono text-indigo-400 uppercase tracking-wider">
                Competency: {challenge.competencyLevel} | Node: {challenge.nodeId}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-base font-semibold text-white leading-relaxed">{challenge.question}</h2>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                {challenge.type}
              </span>
            </div>

            {/* MCQ OPTIONS */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                      wrongFlash
                        ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700/50 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-indigo-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3.5 py-2 bg-indigo-600 rounded-xl text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {challenge.dragItems.map((target, i) => (
                    <motion.div
                      key={i}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.targetId)}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[90px] flex flex-col justify-center items-center transition-all ${
                        droppedLabels[target.targetId]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-[11px] text-slate-400 uppercase font-mono">{target.targetId.replace('_', ' ')}</span>
                      <strong className="text-xs mt-1">{droppedLabels[target.targetId] || 'Drop matching label here'}</strong>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Target Mappings
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    role="button"
                    tabIndex={0}
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 bg-slate-800 rounded-xl text-xs text-slate-200 flex items-center gap-3 cursor-grab border border-slate-700"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center font-bold text-indigo-400 text-[10px]">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Step Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <motion.input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Type numerical answer..."
                    aria-label="Numerical answer input"
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 w-60"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConstructAdd(part)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-mono text-indigo-300"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex items-center flex-wrap gap-2">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleConstructRemove(i)}
                      className="px-2.5 py-1 bg-indigo-900/60 border border-indigo-500/40 rounded text-xs font-mono text-white cursor-pointer hover:bg-rose-900/60"
                    >
                      {part} ✕
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Constructed formula appears here...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE EXPLANATION BANNER */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-5 bg-amber-950/40 border border-amber-800/60 rounded-xl space-y-3"
              >
                <p className="text-xs font-bold uppercase text-amber-400 tracking-wider">Step-by-Step Mathematical Explanation</p>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-amber-200 leading-relaxed"
                  >
                    <strong className="text-amber-400">{i + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="flex gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setRevealedSteps(s => s + 1);
                        audioManager.play('tap');
                      }}
                      className="px-4 py-2 bg-amber-800/70 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Mission →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── 5. COMPLETION & MASTERY PROFILE ─── */}
      {phase === 'complete' && (
        <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Score Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-indigo-950/60 rounded-3xl border border-emerald-800/50 text-center space-y-3"
          >
            <h2 className="text-2xl font-black text-white">Class 7 ICSE Curriculum Mastered!</h2>
            <p className="text-sm text-slate-300">You achieved a final mastery score of:</p>
            <div className="text-4xl font-black text-emerald-400 font-mono">
              {Math.max(0, 100 - errors * 5)}%
            </div>
            <p className="text-xs text-indigo-300">Mastery Level: <span className="uppercase font-bold">{masteryLevel}</span></p>
          </motion.div>

          {/* MOTIVATIONAL FEEDBACK BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed"
          >
            <strong className="text-amber-300 font-bold block mb-1">Motivational Feedback:</strong>
            <p className="text-indigo-200 font-medium">{motivationalMessage}</p>
          </motion.div>

          {/* SPACED REPETITION VISIBILITY SCHEDULE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs flex justify-between items-center"
          >
            <div>
              <span className="text-slate-400 block font-medium">Spaced Repetition Schedule (SM-2 Algorithmic Interval):</span>
              <span className="text-[11px] text-slate-500">Based on your error frequency and recall speed</span>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-amber-400 text-sm">Review in {srsDays} Day{srsDays > 1 ? 's' : ''}</span>
            </div>
          </motion.div>

          {/* REFLECTION SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
          >
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">Post-Mission Metacognitive Reflection</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">1. What was the most surprising thing you learned?</label>
                <input
                  type="text"
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers(r => ({ ...r, surprising: e.target.value }))}
                  placeholder="e.g. Multiplying decimals yields smaller fractions..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">2. How would you explain exponents vs multiplication to a friend?</label>
                <input
                  type="text"
                  value={reflectionAnswers.explainFriend}
                  onChange={(e) => setReflectionAnswers(r => ({ ...r, explainFriend: e.target.value }))}
                  placeholder="e.g. Multiplication is repeated addition, but exponent is repeated multiplying..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">3. Where in real life might you use unitary variation or percentages?</label>
                <input
                  type="text"
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers(r => ({ ...r, realLife: e.target.value }))}
                  placeholder="e.g. Comparing grocery discounts or budgeting team construction tasks..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setReflectionSaved(true);
                  audioManager.play('drop-correct');
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                {reflectionSaved ? '✓ Reflection Saved' : 'Save Reflection'}
              </motion.button>
            </div>
          </motion.div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-3"
            >
              <h3 className="text-xs font-bold uppercase text-rose-400 tracking-wider">Your Personal Misconception Profile</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-semibold">❌ Pitfall: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* Real-World Activity Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
          >
            <h3 className="text-sm font-bold text-indigo-300 uppercase">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-bold text-indigo-400">{i + 1}.</span> {st}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.section>
      )}

      {/* ─── PLATFORM FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Cleared Successfully!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C7_MathematicsMultiplicationDivisionDecimalSim;
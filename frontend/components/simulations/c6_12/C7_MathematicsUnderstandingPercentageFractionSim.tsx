'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS AS STRING LITERALS ───
const NODE_C7_MATH_021 = 'c7_math_021';
const NODE_C7_MATH_022 = 'c7_math_022';
const NODE_C7_MATH_023 = 'c7_math_023';
const NODE_C7_MATH_024 = 'c7_math_024';
const NODE_C7_MATH_025 = 'c7_math_025';
const NODE_C7_MATH_026 = 'c7_math_026';
const NODE_C7_MATH_027 = 'c7_math_027';
const NODE_C7_MATH_028 = 'c7_math_028';
const NODE_C7_MATH_029 = 'c7_math_029';
const NODE_C7_MATH_030 = 'c7_math_030';

const ALL_NODE_IDS = [
  NODE_C7_MATH_021,
  NODE_C7_MATH_022,
  NODE_C7_MATH_023,
  NODE_C7_MATH_024,
  NODE_C7_MATH_025,
  NODE_C7_MATH_026,
  NODE_C7_MATH_027,
  NODE_C7_MATH_028,
  NODE_C7_MATH_029,
  NODE_C7_MATH_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Bengaluru Innovation Fair',
  intro: 'You are the chief analyst managing the student entrepreneurial pavilion in Bengaluru. From pricing craft electronics and calculating micro-loans to timing electric delivery karts and balancing production algebra, your math tools govern the entire fair!',
  context: 'Connect percentages, commerce equations, motion physics, and algebra modeling to make the fair a booming success.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'An electronics kit is marked at ₹200. The stall offers "25% discount", then asks for 5% delivery fee on the original ₹200. What is 25% written as a fraction over 100?',
  options: [
    '25/1 (twenty-five wholes)',
    '25/100 (twenty-five parts per hundred)',
    '1/25 (one part out of twenty-five)',
    '250/1000 (two hundred fifty parts)',
  ],
  correctIndex: 1,
  hintAfter: 'Percent literally stems from Latin "per centum", meaning "out of 100"!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 Aligned) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c7_math_021)
  {
    id: 'ch_01',
    nodeId: NODE_C7_MATH_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What does the mathematical symbol "%" literally stand for?',
    options: ['Multiplied by 100', 'Divided by 100 (parts per hundred)', 'Raised to power 100', 'Square root of 100'],
    correctIndex: 1,
    explanation: 'The word "percent" comes from Latin "per centum" meaning per hundred. The symbol % represents a denominator of 100.',
    hints: [
      'Think of 1 rupee = 100 paise.',
      'A percentage is simply a fraction with a fixed base.',
      'The symbol % represents "/100".',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label: Fraction to Percent (c7_math_021 & c7_math_022)
  {
    id: 'ch_02',
    nodeId: NODE_C7_MATH_021,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the equivalent fraction representations into the 100-grid targets.',
    dragItems: [
      { label: '50%', targetId: 'box_half' },
      { label: '25%', targetId: 'box_quarter' },
      { label: '75%', targetId: 'box_three_fourth' },
      { label: '10%', targetId: 'box_tenth' },
    ],
    correctMapping: {
      box_half: '50%',
      box_quarter: '25%',
      box_three_fourth: '75%',
      box_tenth: '10%',
    },
    explanation: '1/2 = 50/100 = 50%, 1/4 = 25/100 = 25%, 3/4 = 75/100 = 75%, and 1/10 = 10/100 = 10%.',
    hints: [
      'Find the numerator when the denominator is multiplied to make 100.',
      '1/2 × 50/50 = 50/100.',
      '3/4 is 3 times 25%.',
    ],
    misconceptionIndex: 2,
  },
  // 3. Foundation - Numeric (c7_math_022)
  {
    id: 'ch_03',
    nodeId: NODE_C7_MATH_022,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Convert the decimal 0.35 into a percentage.',
    correctAnswer: 35,
    tolerance: 0.1,
    unit: '%',
    explanation: 'To convert a decimal to a percentage, multiply by 100 (shift the decimal point 2 places right): 0.35 × 100 = 35%.',
    hints: [
      'Multiply by 100 to find how many parts per hundred.',
      'Shift the decimal point 2 places to the right.',
      '0.35 × 100 = 35.',
    ],
  },
  // 4. Foundation - Application: Profit & Loss (c7_math_023)
  {
    id: 'ch_04',
    nodeId: NODE_C7_MATH_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A student buys craft clay at Cost Price (CP) = ₹150 and sells the pottery at Selling Price (SP) = ₹195. What is the profit in Rupees?',
    options: ['₹45 profit', '₹35 loss', '₹195 profit', '₹50 profit'],
    correctIndex: 0,
    explanation: 'Since SP (₹195) > CP (₹150), there is a profit. Profit = SP - CP = 195 - 150 = ₹45.',
    hints: [
      'Compare SP and CP: is SP bigger or smaller?',
      'Since SP > CP, it is a profit.',
      'Profit = 195 - 150 = 45.',
    ],
  },
  // 5. Foundation - Recall: Algebra Terms (c7_math_026)
  {
    id: 'ch_05',
    nodeId: NODE_C7_MATH_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the algebraic expression "7x - 4y + 9", what is the constant term?',
    options: ['7', '-4', '9', 'x and y'],
    correctIndex: 2,
    explanation: 'A constant is a term with a fixed numerical value containing no variables. Here +9 is the constant.',
    hints: [
      'Constants have no letters attached to them.',
      'Look for the standalone number.',
      'The number 9 does not change regardless of x or y.',
    ],
  },
  // 6. Foundation - Drag-Sort: Simple Interest Steps (c7_math_024)
  {
    id: 'ch_06',
    nodeId: NODE_C7_MATH_024,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of computing Simple Interest and Total Repayment Amount.',
    sortItems: [
      'Identify Principal (P), Rate (R), and Time (T)',
      'Multiply P × R × T',
      'Divide by 100 to get Simple Interest (SI)',
      'Add SI to Principal (P) to obtain Total Amount (A)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'We first identify P, R, T; then calculate SI = (P×R×T)/100; then calculate Amount = P + SI.',
    hints: [
      'You must know the initial loan values before calculating interest.',
      'SI formula is (P × R × T) / 100.',
      'Total amount is always Principal + Interest.',
    ],
  },
  // 7. Standard - Application: Percentage Conversion (c7_math_022)
  {
    id: 'ch_07',
    nodeId: NODE_C7_MATH_022,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a coding test at the fair, Tanya solved 18 out of 25 problems. What percentage is 18/25?',
    correctAnswer: 72,
    tolerance: 0.5,
    unit: '%',
    explanation: '(18 / 25) × 100 = 18 × 4 = 72%.',
    hints: [
      'Convert the fraction to a percentage by multiplying by 100.',
      '(18 / 25) × 100 = 18 × 4.',
      '18 × 4 = 72%.',
    ],
  },
  // 8. Standard - Analysis: Profit % Base (c7_math_023)
  {
    id: 'ch_08',
    nodeId: NODE_C7_MATH_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A smart lamp costs CP = ₹400 and sells for SP = ₹500. Profit% is calculated as (100 / 400) × 100 = 25%. Why do we divide by 400 and NOT 500?',
    options: [
      'Because 400 is smaller than 500',
      'Because Profit% measures return on the original invested cost (CP)',
      'Because 500 is not divisible by 100',
      'Because selling price always changes with tax',
    ],
    correctIndex: 1,
    explanation: 'Profit and loss percentages are ALWAYS calculated on the Cost Price (CP) because CP represents the actual money invested by the seller.',
    hints: [
      'Think about what investment generated the gain.',
      'Cost price is the money originally put at risk.',
      'Return on investment is measured against the cost base.',
    ],
    misconceptionIndex: 3,
  },
  // 9. Standard - Application: Simple Interest (c7_math_024)
  {
    id: 'ch_09',
    nodeId: NODE_C7_MATH_024,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The robotics stall borrows ₹5,000 from a micro-fund at 6% p.a. simple interest for 3 years. Calculate the Simple Interest (SI) in Rupees.',
    correctAnswer: 900,
    tolerance: 1,
    unit: '₹',
    explanation: 'SI = (P × R × T) / 100 = (5000 × 6 × 3) / 100 = 90000 / 100 = ₹900.',
    hints: [
      'Formula: SI = (P × R × T) / 100.',
      'P = 5000, R = 6, T = 3.',
      '(5000 × 18) / 100 = 50 × 18 = 900.',
    ],
  },
  // 10. Standard - Application: Speed, Distance, Time (c7_math_025)
  {
    id: 'ch_10',
    nodeId: NODE_C7_MATH_025,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An automated delivery cart travels 180 km across campuses in 3 hours. What is its uniform speed in km/h?',
    correctAnswer: 60,
    tolerance: 0.5,
    unit: 'km/h',
    explanation: 'Speed = Distance / Time = 180 km / 3 h = 60 km/h.',
    hints: [
      'Speed = Distance ÷ Time.',
      '180 ÷ 3.',
      '180 / 3 = 60.',
    ],
  },
  // 11. Standard - Application: Unit Conversion km/h to m/s (c7_math_025)
  {
    id: 'ch_11',
    nodeId: NODE_C7_MATH_025,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Convert a speed of 72 km/h into metres per second (m/s). (Hint: Multiply by 5/18)',
    correctAnswer: 20,
    tolerance: 0.1,
    unit: 'm/s',
    explanation: '72 km/h × (5 / 18) = (72 / 18) × 5 = 4 × 5 = 20 m/s.',
    hints: [
      '1 km/h = 1000m / 3600s = 5/18 m/s.',
      'Divide 72 by 18, then multiply by 5.',
      '4 × 5 = 20.',
    ],
  },
  // 12. Standard - Distinguish: Like vs Unlike Terms (c7_math_026)
  {
    id: 'ch_12',
    nodeId: NODE_C7_MATH_026,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which of the following pairs contains LIKE algebraic terms?',
    options: ['3x and 3y', '5xy and -2xy', '4a and 4a²', '7ab and 2b'],
    correctIndex: 1,
    explanation: 'Like terms have IDENTICAL variable parts (same variables to the same powers). 5xy and -2xy both have "xy".',
    hints: [
      'Look strictly at the letters and their powers, ignore coefficients.',
      '3x and 3y have different variables.',
      '5xy and -2xy both have the variable part xy.',
    ],
    misconceptionIndex: 1,
  },
  // 13. Standard - Construct: Generating Expressions (c7_math_027)
  {
    id: 'ch_13',
    nodeId: NODE_C7_MATH_027,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct an expression for: "₹25 fixed entrance fee plus ₹12 for each ride ticket (x)".',
    availableParts: ['12x', '+', '25', '-', '25x', '12'],
    targetState: '12x + 25',
    validationHint: 'Combine the variable term for tickets with the constant entrance fee.',
    explanation: 'Each ride ticket costs ₹12 (giving 12x), added to the fixed fee of ₹25 gives 12x + 25.',
    hints: [
      'x represents the number of ride tickets.',
      '12 multiplies x.',
      'Add 25 to 12x.',
    ],
  },
  // 14. Standard - Application: Adding Expressions (c7_math_028)
  {
    id: 'ch_14',
    nodeId: NODE_C7_MATH_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Simplify the sum: (4x + 7y - 3) + (2x - 3y + 8).',
    options: ['6x + 4y + 5', '6x + 10y + 11', '8x² + 4y + 5', '6x - 4y + 5'],
    correctIndex: 0,
    explanation: 'Combine like terms: (4x + 2x) + (7y - 3y) + (-3 + 8) = 6x + 4y + 5.',
    hints: [
      'Add x-terms: 4x + 2x = 6x.',
      'Add y-terms: 7y + (-3y) = 4y.',
      'Add constants: -3 + 8 = 5.',
    ],
  },
  // 15. Standard - Application: Linear Equation (c7_math_029)
  {
    id: 'ch_15',
    nodeId: NODE_C7_MATH_029,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Solve for x: 3x + 7 = 28.',
    correctAnswer: 7,
    tolerance: 0.1,
    unit: '',
    explanation: 'Step 1: Subtract 7 from both sides → 3x = 21. Step 2: Divide both sides by 3 → x = 7. Verification: 3(7) + 7 = 28.',
    hints: [
      'First transpose +7 by subtracting 7 from 28.',
      '3x = 21.',
      'Divide 21 by 3.',
    ],
  },
  // 16. Standard - Understanding: Negative Inequality Flip (c7_math_030)
  {
    id: 'ch_16',
    nodeId: NODE_C7_MATH_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Solve the inequality: -4x > 20.',
    options: ['x > -5', 'x < -5', 'x > 5', 'x < 5'],
    correctIndex: 1,
    explanation: 'When dividing or multiplying both sides of an inequality by a negative number (-4), the inequality sign MUST reverse: > becomes <. Hence x < -5.',
    hints: [
      'Dividing by a negative number flips the direction of inequality.',
      '20 ÷ (-4) = -5.',
      '> becomes <, so x < -5.',
    ],
    misconceptionIndex: 4,
  },
  // 17. Advanced - Evaluation: Consecutive Numbers Equation (c7_math_029)
  {
    id: 'ch_17',
    nodeId: NODE_C7_MATH_029,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'The sum of three consecutive whole numbers is 54. What is the LARGEST of these three numbers?',
    correctAnswer: 19,
    tolerance: 0.1,
    unit: '',
    explanation: 'Let the numbers be (x-1), x, (x+1). Their sum is 3x = 54 → x = 18. The numbers are 17, 18, 19. The largest is 19.',
    hints: [
      'Let the middle number be x. Then sum = 3x.',
      '3x = 54 gives middle number x = 18.',
      'The three numbers are 17, 18, 19. Largest is 19.',
    ],
  },
  // 18. Advanced - Analysis: Subtraction with Negatives (c7_math_028)
  {
    id: 'ch_18',
    nodeId: NODE_C7_MATH_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Subtract (2a - 3b + 5) from (5a + 2b - 3). What is the resulting simplified expression?',
    options: ['3a + 5b - 8', '3a - b + 2', '7a - b + 8', '3a + 5b + 2'],
    correctIndex: 0,
    explanation: '(5a + 2b - 3) - (2a - 3b + 5) = (5a - 2a) + (2b - (-3b)) + (-3 - 5) = 3a + 5b - 8.',
    hints: [
      'Distribute the minus sign: -(2a - 3b + 5) becomes -2a + 3b - 5.',
      'Combine 2b + 3b = 5b.',
      'Combine -3 - 5 = -8.',
    ],
  },
  // 19. Advanced - Application: Simple Interest Rate Rearrangement (c7_math_024)
  {
    id: 'ch_19',
    nodeId: NODE_C7_MATH_024,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A loan of ₹8,000 yields ₹1,440 as simple interest after 3 years. Find the annual rate of interest (R in % p.a.).',
    correctAnswer: 6,
    tolerance: 0.1,
    unit: '% p.a.',
    explanation: 'R = (SI × 100) / (P × T) = (1440 × 100) / (8000 × 3) = 144000 / 24000 = 6% per annum.',
    hints: [
      'Rearrange SI = (P×R×T)/100 to R = (SI × 100) / (P × T).',
      'Numerator = 1440 × 100 = 144,000.',
      'Denominator = 8000 × 3 = 24,000. 144/24 = 6%.',
    ],
  },
  // 20. Advanced - Creativity / Multi-Step: Speed & Time Optimization (c7_math_025)
  {
    id: 'ch_20',
    nodeId: NODE_C7_MATH_025,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A solar shuttle covers 240 km at 60 km/h. To return over the same 240 km in just 3 hours, what MUST its new speed be in km/h?',
    correctAnswer: 80,
    tolerance: 0.5,
    unit: 'km/h',
    explanation: 'Return distance = 240 km, desired return time = 3 h. Required Speed = 240 / 3 = 80 km/h.',
    hints: [
      'The return distance is the same 240 km.',
      'Speed = Distance / Desired Time.',
      '240 km / 3 h = 80 km/h.',
    ],
  },
  // 21. Advanced - Evaluation: Inequality Number Line Logic (c7_math_030)
  {
    id: 'ch_21',
    nodeId: NODE_C7_MATH_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Consider 3x - 5 < 10. The algebraic solution is x < 5. How must this be plotted on a real number line?',
    options: [
      'Filled (solid) circle at 5 with ray pointing right',
      'Open (hollow) circle at 5 with ray pointing left',
      'Open (hollow) circle at 5 with ray pointing right',
      'Filled (solid) circle at 5 with ray pointing left',
    ],
    correctIndex: 1,
    explanation: 'For strict inequalities (< or >), the boundary value is NOT included, requiring an OPEN (hollow) circle. For "< 5", values are less than 5, so the ray points left.',
    hints: [
      'Is 5 itself included in x < 5? No, so the circle is hollow/open.',
      'Numbers smaller than 5 are to the left of 5.',
      'Open circle at 5, arrow pointing left.',
    ],
  },
  // 22. Advanced - Creativity / Synthesis: Total Profit & Return on Investment (c7_math_023)
  {
    id: 'ch_22',
    nodeId: NODE_C7_MATH_023,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A stall purchases 50 handmade lamps for ₹6,000 total (₹120 each) and sells 40 lamps at ₹180 each and the remaining 10 at ₹100 each. What is the overall profit percentage on the ₹6,000 investment?',
    correctAnswer: 36.67,
    tolerance: 1.0,
    unit: '%',
    explanation: 'Total SP = (40 × 180) + (10 × 100) = 7200 + 1000 = ₹8,200. Profit = 8200 - 6000 = ₹2,200. Profit% = (2200 / 6000) × 100 = 36.67%.',
    hints: [
      'Find total SP: 40×180 + 10×100 = 7200 + 1000 = 8200.',
      'Total Profit = Total SP - Total CP = 8200 - 6000 = 2200.',
      'Profit% = (2200 / 6000) × 100 ≈ 36.67%.',
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
  nodeId: NODE_C7_MATH_021,
  title: 'Percentage, Fractions, Algebra & Motion Applications',
  definition:
    'Understanding percentage as per-hundred fractions (c7_math_021), converting fluently between decimals and fractions (c7_math_022), applying them to single-transaction profit & loss (c7_math_023), simple interest (c7_math_024), speed-distance-time motion (c7_math_025), algebraic terminology (c7_math_026), expression generation (c7_math_027), operations on expressions (c7_math_028), two-step linear equations (c7_math_029), and linear inequalities with negative multipliers (c7_math_030).',
  eli5:
    'Think of percentages as a 100-slice pizza, simple interest as fixed annual sapling growth, algebra as balanced see-saws, and motion as a speed-distance-time triangle!',
  misconceptions: [
    {
      misconception: '45% means bare number 45 rather than 45/100.',
      correction: '45% is literally 45 per 100, which equals 45/100 or 9/20.',
    },
    {
      misconception: '3x and 3xy are like terms because both have x.',
      correction: 'Like terms require EXACT identical variable parts (both letters and powers).',
    },
    {
      misconception: 'To convert 3/4 to percentage, simply attach % to get 3%.',
      correction: 'Multiply the fraction by 100: (3/4) × 100 = 75%.',
    },
    {
      misconception: 'Profit percentage is computed by dividing profit by Selling Price (SP).',
      correction: 'Profit% is always calculated on the Cost Price (CP) — the money invested.',
    },
    {
      misconception: 'Dividing an inequality by a negative number keeps the inequality sign unchanged.',
      correction: 'Multiplying or dividing by a negative number reverses the inequality direction (< becomes >).',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is 45% simplified to its lowest fractional terms?', options: ['45/10', '9/20', '4/5', '9/25'], correctIndex: 1 },
    { question: 'If CP = ₹500 and SP = ₹620, what is the profit%?', options: ['24%', '20%', '12%', '25%'], correctIndex: 0 },
    { question: 'What is the Simple Interest on ₹2,000 at 5% p.a. for 2 years?', options: ['₹100', '₹200', '₹400', '₹250'], correctIndex: 1 },
    { question: 'A train travels 240 km in 4 hours. What is its speed?', options: ['50 km/h', '60 km/h', '80 km/h', '100 km/h'], correctIndex: 1 },
    { question: 'Identify the coefficient of x in the term -8x:', options: ['8', '-8', 'x', '-x'], correctIndex: 1 },
    { question: 'Simplify: (3x + 5) + (2x - 3)', options: ['5x + 8', '5x + 2', '6x - 2', '5x - 8'], correctIndex: 1 },
    { question: 'Solve: 2x + 3 = 11', options: ['x = 4', 'x = 7', 'x = 3', 'x = 8'], correctIndex: 0 },
    { question: 'Solve: -3x > 12', options: ['x > -4', 'x < -4', 'x > 4', 'x < 4'], correctIndex: 1 },
  ],
  masteryCriteria: 'Master percentage models, profit/loss, simple interest, speed calculations, and algebraic equations.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The 100-Grid Percent Visualizer',
    instruction: 'Drag the slider to fill the 100-cell grid and watch fraction, decimal, and percentage update in unison.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_MATH_021,
  },
  {
    title: 'Lab 2: Profit & Loss Fair Stall Balance',
    instruction: 'Adjust Cost Price (CP) and Selling Price (SP). Observe the profit/loss meter and formula calculation.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_MATH_023,
  },
  {
    title: 'Lab 3: Simple Interest Sapling Simulator',
    instruction: 'Adjust Principal, Rate, and Years to watch the steady annual interest chunks accumulate.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_MATH_024,
  },
  {
    title: 'Lab 4: Motion Lab (Speed, Distance, Time)',
    instruction: 'Adjust speed and watch the delivery kart move along the campus track with real-time timers.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_MATH_025,
  },
  {
    title: 'Lab 5: Algebra Balance & Inequality Number Line',
    instruction: 'Solve 2-step equations on a balance scale and test the inequality sign flip with negative multipliers.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_MATH_029,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you double the Cost Price (CP) from ₹100 to ₹200 while keeping a fixed ₹40 profit, what happens to Profit%?',
    options: [
      'Profit% doubles from 40% to 80%',
      'Profit% halves from 40% to 20%',
      'Profit% stays identical at 40%',
      'Profit% drops to 0%',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now check Lab 2: with CP=₹200 and profit=₹40, profit% is (40/200)×100 = 20%!',
    nodeId: NODE_C7_MATH_023,
  },
  {
    question: 'Predict: When you multiply both sides of an inequality by -1, what MUST happen to the inequality symbol (< or >)?',
    options: [
      'It disappears and becomes an equals sign',
      'It stays exactly the same',
      'It flips direction (< becomes > and > becomes <)',
      'It doubles in size',
    ],
    correctIndex: 2,
    verifyInstruction: 'Check on the number line: 3 < 5, but multiplying by -1 gives -3 > -5. The direction flips!',
    nodeId: NODE_C7_MATH_030,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the Simple Interest accumulated each year in Lab 3?',
    observableOptions: [
      'Interest increases exponentially each year',
      'The exact same fixed chunk of interest is added every single year',
      'Interest drops to zero in the second year',
      'Interest depends on the final amount',
    ],
    correctIndex: 1,
    nodeId: NODE_C7_MATH_024,
  },
  {
    question: 'In the motion simulator, when distance is fixed at 120 km and you double the speed from 30 km/h to 60 km/h, what happens to time?',
    observableOptions: [
      'Time doubles from 4 h to 8 h',
      'Time is halved from 4 h to 2 h',
      'Time remains unchanged at 4 h',
      'Time becomes zero',
    ],
    correctIndex: 1,
    nodeId: NODE_C7_MATH_025,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Fair Stall Master Financial Plan',
  description:
    'Design a complete business proposal for an Indian school innovation fair stall. Choose an item (e.g. eco-friendly notebooks, solar flashlights), set your CP, calculate SP for a 30% profit margin, take a ₹2,000 micro-loan at 5% simple interest, and model your delivery speed across the exhibition grounds.',
  steps: [
    'Choose your product and specify unit Cost Price (CP in ₹).',
    'Calculate the required Selling Price (SP) for 30% profit: SP = CP + 0.30 × CP.',
    'Calculate 2 years Simple Interest on a ₹2,000 setup loan at 5% p.a.',
    'Write the linear revenue equation: Revenue = (SP)x - 2000.',
  ],
};

// ─── MAIN COMPONENT ───
function C7_MathematicsUnderstandingPercentageFractionSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org interaction state
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Reflection responses state
  const [reflections, setReflections] = useState<{ [key: string]: string }>({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Rich Interactive Simulator States (Lab & Sandbox)
  const [percentSlider, setPercentSlider] = useState<number>(45); // 0 to 100
  const [cpSlider, setCpSlider] = useState<number>(200); // Cost price
  const [spSlider, setSpSlider] = useState<number>(260); // Selling price
  const [principalSlider, setPrincipalSlider] = useState<number>(4000);
  const [rateSlider, setRateSlider] = useState<number>(5);
  const [timeSlider, setTimeSlider] = useState<number>(3);
  const [speedSlider, setSpeedSlider] = useState<number>(60);
  const [distanceSlider, setDistanceSlider] = useState<number>(180);
  const [algebraCoeff] = useState<number>(3);
  const [algebraConst] = useState<number>(5);
  const [algebraTarget] = useState<number>(26);
  const [inequalityMultiplier] = useState<number>(-2);
  const [inequalityBoundary] = useState<number>(6);

  // Score & Difficulty adaptation
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints & Visual feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Interactive Challenge types state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback components
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES ───
  const simplifiedFraction = useMemo(() => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(percentSlider, 100);
    return `${percentSlider / divisor}/${100 / divisor}`;
  }, [percentSlider]);

  const profitOrLoss = useMemo(() => {
    const diff = spSlider - cpSlider;
    const isProfit = diff >= 0;
    const percent = cpSlider > 0 ? (Math.abs(diff) / cpSlider) * 100 : 0;
    return {
      diff,
      isProfit,
      percent: percent.toFixed(1),
    };
  }, [cpSlider, spSlider]);

  const simpleInterestResult = useMemo(() => {
    const si = (principalSlider * rateSlider * timeSlider) / 100;
    const amount = principalSlider + si;
    return { si, amount };
  }, [principalSlider, rateSlider, timeSlider]);

  const motionResult = useMemo(() => {
    const timeTaken = speedSlider > 0 ? (distanceSlider / speedSlider).toFixed(2) : '0';
    const speedInMs = (speedSlider * (5 / 18)).toFixed(2);
    return { timeTaken, speedInMs };
  }, [speedSlider, distanceSlider]);

  // Adaptive challenges filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeObj = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY EFFECT ───
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

    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── MOTION CANVAS ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let kartX = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Track line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(20, 35);
      ctx.lineTo(canvas.width - 20, 35);
      ctx.stroke();

      // Track distance markers
      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.fillText('0 km (Start)', 20, 52);
      ctx.fillText(`${distanceSlider} km (Destination)`, canvas.width - 120, 52);

      // Moving delivery kart
      kartX = (kartX + speedSlider * 0.05) % (canvas.width - 60);

      // Kart body
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(kartX + 20, 18, 32, 18, [4]);
      } else {
        ctx.rect(kartX + 20, 18, 32, 18);
      }
      ctx.fill();

      // Kart roof / icon
      ctx.fillStyle = '#a5b4fc';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(kartX + 26, 12, 16, 8, [2]);
      } else {
        ctx.rect(kartX + 26, 12, 16, 8);
      }
      ctx.fill();

      // Wheels
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(kartX + 26, 36, 4, 0, Math.PI * 2);
      ctx.arc(kartX + 46, 36, 4, 0, Math.PI * 2);
      ctx.fill();

      animFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrame);
  }, [speedSlider, distanceSlider]);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeObj.hints[nextLevel - 1]) {
      const hintMsg = currentChallengeObj.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, currentChallengeObj]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect ? 'Awesome! 25% is literally 25 per hundred.' : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs! Manipulate variables to discover formulas.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Play with the controls without any scores.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked! Show your mastery.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test with the interactive controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation!' : 'Check the data carefully.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! Simulation complete with score ${finalScore} percent.`);
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
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (
        currentChallengeObj.type === 'classify' ||
        currentChallengeObj.type === 'distinguish' ||
        currentChallengeObj.type === 'match'
      ) {
        isCorrect = answer === currentChallengeObj.correctIndex;
      } else if (currentChallengeObj.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctMapping);
      } else if (currentChallengeObj.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctOrder);
      } else if (currentChallengeObj.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect =
          Math.abs(numVal - (currentChallengeObj.correctAnswer || 0)) <= (currentChallengeObj.tolerance || 0);
      } else if (currentChallengeObj.type === 'construct') {
        isCorrect = answer === currentChallengeObj.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent work.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentChallengeObj.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          currentChallengeObj.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(currentChallengeObj.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, currentChallengeObj.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the complete solution step-by-step.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + currentChallengeObj.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [currentChallengeObj, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('pop');
      setDraggedItem(null);
    },
    [draggedItem]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const arr = prev.length === 0 ? [0, 1, 2, 3] : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0
        ? sortArrangement
        : currentChallengeObj.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, currentChallengeObj, handleAnswer]);

  const handleResetCurrentLab = useCallback(() => {
    setPercentSlider(45);
    setCpSlider(200);
    setSpSlider(260);
    setPrincipalSlider(4000);
    setRateSlider(5);
    setTimeSlider(3);
    setSpeedSlider(60);
    setDistanceSlider(180);
    audioManager.play('whoosh');
  }, []);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans select-none">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-gold-400">ICSE Class 7</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-semibold text-slate-400">{subjectConfig.name}</span>
            </div>
            <h1 className="text-lg md:text-xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/60 rounded-xl border border-slate-800 text-xs font-bold">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPhase('discovery')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              phase === 'discovery' ? 'bg-gold-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Hook
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPhase('explore')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              phase === 'explore' ? 'bg-gold-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Guided Labs
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPhase('sandbox')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              phase === 'sandbox' ? 'bg-gold-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Free Sandbox
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPhase('challenge')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              phase === 'challenge' ? 'bg-gold-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4. Challenges
          </motion.button>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          key="discovery"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="mt-6 space-y-6"
        >
          {/* Narrative Scenario Hero */}
          <motion.div
            whileHover={{ scale: 1.005 }}
            className="p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-purple-950/40 rounded-2xl border border-gold-700/40 shadow-inner"
          >
            <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>🎪 Interactive Mission Scenario</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm md:text-base mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/50 rounded-xl border border-slate-800 text-xs text-gold-300 flex items-center gap-2">
              <span className="text-base">💡</span>
              <span>{SCENARIO.context}</span>
            </div>
          </motion.div>

          {/* Low Stakes Curiosity Question */}
          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Curiosity Hook (Not Graded)
              </span>
              <span className="text-xs text-slate-400">Step 1 of 4</span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-white leading-snug">
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  className={`p-4 rounded-xl text-left text-sm font-semibold transition-all border ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 border-slate-800 text-slate-500'
                      : 'bg-slate-900 border-slate-700 hover:border-gold-500 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-xs flex items-center justify-center font-bold text-slate-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{discoveryCorrect ? '🎉' : '✨'}</span>
                  <p className="text-xs md:text-sm text-slate-300">
                    {discoveryCorrect
                      ? 'Spot on! You understand that percent directly relates to 100.'
                      : DISCOVERY_QUESTION.hintAfter}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-purple-600 hover:from-gold-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-500/20 whitespace-nowrap"
                >
                  Launch Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div
          key="explore"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-6 space-y-6"
        >
          {/* Lab Navigator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-gold-950 text-gold-400 text-xs font-black border border-gold-800">
                LAB {currentSlide + 1} / {EXPLORATION_STEPS.length}
              </span>
              <span className="text-sm font-bold text-slate-300">
                {EXPLORATION_STEPS[currentSlide].title}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResetCurrentLab}
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1 bg-slate-800 rounded-lg border border-slate-700"
            >
              ↻ Reset Values
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-6 shadow-xl"
            >
              {/* Instruction banner */}
              <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-600/30 text-amber-300 text-xs md:text-sm font-semibold flex items-center gap-2">
                <span>👉</span>
                <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
              </div>

              {/* ─── LAB 1: 100-GRID PERCENT VISUALIZER ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* SVG 100-Cell Interactive Grid */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 220 220" className="w-56 h-56 max-w-full">
                      {Array.from({ length: 100 }).map((_, i) => {
                        const row = Math.floor(i / 10);
                        const col = i % 10;
                        const isFilled = i < percentSlider;
                        return (
                          <rect
                            key={i}
                            x={col * 21 + 5}
                            y={row * 21 + 5}
                            width="18"
                            height="18"
                            rx="3"
                            fill={isFilled ? '#6366f1' : '#1e293b'}
                            stroke={isFilled ? '#818cf8' : '#334155'}
                            strokeWidth="1"
                            className="transition-colors duration-150"
                          />
                        );
                      })}
                    </svg>
                    <span className="text-xs text-slate-400 mt-2 font-mono">
                      {percentSlider} of 100 cells shaded
                    </span>
                  </div>

                  {/* Real-time Multi-representation Card */}
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
                      <label className="text-xs font-bold text-gold-400 uppercase tracking-wider block">
                        Adjust Shading: {percentSlider}%
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={percentSlider}
                        onChange={(e) => {
                          setPercentSlider(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                        aria-label="Percentage shading slider"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Percentage</span>
                        <span className="text-lg font-black text-gold-400">{percentSlider}%</span>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Fraction</span>
                        <span className="text-lg font-black text-amber-400">{simplifiedFraction}</span>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Decimal</span>
                        <span className="text-lg font-black text-emerald-400">
                          {(percentSlider / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40 text-xs text-slate-300">
                      <strong>Multi-Representation Rule:</strong> % is shorthand for &ldquo;/100&rdquo;. Thus{' '}
                      {percentSlider}% = {percentSlider}/100 = {(percentSlider / 100).toFixed(2)}.
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: PROFIT & LOSS BALANCER ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-300">Cost Price (CP):</span>
                        <span className="text-amber-400">₹{cpSlider}</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={500}
                        step={10}
                        value={cpSlider}
                        onChange={(e) => {
                          setCpSlider(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg"
                        aria-label="Cost price slider"
                      />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-300">Selling Price (SP):</span>
                        <span className="text-emerald-400">₹{spSlider}</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={600}
                        step={10}
                        value={spSlider}
                        onChange={(e) => {
                          setSpSlider(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg"
                        aria-label="Selling price slider"
                      />
                    </div>
                  </div>

                  {/* Visual Bar Comparison & Balance */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Transaction Outcome
                      </span>
                      <motion.span
                        key={profitOrLoss.isProfit ? 'profit' : 'loss'}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                          profitOrLoss.isProfit
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                            : 'bg-rose-950 text-rose-400 border border-rose-700'
                        }`}
                      >
                        {profitOrLoss.isProfit ? 'PROFIT' : 'LOSS'}: ₹{Math.abs(profitOrLoss.diff)} (
                        {profitOrLoss.percent}%)
                      </motion.span>
                    </div>

                    {/* Dual Comparative Bars */}
                    <div className="space-y-2">
                      <div className="text-xs text-slate-400 flex justify-between">
                        <span>Invested CP: ₹{cpSlider}</span>
                      </div>
                      <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-amber-500"
                          animate={{ width: `${Math.min(100, (cpSlider / 600) * 100)}%` }}
                        />
                      </div>

                      <div className="text-xs text-slate-400 flex justify-between pt-1">
                        <span>Realized SP: ₹{spSlider}</span>
                      </div>
                      <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${profitOrLoss.isProfit ? 'bg-emerald-500' : 'bg-rose-500'}`}
                          animate={{ width: `${Math.min(100, (spSlider / 600) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 italic pt-2">
                      Formula:{' '}
                      <span className="font-mono text-gold-300">
                        {profitOrLoss.isProfit ? 'Profit%' : 'Loss%'} = (|SP - CP| / CP) × 100 = (|{spSlider} - {cpSlider}| / {cpSlider}) × 100 = {profitOrLoss.percent}%
                      </span>
                    </p>
                  </div>

                  {/* Predict then Check Hook inside Lab */}
                  <div className="p-4 bg-slate-900/90 rounded-xl border border-gold-900/50 space-y-3">
                    <span className="text-xs font-bold text-gold-400 uppercase">Predict & Discover:</span>
                    <p className="text-xs md:text-sm text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                    {!predictionMade ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-950 rounded-lg text-xs text-amber-300 border border-slate-800">
                        ✓ {PREDICTION_QUESTIONS[0].verifyInstruction}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── LAB 3: SIMPLE INTEREST SAPLING ACCUMULATOR ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 space-y-1">
                      <label className="text-xs text-slate-400">Principal (P): ₹{principalSlider}</label>
                      <input
                        type="range"
                        min={1000}
                        max={10000}
                        step={500}
                        value={principalSlider}
                        onChange={(e) => {
                          setPrincipalSlider(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 h-2 bg-slate-700 rounded-lg"
                        aria-label="Principal slider"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 space-y-1">
                      <label className="text-xs text-slate-400">Rate (R % p.a.): {rateSlider}%</label>
                      <input
                        type="range"
                        min={2}
                        max={12}
                        step={1}
                        value={rateSlider}
                        onChange={(e) => {
                          setRateSlider(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg"
                        aria-label="Interest rate slider"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 space-y-1">
                      <label className="text-xs text-slate-400">Time (T in Complete Years): {timeSlider} yrs</label>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        value={timeSlider}
                        onChange={(e) => {
                          setTimeSlider(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg"
                        aria-label="Time in complete years slider"
                      />
                    </div>
                  </div>

                  {/* Sapling Accumulation Visualization */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-400 uppercase">Annual Interest Growth</span>
                      <span className="text-gold-400 font-mono font-bold">
                        1 Year Chunk = (₹{principalSlider} × {rateSlider}) / 100 = ₹
                        {(principalSlider * rateSlider) / 100}
                      </span>
                    </div>

                    {/* Step Chunks */}
                    <div className="grid grid-cols-5 gap-2">
                      {Array.from({ length: 5 }).map((_, yearIdx) => {
                        const isYearActive = yearIdx < timeSlider;
                        const annualChunk = (principalSlider * rateSlider) / 100;
                        return (
                          <div
                            key={yearIdx}
                            className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                              isYearActive
                                ? 'bg-gold-950/60 border-gold-500 text-gold-300'
                                : 'bg-slate-900/40 border-slate-800 text-slate-600'
                            }`}
                          >
                            <span className="text-[10px] uppercase font-bold">Year {yearIdx + 1}</span>
                            <span className="text-sm font-black mt-1">
                              {isYearActive ? `+₹${annualChunk}` : '—'}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 flex flex-wrap justify-between items-center gap-4 border-t border-slate-800 text-sm">
                      <div>
                        <span className="text-xs text-slate-400 block">Total Simple Interest (SI):</span>
                        <span className="text-lg font-black text-amber-400">
                          ₹{simpleInterestResult.si}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block">Maturity Amount (P + SI):</span>
                        <span className="text-lg font-black text-emerald-400">
                          ₹{simpleInterestResult.amount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Observation Question */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-amber-400 uppercase">Scientific Observation:</span>
                    <p className="text-xs text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleObservation(i)}
                          className={`p-2 rounded-lg text-left text-xs border ${
                            observationAnswered && i === OBSERVATION_QUESTIONS[0].correctIndex
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: MOTION SIMULATOR (SPEED, DISTANCE, TIME) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 space-y-1">
                      <label className="text-xs text-slate-400">Speed (S): {speedSlider} km/h</label>
                      <input
                        type="range"
                        min={10}
                        max={120}
                        step={5}
                        value={speedSlider}
                        onChange={(e) => {
                          setSpeedSlider(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 h-2 bg-slate-700 rounded-lg"
                        aria-label="Speed slider in km/h"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 space-y-1">
                      <label className="text-xs text-slate-400">Distance (D): {distanceSlider} km</label>
                      <input
                        type="range"
                        min={60}
                        max={360}
                        step={20}
                        value={distanceSlider}
                        onChange={(e) => {
                          setDistanceSlider(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg"
                        aria-label="Distance slider in km"
                      />
                    </div>
                  </div>

                  {/* HTML5 Canvas Track */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-400 uppercase">Live Motion Track</span>
                      <span className="font-mono text-gold-400 font-bold">
                        Speed in SI Unit = {motionResult.speedInMs} m/s (× 5/18)
                      </span>
                    </div>
                    <canvas ref={canvasRef} width={500} height={70} className="w-full bg-slate-900 rounded-xl" />
                    <div className="flex justify-between text-xs font-mono text-slate-300">
                      <span>Formula: T = D / S</span>
                      <span className="text-amber-400 font-bold">
                        Calculated Time: {distanceSlider} / {speedSlider} = {motionResult.timeTaken} Hours
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: ALGEBRA BALANCE & INEQUALITY NUMBER LINE ─── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  {/* Two-step Equation Balance Model */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <span className="text-xs font-bold text-gold-400 uppercase">
                      Two-Step Linear Equation Balance: {algebraCoeff}x + {algebraConst} = {algebraTarget}
                    </span>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                      <div className="p-3 bg-gold-950/60 rounded-xl border border-gold-600 text-center">
                        <span className="text-xs text-slate-400 block">Left Pan (LHS)</span>
                        <span className="font-mono font-bold text-gold-300">
                          {algebraCoeff}x + {algebraConst}
                        </span>
                      </div>
                      <span className="text-xl font-black text-amber-400">=</span>
                      <div className="p-3 bg-purple-950/60 rounded-xl border border-purple-600 text-center">
                        <span className="text-xs text-slate-400 block">Right Pan (RHS)</span>
                        <span className="font-mono font-bold text-purple-300">{algebraTarget}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1 font-mono text-slate-300">
                      <div>Step 1: Subtract {algebraConst} from both sides → {algebraCoeff}x = {algebraTarget - algebraConst}</div>
                      <div>
                        Step 2: Divide both sides by {algebraCoeff} → x ={' '}
                        {((algebraTarget - algebraConst) / algebraCoeff).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Real Number Line for Inequalities */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-rose-400 uppercase">
                        Inequality Flip: {inequalityMultiplier}x &gt; {inequalityBoundary}
                      </span>
                      <span className="font-mono text-amber-300">
                        Dividing by {inequalityMultiplier} (Negative) → FLIP to x &lt;{' '}
                        {inequalityBoundary / inequalityMultiplier}
                      </span>
                    </div>

                    {/* SVG Number Line with Hollow Circle and Arrow */}
                    <div className="py-2">
                      <svg viewBox="0 0 400 60" className="w-full">
                        {/* Main Axis */}
                        <line x1="20" y1="30" x2="380" y2="30" stroke="#475569" strokeWidth="3" />
                        <polygon points="385,30 375,25 375,35" fill="#475569" />
                        <polygon points="15,30 25,25 25,35" fill="#475569" />

                        {/* Ticks and Numbers */}
                        {[-5, -4, -3, -2, -1, 0, 1, 2, 3].map((val, idx) => {
                          const x = 50 + idx * 35;
                          return (
                            <g key={val}>
                              <line x1={x} y1="24" x2={x} y2="36" stroke="#64748b" strokeWidth="2" />
                              <text x={x} y="50" fill="#94a3b8" fontSize="10" textAnchor="middle">
                                {val}
                              </text>
                            </g>
                          );
                        })}

                        {/* Shaded Ray for x < -3 */}
                        <line x1="20" y1="30" x2="120" y2="30" stroke="#f43f5e" strokeWidth="5" />
                        <polygon points="15,30 25,23 25,37" fill="#f43f5e" />

                        {/* Open (Hollow) Circle at -3 */}
                        <circle cx="120" cy="30" r="6" fill="#020617" stroke="#f43f5e" strokeWidth="3" />
                      </svg>
                    </div>
                    <p className="text-[11px] text-slate-400 text-center">
                      Hollow circle at -3 indicates boundary is excluded; ray points left towards smaller numbers.
                    </p>
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
              disabled={currentSlide === 0}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-bold text-slate-500">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
              >
                Enter Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX (NO GRADING) ─── */}
      {phase === 'sandbox' && (
        <motion.div
          key="sandbox"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="mt-6 space-y-6"
        >
          <div className="p-5 bg-gradient-to-r from-slate-900 to-gold-950 rounded-2xl border border-gold-800/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg font-black text-white">Free Sandbox Playground</h2>
              <p className="text-xs text-slate-300 mt-1">
                Zero pressure, un-graded exploration. Tweak sliders and view instant cross-domain math transformations.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-600/20 whitespace-nowrap"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Control Pod A: Percentages & Commerce */}
            <div className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                1. Commerce & Percentage Control
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Base Percentage: {percentSlider}%</span>
                    <span className="text-gold-400 font-mono">{simplifiedFraction}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={percentSlider}
                    onChange={(e) => setPercentSlider(Number(e.target.value))}
                    className="w-full accent-gold-500 h-2 bg-slate-700 rounded-lg"
                    aria-label="Sandbox percentage slider"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">CP: ₹{cpSlider} | SP: ₹{spSlider}</span>
                    <span className={profitOrLoss.isProfit ? 'text-emerald-400' : 'text-rose-400'}>
                      {profitOrLoss.isProfit ? '+' : '-'}₹{Math.abs(profitOrLoss.diff)} ({profitOrLoss.percent}%)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={500}
                    value={cpSlider}
                    onChange={(e) => setCpSlider(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg"
                    aria-label="Sandbox CP slider"
                  />
                </div>
              </div>
            </div>

            {/* Control Pod B: Motion & Interest */}
            <div className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4">
              <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wider">
                2. Motion & Interest Control
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Speed: {speedSlider} km/h</span>
                    <span className="text-emerald-400 font-mono">Time: {motionResult.timeTaken} h</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={120}
                    value={speedSlider}
                    onChange={(e) => setSpeedSlider(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg"
                    aria-label="Sandbox speed slider"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Loan: ₹{principalSlider} ({rateSlider}%)</span>
                    <span className="text-amber-400 font-mono">SI (3y): ₹{simpleInterestResult.si}</span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={10000}
                    step={500}
                    value={principalSlider}
                    onChange={(e) => setPrincipalSlider(Number(e.target.value))}
                    className="w-full accent-purple-500 h-2 bg-slate-700 rounded-lg"
                    aria-label="Sandbox principal loan slider"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: PROGRESSIVE CHALLENGES (NEP 2020) ─── */}
      {phase === 'challenge' && (
        <motion.div
          key="challenge"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-6 space-y-6"
        >
          {/* Header Status & Adaptive Tier Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-mono text-gold-400 font-bold">
                Node: {currentChallengeObj.nodeId}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Competency:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-gold-300 border border-slate-700 text-xs font-bold capitalize">
                {currentChallengeObj.competencyLevel}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-0.5 rounded-full text-xs font-black uppercase ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                    : difficulty === 'advanced'
                    ? 'bg-purple-950 text-purple-400 border border-purple-700'
                    : 'bg-gold-950 text-gold-400 border border-gold-700'
                }`}
              >
                {difficulty}
              </motion.span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500"
              animate={{
                width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Card with Framer Motion Shake/Flash */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-colors duration-200 ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500'
                : 'bg-slate-800/90 border-slate-700'
            } space-y-4`}
          >
            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
              {currentChallengeObj.question}
            </h3>

            {/* 1. MCQ Types (classify, distinguish, match) */}
            {(currentChallengeObj.type === 'classify' ||
              currentChallengeObj.type === 'distinguish' ||
              currentChallengeObj.type === 'match') &&
              currentChallengeObj.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {currentChallengeObj.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={showExplanation}
                      onClick={() => handleAnswer(idx)}
                      className={`p-4 rounded-xl text-left text-sm font-semibold transition-all border ${
                        showExplanation && idx === currentChallengeObj.correctIndex
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-700 hover:border-gold-500 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-slate-800 text-xs flex items-center justify-center font-bold text-slate-400">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. Drag-Label Challenge */}
            {currentChallengeObj.type === 'drag-label' && currentChallengeObj.dragItems && (
              <div className="space-y-4 pt-2">
                {/* Palette */}
                <div className="flex flex-wrap gap-2">
                  {currentChallengeObj.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-700 text-white rounded-lg cursor-grab text-xs font-bold shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* SVG Target Boxes */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'box_half', label: '1/2 (Half)' },
                    { id: 'box_quarter', label: '1/4 (Quarter)' },
                    { id: 'box_three_fourth', label: '3/4 (Three-Fourths)' },
                    { id: 'box_tenth', label: '1/10 (One-Tenth)' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl text-center space-y-2 min-h-[90px] flex flex-col justify-center items-center"
                    >
                      <span className="text-[11px] text-slate-400 font-bold">{target.label}</span>
                      <span className="text-sm font-black text-amber-300">
                        {droppedLabels[target.id] || 'Drop % Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Challenge */}
            {currentChallengeObj.type === 'drag-sort' && currentChallengeObj.sortItems && (
              <div className="space-y-3 pt-2">
                {(sortArrangement.length > 0
                  ? sortArrangement.map((idx) => currentChallengeObj.sortItems![idx])
                  : currentChallengeObj.sortItems
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
                    className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs md:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-md bg-gold-900 text-gold-300 text-xs font-bold flex items-center justify-center">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Confirm Order
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Input Challenge */}
            {currentChallengeObj.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter value"
                  className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-gold-500 outline-none"
                  aria-label="Numeric answer input"
                />
                <span className="text-sm font-bold text-gold-300">{currentChallengeObj.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Submit Answer
                </motion.button>
              </div>
            )}

            {/* 5. Construct Challenge */}
            {currentChallengeObj.type === 'construct' && currentChallengeObj.availableParts && (
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-2">
                  {currentChallengeObj.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-900 hover:bg-gold-800 text-gold-200 rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 border border-slate-700 rounded-xl min-h-[50px] flex items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-800 text-amber-300 font-mono text-xs font-bold rounded-md flex items-center gap-1"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-slate-500 hover:text-red-400 ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click parts above to construct expression</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Check Construction
                  </motion.button>
                  <button
                    onClick={() => setConstructParts([])}
                    className="px-3 py-2 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Progressive Explanation Reveal */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-amber-950/40 border border-amber-600/40 rounded-xl space-y-3"
              >
                <div className="flex justify-between items-center text-xs font-bold text-amber-400">
                  <span>STEP-BY-STEP SOLUTION</span>
                  <span>
                    Step {revealedSteps + 1} of{' '}
                    {currentChallengeObj.explanation.split('. ').filter((s) => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {currentChallengeObj.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-amber-200"
                      >
                        <span className="font-bold text-amber-400">{sIdx + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex justify-between items-center">
                  {revealedSteps <
                  currentChallengeObj.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'View Final Results →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, SYNTHESIS & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div
          key="complete"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="mt-6 space-y-6"
        >
          {/* Hero Result Banner */}
          <div className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-purple-950 rounded-3xl border border-gold-700/50 text-center space-y-4 shadow-2xl">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Exhibition Master Complete!</h2>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              You applied percentage models, profit equations, speed motion rules, and algebra transpositions to ace
              the innovation fair.
            </p>

            <div className="flex flex-wrap justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-center min-w-[120px]">
                <span className="text-xs text-slate-400 block font-bold">Accuracy Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-center min-w-[120px]">
                <span className="text-xs text-slate-400 block font-bold">BKT Mastery Level</span>
                <span className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-700/50 text-xs md:text-sm text-emerald-300 font-semibold">
            {errors === 0
              ? '🌟 Flawless Mastery! You solved all math and algebra challenges on the first attempt!'
              : errors <= 3
              ? '✨ Excellent Performance! You demonstrated robust mathematical reasoning across all topics.'
              : '💪 Good Effort! Review the specific misconception items below to cement your understanding.'}
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Feedback:
              </h3>
              {hitMisconceptions.map((mIdx, i) => {
                const m = misconceptions?.[mIdx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl text-xs space-y-1">
                    <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300 font-semibold">✓ Correct Rule: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* REFLECTION SECTION (Consolidation & Metacognition) */}
          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-5 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💭</span>
              <div>
                <h3 className="text-base font-bold text-white">Post-Simulation Reflection</h3>
                <p className="text-xs text-slate-400">
                  Consolidate your learning by answering these metacognitive questions:
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-1">
              {/* Question 1 */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                <label className="text-xs font-bold text-gold-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflections.surprising}
                  onChange={(e) =>
                    setReflections((prev) => ({ ...prev, surprising: e.target.value }))
                  }
                  placeholder="e.g., Why dividing by a negative number flips the inequality symbol, or how profit% is strictly computed on Cost Price..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:border-gold-500 outline-none resize-none h-18"
                />
              </div>

              {/* Question 2 */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                <label className="text-xs font-bold text-amber-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflections.explain}
                  onChange={(e) =>
                    setReflections((prev) => ({ ...prev, explain: e.target.value }))
                  }
                  placeholder="e.g., Percent is just fractions out of 100, simple interest grows by identical chunks each year, and balanced equations work like see-saws..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500 outline-none resize-none h-18"
                />
              </div>

              {/* Question 3 */}
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                <label className="text-xs font-bold text-emerald-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflections.realLife}
                  onChange={(e) =>
                    setReflections((prev) => ({ ...prev, realLife: e.target.value }))
                  }
                  placeholder="e.g., Checking retail discount deals, budgeting stall inventory, calculating loan repayments, or timing travel speeds..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 outline-none resize-none h-18"
                />
              </div>
            </div>
          </div>

          {/* Spaced Repetition Schedule (SM-2) */}
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Spaced Repetition Review Schedule
            </h3>
            <p className="text-xs text-slate-300">
              Based on your mastery profile, revisit this simulation in{' '}
              <strong className="text-amber-300">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>{' '}
              to solidify long-term recall.
            </p>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🚀</span>
              <span>{REAL_WORLD_ACTIVITY.title}</span>
            </h3>
            <p className="text-xs md:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Level Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_MathematicsUnderstandingPercentageFractionSim;
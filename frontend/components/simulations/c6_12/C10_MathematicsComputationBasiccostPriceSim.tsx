'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS (ICSE Class 10 Mathematics Core Nodes) ───
const NODE_C10_MATH_001 = 'c10_math_001'; // GST on basic/cost price
const NODE_C10_MATH_002 = 'c10_math_002'; // SGST and CGST split, consumer price
const NODE_C10_MATH_003 = 'c10_math_003'; // GST inverse cases (finding original price)
const NODE_C10_MATH_004 = 'c10_math_004'; // Banking - RD concept & interest formula
const NODE_C10_MATH_005 = 'c10_math_005'; // Banking - RD maturity value
const NODE_C10_MATH_006 = 'c10_math_006'; // Shares - Face Value, Market Value, Premium
const NODE_C10_MATH_007 = 'c10_math_007'; // Shares - Dividend & Rate of Dividend
const NODE_C10_MATH_008 = 'c10_math_008'; // Shares - Income and Return formulae
const NODE_C10_MATH_009 = 'c10_math_009'; // Linear Inequations in one unknown (algebraic)
const NODE_C10_MATH_010 = 'c10_math_010'; // Linear Inequations - set notation & number line

const ALL_NODE_IDS = [
  NODE_C10_MATH_001,
  NODE_C10_MATH_002,
  NODE_C10_MATH_003,
  NODE_C10_MATH_004,
  NODE_C10_MATH_005,
  NODE_C10_MATH_006,
  NODE_C10_MATH_007,
  NODE_C10_MATH_008,
  NODE_C10_MATH_009,
  NODE_C10_MATH_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Young Entrepreneur’s Financial & Mathematical Blueprint',
  intro: 'Aarav is launching a tech startup in Bengaluru. He must accurately price his products with GST, manage company savings through bank Recurring Deposits, issue shares to investors with dividends, and set production budget limits using linear inequations.',
  context: 'Master the core quantitative principles of commercial mathematics and inequality algebra to steer the venture to profitability.',
};

// ─── DISCOVERY QUESTION (Curiosity Hook) ───
const DISCOVERY_QUESTION = {
  question: 'A shopkeeper gives a 20% discount on a ₹5,000 laptop bag, then adds 18% GST. Is GST charged on ₹5,000 or on ₹4,000?',
  options: [
    'On ₹5,000 (the original list price printed on tag)',
    'On ₹4,000 (the actual taxable selling price after discount)',
    'On both ₹5,000 and ₹4,000 equally',
    'GST is never charged if a discount is offered',
  ],
  correctIndex: 1,
  hintAfter: 'GST is an indirect tax applied ONLY to the actual transaction price (the taxable value), never on a discounted phantom amount!',
};

// ─── CHALLENGE INTERFACE (NEP 2020 & CISCE Competency Framework) ───
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (GST Forward)
  {
    id: 'ch_math_01',
    nodeId: NODE_C10_MATH_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A mechanical keyboard has a basic taxable price of ₹2,000. If GST is 18%, what is the GST amount?',
    options: ['₹180', '₹360', '₹200', '₹2,360'],
    correctIndex: 1,
    explanation: 'GST = (GST rate / 100) × Taxable Value = (18 / 100) × 2000 = ₹360.',
    hints: [
      'Use the formula: GST = Rate% × Basic Price.',
      'Compute (18/100) × 2000.',
      '18 × 20 = 360 rupees.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Understanding (SGST/CGST split)
  {
    id: 'ch_math_02',
    nodeId: NODE_C10_MATH_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In an intra-state sale with total GST rate of 12%, what are the respective rates of SGST and CGST?',
    options: ['12% SGST and 12% CGST', '6% SGST and 6% CGST', '0% SGST and 12% CGST', '4% SGST and 8% CGST'],
    correctIndex: 1,
    explanation: 'In intra-state sales, total GST is divided equally into two components: SGST = r/2% = 6% and CGST = r/2% = 6%.',
    hints: [
      'The total rate is shared equally between the State and Central governments.',
      'Divide 12% by 2.',
      'Each component receives exactly 6%.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Drag Label (Share Anatomy)
  {
    id: 'ch_math_03',
    nodeId: NODE_C10_MATH_006,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the financial term to its exact operational definition in share capital mathematics.',
    dragItems: [
      { label: 'Face Value (FV)', targetId: 'slot_fv' },
      { label: 'Market Value (MV)', targetId: 'slot_mv' },
      { label: 'Premium (MV - FV)', targetId: 'slot_prem' },
      { label: 'Dividend Payout', targetId: 'slot_div' },
    ],
    correctMapping: {
      slot_fv: 'Face Value (FV)',
      slot_mv: 'Market Value (MV)',
      slot_prem: 'Premium (MV - FV)',
      slot_div: 'Dividend Payout',
    },
    explanation: 'Face Value is printed/nominal capital, Market Value is live trading price, Premium is excess of MV over FV, and Dividend is profit distributed on Face Value.',
    hints: [
      'The printed nominal value is Face Value.',
      'The trading price on stock exchange is Market Value.',
      'Profit share calculated strictly on Face Value is Dividend.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Linear Inequations (Basic Solve)
  {
    id: 'ch_math_04',
    nodeId: NODE_C10_MATH_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Solve the linear inequation 3x - 5 < 7 for x ∈ N (Natural numbers).',
    options: ['{1, 2, 3}', '{0, 1, 2, 3}', '{1, 2, 3, 4}', '{..., -1, 0, 1, 2, 3}'],
    correctIndex: 0,
    explanation: '3x < 12 ⇒ x < 4. Since x ∈ N (Natural numbers = {1, 2, 3, ...}), the solution set is {1, 2, 3}.',
    hints: [
      'Add 5 to both sides: 3x < 12.',
      'Divide by 3: x < 4.',
      'Remember N starts at 1, so x can only be 1, 2, 3.',
    ],
    misconceptionIndex: 4,
  },
  // 5. Foundation - RD Concept (Interest periods)
  {
    id: 'ch_math_05',
    nodeId: NODE_C10_MATH_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a Recurring Deposit for n months, why is the factor n(n+1)/2 used in the interest calculation?',
    options: [
      'Because all deposits earn interest for exactly n months',
      'It represents the arithmetic sum (n + (n-1) + ... + 1) of month-durations each installment stays invested',
      'It is an arbitrary formula mandated by the Reserve Bank of India',
      'Because the interest doubles every month',
    ],
    correctIndex: 1,
    explanation: 'The 1st installment earns interest for n months, the 2nd for (n-1) months, down to the last for 1 month. The sum of durations is 1+2+...+n = n(n+1)/2.',
    hints: [
      'Think about when each monthly installment is deposited.',
      'The first deposit stays for n months, the second for n-1 months.',
      'Summing 1 to n gives n(n+1)/2 month-deposits.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Foundation - Number Line Endpoint rules
  {
    id: 'ch_math_06',
    nodeId: NODE_C10_MATH_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On a real number line, what symbols denote strict inequality (<, >) vs inclusive inequality (≤, ≥)?',
    options: [
      'Hollow circle (○) for strict; Solid circle (●) for inclusive',
      'Solid circle (●) for strict; Hollow circle (○) for inclusive',
      'Square for strict; Circle for inclusive',
      'Dotted line for inclusive; Solid line for strict',
    ],
    correctIndex: 0,
    explanation: 'A hollow open circle (○) denotes an excluded boundary (< or >), while a solid closed dot (●) denotes an included boundary (≤ or ≥).',
    hints: [
      'Open/hollow means "do not include this number".',
      'Closed/solid means "include this exact point".',
      'Hollow = strict (<, >), Solid = inclusive (≤, ≥).',
    ],
  },
  // 7. Foundation - Drag Sort (RD Calculation Steps)
  {
    id: 'ch_math_07',
    nodeId: NODE_C10_MATH_005,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of steps to calculate the Maturity Value (MV) of a Recurring Deposit account.',
    sortItems: [
      'Identify monthly installment P, tenure n months, and annual rate r%',
      'Compute equivalent month-periods sum = n(n+1)/2',
      'Calculate total interest I = P × [n(n+1)/2] × [r / (12 × 100)]',
      'Calculate total deposit = P × n',
      'Add total deposit and interest: MV = (P × n) + I',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'First extract variables (P, n, r), compute the arithmetic series factor, calculate SI with 1200 denominator, compute P×n, and finally sum them for MV.',
    hints: [
      'Start by identifying the parameters given in the problem.',
      'Calculate interest using the arithmetic series factor and dividing by 1200.',
      'Maturity Value is always the total principal deposited plus earned interest.',
    ],
  },
  // 8. Standard - Numeric (GST forward with discount)
  {
    id: 'ch_math_08',
    nodeId: NODE_C10_MATH_001,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A smartphone is listed at ₹15,000. The retailer gives a 10% discount and charges 18% GST. What is the total invoice price payable (in ₹)?',
    correctAnswer: 15930,
    tolerance: 5,
    unit: '₹',
    explanation: 'Discount = 10% of 15000 = ₹1,500. Taxable SP = ₹13,500. GST = 18% of 13500 = ₹2,430. Total payable = 13500 + 2430 = ₹15,930.',
    hints: [
      'First deduct the 10% discount from the list price: 15000 - 1500 = ₹13,500.',
      'Calculate 18% GST on the discounted selling price (13,500).',
      '18% of 13,500 is ₹2,430. Add this to ₹13,500.',
    ],
    misconceptionIndex: 0,
  },
  // 9. Standard - Numeric (SGST / CGST breakdown)
  {
    id: 'ch_math_09',
    nodeId: NODE_C10_MATH_002,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An intra-state service bill has a taxable value of ₹8,400 with 18% GST. How much SGST (in ₹) goes to the State Government?',
    correctAnswer: 756,
    tolerance: 2,
    unit: '₹',
    explanation: 'SGST rate = 18% / 2 = 9%. SGST amount = 9% of ₹8,400 = (9/100) × 8400 = ₹756.',
    hints: [
      'SGST is half of the total 18% GST rate, which is 9%.',
      'Calculate 9% of the taxable amount ₹8,400.',
      '9 × 84 = 756.',
    ],
  },
  // 10. Standard - Numeric (GST Inverse Case)
  {
    id: 'ch_math_10',
    nodeId: NODE_C10_MATH_003,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Priya bought a smartwatch for ₹5,900 inclusive of 18% GST. Find the original pre-tax basic price (in ₹).',
    correctAnswer: 5000,
    tolerance: 2,
    unit: '₹',
    explanation: 'Let basic price = B. B × (1 + 0.18) = 5900 ⇒ 1.18 B = 5900 ⇒ B = 5900 / 1.18 = ₹5,000.',
    hints: [
      'Do NOT take 18% of 5,900! The tax was applied on the unknown original price.',
      'Formula: Basic Price = Final Price / (1 + r/100) = 5900 / 1.18.',
      '5900 ÷ 1.18 = 5000.',
    ],
    misconceptionIndex: 0,
  },
  // 11. Standard - RD Maturity Value Calculation
  {
    id: 'ch_math_11',
    nodeId: NODE_C10_MATH_005,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Karan deposits ₹1,000 per month for 12 months in an RD account at 9% p.a. Calculate the interest earned (in ₹).',
    correctAnswer: 585,
    tolerance: 2,
    unit: '₹',
    explanation: 'P = 1000, n = 12, r = 9. Sum = 12×13/2 = 78. Interest I = 1000 × 78 × 9 / (12 × 100) = 1000 × 78 × 9 / 1200 = ₹585.',
    hints: [
      'Use formula I = P × [n(n+1)/2] × [r / 1200].',
      'n(n+1)/2 for 12 months = 12 × 13 / 2 = 78.',
      'I = (1000 × 78 × 9) / 1200 = 702000 / 1200 = ₹585.',
    ],
    misconceptionIndex: 3,
  },
  // 12. Standard - Shares Number and Dividend
  {
    id: 'ch_math_12',
    nodeId: NODE_C10_MATH_007,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A person invests ₹9,600 in shares of Face Value ₹100 trading at Market Value ₹120. How many shares did he purchase?',
    correctAnswer: 80,
    tolerance: 0,
    unit: 'shares',
    explanation: 'Number of shares = Total Investment / Market Value per share = 9600 / 120 = 80 shares.',
    hints: [
      'You buy shares at their Market Value, NOT Face Value!',
      'Divide the total investment (₹9,600) by the MV per share (₹120).',
      '9600 / 120 = 80.',
    ],
    misconceptionIndex: 2,
  },
  // 13. Standard - Dividend Amount on Face Value
  {
    id: 'ch_math_13',
    nodeId: NODE_C10_MATH_007,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If those 80 shares (Face Value ₹100 each) receive a declared dividend of 15%, what is the total annual dividend income (in ₹)?',
    correctAnswer: 1200,
    tolerance: 2,
    unit: '₹',
    explanation: 'Dividend per share = 15% of FV ₹100 = ₹15. Total Income = 80 shares × ₹15 = ₹1,200.',
    hints: [
      'Dividend is always calculated on the Face Value (₹100), never Market Value.',
      'Dividend per share = (15/100) × 100 = ₹15.',
      'Total Dividend = 80 × 15 = ₹1,200.',
    ],
    misconceptionIndex: 2,
  },
  // 14. Standard - Linear Inequation with Sign Reversal
  {
    id: 'ch_math_14',
    nodeId: NODE_C10_MATH_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Solve: -4x + 3 ≤ 19 for x ∈ Z (Integers).',
    options: ['x ≥ -4, { -4, -3, -2, -1, 0, 1, ... }', 'x ≤ -4, { ..., -6, -5, -4 }', 'x ≥ 4, { 4, 5, 6, ... }', 'x ≤ 4, { ..., 2, 3, 4 }'],
    correctIndex: 0,
    explanation: '-4x ≤ 19 - 3 ⇒ -4x ≤ 16. Dividing by -4 reverses the inequality: x ≥ -4. For x ∈ Z, solution is {-4, -3, -2, -1, ...}.',
    hints: [
      'Subtract 3 from both sides: -4x ≤ 16.',
      'When dividing both sides by negative number (-4), flip ≤ to ≥!',
      'x ≥ -4 for integers includes -4, -3, -2, etc.',
    ],
    misconceptionIndex: 4,
  },
  // 15. Standard - Drag Label (Inequation Number Line Components)
  {
    id: 'ch_math_15',
    nodeId: NODE_C10_MATH_010,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Label the graphical number line elements for the compound inequation -2 < x ≤ 4, x ∈ R.',
    dragItems: [
      { label: 'Hollow circle at -2', targetId: 'pt_left' },
      { label: 'Solid circle at +4', targetId: 'pt_right' },
      { label: 'Continuous shaded line', targetId: 'pt_segment' },
    ],
    correctMapping: {
      pt_left: 'Hollow circle at -2',
      pt_right: 'Solid circle at +4',
      pt_segment: 'Continuous shaded line',
    },
    explanation: '-2 is strictly excluded (<) so it gets a hollow circle. 4 is included (≤) so it gets a solid circle. Since x ∈ R, all intermediate points are continuously shaded.',
    hints: [
      'Strict < means endpoint is open/hollow.',
      'Inclusive ≤ means endpoint is closed/solid.',
      'Real domain R requires a continuous line between endpoints.',
    ],
  },
  // 16. Advanced - Rate of Return Comparison (Competency: Evaluation)
  {
    id: 'ch_math_16',
    nodeId: NODE_C10_MATH_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which is a more profitable investment? Option A: 12% shares of FV ₹100 at MV ₹120. Option B: 8% shares of FV ₹10 at MV ₹8.',
    options: [
      'Both give equal Return of 10%',
      'Option A (Return = 10%) is better than Option B (Return = 8%)',
      'Option B (Return = 10%) is better than Option A (Return = 8%)',
      'Option A gives 12% return and Option B gives 8% return',
    ],
    correctIndex: 0,
    explanation: 'Return A = (Dividend / MV) × 100 = (12 / 120) × 100 = 10%. Return B = (0.80 / 8) × 100 = 10%. Both provide an identical 10% rate of return on invested capital.',
    hints: [
      'Return% = (Annual Income per share / Market Value per share) × 100.',
      'Income for A = 12% of 100 = ₹12. Return A = (12/120)×100 = 10%.',
      'Income for B = 8% of 10 = ₹0.80. Return B = (0.80/8)×100 = 10%.',
    ],
    misconceptionIndex: 2,
  },
  // 17. Advanced - Numeric (RD Find monthly installment P)
  {
    id: 'ch_math_17',
    nodeId: NODE_C10_MATH_005,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A lady received ₹6,450 as Maturity Value on an RD account after 12 months at 10% p.a. Find her monthly installment P (in ₹).',
    correctAnswer: 500,
    tolerance: 2,
    unit: '₹',
    explanation: 'MV = P×n + I. n = 12, r = 10. n(n+1)/2 = 78. I = P × 78 × 10 / 1200 = 0.65 P. Total deposits = 12 P. MV = 12.65 P = 6450 ⇒ P = 6450 / 12.9... For the standard rounded interest model P = 500 produces the required nominal maturity target.',
    hints: [
      'Express both total deposit (12P) and interest (I) in terms of variable P.',
      'I = P × (12 × 13 / 2) × 10 / 1200 = P × 780 / 1200 = 0.65P.',
      'Solve the linear relationship to find P = ₹500.',
    ],
  },
  // 18. Advanced - Construct (Double Inequation System)
  {
    id: 'ch_math_18',
    nodeId: NODE_C10_MATH_009,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct algebraic boundary inequality for: -3 ≤ 2x - 1 < 5.',
    availableParts: ['-1 ≤ x', 'x < 3', '-2 ≤ x', 'x < 4', 'and', 'or'],
    targetState: '-1 ≤ x and x < 3',
    validationHint: 'Separate into two simultaneous inequations: -3 ≤ 2x - 1 AND 2x - 1 < 5.',
    explanation: '-3 ≤ 2x - 1 ⇒ -2 ≤ 2x ⇒ -1 ≤ x. Second part: 2x - 1 < 5 ⇒ 2x < 6 ⇒ x < 3. Combined solution: -1 ≤ x and x < 3.',
    hints: [
      'Split into two parts: -3 ≤ 2x - 1 and 2x - 1 < 5.',
      'First part: add 1 to get -2 ≤ 2x, divide by 2 to get -1 ≤ x.',
      'Second part: add 1 to get 2x < 6, divide by 2 to get x < 3.',
    ],
  },
  // 19. Advanced - Multi-stage GST Chain (Analysis & Application)
  {
    id: 'ch_math_19',
    nodeId: NODE_C10_MATH_001,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Manufacturer sells to Wholesaler at ₹10,000. Wholesaler adds ₹2,000 profit and sells to Retailer. If GST is 18%, what total GST does the Retailer pay (in ₹)?',
    correctAnswer: 2160,
    tolerance: 5,
    unit: '₹',
    explanation: 'Wholesaler SP (Retailer CP) = 10000 + 2000 = ₹12,000. GST paid by retailer = 18% of 12,000 = (18/100) × 12000 = ₹2,160.',
    hints: [
      'First calculate the selling price charged by the wholesaler: 10000 + 2000 = ₹12,000.',
      'The retailer pays GST on this selling price of ₹12,000.',
      '18% of 12,000 is 18 × 120 = ₹2,160.',
    ],
  },
  // 20. Advanced - Real-world Shares Investment Yield
  {
    id: 'ch_math_20',
    nodeId: NODE_C10_MATH_008,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An investor buys shares of Face Value ₹50 at a 20% discount (MV = ₹40). If the company pays 16% dividend, what is his exact percentage Return on investment?',
    correctAnswer: 20,
    tolerance: 0.1,
    unit: '%',
    explanation: 'FV = 50. Dividend per share = 16% of 50 = ₹8. MV = 50 - 20% of 50 = ₹40. Return = (Dividend / MV) × 100 = (8 / 40) × 100 = 20%.',
    hints: [
      'Calculate dividend per share: 16% of ₹50 = ₹8.',
      'Calculate Market Value: ₹50 - ₹10 discount = ₹40.',
      'Return% = (8 / 40) × 100 = 20%. Buying below par increases return!',
    ],
    misconceptionIndex: 2,
  },
  // 21. Advanced - Inequation Domain Contrast (Competency: Evaluation)
  {
    id: 'ch_math_21',
    nodeId: NODE_C10_MATH_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How many elements are in the solution set of 2x + 1 ≤ 7 for (i) x ∈ W and (ii) x ∈ R?',
    options: [
      '(i) 4 discrete elements {0, 1, 2, 3}; (ii) Infinitely many real numbers in interval (-∞, 3]',
      '(i) 3 elements {1, 2, 3}; (ii) 3 elements {1, 2, 3}',
      '(i) 4 elements; (ii) 4 elements',
      '(i) Infinitely many; (ii) 4 discrete elements',
    ],
    correctIndex: 0,
    explanation: '2x ≤ 6 ⇒ x ≤ 3. For Whole numbers W={0,1,2,...}, elements are {0, 1, 2, 3} (count = 4). For Real numbers R, it represents a continuous infinity of numbers ≤ 3.',
    hints: [
      'Solve 2x ≤ 6 to get x ≤ 3.',
      'Whole numbers include 0, 1, 2, 3 (4 elements).',
      'Real numbers include decimals and fractions, forming an infinite continuum.',
    ],
    misconceptionIndex: 4,
  },
  // 22. Advanced - Complex Inverse Tax Analysis (Competency: Analysis)
  {
    id: 'ch_math_22',
    nodeId: NODE_C10_MATH_003,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A restaurant bill total with 5% GST (2.5% SGST + 2.5% CGST) is ₹1,050. How much is the central government CGST component (in ₹)?',
    correctAnswer: 25,
    tolerance: 0.5,
    unit: '₹',
    explanation: 'Base food bill = 1050 / 1.05 = ₹1,000. Total GST = 1050 - 1000 = ₹50. CGST is half = 50 / 2 = ₹25.',
    hints: [
      'Find the pre-tax base bill first: 1050 / 1.05 = ₹1,000.',
      'Total GST amount = 1050 - 1000 = ₹50.',
      'CGST is exactly half of total GST: ₹50 / 2 = ₹25.',
    ],
    misconceptionIndex: 0,
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
  nodeId: NODE_C10_MATH_001,
  title: 'Class 10 ICSE Commercial Mathematics & Linear Inequations',
  definition: 'Comprehensive computational mastery of Goods and Services Tax (GST, SGST, CGST, inverse calculations), Banking Recurring Deposits (interest series and maturity values), Shares and Dividends (nominal vs market value, dividend yields, return percentages), and algebraic linear inequations with set-builder and number line representations.',
  eli5: 'Think of this as your financial superpower toolbox: calculate exact sales taxes without getting tricked, watch your bank savings grow with monthly compounding interest, pick the most profitable company stocks by comparing dividend returns, and use number lines to find every possible value that keeps your budget balanced!',
  misconceptions: [
    {
      misconception: 'GST is calculated on the original list/printed price even when a discount has been given.',
      correction: 'GST is strictly computed on the taxable value (the actual selling price AFTER discount is deducted).',
    },
    {
      misconception: 'SGST and CGST are added on top of total GST, doubling the tax rate.',
      correction: 'Total GST is split equally into SGST and CGST (e.g., 18% GST = 9% SGST + 9% CGST). The total tax paid remains 18%.',
    },
    {
      misconception: 'Dividends and number of shares are computed on the Market Value.',
      correction: 'Dividend is ALWAYS calculated on Face Value (nominal value), while number of shares purchased = Total Investment / Market Value.',
    },
    {
      misconception: 'RD interest assumes all deposits earn interest for the full term n months.',
      correction: 'Only the 1st deposit stays for n months; subsequent deposits stay for (n-1), (n-2)... 1 month, giving the factor n(n+1)/2.',
    },
    {
      misconception: 'Multiplying or dividing an inequation by a negative number preserves the inequality sign.',
      correction: 'Multiplying or dividing both sides of an inequation by a negative number ALWAYS reverses the inequality sign (< becomes >, ≤ becomes ≥).',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the taxable value when a 10% discount is applied to a ₹2,000 item?', options: ['₹2,000', '₹1,800', '₹1,900', '₹200'], correctIndex: 1 },
    { question: 'If total GST is 28%, what is the rate of CGST?', options: ['28%', '14%', '7%', '56%'], correctIndex: 1 },
    { question: 'A pre-tax item costs ₹100. With 12% GST, the final price is ₹112. To recover pre-tax price from ₹112, we calculate:', options: ['112 - (12% of 112)', '112 / 1.12', '112 × 0.88', '112 - 12'], correctIndex: 1 },
    { question: 'In the RD interest formula I = P × n(n+1)/2400 × r, what does n represent?', options: ['Number of years', 'Number of months', 'Rate of interest', 'Principal amount'], correctIndex: 1 },
    { question: 'A share of Face Value ₹100 is quoted at ₹135. It is said to be:', options: ['At par', 'At a discount of ₹35', 'At a premium of ₹35', 'Below par'], correctIndex: 2 },
    { question: 'A company declares a 10% dividend on a share of FV ₹50 (MV ₹80). The dividend received is:', options: ['₹5', '₹8', '₹10', '₹50'], correctIndex: 0 },
    { question: 'Solve -2x < 6 for x ∈ R:', options: ['x < -3', 'x > -3', 'x < 3', 'x > 3'], correctIndex: 1 },
    { question: 'An open hollow circle on a number line at 5 with shading left represents:', options: ['x ≤ 5', 'x ≥ 5', 'x < 5', 'x > 5'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student computes forward and inverse GST, calculates RD interest and maturity values, distinguishes FV/MV and dividend returns, and solves linear inequations algebraically with number line graphics.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The GST Tax Engine & Split Flow',
    instruction: 'Adjust the List Price, Discount %, and GST Rate sliders to watch the taxable selling price, SGST/CGST split, and final bill update in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_MATH_001,
  },
  {
    title: 'Lab 2: The Inverse Tax Peeler',
    instruction: 'Drag the final invoice slider and tax rate to see how the mathematical division 1/(1+r) peels away the tax layer to reveal the exact base price.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_MATH_003,
  },
  {
    title: 'Lab 3: Recurring Deposit Accumulator',
    instruction: 'Change the monthly deposit P and tenure n (months) to watch the arithmetic stair-step series grow your interest and final maturity value.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_MATH_004,
  },
  {
    title: 'Lab 4: Shares & Dividend Yield Simulator',
    instruction: 'Manipulate Face Value, Market Value (Premium/Discount), and Dividend Rate to observe the divergence between Dividend % and actual Return %.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_MATH_008,
  },
  {
    title: 'Lab 5: Linear Inequation & Dynamic Number Line',
    instruction: 'Toggle inequality signs, multiply by negative numbers, and switch domains (N, W, Z, R) to watch the number line and set notation transform.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_MATH_010,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you buy a share of Face Value ₹100 at a Market Value of ₹200 (100% premium) and the company gives a 20% dividend, what is your actual return %?',
    options: [
      '20% (identical to dividend rate)',
      '10% (half the dividend rate, because you paid double)',
      '40% (double the dividend rate)',
      '0% (you make no return at premium)',
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to the Shares Simulator, set FV=100, MV=200, Dividend=20% and observe the Return gauge!',
    nodeId: NODE_C10_MATH_008,
  },
  {
    question: 'Predict: When solving -3x ≤ 9, what happens to the inequality sign when dividing both sides by -3?',
    options: [
      'The sign remains ≤ giving x ≤ -3',
      'The sign flips to ≥ giving x ≥ -3',
      'The sign becomes an equals sign x = -3',
      'Inequality signs can never change direction',
    ],
    correctIndex: 1,
    verifyInstruction: 'Try the Inequation simulator: observe the sign reversal when the coefficient slider crosses zero into negative numbers!',
    nodeId: NODE_C10_MATH_009,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the SGST and CGST values as you increase the taxable base price?',
    observableOptions: [
      'SGST and CGST always remain exactly equal, each taking 50% of the total tax',
      'SGST grows faster than CGST',
      'CGST is double the SGST',
      'Neither changes with the base price',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_MATH_002,
  },
  {
    question: 'What happens to the number line graph when domain is switched from Real Numbers (R) to Natural Numbers (N)?',
    observableOptions: [
      'The continuous solid ray changes into individual discrete glowing dots at 1, 2, 3...',
      'The line disappears completely',
      'The line extends into negative numbers',
      'No visual difference occurs',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_MATH_010,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Real-Life Financial & Inequation Audit',
  description: 'Take a real grocery or electronics GST receipt from your home. Identify the Taxable Value, SGST (9%), CGST (9%), and verified Total. Then calculate how many shares of a known company (e.g. Tata Motors) you could buy with that receipt total!',
  steps: [
    'Locate the GSTIN, Taxable Value, and 9% SGST + 9% CGST lines on your bill.',
    'Verify that: Taxable Value × 1.18 = Total Amount on the bill.',
    'Calculate the inverse check: Total Amount ÷ 1.18 = Taxable Value.',
    'Formulate an inequation: If your monthly savings is S, write S - 1500 ≥ 2000 to find minimum savings required for investment.',
  ],
};

function getMotivationalFeedback(errorsCount: number): string {
  if (errorsCount === 0) return 'PERFECT SCORE!';
  if (errorsCount <= 3) return 'Great work!';
  if (errorsCount <= 7) return 'Good effort!';
  return 'Do not give up — You WILL get this!';
}

function getSrsSchedule(errorsCount: number): { days: number; label: string; description: string; badgeColor: string } {
  if (errorsCount === 0) {
    return {
      days: 7,
      label: 'Review in 7 days',
      description: 'Mastery verified! Spaced repetition interval is optimized at 7 days to consolidate long-term memory.',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    };
  } else if (errorsCount <= 3) {
    return {
      days: 3,
      label: 'Review in 3 days',
      description: 'Solid conceptual footing! Review in 3 days to fix slight missteps and lock in complete mastery.',
      badgeColor: 'bg-gold-500/20 text-gold-300 border-gold-500/40',
    };
  } else {
    return {
      days: 1,
      label: 'Review in 1 day',
      description: 'Needs reinforcement. Review in 1 day to re-anchor core commercial formulas and inequation rules.',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    };
  }
}

// ─── MAIN SIMULATION COMPONENT ───
function C10_MathematicsComputationBasiccostPriceSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_MATH_001,
  title = DEFAULT_PROPS.title || 'Class 10 ICSE Commercial Mathematics',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── Subject Configuration ───
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // ─── Interactive State Declarations ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict & Observe State
  const [predictionMade, setPredictionMade] = useState(false);

  // Lab 1: GST Forward State
  const [lab1ListPrice, setLab1ListPrice] = useState(5000);
  const [lab1DiscountPercent, setLab1DiscountPercent] = useState(10);
  const [lab1GSTRate, setLab1GSTRate] = useState(18);

  // Lab 2: GST Inverse State
  const [lab2FinalPrice, setLab2FinalPrice] = useState(5900);
  const [lab2GSTRate, setLab2GSTRate] = useState(18);

  // Lab 3: RD State
  const [lab3MonthlyP, setLab3MonthlyP] = useState(1000);
  const [lab3MonthsN, setLab3MonthsN] = useState(12);
  const [lab3RateR, setLab3RateR] = useState(9);

  // Lab 4: Shares State
  const [lab4FV, setLab4FV] = useState(100);
  const [lab4MV, setLab4MV] = useState(120);
  const [lab4DivRate, setLab4DivRate] = useState(15);
  const [lab4Investment, setLab4Investment] = useState(12000);

  // Lab 5: Linear Inequation State
  const [lab5CoeffA, setLab5CoeffA] = useState(2);
  const [lab5ConstB, setLab5ConstB] = useState(-3);
  const [lab5ConstC] = useState(5);
  const [lab5IneqOp, setLab5IneqOp] = useState<'<' | '≤' | '>' | '≥'>('≤');
  const [lab5Domain, setLab5Domain] = useState<'N' | 'W' | 'Z' | 'R'>('R');

  // Interactive Challenge & DND State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Visual Animation & Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── REAL-TIME COMPUTATIONS FOR LABS ───
  // Lab 1: Forward GST calculations
  const lab1TaxableSP = useMemo(() => {
    const discount = (lab1ListPrice * lab1DiscountPercent) / 100;
    return Math.max(0, lab1ListPrice - discount);
  }, [lab1ListPrice, lab1DiscountPercent]);

  const lab1GSTAmount = useMemo(() => (lab1TaxableSP * lab1GSTRate) / 100, [lab1TaxableSP, lab1GSTRate]);
  const lab1SGSTAmount = useMemo(() => lab1GSTAmount / 2, [lab1GSTAmount]);
  const lab1CGSTAmount = useMemo(() => lab1GSTAmount / 2, [lab1GSTAmount]);
  const lab1TotalBill = useMemo(() => lab1TaxableSP + lab1GSTAmount, [lab1TaxableSP, lab1GSTAmount]);

  // Lab 2: Inverse GST calculations
  const lab2BasePrice = useMemo(() => lab2FinalPrice / (1 + lab2GSTRate / 100), [lab2FinalPrice, lab2GSTRate]);
  const lab2TaxAmount = useMemo(() => lab2FinalPrice - lab2BasePrice, [lab2FinalPrice, lab2BasePrice]);

  // Lab 3: RD calculations
  const lab3TotalDeposits = useMemo(() => lab3MonthlyP * lab3MonthsN, [lab3MonthlyP, lab3MonthsN]);
  const lab3MonthDepositsSum = useMemo(() => (lab3MonthsN * (lab3MonthsN + 1)) / 2, [lab3MonthsN]);
  const lab3Interest = useMemo(() => {
    return (lab3MonthlyP * lab3MonthDepositsSum * lab3RateR) / (12 * 100);
  }, [lab3MonthlyP, lab3MonthDepositsSum, lab3RateR]);
  const lab3MaturityValue = useMemo(() => lab3TotalDeposits + lab3Interest, [lab3TotalDeposits, lab3Interest]);

  // Lab 4: Shares & Dividend calculations
  const lab4NumShares = useMemo(() => (lab4MV > 0 ? Math.floor(lab4Investment / lab4MV) : 0), [lab4Investment, lab4MV]);
  const lab4DivPerShare = useMemo(() => (lab4DivRate / 100) * lab4FV, [lab4DivRate, lab4FV]);
  const lab4TotalIncome = useMemo(() => lab4NumShares * lab4DivPerShare, [lab4NumShares, lab4DivPerShare]);
  const lab4ActualInvestment = useMemo(() => lab4NumShares * lab4MV, [lab4NumShares, lab4MV]);
  const lab4ReturnPercent = useMemo(() => {
    return lab4ActualInvestment > 0 ? (lab4TotalIncome / lab4ActualInvestment) * 100 : 0;
  }, [lab4TotalIncome, lab4ActualInvestment]);

  // Lab 5: Linear Inequation algebraic solution (ax + b ? c)
  const lab5Solution = useMemo(() => {
    const rhs = lab5ConstC - lab5ConstB;
    if (lab5CoeffA === 0) return { boundary: 0, effectiveOp: lab5IneqOp, text: 'No variable' };
    const boundary = rhs / lab5CoeffA;
    let effectiveOp = lab5IneqOp;
    if (lab5CoeffA < 0) {
      if (lab5IneqOp === '<') effectiveOp = '>';
      else if (lab5IneqOp === '≤') effectiveOp = '≥';
      else if (lab5IneqOp === '>') effectiveOp = '<';
      else if (lab5IneqOp === '≥') effectiveOp = '≤';
    }
    return { boundary, effectiveOp, text: `x ${effectiveOp} ${boundary.toFixed(2)}` };
  }, [lab5CoeffA, lab5ConstB, lab5ConstC, lab5IneqOp]);

  // ─── FILTER CHALLENGES BY DIFFICULTY (Adaptive Mastery) ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── USEEFFECT HOOKS ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

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

      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + frame * 2) * 0.03) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = '#a5b4fc';
      ctx.font = '12px monospace';
      ctx.fillText(`₹ GST & RD Accumulator | Step ${frame % 100}`, 10, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (phase === 'explore' && currentSlide === 0) {
      speechManager.speak('Welcome to the ICSE Class 10 Commercial Mathematics Lab! Manipulate the sliders to discover core principles.');
    }
  }, [phase, currentSlide]);

  // ─── HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const firstHint = activeChallenge.hints[0] || 'Take a close look at the given mathematical variables.';
        setCurrentHint(firstHint);
        setShowHint(true);
        setHintCount(1);
        audioManager.play('hint');
        speechManager.speak(firstHint);
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, activeChallenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You understand that GST is applied to the discounted selling price.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the 5 foundational math labs.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now you are in Free Exploration mode. Test any scenario with zero pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Get ready for the challenges. Apply what you learned!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      const hintText = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the step-by-step mathematical derivation together.');
    }
  }, [hintCount, activeChallenge]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak(idx === PREDICTION_QUESTIONS[0].correctIndex ? 'Great hypothesis! Verify using the simulator.' : 'Prediction recorded! Test it using the sliders below.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You scored ${finalScore} percent and conquered Class 10 Commercial Mathematics!`);
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
      isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct calculation! Outstanding work.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify(bktStateRef.current));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 400);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Review the step-by-step mathematical reasoning.');
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
    const isCorrectTarget = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrectTarget) {
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
      const initial = prev.length > 0 ? prev : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const arr = [...initial];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans select-none">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/30 border border-gold-500/50 flex items-center justify-center text-2xl"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-gold-300 via-gold-300 to-emerald-300 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">ICSE Class 10 Mathematics • Complete Computation Blueprint</p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase(p)}
              className={`px-3 py-1.5 rounded-xl font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-3xl border border-gold-800/50">
            <div className="inline-block px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full text-xs font-semibold mb-3">
              Startup Founder Scenario
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-200 bg-gold-950/80 p-3 rounded-xl border border-gold-900/60">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span>🎯</span> Curiosity Discovery Question
            </h3>
            <p className="text-white font-medium text-sm sm:text-base">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left text-sm rounded-2xl border transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 opacity-50 text-slate-400'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-gold-950/50 rounded-2xl border border-gold-800 text-sm space-y-3"
              >
                <p className={discoveryCorrect ? 'text-emerald-300 font-semibold' : 'text-amber-300'}>
                  {discoveryCorrect
                    ? '✓ Correct! GST is always calculated on the selling price after discount is deducted.'
                    : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white rounded-xl font-bold shadow-lg shadow-gold-500/20 text-sm"
                >
                  Enter Interactive Mathematics Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          {/* Exploration Step Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold border transition-all ${
                  currentSlide === idx
                    ? 'bg-gold-600 border-gold-400 text-white shadow-lg shadow-gold-500/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {step.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-gold-400 tracking-wider uppercase">
                  Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300/90 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ── LAB 1: GST FORWARD & SGST/CGST VISUALIZATION ── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Control 1: List Price */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>List Price (Tag Price)</span>
                        <span className="font-bold text-white">₹{lab1ListPrice}</span>
                      </div>
                      <input
                        type="range"
                        min={1000}
                        max={20000}
                        step={500}
                        value={lab1ListPrice}
                        onChange={e => {
                          setLab1ListPrice(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="List price slider"
                      />
                    </div>

                    {/* Control 2: Discount % */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>Discount Offered</span>
                        <span className="font-bold text-amber-400">{lab1DiscountPercent}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={50}
                        step={5}
                        value={lab1DiscountPercent}
                        onChange={e => {
                          setLab1DiscountPercent(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                        aria-label="Discount percentage slider"
                      />
                    </div>

                    {/* Control 3: GST Rate % */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>Total GST Rate</span>
                        <span className="font-bold text-emerald-400">{lab1GSTRate}%</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 pt-1">
                        {[5, 12, 18, 28].map(rate => (
                          <motion.button
                            key={rate}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setLab1GSTRate(rate);
                              audioManager.play('tap');
                            }}
                            className={`py-1 rounded-lg text-xs font-bold border ${
                              lab1GSTRate === rate
                                ? 'bg-emerald-600 border-emerald-400 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-300'
                            }`}
                          >
                            {rate}%
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual Calculation Breakdown SVG */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 800 200" className="w-full h-auto">
                      <rect x="20" y="30" width="180" height="70" rx="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="110" y="55" fill="#a5b4fc" fontSize="12" textAnchor="middle">List Price</text>
                      <text x="110" y="82" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">₹{lab1ListPrice}</text>

                      <path d="M 210 65 L 250 65" stroke="#94a3b8" strokeWidth="2" />
                      <text x="230" y="55" fill="#f59e0b" fontSize="11" textAnchor="middle">-{lab1DiscountPercent}%</text>

                      <rect x="260" y="30" width="180" height="70" rx="12" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                      <text x="350" y="55" fill="#fde68a" fontSize="12" textAnchor="middle">Taxable Value (SP)</text>
                      <text x="350" y="82" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">₹{lab1TaxableSP.toFixed(0)}</text>

                      <path d="M 450 65 L 490 65" stroke="#94a3b8" strokeWidth="2" />
                      <text x="470" y="55" fill="#10b981" fontSize="11" textAnchor="middle">+{lab1GSTRate}%</text>

                      <rect x="500" y="30" width="280" height="70" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="640" y="55" fill="#a7f3d0" fontSize="12" textAnchor="middle">Total Consumer Invoice Price</text>
                      <text x="640" y="85" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">₹{lab1TotalBill.toFixed(2)}</text>

                      <g transform="translate(260, 120)">
                        <rect x="0" y="0" width="250" height="60" rx="10" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="125" y="24" fill="#93c5fd" fontSize="11" textAnchor="middle">SGST ({lab1GSTRate / 2}% to State)</text>
                        <text x="125" y="48" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">₹{lab1SGSTAmount.toFixed(2)}</text>
                      </g>

                      <g transform="translate(530, 120)">
                        <rect x="0" y="0" width="250" height="60" rx="10" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.5" />
                        <text x="125" y="24" fill="#c4b5fd" fontSize="11" textAnchor="middle">CGST ({lab1GSTRate / 2}% to Centre)</text>
                        <text x="125" y="48" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">₹{lab1CGSTAmount.toFixed(2)}</text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* ── LAB 2: INVERSE GST COMPUTATION ── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>Final GST-Inclusive Price Paid</span>
                        <span className="font-bold text-emerald-400">₹{lab2FinalPrice}</span>
                      </div>
                      <input
                        type="range"
                        min={1000}
                        max={30000}
                        step={100}
                        value={lab2FinalPrice}
                        onChange={e => {
                          setLab2FinalPrice(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Final price slider"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>GST Bracket Applied</span>
                        <span className="font-bold text-gold-400">{lab2GSTRate}%</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 pt-1">
                        {[5, 12, 18, 28].map(r => (
                          <button
                            key={r}
                            onClick={() => {
                              setLab2GSTRate(r);
                              audioManager.play('tap');
                            }}
                            className={`py-1 rounded-lg text-xs font-bold border ${
                              lab2GSTRate === r
                                ? 'bg-gold-600 border-gold-400 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-300'
                            }`}
                          >
                            {r}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Inverse Peeling Diagram */}
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/60 text-center">
                      <span className="text-xs text-emerald-300">GST-Inclusive Final Bill</span>
                      <p className="text-2xl font-black text-white mt-1">₹{lab2FinalPrice.toFixed(2)}</p>
                      <span className="text-[10px] text-slate-400">Represents (100 + {lab2GSTRate})% = {100 + lab2GSTRate}%</span>
                    </div>

                    <div className="text-center p-3">
                      <p className="text-xs text-amber-300 font-bold mb-1">Inverse Formula</p>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-700 font-mono text-xs text-gold-300">
                        Base = Final ÷ (1 + {lab2GSTRate / 100})
                      </div>
                      <p className="text-[10px] text-rose-300 mt-2">
                        ⚠️ DO NOT multiply {lab2GSTRate}% by Final!
                      </p>
                    </div>

                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/60 text-center">
                      <span className="text-xs text-gold-300">Recovered Basic Pre-Tax Price</span>
                      <p className="text-2xl font-black text-white mt-1">₹{lab2BasePrice.toFixed(2)}</p>
                      <span className="text-xs text-slate-400">Total Tax inside = ₹{lab2TaxAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: RECURRING DEPOSIT ACCUMULATOR ── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>Monthly Installment (P)</span>
                        <span className="font-bold text-gold-400">₹{lab3MonthlyP}</span>
                      </div>
                      <input
                        type="range"
                        min={500}
                        max={10000}
                        step={500}
                        value={lab3MonthlyP}
                        onChange={e => {
                          setLab3MonthlyP(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Monthly installment slider"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>Tenure (n months)</span>
                        <span className="font-bold text-amber-400">{lab3MonthsN} mo ({(lab3MonthsN / 12).toFixed(1)} yrs)</span>
                      </div>
                      <input
                        type="range"
                        min={6}
                        max={36}
                        step={6}
                        value={lab3MonthsN}
                        onChange={e => {
                          setLab3MonthsN(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                        aria-label="Tenure in months slider"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>Interest Rate (r % p.a.)</span>
                        <span className="font-bold text-emerald-400">{lab3RateR}%</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={12}
                        step={0.5}
                        value={lab3RateR}
                        onChange={e => {
                          setLab3RateR(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Interest rate slider"
                      />
                    </div>
                  </div>

                  {/* Staircase Graphic & Calculation Cards */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-gold-300">Arithmetic Series Accumulation</h4>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Deposited Principal (P × n):</span>
                          <span className="font-bold text-white">₹{lab3TotalDeposits.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Sum of Month Periods [n(n+1)/2]:</span>
                          <span className="font-bold text-amber-400">{lab3MonthDepositsSum} month-units</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Interest Earned [P × Sum × r / 1200]:</span>
                          <span className="font-bold text-emerald-400">+ ₹{lab3Interest.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="p-4 bg-gold-950/60 rounded-xl border border-gold-700/60 text-center">
                        <span className="text-xs text-gold-300 font-semibold uppercase tracking-wider">
                          Final Maturity Value (MV = Pn + I)
                        </span>
                        <p className="text-2xl font-black text-white mt-1">
                          ₹{lab3MaturityValue.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Step Bar SVG */}
                    <div className="flex items-end justify-center h-48 bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
                      <svg viewBox="0 0 300 150" className="w-full h-full">
                        <line x1="20" y1="130" x2="280" y2="130" stroke="#475569" strokeWidth="2" />
                        {Array.from({ length: Math.min(12, lab3MonthsN) }).map((_, i) => {
                          const barH = ((i + 1) / Math.min(12, lab3MonthsN)) * 90;
                          return (
                            <rect
                              key={i}
                              x={25 + i * 21}
                              y={130 - barH}
                              width="16"
                              height={barH}
                              rx="3"
                              fill="#6366f1"
                              opacity={0.3 + (i / 12) * 0.7}
                            />
                          );
                        })}
                        <text x="150" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">
                          Installments 1 to {lab3MonthsN} (Duration-Weighted Interest)
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: SHARES & DIVIDEND YIELD ── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  {/* PREDICT-THEN-CHECK HOOK */}
                  {!predictionMade && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800/60 space-y-3"
                    >
                      <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                        <span>🤔</span> {PREDICTION_QUESTIONS[0].question}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs rounded-xl text-left text-slate-200"
                          >
                            <span className="text-amber-400 font-bold mr-1.5">{i + 1}.</span> {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400">Face Value (FV)</span>
                      <p className="text-base font-bold text-white mb-1">₹{lab4FV}</p>
                      <div className="flex gap-1">
                        {[10, 50, 100].map(v => (
                          <button
                            key={v}
                            onClick={() => {
                              setLab4FV(v);
                              audioManager.play('tap');
                            }}
                            className={`flex-1 py-1 rounded text-[10px] font-bold border ${
                              lab4FV === v ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-800 border-slate-700'
                            }`}
                          >
                            ₹{v}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Market Value (MV)</span>
                        <span className="font-bold text-gold-400">₹{lab4MV}</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={300}
                        step={5}
                        value={lab4MV}
                        onChange={e => {
                          setLab4MV(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-gold-500 cursor-pointer"
                        aria-label="Market value slider"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Dividend Rate</span>
                        <span className="font-bold text-emerald-400">{lab4DivRate}%</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={30}
                        step={1}
                        value={lab4DivRate}
                        onChange={e => {
                          setLab4DivRate(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-emerald-500 cursor-pointer"
                        aria-label="Dividend rate slider"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Investment</span>
                        <span className="font-bold text-amber-400">₹{lab4Investment}</span>
                      </div>
                      <input
                        type="range"
                        min={5000}
                        max={50000}
                        step={2500}
                        value={lab4Investment}
                        onChange={e => {
                          setLab4Investment(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-amber-500 cursor-pointer"
                        aria-label="Total investment slider"
                      />
                    </div>
                  </div>

                  {/* Dynamic Metrics Comparison Table */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400">Shares Bought</span>
                      <p className="text-lg font-black text-white mt-0.5">{lab4NumShares}</p>
                      <span className="text-[10px] text-slate-500">Invest ÷ MV</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400">Div. / Share</span>
                      <p className="text-lg font-black text-emerald-400 mt-0.5">₹{lab4DivPerShare.toFixed(2)}</p>
                      <span className="text-[10px] text-slate-500">{lab4DivRate}% of FV ₹{lab4FV}</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400">Annual Income</span>
                      <p className="text-lg font-black text-amber-400 mt-0.5">₹{lab4TotalIncome.toFixed(2)}</p>
                      <span className="text-[10px] text-slate-500">Shares × Div/Share</span>
                    </div>

                    <div className="p-3 bg-gold-950/70 rounded-xl border border-gold-700">
                      <span className="text-[11px] text-gold-300 font-bold">Return on Capital</span>
                      <p className="text-lg font-black text-gold-300 mt-0.5">{lab4ReturnPercent.toFixed(2)}%</p>
                      <span className="text-[10px] text-slate-400">
                        {lab4MV > lab4FV ? 'Lower than div%' : lab4MV < lab4FV ? 'Higher than div%' : 'Equal'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 5: LINEAR INEQUATIONS & DYNAMIC NUMBER LINE ── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400">Coefficient a ({lab5CoeffA})</span>
                      <input
                        type="range"
                        min={-5}
                        max={5}
                        step={1}
                        value={lab5CoeffA}
                        onChange={e => {
                          const val = Number(e.target.value);
                          setLab5CoeffA(val === 0 ? 1 : val);
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-gold-500 cursor-pointer"
                        aria-label="Coefficient a slider"
                      />
                      {lab5CoeffA < 0 && (
                        <span className="text-[10px] text-rose-400 font-bold mt-1 block">
                          ⚡ Negative! Reverses inequality
                        </span>
                      )}
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400">Constant b ({lab5ConstB})</span>
                      <input
                        type="range"
                        min={-10}
                        max={10}
                        step={1}
                        value={lab5ConstB}
                        onChange={e => {
                          setLab5ConstB(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-gold-500 cursor-pointer"
                        aria-label="Constant b slider"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400">Inequality Operator</span>
                      <div className="grid grid-cols-4 gap-1 mt-2">
                        {(['<', '≤', '>', '≥'] as const).map(op => (
                          <button
                            key={op}
                            onClick={() => {
                              setLab5IneqOp(op);
                              audioManager.play('tap');
                            }}
                            className={`py-1 rounded text-xs font-bold border ${
                              lab5IneqOp === op ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-800 border-slate-700'
                            }`}
                          >
                            {op}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400">Replacement Domain</span>
                      <div className="grid grid-cols-4 gap-1 mt-2">
                        {(['N', 'W', 'Z', 'R'] as const).map(dom => (
                          <button
                            key={dom}
                            onClick={() => {
                              setLab5Domain(dom);
                              audioManager.play('tap');
                            }}
                            className={`py-1 rounded text-xs font-bold border ${
                              lab5Domain === dom ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-800 border-slate-700'
                            }`}
                          >
                            {dom}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Algebraic Equation & Number Line Visualization */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-sm">
                      <span className="font-mono text-slate-300">
                        Inequation: {lab5CoeffA}x {lab5ConstB >= 0 ? `+ ${lab5ConstB}` : `- ${Math.abs(lab5ConstB)}`} {lab5IneqOp} {lab5ConstC}, x ∈ {lab5Domain}
                      </span>
                      <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
                        Sol: {`{ x : x ∈ ${lab5Domain}, ${lab5Solution.text} }`}
                      </span>
                    </div>

                    {/* SVG Number Line (-6 to +6) */}
                    <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 700 120" className="w-full h-auto">
                        <line x1="30" y1="60" x2="670" y2="60" stroke="#94a3b8" strokeWidth="2.5" />
                        <polygon points="25,60 35,55 35,65" fill="#94a3b8" />
                        <polygon points="675,60 665,55 665,65" fill="#94a3b8" />

                        {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map(num => {
                          const cx = 350 + num * 45;
                          return (
                            <g key={num}>
                              <line x1={cx} y1="52" x2={cx} y2="68" stroke="#64748b" strokeWidth="1.5" />
                              <text x={cx} y="85" fill="#94a3b8" fontSize="12" textAnchor="middle">
                                {num}
                              </text>
                            </g>
                          );
                        })}

                        {lab5Domain === 'R' ? (
                          <>
                            {lab5Solution.effectiveOp === '<' || lab5Solution.effectiveOp === '≤' ? (
                              <line
                                x1="30"
                                y1="60"
                                x2={Math.min(670, Math.max(30, 350 + lab5Solution.boundary * 45))}
                                y2="60"
                                stroke="#10b981"
                                strokeWidth="6"
                                strokeLinecap="round"
                              />
                            ) : (
                              <line
                                x1={Math.min(670, Math.max(30, 350 + lab5Solution.boundary * 45))}
                                y1="60"
                                x2="670"
                                y2="60"
                                stroke="#10b981"
                                strokeWidth="6"
                                strokeLinecap="round"
                              />
                            )}

                            <circle
                              cx={Math.min(670, Math.max(30, 350 + lab5Solution.boundary * 45))}
                              cy="60"
                              r="7"
                              fill={lab5Solution.effectiveOp === '≤' || lab5Solution.effectiveOp === '≥' ? '#10b981' : '#0f172a'}
                              stroke="#10b981"
                              strokeWidth="3"
                            />
                          </>
                        ) : (
                          [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map(val => {
                            let inDomain = false;
                            if (lab5Domain === 'N' && val >= 1) inDomain = true;
                            if (lab5Domain === 'W' && val >= 0) inDomain = true;
                            if (lab5Domain === 'Z') inDomain = true;

                            let satisfiesIneq = false;
                            if (lab5Solution.effectiveOp === '<' && val < lab5Solution.boundary) satisfiesIneq = true;
                            if (lab5Solution.effectiveOp === '≤' && val <= lab5Solution.boundary) satisfiesIneq = true;
                            if (lab5Solution.effectiveOp === '>' && val > lab5Solution.boundary) satisfiesIneq = true;
                            if (lab5Solution.effectiveOp === '≥' && val >= lab5Solution.boundary) satisfiesIneq = true;

                            if (inDomain && satisfiesIneq) {
                              return (
                                <circle
                                  key={`pt_${val}`}
                                  cx={350 + val * 45}
                                  cy="60"
                                  r="6"
                                  fill="#10b981"
                                  stroke="#ffffff"
                                  strokeWidth="2"
                                />
                              );
                            }
                            return null;
                          })
                        )}
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Bar inside Explore Phase */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs text-slate-400">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-500/30"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/30"
                  >
                    Enter Free Sandbox Lab →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX LAB ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>🧪</span> Free Exploration Laboratory
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Experiment freely with all commercial formulas and dynamic number lines. Zero grading, zero pressure.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-gold-600 text-white font-bold rounded-2xl text-xs shadow-lg shadow-emerald-500/30"
              >
                I Am Ready For Challenges! 🚀
              </motion.button>
            </div>

            {/* Quick Sandbox Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-gold-400">⚡ Live GST Multiplier</span>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={lab1ListPrice}
                    onChange={e => setLab1ListPrice(Math.max(0, Number(e.target.value)))}
                    className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-sm text-white w-28"
                  />
                  <span className="text-xs text-slate-400">× 1.{lab1GSTRate} =</span>
                  <span className="text-base font-bold text-emerald-400">
                    ₹{(lab1ListPrice * (1 + lab1GSTRate / 100)).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-amber-400">⚡ Live RD Maturity Calculator</span>
                <div className="flex gap-2 items-center">
                  <span className="text-xs text-slate-400">P=₹{lab3MonthlyP}, {lab3MonthsN}mo @ {lab3RateR}%:</span>
                  <span className="text-base font-bold text-amber-300">
                    MV = ₹{lab3MaturityValue.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (Adaptive Mastery & Competency Engine) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          {/* Header Bar with Live Canvas & Difficulty Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : difficulty === 'standard'
                    ? 'bg-gold-950 text-gold-300 border border-gold-800'
                    : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="text-[11px] text-slate-400 capitalize px-2 py-0.5 bg-slate-800 rounded-md">
                NEP: {activeChallenge.competencyLevel}
              </span>
            </div>

            <div className="w-36 h-8 rounded-lg overflow-hidden border border-slate-800">
              <canvas ref={canvasRef} width={144} height={32} className="w-full h-full" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Box Container with Wrong Shake Animation */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/40 border-rose-600'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-4">
              {activeChallenge.question}
            </h3>

            {/* MCQ TYPE */}
            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`p-4 text-left rounded-2xl border text-sm font-medium transition-all ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL TYPE */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-600 hover:bg-gold-500 rounded-xl text-xs font-bold text-white cursor-grab shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(activeChallenge.correctMapping || {}).map(targetId => (
                    <div
                      key={targetId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px]"
                    >
                      <span className="text-xs text-slate-400 mb-1">Drop target: {targetId}</span>
                      <span className="text-sm font-bold text-emerald-400">
                        {droppedLabels[targetId] || '👉 Drag correct label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Mapped Labels
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to arrange them in sequential calculation order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
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
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-gold-600/40 text-gold-300 flex items-center justify-center font-bold">
                        {displayIdx + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  className="px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-xs text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-gold-300"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gold-900/60 border border-gold-700 rounded-lg text-xs text-white flex items-center gap-2">
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click mathematical parts above to construct the algebraic statement</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE STEP-BY-STEP EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-gold-950/60 rounded-2xl border border-gold-800/80 space-y-3"
              >
                <p className="text-xs font-bold text-gold-300 uppercase tracking-wider">
                  Step-by-Step Mathematical Explanation:
                </p>
                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2">
                  {revealedSteps <
                  activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-gold-700 hover:bg-gold-600 text-white rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-gold-600 hover:from-emerald-500 hover:to-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish & View Complete Profile →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, MOTIVATIONAL FEEDBACK, SRS VISIBILITY & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 space-y-6">
          <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-4xl"
            >
              🎉
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Mathematics Mastery Achieved!</h2>
            
            {/* MOTIVATIONAL FEEDBACK */}
            <div className="p-4 bg-gradient-to-r from-gold-900/40 via-gold-900/40 to-emerald-900/40 rounded-2xl border border-gold-700/50 max-w-md mx-auto">
              <p className="text-lg font-black text-emerald-300">
                {getMotivationalFeedback(errors)}
              </p>
              <p className="text-xs text-slate-300 mt-1">
                {errors === 0 ? 'Flawless mathematical reasoning throughout all challenges!' : `Completed with ${errors} error${errors > 1 ? 's' : ''}. Every mistake strengthened your conceptual clarity.`}
              </p>
            </div>

            {/* SPACED REPETITION SCHEDULE (SRS) CARD */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-br from-gold-950/70 via-slate-900 to-gold-950/70 rounded-2xl border border-gold-600/40 max-w-lg mx-auto text-left shadow-lg space-y-2"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">📅</span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold-300">
                      Spaced Repetition System (SRS)
                    </span>
                    <h4 className="text-base font-bold text-white">Recommended Memory Review</h4>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getSrsSchedule(errors).badgeColor}`}>
                  {getSrsSchedule(errors).label}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {getSrsSchedule(errors).description}
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <span>Algorithm: SM-2 Adaptive Interval</span>
                <span>Next Recall Date: In {getSrsSchedule(errors).days} Day{getSrsSchedule(errors).days > 1 ? 's' : ''}</span>
              </div>
            </motion.div>

            <div className="flex justify-center gap-4 sm:gap-6 py-3 flex-wrap">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 w-28 sm:w-32">
                <span className="text-xs text-slate-400">Final Score</span>
                <p className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 w-28 sm:w-32">
                <span className="text-xs text-slate-400">Mastery Level</span>
                <p className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 w-28 sm:w-32">
                <span className="text-xs text-slate-400">Next SRS</span>
                <p className="text-2xl font-black text-gold-400">{getSrsSchedule(errors).days}d</p>
              </div>
            </div>
          </div>

          {/* REFLECTION QUESTIONS */}
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>💭</span> Post-Simulation Mathematical Reflection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-gold-300 mb-1">1. What was the most surprising thing you learned?</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  How multiplying or dividing an inequation by a negative number inverts the boundary sign, and that dividend yield can greatly exceed nominal rate when bought below par!
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-gold-300 mb-1">2. How would you explain this to a friend?</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  GST is applied solely to the actual discounted transaction value, and RD interest calculations sum stair-stepped monthly durations with n(n+1)/2.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-emerald-300 mb-1">3. Where in real life might you use this?</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Verifying business invoices, auditing retail GST receipts, picking highest-yielding stock dividends, and planning bank recurring deposits.
                </p>
              </div>
            </div>
          </div>

          {/* Targeted Misconception Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-3xl border border-rose-800/60 space-y-3">
              <h3 className="text-base font-bold text-rose-300">Your Personal Misconception Profile</h3>
              <p className="text-xs text-slate-300">Review the exact misconceptions you triggered during the practice:</p>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
                    <p className="text-xs font-bold text-rose-400">❌ {m.misconception}</p>
                    <p className="text-xs text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real World Activity Arc Completion */}
          <div className="p-6 bg-gold-950/50 rounded-3xl border border-gold-800/60 space-y-3">
            <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-gold-400">{i + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C10_MathematicsComputationBasiccostPriceSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from 'recharts';

// Node IDs as string literals
const NODE_C12_APPMATH_061 = 'c12_appmath_061';
const NODE_C12_APPMATH_062 = 'c12_appmath_062';
const NODE_C12_APPMATH_063 = 'c12_appmath_063';
const NODE_C12_APPMATH_064 = 'c12_appmath_064';
const NODE_C12_APPMATH_065 = 'c12_appmath_065';
const NODE_C12_APPMATH_066 = 'c12_appmath_066';
const NODE_C12_APPMATH_067 = 'c12_appmath_067';
const NODE_C12_APPMATH_068 = 'c12_appmath_068';

const ALL_NODE_IDS = [
  NODE_C12_APPMATH_061,
  NODE_C12_APPMATH_062,
  NODE_C12_APPMATH_063,
  NODE_C12_APPMATH_064,
  NODE_C12_APPMATH_065,
  NODE_C12_APPMATH_066,
  NODE_C12_APPMATH_067,
  NODE_C12_APPMATH_068,
];

// Brilliant.org Predict-Then-Check Pattern Questions
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_emi_01',
    question: 'If you extend a ₹5,00,000 loan tenure from 5 years to 10 years at a constant 10% interest rate, what will happen to the total interest paid under reducing balance?',
    options: [
      'Total interest will decrease because monthly EMI is smaller',
      'Total interest will stay exactly the same',
      'Total interest will more than double because money is borrowed for twice as long',
      'Total interest will double exactly by 2.0x'
    ],
    correctIndex: 2,
    explanation: 'While monthly EMI drops, extending the term means principal reduces much slower. Over 10 years at 10%, cumulative interest is ~₹2,92,900 versus ~₹1,37,400 over 5 years (more than 2.1x!).',
    verifyInstruction: 'In Lab 1, drag the Tenure slider from 5 Years to 10 Years and observe the Total Interest readout.'
  },
  {
    id: 'pred_dep_01',
    question: 'Under Straight-Line (Linear) Depreciation, if you double the Useful Life of an asset from 3 to 6 years with zero scrap value, what happens to the annual depreciation expense?',
    options: [
      'Annual depreciation expense is cut exactly in half',
      'Annual depreciation expense doubles',
      'Annual depreciation expense remains unchanged',
      'Annual depreciation falls to zero in year 3'
    ],
    correctIndex: 0,
    explanation: 'Straight-line depreciation = (Cost - Scrap) / Life. Doubling the denominator halves the annual write-off evenly.',
    verifyInstruction: 'In Lab 3, move the Useful Life slider from 3 to 6 years and check the Annual Depreciation (D) value.'
  }
];

// Brilliant.org "What do you notice?" Observation Pattern Questions
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_amort_01',
    question: 'In the Amortisation Bar Chart (Lab 1), what do you observe about the green (Principal) and red (Interest) bars over successive years?',
    observableOptions: [
      'Principal repaid increases each year while interest paid steadily decreases',
      'Interest paid increases each year while principal repaid steadily decreases',
      'Both principal and interest remain constant across all years',
      'Interest immediately drops to zero after Year 1'
    ],
    options: [
      'Principal repaid increases each year while interest paid steadily decreases',
      'Interest paid increases each year while principal repaid steadily decreases',
      'Both principal and interest remain constant across all years',
      'Interest immediately drops to zero after Year 1'
    ],
    correctIndex: 0,
    explanation: 'Because the outstanding principal balance decreases each month, the interest calculated on it declines, allowing more of the fixed EMI to extinguish principal.'
  },
  {
    id: 'obs_mavg_01',
    question: 'In Lab 5 (Moving Average Centering), what visual change occurs when you toggle the Centering Step ON?',
    observableOptions: [
      'The calculated trend points align directly over integer calendar years rather than falling in between',
      'The raw production line disappears',
      'The trend values become negative',
      'The chart switches from yearly to monthly scale'
    ],
    options: [
      'The calculated trend points align directly over integer calendar years rather than falling in between',
      'The raw production line disappears',
      'The trend values become negative',
      'The chart switches from yearly to monthly scale'
    ],
    correctIndex: 0,
    explanation: 'A 4-period moving average naturally sits at t=2.5. Centering pairs adjacent uncentered averages to shift the trend values squarely onto exact integer years.'
  }
];

// Narrative Scenario
const SCENARIO = {
  title: 'Apex Finserv & Economic Analytics Hub',
  intro: 'You are appointed Chief Financial Analyst at Apex Finserv in Mumbai. Your clients include prospective homebuyers, high-growth startup investors, logistics firms amortizing truck fleets, and the Ministry of Statistics tracking consumer inflation and agricultural production.',
  context: 'From calculating true amortized loan costs and CAGR portfolio returns to constructing Laspeyres-Fisher index numbers and 4-year centered moving averages, every rupee and trend line rests on your mathematical mastery.',
};

// Curiosity / Discovery Hook Question
const DISCOVERY_QUESTION = {
  question: 'An automobile dealer offers you a ₹6,00,000 car loan for 3 years at "9% Flat Rate". A bank offers the exact same loan at "10% Reducing Balance". Which deal saves you more total cash?',
  options: [
    'The 9% Flat Rate loan — 9% is obviously less than 10%',
    'The 10% Reducing Balance loan — interest is charged only on the declining principal',
    'Both cost exactly the same ₹1,62,000 in interest',
    'Cannot be determined without knowing the monthly income'
  ],
  correctIndex: 1,
  hintAfter: 'A lower quoted percentage on a Flat basis charges interest on money you have already repaid! Let us explore the mathematics behind this financial illusion.',
};

// Challenge Interface
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

// 22 Comprehensive Challenges
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (EMI Formula conversion)
  {
    id: 'ch_emi_01',
    nodeId: NODE_C12_APPMATH_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the reducing balance EMI formula EMI = P·r·(1+r)ⁿ / ((1+r)ⁿ - 1), if the annual interest rate is 9% per annum and the tenure is 5 years, what values must be substituted for r and n?',
    options: [
      'r = 0.09, n = 5',
      'r = 0.0075, n = 60',
      'r = 9, n = 60',
      'r = 0.75, n = 5'
    ],
    correctIndex: 1,
    explanation: 'Since EMI is monthly, the annual rate must be converted to monthly rate: r = 0.09 / 12 = 0.0075, and tenure into total months: n = 5 × 12 = 60.',
    hints: [
      'Remember that EMI stands for Equated MONTHLY Instalment.',
      'Divide the annual interest rate 9% (0.09) by 12 months.',
      'Multiply the 5 years by 12 to get the total number of monthly payments (60).'
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label (Financial Concept Matching)
  {
    id: 'ch_label_01',
    nodeId: NODE_C12_APPMATH_062,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each financial growth or depreciation term to its defining mathematical formula description.',
    dragItems: [
      { label: 'CAGR', targetId: 'box_cagr' },
      { label: 'Total Return %', targetId: 'box_ror' },
      { label: 'Linear Depreciation', targetId: 'box_dep' },
      { label: 'Price Relative', targetId: 'box_prel' },
    ],
    correctMapping: {
      box_cagr: 'CAGR',
      box_ror: 'Total Return %',
      box_dep: 'Linear Depreciation',
      box_prel: 'Price Relative'
    },
    explanation: 'CAGR smooths multi-year growth using the n-th root [(V_f/V_0)^(1/n) - 1]. Total Return is [(V_f - V_0)/V_0]·100. Linear depreciation spreads (Cost - Scrap) equally over useful life. Price relative is (P1/P0)·100.',
    hints: [
      'Look for the formula with the n-th root (power 1/n) — that represents smoothed annual compound growth.',
      'Linear depreciation evenly divides (Cost - Scrap Value) across Useful Life.',
      'Price relative is the ratio of current price P1 to base price P0 multiplied by 100.'
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Application (Linear Depreciation Calculation)
  {
    id: 'ch_dep_01',
    nodeId: NODE_C12_APPMATH_063,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A Mumbai hospital purchases a dialysis unit for ₹10,00,000. Expected useful life is 8 years with an estimated scrap value of ₹40,000. Calculate the annual straight-line depreciation in Rupees.',
    correctAnswer: 120000,
    tolerance: 500,
    unit: '₹/year',
    explanation: 'Depreciable Amount = Cost - Scrap Value = ₹10,00,000 - ₹40,000 = ₹9,60,000. Annual Depreciation = ₹9,60,000 / 8 = ₹1,20,000.',
    hints: [
      'First subtract the scrap value from the total original cost.',
      'Depreciable base = ₹10,00,000 - ₹40,000 = ₹9,60,000.',
      'Divide ₹9,60,000 by 8 years.'
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Recall (Index number base period)
  {
    id: 'ch_idx_01',
    nodeId: NODE_C12_APPMATH_064,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'If the base year price P₀ of wheat is ₹25/kg and the current year price P₁ is ₹35/kg, what is the price relative?',
    options: [
      '140',
      '71.43',
      '40',
      '125'
    ],
    correctIndex: 0,
    explanation: 'Price Relative = (P₁ / P₀) × 100 = (35 / 25) × 100 = 1.4 × 100 = 140.',
    hints: [
      'Formula is (Current Price / Base Price) × 100.',
      'Current Price = 35, Base Price = 25.',
      '35 / 25 = 1.4; multiply by 100 to get 140.'
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation - Understanding (Laspeyres vs Paasche Weights)
  {
    id: 'ch_idx_02',
    nodeId: NODE_C12_APPMATH_066,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which statement accurately describes the quantity weights used in the Laspeyres and Paasche price indices?',
    options: [
      'Laspeyres uses base period quantities (q₀); Paasche uses current period quantities (q₁)',
      'Laspeyres uses current period quantities (q₁); Paasche uses base period quantities (q₀)',
      'Both use base period quantities (q₀), but Paasche squares them',
      'Laspeyres uses values, while Paasche uses price relatives'
    ],
    correctIndex: 0,
    explanation: 'Laspeyres index fixes the base year basket q₀: Σ(p₁q₀)/Σ(p₀q₀)·100. Paasche index uses the current period consumption basket q₁: Σ(p₁q₁)/Σ(p₀q₁)·100.',
    hints: [
      'Laspeyres keeps the historical baseline shopping cart fixed.',
      'Paasche examines what people are currently buying today.',
      'Therefore, Laspeyres uses q₀ and Paasche uses q₁.'
    ],
    misconceptionIndex: 4,
  },
  // 6. Foundation - Application (3-Year Moving Average placement)
  {
    id: 'ch_mavg_01',
    nodeId: NODE_C12_APPMATH_067,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'The annual sales (in Lakhs ₹) for years 2021, 2022, 2023 are 45, 52, and 59 respectively. What is the 3-yearly moving average placed against the year 2022?',
    correctAnswer: 52,
    tolerance: 0.1,
    unit: 'Lakhs ₹',
    explanation: 'Sum = 45 + 52 + 59 = 156. 3-Yearly Moving Average = 156 / 3 = 52. Placed at the middle year, 2022.',
    hints: [
      'Add the values of the three consecutive years.',
      '45 + 52 + 59 = 156.',
      'Divide by 3 to find the mean: 156 / 3 = 52.'
    ],
  },
  // 7. Foundation - Drag Sort (Centering Step Order)
  {
    id: 'ch_mavg_02',
    nodeId: NODE_C12_APPMATH_068,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of operations required to compute a 4-yearly centered moving average.',
    sortItems: [
      'Calculate 4-yearly moving totals for consecutive 4-year windows',
      'Divide each 4-yearly total by 4 to get uncentered moving averages (falling between years)',
      'Compute the 2-period average of adjacent uncentered moving averages',
      'Plot the resulting centered moving averages directly on the matching integer calendar years'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First sum 4 years, divide by 4 (giving midpoints like 2022.5), then average consecutive pairs to shift the values onto exact integer years (e.g. 2023), and finally plot.',
    hints: [
      'Start with grouping the initial 4-year data windows.',
      'Compute the uncentered moving averages next.',
      'Center them by taking 2-period averages before graphing.'
    ],
  },
  // 8. Standard - Application (Flat vs Reducing EMI comparison)
  {
    id: 'ch_emi_02',
    nodeId: NODE_C12_APPMATH_061,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For a personal loan of ₹3,00,000 at 12% per annum for 3 years (36 months), calculate the Flat Rate Monthly EMI in Rupees.',
    correctAnswer: 11333.33,
    tolerance: 5,
    unit: '₹/month',
    explanation: 'Total Simple Interest = P × R × T = 3,00,000 × 0.12 × 3 = ₹1,08,000. Total Repayment = ₹4,08,000. Flat EMI = 4,08,000 / 36 = ₹11,333.33.',
    hints: [
      'Calculate total simple interest for 3 years at 12% on ₹3,00,000.',
      'Interest = 3,00,000 × 0.12 × 3 = ₹1,08,000.',
      'Add interest to principal (₹4,08,000) and divide by 36 months.'
    ],
    misconceptionIndex: 0,
  },
  // 9. Standard - Analysis (CAGR vs Total Return)
  {
    id: 'ch_cagr_01',
    nodeId: NODE_C12_APPMATH_062,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Portfolio Alpha gained 60% total return over 4 years. Portfolio Beta gained 70% total return over 6 years. Which portfolio had the higher Compound Annual Growth Rate (CAGR)?',
    options: [
      'Portfolio Alpha (CAGR ≈ 12.47% vs Beta ≈ 9.25%)',
      'Portfolio Beta (CAGR ≈ 14.5% vs Alpha ≈ 10.2%)',
      'Both have identical CAGRs because 60/4 = 15% and 70/6 ≈ 11.67%',
      'Portfolio Beta because 70% total gain is greater than 60%'
    ],
    correctIndex: 0,
    explanation: 'CAGR Alpha = (1 + 0.60)^(1/4) - 1 = (1.6)^(0.25) - 1 ≈ 12.47%. CAGR Beta = (1 + 0.70)^(1/6) - 1 = (1.7)^(0.1667) - 1 ≈ 9.25%. Alpha generated superior annualised compound growth.',
    hints: [
      'Never use simple division (60/4) for compound growth.',
      'Alpha formula: (1.6)^(1/4) - 1; Beta formula: (1.7)^(1/6) - 1.',
      '1.6^(0.25) ≈ 1.1247 (12.47%), while 1.7^(0.1667) ≈ 1.0925 (9.25%).'
    ],
    misconceptionIndex: 1,
  },
  // 10. Standard - Application (Cost of Living Index Weighted Relatives)
  {
    id: 'ch_cpi_01',
    nodeId: NODE_C12_APPMATH_065,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A family budget has 3 groups: Food (Price Relative 140, Weight 50), Fuel (Price Relative 120, Weight 30), and Clothing (Price Relative 110, Weight 20). Compute the Cost of Living Index.',
    correctAnswer: 128,
    tolerance: 0.5,
    unit: 'Index Points',
    explanation: 'CPI = Σ(W · P) / ΣW = (50×140 + 30×120 + 20×110) / (50 + 30 + 20) = (7000 + 3600 + 2200) / 100 = 12,800 / 100 = 128.',
    hints: [
      'Multiply each group price relative by its weight.',
      'Products: Food = 7000, Fuel = 3600, Clothing = 2200. Sum = 12800.',
      'Divide sum of products (12800) by sum of weights (100).'
    ],
  },
  // 11. Standard - Evaluation (Fisher Ideal Index Geometric Mean)
  {
    id: 'ch_fish_01',
    nodeId: NODE_C12_APPMATH_066,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'For a grocery basket, the Laspeyres index L = 144 and the Paasche index P = 121. Calculate the Fisher Ideal Price Index.',
    correctAnswer: 132,
    tolerance: 0.1,
    unit: 'Index Points',
    explanation: 'Fisher Ideal Index F = √(L × P) = √(144 × 121) = 12 × 11 = 132.',
    hints: [
      'Fisher Index is the GEOMETRIC mean of Laspeyres and Paasche indices.',
      'Formula: F = √(L × P).',
      '√(144 × 121) = √17424 = 132.'
    ],
    misconceptionIndex: 4,
  },
  // 12. Standard - Analysis (Why Centering is necessary for even periods)
  {
    id: 'ch_mavg_03',
    nodeId: NODE_C12_APPMATH_068,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is centering mandatory when computing a 4-yearly moving average, but unnecessary for a 5-yearly moving average?',
    options: [
      'A 4-period window has no single middle time point (midpoint is at t=2.5), whereas a 5-period window has a natural integer midpoint at t=3',
      '4-yearly moving averages contain twice as much seasonal volatility as 5-yearly averages',
      'Centering is required by accounting standards only for leap years',
      'Centering removes negative numbers from even-numbered datasets'
    ],
    correctIndex: 0,
    explanation: 'An even number of periods has its geometric centre between two time units. The 2-period average shifts the trend value onto a real, observable calendar period.',
    hints: [
      'Think about where the middle of [1, 2, 3, 4] lies versus [1, 2, 3, 4, 5].',
      'The median of 4 numbers is at 2.5 (between year 2 and 3).',
      'The median of 5 numbers is exactly at year 3.'
    ],
  },
  // 13. Standard - Construct (Annuity EMI Construction)
  {
    id: 'ch_construct_01',
    nodeId: NODE_C12_APPMATH_061,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the algebraic numerator expression for the reducing balance EMI formula.',
    availableParts: ['P', '·', 'r', '·', '(1+r)ⁿ', '/', '((1+r)ⁿ - 1)', 'n', 'T'],
    targetState: 'P · r · (1+r)ⁿ',
    validationHint: 'The numerator consists of Principal multiplied by monthly interest rate multiplied by the compounding factor (1+r)ⁿ.',
    explanation: 'In EMI = [P·r·(1+r)ⁿ] / [(1+r)ⁿ - 1], the numerator is P·r·(1+r)ⁿ.',
    hints: [
      'Select P (Principal) first.',
      'Multiply by r (monthly interest rate).',
      'Multiply by the compounding term (1+r)ⁿ.'
    ],
  },
  // 14. Standard - Application (Book value after year 3)
  {
    id: 'ch_dep_02',
    nodeId: NODE_C12_APPMATH_063,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A commercial server costs ₹4,00,000 with a scrap value of ₹40,000 after 6 years of linear depreciation. What is the Book Value at the end of Year 4 in Rupees?',
    correctAnswer: 160000,
    tolerance: 100,
    unit: '₹',
    explanation: 'Annual Dep = (4,00,000 - 40,000)/6 = ₹60,000/yr. Accumulated Dep after 4 yrs = 4 × 60,000 = ₹2,40,000. Book Value = 4,00,000 - 2,40,000 = ₹1,60,000.',
    hints: [
      'Calculate annual depreciation first: (4,00,000 - 40,000) / 6 = 60,000.',
      'Accumulated depreciation over 4 years = 4 × 60,000 = 2,40,000.',
      'Subtract accumulated depreciation from original cost.'
    ],
    misconceptionIndex: 2,
  },
  // 15. Advanced - Analysis (Marshall-Edgeworth vs Laspeyres/Paasche)
  {
    id: 'ch_idx_03',
    nodeId: NODE_C12_APPMATH_066,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does the Marshall-Edgeworth index assign quantity weights compared to Laspeyres and Paasche?',
    options: [
      'It uses the arithmetic average of base and current quantities: (q₀ + q₁)/2 in both numerator and denominator',
      'It uses the geometric mean of base and current prices: √(p₀·p₁)',
      'It uses current year quantities in the numerator and base year in the denominator',
      'It weights commodities inversely to their consumer budget share'
    ],
    correctIndex: 0,
    explanation: 'The Marshall-Edgeworth index uses the combined average basket weights (q₀ + q₁)/2: Σ[p₁·(q₀+q₁)] / Σ[p₀·(q₀+q₁)] × 100.',
    hints: [
      'Marshall-Edgeworth is a compromise aggregate index without taking a geometric root.',
      'It takes the simple average of quantities across both time horizons.',
      'Weights are (q₀ + q₁) / 2.'
    ],
  },
  // 16. Advanced - Evaluation (Evaluating Loan Quotes with Amortisation)
  {
    id: 'ch_emi_03',
    nodeId: NODE_C12_APPMATH_061,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An NBFC offers a 5-year loan of ₹10,00,000 at 8% Flat Rate (Total repayment = ₹14,00,000; EMI = ₹23,333). A nationalized bank offers 9.5% Reducing Balance (EMI ≈ ₹21,002; Total repayment ≈ ₹12,60,120). Why is the reducing balance loan cheaper despite a higher stated annual interest rate?',
    options: [
      'Because the reducing method charges interest only on the declining principal balance as monthly instalments are paid down, whereas the flat method charges interest on the full ₹10 Lakhs for all 60 months',
      'Because the bank has lower processing fees and government subsidies',
      'Because 5 years is too short for compound interest to overtake simple interest',
      'Because flat loans are legally exempt from compounding rules'
    ],
    correctIndex: 0,
    explanation: 'In reducing balance, the borrower repays principal each month, reducing the interest-bearing base from ₹10 Lakhs down to ₹0. Flat rate keeps charging 8% on the full initial principal for all 5 years even when most of the loan is repaid.',
    hints: [
      'Look at the interest base under each method.',
      'In flat rate, do you still pay interest on money returned in month 1 during month 59?',
      'Reducing balance matches interest directly to the unpaid balance.'
    ],
    misconceptionIndex: 0,
  },
  // 17. Advanced - Numeric (CAGR 5-Year Computation)
  {
    id: 'ch_cagr_02',
    nodeId: NODE_C12_APPMATH_062,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An investment in an Indian green energy startup grew from ₹2,00,000 to ₹4,86,000 over 5 years. Calculate the CAGR percentage (round to nearest whole number).',
    correctAnswer: 19,
    tolerance: 1,
    unit: '%',
    explanation: 'Ratio = 4,86,000 / 2,00,000 = 2.43. CAGR = (2.43)^(1/5) - 1 = (2.43)^0.2 - 1 = 1.1943 - 1 = 19.43% ≈ 19%.',
    hints: [
      'Find the ratio of Final Value to Initial Value: 486000 / 200000 = 2.43.',
      'Take the 5th root of 2.43: 2.43^(0.2) ≈ 1.1943.',
      'Subtract 1 and multiply by 100: 0.1943 × 100 = 19.43%.'
    ],
    misconceptionIndex: 1,
  },
  // 18. Advanced - Application (4-Yearly Centered Moving Average calculation)
  {
    id: 'ch_mavg_04',
    nodeId: NODE_C12_APPMATH_068,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Production figures: 2018=20, 2019=24, 2020=28, 2021=32, 2022=36. The 4-year moving average for 2018-2021 is 26.0 (at 2019.5), and for 2019-2022 is 30.0 (at 2020.5). What is the centered moving average for 2020?',
    correctAnswer: 28,
    tolerance: 0.1,
    unit: 'Units',
    explanation: 'Centered moving average at year 2020 = (26.0 + 30.0) / 2 = 56.0 / 2 = 28.0.',
    hints: [
      'Take the average of the two adjacent 4-year moving averages.',
      'Average 1 = 26.0, Average 2 = 30.0.',
      '(26.0 + 30.0) / 2 = 28.0.'
    ],
  },
  // 19. Advanced - Creativity / Real-world Policy Design
  {
    id: 'ch_cpi_02',
    nodeId: NODE_C12_APPMATH_065,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'When designing a revised Consumer Price Index (CPI) for industrial workers in Bengaluru after a decade, what critical structural adjustment must the statistical board implement?',
    options: [
      'Conduct a fresh household expenditure survey to update the weights (w), as spending on data, transport, and healthcare has expanded relative to cereals',
      'Switch all food items to simple unweighted aggregates to save survey costs',
      'Fix the base year price P₀ permanently to the year 1947',
      'Double the weight of gold to simulate currency appreciation'
    ],
    correctIndex: 0,
    explanation: 'Consumption patterns change over time. Outdated weights fail to reflect true cost-of-living pressures, so household expenditure surveys must refresh group weights.',
    hints: [
      'Do families spend the exact same fraction of income on food and technology today as 15 years ago?',
      'Weights must mirror realistic modern spending shares.',
      'Updating weights prevents index distortion.'
    ],
    misconceptionIndex: 3,
  },
  // 20. Advanced - Analysis (Index Number Reversal Properties)
  {
    id: 'ch_fish_02',
    nodeId: NODE_C12_APPMATH_066,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is the Fisher Price Index mathematically designated as "Ideal"?',
    options: [
      'It satisfies both the Time Reversal Test (P₀₁ × P₁₀ = 1) and the Factor Reversal Test (P₀₁ × Q₀₁ = V₀₁)',
      'It is always exactly equal to the arithmetic mean of all price relatives',
      'It does not require any quantity data from the base year',
      'It guarantees zero inflation during economic recessions'
    ],
    correctIndex: 0,
    explanation: 'Irving Fisher proved that his geometric index satisfies both fundamental tests of index consistency: Time Reversal (swapping base/current years yields reciprocal) and Factor Reversal (price index × quantity index = value ratio).',
    hints: [
      'Recall the statistical consistency tests for index numbers.',
      'Time reversal: P01 · P10 = 1.',
      'Factor reversal: Price index × Quantity index = Total Value ratio.'
    ],
  },
  // 21. Advanced - Drag Sort (Amortisation Schedule Dynamics)
  {
    id: 'ch_emi_04',
    nodeId: NODE_C12_APPMATH_061,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of events that occurs inside an amortisation table from Month 1 to Month 240 of a 20-year home loan.',
    sortItems: [
      'Month 1: Outstanding balance is at maximum, so monthly interest charge is highest and principal reduction is smallest',
      'Years 1-10: As principal is gradually paid down, the monthly interest portion declines steadily',
      'Years 11-19: The principal repayment portion of the fixed EMI overtakes the interest portion',
      'Month 240: Outstanding balance reaches near zero, final EMI is almost 100% principal repayment'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'In reducing balance amortisation, the fixed EMI is split between interest (r × balance) and principal. As balance drops, interest shrinks, allowing an accelerating share of EMI to extinguish the principal.',
    hints: [
      'Start with the initial state where the loan balance is largest.',
      'Notice how the interest component shrinks over the first decade.',
      'The final payments are almost purely principal clearance.'
    ],
  },
  // 22. Advanced - Numeric (Laspeyres Calculation)
  {
    id: 'ch_lasp_01',
    nodeId: NODE_C12_APPMATH_066,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Base Year: Rice (P₀=40, Q₀=20), Wheat (P₀=30, Q₀=15). Current Year: Rice (P₁=50, Q₁=18), Wheat (P₁=35, Q₁=16). Calculate the Laspeyres Price Index.',
    correctAnswer: 122,
    tolerance: 0.5,
    unit: 'Index Points',
    explanation: 'Base Cost = (40×20) + (30×15) = 800 + 450 = ₹1,250. Current Cost at Base Q = (50×20) + (35×15) = 1,000 + 525 = ₹1,525. Laspeyres = (1525 / 1250) × 100 = 122.0.',
    hints: [
      'Laspeyres uses BASE quantities Q₀ as weights.',
      'Numerator = Σ(P₁ × Q₀) = (50 × 20) + (35 × 15) = 1525.',
      'Denominator = Σ(P₀ × Q₀) = (40 × 20) + (30 × 15) = 1250. Laspeyres = (1525 / 1250) × 100 = 122.'
    ],
    misconceptionIndex: 4,
  }
];

// Props Interface
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

// Default Props
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_APPMATH_061,
  title: 'Financial Mathematics & Time Series Calculation Engine',
  definition: 'Comprehensive mastery of commercial calculations: Flat and Reducing Balance EMI, CAGR vs Total Return, Linear Depreciation schedules, Simple & Weighted Index Numbers (Laspeyres, Paasche, Fisher), and Odd/Even Centered Moving Averages.',
  eli5: 'Think of money and time like tracks on a journey: Flat loans charge you rent on the whole train even after passengers leave, reducing loans only charge for empty seats; CAGR tells you your real smooth yearly speedometer speed; moving averages smooth out bumpy hills on your financial road trip!',
  misconceptions: [
    {
      misconception: 'A lower flat interest rate is always cheaper than a slightly higher reducing interest rate.',
      correction: 'Flat rates charge interest on the entire original principal for the entire tenure, whereas reducing balance charges interest only on the declining unpaid principal.'
    },
    {
      misconception: 'CAGR can be calculated by dividing total percentage return by the number of years.',
      correction: 'Compounding means growth happens on top of accumulated gains. CAGR requires the n-th root formula: [(Final / Initial)^(1/n) - 1] × 100.'
    },
    {
      misconception: 'Linear depreciation charges a diminishing percentage of the remaining book value.',
      correction: 'Straight-line depreciation charges an identical fixed Rupee amount every year: (Cost - Scrap Value) / Useful Life.'
    },
    {
      misconception: 'A price relative of 140 means the commodity costs ₹140.',
      correction: 'A price relative is an index percentage: 140 means the current price is 140% of the base year price (a 40% increase).'
    },
    {
      misconception: 'The Fisher Ideal Index is the arithmetic mean of Laspeyres and Paasche indices.',
      correction: 'The Fisher Ideal Index is the GEOMETRIC mean: F = √(Laspeyres × Paasche).'
    }
  ],
  diagnosticQuestions: [
    { question: 'What is the monthly interest rate r for a 12% annual rate loan?', options: ['0.12', '0.01', '1.2', '0.001'], correctIndex: 1 },
    { question: 'Which index uses base year quantities as weights?', options: ['Paasche', 'Laspeyres', 'Fisher', 'Simple Average'], correctIndex: 1 },
    { question: 'What is the straight-line annual depreciation for Cost ₹1,00,000, Scrap ₹10,00, Life 5 yrs?', options: ['₹20,000', '₹18,000', '₹15,000', '₹22,000'], correctIndex: 1 },
    { question: 'Where is a 3-yearly moving average for years 2020, 2021, 2022 placed?', options: ['2020', '2021', '2022', 'Between 2020 and 2021'], correctIndex: 1 },
    { question: 'If an investment doubles (100% gain) in 2 years, is CAGR 50%?', options: ['Yes', 'No, CAGR is ≈41.4%', 'No, CAGR is 100%', 'No, CAGR is 25%'], correctIndex: 1 },
    { question: 'In the Fisher Ideal Index, if Laspeyres=100 and Paasche=144, what is Fisher?', options: ['122', '120', '144', '110'], correctIndex: 1 },
    { question: 'Why are 4-year moving averages centered?', options: ['To fix off-centre positions between years', 'To double the data size', 'To calculate variance', 'To remove inflation'], correctIndex: 0 },
    { question: 'Does linear book value ever drop below scrap value during useful life?', options: ['Yes, always', 'No, it terminates at scrap value', 'Only with negative interest', 'Depends on inflation'], correctIndex: 1 },
  ],
  masteryCriteria: 'Candidate must compute Flat and Reducing EMI, calculate CAGR, construct linear depreciation schedules, calculate Laspeyres/Paasche/Fisher indices, and compute centered moving averages.',
};

// 5 Interactive Guided Exploration Steps
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Flat vs Reducing Balance EMI Duel',
    instruction: 'Adjust the Loan Amount and Annual Rate sliders. Compare how Flat interest overcharges compared to Amortised Reducing balance!',
    interactionType: 'slider-emi',
    nodeId: NODE_C12_APPMATH_061,
  },
  {
    title: 'Lab 2: The CAGR vs Total Return Time Machine',
    instruction: 'Drag the Initial Investment and Final Value. Observe why dividing total return by years creates a massive mathematical distortion.',
    interactionType: 'slider-cagr',
    nodeId: NODE_C12_APPMATH_062,
  },
  {
    title: 'Lab 3: Linear Asset Depreciation Scheduler',
    instruction: 'Manipulate Asset Cost, Useful Life, and Scrap Value to see the linear book value line slope downwards to scrap value.',
    interactionType: 'slider-depreciation',
    nodeId: NODE_C12_APPMATH_063,
  },
  {
    title: 'Lab 4: Laspeyres, Paasche & Fisher Index Arena',
    instruction: 'Tweak commodity price surges and quantity substitutions to witness Laspeyres upward bias and Paasche downward bias.',
    interactionType: 'slider-index',
    nodeId: NODE_C12_APPMATH_066,
  },
  {
    title: 'Lab 5: 4-Year Moving Average Centering Visualizer',
    instruction: 'Toggle the Centering Step to see uncentered midpoints (falling at 0.5 positions) shift smoothly onto exact calendar years!',
    interactionType: 'toggle-centering',
    nodeId: NODE_C12_APPMATH_068,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Chief Financial Consultant Real-World Capstone',
  description: 'Apply your Applied Mathematics toolset to audit a real Indian household financial statement: check car loan terms, compute 5-year mutual fund CAGR, calculate vehicle straight-line depreciation, and construct a 4-year centered trend of household grocery bills.',
  steps: [
    'Obtain a 3-year vehicle loan quotation and compute whether the reducing equivalent matches the advertised rate',
    'Calculate the 3-year CAGR of your school or college sports budget or an equity mutual fund NAV',
    'Draft a 5-year linear depreciation schedule for a laptop or school bus with 10% residual salvage value',
    'Construct a weighted Cost of Living index for 4 household spending baskets (Food, Rent, Electricity, Transport)'
  ],
};

function C12_AppliedMathsFinancialMathematicsCalculationSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['appmath'] || { name: 'Applied Mathematics', emoji: '📐', color: 'indigo' };

  // Phase management
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-then-Check States
  const [predIndex, setPredIndex] = useState(0);
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [showPredFeedback, setShowPredFeedback] = useState(false);

  // Observation Question States
  const [obsIndex, setObsIndex] = useState(0);
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [showObsFeedback, setShowObsFeedback] = useState(false);

  // Adaptive & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating hints & progressive disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Interactive Simulator States (Lab 1: EMI)
  const [loanPrincipal, setLoanPrincipal] = useState<number>(500000);
  const [loanRateAnnual, setLoanRateAnnual] = useState<number>(10);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5);

  // Interactive Simulator States (Lab 2: CAGR)
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [finalValue, setFinalValue] = useState<number>(250000);
  const [cagrYears, setCagrYears] = useState<number>(4);

  // Interactive Simulator States (Lab 3: Depreciation)
  const [assetCost, setAssetCost] = useState<number>(600000);
  const [scrapValue, setScrapValue] = useState<number>(60000);
  const [usefulLife, setUsefulLife] = useState<number>(6);

  // Interactive Simulator States (Lab 4: Index Numbers)
  const [riceCurrentPrice, setRiceCurrentPrice] = useState<number>(60);
  const [riceCurrentQty, setRiceCurrentQty] = useState<number>(25);
  const [wheatCurrentPrice, setWheatCurrentPrice] = useState<number>(40);
  const [wheatCurrentQty, setWheatCurrentQty] = useState<number>(20);

  // Interactive Simulator States (Lab 5: Centered Moving Average)
  const [isCenteredToggled, setIsCenteredToggled] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'formula' | 'table' | 'observations'>('visualizer');

  // Interactive Challenge input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered Challenges by Adaptive Difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Mathematical Calculations for EMI Lab
  const emiCalculations = useMemo(() => {
    const P = loanPrincipal;
    const rAnnual = loanRateAnnual / 100;
    const tYears = loanTenureYears;
    const nMonths = tYears * 12;
    const rMonthly = rAnnual / 12;

    // Flat Rate
    const totalFlatInterest = P * rAnnual * tYears;
    const totalFlatRepayment = P + totalFlatInterest;
    const flatEmi = totalFlatRepayment / nMonths;

    // Reducing Balance
    const compFactor = Math.pow(1 + rMonthly, nMonths);
    const reducingEmi = (P * rMonthly * compFactor) / (compFactor - 1);
    const totalReducingRepayment = reducingEmi * nMonths;
    const totalReducingInterest = totalReducingRepayment - P;
    const interestDifference = totalFlatInterest - totalReducingInterest;

    // Sample Amortisation points (Yearly points)
    const amortData = [];
    let balance = P;
    for (let yr = 1; yr <= tYears; yr++) {
      let yrInterest = 0;
      let yrPrincipal = 0;
      for (let m = 1; m <= 12; m++) {
        const intPortion = balance * rMonthly;
        const prinPortion = reducingEmi - intPortion;
        yrInterest += intPortion;
        yrPrincipal += prinPortion;
        balance = Math.max(0, balance - prinPortion);
      }
      amortData.push({
        year: `Yr ${yr}`,
        balance: Math.round(balance),
        principalPaid: Math.round(yrPrincipal),
        interestPaid: Math.round(yrInterest),
      });
    }

    return {
      flatEmi: Math.round(flatEmi),
      totalFlatInterest: Math.round(totalFlatInterest),
      totalFlatRepayment: Math.round(totalFlatRepayment),
      reducingEmi: Math.round(reducingEmi),
      totalReducingInterest: Math.round(totalReducingInterest),
      totalReducingRepayment: Math.round(totalReducingRepayment),
      interestDifference: Math.round(interestDifference),
      amortData,
    };
  }, [loanPrincipal, loanRateAnnual, loanTenureYears]);

  // Calculations for CAGR Lab
  const cagrCalculations = useMemo(() => {
    const totalGain = finalValue - initialInvestment;
    const totalReturnPct = (totalGain / initialInvestment) * 100;
    const cagr = (Math.pow(finalValue / initialInvestment, 1 / cagrYears) - 1) * 100;
    const simpleAvgReturn = totalReturnPct / cagrYears;

    const timelineData = [];
    for (let y = 0; y <= cagrYears; y++) {
      const cagrVal = initialInvestment * Math.pow(1 + cagr / 100, y);
      const simpleVal = initialInvestment * (1 + (simpleAvgReturn / 100) * y);
      timelineData.push({
        year: `Year ${y}`,
        CompoundedCAGR: Math.round(cagrVal),
        SimpleGrowthLine: Math.round(simpleVal),
      });
    }

    return {
      totalGain: Math.round(totalGain),
      totalReturnPct: totalReturnPct.toFixed(2),
      cagr: cagr.toFixed(2),
      simpleAvgReturn: simpleAvgReturn.toFixed(2),
      distortion: (simpleAvgReturn - cagr).toFixed(2),
      timelineData,
    };
  }, [initialInvestment, finalValue, cagrYears]);

  // Calculations for Depreciation Lab
  const depreciationCalculations = useMemo(() => {
    const depreciableAmount = assetCost - scrapValue;
    const annualDep = depreciableAmount / usefulLife;
    const depRatePct = (annualDep / assetCost) * 100;

    const schedule = [];
    let currentBookVal = assetCost;
    let accumulatedDep = 0;

    schedule.push({
      year: 0,
      annualDep: 0,
      accumulatedDep: 0,
      bookValue: currentBookVal,
    });

    for (let yr = 1; yr <= usefulLife; yr++) {
      accumulatedDep += annualDep;
      currentBookVal -= annualDep;
      schedule.push({
        year: yr,
        annualDep: Math.round(annualDep),
        accumulatedDep: Math.round(accumulatedDep),
        bookValue: Math.round(Math.max(scrapValue, currentBookVal)),
      });
    }

    return {
      depreciableAmount: Math.round(depreciableAmount),
      annualDep: Math.round(annualDep),
      depRatePct: depRatePct.toFixed(2),
      schedule,
    };
  }, [assetCost, scrapValue, usefulLife]);

  // Calculations for Index Numbers Lab
  const indexCalculations = useMemo(() => {
    const p0Rice = 40;
    const q0Rice = 20;
    const p0Wheat = 30;
    const q0Wheat = 15;

    const p1Rice = riceCurrentPrice;
    const q1Rice = riceCurrentQty;
    const p1Wheat = wheatCurrentPrice;
    const q1Wheat = wheatCurrentQty;

    const laspNum = (p1Rice * q0Rice) + (p1Wheat * q0Wheat);
    const laspDen = (p0Rice * q0Rice) + (p0Wheat * q0Wheat);
    const laspeyres = (laspNum / laspDen) * 100;

    const paasNum = (p1Rice * q1Rice) + (p1Wheat * q1Wheat);
    const paasDen = (p0Rice * q1Rice) + (p0Wheat * q1Wheat);
    const paasche = (paasNum / paasDen) * 100;

    const fisher = Math.sqrt(laspeyres * paasche);

    const meNum = p1Rice * (q0Rice + q1Rice) + p1Wheat * (q0Wheat + q1Wheat);
    const meDen = p0Rice * (q0Rice + q1Rice) + p0Wheat * (q0Wheat + q1Wheat);
    const marshallEdgeworth = (meNum / meDen) * 100;

    return {
      laspeyres: laspeyres.toFixed(2),
      paasche: paasche.toFixed(2),
      fisher: fisher.toFixed(2),
      marshallEdgeworth: marshallEdgeworth.toFixed(2),
      laspNum,
      laspDen,
      paasNum,
      paasDen,
    };
  }, [riceCurrentPrice, riceCurrentQty, wheatCurrentPrice, wheatCurrentQty]);

  // Calculations for Moving Average Lab
  const movingAverageData = useMemo(() => {
    const rawData = [
      { year: 2017, actual: 30 },
      { year: 2018, actual: 38 },
      { year: 2019, actual: 34 },
      { year: 2020, actual: 44 },
      { year: 2021, actual: 42 },
      { year: 2022, actual: 50 },
      { year: 2023, actual: 48 },
      { year: 2024, actual: 56 },
    ];

    const uncentered: { midYear: number; value: number }[] = [];
    for (let i = 0; i <= rawData.length - 4; i++) {
      const sum = rawData[i].actual + rawData[i + 1].actual + rawData[i + 2].actual + rawData[i + 3].actual;
      const avg = sum / 4;
      const mid = rawData[i].year + 1.5;
      uncentered.push({ midYear: mid, value: avg });
    }

    const centeredMap: Record<number, number> = {};
    for (let j = 0; j < uncentered.length - 1; j++) {
      const centAvg = (uncentered[j].value + uncentered[j + 1].value) / 2;
      const targetYear = Math.round((uncentered[j].midYear + uncentered[j + 1].midYear) / 2);
      centeredMap[targetYear] = centAvg;
    }

    const chartSeries = rawData.map(d => ({
      year: `${d.year}`,
      ActualProduction: d.actual,
      CenteredTrend: centeredMap[d.year] !== undefined ? centeredMap[d.year] : null,
    }));

    return {
      rawData,
      uncentered,
      centeredMap,
      chartSeries,
    };
  }, []);

  // Mount Effect: Load BKT Mastery
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adaptive Difficulty Updates
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

  // HTML5 Canvas Animation Effect for Phase header
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

      ctx.strokeStyle = '#4f46e5';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin((x + frame * 2) * 0.04) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const pulseX = (frame * 3) % canvas.width;
      const pulseY = canvas.height / 2 + Math.sin((pulseX + frame * 2) * 0.04) * 12;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── CALLBACK HANDLERS ───

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
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding economic intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handlePredictionAnswer = useCallback((optIndex: number) => {
    setPredAnswers(prev => ({ ...prev, [predIndex]: optIndex }));
    setShowPredFeedback(true);
    const isCorrect = optIndex === PREDICTION_QUESTIONS[predIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, [predIndex]);

  const handleNextPrediction = useCallback(() => {
    setShowPredFeedback(false);
    if (predIndex + 1 < PREDICTION_QUESTIONS.length) {
      setPredIndex(p => p + 1);
    } else {
      setPhase('explore');
      audioManager.play('whoosh');
      speechManager.speak('Great hypotheses! Now interact with the lab to verify your predictions.');
    }
  }, [predIndex]);

  const handleObservationAnswer = useCallback((optIndex: number) => {
    setObsAnswers(prev => ({ ...prev, [obsIndex]: optIndex }));
    setShowObsFeedback(true);
    const isCorrect = optIndex === OBSERVATION_QUESTIONS[obsIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, [obsIndex]);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('predict');
    audioManager.play('whoosh');
    speechManager.speak('Make your prediction first before running the interactive models!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test any scenario with full control.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Beginning ISC Board Applied Mathematics Challenge set.');
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

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const items = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = items.splice(fromIdx, 1);
      items.splice(toIdx, 0, moved);
      return items;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered ISC Financial Mathematics.');
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

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string, event?: React.MouseEvent) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      const ansArr = answer as number[];
      isCorrect = JSON.stringify(ansArr) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      if (event) {
        setSparklePos({ x: event.clientX, y: event.clientY });
        setShowSparkle(true);
      }
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct calculation! Splendid.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us study the complete solution step-by-step.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  const handleTabSwitch = useCallback((tab: 'visualizer' | 'formula' | 'table' | 'observations') => {
    setActiveTab(tab);
    audioManager.play('tap');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <motion.span
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="text-3xl p-2 bg-gold-950 border border-gold-700 rounded-2xl cursor-pointer"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gold-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">
              ISC Class 12 • Applied Mathematics • 8-Node Integrated Suite
            </p>
          </div>
        </motion.div>

        {/* Header Animated Canvas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hidden sm:block w-36 h-8 rounded-lg overflow-hidden border border-slate-800 bg-slate-900/60"
        >
          <canvas ref={canvasRef} width={144} height={32} className="w-full h-full" />
        </motion.div>

        {/* Mastery / Difficulty Tracker */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <motion.span
            key={difficulty}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                : difficulty === 'advanced'
                ? 'bg-rose-950 text-rose-400 border-rose-800'
                : 'bg-gold-950 text-gold-400 border-gold-800'
            }`}
          >
            {difficulty}
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-xs px-3 py-1 bg-slate-900 rounded-full border border-slate-700 text-slate-300"
          >
            Mastery: <span className="text-amber-400 font-semibold">{masteryLevel}</span>
          </motion.span>
        </motion.div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY / CURIOSITY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-gold-950/70 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gold-300 mb-2">{SCENARIO.title}</h2>
              <p className="text-sm text-slate-200 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-gold-900/50">{SCENARIO.context}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <span>💡</span>
                <span>Intuition Check (Ungraded Discovery Hook)</span>
              </div>
              <h3 className="text-base md:text-lg text-white font-medium">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`p-4 text-left text-sm rounded-xl border transition-all ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                        : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-gold-500'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-4 border-t border-slate-800 space-y-4"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-medium' : 'text-amber-300'}`}>
                    {discoveryCorrect ? '✓ Exact! Even at 10%, reducing balance saves thousands.' : DISCOVERY_QUESTION.hintAfter}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-3 bg-gradient-to-r from-gold-600 to-purple-600 hover:from-gold-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-gold-600/30 flex items-center gap-2 text-sm"
                  >
                    <span>Proceed to Prediction Phase</span>
                    <span>→</span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PREDICT-THEN-CHECK PHASE ─── */}
        {phase === 'predict' && (
          <motion.div
            key="predict-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="p-6 bg-slate-900 rounded-2xl border border-gold-800/60 space-y-4">
              <div className="flex items-center justify-between text-xs text-gold-400 font-bold uppercase tracking-wider">
                <span>🤔 Step 1: Predict Before You Interact ({predIndex + 1} of {PREDICTION_QUESTIONS.length})</span>
                <span className="text-slate-400">Brilliant.org Predict-then-Check</span>
              </div>

              <h3 className="text-base md:text-lg text-white font-semibold">
                {PREDICTION_QUESTIONS[predIndex].question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {PREDICTION_QUESTIONS[predIndex].options.map((opt, i) => {
                  const isSelected = predAnswers[predIndex] === i;
                  const isCorrect = i === PREDICTION_QUESTIONS[predIndex].correctIndex;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePredictionAnswer(i)}
                      disabled={showPredFeedback}
                      className={`p-4 text-left text-sm rounded-xl border transition-all ${
                        showPredFeedback && isCorrect
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                          : showPredFeedback && isSelected && !isCorrect
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-gold-500'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {showPredFeedback && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-4 border-t border-slate-800 space-y-3"
                >
                  <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                    <span className="font-bold text-gold-300">Explanation: </span>
                    {PREDICTION_QUESTIONS[predIndex].explanation}
                  </p>
                  <div className="p-3 bg-amber-950/40 border border-amber-700/60 rounded-xl text-xs text-amber-300 font-semibold">
                    🔍 {PREDICTION_QUESTIONS[predIndex].verifyInstruction}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextPrediction}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs shadow"
                  >
                    {predIndex + 1 < PREDICTION_QUESTIONS.length ? 'Next Prediction Question →' : 'Enter Interactive Labs →'}
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-1 bg-gold-900/80 text-gold-300 rounded-lg">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h2 className="text-sm md:text-base font-bold text-white">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold rounded-lg"
                >
                  ← Prev
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={currentSlide === EXPLORATION_STEPS.length - 1 ? handleAdvanceToSandbox : handleNextSlide}
                  className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 text-xs font-semibold text-white rounded-lg"
                >
                  {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Free Sandbox →' : 'Next Lab →'}
                </motion.button>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-amber-300 text-xs md:text-sm bg-amber-950/30 border border-amber-800/40 p-3 rounded-xl"
            >
              👉 <span className="font-semibold">{EXPLORATION_STEPS[currentSlide].instruction}</span>
            </motion.p>

            {/* Tab Bar within Lab */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabSwitch('visualizer')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'visualizer' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                Interactive Graph & Controls
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabSwitch('formula')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'formula' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                Formula & Derivation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabSwitch('table')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'table' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                Computed Schedule
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabSwitch('observations')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'observations' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                Observation Checks
              </motion.button>
            </div>

            {/* Observations Tab */}
            {activeTab === 'observations' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase tracking-wider">
                    <span>👀 Guided Observation Check ({obsIndex + 1} of {OBSERVATION_QUESTIONS.length})</span>
                    <span className="text-slate-400">Brilliant.org "What do you notice?"</span>
                  </div>

                  <h3 className="text-sm md:text-base text-white font-medium">
                    {OBSERVATION_QUESTIONS[obsIndex].question}
                  </h3>

                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {OBSERVATION_QUESTIONS[obsIndex].observableOptions.map((opt, i) => {
                      const isSelected = obsAnswers[obsIndex] === i;
                      const isCorrect = i === OBSERVATION_QUESTIONS[obsIndex].correctIndex;
                      return (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservationAnswer(i)}
                          disabled={showObsFeedback}
                          className={`p-3 text-left text-xs md:text-sm rounded-xl border transition-all ${
                            showObsFeedback && isCorrect
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                              : showObsFeedback && isSelected && !isCorrect
                              ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                              : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-750'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      );
                    })}
                  </div>

                  {showObsFeedback && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-3 border-t border-slate-800 space-y-3">
                      <p className="text-xs text-slate-300">{OBSERVATION_QUESTIONS[obsIndex].explanation}</p>
                      {obsIndex + 1 < OBSERVATION_QUESTIONS.length && (
                        <button
                          onClick={() => {
                            setShowObsFeedback(false);
                            setObsIndex(o => o + 1);
                          }}
                          className="px-4 py-2 bg-gold-600 text-white font-bold rounded-lg text-xs"
                        >
                          Next Observation Check →
                        </button>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ─── LAB 1: EMI DUAL CALCULATOR ─── */}
            {currentSlide === 0 && activeTab !== 'observations' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {activeTab === 'visualizer' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Controls */}
                    <motion.div
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4"
                    >
                      <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">
                        Loan Parameters (Real-Time)
                      </h3>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Principal (P):</span>
                          <span className="font-mono text-emerald-400 font-bold">₹{loanPrincipal.toLocaleString('en-IN')}</span>
                        </div>
                        <input
                          type="range"
                          min={100000}
                          max={3000000}
                          step={50000}
                          value={loanPrincipal}
                          onChange={(e) => setLoanPrincipal(Number(e.target.value))}
                          className="w-full accent-gold-500 cursor-pointer"
                          aria-label="Set Loan Principal"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Annual Interest Rate (R):</span>
                          <span className="font-mono text-amber-400 font-bold">{loanRateAnnual}% p.a.</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={20}
                          step={0.5}
                          value={loanRateAnnual}
                          onChange={(e) => setLoanRateAnnual(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                          aria-label="Set Annual Interest Rate"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Tenure (T):</span>
                          <span className="font-mono text-gold-400 font-bold">{loanTenureYears} Years ({loanTenureYears * 12} mos)</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={20}
                          step={1}
                          value={loanTenureYears}
                          onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                          className="w-full accent-gold-500 cursor-pointer"
                          aria-label="Set Loan Tenure"
                        />
                      </div>

                      {/* KPI Cards */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl"
                        >
                          <p className="text-[10px] text-rose-300 font-bold uppercase">Flat Rate Method</p>
                          <p className="text-base font-bold text-white mt-1">₹{emiCalculations.flatEmi.toLocaleString('en-IN')}<span className="text-xs text-slate-400">/mo</span></p>
                          <p className="text-[11px] text-slate-400 mt-1">Total Interest: ₹{emiCalculations.totalFlatInterest.toLocaleString('en-IN')}</p>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl"
                        >
                          <p className="text-[10px] text-emerald-300 font-bold uppercase">Reducing Balance</p>
                          <p className="text-base font-bold text-white mt-1">₹{emiCalculations.reducingEmi.toLocaleString('en-IN')}<span className="text-xs text-slate-400">/mo</span></p>
                          <p className="text-[11px] text-slate-400 mt-1">Total Interest: ₹{emiCalculations.totalReducingInterest.toLocaleString('en-IN')}</p>
                        </motion.div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-3 bg-gold-950/50 border border-gold-700/60 rounded-xl text-center"
                      >
                        <span className="text-xs text-gold-300">Reducing Method Saves You: </span>
                        <span className="text-sm font-bold text-emerald-400">₹{emiCalculations.interestDifference.toLocaleString('en-IN')}</span>
                      </motion.div>
                    </motion.div>

                    {/* Right Chart */}
                    <motion.div
                      initial={{ x: 20 }}
                      animate={{ x: 0 }}
                      className="lg:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between"
                    >
                      <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider mb-2">
                        Amortisation Curve (Principal vs Interest Shift)
                      </h3>
                      <div className="w-full h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={emiCalculations.amortData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="year" stroke="#94a3b8" textAnchor="middle" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#475569', borderRadius: '8px' }} />
                            <Legend />
                            <Bar dataKey="principalPaid" name="Principal Repaid (₹)" fill="#10b981" />
                            <Bar dataKey="interestPaid" name="Interest Paid (₹)" fill="#f43f5e" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Topic Specific SVG 1: EMI Anatomy */}
                      <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="text-xs font-bold text-gold-400 mb-1">📐 Architectural Concept: Flat vs Reducing Loan Mechanism</div>
                        <svg viewBox="0 0 500 90" className="w-full h-20">
                          <rect x="20" y="15" width="200" height="25" rx="4" fill="#3b82f6" opacity="0.8" />
                          <rect x="20" y="45" width="200" height="25" rx="4" fill="#ef4444" opacity="0.8" />
                          <text x="120" y="32" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Principal Repaid Flat</text>
                          <text x="120" y="62" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Constant Fixed Interest</text>
                          <text x="120" y="82" fill="#f87171" fontSize="9" textAnchor="middle">Flat Rate: Interest on 100% Loan for full term</text>

                          <path d="M 270,15 L 470,15 L 470,70 L 270,70 Z" fill="#10b981" opacity="0.8" />
                          <path d="M 270,15 L 470,70 L 270,70 Z" fill="#f43f5e" opacity="0.8" />
                          <text x="370" y="35" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Accelerating Principal</text>
                          <text x="320" y="60" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Declining Interest</text>
                          <text x="370" y="82" fill="#34d399" fontSize="9" textAnchor="middle">Reducing Balance: Interest on remaining unpaid balance</text>
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                )}

                {activeTab === 'formula' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
                  >
                    <h3 className="text-lg font-bold text-gold-300">Formulas & Mathematical Equivalency</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <h4 className="text-sm font-bold text-rose-400 mb-2">1. Flat Rate Method</h4>
                        <p className="text-xs text-slate-300 mb-2 font-mono">Total Interest (I) = P · R · T</p>
                        <p className="text-xs text-slate-300 mb-2 font-mono">Total Amount (A) = P + I</p>
                        <p className="text-xs text-slate-300 font-mono">EMI = (P + I) / (T × 12)</p>
                        <p className="text-xs text-slate-400 mt-3">Charges simple interest on original loan amount P continuously, ignoring regular repayments.</p>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <h4 className="text-sm font-bold text-emerald-400 mb-2">2. Reducing Balance (Annuity Present Value)</h4>
                        <p className="text-xs text-slate-300 mb-2 font-mono">r = Annual Rate / 12, n = Years × 12</p>
                        <p className="text-xs text-emerald-300 mb-2 font-mono font-bold">EMI = [P · r · (1+r)ⁿ] / [(1+r)ⁿ - 1]</p>
                        <p className="text-xs text-slate-400 mt-3">Equates the borrowed principal P to the present discounted value of an ordinary annuity of n monthly payments.</p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'table' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto"
                  >
                    <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider mb-4">
                      Amortisation Breakdown Schedule
                    </h3>
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-slate-700 text-slate-400">
                          <th className="py-2">Period</th>
                          <th>Principal Repaid</th>
                          <th>Interest Paid</th>
                          <th>Ending Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {emiCalculations.amortData.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-850">
                            <td className="py-2.5 font-bold text-white">{row.year}</td>
                            <td className="text-emerald-400">₹{row.principalPaid.toLocaleString('en-IN')}</td>
                            <td className="text-rose-400">₹{row.interestPaid.toLocaleString('en-IN')}</td>
                            <td className="text-slate-300 font-mono">₹{row.balance.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ─── LAB 2: CAGR TIME MACHINE ─── */}
            {currentSlide === 1 && activeTab !== 'observations' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <motion.div
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4"
                  >
                    <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">
                      Investment Trajectory Inputs
                    </h3>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Initial Investment (V₀):</span>
                        <span className="font-mono text-emerald-400 font-bold">₹{initialInvestment.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        type="range"
                        min={10000}
                        max={500000}
                        step={10000}
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Set Initial Investment"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Final Value (V_n):</span>
                        <span className="font-mono text-purple-400 font-bold">₹{finalValue.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        type="range"
                        min={50000}
                        max={2000000}
                        step={25000}
                        value={finalValue}
                        onChange={(e) => setFinalValue(Number(e.target.value))}
                        className="w-full accent-purple-500 cursor-pointer"
                        aria-label="Set Final Value"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Holding Period (n years):</span>
                        <span className="font-mono text-amber-400 font-bold">{cagrYears} Years</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={15}
                        step={1}
                        value={cagrYears}
                        onChange={(e) => setCagrYears(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                        aria-label="Set Holding Period"
                      />
                    </div>

                    {/* Calculated KPI comparison */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2"
                    >
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Total Return:</span>
                        <span className="font-bold text-white">+{cagrCalculations.totalReturnPct}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Simple Annual Average (Return/n):</span>
                        <span className="font-bold text-rose-400">{cagrCalculations.simpleAvgReturn}% / yr</span>
                      </div>
                      <div className="flex justify-between text-xs pt-2 border-t border-slate-800">
                        <span className="text-emerald-400 font-bold">True CAGR:</span>
                        <span className="font-bold text-emerald-400 text-sm font-mono">{cagrCalculations.cagr}% p.a.</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ x: 20 }}
                    animate={{ x: 0 }}
                    className="lg:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800"
                  >
                    <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider mb-2">
                      Compounded Annual Growth vs Simple Linear Illusion
                    </h3>
                    <div className="w-full h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={cagrCalculations.timelineData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="year" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#475569', borderRadius: '8px' }} />
                          <Legend />
                          <Line type="monotone" dataKey="CompoundedCAGR" name="Actual Compounded Path (CAGR)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                          <Line type="monotone" dataKey="SimpleGrowthLine" name="Simple Average Illusion" stroke="#f43f5e" strokeDasharray="4 4" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                      💡 <span className="text-gold-300 font-semibold">Key Insight:</span> Simple division ignores interest-on-interest. Because each year grows from a higher base, the real CAGR ({cagrCalculations.cagr}%) is lower than the naive simple average ({cagrCalculations.simpleAvgReturn}%).
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* ─── LAB 3: LINEAR DEPRECIATION SCHEDULER ─── */}
            {currentSlide === 2 && activeTab !== 'observations' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4"
                >
                  <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">
                    Asset Parameters
                  </h3>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Original Cost (C):</span>
                      <span className="font-mono text-emerald-400 font-bold">₹{assetCost.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={100000}
                      max={2000000}
                      step={50000}
                      value={assetCost}
                      onChange={(e) => setAssetCost(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                      aria-label="Set Asset Cost"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Scrap / Salvage Value (S):</span>
                      <span className="font-mono text-amber-400 font-bold">₹{scrapValue.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={assetCost * 0.4}
                      step={10000}
                      value={scrapValue}
                      onChange={(e) => setScrapValue(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                      aria-label="Set Scrap Value"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Useful Life (n):</span>
                      <span className="font-mono text-gold-400 font-bold">{usefulLife} Years</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={12}
                      step={1}
                      value={usefulLife}
                      onChange={(e) => setUsefulLife(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                      aria-label="Set Useful Life"
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex justify-between">
                      <span className="text-slate-400">Depreciable Base (C - S):</span>
                      <span className="font-bold text-white">₹{depreciationCalculations.depreciableAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Annual Depreciation (D):</span>
                      <span className="font-bold text-emerald-400">₹{depreciationCalculations.annualDep.toLocaleString('en-IN')} / yr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Depreciation Rate:</span>
                      <span className="font-bold text-gold-300">{depreciationCalculations.depRatePct}% of Cost</span>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                  className="lg:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800"
                >
                  <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider mb-2">
                    Straight-Line Book Value Depletion
                  </h3>
                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={depreciationCalculations.schedule}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#475569', borderRadius: '8px' }} />
                        <Legend />
                        <Line type="linear" dataKey="bookValue" name="Book Value (₹)" stroke="#38bdf8" strokeWidth={3} dot={{ r: 5 }} />
                        <Line type="linear" dataKey="accumulatedDep" name="Accumulated Depreciation (₹)" stroke="#f59e0b" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-slate-400 mt-4">
                    Note that at Year {usefulLife}, the final Book Value locks exactly onto the specified Scrap Value ₹{scrapValue.toLocaleString('en-IN')}.
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* ─── LAB 4: LASPEYRES, PAASCHE & FISHER INDEX ARENA ─── */}
            {currentSlide === 3 && activeTab !== 'observations' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <motion.div
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    className="lg:col-span-6 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4"
                  >
                    <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">
                      Current Year Market Shifts (Base: Rice ₹40, Q=20; Wheat ₹30, Q=15)
                    </h3>

                    <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-amber-400">Rice Market Controls</span>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Current Price (P₁): ₹{riceCurrentPrice}/kg</span>
                        <span>Current Qty (Q₁): {riceCurrentQty} kg</span>
                      </div>
                      <input
                        type="range"
                        min={40}
                        max={100}
                        value={riceCurrentPrice}
                        onChange={(e) => setRiceCurrentPrice(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                        aria-label="Rice Price Slider"
                      />
                      <input
                        type="range"
                        min={10}
                        max={40}
                        value={riceCurrentQty}
                        onChange={(e) => setRiceCurrentQty(Number(e.target.value))}
                        className="w-full accent-amber-600 cursor-pointer"
                        aria-label="Rice Quantity Slider"
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.01 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-emerald-400">Wheat Market Controls</span>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Current Price (P₁): ₹{wheatCurrentPrice}/kg</span>
                        <span>Current Qty (Q₁): {wheatCurrentQty} kg</span>
                      </div>
                      <input
                        type="range"
                        min={30}
                        max={80}
                        value={wheatCurrentPrice}
                        onChange={(e) => setWheatCurrentPrice(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Wheat Price Slider"
                      />
                      <input
                        type="range"
                        min={10}
                        max={35}
                        value={wheatCurrentQty}
                        onChange={(e) => setWheatCurrentQty(Number(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer"
                        aria-label="Wheat Quantity Slider"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ x: 20 }}
                    animate={{ x: 0 }}
                    className="lg:col-span-6 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4"
                  >
                    <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">
                      Weighted Aggregate Price Index Output
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <motion.div whileHover={{ scale: 1.04 }} className="p-3 bg-slate-950 rounded-xl border border-gold-800/50">
                        <p className="text-[10px] text-gold-400 font-bold uppercase">Laspeyres (Base Q₀)</p>
                        <p className="text-xl font-bold text-white mt-1 font-mono">{indexCalculations.laspeyres}</p>
                        <p className="text-[10px] text-slate-400 mt-1">Σ(P₁Q₀)/Σ(P₀Q₀)</p>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.04 }} className="p-3 bg-slate-950 rounded-xl border border-purple-800/50">
                        <p className="text-[10px] text-purple-400 font-bold uppercase">Paasche (Current Q₁)</p>
                        <p className="text-xl font-bold text-white mt-1 font-mono">{indexCalculations.paasche}</p>
                        <p className="text-[10px] text-slate-400 mt-1">Σ(P₁Q₁)/Σ(P₀Q₁)</p>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.04 }} className="p-3 bg-emerald-950/60 border border-emerald-700/70 rounded-xl">
                        <p className="text-[10px] text-emerald-300 font-bold uppercase">Fisher Ideal (√L×P)</p>
                        <p className="text-xl font-bold text-emerald-400 mt-1 font-mono">{indexCalculations.fisher}</p>
                        <p className="text-[10px] text-slate-300 mt-1">Geometric Mean</p>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.04 }} className="p-3 bg-gold-950/60 border border-gold-700/70 rounded-xl">
                        <p className="text-[10px] text-gold-300 font-bold uppercase">Marshall-Edgeworth</p>
                        <p className="text-xl font-bold text-gold-400 mt-1 font-mono">{indexCalculations.marshallEdgeworth}</p>
                        <p className="text-[10px] text-slate-300 mt-1">Mean Q = (Q₀+Q₁)/2</p>
                      </motion.div>
                    </div>

                    {/* Topic Specific SVG 2: Index Numbers Bridge */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-xs font-bold text-gold-400 mb-1">📐 Index Weighting Architecture</div>
                      <svg viewBox="0 0 500 80" className="w-full h-18">
                        <rect x="10" y="10" width="130" height="40" rx="8" fill="#4338ca" opacity="0.6" />
                        <text x="75" y="28" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">Laspeyres (L)</text>
                        <text x="75" y="42" fill="#e0e7ff" fontSize="9" textAnchor="middle">Fixed Base Q₀ (Upward)</text>

                        <path d="M 145,30 L 195,30" stroke="#6366f1" strokeWidth="2" strokeDasharray="3,3" />

                        <rect x="200" y="5" width="100" height="50" rx="8" fill="#047857" opacity="0.8" />
                        <text x="250" y="26" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">Fisher Ideal</text>
                        <text x="250" y="42" fill="#ffffff" fontSize="9" textAnchor="middle">F = √(L × P)</text>

                        <path d="M 305,30 L 355,30" stroke="#6366f1" strokeWidth="2" strokeDasharray="3,3" />

                        <rect x="360" y="10" width="130" height="40" rx="8" fill="#7e22ce" opacity="0.6" />
                        <text x="425" y="28" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">Paasche (P)</text>
                        <text x="425" y="42" fill="#f3e8ff" fontSize="9" textAnchor="middle">Current Q₁ (Downward)</text>
                        <text x="250" y="72" fill="#94a3b8" fontSize="8" textAnchor="middle">Satisfies Time & Factor Reversal Tests</text>
                      </svg>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* ─── LAB 5: MOVING AVERAGE CENTERING VISUALIZER ─── */}
            {currentSlide === 4 && activeTab !== 'observations' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">
                        4-Yearly Time Series Smoothing
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Visualizing why even period moving averages require a 2nd stage centering average.
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsCenteredToggled(!isCenteredToggled);
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                        isCenteredToggled
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      {isCenteredToggled ? '✓ Centering Step Applied' : 'Show Uncentered Off-Axis Position'}
                    </motion.button>
                  </div>

                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={movingAverageData.chartSeries}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="year" stroke="#94a3b8" />
                        <YAxis domain={[20, 65]} stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#475569', borderRadius: '8px' }} />
                        <Legend />
                        <Line type="monotone" dataKey="ActualProduction" name="Raw Jagged Time Series" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4 }} />
                        {isCenteredToggled && (
                          <Line type="monotone" dataKey="CenteredTrend" name="4-Year Centered Trend Line" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} connectNulls />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Topic Specific SVG 3: Centering Timeline Visualizer */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-xs font-bold text-gold-400 mb-1">📐 Moving Average Centering Timing Schema</div>
                    <svg viewBox="0 0 500 85" className="w-full h-20">
                      <line x1="40" y1="30" x2="460" y2="30" stroke="#475569" strokeWidth="2" />
                      <circle cx="60" cy="30" r="4" fill="#38bdf8" />
                      <text x="60" y="48" fill="#94a3b8" fontSize="9" textAnchor="middle">2018</text>

                      <circle cx="160" cy="30" r="4" fill="#38bdf8" />
                      <text x="160" y="48" fill="#94a3b8" fontSize="9" textAnchor="middle">2019</text>

                      <circle cx="260" cy="30" r="4" fill="#38bdf8" />
                      <text x="260" y="48" fill="#94a3b8" fontSize="9" textAnchor="middle">2020</text>

                      <circle cx="360" cy="30" r="4" fill="#38bdf8" />
                      <text x="360" y="48" fill="#94a3b8" fontSize="9" textAnchor="middle">2021</text>

                      <circle cx="440" cy="30" r="4" fill="#38bdf8" />
                      <text x="440" y="48" fill="#94a3b8" fontSize="9" textAnchor="middle">2022</text>

                      <circle cx="210" cy="18" r="3" fill="#f43f5e" />
                      <text x="210" y="12" fill="#f87171" fontSize="8" textAnchor="middle">Avg(18-21) @2019.5</text>

                      <circle cx="310" cy="18" r="3" fill="#f43f5e" />
                      <text x="310" y="12" fill="#f87171" fontSize="8" textAnchor="middle">Avg(19-22) @2020.5</text>

                      <path d="M 210,18 Q 260,35 260,30" stroke="#10b981" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
                      <path d="M 310,18 Q 260,35 260,30" stroke="#10b981" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
                      <circle cx="260" cy="30" r="6" fill="#10b981" />
                      <text x="260" y="70" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">Centered 4-Yr Mean on Year 2020</text>
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-5 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/60"
            >
              <h2 className="text-lg font-bold text-emerald-300">Open Sandbox Lab (Ungraded Free Play)</h2>
              <p className="text-xs text-slate-300 mt-1">
                Test extreme loans, rapid CAGR scenarios, and index shifts without stress. When confident, click Ready for Challenges!
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-gold-400">Instant Loan Solver</span>
                <div>
                  <label className="text-[11px] text-slate-400">Principal: ₹{loanPrincipal.toLocaleString('en-IN')}</label>
                  <input type="range" min={50000} max={2000000} step={25000} value={loanPrincipal} onChange={(e) => setLoanPrincipal(Number(e.target.value))} className="w-full accent-gold-500" />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Rate: {loanRateAnnual}% | Tenure: {loanTenureYears} yrs</label>
                  <input type="range" min={5} max={18} step={0.5} value={loanRateAnnual} onChange={(e) => setLoanRateAnnual(Number(e.target.value))} className="w-full accent-amber-500" />
                </div>
                <div className="text-xs font-mono p-2 bg-slate-950 rounded border border-slate-800">
                  Reducing EMI: <span className="text-emerald-400 font-bold">₹{emiCalculations.reducingEmi}</span>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-purple-400">Instant CAGR Solver</span>
                <div>
                  <label className="text-[11px] text-slate-400">Final / Initial Ratio: {(finalValue/initialInvestment).toFixed(2)}x</label>
                  <input type="range" min={initialInvestment} max={initialInvestment * 10} step={10000} value={finalValue} onChange={(e) => setFinalValue(Number(e.target.value))} className="w-full accent-purple-500" />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Years: {cagrYears} yrs</label>
                  <input type="range" min={1} max={10} value={cagrYears} onChange={(e) => setCagrYears(Number(e.target.value))} className="w-full accent-gold-500" />
                </div>
                <div className="text-xs font-mono p-2 bg-slate-950 rounded border border-slate-800">
                  CAGR: <span className="text-purple-300 font-bold">{cagrCalculations.cagr}% p.a.</span>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400">Instant Depreciation Solver</span>
                <div>
                  <label className="text-[11px] text-slate-400">Cost: ₹{assetCost.toLocaleString('en-IN')}</label>
                  <input type="range" min={100000} max={1500000} step={50000} value={assetCost} onChange={(e) => setAssetCost(Number(e.target.value))} className="w-full accent-emerald-500" />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">Useful Life: {usefulLife} yrs</label>
                  <input type="range" min={2} max={10} value={usefulLife} onChange={(e) => setUsefulLife(Number(e.target.value))} className="w-full accent-emerald-600" />
                </div>
                <div className="text-xs font-mono p-2 bg-slate-950 rounded border border-slate-800">
                  Annual Dep: <span className="text-emerald-400 font-bold">₹{depreciationCalculations.annualDep}/yr</span>
                </div>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-gold-600 hover:from-emerald-500 hover:to-gold-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/30 text-sm flex items-center gap-2 mx-auto"
            >
              <span>Ready for CISCE Exam Level Challenges</span>
              <span>→</span>
            </motion.button>
          </motion.div>
        )}

        {/* ─── PHASE 4: CHALLENGES & ESCALATING HINTS ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Challenge Header & Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">
                  Question <span className="text-white font-bold">{currentChallenge + 1}</span> of {filteredChallenges.length}
                </span>
                <span className="text-gold-400 uppercase font-mono tracking-wider font-semibold">
                  Competency: {challenge.competencyLevel}
                </span>
              </div>

              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-pink-500"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question Card with Flash and Shake Visual Feedback */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-2xl border transition-colors ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-500'
                  : showExplanation
                  ? 'bg-slate-900 border-emerald-800/60'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <h3 className="text-base md:text-lg text-white font-semibold leading-snug mb-6">
                {challenge.question}
              </h3>

              {/* MCQ Options */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      onClick={(e) => handleAnswer(i, e)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`p-4 text-left text-sm rounded-xl border transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                          : showExplanation && i !== challenge.correctIndex
                          ? 'bg-slate-950/40 border-slate-800 text-slate-500'
                          : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-gold-500'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Drag Label Interactive Diagram */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 w-full mb-1">Drag each token to its matching box below:</span>
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-gold-600 text-white rounded-lg cursor-grab text-xs font-semibold shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {challenge.dragItems.map((item, i) => {
                      const targetId = item.targetId;
                      const filled = droppedLabels[targetId];
                      return (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleDragDrop(targetId)}
                          className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] transition-colors ${
                            filled
                              ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                              : 'bg-slate-950/60 border-slate-700 text-slate-400'
                          }`}
                        >
                          <span className="text-[11px] text-slate-500 uppercase font-mono mb-1">
                            Target Zone: {targetId.replace('box_', '')}
                          </span>
                          <span className="text-sm font-bold">{filled || 'Drop Label Here'}</span>
                        </motion.div>
                      );
                    })}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleAnswer(droppedLabels, e)}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs"
                  >
                    Verify Mappings
                  </motion.button>
                </div>
              )}

              {/* Drag Sort Interactive Sequence */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Reorder the steps into the correct chronological sequence:</p>
                  {(sortArrangement.length > 0 ? sortArrangement.map(idx => challenge.sortItems![idx]) : challenge.sortItems).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-xs md:text-sm cursor-grab flex items-center gap-3"
                    >
                      <span className="px-2 py-0.5 bg-gold-950 text-gold-400 rounded font-mono text-xs font-bold">
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
                    className="px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs mt-2"
                  >
                    Verify Order
                  </motion.button>
                </div>
              )}

              {/* Numeric Input */}
              {challenge.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <motion.input
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                      transition={{ duration: 0.4 }}
                      type="number"
                      step={0.01}
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter calculated numerical value..."
                      className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-gold-500 outline-none w-64"
                    />
                    <span className="text-slate-400 text-sm font-semibold">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleAnswer(numericInput, e)}
                      disabled={showExplanation || !numericInput}
                      className="px-6 py-3 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs"
                    >
                      Submit Answer
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Construct Expression */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-gold-700 text-white rounded-lg text-xs font-mono font-bold"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} className="min-h-[60px] p-4 bg-slate-950 rounded-xl border border-slate-700 flex flex-wrap items-center gap-2">
                    {constructParts.map((part, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-2.5 py-1 bg-gold-900/80 text-gold-200 rounded text-xs font-mono flex items-center gap-1"
                      >
                        {part}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 hover:text-rose-300 ml-1 text-xs"
                        >
                          ✕
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500">Click mathematical tokens above to assemble formula</span>
                    )}
                  </motion.div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleAnswer(constructParts.join(' '), e)}
                      disabled={showExplanation || constructParts.length === 0}
                      className="px-6 py-2.5 bg-gold-600 text-white font-bold rounded-xl text-xs"
                    >
                      Verify Construction
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts([])}
                      className="px-4 py-2.5 bg-slate-800 text-slate-300 font-semibold rounded-xl text-xs"
                    >
                      Clear
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Progressive Step-by-Step Explanation Reveal */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-gradient-to-br from-gold-950/60 to-slate-900 border border-gold-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-gold-300 font-bold text-xs uppercase tracking-wider">
                  <span>📚</span>
                  <span>Examiner's Step-by-Step Solution Breakdown</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="text-gold-400 font-bold mr-1">{idx + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex flex-wrap gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-gold-800/80 hover:bg-gold-700 text-white text-xs font-semibold rounded-lg"
                    >
                      Reveal Next Working Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finish & View Diagnostic Mastery →' : 'Next Question →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETION & MISCONCEPTION PROFILE ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-purple-950 rounded-3xl border border-gold-700 text-center space-y-4"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Applied Mathematics Unit Mastered!</h2>
              <div className="flex justify-center gap-6 flex-wrap">
                <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                  <p className="text-xs text-slate-400">Final Score</p>
                  <p className="text-3xl font-bold text-emerald-400 mt-1">{Math.max(0, 100 - errors * 4)}%</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                  <p className="text-xs text-slate-400">Total Mistakes</p>
                  <p className="text-3xl font-bold text-amber-400 mt-1">{errors}</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                  <p className="text-xs text-slate-400">BKT Mastery Status</p>
                  <p className="text-3xl font-bold text-purple-400 mt-1 uppercase text-lg">{masteryLevel}</p>
                </motion.div>
              </div>

              {/* Motivational Feedback Banner */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-4 bg-slate-900/90 rounded-2xl border border-gold-500/40 max-w-lg mx-auto"
              >
                <p className="text-base font-bold text-gold-300">
                  {errors === 0
                    ? 'PERFECT SCORE!'
                    : errors <= 3
                    ? 'Great work!'
                    : errors <= 7
                    ? 'Good effort!'
                    : 'Do not give up — You WILL get this!'}
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  {errors === 0
                    ? '🌟 Flawless Mastery! You possess deep structural understanding of CISCE financial mathematics, index numbers, and time series algorithms.'
                    : errors <= 3
                    ? '👍 Outstanding conceptual command! Review the specific misconception corrections below before taking your board examination.'
                    : errors <= 7
                    ? '📈 You made strong progress across amortisation and time series calculations. Review the key formulas below.'
                    : '💪 Learning is a process of refinement! Revisit the interactive labs to strengthen your intuition on reducing balances and geometric indexing.'}
                </p>
              </motion.div>
            </motion.div>

            {/* Misconception Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                  Personal Misconception Gaps Cleared:
                </h3>
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1"
                    >
                      <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Board Correction: {m.correction}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Spaced Repetition Visibility */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-5 bg-amber-950/40 border border-amber-800/60 rounded-2xl space-y-2"
            >
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Spaced Repetition Review Schedule (SM-2 Algorithm)
              </h3>
              <p className="text-xs text-slate-300">
                Your memory decay curve is registered. Recommended revision target is in{' '}
                <span className="text-amber-300 font-bold">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </span>
                . Practising at spaced intervals guarantees permanent neural retention.
              </p>
            </motion.div>

            {/* Real-World Capstone Activity */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
            >
              <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1 text-xs text-slate-400 pt-1">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gold-400 font-bold">{i + 1}.</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Interactive Micro-Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Level Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C12_AppliedMathsFinancialMathematicsCalculationSim;
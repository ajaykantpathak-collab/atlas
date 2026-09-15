'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Area,
  AreaChart
} from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE CONSTANTS ───
const NODE_C12_ECON_041 = 'c12_econ_041';
const NODE_C12_ECON_042 = 'c12_econ_042';
const NODE_C12_ECON_043 = 'c12_econ_043';
const NODE_C12_ECON_044 = 'c12_econ_044';
const NODE_C12_ECON_045 = 'c12_econ_045';
const NODE_C12_ECON_046 = 'c12_econ_046';
const NODE_C12_ECON_047 = 'c12_econ_047';
const NODE_C12_ECON_048 = 'c12_econ_048';
const NODE_C12_ECON_049 = 'c12_econ_049';
const NODE_C12_ECON_050 = 'c12_econ_050';

const ALL_NODE_IDS = [
  NODE_C12_ECON_041,
  NODE_C12_ECON_042,
  NODE_C12_ECON_043,
  NODE_C12_ECON_044,
  NODE_C12_ECON_045,
  NODE_C12_ECON_046,
  NODE_C12_ECON_047,
  NODE_C12_ECON_048,
  NODE_C12_ECON_049,
  NODE_C12_ECON_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Chief Economic Advisor to the Ministry of Finance',
  intro: 'India is navigating volatile global headwinds and post-pandemic demand shifts. As Chief Economic Advisor, you are responsible for monitoring aggregate demand (AD), estimating national saving and consumption propensities, calculating the investment multiplier, and using fiscal and monetary policy to close inflationary and deflationary gaps.',
  context: 'The Union Budget and RBI Monetary Policy Committee depend on your Keynesian macroeconomic models to stabilise output, preserve full employment, and anchor inflation.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'If the Government invests ₹1,000 crore in the PM Gati Shakti railway network and households spend 80% of any additional income (MPC = 0.8), by how much will India’s equilibrium national income ultimately expand?',
  options: [
    'Exactly ₹1,000 crore — a rupee spent is just a rupee of GDP',
    '₹800 crore — 20% leaks into taxes and savings',
    '₹5,000 crore — the initial spending ripples through continuous rounds of consumption',
    'Infinity — money circulates forever without stopping',
  ],
  correctIndex: 2,
  hintAfter: 'Curious why ₹1,000 crore creates ₹5,000 crore? It is the power of the Keynesian Investment Multiplier! Let us explore how it works.',
};

// ─── TYPES & INTERFACES ───
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_ECON_041,
  title: 'Keynesian Aggregate Demand, Equilibrium & Policy Stabilization',
  definition: 'Keynesian Macroeconomics establishes that national output is determined by Ex-ante Aggregate Demand (AD = C + I + G + NX). Divergences from Full Employment produce Inflationary or Deflationary gaps, adjustable via the Investment Multiplier (k = 1/MPS) and counter-cyclical Fiscal and Monetary policies.',
  eli5: 'Think of national spending like a relay race: when the government spends money, workers receive wages and buy food, shopkeepers earn income and buy clothes, multiplying the original spending into a much larger national income.',
  misconceptions: [
    {
      misconception: 'Exante demand and expost demand are identical because both mean total demand.',
      correction: 'Ex-ante demand is planned/intended spending before transactions occur. Ex-post demand is actual realized sales recorded at the end of the period; the difference is unplanned inventory change.',
    },
    {
      misconception: 'Imports (M) are added to Aggregate Demand because Indian citizens spend money on them.',
      correction: 'Imports are SUBTRACTED (AD = C + I + G + X − M) because they represent domestic spending that leaks out to foreign producers rather than demanding domestic goods.',
    },
    {
      misconception: 'The investment multiplier formula is k = 1 / MPC because a higher MPC increases multiplier size.',
      correction: 'The formula is k = 1 / (1 − MPC) = 1 / MPS. Higher MPC means lower MPS in the denominator, resulting in a larger multiplier.',
    },
    {
      misconception: 'Equilibrium output automatically means full employment with zero unemployment.',
      correction: 'Equilibrium output occurs wherever AD = AS (or S = I). It frequently settles at an under-employment equilibrium below full capacity (Y* < Yf) with persistent involuntary unemployment.',
    },
    {
      misconception: 'To correct excess demand (inflationary gap), the government should increase public spending and cut taxes.',
      correction: 'Excess demand requires contractionary policy: cutting government spending (G), raising taxes (T), and raising the RBI repo rate to reduce aggregate spending and bring AD down to full capacity.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What bridges the difference between Ex-ante Supply and Ex-post Demand?', options: ['Government tax rates', 'Unplanned inventory change', 'Foreign exchange reserves', 'The price of gold'], correctIndex: 1 },
    { question: 'Which component constitutes the largest share (~57%) of Indian Aggregate Demand?', options: ['Private Final Consumption Expenditure (C)', 'Gross Capital Formation (I)', 'Government Spending (G)', 'Net Exports (NX)'], correctIndex: 0 },
    { question: 'If consumption function is C = 100 + 0.8Y, what is the saving function?', options: ['S = 100 + 0.2Y', 'S = −100 + 0.2Y', 'S = −100 + 0.8Y', 'S = 0.2Y − 100Y'], correctIndex: 1 },
    { question: 'At the break-even level of income, what is the value of APS?', options: ['1.0', '0.0', 'Negative', 'Greater than 1'], correctIndex: 1 },
    { question: 'What is the value of the investment multiplier when MPC is 0.75?', options: ['0.75', '1.33', '4.0', '5.0'], correctIndex: 2 },
    { question: 'Which type of unemployment is completely ABSENT at full employment in Keynesian theory?', options: ['Frictional unemployment', 'Voluntary unemployment', 'Involuntary unemployment', 'Seasonal unemployment'], correctIndex: 2 },
    { question: 'At full employment output (Yf), excess demand leads to:', options: ['Higher real GDP and employment', 'Demand-pull inflation with unchanged real output', 'Accumulation of unsold inventories', 'Depreciation of capital stock'], correctIndex: 1 },
    { question: 'To close a deflationary gap of ₹2,000 crore when multiplier k = 4, required ΔG is:', options: ['+₹2,000 crore', '+₹500 crore', '−₹500 crore', '+₹8,000 crore'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates comprehensive mastery of Ex-ante/Ex-post demand, AD components, consumption/saving propensities, Keynesian cross equilibrium, investment multiplier calculations, gap diagnosis, and fiscal/monetary corrective actions.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Ex-ante vs Ex-post Demand & Inventory Mechanism',
    instruction: 'Adjust Surat Textile Mill’s planned production and observe how unexpected export orders create unplanned inventory changes that dictate next month’s production.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_041,
  },
  {
    title: '2. Propensities & The Consumption-Saving Duality',
    instruction: 'Vary household income across Indian income brackets to observe how APC declines while MPC remains constant, and verify that APC + APS = 1.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_043,
  },
  {
    title: '3. The Keynesian Cross: Equilibrium Output (AD = AS)',
    instruction: 'Shift autonomous investment (I) and observe where the aggregate expenditure line intersects the 45° line to locate equilibrium income Y*.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_045,
  },
  {
    title: '4. The Investment Multiplier Chain Reaction',
    instruction: 'Simulate rounds of spending resulting from a ₹1,000 Cr capex infusion in Bengaluru Metro at different MPC values to visualize the geometric convergence.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_046,
  },
  {
    title: '5. Inflationary & Deflationary Gaps with Policy Controls',
    instruction: 'Diagnose the macroeconomic gap relative to Full Employment (Yf) and apply Fiscal (G, T) and Monetary (RBI Repo Rate) levers to restore stability.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_050,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'If planned output is 10,000 units but actual realized demand is only 8,000 units, what will happen to the firm’s warehouse inventory?',
    options: [
      'Unplanned inventory decumulation of 2,000 units (shortage)',
      'Unplanned inventory accumulation of 2,000 units (unsold stock)',
      'Zero change in inventory because prices adjust instantly',
      'Inventories permanently vanish from balance sheets',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Ex-ante Supply and Ex-post Demand sliders below to verify how inventories accumulate.',
    nodeId: NODE_C12_ECON_041,
  },
  {
    question: 'Predict: If an economy with MPC = 0.8 faces a deflationary gap of ₹1,200 crore, how much new Government Spending (ΔG) is required to restore full employment?',
    options: [
      '₹1,200 crore — government must match the gap 1:1',
      '₹960 crore — equal to 80% of the gap',
      '₹240 crore — because the multiplier k = 5 will magnify ₹240 Cr into ₹1,200 Cr',
      '₹6,000 crore — multiplier divides initial government spending',
    ],
    correctIndex: 2,
    verifyInstruction: 'Set MPC to 0.8 in Step 5 and use the G slider to see how ₹240 Cr closes the ₹1,200 Cr deflationary gap.',
    nodeId: NODE_C12_ECON_050,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'As national income (Y) rises from ₹200 Cr to ₹1,000 Cr in a linear consumption function C = 50 + 0.75Y, what happens to APC and MPC?',
    observableOptions: [
      'Both APC and MPC remain strictly constant',
      'APC falls from 1.0 to 0.80 while MPC stays constant at 0.75',
      'APC increases above 1.5 while MPC drops to zero',
      'MPC rises while APC turns negative',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_ECON_043,
  },
  {
    question: 'When Aggregate Demand (AD) exceeds Aggregate Supply (AS) at Full Employment (Yf), what is the sole primary economic consequence?',
    observableOptions: [
      'Real GDP and factory employment expand beyond maximum physical capacity',
      'Only the general price level rises (Demand-Pull Inflation) while real output remains fixed at Yf',
      'Unsold inventories pile up rapidly across all retail dealerships',
      'The investment multiplier collapses to zero',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_ECON_049,
  },
];

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 & CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (1-7) ──
  {
    id: 'ch_01_f',
    nodeId: NODE_C12_ECON_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following describes Ex-ante Demand in Keynesian Macroeconomics?',
    options: [
      'The actual sales figures recorded in national accounts at the end of the financial year',
      'The planned aggregate expenditure that buyers intend to spend before transactions take place',
      'The physical capacity of machines installed in industrial manufacturing plants',
      'The surplus agricultural stocks procured by the Food Corporation of India (FCI)',
    ],
    correctIndex: 1,
    explanation: 'Ex-ante demand is forward-looking and represents planned or intended spending before transactions occur during a period. Ex-post demand is actual realised sales.',
    hints: [
      'Think of Latin: "ante" means "before".',
      'It represents what buyers plan or intend to spend at the start of the period.',
      'It is forward-looking, unlike ex-post which is recorded after the transactions.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_f',
    nodeId: NODE_C12_ECON_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a four-sector open economy, what is the correct algebraic formula for Aggregate Demand (AD)?',
    options: [
      'AD = C + I + G + M − X',
      'AD = C + S + T + (X − M)',
      'AD = C + I + G + (X − M)',
      'AD = C + I − G + (X + M)',
    ],
    correctIndex: 2,
    explanation: 'AD is the sum of household consumption (C), private investment (I), government spending (G), and net exports (NX = X − M). Imports (M) are subtracted because they represent domestic spending on foreign goods.',
    hints: [
      'Identify the four sectors: Households, Firms, Government, Foreign sector.',
      'Remember that foreign spending on domestic goods (Exports, X) is added.',
      'Domestic spending on foreign goods (Imports, M) must be subtracted.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_f',
    nodeId: NODE_C12_ECON_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to Keynes’s Fundamental Psychological Law of Consumption, what are the bounds on Marginal Propensity to Consume (MPC)?',
    options: [
      'MPC = 1.0 always',
      '0 < MPC < 1 (Positive but less than unity)',
      'MPC > 1.0 during economic growth',
      'MPC < 0 (Negative)',
    ],
    correctIndex: 1,
    explanation: 'Keynes observed that when income increases, consumption also increases (MPC > 0), but by less than the full increase in income (MPC < 1) because part of the increase is saved.',
    hints: [
      'People spend more when they earn more, so MPC must be greater than zero.',
      'Do people spend 100% of every extra rupee they earn, or do they save a fraction?',
      'Because they save part of any raise, MPC is strictly between 0 and 1.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_f',
    nodeId: NODE_C12_ECON_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why can the Average Propensity to Save (APS) take a negative value, while APC is always positive?',
    options: [
      'Because households can borrow or dissave when consumption exceeds income at low income levels',
      'Because the government levies negative tax rates on low-income earners',
      'Because the banking sector charges negative interest on savings deposits',
      'Because marginal propensity to consume exceeds 1 at low incomes',
    ],
    correctIndex: 0,
    explanation: 'At very low income levels (below break-even), consumption exceeds income (C > Y). Households finance basic needs by drawing down past savings or borrowing (dissaving, S < 0), making APS = S/Y negative.',
    hints: [
      'Think about what happens if someone earns ₹10,000 but needs ₹15,000 to survive.',
      'Where does the extra ₹5,000 come from? Past savings or loans.',
      'When saving (S) is negative, S/Y (APS) is also negative.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_05_f',
    nodeId: NODE_C12_ECON_045,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct economic labels to their corresponding positions on the Keynesian Cross diagram.',
    dragItems: [
      { label: '45° Reference Line (AD = AS)', targetId: 'cross_45' },
      { label: 'Aggregate Demand Line (C + I)', targetId: 'cross_ad' },
      { label: 'Equilibrium Point E* (AD = Y)', targetId: 'cross_eq' },
      { label: 'Autonomous Spending Intercept (a + I)', targetId: 'cross_int' },
    ],
    correctMapping: {
      cross_45: '45° Reference Line (AD = AS)',
      cross_ad: 'Aggregate Demand Line (C + I)',
      cross_eq: 'Equilibrium Point E* (AD = Y)',
      cross_int: 'Autonomous Spending Intercept (a + I)',
    },
    explanation: 'The Keynesian cross features the 45° line from the origin (where output equals planned spending), the upward-sloping AD line starting at autonomous spending (a + I), and their intersection E* establishing equilibrium income Y*.',
    hints: [
      'The 45° line represents all points where spending equals output (Y = AD).',
      'The AD line starts above the origin because of autonomous consumption and autonomous investment.',
      'The crossing point of the two lines is the equilibrium point E*.',
    ],
  },
  {
    id: 'ch_06_f',
    nodeId: NODE_C12_ECON_048,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Keynesian macroeconomic theory, "Full Employment" is formally defined as the state where:',
    options: [
      '100% of the population including infants and elderly are working',
      'There is zero involuntary unemployment at prevailing wage rates',
      'There is no frictional or voluntary unemployment whatsoever',
      'National output reaches infinity',
    ],
    correctIndex: 1,
    explanation: 'Full employment does not mean zero unemployment; frictional and voluntary unemployment persist. It specifically denotes the absence of INVOLUNTARY unemployment — everyone willing to work at going wages finds a job.',
    hints: [
      'Does full employment mean college students between job interviews cannot exist?',
      'Frictional and voluntary unemployment are normal in any dynamic economy.',
      'Full employment specifically means no worker willing to work at prevailing wages is denied a job.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_07_f',
    nodeId: NODE_C12_ECON_049,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When Aggregate Demand at Full Employment falls short of Aggregate Supply (AD < Yf), the resulting vertical gap is known as the:',
    options: [
      'Inflationary Gap',
      'Deflationary (or Recessionary) Gap',
      'Fiscal Deficit Gap',
      'Trade Balance Gap',
    ],
    correctIndex: 1,
    explanation: 'Deficient demand at full employment creates a Deflationary Gap equal to Yf − AD(Yf). It leads to involuntary unemployment, unsold inventories, and downward output contractions.',
    hints: [
      'Demand is deficient (too little spending).',
      'Too little spending leads to economic slowdown and deflationary pressure.',
      'The gap is called the Deflationary (or Recessionary) Gap.',
    ],
  },

  // ── STANDARD TIER (8-15) ──
  {
    id: 'ch_08_s',
    nodeId: NODE_C12_ECON_041,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Hero MotoCorp plant planned Q4 production of 2,40,000 motorcycles based on festive demand forecasts. Actual sales turned out to be 2,10,000 motorcycles. Calculate the unplanned inventory accumulation in units.',
    correctAnswer: 30000,
    tolerance: 0,
    unit: 'motorcycles',
    explanation: 'Unplanned Inventory Change = Ex-ante Supply (2,40,000) − Ex-post Demand (2,10,000) = +30,000 units. Hero will cut production in the following quarter to clear this stock.',
    hints: [
      'Formula: Unplanned Inventory = Planned Output − Actual Sales.',
      'Subtract 2,10,000 from 2,40,000.',
      '2,40,000 − 2,10,000 = 30,000 motorcycles.',
    ],
  },
  {
    id: 'ch_09_s',
    nodeId: NODE_C12_ECON_044,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Given the consumption function C = 200 + 0.8Y, construct the exact saving function equation.',
    availableParts: ['S =', '−200', '+200', '+ 0.2Y', '− 0.2Y', '+ 0.8Y'],
    targetState: 'S = −200 + 0.2Y',
    validationHint: 'Remember that S = Y − C = Y − (a + bY) = −a + (1 − b)Y.',
    explanation: 'Since Y = C + S, S = Y − (200 + 0.8Y) = −200 + (1 − 0.8)Y = −200 + 0.2Y. The autonomous dissaving is −₹200 Cr and MPS = 0.2.',
    hints: [
      'Autonomous saving is the negative of autonomous consumption (−a).',
      'The slope of the saving function is MPS = 1 − MPC = 1 − 0.8 = 0.2.',
      'Assemble: S = −200 + 0.2Y.',
    ],
  },
  {
    id: 'ch_10_s',
    nodeId: NODE_C12_ECON_045,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In an economy, C = 100 + 0.75Y and autonomous investment I = ₹300 crore. Calculate the equilibrium level of national income (Y*) in ₹ crore.',
    correctAnswer: 1600,
    tolerance: 0,
    unit: '₹ crore',
    explanation: 'At equilibrium Y = C + I → Y = 100 + 0.75Y + 300 → Y − 0.75Y = 400 → 0.25Y = 400 → Y* = 400 / 0.25 = ₹1,600 crore.',
    hints: [
      'Equilibrium condition: Y = a + bY + I.',
      'Total autonomous spending = 100 + 300 = 400.',
      'Divide autonomous spending by MPS (1 − 0.75 = 0.25): 400 / 0.25 = 1600.',
    ],
  },
  {
    id: 'ch_11_s',
    nodeId: NODE_C12_ECON_046,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If Marginal Propensity to Save (MPS) is 0.2, what is the numerical value of the Investment Multiplier (k)?',
    correctAnswer: 5,
    tolerance: 0,
    unit: 'times',
    explanation: 'Multiplier k = 1 / MPS = 1 / 0.2 = 5. Every ₹1 of autonomous investment generates ₹5 of additional equilibrium national income.',
    hints: [
      'Use the formula k = 1 / MPS.',
      'Substitute MPS = 0.2: k = 1 / 0.2.',
      '1 divided by 0.2 equals 5.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_12_s',
    nodeId: NODE_C12_ECON_046,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential rounds of the Keynesian Multiplier Process in chronological order following a ₹1,000 Cr government rail investment (MPC = 0.8).',
    sortItems: [
      'Govt injects ₹1,000 Cr capex into construction firms and workers (Round 1 income = ₹1,000 Cr)',
      'Workers spend 80% (₹800 Cr) on groceries and consumer goods (Round 2 income = ₹800 Cr)',
      'Shopkeepers spend 80% of their earnings (₹640 Cr) on apparel and transport (Round 3 income = ₹640 Cr)',
      'Successive induced spending rounds sum up to a cumulative income expansion of ₹5,000 Cr',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The multiplier ripples from initial injection to successive rounds of induced consumption: ₹1,000 Cr → ₹800 Cr → ₹640 Cr → converging to ΔY = 1,000 / (1 − 0.8) = ₹5,000 Cr.',
    hints: [
      'Start with the initial ₹1,000 Cr government injection.',
      'Next comes the first round of consumer spending by the recipients (80% of 1,000 = 800).',
      'Then subsequent shopkeepers spend 80% of 800 = 640, finally summing to ₹5,000 Cr.',
    ],
  },
  {
    id: 'ch_13_s',
    nodeId: NODE_C12_ECON_048,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A software engineer in Bengaluru leaves an ₹80,000/month position to prepare for civil services, while a daily-wage mason in Delhi seeks work at prevailing wages of ₹500/day but finds no contractor hiring. How are these two workers classified?',
    options: [
      'Engineer is Involuntary unemployed; Mason is Voluntary unemployed',
      'Engineer is Voluntary unemployed; Mason is Involuntary unemployed',
      'Both are Voluntary unemployed because both chose their career paths',
      'Both are Involuntary unemployed due to macroeconomic demand deficits',
    ],
    correctIndex: 1,
    explanation: 'The engineer chooses not to work at prevailing market wages (Voluntary). The mason is willing to work at going wages but cannot find work due to lack of demand (Involuntary).',
    hints: [
      'Voluntary unemployment occurs when a worker refuses work at prevailing wages.',
      'Involuntary unemployment occurs when a willing worker cannot find a job at going wages.',
      'The engineer opted out voluntarily; the mason was denied work involuntarily.',
    ],
  },
  {
    id: 'ch_14_s',
    nodeId: NODE_C12_ECON_049,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does an Inflationary Gap (excess demand at full employment) cause ONLY a rise in the general price level rather than an increase in real output?',
    options: [
      'Because all domestic resources are already fully employed and physical production cannot expand in the short run',
      'Because the Reserve Bank of India bans factories from producing surplus goods',
      'Because consumers refuse to purchase additional goods once income exceeds ₹10,000 Cr',
      'Because the investment multiplier turns negative at full capacity',
    ],
    correctIndex: 0,
    explanation: 'At full employment (Yf), all labor and industrial capacity are utilized. Additional planned spending cannot generate extra real output; it bids up prices for existing goods (Demand-Pull Inflation).',
    hints: [
      'Can a factory run faster than its maximum physical capacity when every worker is already hired?',
      'At full employment, real output is physically capped at Yf.',
      'Excess money chasing fixed output leads purely to higher prices.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_15_s',
    nodeId: NODE_C12_ECON_050,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which combination of Fiscal and Monetary measures correctly addresses DEFICIENT demand (Deflationary Gap)?',
    options: [
      'Increase Government Expenditure (G), Cut Taxes (T), and RBI Cuts Repo Rate / CRR',
      'Cut Government Expenditure (G), Raise Taxes (T), and RBI Raises Repo Rate',
      'Increase Taxes (T), RBI Sells Govt Securities via OMO, and Freeze Public Works',
      'Raise Cash Reserve Ratio (CRR), Raise SLR, and Impose Credit Rationing',
    ],
    correctIndex: 0,
    explanation: 'Deficient demand requires expansionary policy: increasing G, reducing T, cutting the RBI Repo Rate and CRR, and buying securities via OMO to inject purchasing power and shift AD rightward.',
    hints: [
      'Deficient demand means too little spending in the economy.',
      'To stimulate spending, government must spend MORE and tax LESS.',
      'The central bank (RBI) must make credit cheaper by lowering the repo rate.',
    ],
    misconceptionIndex: 4,
  },

  // ── ADVANCED TIER (16-22) ──
  {
    id: 'ch_16_a',
    nodeId: NODE_C12_ECON_047,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In an economy, C = 200 + 0.8Y and I = ₹400 crore. The government determines that Full Employment output (Yf) is ₹3,500 crore. Calculate the additional autonomous investment (ΔI) required in ₹ crore to achieve full employment.',
    correctAnswer: 100,
    tolerance: 0,
    unit: '₹ crore',
    explanation: 'Current equilibrium Y* = (200 + 400) / (1 − 0.8) = 600 / 0.2 = ₹3,000 Cr. Required ΔY = Yf − Y* = 3,500 − 3,000 = ₹500 Cr. Multiplier k = 1 / 0.2 = 5. Required ΔI = ΔY / k = 500 / 5 = ₹100 crore.',
    hints: [
      'Step 1: Calculate current Y* using (a + I) / MPS = 600 / 0.2 = 3,000.',
      'Step 2: Find target income gap: ΔY = 3,500 − 3,000 = 500.',
      'Step 3: Required ΔI = ΔY / k = 500 / 5 = 100 crore.',
    ],
  },
  {
    id: 'ch_17_a',
    nodeId: NODE_C12_ECON_050,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'India faces an Inflationary Gap of ₹1,500 crore at full employment. If MPC = 0.75, by how much must the Ministry of Finance reduce Government Spending (ΔG) in ₹ crore to exactly close the gap?',
    correctAnswer: 375,
    tolerance: 0,
    unit: '₹ crore',
    explanation: 'Multiplier k = 1 / (1 − 0.75) = 1 / 0.25 = 4. Required cut in government spending ΔG = Gap / k = 1,500 / 4 = ₹375 crore. A ₹375 Cr cut multiplies into a ₹1,500 Cr reduction in AD.',
    hints: [
      'Step 1: Compute multiplier k = 1 / (1 − 0.75) = 4.',
      'Step 2: Use formula Required ΔG = Gap / k.',
      'Divide 1,500 by 4 = 375 crore.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_18_a',
    nodeId: NODE_C12_ECON_043,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does Direct Benefit Transfer (DBT) under PM-KISAN to small farmers stimulate Aggregate Demand more effectively than equal-sized tax cuts for high-income corporate executives?',
    options: [
      'Because low-income rural households have a significantly higher MPC (~0.90) than high-income households (~0.40), yielding a much larger multiplier effect',
      'Because high-income executives are legally prohibited from purchasing consumer goods in India',
      'Because corporate executives pay zero direct income taxes under current Indian tax law',
      'Because PM-KISAN cash transfers are exempt from the Keynesian multiplier process',
    ],
    correctIndex: 0,
    explanation: 'Low-income households spend nearly 90% of marginal income on basic necessities (MPC ≈ 0.90, k = 10), whereas affluent households save most of a tax windfall (MPC ≈ 0.40, k = 1.67). Target transfers maximise demand expansion.',
    hints: [
      'Think about who spends a larger percentage of an extra ₹1,000: a struggling farmer or a billionaire CEO?',
      'Low-income households have a high Marginal Propensity to Consume (MPC).',
      'A higher MPC generates a much higher multiplier k = 1 / (1 − MPC).',
    ],
  },
  {
    id: 'ch_19_a',
    nodeId: NODE_C12_ECON_049,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During FY2022, India experienced CPI inflation of 6.7% alongside full capacity utilization, while in FY2009 during the global financial crisis, GDP growth dropped to 3.1% with idle factories. How are these two historical episodes classified?',
    options: [
      'FY2022: Deflationary Gap; FY2009: Inflationary Gap',
      'FY2022: Inflationary Gap (Excess Demand); FY2009: Deflationary Gap (Deficient Demand)',
      'Both episodes were classical full-employment equilibria with zero disequilibrium',
      'FY2022 was caused by excessive saving; FY2009 was caused by excessive investment',
    ],
    correctIndex: 1,
    explanation: 'FY2022 post-lockdown demand surge met supply bottlenecks, generating an Inflationary Gap (CPI inflation at 6.7%). FY2009 global export collapse created a Deflationary Gap (slump in GDP growth and factory layoffs).',
    hints: [
      'High inflation at full capacity signals an Inflationary Gap (excess demand).',
      'Slowing GDP growth and idle factory capacity signal a Deflationary Gap (deficient demand).',
      'Match FY2022 to Inflationary Gap and FY2009 to Deflationary Gap.',
    ],
  },
  {
    id: 'ch_20_a',
    nodeId: NODE_C12_ECON_050,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the monetary policy transmission mechanism in order when the RBI RAISES the Repo Rate to fight an Inflationary Gap.',
    sortItems: [
      'RBI raises the Policy Repo Rate from 4.0% to 6.5% in MPC meetings',
      'Commercial banks (SBI, HDFC) face higher cost of funds and hike home/auto loan lending rates to 9%+',
      'Households and corporations reduce borrowing for housing, automobiles, and capital expansion',
      'Aggregate Demand (AD) shifts downward, closing the Inflationary Gap and cooling CPI inflation',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Repo hike → higher bank borrowing costs → higher retail lending rates → reduced private credit & investment → downward shift in AD to eliminate excess demand.',
    hints: [
      'Start with the central bank policy decision (RBI raises repo rate).',
      'Commercial banks pass on this cost by raising lending rates to public borrowers.',
      'Higher interest rates discourage household and firm borrowing, cooling total AD.',
    ],
  },
  {
    id: 'ch_21_a',
    nodeId: NODE_C12_ECON_048,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did John Maynard Keynes reject the Classical claim that competitive wage cuts by workers would automatically cure unemployment and restore full employment?',
    options: [
      'Because cutting wages reduces total worker income, which slumps consumption spending (C) and further depresses Aggregate Demand, deepening the recession',
      'Because the Indian Labour Act of 1948 strictly prohibits trade unions from operating',
      'Because Classical economists proved that wages have zero correlation with aggregate demand',
      'Because cutting wages automatically causes hyperinflation in the banking system',
    ],
    correctIndex: 0,
    explanation: 'Keynes proved that wages are both a cost of production and the primary source of worker income. General wage cuts reduce household purchasing power, depressing AD and exacerbating under-employment equilibrium.',
    hints: [
      'Wages are not just a business cost — they are workers’ income.',
      'If all workers accept wage cuts, what happens to their total consumer spending?',
      'Lower spending reduces Aggregate Demand, worsening the economic slump.',
    ],
  },
  {
    id: 'ch_22_a',
    nodeId: NODE_C12_ECON_047,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the comprehensive algebraic identity proving that the sum of Marginal Propensity to Consume and Marginal Propensity to Save is always unity.',
    availableParts: ['ΔY =', 'ΔC + ΔS', '→', 'ΔC/ΔY + ΔS/ΔY = 1', '→ MPC + MPS = 1'],
    targetState: 'ΔY = ΔC + ΔS → ΔC/ΔY + ΔS/ΔY = 1 → MPC + MPS = 1',
    validationHint: 'Start with total income change ΔY = ΔC + ΔS, divide throughout by ΔY, and substitute definition of MPC and MPS.',
    explanation: 'Since all incremental income is either consumed or saved (ΔY = ΔC + ΔS), dividing by ΔY yields ΔC/ΔY + ΔS/ΔY = 1, proving MPC + MPS = 1 universally.',
    hints: [
      'Start with the change in income split: ΔY = ΔC + ΔS.',
      'Divide both sides by ΔY to get the ratios: ΔC/ΔY + ΔS/ΔY = 1.',
      'Substitute definitions to reach the final identity: MPC + MPS = 1.',
    ],
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Union Budget Simulation: Design the Post-Crisis Stimulus Package',
  description: 'Assume the role of the Indian Finance Minister during an economic slowdown. Given a GDP shortfall (deflationary gap) of ₹20,000 crore and an estimated national MPC of 0.75, formulate a targeted policy package combining capex, DBT transfers, and RBI repo adjustments to restore full employment without igniting double-digit inflation.',
  steps: [
    'Calculate the national multiplier: k = 1 / (1 − 0.75) = 4.0.',
    'Determine total autonomous injection needed: ΔG = ₹20,000 Cr / 4 = ₹5,000 Cr.',
    'Allocate ₹3,000 Cr to National Highway Expansion (G) and ₹2,000 Cr to PM-KISAN DBT transfers.',
    'Coordinate with RBI to maintain an accommodative repo rate to prevent crowding out of private corporate investment.',
  ],
};

function C12_EconomicsExanteplannedDemandSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_ECON_041,
  title = DEFAULT_PROPS.title || 'Keynesian Aggregate Demand & Equilibrium',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['economics'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // ── Phase Flow ──
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ── Brilliant Pattern States ──
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ── Escalating Hints & Feedback ──
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ── Drag & Interactive States ──
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ── UI FX ──
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ── Rich Economics Simulation State ──
  const [simIncome, setSimIncome] = useState(1000);
  const [autoConsumption, setAutoConsumption] = useState(100);
  const [mpcValue, setMpcValue] = useState(0.8);
  const [autoInvestment, setAutoInvestment] = useState(200);
  const [govSpending, setGovSpending] = useState(100);
  const [netExports, setNetExports] = useState(-50);
  const [fullEmpOutput, setFullEmpOutput] = useState(2000);
  const [repoRate, setRepoRate] = useState(6.5);
  const [taxRate, setTaxRate] = useState(10);
  const [exanteSupply, setExanteSupply] = useState(10000);
  const [expostDemand, setExpostDemand] = useState(8000);

  // ── Refs ──
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ── Calculations ──
  const mpsValue = useMemo(() => +(1 - mpcValue).toFixed(2), [mpcValue]);
  const multiplierK = useMemo(() => +(1 / mpsValue).toFixed(2), [mpsValue]);
  const totalAutonomous = useMemo(() => autoConsumption + autoInvestment + govSpending + netExports, [autoConsumption, autoInvestment, govSpending, netExports]);
  const equilibriumY = useMemo(() => Math.round(totalAutonomous / mpsValue), [totalAutonomous, mpsValue]);
  const gapValue = useMemo(() => equilibriumY - fullEmpOutput, [equilibriumY, fullEmpOutput]);
  const currentConsumption = useMemo(() => Math.round(autoConsumption + mpcValue * simIncome), [autoConsumption, mpcValue, simIncome]);
  const currentSaving = useMemo(() => Math.round(simIncome - currentConsumption), [simIncome, currentConsumption]);
  const currentAPC = useMemo(() => simIncome > 0 ? +(currentConsumption / simIncome).toFixed(3) : 0, [currentConsumption, simIncome]);
  const currentAPS = useMemo(() => simIncome > 0 ? +(currentSaving / simIncome).toFixed(3) : 0, [currentSaving, simIncome]);
  const unplannedInventory = useMemo(() => exanteSupply - expostDemand, [exanteSupply, expostDemand]);

  // ── Spaced Repetition Schedule Days ──
  const srsIntervalDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  const nextReviewDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + srsIntervalDays);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }, [srsIntervalDays]);

  // ── Recharts Keynesian Cross Data ──
  const chartData = useMemo(() => {
    const data = [];
    const maxDomain = Math.max(equilibriumY, fullEmpOutput, 2500) * 1.3;
    const step = maxDomain / 8;
    for (let y = 0; y <= maxDomain; y += step) {
      const roundedY = Math.round(y);
      const ad = Math.round(totalAutonomous + mpcValue * roundedY);
      data.push({
        income: roundedY,
        asLine: roundedY,
        adLine: ad,
      });
    }
    return data;
  }, [totalAutonomous, mpcValue, equilibriumY, fullEmpOutput]);

  // ── Multiplier Rounds Data ──
  const multiplierRounds = useMemo(() => {
    const rounds = [];
    let currentInjection = 1000;
    let cumulative = 0;
    for (let r = 1; r <= 6; r++) {
      cumulative += currentInjection;
      rounds.push({
        round: `R${r}`,
        injection: Math.round(currentInjection),
        cumulative: Math.round(cumulative),
      });
      currentInjection *= mpcValue;
    }
    return rounds;
  }, [mpcValue]);

  // ── Filtered Challenges by Adaptive Difficulty ──
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ── Adaptive Difficulty Effect on Mount ──
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ── Adaptive Difficulty Effect post-answers ──
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner')
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

  // ── HTML Canvas Animation Loop ──
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

      const pulseX = (frame * 2.5) % canvas.width;
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#10b981');
      gradient.addColorStop(0.5, '#3b82f6');
      gradient.addColorStop(1, '#8b5cf6');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.bezierCurveTo(
        canvas.width * 0.3,
        canvas.height / 2 - Math.sin(frame * 0.05) * 12,
        canvas.width * 0.7,
        canvas.height / 2 + Math.cos(frame * 0.05) * 12,
        canvas.width,
        canvas.height / 2
      );
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(pulseX, canvas.height / 2, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ── Auto-hint Inactivity Timer ──
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallenge, resetInactivityTimer]);

  // ── Callbacks ──
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Brilliant deduction! The multiplier expands spending fivefold.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Keynesian interactive laboratory. Step through each macroeconomic module to manipulate variables.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You are now in the Free Simulation Sandbox. Experiment freely with spending, MPC, and policy interest rates.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Get ready for CISCE board challenges. Read carefully and apply your formulas.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === (currentSlide === 1 ? OBSERVATION_QUESTIONS[0].correctIndex : OBSERVATION_QUESTIONS[1].correctIndex);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Accurate observation!' : 'Look closely at how the values change on the chart.');
  }, [currentSlide]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation completed! Excellent macroeconomic mastery.');
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

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! That aligns perfectly with Keynesian theory.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the step-by-step solution together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
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
      if (prev.length === 0 && activeChallenge.sortItems) {
        prev = activeChallenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  const handleSliderChange = useCallback((setter: (val: number) => void, val: number) => {
    setter(val);
    audioManager.play('count');
  }, []);

  // Motivational message
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ── TOP HEADER ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/70 border border-emerald-700/50 rounded-2xl">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                ISC Class 12 • Macroeconomics
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full border ${
                  difficulty === 'foundation'
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    : difficulty === 'advanced'
                    ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white mt-1">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-xl capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ── CANVAS FLOW BAR ── */}
      <div className="relative w-full h-8 bg-slate-900/60 rounded-xl overflow-hidden border border-slate-800 mb-6">
        <canvas ref={canvasRef} width={800} height={32} className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none text-[11px] font-mono text-slate-400">
          <span>Income Stream (Y)</span>
          <span>C: {currentConsumption} Cr | S: {currentSaving} Cr</span>
          <span>Multiplier: {multiplierK}×</span>
        </div>
      </div>

      {/* ── 1. DISCOVERY HOOK PHASE ── */}
      {phase === 'discovery' && (
        <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900/80 rounded-2xl border border-indigo-800/40 shadow-inner">
            <h2 className="text-xl font-bold text-indigo-300 flex items-center gap-2">
              <span>🏛️</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-slate-900/80 rounded-xl border border-slate-700/50 text-xs text-indigo-200">
              ⚡ <span className="font-semibold">Core Mandate:</span> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold uppercase tracking-wider">
              <span>❓</span> Curiosity Hook (Ungraded Prediction)
            </div>
            <p className="text-base text-white font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left text-sm rounded-xl border transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-700/90 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-mono text-xs font-bold opacity-60 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border ${
                  discoveryCorrect
                    ? 'bg-emerald-950/50 border-emerald-600/50 text-emerald-300'
                    : 'bg-amber-950/50 border-amber-600/50 text-amber-300'
                }`}
              >
                <p className="text-sm">{discoveryCorrect ? '🎯 Spot on! The Keynesian Multiplier ripples spending across the economy.' : DISCOVERY_QUESTION.hintAfter}</p>
                <div className="mt-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                  >
                    <span>Launch Interactive Labs</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ── 2. INTERACTIVE EXPLORATION PHASE ── */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Selector Ribbon */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                  currentSlide === idx
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {step.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-emerald-400">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ── LAB 1: EX-ANTE / EX-POST & INVENTORY ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Planned Output (Ex-ante Supply):</span>
                        <span className="font-mono text-emerald-400 font-bold">{exanteSupply.toLocaleString()} metres</span>
                      </div>
                      <input
                        type="range"
                        min={5000}
                        max={15000}
                        step={500}
                        value={exanteSupply}
                        onChange={(e) => handleSliderChange(setExanteSupply, +e.target.value)}
                        className="w-full accent-emerald-500"
                        aria-label="Planned Output"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Actual Realized Sales (Ex-post Demand):</span>
                        <span className="font-mono text-blue-400 font-bold">{expostDemand.toLocaleString()} metres</span>
                      </div>
                      <input
                        type="range"
                        min={5000}
                        max={15000}
                        step={500}
                        value={expostDemand}
                        onChange={(e) => handleSliderChange(setExpostDemand, +e.target.value)}
                        className="w-full accent-blue-500"
                        aria-label="Actual Sales"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-2">
                      <div className="flex justify-between">
                        <span>Unplanned Inventory Change:</span>
                        <span className={`font-mono font-bold ${unplannedInventory > 0 ? 'text-amber-400' : unplannedInventory < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {unplannedInventory > 0 ? `+${unplannedInventory} (Accumulation)` : unplannedInventory < 0 ? `${unplannedInventory} (Decumulation)` : '0 (Equilibrium)'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Formula: <span className="font-mono text-slate-300">Unplanned ΔInv = Ex-ante Supply − Ex-post Demand</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Factory Warehouse Visualization */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 360 200" className="w-full h-48">
                      <rect x="20" y="70" width="120" height="100" rx={6} fill="#1e293b" stroke="#334155" strokeWidth="2" />
                      <polygon points="20,70 80,30 140,70" fill="#334155" />
                      <text x="80" y="115" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">Surat Mill</text>
                      <text x="80" y="130" fill="#64748b" fontSize="9" textAnchor="middle">Output: {exanteSupply}</text>

                      <line x1="140" y1="120" x2="220" y2="120" stroke="#475569" strokeWidth="4" strokeDasharray="6,4" />

                      <rect x="220" y="50" width="120" height="120" rx={6} fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                      <text x="280" y="75" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">Warehouse Stock</text>

                      <rect
                        x="240"
                        y={Math.max(85, 155 - (unplannedInventory / 100))}
                        width="80"
                        height={Math.max(5, Math.min(65, (unplannedInventory / 100) + 30))}
                        fill={unplannedInventory > 0 ? '#f59e0b' : unplannedInventory < 0 ? '#ef4444' : '#10b981'}
                        rx={4}
                      />
                      <text x="280" y="165" fill="#f8fafc" fontSize="9" textAnchor="middle">
                        {unplannedInventory > 0 ? 'Unsold Clutter' : unplannedInventory < 0 ? 'Buffer Drawn' : 'Equilibrium'}
                      </text>
                    </svg>

                    <p className="text-xs text-slate-400 text-center mt-2">
                      {unplannedInventory > 0
                        ? '⚠️ Stock accumulation forces the mill to cut output next month.'
                        : unplannedInventory < 0
                        ? '🔥 Shortage causes inventory rundown, prompting mill expansion.'
                        : '✅ Perfect equilibrium: Ex-ante Supply matches Ex-post Demand.'}
                    </p>
                  </div>
                </div>
              )}

              {/* ── LAB 2: PROPENSITIES (APC, MPC, APS, MPS) ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <label className="text-xs text-slate-400">National Income (Y): ₹{simIncome} Cr</label>
                      <input
                        type="range"
                        min={200}
                        max={3000}
                        step={100}
                        value={simIncome}
                        onChange={(e) => handleSliderChange(setSimIncome, +e.target.value)}
                        className="w-full accent-emerald-500"
                        aria-label="National Income"
                      />
                      <div className="text-[11px] text-slate-500">Autonomous Spending a = ₹{autoConsumption} Cr</div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <label className="text-xs text-slate-400">MPC (b): {mpcValue}</label>
                      <input
                        type="range"
                        min={0.1}
                        max={0.95}
                        step={0.05}
                        value={mpcValue}
                        onChange={(e) => handleSliderChange(setMpcValue, +e.target.value)}
                        className="w-full accent-indigo-500"
                        aria-label="MPC"
                      />
                      <div className="text-[11px] text-slate-500">Implied MPS (1 − b) = {mpsValue}</div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-center">
                      <div className="flex justify-between text-xs">
                        <span>APC = C / Y:</span>
                        <span className="font-mono text-emerald-400 font-bold">{currentAPC}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>APS = S / Y:</span>
                        <span className="font-mono text-blue-400 font-bold">{currentAPS}</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-1 flex justify-between">
                        <span>APC + APS:</span>
                        <span className="text-purple-400 font-bold">{(currentAPC + currentAPS).toFixed(1)} ✓</span>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800 p-3">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="p-2">Income (Y)</th>
                          <th className="p-2">Consumption (C)</th>
                          <th className="p-2">Saving (S)</th>
                          <th className="p-2">APC (C/Y)</th>
                          <th className="p-2">APS (S/Y)</th>
                          <th className="p-2">MPC (ΔC/ΔY)</th>
                          <th className="p-2">MPS (ΔS/ΔY)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[200, 500, 1000, 2000].map((y) => {
                          const c = autoConsumption + mpcValue * y;
                          const s = y - c;
                          const apc = +(c / y).toFixed(3);
                          const aps = +(s / y).toFixed(3);
                          return (
                            <tr key={y} className={`border-b border-slate-900 ${simIncome === y ? 'bg-emerald-950/40 text-emerald-300 font-semibold' : 'text-slate-300'}`}>
                              <td className="p-2 font-mono">₹{y} Cr</td>
                              <td className="p-2 font-mono">₹{c} Cr</td>
                              <td className="p-2 font-mono">{s < 0 ? `-₹${Math.abs(s)}` : `₹${s}`} Cr</td>
                              <td className="p-2 font-mono">{apc}</td>
                              <td className="p-2 font-mono">{aps}</td>
                              <td className="p-2 font-mono">{mpcValue}</td>
                              <td className="p-2 font-mono">{mpsValue}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {!observationAnswered && (
                    <div className="p-4 bg-indigo-950/50 rounded-xl border border-indigo-800/60 space-y-2">
                      <p className="text-xs text-indigo-200 font-semibold">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2.5 text-xs text-left bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── LAB 3: KEYNESIAN CROSS & EQUILIBRIUM OUTPUT ── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400">Autonomous Investment (I): ₹{autoInvestment} Cr</label>
                      <input
                        type="range"
                        min={100}
                        max={600}
                        step={50}
                        value={autoInvestment}
                        onChange={(e) => handleSliderChange(setAutoInvestment, +e.target.value)}
                        className="w-full accent-emerald-500"
                        aria-label="Autonomous Investment"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400">Govt Spending (G): ₹{govSpending} Cr</label>
                      <input
                        type="range"
                        min={50}
                        max={400}
                        step={50}
                        value={govSpending}
                        onChange={(e) => handleSliderChange(setGovSpending, +e.target.value)}
                        className="w-full accent-blue-500"
                        aria-label="Government Spending"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                      <div className="text-slate-400">Total Autonomous Spending (A): <span className="font-bold text-white font-mono">₹{totalAutonomous} Cr</span></div>
                      <div className="text-slate-400">Equilibrium Income Y* = A / MPS:</div>
                      <div className="text-lg font-bold font-mono text-emerald-400">₹{equilibriumY} Cr</div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 h-72 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="income" stroke="#64748b" tick={{ fontSize: 10 }} label={{ value: 'Income/Output (Y)', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 10 }} />
                        <YAxis stroke="#64748b" tick={{ fontSize: 10 }} label={{ value: 'Aggregate Spending', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                        <Line type="monotone" dataKey="asLine" name="45° Line (AS = Y)" stroke="#94a3b8" strokeDasharray="4 4" dot={false} strokeWidth={2} />
                        <Line type="monotone" dataKey="adLine" name="AD = A + bY" stroke="#10b981" dot={false} strokeWidth={3} />
                        <ReferenceLine x={equilibriumY} stroke="#38bdf8" strokeDasharray="3 3" label={{ value: `Y* = ₹${equilibriumY}`, fill: '#38bdf8', fontSize: 10, position: 'top' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* ── LAB 4: MULTIPLIER MECHANISM & ROUNDS ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <div className="text-xs text-slate-400">Initial Gati Shakti Injection (ΔI): <span className="text-white font-bold">₹1,000 Cr</span></div>
                      <div className="text-xs text-slate-400 mt-1">Multiplier Formula: <span className="font-mono text-emerald-400">k = 1 / (1 − MPC) = {multiplierK}×</span></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">Set MPC:</span>
                      {[0.5, 0.75, 0.8, 0.9].map((val) => (
                        <motion.button
                          key={val}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setMpcValue(val)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${
                            mpcValue === val
                              ? 'bg-emerald-600 text-white border-emerald-400'
                              : 'bg-slate-900 text-slate-300 border-slate-700'
                          }`}
                        >
                          {val}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="h-64 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={multiplierRounds} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="round" stroke="#64748b" tick={{ fontSize: 11 }} />
                        <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                        <Area type="monotone" dataKey="cumulative" name="Cumulative Income (₹ Cr)" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
                        <Area type="monotone" dataKey="injection" name="Round Spending (₹ Cr)" stroke="#10b981" fill="#10b981" fillOpacity={0.4} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* ── LAB 5: GAP DIAGNOSIS & POLICY SIMULATOR ── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Full Employment Capacity (Yf):</span>
                      <span className="font-mono text-purple-400 font-bold">₹{fullEmpOutput} Cr</span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={3000}
                      step={100}
                      value={fullEmpOutput}
                      onChange={(e) => handleSliderChange(setFullEmpOutput, +e.target.value)}
                      className="w-full accent-purple-500"
                      aria-label="Full Employment Output"
                    />

                    <div className="border-t border-slate-800 pt-3 space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Fiscal Tool: Govt Spending (G)</span>
                        <span className="font-mono text-emerald-400 font-bold">₹{govSpending} Cr</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={500}
                        step={25}
                        value={govSpending}
                        onChange={(e) => handleSliderChange(setGovSpending, +e.target.value)}
                        className="w-full accent-emerald-500"
                        aria-label="Fiscal Policy Spending"
                      />

                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Monetary Tool: RBI Repo Rate</span>
                        <span className="font-mono text-amber-400 font-bold">{repoRate}%</span>
                      </div>
                      <input
                        type="range"
                        min={4.0}
                        max={9.0}
                        step={0.25}
                        value={repoRate}
                        onChange={(e) => {
                          const rate = +e.target.value;
                          setRepoRate(rate);
                          setAutoInvestment(Math.round(400 - (rate - 4) * 40));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500"
                        aria-label="RBI Repo Rate"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-slate-400">Macroeconomic Assessment:</div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Equilibrium Output (Y*):</span>
                          <span className="font-mono font-bold text-white">₹{equilibriumY} Cr</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Full Employment (Yf):</span>
                          <span className="font-mono font-bold text-purple-400">₹{fullEmpOutput} Cr</span>
                        </div>
                        <div className="flex justify-between text-xs border-t border-slate-800 pt-1">
                          <span>Gap Status:</span>
                          <span className={`font-mono font-bold ${gapValue > 50 ? 'text-rose-400' : gapValue < -50 ? 'text-blue-400' : 'text-emerald-400'}`}>
                            {gapValue > 50
                              ? `Inflationary Gap (+₹${gapValue} Cr)`
                              : gapValue < -50
                              ? `Deflationary Gap (-₹${Math.abs(gapValue)} Cr)`
                              : 'Full Employment Equilibrium ✨'}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-300 leading-relaxed">
                        {gapValue > 50 ? (
                          <span className="text-rose-300">
                            🔥 <strong>Excess Demand:</strong> Factories are straining beyond capacity. CPI inflation is rising. Apply contractionary fiscal policy (cut G) and hike the RBI repo rate.
                          </span>
                        ) : gapValue < -50 ? (
                          <span className="text-blue-300">
                            ❄️ <strong>Deficient Demand:</strong> Involuntary unemployment is rising. Apply expansionary fiscal stimulus (boost G/capex) and lower the RBI repo rate.
                          </span>
                        ) : (
                          <span className="text-emerald-300">
                            🎯 <strong>Optimal Balance:</strong> Real output equals maximum non-inflationary capacity (Y* = Yf).
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                      <span>Multiplier k = {multiplierK}×</span>
                      <span>Required ΔG to close = {Math.abs(Math.round(gapValue / multiplierK))} Cr</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs font-mono text-slate-400">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.section>
      )}

      {/* ── 3. FREE PLAY SANDBOX MODE ── */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-emerald-400">🧪 Macroeconomic Policy Sandbox</h2>
              <p className="text-xs text-slate-400 mt-0.5">Test any variable combination freely. No grading or penalties.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg flex items-center gap-2"
            >
              <span>Ready for Board Challenges</span>
              <span>→</span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Autonomous (a): ₹{autoConsumption} Cr</label>
              <input
                type="range"
                min={50}
                max={300}
                step={25}
                value={autoConsumption}
                onChange={(e) => handleSliderChange(setAutoConsumption, +e.target.value)}
                className="w-full accent-emerald-500"
                aria-label="Autonomous Consumption"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Investment (I): ₹{autoInvestment} Cr</label>
              <input
                type="range"
                min={50}
                max={500}
                step={25}
                value={autoInvestment}
                onChange={(e) => handleSliderChange(setAutoInvestment, +e.target.value)}
                className="w-full accent-blue-500"
                aria-label="Investment"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Govt Capex (G): ₹{govSpending} Cr</label>
              <input
                type="range"
                min={0}
                max={400}
                step={25}
                value={govSpending}
                onChange={(e) => handleSliderChange(setGovSpending, +e.target.value)}
                className="w-full accent-purple-500"
                aria-label="Govt Spending"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400">MPC (b): {mpcValue}</label>
              <input
                type="range"
                min={0.2}
                max={0.9}
                step={0.05}
                value={mpcValue}
                onChange={(e) => handleSliderChange(setMpcValue, +e.target.value)}
                className="w-full accent-amber-500"
                aria-label="MPC"
              />
            </div>
          </div>

          <div className="h-64 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="income" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                <Line type="monotone" dataKey="asLine" name="45° AS Line" stroke="#64748b" strokeDasharray="3 3" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="adLine" name="AD Curve" stroke="#10b981" dot={false} strokeWidth={3} />
                <ReferenceLine x={equilibriumY} stroke="#38bdf8" strokeDasharray="3 3" label={{ value: `Y* = ₹${equilibriumY}`, fill: '#38bdf8', fontSize: 10 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.section>
      )}

      {/* ── 4. CHALLENGE PHASE ── */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Question {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 uppercase">
                  {activeChallenge.competencyLevel}
                </span>
              </div>
              <div className="h-1.5 w-48 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-400">Errors: <span className="text-rose-400 font-bold">{errors}</span></span>
              <span className="text-slate-400">Score: <span className="text-emerald-400 font-bold">{Math.max(0, 100 - errors * 5)}%</span></span>
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-base font-semibold text-white leading-relaxed">{activeChallenge.question}</h3>

            {/* A. MCQ RENDERING */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="space-y-3">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                      wrongFlash
                        ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold opacity-60 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* B. DRAG-LABEL RENDERING */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 text-white rounded-lg cursor-grab text-xs font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center">
                  <svg viewBox="0 0 400 240" className="w-full max-w-lg h-60">
                    <line x1="40" y1="200" x2="360" y2="200" stroke="#64748b" strokeWidth="2" />
                    <line x1="40" y1="200" x2="40" y2="20" stroke="#64748b" strokeWidth="2" />

                    <line x1="40" y1="200" x2="320" y2="40" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="2" />
                    <g
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('cross_45')}
                      className="cursor-pointer"
                    >
                      <rect x="230" y="25" width="160" height="26" rx={4} fill="#1e293b" stroke="#475569" />
                      <text x="310" y="42" fill="#38bdf8" fontSize="9" textAnchor="middle">
                        {droppedLabels.cross_45 || 'Drop 45° Line Here'}
                      </text>
                    </g>

                    <line x1="40" y1="140" x2="360" y2="70" stroke="#10b981" strokeWidth="3" />
                    <g
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('cross_ad')}
                      className="cursor-pointer"
                    >
                      <rect x="230" y="80" width="160" height="26" rx={4} fill="#1e293b" stroke="#475569" />
                      <text x="310" y="97" fill="#34d399" fontSize="9" textAnchor="middle">
                        {droppedLabels.cross_ad || 'Drop AD Line Here'}
                      </text>
                    </g>

                    <g
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('cross_int')}
                      className="cursor-pointer"
                    >
                      <rect x="5" y="125" width="150" height="26" rx={4} fill="#1e293b" stroke="#475569" />
                      <text x="80" y="142" fill="#fbbf24" fontSize="9" textAnchor="middle">
                        {droppedLabels.cross_int || 'Drop Intercept Here'}
                      </text>
                    </g>

                    <circle cx="200" cy="105" r={6} fill="#f43f5e" />
                    <g
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('cross_eq')}
                      className="cursor-pointer"
                    >
                      <rect x="130" y="65" width="140" height="26" rx={4} fill="#1e293b" stroke="#475569" />
                      <text x="200" y="82" fill="#f43f5e" fontSize="9" textAnchor="middle">
                        {droppedLabels.cross_eq || 'Drop Equilibrium E*'}
                      </text>
                    </g>
                  </svg>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                  >
                    Check Diagram Labels
                  </motion.button>
                </div>
              </div>
            )}

            {/* C. DRAG-SORT RENDERING */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items or arrange into the correct sequential order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center font-mono text-[10px] font-bold text-slate-300">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                  >
                    Check Process Sequence
                  </motion.button>
                </div>
              </div>
            )}

            {/* D. NUMERIC RENDERING */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-indigo-500 outline-none"
                  />
                  <span className="text-xs font-mono text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* E. CONSTRUCT EQUATION RENDERING */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Click mathematical terms to construct the equation:</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-lg text-xs font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-indigo-900/80 border border-indigo-700 text-indigo-200 rounded-lg text-xs font-mono flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 font-bold hover:text-rose-300 ml-1"
                      >
                        ×
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 font-mono">Workspace empty...</span>
                  )}
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                  >
                    Verify Equation
                  </motion.button>
                </div>
              </div>
            )}

            {/* ── PROGRESSIVE DISCLOSURE EXPLANATION ── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-gradient-to-br from-amber-950/40 to-slate-900 rounded-2xl border border-amber-800/60 space-y-3"
              >
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> Step-by-Step Keynesian Derivation:
                </div>
                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-amber-200/90 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 font-mono mr-1.5">{idx + 1}.</span>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex justify-between items-center pt-3 border-t border-amber-900/40">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Derivation Step →
                    </motion.button>
                  ) : <div />}

                  {revealedSteps >= activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ── 5. COMPLETION & MASTERY PROFILE ── */}
      {phase === 'complete' && (
        <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/60 to-slate-900 rounded-3xl border border-emerald-800/60 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl font-bold text-white">ISC Macroeconomics Simulation Complete!</h2>
            
            {/* Motivational Feedback Header */}
            <div className="inline-block px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-300 font-bold text-sm tracking-wide uppercase">
              {motivationalMessage}
            </div>

            <div className="flex justify-center gap-6 font-mono text-sm pt-2">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-xs">Final Score</div>
                <div className="text-2xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-xs">Mastery Level</div>
                <div className="text-2xl font-bold text-indigo-400 capitalize">{masteryLevel}</div>
              </div>
            </div>

            <p className="text-sm text-emerald-300 max-w-xl mx-auto pt-2">
              {errors === 0
                ? '🌟 Flawless Mastery! You possess deep analytical clarity on Keynesian aggregate demand, the investment multiplier, and counter-cyclical stabilization policy.'
                : errors <= 3
                ? '👏 Outstanding performance! Review your specific misconception breakdown below to lock in a perfect 100% in the ISC board examination.'
                : errors <= 7
                ? '💪 Solid effort! Macroeconomic policy models take practice. Review the step-by-step solutions and rerun the interactive labs.'
                : '🌱 Do not give up — You WILL get this! Re-engage with the interactive labs and practice the multiplier relationships.'}
            </p>
          </div>

          {/* ── SPACED REPETITION VISIBILITY (SRS SCHEDULE CARD) ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-br from-amber-950/50 via-slate-900 to-indigo-950/40 rounded-3xl border border-amber-500/40 shadow-xl space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-500/20 border border-amber-500/30 rounded-xl text-xl">📅</span>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                    Spaced Repetition Schedule (SM-2 Algorithm)
                  </h3>
                  <p className="text-xs text-slate-400">Optimised memory consolidation interval based on your challenge accuracy</p>
                </div>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-xs uppercase tracking-wider">
                Targeted Memory Retention
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-1">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Session Mistakes</div>
                <div className="text-2xl font-mono font-bold text-rose-400">{errors} {errors === 1 ? 'error' : 'errors'}</div>
                <div className="text-[11px] text-slate-400">
                  {errors === 0 ? 'Zero errors detected (Perfect Recall)' : errors <= 3 ? '1 to 3 errors (Solid Foundation)' : '4+ errors (Needs reinforcement)'}
                </div>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-amber-500/40 space-y-1">
                <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">Next Review In</div>
                <div className="text-2xl font-mono font-bold text-amber-300">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </div>
                <div className="text-[11px] text-amber-200/70">
                  Recommended review: <span className="font-semibold text-white">{nextReviewDate}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-1">
                <div className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">Retention Protocol</div>
                <div className="text-xs text-slate-300 font-medium">
                  {errors === 0
                    ? 'Long interval (7 days) scheduled to strengthen permanent neural synaptic pathways.'
                    : errors <= 3
                    ? 'Medium interval (3 days) scheduled to consolidate intermediate multiplier derivations.'
                    : 'Short interval (1 day) scheduled for rapid recall of fundamental AD & propensity identities.'}
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                💡 <span className="text-slate-200 font-medium">SRS Rule:</span> 0 errors = 7 days • 1–3 errors = 3 days • 4+ errors = 1 day
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                Review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </span>
            </div>
          </motion.div>

          {/* Reflection Section */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
              <span>🧠</span> Deep Reflection & Synthesis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-purple-400">1. Surprising Insight</div>
                <p className="text-xs text-slate-300">What was the most surprising thing you learned about how initial spending multiplies across the economy?</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-blue-400">2. Peer Explanation</div>
                <p className="text-xs text-slate-300">How would you explain the difference between an inflationary gap and a deflationary gap to a friend?</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-400">3. Real-World Application</div>
                <p className="text-xs text-slate-300">Where in real life might you use this understanding of RBI interest rate hikes and government fiscal spending?</p>
              </div>
            </div>
          </div>

          {/* Misconception Tracking Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Your Targeted Concept Review Profile:
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-rose-900/50 text-xs space-y-1">
                    <div className="text-rose-300 font-semibold">❌ Trap: {m.misconception}</div>
                    <div className="text-emerald-300">✓ Remedy: {m.correction}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Capstone Activity */}
          <div className="p-6 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <span>🏛️</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-mono font-bold text-indigo-400">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── CONDITIONAL FEEDBACK OVERLAYS ── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Keynesian Model Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_EconomicsExanteplannedDemandSim;
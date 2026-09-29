'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// CONSTANTS & MANDATORY DATA STRUCTURES
// ==========================================

const ALL_NODE_IDS = [
  'c12_eco_cbse_146',
  'c12_eco_cbse_147',
  'c12_eco_cbse_148',
  'c12_eco_cbse_149',
  'c12_eco_cbse_150',
  'c12_eco_cbse_151',
  'c12_eco_cbse_152',
  'c12_eco_cbse_153',
  'c12_eco_cbse_154',
  'c12_eco_cbse_155',
  'c12_eco_cbse_156',
  'c12_eco_cbse_157',
  'c12_eco_cbse_158',
  'c12_eco_cbse_159',
  'c12_eco_cbse_160',
  'c12_eco_cbse_161',
  'c12_eco_cbse_162',
  'c12_eco_cbse_163',
  'c12_eco_cbse_164',
  'c12_eco_cbse_165',
  'c12_eco_cbse_166',
  'c12_eco_cbse_167',
  'c12_eco_cbse_168',
  'c12_eco_cbse_169',
  'c12_eco_cbse_170',
  'c12_eco_cbse_171',
  'c12_eco_cbse_172',
  'c12_eco_cbse_173',
  'c12_eco_cbse_174',
  'c12_eco_cbse_175',
  'c12_eco_cbse_176',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

const SCENARIO = {
  title: 'National Income & Macroeconomic Accounting Lab',
  intro: 'Welcome to the Central Statistical Office (CSO) Macroeconomic Simulation Suite. As Chief Economic Advisor, you are tasked with modeling India’s national accounting aggregates, resolving double-counting paradoxes, calculating Real vs Nominal GDP, and deriving Personal Disposable Income.',
  context: 'You will adjust production sectors, tax regimes, factor remunerations, price indices, and foreign trade balances across multiple economic models to observe how value addition seamlessly balances income generation and aggregate expenditure.',
};

const DISCOVERY_QUESTION = {
  question: 'If a country double its total currency and nominal output prices in a year while physical production of goods and services remains unchanged, what happens to Real GDP and the GDP Deflator?',
  options: [
    'Real GDP doubles; GDP Deflator remains unchanged (100).',
    'Real GDP remains unchanged; GDP Deflator doubles (200).',
    'Both Real GDP and GDP Deflator double.',
    'Real GDP halves while GDP Deflator quadruples.',
  ],
  correctIndex: 1,
  hintAfter: 'Real GDP measures physical volume of output evaluated at constant base year prices, while Nominal GDP reflects current inflated prices. The GDP Deflator scales linearly with current price levels!',
};

const DEFAULT_PROPS = {
  initialNodeId: 'c12_eco_cbse_146' as NodeId,
  onComplete: (score: number) => { console.log(`Completed with score: ${score}`); },
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Circular Flow & Stock vs Flow Dynamics',
    instruction: 'Toggle between 2-Sector, 3-Sector, and 4-Sector models. Adjust Savings (Leakages) and Investment (Injections) to achieve macroeconomic equilibrium where Y = C + I + G + (X - M).',
    interactionType: 'circular-flow-lab',
    nodeId: 'c12_eco_cbse_148' as NodeId,
  },
  {
    title: 'Lab 2: Avoidance of Double Counting & Value Added Method',
    instruction: 'Trace wheat production from Farmer to Mill to Bakery to Consumer. Compare Gross Output sum versus Gross Value Added (GVA) at factor cost and market price.',
    interactionType: 'value-added-lab',
    nodeId: 'c12_eco_cbse_157' as NodeId,
  },
  {
    title: 'Lab 3: Three Methods Equivalence Engine',
    instruction: 'Balance Product Method (GVA), Income Method (CoE + OS + MI), and Expenditure Method (C + I + G + NX). Verify that National Income (NNPfc) is identical across all three approaches.',
    interactionType: 'three-methods-lab',
    nodeId: 'c12_eco_cbse_160' as NodeId,
  },
  {
    title: 'Lab 4: Nominal vs Real GDP & GDP Deflator Simulator',
    instruction: 'Manipulate Base Year prices and Current Year outputs across agricultural and industrial sectors. Calculate GDP Deflator, CPI, and WPI under hyperinflation vs deflation.',
    interactionType: 'gdp-deflator-lab',
    nodeId: 'c12_eco_cbse_169' as NodeId,
  },
  {
    title: 'Lab 5: National Aggregates Bridge & Welfare Analysis',
    instruction: 'Derive Personal Disposable Income (PDI) from GDPmp by navigating Net Factor Income from Abroad (NFIA), Net Indirect Taxes (NIT), Undistributed Profits, and Externalities.',
    interactionType: 'aggregates-bridge-lab',
    nodeId: 'c12_eco_cbse_168' as NodeId,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Net Factor Income from Abroad (NFIA) is negative (-₹500 Cr) and Indirect Taxes exceed Subsidies by ₹1,200 Cr, how will GDP at Market Price compare to National Income (NNP at Factor Cost)?',
    options: [
      'GDPmp will be strictly greater than NNPfc.',
      'GDPmp will be strictly less than NNPfc.',
      'GDPmp will equal NNPfc because factor costs absorb indirect taxes.',
      'Cannot be determined without knowing consumption of fixed capital (depreciation).',
    ],
    correctIndex: 0,
    verifyInstruction: 'Go to Lab 5 (Aggregates Bridge) and set NFIA to -500 and Net Indirect Taxes (NIT) to +1200.',
    nodeId: 'c12_eco_cbse_163' as NodeId,
  },
  {
    question: 'Predict: If planned inventory investment increases by ₹800 Cr, but unplanned inventory decreases by ₹800 Cr due to unexpected surge in demand, what is the net change in total inventory investment?',
    options: [
      'Net inventory investment is ₹0 Cr.',
      'Net inventory investment increases by ₹1,600 Cr.',
      'Net inventory investment decreases by ₹800 Cr.',
      'Gross Domestic Capital Formation drops to zero.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Check inventory breakdown in Lab 3 (Expenditure Method). Total Inventory Change = Planned + Unplanned = +800 + (-800) = 0.',
    nodeId: 'c12_eco_cbse_156' as NodeId,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the GDP Deflator when Nominal GDP rises by 12% while Real GDP grows by 4% in the same period?',
    observableOptions: [
      'GDP Deflator increases by approximately 7.69% (Index goes from 100 to ~107.69).',
      'GDP Deflator drops by 8%.',
      'GDP Deflator remains unchanged at 100.',
      'GDP Deflator increases to 300.',
    ],
    correctIndex: 0,
    nodeId: 'c12_eco_cbse_171' as NodeId,
  },
  {
    question: 'Why does adding sales of intermediate goods directly to final goods in GDP calculation cause the double counting error?',
    observableOptions: [
      'Because the value of intermediate inputs is already embedded inside the final market price of the end product.',
      'Because intermediate goods do not involve cash payments.',
      'Because intermediate goods are produced outside economic territories.',
      'Because intermediate goods are subject to higher net indirect taxes.',
    ],
    correctIndex: 0,
    nodeId: 'c12_eco_cbse_153' as NodeId,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'CSO National Accounts Audit & Green GDP Calculation',
  description: 'As Senior National Accountant for NITI Aayog, you must process the national statistics of a developing economy (Bharat Land) for Fiscal Year 2024-25, adjust for negative environmental externalities, and calculate true Personal Disposable Income.',
  steps: [
    'Step 1: Calculate GDPmp from Gross Value Added (GVA at Basic Prices) = ₹18,000 Cr + Net Product Taxes (₹1,500 Cr). Result GDPmp = ₹19,500 Cr.',
    'Step 2: Convert GDPmp to NNPfc (National Income). Deduct Depreciation (₹1,800 Cr), add NFIA (-₹300 Cr), and deduct Net Indirect Taxes (₹2,200 Cr). NNPfc = 19,500 - 1,800 - 300 - 2,200 = ₹15,200 Cr.',
    'Step 3: Calculate Personal Disposable Income (PDI). Deduct Corporate Taxes (₹1,100 Cr), Undistributed Profits (₹900 Cr), and Net Personal Direct Taxes (₹1,500 Cr), add Personal Transfer Receipts (₹800 Cr). PDI = 15,200 - 1,100 - 900 - 1,500 + 800 = ₹12,500 Cr.',
    'Step 4: Audit Green GDP by deducting Environmental Degradation Cost (₹1,400 Cr). Green GDP = ₹18,100 Cr. Conclude policy report on sustainable economic welfare.',
  ],
};

const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    title: 'Nominal GDP reflects real economic purchasing power growth',
    explanation: 'Nominal GDP can rise purely due to price inflation without any actual increase in physical output. Real GDP isolates quantitative production growth using base year constant prices.',
    correction: 'Real GDP = (Nominal GDP / GDP Deflator) * 100.',
    nodeId: 'c12_eco_cbse_169' as NodeId,
  },
  {
    id: 'misc_2',
    title: 'Intermediate goods should be counted in GDP if sold to another firm',
    explanation: 'Selling flour to a bakery is an intermediate transaction. Counting both the flour sale and the bakery bread sale counts the value of flour twice.',
    correction: 'GDP includes only Final Goods OR Value Added at each stage (Value of Output - Intermediate Consumption).',
    nodeId: 'c12_eco_cbse_153' as NodeId,
  },
  {
    id: 'misc_3',
    title: 'Transfer payments (like pensions or student scholarships) are included in National Income',
    explanation: 'Transfer payments are unilateral payments without any corresponding flow of factor services or current production of goods/services.',
    correction: 'Only factor payments (Wages, Rent, Interest, Profit) earned by factors of production are included in National Income (NNPfc).',
    nodeId: 'c12_eco_cbse_147' as NodeId,
  },
  {
    id: 'misc_4',
    title: 'GDP measures total social welfare and economic happiness',
    explanation: 'GDP ignores income inequality, non-market household transactions, leisure quality, and negative externalities (e.g., environmental pollution).',
    correction: 'Higher GDP does not guarantee higher welfare if accompanied by severe pollution or extreme wealth disparity.',
    nodeId: 'c12_eco_cbse_174' as NodeId,
  },
  {
    id: 'misc_5',
    title: 'Depreciation is identical to capital loss from natural disasters',
    explanation: 'Depreciation (Consumption of Fixed Capital) is expected wear and tear and foreseen obsolescence during normal production. Capital loss from disasters is unforeseen loss.',
    correction: 'Capital loss from earthquakes/accidents is not included in depreciation allocations.',
    nodeId: 'c12_eco_cbse_154' as NodeId,
  },
  {
    id: 'misc_6',
    title: 'Factor Cost and Market Price are always equal',
    explanation: 'Market Price includes indirect taxes paid to government and excludes subsidies received from government.',
    correction: 'Market Price = Factor Cost + Indirect Taxes - Subsidies = Factor Cost + Net Indirect Taxes (NIT).',
    nodeId: 'c12_eco_cbse_161' as NodeId,
  },
];

// ==========================================
// TYPES AND INTERFACES
// ==========================================

export interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'classification' | 'matching';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'Recall' | 'Understanding' | 'Application' | 'Analysis' | 'Evaluation';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  matchingPairs?: { left: string; right: string }[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

export interface DiagnosticQuestion {
  id: string;
  nodeId: NodeId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// ==========================================
// 22+ CHALLENGES ARRAY ACROSS 3 TIERS
// ==========================================

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'chal_f1',
    nodeId: 'c12_eco_cbse_146',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following is studied under Macroeconomics rather than Microeconomics?',
    options: ['Price determination of a single mobile phone', 'Equilibrium output of a wheat farm', 'National Income of India', 'Wage rate in a local restaurant'],
    correctIndex: 2,
    explanation: 'Macroeconomics examines economy-wide aggregates such as National Income, total employment, and aggregate price levels.',
    hints: ['Microeconomics focuses on individual consumers/firms.', 'Look for aggregate country-wide variables.', 'National Income represents the total economic activity of a nation.'],
  },
  {
    id: 'chal_f2',
    nodeId: 'c12_eco_cbse_147',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the remuneration earned by Capital as a factor of production?',
    options: ['Wages & Salaries', 'Rent', 'Interest', 'Profit'],
    correctIndex: 2,
    explanation: 'Land receives Rent, Labour receives Wages, Capital earns Interest, and Entrepreneurship earns Profit.',
    hints: ['Labour receives wages.', 'Land receives rent.', 'Capital invested yields interest returns.'],
  },
  {
    id: 'chal_f3',
    nodeId: 'c12_eco_cbse_149',
    type: 'classification',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Classify "Wealth of a Household" and "Monthly Income of a Worker" into Stock and Flow variables.',
    options: ['Wealth = Stock, Income = Flow', 'Wealth = Flow, Income = Stock', 'Both are Stock variables', 'Both are Flow variables'],
    correctIndex: 0,
    explanation: 'Stock is measured at a specific point in time (Wealth on March 31). Flow is measured over a period of time (Income per month).',
    hints: ['Ask yourself: Is this measured per month or at a specific moment?', 'Wealth is stored value at a point in time.', 'Income flows continuously over time.'],
  },
  {
    id: 'chal_f4',
    nodeId: 'c12_eco_cbse_150',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Car purchased by a taxi operator for commercial passenger service is classified as:',
    options: ['Intermediate Good', 'Final Capital Good', 'Consumer Durable Good', 'Unplanned Inventory'],
    correctIndex: 1,
    explanation: 'It is used repeatedly in production over several years by a producer, making it a final capital good.',
    hints: ['Is it resold in the same year or used repeatedly?', 'It is bought by a enterprise to render services.', 'Assets used for long-term production are Capital Goods.'],
  },
  {
    id: 'chal_f5',
    nodeId: 'c12_eco_cbse_154',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Consumption of fixed capital is the technical economic term for:',
    options: ['Net Indirect Taxes', 'Depreciation', 'Subsidies', 'Capital Gain'],
    correctIndex: 1,
    explanation: 'Depreciation represents the loss of value of fixed assets due to normal wear, tear, and expected obsolescence.',
    hints: ['It reflects physical wear and tear of machinery.', 'Gross Asset - Depreciation = Net Asset.', 'Consumption of fixed capital reduces Gross to Net.'],
  },
  {
    id: 'chal_f6',
    nodeId: 'c12_eco_cbse_161',
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'Application',
    question: 'Given Factor Cost (FC) = ₹800 Cr, Indirect Taxes = ₹120 Cr, and Subsidies = ₹30 Cr. Calculate Market Price (MP) in ��� Cr.',
    correctAnswer: 890,
    tolerance: 1,
    unit: '₹ Cr',
    explanation: 'Market Price (MP) = Factor Cost (FC) + Net Indirect Taxes (NIT). NIT = 120 - 30 = 90. MP = 800 + 90 = ₹890 Cr.',
    hints: ['Formula: MP = FC + Indirect Taxes - Subsidies.', 'Net Indirect Taxes (NIT) = Indirect Taxes - Subsidies.', '800 + 120 - 30 = 890.'],
  },
  {
    id: 'chal_f7',
    nodeId: 'c12_eco_cbse_162',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Gross Domestic Product (GDP) measures goods and services produced:',
    options: ['By citizens of a nation anywhere in the world', 'Within the domestic territory of a nation during a given year', 'Only by government-owned enterprises', 'Exclusively for export markets'],
    correctIndex: 1,
    explanation: 'GDP is a territorial concept referring to output produced inside the economic boundary of a country.',
    hints: ['Look at the keyword "Domestic".', 'Domestic territory defines physical production boundary.', 'Citizen ownership is GNP, territory is GDP.'],
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'chal_s1',
    nodeId: 'c12_eco_cbse_153',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A farmer sells wheat for ₹500 to a miller. Miller converts it to flour and sells to a baker for ₹800. Baker bakes bread and sells to consumers for ₹1,200. Calculate Gross Value Added (GVA) across all stages in ₹.',
    correctAnswer: 1200,
    tolerance: 1,
    unit: '₹',
    explanation: 'GVA = Stage 1 (500 - 0) + Stage 2 (800 - 500) + Stage 3 (1200 - 800) = 500 + 300 + 400 = ₹1,200. Equal to final bread value!',
    hints: ['GVA = Value of Output - Intermediate Consumption at each step.', 'Farmer GVA = 500. Miller GVA = 300. Baker GVA = 400.', 'Sum of GVA equals final product value (1,200).'],
    misconceptionIndex: 1,
  },
  {
    id: 'chal_s2',
    nodeId: 'c12_eco_cbse_155',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Gross Fixed Capital Formation = ₹2,500 Cr, Change in Stocks (Inventories) = ₹300 Cr, Depreciation = ₹400 Cr. Calculate Net Investment in ₹ Cr.',
    correctAnswer: 2400,
    tolerance: 1,
    unit: '₹ Cr',
    explanation: 'Gross Investment = Gross Fixed Capital Formation + Change in Stocks = 2500 + 300 = ₹2,800 Cr. Net Investment = Gross Investment - Depreciation = 2800 - 400 = ₹2,400 Cr.',
    hints: ['Gross Investment includes Gross Fixed Investment PLUS stock change.', 'Gross Investment = 2500 + 300 = 2800.', 'Net Investment = Gross Investment - Depreciation.'],
  },
  {
    id: 'chal_s3',
    nodeId: 'c12_eco_cbse_158',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Calculate GDPmp using Expenditure Method: Private Final Consumption = ₹6,000 Cr, Govt Final Consumption = ₹2,000 Cr, Gross Capital Formation = ₹1,500 Cr, Exports = ₹400 Cr, Imports = ₹600 Cr.',
    correctAnswer: 9300,
    tolerance: 1,
    unit: '₹ Cr',
    explanation: 'GDPmp = C + G + I + (X - M) = 6000 + 2000 + 1500 + (400 - 600) = 9500 - 200 = ₹9,300 Cr.',
    hints: ['Formula: GDPmp = C + I + G + Net Exports (X - M).', 'Net Exports = Exports (400) - Imports (600) = -200.', '6000 + 2000 + 1500 - 200 = 9300.'],
  },
  {
    id: 'chal_s4',
    nodeId: 'c12_eco_cbse_159',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Calculate NDPfc (NDP at factor cost) using Income Method: Compensation of Employees = ₹4,500 Cr, Rent = ₹800 Cr, Interest = ₹600 Cr, Profit = ₹1,100 Cr, Mixed Income of Self-Employed = ₹1,200 Cr.',
    correctAnswer: 8200,
    tolerance: 1,
    unit: '₹ Cr',
    explanation: 'NDPfc = CoE + Operating Surplus (Rent + Interest + Profit) + Mixed Income = 4500 + (800 + 600 + 1100) + 1200 = 4500 + 2500 + 1200 = ₹8,200 Cr.',
    hints: ['Operating Surplus = Rent + Interest + Profit = 2500.', 'NDPfc = CoE + Operating Surplus + Mixed Income.', '4500 + 2500 + 1200 = 8200.'],
  },
  {
    id: 'chal_s5',
    nodeId: 'c12_eco_cbse_163',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'If GDPmp = ₹10,500 Cr, Net Factor Income from Abroad (NFIA) = -₹200 Cr, calculate GNPmp in ₹ Cr.',
    correctAnswer: 10300,
    tolerance: 1,
    unit: '₹ Cr',
    explanation: 'GNPmp = GDPmp + NFIA = 10500 + (-200) = ₹10,300 Cr.',
    hints: ['Formula: GNP = GDP + NFIA.', 'NFIA is negative, so GNP will be smaller than GDP.', '10500 - 200 = 10300.'],
  },
  {
    id: 'chal_s6',
    nodeId: 'c12_eco_cbse_169',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Nominal GDP of an economy in 2024 is ₹14,000 Cr. If the GDP Deflator is 140 (Base Year 2018 = 100), calculate Real GDP in ₹ Cr.',
    correctAnswer: 10000,
    tolerance: 1,
    unit: '₹ Cr',
    explanation: 'Real GDP = (Nominal GDP / GDP Deflator) * 100 = (14000 / 140) * 100 = ₹10,000 Cr.',
    hints: ['GDP Deflator = (Nominal GDP / Real GDP) * 100.', 'Rearrange: Real GDP = (Nominal GDP / GDP Deflator) * 100.', '14000 / 1.4 = 10000.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal_s7',
    nodeId: 'c12_eco_cbse_167',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'National Income (NNPfc) = ₹12,000 Cr. Undistributed Corporate Profits = ₹500 Cr, Corporate Tax = ₹400 Cr, Net Transfer Payments to Households = ₹700 Cr. Calculate Personal Income (PI) in ₹ Cr.',
    correctAnswer: 11800,
    tolerance: 1,
    unit: '₹ Cr',
    explanation: 'PI = NNPfc - Undistributed Profits - Corporate Taxes + Transfer Payments = 12000 - 500 - 400 + 700 = ₹11,800 Cr.',
    hints: ['Corporate taxes and retained earnings do not reach households.', 'Transfer payments are added to household income.', '12000 - 500 - 400 + 700 = 11800.'],
  },
  {
    id: 'chal_s8',
    nodeId: 'c12_eco_cbse_168',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Personal Income (PI) = ₹11,800 Cr. Personal Direct Income Taxes paid = ₹1,200 Cr, Miscellaneous fines & fees = ₹100 Cr. Calculate Personal Disposable Income (PDI) in ₹ Cr.',
    correctAnswer: 10500,
    tolerance: 1,
    unit: '₹ Cr',
    explanation: 'PDI = Personal Income - Direct Personal Taxes - Fines/Fees = 11800 - 1200 - 100 = ₹10,500 Cr.',
    hints: ['PDI is the actual income households are free to consume or save.', 'Subtract personal taxes and compulsory fines from PI.', '11800 - 1200 - 100 = 10500.'],
  },

  // --- ADVANCED TIER (7+ Challenges) ---
  {
    id: 'chal_a1',
    nodeId: 'c12_eco_cbse_165',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Given GDPmp = ₹20,000 Cr, Depreciation = ₹1,500 Cr, Indirect Taxes = ₹2,400 Cr, Subsidies = ₹600 Cr, Factor Income earned from Abroad = ₹800 Cr, Factor Income paid to Abroad = ₹1,100 Cr. Derive National Income (NNPfc) in ₹ Cr.',
    correctAnswer: 16400,
    tolerance: 1,
    unit: '₹ Cr',
    explanation: 'NFIA = 800 - 1100 = -300 Cr. NIT = 2400 - 600 = 1800 Cr. NNPfc = GDPmp - Depreciation + NFIA - NIT = 20000 - 1500 + (-300) - 1800 = ₹16,400 Cr.',
    hints: ['Calculate NFIA = Income from abroad - Income to abroad = -300.', 'Calculate NIT = Indirect Taxes - Subsidies = 1800.', 'NNPfc = 20000 - 1500 - 300 - 1800 = 16400.'],
  },
  {
    id: 'chal_a2',
    nodeId: 'c12_eco_cbse_171',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In Year 1 (Base Year), Nominal GDP was ₹5,000 Cr (Deflator = 100). In Year 2, Nominal GDP grew to ₹7,200 Cr while Real GDP grew by 20% over Year 1. Calculate the GDP Deflator in Year 2.',
    correctAnswer: 120,
    tolerance: 0.5,
    unit: 'Index',
    explanation: 'Year 1 Real GDP = ₹5,000 Cr. Year 2 Real GDP = 5000 * 1.20 = ₹6,000 Cr. Year 2 GDP Deflator = (Nominal GDP / Real GDP) * 100 = (7200 / 6000) * 100 = 120.',
    hints: ['Find Year 2 Real GDP: 5000 * 1.20 = 6000 Cr.', 'Deflator Formula = (7200 / 6000) * 100.', '7200 / 6000 = 1.2 -> 120.'],
  },
  {
    id: 'chal_a3',
    nodeId: 'c12_eco_cbse_160',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Economy X has Output Value = ₹15,000 Cr, Intermediate Consumption = ₹6,000 Cr, Depreciation = ₹800 Cr, Net Indirect Taxes = ₹1,000 Cr. Factor payments: Compensation of Employees = ₹4,200 Cr, Rent = ₹1,200 Cr, Interest = ₹800 Cr. What must be the total Profit earned by entrepreneurs to ensure Product Method equals Income Method for NDPfc?',
    correctAnswer: 1000,
    tolerance: 1,
    unit: '₹ Cr',
    explanation: 'GDPmp = 15000 - 6000 = 9000 Cr. NDPfc = GDPmp - Depreciation - NIT = 9000 - 800 - 1000 = ₹7,200 Cr. Income Method NDPfc = CoE (4200) + Rent (1200) + Interest (800) + Profit = 6200 + Profit. Thus 6200 + Profit = 7200 -> Profit = ₹1,000 Cr.',
    hints: ['Find Product Method NDPfc first = (15000 - 6000) - 800 - 1000 = 7200.', 'Income Method NDPfc = 4200 + 1200 + 800 + Profit = 6200 + Profit.', 'Profit = 7200 - 6200 = 1000.'],
  },
  {
    id: 'chal_a4',
    nodeId: 'c12_eco_cbse_174',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'A country experiences a 10% increase in Real GDP due to heavy chemical manufacturing expansion, but environmental pollution spikes, damaging public health. Which limitation of GDP as a welfare index is highlighted?',
    options: ['Non-monetary exchanges', 'Negative Externalities', 'Distribution of GDP', 'Composition of GDP'],
    correctIndex: 1,
    explanation: 'Negative externalities are harmful side effects (pollution) borne by third parties that are not factored into market prices or deducted from GDP calculations.',
    hints: ['Pollution causes harm not deducted in traditional GDP.', 'Unpriced side effects are called Externalities.', 'Because cost to health isn\'t subtracted, GDP overstates net welfare.'],
    misconceptionIndex: 3,
  },
  {
    id: 'chal_a5',
    nodeId: 'c12_eco_cbse_156',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'At the start of the year, a firm holds ₹400 Cr inventory. Planned end-of-year inventory is ₹600 Cr. However, sales surge unexpectedly, and actual ending inventory is ₹350 Cr. Calculate Unplanned Inventory Change in ₹ Cr.',
    correctAnswer: -250,
    tolerance: 1,
    unit: '₹ Cr',
    explanation: 'Planned Change = 600 - 400 = +200 Cr. Actual Change = 350 - 400 = -50 Cr. Actual Change = Planned Change + Unplanned Change -> -50 = 200 + Unplanned -> Unplanned = -250 Cr.',
    hints: ['Actual total inventory change = 350 - 400 = -50 Cr.', 'Planned inventory change = 600 - 400 = +200 Cr.', 'Unplanned change = Actual change - Planned change = -50 - 200 = -250 Cr.'],
  },
  {
    id: 'chal_a6',
    nodeId: 'c12_eco_cbse_166',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'NDPfc = ₹14,000 Cr. Income from domestic product accruing to private sector = ₹11,500 Cr, NFIA = -₹100 Cr, National Debt Interest = ₹400 Cr, Current Transfers from Govt = ₹300 Cr, Net Current Transfers from ROW = ₹200 Cr. Calculate Private Income in ₹ Cr.',
    correctAnswer: 12300,
    tolerance: 1,
    unit: '₹ Cr',
    explanation: 'Private Income = Income from domestic product accruing to private sector + NFIA + National Debt Interest + Current transfers from Govt + Current transfers from ROW = 11500 + (-100) + 400 + 300 + 200 = ₹12,300 Cr.',
    hints: ['Private income includes factor income + transfer incomes earned/received by private sector.', '11500 - 100 + 400 + 300 + 200.', 'Sum equals 12300.'],
  },
  {
    id: 'chal_a7',
    nodeId: 'c12_eco_cbse_172',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Base Year Consumer Price Index (CPI) = 100. Current CPI = 175. If a worker earned a salary of ₹20,000 in the base year, what nominal salary must they earn in the current year to maintain the exact same real purchasing power?',
    correctAnswer: 35000,
    tolerance: 1,
    unit: '₹',
    explanation: 'Required Nominal Salary = Base Salary * (Current CPI / Base CPI) = 20000 * (175 / 100) = ₹35,000.',
    hints: ['To maintain real income, nominal salary must scale proportionally with CPI.', 'Multiply base salary by 1.75.', '20000 * 1.75 = 35000.'],
  },
];

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    nodeId: 'c12_eco_cbse_148',
    question: 'In a 2-sector circular flow economy (Households and Firms), what guarantees that Total Output equals Total Income?',
    options: ['Government price controls', 'All factor payments earned by households are spent on firm outputs', 'Foreign trade subsidies', 'Central Bank money minting'],
    correctIndex: 1,
    explanation: 'In a simple 2-sector model without savings or government, revenue of firms equals factor payments paid, which equals consumer spending.',
  },
  {
    id: 'diag_2',
    nodeId: 'c12_eco_cbse_150',
    question: 'Which of the following determines whether a good is final or intermediate?',
    options: ['The chemical nature of the product', 'The end-use of the product by the buyer', 'Whether the price exceeds ₹1,000', 'Whether it is imported or exported'],
    correctIndex: 1,
    explanation: 'End-use determines classification. Sugar bought by a household is final consumption; sugar bought by a sweet shop is intermediate input.',
  },
  {
    id: 'diag_3',
    nodeId: 'c12_eco_cbse_154',
    question: 'Unforeseen destruction of a factory building due to a sudden flood is classified as:',
    options: ['Consumption of fixed capital', 'Depreciation reserve fund deduction', 'Capital Loss', 'Planned inventory change'],
    correctIndex: 2,
    explanation: 'Unforeseen destruction due to natural calamities is Capital Loss, NOT depreciation.',
  },
  {
    id: 'diag_4',
    nodeId: 'c12_eco_cbse_161',
    question: 'If Net Indirect Taxes (NIT) are negative (Subsidies > Indirect Taxes), how does Factor Cost (FC) compare to Market Price (MP)?',
    options: ['Factor Cost > Market Price', 'Factor Cost < Market Price', 'Factor Cost = Market Price', 'Factor Cost becomes zero'],
    correctIndex: 0,
    explanation: 'MP = FC + NIT. If NIT is negative, MP = FC - |NIT|, so FC > MP.',
  },
  {
    id: 'diag_5',
    nodeId: 'c12_eco_cbse_163',
    question: 'When is Gross Domestic Product (GDP) equal to Gross National Product (GNP)?',
    options: ['When Net Indirect Taxes are zero', 'When Net Factor Income from Abroad (NFIA) is zero', 'When Depreciation is zero', 'When Exports equal Imports'],
    correctIndex: 1,
    explanation: 'GNP = GDP + NFIA. If NFIA = 0, GNP = GDP.',
  },
  {
    id: 'diag_6',
    nodeId: 'c12_eco_cbse_169',
    question: 'If Real GDP is increasing while Nominal GDP is constant, what must be happening to the overall price level?',
    options: ['Prices are rising (Inflation)', 'Prices are falling (Deflation)', 'Prices are constant', 'Price level cannot be determined'],
    correctIndex: 1,
    explanation: 'Nominal = Real * (Deflator/100). If Nominal is constant and Real rises, Deflator (price level) must fall.',
  },
  {
    id: 'diag_7',
    nodeId: 'c12_eco_cbse_170',
    question: 'What is the primary requirement for selecting a Base Year for GDP measurement?',
    options: ['It must be a year of high inflation', 'It must be a normal year free from major economic shocks or anomalies', 'It must be exactly 10 years ago', 'It must be a year with high budget deficit'],
    correctIndex: 1,
    explanation: 'A base year must be a normal economic year without severe droughts, wars, or panics.',
  },
  {
    id: 'diag_8',
    nodeId: 'c12_eco_cbse_174',
    question: 'Which of the following non-monetary transactions is excluded from GDP, leading to an underestimation of real welfare?',
    options: ['Salaries paid to software engineers', 'Services rendered by homemakers within households', 'Sale of commercial trucks', 'Export of agricultural products'],
    correctIndex: 1,
    explanation: 'Non-marketed domestic work (like house care by family members) is excluded due to valuation difficulties, understating GDP.',
  },
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

const CircularFlowDiagram: React.FC<{ sectors: number; leakage: number; injection: number }> = ({ sectors, leakage, injection }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-xl flex flex-col items-center">
      <h4 className="text-sm font-semibold text-gold-400 mb-2">Interactive Circular Flow Model ({sectors}-Sector Economy)</h4>
      <svg viewBox="0 0 600 360" className="w-full max-w-lg h-64">
        {/* Outer Circular Path */}
        <circle cx="300" cy="180" r="130" fill="none" stroke="#334155" strokeWidth="4" strokeDasharray="6 6" />

        {/* Sector Nodes */}
        {/* Households */}
        <g transform="translate(140, 180)">
          <rect x="-60" y="-30" width="120" height="60" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <text x="0" y="-5" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Households</text>
          <text x="0" y="14" textAnchor="middle" fill="#94a3b8" fontSize="10">Factor Owners</text>
        </g>

        {/* Firms */}
        <g transform="translate(460, 180)">
          <rect x="-60" y="-30" width="120" height="60" rx="10" fill="#1e293b" stroke="#4ade80" strokeWidth="2" />
          <text x="0" y="-5" textAnchor="middle" fill="#4ade80" fontSize="13" fontWeight="bold">Firms</text>
          <text x="0" y="14" textAnchor="middle" fill="#94a3b8" fontSize="10">Producers</text>
        </g>

        {/* 3rd Sector: Government */}
        {sectors >= 3 && (
          <g transform="translate(300, 70)">
            <rect x="-55" y="-25" width="110" height="50" rx="8" fill="#1e293b" stroke="#facc15" strokeWidth="2" />
            <text x="0" y="-2" textAnchor="middle" fill="#facc15" fontSize="12" fontWeight="bold">Government</text>
            <text x="0" y="14" textAnchor="middle" fill="#94a3b8" fontSize="9">Taxes & Transfers</text>
          </g>
        )}

        {/* 4th Sector: Rest of World */}
        {sectors >= 4 && (
          <g transform="translate(300, 290)">
            <rect x="-55" y="-25" width="110" height="50" rx="8" fill="#1e293b" stroke="#c084fc" strokeWidth="2" />
            <text x="0" y="-2" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="bold">Rest of World</text>
            <text x="0" y="14" textAnchor="middle" fill="#94a3b8" fontSize="9">Exports / Imports</text>
          </g>
        )}

        {/* Real Flow Top */}
        <path d="M 180 150 Q 300 100 420 150" fill="none" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
        <text x="300" y="115" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="500">Factor Services (Land, Labour, Capital)</text>

        {/* Money Flow Bottom */}
        <path d="M 420 210 Q 300 260 180 210" fill="none" stroke="#4ade80" strokeWidth="3" markerEnd="url(#arrow)" />
        <text x="300" y="248" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="500">Factor Payments (Wages, Rent, Int, Profit)</text>

        {/* Leakage Arrow (Financial Market) */}
        {leakage > 0 && (
          <g transform="translate(140, 260)">
            <path d="M 0 0 L 0 50 L 50 50" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
            <text x="25" y="65" fill="#ef4444" fontSize="10" textAnchor="middle">Leakage (Savings ₹{leakage})</text>
          </g>
        )}

        {/* Injection Arrow */}
        {injection > 0 && (
          <g transform="translate(460, 260)">
            <path d="M 50 50 L 0 50 L 0 0" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="3 3" />
            <text x="25" y="65" fill="#22c55e" fontSize="10" textAnchor="middle">Injection (Investment ₹{injection})</text>
          </g>
        )}

        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

const NationalIncomeAggregatesTree: React.FC<{
  gdpMp: number;
  depreciation: number;
  nfia: number;
  nit: number;
  corporateTax: number;
  undistributedProfit: number;
  personalTax: number;
}> = ({ gdpMp, depreciation, nfia, nit, corporateTax, undistributedProfit, personalTax }) => {
  const gnpMp = gdpMp + nfia;
  const ndpMp = gdpMp - depreciation;
  const nnpMp = gnpMp - depreciation;
  const nnpFc = nnpMp - nit; // National Income
  const privateIncome = nnpFc + 400; // standard mock transfer addition
  const personalIncome = privateIncome - corporateTax - undistributedProfit;
  const pdi = personalIncome - personalTax;

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
      <h4 className="text-sm font-semibold text-emerald-400 mb-3 text-center">Interactive National Income Aggregates Waterfall Bridge</h4>
      <div className="flex flex-col space-y-3 min-w-[600px]">
        {/* GDPmp Row */}
        <div className="flex items-center justify-between bg-slate-800 p-2.5 rx-lg rounded-lg border-l-4 border-gold-500">
          <span className="text-gold-300 font-bold text-sm">Gross Domestic Product at Market Price (GDPmp)</span>
          <span className="text-gold-200 font-mono text-base font-bold">₹{gdpMp.toLocaleString()} Cr</span>
        </div>

        {/* Adjustments Level 1 */}
        <div className="grid grid-cols-2 gap-3 pl-4 text-xs">
          <div className="bg-slate-800/80 p-2 rounded border border-slate-700">
            <span className="text-slate-400">(-) Depreciation: </span>
            <span className="text-rose-400 font-bold">₹{depreciation} Cr</span>
            <div className="text-slate-200 font-mono font-semibold mt-1">NDPmp = ₹{ndpMp.toLocaleString()} Cr</div>
          </div>
          <div className="bg-slate-800/80 p-2 rounded border border-slate-700">
            <span className="text-slate-400">(+) NFIA: </span>
            <span className="text-emerald-400 font-bold">₹{nfia} Cr</span>
            <div className="text-slate-200 font-mono font-semibold mt-1">GNPmp = ₹{gnpMp.toLocaleString()} Cr</div>
          </div>
        </div>

        {/* NNPmp Row */}
        <div className="flex items-center justify-between bg-slate-800 p-2.5 rounded-lg border-l-4 border-gold-500 pl-4">
          <span className="text-gold-300 font-bold text-sm">Net National Product at Market Price (NNPmp)</span>
          <span className="text-gold-200 font-mono text-base font-bold">₹{nnpMp.toLocaleString()} Cr</span>
        </div>

        {/* NIT Adjustment */}
        <div className="pl-8 text-xs bg-slate-800/50 p-2 rounded border border-amber-500/30 flex justify-between items-center">
          <span className="text-amber-300">(-) Net Indirect Taxes (NIT = Taxes - Subsidies): ₹{nit} Cr</span>
          <span className="text-slate-400 font-mono">Factor Cost Bridge</span>
        </div>

        {/* National Income NNPfc */}
        <div className="flex items-center justify-between bg-emerald-950 p-3 rounded-lg border-2 border-emerald-500">
          <div>
            <span className="text-emerald-300 font-extrabold text-base block">National Income (NNPfc)</span>
            <span className="text-emerald-400 text-xs">True Factor Income of Normal Residents</span>
          </div>
          <span className="text-emerald-200 font-mono text-xl font-black">₹{nnpFc.toLocaleString()} Cr</span>
        </div>

        {/* Household Bridge: PI and PDI */}
        <div className="grid grid-cols-2 gap-3 pl-6 text-xs">
          <div className="bg-slate-800 p-2.5 rounded border border-purple-500/40">
            <span className="text-purple-300 font-semibold block mb-1">Personal Income (PI)</span>
            <span className="text-slate-400 text-[11px] block">- Corp Tax ({corporateTax}) - Retained ({undistributedProfit}) + Transfers</span>
            <span className="text-purple-200 font-mono font-bold text-sm mt-1 block">₹{personalIncome.toLocaleString()} Cr</span>
          </div>
          <div className="bg-slate-800 p-2.5 rounded border border-pink-500/40">
            <span className="text-pink-300 font-semibold block mb-1">Personal Disposable Income (PDI)</span>
            <span className="text-slate-400 text-[11px] block">- Direct Personal Income Taxes ({personalTax})</span>
            <span className="text-pink-200 font-mono font-bold text-sm mt-1 block">₹{pdi.toLocaleString()} Cr</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NominalVsRealGdpChart: React.FC<{ nominal: number; real: number; deflator: number }> = ({ nominal, real, deflator }) => {
  const maxVal = Math.max(nominal, real, 10000);
  const nominalHeight = (nominal / maxVal) * 160;
  const realHeight = (real / maxVal) * 160;

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-xl flex flex-col items-center">
      <h4 className="text-sm font-semibold text-amber-400 mb-2">Real GDP vs Nominal GDP Comparison & Price Inflation</h4>
      <div className="flex items-end space-x-12 h-48 mt-4 border-b border-slate-700 pb-2 px-8">
        {/* Nominal Bar */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-amber-300 font-mono font-bold mb-1">₹{nominal.toLocaleString()}</span>
          <div className="w-16 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-md transition-all duration-500" style={{ height: `${nominalHeight}px` }}></div>
          <span className="text-xs text-slate-300 mt-2 font-medium">Nominal GDP</span>
          <span className="text-[10px] text-slate-400">(Current Prices)</span>
        </div>

        {/* Real Bar */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-gold-300 font-mono font-bold mb-1">₹{real.toLocaleString()}</span>
          <div className="w-16 bg-gradient-to-t from-gold-600 to-gold-400 rounded-t-md transition-all duration-500" style={{ height: `${realHeight}px` }}></div>
          <span className="text-xs text-slate-300 mt-2 font-medium">Real GDP</span>
          <span className="text-[10px] text-slate-400">(Base Year Prices)</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between w-full max-w-sm bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
        <span className="text-xs text-slate-300 font-medium">Implicit GDP Deflator Index:</span>
        <span className={`text-sm font-mono font-bold ${deflator > 100 ? 'text-rose-400' : 'text-emerald-400'}`}>{deflator.toFixed(1)}</span>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT CLASS & HOOKS
// ==========================================

export const C12_EcoNationalIncomeCBSESim: React.FC<typeof DEFAULT_PROPS> = (props) => {
  const { initialNodeId, onComplete } = { ...DEFAULT_PROPS, ...props };

  // System state
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'analytics'>('discovery');
  const [currentNodeId, setCurrentNodeId] = useState<NodeId>(initialNodeId);
  const [bktMap, setBktMap] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState(id);
    });
    return initial;
  });
  const [srsItems, setSrsItems] = useState<SRSItem[]>(() => ALL_NODE_IDS.map((id) => createReviewItem(id)));

  // Lab Interaction Variables
  const [currentLabStep, setCurrentLabStep] = useState<number>(0);
  const [sectorsCount, setSectorsCount] = useState<number>(2);
  const [leakageSavings, setLeakageSavings] = useState<number>(200);
  const [injectionInvestment, setInjectionInvestment] = useState<number>(200);

  // Value Added Lab State
  const [wheatOutput, setWheatOutput] = useState<number>(600);
  const [flourOutput, setFlourOutput] = useState<number>(1000);
  const [breadOutput, setBreadOutput] = useState<number>(1500);

  // Three Methods Lab State
  const [labConsumption, setLabConsumption] = useState<number>(8000);
  const [labInvestment, setLabInvestment] = useState<number>(2500);
  const [labGovt, setLabGovt] = useState<number>(2000);
  const [labExports, setLabExports] = useState<number>(700);
  const [labImports, setLabImports] = useState<number>(900);

  // Aggregates & Prices State
  const [depreciationVal, setDepreciationVal] = useState<number>(1200);
  const [nfiaVal, setNfiaVal] = useState<number>(-300);
  const [nitVal, setNitVal] = useState<number>(1100);
  const [corporateTaxVal, setCorporateTaxVal] = useState<number>(400);
  const [retainedEarningsVal, setRetainedEarningsVal] = useState<number>(300);
  const [personalTaxVal, setPersonalTaxVal] = useState<number>(800);

  const [currentPriceIndex, setCurrentPriceIndex] = useState<number>(135);

  // Calculated National Aggregates
  const derivedGdpMp = useMemo(() => {
    return labConsumption + labInvestment + labGovt + (labExports - labImports);
  }, [labConsumption, labInvestment, labGovt, labExports, labImports]);

  const derivedRealGdp = useMemo(() => {
    return Math.round((derivedGdpMp / currentPriceIndex) * 100);
  }, [derivedGdpMp, currentPriceIndex]);

  const derivedGdpDeflator = useMemo(() => {
    return (derivedGdpMp / (derivedRealGdp || 1)) * 100;
  }, [derivedGdpMp, derivedRealGdp]);

  // Challenge Engine State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [completedChallengesCount, setCompletedChallengesCount] = useState<number>(0);

  // Question Engine State for Discovery & Predictions
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // UI Feedback Controls
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparkleCoords, setSparkleCoords] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Inactivity Hint Timer
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setShowHint(true);
      setCurrentHintText('Notice how adjusters like Net Indirect Taxes and Depreciation bridge Domestic Output to National Income!');
      audioManager.play('hint');
    }, 12000);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    resetIdleTimer();
    return () => {
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [resetIdleTimer]);

  // Initial welcome voice speech
  useEffect(() => {
    speechManager.speak('Welcome to the Central Statistical Office National Income Simulator. Explore macroeconomic flows, real versus nominal GDP, and value addition.');
  }, []);

  // Update mastery
  const handleBKTUpdate = (nodeId: NodeId, isCorrect: boolean) => {
    setBktMap((prev) => {
      const current = prev[nodeId] || createBKTState(nodeId);
      const updated = bktUpdate(current, isCorrect);
      return { ...prev, [nodeId]: updated };
    });
    setSrsItems((prev) => prev.map((item) => (item.nodeId === nodeId ? sm2Update(item, isCorrect ? 5 : 2) : item)));
  };

  // Submit Challenge Handler
  const handleChallengeSubmit = () => {
    const ch = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (ch.type === 'multiple-choice' || ch.type === 'classification') {
      if (selectedOption === ch.correctIndex) {
        isCorrect = true;
      }
    } else if (ch.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (!isNaN(val) && Math.abs(val - (ch.correctAnswer || 0)) <= (ch.tolerance || 0.1)) {
        isCorrect = true;
      }
    }

    handleBKTUpdate(ch.nodeId, isCorrect);

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('chime');
      setScore((prev) => prev + 100);
      setCompletedChallengesCount((prev) => prev + 1);
      setChallengeFeedback({ isCorrect: true, message: 'Excellent! Calculation and economic logic verified.' });
      setShowSparkle(true);
      setSparkleCoords({ x: 500, y: 300 });

      if (completedChallengesCount + 1 >= CHALLENGES.length) {
        audioManager.play('celebration');
        speechManager.speak('Mastery Achieved! You have successfully audited all national accounting challenges.');
        setShowConfetti(true);
        setShowSuccess(true);
        recordGameScore('c12_eco_national_income', score + 100);
        onComplete(score + 100);
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setChallengeFeedback({ isCorrect: false, message: `Incorrect. ${ch.explanation}` });
    }
  };

  const nextChallenge = () => {
    setSelectedOption(null);
    setNumericInput('');
    setChallengeFeedback(null);
    setShowSparkle(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      audioManager.play('swoop');
    }
  };

  // Aggregated Overall Mastery Score
  const overallMastery = useMemo(() => {
    const masteries = ALL_NODE_IDS.map((id) => masteryProb(bktMap[id] || createBKTState(id)));
    const avg = masteries.reduce((a, b) => a + b, 0) / masteries.length;
    return Math.round(avg * 100);
  }, [bktMap]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col space-y-6">
      {/* Top Banner & Header */}
      <header className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <div className="flex items-center space-x-3">
            <span className="bg-gold-500/10 text-gold-400 border border-gold-500/30 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
              ISC Class 12 Economics
            </span>
            <span className="text-slate-400 text-xs font-mono">Macroeconomic Accounting Suite</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 tracking-tight">
            National Income Accounting & Aggregates Simulator
          </h1>
        </div>

        {/* Global Progress & Score */}
        <div className="flex items-center space-x-6 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium">National Accountant Mastery</div>
            <div className="text-lg font-black text-emerald-400 font-mono">{overallMastery}%</div>
          </div>
          <div className="h-8 w-px bg-slate-700"></div>
          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium">Simulation Score</div>
            <div className="text-lg font-black text-amber-400 font-mono">{score} pts</div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'discovery' ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          1. Concept Discovery & Preconceptions
        </button>
        <button
          onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'lab' ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          2. Interactive National Income Labs
        </button>
        <button
          onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'challenges' ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          3. Micro-Challenges ({completedChallengesCount}/{CHALLENGES.length})
        </button>
        <button
          onClick={() => { setActiveTab('analytics'); audioManager.play('tap'); }}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'analytics' ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          4. CSO Real-World Audit & Analytics
        </button>
      </nav>

      {/* TAB 1: DISCOVERY & PRECONCEPTIONS */}
      {activeTab === 'discovery' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scenario & Context Card */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col space-y-4">
            <h2 className="text-xl font-bold text-gold-400">{SCENARIO.title}</h2>
            <p className="text-slate-300 leading-relaxed text-sm">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs bg-slate-800/60 p-3 rounded-lg border-l-2 border-gold-500">{SCENARIO.context}</p>

            {/* Discovery Question Card */}
            <div className="mt-4 bg-slate-800/80 border border-slate-700 rounded-xl p-5">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">Discovery Challenge Question</span>
              <p className="text-sm font-medium text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="space-y-2">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDiscoveryAnswer(idx);
                      audioManager.play(idx === DISCOVERY_QUESTION.correctIndex ? 'drop-correct' : 'drop-wrong');
                      if (idx === DISCOVERY_QUESTION.correctIndex) {
                        speechManager.speak('Correct! Real GDP measures physical output, while nominal GDP scales with price inflation.');
                      }
                    }}
                    className={`w-full text-left text-xs p-3 rounded-lg border transition-all ${
                      discoveryAnswer === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {discoveryAnswer !== null && (
                <div className="mt-4 p-3 bg-gold-950/60 border border-gold-700/50 rounded-lg text-xs text-gold-200">
                  <span className="font-bold">Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Render Prediction Questions array as required */}
            <div className="mt-6 border-t border-slate-800 pt-4">
              <h3 className="text-base font-bold text-slate-200 mb-3">Pre-Lab Macroeconomic Predictions</h3>
              <div className="space-y-4">
                {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                  <div key={qIdx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <p className="text-xs font-semibold text-slate-200 mb-2">{pq.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setPredictionAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                            audioManager.play('pop');
                          }}
                          className={`text-left text-xs p-2.5 rounded border transition-all ${
                            predictionAnswers[qIdx] === oIdx
                              ? oIdx === pq.correctIndex
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                                : 'bg-rose-900/60 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-700 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionAnswers[qIdx] !== undefined && (
                      <p className="text-[11px] text-gold-300 bg-slate-900 p-2 rounded">
                        <span className="font-bold">Verification Step: </span>{pq.verifyInstruction}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Concept Reference Sidebar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col space-y-4">
            <h3 className="text-base font-bold text-slate-200 border-b border-slate-800 pb-2">Core Macroeconomic Concepts</h3>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-800/70 p-3 rounded-lg">
                <span className="text-gold-400 font-bold block">Factor Payments vs Transfers</span>
                <p className="text-slate-400 mt-1">Factor payments (wages, rent, interest, profit) reward productive services and form NNPfc. Transfers are unilateral gifts/pensions excluded from National Income.</p>
              </div>
              <div className="bg-slate-800/70 p-3 rounded-lg">
                <span className="text-emerald-400 font-bold block">Stock vs Flow</span>
                <p className="text-slate-400 mt-1">Stock variables (capital, wealth, inventory on March 31) are measured at a point in time. Flows (GDP, income, investment) are measured per unit of time.</p>
              </div>
              <div className="bg-slate-800/70 p-3 rounded-lg">
                <span className="text-amber-400 font-bold block">Double Counting Avoidance</span>
                <p className="text-slate-400 mt-1">Gross Output sum overcounts intermediate goods. GDP equals Gross Value Added (GVA) = Value of Output minus Intermediate Consumption.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE LAB ENGINE */}
      {activeTab === 'lab' && (
        <div className="flex flex-col space-y-6">
          {/* Lab Exploration Steps Selector */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentLabStep(idx);
                  setCurrentNodeId(step.nodeId);
                  audioManager.play('tap');
                  speechManager.speak(`Switched to ${step.title}`);
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  currentLabStep === idx
                    ? 'bg-gold-950/80 border-gold-500 text-gold-200 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-[10px] font-bold uppercase text-gold-400">Step {idx + 1}</div>
                <div className="text-xs font-semibold line-clamp-2 mt-0.5">{step.title}</div>
              </button>
            ))}
          </div>

          {/* Current Step Instruction Banner */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gold-300">{EXPLORATION_STEPS[currentLabStep].title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{EXPLORATION_STEPS[currentLabStep].instruction}</p>
            </div>
            <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2.5 py-1 rounded border border-slate-700">
              Node ID: {EXPLORATION_STEPS[currentLabStep].nodeId}
            </span>
          </div>

          {/* Dynamic Lab Rendering */}
          {currentLabStep === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CircularFlowDiagram sectors={sectorsCount} leakage={leakageSavings} injection={injectionInvestment} />
              </div>
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col space-y-4 text-xs">
                <h4 className="font-bold text-slate-200 text-sm">Circular Flow Parameters</h4>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Economy Model Sectors:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[2, 3, 4].map((s) => (
                      <button
                        key={s}
                        onClick={() => { setSectorsCount(s); audioManager.play('pop'); }}
                        className={`py-1.5 rounded font-bold transition-all ${
                          sectorsCount === s ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {s}-Sector
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Household Savings (Leakage):</span>
                    <span className="font-mono text-rose-400 font-bold">₹{leakageSavings} Cr</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="50"
                    value={leakageSavings}
                    onChange={(e) => setLeakageSavings(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Business Investment (Injection):</span>
                    <span className="font-mono text-emerald-400 font-bold">₹{injectionInvestment} Cr</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="50"
                    value={injectionInvestment}
                    onChange={(e) => setInjectionInvestment(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div className={`p-3 rounded-lg border ${
                  leakageSavings === injectionInvestment ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-amber-950/60 border-amber-500 text-amber-300'
                }`}>
                  <span className="font-bold">Equilibrium Status: </span>
                  {leakageSavings === injectionInvestment
                    ? 'Balanced Economy! Leakages (S) = Injections (I). Income flow remains constant.'
                    : leakageSavings > injectionInvestment
                    ? 'Contractionary Gap! Leakages exceed Injections. Income flow will shrink.'
                    : 'Expansionary Gap! Injections exceed Leakages. Aggregate income will expand.'}
                </div>
              </div>
            </div>
          )}

          {currentLabStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-gold-400 text-sm">Value Added Production Chain (Wheat → Flour → Bread)</h4>
                
                <div className="space-y-3 text-xs">
                  {/* Stage 1: Farmer */}
                  <div className="bg-slate-800 p-3 rounded-lg flex justify-between items-center border-l-4 border-amber-500">
                    <div>
                      <span className="font-bold text-amber-300">Stage 1: Primary Farmer (Wheat)</span>
                      <p className="text-slate-400 text-[11px]">Output Value = ₹{wheatOutput} | Intermediate Input = ₹0</p>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-slate-400">GVA 1</div>
                      <div className="text-emerald-400 font-bold text-sm">₹{wheatOutput}</div>
                    </div>
                  </div>

                  {/* Stage 2: Miller */}
                  <div className="bg-slate-800 p-3 rounded-lg flex justify-between items-center border-l-4 border-gold-500">
                    <div>
                      <span className="font-bold text-gold-300">Stage 2: Flour Mill (Flour)</span>
                      <p className="text-slate-400 text-[11px]">Output Value = ₹{flourOutput} | Intermediate Wheat Input = ₹{wheatOutput}</p>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-slate-400">GVA 2</div>
                      <div className="text-emerald-400 font-bold text-sm">₹{flourOutput - wheatOutput}</div>
                    </div>
                  </div>

                  {/* Stage 3: Baker */}
                  <div className="bg-slate-800 p-3 rounded-lg flex justify-between items-center border-l-4 border-purple-500">
                    <div>
                      <span className="font-bold text-purple-300">Stage 3: Bakery (Final Bread)</span>
                      <p className="text-slate-400 text-[11px]">Output Value = ₹{breadOutput} | Intermediate Flour Input = ₹{flourOutput}</p>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-slate-400">GVA 3</div>
                      <div className="text-emerald-400 font-bold text-sm">₹{breadOutput - flourOutput}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-rose-950/50 border border-rose-500/40 p-3 rounded-lg text-xs">
                    <span className="text-rose-300 font-bold block">Wrong Method (Sum of Outputs):</span>
                    <span className="text-slate-300">₹{wheatOutput} + ₹{flourOutput} + ₹{breadOutput} = </span>
                    <span className="text-rose-400 font-mono font-bold text-sm">₹{wheatOutput + flourOutput + breadOutput} (Double Counted!)</span>
                  </div>
                  <div className="bg-emerald-950/50 border border-emerald-500/40 p-3 rounded-lg text-xs">
                    <span className="text-emerald-300 font-bold block">Correct Method (Total GVA):</span>
                    <span className="text-slate-300">Stage 1 + Stage 2 + Stage 3 = </span>
                    <span className="text-emerald-400 font-mono font-bold text-sm">₹{breadOutput} (Matches Final Value)</span>
                  </div>
                </div>
              </div>

              {/* Lab Controls */}
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col space-y-4 text-xs">
                <h4 className="font-bold text-slate-200 text-sm">Production Values Slider</h4>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Wheat Output Price: ₹{wheatOutput}</label>
                  <input type="range" min="300" max="800" step="50" value={wheatOutput} onChange={(e) => setWheatOutput(Number(e.target.value))} className="w-full accent-amber-500" />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Flour Output Price: ₹{flourOutput}</label>
                  <input type="range" min={wheatOutput + 100} max="1400" step="50" value={flourOutput} onChange={(e) => setFlourOutput(Number(e.target.value))} className="w-full accent-gold-500" />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">Bread Output Price: ₹{breadOutput}</label>
                  <input type="range" min={flourOutput + 100} max="2200" step="50" value={breadOutput} onChange={(e) => setBreadOutput(Number(e.target.value))} className="w-full accent-purple-500" />
                </div>
              </div>
            </div>
          )}

          {currentLabStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
                <h4 className="font-bold text-gold-400 text-sm">Three Methods Equivalence Proof</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-800 p-3 rounded-lg border border-gold-500/30">
                    <span className="text-gold-300 font-bold block mb-1">1. Product Method (GVA)</span>
                    <div className="text-slate-400 text-[11px]">GVA at MP = Net Output - Inputs + NIT</div>
                    <div className="text-gold-200 font-mono font-bold text-base mt-2">₹{derivedGdpMp.toLocaleString()} Cr</div>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-lg border border-emerald-500/30">
                    <span className="text-emerald-300 font-bold block mb-1">2. Income Method</span>
                    <div className="text-slate-400 text-[11px]">CoE + Operating Surplus + Mixed Inc + Depreciation + NIT</div>
                    <div className="text-emerald-200 font-mono font-bold text-base mt-2">₹{derivedGdpMp.toLocaleString()} Cr</div>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-lg border border-amber-500/30">
                    <span className="text-amber-300 font-bold block mb-1">3. Expenditure Method</span>
                    <div className="text-slate-400 text-[11px]">C + I + G + (X - M)</div>
                    <div className="text-amber-200 font-mono font-bold text-base mt-2">₹{derivedGdpMp.toLocaleString()} Cr</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                  <div className="font-semibold text-slate-200 mb-1">Equivalence Theorem:</div>
                  <p className="text-slate-400 text-[11px]">
                    Every rupee of production generates an equal rupee of factor income, which is subsequently spent on purchasing final goods and services. Hence, Total GVA ≡ Total Factor Income ≡ Total Final Expenditure.
                  </p>
                </div>
              </div>

              {/* Expenditure Sliders */}
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3 text-xs">
                <h4 className="font-bold text-slate-200 text-sm">Expenditure Components</h4>
                <div>
                  <label className="text-slate-400 block">Private Consumption (C): ₹{labConsumption}</label>
                  <input type="range" min="4000" max="12000" step="500" value={labConsumption} onChange={(e) => setLabConsumption(Number(e.target.value))} className="w-full accent-gold-500" />
                </div>
                <div>
                  <label className="text-slate-400 block">Gross Capital Formation (I): ₹{labInvestment}</label>
                  <input type="range" min="1000" max="5000" step="200" value={labInvestment} onChange={(e) => setLabInvestment(Number(e.target.value))} className="w-full accent-emerald-500" />
                </div>
                <div>
                  <label className="text-slate-400 block">Government Final Consumption (G): ₹{labGovt}</label>
                  <input type="range" min="1000" max="4000" step="200" value={labGovt} onChange={(e) => setLabGovt(Number(e.target.value))} className="w-full accent-amber-500" />
                </div>
                <div>
                  <label className="text-slate-400 block">Exports (X): ₹{labExports} | Imports (M): ₹{labImports}</label>
                  <div className="flex space-x-2 mt-1">
                    <input type="range" min="200" max="2000" step="100" value={labExports} onChange={(e) => setLabExports(Number(e.target.value))} className="w-full accent-gold-500" />
                    <input type="range" min="200" max="2000" step="100" value={labImports} onChange={(e) => setLabImports(Number(e.target.value))} className="w-full accent-rose-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentLabStep === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <NominalVsRealGdpChart nominal={derivedGdpMp} real={derivedRealGdp} deflator={derivedGdpDeflator} />
              </div>
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
                <h4 className="font-bold text-slate-200 text-sm">Price Index Adjuster</h4>
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Implicit Price Index (Base = 100):</span>
                    <span className="font-mono text-amber-400 font-bold">{currentPriceIndex}</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="220"
                    step="5"
                    value={currentPriceIndex}
                    onChange={(e) => setCurrentPriceIndex(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nominal GDP:</span>
                    <span className="font-mono font-bold text-amber-300">₹{derivedGdpMp.toLocaleString()} Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Real GDP:</span>
                    <span className="font-mono font-bold text-gold-300">₹{derivedRealGdp.toLocaleString()} Cr</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-700 pt-1">
                    <span className="text-slate-400">Inflation Impact:</span>
                    <span className="font-mono text-rose-400 font-bold">
                      {(((derivedGdpMp - derivedRealGdp) / (derivedRealGdp || 1)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentLabStep === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <NationalIncomeAggregatesTree
                  gdpMp={derivedGdpMp}
                  depreciation={depreciationVal}
                  nfia={nfiaVal}
                  nit={nitVal}
                  corporateTax={corporateTaxVal}
                  undistributedProfit={retainedEarningsVal}
                  personalTax={personalTaxVal}
                />
              </div>
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3 text-xs">
                <h4 className="font-bold text-slate-200 text-sm">National Accounts Bridge Controls</h4>
                <div>
                  <label className="text-slate-400 block">Depreciation (Fixed Capital): ₹{depreciationVal}</label>
                  <input type="range" min="500" max="3000" step="100" value={depreciationVal} onChange={(e) => setDepreciationVal(Number(e.target.value))} className="w-full accent-gold-500" />
                </div>
                <div>
                  <label className="text-slate-400 block">NFIA (Factor Income Abroad): ₹{nfiaVal}</label>
                  <input type="range" min="-1000" max="1000" step="100" value={nfiaVal} onChange={(e) => setNfiaVal(Number(e.target.value))} className="w-full accent-emerald-500" />
                </div>
                <div>
                  <label className="text-slate-400 block">Net Indirect Taxes (NIT): ₹{nitVal}</label>
                  <input type="range" min="200" max="2500" step="100" value={nitVal} onChange={(e) => setNitVal(Number(e.target.value))} className="w-full accent-amber-500" />
                </div>
                <div>
                  <label className="text-slate-400 block">Corporate Taxes: ₹{corporateTaxVal}</label>
                  <input type="range" min="100" max="1000" step="50" value={corporateTaxVal} onChange={(e) => setCorporateTaxVal(Number(e.target.value))} className="w-full accent-purple-500" />
                </div>
                <div>
                  <label className="text-slate-400 block">Personal Income Taxes: ₹{personalTaxVal}</label>
                  <input type="range" min="200" max="1800" step="50" value={personalTaxVal} onChange={(e) => setPersonalTaxVal(Number(e.target.value))} className="w-full accent-pink-500" />
                </div>
              </div>
            </div>
          )}

          {/* Render Observation Questions array as required */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl mt-4">
            <h3 className="text-sm font-bold text-slate-200 mb-3">Lab Observation Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                <div key={oIdx} className="bg-slate-800/60 p-4 rounded-lg border border-slate-700 space-y-2">
                  <p className="text-xs font-semibold text-gold-300">{oq.question}</p>
                  <div className="space-y-1.5">
                    {oq.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          setObservationAnswers((prev) => ({ ...prev, [oIdx]: optIdx }));
                          audioManager.play(optIdx === oq.correctIndex ? 'drop-correct' : 'drop-wrong');
                        }}
                        className={`w-full text-left text-xs p-2 rounded border transition-all ${
                          observationAnswers[oIdx] === optIdx
                            ? optIdx === oq.correctIndex
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                              : 'bg-rose-950 border-rose-500 text-rose-200'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MICRO-CHALLENGES */}
      {activeTab === 'challenges' && (
        <div className="max-w-3xl mx-auto w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-gold-400 uppercase tracking-widest">
                Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                {CHALLENGES[currentChallengeIndex].competencyLevel} Competency Assessment
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
              }`}>
                {CHALLENGES[currentChallengeIndex].difficulty}
              </span>
            </div>
          </div>

          {/* Question Text */}
          <p className="text-base text-slate-200 font-medium leading-relaxed">
            {CHALLENGES[currentChallengeIndex].question}
          </p>

          {/* Answer Controls */}
          {(CHALLENGES[currentChallengeIndex].type === 'multiple-choice' ||
            CHALLENGES[currentChallengeIndex].type === 'classification') && (
            <div className="space-y-3">
              {CHALLENGES[currentChallengeIndex].options?.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedOption(idx);
                    audioManager.play('tap');
                  }}
                  className={`w-full text-left text-sm p-4 rounded-xl border transition-all ${
                    selectedOption === idx
                      ? 'bg-gold-950 border-gold-500 text-gold-200 ring-2 ring-gold-500/20'
                      : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <span className="font-mono mr-3 text-gold-400 font-bold">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {CHALLENGES[currentChallengeIndex].type === 'numeric' && (
            <div className="space-y-3">
              <label className="text-xs text-slate-400 block font-medium">Enter calculated numeric value ({CHALLENGES[currentChallengeIndex].unit}):</label>
              <input
                type="number"
                value={numericInput}
                onChange={(e) => setNumericInput(e.target.value)}
                placeholder="e.g. 10500"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white font-mono text-lg focus:outline-none focus:border-gold-500"
              />
            </div>
          )}

          {/* Feedback & Actions */}
          {challengeFeedback && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
              challengeFeedback.isCorrect ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' : 'bg-rose-950/80 border-rose-500 text-rose-200'
            }`}>
              <div className="font-bold text-sm mb-1">{challengeFeedback.isCorrect ? '✔ Correct Answer!' : '✖ Incorrect Solution'}</div>
              {challengeFeedback.message}
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                setShowHint(!showHint);
                setCurrentHintText(CHALLENGES[currentChallengeIndex].hints[0]);
                audioManager.play('hint');
              }}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
            >
              <span>💡 Need a Hint?</span>
            </button>

            {challengeFeedback?.isCorrect ? (
              <button
                onClick={nextChallenge}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-600/30"
              >
                Next Challenge →
              </button>
            ) : (
              <button
                onClick={handleChallengeSubmit}
                disabled={selectedOption === null && !numericInput}
                className="bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-gold-600/30"
              >
                Submit Answer
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: REAL WORLD AUDIT & ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Real World Activity Container */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-gold-400">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="space-y-3 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-xl text-xs text-slate-200">
                  <span className="font-bold text-emerald-400 mr-2">Step {idx + 1}:</span>
                  {step}
                </div>
              ))}
            </div>

            {/* Diagnostic Misconception Review */}
            <div className="mt-6 border-t border-slate-800 pt-4">
              <h4 className="text-sm font-bold text-slate-200 mb-3">Diagnostic Misconception Breakdown</h4>
              <div className="space-y-3">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 text-xs">
                    <span className="text-rose-400 font-semibold block">Misconception: {m.title}</span>
                    <p className="text-slate-400 mt-1">{m.explanation}</p>
                    <div className="text-emerald-400 font-mono mt-1 text-[11px]">Correct Concept: {m.correction}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SRS Mastery & Diagnostic Radar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col space-y-4">
            <h3 className="text-base font-bold text-slate-200 border-b border-slate-800 pb-2">BKT Mastery & SRS Card Queue</h3>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {ALL_NODE_IDS.map((id) => {
                const bkt = bktMap[id] || createBKTState(id);
                const masterLvl = Math.round(masteryProb(bkt) * 100);
                return (
                  <div key={id} className="bg-slate-800/60 p-2.5 rounded border border-slate-700 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-mono text-gold-400 text-[11px] block">{id}</span>
                      <span className="text-slate-400 text-[10px]">Probability of Mastery</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-emerald-400">{masterLvl}%</span>
                      <div className="w-16 bg-slate-700 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: `${masterLvl}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Feedback System Overlay Components */}
      <HintBubble show={showHint} text={currentHintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="National Income Audit Certified Master Class!" />
      <SparkleBurst show={showSparkle} x={sparkleCoords.x} y={sparkleCoords.y} />
    </div>
  );
};

export default C12_EcoNationalIncomeCBSESim;
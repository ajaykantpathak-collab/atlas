'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// -----------------------------------------------------------------------------
// NODE IDS & METADATA
// -----------------------------------------------------------------------------
const NODE_025 = 'c12_eco_cbse_025'; // Inflationary Impact of Fiscal Deficits
const NODE_026 = 'c12_eco_cbse_026'; // Deficit Reduction Strategies
const NODE_027 = 'c12_eco_cbse_027'; // Fiscal Responsibility and Budget Management Act (FRBMA)
const NODE_028 = 'c12_eco_cbse_028'; // Goods and Services Tax (GST)
const NODE_029 = 'c12_eco_cbse_029'; // Proportional Taxes and Automatic Stabilizers
const NODE_030 = 'c12_eco_cbse_030'; // Discretionary vs Automatic Fiscal Policy
const NODE_031 = 'c12_eco_cbse_031'; // Transfer Payments and Multiplier Effect
const NODE_032 = 'c12_eco_cbse_032'; // Government Debt: Concept and Accumulation
const NODE_033 = 'c12_eco_cbse_033'; // Burden of Public Debt and Ricardian Equivalence
const NODE_034 = 'c12_eco_cbse_034'; // Crowding Out Effect
const NODE_035 = 'c12_eco_cbse_035'; // Aggregate Demand with Government Sector
const NODE_036 = 'c12_eco_cbse_036'; // Government Expenditure Multiplier
const NODE_037 = 'c12_eco_cbse_037'; // Tax Multiplier and Balanced Budget Multiplier
const NODE_038 = 'c12_eco_cbse_038'; // Mixed Economy: Role of Government
const NODE_039 = 'c12_eco_cbse_039'; // Government Budget: Constitutional Basis and Definition
const NODE_040 = 'c12_eco_cbse_040'; // Public Goods vs Private Goods
const NODE_041 = 'c12_eco_cbse_041'; // Non-Rivalry and Non-Excludability
const NODE_042 = 'c12_eco_cbse_042'; // Free Rider Problem
const NODE_043 = 'c12_eco_cbse_043'; // Public Provision vs Public Production
const NODE_044 = 'c12_eco_cbse_044'; // Allocation Function of Government Budget
const NODE_045 = 'c12_eco_cbse_045'; // Redistribution Function of Government Budget
const NODE_046 = 'c12_eco_cbse_046'; // Stabilization Function of Government Budget
const NODE_047 = 'c12_eco_cbse_047'; // Revenue Receipts: Tax and Non-Tax Revenue
const NODE_048 = 'c12_eco_cbse_048'; // Direct and Indirect Taxes
const NODE_049 = 'c12_eco_cbse_049'; // Non-Tax Revenue Sources
const NODE_050 = 'c12_eco_cbse_050'; // Capital Receipts
const NODE_051 = 'c12_eco_cbse_051'; // Revenue Expenditure
const NODE_052 = 'c12_eco_cbse_052'; // Capital Expenditure
const NODE_053 = 'c12_eco_cbse_053'; // Plan and Non-Plan Expenditure Classification
const NODE_054 = 'c12_eco_cbse_054'; // Balanced, Surplus, and Deficit Budget
const NODE_055 = 'c12_eco_cbse_055'; // Revenue Deficit
const NODE_056 = 'c12_eco_cbse_056'; // Fiscal Deficit
const NODE_057 = 'c12_eco_cbse_057'; // Primary Deficit
const NODE_058 = 'c12_eco_cbse_058'; // Fiscal Policy: Concept and Tools

const ALL_NODE_IDS: string[] = [
  NODE_025, NODE_026, NODE_027, NODE_028, NODE_029, NODE_030, NODE_031,
  NODE_032, NODE_033, NODE_034, NODE_035, NODE_036, NODE_037, NODE_038,
  NODE_039, NODE_040, NODE_041, NODE_042, NODE_043, NODE_044, NODE_045,
  NODE_046, NODE_047, NODE_048, NODE_049, NODE_050, NODE_051, NODE_052,
  NODE_053, NODE_054, NODE_055, NODE_056, NODE_057, NODE_058,
];

// -----------------------------------------------------------------------------
// INTERFACES
// -----------------------------------------------------------------------------
interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple_choice' | 'numeric' | 'drag_sort' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  categories?: { name: string; items: string[] }[];
  sortItems?: string[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: string;
}

interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: string;
}

interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: string;
}

interface RealWorldActivity {
  title: string;
  description: string;
  steps: string[];
}

interface Misconception {
  title: string;
  description: string;
  correction: string;
}

interface BKTState {
  pKnown: number;
  pLearn?: number;
  pSlip?: number;
  pGuess?: number;
}

type SRSItem = import('../../../lib/srs').ReviewItem;

// -----------------------------------------------------------------------------
// MANDATORY CONTENT SECTIONS
// -----------------------------------------------------------------------------
const SCENARIO = {
  title: 'Ministry of Finance & Macroeconomic Policy Simulator',
  intro: 'You have been appointed Chief Economic Advisor to the Union Finance Ministry. Your task is to craft the National Budget under Article 112 of the Constitution, balancing resource allocation, income redistribution, economic stabilization, public debt management, and growth.',
  context: 'In this interactive macro-fiscal laboratory, you will adjust tax structures, capital vs. revenue expenditures, debt financing, and transfer payments. Observe live updates on National Income (GDP), Revenue Deficit, Fiscal Deficit, Primary Deficit, Inflation, and Private Investment Crowding-out.',
};

const DISCOVERY_QUESTION = {
  question: 'If the government increases taxes and public expenditure by the exact same amount (say ₹10,000 Crore in a balanced budget expansion), what happens to Aggregate Output (GDP)?',
  options: [
    'GDP remains completely unchanged because extra expenditure is cancelled by equal extra taxes.',
    'GDP increases by exactly ₹10,000 Crore because the expenditure multiplier outweighs the negative tax multiplier effect.',
    'GDP decreases because direct taxes reduce disposable income and suppress consumer confidence permanently.',
    'GDP doubles due to simultaneous compound multiplier effects across public and private sectors.'
  ],
  correctIndex: 1,
  hintAfter: 'Surprising right? The Expenditure Multiplier is 1/(1-c), while the Tax Multiplier is -c/(1-c). Summing them gives a Balanced Budget Multiplier of exactly 1!',
};

const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Budget Structure & Deficit Identifiers',
    instruction: 'Adjust Revenue Receipts, Capital Receipts, Revenue Expenditure, and Capital Expenditure. Observe how Revenue Deficit, Fiscal Deficit, and Primary Deficit are computed.',
    interactionType: 'budget_sliders',
    nodeId: NODE_056,
  },
  {
    title: 'Lab 2: Keynesian Multipliers & Aggregate Demand',
    instruction: 'Vary the Marginal Propensity to Consume (c), Tax Rate (t), and Government Expenditure (G). Watch aggregate demand shifts and equilibrium output (Y*).',
    interactionType: 'multiplier_controls',
    nodeId: NODE_036,
  },
  {
    title: 'Lab 3: Crowding Out Effect & Loanable Funds',
    instruction: 'Increase government borrowing to finance a high Fiscal Deficit. Watch real interest rates rise and private sector investment get displaced.',
    interactionType: 'crowding_out_sim',
    nodeId: NODE_034,
  },
  {
    title: 'Lab 4: Automatic vs Discretionary Fiscal Policy',
    instruction: 'Simulate an economic recession shock. Compare tax revenues under a fixed tax system vs. a proportional tax automatic stabilizer.',
    interactionType: 'fiscal_stabilizer',
    nodeId: NODE_029,
  },
  {
    title: 'Lab 5: FRBMA Targets & Debt Dynamics',
    instruction: 'Manage interest payments and deficit monetization over multiple fiscal years to bring the Fiscal Deficit under the 3% GDP target.',
    interactionType: 'frbma_debt_lab',
    nodeId: NODE_027,
  },
];

const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict: If the Marginal Propensity to Consume (MPC) is 0.8 and tax rate is 0, what will be the change in National Income (GDP) if Government Spending (G) increases by ₹500 Crore?',
    options: ['₹500 Crore', '₹2,000 Crore', '₹2,500 Crore', '₹4,000 Crore'],
    correctIndex: 2,
    verifyInstruction: 'Set MPC = 0.8 and Tax Rate = 0% in Lab 2. Increase G by ₹500 Crore and verify ΔY = 500 * (1/(1-0.8)) = ₹2,500 Crore.',
    nodeId: NODE_036,
  },
  {
    question: 'Predict: If Primary Deficit is zero, what does the entire Fiscal Deficit represent?',
    options: [
      'Current consumption expenditure of government exceedings tax revenue',
      'Interest payments on past accumulated debt obligations',
      'Total capital creation expenditures on infrastructure',
      'Foreign exchange reserve drain'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 1, set Interest Payments equal to Fiscal Deficit. Observe that Primary Deficit drops to zero.',
    nodeId: NODE_057,
  },
];

const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'What happens to the gap between Revenue Expenditure and Revenue Receipts when non-tax revenues decline during economic downturns?',
    observableOptions: [
      'Revenue Deficit widens, forcing government to borrow to cover daily running expenses.',
      'Fiscal Deficit automatically becomes zero.',
      'Capital Receipts immediately double to neutralize the imbalance.',
      'Primary Deficit falls below zero.'
    ],
    correctIndex: 0,
    nodeId: NODE_055,
  },
  {
    question: 'When government debt monetisation (printing currency via RBI borrowing) is heavily increased, what macro phenomenon is observed?',
    observableOptions: [
      'Deflation and lower consumer demand',
      'Inflationary pressure as money supply increases without corresponding output expansion',
      'Immediate drop in public debt',
      'Elimination of crowding out effect with zero interest rates'
    ],
    correctIndex: 1,
    nodeId: NODE_025,
  },
];

const REAL_WORLD_ACTIVITY: RealWorldActivity = {
  title: 'Union Budget Formulation & Fiscal Deficit Diagnosis',
  description: 'Analyze the fiscal year financial summary of Union Budget 2023-24 for the Government of India and calculate key deficit indicators.',
  steps: [
    'Step 1: Given Revenue Receipts = ₹26.32 Lakh Crore, Capital Receipts (excluding borrowings) = ₹0.84 Lakh Crore. Total Non-Debt Receipts = ₹27.16 Lakh Crore.',
    'Step 2: Total Expenditure = ₹45.03 Lakh Crore (Revenue Expenditure = ₹35.02 Lakh Crore, Capital Expenditure = ₹10.01 Lakh Crore).',
    'Step 3: Calculate Revenue Deficit = RE - RR = ₹35.02 - ₹26.32 = ₹8.70 Lakh Crore.',
    'Step 4: Calculate Fiscal Deficit = Total Expenditure - Non-Debt Receipts = ₹45.03 - ₹27.16 = ₹17.87 Lakh Crore (~5.9% of GDP). Given Interest Payments = ₹10.80 Lakh Crore, calculate Primary Deficit = ₹17.87 - ₹10.80 = ₹7.07 Lakh Crore.',
  ],
};

const MISCONCEPTIONS: Misconception[] = [
  {
    title: 'Fiscal Deficit = Total Expenditure - Total Receipts',
    description: 'Students often forget that Total Receipts includes borrowings.',
    correction: 'Fiscal Deficit is Total Expenditure minus Total Non-Debt Receipts (Revenue Receipts + Non-debt Capital Receipts). Debt receipts equal the Fiscal Deficit itself!',
  },
  {
    title: 'All borrowings create productive public capital assets',
    description: 'Believing government borrowings are only spent on infrastructure and highways.',
    correction: 'If Revenue Deficit exists, a portion of borrowings is used to finance daily administrative expenditures and interest payments, creating no physical or financial assets.',
  },
  {
    title: 'Balanced Budget Multiplier is Zero',
    description: 'Assuming equal increases in expenditure and taxes cancel each other out completely.',
    correction: 'The balanced budget multiplier equals 1 because government spending acts directly on Aggregate Demand, whereas tax increases reduce disposable income by MPC times the tax amount.',
  },
  {
    title: 'Public Debt is always harmful to the national economy',
    description: 'Viewing public debt like private debt of a household.',
    correction: 'If debt is utilized for capital creation (infrastructure, education, power) with a return higher than the borrowing rate, public debt promotes long-term potential GDP growth.',
  },
  {
    title: 'GST is a Direct Tax',
    description: 'Confusing tax paid at POS with income tax.',
    correction: 'GST is a comprehensive indirect, destination-based consumption tax levied on goods and services, transferable to the final consumer.',
  },
  {
    title: 'Ricardian Equivalence makes Fiscal Policy permanently effective',
    description: 'Assuming citizens ignore future tax liabilities when government spends today.',
    correction: 'Ricardian Equivalence states that tax-financed and debt-financed government spending are equivalent because rational forward-looking citizens save today for future tax hikes, neutralizing policy stimulus.',
  },
];

// -----------------------------------------------------------------------------
// CHALLENGES (24 PROGRESSIVE CHALLENGES ACROSS 3 TIERS)
// -----------------------------------------------------------------------------
const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (8 Challenges)
  {
    id: 'ch_f1',
    nodeId: NODE_040,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'Which key characteristics distinguish a pure Public Good (e.g., National Defence, Street Lighting) from a Private Good?',
    options: [
      'Excludability and Rivalry in consumption',
      'Non-excludability and Non-rivalry in consumption',
      'High profit margin and private sector monopoly',
      'Excludability and Non-rivalry'
    ],
    correctIndex: 1,
    explanation: 'Public goods are non-rival (one person’s consumption does not reduce availability for others) and non-excludable (no one can be effectively excluded from using them).',
    hints: [
      'Think about street lights—can you prevent someone from benefiting from them?',
      'Does one person seeing by street light diminish light for another?',
      'Non-rivalry + Non-excludability defines public goods.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_f2',
    nodeId: NODE_048,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'Classification',
    question: 'Classify each of the following tax sources into Direct Tax or Indirect Tax:',
    categories: [
      { name: 'Direct Tax', items: ['Personal Income Tax', 'Corporation Tax'] },
      { name: 'Indirect Tax', items: ['Goods and Services Tax (GST)', 'Customs Duty'] }
    ],
    explanation: 'Direct taxes (Income Tax, Corp Tax) are paid directly by the tax bearer; burden cannot be shifted. Indirect taxes (GST, Customs Duty) are levied on goods/services; burden is shifted to consumers.',
    hints: [
      'Direct taxes cannot be shifted onto buyers.',
      'GST is added to product prices at purchase.',
      'Corporation tax is levied on company profits directly.'
    ],
  },
  {
    id: 'ch_f3',
    nodeId: NODE_047,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which of the following is a Non-Tax Revenue receipt for the Union Government of India?',
    options: [
      'Corporation Tax',
      'Dividends and Profits from Public Sector Undertakings (e.g., RBI dividend)',
      'Union Excise Duty',
      'Customs Duty'
    ],
    correctIndex: 1,
    explanation: 'Dividends earned from public sector enterprises and RBI surpluses are Non-Tax Revenue Receipts as they create neither liability nor asset reduction, but are not tax levies.',
    hints: [
      'Look for an income source that does not involve compulsory tax levies.',
      'RBI transfers annual surplus profit to the government.',
      'Dividends are profits earned on government investments.'
    ],
  },
  {
    id: 'ch_f4',
    nodeId: NODE_050,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which receipt is classified as a Capital Receipt in the Union Budget?',
    options: [
      'GST Collections',
      'Interest receipts on loans given to State Governments',
      'Disinvestment proceeds from sale of PSU shares',
      'Fees collected for Passport Issuance'
    ],
    correctIndex: 2,
    explanation: 'Capital Receipts either create a liability (borrowings) or reduce financial assets (disinvestment/recovery of loans). Disinvestment reduces government equity assets.',
    hints: [
      'Capital receipts impact assets or liabilities.',
      'Selling government shareholdings in PSUs reduces financial assets.',
      'Receipts reducing assets are Capital Receipts.'
    ],
  },
  {
    id: 'ch_f5',
    nodeId: NODE_051,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Expenditure incurred by government on payment of salaries, pensions, and interest payments is classified as:',
    options: [
      'Capital Expenditure',
      'Revenue Expenditure',
      'Plan Asset Creation Expenditure',
      'Developmental Capital Expenditure'
    ],
    correctIndex: 1,
    explanation: 'Revenue Expenditure neither creates physical/financial assets nor reduces government liabilities. Salaries, pensions, and interest payments fall under Revenue Expenditure.',
    hints: [
      'Does paying salaries build a factory or road?',
      'Does paying interest reduce the original debt principal?',
      'No asset creation and no liability reduction = Revenue Expenditure.'
    ],
  },
  {
    id: 'ch_f6',
    nodeId: NODE_039,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Under which Article of the Constitution of India is the Annual Financial Statement (Union Budget) presented to Parliament?',
    options: ['Article 110', 'Article 112', 'Article 280', 'Article 360'],
    correctIndex: 1,
    explanation: 'Article 112 of the Indian Constitution requires the President to lay before Parliament the "Annual Financial Statement" for each financial year.',
    hints: [
      'Article 110 relates to Money Bills.',
      'The Constitutional term for Union Budget is Annual Financial Statement.',
      'It is Article 112.'
    ],
  },
  {
    id: 'ch_f7',
    nodeId: NODE_042,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'The "Free Rider Problem" arises in private markets primarily due to which feature of public goods?',
    options: ['High production cost', 'Non-excludability', 'Non-rivalry', 'Monopolistic competition'],
    correctIndex: 1,
    explanation: 'Because public goods are non-excludable, people can benefit without paying, leading to free riding and private market failure.',
    hints: [
      'If you cannot block non-payers from enjoying a good, why would anyone voluntarily pay?',
      'This impossibility of exclusion leads to free riding.',
      'Non-excludability.'
    ],
  },
  {
    id: 'ch_f8',
    nodeId: NODE_044,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'When the government levies high taxes on tobacco/liquor and grants subsidies for green energy solar panels, which budget function is being executed?',
    options: ['Stabilization Function', 'Allocation Function', 'Redistribution Function', 'Debt Servicing Function'],
    correctIndex: 1,
    explanation: 'The Allocation Function reallocates society’s resources towards social priorities by disincentivizing harmful goods (deconstructive externalities) and promoting social goods.',
    hints: [
      'Is the government altering the allocation of national resources?',
      'Discouraging demerit goods and encouraging merit goods.',
      'Allocation Function.'
    ],
  },

  // STANDARD TIER (8 Challenges)
  {
    id: 'ch_s1',
    nodeId: NODE_056,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application & Calculation',
    question: 'Given Revenue Receipts = ₹18,000 Cr, Capital Receipts (non-debt) = ₹2,000 Cr, Revenue Expenditure = ₹22,000 Cr, Capital Expenditure = ₹6,000 Cr. Calculate the Fiscal Deficit (in ₹ Crore).',
    correctAnswer: 8000,
    tolerance: 0,
    unit: '₹ Crore',
    explanation: 'Total Expenditure = RE + CE = 22,000 + 6,000 = 28,000. Total Non-debt Receipts = RR + Non-debt CR = 18,000 + 2,000 = 20,000. Fiscal Deficit = 28,000 - 20,000 = ₹8,000 Crore.',
    hints: [
      'Calculate Total Expenditure = Revenue Exp + Capital Exp.',
      'Calculate Total Non-Debt Receipts = Revenue Receipts + Non-debt Capital Receipts.',
      'Fiscal Deficit = Total Expenditure - Total Non-Debt Receipts.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_s2',
    nodeId: NODE_057,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application & Calculation',
    question: 'If Fiscal Deficit is ₹7,500 Crore and Interest Payments on past borrowings are ₹2,100 Crore, calculate the Primary Deficit (in ₹ Crore).',
    correctAnswer: 5400,
    tolerance: 0,
    unit: '₹ Crore',
    explanation: 'Primary Deficit = Fiscal Deficit - Interest Payments = 7,500 - 2,100 = ₹5,400 Crore.',
    hints: [
      'Primary deficit excludes past debt service burden.',
      'Formula: Primary Deficit = Fiscal Deficit - Interest Payments.',
      '7,500 - 2,100 = 5,400.'
    ],
  },
  {
    id: 'ch_s3',
    nodeId: NODE_036,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In an economy with Marginal Propensity to Consume (MPC) c = 0.75 and tax rate t = 0, calculate the value of the Government Expenditure Multiplier.',
    correctAnswer: 4,
    tolerance: 0.01,
    explanation: 'Multiplier K_g = 1 / (1 - MPC) = 1 / (1 - 0.75) = 1 / 0.25 = 4.',
    hints: [
      'Formula: K_g = 1 / (1 - c).',
      '1 - 0.75 = 0.25.',
      '1 / 0.25 = 4.'
    ],
  },
  {
    id: 'ch_s4',
    nodeId: NODE_037,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'If MPC c = 0.8 and tax rate t = 0, what is the Tax Multiplier (K_t)? (Include minus sign, e.g. -4)',
    correctAnswer: -4,
    tolerance: 0.01,
    explanation: 'Tax Multiplier K_t = -c / (1 - c) = -0.8 / (1 - 0.8) = -0.8 / 0.2 = -4.',
    hints: [
      'Formula for Tax Multiplier K_t = -c / (1 - c).',
      '-0.8 / 0.2 = -4.',
      'Notice tax multiplier is negative because higher tax cuts disposable income.'
    ],
  },
  {
    id: 'ch_s5',
    nodeId: NODE_055,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application & Analysis',
    question: 'Given Revenue Expenditure = ₹15,400 Crore and Tax Revenue = ₹9,200 Crore, Non-Tax Revenue = ₹2,800 Crore. Compute the Revenue Deficit (in ₹ Crore).',
    correctAnswer: 3400,
    tolerance: 0,
    unit: '₹ Crore',
    explanation: 'Total Revenue Receipts = Tax Rev + Non-Tax Rev = 9,200 + 2,800 = 12,000. Revenue Deficit = RE - RR = 15,400 - 12,000 = ₹3,400 Crore.',
    hints: [
      'Sum Tax Revenue and Non-Tax Revenue to get Total Revenue Receipts.',
      '15,400 - (9,200 + 2,800).',
      '15,400 - 12,000 = 3,400.'
    ],
  },
  {
    id: 'ch_s6',
    nodeId: NODE_034,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What mechanism causes the "Crowding Out Effect" when government runs a huge debt-financed Fiscal Deficit?',
    options: [
      'Government debt increases bank liquidity, driving interest rates to zero.',
      'Heavy government borrowing increases interest rates in the loanable funds market, making borrowing costlier for private investments.',
      'High taxation forces private firms to shut down exports.',
      'Foreign central banks sell domestic bonds.'
    ],
    correctIndex: 1,
    explanation: 'When government borrows heavily, demand for loanable funds rises, pushing up real interest rates and crowding out private investment.',
    hints: [
      'Think of loanable funds supply as limited.',
      'If government takes a huge share of savings, loan demand shifts right, raising interest rates.',
      'Higher interest rates reduce private capital expenditure.'
    ],
  },
  {
    id: 'ch_s7',
    nodeId: NODE_029,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why do proportional progressive income taxes act as "Automatic Stabilizers" during economic fluctuations?',
    options: [
      'They require parliament to pass emergency spending bills during recessions.',
      'During economic booms, tax revenues automatically rise faster than income, dampening overheating; during recessions, tax collections drop, cushioning disposable income without explicit legislative delay.',
      'They freeze money supply growth permanently.',
      'They automatically equalize public expenditure and public revenue every month.'
    ],
    correctIndex: 1,
    explanation: 'Automatic stabilizers adjust tax burdens inversely to economic shocks without discretionary policy lag.',
    hints: [
      'Key concept: "Automatic" means no parliamentary delay.',
      'In recession, incomes fall -> tax bracket payments fall automatically -> disposable income supported.',
      'This cushions macroeconomic aggregate demand fluctuations.'
    ],
  },
  {
    id: 'ch_s8',
    nodeId: NODE_027,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'What was the major target set by the Fiscal Responsibility and Budget Management Act (FRBMA) 2003 for the Union Government of India?',
    options: [
      'Eliminate Capital Deficit to zero',
      'Reduce Fiscal Deficit to 3% of GDP and eliminate Revenue Deficit',
      'Increase Corporate Tax to 50%',
      'Cap total public expenditure at ₹10 Lakh Crore'
    ],
    correctIndex: 1,
    explanation: 'The original FRBMA target was to reduce Fiscal Deficit to 3% of GDP and phase out Revenue Deficit to achieve fiscal discipline.',
    hints: [
      'FRBMA aimed at macro-fiscal sustainability.',
      'Key numerical target for Fiscal Deficit was 3% of GDP.',
      'Targeted elimination of Revenue Deficit.'
    ],
  },

  // ADVANCED TIER (8 Challenges)
  {
    id: 'ch_a1',
    nodeId: NODE_035,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis & Math',
    question: 'In a three-sector Keynesian economy: Autonomous Consumption C0 = 200, MPC c = 0.8, Tax rate t = 0.25, Autonomous Investment I0 = 300, Government Spending G = 400. Calculate equilibrium National Income Y* (round to nearest whole number).',
    correctAnswer: 2250,
    tolerance: 2,
    explanation: 'Aggregate Demand Y = C0 + c(1-t)Y + I0 + G => Y = 200 + 0.8(1 - 0.25)Y + 300 + 400 => Y = 900 + 0.8(0.75)Y => Y = 900 + 0.6Y => 0.4Y = 900 => Y* = 900 / 0.4 = 2,250.',
    hints: [
      'Effective MPC after proportional tax is c(1-t) = 0.8 * 0.75 = 0.6.',
      'Total autonomous demand A0 = C0 + I0 + G = 200 + 300 + 400 = 900.',
      'Y* = A0 / (1 - 0.6) = 900 / 0.4 = 2,250.'
    ],
  },
  {
    id: 'ch_a2',
    nodeId: NODE_031,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'If government increases Transfer Payments (e.g., social welfare pensions TR) by ₹1,000 Crore in an economy where MPC c = 0.75, what is the total change in Aggregate Output (ΔY in ₹ Crore)?',
    correctAnswer: 3000,
    tolerance: 0,
    unit: '₹ Crore',
    explanation: 'Transfer Payment Multiplier K_tr = c / (1 - c) = 0.75 / (1 - 0.75) = 0.75 / 0.25 = 3. Total ΔY = 1,000 * 3 = ₹3,000 Crore.',
    hints: [
      'Transfer payments affect disposable income first, so initial spending is c * ΔTR.',
      'Transfer Multiplier K_tr = c / (1 - c).',
      '0.75 / 0.25 = 3 => 1,000 * 3 = 3,000.'
    ],
  },
  {
    id: 'ch_a3',
    nodeId: NODE_033,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation & Theory',
    question: 'What is the core premise of "Ricardian Equivalence" regarding debt-financed government spending cuts in taxes?',
    options: [
      'Tax cuts financed by debt stimulate aggregate demand permanently by increasing consumer wealth.',
      'Rational forward-looking citizens anticipate that debt-financed tax cuts today mean higher taxes in the future; hence they save the entire tax cut, leaving Aggregate Demand unchanged.',
      'Debt financing lowers interest rates and increases private capital investment.',
      'Government debt can be expanded infinitely without affecting inflation or future tax obligations.'
    ],
    correctIndex: 1,
    explanation: 'Ricardian Equivalence theory asserts that consumers save debt-financed tax cuts to prepare for future tax liabilities, rendering fiscal tax cuts neutral on Aggregate Demand.',
    hints: [
      'Consider rational forward-looking behavior of households.',
      'If government borrows today, who pays the interest and principal tomorrow?',
      'Households save today to meet tomorrow’s taxes, neutralizing stimulus.'
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_a4',
    nodeId: NODE_025,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis & Synthesis',
    question: 'When is a Fiscal Deficit most likely to produce severe hyper-inflationary pressures in an economy?',
    options: [
      'When financed by domestic public bond sales to long-term pension funds during economic slack.',
      'When deficit is monetised by borrowing directly from the Central Bank (printing money) while economy operates near full employment capacity.',
      'When financed by foreign direct investment in infrastructure projects.',
      'When spent entirely on debt repayment to international institutions.'
    ],
    correctIndex: 1,
    explanation: 'Monetising the deficit at full employment expands broad money supply (M3) without increasing real goods supply, producing demand-pull inflation.',
    hints: [
      'Monetization means central bank prints currency to purchase government bonds.',
      'If aggregate output cannot grow (at full employment), more money chasing same goods creates inflation.',
      'Deficit monetization at full capacity.'
    ],
  },
  {
    id: 'ch_a5',
    nodeId: NODE_030,
    type: 'drag_sort',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Order the steps of a Discretionary Expansionary Fiscal Policy implementation from initial economic shock to final income expansion:',
    sortItems: [
      '1. Recessinary Gap develops in the economy',
      '2. Government enacts legislation to boost infrastructure expenditure (G)',
      '3. Initial public spending injection increases disposable income of contractors & workers',
      '4. Induced consumer spending cycles cascade through the economy via Multiplier (K_g)',
      '5. Aggregate Demand curve shifts right to restore full employment output Y*'
    ],
    explanation: 'Discretionary policy begins with observing a gap, passing policy, injecting funds, inducing consumption cycles through multiplier, and finally shifting Aggregate Demand.',
    hints: [
      'Start with the recessionary shock.',
      'Followed by legislative action.',
      'Then primary injection -> multiplier consumption waves -> AD equilibrium shift.'
    ],
  },
  {
    id: 'ch_a6',
    nodeId: NODE_026,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Policy Formulation',
    question: 'Which fiscal reform strategy is considered the most sustainable and structurally sound method for reducing Revenue Deficit without harming long-term economic growth?',
    options: [
      'Cutting capital expenditure on roads, railways, and public hospitals',
      'Broadening the tax base, improving tax compliance (GST/Direct Tax), and rationalizing non-targeted subsidies while maintaining capital investment',
      'Monetising debt continuously through RBI bond purchase',
      'Printing money to pay interest on past public debt'
    ],
    correctIndex: 1,
    explanation: 'Cutting capital expenditure damages long-term economic growth. Sustainable fiscal consolidation relies on broadening tax base, reducing wasteful revenue leaks, and preserving capital investments.',
    hints: [
      'Cutting capital expenditure damages future productivity.',
      'Sustainable fiscal health requires increasing structural revenue receipts.',
      'Tax base expansion + targeted subsidy rationalization.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_a7',
    nodeId: NODE_028,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'How does Goods and Services Tax (GST) eliminate the cascading effect of taxation in a supply chain?',
    options: [
      'By charging tax only on foreign imports',
      'By providing Input Tax Credit (ITC) for taxes paid on inputs at each previous stage of value addition',
      'By levying a single lump-sum annual tax on manufacturers',
      'By exempting all consumer goods from indirect taxes'
    ],
    correctIndex: 1,
    explanation: 'GST provides Input Tax Credit (ITC), allowing tax paid on input purchases to be offset against tax payable on output sales, taxing only net value addition at each stage.',
    hints: [
      'Cascading effect = tax on tax.',
      'Input Tax Credit ensures producers get credit for tax already paid by suppliers.',
      'ITC eliminates tax compounding.'
    ],
  },
  {
    id: 'ch_a8',
    nodeId: NODE_058,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'During a stagflationary environment (high inflation combined with stagnant GDP growth), what fiscal-monetary policy mix creates the most delicate dilemma for policy makers?',
    options: [
      'Expansionary fiscal spending increases output but further escalates inflation, while contractionary fiscal policy lowers inflation but worsens unemployment.',
      'Fiscal deficit automatically drops to zero.',
      'Tax increases boost GDP growth and reduce inflation simultaneously without trade-off.',
      'Disinvestment eliminates both inflation and unemployment instantly.'
    ],
    correctIndex: 0,
    explanation: 'Stagflation presents a conflict: boosting AD to fix unemployment worsens inflation, while tightening fiscal policy to tame inflation worsens unemployment.',
    hints: [
      'Stagflation = Stagnation (low growth/high unemployment) + Inflation.',
      'Expansionary tools fix stagnation but spark inflation.',
      'Contractionary tools fix inflation but deepen stagnation.'
    ],
  },
];

// -----------------------------------------------------------------------------
// TOPIC SPECIFIC SVG DIAGRAM COMPONENTS
// -----------------------------------------------------------------------------

// Diagram 1: Interactive Government Budget Structure Flowchart
const BudgetStructureDiagram: React.FC<{
  taxRev: number;
  nonTaxRev: number;
  debtCap: number;
  nonDebtCap: number;
  revExp: number;
  capExp: number;
}> = ({ taxRev, nonTaxRev, debtCap, nonDebtCap, revExp, capExp }) => {
  const totalRevReceipts = taxRev + nonTaxRev;
  const totalCapReceipts = debtCap + nonDebtCap;
  const totalReceipts = totalRevReceipts + totalCapReceipts;
  const totalExpenditure = revExp + capExp;
  const revDeficit = Math.max(0, revExp - totalRevReceipts);
  const fiscalDeficit = Math.max(0, totalExpenditure - (totalRevReceipts + nonDebtCap));

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-2xl">
      <h3 className="text-sm font-semibold text-emerald-400 mb-2 tracking-wide uppercase flex items-center gap-2">
        <span>📊</span> Union Budget Flow Architecture & Deficit Breakdown
      </h3>
      <svg viewBox="0 0 800 360" className="w-full h-auto rounded-lg bg-slate-950">
        <defs>
          <linearGradient id="revGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="expGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="defGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* TOP LEVEL BUDGET HEADER */}
        <rect x="260" y="12" width="280" height="40" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="400" y="37" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="bold">
          GOVERNMENT BUDGET (Total: ₹{totalExpenditure} Cr)
        </text>

        {/* LEFT COLUMN: RECEIPTS */}
        <path d="M 330 52 L 200 90" stroke="#38bdf8" strokeWidth="2" fill="none" />
        <rect x="100" y="90" width="200" height="34" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
        <text x="200" y="112" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">
          RECEIPTS: ₹{totalReceipts} Cr
        </text>

        {/* Sub Receipts */}
        <path d="M 150 124 L 100 160" stroke="#10b981" strokeWidth="1.5" fill="none" />
        <rect x="20" y="160" width="160" height="60" rx="6" fill="url(#revGrad)" />
        <text x="100" y="182" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Revenue Receipts</text>
        <text x="100" y="198" textAnchor="middle" fill="#e2e8f0" fontSize="10">Tax: ₹{taxRev} | Non-Tax: ₹{nonTaxRev}</text>
        <text x="100" y="212" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Total: ₹{totalRevReceipts} Cr</text>

        <path d="M 250 124 L 300 160" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
        <rect x="220" y="160" width="160" height="60" rx="6" fill="url(#capGrad)" />
        <text x="300" y="182" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Capital Receipts</text>
        <text x="300" y="198" textAnchor="middle" fill="#e2e8f0" fontSize="10">Debt: ₹{debtCap} | Non-Debt: ₹{nonDebtCap}</text>
        <text x="300" y="212" textAnchor="middle" fill="#bfdbfe" fontSize="11" fontWeight="bold">Total: ₹{totalCapReceipts} Cr</text>

        {/* RIGHT COLUMN: EXPENDITURE */}
        <path d="M 470 52 L 600 90" stroke="#f59e0b" strokeWidth="2" fill="none" />
        <rect x="500" y="90" width="200" height="34" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="600" y="112" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">
          EXPENDITURE: ₹{totalExpenditure} Cr
        </text>

        {/* Sub Expenditure */}
        <path d="M 550 124 L 500 160" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
        <rect x="420" y="160" width="160" height="60" rx="6" fill="url(#expGrad)" />
        <text x="500" y="182" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Revenue Expenditure</text>
        <text x="500" y="198" textAnchor="middle" fill="#fef3c7" fontSize="10">Salaries, Pensions, Interest</text>
        <text x="500" y="212" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">₹{revExp} Cr</text>

        <path d="M 650 124 L 700 160" stroke="#10b981" strokeWidth="1.5" fill="none" />
        <rect x="620" y="160" width="160" height="60" rx="6" fill="#047857" />
        <text x="700" y="182" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Capital Expenditure</text>
        <text x="700" y="198" textAnchor="middle" fill="#d1fae5" fontSize="10">Roads, Infra, Machinery</text>
        <text x="700" y="212" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">₹{capExp} Cr</text>

        {/* BOTTOM SECTION: DEFICIT SUMMARY METRICS */}
        <rect x="40" y="250" width="720" height="90" rx="8" fill="#020617" stroke="#475569" strokeWidth="1.5" />

        {/* Revenue Deficit Box */}
        <rect x="60" y="265" width="200" height="60" rx="6" fill={revDeficit > 0 ? 'url(#defGrad)' : '#064e3b'} />
        <text x="160" y="285" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Revenue Deficit</text>
        <text x="160" y="303" textAnchor="middle" fill="#fecaca" fontSize="11">(Rev Exp - Rev Receipts)</text>
        <text x="160" y="318" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="extrabold">₹{revDeficit} Cr</text>

        {/* Fiscal Deficit Box */}
        <rect x="300" y="265" width="200" height="60" rx="6" fill={fiscalDeficit > 0 ? 'url(#defGrad)' : '#064e3b'} />
        <text x="400" y="285" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Fiscal Deficit</text>
        <text x="400" y="303" textAnchor="middle" fill="#fecaca" fontSize="11">(Total Borrowing Req.)</text>
        <text x="400" y="318" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="extrabold">₹{fiscalDeficit} Cr</text>

        {/* Borrowing Match Indicator */}
        <rect x="540" y="265" width="200" height="60" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
        <text x="640" y="285" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">Debt Capital Receipt</text>
        <text x="640" y="303" textAnchor="middle" fill="#c7d2fe" fontSize="10">Required to balance</text>
        <text x="640" y="318" textAnchor="middle" fill="#67e8f9" fontSize="13" fontWeight="bold">₹{debtCap} Cr</text>
      </svg>
    </div>
  );
};

// Diagram 2: Keynesian Aggregate Demand Shift & Keynes Multiplier Curve
const AggregateDemandGraphSVG: React.FC<{
  mpc: number;
  taxRate: number;
  govExp: number;
  autonomousC: number;
}> = ({ mpc, taxRate, govExp, autonomousC }) => {
  const effectiveSlope = mpc * (1 - taxRate);
  // Y = (C0 + G) / (1 - effectiveSlope)
  const baseG = 200;
  const autonomousTotal = autonomousC + govExp;
  const baseTotal = autonomousC + baseG;

  const eqY = Math.min(3000, Math.round(autonomousTotal / Math.max(0.05, 1 - effectiveSlope)));
  const baseEqY = Math.min(3000, Math.round(baseTotal / Math.max(0.05, 1 - effectiveSlope)));
  const multiplier = (1 / Math.max(0.05, 1 - effectiveSlope)).toFixed(2);

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-2xl">
      <h3 className="text-sm font-semibold text-cyan-400 mb-2 tracking-wide uppercase flex items-center gap-2">
        <span>📈</span> Aggregate Demand (AD = C + I + G) & Keynesian Multiplier
      </h3>
      <svg viewBox="0 0 600 320" className="w-full h-auto rounded-lg bg-slate-950">
        {/* Grid lines */}
        <line x1="50" y1="270" x2="550" y2="270" stroke="#475569" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="270" stroke="#475569" strokeWidth="2" />

        {/* 45 degree line (Y = AD) */}
        <line x1="50" y1="270" x2="500" y2="30" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
        <text x="505" y="30" fill="#94a3b8" fontSize="11">45° (Y = AD)</text>

        {/* Baseline AD Line */}
        <line x1="50" y1="220" x2="520" y2={220 - 450 * effectiveSlope * 0.4} stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
        <text x="525" y={225 - 450 * effectiveSlope * 0.4} fill="#94a3b8" fontSize="10">AD0 (G0)</text>

        {/* Current AD Line */}
        {/* Y-intercept maps autonomousTotal */}
        {(() => {
          const yInt = Math.max(40, 270 - (autonomousTotal / 1500) * 180);
          const yEnd = Math.max(20, yInt - 450 * effectiveSlope * 0.35);
          return (
            <>
              <line x1="50" y1={yInt} x2="520" y2={yEnd} stroke="#06b6d4" strokeWidth="3" />
              <text x="525" y={yEnd} fill="#38bdf8" fontSize="11" fontWeight="bold">AD1 (G = ₹{govExp})</text>
              <circle cx="50" cy={yInt} r="4" fill="#38bdf8" />
            </>
          );
        })()}

        {/* Equilibrium Point Indicator */}
        {(() => {
          const cx = Math.min(480, 50 + (eqY / 3000) * 430);
          const cy = Math.max(30, 270 - (eqY / 3000) * 230);
          return (
            <g>
              <line x1={cx} y1={cy} x2={cx} y2="270" stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="1.5" />
              <line x1="50" y1={cy} x2={cx} y2={cy} stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="1.5" />
              <circle cx={cx} cy={cy} r="6" fill="#f59e0b" />
              <text x={cx + 8} y={cy - 8} fill="#fbbf24" fontSize="12" fontWeight="bold">E* (Y* = ₹{eqY} Cr)</text>
            </g>
          );
        })()}

        {/* Axes Labels */}
        <text x="300" y="305" textAnchor="middle" fill="#cbd5e1" fontSize="12">National Income / Output (Y)</text>
        <text x="18" y="150" textAnchor="middle" fill="#cbd5e1" fontSize="12" transform="rotate(-90 18 150)">Aggregate Demand (AD)</text>

        {/* Multiplier Info Box */}
        <rect x="360" y="180" width="220" height="75" rx="6" fill="#0f172a" stroke="#0891b2" strokeWidth="1.5" />
        <text x="370" y="200" fill="#38bdf8" fontSize="11" fontWeight="bold">Effective MPC: {effectiveSlope.toFixed(2)}</text>
        <text x="370" y="220" fill="#a5f3fc" fontSize="12" fontWeight="bold">Gov Multiplier Kg = {multiplier}</text>
        <text x="370" y="240" fill="#e0f2fe" fontSize="10">ΔY = Kg × ΔG</text>
      </svg>
    </div>
  );
};

// Diagram 3: Crowding Out Effect & Loanable Funds Interest Rate Shift
const DeficitCrowdingOutSVG: React.FC<{ fiscalDeficit: number; interestRate: number }> = ({
  fiscalDeficit,
  interestRate,
}) => {
  const privateInvestment = Math.max(100, Math.round(1200 - interestRate * 80));
  const loanableDemandShift = Math.min(180, (fiscalDeficit / 10000) * 120);

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-2xl">
      <h3 className="text-sm font-semibold text-rose-400 mb-2 tracking-wide uppercase flex items-center gap-2">
        <span>📉</span> Fiscal Deficit vs Crowding Out of Private Investment
      </h3>
      <svg viewBox="0 0 600 300" className="w-full h-auto rounded-lg bg-slate-950">
        {/* Axes */}
        <line x1="50" y1="250" x2="550" y2="250" stroke="#475569" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="250" stroke="#475569" strokeWidth="2" />

        {/* Supply of Loanable Funds (SLF) */}
        <line x1="80" y1="220" x2="480" y2="40" stroke="#10b981" strokeWidth="2.5" />
        <text x="490" y="45" fill="#34d399" fontSize="11" fontWeight="bold">SLF (Savings)</text>

        {/* Initial Demand DLF0 */}
        <line x1="80" y1="60" x2="480" y2="230" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
        <text x="490" y="235" fill="#94a3b8" fontSize="10">DLF0 (Private)</text>

        {/* Shifted Demand DLF1 due to Gov Borrowing */}
        <line
          x1={80 + loanableDemandShift}
          y1="60"
          x2={Math.min(540, 480 + loanableDemandShift)}
          y2="230"
          stroke="#f43f5e"
          strokeWidth="3"
        />
        <text x={Math.min(540, 485 + loanableDemandShift)} y="220" fill="#fb7185" fontSize="11" fontWeight="bold">
          DLF1 (Gov+Private)
        </text>

        {/* Shift Arrow */}
        <path
          d={`M ${280} 130 Q ${280 + loanableDemandShift / 2} 120 ${280 + loanableDemandShift} 130`}
          fill="none"
          stroke="#f43f5e"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />

        {/* Dynamic Interest Rate line */}
        {(() => {
          const rY = Math.max(50, 250 - interestRate * 18);
          return (
            <g>
              <line x1="50" y1={rY} x2="520" y2={rY} stroke="#fbbf24" strokeDasharray="4 4" strokeWidth="1.5" />
              <circle cx="280" cy={rY} r="5" fill="#fbbf24" />
              <text x="60" y={rY - 6} fill="#fbbf24" fontSize="11" fontWeight="bold">r = {interestRate.toFixed(1)}%</text>
            </g>
          );
        })()}

        {/* Axis Labels */}
        <text x="300" y="285" textAnchor="middle" fill="#cbd5e1" fontSize="12">Quantity of Loanable Funds</text>
        <text x="18" y="140" textAnchor="middle" fill="#cbd5e1" fontSize="12" transform="rotate(-90 18 140)">Real Interest Rate (r %)</text>

        {/* Summary Card */}
        <rect x="340" y="150" width="220" height="85" rx="6" fill="#0f172a" stroke="#e11d48" strokeWidth="1.5" />
        <text x="350" y="172" fill="#fda4af" fontSize="11" fontWeight="bold">Fiscal Deficit: ₹{fiscalDeficit} Cr</text>
        <text x="350" y="192" fill="#f43f5e" fontSize="11" fontWeight="bold">Interest Rate Push: +{(loanableDemandShift / 20).toFixed(1)}%</text>
        <text x="350" y="212" fill="#38bdf8" fontSize="12" fontWeight="extrabold">Private Investment: ₹{privateInvestment} Cr</text>

        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

// Canvas Animated Component: Flow of Money in National Economy
const EconomyCanvasSim: React.FC<{
  govExp: number;
  taxRate: number;
  inflation: number;
  isRecession: boolean;
}> = ({ govExp, taxRate, inflation, isRecession }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; color: string; size: number }[] = [];

    // Initialize particles representing money flows
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (1 + govExp / 400),
        vy: (Math.random() - 0.5) * (1 + govExp / 400),
        color: i % 2 === 0 ? '#10b981' : i % 3 === 0 ? '#38bdf8' : '#f59e0b',
        size: Math.random() * 3 + 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background indicator based on state
      if (isRecession) {
        ctx.fillStyle = 'rgba(30, 41, 59, 0.4)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (inflation > 7) {
        ctx.fillStyle = 'rgba(127, 29, 29, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw Institutions (Nodes)
      // Node 1: Households (Left)
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(80, 100, 35, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Households', 80, 104);

      // Node 2: Government Treasury (Center)
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(250, 100, 42, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#34d399';
      ctx.fillText('Gov Treasury', 250, 98);
      ctx.font = '10px sans-serif';
      ctx.fillText(`Tax: ${(taxRate * 100).toFixed(0)}%`, 250, 114);

      // Node 3: Markets / Producers (Right)
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#f59e0b';
      ctx.font = 'bold 11px sans-serif';
      ctx.beginPath();
      ctx.arc(420, 100, 35, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.fillText('Firms/Infra', 420, 104);

      // Draw particle flow animation
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Inflation Warning Banner inside canvas
      if (inflation > 7) {
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(`⚠️ HIGH INFLATION ALERT: ${inflation.toFixed(1)}%`, 250, 185);
      } else {
        ctx.fillStyle = '#10b981';
        ctx.font = '11px sans-serif';
        ctx.fillText(`Economy Condition: Stable (Inflation ${inflation.toFixed(1)}%)`, 250, 185);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [govExp, taxRate, inflation, isRecession]);

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-inner">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          🌐 Animated Circular Flow of Macro-Funds
        </span>
        <span className="text-xs text-slate-400">Live Simulation Engine</span>
      </div>
      <canvas ref={canvasRef} width={500} height={200} className="w-full h-auto rounded-lg bg-slate-950 border border-slate-800" />
    </div>
  );
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT DEFINITION
// -----------------------------------------------------------------------------
export const C12_EcoGovernmentBudgetCBSESim: React.FC<{ onComplete?: (score: number) => void }> = ({
  onComplete,
}) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabStepIndex, setActiveLabStepIndex] = useState<number>(0);

  // Discovery Question State
  const [selectedDiscoveryOption, setSelectedDiscoveryOption] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Interactive Lab Model Variables
  const [taxRevenue, setTaxRevenue] = useState<number>(14000); // ₹ Crore
  const [nonTaxRevenue, setNonTaxRevenue] = useState<number>(3000);
  const [debtCapitalReceipt, setDebtCapitalReceipt] = useState<number>(5000);
  const [nonDebtCapitalReceipt, setNonDebtCapitalReceipt] = useState<number>(1000);
  const [revenueExpenditure, setRevenueExpenditure] = useState<number>(18000);
  const [capitalExpenditure, setCapitalExpenditure] = useState<number>(5000);
  const [interestPayments, setInterestPayments] = useState<number>(2000);

  // Keynesian Model Parameters
  const [mpc, setMpc] = useState<number>(0.75);
  const [taxRate, setTaxRate] = useState<number>(0.2); // 20%
  const [govSpending, setGovSpending] = useState<number>(500); // ₹ Crore
  const [transferPayments, setTransferPayments] = useState<number>(200);
  const [autonomousC, setAutonomousC] = useState<number>(300);

  // Macro Shocks & State
  const [isRecessionShock, setIsRecessionShock] = useState<boolean>(false);
  const [deficitMonetization, setDeficitMonetization] = useState<number>(0);

  // Prediction & Observation Answers State
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean[]>([false, false]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);
  const [observationSubmitted, setObservationSubmitted] = useState<boolean[]>([false, false]);

  // Challenge Mode State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [userMcqChoice, setUserMcqChoice] = useState<number | null>(null);
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [userDragItems, setUserDragItems] = useState<string[]>([]);
  const [userClassify, setUserClassify] = useState<{ [item: string]: string }>({});
  const [challengeAnswered, setChallengeAnswered] = useState<boolean>(false);
  const [challengeIsCorrect, setChallengeIsCorrect] = useState<boolean>(false);
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);

  // Feedback & Audio Visual FX State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // SRS & BKT Mastery tracking state
  const [bktStates, setBktStates] = useState<{ [nodeId: string]: BKTState }>({});
  const [srsItems, setSrsItems] = useState<{ [nodeId: string]: SRSItem }>({});

  // Hint auto-timer ref
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize BKT and SRS states
  useEffect(() => {
    const initialBkt: { [nodeId: string]: BKTState } = {};
    const initialSrs: { [nodeId: string]: SRSItem } = {};

    ALL_NODE_IDS.forEach((nodeId) => {
      initialBkt[nodeId] = createBKTState();
      initialSrs[nodeId] = createReviewItem(nodeId);
    });

    setBktStates(initialBkt);
    setSrsItems(initialSrs);
  }, []);

  // Setup current challenge drag items when challenge changes
  const activeChallenge = CHALLENGES[currentChallengeIndex];

  useEffect(() => {
    if (activeChallenge?.type === 'drag_sort' && activeChallenge.sortItems) {
      // Shuffle items for sorting
      const shuffled = [...activeChallenge.sortItems].sort(() => Math.random() - 0.5);
      setUserDragItems(shuffled);
    }
    setUserMcqChoice(null);
    setUserNumericInput('');
    setUserClassify({});
    setChallengeAnswered(false);
    setChallengeIsCorrect(false);
    setHintLevel(0);
    setShowHint(false);
  }, [currentChallengeIndex, activeChallenge]);

  // Reset inactivity timer for auto hint
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !challengeAnswered && activeChallenge) {
        setShowHint(true);
        setHintText(activeChallenge.hints[hintLevel] || 'Think carefully about the fiscal definitions!');
        audioManager.play('hint');
      }
    }, 12000); // 12 sec inactivity hint
  }, [activeTab, challengeAnswered, activeChallenge, hintLevel]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, userMcqChoice, userNumericInput]);

  // ---------------------------------------------------------------------------
  // DERIVED CALCULATIONS FOR FISCAL SIMULATOR
  // ---------------------------------------------------------------------------
  const totalRevReceipts = taxRevenue + nonTaxRevenue;
  const totalCapReceipts = debtCapitalReceipt + nonDebtCapitalReceipt;
  const totalReceipts = totalRevReceipts + totalCapReceipts;
  const totalExpenditure = revenueExpenditure + capitalExpenditure;

  const revenueDeficit = Math.max(0, revenueExpenditure - totalRevReceipts);
  const fiscalDeficit = Math.max(0, totalExpenditure - (totalRevReceipts + nonDebtCapitalReceipt));
  const primaryDeficit = Math.max(0, fiscalDeficit - interestPayments);

  // Keynesian Equilibrium Output Calculation
  const effectiveMPC = mpc * (1 - taxRate);
  const totalAutonomous = autonomousC + govSpending + transferPayments * mpc;
  const equilibriumY = Math.round(totalAutonomous / Math.max(0.05, 1 - effectiveMPC));
  const govMultiplier = (1 / Math.max(0.05, 1 - effectiveMPC)).toFixed(2);
  const taxMultiplier = ((-mpc) / Math.max(0.05, 1 - effectiveMPC)).toFixed(2);
  const balancedBudgetMultiplier = ((1 - mpc) / Math.max(0.05, 1 - effectiveMPC)).toFixed(2);

  // Crowding out interest rate impact
  const calculatedInterestRate = 5 + (fiscalDeficit / 1500);

  // Inflation indicator
  const calculatedInflation = 3.5 + (deficitMonetization / 1000) * 4.5 + (fiscalDeficit > 10000 ? 2.5 : 0);

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------
  const handleDiscoverySubmit = (index: number) => {
    setSelectedDiscoveryOption(index);
    setDiscoverySubmitted(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Spot on! The Balanced Budget Multiplier equals exactly 1.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider both expenditure and tax multipliers combined.');
    }
  };

  const handlePredictionSubmit = (predIndex: number, optionIdx: number) => {
    const updated = [...predictionAnswers];
    updated[predIndex] = optionIdx;
    setPredictionAnswers(updated);

    const updatedSub = [...predictionSubmitted];
    updatedSub[predIndex] = true;
    setPredictionSubmitted(updatedSub);

    if (optionIdx === PREDICTION_QUESTIONS[predIndex].correctIndex) {
      audioManager.play('success');
      speechManager.speak('Excellent prediction!');
    } else {
      audioManager.play('error');
    }
  };

  const handleObservationSubmit = (obsIndex: number, optionIdx: number) => {
    const updated = [...observationAnswers];
    updated[obsIndex] = optionIdx;
    setObservationAnswers(updated);

    const updatedSub = [...observationSubmitted];
    updatedSub[obsIndex] = true;
    setObservationSubmitted(updatedSub);

    if (optionIdx === OBSERVATION_QUESTIONS[obsIndex].correctIndex) {
      audioManager.play('success');
    } else {
      audioManager.play('error');
    }
  };

  const handleChallengeSubmit = () => {
    if (!activeChallenge) return;
    let isCorrect = false;

    if (activeChallenge.type === 'multiple_choice') {
      isCorrect = userMcqChoice === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'numeric') {
      const val = parseFloat(userNumericInput);
      const target = activeChallenge.correctAnswer ?? 0;
      const tol = activeChallenge.tolerance ?? 0.5;
      isCorrect = Math.abs(val - target) <= tol;
    } else if (activeChallenge.type === 'drag_sort') {
      const expected = activeChallenge.sortItems ?? [];
      isCorrect = JSON.stringify(userDragItems) === JSON.stringify(expected);
    } else if (activeChallenge.type === 'classify') {
      const categories = activeChallenge.categories ?? [];
      let allMatched = true;
      categories.forEach((cat) => {
        cat.items.forEach((item) => {
          if (userClassify[item] !== cat.name) {
            allMatched = false;
          }
        });
      });
      isCorrect = allMatched;
    }

    setChallengeAnswered(true);
    setChallengeIsCorrect(isCorrect);

    // Update BKT & SRS
    const nodeId = activeChallenge.nodeId;
    const currentBkt = bktStates[nodeId] || createBKTState();
    const updatedBkt = bktUpdate(currentBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBkt }));

    const currentSrs = srsItems[nodeId] || createReviewItem(nodeId);
    const updatedSrs = sm2Update(currentSrs, isCorrect ? 5 : 2);
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSrs }));

    if (isCorrect) {
      audioManager.play('celebration');
      speechManager.speak('Correct answer! Mastered this fiscal node.');
      setTotalScore((prev) => prev + (activeChallenge.difficulty === 'advanced' ? 15 : activeChallenge.difficulty === 'standard' ? 10 : 5));
      setShowSparkle(true);
      setShowSuccessBanner(true);
      setTimeout(() => {
        setShowSparkle(false);
        setShowSuccessBanner(false);
      }, 2500);
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect. Check the detailed solution and hints.');
    }
  };

  const handleNextChallenge = () => {
    audioManager.play('whoosh');
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowConfetti(true);
      speechManager.speak('Congratulations! You have completed the Union Budget & Macro Fiscal Policy Master Course.');
      recordGameScore('C12_EcoGovernmentBudgetCBSESim', totalScore);
      if (onComplete) onComplete(totalScore);
    }
  };

  const cycleHint = () => {
    audioManager.play('hint');
    if (!activeChallenge) return;
    setShowHint(true);
    const nextLevel = (hintLevel + 1) % activeChallenge.hints.length;
    setHintLevel(nextLevel);
    setHintText(activeChallenge.hints[nextLevel]);
  };

  // Drag and drop helper for drag_sort
  const handleMoveSortItem = (fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    const updated = [...userDragItems];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setUserDragItems(updated);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-2 sm:p-4 md:p-6 flex flex-col items-center">
      {/* ------------------------------------------------------------------- */}
      {/* GLOBAL HEADER & TOP NAVIGATION */}
      {/* ------------------------------------------------------------------- */}
      <header className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
              ISC Class 12 Economics
            </span>
            <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-2.5 py-1 rounded-full border border-cyan-500/30">
              Macroeconomics
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1 tracking-tight">
            Government Budget and the Economy
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Interactive Fiscal Policy Lab • Deficit Identifiers • Keynes Multipliers • Debt Dynamics
          </p>
        </div>

        {/* Tab Buttons */}
        <nav className="flex items-center gap-1 sm:gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              audioManager.play('tap');
              setActiveTab('discovery');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'discovery'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            💡 Discovery
          </button>
          <button
            onClick={() => {
              audioManager.play('tap');
              setActiveTab('lab');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'lab'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            🔬 Interactive Lab
          </button>
          <button
            onClick={() => {
              audioManager.play('tap');
              setActiveTab('challenges');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'challenges'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            🎯 Challenges ({CHALLENGES.length})
          </button>
          <button
            onClick={() => {
              audioManager.play('tap');
              setActiveTab('summary');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'summary'
                ? 'bg-purple-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            📚 Summary & Real World
          </button>
        </nav>
      </header>

      {/* ------------------------------------------------------------------- */}
      {/* MAIN CONTENT AREA BY TAB */}
      {/* ------------------------------------------------------------------- */}
      <main className="w-full max-w-6xl flex-1 flex flex-col gap-6">

        {/* TAB 1: DISCOVERY */}
        {activeTab === 'discovery' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Scenario Header Card */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🏛️</span>
                <div>
                  <h2 className="text-xl font-bold text-emerald-400">{SCENARIO.title}</h2>
                  <p className="text-xs text-slate-400">Chief Economic Advisor Sandbox</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl text-xs text-slate-300">
                <span className="font-bold text-emerald-400">Your Objective: </span>
                {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Counterintuitive Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full">
                  Pre-conception Challenge
                </span>
                <span className="text-xs text-slate-400">Think deeply before answering!</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 gap-3 mb-6">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-4 rounded-xl text-left text-sm transition-all flex items-start gap-3 border ${
                      discoverySubmitted
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium'
                          : selectedDiscoveryOption === idx
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-950/50 border-slate-800 text-slate-500'
                        : selectedDiscoveryOption === idx
                        ? 'bg-slate-800 border-emerald-400 text-white'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 text-xs sm:text-sm text-emerald-300 animate-fadeIn">
                  <p className="font-bold text-emerald-400 mb-1">💡 Economic Explanation:</p>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* Render PREDICTION QUESTIONS inside Discovery */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-md font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <span>🔮</span> Prediction Lab Scenarios
              </h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                  <div key={pIdx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                    <p className="text-sm font-semibold text-slate-200 mb-3">{pred.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {pred.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          disabled={predictionSubmitted[pIdx]}
                          onClick={() => handlePredictionSubmit(pIdx, oIdx)}
                          className={`p-3 rounded-lg text-xs text-left transition-all border ${
                            predictionSubmitted[pIdx]
                              ? oIdx === pred.correctIndex
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold'
                                : predictionAnswers[pIdx] === oIdx
                                ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                                : 'bg-slate-900/40 border-slate-800 text-slate-500'
                              : 'bg-slate-900 border-slate-800 hover:border-cyan-500 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionSubmitted[pIdx] && (
                      <p className="text-xs text-cyan-300 bg-cyan-950/40 border border-cyan-800 p-2.5 rounded-lg">
                        🔍 <strong>Verification Instruction:</strong> {pred.verifyInstruction}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LAB */}
        {activeTab === 'lab' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Step Navigation Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                Interactive Exploration Steps (Lab 1 - 5)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {EXPLORATION_STEPS.map((step, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => {
                      audioManager.play('tap');
                      setActiveLabStepIndex(sIdx);
                    }}
                    className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between ${
                      activeLabStepIndex === sIdx
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <span className="text-xs font-extrabold text-cyan-400">Step {sIdx + 1}</span>
                    <span className="text-xs font-medium line-clamp-2 mt-1">{step.title.split(':')[1] || step.title}</span>
                  </button>
                ))}
              </div>

              {/* Instruction banner for active step */}
              <div className="mt-4 bg-slate-950 border border-cyan-500/30 p-3.5 rounded-xl text-xs sm:text-sm text-cyan-200 flex items-start gap-2">
                <span className="text-cyan-400 text-base">ℹ️</span>
                <div>
                  <strong className="text-white">{EXPLORATION_STEPS[activeLabStepIndex].title}: </strong>
                  {EXPLORATION_STEPS[activeLabStepIndex].instruction}
                </div>
              </div>
            </div>

            {/* STEP SPECIFIC INTERACTIVE LAB PANELS */}

            {/* STEP 1: BUDGET SLIDERS & DEFICIT IDENTIFIERS */}
            {activeLabStepIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Sliders Panel */}
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                    <span>⚙️ Budget Receipts & Spending</span>
                    <button
                      onClick={() => {
                        setTaxRevenue(14000);
                        setNonTaxRevenue(3000);
                        setDebtCapitalReceipt(5000);
                        setNonDebtCapitalReceipt(1000);
                        setRevenueExpenditure(18000);
                        setCapitalExpenditure(5000);
                        setInterestPayments(2000);
                      }}
                      className="text-xs text-slate-400 hover:text-white underline"
                    >
                      Reset Values
                    </button>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300 font-medium">Tax Revenue Receipts (Direct + Indirect):</span>
                        <span className="text-emerald-400 font-bold">₹{taxRevenue} Cr</span>
                      </div>
                      <input
                        type="range"
                        min="5000"
                        max="30000"
                        step="500"
                        value={taxRevenue}
                        onChange={(e) => {
                          audioManager.play('count');
                          setTaxRevenue(Number(e.target.value));
                        }}
                        className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300 font-medium">Non-Tax Revenue Receipts (Dividends/Fees):</span>
                        <span className="text-emerald-400 font-bold">₹{nonTaxRevenue} Cr</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="10000"
                        step="250"
                        value={nonTaxRevenue}
                        onChange={(e) => setNonTaxRevenue(Number(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300 font-medium">Non-Debt Capital Receipts (Disinvestment/Loans):</span>
                        <span className="text-cyan-400 font-bold">₹{nonDebtCapitalReceipt} Cr</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="250"
                        value={nonDebtCapitalReceipt}
                        onChange={(e) => setNonDebtCapitalReceipt(Number(e.target.value))}
                        className="w-full accent-cyan-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="border-t border-slate-800 pt-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300 font-medium">Revenue Expenditure (Salaries/Pensions):</span>
                        <span className="text-amber-400 font-bold">₹{revenueExpenditure} Cr</span>
                      </div>
                      <input
                        type="range"
                        min="10000"
                        max="35000"
                        step="500"
                        value={revenueExpenditure}
                        onChange={(e) => {
                          audioManager.play('count');
                          setRevenueExpenditure(Number(e.target.value));
                        }}
                        className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300 font-medium">Capital Expenditure (Infra/Highways):</span>
                        <span className="text-amber-400 font-bold">₹{capitalExpenditure} Cr</span>
                      </div>
                      <input
                        type="range"
                        min="1000"
                        max="15000"
                        step="500"
                        value={capitalExpenditure}
                        onChange={(e) => setCapitalExpenditure(Number(e.target.value))}
                        className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300 font-medium">Interest Payments on Past Debt:</span>
                        <span className="text-rose-400 font-bold">₹{interestPayments} Cr</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="250"
                        value={interestPayments}
                        onChange={(e) => setInterestPayments(Number(e.target.value))}
                        className="w-full accent-rose-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* SVG Visualizer */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <BudgetStructureDiagram
                    taxRev={taxRevenue}
                    nonTaxRev={nonTaxRevenue}
                    debtCap={fiscalDeficit}
                    nonDebtCap={nonDebtCapitalReceipt}
                    revExp={revenueExpenditure}
                    capExp={capitalExpenditure}
                  />

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center">
                      <div className="text-xs text-slate-400">Revenue Deficit</div>
                      <div className="text-base font-extrabold text-amber-400">₹{revenueDeficit} Cr</div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center">
                      <div className="text-xs text-slate-400">Fiscal Deficit</div>
                      <div className="text-base font-extrabold text-rose-400">₹{fiscalDeficit} Cr</div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center">
                      <div className="text-xs text-slate-400">Primary Deficit</div>
                      <div className="text-base font-extrabold text-purple-400">₹{primaryDeficit} Cr</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: KEYNESIAN MULTIPLIERS & AD */}
            {activeLabStepIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                    🧮 Keynesian Multiplier Controls
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300 font-medium">Marginal Propensity to Consume (MPC c):</span>
                        <span className="text-cyan-400 font-bold">{mpc.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.4"
                        max="0.95"
                        step="0.05"
                        value={mpc}
                        onChange={(e) => {
                          audioManager.play('count');
                          setMpc(Number(e.target.value));
                        }}
                        className="w-full accent-cyan-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300 font-medium">Proportional Tax Rate (t):</span>
                        <span className="text-emerald-400 font-bold">{(taxRate * 100).toFixed(0)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.0"
                        max="0.4"
                        step="0.05"
                        value={taxRate}
                        onChange={(e) => setTaxRate(Number(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300 font-medium">Government Spending (G):</span>
                        <span className="text-amber-400 font-bold">₹{govSpending} Cr</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="1000"
                        step="50"
                        value={govSpending}
                        onChange={(e) => setGovSpending(Number(e.target.value))}
                        className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2 mt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Gov Exp Multiplier (Kg):</span>
                        <span className="text-cyan-300 font-bold">{govMultiplier}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Tax Multiplier (Kt):</span>
                        <span className="text-rose-400 font-bold">{taxMultiplier}</span>
                      </div>
                      <div className="flex justify-between text-xs border-t border-slate-800 pt-2">
                        <span className="text-slate-300 font-semibold">Balanced Budget Multiplier (Kbb):</span>
                        <span className="text-emerald-400 font-bold">{balancedBudgetMultiplier}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <AggregateDemandGraphSVG
                    mpc={mpc}
                    taxRate={taxRate}
                    govExp={govSpending}
                    autonomousC={autonomousC}
                  />
                </div>
              </div>
            )}

            {/* STEP 3: CROWDING OUT & LOANABLE FUNDS */}
            {activeLabStepIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider">
                    🏛️ Deficit Financing & Market Rate
                  </h3>
                  <p className="text-xs text-slate-400">
                    Observe how rising Fiscal Deficit drives up interest rates in loanable funds market and crowds out private sector investment.
                  </p>

                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300 font-medium">Fiscal Deficit Borrowing:</span>
                        <span className="text-rose-400 font-bold">₹{fiscalDeficit} Cr</span>
                      </div>
                      <input
                        type="range"
                        min="1000"
                        max="15000"
                        step="500"
                        value={fiscalDeficit}
                        onChange={(e) => setRevenueExpenditure(totalRevReceipts + Number(e.target.value) - capitalExpenditure + nonDebtCapitalReceipt)}
                        className="w-full accent-rose-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-rose-900/40 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Loanable Funds Demand Shift:</span>
                        <span className="text-rose-300 font-bold">+{(fiscalDeficit / 100).toFixed(0)} units</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Market Equilibrium Interest Rate (r):</span>
                        <span className="text-amber-400 font-extrabold">{calculatedInterestRate.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between text-xs border-t border-slate-800 pt-2">
                        <span className="text-slate-300 font-semibold">Private Sector Capital Formation:</span>
                        <span className="text-rose-400 font-extrabold">₹{Math.max(100, Math.round(1200 - calculatedInterestRate * 80))} Cr</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <DeficitCrowdingOutSVG
                    fiscalDeficit={fiscalDeficit}
                    interestRate={calculatedInterestRate}
                  />
                </div>
              </div>
            )}

            {/* STEP 4: AUTOMATIC STABILIZERS SIMULATION */}
            {activeLabStepIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                    ⚡ Recessinary Shock & Automatic Stabilizer
                  </h3>

                  <button
                    onClick={() => {
                      audioManager.play('swoop');
                      setIsRecessionShock(!isRecessionShock);
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all border ${
                      isRecessionShock
                        ? 'bg-rose-500 text-slate-950 border-rose-400 shadow-lg'
                        : 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg'
                    }`}
                  >
                    {isRecessionShock ? '🚨 Economic Shock Active (Recession)' : '✅ Normal Economic Growth'}
                  </button>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                    <div className="text-slate-300">
                      <strong>Automatic Stabilizer Behavior:</strong> Under progressive income taxes, during recession GDP drops. Tax collections drop automatically faster than GDP, keeping disposable income higher than under lump-sum tax.
                    </div>
                    <div className="flex justify-between text-xs border-t border-slate-800 pt-2">
                      <span className="text-slate-400">Effective Tax Revenue Collected:</span>
                      <span className="text-emerald-400 font-bold">
                        ₹{isRecessionShock ? Math.round(taxRevenue * 0.7) : taxRevenue} Cr
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <EconomyCanvasSim
                    govExp={govSpending}
                    taxRate={taxRate}
                    inflation={calculatedInflation}
                    isRecession={isRecessionShock}
                  />
                </div>
              </div>
            )}

            {/* STEP 5: FRBMA TARGETS & DEBT DYNAMICS */}
            {activeLabStepIndex === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider">
                    📜 FRBMA Compliance Dashboard
                  </h3>
                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-300 font-medium">Deficit Monetization (RBI Printing):</span>
                        <span className="text-rose-400 font-bold">₹{deficitMonetization} Cr</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="100"
                        value={deficitMonetization}
                        onChange={(e) => setDeficitMonetization(Number(e.target.value))}
                        className="w-full accent-purple-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-purple-900/40 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Calculated Inflation Rate:</span>
                        <span className={`font-bold ${calculatedInflation > 7 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {calculatedInflation.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">FRBMA Target Fiscal Deficit % GDP:</span>
                        <span className="text-cyan-300 font-bold">3.0% GDP</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Current Sim Fiscal Deficit Ratio:</span>
                        <span className="text-amber-400 font-bold">
                          {((fiscalDeficit / 250000) * 100).toFixed(1)}% GDP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-slate-200">FRBMA Policy Analysis & Guidelines</h4>
                  <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                    <li>The Fiscal Responsibility and Budget Management Act mandates systematic reduction of fiscal deficit to 3% of GDP.</li>
                    <li>Direct monetisation of deficit by RBI (seigniorage money printing) is restricted to avoid hyper-inflationary demand shocks.</li>
                    <li>Eliminating Revenue Deficit ensures government borrowings are utilized exclusively for wealth-creating Capital Expenditure.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Render OBSERVATION QUESTIONS inside Lab */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-md font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <span>👁️</span> Empirical Lab Observations
              </h3>
              <div className="space-y-6">
                {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                  <div key={oIdx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                    <p className="text-sm font-semibold text-slate-200 mb-3">{obs.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {obs.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          disabled={observationSubmitted[oIdx]}
                          onClick={() => handleObservationSubmit(oIdx, optIdx)}
                          className={`p-3 rounded-lg text-xs text-left transition-all border ${
                            observationSubmitted[oIdx]
                              ? optIdx === obs.correctIndex
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold'
                                : observationAnswers[oIdx] === optIdx
                                ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                                : 'bg-slate-900/40 border-slate-800 text-slate-500'
                              : 'bg-slate-900 border-slate-800 hover:border-emerald-500 text-slate-300'
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

        {/* TAB 3: CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-sm">
                  #{currentChallengeIndex + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
                        activeChallenge.difficulty === 'foundation'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : activeChallenge.difficulty === 'standard'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {activeChallenge.difficulty}
                    </span>
                    <span className="text-xs text-slate-400">{activeChallenge.competencyLevel}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1">
                    Question {currentChallengeIndex + 1} of {CHALLENGES.length}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-400">Total Score</div>
                  <div className="text-lg font-extrabold text-amber-400">{totalScore} pts</div>
                </div>
                <button
                  onClick={cycleHint}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1"
                >
                  💡 Hint ({hintLevel + 1}/{activeChallenge.hints.length})
                </button>
              </div>
            </div>

            {/* Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {activeChallenge.question}
              </h2>

              {/* MCQ QUESTION TYPE */}
              {activeChallenge.type === 'multiple_choice' && activeChallenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {activeChallenge.options.map((option, idx) => (
                    <button
                      key={idx}
                      disabled={challengeAnswered}
                      onClick={() => {
                        audioManager.play('tap');
                        setUserMcqChoice(idx);
                      }}
                      className={`p-4 rounded-xl text-left text-sm transition-all flex items-start gap-3 border ${
                        challengeAnswered
                          ? idx === activeChallenge.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium'
                            : userMcqChoice === idx
                            ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-slate-950/50 border-slate-800 text-slate-500'
                          : userMcqChoice === idx
                          ? 'bg-slate-800 border-amber-400 text-white'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* NUMERIC QUESTION TYPE */}
              {activeChallenge.type === 'numeric' && (
                <div className="flex flex-col gap-3 max-w-md">
                  <label className="text-xs font-semibold text-slate-300">
                    Enter your calculated numerical answer {activeChallenge.unit ? `(${activeChallenge.unit})` : ''}:
                  </label>
                  <input
                    type="number"
                    disabled={challengeAnswered}
                    value={userNumericInput}
                    onChange={(e) => setUserNumericInput(e.target.value)}
                    placeholder="e.g. 5400"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-base focus:border-amber-400 outline-none"
                  />
                </div>
              )}

              {/* DRAG SORT QUESTION TYPE */}
              {activeChallenge.type === 'drag_sort' && (
                <div className="flex flex-col gap-3">
                  <span className="text-xs text-slate-400">Re-order items into the correct sequence (Click arrows):</span>
                  {userDragItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs text-slate-200"
                    >
                      <span>{item}</span>
                      {!challengeAnswered && (
                        <div className="flex gap-1">
                          <button
                            disabled={idx === 0}
                            onClick={() => handleMoveSortItem(idx, idx - 1)}
                            className="p-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 disabled:opacity-30"
                          >
                            ▲
                          </button>
                          <button
                            disabled={idx === userDragItems.length - 1}
                            onClick={() => handleMoveSortItem(idx, idx + 1)}
                            className="p-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 disabled:opacity-30"
                          >
                            ▼
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* CLASSIFY QUESTION TYPE */}
              {activeChallenge.type === 'classify' && activeChallenge.categories && (
                <div className="space-y-4">
                  {activeChallenge.categories.flatMap((c) => c.items).map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                      <span className="text-slate-200 font-semibold">{item}</span>
                      <select
                        disabled={challengeAnswered}
                        value={userClassify[item] || ''}
                        onChange={(e) => {
                          audioManager.play('drop-correct');
                          setUserClassify({ ...userClassify, [item]: e.target.value });
                        }}
                        className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-2 text-xs outline-none focus:border-amber-400"
                      >
                        <option value="">Select Category...</option>
                        {activeChallenge.categories.map((cat, cIdx) => (
                          <option key={cIdx} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit / Next Action Bar */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                {!challengeAnswered ? (
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={
                      (activeChallenge.type === 'multiple_choice' && userMcqChoice === null) ||
                      (activeChallenge.type === 'numeric' && !userNumericInput)
                    }
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-sm shadow-lg transition-all"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg transition-all flex items-center gap-2"
                  >
                    <span>Next Challenge</span>
                    <span>➔</span>
                  </button>
                )}
              </div>

              {/* Answer Explanation Box */}
              {challengeAnswered && (
                <div
                  className={`p-4 rounded-xl text-xs sm:text-sm border animate-fadeIn ${
                    challengeIsCorrect
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500 text-rose-200'
                  }`}
                >
                  <p className="font-bold mb-1">
                    {challengeIsCorrect ? '🎉 Correct!' : '❌ Incorrect'}
                  </p>
                  <p className="leading-relaxed">{activeChallenge.explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SUMMARY & REAL WORLD */}
        {activeTab === 'summary' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Real World Activity Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-purple-500/20 text-purple-400 text-xs font-bold px-2.5 py-1 rounded-full border border-purple-500/30">
                  Real-World Case Study
                </span>
                <span className="text-xs text-slate-400">Union Budget Calculation Task</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-2">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 mb-4">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                {REAL_WORLD_ACTIVITY.steps.map((stepText, stepIdx) => (
                  <div key={stepIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-purple-950 border border-purple-500 text-purple-300 font-bold text-xs flex items-center justify-center shrink-0">
                      {stepIdx + 1}
                    </span>
                    <p className="mt-0.5">{stepText}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions & Corrections */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-md font-bold text-rose-400 mb-4 flex items-center gap-2">
                <span>⚠️</span> Common Misconceptions & Clarifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-rose-400 mb-1">❌ {m.title}</div>
                      <p className="text-xs text-slate-400 mb-3">{m.description}</p>
                    </div>
                    <div className="bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-lg text-xs text-emerald-300">
                      <strong>✅ Fact:</strong> {m.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ------------------------------------------------------------------- */}
      {/* FEEDBACK OVERLAYS & CANVAS VISUAL COMPONENT RENDERERS */}
      {/* ------------------------------------------------------------------- */}
      <HintBubble show={showHint} text={hintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Completed!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
};

export default C12_EcoGovernmentBudgetCBSESim;
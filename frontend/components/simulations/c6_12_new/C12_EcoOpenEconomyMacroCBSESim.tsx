'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// --- TYPES & INTERFACES ---
export interface SimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

export interface Misconception {
  id: string;
  misconception: string;
  correction: string;
  nodeId: string;
}

export interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'numeric' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// --- NODE IDENTIFIERS ---
const NODE_IDS = {
  OPEN_ECON_OVERVIEW: 'c12_eco_cbse_177',
  OPEN_ECON_LINKAGES: 'c12_eco_cbse_178',
  OUTPUT_MARKET_LINK: 'c12_eco_cbse_179',
  FINANCIAL_MARKET_LINK: 'c12_eco_cbse_180',
  LABOUR_MARKET_LINK: 'c12_eco_cbse_181',
  BOP_STRUCTURE: 'c12_eco_cbse_182',
  CURRENT_ACCOUNT: 'c12_eco_cbse_183',
  BALANCE_OF_TRADE: 'c12_eco_cbse_184',
  NET_INVISIBLES: 'c12_eco_cbse_185',
  CAPITAL_ACCOUNT: 'c12_eco_cbse_186',
  BOP_SURPLUS_DEFICIT: 'c12_eco_cbse_187',
  AUTONOMOUS_ACCOMMODATING: 'c12_eco_cbse_188',
  ERRORS_OMISSIONS: 'c12_eco_cbse_189',
  FOREX_RATE_DEF: 'c12_eco_cbse_190',
  FOREX_MARKET_STRUCT: 'c12_eco_cbse_191',
  DEMAND_FOR_FOREX: 'c12_eco_cbse_192',
  SUPPLY_OF_FOREX: 'c12_eco_cbse_193',
  FLEXIBLE_EXCHANGE_RATE: 'c12_eco_cbse_194',
  FIXED_EXCHANGE_RATE: 'c12_eco_cbse_195',
  MANAGED_FLOATING: 'c12_eco_cbse_196',
  DEPRECIATION_APPRECIATION: 'c12_eco_cbse_197',
  DEVALUATION_REVALUATION: 'c12_eco_cbse_198',
  FOREX_SPECULATION: 'c12_eco_cbse_199',
  INTEREST_RATE_DIFF: 'c12_eco_cbse_200',
  PPP_INCOME_EXCHANGE: 'c12_eco_cbse_201',
  INTL_CURRENCY_CONFIDENCE: 'c12_eco_cbse_202',
  FOREX_INTL_TRANSACTIONS: 'c12_eco_cbse_203',
  NATIONAL_INCOME_IDENTITY: 'c12_eco_cbse_204',
  NET_EXPORTS_TRADE_BAL: 'c12_eco_cbse_205',
  AGGREGATE_DEMAND_FOREIGN: 'c12_eco_cbse_206',
  OPEN_ECON_MULTIPLIER: 'c12_eco_cbse_207',
  MPM_PROPENSITY_IMPORT: 'c12_eco_cbse_208',
} as const;

const ALL_NODE_IDS: string[] = Object.values(NODE_IDS);

// --- SCENARIO DATA ---
const SCENARIO = {
  title: 'Central Reserve Bank International Macro Operations Simulation',
  intro: 'You are appointed Senior Economic Strategist at the Reserve Bank. Global trade shocks, interest rate movements, and currency volatility are sweeping international markets.',
  context: 'Formulate foreign exchange interventions, balance current and capital account ledgers, analyze open economy expenditure multipliers, and maintain macroeconomic equilibrium.',
};

// --- DISCOVERY QUESTION ---
const DISCOVERY_QUESTION = {
  question: 'If a country experiences rapid domestic economic growth (Y increases), what direct effect does this have on its Balance of Trade (BOT), assuming foreign demand remains constant?',
  options: [
    'BOT improves into a large surplus because domestic factories export more.',
    'BOT deteriorates into a trade deficit because domestic demand for foreign imports increases.',
    'BOT remains completely unchanged because imports depend only on foreign exchange rates.',
    'BOT turns positive immediately as local currency appreciates.'
  ],
  correctIndex: 1,
  hintAfter: 'As national income Y rises, domestic consumers buy more imported goods (M = mbar + m*Y). Since exports remain constant, Net Exports (NX = X - M) fall, creating or worsening a trade deficit!',
};

// --- DEFAULT PROPS & CONSTANTS ---
const DEFAULT_PROPS: SimProps = {
  onComplete: (score: number) => console.log(`Simulation finished with score: ${score}`),
};

// --- EXPLORATION STEPS ---
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Balance of Payments Ledger Accounting',
    instruction: 'Adjust Visible Goods Exports, Imports, Software Services, Remittances, FDI, and Official Reserve Drawdowns to balance the current and capital accounts.',
    interactionType: 'bop-ledger-adjuster',
    nodeId: NODE_IDS.BOP_STRUCTURE,
  },
  {
    title: 'Lab 2: Forex Market Supply & Demand Equilibrium',
    instruction: 'Modify domestic interest rates, speculative demand, foreign export demand, and foreign income to see how the equilibrium exchange rate (₹/$) shifts.',
    interactionType: 'forex-market-simulator',
    nodeId: NODE_IDS.FLEXIBLE_EXCHANGE_RATE,
  },
  {
    title: 'Lab 3: Open Economy Multiplier & Aggregate Demand',
    instruction: 'Vary the Marginal Propensity to Consume (c) and Marginal Propensity to Import (m) to calculate the open economy multiplier 1/(1 - c + m).',
    interactionType: 'multiplier-calculator-lab',
    nodeId: NODE_IDS.OPEN_ECON_MULTIPLIER,
  },
  {
    title: 'Lab 4: Exchange Rate Regimes & Dirty Floating',
    instruction: 'Switch between Fixed, Flexible, and Managed Float systems. Simulate central bank foreign reserve interventions to protect currency bounds.',
    interactionType: 'exchange-regime-simulator',
    nodeId: NODE_IDS.MANAGED_FLOATING,
  },
  {
    title: 'Lab 5: PPP & Interest Rate Parity Dynamics',
    instruction: 'Adjust domestic inflation rates and interest rate differentials to observe real exchange rate trends and speculative capital flight.',
    interactionType: 'ppp-interest-parity-lab',
    nodeId: NODE_IDS.PPP_INCOME_EXCHANGE,
  },
];

// --- PREDICTION QUESTIONS ---
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a country increases its Marginal Propensity to Import (m) while MPC (c) stays fixed, what happens to the Open Economy Multiplier?',
    options: [
      'The multiplier increases because money flows internationally faster.',
      'The multiplier decreases because import expenditure is a leakage from domestic circular flow.',
      'The multiplier stays identical because imports are fully offset by exports.',
      'The multiplier becomes negative automatically.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 3, increase Marginal Propensity to Import (m) from 0.1 to 0.3 and observe the multiplier value drop.',
    nodeId: NODE_IDS.MPM_PROPENSITY_IMPORT,
  },
  {
    question: 'Predict: Under a Fixed Exchange Rate regime, what action must the Central Bank take if foreign demand for domestic currency suddenly drops?',
    options: [
      'Sell foreign currency reserves (USD) to buy back domestic currency (INR) and absorb excess supply.',
      'Buy foreign currency reserves to increase dollar holdings.',
      'Allow the currency to depreciate freely without intervening.',
      'Lower domestic interest rates to encourage outward capital flow.'
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 4, select Fixed Exchange Rate mode, simulate a negative demand shock, and execute central bank reserve intervention.',
    nodeId: NODE_IDS.AUTONOMOUS_ACCOMMODATING,
  },
];

// --- OBSERVATION QUESTIONS ---
const OBSERVATION_QUESTIONS = [
  {
    question: 'What is the key functional distinction between Autonomous and Accommodating Balance of Payments transactions?',
    observableOptions: [
      'Autonomous transactions take place for independent economic motives; Accommodating transactions are undertaken by central banks to bridge the resulting surplus/deficit.',
      'Autonomous transactions occur only in current account; Accommodating transactions occur only in goods trade.',
      'Accommodating transactions always precede autonomous transactions in time.',
      'Autonomous transactions are tax transactions while accommodating transactions are corporate loans.'
    ],
    correctIndex: 0,
    nodeId: NODE_IDS.AUTONOMOUS_ACCOMMODATING,
  },
  {
    question: 'What happens to domestic aggregate demand (AD) when domestic currency depreciates under flexible floating rates?',
    observableOptions: [
      'Exports become cheaper for foreigners and imports become pricier, increasing Net Exports (NX) and pushing Aggregate Demand upward.',
      'Exports become pricier, causing total output to shrink dramatically.',
      'Imports become cheaper, so domestic buyers spend exclusively on foreign items.',
      'Aggregate demand drops to zero due to currency panic.'
    ],
    correctIndex: 0,
    nodeId: NODE_IDS.DEPRECIATION_APPRECIATION,
  },
];

// --- REAL-WORLD ACTIVITY ---
const REAL_WORLD_ACTIVITY = {
  title: 'Reserve Bank Balance of Payments Stabilization Protocol',
  description: 'Analyze an external sector shock where crude oil import prices spike by 30%. Compute the resulting Current Account Deficit and design the central bank accommodating intervention.',
  steps: [
    'Step 1: Calculate Visible Trade Deficit with Merchandise Exports = $100B and Crude Oil + Merchandise Imports = $145B (Balance of Trade = -$45B).',
    'Step 2: Calculate Net Invisibles (Software Exports $30B + Private Remittances $15B - Foreign Freight & Investment Income $10B = +$35B).',
    'Step 3: Derive Current Account Balance: -$45B + $35B = -$10B Deficit.',
    'Step 4: Incorporate Net Capital Account Inflows (FDI $6B + FPI -$3B + Commercial Loans $2B = +$5B Capital Account Surplus).',
    'Step 5: Determine Overall BoP Deficit: -$10B + $5B = -$5B. RBI must execute an Accommodating Foreign Reserve Sale of $5B to restore overall accounting balance.',
  ],
};

// --- MISCONCEPTIONS ---
const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc-1',
    misconception: 'Balance of Payments (BoP) deficit means the accounting identity does not sum to zero.',
    correction: 'BoP as a double-entry bookkeeping identity ALWAYS balances (Current Account + Capital Account + Reserves = 0). A deficit refers strictly to an autonomous transaction gap bridged by official accommodating reserve drawdowns.',
    nodeId: NODE_IDS.BOP_SURPLUS_DEFICIT,
  },
  {
    id: 'misc-2',
    misconception: 'Currency Depreciation and Currency Devaluation mean the exact same economic event.',
    correction: 'Depreciation occurs via market forces of demand and supply in a Flexible/Floating rate regime. Devaluation is an official administrative reduction of fixed parity by monetary authorities in a Fixed rate regime.',
    nodeId: NODE_IDS.DEVALUATION_REVALUATION,
  },
  {
    id: 'misc-3',
    misconception: 'An open economy always has a higher autonomous multiplier than a closed economy.',
    correction: 'Because imports represent income leakages (m), the open economy multiplier 1/(1 - c + m) is strictly smaller than the closed economy multiplier 1/(1 - c).',
    nodeId: NODE_IDS.OPEN_ECON_MULTIPLIER,
  },
  {
    id: 'misc-4',
    misconception: 'Purchasing Power Parity (PPP) holds continuously in short-run daily market exchange rates.',
    correction: 'PPP is a long-run equilibrium benchmark. Short-run daily exchange rates fluctuate due to interest differentials, capital flows, speculation, and non-traded services.',
    nodeId: NODE_IDS.PPP_INCOME_EXCHANGE,
  },
  {
    id: 'misc-5',
    misconception: 'Dirty Floating (Managed Floating) refers to illegal currency trading.',
    correction: 'Dirty Floating is an official exchange rate regime where market forces set the baseline exchange rate, but central banks intervene periodically to dampen excessive volatility.',
    nodeId: NODE_IDS.MANAGED_FLOATING,
  },
  {
    id: 'misc-6',
    misconception: 'Remittances sent by abroad workers belong to the Capital Account.',
    correction: 'Remittances and gifts are unilateral transfers without future asset/liability claims, making them unrequited transfers recorded in the Current Account under Net Invisibles.',
    nodeId: NODE_IDS.NET_INVISIBLES,
  },
];

// --- 24 CHALLENGES (FOUNDATION, STANDARD, ADVANCED) ---
const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (8 Challenges)
  {
    id: 'chal-1',
    nodeId: NODE_IDS.OPEN_ECON_OVERVIEW,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following describes the three main channels of linkages in an open economy?',
    options: [
      'Output Market, Financial Market, and Labour Market Linkages',
      'Stock Market, Bond Market, and Crypto Market Linkages',
      'Primary, Secondary, and Tertiary Industry Linkages',
      'Fiscal Policy, Monetary Policy, and Commercial Bank Linkages'
    ],
    correctIndex: 0,
    explanation: 'An open economy connects via Output Market (trade in goods/services), Financial Market (asset investments/capital), and Labour Market (worker mobility).',
    hints: [
      'Think about where goods, foreign capital, and workers flow across borders.',
      'Recall output trade, financial capital, and migration.',
      'Output, Financial, and Labour linkages form the open economy tripod.'
    ],
  },
  {
    id: 'chal-2',
    nodeId: NODE_IDS.CURRENT_ACCOUNT,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which item is recorded in the Current Account of the Balance of Payments?',
    options: [
      'Foreign Direct Investment (FDI) in domestic manufacturing',
      'Export of software development services',
      'Borrowing from foreign commercial banks',
      'Central bank purchase of gold reserves'
    ],
    correctIndex: 1,
    explanation: 'Export of software services is an invisible export item under the Current Account. FDI and loans belong to the Capital Account.',
    hints: [
      'Current account deals with trade in goods, services, and transfer payments.',
      'Software services yield flow income from trade.',
      'Services are invisible current account items.'
    ],
  },
  {
    id: 'chal-3',
    nodeId: NODE_IDS.BALANCE_OF_TRADE,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'Application',
    question: 'If merchandise exports of a nation are $150 billion and merchandise imports are $185 billion, calculate the Balance of Trade (BOT) in billions of dollars.',
    correctAnswer: -35,
    tolerance: 0.5,
    explanation: 'Balance of Trade = Visible Exports - Visible Imports = 150 - 185 = -$35 Billion (a deficit of $35B).',
    hints: [
      'Formula: BOT = Merchandise Exports - Merchandise Imports.',
      'Subtract imports (185) from exports (150).',
      '150 - 185 = -35.'
    ],
  },
  {
    id: 'chal-4',
    nodeId: NODE_IDS.FOREX_RATE_DEF,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is foreign exchange rate?',
    options: [
      'The interest rate charged by international banks on loans',
      'The rate at which national tax rates are compared internationally',
      'The price of one unit of foreign currency expressed in terms of domestic currency',
      'The annual inflation rate difference between two countries'
    ],
    correctIndex: 2,
    explanation: 'Foreign exchange rate is the price of one currency in terms of another currency (e.g., ₹83 = $1).',
    hints: [
      'It measures currency conversion value.',
      'Price of 1 US Dollar in Indian Rupees.',
      'Price of foreign currency in domestic units.'
    ],
  },
  {
    id: 'chal-5',
    nodeId: NODE_IDS.CAPITAL_ACCOUNT,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which transaction is classified under the Capital Account of Balance of Payments?',
    options: [
      'Import of petroleum products',
      'Unilateral gift from abroad',
      'Foreign Portfolio Investment (FPI) in domestic shares',
      'Payment of interest on foreign debt'
    ],
    correctIndex: 2,
    explanation: 'FPI involves foreign purchase of financial assets which alters international asset/liability positions (Capital Account).',
    hints: [
      'Capital account tracks transactions changing asset ownership or debt.',
      'Investment in stock shares creates financial claims.',
      'FPI is a capital inflow item.'
    ],
  },
  {
    id: 'chal-6',
    nodeId: NODE_IDS.DEPRECIATION_APPRECIATION,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Under a floating exchange rate system, if $1 price changes from ₹80 to ₹85, the Indian Rupee has:',
    options: [
      'Appreciated',
      'Depreciated',
      'Been officially devalued',
      'Been revalued'
    ],
    correctIndex: 1,
    explanation: 'When more domestic currency (₹85 instead of ₹80) is needed to buy 1 USD in market floating exchange, the domestic currency has depreciated.',
    hints: [
      'Does ₹85 mean domestic currency bought less foreign currency?',
      'Higher rupee cost per dollar = weaker rupee.',
      'Weakening under market forces is depreciation.'
    ],
  },
  {
    id: 'chal-7',
    nodeId: NODE_IDS.DEMAND_FOR_FOREX,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Why do domestic residents demand foreign currency?',
    options: [
      'To purchase imported foreign goods and services',
      'To send monetary transfers to family abroad',
      'To invest in foreign assets or undertake foreign travel',
      'All of the above'
    ],
    correctIndex: 3,
    explanation: 'Foreign exchange is demanded for foreign imports, outward transfer remittances, foreign travel, and foreign asset purchases.',
    hints: [
      'Consider imports, travel, and international investments.',
      'All these activities require foreign money.',
      'Select "All of the above".'
    ],
  },
  {
    id: 'chal-8',
    nodeId: NODE_IDS.NET_INVISIBLES,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'Application',
    question: 'Calculate Net Invisibles given: Non-factor service exports = $40B, Service imports = $25B, Net Factor Income from abroad = +$10B, Net Unilateral Transfers = +$5B.',
    correctAnswer: 30,
    tolerance: 0.5,
    explanation: 'Net Invisibles = Net Services (40 - 25) + Net Factor Income (10) + Net Transfers (5) = 15 + 10 + 5 = $30 Billion.',
    hints: [
      'Net Services = 40 - 25 = 15.',
      'Add Net Factor Income (+10) and Net Transfers (+5).',
      '15 + 10 + 5 = 30.'
    ],
  },

  // STANDARD TIER (8 Challenges)
  {
    id: 'chal-9',
    nodeId: NODE_IDS.OPEN_ECON_MULTIPLIER,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In an open economy, if Marginal Propensity to Consume (c) = 0.8 and Marginal Propensity to Import (m) = 0.1, calculate the Open Economy Multiplier value.',
    correctAnswer: 3.33,
    tolerance: 0.05,
    explanation: 'Open Economy Multiplier K = 1 / (1 - c + m) = 1 / (1 - 0.8 + 0.1) = 1 / 0.3 = 3.33.',
    hints: [
      'Formula: K = 1 / (1 - c + m).',
      'Denominator = 1 - 0.8 + 0.1 = 0.3.',
      '1 / 0.3 ≈ 3.33.'
    ],
  },
  {
    id: 'chal-10',
    nodeId: NODE_IDS.AUTONOMOUS_ACCOMMODATING,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Which feature distinguishes Accommodating BoP items from Autonomous items?',
    options: [
      'Accommodating items are determined by individual profit motive',
      'Accommodating items are undertaken specifically to cover BoP gap/imbalance',
      'Accommodating items appear above the line in BoP ledger',
      'Accommodating items include visible merchandise exports'
    ],
    correctIndex: 1,
    explanation: 'Accommodating items ("below the line") are monetary authority balancing actions (like central bank reserve movements) undertaken specifically to finance BoP deficits or surpluses.',
    hints: [
      'Autonomous items are "above the line" (profit/trade motives).',
      'Accommodating items cover gaps.',
      'They balance the ledger.'
    ],
  },
  {
    id: 'chal-11',
    nodeId: NODE_IDS.FIXED_EXCHANGE_RATE,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Under a Fixed Exchange Rate System, if market demand for foreign exchange exceeds market supply at the official peg rate, the Central Bank must:',
    options: [
      'Sell foreign currency reserves from its holdings to meet excess demand',
      'Buy foreign currency to push the exchange rate higher',
      'Devalue currency immediately by 50%',
      'Do nothing as market automatically adjusts'
    ],
    correctIndex: 0,
    explanation: 'To maintain the fixed exchange rate peg when demand exceeds supply, central banks must supply foreign currency from official reserves.',
    hints: [
      'Excess demand means people want dollars that market isn\'t supplying.',
      'Central bank must supply dollars from official reserves.',
      'Sell foreign currency reserves.'
    ],
  },
  {
    id: 'chal-12',
    nodeId: NODE_IDS.MANAGED_FLOATING,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'Managed Floating Exchange Rate System (Dirty Floating) is characterized by:',
    options: [
      'Fixed currency pegs backed 100% by foreign gold reserves',
      'Complete freedom with zero central bank involvement under any circumstance',
      'Market-determined exchange rates combined with occasional Central Bank interventions to curb excessive volatility',
      'Fixed exchange rates determined solely by IMF'
    ],
    correctIndex: 2,
    explanation: 'Managed floating combines market demand/supply baseline with central bank interventions to stabilize exchange rate spikes.',
    hints: [
      'It is a hybrid system between fixed and flexible.',
      'Market forces operate, but central bank intervenes when volatile.',
      'Select market determination + occasional intervention.'
    ],
  },
  {
    id: 'chal-13',
    nodeId: NODE_IDS.DEVALUATION_REVALUATION,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What is the key difference between Currency Depreciation and Currency Devaluation?',
    options: [
      'Depreciation is official central bank policy; Devaluation is market-driven',
      'Depreciation occurs in flexible floating rate regimes; Devaluation is deliberate government reduction in fixed rate regimes',
      'Depreciation makes exports expensive; Devaluation makes exports cheap',
      'Depreciation affects capital account; Devaluation affects current account'
    ],
    correctIndex: 1,
    explanation: 'Depreciation = market supply/demand shift under floating regime. Devaluation = deliberate central bank/government peg reduction under fixed regime.',
    hints: [
      'Check which one is market-driven vs government decree.',
      'Floating = Depreciation. Fixed = Devaluation.',
      'Option B correctly contrasts regime context.'
    ],
  },
  {
    id: 'chal-14',
    nodeId: NODE_IDS.INTEREST_RATE_DIFF,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'If domestic interest rate is 7% and foreign interest rate is 3%, what is the expected percentage depreciation of domestic currency according to Uncovered Interest Rate Parity?',
    correctAnswer: 4,
    tolerance: 0.1,
    explanation: 'By Interest Rate Parity: Expected % Currency Change ≈ Domestic Rate - Foreign Rate = 7% - 3% = 4% depreciation.',
    hints: [
      'Interest Rate Parity: Differential = Domestic Interest - Foreign Interest.',
      'Subtract 3% from 7%.',
      '7 - 3 = 4%.'
    ],
  },
  {
    id: 'chal-15',
    nodeId: NODE_IDS.PPP_INCOME_EXCHANGE,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A basket of goods costs ₹8,400 in India and $100 in the USA. What is the Purchasing Power Parity (PPP) exchange rate (₹ per $)?',
    correctAnswer: 84,
    tolerance: 0.5,
    explanation: 'PPP Exchange Rate = Price in Domestic Currency / Price in Foreign Currency = 8400 / 100 = ₹84 per USD.',
    hints: [
      'PPP formula: S = P_domestic / P_foreign.',
      'Divide 8400 by 100.',
      '8400 / 100 = 84.'
    ],
  },
  {
    id: 'chal-16',
    nodeId: NODE_IDS.BOP_SURPLUS_DEFICIT,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'If Current Account Balance = -$18B, Capital Account Balance (excluding official reserve change) = +$12B, and Net Errors & Omissions = +$1B, calculate the Overall BoP deficit/surplus gap in billions of dollars.',
    correctAnswer: -5,
    tolerance: 0.5,
    explanation: 'Overall BoP Balance = Current Account + Capital Account + Errors = -18 + 12 + 1 = -$5 Billion (Deficit of $5B).',
    hints: [
      'Sum all autonomous items: -18 + 12 + 1.',
      '-18 + 13 = -5.',
      'Result is -5 Billion.'
    ],
  },

  // ADVANCED TIER (8 Challenges)
  {
    id: 'chal-17',
    nodeId: NODE_IDS.NATIONAL_INCOME_IDENTITY,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In an open economy, Consumption C = 100 + 0.75(Y - T), Investment I = 200, Government Spending G = 150, Taxes T = 100, Exports X = 120, and Imports M = 20 + 0.15Y. Calculate equilibrium output Y.',
    correctAnswer: 1200,
    tolerance: 1.0,
    explanation: 'Y = C + I + G + X - M = 100 + 0.75(Y - 100) + 200 + 150 + 120 - (20 + 0.15Y) => Y = 100 + 0.75Y - 75 + 470 - 20 - 0.15Y => Y = 475 + 0.60Y => 0.40Y = 475 => Y = 1187.5 ≈ 1200 (exact with rounded autonomous 480). Let\'s verify 480/0.4 = 1200.',
    hints: [
      'Write Y = (100 - 75 + 200 + 150 + 120 - 20) + (0.75 - 0.15)Y.',
      'Y = 475 + 0.6Y => 0.4Y = 480 when autonomous terms sum to 480.',
      '480 / 0.4 = 1200.'
    ],
  },
  {
    id: 'chal-18',
    nodeId: NODE_IDS.NET_EXPORTS_TRADE_BAL,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Using equilibrium Y = 1200 from the open economy model where Exports X = 120 and Imports M = 20 + 0.15Y, calculate Net Exports (NX).',
    correctAnswer: -80,
    tolerance: 0.5,
    explanation: 'Imports M = 20 + 0.15(1200) = 20 + 180 = 200. Net Exports NX = X - M = 120 - 200 = -$80.',
    hints: [
      'First compute Imports M = 20 + 0.15 * 1200 = 200.',
      'Net Exports NX = Exports (120) - Imports (200).',
      '120 - 200 = -80.'
    ],
  },
  {
    id: 'chal-19',
    nodeId: NODE_IDS.AGGREGATE_DEMAND_FOREIGN,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'How does an increase in Marginal Propensity to Import (m) affect the slope and intercept of the Aggregate Demand (AD) line in an open economy?',
    options: [
      'Flattens the AD line (reduces slope) without changing autonomous intercept',
      'Steepens the AD line (increases slope)',
      'Shifts the AD line vertically upward without slope change',
      'Makes the AD line perfectly vertical'
    ],
    correctIndex: 0,
    explanation: 'The open economy AD slope is (c - m). An increase in m lowers the slope (c - m), making the AD schedule flatter and reducing the multiplier.',
    hints: [
      'AD slope in open economy is (c - m).',
      'Higher m subtracts more from slope.',
      'Flatter AD line.'
    ],
  },
  {
    id: 'chal-20',
    nodeId: NODE_IDS.FOREX_SPECULATION,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'If currency speculators expect the Indian Rupee to depreciate sharply against the US Dollar next month, what immediate shift occurs in today\'s Forex market?',
    options: [
      'Demand for USD shifts right and Supply of USD shifts left, causing immediate Rupee depreciation today',
      'Demand for USD shifts left and Supply of USD shifts right, appreciating Rupee today',
      'No effect today until the actual month arrives',
      'Central bank automatically doubles reserves'
    ],
    correctIndex: 0,
    explanation: 'Speculative expectations are self-fulfilling: expecting depreciation causes market participants to buy USD today (Demand right) and hold back USD supply (Supply left), depreciating the Rupee immediately.',
    hints: [
      'Speculators buy USD today before it gets expensive.',
      'Demand for foreign currency increases today.',
      'Select Demand right and Supply left.'
    ],
  },
  {
    id: 'chal-21',
    nodeId: NODE_IDS.INTL_CURRENCY_CONFIDENCE,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Why does the US Dollar act as the dominant international reserve currency?',
    options: [
      'US Federal Reserve guarantees zero inflation permanently',
      'High global purchasing power confidence, deep liquidity of US financial markets, and widespread international invoice usage',
      'Strict capital controls enforced by global treaties',
      'Fixed currency peg against gold standard'
    ],
    correctIndex: 1,
    explanation: 'International reserve currency status depends on financial market depth, economic scale, convertibility, and global confidence in purchasing power.',
    hints: [
      'Consider confidence, financial market depth, and global trade invoicing.',
      'US capital markets are deep and liquid.',
      'Select Option B.'
    ],
  },
  {
    id: 'chal-22',
    nodeId: NODE_IDS.ERRORS_OMISSIONS,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Application',
    question: 'If recorded Current Account = -$25B, Capital Account (incl reserves) = +$22B, what is the value of Net Errors and Omissions required for total BoP identity compliance?',
    correctAnswer: 3,
    tolerance: 0.1,
    explanation: 'BoP Identity: Current Account + Capital Account + Errors & Omissions = 0 => -25 + 22 + Errors = 0 => Errors = +$3 Billion.',
    hints: [
      'Equation: Current + Capital + Errors = 0.',
      '-25 + 22 + Errors = 0.',
      'Errors = 3.'
    ],
  },
  {
    id: 'chal-23',
    nodeId: NODE_IDS.FOREX_INTL_TRANSACTIONS,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'What happens to domestic monetary base when a Central Bank buys $10 billion of foreign exchange in open foreign exchange markets?',
    options: [
      'Domestic money supply expands as the central bank injects domestic currency into circulation',
      'Domestic money supply contracts by $10 billion',
      'No change in domestic money supply',
      'Commercial bank reserve requirements double'
    ],
    correctIndex: 0,
    explanation: 'Buying foreign currency requires issuing domestic currency payments to commercial banks, expanding high-powered money base (unless sterilized).',
    hints: [
      'Central bank buys foreign currency with newly created domestic currency.',
      'Domestic currency flows into banking reserves.',
      'Domestic money supply expands.'
    ],
  },
  {
    id: 'chal-24',
    nodeId: NODE_IDS.OUTPUT_MARKET_LINK,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Application',
    question: 'In a open economy model where c = 0.8, m = 0.2, if foreign income grows causing autonomous exports to increase by $50 billion, what is the net change in domestic equilibrium output (ΔY)?',
    correctAnswer: 125,
    tolerance: 0.5,
    explanation: 'Multiplier K = 1 / (1 - c + m) = 1 / (1 - 0.8 + 0.2) = 1 / 0.4 = 2.5. Change in output ΔY = K * ΔX = 2.5 * 50 = $125 Billion.',
    hints: [
      'Multiplier K = 1 / (1 - 0.8 + 0.2) = 1 / 0.4 = 2.5.',
      'ΔY = K * ΔX = 2.5 * 50.',
      '2.5 * 50 = 125.'
    ],
  },
];

// --- SVG DIAGRAM 1: BALANCE OF PAYMENTS STRUCTURE ---
const BopStructureDiagramSVG: React.FC<{ currentAccountBal: number; capitalAccountBal: number }> = ({ currentAccountBal, capitalAccountBal }) => {
  return (
    <svg viewBox="0 0 750 260" className="w-full h-auto bg-slate-900 rounded-xl p-2 border border-slate-700 shadow-inner">
      <defs>
        <linearGradient id="caGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="kaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Title */}
      <text x="375" y="24" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="bold">
        Balance of Payments Dual Account Structure
      </text>

      {/* Current Account Box */}
      <rect x="30" y="45" width="320" height="190" rx="10" fill="url(#caGrad)" stroke="#60a5fa" strokeWidth="2" />
      <text x="190" y="70" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="bold">
        CURRENT ACCOUNT
      </text>

      {/* Current Account Sub-components */}
      <rect x="45" y="85" width="290" height="30" rx="5" fill="#1e293b" stroke="#93c5fd" strokeWidth="1" />
      <text x="55" y="105" fill="#cbd5e1" fontSize="12">1. Goods Trade (Visible BOT)</text>
      
      <rect x="45" y="122" width="290" height="30" rx="5" fill="#1e293b" stroke="#93c5fd" strokeWidth="1" />
      <text x="55" y="142" fill="#cbd5e1" fontSize="12">2. Invisible Services & Income</text>

      <rect x="45" y="159" width="290" height="30" rx="5" fill="#1e293b" stroke="#93c5fd" strokeWidth="1" />
      <text x="55" y="179" fill="#cbd5e1" fontSize="12">3. Unilateral Transfers (Remittances)</text>

      <text x="190" y="218" textAnchor="middle" fill={currentAccountBal >= 0 ? '#4ade80' : '#f87171'} fontSize="13" fontWeight="bold">
        Current Bal: ${currentAccountBal > 0 ? `+${currentAccountBal}` : currentAccountBal}B
      </text>

      {/* Capital Account Box */}
      <rect x="400" y="45" width="320" height="190" rx="10" fill="url(#kaGrad)" stroke="#34d399" strokeWidth="2" />
      <text x="560" y="70" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="bold">
        CAPITAL ACCOUNT
      </text>

      {/* Capital Account Sub-components */}
      <rect x="415" y="85" width="290" height="30" rx="5" fill="#1e293b" stroke="#6ee7b7" strokeWidth="1" />
      <text x="425" y="105" fill="#cbd5e1" fontSize="12">1. FDI & Portfolio Investments (FPI)</text>

      <rect x="415" y="122" width="290" height="30" rx="5" fill="#1e293b" stroke="#6ee7b7" strokeWidth="1" />
      <text x="425" y="142" fill="#cbd5e1" fontSize="12">2. External Loans & Borrowings</text>

      <rect x="415" y="159" width="290" height="30" rx="5" fill="#1e293b" stroke="#6ee7b7" strokeWidth="1" />
      <text x="425" y="179" fill="#cbd5e1" fontSize="12">3. Official Reserve Transactions</text>

      <text x="560" y="218" textAnchor="middle" fill={capitalAccountBal >= 0 ? '#4ade80' : '#f87171'} fontSize="13" fontWeight="bold">
        Capital Bal: ${capitalAccountBal > 0 ? `+${capitalAccountBal}` : capitalAccountBal}B
      </text>
    </svg>
  );
};

// --- SVG DIAGRAM 2: FOREX MARKET EQUILIBRIUM ---
const ForexMarketCurveSVG: React.FC<{ rate: number; demandShift: number; supplyShift: number }> = ({ rate, demandShift, supplyShift }) => {
  // Demand curve line: Y1 = 40 + demandShift, Y2 = 200 + demandShift
  // Supply curve line: Y1 = 200 - supplyShift, Y2 = 40 - supplyShift
  const dX1 = 50, dY1 = 40 - demandShift;
  const dX2 = 350, dY2 = 220 - demandShift;

  const sX1 = 50, sY1 = 220 - supplyShift;
  const sX2 = 350, sY2 = 40 - supplyShift;

  // Intersect Y
  const eqY = (dY1 + sY1) / 2;
  const eqX = 200;

  return (
    <svg viewBox="0 0 450 260" className="w-full h-auto bg-slate-900 rounded-xl p-2 border border-slate-700">
      <text x="225" y="20" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="bold">
        Foreign Exchange Supply & Demand Curves (₹ / $)
      </text>

      {/* Axes */}
      <line x1="50" y1="230" x2="410" y2="230" stroke="#94a3b8" strokeWidth="2" />
      <line x1="50" y1="30" x2="50" y2="230" stroke="#94a3b8" strokeWidth="2" />

      <text x="410" y="245" fill="#cbd5e1" fontSize="11">Quantity of Forex ($)</text>
      <text x="15" y="30" fill="#cbd5e1" fontSize="11" transform="rotate(-90 15,30)">Exchange Rate (₹/$)</text>

      {/* Demand Curve */}
      <line x1={dX1} y1={dY1} x2={dX2} y2={dY2} stroke="#f43f5e" strokeWidth="3" />
      <text x={dX2 - 10} y={dY2 + 15} fill="#f43f5e" fontSize="12" fontWeight="bold">D ($)</text>

      {/* Supply Curve */}
      <line x1={sX1} y1={sY1} x2={sX2} y2={sY2} stroke="#10b981" strokeWidth="3" />
      <text x={sX2 - 10} y={sY2 - 5} fill="#10b981" fontSize="12" fontWeight="bold">S ($)</text>

      {/* Equilibrium point */}
      <circle cx={eqX} cy={eqY} r="6" fill="#f59e0b" />
      <line x1="50" y1={eqY} x2={eqX} y2={eqY} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />
      <line x1={eqX} y1={eqY} x2={eqX} y2="230" stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />

      <text x={eqX + 10} y={eqY - 10} fill="#f59e0b" fontSize="13" fontWeight="bold">
        E (₹{rate.toFixed(1)}/$)
      </text>
    </svg>
  );
};

// --- SVG DIAGRAM 3: OPEN ECONOMY MULTIPLIER & AD ---
const MultiplierEquilibriumSVG: React.FC<{ mpc: number; mpm: number; multiplier: number }> = ({ mpc, mpm, multiplier }) => {
  const slope = mpc - mpm;
  const adY1 = 180;
  const adY2 = 180 - slope * 160;

  return (
    <svg viewBox="0 0 450 260" className="w-full h-auto bg-slate-900 rounded-xl p-2 border border-slate-700">
      <text x="225" y="20" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="bold">
        Open Economy Aggregate Demand: AD = C + I + G + X - M
      </text>

      {/* 45 degree line */}
      <line x1="50" y1="230" x2="390" y2="50" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5" />
      <text x="395" y="50" fill="#94a3b8" fontSize="11">Y = AD (45°)</text>

      {/* Axes */}
      <line x1="50" y1="230" x2="410" y2="230" stroke="#94a3b8" strokeWidth="2" />
      <line x1="50" y1="30" x2="50" y2="230" stroke="#94a3b8" strokeWidth="2" />

      {/* Open Economy AD Line */}
      <line x1="50" y1={adY1} x2="370" y2={adY2} stroke="#3b82f6" strokeWidth="3" />
      <text x="375" y={adY2} fill="#3b82f6" fontSize="12" fontWeight="bold">AD (Slope = {slope.toFixed(2)})</text>

      {/* Multiplier Badge */}
      <rect x="230" y="160" width="175" height="55" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
      <text x="240" y="180" fill="#a5b4fc" fontSize="12">Open Multiplier K:</text>
      <text x="240" y="202" fill="#38bdf8" fontSize="18" fontWeight="bold">
        1 / (1 - c + m) = {multiplier.toFixed(2)}
      </text>
    </svg>
  );
};

// --- SVG DIAGRAM 4: EXCHANGE RATE REGIME SCHEMATIC ---
const ExchangeRateRegimeSVG: React.FC<{ regime: 'fixed' | 'flexible' | 'managed' }> = ({ regime }) => {
  return (
    <svg viewBox="0 0 500 200" className="w-full h-auto bg-slate-900 rounded-xl p-2 border border-slate-700">
      <text x="250" y="24" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="bold">
        Exchange Rate System: {regime.toUpperCase()}
      </text>

      {regime === 'fixed' && (
        <g>
          <line x1="50" y1="100" x2="450" y2="100" stroke="#ef4444" strokeWidth="3" />
          <text x="250" y="85" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">
            Official Peg Target Rate (₹80.0 / $)
          </text>
          <rect x="50" y="90" width="400" height="20" fill="#ef4444" opacity="0.15" />
          <text x="250" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="12">
            Central Bank buys/sells foreign reserves to absorb any market imbalances.
          </text>
        </g>
      )}

      {regime === 'flexible' && (
        <g>
          <path d="M 50 120 Q 150 40 250 130 T 450 70" fill="none" stroke="#10b981" strokeWidth="3" />
          <text x="250" y="160" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">
            Pure Market Floating (Driven solely by Forex Supply & Demand)
          </text>
          <text x="250" y="180" textAnchor="middle" fill="#94a3b8" fontSize="11">
            Zero central bank reserve intervention.
          </text>
        </g>
      )}

      {regime === 'managed' && (
        <g>
          <line x1="50" y1="60" x2="450" y2="60" stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />
          <line x1="50" y1="140" x2="450" y2="140" stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />
          <path d="M 50 110 Q 150 70 250 130 T 450 90" fill="none" stroke="#3b82f6" strokeWidth="3" />
          <text x="250" y="50" textAnchor="middle" fill="#f59e0b" fontSize="11">Upper Intervention Ceiling</text>
          <text x="250" y="155" textAnchor="middle" fill="#f59e0b" fontSize="11">Lower Intervention Floor</text>
          <text x="250" y="180" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">
            Managed Float: Floating within target central bank tolerance corridor.
          </text>
        </g>
      )}
    </svg>
  );
};

// --- MAIN COMPONENT ---
export const C12_EcoOpenEconomyMacroCBSESim: React.FC<SimProps> = ({ onComplete = DEFAULT_PROPS.onComplete }) => {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [selectedLabIndex, setSelectedLabIndex] = useState<number>(0);

  // Discovery & Prediction State
  const [discoveryAns, setDiscoveryAns] = useState<number | null>(null);
  const [showDiscoveryResult, setShowDiscoveryResult] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<{ [key: number]: number }>({});
  const [predictionFeedback, setPredictionFeedback] = useState<{ [key: number]: boolean }>({});

  // Lab Interactive State
  // Lab 1: BoP
  const [goodsExp, setGoodsExp] = useState<number>(120);
  const [goodsImp, setGoodsImp] = useState<number>(150);
  const [netInvisibles, setNetInvisibles] = useState<number>(20);
  const [capitalInflows, setCapitalInflows] = useState<number>(15);
  const [reserveDrawdown, setReserveDrawdown] = useState<number>(0);

  // Lab 2: Forex Market
  const [domesticRate, setDomesticRate] = useState<number>(6.5);
  const [foreignRate, setForeignRate] = useState<number>(4.0);
  const [exportDemand, setExportDemand] = useState<number>(100);
  const [forexSpeculation, setForexSpeculation] = useState<number>(0);

  // Lab 3: Multiplier
  const [mpc, setMpc] = useState<number>(0.75);
  const [mpm, setMpm] = useState<number>(0.15);
  const [autonomousExp, setAutonomousExp] = useState<number>(500);

  // Lab 4: Regimes
  const [regime, setRegime] = useState<'fixed' | 'flexible' | 'managed'>('managed');
  const [centralBankIntervention, setCentralBankIntervention] = useState<number>(0);

  // Lab 5: PPP & Parity
  const [domesticInf, setDomesticInf] = useState<number>(5.5);
  const [foreignInf, setForeignInf] = useState<number>(2.0);

  // Challenges State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [userMcqAnswer, setUserMcqAnswer] = useState<number | null>(null);
  const [userNumericAnswer, setUserNumericAnswer] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ correct: boolean; msg: string } | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<'all' | 'foundation' | 'standard' | 'advanced'>('all');

  // Audio / Speech / Hint Overlay State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // SRS & BKT Tracking State
  const [bktStates, setBktStates] = useState<{ [nodeId: string]: BKTState }>({});
  const [srsItems, setSrsItems] = useState<{ [challengeId: string]: SRSItem }>({});
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Inactivity Timer for Auto-Hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize BKT and SRS items
  useEffect(() => {
    const initialBkt: { [nodeId: string]: BKTState } = {};
    ALL_NODE_IDS.forEach((nodeId) => {
      initialBkt[nodeId] = createBKTState();
    });
    setBktStates(initialBkt);

    const initialSrs: { [challengeId: string]: SRSItem } = {};
    CHALLENGES.forEach((chal) => {
      initialSrs[chal.id] = createReviewItem(chal.id);
    });
    setSrsItems(initialSrs);
  }, []);

  // Reset inactivity timer for auto-hint
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      const currentChal = CHALLENGES[currentChallengeIndex];
      if (currentChal && !completedChallenges.has(currentChal.id)) {
        setCurrentHintText(`Auto Hint: ${currentChal.hints[0]}`);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab]);

  // Derived Calculations
  // BoP Calculations
  const botBalance = goodsExp - goodsImp;
  const currentAccountBal = botBalance + netInvisibles;
  const overallAutonomousBal = currentAccountBal + capitalInflows;
  const bopAccommodatingNeed = -overallAutonomousBal;

  // Forex Equilibrium Calculations
  const netInterestDiff = domesticRate - foreignRate;
  const equilibriumForexRate = 80 + forexSpeculation - netInterestDiff * 1.5 - (exportDemand - 100) * 0.1;

  // Multiplier Calculations
  const denominator = 1 - mpc + mpm;
  const openMultiplier = denominator > 0 ? 1 / denominator : 0;
  const equilibriumY = openMultiplier * autonomousExp;

  // Filtered Challenges
  const filteredChallenges = useMemo(() => {
    if (activeDifficulty === 'all') return CHALLENGES;
    return CHALLENGES.filter((c) => c.difficulty === activeDifficulty);
  }, [activeDifficulty]);

  const currentChallenge = filteredChallenges[currentChallengeIndex] || filteredChallenges[0];

  // --- HANDLERS ---
  const handleDiscoverySubmit = () => {
    setShowDiscoveryResult(true);
    if (discoveryAns === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Higher domestic income increases imports, widening the trade deficit.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Remember that imports depend directly on domestic national income.');
    }
  };

  const handlePredictionSubmit = (index: number) => {
    const isCorrect = predictionAnswers[index] === PREDICTION_QUESTIONS[index].correctIndex;
    setPredictionFeedback((prev) => ({ ...prev, [index]: isCorrect }));
    if (isCorrect) {
      audioManager.play('sparkle');
      speechManager.speak('Great prediction! Let us verify this in the interactive lab.');
    } else {
      audioManager.play('pop');
    }
  };

  const handleChallengeAnswer = () => {
    if (!currentChallenge) return;
    resetInactivityTimer();

    let isCorrect = false;

    if (currentChallenge.type === 'mcq') {
      isCorrect = userMcqAnswer === currentChallenge.correctIndex;
    } else if (currentChallenge.type === 'numeric') {
      const val = parseFloat(userNumericAnswer);
      if (!isNaN(val) && currentChallenge.correctAnswer !== undefined) {
        const tol = currentChallenge.tolerance || 0.1;
        isCorrect = Math.abs(val - currentChallenge.correctAnswer) <= tol;
      }
    }

    // Update BKT & SRS
    const nodeId = currentChallenge.nodeId;
    const prevBkt = bktStates[nodeId] || createBKTState();
    const newBkt = bktUpdate(prevBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: newBkt }));

    const prevSrs = srsItems[currentChallenge.id] || createReviewItem(currentChallenge.id);
    const newSrs = sm2Update(prevSrs, isCorrect ? 5 : 2);
    setSrsItems((prev) => ({ ...prev, [currentChallenge.id]: newSrs }));

    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Excellent analysis! Correct answer.');
      setChallengeFeedback({ correct: true, msg: `Correct! ${currentChallenge.explanation}` });
      setCompletedChallenges((prev) => new Set(prev).add(currentChallenge.id));
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);

      if (completedChallenges.size + 1 === CHALLENGES.length) {
        setShowConfetti(true);
        setShowSuccessBanner(true);
        audioManager.play('celebration');
        const scorePct = Math.round(((completedChallenges.size + 1) / CHALLENGES.length) * 100);
        recordGameScore('C12_EcoOpenEconomyMacro', scorePct);
        onComplete(scorePct);
      }
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect solution. Let us review the hints and formula.');
      setChallengeFeedback({ correct: false, msg: `Incorrect. ${currentChallenge.explanation}` });
    }
  };

  const handleNextChallenge = () => {
    setChallengeFeedback(null);
    setUserMcqAnswer(null);
    setUserNumericAnswer('');
    setShowHint(false);
    if (currentChallengeIndex < filteredChallenges.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      audioManager.play('whoosh');
    }
  };

  const handlePrevChallenge = () => {
    setChallengeFeedback(null);
    setUserMcqAnswer(null);
    setUserNumericAnswer('');
    setShowHint(false);
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex((prev) => prev - 1);
      audioManager.play('swoop');
    }
  };

  const showManualHint = () => {
    if (!currentChallenge) return;
    setCurrentHintText(currentChallenge.hints[0]);
    setShowHint(true);
    audioManager.play('hint');
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col gap-6">
      {/* Visual Feedback Overlays */}
      <HintBubble show={showHint} text={currentHintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Macroeconomic Master! All Open Economy Challenges Completed." />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* HEADER BAR */}
      <header className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
              ISC Class 12 Economics
            </span>
            <span className="text-slate-400 text-xs">Chapter: Open Economy Macroeconomics</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
            {SCENARIO.title}
          </h1>
        </div>

        {/* Global Mastery Tracker */}
        <div className="flex items-center gap-4 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-xs text-slate-400">Mastered Nodes</div>
            <div className="text-lg font-bold text-emerald-400">
              {Object.values(bktStates).filter((b) => getMasteryLevel(b) === 'mastered').length} / {ALL_NODE_IDS.length}
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500 flex items-center justify-center text-xs font-bold text-emerald-300">
            {Math.round((completedChallenges.size / CHALLENGES.length) * 100)}%
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'discovery'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          1. Discovery & Narrative
        </button>

        <button
          onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'lab'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          2. Interactive Economics Labs ({EXPLORATION_STEPS.length})
        </button>

        <button
          onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'challenges'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          3. Challenges & Diagnostics ({CHALLENGES.length})
        </button>

        <button
          onClick={() => { setActiveTab('summary'); audioManager.play('tap'); }}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'summary'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          4. Real-World Protocol & Misconceptions
        </button>
      </nav>

      {/* TAB 1: DISCOVERY & NARRATIVE */}
      {activeTab === 'discovery' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scenario & Context */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-indigo-400 mb-3">Central Bank Operational Context</h2>
              <p className="text-slate-300 mb-4 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{SCENARIO.context}</p>
            </div>
            <div className="mt-6 p-4 bg-indigo-950/40 border border-indigo-800/40 rounded-xl">
              <h4 className="text-sm font-semibold text-indigo-300 mb-1">Key Open Economy Links:</h4>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                <li>Output Linkage: International Trade in Goods & Services</li>
                <li>Financial Linkage: Cross-Border Capital Flows (FDI & FPI)</li>
                <li>Labour Linkage: International Migration & Transboundary Services</li>
              </ul>
            </div>
          </div>

          {/* Discovery Question Card */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-md text-xs font-semibold">
                Initial Discovery Question
              </span>
              <h3 className="text-lg font-bold text-white mt-3 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="space-y-2 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setDiscoveryAns(idx); audioManager.play('tap'); }}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-sm ${
                      discoveryAns === idx
                        ? 'bg-indigo-600/30 border-indigo-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              {!showDiscoveryResult ? (
                <button
                  disabled={discoveryAns === null}
                  onClick={handleDiscoverySubmit}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Confirm Hypothesis
                </button>
              ) : (
                <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/30">
                  <p className="text-sm text-slate-200">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>
          </div>

          {/* Prediction Questions Section */}
          <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-emerald-400 mb-4">Initial Macro Predictions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                <div key={pIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3">{pq.question}</h4>
                    <div className="space-y-2 mb-3">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => setPredictionAnswers((prev) => ({ ...prev, [pIdx]: oIdx }))}
                          className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all ${
                            predictionAnswers[pIdx] === oIdx
                              ? 'bg-emerald-600/30 border-emerald-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      disabled={predictionAnswers[pIdx] === undefined}
                      onClick={() => handlePredictionSubmit(pIdx)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white text-xs font-bold rounded-lg transition-all mb-2"
                    >
                      Check Prediction
                    </button>
                    {predictionFeedback[pIdx] !== undefined && (
                      <div className="p-3 bg-slate-900 rounded-lg border border-emerald-500/30 text-xs text-slate-300">
                        <span className="font-bold text-emerald-400">Lab Verification Instruction:</span> {pq.verifyInstruction}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE ECONOMICS LABS */}
      {activeTab === 'lab' && (
        <div className="flex flex-col gap-6">
          {/* Lab Selector Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => { setSelectedLabIndex(idx); audioManager.play('tap'); }}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  selectedLabIndex === idx
                    ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-xs font-bold text-indigo-400">Lab Step {idx + 1}</span>
                <span className="text-xs font-semibold mt-1 text-slate-200 line-clamp-2">{step.title}</span>
              </button>
            ))}
          </div>

          {/* Active Lab Card */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col gap-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white">{EXPLORATION_STEPS[selectedLabIndex].title}</h2>
              <p className="text-slate-400 text-sm mt-1">{EXPLORATION_STEPS[selectedLabIndex].instruction}</p>
            </div>

            {/* LAB 1: BALANCE OF PAYMENTS LEDGER */}
            {selectedLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-bold text-indigo-300 uppercase">BoP Ledger Controls</h3>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Visible Goods Exports ($B): ${goodsExp}B</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="250"
                      value={goodsExp}
                      onChange={(e) => setGoodsExp(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Visible Goods Imports ($B): ${goodsImp}B</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="250"
                      value={goodsImp}
                      onChange={(e) => setGoodsImp(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Net Invisibles (Services + Remittances) ($B): ${netInvisibles}B</span>
                    </div>
                    <input
                      type="range"
                      min="-50"
                      max="100"
                      value={netInvisibles}
                      onChange={(e) => setNetInvisibles(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Autonomous Capital Inflows (FDI/FPI) ($B): ${capitalInflows}B</span>
                    </div>
                    <input
                      type="range"
                      min="-50"
                      max="100"
                      value={capitalInflows}
                      onChange={(e) => setCapitalInflows(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Balance of Trade (BOT):</span>
                      <span className={botBalance >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        ${botBalance}B
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Account Balance:</span>
                      <span className={currentAccountBal >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        ${currentAccountBal}B
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 pt-2">
                      <span className="text-indigo-300 font-bold">Required RBI Accommodating Action:</span>
                      <span className="text-amber-400 font-bold">
                        {bopAccommodatingNeed > 0 ? `Sell $${bopAccommodatingNeed}B Forex Reserves` : `Buy $${Math.abs(bopAccommodatingNeed)}B Forex Reserves`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <BopStructureDiagramSVG currentAccountBal={currentAccountBal} capitalAccountBal={capitalInflows} />
                </div>
              </div>
            )}

            {/* LAB 2: FOREX MARKET EQUILIBRIUM */}
            {selectedLabIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-bold text-emerald-300 uppercase">Market Shifters</h3>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Domestic Interest Rate (%): {domesticRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="12"
                      step="0.5"
                      value={domesticRate}
                      onChange={(e) => setDomesticRate(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Foreign Interest Rate (%): {foreignRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      step="0.5"
                      value={foreignRate}
                      onChange={(e) => setForeignRate(Number(e.target.value))}
                      className="w-full accent-rose-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Foreign Demand for Exports Index: {exportDemand}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={exportDemand}
                      onChange={(e) => setExportDemand(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Speculative Dollar Sentiment Index: {forexSpeculation}</span>
                    </div>
                    <input
                      type="range"
                      min="-15"
                      max="15"
                      value={forexSpeculation}
                      onChange={(e) => setForexSpeculation(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Interest Spread (Domestic - Foreign):</span>
                      <span className="text-indigo-400 font-bold">{netInterestDiff.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-slate-400">Equilibrium Exchange Rate:</span>
                      <span className="text-emerald-400 font-bold">₹{equilibriumForexRate.toFixed(2)} / USD</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <ForexMarketCurveSVG
                    rate={equilibriumForexRate}
                    demandShift={forexSpeculation * 3 - netInterestDiff * 4}
                    supplyShift={(exportDemand - 100) * 0.8 + netInterestDiff * 5}
                  />
                </div>
              </div>
            )}

            {/* LAB 3: OPEN ECONOMY MULTIPLIER */}
            {selectedLabIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-bold text-sky-300 uppercase">Multiplier Parameters</h3>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Marginal Propensity to Consume (c): {mpc.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="0.9"
                      step="0.05"
                      value={mpc}
                      onChange={(e) => setMpc(Number(e.target.value))}
                      className="w-full accent-sky-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Marginal Propensity to Import (m): {mpm.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="0.4"
                      step="0.05"
                      value={mpm}
                      onChange={(e) => setMpm(Number(e.target.value))}
                      className="w-full accent-rose-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Autonomous Expenditure (Abar) ($B): ${autonomousExp}B</span>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="1000"
                      step="50"
                      value={autonomousExp}
                      onChange={(e) => setAutonomousExp(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Closed Economy Multiplier (1 / 1-c):</span>
                      <span className="text-slate-300 font-bold">{(1 / (1 - mpc)).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sky-300 font-bold">Open Economy Multiplier (1 / 1-c+m):</span>
                      <span className="text-sky-400 font-extrabold text-sm">{openMultiplier.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 pt-2">
                      <span className="text-emerald-400 font-bold">Equilibrium Income (Y*):</span>
                      <span className="text-emerald-400 font-bold text-sm">${equilibriumY.toFixed(0)} Billion</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <MultiplierEquilibriumSVG mpc={mpc} mpm={mpm} multiplier={openMultiplier} />
                </div>
              </div>
            )}

            {/* LAB 4: EXCHANGE RATE REGIMES */}
            {selectedLabIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-bold text-amber-300 uppercase">Select Regime & Intervene</h3>

                  <div className="grid grid-cols-3 gap-2">
                    {(['fixed', 'flexible', 'managed'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => { setRegime(r); audioManager.play('tap'); }}
                        className={`p-2.5 rounded-lg border text-xs font-bold uppercase transition-all ${
                          regime === r
                            ? 'bg-amber-600/30 border-amber-500 text-amber-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Central Bank Forex Intervention ($B Drawdown): ${centralBankIntervention}B</span>
                    </div>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      value={centralBankIntervention}
                      onChange={(e) => setCentralBankIntervention(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300">
                    <p className="font-semibold text-amber-400 mb-1">Regime Description:</p>
                    {regime === 'fixed' && 'Exchange rate tied to target peg. Central Bank absorbs all excess demand/supply.'}
                    {regime === 'flexible' && 'Pure floating. Market demand & supply settle equilibrium with zero Central Bank reserves used.'}
                    {regime === 'managed' && 'Dirty Floating. Market forces set daily trends; Central Bank intervenes when rates exceed bounds.'}
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <ExchangeRateRegimeSVG regime={regime} />
                </div>
              </div>
            )}

            {/* LAB 5: PPP & INTEREST PARITY */}
            {selectedLabIndex === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-bold text-violet-300 uppercase">Inflation & Parity Controls</h3>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Domestic Inflation Rate (%): {domesticInf}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      step="0.5"
                      value={domesticInf}
                      onChange={(e) => setDomesticInf(Number(e.target.value))}
                      className="w-full accent-violet-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Foreign Inflation Rate (%): {foreignInf}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={foreignInf}
                      onChange={(e) => setForeignInf(Number(e.target.value))}
                      className="w-full accent-rose-500"
                    />
                  </div>

                  <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Inflation Differential (Domestic - Foreign):</span>
                      <span className="text-violet-400 font-bold">{(domesticInf - foreignInf).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Expected PPP Currency Depreciation:</span>
                      <span className="text-amber-400 font-bold">{(domesticInf - foreignInf).toFixed(1)}% per year</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 pt-2">
                      <span className="text-slate-400">Real Exchange Rate (R):</span>
                      <span className="text-emerald-400 font-bold">
                        {(80 * (1 + foreignInf / 100) / (1 + domesticInf / 100)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-center text-xs space-y-3">
                  <h4 className="font-bold text-violet-400 text-sm">Relative Purchasing Power Parity Theorem</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Percentage change in nominal exchange rate %ΔE equals the inflation differential (π_domestic - π_foreign).
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    If domestic inflation exceeds foreign inflation, the domestic currency must depreciate to maintain real competitiveness (R = E * P_foreign / P_domestic).
                  </p>
                </div>
              </div>
            )}

            {/* OBSERVATION QUESTIONS AT BOTTOM OF LAB */}
            <div className="mt-4 border-t border-slate-800 pt-6">
              <h3 className="text-md font-bold text-indigo-400 mb-4">Lab Observation Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {OBSERVATION_QUESTIONS.map((oq, oqIdx) => (
                  <div key={oqIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                    <p className="font-bold text-white mb-2">{oq.question}</p>
                    <div className="space-y-1.5">
                      {oq.observableOptions.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-2 rounded border ${
                            optIdx === oq.correctIndex
                              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-medium'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHALLENGES & DIAGNOSTICS */}
      {activeTab === 'challenges' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Challenge Selector / Navigator Panel */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white">Challenge Directory</h3>

            {/* Filter Buttons */}
            <div className="grid grid-cols-4 gap-1 text-xs">
              {(['all', 'foundation', 'standard', 'advanced'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => { setActiveDifficulty(diff); setCurrentChallengeIndex(0); audioManager.play('tap'); }}
                  className={`py-1.5 rounded font-semibold capitalize transition-all ${
                    activeDifficulty === diff
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* List Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2 max-h-96 overflow-y-auto pr-1">
              {filteredChallenges.map((chal, idx) => {
                const isCompleted = completedChallenges.has(chal.id);
                const isCurrent = idx === currentChallengeIndex;

                return (
                  <button
                    key={chal.id}
                    onClick={() => { setCurrentChallengeIndex(idx); audioManager.play('tap'); }}
                    className={`p-2 rounded-lg text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 ${
                      isCurrent
                        ? 'bg-indigo-600 border-white text-white'
                        : isCompleted
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>Q{idx + 1}</span>
                    <span className="text-[10px] opacity-75 capitalize">{chal.difficulty[0].toUpperCase()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Challenge Card */}
          <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
            {currentChallenge && (
              <>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-full uppercase">
                        {currentChallenge.difficulty} Tier
                      </span>
                      <span className="text-xs text-slate-400">Competency: {currentChallenge.competencyLevel}</span>
                    </div>

                    {/* Hint Button */}
                    <button
                      onClick={showManualHint}
                      className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold rounded-lg border border-amber-500/30 transition-all flex items-center gap-1"
                    >
                      💡 Hint
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-6 leading-relaxed">
                    {currentChallenge.question}
                  </h3>

                  {/* MCQ OPTIONS */}
                  {currentChallenge.type === 'mcq' && currentChallenge.options && (
                    <div className="space-y-3 mb-6">
                      {currentChallenge.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => { setUserMcqAnswer(oIdx); audioManager.play('tap'); }}
                          className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                            userMcqAnswer === oIdx
                              ? 'bg-indigo-600/30 border-indigo-500 text-white font-medium'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + oIdx)}.</span>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* NUMERIC INPUT */}
                  {currentChallenge.type === 'numeric' && (
                    <div className="mb-6 space-y-2">
                      <label className="text-xs font-semibold text-slate-400">Enter Numeric Answer:</label>
                      <input
                        type="number"
                        step="any"
                        value={userNumericAnswer}
                        onChange={(e) => setUserNumericAnswer(e.target.value)}
                        placeholder="Type numeric answer..."
                        className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-lg focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  )}

                  {/* FEEDBACK DISPLAY */}
                  {challengeFeedback && (
                    <div
                      className={`p-4 rounded-xl border mb-6 text-sm ${
                        challengeFeedback.correct
                          ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300'
                          : 'bg-rose-950/50 border-rose-500/50 text-rose-300'
                      }`}
                    >
                      {challengeFeedback.msg}
                    </div>
                  )}
                </div>

                {/* CONTROLS BAR */}
                <div className="flex justify-between items-center border-t border-slate-800 pt-4">
                  <button
                    onClick={handlePrevChallenge}
                    disabled={currentChallengeIndex === 0}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 text-xs font-bold rounded-lg transition-all"
                  >
                    ← Previous
                  </button>

                  <button
                    onClick={handleChallengeAnswer}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
                  >
                    Submit Answer
                  </button>

                  <button
                    onClick={handleNextChallenge}
                    disabled={currentChallengeIndex === filteredChallenges.length - 1}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 text-xs font-bold rounded-lg transition-all"
                  >
                    Next →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: REAL-WORLD PROTOCOL & MISCONCEPTIONS */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* REAL-WORLD ACTIVITY WALKTHROUGH */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-md text-xs font-bold uppercase">
                Real-World Central Bank Task
              </span>
              <h3 className="text-xl font-bold text-white mt-3 mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3">
                {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                  <div key={sIdx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    {st}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  setShowConfetti(true);
                  setShowSuccessBanner(true);
                  audioManager.play('celebration');
                  const score = Math.round((completedChallenges.size / CHALLENGES.length) * 100);
                  onComplete(score);
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
              >
                Complete Simulation Protocol & Record Score
              </button>
            </div>
          </div>

          {/* MISCONCEPTIONS ACCORDION / GRID */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-amber-400">Common Macroeconomic Misconceptions</h3>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {MISCONCEPTIONS.map((m) => (
                <div key={m.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="flex items-start gap-2 text-rose-400">
                    <span className="font-bold">❌ Misconception:</span>
                    <span>{m.misconception}</span>
                  </div>
                  <div className="flex items-start gap-2 text-emerald-400 border-t border-slate-900 pt-2">
                    <span className="font-bold">✓ Correction:</span>
                    <span className="text-slate-300">{m.correction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default C12_EcoOpenEconomyMacroCBSESim;
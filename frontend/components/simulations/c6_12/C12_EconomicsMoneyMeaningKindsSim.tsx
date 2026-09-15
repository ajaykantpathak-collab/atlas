'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, ReferenceLine 
} from 'recharts';
import * as d3 from 'd3';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_ECON_051 = 'c12_econ_051';
const NODE_C12_ECON_052 = 'c12_econ_052';
const NODE_C12_ECON_053 = 'c12_econ_053';
const NODE_C12_ECON_054 = 'c12_econ_054';
const NODE_C12_ECON_055 = 'c12_econ_055';
const NODE_C12_ECON_056 = 'c12_econ_056';
const NODE_C12_ECON_057 = 'c12_econ_057';
const NODE_C12_ECON_058 = 'c12_econ_058';
const NODE_C12_ECON_059 = 'c12_econ_059';
const NODE_C12_ECON_060 = 'c12_econ_060';

const ALL_NODE_IDS = [
  NODE_C12_ECON_051,
  NODE_C12_ECON_052,
  NODE_C12_ECON_053,
  NODE_C12_ECON_054,
  NODE_C12_ECON_055,
  NODE_C12_ECON_056,
  NODE_C12_ECON_057,
  NODE_C12_ECON_058,
  NODE_C12_ECON_059,
  NODE_C12_ECON_060,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Mint & Banking Overhaul',
  intro: 'Welcome to the Reserve Bank of India Macroeconomic Operations Command! High inflation, shifting liquidity aggregates (M0 to M4), supply shocks in global crude oil, and commercial bank credit cycles are threatening macroeconomic stability. You have been appointed Chief Monetary Strategist to steer India through monetary expansion, banking credit creation, and price stabilisation.',
  context: 'Manage India\'s ₹210+ Lakh Crore money supply, calculate bank multiplier cascades, identify legal tender nuances, counter stagflation, and coordinate RBI policy levers across repo rates, CRR, and reserve money.'
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If the RBI injects ₹10,000 Crore of High-Powered Money (Reserve Money, M0) into scheduled commercial banks with a 5% Cash Reserve Ratio (CRR), what happens to the total credit created in the banking system under ideal multiplier conditions?',
  options: [
    'Exactly ₹10,000 Crore of credit is created (1:1 ratio)',
    'Total credit created becomes ₹1,90,000 Crore (Initial × (1/CRR - 1))',
    'Total credit created becomes ₹2,00,000 Crore (Initial × 1/CRR)',
    'Zero credit is created because banks must keep all deposits in vaults'
  ],
  correctIndex: 1,
  hintAfter: 'Don\'t worry if you thought it was ₹2,00,000 Cr! Total Deposits become ₹2,00,000 Cr, but Credit Created excludes the original public primary cash deposit of ₹10,000 Cr. Let us explore the mechanics!'
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Money Kinds (Recall)
  {
    id: 'ch_01_fnd_kinds',
    nodeId: NODE_C12_ECON_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the RBI Act 1934 (Section 26), which of the following is an example of Unlimited Legal Tender Fiat Money in India?',
    options: [
      'A ₹50,000 Demand Draft issued by State Bank of India',
      'A standard ₹500 currency note issued by the RBI',
      'A cross-bearer Cheque drawn on HDFC Bank',
      'A 50-paise coin under the Coinage Act 2011'
    ],
    correctIndex: 1,
    explanation: 'A ₹500 note is fiat money with unlimited legal tender status decreed by the state. Demand drafts and cheques are fiduciary credit money resting on trust (not legal tender), while coins have limited legal tender status.',
    hints: [
      'Think about which instrument cannot be legally refused for debts of any size.',
      'Cheques and drafts rely on trust in the banking issuer (fiduciary), not statutory compulsion.',
      'RBI currency notes carry unlimited legal tender status by state decree.'
    ],
    misconceptionIndex: 0
  },
  // 2. Foundation - Functions of Money (Recall)
  {
    id: 'ch_02_fnd_func',
    nodeId: NODE_C12_ECON_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A farmer in Punjab sells 100 quintals of wheat to FCI for ��2,01,500 and uses the cash to purchase fertiliser and tractor spares. Which primary function of money is directly observed?',
    options: [
      'Standard of deferred payment',
      'Medium of exchange',
      'Distribution of national income',
      'Liquidity of wealth'
    ],
    correctIndex: 1,
    explanation: 'By splitting the transaction into sale (wheat for money) and purchase (money for fertiliser), money functions as a Medium of Exchange, eliminating the double coincidence of wants.',
    hints: [
      'Look at how the sale and purchase of goods are separated.',
      'The barter problem being solved is the double coincidence of wants.',
      'Money is serving as the intermediary in commercial transactions.'
    ],
    misconceptionIndex: 1
  },
  // 3. Foundation - M0 and M1 (Recall)
  {
    id: 'ch_03_fnd_m1',
    nodeId: NODE_C12_ECON_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the precise composition of Narrow Money (M1) as formulated by the Reserve Bank of India?',
    options: [
      'Currency in circulation + Bankers\' deposits with RBI + Post office savings',
      'Currency with the public + Demand deposits with banks + Other deposits with RBI',
      'M0 + Time deposits with commercial banks',
      'Currency in bank vaults + Inter-bank deposits + Cash reserves'
    ],
    correctIndex: 1,
    explanation: 'M1 = Currency with the public + Demand deposits with banks + Other deposits with the RBI. It strictly excludes cash held in bank vaults and inter-bank deposits to avoid double counting.',
    hints: [
      'Remember that M1 counts liquid money held strictly by the PUBLIC.',
      'Cash in bank vaults and inter-bank deposits are excluded.',
      'The formula is: Currency with public + Demand deposits + Other deposits with RBI.'
    ],
    misconceptionIndex: 2
  },
  // 4. Foundation - Drag Label Money Aggregates Structure
  {
    id: 'ch_04_fnd_drag_m',
    nodeId: NODE_C12_ECON_054,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each monetary component to its corresponding aggregate layer in the RBI framework.',
    dragItems: [
      { label: 'Demand Deposits & Public Currency', targetId: 'slot_m1' },
      { label: 'Post Office Savings Deposits', targetId: 'slot_m2' },
      { label: 'Bank Time Deposits (FDs)', targetId: 'slot_m3' },
      { label: 'Total Post Office Deposits (excl. NSCs)', targetId: 'slot_m4' }
    ],
    correctMapping: {
      slot_m1: 'Demand Deposits & Public Currency',
      slot_m2: 'Post Office Savings Deposits',
      slot_m3: 'Bank Time Deposits (FDs)',
      slot_m4: 'Total Post Office Deposits (excl. NSCs)'
    },
    explanation: 'M1 is the narrow core (Currency + Demand Deposits). M2 adds Post Office Savings. M3 (Broad Money) adds Bank Time Deposits to M1. M4 adds Total Post Office Deposits (excl. NSCs) to M3.',
    hints: [
      'Start with the narrowest liquid layer: M1.',
      'M3 broad money incorporates the massive ₹160+ Lakh Cr pool of bank fixed time deposits.',
      'M2 and M4 incorporate postal banking accounts.'
    ],
    misconceptionIndex: 3
  },
  // 5. Foundation - Bank Functions (Recall)
  {
    id: 'ch_05_fnd_bankfunc',
    nodeId: NODE_C12_ECON_057,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is classified as an Agency (Secondary) function of a commercial bank in India?',
    options: [
      'Accepting Recurring and Fixed Deposits',
      'Safe Deposit Vault Locker facilities for jewellery',
      'Collection of dividend warrants and payment of insurance premiums via auto-debit',
      'Underwriting corporate equity shares and debentures'
    ],
    correctIndex: 2,
    explanation: 'Collecting dividends and paying auto-debit utility bills/premiums are Agency functions where the bank acts as the authorized agent of the customer. Lockers and underwriting are General Utility functions.',
    hints: [
      'Agency functions involve acting specifically as the client\'s authorized representative.',
      'Accepting deposits is a primary function.',
      'Lockers are general utility services.'
    ],
    misconceptionIndex: 4
  },
  // 6. Foundation - Numeric Inflation Rate (Recall/Application)
  {
    id: 'ch_06_fnd_inflation_calc',
    nodeId: NODE_C12_ECON_055,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'If the All-India CPI (Combined) index moves from 160 in Base Year to 168 in the Current Year, calculate the annual inflation rate percentage.',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Inflation Rate = ((Current Index - Base Index) / Base Index) × 100 = ((168 - 160) / 160) × 100 = (8 / 160) × 100 = 5.0%. This falls into the walking inflation band (3%–6%).',
    hints: [
      'Use formula: ((CPI_current - CPI_base) / CPI_base) * 100',
      'Numerator is 168 - 160 = 8.',
      '8 divided by 160 is 0.05, which is 5%.'
    ],
    misconceptionIndex: 1
  },
  // 7. Foundation - RBI Statutory Authority (Recall)
  {
    id: 'ch_07_fnd_rbi_statute',
    nodeId: NODE_C12_ECON_060,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under which statutory section does the RBI possess the sole authority to issue banknotes in India (excluding the ₹1 note)?',
    options: [
      'Section 42 of the RBI Act 1934',
      'Section 22 of the RBI Act 1934',
      'Section 35A of the Banking Regulation Act 1949',
      'Section 45ZN of the Finance Act 2016'
    ],
    correctIndex: 1,
    explanation: 'Section 22 of the RBI Act 1934 confers the sole right of banknote issuance upon the RBI. Section 42 governs CRR, Section 35A governs banking directions, and Section 45ZN governs inflation targeting.',
    hints: [
      'The note issue section is one of the earliest operative clauses in the RBI Act.',
      'Section 42 is for cash reserves (CRR).',
      'The note issuance clause is Section 22.'
    ]
  },
  // 8. Standard - Numeric Multiplier & Credit Created (Application)
  {
    id: 'ch_08_std_credit_mult',
    nodeId: NODE_C12_ECON_058,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A primary cash deposit of ₹20,000 is placed in SBI. If the mandatory CRR set by RBI is 4%, calculate the Total Credit Created across the banking system (in ₹).',
    correctAnswer: 480000,
    tolerance: 100,
    unit: '₹',
    explanation: 'Credit Multiplier k = 1/CRR = 1/0.04 = 25. Total Deposits = 20,000 × 25 = ₹5,00,000. Total Credit Created = Total Deposits - Initial Primary Deposit = ₹5,00,000 - ₹20,000 = ₹4,80,000.',
    hints: [
      'First calculate multiplier k = 1 / 0.04 = 25.',
      'Total Deposits = ₹20,000 * 25 = ₹5,00,000.',
      'Remember: Credit Created = Total Deposits - Initial Deposit = ₹5,00,000 - ₹20,000.'
    ],
    misconceptionIndex: 0
  },
  // 9. Standard - Demand-Pull vs Cost-Push (Analysis)
  {
    id: 'ch_09_std_inflation_types',
    nodeId: NODE_C12_ECON_056,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Global crude oil surges from $75 to $120/barrel, raising transportation freight and petrochemical input costs across India, leading to higher CPI alongside slowing GDP growth. How is this classified?',
    options: [
      'Demand-pull inflation caused by excessive consumer credit',
      'Cost-push imported inflation exhibiting stagflationary traits',
      'Creeping monetary inflation caused by high velocity of circulation',
      'Deflationary spiral caused by contraction of high-powered money'
    ],
    correctIndex: 1,
    explanation: 'Because the price rise originates from imported supply-side input costs (oil) rather than a surge in AD, and causes AS to contract (raising prices while dampening output), it is Cost-Push Inflation with stagflationary pressure.',
    hints: [
      'Identify the origin: did consumer spending surge, or did input/raw material costs spike?',
      'India imports ~85% of crude oil, making oil price spikes supply-side cost shocks.',
      'Higher input costs shift AS leftward, pushing prices up while contracting output.'
    ],
    misconceptionIndex: 1
  },
  // 10. Standard - Overdraft vs Cash Credit (Distinguish)
  {
    id: 'ch_10_std_od_cc',
    nodeId: NODE_C12_ECON_057,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How does an Overdraft facility differ fundamentally from Cash Credit in commercial banking?',
    options: [
      'Overdraft is granted only against hypothecation of raw material inventory, whereas Cash Credit is completely unsecured',
      'Overdraft is allowed on current accounts based on customer creditworthiness without specific collateral; Cash Credit is secured against pledge/hypothecation of current assets',
      'Overdraft is a 20-year term loan, while Cash Credit is a demand deposit account',
      'Overdraft charges interest on the full sanctioned limit, while Cash Credit charges no interest'
    ],
    correctIndex: 1,
    explanation: 'Overdraft is an unsecured running facility on current accounts based on relationship/creditworthiness. Cash Credit is a short-term working capital facility secured by current assets like stock and receivables.',
    hints: [
      'Think about collateral: which one requires pledging inventories and stock?',
      'Overdraft is tied directly to the business current account.',
      'Cash credit is secured against hypothecated inventory/receivables.'
    ],
    misconceptionIndex: 4
  },
  // 11. Standard - Drag-Sort Banking Multiplier Chain (Analysis)
  {
    id: 'ch_11_std_drag_sort_rounds',
    nodeId: NODE_C12_ECON_058,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential steps of the fractional reserve credit creation cycle in the correct chronological order.',
    sortItems: [
      'Public deposits Primary Cash (₹1,00,000) into Bank A',
      'Bank A retains 10% statutory reserve (₹10,000) and lends ₹90,000 excess to Borrower 1',
      'Borrower 1 pays Supplier, who deposits ₹90,000 as Derivative Deposit in Bank B',
      'Bank B holds ₹9,000 reserve and extends ₹81,000 credit to Borrower 2',
      'Successive geometric lending converges until total system reserves equal ₹1,00,000'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Primary deposit enters Bank A → Reserve fraction retained and excess lent → Proceeds deposited in Bank B creating derivative deposit → Bank B repeats reserve & loan cycle → Series converges when total reserves equal original cash.',
    hints: [
      'The process must start with the public depositing fresh primary cash.',
      'Each loan becomes the subsequent bank\'s derivative deposit.',
      'The expansion stops when total distributed reserves sum to the initial cash deposit.'
    ]
  },
  // 12. Standard - High-Powered Money vs M1 (Analysis)
  {
    id: 'ch_12_std_h_vs_m1',
    nodeId: NODE_C12_ECON_059,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is High-Powered Money (H = M0) fundamentally different from Narrow Money (M1)?',
    options: [
      'H represents the central bank liabilities/monetary base powering multiplier expansion; M1 represents public liquid spending balances generated from that base',
      'H contains all post-office deposits, while M1 contains only gold reserves',
      'M1 is created exclusively by the government, while H is created by commercial bank overdrafts',
      'H and M1 are identical in value and scope under Indian monetary law'
    ],
    correctIndex: 0,
    explanation: 'H (M0) is the base created directly by the RBI (currency in circulation + bankers\' reserves with RBI + other deposits). M1 is the public spendable stock (currency with public + demand deposits) created as a multiple of H.',
    hints: [
      'H is the foundation (monetary base); M1 is a superstructure aggregate.',
      'Bankers\' cash reserves with RBI are in H but NOT in M1.',
      'The public\'s demand deposits in commercial banks are in M1 but NOT in H.'
    ],
    misconceptionIndex: 2
  },
  // 13. Standard - Demonetisation Impact on Aggregates (Evaluation)
  {
    id: 'ch_13_std_demonetisation',
    nodeId: NODE_C12_ECON_051,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'On 8 November 2016, the legal tender status of old ₹500 and ₹1000 notes was withdrawn under Section 26(2) of the RBI Act. What fundamental property of Fiat Money was demonstrated?',
    options: [
      'Fiat money possesses intrinsic value equal to silver content',
      'Fiat money derives value entirely from the state\'s legal decree; withdrawal of the decree immediately destroys its monetary status',
      'Fiat money is backed by 100% convertible gold held in RBI vaults',
      'Fiat money transforms automatically into fiduciary bills of exchange'
    ],
    correctIndex: 1,
    explanation: 'Fiat money has no intrinsic value and is not convertible to gold. Its acceptability rests 100% on government decree declaring it legal tender. When Section 26(2) decree was cancelled, 86% of currency value instantly ceased being money.',
    hints: [
      'Look at the Latin root "fiat" (by decree).',
      'Modern currency notes are not backed by redeemable gold.',
      'When the statutory decree is rescinded, the physical paper loses all purchasing power.'
    ],
    misconceptionIndex: 0
  },
  // 14. Standard - Real Pension Value under Inflation (Application)
  {
    id: 'ch_14_std_pension_erosion',
    nodeId: NODE_C12_ECON_055,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A retired teacher in Kolkata receives a fixed monthly pension of ₹30,000 with zero Dearness Allowance adjustment. If CPI inflation runs at 6.0% over the year, what is the approximate real purchasing value of the monthly pension (in ₹)?',
    correctAnswer: 28302,
    tolerance: 15,
    unit: '₹',
    explanation: 'Real Value = Nominal Value / (1 + Inflation Rate) = 30,000 / (1 + 0.06) = 30,000 / 1.06 ≈ ₹28,301.89 (loss of ~₹1,698/month in real purchasing power).',
    hints: [
      'Use the formula: Real Value = Nominal Value / (1 + r)',
      'Divide 30,000 by 1.06.',
      'The result is approximately ₹28,302.'
    ],
    misconceptionIndex: 1
  },
  // 15. Standard - RBI Lender of Last Resort Case Study (Application)
  {
    id: 'ch_15_std_yesbank_case',
    nodeId: NODE_C12_ECON_060,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In March 2020, when Yes Bank faced severe liquidity distress, the RBI imposed a moratorium under Section 45 of the Banking Regulation Act and organized an SBI-led reconstruction. Which core RBI function was demonstrated?',
    options: [
      'Custodian of Foreign Exchange Reserves',
      'Lender of Last Resort and Systemic Banking Regulator',
      'Issuer of One-Rupee coins and currency notes',
      'Underwriter of commercial trade bills of exchange'
    ],
    correctIndex: 1,
    explanation: 'By providing liquidity support, preventing a contagious bank run, and reconstructing the bank under Section 45, the RBI exercised its role as Lender of Last Resort and apex banking supervisor.',
    hints: [
      'Consider how the RBI acts as a safety net when a commercial bank faces panic withdrawals.',
      'This prevents a single bank\'s liquidity shortage from causing systemic panic.',
      'The function is Lender of Last Resort.'
    ]
  },
  // 16. Advanced - Multiplier Leakage Analysis (Evaluation)
  {
    id: 'ch_16_adv_leakage_eval',
    nodeId: NODE_C12_ECON_058,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'India\'s theoretical credit multiplier is 1/CRR = 1/0.045 ≈ 22.2, yet the actual observed Broad Money multiplier (M3/M0) is only about 5.5. What is the primary structural reason for this large divergence?',
    options: [
      'The RBI refuses to clear cheques between public sector banks',
      'High cash leakage (currency-deposit ratio ~15%), banks holding excess reserves, and statutory SLR locking funds in government securities',
      'Post office savings deposits being completely excluded from all broad money metrics',
      'Indian currency notes having limited legal tender status above ₹10,000'
    ],
    correctIndex: 1,
    explanation: 'The theoretical 1/CRR assumes zero cash drain, zero excess reserves, and 100% loan re-deposit. In India, public currency holdings (~15% currency-to-deposit ratio), bank excess reserves, and the 18% SLR reserve requirement severely contract the realized multiplier.',
    hints: [
      'Examine the assumptions of 1/CRR: no cash drain, zero excess reserves, complete re-deposits.',
      'In India, substantial transactions occur in physical cash, leaking funds from the banking chain.',
      'SLR also obliges banks to hold 18% in liquid government securities.'
    ],
    misconceptionIndex: 0
  },
  // 17. Advanced - Construct Monetary Policy Transmission Equation
  {
    id: 'ch_17_adv_construct_chain',
    nodeId: NODE_C12_ECON_056,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the correct monetary policy transmission sequence used by the RBI Monetary Policy Committee (MPC) to curb Demand-Pull Inflation.',
    availableParts: [
      'RBI raises Repo Rate',
      'Commercial bank lending rates rise',
      'Borrowing costs for C & I increase',
      'Aggregate Demand (AD) contracts',
      'Inflationary Gap closes & CPI cools'
    ],
    targetState: 'RBI raises Repo Rate Commercial bank lending rates rise Borrowing costs for C & I increase Aggregate Demand (AD) contracts Inflationary Gap closes & CPI cools',
    validationHint: 'Sequence: Policy action → Interbank transmission → Cost of credit → Demand effect → Price stability.',
    explanation: 'MPC hikes Repo Rate → Commercial banks pass on higher rates to loans → Consumption (C) and Investment (I) borrowing slows → AD shifts leftward → Inflationary gap closes, restoring CPI to target band.',
    hints: [
      'Start with the policy instrument: Repo Rate hike.',
      'Trace how higher repo rate flows into commercial bank retail and corporate loan rates.',
      'Conclude with the contraction of Aggregate Demand and stabilisation of CPI.'
    ]
  },
  // 18. Advanced - Money Multiplier Numeric Calculation (Application)
  {
    id: 'ch_18_adv_m3_h_calc',
    nodeId: NODE_C12_ECON_059,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Suppose Reserve Money (H = M0) is ₹20 Lakh Crore and Broad Money (M3) stands at ₹214 Lakh Crore. Calculate the broad money multiplier (m3).',
    correctAnswer: 10.7,
    tolerance: 0.1,
    unit: 'ratio',
    explanation: 'Money Multiplier m3 = M3 / H = ₹214 Lakh Crore / ₹20 Lakh Crore = 10.70. Each ₹1 of base reserve money created by the RBI supports ₹10.70 of broad purchasing power in the economy.',
    hints: [
      'Use formula: m3 = M3 / H',
      'Divide 214 by 20.',
      'The exact ratio is 10.7.'
    ]
  },
  // 19. Advanced - Evaluation of Stagflation & Policy Dilemma (Evaluation)
  {
    id: 'ch_19_adv_stagflation_dilemma',
    nodeId: NODE_C12_ECON_056,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does applying aggressive monetary tightening (hiking repo rates) fail as a standalone remedy for Cost-Push Stagflation?',
    options: [
      'Because higher interest rates automatically increase the money multiplier',
      'Because tightening suppresses demand and raises financing costs for businesses, potentially worsening output contraction while failing to address the supply-side input shock',
      'Because the RBI has no legal jurisdiction over commercial banks during stagflation',
      'Because cost-push inflation is caused entirely by excess demand deposits in M1'
    ],
    correctIndex: 1,
    explanation: 'Demand-side monetary tightening curbs aggregate spending. But in cost-push stagflation, the root problem is high input costs (e.g. crude oil), not excess demand. Hiking rates increases business borrowing costs, deepening GDP contraction without fixing the supply shock.',
    hints: [
      'Recognize that monetary policy primarily shifts the Aggregate Demand (AD) curve.',
      'Cost-push inflation is caused by a leftward shift of Aggregate Supply (AS).',
      'Depressing AD further when AS is contracted can cause deeper recession.'
    ],
    misconceptionIndex: 1
  },
  // 20. Advanced - Post Office Role in M2/M4 Aggregates (Analysis)
  {
    id: 'ch_20_adv_post_office',
    nodeId: NODE_C12_ECON_054,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does the RBI maintain distinct M2 and M4 aggregates incorporating Post Office Savings Bank deposits, unlike many Western central banks?',
    options: [
      'Because post offices print India\'s ₹1 currency notes',
      'Due to India\'s vast postal network (~1.6 lakh branches) acting as a crucial rural financial inclusion intermediary where commercial banks were historically absent',
      'Because National Savings Certificates (NSCs) are fully liquid demand deposits',
      'Because post offices are authorized to create derivative credit like commercial banks'
    ],
    correctIndex: 1,
    explanation: 'India\'s ~1.6 lakh post offices serve as a parallel rural banking infrastructure. To capture rural savings outside commercial banks, the RBI established M2 and M4. Post offices do NOT create credit, which is why their deposits are measured separately.',
    hints: [
      'Think about rural financial inclusion in India.',
      'India has the largest postal network in the world providing deposit facilities.',
      'Postal savings represent significant household financial wealth in unbanked regions.'
    ]
  },
  // 21. Advanced - Contingent Functions of Money (Analysis)
  {
    id: 'ch_21_adv_contingent_func',
    nodeId: NODE_C12_ECON_052,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which of the following describes the Contingent function of money known as the "Maximisation of Utility / Equi-Marginal Principle"?',
    options: [
      'Holding ₹10 Lakh in physical cash allows instant purchase of gold or land',
      'Consumers and producers equate marginal utility per rupee spent across all goods (MUx/Px = MUy/Py) using money as a common denominator',
      'Government transferring ₹500/month into Jan Dhan accounts of rural beneficiaries',
      'Issuing a 20-year home loan with fixed monthly equated instalments'
    ],
    correctIndex: 1,
    explanation: 'Money enables consumers to measure and equalize marginal utilities per rupee across diverse commodities (MUx/Px = MUy/Py), achieving optimal utility equilibrium. Liquidity of wealth is a different contingent function.',
    hints: [
      'Look for the microeconomic condition for consumer equilibrium.',
      'The law of equi-marginal utility requires a common monetary price denominator.',
      'Option 2 correctly matches the equi-marginal principle.'
    ]
  },
  // 22. Advanced - Numeric M0 and M1 Calculation from Component Data (Application)
  {
    id: 'ch_22_adv_m0_m1_full_calc',
    nodeId: NODE_C12_ECON_053,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Given: Currency in Circulation = ₹32 Lakh Cr; Cash in Bank Vaults = ₹2 Lakh Cr; Demand Deposits = ₹25 Lakh Cr; Bankers\' Deposits with RBI = ₹8 Lakh Cr; Other Deposits with RBI = ₹1 Lakh Cr; Inter-bank Deposits = ₹4 Lakh Cr. Calculate Narrow Money M1 (in Lakh Cr).',
    correctAnswer: 56,
    tolerance: 0.5,
    unit: 'Lakh Cr',
    explanation: 'Currency with Public = Currency in Circulation (32) - Cash in Bank Vaults (2) = ₹30 Lakh Cr. M1 = Currency with Public (30) + Demand Deposits (25) + Other Deposits with RBI (1) = ₹56 Lakh Cr. (Inter-bank deposits and bank vault cash are strictly excluded).',
    hints: [
      'Step 1: Calculate Currency with Public = Currency in circulation (32) - Bank vault cash (2) = 30.',
      'Step 2: Add Demand Deposits (25) + Other Deposits with RBI (1).',
      'M1 = 30 + 25 + 1 = 56 Lakh Cr. (Ignore inter-bank deposits to avoid double counting).'
    ],
    misconceptionIndex: 2
  }
];

// ─── DEFAULT PROPS & ENRICHMENT DATA ───
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
  nodeId: NODE_C12_ECON_051,
  title: 'Money, Banking, Inflation & RBI Monetary Architecture',
  definition: 'Money is anything generally accepted as a medium of exchange, measure of value, and store of value. The RBI regulates the monetary base (M0), broad aggregates (M1-M4), and inflation targeting (4% ± 2% CPI) while commercial banks multiply credit via the fractional reserve system.',
  eli5: 'Money is a universally trusted token that lets us trade, price goods, save, and settle debts without barter headaches. Banks multiply this money by keeping a small slice as reserve and lending the rest, while the RBI controls the master valves to keep prices stable.',
  misconceptions: [
    {
      misconception: 'Total Credit Created equals Initial Deposit × (1/CRR).',
      correction: 'Total Credit Created = Initial Deposit × (1/CRR - 1) = Total Deposits - Primary Deposit. The initial cash was the public\'s own money, not created credit.'
    },
    {
      misconception: 'All inflation is demand-pull caused by too much money chasing too few goods.',
      correction: 'Cost-push inflation originates from supply-side input spikes (e.g. crude oil), shifting Aggregate Supply leftward and causing rising prices alongside falling output (stagflation).'
    },
    {
      misconception: 'M1 includes all currency in circulation, including bank vault cash.',
      correction: 'M1 uses Currency WITH THE PUBLIC only. Cash held inside commercial bank vaults and inter-bank deposits are strictly excluded to prevent double counting.'
    },
    {
      misconception: 'M2 is broader than M3 because the number 2 precedes 3.',
      correction: 'M3 (Broad Money) is roughly 5 times larger than M2 because M3 includes the massive pool of commercial bank time deposits (FDs), whereas M2 adds only small postal savings.'
    },
    {
      misconception: 'Overdraft and Cash Credit are interchangeable loan facilities.',
      correction: 'Overdraft is an unsecured running facility on current accounts based on relationship/creditworthiness; Cash Credit is a working capital facility secured against pledged inventory/receivables.'
    }
  ],
  diagnosticQuestions: [
    { question: 'What is the defining criterion that makes an object money?', options: ['100% Gold backing', 'General acceptability in exchange', 'Made of precious metal', 'Issued by private corporations'], correctIndex: 1 },
    { question: 'Which aggregate is officially termed Broad Money in India?', options: ['M0', 'M1', 'M2', 'M3'], correctIndex: 3 },
    { question: 'If CRR is 5%, what is the theoretical credit multiplier k?', options: ['5', '10', '20', '25'], correctIndex: 2 },
    { question: 'Who is the official note-issuing authority under Section 22 of the RBI Act 1934?', options: ['Ministry of Finance', 'Reserve Bank of India', 'State Bank of India', 'NITI Aayog'], correctIndex: 1 },
    { question: 'What type of inflation occurs when crude oil prices spike, causing prices to rise while GDP slows?', options: ['Demand-Pull', 'Cost-Push (Stagflation)', 'Creeping Deflation', 'Hyperinflation'], correctIndex: 1 },
    { question: 'What is the statutory CPI inflation target mandated for the RBI MPC under Section 45ZN?', options: ['2% with ±1%', '4% with ±2%', '6% with ±3%', '0% with ±2%'], correctIndex: 1 },
    { question: 'Which function of money solves the double coincidence of wants?', options: ['Store of value', 'Medium of exchange', 'Unit of account', 'Standard of deferred payment'], correctIndex: 1 },
    { question: 'What is excluded from M4?', options: ['Post office savings', 'Senior Citizen Savings Scheme', 'National Savings Certificates (NSCs)', 'Recurring deposits'], correctIndex: 2 }
  ],
  masteryCriteria: 'Mastery across classification of money, aggregates (M0-M4), credit creation mechanics, demand-pull/cost-push inflation, commercial banking functions, and RBI monetary policy levers.'
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Kinds & Legal Status of Money',
    instruction: 'Click on different monetary instruments in the Indian economy to examine their legal tender status and backing.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_ECON_051
  },
  {
    title: 'Lab 2: Liquidity Spectrum (M0 to M4)',
    instruction: 'Adjust the component sliders to see how shifting funds from Demand Deposits to Fixed Deposits impacts M1 vs M3 in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_053
  },
  {
    title: 'Lab 3: Banking Credit Creation Engine',
    instruction: 'Vary the Cash Reserve Ratio (CRR) and Initial Cash Deposit to simulate the multi-round bank lending cascade.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_058
  },
  {
    title: 'Lab 4: Inflation Simulator (Demand-Pull vs Cost-Push)',
    instruction: 'Shift Aggregate Demand (AD) and Aggregate Supply (AS) to observe the emergence of Inflationary Gaps and Stagflation.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_056
  },
  {
    title: 'Lab 5: RBI Monetary Policy Command Desk',
    instruction: 'Manipulate the Policy Repo Rate and CRR levers to bring CPI inflation and output back into the 4% ± 2% target corridor.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_060
  }
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the public shifts ₹10,000 Crore from Current/Savings Accounts into 5-Year Fixed Deposits, what will happen to M1 and M3?',
    options: [
      'Both M1 and M3 will decrease by ₹10,000 Crore',
      'M1 decreases by ₹10,000 Crore, while M3 remains unchanged',
      'M1 remains unchanged, while M3 increases by ₹10,000 Crore',
      'Both M1 and M3 increase due to higher interest earnings'
    ],
    correctIndex: 1,
    verifyInstruction: 'Check Lab 2: Demand deposits leave M1 (narrow money), but since M3 = M1 + Time Deposits, the total broad money pool M3 remains constant!',
    nodeId: NODE_C12_ECON_054
  },
  {
    question: 'Predict: If the RBI lowers the Cash Reserve Ratio (CRR) from 5% to 4%, what happens to the maximum potential credit creation capacity?',
    options: [
      'Credit multiplier decreases from 25 to 20',
      'Credit multiplier increases from 20 to 25, expanding lendable funds',
      'Banks must call back loans to maintain cash reserves',
      'Money supply remains completely frozen'
    ],
    correctIndex: 1,
    verifyInstruction: 'Check Lab 3: k = 1/0.05 = 20 increases to k = 1/0.04 = 25. Banks hold less reserve per deposit and lend out 96% instead of 95%!',
    nodeId: NODE_C12_ECON_058
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'In the Credit Creation simulation, what do you observe about the sum of reserves held across all banks in the chain as the geometric series converges?',
    observableOptions: [
      'Total reserves equal exactly the original primary cash deposit',
      'Total reserves shrink down to zero',
      'Total reserves grow to become larger than total deposits',
      'Total reserves fluctuate randomly without pattern'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_ECON_058
  },
  {
    question: 'In the Inflation simulator, what happens to Output (GDP) when a Cost-Push shock (AS left shift) occurs compared to a Demand-Pull surge (AD right shift)?',
    observableOptions: [
      'Cost-push increases output while demand-pull decreases it',
      'Cost-push raises prices while REDUCING output (stagflation); demand-pull raises prices with stable/expanding output',
      'Both shocks double real output without price changes',
      'Neither shock impacts prices or output'
    ],
    correctIndex: 1,
    nodeId: NODE_C12_ECON_056
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Indian Monetary Policy Analyst Mission',
  description: 'Track the latest RBI Monetary Policy Committee (MPC) Bi-monthly Statement. Examine the current Repo Rate (e.g. 6.50%), CRR (4.50%), and CPI inflation figure.',
  steps: [
    'Access the RBI official portal (rbi.org.in) and look up the latest M3 and Reserve Money (M0) figures from the Weekly Statistical Supplement.',
    'Compute India\'s current empirical Broad Money Multiplier (m3 = M3 / M0).',
    'Identify whether current CPI inflation sits inside the 4% ± 2% statutory target band.',
    'Formulate a 3-point recommendation on whether the MPC should hike, hold, or cut the Repo Rate based on current crude oil and food supply conditions.'
  ]
};

// ─── COMPONENT IMPLEMENTATION ───
function C12_EconomicsMoneyMeaningKindsSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['economics'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant style pattern states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Difficulty & Mastery
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints & Visual feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Feedback components
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Interactive Lab & Simulator States
  const [selectedInstrument, setSelectedInstrument] = useState<string>('note500');
  const [publicCash, setPublicCash] = useState<number>(32); // Lakh Cr
  const [demandDep, setDemandDep] = useState<number>(24); // Lakh Cr
  const [timeDep, setTimeDep] = useState<number>(164); // Lakh Cr
  const [postOfficeSav, setPostOfficeSav] = useState<number>(2); // Lakh Cr
  const [postOfficeTot, setPostOfficeTot] = useState<number>(5); // Lakh Cr

  // Credit Creation Simulator
  const [simCrr, setSimCrr] = useState<number>(5.0); // %
  const [simPrimaryDeposit, setSimPrimaryDeposit] = useState<number>(10000); // ₹

  // Inflation Simulator
  const [simDemandShift, setSimDemandShift] = useState<number>(0); // -30 to +30
  const [simSupplyCostShift, setSimSupplyCostShift] = useState<number>(0); // -30 to +30

  // RBI Policy Simulator
  const [policyRepoRate, setPolicyRepoRate] = useState<number>(6.5); // %
  const [policyCrr, setPolicyCrr] = useState<number>(4.5); // %
  const [simOilShock, setSimOilShock] = useState<number>(0); // 0 to 40%

  // Reflection responses state
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: ''
  });
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Challenge Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Canvas & Timers
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ON MOUNT ───
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

  // ─── CALCULATED DERIVATIVE AGGREGATES ───
  const calcM1 = useMemo(() => publicCash + demandDep + 0.9, [publicCash, demandDep]);
  const calcM2 = useMemo(() => calcM1 + postOfficeSav, [calcM1, postOfficeSav]);
  const calcM3 = useMemo(() => calcM1 + timeDep, [calcM1, timeDep]);
  const calcM4 = useMemo(() => calcM3 + postOfficeTot, [calcM3, postOfficeTot]);

  // Credit Creation Multiplier rounds
  const creditMultiplier = useMemo(() => (simCrr > 0 ? 100 / simCrr : 0), [simCrr]);
  const totalCreatedDeposits = useMemo(() => simPrimaryDeposit * creditMultiplier, [simPrimaryDeposit, creditMultiplier]);
  const totalCreditCreated = useMemo(() => Math.max(0, totalCreatedDeposits - simPrimaryDeposit), [totalCreatedDeposits, simPrimaryDeposit]);

  // Bank cascade rounds
  const cascadeRounds = useMemo(() => {
    const rounds = [];
    let currentDeposit = simPrimaryDeposit;
    const crrFrac = simCrr / 100;
    for (let i = 1; i <= 6; i++) {
      const reserve = currentDeposit * crrFrac;
      const loan = currentDeposit - reserve;
      rounds.push({
        round: `Bank ${String.fromCharCode(64 + i)}`,
        deposit: Math.round(currentDeposit),
        reserve: Math.round(reserve),
        loan: Math.round(loan)
      });
      currentDeposit = loan;
    }
    return rounds;
  }, [simPrimaryDeposit, simCrr]);

  // Inflation calculations
  const simCPI = useMemo(() => {
    const baseCPI = 5.0; // %
    const demandEffect = simDemandShift * 0.15;
    const costEffect = simSupplyCostShift * 0.18;
    return Math.max(0.5, +(baseCPI + demandEffect + costEffect).toFixed(2));
  }, [simDemandShift, simSupplyCostShift]);

  const simGDPGrowth = useMemo(() => {
    const baseGDP = 6.8; // %
    const demandEffect = simDemandShift * 0.08;
    const costPenalty = simSupplyCostShift * 0.12;
    return Math.max(1.0, +(baseGDP + demandEffect - costPenalty).toFixed(2));
  }, [simDemandShift, simSupplyCostShift]);

  // RBI Policy Outcome Calculation
  const rbiProjectedInflation = useMemo(() => {
    const neutralRepo = 6.5;
    const neutralCrr = 4.5;
    const repoImpact = (neutralRepo - policyRepoRate) * 0.8;
    const crrImpact = (neutralCrr - policyCrr) * 0.4;
    const shockImpact = simOilShock * 0.12;
    return +(4.5 + repoImpact + crrImpact + shockImpact).toFixed(2);
  }, [policyRepoRate, policyCrr, simOilShock]);

  // ─── 2D CANVAS ANIMATION (Credit Wave) ───
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

      const width = canvas.width;
      const height = canvas.height;

      // Draw subtle background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw animated liquidity wave
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin((x * 0.03) + (frame * 0.05)) * 12 * (simCrr / 5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Flowing currency pulses
      const pulseX = (frame * 3) % width;
      ctx.beginPath();
      ctx.arc(pulseX, height / 2 + Math.sin((pulseX * 0.03) + (frame * 0.05)) * 12 * (simCrr / 5), 5, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [simCrr]);

  // ─── CALLBACK HANDLERS ───
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
      speechManager.speak('Let us study the complete concept walkthrough.');
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Outstanding insight! You spotted the distinction between deposits and credit.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Economics Laboratories. Explore each concept hands-on.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You are now in Free Simulation Mode. Experiment with all variables.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge Phase initiated. Test your knowledge and earn mastery.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Now test your prediction on the interactive dashboard!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Accurate observation! The math confirms it.' : 'Take another close look at the data tables.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You completed the simulation with a mastery score of ${finalScore} percent.`);
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
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0.1);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Brilliant! That is mathematically and conceptually correct.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
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
        speechManager.speak('Let us examine the full step-by-step breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
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
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('tap');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === activeChallenge.sortItems?.length ? [...prev] : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  const handleInstrumentSelect = useCallback((itemKey: string) => {
    setSelectedInstrument(itemKey);
    audioManager.play('tap');
  }, []);

  const handleSliderCrr = useCallback((val: number) => {
    setSimCrr(val);
    audioManager.play('count');
  }, []);

  const handleSliderDeposit = useCallback((val: number) => {
    setSimPrimaryDeposit(val);
    audioManager.play('count');
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      
      {/* ─── SIMULATION HEADER ─── */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }} 
            className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-inner"
            aria-label="Economics simulation topic badge"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                ISC Class 12 Commerce
              </span>
              <span className="text-xs text-slate-400">Chapters 3-4 Macroeconomics</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs" role="tablist" aria-label="Simulation phase selection">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              role="tab"
              aria-selected={phase === p}
              aria-label={`Switch to ${p === 'discovery' ? 'Hook scenario' : p === 'explore' ? 'Interactive labs' : p === 'sandbox' ? 'Free sandbox' : 'Graded challenges'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase(p)}
              className={`px-3 py-1.5 rounded-xl font-bold capitalize transition-all ${
                phase === p 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {p === 'discovery' ? 'Hook' : p === 'explore' ? 'Labs' : p === 'sandbox' ? 'Sandbox' : 'Challenges'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
              Operational Briefing & Scenario Hook
            </div>
            <h2 className="text-2xl font-black text-white mb-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
            <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-900/60 text-xs text-indigo-200">
              📌 {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Discovery Challenge</span>
              <span className="text-xs text-slate-400">Zero-stakes curiosity check</span>
            </div>
            <h3 className="text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-2xl text-left text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-500'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect 
                    ? '✓ Correct! ₹10,000 Cr of primary cash turns into ₹2,00,000 Cr total deposits, yielding ₹1,90,000 Cr in created derivative credit loans.' 
                    : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Advance to Interactive Economics Laboratories"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 shrink-0"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION LABS (BRILLIANT.ORG LEARN-BY-DOING) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Lab Step Header & Progress */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Guided Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                aria-label="Go to previous lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold disabled:opacity-40"
              >
                ← Prev
              </motion.button>
              <motion.button
                aria-label="Go to next lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                disabled={currentSlide === EXPLORATION_STEPS.length - 1}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold disabled:opacity-40"
              >
                Next Lab →
              </motion.button>
            </div>
          </div>

          <p className="text-amber-400 text-sm font-medium bg-amber-950/20 p-3 rounded-xl border border-amber-800/40">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              {/* LAB 1: KINDS OF MONEY & LEGAL TENDER (SVG 1) */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'note500', name: '₹500 Note', category: 'Fiat Paper', legal: 'Unlimited Legal Tender', backing: 'RBI Act S.26 Decree' },
                      { id: 'coin5', name: '₹5 Coin', category: 'Metallic Token', legal: 'Limited Legal Tender', backing: 'Coinage Act 2011' },
                      { id: 'cheque', name: 'SBI Cheque', category: 'Fiduciary Credit', legal: 'Non-Legal Tender', backing: 'Bank Trust (Can Refuse)' },
                      { id: 'upi', name: 'UPI Transfer', category: 'Electronic Credit', legal: 'Fiduciary Medium', backing: 'Banking Intermediation' }
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        aria-label={`Select monetary instrument ${item.name}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleInstrumentSelect(item.id)}
                        className={`p-4 rounded-2xl text-left border transition-all ${
                          selectedInstrument === item.id 
                            ? 'bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-950 text-emerald-100' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-mono text-emerald-400 mb-1">{item.category}</div>
                        <div className="text-base font-bold text-white mb-2">{item.name}</div>
                        <div className="text-[11px] text-slate-400">{item.legal}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG Diagram 1: Selected Instrument Architecture */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row gap-6 items-center">
                    <svg viewBox="0 0 300 160" className="w-full md:w-64 h-36 shrink-0" role="img" aria-label="Diagram showing statutory structure of selected monetary instrument">
                      <rect x="10" y="10" width="280" height="140" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      {selectedInstrument === 'note500' && (
                        <g>
                          <rect x="25" y="25" width="250" height="110" rx="8" fill="#14532d" stroke="#22c55e" strokeWidth="2" />
                          <text x="150" y="65" textAnchor="middle" fill="#86efac" fontSize="20" fontWeight="bold">₹500</text>
                          <text x="150" y="85" textAnchor="middle" fill="#ffffff" fontSize="9">RESERVE BANK OF INDIA</text>
                          <text x="150" y="105" textAnchor="middle" fill="#cbd5e1" fontSize="8">Guaranteed by the Central Govt</text>
                        </g>
                      )}
                      {selectedInstrument === 'coin5' && (
                        <g>
                          <circle cx="150" cy="80" r="50" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
                          <circle cx="150" cy="80" r="42" fill="#1e293b" stroke="#cbd5e1" strokeDasharray="4 2" />
                          <text x="150" y="86" textAnchor="middle" fill="#f8fafc" fontSize="22" fontWeight="bold">₹5</text>
                          <text x="150" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8">INDIA — Token Coinage</text>
                        </g>
                      )}
                      {selectedInstrument === 'cheque' && (
                        <g>
                          <rect x="25" y="30" width="250" height="100" rx="6" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" />
                          <line x1="40" y1="60" x2="200" y2="60" stroke="#475569" strokeWidth="1.5" />
                          <line x1="40" y1="85" x2="260" y2="85" stroke="#475569" strokeWidth="1.5" />
                          <text x="40" y="55" fill="#93c5fd" fontSize="9">Pay To: Bearer / Specified Person</text>
                          <text x="210" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold">₹ 50,000</text>
                          <text x="40" y="112" fill="#64748b" fontSize="8">State Bank of India — Fiduciary</text>
                        </g>
                      )}
                      {selectedInstrument === 'upi' && (
                        <g>
                          <rect x="60" y="25" width="180" height="110" rx="14" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                          <circle cx="150" cy="65" r="22" fill="#581c87" />
                          <text x="150" y="70" textAnchor="middle" fill="#e9d5ff" fontSize="14" fontWeight="bold">UPI</text>
                          <text x="150" y="105" textAnchor="middle" fill="#cbd5e1" fontSize="9">Instant Bank-to-Bank Transfer</text>
                        </g>
                      )}
                    </svg>
                    <div className="text-xs space-y-2 text-slate-300">
                      <h4 className="text-sm font-bold text-white">
                        {selectedInstrument === 'note500' && '✓ ₹500 Fiat Banknote — Inconvertible State Legal Tender'}
                        {selectedInstrument === 'coin5' && '✓ ₹5 Token Metallic Coin — Limited Legal Tender'}
                        {selectedInstrument === 'cheque' && '✓ Bank Cheque — Fiduciary Credit Money (Trust Based)'}
                        {selectedInstrument === 'upi' && '✓ Electronic Credit Settlement (NEFT / RTGS / IMPS / UPI)'}
                      </h4>
                      <p>
                        {selectedInstrument === 'note500' && 'The ₹500 note has negligible intrinsic value. It commands purchasing power solely because Section 26 of the RBI Act 1934 decrees it legal tender. Creditors are legally bound to accept it for all debt settlement.'}
                        {selectedInstrument === 'coin5' && 'The metal in the ₹5 coin (ferritic stainless steel) is worth less than ₹5 (token money). Under the Coinage Act 2011, coins possess limited legal tender status up to statutory ceilings.'}
                        {selectedInstrument === 'cheque' && 'A cheque is NOT legal tender. A shopkeeper or creditor can legally refuse a cheque. It circulates purely on fiducia (trust) that the issuing bank has sufficient funds to honour it on presentation.'}
                        {selectedInstrument === 'upi' && 'Digital credit transfers process billions of transactions monthly in India. While dominant in transaction volume, they remain credit money resting on commercial bank deposits.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2: LIQUIDITY SPECTRUM (M0 TO M4) WITH TOPIC SVG 2 */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* Predict Then Check Hook */}
                  {!predictionMade ? (
                    <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-800 space-y-3">
                      <span className="text-xs uppercase font-bold text-indigo-400">Predict Before Interacting</span>
                      <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Predict: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-left text-xs text-slate-300 hover:border-indigo-500"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-800/40 text-xs text-emerald-300">
                      ✓ {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  {/* SVG Diagram 2: Money Aggregates Liquidity Pyramid */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-xs font-bold text-slate-400 mb-2">Monetary Aggregates Liquidity vs Broadness Hierarchy:</div>
                    <svg viewBox="0 0 540 150" className="w-full h-36" role="img" aria-label="SVG diagram displaying the hierarchical layers of Indian monetary aggregates from M1 Narrow to M4 Broad">
                      {/* Base M4 */}
                      <rect x="20" y="115" width="500" height="26" rx="6" fill="#78350f" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="270" y="132" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">M4 = M3 + Total Post Office Deposits (excl NSCs) [Broadest, Least Liquid]</text>

                      {/* M3 */}
                      <rect x="60" y="80" width="420" height="26" rx="6" fill="#581c87" fillOpacity="0.4" stroke="#a855f7" strokeWidth="1.5" />
                      <text x="270" y="97" textAnchor="middle" fill="#e9d5ff" fontSize="10" fontWeight="bold">M3 (Broad Money) = M1 + Bank Fixed Time Deposits (FDs)</text>

                      {/* M2 */}
                      <rect x="100" y="45" width="340" height="26" rx="6" fill="#1e3a8a" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1.5" />
                      <text x="270" y="62" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="bold">M2 = M1 + Post Office Savings Bank Deposits</text>

                      {/* M1 Top */}
                      <rect x="140" y="10" width="260" height="26" rx="6" fill="#064e3b" fillOpacity="0.6" stroke="#10b981" strokeWidth="2" />
                      <text x="270" y="27" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">M1 (Narrow Money) = Currency + DD [Highest Liquidity]</text>
                    </svg>
                  </div>

                  {/* Component Sliders */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Public Currency:</span>
                        <span className="font-mono text-emerald-400 font-bold">₹{publicCash} L Cr</span>
                      </div>
                      <input 
                        type="range" min={15} max={50} value={publicCash} 
                        aria-label="Public Currency slider"
                        aria-valuenow={publicCash}
                        onChange={(e) => setPublicCash(Number(e.target.value))} 
                        className="w-full accent-emerald-500" 
                      />
                    </div>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Demand Deposits (M1):</span>
                        <span className="font-mono text-blue-400 font-bold">₹{demandDep} L Cr</span>
                      </div>
                      <input 
                        type="range" min={10} max={60} value={demandDep} 
                        aria-label="Demand Deposits slider"
                        aria-valuenow={demandDep}
                        onChange={(e) => setDemandDep(Number(e.target.value))} 
                        className="w-full accent-blue-500" 
                      />
                    </div>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Bank Time Deposits (FDs):</span>
                        <span className="font-mono text-purple-400 font-bold">₹{timeDep} L Cr</span>
                      </div>
                      <input 
                        type="range" min={100} max={250} value={timeDep} 
                        aria-label="Bank Time Deposits slider"
                        aria-valuenow={timeDep}
                        onChange={(e) => setTimeDep(Number(e.target.value))} 
                        className="w-full accent-purple-500" 
                      />
                    </div>
                  </div>

                  {/* Aggregate Hierarchy Output Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60">
                      <div className="text-xs text-emerald-400 font-bold">M1 (Narrow Money)</div>
                      <div className="text-xl font-black text-white mt-1">₹{calcM1.toFixed(1)} L Cr</div>
                      <div className="text-[11px] text-slate-400 mt-1">Most Liquid (Cash + Demand)</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/60">
                      <div className="text-xs text-blue-400 font-bold">M2 Aggregate</div>
                      <div className="text-xl font-black text-white mt-1">₹{calcM2.toFixed(1)} L Cr</div>
                      <div className="text-[11px] text-slate-400 mt-1">M1 + Post Office Savings</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/60">
                      <div className="text-xs text-purple-400 font-bold">M3 (Broad Money)</div>
                      <div className="text-xl font-black text-white mt-1">₹{calcM3.toFixed(1)} L Cr</div>
                      <div className="text-[11px] text-slate-400 mt-1">M1 + Bank Time Deposits</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/60">
                      <div className="text-xs text-amber-400 font-bold">M4 Aggregate</div>
                      <div className="text-xl font-black text-white mt-1">₹{calcM4.toFixed(1)} L Cr</div>
                      <div className="text-[11px] text-slate-400 mt-1">M3 + Total Postal (excl. NSC)</div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: BANKING CREDIT CREATION ENGINE WITH TOPIC SVG 3 */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {/* SVG Diagram 3: Multiplier Lending Cascade Flowchart */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-xs font-bold text-slate-400 mb-2">Credit Creation Multiplier Flow Mechanics:</div>
                    <svg viewBox="0 0 540 130" className="w-full h-32" role="img" aria-label="SVG Flowchart showing Primary Cash Deposit flowing to Reserve Requirement and Derivative Loan to Bank B">
                      {/* Step 1: Initial Deposit */}
                      <rect x="10" y="30" width="120" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="70" y="55" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">Primary Deposit</text>
                      <text x="70" y="75" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">₹{simPrimaryDeposit.toLocaleString()}</text>

                      {/* Arrow to Bank A split */}
                      <path d="M 130 65 L 170 65" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

                      {/* Reserve Box */}
                      <rect x="175" y="10" width="130" height="48" rx="6" fill="#78350f" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="240" y="28" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="bold">CRR Reserve ({simCrr}%)</text>
                      <text x="240" y="46" textAnchor="middle" fill="#ffffff" fontSize="10">₹{Math.round(simPrimaryDeposit * (simCrr/100)).toLocaleString()}</text>

                      {/* Loan Box */}
                      <rect x="175" y="68" width="130" height="52" rx="6" fill="#064e3b" fillOpacity="0.4" stroke="#10b981" strokeWidth="1.5" />
                      <text x="240" y="86" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">Derivative Loan Extended</text>
                      <text x="240" y="106" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">₹{Math.round(simPrimaryDeposit * (1 - simCrr/100)).toLocaleString()}</text>

                      {/* Arrow to Bank B */}
                      <path d="M 305 95 L 350 95" stroke="#10b981" strokeWidth="2" />

                      {/* Bank B Next Round */}
                      <rect x="355" y="45" width="165" height="60" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                      <text x="437" y="68" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">Bank B Derivative Deposit</text>
                      <text x="437" y="88" textAnchor="middle" fill="#e0e7ff" fontSize="9">Re-lends {(100 - simCrr)}% consecutively</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Cash Reserve Ratio (CRR):</span>
                        <span className="font-mono text-emerald-400 font-bold">{simCrr}%</span>
                      </div>
                      <input 
                        type="range" min={2.5} max={15} step={0.5} value={simCrr} 
                        aria-label="Cash Reserve Ratio CRR percentage slider"
                        aria-valuenow={simCrr}
                        onChange={(e) => handleSliderCrr(Number(e.target.value))} 
                        className="w-full accent-emerald-500" 
                      />
                      <div className="text-[11px] text-slate-400">Credit Multiplier k = 1 / CRR = {creditMultiplier.toFixed(2)}x</div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Initial Primary Cash Deposit:</span>
                        <span className="font-mono text-blue-400 font-bold">₹{simPrimaryDeposit.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" min={2000} max={50000} step={1000} value={simPrimaryDeposit} 
                        aria-label="Initial Primary Cash Deposit slider"
                        aria-valuenow={simPrimaryDeposit}
                        onChange={(e) => handleSliderDeposit(Number(e.target.value))} 
                        className="w-full accent-blue-500" 
                      />
                      <div className="text-[11px] text-slate-400">Total Created Credit: ₹{Math.round(totalCreditCreated).toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Multi-Round Cascade Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="py-2 px-3">Round</th>
                          <th className="py-2 px-3">Deposit Received</th>
                          <th className="py-2 px-3 text-amber-400">Reserve Kept ({simCrr}%)</th>
                          <th className="py-2 px-3 text-emerald-400">Loan Extended</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 font-mono">
                        {cascadeRounds.map((r, i) => (
                          <tr key={i} className="hover:bg-slate-950/50">
                            <td className="py-2 px-3 font-sans font-semibold text-slate-300">{r.round}</td>
                            <td className="py-2 px-3 text-slate-200">₹{r.deposit.toLocaleString()}</td>
                            <td className="py-2 px-3 text-amber-400">₹{r.reserve.toLocaleString()}</td>
                            <td className="py-2 px-3 text-emerald-400">₹{r.loan.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Canvas liquidity wave indicator */}
                  <div className="space-y-1">
                    <div className="text-[11px] text-slate-400">Real-time Liquidity Velocity Wave:</div>
                    <canvas ref={canvasRef} width={500} height={40} className="w-full h-10 bg-slate-950 rounded-xl border border-slate-800" />
                  </div>
                </div>
              )}

              {/* LAB 4: INFLATION SIMULATOR (DEMAND-PULL VS COST-PUSH) WITH TOPIC SVG 4 */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  {/* SVG Diagram 4: AD-AS Macroeconomic Shifts */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-xs font-bold text-slate-400 mb-2">Aggregate Demand & Supply Equilibrium Shift:</div>
                    <svg viewBox="0 0 500 160" className="w-full h-40" role="img" aria-label="SVG Macroeconomic diagram showing Price Level vs Real Output with shifting Aggregate Demand and Aggregate Supply curves">
                      {/* Axes */}
                      <line x1="40" y1="130" x2="480" y2="130" stroke="#64748b" strokeWidth="1.5" />
                      <line x1="40" y1="130" x2="40" y2="20" stroke="#64748b" strokeWidth="1.5" />
                      <text x="470" y="145" fill="#94a3b8" fontSize="9">Real GDP (Y)</text>
                      <text x="45" y="25" fill="#94a3b8" fontSize="9">Price Level (P / CPI)</text>

                      {/* AS Curve */}
                      <path d={`M 70 120 Q 220 110 ${380 - simSupplyCostShift * 2} 40`} fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                      <text x={385 - simSupplyCostShift * 2} y="38" fill="#fda4af" fontSize="9" fontWeight="bold">AS (Supply)</text>

                      {/* AD Curve */}
                      <line x1="80" y1={40 - simDemandShift * 0.8} x2="420" y2={125 - simDemandShift * 0.8} stroke="#10b981" strokeWidth="2.5" />
                      <text x="425" y={130 - simDemandShift * 0.8} fill="#86efac" fontSize="9" fontWeight="bold">AD (Demand)</text>

                      {/* Equilibrium Dot */}
                      <circle cx={250 + simDemandShift * 1.5 - simSupplyCostShift * 1.5} cy={85 - simDemandShift * 0.8 - simSupplyCostShift * 0.8} r="5" fill="#facc15" />
                      <text x={260 + simDemandShift * 1.5 - simSupplyCostShift * 1.5} y={80 - simDemandShift * 0.8 - simSupplyCostShift * 0.8} fill="#fef08a" fontSize="10" fontWeight="bold">E (P: {simCPI}%, Y: {simGDPGrowth}%)</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Aggregate Demand Surge (C+I+G):</span>
                        <span className="font-mono text-emerald-400 font-bold">{simDemandShift > 0 ? `+${simDemandShift}%` : `${simDemandShift}%`}</span>
                      </div>
                      <input 
                        type="range" min={-20} max={30} value={simDemandShift} 
                        aria-label="Aggregate Demand Surge percentage slider"
                        aria-valuenow={simDemandShift}
                        onChange={(e) => setSimDemandShift(Number(e.target.value))} 
                        className="w-full accent-emerald-500" 
                      />
                      <div className="text-[11px] text-slate-400">Demand-Pull mechanism (excess demand at full employment)</div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Input Cost Shock (Crude Oil / Wages):</span>
                        <span className="font-mono text-rose-400 font-bold">+{simSupplyCostShift}%</span>
                      </div>
                      <input 
                        type="range" min={0} max={40} value={simSupplyCostShift} 
                        aria-label="Input Cost Shock percentage slider"
                        aria-valuenow={simSupplyCostShift}
                        onChange={(e) => setSimSupplyCostShift(Number(e.target.value))} 
                        className="w-full accent-rose-500" 
                      />
                      <div className="text-[11px] text-slate-400">Cost-Push mechanism (AS left shift → higher price + lower GDP)</div>
                    </div>
                  </div>

                  {/* Inflation & Output Gauges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={`p-5 rounded-2xl border ${simCPI > 6.0 ? 'bg-rose-950/40 border-rose-800' : 'bg-emerald-950/40 border-emerald-800'}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-300">Projected CPI Inflation:</span>
                        <span className={`text-xl font-black ${simCPI > 6.0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {simCPI > 6.0 ? '✗ ' : '✓ '}{simCPI}%
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-2">
                        {simCPI <= 3.0 ? 'Creeping inflation (benign growth lubrication)' :
                         simCPI <= 6.0 ? 'Walking inflation (inside RBI tolerance corridor)' :
                         'Running inflation — breaches statutory 6% tolerance band!'}
                      </div>
                    </div>

                    <div className={`p-5 rounded-2xl border ${simSupplyCostShift > 20 && simGDPGrowth < 5.0 ? 'bg-amber-950/40 border-amber-800' : 'bg-blue-950/40 border-blue-800'}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-300">Projected GDP Growth:</span>
                        <span className="text-xl font-black text-blue-400">✓ {simGDPGrowth}%</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-2">
                        {simSupplyCostShift > 20 && simGDPGrowth < 5.0 
                          ? '⚠️ Stagflation alert! High inflation coupled with economic slowdown.' 
                          : 'Healthy output trajectory.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: RBI MONETARY POLICY COMMAND DESK */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Policy Repo Rate:</span>
                        <span className="font-mono text-emerald-400 font-bold">{policyRepoRate}%</span>
                      </div>
                      <input 
                        type="range" min={4.0} max={9.0} step={0.25} value={policyRepoRate} 
                        aria-label="Policy Repo Rate slider"
                        aria-valuenow={policyRepoRate}
                        onChange={(e) => setPolicyRepoRate(Number(e.target.value))} 
                        className="w-full accent-emerald-500" 
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Reserve Ratio (CRR):</span>
                        <span className="font-mono text-blue-400 font-bold">{policyCrr}%</span>
                      </div>
                      <input 
                        type="range" min={3.0} max={8.0} step={0.25} value={policyCrr} 
                        aria-label="Reserve Ratio CRR slider"
                        aria-valuenow={policyCrr}
                        onChange={(e) => setPolicyCrr(Number(e.target.value))} 
                        className="w-full accent-blue-500" 
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Global Crude Price Shock:</span>
                        <span className="font-mono text-rose-400 font-bold">+{simOilShock}%</span>
                      </div>
                      <input 
                        type="range" min={0} max={40} value={simOilShock} 
                        aria-label="Global Crude Price Shock percentage slider"
                        aria-valuenow={simOilShock}
                        onChange={(e) => setSimOilShock(Number(e.target.value))} 
                        className="w-full accent-rose-500" 
                      />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-slate-400 font-bold">MPC Statutory Target Status (Section 45ZN):</div>
                      <div className="text-2xl font-black text-white mt-1">
                        Projected CPI: <span className={rbiProjectedInflation >= 2 && rbiProjectedInflation <= 6 ? 'text-emerald-400' : 'text-rose-400'}>
                          {rbiProjectedInflation >= 2 && rbiProjectedInflation <= 6 ? '✓ ' : '✗ '}{rbiProjectedInflation}%
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-right text-slate-400">
                      Target Corridor: <span className="text-emerald-400 font-bold">4.0% ± 2.0% (2% – 6%)</span>
                      <br />
                      {rbiProjectedInflation >= 2 && rbiProjectedInflation <= 6 ? '✓ Within Tolerance Band' : '✗ Statutory Breach Report Required!'}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-end pt-4">
            <motion.button
              aria-label="Open Full Interactive Sandbox"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToSandbox}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/40"
            >
              Open Full Interactive Sandbox →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white">Full Monetary Architecture Sandbox</h2>
              <p className="text-xs text-slate-400">Manipulate all macroeconomic levers simultaneously without grading pressure.</p>
            </div>
            <motion.button
              aria-label="Proceed to graded challenge questions"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/40"
            >
              Ready for Graded Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400">1. Money Multiplier Engine</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">CRR: {simCrr}%</span>
                  <span className="text-emerald-400 font-mono font-bold">k = {creditMultiplier.toFixed(1)}x</span>
                </div>
                <input 
                  type="range" min={3} max={12} step={0.5} value={simCrr} 
                  aria-label="Sandbox CRR slider"
                  aria-valuenow={simCrr}
                  onChange={(e) => setSimCrr(Number(e.target.value))} 
                  className="w-full accent-emerald-500" 
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1">
                <div className="text-slate-400">Primary Cash: ₹{simPrimaryDeposit.toLocaleString()}</div>
                <div className="text-white font-bold">Total Created Credit: ₹{Math.round(totalCreditCreated).toLocaleString()}</div>
              </div>
            </div>

            <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-blue-400">2. Liquidity Hierarchy</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Time Deposits (FD):</span>
                  <span className="text-blue-400 font-mono font-bold">₹{timeDep} L Cr</span>
                </div>
                <input 
                  type="range" min={100} max={250} value={timeDep} 
                  aria-label="Sandbox Time deposits slider"
                  aria-valuenow={timeDep}
                  onChange={(e) => setTimeDep(Number(e.target.value))} 
                  className="w-full accent-blue-500" 
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1">
                <div className="text-emerald-400 font-bold">M1: ₹{calcM1.toFixed(1)} L Cr</div>
                <div className="text-purple-400 font-bold">M3 (Broad): ₹{calcM3.toFixed(1)} L Cr</div>
              </div>
            </div>

            <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-400">3. Policy Repo vs Inflation</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Repo Rate: {policyRepoRate}%</span>
                  <span className="text-rose-400 font-mono font-bold">CPI: {rbiProjectedInflation}%</span>
                </div>
                <input 
                  type="range" min={4} max={9} step={0.25} value={policyRepoRate} 
                  aria-label="Sandbox Policy Repo Rate slider"
                  aria-valuenow={policyRepoRate}
                  onChange={(e) => setPolicyRepoRate(Number(e.target.value))} 
                  className="w-full accent-rose-500" 
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1">
                <div className="text-slate-400">
                  Status: {rbiProjectedInflation <= 6 ? '✓ Within 4% ± 2% Target' : '✗ Breaches Upper Limit!'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Difficulty & Progress Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-slate-400 font-medium">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                    difficulty === 'standard' ? 'bg-blue-950 text-blue-400 border-blue-800' :
                    'bg-purple-950 text-purple-400 border-purple-800'
                  }`}
                >
                  {difficulty} Tier
                </motion.span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  NEP: {activeChallenge.competencyLevel}
                </span>
              </div>
              <h2 className="text-base font-bold text-white leading-snug">{activeChallenge.question}</h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Mastery: {masteryLevel}</span>
            </div>
          </div>

          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800" role="progressbar" aria-valuenow={((currentChallenge + 1) / filteredChallenges.length) * 100} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* MCQ / DISTINGUISH / CLASSIFY */}
          {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
            <div className="grid grid-cols-1 gap-3">
              {activeChallenge.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={wrongShake ? { duration: 0.4 } : {}}
                  onClick={() => handleAnswer(i)}
                  disabled={showExplanation}
                  className={`p-4 rounded-2xl text-left text-sm border transition-all ${
                    wrongFlash
                      ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                      : showExplanation && i === activeChallenge.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                      : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-emerald-500/50 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {showExplanation && i === activeChallenge.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* DRAG LABEL CHALLENGE */}
          {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex flex-wrap gap-2">
                {activeChallenge.dragItems.map((item, i) => (
                  <motion.div
                    key={i}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Draggable item: ${item.label}`}
                    onDragStart={() => handleDragStart(item.label)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                  >
                    ⋮⋮ {item.label}
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                {[
                  { id: 'slot_m1', title: 'Layer 1: M1 (Narrow Money Core)' },
                  { id: 'slot_m2', title: 'Layer 2: M2 Component' },
                  { id: 'slot_m3', title: 'Layer 3: M3 (Broad Money Addition)' },
                  { id: 'slot_m4', title: 'Layer 4: M4 Total Postal Addition' }
                ].map((slot) => (
                  <div
                    key={slot.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop(slot.id)}
                    className="p-4 rounded-2xl bg-slate-950 border-2 border-dashed border-slate-700 min-h-[90px] flex flex-col justify-between"
                  >
                    <span className="text-slate-400 font-sans">{slot.title}:</span>
                    <div className="text-emerald-400 font-bold mt-2">
                      {droppedLabels[slot.id] ? `✓ ${droppedLabels[slot.id]}` : 'Drop matching component here...'}
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                aria-label="Validate aggregate hierarchy configuration"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(droppedLabels)}
                disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs disabled:opacity-40"
              >
                Validate Aggregate Hierarchy
              </motion.button>
            </div>
          )}

          {/* DRAG SORT CHALLENGE */}
          {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <div className="space-y-2">
                {(sortArrangement.length === activeChallenge.sortItems.length 
                  ? sortArrangement.map((idx) => activeChallenge.sortItems![idx]) 
                  : activeChallenge.sortItems
                ).map((item, i) => (
                  <motion.div
                    key={i}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Draggable sort item ${i + 1}: ${item}`}
                    onDragStart={() => setDraggedItem(String(i))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, i);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs flex items-center gap-3 cursor-grab"
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                aria-label="Check sequential order of fractional reserve steps"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSortSubmit}
                disabled={showExplanation}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                Check Sequential Order
              </motion.button>
            </div>
          )}

          {/* NUMERIC CHALLENGE */}
          {activeChallenge.type === 'numeric' && (
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  step="any"
                  aria-label="Numeric calculation answer input"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value..."
                  className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                />
                <span className="text-slate-400 text-sm font-bold">{activeChallenge.unit}</span>
                <motion.button
                  aria-label="Submit numeric calculation answer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs disabled:opacity-40"
                >
                  Submit Calculation
                </motion.button>
              </div>
            </div>
          )}

          {/* CONSTRUCT CHALLENGE */}
          {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <p className="text-xs text-slate-400">Click elements in logical order to assemble the transmission mechanism:</p>
              <div className="flex flex-wrap gap-2">
                {activeChallenge.availableParts.map((part, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Add part ${part} to transmission sequence`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setConstructParts(prev => [...prev, part])}
                    className="px-3 py-1.5 rounded-lg bg-indigo-900/60 border border-indigo-700 text-indigo-200 text-xs font-bold"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                {constructParts.map((p, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs flex items-center gap-1.5">
                    ✓ {p}
                    <button aria-label={`Remove part ${p}`} onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))} className="text-rose-400 text-[10px]">✕</button>
                  </span>
                ))}
                {constructParts.length === 0 && <span className="text-xs text-slate-500">Assembled transmission chain will appear here...</span>}
              </div>

              <motion.button
                aria-label="Validate monetary policy sequence"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(constructParts.join(' '))}
                disabled={showExplanation || constructParts.length === 0}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs disabled:opacity-40"
              >
                Validate Policy Chain
              </motion.button>
            </div>
          )}

          {/* PROGRESSIVE STEP-BY-STEP EXPLANATION */}
          {showExplanation && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-slate-900/90 rounded-3xl border border-amber-600/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step-by-Step Macro Analysis</span>
                <span className="text-xs text-slate-400">Step {revealedSteps + 1} of {activeChallenge.explanation.split('. ').length}</span>
              </div>

              <div className="space-y-2">
                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal next analysis step"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold"
                  >
                    Show Next Analytical Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Proceed to next challenge or final score"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/40"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Simulation 🎓' : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── 5. COMPLETION, REFLECTION & MASTERY SUMMARY PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-800 text-center space-y-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-3xl mx-auto flex items-center justify-center">
              🏆
            </motion.div>
            <h2 className="text-3xl font-black text-white">Monetary Simulation Complete!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have successfully completed the ISC Macroeconomics Money, Banking, Inflation and RBI Architecture Simulation.
            </p>
            <div className="flex justify-center gap-6 pt-2 font-mono">
              <div className="text-center">
                <div className="text-xs text-slate-400">Score</div>
                <div className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-400">Mastery Level</div>
                <div className="text-2xl font-black text-blue-400 capitalize">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* ─── MANDATORY REFLECTION SECTION ─── */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-indigo-800/60 space-y-5">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <span>💭</span>
              <span>Post-Simulation Conceptual Reflection</span>
            </div>
            <p className="text-xs text-slate-400">
              Consolidate your macroeconomic understanding by reflecting on these key takeaways:
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-amber-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  aria-label="Reflection response for most surprising thing learned"
                  rows={2}
                  value={reflectionResponses.surprising}
                  onChange={(e) => setReflectionResponses(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. How credit creation subtracts the initial deposit, or why M3 Broad Money doesn't change when shifting demand deposits to fixed deposits..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-emerald-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  aria-label="Reflection response for explaining to a friend"
                  rows={2}
                  value={reflectionResponses.explain}
                  onChange={(e) => setReflectionResponses(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. Commercial banks multiply money like a relay race where only a fraction is kept in vaults and the rest creates fresh loans..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-blue-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  aria-label="Reflection response for real life applications"
                  rows={2}
                  value={reflectionResponses.realLife}
                  onChange={(e) => setReflectionResponses(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. Understanding when RBI changes repo rates how my home loan EMI changes, or analyzing inflation trends in news headlines..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <motion.button
                aria-label="Save and submit your reflections"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setReflectionSaved(true);
                  audioManager.play('success');
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow"
              >
                {reflectionSaved ? '✓ Reflection Saved' : 'Submit Reflection'}
              </motion.button>
            </div>
          </div>

          {/* Personalized Performance Feedback */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs leading-relaxed text-slate-300">
            <span className="font-bold text-emerald-400 text-sm block mb-1">Pedagogical Evaluation:</span>
            {errors === 0
              ? '✓ PERFECT SCORE! Flawless conceptual command across legal tender, broad aggregates, credit creation cascades, cost-push vs demand-pull mechanisms, and RBI monetary policy.'
              : errors <= 3
              ? '✓ Excellent performance! You demonstrate solid proficiency across the monetary aggregates and banking multiplier mechanics. Review minor edge cases below for absolute mastery.'
              : '✓ Good foundational progress! Review the specific misconception profiles below to eliminate common board-exam confusions.'}
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 rounded-3xl bg-rose-950/30 border border-rose-900 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Review:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-400 font-bold">✗ Common Error: {m.misconception}</div>
                      <div className="text-emerald-400">✓ Precise Principle: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Timeline */}
          <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-800/60 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-amber-300">Spaced Repetition (SM-2 Algorithm):</span>
              <p className="text-slate-400 mt-0.5">
                Next adaptive review session scheduled in <span className="text-amber-300 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
              </p>
            </div>
            <span className="text-xl">📅</span>
          </div>

          {/* Real World Activity Capstone */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-400">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1 text-xs text-slate-300 font-mono">
              {REAL_WORLD_ACTIVITY.steps.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400">{idx + 1}.</span> {s}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── MODAL FEEDBACK UTILITIES ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Level Advanced!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}

    </div>
  );
}

export default C12_EconomicsMoneyMeaningKindsSim;
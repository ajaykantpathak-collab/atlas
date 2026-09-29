'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C10_ECONAPP_021 = 'c10_econapp_021';
const NODE_C10_ECONAPP_022 = 'c10_econapp_022';
const NODE_C10_ECONAPP_023 = 'c10_econapp_023';
const NODE_C10_ECONAPP_024 = 'c10_econapp_024';
const NODE_C10_ECONAPP_025 = 'c10_econapp_025';
const NODE_C10_ECONAPP_026 = 'c10_econapp_026';
const NODE_C10_ECONAPP_027 = 'c10_econapp_027';
const NODE_C10_ECONAPP_028 = 'c10_econapp_028';
const NODE_C10_ECONAPP_029 = 'c10_econapp_029';
const NODE_C10_ECONAPP_030 = 'c10_econapp_030';

const ALL_NODE_IDS = [
  NODE_C10_ECONAPP_021,
  NODE_C10_ECONAPP_022,
  NODE_C10_ECONAPP_023,
  NODE_C10_ECONAPP_024,
  NODE_C10_ECONAPP_025,
  NODE_C10_ECONAPP_026,
  NODE_C10_ECONAPP_027,
  NODE_C10_ECONAPP_028,
  NODE_C10_ECONAPP_029,
  NODE_C10_ECONAPP_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Managing the Sovereign Economic Machinery: RBI & Ministry Simulation',
  intro: 'The Indian economy is undergoing rapid shifts. Deposits are surging, the MPC is debating the Repo Rate to cool food inflation, and the Ministry of Finance is finalizing the Union Budget with new direct tax slabs and capex allocations for PSUs.',
  context: 'As the Chief Macroeconomic Strategist, you will manipulate fractional reserve lending, model recurring deposits, balance progressive taxation, deploy fiscal/monetary tools during shocks, and tame galloping inflation.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'If Aman deposits ₹10,000 in cash into SBI and the Cash Reserve Ratio (CRR) is 4.5%, what is the theoretical MAXIMUM total deposit money generated across the entire banking system?',
  options: [
    '₹450 — because banks must lock away 4.5% of the money',
    '₹10,450 — the initial deposit plus interest earned',
    '₹2,22,222 — because deposits multiply by 1 / CRR through repeated lending cycles',
    '₹10,000 — money cannot be created out of thin air without printing currency',
  ],
  correctIndex: 2,
  hintAfter: "Surprised? Commercial banks multiply purchasing power by creating derivative deposits! Let's explore how fractional reserve banking, monetary policies, and fiscal machinery work.",
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
  bloomLevel?: string;
}

// ─── 24 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (1-8)
  {
    id: 'ch_econ_001',
    nodeId: NODE_C10_ECONAPP_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is categorized as a SECONDARY Agency Function of a commercial bank in India?',
    options: [
      'Accepting Fixed Deposits at 7% p.a.',
      'Auto-debit of LIC insurance premiums & SIPs via ECS/NACH mandates',
      'Granting cash credit limits against hypothecated inventory',
      'Providing safe deposit locker facilities for family jewellery',
    ],
    correctIndex: 1,
    explanation: 'Agency functions are performed on behalf of the customer (e.g. paying utility bills, insurance premiums, collecting dividends). Locker facilities are general utility functions, while deposits and loans are primary functions.',
    hints: [
      'Distinguish between what the bank does for its specific customer as an agent versus general public services.',
      'Agency functions include ECS debits, dividend collection, and executor duties.',
      'Auto-debit of insurance premiums acts directly on the customer’s behalf as an agent.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_econ_002',
    nodeId: NODE_C10_ECONAPP_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why do Current Accounts offered by Indian commercial banks carry 0% interest rate by RBI regulation?',
    options: [
      'Because the RBI wants to discourage businesses from using banks',
      'Because they are high-velocity transactional accounts providing unlimited daily operations and overdraft facilities',
      'Because current accounts are not protected by DICGC deposit insurance',
      'Because only public sector banks like SBI are permitted to operate current accounts',
    ],
    correctIndex: 1,
    explanation: 'Current accounts are designed strictly for business liquidity and high-frequency transactions. In exchange for unlimited operations and overdraft support, banks offer 0% interest.',
    hints: [
      'Think about the administrative cost of unlimited daily transactions.',
      'Current accounts are meant for business trade velocity, not long-term savings.',
      'The zero interest rate balances the operational cost of unlimited withdrawals and liquidity provision.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_econ_003',
    nodeId: NODE_C10_ECONAPP_029,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Quoting a Maruti Suzuki Brezza at ₹8,50,000 versus an iPhone 15 at ₹79,900 illustrates which core function of money?',
    options: [
      'Store of Value (preserving purchasing power over time)',
      'Measure of Value / Unit of Account (providing a common denominator)',
      'Standard of Deferred Payment (settling long-term debt liabilities)',
      'Medium of Electronic Settlement (UPI payment rails)',
    ],
    correctIndex: 1,
    explanation: 'Measure of value (unit of account) allows all diverse commodities to be quoted and compared using a single common benchmark (the Indian Rupee), eliminating barter exchange ambiguity.',
    hints: [
      'Notice that this compares prices of different goods at a single instant in time.',
      'Store of value is about preserving wealth across time (saving for next year).',
      'When prices are tagged on goods in rupees, money serves as the Measure of Value.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_econ_004',
    nodeId: NODE_C10_ECONAPP_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When India’s annual Consumer Price Index (CPI) inflation rises at a modest rate of 2.5% p.a., it is classified as:',
    options: [
      'Creeping Inflation (< 3% p.a., benign and healthy for economic incentives)',
      'Walking Inflation (3% - 6% p.a., warning zone for the MPC)',
      'Running Inflation (7% - 10%+ p.a., rapidly eroding fixed incomes)',
      'Hyperinflation (> 1000% p.a., complete monetary collapse)',
    ],
    correctIndex: 0,
    explanation: 'Creeping inflation (<3%) is slow and predictable, acting as a healthy lubricant for producers without penalizing fixed-income savers or destabilizing macroeconomic expectations.',
    hints: [
      'Check the numerical thresholds for the 4 types of inflation.',
      'Rates below 3% encourage spending without destabilizing prices.',
      'Inflation under 3% is called Creeping Inflation.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_econ_005',
    nodeId: NODE_C10_ECONAPP_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is the definitive test of an INDIRECT tax like GST in India?',
    options: [
      'It is paid in cash directly to the Reserve Bank of India',
      'The legal incidence falls on the seller, but the actual economic burden is shifted to the consumer via price',
      'It is only levied on individuals earning more than ₹15 Lakhs per year',
      'The tax rate automatically falls to zero during economic recessions',
    ],
    correctIndex: 1,
    explanation: 'An indirect tax allows shifting of tax burden. The merchant or producer pays the tax to the exchequer but recovers it entirely from the final buyer embedded inside the retail price.',
    hints: [
      'The core distinction between direct and indirect tax is the concept of shifting.',
      'Who loses the money vs who physically deposits it with the tax authorities?',
      'Indirect taxes allow the seller to shift the burden onto the buyer through the invoice price.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_econ_006',
    nodeId: NODE_C10_ECONAPP_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who constitutes the Monetary Policy Committee (MPC) that determines India’s Repo Rate?',
    options: [
      'The Union Finance Minister alone after presenting the Union Budget',
      'A 6-member statutory committee (3 from RBI including Governor + 3 external experts appointed by Govt)',
      'The Chief Justice of India and the Chairman of SEBI',
      'The CEOs of the top 12 Public Sector Banks',
    ],
    correctIndex: 1,
    explanation: 'Under Section 45ZB of the amended RBI Act 1934, the MPC comprises 6 members: RBI Governor (Chair), Deputy Governor in charge of monetary policy, one RBI officer, and three independent experts appointed by the central government.',
    hints: [
      'The MPC is a collaborative institutional structure created in 2016.',
      'It consists of 6 voting members balancing RBI officials and external economists.',
      'The 6-member MPC sets the repo rate under flexible inflation targeting (4% ± 2%).',
    ],
  },
  {
    id: 'ch_econ_007',
    nodeId: NODE_C10_ECONAPP_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which constitutional mandate in Part IV (Directive Principles) justifies the State building rural roads (PMGSY) and ensuring food security (NFSA)?',
    options: [
      'Article 356 (President’s Rule during political instability)',
      'Articles 38 & 39 (Promoting welfare of people & equitable distribution of material resources)',
      'Article 21A (Fundamental right to travel abroad freely)',
      'Article 280 (Appointment of the Central Finance Commission)',
    ],
    correctIndex: 1,
    explanation: 'Articles 38 and 39 of the Indian Constitution mandate the State to secure a social order promoting welfare and ensure material resources are distributed to subserve the common good.',
    hints: [
      'Look for the Directive Principles dealing with public welfare and resource distribution.',
      'Articles 38, 39, and 41 define the socio-economic welfare role of the Indian State.',
      'Articles 38 & 39 mandate equitable growth and public provisioning.',
    ],
  },
  {
    id: 'ch_econ_008',
    nodeId: NODE_C10_ECONAPP_026,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the fundamental difference between Disinvestment and full Privatization of a PSU?',
    options: [
      'Disinvestment sells only minority shares while Govt retains majority control (>50%); Privatization transfers majority control to private hands',
      'Disinvestment applies only to foreign companies; Privatization applies to Indian companies',
      'Disinvestment is done by the RBI; Privatization is done by the Supreme Court',
      'There is no difference; both terms mean the complete shut down of a factory',
    ],
    correctIndex: 0,
    explanation: 'Disinvestment involves selling equity (like the LIC 3.5% IPO where Govt retained 96.5%), whereas Privatization transfers over 50% equity and full management control (like Air India sold 100% to Tatas).',
    hints: [
      'Check the ownership threshold: who retains >50% voting rights?',
      'Disinvestment dilutes a stake; privatization hands over the driver’s seat.',
      'Majority control retention separates disinvestment from privatization.',
    ],
  },

  // STANDARD TIER (9-16)
  {
    id: 'ch_econ_009',
    nodeId: NODE_C10_ECONAPP_022,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A primary cash deposit of ₹25,000 enters Canara Bank. If the RBI stipulates a CRR of 5.0%, calculate the theoretical TOTAL CREDIT CREATED (in ₹) across the banking system (Total Deposits − Initial Deposit).',
    correctAnswer: 475000,
    tolerance: 1000,
    unit: '₹',
    explanation: 'Multiplier k = 1 / 0.05 = 20. Total Deposits = ₹25,000 × 20 = ₹5,00,000. Total Credit Created = ₹5,00,000 − ₹25,000 = ₹4,75,000.',
    hints: [
      'First calculate the credit multiplier k = 1 / CRR.',
      'Multiply the initial deposit by 20 to get Total Deposits (₹5,00,000).',
      'Subtract the initial cash deposit: ₹5,00,000 − ₹25,000 = ₹4,75,000.',
    ],
  },
  {
    id: 'ch_econ_010',
    nodeId: NODE_C10_ECONAPP_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Sunita opens a 2-year (n = 24 months) Recurring Deposit of P = ₹2,000/month at an annual interest rate r = 6% p.a. Using the standard ICSE formula MV = P×n + P×[n(n+1)/2]×(r/100)×(1/12), calculate the TOTAL MATURITY VALUE (in ₹).',
    correctAnswer: 51000,
    tolerance: 50,
    unit: '₹',
    explanation: 'Principal = 2,000 × 24 = ₹48,000. Interest = 2,000 × [24 × 25 / 2] × (6 / 100) × (1 / 12) = 2,000 × 300 × 0.06 / 12 = ₹3,000. Total Maturity Value = 48,000 + 3,000 = ₹51,000.',
    hints: [
      'Calculate Principal: 24 × ₹2,000 = ₹48,000.',
      'Evaluate month-instalments: [24 × 25] / 2 = 300. Interest = ₹2,000 × 300 × 0.005 = ₹3,000.',
      'Add Principal + Interest: ₹48,000 + ₹3,000 = ₹51,000.',
    ],
  },
  {
    id: 'ch_econ_011',
    nodeId: NODE_C10_ECONAPP_027,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Drag each Indian tax policy mechanism to its correct legal category on the fiscal diagram.',
    dragItems: [
      { label: 'Income Tax (5%-30% Slabs)', targetId: 'box_direct_prog' },
      { label: 'Corporate Tax (Flat 22%)', targetId: 'box_direct_prop' },
      { label: 'GST on Packaged Biscuits (18%)', targetId: 'box_indirect_reg' },
      { label: 'Customs Duty on Gold (15%)', targetId: 'box_indirect_cust' },
    ],
    correctMapping: {
      box_direct_prog: 'Income Tax (5%-30% Slabs)',
      box_direct_prop: 'Corporate Tax (Flat 22%)',
      box_indirect_reg: 'GST on Packaged Biscuits (18%)',
      box_indirect_cust: 'Customs Duty on Gold (15%)',
    },
    explanation: 'Income tax is direct and progressive. Corporate tax is direct and flat/proportional. GST is indirect and regressive with respect to income. Customs duty is indirect border tax.',
    hints: [
      'Direct taxes fall on income/profit (cannot be shifted).',
      'Progressive rates increase with income; flat rates remain proportional.',
      'GST is collected at sale and shifts the burden to the consumer.',
    ],
  },
  {
    id: 'ch_econ_012',
    nodeId: NODE_C10_ECONAPP_025,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of monetary transmission when the RBI MPC hikes the Repo Rate from 6.00% to 6.50% to tame inflation.',
    sortItems: [
      'RBI MPC increases the policy Repo Rate by 50 basis points',
      'Commercial banks face higher borrowing costs and increase their lending rates (EBLR)',
      'Consumer loans and business credit demand slow down due to costlier EMIs',
      'Aggregate demand in the economy cools, decelerating CPI inflation toward 4%',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The transmission chain: Policy Repo hike → Bank lending rates rise → Borrowing & investment demand cools → Aggregate spending drops → Inflation stabilizes toward target.',
    hints: [
      'Start with the MPC rate decision in Mumbai.',
      'Banks immediately adjust their External Benchmark Lending Rates (EBLR).',
      'Higher interest rates depress borrowing, eventually cooling inflation.',
    ],
  },
  {
    id: 'ch_econ_013',
    nodeId: NODE_C10_ECONAPP_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If the All-India Consumer Price Index (CPI) basket rose from 160 in base period to 176 in current period, calculate the INFLATION RATE (in %).',
    correctAnswer: 10,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Inflation Rate = [(CPI_current − CPI_base) / CPI_base] × 100 = [(176 − 160) / 160] × 100 = (16 / 160) × 100 = 10.0% (Running Inflation).',
    hints: [
      'Use formula: ((Current − Base) / Base) × 100.',
      '176 − 160 = 16.',
      '16 divided by 160 = 0.10, which equals 10%.',
    ],
  },
  {
    id: 'ch_econ_014',
    nodeId: NODE_C10_ECONAPP_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why does a 5-mark ICSE exam answer lose marks if it defines the role of commercial banks ONLY as "accepting deposits and giving loans"?',
    options: [
      'Because commercial banks are not allowed to lend without President’s approval',
      'Because the comprehensive role also includes secondary Agency functions (NACH/SIPs/Executors), General Utility functions (lockers/forex/letters of credit), capital formation, and PMJDY inclusion',
      'Because modern commercial banks have stopped accepting savings deposits altogether',
      'Because commercial banks are exclusively regulatory authorities like SEBI and CCI',
    ],
    correctIndex: 1,
    explanation: 'Primary functions (deposits/advances) account for only part of a bank’s economic role. Full marks require articulating Agency functions, General Utility services, credit multiplication, and financial inclusion.',
    hints: [
      'Look at the comprehensive syllabus classification of bank functions.',
      'Remember lockers, foreign exchange, utility bill payments, and SHG financing.',
      'Commercial banks provide both primary and broad secondary services.',
    ],
  },
  {
    id: 'ch_econ_015',
    nodeId: NODE_C10_ECONAPP_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Under the New Public Sector Enterprise Policy (2021), why did the Government privatize Air India (non-strategic) but retain and revive BSNL (strategic)?',
    options: [
      'Because Air India was making huge profits while BSNL had zero employees',
      'Because telecom is a strategic lifeline ensuring universal rural & border connectivity where private telcos under-invest, whereas civil aviation is non-strategic and competitive',
      'Because the Tatas refused to purchase any telecom shares',
      'Because the Supreme Court banned the sale of any telecommunication assets',
    ],
    correctIndex: 1,
    explanation: 'Strategic sectors (atomic energy, defence, space, transport, telecom, power, banking) retain at least one public enterprise to guarantee national security and universal access in backward areas.',
    hints: [
      'Consider the social objective of rural connectivity in remote border villages.',
      'Aviation has multiple private airlines, while strategic telecom needs a state fallback.',
      'BSNL serves rural and defence lines where private players find low commercial margins.',
    ],
  },
  {
    id: 'ch_econ_016',
    nodeId: NODE_C10_ECONAPP_027,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is an 18% GST on a ₹50 soap bar classified as REGRESSIVE with respect to income, despite charging the exact same ₹9 to a billionaire and a daily-wage worker?',
    options: [
      'Because the shopkeeper charges a higher percentage to the billionaire',
      'Because ₹9 tax represents 3% of a ₹300/day wage worker’s income, but only 0.009% of an affluent executive’s ₹1,00,000/day income',
      'Because GST is calculated using compound interest over time',
      'Because the tax rate on soap changes depending on the buyer’s Aadhaar card',
    ],
    correctIndex: 1,
    explanation: 'Regressivity is measured against the taxpayer’s income. A flat indirect tax consumes a far higher proportion of a low-income household’s earnings than an affluent individual’s earnings.',
    hints: [
      'Tax regressivity compares tax paid as a proportion of total income.',
      '₹9 out of ₹300 is 3%, whereas ₹9 out of ₹1,00,000 is 0.009%.',
      'Indirect consumption taxes impose a disproportionate relative burden on the poor.',
    ],
  },

  // ADVANCED TIER (17-24) — COMPETENCY HEAVY
  {
    id: 'ch_econ_017',
    nodeId: NODE_C10_ECONAPP_022,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Construct the equation showing why actual bank credit expansion during the 2016 Demonetization failed to hit its theoretical multiplier ceiling.',
    availableParts: [
      'Actual_Credit',
      '=',
      'Theoretical_Ceiling',
      '− SLR_Holdings',
      '− Excess_Cash_Leakage',
      '− Weak_Loan_Demand_&_NPAs',
      '+ Infinite_Money_Creation',
    ],
    targetState: 'Actual_Credit = Theoretical_Ceiling − SLR_Holdings − Excess_Cash_Leakage − Weak_Loan_Demand_&_NPAs',
    validationHint: 'Combine Actual_Credit with Theoretical_Ceiling and subtract the three real-world leakages (SLR, Cash Leakage, NPAs/Demand).',
    explanation: 'The theoretical credit multiplier assumes zero cash leakage, zero excess reserves, and full loan demand. In reality, mandatory SLR (18%), elevated NPAs, and weak credit appetite create substantial leakage.',
    hints: [
      'Actual credit equals theoretical multiplier ceiling minus the institutional leakages.',
      'Subtract mandatory SLR bond investments, cash withdrawals, and lack of loan appetite.',
      'Select the terms in exact mathematical balance.',
    ],
  },
  {
    id: 'ch_econ_018',
    nodeId: NODE_C10_ECONAPP_025,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In FY 2023-24, the Ministry of Finance budgeted ₹10 Lakh Crore for infrastructure Capex (expansionary fiscal), while the RBI MPC held Repo at 6.50% to curb CPI (contractionary monetary). What phenomenon occurs if excessive government market borrowing pushes bond yields up?',
    options: [
      'Liquidity Trap: No one wants to hold government securities',
      'Crowding-Out Effect: Heavy sovereign borrowing drives up market interest rates, dampening private corporate bond issuance and private investment',
      'Hyperinflation: The rupee completely ceases to function as a unit of account',
      'Bank Run: Depositors rush simultaneously to withdraw funds from SBI and HDFC',
    ],
    correctIndex: 1,
    explanation: 'Crowding-out occurs when large fiscal deficits require massive government bond sales, absorbing market liquidity and driving up yields, which makes private sector borrowing costlier and offsets monetary easing.',
    hints: [
      'Think about what happens when the government borrows huge sums from the same credit market.',
      'Sovereign borrowing competes with private business loans.',
      'This competition elevates market yields, "crowding out" private investors.',
    ],
  },
  {
    id: 'ch_econ_019',
    nodeId: NODE_C10_ECONAPP_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'If CPI inflation falls from 6.8% in Q1 to 4.2% in Q3 while prices continue to rise at a calmer pace, this macroeconomic state is defined as:',
    options: [
      'Deflation (general price level actually dropping into negative territory)',
      'Disinflation (a deceleration in the rate of inflation while prices still rise)',
      'Stagflation (zero growth accompanied by 20% running inflation)',
      'Reflation (artificial stimulus induced by currency devaluation)',
    ],
    correctIndex: 1,
    explanation: 'Disinflation is a reduction in the inflation rate (prices rising at 4.2% instead of 6.8%). Deflation means the price level actually falls (negative inflation rate).',
    hints: [
      'Are prices dropping below zero, or is the speed of price increase simply slowing down?',
      'Prices are still increasing by 4.2% annually.',
      'A slowdown in positive inflation is termed Disinflation.',
    ],
  },
  {
    id: 'ch_econ_020',
    nodeId: NODE_C10_ECONAPP_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During the 2020 COVID-19 pandemic, MGNREGA person-days surged to 389 Crore. This demonstrated which structural economic role of the State?',
    options: [
      'The State as a Commercial Speculator',
      'The State as an Employer of Last Resort and Counter-Cyclical Automatic Stabilizer',
      'The State as a Monopoly Private Goods Manufacturer',
      'The State as an Unregulated Arbitrageur',
    ],
    correctIndex: 1,
    explanation: 'MGNREGA provides a legal guarantee of 100 days of manual wage employment per rural household, acting as an employer of last resort and automatic safety net when private rural hiring crashes.',
    hints: [
      'Consider the guarantee of work when private businesses shut down.',
      'The scheme acts counter-cyclically to absorb jobless workers.',
      'MGNREGA exemplifies the State’s role as Employer of Last Resort.',
    ],
  },
  {
    id: 'ch_econ_021',
    nodeId: NODE_C10_ECONAPP_027,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Under India’s new income tax slabs: 0% up to ₹3L; 5% on ₹3L-₹6L; 10% on ₹6L-₹9L; 15% on ₹9L-₹12L. Calculate the exact tax liability (in ₹) for an executive earning ₹11,00,000 before cess.',
    correctAnswer: 75000,
    tolerance: 100,
    unit: '₹',
    explanation: 'Slab 1 (0-3L): ₹0. Slab 2 (3-6L @ 5%): ₹15,000. Slab 3 (6-9L @ 10%): ₹30,000. Slab 4 (9-11L = 2L @ 15%): ₹30,000. Total Tax = 15,000 + 30,000 + 30,000 = ₹75,000.',
    hints: [
      'Calculate slab by slab: ₹3L to ₹6L = 5% of ₹3,00,000 = ₹15,000.',
      '₹6L to ₹9L = 10% of ₹3,00,000 = ₹30,000.',
      '₹9L to ₹11L = 15% of ₹2,00,000 = ₹30,000. Sum: ₹15,000 + ₹30,000 + ₹30,000 = ₹75,000.',
    ],
  },
  {
    id: 'ch_econ_022',
    nodeId: NODE_C10_ECONAPP_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A retail investor holds ₹3 Lakh in a Savings Account and ₹4 Lakh in a Recurring Deposit in the SAME commercial bank. If the bank undergoes insolvency, how much is insured under DICGC guidelines?',
    options: [
      '₹7,00,000 — both accounts are fully covered up to ₹5 Lakh each separately',
      '₹5,00,000 — DICGC limit applies to the aggregate of all deposits (principal + interest) per depositor per bank',
      '₹1,00,000 — DICGC only covers current accounts',
      '₹0 — private bank deposits have zero statutory insurance protection',
    ],
    correctIndex: 1,
    explanation: 'Under the DICGC Act 1961 (amended in 2020), deposit insurance protects up to a cumulative ceiling of ₹5 Lakh per depositor across all accounts held in that specific banking institution.',
    hints: [
      'The DICGC limit was raised from ₹1 Lakh to ₹5 Lakh in 2020.',
      'The limit applies to the combined total per individual per bank, not per account.',
      'Total held = ₹7 Lakh, but statutory payout is capped at ₹5,00,000.',
    ],
  },
  {
    id: 'ch_econ_023',
    nodeId: NODE_C10_ECONAPP_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Why did the sudden demonetization of ₹500/₹1000 notes in Nov 2016 trigger a rapid surge in UPI & digital wallets like Paytm across India?',
    options: [
      'Because physical notes failed in their medium-of-exchange role due to cash scarcity, prompting electronic deposit claims to assume the transactional function',
      'Because the Indian Rupee was officially replaced by the US Dollar',
      'Because UPI offered a guaranteed 20% interest rate on every transaction',
      'Because the Supreme Court banned all physical currency permanently',
    ],
    correctIndex: 0,
    explanation: 'Money is defined functionally by its general acceptability and medium-of-exchange efficiency. Scarcity of physical legal tender forced consumers to adopt digital deposit transfer rails.',
    hints: [
      'Recall that money is defined by what it does (medium of exchange), not physical paper.',
      'When physical paper notes became scarce, electronic ledger transfers filled the gap.',
      'Digital transfer rails provided the transactional medium of exchange.',
    ],
  },
  {
    id: 'ch_econ_024',
    nodeId: NODE_C10_ECONAPP_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What special corporate governance status is granted to apex PSUs like NTPC, ONGC, and Indian Oil Corporation to empower them with operational autonomy?',
    options: [
      'Special Economic Zone (SEZ) Franchise',
      'Maharatna Status (allowing board approval for large investments up to ₹5,000 Cr without prior cabinet clearance)',
      'NGO Charitable Trust Status',
      'Monopoly Price Fixing Exemption',
    ],
    correctIndex: 1,
    explanation: 'Maharatna status grants high-performing CPSEs massive financial and operational autonomy, allowing boards to invest up to 15% of net worth (up to ₹5,000 Cr) in capital projects without ministry bottlenecks.',
    hints: [
      'Look for the highest tier among Miniratna, Navratna, and Maharatna.',
      'Maharatna status empowers CPSEs to make swift commercial decisions.',
      'Maharatna PSUs have extensive autonomy for large capital investments.',
    ],
  },
  // ─── Class 10 board-depth additions: money-and-credit diagnostics ───
  {
    id: 'ch_depth_bank_barter_ramesh',
    nodeId: 'c10_eco_cbse_03_001',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Ramesh the carpenter wants to trade a table worth Rs 5,000 for a second-hand motorcycle worth Rs 25,000 in a barter world. What specific problems does he face, and how does money dissolve them?',
    options: [
      'Double coincidence of wants (he must find someone with a motorcycle who wants a table), no common measure of value (how many tables is a bike?), and indivisibility (he cannot cut the table into change); money as medium of exchange, unit of account and store of value removes all three at once',
      'Barter works smoothly; only taxes are a problem',
      'The only problem is transport; money changes nothing fundamental',
      'Money fails here because a motorcycle costs too much'
    ],
    correctIndex: 0,
    explanation:
      'This is the textbook "why money exists" chain: without double coincidence, no trade; without a unit of account, pricing chaos; without divisibility, small purchases die; without store of value, saving dies. Modern extension: modern currency is fiat -- authorised by the Reserve Bank of India on behalf of the nation, trusted because law and institutions stand behind paper.',
    hints: [
      'Who has a motorcycle AND wants a table? That search IS the problem.',
      'How many tables = one motorcycle? Pricing needs a unit.',
      'Match each money function to one barter headache.'
    ],
  },
  {
    id: 'ch_depth_bank_credit_barriers',
    nodeId: 'c10_eco_cbse_03_008',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare credit-access barriers for (i) a tenant farmer in Punjab leasing 2 hectares, (ii) a street vendor in Mumbai with daily earnings of Rs 800, and (iii) a salaried worker with a contract. Who gets a formal loan easily, and why?',
    options: [
      'The salaried worker gets formal credit easily (documented income = collateral substitute); the tenant farmer struggles -- no land title means no collateral, pushing him to the moneylender at 36%+ interest; the street vendor relies on chit funds/self-help groups because banks demand documents and fixed repayment schedules his daily cash flow cannot show',
      'All three borrow from banks on identical terms',
      'The street vendor gets the cheapest formal loan',
      'Collateral no longer matters in Indian lending'
    ],
    correctIndex: 0,
    explanation:
      'The chapter\'s core distinction: FORMAL sector (banks, cooperatives -- RBI-regulated, cheap) versus INFORMAL (moneylenders, traders -- flexible but costly). Collateral (land, property, deposits) is the gate: those without titles fall to the informal sector -- which is why SHG bank-linkage, MUDRA loans and the push for financial inclusion target exactly the vendor and tenant-farmer gaps.',
    hints: [
      'What does each borrower OFFER the bank as security?',
      'Cheap-and-rule-bound vs costly-and-flexible.',
      'Name the scheme that patches each gap.'
    ],
  }
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_ECONAPP_021,
  title: 'Macroeconomic Machinery: Commercial Banking, Fiscal & Monetary Statecraft',
  definition: 'A commercial bank is a financial intermediary that accepts deposits and creates credit under fractional reserve rules. The State steers growth and price stability through fiscal and monetary policy, public enterprises, and taxation.',
  eli5: 'Think of commercial banks as economic water pumps multiplying savings into loans, while the Government and RBI act as valves adjusting taxes, spending, and interest rates to keep prices stable and industry thriving.',
  misconceptions: [
    {
      misconception: 'Commercial banks only lend the exact physical cash they receive in deposits.',
      correction: 'Under fractional reserve banking, banks create derivative deposits. With a 4.5% CRR, ₹1,000 of cash can multiply up to ₹22,222 of total deposits.',
    },
    {
      misconception: 'The Finance Minister sets the Repo Rate in the Union Budget.',
      correction: 'The Repo Rate is set independently by the 6-member Monetary Policy Committee (MPC) of the RBI, not the Ministry of Finance.',
    },
    {
      misconception: 'GST is a proportional tax because everyone pays the same 18% rate on a soap.',
      correction: 'GST is regressive with respect to income because a flat ₹9 tax takes a far larger percentage of a daily-wager’s income than a billionaire’s.',
    },
    {
      misconception: 'Disinflation and Deflation mean the exact same thing.',
      correction: 'Disinflation is a slowing inflation rate (e.g., from 8% down to 4% — prices still rise). Deflation means negative inflation where prices actually fall.',
    },
    {
      misconception: 'Disinvestment means selling 100% of a PSU to a private company.',
      correction: 'Disinvestment involves selling a minority stake while the Government retains majority control (>50%). Selling majority control is Privatization.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the credit multiplier formula with Cash Reserve Ratio (CRR)?', options: ['k = CRR × 100', 'k = 1 / CRR', 'k = Initial Deposit − CRR', 'k = CRR / 2'], correctIndex: 1 },
    { question: 'Which account type earns ZERO interest by RBI regulation?', options: ['Savings Account', 'Recurring Deposit', 'Current Account', 'Fixed Deposit'], correctIndex: 2 },
    { question: 'What is the flexible inflation target assigned to the RBI MPC?', options: ['0% exact', '4% with a ±2% tolerance band (2% - 6%)', '10% constant', '8% minimum'], correctIndex: 1 },
    { question: 'Under the DICGC Act, what is the maximum deposit insurance limit per depositor per bank?', options: ['₹1 Lakh', '₹2 Lakh', '₹5 Lakh', '₹10 Lakh'], correctIndex: 2 },
    { question: 'Which of the following is a Direct Tax?', options: ['GST', 'Customs Duty', 'Personal Income Tax', 'Central Excise Cess'], correctIndex: 2 },
    { question: 'Which PSU was 100% privatized and acquired by the Tata Group in 2022?', options: ['BSNL', 'Air India', 'LIC', 'NTPC'], correctIndex: 1 },
    { question: 'What type of inflation is characterized by prices rising over 1000% annually?', options: ['Creeping', 'Walking', 'Running', 'Hyperinflation'], correctIndex: 3 },
    { question: 'Money used to quote all store prices in Indian Rupees performs which function?', options: ['Store of Value', 'Measure of Value', 'Standard of Deferred Payment', 'Credit Multiplier'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery of commercial banking functions, credit creation arithmetic, bank account structures, state intervention instruments, taxation principles, and inflation dynamics.',
};

// ─── BRILLIANT-STYLE INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Fractional Reserve & Credit Multiplier Lab',
    instruction: 'Adjust the Cash Reserve Ratio (CRR) slider and watch how bank deposits multiply across the economic lending chain.',
    interactionType: 'slider-crr',
    nodeId: NODE_C10_ECONAPP_022,
  },
  {
    title: '2. Bank Account Anatomy & RD Calculator',
    instruction: 'Configure monthly deposit amount and tenure to calculate the exact compound maturity value of a Recurring Deposit.',
    interactionType: 'slider-rd',
    nodeId: NODE_C10_ECONAPP_023,
  },
  {
    title: '3. Fiscal Policy & Direct Tax Slab Modeler',
    instruction: 'Move the taxable income slider to see how progressive income tax slabs extract higher effective rates from top earners.',
    interactionType: 'slider-tax',
    nodeId: NODE_C10_ECONAPP_027,
  },
  {
    title: '4. Monetary Policy & MPC Inflation Damper',
    instruction: 'Simulate an inflation shock and hike the Repo Rate to observe its cooling transmission onto bank lending and CPI.',
    interactionType: 'slider-repo',
    nodeId: NODE_C10_ECONAPP_028,
  },
  {
    title: '5. State Economic Roles & PSU Matrix',
    instruction: 'Click each core domain of State intervention to explore how public institutions maintain equilibrium.',
    interactionType: 'click-state-role',
    nodeId: NODE_C10_ECONAPP_024,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If the RBI cuts the CRR from 4.5% down to 3.0% during a liquidity crisis, what happens to the credit creation potential?',
    options: [
      'Credit creation collapses because banks have less security',
      'The multiplier expands from 22.2x to 33.3x, boosting lendable liquidity',
      'No change because commercial banks do not follow RBI rules',
      'Inflation drops to absolute zero immediately',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the CRR down to 3.0% in the interactive lab below to verify the multiplier expansion!',
  },
  {
    question: 'Prediction: If the MPC increases the Repo Rate by 100 bps, what will be the direct effect on home loan EMIs?',
    options: [
      'EMIs will immediately decrease to encourage home buyers',
      'EMIs will rise as commercial banks pass on higher EBLR funding costs',
      'Commercial banks will convert all home loans into zero-interest grants',
      'Tax rates will automatically double',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Repo Rate slider to +1.0% and watch the commercial bank lending gauge shift into the contraction zone.',
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the relationship between CRR and the Total Credit created?',
    observableOptions: [
      'They move in the exact same direction: higher CRR creates more credit',
      'They have an INVERSE hyperbolic relationship: lower CRR exponentially increases the credit multiplier',
      'CRR has zero mathematical impact on deposits',
      'Total deposits remain strictly equal to the initial primary deposit',
    ],
    correctIndex: 1,
  },
  {
    question: 'What pattern is visible in the Effective Tax Rate graph as annual income increases from ₹5 Lakh to ₹50 Lakh?',
    observableOptions: [
      'The effective tax percentage drops to zero for high earners',
      'The effective tax percentage steadily rises with income, confirming the progressive nature of direct income tax',
      'The tax rate remains a flat 5% across all income brackets',
      'Only low earners pay direct taxes',
    ],
    correctIndex: 1,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Be the Central Bank Governor & Finance Secretary',
  description: 'Select an Indian conglomerate or family household and construct an optimal banking and tax management plan. Balance their savings accounts for liquidity, recurring deposits for capital accumulation, and assess their GST vs income tax incidence.',
  steps: [
    'Analyze an individual with ₹12 Lakh annual income and calculate their direct income tax under the new regime.',
    'Formulate a 3-year RD plan for their child’s education fund at 6.5% p.a.',
    'Trace how a ₹1,00,000 corporate deposit in SBI creates secondary loans in the regional MSME cluster.',
    'Draft a 1-page MPC monetary briefing responding to a 7.2% food price inflation spike.',
  ],
};

// ─── MAIN COMPONENT ───
export function C10_EconApplicationsRoleCommercialBanksSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['econapp'] || { name: 'Economic Applications', emoji: '📈', color: 'indigo' };

  // ─── STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Hints & Progressive Disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Discovery & Predict State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Feedback Visuals
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Interactive Controls / Sliders
  const [crrValue, setCrrValue] = useState<number>(4.5);
  const [initialDeposit, setInitialDeposit] = useState<number>(10000);
  const [rdMonthlyDeposit, setRdMonthlyDeposit] = useState<number>(5000);
  const [rdTenureMonths, setRdTenureMonths] = useState<number>(60);
  const [rdInterestRate, setRdInterestRate] = useState<number>(6.5);
  const [taxableIncome, setTaxableIncome] = useState<number>(1200000);
  const [repoRate, setRepoRate] = useState<number>(6.5);
  const [cpiInflation, setCpiInflation] = useState<number>(6.8);
  const [selectedStateRole, setSelectedStateRole] = useState<string>('provider');

  // Multi-type challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  
  // Reflection response state
  const [reflections, setReflections] = useState<{ [key: string]: string }>({
    surprising: '',
    explain: '',
    reallife: '',
  });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED CALCULATIONS ───
  const creditMultiplier = useMemo(() => {
    return crrValue > 0 ? 1 / (crrValue / 100) : 0;
  }, [crrValue]);

  const totalBankDeposits = useMemo(() => {
    return initialDeposit * creditMultiplier;
  }, [initialDeposit, creditMultiplier]);

  const totalCreditCreated = useMemo(() => {
    return Math.max(0, totalBankDeposits - initialDeposit);
  }, [totalBankDeposits, initialDeposit]);

  const rdMaturityCalculation = useMemo(() => {
    const P = rdMonthlyDeposit;
    const n = rdTenureMonths;
    const r = rdInterestRate;
    const principal = P * n;
    const monthInstalments = (n * (n + 1)) / 2;
    const interest = P * monthInstalments * (r / 100) * (1 / 12);
    return {
      principal: Math.round(principal),
      interest: Math.round(interest),
      maturityValue: Math.round(principal + interest),
    };
  }, [rdMonthlyDeposit, rdTenureMonths, rdInterestRate]);

  const incomeTaxBreakdown = useMemo(() => {
    const inc = taxableIncome;
    if (inc <= 300000) return { tax: 0, effectiveRate: 0 };
    let tax = 0;
    if (inc > 300000) tax += Math.min(inc - 300000, 300000) * 0.05;
    if (inc > 600000) tax += Math.min(inc - 600000, 300000) * 0.10;
    if (inc > 900000) tax += Math.min(inc - 900000, 300000) * 0.15;
    if (inc > 1200000) tax += Math.min(inc - 1200000, 300000) * 0.20;
    if (inc > 1500000) tax += (inc - 1500000) * 0.30;
    if (inc <= 700000) tax = 0;
    const effectiveRate = inc > 0 ? (tax / inc) * 100 : 0;
    return { tax: Math.round(tax), effectiveRate: Number(effectiveRate.toFixed(2)) };
  }, [taxableIncome]);

  const inflationZone = useMemo(() => {
    if (cpiInflation < 3.0) return { label: 'Creeping Inflation', color: 'emerald', bg: 'bg-emerald-500/20 text-emerald-300' };
    if (cpiInflation <= 6.0) return { label: 'Walking Inflation (Target Band)', color: 'amber', bg: 'bg-amber-500/20 text-amber-300' };
    if (cpiInflation <= 10.0) return { label: 'Running Inflation (Breach)', color: 'rose', bg: 'bg-rose-500/20 text-rose-300' };
    return { label: 'Hyperinflation Risk', color: 'red', bg: 'bg-red-500/30 text-red-300' };
  }, [cpiInflation]);

  // Dynamic Chart Data
  const taxProgressionData = useMemo(() => {
    const data = [];
    for (let inc = 200000; inc <= 3000000; inc += 200000) {
      let t = 0;
      if (inc > 300000) t += Math.min(inc - 300000, 300000) * 0.05;
      if (inc > 600000) t += Math.min(inc - 600000, 300000) * 0.10;
      if (inc > 900000) t += Math.min(inc - 900000, 300000) * 0.15;
      if (inc > 1200000) t += Math.min(inc - 1200000, 300000) * 0.20;
      if (inc > 1500000) t += (inc - 1500000) * 0.30;
      if (inc <= 700000) t = 0;
      data.push({
        income: `₹${inc / 100000}L`,
        effectiveRate: Number(((t / inc) * 100).toFixed(1)),
        taxRupees: Math.round(t / 1000),
      });
    }
    return data;
  }, []);

  const creditChainData = useMemo(() => {
    let deposit = initialDeposit;
    const rounds = [];
    for (let round = 1; round <= 4; round++) {
      const reserve = deposit * (crrValue / 100);
      const loan = deposit - reserve;
      rounds.push({
        round: `Round ${round}`,
        deposit: Math.round(deposit),
        reserve: Math.round(reserve),
        loan: Math.round(loan),
      });
      deposit = loan;
    }
    return rounds;
  }, [initialDeposit, crrValue]);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeObj = filteredChallenges[currentChallenge] || CHALLENGES[0];

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

  // HTML5 Canvas animation loop with requestAnimationFrame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let tick = 0;

    const render = () => {
      tick += 0.035;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Draw background circuit grid
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, cy);
      ctx.lineTo(w - 20, cy);
      ctx.stroke();

      // Pulsing Central Reserve Vault Node
      const pulseSize = 14 + Math.sin(tick * 2) * 3;
      const gradient = ctx.createRadialGradient(cx, cy, 2, cx, cy, pulseSize + 15);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.9)');
      gradient.addColorStop(0.5, 'rgba(79, 70, 229, 0.35)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseSize + 15, 0, Math.PI * 2);
      ctx.fill();

      // Inner Core
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fill();

      // Animated multi-tier currency velocity particles
      const speedFactor = 1 + (15 - crrValue) * 0.1;
      for (let i = 0; i < 6; i++) {
        const offset = (i * Math.PI) / 3;
        const radiusX = 65;
        const radiusY = 28;
        const px = cx + Math.cos(tick * speedFactor + offset) * radiusX;
        const py = cy + Math.sin(tick * speedFactor + offset) * radiusY;

        ctx.fillStyle = i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#f59e0b' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Particle trail
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(
          cx + Math.cos(tick * speedFactor + offset - 0.2) * radiusX,
          cy + Math.sin(tick * speedFactor + offset - 0.2) * radiusY
        );
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [crrValue]);

  // Inactivity auto-timer cleanup
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Sync sort items when challenge changes
  useEffect(() => {
    if (currentChallengeObj.type === 'drag-sort' && currentChallengeObj.sortItems) {
      setSortArrangement(currentChallengeObj.sortItems.map((_, i) => i));
    }
  }, [currentChallengeObj]);

  // ─── CALLBACK HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 14000);
  }, [phase, answerRevealed, hintCount]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeObj.hints[nextLevel - 1]) {
      const hintText = currentChallengeObj.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, currentChallengeObj]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You understand fractional reserve expansion.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive Macroeconomic Laboratory. Manipulate variables to discover economic principles.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all fiscal and monetary controls without assessment pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenges initiated. Apply your economic mastery.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Move the slider to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation!' : 'Check the data curve again.');
  }, []);

  const handleCrrSliderChange = useCallback((val: number) => {
    setCrrValue(val);
    audioManager.play('count');
    if (predictionMade && !predictionVerified) {
      setPredictionVerified(true);
    }
  }, [predictionMade, predictionVerified]);

  const handleRepoSliderChange = useCallback((val: number) => {
    setRepoRate(val);
    const delta = (6.5 - val) * 0.4;
    setCpiInflation(Number(Math.max(1.8, 6.8 + delta).toFixed(2)));
    audioManager.play('balance');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation completed successfully. Review your performance breakdown and reflections.');
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

    if (currentChallengeObj.type === 'classify' || currentChallengeObj.type === 'distinguish' || currentChallengeObj.type === 'match') {
      isCorrect = answer === currentChallengeObj.correctIndex;
    } else if (currentChallengeObj.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctMapping);
    } else if (currentChallengeObj.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeObj.correctOrder);
    } else if (currentChallengeObj.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (currentChallengeObj.correctAnswer || 0)) <= (currentChallengeObj.tolerance || 0);
    } else if (currentChallengeObj.type === 'construct') {
      isCorrect = (answer as string).trim() === currentChallengeObj.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding analysis.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${currentChallengeObj.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${currentChallengeObj.nodeId}`, JSON.stringify(bktStateRef.current));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentChallengeObj.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentChallengeObj.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentChallengeObj.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the underlying economic principle.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
        const updatedSrs = sm2Update(srsItem, 1, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${currentChallengeObj.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [currentChallengeObj, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isMatch = currentChallengeObj.correctMapping?.[targetId] === draggedItem;
    if (isMatch) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, currentChallengeObj]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleSortSubmit = useCallback(() => {
    handleAnswer(sortArrangement);
  }, [sortArrangement, handleAnswer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ rotate: 15 }} className="w-12 h-12 rounded-2xl bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-2xl shadow-inner">
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-950/80 px-2.5 py-0.5 rounded-full border border-gold-800">
                ICSE Class 10 Commercial Applications
              </span>
              <span className="text-xs text-slate-400">Nodes 021 - 030</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Indicator Badges */}
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Stage:</span>
          <motion.span
            key={phase}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-gold-500/20 text-gold-300 uppercase tracking-wider"
          >
            {phase}
          </motion.span>
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`text-xs font-bold px-2.5 py-0.5 rounded-lg uppercase tracking-wider ${
                difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-800' :
                difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-300 border border-rose-800' : 'bg-gold-500/20 text-gold-300 border border-gold-800'
              }`}
            >
              {difficulty}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY (CURIOSITY HOOK) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg">
            <h2 className="text-lg font-bold text-gold-300 flex items-center gap-2">
              <span>🏛️</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-200/70 mt-2 font-mono bg-gold-950/80 p-2.5 rounded-lg border border-gold-900/50">
              {SCENARIO.context}
            </p>
          </div>

          {/* SVG DIAGRAM 1: Fractional Reserve Credit Multiplier Engine */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                System Schematic 1: Fractional Reserve Credit Expansion Engine
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Multiplier = 1 / CRR</span>
            </div>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 760 140" className="w-full h-auto max-h-36">
                <defs>
                  <linearGradient id="primaryFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="crrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#991b1b" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="derivGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.8" />
                  </linearGradient>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
                  </marker>
                </defs>

                {/* Step 1: Initial Deposit */}
                <rect x="10" y="25" width="150" height="90" rx="12" fill="url(#primaryFlowGrad)" stroke="#60a5fa" strokeWidth="1.5" />
                <text x="85" y="55" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">Primary Deposit</text>
                <text x="85" y="75" textAnchor="middle" fill="#dbeafe" fontSize="12 font-mono">₹10,000 Cash</text>
                <text x="85" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="10">High-Powered Base</text>

                {/* Arrow 1 */}
                <line x1="160" y1="70" x2="210" y2="70" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrow)" />

                {/* Step 2: Commercial Bank Node */}
                <rect x="210" y="15" width="160" height="110" rx="12" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="290" y="42" textAnchor="middle" fill="#c7d2fe" fontWeight="bold" fontSize="13">Commercial Bank</text>
                <rect x="225" y="52" width="130" height="26" rx="6" fill="url(#crrGrad)" />
                <text x="290" y="69" textAnchor="middle" fill="#fee2e2" fontSize="11" fontWeight="bold">CRR Lock: 4.5% (₹450)</text>
                <rect x="225" y="84" width="130" height="26" rx="6" fill="url(#derivGrad)" />
                <text x="290" y="101" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">Lendable: 95.5% (₹9,550)</text>

                {/* Arrow 2 */}
                <line x1="370" y1="70" x2="420" y2="70" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrow)" />

                {/* Step 3: Borrower & Market */}
                <rect x="420" y="25" width="150" height="90" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="495" y="55" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="13">Borrower Spending</text>
                <text x="495" y="75" textAnchor="middle" fill="#94a3b8" fontSize="11">Cheque / UPI to Vendor</text>
                <text x="495" y="95" textAnchor="middle" fill="#67e8f9" fontSize="10">Redeposited in Bank 2</text>

                {/* Arrow 3 */}
                <line x1="570" y1="70" x2="610" y2="70" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrow)" />

                {/* Step 4: Multiplier Total */}
                <rect x="610" y="20" width="140" height="100" rx="12" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="680" y="48" textAnchor="middle" fill="#a7f3d0" fontWeight="bold" fontSize="12">Total System Money</text>
                <text x="680" y="73" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="16">₹2,22,222</text>
                <text x="680" y="95" textAnchor="middle" fill="#6ee7b7" fontSize="10 font-mono">k = 22.2x Expansion</text>
              </svg>
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-800/40">
                Discovery Curiosity Hook
              </span>
              <span className="text-xs text-slate-500">Ungraded Intuition Check</span>
            </div>
            <p className="text-base font-semibold text-white leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Select discovery option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/40'
                        : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-850 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:border-gold-500'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-700/70 text-xs flex items-center justify-center font-bold text-slate-300 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                      <span className="ml-auto text-emerald-400 font-bold">✓</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! 1 / CRR creates a massive geometric series of deposits.' : `✗ Notice: ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Macroeconomic Labs"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-gold-600/30 shrink-0"
                >
                  Enter Macroeconomic Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                  Interactive Discovery Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h3>
              </div>
              <div className="flex gap-1.5">
                {EXPLORATION_STEPS.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Jump to lab ${idx + 1}`}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-8 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-gold-500 w-10' : 'bg-slate-700'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-amber-300/90 font-medium bg-amber-950/30 p-2.5 rounded-xl border border-amber-800/30">
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </p>
          </div>

          {/* ─── DYNAMIC LAB WORKSPACE ─── */}
          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl">
            {/* STEP 0: CREDIT CREATION MULTIPLIER LAB */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Canvas Velocity Pulse HUD */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-slate-400 uppercase mb-1">Money Velocity Pulse</span>
                    <canvas
                      ref={canvasRef}
                      width={180}
                      height={90}
                      className="rounded-lg border border-slate-800/80 bg-slate-900/50"
                      aria-label="Real-time currency velocity animation canvas"
                    />
                    <span className="text-[10px] text-gold-300 mt-1 font-mono">Interbank Lending Flow</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <label htmlFor="crr-slider" className="text-xs font-bold text-slate-400 uppercase">Cash Reserve Ratio (CRR)</label>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-gold-400">{crrValue}%</span>
                      <span className="text-xs text-slate-400 font-mono">k = {(100 / crrValue).toFixed(1)}x</span>
                    </div>
                    <input
                      id="crr-slider"
                      aria-label="Cash Reserve Ratio Slider"
                      type="range"
                      min={2}
                      max={20}
                      step={0.5}
                      value={crrValue}
                      onChange={e => handleCrrSliderChange(parseFloat(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-500">Statutory RBI Reserve lock on Net Demand & Time Liabilities</p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <label htmlFor="deposit-slider" className="text-xs font-bold text-slate-400 uppercase">Primary Cash Inflow</label>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-emerald-400">₹{initialDeposit.toLocaleString()}</span>
                    </div>
                    <input
                      id="deposit-slider"
                      aria-label="Primary Initial Deposit Slider"
                      type="range"
                      min={5000}
                      max={100000}
                      step={5000}
                      value={initialDeposit}
                      onChange={e => setInitialDeposit(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-500">Fresh cash brought into bank branch by depositors</p>
                  </div>

                  <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/50 space-y-2">
                    <label className="text-xs font-bold text-gold-300 uppercase">Theoretical Maximum Expansion</label>
                    <div className="text-2xl font-black text-white">₹{Math.round(totalBankDeposits).toLocaleString()}</div>
                    <div className="text-xs text-gold-300">Total Credit Created: <span className="font-bold text-emerald-400">₹{Math.round(totalCreditCreated).toLocaleString()}</span></div>
                    <p className="text-[11px] text-slate-400">Formula: Initial × (1 / CRR)</p>
                  </div>
                </div>

                {/* Visual Lending Multiplier Chain Bar Chart */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    First 4 Rounds of Fractional Reserve Lending (Derivative Deposit Expansion)
                  </h4>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={creditChainData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="round" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                        <Legend />
                        <Bar dataKey="deposit" name="Total Received" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="reserve" name="CRR Locked (RBI)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="loan" name="Derivative Loan Issued" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Predict-Then-Check Section */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                      Predict-Then-Verify
                    </span>
                    <span className="text-xs text-slate-400">{PREDICTION_QUESTIONS[0].question}</span>
                  </div>
                  {!predictionMade ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          aria-label={`Select prediction: ${opt}`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          className="text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-medium text-slate-200 border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-900 rounded-lg text-xs flex items-center justify-between">
                      <span className="text-amber-300">
                        {predictionIndex === PREDICTION_QUESTIONS[0].correctIndex ? '✓ Correct Prediction!' : 'Hypothesis Recorded.'} {PREDICTION_QUESTIONS[0].verifyInstruction}
                      </span>
                      <span className="text-emerald-400 font-bold font-mono">✓ Verified: k expands as CRR falls</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 1: RECURRING DEPOSIT & BANK ACCOUNTS */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <label htmlFor="rd-deposit-slider" className="text-xs font-bold text-slate-400 uppercase">Monthly Instalment (P)</label>
                    <div className="text-2xl font-black text-gold-400">₹{rdMonthlyDeposit.toLocaleString()}</div>
                    <input
                      id="rd-deposit-slider"
                      aria-label="RD Monthly Deposit Slider"
                      type="range"
                      min={1000}
                      max={25000}
                      step={500}
                      value={rdMonthlyDeposit}
                      onChange={e => setRdMonthlyDeposit(parseInt(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                    <p className="text-xs text-slate-500">Disciplined monthly commitment</p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <label htmlFor="rd-tenure-slider" className="text-xs font-bold text-slate-400 uppercase">Tenure (n Months)</label>
                    <div className="text-2xl font-black text-emerald-400">{rdTenureMonths} Months ({(rdTenureMonths / 12).toFixed(1)} Yrs)</div>
                    <input
                      id="rd-tenure-slider"
                      aria-label="RD Tenure Months Slider"
                      type="range"
                      min={12}
                      max={120}
                      step={12}
                      value={rdTenureMonths}
                      onChange={e => setRdTenureMonths(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <p className="text-xs text-slate-500">Sum of months: n(n+1)/2 = {(rdTenureMonths * (rdTenureMonths + 1)) / 2}</p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <label htmlFor="rd-interest-slider" className="text-xs font-bold text-slate-400 uppercase">Interest Rate (r % p.a.)</label>
                    <div className="text-2xl font-black text-amber-400">{rdInterestRate}%</div>
                    <input
                      id="rd-interest-slider"
                      aria-label="RD Interest Rate Slider"
                      type="range"
                      min={4.0}
                      max={9.0}
                      step={0.25}
                      value={rdInterestRate}
                      onChange={e => setRdInterestRate(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <p className="text-xs text-slate-500">Compounded quarterly benchmark</p>
                  </div>
                </div>

                {/* RD Maturity Value Breakdown */}
                <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-slate-900 rounded-lg">
                    <span className="text-xs text-slate-400">Total Principal Invested</span>
                    <div className="text-xl font-bold text-white mt-1">₹{rdMaturityCalculation.principal.toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg">
                    <span className="text-xs text-slate-400">Compound Interest Earned</span>
                    <div className="text-xl font-bold text-emerald-400 mt-1">+ ₹{rdMaturityCalculation.interest.toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-gold-950/60 border border-gold-800/80 rounded-lg">
                    <span className="text-xs text-gold-300 font-bold">Total Maturity Value</span>
                    <div className="text-2xl font-black text-gold-200 mt-1">₹{rdMaturityCalculation.maturityValue.toLocaleString()}</div>
                  </div>
                </div>

                {/* Account Comparison Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-bold text-gold-400">Savings Account</div>
                    <p className="text-slate-400">2.7% - 3.5% p.a. | High Liquidity | For households & students | PMJDY variants.</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-bold text-amber-400">Current Account</div>
                    <p className="text-slate-400">0% Interest by RBI | Unlimited daily transactions | Overdraft support | For traders & firms.</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-bold text-emerald-400">Recurring Deposit</div>
                    <p className="text-slate-400">6.0% - 7.5% p.a. | Fixed monthly discipline | Premature penalty | For salaried wealth creation.</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: TAXATION & PROGRESSIVE DIRECT TAXES */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                {/* SVG DIAGRAM 2: Progressive Direct Tax vs Regressive Indirect Tax Slabs */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      System Schematic 2: Direct Progressive Slabs vs Indirect GST Incidence
                    </span>
                    <span className="text-[11px] text-slate-400">Adam Smith's Canon of Equity</span>
                  </div>
                  <div className="w-full overflow-x-auto">
                    <svg viewBox="0 0 760 130" className="w-full h-auto max-h-32">
                      <rect x="10" y="10" width="360" height="110" rx="10" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="190" y="32" textAnchor="middle" fill="#818cf8" fontWeight="bold" fontSize="13">Direct Progressive Tax (Income Tax)</text>
                      
                      {/* Progressive Steps */}
                      <rect x="25" y="75" width="65" height="35" fill="#312e81" stroke="#6366f1" rx="4" />
                      <text x="57" y="96" textAnchor="middle" fill="#c7d2fe" fontSize="10">0-3L (0%)</text>
                      <rect x="95" y="65" width="65" height="45" fill="#3730a3" stroke="#6366f1" rx="4" />
                      <text x="127" y="90" textAnchor="middle" fill="#c7d2fe" fontSize="10">3-6L (5%)</text>
                      <rect x="165" y="55" width="65" height="55" fill="#4338ca" stroke="#6366f1" rx="4" />
                      <text x="197" y="85" textAnchor="middle" fill="#c7d2fe" fontSize="10">6-9L (10%)</text>
                      <rect x="235" y="45" width="65" height="65" fill="#4f46e5" stroke="#6366f1" rx="4" />
                      <text x="267" y="80" textAnchor="middle" fill="#c7d2fe" fontSize="10">9-12L (15%)</text>
                      <rect x="305" y="35" width="55" height="75" fill="#6366f1" stroke="#818cf8" rx="4" />
                      <text x="332" y="75" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">&gt;15L (30%)</text>

                      {/* Regressive Box */}
                      <rect x="390" y="10" width="360" height="110" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="570" y="32" textAnchor="middle" fill="#fbbf24" fontWeight="bold" fontSize="13">Indirect Regressive Tax (GST on Goods)</text>
                      <rect x="410" y="48" width="150" height="60" rx="8" fill="#451a03" stroke="#d97706" />
                      <text x="485" y="70" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold">Daily Wage Worker</text>
                      <text x="485" y="90" textAnchor="middle" fill="#fcd34d" fontSize="10 font-mono">₹9 GST = 3.00% of Wage</text>

                      <rect x="580" y="48" width="155" height="60" rx="8" fill="#1c1917" stroke="#78716c" />
                      <text x="657" y="70" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">Corporate CEO</text>
                      <text x="657" y="90" textAnchor="middle" fill="#cbd5e1" fontSize="10 font-mono">₹9 GST = 0.009% of Wage</text>
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 md:col-span-1">
                    <label htmlFor="tax-income-slider" className="text-xs font-bold text-slate-400 uppercase">Annual Taxable Income</label>
                    <div className="text-2xl font-black text-gold-400">₹{(taxableIncome / 100000).toFixed(1)} Lakhs</div>
                    <input
                      id="tax-income-slider"
                      aria-label="Annual Taxable Income Slider"
                      type="range"
                      min={300000}
                      max={3000000}
                      step={50000}
                      value={taxableIncome}
                      onChange={e => setTaxableIncome(parseInt(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                    <div className="p-3 bg-slate-900 rounded-lg space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Tax Payable:</span>
                        <span className="font-bold text-rose-400">₹{incomeTaxBreakdown.tax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Effective Tax Rate:</span>
                        <span className="font-bold text-amber-400">{incomeTaxBreakdown.effectiveRate}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Effective Rate Chart vs Income */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 md:col-span-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Progressivity Curve: Effective Tax Rate (%) vs Income
                    </h4>
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={taxProgressionData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="income" stroke="#64748b" fontSize={11} />
                          <YAxis stroke="#64748b" fontSize={11} unit="%" />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                          <Line type="monotone" dataKey="effectiveRate" name="Effective Tax %" stroke="#f59e0b" strokeWidth={3} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Observation Check */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase">Observation Check</span>
                  <p className="text-xs text-slate-300">{OBSERVATION_QUESTIONS[1].question}</p>
                  {!observationAnswered ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          aria-label={`Select observation: ${opt}`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className="text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-medium text-slate-200 border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2.5 bg-emerald-950/60 border border-emerald-800 rounded-lg text-xs text-emerald-300 font-semibold">
                      ✓ Confirmed: Direct income tax satisfies Adam Smith’s Canon of Equity by extracting higher effective percentages from higher earners.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: MONETARY POLICY & REPO INFLATION CONTROLLER */}
            {currentSlide === 3 && (
              <div className="space-y-6">
                {/* SVG DIAGRAM 3: Monetary Policy Transmission Mechanism */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                      System Schematic 3: RBI MPC Monetary Transmission Pipeline
                    </span>
                    <span className="text-[11px] text-slate-400">Target: 4.0% ± 2.0% CPI Band</span>
                  </div>
                  <div className="w-full overflow-x-auto">
                    <svg viewBox="0 0 760 120" className="w-full h-auto max-h-32">
                      <rect x="10" y="20" width="135" height="80" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                      <text x="77" y="48" textAnchor="middle" fill="#c7d2fe" fontWeight="bold" fontSize="12">RBI MPC</text>
                      <text x="77" y="68" textAnchor="middle" fill="#a5b4fc" fontSize="11 font-mono">Repo Rate ↑</text>
                      <text x="77" y="85" textAnchor="middle" fill="#6366f1" fontSize="9">Policy Rate Hike</text>

                      <line x1="145" y1="60" x2="195" y2="60" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow)" />

                      <rect x="195" y="20" width="145" height="80" rx="8" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.5" />
                      <text x="267" y="48" textAnchor="middle" fill="#93c5fd" fontWeight="bold" fontSize="12">Commercial Banks</text>
                      <text x="267" y="68" textAnchor="middle" fill="#60a5fa" fontSize="11 font-mono">EBLR & MCLR ↑</text>
                      <text x="267" y="85" textAnchor="middle" fill="#3b82f6" fontSize="9">Cost of Funds Rises</text>

                      <line x1="340" y1="60" x2="390" y2="60" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow)" />

                      <rect x="390" y="20" width="145" height="80" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="462" y="48" textAnchor="middle" fill="#fcd34d" fontWeight="bold" fontSize="12">Borrowers & Firms</text>
                      <text x="462" y="68" textAnchor="middle" fill="#fbbf24" fontSize="11">Home EMIs Rise</text>
                      <text x="462" y="85" textAnchor="middle" fill="#d97706" fontSize="9">Credit Demand Cools</text>

                      <line x1="535" y1="60" x2="585" y2="60" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow)" />

                      <rect x="585" y="20" width="165" height="80" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                      <text x="667" y="48" textAnchor="middle" fill="#a7f3d0" fontWeight="bold" fontSize="12">Aggregate Economy</text>
                      <text x="667" y="68" textAnchor="middle" fill="#6ee7b7" fontSize="11 font-mono">CPI Decelerates</text>
                      <text x="667" y="85" textAnchor="middle" fill="#34d399" fontSize="9">Target Equilibrium 4%</text>
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <label htmlFor="repo-slider" className="text-xs font-bold text-slate-400 uppercase">RBI MPC Policy Repo Rate</label>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black text-gold-400">{repoRate}%</span>
                      <span className="text-xs text-slate-400">Target Band: 4.0% ± 2.0%</span>
                    </div>
                    <input
                      id="repo-slider"
                      aria-label="RBI Repo Rate Slider"
                      type="range"
                      min={4.0}
                      max={8.5}
                      step={0.25}
                      value={repoRate}
                      onChange={e => handleRepoSliderChange(parseFloat(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                    <div className="text-xs text-slate-400 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                      Repo Rate is the rate at which the RBI lends short-term liquidity to commercial banks against G-Sec collateral.
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase">Resulting CPI Inflation Velocity</label>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black text-white">{cpiInflation}%</span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${inflationZone.bg}`}>
                        {inflationZone.label}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500"
                        animate={{ width: `${Math.min(100, (cpiInflation / 12) * 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-400">
                      Transmission: Repo hike → Banks raise lending rates (EBLR) → Home loan EMIs rise → Borrowing cools → CPI decelerates.
                    </p>
                  </div>
                </div>

                {/* Inflation Spectrum Reference */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/60 rounded-xl">
                    <div className="font-bold text-emerald-400">✓ Creeping</div>
                    <span className="text-slate-400">&lt; 3% p.a. (Benign)</span>
                  </div>
                  <div className="p-2.5 bg-amber-950/40 border border-amber-800/60 rounded-xl">
                    <div className="font-bold text-amber-400">✓ Walking</div>
                    <span className="text-slate-400">3% - 6% (Target Band)</span>
                  </div>
                  <div className="p-2.5 bg-rose-950/40 border border-rose-800/60 rounded-xl">
                    <div className="font-bold text-rose-400">✗ Running</div>
                    <span className="text-slate-400">7% - 10%+ (Dangerous)</span>
                  </div>
                  <div className="p-2.5 bg-red-950/40 border border-red-800/60 rounded-xl">
                    <div className="font-bold text-red-400">✗ Hyper</div>
                    <span className="text-slate-400">&gt; 1000% (Currency Crash)</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: STATE INTERVENTION & PSU PILLARS */}
            {currentSlide === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {[
                    { id: 'provider', label: '1. Provider', desc: 'Public Goods (PMGSY roads, defence, schools)' },
                    { id: 'regulator', label: '2. Regulator', desc: 'RBI (banks), SEBI (markets), CCI (competition)' },
                    { id: 'redistributor', label: '3. Redistributor', desc: 'Progressive Taxes, NFSA Food, PM Ujjwala LPG' },
                    { id: 'employer', label: '4. Employer', desc: 'MGNREGA 100-day statutory rural job guarantee' },
                    { id: 'planner', label: '5. Planner', desc: 'NITI Aayog & Union Budget Capital Allocations' },
                  ].map(role => (
                    <motion.button
                      key={role.id}
                      aria-label={`Select State Role: ${role.label}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSelectedStateRole(role.id);
                        audioManager.play('tap');
                      }}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        selectedStateRole === role.id
                          ? 'bg-gold-950 border-gold-500 shadow-lg shadow-gold-950/50'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-white text-xs">{role.label}</div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">{role.desc}</p>
                    </motion.button>
                  ))}
                </div>

                {/* PSU Case Detail Box */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                      Strategic vs Non-Strategic PSU Policy (2021 Landmark Reform)
                    </h4>
                    <span className="text-xs bg-slate-900 px-2 py-0.5 rounded text-slate-400 font-mono">DIPAM / MoF</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                      <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <span>🛡️</span> Strategic Sectors (Retain At Least 1 PSU)
                      </div>
                      <p className="text-slate-300">
                        Atomic energy, Space, Defence, Power (NTPC), Petroleum (IOCL, ONGC), Telecom (BSNL), Banking (SBI). Ensures national sovereignty and universal rural access.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
                      <div className="font-bold text-amber-400 flex items-center gap-1.5">
                        <span>✈️</span> Non-Strategic Sectors (Privatize / Disinvest)
                      </div>
                      <p className="text-slate-300">
                        Aviation (Air India sold 100% to Tatas), Hospitality, manufacturing. Eliminates drain of taxpayer equity into chronic loss-making commercial firms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Previous lab"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold rounded-xl border border-slate-700"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-500 font-mono">Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next lab"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Open free sandbox mode"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Open Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                Stress-Free Sandbox Mode
              </span>
              <h3 className="text-lg font-bold text-white mt-1">Multi-Variable Macroeconomic Cockpit</h3>
              <p className="text-xs text-slate-400">Manipulate all monetary, banking, and fiscal dials simultaneously with real-time feedback.</p>
            </div>
            <motion.button
              aria-label="Proceed to Assessed Challenges"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-gold-600/30 shrink-0"
            >
              Ready for Assessed Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Multiplier Dial */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-400 uppercase">1. Fractional Reserve Dial</span>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">CRR: {crrValue}%</span>
                <span className="text-gold-300 font-mono">Multiplier: {(100 / crrValue).toFixed(1)}x</span>
              </div>
              <input
                aria-label="Sandbox CRR Slider"
                type="range"
                min={2}
                max={15}
                step={0.5}
                value={crrValue}
                onChange={e => handleCrrSliderChange(parseFloat(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer"
              />
              <div className="p-3 bg-slate-950 rounded-lg text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Primary Cash:</span>
                  <span className="font-bold text-white">₹{initialDeposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Max System Credit:</span>
                  <span className="font-bold text-emerald-400">₹{Math.round(totalCreditCreated).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* MPC Repo Rate Dial */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase">2. MPC Monetary Dial</span>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Repo Rate: {repoRate}%</span>
                <span className={`font-bold ${cpiInflation > 6 ? 'text-rose-400' : 'text-emerald-400'}`}>CPI: {cpiInflation}%</span>
              </div>
              <input
                aria-label="Sandbox Repo Rate Slider"
                type="range"
                min={4.0}
                max={8.5}
                step={0.25}
                value={repoRate}
                onChange={e => handleRepoSliderChange(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="p-3 bg-slate-950 rounded-lg text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Commercial Lending (EBLR):</span>
                  <span className="font-bold text-white">{(repoRate + 2.65).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Macro State:</span>
                  <span className={`font-bold ${inflationZone.bg} px-1.5 py-0.2 rounded text-[10px]`}>
                    {inflationZone.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Income Tax Dial */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase">3. Fiscal Direct Tax Dial</span>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Income: ₹{(taxableIncome / 100000).toFixed(1)}L</span>
                <span className="text-emerald-300 font-mono">Rate: {incomeTaxBreakdown.effectiveRate}%</span>
              </div>
              <input
                aria-label="Sandbox Taxable Income Slider"
                type="range"
                min={400000}
                max={2500000}
                step={50000}
                value={taxableIncome}
                onChange={e => setTaxableIncome(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="p-3 bg-slate-950 rounded-lg text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Annual Tax:</span>
                  <span className="font-bold text-rose-400">₹{incomeTaxBreakdown.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Net Take-Home:</span>
                  <span className="font-bold text-emerald-300">₹{(taxableIncome - incomeTaxBreakdown.tax).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ASSESSED CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Top Progress & HUD Bar */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
                <span className="text-slate-500 font-mono">[{currentChallengeObj.id}]</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">Score: <strong className="text-emerald-400">{scoreBreakdown.correct}</strong> / {scoreBreakdown.total}</span>
                <span className="text-slate-400">Mastery: <strong className="text-gold-400 capitalize">{masteryLevel}</strong></span>
                <span className="text-xs uppercase px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  NEP: {currentChallengeObj.competencyLevel}
                </span>
              </div>
            </div>

            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-purple-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Interactive Challenge Card */}
          <motion.div
            key={currentChallengeObj.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all duration-300 shadow-xl ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-950/80 px-2.5 py-1 rounded-md border border-gold-800">
                Type: {currentChallengeObj.type}
              </span>
              {hintCount > 0 && (
                <span className="text-xs font-semibold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                  Hint Level {hintCount} / 3
                </span>
              )}
            </div>

            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {currentChallengeObj.question}
            </h3>

            {/* 1. MCQ VARIANT WITH MANDATORY SHAKE ANIMATION */}
            {(currentChallengeObj.type === 'classify' || currentChallengeObj.type === 'distinguish' || currentChallengeObj.type === 'match') && currentChallengeObj.options && (
              <div className="grid grid-cols-1 gap-2.5">
                {currentChallengeObj.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 border ${
                      showExplanation && i === currentChallengeObj.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/20 shadow-lg'
                        : 'bg-slate-850 hover:bg-slate-800 text-slate-200 border-slate-750 hover:border-gold-500'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-700/80 text-xs flex items-center justify-center font-bold text-slate-300 shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {showExplanation && (
                        <span className="font-bold text-sm shrink-0">
                          {i === currentChallengeObj.correctIndex ? '✓ Correct' : '✗'}
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. NUMERIC VARIANT */}
            {currentChallengeObj.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    aria-label="Enter numerical answer"
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer..."
                    disabled={showExplanation}
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-gold-500 outline-none w-64"
                  />
                  <span className="text-slate-400 font-bold text-sm">{currentChallengeObj.unit}</span>
                  <motion.button
                    aria-label="Validate numeric calculation"
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-gold-600/30"
                  >
                    Validate Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* 3. DRAG-LABEL VARIANT */}
            {currentChallengeObj.type === 'drag-label' && currentChallengeObj.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 self-center mr-2">Tax Tokens:</span>
                  {currentChallengeObj.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      aria-label={`Draggable token: ${item.label}`}
                      tabIndex={0}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-lg cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'box_direct_prog', title: 'Direct & Progressive (Higher % on Rich)' },
                    { id: 'box_direct_prop', title: 'Direct & Proportional (Flat % on Profit)' },
                    { id: 'box_indirect_reg', title: 'Indirect & Regressive on Income (Embedded at Retail)' },
                    { id: 'box_indirect_cust', title: 'Indirect Border Duty (Import Safeguard)' },
                  ].map(box => (
                    <div
                      key={box.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(box.id)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 hover:border-gold-500 min-h-[90px] flex flex-col justify-between"
                    >
                      <span className="text-[11px] font-bold text-slate-400">{box.title}</span>
                      <div className="mt-2 text-xs font-bold text-emerald-400">
                        {droppedLabels[box.id] ? `✓ ${droppedLabels[box.id]}` : <span className="text-slate-600 italic">Drop token here</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Tax Mappings"
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-lg"
                >
                  Verify Tax Mappings
                </motion.button>
              </div>
            )}

            {/* 4. DRAG-SORT VARIANT */}
            {currentChallengeObj.type === 'drag-sort' && currentChallengeObj.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">Reorder stages into the chronological transmission sequence:</p>
                <div className="space-y-2">
                  {sortArrangement.map((itemIdx, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      aria-label={`Sort stage ${displayIdx + 1}: ${currentChallengeObj.sortItems![itemIdx]}`}
                      tabIndex={0}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-700 flex items-center justify-between text-xs text-slate-200 cursor-grab"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-gold-950 text-gold-400 font-bold flex items-center justify-center border border-gold-800">
                          {displayIdx + 1}
                        </span>
                        <span>{currentChallengeObj.sortItems![itemIdx]}</span>
                      </div>
                      <span className="text-slate-500 text-xs font-mono">☰ Drag</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  aria-label="Check sort sequence"
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-lg"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* 5. CONSTRUCT VARIANT */}
            {currentChallengeObj.type === 'construct' && currentChallengeObj.availableParts && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">{currentChallengeObj.validationHint}</p>
                <div className="flex flex-wrap gap-1.5 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {currentChallengeObj.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-950/80 hover:bg-gold-900 border border-gold-700/60 text-gold-200 text-xs font-bold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[80px] p-3 bg-slate-950 rounded-xl border border-slate-700 flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gold-600 text-white font-mono text-xs rounded-lg flex items-center gap-1.5">
                      {part}
                      <button aria-label={`Remove part ${part}`} onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} className="text-red-300 font-bold hover:text-white">×</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-600 text-xs italic">Click equation components above to build formula</span>}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    aria-label="Evaluate Formula"
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-lg"
                  >
                    Evaluate Formula
                  </motion.button>
                  <button aria-label="Clear formula parts" onClick={() => setConstructParts([])} className="px-3 py-2 text-xs text-slate-400 hover:text-white">Clear</button>
                </div>
              </div>
            )}

            {/* STEP-BY-STEP EXPLANATION WITH PROGRESSIVE DISCLOSURE */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-5 bg-gradient-to-br from-gold-950/80 to-slate-950 border border-gold-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gold-300 uppercase tracking-wider">Step-by-Step Economic Walkthrough:</span>
                  <span className="text-xs text-slate-400 font-mono">
                    Step {revealedSteps + 1} of {currentChallengeObj.explanation.split('. ').filter(s => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {currentChallengeObj.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-slate-200 leading-relaxed">
                      <strong className="text-gold-400">{i + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between pt-2 gap-3">
                  {revealedSteps < currentChallengeObj.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next step of explanation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold rounded-xl"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : <div />}

                  {revealedSteps >= currentChallengeObj.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Proceed to next challenge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 ml-auto"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION SCREEN ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-950 rounded-3xl border border-gold-700 text-center space-y-3 shadow-2xl">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Macroeconomic Mastery Achieved!</h2>
            <div className="flex justify-center items-center gap-4 pt-2">
              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Final Score</span>
                <div className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 4)}%</div>
              </div>
              <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Knowledge Tier</span>
                <div className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK SECTION BASED ON ERROR THRESHOLDS */}
          <div className="p-5 rounded-2xl border text-xs md:text-sm leading-relaxed font-semibold bg-slate-900 border-slate-700">
            {errors === 0 && (
              <div className="text-emerald-300">
                <span className="text-lg font-black text-emerald-400 block mb-1">✓ PERFECT SCORE!</span>
                You demonstrated flawless comprehension of fractional reserve credit multipliers, progressive direct tax curves, and RBI inflation damping!
              </div>
            )}
            {errors >= 1 && errors <= 3 && (
              <div className="text-emerald-300">
                <span className="text-lg font-black text-emerald-400 block mb-1">✓ Great work!</span>
                Strong analytical grasp across commercial banking and state intervention instruments. Review your misconception profile below to lock in a perfect 100%.
              </div>
            )}
            {errors >= 4 && errors <= 7 && (
              <div className="text-amber-300">
                <span className="text-lg font-black text-amber-400 block mb-1">✓ Good effort!</span>
                You navigated complex macroeconomic policy tradeoffs. Review the key misconceptions below, re-enter the sandbox, and cement your understanding!
              </div>
            )}
            {errors >= 8 && (
              <div className="text-rose-300">
                <span className="text-lg font-black text-rose-400 block mb-1">✗ Do not give up — You WILL get this!</span>
                Macroeconomic concepts take iteration. Review each principle in the interactive sandbox and try the challenges again!
              </div>
            )}
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-gold-800/60 space-y-4">
            <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider flex items-center gap-2">
              <span>💭</span> Post-Simulation Deep Reflection
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <label className="text-xs font-bold text-gold-300 block">1. What was the most surprising thing you learned?</label>
                <textarea
                  aria-label="Reflection on what was most surprising"
                  value={reflections.surprising}
                  onChange={e => setReflections({ ...reflections, surprising: e.target.value })}
                  placeholder="e.g., How banks create money out of initial deposits using fractional reserve ratios..."
                  className="w-full bg-slate-900 text-xs p-2.5 rounded-lg border border-slate-700 text-slate-200 outline-none focus:border-gold-500 resize-none h-16"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <label className="text-xs font-bold text-gold-300 block">2. How would you explain this to a friend?</label>
                <textarea
                  aria-label="Reflection on explaining this to a friend"
                  value={reflections.explain}
                  onChange={e => setReflections({ ...reflections, explain: e.target.value })}
                  placeholder="e.g., The RBI MPC uses the Repo Rate like a brake pedal to cool inflation..."
                  className="w-full bg-slate-900 text-xs p-2.5 rounded-lg border border-slate-700 text-slate-200 outline-none focus:border-gold-500 resize-none h-16"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <label className="text-xs font-bold text-gold-300 block">3. Where in real life might you use this?</label>
                <textarea
                  aria-label="Reflection on real life application"
                  value={reflections.reallife}
                  onChange={e => setReflections({ ...reflections, reallife: e.target.value })}
                  placeholder="e.g., Choosing between fixed and recurring deposits, understanding why home loan EMIs fluctuate..."
                  className="w-full bg-slate-900 text-xs p-2.5 rounded-lg border border-slate-700 text-slate-200 outline-none focus:border-gold-500 resize-none h-16"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Your Targeted Misconception Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/50 text-xs space-y-1">
                      <p className="font-bold text-rose-300">✗ {m.misconception}</p>
                      <p className="text-emerald-300">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800/60 text-xs flex items-center justify-between gap-4">
            <div>
              <span className="font-bold text-amber-300">SM-2 Spaced Repetition Adaptive Interval:</span>
              <p className="text-slate-300 mt-0.5">
                Next scheduled review in <strong className="text-amber-400">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '24 Hours'}</strong> to guarantee permanent recall.
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real World Application Arc */}
          <div className="p-5 bg-gold-950/40 rounded-2xl border border-gold-800/60 space-y-3">
            <h3 className="text-sm font-bold text-gold-300">💼 {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-gold-950 text-gold-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Assessment Benchmark Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_EconApplicationsRoleCommercialBanksSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from 'recharts';

// Node IDs as string literals
const NODE_C12_ACC_041 = 'c12_acc_041';
const NODE_C12_ACC_042 = 'c12_acc_042';
const NODE_C12_ACC_043 = 'c12_acc_043';
const NODE_C12_ACC_044 = 'c12_acc_044';
const NODE_C12_ACC_045 = 'c12_acc_045';
const NODE_C12_ACC_046 = 'c12_acc_046';
const NODE_C12_ACC_047 = 'c12_acc_047';
const NODE_C12_ACC_048 = 'c12_acc_048';
const NODE_C12_ACC_049 = 'c12_acc_049';
const NODE_C12_ACC_050 = 'c12_acc_050';

const ALL_NODE_IDS = [
  NODE_C12_ACC_041,
  NODE_C12_ACC_042,
  NODE_C12_ACC_043,
  NODE_C12_ACC_044,
  NODE_C12_ACC_045,
  NODE_C12_ACC_046,
  NODE_C12_ACC_047,
  NODE_C12_ACC_048,
  NODE_C12_ACC_049,
  NODE_C12_ACC_050,
];

// Narrative Scenario
const SCENARIO = {
  title: 'Audit of BlueChip Enterprises Ltd (FY23 vs FY24)',
  intro: 'You are appointed Senior Forensic Financial Analyst for an Indian conglomerate evaluating a ₹5,000 Crore acquisition. Management presents multi-year Balance Sheets, Statements of Profit & Loss, and Cash Flow Statements.',
  context: 'The board suspects revenue inflation, aggressive capitalization, and liquidity stress masked by net profits. You must analyze horizontal comparative statements, vertical common-size breakdowns, and AS-3 cash flow statements to uncover the financial truth.',
};

// Discovery Question (Curiosity Hook)
const DISCOVERY_QUESTION = {
  question: 'BlueChip Enterprises reports a spectacular ₹500 Cr Net Profit in FY24 (up 25%), but its bank balance collapsed from ₹120 Cr to ₹5 Cr. Which financial statement immediately explains why cash vanished despite high profit?',
  options: [
    'Comparative Balance Sheet (only shows end-of-year asset values)',
    'Common Size Statement of P&L (only shows cost ratios against revenue)',
    'Cash Flow Statement under AS-3 (reconciles accrual profit with operating, investing, and financing cash flows)',
    'Trial Balance (only checks debit-credit arithmetical equality)',
  ],
  correctIndex: 2,
  hintAfter: 'Profit is an accounting accrual; cash is real liquidity! Let us explore how Comparative, Common-Size, and Cash Flow Statements reveal the complete truth.',
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

// 22 Comprehensive Challenges covering all 10 nodes
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_041_1',
    nodeId: NODE_C12_ACC_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What type of financial analysis is a Comparative Statement, and what does it measure across columns?',
    options: [
      'Vertical analysis measuring single-year cost proportions against total assets',
      'Horizontal analysis measuring changes in figures across time periods or firms',
      'Dynamic ratio analysis measuring market multiples only',
      'Qualitative audit analysis measuring corporate social responsibility',
    ],
    correctIndex: 1,
    explanation: 'Comparative statements are horizontal analysis tools. They place two or more periods or firms side by side to calculate absolute change and percentage change across time or entities.',
    hints: [
      'Think about whether the comparison runs across columns (horizontal) or down a single column (vertical).',
      'Horizontal analysis compares changes across time periods or between firms.',
      'Comparative statements place Year 1 and Year 2 in adjacent columns to track growth rates.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_041_2',
    nodeId: NODE_C12_ACC_041,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'If a company had ₹0 Intangible Assets in FY22 (Base Year) and ₹50 Lakh in FY23 (Current Year), what is the percentage change in the Comparative Balance Sheet?',
    options: [
      '0% change because base was zero',
      '100% change because it is newly created',
      'Undefined / Not Applicable (N/A) because division by zero is mathematically impossible',
      '+500% change as per Schedule III conventions',
    ],
    correctIndex: 2,
    explanation: 'When the base year figure is zero, the percentage change formula ((Current - Base)/Base * 100) requires division by zero, which is mathematically undefined. In ISC exams, write N/A with a footnote.',
    hints: [
      'Look at the formula: Percentage Change = (Absolute Change / Base Year Figure) * 100.',
      'What happens mathematically when the denominator (Base Year) is 0?',
      'Division by zero is undefined; thus the percentage change is marked N/A.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_042_1',
    nodeId: NODE_C12_ACC_042,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Tata Steel reports Long-Term Borrowings of ₹60,000 Cr on 31.03.2022 and ₹45,000 Cr on 31.03.2023. Compute the percentage change in Long-Term Borrowings (with sign).',
    correctAnswer: -25,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Absolute Change = ₹45,000 - ₹60,000 = -₹15,000 Cr. Percentage Change = (-15,000 / 60,000) * 100 = -25.00%. The base year (2022) is always the denominator.',
    hints: [
      'Absolute Change = Current Year (45,000) - Base Year (60,000).',
      'Always divide by the BASE year figure (60,000), never the current year.',
      '(-15,000 / 60,000) * 100 = -25%.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_042_2',
    nodeId: NODE_C12_ACC_042,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Map the Schedule III Part I Balance Sheet line items to their primary category headers.',
    dragItems: [
      { label: 'Share Capital & Reserves', targetId: 'cat_sh_funds' },
      { label: 'Long-Term Borrowings', targetId: 'cat_nc_liab' },
      { label: 'Trade Payables & Short Provisions', targetId: 'cat_curr_liab' },
      { label: 'Property, Plant & Equipment', targetId: 'cat_nc_assets' },
    ],
    correctMapping: {
      cat_sh_funds: 'Share Capital & Reserves',
      cat_nc_liab: 'Long-Term Borrowings',
      cat_curr_liab: 'Trade Payables & Short Provisions',
      cat_nc_assets: 'Property, Plant & Equipment',
    },
    explanation: 'Schedule III Part I organizes the Balance Sheet into Shareholders Funds, Non-Current Liabilities, Current Liabilities, Non-Current Assets, and Current Assets.',
    hints: [
      'Equity belongs to Shareholders Funds.',
      'Debentures and bank loans due after 12 months belong to Non-Current Liabilities.',
      'PPE and Capital WIP belong to Non-Current Assets.',
    ],
  },
  {
    id: 'ch_043_1',
    nodeId: NODE_C12_ACC_043,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a Comparative Statement of P&L, Revenue from Operations rose by 20% while Total Expenses rose by 35%. What strategic trend does this reveal?',
    options: [
      'Operating leverage is expanding and profit margins are surging',
      'Cost inflation is outpacing top-line revenue growth, squeezing profit margins',
      'The company has eliminated its tax liability completely',
      'Working capital efficiency has improved by 15%',
    ],
    correctIndex: 1,
    explanation: 'When expenses grow at 35% while revenue grows at only 20%, the cost structure is accelerating faster than sales, which compresses operating and net profit margins.',
    hints: [
      'Compare the rate of growth of expenses (35%) versus income (20%).',
      'If spending grows faster than sales, profit will shrink proportionally.',
      'This signals deteriorating cost efficiency and margin compression.',
    ],
  },
  {
    id: 'ch_043_2',
    nodeId: NODE_C12_ACC_043,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Infosys reports Base Year Revenue of ₹1,20,000 Cr, Other Income of ₹2,000 Cr (Total Revenue ₹1,22,000 Cr). Current Year Total Revenue is ₹1,52,500 Cr. What is the percentage change in Total Revenue?',
    correctAnswer: 25,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Percentage Change for Total Revenue = (Current Total Revenue - Base Total Revenue) / Base Total Revenue * 100 = (1,52,500 - 1,22,000) / 1,22,000 * 100 = 30,500 / 1,22,000 * 100 = 25.00%. Note: Denominator must be Base Total Revenue (1,22,000), NOT Revenue from Operations.',
    hints: [
      'Absolute change in Total Revenue = 1,52,500 - 1,22,000 = 30,500 Cr.',
      'Divide by the row’s own base year figure: 1,22,000 Cr.',
      '(30,500 / 1,22,000) * 100 = 25.00%.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_044_1',
    nodeId: NODE_C12_ACC_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a Common Size Balance Sheet, what base figure is taken as 100% for assets and liabilities respectively?',
    options: [
      'Revenue from Operations for both assets and liabilities',
      'Shareholders Funds for liabilities and Fixed Assets for assets',
      'Total Assets for asset items, and Total of Equity & Liabilities for liability items',
      'Working Capital for both sides',
    ],
    correctIndex: 2,
    explanation: 'In a Common Size Balance Sheet (vertical analysis), every asset item is expressed as a percentage of Total Assets (100%), and every equity & liability item as a percentage of Total Equity & Liabilities (100%).',
    hints: [
      'Common size statements express every line item as a percentage of a single common aggregate within that period.',
      'For the asset side, the grand total is Total Assets.',
      'For the liabilities side, the grand total is Total Equity & Liabilities.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_044_2',
    nodeId: NODE_C12_ACC_044,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'L&T has Total Assets of ₹2,50,000 Cr. Non-Current Assets are ₹1,75,000 Cr and Current Assets are ₹75,000 Cr. In a Common Size Balance Sheet, what is the percentage of Current Assets?',
    correctAnswer: 30,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Current Assets % = (Current Assets / Total Assets) * 100 = (75,000 / 2,50,000) * 100 = 30.00%.',
    hints: [
      'Use the formula: (Item Value / Total Assets) * 100.',
      '(75,000 / 2,50,000) = 0.30.',
      'Multiply 0.30 by 100 to get 30.00%.',
    ],
  },
  {
    id: 'ch_045_1',
    nodeId: NODE_C12_ACC_045,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does the ISC syllabus mandate Revenue from Operations (and NOT Total Revenue) as the 100% base for a Common Size Statement of Profit and Loss?',
    options: [
      'Because Revenue from Operations represents core commercial operating activity, while Other Income is incidental',
      'Because Other Income is always zero in corporate accounting',
      'Because Total Revenue includes dividends paid to shareholders',
      'Because Revenue from Operations equals Net Profit',
    ],
    correctIndex: 0,
    explanation: 'Revenue from Operations reflects core business performance. Other Income (interest, dividend, asset sales) is non-operating/incidental. Using Total Revenue would distort operating cost ratios.',
    hints: [
      'Think about core operating cycle versus non-operating treasury gains.',
      'Other Income includes interest on fixed deposits or gains on machinery sale.',
      'Cost ratios (e.g., raw materials %) must be evaluated against core sales revenue.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_045_2',
    nodeId: NODE_C12_ACC_045,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Hindustan Unilever reports Revenue from Operations of ₹50,000 Cr, Cost of Materials Consumed of ₹26,000 Cr, and Net Profit of ₹8,500 Cr. What is the Net Profit Margin % in the Common Size P&L?',
    correctAnswer: 17,
    tolerance: 0.1,
    unit: '%',
    explanation: 'In Common Size P&L, Net Profit % = (Net Profit / Revenue from Operations) * 100 = (8,500 / 50,000) * 100 = 17.00%.',
    hints: [
      'Formula: (Net Profit / Revenue from Operations) * 100.',
      '8,500 / 50,000 = 0.17.',
      '0.17 * 100 = 17.00%.',
    ],
  },
  {
    id: 'ch_046_1',
    nodeId: NODE_C12_ACC_046,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Accounting Standard 3 (AS-3 Revised) and Schedule III, cash flows must be classified into which three distinct heads?',
    options: [
      'Direct, Indirect, and Extraordinary Activities',
      'Operating, Investing, and Financing Activities',
      'Current Assets, Non-Current Assets, and Equity Activities',
      'Revenue, Capital, and Deferred Activities',
    ],
    correctIndex: 1,
    explanation: 'AS-3 (Revised) mandates classification of cash flows into Operating Activities (principal revenue generation), Investing Activities (long-term asset acquisition/disposal), and Financing Activities (capital and borrowings).',
    hints: [
      'Three main sections form the Cash Flow Statement.',
      'One relates to daily trading, one to fixed assets/investments, one to shares/loans.',
      'Operating, Investing, and Financing Activities.',
    ],
  },
  {
    id: 'ch_046_2',
    nodeId: NODE_C12_ACC_046,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did AS-3 Revised replace the older Funds Flow Statement with the Cash Flow Statement for statutory corporate reporting in India?',
    options: [
      'Funds Flow only measured cash on hand, ignoring bank balances',
      'Working capital can be inflated by uncollected debtors and unsold inventory, whereas Cash Flow measures strict immediate liquidity',
      'Funds Flow was banned by the Income Tax Department in 1961',
      'Cash Flow includes non-cash barter transactions while Funds Flow did not',
    ],
    correctIndex: 1,
    explanation: 'Funds Flow measures Working Capital (Current Assets - Current Liabilities). A company can have high working capital tied up in stuck debtors and slow inventory while having zero cash to pay wages. Cash Flow provides an unambiguous test of liquidity.',
    hints: [
      'Think about whether high debtors mean you have cash in hand.',
      'Working capital includes stock and trade receivables which cannot immediately pay bills.',
      'Cash flow reveals actual liquid money movement.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_047_1',
    nodeId: NODE_C12_ACC_047,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In the Operating Activities section (Indirect Method), why is Depreciation added back and Profit on Sale of Land deducted from Net Profit Before Tax?',
    options: [
      'Depreciation is a non-cash expense; Profit on Sale of Land is non-operating income that belongs to Investing Activities',
      'Depreciation increases cash balance; Profit on Sale of Land is an illegal gain',
      'Both are non-cash items and must be added back equally',
      'Depreciation is financing outflow; Land sale is operating inflow',
    ],
    correctIndex: 0,
    explanation: 'Depreciation reduced Net Profit without any cash outflow (non-cash), so it is added back. Profit on sale of land increased Net Profit, but the total cash proceeds belong to Investing Activities; deducting the profit prevents double-counting.',
    hints: [
      'Did paying depreciation involve writing a bank cheque this year? No (non-cash).',
      'Where do the full cash proceeds from selling land appear? In Investing Activities.',
      'Deduct profit on land from operating to avoid double-counting in both sections.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_047_2',
    nodeId: NODE_C12_ACC_047,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Opening Provision for Tax is ₹4,00,000, Current Year P&L Tax Provision is ₹10,00,000, and Closing Provision for Tax is ₹6,00,000. How much Tax was actually PAID in cash during the year?',
    correctAnswer: 800000,
    tolerance: 1000,
    unit: '₹',
    explanation: 'Reconciliation of Provision for Tax Account: Tax Paid = Opening Provision + Current Year Provision charged to P&L - Closing Provision = ₹4,00,000 + ₹10,00,000 - ₹6,00,000 = ₹8,00,000.',
    hints: [
      'Think of the T-Account for Provision for Tax (Liability).',
      'Credit side: Opening Balance (4,00,000) + P&L Provision (10,00,000) = 14,00,000.',
      'Debit side: Tax Paid (balancing figure) + Closing Balance (6,00,000) = 14,00,000.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_047_3',
    nodeId: NODE_C12_ACC_047,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of steps to calculate Net Cash from Operating Activities under the Indirect Method.',
    sortItems: [
      'Start with Net Profit Before Tax',
      'Adjust for Non-Cash & Non-Operating items (Depreciation, Gain/Loss on Assets)',
      'Adjust for Working Capital changes (Current Assets & Current Liabilities)',
      'Deduct Income Tax actually paid',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Under AS-3 Indirect Method: (1) Net Profit Before Tax -> (2) Operating Profit before Working Capital changes -> (3) Cash Generated from Operations -> (4) Deduct Tax Paid to arrive at Net Cash from Operating Activities.',
    hints: [
      'Always start from Net Profit before tax from the P&L.',
      'Next add/less non-cash expenses like depreciation.',
      'Then adjust debtors, stock, creditors (working capital), and finally deduct actual tax paid.',
    ],
  },
  {
    id: 'ch_048_1',
    nodeId: NODE_C12_ACC_048,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Opening Plant & Machinery was ₹20,00,000 and Closing was ₹28,00,000. Depreciation charged during the year was ₹3,00,000. A machine with book value ₹2,00,000 was sold for ₹2,50,000. What was the cash outflow for Purchase of Plant & Machinery?',
    correctAnswer: 1300000,
    tolerance: 1000,
    unit: '₹',
    explanation: 'Plant & Machinery Account: Purchases (Cash Outflow) = Closing Balance (₹28,00,000) + Depreciation (₹3,00,000) + Book Value Sold (₹2,00,000) - Opening Balance (₹20,00,000) = ₹33,00,000 - ₹20,00,000 = ₹13,00,000.',
    hints: [
      'Set up the Machinery ledger: Opening (20L) + Purchases = Sold (2L book value) + Depr (3L) + Closing (28L).',
      'Total Credits = 28L + 3L + 2L = 33L.',
      'Purchases = 33L - 20L = 13,00,000.',
    ],
    misconceptionIndex: 9,
  },
  {
    id: 'ch_048_2',
    nodeId: NODE_C12_ACC_048,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A manufacturing firm like Asian Paints receives ₹25 Lakh interest on long-term corporate bonds it holds. How is this cash inflow classified under AS-3?',
    options: [
      'Operating Activity because interest is recurring income in P&L',
      'Investing Activity because it is a cash return on long-term investment assets',
      'Financing Activity because it involves securities',
      'Non-cash adjustment to be omitted from the Cash Flow Statement',
    ],
    correctIndex: 1,
    explanation: 'For a non-financial enterprise, interest received and dividends received on investments are classified as Investing Inflows because they represent returns on capital deployed in long-term investments.',
    hints: [
      'Is Asian Paints a bank or a paint manufacturer? (Non-financial firm).',
      'Long-term bonds are investing assets.',
      'Returns (interest/dividend) generated by investing assets are Investing Inflows.',
    ],
  },
  {
    id: 'ch_049_1',
    nodeId: NODE_C12_ACC_049,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Opening Equity Share Capital was ₹50,00,000; Closing was ₹80,00,000. Opening Securities Premium was ₹10,00,000; Closing was ₹35,00,000. Securities premium of ₹2,00,000 was written off for preliminary expenses. Compute the total cash received from Issue of Shares.',
    correctAnswer: 5700000,
    tolerance: 1000,
    unit: '₹',
    explanation: 'Cash from Issue of Shares = (Closing Share Capital - Opening Share Capital) + (Closing Premium - Opening Premium + Premium Written Off) = (80,00,000 - 50,00,000) + (35,00,000 - 10,00,000 + 2,00,000) = ₹30,00,000 + ₹27,00,000 = ₹57,00,000.',
    hints: [
      'Face value collected = 80L - 50L = 30 Lakh.',
      'Actual premium collected = (Closing 35L - Opening 10L) + 2L written off = 27 Lakh.',
      'Total cash inflow = 30 Lakh + 27 Lakh = 57,00,000.',
    ],
    misconceptionIndex: 10,
  },
  {
    id: 'ch_049_2',
    nodeId: NODE_C12_ACC_049,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'Under AS-3 Revised, how are Dividend Paid and Interest Paid on bank borrowings classified for a commercial enterprise?',
    options: [
      'Dividend Paid is Operating; Interest Paid is Financing',
      'Both Dividend Paid and Interest Paid are strictly Financing Outflows',
      'Dividend Paid is Financing; Interest Paid is Operating',
      'Both are Investing Outflows',
    ],
    correctIndex: 1,
    explanation: 'Under AS-3, Dividend Paid (return on equity capital) and Interest Paid (cost of borrowed funds) are strictly classified as Financing Outflows.',
    hints: [
      'Financing activities involve dealings with suppliers of long-term and short-term capital.',
      'Shareholders provide equity (dividend is the cost/return).',
      'Lenders provide debt (interest is the borrowing cost). Both are Financing Outflows.',
    ],
  },
  {
    id: 'ch_050_1',
    nodeId: NODE_C12_ACC_050,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A company holds a 6-month Fixed Deposit with SBI with 20 days remaining to maturity on 31 March 2024. Does this qualify as a Cash Equivalent under AS-3?',
    options: [
      'Yes, because remaining maturity is less than 90 days',
      'No, because the 3-month rule applies to the ORIGINAL maturity at the date of investment, not remaining maturity',
      'Yes, because SBI is a scheduled sovereign-backed public sector bank',
      'Yes, if the board approves it as liquid',
    ],
    correctIndex: 1,
    explanation: 'Under AS-3, cash equivalents must have an ORIGINAL maturity of 3 months (90 days) or less from the investment date. A 6-month FD is an investing decision that fails the test regardless of remaining days.',
    hints: [
      'Does AS-3 look at Original Maturity or Remaining Maturity?',
      'Original maturity was 6 months (exceeding 90 days).',
      'It is an investment activity, not a cash equivalent.',
    ],
    misconceptionIndex: 11,
  },
  {
    id: 'ch_050_2',
    nodeId: NODE_C12_ACC_050,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How is a Bank Overdraft / Cash Credit facility treated in the Cash Flow Statement under AS-3 (Revised)?',
    options: [
      'As a negative cash equivalent deducted from cash balance',
      'As a short-term borrowing included under Financing Activities',
      'As an operating working capital adjustment',
      'As an investing outflow',
    ],
    correctIndex: 1,
    explanation: 'Under Indian Schedule III and AS-3 conventions, bank overdraft is a short-term borrowing from the bank (financing activity), not negative cash in hand.',
    hints: [
      'Bank overdraft is money borrowed from the bank.',
      'Borrowing capital is categorized under financing.',
      'Changes in overdraft appear in the Financing Activities section.',
    ],
    misconceptionIndex: 12,
  },
  {
    id: 'ch_050_3',
    nodeId: NODE_C12_ACC_050,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Compute Total Cash & Cash Equivalents: Cash on Hand ₹50,000; Current A/c with HDFC ₹12,00,000; 91-Day RBI Treasury Bills ₹5,00,000; 1-Year FD with SBI ₹10,00,000; Bank Overdraft ₹2,00,000; Escrow restricted cash ₹3,00,000.',
    correctAnswer: 1750000,
    tolerance: 100,
    unit: '₹',
    explanation: 'Cash & Cash Equivalents = Cash on Hand (₹50,000) + Current A/c (₹12,00,000) + 91-Day Treasury Bills (₹5,00,000) = ₹17,50,000. Excluded: 1-Year FD (Investing), Bank Overdraft (Financing), Escrow Cash (Restricted, disclosed in notes).',
    hints: [
      'Qualifying: Cash on hand (50k) + Demand deposit (12L) + 91-Day T-Bills (5L).',
      'Exclude 1-Year FD (>3 months original maturity), Bank Overdraft (Financing), and Escrow cash (Restricted).',
      '50,000 + 12,00,000 + 5,00,000 = 17,50,000.',
    ],
    misconceptionIndex: 11,
  },
];

// Interactive Exploration Steps
const EXPLORATION_STEPS = [
  {
    title: 'Horizontal Analysis: Comparative Balance Sheet',
    instruction: 'Adjust the FY24 Asset Values using the sliders to see Absolute Change and Percentage Change calculate instantly.',
    interactionType: 'comparative-slider',
    nodeId: NODE_C12_ACC_042,
  },
  {
    title: 'Vertical Analysis: Common Size Statement of P&L',
    instruction: 'Adjust Cost of Materials & Employee Costs to see how each cost consumes a slice of Revenue from Operations (100%).',
    interactionType: 'commonsize-calculator',
    nodeId: NODE_C12_ACC_045,
  },
  {
    title: 'The 3-Pillar Cash Flow Sorter (AS-3)',
    instruction: 'Click and categorize corporate transactions into Operating, Investing, or Financing activities.',
    interactionType: 'cashflow-sorter',
    nodeId: NODE_C12_ACC_046,
  },
  {
    title: 'Operating Cash Flow: Reversing the Accruals',
    instruction: 'Toggle non-cash items and working capital changes to transform Accrual Net Profit into Net Cash from Operations.',
    interactionType: 'operating-builder',
    nodeId: NODE_C12_ACC_047,
  },
  {
    title: 'The Gatekeeper: Cash & Cash Equivalents Filter',
    instruction: 'Test assets against the 3-Month Original Maturity and Unrestricted Liquidity rule.',
    interactionType: 'cce-filter',
    nodeId: NODE_C12_ACC_050,
  },
];

// Predict-then-Check scenarios
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a company increases its Debtors (Trade Receivables) by ₹40 Crore during the year, what happens to Operating Cash Flow relative to Net Profit?',
    options: [
      'Operating Cash Flow will be ₹40 Cr HIGHER than Net Profit because sales increased',
      'Operating Cash Flow will be ₹40 Cr LOWER than Net Profit because revenue was recognized on credit without receiving cash',
      'Operating Cash Flow is completely unaffected by debtors',
      'It counts as an Investing inflow of ₹40 Cr',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Trade Receivables slider in the lab to verify that an increase in current assets is deducted from net profit.',
    nodeId: NODE_C12_ACC_047,
  },
  {
    question: 'Predict: If a company sells a machine (Book Value ₹10 Lakh) for ₹14 Lakh cash, how should this be reported in the Cash Flow Statement?',
    options: [
      'Show ₹14 Lakh as Operating Inflow and ₹4 Lakh as Investing Inflow',
      'Show ₹14 Lakh as Investing Inflow, and deduct ₹4 Lakh Profit from Net Profit in Operating Activities',
      'Show only ₹10 Lakh in Investing and ignore the ₹4 Lakh gain',
      'Show ₹14 Lakh in Financing Activities',
    ],
    correctIndex: 1,
    verifyInstruction: 'Check the asset disposal simulation to see the ₹4 Lakh profit bridge between Operating and Investing.',
    nodeId: NODE_C12_ACC_048,
  },
];

// Observation Questions
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the Revenue from Operations row in every Common Size P&L?',
    observableOptions: [
      'It varies between 50% and 150% depending on net profit',
      'It is ALWAYS exactly 100.00% because it serves as the universal denominator for all costs',
      'It equals Total Assets percentage',
      'It turns negative whenever the company records a loss',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_ACC_045,
  },
  {
    question: 'In the Comparative Balance Sheet, when Base Year is ₹100 Cr and Current Year is ₹150 Cr, what is the % change?',
    observableOptions: [
      '+50.00% ((150 - 100)/100 * 100)',
      '+33.33% ((150 - 100)/150 * 100)',
      '+150.00%',
      '-50.00%',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_ACC_042,
  },
];

// Real-World Activity
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Auditor: Publish the Official Board Presentation',
  description: 'Download the audited Comparative, Common-Size, and AS-3 Cash Flow model for BlueChip Enterprises Ltd. Present the findings to the Board of Directors with recommendations on working capital rationalization.',
  steps: [
    'Analyze the gap between ₹500 Cr Net Profit and negative operating cash flow.',
    'Highlight the 42% surge in Trade Receivables and its impact on working capital.',
    'Verify that 91-Day Treasury Bills were correctly included in Cash & Cash Equivalents.',
    'Draft a 3-point remediation plan for debt reduction and credit control.',
  ],
};

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
  nodeId: NODE_C12_ACC_041,
  title: 'Comparative Statements, Common Size & AS-3 Cash Flow Statements',
  definition: 'Comparative statements provide horizontal analysis across periods/firms. Common size statements provide vertical analysis expressing items as percentages of a common base (Total Assets or Revenue from Operations). The Cash Flow Statement under AS-3 (Revised) reconciles accrual profit with cash movements across Operating, Investing, and Financing activities.',
  eli5: 'Comparative statements show how much each account grew or shrank in rupees and %. Common size statements show what slice of the total pie each item takes. The Cash Flow Statement tracks the actual cash in the bank register so you never run out of money despite showing paper profits.',
  misconceptions: [
    { misconception: 'Comparative statements only compare two different companies.', correction: 'Comparative statements can be intra-firm (comparing two periods of the same company) or inter-firm (comparing two companies).' },
    { misconception: 'The percentage change denominator is whichever year is larger or current year.', correction: 'The percentage change denominator is ALWAYS the Base Year (earlier period).' },
    { misconception: 'If the base year figure is zero, the percentage change is 100% or 0%.', correction: 'If the base year is zero, percentage change is undefined (division by zero) and must be marked N/A.' },
    { misconception: 'In a Common Size P&L, Total Revenue is the 100% base.', correction: 'Revenue from Operations is the prescribed 100% base, not Total Revenue.' },
    { misconception: 'Depreciation is a cash outflow because it is deducted in P&L.', correction: 'Depreciation is a non-cash expense; no money is paid out. It is added back in Operating Activities.' },
  ],
  diagnosticQuestions: [
    { question: 'Comparative statement is which type of analysis?', options: ['Vertical', 'Horizontal', 'Ratio', 'Static'], correctIndex: 1 },
    { question: 'What is the base for Common Size Balance Sheet assets?', options: ['Current Assets', 'Total Assets', 'Share Capital', 'Revenue'], correctIndex: 1 },
    { question: 'What is the base for Common Size Statement of P&L?', options: ['Total Revenue', 'Net Profit', 'Revenue from Operations', 'Gross Profit'], correctIndex: 2 },
    { question: 'Under AS-3, depreciation is:', options: ['Investing outflow', 'Financing outflow', 'Added back in Operating activities', 'Deducted in Operating activities'], correctIndex: 2 },
    { question: 'Purchase of Plant and Machinery is classified under:', options: ['Operating', 'Investing', 'Financing', 'Cash Equivalents'], correctIndex: 1 },
    { question: 'Issue of Shares at a premium is:', options: ['Single financing inflow', 'Operating inflow', 'Investing inflow', 'Non-cash'], correctIndex: 0 },
    { question: 'Bank Overdraft is categorized under:', options: ['Cash & Cash Equivalents', 'Financing Activities', 'Investing Activities', 'Operating Expenses'], correctIndex: 1 },
    { question: 'Original maturity limit for Cash Equivalents is:', options: ['12 months', '6 months', '3 months (90 days)', '30 days'], correctIndex: 2 },
  ],
  masteryCriteria: 'Mastery over ISC Class 12 preparation of Comparative Statements, Common Size Statements, and AS-3 Cash Flow Statements with complete adjustment mechanics.',
};

function C12_AccountancyComparativeStatementsMeaningSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_ACC_041,
  title = DEFAULT_PROPS.title || 'Comparative & Common Size Statements & AS-3 Cash Flow',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['acc'] || { name: 'Accountancy', emoji: '📑', color: 'blue' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org style exploration & prediction state
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Adaptive mastery & Scoring
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints & progressive disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Non-MCQ challenge inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');

  // Discovery & feedback states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Step 1: Comparative Balance Sheet Lab
  const [basePPE] = useState(5000);
  const [currPPE, setCurrPPE] = useState(6500);
  const [baseDebtors] = useState(2000);
  const [currDebtors, setCurrDebtors] = useState(2800);
  const [baseCash] = useState(1000);
  const [currCash, setCurrCash] = useState(1200);

  // Step 2: Common Size Statement of P&L Lab
  const [revenueBase] = useState(10000);
  const [costOfMaterials, setCostOfMaterials] = useState(5200);
  const [employeeBenefits, setEmployeeBenefits] = useState(1800);
  const [otherExpenses, setOtherExpenses] = useState(1200);
  const [taxRate] = useState(25);

  // Step 3: Cash Flow 3-Activity Sorter
  const [sortedActivities, setSortedActivities] = useState<Record<string, 'operating' | 'investing' | 'financing'>>({});

  // Step 4: Operating Activities Indirect Method Lab
  const [netProfitInput, setNetProfitInput] = useState(1000);
  const [depreciationInput, setDepreciationInput] = useState(250);
  const [gainOnSaleInput, setGainOnSaleInput] = useState(80);
  const [debtorsChangeInput, setDebtorsChangeInput] = useState(300);
  const [creditorsChangeInput, setCreditorsChangeInput] = useState(150);
  const [taxPaidInput] = useState(200);

  // Step 5: Cash & Cash Equivalents Filter
  const [cceChecked, setCceChecked] = useState<Record<string, boolean>>({
    cash_hand: true,
    bank_curr: true,
    t_bills_91: true,
    fd_1year: false,
    overdraft: false,
    escrow: false,
  });

  // Sandbox Live Scenario Selector
  const [sandboxCompany, setSandboxCompany] = useState<'reliance' | 'tcs' | 'tatamotors'>('reliance');
  const [sandboxDebtLeverage, setSandboxDebtLeverage] = useState(30);

  // Refs for BKT & auto-hint timer
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive Difficulty Filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty when score changes
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

  // Canvas Progress & Particle Indicator Loop
  useEffect(() => {
    if (phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(10, 15);
      ctx.lineTo(canvas.width - 10, 15);
      ctx.stroke();

      const progressX = 10 + ((currentChallenge + 1) / filteredChallenges.length) * (canvas.width - 20);
      const radius = 6 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(progressX, 15, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge, filteredChallenges.length]);

  // Derived Calculations for Explorations
  const ppeAbs = currPPE - basePPE;
  const ppePct = basePPE !== 0 ? (ppeAbs / basePPE) * 100 : 0;
  const debtorsAbs = currDebtors - baseDebtors;
  const debtorsPct = baseDebtors !== 0 ? (debtorsAbs / baseDebtors) * 100 : 0;
  const cashAbs = currCash - baseCash;
  const cashPct = baseCash !== 0 ? (cashAbs / baseCash) * 100 : 0;

  const baseTotal = basePPE + baseDebtors + baseCash;
  const currTotal = currPPE + currDebtors + currCash;
  const totalAbs = currTotal - baseTotal;
  const totalPct = baseTotal !== 0 ? (totalAbs / baseTotal) * 100 : 0;

  const totalExp = costOfMaterials + employeeBenefits + otherExpenses;
  const pbt = Math.max(0, revenueBase - totalExp);
  const taxAmount = (pbt * taxRate) / 100;
  const netProfitCalc = pbt - taxAmount;

  const rawMaterialPct = (costOfMaterials / revenueBase) * 100;
  const employeePct = (employeeBenefits / revenueBase) * 100;
  const otherExpPct = (otherExpenses / revenueBase) * 100;
  const totalExpPct = (totalExp / revenueBase) * 100;
  const pbtPct = (pbt / revenueBase) * 100;
  const netProfitPct = (netProfitCalc / revenueBase) * 100;

  const opProfitBeforeWC = netProfitInput + depreciationInput - gainOnSaleInput;
  const wcImpact = -debtorsChangeInput + creditorsChangeInput;
  const cashBeforeTax = opProfitBeforeWC + wcImpact;
  const netOperatingCash = cashBeforeTax - taxPaidInput;

  const totalCCE = useMemo(() => {
    let sum = 0;
    if (cceChecked.cash_hand) sum += 50000;
    if (cceChecked.bank_curr) sum += 1200000;
    if (cceChecked.t_bills_91) sum += 500000;
    return sum;
  }, [cceChecked]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate insight! Cash is king.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Financial Analysis Laboratory. Step through the 5 interactive stations.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter the free-play sandbox. Model corporate statements with no grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('chime');
    speechManager.speak('Let us begin the board evaluation challenges.');
  }, []);

  const handleNextSlide = useCallback(() => {
    if (currentSlide < EXPLORATION_STEPS.length - 1) {
      setCurrentSlide(s => s + 1);
      audioManager.play('whoosh');
    } else {
      handleAdvanceToSandbox();
    }
  }, [currentSlide, handleAdvanceToSandbox]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the Financial Analysis Audit Simulation.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Verified per AS-3 and Schedule III guidelines.');
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
        speechManager.speak('Hints exhausted. Let us analyze the verified step-by-step resolution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

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

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation below to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation!' : 'Check the universal 100% denominator rule.');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const comparativeChartData = useMemo(() => [
    { name: 'PPE', Base: basePPE, Current: currPPE },
    { name: 'Debtors', Base: baseDebtors, Current: currDebtors },
    { name: 'Cash', Base: baseCash, Current: currCash },
  ], [basePPE, currPPE, baseDebtors, currDebtors, baseCash, currCash]);

  const commonSizeChartData = useMemo(() => [
    { name: 'Materials', pct: parseFloat(rawMaterialPct.toFixed(1)), fill: '#ef4444' },
    { name: 'Employee', pct: parseFloat(employeePct.toFixed(1)), fill: '#f59e0b' },
    { name: 'Other Exp', pct: parseFloat(otherExpPct.toFixed(1)), fill: '#8b5cf6' },
    { name: 'Net Profit', pct: parseFloat(netProfitPct.toFixed(1)), fill: '#10b981' },
  ], [rawMaterialPct, employeePct, otherExpPct, netProfitPct]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <motion.div initial={{ x: -20 }} animate={{ x: 0 }} className="flex items-center gap-3">
          <motion.span whileHover={{ rotate: 10 }} className="text-3xl p-2 bg-gold-900/40 rounded-2xl border border-gold-700/50">
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-gold-400 font-semibold">ISC Class 12 • Schedule III & AS-3 (Revised)</p>
          </div>
        </motion.div>

        <motion.div initial={{ x: 20 }} animate={{ x: 0 }} className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' :
              difficulty === 'standard' ? 'bg-gold-950 text-gold-400 border border-gold-700' :
              'bg-purple-950 text-purple-400 border border-purple-700'
            }`}
          >
            {difficulty} tier
          </motion.span>
          <motion.span whileHover={{ scale: 1.05 }} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 font-mono">
            Mastery: {masteryLevel}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/60"
            >
              <h3 className="text-xl font-bold text-gold-300">{SCENARIO.title}</h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-gold-200 mt-3 p-3 bg-gold-900/30 rounded-xl border border-gold-700/40"
              >
                ⚡ <strong>Forensic Challenge:</strong> {SCENARIO.context}
              </motion.p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
              <p className="text-base font-semibold text-white mb-4 leading-snug">{DISCOVERY_QUESTION.question}</p>
              <div className="space-y-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm transition-all flex items-center justify-between ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-800/40 opacity-50 text-slate-400'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-400 font-bold">
                        ✓ Validated
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}
                  >
                    {discoveryCorrect ? '🎯 Accurate forensic logic! Profit and cash are distinct.' : DISCOVERY_QUESTION.hintAfter}
                  </motion.p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold shadow-lg shadow-gold-600/30 whitespace-nowrap"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div initial={{ y: -10 }} animate={{ y: 0 }} className="flex items-center justify-between px-2">
              <span className="text-xs font-mono text-gold-400 uppercase tracking-wider">
                Station {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <div className="flex gap-1">
                {EXPLORATION_STEPS.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ width: i === currentSlide ? 32 : 12 }}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentSlide ? 'bg-gold-500' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-sm text-gold-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>

                {/* Station 0: Comparative Balance Sheet Horizontal Lab */}
                {currentSlide === 0 && (
                  <div className="space-y-4">
                    {/* SVG DIAGRAM 1: Horizontal Comparative Analysis Flow */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-slate-950 rounded-2xl border border-slate-800"
                    >
                      <div className="text-[11px] font-bold text-slate-400 uppercase mb-1 font-mono">
                        Comparative Statement Mathematical Architecture (Horizontal Analysis)
                      </div>
                      <svg className="w-full h-24" viewBox="0 0 600 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="120" height="55" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                        <text x="70" y="32" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">Base Year (A)</text>
                        <text x="70" y="50" fill="#64748b" fontSize="9" textAnchor="middle">Previous Period</text>

                        <path d="M 135 37 L 165 37" stroke="#3b82f6" strokeWidth="2" />

                        <rect x="170" y="10" width="120" height="55" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                        <text x="230" y="32" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">Current Year (B)</text>
                        <text x="230" y="50" fill="#64748b" fontSize="9" textAnchor="middle">Current Period</text>

                        <path d="M 295 37 L 325 37" stroke="#10b981" strokeWidth="2" />

                        <rect x="330" y="10" width="120" height="55" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                        <text x="390" y="32" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">Abs Change (C)</text>
                        <text x="390" y="50" fill="#34d399" fontSize="9" textAnchor="middle">C = B - A</text>

                        <path d="M 455 37 L 475 37" stroke="#f59e0b" strokeWidth="2" />

                        <rect x="480" y="10" width="110" height="55" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
                        <text x="535" y="32" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">% Change (D)</text>
                        <text x="535" y="50" fill="#fcd34d" fontSize="8.5" textAnchor="middle">D = (C / A) × 100</text>
                      </svg>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Interactive Inputs (₹ Crores)</h4>

                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Property, Plant & Equipment (Current Year)</span>
                            <span className="font-mono text-gold-400">₹{currPPE} Cr (Base: ₹{basePPE} Cr)</span>
                          </div>
                          <input
                            type="range"
                            min={3000}
                            max={9000}
                            step={100}
                            value={currPPE}
                            onChange={(e) => setCurrPPE(Number(e.target.value))}
                            className="w-full accent-gold-500 cursor-pointer"
                            aria-label="Set Current Year PPE"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Trade Receivables / Debtors (Current Year)</span>
                            <span className="font-mono text-amber-400">₹{currDebtors} Cr (Base: ₹{baseDebtors} Cr)</span>
                          </div>
                          <input
                            type="range"
                            min={1000}
                            max={5000}
                            step={100}
                            value={currDebtors}
                            onChange={(e) => setCurrDebtors(Number(e.target.value))}
                            className="w-full accent-amber-500 cursor-pointer"
                            aria-label="Set Current Year Debtors"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Cash & Cash Equivalents (Current Year)</span>
                            <span className="font-mono text-emerald-400">₹{currCash} Cr (Base: ₹{baseCash} Cr)</span>
                          </div>
                          <input
                            type="range"
                            min={500}
                            max={3000}
                            step={50}
                            value={currCash}
                            onChange={(e) => setCurrCash(Number(e.target.value))}
                            className="w-full accent-emerald-500 cursor-pointer"
                            aria-label="Set Current Year Cash"
                          />
                        </div>

                        <div className="h-44 w-full pt-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={comparativeChartData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                              <YAxis stroke="#94a3b8" fontSize={11} />
                              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                              <Bar dataKey="Base" fill="#64748b" name="Base Year (FY23)" />
                              <Bar dataKey="Current" fill="#3b82f6" name="Current Year (FY24)" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </motion.div>

                      {/* Comparative Statement Table Output */}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 overflow-x-auto">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Schedule III Part I Comparative Table</h4>
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-900 text-slate-400 uppercase font-mono">
                            <tr>
                              <th className="p-2">Particulars</th>
                              <th className="p-2">Base (₹)</th>
                              <th className="p-2">Current (₹)</th>
                              <th className="p-2">Abs Change</th>
                              <th className="p-2">% Change</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800 font-mono">
                            <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              <td className="p-2 text-slate-200">Non-Current Assets: PPE</td>
                              <td className="p-2">{basePPE}</td>
                              <td className="p-2 text-gold-400">{currPPE}</td>
                              <td className={`p-2 ${ppeAbs >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{ppeAbs >= 0 ? `+${ppeAbs}` : ppeAbs}</td>
                              <td className={`p-2 font-bold ${ppePct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{ppePct.toFixed(2)}%</td>
                            </motion.tr>
                            <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              <td className="p-2 text-slate-200">Current Assets: Debtors</td>
                              <td className="p-2">{baseDebtors}</td>
                              <td className="p-2 text-amber-400">{currDebtors}</td>
                              <td className={`p-2 ${debtorsAbs >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{debtorsAbs >= 0 ? `+${debtorsAbs}` : debtorsAbs}</td>
                              <td className={`p-2 font-bold ${debtorsPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{debtorsPct.toFixed(2)}%</td>
                            </motion.tr>
                            <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              <td className="p-2 text-slate-200">Current Assets: Cash & CCE</td>
                              <td className="p-2">{baseCash}</td>
                              <td className="p-2 text-emerald-400">{currCash}</td>
                              <td className={`p-2 ${cashAbs >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{cashAbs >= 0 ? `+${cashAbs}` : cashAbs}</td>
                              <td className={`p-2 font-bold ${cashPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{cashPct.toFixed(2)}%</td>
                            </motion.tr>
                            <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-900/60 font-bold">
                              <td className="p-2 text-white">Total Assets</td>
                              <td className="p-2">{baseTotal}</td>
                              <td className="p-2 text-white">{currTotal}</td>
                              <td className={`p-2 ${totalAbs >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{totalAbs >= 0 ? `+${totalAbs}` : totalAbs}</td>
                              <td className="p-2 text-gold-400">{totalPct.toFixed(2)}%</td>
                            </motion.tr>
                          </tbody>
                        </table>

                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="mt-4 p-3 bg-gold-950/40 rounded-xl border border-gold-800/40 text-xs text-slate-300">
                          💡 <strong>Golden Rule:</strong> % Change = <span className="font-mono text-amber-300">(Absolute Change ÷ Base Year) × 100</span>. Never divide by the current year figure!
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Station 1: Common Size P&L Vertical Lab */}
                {currentSlide === 1 && (
                  <div className="space-y-6">
                    {/* SVG DIAGRAM 2: Vertical Common-Size P&L Structure */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-slate-950 rounded-2xl border border-slate-800"
                    >
                      <div className="text-[11px] font-bold text-slate-400 uppercase mb-1 font-mono">
                        Common Size P&L Waterfall Architecture (Vertical Analysis: Base = 100%)
                      </div>
                      <svg className="w-full h-24" viewBox="0 0 600 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="8" width="580" height="14" rx="4" fill="#2563eb" />
                        <text x="300" y="19" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Revenue from Operations (Mandatory 100% Universal Denominator)</text>

                        <rect x="10" y="28" width="300" height="14" rx="4" fill="#dc2626" />
                        <text x="160" y="39" fill="#fee2e2" fontSize="8.5" textAnchor="middle">Cost of Materials Consumed (~52%)</text>

                        <rect x="315" y="28" width="110" height="14" rx="4" fill="#d97706" />
                        <text x="370" y="39" fill="#fef3c7" fontSize="8.5" textAnchor="middle">Employees (~18%)</text>

                        <rect x="430" y="28" width="75" height="14" rx="4" fill="#7c3aed" />
                        <text x="467" y="39" fill="#ede9fe" fontSize="8.5" textAnchor="middle">Other (~12%)</text>

                        <rect x="510" y="28" width="80" height="14" rx="4" fill="#059669" />
                        <text x="550" y="39" fill="#d1fae5" fontSize="8.5" fontWeight="bold" textAnchor="middle">Net Profit (~18%)</text>

                        <text x="300" y="60" fill="#94a3b8" fontSize="8.5" textAnchor="middle">Formula for every line item: (Line Item Amount ÷ Revenue from Operations) × 100</text>
                      </svg>
                    </motion.div>

                    {/* Predict-then-Check Pattern */}
                    {!predictionMade ? (
                      <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} className="p-4 bg-amber-950/30 border border-amber-700/50 rounded-2xl">
                        <p className="text-sm font-bold text-amber-300 mb-2">🤔 Step 1: Make a Quick Prediction</p>
                        <p className="text-xs text-slate-300 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handlePrediction(i)}
                              className="text-left p-2.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-xl border border-slate-700 text-slate-200"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-700/40 flex items-center justify-between text-xs">
                        <span className="text-emerald-300">✓ Prediction recorded! Now test the Cost Ratios below.</span>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setPredictionMade(false)} className="text-gold-400 underline">Change Prediction</motion.button>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">P&L Operating Cost Controls</h4>

                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Cost of Materials Consumed (Raw Materials)</span>
                            <span className="font-mono text-rose-400">₹{costOfMaterials} Cr ({rawMaterialPct.toFixed(1)}%)</span>
                          </div>
                          <input
                            type="range"
                            min={3000}
                            max={7500}
                            step={100}
                            value={costOfMaterials}
                            onChange={(e) => setCostOfMaterials(Number(e.target.value))}
                            className="w-full accent-rose-500 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Employee Benefit Expenses (Salaries)</span>
                            <span className="font-mono text-amber-400">₹{employeeBenefits} Cr ({employeePct.toFixed(1)}%)</span>
                          </div>
                          <input
                            type="range"
                            min={1000}
                            max={3500}
                            step={50}
                            value={employeeBenefits}
                            onChange={(e) => setEmployeeBenefits(Number(e.target.value))}
                            className="w-full accent-amber-500 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Other Operating Expenses</span>
                            <span className="font-mono text-purple-400">₹{otherExpenses} Cr ({otherExpPct.toFixed(1)}%)</span>
                          </div>
                          <input
                            type="range"
                            min={500}
                            max={2500}
                            step={50}
                            value={otherExpenses}
                            onChange={(e) => setOtherExpenses(Number(e.target.value))}
                            className="w-full accent-purple-500 cursor-pointer"
                          />
                        </div>

                        <div className="h-40 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={commonSizeChartData} layout="vertical">
                              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                              <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} unit="%" />
                              <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} width={75} />
                              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                              <Bar dataKey="pct" name="% of Revenue">
                                {commonSizeChartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </motion.div>

                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">Common Size Breakdown (% of Revenue from Operations)</h4>

                        <div className="flex justify-between p-2 bg-gold-950/40 rounded-lg text-gold-300 font-bold">
                          <span>I. Revenue from Operations (BASE)</span>
                          <span>100.00% (₹{revenueBase} Cr)</span>
                        </div>

                        <div className="space-y-1 pl-2 border-l-2 border-slate-700">
                          <div className="flex justify-between text-slate-300">
                            <span>Cost of Materials Consumed</span>
                            <span className="text-rose-400">{rawMaterialPct.toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between text-slate-300">
                            <span>Employee Benefits</span>
                            <span className="text-amber-400">{employeePct.toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between text-slate-300">
                            <span>Other Expenses</span>
                            <span className="text-purple-400">{otherExpPct.toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between font-bold text-slate-200 pt-1 border-t border-slate-800">
                            <span>Total Expenses</span>
                            <span>{totalExpPct.toFixed(2)}%</span>
                          </div>
                        </div>

                        <div className="flex justify-between p-2 bg-slate-900 rounded-lg text-slate-200">
                          <span>Profit Before Tax (PBT)</span>
                          <span>{pbtPct.toFixed(2)}%</span>
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} className="flex justify-between p-2 bg-emerald-950/60 rounded-lg text-emerald-300 font-bold text-sm">
                          <span>Net Profit Margin (%)</span>
                          <span>{netProfitPct.toFixed(2)}% (₹{netProfitCalc.toFixed(0)} Cr)</span>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Observation hook */}
                    {!observationAnswered && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                        <p className="text-xs font-bold text-gold-300 mb-2">🔍 What do you observe?</p>
                        <p className="text-xs text-slate-300 mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleObservation(i)}
                              className="text-left p-2 bg-slate-800 hover:bg-slate-700 text-xs rounded-xl border border-slate-700 text-slate-200"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Station 2: Cash Flow 3-Activity Sorter */}
                {currentSlide === 2 && (
                  <div className="space-y-4">
                    {/* SVG DIAGRAM 3: AS-3 3-Pillar Cash Flow Architecture */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-slate-950 rounded-2xl border border-slate-800"
                    >
                      <div className="text-[11px] font-bold text-slate-400 uppercase mb-1 font-mono">
                        AS-3 Revised Cash Flow Statement 3-Pillar Architecture
                      </div>
                      <svg className="w-full h-24" viewBox="0 0 600 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="8" width="180" height="52" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="100" y="26" fill="#bfdbfe" fontSize="10" fontWeight="bold" textAnchor="middle">1. Operating Activities</text>
                        <text x="100" y="42" fill="#93c5fd" fontSize="8" textAnchor="middle">Core Revenue & Working Capital</text>
                        <text x="100" y="53" fill="#60a5fa" fontSize="7.5" textAnchor="middle">(Customers, Suppliers, Tax)</text>

                        <rect x="210" y="8" width="180" height="52" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                        <text x="300" y="26" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">2. Investing Activities</text>
                        <text x="300" y="42" fill="#6ee7b7" fontSize="8" textAnchor="middle">Long-Term Assets & Securities</text>
                        <text x="300" y="53" fill="#34d399" fontSize="7.5" textAnchor="middle">(Buy/Sell PPE, Interest Recd)</text>

                        <rect x="410" y="8" width="180" height="52" rx="8" fill="#581c87" stroke="#a855f7" strokeWidth="1.5" />
                        <text x="500" y="26" fill="#e9d5ff" fontSize="10" fontWeight="bold" textAnchor="middle">3. Financing Activities</text>
                        <text x="500" y="42" fill="#d8b4fe" fontSize="8" textAnchor="middle">Capital & Long-Term Debt</text>
                        <text x="500" y="53" fill="#c084fc" fontSize="7.5" textAnchor="middle">(Shares, Debentures, Div Paid)</text>
                      </svg>
                    </motion.div>

                    <p className="text-xs text-slate-300">
                      Click each transaction button to toggle its AS-3 classification between <strong>Operating</strong>, <strong>Investing</strong>, and <strong>Financing</strong>.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        { id: 't1', title: 'Sale of goods to customers', target: 'operating', desc: 'Core revenue-generating activity' },
                        { id: 't2', title: 'Purchase of new CNC machinery', target: 'investing', desc: 'Acquisition of long-term PPE' },
                        { id: 't3', title: 'Issue of 10% Debentures at par', target: 'financing', desc: 'Raising long-term debt capital' },
                        { id: 't4', title: 'Dividend paid to shareholders', target: 'financing', desc: 'Cost of equity capital' },
                        { id: 't5', title: 'Sale of old patents / intangibles', target: 'investing', desc: 'Disposal of non-current asset' },
                        { id: 't6', title: 'Payment of Income Tax', target: 'operating', desc: 'Direct operating tax cash outflow' },
                      ].map((item) => {
                        const currentSelection = sortedActivities[item.id] || 'operating';
                        const isCorrect = currentSelection === item.target;

                        return (
                          <motion.div whileHover={{ scale: 1.02 }} key={item.id} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                            <p className="text-xs font-bold text-white">{item.title}</p>
                            <p className="text-[11px] text-slate-400">{item.desc}</p>
                            <div className="flex gap-1 pt-1">
                              {(['operating', 'investing', 'financing'] as const).map((cat) => (
                                <motion.button
                                  key={cat}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => {
                                    setSortedActivities(prev => ({ ...prev, [item.id]: cat }));
                                    audioManager.play('tap');
                                  }}
                                  className={`flex-1 py-1 text-[10px] font-bold uppercase rounded-lg transition-all ${
                                    currentSelection === cat
                                      ? cat === 'operating' ? 'bg-gold-600 text-white' :
                                        cat === 'investing' ? 'bg-emerald-600 text-white' :
                                        'bg-purple-600 text-white'
                                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                  }`}
                                >
                                  {cat.slice(0, 3)}
                                </motion.button>
                              ))}
                            </div>
                            {sortedActivities[item.id] && (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-[10px] font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {isCorrect ? '✓ Correct Category' : `✗ Belongs to ${item.target.toUpperCase()}`}
                              </motion.div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Station 3: Operating Activities Indirect Method Lab */}
                {currentSlide === 3 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Indirect Method Accrual Reversal Controls (₹ Cr)</h4>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Net Profit Before Tax</span>
                          <span className="font-mono text-white">₹{netProfitInput} Cr</span>
                        </div>
                        <input
                          type="range"
                          min={500}
                          max={3000}
                          step={50}
                          value={netProfitInput}
                          onChange={(e) => setNetProfitInput(Number(e.target.value))}
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Add: Depreciation & Amortization (Non-Cash)</span>
                          <span className="font-mono text-emerald-400">+₹{depreciationInput} Cr</span>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={800}
                          step={25}
                          value={depreciationInput}
                          onChange={(e) => setDepreciationInput(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Less: Profit on Sale of Land (Investing Inflow)</span>
                          <span className="font-mono text-rose-400">-₹{gainOnSaleInput} Cr</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={300}
                          step={10}
                          value={gainOnSaleInput}
                          onChange={(e) => setGainOnSaleInput(Number(e.target.value))}
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Working Capital: Increase in Debtors (Outflow)</span>
                          <span className="font-mono text-rose-400">-₹{debtorsChangeInput} Cr</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={800}
                          step={25}
                          value={debtorsChangeInput}
                          onChange={(e) => setDebtorsChangeInput(Number(e.target.value))}
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Working Capital: Increase in Creditors (Inflow)</span>
                          <span className="font-mono text-emerald-400">+₹{creditorsChangeInput} Cr</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={500}
                          step={25}
                          value={creditorsChangeInput}
                          onChange={(e) => setCreditorsChangeInput(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>
                    </motion.div>

                    {/* Waterfall Output */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">AS-3 Cash Flow from Operating Activities</h4>

                      <div className="flex justify-between p-2 bg-slate-900 rounded-lg text-slate-200">
                        <span>Net Profit Before Tax</span>
                        <span>₹{netProfitInput} Cr</span>
                      </div>

                      <div className="flex justify-between p-2 text-emerald-400">
                        <span>+ Depreciation & Non-Cash Addbacks</span>
                        <span>+₹{depreciationInput} Cr</span>
                      </div>

                      <div className="flex justify-between p-2 text-rose-400">
                        <span>- Non-Operating Gain on Sale of Land</span>
                        <span>-₹{gainOnSaleInput} Cr</span>
                      </div>

                      <div className="flex justify-between p-2 bg-gold-950/40 rounded-lg text-gold-300 font-bold">
                        <span>Operating Profit before Working Capital</span>
                        <span>₹{opProfitBeforeWC} Cr</span>
                      </div>

                      <div className="flex justify-between p-2 text-rose-400">
                        <span>- Increase in Debtors (Cash Stuck)</span>
                        <span>-₹{debtorsChangeInput} Cr</span>
                      </div>

                      <div className="flex justify-between p-2 text-emerald-400">
                        <span>+ Increase in Creditors (Cash Retained)</span>
                        <span>+₹{creditorsChangeInput} Cr</span>
                      </div>

                      <div className="flex justify-between p-2 text-rose-400">
                        <span>- Direct Taxes Actually Paid</span>
                        <span>-₹{taxPaidInput} Cr</span>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`flex justify-between p-3 rounded-xl font-bold text-sm ${
                          netOperatingCash >= 0
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                            : 'bg-rose-950 text-rose-300 border border-rose-700'
                        }`}
                      >
                        <span>Net Cash from Operating Activities</span>
                        <span>₹{netOperatingCash} Cr</span>
                      </motion.div>
                    </motion.div>
                  </div>
                )}

                {/* Station 4: Cash & Cash Equivalents Filter */}
                {currentSlide === 4 && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-300">
                      Check the items that qualify as <strong>Cash and Cash Equivalents (CCE)</strong> under AS-3. (3-Month Original Maturity • Insignificant Price Risk • Freely Available).
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                        {[
                          { key: 'cash_hand', label: 'Cash on Hand (Petty cash currency)', amount: '₹50,000', shouldQualify: true },
                          { key: 'bank_curr', label: 'Bank Demand Deposit (Current Account)', amount: '₹12,00,000', shouldQualify: true },
                          { key: 't_bills_91', label: '91-Day RBI Treasury Bills (Maturity ≤ 90 days)', amount: '₹5,00,000', shouldQualify: true },
                          { key: 'fd_1year', label: '1-Year Fixed Deposit with SBI (Original maturity 12m)', amount: '₹10,00,000', shouldQualify: false, reason: 'Fails 3-month original maturity rule (Investing)' },
                          { key: 'overdraft', label: 'Bank Overdraft / Cash Credit limit', amount: '₹2,00,000', shouldQualify: false, reason: 'Short-term borrowing (Financing Outflow)' },
                          { key: 'escrow', label: 'Escrow Account cash earmarked for legal dispute', amount: '₹3,00,000', shouldQualify: false, reason: 'Restricted cash (Disclosed in Notes only)' },
                        ].map((item) => (
                          <motion.label
                            key={item.key}
                            whileHover={{ scale: 1.01, x: 2 }}
                            className="flex items-start gap-3 p-2.5 bg-slate-900 hover:bg-slate-850 rounded-xl cursor-pointer border border-slate-800 text-xs"
                          >
                            <input
                              type="checkbox"
                              checked={cceChecked[item.key] || false}
                              onChange={(e) => {
                                setCceChecked(prev => ({ ...prev, [item.key]: e.target.checked }));
                                audioManager.play('tap');
                              }}
                              className="mt-0.5 accent-gold-500 rounded"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between font-semibold text-slate-200">
                                <span>{item.label}</span>
                                <span className="font-mono text-gold-400">{item.amount}</span>
                              </div>
                              {item.reason && (
                                <p className="text-[10px] text-amber-400/80 mt-0.5">{item.reason}</p>
                              )}
                            </div>
                          </motion.label>
                        ))}
                      </motion.div>

                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Live AS-3 Cash & Cash Equivalents Aggregate</h4>
                          <motion.div key={totalCCE} initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
                            ₹{totalCCE.toLocaleString('en-IN')}
                          </motion.div>
                          <p className="text-xs text-slate-400 mt-2">
                            This aggregate forms the closing balance of Cash and Cash Equivalents at the bottom of the Cash Flow Statement.
                          </p>
                        </div>

                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                          <div className="text-gold-300 font-bold">✓ AS-3 Bright Line Rules:</div>
                          <p className="text-slate-300">• Original maturity at investment date must be ≤ 3 months (90 days).</p>
                          <p className="text-slate-300">• Bank overdraft is NOT negative cash; it is a financing loan.</p>
                          <p className="text-slate-300">• Restricted escrow cash is excluded and reported in notes.</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Exploration Nav Buttons */}
                <div className="flex justify-between pt-4 border-t border-slate-800">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevSlide}
                    disabled={currentSlide === 0}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-30"
                  >
                    ← Previous Station
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextSlide}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                  >
                    {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Station →' : 'Enter Free Sandbox →'}
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            <motion.div initial={{ y: -10 }} animate={{ y: 0 }} className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Free-Play Financial Statement Sandbox</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Freely manipulate corporate capital structures and observe real-time impacts on solvency and liquidity.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 whitespace-nowrap"
              >
                Start Board Challenges →
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { key: 'reliance' as const, label: 'Reliance Industries (Capital Intensive)', assets: 2000000, debt: 40 },
                { key: 'tcs' as const, label: 'TCS (Asset Light IT Services)', assets: 120000, debt: 5 },
                { key: 'tatamotors' as const, label: 'Tata Motors (Automotive Manufacturing)', assets: 350000, debt: 55 },
              ].map((corp) => (
                <motion.button
                  key={corp.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSandboxCompany(corp.key);
                    setSandboxDebtLeverage(corp.debt);
                    audioManager.play('pop');
                  }}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    sandboxCompany === corp.key
                      ? 'bg-gold-950/80 border-gold-500 shadow-lg shadow-gold-500/20'
                      : 'bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-400'
                  }`}
                >
                  <div className="text-xs font-bold text-white">{corp.label}</div>
                  <div className="text-[11px] text-gold-400 font-mono mt-1">Total Assets: ₹{corp.assets.toLocaleString()} Cr</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Benchmark Debt Ratio: {corp.debt}%</div>
                </motion.button>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300">Simulate Capital Restructuring: Long-Term Debt %</span>
                <span className="font-mono text-purple-400 text-sm font-bold">{sandboxDebtLeverage}% Debt • {100 - sandboxDebtLeverage}% Equity</span>
              </div>
              <input
                type="range"
                min={0}
                max={80}
                value={sandboxDebtLeverage}
                onChange={(e) => setSandboxDebtLeverage(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <motion.div whileHover={{ scale: 1.03 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">COMMON SIZE EQUITY</span>
                  <span className="text-emerald-400 font-bold text-sm">{(100 - sandboxDebtLeverage).toFixed(1)}%</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">COMMON SIZE DEBT</span>
                  <span className="text-purple-400 font-bold text-sm">{sandboxDebtLeverage.toFixed(1)}%</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">FINANCIAL RISK INDEX</span>
                  <span className={`font-bold text-sm ${sandboxDebtLeverage > 50 ? 'text-rose-400' : 'text-gold-400'}`}>
                    {sandboxDebtLeverage > 50 ? 'HIGH LEVERAGE' : 'BALANCED'}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGES ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Progress Header & Live Canvas */}
            <motion.div initial={{ y: -10 }} animate={{ y: 0 }} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-gold-400 font-bold">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-slate-400">
                  Competency: <strong className="text-purple-300 uppercase">{challenge.competencyLevel}</strong>
                </span>
              </div>

              <canvas ref={canvasRef} width={600} height={30} className="w-full h-8 bg-slate-900 rounded-xl border border-slate-800" />
            </motion.div>

            <div className="text-xs text-gold-300">
              📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
            </div>

            {/* Question Card */}
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={`p-6 bg-slate-900 rounded-3xl border transition-all ${
                wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
              }`}
            >
              <p className="text-base md:text-lg font-bold text-white mb-6 leading-relaxed">
                {challenge.question}
              </p>

              {/* TYPE 1: MCQ */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-2xl text-sm transition-all border flex items-center justify-between ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-semibold'
                          : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200'
                      }`}
                    >
                      <span>{opt}</span>
                      {showExplanation && i === challenge.correctIndex && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-400 font-bold">
                          ✓ Verified
                        </motion.span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* TYPE 2: Drag-and-Drop Labeling */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gold-700 hover:bg-gold-600 rounded-xl text-xs font-bold text-white cursor-grab shadow"
                      >
                        :: {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { id: 'cat_sh_funds', title: '1. Shareholders Funds' },
                      { id: 'cat_nc_liab', title: '2. Non-Current Liabilities' },
                      { id: 'cat_curr_liab', title: '3. Current Liabilities' },
                      { id: 'cat_nc_assets', title: '4. Non-Current Assets' },
                    ].map((target) => (
                      <motion.div
                        key={target.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(target.id)}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-2xl border-2 border-dashed flex flex-col justify-center min-h-[90px] transition-all ${
                          droppedLabels[target.id]
                            ? 'bg-gold-950/60 border-gold-500 text-gold-200'
                            : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-gold-400'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-300">{target.title}</span>
                        <span className="text-xs font-mono mt-1 text-white font-bold">
                          {droppedLabels[target.id] ? `↳ ${droppedLabels[target.id]}` : 'Drop line item here'}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="mt-4 px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Verify Diagram Labels
                  </motion.button>
                </div>
              )}

              {/* TYPE 3: Drag-Sort Process Sequencing */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag to arrange into chronological AS-3 accounting sequence:</p>
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, idx);
                      }}
                      whileHover={{ scale: 1.02, x: 2 }}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="px-2 py-1 bg-gold-900/60 text-gold-300 rounded-lg font-mono font-bold">{idx + 1}</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="mt-2 px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Verify Sequence Order
                  </motion.button>
                </div>
              )}

              {/* TYPE 4: Numeric Calculation Input */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter calculated value"
                      className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono text-sm w-64 focus:outline-none focus:border-gold-500"
                    />
                    <span className="text-slate-400 font-mono text-sm font-bold">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-2xl font-bold text-xs"
                    >
                      Submit Calculation
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Step-by-Step Progressive Disclosure Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-amber-950/30 border border-amber-700/60 rounded-2xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Auditor’s Resolution & Explanation:
                    </span>
                    <span className="text-[11px] text-amber-400/80 font-mono">
                      Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                    </span>
                  </div>

                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-amber-100 leading-relaxed font-sans"
                      >
                        <span className="font-bold text-amber-400 font-mono">{i + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  <div className="pt-2 flex flex-wrap gap-3">
                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                      >
                        Reveal Next Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Audit Report →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION & AUDIT SYNTHESIS ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-emerald-950/60 rounded-3xl border border-gold-800 space-y-4 text-center"
            >
              <h2 className="text-3xl font-black text-white">Board Audit Complete!</h2>

              {/* MOTIVATIONAL FEEDBACK BANNER */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={`py-3 px-6 rounded-2xl inline-block font-black text-lg uppercase tracking-wider ${
                  errors === 0
                    ? 'bg-emerald-900/60 border border-emerald-500 text-emerald-300'
                    : errors <= 3
                    ? 'bg-gold-900/60 border border-gold-500 text-gold-300'
                    : errors <= 7
                    ? 'bg-amber-900/60 border border-amber-500 text-amber-300'
                    : 'bg-rose-900/60 border border-rose-500 text-rose-300'
                }`}
              >
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </motion.div>

              <div className="flex justify-center items-center gap-6 font-mono pt-2">
                <motion.div whileHover={{ scale: 1.05 }} className="text-left">
                  <span className="text-xs text-slate-400 block uppercase">Final Accuracy</span>
                  <span className="text-2xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
                </motion.div>
                <div className="h-8 w-px bg-slate-700" />
                <motion.div whileHover={{ scale: 1.05 }} className="text-left">
                  <span className="text-xs text-slate-400 block uppercase">AS-3 Mastery</span>
                  <span className="text-2xl font-bold text-gold-400 uppercase">{masteryLevel}</span>
                </motion.div>
              </div>

              <p className="text-sm text-slate-200 max-w-xl mx-auto pt-2">
                {errors === 0
                  ? '🏆 Flawless performance! You evaluated Comparative, Common-Size, and AS-3 Cash Flow Statements with complete statutory precision.'
                  : errors <= 3
                  ? '🌟 Excellent analytical judgment. Review the specific accounting nuances below before final board presentation.'
                  : errors <= 7
                  ? '📈 Good progress on a complex Class 12 topic. Re-examine the working capital reversals and the 3-month CCE rule below.'
                  : '💪 Accounting standards take structured repetition. Review the misconceptions below and retry to attain mastery!'}
              </p>
            </motion.div>

            {/* Targeted Misconception Review */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-rose-950/40 border border-rose-800 rounded-3xl space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Identified Forensic Gaps to Reinforce:</h3>
                <div className="space-y-2">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs"
                      >
                        <p className="text-rose-300 font-semibold">❌ Misconception: {m.misconception}</p>
                        <p className="text-emerald-300 mt-1 font-semibold">✓ Statutory Correction: {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Spaced Repetition Visibility */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div>
                <h4 className="text-sm font-bold text-amber-300">Spaced Repetition Schedule (SM-2)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  To cement long-term memory for the ISC Board Examinations, review this module in{' '}
                  <strong className="text-white font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
                </p>
              </div>
              <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-amber-950 text-amber-300 border border-amber-700 rounded-xl text-xs font-mono font-bold">
                Due: {errors === 0 ? '+7 Days' : errors <= 3 ? '+3 Days' : '+1 Day'}
              </motion.span>
            </motion.div>

            {/* Real-World Activity */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gold-950/40 rounded-3xl border border-gold-800 space-y-3"
            >
              <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <motion.li key={i} whileHover={{ x: 4 }} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="font-mono text-gold-400 font-bold">{i + 1}.</span>
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Audio/Visual Feedback Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C12_AccountancyComparativeStatementsMeaningSim;
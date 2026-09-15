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
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

// ─── NODE ID STRING LITERAL CONSTANTS ───
const NODE_C12_ACC_051 = 'c12_acc_051';
const NODE_C12_ACC_052 = 'c12_acc_052';
const NODE_C12_ACC_053 = 'c12_acc_053';
const NODE_C12_ACC_054 = 'c12_acc_054';
const NODE_C12_ACC_055 = 'c12_acc_055';
const NODE_C12_ACC_056 = 'c12_acc_056';
const NODE_C12_ACC_057 = 'c12_acc_057';
const NODE_C12_ACC_058 = 'c12_acc_058';
const NODE_C12_ACC_059 = 'c12_acc_059';
const NODE_C12_ACC_060 = 'c12_acc_060';

const ALL_NODE_IDS = [
  NODE_C12_ACC_051,
  NODE_C12_ACC_052,
  NODE_C12_ACC_053,
  NODE_C12_ACC_054,
  NODE_C12_ACC_055,
  NODE_C12_ACC_056,
  NODE_C12_ACC_057,
  NODE_C12_ACC_058,
  NODE_C12_ACC_059,
  NODE_C12_ACC_060
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Boardroom Dividend Dilemma & Ratio Audit',
  intro:
    'You are appointed Chief Financial Controller for Bharat Dynamics & Steel Ltd (BDSL) as on 31 March 2024. The Board has proposed a hefty dividend, credit rating agencies are evaluating short-term liquidity, and lenders demand proof of debt-service coverage before approving a ₹500 crore expansion loan.',
  context:
    'You must accurately treat proposed dividends under AS-3 (Revised) / AS-4 (Revised), reconstruct the Cash Flow Statement from consecutive Balance Sheets, and audit key Solvency, Liquidity, and Turnover ratios.'
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'Tata Steel’s Board proposed a dividend of ₹620 crore on 31 March 2024. In the Cash Flow Statement for FY24 (ended 31 March 2024), where should this ₹620 crore be shown as a cash outflow?',
  options: [
    'Financing Activities (Cash Outflow of ₹620 crore)',
    'Operating Activities (Deducted from Operating Profit)',
    'Investing Activities (Cash Outflow)',
    'NO EFFECT on the FY24 Cash Flow Statement (Disclosed only as a Contingent Liability in Notes)'
  ],
  correctIndex: 3,
  hintAfter:
    'Surprised? Under AS-4 (Revised), a proposed dividend is not a liability until approved by shareholders in the AGM (which occurs in FY25). No cash moves in FY24!'
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

// ─── 24 RICH CHALLENGES (NEP 2020 & CISCE COMPLIANT) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c12_acc_051)
  {
    id: 'ch_051_1',
    nodeId: NODE_C12_ACC_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Under AS-3 (Revised) and AS-4 (Revised), what is the cash flow treatment of the PREVIOUS year’s proposed dividend in the CURRENT year’s Cash Flow Statement?',
    options: [
      'It has no effect anywhere in the Cash Flow Statement.',
      'It is treated as a Financing Outflow (and added back in Operating profit if indirect method starts from NPBT).',
      'It is treated as an Investing Inflow.',
      'It is recorded as an Operating Inflow.'
    ],
    correctIndex: 1,
    explanation:
      'The previous year’s proposed dividend was approved in the AGM held during the current year and paid in cash. Hence, it is a Financing Outflow. Under indirect method starting from NPBT, it is also added back in Operating to reconcile appropriations.',
    hints: [
      'Think about when the shareholders actually vote and approve last year’s proposed dividend.',
      'Approval happens at the AGM during the current financial year, triggering the actual cash payment.',
      'Payment of dividend is a return to equity capital providers — thus a Financing Outflow.'
    ],
    misconceptionIndex: 0
  },

  // 2. Foundation - Drag Label (c12_acc_053)
  {
    id: 'ch_053_1',
    nodeId: NODE_C12_ACC_053,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Drag the Balance Sheet items to their correct classification for computing the Current Ratio under CISCE guidelines.',
    dragItems: [
      { label: 'Trade Receivables', targetId: 'ca_box' },
      { label: 'Loose Tools & Spare Parts', targetId: 'excl_box' },
      { label: 'Short-term Provisions', targetId: 'cl_box' },
      { label: 'Trade Payables', targetId: 'cl_box' }
    ],
    correctMapping: {
      ca_box: 'Trade Receivables',
      excl_box: 'Loose Tools & Spare Parts',
      cl_box: 'Short-term Provisions'
    },
    explanation:
      'Trade Receivables are Current Assets. Under CISCE syllabus, Loose Tools & Spare Parts are strictly EXCLUDED from Current Assets. Short-term Provisions and Trade Payables are Current Liabilities.',
    hints: [
      'Recall which inventory item is not readily convertible to cash in the normal cycle.',
      'Loose tools are meant for maintenance and excluded from Current Assets.',
      'Provisions payable within 12 months belong to Current Liabilities.'
    ],
    misconceptionIndex: 1
  },

  // 3. Foundation - Drag Sort (c12_acc_052)
  {
    id: 'ch_052_1',
    nodeId: NODE_C12_ACC_052,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Arrange the standard sequence of preparing the Operating Activities section of a Cash Flow Statement (Indirect Method):',
    sortItems: [
      'Calculate Net Profit before Tax & Extraordinary Items via Working Note',
      'Adjust for Non-Cash & Non-Operating items (Depreciation, Profit/Loss on Sale)',
      'Adjust for Working Capital changes (Receivables, Inventory, Payables)',
      'Deduct Income Tax Actually Paid to arrive at Net Cash from Operations'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'We start with Net Profit before Tax, adjust non-cash/non-operating items to find Operating Profit before WC changes, apply WC changes, and finally deduct direct taxes paid.',
    hints: [
      'The starting point must always be the Working Note for Net Profit before Tax.',
      'Non-cash items like depreciation come before working capital changes.',
      'Direct tax paid is deducted at the very end of the operating section.'
    ]
  },

  // 4. Standard - Application Numeric (c12_acc_051)
  {
    id: 'ch_051_2',
    nodeId: NODE_C12_ACC_051,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'HAL Ltd has: Opening Proposed Dividend ₹350 crore (approved in AGM & paid), Closing Proposed Dividend ₹420 crore, and Interim Dividend of ₹150 crore paid during the year. What is the total Dividend Paid (Financing Outflow in ₹ crore)?',
    correctAnswer: 500,
    tolerance: 0,
    unit: 'crore',
    explanation:
      'Dividend Paid = Opening Proposed Dividend (₹350 cr) + Interim Dividend Paid (₹150 cr) = ₹500 crore. Closing Proposed Dividend (₹420 cr) has NO effect in FY24 CFS.',
    hints: [
      'Only dividends actually paid in cash during the year count as financing outflows.',
      'Formula: Dividend Paid = Opening Proposed Dividend + Interim Dividend Paid.',
      '350 + 150 = 500. Ignore the closing proposed dividend of ₹420 crore.'
    ],
    misconceptionIndex: 0
  },

  // 5. Standard - Application (c12_acc_054)
  {
    id: 'ch_054_1',
    nodeId: NODE_C12_ACC_054,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'HUL reports: Current Assets = ₹6,200 crore (including Inventories ₹1,800 cr [which has Loose Tools ₹200 cr already excluded] and Prepaid Expenses ₹500 cr). Current Liabilities = ₹4,800 crore. What is HUL’s Quick Ratio?',
    options: ['0.81 : 1', '1.29 : 1', '0.77 : 1', '1.00 : 1'],
    correctIndex: 0,
    explanation:
      'Quick Assets = Current Assets (₹6,200) - Inventories (₹1,800) - Prepaid Expenses (₹500) = ₹3,900 crore. Quick Ratio = 3,900 / 4,800 = 0.8125 : 1. Loose tools are NOT deducted twice!',
    hints: [
      'Quick Assets = Current Assets - Inventories - Prepaid Expenses.',
      'Do not deduct loose tools again if they were already excluded from inventory.',
      '3,900 divided by 4,800 equals 0.81 : 1.'
    ],
    misconceptionIndex: 2
  },

  // 6. Standard - Analysis (c12_acc_055)
  {
    id: 'ch_055_1',
    nodeId: NODE_C12_ACC_055,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'A company has Long-term Borrowings ₹50 lakh, Long-term Provisions ₹10 lakh, Short-term Borrowings ₹20 lakh, Trade Payables ₹30 lakh, and Shareholders’ Funds ₹80 lakh. What is the Debt to Equity Ratio under CISCE rules?',
    options: ['0.75 : 1', '1.375 : 1', '0.625 : 1', '1.00 : 1'],
    correctIndex: 0,
    explanation:
      'Under CISCE, Debt = Long-term Borrowings (₹50L) + Long-term Provisions (₹10L) = ₹60 lakh. Current liabilities (ST Borrowings ₹20L, Trade Payables ₹30L) are strictly EXCLUDED from Debt. Debt to Equity = 60 / 80 = 0.75 : 1.',
    hints: [
      'Solvency ratios focus on long-term capital structure.',
      'Exclude Short-term Borrowings and Trade Payables from Debt.',
      'Debt = 50 + 10 = 60 lakh. Equity = 80 lakh. 60/80 = 0.75.'
    ],
    misconceptionIndex: 3
  },

  // 7. Standard - Application Numeric (c12_acc_056)
  {
    id: 'ch_056_1',
    nodeId: NODE_C12_ACC_056,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Infosys has Equity Share Capital ₹2,400 crore, Reserves & Surplus ₹66,800 crore, Non-Current Assets ₹38,400 crore, and Current Assets ₹45,800 crore. What is the Proprietary Ratio in percentage (round to nearest whole number)?',
    correctAnswer: 82,
    tolerance: 1,
    unit: '%',
    explanation:
      'Shareholders’ Funds = 2,400 + 66,800 = ₹69,200 crore. Total Assets = Non-Current (₹38,400) + Current (₹45,800) = ₹84,200 crore. Proprietary Ratio = 69,200 / 84,200 = 82.18% ≈ 82%.',
    hints: [
      'Proprietary Ratio = Shareholders’ Funds / Total Assets.',
      'Total Assets is the sum of Non-Current Assets and Current Assets.',
      '69,200 / 84,200 × 100 ≈ 82%.'
    ]
  },

  // 8. Standard - Application (c12_acc_057)
  {
    id: 'ch_057_1',
    nodeId: NODE_C12_ACC_057,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Bharti Airtel has Long-term Borrowings ₹1,18,000 crore, Long-term Provisions ₹3,200 crore, and Total Assets ₹3,32,000 crore. What is the Debt to Total Assets Ratio?',
    options: ['0.365 (or 36.5%)', '0.500 (or 50.0%)', '0.250 (or 25.0%)', '0.730 (or 73.0%)'],
    correctIndex: 0,
    explanation:
      'Debt = 1,18,000 + 3,200 = ₹1,21,200 crore. Debt to Total Assets = 1,21,200 / 3,32,000 = 0.365 or 36.5%.',
    hints: [
      'Numerator is Long-term Debt (Borrowings + Provisions).',
      'Denominator is Total Assets.',
      '1,21,200 / 3,32,000 = 0.365.'
    ]
  },

  // 9. Standard - Application Numeric (c12_acc_058)
  {
    id: 'ch_058_1',
    nodeId: NODE_C12_ACC_058,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Asian Paints shows: Net Profit after Tax ₹5,700 crore, Provision for Tax ₹1,500 crore, Interest on Long-term Borrowings ₹120 crore, and Working Capital Loan Interest ₹80 crore. What is the Interest Coverage Ratio (in times)?',
    correctAnswer: 61,
    tolerance: 0,
    unit: 'times',
    explanation:
      'NPBIT = NPAT (₹5,700) + Tax (₹1,500) + Long-term Interest (₹120) = ₹7,320 crore. Fixed Interest Charges = ₹120 crore (short-term interest is excluded). Ratio = 7,320 / 120 = 61 times.',
    hints: [
      'Add back Tax and Long-term Interest to NPAT to get NPBIT.',
      'Exclude short-term working capital interest from Fixed Interest Charges.',
      'NPBIT = 7,320 cr. Fixed Interest = 120 cr. 7,320 / 120 = 61 times.'
    ],
    misconceptionIndex: 4
  },

  // 10. Standard - Application Numeric (c12_acc_059)
  {
    id: 'ch_059_1',
    nodeId: NODE_C12_ACC_059,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Dabur India has Total Revenue ₹12,500 crore, Cash Revenue ₹1,500 crore, Opening Trade Receivables ₹1,250 crore, and Closing Trade Receivables ₹1,500 crore. What is the Trade Receivables Turnover Ratio (in times)?',
    correctAnswer: 8,
    tolerance: 0,
    unit: 'times',
    explanation:
      'Credit Revenue = 12,500 - 1,500 = ₹11,000 crore. Average Trade Receivables = (1,250 + 1,500) / 2 = ₹1,375 crore. Turnover = 11,000 / 1,375 = 8 times.',
    hints: [
      'Credit Revenue = Total Revenue - Cash Revenue.',
      'Average Receivables = (Opening + Closing) / 2.',
      '11,000 / 1,375 = 8 times.'
    ]
  },

  // 11. Standard - Application Numeric (c12_acc_060)
  {
    id: 'ch_060_1',
    nodeId: NODE_C12_ACC_060,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Britannia has Total Purchases ₹4,200 crore, Cash Purchases ₹300 crore, Purchase Returns ₹100 crore, Opening Trade Payables ₹600 crore, and Closing Trade Payables ₹760 crore. What is the Average Payment Period in days (use 365 days, round to nearest whole number)?',
    correctAnswer: 65,
    tolerance: 1,
    unit: 'days',
    explanation:
      'Net Credit Purchases = 4,200 - 300 - 100 = ₹3,800 crore. Average Payables = (600 + 760) / 2 = ₹680 crore. Turnover = 3,800 / 680 = 5.588 times. Average Payment Period = 365 / 5.588 ≈ 65.3 ≈ 65 days.',
    hints: [
      'Net Credit Purchases = Total Purchases - Cash Purchases - Purchase Returns.',
      'Average Payables = (600 + 760) / 2 = 680 crore.',
      'Turnover = 3,800 / 680 = 5.59 times. Days = 365 / 5.59 ≈ 65 days.'
    ]
  },

  // 12. Advanced - Evaluation (c12_acc_052)
  {
    id: 'ch_052_2',
    nodeId: NODE_C12_ACC_052,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A company reports Net Profit of ₹500 crore, but Net Cash from Operating Activities is negative ₹200 crore. Which combination of transactions best explains this divergence?',
    options: [
      'Large non-cash depreciation and rapid customer collections.',
      'Massive increase in Trade Receivables (uncollected credit sales) and high inventory accumulation.',
      'Repayment of long-term debentures and fresh issue of shares.',
      'Sale of fixed assets at a huge profit and reduction in tax liability.'
    ],
    correctIndex: 1,
    explanation:
      'Net profit is recognized on accrual basis. If credit sales surge but cash is not collected (Trade Receivables jump), and cash is spent producing unsold inventory, operating cash flow will turn negative despite accounting profits.',
    hints: [
      'Think about why revenue increases profit without bringing cash immediately.',
      'Increase in current assets (Receivables, Inventory) absorbs operating cash.',
      'High uncollected sales + high inventory build-up drains cash while showing profit.'
    ]
  },

  // 13. Advanced - Construct (c12_acc_052)
  {
    id: 'ch_052_3',
    nodeId: NODE_C12_ACC_052,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Construct the Working Note formula for Net Profit before Tax by selecting the required add-backs to Closing P&L Balance:',
    availableParts: [
      'Closing_PL',
      '+',
      'Transfer_to_Reserves',
      'Proposed_Dividend_CY',
      'Interim_Dividend',
      'Provision_for_Tax'
    ],
    targetState:
      'Closing_PL + Transfer_to_Reserves + Proposed_Dividend_CY + Interim_Dividend + Provision_for_Tax',
    validationHint:
      'Assemble: Closing_PL + Transfer_to_Reserves + Proposed_Dividend_CY + Interim_Dividend + Provision_for_Tax',
    explanation:
      'Net Profit before Tax = Closing Balance of P&L + Transfer to Reserves + Proposed Dividend (Current Year) + Interim Dividend + Provision for Tax (Current Year).',
    hints: [
      'Start with Closing_PL.',
      'Add appropriations: Transfer to Reserves, Current Year Proposed Dividend, Interim Dividend.',
      'Finally, add Provision for Tax.'
    ]
  },

  // 14. Advanced - Analysis (c12_acc_057)
  {
    id: 'ch_057_2',
    nodeId: NODE_C12_ACC_057,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'If a firm has Proprietary Ratio = 0.60 and Debt to Total Assets Ratio = 0.25, what must be its Current Liabilities to Total Assets Ratio?',
    options: ['0.15 (15%)', '0.35 (35%)', '0.85 (85%)', '0.25 (25%)'],
    correctIndex: 0,
    explanation:
      'By the accounting identity: Total Assets = Equity + Long-term Debt + Current Liabilities. Dividing by Total Assets: Proprietary Ratio (0.60) + Debt to Total Assets (0.25) + Current Liabilities / Total Assets = 1.0. Thus, CL / TA = 1 - 0.85 = 0.15.',
    hints: [
      'Total Assets are financed by three sources: Equity, Long-term Debt, and Current Liabilities.',
      'The three asset ratios must sum to exactly 1.0 (100%).',
      '1 - (0.60 + 0.25) = 1 - 0.85 = 0.15.'
    ]
  },

  // 15. Advanced - Evaluation (c12_acc_060)
  {
    id: 'ch_060_2',
    nodeId: NODE_C12_ACC_060,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Company A has Trade Payables Turnover of 12 times (Payment period 30 days), while Company B has 4 times (Payment period 91 days). Why might Company B be in a STRONGER commercial position?',
    options: [
      'Company B is defaulting on its debt obligations.',
      'Company B has superior bargaining power to negotiate extended interest-free supplier credit without penalties.',
      'Company B has zero cash in its bank account.',
      'Company B pays suppliers in cash immediately.'
    ],
    correctIndex: 1,
    explanation:
      'Unlike receivables turnover where faster is always better, a longer payment period for a creditworthy company (like Tata Steel or HUL) reflects dominant purchasing power, securing interest-free supplier financing.',
    hints: [
      'Consider whose money is held by the company.',
      'Suppliers provide interest-free trade credit.',
      'Dominant buyers can negotiate 90-day credit terms, keeping cash in their business longer.'
    ]
  },

  // 16. Foundation - Recall (c12_acc_051)
  {
    id: 'ch_051_3',
    nodeId: NODE_C12_ACC_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Under Section 124 of the Companies Act 2013, when unpaid dividend is transferred to the "Unpaid Dividend Account", how is this transfer treated in the Cash Flow Statement?',
    options: [
      'It is recorded as an additional Financing Cash Outflow.',
      'It is NOT an additional cash outflow (it is an internal transfer between bank accounts).',
      'It is treated as an Operating Expense.',
      'It is treated as an Investing Outflow.'
    ],
    correctIndex: 1,
    explanation:
      'Transfer to the Unpaid Dividend Account is merely moving funds from the company’s operating account to a statutory escrow account. Cash left the company when dividend was declared/paid; the internal transfer is not an additional cash outflow.',
    hints: [
      'Does money leave the company’s overall control when transferred to a trust account?',
      'The cash outflow occurred when the dividend was paid out.',
      'Internal account transfers do not create a separate cash outflow in CFS.'
    ]
  },

  // 17. Foundation - Recall (c12_acc_059)
  {
    id: 'ch_059_2',
    nodeId: NODE_C12_ACC_059,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Why does the CISCE syllabus require using GROSS Debtors (before Provision for Doubtful Debts) in the Trade Receivables Turnover Ratio?',
    options: [
      'Because debtors never default on payments.',
      'Because Schedule III discloses receivables gross, and the provision is an accounting estimate, not an actual debt reduction.',
      'Because Net Debtors includes cash sales.',
      'Because provision is added to sales.'
    ],
    correctIndex: 1,
    explanation:
      'Customers legally owe the gross amount. Deducting the provision would artificially understate the receivables denominator and overstate collection speed.',
    hints: [
      'Think about whether a provision reduces what the customer contractually owes.',
      'Provisions are internal accounting estimates.',
      'Gross debtors reflects the total credit extended.'
    ]
  },

  // 18. Standard - Application (c12_acc_053)
  {
    id: 'ch_053_2',
    nodeId: NODE_C12_ACC_053,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'If a firm’s Current Ratio is 2:1, which of the following transactions will IMPROVE (increase) the ratio?',
    options: [
      'Payment of a Current Liability of ₹50,000 in cash.',
      'Purchase of goods for cash ₹50,000.',
      'Collection from Trade Receivables ₹50,000.',
      'Purchase of machinery on 60-day short-term credit.'
    ],
    correctIndex: 0,
    explanation:
      'When the Current Ratio is > 1:1, paying equal amounts from numerator and denominator increases the ratio. Example: (200 - 50) / (100 - 50) = 150 / 50 = 3:1 (Improved!).',
    hints: [
      'Test with numbers: Current Assets = 200, Current Liabilities = 100 (Ratio 2:1).',
      'Pay 50 cash: CA becomes 150, CL becomes 50.',
      '150 / 50 = 3:1, which is higher than 2:1.'
    ]
  },

  // 19. Standard - Application (c12_acc_055)
  {
    id: 'ch_055_2',
    nodeId: NODE_C12_ACC_055,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A company has Share Capital ₹20 lakh and Reserves & Surplus ₹6 lakh (which already includes a debit P&L balance of −₹4 lakh). What is Shareholders’ Funds?',
    options: ['₹26 lakh', '₹22 lakh', '₹30 lakh', '₹16 lakh'],
    correctIndex: 0,
    explanation:
      'Under Schedule III, accumulated loss is already embedded as a negative component within Reserves & Surplus. Shareholders’ Funds = Share Capital (₹20L) + Reserves & Surplus (₹6L) = ₹26 lakh. Do NOT subtract the loss a second time!',
    hints: [
      'Reserves and Surplus on Schedule III already includes the debit P&L balance.',
      'Do not double-count the accumulated loss.',
      '20 + 6 = 26 lakh.'
    ],
    misconceptionIndex: 3
  },

  // 20. Advanced - Analysis (c12_acc_058)
  {
    id: 'ch_058_2',
    nodeId: NODE_C12_ACC_058,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Firm X has an Interest Coverage Ratio of 5 times. By what maximum percentage can its Net Profit before Interest & Tax fall before it fails to meet fixed interest charges?',
    options: ['80%', '50%', '20%', '100%'],
    correctIndex: 0,
    explanation:
      'If coverage is 5x, interest requires 1/5th (20%) of NPBIT. The remaining 4/5ths (80%) is the safety cushion. Earnings can fall by up to 80% before default occurs.',
    hints: [
      'If earnings = 100 and interest = 20, coverage = 100/20 = 5x.',
      'Earnings can drop from 100 down to 20 without missing interest.',
      '(100 - 20) / 100 = 80% safety cushion.'
    ]
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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_ACC_051,
  title: 'Proposed Dividend Treatment & Financial Ratio Analysis',
  definition:
    'Under AS-3 (Revised) & AS-4 (Revised), proposed dividend of previous year is a financing outflow in the current year, whereas current year proposed dividend is a contingent liability. Key ratios measure liquidity, solvency, and operational efficiency.',
  eli5:
    'Last year’s promised pocket money given today is today’s cash spent; today’s promised pocket money to be given next year is not today’s spent cash. Ratios test if you have enough pocket money to pay friends today and long-term.',
  misconceptions: [
    {
      misconception: 'Current year proposed dividend is a cash outflow in the current year CFS.',
      correction:
        'Current year proposed dividend is not yet approved by shareholders; no cash leaves the firm. It is disclosed in Notes to Accounts as a contingent liability.'
    },
    {
      misconception: 'Loose Tools and Spare Parts are included in Current Assets for Current Ratio.',
      correction:
        'Under the CISCE syllabus, Loose Tools & Spare Parts are strictly excluded from Current Assets because they are used in production and not held for sale.'
    },
    {
      misconception: 'Loose Tools should be deducted again when calculating Quick Assets.',
      correction:
        'Loose Tools were already excluded from Inventories when calculating Current Assets. Deducting them again double-counts the deduction.'
    },
    {
      misconception: 'Short-term Borrowings and Trade Payables are part of Debt in Debt-to-Equity.',
      correction:
        'Debt for solvency ratios includes only Long-term Borrowings and Long-term Provisions. Current liabilities are tested under liquidity ratios.'
    },
    {
      misconception: 'Fixed Interest Charges in Interest Coverage Ratio includes short-term overdraft interest.',
      correction:
        'Under CISCE, Fixed Interest Charges includes only interest on long-term borrowings. Short-term interest is an operational expense.'
    }
  ],
  diagnosticQuestions: [
    {
      question: 'Which proposed dividend is treated as a financing outflow in FY24?',
      options: ['FY23 Proposed Dividend', 'FY24 Proposed Dividend', 'Both', 'Neither'],
      correctIndex: 0
    },
    {
      question: 'What is the benchmark Current Ratio for manufacturing firms?',
      options: ['2 : 1', '1 : 1', '0.5 : 1', '3 : 1'],
      correctIndex: 0
    },
    {
      question: 'Quick Assets = Current Assets minus Inventories minus:',
      options: ['Prepaid Expenses', 'Trade Payables', 'Cash', 'Short-term Provisions'],
      correctIndex: 0
    },
    {
      question: 'In Debt to Equity Ratio, Debt includes Long-term Borrowings and:',
      options: ['Long-term Provisions', 'Trade Payables', 'Bank Overdraft', 'Proposed Dividend'],
      correctIndex: 0
    },
    {
      question: 'Proprietary Ratio compares Shareholders’ Funds with:',
      options: ['Total Assets', 'Current Liabilities', 'Fixed Assets', 'Long-term Debt'],
      correctIndex: 0
    },
    {
      question: 'Interest Coverage Ratio formula is NPBIT divided by:',
      options: ['Fixed Interest Charges', 'Total Tax', 'Net Profit', 'Equity Dividend'],
      correctIndex: 0
    },
    {
      question: 'Trade Receivables Turnover denominator uses:',
      options: ['Average Gross Receivables', 'Closing Net Debtors', 'Opening Cash', 'Total Sales'],
      correctIndex: 0
    },
    {
      question: 'Trade Payables Turnover numerator is:',
      options: ['Net Credit Purchases', 'Total Sales', 'Cash Purchases', 'Cost of Goods Sold'],
      correctIndex: 0
    }
  ],
  masteryCriteria:
    'Master the AS-3/AS-4 timing rule for proposed dividend, complete cash flow statement adjustments, and compute liquidity, solvency, and activity ratios according to CISCE Schedule III guidelines.'
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'AS-3 / AS-4 Proposed Dividend Timing Engine',
    instruction:
      'Toggle the dividend parameters below. Watch how previous year proposed dividend triggers an actual cash outflow, while current year proposed dividend remains a Note disclosure!',
    interactionType: 'dividend-timing',
    nodeId: NODE_C12_ACC_051
  },
  {
    title: 'Interactive Liquidity Spectrum (Current vs Quick Ratio)',
    instruction:
      'Adjust Inventory and Prepaid Expenses sliders. Observe how the gap between Current Ratio and Quick Ratio widens in inventory-heavy businesses.',
    interactionType: 'liquidity-sliders',
    nodeId: NODE_C12_ACC_053
  },
  {
    title: 'Solvency Triad & The 100% Asset Funding Identity',
    instruction:
      'Manipulate Long-term Debt and Shareholders’ Funds. Verify the mathematical identity: Proprietary Ratio + Debt/TA + CL/TA = 1.0 (100%).',
    interactionType: 'solvency-identity',
    nodeId: NODE_C12_ACC_055
  },
  {
    title: 'Earnings Debt-Service Cushion (Interest Coverage)',
    instruction:
      'Adjust Net Profit before Tax and Fixed Interest Charges to test the safety multiplier against financial default.',
    interactionType: 'interest-coverage-gauge',
    nodeId: NODE_C12_ACC_058
  },
  {
    title: 'Working Capital Turnover & Cash Conversion Cycle',
    instruction:
      'Slide Credit Sales and Credit Purchases to see how Receivables Collection Days and Payables Payment Days determine the net working capital cycle.',
    interactionType: 'turnover-cycle',
    nodeId: NODE_C12_ACC_059
  }
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'If Bharat Dynamics pays an Interim Dividend of ₹100 crore during FY24 in addition to approving FY23’s ₹250 crore proposed dividend, predict the total Financing Outflow for dividends in FY24.',
    options: ['₹350 crore', '₹250 crore', '₹100 crore', '₹650 crore (including FY24 proposed)'],
    correctIndex: 0,
    verifyInstruction:
      'Set Opening Proposed = ₹250 cr and Interim Dividend = ₹100 cr in the simulator below to confirm.',
    nodeId: NODE_C12_ACC_051
  },
  {
    question:
      'Predict: If a company with Current Ratio 1.5 : 1 collects ₹40,000 from trade debtors in cash, what happens to the Current Ratio?',
    options: [
      'Remains unchanged (Cash increases, Debtors decrease by equal amount)',
      'Increases to 2.0 : 1',
      'Decreases to 1.0 : 1',
      'Doubles'
    ],
    correctIndex: 0,
    verifyInstruction:
      'Move the Debtors-to-Cash toggle in the simulator to verify that total Current Assets remains constant.',
    nodeId: NODE_C12_ACC_053
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question:
      'What do you notice happens to the Quick Ratio when inventory forms a massive 60% of Current Assets?',
    observableOptions: [
      'Quick Ratio drops drastically below the Current Ratio, exposing inventory dependence',
      'Quick Ratio becomes equal to the Current Ratio',
      'Quick Ratio increases above 3 : 1',
      'Current Liabilities automatically decrease'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_ACC_054
  },
  {
    question:
      'What happens to the Proprietary Ratio and Debt-to-Total-Assets Ratio as a firm shifts funding from long-term bank loans to retained earnings?',
    observableOptions: [
      'Proprietary Ratio rises towards 1.0 while Debt to Total Assets falls towards 0.0',
      'Both ratios drop to 0',
      'Current Liabilities double',
      'Total Assets become negative'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_ACC_056
  }
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Corporate Financial Health Audit: Tata Steel vs TCS',
  description:
    'Download or inspect the published balance sheets of Tata Steel (manufacturing) and TCS (IT services). Calculate their Current Ratio, Quick Ratio, Debt-to-Equity, and Interest Coverage. Compare how their business models drive completely different healthy ratio profiles.',
  steps: [
    'Identify Current Assets excluding loose tools and Current Liabilities including provisions.',
    'Isolate Long-term Borrowings + Long-term Provisions for Debt.',
    'Compute Interest Coverage = NPBIT / Fixed Long-term Interest.',
    'State in 2 sentences why TCS can operate with near-zero debt and equal Current/Quick ratios, while Tata Steel requires substantial long-term debt.'
  ]
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ───
export default function C12_AccountancyTreatmentProposedDividendSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['acc'] || {
    name: 'Accountancy',
    emoji: '📑',
    color: 'emerald'
  };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── INTERACTIVE SIMULATOR STATES (30+ STATE VARIABLES) ───
  const [simOpeningPropDiv, setSimOpeningPropDiv] = useState(300);
  const [simClosingPropDiv, setSimClosingPropDiv] = useState(400);
  const [simInterimDiv, setSimInterimDiv] = useState(100);

  const [simCurrentAssets, setSimCurrentAssets] = useState(1000);
  const [simInventories, setSimInventories] = useState(400);
  const [simPrepaid, setSimPrepaid] = useState(100);
  const [simCurrentLiabilities, setSimCurrentLiabilities] = useState(500);

  const [simShareCapital, setSimShareCapital] = useState(500);
  const [simReserves, setSimReserves] = useState(700);
  const [simLongTermBorrowings, setSimLongTermBorrowings] = useState(600);
  const [simLongTermProvisions, setSimLongTermProvisions] = useState(100);
  const [simCLForSolvency, setSimCLForSolvency] = useState(300);

  const [simNPAT, setSimNPAT] = useState(600);
  const [simTaxProvision, setSimTaxProvision] = useState(200);
  const [simLTInterest, setSimLTInterest] = useState(100);

  const [simCreditSales, setSimCreditSales] = useState(2400);
  const [simAvgReceivables, setSimAvgReceivables] = useState(300);
  const [simCreditPurchases, setSimCreditPurchases] = useState(1500);
  const [simAvgPayables, setSimAvgPayables] = useState(250);

  // ─── BRILLIANT PATTERN STATES ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── CHALLENGE & ADAPTIVE DIFFICULTY STATES ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── HINTS & STEP DISCLOSURE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── DRAG & INTERACTION STATE ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── FEEDBACK STATES ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE DIFFICULTY ON BKT UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (FLOW PIPELINE) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let offset = 0;

    const render = () => {
      offset += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw flowing transaction particle beam
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#10b981');
      gradient.addColorStop(0.5, '#06b6d4');
      gradient.addColorStop(1, '#6366f1');

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 10) {
        const y = canvas.height / 2 + Math.sin(x * 0.03 + offset) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw flowing ledger nodes
      for (let i = 0; i < 4; i++) {
        const xPos = ((offset * 40 + i * 120) % (canvas.width + 40)) - 20;
        ctx.beginPath();
        ctx.arc(xPos, canvas.height / 2, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── 14+ EXTRACTED USECALLBACK HANDLERS ───

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! Proposed dividend of current year is merely a contingent liability in notes.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive accounting laboratory. Manipulate each visual tool to discover the principles.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test all financial statements freely in Sandbox mode without test pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Starting challenge mode. Test your mastery across ISC accountancy standards.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders below to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent observation!' : 'Look closer at how the quick assets are derived.');
  }, []);

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
      setShowExplanation(true);
      speechManager.speak('Let us review the step-by-step accounting solution together.');
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
    speechManager.speak(`Congratulations! You have completed the evaluation with a score of ${finalScore} percent.`);
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

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding accounting reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
          challenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(challenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('All hints exhausted. Study the worked solution carefully.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
      setDraggedItem(null);
    },
    [draggedItem]
  );

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const arr = prev.length ? [...prev] : [0, 1, 2, 3];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, []);

  // ─── DERIVED LIVE METRICS FOR LABS ───
  const derivedFinancingDividendPaid = useMemo(
    () => simOpeningPropDiv + simInterimDiv,
    [simOpeningPropDiv, simInterimDiv]
  );

  const derivedQuickAssets = useMemo(
    () => Math.max(0, simCurrentAssets - simInventories - simPrepaid),
    [simCurrentAssets, simInventories, simPrepaid]
  );

  const derivedCurrentRatio = useMemo(
    () => (simCurrentLiabilities > 0 ? (simCurrentAssets / simCurrentLiabilities).toFixed(2) : '0'),
    [simCurrentAssets, simCurrentLiabilities]
  );

  const derivedQuickRatio = useMemo(
    () => (simCurrentLiabilities > 0 ? (derivedQuickAssets / simCurrentLiabilities).toFixed(2) : '0'),
    [derivedQuickAssets, simCurrentLiabilities]
  );

  const derivedEquity = useMemo(
    () => simShareCapital + simReserves,
    [simShareCapital, simReserves]
  );

  const derivedLongTermDebt = useMemo(
    () => simLongTermBorrowings + simLongTermProvisions,
    [simLongTermBorrowings, simLongTermProvisions]
  );

  const derivedTotalAssets = useMemo(
    () => derivedEquity + derivedLongTermDebt + simCLForSolvency,
    [derivedEquity, derivedLongTermDebt, simCLForSolvency]
  );

  const derivedProprietaryRatio = useMemo(
    () => (derivedTotalAssets > 0 ? (derivedEquity / derivedTotalAssets).toFixed(3) : '0'),
    [derivedEquity, derivedTotalAssets]
  );

  const derivedDebtToTA = useMemo(
    () => (derivedTotalAssets > 0 ? (derivedLongTermDebt / derivedTotalAssets).toFixed(3) : '0'),
    [derivedLongTermDebt, derivedTotalAssets]
  );

  const derivedCLToTA = useMemo(
    () => (derivedTotalAssets > 0 ? (simCLForSolvency / derivedTotalAssets).toFixed(3) : '0'),
    [simCLForSolvency, derivedTotalAssets]
  );

  const derivedNPBIT = useMemo(
    () => simNPAT + simTaxProvision + simLTInterest,
    [simNPAT, simTaxProvision, simLTInterest]
  );

  const derivedICR = useMemo(
    () => (simLTInterest > 0 ? (derivedNPBIT / simLTInterest).toFixed(1) : '∞'),
    [derivedNPBIT, simLTInterest]
  );

  const derivedReceivablesTurnover = useMemo(
    () => (simAvgReceivables > 0 ? (simCreditSales / simAvgReceivables).toFixed(1) : '0'),
    [simCreditSales, simAvgReceivables]
  );

  const derivedCollectionDays = useMemo(
    () =>
      parseFloat(derivedReceivablesTurnover) > 0
        ? (365 / parseFloat(derivedReceivablesTurnover)).toFixed(0)
        : '0',
    [derivedReceivablesTurnover]
  );

  const derivedPayablesTurnover = useMemo(
    () => (simAvgPayables > 0 ? (simCreditPurchases / simAvgPayables).toFixed(1) : '0'),
    [simCreditPurchases, simAvgPayables]
  );

  const derivedPaymentDays = useMemo(
    () =>
      parseFloat(derivedPayablesTurnover) > 0
        ? (365 / parseFloat(derivedPayablesTurnover)).toFixed(0)
        : '0',
    [derivedPayablesTurnover]
  );

  // ─── RECHARTS DATA FOR CAPITAL STRUCTURE ───
  const capitalStructureChartData = useMemo(
    () => [
      { name: "Shareholders' Funds", value: derivedEquity, fill: '#10b981' },
      { name: 'Long-term Debt', value: derivedLongTermDebt, fill: '#6366f1' },
      { name: 'Current Liabilities', value: simCLForSolvency, fill: '#f59e0b' }
    ],
    [derivedEquity, derivedLongTermDebt, simCLForSolvency]
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800">
      {/* ─── HEADER WITH DYNAMIC STREAM BRANDING ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-950/80 border border-emerald-600/40 rounded-2xl shadow-inner text-2xl">
            {subjectConfig.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-md uppercase tracking-wider">
                ISC Class 12 Accountancy
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-slate-400 text-xs font-medium">AS-3 & AS-4 Standards</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Dynamic difficulty badge */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : difficulty === 'advanced'
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Mastery Level</span>
            <span className="text-xs font-bold text-emerald-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.header>

      {/* ─── 2D FLOW CANVAS ANIMATION ─── */}
      <div className="my-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
        <canvas ref={canvasRef} width={800} height={24} className="w-full h-6 block opacity-70" />
      </div>

      {/* ─── DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 mt-4">
          <div className="p-5 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border border-emerald-800/40">
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
              <span>🎯</span>
              <span>{SCENARIO.title}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              📌 {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700/60">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-xs font-bold rounded">
                Curiosity Hook
              </span>
              <h3 className="text-base font-semibold text-white">Before we begin, what is your prediction?</h3>
            </div>
            <p className="text-sm text-slate-200 mb-4">{DISCOVERY_QUESTION.question}</p>
            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-100'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-700/40'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700/80 border border-slate-700'
                  }`}
                  aria-label={`Option ${i + 1}: ${opt}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 pt-4 border-t border-slate-700">
                <p
                  className={`text-sm mb-4 font-medium ${
                    discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {discoveryCorrect
                    ? '✓ Spot on! You understand the AS-4 timing principle.'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/40"
                  aria-label="Enter Interactive Labs"
                >
                  <span>Enter Interactive Labs</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── EXPLORATION LABS PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 mt-4">
          <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 sm:p-6 bg-slate-800/60 rounded-2xl border border-slate-700/70 shadow-lg space-y-4"
            >
              <div>
                <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
                  <span>🔬</span>
                  <span>{EXPLORATION_STEPS[currentSlide].title}</span>
                </h3>
                <p className="text-sm text-amber-300 mt-1 font-medium bg-amber-950/30 p-2.5 rounded-xl border border-amber-800/40">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 0: AS-3 / AS-4 DIVIDEND TIMING ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800">
                  {!predictionMade && (
                    <div className="p-3.5 bg-indigo-950/40 border border-indigo-800/60 rounded-xl mb-3">
                      <p className="text-xs font-bold text-indigo-300 uppercase mb-1">Prediction Check</p>
                      <p className="text-sm text-slate-200 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2 text-left bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300 font-medium">
                        <span>Opening Proposed Div (FY23)</span>
                        <span className="text-emerald-400 font-bold">₹{simOpeningPropDiv} cr</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={600}
                        step={50}
                        value={simOpeningPropDiv}
                        onChange={(e) => setSimOpeningPropDiv(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Set Opening Proposed Dividend"
                      />
                      <span className="text-[10px] text-slate-400">Approved in FY24 AGM → Paid in Cash</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300 font-medium">
                        <span>Interim Dividend (FY24)</span>
                        <span className="text-indigo-400 font-bold">₹{simInterimDiv} cr</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={300}
                        step={25}
                        value={simInterimDiv}
                        onChange={(e) => setSimInterimDiv(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set Interim Dividend"
                      />
                      <span className="text-[10px] text-slate-400">Paid immediately during FY24</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300 font-medium">
                        <span>Closing Proposed Div (FY24)</span>
                        <span className="text-amber-400 font-bold">₹{simClosingPropDiv} cr</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={700}
                        step={50}
                        value={simClosingPropDiv}
                        onChange={(e) => setSimClosingPropDiv(Number(e.target.value))}
                        className="w-full accent-amber-500"
                        aria-label="Set Closing Proposed Dividend"
                      />
                      <span className="text-[10px] text-amber-400 font-medium">Note Disclosure ONLY (AS-4)</span>
                    </div>
                  </div>

                  {/* Cash Flow Statement Display Box */}
                  <div className="mt-4 p-4 bg-slate-900 rounded-xl border border-slate-700/80">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Cash Flow Statement (Extract for FY24)
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center p-2 bg-slate-800/70 rounded-lg">
                        <span className="text-slate-300">
                          A. Operating Activities Add-Back (Indirect Method)
                        </span>
                        <span className="text-emerald-400 font-mono font-bold">+ ₹{simOpeningPropDiv} cr</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-emerald-950/40 border border-emerald-800/40 rounded-lg">
                        <span className="text-emerald-200 font-medium">
                          B. Financing Activities: Total Dividend Paid (Actual Outflow)
                        </span>
                        <span className="text-rose-400 font-mono font-bold">
                          (₹{derivedFinancingDividendPaid} cr)
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-amber-950/30 border border-amber-800/40 rounded-lg">
                        <span className="text-amber-200">
                          C. Closing Proposed Dividend (₹{simClosingPropDiv} cr)
                        </span>
                        <span className="text-amber-400 font-mono font-bold">₹0 in CFS (Contingent Liability)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 1: CURRENT VS QUICK RATIO ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300 font-medium">
                        <span>Current Assets</span>
                        <span className="text-cyan-400 font-bold">₹{simCurrentAssets}</span>
                      </div>
                      <input
                        type="range"
                        min={500}
                        max={2000}
                        step={50}
                        value={simCurrentAssets}
                        onChange={(e) => setSimCurrentAssets(Number(e.target.value))}
                        className="w-full accent-cyan-500"
                        aria-label="Set Current Assets"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300 font-medium">
                        <span>Inventories</span>
                        <span className="text-amber-400 font-bold">₹{simInventories}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={simCurrentAssets - 100}
                        step={50}
                        value={simInventories}
                        onChange={(e) => setSimInventories(Number(e.target.value))}
                        className="w-full accent-amber-500"
                        aria-label="Set Inventories"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300 font-medium">
                        <span>Prepaid Expenses</span>
                        <span className="text-rose-400 font-bold">₹{simPrepaid}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={Math.max(0, simCurrentAssets - simInventories)}
                        step={25}
                        value={simPrepaid}
                        onChange={(e) => setSimPrepaid(Number(e.target.value))}
                        className="w-full accent-rose-500"
                        aria-label="Set Prepaid Expenses"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300 font-medium">
                        <span>Current Liabilities</span>
                        <span className="text-indigo-400 font-bold">₹{simCurrentLiabilities}</span>
                      </div>
                      <input
                        type="range"
                        min={200}
                        max={1000}
                        step={50}
                        value={simCurrentLiabilities}
                        onChange={(e) => setSimCurrentLiabilities(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set Current Liabilities"
                      />
                    </div>
                  </div>

                  {/* Dual Ratio Gauges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                    <div className="p-4 bg-slate-900 rounded-xl border border-cyan-800/40 text-center">
                      <span className="text-xs text-slate-400 font-medium">Current Ratio (Benchmark 2:1)</span>
                      <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono my-1">
                        {derivedCurrentRatio} : 1
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Formula: Current Assets / Current Liabilities (Excludes Loose Tools)
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-emerald-800/40 text-center">
                      <span className="text-xs text-slate-400 font-medium">Quick Ratio (Benchmark 1:1)</span>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono my-1">
                        {derivedQuickRatio} : 1
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Formula: (CA - Inventories - Prepaid) / Current Liabilities
                      </p>
                    </div>
                  </div>

                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                      <p className="text-xs font-bold text-amber-300 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB 2: SOLVENCY TRIAD & IDENTITY ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300 font-medium">
                        <span>Shareholders’ Funds</span>
                        <span className="text-emerald-400 font-bold">₹{derivedEquity} cr</span>
                      </div>
                      <input
                        type="range"
                        min={300}
                        max={1500}
                        step={50}
                        value={simReserves}
                        onChange={(e) => setSimReserves(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Set Reserves and Surplus"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300 font-medium">
                        <span>Long-term Debt</span>
                        <span className="text-indigo-400 font-bold">₹{derivedLongTermDebt} cr</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={1500}
                        step={50}
                        value={simLongTermBorrowings}
                        onChange={(e) => setSimLongTermBorrowings(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set Long-term Borrowings"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300 font-medium">
                        <span>Current Liabilities</span>
                        <span className="text-amber-400 font-bold">₹{simCLForSolvency} cr</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={800}
                        step={50}
                        value={simCLForSolvency}
                        onChange={(e) => setSimCLForSolvency(Number(e.target.value))}
                        className="w-full accent-amber-500"
                        aria-label="Set Current Liabilities for Solvency"
                      />
                    </div>
                  </div>

                  {/* Solvency Identity Verification Bar */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-300 uppercase">
                        The Solvency Identity Check (Sum = 1.000)
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        Total Assets = ₹{derivedTotalAssets} cr
                      </span>
                    </div>

                    <div className="h-6 w-full rounded-lg overflow-hidden flex shadow-inner">
                      <div
                        style={{ width: `${parseFloat(derivedProprietaryRatio) * 100}%` }}
                        className="bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-slate-950"
                        title="Proprietary Ratio"
                      >
                        Prop {(parseFloat(derivedProprietaryRatio) * 100).toFixed(0)}%
                      </div>
                      <div
                        style={{ width: `${parseFloat(derivedDebtToTA) * 100}%` }}
                        className="bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white"
                        title="Debt to Total Assets"
                      >
                        Debt/TA {(parseFloat(derivedDebtToTA) * 100).toFixed(0)}%
                      </div>
                      <div
                        style={{ width: `${parseFloat(derivedCLToTA) * 100}%` }}
                        className="bg-amber-500 flex items-center justify-center text-[10px] font-bold text-slate-950"
                        title="CL to Total Assets"
                      >
                        CL {(parseFloat(derivedCLToTA) * 100).toFixed(0)}%
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
                      <div className="p-2 bg-slate-800 rounded-lg">
                        <span className="text-slate-400 block text-[10px]">Proprietary Ratio</span>
                        <span className="font-mono font-bold text-emerald-400">{derivedProprietaryRatio}</span>
                      </div>
                      <div className="p-2 bg-slate-800 rounded-lg">
                        <span className="text-slate-400 block text-[10px]">Debt to Total Assets</span>
                        <span className="font-mono font-bold text-indigo-400">{derivedDebtToTA}</span>
                      </div>
                      <div className="p-2 bg-slate-800 rounded-lg">
                        <span className="text-slate-400 block text-[10px]">CL to Total Assets</span>
                        <span className="font-mono font-bold text-amber-400">{derivedCLToTA}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: INTEREST COVERAGE RATIO ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300 font-medium">
                        <span>Net Profit After Tax (NPAT)</span>
                        <span className="text-cyan-400 font-bold">₹{simNPAT} cr</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={1200}
                        step={50}
                        value={simNPAT}
                        onChange={(e) => setSimNPAT(Number(e.target.value))}
                        className="w-full accent-cyan-500"
                        aria-label="Set NPAT"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300 font-medium">
                        <span>Tax Provision</span>
                        <span className="text-indigo-400 font-bold">₹{simTaxProvision} cr</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={500}
                        step={25}
                        value={simTaxProvision}
                        onChange={(e) => setSimTaxProvision(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Set Tax Provision"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300 font-medium">
                        <span>Fixed Long-term Interest</span>
                        <span className="text-rose-400 font-bold">₹{simLTInterest} cr</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={400}
                        step={10}
                        value={simLTInterest}
                        onChange={(e) => setSimLTInterest(Number(e.target.value))}
                        className="w-full accent-rose-500"
                        aria-label="Set Fixed Interest Charges"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">
                        Derived NPBIT (NPAT + Tax + LT Interest)
                      </span>
                      <span className="text-lg font-bold text-white font-mono">₹{derivedNPBIT} crore</span>
                    </div>
                    <div className="text-center sm:text-right">
                      <span className="text-xs text-slate-400 block font-medium">
                        Interest Coverage Ratio (Benchmark &gt; 3x)
                      </span>
                      <span className="text-3xl font-black text-emerald-400 font-mono">
                        {derivedICR} times
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: TURNOVER & WORKING CAPITAL CYCLE ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-cyan-800/40 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-cyan-300 uppercase">Receivables (Debtors)</span>
                        <span className="text-xs font-mono text-cyan-400">{derivedReceivablesTurnover}x / yr</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-slate-300">
                          <span>Credit Sales</span>
                          <span className="font-bold">₹{simCreditSales} cr</span>
                        </div>
                        <input
                          type="range"
                          min={600}
                          max={5000}
                          step={200}
                          value={simCreditSales}
                          onChange={(e) => setSimCreditSales(Number(e.target.value))}
                          className="w-full accent-cyan-500"
                          aria-label="Set Credit Sales"
                        />
                      </div>
                      <div className="p-2 bg-slate-800 rounded-lg text-center">
                        <span className="text-[10px] text-slate-400 block">Average Collection Period</span>
                        <span className="text-base font-bold text-cyan-400 font-mono">
                          {derivedCollectionDays} Days
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-900 rounded-xl border border-amber-800/40 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-amber-300 uppercase">Payables (Creditors)</span>
                        <span className="text-xs font-mono text-amber-400">{derivedPayablesTurnover}x / yr</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-slate-300">
                          <span>Net Credit Purchases</span>
                          <span className="font-bold">₹{simCreditPurchases} cr</span>
                        </div>
                        <input
                          type="range"
                          min={500}
                          max={3500}
                          step={100}
                          value={simCreditPurchases}
                          onChange={(e) => setSimCreditPurchases(Number(e.target.value))}
                          className="w-full accent-amber-500"
                          aria-label="Set Net Credit Purchases"
                        />
                      </div>
                      <div className="p-2 bg-slate-800 rounded-lg text-center">
                        <span className="text-[10px] text-slate-400 block">Average Payment Period</span>
                        <span className="text-base font-bold text-amber-400 font-mono">
                          {derivedPaymentDays} Days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation between lab slides */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold border border-slate-700"
              aria-label="Previous Slide"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-semibold text-slate-400">
              {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950/40"
                aria-label="Next Slide"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-950/40"
                aria-label="Enter Sandbox"
              >
                Free Sandbox Play →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 mt-4">
          <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-700/40">
            <h3 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span>🎮</span>
              <span>Financial Sandbox: Unlimited Free Exploration</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Zero grading pressure. Test any scenario on the live Capital Structure breakdown chart below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Live Capital Structure Mix
              </h4>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={capitalStructureChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#475569', fontSize: 11 }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {capitalStructureChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Manipulate Capital Elements
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Share Capital & Reserves</span>
                  <span className="text-emerald-400 font-bold">₹{derivedEquity} cr</span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={2000}
                  step={100}
                  value={simReserves}
                  onChange={(e) => setSimReserves(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                  aria-label="Sandbox Reserves"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Long-term Borrowings</span>
                  <span className="text-indigo-400 font-bold">₹{derivedLongTermDebt} cr</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1500}
                  step={100}
                  value={simLongTermBorrowings}
                  onChange={(e) => setSimLongTermBorrowings(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                  aria-label="Sandbox Borrowings"
                />
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700/80 grid grid-cols-2 gap-2 text-center text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Debt-to-Equity</span>
                  <span className="font-mono font-bold text-indigo-400">
                    {(derivedLongTermDebt / derivedEquity).toFixed(2)} : 1
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Proprietary Ratio</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {derivedProprietaryRatio}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-2"
            aria-label="Start Board Examination Challenges"
          >
            <span>I Am Ready for Examination Challenges</span>
            <span>→</span>
          </motion.button>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="ml-2 px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded font-semibold">
                NEP 2020: {challenge.competencyLevel}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Score: <span className="font-bold text-white">{Math.max(0, 100 - errors * 5)}%</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* MCQ Challenge */}
          {(challenge.type === 'classify' ||
            challenge.type === 'distinguish' ||
            challenge.type === 'match') &&
            challenge.options && (
              <div className="p-5 bg-slate-800/70 rounded-2xl border border-slate-700/80 space-y-4">
                <p className="text-base font-semibold text-white leading-snug">{challenge.question}</p>
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                        wrongFlash
                          ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-100'
                          : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700/60'
                      }`}
                      aria-label={`Challenge option ${i + 1}: ${opt}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

          {/* Drag Label Challenge */}
          {challenge.type === 'drag-label' && challenge.dragItems && (
            <div className="p-5 bg-slate-800/70 rounded-2xl border border-slate-700 space-y-4">
              <p className="text-base font-semibold text-white">{challenge.question}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {challenge.dragItems.map((item, i) => (
                  <motion.div
                    key={i}
                    draggable
                    onDragStart={() => handleDragStart(item.label)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-xl cursor-grab text-white text-xs font-bold shadow-md"
                    role="button"
                    tabIndex={0}
                    aria-label={`Draggable item: ${item.label}`}
                  >
                    ⠿ {item.label}
                  </motion.div>
                ))}
              </div>

              {/* Target Drop Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDragDrop('ca_box')}
                  className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-cyan-700/60 text-center min-h-[90px] flex flex-col justify-center items-center"
                >
                  <span className="text-xs text-cyan-400 font-bold mb-1">Current Assets Box</span>
                  <span className="text-sm font-semibold text-white">
                    {droppedLabels.ca_box || 'Drop Here'}
                  </span>
                </div>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDragDrop('excl_box')}
                  className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-rose-700/60 text-center min-h-[90px] flex flex-col justify-center items-center"
                >
                  <span className="text-xs text-rose-400 font-bold mb-1">CISCE Excluded Item</span>
                  <span className="text-sm font-semibold text-white">
                    {droppedLabels.excl_box || 'Drop Here'}
                  </span>
                </div>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDragDrop('cl_box')}
                  className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-indigo-700/60 text-center min-h-[90px] flex flex-col justify-center items-center"
                >
                  <span className="text-xs text-indigo-400 font-bold mb-1">Current Liabilities Box</span>
                  <span className="text-sm font-semibold text-white">
                    {droppedLabels.cl_box || 'Drop Here'}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(droppedLabels)}
                disabled={showExplanation}
                className="mt-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Submit Label Mapping
              </motion.button>
            </div>
          )}

          {/* Drag Sort Challenge */}
          {challenge.type === 'drag-sort' && challenge.sortItems && (
            <div className="p-5 bg-slate-800/70 rounded-2xl border border-slate-700 space-y-4">
              <p className="text-base font-semibold text-white">{challenge.question}</p>
              <div className="space-y-2">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold">
                      {displayIndex + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  handleAnswer(
                    sortArrangement.length > 0
                      ? sortArrangement
                      : challenge.sortItems?.map((_, i) => i) || []
                  )
                }
                disabled={showExplanation}
                className="mt-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Submit Sequence
              </motion.button>
            </div>
          )}

          {/* Numeric Challenge */}
          {challenge.type === 'numeric' && (
            <div className="p-5 bg-slate-800/70 rounded-2xl border border-slate-700 space-y-4">
              <p className="text-base font-semibold text-white">{challenge.question}</p>
              <div className="flex items-center gap-3 max-w-sm">
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter value"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
                  aria-label="Numeric answer input"
                />
                <span className="text-sm font-semibold text-slate-400">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shrink-0 shadow-md"
                >
                  Check
                </motion.button>
              </div>
            </div>
          )}

          {/* Construct Challenge */}
          {challenge.type === 'construct' && challenge.availableParts && (
            <div className="p-5 bg-slate-800/70 rounded-2xl border border-slate-700 space-y-4">
              <p className="text-base font-semibold text-white">{challenge.question}</p>
              <div className="flex flex-wrap gap-2">
                {challenge.availableParts.map((part, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setConstructParts((prev) => [...prev, part])}
                    className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap items-center gap-2">
                {constructParts.map((part, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-slate-800 border border-slate-600 text-emerald-300 font-mono text-xs rounded-lg flex items-center gap-1.5"
                  >
                    {part}
                    <button
                      onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                      className="text-rose-400 hover:text-rose-300 font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {constructParts.length === 0 && (
                  <span className="text-xs text-slate-500 italic">Click parts above to assemble formula</span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(constructParts.join(' '))}
                disabled={showExplanation || constructParts.length === 0}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Validate Construction
              </motion.button>
            </div>
          )}

          {/* Step-by-Step Explanation Card */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-700/50 rounded-2xl space-y-3"
            >
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Accounting Solution & Rationale:
              </span>
              <div className="space-y-2">
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-emerald-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              {revealedSteps <
              challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRevealedSteps((s) => s + 1)}
                  className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Reveal Next Explanation Step →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950/40"
                >
                  {currentChallenge + 1 >= filteredChallenges.length
                    ? 'Finish Simulation'
                    : 'Next Challenge →'}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 mt-4">
          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 text-center space-y-2">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Board Audit Complete!</h2>
            <p className="text-sm text-slate-300">
              Final Mastery Score:{' '}
              <span className="text-emerald-400 font-bold">{Math.max(0, 100 - errors * 5)}%</span> |
              Mastery Tier: <span className="text-indigo-400 font-bold capitalize">{masteryLevel}</span>
            </p>
          </div>

          {/* Motivational Personalized Feedback */}
          <div className="p-5 bg-emerald-950/40 border border-emerald-800/40 rounded-2xl">
            <p className="text-sm font-medium text-emerald-200">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have mastered ISC Class 12 AS-3 dividend rules and accounting ratios completely!'
                : errors <= 3
                ? '👏 Outstanding performance! You demonstrated clear command over Schedule III financial analysis.'
                : '💪 Solid effort! Review your misconception profile below to solidify your understanding.'}
            </p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 border border-rose-800/40 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">❌ {m.misconception}</p>
                    <p className="text-emerald-300 font-medium">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-2xl text-xs text-amber-200">
            ⏰ <span className="font-bold">Next Spaced Review Scheduled:</span> In{' '}
            <span className="font-bold underline">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>{' '}
            to reinforce long-term memory.
          </div>

          {/* Real-World Capstone */}
          <div className="p-5 bg-indigo-950/40 border border-indigo-800/40 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK SYSTEM POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Accomplished!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C12_AccountancyTreatmentProposedDividendSim };
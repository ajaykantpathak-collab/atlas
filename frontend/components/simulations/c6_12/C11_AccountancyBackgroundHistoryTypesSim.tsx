'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

// ─��─ MANDATORY NODE IDS AS STRING LITERALS ───
const NODE_C11_ACC_001 = 'c11_acc_001';
const NODE_C11_ACC_002 = 'c11_acc_002';
const NODE_C11_ACC_003 = 'c11_acc_003';
const NODE_C11_ACC_004 = 'c11_acc_004';
const NODE_C11_ACC_005 = 'c11_acc_005';
const NODE_C11_ACC_006 = 'c11_acc_006';
const NODE_C11_ACC_007 = 'c11_acc_007';
const NODE_C11_ACC_008 = 'c11_acc_008';
const NODE_C11_ACC_009 = 'c11_acc_009';
const NODE_C11_ACC_010 = 'c11_acc_010';
const ALL_NODE_IDS = [
  NODE_C11_ACC_001,
  NODE_C11_ACC_002,
  NODE_C11_ACC_003,
  NODE_C11_ACC_004,
  NODE_C11_ACC_005,
  NODE_C11_ACC_006,
  NODE_C11_ACC_007,
  NODE_C11_ACC_008,
  NODE_C11_ACC_009,
  NODE_C11_ACC_010,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The Great Mumbai Audit of 2024',
  intro: 'You have been hired as a Junior Analyst at Deloitte India in Nariman Point, Mumbai. "Bharat AutoTech Ltd" (supplying parts to Tata Motors and Bajaj Auto) is preparing for statutory audit under Section 139 of the Companies Act 2013.',
  context: 'The company has confusion between personal drawings and company expenses, disputes on when to recognise revenue from Asian Paints, unrecorded invoices, and differences between cash vs accrual profits. Fix the books before the statutory auditor arrives!',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'The Managing Director of Bharat AutoTech pays ₹1,50,000 from the company bank account for his daughter\'s college fees. The accountant debited "Education Expense A/c". Is this treatment correct?',
  options: [
    'Yes — money left the company bank account, so it is a business expense.',
    'No — it violates the Accounting Entity Concept; it is Drawings reducing Capital.',
    'Yes — because the MD is the sole owner and head of the company.',
    'No — it must be recorded as a Fixed Asset called Student Goodwill.',
  ],
  correctIndex: 1,
  hintAfter: 'Under the Accounting Entity concept, the business is completely separate from its owner. Personal withdrawals are Drawings, never business expenses!',
};

// ─── PREDICTION QUESTIONS (Predict-Then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_01_balance_scale',
    question: 'If Bharat AutoTech purchases ₹3,00,000 worth of new machinery on credit from Godrej Ltd, what happens to the Accounting Equation (Assets = Liabilities + Capital)?',
    options: [
      'Total Assets increase by ₹3L, External Liabilities increase by ₹3L; balance is preserved.',
      'Total Assets increase by ₹3L, Owner Capital increases by ₹3L.',
      'Total Assets remain unchanged because it was bought on credit.',
      'External Liabilities decrease because machinery is now owned.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Go to Lab 2 (Balance Scale) and increase Assets by ₹3L and Liabilities by ₹3L to verify that equilibrium is maintained.',
    explanation: 'Purchasing machinery on credit increases Machinery (Asset) by ₹3,00,000 and increases Godrej Ltd (Creditor / Liability) by ₹3,00,000. Both sides expand equally by ₹3,00,000.',
  },
  {
    id: 'pred_02_cash_vs_accrual',
    question: 'If a company delivers ₹4,00,000 goods to customers in March with payment promised in May, what will be the difference between Accrual Profit and Cash Profit for March?',
    options: [
      'Accrual profit will be ₹4,00,000 higher than Cash profit.',
      'Cash profit will be ₹4,00,000 higher than Accrual profit.',
      'Both profits will be identical until the cheque is deposited in May.',
      'Accrual profit will decrease by ₹4,00,000 because cash is not yet received.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Go to Lab 3 (Cash vs Accrual Simulator), set Credit Sales to ₹400k and toggle between Cash and Accrual bases to observe the profit difference.',
    explanation: 'Accrual basis recognises the ₹4,00,000 sales revenue when earned upon delivery in March (FY 2023-24), whereas Cash basis records zero revenue until May when cash arrives.',
  },
];

// ─── OBSERVATION QUESTIONS (What Do You Notice Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_01_scale_tilt',
    question: 'In the Accounting Balance Scale simulator (Lab 2), what do you observe when Assets are increased without increasing Liabilities or Capital?',
    observableOptions: [
      'The left pan tilts downward, indicating an imbalance where Assets exceed Liabilities + Capital.',
      'The right pan tilts downward automatically to compensate.',
      'The fulcrum shifts to the left to restore balance automatically.',
      'The scale remains horizontal because the equation is legally fixed.',
    ],
    options: [
      'The left pan tilts downward, indicating an imbalance where Assets exceed Liabilities + Capital.',
      'The right pan tilts downward automatically to compensate.',
      'The fulcrum shifts to the left to restore balance automatically.',
      'The scale remains horizontal because the equation is legally fixed.',
    ],
    correctIndex: 0,
    explanation: 'When one side of the dual aspect equation changes without an offsetting credit/debit entry, the balance scale tilts, showing why double entry is required for every single transaction.',
  },
  {
    id: 'obs_02_pipeline_flow',
    question: 'In the 8-Stage Accounting Pipeline (Lab 4), what do you notice about how Net Profit connects the P&L Account to the Balance Sheet?',
    observableOptions: [
      'Net Profit computed in Stage 7 (P&L) is transferred into Stage 8 (Balance Sheet) to increase Owner Capital and balance the equation.',
      'The Balance Sheet is generated before the P&L Account is closed.',
      'Net Profit from the Trading Account directly alters Cash without entering P&L.',
      'The Trial Balance is created at the very end after the Balance Sheet.',
    ],
    options: [
      'Net Profit computed in Stage 7 (P&L) is transferred into Stage 8 (Balance Sheet) to increase Owner Capital and balance the equation.',
      'The Balance Sheet is generated before the P&L Account is closed.',
      'Net Profit from the Trading Account directly alters Cash without entering P&L.',
      'The Trial Balance is created at the very end after the Balance Sheet.',
    ],
    correctIndex: 0,
    explanation: 'The pipeline demonstrates strict sequence: Trial Balance feeds Trading A/c (Gross Profit) → P&L A/c (Net Profit) → Net Profit transferred to Capital in the final Balance Sheet to make Assets = Liabilities + Capital.',
  },
];

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

// ─── 22 COMPREHENSIVE CHALLENGES ACROSS ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation: Account Classification (c11_acc_001)
  {
    id: 'ch_01_acc_001_class',
    nodeId: NODE_C11_ACC_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How is "Machinery A/c" classified in traditional accounting, and what rule applies to it?',
    options: [
      'Nominal A/c — Debit all expenses and losses',
      'Real A/c (Tangible) — Debit what comes in, credit what goes out',
      'Personal A/c — Debit the receiver, credit the giver',
      'Intangible Real A/c — Amortise annually',
    ],
    correctIndex: 1,
    explanation: 'Machinery A/c is a Tangible Real Account representing a physical asset owned by the business. Depreciation A/c is the Nominal account, not Machinery.',
    hints: [
      'Think about whether machinery is a physical thing owned by the business.',
      'Assets you can see and touch fall under Real Accounts (Tangible).',
      'The rule for Real accounts is: Debit what comes in, Credit what goes out.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation: Drag-label on traditional 3-way classification (c11_acc_001)
  {
    id: 'ch_02_acc_001_drag',
    nodeId: NODE_C11_ACC_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each account to its correct traditional category bucket.',
    dragItems: [
      { label: 'SBI Bank A/c', targetId: 'slot_personal' },
      { label: 'Goodwill A/c', targetId: 'slot_real' },
      { label: 'Rent Paid A/c', targetId: 'slot_nominal' },
    ],
    correctMapping: {
      slot_personal: 'SBI Bank A/c',
      slot_real: 'Goodwill A/c',
      slot_nominal: 'Rent Paid A/c',
    },
    explanation: 'SBI Bank is an artificial personal entity (Personal), Goodwill is an intangible asset owned (Real), and Rent Paid is an operational expense (Nominal).',
    hints: [
      'SBI is a banking corporation with whom the company deals.',
      'Goodwill is an asset of the business even though you cannot touch it.',
      'Rent is an expense incurred for the accounting period.',
    ],
    misconceptionIndex: 2,
  },
  // 3. Foundation: Basic Terms (c11_acc_002)
  {
    id: 'ch_03_acc_002_event_txn',
    nodeId: NODE_C11_ACC_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Infosys board appoints a new CEO on 10 April on a ₹5 crore package. On 30 April, ₹41.6 lakh salary is transferred. Which date marks a recorded transaction?',
    options: [
      '10 April only — appointment is the binding contract',
      '30 April only — money actually transferred for services rendered',
      'Both 10 April and 30 April are recorded in the general journal',
      'Neither is recorded until audited at financial year end',
    ],
    correctIndex: 1,
    explanation: 'The appointment is an event (no monetary exchange has taken place yet). The salary payment on 30 April is a transaction involving transfer of money and is recorded in the books.',
    hints: [
      'A transaction requires transfer of money or money\'s worth.',
      'Did any money flow on the day the appointment letter was handed over?',
      'Only monetary transactions supported by vouchers enter journal books.',
    ],
    misconceptionIndex: 3,
  },
  // 4. Foundation: Asset Types (c11_acc_002)
  {
    id: 'ch_04_acc_002_fictitious',
    nodeId: NODE_C11_ACC_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Asian Paints spends ₹40 crore on a mega re-branding advertisement campaign written off over 4 years. How is "Advertisement Suspense A/c" classified?',
    options: [
      'Tangible Fixed Asset',
      'Fictitious Asset (Deferred Revenue Expenditure)',
      'Liquid Asset',
      'Wasting Asset',
    ],
    correctIndex: 1,
    explanation: 'Advertisement Suspense is a fictitious asset / deferred revenue loss carried forward on the assets side so as not to distort a single year\'s P&L.',
    hints: [
      'Can this advertising spend be sold to someone else for cash?',
      'It is an unwritten-off expense debit balance carried on the balance sheet.',
      'Such deferred loss balances are termed Fictitious Assets.',
    ],
  },
  // 5. Foundation: Liabilities (c11_acc_003)
  {
    id: 'ch_05_acc_003_capital_liab',
    nodeId: NODE_C11_ACC_003,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does Owner\'s Capital appear on the LIABILITIES side of a balance sheet?',
    options: [
      'Because the owner is legally a creditor with a mortgage on plant',
      'Because the Accounting Entity Concept treats business and owner as distinct; the business owes capital back to the owner',
      'It is an error in the British double-entry convention',
      'Because capital must always equal bank cash balance',
    ],
    correctIndex: 1,
    explanation: 'Under the Business Entity concept, the business is a distinct accounting entity. Capital is an internal liability owed by the enterprise to the proprietor.',
    hints: [
      'Whose books are we preparing? The owner\'s personal diary or the business firm\'s books?',
      'From the business\'s perspective, who contributed the starting funds?',
      'Capital is an internal obligation ranking after external creditors upon liquidation.',
    ],
    misconceptionIndex: 1,
  },
  // 6. Foundation: Drag-sort Accounting Cycle (c11_acc_006)
  {
    id: 'ch_06_acc_006_cycle_sort',
    nodeId: NODE_C11_ACC_006,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the first 4 fundamental stages of the Accounting Cycle in correct chronological order.',
    sortItems: [
      'Identification of Transaction',
      'Preparation of Source Voucher',
      'Recording in Journal / Subsidiary Books',
      'Posting into Ledger Accounts',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The cycle strictly begins with the Transaction, followed by Voucher preparation, Journal recording, and Ledger classification.',
    hints: [
      'You cannot record without a voucher proof.',
      'Journal entries are made before ledger posting.',
      'Identification → Voucher → Journal → Ledger is the foundational flow.',
    ],
  },
  // 7. Foundation: Book-keeping vs Accounting vs Accountancy (c11_acc_005)
  {
    id: 'ch_07_acc_005_diff',
    nodeId: NODE_C11_ACC_005,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Preparing the Trial Balance and Final Accounts (Trading, P&L, Balance Sheet) falls under which domain?',
    options: [
      'Book-keeping (Clerical recording stage)',
      'Accounting (Summarising and interpreting stage)',
      'Auditing statutory certification only',
      'Cost engineering only',
    ],
    correctIndex: 1,
    explanation: 'Book-keeping stops at recording in journal and posting to ledger. Summarising (Trial Balance, P&L, Balance Sheet) and interpreting is Accounting.',
    hints: [
      'Book-keeping is clerical routine recording.',
      'Summarising into Trial Balance crosses into analytical territory.',
      'Accounting includes classifying, summarising, and interpreting.',
    ],
  },
  // 8. Standard: Terms — Debtors vs Creditors vs Asset Sale (c11_acc_004)
  {
    id: 'ch_08_acc_004_asset_sale',
    nodeId: NODE_C11_ACC_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Maruti Suzuki sells an old robotic welding arm (Book value ₹1,20,000) for ₹1,80,000 cash. What is the ₹60,000 surplus classified as?',
    options: [
      'Sales Revenue (Operating Profit)',
      'Capital Gain (Non-operating gain on sale of fixed asset)',
      'Sundry Debtor',
      'Drawings',
    ],
    correctIndex: 1,
    explanation: 'Maruti Suzuki is in the business of selling cars, not welding machines. The ₹60,000 surplus on selling a fixed asset is a Capital Gain, not Sales Revenue.',
    hints: [
      'Is selling second-hand machinery the regular merchandise of Maruti Suzuki?',
      'Sales refers only to goods traded in the ordinary course.',
      'Surplus on fixed asset disposal is a Gain of capital nature.',
    ],
  },
  // 9. Standard: Contingent Liability evaluation (c11_acc_003)
  {
    id: 'ch_09_acc_003_contingent',
    nodeId: NODE_C11_ACC_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A consumer court case claiming ₹50 lakh compensation against Hindustan Unilever is pending judgment. Under AS-29 and Schedule III, how must this be treated?',
    options: [
      'Debited as an expense in the P&L and recorded as a current liability',
      'Disclosed as a footnote in Notes to Accounts as a Contingent Liability',
      'Completely ignored until the Supreme Court final verdict',
      'Deducted directly from Share Capital',
    ],
    correctIndex: 1,
    explanation: 'Under AS-29, an obligation that is possible but not probable/reliably estimable is a Contingent Liability, disclosed as a footnote in Notes to Accounts.',
    hints: [
      'Has the court ordered payment yet?',
      'Recording it inside the balance sheet would prematurely overstate liabilities.',
      'Full disclosure requires it in the Notes to Accounts as a footnote.',
    ],
  },
  // 10. Standard: Numeric Accounting Equation (c11_acc_009)
  {
    id: 'ch_10_acc_009_equation_calc',
    nodeId: NODE_C11_ACC_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Sharma Traders starts with Capital of ₹8,00,000 and Bank Loan of ₹4,00,000. He buys Goods on credit for ₹2,50,000 and Furniture for ₹1,00,000 cash. What are Total Assets in ₹ Lakhs?',
    correctAnswer: 14.5,
    tolerance: 0.1,
    unit: 'lakhs',
    explanation: 'Total Liabilities + Capital = Capital (8L) + Bank Loan (4L) + Creditors (2.5L) = 14.5 Lakhs. Assets = Liabilities + Capital = ₹14.5 Lakhs.',
    hints: [
      'Use the Accounting Equation: Assets = External Liabilities + Capital.',
      'External Liabilities = Bank Loan (4L) + Creditors for Goods (2.5L) = 6.5L.',
      'Total Assets = 6.5L + 8.0L = 14.5 Lakhs.',
    ],
  },
  // 11. Standard: GAAP - Going Concern (c11_acc_008)
  {
    id: 'ch_11_acc_008_going_concern',
    nodeId: NODE_C11_ACC_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Tata Motors bought land in Pune in 2005 for ₹10 crore, now worth ₹85 crore in market. Why does the Balance Sheet show Historical Cost less depreciation rather than ₹85 crore?',
    options: [
      'Money Measurement concept prevents property valuation',
      'Going Concern concept assumes the enterprise will continue operating and using the land, not auctioning it off',
      'Indian Income Tax Act bans market revaluations completely',
      'The land has depreciated to zero',
    ],
    correctIndex: 1,
    explanation: 'Going Concern assumes continuity; assets are held for operational use, not immediate liquidation. Hence historical cost is retained.',
    hints: [
      'Does Tata Motors plan to sell its manufacturing factory tomorrow?',
      'If business continues indefinitely, liquidation market value is irrelevant for operations.',
      'Going Concern justifies historical cost valuation of fixed assets.',
    ],
  },
  // 12. Standard: GAAP - Revenue Recognition AS-9 (c11_acc_009)
  {
    id: 'ch_12_acc_009_rev_rec',
    nodeId: NODE_C11_ACC_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Asian Paints receives an order on 25 March 2024 with ₹50,000 advance. Paint is dispatched and delivered on 4 April 2024. Balance paid 20 April. In which FY is revenue recognised?',
    options: [
      'FY 2023-24 (when order and advance received)',
      'FY 2024-25 (when goods delivered and property in goods transferred)',
      'FY 2024-25 in proportion of cash received on 20 April only',
      'Equally split across both financial years',
    ],
    correctIndex: 1,
    explanation: 'Under AS-9 and Revenue Recognition principle, revenue is recognised when risks and rewards of ownership pass upon delivery (4 April 2024, FY 2024-25).',
    hints: [
      'When was performance completed by the seller?',
      'Advance received in March is a liability ("Advance from Customer"), not revenue.',
      'Revenue is earned when goods are delivered in April (FY 2024-25).',
    ],
  },
  // 13. Standard: Stakeholders & Accounting Fields (c11_acc_007)
  {
    id: 'ch_13_acc_007_cost_mgmt',
    nodeId: NODE_C11_ACC_007,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Tata Steel calculates the cost per tonne of hot-rolled coil at ₹52,000. The CFO uses this with competitor pricing to set next quarter\'s quotation. Identify the two fields.',
    options: [
      'Financial Accounting and Tax Accounting',
      'Cost Accounting (computation) and Management Accounting (decision-making)',
      'Book-keeping and Forensic Auditing',
      'Social Accounting and Human Resource Accounting',
    ],
    correctIndex: 1,
    explanation: 'Computing unit cost of production is Cost Accounting. Utilising that data for strategic pricing and executive decisions is Management Accounting.',
    hints: [
      'Who computes the material, labour, and overhead per unit?',
      'Who takes the cost data and prepares budgets and forecasts for executive decisions?',
      'Cost accounting measures cost; management accounting drives strategic decisions.',
    ],
  },
  // 14. Standard: Cash vs Accrual Reconciliation (c11_acc_010)
  {
    id: 'ch_14_acc_010_reconcile_num',
    nodeId: NODE_C11_ACC_010,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Dr. Verma\'s clinic collected ₹6,00,000 cash fees (including ₹40,000 advance for next year). Total expenses paid ₹3,20,000 (including ₹30,000 prepaid rent for next year). Outstanding salary is ₹20,000. What is Accrual Profit in ₹ Thousands?',
    correctAnswer: 250,
    tolerance: 1,
    unit: 'thousands',
    explanation: 'Accrual Revenue = 600k - 40k = 560k. Accrual Expenses = 320k - 30k (prepaid) + 20k (outstanding) = 310k. Accrual Profit = 560k - 310k = ₹250k.',
    hints: [
      'Accrual Revenue = Cash collected (600) − Advance for next year (40) = 560k.',
      'Accrual Expense = Paid (320) − Prepaid rent (30) + Outstanding salary (20) = 310k.',
      'Accrual Profit = 560k − 310k = 250k. Enter 250.',
    ],
  },
  // 15. Advanced: Dual Aspect & Compound Entries (c11_acc_009)
  {
    id: 'ch_15_acc_009_construct',
    nodeId: NODE_C11_ACC_009,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Build the journal entry: Bharat Traders sells goods costing ₹60,000 to Ramesh for ₹90,000 on 30-day credit.',
    availableParts: ['Dr. Ramesh A/c ₹90,000', 'Cr. Sales A/c ₹90,000', 'Dr. Cash A/c ₹90,000', 'Cr. Capital A/c ₹30,000', 'Dr. Purchases A/c ₹60,000'],
    targetState: 'Dr. Ramesh A/c ₹90,000 Cr. Sales A/c ₹90,000',
    validationHint: 'Select the Debit to Customer (Debtor) and Credit to Sales for total selling price.',
    explanation: 'Goods sold on credit are debited to Debtor (Ramesh A/c) and credited to Sales A/c for the invoice value ₹90,000.',
    hints: [
      'Ramesh is the receiver of goods on credit.',
      'Sales is nominal income credited with full sales value.',
      'Combine: Dr. Ramesh A/c ₹90,000 followed by Cr. Sales A/c ₹90,000.',
    ],
  },
  // 16. Advanced: Complete Disclosure vs Materiality (c11_acc_008)
  {
    id: 'ch_16_acc_008_materiality',
    nodeId: NODE_C11_ACC_008,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Reliance Industries buys 50 waste paper bins worth ₹1,200 each (useful life 5 years). The accountant debited "Office General Expenses" rather than capitalising as Fixed Assets. Evaluate this decision.',
    options: [
      'Gross violation of Going Concern; statutory auditor will reject accounts',
      'Justified under Materiality convention — small expense whose capitalisation does not influence economic decisions of users',
      'Violation of Money Measurement concept',
      'Illegal under Companies Act 2013 Section 129',
    ],
    correctIndex: 1,
    explanation: 'The Materiality convention permits writing off insignificant asset purchases as revenue expenses to avoid unnecessary accounting overhead without misinforming stakeholders.',
    hints: [
      'Does a ₹60,000 total bin purchase affect decisions in a ₹10,00,000 crore balance sheet?',
      'Accounting does not record trivial items as 5-year depreciating fixed assets.',
      'This is governed by the convention of Materiality.',
    ],
  },
  // 17. Advanced: Accrual vs Cash Basis Legal Mandate (c11_acc_010)
  {
    id: 'ch_17_acc_010_legal',
    nodeId: NODE_C11_ACC_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does Section 128(1) of the Companies Act 2013 prohibit companies from preparing financial statements on a pure Cash Basis?',
    options: [
      'Cash basis allows management to manipulate profits by simply holding back cheque payments or delaying client billing across year-end',
      'Cash basis cannot be computed by modern ERP computers like SAP',
      'Cash transactions are completely banned under Indian Currency regulations',
      'Cash basis double-entry causes trial balance debit-credit mismatch',
    ],
    correctIndex: 0,
    explanation: 'Cash basis creates severe timing distortion and allows management to artificially inflate or deflate profit by timing payments. Accrual ensures True & Fair view.',
    hints: [
      'What happens if a company delays paying ₹100 crore supplier bills by 3 days until 2 April?',
      'Under cash basis, that profit would artificially surge for the ending year.',
      'Section 128(1) mandates accrual to prevent window dressing.',
    ],
  },
  // 18. Advanced: Trial Balance Error Detection (c11_acc_006)
  {
    id: 'ch_18_acc_006_tb_errors',
    nodeId: NODE_C11_ACC_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A computer worth ₹75,000 bought for office use was incorrectly debited to "Purchases A/c". Will the Trial Balance still agree?',
    options: [
      'No — Trial Balance debit side will be short by ₹75,000',
      'Yes — both Machinery and Purchases have debit nature; trial balance agrees despite Error of Principle',
      'No — Trial Balance credit side will be ₹1,50,000 higher',
      'Only if recorded in the Cash Book',
    ],
    correctIndex: 1,
    explanation: 'This is an Error of Principle. Since a debit was recorded (to Purchases instead of Computers), total debits still equal total credits and the Trial Balance tallies.',
    hints: [
      'Was a debit entered? Yes (Purchases). Was a credit entered? Yes (Cash/Bank).',
      'Does Trial Balance test mathematical equality or conceptual correctness of account types?',
      'Errors of Principle do not break mathematical equality of Trial Balance.',
    ],
    misconceptionIndex: 4,
  },
  // 19. Advanced: Historical Cost vs Inflation (c11_acc_009)
  {
    id: 'ch_19_acc_009_hist_cost',
    nodeId: NODE_C11_ACC_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What is the primary danger of strictly following Historical Cost accounting during high inflation periods?',
    options: [
      'Depreciation based on historical cost understates replacement cost, resulting in overstated profits and insufficient cash to replace worn-out assets',
      'The double-entry accounting equation ceases to balance',
      'Creditors cannot be paid in depreciated currency',
      'Trial Balance requires suspense account entries',
    ],
    correctIndex: 0,
    explanation: 'Under historical cost in inflation, depreciation is based on old low purchase prices, understating true asset consumption and creating hidden capital erosion.',
    hints: [
      'When a machine bought 10 years ago for ₹5 lakh wears out, will a new one cost ₹5 lakh or ₹20 lakh?',
      'If depreciation was charged on ₹5 lakh, was enough retained profit kept to buy the replacement?',
      'Historical cost understates depreciation in inflationary times.',
    ],
  },
  // 20. Advanced: Book-keeping vs Accountancy Profession (c11_acc_005)
  {
    id: 'ch_20_acc_005_ca_act',
    nodeId: NODE_C11_ACC_005,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'The Chief Financial Officer of Tata Motors (an experienced B.Com graduate) prepares the audited annual report. Why can only a practising ICAI member sign the statutory audit report under Section 143?',
    options: [
      'Because CFO is an employee; statutory audit is an independent professional attestation reserved by ICAI Act 1949 and Companies Act 2013',
      'Because B.Com degree holders are legally classified as book-keepers only',
      'Because the CFO only knows cost accounting',
      'Because SEBI regulations ban internal CFOs from holding bank accounts',
    ],
    correctIndex: 0,
    explanation: 'Accountancy is a regulated profession under the Chartered Accountants Act 1949. Only independent practitioners with an ICAI Certificate of Practice can sign statutory audit reports under Section 143.',
    hints: [
      'Can an employee impartially audit their own employer\'s work?',
      'Accountancy is the regulated professional discipline with statutory monopoly.',
      'Section 143 requires independent CA certification.',
    ],
  },
  // 21. Advanced: Matching Principle (c11_acc_009)
  {
    id: 'ch_21_acc_009_matching_app',
    nodeId: NODE_C11_ACC_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A salesman earns a commission of 5% on sales made in March 2024 (₹20,00,000 sales). Commission is paid on 15 May 2024. Which FY must bear this ₹1,00,000 expense under Matching Principle?',
    options: [
      'FY 2024-25 because cash flowed out in May 2024',
      'FY 2023-24 because the commission was incurred to generate March 2024 sales revenue',
      'Divided 50:50 between both financial years',
      'Directly deducted from Salesman Security Deposit',
    ],
    correctIndex: 1,
    explanation: 'Matching principle dictates that expenses incurred to generate revenue must be charged in the same period as that revenue (FY 2023-24).',
    hints: [
      'In which period was the ₹20,00,000 sales revenue recognised?',
      'Matching principle requires expense to pair with its related revenue.',
      'FY 2023-24 earned the revenue; it must bear the commission expense.',
    ],
  },
  // 22. Advanced: Drag-sort Complete Accounting Cycle (c11_acc_006)
  {
    id: 'ch_22_acc_006_full_cycle',
    nodeId: NODE_C11_ACC_006,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the concluding stages of the Accounting Cycle in exact statutory sequence.',
    sortItems: [
      'Trial Balance Preparation',
      'Trading Account (Gross Profit)',
      'Profit & Loss Account (Net Profit)',
      'Balance Sheet (Financial Position)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Trial Balance feeds the Trading Account (Gross Profit) → P&L Account (Net Profit) → Net Profit transferred to Capital in the final Balance Sheet.',
    hints: [
      'Gross Profit from Trading Account is needed before Net Profit in P&L.',
      'Net profit from P&L is required to balance the Capital in the Balance Sheet.',
      'Order: Trial Balance → Trading A/c → P&L A/c → Balance Sheet.',
    ],
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

// ─── DEFAULT ENRICHED PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_ACC_001,
  title: 'Background, History, Types of Accounts & GAAP Foundations',
  definition:
    'Accounting is the art and science of recording, classifying, summarising, and interpreting financial transactions based on foundational GAAP conventions and statutory standards.',
  eli5:
    'Think of accounting as the scoreboard of a business. It tells you what you own (Assets), what you owe (Liabilities), what you made (Revenue/Profit), and what you spent (Expenses), following strict rules so nobody cheats.',
  misconceptions: [
    {
      misconception: 'Machinery A/c is a Nominal account because depreciation appears in P&L.',
      correction: 'Machinery is a Tangible Real Account. Depreciation is the separate Nominal expense account.',
    },
    {
      misconception: 'Capital is not a liability because it belongs to the business owner.',
      correction: 'Under Business Entity concept, the firm and owner are separate; Capital is an Internal Liability.',
    },
    {
      misconception: 'Goodwill is a Nominal account because you cannot touch it.',
      correction: 'Goodwill is an Intangible Real Account representing business reputation and valuable rights.',
    },
    {
      misconception: 'The appointment of a new CEO is a financial transaction.',
      correction: 'Appointment is a non-monetary event. Only when salary is paid/due does it become a transaction.',
    },
    {
      misconception: 'A tallying Trial Balance guarantees that the accounting books are 100% error-free.',
      correction: 'Trial balance only proves arithmetic debit-credit equality. Errors of principle and omission still lurk undetected.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which of the following is a Personal Account?',
      options: ['Machinery A/c', 'Salary A/c', 'Tata Motors A/c', 'Cash A/c'],
      correctIndex: 2,
    },
    {
      question: 'Who codified the Double Entry system in Venice in 1494?',
      options: ['Kautilya', 'Luca Pacioli', 'Adam Smith', 'Alfred Marshall'],
      correctIndex: 1,
    },
    {
      question: 'Under AS-29, how are Contingent Liabilities disclosed?',
      options: ['Debited in P&L', 'Footnote in Notes to Accounts', 'Deducted from Cash', 'Ignored completely'],
      correctIndex: 1,
    },
    {
      question: 'Which GAAP concept separates the owner from the enterprise?',
      options: ['Going Concern', 'Accounting Entity', 'Money Measurement', 'Historical Cost'],
      correctIndex: 1,
    },
    {
      question: 'Accrual basis recognises revenue when:',
      options: ['Cash is received', 'Revenue is earned upon delivery', 'Cheque clears the bank', 'At year-end audit'],
      correctIndex: 1,
    },
    {
      question: 'The ancient Indian treatise on state accounts by Kautilya is called:',
      options: ['Arthashastra', 'Bahi-Khata', 'Manusmriti', 'Patanjali Sutra'],
      correctIndex: 0,
    },
    {
      question: 'Which stage immediately follows Journal entries in the accounting cycle?',
      options: ['Trial Balance', 'Ledger Posting', 'Balance Sheet', 'Trading Account'],
      correctIndex: 1,
    },
    {
      question: 'Section 128(1) of Companies Act 2013 mandates which basis of accounting?',
      options: ['Cash Basis', 'Accrual Basis', 'Hybrid Basis', 'Single Entry'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Mastery achieved when student accurately classifies accounts, distinguishes assets/liabilities, reconciles cash vs accrual profits, and maps transaction flows across the accounting cycle.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Golden 3-Way Classification (Real, Personal, Nominal)',
    instruction: 'Click each transaction item to see which golden bucket it enters and the debit-credit rule applied.',
    interactionType: 'click-account',
    nodeId: NODE_C11_ACC_001,
  },
  {
    title: '2. The Accounting Balance Scale (Assets = Liabilities + Capital)',
    instruction: 'Adjust the Asset, Liability, and Capital sliders to watch the dual aspect balance scale respond in real-time.',
    interactionType: 'slider-balance',
    nodeId: NODE_C11_ACC_002,
  },
  {
    title: '3. Cash Basis vs Accrual Basis Simulator',
    instruction: 'Toggle between Cash and Accrual bases and slide credit sales & unpaid expenses to observe real-time profit shifts.',
    interactionType: 'basis-compare',
    nodeId: NODE_C11_ACC_010,
  },
  {
    title: '4. The 8-Stage Accounting Pipeline',
    instruction: 'Click each stage of the accounting pipeline to trace a ₹10,00,000 Tata Motors parts sale from Voucher to Balance Sheet.',
    interactionType: 'pipeline-trace',
    nodeId: NODE_C11_ACC_006,
  },
  {
    title: '5. Stakeholder Lens & Accounting Fields',
    instruction: 'Select different corporate stakeholders (Bank, Investor, Tax Dept, Factory Manager) to see which accounting branch serves them.',
    interactionType: 'stakeholder-lens',
    nodeId: NODE_C11_ACC_007,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Senior Auditor at Tata Consultancy Services (TCS)',
  description:
    'Download the latest published Annual Report of TCS or Tata Motors. Navigate to Note 2 (Significant Accounting Policies) and Note 28 (Contingent Liabilities).',
  steps: [
    'Confirm that TCS states financial statements are prepared on the Accrual Basis under Historical Cost.',
    'Identify 3 tangible assets and 2 intangible assets on the Balance Sheet face.',
    'Check the Notes to Accounts for contingent tax claims not acknowledged as debts.',
    'Verify that the Accounting Equation (Assets = Liabilities + Equity) tallies to the exact rupee crore.',
  ],
};

function C11_AccountancyBackgroundHistoryTypesSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C11_ACC_001,
    title = DEFAULT_PROPS.title || 'Accountancy Background & Types of Accounts',
    misconceptions = DEFAULT_PROPS.misconceptions,
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['accountancy'] || { name: 'Accountancy', emoji: '📚', color: 'indigo' };

  // ──�� 40+ STATE DECLARATIONS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints & feedback states
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Discovery & Predict-Check states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-Then-Check and Observation states
  const [activePredictIdx, setActivePredictIdx] = useState(0);
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [predSubmitted, setPredSubmitted] = useState<Record<number, boolean>>({});
  const [activeObsIdx, setActiveObsIdx] = useState(0);
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [obsSubmitted, setObsSubmitted] = useState<Record<number, boolean>>({});
  const [exploreTab, setExploreTab] = useState<'sim' | 'predict' | 'observe'>('sim');

  // Sim-engine feedback UI states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Challenge Drag & Construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection states
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Interactive Lab 1: Golden Rules Explorer
  const [selectedAccountDemo, setSelectedAccountDemo] = useState<'machinery' | 'sbi' | 'salary' | 'goodwill' | 'drawings'>('machinery');

  // Interactive Lab 2: Balance Scale Simulator
  const [simAssets, setSimAssets] = useState(1500000); // 15 Lakh
  const [simLiab, setSimLiab] = useState(500000);     // 5 Lakh
  const [simCapital, setSimCapital] = useState(1000000); // 10 Lakh

  // Interactive Lab 3: Cash vs Accrual Simulator
  const [simBasis, setSimBasis] = useState<'cash' | 'accrual'>('accrual');
  const [simCreditSales, setSimCreditSales] = useState(300000);
  const [simCashSales, setSimCashSales] = useState(400000);
  const [simUnpaidExp, setSimUnpaidExp] = useState(100000);
  const [simCashExp, setSimCashExp] = useState(250000);
  const [simPrepaidExp, setSimPrepaidExp] = useState(50000);

  // Interactive Lab 4: Accounting Pipeline
  const [activePipelineStep, setActivePipelineStep] = useState(0);

  // Interactive Lab 5: Stakeholder Lens
  const [selectedStakeholder, setSelectedStakeholder] = useState<'bank' | 'investor' | 'tax' | 'manager'>('bank');

  // Sandbox variables
  const [sandboxAssetVal, setSandboxAssetVal] = useState(2000000);
  const [sandboxDepreciationRate, setSandboxDepreciationRate] = useState(10);
  const [sandboxYears, setSandboxYears] = useState(3);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES (Memoized) ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Live calculation: Accrual vs Cash profit
  const liveCashProfit = useMemo(() => {
    return simCashSales - (simCashExp + simPrepaidExp);
  }, [simCashSales, simCashExp, simPrepaidExp]);

  const liveAccrualProfit = useMemo(() => {
    const revenue = simCashSales + simCreditSales;
    const expenses = simCashExp + simUnpaidExp;
    return revenue - expenses;
  }, [simCashSales, simCreditSales, simCashExp, simUnpaidExp]);

  // Balance scale delta
  const scaleDiff = useMemo(() => {
    return simAssets - (simLiab + simCapital);
  }, [simAssets, simLiab, simCapital]);

  // ─── EFFECTS ───
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
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  useEffect(() => {
    if (phase === 'explore') {
      speechManager.speak(EXPLORATION_STEPS[currentSlide].title);
    }
  }, [phase, currentSlide]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#1e1b4b');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const xPos = (frame * 2) % (canvas.width + 100) - 50;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(xPos, 16, 6 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(
        `Dual Aspect Engine Active: Dr. = Cr.  |  ICAI Standards Compliant  |  Accounting Equation in Balance`,
        canvas.width / 2 - 160,
        20
      );
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── HANDLERS ───
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on! The Entity concept separates owner from firm.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the core principles interactively.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test different scenarios freely in the sandbox without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for the official audit challenges!');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const base = prev.length > 0 ? [...prev] : (challenge.sortItems || []).map((_, i) => i);
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Mumbai Audit simulation.');
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
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Well done.');
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

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the statutory explanation together.');
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
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  const handleAccountTypeClick = useCallback((acc: 'machinery' | 'sbi' | 'salary' | 'goodwill' | 'drawings') => {
    setSelectedAccountDemo(acc);
    audioManager.play('tap');
    const descriptions: Record<string, string> = {
      machinery: 'Machinery A/c is Tangible Real. Debit what comes in upon acquisition.',
      sbi: 'SBI Bank A/c is Artificial Personal. Debit the receiver, credit the giver.',
      salary: 'Salary A/c is Nominal. Debit all expenses and losses.',
      goodwill: 'Goodwill A/c is Intangible Real. Represents business reputation.',
      drawings: 'Drawings A/c is Nominal/Reduction of Capital under the Entity concept.',
    };
    speechManager.speak(descriptions[acc]);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Class 11 ISC Commerce</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700">NEP 2020 Aligned</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Dynamic difficulty & phase pill */}
        <div className="flex items-center gap-2">
          <motion.span
            key={phase}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300"
          >
            Phase: {phase}
          </motion.span>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={
              'text-xs font-bold uppercase px-3 py-1 rounded-full border ' +
              (difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-700'
                : 'bg-indigo-950/60 text-indigo-400 border-indigo-700')
            }
          >
            Tier: {difficulty}
          </motion.span>
        </div>
      </motion.div>

      {/* Top 2D Animation Ticker Canvas */}
      <div className="w-full overflow-hidden rounded-xl mb-4 border border-slate-800 shadow-inner">
        <canvas ref={canvasRef} width={800} height={32} className="w-full block" />
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/80 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🏛️ Real-World Case Scenario</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-base leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-sm text-amber-300 font-medium">
              💡 {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold px-2 py-1 rounded bg-amber-500/20 text-amber-300 uppercase">Curiosity Hook</span>
            <h3 className="text-lg font-bold text-white mt-2 mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${idx + 1}: ${option}`}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800">
                <p className={`text-sm font-semibold mb-4 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! The Accounting Entity Concept separates the owner from the enterprise.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Advance to Interactive Exploration"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Exploration Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: BRILLIANT INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Mode Switcher inside Explore (Sim / Predict-Then-Check / Observations) */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setExploreTab('sim')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  exploreTab === 'sim'
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                🔬 Interactive Lab
              </button>
              <button
                onClick={() => setExploreTab('predict')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  exploreTab === 'predict'
                    ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                🔮 Predict-Then-Check ({PREDICTION_QUESTIONS.length})
              </button>
              <button
                onClick={() => setExploreTab('observe')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  exploreTab === 'observe'
                    ? 'bg-teal-600 text-white border-teal-400 shadow-md'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                👁️ What Do You Notice? ({OBSERVATION_QUESTIONS.length})
              </button>
            </div>
            <span className="text-xs font-bold text-slate-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          {/* TAB 1: INTERACTIVE SIMULATION LAB */}
          {exploreTab === 'sim' && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Interactive Discovery Lab</span>
                  <h2 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
                </div>
              </div>

              <div className="p-3 bg-indigo-950/40 border border-indigo-800/60 rounded-xl text-sm text-indigo-200 flex items-center gap-2">
                <span>👉</span>
                <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
              </div>

              {/* Interactive Slide Visualizations */}
              <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 min-h-[380px]">
                {/* Lab 1: Golden 3-Way Classification (SVG Diagram 1) */}
                {currentSlide === 0 && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {(
                        [
                          { id: 'machinery', label: 'Machinery A/c (Asset)' },
                          { id: 'sbi', label: 'SBI Bank A/c (Institution)' },
                          { id: 'salary', label: 'Salary A/c (Expense)' },
                          { id: 'goodwill', label: 'Goodwill A/c (Brand Value)' },
                          { id: 'drawings', label: 'Drawings A/c (Personal)' },
                        ] as const
                      ).map((acc) => (
                        <motion.button
                          key={acc.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAccountTypeClick(acc.id)}
                          aria-label={`Select ${acc.label}`}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                            selectedAccountDemo === acc.id
                              ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/40'
                              : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          {acc.label}
                        </motion.button>
                      ))}
                    </div>

                    {/* SVG 1: 3 Golden Buckets */}
                    <svg viewBox="0 0 600 240" className="w-full max-w-3xl mx-auto block">
                      {/* Personal Bucket */}
                      <g transform="translate(20, 20)">
                        <rect
                          x="0"
                          y="0"
                          width="165"
                          height="190"
                          rx="16"
                          fill="#1e1b4b"
                          stroke={selectedAccountDemo === 'sbi' ? '#38bdf8' : '#4338ca'}
                          strokeWidth={selectedAccountDemo === 'sbi' ? 3 : 1.5}
                        />
                        <text x="82" y="32" textAnchor="middle" fill="#93c5fd" fontSize="13" fontWeight="bold">
                          👤 PERSONAL
                        </text>
                        <text x="82" y="52" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                          Persons & Corporate Bodies
                        </text>
                        <rect x="12" y="65" width="141" height="55" rx="8" fill="#0f172a" />
                        <text x="82" y="85" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="bold">
                          Debit The Receiver
                        </text>
                        <text x="82" y="105" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">
                          Credit The Giver
                        </text>
                        <text x="82" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">
                          e.g., SBI, Tata Motors A/c
                        </text>
                      </g>

                      {/* Real Bucket */}
                      <g transform="translate(215, 20)">
                        <rect
                          x="0"
                          y="0"
                          width="170"
                          height="190"
                          rx="16"
                          fill="#064e3b"
                          stroke={selectedAccountDemo === 'machinery' || selectedAccountDemo === 'goodwill' ? '#34d399' : '#059669'}
                          strokeWidth={selectedAccountDemo === 'machinery' || selectedAccountDemo === 'goodwill' ? 3 : 1.5}
                        />
                        <text x="85" y="32" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="bold">
                          🏢 REAL
                        </text>
                        <text x="85" y="52" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                          Tangible & Intangible Assets
                        </text>
                        <rect x="12" y="65" width="146" height="55" rx="8" fill="#0f172a" />
                        <text x="85" y="85" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
                          Debit What Comes In
                        </text>
                        <text x="85" y="105" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">
                          Credit What Goes Out
                        </text>
                        <text x="85" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">
                          e.g., Cash, Machinery, Goodwill
                        </text>
                      </g>

                      {/* Nominal Bucket */}
                      <g transform="translate(415, 20)">
                        <rect
                          x="0"
                          y="0"
                          width="165"
                          height="190"
                          rx="16"
                          fill="#701a75"
                          stroke={selectedAccountDemo === 'salary' || selectedAccountDemo === 'drawings' ? '#f472b6' : '#a21caf'}
                          strokeWidth={selectedAccountDemo === 'salary' || selectedAccountDemo === 'drawings' ? 3 : 1.5}
                        />
                        <text x="82" y="32" textAnchor="middle" fill="#f0abfc" fontSize="13" fontWeight="bold">
                          📊 NOMINAL
                        </text>
                        <text x="82" y="52" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                          Expenses, Losses, Incomes, Gains
                        </text>
                        <rect x="12" y="65" width="141" height="55" rx="8" fill="#0f172a" />
                        <text x="82" y="85" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                          Debit Expenses & Losses
                        </text>
                        <text x="82" y="105" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">
                          Credit Incomes & Gains
                        </text>
                        <text x="82" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10">
                          e.g., Salary, Rent, Discount
                        </text>
                      </g>
                    </svg>
                  </div>
                )}

                {/* Lab 2: Balance Scale (SVG Diagram 2) */}
                {currentSlide === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <label className="text-xs font-bold text-blue-400 block mb-1">Total Assets: ₹{(simAssets / 100000).toFixed(1)} Lakhs</label>
                        <input
                          type="range"
                          min={500000}
                          max={3000000}
                          step={50000}
                          value={simAssets}
                          onChange={(e) => setSimAssets(Number(e.target.value))}
                          aria-label="Adjust Total Assets"
                          className="w-full accent-blue-500"
                        />
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <label className="text-xs font-bold text-emerald-400 block mb-1">External Liabilities: ₹{(simLiab / 100000).toFixed(1)} Lakhs</label>
                        <input
                          type="range"
                          min={100000}
                          max={1500000}
                          step={50000}
                          value={simLiab}
                          onChange={(e) => setSimLiab(Number(e.target.value))}
                          aria-label="Adjust External Liabilities"
                          className="w-full accent-emerald-500"
                        />
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <label className="text-xs font-bold text-purple-400 block mb-1">Owner Capital: ₹{(simCapital / 100000).toFixed(1)} Lakhs</label>
                        <input
                          type="range"
                          min={100000}
                          max={2000000}
                          step={50000}
                          value={simCapital}
                          onChange={(e) => setSimCapital(Number(e.target.value))}
                          aria-label="Adjust Owner Capital"
                          className="w-full accent-purple-500"
                        />
                      </div>
                    </div>

                    {/* SVG 2: Interactive Dynamic Accounting Balance Scale */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-2">
                      <div className="w-full md:w-1/2 flex justify-center">
                        <svg viewBox="0 0 320 200" className="w-full max-w-[280px]">
                          {/* Fulcrum base */}
                          <polygon points="160,130 130,180 190,180" fill="#334155" stroke="#64748b" strokeWidth="2" />
                          {/* Lever Arm with dynamic tilt */}
                          {(() => {
                            const tilt = Math.max(-15, Math.min(15, (scaleDiff / 200000) * 8));
                            const leftY = 130 + tilt * 2;
                            const rightY = 130 - tilt * 2;
                            return (
                              <g>
                                <line x1="40" y1={leftY} x2="280" y2={rightY} stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                                {/* Left Pan (Assets) */}
                                <line x1="60" y1={leftY} x2="40" y2={leftY + 35} stroke="#94a3b8" strokeWidth="2" />
                                <line x1="60" y1={leftY} x2="80" y2={leftY + 35} stroke="#94a3b8" strokeWidth="2" />
                                <ellipse cx="60" cy={leftY + 35} rx="30" ry="8" fill="#2563eb" />
                                <text x="60" y={leftY + 38} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Assets</text>
                                {/* Right Pan (Liabilities + Capital) */}
                                <line x1="260" y1={rightY} x2="240" y2={rightY + 35} stroke="#94a3b8" strokeWidth="2" />
                                <line x1="260" y1={rightY} x2="280" y2={rightY + 35} stroke="#94a3b8" strokeWidth="2" />
                                <ellipse cx="260" cy={rightY + 35} rx="34" ry="8" fill="#10b981" />
                                <text x="260" y={rightY + 38} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Liab + Cap</text>
                                {/* Center Pivot */}
                                <circle cx="160" cy="130" r="7" fill="#e2e8f0" />
                              </g>
                            );
                          })()}
                        </svg>
                      </div>

                      <div className="w-full md:w-1/2 p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                        <div className="text-sm text-slate-400">Dual Aspect Status</div>
                        <div className={`text-2xl font-black mt-1 ${scaleDiff === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {scaleDiff === 0 ? '⚖️ Perfectly Balanced (Assets = L + C)' : `⚠️ Imbalance by ₹${Math.abs(scaleDiff / 100000).toFixed(2)} Lakhs`}
                        </div>
                        <p className="text-xs text-slate-400 mt-2">
                          Assets (₹{(simAssets / 100000).toFixed(1)}L) must exactly equal Liabilities (₹{(simLiab / 100000).toFixed(1)}L) + Capital (₹{(simCapital / 100000).toFixed(1)}L).
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lab 3: Cash vs Accrual Basis Simulator */}
                {currentSlide === 2 && (
                  <div className="space-y-4">
                    <div className="flex justify-center gap-2 mb-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSimBasis('cash');
                          audioManager.play('tap');
                        }}
                        aria-label="Switch to Cash Basis"
                        className={`px-5 py-2 rounded-xl text-xs font-bold border ${
                          simBasis === 'cash' ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        💵 Cash Basis (Cash Flow Trigger)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSimBasis('accrual');
                          audioManager.play('tap');
                        }}
                        aria-label="Switch to Accrual Basis"
                        className={`px-5 py-2 rounded-xl text-xs font-bold border ${
                          simBasis === 'accrual' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        📈 Accrual Basis (Sec 128(1) Mandate)
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                        <h4 className="text-xs font-bold uppercase text-slate-400">Transaction Variables</h4>
                        <div>
                          <label className="text-xs text-slate-300 block">Credit Sales (Goods delivered, cash due in May): ₹{(simCreditSales / 1000).toFixed(0)}k</label>
                          <input
                            type="range"
                            min={0}
                            max={600000}
                            step={25000}
                            value={simCreditSales}
                            onChange={(e) => setSimCreditSales(Number(e.target.value))}
                            aria-label="Credit Sales Slider"
                            className="w-full accent-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-300 block">Unpaid Salaries for March: ₹{(simUnpaidExp / 1000).toFixed(0)}k</label>
                          <input
                            type="range"
                            min={0}
                            max={300000}
                            step={10000}
                            value={simUnpaidExp}
                            onChange={(e) => setSimUnpaidExp(Number(e.target.value))}
                            aria-label="Unpaid Salaries Slider"
                            className="w-full accent-rose-500"
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center text-center">
                        <div className="text-xs font-bold text-slate-400 uppercase">Computed FY Profit for March</div>
                        <div className="text-3xl font-black text-emerald-400 mt-2">
                          ₹{(simBasis === 'accrual' ? liveAccrualProfit : liveCashProfit).toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs text-slate-400 mt-2">
                          {simBasis === 'accrual'
                            ? 'Accrual captures ₹' + (simCreditSales / 1000) + 'k earned sales and charges ₹' + (simUnpaidExp / 1000) + 'k incurred salaries.'
                            : 'Cash basis completely ignores the credit sale and unpaid salary until money physically moves!'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lab 4: 8-Stage Accounting Pipeline (SVG Diagram 3) */}
                {currentSlide === 3 && (
                  <div className="space-y-4">
                    {/* SVG 3: Interactive Accounting Cycle Pipeline Flow */}
                    <svg viewBox="0 0 640 90" className="w-full max-w-4xl mx-auto block">
                      {[
                        { title: '1. Txn', x: 10 },
                        { title: '2. Voucher', x: 88 },
                        { title: '3. Journal', x: 166 },
                        { title: '4. Ledger', x: 244 },
                        { title: '5. Trial Bal', x: 322 },
                        { title: '6. Trading', x: 400 },
                        { title: '7. P&L', x: 478 },
                        { title: '8. Bal Sheet', x: 556 },
                      ].map((step, idx) => (
                        <g
                          key={idx}
                          onClick={() => {
                            setActivePipelineStep(idx);
                            audioManager.play('tap');
                          }}
                          className="cursor-pointer"
                        >
                          <rect
                            x={step.x}
                            y="15"
                            width="70"
                            height="45"
                            rx="8"
                            fill={activePipelineStep === idx ? '#4f46e5' : '#1e293b'}
                            stroke={activePipelineStep === idx ? '#818cf8' : '#475569'}
                            strokeWidth={activePipelineStep === idx ? 2 : 1}
                          />
                          <text
                            x={step.x + 35}
                            y="42"
                            textAnchor="middle"
                            fill={activePipelineStep === idx ? '#ffffff' : '#94a3b8'}
                            fontSize="10"
                            fontWeight="bold"
                          >
                            {step.title}
                          </text>
                          {idx < 7 && (
                            <path
                              d={`M ${step.x + 72} 37 L ${step.x + 85} 37`}
                              stroke="#64748b"
                              strokeWidth="2"
                              markerEnd="url(#arrow)"
                            />
                          )}
                        </g>
                      ))}
                      <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                        </marker>
                      </defs>
                    </svg>

                    <div className="p-5 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-xs font-bold uppercase text-indigo-400 mb-1">
                        Stage {activePipelineStep + 1}: {
                          [
                            'Transaction Occurrence',
                            'Source Voucher Generation',
                            'Recording in Books of Original Entry (Journal)',
                            'Classifying in Ledger Accounts',
                            'Summarising in Trial Balance',
                            'Computing Gross Profit in Trading Account',
                            'Computing Net Profit in Profit & Loss Account',
                            'Final Financial Position in Balance Sheet',
                          ][activePipelineStep]
                        }
                      </div>
                      <p className="text-sm text-slate-200 mt-2">
                        {
                          [
                            'Bharat AutoTech delivers ₹10,00,000 auto parts to Tata Motors on credit. Financial position changes.',
                            'Sales Department issues Sales Invoice SI/2024/045. This serves as the documentary audit proof.',
                            'Journal entry recorded: Dr. Tata Motors (Debtor) ₹10,00,000 / Cr. Sales A/c ₹10,00,000.',
                            'Posted into Debtors Ledger (Tata Motors A/c) and General Ledger (Sales A/c) to track balances.',
                            'Listing of all debit and credit balances to verify arithmetic accuracy (Debits = Credits).',
                            'Matching Revenue with Direct Manufacturing Costs to determine Gross Profit = Sales − COGS.',
                            'Deducting Indirect Overheads (Rent, Salaries, Depreciation) to arrive at true Net Profit.',
                            'Assets (Debtors ₹10L) = Liabilities + Capital (Net Profit transferred to Owner Equity). The cycle completes!',
                          ][activePipelineStep]
                        }
                      </p>
                    </div>
                  </div>
                )}

                {/* Lab 5: Stakeholder Lens */}
                {currentSlide === 4 && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap justify-center gap-2">
                      {(
                        [
                          { id: 'bank', label: '🏦 SBI (Lender)', role: 'External User' },
                          { id: 'investor', label: '📈 Retail Shareholder', role: 'External User' },
                          { id: 'tax', label: '🏛️ Income Tax Dept (CBDT)', role: 'External User' },
                          { id: 'manager', label: '👨‍💼 Plant Manager', role: 'Internal User' },
                        ] as const
                      ).map((s) => (
                        <motion.button
                          key={s.id}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => {
                            setSelectedStakeholder(s.id);
                            audioManager.play('tap');
                          }}
                          aria-label={`Select stakeholder ${s.label}`}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                            selectedStakeholder === s.id
                              ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {s.label} ({s.role})
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-5 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-sm font-bold text-amber-300 mb-2">
                        {selectedStakeholder === 'bank' && 'State Bank of India — Credit Committee Focus'}
                        {selectedStakeholder === 'investor' && 'Equity Shareholder — Investment Decision'}
                        {selectedStakeholder === 'tax' && 'Central Board of Direct Taxes — Compliance'}
                        {selectedStakeholder === 'manager' && 'Factory Production Head — Cost Optimization'}
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {selectedStakeholder === 'bank' &&
                          'Examines the Balance Sheet debt-equity ratio, current liquidity ratio (Current Assets / Current Liabilities), and interest coverage to decide whether to sanction a ₹5 crore working-capital loan.'}
                        {selectedStakeholder === 'investor' &&
                          'Scrutinises Earnings Per Share (EPS), Return on Capital Employed (ROCE), and profit trajectory in the P&L statement to decide whether to buy, hold, or sell shares on BSE/NSE.'}
                        {selectedStakeholder === 'tax' &&
                          'Applies the Income Tax Act 1961 on audited business profits computed in the Profit & Loss Account to assess corporate income tax at statutory rates (25.17% / 30%).'}
                        {selectedStakeholder === 'manager' &&
                          'Uses Cost Accounting reports (cost sheets, scrap variance, labour idle time) to determine whether to automate assembly lines or replace supplier titanium dioxide pigments.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Slide Navigation Buttons */}
              <div className="flex justify-between items-center pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  aria-label="Previous Lab"
                  className="px-5 py-2.5 bg-slate-800 text-white font-bold rounded-xl border border-slate-700 disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>
                <div className="flex gap-1.5">
                  {EXPLORATION_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === currentSlide ? 'bg-indigo-500 w-6' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide((s) => s + 1)}
                    aria-label="Next Lab"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Go to Free Sandbox"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                  >
                    Free Sandbox Arena →
                  </motion.button>
                )}
              </div>
            </>
          )}

          {/* TAB 2: PREDICTION QUESTIONS (Predict-Then-Check Pattern) */}
          {exploreTab === 'predict' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-amber-800/80 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">🔮 Predict-Then-Check</span>
                  <h3 className="text-lg font-black text-white">
                    Prediction Question {activePredictIdx + 1} of {PREDICTION_QUESTIONS.length}
                  </h3>
                </div>
                <div className="flex gap-2">
                  {PREDICTION_QUESTIONS.map((_, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => setActivePredictIdx(pIdx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        activePredictIdx === pIdx ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Q{pIdx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-base font-bold text-white">
                {PREDICTION_QUESTIONS[activePredictIdx].question}
              </div>

              <div className="space-y-3">
                {PREDICTION_QUESTIONS[activePredictIdx].options.map((opt, oIdx) => {
                  const isSelected = predAnswers[activePredictIdx] === oIdx;
                  const isSubmitted = predSubmitted[activePredictIdx];
                  const isCorrect = oIdx === PREDICTION_QUESTIONS[activePredictIdx].correctIndex;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => {
                        if (!isSubmitted) {
                          setPredAnswers((prev) => ({ ...prev, [activePredictIdx]: oIdx }));
                        }
                      }}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                        isSubmitted
                          ? isCorrect
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                            : isSelected
                            ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                            : 'bg-slate-950/40 border-slate-800 text-slate-500'
                          : isSelected
                          ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                          : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {!predSubmitted[activePredictIdx] ? (
                <button
                  disabled={predAnswers[activePredictIdx] === undefined}
                  onClick={() => {
                    setPredSubmitted((prev) => ({ ...prev, [activePredictIdx]: true }));
                    audioManager.play('pop');
                  }}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-bold rounded-xl"
                >
                  Lock in Prediction →
                </button>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold uppercase text-amber-400">🔍 How to Check & Verify:</div>
                  <p className="text-xs text-amber-200">{PREDICTION_QUESTIONS[activePredictIdx].verifyInstruction}</p>
                  <div className="text-xs text-slate-300">{PREDICTION_QUESTIONS[activePredictIdx].explanation}</div>
                </motion.div>
              )}
            </div>
          )}

          {/* TAB 3: OBSERVATION QUESTIONS (What Do You Notice Pattern) */}
          {exploreTab === 'observe' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-teal-800/80 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400">👁️ Guided Observation</span>
                  <h3 className="text-lg font-black text-white">
                    Observation Question {activeObsIdx + 1} of {OBSERVATION_QUESTIONS.length}
                  </h3>
                </div>
                <div className="flex gap-2">
                  {OBSERVATION_QUESTIONS.map((_, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => setActiveObsIdx(oIdx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        activeObsIdx === oIdx ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Obs {oIdx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-base font-bold text-white">
                {OBSERVATION_QUESTIONS[activeObsIdx].question}
              </div>

              <div className="space-y-3">
                {OBSERVATION_QUESTIONS[activeObsIdx].observableOptions.map((opt, oIdx) => {
                  const isSelected = obsAnswers[activeObsIdx] === oIdx;
                  const isSubmitted = obsSubmitted[activeObsIdx];
                  const isCorrect = oIdx === OBSERVATION_QUESTIONS[activeObsIdx].correctIndex;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => {
                        if (!isSubmitted) {
                          setObsAnswers((prev) => ({ ...prev, [activeObsIdx]: oIdx }));
                        }
                      }}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                        isSubmitted
                          ? isCorrect
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                            : isSelected
                            ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                            : 'bg-slate-950/40 border-slate-800 text-slate-500'
                          : isSelected
                          ? 'bg-teal-950/60 border-teal-500 text-teal-200'
                          : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {!obsSubmitted[activeObsIdx] ? (
                <button
                  disabled={obsAnswers[activeObsIdx] === undefined}
                  onClick={() => {
                    setObsSubmitted((prev) => ({ ...prev, [activeObsIdx]: true }));
                    audioManager.play('pop');
                  }}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white font-bold rounded-xl"
                >
                  Verify Observation →
                </button>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold uppercase text-teal-400">💡 Observation Insight:</div>
                  <div className="text-xs text-slate-300">{OBSERVATION_QUESTIONS[activeObsIdx].explanation}</div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX (No Grading Pressure) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-black text-white">🎛️ Accounting Sandbox Arena</h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-700 font-bold">
                Ungraded Free Play
              </span>
            </div>
            <p className="text-sm text-slate-300">
              Experiment freely with Historical Cost vs Depreciation amortization over time. Watch the Net Book Value change under Going Concern!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-slate-400 block mb-1">
                  Machine Acquisition Cost: ₹{(sandboxAssetVal / 100000).toFixed(1)} Lakhs
                </label>
                <input
                  type="range"
                  min={500000}
                  max={5000000}
                  step={100000}
                  value={sandboxAssetVal}
                  onChange={(e) => setSandboxAssetVal(Number(e.target.value))}
                  aria-label="Sandbox Machine Cost"
                  className="w-full accent-indigo-500"
                />
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-slate-400 block mb-1">Annual Depreciation Rate: {sandboxDepreciationRate}%</label>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={sandboxDepreciationRate}
                  onChange={(e) => setSandboxDepreciationRate(Number(e.target.value))}
                  aria-label="Sandbox Depreciation Rate"
                  className="w-full accent-amber-500"
                />
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-slate-400 block mb-1">Years of Operational Use: {sandboxYears} Years</label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={sandboxYears}
                  onChange={(e) => setSandboxYears(Number(e.target.value))}
                  aria-label="Sandbox Years"
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            {/* Sandbox Result Output */}
            <div className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-xs text-slate-400 block">Historical Cost (Asset)</span>
                <span className="text-lg font-black text-white">₹{(sandboxAssetVal / 100000).toFixed(2)} Lakhs</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Accumulated Depreciation (Nominal P&L)</span>
                <span className="text-lg font-black text-rose-400">
                  ₹{(((sandboxAssetVal * (sandboxDepreciationRate / 100)) * sandboxYears) / 100000).toFixed(2)} Lakhs
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Net Book Value on Balance Sheet</span>
                <span className="text-lg font-black text-emerald-400">
                  ₹{(Math.max(0, sandboxAssetVal - (sandboxAssetVal * (sandboxDepreciationRate / 100)) * sandboxYears) / 100000).toFixed(2)} Lakhs
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase('explore')}
              aria-label="Back to Labs"
              className="px-5 py-2.5 bg-slate-800 text-slate-200 font-bold rounded-xl border border-slate-700"
            >
              ← Back to Guided Labs
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Start Official Challenges"
              className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-xl shadow-xl shadow-emerald-600/30"
            >
              Ready for Official Audit Challenges! →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: OFFICIAL CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Header & Progress Bar */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Competency: {challenge.competencyLevel.toUpperCase()}
              </span>
              <h2 className="text-lg font-black text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
              Score: {scoreBreakdown.correct} / {scoreBreakdown.total}
            </span>
          </div>

          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Box */}
          <div
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="text-base font-bold text-white mb-4">{challenge.question}</div>

            {/* MCQ Challenges (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Drag item ${item.label}`}
                      className="px-3 py-1.5 bg-indigo-700 text-white text-xs font-bold rounded-lg cursor-grab active:cursor-grabbing border border-indigo-500"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['slot_personal', 'slot_real', 'slot_nominal'].map((slotId) => (
                    <div
                      key={slotId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(slotId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[90px] flex flex-col justify-center items-center"
                    >
                      <span className="text-xs font-bold text-slate-400 uppercase mb-1">
                        {slotId === 'slot_personal' ? 'Personal A/c Target' : slotId === 'slot_real' ? 'Real A/c Target' : 'Nominal A/c Target'}
                      </span>
                      {droppedLabels[slotId] ? (
                        <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500 text-xs font-bold">
                          ✓ {droppedLabels[slotId]}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-600">Drop Here</span>
                      )}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Check Drag-Label Mapping"
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl"
                >
                  Verify Classification →
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => handleDragStart(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0', 10);
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                    className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-sm text-slate-200 cursor-grab flex items-center justify-between"
                  >
                    <span>
                      <strong className="text-indigo-400 mr-2">{displayIdx + 1}.</strong> {item}
                    </span>
                    <span className="text-slate-500 text-xs">↕ Drag to re-order</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : (challenge.sortItems?.map((_, i) => i) || []);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  aria-label="Submit Sorted Order"
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl mt-2"
                >
                  Check Sequence →
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    aria-label="Numeric answer input"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:outline-none focus:border-indigo-500 w-64"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit Numeric Answer"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-amber-300 font-semibold">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      aria-label={`Add part ${part}`}
                      className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg border border-indigo-600"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[80px] p-4 bg-slate-950 rounded-xl border border-slate-700 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1.5 bg-slate-800 text-indigo-300 font-mono text-xs rounded-lg border border-slate-600 flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                        aria-label="Remove part"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click buttons above to build entry structure</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify Constructed Entry"
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl"
                >
                  Verify Entry →
                </motion.button>
              </div>
            )}
          </div>

          {/* Progressive Step-by-Step Explanation Card */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-2xl border border-amber-600/70 space-y-4"
            >
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>📖 Statutory Explanation:</span>
              </div>

              <div className="space-y-2">
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-slate-200 text-sm leading-relaxed"
                    >
                      <strong className="text-amber-400 mr-2">{idx + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              {revealedSteps <
                challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRevealedSteps((s) => s + 1)}
                  aria-label="Show next explanation sentence"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-bold border border-slate-700"
                >
                  Show Next Step →
                </motion.button>
              )}

              {revealedSteps >=
                challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextChallenge}
                  aria-label="Proceed to Next Challenge"
                  className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-600/30 block mt-4"
                >
                  {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Audit Results →' : 'Next Challenge →'}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD RETROSPECTIVE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl border border-indigo-700 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-3xl font-black text-white">Audit Simulation Complete!</h2>
            <div className="text-lg text-slate-300">
              Final Competency Score:{' '}
              <span className="text-emerald-400 font-extrabold">{Math.max(0, 100 - errors * 5)}%</span> | Mastery Tier:{' '}
              <span className="text-indigo-300 font-bold uppercase">{masteryLevel}</span>
            </div>

            {/* Motivational Feedback Banner based on error thresholds */}
            <div
              className={`p-4 rounded-2xl border text-sm font-bold max-w-2xl mx-auto ${
                errors === 0
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                  : errors <= 3
                  ? 'bg-blue-950/60 border-blue-500 text-blue-200'
                  : errors <= 7
                  ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                  : 'bg-rose-950/60 border-rose-500 text-rose-200'
              }`}
            >
              {errors === 0 && '🌟 PERFECT SCORE! Flawless mastery across traditional classification, GAAP rules, and the Accounting Equation!'}
              {errors >= 1 && errors <= 3 && '👏 Great work! You demonstrated strong analytical competency and sound accounting principles.'}
              {errors >= 4 && errors <= 7 && '👍 Good effort! Solid foundation established. Review the tricky GAAP conventions and retry.'}
              {errors >= 8 && '💪 Do not give up — You WILL get this! Accountancy takes practice. Review the diagnostic profiles below and master it!'}
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-indigo-800/60 space-y-4">
            <h3 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span>💭</span> Key Concept Reflections
            </h3>
            <p className="text-xs text-slate-400">
              Cement your conceptual learning by reflecting on these foundational questions:
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-indigo-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflectionResponses.surprising}
                  onChange={(e) => setReflectionResponses({ ...reflectionResponses, surprising: e.target.value })}
                  placeholder="e.g., That Trial Balance can still tally even with an Error of Principle, or that Capital is an Internal Liability..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-indigo-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflectionResponses.explain}
                  onChange={(e) => setReflectionResponses({ ...reflectionResponses, explain: e.target.value })}
                  placeholder="e.g., Real is things owned, Personal is people/firms dealt with, Nominal is expenses & gains..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-indigo-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflectionResponses.realLife}
                  onChange={(e) => setReflectionResponses({ ...reflectionResponses, realLife: e.target.value })}
                  placeholder="e.g., Reading the balance sheet of Tata Motors or Apple before investing, managing personal income and taxes..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-rose-300">Your Diagnostic Misconception Profile</h3>
              <p className="text-xs text-slate-400">Review these specific conceptual pitfalls that tripped you up during the challenges:</p>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const item = misconceptions?.[mIdx];
                  if (!item) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900 text-xs">
                      <div className="text-rose-400 font-bold">❌ {item.misconception}</div>
                      <div className="text-emerald-300 mt-1 font-medium">✓ {item.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SRS) Status Box */}
          <div className="p-6 bg-amber-950/30 rounded-2xl border border-amber-800/60 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-amber-300 uppercase">Spaced Repetition Review Schedule</h3>
              <p className="text-xs text-slate-400 mt-1">
                To cement long-term memory retention, this topic will be scheduled for active recall in{' '}
                <strong className="text-amber-300 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real-World Activity Retrospective */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>💼</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 bg-slate-950 rounded-xl text-xs text-slate-300">
                  <span className="font-bold text-indigo-400">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Sim-Engine Feedback Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_AccountancyBackgroundHistoryTypesSim;
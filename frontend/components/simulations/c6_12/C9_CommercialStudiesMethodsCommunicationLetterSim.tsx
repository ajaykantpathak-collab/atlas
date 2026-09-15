'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C9_COMMSTUD_021 = 'c9_commstud_021';
const NODE_C9_COMMSTUD_022 = 'c9_commstud_022';
const NODE_C9_COMMSTUD_023 = 'c9_commstud_023';
const NODE_C9_COMMSTUD_024 = 'c9_commstud_024';
const NODE_C9_COMMSTUD_025 = 'c9_commstud_025';
const NODE_C9_COMMSTUD_026 = 'c9_commstud_026';
const NODE_C9_COMMSTUD_027 = 'c9_commstud_027';
const NODE_C9_COMMSTUD_028 = 'c9_commstud_028';
const NODE_C9_COMMSTUD_029 = 'c9_commstud_029';
const NODE_C9_COMMSTUD_030 = 'c9_commstud_030';

const ALL_NODE_IDS = [
  NODE_C9_COMMSTUD_021,
  NODE_C9_COMMSTUD_022,
  NODE_C9_COMMSTUD_023,
  NODE_C9_COMMSTUD_024,
  NODE_C9_COMMSTUD_025,
  NODE_C9_COMMSTUD_026,
  NODE_C9_COMMSTUD_027,
  NODE_C9_COMMSTUD_028,
  NODE_C9_COMMSTUD_029,
  NODE_C9_COMMSTUD_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: "Aarav's Jaipur Enterprise: From Communication to Final Accounts",
  intro: 'Aarav is launching "Jaipur Craftworks" — a manufacturing & trading venture selling authentic Rajasthani wooden handicrafts across India. He must handle business communication, set up double-entry bookkeeping, apply accounting principles, journalise, post ledgers, and leverage commercial banking.',
  context: 'Follow Aarav across his business lifecycle: dispatching tenders, negotiating bank loans, recording purchases, and tallying trial balances.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Larsen & Toubro sends a formal tender bid to Indian Railways. Why do they use a sealed physical business letter on official letterhead instead of a quick WhatsApp message?',
  options: [
    'Because Indian Railways does not have smartphones or internet access',
    'Because a signed, sealed business letter provides legal validity and admissible documentary evidence in court/tender audits',
    'Because postal letters are faster and cheaper than electronic messages',
    'Because WhatsApp messages can only be sent to 5 people at once',
  ],
  correctIndex: 1,
  hintAfter: "Let's explore the 5 core business communication methods and accounting systems!",
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

// ─── 22 CHALLENGES (NEP 2020 Aligned) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C9_COMMSTUD_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which method of communication is synchronous, requires 1-2 Mbps bandwidth, and allows real-time visual screen-sharing for product demos between Mumbai and Pune?',
    options: ['Business Letter', 'E-mail', 'Video Conference Call', 'Ordinary Post'],
    correctIndex: 2,
    explanation: 'A Video Conference Call is a synchronous real-time communication providing visual presence and screen-sharing over internet platforms like Zoom or Cisco Webex.',
    hints: [
      'Think of a digital method where participants can both see and hear each other live.',
      'It requires a stable internet bandwidth of 1-2 Mbps and cameras.',
      'Platforms like Zoom and Webex host this method: Video Conference Call.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C9_COMMSTUD_024,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the business items into the fundamental Accounting Equation: Assets = Liabilities + Capital.',
    dragItems: [
      { label: 'Plant & Machinery (₹5 Lakh)', targetId: 'box_assets' },
      { label: 'Bank Loan (₹2 Lakh)', targetId: 'box_liabilities' },
      { label: "Owner's Investment (₹3 Lakh)", targetId: 'box_capital' },
    ],
    correctMapping: {
      box_assets: 'Plant & Machinery (₹5 Lakh)',
      box_liabilities: 'Bank Loan (₹2 Lakh)',
      box_capital: "Owner's Investment (₹3 Lakh)",
    },
    explanation: 'Assets (₹5L Plant) = Liabilities (₹2L Bank Loan) + Capital (₹3L Equity). Resources owned equal external plus internal obligations.',
    hints: [
      'What the business owns is an Asset.',
      'What the business owes to outsiders (banks) is a Liability.',
      "The owner's stake is Capital.",
    ],
  },
  {
    id: 'ch_03',
    nodeId: NODE_C9_COMMSTUD_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A clerk at Jaipur Craftworks records daily invoices in the cash book and balances ledger accounts. What scope of work is being performed?',
    options: [
      'Auditing and Statutory Reporting under Companies Act',
      'Bookkeeping (mechanical recording and posting)',
      'Management Accounting for pricing strategy',
      'Financial Statement Interpretation',
    ],
    correctIndex: 1,
    explanation: 'Bookkeeping is the routine, mechanical recording of transactions and posting to ledgers up to extracting a trial balance. Accounting begins where bookkeeping ends.',
    hints: [
      'This involves recording and posting without financial interpretation.',
      'It does not require a Chartered Accountant.',
      'It is Bookkeeping.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C9_COMMSTUD_023,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'Arrange the first 4 sequential stages of the Accounting Cycle in correct chronological order.',
    sortItems: [
      'Identifying & Analysing Transaction',
      'Journalising in Book of Original Entry',
      'Posting to Ledger Accounts',
      'Balancing Ledger Accounts & Trial Balance',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The accounting cycle strictly proceeds: Identify → Journalise → Post to Ledger → Balance & Extract Trial Balance → Final Accounts.',
    hints: [
      'First you must identify if an event is a financial transaction.',
      'Next comes the original book of entry (Journal).',
      'Entries are then grouped into accounts (Ledger) and balanced.',
    ],
  },
  {
    id: 'ch_05',
    nodeId: NODE_C9_COMMSTUD_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Aarav buys handicraft wood with list price ₹1,00,000. The supplier gives 10% Trade Discount on the invoice, plus ₹2,000 Cash Discount for prompt payment in 7 days. At what value is Purchases debited?',
    options: ['₹1,00,000', '₹90,000', '₹88,000', '₹92,000'],
    correctIndex: 1,
    explanation: 'Trade discount (10% of ₹1,00,000 = ₹10,000) is deducted on the invoice and NEVER recorded in ledger accounts. Purchases is debited at ₹90,000 net. Cash discount (₹2,000) is recorded separately as Discount Received when paid.',
    hints: [
      'Trade discount reduces the invoice price at source before recording.',
      'Cash discount is an incentive for prompt payment recorded separately.',
      'Recorded Purchase = List Price − Trade Discount = ₹1,00,000 − ₹10,000 = ₹90,000.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C9_COMMSTUD_024,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Jaipur Craftworks has Revenue ₹6,50,000, Cost of Goods Sold ₹3,20,000, Shop Rent ₹40,000, Electricity ₹15,000, and staff Salaries ₹75,000. Calculate Net Profit in Rupees.',
    correctAnswer: 200000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Net Profit = Revenue (₹6,50,000) − COGS (₹3,20,000) − Rent (₹40,000) − Electricity (₹15,000) − Salaries (₹75,000) = ₹2,00,000.',
    hints: [
      'Gross Revenue is ₹6,50,000.',
      'Total Expenses = ₹3,20,000 + ₹40,000 + ₹15,000 + ₹75,000 = ₹4,50,000.',
      'Subtract total expenses from revenue: 6,50,000 − 4,50,000 = 2,00,000.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C9_COMMSTUD_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Aarav pays ₹25,000 from the business bank account for his daughter’s ICSE school fees. How must the accountant record this under the Business Entity Principle?',
    options: [
      'Debit School Fees Expense A/c (reduces business taxable profit)',
      'Debit Drawings A/c (reduces Owner’s Capital in Balance Sheet)',
      'Debit General Office Expense A/c',
      'Do not record it at all because it is personal',
    ],
    correctIndex: 1,
    explanation: 'Under the Business Entity Principle, the owner and business are separate entities. Personal expenses paid with business funds are Drawings, which reduce Capital, not business operating expenses.',
    hints: [
      'Is school fees a cost incurred to earn craftwork revenue?',
      'No, it is a personal withdrawal of business funds by the proprietor.',
      'Personal withdrawals are Drawings and reduce Capital.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_08',
    nodeId: NODE_C9_COMMSTUD_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Jaipur Craftworks employs master artisan Ramu, whose award-winning wood carving skills boost sales by 40%. Why is Ramu’s talent NOT listed as an asset on the Balance Sheet?',
    options: [
      'Artisans are not employees under Indian Labour Law',
      'Money Measurement Principle: qualitative human assets cannot be measured in objective monetary terms',
      'Going Concern Principle prohibits valuing human beings',
      'Dual Aspect Principle balances employee skills to zero',
    ],
    correctIndex: 1,
    explanation: 'The Money Measurement Principle dictates that only transactions and events expressible in objective monetary units (Rupees) can be recorded in the books of accounts.',
    hints: [
      'Think about whether you can put an exact, objective rupee receipt on "talent".',
      'Accounting requires verifiable monetary data.',
      'This is the Money Measurement Principle.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C9_COMMSTUD_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under Section 2(41) of the Companies Act 2013, what standard accounting period must Indian companies follow for reporting annual profits?',
    options: [
      '1 January to 31 December',
      '1 April to 31 March (Financial Year)',
      '1 July to 30 June (Agricultural Year)',
      'Diwali to Diwali (Samvat Year)',
    ],
    correctIndex: 1,
    explanation: 'In India, Section 2(41) of the Companies Act 2013 legally mandates 1 April to 31 March as the uniform financial accounting year.',
    hints: [
      'Indian financial year starts in April.',
      'It concludes on the last day of March.',
      '1 April to 31 March.',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C9_COMMSTUD_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Craftworks purchases a ₹3,00,000 laser wood cutter with an expected life of 5 years. Why is the entire ₹3,00,000 NOT charged as an expense in year 1?',
    options: [
      'Because laser machines are illegal to expense in India',
      'Matching Principle: the machine generates revenue over 5 years, so its cost must be spread over 5 years via annual depreciation',
      'Business Entity Principle forbids expensing machines',
      'Dual Aspect requires machines to remain permanently on the balance sheet without depreciation',
    ],
    correctIndex: 1,
    explanation: 'The Matching Principle requires costs to be matched against the revenues they help generate. Fixed assets yield economic benefits over multiple years, so only annual depreciation is expensed each year.',
    hints: [
      'The machine helps make crafts and earn revenue for 5 continuous years.',
      'Expensing everything in year 1 would drastically distort year 1 profit.',
      'This is the Matching Principle (depreciation over useful life).',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C9_COMMSTUD_028,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the correct Journal entry for: "Paid ₹12,000 Shop Rent in Cash."',
    availableParts: ['Rent A/c Dr', 'Cash A/c Dr', 'To Rent A/c', 'To Cash A/c', '₹12,000', 'Being rent paid'],
    targetState: 'Rent A/c Dr ₹12,000 To Cash A/c ₹12,000 Being rent paid',
    validationHint: 'Debit the Nominal expense (Rent) and Credit the Real asset going out (Cash) with narration.',
    explanation: 'Rent is a Nominal account (expense → Debit). Cash is a Real account (asset going out → Credit). Narration explains the entry.',
    hints: [
      'Rent is an expense: Debit Rent A/c.',
      'Cash goes out: Credit Cash A/c (prefixed with "To").',
      'Format: Rent A/c Dr ₹12,000 To Cash A/c ₹12,000 Being rent paid.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C9_COMMSTUD_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Classify "Capital Account" and "Prepaid Insurance Account" under traditional Golden Rules of Accounting:',
    options: [
      'Real Account and Nominal Account',
      'Personal Account (Representative/Owner) and Personal Account',
      'Nominal Account and Real Account',
      'Real Account and Real Account',
    ],
    correctIndex: 1,
    explanation: 'Capital represents the owner (Personal Account). Prepaid Insurance represents an entity to whom payment was made in advance (Representative Personal Account).',
    hints: [
      'Capital represents a natural person (the proprietor).',
      'Prepaid/outstanding expense accounts represent persons or institutions.',
      'Both are Personal accounts under Golden Rules.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C9_COMMSTUD_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Aarav delivers wooden handicrafts to an artisan gallery in London, receiving a 90-day Bill of Exchange for ₹5,00,000. He needs money today to pay workers. Which commercial bank service solves this?',
    options: [
      'Safe Deposit Locker Facility',
      'Discounting of Bills of Exchange',
      'Underwriting of Equity Shares',
      'Issue of ATM Debit Card',
    ],
    correctIndex: 1,
    explanation: 'Discounting of Bills of Exchange is a primary credit lending function where the bank pays the bill value immediately minus a discount charge, and collects the full amount from the drawee upon maturity.',
    hints: [
      'He has a 90-day credit bill and needs cash immediately.',
      'The bank buys the bill at a small deduction (discount) and pays him upfront.',
      'This is Discounting of Bills of Exchange.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C9_COMMSTUD_030,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What is the operational distinction between a Bank Overdraft and a Term Loan for Jaipur Craftworks?',
    options: [
      'Overdraft is only for savings accounts; Loans are for current accounts',
      'Overdraft allows current account holders to overdraw up to a limit with interest charged ONLY on the actual amount utilized; Loans charge interest on the entire principal disbursed',
      'Overdraft is granted by RBI; Loans are granted by SBI',
      'Overdraft has 20-year repayment tenure; Loans must be repaid within 24 hours',
    ],
    correctIndex: 1,
    explanation: 'An overdraft is a flexible credit facility on a current account where interest is charged on a daily basis only on the utilized overdrawn amount, whereas a term loan charges interest on the full sanctioned amount.',
    hints: [
      'Consider how interest is calculated on unused credit.',
      'Overdraft is linked to a business current account.',
      'Overdraft charges interest only on the actual amount overdrawn.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C9_COMMSTUD_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When posting the entry "Cash A/c Dr ₹50,000 To Sales A/c ₹50,000" into the Sales Ledger, what is written on which side?',
    options: [
      'Debit side: "To Cash A/c ₹50,000"',
      'Credit side: "By Cash A/c ₹50,000"',
      'Debit side: "To Sales A/c ₹50,000"',
      'Credit side: "By Sales A/c ₹50,000"',
    ],
    correctIndex: 1,
    explanation: 'Sales A/c is CREDITED in the journal. Therefore, on the CREDIT side of the Sales Ledger, we write the opposite account name prefixed with "By": "By Cash A/c ₹50,000".',
    hints: [
      'The ledger side follows the journal direction: Sales was credited, so post on the Credit side.',
      'On the credit side, the narrative prefix is always "By [Opposite Account]".',
      'Credit side: "By Cash A/c ₹50,000".',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C9_COMMSTUD_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which of the following accounting errors will CAUSE the Trial Balance totals to NOT match (disagreement of trial balance)?',
    options: [
      'Complete omission of a ₹10,000 cash sale from the journal',
      'Posting ₹5,000 to the debit side of Machinery A/c instead of Repairs A/c (Error of Principle)',
      'Posting ₹8,000 to the Debit of Purchases A/c but posting ₹800 to the Credit of Cash A/c',
      'Compensating errors where both debit and credit are overstated by ₹2,000',
    ],
    correctIndex: 2,
    explanation: 'When ₹8,000 is debited to Purchases but only ₹800 is credited to Cash, debit exceeds credit by ₹7,200. This single-sided arithmetical error causes the Trial Balance to not tally.',
    hints: [
      'Trial balance verifies arithmetical equality of Total Debits = Total Credits.',
      'Errors of omission, principle, and compensating errors affect both sides equally and still tally.',
      'Unequal amounts on debit and credit (₹8,000 vs ₹800) breaks the balance.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C9_COMMSTUD_023,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order all 5 core documents and statements from start to finish in the corporate reporting cycle.',
    sortItems: [
      'Source Document (Invoice/Voucher)',
      'Journal (Original Entry)',
      'Ledger Accounts (Classification)',
      'Trial Balance (Arithmetic Check)',
      'Final Accounts (Trading, P&L, Balance Sheet)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The full audit trail runs: Source Document → Journal → Ledger → Trial Balance → Final Accounts.',
    hints: [
      'The initial evidence is the invoice or voucher.',
      'The journal records it chronologically first.',
      'Final accounts (P&L and Balance Sheet) come last.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C9_COMMSTUD_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is calling the Reserve Bank of India (RBI) a "Commercial Bank" an institutional category error in Indian commerce?',
    options: [
      'Because RBI is a foreign multinational bank based in London',
      'Because RBI is the Central Bank and regulatory authority under RBI Act 1934; it does not accept public retail deposits or grant consumer loans for commercial profit',
      'Because RBI only operates during stock market trading hours',
      'Because RBI is owned exclusively by private international shareholders',
    ],
    correctIndex: 1,
    explanation: 'The RBI is the apex monetary regulator and government banker. Unlike commercial banks (SBI, HDFC, PNB) governed by Banking Regulation Act 1949, RBI does not conduct profit-seeking retail banking with citizens.',
    hints: [
      'Can an individual citizen open a personal savings account in the RBI?',
      'No. The RBI regulates commercial banks and issues currency.',
      'It is the Central Bank, not a commercial retail bank.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C9_COMMSTUD_027,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Aarav starts business with ₹5,00,000 Cash. He takes ₹2,00,000 SBI loan, buys ₹3,50,000 Machinery (paying cash), and buys ₹1,50,000 Goods on credit from Sharma Woods. What is the total Assets value on his Balance Sheet?',
    correctAnswer: 850000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Total Liabilities + Capital = SBI Loan (₹2,00,000) + Creditors (₹1,50,000) + Capital (₹5,00,000) = ₹8,50,000. Assets (Cash ₹3,50,000 + Machinery ₹3,50,000 + Stock ₹1,50,000) = ₹8,50,000.',
    hints: [
      'Total Capital = ₹5,00,000; Total Liabilities = ₹2,00,000 (Loan) + ₹1,50,000 (Creditor) = ₹3,50,000.',
      'By the Accounting Equation: Assets = Liabilities + Capital.',
      'Total Assets = ₹3,50,000 + ₹5,00,000 = ₹8,50,000.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C9_COMMSTUD_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'If a company faces imminent liquidation under the Insolvency and Bankruptcy Code 2016, how must its factory assets be valued instead of historical cost?',
    options: [
      'At replacement cost with 50-year straight line depreciation',
      'At Net Realisable (Liquidation/Forced Sale) Value because the Going Concern assumption is broken',
      'At original invoice cost under the Money Measurement Principle',
      'At zero rupees because bankrupted firms have no assets',
    ],
    correctIndex: 1,
    explanation: 'When an enterprise ceases to be a Going Concern, historical cost accounting collapses, and assets must be revalued to their immediate Net Realisable / Liquidation Value.',
    hints: [
      'Historical cost assumes the business will operate indefinitely.',
      'In bankruptcy, assets will be sold immediately at auction.',
      'Valuation shifts to Net Realisable / Liquidation Value.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C9_COMMSTUD_024,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the correct Balance Sheet identity structure from the components below.',
    availableParts: ['Fixed Assets', '+ Current Assets', '=', 'Capital', '+ Long-Term Liabilities', '+ Current Liabilities'],
    targetState: 'Fixed Assets + Current Assets = Capital + Long-Term Liabilities + Current Liabilities',
    validationHint: 'Combine Left side (All Assets) with Right side (Capital + All Liabilities).',
    explanation: 'Total Assets (Fixed + Current) must identically equal Total Claims (Capital + Long-Term Liabilities + Current Liabilities).',
    hints: [
      'Left Side: Fixed Assets + Current Assets.',
      'Equals sign: =.',
      'Right Side: Capital + Long-Term Liabilities + Current Liabilities.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C9_COMMSTUD_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under Section 15 of the Central GST Act 2017, how does Trade Discount shown on the invoice differ from post-sale Cash Discount regarding GST calculation?',
    options: [
      'Trade discount reduces taxable transaction value for GST; post-sale cash discount does not reduce initial taxable invoice value',
      'Both trade and cash discounts are banned under GST',
      'Cash discount reduces GST by 50% automatically',
      'Trade discount increases GST liability by 18%',
    ],
    correctIndex: 0,
    explanation: 'Section 15(3)(a) of CGST Act allows trade discount shown on the invoice to reduce transaction value before GST is calculated. Cash discount given after supply for prompt payment does not alter initial invoice GST liability unless specific pre-agreed credit note conditions are met.',
    hints: [
      'Trade discount is deducted on the invoice before GST is applied.',
      'Cash discount happens after supply at payment settlement.',
      'Trade discount reduces taxable transaction value on the invoice.',
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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C9_COMMSTUD_021,
  title: 'Commercial Studies: Methods of Communication & Foundation of Accounting',
  definition: 'Comprehensive mastery of business communication channels (letter, e-mail, conference calling, social media), double-entry accounting fundamentals, accounting cycle, terminology, principles, journalising, ledger posting, trial balance, and commercial banking functions under CISCE Class 9 syllabus.',
  eli5: 'Think of business communication as choosing the right transport (sealed letter for legal contracts, e-mail for fast files, video calls for live demos). Accounting is the scorekeeping system: every rupee in and out is written in a daily diary (Journal), sorted into boxes (Ledger), checked for balance (Trial Balance), and safely managed through a commercial bank.',
  misconceptions: [
    {
      misconception: 'Bookkeeping and accounting are identical terms.',
      correction: 'Bookkeeping is mechanical recording up to the trial balance; accounting includes classifying, summarising, interpreting, and communicating financial results.',
    },
    {
      misconception: 'Video conference calling is a form of social media.',
      correction: 'Video calling is a private, real-time synchronous interaction among invited members; social media is a public broadcast network.',
    },
    {
      misconception: 'Trade discount and cash discount are recorded identically in ledger accounts.',
      correction: 'Trade discount is deducted on the invoice and never appears in ledger accounts; cash discount is recorded in Discount Allowed / Discount Received.',
    },
    {
      misconception: 'Owner’s personal expenses paid from business cash are business operating expenses.',
      correction: 'Under the Business Entity Principle, personal expenses are Drawings that reduce Capital, not business operating expenses.',
    },
    {
      misconception: 'Reserve Bank of India (RBI) is a commercial bank.',
      correction: 'RBI is the central regulatory bank; commercial banks (SBI, HDFC) are profit-seeking retail banks serving citizens and businesses.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which communication method offers highest legal evidentiary value in tenders?', options: ['WhatsApp chat', 'Signed business letter on letterhead', 'Audio call', 'Instagram post'], correctIndex: 1 },
    { question: 'Where does the bookkeeper’s primary job end in the accounting cycle?', options: ['Balance Sheet', 'P&L Analysis', 'Extracting Trial Balance', 'Tax Audit'], correctIndex: 2 },
    { question: 'What is the Golden Rule for Real Accounts?', options: ['Debit the receiver, credit giver', 'Debit what comes in, credit what goes out', 'Debit all expenses, credit incomes', 'Debit capital, credit asset'], correctIndex: 1 },
    { question: 'How is a ₹50,000 machinery repair recorded if it maintains existing operation?', options: ['Debit Machinery (Asset)', 'Debit Repairs A/c (Expense)', 'Credit Capital', 'Debit Drawings'], correctIndex: 1 },
    { question: 'What principle prevents recording employee morale as an asset?', options: ['Going Concern', 'Business Entity', 'Money Measurement', 'Dual Aspect'], correctIndex: 2 },
    { question: 'What financial statement proves the arithmetical accuracy of ledger postings?', options: ['Cash Flow Statement', 'Balance Sheet', 'Trial Balance', 'Income Statement'], correctIndex: 2 },
    { question: 'Which bank function allows withdrawing more than the current account balance?', options: ['Fixed Deposit', 'Overdraft', 'Recurring Deposit', 'Letter of Credit'], correctIndex: 1 },
    { question: 'What is the Accounting Equation?', options: ['Assets = Liabilities + Capital', 'Assets + Liabilities = Capital', 'Capital = Assets + Liabilities', 'Liabilities = Assets + Capital'], correctIndex: 0 },
  ],
  masteryCriteria: 'Master the 5 business communication methods, 6 accounting cycle steps, Golden Rules of Debit/Credit, 7 accounting principles, Trial Balance extraction, and commercial banking operations.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Communication Method Matrix',
    instruction: 'Click each communication channel to evaluate its speed, legal validity, cost, and ideal business use case.',
    interactionType: 'click-channel',
    nodeId: NODE_C9_COMMSTUD_021,
  },
  {
    title: 'Lab 2: Interactive Double-Entry Journaliser & Golden Rules',
    instruction: 'Inspect account classifications (Personal, Real, Nominal) and the 6-stage Accounting Cycle visual architecture.',
    interactionType: 'journal-builder',
    nodeId: NODE_C9_COMMSTUD_028,
  },
  {
    title: 'Lab 3: The Dynamic Accounting Equation Balance Scale',
    instruction: 'Adjust Capital, Bank Loans (Liabilities), and Purchases to see the real-time balance of Assets = Liabilities + Capital.',
    interactionType: 'slider-equation',
    nodeId: NODE_C9_COMMSTUD_027,
  },
  {
    title: 'Lab 4: The T-Account Ledger & Trial Balance Live Engine',
    instruction: 'Post entries between Cash, Purchases, and Sales to observe automatic Ledger Balancing and Trial Balance matching.',
    interactionType: 'ledger-trial-balance',
    nodeId: NODE_C9_COMMSTUD_029,
  },
  {
    title: 'Lab 5: Commercial Bank Credit & Interest Spread Simulator',
    instruction: 'Simulate deposit inflows, loan disbursements, CRR reserves, and calculate the bank’s net interest margin spread.',
    interactionType: 'banking-simulator',
    nodeId: NODE_C9_COMMSTUD_030,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Aarav invests ₹4,00,000 cash and takes a ₹2,00,000 SBI loan to buy ₹3,00,000 wood inventory, what will be the Total Assets of Jaipur Craftworks?',
    options: ['₹4,00,000', '₹6,00,000', '₹9,00,000', '₹3,00,000'],
    correctIndex: 1,
    verifyInstruction: 'Now adjust the Capital and Loan sliders in the Accounting Equation scale to verify your prediction!',
    nodeId: NODE_C9_COMMSTUD_027,
  },
  {
    question: 'Predict: If a customer settles a ₹50,000 invoice with a 5% Cash Discount, how much will be credited to the Customer Personal Account to fully clear their debt?',
    options: ['₹47,500', '₹50,000', '₹2,500', '₹52,500'],
    correctIndex: 1,
    verifyInstruction: 'Observe the journal builder to see the full ₹50,000 liability cleared with ₹47,500 Cash + ₹2,500 Discount!',
    nodeId: NODE_C9_COMMSTUD_025,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the Total Debits and Total Credits in the Trial Balance when every transaction is correctly double-entered?',
    observableOptions: [
      'Debit total is always double the Credit total',
      'Debit total and Credit total are identically equal, maintaining perfect arithmetic balance',
      'Credit total is always higher by the amount of profit',
      'The totals fluctuate randomly based on the bank balance',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_COMMSTUD_029,
  },
  {
    question: 'What happens to the Bank’s Net Profit Spread when deposit interest rates rise but lending loan rates stay unchanged?',
    observableOptions: [
      'Net interest spread expands',
      'Net interest spread narrows (profit margin reduces)',
      'Bank immediately ceases operations',
      'No change in spread occurs',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_COMMSTUD_030,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Be the Chief Financial Officer (CFO)',
  description: 'Select an Indian enterprise (e.g., Tata Motors, Amul, Infosys, or your neighbourhood Kirana store). List 3 primary communication tools they use with vendors, draft 3 double-entry journal entries for their primary transactions, and identify their primary commercial bank services.',
  steps: [
    'Choose an Indian business enterprise and specify its core operating activity.',
    'Identify 3 communication methods used (e.g., Letter for contracts, Email for POs, Video call for reviews).',
    'Draft 3 journal entries (Capital introduced, Stock purchased on credit, Goods sold).',
    'Identify 2 commercial bank facilities used (e.g., Cash Credit / Overdraft, Bill Discounting).',
    'Verify that your accounting entries satisfy: Assets = Liabilities + Capital.',
  ],
};

// ─── MAIN COMPONENT ───
function C9_CommercialStudiesMethodsCommunicationLetterSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commstud'] || { name: 'Commercial Studies', emoji: '📊', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Interactive states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Dynamic simulation controls
  const [selectedChannel, setSelectedChannel] = useState<'letter' | 'email' | 'audio' | 'video' | 'social'>('letter');
  const [simCapital, setSimCapital] = useState(500000);
  const [simLoan, setSimLoan] = useState(200000);
  const [simInventoryBuy, setSimInventoryBuy] = useState(300000);
  const [simCashSales, setSimCashSales] = useState(150000);
  const [bankDepositRate, setBankDepositRate] = useState(3.5);
  const [bankLendingRate, setBankLendingRate] = useState(9.0);
  const [bankTotalDeposits, setBankTotalDeposits] = useState(10000000); // 1 Crore

  // Challenge & scoring state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & drop / construct / numeric states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection states
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });
  const [reflectionsSaved, setReflectionsSaved] = useState(false);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback components
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LIVE ACCOUNTING DERIVATIONS ───
  const derivedAccounting = useMemo(() => {
    const totalLiabilitiesAndCapital = simCapital + simLoan;
    const cashRemaining = Math.max(0, simCapital + simLoan + simCashSales - simInventoryBuy);
    const totalAssets = cashRemaining + simInventoryBuy;
    const isBalanced = totalAssets === totalLiabilitiesAndCapital + simCashSales;
    return {
      cashRemaining,
      totalAssets,
      totalLiabilitiesAndCapital: totalLiabilitiesAndCapital + simCashSales,
      isBalanced,
    };
  }, [simCapital, simLoan, simInventoryBuy, simCashSales]);

  // Bank calculation
  const bankMetrics = useMemo(() => {
    const crrRatio = 0.045; // 4.5% CRR reserve
    const lendablePool = bankTotalDeposits * (1 - crrRatio);
    const interestIncome = lendablePool * (bankLendingRate / 100);
    const interestExpense = bankTotalDeposits * (bankDepositRate / 100);
    const netInterestMargin = interestIncome - interestExpense;
    const spreadPercentage = bankLendingRate - bankDepositRate;
    return {
      crrReserve: bankTotalDeposits * crrRatio,
      lendablePool,
      interestIncome,
      interestExpense,
      netInterestMargin,
      spreadPercentage,
    };
  }, [bankTotalDeposits, bankDepositRate, bankLendingRate]);

  // ─── 2D CANVAS ANIMATION ───
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

      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Dynamic glowing transaction pulse
      const pulseX = (frame * 3) % canvas.width;
      const gradient = ctx.createRadialGradient(pulseX, 28, 2, pulseX, 28, 25);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.9)');
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pulseX, 28, 25, 0, Math.PI * 2);
      ctx.fill();

      // Flow label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Double-Entry Ledger Cycle Flow: Journal → Ledger → Trial Balance → Balance Sheet', 15, 18);

      // Progress bar
      ctx.fillStyle = '#4338ca';
      ctx.fillRect(15, 38, (canvas.width - 30) * ((currentChallenge + 1) / Math.max(1, filteredChallenges.length)), 6);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge, filteredChallenges.length]);

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALLBACK HANDLERS ───
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction! Business letters provide sealed legal evidence.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration labs. Step into the shoes of a commercial analyst.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test every variable in Free Exploration sandbox mode without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for the CISCE competency challenges! Apply your knowledge.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive scale to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Exact scientific observation! Debits always equal Credits.' : 'Observe the balance columns carefully.');
  }, []);

  const handleChannelSelect = useCallback((channel: 'letter' | 'email' | 'audio' | 'video' | 'social') => {
    setSelectedChannel(channel);
    audioManager.play('tap');
    const announcements: Record<string, string> = {
      letter: 'Business Letter: Formal, printed on letterhead, signed, sealed for legal tenders.',
      email: 'E-mail: Fast electronic asynchronous messaging with attachment capabilities.',
      audio: 'Audio Conference: Multi-party real-time voice discussion with low bandwidth needs.',
      video: 'Video Conference: Real-time visual presence and screen-sharing over 1-2 Mbps bandwidth.',
      social: 'Social Media: Public broadcast platform for wide customer engagement.',
    };
    speechManager.speak(announcements[channel]);
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const base = prev.length === activeChallenge.sortItems?.length ? prev : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const arr = [...base];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You have completed the module with a score of ${finalScore} percent.`);
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
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding application of accounting principles.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors((e) => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the step-by-step solution together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 relative"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="text-3xl p-2 bg-indigo-950/70 border border-indigo-700 rounded-xl inline-block"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">ICSE Class 9 Commercial Studies</span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30"
              >
                10 Core Nodes
              </motion.span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} className="text-right hidden sm:block p-2 bg-slate-900/60 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 block">Mastery Level</span>
            <span className="text-sm font-bold text-amber-300 capitalize">{masteryLevel}</span>
          </motion.div>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.08 }}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-300 border-rose-600'
                : 'bg-indigo-950/60 text-indigo-300 border-indigo-600'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Narrative Context Card */}
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 rounded-2xl border border-indigo-700/60 shadow-xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.span whileHover={{ scale: 1.05 }} className="text-xs font-bold uppercase px-2.5 py-1 bg-indigo-500/30 text-indigo-200 rounded-md">
                  Real-World Case Study
                </motion.span>
                <span className="text-xs text-slate-400">Jaipur, Rajasthan</span>
              </div>
              <h2 className="text-xl font-black text-indigo-200">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 p-3 bg-indigo-900/30 rounded-xl border border-indigo-800/40 text-xs text-indigo-300 flex items-center gap-2"
              >
                <span>💡</span>
                <span>{SCENARIO.context}</span>
              </motion.div>
            </motion.div>

            {/* Discovery Question Hook */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700"
            >
              <div className="flex items-center gap-2 mb-3 text-amber-400 font-semibold text-xs tracking-wider uppercase">
                <span>⚡ Curiosity Trigger Hook (Ungraded)</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 gap-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    disabled={discoveryAnswered}
                    className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      discoveryAnswered
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-100'
                          : 'bg-slate-800/40 border-slate-700 text-slate-400'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-indigo-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <motion.span whileHover={{ scale: 1.1 }} className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </motion.span>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-slate-900/80 rounded-xl border border-slate-700">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-sm font-semibold mb-4 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}
                  >
                    {discoveryCorrect ? '✓ Exactly right! Larsen & Toubro relies on sealed physical letters because Section 65B and court audits require verified signatures.' : `⚠️ ${DISCOVERY_QUESTION.hintAfter}`}
                  </motion.p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-indigo-500 hover:to-purple-500 flex items-center gap-2"
                  >
                    <span>Enter Interactive Learning Labs</span>
                    <span>→</span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Exploration Slide Navigation */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl border border-slate-700"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-indigo-400">Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}:</span>
                <span className="text-sm font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</span>
              </div>
              <div className="flex gap-1.5">
                {EXPLORATION_STEPS.map((_, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-3 rounded-full transition-all ${currentSlide === i ? 'bg-indigo-500 w-7' : 'bg-slate-600 w-3'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-amber-300 text-sm font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-800/40"
            >
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </motion.p>

            {/* ─── LAB 1: COMMUNICATION MATRIX SIMULATOR + SVG 1 ─── */}
            {currentSlide === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-slate-800/70 rounded-2xl border border-slate-700 space-y-6"
              >
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'letter', label: 'Business Letter', icon: '✉️' },
                    { id: 'email', label: 'E-mail', icon: '📧' },
                    { id: 'audio', label: 'Audio Conference', icon: '📞' },
                    { id: 'video', label: 'Video Conference', icon: '🎥' },
                    { id: 'social', label: 'Social Media', icon: '📱' },
                  ].map((ch) => (
                    <motion.button
                      key={ch.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleChannelSelect(ch.id as 'letter' | 'email' | 'audio' | 'video' | 'social')}
                      className={`p-3 rounded-xl text-center border transition-all ${
                        selectedChannel === ch.id
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{ch.icon}</span>
                      <span className="text-xs font-bold block">{ch.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* SVG 1: Communication Architecture & Legal Evidence Flow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-slate-950 rounded-xl border border-slate-800"
                >
                  <div className="text-center mb-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      SVG 1: Business Communication Routing & Legal Evidence Engine
                    </span>
                  </div>
                  <svg viewBox="0 0 700 130" className="w-full max-h-36">
                    <defs>
                      <linearGradient id="commGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    {/* Sender Box */}
                    <rect x="20" y="35" width="120" height="60" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                    <text x="80" y="60" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">Jaipur Craftworks</text>
                    <text x="80" y="78" textAnchor="middle" fill="#94a3b8" fontSize="9">Origin: Aarav (MD)</text>

                    {/* Connecting Animated Line */}
                    <path d="M 140 65 L 260 65" stroke="url(#commGrad)" strokeWidth="3" strokeDasharray="6,4" />
                    <polygon points="260,65 250,60 250,70" fill="#06b6d4" />

                    {/* Medium Channel Center Box */}
                    <rect x="260" y="25" width="180" height="80" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                    <text x="350" y="50" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
                      {selectedChannel.toUpperCase()} CHANNEL
                    </text>
                    <text x="350" y="70" textAnchor="middle" fill="#f8fafc" fontSize="10">
                      {selectedChannel === 'letter' ? 'Physical Sealed Dispatch' : selectedChannel === 'email' ? 'Asynchronous RFC 5322' : selectedChannel === 'video' ? 'Real-Time RTP Stream' : selectedChannel === 'audio' ? 'VoIP Audio Bridge' : 'Social Public Webhook'}
                    </text>
                    <text x="350" y="90" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                      {selectedChannel === 'letter' ? 'High Legal Admissibility' : selectedChannel === 'email' ? 'Sec 65B Audit Evidence' : 'Live Interaction Value'}
                    </text>

                    {/* Connecting Line to Receiver */}
                    <path d="M 440 65 L 560 65" stroke="url(#commGrad)" strokeWidth="3" strokeDasharray="6,4" />
                    <polygon points="560,65 550,60 550,70" fill="#06b6d4" />

                    {/* Receiver Box */}
                    <rect x="560" y="35" width="120" height="60" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="620" y="60" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Recipient Client</text>
                    <text x="620" y="78" textAnchor="middle" fill="#cbd5e1" fontSize="9">Verified Evidence</text>
                  </svg>
                </motion.div>

                {/* Channel Inspector Details */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase text-indigo-400 mb-2">Technical Profile: {selectedChannel.toUpperCase()}</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                        <span className="text-slate-400">Transmission Speed:</span>
                        <span className="text-amber-300 font-bold">
                          {selectedChannel === 'letter' ? '2-3 Days (Speed Post)' : selectedChannel === 'email' ? 'Instant (Seconds)' : 'Real-time Live Stream'}
                        </span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                        <span className="text-slate-400">Legal Evidentiary Value:</span>
                        <span className="text-emerald-400 font-bold">
                          {selectedChannel === 'letter' ? 'Maximum (Sealed & Signed)' : selectedChannel === 'email' ? 'High (Digital Audit Trail)' : 'Moderate/Low'}
                        </span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-900 rounded-lg">
                        <span className="text-slate-400">Bandwidth / Infrastructure:</span>
                        <span className="text-indigo-300 font-bold">
                          {selectedChannel === 'video' ? 'High (1-2 Mbps with Camera)' : selectedChannel === 'letter' ? 'Zero Internet (India Post)' : 'Standard Telecom'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 uppercase block mb-1">Authentic ICSE Corporate Scenario:</span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {selectedChannel === 'letter' && 'Larsen & Toubro sends a ₹50 Crore sealed quotation tender to Indian Railways on official letterhead.'}
                      {selectedChannel === 'email' && 'Tata Motors sales manager emails a detailed EV fleet brochure with PDF pricing schedules to a corporate client in Mumbai.'}
                      {selectedChannel === 'audio' && 'Wipro software managers conduct a rapid 15-minute bridge sync call between Bengaluru and Hyderabad development pods.'}
                      {selectedChannel === 'video' && 'Cisco Webex demonstration of handicraft machinery between Jaipur and an overseas buyer in Germany with live screen sharing.'}
                      {selectedChannel === 'social' && 'Jaipur Craftworks broadcasts photos of newly carved sandalwood elephant statues to 5,000 retail customers on WhatsApp Business & Instagram.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── LAB 2: JOURNAL & 6-STEP ACCOUNTING CYCLE SVG 2 ─── */}
            {currentSlide === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-slate-800/70 rounded-2xl border border-slate-700 space-y-4"
              >
                {/* SVG 2: Sequential 6-Stage Accounting Cycle */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-slate-950 rounded-xl border border-slate-800"
                >
                  <div className="text-center mb-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      SVG 2: The 6-Stage Continuous Accounting Cycle Architecture
                    </span>
                  </div>
                  <svg viewBox="0 0 700 130" className="w-full max-h-36">
                    {[
                      { step: '1. Source Doc', desc: 'Voucher / Invoice', x: 20, fill: '#312e81', border: '#6366f1' },
                      { step: '2. Journal', desc: 'Original Entry', x: 135, fill: '#1e3a8a', border: '#3b82f6' },
                      { step: '3. Ledger', desc: 'Classification', x: 250, fill: '#065f46', border: '#10b981' },
                      { step: '4. Trial Balance', desc: 'Arithmetic Check', x: 365, fill: '#78350f', border: '#f59e0b' },
                      { step: '5. Final Accounts', desc: 'P&L & Balance Sheet', x: 480, fill: '#831843', border: '#ec4899' },
                      { step: '6. Interpretation', desc: 'CFO Analysis', x: 595, fill: '#4c1d95', border: '#8b5cf6' },
                    ].map((node, i) => (
                      <g key={i}>
                        <rect x={node.x} y="30" width="95" height="65" rx="8" fill={node.fill} stroke={node.border} strokeWidth="1.5" />
                        <text x={node.x + 47} y="55" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">{node.step}</text>
                        <text x={node.x + 47} y="75" textAnchor="middle" fill="#cbd5e1" fontSize="7.5">{node.desc}</text>
                        {i < 5 && (
                          <line x1={node.x + 95} y1="62" x2={node.x + 115} y2="62" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3,3" />
                        )}
                      </g>
                    ))}
                  </svg>
                </motion.div>

                {/* Golden Rules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-indigo-950/50 rounded-xl border border-indigo-700">
                    <span className="text-xs font-bold uppercase text-indigo-300 block">1. Personal Accounts</span>
                    <p className="text-xs text-slate-400 mt-1">Persons, Firms, Companies, Capital A/c</p>
                    <div className="mt-2 p-2 bg-indigo-900/50 rounded-lg font-mono text-xs text-indigo-200 font-bold">
                      Rule: Debit the receiver, Credit the giver
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-emerald-950/50 rounded-xl border border-emerald-700">
                    <span className="text-xs font-bold uppercase text-emerald-300 block">2. Real Accounts</span>
                    <p className="text-xs text-slate-400 mt-1">Tangible & Intangible Assets (Cash, Machinery)</p>
                    <div className="mt-2 p-2 bg-emerald-900/50 rounded-lg font-mono text-xs text-emerald-200 font-bold">
                      Rule: Debit what comes in, Credit what goes out
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-amber-950/50 rounded-xl border border-amber-700">
                    <span className="text-xs font-bold uppercase text-amber-300 block">3. Nominal Accounts</span>
                    <p className="text-xs text-slate-400 mt-1">Expenses, Losses, Incomes, Gains (Rent, Sales)</p>
                    <div className="mt-2 p-2 bg-amber-900/50 rounded-lg font-mono text-xs text-amber-200 font-bold">
                      Rule: Debit all expenses/losses, Credit all incomes/gains
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* ─���─ LAB 3: ACCOUNTING EQUATION BALANCE SCALE SVG 3 ─── */}
            {currentSlide === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-slate-800/70 rounded-2xl border border-slate-700 space-y-6"
              >
                {/* Predict Hook */}
                {!predictionMade ? (
                  <motion.div initial={{ y: -5 }} animate={{ y: 0 }} className="p-4 bg-indigo-950/70 rounded-xl border border-indigo-700">
                    <span className="text-xs font-bold text-amber-400 uppercase block mb-1">Step 1: Predict before manipulating</span>
                    <p className="text-sm font-semibold text-white mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handlePrediction(i)}
                          className="p-2 text-xs bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700 text-left border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-700 text-xs text-emerald-300 flex justify-between items-center">
                    <span>✓ Prediction recorded! Check the live scale balance below as you adjust sliders.</span>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setPredictionMade(false)} className="text-indigo-400 underline font-bold">
                      Reset
                    </motion.button>
                  </motion.div>
                )}

                {/* Interactive Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Owner Capital (₹):</span>
                      <span className="text-emerald-400 font-bold">₹{simCapital.toLocaleString()}</span>
                    </label>
                    <input
                      type="range"
                      min={100000}
                      max={1000000}
                      step={50000}
                      value={simCapital}
                      onChange={(e) => setSimCapital(Number(e.target.value))}
                      className="w-full mt-2 cursor-pointer"
                      aria-label="Set Owner Capital"
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Bank Loan Liability (₹):</span>
                      <span className="text-amber-400 font-bold">₹{simLoan.toLocaleString()}</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={500000}
                      step={25000}
                      value={simLoan}
                      onChange={(e) => setSimLoan(Number(e.target.value))}
                      className="w-full mt-2 cursor-pointer"
                      aria-label="Set Bank Loan Liability"
                    />
                  </motion.div>
                </div>

                {/* SVG 3: Visual Scale of Dual Aspect Balance */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-slate-950 rounded-xl border border-slate-800"
                >
                  <div className="text-center mb-2">
                    <span className="text-xs font-mono uppercase text-indigo-400">
                      SVG 3: Dual-Aspect Balance Scale Identity
                    </span>
                  </div>
                  <svg viewBox="0 0 600 120" className="w-full max-h-32">
                    {/* Fulcrum */}
                    <polygon points="300,105 285,120 315,120" fill="#6366f1" />
                    {/* Beam */}
                    <line x1="60" y1="100" x2="540" y2="100" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                    {/* Left Pan (Assets) */}
                    <line x1="120" y1="100" x2="120" y2="60" stroke="#64748b" strokeWidth="2" />
                    <rect x="60" y="30" width="120" height="30" rx="6" fill="#065f46" stroke="#10b981" strokeWidth="2" />
                    <text x="120" y="50" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">
                      Assets: ��{derivedAccounting.totalAssets.toLocaleString()}
                    </text>
                    {/* Right Pan (Liabilities + Capital) */}
                    <line x1="480" y1="100" x2="480" y2="60" stroke="#64748b" strokeWidth="2" />
                    <rect x="420" y="30" width="120" height="30" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                    <text x="480" y="50" textAnchor="middle" fill="#e0e7ff" fontSize="11" fontWeight="bold">
                      Liab + Cap: ₹{derivedAccounting.totalLiabilitiesAndCapital.toLocaleString()}
                    </text>
                  </svg>
                </motion.div>
              </motion.div>
            )}

            {/* ─── LAB 4: LEDGER & TRIAL BALANCE ENGINE ─── */}
            {currentSlide === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-slate-800/70 rounded-2xl border border-slate-700 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Cash T-Account */}
                  <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                    <div className="text-center font-bold text-emerald-400 border-b border-slate-700 pb-1 mb-2">
                      Dr. — CASH ACCOUNT (Real Account) — Cr.
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1 text-slate-300">
                        <div>To Capital A/c: ₹5,00,000</div>
                        <div>To Sales A/c: ₹1,50,000</div>
                        <div className="pt-2 border-t border-slate-800 text-emerald-400 font-bold">Total Dr: ₹6,50,000</div>
                      </div>
                      <div className="space-y-1 text-slate-300 text-right">
                        <div>By Purchases: ₹3,00,000</div>
                        <div>By Rent A/c: ₹25,000</div>
                        <div className="text-amber-400 font-bold">By Bal c/d: ₹3,25,000</div>
                        <div className="pt-2 border-t border-slate-800 text-slate-400 font-bold">Total Cr: ₹6,50,000</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Live Trial Balance Statement */}
                  <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                    <div className="text-center font-bold text-indigo-400 border-b border-slate-700 pb-1 mb-2">
                      TRIAL BALANCE as at 31st March 2024
                    </div>
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-500">
                          <th>Heads of Accounts</th>
                          <th className="text-right">Debit (₹)</th>
                          <th className="text-right">Credit (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900">
                        <tr><td>Cash in Hand (Asset)</td><td className="text-right text-emerald-400">3,25,000</td><td className="text-right">-</td></tr>
                        <tr><td>Purchases (Expense)</td><td className="text-right text-emerald-400">3,00,000</td><td className="text-right">-</td></tr>
                        <tr><td>Rent Paid (Expense)</td><td className="text-right text-emerald-400">25,000</td><td className="text-right">-</td></tr>
                        <tr><td>Capital A/c (Proprietor)</td><td className="text-right">-</td><td className="text-right text-indigo-400">5,00,000</td></tr>
                        <tr><td>Sales A/c (Revenue)</td><td className="text-right">-</td><td className="text-right text-indigo-400">1,50,000</td></tr>
                        <tr className="font-bold border-t-2 border-slate-700">
                          <td className="text-amber-400">TALLY TOTALS:</td>
                          <td className="text-right text-emerald-400">₹6,50,000</td>
                          <td className="text-right text-indigo-400">₹6,50,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </motion.div>
                </div>

                {/* Observation Check */}
                {!observationAnswered && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-900 rounded-xl border border-slate-700">
                    <p className="text-xs font-bold text-amber-400 uppercase mb-1">Observation Query:</p>
                    <p className="text-xs text-slate-200 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleObservation(i)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-left rounded text-xs text-slate-300"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ─── LAB 5: COMMERCIAL BANK INTEREST SPREAD SIMULATOR + SVG 4 ─── */}
            {currentSlide === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-slate-800/70 rounded-2xl border border-slate-700 space-y-6"
              >
                {/* SVG 4: Banking Intermediation & CRR Flow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-slate-950 rounded-xl border border-slate-800"
                >
                  <div className="text-center mb-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      SVG 4: Commercial Bank Financial Intermediation & Reserve Mechanism
                    </span>
                  </div>
                  <svg viewBox="0 0 700 130" className="w-full max-h-36">
                    {/* Depositors */}
                    <rect x="20" y="30" width="130" height="65" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="85" y="55" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">Public Savers</text>
                    <text x="85" y="75" textAnchor="middle" fill="#38bdf8" fontSize="8.5">Deposits @ {bankDepositRate.toFixed(1)}%</text>

                    {/* Arrow Depositors -> Bank */}
                    <path d="M 150 62 L 240 62" stroke="#818cf8" strokeWidth="2" strokeDasharray="4,4" />
                    <polygon points="240,62 232,58 232,66" fill="#818cf8" />

                    {/* Commercial Bank Center */}
                    <rect x="240" y="20" width="180" height="85" rx="10" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
                    <text x="330" y="45" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Commercial Bank (SBI)</text>
                    <text x="330" y="65" textAnchor="middle" fill="#34d399" fontSize="9">Spread: {bankMetrics.spreadPercentage.toFixed(1)}% Net Margin</text>
                    <text x="330" y="85" textAnchor="middle" fill="#f87171" fontSize="8">RBI CRR (4.5%): ₹{(bankMetrics.crrReserve / 100000).toFixed(1)}L</text>

                    {/* Arrow Bank -> Borrowers */}
                    <path d="M 420 62 L 510 62" stroke="#34d399" strokeWidth="2" strokeDasharray="4,4" />
                    <polygon points="510,62 502,58 502,66" fill="#34d399" />

                    {/* Borrowers Box */}
                    <rect x="510" y="30" width="150" height="65" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="585" y="55" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">Entrepreneurs (Aarav)</text>
                    <text x="585" y="75" textAnchor="middle" fill="#6ee7b7" fontSize="8.5">Lending @ {bankLendingRate.toFixed(1)}%</text>
                  </svg>
                </motion.div>

                {/* Sliders for Bank Spread */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Deposit Interest Paid to Savers (%):</span>
                      <span className="text-amber-400 font-bold">{bankDepositRate.toFixed(1)}%</span>
                    </label>
                    <input
                      type="range"
                      min={2.0}
                      max={6.0}
                      step={0.1}
                      value={bankDepositRate}
                      onChange={(e) => setBankDepositRate(Number(e.target.value))}
                      className="w-full mt-2 cursor-pointer"
                      aria-label="Set Deposit Interest Rate"
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Lending Rate Charged on Loans (%):</span>
                      <span className="text-emerald-400 font-bold">{bankLendingRate.toFixed(1)}%</span>
                    </label>
                    <input
                      type="range"
                      min={6.5}
                      max={14.0}
                      step={0.1}
                      value={bankLendingRate}
                      onChange={(e) => setBankLendingRate(Number(e.target.value))}
                      className="w-full mt-2 cursor-pointer"
                      aria-label="Set Lending Interest Rate"
                    />
                  </motion.div>
                </div>

                {/* Bank Spread Results Dashboard */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <motion.div whileHover={{ scale: 1.03 }} className="p-3 bg-slate-900 rounded-lg">
                    <span className="text-[11px] text-slate-400 block">Total Public Deposits</span>
                    <span className="text-sm font-bold text-white font-mono">₹1.00 Cr</span>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} className="p-3 bg-slate-900 rounded-lg">
                    <span className="text-[11px] text-slate-400 block">RBI CRR Buffer (4.5%)</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">₹{(bankMetrics.crrReserve / 100000).toFixed(2)} L</span>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} className="p-3 bg-slate-900 rounded-lg">
                    <span className="text-[11px] text-slate-400 block">Net Interest Spread</span>
                    <span className="text-sm font-bold text-indigo-400 font-mono">{bankMetrics.spreadPercentage.toFixed(1)}%</span>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} className="p-3 bg-slate-900 rounded-lg">
                    <span className="text-[11px] text-slate-400 block">Annual Net Profit Margin</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">₹{(bankMetrics.netInterestMargin / 100000).toFixed(2)} Lakhs</span>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Slide Navigation Buttons */}
            <div className="flex justify-between items-center pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl disabled:opacity-40 font-semibold text-sm"
              >
                ← Previous Lab
              </motion.button>
              <span className="text-xs text-slate-400">Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((s) => s + 1)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-md"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg"
                >
                  Open Free Sandbox →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 rounded-2xl border border-emerald-700/50"
            >
              <div className="flex items-center gap-2 mb-1">
                <motion.span whileHover={{ scale: 1.05 }} className="text-xs font-bold uppercase px-2.5 py-0.5 bg-emerald-500/30 text-emerald-300 rounded-md">
                  Ungraded Sandbox
                </motion.span>
              </div>
              <h3 className="text-lg font-black text-white">Full Enterprise Simulator: Play & Experiment</h3>
              <p className="text-xs text-slate-300 mt-1">
                Freely adjust transactions, test bank spreads, and inspect the dual-aspect accounting balance without test pressure.
              </p>
            </motion.div>

            {/* Sandbox Double Scale & Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-indigo-400 uppercase">1. Business Operations & Capital</h4>
                <div>
                  <label className="text-xs text-slate-400 flex justify-between">
                    <span>Initial Capital:</span>
                    <span className="text-emerald-400 font-bold">₹{simCapital.toLocaleString()}</span>
                  </label>
                  <input type="range" min={100000} max={1500000} step={50000} value={simCapital} onChange={(e) => setSimCapital(Number(e.target.value))} className="w-full cursor-pointer" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 flex justify-between">
                    <span>Bank Overdraft / Loan:</span>
                    <span className="text-amber-400 font-bold">₹{simLoan.toLocaleString()}</span>
                  </label>
                  <input type="range" min={0} max={800000} step={50000} value={simLoan} onChange={(e) => setSimLoan(Number(e.target.value))} className="w-full cursor-pointer" />
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-indigo-400 uppercase">2. Trading & Inventory Cycle</h4>
                <div>
                  <label className="text-xs text-slate-400 flex justify-between">
                    <span>Inventory Purchases:</span>
                    <span className="text-indigo-400 font-bold">₹{simInventoryBuy.toLocaleString()}</span>
                  </label>
                  <input type="range" min={50000} max={800000} step={50000} value={simInventoryBuy} onChange={(e) => setSimInventoryBuy(Number(e.target.value))} className="w-full cursor-pointer" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 flex justify-between">
                    <span>Cash Sales:</span>
                    <span className="text-purple-400 font-bold">₹{simCashSales.toLocaleString()}</span>
                  </label>
                  <input type="range" min={0} max={600000} step={50000} value={simCashSales} onChange={(e) => setSimCashSales(Number(e.target.value))} className="w-full cursor-pointer" />
                </div>
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">Equation Balance Status:</span>
              <span className="px-3 py-1 bg-emerald-900/60 border border-emerald-500 text-emerald-300 font-bold rounded-full">
                ✓ Assets (₹{derivedAccounting.totalAssets.toLocaleString()}) = Liab + Equity (₹{derivedAccounting.totalLiabilitiesAndCapital.toLocaleString()})
              </span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAdvanceToChallenge}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-extrabold rounded-xl shadow-xl text-sm"
            >
              I Am Ready for Graded Challenges! →
            </motion.button>
          </motion.div>
        )}

        {/* ─── PHASE 4: GRADED CHALLENGES ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Live Flow Canvas Animation */}
            <canvas ref={canvasRef} width={600} height={50} className="w-full bg-slate-950 rounded-xl border border-slate-800" />

            {/* Challenge Progress Header */}
            <motion.div initial={{ y: -5 }} animate={{ y: 0 }} className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span whileHover={{ scale: 1.05 }} className="text-xs px-2 py-0.5 ml-2 bg-slate-800 text-slate-300 rounded border border-slate-700">
                  NEP 2020: {activeChallenge.competencyLevel.toUpperCase()}
                </motion.span>
              </div>
              <span className="text-xs font-mono text-slate-400">Node: {activeChallenge.nodeId}</span>
            </motion.div>

            {/* Question Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={wrongShake ? { duration: 0.4 } : {}}
              className={`p-6 rounded-2xl border transition-all ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-500 shadow-rose-900/50 shadow-xl'
                  : 'bg-slate-800/90 border-slate-700'
              }`}
            >
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
                {activeChallenge.question}
              </h3>

              {/* MCQ Options */}
              {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') &&
                activeChallenge.options && (
                  <div className="grid grid-cols-1 gap-3">
                    {activeChallenge.options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => handleAnswer(i)}
                        disabled={showExplanation}
                        aria-label={`Answer option ${String.fromCharCode(65 + i)}: ${opt}`}
                        className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                          showExplanation
                            ? i === activeChallenge.correctIndex
                              ? 'bg-emerald-900/60 border-emerald-500 text-emerald-100'
                              : 'bg-slate-800/40 border-slate-700 text-slate-500'
                            : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-indigo-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <motion.span whileHover={{ scale: 1.1 }} className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                            {String.fromCharCode(65 + i)}
                          </motion.span>
                          <span>{opt}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

              {/* Drag Label Type */}
              {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {activeChallenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                      >
                        ⠿ {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['box_assets', 'box_liabilities', 'box_capital'].map((targetId) => (
                      <motion.div
                        key={targetId}
                        whileHover={{ scale: 1.02 }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 min-h-[90px] flex flex-col justify-between"
                      >
                        <span className="text-[11px] font-bold uppercase text-indigo-400">
                          {targetId === 'box_assets' ? 'Assets Column' : targetId === 'box_liabilities' ? 'Liabilities Column' : 'Capital Column'}
                        </span>
                        <div className="text-xs font-bold text-amber-300 mt-2">
                          {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop Item Here'}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Check Mapping ✓
                  </motion.button>
                </div>
              )}

              {/* Drag Sort Type */}
              {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
                <div className="space-y-3">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
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
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>{idx + 1}. {item}</span>
                      <span className="text-slate-500">⠿ Drag to reorder</span>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const ans = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems!.map((_, i) => i);
                      handleAnswer(ans);
                    }}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Check Order Sequence ✓
                  </motion.button>
                </div>
              )}

              {/* Numeric Type */}
              {activeChallenge.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter exact rupee figure"
                      className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-white w-60"
                      aria-label="Numeric answer input"
                    />
                    <span className="text-sm font-bold text-slate-400">{activeChallenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation}
                      className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl text-xs shadow-md"
                    >
                      Submit Calculation
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Construct Type */}
              {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">Click components to assemble:</p>
                  <div className="flex flex-wrap gap-2">
                    {activeChallenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts((prev) => [...prev, part])}
                        className="px-3 py-1.5 bg-indigo-900/60 border border-indigo-700 text-indigo-200 rounded-lg text-xs font-mono"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center"
                  >
                    {constructParts.map((part, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-2.5 py-1 bg-indigo-600 text-white rounded text-xs font-mono flex items-center gap-1"
                      >
                        {part}
                        <motion.button whileHover={{ scale: 1.2 }} onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))} className="text-rose-300 font-bold ml-1">×</motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && <span className="text-slate-600 text-xs italic">Constructed statement will appear here...</span>}
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Validate Constructed Entry ✓
                  </motion.button>
                </div>
              )}

              {/* Step-by-Step Progressive Disclosure Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-slate-900/90 rounded-xl border border-indigo-500/40 space-y-3"
                >
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Progressive Conceptual Breakdown:
                  </span>
                  {activeChallenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-slate-200 leading-relaxed font-sans"
                      >
                        <span className="font-bold text-indigo-400">{idx + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  <div className="pt-2 flex justify-between items-center">
                    {revealedSteps < activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setRevealedSteps((s) => s + 1)}
                        className="px-4 py-2 bg-indigo-700/60 hover:bg-indigo-600 text-indigo-100 rounded-lg text-xs font-bold shadow"
                      >
                        Reveal Next Sentence →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-lg"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mastery Session →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETION & SYNTHESIS & REFLECTION ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Score Banner */}
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 rounded-2xl border border-emerald-600/60 text-center space-y-2"
            >
              <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-4xl block mb-2">🏆</motion.span>
              <h2 className="text-2xl font-black text-white">ICSE Module Certified Complete!</h2>
              <p className="text-emerald-400 font-bold text-lg">
                Score: {Math.max(0, 100 - errors * 5)}% • Mastery Tier: {masteryLevel.toUpperCase()}
              </p>
            </motion.div>

            {/* Performance Diagnostic */}
            <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-200">
              <span className="font-bold text-amber-400 uppercase block mb-1">Performance Diagnostic:</span>
              <p>
                {errors === 0
                  ? 'PERFECT SCORE! You have mastered all 10 Commercial Studies nodes with zero conceptual errors.'
                  : errors <= 3
                  ? 'Strong Competency! You have solid command of the accounting cycle, debit/credit rules, and banking spreads.'
                  : 'Good foundation built! Review the highlighted misconception cards below and retry for distinction.'}
              </p>
            </motion.div>

            {/* Misconception Tracker */}
            {hitMisconceptions.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-rose-950/40 rounded-xl border border-rose-800 space-y-2">
                <span className="text-xs font-bold text-rose-300 uppercase block">Your Identified Conceptual Gaps:</span>
                {hitMisconceptions.map((mIdx) => {
                  const m = misconceptions[mIdx];
                  if (!m) return null;
                  return (
                    <motion.div key={mIdx} whileHover={{ scale: 1.01 }} className="p-3 bg-slate-900/90 rounded-lg text-xs">
                      <div className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</div>
                      <div className="text-emerald-300 mt-1">✓ Correction: {m.correction}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Spaced Repetition SRS Schedule */}
            <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-amber-950/40 rounded-xl border border-amber-800/60 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-amber-300 block">SM-2 Spaced Repetition Schedule:</span>
                <span className="text-slate-400">Next review scheduled in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}.</span>
              </div>
              <motion.span whileHover={{ scale: 1.1 }} className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full font-bold border border-amber-500/30">
                Active
              </motion.span>
            </motion.div>

            {/* ─── MANDATORY REFLECTION SECTION ─── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/60 rounded-2xl border border-indigo-500/40 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">💭</span>
                <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300">
                  Critical Reflection & Conceptual Synthesis
                </h3>
              </div>
              <p className="text-xs text-slate-300">
                Reflect on key principles learned to consolidate long-term memory.
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    1. What was the most surprising thing you learned?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionAnswers.surprising}
                    onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, surprising: e.target.value })}
                    placeholder="e.g., That Trade Discount is never recorded in ledger accounts..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-xs focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    2. How would you explain the Business Entity Principle to a friend?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionAnswers.explain}
                    onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, explain: e.target.value })}
                    placeholder="e.g., The owner and the business are treated as distinct legal and accounting persons..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-xs focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    3. Where in real life might you use commercial bank services or double-entry balancing?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionAnswers.realLife}
                    onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, realLife: e.target.value })}
                    placeholder="e.g., Managing current account overdrafts, negotiating bill discounting, or reconciling receipts..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-xs focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setReflectionsSaved(true);
                  audioManager.play('success');
                  speechManager.speak('Reflections recorded in your learning portfolio!');
                }}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md"
              >
                {reflectionsSaved ? '✓ Reflections Logged' : 'Save Reflection Journal'}
              </motion.button>
            </motion.div>

            {/* Real World Activity Synthesis */}
            <motion.div whileHover={{ scale: 1.01 }} className="p-6 bg-slate-800/90 rounded-2xl border border-indigo-800/60 space-y-3">
              <span className="text-xs font-bold uppercase text-indigo-400">Final Real-World Task:</span>
              <h4 className="text-sm font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h4>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="space-y-1 text-xs text-slate-400 pl-4 list-decimal">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx}>• {step}</div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Challenge Conquered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C9_CommercialStudiesMethodsCommunicationLetterSim;
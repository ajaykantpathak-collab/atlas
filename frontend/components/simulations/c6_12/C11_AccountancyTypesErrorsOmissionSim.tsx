'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

// ─��─ NODE ID CONSTANTS (ALL 10 MANDATORY NODES) ───
const NODE_C11_ACC_061 = 'c11_acc_061';
const NODE_C11_ACC_062 = 'c11_acc_062';
const NODE_C11_ACC_063 = 'c11_acc_063';
const NODE_C11_ACC_064 = 'c11_acc_064';
const NODE_C11_ACC_065 = 'c11_acc_065';
const NODE_C11_ACC_066 = 'c11_acc_066';
const NODE_C11_ACC_067 = 'c11_acc_067';
const NODE_C11_ACC_068 = 'c11_acc_068';
const NODE_C11_ACC_069 = 'c11_acc_069';
const NODE_C11_ACC_070 = 'c11_acc_070';

const ALL_NODE_IDS = [
  NODE_C11_ACC_061,
  NODE_C11_ACC_062,
  NODE_C11_ACC_063,
  NODE_C11_ACC_064,
  NODE_C11_ACC_065,
  NODE_C11_ACC_066,
  NODE_C11_ACC_067,
  NODE_C11_ACC_068,
  NODE_C11_ACC_069,
  NODE_C11_ACC_070,
];

// ─── PREDICTION QUESTIONS (BRILLIANT.ORG PREDICT-THEN-CHECK PATTERN) ───
const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If a machinery purchase of ₹50,000 is wrongly debited to the Purchases Account, what will happen to the Trial Balance totals?',
    options: [
      'Debit total will exceed Credit total by ₹50,000.',
      'Credit total will exceed Debit total by ₹50,000.',
      'The Trial Balance will remain perfectly in balance.',
      'The Suspense Account will automatically appear with ₹50,000.',
    ],
    correctIndex: 2,
    explanation: 'Both Machinery and Purchases have debit nature. Since a debit was replaced with another debit, debit-credit totals remain equal. This is an Error of Principle.',
    verifyInstruction: 'Go to Lab 1, select "Error of Principle", and observe whether the Trial Balance beam tilts or stays balanced.',
  },
  {
    id: 'pred_2',
    question: 'If ₹15,000 cash received as annual subscription is entered in the Cash Book, but ₹3,000 of it is for the next financial year, how much should be credited to the Income & Expenditure Account?',
    options: [
      '₹15,000 (entire cash received)',
      '₹18,000 (cash received + advance)',
      '₹12,000 (cash received - advance)',
      '₹3,000 (advance only)',
    ],
    correctIndex: 2,
    explanation: 'Under the accrual concept, income received in advance for the next year must be deducted from the current year income (₹15,000 - ₹3,000 = ₹12,000).',
    verifyInstruction: 'Go to Lab 5 (Subscriptions Accrual Engine), set Cash Received to ₹15,000, Advance at End to ₹3,000, and verify the computed Earned Income.',
  },
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Grand Heritage Audit & NPO Restructuring',
  intro: 'You are appointed as the Lead Forensic Accountant for Deccan Heritage Club (a century-old NPO in Hyderabad) and its commercial affiliate, Deccan Mobility Ltd. The statutory audit under Section 143 of the Companies Act 2013 and Section 12A of the Income Tax Act 1961 is in 48 hours. The Trial Balance is out of balance by ₹45,000, final accounts from last year have undiscovered capital/revenue misclassifications, and the club’s Receipts & Payments statement is completely tangled with accruals and specific fund donations.',
  context: 'Your mission: Master error classification, rectify entries with/without Suspense and through P/L Adjustment A/c, and structure the NPO financial statements to preserve tax-exempt status.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Deccan Mobility Ltd. paid ₹80,000 for installing a new hydraulic crane at the workshop and debited it to the "Machinery Installation Wages A/c" (which is closed to the Trading/P&L Account as a revenue expense). Does the Trial Balance detect this mistake?',
  options: [
    'Yes — the Trial Balance will disagree by ₹80,000 because wages is an expense.',
    'No — both Machinery and Wages carry debit balances, so debit-credit totals remain equal!',
    'Yes — because Section 143 requires all capital vouchers to have green stamps.',
    'No — because the Cash Book automatically corrects all ledger postings at month end.',
  ],
  correctIndex: 1,
  hintAfter: 'Surprised? The Trial Balance ONLY checks arithmetical equality (Debits = Credits). Errors of Principle slip right through unnoticed!',
};

// ─── INTERFACES ───
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
  nodeId: NODE_C11_ACC_061,
  title: 'Types of Accounting Errors, Rectification & NPO Financial Statements',
  definition: 'An accounting error is an unintentional mistake in recording, posting, casting, or classifying transactions. Errors are classified into omission, commission, principle, and compensating. Rectification is conducted before trial balance, after trial balance via Suspense Account, or after final accounts via P/L Adjustment Account. NPOs prepare Receipts & Payments A/c (cash basis), Income & Expenditure A/c (accrual basis), and Balance Sheet with Fund-based accounting.',
  eli5: 'Think of accounting like a giant puzzle: if you miss a piece (omission), put it in the wrong slot (commission), mistake a toy block for real gold (principle), or make two errors that accidentally cancel out (compensating), the puzzle looks strange. Rectification is using special master-keys (Suspense or P/L Adjustment) to fix the puzzle without restarting. For Non-Profits, we separate daily pocket change from huge lifetime building gifts so charity funds are never wasted.',
  misconceptions: [
    { misconception: 'If the Trial Balance agrees, there are no errors in the books.', correction: 'Two-sided errors (complete omission, errors of principle, compensating errors, and commission between same-class accounts) leave debits equal to credits perfectly!' },
    { misconception: 'Any wrong amount recorded in the journal is an error of principle.', correction: 'An error of principle specifically violates fundamental accounting rules like Capital vs. Revenue. Wrong figures or clerical mistakes are errors of commission.' },
    { misconception: 'All one-sided and two-sided errors discovered after trial balance require a Suspense Account.', correction: 'Only one-sided errors that cause trial balance disagreement use Suspense. Two-sided errors are rectified by direct journal entries without Suspense.' },
    { misconception: 'After final accounts are closed, you can directly debit the original nominal accounts (like Salary or Rent) to rectify errors.', correction: 'Nominal accounts are closed to zero at year-end. Prior-period profit-affecting rectifications must route through Profit & Loss Adjustment Account.' },
    { misconception: 'Receipts & Payments Account shows the surplus or deficit of an NPO because it contains all cash inflows.', correction: 'R&P mixes capital receipts (like building donations/legacies) with revenue income and ignores accruals. Surplus/Deficit is determined only in the Income & Expenditure Account.' },
  ],
  diagnosticQuestions: [
    { question: 'Which error type violates the capital vs revenue expenditure rule?', options: ['Error of Omission', 'Error of Principle', 'Error of Commission', 'Compensating Error'], correctIndex: 1 },
    { question: 'Where is the opening balance of a Suspense Account placed in an imbalanced Trial Balance?', options: ['On the taller side', 'Always on the debit side', 'On the shorter side to restore equality', 'In the Capital Fund directly'], correctIndex: 2 },
    { question: 'What is the nature of the Receipts and Payments Account?', options: ['Nominal Account', 'Real Account (Summary of Cash Book)', 'Personal Account', 'Representative Account'], correctIndex: 1 },
    { question: 'How is a ₹5,00,000 legacy received for constructing a library treated in an NPO?', options: ['Credited to Income & Expenditure A/c as general income', 'Debited to Capital Fund', 'Credited to Library Building Fund on the liabilities side of Balance Sheet', 'Ignored in accounting'], correctIndex: 2 },
    { question: 'When errors are rectified AFTER final accounts, why is P/L Adjustment A/c used?', options: ['Because bank accounts are frozen', 'Because nominal accounts of the prior period are already closed to zero', 'To avoid paying audit fees', 'Because of the cash basis of accounting'], correctIndex: 1 },
    { question: 'If Debit total of Trial Balance is ₹6,40,000 and Credit is ₹6,00,000, Suspense Account opens with:', options: ['₹40,000 Debit balance', '₹40,000 Credit balance', '₹20,000 on both sides', '₹80,000 Credit balance'], correctIndex: 1 },
    { question: 'Which of the following is a non-cash item included in the Income & Expenditure Account but excluded from R&P Account?', options: ['Life membership fees received', 'Depreciation on sports equipment', 'Entrance fees paid', 'Purchase of government securities'], correctIndex: 1 },
    { question: 'Outstanding subscriptions at the end of the current year are:', options: ['Deducted from subscriptions in I&E and shown as a liability', 'Added to subscriptions in I&E and shown as an asset in Balance Sheet', 'Ignored until cash is received', 'Transferred directly to Suspense Account'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery is achieved when the student can accurately classify all 4 error types, execute rectifications across all 3 accounting stages, balance Suspense ledgers, and construct NPO financial statements.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Trial Balance Scale & 4 Error Archetypes',
    instruction: 'Drag the error slider or tap each error type to see how Omission, Commission, Principle, and Compensating errors tilt or preserve the Trial Balance scale.',
    interactionType: 'error-scale-simulator',
    nodeId: NODE_C11_ACC_061,
  },
  {
    title: 'Lab 2: The Suspense Account Balance Plugger',
    instruction: 'Adjust the unlocated error sliders to see the temporary Suspense Account bridge the deficit gap on the shorter side.',
    interactionType: 'suspense-bridge-builder',
    nodeId: NODE_C11_ACC_063,
  },
  {
    title: 'Lab 3: The 3-Stage Rectification Pipeline',
    instruction: 'Toggle between Stage 1 (Before TB), Stage 2 (After TB), and Stage 3 (After Final Accounts) to watch nominal accounts transform into P/L Adjustment entries.',
    interactionType: 'pipeline-time-traveler',
    nodeId: NODE_C11_ACC_064,
  },
  {
    title: 'Lab 4: NPO Capital vs Revenue Sieve',
    instruction: 'Filter incoming NPO funds (Subscriptions, Building Legacies, Life Fees, Salaries) into their lawful destinations (I&E vs Balance Sheet Funds).',
    interactionType: 'npo-receipt-filter',
    nodeId: NODE_C11_ACC_066,
  },
  {
    title: 'Lab 5: Subscriptions Accrual Engine',
    instruction: 'Manipulate Cash Received, Outstanding at End, and Advance at End to see how the accrual formula computes the true revenue for the year.',
    interactionType: 'subscription-accrual-engine',
    nodeId: NODE_C11_ACC_070,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When you change an Error of Principle (e.g. Van purchase debited to Carriage), what do you notice about the Trial Balance beam?',
    observableOptions: [
      'The beam tilts heavily to the right (credits exceed debits).',
      'The beam remains perfectly LEVEL because both Van (Asset) and Carriage (Expense) have debit balances!',
      'The beam vibrates and flashes red immediately.',
      'The Suspense Account balance automatically increases to ₹80,000.',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_ACC_061,
  },
];

// ─── 21 PROGRESSIVE CHALLENGES (NEP 2020 COMPETENCY ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // Tier 1: Foundation (7 challenges)
  {
    id: 'ch_01_f_omission',
    nodeId: NODE_C11_ACC_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Tata Motors purchased components worth ₹5,00,000 from Bosch India on credit. The invoice was misplaced and no entry was made in the Purchases Book or ledger. Identify the error type and its effect on the Trial Balance.',
    options: [
      'Partial Omission; Trial Balance disagrees.',
      'Complete Omission; Trial Balance agrees.',
      'Error of Principle; Trial Balance disagrees.',
      'Compensating Error; Trial Balance disagrees.',
    ],
    correctIndex: 1,
    explanation: 'A complete omission leaves both debit (Purchases) and credit (Bosch India) unrecorded. Because both sides are omitted equally, the Trial Balance totals remain equal.',
    hints: [
      'Was the transaction recorded anywhere in the books?',
      'If neither debit nor credit is entered, are debits and credits still equal in total?',
      'Complete omission is a two-sided error that does NOT affect Trial Balance agreement.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_f_principle',
    nodeId: NODE_C11_ACC_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: '₹60,000 spent on erecting a new CNC machine at Larsen & Toubro was debited to the Wages Account. Why is this an Error of Principle?',
    options: [
      'Because it was posted to the wrong side of the Cash Book.',
      'Because capital expenditure (part of machine cost) was treated as revenue expenditure (wages).',
      'Because the amount written was ₹6,00,000 instead of ₹60,000.',
      'Because Wages is a personal account while Machinery is a nominal account.',
    ],
    correctIndex: 1,
    explanation: 'Installation and erection expenses for fixed assets extend benefits over multiple accounting periods and must be capitalised. Charging them to Wages violates the fundamental Capital vs Revenue principle.',
    hints: [
      'Think about whether machine erection adds to the asset value or is an everyday operating cost.',
      'Does machine installation benefit just this month or multiple years?',
      'Violating the capital vs revenue rule is the hallmark of an Error of Principle.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_f_npo_nature',
    nodeId: NODE_C11_ACC_068,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The Receipts and Payments Account of Deccan Heritage Club is classified as which type of account, and prepared on which basis?',
    options: [
      'Nominal Account on Accrual basis',
      'Real Account (Summary of Cash Book) on Cash basis',
      'Personal Account on Accrual basis',
      'Valuation Statement on Modified Cash basis',
    ],
    correctIndex: 1,
    explanation: 'The R&P Account is a summary of all cash and bank receipts and payments for the year. Since cash is a tangible asset, it is a Real Account prepared strictly on the Cash basis.',
    hints: [
      'What does R&P summarize: all nominal expenses or daily cash movements?',
      'Cash and bank balances represent real tangible assets.',
      'R&P is a Real Account prepared on Cash basis.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_04_f_drag_label',
    nodeId: NODE_C11_ACC_067,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the four core accounting records of an NPO to their respective primary functions.',
    dragItems: [
      { label: 'Cash Book', targetId: 't_daily' },
      { label: 'Receipts & Payments A/c', targetId: 't_cash_summary' },
      { label: 'Income & Expenditure A/c', targetId: 't_surplus' },
      { label: 'Balance Sheet', targetId: 't_position' },
    ],
    correctMapping: {
      t_daily: 'Cash Book',
      t_cash_summary: 'Receipts & Payments A/c',
      t_surplus: 'Income & Expenditure A/c',
      t_position: 'Balance Sheet',
    },
    explanation: 'Cash Book handles daily chronological entries, R&P provides the yearly cash summary, I&E reveals operating surplus/deficit, and the Balance Sheet discloses net financial position and fund balances.',
    hints: [
      'Which book records transactions day-by-day as they occur?',
      'Which account determines the annual surplus or deficit?',
      'The Balance Sheet reflects the net financial position on 31st March.',
    ],
  },
  {
    id: 'ch_05_f_suspense_side',
    nodeId: NODE_C11_ACC_063,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Reliance Retail’s Trial Balance reveals Debit total = ₹10,50,000 and Credit total = ₹10,00,000. On which side of the Trial Balance is the Suspense Account opened?',
    options: [
      'Debit side with ₹50,000 (to make debits even larger)',
      'Credit side with ₹50,000 (on the shorter side to balance totals)',
      'Both sides with ₹25,000 each',
      'Directly deducted from the Capital Account',
    ],
    correctIndex: 1,
    explanation: 'The golden rule of the Suspense Account: the opening difference is placed on the SHORTER side so that both sides equal the taller total (₹10,50,000).',
    hints: [
      'Which side is smaller: Debit (₹10.5L) or Credit (₹10.0L)?',
      'To make them equal, where must the ₹50,000 plug be placed?',
      'Suspense opening balance always goes on the shorter side.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_06_f_npo_specific',
    nodeId: NODE_C11_ACC_066,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How are (a) Annual Subscriptions and (b) Life Membership Fees classified in an NPO?',
    options: [
      '(a) Capital Receipt; (b) Revenue Receipt',
      '(a) Revenue Receipt; (b) Capital Receipt',
      'Both are Revenue Receipts credited to I&E',
      'Both are Capital Receipts credited to Capital Fund',
    ],
    correctIndex: 1,
    explanation: 'Annual subscriptions are recurring fees for current services (Revenue -> I&E). Life membership fees are a one-time lump-sum replacing future years (Capital -> Capital Fund in Balance Sheet).',
    hints: [
      'Which one recurs every single year from the same member?',
      'Life membership is paid once for a lifetime of membership.',
      'Recurring = Revenue; One-time long-term = Capital.',
    ],
  },
  {
    id: 'ch_07_f_noncash_item',
    nodeId: NODE_C11_ACC_069,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following items appears in the Income & Expenditure Account but NEVER in the Receipts and Payments Account?',
    options: [
      '₹1,50,000 cash paid for sports gear',
      '₹40,000 annual depreciation on the clubhouse building',
      '₹50,000 life membership fees received by cheque',
      '₹80,000 general donation received in cash',
    ],
    correctIndex: 1,
    explanation: 'Depreciation is a non-cash expense. The Receipts & Payments Account records purely cash/bank inflows and outflows, so non-cash items like depreciation appear exclusively in I&E and the Balance Sheet.',
    hints: [
      'Does anyone pay cash to a vendor for depreciation?',
      'R&P is strictly cash-based.',
      'Depreciation is an accrual non-cash adjustment that belongs in I&E.',
    ],
  },

  // Tier 2: Standard (7 challenges)
  {
    id: 'ch_08_s_rect_nosuspense',
    nodeId: NODE_C11_ACC_062,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Pass the rectifying journal entry (no suspense) for: ₹50,000 paid to Wipro for server installation wrongly debited to Repairs & Maintenance A/c.',
    availableParts: [
      'Dr Computers (Asset) A/c ₹50,000',
      'Cr Repairs & Maintenance A/c ₹50,000',
      'Dr Suspense A/c ₹50,000',
      'Cr Suspense A/c ₹50,000',
      'Dr Wages A/c ₹50,000',
    ],
    targetState: 'Dr Computers (Asset) A/c ₹50,000 Cr Repairs & Maintenance A/c ₹50,000',
    validationHint: 'Debit the correct asset account and credit the wrongly debited expense account.',
    explanation: 'Computers A/c was under-debited by ₹50,000, so Dr Computers. Repairs was wrongly debited, so Cr Repairs ₹50,000 cancels the error. No suspense is needed because both are debit accounts.',
    hints: [
      'What account should have received the debit for server installation?',
      'How do you cancel a wrong debit in Repairs? By crediting it!',
      'Combine: Dr Computers and Cr Repairs.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_09_s_rect_suspense',
    nodeId: NODE_C11_ACC_063,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: '₹18,000 paid as office rent was posted to the debit side of the Rent Account as ₹1,800. What is the rectifying entry through the Suspense Account?',
    options: [
      'Dr Rent A/c ₹16,200 | Cr Suspense A/c ₹16,200',
      'Dr Suspense A/c ₹16,200 | Cr Rent A/c ₹16,200',
      'Dr Rent A/c ₹18,000 | Cr Cash A/c ₹18,000',
      'Dr Suspense A/c ₹19,800 | Cr Rent A/c ₹19,800',
    ],
    correctIndex: 0,
    explanation: 'Rent debit side was short by ₹16,200 (₹18,000 - ₹1,800). To rectify: Dr Rent A/c ₹16,200 (topping up rent) and Cr Suspense A/c ₹16,200.',
    hints: [
      'Calculate the shortfall: ₹18,000 minus ₹1,800 = ?',
      'Does Rent need an additional debit or credit to reach ₹18,000?',
      'Debit Rent for ₹16,200 and balance with Credit to Suspense.',
    ],
  },
  {
    id: 'ch_10_s_sub_numeric',
    nodeId: NODE_C11_ACC_070,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Deccan Heritage Club received ₹4,20,000 in subscriptions during 2023-24. Subscriptions outstanding on 31.3.2024 were ₹40,000, and subscriptions received in advance for 2024-25 were ₹20,000. What subscription income should be credited to the Income & Expenditure Account for 2023-24 in Rupees?',
    correctAnswer: 440000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Accrual subscription formula: Received (₹4,20,000) + Outstanding at end (₹40,000) - Advance at end (₹20,000) = ₹4,40,000.',
    hints: [
      'Start with total subscriptions received: ₹4,20,000.',
      'Add current year income earned but not yet received (outstanding): +₹40,000.',
      'Deduct income received this year that belongs to next year (advance): -₹20,000.',
    ],
  },
  {
    id: 'ch_11_s_sort_rect_steps',
    nodeId: NODE_C11_ACC_062,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the 4 systematic steps for drafting a two-sided rectifying journal entry in the correct logical sequence.',
    sortItems: [
      'Identify the incorrect entry actually passed in the books',
      'Determine the correct entry that ought to have been passed',
      'Compare both entries to find under/over-debited and credited accounts',
      'Pass the single combined rectifying entry with explanatory narration',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First analyze what went wrong, then determine what was right, contrast the two to find discrepancies, and finally pass the adjusting entry with "Being rectification of...".',
    hints: [
      'You cannot fix an error until you know what was actually recorded.',
      'Next determine the ideal correct entry.',
      'Comparing wrong vs right leads directly to the rectifying journal entry.',
    ],
  },
  {
    id: 'ch_12_s_compensating_analysis',
    nodeId: NODE_C11_ACC_061,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Postage A/c was over-debited by ₹7,000, while another debit account (Rent A/c) was under-debited by ₹7,000. How do these errors affect the Trial Balance?',
    options: [
      'Trial balance disagrees by ₹14,000 because both are on opposite sides.',
      'Trial balance disagrees by ₹7,000.',
      'The net debit total change is zero, so the Trial Balance agrees perfectly despite multiple errors!',
      'Compensating errors always trigger statutory audit disqualification under AS-5.',
    ],
    correctIndex: 2,
    explanation: 'Compensating errors are two or more independent errors whose cumulative effect on Trial Balance equality is nil (e.g., +₹7,000 debit offset by -₹7,000 debit).',
    hints: [
      'Look closely at whether the net debit total and net credit total remain equal.',
      'Independent errors that cancel out each other’s mathematical effect are compensating.',
      'Option 3 correctly defines how debit overstatements offset debit understatements.',
    ],
  },
  {
    id: 'ch_13_s_pl_adj_logic',
    nodeId: NODE_C11_ACC_064,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'After final accounts were prepared on 31 March 2023, an unposted salary expense of ₹40,000 from 2022-23 was discovered in April 2023. Why can’t we simply debit "Salary A/c"?',
    options: [
      'Because salary payments are forbidden in April by the Income Tax Act.',
      'Because the Salary nominal account was closed to zero in last year\'s P&L; debiting it now would distort current year (2023-24) profits.',
      'Because the employee has already resigned.',
      'Because all salary entries must go through the Capital Fund directly without journal entries.',
    ],
    correctIndex: 1,
    explanation: 'All nominal accounts are closed to zero at year-end. Debiting Salary in the new year inflates the new year\'s expenses. Instead, we debit Profit & Loss Adjustment A/c to correct prior-period profit.',
    hints: [
      'What is the balance of last year\'s Salary account on 1st April? (Zero!)',
      'If you debit Salary today, which financial year\'s profit will be reduced?',
      'Route through P/L Adjustment A/c to protect the new year\'s operating results.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_14_s_npo_fund_based',
    nodeId: NODE_C11_ACC_066,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Deccan Heritage Club maintains a Tournament Fund with an opening balance of ₹3,00,000. During the year, Tournament Donations received = ₹1,50,000, and Tournament Expenses incurred = ₹2,20,000. How is this presented?',
    options: [
      'Tournament Expenses (₹2,20,000) debited to I&E; Donations (₹1,50,000) credited to I&E.',
      'Tournament Fund in Balance Sheet shown as ₹3,00,000 + ₹1,50,000 - ₹2,20,000 = ₹2,30,000 on liabilities side.',
      'The entire ₹4,50,000 is transferred to the Capital Fund.',
      'Deducted from Cash Book closing balance as an extraordinary loss.',
    ],
    correctIndex: 1,
    explanation: 'Under fund-based accounting, receipts and expenses relating to a specific fund are added and deducted directly in that Fund account on the Balance Sheet liabilities side, bypassing I&E.',
    hints: [
      'When a dedicated fund exists, do its related expenses go to general I&E or the specific fund?',
      'Opening Fund + Related Income - Related Expenses = Closing Fund Balance.',
      'Closing balance is ₹2,30,000 on the liabilities side.',
    ],
  },

  // Tier 3: Advanced (7 challenges)
  {
    id: 'ch_15_a_pl_adj_eval',
    nodeId: NODE_C11_ACC_064,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In May 2024 (after final accounts of FY24 were closed), an auditor discovered: (1) Office air-conditioner purchase of ₹60,000 debited to Electricity Expenses; (2) ₹20,000 payment to Creditor A debited to Creditor B. Which statement correctly evaluates their treatment?',
    options: [
      'Both errors must be routed through the Profit & Loss Adjustment Account.',
      'Item (1) affects prior profit (Dr AC Asset, Cr P/L Adj ₹60,000); Item (2) is a pure Balance Sheet error (Dr Creditor B, Cr Creditor A) and bypasses P/L Adj completely!',
      'Neither item affects P/L Adjustment because books once closed can never be touched.',
      'Item (2) is routed through P/L Adjustment while Item (1) is posted to Suspense.',
    ],
    correctIndex: 1,
    explanation: 'P/L Adjustment A/c is reserved exclusively for items affecting prior period nominal/profit results. Item (2) is a pure liability-to-liability shift that never touched profit, so it bypasses P/L Adjustment.',
    hints: [
      'Did wrongly debiting Creditor B instead of Creditor A change the net profit of last year?',
      'Did debiting AC purchase to Electricity change last year\'s net profit?',
      'Only profit-altering errors pass through P/L Adjustment.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_16_a_suspense_closing_numeric',
    nodeId: NODE_C11_ACC_065,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trial Balance difference opened with ₹60,000 Credit in Suspense A/c. Rectifications passed: (1) Rent under-debited by ₹13,500 (Cr Suspense); (2) Debtor under-credited by ₹22,000 (Dr Suspense); (3) Sales credit omitted ₹16,000 (Dr Suspense); (4) Electricity under-debited by ₹10,000 (Cr Suspense). What is the residual closing balance of Suspense in Rupees (enter positive number)?',
    correctAnswer: 45500,
    tolerance: 0,
    unit: '₹ Credit',
    explanation: 'Credits to Suspense: Opening ₹60,000 + Rent ₹13,500 + Electricity ₹10,000 = ₹83,500. Debits to Suspense: Debtor ₹22,000 + Sales ₹16,000 = ₹38,000. Residual Credit Balance = ₹83,500 - ₹38,000 = ₹45,500.',
    hints: [
      'Sum all credit entries: Opening (₹60,000) + Rent rect (₹13,500) + Electricity rect (₹10,000).',
      'Sum all debit entries: Debtor rect (₹22,000) + Sales rect (₹16,000).',
      'Subtract total debits from total credits: ₹83,500 - ₹38,000 = ?',
    ],
  },
  {
    id: 'ch_17_a_wrong_side_commission',
    nodeId: NODE_C11_ACC_063,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: '₹12,000 discount allowed to a customer was mistakenly posted to the CREDIT side of the Discount Allowed Account. What is the rectifying entry through Suspense?',
    options: [
      'Dr Discount Allowed A/c ₹12,000 | Cr Suspense A/c ₹12,000',
      'Dr Suspense A/c ₹24,000 | Cr Discount Allowed A/c ₹24,000',
      'Dr Discount Allowed A/c ₹24,000 | Cr Suspense A/c ₹24,000',
      'Dr Discount Allowed A/c ₹12,000 | Cr Customer A/c ₹12,000',
    ],
    correctIndex: 2,
    explanation: 'Discount allowed is a debit account. Crediting it by ₹12,000 created a double error: the wrong credit must be cancelled (+₹12,000 Dr) AND the correct debit added (+₹12,000 Dr). Total required = Dr Discount Allowed ₹24,000, Cr Suspense ₹24,000.',
    hints: [
      'When an entry is posted to the WRONG SIDE, the error amount is doubled!',
      'You need ₹12,000 to neutralize the wrong credit and another ₹12,000 to post the right debit.',
      'Debit Discount Allowed for 2 x ₹12,000 = ₹24,000.',
    ],
  },
  {
    id: 'ch_18_a_npo_full_surplus',
    nodeId: NODE_C11_ACC_070,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'NPO Data: Subscriptions earned for year = ₹4,40,000; General Donations = ₹1,20,000; Interest on Investments = ₹50,000; Legacy for Eye Camp = ₹6,00,000; Rent incurred (including ₹20k o/s) = ₹2,60,000; Salaries = ₹3,00,000; Depreciation on Equipment = ₹30,000. Calculate Net Surplus to be transferred to Capital Fund in Rupees.',
    correctAnswer: 20000,
    tolerance: 0,
    unit: '₹ Surplus',
    explanation: 'Total Revenue Income = Subscriptions (₹4,40,000) + General Donations (₹1,20,000) + Interest (₹50,000) = ₹6,10,000. (Legacy ₹6L is capital and excluded!). Total Revenue Expenditure = Rent (₹2,60,000) + Salaries (₹3,00,000) + Depreciation (₹30,000) = ₹5,90,000. Surplus = ₹6,10,000 - ₹5,90,000 = ₹20,000.',
    hints: [
      'Do NOT include the ₹6,00,000 Legacy in Income (it is a capital fund receipt).',
      'Calculate Total Income: ₹4,40,000 + ₹1,20,000 + ₹50,000 = ₹6,10,000.',
      'Calculate Total Expenditure: ₹2,60,000 + ₹3,00,000 + ₹30,000 = ₹5,90,000.',
    ],
  },
  {
    id: 'ch_19_a_drag_sort_statements',
    nodeId: NODE_C11_ACC_070,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Arrange the sequence of procedures to prepare NPO Final Statements from a raw Receipts & Payments account.',
    sortItems: [
      'Filter and separate capital receipts/payments from revenue receipts/payments',
      'Apply accrual adjustments (outstanding/advance subscriptions, prepaid/unpaid expenses, depreciation)',
      'Construct Income & Expenditure Account and determine operating Surplus or Deficit',
      'Compile Closing Balance Sheet updating Capital Fund (Opening + Capital Receipts + Surplus - Deficit)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The logical accounting pipeline: first filter capital vs revenue, adjust revenue items for accruals, compute surplus in I&E, and finally construct the Closing Balance Sheet with updated funds.',
    hints: [
      'Step 1 is always sorting capital vs revenue items.',
      'Step 2 adds non-cash and timing adjustments.',
      'Step 3 calculates the surplus which feeds into the closing balance sheet in Step 4.',
    ],
  },
  {
    id: 'ch_20_a_statutory_eval',
    nodeId: NODE_C11_ACC_064,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under Section 130 of Companies Act 2013 and AS-5, how does corporate accounting handle prior-period material errors compared to the ISC school P/L Adjustment method?',
    options: [
      'Corporates reopen and amend the previous year’s statutory income tax returns, while school accounting ignores them.',
      'Corporates adjust material prior-period errors retrospectively in the opening balance of Retained Earnings/Reserves, which mirrors the P/L Adjustment transfer to Capital Fund at school level.',
      'Corporates are exempt from rectifying errors if the auditor issues a qualified report.',
      'Both methods require redrafting the previous 3 years of balance sheets in full.',
    ],
    correctIndex: 1,
    explanation: 'AS-5 / Ind AS 8 mandates retrospective restatement through opening retained earnings. The P/L Adjustment A/c transferring its net balance directly into Capital Fund is the precise high-school analogue of this corporate standard.',
    hints: [
      'Think about how Retained Earnings in a company compares to the Capital Fund in a proprietorship/NPO.',
      'Neither school level nor AS-5 permits tampering with closed past nominal accounts.',
      'Option 2 correctly links AS-5 Retained Earnings to Capital Fund adjustment.',
    ],
  },
  {
    id: 'ch_21_a_tax_compliance_eval',
    nodeId: NODE_C11_ACC_066,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An NPO received ₹50,00,000 for constructing an auditorium. If the treasurer mistakenly credits this to the Income & Expenditure Account as general revenue, what is the grave compliance consequence under Section 11 of the Income Tax Act 1961?',
    options: [
      'The club is forced to convert into a public limited company immediately.',
      'The donation is treated as taxable revenue income, forcing the NPO to apply 85% of ₹50 Lakhs in the current year or lose Section 12A tax exemption on unspent balances!',
      'The bank will freeze all savings accounts for 90 days under RBI directions.',
      'No consequence because tax authorities only examine cash balances.',
    ],
    correctIndex: 1,
    explanation: 'Section 11 exempts capital corpus donations from the mandatory 85% current-year application rule. Treating it as revenue inflates income, triggering hefty tax liabilities or cancellation of Section 12A exemption if 85% is not disbursed.',
    hints: [
      'What percentage of annual revenue income must an NPO apply to its objects under Section 11?',
      'Corpus (capital) donations are protected from this 85% spending mandate.',
      'Misclassifying it as revenue creates an artificial tax liability.',
    ],
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Forensic Audit Challenge: Deccan Heritage Club',
  description: 'Apply your master accountant skills to verify a live Indian sports society. Download their public balance sheet, trace corpus donations, calculate subscription accruals, and confirm whether 85% of revenue income was applied to charitable objects under Section 11 of the Income Tax Act 1961.',
  steps: [
    'Download the FY24 Receipts & Payments statement of a registered Indian society.',
    'Filter out all Capital items: Life Membership, Building Legacies, and Asset purchases.',
    'Formulate the Subscription Accrual schedule: Cash + Ending Outstanding - Ending Advance.',
    'Prepare the final T-format Income & Expenditure Account and compute the Net Surplus.',
    'Verify that the Closing Capital Fund equals Opening Fund + Surplus + Capital Receipts.',
  ],
};

// ─── MAIN COMPONENT ───
function C11_AccountancyTypesErrorsOmissionSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_ACC_061,
  title = DEFAULT_PROPS.title || 'Accounting Errors & NPO Statements',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['acc'] || { name: 'Accountancy', emoji: '📒', color: 'indigo' };

  // ─── STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Discovery & Observation States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState<number | null>(null);

  // Escalating Hints & Explanations
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Interactive Inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Lab 1: Trial Balance Beam Interactive State
  const [simErrorType, setSimErrorType] = useState<'none' | 'omission' | 'commission' | 'principle' | 'compensating'>('none');
  const [simDebitAmount, setSimDebitAmount] = useState(500000);
  const [simCreditAmount, setSimCreditAmount] = useState(500000);

  // Lab 2: Suspense Bridge State
  const [suspenseOpeningDiff, setSuspenseOpeningDiff] = useState(45000);
  const [suspenseRectifiedAmount, setSuspenseRectifiedAmount] = useState(0);

  // Lab 3: 3-Stage Pipeline State
  const [selectedPipelineStage, setSelectedPipelineStage] = useState<1 | 2 | 3>(2);

  // Lab 4: NPO Capital vs Revenue Sieve State
  const [sieveSelectedItem, setSieveSelectedItem] = useState<string>('subscriptions');

  // Lab 5 & Sandbox: Subscriptions Accrual Engine State
  const [subCashReceived, setSubCashReceived] = useState(400000);
  const [subOutstandingEnd, setSubOutstandingEnd] = useState(40000);
  const [subAdvanceEnd, setSubAdvanceEnd] = useState(20000);

  // Sandbox Mode tab selection
  const [sandboxTab, setSandboxTab] = useState<'errors' | 'npo'>('errors');

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── COMPUTED REAL-TIME VALUES ───
  const computedSubIncome = useMemo(() => {
    return subCashReceived + subOutstandingEnd - subAdvanceEnd;
  }, [subCashReceived, subOutstandingEnd, subAdvanceEnd]);

  const tbBeamTilt = useMemo(() => {
    const diff = simDebitAmount - simCreditAmount;
    if (diff === 0) return 0;
    return Math.max(-15, Math.min(15, (diff / 50000) * 12));
  }, [simDebitAmount, simCreditAmount]);

  // Chart data for NPO Accrual vs Cash comparison
  const npoChartData = useMemo(() => {
    return [
      { name: 'Cash Received (R&P)', amount: subCashReceived, fill: '#3b82f6' },
      { name: '+ Outstanding End', amount: subOutstandingEnd, fill: '#10b981' },
      { name: '- Advance End', amount: subAdvanceEnd, fill: '#ef4444' },
      { name: 'Earned Income (I&E)', amount: computedSubIncome, fill: '#8b5cf6' },
    ];
  }, [subCashReceived, subOutstandingEnd, subAdvanceEnd, computedSubIncome]);

  // ─── MOUNT MASTERY EFFECT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTER ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS 2D REAL-TIME ANIMATION ───
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

      // Ledger grid background
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Ledger center divider
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();

      // Flowing reconciliation particles
      const count = 5;
      for (let i = 0; i < count; i++) {
        const speed = 1.2 + i * 0.3;
        const xPos = ((frame * speed + i * (canvas.width / count)) % canvas.width);
        const yPos = 18 + Math.sin((frame + i * 20) * 0.05) * 6;
        const isLeft = xPos < canvas.width / 2;

        ctx.fillStyle = isLeft ? '#38bdf8' : '#a855f7';
        ctx.beginPath();
        ctx.arc(xPos, yPos, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Animated balancing pulse in center
      const pulse = Math.sin(frame * 0.08) * 3;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 20, 5 + pulse, 0, Math.PI * 2);
      ctx.fill();

      // Text labels on canvas
      ctx.font = '10px monospace';
      ctx.fillStyle = '#64748b';
      ctx.fillText('Dr. SIDE AUDIT FLOW', 15, 14);
      ctx.fillText('Cr. SIDE AUDIT FLOW', canvas.width - 140, 14);

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive accounting labs. Interact with each model to discover core rules.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test any numbers freely with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenges. You have 3 escalating hints if you ever get stuck.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Exact scientific observation!' : 'Look closer at the balance beam tilt.');
  }, []);

  const handleApplyErrorType = useCallback((type: 'none' | 'omission' | 'commission' | 'principle' | 'compensating') => {
    setSimErrorType(type);
    audioManager.play('balance');
    if (type === 'none') {
      setSimDebitAmount(500000);
      setSimCreditAmount(500000);
      speechManager.speak('Books balanced. Debits equal Credits.');
    } else if (type === 'omission') {
      setSimDebitAmount(420000);
      setSimCreditAmount(420000);
      speechManager.speak('Complete omission: Both debit and credit omitted. Scale stays balanced!');
    } else if (type === 'commission') {
      setSimDebitAmount(525000);
      setSimCreditAmount(500000);
      speechManager.speak('One-sided commission error: Debit side is heavier by ₹25,000! Trial Balance disagrees.');
    } else if (type === 'principle') {
      setSimDebitAmount(500000);
      setSimCreditAmount(500000);
      speechManager.speak('Error of Principle: Capital treated as Revenue. Both are debit balances, so scale is deceptively level!');
    } else if (type === 'compensating') {
      setSimDebitAmount(510000);
      setSimCreditAmount(510000);
      speechManager.speak('Compensating error: Two mistakes coincidentally cancel out.');
    }
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
        setWrongShake(true);
        setTimeout(() => setWrongShake(false), 500);
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const arr = prev.length === 4 ? [...prev] : [0, 1, 2, 3];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Magnificent! You have mastered Trial Balance Rectifications and NPO Financial Accounting.');
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
        const orderToTest = Array.isArray(answer) && answer.length === 4 ? answer : [0, 1, 2, 3];
        isCorrect = JSON.stringify(orderToTest) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct entry! Perfectly reconciled.');
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
          speechManager.speak('Let us study the complete step-by-step solution together.');
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

  const handleSubCashChange = useCallback((val: number) => {
    setSubCashReceived(val);
    audioManager.play('count');
  }, []);

  const handleSubOutstandingChange = useCallback((val: number) => {
    setSubOutstandingEnd(val);
    audioManager.play('count');
  }, []);

  const handleSubAdvanceChange = useCallback((val: number) => {
    setSubAdvanceEnd(val);
    audioManager.play('count');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Motivational message calculation
  const motivationalFeedback = useMemo(() => {
    if (errors === 0) return { title: 'PERFECT SCORE!', desc: 'Flawless forensic auditing! You mastered all 4 error classifications, suspense mechanisms, and NPO fund statements with zero mistakes.', color: 'text-emerald-400', badgeBg: 'bg-emerald-500/20 border-emerald-500/50' };
    if (errors <= 3) return { title: 'Great work!', desc: 'Excellent conceptual grasp! You navigated two-sided rectifications, P/L Adjustment entries, and subscription accruals with high competence.', color: 'text-indigo-400', badgeBg: 'bg-indigo-500/20 border-indigo-500/50' };
    if (errors <= 7) return { title: 'Good effort!', desc: 'Solid attempt! Review the specific fund accounting rules and Suspense ledger posting to turn these mistakes into mastery.', color: 'text-amber-400', badgeBg: 'bg-amber-500/20 border-amber-500/50' };
    return { title: 'Do not give up — You WILL get this!', desc: 'Accounting conventions require persistent pattern recognition. Replay the interactive labs to sharpen your core principles!', color: 'text-rose-400', badgeBg: 'bg-rose-500/20 border-rose-500/50' };
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-inner">
            {subjectConfig.emoji}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-indigo-400 font-medium">ISC Class 11 Accountancy • Forensic Rectification & NPO Core</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 text-xs font-black rounded-full uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : difficulty === 'advanced'
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs text-slate-400">
            Mastery: <span className="text-indigo-300 font-bold capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── REAL-TIME CANVAS LEDGER ANIMATION BAR ─── */}
      <div className="mb-6">
        <canvas
          ref={canvasRef}
          width={700}
          height={36}
          className="w-full h-9 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-inner"
        />
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/40 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2">
              <span>🏛️</span> {SCENARIO.title}
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-400">
              💡 {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold uppercase">
                Curiosity Discovery Hook
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700/60 text-slate-200 hover:bg-slate-800 hover:border-indigo-500'
                  }`}
                  aria-label={`Option ${i + 1}: ${opt}`}
                >
                  <span className="font-bold text-indigo-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                <div
                  className={`p-4 rounded-xl border text-sm ${
                    discoveryCorrect
                      ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                      : 'bg-amber-950/40 border-amber-800/60 text-amber-300'
                  }`}
                >
                  {discoveryCorrect
                    ? '🎉 Brilliant intuition! Because both accounts carry debit balances, the Trial Balance totals stay identical.'
                    : DISCOVERY_QUESTION.hintAfter}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  Enter Interactive Accounting Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: EXPLORE (5 INTERACTIVE LABS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-800'
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
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4"
            >
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
                <p className="text-sm text-indigo-300 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: SVG DIAGRAM 1 — TRIAL BALANCE SCALE & 4 ERROR ARCHETYPES */}
              {currentSlide === 0 && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'none', label: 'Balanced State' },
                      { id: 'omission', label: 'Complete Omission' },
                      { id: 'commission', label: 'One-Sided Commission' },
                      { id: 'principle', label: 'Error of Principle' },
                      { id: 'compensating', label: 'Compensating Error' },
                    ].map((btn) => (
                      <motion.button
                        key={btn.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleApplyErrorType(btn.id as 'none' | 'omission' | 'commission' | 'principle' | 'compensating')}
                        className={`p-2.5 text-xs font-bold rounded-xl border transition-all ${
                          simErrorType === btn.id
                            ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        {btn.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG DIAGRAM 1: Balance Scale Visualization */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 500 240" className="w-full max-w-lg h-52">
                      {/* Base stand */}
                      <path d="M220 220 L280 220 L250 140 Z" fill="#334155" />
                      <line x1="250" y1="140" x2="250" y2="40" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="250" cy="40" r="7" fill="#818cf8" />

                      {/* Tilting Beam */}
                      <g transform={`rotate(${tbBeamTilt}, 250, 40)`}>
                        <line x1="80" y1="40" x2="420" y2="40" stroke="#818cf8" strokeWidth="6" strokeLinecap="round" />
                        {/* Left Pan (Debit) */}
                        <line x1="100" y1="40" x2="70" y2="120" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="100" y1="40" x2="130" y2="120" stroke="#94a3b8" strokeWidth="2" />
                        <path d="M50 120 Q100 140 150 120 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />

                        {/* Right Pan (Credit) */}
                        <line x1="400" y1="40" x2="370" y2="120" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="400" y1="40" x2="430" y2="120" stroke="#94a3b8" strokeWidth="2" />
                        <path d="M350 120 Q400 140 450 120 Z" fill="#1e293b" stroke="#a855f7" strokeWidth="3" />

                        {/* Pan Labels */}
                        <text x="100" y="110" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                          DEBIT: ₹{simDebitAmount.toLocaleString('en-IN')}
                        </text>
                        <text x="400" y="110" textAnchor="middle" fill="#a855f7" fontSize="11" fontWeight="bold">
                          CREDIT: ₹{simCreditAmount.toLocaleString('en-IN')}
                        </text>
                      </g>

                      {/* Ground reference */}
                      <line x1="50" y1="220" x2="450" y2="220" stroke="#1e293b" strokeWidth="2" />
                    </svg>

                    <div className="w-full max-w-md mt-2 flex justify-between text-xs font-mono px-4 py-2 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-sky-400 font-bold">Total Debits: ₹{simDebitAmount.toLocaleString('en-IN')}</span>
                      <span className="text-purple-400 font-bold">Total Credits: ₹{simCreditAmount.toLocaleString('en-IN')}</span>
                      <span className={`font-black ${simDebitAmount === simCreditAmount ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {simDebitAmount === simCreditAmount ? 'STATUS: BALANCED' : 'STATUS: DISAGREES'}
                      </span>
                    </div>
                  </div>

                  {/* Observation hook */}
                  {!observationAnswered && (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/40 space-y-2">
                      <p className="text-xs sm:text-sm font-bold text-indigo-300">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className={`text-left p-2.5 rounded-lg text-xs ${
                              observationIndex === i
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                            }`}
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SLIDE 1: SVG DIAGRAM 2 — SUSPENSE ACCOUNT BALANCE PLUGGER */}
              {currentSlide === 1 && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">Trial Balance Discrepancy (Debit Excess):</span>
                      <span className="text-indigo-400 font-mono font-bold">₹{suspenseOpeningDiff.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={10000}
                      max={100000}
                      step={5000}
                      value={suspenseOpeningDiff}
                      onChange={(e) => setSuspenseOpeningDiff(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                      aria-label="Adjust Suspense Opening Difference"
                    />

                    <div className="flex justify-between items-center text-xs pt-2">
                      <span className="text-slate-400 font-medium">Errors Located & Rectified:</span>
                      <span className="text-emerald-400 font-mono font-bold">₹{suspenseRectifiedAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={suspenseOpeningDiff}
                      step={5000}
                      value={suspenseRectifiedAmount}
                      onChange={(e) => setSuspenseRectifiedAmount(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                      aria-label="Adjust Rectified Error Amount"
                    />

                    {/* SVG DIAGRAM 2: Suspense Bridge Vector */}
                    <div className="w-full bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-center">
                      <svg viewBox="0 0 520 160" className="w-full max-w-lg h-36">
                        {/* Shorter Side Pillar */}
                        <rect x="40" y="70" width="100" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="90" y="105" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Credit Side</text>
                        <text x="90" y="125" textAnchor="middle" fill="#94a3b8" fontSize="9">Shortage Gap</text>

                        {/* Suspense Bridge Block */}
                        <rect x="180" y="30" width="160" height="60" rx="10" fill="#4338ca" stroke="#818cf8" strokeWidth="2" />
                        <text x="260" y="55" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">SUSPENSE A/C PLUG</text>
                        <text x="260" y="75" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontFamily="monospace">
                          ₹{(suspenseOpeningDiff - suspenseRectifiedAmount).toLocaleString('en-IN')} Remaining
                        </text>

                        {/* Taller Side Pillar */}
                        <rect x="380" y="30" width="100" height="110" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                        <text x="430" y="75" textAnchor="middle" fill="#a855f7" fontSize="11" fontWeight="bold">Debit Side</text>
                        <text x="430" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9">Taller Side</text>

                        {/* Arrows */}
                        <path d="M140 100 L180 65" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 4" />
                        <path d="M340 65 L380 65" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 4" />
                        <text x="260" y="125" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">
                          Rectified: ₹{suspenseRectifiedAmount.toLocaleString('en-IN')}
                        </text>
                      </svg>
                    </div>

                    {/* Suspense T-Account Display */}
                    <div className="mt-2 p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-center font-bold text-xs text-indigo-400 pb-2 border-b border-slate-800">
                        Dr. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Suspense Account (T-Format) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cr.
                      </div>
                      <div className="grid grid-cols-2 divide-x divide-slate-800 text-xs font-mono pt-3 min-h-[70px]">
                        <div className="space-y-1 pr-2">
                          {suspenseRectifiedAmount > 0 && (
                            <div className="flex justify-between text-emerald-400">
                              <span>To Rectified Error A/cs</span>
                              <span>₹{suspenseRectifiedAmount.toLocaleString('en-IN')}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-indigo-300 font-bold pt-1 border-t border-slate-800">
                            <span>To Balance c/d (Unlocated)</span>
                            <span>₹{(suspenseOpeningDiff - suspenseRectifiedAmount).toLocaleString('en-IN')}</span>
                          </div>
                        </div>

                        <div className="space-y-1 pl-2">
                          <div className="flex justify-between text-slate-300">
                            <span>By Difference in TB (b/d)</span>
                            <span>₹{suspenseOpeningDiff.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: SVG DIAGRAM 3 — 3-STAGE RECTIFICATION PIPELINE */}
              {currentSlide === 2 && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 1, title: 'Stage 1: Before TB', desc: 'Direct Ledger Correction Note' },
                      { id: 2, title: 'Stage 2: After TB (Open Books)', desc: 'Suspense Account Routing' },
                      { id: 3, title: 'Stage 3: After Final Accounts', desc: 'P/L Adjustment A/c Method' },
                    ].map((stage) => (
                      <motion.button
                        key={stage.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPipelineStage(stage.id as 1 | 2 | 3)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedPipelineStage === stage.id
                            ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg'
                            : 'bg-slate-850 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <div className="text-xs font-bold text-indigo-300">{stage.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{stage.desc}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG DIAGRAM 3: 3-Stage Pipeline Architecture */}
                  <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 540 130" className="w-full max-w-lg h-28">
                      {/* Step 1 Box */}
                      <rect
                        x="10"
                        y="20"
                        width="150"
                        height="80"
                        rx="8"
                        fill={selectedPipelineStage === 1 ? '#1e1b4b' : '#0f172a'}
                        stroke={selectedPipelineStage === 1 ? '#818cf8' : '#334155'}
                        strokeWidth="2"
                      />
                      <text x="85" y="45" textAnchor="middle" fill="#818cf8" fontSize="11" fontWeight="bold">Stage 1: Pre-TB</text>
                      <text x="85" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">Direct Ledger Note</text>
                      <text x="85" y="80" textAnchor="middle" fill="#64748b" fontSize="8">(No Suspense)</text>

                      {/* Arrow 1 */}
                      <line x1="160" y1="60" x2="190" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

                      {/* Step 2 Box */}
                      <rect
                        x="195"
                        y="20"
                        width="150"
                        height="80"
                        rx="8"
                        fill={selectedPipelineStage === 2 ? '#1e1b4b' : '#0f172a'}
                        stroke={selectedPipelineStage === 2 ? '#6366f1' : '#334155'}
                        strokeWidth="2"
                      />
                      <text x="270" y="45" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">Stage 2: Post-TB</text>
                      <text x="270" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">Suspense Journal Entry</text>
                      <text x="270" y="80" textAnchor="middle" fill="#6366f1" fontSize="8">(One-sided only)</text>

                      {/* Arrow 2 */}
                      <line x1="345" y1="60" x2="375" y2="60" stroke="#64748b" strokeWidth="2" />

                      {/* Step 3 Box */}
                      <rect
                        x="380"
                        y="20"
                        width="150"
                        height="80"
                        rx="8"
                        fill={selectedPipelineStage === 3 ? '#064e3b' : '#0f172a'}
                        stroke={selectedPipelineStage === 3 ? '#34d399' : '#334155'}
                        strokeWidth="2"
                      />
                      <text x="455" y="45" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">Stage 3: Next Year</text>
                      <text x="455" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">P/L Adjustment A/c</text>
                      <text x="455" y="80" textAnchor="middle" fill="#10b981" fontSize="8">→ Capital Fund</text>
                    </svg>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs leading-relaxed">
                    {selectedPipelineStage === 1 && (
                      <div className="space-y-1">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Stage 1 Rule</span>
                        <p className="text-slate-300">No Trial Balance exists yet. One-sided errors require NO journal entry; an explanatory note is written directly on the defective ledger page. Two-sided errors use direct journal entries.</p>
                      </div>
                    )}
                    {selectedPipelineStage === 2 && (
                      <div className="space-y-1">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">Stage 2 Rule (ISC Core)</span>
                        <p className="text-slate-300">Trial Balance is extracted and out of balance. One-sided errors MUST route through the <span className="text-indigo-400 font-bold">Suspense Account</span>. Two-sided errors are rectified by direct journal entries (no Suspense needed!).</p>
                      </div>
                    )}
                    {selectedPipelineStage === 3 && (
                      <div className="space-y-1">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Stage 3 Rule (After Closure)</span>
                        <p className="text-slate-300">Books are closed and nominal accounts transferred to P&L. Any error affecting prior-year profit is routed through <span className="text-emerald-400 font-bold">P/L Adjustment A/c</span>, whose net balance transfers to Capital. Pure Balance Sheet errors bypass P/L Adj!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 3: SVG DIAGRAM 4 — NPO CAPITAL VS REVENUE SIEVE */}
              {currentSlide === 3 && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'subscriptions', label: 'Annual Subscriptions' },
                      { id: 'legacy_building', label: 'Building Legacy (₹10L)' },
                      { id: 'life_membership', label: 'Life Membership Fee' },
                      { id: 'salaries_paid', label: 'Club Staff Salaries' },
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSieveSelectedItem(item.id)}
                        className={`p-3 text-xs font-bold rounded-xl border transition-all ${
                          sieveSelectedItem === item.id
                            ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG DIAGRAM 4: NPO Sieve Funnel Architecture */}
                  <div className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 500 110" className="w-full max-w-lg h-24">
                      {/* Intake Hopper */}
                      <polygon points="180,10 320,10 280,45 220,45" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                      <text x="250" y="28" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold">Receipts & Payments A/c (Raw Inflows)</text>

                      {/* Left Funnel Route: Revenue */}
                      <path d="M220 45 L100 80" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                      <rect x="30" y="70" width="140" height="32" rx="6" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="100" y="90" textAnchor="middle" fill="#bae6fd" fontSize="9" fontWeight="bold">Income & Expenditure A/c</text>

                      {/* Right Funnel Route: Capital */}
                      <path d="M280 45 L400 80" stroke="#c084fc" strokeWidth="2" strokeDasharray="3 3" />
                      <rect x="330" y="70" width="140" height="32" rx="6" fill="#581c87" stroke="#c084fc" strokeWidth="1.5" />
                      <text x="400" y="90" textAnchor="middle" fill="#f3e8ff" fontSize="9" fontWeight="bold">Balance Sheet Funds</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl border transition-all ${
                      sieveSelectedItem === 'subscriptions' || sieveSelectedItem === 'salaries_paid'
                        ? 'bg-indigo-950/60 border-indigo-500 shadow-lg'
                        : 'bg-slate-900/40 border-slate-800 opacity-40'
                    }`}>
                      <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Income & Expenditure Account (Revenue)</h4>
                      <p className="text-xs text-slate-300 mt-2">
                        {sieveSelectedItem === 'subscriptions' && '✓ Subscriptions: Recurring member income -> Credited to I&E A/c.'}
                        {sieveSelectedItem === 'salaries_paid' && '✓ Staff Salaries: Recurring operating cost -> Debited to I&E A/c.'}
                        {(sieveSelectedItem === 'legacy_building' || sieveSelectedItem === 'life_membership') && '✗ Excluded! Capital items never touch I&E.'}
                      </p>
                    </div>

                    <div className={`p-4 rounded-xl border transition-all ${
                      sieveSelectedItem === 'legacy_building' || sieveSelectedItem === 'life_membership'
                        ? 'bg-purple-950/60 border-purple-500 shadow-lg'
                        : 'bg-slate-900/40 border-slate-800 opacity-40'
                    }`}>
                      <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">Balance Sheet Funds (Capital)</h4>
                      <p className="text-xs text-slate-300 mt-2">
                        {sieveSelectedItem === 'legacy_building' && '✓ Building Legacy: Purpose-specific capital receipt -> Credited to Building Fund.'}
                        {sieveSelectedItem === 'life_membership' && '✓ Life Membership: Lump-sum lifetime substitute -> Added to Capital Fund.'}
                        {(sieveSelectedItem === 'subscriptions' || sieveSelectedItem === 'salaries_paid') && '✗ Excluded! General revenue belongs in I&E.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: SUBSCRIPTIONS ACCRUAL ENGINE */}
              {currentSlide === 4 && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div>
                      <label className="text-[11px] text-slate-400 font-medium">1. Cash Received in R&P (₹)</label>
                      <input
                        type="range"
                        min={200000}
                        max={600000}
                        step={20000}
                        value={subCashReceived}
                        onChange={(e) => handleSubCashChange(Number(e.target.value))}
                        className="w-full mt-1 accent-sky-500 cursor-pointer"
                        aria-label="Subscriptions Cash Received"
                      />
                      <div className="text-xs font-mono text-sky-400 font-bold mt-0.5">₹{subCashReceived.toLocaleString('en-IN')}</div>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 font-medium">2. + Outstanding at End (₹)</label>
                      <input
                        type="range"
                        min={0}
                        max={100000}
                        step={5000}
                        value={subOutstandingEnd}
                        onChange={(e) => handleSubOutstandingChange(Number(e.target.value))}
                        className="w-full mt-1 accent-emerald-500 cursor-pointer"
                        aria-label="Subscriptions Outstanding at End"
                      />
                      <div className="text-xs font-mono text-emerald-400 font-bold mt-0.5">+₹{subOutstandingEnd.toLocaleString('en-IN')}</div>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 font-medium">3. - Advance at End (₹)</label>
                      <input
                        type="range"
                        min={0}
                        max={50000}
                        step={5000}
                        value={subAdvanceEnd}
                        onChange={(e) => handleSubAdvanceChange(Number(e.target.value))}
                        className="w-full mt-1 accent-rose-500 cursor-pointer"
                        aria-label="Subscriptions Advance at End"
                      />
                      <div className="text-xs font-mono text-rose-400 font-bold mt-0.5">-₹{subAdvanceEnd.toLocaleString('en-IN')}</div>
                    </div>
                  </div>

                  {/* Accrual Breakdown Bar Chart */}
                  <div className="h-44 w-full bg-slate-950 p-2 rounded-2xl border border-slate-800">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={npoChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                        <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                          {npoChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-700/60 text-center font-mono text-xs sm:text-sm font-black text-indigo-200">
                    Revenue Income to Credit I&E A/c: ₹{computedSubIncome.toLocaleString('en-IN')}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX (FREE PLAY) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <h3 className="text-lg font-black text-white">Free Accounting Sandbox</h3>
              <p className="text-xs text-slate-400">Manipulate all financial variables freely without grading pressure.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSandboxTab('errors')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  sandboxTab === 'errors' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Errors & Suspense
              </button>
              <button
                onClick={() => setSandboxTab('npo')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  sandboxTab === 'npo' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                NPO Accrual Engine
              </button>
            </div>
          </div>

          {sandboxTab === 'errors' ? (
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <label className="text-xs text-slate-400">Simulate Debit Side (₹)</label>
                  <input
                    type="range"
                    min={400000}
                    max={600000}
                    step={10000}
                    value={simDebitAmount}
                    onChange={(e) => setSimDebitAmount(Number(e.target.value))}
                    className="w-full mt-2 accent-sky-500 cursor-pointer"
                  />
                  <div className="text-sm font-mono font-bold text-sky-400 mt-1">₹{simDebitAmount.toLocaleString('en-IN')}</div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <label className="text-xs text-slate-400">Simulate Credit Side (₹)</label>
                  <input
                    type="range"
                    min={400000}
                    max={600000}
                    step={10000}
                    value={simCreditAmount}
                    onChange={(e) => setSimCreditAmount(Number(e.target.value))}
                    className="w-full mt-2 accent-purple-500 cursor-pointer"
                  />
                  <div className="text-sm font-mono font-bold text-purple-400 mt-1">₹{simCreditAmount.toLocaleString('en-IN')}</div>
                </div>
              </div>

              <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/40 text-xs text-slate-300">
                <span className="font-bold text-indigo-300">Automatic Suspense Placement: </span>
                {simDebitAmount === simCreditAmount
                  ? 'None needed! Trial Balance agrees.'
                  : simDebitAmount > simCreditAmount
                  ? `Credit Suspense Account opened with ₹${(simDebitAmount - simCreditAmount).toLocaleString('en-IN')} on the shorter credit side.`
                  : `Debit Suspense Account opened with ₹${(simCreditAmount - simDebitAmount).toLocaleString('en-IN')} on the shorter debit side.`}
              </div>
            </div>
          ) : (
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Cash Received</label>
                  <input
                    type="number"
                    value={subCashReceived}
                    onChange={(e) => setSubCashReceived(Number(e.target.value))}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Outstanding at End</label>
                  <input
                    type="number"
                    value={subOutstandingEnd}
                    onChange={(e) => setSubOutstandingEnd(Number(e.target.value))}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Advance at End</label>
                  <input
                    type="number"
                    value={subAdvanceEnd}
                    onChange={(e) => setSubAdvanceEnd(Number(e.target.value))}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs mt-1"
                  />
                </div>
              </div>

              <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/50 text-center font-mono font-black text-sm text-emerald-300">
                Calculated I&E Subscription Income: ₹{computedSubIncome.toLocaleString('en-IN')}
              </div>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-sm shadow-xl shadow-emerald-600/30"
          >
            I Am Ready For Competency Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header & Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold uppercase">
                NEP Competency: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card with Framer Shake */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border shadow-xl transition-colors duration-300 ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed mb-4">
              {challenge.question}
            </h3>

            {/* MCQ TYPE */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg'
                          : 'bg-slate-800/80 border-slate-700/60 text-slate-200 hover:bg-slate-800 hover:border-indigo-500'
                      }`}
                    >
                      <span className="font-bold text-indigo-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    disabled={showExplanation}
                    placeholder="Enter precise figure"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-indigo-500 focus:outline-none w-64"
                  />
                  <span className="text-slate-400 font-bold text-sm">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-md"
                  >
                    Submit Figure
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      disabled={showExplanation}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-mono text-indigo-300"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-950 border border-indigo-700 rounded-lg text-xs font-mono text-white flex items-center gap-1.5">
                      {part}
                      <button onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))} className="text-rose-400 font-bold ml-1">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click parts above to assemble journal entry...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Verify Constructed Entry
                </motion.button>
              </div>
            )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 't_daily', name: '1. Day-to-day Chronological Record' },
                    { id: 't_cash_summary', name: '2. Year-End Real Cash Summary' },
                    { id: 't_surplus', name: '3. Accrual Surplus/Deficit Ascertainer' },
                    { id: 't_position', name: '4. Fund & Net Worth Statement' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-3 bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl min-h-[65px] flex flex-col justify-center items-center"
                    >
                      <span className="text-[10px] text-slate-400 font-medium">{target.name}</span>
                      <span className="text-xs font-bold text-emerald-400 mt-1">{droppedLabels[target.id] || 'Drop Label Here'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                >
                  Validate Labels
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === 4 ? sortArrangement : [0, 1, 2, 3]).map((idx, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = Number(draggedItem);
                      handleSortMove(from, displayIdx);
                    }}
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">
                      {displayIdx + 1}
                    </span>
                    <span>{challenge.sortItems![idx]}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(sortArrangement)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 border border-amber-500/40 rounded-2xl space-y-4 shadow-xl"
            >
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <span>📚</span> Detailed Step-by-Step Explanation
              </div>

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
                      <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-2 bg-amber-600/30 hover:bg-amber-600/40 text-amber-300 border border-amber-500/50 rounded-xl text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                >
                  {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Score →' : 'Next Challenge →'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl border border-indigo-500/40 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-3xl">
              🎓
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Simulation Completed!</h2>

            {/* MANDATORY MOTIVATIONAL FEEDBACK BADGE */}
            <div className={`p-4 rounded-2xl border ${motivationalFeedback.badgeBg} max-w-md mx-auto space-y-1`}>
              <div className={`text-lg font-black tracking-wide ${motivationalFeedback.color}`}>
                {motivationalFeedback.title}
              </div>
              <p className="text-xs text-slate-300">
                {motivationalFeedback.desc}
              </p>
            </div>

            <div className="flex justify-center gap-6 font-mono pt-2">
              <div className="text-center">
                <div className="text-xs text-slate-400">Final Score</div>
                <div className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-400">Total Errors Encountered</div>
                <div className="text-2xl font-black text-rose-400">{errors}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-400">Mastery Level</div>
                <div className="text-2xl font-black text-indigo-400 capitalize">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* Misconception Tracking Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Identified Misconception Profile ({hitMisconceptions.length})
              </h4>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-bold">❌ Common Trap: {m.misconception}</p>
                      <p className="text-emerald-400 font-medium mt-1">✓ Correct Accounting: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-amber-950/30 border border-amber-800/40 rounded-2xl text-xs space-y-1">
            <div className="font-bold text-amber-300">📅 Spaced Repetition (SM-2) Schedule:</div>
            <p className="text-slate-300">
              Based on your score, your next review is scheduled in{' '}
              <span className="text-amber-400 font-bold font-mono">
                {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
              </span>
              . Regular retrieval solidifies long-term accounting schema.
            </p>
          </div>

          {/* Real-World Action Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-xl border border-slate-850 text-xs text-slate-400">
                  <span className="font-bold text-indigo-400">{i + 1}.</span> {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_AccountancyTypesErrorsOmissionSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// ─── NODE ID DECLARATIONS ───
const NODE_C12_ACC_001 = 'c12_acc_001';
const NODE_C12_ACC_002 = 'c12_acc_002';
const NODE_C12_ACC_003 = 'c12_acc_003';
const NODE_C12_ACC_004 = 'c12_acc_004';
const NODE_C12_ACC_005 = 'c12_acc_005';
const NODE_C12_ACC_006 = 'c12_acc_006';
const NODE_C12_ACC_007 = 'c12_acc_007';
const NODE_C12_ACC_008 = 'c12_acc_008';
const NODE_C12_ACC_009 = 'c12_acc_009';
const NODE_C12_ACC_010 = 'c12_acc_010';

const ALL_NODE_IDS = [
  NODE_C12_ACC_001,
  NODE_C12_ACC_002,
  NODE_C12_ACC_003,
  NODE_C12_ACC_004,
  NODE_C12_ACC_005,
  NODE_C12_ACC_006,
  NODE_C12_ACC_007,
  NODE_C12_ACC_008,
  NODE_C12_ACC_009,
  NODE_C12_ACC_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Jaipur Handicrafts Partnership Dilemma',
  intro: 'Aarav, Bhavna, and Chetan established "Jaipur Artisans LLP" on 1 April 2024. Aarav contributed ₹6,00,000 and works full time as designer. Bhavna contributed ₹4,00,000 and brings prestigious royal orders. Chetan, an elder craftsman, contributed ₹2,00,000 and was promised a minimum assured return.',
  context: 'Halfway through the financial year, Chetan advanced a loan of ₹1,50,000, Aarav drew ₹5,000 monthly for personal expenses, and unexpected profits soared. Without an airtight understanding of Partnership Act 1932 defaults, P&L Appropriation, Capital accounts, and Profit Guarantee rules, their dream firm faces financial chaos.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Chetan advanced a loan of ₹1,50,000 to the firm midway. The deed is silent on loan interest. At year-end, the firm incurs a net loss before loan interest. What happens to Chetan\'s interest?',
  options: [
    'No interest is payable because the firm made a net loss',
    'He receives 6% p.a. interest regardless of loss, as it is a charge against profit',
    'He receives 10% p.a. interest as default commercial compensation',
    'His capital account is credited with interest only if other partners approve',
  ],
  correctIndex: 1,
  hintAfter: 'Surprised? Under Section 13(d) of the Partnership Act 1932, loan interest is a statutory CHARGE, payable even when the firm makes a severe loss!',
};

// ─── OBSERVATION QUESTIONS (Brilliant 'What do you notice?' Pattern) ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observe the P&L Waterfall Diagram (Step 3). What happens to Partner Loan Interest before any profit enters P&L Appropriation?',
    observableOptions: [
      'It is deducted as a charge in the P&L Account before distributable Net Profit is transferred to P&L Appropriation',
      'It is added to the general reserve fund',
      'It is paid directly from partner capital accounts without touching P&L',
      'It is distributed in the profit sharing ratio',
    ],
    correctIndex: 0,
    observationHint: 'Look closely at the brown box (P&L Account charges) vs the green box (P&L Appropriation).',
    nodeId: NODE_C12_ACC_003,
  },
  {
    question: 'Observe the Capital Ledgers under the Fixed Capital Method (Step 4). What distinguishes the Capital Account from the Current Account?',
    observableOptions: [
      'Capital Account balance remains fixed (recording only permanent capital adjustments), while operational items like salary and profit share flow into the Current Account',
      'Capital Account changes monthly while Current Account stays frozen',
      'Both accounts record identical transactions on opposite sides',
      'Current Account is only used when the firm is in liquidation',
    ],
    correctIndex: 0,
    observationHint: 'Notice how the two separate boxes divide permanent capital contributions from recurring appropriations.',
    nodeId: NODE_C12_ACC_004,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Jaipur Artisans earns ₹1,50,000 profit and Chetan is guaranteed ₹50,000 minimum (PSR 5:3:2), will Aarav and Bhavna lose part of their normal share?',
    options: [
      'No, because ₹1,50,000 is high enough to satisfy all partners',
      'Yes, because Chetan\'s normal share is only ₹30,000 (deficiency = ₹20,000)',
      'No, the government subsidises the deficiency in registered firms',
      'Yes, but Chetan must refund the money in subsequent years',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now move the profit slider to ₹1,50,000 in Step 5 to verify Chetan\'s deficiency calculation.',
    nodeId: NODE_C12_ACC_010,
  },
  {
    question: 'Predict: When the deed is silent (Section 13 defaults apply), how will the net profit be shared among Aarav, Bhavna, and Chetan regardless of their ₹6L, ₹4L, ₹2L capital ratio?',
    options: [
      'Strictly in capital ratio (3:2:1)',
      'Equally (1:1:1) with zero salary or interest on capital',
      'Based on working hours logged by Aarav',
      '60% to Aarav and 40% to Bhavna',
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle to "Deed is Silent (Sec 13 Defaults)" in Step 2 to verify that profit sharing converts to strictly equal shares.',
    nodeId: NODE_C12_ACC_002,
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

// ─── CHALLENGES ARRAY (22 Progressive Challenges) ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (1-7)
  {
    id: 'ch_001_features',
    nodeId: NODE_C12_ACC_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 4 of the Indian Partnership Act 1932, what is the cardinal, decisive legal test of a partnership?',
    options: [
      'Joint ownership of physical assets',
      'Mutual agency (business carried on by all or any of them acting for all)',
      'Sharing of gross receipts',
      'Equal capital contributions by all participants',
    ],
    correctIndex: 1,
    explanation: 'Section 18 & Supreme Court ruling in Addanki Narayanappa confirm Mutual Agency is the conclusive test. Profit-sharing is only prima facie evidence under Section 6.',
    hints: [
      'Think about whether each partner can bind all co-partners by their commercial actions.',
      'Check Section 18 of the Partnership Act 1932: a partner is both principal and agent.',
      'Mutual agency ("acting for all") separates a genuine firm from passive co-ownership.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002_defaults',
    nodeId: NODE_C12_ACC_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Aarav contributes ₹6,00,000 and works 60 hours weekly. Bhavna contributes ₹2,00,000 as a sleeping partner. In the absence of a partnership deed, what salary and profit ratio apply?',
    options: [
      'Aarav gets ₹50,000 salary; profits shared in 3:1 capital ratio',
      'No salary to any partner (Sec 13a); profits shared equally 1:1 (Sec 13b)',
      'Aarav gets reasonable remuneration; profits shared in 3:1 ratio',
      'Aarav gets 6% commission on turnover; profits shared equally',
    ],
    correctIndex: 1,
    explanation: 'Under Section 13(a), no partner is entitled to salary regardless of work done. Under Section 13(b), profits are shared equally regardless of unequal capital.',
    hints: [
      'Does the Indian Partnership Act 1932 reward extra working hours when there is no written deed?',
      'Review Section 13(a) for partner salary and Section 13(b) for profit-sharing ratio.',
      'Statutory default mandates NO salary to anyone and strictly EQUAL sharing of profits.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_003_drag_classification',
    nodeId: NODE_C12_ACC_003,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Classify whether these transactions belong to the P&L Account (Charges against Profit) or P&L Appropriation Account (Appropriations of Profit).',
    dragItems: [
      { label: "Interest on Partner's Loan", targetId: 'box_pl_charge' },
      { label: "Partner's Salary per Deed", targetId: 'box_pl_app' },
      { label: 'Rent Paid to Third-Party Landlord', targetId: 'box_pl_charge' },
      { label: 'Interest on Partner Capital', targetId: 'box_pl_app' },
    ],
    correctMapping: {
      box_pl_charge: "Interest on Partner's Loan",
      box_pl_app: "Partner's Salary per Deed",
    },
    explanation: 'Charges (Interest on Partner\'s Loan, Rent) are debited to P&L Account. Appropriations (Partner Salary, Interest on Capital) are debited to P&L Appropriation Account.',
    hints: [
      'Charges must be paid even at a loss; appropriations occur only if distributable profits exist.',
      'Partner loan interest is treated as an outsider debt expense in the P&L Account.',
      'Partner salary and interest on capital are internal distributions of profit in P&L App.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_004_capital_method',
    nodeId: NODE_C12_ACC_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When the Fixed Capital Method is adopted, which transactions are posted directly into the Partners\' Capital Account?',
    options: [
      'Partner salary, drawings, and share of profit',
      'Only initial/fresh capital introduced and permanent capital withdrawals',
      'Interest on capital and interest on drawings',
      'All partnership transactions without exception',
    ],
    correctIndex: 1,
    explanation: 'Under the Fixed Capital Method, the Capital Account records ONLY permanent capital introductions or withdrawals. All operational items flow through the Current Account.',
    hints: [
      'The word "Fixed" means the core capital balance remains unchanged by yearly profits or drawings.',
      'Where do recurring items like salary, commission, and profit shares go?',
      'Only permanent capital adjustments go to the Capital Account; everything else goes to Current Account.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_005_ioc_basis',
    nodeId: NODE_C12_ACC_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'On which balance is Interest on Capital calculated at the agreed deed rate of 10% p.a.?',
    options: [
      'Closing capital balance at the end of the year',
      'Opening capital balance (adjusted time-proportionately for fresh capital introduced or permanently withdrawn)',
      'Total drawings made during the year',
      'Average bank balance of the firm',
    ],
    correctIndex: 1,
    explanation: 'Interest on Capital is a reward on capital employed over time. It is computed on opening capital plus time-weighted fresh capital, never closing capital.',
    hints: [
      'Does closing capital contain accumulated profit and salary of the current year?',
      'We must not pay interest on profits earned during the year.',
      'Always calculate on OPENING capital, adjusting for time-weighted capital changes.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_006_iod_average',
    nodeId: NODE_C12_ACC_006,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Aarav withdraws ₹10,000 at the BEGINNING of every month for 12 months. The deed provides interest on drawings @ 12% p.a. Calculate the total interest on drawings (in ₹).',
    correctAnswer: 7800,
    tolerance: 10,
    unit: '₹',
    explanation: 'Total drawings = ₹1,20,000. Average period for beginning of each month = (12 + 1) / 2 = 6.5 months. Interest = ₹1,20,000 × 12% × 6.5 / 12 = ₹7,800.',
    hints: [
      'Calculate total drawings first: 12 months × ₹10,000 = ₹1,20,000.',
      'Average period for beginning of every month is (12 + 1) / 2 = 6.5 months.',
      'Formula: ₹1,20,000 × (12/100) × (6.5/12) = ₹7,800.',
    ],
  },
  {
    id: 'ch_007_current_balance_nature',
    nodeId: NODE_C12_ACC_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Partner Chetan has a DEBIT balance of ₹45,000 in his Current Account at year-end. Where should this appear on the firm\'s Balance Sheet?',
    options: [
      'Liabilities side under Partners\' Capital',
      'Assets side under Other Current Assets / Partners\' Current Accounts (Dr)',
      'Deducted directly from General Reserve on the Liabilities side',
      'Ignored until the firm is dissolved',
    ],
    correctIndex: 1,
    explanation: 'A debit balance in a Current Account indicates the partner has overdrawn and owes money to the firm. It is an asset of the firm and appears on the Assets side.',
    hints: [
      'Debit balance in personal account means "Debit the Receiver" / debtor status.',
      'Does the partner owe the firm, or does the firm owe the partner?',
      'Because Chetan owes the firm ₹45,000, it is a firm asset shown on the Assets side.',
    ],
    misconceptionIndex: 5,
  },

  // STANDARD TIER (8-14)
  {
    id: 'ch_008_pl_app_ordering',
    nodeId: NODE_C12_ACC_009,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of accounting steps for distributing firm earnings in the correct chronological order.',
    sortItems: [
      'Deduct charges (Partner loan interest & manager salary) in P&L Account',
      'Transfer adjusted Net Profit to P&L Appropriation Account Credit side',
      'Appropriate Interest on Capital, Partner Salaries, and Commissions',
      'Transfer stipulated percentage of divisible profit to General Reserve',
      'Divide remaining residual divisible profit among partners in PSR',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Charges in P&L come first → Net Profit transferred to P&L App → Partner appropriations deducted → Reserve transferred → Residual divisible profit split in PSR.',
    hints: [
      'Outsider charges must always be cleared before owner appropriations.',
      'General Reserve reduces the divisible pool before partners get their final PSR share.',
      'Sequence: P&L charges → Net Profit transfer → Appropriations → Reserve → PSR split.',
    ],
  },
  {
    id: 'ch_009_manager_vs_partner_commission',
    nodeId: NODE_C12_ACC_008,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Net profit before any commission is ₹2,20,000. Partner Bhavna is entitled to 10% commission on net profit AFTER charging such commission. Compute Bhavna\'s commission (in ₹).',
    correctAnswer: 20000,
    tolerance: 10,
    unit: '₹',
    explanation: 'When commission is payable AFTER charging such commission, Formula = Net Profit × Rate / (100 + Rate) = ₹2,20,000 × 10 / 110 = ₹20,000.',
    hints: [
      'Look carefully at the wording: "AFTER charging such commission".',
      'Formula is Net Profit × Rate / (100 + Rate).',
      'Calculation: ₹2,20,000 × 10 / 110 = ₹20,000.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_010_loan_interest_math',
    nodeId: NODE_C12_ACC_002,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Chetan advanced a loan of ₹2,00,000 on 1 October 2024. The deed is silent on interest rate. Accounting year closes on 31 March 2025. Calculate the loan interest charge (in ₹).',
    correctAnswer: 6000,
    tolerance: 5,
    unit: '₹',
    explanation: 'Under Sec 13(d), statutory rate is 6% p.a. For 6 months (Oct to Mar) = ₹2,00,000 × 6% × 6/12 = ₹6,000.',
    hints: [
      'What is the statutory interest rate on a partner loan under Section 13(d)? (It is 6% p.a.)',
      'How many months elapsed between 1 October and 31 March? Exactly 6 months.',
      '₹2,00,000 × (6/100) × (6/12) = ₹6,000.',
    ],
  },
  {
    id: 'ch_011_current_interest_sign',
    nodeId: NODE_C12_ACC_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Partner X has Current A/c (Cr) ₹1,00,000 and Partner Y has Current A/c (Dr) ₹50,000. Deed charges/allows 6% p.a. interest on current accounts. How is this recorded in P&L App?',
    options: [
      'Debit ₹6,000 to P&L App; Credit ₹3,000 to P&L App',
      'Debit ₹6,000 (X) to P&L App; Credit ₹3,000 (Y) to P&L App',
      'Debit ₹9,000 to P&L App as total partner interest expense',
      'No entry because current account interest is prohibited by law',
    ],
    correctIndex: 1,
    explanation: 'Credit balance means firm owes partner → appropriation in favour (Debit P&L App ₹6,000). Debit balance means partner overdrawn → charge from partner (Credit P&L App ₹3,000).',
    hints: [
      'Credit balance is a liability for the firm; the firm pays interest to X (Debit P&L App).',
      'Debit balance is an asset for the firm; partner Y pays interest to the firm (Credit P&L App).',
      'Interest on Cr balance reduces divisible profit; interest on Dr balance increases divisible profit.',
    ],
  },
  {
    id: 'ch_012_reserve_transfer_calc',
    nodeId: NODE_C12_ACC_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Net profit is ₹3,00,000. Total Interest on Capital is ₹40,000 and Partner Salary is ₹60,000. If 10% of DIVISIBLE PROFIT is transferred to General Reserve, compute the reserve amount (in ₹).',
    correctAnswer: 20000,
    tolerance: 5,
    unit: '₹',
    explanation: 'Divisible profit before reserve = ₹3,00,000 - ₹40,000 - ₹60,000 = ₹2,00,000. General Reserve = 10% of ₹2,00,000 = ₹20,000.',
    hints: [
      'Find the divisible profit before reserve: Net profit − Interest on Capital − Salary.',
      'Divisible profit = ₹3,00,000 − ₹40,000 − ₹60,000 = ₹2,00,000.',
      '10% of ₹2,00,000 = ₹20,000.',
    ],
  },
  {
    id: 'ch_013_guarantee_deficiency_calc',
    nodeId: NODE_C12_ACC_010,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A, B, and C share profits 5:3:2. C is guaranteed a minimum profit of ₹50,000 by A and B equally. Divisible profit is ₹1,80,000. How much deficiency does partner A bear (in ₹)?',
    correctAnswer: 7000,
    tolerance: 5,
    unit: '₹',
    explanation: 'C\'s normal share = 2/10 × ₹1,80,000 = ₹36,000. Total Deficiency = ₹50,000 - ₹36,000 = ₹14,000. Borne equally by A and B: A bears ₹14,000 / 2 = ₹7,000.',
    hints: [
      'Calculate C\'s normal share: 2/10 of ₹1,80,000 = ₹36,000.',
      'Shortfall (Deficiency) = Guaranteed ₹50,000 − Normal ₹36,000 = ₹14,000.',
      'A and B bear deficiency equally (1:1), so A bears ₹14,000 / 2 = ₹7,000.',
    ],
  },
  {
    id: 'ch_014_fluctuating_vs_fixed_matching',
    nodeId: NODE_C12_ACC_004,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match the accounting item with its correct destination account under the Fixed Capital Method:',
    options: [
      'Fresh capital introduced → Capital A/c; Partner salary → Current A/c; Drawings → Current A/c',
      'Fresh capital introduced → Current A/c; Partner salary → Capital A/c; Drawings → Capital A/c',
      'All three items go to the Capital Account',
      'All three items go to the Current Account',
    ],
    correctIndex: 0,
    explanation: 'Under fixed capital method, only permanent capital injections go to Capital A/c. All operating inflows/outflows go to Current A/c.',
    hints: [
      'Capital account remains unchanged except for fresh introduction or permanent withdrawal.',
      'Operating rewards and drawings are routed via Current Account.',
      'Fresh capital → Capital A/c; Salary and Drawings → Current A/c.',
    ],
  },

  // ADVANCED TIER (15-22)
  {
    id: 'ch_015_guarantee_above_threshold',
    nodeId: NODE_C12_ACC_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'P, Q, and R share profits 4:3:3. R has a guaranteed minimum of ₹60,000. Total divisible profit turns out to be ₹3,00,000. What is R\'s final share of profit?',
    options: [
      'Exactly ₹60,000 because guarantee acts as a strict ceiling',
      '₹90,000 because guarantee is a floor; normal PSR share (3/10 × ₹3,00,000 = ₹90,000) exceeds guarantee',
      '₹75,000 after sharing surplus with guaranteeing partners',
      '₹60,000 plus 6% interest on surplus',
    ],
    correctIndex: 1,
    explanation: 'A profit guarantee provides a minimum FLOOR, never a ceiling. If normal share (₹90,000) > guarantee (₹60,000), partner keeps the full normal share.',
    hints: [
      'Is a guarantee a ceiling or a protective minimum floor?',
      'R\'s normal share is 3/10 × ₹3,00,000 = ₹90,000.',
      'Since ₹90,000 is greater than ₹60,000, no deficiency arises and R receives ₹90,000.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_016_loss_with_loan_interest',
    nodeId: NODE_C12_ACC_002,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Firm has a loss of ₹30,000 before partner loan interest. Partner Z gave a loan of ₹1,00,000 for the full year (6% p.a. statutory charge). What is total loss transferred to Capital A/cs (in ₹)?',
    correctAnswer: 36000,
    tolerance: 5,
    unit: '₹',
    explanation: 'Loan interest = ₹1,00,000 × 6% = ₹6,000. Since loan interest is a CHARGE, it is debited to P&L, increasing total net loss to ₹30,000 + ₹6,000 = ₹36,000.',
    hints: [
      'Is partner loan interest payable even when the firm is in a loss?',
      'Yes, it is a charge against profit: ₹1,00,000 × 6% = ₹6,000.',
      'Total loss = Initial Loss ₹30,000 + Loan Interest ₹6,000 = ₹36,000.',
    ],
  },
  {
    id: 'ch_017_opening_capital_derivation',
    nodeId: NODE_C12_ACC_006,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Under fluctuating method, closing capital of Partner A is ₹5,80,000. During the year, drawings were ₹50,000, profit share credited was ₹90,000, and salary credited was ₹40,000. Compute Opening Capital (in ₹).',
    correctAnswer: 500000,
    tolerance: 10,
    unit: '₹',
    explanation: 'Opening Capital = Closing Capital + Drawings - Profit Share - Salary = ₹5,80,000 + ₹50,000 - ₹90,000 - ₹40,000 = ₹5,00,000.',
    hints: [
      'Reverse the postings: add back drawings, subtract profit credited and salary credited.',
      'Opening Capital = ₹5,80,000 + ₹50,000 − ₹90,000 − ₹40,000.',
      'Calculation gives ₹5,00,000.',
    ],
  },
  {
    id: 'ch_018_construct_journal_deficiency',
    nodeId: NODE_C12_ACC_010,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct journal entry to adjust a ₹12,000 deficiency in C\'s guaranteed profit, borne equally by giving partners A and B.',
    availableParts: [
      'Dr A\'s Capital A/c ₹6,000',
      'Dr B\'s Capital A/c ₹6,000',
      'Cr C\'s Capital A/c ₹12,000',
      'Dr P&L App A/c ₹12,000',
      'Cr A\'s Capital A/c ₹6,000',
    ],
    targetState: 'Dr A\'s Capital A/c ₹6,000 Dr B\'s Capital A/c ₹6,000 Cr C\'s Capital A/c ₹12,000',
    validationHint: 'Debit giving partners A & B (₹6,000 each) and Credit guaranteed partner C (₹12,000).',
    explanation: 'Deficiency reallocation is a partner-to-partner adjustment: Giving partners\' Capital accounts are debited and Guaranteed partner\'s Capital account is credited.',
    hints: [
      'Giving partners suffer a reduction (Debit their capital accounts).',
      'Guaranteed partner receives the top-up (Credit their capital account).',
      'Select: Dr A\'s Capital ₹6,000, Dr B\'s Capital ₹6,000, Cr C\'s Capital ₹12,000.',
    ],
  },
  {
    id: 'ch_019_insufficient_profit_apportionment',
    nodeId: NODE_C12_ACC_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Firm net profit is ₹60,000. Partner A\'s interest on capital is ₹40,000 and Partner B\'s interest is ₹80,000. Deed does not treat IoC as a charge. How is the profit distributed?',
    options: [
      'A gets ₹40,000, B gets ₹80,000, and a net loss of ₹60,000 is shared in PSR',
      'Profit of ₹60,000 is apportioned between A and B in the ratio of their claims (40,000 : 80,000 = 1:2), so A gets ₹20,000 and B gets ₹40,000',
      'Neither partner gets any interest because profit is insufficient',
      'Both partners get ₹30,000 equally',
    ],
    correctIndex: 1,
    explanation: 'When profit is insufficient to meet full appropriations, available profit is distributed in the ratio of respective appropriation claims (1:2).',
    hints: [
      'Since IoC is an appropriation, total distributions cannot exceed the available profit of ₹60,000.',
      'Check the ratio of their entitlements: ₹40,000 : ₹80,000 = 1 : 2.',
      'Apportion ₹60,000 in 1:2 ratio → A gets ₹20,000 and B gets ₹40,000.',
    ],
  },
  {
    id: 'ch_020_bearing_vs_psr',
    nodeId: NODE_C12_ACC_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Partners X, Y, and Z share profits 5:3:2. Z is guaranteed ₹40,000 by X only. Normal share of Z is ₹25,000. How is the deficiency handled?',
    options: [
      'Deficiency of ₹15,000 is borne by X and Y in 5:3 ratio',
      'Deficiency of ₹15,000 is borne entirely by X alone, deducting ₹15,000 from X\'s share',
      'Deficiency is debited to General Reserve',
      'Firm dissolves automatically due to lack of mutual consent',
    ],
    correctIndex: 1,
    explanation: 'When a guarantee is given by a specific partner individually, the entire deficiency is borne solely by that partner without affecting other non-giving partners.',
    hints: [
      'Did Y guarantee Z\'s profit or did X give the personal guarantee alone?',
      'Deficiency = ₹40,000 − ₹25,000 = ₹15,000.',
      'X alone promised the guarantee, so X bears the full ₹15,000.',
    ],
  },
  {
    id: 'ch_021_quarterly_iod',
    nodeId: NODE_C12_ACC_006,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Partner Bhavna withdraws ₹15,000 at the END of each quarter throughout the financial year. Interest on drawings is charged @ 10% p.a. Compute interest on drawings (in ₹).',
    correctAnswer: 2250,
    tolerance: 5,
    unit: '₹',
    explanation: 'Total drawings = 4 quarters × ₹15,000 = ₹60,000. Average period for end of each quarter = (4 - 1) / 2 = 1.5 quarters = 4.5 months. Interest = ₹60,000 × 10% × 4.5 / 12 = ₹2,250.',
    hints: [
      'Total annual drawings = 4 × ₹15,000 = ₹60,000.',
      'Average period for end of quarter is 4.5 months.',
      'Formula: ₹60,000 × 10% × (4.5 / 12) = ₹2,250.',
    ],
  },
  {
    id: 'ch_022_legal_entity_evaluation',
    nodeId: NODE_C12_ACC_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which legal reality directly explains why partners have unlimited joint and several liability under Section 25 of the Partnership Act 1932?',
    options: [
      'A partnership firm is registered under the Companies Act 2013',
      'In the eyes of law, a partnership firm has no separate legal entity distinct from its partners',
      'Partners must always contribute equal amounts of working capital',
      'The Indian Contract Act 1872 mandates private company incorporation for all businesses',
    ],
    correctIndex: 1,
    explanation: 'Because a firm has NO separate legal entity distinct from the individuals composing it, the firm\'s debts are personal debts of all partners with unlimited liability.',
    hints: [
      'How does a partnership differ fundamentally from a registered joint stock company?',
      'Firm assets and personal assets are legally linked because the firm is not a separate legal person.',
      'No separate legal existence implies partners bear full personal liability for all firm obligations.',
    ],
  },
];

// ─── EXPLORATION STEPS (Interactive Guided Learning) ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Core Definition & Mutual Agency',
    instruction: 'Click on each partner node to see how an action by ANY partner legally binds the entire firm as mutual agents.',
    interactionType: 'click-mutual-agency',
    nodeId: NODE_C12_ACC_001,
  },
  {
    title: '2. The Default Rules (Absence of Deed)',
    instruction: 'Toggle between "Partnership Deed Exists" and "Deed is Silent (Sec 13 Defaults)" to observe instant regulatory impact.',
    interactionType: 'toggle-deed-defaults',
    nodeId: NODE_C12_ACC_002,
  },
  {
    title: '3. Charge vs Appropriation Laboratory',
    instruction: 'Inspect the financial waterfall diagram below to understand why charges are debited in P&L and appropriations in P&L App.',
    interactionType: 'drag-charge-appropriation',
    nodeId: NODE_C12_ACC_003,
  },
  {
    title: '4. Capital Accounts: Fixed vs Fluctuating',
    instruction: 'Switch between Fixed and Fluctuating methods to see whether the Capital Account stays fixed or absorbs operating flows.',
    interactionType: 'switch-capital-method',
    nodeId: NODE_C12_ACC_004,
  },
  {
    title: '5. Guarantee of Profits Deficiency Solver',
    instruction: 'Adjust the Firm Net Profit slider and observe how deficiency activates below threshold profit and reallocates.',
    interactionType: 'slider-guarantee',
    nodeId: NODE_C12_ACC_010,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Senior CA Advisor for Indian Partnerships',
  description: 'Examine a real Indian partnership deed or draft a complete 5-point clause for a boutique architecture studio in Bengaluru.',
  steps: [
    'Define the Profit Sharing Ratio and specify whether Capital Accounts will be Fixed or Fluctuating.',
    'Formulate exact clauses for Interest on Capital (e.g., 8% p.a.) and Interest on Drawings with specified withdrawal calendar.',
    'Specify partner salaries/commissions and explicitly differentiate manager salaries as charges against profits.',
    'Establish a Profit Guarantee clause for senior technical partners and specify the exact deficiency bearing ratio.',
  ],
};

// ─── DEFAULT PROPS ───
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
  nodeId: NODE_C12_ACC_001,
  title: 'Fundamentals of Partnership Accounting (ISC Class 12)',
  definition: 'Partnership is the relation between persons who have agreed to share profits of a business carried on by all or any of them acting for all (Sec 4, Indian Partnership Act 1932).',
  eli5: 'Three friends start a handicrafts workshop. They share profits, make decisions that legally bind each other, and use structured accounting accounts (P&L Appropriation and Capital/Current accounts) to ensure fairness.',
  misconceptions: [
    {
      misconception: 'Sharing of profit is conclusive proof of partnership.',
      correction: 'Section 6 clarifies profit sharing is only prima facie evidence. Mutual agency (Section 18) is the true cardinal test.',
    },
    {
      misconception: 'If the deed is silent, interest on capital is allowed @ 6% p.a.',
      correction: 'Section 13(c) allows 0% interest on capital when silent. The 6% rate under Section 13(d) applies ONLY to partner loans.',
    },
    {
      misconception: 'Interest on partner loan is an appropriation of profit debited to P&L App.',
      correction: 'Partner loan interest is a CHARGE against profit debited to P&L Account and must be paid even in a loss.',
    },
    {
      misconception: 'Under fixed capital method, salary and drawings are posted to Capital A/c.',
      correction: 'Under fixed method, all operational items go to Current Account; Capital Account remains fixed.',
    },
    {
      misconception: 'Interest on capital is calculated on closing capital balance.',
      correction: 'Interest on capital is calculated on OPENING capital (and time-weighted fresh capital), never closing capital.',
    },
    {
      misconception: 'Debit balance of Current Account is shown on Liabilities side.',
      correction: 'Debit balance means the partner owes money to the firm; it is shown on the ASSETS side of the Balance Sheet.',
    },
    {
      misconception: 'Partner commission "after charging" uses NP × Rate / 100.',
      correction: 'Commission "after charging such commission" uses Net Profit × Rate / (100 + Rate).',
    },
    {
      misconception: 'A profit guarantee caps the partner\'s return at the guaranteed minimum.',
      correction: 'Guarantee is a FLOOR, not a ceiling. If normal PSR share exceeds guarantee, partner keeps the higher normal share.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which section defines partnership in the Indian Partnership Act 1932?',
      options: ['Section 4', 'Section 13', 'Section 25', 'Section 69'],
      correctIndex: 0,
    },
    {
      question: 'What is the default interest rate on partner advances/loans when deed is silent?',
      options: ['0%', '6% p.a.', '10% p.a.', '12% p.a.'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Mastery across Section 4 essentials, Section 13 default rules, P&L Appropriation preparation, Fixed/Fluctuating capital ledgers, and Profit Guarantee mechanics.',
};

// ─── MAIN COMPONENT ───
function C12_AccountancyDefinitionMeaningFeaturesSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['accountancy'] || { name: 'Accountancy', emoji: '📒', color: 'emerald' };

  // ─── Phase State ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── Brilliant Pattern States ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [activeObsQuestionIdx, setActiveObsQuestionIdx] = useState<number | null>(null);
  const [obsAnswered, setObsAnswered] = useState<Record<number, number>>({});

  // ─── Interactive Sim Exploration States ───
  const [activePartnerNode, setActivePartnerNode] = useState<string | null>('aarav');
  const [deedMode, setDeedMode] = useState<'with-deed' | 'silent-default'>('with-deed');
  const [capitalMethod, setCapitalMethod] = useState<'fixed' | 'fluctuating'>('fixed');
  const [simProfitSlider, setSimProfitSlider] = useState<number>(200000);
  const [loanAmountSlider, setLoanAmountSlider] = useState<number>(100000);
  const [drawingsMonthlySlider, setDrawingsMonthlySlider] = useState<number>(5000);
  const [iocRateSlider] = useState<number>(8);
  const [guaranteeAmountSlider, setGuaranteeAmountSlider] = useState<number>(50000);

  // ─── Adaptive & Evaluation State ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── Hints & Explanation State ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── Drag & Construct States ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── Visual Feedback State ───
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // ─── Refs ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── Adaptive Challenge Filtering ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── Initial Mastery Load ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT Adaptation Effect ───
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

  // ─── Canvas Animation Effect (Ledger Stream Visualization) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      const t = (frame % 180) / 180;
      const xPos = 40 + t * (canvas.width - 80);
      const yPos = 25 + Math.sin(t * Math.PI * 4) * 8;

      ctx.beginPath();
      ctx.arc(xPos, yPos, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText('TRANSACTION → JOURNAL → P&L APP → CAPITAL LEDGER', 35, 45);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── Derived Calculations for Interactive Exploration ───
  const simCalculations = useMemo(() => {
    const capA = 600000;
    const capB = 400000;
    const capC = 200000;

    const isSilent = deedMode === 'silent-default';

    const loanInterest = loanAmountSlider * 0.06;
    const netProfitAfterLoan = Math.max(0, simProfitSlider - loanInterest);

    const iocRate = isSilent ? 0 : iocRateSlider / 100;
    const iocA = capA * iocRate;
    const iocB = capB * iocRate;
    const iocC = capC * iocRate;
    const totalIoc = iocA + iocB + iocC;

    const salaryA = isSilent ? 0 : 60000;
    const totalSalary = salaryA;

    const totalDrawingsA = drawingsMonthlySlider * 12;
    const iodRate = isSilent ? 0 : 0.10;
    const iodA = totalDrawingsA * iodRate * (6.5 / 12);

    const divisibleBeforeReserve = Math.max(0, netProfitAfterLoan + iodA - totalIoc - totalSalary);
    const generalReserve = isSilent ? 0 : divisibleBeforeReserve * 0.10;
    const residualDivisibleProfit = Math.max(0, divisibleBeforeReserve - generalReserve);

    const psrA = isSilent ? 1 / 3 : 5 / 10;
    const psrB = isSilent ? 1 / 3 : 3 / 10;
    const psrC = isSilent ? 1 / 3 : 2 / 10;

    const normalShareA = residualDivisibleProfit * psrA;
    const normalShareB = residualDivisibleProfit * psrB;
    const normalShareC = residualDivisibleProfit * psrC;

    const guaranteedMin = isSilent ? 0 : guaranteeAmountSlider;
    const deficiency = Math.max(0, guaranteedMin - normalShareC);
    const defShareA = deficiency / 2;
    const defShareB = deficiency / 2;

    const finalShareA = normalShareA - defShareA;
    const finalShareB = normalShareB - defShareB;
    const finalShareC = normalShareC + deficiency;

    return {
      loanInterest,
      netProfitAfterLoan,
      iocA,
      iocB,
      iocC,
      totalIoc,
      salaryA,
      iodA,
      generalReserve,
      residualDivisibleProfit,
      normalShareA,
      normalShareB,
      normalShareC,
      deficiency,
      finalShareA,
      finalShareB,
      finalShareC,
      capA,
      capB,
      capC,
      totalDrawingsA,
    };
  }, [deedMode, simProfitSlider, loanAmountSlider, drawingsMonthlySlider, iocRateSlider, guaranteeAmountSlider]);

  // ─── Callbacks ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        audioManager.play('hint');
        setShowHint(true);
        setCurrentHint(activeChallenge.hints[0] || 'Need guidance? Remember to check whether the deed is silent or active!');
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, activeChallenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Superb! You understand that partner loan interest is a mandatory charge against profits.');
    } else {
      audioManager.play('pop');
      speechManager.speak('Good attempt! Discover why Section 13(d) enforces 6 percent as a charge regardless of loss.');
    }
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive partnership laboratory. Manipulate accounts to see real-time updates.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You are in Free Play mode. Test any profit, drawings, and deed combinations without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode initiated. Put your partnership mastery to the test!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test with the profit slider to verify your hypothesis.');
  }, []);

  const handleObsOptionSelect = useCallback((qIdx: number, optIdx: number) => {
    setObsAnswered(prev => ({ ...prev, [qIdx]: optIdx }));
    const isCorrect = optIdx === OBSERVATION_QUESTIONS[qIdx].correctIndex;
    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Sharp observation! Your structural reading of the accounts is spot on.');
    } else {
      audioManager.play('drop-wrong');
    }
  }, []);

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

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered ISC Class 12 Partnership Fundamentals!');
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
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Excellent analysis! Accurate accounting entry.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify({ score: 100, date: Date.now() }));
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
        speechManager.speak('Let us study the complete step-by-step resolution together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === activeChallenge.sortItems?.length ? [...prev] : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  // Chart data for P&L Appropriation & Capital Distribution
  const chartData = useMemo(() => [
    { name: 'Aarav (50%)', share: Math.round(simCalculations.finalShareA), fill: '#10b981' },
    { name: 'Bhavna (30%)', share: Math.round(simCalculations.finalShareB), fill: '#3b82f6' },
    { name: 'Chetan (20% + G)', share: Math.round(simCalculations.finalShareC), fill: '#f59e0b' },
    { name: 'Reserve', share: Math.round(simCalculations.generalReserve), fill: '#8b5cf6' },
  ], [simCalculations]);

  const srsIntervalDays = errors === 0 ? 7 : errors <= 3 ? 3 : 1;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700/50 rounded-2xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              ISC Class 12 • Indian Partnership Act 1932 (Sec 4, 13, 18, 25)
            </p>
          </div>
        </div>

        {/* Difficulty & Phase Tag */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-400'
                : difficulty === 'standard'
                ? 'bg-gold-950/70 border-gold-500/50 text-gold-400'
                : 'bg-rose-950/70 border-rose-500/50 text-rose-400'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs text-slate-300 font-semibold">
            Mastery: {masteryLevel}
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/40 shadow-lg">
            <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <span>🏛️</span> {SCENARIO.title}
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-lg uppercase">
              Curiosity Discovery Hook
            </span>
            <p className="text-base sm:text-lg font-semibold text-white leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                  aria-label={`Discovery option ${i + 1}`}
                >
                  <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800">
                <p className={`text-sm mb-4 leading-relaxed ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '🎯 Brilliant intuition!' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  Enter Interactive Simulation Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Exploration Navigation Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentSlide(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  currentSlide === idx
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850'
                }`}
              >
                Step {idx + 1}: {step.title.split('. ')[1]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 sm:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-emerald-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs text-slate-400 font-mono">
                  {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>

              <p className="text-sm text-amber-300/90 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ── SVG 1: MUTUAL AGENCY DIAGRAM (Slide 0) ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex flex-col justify-center items-center">
                    <svg viewBox="0 0 320 240" className="w-full max-w-[300px]">
                      {/* Firm Center Hub */}
                      <circle cx="160" cy="120" r="42" fill="#064e3b" stroke="#10b981" strokeWidth="3" />
                      <text x="160" y="118" textAnchor="middle" fill="#ecfdf5" fontSize="11" fontWeight="bold">Jaipur Firm</text>
                      <text x="160" y="132" textAnchor="middle" fill="#a7f3d0" fontSize="8">(Collective Entity)</text>

                      {/* Aarav Node */}
                      <g onClick={() => setActivePartnerNode('aarav')} style={{ cursor: 'pointer' }}>
                        <circle cx="80" cy="60" r="28" fill={activePartnerNode === 'aarav' ? '#10b981' : '#1e293b'} stroke="#34d399" strokeWidth="2" />
                        <text x="80" y="62" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Aarav</text>
                        <text x="80" y="74" textAnchor="middle" fill="#94a3b8" fontSize="7">Agent & Principal</text>
                      </g>

                      {/* Bhavna Node */}
                      <g onClick={() => setActivePartnerNode('bhavna')} style={{ cursor: 'pointer' }}>
                        <circle cx="240" cy="60" r="28" fill={activePartnerNode === 'bhavna' ? '#3b82f6' : '#1e293b'} stroke="#60a5fa" strokeWidth="2" />
                        <text x="240" y="62" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Bhavna</text>
                        <text x="240" y="74" textAnchor="middle" fill="#94a3b8" fontSize="7">Agent & Principal</text>
                      </g>

                      {/* Chetan Node */}
                      <g onClick={() => setActivePartnerNode('chetan')} style={{ cursor: 'pointer' }}>
                        <circle cx="160" cy="200" r="28" fill={activePartnerNode === 'chetan' ? '#f59e0b' : '#1e293b'} stroke="#fbbf24" strokeWidth="2" />
                        <text x="160" y="202" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Chetan</text>
                        <text x="160" y="214" textAnchor="middle" fill="#94a3b8" fontSize="7">Agent & Principal</text>
                      </g>

                      {/* Connecting Agency Vectors */}
                      <line x1="102" y1="78" x2="132" y2="102" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
                      <line x1="218" y1="78" x2="188" y2="102" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2" />
                      <line x1="160" y1="172" x2="160" y2="152" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                    </svg>
                  </div>

                  <div className="space-y-3 flex flex-col justify-center">
                    <h4 className="text-sm font-bold text-slate-200">
                      Mutual Agency Active Analysis:
                    </h4>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      {activePartnerNode === 'aarav' && (
                        <p>
                          <strong className="text-emerald-400">Aarav (Designer):</strong> When Aarav signs a raw silk purchase contract for ₹2,00,000, he acts as an <span className="underline">Agent</span> of the firm. He legally binds both Bhavna and Chetan as <span className="underline">Principals</span>, making their personal assets liable!
                        </p>
                      )}
                      {activePartnerNode === 'bhavna' && (
                        <p>
                          <strong className="text-gold-400">Bhavna (Client Partner):</strong> When Bhavna secures royal handicraft orders, she represents all partners. Co-ownership without mutual agency is merely joint property (like co-inheriting a rental flat).
                        </p>
                      )}
                      {activePartnerNode === 'chetan' && (
                        <p>
                          <strong className="text-amber-400">Chetan (Elder Craftsman):</strong> Even though Chetan works primarily in production, his commercial agreements for tools bind Aarav and Bhavna under Section 18 of the Partnership Act 1932.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 2: TOGGLE DEED VS SECTION 13 DEFAULTS ── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setDeedMode('with-deed')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                        deedMode === 'with-deed'
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      📜 Partnership Deed Specified
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setDeedMode('silent-default')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                        deedMode === 'silent-default'
                          ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      ⚖️ Deed is Silent (Sec 13 Defaults)
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-slate-400 font-medium">Profit Sharing (PSR)</p>
                      <p className="text-sm font-bold text-white mt-1">
                        {deedMode === 'with-deed' ? '5 : 3 : 2' : '1 : 1 : 1 (Equal, Sec 13b)'}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-slate-400 font-medium">Interest on Capital</p>
                      <p className="text-sm font-bold text-white mt-1">
                        {deedMode === 'with-deed' ? `${iocRateSlider}% p.a.` : '0% (Sec 13c)'}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-slate-400 font-medium">Partner Salary (Aarav)</p>
                      <p className="text-sm font-bold text-white mt-1">
                        {deedMode === 'with-deed' ? '₹60,000 p.a.' : '₹0 (Sec 13a)'}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-slate-400 font-medium">Partner Loan Interest</p>
                      <p className="text-sm font-bold text-emerald-400 mt-1">
                        6% p.a. Charge (Sec 13d)
                      </p>
                    </div>
                  </div>

                  {/* Prediction Question 2 verification prompt */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <p className="font-bold text-emerald-400 mb-1">Verify Prediction 2:</p>
                    <p>{PREDICTION_QUESTIONS[1].verifyInstruction}</p>
                  </div>
                </div>
              )}

              {/* ── SVG 2: CHARGE VS APPROPRIATION WATERFALL (Slide 2) ── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex justify-center">
                    <svg viewBox="0 0 520 180" className="w-full max-w-[500px]">
                      {/* Step 1: Gross Revenue / Operating Profit */}
                      <rect x="10" y="60" width="100" height="60" rx="10" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                      <text x="60" y="88" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold">Operating</text>
                      <text x="60" y="103" textAnchor="middle" fill="#94a3b8" fontSize="9">Profit</text>

                      {/* Arrow 1 */}
                      <path d="M 110 90 L 140 90" stroke="#f59e0b" strokeWidth="2" />

                      {/* Step 2: P&L Account Charges Box */}
                      <rect x="145" y="40" width="115" height="100" rx="10" fill="#451a03" stroke="#d97706" strokeWidth="2" />
                      <text x="202" y="62" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">P&L A/C (Charges)</text>
                      <text x="202" y="80" textAnchor="middle" fill="#fef3c7" fontSize="8">• Partner Loan Int (6%)</text>
                      <text x="202" y="98" textAnchor="middle" fill="#fef3c7" fontSize="8">• Manager Salary</text>
                      <text x="202" y="116" textAnchor="middle" fill="#fca5a5" fontSize="8">(Must pay even in Loss)</text>

                      {/* Arrow 2 */}
                      <path d="M 260 90 L 290 90" stroke="#10b981" strokeWidth="2" />

                      {/* Step 3: P&L Appropriation Account Box */}
                      <rect x="295" y="40" width="125" height="100" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="357" y="62" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">P&L Appropriation</text>
                      <text x="357" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="8">• Interest on Capital</text>
                      <text x="357" y="98" textAnchor="middle" fill="#a7f3d0" fontSize="8">• Partner Salary per Deed</text>
                      <text x="357" y="116" textAnchor="middle" fill="#a7f3d0" fontSize="8">• General Reserve Transfer</text>

                      {/* Arrow 3 */}
                      <path d="M 420 90 L 445 90" stroke="#3b82f6" strokeWidth="2" />

                      {/* Step 4: Partners Ledgers */}
                      <rect x="445" y="60" width="68" height="60" rx="10" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                      <text x="479" y="88" textAnchor="middle" fill="#bfdbfe" fontSize="9" fontWeight="bold">Partners</text>
                      <text x="479" y="103" textAnchor="middle" fill="#93c5fd" fontSize="8">Capital/Curr</text>
                    </svg>
                  </div>

                  {/* Observation Question 1 */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-gold-700/40 space-y-3">
                    <p className="text-xs font-bold text-gold-300">🔍 OBSERVATION CHECK 1:</p>
                    <p className="text-sm text-white font-medium">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleObsOptionSelect(0, i)}
                          className={`p-2.5 text-left rounded-lg text-xs border transition-all ${
                            obsAnswered[0] === i
                              ? i === OBSERVATION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950/80 border-rose-500 text-rose-200'
                              : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── SVG 3: FIXED VS FLUCTUATING CAPITAL LEDGERS (Slide 3) ── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCapitalMethod('fixed')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                        capitalMethod === 'fixed'
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      Fixed Capital Method (2 Accounts / Partner)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCapitalMethod('fluctuating')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                        capitalMethod === 'fluctuating'
                          ? 'bg-gold-600 text-white border-gold-400 shadow-md'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      Fluctuating Capital Method (1 Account / Partner)
                    </motion.button>
                  </div>

                  <div className="flex justify-center">
                    <svg viewBox="0 0 500 160" className="w-full max-w-[480px]">
                      {capitalMethod === 'fixed' ? (
                        <>
                          <rect x="20" y="20" width="210" height="120" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                          <text x="125" y="45" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">Capital A/c (Fixed)</text>
                          <line x1="30" y1="55" x2="220" y2="55" stroke="#10b981" strokeWidth="1" />
                          <text x="40" y="75" fill="#ecfdf5" fontSize="9">• Initial Capital Contribution</text>
                          <text x="40" y="95" fill="#ecfdf5" fontSize="9">• Fresh Capital Introduced</text>
                          <text x="40" y="115" fill="#fca5a5" fontSize="9">• Permanent Capital Withdrawn</text>

                          <rect x="260" y="20" width="220" height="120" rx="10" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                          <text x="370" y="45" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">Current A/c (Fluctuating)</text>
                          <line x1="270" y1="55" x2="470" y2="55" stroke="#3b82f6" strokeWidth="1" />
                          <text x="280" y="75" fill="#eff6ff" fontSize="9">• Partner Salary & IoC (Cr)</text>
                          <text x="280" y="95" fill="#eff6ff" fontSize="9">• Share of Divisible Profit (Cr)</text>
                          <text x="280" y="115" fill="#fca5a5" fontSize="9">• Drawings & Int on Drawings (Dr)</text>
                        </>
                      ) : (
                        <>
                          <rect x="80" y="20" width="340" height="120" rx="10" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                          <text x="250" y="45" textAnchor="middle" fill="#c7d2fe" fontSize="12" fontWeight="bold">Partners' Capital A/c (Single Fluctuating Ledger)</text>
                          <line x1="90" y1="55" x2="410" y2="55" stroke="#818cf8" strokeWidth="1" />
                          <text x="100" y="75" fill="#e0e7ff" fontSize="9">Cr Side: Opening Balance + Additional Capital + IoC + Salary + Profit Share</text>
                          <text x="100" y="98" fill="#fca5a5" fontSize="9">Dr Side: Drawings + Interest on Drawings + Share of Loss</text>
                          <text x="250" y="125" textAnchor="middle" fill="#a5b4fc" fontSize="9" fontWeight="bold">Balance changes every accounting year!</text>
                        </>
                      )}
                    </svg>
                  </div>

                  {/* Observation Question 2 */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-gold-700/40 space-y-3">
                    <p className="text-xs font-bold text-gold-300">🔍 OBSERVATION CHECK 2:</p>
                    <p className="text-sm text-white font-medium">{OBSERVATION_QUESTIONS[1].question}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleObsOptionSelect(1, i)}
                          className={`p-2.5 text-left rounded-lg text-xs border transition-all ${
                            obsAnswered[1] === i
                              ? i === OBSERVATION_QUESTIONS[1].correctIndex
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950/80 border-rose-500 text-rose-200'
                              : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 5: GUARANTEE & LIVE SLIDERS ── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  {/* Predict Then Check Hook */}
                  {!predictionMade && (
                    <div className="p-4 bg-slate-900 rounded-xl border border-amber-500/40 space-y-3">
                      <p className="text-xs font-bold text-amber-300">🔮 PREDICT BEFORE MOVING THE SLIDER:</p>
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-3 text-left rounded-lg bg-slate-800 hover:bg-slate-750 text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="space-y-4">
                      <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-700/50 text-xs text-emerald-300">
                        ✓ Prediction recorded! Drag the <strong>Divisible Profit Slider</strong> below to see Chetan's guaranteed floor in real-time.
                      </div>

                      {/* Sliders */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Firm Divisible Profit: ₹{simProfitSlider.toLocaleString('en-IN')}</span>
                          </div>
                          <input
                            type="range"
                            min={50000}
                            max={500000}
                            step={10000}
                            value={simProfitSlider}
                            onChange={(e) => setSimProfitSlider(Number(e.target.value))}
                            className="w-full accent-emerald-500 cursor-pointer"
                            aria-label="Adjust Firm Divisible Profit"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Chetan Guaranteed Minimum: ₹{guaranteeAmountSlider.toLocaleString('en-IN')}</span>
                          </div>
                          <input
                            type="range"
                            min={20000}
                            max={100000}
                            step={5000}
                            value={guaranteeAmountSlider}
                            onChange={(e) => setGuaranteeAmountSlider(Number(e.target.value))}
                            className="w-full accent-amber-500 cursor-pointer"
                            aria-label="Adjust Chetan Guarantee Amount"
                          />
                        </div>
                      </div>

                      {/* Live Allocation Breakdown */}
                      <div className="grid grid-cols-3 gap-3 text-center text-xs">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <p className="text-slate-400">Aarav (50% - Def)</p>
                          <p className="text-base font-bold text-emerald-400 mt-1">
                            ₹{Math.round(simCalculations.finalShareA).toLocaleString('en-IN')}
                          </p>
                          {simCalculations.deficiency > 0 && (
                            <span className="text-[10px] text-rose-400">(-₹{Math.round(simCalculations.deficiency / 2).toLocaleString('en-IN')} def)</span>
                          )}
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <p className="text-slate-400">Bhavna (30% - Def)</p>
                          <p className="text-base font-bold text-gold-400 mt-1">
                            ₹{Math.round(simCalculations.finalShareB).toLocaleString('en-IN')}
                          </p>
                          {simCalculations.deficiency > 0 && (
                            <span className="text-[10px] text-rose-400">(-₹{Math.round(simCalculations.deficiency / 2).toLocaleString('en-IN')} def)</span>
                          )}
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <p className="text-slate-400">Chetan (Guaranteed Floor)</p>
                          <p className="text-base font-bold text-amber-400 mt-1">
                            ₹{Math.round(simCalculations.finalShareC).toLocaleString('en-IN')}
                          </p>
                          {simCalculations.deficiency > 0 ? (
                            <span className="text-[10px] text-emerald-400">(+₹{Math.round(simCalculations.deficiency).toLocaleString('en-IN')} top-up)</span>
                          ) : (
                            <span className="text-[10px] text-slate-500">(Normal share &gt; floor)</span>
                          )}
                        </div>
                      </div>

                      {/* Recharts Live Bar Chart */}
                      <div className="h-44 w-full pt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData}>
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                            <YAxis stroke="#94a3b8" fontSize={11} />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                              formatter={(val: number | string | Array<number | string> | undefined) => [typeof val === 'number' ? `₹${val.toLocaleString('en-IN')}` : String(val), 'Profit Share']}
                            />
                            <Bar dataKey="share" radius={[6, 6, 0, 0]}>
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40 border border-slate-700"
            >
              ← Previous Concept
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Next Concept →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-black shadow-lg"
              >
                Open Free Sandbox Lab →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-emerald-300">Free Play Sandbox Mode</h3>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-700 rounded-full text-xs font-semibold">
                No Grading / Stress-Free
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Manipulate all financial variables below. Watch the dynamic balance sheet pipeline and T-accounts adapt instantly.
            </p>
          </div>

          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
            {/* Control Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Firm Operating Profit: ₹{simProfitSlider.toLocaleString('en-IN')}
                </label>
                <input
                  type="range"
                  min={50000}
                  max={600000}
                  step={10000}
                  value={simProfitSlider}
                  onChange={(e) => setSimProfitSlider(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                  aria-label="Sandbox Profit Slider"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Chetan Loan Advance: ₹{loanAmountSlider.toLocaleString('en-IN')}
                </label>
                <input
                  type="range"
                  min={0}
                  max={300000}
                  step={25000}
                  value={loanAmountSlider}
                  onChange={(e) => setLoanAmountSlider(Number(e.target.value))}
                  className="w-full accent-gold-500"
                  aria-label="Sandbox Loan Slider"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Aarav Monthly Drawings: ₹{drawingsMonthlySlider.toLocaleString('en-IN')}
                </label>
                <input
                  type="range"
                  min={1000}
                  max={20000}
                  step={1000}
                  value={drawingsMonthlySlider}
                  onChange={(e) => setDrawingsMonthlySlider(Number(e.target.value))}
                  className="w-full accent-amber-500"
                  aria-label="Sandbox Drawings Slider"
                />
              </div>
            </div>

            {/* Live T-Account Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {/* P&L Appropriation Account */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-center font-bold text-slate-200 border-b border-slate-700 pb-2 mb-2">
                  Profit & Loss Appropriation Account (Dr / Cr)
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1 text-rose-300">
                    <p>To IoC (Aarav): ₹{simCalculations.iocA.toLocaleString('en-IN')}</p>
                    <p>To IoC (Bhavna): ₹{simCalculations.iocB.toLocaleString('en-IN')}</p>
                    <p>To IoC (Chetan): ₹{simCalculations.iocC.toLocaleString('en-IN')}</p>
                    <p>To Salary (Aarav): ₹{simCalculations.salaryA.toLocaleString('en-IN')}</p>
                    <p>To General Reserve: ₹{Math.round(simCalculations.generalReserve).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="space-y-1 text-emerald-300 text-right">
                    <p>By Net Profit: ₹{simCalculations.netProfitAfterLoan.toLocaleString('en-IN')}</p>
                    <p>By Int on Drawings: ₹{Math.round(simCalculations.iodA).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>

              {/* Capital & Current Output */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-center font-bold text-slate-200 border-b border-slate-700 pb-2 mb-2">
                  Divisible Profit Distribution Result
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-emerald-300">
                    <span>Aarav Final Share:</span>
                    <span className="font-bold">₹{Math.round(simCalculations.finalShareA).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-gold-300">
                    <span>Bhavna Final Share:</span>
                    <span className="font-bold">₹{Math.round(simCalculations.finalShareB).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-amber-300">
                    <span>Chetan Final Share:</span>
                    <span className="font-bold">₹{Math.round(simCalculations.finalShareC).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-purple-300 border-t border-slate-800 pt-1">
                    <span>General Reserve Retention:</span>
                    <span className="font-bold">₹{Math.round(simCalculations.generalReserve).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-2xl shadow-xl text-sm uppercase tracking-wider"
          >
            Ready for Challenges! Launch Exam-Tier Practice →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE MODE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Canvas Animation Bar */}
          <canvas ref={canvasRef} width={500} height={50} className="w-full rounded-xl bg-slate-900/60 border border-slate-800" />

          {/* Progress Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>📝</span> Challenge {currentChallenge + 1} of {filteredChallenges.length}
            </h2>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300">
                Competency: <strong className="text-emerald-400 capitalize">{activeChallenge.competencyLevel}</strong>
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* ── MCQ CHALLENGES ── */}
          {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-base font-semibold text-white leading-relaxed">{activeChallenge.question}</p>
              <div className="space-y-3">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                      wrongFlash
                        ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                        : showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                    aria-label={`Select option ${i + 1}`}
                  >
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* ── DRAG-LABEL CHALLENGES ── */}
          {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-5">
              <p className="text-base font-semibold text-white">{activeChallenge.question}</p>

              {/* Palette */}
              <div className="flex flex-wrap gap-2">
                {activeChallenge.dragItems.map((item, i) => (
                  <motion.div
                    key={i}
                    draggable
                    onDragStart={() => handleDragStart(item.label)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-grab shadow"
                    role="button"
                    aria-label={`Draggable item: ${item.label}`}
                  >
                    ⠿ {item.label}
                  </motion.div>
                ))}
              </div>

              {/* Targets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDragDrop('box_pl_charge')}
                  className="p-5 rounded-2xl border-2 border-dashed border-amber-600/60 bg-slate-950 flex flex-col items-center justify-center min-h-[120px]"
                >
                  <p className="text-xs font-bold text-amber-400 mb-2">P&L Account (Charges against Profit)</p>
                  <span className="text-sm font-semibold text-slate-200 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                    {droppedLabels.box_pl_charge || 'Drop charge item here'}
                  </span>
                </div>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDragDrop('box_pl_app')}
                  className="p-5 rounded-2xl border-2 border-dashed border-emerald-600/60 bg-slate-950 flex flex-col items-center justify-center min-h-[120px]"
                >
                  <p className="text-xs font-bold text-emerald-400 mb-2">P&L Appropriation A/c (Appropriations)</p>
                  <span className="text-sm font-semibold text-slate-200 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                    {droppedLabels.box_pl_app || 'Drop appropriation item here'}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(droppedLabels)}
                className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
              >
                Verify Classifications →
              </motion.button>
            </div>
          )}

          {/* ── DRAG-SORT CHALLENGES ── */}
          {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-base font-semibold text-white">{activeChallenge.question}</p>
              <div className="space-y-2">
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                  >
                    <span className="p-1 bg-slate-900 text-emerald-400 rounded font-mono font-bold">{displayIdx + 1}</span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(sortArrangement.length ? sortArrangement : activeChallenge.sortItems!.map((_, i) => i))}
                className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
              >
                Validate Sequence →
              </motion.button>
            </div>
          )}

          {/* ── NUMERIC CHALLENGES ── */}
          {activeChallenge.type === 'numeric' && (
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-base font-semibold text-white">{activeChallenge.question}</p>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value"
                  className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                  aria-label="Numeric input"
                />
                <span className="text-slate-400 text-sm font-bold">{activeChallenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Submit Value
                </motion.button>
              </div>
            </div>
          )}

          {/* ── CONSTRUCT CHALLENGES ── */}
          {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-base font-semibold text-white">{activeChallenge.question}</p>
              <div className="flex flex-wrap gap-2">
                {activeChallenge.availableParts.map((part, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setConstructParts(prev => [...prev, part])}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                {constructParts.map((part, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-3 py-1.5 bg-emerald-900 border border-emerald-600 text-emerald-200 rounded-lg text-xs font-mono flex items-center gap-2"
                  >
                    <span>{part}</span>
                    <button
                      onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                      className="text-rose-400 hover:text-rose-200"
                      aria-label="Remove construct part"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
                {constructParts.length === 0 && (
                  <p className="text-slate-500 text-xs">Click elements above to assemble the journal entry.</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(constructParts.join(' '))}
                disabled={constructParts.length === 0 || showExplanation}
                className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
              >
                Confirm Journal Entry →
              </motion.button>
            </div>
          )}

          {/* ── STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION ── */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-700/60 rounded-2xl space-y-4"
            >
              <h4 className="text-sm font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <span>📖</span> Step-by-Step Resolution
              </h4>

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
                      className="text-slate-200 text-xs sm:text-sm leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRevealedSteps(s => s + 1)}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                >
                  Show Next Step →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextChallenge}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs tracking-wider uppercase shadow-xl"
                >
                  {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mastery →' : 'Next Challenge →'}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 rounded-3xl border border-emerald-600/50 shadow-2xl text-center space-y-3">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Simulation Completed!</h2>
            <p className="text-emerald-300 font-mono text-sm">
              Final Composite Score: <strong className="text-white text-lg">{Math.max(0, 100 - errors * 5)}%</strong> | Mastery Level: <strong className="text-emerald-400 capitalize">{masteryLevel}</strong>
            </p>
          </div>

          {/* Motivational Feedback Banner */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-emerald-700/50 text-center space-y-2">
            <h3 className="text-xl font-black tracking-wide text-emerald-400">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-sm font-semibold text-slate-300 leading-relaxed">
              {errors === 0
                ? 'You demonstrated flawless understanding of Section 4 mutual agency, Section 13 defaults, and P&L Appropriation!'
                : errors <= 3
                ? 'Your grasp of partnership accounting and profit guarantee rules is exam-ready.'
                : errors <= 7
                ? 'Review the misconception diagnostic notes below to sharpen your calculations.'
                : 'Partnership rules take practice to master. Review the statutory defaults and retry!'}
            </p>
          </div>

          {/* Spaced Repetition Visibility */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-gold-500/50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Spaced Repetition Schedule</p>
                <p className="text-sm text-slate-200">
                  Next recommended review: <strong className="text-gold-300">in {srsIntervalDays} {srsIntervalDays === 1 ? 'day' : 'days'}</strong>
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-gold-950 text-gold-300 border border-gold-700/60 rounded-xl text-xs font-mono font-semibold">
              {errors === 0 ? 'Optimal Retention (7d)' : errors <= 3 ? 'Reinforce Soon (3d)' : 'Immediate Review (1d)'}
            </span>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                🎯 Personalised Misconception Diagnostics
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                      <p className="text-xs font-bold text-rose-300">❌ {m.misconception}</p>
                      <p className="text-xs text-emerald-300 font-medium">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <span>💼</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="list-decimal list-inside text-xs text-slate-400 space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Partnership Challenge Conquered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_AccountancyDefinitionMeaningFeaturesSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst,
} from '../../../lib/sim-engine';
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
  Cell,
  CartesianGrid,
} from 'recharts';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C11_ACC_041 = 'c11_acc_041';
const NODE_C11_ACC_042 = 'c11_acc_042';
const NODE_C11_ACC_043 = 'c11_acc_043';
const NODE_C11_ACC_044 = 'c11_acc_044';
const NODE_C11_ACC_045 = 'c11_acc_045';
const NODE_C11_ACC_046 = 'c11_acc_046';
const NODE_C11_ACC_047 = 'c11_acc_047';
const NODE_C11_ACC_048 = 'c11_acc_048';
const NODE_C11_ACC_049 = 'c11_acc_049';
const NODE_C11_ACC_050 = 'c11_acc_050';

const ALL_NODE_IDS = [
  NODE_C11_ACC_041,
  NODE_C11_ACC_042,
  NODE_C11_ACC_043,
  NODE_C11_ACC_044,
  NODE_C11_ACC_045,
  NODE_C11_ACC_046,
  NODE_C11_ACC_047,
  NODE_C11_ACC_048,
  NODE_C11_ACC_049,
  NODE_C11_ACC_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Indian Commercial Settlement Audit',
  intro:
    'You are appointed Chief Financial Controller for Bharat Industrial Holdings. Your task is to audit and structure transactions involving Larsen & Toubro, BHEL, Tata Motors, Reliance Industries, Dabur, and Asian Paints. You will negotiate bills of exchange, determine maturity dates, account for discounts, manage dishonour and insolvency, and accurately classify multi-crore capital vs revenue items.',
  context:
    'Corporate financial solvency depends on strict compliance with the Negotiable Instruments Act 1881, AS-10, AS-26, AS-29, and the Companies Act 2013.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'Larsen & Toubro draws a 60-day bill of exchange on BHEL on 01-Jan-2025. BHEL accepts it on 10-Jan-2025. If the bill is drawn "60 days after date", on what legal date is payment due?',
  options: [
    '02-Mar-2025 (60 days exactly without grace)',
    '05-Mar-2025 (60 days from bill date + 3 days of grace)',
    '15-Mar-2025 (60 days from acceptance date + 3 grace days)',
    '01-Mar-2025 (end of February)',
  ],
  correctIndex: 1,
  hintAfter:
    'For a bill "after date", tenure runs from the bill\'s date (01-Jan), NOT the acceptance date. Under Sec. 22 of the NI Act 1881, 3 days of grace must be added!',
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

// ─── 22 RICH ADAPTIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c11_acc_041)
  {
    id: 'ch_01',
    nodeId: NODE_C11_ACC_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 7 of the Negotiable Instruments Act 1881, who is the "Drawee" in a bill of exchange?',
    options: [
      'The party who creates and signs the bill (the creditor/seller)',
      'The party directed to pay who becomes primarily liable upon signing acceptance',
      'The third party named to receive the cash payment',
      'The bank that purchases the bill at a discount',
    ],
    correctIndex: 1,
    explanation: 'The drawee is the party on whom the bill is drawn (usually the buyer). Before signing, they are not bound; after signing "Accepted", they become the acceptor and are primarily liable.',
    hints: [
      'Think about who receives the order to pay.',
      'The drawer writes the bill, but the drawee must pay it.',
      'The drawee becomes the acceptor once they sign on the face of the bill.',
    ],
    misconceptionIndex: 2,
  },

  // 2. Foundation - Understanding (c11_acc_041)
  {
    id: 'ch_02',
    nodeId: NODE_C11_ACC_041,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does a "Bill after Date" differ fundamentally from a "Bill after Sight"?',
    options: [
      'A bill after date requires no acceptance at all',
      'Tenure runs from the bill date for "after date", but from the date of drawee acceptance for "after sight"',
      'A bill after sight receives 5 days of grace instead of 3 days',
      'A bill after date is payable immediately on demand',
    ],
    correctIndex: 1,
    explanation: 'For a bill after date, tenure is calculated from the date written on the instrument. For a bill after sight, the clock starts ticking only when the drawee inspects and signs acceptance.',
    hints: [
      'Focus on the start date from which days/months are counted.',
      'Sight means when the drawee sees and accepts the bill.',
      'After date counts from bill creation date; after sight counts from acceptance date.',
    ],
    misconceptionIndex: 1,
  },

  // 3. Foundation - Drag Label Diagram (c11_acc_041 / c11_acc_043)
  {
    id: 'ch_03',
    nodeId: NODE_C11_ACC_041,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each legal role to its correct position in the commercial bill flow:',
    dragItems: [
      { label: 'Drawer (Seller / Creator)', targetId: 'pos_drawer' },
      { label: 'Drawee / Acceptor (Buyer)', targetId: 'pos_drawee' },
      { label: 'Payee (Beneficiary / Bank)', targetId: 'pos_payee' },
      { label: 'Endorsee (Transferee)', targetId: 'pos_endorsee' },
    ],
    correctMapping: {
      pos_drawer: 'Drawer (Seller / Creator)',
      pos_drawee: 'Drawee / Acceptor (Buyer)',
      pos_payee: 'Payee (Beneficiary / Bank)',
      pos_endorsee: 'Endorsee (Transferee)',
    },
    explanation: 'The Drawer creates the order; the Drawee accepts the obligation; the Payee is designated to receive funds; the Endorsee receives title via endorsement.',
    hints: [
      'The seller who issues the bill is the Drawer.',
      'The debtor who must pay upon maturity is the Drawee.',
      'The original recipient of proceeds is the Payee; subsequent holders by signature are Endorsees.',
    ],
    misconceptionIndex: 0,
  },

  // 4. Foundation - Recall (c11_acc_042)
  {
    id: 'ch_04',
    nodeId: NODE_C11_ACC_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Section 22 of the Negotiable Instruments Act 1881, which type of bill receives 3 days of grace?',
    options: [
      'Demand bills and Bills at sight',
      'Time bills (payable after date or after sight)',
      'All negotiable instruments including cheques and demand promissory notes',
      'Only foreign currency export bills',
    ],
    correctIndex: 1,
    explanation: 'Days of grace (3 extra days) are legally mandated exclusively for time bills. Demand/sight bills are payable immediately upon presentment and receive 0 grace days.',
    hints: [
      'Do instruments payable immediately require waiting periods?',
      'Grace days allow physical presentment for bills with a fixed future date.',
      'Only time bills get 3 days of grace; demand bills get zero.',
    ],
    misconceptionIndex: 0,
  },

  // 5. Standard - Application Numeric (c11_acc_042)
  {
    id: 'ch_05',
    nodeId: NODE_C11_ACC_042,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A bill dated 23-Nov-2024 is drawn at 2 months after date. If 26-Jan-2025 is Republic Day (public holiday), what is the legal due date in January 2025? Enter the day number (e.g. 25 for Jan 25):',
    correctAnswer: 25,
    tolerance: 0,
    unit: 'Jan 2025',
    explanation: '23-Nov-2024 + 2 months = 23-Jan-2025. Adding 3 days of grace gives 26-Jan-2025. Because 26-Jan is Republic Day (public holiday), the due date is ADVANCED to the preceding working day: 25-Jan-2025.',
    hints: [
      'Add 2 calendar months to 23-Nov to reach 23-Jan.',
      'Add 3 days of grace: 23 + 3 = 26-Jan.',
      'If the due date is a public holiday, advance to the preceding working day (subtract 1 day).',
    ],
    misconceptionIndex: 1,
  },

  // 6. Standard - Application Numeric (c11_acc_043)
  {
    id: 'ch_06',
    nodeId: NODE_C11_ACC_043,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Asian Paints discounts a ₹2,00,000 bill with HDFC Bank at 12% p.a. for an unexpired tenure of 73 days. What is the discount charge in Rupees?',
    correctAnswer: 4800,
    tolerance: 20,
    unit: '₹',
    explanation: 'Discount = Bill Amount × Rate × Days / (100 × 365) = 2,00,000 × 12/100 × 73/365 = 2,00,000 × 0.12 × 0.2 = ₹4,800. Net proceeds = ₹1,95,200.',
    hints: [
      'Use the simple interest formula: P × R × T / 100.',
      'Here T = 73 / 365 = 1/5 = 0.2 years.',
      'Multiply ₹2,00,000 by 12% and then by 0.2.',
    ],
    misconceptionIndex: 0,
  },

  // 7. Standard - Analysis (c11_acc_043)
  {
    id: 'ch_07',
    nodeId: NODE_C11_ACC_043,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does Endorsement to a creditor not involve a discount expense, whereas Discounting with a bank does?',
    options: [
      'Endorsement is illegal under the Companies Act 2013',
      'The creditor accepts the bill at full face value to settle an existing debt, while the bank advances immediate cash and charges interest for waiting',
      'Banks do not charge discount if the drawer holds an SBI account',
      'Endorsement creates no contingent liability whatsoever for the drawer',
    ],
    correctIndex: 1,
    explanation: 'In endorsement, a creditor accepts a deferred payment instrument at face value in lieu of cash. In discounting, a bank lends immediate liquid funds and deducts discount as finance cost for the unexpired term.',
    hints: [
      'Consider who is advancing cash today.',
      'A creditor is simply waiting for maturity to collect ₹2,00,000.',
      'A bank provides instant liquidity today, charging discount as interest.',
    ],
    misconceptionIndex: 1,
  },

  // 8. Standard - Understanding (c11_acc_044)
  {
    id: 'ch_08',
    nodeId: NODE_C11_ACC_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'When a bill is sent to a bank "For Collection", why is the Bank Account NOT immediately debited in the drawer\'s books?',
    options: [
      'The bank has not purchased or discounted the bill; it acts purely as an agent who will credit funds only upon maturity collection',
      'Bills for collection are immediately classified as bad debts',
      'GST must be deducted before debiting the bank account',
      'The Negotiable Instruments Act prohibits recording bank entries prior to notary inspection',
    ],
    correctIndex: 0,
    explanation: 'The bank acts solely as an agent for custody and presentment. The asset is reclassified temporarily to "Bills for Collection A/c". Bank A/c is debited only when the drawee pays on the due date.',
    hints: [
      'Has the bank given you liquid cash yet?',
      'The bank is merely holding the paper to present on your behalf.',
      'Debit Bills for Collection A/c initially; debit Bank A/c only upon actual realization.',
    ],
    misconceptionIndex: 0,
  },

  // 9. Standard - Application (c11_acc_044)
  {
    id: 'ch_09',
    nodeId: NODE_C11_ACC_044,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A retained bill for ₹1,50,000 is dishonoured on maturity. The drawer pays ₹300 noting charges to a Notary Public. What is the correct journal entry in the drawer\'s books?',
    options: [
      'Dr. Noting Charges A/c ₹300, Dr. Bills Receivable A/c ₹1,50,000 | Cr. Cash A/c ₹1,50,300',
      'Dr. Drawee A/c ₹1,50,300 | Cr. Bills Receivable A/c ₹1,50,000, Cr. Cash A/c ₹300',
      'Dr. Profit & Loss A/c ₹1,50,300 | Cr. Drawee A/c ₹1,50,300',
      'Dr. Bank A/c ₹1,50,000 | Cr. Drawee A/c ₹1,50,000',
    ],
    correctIndex: 1,
    explanation: 'The drawee\'s personal account is reopened for the total recoverable claim (Face Value + Noting Charges = ₹1,50,300). Bills Receivable is cancelled (Cr. ₹1,50,000) and Cash paid to the notary is credited (Cr. ₹300).',
    hints: [
      'The Drawee caused the dishonour and must pay both the bill and the noting charges.',
      'Noting charges are recoverable from the drawee, not a permanent expense of the drawer.',
      'Debit Drawee for ₹1,50,300 and credit Bills Receivable + Cash.',
    ],
    misconceptionIndex: 1,
  },

  // 10. Standard - Drag Sort Process (c11_acc_045)
  {
    id: 'ch_10',
    nodeId: NODE_C11_ACC_045,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential accounting steps in the Drawer\'s books for the Renewal of a Bill with interest and partial cash settlement:',
    sortItems: [
      'Cancel the old bill (Dr. Drawee A/c, Cr. Bills Receivable A/c)',
      'Record interest due for the extended period (Dr. Drawee A/c, Cr. Interest A/c)',
      'Record part payment received in cash/bank (Dr. Bank A/c, Cr. Drawee A/c)',
      'Accept the new bill for the remaining balance plus interest (Dr. Bills Receivable A/c, Cr. Drawee A/c)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Renewal requires: (1) Cancelling the old obligation, (2) Charging interest on delayed funds, (3) Receiving any part cash, and (4) Drawing the fresh bill for the net balance.',
    hints: [
      'First invalidate the expired bill before doing anything else.',
      'Calculate and charge interest onto the debtor\'s account.',
      'Receive cash next, then take the new bill for the remaining amount.',
    ],
    misconceptionIndex: 0,
  },

  // 11. Standard - Application Numeric (c11_acc_045)
  {
    id: 'ch_11',
    nodeId: NODE_C11_ACC_045,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Dabur holds a ₹1,00,000 bill. The drawee pays it 73 days before due date. Dabur grants a rebate of 10% p.a. How much cash does Dabur receive in net?',
    correctAnswer: 98000,
    tolerance: 10,
    unit: '₹',
    explanation: 'Rebate = 1,00,000 × 10/100 × 73/365 = ₹2,00,000 / 100 = ₹2,000. Cash Received = Bill Amount − Rebate = ₹1,00,000 − ₹2,000 = ₹98,000.',
    hints: [
      'Calculate Rebate = P × R × T / 100.',
      'Rebate = 1,00,000 × 0.10 × (73/365) = ₹2,00,000.',
      'Net cash received = 1,00,000 − 2,000 = ₹98,000.',
    ],
    misconceptionIndex: 1,
  },

  // 12. Advanced - Application Numeric (c11_acc_046)
  {
    id: 'ch_12',
    nodeId: NODE_C11_ACC_046,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A drawee owing ₹1,20,000 on a dishonoured bill (plus ₹500 noting charges) is declared insolvent by NCLT. His estate pays 40 paise in the rupee. How much is written off to Bad Debts A/c?',
    correctAnswer: 72300,
    tolerance: 50,
    unit: '₹',
    explanation: 'Total claim = ₹1,20,000 + ₹500 = ₹1,20,500. Cash recovered = 40% of 1,20,500 = ₹48,200. Bad Debts = 60% of ₹1,20,500 = ₹72,300.',
    hints: [
      'First add noting charges to find total claim: ₹1,20,500.',
      '40 paise in the rupee means 40% is recovered and 60% is lost.',
      'Bad Debts = ₹1,20,500 × 0.60 = ₹72,300.',
    ],
    misconceptionIndex: 0,
  },

  // 13. Advanced - Analysis (c11_acc_046)
  {
    id: 'ch_13',
    nodeId: NODE_C11_ACC_046,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When an endorsed bill is dishonoured due to drawee insolvency, whom does the Endorsee debit in their books?',
    options: [
      'The Insolvent Drawee directly',
      'The Drawer (Endorser) from whom the bill was received',
      'The Deficiency Account of the Government',
      'The National Company Law Tribunal',
    ],
    correctIndex: 1,
    explanation: 'The endorsee has no direct privity of contract with the drawee. Under Section 52 of the NI Act 1881, the endorser is secondarily liable. Thus, the endorsee reopens the Drawer (Endorser) account.',
    hints: [
      'Did the endorsee deal directly with the drawee, or receive it from the drawer?',
      'The person who passed you the bad cheque/bill is responsible to pay you back.',
      'Debit the Endorser (Drawer) personal account.',
    ],
    misconceptionIndex: 2,
  },

  // 14. Foundation - Classify (c11_acc_047)
  {
    id: 'ch_14',
    nodeId: NODE_C11_ACC_047,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary test to distinguish Capital Expenditure from Revenue Expenditure?',
    options: [
      'Whether the payment exceeds ₹1,00,000',
      'Whether the economic benefit extends beyond one accounting period (creating/enhancing an asset) or is consumed within the current period',
      'Whether the payment is made via cheque or cash',
      'Whether the vendor is a registered private limited company',
    ],
    correctIndex: 1,
    explanation: 'Classification depends strictly on the benefit period and asset enhancement (AS-10), never on the arbitrary monetary size of the payment.',
    hints: [
      'Does amount size determine accounting nature?',
      'Ask: "Does this benefit future accounting years or just this year?"',
      'Benefit > 1 year = Capital; Benefit within current year = Revenue.',
    ],
    misconceptionIndex: 0,
  },

  // 15. Standard - Application (c11_acc_047)
  {
    id: 'ch_15',
    nodeId: NODE_C11_ACC_047,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Tata Motors incurs: (1) ₹50,00,000 for installing robotic arms increasing assembly speed by 40%, and (2) ₹4,00,000 for annual repainting of the factory shed. How should these be classified?',
    options: [
      'Both are Capital Expenditure',
      '(1) Capital Expenditure, (2) Revenue Expenditure',
      '(1) Revenue Expenditure, (2) Capital Expenditure',
      'Both are Deferred Revenue Expenditure',
    ],
    correctIndex: 1,
    explanation: 'Robotic arms enhance productive capacity and useful life (Capital under AS-10). Routine factory painting merely restores original condition (Revenue maintenance).',
    hints: [
      'Robotic arms increase future capacity and output.',
      'Painting is routine maintenance maintaining current state.',
      'Improvement = Capital; Repair/Maintenance = Revenue.',
    ],
    misconceptionIndex: 1,
  },

  // 16. Advanced - Evaluation (c11_acc_047)
  {
    id: 'ch_16',
    nodeId: NODE_C11_ACC_047,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'If an accountant mistakenly records a ₹10,00,000 machinery purchase as routine Repairs & Maintenance in the P&L, what is the exact financial impact?',
    options: [
      'Current year profit is overstated and assets are understated',
      'Current year profit is understated by ₹10 Lakh (less depreciation) and Balance Sheet assets are understated',
      'No effect because total cash outflow is identical',
      'Current year profit is understated and future years profits are also understated',
    ],
    correctIndex: 1,
    explanation: 'Charging a capital asset to P&L artificially bloats expenses, understating current year profit. The Balance Sheet fails to show the machinery asset. Future years will have zero depreciation, overstating future profits.',
    hints: [
      'Writing off ₹10L in Year 1 instead of ₹1L depreciation reduces Year 1 net profit.',
      'The fixed asset is missing from the Balance Sheet.',
      'Profit is understated in Year 1, while assets are understated on the Balance Sheet.',
    ],
    misconceptionIndex: 2,
  },

  // 17. Standard - Classify (c11_acc_048)
  {
    id: 'ch_18',
    nodeId: NODE_C11_ACC_048,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Infosys sells an old office computer (Book Value ₹30,000) for ₹45,000 cash. What is the correct accounting treatment?',
    options: [
      '₹45,000 is a Revenue Receipt credited to Sales A/c',
      'The total ₹45,000 is a Capital Receipt; ₹30,000 reduces Computers A/c and ₹15,000 is recognized as Capital Profit',
      '₹45,000 is transferred directly to General Reserve',
      '₹15,000 is a Deferred Revenue Receipt',
    ],
    correctIndex: 1,
    explanation: 'Proceeds from disposing of a fixed asset are Capital Receipts. The ₹15,000 excess over book value is Capital Profit (disclosed as Other Income in P&L), while ₹30,000 reduces the asset balance.',
    hints: [
      'Is selling fixed equipment part of normal operating turnover?',
      'Total inflow is capital receipt because a non-current asset was sold.',
      'Excess over book value (₹15,000) is capital profit.',
    ],
    misconceptionIndex: 0,
  },

  // 18. Standard - Analysis (c11_acc_048)
  {
    id: 'ch_19',
    nodeId: NODE_C11_ACC_048,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why must financial analysts separate Capital Profit (e.g. sale of land) from Revenue Profit (operating sales)?',
    options: [
      'Capital profits cannot be deposited into Indian commercial banks',
      'Capital profits are non-recurring and do not reflect the ongoing core earning power and sustainability of the enterprise',
      'Revenue profits are not subject to GST or Income Tax',
      'The Companies Act 2013 mandates that capital profits be distributed as cash dividends within 30 days',
    ],
    correctIndex: 1,
    explanation: 'A company cannot liquidate its fixed assets repeatedly to generate earnings. Capital profits are one-off windfalls; only revenue profits reflect sustainable operating performance.',
    hints: [
      'Can a company survive by continuously selling off its own factories?',
      'Operating profits repeat every year; fixed asset sales do not.',
      'Capital profit is non-recurring; revenue profit is sustainable.',
    ],
    misconceptionIndex: 1,
  },

  // 19. Standard - Application Numeric (c11_acc_049)
  {
    id: 'ch_20',
    nodeId: NODE_C11_ACC_049,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Vodafone Idea spends ₹300 Crore on a mega brand relaunch in 2023, writing it off over 5 years. What is the unamortised balance shown under "Other Non-Current Assets" at the end of Year 2 in Crores?',
    correctAnswer: 180,
    tolerance: 0,
    unit: '₹ Cr',
    explanation: 'Annual write-off = ₹300 Cr ÷ 5 = ₹60 Cr/year. Cumulative amortisation after 2 years = 2 × ₹60 Cr = ₹120 Cr. Unamortised balance = ₹300 Cr − ₹120 Cr = ₹180 Cr.',
    hints: [
      'Calculate write-off per year: 300 / 5 = 60 Cr.',
      'In 2 years, total written off = 2 × 60 = 120 Cr.',
      'Remaining balance = 300 − 120 = 180 Cr.',
    ],
    misconceptionIndex: 1,
  },

  // 20. Foundation - Distinguish (c11_acc_050)
  {
    id: 'ch_21',
    nodeId: NODE_C11_ACC_050,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the fundamental difference between a "Provision" and a "Reserve"?',
    options: [
      'Provisions are created only when profits are huge; reserves are created during losses',
      'A Provision is a mandatory CHARGE against profit for a known liability of uncertain amount; a Reserve is an APPROPRIATION of earned profit to strengthen financial standing',
      'Provisions are distributed to shareholders as dividends; reserves cannot be used',
      'Reserves appear on the asset side; provisions appear under share capital',
    ],
    correctIndex: 1,
    explanation: 'Provisions are charges against revenue (debited to P&L before net profit) required even during losses. Reserves are appropriations of net profit (debited to P&L Appropriation A/c) possible only when profit exists.',
    hints: [
      'Think about charge vs appropriation.',
      'Do you have to provide for depreciation even if you made a loss?',
      'Provision = Charge (Mandatory); Reserve = Appropriation (from Profit).',
    ],
    misconceptionIndex: 0,
  },

  // 21. Advanced - Construct / Balance (c11_acc_050)
  {
    id: 'ch_22',
    nodeId: NODE_C11_ACC_050,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct accounting flow to appropriate ₹5,000 Cr of Net Profit into General Reserve and Capital Reserve:',
    availableParts: [
      'Dr. Profit & Loss Appropriation A/c',
      'Cr. General Reserve A/c',
      'Cr. Capital Reserve A/c',
      'Dr. Trading A/c',
      'Cr. Provision for Tax A/c',
    ],
    targetState: 'Dr. Profit & Loss Appropriation A/c Cr. General Reserve A/c Cr. Capital Reserve A/c',
    validationHint: 'Select Dr. Profit & Loss Appropriation A/c followed by the appropriate reserve credits.',
    explanation: 'Appropriations of profit are debited to P&L Appropriation A/c and credited to respective Reserve Accounts under Shareholders\' Funds (Reserves and Surplus).',
    hints: [
      'Start with the debit to P&L Appropriation Account.',
      'Add the credits to General Reserve and Capital Reserve.',
      'Click the parts in order to construct the compound journal entry.',
    ],
    misconceptionIndex: 1,
  },

  // 22. Advanced - Evaluation (c11_acc_050)
  {
    id: 'ch_23',
    nodeId: NODE_C11_ACC_050,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does the Banking Regulation Act 1949 permit commercial banks (like HDFC Bank/SBI) to maintain "Secret Reserves", while general corporate law discourages them?',
    options: [
      'Banks do not have shareholders or board members',
      'Secret reserves prevent public panic during temporary shocks by absorbing unseen losses, maintaining depositor confidence and financial stability',
      'Secret reserves eliminate all corporate income tax liabilities',
      'Banks are exempt from the Indian Chartered Accountants Act',
    ],
    correctIndex: 1,
    explanation: 'Banks manage public deposits where systemic confidence is paramount. Secret reserves cushion unanticipated credit shocks without triggering depositor runs, prioritizing depositor security over pure transparency.',
    hints: [
      'Consider the difference between a retail depositor and a factory shareholder.',
      'If a bank reports a sudden quarterly loss, what might depositors do?',
      'Secret reserves stabilize systemic trust for financial institutions.',
    ],
    misconceptionIndex: 2,
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
  nodeId: NODE_C11_ACC_041,
  title: 'Bills of Exchange & Accounting Classifications Lab',
  definition:
    'Mastery of Drawer, Drawee, Payee, Due Date determination with Grace Days, Endorsement, Discounting, Dishonour, Insolvency, Capital vs Revenue Outflows/Inflows, Deferred Revenue, and Provisions vs Reserves.',
  eli5:
    'A bill of exchange is a formal legal promise to pay trade credit on a specific future calendar date. Capital spending builds long-term business power, while revenue spending keeps daily operations running.',
  misconceptions: [
    {
      misconception: 'Grace days (3 days) apply to all bills, including demand and sight bills.',
      correction: 'Section 22 of NI Act 1881 grants 3 days of grace ONLY to time bills (after date / after sight). Demand bills have 0 grace days.',
    },
    {
      misconception: 'If a calculated legal due date falls on a public holiday, it is postponed to the next day.',
      correction: 'The law mandates that when a due date falls on a known public holiday, it is ADVANCED to the preceding working day.',
    },
    {
      misconception: 'A small expenditure on an asset (e.g., ₹40,000 laptop) is always revenue expenditure.',
      correction: 'Classification is determined by the economic benefit period (>1 year = Capital), not by the arbitrary monetary size.',
    },
    {
      misconception: 'Provisions and Reserves are identical ways of saving company profits.',
      correction: 'A Provision is a mandatory charge against revenue for known liabilities. A Reserve is an appropriation of earned net profit.',
    },
    {
      misconception: 'Noting charges paid on dishonour are a permanent loss to the drawer.',
      correction: 'Noting charges are initially paid by the holder but are legally recoverable in full from the defaulting drawee.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Who is primarily liable on an accepted bill?', options: ['The Drawer', 'The Drawee/Acceptor', 'The Notary Public', 'The Endorsee'], correctIndex: 1 },
    { question: 'What is the grace period for time bills in India?', options: ['1 day', '3 days', '7 days', '0 days'], correctIndex: 1 },
    { question: 'Discounting a bill is recorded as:', options: ['Capital Profit', 'Finance / Interest Expense', 'Deferred Revenue', 'General Reserve'], correctIndex: 1 },
    { question: 'Noting charges are paid to whom?', options: ['High Court Judge', 'Notary Public', 'RBI Governor', 'Commercial Tax Officer'], correctIndex: 1 },
    { question: 'On insolvency of drawee, unrecovered dues are debited to:', options: ['Deficiency A/c', 'Bad Debts A/c', 'General Reserve A/c', 'Capital Reserve A/c'], correctIndex: 1 },
    { question: 'Purchase of machinery installation cost is:', options: ['Revenue Expenditure', 'Capital Expenditure', 'Deferred Revenue', 'Provision'], correctIndex: 1 },
    { question: 'Sale of old office furniture above book value produces:', options: ['Revenue Profit', 'Capital Profit', 'Operating Surplus', 'Deferred Receipt'], correctIndex: 1 },
    { question: 'Which item is a charge against profit?', options: ['General Reserve', 'Dividend Reserve', 'Provision for Tax', 'Capital Reserve'], correctIndex: 2 },
  ],
  masteryCriteria: 'Pass journal entries, compute maturities, calculate discounts/bad debts, and classify transactions with 80%+ accuracy.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Bill Parties & Flow',
    instruction: 'Click each party node to explore their legal rights, liabilities, and journal entries.',
    interactionType: 'click-parties',
    nodeId: NODE_C11_ACC_041,
  },
  {
    title: '2. Due Date & Grace Engine',
    instruction: 'Adjust the bill date, tenure, and holiday toggle to watch the legal maturity shift.',
    interactionType: 'slider-duedate',
    nodeId: NODE_C11_ACC_042,
  },
  {
    title: '3. Endorsement vs Discounting Lab',
    instruction: 'Drag the discount rate and tenure slider to compute bank discount and net proceeds in real-time.',
    interactionType: 'slider-discount',
    nodeId: NODE_C11_ACC_043,
  },
  {
    title: '4. Capital vs Revenue Classifier',
    instruction: 'Test your classification instincts on real-world Indian corporate expenditure scenarios.',
    interactionType: 'interactive-classifier',
    nodeId: NODE_C11_ACC_047,
  },
  {
    title: '5. Provisions vs Reserves Balance',
    instruction: 'Simulate company Net Profit and adjust charges vs appropriations to see the P&L impact.',
    interactionType: 'slider-reserves',
    nodeId: NODE_C11_ACC_050,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an 80-day bill matures on 15-August (Independence Day), what will be the legally enforceable payment date?',
    options: ['16-August (Next working day)', '15-August (Same day)', '14-August (Preceding working day)', '18-August (+3 days)'],
    correctIndex: 2,
    verifyInstruction: 'Toggle the Public Holiday button in the Due Date simulator to verify why the date advances to 14-Aug.',
    nodeId: NODE_C11_ACC_042,
  },
  {
    question: 'Predict: If Tata Steel earns ₹0 Profit this year, can it still create a Provision for Bad Debts of ₹100 Cr?',
    options: ['No, provisions can only come from surplus profit', 'Yes, provisions are mandatory charges that turn zero profit into a ₹100 Cr loss', 'Only with Central Government permission', 'It must convert it into a Capital Reserve'],
    correctIndex: 1,
    verifyInstruction: 'Use the Reserves simulator and set Profit to ₹0 to see the Provision charged directly to P&L.',
    nodeId: NODE_C11_ACC_050,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the Bank Discount expense as the unexpired tenure increases?',
    observableOptions: [
      'Discount expense increases proportionally with time (Linear relationship)',
      'Discount expense stays identical regardless of time',
      'Discount expense drops to zero',
      'Bank pays interest to the drawer instead',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_ACC_043,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Executive Financial Controller Practicum',
  description:
    'Select any major listed Indian enterprise (e.g. Reliance Industries, Tata Motors, L&T, or Infosys). Examine their Annual Report Note on "Financial Instruments & Provisions". Identify 2 trade bills or receivables discounted, 1 specific reserve (such as Debenture Redemption Reserve under Sec. 123), and 1 capital work-in-progress capitalisation.',
  steps: [
    'Download the latest audited Annual Report (PDF).',
    'Locate the "Statement of Profit and Loss" and "Balance Sheet Note on Non-Current Assets".',
    'Calculate the percentage of total expenditure classified as Capital vs Revenue.',
    'Verify how Provisions for Doubtful Debts are deducted from Trade Receivables.',
  ],
};

// ─── MAIN SIMULATION COMPONENT FUNCTION ───
function C11_AccountancyBasicTermsDrawerSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commstud'] || {
    name: 'Accountancy',
    emoji: '📑',
    color: 'emerald',
  };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant Exploration & Sandbox Interactive State
  const [selectedParty, setSelectedParty] = useState<'drawer' | 'drawee' | 'payee' | 'endorsee'>('drawer');
  const [billAmount, setBillAmount] = useState(100000);
  const [billTenureDays, setBillTenureDays] = useState(60);
  const [discountRate, setDiscountRate] = useState(12);
  const [isPublicHoliday, setIsPublicHoliday] = useState(false);
  const [isAfterSight, setIsAfterSight] = useState(false);
  const [acceptanceLagDays, setAcceptanceLagDays] = useState(10);
  const [companyProfit, setCompanyProfit] = useState(5000);
  const [provisionAmount, setProvisionAmount] = useState(800);
  const [reserveAppropriation, setReserveAppropriation] = useState(1500);
  const [classifierItemIndex, setClassifierItemIndex] = useState(0);
  const [classifiedResults, setClassifiedResults] = useState<Record<number, 'capital' | 'revenue' | 'deferred'>>({});

  // Predict & Observation State
  const [predIndex, setPredIndex] = useState(-1);
  const [predMade, setPredMade] = useState(false);
  const [obsIndex, setObsIndex] = useState(-1);
  const [obsMade, setObsMade] = useState(false);

  // Adaptive & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Challenge Response & Feedback State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Construct Interactive Challenge State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Platform Notification Feedback
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') {
      return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    }
    if (difficulty === 'standard') {
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    }
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C11_ACC_041);
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
    const newTier =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newTier) {
        setCurrentChallenge(0);
        return newTier;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS PIPELINE ANIMATION ───
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

      // Pipeline Background
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(20, 25);
      ctx.lineTo(canvas.width - 20, 25);
      ctx.stroke();

      // Flowing Pulse Nodes
      const stages = ['Draw', 'Accept', 'Discount/Endorse', 'Present/Collect', 'Honor/Insolvency'];
      const stageWidth = (canvas.width - 60) / (stages.length - 1);

      stages.forEach((stg, i) => {
        const x = 30 + i * stageWidth;
        const pulse = Math.sin(frame * 0.05 + i) * 3;

        ctx.fillStyle = i <= currentSlide ? '#10b981' : '#64748b';
        ctx.beginPath();
        ctx.arc(x, 25, 8 + (i === currentSlide ? pulse : 0), 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(stg, x, 45);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentSlide]);

  // ─── LIVE CALCULATIONS ───
  const calculatedDiscount = useMemo(() => {
    const timeInYears = billTenureDays / 365;
    return Math.round((billAmount * (discountRate / 100) * timeInYears));
  }, [billAmount, discountRate, billTenureDays]);

  const netProceeds = useMemo(() => {
    return billAmount - calculatedDiscount;
  }, [billAmount, calculatedDiscount]);

  const legalDueDateDisplay = useMemo(() => {
    const baseDays = billTenureDays + (isAfterSight ? acceptanceLagDays : 0);
    let totalDaysWithGrace = baseDays + 3;
    let holidayAdjusted = false;
    if (isPublicHoliday) {
      totalDaysWithGrace -= 1; // Preceding working day
      holidayAdjusted = true;
    }
    return {
      nominalDays: baseDays,
      graceDays: 3,
      finalDays: totalDaysWithGrace,
      holidayAdjusted,
    };
  }, [billTenureDays, isAfterSight, acceptanceLagDays, isPublicHoliday]);

  const pnlNetProfit = useMemo(() => {
    const afterCharges = Math.max(0, companyProfit - provisionAmount);
    const balanceCarriedForward = Math.max(0, afterCharges - reserveAppropriation);
    return {
      operating: companyProfit,
      afterCharges,
      balanceCarriedForward,
    };
  }, [companyProfit, provisionAmount, reserveAppropriation]);

  // Chart Data for P&L live dashboard
  const pnlChartData = useMemo(() => [
    { name: 'Operating Profit', amount: companyProfit, fill: '#3b82f6' },
    { name: 'Provision (Charge)', amount: provisionAmount, fill: '#ef4444' },
    { name: 'Net Profit After Tax', amount: pnlNetProfit.afterCharges, fill: '#10b981' },
    { name: 'Reserve (Approp)', amount: reserveAppropriation, fill: '#8b5cf6' },
    { name: 'Retained Surplus', amount: pnlNetProfit.balanceCarriedForward, fill: '#f59e0b' },
  ], [companyProfit, provisionAmount, pnlNetProfit, reserveAppropriation]);

  // ─── MOTIVATIONAL FEEDBACK STRING ───
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE! Flawless performance! You have complete mastery of the Negotiable Instruments Act 1881 and AS classification standards.';
    if (errors <= 3) return 'Great work! Commendable performance! You demonstrated sound accounting knowledge across complex insolvency and discounting scenarios.';
    if (errors <= 7) return 'Good effort! You showed strong capability. Review the misconception profile below to solidify your understanding.';
    return 'Do not give up — You WILL get this! Practice makes perfect in accountancy. Review each key concept and try again!';
  }, [errors]);

  // ─── HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        if (challenge?.hints?.[0]) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Here is an automated guiding hint to help you.');
        }
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, challenge]);

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
      speechManager.speak('Let us inspect the complete accounting rationale.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent understanding! 60 days + 3 days of grace leads to 05-March.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Touch and inspect every concept.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play unlocked. Test variables freely before taking on certification challenges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge Mode initiated. Apply your knowledge accurately.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Accountancy Bills & Classification Lab.');
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

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
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
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
        const updatedSrs = sm2Update(srsItem, 5, 3000);
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

        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
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
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handlePartySelect = useCallback((party: 'drawer' | 'drawee' | 'payee' | 'endorsee') => {
    setSelectedParty(party);
    audioManager.play('tap');
    const roleDescriptions: Record<string, string> = {
      drawer: 'Larsen & Toubro: The seller who draws the bill and receives an unconditional promise.',
      drawee: 'BHEL: The buyer who signs acceptance and assumes primary liability.',
      payee: 'ICICI Bank: The designated party entitled to receive the funds.',
      endorsee: 'Axis Bank: The new holder who received title through endorsement.',
    };
    speechManager.speak(roleDescriptions[party] || '');
  }, []);

  const handlePredictionSelect = useCallback((idx: number) => {
    setPredIndex(idx);
    setPredMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now manipulate the simulation to verify.');
  }, []);

  const handleObservationSelect = useCallback((idx: number) => {
    setObsIndex(idx);
    setObsMade(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Look closely at how the variables scale.');
  }, []);

  const handleClassifierChoice = useCallback((type: 'capital' | 'revenue' | 'deferred') => {
    setClassifiedResults((prev) => ({ ...prev, [classifierItemIndex]: type }));
    audioManager.play('tap');
  }, [classifierItemIndex]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((s) => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((s) => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Sample scenarios for classifier step
  const classifierExamples = useMemo(() => [
    { text: 'Tata Motors installs robotic assembly arms for ₹50,00,000 (increases capacity by 30%)', correct: 'capital', reason: 'Enhances capacity beyond 1 period (AS-10).' },
    { text: 'Asian Paints pays ₹40,000 for monthly factory electricity and power', correct: 'revenue', reason: 'Benefit consumed entirely within the current month.' },
    { text: 'Vodafone Idea spends ₹300 Cr on 5-year mega brand relaunch campaign', correct: 'deferred', reason: 'Revenue in nature, but matching principle spreads benefit across 5 years.' },
    { text: 'Infosys pays ₹15,000 to repaint cracked walls in the reception lobby', correct: 'revenue', reason: 'Routine maintenance restoring original condition.' },
  ], []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                ISC Class 11
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Commercial Studies & Accountancy Core Foundation</p>
          </div>
        </div>

        {/* Phase Navigator */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              aria-label={`Switch to ${p} mode`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {p.toUpperCase()}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Narrative Scenario Hero */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-gold-950/60 border border-emerald-800/40 shadow-xl">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-900/50 px-3 py-1 rounded-full border border-emerald-700/50">
              Audit Scenario
            </span>
            <h2 className="text-2xl font-black text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center gap-3 text-xs text-emerald-300">
              <span className="text-base">⚖️</span>
              <span>{SCENARIO.context}</span>
            </div>
          </div>

          {/* Interactive Discovery Hook Question */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-400 font-bold text-sm">💡 Curiosity Challenge:</span>
              <span className="text-xs text-slate-400">(Low stakes — predict before learning!)</span>
            </div>
            <p className="text-base font-semibold text-white leading-relaxed">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm font-medium border transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/60 border-emerald-500 text-emerald-100'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700/60 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>
                    <span>{opt}</span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                      <span className="ml-auto text-emerald-400 font-bold">✓</span>
                    )}
                    {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                      <span className="ml-auto text-rose-400 font-bold">✗</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-2xl">{discoveryCorrect ? '🎉' : '💡'}</span>
                  <p className={discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}>
                    {discoveryCorrect
                      ? '✓ Spot on! Section 22 grants 3 grace days to time bills.'
                      : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                </div>
                <motion.button
                  aria-label="Enter Interactive Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/40 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Animated 2D Canvas Flow Header */}
          <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
            <canvas ref={canvasRef} width={800} height={55} className="w-full" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-xs text-emerald-400 mt-1 font-medium">
                    👉 {EXPLORATION_STEPS[currentSlide].instruction}
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>

              {/* SLIDE 0: BILL PARTIES INTERACTIVE MAP (SVG DIAGRAM #1) */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 450 300" className="w-full max-h-[260px]" role="img" aria-label="Commercial Bill Tri-Party Relationship Diagram">
                      {/* Connection arrows */}
                      <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                        </marker>
                      </defs>
                      <line x1="120" y1="80" x2="330" y2="80" stroke="#64748b" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)" />
                      <line x1="100" y1="110" x2="200" y2="200" stroke="#64748b" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)" />
                      <line x1="330" y1="110" x2="240" y2="200" stroke="#64748b" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)" />

                      {/* Drawer Node */}
                      <g onClick={() => handlePartySelect('drawer')} className="cursor-pointer" role="button" tabIndex={0} aria-label="Select Drawer party">
                        <circle
                          cx="100"
                          cy="80"
                          r="38"
                          fill="#065f46"
                          stroke={selectedParty === 'drawer' ? '#10b981' : '#047857'}
                          strokeWidth={selectedParty === 'drawer' ? 4 : 2}
                        />
                        <text x="100" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">DRAWER</text>
                        <text x="100" y="90" textAnchor="middle" fill="#6ee7b7" fontSize="8">L&T (Seller)</text>
                      </g>

                      {/* Drawee Node */}
                      <g onClick={() => handlePartySelect('drawee')} className="cursor-pointer" role="button" tabIndex={0} aria-label="Select Drawee party">
                        <circle
                          cx="350"
                          cy="80"
                          r="38"
                          fill="#1e3a8a"
                          stroke={selectedParty === 'drawee' ? '#3b82f6' : '#1d4ed8'}
                          strokeWidth={selectedParty === 'drawee' ? 4 : 2}
                        />
                        <text x="350" y="75" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">DRAWEE</text>
                        <text x="350" y="90" textAnchor="middle" fill="#93c5fd" fontSize="8">BHEL (Buyer)</text>
                      </g>

                      {/* Payee Node */}
                      <g onClick={() => handlePartySelect('payee')} className="cursor-pointer" role="button" tabIndex={0} aria-label="Select Payee party">
                        <circle
                          cx="225"
                          cy="220"
                          r="38"
                          fill="#581c87"
                          stroke={selectedParty === 'payee' ? '#a855f7' : '#7e22ce'}
                          strokeWidth={selectedParty === 'payee' ? 4 : 2}
                        />
                        <text x="225" y="215" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">PAYEE</text>
                        <text x="225" y="230" textAnchor="middle" fill="#d8b4fe" fontSize="8">ICICI Bank</text>
                      </g>
                    </svg>
                  </div>

                  {/* Party Detail Inspector */}
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          Active Legal Entity
                        </span>
                        <span className="text-xs text-slate-400">Section 7 & 50 NI Act 1881</span>
                      </div>
                      <h4 className="text-lg font-bold text-white mt-1 capitalize">{selectedParty}</h4>
                      <p className="text-sm text-slate-300 mt-2">
                        {selectedParty === 'drawer' &&
                          'The Drawer (Larsen & Toubro) creates the bill of exchange. They hold a Bills Receivable asset and retain secondary contingent liability if the bill is later dishonoured.'}
                        {selectedParty === 'drawee' &&
                          'The Drawee (BHEL) becomes the ACCEPTOR upon signing. They are primarily liable to pay the full sum on the legal due date.'}
                        {selectedParty === 'payee' &&
                          'The Payee (ICICI Bank) is the named beneficiary entitled to receive payment. The Drawer and Payee can legally be the exact same party.'}
                        {selectedParty === 'endorsee' &&
                          'The Endorsee receives title to the bill when the previous holder signs the back (endorsement in full or blank).'}
                      </p>

                      <div className="mt-3 p-3 bg-slate-900 rounded-lg text-xs font-mono text-emerald-300 border border-slate-800">
                        {selectedParty === 'drawer' && 'Dr. Bills Receivable A/c | Cr. Drawee A/c (On acceptance)'}
                        {selectedParty === 'drawee' && 'Dr. Drawer A/c | Cr. Bills Payable A/c (On accepting bill)'}
                        {selectedParty === 'payee' && 'Dr. Cash/Bank A/c | Cr. Bills Receivable A/c (On maturity collection)'}
                        {selectedParty === 'endorsee' && 'Dr. Bills Receivable A/c | Cr. Endorser A/c (On receiving bill)'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: DUE DATE & GRACE DAYS SIMULATOR (SVG DIAGRAM #2) */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* Predict then Check Hook */}
                  {!predMade ? (
                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/40">
                      <p className="text-sm font-semibold text-gold-200 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Select prediction: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePredictionSelect(i)}
                            className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-left text-slate-300 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
                      <span>✓ Prediction logged! Now test the holiday toggle below to confirm.</span>
                    </div>
                  )}

                  {/* SVG DIAGRAM #2: Legal Maturity Timeline */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Maturity Timeline Engine</span>
                    <svg viewBox="0 0 500 120" className="w-full max-h-[140px]" role="img" aria-label="Legal Maturity Date Timeline Diagram">
                      <line x1="40" y1="60" x2="460" y2="60" stroke="#334155" strokeWidth="4" />
                      {/* Bill Date */}
                      <circle cx="60" cy="60" r="10" fill="#3b82f6" />
                      <text x="60" y="35" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">01-Jan</text>
                      <text x="60" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">Bill Date</text>

                      {/* Nominal Term */}
                      <line x1="60" y1="60" x2="300" y2="60" stroke="#3b82f6" strokeWidth="4" />
                      <circle cx="300" cy="60" r="10" fill="#6366f1" />
                      <text x="300" y="35" textAnchor="middle" fill="#a5b4fc" fontSize="10" fontWeight="bold">Nominal Due</text>
                      <text x="300" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">+{billTenureDays} Days</text>

                      {/* +3 Grace Days */}
                      <line x1="300" y1="60" x2="400" y2="60" stroke="#10b981" strokeWidth="4" />
                      <circle cx="400" cy="60" r="12" fill={isPublicHoliday ? '#f59e0b' : '#10b981'} />
                      <text x="400" y="35" textAnchor="middle" fill={isPublicHoliday ? '#fcd34d' : '#6ee7b7'} fontSize="10" fontWeight="bold">
                        {isPublicHoliday ? 'Holiday!' : 'Legal Due'}
                      </text>
                      <text x="400" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">+3 Grace Days</text>

                      {/* Public holiday shift arrow if toggled */}
                      {isPublicHoliday && (
                        <g>
                          <path d="M 395 50 Q 365 20 345 48" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3" />
                          <circle cx="340" cy="60" r="12" fill="#ef4444" />
                          <text x="340" y="95" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">Final Legal Due (-1d)</text>
                        </g>
                      )}
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                          <span>Tenure (Days): {billTenureDays} days</span>
                        </div>
                        <input
                          type="range"
                          min={30}
                          max={120}
                          step={10}
                          value={billTenureDays}
                          aria-label="Bill tenure in days"
                          onChange={(e) => setBillTenureDays(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                          <input
                            type="checkbox"
                            checked={isAfterSight}
                            aria-label="Bill after sight checkbox"
                            onChange={(e) => setIsAfterSight(e.target.checked)}
                            className="accent-emerald-500 rounded"
                          />
                          <span>Bill After Sight (Clock starts at acceptance)</span>
                        </label>
                      </div>

                      {isAfterSight && (
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Acceptance Delay: {acceptanceLagDays} days</span>
                          </div>
                          <input
                            type="range"
                            min={1}
                            max={30}
                            value={acceptanceLagDays}
                            aria-label="Acceptance delay in days"
                            onChange={(e) => setAcceptanceLagDays(Number(e.target.value))}
                            className="w-full accent-gold-500"
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs">
                        <label className="flex items-center gap-2 cursor-pointer text-amber-300">
                          <input
                            type="checkbox"
                            checked={isPublicHoliday}
                            aria-label="Maturity is public holiday checkbox"
                            onChange={(e) => setIsPublicHoliday(e.target.checked)}
                            className="accent-amber-500 rounded"
                          />
                          <span>Maturity Date is a Declared Public Holiday (e.g. 15-Aug / 26-Jan)</span>
                        </label>
                      </div>
                    </div>

                    {/* Calculated Maturity Output */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-center space-y-3">
                      <span className="text-xs font-bold uppercase text-emerald-400">Legal Due Date Breakdown</span>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Nominal Credit Days:</span>
                          <span className="font-mono font-bold">{legalDueDateDisplay.nominalDays} days</span>
                        </div>
                        <div className="flex justify-between text-emerald-400">
                          <span>Mandatory Grace Days (Sec. 22):</span>
                          <span className="font-mono font-bold">+ {legalDueDateDisplay.graceDays} days</span>
                        </div>
                        {legalDueDateDisplay.holidayAdjusted && (
                          <div className="flex justify-between text-amber-400">
                            <span>Public Holiday Adjustment:</span>
                            <span className="font-mono font-bold">- 1 day (Preceding working day)</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-slate-700 flex justify-between text-sm font-bold text-white">
                          <span>Total Days to Legally Pay:</span>
                          <span className="font-mono text-emerald-400">{legalDueDateDisplay.finalDays} days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: DISCOUNTING VS ENDORSEMENT LAB (SVG DIAGRAM #3) */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {/* SVG DIAGRAM #3: Bill Discounting Waterfall */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Bill Discounting Realization Architecture</span>
                    <svg viewBox="0 0 500 130" className="w-full max-h-[140px]" role="img" aria-label="Bill Discounting Waterfall Diagram">
                      {/* Face value bar */}
                      <rect x="30" y="25" width="440" height="28" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                      <text x="250" y="43" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                        Face Value: ₹{billAmount.toLocaleString('en-IN')}
                      </text>

                      {/* Cash Proceeds portion */}
                      <rect
                        x="30"
                        y="65"
                        width={Math.max(100, Math.min(440, (netProceeds / billAmount) * 440))}
                        height="32"
                        rx="6"
                        fill="#065f46"
                        stroke="#10b981"
                        strokeWidth="1.5"
                      />
                      <text x="120" y="85" fill="#a7f3d0" fontSize="10" fontWeight="bold">
                        Net Cash: ₹{netProceeds.toLocaleString('en-IN')}
                      </text>

                      {/* Discount portion */}
                      <rect
                        x={30 + Math.max(100, Math.min(440, (netProceeds / billAmount) * 440))}
                        y="65"
                        width={Math.max(40, 440 - Math.max(100, Math.min(440, (netProceeds / billAmount) * 440)))}
                        height="32"
                        rx="6"
                        fill="#881337"
                        stroke="#f43f5e"
                        strokeWidth="1.5"
                      />
                      <text
                        x={Math.min(440, 30 + Math.max(100, Math.min(440, (netProceeds / billAmount) * 440)) + 15)}
                        y="85"
                        fill="#fecdd3"
                        fontSize="9"
                        fontWeight="bold"
                      >
                        Fee: ₹{calculatedDiscount.toLocaleString('en-IN')}
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Bill Face Value: ₹{billAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <input
                          type="range"
                          min={50000}
                          max={500000}
                          step={25000}
                          value={billAmount}
                          aria-label="Bill Face Value"
                          onChange={(e) => setBillAmount(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Bank Discount Rate: {discountRate}% p.a.</span>
                        </div>
                        <input
                          type="range"
                          min={6}
                          max={18}
                          step={1}
                          value={discountRate}
                          aria-label="Bank Discount Rate"
                          onChange={(e) => setDiscountRate(Number(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Unexpired Tenure: {billTenureDays} days</span>
                        </div>
                        <input
                          type="range"
                          min={30}
                          max={120}
                          step={10}
                          value={billTenureDays}
                          aria-label="Unexpired tenure in days"
                          onChange={(e) => setBillTenureDays(Number(e.target.value))}
                          className="w-full accent-purple-500"
                        />
                      </div>
                    </div>

                    {/* Live Financial Outcome */}
                    <div className="space-y-3 p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-center">
                      <span className="text-xs font-bold uppercase text-gold-400">Discounting Journal Rationale</span>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between text-emerald-300">
                          <span>Dr. Bank A/c (Net Proceeds):</span>
                          <span>₹{netProceeds.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between text-rose-400">
                          <span>Dr. Discount A/c (Finance Cost):</span>
                          <span>₹{calculatedDiscount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded border border-slate-800 flex justify-between text-slate-300">
                          <span>Cr. Bills Receivable A/c:</span>
                          <span>₹{billAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2">
                        Formula: Discount = Face Value × Rate × Days / (100 × 365)
                      </p>
                    </div>
                  </div>

                  {/* Scientific Observation Check */}
                  {!obsMade ? (
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-white mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Select observation: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservationSelect(i)}
                            className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-left text-slate-300 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-xs text-emerald-300">
                      ✓ Correct Observation! Discount expense scales directly with tenure days.
                    </div>
                  )}
                </div>
              )}

              {/* SLIDE 3: CAPITAL VS REVENUE CLASSIFIER */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-emerald-400 uppercase">Case {classifierItemIndex + 1} of 4</span>
                      <div className="flex gap-1">
                        {[0, 1, 2, 3].map((idx) => (
                          <button
                            key={idx}
                            aria-label={`Go to case ${idx + 1}`}
                            onClick={() => setClassifierItemIndex(idx)}
                            className={`w-6 h-6 rounded-full text-xs font-bold ${
                              classifierItemIndex === idx
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-base font-semibold text-white">
                      {classifierExamples[classifierItemIndex].text}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      {(['capital', 'revenue', 'deferred'] as const).map((type) => (
                        <motion.button
                          key={type}
                          aria-label={`Classify as ${type} outflow`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleClassifierChoice(type)}
                          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all ${
                            classifiedResults[classifierItemIndex] === type
                              ? type === classifierExamples[classifierItemIndex].correct
                                ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200'
                                : 'bg-rose-900/70 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {type} Outflow {classifiedResults[classifierItemIndex] === type && (type === classifierExamples[classifierItemIndex].correct ? '✓' : '✗')}
                        </motion.button>
                      ))}
                    </div>

                    {classifiedResults[classifierItemIndex] && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 border border-slate-800"
                      >
                        <span className="font-bold text-emerald-400">Rule: </span>
                        {classifierExamples[classifierItemIndex].reason}
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 4: PROVISIONS VS RESERVES BALANCER */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Operating Profit: ₹{companyProfit} Cr</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={10000}
                          step={500}
                          value={companyProfit}
                          aria-label="Operating Profit in Crore"
                          onChange={(e) => setCompanyProfit(Number(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-rose-400 mb-1">
                          <span>Provision for Doubtful Debts / Tax (CHARGE): ₹{provisionAmount} Cr</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={2000}
                          step={100}
                          value={provisionAmount}
                          aria-label="Provision amount in Crore"
                          onChange={(e) => setProvisionAmount(Number(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-purple-400 mb-1">
                          <span>Transfer to General Reserve (APPROPRIATION): ₹{reserveAppropriation} Cr</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={3000}
                          step={100}
                          value={reserveAppropriation}
                          aria-label="Reserve appropriation in Crore"
                          onChange={(e) => setReserveAppropriation(Number(e.target.value))}
                          className="w-full accent-purple-500"
                        />
                      </div>
                    </div>

                    {/* Live Recharts Visualisation */}
                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={pnlChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} interval={0} angle={-15} textAnchor="end" />
                          <YAxis stroke="#94a3b8" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                          <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                            {pnlChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Previous Exploration Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-mono text-slate-500">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Exploration Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-900/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter Sandbox Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-green-900/30"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-white">Full Free-Play Simulation Workbench</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manipulate all variables without grading pressure. Verify calculations before taking challenges.
                </p>
              </div>
              <motion.button
                aria-label="Ready for Challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/40"
              >
                Ready for Challenges! →
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-emerald-400">1. Bill Parameters</span>
              <div>
                <label className="text-[11px] text-slate-400">Face Value: ₹{billAmount.toLocaleString()}</label>
                <input
                  type="range"
                  min={10000}
                  max={1000000}
                  step={10000}
                  value={billAmount}
                  aria-label="Sandbox Face Value"
                  onChange={(e) => setBillAmount(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400">Tenure: {billTenureDays} days</label>
                <input
                  type="range"
                  min={15}
                  max={180}
                  step={5}
                  value={billTenureDays}
                  aria-label="Sandbox Tenure in days"
                  onChange={(e) => setBillTenureDays(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-gold-400">2. Discount & Holiday</span>
              <div>
                <label className="text-[11px] text-slate-400">Bank Discount: {discountRate}% p.a.</label>
                <input
                  type="range"
                  min={5}
                  max={24}
                  step={1}
                  value={discountRate}
                  aria-label="Sandbox Bank Discount Rate"
                  onChange={(e) => setDiscountRate(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>
              <label className="flex items-center gap-2 text-xs text-amber-300 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublicHoliday}
                  aria-label="Sandbox Public Holiday Toggle"
                  onChange={(e) => setIsPublicHoliday(e.target.checked)}
                  className="accent-amber-500 rounded"
                />
                <span>Simulate Public Holiday on Due Date</span>
              </label>
            </div>

            <div className="space-y-3 p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono">
              <span className="text-xs font-bold uppercase text-purple-400 font-sans">Real-Time Ledger Output</span>
              <div className="flex justify-between text-slate-300">
                <span>Legal Due Days:</span>
                <span className="text-emerald-400 font-bold">{legalDueDateDisplay.finalDays} days</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Discount Fee:</span>
                <span>₹{calculatedDiscount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-300">
                <span>Net Cash In:</span>
                <span>₹{netProceeds.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE MODE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Adaptivity Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <h2 className="text-base md:text-lg font-bold text-white mt-0.5">
                {challenge.competencyLevel.toUpperCase()} Competency
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-3 py-1 rounded-full font-black uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : difficulty === 'standard'
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                    : 'bg-rose-500/20 text-red-400 border border-rose-500/40'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="text-xs font-mono text-slate-400">
                Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
              </span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-gold-500 to-purple-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* QUESTION CARD */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-semibold text-white leading-relaxed mb-6">
              {challenge.question}
            </p>

            {/* MCQ TYPE (classify / distinguish / match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`p-4 rounded-xl text-left text-sm font-medium border transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-100'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/60 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>
                        <span>{opt}</span>
                        {showExplanation && i === challenge.correctIndex && (
                          <span className="ml-auto text-emerald-400 font-bold">✓</span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag labels from palette:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-700/80 hover:bg-gold-600 rounded-lg cursor-grab text-white text-xs font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {challenge.dragItems.map((item) => (
                    <div
                      key={item.targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] transition-all ${
                        droppedLabels[item.targetId]
                          ? 'bg-emerald-950/40 border-emerald-500/60'
                          : 'bg-slate-950/60 border-slate-700'
                      }`}
                    >
                      <span className="text-[11px] text-slate-400 uppercase font-mono mb-1">Drop Target: {item.targetId}</span>
                      <span className="text-sm font-bold text-emerald-300">
                        {droppedLabels[item.targetId] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Mappings"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Sortable step ${displayIdx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Process Order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg"
                >
                  Verify Process Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label="Calculated answer input"
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Check Calculation"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg disabled:opacity-40"
                  >
                    Check Calculation
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
                      aria-label={`Add part: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3.5 py-2 bg-gold-700/70 hover:bg-gold-600 rounded-lg text-xs font-bold text-white shadow"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[80px] p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1.5 bg-emerald-800 rounded-lg text-xs text-white flex items-center gap-2 font-mono"
                    >
                      <span>{part}</span>
                      <button
                        aria-label={`Remove part: ${part}`}
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-red-300 font-bold hover:text-white"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click parts above to assemble journal entry...</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify Constructed Entry"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg disabled:opacity-40"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-emerald-950/40 via-slate-950 to-gold-950/40 border border-emerald-700/50 rounded-2xl space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">📑</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Step-by-Step Accounting Rationale
                  </span>
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
                        className="text-xs text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-emerald-400">{i + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Show Next Rationale Step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-lg text-xs font-bold border border-slate-700"
                    >
                      Show Next Rationale Step →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Next Challenge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-900/40 ml-auto"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Certification →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD REPORT ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-gold-950/60 border border-emerald-700/60 text-center space-y-4">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Simulation Completed!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have successfully completed the rigorous ISC Class 11 Accountancy simulation on Bills of Exchange, Capital vs Revenue, and Reserves.
            </p>

            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[140px]">
                <span className="text-xs text-slate-400 uppercase font-bold">Accuracy Score</span>
                <p className="text-2xl font-black text-emerald-400 mt-1">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[140px]">
                <span className="text-xs text-slate-400 uppercase font-bold">BKT Mastery Level</span>
                <p className="text-2xl font-black text-gold-400 mt-1 capitalize">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK BOX */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm text-slate-200 leading-relaxed">
            <span className="font-bold text-emerald-400 block mb-1">Feedback:</span>
            <p>{motivationalMessage}</p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile:</h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">✗ {m.misconception}</p>
                      <p className="text-emerald-400">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VISIBLE SPACED REPETITION SCHEDULE (SM-2 SYSTEM) */}
          <div className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border border-amber-700/50 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-sm">📅</span>
                <span className="font-bold text-amber-300 uppercase tracking-wider">Spaced Repetition Schedule (SM-2):</span>
              </div>
              <p className="text-slate-300">
                Optimized memory consolidation schedule calculated for this topic based on your error count ({errors} error{errors === 1 ? '' : 's'}).
              </p>
            </div>
            <div className="flex items-center gap-2 bg-amber-950/70 border border-amber-600/50 px-4 py-2.5 rounded-xl whitespace-nowrap self-start md:self-auto">
              <span className="text-xs text-amber-200">Recommended Next Review:</span>
              <span className="text-sm font-black text-amber-400">
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </span>
            </div>
          </div>

          {/* Real World Activity Practicum */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🏢</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-lg text-xs text-slate-400 flex items-center gap-2">
                  <span className="font-bold text-emerald-400">{i + 1}.</span>
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
      {showSuccess && <SuccessBanner message="Lab Certification Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_AccountancyBasicTermsDrawerSim;
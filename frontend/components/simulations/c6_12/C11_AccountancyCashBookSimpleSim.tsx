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
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C11_ACC_021 = 'c11_acc_021';
const NODE_C11_ACC_022 = 'c11_acc_022';
const NODE_C11_ACC_023 = 'c11_acc_023';
const NODE_C11_ACC_024 = 'c11_acc_024';
const NODE_C11_ACC_025 = 'c11_acc_025';
const NODE_C11_ACC_026 = 'c11_acc_026';
const NODE_C11_ACC_027 = 'c11_acc_027';
const NODE_C11_ACC_028 = 'c11_acc_028';
const NODE_C11_ACC_029 = 'c11_acc_029';
const NODE_C11_ACC_030 = 'c11_acc_030';

const ALL_NODE_IDS = [
  NODE_C11_ACC_021,
  NODE_C11_ACC_022,
  NODE_C11_ACC_023,
  NODE_C11_ACC_024,
  NODE_C11_ACC_025,
  NODE_C11_ACC_026,
  NODE_C11_ACC_027,
  NODE_C11_ACC_028,
  NODE_C11_ACC_029,
  NODE_C11_ACC_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Audit & Financial Balancing at Lucknow Trading Co.',
  intro:
    'You are appointed Chief Accountant at Lucknow Trading Co., an expanding FMCG distributor in Uttar Pradesh. Month-end closing is here, and you must master Single Column & Triple Column Cash Books, manage the Imprest Petty Cash float, route invoices to Subsidiary Books, tally the Trial Balance, and reconcile discrepancies with the State Bank of India (SBI) Pass Book.',
  context:
    'Every rupee in cash, cheque clearing lag, supplier credit return, and bank charge must be accounted for under Indian accounting standards (Companies Act 2013 & CGST Rules).',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'On 31st March, your Cash Book shows ₹2,50,000 in the bank, but SBI Pass Book shows ₹2,85,000. Why is there a ₹35,000 gap even if no accounting error occurred?',
  options: [
    'SBI made an unauthorized deposit into your account',
    'A cheque issued to a supplier was recorded in Cash Book, but the supplier has not presented it to SBI yet',
    'Cheques received from customers were stolen by the bank cashier',
    'Cash book can never show a lower balance than pass book without error',
  ],
  correctIndex: 1,
  hintAfter:
    'Timing lags like unpresented cheques and uncleared deposits create differences between your records and the bank statement. Let us investigate!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7 Challenges) ---
  {
    id: 'ch_f01_single_cash',
    nodeId: NODE_C11_ACC_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is a Simple (Single Column) Cash Book termed a "journal-cum-ledger"?',
    options: [
      'It acts as both the book of primary entry (journal) and the Cash Ledger Account simultaneously',
      'It records both cash and credit transactions',
      'It requires a separate Cash Account in the ledger for cross-checking',
      'It is maintained exclusively by commercial banks',
    ],
    correctIndex: 0,
    explanation:
      'The simple cash book serves simultaneously as the book of original entry and as the ledger account for Cash. No separate Cash A/c is opened in the general ledger.',
    hints: [
      'Think about whether transactions in a cash book get re-posted to a Cash A/c in the ledger.',
      'It performs two functions at once: original recording and balance tracking.',
      'Since it records initial transactions directly and maintains the cash balance, it is a journal-cum-ledger.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_f02_cash_balance_rule',
    nodeId: NODE_C11_ACC_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Can a Simple Single-Column Cash Book ever have a Credit (negative) closing balance?',
    options: [
      'Yes, when the business gets a bank overdraft',
      'No, because you cannot physically pay out more physical currency notes than you possess',
      'Yes, if suppliers demand urgent credit settlement',
      'Yes, at the end of the financial year during adjustment',
    ],
    correctIndex: 1,
    explanation:
      'A physical cash drawer cannot contain negative money. Total cash payments can never exceed opening cash plus cash receipts. Overdrafts only occur in Bank accounts.',
    hints: [
      'Consider physical cash in a cash drawer or safe.',
      'Can you take ₹100 out of a box that only has ₹80?',
      'Physical cash balance must always be ≥ 0 (Debit balance or Nil).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f03_contra_identification',
    nodeId: NODE_C11_ACC_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a Triple Column Cash Book, which transaction represents a "Contra Entry" marked with "C"?',
    options: [
      'Goods sold for cash ₹25,000',
      'Cash ₹10,000 deposited into State Bank of India current account',
      'Cheque of ₹15,000 issued directly to a creditor for raw materials',
      'Discount received of ₹500 from a supplier',
    ],
    correctIndex: 1,
    explanation:
      'A contra entry involves internal movement between Cash and Bank of the same entity (e.g., depositing cash into bank or withdrawing cash for office use). It affects both debit and credit of the cash book.',
    hints: [
      'Look for transactions where money moves only inside the business between safe and bank.',
      'One asset column goes up while another asset column goes down.',
      'Depositing cash into the bank increases Bank (Dr) and decreases Cash (Cr) internally.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f04_petty_cash_purpose',
    nodeId: NODE_C11_ACC_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary role of an Analytical Petty Cash Book under the Imprest System?',
    options: [
      'To record high-value asset purchases',
      'To relieve the head cashier from recording numerous small recurring payments like tea, postage, and auto fares',
      'To record bank loans and interest debits',
      'To calculate GST tax liability for monthly filing',
    ],
    correctIndex: 1,
    explanation:
      'The petty cash book isolates small, repetitive expenses into classified columns, maintaining a fixed float that is topped up periodically.',
    hints: [
      'The word "petty" comes from French "petit" meaning small.',
      'Think of daily stationery, conveyance, and postage stamps.',
      'It frees up the main cashier by delegating small expenses under a fixed float.',
    ],
  },
  {
    id: 'ch_f05_sales_day_book_rule',
    nodeId: NODE_C11_ACC_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following transactions is strictly recorded in the Sales Day Book?',
    options: [
      'Sold goods for cash ₹15,000',
      'Sold goods to Tata Motors on 30 days credit ₹80,000',
      'Sold old office furniture on credit ₹5,000',
      'Received ₹50,000 from debtor Ramesh by cheque',
    ],
    correctIndex: 1,
    explanation:
      'The Sales Day Book records ONLY CREDIT sales of merchandise (goods meant for trade). Cash sales go to the Cash Book; sale of fixed assets on credit goes to Journal Proper.',
    hints: [
      'Two criteria must be met: it must be on CREDIT, and it must be GOODS for resale.',
      'Cash sales belong to the Cash Book.',
      'Only credit sales of regular trade inventory belong in the Sales Day Book.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_f06_trial_balance_nature',
    nodeId: NODE_C11_ACC_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A Trial Balance is best described as:',
    options: [
      'A permanent ledger account in the books of account',
      'A statement prepared on a specific date to test the arithmetical accuracy of ledger postings',
      'A legal financial statement filed with the Registrar of Companies',
      'A subsidiary book recording credit purchases',
    ],
    correctIndex: 1,
    explanation:
      'A Trial Balance is a statement (not an account) listing debit and credit balances extracted from the ledger on a given date to verify arithmetical equality.',
    hints: [
      'Is it an account with a Dr/Cr header or a standalone statement listing balances?',
      'It acts as a checkpoint before final accounts.',
      'It is an arithmetical verification statement.',
    ],
  },
  {
    id: 'ch_f07_brs_meaning',
    nodeId: NODE_C11_ACC_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who prepares the Bank Reconciliation Statement (BRS) and why?',
    options: [
      'The Bank, to verify the depositor’s business turnover',
      'The Firm/Accountant, to explain the causes of difference between Cash Book bank balance and Pass Book balance',
      'The Income Tax Department during an annual assessment',
      'The Auditor, to calculate sales tax payable',
    ],
    correctIndex: 1,
    explanation:
      'The BRS is prepared periodically by the account holder (firm) to reconcile the bank balance in its Cash Book with the balance shown in the bank’s Pass Book.',
    hints: [
      'Who maintains the cash book and needs to check their records with the bank statement?',
      'It is an internal control statement prepared by the firm.',
      'The business accountant prepares it to reconcile timing gaps and omissions.',
    ],
  },

  // --- STANDARD (8 Challenges) ---
  {
    id: 'ch_s01_drag_subsidiary_routing',
    nodeId: NODE_C11_ACC_025,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Drag each transaction to its correct Subsidiary Book of original entry.',
    dragItems: [
      { label: 'Credit purchase of inventory goods', targetId: 'box_pdb' },
      { label: 'Credit purchase of office computer', targetId: 'box_jp' },
      { label: 'Credit customer returns damaged goods', targetId: 'box_srdb' },
      { label: 'Firm returns defective stock to supplier', targetId: 'box_prdb' },
    ],
    correctMapping: {
      box_pdb: 'Credit purchase of inventory goods',
      box_jp: 'Credit purchase of office computer',
      box_srdb: 'Credit customer returns damaged goods',
      box_prdb: 'Firm returns defective stock to supplier',
    },
    explanation:
      'Purchases Day Book = credit goods only; Journal Proper = credit fixed assets & adjustments; Sales Return = returns inward with credit note; Purchases Return = returns outward with debit note.',
    hints: [
      'Computers are fixed assets (not goods for resale), so they go to Journal Proper.',
      'Inventory purchases on credit go to Purchases Day Book.',
      'Returns from customers go to Sales Return Day Book; returns to suppliers go to Purchases Return Day Book.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_s02_imprest_calc',
    nodeId: NODE_C11_ACC_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Lucknow Trading Co. maintains a petty cash float of ₹6,000 under the Imprest System. During the month, petty expenses were: Postage ₹850, Conveyance ₹1,400, Tea & Snacks ₹650, Stationery ₹1,100. How much cash reimbursement (₹) should the main cashier pay on the 1st of the next month to restore the float?',
    correctAnswer: 4000,
    tolerance: 0,
    unit: '₹',
    explanation:
      'Total spent = ₹850 + ₹1,400 + ₹650 + ₹1,100 = ₹4,000. Under the imprest system, Reimbursement = Total spent during period = Float (₹6,000) − Closing Cash (₹2,000) = ₹4,000.',
    hints: [
      'Sum all the petty expenses paid during the month.',
      'Reimbursement equals the exact amount spent to restore the float to ₹6,000.',
      '850 + 1400 + 650 + 1100 = 4,000.',
    ],
  },
  {
    id: 'ch_s03_trial_balance_sorting',
    nodeId: NODE_C11_ACC_026,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Arrange these steps in the correct chronological order for preparing a Trial Balance using the Balance Method:',
    sortItems: [
      'Balance all Ledger accounts by calculating debit and credit differences (c/d)',
      'List all accounts with debit balances in the Dr column and credit balances in the Cr column',
      'Sum both columns independently and verify that Total Debits equal Total Credits',
      'Investigate discrepancies or transfer unresolved differences to a Suspense Account',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      '1) Balance ledger accounts; 2) Extract and list balances in Dr/Cr columns; 3) Total both sides to verify equality; 4) Investigate any mismatch or place in Suspense.',
    hints: [
      'You cannot write a trial balance without first closing and balancing the ledger accounts.',
      'Listing balances comes before totaling the columns.',
      'Investigating differences is the final step if totals do not agree.',
    ],
  },
  {
    id: 'ch_s04_brs_cheque_issued_effect',
    nodeId: NODE_C11_ACC_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'On 28th March, you issue a cheque of ₹50,000 to supplier Tata Chemicals. The supplier presents it to SBI on 4th April. As on 31st March, how does this affect Cash Book vs Pass Book?',
    options: [
      'Pass Book shows ₹50,000 HIGHER balance than Cash Book',
      'Cash Book shows ₹50,000 HIGHER balance than Pass Book',
      'Both books show identical balances because the cheque was dated 28th March',
      'Pass Book shows an overdraft of ₹50,000 immediately',
    ],
    correctIndex: 0,
    explanation:
      'When issuing a cheque, you credited (deducted) ₹50,000 in your Cash Book on 28th March. But the bank had not paid it out by 31st March, so the Pass Book balance remains higher by ₹50,000.',
    hints: [
      'Which book deducted the money on 28th March?',
      'Has the bank deducted the ₹50,000 by 31st March?',
      'The bank has not deducted it yet, so Pass Book > Cash Book.',
    ],
  },
  {
    id: 'ch_s05_brs_favourable_calc',
    nodeId: NODE_C11_ACC_029,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Starting Cash Book balance (Dr. Favourable) is ₹1,00,000. Reconciling items: (1) Cheques issued but not presented: ₹30,000; (2) Cheques deposited but not collected by bank: ₹20,000; (3) Bank charges debited by SBI only: ₹1,500; (4) Interest credited by SBI only: ₹2,500. What is the Balance as per Pass Book (₹)?',
    correctAnswer: 111000,
    tolerance: 0,
    unit: '₹',
    explanation:
      'Pass Book Balance = Cash Book (₹1,00,000) + Cheques unpresented (+₹30,000) + Interest credited (+₹2,500) − Cheques uncollected (−₹20,000) − Bank charges (−₹1,500) = ₹1,11,000.',
    hints: [
      'Add items that make Pass Book higher: Unpresented cheques (+30k) and Interest (+2.5k).',
      'Subtract items that make Pass Book lower: Uncollected cheques (-20k) and Bank charges (-1.5k).',
      '1,00,000 + 30,000 + 2,500 - 20,000 - 1,500 = 1,11,000.',
    ],
  },
  {
    id: 'ch_s06_debit_credit_notes',
    nodeId: NODE_C11_ACC_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'When our firm returns defective goods to supplier Reliance Retail, which commercial document do we issue to Reliance, and in which book is it entered?',
    options: [
      'Credit Note, entered in Sales Return Book',
      'Debit Note, entered in Purchases Return Book',
      'Debit Note, entered in Sales Day Book',
      'Credit Note, entered in Purchases Day Book',
    ],
    correctIndex: 1,
    explanation:
      'When returning goods to a supplier, the buyer issues a Debit Note (informing the supplier that their payable account is debited/reduced) and records it in the Purchases Return (Returns Outward) Book.',
    hints: [
      'We are the BUYER returning goods to a SUPPLIER.',
      'We want to reduce our liability (debit the supplier account).',
      'Buyer issues Debit Note for Purchases Returns; Seller issues Credit Note for Sales Returns.',
    ],
  },
  {
    id: 'ch_s07_discount_treatment',
    nodeId: NODE_C11_ACC_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'How are the "Discount Allowed" and "Discount Received" columns handled when balancing a Triple Column Cash Book at month-end?',
    options: [
      'They are balanced with "By Balance c/d" just like Cash and Bank columns',
      'They are NOT balanced; their column totals are simply transferred as debits to Discount Allowed A/c and credits to Discount Received A/c in the ledger',
      'They are netted against each other, and only the net difference is posted',
      'They are eliminated and transferred to the Petty Cash Book',
    ],
    correctIndex: 1,
    explanation:
      'Discount accounts are nominal accounts (expenses/gains), not asset stores. Their column totals are posted directly to the general ledger and closed to P&L at year-end; they do not have carried-forward balances.',
    hints: [
      'Is discount an asset that you physically keep in your vault?',
      'Discount is a nominal account representing an expense or income.',
      'The totals are posted to separate ledger accounts without carrying down a balance.',
    ],
  },
  {
    id: 'ch_s08_columnar_purchases_check',
    nodeId: NODE_C11_ACC_024,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'In a Columnar Purchases Day Book, Net Invoice = Goods + Carriage Inward. If total Goods value purchased is ₹3,40,000 and total Carriage Inward charged on invoices is ₹12,500, what is the total Net Invoice amount (₹) posted to Sundry Creditors?',
    correctAnswer: 352500,
    tolerance: 0,
    unit: '₹',
    explanation:
      'Net Invoice Total = Goods (₹3,40,000) + Carriage Inward (₹12,500) = ₹3,52,500. Individual creditors are credited with their net invoice total, while Purchases A/c is debited with ₹3,40,000 and Carriage Inward A/c with ₹12,500.',
    hints: [
      'Formula: Net Invoice = Goods + Carriage Inward.',
      'Add the cost of merchandise to the transport charge.',
      '340,000 + 12,500 = 352,500.',
    ],
  },

  // --- ADVANCED (7 Challenges) ---
  {
    id: 'ch_a01_overdraft_cashbook_calc',
    nodeId: NODE_C11_ACC_029,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Bank Overdraft as per Cash Book is ₹1,80,000 (Cr. Unfavourable). Reconciling items: (1) Cheques deposited but not yet cleared by SBI: ₹60,000; (2) Cheques issued to creditors but not yet presented: ₹40,000; (3) Direct deposit by customer Ravi into SBI account: ₹25,000; (4) Bank charges debited by SBI: ₹3,000. Calculate the Overdraft balance as per Pass Book (₹).',
    correctAnswer: 178000,
    tolerance: 0,
    unit: '₹',
    explanation:
      'Starting from Cash Book Overdraft (₹1,80,000): Add Cheques uncollected (+₹60,000) + Bank charges (+₹3,000) − Cheques unpresented (−₹40,000) − Direct deposit (−₹25,000) = ₹1,78,000 Overdraft as per Pass Book.',
    hints: [
      'In an overdraft, items that increase the overdraft are ADDED; items that reduce it are SUBTRACTED.',
      'Uncollected cheques & bank charges increase overdraft (+60k, +3k).',
      'Unpresented cheques & direct deposits reduce overdraft (-40k, -25k): 180k + 60k + 3k - 40k - 25k = 178k.',
    ],
  },
  {
    id: 'ch_a02_passbook_to_cashbook_calc',
    nodeId: NODE_C11_ACC_030,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'Balance as per SBI Pass Book (Cr. Favourable) is ₹4,20,000. Reconciling items: (1) Cheques deposited but not collected: ₹75,000; (2) Cheques issued but not presented: ₹90,000; (3) Direct payment of insurance by bank under standing instruction: ₹12,000; (4) Interest on investment collected and credited by SBI only: ₹18,000. What is the Balance as per Cash Book (₹)?',
    correctAnswer: 399000,
    tolerance: 0,
    unit: '₹',
    explanation:
      'Starting from Pass Book (₹4,20,000): To reach Cash Book: Add items where Cash Book is higher (Cheques deposited not collected +₹75,000, Standing instruction payment +₹12,000); Subtract items where Cash Book is lower (Cheques issued not presented −₹90,000, Interest collected by bank −₹18,000) = ₹4,20,000 + ₹75,000 + ₹12,000 − ₹90,000 − ₹18,000 = ₹3,99,000.',
    hints: [
      'You are moving from Pass Book -> Cash Book (reverse of node 029!).',
      'Ask: Did the Cash Book add this before the bank? If yes, ADD it to Pass Book.',
      '4,20,000 + 75,000 + 12,000 - 90,000 - 18,000 = 3,99,000.',
    ],
  },
  {
    id: 'ch_a03_trial_balance_limitations',
    nodeId: NODE_C11_ACC_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Which error will CAUSE the Trial Balance totals to DISAGREE (fail to tally)?',
    options: [
      'A credit purchase of ₹20,000 from Godrej was completely omitted from both Purchases Book and Godrej A/c',
      'A payment of ₹15,000 for office building renovation was wrongly debited to Building Repairs A/c instead of Building A/c (Error of Principle)',
      'A cash sale of ₹8,000 was debited to Cash A/c as ₹8,000 but posted to Sales A/c as ₹800 (One-sided posting error)',
      'Sales to Aman ₹5,000 was posted to Amar’s personal account (Error of Commission)',
    ],
    correctIndex: 2,
    explanation:
      'One-sided errors where debit amount (₹8,000) does not match credit amount (₹800) create an imbalance of ₹7,200. Complete omissions, errors of principle, and errors of commission preserve debit-credit equality and pass undetected.',
    hints: [
      'Trial balance only catches errors where Total Debits ≠ Total Credits.',
      'Errors that affect both sides equally will still allow the trial balance to tally.',
      'Posting ₹8,000 on Debit and ₹800 on Credit leaves a ₹7,200 gap.',
    ],
  },
  {
    id: 'ch_a04_construct_contra_journal',
    nodeId: NODE_C11_ACC_022,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Assemble the correct accounting flow to record cash withdrawal of ₹15,000 from State Bank of India for office petty cash use:',
    availableParts: [
      'Dr. Cash A/c ₹15,000',
      'Cr. Bank A/c ₹15,000',
      'Mark (C) in L.F. on both sides',
      'Post to Ledger Cash Account',
      'Dr. Bank A/c ₹15,000',
    ],
    targetState: 'Dr. Cash A/c ₹15,000 Cr. Bank A/c ₹15,000 Mark (C) in L.F. on both sides',
    validationHint:
      'Cash comes into office (Debit), Bank balance drops (Credit), marked Contra (C) so no duplicate ledger posting occurs.',
    explanation:
      'For cash withdrawal for office use: Debit Cash column (receipt), Credit Bank column (payment), and enter "C" in L.F. column on both sides. No ledger posting is required as the Cash Book acts as the ledger.',
    hints: [
      'Cash comes into the office cash drawer: Cash is debited.',
      'Money leaves the bank account: Bank is credited.',
      'Mark "C" in L.F. to instruct bookkeeper NOT to post to separate ledger accounts.',
    ],
  },
  {
    id: 'ch_a05_cheque_dishonour_eval',
    nodeId: NODE_C11_ACC_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A customer’s cheque of ₹35,000 deposited earlier was dishonoured due to insufficient funds (Sec 138 NI Act). The bank debited ₹250 as cheque return charges. How should this be rectified in the firm’s books?',
    options: [
      'Ignore it until the next financial year closing',
      'Debit Customer (Debtor) A/c with ₹35,250 and Credit Bank A/c with ₹35,250 in the Amended Cash Book',
      'Debit Bad Debts A/c with ₹35,000 and ignore the bank charge',
      'Credit Customer A/c with ₹35,000 and Debit Bank Charges A/c with ₹250',
    ],
    correctIndex: 1,
    explanation:
      'On dishonour, the customer becomes a debtor again for the full amount PLUS bank charges incurred due to their fault: Dr Customer ₹35,250 / Cr Bank ₹35,250.',
    hints: [
      'Does the customer still owe you the original money? Yes.',
      'Who should bear the ₹250 penalty charged by the bank? The defaulting customer.',
      'Re-instate the debtor for the cheque + charges, and credit Bank.',
    ],
  },
  {
    id: 'ch_a06_passbook_overdraft_logic',
    nodeId: NODE_C11_ACC_030,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'When preparing a BRS starting from a Pass Book Overdraft (Debit balance), why is a "cheque deposited into bank but not yet collected" SUBTRACTED?',
    options: [
      'Because uncollected cheques represent a bad debt write-off',
      'Because the Cash Book has already credited the cheque to reduce its overdraft, making the Cash Book overdraft lower than the Pass Book overdraft',
      'Because the Cash Book debited the deposit, reducing its overdraft; the Pass Book still has the higher overdraft, so to reach the lower Cash Book overdraft you subtract',
      'Because bank rules mandate deducting all clearing items from overdrafts',
    ],
    correctIndex: 2,
    explanation:
      'The firm debited its Cash Book upon deposit, which lowered its recorded overdraft. SBI has not credited it yet, so Pass Book overdraft is higher. To move from the higher Pass Book overdraft to the lower Cash Book overdraft, you subtract the uncollected amount.',
    hints: [
      'Remember: Pass Book Overdraft is the starting point.',
      'Cash Book already recorded the deposit, which REDUCED the firm’s overdraft in Cash Book.',
      'To move from the higher Pass Book overdraft down to the lower Cash Book overdraft, you SUBTRACT.',
    ],
  },
  {
    id: 'ch_a07_real_world_case_eval',
    nodeId: NODE_C11_ACC_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Auditor’s Challenge: A business has Debit Total = ₹14,50,000 and Credit Total = ₹14,20,000 in its Trial Balance. The accountant placed the ₹30,000 difference into Suspense Account. Which of the following discoveries would FULLY explain and eliminate this ₹30,000 suspense?',
    options: [
      'Sales Book was overcast by ₹30,000',
      'Purchases Book was undercast by ₹30,000',
      'A credit purchase of ₹15,000 from Tata Steel was posted to the Debit side of Tata Steel’s Account',
      '₹30,000 cash received from debtor was completely omitted from recording',
    ],
    correctIndex: 2,
    explanation:
      'A credit balance of ₹15,000 wrongly entered on the Debit side creates an excess Debit of ₹15,000 and a missing Credit of ₹15,000 — producing an exact ₹30,000 gap (2 × ₹15,000) on the Debit side!',
    hints: [
      'The debit side is currently heavier by ₹30,000 (14.5L vs 14.2L).',
      'Posting an entry on the wrong side doubles the error amount (2 × X = ₹30,000).',
      'Posting a ₹15,000 credit on the debit side inflates Debits by ₹15k and depresses Credits by ₹15k = ₹30k gap.',
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
  nodeId: NODE_C11_ACC_021,
  title: 'Subsidiary Books, Cash Books, Trial Balance & Bank Reconciliation',
  definition:
    'A comprehensive framework covering books of original entry (Simple & Triple Column Cash Books, Petty Cash under Imprest, Sales/Purchases Day Books), Trial Balance verification, and Bank Reconciliation Statements reconciling Cash Book bank balances with the Pass Book.',
  eli5:
    'Think of accounting as keeping track of every coin in your pocket (Cash Book), every bill you promise to pay later (Day Books), checking if your math balances (Trial Balance), and matching your phone UPI wallet balance with the bank’s text messages (BRS).',
  misconceptions: [
    {
      misconception: 'Contra entries need to be posted to separate Cash and Bank ledgers.',
      correction:
        'Contra entries (marked C) represent internal transfers. The Cash Book is itself the ledger for Cash and Bank; re-posting would double-count the transaction.',
    },
    {
      misconception: 'A simple Cash Book can show a credit (negative) balance.',
      correction:
        'Physical cash cannot be negative. You can never pay out more physical currency than you have in hand.',
    },
    {
      misconception: 'Cash transactions must have a separate journal entry and ledger posting.',
      correction:
        'The Cash Book is a journal-cum-ledger; direct recording fulfills both journalizing and ledger posting.',
    },
    {
      misconception: 'Cash sales belong in the Sales Day Book.',
      correction:
        'Sales Day Book records ONLY credit sales of goods. Cash sales are entered in the Cash Book.',
    },
    {
      misconception: 'Credit purchase of fixed assets (machinery/computers) goes in Purchases Day Book.',
      correction:
        'Purchases Day Book records only inventory goods for resale. Fixed assets bought on credit go in Journal Proper.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which column is NEVER balanced in a Triple Column Cash Book?',
      options: ['Cash Column', 'Bank Column', 'Discount Column', 'L.F. Column'],
      correctIndex: 2,
    },
    {
      question: 'Under the Imprest System, how is the reimbursement amount determined?',
      options: ['Fixed 50% of the float', 'Equal to the exact expenses incurred during the period', 'Double the closing balance', 'Arbitrary amount decided by manager'],
      correctIndex: 1,
    },
    {
      question: 'A debit note is issued by which party?',
      options: ['Seller on sales return', 'Buyer on purchases return', 'Bank on interest credit', 'Auditor on error discovery'],
      correctIndex: 1,
    },
    {
      question: 'Which error does a talling Trial Balance FAIL to detect?',
      options: ['Posting to wrong side of ledger', 'Complete omission of a transaction', 'Arithmetical casting error', 'Entering ₹500 on debit and ₹5,000 on credit'],
      correctIndex: 1,
    },
    {
      question: 'Cheques issued but not presented to the bank will make:',
      options: ['Pass book balance higher than cash book', 'Cash book balance higher than pass book', 'Both balances equal', 'Cash book show an overdraft'],
      correctIndex: 0,
    },
    {
      question: 'Bank charges debited by the bank in the pass book only will make:',
      options: ['Cash book balance higher than pass book', 'Pass book balance higher than cash book', 'No difference', 'Cash drawer short'],
      correctIndex: 0,
    },
    {
      question: 'When starting a BRS from Cash Book Overdraft, cheques deposited not collected are:',
      options: ['Subtracted', 'Added', 'Ignored', 'Multiplied by 2'],
      correctIndex: 1,
    },
    {
      question: 'When starting a BRS from Pass Book Favourable Balance, unpresented cheques are:',
      options: ['Added', 'Subtracted', 'Divided', 'Ignored'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student can record single/triple column cash book entries with contra markings, calculate imprest petty cash top-ups, route transactions to appropriate subsidiary books, verify trial balance equality, and reconcile bank differences from either starting point.',
};

// ─── EXPLORATION STEPS (BRILLIANT.ORG STYLE — INTERACTION IS THE LESSON) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Simple Cash Book Balance Engine',
    instruction:
      'Adjust opening cash, record sales receipts and rent payments. Watch the T-account calculate "By Balance c/d" in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_ACC_021,
  },
  {
    title: 'Lab 2: Triple Column Cash & The Contra Mechanism',
    instruction:
      'Simulate depositing cash into SBI and withdrawing cash for office. Observe the Contra "C" flag updating Cash and Bank columns simultaneously.',
    interactionType: 'contra-sim',
    nodeId: NODE_C11_ACC_022,
  },
  {
    title: 'Lab 3: Imprest Petty Cash Float Restorer',
    instruction:
      'Spend petty cash on postage, taxi, and stationery. Watch the remaining float drop and trigger the exact restoration reimbursement.',
    interactionType: 'imprest-sim',
    nodeId: NODE_C11_ACC_023,
  },
  {
    title: 'Lab 4: The Subsidiary Book Router',
    instruction:
      'Route invoice cards (credit goods, credit laptop, cash sale, sales return) to their rightful subsidiary book to prevent audit flags.',
    interactionType: 'drag-classify',
    nodeId: NODE_C11_ACC_024,
  },
  {
    title: 'Lab 5: Interactive BRS Balance Scale',
    instruction:
      'Toggle unpresented cheques, uncleared deposits, and bank charges. Watch the Cash Book and Pass Book beam scales tilt until fully reconciled.',
    interactionType: 'brs-scale',
    nodeId: NODE_C11_ACC_029,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If you deposit ₹20,000 cash from the shop safe into your SBI current account, what happens to the total liquid funds of the business?',
    options: [
      'Total funds increase by ₹20,000',
      'Total funds decrease by ₹20,000',
      'Total funds remain unchanged; only the internal composition (Cash down, Bank up) shifts',
      'Bank charges absorb the entire ₹20,000',
    ],
    correctIndex: 2,
    verifyInstruction:
      'Test this in Lab 2: Move the Cash-to-Bank deposit slider and check total business liquidity!',
    nodeId: NODE_C11_ACC_022,
  },
  {
    question:
      'Predict: If a customer deposits ₹40,000 directly via NEFT into your bank account, which book shows a HIGHER balance before you receive the bank SMS?',
    options: [
      'Cash Book will show ₹40,000 higher',
      'Pass Book will show ₹40,000 higher',
      'Both books remain identical',
      'Petty Cash book increases',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Test this in Lab 5: Enable "Direct Customer Deposit" and observe the Pass Book scale rise above Cash Book!',
    nodeId: NODE_C11_ACC_028,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question:
      'What do you notice about the Discount columns in the Triple Column Cash Book when you close the period?',
    observableOptions: [
      'They always equal each other on both sides',
      'They are NOT balanced with c/d; their separate totals are directly posted to the ledger',
      'They must equal zero at month end',
      'They carry forward as asset balances',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_ACC_022,
  },
  {
    question:
      'What happens to the Bank Reconciliation adjustment when you switch from a Positive (Favourable) Cash Book balance to an Overdraft?',
    observableOptions: [
      'All add/subtract operations stay identical',
      'Every add item becomes a subtract item, and every subtract item becomes an add item',
      'The BRS is cancelled by the bank',
      'Only cheques issued change sign',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_ACC_029,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Senior Auditor at Tata Retail Lucknow',
  description:
    'You are auditing the month-end closing for Tata Retail Lucknow. Perform a 4-step compliance check:',
  steps: [
    'Reconcile physical cash drawer notes against Single Column Cash Book closing balance (By Balance c/d).',
    'Verify that all Cash-Bank transfers have "C" clearly marked in the L.F. column.',
    'Confirm that the Petty Cashier was reimbursed exactly the amount spent under the ₹5,000 Imprest float.',
    'Prepare the Bank Reconciliation Statement to explain the gap between Tally bank balance and SBI E-Statement.',
  ],
};

// ─── TOPIC-SPECIFIC SVGS ───

// SVG 1: T-Account & Cash Book Dynamics Diagram
function CashBookTAccountSVG() {
  return (
    <svg viewBox="0 0 500 130" className="w-full h-auto max-h-36 rounded-xl bg-slate-950/80 border border-slate-800 p-2" aria-label="Diagram showing Simple Cash Book T-Account with Receipts on Debit and Payments on Credit">
      <defs>
        <linearGradient id="drGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#065f46" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="crGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#991b1b" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
      <text x="250" y="16" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
        SINGLE / TRIPLE COLUMN CASH BOOK STRUCTURE
      </text>
      <line x1="250" y1="26" x2="250" y2="120" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" />
      <line x1="15" y1="42" x2="485" y2="42" stroke="#475569" strokeWidth="1.5" />
      
      <rect x="20" y="24" width="220" height="18" rx="4" fill="url(#drGrad)" opacity="0.4" />
      <text x="130" y="37" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
        Dr. (Receipts / Cash &amp; Bank Inflow)
      </text>

      <rect x="260" y="24" width="220" height="18" rx="4" fill="url(#crGrad)" opacity="0.4" />
      <text x="370" y="37" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">
        Cr. (Payments / Cash &amp; Bank Outflow)
      </text>

      <text x="30" y="60" fill="#cbd5e1" fontSize="9">• To Opening Bal (b/d)</text>
      <text x="30" y="76" fill="#cbd5e1" fontSize="9">• To Cash Sales / Debtors</text>
      <text x="30" y="92" fill="#34d399" fontSize="9">• To Cash (Bank Dr - Contra "C")</text>
      <text x="30" y="112" fill="#10b981" fontSize="10" fontWeight="bold">Σ Total Receipts = Σ Total Payments</text>

      <text x="270" y="60" fill="#cbd5e1" fontSize="9">• By Expenses (Rent, Salary)</text>
      <text x="270" y="76" fill="#cbd5e1" fontSize="9">• By Creditors / Suppliers</text>
      <text x="270" y="92" fill="#f87171" fontSize="9">• By Bank (Cash Cr - Contra "C")</text>
      <text x="270" y="112" fill="#fbbf24" fontSize="10" fontWeight="bold">By Balance c/d (Closing Cash/Bank)</text>
    </svg>
  );
}

// SVG 2: Imprest Petty Cash Float Cycle
function ImprestPettyCashSVG() {
  return (
    <svg viewBox="0 0 500 130" className="w-full h-auto max-h-36 rounded-xl bg-slate-950/80 border border-slate-800 p-2" aria-label="Diagram showing Imprest Petty Cash Float and Reimbursement Cycle">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
        </marker>
        <marker id="arrowAmber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
        </marker>
      </defs>
      <text x="250" y="16" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
        IMPREST PETTY CASH SYSTEM CYCLE
      </text>

      <rect x="20" y="32" width="120" height="50" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
      <text x="80" y="52" textAnchor="middle" fill="#a5b4fc" fontSize="10" fontWeight="bold">Fixed Float</text>
      <text x="80" y="68" textAnchor="middle" fill="#cbd5e1" fontSize="9">e.g., ₹5,000</text>

      <line x1="145" y1="57" x2="180" y2="57" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAmber)" />

      <rect x="185" y="32" width="130" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="250" y="50" textAnchor="middle" fill="#fcd34d" fontSize="9" fontWeight="bold">Petty Payments</text>
      <text x="250" y="63" textAnchor="middle" fill="#cbd5e1" fontSize="8">Tea, Taxi, Postage</text>
      <text x="250" y="74" textAnchor="middle" fill="#f87171" fontSize="8">Vouchers Maintained</text>

      <line x1="320" y1="57" x2="355" y2="57" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />

      <rect x="360" y="32" width="120" height="50" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
      <text x="420" y="50" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">Reimbursement</text>
      <text x="420" y="63" textAnchor="middle" fill="#cbd5e1" fontSize="8">Exact Amount Spent</text>
      <text x="420" y="74" textAnchor="middle" fill="#34d399" fontSize="8">Restores Float</text>

      <path d="M 420 85 Q 250 125 80 85" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4,3" markerEnd="url(#arrow)" />
      <text x="250" y="118" textAnchor="middle" fill="#a5b4fc" fontSize="8">Float restored to full ₹5,000 on 1st of every month</text>
    </svg>
  );
}

// SVG 3: Bank Reconciliation Statement (BRS) Balancing Scale
function BRSBalancingScaleSVG() {
  return (
    <svg viewBox="0 0 500 130" className="w-full h-auto max-h-36 rounded-xl bg-slate-950/80 border border-slate-800 p-2" aria-label="Diagram showing Bank Reconciliation Statement balancing Cash Book vs SBI Pass Book">
      <text x="250" y="16" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
        BANK RECONCILIATION STATEMENT (BRS) RECONCILING BRIDGE
      </text>

      <rect x="25" y="30" width="130" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
      <text x="90" y="48" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">Cash Book (Bank Col)</text>
      <text x="90" y="63" textAnchor="middle" fill="#cbd5e1" fontSize="8">Maintained by Firm</text>
      <text x="90" y="78" textAnchor="middle" fill="#34d399" fontSize="8">Dr = Asset / Deposits</text>
      <text x="90" y="90" textAnchor="middle" fill="#fca5a5" fontSize="8">Cr = Overdraft / Cheques Out</text>

      <rect x="175" y="35" width="150" height="60" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" />
      <text x="250" y="50" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Timing &amp; Omissions</text>
      <text x="250" y="63" textAnchor="middle" fill="#cbd5e1" fontSize="8">Unpresented Cheques (+)</text>
      <text x="250" y="74" textAnchor="middle" fill="#cbd5e1" fontSize="8">Uncleared Deposits (-)</text>
      <text x="250" y="86" textAnchor="middle" fill="#cbd5e1" fontSize="8">Direct Debits/Credits by Bank</text>

      <rect x="345" y="30" width="130" height="70" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
      <text x="410" y="48" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">SBI Pass Book</text>
      <text x="410" y="63" textAnchor="middle" fill="#cbd5e1" fontSize="8">Maintained by SBI</text>
      <text x="410" y="78" textAnchor="middle" fill="#34d399" fontSize="8">Cr = Favourable Balance</text>
      <text x="410" y="90" textAnchor="middle" fill="#fca5a5" fontSize="8">Dr = Overdraft (Loan)</text>

      <text x="250" y="118" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">
        ✓ Adjusted Cash Book Balance == Reconciled Pass Book Balance
      </text>
    </svg>
  );
}

// ─── MAIN SIMULATION COMPONENT ───
export default function C11_AccountancyCashBookSimpleSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['accountancy'] || {
    name: 'Accountancy',
    emoji: '📚',
    color: 'emerald',
  };

  // ─── SIMULATION PHASE FLOW ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ─── INTERACTIVE LAB 1 STATE (Single Column Cash Book) ───
  const [openingCash] = useState<number>(40000);
  const [cashSales, setCashSales] = useState<number>(25000);
  const [debtorCollection] = useState<number>(15000);
  const [rentPaid, setRentPaid] = useState<number>(12000);
  const [salariesPaid, setSalariesPaid] = useState<number>(18000);

  const totalReceipts = useMemo(() => openingCash + cashSales + debtorCollection, [openingCash, cashSales, debtorCollection]);
  const totalPayments = useMemo(() => rentPaid + salariesPaid, [rentPaid, salariesPaid]);
  const cashClosingBalance = useMemo(() => totalReceipts - totalPayments, [totalReceipts, totalPayments]);

  // ─── INTERACTIVE LAB 2 STATE (Triple Column & Contra) ───
  const [contraCashBalance, setContraCashBalance] = useState<number>(30000);
  const [contraBankBalance, setContraBankBalance] = useState<number>(80000);
  const [contraDepositAmount] = useState<number>(10000);
  const [contraWithdrawAmount] = useState<number>(5000);
  const [contraHistory, setContraHistory] = useState<string[]>([
    'Opening: Cash ₹30,000 | SBI Bank ₹80,000',
  ]);

  // ─── INTERACTIVE LAB 3 STATE (Imprest Petty Cash) ───
  const [imprestFloat] = useState<number>(5000);
  const [pettyPostage, setPettyPostage] = useState<number>(450);
  const [pettyStationery, setPettyStationery] = useState<number>(750);
  const [pettyConveyance, setPettyConveyance] = useState<number>(1200);
  const [pettyTea, setPettyTea] = useState<number>(600);

  const totalPettySpent = useMemo(() => pettyPostage + pettyStationery + pettyConveyance + pettyTea, [pettyPostage, pettyStationery, pettyConveyance, pettyTea]);
  const pettyRemaining = useMemo(() => imprestFloat - totalPettySpent, [imprestFloat, totalPettySpent]);

  // ─── INTERACTIVE LAB 4 STATE (Subsidiary Router) ───
  const [routerItems, setRouterItems] = useState([
    { id: 'item1', text: 'Credit sale of 50 soaps to BigBazaar', category: 'sdb', resolved: false },
    { id: 'item2', text: 'Credit purchase of raw spices from Kerala Traders', category: 'pdb', resolved: false },
    { id: 'item3', text: 'Credit purchase of delivery van from Tata Motors', category: 'jp', resolved: false },
    { id: 'item4', text: 'Customer returns 10 damaged soaps', category: 'srdb', resolved: false },
  ]);

  // ─── INTERACTIVE LAB 5 STATE (BRS Balance Beam) ───
  const [brsBaseCashBook] = useState<number>(200000);
  const [brsUnpresentedCheques, setBrsUnpresentedCheques] = useState<boolean>(true);
  const [brsUnclearedDeposits, setBrsUnclearedDeposits] = useState<boolean>(true);
  const [brsBankCharges, setBrsBankCharges] = useState<boolean>(false);
  const [brsDirectDeposit, setBrsDirectDeposit] = useState<boolean>(false);
  const [brsIsOverdraft, setBrsIsOverdraft] = useState<boolean>(false);

  const calculatedPassBookBalance = useMemo(() => {
    let bal = brsBaseCashBook;
    if (!brsIsOverdraft) {
      if (brsUnpresentedCheques) bal += 35000;
      if (brsUnclearedDeposits) bal -= 20000;
      if (brsBankCharges) bal -= 1500;
      if (brsDirectDeposit) bal += 25000;
    } else {
      if (brsUnpresentedCheques) bal -= 35000;
      if (brsUnclearedDeposits) bal += 20000;
      if (brsBankCharges) bal += 1500;
      if (brsDirectDeposit) bal -= 25000;
    }
    return bal;
  }, [brsBaseCashBook, brsUnpresentedCheques, brsUnclearedDeposits, brsBankCharges, brsDirectDeposit, brsIsOverdraft]);

  // ─── BRILLIANT.ORG INTERACTION STATES ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // ─── ADAPTIVE BKT & SCORING STATE ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── CHALLENGE PER-STEP STATE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── DRAG & DROP / INPUT STATES ───
  const [draggedLabel, setDraggedLabel] = useState<string | null>(null);
  const [droppedSlots, setDroppedSlots] = useState<Record<string, string>>({});
  const [sortedItems, setSortedItems] = useState<number[]>([]);
  const [numericValue, setNumericValue] = useState('');
  const [assembledParts, setAssembledParts] = useState<string[]>([]);

  // ─── DISCOVERY & FEEDBACK ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGE FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 85) setDifficulty('advanced');
      else if (existing.bestScore >= 55) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT UPDATE EFFECT ───
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

  // ─── CANVAS PULSE ANIMATION (2D HTML Canvas) ───
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
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 4) {
        const y = 15 + Math.sin((x + frame * 2) * 0.05) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(canvas.width - 20, 15, 4 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge]);

  // ─── SHOW NEXT ESCALATING HINT ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints && activeChallenge.hints[nextLevel - 1]) {
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
      speechManager.speak('Let us review the complete step-by-step accounting explanation.');
    }
  }, [hintCount, activeChallenge]);

  // ─── AUTO-HINT INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! Unpresented cheques keep the Pass Book higher until the payee collects.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  // ─── NAVIGATION HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive accounting labs! Explore each concept.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Play with the accounts freely without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us tackle the audit challenges! Think through each entry.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the interactive controls to test it.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent analytical eye! You noted the exact ledger behavior.'
        : 'Look closely at the column totals and how they are handled.'
    );
  }, []);

  // ─── INTERACTIVE LAB CONTRA HANDLERS ───
  const handleDepositToBank = useCallback(() => {
    if (contraCashBalance >= contraDepositAmount) {
      setContraCashBalance((prev) => prev - contraDepositAmount);
      setContraBankBalance((prev) => prev + contraDepositAmount);
      setContraHistory((prev) => [
        `Contra (C): Deposited ₹${contraDepositAmount.toLocaleString()} Cash into SBI Bank (Dr Bank / Cr Cash)`,
        ...prev.slice(0, 4),
      ]);
      audioManager.play('balance');
      speechManager.speak('Contra Entry passed! Bank debited, Cash credited, marked C in L.F.');
      setPredictionVerified(true);
    } else {
      audioManager.play('error');
      speechManager.speak('Insufficient cash in the drawer to make this deposit!');
    }
  }, [contraCashBalance, contraDepositAmount]);

  const handleWithdrawFromBank = useCallback(() => {
    if (contraBankBalance >= contraWithdrawAmount) {
      setContraBankBalance((prev) => prev - contraWithdrawAmount);
      setContraCashBalance((prev) => prev + contraWithdrawAmount);
      setContraHistory((prev) => [
        `Contra (C): Withdrew ₹${contraWithdrawAmount.toLocaleString()} from SBI for Office Cash (Dr Cash / Cr Bank)`,
        ...prev.slice(0, 4),
      ]);
      audioManager.play('balance');
      speechManager.speak('Contra Entry passed! Cash debited, Bank credited, marked C in L.F.');
    } else {
      audioManager.play('error');
      speechManager.speak('Insufficient bank balance to withdraw this sum!');
    }
  }, [contraBankBalance, contraWithdrawAmount]);

  // ─── SUBSIDIARY ROUTER HANDLER ───
  const handleRouteItem = useCallback(
    (itemId: string, selectedBook: string) => {
      setRouterItems((prev) =>
        prev.map((item) => {
          if (item.id === itemId) {
            const isMatch = item.category === selectedBook;
            if (isMatch) {
              audioManager.play('drop-correct');
            } else {
              audioManager.play('drop-wrong');
            }
            return { ...item, resolved: isMatch };
          }
          return item;
        })
      );
    },
    []
  );

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Audit complete! You demonstrated mastery of books, trial balance, and BRS.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setRevealedSteps(0);
    setNumericValue('');
    setDroppedSlots({});
    setSortedItems([]);
    setAssembledParts([]);
    setWrongShake(false);
    setWrongFlash(false);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── ANSWER VALIDATOR ───
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (
        activeChallenge.type === 'classify' ||
        activeChallenge.type === 'distinguish' ||
        activeChallenge.type === 'match'
      ) {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const parsed = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(parsed - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Journal and ledger rules precisely applied.');
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

        if (
          activeChallenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(activeChallenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Review the step-by-step working below.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  // ─── DRAG HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedLabel(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedLabel) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedLabel;
      if (isCorrect) {
        setDroppedSlots((prev) => ({ ...prev, [targetId]: draggedLabel }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedLabel(null);
    },
    [draggedLabel, activeChallenge]
  );

  // ─── SORT HANDLERS ───
  const handleSortSwap = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortedItems((prev) => {
      const base = prev.length ? [...prev] : [0, 1, 2, 3];
      const [item] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, item);
      return base;
    });
  }, []);

  const handleSortSubmit = useCallback(() => {
    const order = sortedItems.length ? sortedItems : [0, 1, 2, 3];
    handleAnswer(order);
  }, [sortedItems, handleAnswer]);

  // ─── RECHARTS DATA FOR TRIAL BALANCE VISUALIZER ───
  const trialBalanceChartData = useMemo(() => {
    return [
      { name: 'Debits (Assets & Exp)', amount: totalReceipts + 60000, fill: '#10b981' },
      { name: 'Credits (Liab & Rev)', amount: totalReceipts + 60000, fill: '#6366f1' },
    ];
  }, [totalReceipts]);

  // ─── MOTIVATIONAL FEEDBACK HELPER ───
  const getMotivationalFeedback = (errorCount: number) => {
    if (errorCount === 0) {
      return {
        title: 'PERFECT SCORE!',
        message: 'Flawless ledger balancing and BRS preparation! You understand contra entries, imprest floats, and timing gaps completely.',
      };
    } else if (errorCount >= 1 && errorCount <= 3) {
      return {
        title: 'Great work!',
        message: 'Superb accounting skill! You handled complex unpresented cheques and subsidiary routings with high accuracy.',
      };
    } else if (errorCount >= 4 && errorCount <= 7) {
      return {
        title: 'Good effort!',
        message: 'Solid attempt! Review the specific misconception tags below to sharpen your double-entry rules and bank reconciliation adjustments.',
      };
    } else {
      return {
        title: 'Do not give up — You WILL get this!',
        message: 'Accounting concepts become clearer with regular practice. Walk through the labs and try the challenge again!',
      };
    }
  };

  const feedbackData = getMotivationalFeedback(errors);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/60 border border-emerald-700 rounded-2xl" role="img" aria-label="Book emoji">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700">
                ISC Class 11 Accountancy
              </span>
              <span className="text-xs text-slate-400">Nodes 021 - 030</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Difficulty Badge & Mastery Pill */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-slate-400">Adaptive BKT Engine</div>
            <div className="text-sm font-semibold text-emerald-400 capitalize">{masteryLevel} Level</div>
          </div>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950 text-rose-300 border-rose-600'
                : 'bg-indigo-950 text-indigo-300 border-indigo-600'
            }`}
          >
            {difficulty}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-6"
        >
          <div className="p-5 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border border-emerald-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <span>🏢</span> {SCENARIO.title}
            </div>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-emerald-400/90 mt-2 font-medium">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>💡</span> Month-End Audit Curiosity Hook
            </div>
            <h3 className="text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${idx + 1}: ${option}`}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/60 border-emerald-500 text-emerald-100'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-800/40 border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">✓ Correct</span>
                    )}
                    {discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-rose-400 font-medium flex items-center gap-1">✗ Incorrect</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-emerald-950/40 border border-emerald-700/60"
              >
                <p className="text-sm text-emerald-200 mb-3">
                  {discoveryCorrect
                    ? '✓ Spot on! The bank statement is not wrong — transactions take time to clear.'
                    : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Accounting Labs"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  Enter Interactive Accounting Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-800/70 p-2 rounded-2xl border border-slate-700">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                aria-label={`Go to Lab ${idx + 1}: ${step.title}`}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentSlide === idx
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                Lab {idx + 1}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 shadow-xl space-y-5"
            >
              <div>
                <h3 className="text-lg font-bold text-emerald-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300 mt-1 flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* Lab 1 */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <CashBookTAccountSVG />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="space-y-2 border-r border-slate-800/80 pr-2">
                      <div className="flex justify-between items-center text-xs font-bold text-emerald-400 border-b border-slate-800 pb-1">
                        <span>Dr. Receipts (Cash In)</span>
                        <span>Amount (₹)</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>To Balance b/d (Opening Cash)</span>
                        <span className="font-mono">₹{openingCash.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>To Sales A/c (Cash Sales)</span>
                        <span className="font-mono">₹{cashSales.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>To Tata Steel (Debtor Collection)</span>
                        <span className="font-mono">₹{debtorCollection.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-bold text-emerald-400">
                        <span>Total Receipts</span>
                        <span className="font-mono">₹{totalReceipts.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pl-2">
                      <div className="flex justify-between items-center text-xs font-bold text-rose-400 border-b border-slate-800 pb-1">
                        <span>Cr. Payments (Cash Out)</span>
                        <span>Amount (₹)</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>By Rent A/c (Shop Rent)</span>
                        <span className="font-mono">₹{rentPaid.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>By Salary A/c (Staff Wages)</span>
                        <span className="font-mono">₹{salariesPaid.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold text-amber-300 bg-amber-950/40 p-1.5 rounded-lg border border-amber-800/50">
                        <span>By Balance c/d (Closing Cash)</span>
                        <span className="font-mono">₹{cashClosingBalance.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-bold text-rose-400">
                        <span>Total Payments + Balance</span>
                        <span className="font-mono">₹{totalReceipts.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label htmlFor="slider-cash-sales" className="text-xs text-slate-400 flex justify-between">
                        <span>Cash Sales:</span>
                        <span className="text-emerald-400 font-mono">₹{cashSales}</span>
                      </label>
                      <input
                        id="slider-cash-sales"
                        aria-label="Adjust cash sales value"
                        type="range"
                        min={5000}
                        max={60000}
                        step={1000}
                        value={cashSales}
                        onChange={(e) => {
                          setCashSales(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-1 accent-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="slider-rent-paid" className="text-xs text-slate-400 flex justify-between">
                        <span>Rent Paid:</span>
                        <span className="text-rose-400 font-mono">₹{rentPaid}</span>
                      </label>
                      <input
                        id="slider-rent-paid"
                        aria-label="Adjust rent paid value"
                        type="range"
                        min={2000}
                        max={30000}
                        step={1000}
                        value={rentPaid}
                        onChange={(e) => {
                          setRentPaid(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-1 accent-rose-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="slider-salaries-paid" className="text-xs text-slate-400 flex justify-between">
                        <span>Staff Salaries:</span>
                        <span className="text-rose-400 font-mono">₹{salariesPaid}</span>
                      </label>
                      <input
                        id="slider-salaries-paid"
                        aria-label="Adjust staff salaries value"
                        type="range"
                        min={5000}
                        max={40000}
                        step={1000}
                        value={salariesPaid}
                        onChange={(e) => {
                          setSalariesPaid(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-1 accent-rose-500"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-800/40 text-xs text-emerald-200 flex items-center justify-between">
                    <span>
                      ✓ <strong>Rule Verified:</strong> Closing Cash (₹{cashClosingBalance.toLocaleString()}) becomes &quot;To Balance b/d&quot; on the 1st of next month.
                    </span>
                    <span className="font-bold text-emerald-400">Debit Balance = Non-negative</span>
                  </div>
                </div>
              )}

              {/* Lab 2 */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/40 border border-indigo-700/60 rounded-xl">
                      <p className="text-sm font-semibold text-indigo-200 mb-2">
                        {PREDICTION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Select prediction: ${opt}`}
                            className="p-2.5 rounded-lg text-xs text-left bg-slate-800 hover:bg-indigo-900/60 border border-slate-700 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="text-xs font-bold text-slate-400 uppercase">Current Asset Vaults</div>
                      <div className="grid grid-cols-2 gap-3 my-3">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center">
                          <div className="text-xs text-slate-400">Cash in Safe</div>
                          <div className="text-lg font-black text-emerald-400 font-mono">
                            ₹{contraCashBalance.toLocaleString()}
                          </div>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center">
                          <div className="text-xs text-slate-400">SBI Bank Account</div>
                          <div className="text-lg font-black text-indigo-400 font-mono">
                            ₹{contraBankBalance.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 text-center">
                        Total Liquid Funds:{' '}
                        <span className="font-bold text-white font-mono">
                          ₹{(contraCashBalance + contraBankBalance).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                      <div className="text-xs font-bold text-emerald-400">Pass Contra Entry (Marked &quot;C&quot;)</div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleDepositToBank}
                          aria-label={`Deposit ₹${contraDepositAmount.toLocaleString()} Cash into SBI Bank`}
                          className="flex-1 p-2.5 bg-emerald-700 hover:bg-emerald-600 rounded-xl text-xs font-bold text-white shadow"
                        >
                          + Deposit ₹{contraDepositAmount.toLocaleString()} to SBI (C)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleWithdrawFromBank}
                          aria-label={`Withdraw ₹${contraWithdrawAmount.toLocaleString()} from SBI for Office`}
                          className="flex-1 p-2.5 bg-indigo-700 hover:bg-indigo-600 rounded-xl text-xs font-bold text-white shadow"
                        >
                          - Withdraw ₹{contraWithdrawAmount.toLocaleString()} for Office (C)
                        </motion.button>
                      </div>

                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
                        <div className="font-bold text-slate-300">Ledger Posting Log:</div>
                        {contraHistory.map((h, i) => (
                          <div key={i} className="text-slate-400 truncate">
                            • {h}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {predictionVerified && !observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-900 rounded-xl border border-amber-600/50"
                    >
                      <p className="text-sm font-semibold text-amber-200 mb-2">
                        {OBSERVATION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Select observation: ${opt}`}
                            className="p-2 rounded-lg text-xs text-left bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Lab 3 */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <ImprestPettyCashSVG />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between text-center">
                      <div className="text-xs font-bold text-slate-400">Fixed Monthly Float</div>
                      <div className="text-2xl font-black text-indigo-400 font-mono">₹{imprestFloat}</div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden my-2">
                        <motion.div
                          className="h-full bg-emerald-500"
                          animate={{ width: `${(pettyRemaining / imprestFloat) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-400">
                        Remaining in Box:{' '}
                        <span className="font-bold text-emerald-400 font-mono">₹{pettyRemaining}</span>
                      </div>
                      <div className="mt-3 p-2 bg-emerald-950/60 border border-emerald-700 rounded-lg text-xs font-bold text-emerald-300">
                        Top-up Due: ₹{totalPettySpent}
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                      <div className="text-xs font-bold text-slate-300">Analytical Expense Sliders:</div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <label htmlFor="slider-petty-postage" className="text-slate-400 flex justify-between">
                            <span>Postage &amp; Courier:</span>
                            <span className="text-amber-400 font-mono">₹{pettyPostage}</span>
                          </label>
                          <input
                            id="slider-petty-postage"
                            aria-label="Adjust postage expense"
                            type="range"
                            min={100}
                            max={1200}
                            step={50}
                            value={pettyPostage}
                            onChange={(e) => setPettyPostage(Number(e.target.value))}
                            className="w-full mt-1 accent-amber-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="slider-petty-stationery" className="text-slate-400 flex justify-between">
                            <span>Office Stationery:</span>
                            <span className="text-amber-400 font-mono">₹{pettyStationery}</span>
                          </label>
                          <input
                            id="slider-petty-stationery"
                            aria-label="Adjust stationery expense"
                            type="range"
                            min={100}
                            max={1200}
                            step={50}
                            value={pettyStationery}
                            onChange={(e) => setPettyStationery(Number(e.target.value))}
                            className="w-full mt-1 accent-amber-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="slider-petty-conveyance" className="text-slate-400 flex justify-between">
                            <span>Taxi / Conveyance:</span>
                            <span className="text-amber-400 font-mono">₹{pettyConveyance}</span>
                          </label>
                          <input
                            id="slider-petty-conveyance"
                            aria-label="Adjust conveyance expense"
                            type="range"
                            min={200}
                            max={1800}
                            step={50}
                            value={pettyConveyance}
                            onChange={(e) => setPettyConveyance(Number(e.target.value))}
                            className="w-full mt-1 accent-amber-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="slider-petty-tea" className="text-slate-400 flex justify-between">
                            <span>Tea &amp; Refreshments:</span>
                            <span className="text-amber-400 font-mono">₹{pettyTea}</span>
                          </label>
                          <input
                            id="slider-petty-tea"
                            aria-label="Adjust tea and refreshments expense"
                            type="range"
                            min={100}
                            max={1000}
                            step={50}
                            value={pettyTea}
                            onChange={(e) => setPettyTea(Number(e.target.value))}
                            className="w-full mt-1 accent-amber-500"
                          />
                        </div>
                      </div>

                      <div className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <strong>Imprest Rule:</strong> Main Cashier pays exactly ₹{totalPettySpent} (total spent) on 1st of next month. Box restores to ₹5,000.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab 4 */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-300">Incoming Invoice Items (Click to Route):</div>
                      {routerItems.map((item) => (
                        <div
                          key={item.id}
                          className={`p-3 rounded-xl border text-xs flex flex-col gap-2 transition-all ${
                            item.resolved
                              ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
                              : 'bg-slate-900 border-slate-700 text-slate-200'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{item.text}</span>
                            {item.resolved ? (
                              <span className="text-emerald-400 font-bold flex items-center gap-1">✓ Routed Correctly</span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Unrouted</span>
                            )}
                          </div>
                          {!item.resolved && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              <button
                                aria-label="Route to Sales Day Book"
                                onClick={() => handleRouteItem(item.id, 'sdb')}
                                className="px-2 py-1 bg-slate-800 hover:bg-emerald-700 rounded text-[11px] text-slate-300"
                              >
                                Sales Day Book
                              </button>
                              <button
                                aria-label="Route to Purchases Day Book"
                                onClick={() => handleRouteItem(item.id, 'pdb')}
                                className="px-2 py-1 bg-slate-800 hover:bg-emerald-700 rounded text-[11px] text-slate-300"
                              >
                                Purchases Day Book
                              </button>
                              <button
                                aria-label="Route to Journal Proper"
                                onClick={() => handleRouteItem(item.id, 'jp')}
                                className="px-2 py-1 bg-slate-800 hover:bg-indigo-700 rounded text-[11px] text-slate-300"
                              >
                                Journal Proper
                              </button>
                              <button
                                aria-label="Route to Sales Return Day Book"
                                onClick={() => handleRouteItem(item.id, 'srdb')}
                                className="px-2 py-1 bg-slate-800 hover:bg-amber-700 rounded text-[11px] text-slate-300"
                              >
                                Sales Return (Credit Note)
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                      <div className="font-bold text-indigo-300">Subsidiary Book Audit Rules:</div>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        <strong className="text-emerald-400">Sales / Purchases Day Books:</strong> Strictly for <em>credit trading goods</em>. Cash sales go to Cash Book.
                      </div>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        <strong className="text-indigo-400">Journal Proper:</strong> Residual book for credit purchase/sale of <em>Fixed Assets</em> (computers, vans, machinery) and adjustment entries.
                      </div>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800">
                        <strong className="text-amber-400">Return Day Books:</strong> Sales Return uses <em>Credit Note</em> (issued by seller); Purchases Return uses <em>Debit Note</em> (issued by buyer).
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab 5 */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <BRSBalancingScaleSVG />

                  <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-300 font-semibold">Bank Balance Scenario:</span>
                    <button
                      aria-label="Toggle Favourable or Overdraft Bank Balance mode"
                      onClick={() => setBrsIsOverdraft((prev) => !prev)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        brsIsOverdraft
                          ? 'bg-rose-700 text-white shadow'
                          : 'bg-emerald-700 text-white shadow'
                      }`}
                    >
                      {brsIsOverdraft ? 'Unfavourable (Overdraft Cr.)' : 'Favourable (Debit Balance)'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <div className="text-xs text-slate-400 font-bold uppercase">Cash Book (Firm Record)</div>
                      <div className="text-2xl font-black text-emerald-400 font-mono my-2">
                        ₹{brsBaseCashBook.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-400">
                        {brsIsOverdraft ? 'Credit Balance (Overdraft)' : 'Debit Balance (In Bank)'}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <div className="text-xs text-slate-400 font-bold uppercase">SBI Pass Book (Bank Record)</div>
                      <div className="text-2xl font-black text-indigo-400 font-mono my-2">
                        ₹{calculatedPassBookBalance.toLocaleString()}
                      </div>
                      <div className="text-xs text-indigo-300">
                        Difference: ₹{Math.abs(calculatedPassBookBalance - brsBaseCashBook).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-slate-300 mb-2">Toggle Timing &amp; Omission Items:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          aria-label="Toggle Cheque issued to supplier not presented"
                          checked={brsUnpresentedCheques}
                          onChange={(e) => setBrsUnpresentedCheques(e.target.checked)}
                          className="accent-emerald-500"
                        />
                        <span>Cheque issued to supplier ₹35,000 not presented</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          aria-label="Toggle Cheque deposited not collected"
                          checked={brsUnclearedDeposits}
                          onChange={(e) => setBrsUnclearedDeposits(e.target.checked)}
                          className="accent-emerald-500"
                        />
                        <span>Cheque deposited ₹20,000 not collected by SBI</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          aria-label="Toggle SBI bank charges debited"
                          checked={brsBankCharges}
                          onChange={(e) => setBrsBankCharges(e.target.checked)}
                          className="accent-emerald-500"
                        />
                        <span>SBI bank charges debited ₹1,500</span>
                      </label>
                      <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          aria-label="Toggle Customer direct NEFT deposit"
                          checked={brsDirectDeposit}
                          onChange={(e) => setBrsDirectDeposit(e.target.checked)}
                          className="accent-emerald-500"
                        />
                        <span>Customer direct NEFT deposit ₹25,000</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Go to Previous Lab"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-mono">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                aria-label="Go to Next Lab"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter Free Sandbox Mode"
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX (FREE PLAY) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 flex flex-wrap justify-between items-center gap-3">
            <div>
              <h3 className="text-lg font-bold text-white">Full Accounting Sandbox &amp; Trial Balance Visualizer</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Freely manipulate all accounts without penalties. Watch the Trial Balance live chart stay in equilibrium!
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Proceed to Graded Challenges"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg"
            >
              Ready for Graded Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-xs font-bold text-emerald-400 uppercase mb-2">
                Trial Balance Double-Entry Equality
              </div>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trialBalanceChartData}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    />
                    <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                      {trialBalanceChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-indigo-400 uppercase">Live Parameter Adjustments</div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400">
                    <label htmlFor="sandbox-sales-range">Cash Sales (Receipt):</label>
                    <span className="font-mono text-emerald-400">₹{cashSales}</span>
                  </div>
                  <input
                    id="sandbox-sales-range"
                    aria-label="Sandbox cash sales slider"
                    type="range"
                    min={10000}
                    max={100000}
                    step={2000}
                    value={cashSales}
                    onChange={(e) => setCashSales(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-slate-400">
                    <label htmlFor="sandbox-salary-range">Staff Salaries (Payment):</label>
                    <span className="font-mono text-rose-400">₹{salariesPaid}</span>
                  </div>
                  <input
                    id="sandbox-salary-range"
                    aria-label="Sandbox staff salaries slider"
                    type="range"
                    min={5000}
                    max={50000}
                    step={1000}
                    value={salariesPaid}
                    onChange={(e) => setSalariesPaid(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                Calculated Cash c/d: <span className="font-mono font-bold text-emerald-400">₹{cashClosingBalance}</span> |
                Trial Balance Total: <span className="font-mono font-bold text-indigo-400">₹{(totalReceipts + 60000).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: GRADED CHALLENGE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 shadow-md">
            <canvas ref={canvasRef} width={400} height={30} className="w-full rounded-lg mb-3" />
            <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5 font-semibold">
              <span>
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="uppercase text-emerald-400 tracking-wider">
                Competency: {activeChallenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500"
                animate={{
                  width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500'
                : 'bg-slate-800/90 border-slate-700 shadow-xl'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              Node ID: {activeChallenge.nodeId}
            </div>
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">
              {activeChallenge.question}
            </h3>

            {/* Type 1: MCQ */}
            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="space-y-3">
                  {activeChallenge.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(idx)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${idx + 1}: ${option}`}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all ${
                        showExplanation && idx === activeChallenge.correctIndex
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-100 font-bold'
                          : 'bg-slate-900/80 border-slate-750 text-slate-200 hover:bg-slate-750 hover:border-emerald-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showExplanation && idx === activeChallenge.correctIndex && (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">✓ Standard Answer</span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Type 2: Drag Label */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Items:</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable transaction: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-1.5 bg-emerald-700 rounded-lg text-xs font-semibold text-white cursor-grab shadow focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'box_pdb', title: 'Purchases Day Book' },
                    { id: 'box_jp', title: 'Journal Proper' },
                    { id: 'box_srdb', title: 'Sales Return Day Book' },
                    { id: 'box_prdb', title: 'Purchases Return Day Book' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-900 rounded-xl border border-dashed border-slate-700 min-h-[90px] flex flex-col justify-between"
                      aria-label={`Drop target zone for ${target.title}`}
                    >
                      <span className="text-xs font-bold text-indigo-300">{target.title}</span>
                      <div className="text-xs text-emerald-400 font-mono font-medium">
                        {droppedSlots[target.id] ? `✓ ${droppedSlots[target.id]}` : 'Drop matching transaction here...'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedSlots)}
                  disabled={showExplanation}
                  aria-label="Verify Routed Books"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl"
                >
                  Verify Routed Books
                </motion.button>
              </div>
            )}

            {/* Type 3: Drag Sort */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <div className="text-xs text-slate-400 mb-1">Click adjacent steps to re-order:</div>
                {(sortedItems.length ? sortedItems : [0, 1, 2, 3]).map((orderIdx, displayIdx) => (
                  <div
                    key={displayIdx}
                    className="p-3 bg-slate-900 border border-slate-750 rounded-xl text-xs flex justify-between items-center"
                  >
                    <span className="text-slate-200">
                      {displayIdx + 1}. {activeChallenge.sortItems![orderIdx]}
                    </span>
                    <div className="flex gap-1">
                      {displayIdx > 0 && (
                        <button
                          aria-label={`Move step ${displayIdx + 1} up`}
                          onClick={() => handleSortSwap(displayIdx, displayIdx - 1)}
                          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                        >
                          ↑
                        </button>
                      )}
                      {displayIdx < activeChallenge.sortItems!.length - 1 && (
                        <button
                          aria-label={`Move step ${displayIdx + 1} down`}
                          onClick={() => handleSortSwap(displayIdx, displayIdx + 1)}
                          className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                        >
                          ↓
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Submit Ordered Sequence"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl mt-2"
                >
                  Submit Ordered Sequence
                </motion.button>
              </div>
            )}

            {/* Type 4: Numeric Input */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={numericValue}
                    onChange={(e) => setNumericValue(e.target.value)}
                    placeholder="Enter rupee amount"
                    aria-label="Enter rupee numerical answer"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-emerald-500 focus:outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(numericValue)}
                    disabled={showExplanation || !numericValue}
                    aria-label="Check Rupee Value"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl"
                  >
                    Check Rupee Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* Type 5: Construct Entry */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-3">
                <div className="text-xs text-slate-400">{activeChallenge.validationHint}</div>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.availableParts.map((part, i) => (
                    <button
                      key={i}
                      aria-label={`Add accounting part: ${part}`}
                      onClick={() => setAssembledParts((prev) => [...prev, part])}
                      className="px-2.5 py-1.5 bg-indigo-800/80 hover:bg-indigo-700 rounded-lg text-xs text-white"
                    >
                      + {part}
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {assembledParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-emerald-900 border border-emerald-600 rounded-lg text-xs text-emerald-100 flex items-center gap-1"
                    >
                      {part}
                      <button
                        aria-label={`Remove part: ${part}`}
                        onClick={() => setAssembledParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200 ml-1 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {assembledParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click parts above to assemble entry...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(assembledParts.join(' '))}
                  disabled={showExplanation || assembledParts.length === 0}
                  aria-label="Verify Accounting Entry"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl"
                >
                  Verify Accounting Entry
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-xl border border-emerald-700/60 space-y-3"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Step-by-Step Accounting Audit Walkthrough:
                </div>

                {activeChallenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-emerald-400">{idx + 1}.</span>{' '}
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    aria-label="Show Next Audit Step"
                    className="px-3.5 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold"
                  >
                    Show Next Audit Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    aria-label="Proceed to Next Challenge or Final Report"
                    className="mt-3 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg block"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Finalise Audit Report →'
                      : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 space-y-6"
        >
          {/* Summary Score Card */}
          <div className="p-6 bg-gradient-to-br from-slate-900 via-emerald-950/60 to-slate-900 rounded-3xl border border-emerald-600/60 shadow-2xl text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-white">ISC Accountancy Audit Complete!</h2>
            <div className="text-4xl md:text-5xl font-black text-emerald-400 font-mono">
              {Math.max(0, 100 - errors * 5)}%
            </div>
            <div className="text-xs text-slate-300">
              Mastery Tier:{' '}
              <span className="font-bold text-emerald-400 uppercase">{masteryLevel}</span> (Adapted via BKT Engine)
            </div>

            <div className="pt-2">
              <h3 className="text-base md:text-lg font-bold text-amber-300 mb-1">
                {feedbackData.title}
              </h3>
              <p className="text-xs md:text-sm text-emerald-200/90 max-w-xl mx-auto">
                {feedbackData.message}
              </p>
            </div>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <div className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>⚠️</span> Identified Misconception Profile (Review Before Exams):
              </div>
              {hitMisconceptions.map((idx, i) => {
                const item = misconceptions?.[idx];
                if (!item) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                    <div className="text-rose-300 font-bold">✗ Common Trap: {item.misconception}</div>
                    <div className="text-emerald-300 mt-1">✓ ISC Standard Rule: {item.correction}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition (SRS) Prominent Status & Visibility */}
          <div className="p-5 bg-gradient-to-r from-indigo-950/80 to-purple-950/80 rounded-2xl border border-indigo-500/50 shadow-lg flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-base" role="img" aria-label="Calendar">📅</span>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Spaced Repetition System (SRS)
                </span>
              </div>
              <p className="text-sm font-semibold text-white">
                Recommended Schedule:{' '}
                <span className="text-amber-300 font-bold font-mono">
                  {errors === 0
                    ? 'review in 7 days (Optimal Mastery)'
                    : errors <= 3
                    ? 'review in 3 days (Reinforce Concepts)'
                    : 'review in 1 day (Targeted Practice)'}
                </span>
              </p>
              <p className="text-xs text-indigo-200/80">
                Next review scheduled: {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'} to optimize long-term memory retention.
              </p>
            </div>
            <div className="px-3 py-1.5 bg-indigo-900/60 border border-indigo-400/40 rounded-xl text-center">
              <div className="text-[10px] text-indigo-300 font-bold uppercase">Next Review</div>
              <div className="text-sm font-black text-amber-300 font-mono">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </div>
            </div>
          </div>

          {/* Real World Application Arc */}
          <div className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-3">
            <h4 className="text-sm font-bold text-emerald-300">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE VISUAL FEEDBACK POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Audit Step Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}
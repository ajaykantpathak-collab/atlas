'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import * as d3 from 'd3';

// ─── NODE IDS ───
const NODE_C11_ACC_011 = 'c11_acc_011';
const NODE_C11_ACC_012 = 'c11_acc_012';
const NODE_C11_ACC_013 = 'c11_acc_013';
const NODE_C11_ACC_014 = 'c11_acc_014';
const NODE_C11_ACC_015 = 'c11_acc_015';
const NODE_C11_ACC_016 = 'c11_acc_016';
const NODE_C11_ACC_017 = 'c11_acc_017';
const NODE_C11_ACC_018 = 'c11_acc_018';
const NODE_C11_ACC_019 = 'c11_acc_019';
const NODE_C11_ACC_020 = 'c11_acc_020';

const ALL_NODE_IDS = [
  NODE_C11_ACC_011,
  NODE_C11_ACC_012,
  NODE_C11_ACC_013,
  NODE_C11_ACC_014,
  NODE_C11_ACC_015,
  NODE_C11_ACC_016,
  NODE_C11_ACC_017,
  NODE_C11_ACC_018,
  NODE_C11_ACC_019,
  NODE_C11_ACC_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Bharat TexTech Enterprises: The Year-End Audit Crisis',
  intro: 'Bharat TexTech Enterprises (Surat) is closing its books for FY 2024-25 before an international audit and IPO evaluation. The chief accountant abruptly resigned, leaving unrecorded invoices, unadjusted accruals, unbalanced ledgers, and conflicting accounting policies.',
  context: 'As lead forensic accounting consultant, your mission is to establish standards compliance (AS & IFRS/Ind-AS), verify the Accounting Equation, journalise key events, post & balance T-accounts, and execute year-end adjusting/closing entries to present a true and fair view under Section 128/133 of the Companies Act 2013.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Bharat TexTech purchased textile machinery for ₹10,00,000 on credit from L&T. The accountant debited Machinery ₹10,00,000 and credited Capital ₹10,00,000. What is fundamentally wrong?',
  options: [
    'Nothing is wrong; the business owns more assets, so the owner’s capital automatically increases.',
    'Capital represents the owner’s equity; outsider financing creates a Liability (L&T Creditor), not Owner’s Capital.',
    'Machinery should have been credited because it entered the factory.',
    'Cash must always be debited whenever fixed assets are bought.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Assets = Liabilities + Capital. An asset financed by an external vendor increases Liabilities, not Owner’s Capital!',
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

// ─── CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  // 1. AS Meaning & Legal Framework (c11_acc_011) - Foundation
  {
    id: 'ch_acc_001',
    nodeId: NODE_C11_ACC_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under which statutory section of the Companies Act 2013 are Indian Accounting Standards (AS) given mandatory legal force for companies?',
    options: ['Section 133 read with Rule 7', 'Section 128(1)', 'Section 143(3)', 'Section 2(85)'],
    correctIndex: 0,
    explanation: 'Section 133 of the Companies Act 2013, read with Rule 7 of the Companies (Accounts) Rules 2014, mandates compliance with Accounting Standards notified by the Central Government.',
    hints: [
      'Look for the section specifically empowering the Central Government to notify accounting standards upon ICAI/NFRA recommendation.',
      'Section 128 deals with books of account, while this section is in Chapter IX (Accounts of Companies) specifically for standards.',
      'The section number is 133.',
    ],
    misconceptionIndex: 2,
  },

  // 2. AS-2 Valuation of Inventories (c11_acc_011) - Application
  {
    id: 'ch_acc_002',
    nodeId: NODE_C11_ACC_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Bharat TexTech holds 2,000 cotton suits costing ₹1,500 each. Due to market shifts, expected selling price is ₹1,400 per suit with ₹50 selling expenses per suit. At what total valuation (in Lakhs of ₹) must inventory appear on the Balance Sheet per AS-2?',
    correctAnswer: 27,
    tolerance: 0.1,
    unit: 'Lakh ₹',
    explanation: 'Per AS-2, inventory is valued at lower of Cost (��1,500) or Net Realisable Value (NRV). NRV = Estimated Selling Price (₹1,400) − Selling Cost (₹50) = ₹1,350. Total = 2,000 × ₹1,350 = ₹27,00,000 = ₹27 Lakhs.',
    hints: [
      'Compute Net Realisable Value (NRV) per unit by subtracting selling costs from selling price.',
      'NRV = ₹1,400 − ₹50 = ₹1,350. Compare ₹1,350 with Cost of ₹1,500.',
      'Take the lower figure (₹1,350) and multiply by 2,000 units = ₹27,00,000 = 27 Lakhs.',
    ],
    misconceptionIndex: 0,
  },

  // 3. IFRS vs Ind-AS Convergence (c11_acc_012) - Understanding
  {
    id: 'ch_acc_003',
    nodeId: NODE_C11_ACC_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How did India adopt the International Financial Reporting Standards (IFRS) framework for corporate financial reporting?',
    options: [
      'Direct verbatim adoption of IFRS without any modifications.',
      'Convergence with IFRS through notified Ind-AS with specific country carve-outs.',
      'Rejection of IFRS in favour of traditional British single-entry guidelines.',
      'Voluntary recommendation applicable only to non-profit charitable trusts.',
    ],
    correctIndex: 1,
    explanation: 'India converged with IFRS through Ind-AS (notified under Companies Rules 2015), introducing deliberate carve-outs/modifications to fit Indian regulatory and economic reality.',
    hints: [
      'Think about whether India copied the wordings 100% or modified them for Indian statutes.',
      'The process is called "Convergence", leading to Indian Accounting Standards (Ind-AS).',
      'Select the option highlighting convergence with country-specific carve-outs.',
    ],
    misconceptionIndex: 1,
  },

  // 4. Accounting Equation Construction (c11_acc_013) - Construct
  {
    id: 'ch_acc_004',
    nodeId: NODE_C11_ACC_013,
    type: 'construct',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Assemble the fundamental Accounting Equation and its derivative expressing owner’s residual equity.',
    availableParts: ['Assets', '=', 'Liabilities', '+', 'Capital', '-', 'Drawings'],
    targetState: 'Assets = Liabilities + Capital',
    validationHint: 'Form the core equation: Assets = Liabilities + Capital',
    explanation: 'The fundamental accounting equation states Assets = Liabilities + Capital, proving that all business resources are financed either by creditors or the owner.',
    hints: [
      'Start with the left side representing everything the firm owns.',
      'What you own (Assets) equals what you owe outsiders plus owner funds.',
      'Assemble: Assets = Liabilities + Capital',
    ],
    misconceptionIndex: 0,
  },

  // 5. Accounting Equation Effect of Drawings (c11_acc_013) - Analysis
  {
    id: 'ch_acc_005',
    nodeId: NODE_C11_ACC_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'The proprietor withdraws ₹50,000 cash from the business for personal domestic expenses. How does this impact the Accounting Equation?',
    options: [
      'Assets (Cash) decrease by ₹50,000; Capital decreases by ₹50,000.',
      'Assets (Cash) decrease by ₹50,000; Capital increases by ₹50,000 because owner received money.',
      'Assets (Cash) decrease by ₹50,000; Liabilities increase by ₹50,000.',
      'No change in capital because the owner took their own money.',
    ],
    correctIndex: 0,
    explanation: 'Under the Business Entity Concept, the owner and business are separate. Drawings extract economic resources out of the business, reducing both Cash (Asset) and the owner’s residual stake (Capital).',
    hints: [
      'Does the business possess more cash or less cash after the withdrawal?',
      'Does the owner’s net invested stake inside the firm increase or decrease?',
      'Cash drops by ₹50k, and owner equity (Capital) shrinks by ₹50k.',
    ],
    misconceptionIndex: 0,
  },

  // 6. Classification of Accounts: Modern & Traditional (c11_acc_014) - Drag Label
  {
    id: 'ch_acc_006',
    nodeId: NODE_C11_ACC_014,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each account to its Modern Account Classification category.',
    dragItems: [
      { label: 'Bank Loan A/c', targetId: 'target_liab' },
      { label: 'Goodwill A/c', targetId: 'target_asset' },
      { label: 'Rent Paid A/c', targetId: 'target_exp' },
      { label: 'Commission Received A/c', targetId: 'target_rev' },
    ],
    correctMapping: {
      target_liab: 'Bank Loan A/c',
      target_asset: 'Goodwill A/c',
      target_exp: 'Rent Paid A/c',
      target_rev: 'Commission Received A/c',
    },
    explanation: 'Under modern classification: Goodwill is an Asset, Bank Loan is an external Liability, Rent Paid is an Expense, and Commission Received is Revenue.',
    hints: [
      'Goodwill is an intangible resource owned by the firm.',
      'A loan from a bank is a repayment obligation to an outsider.',
      'Rent paid is an expired operational cost; commission received is an income.',
    ],
    misconceptionIndex: 2,
  },

  // 7. Rules of Double Entry: Golden Rules (c11_acc_015) - Application
  {
    id: 'ch_acc_015_a',
    nodeId: NODE_C11_ACC_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Tata Motors paid ₹45,000 salary to factory supervisors in cash. Applying traditional rules, which justification is 100% correct?',
    options: [
      'Debit Salary (Nominal A/c - debit all expenses); Credit Cash (Real A/c - credit what goes out).',
      'Debit Cash (Real A/c - debit what comes in); Credit Salary (Nominal A/c - credit all expenses).',
      'Debit Salary (Personal A/c - debit the receiver); Credit Cash (Nominal A/c - credit income).',
      'Debit Bank (Real A/c); Credit Salary (Liability A/c).',
    ],
    correctIndex: 0,
    explanation: 'Salary is a Nominal account representing an expense (Debit all expenses). Cash is a Real account representing tangible currency leaving the business (Credit what goes out).',
    hints: [
      'Classify Salary (expense) and Cash (physical asset).',
      'Traditional nominal rule: Debit expenses, credit incomes.',
      'Traditional real rule: Debit what comes in, credit what goes out.',
    ],
    misconceptionIndex: 2,
  },

  // 8. Opening Journal Entry: Capital Balancing Figure (c11_acc_016) - Numeric
  {
    id: 'ch_acc_008',
    nodeId: NODE_C11_ACC_016,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'On 1 April 2024, opening balances are: Cash ₹50,000, Bank ₹2,50,000, Debtors ₹1,80,000, Stock ₹3,20,000, Machinery ₹6,00,000; Creditors ₹2,40,000, Bank Loan ₹3,60,000. Calculate the Opening Capital balancing figure in Rupees.',
    correctAnswer: 800000,
    tolerance: 1000,
    unit: '₹',
    explanation: 'Total Assets = ₹50,000 + ₹2,50,000 + ₹1,80,000 + ₹3,20,000 + ₹6,00,000 = ₹14,00,000. Total Liabilities = ₹2,40,000 + ₹3,60,000 = ₹6,00,000. Opening Capital = Assets − Liabilities = ₹14,00,000 − ₹6,00,000 = ₹8,00,000.',
    hints: [
      'Sum all 5 asset accounts first to find Total Assets.',
      'Sum the 2 external liabilities (Creditors + Bank Loan) to find Total Liabilities.',
      'Capital = ₹14,00,000 − ₹6,00,000 = ₹8,00,000.',
    ],
    misconceptionIndex: 1,
  },

  // 9. Compound Journal Entry Identification (c11_acc_016) - Analysis
  {
    id: 'ch_acc_009',
    nodeId: NODE_C11_ACC_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'Which of the following represents a valid compound journal entry under ISC regulations?',
    options: [
      'Paid ₹30,000 Rent and ₹20,000 Wages on the same day via a single cheque of ₹50,000.',
      'Purchased furniture on credit from Godrej and paid electricity bill of shop by cash in one combined entry.',
      'Sold goods to Ram on 5th May and received payment from Shyam on 12th May in one entry.',
      'Introduced capital in May and took a bank loan in December in one entry.',
    ],
    correctIndex: 0,
    explanation: 'A compound entry combines multiple debits or credits arising from a SINGLE economic event on the same date (e.g. one cheque paying two operational costs).',
    hints: [
      'Compound entries require same date AND same unified economic transaction/settlement mechanism.',
      'Look for the option where one single cheque covers two expenses on the same date.',
      'Option A satisfies both criteria.',
    ],
    misconceptionIndex: 0,
  },

  // 10. GST Mechanics (c11_acc_017) - Understanding
  {
    id: 'ch_acc_010',
    nodeId: NODE_C11_ACC_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Infosys (Bengaluru, Karnataka) provides IT consultancy worth ₹10,00,000 to a client in Mumbai (Maharashtra) with GST rate of 18%. How is the tax levied?',
    options: [
      '18% IGST (₹1,80,000) collected by Central Government for destination state apportionment.',
      '9% CGST (₹90,000) + 9% SGST (₹90,000) payable to Karnataka State Government.',
      '9% CGST + 9% SGST payable to Maharashtra State Government directly.',
      '0% GST because IT consultancy across state borders is exempt from taxation.',
    ],
    correctIndex: 0,
    explanation: 'Inter-state supplies (Karnataka to Maharashtra) attract Integrated Goods and Services Tax (IGST) at the full rate (18%) under Section 5 of the IGST Act 2017.',
    hints: [
      'Identify whether Bengaluru to Mumbai is Intra-state (same state) or Inter-state (different states).',
      'Inter-state transactions do not split into CGST/SGST.',
      'The entire 18% is levied as IGST.',
    ],
    misconceptionIndex: 1,
  },

  // 11. GST Input Tax Credit (ITC) (c11_acc_017) - Application
  {
    id: 'ch_acc_011',
    nodeId: NODE_C11_ACC_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A manufacturer pays ₹36,000 IGST on raw materials. They add value and sell finished goods with ₹54,000 Output IGST. How much NET tax (in ₹) is payable to the government after claiming Input Tax Credit (ITC)?',
    correctAnswer: 18000,
    tolerance: 100,
    unit: '₹',
    explanation: 'Net GST Payable = Output GST (₹54,000) − Input Tax Credit (₹36,000) = ₹18,000, representing 18% tax strictly on the value added, eliminating tax cascading.',
    hints: [
      'Input Tax Credit (ITC) allows deduction of taxes already paid on inputs.',
      'Subtract Input IGST (₹36,000) from Output IGST (₹54,000).',
      'Net Tax Payable = ₹54,000 − ₹36,000 = ₹18,000.',
    ],
    misconceptionIndex: 0,
  },

  // 12. Ledger Posting Mechanics (c11_acc_018) - Understanding
  {
    id: 'ch_acc_012',
    nodeId: NODE_C11_ACC_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A journal entry reads: "Purchases A/c Dr ₹1,00,000 To Adani Enterprises A/c ₹1,00,000". How is this posted to the Purchases Ledger Account?',
    options: [
      'On the DEBIT side, write "To Adani Enterprises A/c ₹1,00,000".',
      'On the CREDIT side, write "By Purchases A/c ₹1,00,000".',
      'On the DEBIT side, write "To Purchases A/c ₹1,00,000".',
      'On the CREDIT side, write "By Adani Enterprises A/c ₹1,00,000".',
    ],
    correctIndex: 0,
    explanation: 'In ledger posting, the debited account receives the posting on its DEBIT side, recording the name of the corresponding credited account prefixed with "To".',
    hints: [
      'Purchases is debited in the journal, so post on the DEBIT (left) side of Purchases A/c.',
      'The Particulars column must name the OTHER account (Adani Enterprises).',
      'Debit side entries use the prefix "To".',
    ],
    misconceptionIndex: 0,
  },

  // 13. Audit Trail: Folio Cross-Referencing (c11_acc_018) - Analysis
  {
    id: 'ch_acc_013',
    nodeId: NODE_C11_ACC_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why are L.F. (Ledger Folio) in the Journal and J.F. (Journal Folio) in the Ledger mandatory in accounting audits under Section 128?',
    options: [
      'They establish an unbroken bidirectional audit trail allowing any ledger entry to be traced back to original evidence.',
      'They represent discount percentages allowed to credit debtors.',
      'They are serial numbers used only for calculating GST tax liabilities.',
      'They denote whether an account is real, personal, or nominal.',
    ],
    correctIndex: 0,
    explanation: 'L.F. and J.F. provide bidirectional cross-referencing between books of original entry and final ledgers, creating verifiable audit trails required by statutory auditors.',
    hints: [
      'What happens if an auditor sees a figure in a ledger and wants to verify the date and narration?',
      'The folio numbers link journal pages with ledger account pages.',
      'It creates an auditable cross-reference.',
    ],
    misconceptionIndex: 1,
  },

  // 14. Ledger Balancing: Balance c/d vs b/d (c11_acc_019) - Application
  {
    id: 'ch_acc_014',
    nodeId: NODE_C11_ACC_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Machinery Account has a Debit total of ₹10,00,000 and Credit total (Depreciation) of ₹1,50,000 on 31 March. How should it be balanced?',
    options: [
      'Credit side: "By Balance c/d ₹8,50,000" on 31 March; Debit side: "To Balance b/d ₹8,50,000" on 1 April.',
      'Debit side: "To Balance c/d ₹8,50,000" on 31 March; Credit side: "By Balance b/d ₹8,50,000" on 1 April.',
      'Transfer ₹8,50,000 immediately to Trading Account debit.',
      'Credit side: "By Trading A/c ₹8,50,000" because machinery is used in factory.',
    ],
    correctIndex: 0,
    explanation: 'Real accounts (Assets) are balanced, not closed. Balance c/d is placed on the lighter side (Credit) to equalize totals, then brought down (Balance b/d) on the natural debit side for the next year.',
    hints: [
      'Machinery is an asset (Real A/c) so it carries forward to the Balance Sheet.',
      'Balance c/d goes on the LIGHTER side to equalize totals.',
      'Next year opens with Balance b/d on the heavier (Debit) side.',
    ],
    misconceptionIndex: 1,
  },

  // 15. Nominal Accounts: Trading vs P&L Transfer (c11_acc_019) - Drag Sort
  {
    id: 'ch_acc_015',
    nodeId: NODE_C11_ACC_019,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the ledger accounts by where they are closed at year-end: (1) Direct Cost to Trading A/c, (2) Direct Revenue to Trading A/c, (3) Indirect Admin Cost to P&L A/c, (4) Asset to Balance Sheet.',
    sortItems: [
      'Carriage Inward A/c (Factory transport)',
      'Sales A/c (Direct core turnover)',
      'Office Salaries A/c (Administration)',
      'Plant & Machinery A/c (Fixed Asset)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Carriage Inward (direct cost) and Sales (direct revenue) close to Trading A/c. Office Salary (indirect cost) closes to P&L A/c. Plant & Machinery (asset) is balanced and carried to Balance Sheet.',
    hints: [
      'Direct factory expenses go to Trading A/c first.',
      'Direct core revenue (Sales) also belongs to Trading A/c.',
      'Office expenses go to P&L, while capital assets are balanced for the Balance Sheet.',
    ],
    misconceptionIndex: 0,
  },

  // 16. Year-End Adjusting Entry: Prepaid Expense (c11_acc_020) - Application
  {
    id: 'ch_acc_016',
    nodeId: NODE_C11_ACC_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'On 1 January 2025, Bharat TexTech paid ₹1,20,000 fire insurance for 1 full year (up to 31 Dec 2025). The financial year ends on 31 March 2025. What is the correct adjusting entry?',
    options: [
      'Prepaid Insurance A/c Dr ₹90,000 / To Insurance A/c ₹90,000',
      'Insurance A/c Dr ₹90,000 / To Prepaid Insurance A/c ₹90,000',
      'Prepaid Insurance A/c Dr ₹30,000 / To Insurance A/c ₹30,000',
      'Profit & Loss A/c Dr ₹1,20,000 / To Insurance A/c ₹1,20,000',
    ],
    correctIndex: 0,
    explanation: '3 months (Jan-Mar) belong to this year (₹30,000 expense). 9 months (Apr-Dec) are prepaid (₹90,000). The adjusting entry creates an asset (Debit Prepaid Insurance ₹90k) and reduces the expense account (Credit Insurance ₹90k).',
    hints: [
      'Calculate unexpired months: April to December = 9 months out of 12.',
      'Prepaid amount = ₹1,20,000 × 9/12 = ₹90,000.',
      'To reduce an expense with a debit balance, CREDIT Insurance and DEBIT Prepaid Insurance (Asset).',
    ],
    misconceptionIndex: 0,
  },

  // 17. Year-End Adjusting Entry: Outstanding Expense (c11_acc_020) - Application
  {
    id: 'ch_acc_017',
    nodeId: NODE_C11_ACC_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Factory wages of ₹40,000 for March 2025 remain unpaid on 31 March 2025. What adjusting journal entry is required under the accrual principle?',
    options: [
      'Wages A/c Dr ₹40,000 / To Outstanding Wages A/c ₹40,000',
      'Outstanding Wages A/c Dr ₹40,000 / To Wages A/c ₹40,000',
      'Trading A/c Dr ₹40,000 / To Cash A/c ₹40,000',
      'Wages A/c Dr ₹40,000 / To Bank A/c ₹40,000',
    ],
    correctIndex: 0,
    explanation: 'Accrual concept mandates recognizing expenses when incurred. Debit Wages (increases direct expense) and Credit Outstanding Wages (creates current liability).',
    hints: [
      'Has the work been done by workers? Yes, so expense has increased.',
      'Has cash been paid? No, so a liability has been created.',
      'Debit Wages A/c, Credit Outstanding Wages A/c.',
    ],
    misconceptionIndex: 2,
  },

  // 18. Sequence of Year-End Entries (c11_acc_020) - Evaluation
  {
    id: 'ch_acc_018',
    nodeId: NODE_C11_ACC_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate what occurs if an enterprise passes Closing Entries to the P&L Account BEFORE passing Adjusting Entries for outstanding and prepaid items.',
    options: [
      'Unadjusted cash-basis nominal balances get closed into P&L, producing a distorted and legally non-compliant net profit figure.',
      'No effect, because the accounting software automatically retroactively modifies closed final accounts.',
      'The Balance Sheet balances, but gross profit turns negative automatically.',
      'Adjusting entries can never be passed if closing entries are executed first.',
    ],
    correctIndex: 0,
    explanation: 'Closing entries transfer nominal balances to final accounts. If passed before adjustments, unadjusted cash-basis figures are transferred, violating AS-1 and distorting true profit.',
    hints: [
      'What balances do closing entries transfer?',
      'If you close before adjusting, did the P&L receive the true accrual cost?',
      'Unadjusted figures will lead to distorted and non-compliant financial statements.',
    ],
    misconceptionIndex: 1,
  },

  // 19. Practical Accrual Calculation (c11_acc_020) - Numeric
  {
    id: 'ch_acc_019',
    nodeId: NODE_C11_ACC_020,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Bharat TexTech invested ₹10,00,000 in 12% Government Bonds on 1 October 2024. Interest is receivable annually on 30 September. For the year ending 31 March 2025, calculate the Accrued Interest on Bonds (in ₹) to be adjusted.',
    correctAnswer: 60000,
    tolerance: 100,
    unit: '₹',
    explanation: 'Annual Interest = 12% of ₹10,00,000 = ₹1,20,000. Period from 1 Oct 2024 to 31 Mar 2025 = 6 months. Accrued Interest earned = ₹1,20,000 × 6/12 = ₹60,000.',
    hints: [
      'Calculate interest for 6 months (1 October 2024 to 31 March 2025).',
      'Formula: Principal × Rate × (6/12) = ₹10,00,000 × 0.12 × 0.5.',
      'Interest earned = ₹60,000.',
    ],
    misconceptionIndex: 0,
  },

  // 20. Settlement Compound Entry (c11_acc_016) - Analysis
  {
    id: 'ch_acc_020',
    nodeId: NODE_C11_ACC_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Bharat TexTech settles a debt of ₹1,00,000 owed to supplier Vardhman Ltd by paying ₹96,000 via RTGS bank transfer in full settlement. What is the correct compound journal entry?',
    options: [
      'Vardhman Ltd A/c Dr ₹1,00,000 / To Bank A/c ₹96,000 / To Discount Received A/c ₹4,000',
      'Bank A/c Dr ₹96,000 / Discount Allowed A/c Dr ₹4,000 / To Vardhman Ltd A/c ₹1,00,000',
      'Vardhman Ltd A/c Dr ₹96,000 / To Bank A/c ₹96,000',
      'Purchases A/c Dr ₹1,00,000 / To Bank A/c ₹96,000 / To Capital A/c ₹4,000',
    ],
    correctIndex: 0,
    explanation: 'Liability to Vardhman Ltd decreases in full (Debit ₹1,00,000). Bank asset decreases by amount paid (Credit ₹96,000). Discount received is a nominal income/gain (Credit ₹4,000).',
    hints: [
      'The creditor’s total account must be cancelled (Debit Vardhman Ltd ₹1,00,000).',
      'Bank cash outflow is ₹96,000 (Credit Bank).',
      'The ₹4,000 concession is an income gain: Credit Discount Received.',
    ],
    misconceptionIndex: 0,
  },
];

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
  nodeId: 'c11_acc_011',
  title: 'Accounting Standards, Journal, Ledger & Year-End Adjustments',
  definition: 'Accounting Standards and the Double Entry bookkeeping pipeline convert raw business transactions into systematically classified, balanced, and adjusted financial statements under the Companies Act 2013.',
  eli5: 'Think of accounting like a professional kitchen: Accounting Standards are the food safety laws, the Journal is the kitchen order ticket, Ledgers are separate storage jars for each ingredient, and Year-End Adjustments ensure today’s recipes count today’s ingredients!',
  misconceptions: [
    {
      misconception: 'Drawings increase owner’s capital because the owner takes money belonging to them.',
      correction: 'Drawings extract assets out of the business and reduce owner’s residual capital under the Business Entity Concept.',
    },
    {
      misconception: 'India has adopted IFRS directly word-for-word.',
      correction: 'India has converged with IFRS through Ind-AS, retaining specific carve-outs to accommodate domestic economic conditions.',
    },
    {
      misconception: 'Traditional and Modern account classification rules produce contradictory journal entries.',
      correction: 'Both rule systems are structurally equivalent and always produce identical debits and credits when applied consistently.',
    },
    {
      misconception: 'Balance c/d is written on the heavier side of a ledger account.',
      correction: 'Balance c/d is written on the lighter side to equalize column totals, and brought down as Balance b/d on the heavier natural side.',
    },
    {
      misconception: 'For prepaid expenses, one should debit the Expense Account again.',
      correction: 'Prepaid expenses create an asset (Debit Prepaid Expense) and reduce the existing expense account (Credit Expense).',
    },
  ],
  masteryCriteria: 'Mastery across AS/IFRS, Accounting Equation balancing, Journalising, T-Account posting, and Year-End Adjusting/Closing mechanics.',
};

// ─── BRILLIANT EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Standardisation: AS-2 Inventory Valuation Rule',
    instruction: 'Adjust the Market Selling Price slider to see how AS-2 mandates lower of Cost or NRV in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_ACC_011,
  },
  {
    title: '2. The Dynamic Accounting Equation Balance Scale',
    instruction: 'Inject transactions (Capital, Credit Purchases, Expenses, Drawings) and observe how the scale maintains perfect balance.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_ACC_013,
  },
  {
    title: '3. Golden Rules & Journal Entry Interactive Matrix',
    instruction: 'Select transaction types to view account classification (Traditional vs Modern) and the auto-generated journal entry.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_ACC_015,
  },
  {
    title: '4. Ledger Posting & T-Account Balancing Visualizer',
    instruction: 'Post journal entries into the T-Account and watch the automatic Balance c/d and b/d placement.',
    interactionType: 'drag-position',
    nodeId: NODE_C11_ACC_018,
  },
  {
    title: '5. Year-End Accrual Adjusting & Closing Pipeline',
    instruction: 'Toggle between Cash-Basis and Accrual-Basis to see how Adjusting entries prevent profit distortion.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_ACC_020,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If market price of inventory crashes below manufacturing cost, how must the Balance Sheet valuation change per AS-2?',
    options: [
      'Valuation must write down to Net Realisable Value (NRV), recognising the anticipated loss immediately.',
      'Valuation stays at cost until items are physically sold.',
      'Valuation increases to reflect future inflation.',
      'Inventory is removed completely from the balance sheet.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the Market Selling Price slider below ₹1,500 cost to verify that the valuation drops in real time.',
    nodeId: NODE_C11_ACC_011,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe when you record an expense payment (e.g. ₹20,000 Rent) in the Accounting Equation scale?',
    observableOptions: [
      'Assets (Cash) decrease and Capital decreases by the same amount, keeping the scale in balance.',
      'Liabilities increase while Assets decrease.',
      'Capital increases because rent was paid to expand operations.',
      'Only Cash decreases; Capital is unaffected.',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_ACC_013,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Forensic Audit Report: Indian Corporate Compliance',
  description: 'Examine the published annual report extract of an Indian enterprise (e.g., Tata Steel or Reliance Industries). Identify Note 2 (Significant Accounting Policies), verify AS-1/Ind-AS compliance, locate the Inventory valuation method (AS-2 / Ind-AS 2), and trace an outstanding accrual on the Balance Sheet.',
  steps: [
    'Download the latest audited Annual Report (PDF) of any NSE-listed Indian company.',
    'Navigate to Notes to Accounts Note 1 or 2: Confirm compliance with Ind-AS notified under Companies Rules 2015.',
    'Check the Inventory Note: Verify if valuation is stated as "Lower of Cost and Net Realisable Value".',
    'Locate Current Liabilities: Identify "Trade Payables" and "Other Financial Liabilities (Outstanding Expenses)".',
  ],
};

export function C11_AccountancyAccountingStandardsMeaningSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['acc'] || { name: 'Accountancy', emoji: '📊', color: 'indigo' };

  // Phase State: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Multi-representation selector tab
  const [activeRepTab, setActiveRepTab] = useState<'algebraic' | 't-diagram' | 'dual-matrix'>('algebraic');

  // Brilliant Exploration Interactive State
  const [inventoryCost, setInventoryCost] = useState(1500);
  const [marketSellingPrice, setMarketSellingPrice] = useState(1350);
  const [sellingExpenses, setSellingExpenses] = useState(50);

  // Accounting Equation Interactive Sandbox Variables
  const [cashAsset, setCashAsset] = useState(500000);
  const [bankAsset, setBankAsset] = useState(700000);
  const [stockAsset, setStockAsset] = useState(300000);
  const [machineryAsset, setMachineryAsset] = useState(600000);
  const [creditorsLiab, setCreditorsLiab] = useState(300000);
  const [bankLoanLiab, setBankLoanLiab] = useState(200000);
  const [ownerCapital, setOwnerCapital] = useState(1600000);

  // Dynamic Equation Computed Values
  const totalAssets = useMemo(() => cashAsset + bankAsset + stockAsset + machineryAsset, [cashAsset, bankAsset, stockAsset, machineryAsset]);
  const totalLiabAndCap = useMemo(() => creditorsLiab + bankLoanLiab + ownerCapital, [creditorsLiab, bankLoanLiab, ownerCapital]);
  const isEquationBalanced = useMemo(() => totalAssets === totalLiabAndCap, [totalAssets, totalLiabAndCap]);

  // Golden Rules Explorer State
  const [selectedTxType, setSelectedTxType] = useState<'capital' | 'machinery_credit' | 'salary_cash' | 'sale_cash' | 'drawings'>('machinery_credit');

  // Ledger Posting Simulator State
  const [ledgerDebitPostings, setLedgerDebitPostings] = useState<{ date: string; particular: string; jf: string; amount: number }[]>([
    { date: '01-Apr', particular: 'To Balance b/d', jf: 'J-1', amount: 500000 },
    { date: '10-Apr', particular: 'To Sales A/c', jf: 'J-4', amount: 150000 },
  ]);
  const [ledgerCreditPostings, setLedgerCreditPostings] = useState<{ date: string; particular: string; jf: string; amount: number }[]>([
    { date: '15-Apr', particular: 'By Purchases A/c', jf: 'J-7', amount: 200000 },
    { date: '25-Apr', particular: 'By Salary A/c', jf: 'J-10', amount: 50000 },
  ]);

  // Year-End Accrual Simulator State
  const [isAccrualEnabled, setIsAccrualEnabled] = useState(true);
  const [nominalExpensePaid, setNominalExpensePaid] = useState(90000);
  const [outstandingExpenseAmt, setOutstandingExpenseAmt] = useState(10000);
  const [prepaidInsuranceAmt, setPrepaidInsuranceAmt] = useState(15000);

  // Predict & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Adaptive Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Input state for challenges
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery phase state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback FX state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconceptions tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Persistent BKT & Timer Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGE FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY INITIALIZER ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE DIFFICULTY HOOK ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS BALANCE ANIMATION LOOP ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      angle += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const midX = canvas.width / 2;
      const baseY = canvas.height - 20;

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(midX, baseY);
      ctx.lineTo(midX, 40);
      ctx.stroke();

      // Fulcrum triangle
      ctx.fillStyle = '#4f46e5';
      ctx.beginPath();
      ctx.moveTo(midX - 25, baseY);
      ctx.lineTo(midX + 25, baseY);
      ctx.lineTo(midX, baseY - 35);
      ctx.closePath();
      ctx.fill();

      // Scale Beam Tilt calculation
      const diff = totalAssets - totalLiabAndCap;
      const tilt = Math.max(-0.25, Math.min(0.25, (diff / 2000000) * 0.3));
      const dynamicTilt = tilt + Math.sin(angle) * (diff === 0 ? 0.015 : 0.005);

      const beamLength = 200;
      const leftX = midX - Math.cos(dynamicTilt) * beamLength;
      const leftY = 40 - Math.sin(dynamicTilt) * beamLength;
      const rightX = midX + Math.cos(dynamicTilt) * beamLength;
      const rightY = 40 + Math.sin(dynamicTilt) * beamLength;

      // Draw Beam
      ctx.strokeStyle = diff === 0 ? '#10b981' : '#f43f5e';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(leftX, leftY);
      ctx.lineTo(rightX, rightY);
      ctx.stroke();

      // Left Pan (Assets)
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(leftX, leftY);
      ctx.lineTo(leftX - 25, leftY + 45);
      ctx.moveTo(leftX, leftY);
      ctx.lineTo(leftX + 25, leftY + 45);
      ctx.stroke();

      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.ellipse(leftX, leftY + 45, 40, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Right Pan (Liabilities + Capital)
      ctx.beginPath();
      ctx.moveTo(rightX, rightY);
      ctx.lineTo(rightX - 25, rightY + 45);
      ctx.moveTo(rightX, rightY);
      ctx.lineTo(rightX + 25, rightY + 45);
      ctx.stroke();

      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.ellipse(rightX, rightY + 45, 40, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Labels on Canvas
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'center';
      ctx.fillText(`Assets: ₹${(totalAssets / 100000).toFixed(2)}L`, leftX, leftY + 68);

      ctx.fillStyle = '#a855f7';
      ctx.fillText(`L + C: ₹${(totalLiabAndCap / 100000).toFixed(2)}L`, rightX, rightY + 68);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [totalAssets, totalLiabAndCap]);

  // ─── CALLBACK HANDLERS ───
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
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! You spotted the liability correctly.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore accounting standards and the double-entry mechanics interactively.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the free-play accounting laboratory. Test any transaction freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the forensic examination challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! The dual effect preserves balance.' : 'Observe how both sides change in unison.');
  }, []);

  const handleTransactionInject = useCallback((type: 'capital' | 'machinery_credit' | 'salary_cash' | 'sale_cash' | 'drawings') => {
    audioManager.play('count');
    if (type === 'capital') {
      setCashAsset((c) => c + 200000);
      setOwnerCapital((cap) => cap + 200000);
    } else if (type === 'machinery_credit') {
      setMachineryAsset((m) => m + 300000);
      setCreditorsLiab((cl) => cl + 300000);
    } else if (type === 'salary_cash') {
      setCashAsset((c) => Math.max(0, c - 40000));
      setOwnerCapital((cap) => cap - 40000);
    } else if (type === 'sale_cash') {
      setCashAsset((c) => c + 150000);
      setStockAsset((s) => Math.max(0, s - 100000));
      setOwnerCapital((cap) => cap + 50000);
    } else if (type === 'drawings') {
      setCashAsset((c) => Math.max(0, c - 30000));
      setOwnerCapital((cap) => cap - 30000);
    }
  }, []);

  const handleAddLedgerDebit = useCallback(() => {
    audioManager.play('pop');
    setLedgerDebitPostings((prev) => [
      ...prev,
      { date: '28-Apr', particular: 'To Cash A/c', jf: 'J-12', amount: 40000 },
    ]);
  }, []);

  const handleAddLedgerCredit = useCallback(() => {
    audioManager.play('pop');
    setLedgerCreditPostings((prev) => [
      ...prev,
      { date: '29-Apr', particular: 'By Drawings A/c', jf: 'J-14', amount: 20000 },
    ]);
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

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

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mastery assessment concluded. Outstanding application of CISCE Accountancy principles!');
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
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Flawless accounting rationale.');
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
        speechManager.speak('Let us review the step-by-step statutory explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const computedNRV = useMemo(() => marketSellingPrice - sellingExpenses, [marketSellingPrice, sellingExpenses]);
  const inventoryValuationPerUnit = useMemo(() => Math.min(inventoryCost, computedNRV), [inventoryCost, computedNRV]);
  const totalInventoryValuation = useMemo(() => inventoryValuationPerUnit * 2000, [inventoryValuationPerUnit]);

  const totalLedgerDebit = useMemo(() => ledgerDebitPostings.reduce((sum, item) => sum + item.amount, 0), [ledgerDebitPostings]);
  const totalLedgerCredit = useMemo(() => ledgerCreditPostings.reduce((sum, item) => sum + item.amount, 0), [ledgerCreditPostings]);
  const ledgerDifference = useMemo(() => Math.abs(totalLedgerDebit - totalLedgerCredit), [totalLedgerDebit, totalLedgerCredit]);
  const heavierSide = totalLedgerDebit >= totalLedgerCredit ? 'debit' : 'credit';

  const adjustedPAndLExpense = useMemo(() => {
    if (!isAccrualEnabled) return nominalExpensePaid;
    return nominalExpensePaid + outstandingExpenseAmt;
  }, [isAccrualEnabled, nominalExpensePaid, outstandingExpenseAmt]);

  // Motivational feedback helper
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="p-3 bg-gold-900/40 border border-gold-700/50 rounded-2xl text-2xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">ISC Class 11 Accountancy</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">NEP 2020 Aligned</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <span
              key={p}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                phase === p ? 'bg-gold-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-900 rounded-3xl border border-gold-800/50 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🏛️</span>
              <span>Forensic Audit Narrative</span>
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-gold-300">
              ⚡ <strong>Your Responsibility:</strong> {SCENARIO.context}
            </div>
          </div>

          {/* TOPIC SPECIFIC SVG 1: The Accounting Cycle Pipeline Flowchart */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-gold-400">Statutory Accounting Pipeline Flowchart</span>
              <span className="text-[11px] text-slate-400 font-mono">Sec 128 / AS-1 Framework</span>
            </div>
            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
              <svg viewBox="0 0 760 140" className="w-full min-w-[650px] h-32">
                <defs>
                  <linearGradient id="gradIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#3730a3" />
                  </linearGradient>
                  <linearGradient id="gradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#065f46" />
                  </linearGradient>
                  <linearGradient id="gradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#6b21a8" />
                  </linearGradient>
                  <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#6366f1" />
                  </marker>
                </defs>

                {/* Step 1: Transactions */}
                <rect x="10" y="30" width="120" height="70" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1. Source Vouchers</text>
                <text x="70" y="78" fill="#94a3b8" fontSize="9" textAnchor="middle">Invoices & Bills</text>

                {/* Arrow 1 */}
                <line x1="130" y1="65" x2="165" y2="65" stroke="#6366f1" strokeWidth="2.5" markerEnd="url(#arrowhead)" />

                {/* Step 2: Journal */}
                <rect x="170" y="30" width="120" height="70" rx="12" fill="url(#gradIndigo)" stroke="#818cf8" strokeWidth="2" />
                <text x="230" y="60" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2. Journal Books</text>
                <text x="230" y="78" fill="#c7d2fe" fontSize="9" textAnchor="middle">Chronological (L.F.)</text>

                {/* Arrow 2 */}
                <line x1="290" y1="65" x2="325" y2="65" stroke="#6366f1" strokeWidth="2.5" markerEnd="url(#arrowhead)" />

                {/* Step 3: Ledger */}
                <rect x="330" y="30" width="120" height="70" rx="12" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="390" y="60" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">3. T-Ledgers</text>
                <text x="390" y="78" fill="#94a3b8" fontSize="9" textAnchor="middle">Classified (J.F.)</text>

                {/* Arrow 3 */}
                <line x1="450" y1="65" x2="485" y2="65" stroke="#6366f1" strokeWidth="2.5" markerEnd="url(#arrowhead)" />

                {/* Step 4: Adjustments */}
                <rect x="490" y="30" width="120" height="70" rx="12" fill="url(#gradPurple)" stroke="#c084fc" strokeWidth="2" />
                <text x="550" y="60" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">4. Accrual Adjust</text>
                <text x="550" y="78" fill="#f3e8ff" fontSize="9" textAnchor="middle">Prepaid / Outst.</text>

                {/* Arrow 4 */}
                <line x1="610" y1="65" x2="640" y2="65" stroke="#6366f1" strokeWidth="2.5" markerEnd="url(#arrowhead)" />

                {/* Step 5: Final Accounts */}
                <rect x="645" y="30" width="105" height="70" rx="12" fill="url(#gradEmerald)" stroke="#34d399" strokeWidth="2" />
                <text x="697" y="60" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">5. Final Stmts</text>
                <text x="697" y="78" fill="#d1fae5" fontSize="9" textAnchor="middle">P&L & Bal Sheet</text>
              </svg>
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400">Curiosity Discovery Challenge</span>
              <span className="text-xs text-slate-400">Not Graded — Test Your Intuition</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`p-4 rounded-2xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-950/40 border-slate-800 text-slate-500'
                      : 'bg-slate-950/80 hover:bg-slate-800/90 border-slate-800 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-xs font-bold text-slate-400">{String.fromCharCode(65 + i)}</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex flex-col md:flex-row items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800 gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! External vendor obligations create Liabilities, not Capital.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Begin interactive exploration"
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-white font-bold rounded-xl shadow-lg shadow-gold-600/30 text-sm whitespace-nowrap"
                >
                  Launch Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. BRILLIANT INTERACTIVE EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Breadcrumb Header */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">Guided Interactive Discovery</span>
              <h2 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-gold-300 border border-slate-700">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              <div className="p-3 bg-gold-950/50 rounded-xl border border-gold-800/40 text-sm text-gold-200 flex items-center gap-2">
                <span>👉</span>
                <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
              </div>

              {/* ── LAB 1: AS-2 Inventory Valuation Visualizer ── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* Predict Then Check Card */}
                  {!predictionMade && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-amber-900/50">
                      <p className="text-sm font-bold text-amber-300 mb-2">🤔 {PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Prediction ${i + 1}: ${opt}`}
                            className="p-3 text-left text-xs bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/50 text-xs text-emerald-300">
                      ✓ {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  {/* TOPIC SPECIFIC SVG 2: AS-2 Inventory Valuation Rule Visual Diagram */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-xs uppercase font-bold text-amber-400 block mb-2">AS-2 Valuation Criterion (Prudence Principle)</span>
                    <svg viewBox="0 0 600 120" className="w-full h-28 bg-slate-900/60 rounded-xl p-2">
                      {/* Box 1: Historical Cost */}
                      <rect x="20" y="25" width="160" height="70" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="100" y="52" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">Cost Price</text>
                      <text x="100" y="75" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">₹{inventoryCost}</text>

                      {/* Comparator */}
                      <text x="210" y="65" fill="#fbbf24" fontSize="16" fontWeight="bold" textAnchor="middle">vs</text>

                      {/* Box 2: NRV */}
                      <rect x="240" y="25" width="160" height="70" rx="10" fill="#1c1917" stroke="#f59e0b" strokeWidth="2" />
                      <text x="320" y="50" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">NRV (₹{marketSellingPrice} - ₹{sellingExpenses})</text>
                      <text x="320" y="75" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">₹{computedNRV}</text>

                      {/* Result Box */}
                      <text x="425" y="65" fill="#10b981" fontSize="18" fontWeight="bold" textAnchor="middle">→</text>
                      <rect x="450" y="20" width="130" height="80" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
                      <text x="515" y="45" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">AS-2 Balance Value</text>
                      <text x="515" y="70" fill="#ffffff" fontSize="15" fontWeight="black" textAnchor="middle">₹{inventoryValuationPerUnit}</text>
                      <text x="515" y="88" fill="#a7f3d0" fontSize="8" textAnchor="middle">Min(Cost, NRV)</text>
                    </svg>
                  </div>

                  {/* Real-time AS-2 Visualizer Controls */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Inventory Parameters (2,000 Units)</h4>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-300">Manufacturing Cost per unit</span>
                          <span className="font-bold text-gold-400">₹{inventoryCost}</span>
                        </div>
                        <input
                          type="range"
                          min={1000}
                          max={2000}
                          step={50}
                          value={inventoryCost}
                          onChange={(e) => setInventoryCost(Number(e.target.value))}
                          aria-label="Manufacturing cost per unit slider"
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-300">Expected Market Selling Price</span>
                          <span className="font-bold text-amber-400">₹{marketSellingPrice}</span>
                        </div>
                        <input
                          type="range"
                          min={1000}
                          max={2200}
                          step={50}
                          value={marketSellingPrice}
                          onChange={(e) => setMarketSellingPrice(Number(e.target.value))}
                          aria-label="Expected market selling price slider"
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-300">Selling & Distribution Expense</span>
                          <span className="font-bold text-rose-400">₹{sellingExpenses}</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={200}
                          step={10}
                          value={sellingExpenses}
                          onChange={(e) => setSellingExpenses(Number(e.target.value))}
                          aria-label="Selling expense per unit slider"
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Visual Comparison Card */}
                    <div className="flex flex-col justify-between p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">Cost per unit:</span>
                          <span className="font-bold text-white">₹{inventoryCost}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">NRV (Selling Price − Selling Exp):</span>
                          <span className="font-bold text-white">₹{marketSellingPrice} − ₹{sellingExpenses} = ₹{computedNRV}</span>
                        </div>
                        <div className="h-px bg-slate-800" />
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gold-300 font-bold">AS-2 Valuation / Unit:</span>
                          <span className="text-base font-black text-emerald-400">₹{inventoryValuationPerUnit}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-300 font-bold">Balance Sheet Value (2,000 units):</span>
                          <span className="text-base font-black text-emerald-400">₹{(totalInventoryValuation / 100000).toFixed(2)} Lakhs</span>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-slate-950 rounded-lg text-center border border-slate-800">
                        <span className="text-xs font-bold text-slate-400">
                          Governing Rule: {inventoryValuationPerUnit === inventoryCost ? 'Cost is lower than NRV (Valued at Cost)' : 'NRV is lower than Cost (Loss Written Down Immediately per Prudence)'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: Dynamic Accounting Equation Balance Scale + MULTI-REPRESENTATION ── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* MULTI-REPRESENTATION SELECTOR */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <span className="text-xs uppercase font-bold text-gold-400">Multi-Representation Framework</span>
                      <div className="flex gap-1.5 bg-slate-900 p-1 rounded-xl">
                        {[
                          { id: 'algebraic', label: 'Rep 1: Algebraic Formula' },
                          { id: 't-diagram', label: 'Rep 2: Balance Sheet T-Layout' },
                          { id: 'dual-matrix', label: 'Rep 3: Dual Claims Scale' },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveRepTab(tab.id as any)}
                            className={`px-3 py-1 text-xs rounded-lg font-bold transition-all ${
                              activeRepTab === tab.id ? 'bg-gold-600 text-white' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Representation 1: Algebraic Equation */}
                    {activeRepTab === 'algebraic' && (
                      <div className="p-4 bg-slate-900 rounded-xl border border-gold-800/40 space-y-2">
                        <span className="text-xs text-gold-300 font-bold uppercase block">Representation 1: Algebraic Mathematical Equation</span>
                        <div className="p-3 bg-slate-950 rounded-lg font-mono text-sm text-center text-emerald-300 border border-slate-800">
                          Assets = Liabilities + Owner&apos;s Capital + (Revenues − Expenses) − Drawings
                        </div>
                        <div className="flex justify-around text-xs pt-1 text-slate-300">
                          <span>Total Assets: <strong className="text-gold-400">₹{(totalAssets / 100000).toFixed(2)}L</strong></span>
                          <span>=</span>
                          <span>Liabilities (<strong className="text-purple-400">₹{((creditorsLiab + bankLoanLiab) / 100000).toFixed(2)}L</strong>) + Capital (<strong className="text-purple-400">₹{(ownerCapital / 100000).toFixed(2)}L</strong>)</span>
                        </div>
                      </div>
                    )}

                    {/* Representation 2: Balance Sheet T-Diagram */}
                    {activeRepTab === 't-diagram' && (
                      <div className="p-4 bg-slate-900 rounded-xl border border-gold-800/40 space-y-2">
                        <span className="text-xs text-gold-300 font-bold uppercase block">Representation 2: Horizontal Balance Sheet T-Structure</span>
                        <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                          <div className="border-r border-slate-800 pr-3">
                            <span className="font-bold text-purple-400 block border-b border-slate-800 pb-1 mb-2">Liabilities & Capital (Credit)</span>
                            <div className="flex justify-between"><span>Owner Capital:</span><span>₹{(ownerCapital / 100000).toFixed(2)}L</span></div>
                            <div className="flex justify-between"><span>Bank Loan:</span><span>₹{(bankLoanLiab / 100000).toFixed(2)}L</span></div>
                            <div className="flex justify-between"><span>Creditors:</span><span>₹{(creditorsLiab / 100000).toFixed(2)}L</span></div>
                            <div className="border-t border-slate-800 mt-2 pt-1 font-bold flex justify-between text-purple-300">
                              <span>Total Claims:</span><span>₹{(totalLiabAndCap / 100000).toFixed(2)}L</span>
                            </div>
                          </div>
                          <div className="pl-3">
                            <span className="font-bold text-gold-400 block border-b border-slate-800 pb-1 mb-2">Assets (Debit)</span>
                            <div className="flex justify-between"><span>Cash in Hand:</span><span>₹{(cashAsset / 100000).toFixed(2)}L</span></div>
                            <div className="flex justify-between"><span>Bank A/c:</span><span>₹{(bankAsset / 100000).toFixed(2)}L</span></div>
                            <div className="flex justify-between"><span>Stock:</span><span>₹{(stockAsset / 100000).toFixed(2)}L</span></div>
                            <div className="flex justify-between"><span>Machinery:</span><span>₹{(machineryAsset / 100000).toFixed(2)}L</span></div>
                            <div className="border-t border-slate-800 mt-2 pt-1 font-bold flex justify-between text-gold-300">
                              <span>Total Assets:</span><span>₹{(totalAssets / 100000).toFixed(2)}L</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Representation 3: Dual Claims Scale */}
                    {activeRepTab === 'dual-matrix' && (
                      <div className="p-4 bg-slate-900 rounded-xl border border-gold-800/40 space-y-2">
                        <span className="text-xs text-gold-300 font-bold uppercase block">Representation 3: Dynamic Physics Balance Scale</span>
                        <canvas ref={canvasRef} width={500} height={160} className="w-full bg-slate-950 rounded-xl border border-slate-800" />
                      </div>
                    )}
                  </div>

                  {/* Transaction Injection Simulator */}
                  <div className="space-y-3">
                    <span className="text-xs uppercase font-bold text-slate-400">Inject Real Transactions into Surat Enterprise:</span>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleTransactionInject('capital')}
                        aria-label="Introduce 2 Lakh capital"
                        className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-gold-800 text-xs text-gold-300 text-left"
                      >
                        <span className="font-bold block">+ Capital ₹2L</span>
                        <span className="text-[10px] text-slate-400">Cash ↑ Cap ↑</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleTransactionInject('machinery_credit')}
                        aria-label="Buy 3 Lakh machinery on credit"
                        className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-gold-800 text-xs text-gold-300 text-left"
                      >
                        <span className="font-bold block">+ Mach on Credit ₹3L</span>
                        <span className="text-[10px] text-slate-400">Mach ↑ Liab ↑</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleTransactionInject('salary_cash')}
                        aria-label="Pay 40 thousand salary in cash"
                        className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-gold-800 text-xs text-gold-300 text-left"
                      >
                        <span className="font-bold block">- Pay Salary ₹40k</span>
                        <span className="text-[10px] text-slate-400">Cash ↓ Cap ↓</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleTransactionInject('sale_cash')}
                        aria-label="Cash sale of 1.5 Lakh with 50k profit"
                        className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-gold-800 text-xs text-gold-300 text-left"
                      >
                        <span className="font-bold block">+ Cash Sale w/ Profit</span>
                        <span className="text-[10px] text-slate-400">Cash+1.5L Stock-1L Cap+50k</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleTransactionInject('drawings')}
                        aria-label="Withdraw 30 thousand drawings"
                        className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-gold-800 text-xs text-gold-300 text-left"
                      >
                        <span className="font-bold block">- Drawings ₹30k</span>
                        <span className="text-[10px] text-slate-400">Cash ↓ Cap ↓</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold text-slate-300 mb-2">👁️ {OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Observation answer ${i + 1}: ${opt}`}
                            className="w-full text-left p-2.5 bg-slate-900 rounded-xl text-xs text-slate-300 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── LAB 3: Golden Rules & Journal Matrix + TOPIC SPECIFIC SVG 3 ── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {/* TOPIC SPECIFIC SVG 3: Account Classification & Golden Rules Matrix */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-xs uppercase font-bold text-gold-400 block mb-2">Double-Entry Golden Rules Architecture</span>
                    <svg viewBox="0 0 620 130" className="w-full h-32 bg-slate-900/60 rounded-xl p-2">
                      {/* Personal Accounts */}
                      <rect x="10" y="20" width="180" height="90" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="100" y="45" fill="#a5b4fc" fontSize="12" fontWeight="bold" textAnchor="middle">1. Personal Accounts</text>
                      <text x="100" y="68" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Dr: The Receiver</text>
                      <text x="100" y="88" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Cr: The Giver</text>

                      {/* Real Accounts */}
                      <rect x="220" y="20" width="180" height="90" rx="10" fill="#14532d" stroke="#10b981" strokeWidth="1.5" />
                      <text x="310" y="45" fill="#86efac" fontSize="12" fontWeight="bold" textAnchor="middle">2. Real Accounts</text>
                      <text x="310" y="68" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Dr: What Comes In</text>
                      <text x="310" y="88" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Cr: What Goes Out</text>

                      {/* Nominal Accounts */}
                      <rect x="430" y="20" width="180" height="90" rx="10" fill="#581c87" stroke="#a855f7" strokeWidth="1.5" />
                      <text x="520" y="45" fill="#d8b4fe" fontSize="12" fontWeight="bold" textAnchor="middle">3. Nominal Accounts</text>
                      <text x="520" y="68" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Dr: Expenses & Losses</text>
                      <text x="520" y="88" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Cr: Incomes & Gains</text>
                    </svg>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'machinery_credit', label: '1. Buy Machinery on Credit' },
                      { id: 'salary_cash', label: '2. Pay Factory Salary Cash' },
                      { id: 'sale_cash', label: '3. Cash Sale of Goods' },
                      { id: 'drawings', label: '4. Owner Cash Drawings' },
                    ].map((btn) => (
                      <motion.button
                        key={btn.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSelectedTxType(btn.id as any);
                          audioManager.play('tap');
                        }}
                        aria-label={btn.label}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          selectedTxType === btn.id
                            ? 'bg-gold-600 text-white border-gold-500 shadow-md'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {btn.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* Formatted Journal Table Box */}
                  <div className="overflow-x-auto bg-slate-950 rounded-2xl border border-slate-800 p-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Generated Standard 5-Column Journal Entry</span>
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="p-2">Date</th>
                          <th className="p-2">Particulars</th>
                          <th className="p-2">L.F.</th>
                          <th className="p-2 text-right">Debit (₹)</th>
                          <th className="p-2 text-right">Credit (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTxType === 'machinery_credit' && (
                          <>
                            <tr>
                              <td className="p-2 text-slate-400">2025-04-10</td>
                              <td className="p-2 text-white font-bold">Machinery A/c &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dr</td>
                              <td className="p-2 text-slate-500">L-12</td>
                              <td className="p-2 text-right text-emerald-400 font-bold">3,00,000</td>
                              <td className="p-2 text-right text-slate-500">-</td>
                            </tr>
                            <tr>
                              <td className="p-2"></td>
                              <td className="p-2 text-slate-300 pl-6">To L&T Creditor A/c</td>
                              <td className="p-2 text-slate-500">L-25</td>
                              <td className="p-2 text-right text-slate-500">-</td>
                              <td className="p-2 text-right text-emerald-400 font-bold">3,00,000</td>
                            </tr>
                            <tr className="border-b border-slate-800/60">
                              <td className="p-2"></td>
                              <td colSpan={4} className="p-2 text-[11px] text-slate-400 italic">(Being machinery purchased on credit from L&T)</td>
                            </tr>
                          </>
                        )}
                        {selectedTxType === 'salary_cash' && (
                          <>
                            <tr>
                              <td className="p-2 text-slate-400">2025-04-15</td>
                              <td className="p-2 text-white font-bold">Salary A/c &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dr</td>
                              <td className="p-2 text-slate-500">L-18</td>
                              <td className="p-2 text-right text-emerald-400 font-bold">40,000</td>
                              <td className="p-2 text-right text-slate-500">-</td>
                            </tr>
                            <tr>
                              <td className="p-2"></td>
                              <td className="p-2 text-slate-300 pl-6">To Cash A/c</td>
                              <td className="p-2 text-slate-500">L-1</td>
                              <td className="p-2 text-right text-slate-500">-</td>
                              <td className="p-2 text-right text-emerald-400 font-bold">40,000</td>
                            </tr>
                            <tr className="border-b border-slate-800/60">
                              <td className="p-2"></td>
                              <td colSpan={4} className="p-2 text-[11px] text-slate-400 italic">(Being salary paid in cash to factory staff)</td>
                            </tr>
                          </>
                        )}
                        {selectedTxType === 'sale_cash' && (
                          <>
                            <tr>
                              <td className="p-2 text-slate-400">2025-04-20</td>
                              <td className="p-2 text-white font-bold">Cash A/c &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dr</td>
                              <td className="p-2 text-slate-500">L-1</td>
                              <td className="p-2 text-right text-emerald-400 font-bold">1,50,000</td>
                              <td className="p-2 text-right text-slate-500">-</td>
                            </tr>
                            <tr>
                              <td className="p-2"></td>
                              <td className="p-2 text-slate-300 pl-6">To Sales A/c</td>
                              <td className="p-2 text-slate-500">L-9</td>
                              <td className="p-2 text-right text-slate-500">-</td>
                              <td className="p-2 text-right text-emerald-400 font-bold">1,50,000</td>
                            </tr>
                            <tr className="border-b border-slate-800/60">
                              <td className="p-2"></td>
                              <td colSpan={4} className="p-2 text-[11px] text-slate-400 italic">(Being goods sold for cash)</td>
                            </tr>
                          </>
                        )}
                        {selectedTxType === 'drawings' && (
                          <>
                            <tr>
                              <td className="p-2 text-slate-400">2025-04-25</td>
                              <td className="p-2 text-white font-bold">Drawings A/c &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dr</td>
                              <td className="p-2 text-slate-500">L-3</td>
                              <td className="p-2 text-right text-emerald-400 font-bold">30,000</td>
                              <td className="p-2 text-right text-slate-500">-</td>
                            </tr>
                            <tr>
                              <td className="p-2"></td>
                              <td className="p-2 text-slate-300 pl-6">To Cash A/c</td>
                              <td className="p-2 text-slate-500">L-1</td>
                              <td className="p-2 text-right text-slate-500">-</td>
                              <td className="p-2 text-right text-emerald-400 font-bold">30,000</td>
                            </tr>
                            <tr className="border-b border-slate-800/60">
                              <td className="p-2"></td>
                              <td colSpan={4} className="p-2 text-[11px] text-slate-400 italic">(Being cash withdrawn for proprietor domestic use)</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── LAB 4: T-Account Balancing & Mechanics ── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase text-slate-400">Cash Ledger T-Account Simulator</span>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddLedgerDebit}
                        aria-label="Add debit receipt posting"
                        className="px-3 py-1.5 bg-gold-700 text-white rounded-lg text-xs font-bold"
                      >
                        + Post Debit Receipt (₹40k)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddLedgerCredit}
                        aria-label="Add credit payment posting"
                        className="px-3 py-1.5 bg-purple-700 text-white rounded-lg text-xs font-bold"
                      >
                        + Post Credit Payment (₹20k)
                      </motion.button>
                    </div>
                  </div>

                  {/* T-Account Layout */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div className="text-center font-bold text-sm text-white mb-3">
                      Dr. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CASH ACCOUNT &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cr.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                      {/* Debit Side */}
                      <div className="space-y-2 pr-0 md:pr-4">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Debit Side (Receipts)</span>
                        <table className="w-full text-xs">
                          <tbody>
                            {ledgerDebitPostings.map((item, idx) => (
                              <tr key={idx} className="border-b border-slate-900">
                                <td className="text-slate-400">{item.date}</td>
                                <td className="text-slate-200">{item.particular}</td>
                                <td className="text-slate-500">{item.jf}</td>
                                <td className="text-right font-mono text-emerald-400">₹{item.amount.toLocaleString()}</td>
                              </tr>
                            ))}
                            {heavierSide === 'credit' && (
                              <tr className="bg-amber-950/30 text-amber-300 font-bold">
                                <td>30-Apr</td>
                                <td>To Balance c/d</td>
                                <td>-</td>
                                <td className="text-right font-mono">₹{ledgerDifference.toLocaleString()}</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Credit Side */}
                      <div className="space-y-2 pt-2 md:pt-0 pl-0 md:pl-4">
                        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">Credit Side (Payments)</span>
                        <table className="w-full text-xs">
                          <tbody>
                            {ledgerCreditPostings.map((item, idx) => (
                              <tr key={idx} className="border-b border-slate-900">
                                <td className="text-slate-400">{item.date}</td>
                                <td className="text-slate-200">{item.particular}</td>
                                <td className="text-slate-500">{item.jf}</td>
                                <td className="text-right font-mono text-rose-400">₹{item.amount.toLocaleString()}</td>
                              </tr>
                            ))}
                            {heavierSide === 'debit' && (
                              <tr className="bg-amber-950/30 text-amber-300 font-bold">
                                <td>30-Apr</td>
                                <td>By Balance c/d</td>
                                <td>-</td>
                                <td className="text-right font-mono">₹{ledgerDifference.toLocaleString()}</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t-2 border-slate-800 flex justify-between items-center text-xs font-bold text-white px-2">
                      <div>Total Dr: ₹{Math.max(totalLedgerDebit, totalLedgerCredit).toLocaleString()}</div>
                      <div>Total Cr: ₹{Math.max(totalLedgerDebit, totalLedgerCredit).toLocaleString()}</div>
                    </div>

                    <div className="mt-2 p-2 bg-slate-900 rounded-lg text-center text-xs text-gold-300">
                      Next Period Opening: <strong>{heavierSide === 'debit' ? `To Balance b/d: ₹${ledgerDifference.toLocaleString()} (Debit Balance)` : `By Balance b/d: ₹${ledgerDifference.toLocaleString()} (Credit Balance)`}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 5: Year-End Accruals Adjusting Pipeline ── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div>
                      <span className="text-xs uppercase font-bold text-slate-400">Accounting Basis Toggle</span>
                      <p className="text-xs text-slate-300">Compare Cash Basis vs Mandatory Accrual Basis (AS-1 / Sec 128)</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsAccrualEnabled(!isAccrualEnabled);
                        audioManager.play('tap');
                      }}
                      aria-label="Toggle accrual basis"
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        isAccrualEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isAccrualEnabled ? '✓ Accrual Accounting (Active)' : 'Cash Accounting (Unadjusted)'}
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">Profit & Loss Account Impact</span>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Cash Salary Paid during Year:</span>
                        <span className="font-mono text-white">₹{nominalExpensePaid.toLocaleString()}</span>
                      </div>
                      {isAccrualEnabled && (
                        <div className="flex justify-between text-xs text-amber-300">
                          <span>+ Add Outstanding Salary (March):</span>
                          <span className="font-mono">+₹{outstandingExpenseAmt.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="h-px bg-slate-800" />
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-gold-300">Total Salary Charged to P&L:</span>
                        <span className="font-mono text-emerald-400">₹{adjustedPAndLExpense.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">Balance Sheet Classification</span>
                      {isAccrualEnabled ? (
                        <>
                          <div className="flex justify-between text-xs text-rose-300">
                            <span>Current Liabilities: Outstanding Salary</span>
                            <span className="font-mono">₹{outstandingExpenseAmt.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-xs text-emerald-300">
                            <span>Current Assets: Prepaid Insurance</span>
                            <span className="font-mono">₹{prepaidInsuranceAmt.toLocaleString()}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 italic">Adjusting entries fulfill the matching principle, preventing distortion of operating profit.</p>
                        </>
                      ) : (
                        <div className="p-3 bg-rose-950/40 rounded-xl border border-rose-800/40 text-xs text-rose-300">
                          ⚠️ Warning: Without adjustments, the Balance Sheet omits accrued liabilities, giving a legally non-compliant, misleading view!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              aria-label="Previous interactive lab"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-bold text-slate-400">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('tap');
                }}
                aria-label="Next interactive lab"
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter free exploration sandbox"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Unrestricted Accounting Sandbox</span>
              <span className="text-xs text-slate-400">Zero Grading Pressure — Experiment Freely</span>
            </div>
            <h2 className="text-xl font-black text-white">Full Financial Simulator: Assets, Liabilities & Capital</h2>
            <p className="text-xs text-slate-300 mt-1">
              Adjust any ledger balances below to test the limits of the Accounting Equation. Watch how every business asset is financed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-3xl border border-slate-800">
            {/* Left: Asset Sliders */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gold-400">Asset Accounts (Debit Balances)</h3>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Cash in Hand</span>
                  <span className="font-mono text-gold-400">₹{cashAsset.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1000000}
                  step={25000}
                  value={cashAsset}
                  onChange={(e) => setCashAsset(Number(e.target.value))}
                  aria-label="Cash asset slider"
                  className="w-full accent-gold-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Bank Balance (HDFC Current A/c)</span>
                  <span className="font-mono text-gold-400">₹{bankAsset.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1500000}
                  step={25000}
                  value={bankAsset}
                  onChange={(e) => setBankAsset(Number(e.target.value))}
                  aria-label="Bank asset slider"
                  className="w-full accent-gold-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Stock of Finished Goods</span>
                  <span className="font-mono text-gold-400">₹{stockAsset.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1000000}
                  step={25000}
                  value={stockAsset}
                  onChange={(e) => setStockAsset(Number(e.target.value))}
                  aria-label="Stock asset slider"
                  className="w-full accent-gold-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Plant & Machinery</span>
                  <span className="font-mono text-gold-400">₹{machineryAsset.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1500000}
                  step={25000}
                  value={machineryAsset}
                  onChange={(e) => setMachineryAsset(Number(e.target.value))}
                  aria-label="Machinery asset slider"
                  className="w-full accent-gold-500 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800 text-xs flex justify-between font-bold">
                <span className="text-gold-300">Total Assets (A):</span>
                <span className="font-mono text-gold-200">₹{totalAssets.toLocaleString()}</span>
              </div>
            </div>

            {/* Right: Liabilities & Capital Sliders */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">Claims: Liabilities & Capital</h3>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Trade Creditors (Suppliers)</span>
                  <span className="font-mono text-purple-400">₹{creditorsLiab.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1000000}
                  step={25000}
                  value={creditorsLiab}
                  onChange={(e) => setCreditorsLiab(Number(e.target.value))}
                  aria-label="Creditors liability slider"
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">SBI Term Loan</span>
                  <span className="font-mono text-purple-400">₹{bankLoanLiab.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1000000}
                  step={25000}
                  value={bankLoanLiab}
                  onChange={(e) => setBankLoanLiab(Number(e.target.value))}
                  aria-label="Bank loan liability slider"
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Owner Capital (Equity)</span>
                  <span className="font-mono text-purple-400">₹{ownerCapital.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={3000000}
                  step={25000}
                  value={ownerCapital}
                  onChange={(e) => setOwnerCapital(Number(e.target.value))}
                  aria-label="Owner capital slider"
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const balanceCap = totalAssets - (creditorsLiab + bankLoanLiab);
                    setOwnerCapital(Math.max(0, balanceCap));
                    audioManager.play('balance');
                  }}
                  aria-label="Auto balance owner capital"
                  className="w-full py-2 bg-gold-700 hover:bg-gold-600 rounded-xl text-xs font-bold text-white shadow"
                >
                  ⚡ Auto-Derive Capital Balancing Figure (Assets − Liabilities)
                </motion.button>
              </div>

              <div className="p-3 bg-purple-950/40 rounded-xl border border-purple-800 text-xs flex justify-between font-bold">
                <span className="text-purple-300">Total Claims (L + C):</span>
                <span className="font-mono text-purple-200">₹{totalLiabAndCap.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Proceed to mastery challenges"
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/30 text-sm"
            >
              Ready for Mastery Challenges! →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── 4. ADAPTIVE CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Mastery Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gold-300 font-semibold uppercase">{challenge.competencyLevel} Competency</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-mono">Node: {challenge.nodeId}</span>
              </div>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950/60 text-rose-300 border-rose-700'
                  : 'bg-gold-950/60 text-gold-300 border-gold-700'
              }`}
            >
              {difficulty} TIER
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Card */}
          <div
            className={`p-6 bg-slate-900 rounded-3xl border transition-all ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">{challenge.question}</h3>

            {/* MCQ / Classification Types with Required Shake Animation */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-2xl text-xs md:text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-400">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3.5 py-2 bg-gold-700 text-white rounded-xl text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries({
                    target_asset: '1. Asset Account (Resource owned by firm)',
                    target_liab: '2. Liability Account (Obligation owed to outsider)',
                    target_exp: '3. Expense Account (Expired operational cost)',
                    target_rev: '4. Revenue Account (Inflow from core activities)',
                  }).map(([tid, label]) => (
                    <div
                      key={tid}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(tid)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-800 hover:border-gold-600 transition-colors"
                    >
                      <span className="text-xs font-bold text-slate-400 block mb-2">{label}</span>
                      <div className="min-h-[36px] flex items-center justify-center bg-slate-900 rounded-xl p-2 text-xs font-mono text-gold-300">
                        {droppedLabels[tid] || '[ Drop Matching Account Here ]'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Submit label assignments"
                  className="px-6 py-2.5 bg-gold-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Verify All Classifications
                </motion.button>
              </div>
            )}

            {/* Drag Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400">Drag or drop items into correct sequence:</span>
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
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-gold-400 font-bold">{displayIndex + 1}</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  aria-label="Verify sort sequence"
                  className="px-6 py-2.5 bg-gold-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Input Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label="Numeric answer input"
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-sm w-48 focus:border-gold-500 focus:outline-none"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    aria-label="Submit numeric response"
                    className="px-6 py-3 bg-gold-600 text-white text-xs font-bold rounded-xl shadow"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      aria-label={`Add part ${part}`}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-gold-800 rounded-xl text-xs text-gold-300 font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[60px] p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-gold-900/80 border border-gold-700 text-white rounded-lg text-xs font-mono flex items-center gap-2">
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200"
                        aria-label={`Remove part ${part}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500 italic">Click building blocks above...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  aria-label="Validate construction"
                  className="px-6 py-2.5 bg-gold-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Verify Equation Formula
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation Card */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 rounded-2xl border border-amber-800/60 space-y-3">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-300">Step-by-Step Accounting Rationale</span>
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-amber-100 leading-relaxed">
                      <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    aria-label="Reveal next explanation step"
                    className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-xl text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                )}

                {revealedSteps >= challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Next challenge"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Conclude Audit Examination →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY PROFILE PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-900 rounded-3xl border border-gold-800 shadow-2xl text-center space-y-3">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Forensic Audit & Accountancy Certified!</h2>
            
            {/* MOTIVATIONAL FEEDBACK BADGE */}
            <div className="inline-block px-5 py-2 rounded-2xl bg-gold-900/60 border border-gold-500 text-lg font-black text-amber-300 shadow-md">
              {motivationalMessage}
            </div>

            <p className="text-sm text-slate-300">
              You have systematically closed and audited the accounts of Bharat TexTech under CISCE standards.
            </p>
            <div className="inline-block px-6 py-2 bg-slate-950 rounded-2xl border border-gold-700/60 font-mono text-xl text-emerald-400 font-bold">
              Final Score: {Math.max(0, 100 - errors * 5)}% &nbsp;•&nbsp; Tier: {masteryLevel.toUpperCase()}
            </div>
          </div>

          {/* Personalized Performance Feedback */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
            <span className="text-xs uppercase tracking-wider font-bold text-gold-400 block mb-2">Diagnostic Feedback</span>
            <p className="text-sm text-slate-200 leading-relaxed">
              {errors === 0
                ? '🌟 PERFECT SCORE! You possess complete conceptual mastery across AS, IFRS/Ind-AS, Journal, T-Accounts, and Adjustments.'
                : errors <= 3
                ? '👏 Great work! Minor oversights occurred, but your structural understanding of Double-Entry principles is robust.'
                : errors <= 7
                ? '📖 Good effort! Focus on the differences between direct/indirect expenses and prepaid/outstanding adjusting mechanics below.'
                : '💪 Do not give up — You WILL get this! Practice the core accounting equation and golden rules once more.'}
            </p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-3xl border border-rose-900/60 space-y-3">
              <span className="text-xs uppercase tracking-wider font-bold text-rose-300">Specific Misconceptions Identified During Audit:</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-xs">
                      <p className="text-rose-400 font-bold">❌ {m.misconception}</p>
                      <p className="text-emerald-300">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Notification */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <span className="font-bold text-white block">SM-2 Spaced Repetition Active</span>
                <span className="text-slate-400">
                  Topic retention review scheduled in{' '}
                  <strong className="text-gold-400">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-6 bg-gold-950/40 rounded-3xl border border-gold-800/60 space-y-3">
            <span className="text-xs uppercase tracking-wider font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</span>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Set Concluded!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_AccountancyAccountingStandardsMeaningSim;
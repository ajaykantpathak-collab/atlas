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
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
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
  PieChart, 
  Pie 
} from 'recharts';

// Node IDs as string literals
const NODE_C12_ACC_031 = 'c12_acc_031';
const NODE_C12_ACC_032 = 'c12_acc_032';
const NODE_C12_ACC_033 = 'c12_acc_033';
const NODE_C12_ACC_034 = 'c12_acc_034';
const NODE_C12_ACC_035 = 'c12_acc_035';
const NODE_C12_ACC_036 = 'c12_acc_036';
const NODE_C12_ACC_037 = 'c12_acc_037';
const NODE_C12_ACC_038 = 'c12_acc_038';
const NODE_C12_ACC_039 = 'c12_acc_039';
const NODE_C12_ACC_040 = 'c12_acc_040';

const ALL_NODE_IDS = [
  NODE_C12_ACC_031,
  NODE_C12_ACC_032,
  NODE_C12_ACC_033,
  NODE_C12_ACC_034,
  NODE_C12_ACC_035,
  NODE_C12_ACC_036,
  NODE_C12_ACC_037,
  NODE_C12_ACC_038,
  NODE_C12_ACC_039,
  NODE_C12_ACC_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Corporate Restructuring: Apex Technologies Ltd',
  intro: 'You are the Chief Financial Controller at Apex Technologies Ltd (BSE/NSE listed). The statutory auditors from Deloitte and MCA inspectors are arriving to review your financial statements under Schedule III Part I of the Companies Act 2013.',
  context: 'Apex Technologies has just executed a massive capital restructuring: raising ₹100 Cr equity, issuing ₹50 Cr 9% debentures redeemable at 10% premium, pledging collateral debentures to State Bank of India, buying plant from vendors, writing off capital losses, and applying all four recent MCA amendments (AS-4 proposed dividend, PPE renaming, current maturities of debt, and Securities Premium label). Prepare the books and ensure the Balance Sheet complies 100%!',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Apex Technologies proposes a dividend of ₹15 Crore for FY 2024-25 in the Board Meeting on 12th May 2025. Where should this appear on the 31st March 2025 Balance Sheet?',
  options: [
    'Under Current Liabilities → Short-Term Provisions (deducted from Surplus)',
    'On the face of Balance Sheet under Shareholders\' Funds',
    'Disclosed ONLY in Notes to Accounts as a Contingent Liability (not in Balance Sheet totals)',
    'Deducted directly from Cash and Bank balances on the asset side'
  ],
  correctIndex: 2,
  hintAfter: 'Under AS-4 (Revised) & Section 123 of Companies Act 2013, a proposed dividend is NOT a liability until approved by shareholders in the AGM! Let us explore why.',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c12_acc_031)
  {
    id: 'ch_01',
    nodeId: NODE_C12_ACC_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Schedule III Part I of the Companies Act 2013, which figure appears directly on the FACE of the Balance Sheet under "Shareholders\' Funds → Share Capital"?',
    options: [
      'Authorised Capital',
      'Issued Capital',
      'Subscribed and Paid-up Capital (adjusted for Arrears & Forfeiture)',
      'Total Nominal Capital authorised by MoA'
    ],
    correctIndex: 2,
    explanation: 'Schedule III Part I explicitly mandates that only Subscribed and Paid-up Capital appears on the face of the Balance Sheet. Authorised and Issued Capital are nominal ceilings disclosed in Note 1.',
    hints: [
      'Think about what money has actually been received vs what is merely a legal ceiling.',
      'Authorised capital is a ceiling in the Memorandum, not real liquid capital received.',
      'The face represents actual balance sheet reality: Subscribed and Paid-up Capital.'
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label Diagram (c12_acc_031)
  {
    id: 'ch_02',
    nodeId: NODE_C12_ACC_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map the five layers of Share Capital structure into their hierarchical order from statutory ceiling down to net cash received.',
    dragItems: [
      { label: '1. Authorised Capital', targetId: 'cap_level_1' },
      { label: '2. Issued Capital', targetId: 'cap_level_2' },
      { label: '3. Subscribed Capital', targetId: 'cap_level_3' },
      { label: '4. Called-up Capital', targetId: 'cap_level_4' },
    ],
    correctMapping: {
      cap_level_1: '1. Authorised Capital',
      cap_level_2: '2. Issued Capital',
      cap_level_3: '3. Subscribed Capital',
      cap_level_4: '4. Called-up Capital'
    },
    explanation: 'The hierarchy flows: Authorised (MoA ceiling) ≥ Issued (offered to public) ≥ Subscribed (applied & allotted) ≥ Called-up (demanded by company) ≥ Paid-up (Called minus Arrears plus Forfeited).',
    hints: [
      'Level 1 is the maximum capacity registered with ROC.',
      'Level 2 is what the directors actually offer to the market.',
      'Level 3 is what investors apply for and get allotted.'
    ],
    misconceptionIndex: 0,
  },
  // 3. Standard - Numeric Calculation (c12_acc_031)
  {
    id: 'ch_03',
    nodeId: NODE_C12_ACC_031,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Apex Ltd has 5,00,000 equity shares of ₹10 each, called up at ₹8 per share. Calls in Arrears amount to ₹60,000. Balance in Forfeited Shares Account is ₹25,000. What is the Paid-up Share Capital to be shown on the face of the Balance Sheet (in ₹)?',
    correctAnswer: 3965000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Called-up Capital = 5,00,000 × ₹8 = ₹40,00,000. Paid-up Capital = Called-up (₹40,00,000) − Calls in Arrears (₹60,000) + Forfeited Shares A/c (₹25,00,000) = ₹39,65,000.',
    hints: [
      'Calculate gross Called-up Capital first: 5,00,000 × ₹8.',
      'Subtract Calls in Arrears because this money was not received.',
      'Add the Forfeited Shares balance because this money was retained by the company.'
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - Cash Book vs Journal Proper (c12_acc_032)
  {
    id: 'ch_04',
    nodeId: NODE_C12_ACC_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When shares are forfeited for non-payment of calls, in which book of primary entry must the forfeiture entry be recorded?',
    options: [
      'Cash Book (Bank column)',
      'Journal Proper',
      'Pass Book',
      'Petty Cash Book'
    ],
    correctIndex: 1,
    explanation: 'Forfeiture is a non-cash adjustment of ledger balances (Debit Share Capital, Credit Forfeited Shares and Unpaid Calls). It contains zero cash movement, so it MUST go into Journal Proper.',
    hints: [
      'Does cash flow into or out of the company when shares are cancelled/forfeited?',
      'No cash moves during cancellation; only ledger balances are restructured.',
      'Non-cash corporate transactions are recorded in Journal Proper.'
    ],
    misconceptionIndex: 0,
  },
  // 5. Standard - Drag Sort Accounting Pipeline (c12_acc_032)
  {
    id: 'ch_05',
    nodeId: NODE_C12_ACC_032,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of entries in the corporate accounting lifecycle for a share issue with forfeiture and reissue:',
    sortItems: [
      'Record Cash Receipt for Application in Cash Book',
      'Transfer Application money to Share Capital in Journal Proper',
      'Forfeit unpaid shares (Debit Share Capital, Credit Forfeited Shares) in Journal Proper',
      'Reissue forfeited shares & transfer net surplus to Capital Reserve'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First cash is received (Cash Book), then allotment transfers nominal capital (Journal Proper), defaults trigger forfeiture (Journal Proper), and finally reissue yields surplus to Capital Reserve.',
    hints: [
      'You cannot allot shares before application money arrives in the bank.',
      'Forfeiture can only happen after calls are in default.',
      'Transfer to Capital Reserve is always the final step after shares are reissued.'
    ],
  },
  // 6. Foundation - Issue of Debentures at Discount (c12_acc_033)
  {
    id: 'ch_06',
    nodeId: NODE_C12_ACC_033,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Companies Act 2013, what is the legal difference between issuing Shares at a discount vs Debentures at a discount?',
    options: [
      'Shares CAN be issued at discount (Sec 53), but Debentures CANNOT',
      'Shares CANNOT be issued at discount (Sec 53, except sweat equity), while Debentures CAN be issued at discount (Sec 71)',
      'Both Shares and Debentures can be freely issued at discount without limits',
      'Neither Shares nor Debentures can ever be issued at discount under Indian law'
    ],
    correctIndex: 1,
    explanation: 'Section 53 strictly prohibits issue of shares at discount to protect ownership equity. Debentures are debt instruments governed by Section 71; issuing at discount is a recognized borrowing cost.',
    hints: [
      'Think about ownership dilution vs loan cost.',
      'Section 53 penalises issuing ownership below face value.',
      'Debt instruments (debentures) can be discounted as a discount cost of borrowing.'
    ],
  },
  // 7. Standard - Numeric Discount & Securities Premium Split (c12_acc_033)
  {
    id: 'ch_07',
    nodeId: NODE_C12_ACC_033,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Apex Ltd issues 10,000 9% debentures of ₹100 each at a 5% discount. The company has ₹30,000 in Securities Premium. How much discount must be charged to the Statement of Profit and Loss in the year of issue (in ₹)?',
    correctAnswer: 20000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Total discount = 10,000 × ₹5 = ₹50,000. Under Sec 52(2), first utilise Securities Premium (₹30,000). Remaining discount charged to Statement of P&L = ₹50,000 − ₹30,000 = ₹20,000.',
    hints: [
      'Calculate total discount: 10,000 debentures × 5% of ₹100.',
      'Section 52(2) requires exhausting Securities Premium first.',
      'Deduct the available ₹30,000 premium from ₹50,000 total discount.'
    ],
    misconceptionIndex: 1,
  },
  // 8. Foundation - Collateral Security Nature (c12_acc_034)
  {
    id: 'ch_08',
    nodeId: NODE_C12_ACC_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When a company issues ₹50,00,000 debentures to State Bank of India as Collateral Security for a ₹40,00,000 bank loan, how much interest is paid annually on these collateral debentures?',
    options: [
      'Coupon interest on the full ₹50,00,000 debentures',
      'Interest on the difference (₹10,00,000)',
      'ZERO interest is paid on collateral debentures; interest is paid ONLY on the actual ₹40,00,000 bank loan',
      'Double interest on both loan and debentures'
    ],
    correctIndex: 2,
    explanation: 'Debentures issued as collateral security are a contingent safety pledge, NOT an active borrowing. Interest is paid exclusively on the principal bank loan utilized.',
    hints: [
      'Did the company receive fresh cash borrowing from the debentures itself?',
      'The debentures are merely held in the bank vault as backup guarantee.',
      'Zero interest accrues on collateral debentures until default.'
    ],
    misconceptionIndex: 0,
  },
  // 9. Standard - Vendor Consideration & Goodwill/Capital Reserve (c12_acc_034)
  {
    id: 'ch_09',
    nodeId: NODE_C12_ACC_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Apex Ltd purchases assets worth ₹15,00,000 and takes over liabilities of ₹3,00,000 from Zenith Enterprises. Purchase consideration is settled by issuing 10,000 8% Debentures of ₹100 each at a premium of ₹30. What capital adjustment arises?',
    options: [
      'Goodwill of ₹1,00,000 (debit)',
      'Capital Reserve of ₹1,00,000 (credit)',
      'Goodwill of ₹2,00,000 (debit)',
      'Capital Reserve of ₹2,00,000 (credit)'
    ],
    correctIndex: 0,
    explanation: 'Net Assets = Assets (₹15L) − Liabilities (₹3L) = ₹12,00,000. Purchase Consideration = 10,000 × ₹130 = ₹13,00,000. Since PC (₹13L) > Net Assets (₹12L), the excess ₹1,00,000 is Goodwill (debited).',
    hints: [
      'Net Assets = Assets taken over minus Liabilities taken over.',
      'Purchase consideration = 10,000 debentures × ₹130 issue price = ₹13,00,000.',
      'When you pay more than net assets, you debit Goodwill.'
    ],
    misconceptionIndex: 2,
  },
  // 10. Foundation - Premium on Redemption Recognition (c12_acc_035)
  {
    id: 'ch_05_b',
    nodeId: NODE_C12_ACC_035,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is "Loss on Issue of Debentures" debited at the time of ISSUE itself when debentures are redeemable at a premium?',
    options: [
      'Because cash has been paid out immediately to debenture holders',
      'Due to the Prudence principle and Matching concept — anticipated certain future losses must be provided for now',
      'Because it is an illegal transaction under Companies Act',
      'To reduce corporate tax liability in advance'
    ],
    correctIndex: 1,
    explanation: 'Under Prudence and Accrual principles, a contractually certain liability to pay premium on redemption must be recognized at the inception of the contract, balancing against "Premium on Redemption A/c" liability.',
    hints: [
      'Think of AS-29 and the conservatism/prudence concept.',
      'We know with 100% contractual certainty that extra money will be paid at redemption.',
      'Anticipated losses must be recognized when the obligation is born.'
    ],
  },
  // 11. Standard - Construct Journal Entry for Issue at Par, Redeemable at Premium (c12_acc_035)
  {
    id: 'ch_11',
    nodeId: NODE_C12_ACC_035,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the compound journal entry at issue for 1,000 10% debentures of ₹100 each issued at Par, redeemable at 10% Premium.',
    availableParts: [
      'Bank A/c Dr ₹1,00,000',
      'Loss on Issue of Debentures A/c Dr ₹10,000',
      'To 10% Debentures A/c ₹1,00,000',
      'To Premium on Redemption of Debentures A/c ₹10,000',
      'To Securities Premium A/c ₹10,000',
      'Discount on Issue A/c Dr ₹10,000'
    ],
    targetState: 'Bank A/c Dr ₹1,00,000 Loss on Issue of Debentures A/c Dr ₹10,000 To 10% Debentures A/c ₹1,00,000 To Premium on Redemption of Debentures A/c ₹10,000',
    validationHint: 'You need 2 debits (Bank, Loss on Issue) and 2 credits (Debentures, Premium on Redemption).',
    explanation: 'Issue entry: Debit Bank (₹1,00,000), Debit Loss on Issue (₹10,000); Credit 10% Debentures (₹1,00,000 face value), Credit Premium on Redemption (₹10,000 non-current liability).',
    hints: [
      'Bank receives face value (₹1,00,000).',
      'Loss on Issue is debited for future redemption premium (₹10,000).',
      'Credit Debentures for ₹1,00,000 and Premium on Redemption for ₹10,000.'
    ],
  },
  // 12. Standard - TDS on Debenture Interest Calculation (c12_acc_035)
  {
    id: 'ch_12',
    nodeId: NODE_C12_ACC_035,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Apex Ltd has ₹40,00,000 of 10% Debentures. Annual interest is payable with TDS @ 10% under Section 193 of Income Tax Act. What is the NET amount paid directly to debenture holders (in ₹)?',
    correctAnswer: 360000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Gross Interest = ₹40,00,000 × 10% = ₹4,00,000. TDS @ 10% = ₹40,000. Net payment to debenture holders = ₹4,00,000 − ₹40,000 = ₹3,60,000. The ₹40,000 TDS is remitted to Central Government.',
    hints: [
      'Gross interest = 10% on face value of ₹40,00,000.',
      'Deduct 10% TDS from gross interest.',
      'Net payment = ₹4,00,000 − ₹40,000.'
    ],
  },
  // 13. Advanced - Schedule III Splitting of Debentures (c12_acc_036)
  {
    id: 'ch_13',
    nodeId: NODE_C12_ACC_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'On 31st March 2025, Apex Ltd has ₹60,00,000 of 8% Debentures. ₹20,00,000 matures on 30th November 2025, and ₹40,00,000 matures in 2028. How are these presented under Schedule III Part I?',
    options: [
      'Entire ₹60,00,000 under Non-Current Liabilities → Long-Term Borrowings',
      '₹40,00,000 under Non-Current Liabilities (Long-Term Borrowings) and ₹20,00,000 under Current Liabilities (Short-Term Borrowings ��� Current Maturities)',
      'Entire ₹60,00,000 under Current Liabilities → Short-Term Borrowings',
      '₹20,00,000 under Trade Payables and ₹40,00,000 under Long-Term Provisions'
    ],
    correctIndex: 1,
    explanation: 'Debentures maturing within 12 months (₹20L) must be carved out and shown under Current Liabilities → Short-Term Borrowings (Current maturities of long-term borrowings). The remainder (₹40L) stays in Long-Term Borrowings.',
    hints: [
      'Check the 12-month boundary from Balance Sheet date (31 March 2025).',
      'November 2025 is within 8 months (<12 months) → Current.',
      '2028 is > 12 months → Non-Current.'
    ],
  },
  // 14. Foundation - Vertical Format Mandate (c12_acc_037)
  {
    id: 'ch_14',
    nodeId: NODE_C12_ACC_037,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which presentation format is statutorily mandated by Section 129 read with Schedule III Part I for corporate Balance Sheets in India?',
    options: [
      'Horizontal T-shape format with Assets on Right and Liabilities on Left',
      'Vertical format with Equity & Liabilities on top and Assets below, single column',
      'Double Account System with Capital & Revenue balance sheets',
      'Freeform columnar layout chosen by board of directors'
    ],
    correctIndex: 1,
    explanation: 'Schedule III Part I mandates a strict VERTICAL format: Equity & Liabilities grouped at top, Assets grouped below, with cross-references to Notes to Accounts.',
    hints: [
      'Think about modern IFRS/Ind AS converged layouts.',
      'Horizontal T-formats are obsolete for Indian corporate balance sheets.',
      'Equity & Liabilities are listed on top, Assets below.'
    ],
  },
  // 15. Advanced - Evaluate Balance Sheet Liquidity Impact (c12_acc_037)
  {
    id: 'ch_15',
    nodeId: NODE_C12_ACC_037,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A company sells equipment on a 3-year deferred payment plan: ₹30 Lakh due in 6 months, and ₹60 Lakh due in 24 months. How should the auditor classify Trade Receivables?',
    options: [
      'Entire ₹90 Lakh as Current Assets → Trade Receivables',
      '₹30 Lakh as Current Assets (Trade Receivables) and ₹60 Lakh as Non-Current Assets (Non-Current Trade Receivables / Long-Term Loans)',
      'Entire ₹90 Lakh as Non-Current Investments',
      'Entire ₹90 Lakh as Cash Equivalents'
    ],
    correctIndex: 1,
    explanation: 'The 12-month operating cycle rule dictates that receivables realisable within 12 months (₹30L) are Current Assets, while instalments due after 12 months (₹60L) are Non-Current Assets.',
    hints: [
      'Apply the strict 12-month test to each instalment.',
      '6 months is within 12 months → Current Asset.',
      '24 months exceeds 12 months → Non-Current Asset.'
    ],
  },
  // 16. Standard - AS-4 Proposed Dividend Adjustment (c12_acc_038)
  {
    id: 'ch_16',
    nodeId: NODE_C12_ACC_038,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Trial Balance shows Surplus in P&L at ₹80,00,000 (after debiting proposed dividend ₹10,00,000) and Proposed Dividend ₹10,00,000 under Short-Term Provisions. Applying AS-4 (Revised), how must you adjust?',
    options: [
      'Leave both figures unchanged in the final Balance Sheet',
      'Remove Proposed Dividend from Short-Term Provisions (��₹10L), Add back ₹10L to Surplus (making it ₹90L), and disclose in Notes as Contingent Liability',
      'Transfer ₹10L to General Reserve and show ₹80L in Cash',
      'Deduct ₹10L from Share Capital directly'
    ],
    correctIndex: 1,
    explanation: 'Proposed dividend is not a liability. We remove it from Short-Term Provisions, restore Surplus in P&L to ₹90,00,000 (+₹10L), and disclose ₹10,00,000 in Note (Contingent Liabilities). Total Equity & Liabilities remains unchanged!',
    hints: [
      'Proposed dividend cannot sit under Short-Term Provisions.',
      'Since Surplus was reduced prematurely, add back the ₹10L.',
      'Disclose the proposed dividend in Notes to Accounts.'
    ],
    misconceptionIndex: 0,
  },
  // 17. Advanced - Compare Interim vs Proposed Dividend (c12_acc_038)
  {
    id: 'ch_17',
    nodeId: NODE_C12_ACC_038,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Analyze why an INTERIM dividend declared by the Board under Section 123(3) IS recognized as a liability in the current year, while a PROPOSED final dividend is NOT.',
    options: [
      'Because interim dividends are smaller in rupee value than final dividends',
      'Because Board declaration of interim dividend creates an immediate binding statutory obligation without requiring AGM approval, whereas proposed final dividend requires AGM shareholder approval',
      'Because interim dividends are exempt from corporate income tax',
      'Because interim dividends are paid out of Share Capital rather than profits'
    ],
    correctIndex: 1,
    explanation: 'Under Section 123(3), the Board has sole statutory authority to declare and pay interim dividends, instantly creating a present obligation. Proposed final dividend is merely a recommendation that becomes a liability only when ratified at the AGM.',
    hints: [
      'Who has the legal power to declare interim vs final dividend?',
      'Does interim dividend need shareholder ratification at an AGM?',
      'Present obligation vs contingent recommendation.'
    ],
  },
  // 18. Foundation - Amendment 2 PPE Renaming (c12_acc_039)
  {
    id: 'ch_18',
    nodeId: NODE_C12_ACC_039,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Following the MCA notification of 11th February 2021 (Amendment 2), what replaced the old sub-head "Fixed Assets" in Schedule III?',
    options: [
      'Non-Current Tangibles Only',
      'Property, Plant and Equipment and Intangible Assets (with inner heads PPE and Intangible Assets)',
      'Permanent Productive Capital',
      'Long-Term Operating Resources'
    ],
    correctIndex: 1,
    explanation: 'The MCA replaced "Fixed Assets" with "Property, Plant and Equipment and Intangible Assets", aligning Schedule III with AS 10 (PPE), AS 26 (Intangibles), and Ind AS 16/38.',
    hints: [
      'Look for the exact term matching AS 10 & AS 26.',
      'It combines physical property/plant with non-physical intangibles.',
      '"Property, Plant and Equipment and Intangible Assets".'
    ],
  },
  // 19. Standard - Current Maturities Reclassification (c12_acc_039)
  {
    id: 'ch_19',
    nodeId: NODE_C12_ACC_039,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under Amendment 3 of Schedule III, where must the current portion of long-term bank loans due within 12 months be disclosed?',
    options: [
      'Non-Current Liabilities → Long-Term Borrowings',
      'Current Liabilities → Short-Term Borrowings → Current maturities of long-term borrowings',
      'Current Liabilities → Trade Payables',
      'Shareholders\' Funds → Capital Reserves'
    ],
    correctIndex: 1,
    explanation: 'Amendment 3 requires current maturities of long-term borrowings to be carved out into Current Liabilities → Short-Term Borrowings under "Current maturities of long-term borrowings".',
    hints: [
      'It is due within 12 months, so it is a Current Liability.',
      'It is a borrowing, so it goes under Short-Term Borrowings.',
      'Sub-item title is "Current maturities of long-term borrowings".'
    ],
  },
  // 20. Foundation - Amendment 4 Label Change (c12_acc_040)
  {
    id: 'ch_20',
    nodeId: NODE_C12_ACC_040,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under MCA Amendment 4 (Feb 2021), how must share premium be titled under Reserves and Surplus on the Balance Sheet?',
    options: [
      'Securities Premium Reserve Account',
      'Securities Premium (the word "Reserve" is dropped to align with Section 52)',
      'Share Premium Reserve',
      'Capital Profit on Issue of Shares'
    ],
    correctIndex: 1,
    explanation: 'Amendment 4 dropped the word "Reserve" from the Balance Sheet line, simplifying it to "Securities Premium" to match Section 52 of the Companies Act 2013.',
    hints: [
      'The word "Reserve" was removed.',
      'It matches Section 52 phrasing: "Securities Premium".',
      'The ledger remains Securities Premium A/c, but the Balance sheet label is "Securities Premium".'
    ],
  },
  // 21. Advanced - Schedule III Part II Scope Exclusion (c12_acc_040)
  {
    id: 'ch_21',
    nodeId: NODE_C12_ACC_040,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'For the ISC Class 12 final accounts exam, what is the statutory scope requirement regarding Schedule III Part I vs Part II?',
    options: [
      'Students must prepare both Part I (Balance Sheet) and Part II (Statement of Profit and Loss) in full',
      'Students must prepare ONLY Schedule III Part I (Balance Sheet); Part II (Statement of P&L) is NOT required, and profit is shown directly as Surplus in P&L',
      'Students must prepare only Part II and skip the Balance Sheet',
      'Students can use old Class 11 horizontal Trading & P&L accounts'
    ],
    correctIndex: 1,
    explanation: 'The ISC Class 12 syllabus deliberately excludes Schedule III Part II (Statement of Profit and Loss). Students are required to prepare only Schedule III Part I (Balance Sheet), incorporating net surplus directly under Reserves and Surplus.',
    hints: [
      'Does ISC require you to draw the entire Statement of P&L layout?',
      'Only the Balance Sheet (Part I) is within final accounts exam scope.',
      'Part II is excluded from the preparation syllabus.'
    ],
  },
  // 22. Advanced - Master Integration Checklist (c12_acc_037 - c12_acc_040)
  {
    id: 'ch_22',
    nodeId: NODE_C12_ACC_040,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Sequence the 4-step MCA audit checklist when modernising a legacy corporate Trial Balance to the 2025 amended Schedule III format:',
    sortItems: [
      'Check 1 (AS-4): Remove Proposed Dividend from provisions & add back to Surplus',
      'Check 2 (PPE): Rename Fixed Assets to "Property, Plant and Equipment and Intangible Assets"',
      'Check 3 (Debt): Reclassify <12 month debt to Short-Term Borrowings (Current Maturities)',
      'Check 4 (Reserves): Verify "Securities Premium" label (drop "Reserve") & verify Part I balance'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The standard sequential modernisation: (1) AS-4 dividend adjustment, (2) PPE/Intangible asset classification, (3) Current maturities carve-out, (4) Securities Premium terminological compliance & Part I reconciliation.',
    hints: [
      'Start with the AS-4 proposed dividend adjustment.',
      'Next update the Non-Current Asset PPE headings.',
      'Then carve out current maturities of debt.',
      'Finish with Securities Premium label and final Balance Sheet tally.'
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
  nodeId: 'c12_acc_031',
  title: 'Corporate Share Capital & Schedule III Balance Sheet Master Simulation',
  definition: 'Comprehensive mastery of Share Capital presentation, Debentures accounting & write-offs, and Schedule III Part I vertical Balance Sheet preparation with all four MCA amendments.',
  eli5: 'Think of a company like a giant transparent glass building: Share Capital is the foundation built by owners, Debentures are the scaffolding borrowed from lenders, and Schedule III is the official blueprint blueprinting every room in exact vertical order!',
  misconceptions: [
    { misconception: 'Authorised Capital is added into the Balance Sheet totals on the face', correction: 'Authorised Capital is a legal ceiling disclosed only in Notes to Accounts; only Subscribed & Paid-up Capital enters the balance sheet totals.' },
    { misconception: 'Calls in Arrears should be added to Called-up Capital', correction: 'Calls in Arrears represent uncollected funds and MUST be deducted from Called-up Capital.' },
    { misconception: 'Proposed Dividend is a Short-Term Provision in the Balance Sheet', correction: 'Under AS-4 (Revised), Proposed Dividend is not a liability until approved at the AGM; it is disclosed solely in Notes as a contingent liability.' },
    { misconception: 'Debenture discount can be amortized over 5 years as an asset', correction: 'Under Companies Act 2013, debenture discount is a capital loss written off in the year of issue itself (first Securities Premium, then P&L).' },
    { misconception: 'Collateral debentures earn regular coupon interest', correction: 'Collateral debentures are a contingent safety pledge; interest is paid exclusively on the underlying bank loan, not on the collateral debentures.' },
  ],
  diagnosticQuestions: [
    { question: 'Where is Authorised Share Capital shown in Schedule III?', options: ['On the face under Shareholders\' Funds', 'In Notes to Accounts only', 'Under Current Liabilities', 'Under Non-Current Assets'], correctIndex: 1 },
    { question: 'What is the treatment of Calls in Arrears in Note 1?', options: ['Added to Called-up Capital', 'Deducted from Called-up Capital', 'Shown under Current Assets', 'Ignored entirely'], correctIndex: 1 },
    { question: 'How is Forfeited Shares Account balance treated in Note 1?', options: ['Deducted from Paid-up', 'Added to Paid-up Capital', 'Shown under Reserves', 'Credited to P&L'], correctIndex: 1 },
    { question: 'Under Sec 53, can equity shares be issued at a discount?', options: ['Yes, up to 10%', 'No, prohibited except sweat equity', 'Yes, with ROC approval', 'Only for private companies'], correctIndex: 1 },
    { question: 'Where does Premium on Redemption of Debentures appear?', options: ['Reserves and Surplus', 'Other Non-Current Liabilities', 'Short-Term Provisions', 'Deducted from Debentures'], correctIndex: 1 },
    { question: 'What is the statutory order to write off Loss on Issue of Debentures?', options: ['P&L first, then General Reserve', 'Securities Premium first, then Statement of P&L', 'Capital Reserve only', 'Over 10 years as deferred asset'], correctIndex: 1 },
    { question: 'Under AS-4 (Revised), where is proposed dividend shown?', options: ['Short-Term Provisions', 'Notes to Accounts (Contingent Liabilities)', 'Other Current Liabilities', 'Reserves and Surplus deduction'], correctIndex: 1 },
    { question: 'What is the amended label for Fixed Assets under Schedule III?', options: ['Permanent Tangibles', 'Property, Plant and Equipment and Intangible Assets', 'Non-Current Operating Assets', 'Fixed Capital Assets'], correctIndex: 1 }
  ],
  masteryCriteria: 'Student achieves 80%+ mastery across all 10 nodes covering Share Capital, Debenture accounting, and the full 2025 amended Schedule III Balance Sheet.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Share Capital Anatomy Lab',
    instruction: 'Adjust Authorised Shares, Calls in Arrears, and Forfeited Shares. Watch how the Note 1 breakdown calculates Subscribed & Paid-up Capital in real time!',
    interactionType: 'share-capital-slider',
    nodeId: NODE_C12_ACC_031,
  },
  {
    title: '2. Debenture Issue & Capital Loss Write-off Engine',
    instruction: 'Toggle Debenture Issue price (Par/Discount/Premium) and Redemption terms (Par/10% Premium). See how Loss on Issue is immediately written off from Securities Premium!',
    interactionType: 'debenture-engine',
    nodeId: NODE_C12_ACC_033,
  },
  {
    title: '3. Collateral & Vendor Acquisition Workbench',
    instruction: 'Simulate taking over a running business. Compare Purchase Consideration vs Net Assets to dynamically generate Goodwill or Capital Reserve!',
    interactionType: 'vendor-calc',
    nodeId: NODE_C12_ACC_034,
  },
  {
    title: '4. The Schedule III Vertical Balance Sheet T-Pipeline',
    instruction: 'Trace accounts through the 4-tier vertical structure. Move sliders to verify that Total Equity & Liabilities dynamically equals Total Assets!',
    interactionType: 'pipeline-balance',
    nodeId: NODE_C12_ACC_037,
  },
  {
    title: '5. The Four MCA Amendments Diagnostic Suite',
    instruction: 'Toggle the 4 statutory amendments (AS-4 dividend, PPE rename, Current maturities split, Securities Premium label) to achieve 100% MCA compliance.',
    interactionType: 'amendments-toggle',
    nodeId: NODE_C12_ACC_039,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Apex Ltd issues ₹10,00,000 Debentures at Par but redeemable at 10% Premium, what happens to Liabilities at the instant of issue?',
    options: [
      'Total liabilities increase by ₹10,00,000 only',
      'Total liabilities increase by ₹11,00,000 (₹10L Debentures + ₹1L Premium on Redemption) balanced by ₹1L Loss on Issue debited',
      'No liability is created until redemption date',
      'Reserves and surplus increase by ₹1,00,000'
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 2 and switch Redemption Term to "10% Premium". Observe the simultaneous creation of "Premium on Redemption A/c" under Other Non-Current Liabilities!',
    nodeId: NODE_C12_ACC_035,
  },
  {
    question: 'Predict: If ₹30 Lakh of a 5-year ₹100 Lakh Term Loan matures within 9 months, what happens to the Current Ratio when Amendment 3 is applied?',
    options: [
      'Current Ratio remains unchanged',
      'Current Ratio drops because Current Liabilities increase by ₹30 Lakh without increasing Current Assets',
      'Current Ratio rises because Long-Term Debt decreased',
      'Working Capital increases by ₹30 Lakh'
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 5 and toggle "Current Maturities Reclassification" to see Current Liabilities expand and the ratio adjust!',
    nodeId: NODE_C12_ACC_039,
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In the Share Capital Lab, what happens when you increase Calls in Arrears from ₹0 to ₹50,000?',
    observableOptions: [
      'Called-up Capital decreases',
      'Subscribed and Paid-up Capital decreases by exactly ₹50,000 while Authorised and Issued stay constant',
      'Authorised capital automatically expands',
      'Reserves and Surplus decrease by ₹50,000'
    ],
    correctIndex: 1,
    nodeId: NODE_C12_ACC_031,
  },
  {
    question: 'Observation: In the Vendor Workbench, when Purchase Consideration exceeds Net Assets, which asset appears on the Balance Sheet?',
    observableOptions: [
      'Capital Reserve under Reserves & Surplus',
      'Goodwill under Non-Current Assets → Intangible Assets',
      'Discount on Issue under Current Assets',
      'Cash and Bank balance increases'
    ],
    correctIndex: 1,
    nodeId: NODE_C12_ACC_034,
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Corporate Financial Auditor for a Day',
  description: 'Download the 2023-24 Annual Report of Tata Motors Ltd or Reliance Industries Ltd from BSE/NSE. Locate the Balance Sheet (Page 150-200) and verify the 4 MCA amendments in practice!',
  steps: [
    'Find "Note 1: Share Capital" and trace Authorised vs Issued vs Subscribed & Paid-up amounts.',
    'Confirm that under Non-Current Assets the sub-head is titled "Property, Plant and Equipment and Intangible Assets".',
    'Locate "Short-Term Borrowings" under Current Liabilities and check for "Current maturities of long-term borrowings".',
    'Check "Note 2: Reserves and Surplus" and confirm that the premium line is labelled "Securities Premium" without the word "Reserve".',
    'Verify that Proposed Dividend is disclosed strictly in the Notes under Contingent Liabilities!'
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function C12_AccountancyDisclosureShareCapitalSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_ACC_031,
  title = DEFAULT_PROPS.title || 'Corporate Share Capital & Balance Sheet Simulation',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['acc'] || { name: 'Accountancy', emoji: '📜', color: 'emerald' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant pattern states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Adaptive difficulty & mastery
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & interactive input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── 15+ INTERACTIVE SIMULATION LAB VARIABLES (30+ state calls) ───
  const [authShares, setAuthShares] = useState(1000000); // 10 Lakh shares
  const [shareFaceVal, setShareFaceVal] = useState(10);   // ₹10 per share
  const [issuedShares, setIssuedShares] = useState(600000);
  const [calledUpPerShare, setCalledUpPerShare] = useState(8);
  const [callsInArrearsVal, setCallsInArrearsVal] = useState(40000);
  const [forfeitedSharesVal, setForfeitedSharesVal] = useState(15000);

  // Debenture lab states
  const [debQty, setDebQty] = useState(20000);
  const [debFaceVal, setDebFaceVal] = useState(100);
  const [debIssueType, setDebIssueType] = useState<'par' | 'premium' | 'discount'>('discount');
  const [debIssueRate, setDebIssueRate] = useState(5); // 5% discount/premium
  const [debRedeemType, setDebRedeemType] = useState<'par' | 'premium'>('premium');
  const [debRedeemPremRate, setDebRedeemPremRate] = useState(10); // 10% redemption premium
  const [secPremAvailable, setSecPremAvailable] = useState(80000);

  // Vendor acquisition lab states
  const [vendorAssets, setVendorAssets] = useState(2500000);
  const [vendorLiabilities, setVendorLiabilities] = useState(500000);
  const [vendorDebShares, setVendorDebShares] = useState(18000);
  const [vendorIssuePrice, setVendorIssuePrice] = useState(120); // ₹100 face + ₹20 premium

  // Schedule III live builder states
  const [ppeLand, setPpeLand] = useState(3000000);
  const [ppeBuilding, setPpeBuilding] = useState(4000000);
  const [intangibleSoftware, setIntangibleSoftware] = useState(500000);
  const [tradeReceivables, setTradeReceivables] = useState(1200000);
  const [cashEquivalents, setCashEquivalents] = useState(1800000);
  const [longTermLoan, setLongTermLoan] = useState(5000000);
  const [currentMaturityLoan, setCurrentMaturityLoan] = useState(1500000);
  const [tradePayablesVal, setTradePayablesVal] = useState(800000);

  // MCA amendments toggle state
  const [as4Applied, setAs4Applied] = useState(true);
  const [ppeRenameApplied, setPpeRenameApplied] = useState(true);
  const [currMatApplied, setCurrMatApplied] = useState(true);
  const [secPremLabelApplied, setSecPremLabelApplied] = useState(true);
  const [proposedDivAmount, setProposedDivAmount] = useState(600000);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES FOR LABS ───
  const calcAuthCap = useMemo(() => authShares * shareFaceVal, [authShares, shareFaceVal]);
  const calcIssuedCap = useMemo(() => issuedShares * shareFaceVal, [issuedShares, shareFaceVal]);
  const calcCalledUpCap = useMemo(() => issuedShares * calledUpPerShare, [issuedShares, calledUpPerShare]);
  const calcPaidUpCap = useMemo(() => {
    return Math.max(0, calcCalledUpCap - callsInArrearsVal + forfeitedSharesVal);
  }, [calcCalledUpCap, callsInArrearsVal, forfeitedSharesVal]);

  // Debenture calculations
  const debTotalFace = useMemo(() => debQty * debFaceVal, [debQty, debFaceVal]);
  const debIssuePremDiscount = useMemo(() => {
    if (debIssueType === 'premium') return (debTotalFace * debIssueRate) / 100;
    if (debIssueType === 'discount') return (debTotalFace * debIssueRate) / 100;
    return 0;
  }, [debTotalFace, debIssueType, debIssueRate]);

  const debRedeemPrem = useMemo(() => {
    if (debRedeemType === 'premium') return (debTotalFace * debRedeemPremRate) / 100;
    return 0;
  }, [debTotalFace, debRedeemType, debRedeemPremRate]);

  const totalCapLoss = useMemo(() => {
    const discountLoss = debIssueType === 'discount' ? debIssuePremDiscount : 0;
    return discountLoss + debRedeemPrem;
  }, [debIssueType, debIssuePremDiscount, debRedeemPrem]);

  const capLossSecPremWriteOff = useMemo(() => {
    return Math.min(totalCapLoss, secPremAvailable);
  }, [totalCapLoss, secPremAvailable]);

  const capLossPlWriteOff = useMemo(() => {
    return Math.max(0, totalCapLoss - capLossSecPremWriteOff);
  }, [totalCapLoss, capLossSecPremWriteOff]);

  // Vendor calculations
  const vendorNetAssets = useMemo(() => vendorAssets - vendorLiabilities, [vendorAssets, vendorLiabilities]);
  const vendorPurchaseConsideration = useMemo(() => vendorDebShares * vendorIssuePrice, [vendorDebShares, vendorIssuePrice]);
  const vendorGoodwillOrCapReserve = useMemo(() => {
    const diff = vendorPurchaseConsideration - vendorNetAssets;
    if (diff > 0) return { type: 'Goodwill', amount: diff };
    if (diff < 0) return { type: 'Capital Reserve', amount: Math.abs(diff) };
    return { type: 'Nil', amount: 0 };
  }, [vendorPurchaseConsideration, vendorNetAssets]);

  // Balance Sheet live balance calculations
  const totalNonCurrentAssets = useMemo(() => ppeLand + ppeBuilding + intangibleSoftware, [ppeLand, ppeBuilding, intangibleSoftware]);
  const totalCurrentAssets = useMemo(() => tradeReceivables + cashEquivalents, [tradeReceivables, cashEquivalents]);
  const totalAssetsCalc = useMemo(() => totalNonCurrentAssets + totalCurrentAssets, [totalNonCurrentAssets, totalCurrentAssets]);

  const nonCurrBorrowingsCalc = useMemo(() => {
    return currMatApplied ? Math.max(0, longTermLoan - currentMaturityLoan) : longTermLoan;
  }, [currMatApplied, longTermLoan, currentMaturityLoan]);

  const shortTermBorrowingsCalc = useMemo(() => {
    return currMatApplied ? currentMaturityLoan : 0;
  }, [currMatApplied, currentMaturityLoan]);

  const totalCurrentLiabCalc = useMemo(() => shortTermBorrowingsCalc + tradePayablesVal, [shortTermBorrowingsCalc, tradePayablesVal]);
  
  // Balancing Surplus
  const derivedSurplus = useMemo(() => {
    const fixedEqLiab = calcPaidUpCap + (secPremAvailable - capLossSecPremWriteOff) + nonCurrBorrowingsCalc + totalCurrentLiabCalc;
    const baseSurplus = totalAssetsCalc - fixedEqLiab;
    return as4Applied ? baseSurplus : baseSurplus - proposedDivAmount;
  }, [totalAssetsCalc, calcPaidUpCap, secPremAvailable, capLossSecPremWriteOff, nonCurrBorrowingsCalc, totalCurrentLiabCalc, as4Applied, proposedDivAmount]);

  const totalEquityAndLiabCalc = useMemo(() => {
    const shareholdersFunds = calcPaidUpCap + (secPremAvailable - capLossSecPremWriteOff) + derivedSurplus;
    return shareholdersFunds + nonCurrBorrowingsCalc + totalCurrentLiabCalc;
  }, [calcPaidUpCap, secPremAvailable, capLossSecPremWriteOff, derivedSurplus, nonCurrBorrowingsCalc, totalCurrentLiabCalc]);

  // Adaptive difficulty filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── 6+ USEEFFECT CALLS ───

  // 1. Initial Load from MasteryStore
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // 2. BKT Adaptivity Effect
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // 3. Canvas 2D Pipeline Animation
  useEffect(() => {
    if (phase !== 'explore' && phase !== 'sandbox' && phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animFrame: number;
    let offset = 0;

    const render = () => {
      offset += 0.8;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw flow line from Journal to Balance Sheet
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#10b981');
      grad.addColorStop(0.5, '#3b82f6');
      grad.addColorStop(1, '#8b5cf6');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(10, 15);
      ctx.lineTo(canvas.width - 10, 15);
      ctx.stroke();

      // Moving particle
      const px = (offset % (canvas.width - 30)) + 15;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(px, 15, 5, 0, Math.PI * 2);
      ctx.fill();

      // Text labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText('Journal & Cash Book', 10, 30);
      ctx.fillText('Ledger Postings', canvas.width / 2 - 40, 30);
      ctx.fillText('Schedule III Part I', canvas.width - 110, 30);

      animFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrame);
  }, [phase]);

  // 4. Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // 5. Speak welcome on discovery
  useEffect(() => {
    if (phase === 'discovery') {
      speechManager.speak('Welcome to the Corporate Share Capital and Schedule III simulation. Let us explore the balance sheet secrets.');
    }
  }, [phase]);

  // 6. Sound effect on slide change
  useEffect(() => {
    if (phase === 'explore') {
      audioManager.play('whoosh');
    }
  }, [currentSlide, phase]);

  // ─── 14+ USECALLBACK EVENT HANDLERS ───

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        audioManager.play('hint');
        setShowHint(true);
        setCurrentHint(challenge.hints[0]);
      }
    }, 10000);
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
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You already know the AS-4 rule!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the 5 foundational corporate accounting labs.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to Free Sandbox Mode. Test any scenario with zero grading pressure!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Prepare for challenges. Test your Schedule III mastery!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now verify by adjusting the controls below.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation! That is the Schedule III mechanism.' : 'Inspect the numbers in the visualization carefully.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Corporate Balance Sheet Master Simulation!');
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

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding work.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us study the complete statutory breakdown together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
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
      const current = prev.length === (challenge.sortItems?.length || 0)
        ? [...prev]
        : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      return current;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleConstructTogglePart = useCallback((part: string) => {
    audioManager.play('pop');
    setConstructParts(prev => {
      if (prev.includes(part)) {
        return prev.filter(p => p !== part);
      } else {
        return [...prev, part];
      }
    });
  }, []);

  const handleConstructSubmit = useCallback(() => {
    handleAnswer(constructParts.join(' '));
  }, [constructParts, handleAnswer]);

  // Chart data for Balance Sheet representation
  const balanceChartData = useMemo(() => [
    { name: 'Share Capital', amount: calcPaidUpCap / 100000, category: 'Equity' },
    { name: 'Reserves & Surplus', amount: (secPremAvailable - capLossSecPremWriteOff + derivedSurplus) / 100000, category: 'Equity' },
    { name: 'Non-Current Liab', amount: nonCurrBorrowingsCalc / 100000, category: 'Liabilities' },
    { name: 'Current Liab', amount: totalCurrentLiabCalc / 100000, category: 'Liabilities' },
    { name: 'PPE & Intangibles', amount: totalNonCurrentAssets / 100000, category: 'Assets' },
    { name: 'Current Assets', amount: totalCurrentAssets / 100000, category: 'Assets' },
  ], [calcPaidUpCap, secPremAvailable, capLossSecPremWriteOff, derivedSurplus, nonCurrBorrowingsCalc, totalCurrentLiabCalc, totalNonCurrentAssets, totalCurrentAssets]);

  // ═══════════════════════════════════════════════════════════════════════════════
  // JSX RENDERING
  // ═══════════════════════════════════════════════════════════════════════════════

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      
      {/* ─── TOP HEADER ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700/50 rounded-2xl">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">ISC Class 12 • Accountancy</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">Schedule III Part I</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Difficulty */}
        <div className="flex items-center gap-2">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 text-xs font-bold rounded-full ${
                difficulty === 'foundation' ? 'bg-green-950 text-green-400 border border-green-700' :
                difficulty === 'advanced' ? 'bg-rose-950 text-rose-400 border border-rose-700' :
                'bg-blue-950 text-blue-400 border border-blue-700'
              }`}
            >
              TIER: {difficulty.toUpperCase()}
            </motion.span>
          )}
          <span className="text-xs px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-slate-300">
            Phase: <strong className="text-emerald-400 uppercase">{phase}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── CANVAS 2D ANIMATION STRIP ─── */}
      <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800/80">
        <canvas ref={canvasRef} width={800} height={35} className="w-full h-8 block rounded" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          PHASE 1: DISCOVERY HOOK
         ═══════════════════════════════════════════════════════════════════════ */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-700/40">
            <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span>🏢</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic bg-slate-900/50 p-2 rounded-lg">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wide text-amber-400">Curiosity Discovery Hook</span>
            <p className="text-base font-semibold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 text-slate-500 border border-slate-800'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xs p-1 bg-slate-700/80 rounded font-mono">{String.fromCharCode(65 + i)}</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! AS-4 (Revised) mandates note disclosure only!' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/30"
                >
                  Step Into the Accounting Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PHASE 2: INTERACTIVE GUIDED EXPLORATION (5 BRILLIANT LABS)
         ═══════════════════════════════════════════════════════════════════════ */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          
          {/* Slide Navigation Tabs */}
          <div className="flex items-center justify-between bg-slate-900 p-2 rounded-2xl border border-slate-800">
            <div className="flex gap-1 overflow-x-auto">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentSlide === idx 
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950' 
                      : 'bg-slate-800/60 text-slate-400 hover:text-white'
                  }`}
                >
                  Lab {idx + 1}
                </motion.button>
              ))}
            </div>
            <span className="text-xs text-slate-400 px-3">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-lg md:text-xl font-black text-emerald-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-xs md:text-sm text-amber-300 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── LAB 1: SHARE CAPITAL ANATOMY ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Interactive Controls</h4>
                    
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Authorised Shares: <strong>{(authShares / 100000).toFixed(1)} Lakh shares</strong></span>
                        <span className="text-emerald-400">₹{(calcAuthCap / 100000).toFixed(0)} Lakh</span>
                      </div>
                      <input 
                        type="range" min={500000} max={2000000} step={100000} value={authShares}
                        onChange={(e) => setAuthShares(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Authorised Shares"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Issued Shares: <strong>{(issuedShares / 100000).toFixed(1)} Lakh shares</strong></span>
                        <span className="text-blue-400">₹{(calcIssuedCap / 100000).toFixed(0)} Lakh</span>
                      </div>
                      <input 
                        type="range" min={200000} max={authShares} step={50000} value={issuedShares}
                        onChange={(e) => setIssuedShares(Number(e.target.value))}
                        className="w-full accent-blue-500"
                        aria-label="Issued Shares"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Called-up per Share: <strong>₹{calledUpPerShare}</strong></span>
                        <span className="text-purple-400">Called: ₹{(calcCalledUpCap / 100000).toFixed(1)} Lakh</span>
                      </div>
                      <input 
                        type="range" min={4} max={10} step={1} value={calledUpPerShare}
                        onChange={(e) => setCalledUpPerShare(Number(e.target.value))}
                        className="w-full accent-purple-500"
                        aria-label="Called up amount"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Calls in Arrears (Deducted): <strong className="text-rose-400">₹{callsInArrearsVal.toLocaleString('en-IN')}</strong></span>
                      </div>
                      <input 
                        type="range" min={0} max={150000} step={5000} value={callsInArrearsVal}
                        onChange={(e) => setCallsInArrearsVal(Number(e.target.value))}
                        className="w-full accent-rose-500"
                        aria-label="Calls in arrears"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Forfeited Shares A/c (Added): <strong className="text-emerald-400">₹{forfeitedSharesVal.toLocaleString('en-IN')}</strong></span>
                      </div>
                      <input 
                        type="range" min={0} max={80000} step={5000} value={forfeitedSharesVal}
                        onChange={(e) => setForfeitedSharesVal(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Forfeited shares balance"
                      />
                    </div>
                  </div>

                  {/* Note 1 Live Display */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                    <div className="text-amber-400 font-bold border-b border-slate-800 pb-2">
                      SCHEDULE III PART I — NOTE 1: SHARE CAPITAL
                    </div>

                    <div className="text-slate-400">
                      <div>Authorised Capital:</div>
                      <div className="text-slate-200 pl-3">
                        {authShares.toLocaleString('en-IN')} Equity Shares of ₹{shareFaceVal} each = <strong className="text-white">₹{calcAuthCap.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="text-slate-500 text-[10px] pl-3">(Disclosed in Notes only — does NOT enter Balance Sheet total)</div>
                    </div>

                    <div className="text-slate-400 pt-1">
                      <div>Issued Capital:</div>
                      <div className="text-slate-200 pl-3">
                        {issuedShares.toLocaleString('en-IN')} Equity Shares of ₹{shareFaceVal} each = <strong className="text-white">₹{calcIssuedCap.toLocaleString('en-IN')}</strong>
                      </div>
                    </div>

                    <div className="text-slate-300 pt-2 border-t border-slate-800/80 space-y-1">
                      <div className="font-bold text-emerald-300">Subscribed and Paid-up Capital:</div>
                      <div className="pl-3 flex justify-between text-slate-300">
                        <span>{issuedShares.toLocaleString('en-IN')} shares @ ₹{calledUpPerShare} called up:</span>
                        <span>₹{calcCalledUpCap.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="pl-3 flex justify-between text-rose-400">
                        <span>Less: Calls in Arrears:</span>
                        <span>− ₹{callsInArrearsVal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="pl-3 flex justify-between text-teal-400">
                        <span>Add: Forfeited Shares A/c:</span>
                        <span>+ ₹{forfeitedSharesVal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="pl-3 flex justify-between text-emerald-400 font-bold pt-1 border-t border-slate-700 text-sm">
                        <span>FACE OF BALANCE SHEET FIGURE:</span>
                        <span>₹{calcPaidUpCap.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: DEBENTURE ISSUE & LOSS WRITE-OFF ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* PREDICT-THEN-CHECK */}
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/50 rounded-2xl border border-indigo-700/50 space-y-2">
                      <span className="text-xs font-bold text-indigo-300 uppercase">Predict First</span>
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left bg-slate-800 rounded-xl text-xs text-slate-200 hover:bg-slate-700 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-700/40 text-xs text-emerald-300">
                      ✓ Prediction recorded! Now test the controls below to verify the compound journal entry and Sec 52(2) write-off.
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                      <h4 className="font-bold text-slate-300 uppercase">Debenture Issue Parameters</h4>
                      
                      <div className="flex gap-2">
                        <span className="text-slate-400 self-center">Issue At:</span>
                        {(['par', 'discount', 'premium'] as const).map(type => (
                          <motion.button
                            key={type}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setDebIssueType(type)}
                            className={`px-3 py-1 rounded-lg font-bold uppercase ${
                              debIssueType === type ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {type} ({type === 'par' ? '0%' : `${debIssueRate}%`})
                          </motion.button>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <span className="text-slate-400 self-center">Redeemable At:</span>
                        {(['par', 'premium'] as const).map(type => (
                          <motion.button
                            key={type}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setDebRedeemType(type)}
                            className={`px-3 py-1 rounded-lg font-bold uppercase ${
                              debRedeemType === type ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {type} ({type === 'par' ? 'Par' : `${debRedeemPremRate}% Prem`})
                          </motion.button>
                        ))}
                      </div>

                      <div className="pt-2">
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>Securities Premium Available: <strong>₹{secPremAvailable.toLocaleString('en-IN')}</strong></span>
                        </div>
                        <input 
                          type="range" min={0} max={250000} step={10000} value={secPremAvailable}
                          onChange={(e) => setSecPremAvailable(Number(e.target.value))}
                          className="w-full accent-amber-500"
                          aria-label="Available Securities Premium"
                        />
                      </div>
                    </div>

                    {/* Journal Entry Generator */}
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                      <div className="text-indigo-300 font-bold border-b border-slate-800 pb-2">
                        JOURNAL ENTRY AT ISSUE & WRITE-OFF (SEC 52)
                      </div>

                      <div className="space-y-1 text-slate-300">
                        <div className="text-emerald-400">1. Issue Entry:</div>
                        <div className="pl-2">Bank A/c Dr ₹{(debTotalFace + (debIssueType === 'premium' ? debIssuePremDiscount : -debIssuePremDiscount)).toLocaleString('en-IN')}</div>
                        {totalCapLoss > 0 && (
                          <div className="pl-2 text-rose-400">Loss on Issue of Debentures A/c Dr ₹{totalCapLoss.toLocaleString('en-IN')}</div>
                        )}
                        <div className="pl-6 text-slate-200">To 9% Debentures A/c ₹{debTotalFace.toLocaleString('en-IN')}</div>
                        {debIssueType === 'premium' && (
                          <div className="pl-6 text-amber-400">To Securities Premium A/c ₹{debIssuePremDiscount.toLocaleString('en-IN')}</div>
                        )}
                        {debRedeemType === 'premium' && (
                          <div className="pl-6 text-purple-400">To Premium on Redemption A/c ₹{debRedeemPrem.toLocaleString('en-IN')}</div>
                        )}
                      </div>

                      {totalCapLoss > 0 && (
                        <div className="space-y-1 text-slate-300 pt-2 border-t border-slate-800">
                          <div className="text-amber-400">2. Capital Loss Write-off Entry:</div>
                          <div className="pl-2 text-amber-300">Securities Premium A/c Dr ₹{capLossSecPremWriteOff.toLocaleString('en-IN')} (Max available)</div>
                          {capLossPlWriteOff > 0 && (
                            <div className="pl-2 text-rose-300">Statement of P&L A/c Dr ₹{capLossPlWriteOff.toLocaleString('en-IN')} (Balance charge)</div>
                          )}
                          <div className="pl-6 text-slate-200">To Loss on Issue of Debentures A/c ₹{totalCapLoss.toLocaleString('en-IN')}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: VENDOR CONSIDERATION & COLLATERAL ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                    <h4 className="font-bold text-slate-300 uppercase">Vendor Acquisition Simulator</h4>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Assets Taken Over: <strong>₹{vendorAssets.toLocaleString('en-IN')}</strong></span>
                      </div>
                      <input 
                        type="range" min={1000000} max={5000000} step={100000} value={vendorAssets}
                        onChange={(e) => setVendorAssets(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Assets Taken Over"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Liabilities Taken Over: <strong>₹{vendorLiabilities.toLocaleString('en-IN')}</strong></span>
                      </div>
                      <input 
                        type="range" min={200000} max={1500000} step={50000} value={vendorLiabilities}
                        onChange={(e) => setVendorLiabilities(Number(e.target.value))}
                        className="w-full accent-rose-500"
                        aria-label="Liabilities Taken Over"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Debentures Issued to Vendor: <strong>{vendorDebShares.toLocaleString('en-IN')} debentures</strong></span>
                      </div>
                      <input 
                        type="range" min={5000} max={35000} step={1000} value={vendorDebShares}
                        onChange={(e) => setVendorDebShares(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Debentures Issued"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Issue Price per Debenture: <strong>₹{vendorIssuePrice} (₹100 Face + ₹{vendorIssuePrice - 100} Prem)</strong></span>
                      </div>
                      <input 
                        type="range" min={100} max={150} step={5} value={vendorIssuePrice}
                        onChange={(e) => setVendorIssuePrice(Number(e.target.value))}
                        className="w-full accent-amber-500"
                        aria-label="Issue price per debenture"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
                    <div className="text-purple-300 font-bold border-b border-slate-800 pb-2">
                      BUSINESS TAKEOVER COMPUTATION
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>Total Assets:</span>
                        <span>₹{vendorAssets.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-rose-400">
                        <span>Less Liabilities:</span>
                        <span>− ₹{vendorLiabilities.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-emerald-400 font-bold border-t border-slate-800 pt-1">
                        <span>NET ASSETS ACQUIRED:</span>
                        <span>₹{vendorNetAssets.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-slate-800">
                      <div className="flex justify-between text-slate-300">
                        <span>Purchase Consideration ({vendorDebShares} × ₹{vendorIssuePrice}):</span>
                        <span className="font-bold text-indigo-300">₹{vendorPurchaseConsideration.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl border ${
                      vendorGoodwillOrCapReserve.type === 'Goodwill' 
                        ? 'bg-amber-950/40 border-amber-600 text-amber-300'
                        : vendorGoodwillOrCapReserve.type === 'Capital Reserve'
                        ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}>
                      <div className="font-bold">RESULTING ACCOUNT:</div>
                      <div className="text-sm font-black mt-1">
                        {vendorGoodwillOrCapReserve.type} : ₹{vendorGoodwillOrCapReserve.amount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] mt-1 opacity-80">
                        {vendorGoodwillOrCapReserve.type === 'Goodwill' 
                          ? 'Debited under Non-Current Assets → Intangible Assets (overpaid for business reputation)'
                          : 'Credited under Shareholders\' Funds → Reserves & Surplus (bargain purchase profit)'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: SCHEDULE III VERTICAL BALANCE SHEET ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Visual Vertical Statement */}
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                      <div className="text-emerald-400 font-bold border-b border-slate-800 pb-2">
                        SCHEDULE III PART I — VERTICAL BALANCE SHEET EXTRACT
                      </div>

                      <div className="space-y-1 text-slate-300">
                        <div className="text-indigo-400 font-bold">I. EQUITY AND LIABILITIES</div>
                        <div className="pl-2 font-semibold text-slate-400">1. Shareholders\' Funds:</div>
                        <div className="pl-4 flex justify-between">
                          <span>(a) Share Capital [Note 1]:</span>
                          <span>₹{(calcPaidUpCap / 100000).toFixed(1)} L</span>
                        </div>
                        <div className="pl-4 flex justify-between">
                          <span>(b) Reserves and Surplus:</span>
                          <span>₹{((secPremAvailable - capLossSecPremWriteOff + derivedSurplus) / 100000).toFixed(1)} L</span>
                        </div>

                        <div className="pl-2 font-semibold text-slate-400 pt-1">2. Non-Current Liabilities:</div>
                        <div className="pl-4 flex justify-between">
                          <span>(a) Long-Term Borrowings (Term Loan):</span>
                          <span>₹{(nonCurrBorrowingsCalc / 100000).toFixed(1)} L</span>
                        </div>

                        <div className="pl-2 font-semibold text-slate-400 pt-1">3. Current Liabilities:</div>
                        <div className="pl-4 flex justify-between text-amber-300">
                          <span>(a) Short-Term Borrowings (Current Maturities):</span>
                          <span>₹{(shortTermBorrowingsCalc / 100000).toFixed(1)} L</span>
                        </div>
                        <div className="pl-4 flex justify-between">
                          <span>(b) Trade Payables:</span>
                          <span>₹{(tradePayablesVal / 100000).toFixed(1)} L</span>
                        </div>

                        <div className="pl-2 flex justify-between font-black text-emerald-400 border-t border-slate-700 pt-1 text-sm">
                          <span>TOTAL EQUITY & LIABILITIES:</span>
                          <span>₹{(totalEquityAndLiabCalc / 100000).toFixed(1)} L</span>
                        </div>
                      </div>

                      <div className="space-y-1 text-slate-300 pt-2 border-t border-slate-800">
                        <div className="text-indigo-400 font-bold">II. ASSETS</div>
                        <div className="pl-2 font-semibold text-slate-400">1. Non-Current Assets:</div>
                        <div className="pl-4 flex justify-between">
                          <span>(a) PPE and Intangible Assets:</span>
                          <span>₹{(totalNonCurrentAssets / 100000).toFixed(1)} L</span>
                        </div>

                        <div className="pl-2 font-semibold text-slate-400 pt-1">2. Current Assets:</div>
                        <div className="pl-4 flex justify-between">
                          <span>(c) Trade Receivables:</span>
                          <span>₹{(tradeReceivables / 100000).toFixed(1)} L</span>
                        </div>
                        <div className="pl-4 flex justify-between">
                          <span>(d) Cash and Bank Balances:</span>
                          <span>₹{(cashEquivalents / 100000).toFixed(1)} L</span>
                        </div>

                        <div className="pl-2 flex justify-between font-black text-emerald-400 border-t border-slate-700 pt-1 text-sm">
                          <span>TOTAL ASSETS:</span>
                          <span>₹{(totalAssetsCalc / 100000).toFixed(1)} L</span>
                        </div>
                      </div>
                    </div>

                    {/* Chart Visualization */}
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Financial Position Breakdown (₹ in Lakhs)</h4>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={balanceChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                            <XAxis dataKey="name" stroke="#64748b" fontSize={9} angle={-25} textAnchor="end" interval={0} />
                            <YAxis stroke="#64748b" fontSize={10} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, fontSize: 11 }} />
                            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                              {balanceChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.category === 'Assets' ? '#10b981' : entry.category === 'Equity' ? '#6366f1' : '#f59e0b'} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center gap-4 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-indigo-500 rounded-sm"></span> Equity</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-amber-500 rounded-sm"></span> Liabilities</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm"></span> Assets</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: THE FOUR MCA AMENDMENTS SUITE ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Amendment 1 */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-emerald-400">1. AS-4 Proposed Dividend</span>
                        <input 
                          type="checkbox" checked={as4Applied} onChange={(e) => setAs4Applied(e.target.checked)}
                          className="w-4 h-4 accent-emerald-500 rounded"
                          aria-label="Toggle AS-4 Proposed Dividend rule"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {as4Applied 
                          ? '✓ Compliant: Proposed dividend disclosed ONLY in Notes (Contingent Liability). Not in Provisions!'
                          : '✗ Non-compliant: Treated as Short-Term Provision in Balance sheet (Old repealed rule).'}
                      </p>
                    </div>

                    {/* Amendment 2 */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-blue-400">2. PPE & Intangibles Renaming</span>
                        <input 
                          type="checkbox" checked={ppeRenameApplied} onChange={(e) => setPpeRenameApplied(e.target.checked)}
                          className="w-4 h-4 accent-blue-500 rounded"
                          aria-label="Toggle PPE renaming amendment"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {ppeRenameApplied
                          ? '✓ Compliant: "Property, Plant and Equipment and Intangible Assets" used. Aligns with AS 10/26.'
                          : '✗ Non-compliant: Using outdated "Fixed Assets" or "Tangible Assets" label.'}
                      </p>
                    </div>

                    {/* Amendment 3 */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-amber-400">3. Current Maturities of Debt</span>
                        <input 
                          type="checkbox" checked={currMatApplied} onChange={(e) => setCurrMatApplied(e.target.checked)}
                          className="w-4 h-4 accent-amber-500 rounded"
                          aria-label="Toggle Current Maturities amendment"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {currMatApplied
                          ? '✓ Compliant: ₹15L maturing in <12m carved out into Short-Term Borrowings.'
                          : '✗ Non-compliant: Entire loan parked in Long-Term Borrowings, hiding near-term liability.'}
                      </p>
                    </div>

                    {/* Amendment 4 */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-purple-400">4. "Securities Premium" Label</span>
                        <input 
                          type="checkbox" checked={secPremLabelApplied} onChange={(e) => setSecPremLabelApplied(e.target.checked)}
                          className="w-4 h-4 accent-purple-500 rounded"
                          aria-label="Toggle Securities Premium label amendment"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {secPremLabelApplied
                          ? '✓ Compliant: Labelled "Securities Premium" (dropped "Reserve" to match Sec 52).'
                          : '✗ Non-compliant: Writing "Securities Premium Reserve" on the Balance Sheet.'}
                      </p>
                    </div>
                  </div>

                  {/* Compliance Gauge */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-300">MCA Statutory Compliance Index:</div>
                      <div className="text-xs text-slate-400">All 4 amendments must be active for a 100% compliant Balance Sheet.</div>
                    </div>
                    <div className="text-right font-mono font-bold text-lg">
                      <span className={
                        (as4Applied && ppeRenameApplied && currMatApplied && secPremLabelApplied)
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }>
                        {([as4Applied, ppeRenameApplied, currMatApplied, secPremLabelApplied].filter(Boolean).length) * 25}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Slide Navigation Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-30"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl text-xs font-black shadow-lg"
                  >
                    Enter Free Sandbox Mode →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PHASE 3: FREE PLAY SANDBOX
         ═══════════════════════════════════════════════════════════════════════ */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-black text-emerald-300">Free Practice Sandbox: Live Corporate Balance Sheet Engine</h3>
              <p className="text-xs text-slate-400 mt-1">
                Freely manipulate capital, debenture parameters, and asset values without grading pressure. Verify the double-entry equality.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-950"
            >
              Ready for Graded Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Capital & Reserves */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-indigo-400 uppercase">1. Shareholders\' Funds</h4>
              <div>
                <span className="text-slate-400">Issued Shares:</span>
                <input type="range" min={300000} max={1000000} step={50000} value={issuedShares} onChange={(e) => setIssuedShares(Number(e.target.value))} className="w-full accent-indigo-500" />
                <div className="text-right text-slate-200">{(issuedShares / 100000).toFixed(1)} Lakh shares</div>
              </div>
              <div>
                <span className="text-slate-400">Calls in Arrears:</span>
                <input type="range" min={0} max={100000} step={5000} value={callsInArrearsVal} onChange={(e) => setCallsInArrearsVal(Number(e.target.value))} className="w-full accent-rose-500" />
                <div className="text-right text-rose-400">− ₹{callsInArrearsVal.toLocaleString('en-IN')}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-emerald-400">
                Paid-up Capital: ₹{(calcPaidUpCap / 100000).toFixed(2)} Lakh
              </div>
            </div>

            {/* Column 2: Liabilities & Borrowings */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-amber-400 uppercase">2. Borrowings & Debt</h4>
              <div>
                <span className="text-slate-400">Total Term Loan:</span>
                <input type="range" min={2000000} max={10000000} step={500000} value={longTermLoan} onChange={(e) => setLongTermLoan(Number(e.target.value))} className="w-full accent-amber-500" />
                <div className="text-right text-slate-200">₹{(longTermLoan / 100000).toFixed(1)} Lakh</div>
              </div>
              <div>
                <span className="text-slate-400">Current Maturity (Due &lt;12m):</span>
                <input type="range" min={0} max={longTermLoan} step={250000} value={currentMaturityLoan} onChange={(e) => setCurrentMaturityLoan(Number(e.target.value))} className="w-full accent-teal-500" />
                <div className="text-right text-teal-400">₹{(currentMaturityLoan / 100000).toFixed(1)} Lakh (Short-Term)</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-amber-300">
                Long-Term Borrowing: ₹{(nonCurrBorrowingsCalc / 100000).toFixed(2)} Lakh
              </div>
            </div>

            {/* Column 3: Live Assets */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-emerald-400 uppercase">3. Assets Base</h4>
              <div>
                <span className="text-slate-400">PPE (Land & Building):</span>
                <input type="range" min={3000000} max={12000000} step={500000} value={ppeLand} onChange={(e) => setPpeLand(Number(e.target.value))} className="w-full accent-emerald-500" />
                <div className="text-right text-slate-200">₹{((ppeLand + ppeBuilding) / 100000).toFixed(1)} Lakh</div>
              </div>
              <div>
                <span className="text-slate-400">Current Assets (Trade Rec + Cash):</span>
                <input type="range" min={1000000} max={6000000} step={200000} value={cashEquivalents} onChange={(e) => setCashEquivalents(Number(e.target.value))} className="w-full accent-blue-500" />
                <div className="text-right text-blue-300">₹{((tradeReceivables + cashEquivalents) / 100000).toFixed(1)} Lakh</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl font-mono text-[11px] text-emerald-300">
                Total Assets: ₹{(totalAssetsCalc / 100000).toFixed(2)} Lakh
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PHASE 4: GRADED CHALLENGES (20+ CISCE NEP 2020 COMPETENCY ITEMS)
         ═══════════════════════════════════════════════════════════════════════ */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          
          {/* Progress & Difficulty Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-slate-400">
                Competency: <strong className="text-indigo-400 uppercase">{challenge.competencyLevel}</strong>
              </span>
            </div>
            <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div 
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-3xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
            }`}
          >
            <div className="flex justify-between items-start gap-4 mb-4">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono">
                {challenge.id.toUpperCase()}
              </span>
              <span className="text-xs text-amber-400 font-semibold uppercase">
                {challenge.difficulty} TIER
              </span>
            </div>

            <p className="text-base md:text-lg font-bold text-white leading-relaxed mb-6">
              {challenge.question}
            </p>

            {/* MCQ Types */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : wrongFlash
                        ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                        : 'bg-slate-800/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600 border border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs p-1 bg-slate-700 rounded font-mono text-slate-300">{String.fromCharCode(65 + i)}</span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-label Diagram Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag each tier label below onto its target position:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['cap_level_1', 'cap_level_2', 'cap_level_3', 'cap_level_4'].map((targetId, idx) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-2xl border-2 border-dashed transition-all flex justify-between items-center ${
                        droppedLabels[targetId] 
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                          : 'border-slate-700 bg-slate-950/60 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold">Tier {idx + 1} Slot:</span>
                      <span className="text-xs font-bold">{droppedLabels[targetId] || '[Drop Label Here]'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="mt-2 px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  Verify Hierarchy Mapping
                </motion.button>
              </div>
            )}

            {/* Drag-sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to arrange steps in the correct logical sequence:</p>
                {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map((idx, i) => challenge.sortItems![idx]) : challenge.sortItems).map((item, displayIdx) => (
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
                    className="p-3.5 bg-slate-800 rounded-2xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-bold text-[10px]">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-2 px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  Submit Sequence Order
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter rupee amount"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono text-sm w-64 focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-emerald-600 text-white font-bold text-xs rounded-2xl"
                  >
                    Verify Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Entry Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleConstructTogglePart(part)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                        constructParts.includes(part)
                          ? 'bg-emerald-600 text-white border border-emerald-400'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {constructParts.includes(part) ? '✓ ' : '+ '} {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-3 py-1 bg-indigo-900/60 border border-indigo-700 text-indigo-200 rounded-lg text-xs font-mono">
                      {part}
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-600 text-xs italic">Click parts above to assemble your compound journal entry...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConstructSubmit}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  Verify Constructed Entry
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Step-by-Step Statutory Breakdown
                </div>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs md:text-sm text-amber-100 leading-relaxed"
                  >
                    <strong className="text-amber-400">{idx + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-lg"
                  >
                    Reveal Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-2 block px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs rounded-xl shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Master Simulation →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PHASE 5: COMPLETION, REFLECTION & REAL-WORLD AUDIT
         ═══════════════════════════════════════════════════════════════════════ */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-slate-900 to-emerald-950/40 rounded-3xl border border-emerald-700/50 text-center space-y-3">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Simulation Completed!</h2>
            <p className="text-sm text-slate-300">
              You have mastered Corporate Share Capital & Schedule III Balance Sheet compliance.
            </p>
            <div className="flex justify-center gap-6 pt-2 font-mono">
              <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Final Score</div>
                <div className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400">Mastery Level</div>
                <div className="text-xl font-black text-indigo-400 uppercase">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-emerald-400 mb-1">Performance Evaluation:</h3>
            <p className="text-xs md:text-sm text-slate-300">
              {errors === 0
                ? 'Flawless performance! You possess an auditor-grade command of Schedule III Part I and all MCA amendments!'
                : errors <= 3
                ? 'Exceptional work! You have strong grasp of share capital hierarchy, debenture write-offs, and AS-4 adjustments.'
                : errors <= 7
                ? 'Good effort! Review the specific misconception profile below to solidify your understanding of current maturities and Sec 52 rules.'
                : 'Keep practicing! Review the 5 interactive labs in free sandbox mode to strengthen your balance sheet skills.'}
            </p>
          </div>

          {/* Misconception Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile:</h3>
              <p className="text-xs text-slate-400">These specific gaps were triggered during your session. Review their corrections:</p>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl text-xs space-y-1">
                    <div className="text-rose-400 font-bold">❌ {m.misconception}</div>
                    <div className="text-emerald-300">✓ {m.correction}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-amber-950/30 rounded-2xl border border-amber-800/50 space-y-2">
            <h3 className="text-sm font-bold text-amber-300">Spaced Repetition Schedule (SM-2 Algorithm):</h3>
            <p className="text-xs text-slate-300">
              Your next review interval is scheduled in{' '}
              <strong className="text-amber-400 font-mono">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>
              . Revisit to lock this into long-term memory for board exams!
            </p>
          </div>

          {/* Real World Activity */}
          <div className="p-6 bg-indigo-950/30 rounded-2xl border border-indigo-800/50 space-y-3">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-1 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-indigo-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C12_AccountancyDisclosureShareCapitalSim };
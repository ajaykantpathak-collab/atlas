'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERAL DECLARATIONS ───
const NODE_C12_ACC_021 = 'c12_acc_021';
const NODE_C12_ACC_022 = 'c12_acc_022';
const NODE_C12_ACC_023 = 'c12_acc_023';
const NODE_C12_ACC_024 = 'c12_acc_024';
const NODE_C12_ACC_025 = 'c12_acc_025';
const NODE_C12_ACC_026 = 'c12_acc_026';
const NODE_C12_ACC_027 = 'c12_acc_027';
const NODE_C12_ACC_028 = 'c12_acc_028';
const NODE_C12_ACC_029 = 'c12_acc_029';
const NODE_C12_ACC_030 = 'c12_acc_030';

const ALL_NODE_IDS = [
  NODE_C12_ACC_021,
  NODE_C12_ACC_022,
  NODE_C12_ACC_023,
  NODE_C12_ACC_024,
  NODE_C12_ACC_025,
  NODE_C12_ACC_026,
  NODE_C12_ACC_027,
  NODE_C12_ACC_028,
  NODE_C12_ACC_029,
  NODE_C12_ACC_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Apex Industrial Corporation & Heritage Logistics Reconstitution',
  intro: 'You have been appointed lead audit partner at Batliboi & Associates. Two major corporate events require your financial arbitration: (1) The retirement of senior partner B from Heritage Logistics (and potential dissolution under Section 48), and (2) The multi-tier public share offering and forfeiture-reissue cycle for Apex Solar Dynamics Ltd under the Companies Act 2013.',
  context: 'From computing Gaining Ratios and Hidden Goodwill to balancing Section 48 priority waterfalls and executing pro-rata share forfeitures, your entries dictate legal compliance and corporate solvency.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When Partner B retires from firm A-B-C (Old Ratio 3:2:1) and the partnership deed is completely SILENT regarding the new profit-sharing ratio, what is the Gaining Ratio between continuing partners A and C?',
  options: [
    '3:1 (Identical to their relative old profit-sharing ratio)',
    '1:1 (They automatically gain equally by default law)',
    '3:2 (They gain in proportion to the retiring partner)',
    '0:1 (Only the junior partner gains the retired share)',
  ],
  correctIndex: 0,
  hintAfter: "When the deed is silent, the retiring partner's share is acquired by remaining partners in their old relative ratio (3:1). Let's explore why!",
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. c12_acc_021 (Foundation, recall)
  {
    id: 'ch_acc_001',
    nodeId: NODE_C12_ACC_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under AS-26 and the Indian Partnership Act 1932, what is the mandatory journal entry to record goodwill compensation on retirement of a partner?',
    options: [
      "Dr Gaining Partners' Capital A/cs (in Gaining Ratio) / Cr Retiring Partner's Capital A/c",
      "Dr Retiring Partner's Capital A/c / Cr Gaining Partners' Capital A/cs (in Gaining Ratio)",
      "Dr Goodwill A/c / Cr All Partners' Capital A/cs (in Old Ratio)",
      "Dr Retiring Partner's Capital A/c / Cr Bank A/c",
    ],
    correctIndex: 0,
    explanation: 'Under AS-26, self-generated goodwill cannot be raised as an asset. The continuing partners who gain a higher profit share compensate the retiring partner by debiting their capital accounts in the gaining ratio and crediting the retiring partner.',
    hints: [
      'Who benefits from the retirement by gaining a larger future profit share?',
      'The continuing gaining partners must compensate the leaving partner.',
      "Debit the continuing gaining partners' capital accounts and credit the retiring partner.",
    ],
    misconceptionIndex: 0,
  },

  // 2. c12_acc_021 (Standard, application)
  {
    id: 'ch_acc_002',
    nodeId: NODE_C12_ACC_021,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A, B, and C share profits in 5:3:2. B retires. B\'s book capital is ₹3,00,000. The firm agrees to pay B ₹3,90,000 in full settlement. What is the value of HIDDEN GOODWILL credited specifically to B?',
    correctAnswer: 90000,
    tolerance: 0,
    unit: '₹',
    explanation: "Hidden goodwill is the excess of agreed final settlement payment over the partner's adjusted book capital balance: ₹3,90,000 - ₹3,00,000 = ₹90,000.",
    hints: [
      'Hidden goodwill represents the unrecorded goodwill payout bundled in the settlement.',
      'Subtract B\'s book capital from the actual lump-sum settlement amount.',
      '₹3,90,000 - ₹3,00,000 = ₹90,000.',
    ],
    misconceptionIndex: 1,
  },

  // 3. c12_acc_021 (Advanced, analysis)
  {
    id: 'ch_acc_003',
    nodeId: NODE_C12_ACC_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'P, Q, and R share profits in 4:3:2. Q retires, and P and R agree to share future profits EQUALLY (1:1). What is the gaining ratio between P and R?',
    options: [
      'P gains 1/18, R gains 5/18 (Gaining Ratio 1:5)',
      'P gains 5/18, R gains 1/18 (Gaining Ratio 5:1)',
      'Gaining Ratio is 4:2 (2:1)',
      'P gains 0, R gains 3/9 (Gaining Ratio 0:1)',
    ],
    correctIndex: 0,
    explanation: 'Old shares: P = 4/9 (8/18), R = 2/9 (4/18). New shares: P = 1/2 (9/18), R = 1/2 (9/18). Gain = New Share - Old Share. P gain = 9/18 - 8/18 = 1/18. R gain = 9/18 - 4/18 = 5/18. Gaining Ratio P:R = 1:5.',
    hints: [
      'Gaining Ratio = New Share - Old Share for each continuing partner.',
      'Convert all fractions to a common denominator of 18: P old = 8/18, R old = 4/18. Both new = 9/18.',
      'P gain = 9/18 - 8/18 = 1/18; R gain = 9/18 - 4/18 = 5/18. Ratio is 1:5.',
    ],
    misconceptionIndex: 0,
  },

  // 4. c12_acc_022 (Foundation, recall)
  {
    id: 'ch_acc_004',
    nodeId: NODE_C12_ACC_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On the death of a partner mid-year, which account is debited to credit the deceased partner\'s estimated share of interim profits up to the date of death?',
    options: [
      'Profit & Loss Suspense Account',
      'Profit & Loss Appropriation Account',
      'Revaluation Account',
      'Realisation Account',
    ],
    correctIndex: 0,
    explanation: 'A temporary nominal account called Profit & Loss Suspense A/c is debited when crediting the deceased partner\'s capital mid-year before final annual accounts are drawn up.',
    hints: [
      'The firm has not yet closed its annual financial books at the moment of mid-year death.',
      'A temporary holding/suspense account is used to bridge until year-end.',
      'Debit Profit & Loss Suspense Account, credit Deceased Partner Capital Account.',
    ],
    misconceptionIndex: 2,
  },

  // 5. c12_acc_022 (Standard, application)
  {
    id: 'ch_acc_005',
    nodeId: NODE_C12_ACC_022,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'X, Y, Z share profits 3:2:1. Z dies on 30th June 2024 (3 months into the fiscal year). Last year\'s profit was ₹2,40,000. Profit is estimated on a time-proportion basis. Calculate Z\'s share of interim profit in ₹.',
    correctAnswer: 10000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Z\'s share = Last Year Profit × Z\'s Ratio × (Time in months / 12) = ₹2,40,000 × (1/6) × (3/12) = ₹40,000 × 1/4 = ₹10,000.',
    hints: [
      'Identify time fraction: 3 months from April 1 to June 30 = 3/12 = 1/4.',
      'Z\'s profit-sharing ratio is 1/(3+2+1) = 1/6.',
      'Multiply ₹2,40,000 × (1/6) × (3/12) = ₹10,000.',
    ],
    misconceptionIndex: 2,
  },

  // 6. c12_acc_023 (Foundation, recall)
  {
    id: 'ch_acc_006',
    nodeId: NODE_C12_ACC_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 48(a) of the Indian Partnership Act 1932, what is the mandatory sequence of applying firm assets on dissolution?',
    options: [
      'Outside Debts → Partners\' Loans → Partners\' Capitals → Surplus to Partners in PSR',
      'Partners\' Capitals → Partners\' Loans → Outside Debts → Surplus',
      'Partners\' Loans → Outside Debts → Partners\' Capitals → Surplus',
      'Outside Debts → Partners\' Capitals → Partners\' Loans → Surplus',
    ],
    correctIndex: 0,
    explanation: 'Section 48 mandates: (1) Third-party debts first, (2) Partner loan advances second, (3) Partner capital balances pro-rata third, and (4) Residual surplus in profit-sharing ratio.',
    hints: [
      'Third-party external creditors bear no ownership risk and must always be settled first.',
      'Partner loans represent debt claims ranking above equity capital.',
      'Correct order: Outside Debts → Partners\' Loans → Partners\' Capitals → Surplus in PSR.',
    ],
    misconceptionIndex: 3,
  },

  // 7. c12_acc_023 (Advanced, evaluation)
  {
    id: 'ch_acc_007',
    nodeId: NODE_C12_ACC_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'On dissolution, firm cash is ₹3,60,000. Outside creditors = ₹3,00,000. Partner A Loan = ₹1,00,000. Capitals: A = ₹2,00,000, B = ₹1,00,000. How much cash does Partner A receive for his LOAN under Section 48?',
    options: [
      '₹60,000 (Full remaining cash after paying outside creditors ₹3,00,000)',
      '₹1,00,000 (By selling personal assets of partner B)',
      '₹40,000 (Pro-rata with capitals)',
      '₹0 (Capitals take precedence)',
    ],
    correctIndex: 0,
    explanation: 'Available cash = ₹3,60,000. First: Outside creditors paid ₹3,00,000 in full. Remaining cash = ₹60,000. Second: Applied entirely toward Partner A\'s loan (owing ₹1,00,000). A receives ₹60,000 on loan. Capitals receive ₹0.',
    hints: [
      'Pay outside creditors ₹3,00,000 first from ₹3,60,000.',
      'Check cash remaining: ₹3,60,000 - ₹3,00,000 = ₹60,000.',
      'Under Section 48, all remaining cash goes to partner loans before any capital repayment.',
    ],
    misconceptionIndex: 3,
  },

  // 8. c12_acc_024 (Standard, application)
  {
    id: 'ch_acc_008',
    nodeId: NODE_C12_ACC_024,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match the dissolution transaction to its correct entry in the Realisation Account framework.',
    dragItems: [
      { label: 'Dr Cash / Cr Realisation', targetId: 't_asset_sale' },
      { label: 'Dr Realisation / Cr Cash', targetId: 't_liab_pay' },
      { label: 'Dr Partner Cap / Cr Realisation', targetId: 't_asset_takeover' },
      { label: 'Dr Realisation / Cr Partner Cap', targetId: 't_liab_takeover' },
    ],
    correctMapping: {
      t_asset_sale: 'Dr Cash / Cr Realisation',
      t_liab_pay: 'Dr Realisation / Cr Cash',
      t_asset_takeover: 'Dr Partner Cap / Cr Realisation',
      t_liab_takeover: 'Dr Realisation / Cr Partner Cap',
    },
    explanation: 'Asset sales bring cash (Cr Realisation). Liabilities paid take cash (Dr Realisation). Asset takeovers debit Partner Capital. Liability assumptions credit Partner Capital.',
    hints: [
      'Selling assets generates proceeds, credited to Realisation Account.',
      'Paying off liabilities consumes cash, debited to Realisation Account.',
      'A partner taking an asset reduces their capital entitlement (Dr Capital, Cr Realisation).',
    ],
    misconceptionIndex: 4,
  },

  // 9. c12_acc_024 (Advanced, analysis)
  {
    id: 'ch_acc_009',
    nodeId: NODE_C12_ACC_024,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Assets transferred to Realisation: ₹5,00,000. Liabilities transferred: ₹2,00,000. Assets realise ₹4,20,000. Liabilities settled at ₹1,90,000. Dissolution expenses paid: ₹10,000. What is the net Realisation Profit (+) or Loss (-) in ₹? (Enter negative number if loss)',
    correctAnswer: -80000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Realisation Dr total = Book Assets (₹5,00,000) + Liab Paid (₹1,90,000) + Expenses (₹10,000) = ₹7,00,000. Realisation Cr total = Book Liab (₹2,00,000) + Asset Proceeds (₹4,20,000) = ₹6,20,000. Net Realisation Loss = ₹7,00,000 - ₹6,20,000 = ₹80,000 (Loss of -₹80,000).',
    hints: [
      'Total Debit items = 5,00,000 + 1,90,000 + 10,000 = 7,00,000.',
      'Total Credit items = 2,00,000 + 4,20,000 = 6,20,000.',
      'Debit exceeds Credit by ₹80,000, resulting in a Realisation Loss of -₹80,000.',
    ],
    misconceptionIndex: 4,
  },

  // 10. c12_acc_025 (Foundation, recall)
  {
    id: 'ch_acc_010',
    nodeId: NODE_C12_ACC_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 52(2) of the Companies Act 2013, which of the following is an ILLEGAL use of the Securities Premium Account?',
    options: [
      'Distribution of annual cash dividends to equity shareholders',
      'Issuing fully paid bonus shares to existing equity members',
      'Writing off preliminary expenses incurred during incorporation',
      'Providing for premium payable on redemption of preference shares',
    ],
    correctIndex: 0,
    explanation: 'Securities Premium is a statutory capital reserve governed by Section 52(2). It CANNOT be used to distribute regular cash dividends or absorb trading losses.',
    hints: [
      'Securities premium is not a free revenue reserve.',
      'Section 52 strictly restricts premium to 5 capital purposes.',
      'Cash dividend distribution from Securities Premium is strictly prohibited.',
    ],
    misconceptionIndex: 5,
  },

  // 11. c12_acc_025 (Standard, application)
  {
    id: 'ch_acc_011',
    nodeId: NODE_C12_ACC_025,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Apex Solar Ltd issues 1,00,000 equity shares of ₹10 each at a premium of ₹3 per share. Application money is ₹5 (including ₹2 premium). What total amount is credited to Securities Premium A/c on transfer of application money?',
    correctAnswer: 200000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Application premium = 1,00,000 shares × ₹2 premium per share = ₹2,00,000 credited to Securities Premium Account upon allotment.',
    hints: [
      'Only the premium portion received on application is credited at this stage.',
      'Premium on application is ₹2 per share on 1,00,000 shares.',
      '1,00,000 × ₹2 = ₹2,00,000.',
    ],
    misconceptionIndex: 5,
  },

  // 12. c12_acc_026 (Standard, application)
  {
    id: 'ch_acc_012',
    nodeId: NODE_C12_ACC_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Zenith Ltd purchased plant & machinery worth ₹6,60,000 from Godrej Ltd. The purchase consideration was settled by issuing equity shares of ₹10 each at a premium of 10% (₹11 per share). How many shares were issued to the vendor?',
    options: [
      '60,000 equity shares',
      '66,000 equity shares',
      '55,000 equity shares',
      '72,600 equity shares',
    ],
    correctIndex: 0,
    explanation: 'Number of shares = Purchase Consideration / Issue Price per share = ₹6,60,000 / (₹10 + ₹1) = ₹6,60,000 / ₹11 = 60,000 shares.',
    hints: [
      'Issue price per share = Face Value (₹10) + Premium (10% of ₹10 = ₹1) = ₹11.',
      'Divide total consideration ₹6,60,000 by issue price ₹11.',
      '₹6,60,000 / 11 = 60,000 shares.',
    ],
    misconceptionIndex: 6,
  },

  // 13. c12_acc_026 (Advanced, analysis)
  {
    id: 'ch_acc_013',
    nodeId: NODE_C12_ACC_026,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A company acquires assets of ₹12,00,000 and assumes liabilities of ₹2,50,000. It issues 80,000 equity shares of ₹10 each at a premium of ₹2 per share as purchase consideration. What amount of GOODWILL must be debited in the journal entry in ₹?',
    correctAnswer: 10000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Net Assets = Total Assets (₹12,00,000) - Liabilities (₹2,50,000) = ₹9,50,000. Purchase Consideration = 80,000 × ₹12 = ₹9,60,000. Excess PC over Net Assets = Goodwill = ₹9,60,000 - ₹9,50,000 = ₹10,000.',
    hints: [
      'Net Assets taken over = ₹12,00,000 - ₹2,50,000 = ₹9,50,000.',
      'Purchase Consideration = 80,000 shares × ₹12 (₹10 par + ₹2 premium) = ₹9,60,000.',
      'Goodwill = Purchase Consideration - Net Assets = ₹9,60,000 - ₹9,50,000 = ₹10,000.',
    ],
    misconceptionIndex: 6,
  },

  // 14. c12_acc_027 (Foundation, recall)
  {
    id: 'ch_acc_014',
    nodeId: NODE_C12_ACC_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Table F of Schedule I to the Companies Act 2013, what are the maximum interest rates per annum chargeable on Calls in Arrears and payable on Calls in Advance?',
    options: [
      '10% p.a. on Calls in Arrears; 12% p.a. on Calls in Advance',
      '12% p.a. on Calls in Arrears; 10% p.a. on Calls in Advance',
      '6% p.a. on Calls in Arrears; 6% p.a. on Calls in Advance',
      '5% p.a. on Calls in Arrears; 6% p.a. on Calls in Advance',
    ],
    correctIndex: 0,
    explanation: 'Table F stipulates a maximum penalty of 10% p.a. charged on defaults (Calls in Arrears) and 12% p.a. paid on prepayments (Calls in Advance).',
    hints: [
      'The company charges a lower penalty rate on defaults than the rate it pays shareholders for using prepaid funds.',
      'Arrears rate is 10%; Advance rate is 12%.',
      'Select option: 10% p.a. on Arrears, 12% p.a. on Advance.',
    ],
    misconceptionIndex: 7,
  },

  // 15. c12_acc_027 (Standard, application)
  {
    id: 'ch_acc_015',
    nodeId: NODE_C12_ACC_027,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A shareholder holding 2,000 shares fails to pay allotment money of ₹4 per share due on 1st May 2024. He clears all arrears on 1st September 2024 (4 months delay). Under Table F (10% p.a.), compute the interest on calls in arrears in ₹ (rounded to nearest integer).',
    correctAnswer: 267,
    tolerance: 2,
    unit: '₹',
    explanation: 'Arrears principal = 2,000 × ₹4 = ₹8,000. Time = 4 months. Interest = ₹8,000 × 10% × (4/12) = ₹266.67 ≈ ₹267.',
    hints: [
      'Default amount = 2,000 shares × ₹4 = ₹8,000.',
      'Duration = 4 months (May 1 to Sept 1). Rate = 10% p.a.',
      'Interest = ₹8,000 × 0.10 × (4/12) = ₹266.67 ≈ ₹267.',
    ],
    misconceptionIndex: 7,
  },

  // 16. c12_acc_028 (Standard, analysis)
  {
    id: 'ch_acc_016',
    nodeId: NODE_C12_ACC_028,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'MegaTech Ltd invited applications for 1,00,000 shares of ₹10 each. Applications were received for 1,50,000 shares. Pro-rata allotment was made at 2:3. Applicant Rajesh applied for 1,500 shares. How many shares were ALLOTTED to Rajesh?',
    correctAnswer: 1000,
    tolerance: 0,
    unit: 'shares',
    explanation: 'Allotment ratio = 1,00,000 / 1,50,000 = 2/3. Shares allotted to Rajesh = 1,500 × (2/3) = 1,000 shares.',
    hints: [
      'Pro-rata allotment ratio = Offered Shares / Applied Shares = 1,00,000 / 1,50,000 = 2/3.',
      'Multiply Rajesh\'s applied shares by 2/3.',
      '1,500 × (2/3) = 1,000 shares.',
    ],
    misconceptionIndex: 8,
  },

  // 17. c12_acc_028 (Advanced, application)
  {
    id: 'ch_acc_017',
    nodeId: NODE_C12_ACC_028,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Arrange the sequence for adjusting excess application money on pro-rata share allotment in the legally required order.',
    sortItems: [
      'Adjust against Share Capital portion of Allotment due',
      'Adjust against Securities Premium portion of Allotment due',
      'Adjust against Calls in Advance (if permitted by Articles)',
      'Refund remaining unabsorbed excess to bank',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Excess application money must first secure nominal share capital on allotment, then securities premium on allotment, then subsequent calls (if permitted), with any remaining balance refunded.',
    hints: [
      'Face value capital must always be secured before recognising premium.',
      'Allotment capital comes 1st, Allotment premium comes 2nd.',
      'Call advances come 3rd, and unabsorbed cash refund is 4th.',
    ],
    misconceptionIndex: 8,
  },

  // 18. c12_acc_029 (Foundation, recall)
  {
    id: 'ch_acc_018',
    nodeId: NODE_C12_ACC_029,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When 500 shares of ₹10 face value (called-up to ₹8) are forfeited for non-payment of first call of ₹3, what amount is debited to Share Capital Account?',
    options: [
      '₹4,000 (500 shares × ₹8 Called-up value)',
      '₹5,000 (500 shares × ₹10 Face value)',
      '₹1,500 (500 shares × ₹3 Unpaid call)',
      '₹2,500 (500 shares × ₹5 Paid-up amount)',
    ],
    correctIndex: 0,
    explanation: 'On forfeiture, the Share Capital Account is ALWAYS debited with the CALLED-UP amount per share (500 × ₹8 = ₹4,000), not the full face value if uncalled.',
    hints: [
      'Check whether the full nominal face value has been called up by the directors.',
      'Here, only ₹8 has been called up.',
      'Debit Share Capital A/c with 500 × ₹8 = ₹4,000.',
    ],
    misconceptionIndex: 9,
  },

  // 19. c12_acc_029 (Advanced, evaluation)
  {
    id: 'ch_acc_019',
    nodeId: NODE_C12_ACC_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A company issues shares of ₹10 at ₹2 premium. Shareholder K defaulted on allotment of ₹5 (including ₹2 premium). Are Securities Premium debited on forfeiture?',
    options: [
      'YES — Because the premium was due on allotment and remained UNCOLLECTED from K',
      'NO — Securities premium is never touched on forfeiture under Section 52',
      'NO — Because premium was only credited on application',
      'YES — But only when the shares are reissued',
    ],
    correctIndex: 0,
    explanation: 'If securities premium has become due but has NOT been received, the credit to Securities Premium Account must be cancelled by DEBITING Securities Premium Account on forfeiture.',
    hints: [
      'Did the company record premium as due when sending the allotment notice?',
      'Since K defaulted on allotment, the premium was never received.',
      'Debit Securities Premium Account to reverse the uncollected premium.',
    ],
    misconceptionIndex: 9,
  },

  // 20. c12_acc_030 (Foundation, recall)
  {
    id: 'ch_acc_020',
    nodeId: NODE_C12_ACC_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the maximum permissible discount that a company can legally offer on the reissue of forfeited shares?',
    options: [
      'The exact amount already forfeited and received on those specific shares',
      '10% of the nominal face value under Section 53',
      'The unpaid calls in arrears balance',
      'Unlimited discount subject to board resolution',
    ],
    correctIndex: 0,
    explanation: 'The maximum discount allowable on reissue cannot exceed the amount previously forfeited and standing to the credit of the Forfeited Shares Account for those shares.',
    hints: [
      'The company cannot suffer a net loss on the share across both issues.',
      'The previous owner\'s confiscated payment acts as the discount buffer.',
      'Maximum discount = Amount already forfeited on the reissued shares.',
    ],
    misconceptionIndex: 10,
  },

  // 21. c12_acc_030 (Standard, application)
  {
    id: 'ch_acc_021',
    nodeId: NODE_C12_ACC_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: '800 shares of ₹10 each were forfeited after receiving ₹6 per share. All 800 shares are reissued as fully paid at ₹7 per share (discount ₹3). What amount in ₹ is transferred to CAPITAL RESERVE?',
    correctAnswer: 2400,
    tolerance: 0,
    unit: '₹',
    explanation: 'Forfeited amount per share = ₹6. Discount allowed on reissue = ₹10 - ₹7 = ₹3 per share. Net gain per share = ₹6 - ₹3 = ₹3. Total Capital Reserve = 800 shares × ₹3 = ₹2,400.',
    hints: [
      'Forfeited amount = ₹6/share. Reissue discount = ₹10 - ₹7 = ₹3/share.',
      'Gain per reissued share = ₹6 - ₹3 = ₹3.',
      'Multiply ₹3 gain × 800 reissued shares = ₹2,400 transferred to Capital Reserve.',
    ],
    misconceptionIndex: 10,
  },

  // 22. c12_acc_030 (Advanced, creativity)
  {
    id: 'ch_acc_022',
    nodeId: NODE_C12_ACC_030,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the journal entry to transfer net forfeiture profit to Capital Reserve after reissuing 500 shares (₹4 forfeited/share, ₹1 discount/share).',
    availableParts: [
      'Dr Forfeited Shares A/c ₹1,500',
      'Cr Capital Reserve A/c ₹1,500',
      'Dr Capital Reserve A/c ₹1,500',
      'Cr Share Capital A/c ₹1,500',
      'Dr Bank A/c ₹1,500',
    ],
    targetState: 'Dr Forfeited Shares A/c ₹1,500 Cr Capital Reserve A/c ₹1,500',
    validationHint: 'Select Dr Forfeited Shares and Cr Capital Reserve with amount (4 - 1) × 500 = ₹1,500.',
    explanation: 'Net gain = (₹4 forfeited - ₹1 discount) × 500 = ₹1,500. Entry: Debit Forfeited Shares A/c ₹1,500, Credit Capital Reserve A/c ₹1,500.',
    hints: [
      'Gain per share = ₹4 - ₹1 = ₹3. Total for 500 shares = ₹1,500.',
      'Close the reissued portion of Forfeited Shares Account by debiting it.',
      'Credit Capital Reserve Account with ₹1,500.',
    ],
    misconceptionIndex: 10,
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
  nodeId: NODE_C12_ACC_021,
  title: 'Corporate & Partnership Accounting: Reconstitution, Dissolution & Share Capital',
  definition:
    'Comprehensive ISC Class 12 Accountancy framework covering retirement gaining ratios & AS-26 goodwill adjustments, P&L Suspense accounting, Section 48 dissolution settlement priority, Realisation accounts, issue of shares at par/premium, non-cash vendor acquisitions, Table F interest, pro-rata allotment, and forfeiture-reissue mechanics.',
  eli5:
    'When partners leave or firms dissolve, accounting ensures debts are cleared first, loans second, and capital third. When companies issue shares, every rupee is split between face value and premium, defaults are penalised, and forfeited funds buffer discounted reissues!',
  misconceptions: [
    {
      misconception: 'Gaining ratio is identical to the new profit-sharing ratio.',
      correction: 'Gaining ratio = New Share - Old Share. It measures incremental gain, whereas new ratio is total future share.',
    },
    {
      misconception: 'Hidden goodwill requires a separate special account.',
      correction: 'Hidden goodwill is adjusted through the standard gaining partners debit / retiring partner credit entry.',
    },
    {
      misconception: 'P&L Suspense Account is a permanent asset on the balance sheet.',
      correction: 'P&L Suspense is a temporary holding account closed at year-end to P&L Appropriation.',
    },
    {
      misconception: 'Partners\' capitals are paid before partners\' loans on dissolution.',
      correction: 'Section 48 mandates partner loans are debts ranking senior to risk capital contributions.',
    },
    {
      misconception: 'Cash and Partner Loans are transferred to the Realisation Account.',
      correction: 'Liquid cash and partner loan accounts are settled directly through Cash/Bank, never Realisation.',
    },
    {
      misconception: 'Securities Premium can be used to pay annual cash dividends.',
      correction: 'Section 52 restricts Securities Premium strictly to 5 specific capital purposes.',
    },
    {
      misconception: 'In non-cash vendor issues, assets are recorded at share face value.',
      correction: 'Assets are debited at agreed purchase value; differences create Goodwill or Capital Reserve.',
    },
    {
      misconception: 'Table F interest is 12% on arrears and 10% on advance.',
      correction: 'Table F prescribes 10% p.a. on Calls in Arrears and 12% p.a. on Calls in Advance.',
    },
    {
      misconception: 'Excess application money is adjusted to Securities Premium before Share Capital.',
      correction: 'Nominal share capital on allotment must be secured before premium is recognised.',
    },
    {
      misconception: 'Share Capital is debited with full face value on partial calls.',
      correction: 'On forfeiture, Share Capital is debited ONLY with the called-up amount per share.',
    },
    {
      misconception: 'Reissue discount can exceed the amount already forfeited.',
      correction: 'Maximum permissible discount is strictly capped at the amount previously forfeited on those shares.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Formula for Gaining Ratio on partner retirement:',
      options: ['New Share - Old Share', 'Old Share - New Share', 'Old Share × New Share', 'New Share / Old Share'],
      correctIndex: 0,
    },
    {
      question: 'Accounting standard prohibiting self-generated goodwill account:',
      options: ['AS-26 (Intangible Assets)', 'AS-10 (Property, Plant, Equipment)', 'AS-3 (Cash Flow)', 'AS-2 (Inventories)'],
      correctIndex: 0,
    },
    {
      question: 'Section governing dissolution asset application order:',
      options: ['Section 48 of Partnership Act 1932', 'Section 32 of Partnership Act', 'Section 52 of Companies Act', 'Section 68 of Companies Act'],
      correctIndex: 0,
    },
    {
      question: 'Account credited when partner takes over firm asset on dissolution:',
      options: ['Realisation Account', 'Partner Capital Account', 'Cash Account', 'Asset Account'],
      correctIndex: 0,
    },
    {
      question: 'Table F interest rate on Calls in Advance:',
      options: ['12% per annum', '10% per annum', '6% per annum', '5% per annum'],
      correctIndex: 0,
    },
    {
      question: 'Where is Calls in Arrears presented in Balance Sheet?',
      options: ['Deduction from Called-up Share Capital', 'Other Current Liabilities', 'Reserves and Surplus', 'Current Assets'],
      correctIndex: 0,
    },
    {
      question: 'Net profit on reissue of forfeited shares is transferred to:',
      options: ['Capital Reserve Account', 'General Reserve Account', 'Securities Premium Account', 'Statement of P&L'],
      correctIndex: 0,
    },
    {
      question: 'Purchase consideration exceeds Net Assets acquired. The balancing figure is:',
      options: ['Goodwill Account (Debit)', 'Capital Reserve (Credit)', 'Securities Premium', 'General Reserve'],
      correctIndex: 0,
    },
  ],
  masteryCriteria:
    'Student solves advanced ISC partnership reconstitution, Section 48 waterfall, and company share accounting problems with 85%+ accuracy.',
};

// ��── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Gaining Ratio & Goodwill Simulator',
    instruction: 'Adjust Old and New profit ratios for Partner A & C after B retires to watch gaining fractions & AS-26 entries compute live.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ACC_021,
  },
  {
    title: 'Section 48 Dissolution Priority Waterfall',
    instruction: 'Change available realization cash and see how Outside Debts, Partner Loans, and Capitals are settled in strict legal sequence.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ACC_023,
  },
  {
    title: 'Realisation T-Account Balancer',
    instruction: 'Post asset realization proceeds and liability payments to view instant balancing of Realisation Profit or Loss.',
    interactionType: 'interactive-ledger',
    nodeId: NODE_C12_ACC_024,
  },
  {
    title: 'Pro-Rata Allotment & Excess Money Pipeline',
    instruction: 'Drag subscription demand slider to watch pro-rata ratios adjust and excess cash funnel into allotment capital, premium, and refunds.',
    interactionType: 'pipeline-visualizer',
    nodeId: NODE_C12_ACC_028,
  },
  {
    title: 'Forfeiture & Reissue Capital Reserve Engine',
    instruction: 'Select forfeiture amounts and reissue price to verify maximum allowable discount and Capital Reserve transfers.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ACC_030,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'If firm realization cash is ₹2,50,000 against Outside Debts of ₹2,00,000, Partner Loan of ₹80,000, and Capitals of ₹1,50,000, predict what Partner Loan receives:',
    options: ['₹50,000 (Full remaining cash)', '₹80,000 (Paid in full by sacrificing capital)', '₹25,000 (Pro-rata with capital)', '₹0'],
    correctIndex: 0,
    verifyInstruction: 'Drag the Cash Available slider in Lab 2 to ₹2,50,000 to observe the Section 48 payout distribution.',
    nodeId: NODE_C12_ACC_023,
  },
  {
    question: 'Predict: If 1,000 shares of ₹10 (₹5 received) are reissued at ₹8 (discount ₹2), what total amount transfers to Capital Reserve?',
    options: ['₹3,000 (₹3 net gain × 1,000 shares)', '₹5,000 (Full forfeited amount)', '₹2,000 (Discount amount)', '₹0'],
    correctIndex: 0,
    verifyInstruction: 'Set Forfeited per share = ₹5 and Reissue Price = ₹8 in Lab 5 to verify the Capital Reserve output.',
    nodeId: NODE_C12_ACC_030,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the Capital Reserve transfer when the reissue price drops closer to the minimum allowable price?',
    observableOptions: [
      'Capital Reserve transfer decreases toward ₹0 as discount absorbs the forfeited buffer',
      'Capital Reserve transfer increases because more discount is given',
      'Capital Reserve remains unchanged regardless of reissue price',
      'Capital Reserve becomes negative',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_ACC_030,
  },
  {
    question: 'In the Section 48 waterfall, what happens to Partners\' Capital if cash is exhausted while paying Partner Loans?',
    observableOptions: [
      'Partners\' Capitals receive ₹0 and unrecovered balances represent capital losses',
      'Capitals are paid from government reserves',
      'Outside creditors must refund money to pay capitals',
      'Partner loans convert automatically to shares',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_ACC_023,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Corporate Insolvency & IPO Filing Audit',
  description:
    'Analyze the public disclosure of a recent Indian IPO (e.g., Tata Technologies or LIC) and a corporate liquidation under the Insolvency and Bankruptcy Code (IBC 2016). Track how pro-rata allotment categories were finalized and how creditor priorities mirror Section 48.',
  steps: [
    'Review the basis of allotment document for an oversubscribed Indian IPO.',
    'Trace how excess application money was credited against allotment dues.',
    'Compare Section 48 partnership priority with Section 53 waterfall under IBC 2016.',
    'Draft a sample board resolution for share forfeiture and reissue.',
  ],
};

// ─── MAIN COMPONENT ───
function C12_AccountancyRetirementPartnerGainingSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['accountancy'] || {
    name: 'Accountancy',
    emoji: '📑',
    color: 'emerald',
  };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Discovery & Predict-Check States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Reflection Form State
  const [reflectionSurprise, setReflectionSurprise] = useState('');
  const [reflectionExplain, setReflectionExplain] = useState('');
  const [reflectionRealLife, setReflectionRealLife] = useState('');

  // Challenge Response States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-Drop / Interactive Inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback Component States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // ─── RICH INTERACTIVE SIMULATION LAB CONTROLS ───
  // Lab 1: Gaining Ratio & Goodwill Simulator
  const [oldShareA, setOldShareA] = useState(3);
  const [oldShareB, setOldShareB] = useState(2);
  const [oldShareC, setOldShareC] = useState(1);
  const [newShareA, setNewShareA] = useState(3);
  const [newShareC, setNewShareC] = useState(1);
  const [goodwillValue, setGoodwillValue] = useState(60000);

  // Lab 2: Section 48 Waterfall Simulator
  const [cashAvailable, setCashAvailable] = useState(480000);
  const [outsideDebts, setOutsideDebts] = useState(300000);
  const [partnerLoanA, setPartnerLoanA] = useState(80000);
  const [partnerLoanB, setPartnerLoanB] = useState(40000);
  const [capitalA, setCapitalA] = useState(180000);
  const [capitalB, setCapitalB] = useState(120000);

  // Lab 3: Realisation Account Ledger Simulator
  const [bookAssets, setBookAssets] = useState(500000);
  const [bookLiabilities, setBookLiabilities] = useState(200000);
  const [realisedAssetCash, setRealisedAssetCash] = useState(450000);
  const [settledLiabCash] = useState(190000);
  const [realisationExpenses, setRealisationExpenses] = useState(10000);

  // Lab 4: Pro-rata Allotment Simulator
  const [sharesOffered] = useState(100000);
  const [sharesApplied, setSharesApplied] = useState(200000);
  const [appMoneyPerShare, setAppMoneyPerShare] = useState(4);
  const [allotMoneyPerShare, setAllotMoneyPerShare] = useState(4);

  // Lab 5: Forfeiture & Reissue Simulator
  const [forfeitedSharesCount] = useState(1000);
  const [forfeitedPerShare, setForfeitedPerShare] = useState(4);
  const [reissuePrice, setReissuePrice] = useState(8);
  const [reissueCount, setReissueCount] = useState(600);

  // Active view tab for multi-representation
  const [activeTab, setActiveTab] = useState<'journal' | 'taccounts' | 'waterfall' | 'analytics'>('journal');

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES FOR LAB 1 ───
  const totalOldParts = oldShareA + oldShareB + oldShareC || 1;
  const totalNewParts = newShareA + newShareC || 1;
  const oldFracA = oldShareA / totalOldParts;
  const oldFracB = oldShareB / totalOldParts;
  const oldFracC = oldShareC / totalOldParts;
  const newFracA = newShareA / totalNewParts;
  const newFracC = newShareC / totalNewParts;
  const gainA = Math.max(0, newFracA - oldFracA);
  const gainC = Math.max(0, newFracC - oldFracC);
  const totalGain = gainA + gainC || 1;
  const gainPropA = gainA / totalGain;
  const gainPropC = gainC / totalGain;
  const retiringGoodwillShare = goodwillValue * oldFracB;
  const debitA_Goodwill = retiringGoodwillShare * gainPropA;
  const debitC_Goodwill = retiringGoodwillShare * gainPropC;

  // ─── DERIVED VALUES FOR LAB 2 ───
  const waterfallOutcomes = useMemo(() => {
    let remaining = cashAvailable;
    const paidOutside = Math.min(remaining, outsideDebts);
    remaining -= paidOutside;

    const totalLoans = partnerLoanA + partnerLoanB;
    let paidLoanA = 0;
    let paidLoanB = 0;
    if (totalLoans > 0 && remaining > 0) {
      if (remaining >= totalLoans) {
        paidLoanA = partnerLoanA;
        paidLoanB = partnerLoanB;
        remaining -= totalLoans;
      } else {
        paidLoanA = remaining * (partnerLoanA / totalLoans);
        paidLoanB = remaining * (partnerLoanB / totalLoans);
        remaining = 0;
      }
    }

    const totalCap = capitalA + capitalB;
    let paidCapA = 0;
    let paidCapB = 0;
    let surplus = 0;
    if (totalCap > 0 && remaining > 0) {
      if (remaining >= totalCap) {
        paidCapA = capitalA;
        paidCapB = capitalB;
        remaining -= totalCap;
        surplus = remaining;
      } else {
        paidCapA = remaining * (capitalA / totalCap);
        paidCapB = remaining * (capitalB / totalCap);
        remaining = 0;
      }
    }

    return {
      paidOutside,
      unpaidOutside: outsideDebts - paidOutside,
      paidLoanA,
      paidLoanB,
      unpaidLoans: totalLoans - (paidLoanA + paidLoanB),
      paidCapA,
      paidCapB,
      unpaidCap: totalCap - (paidCapA + paidCapB),
      surplus,
    };
  }, [cashAvailable, outsideDebts, partnerLoanA, partnerLoanB, capitalA, capitalB]);

  // ─── DERIVED VALUES FOR LAB 3 ───
  const realisationTotalDr = bookAssets + settledLiabCash + realisationExpenses;
  const realisationTotalCr = bookLiabilities + realisedAssetCash;
  const realisationProfitLoss = realisationTotalCr - realisationTotalDr;

  // ─── DERIVED VALUES FOR LAB 4 ───
  const proRataRatio = sharesOffered / (sharesApplied || 1);
  const totalAppMoneyReceived = sharesApplied * appMoneyPerShare;
  const totalAppMoneyRequired = sharesOffered * appMoneyPerShare;
  const excessAppMoney = Math.max(0, totalAppMoneyReceived - totalAppMoneyRequired);
  const totalAllotmentDue = sharesOffered * allotMoneyPerShare;
  const excessAdjustedAllotment = Math.min(excessAppMoney, totalAllotmentDue);
  const excessRefunded = Math.max(0, excessAppMoney - excessAdjustedAllotment);
  const netAllotmentCashDue = totalAllotmentDue - excessAdjustedAllotment;

  // ─── DERIVED VALUES FOR LAB 5 ───
  const maxDiscountPerShare = forfeitedPerShare;
  const actualDiscountPerShare = Math.max(0, 10 - reissuePrice);
  const isValidReissue = actualDiscountPerShare <= maxDiscountPerShare;
  const gainPerReissuedShare = Math.max(0, forfeitedPerShare - actualDiscountPerShare);
  const totalCapitalReserve = reissueCount * gainPerReissuedShare;
  const retainedInForfeitedShares = (forfeitedSharesCount - reissueCount) * forfeitedPerShare;

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD EFFECT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE BKT DIFFICULTY EFFECT ───
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

  // ─── 2D CANVAS ANIMATION ───
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

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const stages = ['Reconstitution', 'Sec 48 Waterfall', 'Realisation', 'Pro-Rata', 'Forfeiture'];
      const spacing = canvas.width / (stages.length + 1);

      for (let i = 0; i < stages.length; i++) {
        const cx = spacing * (i + 1);
        const cy = canvas.height / 2;

        if (i < stages.length - 1) {
          const nextX = spacing * (i + 2);
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(nextX, cy);
          ctx.stroke();

          const pulseOffset = (frame * 1.5 + i * 40) % (nextX - cx);
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(cx + pulseOffset, cy, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        const isCurrent = currentSlide === i;
        ctx.fillStyle = isCurrent ? '#10b981' : '#1e293b';
        ctx.strokeStyle = isCurrent ? '#34d399' : '#475569';
        ctx.lineWidth = isCurrent ? 3 : 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, isCurrent ? 14 : 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isCurrent ? '#6ee7b7' : '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(stages[i], cx, cy + 24);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentSlide]);

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
    }
  }, [hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((index: number) => {
    const isCorrect = index === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive accounting labs! Explore each scenario.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Adjust any accounting variable with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the adaptive board examination challenges.');
  }, []);

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the interactive simulator to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp analytical observation!' : 'Review the visualization values closely.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        if (prev.length === 0 && activeChallenge.sortItems) {
          prev = activeChallenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [activeChallenge]
  );

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation completed with honors! Review your comprehensive performance profile.');
  }, [errors, onComplete]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = answer === activeChallenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Accurate entry posted! Well done.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
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
          speechManager.speak('Let us inspect the statutory journal solution step by step.');
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
    [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge, handleAnswer]);

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

  const handleTabSwitch = useCallback((tab: 'journal' | 'taccounts' | 'waterfall' | 'analytics') => {
    setActiveTab(tab);
    audioManager.play('tap');
  }, []);

  const handleResetLab = useCallback(() => {
    setOldShareA(3);
    setOldShareB(2);
    setOldShareC(1);
    setNewShareA(3);
    setNewShareC(1);
    setGoodwillValue(60000);
    setCashAvailable(480000);
    setBookAssets(500000);
    setSharesApplied(200000);
    setForfeitedPerShare(4);
    setReissuePrice(8);
    audioManager.play('chime');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── WATERFALL RECHARTS DATA ───
  const waterfallChartData = [
    { name: 'Outside Debts', Paid: waterfallOutcomes.paidOutside, Unpaid: waterfallOutcomes.unpaidOutside },
    { name: 'Partner Loans', Paid: waterfallOutcomes.paidLoanA + waterfallOutcomes.paidLoanB, Unpaid: waterfallOutcomes.unpaidLoans },
    { name: 'Capitals', Paid: waterfallOutcomes.paidCapA + waterfallOutcomes.paidCapB, Unpaid: waterfallOutcomes.unpaidCap },
    { name: 'Surplus', Paid: waterfallOutcomes.surplus, Unpaid: 0 },
  ];

  // ─── MOTIVATIONAL FEEDBACK MESSAGE GENERATOR ───
  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) return { title: 'PERFECT SCORE!', desc: 'You mastered every aspect of reconstitution, dissolution waterfalls, and share capital with 100% precision! Outstanding performance!' };
    if (errCount <= 3) return { title: 'Great work!', desc: 'Terrific effort! You demonstrated strong conceptual clarity across AS-26, Section 48 priorities, and forfeiture math.' };
    if (errCount <= 7) return { title: 'Good effort!', desc: 'Solid foundation! A few double-entry traps caught you, but with a quick review of the misconception notes, you will ace this.' };
    return { title: 'Do not give up — You WILL get this!', desc: 'Complex accountancy rules take deliberate practice. Walk through the interactive labs again and reinforce your mastery step by step!' };
  };

  const motivation = getMotivationalFeedback(errors);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">ISC Class 12 • Accountancy</span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                    : difficulty === 'advanced'
                    ? 'bg-rose-900/60 text-rose-300 border border-rose-700'
                    : 'bg-indigo-900/60 text-indigo-300 border border-indigo-700'
                }`}
              >
                {difficulty.toUpperCase()} TIER
              </motion.span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'explore') setPhase('explore');
                if (p === 'sandbox') setPhase('sandbox');
                if (p === 'challenge') setPhase('challenge');
              }}
              className={`px-3 py-1 rounded-xl font-bold capitalize transition-all ${
                phase === p ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' : 'text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="py-6 space-y-6"
          >
            <div className="p-5 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-indigo-950/60 rounded-3xl border border-emerald-800/60 shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case Audit Briefing</span>
              <h2 className="text-2xl font-black text-white mt-1">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-xs mt-2 border-t border-slate-800/80 pt-2">{SCENARIO.context}</p>
            </div>

            <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold uppercase text-emerald-400">Pre-Audit Intuition Challenge (Ungraded)</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 rounded-2xl text-left text-sm font-semibold border transition-all ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/40 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-755 border-slate-700 text-slate-200 hover:border-emerald-500/50'
                    }`}
                  >
                    <span className="text-xs font-mono font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Spot on! The old ratio of remaining partners governs gaining shares.' : DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold shadow-lg shadow-emerald-950 flex items-center gap-2 text-sm"
                  >
                    Enter Interactive Simulation Labs →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-4 space-y-4"
          >
            {/* 2D Canvas Flow Banner */}
            <canvas ref={canvasRef} width={800} height={50} className="w-full rounded-2xl border border-slate-800/80 bg-slate-900" />

            {/* Lab Card Container */}
            <div className="p-5 sm:p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleResetLab}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold border border-slate-700"
                  >
                    Reset Variables
                  </motion.button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-emerald-300 bg-emerald-950/40 p-3 rounded-2xl border border-emerald-800/50">
                👉 <span className="font-bold">Instructions:</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── SLIDE 0: GAINING RATIO & AS-26 GOODWILL LAB + SVG 1 ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM 1: AS-26 GOODWILL & GAINING RATIO COMPENSATION FLOW */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
                      <span>Accounting Standard 26: Goodwill Adjustment Flow Diagram</span>
                    </div>
                    <svg viewBox="0 0 760 160" className="w-full h-auto rounded-xl bg-slate-900/90 p-2" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="gA" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#047857" />
                        </linearGradient>
                        <linearGradient id="gB" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#b45309" />
                        </linearGradient>
                        <linearGradient id="gC" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#0e7490" />
                        </linearGradient>
                      </defs>

                      {/* Partner A Node (Dr) */}
                      <rect x="30" y="25" width="180" height="50" rx="10" fill="url(#gA)" stroke="#34d399" strokeWidth="2" />
                      <text x="120" y="47" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Gaining Partner A</text>
                      <text x="120" y="63" fill="#d1fae5" fontSize="10" textAnchor="middle">Dr. Capital (Gaining Ratio)</text>

                      {/* Partner C Node (Dr) */}
                      <rect x="30" y="90" width="180" height="50" rx="10" fill="url(#gC)" stroke="#22d3ee" strokeWidth="2" />
                      <text x="120" y="112" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Gaining Partner C</text>
                      <text x="120" y="128" fill="#cffafe" fontSize="10" textAnchor="middle">Dr. Capital (Gaining Ratio)</text>

                      {/* Transfer Arrows */}
                      <path d="M 220 50 L 390 80" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
                      <path d="M 220 115 L 390 85" stroke="#22d3ee" strokeWidth="3" strokeDasharray="6,4" />

                      {/* Retiring Partner B (Cr) */}
                      <rect x="400" y="55" width="220" height="55" rx="12" fill="url(#gB)" stroke="#fbbf24" strokeWidth="2" />
                      <text x="510" y="79" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Retiring Partner B</text>
                      <text x="510" y="97" fill="#fef3c7" fontSize="10" textAnchor="middle">Cr. Capital (Firm GW × Share)</text>

                      {/* AS-26 Compliance Stamp */}
                      <rect x="640" y="45" width="105" height="75" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                      <text x="692" y="70" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">AS-26 RULE</text>
                      <text x="692" y="86" fill="#e0e7ff" fontSize="9" textAnchor="middle">No Goodwill A/c</text>
                      <text x="692" y="100" fill="#c7d2fe" fontSize="8" textAnchor="middle">Direct Capital Adj</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* Controls */}
                    <div className="lg:col-span-5 space-y-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Profit Sharing Controls</h3>
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Old Ratio (A : B : C)</span>
                          <span className="font-mono font-bold text-emerald-400">{oldShareA} : {oldShareB} : {oldShareC}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="range"
                            min={1}
                            max={6}
                            value={oldShareA}
                            onChange={(e) => setOldShareA(Number(e.target.value))}
                            className="accent-emerald-500 w-full"
                            aria-label="Old Share A"
                          />
                          <input
                            type="range"
                            min={1}
                            max={6}
                            value={oldShareB}
                            onChange={(e) => setOldShareB(Number(e.target.value))}
                            className="accent-amber-500 w-full"
                            aria-label="Old Share B"
                          />
                          <input
                            type="range"
                            min={1}
                            max={6}
                            value={oldShareC}
                            onChange={(e) => setOldShareC(Number(e.target.value))}
                            className="accent-cyan-500 w-full"
                            aria-label="Old Share C"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>New Ratio (A : C) after B retires</span>
                          <span className="font-mono font-bold text-emerald-400">{newShareA} : {newShareC}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="range"
                            min={1}
                            max={6}
                            value={newShareA}
                            onChange={(e) => setNewShareA(Number(e.target.value))}
                            className="accent-emerald-500 w-full"
                            aria-label="New Share A"
                          />
                          <input
                            type="range"
                            min={1}
                            max={6}
                            value={newShareC}
                            onChange={(e) => setNewShareC(Number(e.target.value))}
                            className="accent-cyan-500 w-full"
                            aria-label="New Share C"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Firm Goodwill Valuation</span>
                          <span className="font-mono font-bold text-emerald-400">₹{goodwillValue.toLocaleString('en-IN')}</span>
                        </div>
                        <input
                          type="range"
                          min={10000}
                          max={300000}
                          step={10000}
                          value={goodwillValue}
                          onChange={(e) => setGoodwillValue(Number(e.target.value))}
                          className="accent-emerald-500 w-full"
                          aria-label="Firm Goodwill Valuation"
                        />
                      </div>
                    </div>

                    {/* Multi-Representation Visualizer */}
                    <div className="lg:col-span-7 space-y-4">
                      {/* Ratio Gauges */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
                          <span className="text-[10px] uppercase text-slate-400">B&apos;s Retired Share</span>
                          <p className="text-lg font-mono font-bold text-amber-400 mt-1">
                            {oldShareB}/{totalOldParts} ({(oldFracB * 100).toFixed(1)}%)
                          </p>
                          <p className="text-[10px] text-slate-500">Goodwill = ₹{Math.round(retiringGoodwillShare).toLocaleString('en-IN')}</p>
                        </div>
                        <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
                          <span className="text-[10px] uppercase text-slate-400">A&apos;s Gain</span>
                          <p className="text-lg font-mono font-bold text-emerald-400 mt-1">
                            {(gainA).toFixed(3)} ({(gainPropA * 100).toFixed(0)}%)
                          </p>
                          <p className="text-[10px] text-emerald-500">Debit: ₹{Math.round(debitA_Goodwill).toLocaleString('en-IN')}</p>
                        </div>
                        <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-center col-span-2 sm:col-span-1">
                          <span className="text-[10px] uppercase text-slate-400">C&apos;s Gain</span>
                          <p className="text-lg font-mono font-bold text-cyan-400 mt-1">
                            {(gainC).toFixed(3)} ({(gainPropC * 100).toFixed(0)}%)
                          </p>
                          <p className="text-[10px] text-cyan-500">Debit: ₹{Math.round(debitC_Goodwill).toLocaleString('en-IN')}</p>
                        </div>
                      </div>

                      {/* Live Statutory Journal Entry Box */}
                      <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-900/60 font-mono text-xs space-y-2">
                        <div className="flex justify-between border-b border-slate-800 pb-1 text-slate-400 text-[11px]">
                          <span>STATUTORY JOURNAL ENTRY (AS-26 COMPLIANT)</span>
                          <span>DR (₹) | CR (₹)</span>
                        </div>
                        <div className="flex justify-between text-emerald-300">
                          <span>A&apos;s Capital A/c .......................... Dr.</span>
                          <span>{Math.round(debitA_Goodwill).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-cyan-300">
                          <span>C&apos;s Capital A/c .......................... Dr.</span>
                          <span>{Math.round(debitC_Goodwill).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-amber-300 pl-4">
                          <span>To B&apos;s (Retiring Partner) Capital A/c</span>
                          <span>{Math.round(retiringGoodwillShare).toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 pt-1 font-sans">
                          (Being B&apos;s share of goodwill adjusted through gaining partners in ratio {(gainPropA * 100).toFixed(0)}:{(gainPropC * 100).toFixed(0)})
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: SECTION 48 PRIORITY WATERFALL LAB + SVG 2 ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM 2: SECTION 48 LEGAL PRIORITY WATERFALL */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
                      <span>Section 48, Indian Partnership Act 1932: Dissolution Settlement Waterfall</span>
                    </div>
                    <svg viewBox="0 0 760 140" className="w-full h-auto rounded-xl bg-slate-900/90 p-2" xmlns="http://www.w3.org/2000/svg">
                      {/* Priority 1 */}
                      <rect x="20" y="25" width="160" height="75" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                      <rect x="20" y="25" width="160" height="24" rx="8" fill="#991b1b" />
                      <text x="100" y="41" fill="#fee2e2" fontSize="11" fontWeight="bold" textAnchor="middle">PRIORITY 1</text>
                      <text x="100" y="68" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Outside Debts</text>
                      <text x="100" y="86" fill="#fca5a5" fontSize="9" textAnchor="middle">Creditors & Bills Payable</text>

                      {/* Arrow 1 */}
                      <path d="M 185 62 L 205 62" stroke="#64748b" strokeWidth="2.5" />

                      {/* Priority 2 */}
                      <rect x="210" y="25" width="160" height="75" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                      <rect x="210" y="25" width="160" height="24" rx="8" fill="#92400e" />
                      <text x="290" y="41" fill="#fef3c7" fontSize="11" fontWeight="bold" textAnchor="middle">PRIORITY 2</text>
                      <text x="290" y="68" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Partner Loans</text>
                      <text x="290" y="86" fill="#fcd34d" fontSize="9" textAnchor="middle">Rateably if funds fall short</text>

                      {/* Arrow 2 */}
                      <path d="M 375 62 L 395 62" stroke="#64748b" strokeWidth="2.5" />

                      {/* Priority 3 */}
                      <rect x="400" y="25" width="160" height="75" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                      <rect x="400" y="25" width="160" height="24" rx="8" fill="#1e40af" />
                      <text x="480" y="41" fill="#dbeafe" fontSize="11" fontWeight="bold" textAnchor="middle">PRIORITY 3</text>
                      <text x="480" y="68" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Partner Capitals</text>
                      <text x="480" y="86" fill="#93c5fd" fontSize="9" textAnchor="middle">Pro-rata repayment</text>

                      {/* Arrow 3 */}
                      <path d="M 565 62 L 585 62" stroke="#64748b" strokeWidth="2.5" />

                      {/* Priority 4 */}
                      <rect x="590" y="25" width="150" height="75" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                      <rect x="590" y="25" width="150" height="24" rx="8" fill="#065f46" />
                      <text x="665" y="41" fill="#d1fae5" fontSize="11" fontWeight="bold" textAnchor="middle">PRIORITY 4</text>
                      <text x="665" y="68" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Residual Surplus</text>
                      <text x="665" y="86" fill="#6ee7b7" fontSize="9" textAnchor="middle">Shared in Profit Ratio</text>
                    </svg>
                  </div>

                  {/* Predict Then Check */}
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/50 rounded-2xl border border-indigo-800 space-y-3">
                      <span className="text-xs font-bold uppercase text-indigo-400">Prediction Stage</span>
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-left text-xs font-medium rounded-xl border border-slate-700 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* Controls */}
                    <div className="lg:col-span-5 space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs">
                      <h3 className="font-bold uppercase tracking-wider text-slate-400">Dissolution Fund Controls</h3>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">Cash Realised:</span>
                          <span className="font-mono font-bold text-emerald-400">₹{cashAvailable.toLocaleString('en-IN')}</span>
                        </div>
                        <input
                          type="range"
                          min={50000}
                          max={800000}
                          step={10000}
                          value={cashAvailable}
                          onChange={(e) => setCashAvailable(Number(e.target.value))}
                          className="accent-emerald-500 w-full"
                          aria-label="Cash Realised Slider"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">Outside Debts:</span>
                          <span className="font-mono font-bold text-rose-400">₹{outsideDebts.toLocaleString('en-IN')}</span>
                        </div>
                        <input
                          type="range"
                          min={100000}
                          max={500000}
                          step={10000}
                          value={outsideDebts}
                          onChange={(e) => setOutsideDebts(Number(e.target.value))}
                          className="accent-rose-500 w-full"
                          aria-label="Outside Debts Slider"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-300">Partner Loans (A + B):</span>
                          <span className="font-mono font-bold text-amber-400">₹{(partnerLoanA + partnerLoanB).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="range"
                            min={20000}
                            max={150000}
                            step={5000}
                            value={partnerLoanA}
                            onChange={(e) => setPartnerLoanA(Number(e.target.value))}
                            className="accent-amber-500 w-full"
                            aria-label="Partner Loan A Slider"
                          />
                          <input
                            type="range"
                            min={10000}
                            max={100000}
                            step={5000}
                            value={partnerLoanB}
                            onChange={(e) => setPartnerLoanB(Number(e.target.value))}
                            className="accent-amber-500 w-full"
                            aria-label="Partner Loan B Slider"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Visual Waterfall Chart */}
                    <div className="lg:col-span-7 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-300">Section 48 Settlement Waterfall</span>
                        <span className="font-mono text-emerald-400">Residual Cash: ₹{Math.max(0, cashAvailable - waterfallOutcomes.paidOutside - (waterfallOutcomes.paidLoanA + waterfallOutcomes.paidLoanB) - (waterfallOutcomes.paidCapA + waterfallOutcomes.paidCapB)).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={waterfallChartData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                            <XAxis type="number" stroke="#64748b" tickFormatter={(v) => `₹${v / 1000}k`} />
                            <YAxis type="category" dataKey="name" stroke="#94a3b8" />
                            <Tooltip
                              formatter={(value: number) => [`₹${Math.round(value).toLocaleString('en-IN')}`, 'Amount']}
                              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                            />
                            <Bar dataKey="Paid" stackId="a" fill="#10b981" radius={[0, 4, 4, 0]} />
                            <Bar dataKey="Unpaid" stackId="a" fill="#ef4444" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-around text-[10px] text-slate-400 border-t border-slate-800 pt-2">
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" /> Settled in Cash</span>
                        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-rose-500 rounded-sm" /> Unpaid Shortfall (Loss)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: REALISATION ACCOUNT LEDGER BALANCER ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-4 space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs">
                    <h3 className="font-bold uppercase tracking-wider text-slate-400">Transaction Posts</h3>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Book Assets:</span>
                        <span className="font-mono text-emerald-400">₹{bookAssets.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        type="range"
                        min={200000}
                        max={800000}
                        step={10000}
                        value={bookAssets}
                        onChange={(e) => setBookAssets(Number(e.target.value))}
                        className="accent-emerald-500 w-full"
                        aria-label="Book Assets Slider"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Asset Realization Cash:</span>
                        <span className="font-mono text-emerald-400">₹{realisedAssetCash.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        type="range"
                        min={150000}
                        max={900000}
                        step={10000}
                        value={realisedAssetCash}
                        onChange={(e) => setRealisedAssetCash(Number(e.target.value))}
                        className="accent-emerald-500 w-full"
                        aria-label="Asset Realization Cash Slider"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Dissolution Expenses:</span>
                        <span className="font-mono text-rose-400">₹{realisationExpenses.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={50000}
                        step={2000}
                        value={realisationExpenses}
                        onChange={(e) => setRealisationExpenses(Number(e.target.value))}
                        className="accent-rose-500 w-full"
                        aria-label="Dissolution Expenses Slider"
                      />
                    </div>
                  </div>

                  {/* T-Account View */}
                  <div className="lg:col-span-8 bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-3">
                    <div className="text-center font-bold text-slate-300 pb-1 border-b border-slate-800">
                      Dr. ................................. REALISATION ACCOUNT ................................. Cr.
                    </div>
                    <div className="grid grid-cols-2 gap-4 divide-x divide-slate-800">
                      {/* Debit Side */}
                      <div className="space-y-1 text-slate-300 pr-2">
                        <div className="flex justify-between">
                          <span>To Sundry Assets (Book Value)</span>
                          <span className="text-emerald-400">{bookAssets.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>To Bank (Liab settled)</span>
                          <span className="text-rose-400">{settledLiabCash.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>To Bank (Expenses)</span>
                          <span className="text-rose-400">{realisationExpenses.toLocaleString('en-IN')}</span>
                        </div>
                        {realisationProfitLoss > 0 && (
                          <div className="flex justify-between text-emerald-400 font-bold pt-2 border-t border-slate-800">
                            <span>To Realisation Profit (to Caps)</span>
                            <span>{realisationProfitLoss.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold border-t border-slate-700 pt-1 text-white">
                          <span>Total Dr:</span>
                          <span>{(realisationProfitLoss > 0 ? realisationTotalCr : realisationTotalDr).toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Credit Side */}
                      <div className="space-y-1 text-slate-300 pl-4">
                        <div className="flex justify-between">
                          <span>By Sundry Liabs (Book Value)</span>
                          <span className="text-cyan-400">{bookLiabilities.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>By Bank (Assets Realised)</span>
                          <span className="text-emerald-400">{realisedAssetCash.toLocaleString('en-IN')}</span>
                        </div>
                        {realisationProfitLoss < 0 && (
                          <div className="flex justify-between text-rose-400 font-bold pt-2 border-t border-slate-800">
                            <span>By Realisation Loss (to Caps)</span>
                            <span>{Math.abs(realisationProfitLoss).toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold border-t border-slate-700 pt-1 text-white">
                          <span>Total Cr:</span>
                          <span>{(realisationProfitLoss < 0 ? realisationTotalDr : realisationTotalCr).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl text-center font-sans font-bold text-xs" style={{ backgroundColor: realisationProfitLoss >= 0 ? '#064e3b' : '#7f1d1d' }}>
                      {realisationProfitLoss >= 0
                        ? `✓ NET REALISATION PROFIT: ₹${realisationProfitLoss.toLocaleString('en-IN')} (Transferred to Partners in PSR)`
                        : `✗ NET REALISATION LOSS: ₹${Math.abs(realisationProfitLoss).toLocaleString('en-IN')} (Debited to Partners in PSR)`}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: PRO-RATA ALLOTMENT PIPELINE ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-5 space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs">
                    <h3 className="font-bold uppercase tracking-wider text-slate-400">IPO Subscription Controls</h3>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Shares Applied by Public:</span>
                        <span className="font-mono text-emerald-400">{sharesApplied.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        type="range"
                        min={100000}
                        max={500000}
                        step={25000}
                        value={sharesApplied}
                        onChange={(e) => setSharesApplied(Number(e.target.value))}
                        className="accent-emerald-500 w-full"
                        aria-label="Shares Applied Slider"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Application Money / Share:</span>
                        <span className="font-mono text-cyan-400">₹{appMoneyPerShare}</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={6}
                        value={appMoneyPerShare}
                        onChange={(e) => setAppMoneyPerShare(Number(e.target.value))}
                        className="accent-cyan-500 w-full"
                        aria-label="Application Money Per Share Slider"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Allotment Money / Share:</span>
                        <span className="font-mono text-indigo-400">₹{allotMoneyPerShare}</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={6}
                        value={allotMoneyPerShare}
                        onChange={(e) => setAllotMoneyPerShare(Number(e.target.value))}
                        className="accent-indigo-500 w-full"
                        aria-label="Allotment Money Per Share Slider"
                      />
                    </div>
                  </div>

                  {/* Flow Diagram */}
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Pro-Rata Allotment Factor</span>
                      <span className="font-mono font-bold text-emerald-400">{(proRataRatio * 100).toFixed(1)}% ({sharesOffered.toLocaleString('en-IN')} : {sharesApplied.toLocaleString('en-IN')})</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400">Total App Cash Received</span>
                        <p className="font-mono font-bold text-emerald-400 mt-1">₹{totalAppMoneyReceived.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400">Allotment Due (Gross)</span>
                        <p className="font-mono font-bold text-indigo-400 mt-1">₹{totalAllotmentDue.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400">Excess App Money</span>
                        <p className="font-mono font-bold text-amber-400 mt-1">₹{excessAppMoney.toLocaleString('en-IN')}</p>
                      </div>
                    </div>

                    {/* Pipeline Breakdown */}
                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 font-mono space-y-1.5">
                      <div className="flex justify-between text-emerald-300">
                        <span>1. Transferred to Share Capital (Application):</span>
                        <span>₹{totalAppMoneyRequired.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-indigo-300">
                        <span>2. Adjusted against Allotment Due (Share Capital first):</span>
                        <span>₹{excessAdjustedAllotment.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-rose-300">
                        <span>3. Refunded to Rejected/Excess Applicants (Bank):</span>
                        <span>₹{excessRefunded.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-white font-bold border-t border-slate-800 pt-1">
                        <span>Net Cash to be collected on Allotment:</span>
                        <span>₹{netAllotmentCashDue.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: FORFEITURE & REISSUE ENGINE + SVG 3 ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM 3: SHARE FORFEITURE & CAPITAL RESERVE PIPELINE */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-2">
                      <span>Share Forfeiture & Reissue Capital Reserve Accounting Lifecycle</span>
                    </div>
                    <svg viewBox="0 0 760 145" className="w-full h-auto rounded-xl bg-slate-900/90 p-2" xmlns="http://www.w3.org/2000/svg">
                      {/* Step 1: Default & Forfeiture */}
                      <rect x="20" y="25" width="210" height="85" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                      <text x="125" y="45" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">1. FORFEITURE</text>
                      <text x="125" y="65" fill="#ffffff" fontSize="10" textAnchor="middle">Dr Share Capital (Called-up)</text>
                      <text x="125" y="82" fill="#38bdf8" fontSize="9" textAnchor="middle">Cr Forfeited Shares (Amount Paid)</text>
                      <text x="125" y="98" fill="#f87171" fontSize="9" textAnchor="middle">Cr Calls in Arrears (Default)</text>

                      {/* Arrow */}
                      <path d="M 235 68 L 265 68" stroke="#64748b" strokeWidth="3" />

                      {/* Step 2: Reissue */}
                      <rect x="270" y="25" width="210" height="85" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <text x="375" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">2. REISSUE AT DISCOUNT</text>
                      <text x="375" y="65" fill="#ffffff" fontSize="10" textAnchor="middle">Dr Bank (Reissue Price)</text>
                      <text x="375" y="82" fill="#fbbf24" fontSize="9" textAnchor="middle">Dr Forfeited Shares (Discount)</text>
                      <text x="375" y="98" fill="#4ade80" fontSize="9" textAnchor="middle">Cr Share Capital (Paid-up)</text>

                      {/* Arrow */}
                      <path d="M 485 68 L 515 68" stroke="#64748b" strokeWidth="3" />

                      {/* Step 3: Capital Reserve Transfer */}
                      <rect x="520" y="25" width="220" height="85" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                      <text x="630" y="45" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">3. CAPITAL RESERVE</text>
                      <text x="630" y="65" fill="#ffffff" fontSize="10" textAnchor="middle">Net Gain = Forfeited - Discount</text>
                      <text x="630" y="82" fill="#a7f3d0" fontSize="9" textAnchor="middle">Dr Forfeited Shares (Net Gain)</text>
                      <text x="630" y="98" fill="#a7f3d0" fontSize="9" textAnchor="middle">Cr Capital Reserve A/c</text>
                    </svg>
                  </div>

                  {/* Observation Question Hook */}
                  {reissuePrice < 10 && !observationAnswered && (
                    <div className="p-4 bg-emerald-950/50 rounded-2xl border border-emerald-800 space-y-2">
                      <span className="text-xs font-bold uppercase text-emerald-400">Live Observation Challenge</span>
                      <p className="text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2 bg-slate-900 text-left text-xs font-medium rounded-xl border border-slate-700 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* Controls */}
                    <div className="lg:col-span-5 space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs">
                      <h3 className="font-bold uppercase tracking-wider text-slate-400">Forfeiture & Reissue Variables</h3>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Amount Forfeited / Share:</span>
                          <span className="font-mono text-emerald-400">₹{forfeitedPerShare} (Max Discount)</span>
                        </div>
                        <input
                          type="range"
                          min={2}
                          max={8}
                          value={forfeitedPerShare}
                          onChange={(e) => setForfeitedPerShare(Number(e.target.value))}
                          className="accent-emerald-500 w-full"
                          aria-label="Forfeited Per Share Slider"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Reissue Price / Share (FV ₹10):</span>
                          <span className={`font-mono font-bold ${isValidReissue ? 'text-cyan-400' : 'text-rose-400'}`}>
                            ₹{reissuePrice} {reissuePrice < 10 ? `(Discount: ₹${10 - reissuePrice})` : '(At/Above Par)'}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={13}
                          value={reissuePrice}
                          onChange={(e) => setReissuePrice(Number(e.target.value))}
                          className={`w-full ${isValidReissue ? 'accent-cyan-500' : 'accent-rose-500'}`}
                          aria-label="Reissue Price Slider"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Reissued Shares Count:</span>
                          <span className="font-mono text-amber-400">{reissueCount} of {forfeitedSharesCount} shares</span>
                        </div>
                        <input
                          type="range"
                          min={100}
                          max={forfeitedSharesCount}
                          step={100}
                          value={reissueCount}
                          onChange={(e) => setReissueCount(Number(e.target.value))}
                          className="accent-amber-500 w-full"
                          aria-label="Reissue Count Slider"
                        />
                      </div>
                    </div>

                    {/* Result Card */}
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs font-mono">
                      <div className="flex justify-between border-b border-slate-800 pb-2 font-sans">
                        <span className="font-bold text-slate-300">Statutory Compliance Check</span>
                        <span className={`font-bold px-2 py-0.5 rounded ${isValidReissue ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                          {isValidReissue ? '✓ LEGAL REISSUE' : '✗ ILLEGAL (Discount exceeds forfeited money)'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 font-sans">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400">Transfer to Capital Reserve</span>
                          <p className="font-mono text-lg font-bold text-emerald-400 mt-1">₹{totalCapitalReserve.toLocaleString('en-IN')}</p>
                          <p className="text-[10px] text-slate-500">{reissueCount} reissued × ₹{gainPerReissuedShare} net gain</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400">Retained in Forfeited Shares A/c</span>
                          <p className="font-mono text-lg font-bold text-cyan-400 mt-1">₹{retainedInForfeitedShares.toLocaleString('en-IN')}</p>
                          <p className="text-[10px] text-slate-500">{forfeitedSharesCount - reissueCount} un-reissued shares</p>
                        </div>
                      </div>

                      {/* Journal Entry preview */}
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 font-sans">CAPITAL RESERVE TRANSFER ENTRY:</span>
                        <div className="flex justify-between text-emerald-300">
                          <span>Forfeited Shares A/c .................... Dr.</span>
                          <span>₹{totalCapitalReserve.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-emerald-300 pl-4">
                          <span>To Capital Reserve A/c</span>
                          <span>₹{totalCapitalReserve.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Exploration Nav Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-bold"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs font-mono text-slate-400">Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide((s) => s + 1)}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-950"
                  >
                    Free Sandbox Mode →
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 3: SANDBOX / FREE PLAY MODE ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-4 space-y-4"
          >
            <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Ungraded Exploration</span>
                  <h2 className="text-2xl font-black text-white">Full Corporate Financial Sandbox</h2>
                </div>
                {/* Tabs */}
                <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  {(['journal', 'taccounts', 'waterfall', 'analytics'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabSwitch(tab)}
                      className={`px-3 py-1 rounded-lg capitalize font-bold ${
                        activeTab === tab ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Sandbox Display */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                {activeTab === 'waterfall' && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Live Cash Liquidation Slider:</span>
                      <span className="font-mono font-bold text-emerald-400">₹{cashAvailable.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={50000}
                      max={1000000}
                      step={20000}
                      value={cashAvailable}
                      onChange={(e) => setCashAvailable(Number(e.target.value))}
                      className="accent-emerald-500 w-full"
                      aria-label="Live Cash Liquidation Slider"
                    />
                    <div className="h-56 w-full pt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={waterfallChartData}>
                          <XAxis dataKey="name" stroke="#94a3b8" />
                          <YAxis stroke="#64748b" tickFormatter={(v) => `₹${v / 1000}k`} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                          <Bar dataKey="Paid" fill="#10b981" />
                          <Bar dataKey="Unpaid" fill="#ef4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {activeTab === 'journal' && (
                  <div className="font-mono text-xs space-y-2 text-slate-300">
                    <p className="text-emerald-400 font-bold border-b border-slate-800 pb-1">COMPOUND FORFEITURE & REISSUE CYCLE</p>
                    <p>1. Equity Share Capital A/c ({reissueCount} × ₹10) ........... Dr. ₹{(reissueCount * 10).toLocaleString('en-IN')}</p>
                    <p className="pl-4">To Forfeited Shares A/c ..................................... ₹{(reissueCount * forfeitedPerShare).toLocaleString('en-IN')}</p>
                    <p className="pl-4">To Calls in Arrears A/c ...................................... ₹{(reissueCount * (10 - forfeitedPerShare)).toLocaleString('en-IN')}</p>
                    <p className="text-cyan-400 pt-2">2. Bank A/c ({reissueCount} × ₹{reissuePrice}) ............................. Dr. ₹{(reissueCount * reissuePrice).toLocaleString('en-IN')}</p>
                    {actualDiscountPerShare > 0 && (
                      <p className="text-rose-400">   Forfeited Shares A/c (Discount) ......................... Dr. ₹{(reissueCount * actualDiscountPerShare).toLocaleString('en-IN')}</p>
                    )}
                    <p className="pl-4">To Equity Share Capital A/c ................................. ₹{(reissueCount * 10).toLocaleString('en-IN')}</p>
                    <p className="text-emerald-400 pt-2">3. Forfeited Shares A/c ..................................... Dr. ₹{totalCapitalReserve.toLocaleString('en-IN')}</p>
                    <p className="pl-4">To Capital Reserve A/c ..................................... ₹{totalCapitalReserve.toLocaleString('en-IN')}</p>
                  </div>
                )}

                {activeTab === 'taccounts' && (
                  <div className="font-mono text-xs text-slate-300 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-center font-bold text-emerald-400 pb-1 border-b border-slate-800">FORFEITED SHARES A/C</p>
                      <div className="flex justify-between mt-2"><span>To Discount</span><span>₹{(reissueCount * actualDiscountPerShare).toLocaleString('en-IN')}</span></div>
                      <div className="flex justify-between"><span>To Capital Reserve</span><span>₹{totalCapitalReserve.toLocaleString('en-IN')}</span></div>
                      <div className="flex justify-between text-cyan-400 font-bold pt-1 border-t border-slate-800">
                        <span>By Forfeiture (Cr)</span><span>���{(reissueCount * forfeitedPerShare).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-center font-bold text-indigo-400 pb-1 border-b border-slate-800">CAPITAL RESERVE A/C</p>
                      <div className="flex justify-between text-emerald-400 mt-2">
                        <span>By Forfeited Shares</span><span>₹{totalCapitalReserve.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400">Gaining Ratio A:C</span>
                      <p className="text-base font-bold text-emerald-400 mt-1">{(gainPropA * 100).toFixed(0)} : {(gainPropC * 100).toFixed(0)}</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400">Realisation Result</span>
                      <p className={`text-base font-bold mt-1 ${realisationProfitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {realisationProfitLoss >= 0 ? `+₹${realisationProfitLoss.toLocaleString('en-IN')}` : `-₹${Math.abs(realisationProfitLoss).toLocaleString('en-IN')}`}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400">Pro-Rata App Excess</span>
                      <p className="text-base font-bold text-amber-400 mt-1">₹{excessAppMoney.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400">Capital Reserve Yield</span>
                      <p className="text-base font-bold text-cyan-400 mt-1">₹{totalCapitalReserve.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAdvanceToChallenge}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-950 flex items-center justify-center gap-2"
              >
                Ready for Graded Board Challenges →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 4: BOARD CHALLENGE PHASE ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-4 space-y-4"
          >
            {/* Progress Bar & Badges */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400 uppercase font-bold tracking-wider">{activeChallenge.competencyLevel}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-mono">Score: {scoreBreakdown.correct} / {scoreBreakdown.total}</span>
                  <motion.span
                    key={difficulty}
                    initial={{ scale: 0.85 }}
                    animate={{ scale: 1 }}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      difficulty === 'foundation'
                        ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                        : difficulty === 'advanced'
                        ? 'bg-rose-900/60 text-rose-300 border border-rose-700'
                        : 'bg-indigo-900/60 text-indigo-300 border border-indigo-700'
                    }`}
                  >
                    {difficulty.toUpperCase()}
                  </motion.span>
                </div>
              </div>

              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Challenge Card */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={wrongShake ? { duration: 0.4 } : {}}
              className={`p-6 rounded-3xl border transition-colors ${
                wrongFlash ? 'bg-rose-950/70 border-rose-600' : 'bg-slate-900/90 border-slate-800'
              } space-y-5`}
            >
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Node: {activeChallenge.nodeId}</span>
                <span>•</span>
                <span className="capitalize">{activeChallenge.type}</span>
              </div>

              <p className="text-base sm:text-lg font-bold text-white leading-relaxed">{activeChallenge.question}</p>

              {/* ─── TYPE: CLASSIFY / DISTINGUISH / MATCH ─── */}
              {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') &&
                activeChallenge.options && (
                  <div className="space-y-2.5">
                    {activeChallenge.options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswer(i)}
                        disabled={answerRevealed || showExplanation}
                        aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                        className={`w-full p-4 rounded-2xl text-left text-sm font-semibold border transition-all ${
                          showExplanation
                            ? i === activeChallenge.correctIndex
                              ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                              : 'bg-slate-900/40 border-slate-800 text-slate-500'
                            : 'bg-slate-800/80 hover:bg-slate-755 border-slate-700 text-slate-200 hover:border-emerald-500/50'
                        }`}
                      >
                        <span className="font-mono text-xs font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                )}

              {/* ─── TYPE: NUMERIC ─── */}
              {activeChallenge.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter numerical amount"
                      className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono text-base focus:border-emerald-500 outline-none w-64"
                      aria-label="Numeric answer input"
                    />
                    <span className="text-slate-400 font-bold">{activeChallenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-950"
                    >
                      Post Entry
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ─── TYPE: DRAG-LABEL ─── */}
              {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
                <div className="space-y-4">
                  {/* Palette */}
                  <div className="flex flex-wrap gap-2">
                    {activeChallenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-xl cursor-grab text-white font-mono text-xs font-bold shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  {/* Drop Targets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeChallenge.dragItems.map((item) => (
                      <div
                        key={item.targetId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        className="p-4 bg-slate-950 rounded-2xl border border-dashed border-slate-700 space-y-1"
                      >
                        <span className="text-[11px] text-slate-400 uppercase font-bold">
                          {item.targetId.replace('t_', '').replace(/_/g, ' ')}
                        </span>
                        <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                          {droppedLabels[item.targetId] || '👉 Drop corresponding entry here'}
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xs shadow-lg shadow-emerald-950"
                  >
                    Validate Posting
                  </motion.button>
                </div>
              )}

              {/* ─── TYPE: DRAG-SORT ─── */}
              {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag items to rearrange into the legally prescribed order:</p>
                  <div className="space-y-2">
                    {(sortArrangement.length === activeChallenge.sortItems.length
                      ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
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
                        whileTap={{ scale: 0.99 }}
                        className="p-3.5 bg-slate-950 hover:bg-slate-900 rounded-2xl border border-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-3 cursor-grab"
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-mono font-bold text-emerald-400 text-xs">
                          {displayIdx + 1}
                        </span>
                        {item}
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xs shadow-lg shadow-emerald-950"
                  >
                    Confirm Legal Sequence
                  </motion.button>
                </div>
              )}

              {/* ─── TYPE: CONSTRUCT ─── */}
              {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {activeChallenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts((prev) => [...prev, part])}
                        className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl text-xs font-mono font-bold"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                    {constructParts.map((part, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1.5 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-xl font-mono text-xs flex items-center gap-2"
                      >
                        {part}
                        <button
                          onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-400 hover:text-rose-300 font-bold"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && <span className="text-slate-600 text-xs">Assemble journal entry components from above</span>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xs shadow-lg shadow-emerald-950"
                  >
                    Verify Construction
                  </motion.button>
                </div>
              )}

              {/* ─── CLICK-TO-REVEAL STEP-BY-STEP EXPLANATION ─── */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 bg-gradient-to-br from-slate-950 to-emerald-950/40 rounded-2xl border border-emerald-700/60 space-y-3"
                >
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <span>Audit Working Notes & Accounting Standards</span>
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
                        className="text-slate-200 text-sm leading-relaxed"
                      >
                        <span className="font-mono font-bold text-emerald-400 mr-1.5">{idx + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    {revealedSteps < activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setRevealedSteps((s) => s + 1)}
                        className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
                      >
                        Reveal Next Working Note →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xs shadow-lg shadow-emerald-950 ml-auto"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Audit Report →' : 'Proceed to Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 5: AUDIT REPORT & COMPLETION ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-6 space-y-6"
          >
            {/* Scorecard Hero */}
            <div className="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 rounded-3xl border border-emerald-700 shadow-2xl space-y-4 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Board Simulation Complete</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Official Master Audit Clearance</h2>
                  <p className="text-slate-300 text-sm mt-1">ISC Class 12 Accountancy Competency Benchmark</p>
                </div>
                <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-700 text-center min-w-[140px]">
                  <span className="text-[10px] uppercase text-slate-400">Final Score</span>
                  <p className="text-3xl font-black text-emerald-400 mt-1">{Math.max(0, 100 - errors * 5)}%</p>
                  <p className="text-[10px] text-slate-500">Mastery: {masteryLevel.toUpperCase()}</p>
                </div>
              </div>

              {/* MOTIVATIONAL FEEDBACK SECTION */}
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-emerald-700/80 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-emerald-400">{motivation.title}</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">{motivation.desc}</p>
              </div>
            </div>

            {/* SPACED REPETITION SRS VISIBILITY CARD */}
            <div className="p-6 bg-gradient-to-r from-amber-950/50 via-slate-900 to-indigo-950/50 rounded-3xl border-2 border-amber-500/60 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-2 bg-amber-950 rounded-xl border border-amber-600">📅</span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Spaced Repetition System (SRS)</span>
                    <h4 className="text-base font-black text-white">Optimal Memory Review Timing</h4>
                  </div>
                </div>
                <div className="px-4 py-2 bg-amber-500/20 border border-amber-500 rounded-2xl text-center shadow-md">
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">Recommended Next Session</span>
                  <span className="text-base sm:text-lg font-black text-amber-300 tracking-wide">
                    {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Based on your error frequency ({errors} error{errors === 1 ? '' : 's'}), the SM-2 algorithm recommends you{' '}
                <strong className="text-amber-300 font-bold">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </strong>{' '}
                to cement Section 48 liquidation priorities, AS-26 entries, and forfeiture capital reserve rules into permanent recall!
              </p>

              {/* Intervals visual indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-center">
                <div className={`p-3 rounded-2xl border text-xs transition-all ${errors >= 4 ? 'bg-amber-950/90 border-amber-500 text-amber-200 font-bold shadow-lg shadow-amber-950/50 ring-1 ring-amber-400' : 'bg-slate-950/70 border-slate-800 text-slate-400'}`}>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400">4+ Errors (Reinforce)</span>
                  <span className="text-sm font-black text-amber-300 mt-0.5 block">Review in 1 day</span>
                </div>
                <div className={`p-3 rounded-2xl border text-xs transition-all ${errors >= 1 && errors <= 3 ? 'bg-amber-950/90 border-amber-500 text-amber-200 font-bold shadow-lg shadow-amber-950/50 ring-1 ring-amber-400' : 'bg-slate-950/70 border-slate-800 text-slate-400'}`}>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400">1–3 Errors (Consolidate)</span>
                  <span className="text-sm font-black text-amber-300 mt-0.5 block">Review in 3 days</span>
                </div>
                <div className={`p-3 rounded-2xl border text-xs transition-all ${errors === 0 ? 'bg-amber-950/90 border-amber-500 text-amber-200 font-bold shadow-lg shadow-amber-950/50 ring-1 ring-amber-400' : 'bg-slate-950/70 border-slate-800 text-slate-400'}`}>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400">0 Errors (Mastery)</span>
                  <span className="text-sm font-black text-amber-300 mt-0.5 block">Review in 7 days</span>
                </div>
              </div>
            </div>

            {/* REFLECTION SECTION */}
            <div className="p-6 bg-slate-900/90 rounded-3xl border border-indigo-800/60 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">💡</span>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">Post-Audit Conceptual Reflection</h3>
              </div>
              <p className="text-xs text-slate-300">
                Deepen your retention by reflecting on key principles before your final board examinations:
              </p>

              <div className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label htmlFor="reflection-surprising" className="text-xs font-semibold text-indigo-300">
                    1. What was the most surprising thing you learned?
                  </label>
                  <textarea
                    id="reflection-surprising"
                    value={reflectionSurprise}
                    onChange={(e) => setReflectionSurprise(e.target.value)}
                    placeholder="e.g., That Section 48 prioritizes partner loans over partner capitals, or that AS-26 completely prohibits raising goodwill accounts..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-indigo-500 outline-none resize-none h-20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="reflection-friend" className="text-xs font-semibold text-emerald-300">
                    2. How would you explain this to a friend?
                  </label>
                  <textarea
                    id="reflection-friend"
                    value={reflectionExplain}
                    onChange={(e) => setReflectionExplain(e.target.value)}
                    placeholder="e.g., In simple terms, when shares are reissued at a discount, the money already forfeited acts like a safety cushion..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-emerald-500 outline-none resize-none h-20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="reflection-reallife" className="text-xs font-semibold text-amber-300">
                    3. Where in real life might you use this?
                  </label>
                  <textarea
                    id="reflection-reallife"
                    value={reflectionRealLife}
                    onChange={(e) => setReflectionRealLife(e.target.value)}
                    placeholder="e.g., During an IPO allotment review, corporate bankruptcy proceedings under IBC 2016, or auditing firm partnership retirements..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-amber-500 outline-none resize-none h-20"
                  />
                </div>
              </div>
            </div>

            {/* Misconception Profile Tracker */}
            {hitMisconceptions.length > 0 && (
              <div className="p-5 bg-rose-950/40 rounded-3xl border border-rose-900/80 space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-rose-400">
                  Targeted Audit Gap Analysis ({hitMisconceptions.length} Misconceptions Identified)
                </h3>
                <p className="text-xs text-slate-400">
                  Examiners frequently design trap questions around these precise principles. Review the statutory corrections:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {hitMisconceptions.map((idx) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <div key={idx} className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-xs">
                        <p className="text-rose-400 font-bold">❌ Common Trap: {m.misconception}</p>
                        <p className="text-emerald-300 leading-relaxed">✓ Law & Standard: {m.correction}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Real World Practical Activity */}
            <div className="p-5 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Real-World Case Study Extension</span>
              <h3 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-xs text-slate-400 flex items-start gap-2">
                    <span className="font-mono font-bold text-indigo-400">{i + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('explore');
                  setCurrentSlide(0);
                }}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl text-xs font-bold"
              >
                Re-enter Simulation Labs
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('challenge');
                  setCurrentChallenge(0);
                  setScoreBreakdown({ correct: 0, total: 0 });
                  setErrors(0);
                }}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-950"
              >
                Retake Adaptive Exam
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FEEDBACK SYSTEM INTEGRATION ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Statutory Entry Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C12_AccountancyRetirementPartnerGainingSim;
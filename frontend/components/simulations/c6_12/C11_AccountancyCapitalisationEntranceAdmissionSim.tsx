'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Node IDs as string literals
const NODE_C11_ACC_071 = 'c11_acc_071';
const NODE_C11_ACC_072 = 'c11_acc_072';
const NODE_C11_ACC_073 = 'c11_acc_073';
const NODE_C11_ACC_074 = 'c11_acc_074';
const ALL_NODE_IDS = [NODE_C11_ACC_071, NODE_C11_ACC_072, NODE_C11_ACC_073, NODE_C11_ACC_074];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great NGO & Enterprise Systems Audit',
  intro: 'You have been appointed as the Chief Systems & Accounting Auditor for the "Seva & Pragati Foundation" (a major Indian NPO) and its commercial social enterprise wing. The organisation is transitioning from old manual registers to an automated Computerised Accounting & Information System (CAS/AIS) powered by Tally Prime and SAP S/4HANA.',
  context: 'Your mission: correctly classify huge inflows of entrance fees, legacies, and grants between the Balance Sheet Capital/Specific Funds and the Income & Expenditure Account, while architecting and auditing the automated AIS data pipeline to prevent systemic failure or compliance breach under CISCE rules, Companies Act 2013, and GSTN regulations.',
};

// ─── BRILLIANT-STYLE PREDICTION QUESTIONS (PREDICT-THEN-CHECK) ───
export interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifyInstruction: string;
}

export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'Before running the Capital Fund simulator: If an NPO collects ₹50,000 as Entrance Fees and ₹1,00,000 as Life Membership Fees with an operating surplus of ₹75,000, how will the closing Capital Fund change relative to opening capital?',
    options: [
      'It will remain unchanged because fees and surpluses belong in cash reserves only',
      'It will increase by exactly ₹2,25,000 on the Balance Sheet liabilities side (₹50,000 + ₹1,00,000 + ₹75,000)',
      'It will decrease because life membership confers lifetime free access liabilities',
      'Only the operating surplus of ₹75,000 will be added; entrance fees go to I&E'
    ],
    correctIndex: 1,
    explanation: 'Under CISCE accounting rules, entrance fees and life membership fees are capitalised to the Capital Fund on the Balance Sheet. Along with the operating surplus from I&E A/c, all three components directly increase the Closing Capital Fund.',
    verifyInstruction: 'Navigate to Lab 2 (Capital Fund Balance Builder), set Entrance Fees to ₹50,000, Life Membership to ₹1,00,000, and Surplus to ₹75,000, then verify the closing fund arithmetic.'
  },
  {
    id: 'pred_2',
    question: 'Before posting a sales voucher in CAS: When a ₹20,000 sale with 18% GST (9% CGST + 9% SGST) is saved in Tally Prime, how many distinct ledger accounts will be updated simultaneously in real time?',
    options: [
      'Only 1 ledger (Cash / Bank account)',
      '2 ledgers (Cash and Sales account only)',
      '4 ledgers simultaneously (Dr Cash ₹23,600, Cr Sales ₹20,000, Cr CGST ₹1,800, Cr SGST ₹1,800)',
      'No ledgers update until the manual month-end closing run'
    ],
    correctIndex: 2,
    explanation: 'A modern CAS executes simultaneous real-time multi-ledger posting: saving one transaction instantly updates Debtor/Cash (+₹23,600), Sales Revenue (+₹20,000), and Government GST tax liabilities (+₹1,800 each).',
    verifyInstruction: 'Navigate to Lab 3 (CAS Automated Voucher Engine), configure a ₹20,000 Sales Voucher with 18% GST, and click "Post Voucher" to observe all 4 ledgers auto-balance.'
  }
];

// ─── BRILLIANT-STYLE OBSERVATION QUESTIONS (WHAT DO YOU NOTICE?) ───
export interface ObservationQuestion {
  id: string;
  question: string;
  options: string[];
  observableOptions: string[];
  correctIndex: number;
  explanation: string;
}

export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'In Lab 1 (Fund Classification Matrix), what visual routing change occurs when you switch selection from an "Unrestricted General Donation" to a "Legacy for Blood Bank"?',
    options: [
      'The destination dynamically shifts from Income & Expenditure A/c (Credit) to a Dedicated Specific Fund on the Balance Sheet Liabilities side',
      'The routing changes from Capital Fund to an Asset account',
      'Both receipts route exclusively into the Trading Account',
      'No change occurs because both are treated as regular revenue'
    ],
    observableOptions: [
      'The destination dynamically shifts from Income & Expenditure A/c (Credit) to a Dedicated Specific Fund on the Balance Sheet Liabilities side',
      'The routing changes from Capital Fund to an Asset account',
      'Both receipts route exclusively into the Trading Account',
      'No change occurs because both are treated as regular revenue'
    ],
    correctIndex: 0,
    explanation: 'Observing the dynamic routing card reveals that unrestricted general donations light up the I&E Revenue box, while earmarked receipts (e.g. Blood Bank Legacy) immediately highlight the Balance Sheet Specific Fund box.'
  },
  {
    id: 'obs_2',
    question: 'In Lab 4 (Cost-Benefit & Feasibility Gauge), observe what happens when you adjust the monthly transaction slider below 50 tx/month for Tally Prime.',
    options: [
      'The verdict turns to "⚠️ Economically Inadvisable for Micro Scale" because the ~₹75,000 software/hardware investment far outweighs saving 2 hours of manual bookkeeping',
      'The system forces an automatic upgrade to SAP S/4HANA',
      'The labor cost per year jumps to over ₹10,00,000',
      'The software automatically becomes zero-cost freeware'
    ],
    observableOptions: [
      'The verdict turns to "⚠️ Economically Inadvisable for Micro Scale" because the ~₹75,000 software/hardware investment far outweighs saving 2 hours of manual bookkeeping',
      'The system forces an automatic upgrade to SAP S/4HANA',
      'The labor cost per year jumps to over ₹10,00,000',
      'The software automatically becomes zero-cost freeware'
    ],
    correctIndex: 0,
    explanation: 'Observing the feasibility card demonstrates that for a micro kirana store with low volume, the high initial fixed capital cost of CAS makes manual registers economically rational.'
  }
];

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'The Indian Red Cross Society receives ₹10,00,000 as a legacy under a will specifically to build a Blood Bank, and ₹5,00,000 as a general donation with no conditions. Where should each amount be credited?',
  options: [
    'Both to Income & Expenditure A/c because cash came into the bank this year',
    'Legacy to Blood Bank Fund (Balance Sheet Liabilities); General Donation to I&E A/c (Income)',
    'Both to Capital Fund in the Balance Sheet because both are large amounts',
    'Legacy to I&E A/c; General Donation to Capital Fund'
  ],
  correctIndex: 1,
  hintAfter: "Don't worry if this seems tricky! Recurrence and purpose dictate NPO classification, not the rupee size. Let's explore why!",
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

// ─── 21 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C11_ACC_071,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under CISCE regulations, how must Entrance Fees and Admission Fees of a Non-Profit Organisation be treated in accounting?',
    options: [
      'Treated as Revenue Income in the Income & Expenditure Account',
      'Capitalised and added to the Capital Fund on the Liabilities side of the Balance Sheet',
      'Recorded only in the Cash Book and ignored in financial statements',
      'Credited directly to the Asset side as an intangible asset'
    ],
    correctIndex: 1,
    explanation: 'Entrance and admission fees are one-time, non-recurring fees paid by members upon joining. Under CISCE rules, they are strictly capitalised to the Capital Fund on the Balance Sheet liabilities side.',
    hints: [
      'Think about how often a member joins and pays this fee.',
      'One-time non-recurring receipts in NPO are capitalised.',
      'They strengthen the permanent capital of the NPO and belong in the Balance Sheet Capital Fund.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_02',
    nodeId: NODE_C11_ACC_071,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The Rotary Club of Mumbai receives ₹15,000 as a Life Membership Fee from a new patron. What is the fundamental accounting reason for capitalising this fee rather than treating it as revenue?',
    options: [
      'Because it exceeds ₹10,000 in monetary value',
      'Because the payment is a single, non-recurring lump sum conferring lifetime benefit without future annual subscriptions',
      'Because the Income Tax Act forbids life memberships',
      'Because life members are considered lenders to the club'
    ],
    correctIndex: 1,
    explanation: 'Life membership fees are paid once in a lifetime, exempting the member from recurring annual subscriptions. Because the payment is non-recurring and provides perpetual benefit, it must be capitalised to the Capital Fund.',
    hints: [
      'Does this member pay this fee every single year or only once?',
      'The test between capital and revenue is recurrence and purpose, not the label "fees".',
      'Since it is a one-time payment for lifetime privilege, it is capitalised.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_03',
    nodeId: NODE_C11_ACC_072,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each CAS component to its operational description in the enterprise architecture.',
    dragItems: [
      { label: 'Hardware', targetId: 't_hard' },
      { label: 'Software', targetId: 't_soft' },
      { label: 'Personnel', targetId: 't_pers' },
      { label: 'Procedures', targetId: 't_proc' }
    ],
    correctMapping: {
      t_hard: 'Hardware',
      t_soft: 'Software',
      t_pers: 'Personnel',
      t_proc: 'Procedures'
    },
    explanation: 'CAS consists of 6 components: Hardware (PC/servers), Software (Tally/SAP), Personnel (accountants/auditors), Procedures (approval rules), Data (masters/vouchers), and Users (management/tax officers).',
    hints: [
      'Hardware is the physical computing machinery.',
      'Software is the computer program like Tally Prime or SAP S/4HANA.',
      'Personnel represents the skilled human accountants operating the system, while Procedures are the documented internal control rules.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_04',
    nodeId: NODE_C11_ACC_072,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is NOT one of the six essential components of a Computerised Accounting System (CAS)?',
    options: [
      'Procedures and Data',
      'Hardware and Software',
      'Personnel and Users',
      'Physical Paper Ledger Binders'
    ],
    correctIndex: 3,
    explanation: 'The six components of CAS are Hardware, Software, Personnel, Procedures, Data, and Users. Physical paper ledger binders are eliminated by CAS automation.',
    hints: [
      'Remember the 6 components of CAS: 2 technical, 2 human, 2 informational/rule-based.',
      'Hardware, Software, Personnel, Procedures, Data, Users.',
      'Physical paper ledgers are the hallmark of manual bookkeeping, not CAS.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_05',
    nodeId: NODE_C11_ACC_073,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following statements correctly identifies a limitation of a Computerised Accounting System (CAS)?',
    options: [
      'It cannot generate a trial balance automatically',
      'It cannot detect conceptual errors (such as debiting Purchases instead of Machinery) because it only ensures arithmetic equality',
      'It cannot support GST tax invoice printing',
      'It takes two days to generate a monthly P&L account'
    ],
    correctIndex: 1,
    explanation: 'CAS auto-balances debits and credits perfectly, eliminating arithmetic errors. However, it lacks human accounting judgment and will accept conceptual errors if entered by personnel.',
    hints: [
      'Think about what a computer cannot think for itself.',
      'If you tell the software to debit Purchases A/c for a machine, will the software complain or post it?',
      'The software checks math, not accounting principles.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_06',
    nodeId: NODE_C11_ACC_074,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What mnemonic represents the five core elements of an Accounting Information System (AIS)?',
    options: [
      'PPDSH: People, Procedures, Data, Software, Hardware',
      'ASSET: Assets, Solvency, Software, Equity, Taxes',
      'DEBIT: Data, Entry, Books, Invoices, Transactions',
      'TALLY: Terminals, Accounts, Ledgers, Liabilities, Yields'
    ],
    correctIndex: 0,
    explanation: 'The 5 elements of AIS are People, Procedures, Data, Software, Hardware (PPDSH). AIS is the comprehensive socio-technical framework.',
    hints: [
      'Remember the 5-element model covering humans, rules, information, programs, and machines.',
      'P - P - D - S - H.',
      'People, Procedures, Data, Software, Hardware.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_07',
    nodeId: NODE_C11_ACC_071,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A donor contributes ₹80,000 to an NPO with no conditions attached ("for general charitable activities"). What is its accounting treatment?',
    options: [
      'Capitalised to the Building Fund',
      'Credited as Revenue Income to the Income & Expenditure Account',
      'Credited directly to the Capital Fund on the Balance Sheet',
      'Treated as a long-term liability'
    ],
    correctIndex: 1,
    explanation: 'General donations are unearmarked funds available for recurring operational use. Under CISCE standards, all general donations are revenue receipts credited to the Income & Expenditure Account.',
    hints: [
      'Is there any specific condition or earmark attached to this donation?',
      'Unrestricted donations support normal recurring operations.',
      'General donations go to the I&E Account as income.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_08',
    nodeId: NODE_C11_ACC_071,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'HelpAge Kolkata receives: (1) Entrance fees from 50 members @ ₹1,000 each; (2) Life membership fees from 4 members @ ₹25,000 each; (3) Unrestricted general legacy of ₹8,00,000. Calculate the TOTAL amount (in ₹) to be credited to the general Capital Fund on the Balance Sheet liabilities side.',
    correctAnswer: 950000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Total Capital Fund addition = Entrance Fees (50 × ₹1,000 = ₹50,000) + Life Membership Fees (4 × ₹25,000 = ₹1,00,000) + General Legacy (₹8,00,000) = ₹9,50,000.',
    hints: [
      'Calculate Entrance fees: 50 × 1000.',
      'Calculate Life membership: 4 × 25000.',
      'Add the unrestricted legacy (₹8,00,000) because all three are capitalised to the Capital Fund. Sum = 50,000 + 1,00,000 + 8,00,000.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_09',
    nodeId: NODE_C11_ACC_071,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Contrast an unrestricted Legacy of ₹10,00,000 with a Special Grant of ₹2,00,000 from the Sports Ministry for sports equipment. Where do they appear in the Balance Sheet?',
    options: [
      'Both are added to the general Capital Fund',
      'Unrestricted Legacy is added to Capital Fund; Special Grant is credited to a separate dedicated "Sports Fund" liability account',
      'Unrestricted Legacy goes to I&E Account; Special Grant goes to Capital Fund',
      'Both are credited to the Income & Expenditure Account as current income'
    ],
    correctIndex: 1,
    explanation: 'Both are capital receipts. However, general (unrestricted) legacies merge into the General Capital Fund, whereas special grants/donations must be isolated in a dedicated specific fund (e.g. Sports Fund) to ensure funds are spent only on the earmarked purpose.',
    hints: [
      'Both are capital items on the Liabilities side of the Balance Sheet.',
      'Is one general and one tied to a specific restriction?',
      'Specific earmarked receipts create dedicated Special Funds.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_10',
    nodeId: NODE_C11_ACC_074,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the 5 sequential stages of the Accounting Information System (AIS) transaction and decision flow.',
    sortItems: [
      '1. Source Document Generation (e.g. Goods Receipt Note / Tax Invoice)',
      '2. Input Voucher Creation in CAS Software',
      '3. Processing (Automated Journalizing & Ledger Posting)',
      '4. Output Reports Generation (Trial Balance, P&L, GST Returns)',
      '5. Feedback Loop (Managerial Decisions & Policy Revisions)'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The AIS flow follows a closed-loop system: Source Document → Input (Voucher) → Processing (Ledger update) → Output (Financial Reports) → Feedback (Managerial action that updates future procedures).',
    hints: [
      'Start with the physical proof of the transaction (bill/invoice).',
      'Voucher entry is input, which leads to automated processing.',
      'Outputs are generated, and management review creates the closed-loop feedback.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_11',
    nodeId: NODE_C11_ACC_072,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Delhi trader records a cash sale of ₹20,000 + 18% GST (₹1,800 CGST + ₹1,800 SGST = ₹23,600) in Tally Prime. Which set of simultaneous automated ledger postings does CAS execute upon saving?',
    options: [
      'Dr Cash ₹20,000; Cr Sales ₹20,000 only',
      'Dr Cash ₹23,600; Cr Sales ₹20,000; Cr Output CGST ₹1,800; Cr Output SGST ₹1,800',
      'Dr Sales ₹20,000; Dr Output CGST ₹1,800; Dr Output SGST ₹1,800; Cr Cash ₹23,600',
      'Dr Sundry Debtors ₹23,600; Cr Capital ₹23,600'
    ],
    correctIndex: 1,
    explanation: 'In CAS, saving one voucher triggers real-time multi-ledger updates: Cash is debited with the total inflow ₹23,600, while Sales is credited with net revenue ₹20,000, Output CGST with ₹1,800, and Output SGST with ₹1,800 liability.',
    hints: [
      'Cash received includes both sales value and collected GST.',
      'Sales represents net revenue, and collected GST is a current liability owed to the government.',
      'Dr Cash ₹23,600, Cr Sales ₹20,000, Cr Output CGST ₹1,800, Cr Output SGST ₹1,800.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_12',
    nodeId: NODE_C11_ACC_073,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A kirana store owner with 35 transactions a month considers buying Tally Prime Silver (₹22,500 + ₹4,500 TSS + ₹40,000 PC hardware). Why is this economically irrational?',
    options: [
      'Because Tally Prime is illegal for grocery stores',
      'Because the capital cost of ~₹67,000 vastly exceeds the economic benefit of saving only ~2 hours of manual bookkeeping per month',
      'Because CAS cannot compute grocery bills',
      'Because manual accounting produces higher net profits'
    ],
    correctIndex: 1,
    explanation: 'Cost-benefit analysis dictates that CAS adoption is only viable when the transaction volume is high enough that error reduction, time savings, and compliance gains exceed software, hardware, and maintenance costs.',
    hints: [
      'Compare total first-year investment (over ₹67,000) with the monthly time spent (2 hours).',
      'Evaluate whether a micro-enterprise with low volume gets a return on investment.',
      'The cost heavily outweighs the marginal time saved.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_13',
    nodeId: NODE_C11_ACC_074,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does an Accounting Information System (AIS) differ fundamentally from a Computerised Accounting System (CAS)?',
    options: [
      'There is no difference; they are exact synonyms',
      'CAS is strictly the software tool (e.g. Tally, SAP), while AIS is the overarching 5-element system encompassing People, Procedures, Data, Software, and Hardware with a feedback loop',
      'CAS is used by banks, whereas AIS is used only by schools',
      'AIS is manual, whereas CAS is computerized'
    ],
    correctIndex: 1,
    explanation: 'CAS is the software application executing journalizing and posting. AIS is the complete socio-technical framework (PPDSH) including the accountants, organizational internal controls, raw data, machines, and executive decision loops.',
    hints: [
      'Think: is a calculator the same as the accountant who uses it with company rules?',
      'Software is just one component among five.',
      'AIS = System (PPDSH); CAS = Software Tool.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_14',
    nodeId: NODE_C11_ACC_071,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The Chennai Cultural Academy receives ₹3,000 annual subscription each from 200 members, and a general donation of ₹1,50,000. What is the total Revenue Income (in ₹) credited to the Income & Expenditure Account for the year?',
    correctAnswer: 750000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Total Revenue Income = Annual Subscriptions (200 × ₹3,000 = ₹6,00,000) + General Donation (₹1,50,000) = ₹7,50,000. Both are revenue items credited to I&E Account.',
    hints: [
      'Calculate total subscription income: 200 × 3,000 = 6,00,000.',
      'General donations are unrestricted revenue: add ₹1,50,000.',
      'Total = 6,00,000 + 1,50,000.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_15',
    nodeId: NODE_C11_ACC_073,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under Section 128 of the Companies Act 2013 and MCA rules, every Indian company using accounting software must ensure an "Audit Trail" (edit log). Why is this statutory requirement critical?',
    options: [
      'It automatically pays company taxes to the RBI',
      'It creates an indelible, tamper-evident log of who entered/modified every voucher and when, deterring post-entry fraud and manipulation',
      'It eliminates the need to appoint an external chartered accountant',
      'It speeds up computer processing by 50%'
    ],
    correctIndex: 1,
    explanation: 'The mandatory audit trail feature records timestamps, user IDs, and exact line-item alterations whenever an entry is modified or deleted. As proven by historical corporate frauds, this prevents silent retrospective tampering of books.',
    hints: [
      'What happens when an accountant modifies a posted voucher?',
      'Why would government auditors want an unalterable log of changes?',
      'The audit trail creates tamper-evident accountability for every edit.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_16',
    nodeId: NODE_C11_ACC_071,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the correct Balance Sheet Liabilities Fund structure by ordering the components for an NPO with an opening capital fund of ₹5,00,000, surplus of ₹1,00,000, and life membership fees of ₹50,000.',
    availableParts: [
      'Opening Capital Fund ₹5,00,000',
      '+ Life Membership Fees ₹50,00,0',
      '+ Current Year Surplus ₹1,00,000',
      '= Closing Capital Fund ₹6,50,000'
    ],
    targetState: 'Opening Capital Fund ₹5,00,000 + Life Membership Fees ₹50,000 + Current Year Surplus ₹1,00,000 = Closing Capital Fund ₹6,50,000',
    validationHint: 'Add all 4 parts in exact accounting computation sequence: Opening + Capitalised Additions + Surplus = Closing.',
    explanation: 'Closing Capital Fund = Opening Capital Fund (₹5,00,000) + Capitalised Receipts like Life Membership Fees (₹50,000) + Net Surplus from I&E A/c (₹1,00,000) = ₹6,50,000.',
    hints: [
      'Start with Opening Capital Fund.',
      'Add capitalised receipts (Life Membership Fees).',
      'Add the operating Surplus to arrive at the final Closing Capital Fund.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_17',
    nodeId: NODE_C11_ACC_074,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is the Goods and Services Tax Network (GSTN) portal classified as a national-scale Accounting Information System (AIS)?',
    options: [
      'Because it is hosted exclusively on Microsoft Windows laptops',
      'Because it captures invoice data (Input), matches multi-party returns (Processing), generates tax ledgers and GSTR-3B (Output), and enforces compliance audits (Feedback)',
      'Because it replaces all private accountants across India',
      'Because it operates as a manual physical ledger repository in New Delhi'
    ],
    correctIndex: 1,
    explanation: 'The GSTN portal operates the classic closed-loop AIS model at national scale: Data inputs from GSTR-1 → server processing & automated cross-matching with recipient GSTR-2B → tax liability output in GSTR-3B → audit/notice feedback loop.',
    hints: [
      'Think about the Input-Process-Output-Feedback model of AIS.',
      'Invoices are input, servers match credits, returns are output, notices create feedback.',
      'GSTN embodies all 5 elements of AIS for Indian tax compliance.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_18',
    nodeId: NODE_C11_ACC_073,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A Surat textile unit suffered a ransomware cyberattack in 2022 that encrypted its standalone Tally data file, destroying ₹40 lakh worth of transaction records. Which architectural flaw in their CAS deployment caused this catastrophic loss?',
    options: [
      'Using double-entry bookkeeping principles',
      'Relying on a single unbacked-up desktop terminal without automated off-site cloud replication or strict hardware security procedures',
      'Charging CGST and SGST at incorrect tax slabs',
      'Allowing management to view the monthly Balance Sheet'
    ],
    correctIndex: 1,
    explanation: 'CAS data vulnerability requires robust procedural controls: daily 3-2-1 backup policies (local drive + offsite cloud) and endpoint cybersecurity. Standalone local data without procedures violates fundamental AIS security.',
    hints: [
      'Why was there no second copy to restore when the main drive was encrypted?',
      'Consider the lack of data backup procedures and antivirus protection.',
      'Relying on a single unprotected machine without off-site backup caused the loss.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_19',
    nodeId: NODE_C11_ACC_071,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare Section 11 of the Income Tax Act 1961 (Corpus Donations) with the CISCE NPO accounting syllabus rule for General Donations. Which distinction is vital for Board exams?',
    options: [
      'Under CISCE rules, all general donations are revenue income in I&E A/c regardless of size; under tax law, donors may specifically designate large gifts as corpus by written direction',
      'CISCE rules require all donations above ₹1,00,000 to be capitalised',
      'Income Tax rules ban NPOs from accepting subscriptions',
      'CISCE and Income Tax Act rules are identical in every clause'
    ],
    correctIndex: 0,
    explanation: 'In the ISC Board exam, students must strictly follow CISCE rules: General donations = Revenue (I&E A/c); Legacies/Special Donations = Capital. In real-world tax law, express donor corpus letters dictate tax exemption status.',
    hints: [
      'Does CISCE reclassify a ₹10,00,000 general donation into capital just because it is large?',
      'CISCE syllabus relies on standard classification categories.',
      'General donations are always revenue in ISC exams.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_20',
    nodeId: NODE_C11_ACC_072,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of events executed inside SAP S/4HANA when Reliance Industries receives ₹5,00,00,000 worth of crude oil at Jamnagar refinery.',
    sortItems: [
      '1. Store officer inspects crude shipment & generates Goods Receipt Note (GRN No 456)',
      '2. SAP automatically creates Journal Entry: Dr Inventory A/c ₹5 Cr, Cr Accounts Payable ₹5 Cr',
      '3. SAP automatically updates Inventory and Creditor ledgers in real-time',
      '4. Trial balance & Balance Sheet reflect new inventory and liabilities immediately',
      '5. Plant manager reviews automated working capital dashboard to trigger supplier payment'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'In enterprise CAS/AIS (SAP S/4HANA), physical goods receipt triggers automatic dual-aspect journalization, real-time ledger updates, instant trial balance adjustment, and operational dashboard generation.',
    hints: [
      'Start with the physical receipt and GRN document.',
      'The software automatically posts debit to inventory and credit to payable.',
      'Ledgers and financial statements update instantly, enabling manager decision-making.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_21',
    nodeId: NODE_C11_ACC_074,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are designing an internal control procedure for an AIS. A junior clerk enters vendor invoices into Tally. Which control mechanism best prevents unauthorized payments above ₹1,00,000?',
    options: [
      'Turn off the computer screen after entering data',
      'Implement a role-based dual-authorization procedure where vouchers above ₹1,00,000 require the Senior Finance Manager cryptographic digital approval before ledger posting',
      'Delete the audit trail log at the end of each day',
      'Enter all invoices as cash payments without recording party names'
    ],
    correctIndex: 1,
    explanation: 'A robust AIS integrates Procedures and Personnel through segregation of duties and dual-authorization matrices. Requiring manager approval above defined thresholds prevents fraud and unauthorized disbursements.',
    hints: [
      'How do you prevent one clerk from paying fraudulent bills?',
      'Think about segregation of duties and approval thresholds.',
      'Dual-authorization by a senior manager enforces proper internal control.'
    ],
    misconceptionIndex: 1
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
  nodeId: NODE_C11_ACC_071,
  title: 'Capitalisation of NPO Receipts & Computerised Accounting/Information Systems (CAS & AIS)',
  definition: 'Comprehensive mastery of NPO capital vs revenue receipts (entrance/admission fees, life membership fees, legacies, special/general grants & donations) combined with the architecture, advantages, limitations, and operational flows of Computerised Accounting Systems (CAS) and Accounting Information Systems (AIS).',
  eli5: 'Think of an NPO like a community sports club: one-time joining fees and building gifts go into a permanent savings vault (Capital Fund), while annual member dues pay for daily electricity and balls (Revenue). A CAS is the smart software engine doing the math, while an AIS is the whole system—people, rules, machines, and feedback.',
  misconceptions: [
    {
      misconception: 'Life membership fees are revenue because they contain the word "fees", similar to annual subscriptions.',
      correction: 'Life membership fees are paid once in a lifetime (non-recurring) for permanent membership benefits. Under CISCE rules, they are strictly capitalised to the Capital Fund on the Balance Sheet.'
    },
    {
      misconception: 'CAS means only the software program like Tally Prime or SAP.',
      correction: 'Tally or SAP is only the software component. A CAS is an integrated system comprising six components: Hardware, Software, Personnel, Procedures, Data, and Users.'
    },
    {
      misconception: 'A Computerised Accounting System completely prevents fraud.',
      correction: 'CAS eliminates arithmetic errors and provides an audit trail for detection, but cannot prevent intentional fraud by users with administrative override (as seen in the Satyam 2009 scandal).'
    },
    {
      misconception: 'A general donation of ₹10,00,000 must be capitalised because the amount is huge.',
      correction: 'Classification in NPO accounting depends strictly on recurrence and specific purpose, not the monetary amount. An unrestricted general donation is always revenue income in the I&E Account.'
    },
    {
      misconception: 'AIS and CAS are identical concepts.',
      correction: 'CAS is the software tool performing calculations and postings. AIS is the broader socio-technical system (PPDSH: People, Procedures, Data, Software, Hardware) including management feedback.'
    }
  ],
  diagnosticQuestions: [
    { question: 'Which receipt is capitalised to the Capital Fund in an NPO?', options: ['Annual subscription', 'General grant', 'Life membership fee', 'Interest on investments'], correctIndex: 2 },
    { question: 'Where is a legacy for a specific building project credited?', options: ['I&E Account (Credit)', 'Building Fund (Balance Sheet Liabilities)', 'Capital Fund as revenue', 'Assets as cash only'], correctIndex: 1 },
    { question: 'How many core components constitute a Computerised Accounting System (CAS)?', options: ['2', '4', '6', '10'], correctIndex: 2 },
    { question: 'Which software is developed by Tally Solutions, Bengaluru?', options: ['Tally Prime', 'Zoho Books', 'Marg ERP', 'SAP S/4HANA'], correctIndex: 0 },
    { question: 'What is the main limitation of CAS regarding ledger entries?', options: ['It cannot balance debits and credits', 'It cannot detect conceptual errors', 'It refuses large numbers', 'It requires daily reinstallation'], correctIndex: 1 },
    { question: 'What does the mnemonic PPDSH stand for in AIS?', options: ['Profit, Period, Data, Sales, Hardware', 'People, Procedures, Data, Software, Hardware', 'Personnel, Principles, Debtors, Software, Hierarchy', 'Purchase, Payment, Delivery, Storage, Handling'], correctIndex: 1 },
    { question: 'What is the closed-loop step in AIS where managers make decisions?', options: ['Input', 'Processing', 'Feedback', 'Source document'], correctIndex: 2 },
    { question: 'Are general donations treated as capital or revenue under CISCE rules?', options: ['Always Capital', 'Always Revenue', 'Depends on donor mood', 'Ignored entirely'], correctIndex: 1 }
  ],
  masteryCriteria: 'Student accurately classifies all NPO receipts, calculates Capital & Specific Funds, outlines the 6 components and salient features/limitations of CAS, and traces the 5-element closed-loop AIS flow with Indian enterprise context.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: NPO Fund Classification Matrix',
    instruction: 'Click on each inflow item below to classify it and watch how it dynamically routes to either the Balance Sheet (Capital/Specific Fund) or the Income & Expenditure Account.',
    nodeId: NODE_C11_ACC_071
  },
  {
    title: 'Lab 2: Dynamic Capital Fund Balance Builder',
    instruction: 'Adjust the sliders for Opening Capital Fund, Member Entrance Fees, Life Memberships, and Current Operating Surplus to see the real-time Balance Sheet Capital Fund computation.',
    nodeId: NODE_C11_ACC_071
  },
  {
    title: 'Lab 3: CAS Automated Voucher-to-Ledger Engine',
    instruction: 'Select a transaction type (Sales + GST / Purchase / Asset Acquisition) and click "Post Voucher" to watch the real-time simultaneous debit/credit posting across ledgers and Trial Balance.',
    nodeId: NODE_C11_ACC_072
  },
  {
    title: 'Lab 4: Enterprise Cost-Benefit & Limitation Gauge',
    instruction: 'Manipulate business monthly transaction volume and observe whether Manual Accounting or CAS (Tally Prime / SAP) is economically and operationally rational.',
    nodeId: NODE_C11_ACC_073
  },
  {
    title: 'Lab 5: Closed-Loop AIS Architecture (PPDSH)',
    instruction: 'Interact with the 5 stages of the AIS Pipeline (Source Document → Input → Processing → Output → Feedback) to trace how management decisions re-enter the system.',
    nodeId: NODE_C11_ACC_074
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Systems & NPO Audit Challenge',
  description: 'Step into the shoes of an ISC Certified Accounting Consultant conducting a statutory systems audit for a charitable trust operating schools and hospitals in Bengaluru.',
  steps: [
    'Audit Receipts: Examine 10 sample vouchers (entrance fees, general donations, hospital wing legacies) and verify their placement in either the Capital Fund, Specific Building Fund, or I&E Account.',
    'Verify CAS Configuration: Inspect Tally Prime 4.0 settings to ensure the mandatory Companies Act 2013 Audit Trail (Edit Log) is enabled and cannot be bypassed.',
    'Test Internal Controls: Check that all purchase vouchers above ₹50,000 have mandatory dual-signoff procedures before automated posting.',
    'Present Final AIS Feedback Report to the Board of Trustees with recommendations for cloud backup and disaster recovery.'
  ]
};

// ─── MAIN COMPONENT ───
export function C11_AccountancyCapitalisationEntranceAdmissionSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_ACC_071,
  title = DEFAULT_PROPS.title || 'NPO Capitalisation & Computerised Accounting Systems',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['accountancy'] || { name: 'Accountancy', emoji: '📒', color: 'emerald' };

  // Phase state
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
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

  // Discovery states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction & Observation Interactive states
  const [activePredictionIdx, setActivePredictionIdx] = useState(0);
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);

  const [activeObservationIdx, setActiveObservationIdx] = useState(0);
  const [observationSelected, setObservationSelected] = useState<number | null>(null);
  const [observationSubmitted, setObservationSubmitted] = useState(false);

  // Drag and Drop & Interactive Challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Lab 1: Interactive Classifier states
  const [selectedInflow, setSelectedInflow] = useState<string>('entrance_fee');
  const [classifiedTarget, setClassifiedTarget] = useState<'capital_fund' | 'specific_fund' | 'ie_account'>('capital_fund');

  // Lab 2: Capital Fund Sliders
  const [openingCapital, setOpeningCapital] = useState<number>(500000);
  const [entranceFeesCollected, setEntranceFeesCollected] = useState<number>(50000);
  const [lifeMembershipCollected, setLifeMembershipCollected] = useState<number>(100000);
  const [operatingSurplus, setOperatingSurplus] = useState<number>(75000);

  // Lab 3: CAS Simulator states
  const [voucherType, setVoucherType] = useState<'sales' | 'purchase' | 'asset'>('sales');
  const [voucherAmount, setVoucherAmount] = useState<number>(20000);
  const [gstRate] = useState<number>(18);
  const [voucherPosted, setVoucherPosted] = useState<boolean>(false);

  // Lab 4: Cost-Benefit Sliders
  const [monthlyTransactions, setMonthlyTransactions] = useState<number>(150);
  const [selectedSoftware, setSelectedSoftware] = useState<'none' | 'tally' | 'sap'>('tally');

  // Lab 5: AIS Pipeline states
  const [activeAisStage, setActiveAisStage] = useState<number>(0);

  // Sandbox states
  const [sandboxTab, setSandboxTab] = useState<'npo' | 'cas' | 'ais'>('npo');
  const [sandboxCustomReceipt, setSandboxCustomReceipt] = useState<number>(100000);
  const [sandboxReceiptType, setSandboxReceiptType] = useState<'legacy_general' | 'legacy_specific' | 'general_grant' | 'special_donation'>('legacy_specific');

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Derived values
  const closingCapitalFund = useMemo(() => {
    return openingCapital + entranceFeesCollected + lifeMembershipCollected + operatingSurplus;
  }, [openingCapital, entranceFeesCollected, lifeMembershipCollected, operatingSurplus]);

  const casVoucherCalculation = useMemo(() => {
    const cgst = (voucherAmount * (gstRate / 2)) / 100;
    const sgst = (voucherAmount * (gstRate / 2)) / 100;
    const total = voucherAmount + cgst + sgst;
    return { taxable: voucherAmount, cgst, sgst, total };
  }, [voucherAmount, gstRate]);

  const costBenefitSummary = useMemo(() => {
    const manualHours = (monthlyTransactions * 2.5) / 60;
    const manualLaborCostAnnual = manualHours * 12 * 300;
    let casFirstYearCost = 0;
    let name = 'Manual Registers';

    if (selectedSoftware === 'tally') {
      casFirstYearCost = 22500 + 4500 + 40000 + 8000;
      name = 'Tally Prime Silver';
    } else if (selectedSoftware === 'sap') {
      casFirstYearCost = 500000 + 150000 + 200000;
      name = 'SAP S/4HANA Enterprise';
    }

    const isViable = monthlyTransactions > 200 || (selectedSoftware === 'sap' && monthlyTransactions > 5000);
    return { manualHours, manualLaborCostAnnual, casFirstYearCost, name, isViable };
  }, [monthlyTransactions, selectedSoftware]);

  // Chart data
  const capitalFundChartData = useMemo(() => [
    { name: 'Opening Capital', amount: openingCapital, fill: '#6366f1' },
    { name: 'Entrance Fees', amount: entranceFeesCollected, fill: '#3b82f6' },
    { name: 'Life Membership', amount: lifeMembershipCollected, fill: '#10b981' },
    { name: 'Operating Surplus', amount: operatingSurplus, fill: '#f59e0b' }
  ], [openingCapital, entranceFeesCollected, lifeMembershipCollected, operatingSurplus]);

  // Adaptive Challenges filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeData = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Motivational message logic
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // Initial mastery check
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT adaptive update
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Canvas Flow Animation
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

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(20, canvas.height / 2);
      ctx.lineTo(canvas.width - 20, canvas.height / 2);
      ctx.stroke();

      const numPackets = 5;
      for (let i = 0; i < numPackets; i++) {
        const offset = (frame * 1.5 + i * (canvas.width / numPackets)) % (canvas.width - 40);
        const x = 20 + offset;
        const y = canvas.height / 2;

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#10b981' : '#6366f1';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText('Source Doc', 15, canvas.height / 2 - 12);
      ctx.fillText('CAS Voucher', canvas.width * 0.3, canvas.height / 2 - 12);
      ctx.fillText('Ledgers & TB', canvas.width * 0.6, canvas.height / 2 - 12);
      ctx.fillText('Reports / Feedback', canvas.width - 95, canvas.height / 2 - 12);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentSlide]);

  // Inactivity Hint Timer
  useEffect(() => {
    if (phase === 'challenge' && !answerRevealed && hintCount === 0 && !showExplanation) {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        const firstHint = currentChallengeData.hints[0];
        if (firstHint) {
          setCurrentHint(firstHint);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak(firstHint);
        }
      }, 12000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [phase, currentChallenge, answerRevealed, hintCount, showExplanation, currentChallengeData]);

  // Speech on Phase changes
  useEffect(() => {
    if (phase === 'discovery') {
      speechManager.speak('Welcome to the NPO Capitalisation and Computerised Accounting Systems simulation. Let us begin with a discovery challenge.');
    } else if (phase === 'explore') {
      speechManager.speak(`Exploring ${EXPLORATION_STEPS[currentSlide].title}. Interact with the visualization to discover the concepts.`);
    } else if (phase === 'sandbox') {
      speechManager.speak('Welcome to the Free Sandbox. Experiment freely with NPO fund rules and CAS transaction engines.');
    } else if (phase === 'challenge') {
      speechManager.speak(`Challenge time. Level: ${difficulty}. Demonstrate your mastery.`);
    }
  }, [phase, currentSlide, difficulty]);

  // Callbacks
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeData.hints[nextLevel - 1]) {
      const h = currentChallengeData.hints[nextLevel - 1];
      setCurrentHint(h);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(h);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, currentChallengeData]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on! Legacy is capitalised to a specific fund, and general donations go to I&E.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    setCurrentSlide(0);
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    setHintCount(0);
    setAnswerRevealed(false);
    setShowExplanation(false);
    audioManager.play('whoosh');
  }, []);

  const handleInflowSelect = useCallback((itemKey: string) => {
    setSelectedInflow(itemKey);
    audioManager.play('tap');
    if (['entrance_fee', 'admission_fee', 'life_membership', 'general_legacy'].includes(itemKey)) {
      setClassifiedTarget('capital_fund');
      speechManager.speak('Capitalised to the General Capital Fund on the Balance Sheet.');
    } else if (['specific_legacy', 'special_grant', 'special_donation'].includes(itemKey)) {
      setClassifiedTarget('specific_fund');
      speechManager.speak('Capitalised to a Dedicated Specific Fund on the Balance Sheet liabilities side.');
    } else {
      setClassifiedTarget('ie_account');
      speechManager.speak('Credited as Revenue Income to the Income and Expenditure Account.');
    }
  }, []);

  const handlePostVoucher = useCallback((e?: React.MouseEvent) => {
    if (e) {
      setSparklePos({ x: e.clientX, y: e.clientY });
      setShowSparkle(true);
    }
    setVoucherPosted(true);
    audioManager.play('balance');
    speechManager.speak(`Voucher posted successfully. Simultaneous debits and credits updated across all ledgers.`);
    setTimeout(() => setVoucherPosted(false), 2500);
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = currentChallengeData.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, currentChallengeData]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const items = prev.length > 0 ? [...prev] : (currentChallengeData.sortItems?.map((_, i) => i) || []);
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return items;
    });
  }, [currentChallengeData]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the comprehensive NPO Capitalisation and CAS/AIS audit simulation.');
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

    if (currentChallengeData.type === 'classify' || currentChallengeData.type === 'distinguish' || currentChallengeData.type === 'match') {
      isCorrect = answer === currentChallengeData.correctIndex;
    } else if (currentChallengeData.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeData.correctMapping);
    } else if (currentChallengeData.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeData.correctOrder);
    } else if (currentChallengeData.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (currentChallengeData.correctAnswer || 0)) <= (currentChallengeData.tolerance || 0);
    } else if (currentChallengeData.type === 'construct') {
      isCorrect = answer === currentChallengeData.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Accurate accounting analysis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(currentChallengeData.nodeId, currentChallengeData.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${currentChallengeData.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${currentChallengeData.nodeId}`, JSON.stringify({
          nodeId: currentChallengeData.nodeId,
          masteryLevel: getMasteryLevel(bktStateRef.current.pKnown),
          lastUpdated: Date.now()
        }));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentChallengeData.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentChallengeData.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentChallengeData.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us study the complete accounting breakdown together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(currentChallengeData.nodeId, currentChallengeData.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${currentChallengeData.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [currentChallengeData, hintCount, showNextHint, hitMisconceptions]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── TOP HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700 rounded-2xl" aria-hidden="true">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-900/60 text-emerald-300 border border-emerald-700 rounded-full">ISC Class 11 Commerce</span>
              <span className="text-xs text-slate-400">Nodes: 071 • 072 • 073 • 074</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800" role="tablist" aria-label="Simulation Phase Navigation">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              role="tab"
              aria-selected={phase === p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                phase === p ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-indigo-950/40 rounded-2xl border border-emerald-800/60">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-bold uppercase">Auditor Scenario</span>
              <h2 className="text-xl font-bold text-emerald-300">{SCENARIO.title}</h2>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-800">{SCENARIO.context}</p>
          </div>

          {/* SVG 1: NPO Fund Routing Architecture Diagram */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">NPO Receipt Routing Architecture</span>
            <svg viewBox="0 0 700 160" className="w-full max-w-2xl h-auto" aria-label="NPO Receipt Classification Flowchart Diagram">
              <rect x="20" y="55" width="140" height="50" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="90" y="78" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">NPO Inflows</text>
              <text x="90" y="94" fill="#94a3b8" fontSize="10" textAnchor="middle">(Entrance, Fees, Grants)</text>

              <line x1="160" y1="80" x2="250" y2="40" stroke="#64748b" strokeWidth="2" strokeDasharray="4" />
              <line x1="160" y1="80" x2="250" y2="120" stroke="#64748b" strokeWidth="2" strokeDasharray="4" />

              {/* Top Branch: Capital / Specific */}
              <rect x="250" y="15" width="180" height="48" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
              <text x="340" y="34" fill="#e0e7ff" fontSize="11" fontWeight="bold" textAnchor="middle">Non-Recurring / Earmarked</text>
              <text x="340" y="50" fill="#a5b4fc" fontSize="9" textAnchor="middle">Entrance, Life M., Legacies</text>

              {/* Bottom Branch: Revenue */}
              <rect x="250" y="98" width="180" height="48" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
              <text x="340" y="118" fill="#d1fae5" fontSize="11" fontWeight="bold" textAnchor="middle">Recurring / General</text>
              <text x="340" y="133" fill="#6ee7b7" fontSize="9" textAnchor="middle">Subscriptions, General Donations</text>

              <line x1="430" y1="40" x2="500" y2="40" stroke="#818cf8" strokeWidth="2" />
              <line x1="430" y1="120" x2="500" y2="120" stroke="#34d399" strokeWidth="2" />

              {/* Final Balance Sheet / I&E */}
              <rect x="500" y="15" width="175" height="48" rx="8" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="2" />
              <text x="587" y="35" fill="#c4b5fd" fontSize="11" fontWeight="bold" textAnchor="middle">Balance Sheet</text>
              <text x="587" y="50" fill="#ddd6fe" fontSize="9" textAnchor="middle">Capital / Specific Funds (Liab)</text>

              <rect x="500" y="98" width="175" height="48" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="2" />
              <text x="587" y="118" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">Income & Expenditure</text>
              <text x="587" y="133" fill="#6ee7b7" fontSize="9" textAnchor="middle">Credit Side (Revenue Income)</text>
            </svg>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">Curiosity Discovery Hook</h3>
            </div>
            <p className="text-white font-medium text-base mb-4 leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left text-sm rounded-xl border transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/60 border-emerald-500 text-emerald-100 font-semibold'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 text-xs flex items-center justify-center font-bold shrink-0">{String.fromCharCode(65 + i)}</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm">
                  <p className={discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {discoveryCorrect ? '✓ Correct! Excellent Intuition!' : '✗ Common Misconception Detected!'}
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  aria-label="Enter Interactive Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shrink-0"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ���── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Slide Header */}
          <div className="flex flex-wrap items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              <h2 className="text-lg font-extrabold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                aria-label="Previous lab step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('whoosh');
                }}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 bg-slate-800 disabled:opacity-40 text-xs font-bold text-slate-300 rounded-lg"
              >
                ← Prev
              </motion.button>
              <motion.button
                aria-label="Next lab step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('whoosh');
                  } else {
                    handleAdvanceToSandbox();
                  }
                }}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white rounded-lg shadow-md"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Enter Sandbox →'}
              </motion.button>
            </div>
          </div>

          <p className="text-amber-300 bg-amber-950/40 border border-amber-800/60 p-3 rounded-xl text-xs font-medium">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            {/* LAB 1: NPO Fund Routing Matrix */}
            {currentSlide === 0 && (
              <motion.div
                key="lab1"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Select Inflow Item</h3>
                  {[
                    { key: 'entrance_fee', name: 'Entrance / Admission Fees', amount: '₹25,000', type: 'Capital' },
                    { key: 'life_membership', name: 'Life Membership Fees', amount: '₹15,000', type: 'Capital' },
                    { key: 'specific_legacy', name: 'Legacy for Blood Bank', amount: '₹10,00,000', type: 'Specific' },
                    { key: 'special_grant', name: 'Sports Ministry Grant', amount: '₹2,00,000', type: 'Specific' },
                    { key: 'general_donation', name: 'Unrestricted General Donation', amount: '₹80,000', type: 'Revenue' },
                    { key: 'annual_sub', name: 'Annual Member Subscriptions', amount: '₹3,00,000', type: 'Revenue' }
                  ].map(item => (
                    <motion.button
                      key={item.key}
                      aria-label={`Select ${item.name}`}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleInflowSelect(item.key)}
                      className={`w-full p-3 rounded-xl text-left border flex items-center justify-between transition-all ${
                        selectedInflow === item.key
                          ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-lg'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-xs">{item.name}</div>
                        <div className="text-[10px] text-slate-400">{item.amount}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.type === 'Capital' ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-700' :
                        item.type === 'Specific' ? 'bg-purple-900/60 text-purple-300 border border-purple-700' :
                        'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                      }`}>
                        {item.type}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Live Routing SVG & Output */}
                <div className="lg:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Dynamically Routed Financial Statement</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {/* Balance Sheet Target */}
                      <div className={`p-4 rounded-xl border transition-all ${
                        classifiedTarget === 'capital_fund' || classifiedTarget === 'specific_fund'
                          ? 'bg-indigo-950/70 border-indigo-500 shadow-xl'
                          : 'bg-slate-950/50 border-slate-800 opacity-40'
                      }`}>
                        <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Balance Sheet (Liabilities)</div>
                        <div className="text-sm font-extrabold text-white">
                          {classifiedTarget === 'capital_fund' ? 'General Capital Fund' : classifiedTarget === 'specific_fund' ? 'Dedicated Specific Fund' : 'Capital Section'}
                        </div>
                        <p className="text-[11px] text-slate-300 mt-2">
                          {classifiedTarget === 'capital_fund' && 'One-time permanent receipts added to general accumulated fund.'}
                          {classifiedTarget === 'specific_fund' && 'Earmarked purpose-restricted receipts (e.g. Building / Sports Fund).'}
                          {classifiedTarget === 'ie_account' && 'Not routed to Balance Sheet as direct capital.'}
                        </p>
                      </div>

                      {/* I&E Account Target */}
                      <div className={`p-4 rounded-xl border transition-all ${
                        classifiedTarget === 'ie_account'
                          ? 'bg-emerald-950/70 border-emerald-500 shadow-xl'
                          : 'bg-slate-950/50 border-slate-800 opacity-40'
                      }`}>
                        <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Income & Expenditure A/c</div>
                        <div className="text-sm font-extrabold text-white">Credit Side (Revenue Income)</div>
                        <p className="text-[11px] text-slate-300 mt-2">
                          {classifiedTarget === 'ie_account' ? 'Recurring or unrestricted operational revenue contributing to annual surplus.' : 'Capital items strictly excluded from I&E Account.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Classification Rule Takeaway Card */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-emerald-400">CISCE Rule of Recurrence & Purpose:</span> Receipts that are one-time or earmarked must be capitalised on the Balance Sheet. Amount does not determine classification; recurrence and purpose do!
                  </div>
                </div>
              </motion.div>
            )}

            {/* LAB 2: Capital Fund Balance Dynamic Recharts Graph */}
            {currentSlide === 1 && (
              <motion.div
                key="lab2"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Fund Component Sliders</h3>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Opening Capital Fund</span>
                      <span className="font-mono text-indigo-400 font-bold">₹{openingCapital.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={100000}
                      max={1000000}
                      step={25000}
                      value={openingCapital}
                      onChange={e => setOpeningCapital(Number(e.target.value))}
                      aria-label="Opening Capital Fund Slider"
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Entrance Fees Capitalised</span>
                      <span className="font-mono text-blue-400 font-bold">₹{entranceFeesCollected.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={200000}
                      step={5000}
                      value={entranceFeesCollected}
                      onChange={e => setEntranceFeesCollected(Number(e.target.value))}
                      aria-label="Entrance Fees Capitalised Slider"
                      className="w-full accent-blue-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Life Membership Fees</span>
                      <span className="font-mono text-emerald-400 font-bold">₹{lifeMembershipCollected.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={300000}
                      step={10000}
                      value={lifeMembershipCollected}
                      onChange={e => setLifeMembershipCollected(Number(e.target.value))}
                      aria-label="Life Membership Fees Slider"
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Operating Surplus (from I&E)</span>
                      <span className="font-mono text-amber-400 font-bold">₹{operatingSurplus.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={-50000}
                      max={200000}
                      step={5000}
                      value={operatingSurplus}
                      onChange={e => setOperatingSurplus(Number(e.target.value))}
                      aria-label="Operating Surplus Slider"
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-emerald-800/80 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">Closing Capital Fund:</span>
                    <span className="text-base font-extrabold text-white font-mono">₹{closingCapitalFund.toLocaleString()}</span>
                  </div>
                </div>

                {/* Recharts BarChart */}
                <div className="lg:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Fund Composition Breakdown</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={capitalFundChartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} interval={0} angle={-15} textAnchor="end" />
                        <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={val => `₹${val / 1000}k`} />
                        <Tooltip
                          formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Amount']}
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                        />
                        <Bar dataKey="amount" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-slate-400 text-xs mt-2">
                    Formula: <span className="text-white font-mono font-semibold">Closing Capital Fund = Opening + Entrance + Life Membership + Surplus</span>
                  </p>
                </div>
              </motion.div>
            )}

            {/* LAB 3: CAS Simultaneous Posting Engine */}
            {currentSlide === 2 && (
              <motion.div
                key="lab3"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-4"
              >
                {/* SVG 2: CAS Multi-Ledger Posting Engine */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">CAS Automated Voucher Posting Engine & Audit Trail</span>
                  <svg viewBox="0 0 680 130" className="w-full max-w-2xl h-auto" aria-label="CAS Multi Ledger Posting Architecture Diagram">
                    <rect x="20" y="40" width="130" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <text x="85" y="62" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">1. Input Voucher</text>
                    <text x="85" y="77" fill="#94a3b8" fontSize="9" textAnchor="middle">Tax Invoice / Bill</text>

                    <line x1="150" y1="65" x2="230" y2="65" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3" />

                    <rect x="230" y="30" width="160" height="70" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                    <text x="310" y="52" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">CAS Posting Core</text>
                    <text x="310" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Real-Time Validation</text>
                    <text x="310" y="84" fill="#a7f3d0" fontSize="8" textAnchor="middle">Audit Trail / Edit Log Active</text>

                    <line x1="390" y1="50" x2="470" y2="25" stroke="#10b981" strokeWidth="1.5" />
                    <line x1="390" y1="65" x2="470" y2="65" stroke="#10b981" strokeWidth="1.5" />
                    <line x1="390" y1="80" x2="470" y2="105" stroke="#10b981" strokeWidth="1.5" />

                    <rect x="470" y="10" width="190" height="30" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="565" y="30" fill="#c7d2fe" fontSize="10" textAnchor="middle">Dr Bank / Debtor Ledgers</text>

                    <rect x="470" y="50" width="190" height="30" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="565" y="70" fill="#c7d2fe" fontSize="10" textAnchor="middle">Cr Sales / Revenue Ledger</text>

                    <rect x="470" y="90" width="190" height="30" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="565" y="110" fill="#c7d2fe" fontSize="10" textAnchor="middle">Cr CGST & SGST Ledgers</text>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase">Voucher Type</h4>
                    {(['sales', 'purchase', 'asset'] as const).map(vt => (
                      <motion.button
                        key={vt}
                        aria-label={`Select ${vt} voucher`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setVoucherType(vt)}
                        className={`w-full p-2.5 rounded-lg text-xs font-bold uppercase transition-all ${
                          voucherType === vt ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {vt === 'sales' ? 'Sales Voucher (F8)' : vt === 'purchase' ? 'Purchase Voucher (F9)' : 'Asset Purchase (F7)'}
                      </motion.button>
                    ))}
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase">Transaction Value</h4>
                    <div className="text-xs text-slate-400">Taxable Value: ₹{voucherAmount.toLocaleString()}</div>
                    <input
                      type="range"
                      min={5000}
                      max={100000}
                      step={5000}
                      value={voucherAmount}
                      onChange={e => setVoucherAmount(Number(e.target.value))}
                      aria-label="Voucher Amount Slider"
                      className="w-full accent-emerald-500"
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>GST Rate:</span>
                      <span className="font-bold text-white">{gstRate}%</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-300 uppercase mb-1">Calculated Invoice</h4>
                      <div className="text-xs text-slate-400 space-y-1 font-mono">
                        <div>Taxable: ₹{casVoucherCalculation.taxable.toLocaleString()}</div>
                        <div>CGST (9%): ₹{casVoucherCalculation.cgst.toLocaleString()}</div>
                        <div>SGST (9%): ₹{casVoucherCalculation.sgst.toLocaleString()}</div>
                        <div className="font-bold text-white pt-1 border-t border-slate-700">Total: ₹{casVoucherCalculation.total.toLocaleString()}</div>
                      </div>
                    </div>
                    <motion.button
                      aria-label="Post voucher in CAS"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handlePostVoucher(e)}
                      className="w-full mt-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold uppercase rounded-lg shadow-lg"
                    >
                      Post Voucher in CAS →
                    </motion.button>
                  </div>
                </div>

                {/* Live Simultaneous Ledgers */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Simultaneous Real-Time CAS Ledgers Update</h4>
                    {voucherPosted && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald-400 font-bold">
                        ✓ 4 Ledgers Auto-Balanced Instantly
                      </motion.span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-slate-400 font-bold mb-1">Debtors / Bank Ledger</div>
                      <div className="text-emerald-400 font-bold">Dr ₹{casVoucherCalculation.total.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-slate-400 font-bold mb-1">Sales / Purchases Ledger</div>
                      <div className="text-blue-400 font-bold">Cr ₹{casVoucherCalculation.taxable.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-slate-400 font-bold mb-1">Output CGST Ledger</div>
                      <div className="text-amber-400 font-bold">Cr ₹{casVoucherCalculation.cgst.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-slate-400 font-bold mb-1">Output SGST Ledger</div>
                      <div className="text-amber-400 font-bold">Cr ₹{casVoucherCalculation.sgst.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* LAB 4: Cost-Benefit & Limitation Gauge */}
            {currentSlide === 3 && (
              <motion.div
                key="lab4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6"
              >
                <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Enterprise Scale Parameters</h3>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Monthly Transactions:</span>
                      <span className="font-mono text-emerald-400 font-bold">{monthlyTransactions} tx/mo</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={1000}
                      step={20}
                      value={monthlyTransactions}
                      onChange={e => setMonthlyTransactions(Number(e.target.value))}
                      aria-label="Monthly Transactions Slider"
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-2 font-bold uppercase">Software Tier Under Evaluation:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['none', 'tally', 'sap'] as const).map(st => (
                        <motion.button
                          key={st}
                          aria-label={`Select software tier ${st}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedSoftware(st)}
                          className={`p-2 rounded-lg text-xs font-bold uppercase transition-all ${
                            selectedSoftware === st ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {st === 'none' ? 'Manual' : st === 'tally' ? 'Tally Prime' : 'SAP ERP'}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs font-mono">
                    <div className="text-slate-400">Est. Manual Labor Cost: ₹{costBenefitSummary.manualLaborCostAnnual.toLocaleString()}/yr</div>
                    <div className="text-slate-400">CAS Initial Investment: ₹{costBenefitSummary.casFirstYearCost.toLocaleString()}</div>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">Cost-Benefit & Feasibility Verdict</h3>
                    <div className={`p-4 rounded-xl border ${
                      costBenefitSummary.isViable
                        ? 'bg-emerald-950/70 border-emerald-500'
                        : 'bg-amber-950/70 border-amber-600'
                    }`}>
                      <div className="text-xs font-bold uppercase tracking-wider mb-1">
                        {costBenefitSummary.isViable ? '✓ Economically & Operationally Justified' : '⚠️ Economically Inadvisable for Micro Scale'}
                      </div>
                      <p className="text-xs text-slate-200">
                        {monthlyTransactions < 50
                          ? `For a small kirana store with only ${monthlyTransactions} transactions/month, manual registers remain rational. The ₹75,000 CAS investment exceeds the value of saving 2 hours/month.`
                          : `With ${monthlyTransactions} transactions/month, CAS eliminates manual arithmetic errors, automates GST filing, and maintains a mandatory audit trail.`}
                      </p>
                    </div>
                  </div>

                  {/* Limitation Spotlight */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 mt-4">
                    <span className="font-bold text-rose-400">Critical Limitation Reminder:</span> CAS ensures arithmetic accuracy, but does NOT prevent human fraud (e.g. Satyam 2009) or correct conceptual accounting errors without knowledgeable accountants!
                  </div>
                </div>
              </motion.div>
            )}

            {/* LAB 5: Closed-Loop AIS Architecture (PPDSH) */}
            {currentSlide === 4 && (
              <motion.div
                key="lab5"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-4"
              >
                {/* SVG 3: AIS Closed Loop Architecture (PPDSH) */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">AIS 5-Element Closed-Loop Architecture (PPDSH)</span>
                  <svg viewBox="0 0 700 130" className="w-full max-w-2xl h-auto" aria-label="AIS Closed Loop Architecture Flowchart">
                    {/* Stage 1: Data */}
                    <rect x="15" y="25" width="100" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="65" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">1. DATA</text>
                    <text x="65" y="60" fill="#94a3b8" fontSize="8" textAnchor="middle">Source Doc</text>

                    {/* Arrow */}
                    <line x1="115" y1="50" x2="145" y2="50" stroke="#64748b" strokeWidth="2" />

                    {/* Stage 2: People */}
                    <rect x="145" y="25" width="105" height="50" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="197" y="45" fill="#818cf8" fontSize="10" fontWeight="bold" textAnchor="middle">2. PEOPLE</text>
                    <text x="197" y="60" fill="#94a3b8" fontSize="8" textAnchor="middle">Voucher Input</text>

                    {/* Arrow */}
                    <line x1="250" y1="50" x2="280" y2="50" stroke="#64748b" strokeWidth="2" />

                    {/* Stage 3: Software & Hardware */}
                    <rect x="280" y="20" width="130" height="60" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                    <text x="345" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. SOFTWARE</text>
                    <text x="345" y="55" fill="#94a3b8" fontSize="8" textAnchor="middle">& HARDWARE</text>
                    <text x="345" y="68" fill="#6ee7b7" fontSize="8" textAnchor="middle">Auto Processing</text>

                    {/* Arrow */}
                    <line x1="410" y1="50" x2="440" y2="50" stroke="#64748b" strokeWidth="2" />

                    {/* Stage 4: Output */}
                    <rect x="440" y="25" width="110" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="495" y="45" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">4. OUTPUT</text>
                    <text x="495" y="60" fill="#94a3b8" fontSize="8" textAnchor="middle">P&L, TB, GST</text>

                    {/* Arrow to Feedback */}
                    <line x1="550" y1="50" x2="575" y2="50" stroke="#64748b" strokeWidth="2" />

                    {/* Stage 5: Procedures / Feedback */}
                    <rect x="575" y="25" width="110" height="50" rx="8" fill="#312e81" stroke="#c084fc" strokeWidth="1.5" />
                    <text x="630" y="45" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">5. PROCEDURES</text>
                    <text x="630" y="60" fill="#ddd6fe" fontSize="8" textAnchor="middle">Feedback Loop</text>

                    {/* Feedback loop line back to beginning */}
                    <path d="M 630 75 L 630 110 L 65 110 L 65 75" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4" />
                    <text x="350" y="105" fill="#c084fc" fontSize="9" textAnchor="middle">Closed-Loop Managerial Feedback</text>
                  </svg>
                </div>

                {/* 2D Canvas Flow Track */}
                <canvas ref={canvasRef} width={800} height={50} className="w-full rounded-xl border border-slate-800 shadow-inner" />

                {/* Interactive 5 Stages */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {[
                    { id: 0, name: '1. Source Doc', elem: 'Data / Physical', desc: 'Goods Receipt Note (GRN 456)' },
                    { id: 1, name: '2. Input Voucher', elem: 'People + Hardware', desc: 'Accountant enters voucher' },
                    { id: 2, name: '3. Processing', elem: 'Software (CAS)', desc: 'Automated journal & ledgers' },
                    { id: 3, name: '4. Output Reports', elem: 'Financial Reports', desc: 'P&L, Balance Sheet, GSTN' },
                    { id: 4, name: '5. Feedback Loop', elem: 'Procedures + Mgmt', desc: 'Policy change & budget edit' }
                  ].map(st => (
                    <motion.button
                      key={st.id}
                      aria-label={`AIS stage: ${st.name}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setActiveAisStage(st.id);
                        audioManager.play('tap');
                      }}
                      className={`p-3 text-left rounded-xl border transition-all ${
                        activeAisStage === st.id
                          ? 'bg-emerald-950 border-emerald-500 shadow-lg text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="text-[10px] font-bold uppercase text-emerald-400">{st.elem}</div>
                      <div className="text-xs font-extrabold mt-0.5">{st.name}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{st.desc}</div>
                    </motion.button>
                  ))}
                </div>

                {/* Stage Detail Card */}
                <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-white">AIS vs CAS Essential Distinction:</span> CAS is merely the Software application doing calculations. AIS is the complete closed-loop system encompassing People, Procedures, Data, Software, and Hardware (PPDSH).
                  </div>
                  <motion.button
                    aria-label="Trigger closed loop feedback"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      audioManager.play('sparkle');
                      speechManager.speak('Executive feedback applied to future operational procedures!');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shrink-0"
                  >
                    Trigger Closed-Loop Feedback ⟳
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── BRILLIANT-STYLE INTERACTIVE PREDICTION & OBSERVATION PANELS ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            {/* PREDICTION PANEL */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-indigo-900/60 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                    Predict & Verify ({activePredictionIdx + 1}/{PREDICTION_QUESTIONS.length})
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActivePredictionIdx(idx => (idx + 1) % PREDICTION_QUESTIONS.length);
                    setPredictionSelected(null);
                    setPredictionSubmitted(false);
                  }}
                  className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 underline"
                >
                  Next Prediction →
                </button>
              </div>

              <p className="text-xs text-slate-200 font-medium leading-snug">
                {PREDICTION_QUESTIONS[activePredictionIdx].question}
              </p>

              <div className="space-y-2">
                {PREDICTION_QUESTIONS[activePredictionIdx].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setPredictionSelected(i)}
                    disabled={predictionSubmitted}
                    className={`w-full text-left p-2.5 rounded-xl text-xs border transition-all ${
                      predictionSelected === i
                        ? 'bg-indigo-950/80 border-indigo-500 text-white font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-indigo-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              {!predictionSubmitted ? (
                <button
                  onClick={() => {
                    if (predictionSelected !== null) {
                      setPredictionSubmitted(true);
                      audioManager.play(predictionSelected === PREDICTION_QUESTIONS[activePredictionIdx].correctIndex ? 'success' : 'pop');
                    }
                  }}
                  disabled={predictionSelected === null}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow"
                >
                  Confirm Prediction
                </button>
              ) : (
                <div className="p-3 bg-slate-950 rounded-xl border border-indigo-800/60 text-xs space-y-1.5">
                  <div className={predictionSelected === PREDICTION_QUESTIONS[activePredictionIdx].correctIndex ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {predictionSelected === PREDICTION_QUESTIONS[activePredictionIdx].correctIndex ? '✓ Correct Prediction!' : '⚠️ Analysis Check:'}
                  </div>
                  <p className="text-slate-300 text-[11px]">{PREDICTION_QUESTIONS[activePredictionIdx].explanation}</p>
                  <p className="text-indigo-300 text-[11px] font-semibold bg-indigo-950/60 p-2 rounded-lg border border-indigo-900">
                    🔬 <span className="underline">Verify in Lab:</span> {PREDICTION_QUESTIONS[activePredictionIdx].verifyInstruction}
                  </p>
                </div>
              )}
            </div>

            {/* OBSERVATION PANEL */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-emerald-900/60 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    What Do You Notice? ({activeObservationIdx + 1}/{OBSERVATION_QUESTIONS.length})
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveObservationIdx(idx => (idx + 1) % OBSERVATION_QUESTIONS.length);
                    setObservationSelected(null);
                    setObservationSubmitted(false);
                  }}
                  className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 underline"
                >
                  Next Observation →
                </button>
              </div>

              <p className="text-xs text-slate-200 font-medium leading-snug">
                {OBSERVATION_QUESTIONS[activeObservationIdx].question}
              </p>

              <div className="space-y-2">
                {OBSERVATION_QUESTIONS[activeObservationIdx].observableOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setObservationSelected(i)}
                    disabled={observationSubmitted}
                    className={`w-full text-left p-2.5 rounded-xl text-xs border transition-all ${
                      observationSelected === i
                        ? 'bg-emerald-950/80 border-emerald-500 text-white font-semibold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-emerald-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              {!observationSubmitted ? (
                <button
                  onClick={() => {
                    if (observationSelected !== null) {
                      setObservationSubmitted(true);
                      audioManager.play(observationSelected === OBSERVATION_QUESTIONS[activeObservationIdx].correctIndex ? 'success' : 'pop');
                    }
                  }}
                  disabled={observationSelected === null}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow"
                >
                  Submit Observation
                </button>
              ) : (
                <div className="p-3 bg-slate-950 rounded-xl border border-emerald-800/60 text-xs space-y-1">
                  <div className={observationSelected === OBSERVATION_QUESTIONS[activeObservationIdx].correctIndex ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {observationSelected === OBSERVATION_QUESTIONS[activeObservationIdx].correctIndex ? '✓ Accurate Observation!' : '⚠️ Key Takeaway:'}
                  </div>
                  <p className="text-slate-300 text-[11px]">{OBSERVATION_QUESTIONS[activeObservationIdx].explanation}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-emerald-300">Free Practice Sandbox (No Grading Pressure)</h2>
              <p className="text-xs text-slate-400 mt-0.5">Freely explore NPO receipts, CAS voucher engines, and AIS flows before tackling graded challenges.</p>
            </div>
            <div className="flex gap-2">
              {(['npo', 'cas', 'ais'] as const).map(tab => (
                <motion.button
                  key={tab}
                  aria-label={`Sandbox mode: ${tab}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSandboxTab(tab);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg uppercase ${
                    sandboxTab === tab ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab === 'npo' ? 'NPO Simulator' : tab === 'cas' ? 'CAS Engine' : 'AIS Pipeline'}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Sandbox NPO Mode */}
          {sandboxTab === 'npo' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Test Custom Inflow Routing</h3>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Receipt Category:</label>
                  <select
                    value={sandboxReceiptType}
                    onChange={e => setSandboxReceiptType(e.target.value as 'legacy_general' | 'legacy_specific' | 'general_grant' | 'special_donation')}
                    aria-label="Select Receipt Category"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  >
                    <option value="legacy_general">Unrestricted General Legacy</option>
                    <option value="legacy_specific">Specific Legacy (e.g. Cancer Ward)</option>
                    <option value="general_grant">CSR General Grant</option>
                    <option value="special_donation">Special Donation (Prize Fund)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Amount (₹):</span>
                    <span className="font-mono font-bold text-emerald-400">₹{sandboxCustomReceipt.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={2000000}
                    step={25000}
                    value={sandboxCustomReceipt}
                    onChange={e => setSandboxCustomReceipt(Number(e.target.value))}
                    aria-label="Sandbox Custom Receipt Amount Slider"
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center">
                <div className="text-xs font-bold text-slate-400 uppercase mb-1">Simulated Accounting Destination:</div>
                <div className="text-base font-extrabold text-white mb-2">
                  {sandboxReceiptType === 'legacy_general' && 'Balance Sheet: General Capital Fund'}
                  {sandboxReceiptType === 'legacy_specific' && 'Balance Sheet: Dedicated Specific Cancer Ward Fund'}
                  {sandboxReceiptType === 'general_grant' && 'Income & Expenditure A/c: Credit Side (Revenue)'}
                  {sandboxReceiptType === 'special_donation' && 'Balance Sheet: Dedicated Prize Fund Liability'}
                </div>
                <p className="text-xs text-slate-400">
                  {sandboxReceiptType.includes('general_grant')
                    ? 'Increases current year operating surplus in I&E Account.'
                    : 'Bypasses I&E Account and directly strengthens long-term balance sheet liabilities.'}
                </p>
              </div>
            </div>
          )}

          {/* Sandbox CAS Mode */}
          {sandboxTab === 'cas' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">CAS Real-Time Trial Balance Simulator</h3>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2 text-slate-400 font-bold">
                  <span>Ledger Head</span>
                  <span>Debit (₹)</span>
                  <span>Credit (₹)</span>
                </div>
                <div className="flex justify-between py-1.5 text-emerald-400">
                  <span>Sundry Debtors / Bank</span>
                  <span>₹23,600</span>
                  <span>-</span>
                </div>
                <div className="flex justify-between py-1.5 text-blue-400">
                  <span>Sales Revenue A/c</span>
                  <span>-</span>
                  <span>₹20,000</span>
                </div>
                <div className="flex justify-between py-1.5 text-amber-400">
                  <span>Output CGST @ 9%</span>
                  <span>-</span>
                  <span>₹1,800</span>
                </div>
                <div className="flex justify-between py-1.5 text-amber-400">
                  <span>Output SGST @ 9%</span>
                  <span>-</span>
                  <span>₹1,800</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-700 text-white font-extrabold">
                  <span>Total Trial Balance (Auto-Balanced)</span>
                  <span>₹23,600</span>
                  <span>₹23,600</span>
                </div>
              </div>
            </div>
          )}

          {/* Sandbox AIS Mode */}
          {sandboxTab === 'ais' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">AIS 5-Element Matrix (PPDSH)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="font-bold text-indigo-400">People</div>
                  <div className="text-slate-400 text-[11px] mt-1">Accountants, Auditors, Approvers, Management</div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="font-bold text-emerald-400">Procedures</div>
                  <div className="text-slate-400 text-[11px] mt-1">Internal controls, approval rules, backup policies</div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="font-bold text-blue-400">Data</div>
                  <div className="text-slate-400 text-[11px] mt-1">Invoices, GSTINs, masters, voucher entries</div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="font-bold text-amber-400">Software</div>
                  <div className="text-slate-400 text-[11px] mt-1">Tally Prime, SAP S/4HANA, Zoho Books</div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="font-bold text-rose-400">Hardware</div>
                  <div className="text-slate-400 text-[11px] mt-1">Servers, desktops, barcode scanners, POS</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <motion.button
              aria-label="Start graded challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-xl"
            >
              Start Graded Challenges →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: PROGRESSIVE CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Top Bar */}
          <div className="flex flex-wrap items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono uppercase">
                  {currentChallengeData.competencyLevel}
                </span>
              </div>
              <div className="text-sm font-extrabold text-white mt-0.5">
                Node: <span className="font-mono text-emerald-400">{currentChallengeData.nodeId}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-bold px-3 py-1 rounded-full uppercase border ${
                  difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-300 border-emerald-700' :
                  difficulty === 'advanced' ? 'bg-rose-950 text-rose-300 border-rose-700' :
                  'bg-blue-950 text-blue-300 border-blue-700'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <div className="text-xs text-slate-400 font-mono">
                Errors: <span className="text-rose-400 font-bold">{errors}</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={currentChallengeData.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/70 border-rose-500 shadow-rose-900/50' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-white text-base font-medium mb-6 leading-relaxed">
              {currentChallengeData.question}
            </p>

            {/* MCQ Options */}
            {(currentChallengeData.type === 'classify' || currentChallengeData.type === 'distinguish' || currentChallengeData.type === 'match') && currentChallengeData.options && (
              <div className="space-y-3">
                {currentChallengeData.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                      showExplanation && i === currentChallengeData.correctIndex
                        ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100 font-semibold'
                        : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold shrink-0">
                        {showExplanation && i === currentChallengeData.correctIndex ? '✓' : String.fromCharCode(65 + i)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Component */}
            {currentChallengeData.type === 'drag-label' && currentChallengeData.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {currentChallengeData.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { targetId: 't_hard', title: '1. Physical Computing Machinery (PCs, Servers, Scanners)' },
                    { targetId: 't_soft', title: '2. Program for Processing Accounting Data (Tally, SAP)' },
                    { targetId: 't_pers', title: '3. Human Accountants, Operators & Auditors' },
                    { targetId: 't_proc', title: '4. Documented Rules & Approval Controls' }
                  ].map(target => (
                    <div
                      key={target.targetId}
                      role="region"
                      aria-label={`Drop target for ${target.title}`}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.targetId)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 flex flex-col justify-between min-h-[90px]"
                    >
                      <span className="text-xs text-slate-400">{target.title}</span>
                      <div className="mt-2 text-sm font-bold text-emerald-400">
                        {droppedLabels[target.targetId] ? `✓ ${droppedLabels[target.targetId]}` : 'Drop matching label here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify All Drag Placements"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase rounded-xl shadow-lg"
                >
                  Verify All Drag Placements
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Component */}
            {currentChallengeData.type === 'drag-sort' && currentChallengeData.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length > 0
                  ? sortArrangement.map(idx => currentChallengeData.sortItems![idx])
                  : currentChallengeData.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Reorderable item: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 cursor-grab flex items-center justify-between"
                  >
                    <span>{item}</span>
                    <span className="text-slate-500 text-[10px]">↕ Drag to reorder</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Submit reordered sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const answer = sortArrangement.length > 0 ? sortArrangement : currentChallengeData.sortItems?.map((_, i) => i) || [];
                    handleAnswer(answer);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase rounded-xl shadow-lg"
                >
                  Submit Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Input */}
            {currentChallengeData.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter rupee amount"
                    aria-label="Enter numeric rupee answer"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500 w-64"
                  />
                  <span className="text-slate-400 font-bold">{currentChallengeData.unit}</span>
                </div>
                <motion.button
                  aria-label="Verify numeric calculation"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase rounded-xl shadow-lg"
                >
                  Verify Calculation
                </motion.button>
              </div>
            )}

            {/* Construct Component */}
            {currentChallengeData.type === 'construct' && currentChallengeData.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{currentChallengeData.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {currentChallengeData.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 border border-indigo-700 text-xs rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((p, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-700 rounded-md text-xs flex items-center gap-1.5">
                      {p}
                      <button aria-label={`Remove part: ${p}`} onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))} className="text-rose-400 font-bold">×</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-600 text-xs">Click parts above to assemble structure</span>}
                </div>

                <motion.button
                  aria-label="Verify Constructed Statement"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs uppercase rounded-xl shadow-lg"
                >
                  Verify Constructed Statement
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Step-by-Step Accounting Explanation</div>
                {currentChallengeData.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-amber-200 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400">{idx + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < currentChallengeData.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label="Reveal next explanation step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-3 py-1.5 bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold rounded-lg"
                  >
                    Reveal Next Step →
                  </motion.button>
                )}

                {revealedSteps >= currentChallengeData.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label="Advance to next challenge"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="block mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase rounded-xl shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Audit Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 rounded-3xl border border-emerald-800 text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Systems & NPO Audit Completed!</h2>
            <div className="text-4xl font-black text-emerald-400 font-mono">
              {Math.max(0, 100 - errors * 5)}%
            </div>
            <p className="text-xs text-slate-300">
              Evaluated Mastery Level: <span className="font-bold text-emerald-300 uppercase">{masteryLevel}</span>
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{errors === 0 ? '🏆' : errors <= 3 ? '🌟' : errors <= 7 ? '👍' : '💪'}</span>
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">{motivationalMessage}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {errors === 0
                ? 'Flawless knowledge of NPO capitalisation regulations, CAS multi-ledger automated posting, and enterprise AIS architecture!'
                : errors <= 3
                ? 'Strong conceptual grasp of NPO fund accounting and CAS features. Review the audit trail nuances below for absolute perfection.'
                : errors <= 7
                ? 'Good effort! You understand the foundational principles. Spend extra time reviewing specific vs general funds.'
                : 'Do not give up — You WILL get this! Review the misconception diagnostics below and try the simulation again.'}
            </p>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Your Personalized Misconception Profile</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <div className="text-rose-400 font-bold mb-1">✗ Misconception: {m.misconception}</div>
                    <div className="text-emerald-400">✓ CISCE Standard: {m.correction}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-5 bg-amber-950/40 rounded-2xl border border-amber-800 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Spaced Review Schedule (SM-2)</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Next adaptive review session scheduled in <span className="font-bold text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
              </p>
            </div>
            <span className="text-2xl" aria-hidden="true">📅</span>
          </div>

          {/* Real World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-300 text-[10px] flex items-center justify-center font-bold shrink-0">{idx + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ──��� FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_AccountancyCapitalisationEntranceAdmissionSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// Node IDs as string literals
const NODE_C11_ACC_031 = 'c11_acc_031';
const NODE_C11_ACC_032 = 'c11_acc_032';
const NODE_C11_ACC_033 = 'c11_acc_033';
const NODE_C11_ACC_034 = 'c11_acc_034';
const NODE_C11_ACC_035 = 'c11_acc_035';
const NODE_C11_ACC_036 = 'c11_acc_036';
const NODE_C11_ACC_037 = 'c11_acc_037';
const NODE_C11_ACC_038 = 'c11_acc_038';
const NODE_C11_ACC_039 = 'c11_acc_039';
const NODE_C11_ACC_040 = 'c11_acc_040';

const ALL_NODE_IDS = [
  NODE_C11_ACC_031,
  NODE_C11_ACC_032,
  NODE_C11_ACC_033,
  NODE_C11_ACC_034,
  NODE_C11_ACC_035,
  NODE_C11_ACC_036,
  NODE_C11_ACC_037,
  NODE_C11_ACC_038,
  NODE_C11_ACC_039,
  NODE_C11_ACC_040,
];

// Narrative Scenario
const SCENARIO = {
  title: 'Audit & Financial Strategy: Deccan Auto Components',
  intro: 'You are the chief financial controller for Deccan Auto Components (Hyderabad & Pune). As the financial year closes on 31st March, your cash records disagree with ICICI Bank statements, heavy machining assets require accurate statutory depreciation under Schedule II and the Income Tax Act, and export trade bills need negotiable instrument legal compliance.',
  context: 'Manage bank reconciliations, compute dual depreciation schedules, record asset disposals, and structure valid negotiable instruments for domestic and export clients.',
};

// Curiosity Hook / Discovery Question
const DISCOVERY_QUESTION = {
  question: 'On 31st March, your Cash Book shows ₹4,10,000, while your Bank Pass Book shows ₹4,51,000. You notice ₹40,000 cash deposited on March 20th appears in BOTH books. Should this ₹40,000 be included in the BRS?',
  options: [
    'Yes — because all cash deposits must be added to reconcile.',
    'No — because it appears in both books identically with zero discrepancy (common entry).',
    'Yes — but as a deduction to balance the difference.',
    'No — because cash deposits are recorded only at year-end audit.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Common entries already reflect in both balances. Reconciling items are ONLY the unmatched differences!',
};

// Challenge Interface
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

// 22 Comprehensive Challenges
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C11_ACC_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When preparing a BRS by comparing extracts of the Cash Book and Pass Book, what is the mandatory first analytical step?',
    options: [
      'Immediately add all receipts and subtract all payments from the Pass Book',
      'Tick and exclude all common entries appearing in both books with identical amounts',
      'Transfer all bank charges into an Asset Disposal Account',
      'Re-issue all unpresented cheques immediately'
    ],
    correctIndex: 1,
    explanation: 'Common entries are already reflected in both balances and cannot cause a discrepancy. Only unticked, unmatched items form the reconciling items.',
    hints: [
      'Think about transactions that are already recorded in both records identically.',
      'If both you and the bank recorded ₹50,000, does that cause a difference?',
      'Tick common entries first and isolate only the single-sided unmatched entries.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C11_ACC_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Classify whether these extract discrepancies are "Cash-Book-Only" (Timing) or "Pass-Book-Only" (Bank-Initiated) items.',
    dragItems: [
      { label: 'Cheque issued not yet presented', targetId: 'zone_cb' },
      { label: 'Cheque deposited not yet collected', targetId: 'zone_cb' },
      { label: 'Direct dividend credited by bank', targetId: 'zone_pb' },
      { label: 'Standing instruction insurance debited', targetId: 'zone_pb' },
    ],
    correctMapping: {
      zone_cb: 'Cheque issued not yet presented',
      zone_pb: 'Direct dividend credited by bank',
    },
    explanation: 'Cheques issued/deposited are recorded first by the firm (Cash-Book-Only timing differences). Dividends and standing instructions are recorded first by the bank (Pass-Book-Only).',
    hints: [
      'Who wrote the cheque? The firm did, so it is in the cash book first.',
      'Who processed bank charges or direct collections? The bank did.',
      'Bank-initiated items sit in the Pass Book until the firm receives its bank statement.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C11_ACC_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Under the Amended Cash Book method, which items MUST be entered in the Amended Cash Book rather than the residual BRS?',
    options: [
      'Cheques issued to suppliers but not yet presented to the bank',
      'Cheques deposited into bank but not yet collected and credited by the bank',
      'Bank charges, direct customer deposits, and bank interest credited',
      'Errors made by the bank clerk on the bank ledger'
    ],
    correctIndex: 2,
    explanation: 'Bank charges, interest, and direct deposits are bank-initiated omissions by the firm that must be posted into the Cash Book to find the true corrected balance. Timing differences remain in the residual BRS.',
    hints: [
      'Ask: Did the firm omit to record this transaction in its own books?',
      'If the firm failed to record bank charges, the Cash Book is incomplete.',
      'Only timing differences (unpresented/uncollected cheques) stay in the residual BRS.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C11_ACC_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Cash Book shows ₹6,50,000. ICICI Bank debited ₹3,500 bank charges, credited ₹12,000 FD interest, and paid ₹25,000 insurance standing instruction. What is the Amended Cash Book balance in rupees?',
    correctAnswer: 633500,
    tolerance: 0,
    unit: '₹',
    explanation: 'Amended Balance = Original (₹6,50,000) + Interest Credited (₹12,000) − Bank Charges (₹3,500) − Insurance Paid (₹25,000) = ₹6,33,500.',
    hints: [
      'Start with ₹6,50,000.',
      'Add receipt: + ₹12,000 (FD interest). Total = ₹6,62,000.',
      'Subtract payments: − ₹3,500 (charges) − ₹25,000 (insurance) = ₹6,33,500.'
    ],
  },
  {
    id: 'ch_05',
    nodeId: NODE_C11_ACC_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'From an Amended Cash Book balance of ₹6,33,500, cheques issued but unpresented equal ₹1,50,000, and cheques deposited uncollected equal ₹90,000. Compute the final Pass Book balance in rupees.',
    correctAnswer: 693500,
    tolerance: 0,
    unit: '₹',
    explanation: 'Pass Book Balance = Amended Cash Book (₹6,33,500) + Unpresented Cheques (₹1,50,000) − Uncollected Cheques (₹90,000) = ₹6,93,500.',
    hints: [
      'Start from Amended Cash Book balance ₹6,33,500.',
      'Unpresented cheques make the bank balance higher than cash book: add ₹1,50,000.',
      'Uncollected cheques mean bank has not received funds yet: subtract ₹90,000.'
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C11_ACC_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to AS-10 and Indian accounting standards, what is the precise definition of Depreciation?',
    options: [
      'The current drop in second-hand resale market value of an asset',
      'Systematic allocation of the depreciable cost of a tangible fixed asset over its useful life',
      'An optional appropriation of profit made only in high-earning years',
      'The fund reserved exclusively to purchase stocks and securities'
    ],
    correctIndex: 1,
    explanation: 'Depreciation is cost allocation, not market valuation. It is a mandatory charge against profits to spread asset cost over economic useful life.',
    hints: [
      'Is depreciation about fluctuating market values or systematic cost spreading?',
      'Remember keyword: systematic allocation over useful life.',
      'It is a non-cash charge against revenue, not a valuation process.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_07',
    nodeId: NODE_C11_ACC_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is freehold factory land NOT depreciated in corporate accounts under Schedule II of the Companies Act 2013?',
    options: [
      'Land is an intangible asset governed by amortisation rules',
      'Land has an indefinite useful life and does not suffer physical wear and tear or efflux of time',
      'Land is classified as current inventory in all manufacturing firms',
      'The Income Tax Act forbids tracking land in corporate ledgers'
    ],
    correctIndex: 1,
    explanation: 'Depreciation requires a finite useful life. Freehold land does not wear out or decay over time, having an unlimited economic life (unlike land improvements like fencing/drainage).',
    hints: [
      'Does natural earth have an expiry date or finite operational life?',
      'Depreciation allocates cost across a finite lifespan.',
      'Land has an unlimited life, so its annual depreciable charge is nil.'
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C11_ACC_034,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Tata Steel buys a machine for ₹10,00,000 on 1st April 2020. Useful life is 9 years with an estimated salvage scrap value of ₹1,00,000. Under Straight Line Method (SLM), what is the annual depreciation in rupees?',
    correctAnswer: 100000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Annual Depreciation (SLM) = (Cost − Salvage) / Useful Life = (₹10,00,000 − ₹1,00,000) / 9 = ₹9,00,000 / 9 = ₹1,00,000.',
    hints: [
      'Calculate depreciable cost: Original Cost minus Salvage Scrap value.',
      'Depreciable cost = ₹10,00,000 − ₹1,00,000 = ₹9,00,000.',
      'Divide ₹9,00,000 by 9 years.'
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C11_ACC_034,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Using the same Tata Steel machine (Cost ₹10,00,000, Salvage ₹1,00,000, SLM ₹1,00,000/yr), calculate the Book Value at the end of Year 3.',
    correctAnswer: 700000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Book Value at end of Year 3 = Cost − (3 × Annual Depreciation) = ₹10,00,000 − (3 × ₹1,00,000) = ₹7,00,000. (Salvage is not subtracted again!).',
    hints: [
      'Book Value formula = Original Cost minus Accumulated Depreciation.',
      'Do not subtract the salvage value twice!',
      'Cost (₹10,00,000) − 3 years × ₹1,00,000 = ₹7,00,000.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C11_ACC_035,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Wipro purchases servers for ₹1,00,000 and applies 40% Written Down Value (WDV) depreciation. What is the depreciation charge for Year 2 in rupees?',
    correctAnswer: 24000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Year 1: ₹1,00,000 × 40% = ₹40,000 (Opening WDV Year 2 = ₹60,000). Year 2 Depreciation = ₹60,000 × 40% = ₹24,000.',
    hints: [
      'WDV applies the fixed percentage to the OPENING book value of that year, not original cost.',
      'End of Year 1 book value = ₹1,00,000 − ₹40,000 = ₹60,000.',
      'Year 2 Depreciation = 40% of ₹60,000 = ₹24,000.'
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C11_ACC_035,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does the Book Value of an asset under pure WDV NEVER reach exactly zero in finite time?',
    options: [
      'Because Indian tax law forces an automatic rounding up of ₹1,000',
      'Because multiplying any positive opening balance by (1 ��� r) repeatedly creates an asymptotic geometric curve that approaches zero but never touches it',
      'Because salvage value is legally banned from WDV calculations',
      'Because accumulated depreciation is reset to zero every three years'
    ],
    correctIndex: 1,
    explanation: 'Mathematically, WDV follows BV = Cost × (1 − r)^n. Since (1 − r) > 0, the remaining balance decays exponentially towards zero without ever reaching nil.',
    hints: [
      'Think of taking away 40% of what is left in a container every year.',
      'Will the container ever be 100.0% empty mathematically?',
      'It is an exponential/geometric decay curve.'
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C11_ACC_036,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the primary economic rationale for why WDV provides a more equitable total charge to the P&L over an asset\'s life?',
    options: [
      'WDV eliminates all repairs and maintenance expenditures by contract',
      'Falling annual depreciation charges under WDV offset rising repair and maintenance costs as the asset ages, keeping total annual burden roughly uniform',
      'WDV allows companies to evade corporate tax surcharges under Section 115BAA',
      'WDV guarantees higher gross profit margins in early operational quarters'
    ],
    correctIndex: 1,
    explanation: 'In early years, repairs are low and depreciation is high. In later years, repairs climb while depreciation drops. The combined charge (Depreciation + Repairs) remains stable under WDV.',
    hints: [
      'Consider what happens to machine repair bills as the machine gets older.',
      'Under WDV, depreciation drops over time.',
      'Combine rising repairs with falling depreciation: the sum stays relatively flat.'
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C11_ACC_036,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 32 of the Income Tax Act 1961, which depreciation method is MANDATORY for tax computations on blocks of assets in India?',
    options: [
      'Straight Line Method (SLM)',
      'Written Down Value Method (WDV)',
      'Annuity Method',
      'Depletion Unit Method'
    ],
    correctIndex: 1,
    explanation: 'Section 32 of the Income Tax Act 1961 mandates WDV on blocks of assets for tax assessments. SLM is permitted only in financial accounting under Schedule II.',
    hints: [
      'Which method applies a percentage to the reducing tax block value?',
      'Income tax law requires WDV for plant, machinery, and computers.',
      'SLM is acceptable for corporate books, but not for tax depreciation.'
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C11_ACC_037,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the annual journal entry for charging ₹50,000 depreciation directly to the Machinery Account.',
    availableParts: ['Depreciation A/c Dr.', 'To Machinery A/c', 'Profit & Loss A/c Dr.', 'To Accumulated Dep. A/c', '₹50,000'],
    targetState: 'Depreciation A/c Dr. ₹50,000 To Machinery A/c ₹50,000',
    validationHint: 'Debit Depreciation A/c and Credit the Asset Account directly.',
    explanation: 'Under the direct-charge method, Depreciation Account is debited (nominal expense) and the Asset Account (Machinery A/c) is credited directly to reduce its book balance.',
    hints: [
      'Depreciation is an expense, so Depreciation A/c must be debited.',
      'In direct charging, we do NOT open a Provision/Accumulated Depreciation A/c.',
      'The asset account itself is credited.'
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C11_ACC_038,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the Provision for Depreciation method, what balance is maintained in the Asset Account in the ledger over multiple accounting years?',
    options: [
      'The diminishing written-down value after deducting each year\'s depreciation',
      'Original historical cost at acquisition, remaining untouched by annual depreciation',
      'Market liquidation value updated every 6 months',
      'Zero balance, because all amounts are parked in the P&L appropriation ledger'
    ],
    correctIndex: 1,
    explanation: 'Under the provision method, the Asset Account permanently retains its original historical cost. Depreciation accumulates in a separate contra-asset Provision/Accumulated Depreciation Account.',
    hints: [
      'Where does the annual depreciation get credited in this method?',
      'It gets credited to Provision for Depreciation Account.',
      'Therefore, the Asset Account itself stays at original cost.'
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C11_ACC_038,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Hindustan Unilever bought a machine on 1st April 2020 for ₹8,00,000. Depreciated at 10% SLM under the Provision method. Sold on 30th September 2023 (after 3.5 years of use) for ₹5,00,000. Calculate Profit or Loss on Sale in rupees (Enter positive for profit, negative for loss).',
    correctAnswer: -20000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Annual SLM Dep = ₹80,000. Depreciation for 3.5 years = ₹80,000 × 3.5 = ₹2,80,000. Book Value on sale date = ₹8,00,000 − ₹2,80,000 = ₹5,20,000. Sale proceeds = ₹5,00,000. Loss on sale = ₹5,00,000 − ₹5,20,000 = −₹20,000 (Loss of ₹20,000).',
    hints: [
      'Depreciation per full year = 10% of ₹8,00,000 = ₹80,000.',
      'Time elapsed: 3 full years + 6 months (April to Sept) = 3.5 years. Total Dep = 3.5 × 80,000 = ₹2,80,000.',
      'Book Value = ₹8,00,000 − ₹2,80,000 = ₹5,20,000. Proceeds = ₹5,00,000. Result = Loss of ₹20,000.'
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C11_ACC_038,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of accounting steps to record the sale of an asset using an Asset Disposal Account.',
    sortItems: [
      'Charge depreciation for the current fractional period up to the date of disposal',
      'Transfer original cost of the asset from Asset A/c to the debit of Asset Disposal A/c',
      'Transfer total accumulated depreciation from Provision A/c to the credit of Asset Disposal A/c',
      'Record bank proceeds on the credit side of Asset Disposal A/c',
      'Transfer the balancing figure (Profit or Loss on sale) from Asset Disposal A/c to Profit & Loss A/c'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Correct flow: (1) Prorated current depreciation, (2) Cost transfer to Disposal Dr, (3) Accumulated Dep transfer to Disposal Cr, (4) Bank proceeds to Disposal Cr, (5) Net gain/loss to P&L.',
    hints: [
      'First update depreciation to the exact day/month of sale.',
      'Next move the gross cost and total accumulated depreciation into the Disposal account.',
      'Finally record cash received and balance the profit or loss into P&L.'
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C11_ACC_039,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the fundamental legal distinction between a Bill of Exchange (Section 5) and a Promissory Note (Section 4) under the NI Act 1881?',
    options: [
      'A Bill of Exchange is an unconditional order to pay drawn by a creditor; a Promissory Note is an unconditional promise to pay made by a debtor',
      'A Bill of Exchange has only 2 parties, while a Promissory Note has 3 parties',
      'A Promissory Note requires acceptance by the bank, while a Bill does not',
      'Promissory notes never require revenue stamps under the Indian Stamp Act'
    ],
    correctIndex: 0,
    explanation: 'A bill of exchange contains an unconditional ORDER to pay (drawn by creditor/seller on debtor). A promissory note contains an unconditional PROMISE to pay (written by debtor in favour of creditor).',
    hints: [
      'Who writes a promissory note? The person who promises to pay.',
      'Who draws a bill? The seller ordering the buyer to pay.',
      'Bill = Order (3 parties); Note = Promise (2 parties).'
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C11_ACC_039,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'Under Section 138 of the Negotiable Instruments Act 1881, what is the statutory legal consequence if a cheque is dishonoured for insufficiency of funds?',
    options: [
      'It is treated strictly as an irrecoverable bad debt with no court remedy',
      'It is a criminal offence punishable with imprisonment up to 2 years and/or a fine up to twice the cheque amount',
      'The bank manager must personally pay the cheque amount to the payee',
      'The drawer is only required to pay an administrative penalty of ₹50'
    ],
    correctIndex: 1,
    explanation: 'Section 138 makes cheque bouncing due to insufficient funds a criminal offence punishable by up to 2 years imprisonment, a fine up to twice the cheque amount, or both.',
    hints: [
      'Cheque dishonour under Section 138 is not just a civil default.',
      'It carries criminal liability in Indian courts.',
      'Up to 2 years imprisonment and double the cheque value in fines.'
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C11_ACC_040,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Tirupur garment exporter draws a 90-day trade bill for ₹3,00,000 on a Delhi buyer. The exporter immediately discounts the bill with ICICI Bank at 8% p.a. (assume 365 days/year). How much cash in rupees does the exporter receive? (Round to nearest rupee)',
    correctAnswer: 294082,
    tolerance: 5,
    unit: '₹',
    explanation: 'Discount = ₹3,00,000 × 8% × (90 / 365) = ₹3,00,000 × 0.08 × 0.246575 = ₹5,917.80 ≈ ₹5,918. Net cash received = ₹3,00,000 − ₹5,918 = ₹2,94,082.',
    hints: [
      'Discount = Face Value × (Rate / 100) × (Days / 365).',
      'Discount = ₹3,00,000 × 0.08 × (90/365) ≈ ₹5,918.',
      'Cash Received = ₹3,00,000 − ₹5,918 = ₹2,94,082.'
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C11_ACC_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When an exporter discounts a bill with their bank, what critical contingent liability remains with the drawer if the drawee dishonours the bill on maturity?',
    options: [
      'None — the bank assumes 100% of the bad debt loss with zero recourse',
      'The bank exercises its right of recourse and immediately debits the full bill amount plus noting charges from the drawer\'s bank account',
      'The government EXIM fund automatically reimburses the bank',
      'The drawer receives a bonus credit for initiating trade finance'
    ],
    correctIndex: 1,
    explanation: 'Discounting does not extinguish credit risk. The bank retains the "right of recourse" against the drawer. If the drawee dishonours, the bank recovers the full sum from the drawer.',
    hints: [
      'Does discounting transfer full credit default risk to the bank?',
      'No, discounting is an advance against security with right of recourse.',
      'The bank will debit the drawer if the acceptor defaults.'
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C11_ACC_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'ITC Ltd operates luxury hotel buildings (30-yr life, steady maintenance) and enterprise cloud servers (4-yr life, high obsolescence). Which combination of depreciation methods best satisfies AS-10 and Schedule II?',
    options: [
      'Hotel Buildings: WDV; Cloud Servers: SLM',
      'Hotel Buildings: SLM; Cloud Servers: WDV',
      'Both assets must strictly use SLM due to the Consistency convention',
      'Both assets must strictly use WDV due to the Income Tax Act'
    ],
    correctIndex: 1,
    explanation: 'AS-10 permits different methods for different asset classes based on consumption patterns. Buildings experience steady wear (SLM is ideal); IT servers experience rapid obsolescence and steep repair inflation (WDV is ideal).',
    hints: [
      'Match the consumption pattern of each asset class.',
      'Buildings wear out evenly over decades (equal charge = SLM).',
      'Computers become obsolete very quickly (front-loaded charge = WDV).'
    ],
  },
];

// Props Interface
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

// Default Props
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_ACC_031,
  title: 'Advanced Bank Reconciliation, Depreciation Models & Negotiable Instruments',
  definition: 'An integrated accounting framework covering dual-extract BRS comparison, amended cash book corrections, Schedule II SLM/WDV depreciation mechanics, asset disposal ledgering, and Negotiable Instruments Act 1881 compliance.',
  eli5: 'Learn how businesses balance their bank passbooks against cash records, spread the wear-and-tear cost of heavy machinery over decades, and safely issue commercial bills and cheques for trade credit.',
  misconceptions: [
    { misconception: 'Every entry in the Cash Book and Pass Book must appear in the BRS.', correction: 'Only entries appearing in ONE book and absent from the other (unmatched items) are reconciling items. Common entries are excluded.' },
    { misconception: 'Timing differences like unpresented cheques should be recorded in the Amended Cash Book.', correction: 'The Amended Cash Book only corrects omissions and errors made by the firm. Unpresented cheques were already recorded correctly and belong in the residual BRS.' },
    { misconception: 'Depreciation represents the decline in second-hand resale market value.', correction: 'Depreciation is the systematic allocation of depreciable cost over useful economic life, not a market valuation exercise.' },
    { misconception: 'Under Straight Line Method, salvage value must be subtracted every year when computing closing book value.', correction: 'Salvage value is deducted only once in the annual depreciation formula. Closing book value is simply Cost minus Accumulated Depreciation.' },
    { misconception: 'In a Promissory Note, the payee is the maker.', correction: 'The maker is always the debtor who makes the promise to pay. The payee is the creditor who receives payment.' },
  ],
  diagnosticQuestions: [
    { question: 'What is a common entry in dual-extract BRS?', options: ['An entry appearing only in cash book', 'An entry appearing in both cash book and pass book with identical amounts', 'A fraudulent transaction', 'An unpresented cheque'], correctIndex: 1 },
    { question: 'Which book is amended before preparing the residual BRS?', options: ['Pass Book', 'Cash Book (bank column)', 'Sales Day Book', 'Journal Proper'], correctIndex: 1 },
    { question: 'What is the depreciable cost of an asset costing ₹5,00,000 with ₹50,000 salvage?', options: ['₹5,00,000', '₹4,50,000', '₹5,50,000', '₹2,50,000'], correctIndex: 1 },
    { question: 'Which method results in declining rupee depreciation each year?', options: ['Straight Line Method', 'Written Down Value Method', 'Fixed Instalment Method', 'Original Cost Method'], correctIndex: 1 },
    { question: 'Which account is credited for annual depreciation under the Provision method?', options: ['Asset Account', 'Accumulated Depreciation / Provision for Dep A/c', 'Profit & Loss A/c', 'Bank A/c'], correctIndex: 1 },
    { question: 'How many parties are there in a standard Bill of Exchange?', options: ['1', '2', '3', '4'], correctIndex: 2 },
    { question: 'Is a cheque required to bear an adhesive stamp under the Indian Stamp Act?', options: ['Yes, always', 'No, bank printed cheque forms require no stamp', 'Only if above ₹1,00,000', 'Only for international payments'], correctIndex: 1 },
    { question: 'Which section of the NI Act 1881 covers criminal liability for cheque dishonour?', options: ['Section 4', 'Section 5', 'Section 6', 'Section 138'], correctIndex: 3 },
  ],
  masteryCriteria: 'Demonstrate complete proficiency in extract-based BRS matching, amended cash book adjustments, dual-track SLM vs WDV depreciation modeling, asset disposal journals, and negotiable instruments law.',
};

// Exploration Steps (Brilliant.org style)
const EXPLORATION_STEPS = [
  {
    title: 'Dual Extract Matching Lab',
    instruction: 'Click on matching transactions in both the Cash Book and Pass Book to isolate reconciling items.',
    interactionType: 'click-match',
    nodeId: NODE_C11_ACC_031,
  },
  {
    title: 'Amended Cash Book Filter',
    instruction: 'Filter transactions into "Amend Cash Book" vs "Residual BRS (Timing)" to generate the audited balance.',
    interactionType: 'classify-filter',
    nodeId: NODE_C11_ACC_032,
  },
  {
    title: 'SLM vs WDV Depreciation Simulator',
    instruction: 'Adjust asset cost, lifespan, and salvage value sliders to observe real-time curves and mathematical decay.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_ACC_034,
  },
  {
    title: 'Asset Disposal Ledger Engine',
    instruction: 'Drag the asset cost, accumulated depreciation, and bank proceeds into the Asset Disposal Account.',
    interactionType: 'drag-ledger',
    nodeId: NODE_C11_ACC_038,
  },
  {
    title: 'Negotiable Instrument Specimen Architect',
    instruction: 'Construct a legally compliant Indian Bill of Exchange by placing essential legal clauses.',
    interactionType: 'construct-bill',
    nodeId: NODE_C11_ACC_039,
  },
];

// Predict-Then-Check Prompts
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an industrial welding robot costing ₹10,00,000 is depreciated at 20% SLM vs 20% WDV over 5 years, which method will show a HIGHER Book Value at the end of Year 2?',
    options: ['SLM will have higher Book Value', 'WDV will have higher Book Value', 'Both will have identical Book Value', 'Cannot be determined without salvage'],
    correctIndex: 1,
    verifyInstruction: 'Check the live curve below: Year 2 SLM BV = ₹6,00,000; Year 2 WDV BV = ₹6,40,000! WDV charges heavy depreciation early on, but by Year 2 its declining rate leaves a higher residual book value than 20% flat on original cost.',
  },
  {
    question: 'Predict: If an unpresented cheque of ₹1,50,000 is accidentally entered on the credit side of the Amended Cash Book, what will happen to the calculated bank balance?',
    options: ['It will be overstated by ₹1,50,000', 'It will be understated by ₹1,50,000 and double-counted', 'It will automatically self-balance in the trial balance', 'No effect on final figures'],
    correctIndex: 1,
    verifyInstruction: 'Correct! The payment was already recorded when issued. Recording it again in the Amended Cash Book double-deducts ₹1,50,000 from the true cash balance.',
  },
];

// Observation Questions
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the annual rupee depreciation under WDV as the asset ages?',
    observableOptions: [
      'It stays constant every year',
      'It decreases geometrically every single year',
      'It increases exponentially',
      'It drops to zero at the end of Year 3'
    ],
    correctIndex: 1,
  },
  {
    question: 'When combining annual depreciation with annual machine repair costs under WDV, what pattern emerges?',
    observableOptions: [
      'The total expense burden skyrockets exponentially',
      'The total annual charge to P&L remains roughly uniform because falling depreciation cushions rising repairs',
      'Repair costs fall to zero while depreciation rises',
      'The company violates AS-10 compliance'
    ],
    correctIndex: 1,
  },
];

// Real World Activity
const REAL_WORLD_ACTIVITY = {
  title: 'Senior Auditor Challenge: Annual Factory Review',
  description: 'Download the published financial statements of an Indian manufacturing giant (e.g., Tata Motors, Asian Paints, or ITC Ltd). Examine Note on "Property, Plant and Equipment" and the Cash Flow Statement.',
  steps: [
    'Identify whether the company uses SLM, WDV, or both for different asset classes in the Notes to Accounts.',
    'Locate the "Provision for Depreciation / Accumulated Depreciation" contra-asset balance in the Balance Sheet.',
    'Check if the company discloses bank overdraft balances and corresponding BRS reconciliations.',
    'Draft a 1-page memo explaining why buildings use SLM while computerized robotics use WDV.'
  ],
};

function C11_AccountancyFromExtractBothSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['acc'] || { name: 'Accountancy', emoji: '📒', color: 'emerald' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict & Observe State
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Interactive Lab State: Dual Extract Matching
  const [tickedCashBookItems, setTickedCashBookItems] = useState<number[]>([]);
  const [tickedPassBookItems, setTickedPassBookItems] = useState<number[]>([]);

  // Interactive Lab State: Depreciation Simulator
  const [simCost, setSimCost] = useState<number>(1000000);
  const [simLife, setSimLife] = useState<number>(8);
  const [simSalvage, setSimSalvage] = useState<number>(100000);
  const [simWdvRate, setSimWdvRate] = useState<number>(25);

  // Interactive Lab State: Asset Disposal
  const [disposalCostDropped, setDisposalCostDropped] = useState(false);
  const [disposalAccDepDropped, setDisposalAccDepDropped] = useState(false);
  const [disposalProceedsDropped, setDisposalProceedsDropped] = useState(false);

  // Interactive Lab State: Bill of Exchange Builder
  const [billClauses, setBillClauses] = useState<string[]>([]);

  // Challenge Adaptive Engine & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // Escalating Hints & Visual Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Extra Feedback Components State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Inactivity Auto-hint Timer
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dynamic Extract Sample Data for Interactive Lab
  const cashBookEntries = useMemo(() => [
    { id: 1, desc: 'Opening Balance b/d', amount: 300000, type: 'dr' },
    { id: 2, desc: 'Tata Motors (Deposit)', amount: 250000, type: 'dr' },
    { id: 3, desc: 'Cash Sales Deposited', amount: 40000, type: 'dr', matchId: 103 },
    { id: 4, desc: 'Bosch Auto (Payment)', amount: 180000, type: 'cr' },
  ], []);

  const passBookEntries = useMemo(() => [
    { id: 101, desc: 'Opening Balance b/d', amount: 300000, type: 'cr' },
    { id: 102, desc: 'Direct Bank Interest Credited', amount: 6000, type: 'cr' },
    { id: 103, desc: 'Cash Deposit Credited', amount: 40000, type: 'cr', matchId: 3 },
    { id: 104, desc: 'Standing Order: Insurance Paid', amount: 15000, type: 'dr' },
  ], []);

  // Filter Challenges by Adaptive Difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load Initial Mastery on Mount
  useEffect(() => {
    if (nodeId) {
      const existing = getNodeMastery(nodeId);
      if (existing && existing.bestScore > 0) {
        if (existing.bestScore >= 80) setDifficulty('advanced');
        else if (existing.bestScore >= 50) setDifficulty('standard');
        else setDifficulty('foundation');
      }
    }
  }, [nodeId]);

  // Adaptive Difficulty Adjustment
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

  // Real-Time Depreciation Curve Calculation
  const depreciationGraphData = useMemo(() => {
    const data = [];
    const annualSlm = (simCost - simSalvage) / Math.max(1, simLife);
    let currentWdv = simCost;

    for (let yr = 0; yr <= simLife; yr++) {
      if (yr === 0) {
        data.push({
          year: `Yr 0`,
          slmBookValue: Math.round(simCost),
          wdvBookValue: Math.round(simCost),
          slmDep: 0,
          wdvDep: 0,
        });
      } else {
        const slmBv = Math.max(simSalvage, simCost - yr * annualSlm);
        const wdvDepThisYr = currentWdv * (simWdvRate / 100);
        currentWdv = Math.max(0, currentWdv - wdvDepThisYr);

        data.push({
          year: `Yr ${yr}`,
          slmBookValue: Math.round(slmBv),
          wdvBookValue: Math.round(currentWdv),
          slmDep: Math.round(annualSlm),
          wdvDep: Math.round(wdvDepThisYr),
        });
      }
    }
    return data;
  }, [simCost, simLife, simSalvage, simWdvRate]);

  // Handlers
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(isCorrect ? 'Outstanding insight! Common entries do not create balance discrepancies.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the core accounting mechanics hands-on.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test values, curves, and ledgers in the sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for the ISC certification challenges. Good luck!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulator below.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation!' : 'Look at the annual depreciation column on the chart.');
  }, []);

  const handleToggleExtractTick = useCallback((id: number, source: 'cb' | 'pb') => {
    audioManager.play('tap');
    if (source === 'cb') {
      setTickedCashBookItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    } else {
      setTickedPassBookItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    }
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the comprehensive Accountancy simulation!');
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct entry! Excellent work.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ score: 100, date: Date.now() }));
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
        speechManager.speak('Let us review the step-by-step statutory reconciliation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const items = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return items;
    });
  }, [challenge]);

  const handleAddBillClause = useCallback((clause: string) => {
    audioManager.play('tap');
    setBillClauses(prev => prev.includes(clause) ? prev : [...prev, clause]);
  }, []);

  const handleResetDisposalLab = useCallback(() => {
    setDisposalCostDropped(false);
    setDisposalAccDepDropped(false);
    setDisposalProceedsDropped(false);
    audioManager.play('whoosh');
  }, []);

  // HTML5 2D Canvas indicator
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#10b981';
      ctx.font = '12px sans-serif';
      ctx.fillText(`ISC Standard Audit Active`, 10, 18);
      const pulse = 4 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 20, 14, pulse, 0, Math.PI * 2);
      ctx.fillStyle = '#065f46';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(canvas.width - 20, 14, pulse * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399';
      ctx.fill();
      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Clean timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-inner">
            {subjectConfig.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                ISC Class 11
              </span>
              <span className="text-xs font-medium text-slate-400">ICAI AS-10 & NI Act 1881</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'discovery') setPhase('discovery');
                if (p === 'explore') setPhase('explore');
                if (p === 'sandbox') setPhase('sandbox');
                if (p === 'challenge') setPhase('challenge');
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/40 border border-emerald-800/40">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Case Scenario</span>
            <h2 className="text-xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">Audit Objective:</span>
              <span>{SCENARIO.context}</span>
            </div>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold">?</span>
              <h3 className="text-base font-bold text-slate-200">Pre-Audit Curiosity Hook: The ₹40,000 Mystery</h3>
            </div>
            <p className="text-sm md:text-base text-slate-100 font-medium leading-relaxed mb-4">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-950/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-md bg-slate-900 flex items-center justify-center text-xs text-slate-400 font-mono mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm">
                  <span className={discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {discoveryCorrect ? '✓ Exact Accounting Logic!' : '✗ Common Error Alert:'}
                  </span>
                  <p className="text-slate-300 text-xs mt-1">
                    {discoveryCorrect
                      ? 'Reconciling items exist ONLY when an entry is recorded in one book but absent in the other. Common entries are crossed out!'
                      : DISCOVERY_QUESTION.hintAfter}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/40 whitespace-nowrap"
                >
                  Step Inside The Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Lab Step Indicator */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 disabled:opacity-40"
              >
                ← Previous
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('tap');
                  } else {
                    handleAdvanceToSandbox();
                  }
                }}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 text-xs font-bold text-white shadow"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Enter Free Sandbox →'}
              </motion.button>
            </div>
          </div>

          <p className="text-sm text-amber-300/90 bg-amber-950/30 p-3 rounded-xl border border-amber-900/40">
            👉 <strong>Action:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* SLIDE 0: Dual Extract Matching Lab + SVG Diagram 1 */}
          {currentSlide === 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* SVG Diagram 1: Dual Extract Reconciliation Architecture */}
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Topic Vector Diagram 1: Dual Book Synchronization & Cross-Matching Architecture
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">AS-10 & BRS Principles</span>
                </div>
                <div className="w-full flex justify-center py-2 bg-slate-950/80 rounded-xl border border-slate-800/80">
                  <svg
                    viewBox="0 0 740 180"
                    className="w-full max-w-2xl h-auto"
                    role="img"
                    aria-label="BRS Dual Extract Matching Process Diagram"
                  >
                    <defs>
                      <linearGradient id="cbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#065f46" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#022c22" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="pbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#312e81" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="brsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0f766e" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#134e4a" stopOpacity="0.95" />
                      </linearGradient>
                      <filter id="shadowBox">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
                      </filter>
                    </defs>

                    {/* Cash Book Box */}
                    <rect x="20" y="25" width="200" height="130" rx="12" fill="url(#cbGrad)" stroke="#10b981" strokeWidth="2" filter="url(#shadowBox)" />
                    <text x="120" y="52" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">Cash Book (Bank Col)</text>
                    <text x="120" y="72" fill="#cbd5e1" fontSize="10" textAnchor="middle">Maintained by Firm</text>
                    <line x1="35" y1="82" x2="205" y2="82" stroke="#047857" strokeWidth="1" />
                    <text x="40" y="102" fill="#a7f3d0" fontSize="9">Dr: Cheques Deposited</text>
                    <text x="40" y="122" fill="#fca5a5" fontSize="9">Cr: Cheques Issued</text>
                    <text x="40" y="142" fill="#94a3b8" fontSize="9">Starting Point: ₹3,00,000</text>

                    {/* Common Entry Cross-out Arc */}
                    <path d="M 220 55 C 370 10 370 10 520 55" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5,5" />
                    <circle cx="370" cy="32" r="14" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="370" y="36" fill="#fef3c7" fontSize="10" fontWeight="bold" textAnchor="middle">✓</text>
                    <text x="370" y="15" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">Common Entry (₹40,000) Excluded</text>

                    {/* Central Reconciliation Statement Box */}
                    <rect x="270" y="65" width="200" height="100" rx="12" fill="url(#brsGrad)" stroke="#14b8a6" strokeWidth="2" filter="url(#shadowBox)" />
                    <text x="370" y="88" fill="#5eead4" fontSize="12" fontWeight="bold" textAnchor="middle">Bank Reconciliation</text>
                    <text x="370" y="106" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">+ Unpresented Cheques</text>
                    <text x="370" y="122" fill="#fca5a5" fontSize="9.5" textAnchor="middle">− Uncollected Cheques</text>
                    <text x="370" y="140" fill="#fef08a" fontSize="9.5" textAnchor="middle">± Bank Errors / Omissions</text>
                    <text x="370" y="156" fill="#99f6e4" fontSize="8.5" textAnchor="middle">Only Unmatched Items Included</text>

                    {/* Pass Book Box */}
                    <rect x="520" y="25" width="200" height="130" rx="12" fill="url(#pbGrad)" stroke="#6366f1" strokeWidth="2" filter="url(#shadowBox)" />
                    <text x="620" y="52" fill="#a5b4fc" fontSize="13" fontWeight="bold" textAnchor="middle">Bank Pass Book</text>
                    <text x="620" y="72" fill="#cbd5e1" fontSize="10" textAnchor="middle">Maintained by Bank</text>
                    <line x1="535" y1="82" x2="705" y2="82" stroke="#4338ca" strokeWidth="1" />
                    <text x="540" y="102" fill="#a5b4fc" fontSize="9">Cr: Customer Deposits</text>
                    <text x="540" y="122" fill="#fca5a5" fontSize="9">Dr: Withdrawals & Charges</text>
                    <text x="540" y="142" fill="#94a3b8" fontSize="9">Closing Balance Target</text>

                    {/* Connector Arrows */}
                    <path d="M 220 115 L 270 115" stroke="#10b981" strokeWidth="2" />
                    <path d="M 520 115 L 470 115" stroke="#6366f1" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* Interactive Match Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Cash Book Table */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-emerald-300">Cash Book (Bank Column Extract)</h3>
                    <span className="text-xs bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                      Firm's Ledger
                    </span>
                  </div>
                  <div className="space-y-2">
                    {cashBookEntries.map(e => {
                      const isTicked = tickedCashBookItems.includes(e.id);
                      return (
                        <motion.div
                          key={e.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleToggleExtractTick(e.id, 'cb')}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            isTicked
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                              : 'bg-slate-950 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-semibold">{e.desc}</div>
                            <div className="text-[10px] text-slate-500">{e.type === 'dr' ? 'Debit (Receipt)' : 'Credit (Payment)'}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm">₹{e.amount.toLocaleString('en-IN')}</span>
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border ${isTicked ? 'bg-emerald-500 text-black border-emerald-400' : 'border-slate-700 text-slate-600'}`}>
                              {isTicked ? '✓' : ''}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Pass Book Table */}
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-indigo-300">Bank Pass Book Extract</h3>
                    <span className="text-xs bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded border border-indigo-800">
                      HDFC Bank Record
                    </span>
                  </div>
                  <div className="space-y-2">
                    {passBookEntries.map(e => {
                      const isTicked = tickedPassBookItems.includes(e.id);
                      return (
                        <motion.div
                          key={e.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleToggleExtractTick(e.id, 'pb')}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            isTicked
                              ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                              : 'bg-slate-950 border-slate-800 text-slate-300'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-semibold">{e.desc}</div>
                            <div className="text-[10px] text-slate-500">{e.type === 'cr' ? 'Credit (Deposit Received)' : 'Debit (Deduction)'}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm">₹{e.amount.toLocaleString('en-IN')}</span>
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border ${isTicked ? 'bg-indigo-500 text-white border-indigo-400' : 'border-slate-700 text-slate-600'}`}>
                              {isTicked ? '✓' : ''}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Reconciling Output Summary */}
                <div className="col-span-1 md:col-span-2 p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Audit Observation:</h4>
                  <p className="text-xs text-slate-300">
                    When you tick <strong>Cash Sales ₹40,000</strong> in both books, notice it vanishes from the discrepancy list.
                    The true reconciling items are unticked: <em>Tata Motors (₹2,50,000 uncollected)</em>, <em>Bosch (₹1,80,000 unpresented)</em>, <em>Interest (₹6,000)</em>, and <em>Insurance (₹15,000)</em>.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 1: Amended Cash Book Filter */}
          {currentSlide === 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-950/30 rounded-xl border border-emerald-800/40">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                    <h4 className="text-sm font-bold text-emerald-300">1. Amended Cash Book (Ledger Fix)</h4>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">
                    Entries the bank processed which the firm omitted. These change the actual cash ledger permanently:
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-300">
                    <li className="p-1.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                      <span>Bank Charges Debited</span>
                      <span className="text-rose-400 font-mono">Credit side (Payment)</span>
                    </li>
                    <li className="p-1.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                      <span>Direct Interest/Dividends</span>
                      <span className="text-emerald-400 font-mono">Debit side (Receipt)</span>
                    </li>
                    <li className="p-1.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                      <span>Customer Dishonoured Cheque</span>
                      <span className="text-rose-400 font-mono">Credit side (Reversal)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-indigo-950/30 rounded-xl border border-indigo-800/40">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-400"></span>
                    <h4 className="text-sm font-bold text-indigo-300">2. Residual BRS (Timing Differences Only)</h4>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">
                    Entries already correctly journalised by the firm, waiting for bank clearance next month:
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-300">
                    <li className="p-1.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                      <span>Cheques Issued Not Presented</span>
                      <span className="text-emerald-400 font-mono">Add to Amended CB</span>
                    </li>
                    <li className="p-1.5 bg-slate-900 rounded border border-slate-800 flex justify-between">
                      <span>Cheques Deposited Not Collected</span>
                      <span className="text-rose-400 font-mono">Less from Amended CB</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 2: SLM vs WDV Depreciation Interactive Curves + SVG Diagram 2 */}
          {currentSlide === 2 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* Predict-Then-Check Prompts */}
              {!predictionMade && (
                <div className="p-4 bg-slate-900 rounded-2xl border border-amber-500/40 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Predict</span>
                    <span className="text-xs text-slate-400">Before moving sliders, predict:</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-100 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handlePrediction(i)}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left text-xs font-medium text-slate-200 border border-slate-700"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {predictionMade && (
                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-700 text-xs text-emerald-300">
                  {PREDICTION_QUESTIONS[0].verifyInstruction}
                </div>
              )}

              {/* Topic Vector Diagram 2: Dynamic Live Depreciation Comparison SVG */}
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Topic Vector Diagram 2: Live Mathematical Decay Geometry (AS-10 & Schedule II)
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Interactive Vector Engine</span>
                </div>
                <div className="w-full flex justify-center py-2 bg-slate-950/80 rounded-xl border border-slate-800/80">
                  <svg
                    viewBox="0 0 700 180"
                    className="w-full max-w-2xl h-auto"
                    role="img"
                    aria-label="SLM Linear vs WDV Geometric Decay Curve SVG"
                  >
                    <defs>
                      <linearGradient id="gridLine" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#334155" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#1e293b" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>

                    {/* Chart Axes */}
                    <line x1="60" y1="20" x2="60" y2="150" stroke="#64748b" strokeWidth="2" />
                    <line x1="60" y1="150" x2="660" y2="150" stroke="#64748b" strokeWidth="2" />

                    {/* Axis Labels */}
                    <text x="30" y="30" fill="#94a3b8" fontSize="10" fontWeight="bold">₹Cost</text>
                    <text x="25" y="152" fill="#94a3b8" fontSize="9">₹0</text>
                    <text x="60" y="166" fill="#64748b" fontSize="9">Yr 0</text>
                    <text x="360" y="166" fill="#64748b" fontSize="9">Yr {Math.round(simLife / 2)}</text>
                    <text x="640" y="166" fill="#64748b" fontSize="9">Yr {simLife}</text>
                    <text x="360" y="178" fill="#94a3b8" fontSize="10" textAnchor="middle">Asset Useful Lifespan (Time)</text>

                    {/* Salvage Baseline */}
                    {(() => {
                      const salvageY = 150 - (simSalvage / Math.max(1, simCost)) * 120;
                      return (
                        <g>
                          <line x1="60" y1={salvageY} x2="660" y2={salvageY} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
                          <text x="665" y={salvageY + 3} fill="#fbbf24" fontSize="9">Salvage (₹{(simSalvage / 1000).toFixed(0)}k)</text>
                        </g>
                      );
                    })()}

                    {/* SLM Straight Line: starts at (60, 30) goes to (650, salvageY) */}
                    {(() => {
                      const endY = 150 - (simSalvage / Math.max(1, simCost)) * 120;
                      return (
                        <g>
                          <line x1="60" y1="30" x2="650" y2={endY} stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                          <circle cx="60" cy="30" r="4" fill="#10b981" />
                          <circle cx="650" cy={endY} r="4" fill="#10b981" />
                          <text x="360" y="70" fill="#34d399" fontSize="11" fontWeight="bold">SLM: Constant Annual Dep</text>
                        </g>
                      );
                    })()}

                    {/* WDV Geometric Exponential Decay Curve */}
                    {(() => {
                      let pathD = "M 60 30";
                      const steps = 10;
                      let currVal = simCost;
                      const rate = simWdvRate / 100;
                      for (let i = 1; i <= steps; i++) {
                        currVal = currVal * (1 - rate * (simLife / steps));
                        const x = 60 + (i / steps) * 590;
                        const y = 150 - Math.max(0, currVal / simCost) * 120;
                        pathD += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
                      }
                      return (
                        <g>
                          <path d={pathD} fill="none" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
                          <text x="210" y="115" fill="#a5b4fc" fontSize="11" fontWeight="bold">WDV: Geometric Decay BV = C(1-r)ⁿ</text>
                        </g>
                      );
                    })()}
                  </svg>
                </div>
              </div>

              {/* Sliders Grid with direct onChange setState hooks for real-time responsiveness */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Original Cost:</span>
                    <span className="text-white font-mono font-bold">₹{simCost.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={200000}
                    max={5000000}
                    step={100000}
                    value={simCost}
                    onChange={(e) => setSimCost(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                    aria-label="Original asset cost slider"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Useful Life (Years):</span>
                    <span className="text-white font-mono font-bold">{simLife} yrs</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={15}
                    step={1}
                    value={simLife}
                    onChange={(e) => setSimLife(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                    aria-label="Useful life slider"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Salvage Scrap Value:</span>
                    <span className="text-white font-mono font-bold">₹{simSalvage.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={simCost * 0.2}
                    step={10000}
                    value={simSalvage}
                    onChange={(e) => setSimSalvage(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                    aria-label="Salvage value slider"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>WDV Rate (%):</span>
                    <span className="text-white font-mono font-bold">{simWdvRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={40}
                    step={5}
                    value={simWdvRate}
                    onChange={(e) => setSimWdvRate(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                    aria-label="WDV percentage rate slider"
                  />
                </div>
              </div>

              {/* Chart Visualization */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Book Value Trajectory Over Time (₹)</h4>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-400"><span className="w-3 h-0.5 bg-emerald-400 inline-block"></span> SLM (Linear)</span>
                    <span className="flex items-center gap-1.5 text-indigo-400"><span className="w-3 h-0.5 bg-indigo-400 inline-block"></span> WDV (Geometric Decay)</span>
                  </div>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={depreciationGraphData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="year" stroke="#64748b" />
                      <YAxis stroke="#64748b" tickFormatter={v => `₹${(v / 100000).toFixed(1)}L`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem' }}
                        formatter={(value: unknown) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                      />
                      <Line type="linear" dataKey="slmBookValue" name="SLM Book Value" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="wdvBookValue" name="WDV Book Value" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Observation Question */}
              {!observationAnswered && (
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <p className="text-xs font-bold text-indigo-300 uppercase mb-2">Scientific Observation:</p>
                  <p className="text-sm text-slate-200 mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleObservation(i)}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-left text-xs text-slate-300 border border-slate-700"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* SLIDE 3: Asset Disposal T-Account Engine */}
          {currentSlide === 3 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-bold text-white">Interactive Asset Disposal Account (Surat Loom Case)</h4>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleResetDisposalLab}
                    className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700"
                  >
                    Reset T-Account
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setDisposalCostDropped(true);
                      audioManager.play('drop-correct');
                    }}
                    disabled={disposalCostDropped}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      disposalCostDropped
                        ? 'bg-slate-800/40 text-slate-600 border-slate-800'
                        : 'bg-indigo-900/60 text-indigo-200 border-indigo-700 shadow'
                    }`}
                  >
                    + Transfer Original Cost (₹8,00,000)
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setDisposalAccDepDropped(true);
                      audioManager.play('drop-correct');
                    }}
                    disabled={disposalAccDepDropped}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      disposalAccDepDropped
                        ? 'bg-slate-800/40 text-slate-600 border-slate-800'
                        : 'bg-emerald-900/60 text-emerald-200 border-emerald-700 shadow'
                    }`}
                  >
                    + Transfer Acc. Dep (₹2,80,000)
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setDisposalProceedsDropped(true);
                      audioManager.play('drop-correct');
                    }}
                    disabled={disposalProceedsDropped}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      disposalProceedsDropped
                        ? 'bg-slate-800/40 text-slate-600 border-slate-800'
                        : 'bg-amber-900/60 text-amber-200 border-amber-700 shadow'
                    }`}
                  >
                    + Post Sale Proceeds (₹5,00,000)
                  </motion.button>
                </div>

                {/* T-Account Layout */}
                <div className="grid grid-cols-2 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden text-xs">
                  {/* Debit Side */}
                  <div className="p-4 border-r border-slate-800 space-y-2">
                    <div className="font-bold text-slate-400 border-b border-slate-800 pb-1">Dr. (Debits)</div>
                    {disposalCostDropped ? (
                      <div className="flex justify-between font-mono text-emerald-300 bg-slate-900/80 p-2 rounded">
                        <span>To Machinery A/c (Cost)</span>
                        <span>₹8,00,000</span>
                      </div>
                    ) : (
                      <div className="text-slate-600 italic py-2">[Click "+ Transfer Original Cost"]</div>
                    )}
                  </div>

                  {/* Credit Side */}
                  <div className="p-4 space-y-2">
                    <div className="font-bold text-slate-400 border-b border-slate-800 pb-1">Cr. (Credits)</div>
                    {disposalAccDepDropped && (
                      <div className="flex justify-between font-mono text-indigo-300 bg-slate-900/80 p-2 rounded">
                        <span>By Provision for Dep A/c</span>
                        <span>₹2,80,000</span>
                      </div>
                    )}
                    {disposalProceedsDropped && (
                      <div className="flex justify-between font-mono text-amber-300 bg-slate-900/80 p-2 rounded">
                        <span>By Bank A/c (Proceeds)</span>
                        <span>₹5,00,000</span>
                      </div>
                    )}
                    {disposalCostDropped && disposalAccDepDropped && disposalProceedsDropped && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-between font-mono text-rose-300 bg-rose-950/40 p-2 rounded border border-rose-800"
                      >
                        <span>By Profit & Loss A/c (Loss on Sale)</span>
                        <span>₹20,000</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SLIDE 4: Negotiable Instrument Specimen Architect + SVG Diagram 3 */}
          {currentSlide === 4 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {/* SVG Diagram 3: Negotiable Instruments Legal Flow Diagram */}
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Topic Vector Diagram 3: Negotiable Instruments Act 1881 — 3-Party Tripartite Structure
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Sec 4, 5, 6 & 138 NI Act</span>
                </div>
                <div className="w-full flex justify-center py-2 bg-slate-950/80 rounded-xl border border-slate-800/80">
                  <svg
                    viewBox="0 0 740 180"
                    className="w-full max-w-2xl h-auto"
                    role="img"
                    aria-label="Negotiable Instruments Tripartite Legal Flow Diagram"
                  >
                    <defs>
                      <linearGradient id="drawerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#047857" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#064e3b" stopOpacity="0.95" />
                      </linearGradient>
                      <linearGradient id="draweeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4338ca" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#312e81" stopOpacity="0.95" />
                      </linearGradient>
                      <linearGradient id="payeeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#b45309" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#78350f" stopOpacity="0.95" />
                      </linearGradient>
                    </defs>

                    {/* Drawer Box */}
                    <rect x="25" y="40" width="180" height="100" rx="12" fill="url(#drawerGrad)" stroke="#10b981" strokeWidth="2" />
                    <text x="115" y="68" fill="#a7f3d0" fontSize="13" fontWeight="bold" textAnchor="middle">1. DRAWER</text>
                    <text x="115" y="86" fill="#e2e8f0" fontSize="10" textAnchor="middle">Creditor / Seller</text>
                    <text x="115" y="104" fill="#cbd5e1" fontSize="9" textAnchor="middle">Draws Unconditional Order</text>
                    <text x="115" y="122" fill="#6ee7b7" fontSize="8.5" textAnchor="middle">Retains Recourse Liability</text>

                    {/* Order Arrow */}
                    <path d="M 205 70 L 310 70" stroke="#10b981" strokeWidth="2.5" />
                    <polygon points="315,70 305,65 305,75" fill="#10b981" />
                    <text x="260" y="62" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">Draws Bill</text>

                    {/* Acceptance Arrow */}
                    <path d="M 315 100 L 210 100" stroke="#818cf8" strokeWidth="2.5" strokeDasharray="4,4" />
                    <polygon points="205,100 215,95 215,105" fill="#818cf8" />
                    <text x="260" y="116" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">"Accepted" Return</text>

                    {/* Drawee / Acceptor Box */}
                    <rect x="320" y="40" width="180" height="100" rx="12" fill="url(#draweeGrad)" stroke="#6366f1" strokeWidth="2" />
                    <text x="410" y="68" fill="#c7d2fe" fontSize="13" fontWeight="bold" textAnchor="middle">2. DRAWEE / ACCEPTOR</text>
                    <text x="410" y="86" fill="#e2e8f0" fontSize="10" textAnchor="middle">Debtor / Buyer</text>
                    <text x="410" y="104" fill="#cbd5e1" fontSize="9" textAnchor="middle">Signs "Accepted" on Face</text>
                    <text x="410" y="122" fill="#fca5a5" fontSize="8.5" textAnchor="middle">Sec 138 Criminal Default Risk</text>

                    {/* Maturity Payment Arrow to Payee / Bank */}
                    <path d="M 500 90 L 585 90" stroke="#f59e0b" strokeWidth="2.5" />
                    <polygon points="590,90 580,85 580,95" fill="#f59e0b" />
                    <text x="545" y="82" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">Payment at</text>
                    <text x="545" y="102" fill="#fbbf24" fontSize="8.5" textAnchor="middle">Maturity (+3 days grace)</text>

                    {/* Payee / Discounting Bank Box */}
                    <rect x="595" y="40" width="130" height="100" rx="12" fill="url(#payeeGrad)" stroke="#f59e0b" strokeWidth="2" />
                    <text x="660" y="68" fill="#fef3c7" fontSize="13" fontWeight="bold" textAnchor="middle">3. PAYEE / BANK</text>
                    <text x="660" y="86" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">Holder in Due Course</text>
                    <text x="660" y="104" fill="#fed7aa" fontSize="9" textAnchor="middle">Discounts Bill at 8%</text>
                    <text x="660" y="122" fill="#fde68a" fontSize="8.5" textAnchor="middle">Receives Settlement</text>
                  </svg>
                </div>
              </div>

              <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2">Build a Legal Bill of Exchange (Section 5, NI Act 1881)</h4>
                <p className="text-xs text-slate-400 mb-4">Click all essential legal clauses to assemble a valid Indian Trade Bill:</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    'Stamp (Indian Stamp Act 1899)',
                    'Exchange for ₹5,00,000',
                    'At 90 days after date pay to HDFC Bank',
                    'Value Received',
                    'Accepted: Reliance Industries Ltd (Drawee)',
                    'Signed: Tata Steel Ltd (Drawer)'
                  ].map(clause => (
                    <motion.button
                      key={clause}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAddBillClause(clause)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                        billClauses.includes(clause)
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      {clause}
                    </motion.button>
                  ))}
                </div>

                {/* Bill Paper Visual Canvas */}
                <div className="p-6 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 font-serif text-slate-200 relative">
                  <div className="absolute top-4 right-4 w-16 h-16 border border-amber-500/60 rounded bg-amber-950/30 flex items-center justify-center text-[10px] text-amber-400 text-center font-sans">
                    {billClauses.includes('Stamp (Indian Stamp Act 1899)') ? 'STAMPED' : 'AFFIX STAMP'}
                  </div>

                  <div className="text-sm font-bold mb-2">
                    {billClauses.includes('Exchange for ₹5,00,000') ? 'Exchange for ₹5,00,000/-' : '[Amount Line Missing]'}
                  </div>
                  <div className="text-xs text-slate-400 mb-4">Mumbai, 1st April 2024</div>

                  <p className="text-xs leading-relaxed mb-6">
                    {billClauses.includes('At 90 days after date pay to HDFC Bank')
                      ? 'At ninety (90) days after date, pay to the order of HDFC Bank, Mumbai, the sum of Rupees Five Lakhs only'
                      : '[Order to Pay clause required]'}
                    {billClauses.includes('Value Received') ? ', for value received.' : '.'}
                  </p>

                  <div className="flex justify-between items-end pt-4 border-t border-slate-800">
                    <div className="text-xs">
                      <div className="font-bold text-indigo-400">To: Drawee</div>
                      <div>{billClauses.includes('Accepted: Reliance Industries Ltd (Drawee)') ? 'Accepted: Reliance Industries Ltd' : '[Needs Acceptance Signature]'}</div>
                    </div>
                    <div className="text-xs text-right">
                      <div className="font-bold text-emerald-400">Drawer</div>
                      <div>{billClauses.includes('Signed: Tata Steel Ltd (Drawer)') ? 'Tata Steel Ltd' : '[Needs Drawer Signature]'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Audit Sandbox Simulator</span>
              <h2 className="text-lg font-bold text-white mt-1">Multi-Parameter Financial Modeling</h2>
              <p className="text-xs text-slate-400 mt-1">Stress-test depreciation equations and reconciliation adjustments with real-time reactive sliders.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-950"
            >
              Start Challenges →
            </motion.button>
          </div>

          {/* Sandbox Live Workbench */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Asset Configuration</h3>
              <div>
                <label className="text-xs text-slate-400 flex justify-between">Cost: <span className="text-white font-mono">₹{simCost.toLocaleString('en-IN')}</span></label>
                <input
                  type="range"
                  min={100000}
                  max={10000000}
                  step={100000}
                  value={simCost}
                  onChange={(e) => setSimCost(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                  aria-label="Sandbox asset cost"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 flex justify-between">Lifespan: <span className="text-white font-mono">{simLife} yrs</span></label>
                <input
                  type="range"
                  min={2}
                  max={20}
                  step={1}
                  value={simLife}
                  onChange={(e) => setSimLife(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                  aria-label="Sandbox asset life"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 flex justify-between">Scrap Salvage: <span className="text-white font-mono">₹{simSalvage.toLocaleString('en-IN')}</span></label>
                <input
                  type="range"
                  min={0}
                  max={simCost * 0.2}
                  step={10000}
                  value={simSalvage}
                  onChange={(e) => setSimSalvage(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                  aria-label="Sandbox salvage scrap value"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 flex justify-between">WDV Percentage: <span className="text-white font-mono">{simWdvRate}%</span></label>
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={5}
                  value={simWdvRate}
                  onChange={(e) => setSimWdvRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                  aria-label="Sandbox WDV rate"
                />
              </div>
            </div>

            <div className="lg:col-span-2 p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Comparative Annual Depreciation Burden</h3>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={depreciationGraphData.slice(1)} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="year" stroke="#64748b" />
                    <YAxis stroke="#64748b" tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                    <Legend />
                    <Bar dataKey="slmDep" name="SLM Annual Charge" fill="#10b981" />
                    <Bar dataKey="wdvDep" name="WDV Annual Charge" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Top Audit Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <canvas ref={canvasRef} width={220} height={28} className="rounded" />
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950 text-rose-400 border-rose-700'
                    : 'bg-indigo-950 text-indigo-400 border-indigo-700'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="text-xs text-slate-400">
                Competency: <strong className="text-emerald-300 capitalize">{challenge.competencyLevel}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-400">
                Score: <strong className="text-emerald-400">{scoreBreakdown.correct}</strong> / {scoreBreakdown.total}
              </span>
              <span className="text-slate-400">
                Challenge <strong className="text-white">{currentChallenge + 1}</strong> of {filteredChallenges.length}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Card Container with visual feedback */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : { duration: 0.2 }}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/50 border-rose-600'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-semibold text-slate-100 mb-6 leading-relaxed">
              {challenge.question}
            </p>

            {/* Render Question Types */}

            {/* Type 1: MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => {
                  const isSelectedCorrect = showExplanation && i === challenge.correctIndex;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                        isSelectedCorrect
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950/70 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center text-xs font-mono text-slate-400 mt-0.5 border border-slate-800">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Type 2: Drag Label */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      aria-label={`Drag item ${item.label}`}
                      className="px-3 py-1.5 rounded-lg bg-indigo-900/80 border border-indigo-700 text-indigo-200 text-xs font-bold cursor-grab active:cursor-grabbing"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('zone_cb')}
                    className="p-4 rounded-xl bg-slate-950 border-2 border-dashed border-emerald-800/60 min-h-[90px] flex flex-col justify-center items-center text-center"
                  >
                    <span className="text-xs font-bold text-emerald-400 mb-1">Cash-Book-Only (Timing Item)</span>
                    <span className="text-xs text-slate-300 font-medium">
                      {droppedLabels['zone_cb'] || '[Drop Cash-Book-Only Item Here]'}
                    </span>
                  </div>

                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('zone_pb')}
                    className="p-4 rounded-xl bg-slate-950 border-2 border-dashed border-indigo-800/60 min-h-[90px] flex flex-col justify-center items-center text-center"
                  >
                    <span className="text-xs font-bold text-indigo-400 mb-1">Pass-Book-Only (Bank-Initiated Item)</span>
                    <span className="text-xs text-slate-300 font-medium">
                      {droppedLabels['zone_pb'] || '[Drop Pass-Book-Only Item Here]'}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow"
                >
                  Verify Classification Mapping
                </motion.button>
              </div>
            )}

            {/* Type 3: Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 max-w-sm">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter rupee amount"
                    disabled={showExplanation}
                    aria-label="Numeric calculation response"
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* Type 4: Drag Sort */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, idx) => (
                  <motion.div
                    key={idx}
                    draggable
                    onDragStart={() => setDraggedItem(String(idx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, idx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow mt-2"
                >
                  Verify Disposal Step Order
                </motion.button>
              </div>
            )}

            {/* Type 5: Construct Journal Entry */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 rounded-md bg-indigo-950 text-indigo-300 text-xs font-mono border border-indigo-700 flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">Click parts above to construct the entry</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow"
                >
                  Post Journal Entry
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Disclosure */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Official Accounting Logic & Schedule II Resolution:
                </div>

                <div className="space-y-2">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-slate-300 flex items-start gap-2"
                    >
                      <span className="font-bold text-amber-500">{i + 1}.</span>
                      <span>{s}{!s.endsWith('.') && '.'}</span>
                    </motion.div>
                  ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps(prev => prev + 1)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-amber-300 border border-slate-700"
                  >
                    Show Next Analytical Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Audit Review →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & AUDIT SCORECARD ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border border-emerald-800 text-center space-y-4">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-bold text-white">ISC Accountancy Mastery Certified</h2>
            <div className="flex justify-center gap-6">
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <div className="text-xs text-slate-400">Final Score</div>
                <div className="text-2xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 min-w-[120px]">
                <div className="text-xs text-slate-400">Mastery Level</div>
                <div className="text-2xl font-bold text-indigo-400 capitalize">{masteryLevel}</div>
              </div>
            </div>

            {/* Performance Motivational Feedback */}
            <p className="text-sm font-medium text-slate-200 max-w-xl mx-auto">
              {errors === 0
                ? 'PERFECT SCORE! You have mastered dual-extract BRS, Schedule II depreciation, and Negotiable Instruments Act compliance flawlessly!'
                : errors <= 3
                ? 'Great work! You demonstrated strong conceptual precision in corporate accountancy.'
                : 'Good effort! Accounting precision comes from systematic practice. Review the misconception profile below.'}
            </p>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Specific Accounting Misconceptions Identified:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
                      <div className="text-rose-400 font-semibold mb-1">❌ Misconception: {m.misconception}</div>
                      <div className="text-emerald-400">✓ Audited Principle: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-300">
              <span className="font-bold text-amber-400">Spaced Repetition Schedule (SM-2): </span>
              Next review due in <strong>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to lock in permanent neural recall.
            </div>
            <span className="text-xs font-mono text-slate-500">AS-10 & NI 1881</span>
          </div>

          {/* Real World Practical Project */}
          <div className="p-5 bg-indigo-950/30 rounded-2xl border border-indigo-900/60 space-y-2">
            <h3 className="text-sm font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                  <strong className="text-indigo-400 mr-1.5">{idx + 1}.</strong> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating System Modals */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_AccountancyFromExtractBothSim;
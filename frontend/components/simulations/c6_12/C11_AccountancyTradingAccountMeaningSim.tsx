'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C11_ACC_051 = 'c11_acc_051';
const NODE_C11_ACC_052 = 'c11_acc_052';
const NODE_C11_ACC_053 = 'c11_acc_053';
const NODE_C11_ACC_054 = 'c11_acc_054';
const NODE_C11_ACC_055 = 'c11_acc_055';
const NODE_C11_ACC_056 = 'c11_acc_056';
const NODE_C11_ACC_057 = 'c11_acc_057';
const NODE_C11_ACC_058 = 'c11_acc_058';
const NODE_C11_ACC_059 = 'c11_acc_059';
const NODE_C11_ACC_060 = 'c11_acc_060';

const ALL_NODE_IDS = [
  NODE_C11_ACC_051,
  NODE_C11_ACC_052,
  NODE_C11_ACC_053,
  NODE_C11_ACC_054,
  NODE_C11_ACC_055,
  NODE_C11_ACC_056,
  NODE_C11_ACC_057,
  NODE_C11_ACC_058,
  NODE_C11_ACC_059,
  NODE_C11_ACC_060,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Rohit Traders: The Year-End Final Accounts Sprint',
  intro: 'Rohit runs a thriving wholesale textile business in Kalbadevi, Mumbai. It is 31st March 2024, the financial year-end. His trial balance is unadjusted, piles of transport receipts and godown logs lie on his desk, and his bank manager at State Bank of India requires audited final statements before renewing his ₹25,00,000 credit line.',
  context: 'As Rohit’s Chief Financial Controller, you must construct the complete accounting pipeline: isolate Trading gross margins, build the P&L Account, marshall the Balance Sheet, adjust for year-end accruals and provisions, calculate operating efficiency, and execute the final closing journal entries.',
};

// ─── DISCOVERY QUESTION (Curiosity Hook) ───
const DISCOVERY_QUESTION = {
  question: 'Rohit paid ₹15,000 for "Carriage Inwards" (bringing cloth to his godown) and ₹12,000 for "Carriage Outwards" (delivering cloth to customers). Where do these two freight expenses belong in the final statements?',
  options: [
    'Both in the Trading Account (Debit side) because all transport costs are direct trade expenses.',
    'Carriage Inwards goes to Trading Account (Debit), but Carriage Outwards goes to Profit & Loss Account (Debit).',
    'Both in the Profit & Loss Account (Debit side) because all carriage is an operating selling expense.',
    'Carriage Outwards goes to Balance Sheet as an asset, Carriage Inwards goes to Trading Account.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Inwards brings goods INTO the godown ready for sale (Direct). Outwards delivers goods OUT to customers after sale (Indirect Operating Expense)!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 Competency Aligned) ───
const CHALLENGES: Challenge[] = [
  // 1. FOUNDATION - Recall (c11_acc_051)
  {
    id: 'ch_01_f_trading_obj',
    nodeId: NODE_C11_ACC_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary objective of preparing a Trading Account in sole proprietorship final accounts?',
    options: [
      'To ascertain the ultimate net profit or net loss transferred to Capital.',
      'To isolate the Gross Profit or Gross Loss arising directly from buying and selling goods.',
      'To compute total owner equity and long-term liquidity as on 31st March.',
      'To reconcile the bank passbook with the cash book balance.',
    ],
    correctIndex: 1,
    explanation: 'The Trading Account is a nominal account prepared to isolate the trading margin (Gross Profit or Loss) by comparing net sales revenue against the direct Cost of Goods Sold (COGS). Indirect operating overheads belong in the P&L.',
    hints: [
      'Think about the core buying and selling activity before administrative overheads.',
      'Gross profit comes from the Trading Account; Net profit comes from the P&L.',
      'The Trading Account isolates the trading margin — the difference between net sales and direct cost of goods sold.',
    ],
    misconceptionIndex: 0,
  },

  // 2. FOUNDATION - Drag-Label (c11_acc_051)
  {
    id: 'ch_02_f_drag_trading',
    nodeId: NODE_C11_ACC_051,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the trading account items to their correct T-Account sections (Debit vs Credit).',
    dragItems: [
      { label: 'Opening Stock & Purchases', targetId: 'box_dr_top' },
      { label: 'Direct Wages & Carriage Inwards', targetId: 'box_dr_bottom' },
      { label: 'Net Sales Revenue', targetId: 'box_cr_top' },
      { label: 'Closing Stock (Unsold Goods)', targetId: 'box_cr_bottom' },
    ],
    correctMapping: {
      box_dr_top: 'Opening Stock & Purchases',
      box_dr_bottom: 'Direct Wages & Carriage Inwards',
      box_cr_top: 'Net Sales Revenue',
      box_cr_bottom: 'Closing Stock (Unsold Goods)',
    },
    explanation: 'The Trading Account Debit side records Opening Stock, Purchases (net of returns), and Direct Expenses. The Credit side records Net Sales and Closing Stock (reducing the cost of goods sold).',
    hints: [
      'Debit records all costs incurred in getting goods ready for sale.',
      'Credit records sales revenue plus the remaining unsold inventory value.',
      'Dr: Opening stock, purchases, wages, carriage inwards. Cr: Sales, closing stock.',
    ],
    misconceptionIndex: 1,
  },

  // 3. FOUNDATION - Understanding (c11_acc_052)
  {
    id: 'ch_03_f_pnl_items',
    nodeId: NODE_C11_ACC_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following items must be debited to the Profit & Loss Account and NEVER to the Trading Account?',
    options: [
      'Factory Coal & Power consumed in manufacturing textiles.',
      'Wages paid to loaders for unloading cloth into the godown.',
      'Carriage Outwards paid for delivering cloth to customer retail shops.',
      'Customs & Import Duty paid on imported raw yarn.',
    ],
    correctIndex: 2,
    explanation: 'Carriage Outwards is a selling and distribution expense (indirect expense) incurred AFTER the goods are in saleable condition. It belongs on the Debit of the Profit & Loss Account.',
    hints: [
      'Direct costs prepare the goods for sale (factory, loading, inward freight).',
      'Indirect costs deal with office management and customer distribution.',
      'Carriage Outwards is a selling expense, so it goes to the P&L Account.',
    ],
    misconceptionIndex: 0,
  },

  // 4. FOUNDATION - Numeric (c11_acc_058)
  {
    id: 'ch_04_f_cogs_calc',
    nodeId: NODE_C11_ACC_058,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Rohit Traders reports Opening Stock ₹60,000, Purchases ₹3,40,000, Carriage Inwards ₹15,000, Wages ₹25,000, and Closing Stock ₹80,000. Calculate the Cost of Goods Sold (COGS) in Rupees.',
    correctAnswer: 360000,
    tolerance: 0,
    unit: '₹',
    explanation: 'COGS = Opening Stock (₹60,000) + Purchases (₹3,40,000) + Direct Expenses (₹15,000 + ₹25,000) − Closing Stock (₹80,000) = ₹4,40,000 − ₹80,000 = ₹3,60,000.',
    hints: [
      'Formula: COGS = Opening Stock + Purchases + Direct Expenses − Closing Stock.',
      'Direct expenses here are Carriage Inwards (₹15,000) + Wages (₹25,000) = ₹40,000.',
      '₹60,000 + ₹3,40,000 + ₹40,000 − ₹80,000 = ₹3,60,000.',
    ],
    misconceptionIndex: 0,
  },

  // 5. FOUNDATION - Understanding (c11_acc_053)
  {
    id: 'ch_05_f_bs_nature',
    nodeId: NODE_C11_ACC_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is the Balance Sheet classified as a "Statement" rather than an "Account"?',
    options: [
      'Because it is prepared only once every five years by the tax department.',
      'Because it does not use "To" or "By", has no Dr/Cr columns, and shows financial status as on a single date.',
      'Because it records only personal accounts and omits real assets.',
      'Because it is prepared in double-entry books before the journal is written.',
    ],
    correctIndex: 1,
    explanation: 'A Balance Sheet is a stock statement of assets, liabilities, and owner capital on a specific date (snapshot). It is not a ledger account, has no debit/credit rules, and does not use "To" and "By".',
    hints: [
      'Compare nominal ledger accounts (for the period) with a snapshot statement (as at a date).',
      'No journal entry is passed to "close" or "open" the Balance Sheet itself.',
      'It lists balances of real and personal accounts as on 31st March without debit/credit headings.',
    ],
    misconceptionIndex: 1,
  },

  // 6. FOUNDATION - Drag-Sort (c11_acc_053)
  {
    id: 'ch_06_f_marshalling_perm',
    nodeId: NODE_C11_ACC_053,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange Rohit Traders’ assets in strict Order of PERMANENCE (Least Liquid first to Most Liquid last).',
    sortItems: ['Goodwill (Intangible)', 'Commercial Building', 'Plant & Machinery', 'Stock in Trade', 'Sundry Debtors', 'Cash in Hand'],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'Order of Permanence lists the most permanent / least realisable assets first (Goodwill, Building, Machinery) down to the most liquid asset last (Cash in Hand).',
    hints: [
      'Permanence = longest duration in business comes at the very top.',
      'Goodwill cannot be converted to cash immediately in normal course; cash is already spendable.',
      'Sequence: Goodwill → Building → Plant & Machinery → Stock → Debtors → Cash in Hand.',
    ],
    misconceptionIndex: 0,
  },

  // 7. FOUNDATION - Classify (c11_acc_054)
  {
    id: 'ch_07_f_double_effect',
    nodeId: NODE_C11_ACC_054,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the mandatory double-effect of an unrecorded "Outstanding Salary of ₹12,000" given in adjustments?',
    options: [
      'Add ₹12,000 to Salaries in P&L (Dr) AND show ₹12,000 as a Current Asset on the Balance Sheet.',
      'Add ₹12,000 to Salaries in P&L (Dr) AND show ₹12,000 as a Current Liability on the Balance Sheet.',
      'Deduct ₹12,000 from Salaries in P&L (Cr) AND add ₹12,000 to Capital.',
      'Credit ₹12,000 to Trading Account AND show ₹12,000 as Cash inflow.',
    ],
    correctIndex: 1,
    explanation: 'Under the accrual concept (AS-1), unpaid expenses incurred during the year must increase the P&L expense (Dr) and appear as a current liability (Cr) on the Balance Sheet.',
    hints: [
      'Employees worked in March, so the expense belongs to this year.',
      'Because cash is not yet paid, the business has an outstanding obligation (liability).',
      'Dr P&L (Add to Salaries) & Cr Balance Sheet (Current Liability).',
    ],
    misconceptionIndex: 1,
  },

  // 8. STANDARD - Application (c11_acc_054)
  {
    id: 'ch_08_s_prepaid_calc',
    nodeId: NODE_C11_ACC_054,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'On 1st October 2023, Rohit paid an annual fire insurance premium of ₹24,000 covering up to 30th September 2024. Accounting year ends 31st March 2024. What amount of insurance must be CHARGED to the P&L for FY 2023-24?',
    correctAnswer: 12000,
    tolerance: 0,
    unit: '₹',
    explanation: 'The period from 1st Oct 2023 to 31st Mar 2024 is 6 months. Current year expense = ₹24,000 × (6/12) = ₹12,000. The remaining ₹12,000 is Prepaid Insurance (Current Asset on Balance Sheet).',
    hints: [
      'Find how many months fall within the current accounting year (Oct to Mar = 6 months).',
      'Charge only the 6 months used: ₹24,000 × 6 / 12.',
      '₹12,000 belongs to this year (P&L charge); ₹12,000 is prepaid for next year.',
    ],
    misconceptionIndex: 2,
  },

  // 9. STANDARD - Construct Entry (c11_acc_055)
  {
    id: 'ch_09_s_accrued_inc_construct',
    nodeId: NODE_C11_ACC_055,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the adjusting journal entry for ₹8,000 Interest on Investments earned but not yet received.',
    availableParts: ['Accrued Interest A/c Dr.', 'To Interest on Investments A/c', 'Interest on Investments A/c Dr.', 'To Cash A/c', '₹8,000', 'To Accrued Interest A/c'],
    targetState: 'Accrued Interest A/c Dr. ₹8,000 To Interest on Investments A/c',
    validationHint: 'Assemble the entry: Debit the Asset account (Accrued Interest) and Credit the Income account.',
    explanation: 'Accrued Income creates a Current Asset (Dr. Accrued Interest) and increases the revenue earned for the period (Cr. Interest on Investments).',
    hints: [
      'The business has a right to receive money (Asset = Debit).',
      'The income belongs to this year’s earnings (Income = Credit).',
      'Order: Accrued Interest A/c Dr. ₹8,000 To Interest on Investments A/c.',
    ],
    misconceptionIndex: 0,
  },

  // 10. STANDARD - Distinguish (c11_acc_055)
  {
    id: 'ch_10_s_unearned_inc',
    nodeId: NODE_C11_ACC_055,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Rohit Traders received ₹30,000 commission, of which ₹6,000 is for agency services to be rendered in May 2024 (next FY). How is this ₹6,000 treated?',
    options: [
      'Credit ₹30,000 to P&L and show ₹6,000 as Current Asset.',
      'Deduct ₹6,000 from Commission in P&L (Credit ₹24,000 only) and show ₹6,000 as Current Liability on Balance Sheet.',
      'Add ₹6,000 to Commission in P&L (Credit ₹36,000) and show ₹6,000 as Current Liability.',
      'Transfer the full ₹30,000 directly to Capital on the Balance Sheet.',
    ],
    correctIndex: 1,
    explanation: 'Income received in advance is unearned income. Under AS-9, it cannot be recognised in the current year. It is deducted from income in the P&L and shown as a Current Liability because the service is owed next year.',
    hints: [
      'Has the ₹6,000 been earned this year? No.',
      'Does the business owe a future service? Yes (Liability).',
      'Deduct from P&L credit and report as Current Liability on Balance Sheet.',
    ],
    misconceptionIndex: 1,
  },

  // 11. STANDARD - Numeric (c11_acc_056)
  {
    id: 'ch_11_s_dep_wdv',
    nodeId: NODE_C11_ACC_056,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Machinery book value on 1st April 2023 was ₹2,00,000. Depreciation is charged at 10% p.a. on the Written Down Value (WDV). What is the Balance Sheet net value of Machinery on 31st March 2024?',
    correctAnswer: 180000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Depreciation for FY 2023-24 = ₹2,00,000 × 10% = ₹20,000 (debited to P&L). Balance Sheet value = ₹2,00,000 − ₹20,000 = ₹1,80,000.',
    hints: [
      'Calculate 10% of ₹2,00,000 = ₹20,000.',
      'Subtract this depreciation from the opening book value.',
      '₹2,00,000 − ₹20,000 = ₹1,80,000.',
    ],
    misconceptionIndex: 1,
  },

  // 12. STANDARD - Drag-Sort (c11_acc_057)
  {
    id: 'ch_12_s_debtors_deduction_seq',
    nodeId: NODE_C11_ACC_057,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the mandatory order of deductions from Sundry Debtors on the Balance Sheet as per accounting standards.',
    sortItems: [
      'Sundry Debtors (Trial Balance figure)',
      'Less: Further Bad Debts (from Adjustment)',
      'Less: New Provision for Doubtful Debts (PDD)',
      'Less: Provision for Discount on Debtors',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Prudence requires: First write off confirmed irrecoverable bad debts. Second, compute PDD on good debtors. Third, compute discount provision ONLY on the remaining doubtful-free debtors.',
    hints: [
      'Known losses (bad debts) must be subtracted first before applying percentages.',
      'Doubtful debtors will not pay early, so discount provision must be calculated last.',
      'Order: Debtors → Further Bad Debts → Provision for Doubtful Debts → Provision for Discount.',
    ],
    misconceptionIndex: 1,
  },

  // 13. STANDARD - Application (c11_acc_057)
  {
    id: 'ch_13_s_pdd_change_calc',
    nodeId: NODE_C11_ACC_057,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Trial Balance shows Debtors ₹1,00,000 and Old PDD ₹6,000. Adjustment: "Create Provision for Doubtful Debts at 5% on Debtors". What net amount is charged (or credited) to the P&L Account? (Enter as positive number for change)',
    correctAnswer: 1000,
    tolerance: 0,
    unit: '₹',
    explanation: 'New PDD = ₹1,00,000 × 5% = ₹5,000. Old PDD was ₹6,000. Because New PDD (₹5,000) < Old PDD (₹6,000), the excess ₹1,000 is CREDITED back to the P&L Account as a write-back!',
    hints: [
      'Calculate required new provision: 5% of ₹1,00,000 = ₹5,000.',
      'Compare New PDD (₹5,000) with Old PDD (₹6,000).',
      'The difference is ₹1,000 reduction, credited to the P&L.',
    ],
    misconceptionIndex: 0,
  },

  // 14. STANDARD - Analysis (c11_acc_058)
  {
    id: 'ch_14_s_adj_purchases_rule',
    nodeId: NODE_C11_ACC_058,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When the "Adjusted Purchases" method is used in the Trading Account, how is Closing Stock presented in the final accounts?',
    options: [
      'Credited to Trading Account and shown as a Current Asset on the Balance Sheet.',
      'Shown ONLY as a Current Asset on the Balance Sheet, and NOT on the Credit of Trading Account.',
      'Debited to Profit & Loss Account and deducted from Capital.',
      'Omitted entirely because it is already converted to cash.',
    ],
    correctIndex: 1,
    explanation: 'Adjusted Purchases = Purchases + Opening Stock − Closing Stock. Because closing stock is already subtracted on the debit side inside adjusted purchases, crediting it again to Trading would double-count it. It appears ONLY as a Current Asset on the Balance Sheet.',
    hints: [
      'Look at the formula: Adjusted Purchases already incorporates minus Closing Stock.',
      'If you credit it to Trading, you would subtract it twice from the cost pool.',
      'It appears only once: as a Current Asset on the Balance Sheet.',
    ],
    misconceptionIndex: 1,
  },

  // 15. STANDARD - Application (c11_acc_059)
  {
    id: 'ch_15_s_operating_profit_calc',
    nodeId: NODE_C11_ACC_059,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Rohit Traders reports Net Profit of ₹2,50,000. Included in this are: Interest on Fixed Deposits ₹20,000 (received), Profit on Sale of Old Van ₹15,000, and Loss by Fire ₹10,000 (debited). Calculate the true Operating Profit in Rupees.',
    correctAnswer: 225000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Operating Profit = Net Profit + Non-Operating Expenses − Non-Operating Incomes = ₹2,50,000 + ₹10,000 (Loss by Fire) − ₹20,000 (Interest) − ₹15,000 (Van profit) = ₹2,25,000.',
    hints: [
      'Formula: Operating Profit = Net Profit + Non-Operating Expenses − Non-Operating Incomes.',
      'Non-operating expenses to add back: Loss by fire (₹10,000).',
      'Non-operating incomes to subtract: Interest (₹20,000) + Van profit (₹15,000) = ₹35,000. Total = ₹2,50,000 + 10,000 − 35,000 = ₹2,25,000.',
    ],
    misconceptionIndex: 1,
  },

  // 16. STANDARD - Classify (c11_acc_060)
  {
    id: 'ch_16_s_closing_entry_rule',
    nodeId: NODE_C11_ACC_060,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following accounts will have a ZERO balance after all year-end closing entries are completed on 31st March?',
    options: [
      'Plant & Machinery Account (Real Asset).',
      'Sundry Creditors Account (Personal Liability).',
      'Salaries & Wages Account (Nominal Expense).',
      'Rohit Capital Account (Owner Equity).',
    ],
    correctIndex: 2,
    explanation: 'Closing entries apply ONLY to nominal accounts (expenses, revenues, losses, gains) to reset them to zero for the new financial year. Real and personal accounts carry forward their balances to the Balance Sheet.',
    hints: [
      'Real and personal accounts represent cumulative ownership and debts.',
      'Nominal accounts measure performance for one year only.',
      'Salaries & Wages (nominal) is closed to P&L/Trading and becomes zero.',
    ],
    misconceptionIndex: 0,
  },

  // 17. ADVANCED - Evaluation (c11_acc_051 & c11_acc_052)
  {
    id: 'ch_17_a_eval_margin_leak',
    nodeId: NODE_C11_ACC_051,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Rohit Traders’ Gross Profit Ratio fell from 32% to 21% while Net Profit remained flat due to higher interest income on surplus bank deposits. As a financial analyst, how would you evaluate this situation?',
    options: [
      'The business is in excellent health because Net Profit did not fall.',
      'The core trading operations are deteriorating (rising purchase costs or unrecovered discounts), masked temporarily by non-operating interest income.',
      'Carriage inwards must be shifted to the P&L Account to restore the gross profit ratio.',
      'The Balance Sheet will fail to balance next year due to AS-2 violations.',
    ],
    correctIndex: 1,
    explanation: 'A falling Gross Profit ratio signals fundamental weakness in core trading efficiency (higher COGS or declining sales realisation). Relying on treasury/non-operating income to support Net Profit masks long-term operational failure.',
    hints: [
      'Look at what the Trading Account specifically isolates: core buying & selling margin.',
      'Treasury income is peripheral and does not fix inefficient cloth procurement.',
      'The core trading margin is collapsing even if non-operating income props up net profit.',
    ],
    misconceptionIndex: 3,
  },

  // 18. ADVANCED - Multi-Step Numeric (c11_acc_057)
  {
    id: 'ch_18_a_complex_debtors_calc',
    nodeId: NODE_C11_ACC_057,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Trial Balance Debtors: ₹2,10,000. Adjustments: (i) Write off Further Bad Debts ₹10,000. (ii) Create PDD at 5% on Debtors. (iii) Create Provision for Discount on Debtors at 2%. What is the final Net Debtors figure on the Balance Sheet?',
    correctAnswer: 186200,
    tolerance: 0,
    unit: '₹',
    explanation: 'Step 1: ₹2,10,000 − ₹10,000 Bad Debts = ₹2,00,000. Step 2: New PDD = 5% of ₹2,00,000 = ₹10,000 → Net = ₹1,90,000. Step 3: Discount = 2% of ₹1,90,000 = ₹3,800. Net Debtors = ₹1,90,000 − ₹3,800 = ₹1,86,200.',
    hints: [
      'Deduct further bad debts first: ₹2,10,000 − ₹10,000 = ₹2,00,000.',
      'PDD = 5% of ₹2,00,000 = ₹10,000. Remaining good debtors = ₹1,90,000.',
      'Discount = 2% of ₹1,90,000 = ₹3,800. Final Net = ₹1,90,000 − ₹3,800 = ₹1,86,200.',
    ],
    misconceptionIndex: 1,
  },

  // 19. ADVANCED - Analysis (c11_acc_059)
  {
    id: 'ch_19_a_rent_paid_vs_rec',
    nodeId: NODE_C11_ACC_059,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is "Rent Paid for Godown" classified as Operating Expense, whereas "Rent Received from Subletting Godown Roof" is classified as Non-Operating Income for a cloth merchant?',
    options: [
      'Because all payments are operating and all receipts are non-operating in accounting theory.',
      'Godown rent is essential to store cloth (core trading necessity), while subletting roof space is an incidental activity outside textile wholesale operations.',
      'Because the Companies Act 2013 forbids cloth merchants from earning operating income.',
      'Because rent received is an asset, while rent paid is a liability.',
    ],
    correctIndex: 1,
    explanation: 'The operating test is whether an item directly supports the principal revenue-generating activity. Rent paid is necessary to house trading inventory. Subletting surplus space is incidental property income.',
    hints: [
      'What is Rohit’s primary line of business? Wholesale textiles.',
      'Is storing cloth essential to selling cloth? Yes. Is leasing roof space his main business? No.',
      'Core business necessity = Operating; incidental peripheral gain = Non-operating.',
    ],
    misconceptionIndex: 0,
  },

  // 20. ADVANCED - Construct Journal (c11_acc_060)
  {
    id: 'ch_20_a_transfer_np_construct',
    nodeId: NODE_C11_ACC_060,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the year-end transfer entry to transfer ₹1,98,000 Net Profit from the P&L Account to Rohit’s Capital Account.',
    availableParts: ['Profit & Loss A/c Dr.', 'To Rohit Capital A/c', 'Rohit Capital A/c Dr.', 'To Profit & Loss A/c', '₹1,98,000', 'To Trading A/c'],
    targetState: 'Profit & Loss A/c Dr. ₹1,98,000 To Rohit Capital A/c',
    validationHint: 'Debit P&L Account (to close its credit balance) and Credit Capital Account (to increase owner equity).',
    explanation: 'Net profit represents the net credit surplus in the P&L Account. To close the P&L Account, it is debited and the owner’s Capital Account is credited (increasing equity).',
    hints: [
      'Profit increases the owner’s Capital (Capital account has a Credit balance).',
      'The P&L account balance must be emptied out (debited).',
      'Entry: Profit & Loss A/c Dr. ₹1,98,000 To Rohit Capital A/c.',
    ],
    misconceptionIndex: 2,
  },

  // 21. ADVANCED - Evaluation (c11_acc_053)
  {
    id: 'ch_21_a_banker_marshalling',
    nodeId: NODE_C11_ACC_053,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'SBI Branch Manager evaluates Rohit’s request for a 90-day cash credit limit. Which marshalling format will the banker prefer, and why?',
    options: [
      'Order of Permanence, because it highlights Goodwill and Land at the top.',
      'Order of Liquidity, because it immediately showcases Cash, Bank, and quick Debtors against short-term dues at the top.',
      'Schedule III vertical format, because sole traders are legally mandated to file it with the MCA.',
      'Alphabetical order, because it standardises trial balance verification.',
    ],
    correctIndex: 1,
    explanation: 'Short-term credit lenders prioritise immediate liquidity and working capital solvency. The Order of Liquidity lists Cash, Bank, Debtors, and Creditors first, allowing rapid evaluation of the Current Ratio.',
    hints: [
      'A banker giving a 90-day loan cares about cash flow and liquid receivables.',
      'Order of Liquidity puts the fastest cash-converting assets at the very top.',
      'Order of Liquidity helps short-term lenders evaluate immediate repayment capacity.',
    ],
    misconceptionIndex: 0,
  },

  // 22. ADVANCED - Analysis (c11_acc_054 & c11_acc_060)
  {
    id: 'ch_22_a_error_omission_trail',
    nodeId: NODE_C11_ACC_054,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'If Rohit’s accountant records Closing Stock of ₹1,80,000 on the Credit of the Trading Account but completely forgets to list it on the Balance Sheet, what is the accounting consequence?',
    options: [
      'Gross profit and Net profit will be wrong, but the Balance Sheet will tally.',
      'Gross profit and Net profit will be completely correct, but the Balance Sheet assets will be short by ₹1,80,000 and fail to tally.',
      'Both Trading and Balance Sheet will automatically adjust via the suspense account.',
      'Cost of goods sold will be overstated by ₹1,80,000 in the Trading Account.',
    ],
    correctIndex: 1,
    explanation: 'Crediting the Trading Account correctly computes Gross Profit and Net Profit (which increases Capital on Liabilities). But omitting the asset from the Balance Sheet leaves Assets short by ₹1,80,000, causing a mismatch.',
    hints: [
      'Trace the flow: Trading credit → GP correct → NP correct → Capital correct.',
      'Now check the Balance Sheet: Capital has increased by the profit, but the asset side is missing ₹1,80,000.',
      'Profits are correct, but the Balance Sheet fails to tally by exactly ₹1,80,000.',
    ],
    misconceptionIndex: 0,
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
  nodeId: NODE_C11_ACC_051,
  title: 'Final Accounts of a Sole Trader (Trading, P&L, Balance Sheet & Adjustments)',
  definition: 'The final accounts comprise the Trading Account (ascertaining gross trading profit/loss), Profit and Loss Account (ascertaining net operating and non-operating profit/loss), and the Balance Sheet (a statement of financial position as on a specific date). End-of-period adjustments enforce the accrual and matching concepts via mandatory dual-effect accounting.',
  eli5: 'Think of final accounts like a cricket scoreboard. The Trading Account shows runs scored from pure batting (buying & selling cloth). The P&L Account factors in tournament fees and refreshments (office rent & staff salaries). The Balance Sheet is a team photo showing all your cricket gear and trophies (assets) versus what you borrowed from friends (liabilities)!',
  misconceptions: [
    {
      misconception: 'Carriage Outwards is a direct expense and should be debited to the Trading Account.',
      correction: 'Carriage Inwards brings goods INTO the godown (Trading A/c Dr). Carriage Outwards delivers sold goods OUT to customers (P&L A/c Dr).',
    },
    {
      misconception: 'Closing Stock belongs on the debit side of the Trading Account because it is an asset.',
      correction: 'In the Trading Account, Closing Stock is CREDITED to reduce the cost of goods sold. It appears as an Asset on the Balance Sheet.',
    },
    {
      misconception: 'Prepaid expenses are liabilities because cash was paid in advance.',
      correction: 'Prepaid expenses are ASSETS because the business holds a legal right to receive future economic service without further payment.',
    },
    {
      misconception: 'The entire new Provision for Doubtful Debts is always debited to the P&L Account.',
      correction: 'Only the NET CHANGE (New Provision minus Old Provision) is debited or credited to P&L. The full new provision is deducted from Debtors on the Balance Sheet.',
    },
    {
      misconception: 'Adjusted Purchases method requires closing stock to be credited to the Trading Account.',
      correction: 'Adjusted Purchases already nets closing stock (Purchases + Opening Stock − Closing Stock). Crediting it again would double-count the deduction.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Where is Carriage Inwards posted in final accounts?', options: ['Trading A/c (Debit)', 'P&L A/c (Debit)', 'Balance Sheet (Asset)', 'P&L A/c (Credit)'], correctIndex: 0 },
    { question: 'What is the formula for Cost of Goods Sold (COGS)?', options: ['Sales − Net Profit', 'Opening Stock + Purchases + Direct Expenses − Closing Stock', 'Purchases + Indirect Expenses', 'Closing Stock + Capital'], correctIndex: 1 },
    { question: 'How is Outstanding Rent treated at year-end?', options: ['Deducted from Rent in P&L', 'Added to Rent in P&L and shown as Current Liability on Balance Sheet', 'Shown only on the Trading Account', 'Added to Cash at Bank'], correctIndex: 1 },
    { question: 'Which asset appears first in the Order of Permanence?', options: ['Cash in Hand', 'Sundry Debtors', 'Goodwill', 'Stock in Trade'], correctIndex: 2 },
    { question: 'Accrued Interest on Investment is classified on the Balance Sheet as a:', options: ['Current Liability', 'Current Asset', 'Fixed Asset', 'Capital Addition'], correctIndex: 1 },
    { question: 'Operating Profit formula is:', options: ['Gross Profit − All Expenses', 'Net Profit + Non-Operating Expenses − Non-Operating Incomes', 'Sales − Purchases', 'Capital + Net Profit'], correctIndex: 1 },
    { question: 'Closing entries are passed for which class of accounts?', options: ['Real accounts only', 'Personal accounts only', 'Nominal accounts only', 'All ledger accounts'], correctIndex: 2 },
    { question: 'Under AS-2, Closing Stock is valued at:', options: ['Cost Price only', 'Market Realisable Value only', 'Lower of Cost or Net Realisable Value', 'Higher of Cost or Selling Price'], correctIndex: 2 },
  ],
  masteryCriteria: 'Mastery is achieved when the student accurately prepares Trading, P&L, and marshalled Balance Sheets, computes COGS and Operating Profit, and executes dual-effect adjustments for accruals, prepayments, and provisions.',
};

// ─── EXPLORATION STEPS (Interactive Guided Learning) ───
const EXPLORATION_STEPS = [
  {
    title: 'Stage 1: The Trading Account Engine',
    instruction: 'Adjust Rohit’s cloth purchases and carriage inwards to see how Cost of Goods Sold (COGS) dynamically drives Gross Profit.',
    interactionType: 'slider-trading',
    nodeId: NODE_C11_ACC_051,
  },
  {
    title: 'Stage 2: P&L & The Expense Filter',
    instruction: 'Toggle between Direct and Indirect expenses to route them into either the Trading Account or Profit & Loss Account.',
    interactionType: 'toggle-classify',
    nodeId: NODE_C11_ACC_052,
  },
  {
    title: 'Stage 3: Balance Sheet Marshalling Lab',
    instruction: 'Switch between Order of Permanence and Order of Liquidity to observe how the balance sheet rearranges its assets and liabilities.',
    interactionType: 'marshalling-toggle',
    nodeId: NODE_C11_ACC_053,
  },
  {
    title: 'Stage 4: The Accrual Adjustment Simulator',
    instruction: 'Adjust outstanding wages and prepaid insurance sliders to watch the dual-effect on P&L and Balance Sheet in real time.',
    interactionType: 'slider-adjustments',
    nodeId: NODE_C11_ACC_054,
  },
  {
    title: 'Stage 5: Operating Profit vs Net Profit',
    instruction: 'Inject non-operating gains (asset sale) and non-operating losses (fire) to see the divergence between Operating and Net Profit.',
    interactionType: 'slider-operating',
    nodeId: NODE_C11_ACC_059,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If Rohit’s suppliers increase cloth purchase costs by ₹50,000 while selling prices remain unchanged, what happens to Gross Profit and COGS?',
    options: [
      'COGS increases by ₹50,000 and Gross Profit decreases by ₹50,000.',
      'COGS decreases by ₹50,000 and Gross Profit increases by ₹50,000.',
      'Both COGS and Gross Profit increase simultaneously by ₹50,000.',
      'Neither changes because closing stock will automatically absorb the price rise.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now slide the Purchases slider up by ₹50,000 in Stage 1 to test the exact mathematical impact on Gross Profit!',
    nodeId: NODE_C11_ACC_051,
  },
  {
    question: 'Prediction: If Rohit provides ₹10,000 for Outstanding Salaries on 31st March, what happens to Net Profit and the Balance Sheet total?',
    options: [
      'Net profit decreases by ₹10,000, and Balance Sheet total remains exactly the same (Capital drops by ₹10,000 while Current Liabilities rise by ₹10,000).',
      'Net profit increases by ₹10,000 and Balance Sheet assets increase by ₹10,000.',
      'Net profit is unaffected because the cash has not left the bank account.',
      'Balance Sheet total decreases by ₹20,000.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Move to Stage 4 and increase Outstanding Salaries to ₹10,000. Notice how the Balance Sheet liabilities rebalance perfectly!',
    nodeId: NODE_C11_ACC_054,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: Look at the Trading T-Account. Why does increasing Closing Stock INCREASE Gross Profit?',
    observableOptions: [
      'Because Closing Stock is credited, effectively reducing the net cost of goods that were sold this year.',
      'Because Closing Stock is cash received from customers at year end.',
      'Because unsold stock generates bank interest before 31st March.',
      'Because Closing Stock is added directly to total sales revenue.',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_ACC_051,
  },
  {
    question: 'Observation: When you switch from Order of Permanence to Order of Liquidity, what happens to the bottom-line Balance Sheet total?',
    observableOptions: [
      'The total increases because liquid assets are worth more than fixed assets.',
      'The total remains identical (₹11,80,000) — marshalling changes only the presentation sequence, not asset values.',
      'The total drops because depreciation is automatically deducted.',
      'The total shifts from liabilities to assets.',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_ACC_053,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'CFO for an Indian MSME',
  description: 'Pick any local registered enterprise in your city (e.g. a local sweet manufacturer, hardware store, or textile shop). Inspect their annual ledger summary and list 3 direct expenses (factory/procurement) versus 3 indirect operating expenses (office/distribution).',
  steps: [
    'Obtain or draft an unadjusted trial balance with Sales, Purchases, and expenses.',
    'Isolate direct costs (wages, carriage inwards, freight) to compute the Gross Margin.',
    'Apply 3 standard year-end adjustments: Outstanding rent, prepaid insurance, and 5% PDD on debtors.',
    'Present the marshalled Balance Sheet in Order of Liquidity for an SBI bank loan officer.',
  ],
};

// ─── 3 TOPIC-SPECIFIC SVGS ───

// SVG 1: Direct vs Indirect Expense Funnel Diagram
const ExpenseFlowDiagram = () => (
  <svg
    viewBox="0 0 500 160"
    className="w-full max-w-lg mx-auto rounded-xl bg-slate-950/80 border border-slate-800 p-2 my-3"
    role="img"
    aria-label="Diagram showing Direct Expenses flowing to Trading Account and Indirect Expenses flowing to Profit & Loss Account"
  >
    <defs>
      <linearGradient id="tradingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#312e81" />
      </linearGradient>
      <linearGradient id="pnlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9333ea" />
        <stop offset="100%" stopColor="#581c87" />
      </linearGradient>
    </defs>
    {/* Source: Total Outflows */}
    <rect x="10" y="50" width="100" height="60" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
    <text x="60" y="77" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">All Business</text>
    <text x="60" y="93" fill="#94a3b8" fontSize="10" textAnchor="middle">Expenses</text>

    {/* Upper Branch: Direct */}
    <path d="M 110 65 C 160 65, 170 35, 220 35" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="4 2" />
    <polygon points="220,31 228,35 220,39" fill="#6366f1" />
    <rect x="230" y="10" width="130" height="50" rx="8" fill="url(#tradingGrad)" stroke="#818cf8" strokeWidth="1.5" />
    <text x="295" y="32" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Direct Expenses</text>
    <text x="295" y="48" fill="#c7d2fe" fontSize="9" textAnchor="middle">Wages, Freight In, Power</text>

    {/* Upper Result: Gross Profit */}
    <path d="M 360 35 L 390 35" fill="none" stroke="#10b981" strokeWidth="2" />
    <polygon points="390,31 398,35 390,39" fill="#10b981" />
    <rect x="400" y="15" width="90" height="40" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
    <text x="445" y="35" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Trading A/c</text>
    <text x="445" y="47" fill="#34d399" fontSize="8" textAnchor="middle">→ Gross Profit</text>

    {/* Lower Branch: Indirect */}
    <path d="M 110 95 C 160 95, 170 125, 220 125" fill="none" stroke="#c084fc" strokeWidth="2.5" strokeDasharray="4 2" />
    <polygon points="220,121 228,125 220,129" fill="#c084fc" />
    <rect x="230" y="100" width="130" height="50" rx="8" fill="url(#pnlGrad)" stroke="#c084fc" strokeWidth="1.5" />
    <text x="295" y="122" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Indirect Expenses</text>
    <text x="295" y="138" fill="#e9d5ff" fontSize="9" textAnchor="middle">Rent, Salaries, Selling</text>

    {/* Lower Result: Net Profit */}
    <path d="M 360 125 L 390 125" fill="none" stroke="#f59e0b" strokeWidth="2" />
    <polygon points="390,121 398,125 390,129" fill="#f59e0b" />
    <rect x="400" y="105" width="90" height="40" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
    <text x="445" y="125" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">P&L A/c</text>
    <text x="445" y="137" fill="#fbbf24" fontSize="8" textAnchor="middle">→ Net Profit</text>
  </svg>
);

// SVG 2: COGS & Gross Profit Accounting Scale
const COGSScaleDiagram = () => (
  <svg
    viewBox="0 0 500 140"
    className="w-full max-w-lg mx-auto rounded-xl bg-slate-950/80 border border-slate-800 p-2 my-3"
    role="img"
    aria-label="Accounting equation diagram: Net Sales minus Cost of Goods Sold equals Gross Profit"
  >
    <rect x="20" y="20" width="460" height="36" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
    <text x="250" y="43" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">
      TOTAL NET SALES REVENUE (100%)
    </text>

    {/* Left Block: COGS */}
    <rect x="20" y="66" width="280" height="50" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
    <text x="160" y="88" fill="#fecaca" fontSize="11" fontWeight="bold" textAnchor="middle">
      Cost of Goods Sold (COGS)
    </text>
    <text x="160" y="104" fill="#fca5a5" fontSize="9" textAnchor="middle">
      Opening Stock + Purchases + Direct Wages − Closing Stock
    </text>

    {/* Plus sign divider */}
    <circle cx="310" cy="91" r="10" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
    <text x="310" y="95" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">+</text>

    {/* Right Block: Gross Profit */}
    <rect x="330" y="66" width="150" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
    <text x="405" y="88" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
      Gross Profit Margin
    </text>
    <text x="405" y="104" fill="#6ee7b7" fontSize="9" textAnchor="middle">
      (Direct Trading Gain)
    </text>
  </svg>
);

// SVG 3: Balance Sheet Marshalling Solvency Scale
const MarshallingDiagram = () => (
  <svg
    viewBox="0 0 500 150"
    className="w-full max-w-lg mx-auto rounded-xl bg-slate-950/80 border border-slate-800 p-2 my-3"
    role="img"
    aria-label="Diagram showing Balance Sheet Marshalling orders: Order of Permanence versus Order of Liquidity"
  >
    {/* Left Column: Permanence */}
    <rect x="15" y="15" width="225" height="120" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
    <text x="127" y="35" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">
      ORDER OF PERMANENCE
    </text>
    <line x1="25" y1="42" x2="230" y2="42" stroke="#4338ca" strokeWidth="1" />
    <text x="35" y="60" fill="#a5b4fc" fontSize="9">1. Goodwill & Land / Building (Top)</text>
    <text x="35" y="78" fill="#a5b4fc" fontSize="9">2. Plant, Machinery & Fixtures</text>
    <text x="35" y="96" fill="#a5b4fc" fontSize="9">3. Stock & Debtors</text>
    <text x="35" y="114" fill="#38bdf8" fontSize="9" fontWeight="bold">4. Cash in Hand & at Bank (Bottom)</text>
    <text x="127" y="130" fill="#818cf8" fontSize="8" textAnchor="middle">✓ Favoured by long-term investors</text>

    {/* Right Column: Liquidity */}
    <rect x="260" y="15" width="225" height="120" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
    <text x="372" y="35" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
      ORDER OF LIQUIDITY
    </text>
    <line x1="270" y1="42" x2="475" y2="42" stroke="#047857" strokeWidth="1" />
    <text x="280" y="60" fill="#38bdf8" fontSize="9" fontWeight="bold">1. Cash in Hand & at Bank (Top)</text>
    <text x="280" y="78" fill="#6ee7b7" fontSize="9">2. Sundry Debtors & Bills Rec.</text>
    <text x="280" y="96" fill="#6ee7b7" fontSize="9">3. Stock in Trade</text>
    <text x="280" y="114" fill="#6ee7b7" fontSize="9">4. Land, Building & Goodwill (Bottom)</text>
    <text x="372" y="130" fill="#34d399" fontSize="8" textAnchor="middle">✓ Favoured by short-term bank lenders</text>
  </svg>
);

// ─── MAIN SIMULATION COMPONENT ───
function C11_AccountancyTradingAccountMeaningSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['acc'] || { name: 'Accountancy', emoji: '📚', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant Exploration State
  const [simSales, setSimSales] = useState(1200000);
  const [simOpeningStock] = useState(120000);
  const [simPurchases, setSimPurchases] = useState(840000);
  const [simDirectWages] = useState(60000);
  const [simCarriageIn, setSimCarriageIn] = useState(15000);
  const [simClosingStock, setSimClosingStock] = useState(180000);

  // Stage 2 toggle states
  const [classifiedItems, setClassifiedItems] = useState<Record<string, 'trading' | 'pnl'>>({
    'Factory Rent': 'trading',
    'Office Salaries': 'pnl',
    'Carriage Inwards': 'trading',
    'Carriage Outwards': 'pnl',
    'Coal & Power': 'trading',
    'Advertisement': 'pnl',
  });

  // Stage 3 Marshalling state
  const [marshallingOrder, setMarshallingOrder] = useState<'permanence' | 'liquidity'>('permanence');

  // Stage 4 Adjustments simulator state
  const [adjSalariesPaid] = useState(80000);
  const [adjOutstandingSal, setAdjOutstandingSal] = useState(10000);
  const [adjInsurancePaid] = useState(24000);
  const [adjPrepaidIns, setAdjPrepaidIns] = useState(6000);

  // Stage 5 Operating Profit simulator state
  const [opNonOpIncome, setOpNonOpIncome] = useState(35000);
  const [opNonOpExpense, setOpNonOpExpense] = useState(10000);

  // Prediction & Observation
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Challenge execution state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive challenge inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // UI feedback & Animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection section answers state
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES & CALCULATIONS ───
  const simCOGS = useMemo(() => {
    return simOpeningStock + simPurchases + simDirectWages + simCarriageIn - simClosingStock;
  }, [simOpeningStock, simPurchases, simDirectWages, simCarriageIn, simClosingStock]);

  const simGrossProfit = useMemo(() => {
    return simSales - simCOGS;
  }, [simSales, simCOGS]);

  const simGPPercentage = useMemo(() => {
    return simSales > 0 ? ((simGrossProfit / simSales) * 100).toFixed(1) : '0.0';
  }, [simGrossProfit, simSales]);

  const simAdjustedSalary = useMemo(() => {
    return adjSalariesPaid + adjOutstandingSal;
  }, [adjSalariesPaid, adjOutstandingSal]);

  const simAdjustedInsurance = useMemo(() => {
    return adjInsurancePaid - adjPrepaidIns;
  }, [adjInsurancePaid, adjPrepaidIns]);

  const simNetProfit = useMemo(() => {
    const baseIndirect = 120000;
    return simGrossProfit - (simAdjustedSalary + simAdjustedInsurance + baseIndirect) + opNonOpIncome - opNonOpExpense;
  }, [simGrossProfit, simAdjustedSalary, simAdjustedInsurance, opNonOpIncome, opNonOpExpense]);

  const simOperatingProfit = useMemo(() => {
    return simNetProfit + opNonOpExpense - opNonOpIncome;
  }, [simNetProfit, opNonOpExpense, opNonOpIncome]);

  // Chart Data for Recharts
  const chartData = useMemo(() => [
    { name: 'Net Sales', amount: simSales, fill: '#3b82f6' },
    { name: 'COGS', amount: simCOGS, fill: '#ef4444' },
    { name: 'Gross Profit', amount: Math.max(0, simGrossProfit), fill: '#10b981' },
    { name: 'Operating Profit', amount: Math.max(0, simOperatingProfit), fill: '#8b5cf6' },
    { name: 'Net Profit', amount: Math.max(0, simNetProfit), fill: '#f59e0b' },
  ], [simSales, simCOGS, simGrossProfit, simOperatingProfit, simNetProfit]);

  // ─── FILTER CHALLENGES BY CURRENT DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD EFFECT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C11_ACC_051);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION EFFECT ───
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

  // ─── CANVAS 2D WAVE ANIMATION (Pulsing Ledger Balance) ───
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Active sine balance pulse
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + frame * 2) * 0.05) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Center balance node
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 4 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── AUTO-HINT TIMER CLEANUP ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const nextLevel = 1;
        if (challenge.hints[0]) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(nextLevel);
          audioManager.play('hint');
          speechManager.speak(challenge.hints[0]);
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
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'drop-wrong');
    speechManager.speak(isCorrect ? 'Spot on! Carriage Inwards is direct; Carriage Outwards is indirect.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Final Accounts Laboratory. Let us explore how Rohit Traders balances the books.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now take the driver seat! Manipulate all trading variables with no time pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('celebration');
    speechManager.speak('Challenge Phase activated. Apply your ISC accounting competencies to clear Rohit’s audit.');
  }, []);

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now verify with the interactive simulation controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'drop-wrong');
    speechManager.speak(isCorrect ? 'Excellent accounting observation!' : 'Look closer at the credit-side deduction on cost of goods.');
  }, []);

  const handleToggleExpenseClass = useCallback((item: string) => {
    audioManager.play('tap');
    setClassifiedItems(prev => ({
      ...prev,
      [item]: prev[item] === 'trading' ? 'pnl' : 'trading',
    }));
  }, []);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Audit complete! You scored ${finalScore} percent with mastery level ${masteryLevel}.`);
  }, [errors, masteryLevel, onComplete]);

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
      handleCompleteSimulation();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation]);

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
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct entry! Perfectly matched to ISC accounting standards.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Hints exhausted. Let us walk through the complete accounting rationale together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
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
      const initial = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = initial.splice(fromIndex, 1);
      initial.splice(toIndex, 0, moved);
      return initial;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleConstructAdd = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => [...prev, part]);
  }, []);

  const handleConstructRemove = useCallback((index: number) => {
    audioManager.play('pop');
    setConstructParts(prev => prev.filter((_, idx) => idx !== index));
  }, []);

  // ─── RENDER ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-5 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/30 flex items-center justify-center text-2xl border border-gold-500/40"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-gold-400 bg-gold-950/60 px-2 py-0.5 rounded-md border border-gold-800">
                ISC Class 11 Accountancy
              </span>
              <span className="text-xs text-slate-400">AS-1 • AS-2 • AS-9 • AS-10 • AS-29</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Pills */}
        <nav aria-label="Simulation Phases" className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Navigate to ${p} phase`}
              onClick={() => {
                if (p === 'challenge') handleAdvanceToChallenge();
                else if (p === 'explore') setPhase('explore');
                else if (p === 'sandbox') setPhase('sandbox');
                else setPhase('discovery');
              }}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                phase === p ? 'bg-gold-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </nav>
      </div>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-gold-950/60 to-slate-900 border border-gold-800/60">
            <div className="flex items-center gap-2 text-gold-300 font-semibold mb-2">
              <span className="text-lg" aria-hidden="true">🏢</span>
              <span>{SCENARIO.title}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-slate-950/60 rounded-xl border border-gold-900/40 text-xs text-gold-200 font-mono">
              💡 {SCENARIO.context}
            </div>
          </div>

          {/* SVG 1: Direct vs Indirect Diagram */}
          <ExpenseFlowDiagram />

          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Curiosity Diagnostic</span>
            <h2 className="text-lg font-bold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h2>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-900/80 border-slate-700 hover:border-gold-500 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono border border-slate-700">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                      <span className="ml-auto text-emerald-400 font-bold" aria-label="Correct answer">✓</span>
                    )}
                    {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                      <span className="ml-auto text-rose-400 font-bold" aria-label="Incorrect option">✗</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 pt-4 border-t border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! You understand the fundamental boundary between Direct and Indirect freight.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Enter the Accounting Lab"
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold shadow-lg shadow-gold-600/30 whitespace-nowrap"
                >
                  Enter Accounting Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (Brilliant.org style) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Step Navigator */}
          <div className="flex items-center justify-between bg-slate-950 p-2 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={`Go to Stage ${idx + 1}: ${step.title}`}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all ${
                    currentSlide === idx ? 'bg-gold-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  {idx + 1}. {step.title.split(':')[0]}
                </motion.button>
              ))}
            </div>
            <span className="text-xs text-slate-500 font-mono pr-2">Stage {currentSlide + 1}/5</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 shadow-xl"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4 pb-3 border-b border-slate-700">
                <div>
                  <h3 className="text-lg font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-xs text-amber-300 mt-0.5">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <span className="text-xs bg-gold-950 px-2.5 py-1 rounded-full text-gold-400 border border-gold-800 font-mono">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              {/* SLIDE 0: TRADING ACCOUNT ENGINE */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* SVG 2: COGS Scale */}
                  <COGSScaleDiagram />

                  {/* Predict then check block */}
                  {!predictionMade && (
                    <div className="p-4 bg-slate-900/90 rounded-xl border border-gold-900/60">
                      <p className="text-xs uppercase font-bold text-gold-400 mb-1">Interactive Hypothesis</p>
                      <p className="text-sm text-white font-medium mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            aria-label={`Select prediction: ${opt}`}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40 flex items-center justify-between text-xs text-gold-300">
                      <span>✓ Hypothesis logged! Use the controls below to verify:</span>
                      <span className="font-mono text-emerald-400">{PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                    </div>
                  )}

                  {/* Interactive Sliders for Trading Variables */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs">
                        <label htmlFor="sim-purchases-slider" className="text-slate-400">Net Purchases</label>
                        <span className="text-white font-mono font-bold">₹{simPurchases.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        id="sim-purchases-slider"
                        aria-label="Adjust Net Purchases value in Rupees"
                        type="range"
                        min={500000}
                        max={1100000}
                        step={10000}
                        value={simPurchases}
                        onChange={e => {
                          setSimPurchases(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs">
                        <label htmlFor="sim-carriage-slider" className="text-slate-400">Carriage Inwards</label>
                        <span className="text-white font-mono font-bold">₹{simCarriageIn.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        id="sim-carriage-slider"
                        aria-label="Adjust Carriage Inwards freight cost in Rupees"
                        type="range"
                        min={5000}
                        max={50000}
                        step={2500}
                        value={simCarriageIn}
                        onChange={e => {
                          setSimCarriageIn(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between text-xs">
                        <label htmlFor="sim-closing-slider" className="text-slate-400">Closing Stock (Unsold)</label>
                        <span className="text-white font-mono font-bold">₹{simClosingStock.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        id="sim-closing-slider"
                        aria-label="Adjust Closing Stock value in Rupees"
                        type="range"
                        min={80000}
                        max={300000}
                        step={10000}
                        value={simClosingStock}
                        onChange={e => {
                          setSimClosingStock(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>

                  {/* Horizontal T-Account Visualiser (ISC Form) */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div className="text-center font-bold text-sm text-slate-200 mb-3 border-b border-slate-800 pb-2">
                      TRADING ACCOUNT OF ROHIT TRADERS (For year ended 31st March 2024)
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 text-xs font-mono">
                      {/* Debit Side */}
                      <div className="p-3 space-y-2">
                        <div className="text-red-400 font-bold border-b border-slate-800 pb-1">Dr. (Direct Costs)</div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">To Opening Stock</span>
                          <span className="text-slate-200">₹{simOpeningStock.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">To Net Purchases</span>
                          <span className="text-slate-200">₹{simPurchases.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">To Wages (Loading)</span>
                          <span className="text-slate-200">₹{simDirectWages.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">To Carriage Inwards</span>
                          <span className="text-slate-200">₹{simCarriageIn.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-slate-800 font-bold text-emerald-400">
                          <span>To Gross Profit c/d (Balancing Fig.)</span>
                          <span>✓ ₹{simGrossProfit.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Credit Side */}
                      <div className="p-3 space-y-2">
                        <div className="text-emerald-400 font-bold border-b border-slate-800 pb-1">Cr. (Revenues & Closing Inventory)</div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">By Net Sales Revenue</span>
                          <span className="text-slate-200">₹{simSales.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">By Closing Stock (AS-2 valuation)</span>
                          <span className="text-slate-200">₹{simClosingStock.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="pt-8 text-right text-slate-500 text-[10px]">
                          COGS = ₹{simCOGS.toLocaleString('en-IN')}
                        </div>
                        <div className="flex justify-between pt-2 border-t border-slate-800 font-bold text-white">
                          <span>Total Both Sides</span>
                          <span>₹{(simSales + simClosingStock).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Observation Prompt */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-900 rounded-xl border border-amber-500/40">
                      <p className="text-xs font-bold text-amber-400 uppercase">Scientific Observation</p>
                      <p className="text-sm text-white font-medium my-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            aria-label={`Select observation: ${opt}`}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 1: P&L EXPENSE ROUTING */}
              {currentSlide === 1 && (
                <div className="space-y-5">
                  <div className="p-4 bg-slate-900 rounded-xl text-xs text-slate-300">
                    Click each expense card to re-route it between the <span className="text-gold-400 font-bold">Trading Account</span> (Direct) and the <span className="text-purple-400 font-bold">Profit & Loss Account</span> (Indirect). Observe where the costs get deducted!
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries(classifiedItems).map(([name, category]) => (
                      <motion.button
                        key={name}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Toggle classification of ${name}. Currently assigned to ${category}`}
                        onClick={() => handleToggleExpenseClass(name)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all text-left ${
                          category === 'trading'
                            ? 'bg-gold-950/70 border-gold-600 text-gold-200'
                            : 'bg-purple-950/70 border-purple-600 text-purple-200'
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold">{name}</span>
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-900/80">
                            {category === 'trading' ? 'Direct (Trading)' : 'Indirect (P&L)'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-2">
                          {category === 'trading' ? 'Affects Gross Profit margin' : 'Affects Net Profit bottom line'}
                        </p>
                      </motion.button>
                    ))}
                  </div>

                  {/* Summary Visualiser */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-around text-center text-xs">
                    <div>
                      <span className="text-slate-400 block">Gross Profit Margin</span>
                      <span className="text-lg font-bold text-emerald-400 font-mono">{simGPPercentage}%</span>
                    </div>
                    <div className="h-8 w-px bg-slate-800" />
                    <div>
                      <span className="text-slate-400 block">Estimated Net Profit</span>
                      <span className="text-lg font-bold text-amber-400 font-mono">₹{simNetProfit.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: BALANCE SHEET MARSHALLING */}
              {currentSlide === 2 && (
                <div className="space-y-5">
                  {/* SVG 3: Marshalling Diagram */}
                  <MarshallingDiagram />

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">Choose Marshalling Convention:</span>
                    <div className="flex gap-2">
                      <button
                        aria-label="Set marshalling to Order of Permanence"
                        onClick={() => {
                          setMarshallingOrder('permanence');
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          marshallingOrder === 'permanence' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        Order of Permanence
                      </button>
                      <button
                        aria-label="Set marshalling to Order of Liquidity"
                        onClick={() => {
                          setMarshallingOrder('liquidity');
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          marshallingOrder === 'liquidity' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        Order of Liquidity
                      </button>
                    </div>
                  </div>

                  {/* Marshalled Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                    {/* Liabilities Column */}
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                      <div className="font-bold text-gold-400 border-b border-slate-800 pb-1">
                        Liabilities ({marshallingOrder === 'permanence' ? 'Permanent → Due Soonest' : 'Due Soonest → Permanent'})
                      </div>
                      {marshallingOrder === 'permanence' ? (
                        <>
                          <div className="flex justify-between text-slate-200"><span>Rohit Capital (+ Net Profit)</span><span>₹7,98,000</span></div>
                          <div className="flex justify-between text-slate-300"><span>Long-term Bank Loan (SBI 5-Yr)</span><span>₹2,00,000</span></div>
                          <div className="flex justify-between text-slate-400"><span>Sundry Creditors (Suppliers)</span><span>₹1,82,000</span></div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between text-slate-400"><span>Sundry Creditors (Suppliers)</span><span>₹1,82,000</span></div>
                          <div className="flex justify-between text-slate-300"><span>Long-term Bank Loan (SBI 5-Yr)</span><span>₹2,00,000</span></div>
                          <div className="flex justify-between text-slate-200"><span>Rohit Capital (+ Net Profit)</span><span>₹7,98,000</span></div>
                        </>
                      )}
                      <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white">
                        <span>Total Liabilities</span>
                        <span>₹11,80,000</span>
                      </div>
                    </div>

                    {/* Assets Column */}
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                      <div className="font-bold text-emerald-400 border-b border-slate-800 pb-1">
                        Assets ({marshallingOrder === 'permanence' ? 'Least Liquid → Spendable Cash' : 'Spendable Cash → Fixed Assets'})
                      </div>
                      {marshallingOrder === 'permanence' ? (
                        <>
                          <div className="flex justify-between text-slate-200"><span>Goodwill (Brand Equity)</span><span>₹1,00,000</span></div>
                          <div className="flex justify-between text-slate-300"><span>Kalbadevi Shop Building</span><span>₹5,00,000</span></div>
                          <div className="flex justify-between text-slate-300"><span>Machinery & Equipment</span><span>₹2,00,000</span></div>
                          <div className="flex justify-between text-slate-400"><span>Stock in Hand (Inventory)</span><span>₹1,80,000</span></div>
                          <div className="flex justify-between text-slate-400"><span>Sundry Debtors</span><span>₹1,20,000</span></div>
                          <div className="flex justify-between text-slate-400"><span>Cash at Bank & in Hand</span><span>₹80,000</span></div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between text-slate-400"><span>Cash at Bank & in Hand</span><span>₹80,000</span></div>
                          <div className="flex justify-between text-slate-400"><span>Sundry Debtors</span><span>₹1,20,000</span></div>
                          <div className="flex justify-between text-slate-400"><span>Stock in Hand (Inventory)</span><span>₹1,80,000</span></div>
                          <div className="flex justify-between text-slate-300"><span>Machinery & Equipment</span><span>₹2,00,000</span></div>
                          <div className="flex justify-between text-slate-300"><span>Kalbadevi Shop Building</span><span>₹5,00,000</span></div>
                          <div className="flex justify-between text-slate-200"><span>Goodwill (Brand Equity)</span><span>₹1,00,000</span></div>
                        </>
                      )}
                      <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white">
                        <span>Total Assets</span>
                        <span>₹11,80,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: ACCRUAL ADJUSTMENTS SIMULATOR */}
              {currentSlide === 3 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Salaries Adjustment */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs">
                        <label htmlFor="adj-sal-slider" className="font-bold text-gold-300">Outstanding Salaries (Liability)</label>
                        <span className="font-mono text-amber-400 font-bold">+₹{adjOutstandingSal.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        id="adj-sal-slider"
                        aria-label="Adjust Outstanding Salaries in Rupees"
                        type="range"
                        min={0}
                        max={30000}
                        step={2000}
                        value={adjOutstandingSal}
                        onChange={e => {
                          setAdjOutstandingSal(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500"
                      />
                      <div className="text-[11px] text-slate-400 space-y-1 font-mono">
                        <div>P&L Debit Charge: ₹{adjSalariesPaid.toLocaleString('en-IN')} + ₹{adjOutstandingSal.toLocaleString('en-IN')} = <span className="text-white">₹{simAdjustedSalary.toLocaleString('en-IN')}</span></div>
                        <div>Balance Sheet: Show ₹{adjOutstandingSal.toLocaleString('en-IN')} under Current Liabilities</div>
                      </div>
                    </div>

                    {/* Insurance Prepaid Adjustment */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs">
                        <label htmlFor="adj-ins-slider" className="font-bold text-gold-300">Prepaid Insurance (Asset)</label>
                        <span className="font-mono text-emerald-400 font-bold">−₹{adjPrepaidIns.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        id="adj-ins-slider"
                        aria-label="Adjust Prepaid Insurance in Rupees"
                        type="range"
                        min={0}
                        max={18000}
                        step={1000}
                        value={adjPrepaidIns}
                        onChange={e => {
                          setAdjPrepaidIns(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500"
                      />
                      <div className="text-[11px] text-slate-400 space-y-1 font-mono">
                        <div>P&L Debit Charge: ₹{adjInsurancePaid.toLocaleString('en-IN')} − ₹{adjPrepaidIns.toLocaleString('en-IN')} = <span className="text-white">₹{simAdjustedInsurance.toLocaleString('en-IN')}</span></div>
                        <div>Balance Sheet: Show ₹{adjPrepaidIns.toLocaleString('en-IN')} under Current Assets</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                    <span className="text-slate-400">Total Adjusted Operating Overheads in P&L:</span>
                    <span className="font-mono text-sm font-bold text-gold-300">₹{(simAdjustedSalary + simAdjustedInsurance).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}

              {/* SLIDE 4: OPERATING PROFIT DISSECTOR */}
              {currentSlide === 4 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <label htmlFor="op-income-slider" className="text-slate-400">Non-Operating Income (Interest & Asset Gain)</label>
                        <span className="text-emerald-400 font-mono font-bold">₹{opNonOpIncome.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        id="op-income-slider"
                        aria-label="Adjust Non-Operating Income in Rupees"
                        type="range"
                        min={0}
                        max={80000}
                        step={5000}
                        value={opNonOpIncome}
                        onChange={e => {
                          setOpNonOpIncome(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <label htmlFor="op-expense-slider" className="text-slate-400">Non-Operating Expense (Loss by Fire & Donations)</label>
                        <span className="text-red-400 font-mono font-bold">₹{opNonOpExpense.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        id="op-expense-slider"
                        aria-label="Adjust Non-Operating Expense in Rupees"
                        type="range"
                        min={0}
                        max={40000}
                        step={2500}
                        value={opNonOpExpense}
                        onChange={e => {
                          setOpNonOpExpense(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-red-500"
                      />
                    </div>
                  </div>

                  {/* Mathematical Reconciliation Box */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                    <div className="flex justify-between text-slate-300">
                      <span>Net Profit as per P&L:</span>
                      <span className="font-bold text-amber-400">₹{simNetProfit.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>(+) Add Back Non-Operating Expenses:</span>
                      <span>₹{opNonOpExpense.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>(−) Subtract Non-Operating Incomes:</span>
                      <span>₹{opNonOpIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-purple-400 pt-2 border-t border-slate-800">
                      <span>Core Operating Profit (Principal Business):</span>
                      <span>₹{simOperatingProfit.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation footer */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              aria-label="Navigate to previous stage"
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Navigate to next stage"
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
              >
                Next Stage →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Launch Free Play Sandbox"
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Launch Free Play Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gold-300">Interactive Final Accounts Sandbox</h3>
              <p className="text-xs text-slate-400 mt-1">
                Zero grading pressure! Manipulate revenues, procurement costs, and adjustments to see the live breakdown chart.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Proceed to Challenge Phase"
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
            >
              Ready for Audit Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Controls */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider block border-b border-slate-800 pb-2">
                Live Input Panel
              </span>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label htmlFor="sandbox-sales" className="text-slate-400">Sales Turnover</label>
                  <span className="font-mono text-white font-bold">₹{simSales.toLocaleString('en-IN')}</span>
                </div>
                <input
                  id="sandbox-sales"
                  aria-label="Adjust Sales Turnover in Rupees"
                  type="range"
                  min={800000}
                  max={2000000}
                  step={25000}
                  value={simSales}
                  onChange={e => {
                    setSimSales(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-gold-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label htmlFor="sandbox-purchases" className="text-slate-400">Purchases (Cloth)</label>
                  <span className="font-mono text-white font-bold">₹{simPurchases.toLocaleString('en-IN')}</span>
                </div>
                <input
                  id="sandbox-purchases"
                  aria-label="Adjust Purchases value in Rupees"
                  type="range"
                  min={400000}
                  max={1400000}
                  step={25000}
                  value={simPurchases}
                  onChange={e => {
                    setSimPurchases(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-gold-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label htmlFor="sandbox-closing" className="text-slate-400">Closing Stock</label>
                  <span className="font-mono text-white font-bold">₹{simClosingStock.toLocaleString('en-IN')}</span>
                </div>
                <input
                  id="sandbox-closing"
                  aria-label="Adjust Closing Stock value in Rupees"
                  type="range"
                  min={50000}
                  max={400000}
                  step={10000}
                  value={simClosingStock}
                  onChange={e => {
                    setSimClosingStock(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <label htmlFor="sandbox-overheads" className="text-slate-400">Outstanding Overheads</label>
                  <span className="font-mono text-amber-400 font-bold">₹{adjOutstandingSal.toLocaleString('en-IN')}</span>
                </div>
                <input
                  id="sandbox-overheads"
                  aria-label="Adjust Outstanding Overheads in Rupees"
                  type="range"
                  min={0}
                  max={40000}
                  step={2000}
                  value={adjOutstandingSal}
                  onChange={e => {
                    setAdjOutstandingSal(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            {/* Right Recharts Visualiser */}
            <div className="lg:col-span-2 p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-400 mb-2">Live Financial Pipeline (₹ Breakdown)</span>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={10} tickFormatter={v => `₹${(v / 100000).toFixed(1)}L`} />
                    <Tooltip
                      formatter={(val: number) => [`₹${val.toLocaleString('en-IN')}`, 'Amount']}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-3 border-t border-slate-800">
                <div className="p-2 bg-slate-900 rounded-lg">
                  <span className="text-slate-400 text-[10px] block">Gross Profit</span>
                  <span className="text-emerald-400 font-bold">₹{simGrossProfit.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-lg">
                  <span className="text-slate-400 text-[10px] block">Operating Profit</span>
                  <span className="text-purple-400 font-bold">₹{simOperatingProfit.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-lg">
                  <span className="text-slate-400 text-[10px] block">Net Profit</span>
                  <span className="text-amber-400 font-bold">₹{simNetProfit.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (Adaptive Assessment) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Wave animation Canvas bar */}
          <div className="relative w-full h-8 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center px-3">
            <canvas ref={canvasRef} width={600} height={32} className="w-full h-full" aria-hidden="true" />
            <div className="absolute right-3 text-[10px] font-mono text-gold-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              Live Ledger Balancing Engine
            </div>
          </div>

          {/* Header Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full font-bold border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    : difficulty === 'standard'
                    ? 'bg-gold-950 text-gold-400 border-gold-800'
                    : 'bg-purple-950 text-purple-400 border-purple-800'
                }`}
              >
                {difficulty} • {challenge.competencyLevel}
              </motion.span>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Score: <span className="text-emerald-400 font-bold">{scoreBreakdown.correct}</span> / {scoreBreakdown.total}
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Box */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-800/90 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start gap-3 mb-4">
              <span className="text-xs text-gold-400 font-mono uppercase tracking-wider">
                ISC Competency Focus: {challenge.nodeId}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Hint level: {hintCount}/3
              </span>
            </div>

            <h2 className="text-base md:text-lg font-bold text-white leading-relaxed mb-6">
              {challenge.question}
            </h2>

            {/* MCQ Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-900/80 border-slate-700 hover:border-gold-500 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono border border-slate-700">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                      {showExplanation && i === challenge.correctIndex && (
                        <span className="ml-auto text-emerald-400 font-bold" aria-label="Correct answer">✓</span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Type Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-xs text-white font-medium cursor-grab shadow-sm"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-red-400 block border-b border-slate-800 pb-1">Debit Targets</span>
                    <div
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('box_dr_top')}
                      aria-label="Drop target for top debit item"
                      className="p-3 bg-slate-900/80 rounded-xl border border-dashed border-slate-700 min-h-[50px] flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-400">1. Top Debit Item:</span>
                      <span className="font-bold text-gold-300">{droppedLabels.box_dr_top || '[Drop Here]'}</span>
                    </div>
                    <div
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('box_dr_bottom')}
                      aria-label="Drop target for bottom debit item"
                      className="p-3 bg-slate-900/80 rounded-xl border border-dashed border-slate-700 min-h-[50px] flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-400">2. Bottom Debit Item:</span>
                      <span className="font-bold text-gold-300">{droppedLabels.box_dr_bottom || '[Drop Here]'}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-bold text-emerald-400 block border-b border-slate-800 pb-1">Credit Targets</span>
                    <div
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('box_cr_top')}
                      aria-label="Drop target for top credit item"
                      className="p-3 bg-slate-900/80 rounded-xl border border-dashed border-slate-700 min-h-[50px] flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-400">1. Top Credit Item:</span>
                      <span className="font-bold text-emerald-300">{droppedLabels.box_cr_top || '[Drop Here]'}</span>
                    </div>
                    <div
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('box_cr_bottom')}
                      aria-label="Drop target for bottom credit item"
                      className="p-3 bg-slate-900/80 rounded-xl border border-dashed border-slate-700 min-h-[50px] flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-400">2. Bottom Credit Item:</span>
                      <span className="font-bold text-emerald-300">{droppedLabels.box_cr_bottom || '[Drop Here]'}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showExplanation}
                  aria-label="Verify T-Account Postings"
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify T-Account Postings →
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Drag items to arrange in correct top-to-bottom sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Position ${displayIdx + 1}: ${item}. Drag to reorder`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex items-center gap-3 cursor-grab text-xs font-medium text-slate-200"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-mono text-slate-400 text-[10px]">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showExplanation}
                  aria-label="Submit Ordered Sequence"
                  onClick={handleSortSubmit}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Submit Ordered Sequence →
                </motion.button>
              </div>
            )}

            {/* Numeric Type Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 max-w-sm">
                  <span className="text-sm text-slate-400 font-mono">{challenge.unit || '₹'}</span>
                  <input
                    aria-label="Enter calculated numeric amount"
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter final calculated amount"
                    disabled={showExplanation}
                    className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={showExplanation || !numericInput}
                    aria-label="Check numeric answer"
                    onClick={() => handleAnswer(parseFloat(numericInput))}
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-amber-300">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={showExplanation}
                      aria-label={`Add component ${part}`}
                      onClick={() => handleConstructAdd(part)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                {/* Construction Workbench */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2" aria-label="Journal entry assembly workbench">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-gold-900/80 border border-gold-600 text-gold-200 rounded-lg text-xs font-mono flex items-center gap-2"
                    >
                      {part}
                      <button aria-label={`Remove ${part}`} onClick={() => handleConstructRemove(i)} className="text-red-400 hover:text-red-300 font-bold">×</button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-600 text-xs italic">Click parts above to assemble journal entry...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify entry construction"
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Entry Construction →
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Rationale Disclosure */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 rounded-2xl border border-amber-600/50 space-y-3"
              >
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider block">
                  Accounting Rationale & Audit Standard Breakdown
                </span>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((step, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-amber-200/90 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400 font-mono">{idx + 1}.</span> {step}
                        {!step.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-amber-900/60">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Reveal next step of explanation"
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-700/60 hover:bg-amber-600 text-white text-xs font-bold rounded-lg"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Audit Session' : 'Next Challenge'}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Audit Session →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION ARC ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-800/90 rounded-3xl border border-slate-700 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center text-3xl mx-auto border border-emerald-500/40" aria-label="Success checkmark">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-white">Audit Certification Completed!</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Rohit Traders’ final accounts have been reconciled, marshalled, and adjusted in full accordance with CISCE Class 11 and ICAI standards.
            </p>

            <div className="flex justify-center gap-6 pt-2 font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] text-slate-400 block uppercase">Final Score</span>
                <span className="text-xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] text-slate-400 block uppercase">Mastery Tier</span>
                <span className="text-xl font-bold text-gold-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 rounded-2xl bg-gold-950/40 border border-gold-800/60 text-xs text-gold-200 leading-relaxed">
            <span className="font-bold text-gold-300 text-sm block mb-1">CFO Performance Assessment:</span>
            {errors === 0
              ? 'PERFECT SCORE! Outstanding command of Trading margins, AS-1 accruals, AS-2 inventory valuation, and PDD sequences.'
              : errors <= 3
              ? 'Great competency! Your classification between direct and indirect items is robust. Review the subtle provision deductions below for 100% mastery.'
              : 'Good effort! Accounting cycles require repeated practice with dual-effects. Review your misconception profile below and retry the simulation.'}
          </div>

          {/* Misconception Gaps Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <span className="text-xs uppercase font-bold text-rose-400 tracking-wider block">
                Targeted Misconception Profile (Gaps to Strengthen)
              </span>
              <div className="space-y-2">
                {hitMisconceptions.map(idx => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-300 font-semibold">✗ Trap: {m.misconception}</div>
                      <div className="text-emerald-300">✓ Audit Rule: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── REFLECTION SECTION (NEP 2020 Metacognition) ─── */}
          <div className="p-6 bg-slate-950 rounded-2xl border border-gold-900/60 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <span aria-hidden="true">🧠</span>
              <span>Metacognitive Reflection</span>
            </div>
            <p className="text-xs text-slate-300">
              Deepen your learning retention by reflecting on the core principles you practiced today:
            </p>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label htmlFor="reflection-surprising" className="font-semibold text-gold-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="reflection-surprising"
                  rows={2}
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., Why Carriage Outwards goes to P&L and not Trading Account, or how excess PDD gets credited back..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="reflection-explain" className="font-semibold text-gold-300 block">
                  2. How would you explain the difference between Gross Profit and Operating Profit to a friend?
                </label>
                <textarea
                  id="reflection-explain"
                  rows={2}
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g., Gross profit only counts direct buying & selling costs, while operating profit factors in office overheads too..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="reflection-reallife" className="font-semibold text-gold-300 block">
                  3. Where in real life might you use this financial statements framework?
                </label>
                <textarea
                  id="reflection-reallife"
                  rows={2}
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g., Evaluating whether my family store is profitable from pure sales or propped up by rental income..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Next SRS Spaced Review Scheduled In:</span>
            <span className="font-bold text-amber-400 font-mono">
              {errors === 0 ? '7 Days (SM-2 Interval)' : errors <= 3 ? '3 Days' : '1 Day'}
            </span>
          </div>

          {/* Real World Scenario Completion Arc */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-gold-300 font-bold text-sm">
              <span aria-hidden="true">🚀</span>
              <span>{REAL_WORLD_ACTIVITY.title}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-300">
                  <span className="text-gold-400 font-bold font-mono mr-1.5">{i + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating System Widgets */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Certified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_AccountancyTradingAccountMeaningSim;
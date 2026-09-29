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
  Cell as RechartsCell,
} from 'recharts';

// ─── NODE ID CONSTANTS (String Literals) ───
const NODE_C12_ACC_061 = 'c12_acc_061';
const NODE_C12_ACC_062 = 'c12_acc_062';
const NODE_C12_ACC_063 = 'c12_acc_063';
const NODE_C12_ACC_064 = 'c12_acc_064';
const NODE_C12_ACC_065 = 'c12_acc_065';
const NODE_C12_ACC_066 = 'c12_acc_066';
const NODE_C12_ACC_067 = 'c12_acc_067';
const NODE_C12_ACC_068 = 'c12_acc_068';
const NODE_C12_ACC_069 = 'c12_acc_069';
const NODE_C12_ACC_070 = 'c12_acc_070';

const ALL_NODE_IDS = [
  NODE_C12_ACC_061,
  NODE_C12_ACC_062,
  NODE_C12_ACC_063,
  NODE_C12_ACC_064,
  NODE_C12_ACC_065,
  NODE_C12_ACC_066,
  NODE_C12_ACC_067,
  NODE_C12_ACC_068,
  NODE_C12_ACC_069,
  NODE_C12_ACC_070,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Audit & Valuation of Bharat Dynamics Ltd.',
  intro: 'You are the Lead Financial Analyst auditing Bharat Dynamics Ltd (an Indian engineering & defense manufacturing enterprise) before its major IPO expansion on the NSE. The Board of Directors needs a forensic ratio assessment and an automated spreadsheet model to evaluate liquidity, operational velocity, capital productivity, and shareholder returns.',
  context: 'Review Schedule III Statement of Profit and Loss, derive operating efficiency metrics, test what-if pricing/cost shocks, and ensure full compliance with CISCE and ICAI standards.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Bharat Dynamics generates ₹1,200 Cr revenue with ₹100 Cr working capital. If raw material inflation forces working capital to double to ₹200 Cr while revenue stays flat, what happens to its Working Capital Turnover Ratio?',
  options: [
    'It doubles from 12 times to 24 times (higher funds = higher turnover)',
    'It drops by half from 12 times to 6 times (funds turnover velocity slows down)',
    'It stays exactly 12 times because revenue is unchanged',
    'It converts into a 50% percentage margin',
  ],
  correctIndex: 1,
  hintAfter: 'Velocity = Flow / Stock. When the tied-up stock doubles for the same flow, turnover frequency halves! Let us explore the math visually.',
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

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation: Recall (c12_acc_061)
  {
    id: 'ch_01_wct_formula',
    nodeId: NODE_C12_ACC_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to CISCE Class 12 specifications, what is the exact formula for Working Capital Turnover Ratio?',
    options: [
      'Working Capital Turnover = Revenue from Operations / Working Capital (expressed in times)',
      'Working Capital Turnover = (Working Capital / Total Assets) × 100 (expressed in %)',
      'Working Capital Turnover = Cost of Revenue from Operations / Current Liabilities',
      'Working Capital Turnover = Net Profit after Tax / Working Capital',
    ],
    correctIndex: 0,
    explanation: 'Working Capital Turnover Ratio = Revenue from Operations / Working Capital. It measures how many times working capital turns into revenue per year and is expressed in "times".',
    hints: [
      'Remember that turnover ratios compare an operating flow (revenue or cost) with a balance sheet stock.',
      'Working capital is Current Assets minus Current Liabilities.',
      'The numerator is Revenue from Operations and the unit is pure multiple ("times").',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation: Understanding (c12_acc_062)
  {
    id: 'ch_02_itr_numerator',
    nodeId: NODE_C12_ACC_062,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does the Inventory Turnover Ratio use Cost of Revenue from Operations in the numerator, whereas Working Capital Turnover uses Revenue from Operations?',
    options: [
      'It is an arbitrary accounting rule with no mathematical reason.',
      'Average Inventory is valued at cost; matching numerator at cost prevents gross margin markup distortion.',
      'Cost of Revenue from Operations is always larger than Revenue from Operations.',
      'Working Capital cannot be computed from Schedule III.',
    ],
    correctIndex: 1,
    explanation: 'Average Inventory in the denominator is carried at cost price. For internal consistency, the numerator must also be at cost (Cost of Revenue from Operations). Using sales would artificially inflate turnover due to profit markups.',
    hints: [
      'Think about valuation: how is closing inventory valued on a balance sheet? At cost or NRV.',
      'To make numerator and denominator comparable, both should share the cost valuation basis.',
      'Matching cost with cost gives an authentic inventory velocity without profit markup distortion.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation: Drag-Label (c12_acc_065)
  {
    id: 'ch_03_operating_classification',
    nodeId: NODE_C12_ACC_065,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Classify each P&L expense item by dragging it to its exact accounting category for Operating Ratio derivation.',
    dragItems: [
      { label: 'Factory Direct Wages', targetId: 'box_cost_of_rev' },
      { label: 'Office Admin Salaries', targetId: 'box_operating_exp' },
      { label: 'Debenture Interest', targetId: 'box_non_operating' },
      { label: 'Scrap Sales Income', targetId: 'box_operating_inc' },
    ],
    correctMapping: {
      box_cost_of_rev: 'Factory Direct Wages',
      box_operating_exp: 'Office Admin Salaries',
      box_non_operating: 'Debenture Interest',
      box_operating_inc: 'Scrap Sales Income',
    },
    explanation: 'Direct production expenses belong to Cost of Revenue; administrative/selling overheads are Operating Expenses; financing costs (interest) are Non-Operating; scrap sales represent Operating Income.',
    hints: [
      'Factory wages go directly into manufacturing cost.',
      'Office salaries run general operations.',
      'Debenture interest arises from financing choices, making it strictly non-operating.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation: Numeric (c12_acc_063)
  {
    id: 'ch_04_gpr_numeric',
    nodeId: NODE_C12_ACC_063,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Hindustan Unilever Ltd reports Revenue from Operations of ₹50,000 Cr and Cost of Revenue from Operations of ₹30,000 Cr. Calculate the Gross Profit Ratio in percentage (%).',
    correctAnswer: 40,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Gross Profit = ₹50,000 Cr − ₹30,000 Cr = ₹20,000 Cr. Gross Profit Ratio = (20,000 / 50,000) × 100 = 40.0%.',
    hints: [
      'Find Gross Profit first: Revenue from Operations minus Cost of Revenue.',
      'Gross Profit = 50,000 − 30,000 = 20,000 Cr.',
      'Divide Gross Profit by Revenue (50,000) and multiply by 100.',
    ],
  },
  // 5. Foundation: Recall (c12_acc_070)
  {
    id: 'ch_05_excel_recalc',
    nodeId: NODE_C12_ACC_070,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the single defining feature that distinguishes an electronic spreadsheet (like MS Excel 2019) from a manual paper worksheet?',
    options: [
      'Automatic recalculation: when any input cell changes, dependent formulas update instantly',
      'The ability to store text in Arial font',
      'Having rectangular grid borders printed on paper',
      'Requiring a calculator for adding column subtotals',
    ],
    correctIndex: 0,
    explanation: 'Automatic recalculation is the core defining merit: editing any input cell instantly triggers dynamic recalculation of all linked formulas across workbooks.',
    hints: [
      'Think about what happens when you alter a single number in cell B2.',
      'Manual ledgers require re-adding every row by hand.',
      'Excel re-evaluates all dependent mathematical expressions instantly.',
    ],
    misconceptionIndex: 4,
  },
  // 6. Foundation: Application (c12_acc_067)
  {
    id: 'ch_06_eps_basic',
    nodeId: NODE_C12_ACC_067,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'TCS reports Net Profit after Tax of ₹4,000 Cr. It has no preference share capital and 100 Cr equity shares of ₹1 each fully paid up. Calculate Earning per Share (EPS) in ₹.',
    correctAnswer: 40,
    tolerance: 0.1,
    unit: '₹ per share',
    explanation: 'EPS = (Net Profit after Tax − Preference Dividend) / Number of Equity Shares = (₹4,000 Cr − 0) / 100 Cr shares = ₹40.00 per share.',
    hints: [
      'Preference dividend is ₹0 because there are no preference shares.',
      'Divide total equity earnings (₹4,000 Cr) by the number of equity shares (100 Cr).',
      '4,000 / 100 = 40.',
    ],
  },
  // 7. Foundation: Drag-Sort (c12_acc_064)
  {
    id: 'ch_07_npat_waterfall_sort',
    nodeId: NODE_C12_ACC_064,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of steps to compute Net Profit after Tax starting from Revenue from Operations as per Schedule III.',
    sortItems: [
      'Deduct Cost of Revenue from Operations to get Gross Profit',
      'Add Other Non-Operating and Operating Incomes',
      'Deduct Indirect Expenses (Admin, Selling, Finance Costs, Depreciation)',
      'Deduct Provision for Tax to reach Net Profit after Tax (NPAT)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The standard P&L sequence: 1. Gross Profit = Revenue − Cost; 2. Add Other Income; 3. Subtract Indirect Expenses to get Profit Before Tax; 4. Subtract Tax Provision to get NPAT.',
    hints: [
      'Start with direct production profit (Gross Profit).',
      'Add supplementary inflows next.',
      'Subtract operating & non-operating overheads, and deduct income tax at the final stage.',
    ],
  },
  // 8. Standard: Application (c12_acc_061)
  {
    id: 'ch_08_wct_maruti',
    nodeId: NODE_C12_ACC_061,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Maruti Suzuki reports Revenue from Operations of ₹1,20,000 Cr. Total Current Assets are ₹32,000 Cr and Total Current Liabilities are ₹22,000 Cr. Calculate Working Capital Turnover Ratio (in times).',
    correctAnswer: 12,
    tolerance: 0.1,
    unit: 'times',
    explanation: 'Working Capital = CA − CL = 32,000 − 22,000 = ₹10,000 Cr. Working Capital Turnover Ratio = ₹1,20,000 Cr / ₹10,000 Cr = 12 times.',
    hints: [
      'First compute Working Capital = Current Assets minus Current Liabilities.',
      'Working Capital = ₹32,000 Cr − ₹22,000 Cr = ₹10,000 Cr.',
      'Divide Revenue (1,20,000) by Working Capital (10,000).',
    ],
  },
  // 9. Standard: Analysis (c12_acc_062)
  {
    id: 'ch_09_itr_holding_days',
    nodeId: NODE_C12_ACC_062,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Tata Steel reports Cost of Revenue from Operations of ₹2,00,000 Cr. Opening Inventory is ₹18,000 Cr and Closing Inventory is ₹22,000 Cr. What is the Inventory Holding Period in days (use 365 days)?',
    correctAnswer: 36.5,
    tolerance: 0.5,
    unit: 'days',
    explanation: 'Average Inventory = (18,000 + 22,000)/2 = ₹20,000 Cr. Inventory Turnover = 2,00,000 / 20,000 = 10 times. Holding Period = 365 / 10 = 36.5 days.',
    hints: [
      'Find Average Inventory = (Opening + Closing) / 2 = 20,000 Cr.',
      'Inventory Turnover = Cost of Revenue / Average Inventory = 2,00,000 / 20,000 = 10 times.',
      'Holding Period = 365 / 10 = 36.5 days.',
    ],
  },
  // 10. Standard: Analysis & Identity (c12_acc_065 & 066)
  {
    id: 'ch_10_operating_identity',
    nodeId: NODE_C12_ACC_066,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An auditor calculates Operating Ratio as 77.7% for Asian Paints. By mathematical identity, what must be the Operating Profit Ratio for the same accounting period?',
    options: [
      '22.3% because Operating Ratio + Operating Profit Ratio = 100%',
      '12.3% after deducting corporate tax rate of 10%',
      '77.7% because both measure operating strength',
      'Cannot be determined without knowing Net Profit before Tax',
    ],
    correctIndex: 0,
    explanation: 'Operating Ratio and Operating Profit Ratio are arithmetic complements that partition Revenue from Operations: Operating Ratio + Operating Profit Ratio = 100%. Therefore, 100% − 77.7% = 22.3%.',
    hints: [
      'Operating costs and operating profits together account for 100% of revenue from operations.',
      'Subtract the Operating Ratio from 100%.',
      '100% − 77.7% = 22.3%.',
    ],
  },
  // 11. Standard: Application (c12_acc_067)
  {
    id: 'ch_11_eps_preference_deduction',
    nodeId: NODE_C12_ACC_067,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Bharat Electronics reports NPAT of ₹250 Cr. It has 50 lakh 10% Preference Shares of ₹100 each, and 2 Cr Equity Shares of ₹10 each. Calculate EPS in ₹ per equity share.',
    correctAnswer: 122.5,
    tolerance: 0.5,
    unit: '₹ per share',
    explanation: 'Preference Capital = 50,00,000 × ₹100 = ₹50 Cr. Preference Dividend = 10% of ₹50 Cr = ₹5 Cr. Earnings for Equity = ₹250 Cr − ₹5 Cr = ₹245 Cr. EPS = ₹245 Cr / 2 Cr shares = ₹122.50.',
    hints: [
      'Calculate total preference share capital: 50,00,000 × ₹100 = ₹50 Cr.',
      'Preference dividend = 10% of ₹50 Cr = ₹5 Cr.',
      'Deduct preference dividend from NPAT: ₹250 Cr − ₹5 Cr = ₹245 Cr. Then divide by 2 Cr shares.',
    ],
    misconceptionIndex: 3,
  },
  // 12. Standard: Valuation Application (c12_acc_068)
  {
    id: 'ch_12_pe_ratio_calc',
    nodeId: NODE_C12_ACC_068,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Infosys equity shares trade at ₹1,500 on the NSE. Its EPS for the financial year is ₹60. What is its Price Earning (P/E) Ratio in times?',
    correctAnswer: 25,
    tolerance: 0.1,
    unit: 'times',
    explanation: 'Price Earning Ratio = Market Value per Share / EPS = ₹1,500 / ₹60 = 25 times. The market pays ₹25 for every ₹1 of annual earnings.',
    hints: [
      'P/E = Market Price per share divided by Earning per share.',
      'Do not use the face value of the share.',
      'Divide 1,500 by 60 = 25 times.',
    ],
  },
  // 13. Standard: Construct Equation (c12_acc_069)
  {
    id: 'ch_13_roi_construct',
    nodeId: NODE_C12_ACC_069,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble the CISCE numerator formula for Return on Investment (ROI) to isolate core operating return on long-term funds.',
    availableParts: [
      'NPAT',
      '+',
      'Provision_for_Tax',
      '+',
      'Interest_on_Long_Term_Borrowings',
      '−',
      'Interest_on_Non_Trade_Investments',
    ],
    targetState: 'NPAT + Provision_for_Tax + Interest_on_Long_Term_Borrowings − Interest_on_Non_Trade_Investments',
    validationHint: 'Add back Tax and Long-term Interest to NPAT, then deduct Non-Trade Investment Income.',
    explanation: 'NPBIT for ROI = Net Profit after Tax + Provision for Tax + Interest on Long-term Borrowings − Interest on Non-Trade Investments. Non-trade income is stripped out because non-trade assets are not operating capital.',
    hints: [
      'Start with bottom line Net Profit after Tax (NPAT).',
      'Add back Tax and Interest on Long-Term Debt.',
      'Subtract Interest on Non-Trade Investments.',
    ],
  },
  // 14. Standard: Electronic Spreadsheet Formula (c12_acc_070)
  {
    id: 'ch_14_excel_syntax',
    nodeId: NODE_C12_ACC_070,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In Microsoft Excel 2019, if Opening Capital of Partner A is in cell B2 (₹6,00,000) and interest rate is 8% p.a., which formula correctly computes the annual interest in cell C2?',
    options: [
      '=B2*8%',
      'B2 * 8%',
      '=SUM(B2*0.08)/100',
      '=CALCULATE(B2, 8%)',
    ],
    correctIndex: 0,
    explanation: 'In Excel, all formulas must begin with an equal sign ("="). The syntax =B2*8% or =B2*0.08 correctly computes 8% of the value in B2.',
    hints: [
      'All valid Excel formulas must start with a special character.',
      'An equals sign ("=") initiates formula evaluation.',
      'The expression =B2*8% directly multiplies cell B2 by 0.08.',
    ],
  },
  // 15. Advanced: Evaluation (c12_acc_061)
  {
    id: 'ch_15_wct_evaluation',
    nodeId: NODE_C12_ACC_061,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Reliance Industries shows a Working Capital Turnover of 35 times, whereas Larsen & Toubro (L&T) shows 4 times. What is the soundest financial evaluation?',
    options: [
      'L&T is severely mismanaged and should immediately fire its working capital managers.',
      'Different business models dictate normal turnover: Reliance retail/petrochem has rapid cash flow, while L&T engineering projects take 2-3 years with high WIP.',
      'Reliance is in danger of imminent bankruptcy because its ratio is far too high.',
      'Working Capital Turnover cannot be compared unless both firms have the exact same share capital.',
    ],
    correctIndex: 1,
    explanation: 'Turnover ratios reflect industry asset velocity. Heavy EPC engineering firms like L&T carry multi-year Work-in-Progress and project receivables (normal ratio 3-5 times), whereas FMCG/retail turn stock in days.',
    hints: [
      'Consider the production cycle duration in construction/EPC vs retail & oil refining.',
      'L&T builds metro rails and bridges requiring years of WIP.',
      'Industry norms and operating cycles govern optimal turnover levels.',
    ],
  },
  // 16. Advanced: Competency Application (c12_acc_069)
  {
    id: 'ch_16_roi_complex_calc',
    nodeId: NODE_C12_ACC_069,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Tata Steel reports: NPAT ₹8,000 Cr, Tax ₹2,000 Cr, Long-Term Debt Interest ₹6,400 Cr, Non-Trade Investment Income ₹400 Cr. Capital Employed is ₹1,60,000 Cr. Calculate Return on Investment (ROI) in %.',
    correctAnswer: 10,
    tolerance: 0.1,
    unit: '%',
    explanation: 'NPBIT = NPAT (8,000) + Tax (2,000) + Interest (6,400) − Non-Trade Income (400) = ₹16,000 Cr. ROI = (16,000 / 1,60,000) × 100 = 10.0%.',
    hints: [
      'Compute adjusted NPBIT: 8,000 + 2,000 + 6,400 − 400 = 16,000 Cr.',
      'Capital Employed = 1,60,000 Cr.',
      'ROI = (16,000 / 1,60,000) × 100 = 10%.',
    ],
  },
  // 17. Advanced: Analysis & Misconception (c12_acc_062)
  {
    id: 'ch_17_loose_tools_treatment',
    nodeId: NODE_C12_ACC_062,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When computing Average Inventory for the Inventory Turnover Ratio under CISCE guidelines, why are "Loose Tools and Spare Parts" excluded even though Schedule III lists them under Inventories?',
    options: [
      'Loose tools and spares are factory maintenance aids and not trading stock held for resale or manufacturing conversion.',
      'Because loose tools have zero monetary value.',
      'Because loose tools belong to Current Liabilities.',
      'Because the Companies Act bans tools from being counted on balance sheets.',
    ],
    correctIndex: 0,
    explanation: 'Loose tools and machinery spares are manufacturing consumables/aids. They are not goods held for trading or conversion into saleable finished inventory; including them would distort inventory turnover velocity.',
    hints: [
      'Are wrenches, jigs, and dies sold to customers?',
      'No, they maintain machines inside the factory.',
      'Only raw materials, WIP, and finished trading goods represent operating trading inventory.',
    ],
    misconceptionIndex: 1,
  },
  // 18. Advanced: Evaluation (c12_acc_068)
  {
    id: 'ch_18_pe_vs_yield',
    nodeId: NODE_C12_ACC_068,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student calculates EPS / Market Price = 4% and labels it "Price Earning Ratio = 4 times". Critique this result.',
    options: [
      'The calculation is correct; P/E is always expressed as a percentage.',
      'The student inverted the formula, computing Earnings Yield (4%) instead of P/E Ratio (Market Price / EPS = 25 times).',
      'The student forgot to subtract preference dividend twice.',
      'The P/E ratio cannot be computed without knowing the dividend payout ratio.',
    ],
    correctIndex: 1,
    explanation: 'P/E = Market Price / EPS (expressed as a multiple, e.g. 25 times). Inverting to EPS / Market Price gives the Earnings Yield (4.0%), which is its reciprocal percentage.',
    hints: [
      'Check the numerator and denominator: P/E puts Price on top.',
      'Price (₹100) / EPS (₹4) = 25 times.',
      'EPS / Price = 4 / 100 = 4% = Earnings Yield.',
    ],
  },
  // 19. Advanced: Gap Analysis (c12_acc_063 & 064)
  {
    id: 'ch_19_gap_analysis',
    nodeId: NODE_C12_ACC_064,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Company X has a Gross Profit Ratio of 45% but a Net Profit Ratio of only 5%. What does this wide 40% gap specifically reveal to an analyst?',
    options: [
      'The company has poor factory manufacturing efficiency and expensive raw material suppliers.',
      'The company has heavy indirect overheads, large financing debt costs, heavy depreciation, or high tax burdens eroding gross surplus.',
      'The company is hiding sales revenue from tax authorities.',
      'Working capital turnover must be negative.',
    ],
    correctIndex: 1,
    explanation: 'Gross Profit Ratio isolates direct factory efficiency. The gap (GPR − NPR = 40%) measures the total indirect burden: administrative, selling & distribution, interest on loans, depreciation, and corporate taxes.',
    hints: [
      'Gross profit was strong at 45%, so direct manufacturing is profitable.',
      'Where did the remaining 40% go between gross profit and bottom-line NPAT?',
      'Indirect overheads, marketing expenses, debt interest, and income taxes consumed the surplus.',
    ],
  },
  // 20. Advanced: Creativity / Practical Design (c12_acc_070)
  {
    id: 'ch_20_spreadsheet_audit',
    nodeId: NODE_C12_ACC_070,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are designing an audit model in Excel 2019 to verify that Schedule III Total Assets equals Total Equity & Liabilities. Which validation formula ensures dynamic balance verification?',
    options: [
      '=IF(B50=D50, "Balanced ✓", "Mismatch Error: " & (B50-D50))',
      '=SUM(B1:B50) = PRINT("OK")',
      '=COMPARE_BALANCE_SHEET(Assets, Liabilities)',
      '=CHECK(B50, D50, 100)',
    ],
    correctIndex: 0,
    explanation: 'Using an IF logic formula with cell references (=IF(B50=D50, "Balanced ✓", "Mismatch Error: " & (B50-D50))) dynamically alerts the auditor if the Balance Sheet fails to balance.',
    hints: [
      'Excel uses logical IF functions: =IF(condition, value_if_true, value_if_false).',
      'Comparing Assets cell (B50) with Liabilities cell (D50) provides dynamic real-time auditing.',
      'Concatenating the difference helps pinpoint the mismatch value.',
    ],
  },
  // 21. Advanced: Drag-Sort (c12_acc_069)
  {
    id: 'ch_21_capital_employed_sort',
    nodeId: NODE_C12_ACC_069,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the components of Capital Employed (Liabilities Side Approach) in order from pure ownership equity down to long-term provisions.',
    sortItems: [
      'Shareholders’ Funds (Equity Capital + Preference Capital + Reserves & Surplus)',
      'Long-Term Borrowings (Debentures + Bank Term Loans)',
      'Long-Term Provisions (Provision for Gratuity/Employee Benefits)',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Capital Employed (Liabilities approach) = Shareholders’ Funds + Long-Term Borrowings + Long-Term Provisions. This aggregates all permanent long-term capital deployed.',
    hints: [
      'Start with internal ownership equity and reserves.',
      'Add external long-term debt and debentures second.',
      'Add non-current provisions at the bottom.',
    ],
  },
  // 22. Advanced: Application & Buyback Impact (c12_acc_067)
  {
    id: 'ch_22_buyback_eps_impact',
    nodeId: NODE_C12_ACC_067,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Infosys executes a share buyback, repurchasing 10% of its equity shares while Net Profit after Tax remains unchanged. What is the mathematical impact on EPS and P/E ratio (assuming constant market cap)?',
    options: [
      'EPS decreases by 10%; P/E increases.',
      'EPS increases because denominator shrinks; per-share market price adjusts accordingly.',
      'EPS is unchanged because net profit is unchanged.',
      'EPS becomes zero because buybacks cancel shares.',
    ],
    correctIndex: 1,
    explanation: 'EPS = Net Profit / Equity Shares. If the denominator decreases by 10% with constant profit, EPS rises by ~11.1% (e.g. 100/90 = 1.11). Buybacks concentrate earnings among fewer shares.',
    hints: [
      'Look at the EPS fraction: Numerator (Profit) / Denominator (Shares).',
      'If the denominator becomes smaller, the resulting fraction value increases.',
      'Fewer shares sharing the same profit pool means higher earnings per remaining share.',
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
  nodeId: NODE_C12_ACC_061,
  title: 'Financial Ratios & Spreadsheet Masterclass',
  definition:
    'Comprehensive ISC Class 12 ratio analysis covering Working Capital Turnover, Inventory Velocity, Profitability Stack (Gross, Net, Operating), Equity Valuation (EPS, P/E, ROI), and Electronic Spreadsheet automation under Companies Act 2013 Schedule III.',
  eli5:
    'Think of running a business like a racing car: Working Capital & Inventory turnover measure speed of wheels (how fast money cycles), Profitability ratios measure fuel efficiency (how much profit remains after costs), and ROI/EPS measure prize money per rupee invested.',
  misconceptions: [
    {
      misconception: 'Working Capital means Fixed Assets minus Long-Term Loans.',
      correction: 'Working Capital is strictly Current Assets minus Current Liabilities. Fixed assets belong to Capital Employed.',
    },
    {
      misconception: 'Loose tools and machine spares should be included in Inventory Turnover calculation.',
      correction: 'Loose tools are manufacturing equipment aids, not trading inventory; they must be excluded from Average Inventory.',
    },
    {
      misconception: 'Interest on debentures is an Operating Expense in the Operating Ratio.',
      correction: 'Interest is a financing cost resulting from debt decisions, making it strictly Non-Operating.',
    },
    {
      misconception: 'Preference Dividend does not need to be deducted from NPAT when calculating EPS.',
      correction: 'Preference shareholders have a prior legal charge on profit; their dividend must be deducted before attributing earnings to equity holders.',
    },
    {
      misconception: 'An electronic spreadsheet is just a static table of numbers typed into boxes.',
      correction: 'A spreadsheet is defined by dynamic automatic recalculation driven by formulas and cell addresses.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the formula for Working Capital Turnover Ratio?',
      options: ['Revenue from Operations / Working Capital', 'Working Capital / Current Assets', 'Gross Profit / Working Capital', 'Net Profit / Current Liabilities'],
      correctIndex: 0,
    },
    {
      question: 'Which denominator is used in Gross Profit Ratio?',
      options: ['Cost of Revenue from Operations', 'Revenue from Operations', 'Average Inventory', 'Capital Employed'],
      correctIndex: 1,
    },
    {
      question: 'Operating Ratio + Operating Profit Ratio equals:',
      options: ['50%', '100%', 'Gross Profit Ratio', 'Net Profit Ratio'],
      correctIndex: 1,
    },
    {
      question: 'In EPS computation, what is subtracted from Net Profit after Tax?',
      options: ['Income Tax', 'Debenture Interest', 'Preference Dividend', 'Depreciation'],
      correctIndex: 2,
    },
    {
      question: 'Price Earning (P/E) Ratio is expressed as:',
      options: ['Percentage (%)', 'Multiple (times)', 'Rupees (₹)', 'Ratio (x:y)'],
      correctIndex: 1,
    },
    {
      question: 'Non-Trade Investment Interest is ______ from NPBIT for ROI.',
      options: ['Added', 'Deducted', 'Multiplied', 'Ignored'],
      correctIndex: 1,
    },
    {
      question: 'Capital Employed on the assets side equals:',
      options: ['Total Assets', 'Non-Current Assets + Working Capital', 'Current Assets − Current Liabilities', 'Fixed Assets + Investments'],
      correctIndex: 1,
    },
    {
      question: 'In Excel 2019, all formulas must start with:',
      options: ['#', '@', '=', ':'],
      correctIndex: 2,
    },
  ],
  masteryCriteria:
    'Mastery over all 10 ratio and spreadsheet competencies with adaptive BKT score >= 85%.',
};

// ─── EXPLORATION STEPS (Interactive guided learning) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Working Capital Velocity Lab',
    instruction: 'Adjust the Revenue and Working Capital sliders. Observe how turnover times scale and see real-time cash cycle speed.',
    interactionType: 'slider-wct',
    nodeId: NODE_C12_ACC_061,
  },
  {
    title: '2. The Profitability Waterfall (Gross → Operating → Net)',
    instruction: 'Drag cost sliders to watch revenue get sliced by direct costs, operating overheads, loan interest, and taxes.',
    interactionType: 'slider-profit-stack',
    nodeId: NODE_C12_ACC_063,
  },
  {
    title: '3. Operating Ratio vs Operating Profit Complement',
    instruction: 'Toggle between Operating Cost & Operating Profit to visually verify the 100% arithmetic identity.',
    interactionType: 'identity-check',
    nodeId: NODE_C12_ACC_065,
  },
  {
    title: '4. Capital Productivity & Equity Valuation (EPS, P/E, ROI)',
    instruction: 'Adjust Market Price and Share Count to see how equity market multiples respond dynamically.',
    interactionType: 'valuation-sim',
    nodeId: NODE_C12_ACC_068,
  },
  {
    title: '5. Electronic Spreadsheet Recalculation Engine',
    instruction: 'Edit live cell values in this interactive Excel grid and watch formulas auto-recalculate in real-time!',
    interactionType: 'live-spreadsheet',
    nodeId: NODE_C12_ACC_070,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Bharat Dynamics cuts operating overhead expenses from ₹300 Cr to ₹150 Cr while Revenue stays at ₹1,000 Cr, what happens to its Operating Ratio?',
    options: [
      'Operating Ratio will decrease (e.g. from 80% to 65%), boosting operating margin',
      'Operating Ratio will increase because costs are lower',
      'Operating Ratio will remain constant at 100%',
      'Operating Ratio will convert into an activity ratio',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now lower Operating Expenses in the Profitability Lab to verify that lower operating costs reduce the Operating Ratio.',
    nodeId: NODE_C12_ACC_065,
  },
  {
    question: 'Predict: If an engineering company increases long-term debt borrowings at 10% interest, will its Return on Investment (ROI) ratio change immediately?',
    options: [
      'No, because ROI uses NPBIT (before interest) and Capital Employed includes both debt and equity',
      'Yes, ROI will plunge to zero because of debt interest',
      'Yes, ROI will automatically double',
      'ROI cannot be computed for leveraged companies',
    ],
    correctIndex: 0,
    verifyInstruction: 'Check the ROI formula: NPBIT adds back interest, making ROI capital-structure neutral!',
    nodeId: NODE_C12_ACC_069,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the sum of Operating Ratio and Operating Profit Ratio as you manipulate costs?',
    observableOptions: [
      'Their sum is ALWAYS exactly 100%, because they partition revenue',
      'Their sum fluctuates between 50% and 150%',
      'They both increase together at the same time',
      'Their sum equals the Working Capital Turnover Ratio',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_ACC_065,
  },
  {
    question: 'In the live spreadsheet model, what happens the instant you change cell B2 (Opening Capital)?',
    observableOptions: [
      'Nothing happens until you restart the computer',
      'Every dependent formula (Interest, Profit Share, Total Closing) updates instantly',
      'Only cell B2 changes, all other cells show error #VALUE',
      'The spreadsheet saves a duplicate file on paper',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_ACC_070,
  },
];

// ──�� REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Lead Financial Analyst: Tata Motors vs Mahindra & Mahindra',
  description:
    'Download the published FY 2023-24 Annual Reports of Tata Motors Ltd and Mahindra & Mahindra Ltd. Compute their Working Capital Turnover, Operating Ratio, EPS, and Return on Investment in an Excel spreadsheet. Prepare a 3-point recommendation note for an institutional mutual fund investor.',
  steps: [
    'Extract Revenue from Operations, Cost of Materials, Current Assets, and Current Liabilities from Schedule III.',
    'Compute Working Capital Turnover and Inventory Holding Days.',
    'Build the Profitability Stack (Gross, Operating, Net Margin) and compute ROI.',
    'Formulate a valuation summary comparing their P/E multiples on the NSE.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
export function C12_AccountancyWorkingCapitalTurnoverSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['accountancy'] || {
    name: 'Accountancy',
    emoji: '📑',
    color: 'emerald',
  };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── BRILLIANT.ORG INTERACTION STATES ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [selectedTopicTab, setSelectedTopicTab] = useState<'wct' | 'profit' | 'valuation' | 'excel'>('wct');

  // ─── SIMULATION LAB CONTROL STATES ───
  const [simRevenue, setSimRevenue] = useState(1200); // in Cr
  const [simCurrentAssets, setSimCurrentAssets] = useState(300);
  const [simCurrentLiabilities, setSimCurrentLiabilities] = useState(200);
  const [simCostOfRevenue, setSimCostOfRevenue] = useState(700);
  const [simOperatingExpenses, setSimOperatingExpenses] = useState(250);
  const [simOperatingIncome, setSimOperatingIncome] = useState(20);
  const [simNonOpInterest, setSimNonOpInterest] = useState(30);
  const [simTaxRate, setSimTaxRate] = useState(25); // in %
  const [simMarketPrice, setSimMarketPrice] = useState(1200);
  const [simEquitySharesCount, setSimEquitySharesCount] = useState(20); // in Cr shares
  const [simPrefDividend, setSimPrefDividend] = useState(10); // in Cr
  const [simLongTermDebt, setSimLongTermDebt] = useState(400); // in Cr
  const [simShareholdersFunds, setSimShareholdersFunds] = useState(800); // in Cr
  const [simNonTradeIncome, setSimNonTradeIncome] = useState(5); // in Cr

  // ─── LIVE SPREADSHEET ENGINE STATES ───
  const [sheetCapitalA, setSheetCapitalA] = useState(600000);
  const [sheetCapitalB, setSheetCapitalB] = useState(400000);
  const [sheetInterestRate, setSheetInterestRate] = useState(8); // %
  const [sheetNetProfit, setSheetNetProfit] = useState(320000);

  // ─── CHALLENGE ENGINE STATES ───
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
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── DRAG & DROP / INPUT STATES ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── DISCOVERY STATES ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── FEEDBACK STATES ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED FINANCIAL CALCULATIONS ───
  const derivedWorkingCapital = useMemo(() => {
    return Math.max(1, simCurrentAssets - simCurrentLiabilities);
  }, [simCurrentAssets, simCurrentLiabilities]);

  const derivedWCTurnover = useMemo(() => {
    return parseFloat((simRevenue / derivedWorkingCapital).toFixed(2));
  }, [simRevenue, derivedWorkingCapital]);

  const derivedGrossProfit = useMemo(() => {
    return Math.max(0, simRevenue - simCostOfRevenue);
  }, [simRevenue, simCostOfRevenue]);

  const derivedGrossProfitRatio = useMemo(() => {
    return parseFloat(((derivedGrossProfit / simRevenue) * 100).toFixed(2));
  }, [derivedGrossProfit, simRevenue]);

  const derivedOperatingCosts = useMemo(() => {
    return simCostOfRevenue + simOperatingExpenses - simOperatingIncome;
  }, [simCostOfRevenue, simOperatingExpenses, simOperatingIncome]);

  const derivedOperatingRatio = useMemo(() => {
    return parseFloat(((derivedOperatingCosts / simRevenue) * 100).toFixed(2));
  }, [derivedOperatingCosts, simRevenue]);

  const derivedOperatingProfitRatio = useMemo(() => {
    return parseFloat((100 - derivedOperatingRatio).toFixed(2));
  }, [derivedOperatingRatio]);

  const derivedPBT = useMemo(() => {
    const operatingProfit = simRevenue - derivedOperatingCosts;
    return Math.max(0, operatingProfit - simNonOpInterest + simNonTradeIncome);
  }, [simRevenue, derivedOperatingCosts, simNonOpInterest, simNonTradeIncome]);

  const derivedTaxAmount = useMemo(() => {
    return (derivedPBT * simTaxRate) / 100;
  }, [derivedPBT, simTaxRate]);

  const derivedNPAT = useMemo(() => {
    return Math.max(0, derivedPBT - derivedTaxAmount);
  }, [derivedPBT, derivedTaxAmount]);

  const derivedNetProfitRatio = useMemo(() => {
    return parseFloat(((derivedNPAT / simRevenue) * 100).toFixed(2));
  }, [derivedNPAT, simRevenue]);

  const derivedEPS = useMemo(() => {
    const equityEarnings = Math.max(0, derivedNPAT - simPrefDividend);
    return parseFloat((equityEarnings / simEquitySharesCount).toFixed(2));
  }, [derivedNPAT, simPrefDividend, simEquitySharesCount]);

  const derivedPERatio = useMemo(() => {
    if (derivedEPS <= 0) return 0;
    return parseFloat((simMarketPrice / derivedEPS).toFixed(2));
  }, [simMarketPrice, derivedEPS]);

  const derivedCapitalEmployed = useMemo(() => {
    return simShareholdersFunds + simLongTermDebt;
  }, [simShareholdersFunds, simLongTermDebt]);

  const derivedNPBIT = useMemo(() => {
    return derivedNPAT + derivedTaxAmount + simNonOpInterest - simNonTradeIncome;
  }, [derivedNPAT, derivedTaxAmount, simNonOpInterest, simNonTradeIncome]);

  const derivedROI = useMemo(() => {
    if (derivedCapitalEmployed <= 0) return 0;
    return parseFloat(((derivedNPBIT / derivedCapitalEmployed) * 100).toFixed(2));
  }, [derivedNPBIT, derivedCapitalEmployed]);

  // ─── LIVE SPREADSHEET DERIVATIONS ───
  const sheetInterestA = useMemo(() => (sheetCapitalA * sheetInterestRate) / 100, [sheetCapitalA, sheetInterestRate]);
  const sheetInterestB = useMemo(() => (sheetCapitalB * sheetInterestRate) / 100, [sheetCapitalB, sheetInterestRate]);
  const sheetProfitShareA = useMemo(() => (sheetNetProfit * 3) / 5, [sheetNetProfit]);
  const sheetProfitShareB = useMemo(() => (sheetNetProfit * 2) / 5, [sheetNetProfit]);
  const sheetTotalA = useMemo(() => sheetInterestA + sheetProfitShareA, [sheetInterestA, sheetProfitShareA]);
  const sheetTotalB = useMemo(() => sheetInterestB + sheetProfitShareB, [sheetInterestB, sheetProfitShareB]);
  const sheetTotalCap = useMemo(() => sheetCapitalA + sheetCapitalB, [sheetCapitalA, sheetCapitalB]);
  const sheetTotalInterest = useMemo(() => sheetInterestA + sheetInterestB, [sheetInterestA, sheetInterestB]);
  const sheetTotalProfitApprop = useMemo(() => sheetProfitShareA + sheetProfitShareB, [sheetProfitShareA, sheetProfitShareB]);
  const sheetGrandTotal = useMemo(() => sheetTotalA + sheetTotalB, [sheetTotalA, sheetTotalB]);

  // ─── WATERFALL CHART DATA ───
  const waterfallChartData = useMemo(() => [
    { name: 'Gross Rev', amount: simRevenue, fill: '#6366f1' },
    { name: 'Cost of Rev', amount: simCostOfRevenue, fill: '#ef4444' },
    { name: 'Gross Profit', amount: derivedGrossProfit, fill: '#10b981' },
    { name: 'Operating Exp', amount: simOperatingExpenses, fill: '#f59e0b' },
    { name: 'Net Profit', amount: derivedNPAT, fill: '#3b82f6' },
  ], [simRevenue, simCostOfRevenue, derivedGrossProfit, simOperatingExpenses, derivedNPAT]);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECT: LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C12_ACC_061);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── EFFECT: BKT ADAPTIVE DIFFICULTY ───
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
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── EFFECT: 2D CANVAS RATIO ROTATION INDICATOR ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 32, 0, Math.PI * 2);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 1.5);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(24, 0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      angle += 0.04 * (derivedWCTurnover / 5);
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [derivedWCTurnover]);

  // ─── EFFECT: INACTIVITY AUTO-HINT ───
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALLBACK HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(
      isCorrect
        ? 'Spot on! Working capital velocity drops when tied-up funds increase.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Financial Ratio & Spreadsheet Lab. Explore each step hands-on!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free sandbox mode unlocked. Test any financial scenario without grading!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the ISC Challenge Section. Ready, set, go!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('tap');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('tap');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now slide the operating costs to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === 0;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent observation! The mathematical identity always holds.'
        : 'Notice how one decreases by the exact amount the other increases.'
    );
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
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
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
    speechManager.speak('Congratulations! You have completed the Financial Ratios and Spreadsheet Masterclass!');
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
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding analytical thinking.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
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
          speechManager.speak('Let us study the complete solution step-by-step.');
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
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">
                ISC Class 12 • Accountancy
              </span>
              <span className="text-xs text-slate-400 font-medium">Schedule III & AS-20</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Indicator Badges */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <motion.span
              key={p}
              animate={{
                backgroundColor: phase === p ? '#059669' : 'transparent',
                color: phase === p ? '#ffffff' : '#94a3b8',
              }}
              className="px-3 py-1 rounded-lg font-semibold capitalize transition-all"
            >
              {p}
            </motion.span>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          {/* Narrative Scenario Box */}
          <div className="p-5 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm uppercase tracking-wider mb-2">
              <span>🎯 Scenario Briefing</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
            <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-900/50 text-xs text-gold-200">
              📌 <span className="font-semibold">Context:</span> {SCENARIO.context}
            </div>
          </div>

          {/* Curiosity Discovery Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800">
                Curiosity Discovery Hook • Not Graded
              </span>
              <span className="text-xs text-slate-500">Think conceptually</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="space-y-2 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium'
                        : 'bg-slate-950/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3"
              >
                <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Brilliant intuition! Revenue over higher working capital slows down velocity.'
                    : '💡 ' + DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                >
                  Enter Interactive Exploration Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Progress & Navigation */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Guided Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold disabled:opacity-40"
              >
                ← Prev
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                disabled={currentSlide === EXPLORATION_STEPS.length - 1}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold disabled:opacity-40"
              >
                Next →
              </motion.button>
            </div>
          </div>

          <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-xl text-xs text-emerald-300">
            👉 <span className="font-semibold">Action:</span> {EXPLORATION_STEPS[currentSlide].instruction}
          </div>

          {/* Dynamic Interactive Workbench */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
            {/* Step 1: Working Capital Velocity Lab with SVG 1 */}
            {currentSlide === 0 && (
              <>
                <div className="lg:col-span-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                    Interactive Balance Sheet Sliders
                  </h3>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Revenue from Operations (P&L Flow)</span>
                      <span className="font-bold text-emerald-400">₹{simRevenue} Cr</span>
                    </div>
                    <input
                      type="range"
                      min={200}
                      max={3000}
                      step={50}
                      value={simRevenue}
                      onChange={e => setSimRevenue(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                      aria-label="Set Revenue from Operations"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Total Current Assets (Inventories + Receivables + Cash)</span>
                      <span className="font-bold text-teal-400">₹{simCurrentAssets} Cr</span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={1000}
                      step={25}
                      value={simCurrentAssets}
                      onChange={e => setSimCurrentAssets(Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer"
                      aria-label="Set Current Assets"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Total Current Liabilities (Trade Payables + Short-term Debt)</span>
                      <span className="font-bold text-rose-400">₹{simCurrentLiabilities} Cr</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={simCurrentAssets - 10}
                      step={25}
                      value={simCurrentLiabilities}
                      onChange={e => setSimCurrentLiabilities(Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer"
                      aria-label="Set Current Liabilities"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-slate-400">
                      Working Capital = CA (₹{simCurrentAssets} Cr) − CL (₹{simCurrentLiabilities} Cr) ={' '}
                      <span className="font-bold text-white">₹{derivedWorkingCapital} Cr</span>
                    </p>
                    <p className="text-emerald-400 font-semibold">
                      WCT Ratio = ₹{simRevenue} Cr / ₹{derivedWorkingCapital} Cr ={' '}
                      <span className="text-sm underline">{derivedWCTurnover} times</span>
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-950 p-6 rounded-xl border border-slate-800 text-center relative overflow-hidden space-y-3">
                  {/* SVG DIAGRAM 1: Working Capital Cycle & Velocity Flow */}
                  <svg
                    viewBox="0 0 320 160"
                    className="w-full max-w-xs h-auto"
                    aria-label="Working Capital Velocity Flow Diagram"
                  >
                    <defs>
                      <linearGradient id="caGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#0d9488" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                      <linearGradient id="clGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#e11d48" />
                        <stop offset="100%" stopColor="#f43f5e" />
                      </linearGradient>
                      <linearGradient id="wcGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>

                    {/* CA Node */}
                    <rect x="10" y="20" width="85" height="45" rx="8" fill="url(#caGrad)" opacity="0.9" />
                    <text x="52" y="38" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Current Assets</text>
                    <text x="52" y="52" textAnchor="middle" fill="#ccfbf1" fontSize="10" fontWeight="bold">₹{simCurrentAssets} Cr</text>

                    {/* Minus sign */}
                    <text x="108" y="48" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">−</text>

                    {/* CL Node */}
                    <rect x="120" y="20" width="85" height="45" rx="8" fill="url(#clGrad)" opacity="0.9" />
                    <text x="162" y="38" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Current Liab.</text>
                    <text x="162" y="52" textAnchor="middle" fill="#ffe4e6" fontSize="10" fontWeight="bold">₹{simCurrentLiabilities} Cr</text>

                    {/* Equals sign */}
                    <text x="218" y="48" textAnchor="middle" fill="#94a3b8" fontSize="16" fontWeight="bold">=</text>

                    {/* Working Capital Target Node */}
                    <rect x="230" y="15" width="80" height="55" rx="8" fill="url(#wcGrad)" stroke="#34d399" strokeWidth="1.5" />
                    <text x="270" y="34" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">Working Capital</text>
                    <text x="270" y="52" textAnchor="middle" fill="#ecfdf5" fontSize="12" fontWeight="900">₹{derivedWorkingCapital} Cr</text>

                    {/* Velocity Arrow to Revenue */}
                    <path d="M 270 75 C 270 120, 160 145, 60 140" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="4 2" />
                    <polygon points="55,140 65,135 65,145" fill="#6366f1" />

                    {/* Bottom Revenue Flow Badge */}
                    <rect x="35" y="100" width="130" height="35" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
                    <text x="100" y="115" textAnchor="middle" fill="#a5b4fc" fontSize="8" fontWeight="bold">Annual Revenue Flow</text>
                    <text x="100" y="128" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">₹{simRevenue} Cr</text>

                    {/* Velocity Multiplier Ring Badge */}
                    <circle cx="270" cy="120" r="24" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                    <text x="270" y="118" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="900">{derivedWCTurnover}x</text>
                    <text x="270" y="130" textAnchor="middle" fill="#94a3b8" fontSize="7">VELOCITY</text>
                  </svg>

                  <div className="text-3xl font-black text-white tracking-tight">
                    {derivedWCTurnover} <span className="text-lg text-emerald-400 font-semibold">times / yr</span>
                  </div>
                  <p className="text-xs text-slate-400 max-w-xs">
                    For every ₹1 of working capital tied up in the operating cycle, Bharat Dynamics generates{' '}
                    <span className="text-emerald-300 font-bold">₹{derivedWCTurnover}</span> in gross revenue annually.
                  </p>
                </div>
              </>
            )}

            {/* Step 2: Profitability Waterfall */}
            {currentSlide === 1 && (
              <>
                <div className="lg:col-span-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">P&L Cost Breakdown</h3>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Cost of Revenue from Operations</span>
                      <span className="font-bold text-rose-400">₹{simCostOfRevenue} Cr</span>
                    </div>
                    <input
                      type="range"
                      min={200}
                      max={simRevenue - 50}
                      step={25}
                      value={simCostOfRevenue}
                      onChange={e => setSimCostOfRevenue(Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer"
                      aria-label="Set Cost of Revenue"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Operating Overheads (Admin + Selling + Distribution)</span>
                      <span className="font-bold text-amber-400">₹{simOperatingExpenses} Cr</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={400}
                      step={10}
                      value={simOperatingExpenses}
                      onChange={e => setSimOperatingExpenses(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                      aria-label="Set Operating Expenses"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-slate-400">Gross Margin:</span>
                      <p className="font-bold text-emerald-400 text-sm">{derivedGrossProfitRatio}%</p>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-slate-400">Net Profit Margin:</span>
                      <p className="font-bold text-gold-400 text-sm">{derivedNetProfitRatio}%</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-center">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                    Schedule III Income Waterfall (₹ in Crores)
                  </h4>
                  <div className="h-44 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={waterfallChartData}>
                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8 }}
                          itemStyle={{ color: '#f8fafc', fontSize: 12 }}
                        />
                        <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                          {waterfallChartData.map((entry, index) => (
                            <RechartsCell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Operating Ratio vs Operating Profit Complement with SVG 2 */}
            {currentSlide === 2 && (
              <div className="lg:col-span-12 space-y-6">
                {!predictionMade && (
                  <div className="p-4 bg-gold-950/60 rounded-xl border border-gold-800 space-y-3">
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                      Predict-Then-Check
                    </span>
                    <h4 className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          className="p-3 text-left bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* SVG DIAGRAM 2: The 100% Complementary Revenue Partition */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Visual Partition of Revenue from Operations (100% Identity)
                  </h4>
                  <svg viewBox="0 0 500 120" className="w-full max-w-lg h-auto" aria-label="100 Percent Revenue Partition Diagram">
                    {/* Background Bar */}
                    <rect x="20" y="25" width="460" height="40" rx="8" fill="#1e293b" />
                    {/* Operating Cost Portion */}
                    <rect
                      x="20"
                      y="25"
                      width={Math.max(10, Math.min(460, (derivedOperatingRatio / 100) * 460))}
                      height="40"
                      rx="8"
                      fill="#f43f5e"
                    />
                    {/* Operating Profit Portion */}
                    <rect
                      x={20 + Math.max(10, Math.min(460, (derivedOperatingRatio / 100) * 460))}
                      y="25"
                      width={Math.max(0, 460 - Math.max(10, Math.min(460, (derivedOperatingRatio / 100) * 460)))}
                      height="40"
                      rx="8"
                      fill="#10b981"
                    />
                    {/* Percentage Labels */}
                    <text x={35} y="49" fill="#ffffff" fontSize="12" fontWeight="bold">
                      Operating Ratio: {derivedOperatingRatio}%
                    </text>
                    <text x={465} y="49" textAnchor="end" fill="#ffffff" fontSize="12" fontWeight="bold">
                      Op Profit: {derivedOperatingProfitRatio}%
                    </text>
                    {/* Formula Bracket below */}
                    <line x1="20" y1="80" x2="480" y2="80" stroke="#64748b" strokeWidth="1.5" />
                    <path d="M 20 75 L 20 80 M 480 75 L 480 80 M 250 80 L 250 90" stroke="#64748b" strokeWidth="1.5" fill="none" />
                    <text x="250" y="105" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                      Total Revenue from Operations = 100.0%
                    </text>
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-rose-400 uppercase">Operating Ratio (Cost Share)</span>
                      <span className="text-lg font-black text-rose-400">{derivedOperatingRatio}%</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-rose-500"
                        animate={{ width: `${Math.min(100, derivedOperatingRatio)}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      (Cost of Rev ₹{simCostOfRevenue} + Op Exp ₹{simOperatingExpenses} − Scrap ₹{simOperatingIncome}) /
                      Rev ₹{simRevenue}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-emerald-400 uppercase">
                        Operating Profit Ratio (Margin Share)
                      </span>
                      <span className="text-lg font-black text-emerald-400">{derivedOperatingProfitRatio}%</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-emerald-500"
                        animate={{ width: `${Math.max(0, derivedOperatingProfitRatio)}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Net Operating Profit / Revenue from Operations × 100
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-emerald-800/80 text-center">
                  <span className="text-xs font-bold text-emerald-300">
                    Arithmetic Identity Check: {derivedOperatingRatio}% (Cost) + {derivedOperatingProfitRatio}% (Profit)
                    ={' '}
                    <span className="underline font-black text-white">
                      {(derivedOperatingRatio + derivedOperatingProfitRatio).toFixed(1)}%
                    </span>{' '}
                    (Exact 100% Identity ✓)
                  </span>
                </div>

                {predictionMade && !observationAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
                  >
                    <span className="text-xs font-bold text-amber-400">Observation Question</span>
                    <p className="text-sm text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className="p-2.5 text-left bg-slate-800 text-xs text-slate-200 rounded-lg border border-slate-700 hover:bg-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 4: Capital Productivity & Valuation with SVG 3 */}
            {currentSlide === 3 && (
              <>
                <div className="lg:col-span-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                    Valuation & ROI Controls
                  </h3>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>NSE Market Price per Share</span>
                      <span className="font-bold text-gold-400">₹{simMarketPrice}</span>
                    </div>
                    <input
                      type="range"
                      min={300}
                      max={3000}
                      step={50}
                      value={simMarketPrice}
                      onChange={e => setSimMarketPrice(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                      aria-label="Set Market Price"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Number of Equity Shares (in Crores)</span>
                      <span className="font-bold text-teal-400">{simEquitySharesCount} Cr shares</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={50}
                      step={1}
                      value={simEquitySharesCount}
                      onChange={e => setSimEquitySharesCount(Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer"
                      aria-label="Set Equity Share Count"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Long-term Debt Borrowings (Debentures & Bank Loans)</span>
                      <span className="font-bold text-purple-400">₹{simLongTermDebt} Cr</span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={1200}
                      step={50}
                      value={simLongTermDebt}
                      onChange={e => setSimLongTermDebt(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                      aria-label="Set Long Term Debt"
                    />
                  </div>

                  {/* SVG DIAGRAM 3: Capital Employed Structure (Liabilities Side) */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 320 100" className="w-full max-w-xs h-auto" aria-label="Capital Employed Architecture">
                      {/* Box 1: Shareholders' Funds */}
                      <rect x="10" y="15" width="135" height="40" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                      <text x="77" y="32" textAnchor="middle" fill="#c7d2fe" fontSize="8" fontWeight="bold">Shareholders’ Funds</text>
                      <text x="77" y="47" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">₹{simShareholdersFunds} Cr</text>

                      {/* Plus */}
                      <text x="153" y="40" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">+</text>

                      {/* Box 2: Long-Term Debt */}
                      <rect x="165" y="15" width="145" height="40" rx="6" fill="#3b0764" stroke="#c084fc" strokeWidth="1.5" />
                      <text x="237" y="32" textAnchor="middle" fill="#f3e8ff" fontSize="8" fontWeight="bold">Long-Term Borrowings</text>
                      <text x="237" y="47" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">₹{simLongTermDebt} Cr</text>

                      {/* Capital Employed Result Bar */}
                      <rect x="10" y="65" width="300" height="28" rx="6" fill="#042f2e" stroke="#14b8a6" strokeWidth="1.5" />
                      <text x="160" y="83" textAnchor="middle" fill="#5eead4" fontSize="10" fontWeight="900">
                        Total Capital Employed = ₹{derivedCapitalEmployed} Cr
                      </text>
                    </svg>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-around gap-3">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400">Earning per Share (AS-20)</span>
                    <div className="text-2xl font-black text-emerald-400">
                      ₹{derivedEPS} <span className="text-xs text-slate-400 font-normal">/ share</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      (NPAT ₹{derivedNPAT.toFixed(1)} Cr − Pref Div ₹{simPrefDividend} Cr) / {simEquitySharesCount} Cr shares
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400">Price Earning (P/E) Multiple</span>
                    <div className="text-2xl font-black text-gold-400">
                      {derivedPERatio} <span className="text-xs text-slate-400 font-normal">times</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Market Price ₹{simMarketPrice} / EPS ₹{derivedEPS}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400">Return on Investment (ROI / ROCE)</span>
                    <div className="text-2xl font-black text-teal-400">{derivedROI}%</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      NPBIT ₹{derivedNPBIT.toFixed(1)} Cr / Capital Employed ₹{derivedCapitalEmployed} Cr × 100
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Step 5: Live Electronic Spreadsheet Simulation */}
            {currentSlide === 4 && (
              <div className="lg:col-span-12 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400">
                    Active Workbook: <span className="text-white font-mono">BharatDynamics_Appropriation_FY24.xlsx</span>
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">Automatic Recalculation: ACTIVE ✓</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse font-mono">
                    <thead>
                      <tr className="bg-slate-800 text-slate-300">
                        <th className="p-2 border border-slate-700 text-center w-10">#</th>
                        <th className="p-2 border border-slate-700">A (Partner)</th>
                        <th className="p-2 border border-slate-700">B (Opening Capital ₹)</th>
                        <th className="p-2 border border-slate-700">C (Interest @ {sheetInterestRate}% =B*r)</th>
                        <th className="p-2 border border-slate-700">D (Profit Share 3:2)</th>
                        <th className="p-2 border border-slate-700">E (Total =C+D)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-slate-900/80">
                        <td className="p-2 border border-slate-800 text-center font-bold text-slate-500">2</td>
                        <td className="p-2 border border-slate-800 font-semibold text-slate-200">Partner A</td>
                        <td className="p-2 border border-slate-800 bg-emerald-950/30">
                          <input
                            type="number"
                            value={sheetCapitalA}
                            onChange={e => setSheetCapitalA(Number(e.target.value))}
                            className="bg-transparent border-b border-emerald-500 text-emerald-300 font-bold w-24 outline-none"
                            aria-label="Partner A Opening Capital"
                          />
                        </td>
                        <td className="p-2 border border-slate-800 text-slate-300">₹{sheetInterestA.toLocaleString()}</td>
                        <td className="p-2 border border-slate-800 text-slate-300">₹{sheetProfitShareA.toLocaleString()}</td>
                        <td className="p-2 border border-slate-800 font-bold text-emerald-400">
                          ₹{sheetTotalA.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="bg-slate-900/80">
                        <td className="p-2 border border-slate-800 text-center font-bold text-slate-500">3</td>
                        <td className="p-2 border border-slate-800 font-semibold text-slate-200">Partner B</td>
                        <td className="p-2 border border-slate-800 bg-emerald-950/30">
                          <input
                            type="number"
                            value={sheetCapitalB}
                            onChange={e => setSheetCapitalB(Number(e.target.value))}
                            className="bg-transparent border-b border-emerald-500 text-emerald-300 font-bold w-24 outline-none"
                            aria-label="Partner B Opening Capital"
                          />
                        </td>
                        <td className="p-2 border border-slate-800 text-slate-300">₹{sheetInterestB.toLocaleString()}</td>
                        <td className="p-2 border border-slate-800 text-slate-300">₹{sheetProfitShareB.toLocaleString()}</td>
                        <td className="p-2 border border-slate-800 font-bold text-emerald-400">
                          ₹{sheetTotalB.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="bg-slate-800/90 font-bold text-white">
                        <td className="p-2 border border-slate-700 text-center">4</td>
                        <td className="p-2 border border-slate-700">Total (=SUM)</td>
                        <td className="p-2 border border-slate-700">₹{sheetTotalCap.toLocaleString()}</td>
                        <td className="p-2 border border-slate-700 text-amber-300">₹{sheetTotalInterest.toLocaleString()}</td>
                        <td className="p-2 border border-slate-700 text-gold-300">₹{sheetTotalProfitApprop.toLocaleString()}</td>
                        <td className="p-2 border border-slate-700 text-emerald-400 font-black">
                          ₹{sheetGrandTotal.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>
                    💡 Type new numbers into <span className="text-emerald-400 font-bold">Cell B2 or B3</span> above.
                    Witness how Columns C, E, and Row 4 recalculate in milliseconds!
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action */}
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToSandbox}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2"
            >
              Open Free Sandbox Mode →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Free Exploration Sandbox • Ungraded
              </span>
              <h2 className="text-lg font-bold text-white">Interactive Corporate Audit Sandbox</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Switch between ratio tabs and experiment freely with different balance sheet and market conditions.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/30"
            >
              Start Graded ISC Challenges →
            </motion.button>
          </div>

          {/* Sandbox Navigation Tabs */}
          <div className="flex gap-2 border-b border-slate-800 pb-2">
            {[
              { id: 'wct', label: '1. Working Capital Velocity' },
              { id: 'profit', label: '2. Profitability Stack' },
              { id: 'valuation', label: '3. Valuation & ROCE' },
              { id: 'excel', label: '4. Live Excel Grid' },
            ].map(tab => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTopicTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTopicTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Sandbox Tab Content */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            {selectedTopicTab === 'wct' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <label className="text-xs text-slate-400 font-semibold">Revenue: ₹{simRevenue} Cr</label>
                  <input
                    type="range"
                    min={300}
                    max={2500}
                    value={simRevenue}
                    onChange={e => setSimRevenue(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <label className="text-xs text-slate-400 font-semibold">Current Assets: ₹{simCurrentAssets} Cr</label>
                  <input
                    type="range"
                    min={100}
                    max={800}
                    value={simCurrentAssets}
                    onChange={e => setSimCurrentAssets(Number(e.target.value))}
                    className="w-full accent-teal-500"
                  />
                  <label className="text-xs text-slate-400 font-semibold">
                    Current Liabilities: ₹{simCurrentLiabilities} Cr
                  </label>
                  <input
                    type="range"
                    min={50}
                    max={simCurrentAssets - 20}
                    value={simCurrentLiabilities}
                    onChange={e => setSimCurrentLiabilities(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col justify-center items-center bg-slate-950 p-6 rounded-xl border border-slate-800 text-center">
                  <div className="text-4xl font-black text-emerald-400 mb-2">{derivedWCTurnover} times</div>
                  <p className="text-sm text-slate-300 font-medium">Working Capital Turnover Ratio</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Working Capital = ₹{derivedWorkingCapital} Cr • Revenue = ₹{simRevenue} Cr
                  </p>
                </div>
              </div>
            )}

            {selectedTopicTab === 'profit' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Gross Profit Ratio</span>
                  <div className="text-2xl font-black text-emerald-400">{derivedGrossProfitRatio}%</div>
                  <p className="text-[11px] text-slate-500 mt-1">Gross Profit: ₹{derivedGrossProfit} Cr</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Operating Ratio</span>
                  <div className="text-2xl font-black text-rose-400">{derivedOperatingRatio}%</div>
                  <p className="text-[11px] text-slate-500 mt-1">Cost Share of Revenue</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Operating Profit Ratio</span>
                  <div className="text-2xl font-black text-amber-400">{derivedOperatingProfitRatio}%</div>
                  <p className="text-[11px] text-slate-500 mt-1">100% − Operating Ratio</p>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Net Profit Ratio</span>
                  <div className="text-2xl font-black text-gold-400">{derivedNetProfitRatio}%</div>
                  <p className="text-[11px] text-slate-500 mt-1">NPAT: ₹{derivedNPAT.toFixed(1)} Cr</p>
                </div>
              </div>
            )}

            {selectedTopicTab === 'valuation' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <label className="text-xs text-slate-400 font-semibold">Share Price: ₹{simMarketPrice}</label>
                  <input
                    type="range"
                    min={200}
                    max={2500}
                    value={simMarketPrice}
                    onChange={e => setSimMarketPrice(Number(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                  <label className="text-xs text-slate-400 font-semibold">
                    Equity Capital Base: {simEquitySharesCount} Cr shares
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    value={simEquitySharesCount}
                    onChange={e => setSimEquitySharesCount(Number(e.target.value))}
                    className="w-full accent-teal-500"
                  />
                </div>
                <div className="md:col-span-2 grid grid-cols-3 gap-3">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center text-center">
                    <span className="text-xs text-slate-400">EPS</span>
                    <div className="text-xl font-bold text-emerald-400">₹{derivedEPS}</div>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center text-center">
                    <span className="text-xs text-slate-400">P/E Multiple</span>
                    <div className="text-xl font-bold text-gold-400">{derivedPERatio}x</div>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center text-center">
                    <span className="text-xs text-slate-400">ROI (ROCE)</span>
                    <div className="text-xl font-bold text-teal-400">{derivedROI}%</div>
                  </div>
                </div>
              </div>
            )}

            {selectedTopicTab === 'excel' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Edit partner opening capitals below to observe instant recalculations in action:
                </p>
                <div className="flex gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Partner A Capital (₹)</label>
                    <input
                      type="number"
                      value={sheetCapitalA}
                      onChange={e => setSheetCapitalA(Number(e.target.value))}
                      className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-emerald-400 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Partner B Capital (₹)</label>
                    <input
                      type="number"
                      value={sheetCapitalB}
                      onChange={e => setSheetCapitalB(Number(e.target.value))}
                      className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-emerald-400 font-mono text-sm"
                    />
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-slate-300">
                  Total Capital: ₹{sheetTotalCap.toLocaleString()} • Total Appropriation: ₹
                  {sheetGrandTotal.toLocaleString()}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE MODE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Topbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-gold-950 text-gold-300 border border-gold-800 font-semibold">
                  {challenge.competencyLevel}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">ISC Topic Node: {challenge.nodeId}</h3>
            </div>

            <div className="flex items-center gap-3">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                    : difficulty === 'standard'
                    ? 'bg-gold-950 text-gold-400 border-gold-700'
                    : 'bg-purple-950 text-purple-400 border-purple-700'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="text-xs text-slate-400 font-mono">
                Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Card with required SHAKE ANIMATION on error */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 shadow-lg shadow-rose-950/50'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <h2 className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed">{challenge.question}</h2>

            {/* MCQ / Distinguish / Classify Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all ${
                        showExplanation
                          ? i === challenge.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                            : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-50'
                          : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Interaction */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 text-white rounded-lg cursor-grab text-xs font-semibold shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'box_cost_of_rev', title: '1. Cost of Revenue from Operations' },
                    { id: 'box_operating_exp', title: '2. Operating Expenses' },
                    { id: 'box_non_operating', title: '3. Non-Operating Expenses' },
                    { id: 'box_operating_inc', title: '4. Operating Income (Deducted)' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 hover:border-emerald-500 transition-colors min-h-[90px] flex flex-col justify-between"
                    >
                      <span className="text-[11px] font-bold text-slate-400">{target.title}</span>
                      <div className="mt-2 text-xs font-bold text-emerald-400">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop item here...'}
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
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-xs disabled:opacity-40"
                >
                  Verify Classification Labels →
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Interaction */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into the correct sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3 font-medium"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-[10px]">
                        {displayIdx + 1}
                      </span>
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
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-xs disabled:opacity-40"
                >
                  Confirm Sorted Sequence →
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge Interaction */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm outline-none focus:border-emerald-500"
                    aria-label="Numerical answer input"
                  />
                  <span className="text-xs font-bold text-slate-400">{challenge.unit}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-xs disabled:opacity-40"
                >
                  Check Numerical Solution →
                </motion.button>
              </div>
            )}

            {/* Construct Challenge Interaction */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(p => [...p, part])}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-slate-800 text-emerald-400 font-mono text-xs rounded border border-slate-700 flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-600 text-xs font-mono">Click formula parts above to construct...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-xs disabled:opacity-40"
                >
                  Verify Constructed Formula →
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-800/80 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Comprehensive Solution Breakdown
                  </span>
                  <span className="text-[10px] text-amber-400/80 font-mono">CISCE Examiner Guidance</span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-amber-100/90 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400">Step {idx + 1}:</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-amber-900/60">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Working Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Audit →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-slate-900 to-emerald-950/60 rounded-3xl border border-emerald-800/60 text-center space-y-4 shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 mx-auto rounded-3xl bg-emerald-600 flex items-center justify-center text-4xl shadow-xl shadow-emerald-600/40"
            >
              🎓
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">ISC Accountancy Audit Mastered!</h2>
            <div className="flex justify-center gap-6 text-sm">
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-xs">Final Performance Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-xs">Adaptive BKT Mastery</span>
                <span className="text-2xl font-black text-teal-400 uppercase">{masteryLevel}</span>
              </div>
            </div>

            {/* Motivational Performance Message: Specific Error-Tier Messages */}
            <p className="text-base font-bold text-emerald-300 max-w-xl mx-auto py-2">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors >= 1 && errors <= 3
                ? 'Great work!'
                : errors >= 4 && errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </p>
          </div>

          {/* Misconception Review Card */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider">
                Targeted Misconception Feedback:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                SM-2 Spaced Repetition Schedule
              </span>
              <p className="text-xs text-slate-300 mt-1">
                Next scheduled review interval:{' '}
                <span className="font-bold text-amber-300">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                </span>
                . Re-evaluating keeps accounting rules sharp in long-term memory.
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wider">
              {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_AccountancyWorkingCapitalTurnoverSim;
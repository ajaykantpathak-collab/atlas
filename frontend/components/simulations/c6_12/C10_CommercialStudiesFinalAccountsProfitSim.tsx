'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

// Node IDs as string literals
const NODE_C10_COMMSTUD_021 = 'c10_commstud_021';
const NODE_C10_COMMSTUD_022 = 'c10_commstud_022';
const NODE_C10_COMMSTUD_023 = 'c10_commstud_023';
const NODE_C10_COMMSTUD_024 = 'c10_commstud_024';
const NODE_C10_COMMSTUD_025 = 'c10_commstud_025';
const NODE_C10_COMMSTUD_026 = 'c10_commstud_026';
const NODE_C10_COMMSTUD_027 = 'c10_commstud_027';
const NODE_C10_COMMSTUD_028 = 'c10_commstud_028';
const NODE_C10_COMMSTUD_029 = 'c10_commstud_029';
const NODE_C10_COMMSTUD_030 = 'c10_commstud_030';

const ALL_NODE_IDS = [
  NODE_C10_COMMSTUD_021,
  NODE_C10_COMMSTUD_022,
  NODE_C10_COMMSTUD_023,
  NODE_C10_COMMSTUD_024,
  NODE_C10_COMMSTUD_025,
  NODE_C10_COMMSTUD_026,
  NODE_C10_COMMSTUD_027,
  NODE_C10_COMMSTUD_028,
  NODE_C10_COMMSTUD_029,
  NODE_C10_COMMSTUD_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Bharat Enterprises Turnaround & Expansion',
  intro: 'Bharat Enterprises (Kanpur) manufactures consumer electronics and home appliances. As Chief Commercial Officer, you must audit the Final Accounts, control production and operating costs, structure long & short term financing, and revamp HR recruitment, selection, and training to execute a ₹50 Crore expansion.',
  context: 'Balance the P&L and Balance Sheet with closing stock adjustments, classify direct vs indirect & fixed vs variable costs, budget working capital, and build high-efficiency staffing systems under Indian Commercial standards (ICAI, SEBI, Companies Act 2013).',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Bharat Enterprises receives a Trial Balance showing Gross Profit ₹1,50,000, Closing Stock outside the Trial Balance of ₹80,000, and Rent ₹15,000. Where does Closing Stock appear in the final statements?',
  options: [
    'In the Profit & Loss Account Dr. side and Balance Sheet Assets side',
    'In the Trading Account Cr. side and Balance Sheet Assets side (Current Assets)',
    'Only in the Balance Sheet Liabilities side as owner equity',
    'Only in the Trading Account Cr. side to reduce cost of goods sold',
  ],
  correctIndex: 1,
  hintAfter: 'Closing Stock reduces Cost of Goods Sold in the Trading Account AND stands as an unsold asset on the Balance Sheet. Let us explore the mechanics in depth!',
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

// ─── 24 RICH CHALLENGES (NEP 2020 Competency Distribution) ───
const CHALLENGES: Challenge[] = [
  // 1. Final Accounts - P&L Net Profit (Numeric Application)
  {
    id: 'ch_fa_001',
    nodeId: NODE_C10_COMMSTUD_021,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Bharat Traders has Gross Profit b/d ₹1,20,000, Discount Received ₹5,000, Commission Received ₹8,000, Shop Rent ₹18,000, Salaries ₹45,000, and Insurance ₹4,000. Calculate the Net Profit in Rupees.',
    correctAnswer: 66000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Credit Total = 1,20,000 + 5,000 + 8,000 = ₹1,33,000. Debit Total = 18,000 + 45,000 + 4,000 = ₹67,000. Net Profit = Credit − Debit = 1,33,000 − 67,000 = ₹66,000.',
    hints: [
      'Add all incomes to Gross Profit on the credit side (Gross Profit + Discount Recd + Commission Recd).',
      'Add all indirect expenses on the debit side (Rent + Salaries + Insurance).',
      'Net Profit is Total Incomes (₹1,33,000) minus Total Expenses (₹67,000) = ₹66,000.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Final Accounts - Adjusted Capital (Numeric Application)
  {
    id: 'ch_fa_002',
    nodeId: NODE_C10_COMMSTUD_021,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Opening Capital is ₹3,50,000. During the year, the business earned Net Profit of ₹63,000 and the proprietor withdrew ₹20,000 as Drawings for personal use. What is the Adjusted Capital on the Balance Sheet in Rupees?',
    correctAnswer: 393000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Adjusted Capital = Opening Capital + Net Profit − Drawings = ₹3,50,000 + ₹63,000 − ₹20,000 = ₹3,93,000.',
    hints: [
      'Net Profit belongs to the owner, so it increases Capital.',
      'Drawings represent funds withdrawn for personal use, so it decreases Capital.',
      'Compute: 3,50,000 + 63,000 - 20,000 = 3,93,000.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Final Accounts - Nature of Balance Sheet (Classify Recall)
  {
    id: 'ch_fa_003',
    nodeId: NODE_C10_COMMSTUD_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is the Balance Sheet termed a "Statement" rather than an "Account"?',
    options: [
      'It is not prepared in T-account format with Dr./Cr. and has no closing balance transferred out',
      'It only records cash inflows and outflows for the current month',
      'It is prepared quarterly by the government tax inspectors',
      'It contains only nominal accounts and is closed at year end',
    ],
    correctIndex: 0,
    explanation: 'The Balance Sheet is a financial snapshot of assets, liabilities, and equity on a given date under Assets = Liabilities + Capital. It has no debit/credit sides and is not closed by a balancing figure.',
    hints: [
      'Recall that accounts (Trading & P&L) have Dr. and Cr. sides with transferred balances.',
      'A statement reflects a snapshot position at a specific point in time.',
      'Balance Sheet has Liabilities & Assets sides that tally by accounting equation, not closing transfers.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Cost Classification by Behaviour (Match / Drag Label)
  {
    id: 'ch_cost_001',
    nodeId: NODE_C10_COMMSTUD_022,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each cost behavior category to its corresponding industrial example from Maruti Suzuki / Tata Steel.',
    dragItems: [
      { label: 'Fixed Cost', targetId: 'box_fixed' },
      { label: 'Variable Cost', targetId: 'box_var' },
      { label: 'Semi-Variable Cost', targetId: 'box_semi' },
    ],
    correctMapping: {
      box_fixed: 'Fixed Cost',
      box_var: 'Variable Cost',
      box_semi: 'Semi-Variable Cost',
    },
    explanation: 'Factory Rent (₹40L/mo) is Fixed (constant in total). Steel sheet (₹60,000/car) is Variable (scales y=kx). Electricity (₹5L demand + ₹8/unit) is Semi-Variable (standing charge + consumption).',
    hints: [
      'Think about which expense does not budge whether 500 or 5,000 cars are produced.',
      'Which cost doubles exactly when car production volume doubles?',
      'Which bill has a base standing meter rent plus a per-unit electricity charge?',
    ],
    misconceptionIndex: 3,
  },
  // 5. Cost Behavior Unit Cost (Analysis Competency)
  {
    id: 'ch_cost_002',
    nodeId: NODE_C10_COMMSTUD_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When Maruti Suzuki expands output from 1,000 cars to 5,000 cars at Manesar, what happens mathematically to Fixed Cost per unit and Variable Cost per unit within the relevant range?',
    options: [
      'Fixed cost per unit decreases (y=k/x); Variable cost per unit remains constant (k)',
      'Fixed cost per unit remains constant; Variable cost per unit decreases',
      'Both fixed and variable cost per unit decrease exponentially',
      'Fixed cost per unit increases; Variable cost per unit doubles',
    ],
    correctIndex: 0,
    explanation: 'Total fixed cost is flat, so spreading it over more units reduces fixed cost per unit (y = k/x, economies of scale). Variable cost per unit remains constant because raw material per unit is unchanged.',
    hints: [
      'Rent is ₹40,00,000 total. At 1,000 cars = ₹4,000/car; at 5,000 cars = ₹800/car.',
      'Steel sheet cost per car stays ₹60,000 regardless of total batch size.',
      'Hence fixed per unit falls, while variable per unit remains constant.',
    ],
    misconceptionIndex: 4,
  },
  // 6. Cost Classification by Nature (Classify Application)
  {
    id: 'ch_cost_003',
    nodeId: NODE_C10_COMMSTUD_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'At Godrej Interio, a dedicated quality supervisor is paid ₹50,000/month to inspect ONLY the premium Teak Table line. How is this cost classified by Nature and by Behaviour?',
    options: [
      'Direct Cost and Fixed Cost',
      'Indirect Cost and Variable Cost',
      'Direct Cost and Variable Cost',
      'Indirect Cost and Fixed Cost',
    ],
    correctIndex: 0,
    explanation: 'Traceable entirely to one single product line = Direct. Paid a fixed monthly salary unchanged with unit output = Fixed. Directness (traceability) and Behavior (variability) are independent axes!',
    hints: [
      'Can the supervisor salary be traced 100% to this specific table line? Yes -> Direct.',
      'Does the supervisor get paid per table or a flat monthly salary? Flat -> Fixed.',
      'Therefore, this is Direct + Fixed.',
    ],
    misconceptionIndex: 5,
  },
  // 7. Prime Cost Calculation (Numeric Application)
  {
    id: 'ch_cost_004',
    nodeId: NODE_C10_COMMSTUD_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Britannia bakery produces Marie Gold. Direct Flour = ₹18,00,000; Direct Sugar = ₹5,00,000; Direct Labour = ₹9,00,000; Special Baking Mould Hire (Direct Expense) = ₹1,00,000; Factory Rent = ₹6,00,000. What is the Prime Cost in Lakhs (₹)?',
    correctAnswer: 33,
    tolerance: 0,
    unit: 'Lakhs',
    explanation: 'Prime Cost = Direct Material (18 + 5 = 23L) + Direct Labour (9L) + Direct Expenses (1L) = ₹33 Lakhs. Factory Rent is an Indirect Overhead and excluded from Prime Cost.',
    hints: [
      'Prime Cost = Direct Material + Direct Labour + Direct Expenses.',
      'Do not include indirect overheads like Factory Rent.',
      '18 + 5 + 9 + 1 = 33 Lakhs.',
    ],
  },
  // 8. Budgeting vs Forecasting (Distinguish Understanding)
  {
    id: 'ch_bdg_001',
    nodeId: NODE_C10_COMMSTUD_024,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which statement correctly differentiates Budgeting from Forecasting?',
    options: [
      'Forecasting is a statistical prediction of what may happen; Budgeting is a committed target with variance control',
      'Forecasting is mandatory under Companies Act 2013; Budgeting is optional',
      'Budgeting is historical reporting of past cash; Forecasting is future planning',
      'Forecasting sets departmental targets; Budgeting is only for government taxation',
    ],
    correctIndex: 0,
    explanation: 'A forecast predicts future possibilities without commitment ("sales may rise 10%"). A budget commits resources to achieve targets ("we will spend ₹40Cr to sell ₹600Cr") and investigates variances.',
    hints: [
      'Think about which one commits resources and measures deviations (variances).',
      'A weather report is a forecast; carrying an umbrella with allocated funds is a budget.',
      'Forecasting predicts; Budgeting commits to action.',
    ],
  },
  // 9. Budgeting Sequence Chain (Drag Sort Analysis)
  {
    id: 'ch_bdg_002',
    nodeId: NODE_C10_COMMSTUD_024,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the master budgeting preparation sequence in proper logical and operational order.',
    sortItems: [
      'Sales Budget (Starting Point)',
      'Production Budget (Output in Units = Sales + Desired Closing − Opening Stock)',
      'Purchase Budget (Raw Material Quantities & Cost)',
      'Cash Budget (Receipts, Disbursements & Working Capital Surpluses)',
      'Master Budget (Budgeted P&L and Balance Sheet Consolidation)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Sales forecast drives the Sales Budget -> Production Budget is derived -> Purchase Budget computes material requirements -> Cash Budget maps liquidity -> Master Budget summarizes all plans.',
    hints: [
      'The market demand (Sales) must be estimated before you know how many units to manufacture.',
      'You cannot order raw materials before knowing your production targets.',
      'Cash budget captures the inflows/outflows, and Master budget integrates everything at the end.',
    ],
  },
  // 10. Production Budget Calculation (Numeric Application)
  {
    id: 'ch_bdg_003',
    nodeId: NODE_C10_COMMSTUD_024,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Asian Paints targets Sales of 500 Lakh Litres. Opening Finished Stock is 15 Lakh Litres and Desired Closing Stock is 20 Lakh Litres. How many Lakh Litres must the Production Budget plan to manufacture?',
    correctAnswer: 505,
    tolerance: 0,
    unit: 'Lakh Litres',
    explanation: 'Production Budget = Sales + Desired Closing Stock − Opening Stock = 500 + 20 − 15 = 505 Lakh Litres.',
    hints: [
      'Formula: Production = Sales Target + Desired Closing Stock − Opening Stock.',
      'You need enough goods to satisfy sales plus leave 20L in the warehouse, minus what you already have (15L).',
      '500 + 20 - 15 = 505.',
    ],
  },
  // 11. Sources of Finance - Capital Market (Classify Recall)
  {
    id: 'ch_fin_001',
    nodeId: NODE_C10_COMMSTUD_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When LIC issued its ₹20,557 Crore IPO in May 2022 on BSE/NSE, which primary function of the Capital Market was demonstrated?',
    options: [
      'Mobilisation of household and institutional savings into productive corporate equity',
      'Providing 30-day overdrafts to insurance policyholders',
      'Fixing the wholesale price index of consumer goods',
      'Issuing currency notes on behalf of RBI',
    ],
    correctIndex: 0,
    explanation: 'The primary capital market channels long-term public savings into productive corporate investment. Secondary trading on BSE/NSE subsequently provides continuous liquidity and price discovery.',
    hints: [
      'Capital markets handle long-term funding (exceeding 1 year).',
      'An IPO channels savings of millions into the company equity.',
      'Option A represents mobilization of savings.',
    ],
  },
  // 12. Shares vs Debentures (Distinguish Understanding)
  {
    id: 'ch_fin_002',
    nodeId: NODE_C10_COMMSTUD_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is Debenture Interest classified as a "Charge against Profit" while Equity Dividend is an "Appropriation of Profit"?',
    options: [
      'Debenture interest is a legal debt payable regardless of profit/loss; Dividend is paid only if profit exists and Board recommends',
      'Debenture interest gives voting control; Dividend carries no voting rights',
      'Debenture interest is paid in bonus shares; Dividend is paid in cash collateral',
      'Debenture interest is variable; Equity dividend is guaranteed by SEBI',
    ],
    correctIndex: 0,
    explanation: 'Debenture holders are creditors, so interest is an obligatory business expense (charge against profit). Shareholders are owners, so dividend is a distribution of residual profit (appropriation).',
    hints: [
      'Creditors must be paid even if the company suffers a severe net loss.',
      'Can the Board skip equity dividends if profits are low? Yes.',
      'Charge = obligatory expense; Appropriation = distribution of net profit.',
    ],
    misconceptionIndex: 6,
  },
  // 13. Financing Choice Decision (Evaluation Competency)
  {
    id: 'ch_fin_003',
    nodeId: NODE_C10_COMMSTUD_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A tech startup with highly volatile earnings and high R&D risks needs ₹50 Crore long-term capital. Which source is safest for company survival and why?',
    options: [
      'Equity Shares — no fixed mandatory annual interest payout and no mandatory capital redemption date',
      '12% Secured Debentures — provides guaranteed tax deductions regardless of bankruptcy',
      '90-day Bank Overdraft — provides permanent funding for high tech machinery',
      'Cumulative Preference Shares with mandatory 15% guaranteed payout',
    ],
    correctIndex: 0,
    explanation: 'For volatile earnings, debt creates risk of insolvency because interest must be paid regardless of loss. Equity has no fixed return obligation and is permanent capital.',
    hints: [
      'Consider what happens if earnings drop to zero for 2 consecutive years.',
      'Fixed interest obligations on debentures force cash-strapped startups into liquidation.',
      'Equity provides permanent risk capital with flexible dividend policy.',
    ],
  },
  // 14. Short-term Finance - Discounting Calculation (Numeric Application)
  {
    id: 'ch_fin_004',
    nodeId: NODE_C10_COMMSTUD_026,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Chennai Steel Traders discounts a 60-day bill of exchange of ₹5,00,000 with Indian Bank at 12% p.a. Calculate the upfront proceeds received by Chennai Steel Traders (rounded to nearest Rupee, use 365 days).',
    correctAnswer: 490137,
    tolerance: 50,
    unit: '₹',
    explanation: 'Discount = 5,00,000 × 12% × 60/365 = ₹9,863. Proceeds = ₹5,00,000 − ₹9,863 = ₹4,90,137.',
    hints: [
      'Annual interest = 5,00,000 × 0.12 = ₹60,000.',
      'Discount for 60 days = 60,000 × 60 / 365 ≈ ₹9,863.',
      'Proceeds = 5,00,000 − 9,863 = 4,90,137.',
    ],
    misconceptionIndex: 7,
  },
  // 15. Cash Credit vs Overdraft (Distinguish Understanding)
  {
    id: 'ch_fin_005',
    nodeId: NODE_C10_COMMSTUD_026,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which is a core structural difference between Cash Credit and Bank Overdraft?',
    options: [
      'Cash Credit is a separate loan account secured against stock; Overdraft operates on an existing current account for temporary cash gaps',
      'Cash Credit is only for agriculture; Overdraft is only for listed multinational companies',
      'Cash Credit charges interest on the total sanctioned limit; Overdraft charges zero interest',
      'Overdraft requires hypothecation of factory plant; Cash Credit is always unsecured',
    ],
    correctIndex: 0,
    explanation: 'Cash Credit creates a dedicated loan account against pledged/hypothecated inventory. Overdraft permits negative balances on regular current accounts to bridge temporary cash gaps.',
    hints: [
      'Remember Sai Krishna Textiles in Erode hypothecating cotton yarn in a CC Account.',
      'Overdraft allows writing cheques beyond current account balance for a few days.',
      'Cash credit is a separate account against stock; overdraft is on current account.',
    ],
    misconceptionIndex: 8,
  },
  // 16. Recruitment Positive vs Selection Negative (Classify Recall)
  {
    id: 'ch_hr_001',
    nodeId: NODE_C10_COMMSTUD_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is Recruitment termed a "Positive" process while Selection is termed a "Negative" process?',
    options: [
      'Recruitment attracts and expands the applicant pool; Selection screens out and rejects unsuitable candidates',
      'Recruitment is done by optimistic managers; Selection is done by pessimistic auditors',
      'Recruitment offers employment immediately; Selection cancels appointment letters',
      'Recruitment is an internal promotion; Selection is only external advertisement',
    ],
    correctIndex: 0,
    explanation: 'Recruitment widens the top of the hiring funnel by stimulating applications. Selection narrows the funnel by rejecting unqualified applicants until the best candidate is chosen.',
    hints: [
      'Think about what happens to candidate numbers: recruitment increases them, selection decreases them.',
      'Recruitment creates the candidate pool; selection eliminates the unsuitable majority.',
      'Positive = creating options; Negative = filtering and rejecting.',
    ],
    misconceptionIndex: 9,
  },
  // 17. Recruitment Source Selection (Evaluation Competency)
  {
    id: 'ch_hr_002',
    nodeId: NODE_C10_COMMSTUD_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Bharat Electronics Ltd (BEL) needs 50 AI/ML Software Engineers for a next-gen radar project and 1 Chief Financial Officer to succeed the retiring CFO. Which sourcing strategy is optimal?',
    options: [
      'Engineers: External Campus Placement (IITs/NITs for fresh AI skills); CFO: Internal Promotion (deep institutional knowledge)',
      'Engineers: Internal Transfer of factory clerks; CFO: External Job Portal entry-level listing',
      'Both positions should exclusively use internal factory promotions',
      'Both positions should exclusively use Employment Exchange blue-collar registries',
    ],
    correctIndex: 0,
    explanation: '50 specialized AI engineers need cutting-edge academic training unavailable in legacy staff (External campus). CFO requires institutional memory, compliance knowledge, and morale boost (Internal promotion).',
    hints: [
      'Do existing traditional hardware employees possess fresh AI/ML toolchains?',
      'Does a defense PSU CFO need intimate familiarity with government DPE and defense accounting rules?',
      'External for fresh specialized bulk tech; Internal for high-level institutional governance.',
    ],
  },
  // 18. Selection Process Step Ordering (Drag Sort Application)
  {
    id: 'ch_hr_003',
    nodeId: NODE_C10_COMMSTUD_028,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the 7 standard steps of the Selection Process in economically rational order (cheapest filter first, expensive medical last).',
    sortItems: [
      'Preliminary Screening of Applications (Filter minimum qualifications)',
      'Selection Tests (Aptitude, Trade, or Personality testing)',
      'Employment Interview (In-depth assessment of fit and communication)',
      'Reference & Background Checks (Verifying past employment & conduct)',
      'Medical / Physical Examination (Hospital fitness check for finalists)',
      'Final Selection Decision by Hiring Manager',
      'Appointment Letter & Placement',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    explanation: 'Economic logic: Broad, low-cost screening first (CV review) -> group testing -> interview -> reference checks -> costly medical exam (₹2k-5k/person) for finalists only -> final hire decision -> appointment.',
    hints: [
      'Screening 5,000 CVs takes minutes and costs little.',
      'Why would a company not do expensive hospital medical tests before conducting written tests?',
      'Order from lowest cost/broadest filter to highest cost/narrowest finalist stage.',
    ],
    misconceptionIndex: 10,
  },
  // 19. Selection Test Types (Match Understanding)
  {
    id: 'ch_hr_004',
    nodeId: NODE_C10_COMMSTUD_028,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the Selection Test with its correct attribute and Indian organizational example:',
    options: [
      'Aptitude = Potential to learn (SSC CGL Tier-I); Trade = Existing hands-on skill (ISRO Soldering test)',
      'Aptitude = Physical stamina; Trade = Career counseling preferences',
      'Aptitude = Psychological extroversion; Trade = Theoretical essay writing',
      'Aptitude = Medical blood test; Trade = Reference verification with police',
    ],
    correctIndex: 0,
    explanation: 'Aptitude tests measure future learning capacity (future-oriented). Trade tests measure existing technical skill demonstrated on actual workpieces (present-oriented).',
    hints: [
      'Trainees who have never welded take an aptitude test to test learnability.',
      'Experienced welders take a trade test to demonstrate an actual weld bead.',
      'Aptitude = future potential; Trade = current demonstrated skill.',
    ],
    misconceptionIndex: 11,
  },
  // 20. On-the-Job Training Methods (Construct Application)
  {
    id: 'ch_hr_005',
    nodeId: NODE_C10_COMMSTUD_029,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the 3 core pillars of Larsen & Toubro\'s Construction Skills Training Institute (CSTI) Panvel program for site engineers.',
    availableParts: [
      'Apprenticeship under Apprentices Act 1961',
      'Coaching by Senior Site Engineer',
      'Job Rotation across Concreting & Steel-fixing',
      'Classroom Lecture only',
      'Off-site Vacation Tour',
    ],
    targetState: 'Apprenticeship under Apprentices Act 1961 Coaching by Senior Site Engineer Job Rotation across Concreting & Steel-fixing',
    validationHint: 'Select the 3 integrated On-the-Job methods: statutory trade apprenticeship + daily task coaching + cross-department rotation.',
    explanation: 'L&T CSTI integrates statutory Apprenticeship (NAPS stipend), daily task Coaching (rebar tying feedback), and Job Rotation (broadening cross-trade civil experience) at live construction sites.',
    hints: [
      'Select the 3 on-the-job techniques that occur on live construction sites.',
      'Apprenticeship provides legal structure, Coaching gives immediate feedback, Job Rotation gives breadth.',
      'Exclude classroom-only lectures or leisure items.',
    ],
  },
  // 21. Coaching vs Mentoring (Distinguish Understanding)
  {
    id: 'ch_hr_006',
    nodeId: NODE_C10_COMMSTUD_029,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'At Infosys, how does Coaching differ from Mentoring for a new joinee?',
    options: [
      'Coaching is short-term & task-specific (writing an SQL query); Mentoring is long-term & career-oriented (navigating professional growth)',
      'Coaching is done by HR outside India; Mentoring is a computerized multiple choice quiz',
      'Coaching provides retirement pensions; Mentoring provides health insurance',
      'Coaching is off-the-job; Mentoring is an unpaid trial period',
    ],
    correctIndex: 0,
    explanation: 'Coaching is task-focused (weeks) with immediate performance feedback. Mentoring is holistic career guidance (months to years) focusing on navigation, growth, and long-term trajectory.',
    hints: [
      'Think about learning how to negotiate a shelf display today vs planning a 5-year career path.',
      'Task vs Career; Short-term vs Long-term.',
      'Option A captures this scope and time horizon distinction perfectly.',
    ],
    misconceptionIndex: 12,
  },
  // 22. Off-the-Job Training Methods (Match Understanding)
  {
    id: 'ch_hr_007',
    nodeId: NODE_C10_COMMSTUD_030,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is Air India’s mock A320 cabin at Hyderabad classified as Vestibule Training while DRDO’s Tejas setup at Bengaluru is Simulation?',
    options: [
      'Vestibule uses a physical replica of the real workplace/equipment; Simulation uses a computerized mathematical model of system behavior',
      'Vestibule is an on-the-job trade test; Simulation is an entrance examination',
      'Vestibule is conducted in live passenger flights; Simulation is classroom reading',
      'Both are identical terms with no technical distinction',
    ],
    correctIndex: 0,
    explanation: 'Air India duplicates the exact physical cabin (real doors, physical muscle memory) = Vestibule. DRDO uses cockpit software actuators modeling flight physics = Simulation.',
    hints: [
      'Vestibule = physical duplicate environment for muscle memory.',
      'Simulation = computerized dynamic model of physical systems.',
      'Both are off-the-job, but physical duplicate vs software model differentiates them.',
    ],
    misconceptionIndex: 13,
  },
  // 23. Training Method Selection Strategy (Creativity Competency)
  {
    id: 'ch_hr_008',
    nodeId: NODE_C10_COMMSTUD_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Infosys Global Education Centre at Mysuru trains 14,000 engineering freshers annually on a 415-acre campus. Why does Infosys sequence Off-the-Job training BEFORE live On-the-Job project assignment?',
    options: [
      'To build foundational software architecture & quality compliance in a risk-free environment before touching live client billing systems',
      'Because Indian labor laws prohibit engineers from doing real coding on client projects',
      'To ensure engineers forget their university education completely',
      'To replace all project managers with automated scripts',
    ],
    correctIndex: 0,
    explanation: 'Off-the-job classroom lectures, case studies, and simulated coding environments build requisite competencies without risking client data, production downtime, or security breaches on live enterprise software.',
    hints: [
      'Consider the risk of an untrained coder pushing bugs to a global banking client database.',
      'Off-the-job training creates a safe learning sandbox for large batches.',
      'Foundation in Mysuru campus -> then real on-the-job project deployment.',
    ],
  },
  // 24. Integrated Turnaround Evaluation (Evaluation Competency)
  {
    id: 'ch_fa_004',
    nodeId: NODE_C10_COMMSTUD_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An accountant prepared Bharat Enterprises\' Balance Sheet showing Assets ₹4,53,000 and Liabilities ₹4,53,000. Later, an auditor discovered that ₹50,000 of factory machine repairs was recorded as Capitalized Machinery. Does the Balance Sheet tally, and is it accurate?',
    options: [
      'The Balance Sheet still tallies arithmetically, but it is fundamentally INACCURATE due to an Error of Principle (Overstated Profit and Overstated Fixed Assets)',
      'The Balance Sheet immediately stops tallying by exactly ₹50,000',
      'The Balance Sheet is 100% accurate because the accounting equation balanced',
      'Only the Cash Budget is affected; final accounts remain completely valid',
    ],
    correctIndex: 0,
    explanation: 'A tallying Balance Sheet proves arithmetic consistency, NOT absolute truth. Charging revenue repairs as a capital asset is an Error of Principle: Assets and Net Profit are both overstated by ₹50,000, masking real operational costs.',
    hints: [
      'Remember: Tallying proves arithmetic consistency (Debits = Credits), not accuracy.',
      'If an expense is capitalized, Assets increase by 50k and Net Profit increases by 50k -> both sides increase equally and still tally!',
      'This is an Error of Principle under ICAI accounting standards.',
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

// ─���─ DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_COMMSTUD_021,
  title: 'Commercial Studies: Final Accounts, Cost, Finance & HR Simulation',
  definition: 'Comprehensive commercial mastery covering Final Accounts (P&L and Balance Sheet with Closing Stock), Cost Behaviour & Nature, Master Budgeting, Capital Market & Short-term Banking Instruments, and HR Staffing (Recruitment, Selection, and Training).',
  eli5: 'Think of running a large enterprise like building an engine: Final Accounts show your fuel efficiency and weight, Cost and Budgeting tune the gears, Capital & Bank loans supply the electricity, and HR equips the skilled crew operating the machine.',
  misconceptions: [
    { misconception: 'Closing Stock appears only in the Trading Account, not in the Balance Sheet.', correction: 'Closing Stock must appear in BOTH the Trading Account (credit side, reducing COGS) and the Balance Sheet (Assets side, as a Current Asset).' },
    { misconception: 'Capital on the Balance Sheet is just the raw Trial Balance figure.', correction: 'Capital on the Balance Sheet is Adjusted Capital: Opening Capital + Net Profit (or - Net Loss) - Drawings.' },
    { misconception: 'A tallying Balance Sheet guarantees 100% accounting accuracy.', correction: 'A tallying Balance Sheet only proves arithmetic consistency. Errors of Principle, Omission, or Commission can exist while both sides still tally.' },
    { misconception: 'Production manager salary is a variable cost because it is in a factory.', correction: 'The test for variable cost is whether total expense scales with unit output. Monthly management salary is fixed within the relevant range.' },
    { misconception: 'Fixed cost per unit is constant because the total cost is fixed.', correction: 'Total fixed cost is constant, but Fixed Cost Per Unit falls as output rises (y = k/x, spreading the overhead).' },
    { misconception: 'All direct costs are variable costs.', correction: 'Directness measures traceability; variability measures behavior. A dedicated supervisor on one product line is Direct + Fixed.' },
    { misconception: 'Preference shareholders are creditors because they get a fixed dividend.', correction: 'Preference shareholders are owners with priority dividend rights. Dividends are declared from profit, unlike debenture interest which is a legal charge.' },
    { misconception: 'Discounting of bills means the bank offers a price concession.', correction: 'Discounting means the bank deducts interest in advance for the unexpired bill term (Face Value × Rate × Time / 365).' },
    { misconception: 'Cash Credit and Bank Overdraft are identical banking facilities.', correction: 'Cash Credit is a separate loan account secured against stock; Overdraft allows negative balances on current accounts for short-term gaps.' },
    { misconception: 'Interview is a source of recruitment.', correction: 'Interview is a Selection filter. Recruitment sources are methods that generate applicant pools (Campus placement, Advertisements, Referrals).' },
    { misconception: 'Medical examination should be conducted right after preliminary CV screening.', correction: 'Medical exams are expensive (₹2k-5k) and conducted only on the final shortlist of candidates who passed tests, interviews, and reference checks.' },
    { misconception: 'Aptitude tests and Trade tests test the same thing.', correction: 'Aptitude tests measure future potential to learn; Trade tests measure existing demonstrated technical skill.' },
    { misconception: 'Coaching and Mentoring are interchangeable terms.', correction: 'Coaching is short-term and task-specific; Mentoring is long-term and career-development oriented.' },
    { misconception: 'Vestibule training and Simulation are identical off-the-job techniques.', correction: 'Vestibule uses a physical duplicate workplace (mock cabin); Simulation uses computerized mathematical models of system behavior.' },
  ],
  diagnosticQuestions: [
    { question: 'Which item appears on the Credit side of the Profit & Loss Account?', options: ['Gross Profit b/d & Discount Received', 'Salaries & Wages', 'Plant & Machinery', 'Proprietor Drawings'], correctIndex: 0 },
    { question: 'What is Prime Cost?', options: ['Direct Material + Direct Labour + Direct Expenses', 'Fixed Cost + Variable Cost', 'Total Revenue − Gross Profit', 'Cash Credit + Overdraft'], correctIndex: 0 },
    { question: 'Which budget is the starting point in the master budgeting process?', options: ['Sales Budget', 'Cash Budget', 'Purchase Budget', 'Capital Budget'], correctIndex: 0 },
    { question: 'Debenture holders receive:', options: ['Fixed Interest (Charge against profit)', 'Variable Dividend', 'Voting rights at AGM', 'Equity share warrants'], correctIndex: 0 },
    { question: 'Under Cash Credit, interest is charged on:', options: ['Daily utilised balance', 'Total sanctioned limit', 'Value of fixed assets', 'Annual company turnover'], correctIndex: 0 },
    { question: 'Which of the following is an INTERNAL recruitment source?', options: ['Promotion & Employee Referral', 'Campus Placement', 'Naukri.com Portal', 'Employment Exchange'], correctIndex: 0 },
    { question: 'An ITI technician soldering test at ISRO is an example of:', options: ['Trade Test', 'Aptitude Test', 'Personality Test', 'Interest Test'], correctIndex: 0 },
    { question: 'Air India\'s mock A320 emergency evacuation cabin is an example of:', options: ['Vestibule Training', 'On-the-job Coaching', 'Computer Simulation', 'Apprenticeship'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student demonstrates full proficiency across ICSE Class 10 Commercial Studies: final accounts balancing, cost categorization, budgeting cycles, capital/loan structures, and HR staffing pipelines.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Final Accounts: P&L and Balance Sheet Mechanics',
    instruction: 'Adjust the indirect expense sliders and observe how Net Profit transfers into Adjusted Capital on the Balance Sheet.',
    interactionType: 'final-accounts-simulator',
    nodeId: NODE_C10_COMMSTUD_021,
  },
  {
    title: 'Cost Behaviour: Fixed vs Variable Dynamics',
    instruction: 'Slide the Production Volume (Units) to visualize why Fixed Cost per unit falls (y = k/x) while Variable Cost per unit stays flat.',
    interactionType: 'cost-curve-visualizer',
    nodeId: NODE_C10_COMMSTUD_022,
  },
  {
    title: 'The Master Budgeting Flow Pipeline',
    instruction: 'Click each budget phase in order from Sales to Master Budget to discover how departmental plans link seamlessly.',
    interactionType: 'budget-pipeline',
    nodeId: NODE_C10_COMMSTUD_024,
  },
  {
    title: 'Capital Market & Short-term Banking Facilities',
    instruction: 'Toggle between Long-Term (Equity/Debentures) and Short-Term (Cash Credit/Overdraft/Discounting) to compare risk and cost.',
    interactionType: 'finance-matrix',
    nodeId: NODE_C10_COMMSTUD_025,
  },
  {
    title: 'HR Staffing Funnel: Recruitment, Selection & Training',
    instruction: 'Drag candidates through the 7-step selection filter and match selected technicians to on-the-job vs off-the-job training.',
    interactionType: 'hr-pipeline-builder',
    nodeId: NODE_C10_COMMSTUD_028,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Bharat Enterprises doubles its factory production from 10,000 to 20,000 units, what will happen to its Fixed Cost per Unit (Rent = ₹2,00,000)?',
    options: [
      'It will halve from ₹20/unit to ₹10/unit',
      'It will double from ₹20/unit to ₹40/unit',
      'It will stay exactly constant at ₹20/unit',
      'It will jump to ₹2,00,000 per unit',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now drag the Production Volume slider in the Cost Lab to 20,000 units and observe the unit cost gauge.',
    nodeId: NODE_C10_COMMSTUD_022,
  },
  {
    question: 'Predict: If a company discounts a ₹10,00,000 90-day bill of exchange with a bank at 10% p.a., how much will the bank collect from the drawee on maturity?',
    options: [
      'The full face value of ₹10,00,000',
      'Only the discounted proceeds of ₹9,75,342',
      'Zero, because the bank absorbs the loss',
      '₹10,24,658 including compound interest',
    ],
    correctIndex: 0,
    verifyInstruction: 'Check the Short-Term Finance terminal: The bank collects the FULL face value; the discount is interest deducted in advance!',
    nodeId: NODE_C10_COMMSTUD_026,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the Total Cost line on the graph as production volume increases from zero?',
    observableOptions: [
      'Total cost starts at the Fixed Cost intercept (₹40 Lakhs) and rises linearly with variable cost',
      'Total cost starts at zero and drops downward',
      'Total cost stays flat horizontally regardless of volume',
      'Total cost fluctuates randomly without any mathematical pattern',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_COMMSTUD_022,
  },
  {
    question: 'In the Balance Sheet visualizer, what happens when Net Profit increases?',
    observableOptions: [
      'Adjusted Capital increases by the exact same amount on the Liabilities side',
      'Fixed Assets decrease by half',
      'Closing Stock disappears from Current Assets',
      'Bank Overdraft triples automatically',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_COMMSTUD_021,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Corporate Financial & HR Strategy Audit',
  description: 'Assume the role of Chief Commercial Officer at an Indian manufacturing firm (e.g. Havells or Voltas). Formulate a 4-point turnaround action plan integrating Accounts, Costing, Financing, and Talent development.',
  steps: [
    'Prepare an audited P&L & Balance Sheet structure incorporating Closing Stock adjustments.',
    'Segregate plant operating overheads into Direct vs Indirect and calculate Prime Cost.',
    'Determine the optimal capital structure: Equity vs 8% Debentures for long-term plant expansion.',
    'Formulate a 3-tier training roadmap combining On-the-Job Coaching/Apprenticeship with Off-the-Job Simulations.',
  ],
};

function C10_CommercialStudiesFinalAccountsProfitSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_COMMSTUD_021,
  title = DEFAULT_PROPS.title || 'Commercial Studies Simulation',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['commstud'] || { name: 'Commercial Studies', emoji: '📊', color: 'indigo' };

  // Phase navigation
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org style states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Dynamic simulation variables (30+ state hooks)
  const [grossProfitInput, setGrossProfitInput] = useState(150000);
  const [rentExpense, setRentExpense] = useState(18000);
  const [salaryExpense, setSalaryExpense] = useState(45000);
  const [insuranceExpense, setInsuranceExpense] = useState(5000);
  const [discountIncome, setDiscountIncome] = useState(6000);
  const [openingCapital, setOpeningCapital] = useState(300000);
  const [drawingsInput, setDrawingsInput] = useState(15000);
  const [closingStockInput, setClosingStockInput] = useState(75000);
  const [creditorsInput, setCreditorsInput] = useState(45000);
  const [plantAssets, setPlantAssets] = useState(160000);
  const [debtorsInput, setDebtorsInput] = useState(80000);
  const [cashBankInput, setCashBankInput] = useState(38000);

  // Cost curve state
  const [productionUnits, setProductionUnits] = useState(2000);
  const [fixedFactoryRent, setFixedFactoryRent] = useState(40000);
  const [variableUnitCost, setVariableUnitCost] = useState(35);
  const [semiFixedCharge, setSemiFixedCharge] = useState(10000);
  const [semiUnitRate, setSemiUnitRate] = useState(5);

  // Financing simulator state
  const [selectedFinanceTab, setSelectedFinanceTab] = useState<'equity' | 'debenture' | 'cash_credit' | 'overdraft' | 'discounting'>('equity');
  const [billFaceValue, setBillFaceValue] = useState(500000);
  const [billDays, setBillDays] = useState(60);
  const [discountRate, setDiscountRate] = useState(12);

  // Budget pipeline active step
  const [activeBudgetStep, setActiveBudgetStep] = useState(0);
  const [hrFilterStep, setHrFilterStep] = useState(0);

  // Adaptive BKT & Scoring state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Interactive challenges state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback FX state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED P&L & BALANCE SHEET VALUES ───
  const calculatedNetProfit = useMemo(() => {
    const totalCredit = grossProfitInput + discountIncome;
    const totalDebit = rentExpense + salaryExpense + insuranceExpense;
    return totalCredit - totalDebit;
  }, [grossProfitInput, discountIncome, rentExpense, salaryExpense, insuranceExpense]);

  const adjustedCapital = useMemo(() => {
    return openingCapital + calculatedNetProfit - drawingsInput;
  }, [openingCapital, calculatedNetProfit, drawingsInput]);

  const totalLiabilities = useMemo(() => {
    return adjustedCapital + creditorsInput;
  }, [adjustedCapital, creditorsInput]);

  const totalAssets = useMemo(() => {
    return plantAssets + debtorsInput + closingStockInput + cashBankInput;
  }, [plantAssets, debtorsInput, closingStockInput, cashBankInput]);

  const balanceSheetDifference = useMemo(() => {
    return totalAssets - totalLiabilities;
  }, [totalAssets, totalLiabilities]);

  // ─── DERIVED COST VALUES ───
  const costCalculations = useMemo(() => {
    const totalFixed = fixedFactoryRent;
    const totalVariable = productionUnits * variableUnitCost;
    const totalSemiVariable = semiFixedCharge + productionUnits * semiUnitRate;
    const totalCost = totalFixed + totalVariable + totalSemiVariable;
    const fixedPerUnit = productionUnits > 0 ? totalFixed / productionUnits : 0;
    const variablePerUnit = variableUnitCost;
    const totalCostPerUnit = productionUnits > 0 ? totalCost / productionUnits : 0;

    return { totalFixed, totalVariable, totalSemiVariable, totalCost, fixedPerUnit, variablePerUnit, totalCostPerUnit };
  }, [productionUnits, fixedFactoryRent, variableUnitCost, semiFixedCharge, semiUnitRate]);

  // Cost curve data for Recharts
  const chartData = useMemo(() => {
    const points = [];
    const maxUnits = Math.max(productionUnits * 2, 5000);
    const step = Math.max(Math.floor(maxUnits / 10), 500);
    for (let u = 500; u <= maxUnits; u += step) {
      const tf = fixedFactoryRent;
      const tv = u * variableUnitCost;
      const tsv = semiFixedCharge + u * semiUnitRate;
      const tc = tf + tv + tsv;
      points.push({
        units: u,
        fixedCost: tf,
        variableCost: tv,
        totalCost: tc,
        fixedPerUnit: Math.round(tf / u),
      });
    }
    return points;
  }, [productionUnits, fixedFactoryRent, variableUnitCost, semiFixedCharge, semiUnitRate]);

  // ─── DERIVED BILL DISCOUNTING VALUES ───
  const billCalculations = useMemo(() => {
    const discount = (billFaceValue * (discountRate / 100) * billDays) / 365;
    const proceeds = billFaceValue - discount;
    return { discount: Math.round(discount), proceeds: Math.round(proceeds) };
  }, [billFaceValue, billDays, discountRate]);

  // ─── ADAPTIVE DIFFICULTY: Filter challenges ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION ───
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

  // ─── ESCALATING HINTS HANDLER ───
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
      speechManager.speak('Let us review the step-by-step commercial solution.');
    }
  }, [hintCount, activeChallenge]);

  // ─── INACTIVITY TIMER ───
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

  // ─── 2D CANVAS ANIMATION (FLOW OF FUNDS) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background track
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flowing particles representing transactions
      const particleCount = 12;
      for (let i = 0; i < particleCount; i++) {
        const x = ((frame * 2 + (i * canvas.width) / particleCount) % canvas.width);
        const y = canvas.height / 2 + Math.sin(frame * 0.05 + i) * 6;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#34d399';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#38bdf8';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw text badge
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Active Ledger Pipeline | P&L: ₹${calculatedNetProfit.toLocaleString('en-IN')}`, 10, 16);

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [calculatedNetProfit]);

  // ─── HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent! You understood the dual entry of closing stock.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration labs. Feel free to manipulate each simulation!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to free sandbox mode. Test any scenario freely without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Starting the official CISCE competency challenges. Good luck!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test with the slider to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation! Fixed costs create an intercept.' : 'Observe the starting point of the total cost line.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = [...prev];
      if (arr.length === 0 && activeChallenge.sortItems) {
        arr = activeChallenge.sortItems.map((_, i) => i);
      }
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You completed the comprehensive final accounts and commercial studies simulation.');
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
      isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding work.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + activeChallenge.nodeId, JSON.stringify({ masteryLevel: 'proficient' }));
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
        speechManager.speak('All hints exhausted. Let us inspect the full solution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  const handleSparkleClick = useCallback((e: React.MouseEvent) => {
    setSparklePos({ x: e.clientX, y: e.clientY });
    setShowSparkle(true);
    audioManager.play('sparkle');
  }, []);

  const handleTallyAutoBalance = useCallback(() => {
    const diff = totalLiabilities - (plantAssets + debtorsInput + closingStockInput);
    if (diff > 0) {
      setCashBankInput(diff);
      audioManager.play('balance');
      speechManager.speak('Balance Sheet adjusted! Bank balance auto-balanced.');
    }
  }, [totalLiabilities, plantAssets, debtorsInput, closingStockInput]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-800 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">CISCE Class 10 Commercial Studies</span>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-mono border border-emerald-500/20">NEP 2020 Compliant</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Difficulty */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : difficulty === 'standard'
                ? 'bg-gold-500/10 text-gold-400 border-gold-500/30'
                : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <button
            onClick={handleSparkleClick}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl transition-colors"
            title="Interactive Sparkle"
            aria-label="Sparkle interaction"
          >
            ✨
          </button>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg">
            <span className="text-xs font-extrabold text-gold-400 uppercase tracking-widest">Executive Scenario</span>
            <h2 className="text-2xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs mt-2 border-t border-gold-900/50 pt-2">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <span className="text-lg">💡</span>
              <h3 className="font-bold text-sm tracking-wide">Discovery Question (Non-Graded Hook)</h3>
            </div>
            <p className="text-white text-base font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-800/40 border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-gold-500 hover:bg-slate-750'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Closing stock appears in both Trading A/c & Balance Sheet.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Advance to exploration labs"
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-900/50 flex items-center gap-2"
                >
                  <span>Enter Interactive Labs</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION (BRILLIANT.ORG PATTERN) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Navigation Bar between Exploration Steps */}
          <div className="flex items-center justify-between bg-slate-900 p-2 rounded-2xl border border-slate-800">
            <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  aria-label={`Go to step ${idx + 1}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    currentSlide === idx
                      ? 'bg-gold-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Step {idx + 1}
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-400 font-mono px-3">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <span className="text-xs font-extrabold text-gold-400 uppercase tracking-widest">
                  Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{EXPLORATION_STEPS[currentSlide].title}</h2>
                <p className="text-amber-300 text-sm mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── VISUALIZATION 1: FINAL ACCOUNTS & CLOSING STOCK SIMULATOR ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* SVG DIAGRAM 1: Final Accounts & Closing Stock Flow */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-400 mb-2">ICSE Final Accounts Flow: Trading A/c → P&L A/c → Balance Sheet</span>
                    <svg viewBox="0 0 720 100" className="w-full max-w-2xl h-auto">
                      <rect x="10" y="20" width="180" height="60" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="100" y="45" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Trading Account</text>
                      <text x="100" y="65" textAnchor="middle" fill="#38bdf8" fontSize="10">Cr: Closing Stock & Sales</text>

                      <path d="M 190 50 L 260 50" stroke="#6366f1" strokeWidth="2" />
                      <text x="225" y="42" textAnchor="middle" fill="#a5b4fc" fontSize="9">Gross Profit</text>

                      <rect x="260" y="20" width="180" height="60" rx="8" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="2" />
                      <text x="350" y="45" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Profit & Loss A/c</text>
                      <text x="350" y="65" textAnchor="middle" fill="#34d399" fontSize="10">Net Profit Calculated</text>

                      <path d="M 440 50 L 510 50" stroke="#3b82f6" strokeWidth="2" />
                      <text x="475" y="42" textAnchor="middle" fill="#93c5fd" fontSize="9">Add to Capital</text>

                      <rect x="510" y="15" width="200" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="610" y="42" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Balance Sheet</text>
                      <text x="610" y="60" textAnchor="middle" fill="#a7f3d0" fontSize="10">Assets = Liab + Capital</text>
                      <text x="610" y="74" textAnchor="middle" fill="#6ee7b7" fontSize="9">Current Asset: Closing Stock</text>
                    </svg>
                  </div>

                  {/* Interactive Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Gross Profit b/d:</span>
                        <span className="font-mono text-emerald-400">₹{grossProfitInput.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        type="range"
                        min={50000}
                        max={300000}
                        step={5000}
                        value={grossProfitInput}
                        onChange={e => setGrossProfitInput(Number(e.target.value))}
                        aria-label="Gross Profit slider"
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Shop Rent Expense:</span>
                        <span className="font-mono text-rose-400">₹{rentExpense.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        type="range"
                        min={5000}
                        max={50000}
                        step={1000}
                        value={rentExpense}
                        onChange={e => setRentExpense(Number(e.target.value))}
                        aria-label="Rent Expense slider"
                        className="w-full accent-rose-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Closing Stock (Asset & Trading):</span>
                        <span className="font-mono text-gold-400">₹{closingStockInput.toLocaleString('en-IN')}</span>
                      </div>
                      <input
                        type="range"
                        min={20000}
                        max={150000}
                        step={5000}
                        value={closingStockInput}
                        onChange={e => setClosingStockInput(Number(e.target.value))}
                        aria-label="Closing stock slider"
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>

                  {/* Dual Financial Statements Side-by-Side (CISCE Format) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Profit and Loss Account */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
                        <span className="font-bold text-sm text-gold-300">Profit & Loss Account (For the year ended)</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-gold-900/50 text-gold-300 border border-gold-700">Nominal A/c</span>
                      </div>
                      <div className="grid grid-cols-2 text-xs border-b border-slate-800 pb-2">
                        <div className="border-r border-slate-800 pr-2 space-y-1.5 text-slate-300">
                          <p className="font-bold text-slate-400">Particulars (Debit Dr.)</p>
                          <p>To Shop Rent: ₹{rentExpense.toLocaleString('en-IN')}</p>
                          <p>To Salaries: ₹{salaryExpense.toLocaleString('en-IN')}</p>
                          <p>To Insurance: ₹{insuranceExpense.toLocaleString('en-IN')}</p>
                          <div className="p-1.5 bg-emerald-950/40 border border-emerald-800/50 rounded font-bold text-emerald-400">
                            To Net Profit (c/d to Capital): ₹{calculatedNetProfit.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div className="pl-2 space-y-1.5 text-slate-300">
                          <p className="font-bold text-slate-400">Particulars (Credit Cr.)</p>
                          <p>By Gross Profit b/d: ₹{grossProfitInput.toLocaleString('en-IN')}</p>
                          <p>By Discount Recd: ₹{discountIncome.toLocaleString('en-IN')}</p>
                          <div className="pt-6 font-bold text-slate-200 border-t border-slate-800">
                            Total: ₹{(grossProfitInput + discountIncome).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Balance Sheet Statement */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
                        <span className="font-bold text-sm text-gold-300">Balance Sheet (As at 31st March)</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-700">Financial Statement</span>
                      </div>
                      <div className="grid grid-cols-2 text-xs border-b border-slate-800 pb-2">
                        <div className="border-r border-slate-800 pr-2 space-y-1 text-slate-300">
                          <p className="font-bold text-slate-400">Liabilities & Capital</p>
                          <p>Opening Capital: ₹{openingCapital.toLocaleString('en-IN')}</p>
                          <p className="text-emerald-400">+ Net Profit: ₹{calculatedNetProfit.toLocaleString('en-IN')}</p>
                          <p className="text-rose-400">− Drawings: ₹{drawingsInput.toLocaleString('en-IN')}</p>
                          <p className="font-bold text-gold-300 border-t border-slate-800 pt-1">
                            Adjusted Capital: ₹{adjustedCapital.toLocaleString('en-IN')}
                          </p>
                          <p>Creditors: ₹{creditorsInput.toLocaleString('en-IN')}</p>
                          <p className="font-bold text-white pt-2">Total Liab: ₹{totalLiabilities.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="pl-2 space-y-1 text-slate-300">
                          <p className="font-bold text-slate-400">Assets</p>
                          <p>Plant & Machinery: ₹{plantAssets.toLocaleString('en-IN')}</p>
                          <p>Debtors: ₹{debtorsInput.toLocaleString('en-IN')}</p>
                          <div className="p-1 bg-gold-950/50 border border-gold-800 rounded text-gold-300 font-bold">
                            Closing Stock: ₹{closingStockInput.toLocaleString('en-IN')}
                          </div>
                          <p>Cash & Bank: ₹{cashBankInput.toLocaleString('en-IN')}</p>
                          <p className="font-bold text-white pt-4">Total Assets: ₹{totalAssets.toLocaleString('en-IN')}</p>
                        </div>
                      </div>

                      {/* Tally Verification Banner */}
                      <div className="mt-3 flex items-center justify-between text-xs">
                        {balanceSheetDifference === 0 ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            ✓ Balance Sheet Tallies perfectly at ₹{totalLiabilities.toLocaleString('en-IN')}!
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400">
                              Difference: ₹{Math.abs(balanceSheetDifference).toLocaleString('en-IN')}
                            </span>
                            <button
                              onClick={handleTallyAutoBalance}
                              className="px-2 py-0.5 bg-gold-700 hover:bg-gold-600 text-white rounded text-[11px]"
                            >
                              Auto-Balance Bank
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── VISUALIZATION 2: COST BEHAVIOR CURVES (FIXED / VARIABLE / SEMI) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* SVG DIAGRAM 2: Cost Nature & Behaviour Model */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-xs font-bold text-slate-400 mb-2">Cost Structure: Direct vs Indirect & Fixed vs Variable</span>
                    <svg viewBox="0 0 700 90" className="w-full max-w-2xl h-auto">
                      <rect x="20" y="15" width="190" height="60" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                      <text x="115" y="40" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Prime Cost</text>
                      <text x="115" y="58" textAnchor="middle" fill="#c7d2fe" fontSize="9">Direct Mat + Labour + Exp</text>

                      <text x="235" y="50" textAnchor="middle" fill="#f59e0b" fontSize="18" fontWeight="bold">+</text>

                      <rect x="255" y="15" width="190" height="60" rx="8" fill="#1e3a5f" stroke="#38bdf8" strokeWidth="2" />
                      <text x="350" y="40" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Factory Overheads</text>
                      <text x="350" y="58" textAnchor="middle" fill="#bae6fd" fontSize="9">Fixed Rent + Power + Superv.</text>

                      <text x="470" y="50" textAnchor="middle" fill="#10b981" fontSize="18" fontWeight="bold">=</text>

                      <rect x="490" y="15" width="190" height="60" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                      <text x="585" y="40" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Works / Total Cost</text>
                      <text x="585" y="58" textAnchor="middle" fill="#a7f3d0" fontSize="9">Fixed Total + Variable(Q)</text>
                    </svg>
                  </div>

                  {/* Predict Then Check Pattern */}
                  {!predictionMade ? (
                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800">
                      <p className="text-white text-sm font-bold mb-2">❓ {PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Prediction choice ${i + 1}`}
                            className="p-2.5 text-left bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-gold-700 text-xs text-gold-300 flex justify-between items-center">
                      <span>✓ Prediction logged! {PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <span className="font-mono font-bold text-amber-300">
                        {predictionIndex === PREDICTION_QUESTIONS[0].correctIndex ? 'Prediction: Correct' : 'Prediction: Recorded'}
                      </span>
                    </div>
                  )}

                  {/* Slider Control */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
                      <span className="font-bold">Production Volume (Q Units):</span>
                      <span className="text-gold-400 font-mono font-bold text-sm">{productionUnits.toLocaleString()} Units</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={10000}
                      step={250}
                      value={productionUnits}
                      onChange={e => setProductionUnits(Number(e.target.value))}
                      aria-label="Production units slider"
                      className="w-full accent-gold-500"
                    />

                    {/* Gauges Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs font-mono">
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 text-[10px] uppercase">Fixed Cost (Total)</span>
                        <p className="text-white font-bold text-sm">₹{costCalculations.totalFixed.toLocaleString('en-IN')}</p>
                        <span className="text-emerald-400 text-[10px]">Constant (Flat)</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 text-[10px] uppercase">Fixed / Unit (y=k/x)</span>
                        <p className="text-gold-400 font-bold text-sm">₹{costCalculations.fixedPerUnit.toFixed(2)}</p>
                        <span className="text-gold-400 text-[10px]">Drops with Scale</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 text-[10px] uppercase">Variable / Unit</span>
                        <p className="text-amber-400 font-bold text-sm">₹{costCalculations.variablePerUnit.toFixed(2)}</p>
                        <span className="text-slate-400 text-[10px]">Constant (k)</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 text-[10px] uppercase">Total Cost (F+vQ+SV)</span>
                        <p className="text-emerald-400 font-bold text-sm">₹{costCalculations.totalCost.toLocaleString('en-IN')}</p>
                        <span className="text-gold-400 text-[10px]">₹{costCalculations.totalCostPerUnit.toFixed(2)}/unit</span>
                      </div>
                    </div>
                  </div>

                  {/* Recharts Curve Visualization */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 h-64">
                    <p className="text-xs text-slate-400 font-bold mb-2">Cost Behavior Curves (Total Cost vs Fixed & Variable)</p>
                    <ResponsiveContainer width="100%" height="85%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="units" stroke="#64748b" fontSize={10} unit=" u" />
                        <YAxis stroke="#64748b" fontSize={10} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }}
                          formatter={(value: number | string | Array<number | string>) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                        />
                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                        <Line type="monotone" dataKey="totalCost" stroke="#38bdf8" strokeWidth={2} name="Total Cost (TC)" dot={false} />
                        <Line type="monotone" dataKey="variableCost" stroke="#f59e0b" strokeWidth={2} name="Variable Cost (VC)" dot={false} />
                        <Line type="monotone" dataKey="fixedCost" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" name="Fixed Cost (FC)" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-850 rounded-xl border border-slate-700">
                      <p className="text-white text-xs font-bold mb-2">👀 Observation: {OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleObservation(i)}
                            aria-label={`Observation option ${i + 1}`}
                            className="p-2 text-left bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── VISUALIZATION 3: BUDGETING PIPELINE ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">Click each budget block to observe the integration chain from Sales to Master Budget:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {[
                      { name: '1. Sales Budget', desc: 'Starting point: Forecasts unit volume & revenue targets', tag: 'Demand' },
                      { name: '2. Production Budget', desc: 'Units = Sales + Desired Closing Stock − Opening Stock', tag: 'Output' },
                      { name: '3. Purchase Budget', desc: 'Raw material procurement in units & Rupees', tag: 'Materials' },
                      { name: '4. Cash Budget', desc: 'Tracks monthly receipts & payments to prevent insolvency', tag: 'Liquidity' },
                      { name: '5. Master Budget', desc: 'Integrated summary: Budgeted P&L and Balance Sheet', tag: 'Consolidation' },
                    ].map((step, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => {
                          setActiveBudgetStep(idx);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          activeBudgetStep === idx
                            ? 'bg-gold-900/60 border-gold-400 text-white shadow-lg shadow-gold-950'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-gold-300">{step.tag}</span>
                        <h4 className="font-bold text-xs mt-2 text-slate-200">{step.name}</h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">{step.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* SVG DIAGRAM 3: Flow Diagram */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 700 120" className="w-full max-w-2xl h-auto">
                      <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4f46e5" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                      <rect x="20" y="35" width="100" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="70" y="65" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Sales</text>
                      <path d="M 120 60 L 155 60" stroke="#6366f1" strokeWidth="2" />

                      <rect x="160" y="35" width="110" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="215" y="65" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Production</text>
                      <path d="M 270 60 L 305 60" stroke="#6366f1" strokeWidth="2" />

                      <rect x="310" y="35" width="100" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="360" y="65" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Purchase</text>
                      <path d="M 410 60 L 445 60" stroke="#6366f1" strokeWidth="2" />

                      <rect x="450" y="35" width="90" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="495" y="65" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Cash</text>
                      <path d="M 540 60 L 575 60" stroke="#6366f1" strokeWidth="2" />

                      <rect x="580" y="30" width="100" height="60" rx="10" fill="url(#grad1)" stroke="#38bdf8" strokeWidth="2" />
                      <text x="630" y="65" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Master</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ─── VISUALIZATION 4: SOURCES OF FINANCE SIMULATOR ─── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  {/* Tab Selector */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'equity' as const, label: 'Equity Shares (Long-Term)' },
                      { id: 'debenture' as const, label: 'Debentures (Long-Term Debt)' },
                      { id: 'cash_credit' as const, label: 'Cash Credit (Short-Term Bank)' },
                      { id: 'overdraft' as const, label: 'Bank Overdraft (Short-Term)' },
                      { id: 'discounting' as const, label: 'Discounting of Bills (Realization)' },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setSelectedFinanceTab(tab.id);
                          audioManager.play('tap');
                        }}
                        aria-label={`Select finance tab ${tab.label}`}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedFinanceTab === tab.id
                            ? 'bg-gold-600 text-white shadow-md'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Terminal Card */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
                    {selectedFinanceTab === 'equity' && (
                      <div className="space-y-2 text-xs">
                        <span className="text-emerald-400 font-bold">Ownership Capital | Permanent Basis</span>
                        <h4 className="text-base font-bold text-white">Equity Shares (Ordinary Shares)</h4>
                        <p className="text-slate-300">Shareholders are part-owners with voting rights (one share, one vote). Dividend is an appropriation of profit (paid only when profit is earned and Board recommends). No mandatory capital redemption.</p>
                        <div className="grid grid-cols-3 gap-2 mt-3 font-mono">
                          <div className="p-2 bg-slate-900 rounded border border-slate-800"><span className="text-slate-400">Status:</span> Owner</div>
                          <div className="p-2 bg-slate-900 rounded border border-slate-800"><span className="text-slate-400">Return:</span> Variable Dividend</div>
                          <div className="p-2 bg-slate-900 rounded border border-slate-800"><span className="text-slate-400">Security:</span> Unsecured (Permanent)</div>
                        </div>
                      </div>
                    )}
                    {selectedFinanceTab === 'debenture' && (
                      <div className="space-y-2 text-xs">
                        <span className="text-amber-400 font-bold">Borrowed Capital | Creditorship Basis</span>
                        <h4 className="text-base font-bold text-white">Debentures (e.g. Reliance 7.95% NCDs)</h4>
                        <p className="text-slate-300">Debenture-holders are creditors. Interest is a fixed legal charge against profit (must be paid even in a loss year). Repayable at maturity (e.g. 10 years). Usually secured on fixed assets.</p>
                        <div className="grid grid-cols-3 gap-2 mt-3 font-mono">
                          <div className="p-2 bg-slate-900 rounded border border-slate-800"><span className="text-slate-400">Status:</span> Creditor</div>
                          <div className="p-2 bg-slate-900 rounded border border-slate-800"><span className="text-slate-400">Return:</span> Fixed Interest</div>
                          <div className="p-2 bg-slate-900 rounded border border-slate-800"><span className="text-slate-400">Voting:</span> No Voting Rights</div>
                        </div>
                      </div>
                    )}
                    {selectedFinanceTab === 'discounting' && (
                      <div className="space-y-4">
                        <div className="text-xs">
                          <span className="text-gold-400 font-bold">Short-Term Commercial Bank Facility</span>
                          <h4 className="text-base font-bold text-white">Bill Discounting Live Calculator</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-slate-400">Bill Face Value: ₹{billFaceValue.toLocaleString('en-IN')}</span>
                            <input type="range" min={100000} max={2000000} step={50000} value={billFaceValue} onChange={e => setBillFaceValue(Number(e.target.value))} className="w-full accent-gold-500" />
                          </div>
                          <div>
                            <span className="text-slate-400">Tenure: {billDays} Days</span>
                            <input type="range" min={30} max={180} step={15} value={billDays} onChange={e => setBillDays(Number(e.target.value))} className="w-full accent-gold-500" />
                          </div>
                          <div>
                            <span className="text-slate-400">Discount Rate: {discountRate}% p.a.</span>
                            <input type="range" min={6} max={18} step={1} value={discountRate} onChange={e => setDiscountRate(Number(e.target.value))} className="w-full accent-amber-500" />
                          </div>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs font-mono">
                          <div>
                            <span className="text-slate-400">Bank Discount (Interest In Advance):</span>
                            <p className="text-rose-400 font-bold text-sm">₹{billCalculations.discount.toLocaleString('en-IN')}</p>
                          </div>
                          <div>
                            <span className="text-slate-400">Immediate Proceeds to Seller:</span>
                            <p className="text-emerald-400 font-bold text-sm">₹{billCalculations.proceeds.toLocaleString('en-IN')}</p>
                          </div>
                          <div>
                            <span className="text-slate-400">Bank Collects at Maturity:</span>
                            <p className="text-gold-400 font-bold text-sm">₹{billFaceValue.toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {(selectedFinanceTab === 'cash_credit' || selectedFinanceTab === 'overdraft') && (
                      <div className="space-y-2 text-xs">
                        <span className="text-purple-400 font-bold">Working Capital Short-Term Bank Loan</span>
                        <h4 className="text-base font-bold text-white">
                          {selectedFinanceTab === 'cash_credit' ? 'Cash Credit Account (Stock Hypothecation)' : 'Current Account Overdraft (Temporary Gaps)'}
                        </h4>
                        <p className="text-slate-300">
                          {selectedFinanceTab === 'cash_credit'
                            ? 'Separate loan account opened against hypothecated stock of raw materials. Interest charged solely on daily utilised balance (not sanctioned limit).'
                            : 'Operates on existing current account allowing overdrawn balance for a few days to bridge liquidity timing mismatches.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── VISUALIZATION 5: HR RECRUITMENT, SELECTION & TRAINING FUNNEL ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-400">Step through the 7-stage Selection Funnel (Economics of Filtering):</p>
                    <button
                      onClick={() => setHrFilterStep(prev => (prev + 1) % 7)}
                      className="px-3 py-1 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-bold"
                    >
                      Advance Funnel Stage →
                    </button>
                  </div>

                  {/* Funnel Visualizer */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    {[
                      { step: 1, name: '1. Preliminary Screening', pool: '5,000 Applicants', cost: '₹0 (Filter CVs)' },
                      { step: 2, name: '2. Selection Tests (Aptitude/Trade)', pool: '1,200 Candidates', cost: '₹100 / test' },
                      { step: 3, name: '3. Employment Interview', pool: '250 Shortlisted', cost: '₹1,500 / interview' },
                      { step: 4, name: '4. Reference & Background Check', pool: '80 Finalists', cost: '₹800 / check' },
                      { step: 5, name: '5. Medical / Physical Fitness Exam', pool: '35 Finalists', cost: '₹3,500 / exam' },
                      { step: 6, name: '6. Final Selection Decision', pool: '25 Appointed', cost: 'Managerial Signoff' },
                      { step: 7, name: '7. Placement & Training Roadmap', pool: '25 Productive Hires', cost: 'On/Off the Job' },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        animate={{
                          opacity: idx <= hrFilterStep ? 1 : 0.3,
                          scale: idx === hrFilterStep ? 1.01 : 1,
                        }}
                        className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${
                          idx === hrFilterStep
                            ? 'bg-gold-950/70 border-gold-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="font-bold">{item.name}</span>
                        <span className="font-mono text-amber-400">{item.pool}</span>
                        <span className="font-mono text-emerald-400">{item.cost}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-gold-950"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950 flex items-center gap-2"
              >
                <span>Enter Free Sandbox</span>
                <span>→</span>
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Free Play Sandbox</span>
              <h2 className="text-xl font-bold text-white">Full Commercial Master Dashboard</h2>
              <p className="text-slate-400 text-xs mt-1">Explore live ledgers, cost graphs, and bill discounting without grading pressure.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-emerald-950 flex items-center gap-2"
            >
              <span>Ready for Challenges!</span>
              <span>→</span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Live Financial Ledger Canvas */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-300">Live Operating Ledger Pipeline</span>
              <canvas ref={canvasRef} width={400} height={40} className="w-full rounded-xl border border-slate-800" />
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Net Profit:</span>
                  <p className="text-emerald-400 font-bold">₹{calculatedNetProfit.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-400">Adjusted Capital:</span>
                  <p className="text-gold-400 font-bold">₹{adjustedCapital.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>

            {/* Quick Production Cost Simulator */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gold-300">Cost at {productionUnits} Units:</span>
                <span className="font-mono text-emerald-400 font-bold">Total: ₹{costCalculations.totalCost.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={500}
                max={10000}
                step={500}
                value={productionUnits}
                onChange={e => setProductionUnits(Number(e.target.value))}
                className="w-full accent-gold-500"
              />
              <p className="text-[11px] text-slate-400">
                Fixed Cost / Unit: <strong className="text-white">₹{costCalculations.fixedPerUnit.toFixed(2)}</strong> | Variable / Unit: <strong className="text-white">₹{costCalculations.variablePerUnit}</strong>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: OFFICIAL COMPETENCY CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono">
                  Competency: <strong className="text-gold-300 uppercase">{activeChallenge.competencyLevel}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-gold-900/60 text-gold-300 font-mono font-bold">
                  Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
                </span>
              </div>
            </div>
            {/* Animated Progress Bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-emerald-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Active Challenge Card */}
          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <div className="flex items-center gap-2 text-gold-400 text-xs font-mono font-bold uppercase mb-2">
              <span>Node: {activeChallenge.nodeId}</span>
              <span>•</span>
              <span>Level: {activeChallenge.difficulty}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed">
              {activeChallenge.question}
            </h3>

            {/* Render Question Based on Type */}
            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="space-y-2.5">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-gold-500 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Type: Numeric Input */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value..."
                    disabled={showExplanation || answerRevealed}
                    aria-label="Numerical answer input"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-gold-500 focus:outline-none w-full max-w-sm"
                  />
                  <span className="text-sm font-bold text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || answerRevealed || !numericInput}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm disabled:opacity-40"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* Type: Drag-Sort Sequence */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">Click arrows or drag to arrange items in correct sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <div
                      key={displayIdx}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-200"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-gold-950 text-gold-400 font-mono flex items-center justify-center text-[10px] font-bold">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => displayIdx > 0 && handleSortMove(displayIdx, displayIdx - 1)}
                          disabled={displayIdx === 0 || showExplanation}
                          aria-label={`Move ${item} up`}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px] disabled:opacity-30"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() =>
                            displayIdx < activeChallenge.sortItems!.length - 1 &&
                            handleSortMove(displayIdx, displayIdx + 1)
                          }
                          disabled={displayIdx === activeChallenge.sortItems.length - 1 || showExplanation}
                          aria-label={`Move ${item} down`}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px] disabled:opacity-30"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs"
                >
                  Verify Order
                </motion.button>
              </div>
            )}

            {/* Type: Drag-Label Mapping */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4 pt-2">
                {/* Palette */}
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label ${item.label}`}
                      className="px-3 py-1.5 bg-gold-700 text-white rounded-lg cursor-grab font-bold text-xs shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Zones */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'box_fixed', title: 'Maruti Factory Rent (₹40L/mo)', hint: 'Total unchanged with volume' },
                    { id: 'box_var', title: 'Steel Sheet (₹60,000/car)', hint: 'Scales in direct proportion' },
                    { id: 'box_semi', title: 'Power (₹5L fix + ₹8/u)', hint: 'Standing charge + usage' },
                  ].map(zone => (
                    <div
                      key={zone.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(zone.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[100px]"
                    >
                      <span className="text-xs font-bold text-slate-300">{zone.title}</span>
                      <div className="mt-2 text-xs font-mono text-gold-400">
                        {droppedLabels[zone.id] ? (
                          <span className="px-2 py-1 bg-gold-900 rounded font-bold">
                            ✓ {droppedLabels[zone.id]}
                          </span>
                        ) : (
                          <span className="text-slate-500">Drop matching label here</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs"
                >
                  Submit Labels
                </motion.button>
              </div>
            )}

            {/* Type: Construct */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-amber-300">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <button
                      key={i}
                      onClick={() => !constructParts.includes(part) && setConstructParts(p => [...p, part])}
                      disabled={constructParts.includes(part) || showExplanation}
                      aria-label={`Add part ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs disabled:opacity-40"
                    >
                      + {part}
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-gold-900/80 text-gold-200 rounded-md text-xs font-mono flex items-center gap-1">
                      {part}
                      <button onClick={() => setConstructParts(p => p.filter((_, i) => i !== idx))} className="text-rose-400 ml-1">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-500 text-xs">Click available components above to assemble your answer</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs"
                >
                  Validate Assembly
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation Banner */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-gold-950/60 border border-gold-700/60 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gold-300 uppercase tracking-wider">
                    Commercial Analysis & Solution:
                  </span>
                  <span className="text-xs text-gold-400 font-mono">
                    Step {revealedSteps + 1} of {activeChallenge.explanation.split('. ').filter(s => s.trim()).length}
                  </span>
                </div>

                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim())
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-slate-200 text-xs sm:text-sm leading-relaxed"
                    >
                      <strong className="text-gold-400">{idx + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim()).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950 flex items-center gap-2"
                    >
                      <span>{currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Simulation' : 'Next Challenge'}</span>
                      <span>→</span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MASTERY PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-900 rounded-3xl border border-gold-700 shadow-2xl text-center space-y-4">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Commercial Studies Simulation Complete!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have completed the multi-node simulation covering Final Accounts, Cost Behaviour, Master Budgeting, Sources of Finance, and HR Staffing.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <div className="px-5 py-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 uppercase">Final Accuracy</span>
                <p className="text-2xl font-black text-emerald-400 font-mono">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="px-5 py-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 uppercase">BKT Mastery Level</span>
                <p className="text-2xl font-black text-gold-400 font-mono capitalize">{masteryLevel}</p>
              </div>
              <div className="px-5 py-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 uppercase">Next SM-2 Spaced Review</span>
                <p className="text-2xl font-black text-amber-400 font-mono">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                </p>
              </div>
            </div>
          </div>

          {/* Spaced Repetition Schedule (SRS) Visibility Card */}
          <div className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 bg-amber-950/70 border border-amber-800/60 rounded-xl">🗓️</span>
              <div>
                <h4 className="text-sm font-bold text-amber-300">Spaced Repetition Schedule (SRS)</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {errors === 0
                    ? 'Outstanding! 0 errors detected. Review this topic in 7 days to maintain long-term memory.'
                    : errors <= 3
                    ? `Great job with only ${errors} minor ${errors === 1 ? 'slip' : 'slips'}. Review in 3 days to lock in the concepts.`
                    : `${errors} conceptual errors identified. Review in 1 day to reinforce ICSE commercial principles.`}
                </p>
              </div>
            </div>
            <div className="sm:text-right whitespace-nowrap bg-slate-950 px-4 py-2 rounded-xl border border-amber-500/30">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Next Session</span>
              <span className="text-base font-black text-amber-400 font-mono">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </span>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-gold-300 mb-1">Performance Evaluation:</h3>
            <p className="text-slate-300 text-sm font-semibold leading-relaxed">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors >= 1 && errors <= 3
                ? 'Great work!'
                : errors >= 4 && errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Identified Conceptual Remediation Gaps:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/50 space-y-1 text-xs">
                    <p className="text-rose-400 font-bold">❌ Common Fallacy: "{m.misconception}"</p>
                    <p className="text-emerald-400">✓ ICSE Standard Rule: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-slate-300 text-xs">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-mono text-gold-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE CONDITIONAL FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_CommercialStudiesFinalAccountsProfitSim;
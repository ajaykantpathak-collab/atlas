'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ISC Class 12 Economics) ───
const NODE_C12_ECON_061 = 'c12_econ_061';
const NODE_C12_ECON_062 = 'c12_econ_062';
const NODE_C12_ECON_063 = 'c12_econ_063';
const NODE_C12_ECON_064 = 'c12_econ_064';
const NODE_C12_ECON_065 = 'c12_econ_065';
const NODE_C12_ECON_066 = 'c12_econ_066';
const NODE_C12_ECON_067 = 'c12_econ_067';
const NODE_C12_ECON_068 = 'c12_econ_068';
const NODE_C12_ECON_069 = 'c12_econ_069';
const NODE_C12_ECON_070 = 'c12_econ_070';

const ALL_NODE_IDS = [
  NODE_C12_ECON_061,
  NODE_C12_ECON_062,
  NODE_C12_ECON_063,
  NODE_C12_ECON_064,
  NODE_C12_ECON_065,
  NODE_C12_ECON_066,
  NODE_C12_ECON_067,
  NODE_C12_ECON_068,
  NODE_C12_ECON_069,
  NODE_C12_ECON_070,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Crisis in the Macroeconomy: The Rupee, Reserves & Policy Cockpit',
  intro: 'You are appointed Chief Macroeconomic Advisor to the Ministry of Finance and the Reserve Bank of India (RBI). Global oil prices have surged above $110/barrel, inflation is heating up to 7.6%, foreign institutional investors are pulling capital, and the rupee is under intense depreciation pressure.',
  context: 'Navigate the monetary policy corridor (CRR, SLR, Repo), selective qualitative credit tools, Balance of Payments ledger, Forex stabilization, and Fiscal Budget instruments to avert a 1991-style crisis.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When crude oil prices spike globally, how does India’s Foreign Exchange Market initially react before any central bank intervention?',
  options: [
    'Demand for USD rises → Rupee depreciates (more ₹ needed per $)',
    'Supply of USD rises → Rupee appreciates (fewer ₹ needed per $)',
    'The RBI automatically prints USD to balance the market',
    'Merchandise exports increase immediately to offset oil costs'
  ],
  correctIndex: 0,
  hintAfter: 'India imports >80% of its crude oil. When oil prices surge, Indian refiners need more USD to purchase the same barrels, shifting the USD Demand curve rightward!',
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
  {
    id: 'ch_01_crr',
    nodeId: NODE_C12_ECON_061,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A commercial bank has Net Demand and Time Liabilities (NDTL) of ₹10,000 crore. If the RBI sets the Cash Reserve Ratio (CRR) at 4.5%, how many crores must be deposited as cash reserves with the RBI?',
    correctAnswer: 450,
    tolerance: 1,
    unit: '₹ Crores',
    explanation: 'Required Reserves = CRR × NDTL = 0.045 × ₹10,000 crore = ₹450 crore. Under Section 42 of the RBI Act 1934, this cash is locked with the RBI and earns zero interest.',
    hints: [
      'Apply the formula: Required Reserves = CRR × NDTL.',
      'Multiply 10,000 by 4.5% (or 0.045).',
      '4.5% of 10,000 = 450 crores.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_02_slr_crr_dist',
    nodeId: NODE_C12_ECON_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following correctly distinguishes the Statutory Liquidity Ratio (SLR) from the Cash Reserve Ratio (CRR)?',
    options: [
      'SLR is kept with the RBI in cash; CRR is kept by the bank in G-Secs',
      'SLR is held by the bank in liquid assets (G-Secs/T-Bills) earning return; CRR is cash with RBI earning zero interest',
      'Both SLR and CRR are held with the World Bank in US Dollars',
      'CRR is an optional recommendation, while SLR is a mandatory tax'
    ],
    correctIndex: 1,
    explanation: 'SLR (Section 24, Banking Regulation Act 1949) is maintained by the commercial bank in approved securities (G-Secs, T-Bills) and earns coupon income. CRR (Section 42, RBI Act 1934) is kept with the RBI in cash and earns zero interest.',
    hints: [
      'Think about WHERE the funds are kept and whether they earn a return.',
      'CRR is held as cash with the Central Bank.',
      'SLR is held by banks in government bonds that yield returns.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_repo_revrepo',
    nodeId: NODE_C12_ECON_061,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the Indian Liquidity Corridor framework, what is the operational Repo Rate?',
    options: [
      'The rate at which the RBI lends short-term funds to commercial banks against G-Sec collateral',
      'The rate at which commercial banks lend to retail home buyers',
      'The rate at which the RBI borrows unsecured funds from foreign central banks',
      'The dividend payout percentage mandated for public sector banks'
    ],
    correctIndex: 0,
    explanation: 'The Repo Rate is the key policy interest rate at which the RBI lends overnight/short-term liquidity to commercial banks against the collateral of government securities under repurchase agreements.',
    hints: [
      'Repo = Repurchase Agreement.',
      'Who is borrowing from whom? Bank borrows from the RBI.',
      'Collateralized short-term lending by RBI to banks is the Repo rate.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_04_omo_mechanism',
    nodeId: NODE_C12_ECON_061,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'To combat persistent 7.5% CPI inflation, what Open Market Operation (OMO) action should the RBI take?',
    options: [
      'Purchase G-Secs from commercial banks to inject liquidity',
      'Sell G-Secs in the open market to absorb commercial bank excess cash reserves',
      'Print equity shares of private corporations and distribute them to households',
      'Suspend the secondary bond market completely'
    ],
    correctIndex: 1,
    explanation: 'Selling government securities (G-Secs) forces commercial banks and institutions to pay the RBI. This drains bank liquidity, reduces high-powered money (H), shrinks lendable funds, and cools demand-side inflation.',
    hints: [
      'To fight inflation, do we want MORE money or LESS money circulating in banks?',
      'When RBI sells bonds, banks hand over cash to buy them.',
      'Selling G-Secs absorbs liquidity and contracts the money supply.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_05_qualitative_consumer',
    nodeId: NODE_C12_ECON_062,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In Nov 2023, unsecured personal loans grew at 23% YoY while broad credit grew at 13%. The RBI raised risk weights on consumer credit from 100% to 125%. Why was this qualitative tool preferred over hiking the Repo Rate?',
    options: [
      'Qualitative tools target only the overheating sector without raising loan costs for productive MSMEs and agriculture',
      'Qualitative tools are free of legal standing and require no paperwork',
      'Hiking Repo Rate is prohibited when consumer loans expand',
      'The RBI was legally forced by the IMF to raise risk weights'
    ],
    correctIndex: 0,
    explanation: 'Quantitative tools (Repo rate) are blunt — hiking Repo raises borrowing costs for MSMEs, home loans, and farmers. Qualitative tools (risk weights / margin caps) selectively penalise overheated unsecured consumer credit without choking productive sectors.',
    hints: [
      'Think about precision vs bluntness.',
      'A repo hike affects EVERY borrower in the economy.',
      'Qualitative tools selectively target the specific overheated bucket.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_06_bop_bot_dist',
    nodeId: NODE_C12_ECON_063,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'India ran a merchandise trade deficit of $267 Billion in FY23, yet the Current Account Deficit was only $67 Billion. What explains this divergence?',
    options: [
      'The Balance of Trade only covers visible merchandise; invisibles (software services + remittances) offset the gap',
      'The Balance of Trade was calculated in Indian Rupees while BoP was in Euros',
      'The World Bank cancelled $200 Billion of India’s import bills',
      'Commercial banks hid the remaining trade deficit off-balance-sheet'
    ],
    correctIndex: 0,
    explanation: 'Balance of Trade (BoT) includes ONLY visible goods exports and imports. Balance of Payments (BoP) Current Account includes visible trade PLUS invisible services (TCS, Infosys exports >$190B) and unilateral transfers (remittances >$100B).',
    hints: [
      'Visible goods vs Invisible services and transfers.',
      'India exports huge software services and receives global remittances.',
      'Invisibles surplus offsets the visible merchandise deficit.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_07_remittance_classification',
    nodeId: NODE_C12_ECON_064,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'An Indian software engineer working in Dubai transfers $3,000 to her parents in Kerala. How is this recorded in India’s Balance of Payments?',
    options: [
      'Current Account → Unilateral Transfer (Private Transfer Credit)',
      'Capital Account → Foreign Direct Investment (FDI Inflow)',
      'Official Reserve Account → Accommodating Debit',
      'Capital Account → External Commercial Borrowing (ECB Credit)'
    ],
    correctIndex: 0,
    explanation: 'Workers’ remittances are one-way (unilateral) income transfers for which no quid pro quo asset or future liability is created. Following IMF BPM6, they are recorded as Current Account Private Transfers (Credit).',
    hints: [
      'Does the daughter receive shares, bonds, or equity in return from parents?',
      'No asset/liability is created; it is pure current income transferred.',
      'Unilateral transfers belong in the Current Account.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_08_bop_drag_label',
    nodeId: NODE_C12_ECON_064,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Map each cross-border transaction to its exact Balance of Payments ledger slot.',
    dragItems: [
      { label: 'Crude Oil Import Bill', targetId: 'slot_current_visible' },
      { label: 'Infosys US Software Billing', targetId: 'slot_current_invisible' },
      { label: 'Meta USD 5.7B in Jio Platforms', targetId: 'slot_capital_fdi' },
      { label: 'RBI Selling Forex from Reserves', targetId: 'slot_reserve_accommodating' },
    ],
    correctMapping: {
      slot_current_visible: 'Crude Oil Import Bill',
      slot_current_invisible: 'Infosys US Software Billing',
      slot_capital_fdi: 'Meta USD 5.7B in Jio Platforms',
      slot_reserve_accommodating: 'RBI Selling Forex from Reserves',
    },
    explanation: 'Goods = Visible Current; Services = Invisible Current; Lasting equity stake = FDI Capital; Central bank reserve actions = Official Reserve Account (Accommodating).',
    hints: [
      'Crude oil is a physical tangible good.',
      'Infosys delivers digital IT code across borders (service).',
      'Meta acquired a 9.99% equity stake in Jio (FDI).',
    ],
  },
  {
    id: 'ch_09_autonomous_accommodating',
    nodeId: NODE_C12_ECON_065,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why do economists say "The BoP always balances in an accounting sense, but can be in severe economic deficit"?',
    options: [
      'Accounting identity holds because Accommodating Reserve transactions balance the books; economic deficit refers to Autonomous transactions gap',
      'Double entry bookkeeping allows accountants to delete debit records at will',
      'The IMF forces all member nations to forge zero-balance accounts',
      'Exchange rates always appreciate to force export parity instantaneously'
    ],
    correctIndex: 0,
    explanation: 'Autonomous transactions (trade, FDI, loans) occur for commercial/profit motives ("above-the-line"). When autonomous debits exceed credits, the RBI must draw down forex reserves ("below-the-line" accommodating transaction) to mathematically balance the BoP to 0.',
    hints: [
      'Distinguish Above-the-line (Autonomous) vs Below-the-line (Accommodating).',
      'The accounting ledger sums to 0 because Central Bank reserves fill the gap.',
      'If reserves are being drained to balance trade, that is an economic deficit.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_10_disequilibrium_causes',
    nodeId: NODE_C12_ECON_065,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During the 1991 Indian Balance of Payments crisis, which combination of factors precipitated the collapse of forex reserves to just 3 weeks of imports ($1.2B)?',
    options: [
      'Gulf War oil spike + Stagnant uncompetitive exports + NRI remittance disruption + Short-term debt non-rollover',
      'Excessive foreign aid received from the United Nations',
      'Record export surpluses flooding the domestic economy with hyper-liquidity',
      'A mandatory ban on all domestic banking activities'
    ],
    correctIndex: 0,
    explanation: 'The 1991 crisis was a multi-causal storm: Gulf War doubled crude oil prices, high tariffs fostered uncompetitive manufacturing, Kuwait/Iraq remittances collapsed, and foreign creditors refused to roll over short-term debt.',
    hints: [
      'Think about trade shocks, oil prices, and capital flight in 1990-91.',
      'Gulf war impacted both oil import bills and Middle-East remittances.',
      'Combined trade shock + short-term debt crunch depleted reserves.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_11_j_curve_marshall_lerner',
    nodeId: NODE_C12_ECON_066,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under what condition does currency devaluation successfully correct a current account deficit in the medium-long term, and what is the J-Curve effect?',
    options: [
      'Marshall-Lerner Condition (|e_x + e_m| > 1); J-Curve explains initial deficit worsening due to price stickiness before volumes adjust',
      'Say’s Law; J-Curve means exports jump instantly on day one',
      'Fisher Equation; J-Curve ensures import prices fall to zero',
      'Gresham’s Law; J-Curve guarantees currency appreciation within 24 hours'
    ],
    correctIndex: 0,
    explanation: 'Devaluation improves the trade balance only if the Marshall-Lerner Condition holds (|e_x + e_m| > 1). In the short run, trade contracts are pre-fixed and oil imports are inelastic, causing the deficit to dip (J-curve) before rising as export volumes expand.',
    hints: [
      'Sum of export and import price elasticities must exceed unity.',
      'Short run contracts are rigid, so higher import costs hit immediately.',
      'The trajectory traces the letter "J": temporary dip followed by long-term surplus.',
    ],
  },
  {
    id: 'ch_12_devaluation_vs_depreciation',
    nodeId: NODE_C12_ECON_068,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How does Rupee Depreciation (e.g., ₹74 to ₹83/USD in 2022) differ fundamentally from Rupee Devaluation (e.g., July 1991 ₹17.90 to ₹25.90/USD)?',
    options: [
      'Depreciation is market-driven under flexible/managed float; Devaluation is a deliberate government decree under fixed exchange rate',
      'Depreciation makes the rupee stronger; Devaluation makes it weaker',
      'Depreciation is illegal under RBI Act; Devaluation is mandatory every 5 years',
      'Depreciation applies only to gold prices; Devaluation applies only to silver'
    ],
    correctIndex: 0,
    explanation: 'Both result in more rupees per dollar. However, Depreciation is determined by free market demand-supply forces under floating regimes, whereas Devaluation is a discrete policy decree by the government/central bank under a pegged/fixed regime.',
    hints: [
      'Look at the REGIME (Fixed vs Managed Float) and the AGENT (Government decree vs Market forces).',
      '1991 was an official announcement by Dr. Manmohan Singh under fixed parity.',
      '2022 was daily market movement driven by Fed rate hikes and crude spikes.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_13_pct_depreciation_calc',
    nodeId: NODE_C12_ECON_068,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If the USD/INR exchange rate rises from ₹75.00/USD to ₹82.50/USD, compute the exact percentage depreciation of the Indian Rupee against the Dollar.',
    correctAnswer: 10,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Percentage Depreciation = [(New Rate − Old Rate) / Old Rate] × 100 = [(82.50 − 75.00) / 75.00] × 100 = (7.50 / 75.00) × 100 = 10.0%.',
    hints: [
      'Formula: ((New - Old) / Old) * 100.',
      'Difference = 82.50 - 75.00 = 7.50.',
      '7.50 / 75.00 = 0.10 -> 10%.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_14_appreciation_asymmetry',
    nodeId: NODE_C12_ECON_068,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'If the exchange rate moves from ₹80.00/USD to ₹88.00/USD (10% depreciation), what percentage appreciation is required to restore the rate from ₹88.00 back to ₹80.00?',
    correctAnswer: 9.09,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Appreciation back from ₹88 to ₹80 = [(88.00 − 80.00) / 88.00] × 100 = (8.00 / 88.00) × 100 = 9.09%. Due to the changed denominator base, 10% depreciation is NOT offset by 10% appreciation!',
    hints: [
      'The base denominator is now ₹88.00, not ₹80.00.',
      'Formula: ((88 - 80) / 88) * 100.',
      '8 / 88 = 1/11 ≈ 9.09%.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_15_forex_equilibrium_shift',
    nodeId: NODE_C12_ECON_067,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When the US Federal Reserve aggressively raises interest rates (from 0.25% to 5.5%), what simultaneous shifts occur in India’s Foreign Exchange Market diagram?',
    options: [
      'Demand for USD shifts Right (capital outflows) & Supply of USD shifts Left (less FPI inflow) → Rupee Depreciates',
      'Demand for USD shifts Left & Supply of USD shifts Right → Rupee Appreciates',
      'Both Demand and Supply curves disappear completely',
      'Only the supply curve shifts right due to higher US consumer imports'
    ],
    correctIndex: 0,
    explanation: 'Higher US yields cause FIIs to repatriate capital (shifting USD demand right) and reduce fresh foreign inflows into Indian debt/equities (shifting USD supply left). Both curve shifts reinforce the upward pressure on the ₹/USD exchange rate (Rupee depreciation).',
    hints: [
      'Foreign investors want to send money back to the US for higher risk-free yields.',
      'Selling rupees to buy dollars increases USD demand.',
      'Fewer fresh dollar investments reduce USD supply.',
    ],
  },
  {
    id: 'ch_16_bretton_woods_deval',
    nodeId: NODE_C12_ECON_069,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under the Bretton Woods system (1944-1971), how did currency parities operate and why was the IMF created?',
    options: [
      'Currencies were pegged to the US Dollar (and USD pegged to gold at $35/oz); IMF supervised parities to prevent competitive beggar-thy-neighbour devaluations',
      'Currencies floated freely every minute without any central bank backing',
      'Every country was forced to adopt the British Pound as sole legal tender',
      'All commercial banks were nationalised into a single global entity'
    ],
    correctIndex: 0,
    explanation: 'Bretton Woods established fixed dollar-gold parities overseen by the IMF. Member nations could only devalue by >10% with IMF approval, preventing the chaotic competitive devaluations of the 1930s Great Depression.',
    hints: [
      'USD was pegged to gold at $35 per ounce.',
      'Parities were fixed, and IMF acted as guardian of orderly adjustments.',
      'Prevented competitive devaluations that ravaged global trade in the 1930s.',
    ],
  },
  {
    id: 'ch_17_fiscal_policy_instruments',
    nodeId: NODE_C12_ECON_070,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which authority operates Fiscal Policy in India, and what are its four cardinal instruments?',
    options: [
      'Ministry of Finance via Union Budget; Instruments: Public Expenditure, Taxation, Public Debt, Deficit Financing',
      'Reserve Bank of India via MPC; Instruments: Repo Rate, CRR, SLR, OMO',
      'Securities and Exchange Board of India (SEBI); Instruments: IPO Pricing, Margin Trading',
      'NITI Aayog; Instruments: Five Year Targets, District Allocations'
    ],
    correctIndex: 0,
    explanation: 'Fiscal Policy is executed by the Ministry of Finance (Union Government) presented under Article 112 of the Constitution. Its 4 instruments are Public Expenditure, Taxation (Direct & Indirect), Public Borrowing/Debt, and Deficit Financing.',
    hints: [
      'Don’t confuse Fiscal Policy (Government/Budget) with Monetary Policy (RBI/Interest rates).',
      'Taxes and government spending are the core levers.',
      'Ministry of Finance controls the Union Budget.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_18_frbm_escape_clause',
    nodeId: NODE_C12_ECON_070,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The FRBM Act 2003 mandates a fiscal deficit target of 3% of GDP. Why did India’s fiscal deficit widen to 9.2% of GDP in FY 2020-21 without violating the rule of law?',
    options: [
      'The government invoked Section 4 Escape Clause due to the severe national calamity of the COVID-19 pandemic',
      'The Supreme Court suspended all economic laws indefinitely',
      'The 3% target only applies when inflation is above 10%',
      'The government changed the accounting currency to Japanese Yen'
    ],
    correctIndex: 0,
    explanation: 'Section 4 of the Fiscal Responsibility and Budget Management (FRBM) Act 2003 contains explicit Escape Clauses allowing target deviation during national calamities, wars, severe agricultural collapse, or sharp output contraction.',
    hints: [
      'Look for the statutory safety valve built into the FRBM Act.',
      'National emergencies/pandemics trigger the Escape Clause.',
      'It allows temporary expansionary spending during catastrophic shocks.',
    ],
  },
  {
    id: 'ch_19_monetary_transmission_sort',
    nodeId: NODE_C12_ECON_061,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential steps of Monetary Transmission when the RBI tightens the Repo Rate to cool CPI inflation.',
    sortItems: [
      'RBI MPC hikes Repo Rate by 50 bps',
      'Commercial banks face higher marginal cost of funds and raise MCLR / lending rates',
      'Retail home loan and corporate working-capital EMIs increase',
      'Households defer consumer durables and firms scale back debt-financed capex',
      'Aggregate Demand compresses, cooling demand-pull price inflation'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The transmission chain: Repo hike → Bank cost of funds rises → MCLR/lending rates increase → Borrowing slows → Aggregate Demand falls → Inflation moderates.',
    hints: [
      'Starts with the central bank policy action.',
      'Commercial banks pass on the cost to retail borrowers next.',
      'Higher EMIs suppress household consumption and investment spending.',
    ],
  },
  {
    id: 'ch_20_stagflation_evaluation',
    nodeId: NODE_C12_ECON_070,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In a scenario of Stagflation (CPI Inflation at 8.0% alongside GDP growth stagnating at 3.0%), what is the optimal policy mix?',
    options: [
      'Targeted Supply-Side Capex (PLI, Logistics) + Prudent Fiscal Consolidation + Selective Qualitative Credit Controls',
      'Massive blanket tax cuts funded by 100% RBI deficit monetization',
      'Hiking CRR to 25% while simultaneously cutting all infrastructure budgets to zero',
      'Banning all imports and devaluing currency by 80% overnight'
    ],
    correctIndex: 0,
    explanation: 'Stagflation cannot be solved by pure demand-side expansion (stokes inflation) or pure contraction (deepens unemployment). The optimal response is supply-side fiscal capex (enhancing production capacity) combined with selective credit controls to prevent asset bubbles.',
    hints: [
      'You must expand supply capacity without stoking demand-pull inflation.',
      'Supply-side infrastructure capex expands productive potential.',
      'Selective credit targeting curbs speculation.',
    ],
  },
  {
    id: 'ch_21_bop_balance_calculation',
    nodeId: NODE_C12_ECON_064,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given (in $ Billion): Merchandise Exports = 400, Merchandise Imports = 650, Services Surplus = +140, Net Remittances = +90, Net FDI Inflows = +45, Net FII Inflows = +15. What is the Autonomous BoP Balance (+ for Surplus, - for Deficit)?',
    correctAnswer: 40,
    tolerance: 1,
    unit: '$ Billion',
    explanation: 'Current Account = (400 - 650) + 140 + 90 = -250 + 230 = -$20B. Capital Account = 45 + 15 = +$60B. Autonomous Balance = Current + Capital = -20 + 60 = +$40B Surplus (RBI accumulates $40B in forex reserves).',
    hints: [
      'Compute Current Account first: Trade Balance (-250) + Invisibles (+230) = -20.',
      'Compute Capital Account: FDI (+45) + FII (+15) = +60.',
      'Autonomous Balance = -20 + 60 = +40 Billion.',
    ],
  },
  {
    id: 'ch_22_construct_macro_package',
    nodeId: NODE_C12_ECON_066,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the comprehensive 1991 Crisis Resolution Package by assembling the 4 required strategic pillars in order.',
    availableParts: [
      'Rupee Devaluation (~19%)',
      'IMF Structural Loan & Gold Pledge',
      'LPG Industrial Delicensing & Tariff Cuts',
      'Fiscal Deficit Rationalisation',
      'Price Controls on All Commodities',
      'Nationalisation of Tech Startups'
    ],
    targetState: 'Rupee Devaluation (~19%) IMF Structural Loan & Gold Pledge LPG Industrial Delicensing & Tariff Cuts Fiscal Deficit Rationalisation',
    validationHint: 'Select the 4 genuine pillars of the July 1991 Rao-Manmohan reforms (Monetary, External Bridge, Trade/Structural, Fiscal).',
    explanation: 'The 1991 resolution synchronized: (1) Rupee Devaluation for export switching, (2) IMF emergency bridge loan backed by gold pledge, (3) LPG structural reforms (tariff slashes, delicensing), and (4) Fiscal deficit containment.',
    hints: [
      'Avoid socialist price controls or nationalisations.',
      'Look for Devaluation, IMF loan/Gold pledge, LPG trade reforms, and Fiscal discipline.',
      'Assemble all 4 real historic reforms.',
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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_ECON_061,
  title: 'Quantitative & Qualitative Credit Control, BoP, Forex & Fiscal Policy',
  definition: 'An integrated macroeconomic framework covering central bank credit control instruments (CRR, SLR, Repo, OMO, selective credit tools), Balance of Payments structure, foreign exchange dynamics, and union budget fiscal policy.',
  eli5: 'Think of the economy as a high-speed train. The RBI controls the brakes and accelerator (Repo rate, CRR, OMO) and decides which carriages get power (qualitative tools). The Foreign Exchange market is how we trade fuel with other trains, and the Government Budget builds the tracks (Fiscal Policy).',
  misconceptions: [
    { misconception: 'Repo Rate and Reverse Repo Rate are identical RBI rates.', correction: 'Repo Rate is the cost for banks borrowing FROM the RBI. Reverse Repo / SDF is what banks earn parking surplus cash WITH the RBI.' },
    { misconception: 'CRR and SLR are both held as cash inside the central bank.', correction: 'CRR is kept in cash with the RBI earning zero interest; SLR is maintained by banks themselves in liquid government bonds earning interest.' },
    { misconception: 'BoP disequilibrium means the accounting ledger does not add to zero.', correction: 'The BoP always sums to zero in accounting terms because Accommodating Reserve transactions balance the books. Disequilibrium refers to Autonomous flows.' },
    { misconception: 'Currency depreciation and devaluation are exactly the same thing.', correction: 'Depreciation is market-driven under flexible/managed floats; Devaluation is a deliberate government decree under fixed exchange rates.' },
    { misconception: 'Fiscal policy is operated by the Governor of the Reserve Bank of India.', correction: 'Fiscal policy is framed by the Ministry of Finance / Parliament via the Budget. The RBI operates Monetary Policy.' },
  ],
  diagnosticQuestions: [
    { question: 'Under which Act does the RBI mandate the Cash Reserve Ratio (CRR)?', options: ['RBI Act 1934 (Sec 42)', 'Banking Regulation Act 1949', 'FEMA 1999', 'Companies Act 2013'], correctIndex: 0 },
    { question: 'Where are NRI remittances recorded in the Balance of Payments?', options: ['Current Account (Private Transfers)', 'Capital Account (FDI)', 'Official Reserves Account', 'Commercial Borrowings'], correctIndex: 0 },
    { question: 'What happens to the Forex market USD demand curve when oil prices rise?', options: ['Shifts Rightward (Depreciating Rupee)', 'Shifts Leftward (Appreciating Rupee)', 'Remains unchanged', 'Collapses to zero'], correctIndex: 0 },
    { question: 'Which FRBM Act 2003 statutory target applies to the fiscal deficit?', options: ['3.0% of GDP', '0.0% of GDP', '10.0% of GDP', '6.5% of GDP'], correctIndex: 0 },
    { question: 'What is the ceiling of the RBI liquidity corridor?', options: ['Marginal Standing Facility (MSF)', 'Standing Deposit Facility (SDF)', 'Repo Rate', 'Reverse Repo Rate'], correctIndex: 0 },
    { question: 'What is the term for a market-driven rise in the domestic currency value?', options: ['Appreciation', 'Revaluation', 'Depreciation', 'Devaluation'], correctIndex: 0 },
    { question: 'Which measure is an expenditure-switching policy?', options: ['Currency Devaluation', 'Contractionary Deflation', 'Income Tax Surcharge', 'Reducing Public Works'], correctIndex: 0 },
    { question: 'How does the RBI conduct an OMO liquidity injection?', options: ['Purchasing G-Secs in the open market', 'Selling G-Secs to commercial banks', 'Raising the CRR', 'Increasing the Bank Rate'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery of all 10 CISCE Class 12 macroeconomic nodes: Quantitative/Qualitative monetary levers, BoP accounting & components, disequilibrium correction, forex mechanics & diagrams, and fiscal policy instruments.',
};

// ─── BRILLIANT INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The RBI Monetary Policy Cockpit',
    instruction: 'Adjust the Repo Rate and CRR sliders to see their instant effect on bank lendable deposits, credit creation multiplier, and retail lending rates.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_061,
  },
  {
    title: '2. Selective Qualitative Credit Targeting',
    instruction: 'Toggle sector-specific Risk Weights between Unsecured Consumer Credit and Priority MSME Loans to observe selective credit redirection.',
    interactionType: 'toggle-target',
    nodeId: NODE_C12_ECON_062,
  },
  {
    title: '3. Balance of Payments Live Double-Entry Ledger',
    instruction: 'Simulate cross-border trade and capital flows (Crude Oil Imports, IT Software Exports, FDI, Remittances) and watch the balancing Reserve Account fill the gap.',
    interactionType: 'bop-interactive',
    nodeId: NODE_C12_ECON_064,
  },
  {
    title: '4. Forex Market Demand & Supply Equilibrium',
    instruction: 'Drag global crude oil import shocks and foreign capital flows to see how the USD Demand & Supply curves intersect, moving the ₹/USD exchange rate.',
    interactionType: 'forex-plotter',
    nodeId: NODE_C12_ECON_067,
  },
  {
    title: '5. Fiscal Policy Budget Simulator & FRBM Target',
    instruction: 'Adjust Public Infrastructure Spending (Capex) and Tax Rates to simulate GDP Growth, Fiscal Deficit (% of GDP), and FRBM compliance.',
    interactionType: 'fiscal-budget',
    nodeId: NODE_C12_ECON_070,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the RBI cuts the CRR from 4.5% to 4.0% on an NDTL base of ₹200 Lakh Crore, what happens to bank lendable funds and the Credit Multiplier?',
    options: [
      'Lendable funds increase by ₹1.0 Lakh Crore & Credit Multiplier expands from 22.2 to 25.0',
      'Lendable funds decrease by ₹5.0 Lakh Crore & Multiplier falls to 10',
      'No change in money supply; only government debt expands',
      'Interest rates rise immediately by 500 basis points'
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the CRR slider down to 4.0% in the simulator to verify the credit multiplier and liquidity release!',
    nodeId: NODE_C12_ECON_061,
  },
  {
    question: 'Predict: When the US Federal Reserve hikes interest rates from 0.25% to 5.5%, how does the Indian Rupee-Dollar exchange rate respond in a floating market?',
    options: [
      'Rupee depreciates (e.g. ₹74 to ₹83/$) as FIIs convert rupee assets into USD for higher US yields',
      'Rupee appreciates instantly to ₹50/$ because Indian banks borrow more',
      'The exchange rate is legally frozen by the IMF',
      'India runs an immediate merchandise trade surplus'
    ],
    correctIndex: 0,
    verifyInstruction: 'Trigger the "US Fed Rate Hike" shock on the Forex Market simulator and observe the rightward shift in USD demand!',
    nodeId: NODE_C12_ECON_067,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the Credit Multiplier (1/CRR) as you raise the Cash Reserve Ratio?',
    observableOptions: [
      'The multiplier shrinks inversely, reducing the potential money-creation capacity of banks',
      'The multiplier increases exponentially with higher CRR',
      'The multiplier stays locked at a constant 100x',
      'Banks stop accepting customer deposits entirely'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_ECON_061,
  },
  {
    question: 'In the BoP simulator, when Autonomous Debits exceed Autonomous Credits, what accommodating entry occurs?',
    observableOptions: [
      'The RBI Forex Reserves decrease (recorded as an accommodating credit/drawdown) to balance the account to zero',
      'The Current Account automatically deletes visible imports',
      'The Capital Account triples its equity valuation',
      'The government declares sovereign default'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_ECON_064,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Macroeconomic Dossier: Indian Economic Survey',
  description: 'Synthesize the live policy levers learned today to advise an emerging market facing an energy import shock and capital outflow.',
  steps: [
    '1. Calculate the required RBI Repo rate adjustment and OMO absorption to cool 7.5% inflation without triggering recession.',
    '2. Propose a qualitative credit measure (e.g., LTV cap or risk weight hike) to curb speculative commercial property bubbles.',
    '3. Draft a BoP Current Account reconciliation showing how software services exports & NRI remittances cushion merchandise deficits.',
    '4. Contrast the trade impacts of a market-driven Rupee depreciation vs an official devaluation under fixed parities.',
    '5. Model a Union Budget capital expenditure plan compliant with the FRBM 3.0% deficit glide path.'
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ───
export default function C12_EconomicsQuantitativeMethodsCreditSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_ECON_061,
  title = DEFAULT_PROPS.title || 'Economics Macroeconomic Simulator',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['econ'] || { name: 'Economics', emoji: '📈', color: 'indigo' };

  // Phase state
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant patterns state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Adaptive difficulty & mastery
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints & feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Interactive inputs / drag & drop
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback FX
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── MACROECONOMIC SIMULATOR STATE VARIABLES (30+ State Items) ───
  // 1. Monetary Levers
  const [repoRate, setRepoRate] = useState<number>(6.5); // %
  const [crrRate, setCrrRate] = useState<number>(4.5); // %
  const [slrRate, setSlrRate] = useState<number>(18.0); // %
  const [ndtlBase, setNdtlBase] = useState<number>(200); // in ₹ Lakh Crores
  const [omoAction, setOmoAction] = useState<'neutral' | 'buy' | 'sell'>('neutral');
  const [omoAmount, setOmoAmount] = useState<number>(0); // in ₹ Lakh Crores

  // 2. Qualitative Levers
  const [consumerRiskWeight, setConsumerRiskWeight] = useState<number>(125); // %
  const [msmeRiskWeight, setMsmeRiskWeight] = useState<number>(100); // %
  const [homeLoanLtvCap, setHomeLoanLtvCap] = useState<number>(75); // %
  const [selectedSector, setSelectedSector] = useState<'unsecured' | 'msme' | 'housing'>('unsecured');

  // 3. BoP Simulator Levers (in $ Billion)
  const [merchandiseExports, setMerchandiseExports] = useState<number>(450);
  const [merchandiseImports, setMerchandiseImports] = useState<number>(710);
  const [softwareExports, setSoftwareExports] = useState<number>(195);
  const [inwardRemittances, setInwardRemittances] = useState<number>(110);
  const [fdiInflows, setFdiInflows] = useState<number>(75);
  const [fiiNetFlows, setFiiNetFlows] = useState<number>(15);
  const [ecbBorrowing, setEcbBorrowing] = useState<number>(20);

  // 4. Forex Market Levers
  const [crudeOilPrice, setCrudeOilPrice] = useState<number>(85); // $/barrel
  const [usFedRate, setUsFedRate] = useState<number>(5.25); // %
  const [rbiForexIntervention, setRbiForexIntervention] = useState<number>(0); // $ Billion sold (+)/bought (-)
  const [exchangeRegime, setExchangeRegime] = useState<'flexible' | 'fixed' | 'managed'>('managed');
  const [fixedPegRate, setFixedPegRate] = useState<number>(17.90); // historical 1991 peg

  // 5. Fiscal Policy Simulator Levers (in ₹ Lakh Crores)
  const [publicCapex, setPublicCapex] = useState<number>(11.11); // Infrastructure
  const [revenueExpenditure, setRevenueExpenditure] = useState<number>(37.0);
  const [directTaxRate, setDirectTaxRate] = useState<number>(25); // %
  const [gstRevenue, setGstRevenue] = useState<number>(20.0);
  const [nominalGdp, setNominalGdp] = useState<number>(320); // ₹ Lakh Crores

  // Active Exploration Tab
  const [activeTab, setActiveTab] = useState<'monetary' | 'qualitative' | 'bop' | 'forex' | 'fiscal'>('monetary');

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED MACROECONOMIC CALCULATIONS ───
  // A. Credit & Banking
  const requiredCrrCash = useMemo(() => (ndtlBase * (crrRate / 100)), [ndtlBase, crrRate]);
  const requiredSlrAssets = useMemo(() => (ndtlBase * (slrRate / 100)), [ndtlBase, slrRate]);
  const lendableDeposits = useMemo(() => Math.max(0, ndtlBase - requiredCrrCash - requiredSlrAssets), [ndtlBase, requiredCrrCash, requiredSlrAssets]);
  const creditMultiplier = useMemo(() => (crrRate > 0 ? (1 / (crrRate / 100)) : 0), [crrRate]);
  const potentialCreditCreation = useMemo(() => (lendableDeposits * creditMultiplier), [lendableDeposits, creditMultiplier]);
  const bankLendingRateMCLR = useMemo(() => (repoRate + 2.5 + (crrRate > 4.5 ? 0.3 : 0)), [repoRate, crrRate]);

  // B. BoP Ledger
  const visibleTradeBalance = useMemo(() => (merchandiseExports - merchandiseImports), [merchandiseExports, merchandiseImports]);
  const invisibleBalance = useMemo(() => (softwareExports + inwardRemittances), [softwareExports, inwardRemittances]);
  const currentAccountBalance = useMemo(() => (visibleTradeBalance + invisibleBalance), [visibleTradeBalance, invisibleBalance]);
  const capitalAccountBalance = useMemo(() => (fdiInflows + fiiNetFlows + ecbBorrowing), [fdiInflows, fiiNetFlows, ecbBorrowing]);
  const autonomousBalance = useMemo(() => (currentAccountBalance + capitalAccountBalance), [currentAccountBalance, capitalAccountBalance]);
  const reserveChangeRequired = useMemo(() => (-autonomousBalance), [autonomousBalance]); // Debit if positive surplus (accumulation), Credit if negative deficit (drawdown)

  // C. Forex Market Equilibrium
  const derivedExchangeRate = useMemo(() => {
    if (exchangeRegime === 'fixed') return fixedPegRate;
    // Base rate ₹82 + oil impact + fed rate impact - RBI market intervention dampener
    const oilImpact = (crudeOilPrice - 70) * 0.12;
    const fedImpact = (usFedRate - 2.0) * 1.1;
    const interventionImpact = rbiForexIntervention * 0.4;
    const flexibleRate = 80.0 + oilImpact + fedImpact - interventionImpact;
    return Math.max(50, Math.min(105, flexibleRate));
  }, [exchangeRegime, fixedPegRate, crudeOilPrice, usFedRate, rbiForexIntervention]);

  // D. Fiscal Policy & FRBM
  const totalGovtExpenditure = useMemo(() => (publicCapex + revenueExpenditure), [publicCapex, revenueExpenditure]);
  const estimatedTaxReceipts = useMemo(() => ((nominalGdp * (directTaxRate / 100) * 0.35) + gstRevenue), [nominalGdp, directTaxRate, gstRevenue]);
  const fiscalDeficitCrores = useMemo(() => Math.max(0, totalGovtExpenditure - estimatedTaxReceipts), [totalGovtExpenditure, estimatedTaxReceipts]);
  const fiscalDeficitGdpPct = useMemo(() => ((fiscalDeficitCrores / nominalGdp) * 100), [fiscalDeficitCrores, nominalGdp]);
  const isFrbmCompliant = useMemo(() => (fiscalDeficitGdpPct <= 3.5), [fiscalDeficitGdpPct]);

  // ─── CHART TIME SERIES DATA ───
  const monetaryTransmissionData = useMemo(() => [
    { stage: 'Base', repo: repoRate, lendingRate: bankLendingRateMCLR, inflation: 7.2 },
    { stage: '+1 Qtr', repo: repoRate, lendingRate: bankLendingRateMCLR + 0.3, inflation: Math.max(4.0, 7.2 - (repoRate - 4.0) * 0.4) },
    { stage: '+2 Qtr', repo: repoRate, lendingRate: bankLendingRateMCLR + 0.5, inflation: Math.max(3.8, 6.8 - (repoRate - 4.0) * 0.7) },
    { stage: '+3 Qtr', repo: repoRate, lendingRate: bankLendingRateMCLR + 0.5, inflation: Math.max(3.5, 6.2 - (repoRate - 4.0) * 0.9) },
  ], [repoRate, bankLendingRateMCLR]);

  const forexSupplyDemandData = useMemo(() => {
    const data = [];
    for (let rate = 70; rate <= 95; rate += 5) {
      // Demand curve (slopes down: higher rate -> less USD demanded for imports)
      const baseDemand = 300 - (rate - 70) * 6 + (crudeOilPrice - 70) * 1.5;
      // Supply curve (slopes up: higher rate -> exporters sell more USD)
      const baseSupply = 120 + (rate - 70) * 7 + (softwareExports - 150) * 0.5;
      data.push({
        rate: `₹${rate}`,
        DemandUSD: Math.max(50, Math.round(baseDemand)),
        SupplyUSD: Math.max(50, Math.round(baseSupply)),
      });
    }
    return data;
  }, [crudeOilPrice, softwareExports]);

  // Filtered challenges by difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LIFECYCLE & PERSISTENCE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

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

  // ─── 2D CANVAS ANIMATION EFFECT (requestAnimationFrame) ───
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

      // Draw monetary liquidity flow waves
      ctx.strokeStyle = '#4f46e5';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 15 + Math.sin((x + frame * 2) * 0.04) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Flow pulse indicator
      const pulseX = (frame * 3) % canvas.width;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(pulseX, 15 + Math.sin((pulseX + frame * 2) * 0.04) * 6, 4, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── 14+ USECALLBACK EVENT HANDLERS ───
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(isCorrect ? 'Accurate intuition! Oil surges trigger massive USD demand.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration. Manipulate the macroeconomic levers to see real-time transmission.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test any combination of monetary, external, and fiscal parameters without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenges. Read each real-world Indian scenario carefully.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now manipulate the simulator to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! The multiplier contracts proportionally.' : 'Take another look at the formula and gauge.');
  }, []);

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
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    // Check answer against correctOrder
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      audioManager.play('success');
      setShowConfetti(true);
      setShowExplanation(true);
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('error');
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      setErrors(e => e + 1);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Magnificent work! You have mastered quantitative credit, BoP, forex, and fiscal policy with a score of ${finalScore} percent.`);
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

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      speechManager.speak('Outstanding! Perfectly reasoned.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
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
        speechManager.speak('Let us analyze the step-by-step breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleRepoSlider = useCallback((val: number) => {
    setRepoRate(val);
    audioManager.play('count');
  }, []);

  const handleCrrSlider = useCallback((val: number) => {
    setCrrRate(val);
    audioManager.play('count');
  }, []);

  const handleCrudeOilSlider = useCallback((val: number) => {
    setCrudeOilPrice(val);
    audioManager.play('count');
  }, []);

  const handleCapexSlider = useCallback((val: number) => {
    setPublicCapex(val);
    audioManager.play('count');
  }, []);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">{title}</h1>
            <p className="text-xs text-gold-400 font-medium">ISC Class 12 Economics • Comprehensive Macro Simulator</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
              difficulty === 'foundation' ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-400' :
              difficulty === 'advanced' ? 'bg-rose-950/70 border-rose-500/50 text-rose-400' :
              'bg-gold-950/70 border-gold-500/50 text-gold-400'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-xs px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-slate-300 font-mono">
            Mastery: <span className="text-gold-400 font-bold">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-r from-gold-950/60 via-slate-900 to-purple-950/60 rounded-2xl border border-gold-800/60 shadow-inner">
            <h2 className="text-lg font-bold text-gold-300 flex items-center gap-2">
              <span>🚨</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              📌 <span className="font-semibold text-slate-300">Context:</span> {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 px-2.5 py-0.5 bg-amber-950/50 border border-amber-800 rounded-md">
                Discovery Challenge
              </span>
              <span className="text-xs text-slate-400">Test your intuition before we explore</span>
            </div>
            <p className="text-base font-semibold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-gold-500'
                  }`}
                >
                  <span className="mr-2 font-mono text-xs text-slate-400 font-bold">[{String.fromCharCode(65 + i)}]</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <p className={`text-xs sm:text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Now let us explore the mechanics in the interactive cockpit.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  Enter Macroeconomic Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: BRILLIANT GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Step Progress Pills */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setCurrentSlide(idx); audioManager.play('tap'); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  currentSlide === idx
                    ? 'bg-gold-600 text-white shadow-md shadow-gold-600/40'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {step.title.split('.')[0]}. {step.title.split('.')[1]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base sm:text-lg font-bold text-gold-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <span className="text-xs px-2.5 py-1 bg-slate-800 rounded-md text-amber-300 font-medium">
                  Interactive Exploration
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-300 bg-amber-950/30 p-2.5 rounded-xl border border-amber-900/40">
                👉 <span className="font-semibold">Action:</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── SLIDE 0: MONETARY LEVERS (CRR, REPO, SLR) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Repo Slider */}
                    <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-semibold">Policy Repo Rate</span>
                        <span className="text-gold-400 font-bold font-mono">{repoRate.toFixed(2)}%</span>
                      </div>
                      <input
                        type="range"
                        min={4.0}
                        max={8.5}
                        step={0.25}
                        value={repoRate}
                        onChange={(e) => handleRepoSlider(parseFloat(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Set Repo Rate"
                      />
                      <p className="text-[11px] text-slate-500">RBI Lending Rate to Commercial Banks</p>
                    </div>

                    {/* CRR Slider */}
                    <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-semibold">Cash Reserve Ratio (CRR)</span>
                        <span className="text-emerald-400 font-bold font-mono">{crrRate.toFixed(2)}%</span>
                      </div>
                      <input
                        type="range"
                        min={3.0}
                        max={8.0}
                        step={0.25}
                        value={crrRate}
                        onChange={(e) => handleCrrSlider(parseFloat(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Set CRR Rate"
                      />
                      <p className="text-[11px] text-slate-500">Locked with RBI in Cash (0% Interest)</p>
                    </div>

                    {/* SLR Slider */}
                    <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-semibold">Statutory Liquidity (SLR)</span>
                        <span className="text-amber-400 font-bold font-mono">{slrRate.toFixed(2)}%</span>
                      </div>
                      <input
                        type="range"
                        min={15.0}
                        max={25.0}
                        step={0.5}
                        value={slrRate}
                        onChange={(e) => { setSlrRate(parseFloat(e.target.value)); audioManager.play('count'); }}
                        className="w-full accent-amber-500 cursor-pointer"
                        aria-label="Set SLR Rate"
                      />
                      <p className="text-[11px] text-slate-500">Maintained in G-Secs / T-Bills</p>
                    </div>
                  </div>

                  {/* Real-time Banking Dashboard Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800">
                      <p className="text-[11px] text-slate-400">Locked CRR Reserves</p>
                      <p className="text-base font-bold text-emerald-400 font-mono mt-0.5">₹{requiredCrrCash.toFixed(1)} L.Cr</p>
                      <p className="text-[10px] text-slate-500 mt-1">Sec 42 RBI Act</p>
                    </div>
                    <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800">
                      <p className="text-[11px] text-slate-400">Lendable Funds Base</p>
                      <p className="text-base font-bold text-gold-400 font-mono mt-0.5">₹{lendableDeposits.toFixed(1)} L.Cr</p>
                      <p className="text-[10px] text-slate-500 mt-1">Free to extend loans</p>
                    </div>
                    <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800">
                      <p className="text-[11px] text-slate-400">Credit Multiplier</p>
                      <p className="text-base font-bold text-purple-400 font-mono mt-0.5">{creditMultiplier.toFixed(1)}x</p>
                      <p className="text-[10px] text-slate-500 mt-1">k = 1 / CRR</p>
                    </div>
                    <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800">
                      <p className="text-[11px] text-slate-400">Retail MCLR Rate</p>
                      <p className="text-base font-bold text-rose-400 font-mono mt-0.5">{bankLendingRateMCLR.toFixed(2)}%</p>
                      <p className="text-[10px] text-slate-500 mt-1">Home & Corp Loan Cost</p>
                    </div>
                  </div>

                  {/* Recharts Live Transmission Curve */}
                  <div className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-xs font-semibold text-slate-300">Monetary Transmission Forecast (Inflation vs Bank Lending Rate)</p>
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monetaryTransmissionData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="stage" stroke="#64748b" fontSize={11} />
                          <YAxis stroke="#64748b" fontSize={11} domain={[3, 12]} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} />
                          <Line type="monotone" dataKey="lendingRate" name="Bank Lending Rate %" stroke="#f43f5e" strokeWidth={2} dot={{ r: 3 }} />
                          <Line type="monotone" dataKey="inflation" name="Projected CPI %" stroke="#38bdf8" strokeWidth={2} dot={{ r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: QUALITATIVE / SELECTIVE TARGETING ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setSelectedSector('unsecured'); audioManager.play('tap'); }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border ${selectedSector === 'unsecured' ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                    >
                      Unsecured Personal Credit (Risk Weight 125%)
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setSelectedSector('msme'); audioManager.play('tap'); }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border ${selectedSector === 'msme' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                    >
                      Priority Sector MSME / Agriculture (Risk Weight 100%)
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setSelectedSector('housing'); audioManager.play('tap'); }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border ${selectedSector === 'housing' ? 'bg-amber-600 border-amber-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                    >
                      Housing Loan Margin / LTV Caps (75% - 90%)
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    {selectedSector === 'unsecured' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-300 font-semibold">Consumer Loan Capital Requirement:</span>
                          <span className="text-rose-400 font-bold font-mono">₹14.38 Capital per ₹100 Lent</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div className="h-full bg-rose-500" animate={{ width: '85%' }} />
                        </div>
                        <p className="text-xs text-slate-400">
                          By hiking risk weight from 100% to 125% (Nov 2023), the RBI increased the capital banks must hold against credit cards and personal loans, slowing excessive borrowing without hiking the Repo rate.
                        </p>
                      </motion.div>
                    )}

                    {selectedSector === 'msme' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-300 font-semibold">MSME Productive Capital Requirement:</span>
                          <span className="text-emerald-400 font-bold font-mono">₹11.50 Capital per ₹100 Lent</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div className="h-full bg-emerald-500" animate={{ width: '50%' }} />
                        </div>
                        <p className="text-xs text-slate-400">
                          Productive export sectors and small businesses remain protected with standard capital weights, ensuring job-creating working capital flows unimpeded.
                        </p>
                      </motion.div>
                    )}

                    {selectedSector === 'housing' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-300 font-semibold">Loan-to-Value (LTV) Cap on Homes &gt; ₹75 Lakh:</span>
                          <span className="text-amber-400 font-bold font-mono">75% Max Bank Loan (25% Borrower Margin)</span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Margin requirements force property buyers to put down upfront equity, curbing speculative real estate bubbles in metro markets.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: BALANCE OF PAYMENTS LIVE LEDGER ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Current Account Card */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-xs pb-1 border-b border-slate-800">
                        <span className="font-bold text-gold-400">1. Current Account (Flows)</span>
                        <span className={`font-mono font-bold ${currentAccountBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {currentAccountBalance >= 0 ? '+' : ''}{currentAccountBalance} $B
                        </span>
                      </div>
                      <div className="text-xs space-y-1 text-slate-300 font-mono">
                        <div className="flex justify-between"><span>Visible Goods Exports:</span><span>+${merchandiseExports}B</span></div>
                        <div className="flex justify-between text-rose-300"><span>Visible Goods Imports:</span><span>-${merchandiseImports}B</span></div>
                        <div className="flex justify-between text-gold-300"><span>Software Invisibles:</span><span>+${softwareExports}B</span></div>
                        <div className="flex justify-between text-emerald-300"><span>Diaspora Remittances:</span><span>+${inwardRemittances}B</span></div>
                      </div>
                    </div>

                    {/* Capital Account Card */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-xs pb-1 border-b border-slate-800">
                        <span className="font-bold text-purple-400">2. Capital Account (Assets/Liabilities)</span>
                        <span className="font-mono font-bold text-purple-300">+${capitalAccountBalance} $B</span>
                      </div>
                      <div className="text-xs space-y-1 text-slate-300 font-mono">
                        <div className="flex justify-between text-purple-200"><span>FDI Direct Inflows:</span><span>+${fdiInflows}B</span></div>
                        <div className="flex justify-between text-gold-200"><span>FII / FPI Portfolio:</span><span>+${fiiNetFlows}B</span></div>
                        <div className="flex justify-between text-slate-400"><span>ECB Borrowings:</span><span>+${ecbBorrowing}B</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Balancing Reserve Entry */}
                  <div className="p-3.5 bg-gold-950/50 rounded-xl border border-gold-700/60 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-gold-200">3. Official Reserve Account (Accommodating Balancing Item)</p>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Autonomous Balance: <span className="font-mono font-bold text-amber-300">{autonomousBalance >= 0 ? '+' : ''}{autonomousBalance} $B</span> → RBI Reserve Action: <span className="font-mono font-bold text-emerald-300">{reserveChangeRequired >= 0 ? `+${reserveChangeRequired} $B (Drawdown/Credit)` : `${reserveChangeRequired} $B (Accretion/Debit)`}</span>
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-900 rounded-lg text-emerald-400 border border-emerald-500/40">
                      BoP Total ≡ $0.00
                    </span>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: FOREX MARKET EQUILIBRIUM & CRUDE SHOCK ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Crude Oil Price Slider */}
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-semibold">Global Crude Oil Price</span>
                        <span className="text-rose-400 font-bold font-mono">${crudeOilPrice} / bbl</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={130}
                        step={5}
                        value={crudeOilPrice}
                        onChange={(e) => handleCrudeOilSlider(parseInt(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer"
                        aria-label="Set Crude Oil Price"
                      />
                      <p className="text-[11px] text-slate-500">Shifts USD Demand Curve Rightward</p>
                    </div>

                    {/* RBI Intervention Slider */}
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-semibold">RBI Forex Market Intervention</span>
                        <span className="text-gold-400 font-bold font-mono">{rbiForexIntervention > 0 ? `Selling $${rbiForexIntervention}B` : 'No Intervention'}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={30}
                        step={5}
                        value={rbiForexIntervention}
                        onChange={(e) => { setRbiForexIntervention(parseInt(e.target.value)); audioManager.play('count'); }}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Set RBI Forex Intervention"
                      />
                      <p className="text-[11px] text-slate-500">Supplies USD from $640B Reserves to Smooth Volatility</p>
                    </div>
                  </div>

                  {/* Derived Exchange Rate Banner */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-400">Live Foreign Exchange Rate (Price Quotation)</p>
                      <p className="text-2xl font-black text-amber-300 font-mono mt-0.5">₹{derivedExchangeRate.toFixed(2)} / USD</p>
                    </div>
                    <div className="text-xs space-y-1 text-right">
                      <span className="px-2.5 py-0.5 bg-slate-800 rounded text-slate-300 font-medium">Managed Float Regime</span>
                      <p className="text-[11px] text-slate-500">
                        {derivedExchangeRate > 83 ? 'Rupee Depreciating (Exports cheaper, Oil imports costlier)' : 'Rupee Stable'}
                      </p>
                    </div>
                  </div>

                  {/* Supply & Demand Forex Chart */}
                  <div className="h-44 w-full p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={forexSupplyDemandData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="rate" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} />
                        <Line type="monotone" dataKey="DemandUSD" name="Demand for USD (Imports/Outflows)" stroke="#f43f5e" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="SupplyUSD" name="Supply of USD (Exports/Inflows)" stroke="#10b981" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: FISCAL POLICY & FRBM TARGET ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Capex Slider */}
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-semibold">Capital Expenditure (Capex)</span>
                        <span className="text-gold-400 font-bold font-mono">₹{publicCapex.toFixed(2)} L.Cr</span>
                      </div>
                      <input
                        type="range"
                        min={5.0}
                        max={16.0}
                        step={0.5}
                        value={publicCapex}
                        onChange={(e) => handleCapexSlider(parseFloat(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Set Public Capex"
                      />
                      <p className="text-[11px] text-slate-500">High Multiplier Infrastructure Spending</p>
                    </div>

                    {/* Tax Rate Slider */}
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-semibold">Direct Tax Efficiency</span>
                        <span className="text-emerald-400 font-bold font-mono">{directTaxRate}%</span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={35}
                        step={1}
                        value={directTaxRate}
                        onChange={(e) => { setDirectTaxRate(parseInt(e.target.value)); audioManager.play('count'); }}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Set Direct Tax Rate"
                      />
                      <p className="text-[11px] text-slate-500">Government Revenue Mobilisation</p>
                    </div>
                  </div>

                  {/* FRBM Deficit Monitor */}
                  <div className={`p-4 rounded-xl border transition-all ${
                    isFrbmCompliant ? 'bg-emerald-950/40 border-emerald-600/50' : 'bg-rose-950/40 border-rose-600/50'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-xs text-slate-400">Fiscal Deficit (% of Nominal GDP)</p>
                        <p className="text-2xl font-black font-mono mt-0.5" style={{ color: isFrbmCompliant ? '#34d399' : '#f87171' }}>
                          {fiscalDeficitGdpPct.toFixed(2)}% of GDP
                        </p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                        isFrbmCompliant ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500' : 'bg-rose-900/60 text-rose-300 border border-rose-500'
                      }`}>
                        {isFrbmCompliant ? '✓ FRBM Target Compliant (≤3.5%)' : '⚠ High Deficit (Escape Clause Needed)'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Total Expenditure: ₹{totalGovtExpenditure.toFixed(2)} L.Cr | Estimated Revenue: ₹{estimatedTaxReceipts.toFixed(2)} L.Cr | Fiscal Gap: ₹{fiscalDeficitCrores.toFixed(2)} L.Cr
                    </p>
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
              onClick={() => { setCurrentSlide(s => Math.max(0, s - 1)); audioManager.play('tap'); }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs sm:text-sm font-semibold"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-mono">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { setCurrentSlide(s => s + 1); audioManager.play('tap'); }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/30"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-gold-300">Macroeconomic Control Sandbox (Zero Pressure)</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manipulate any combination of monetary, forex, and fiscal dials. Observe the live Canvas & Dashboard.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          {/* Canvas Wave Indicator */}
          <canvas ref={canvasRef} width={600} height={30} className="w-full rounded-lg bg-slate-950 border border-slate-800" />

          {/* Sandbox Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {(['monetary', 'bop', 'forex', 'fiscal'] as const).map((tab) => (
              <motion.button
                key={tab}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setActiveTab(tab); audioManager.play('tap'); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize ${
                  activeTab === tab ? 'bg-gold-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab} Levers
              </motion.button>
            ))}
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            {activeTab === 'monetary' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Repo Rate ({repoRate}%)</label>
                  <input type="range" min={4.0} max={8.5} step={0.25} value={repoRate} onChange={(e) => handleRepoSlider(parseFloat(e.target.value))} className="w-full accent-gold-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">CRR ({crrRate}%)</label>
                  <input type="range" min={3.0} max={8.0} step={0.25} value={crrRate} onChange={(e) => handleCrrSlider(parseFloat(e.target.value))} className="w-full accent-emerald-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">SLR ({slrRate}%)</label>
                  <input type="range" min={15} max={25} step={0.5} value={slrRate} onChange={(e) => { setSlrRate(parseFloat(e.target.value)); audioManager.play('count'); }} className="w-full accent-amber-500" />
                </div>
                <div className="sm:col-span-3 pt-2 grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 bg-slate-950 rounded-lg text-xs"><span className="text-slate-400">Lendable:</span> <span className="font-bold text-gold-300 font-mono">₹{lendableDeposits.toFixed(1)} L.Cr</span></div>
                  <div className="p-2 bg-slate-950 rounded-lg text-xs"><span className="text-slate-400">Multiplier:</span> <span className="font-bold text-purple-300 font-mono">{creditMultiplier.toFixed(1)}x</span></div>
                  <div className="p-2 bg-slate-950 rounded-lg text-xs"><span className="text-slate-400">Lending MCLR:</span> <span className="font-bold text-rose-300 font-mono">{bankLendingRateMCLR.toFixed(2)}%</span></div>
                </div>
              </div>
            )}

            {activeTab === 'bop' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400">Oil Imports ($B): {merchandiseImports}</label>
                    <input type="range" min={500} max={850} step={10} value={merchandiseImports} onChange={(e) => setMerchandiseImports(parseInt(e.target.value))} className="w-full accent-rose-500" />
                  </div>
                  <div>
                    <label className="text-slate-400">IT Exports ($B): {softwareExports}</label>
                    <input type="range" min={150} max={250} step={5} value={softwareExports} onChange={(e) => setSoftwareExports(parseInt(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                  <div>
                    <label className="text-slate-400">Remittances ($B): {inwardRemittances}</label>
                    <input type="range" min={80} max={140} step={5} value={inwardRemittances} onChange={(e) => setInwardRemittances(parseInt(e.target.value))} className="w-full accent-emerald-500" />
                  </div>
                  <div>
                    <label className="text-slate-400">FDI Inflows ($B): {fdiInflows}</label>
                    <input type="range" min={40} max={100} step={5} value={fdiInflows} onChange={(e) => setFdiInflows(parseInt(e.target.value))} className="w-full accent-purple-500" />
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl flex justify-between text-xs font-mono">
                  <span>CAD: <strong className={currentAccountBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{currentAccountBalance} $B</strong></span>
                  <span>Capital Acc: <strong className="text-purple-400">+{capitalAccountBalance} $B</strong></span>
                  <span>Autonomous Net: <strong className="text-amber-400">{autonomousBalance} $B</strong></span>
                </div>
              </div>
            )}

            {activeTab === 'forex' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400">Crude Oil Price: ${crudeOilPrice}/bbl</label>
                    <input type="range" min={50} max={130} step={5} value={crudeOilPrice} onChange={(e) => handleCrudeOilSlider(parseInt(e.target.value))} className="w-full accent-rose-500" />
                  </div>
                  <div>
                    <label className="text-slate-400">US Fed Funds Rate: {usFedRate}%</label>
                    <input type="range" min={1} max={7} step={0.25} value={usFedRate} onChange={(e) => setUsFedRate(parseFloat(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                </div>
                <p className="text-center text-sm font-bold text-amber-300 font-mono bg-slate-950 p-2 rounded-lg">
                  Equilibrium Spot Rate: ₹{derivedExchangeRate.toFixed(2)} / USD
                </p>
              </div>
            )}

            {activeTab === 'fiscal' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400">Infra Capex: ₹{publicCapex.toFixed(1)} L.Cr</label>
                    <input type="range" min={5} max={16} step={0.5} value={publicCapex} onChange={(e) => handleCapexSlider(parseFloat(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                  <div>
                    <label className="text-slate-400">Direct Tax Efficiency: {directTaxRate}%</label>
                    <input type="range" min={15} max={35} step={1} value={directTaxRate} onChange={(e) => setDirectTaxRate(parseInt(e.target.value))} className="w-full accent-emerald-500" />
                  </div>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg text-xs flex justify-between font-mono">
                  <span>Deficit: ₹{fiscalDeficitCrores.toFixed(1)} L.Cr</span>
                  <span className={isFrbmCompliant ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {fiscalDeficitGdpPct.toFixed(2)}% of GDP {isFrbmCompliant ? '(Compliant)' : '(Exceeds 3.5%)'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES & CISCE COMPETENCY EVALUATION ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Progress and Competency Bar */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between text-xs gap-2">
              <span className="text-slate-300 font-semibold">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-gold-950 text-gold-300 rounded font-mono uppercase text-[10px] border border-gold-800">
                  NEP: {challenge.competencyLevel}
                </span>
                <span className="text-slate-400 font-mono">
                  Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
                </span>
              </div>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-purple-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Main Question Card with Shake on Wrong */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-5 rounded-2xl border transition-colors duration-300 ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ / CLASSIFY / DISTINGUISH TYPES */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-2.5 mt-4">
                {challenge.options.map((opt, i) => {
                  const isSelected = showExplanation && i === challenge.correctIndex;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                        showExplanation
                          ? isSelected
                            ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950'
                            : 'bg-slate-900/60 border-slate-800 text-slate-500'
                          : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-gold-500'
                      }`}
                    >
                      <span className="mr-2 font-mono font-bold text-slate-400">[{String.fromCharCode(65 + i)}]</span>
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag each item into its correct BoP Ledger slot:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700/80 hover:bg-gold-600 text-white rounded-lg text-xs font-semibold cursor-grab border border-gold-500/50 shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'slot_current_visible', label: '1. Current Account - Visible Goods' },
                    { id: 'slot_current_invisible', label: '2. Current Account - Invisible Services' },
                    { id: 'slot_capital_fdi', label: '3. Capital Account - Direct Investment (FDI)' },
                    { id: 'slot_reserve_accommodating', label: '4. Official Reserve Account (Accommodating)' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-3 rounded-xl border-2 border-dashed min-h-[70px] flex flex-col justify-center transition-colors ${
                        droppedLabels[target.id] ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-950/60 border-slate-700'
                      }`}
                    >
                      <span className="text-[11px] text-slate-400 font-semibold">{target.label}</span>
                      <span className="text-xs font-bold text-emerald-300 mt-1 font-mono">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop matching flow here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-4 space-y-3">
                <span className="text-xs text-slate-400">Drag to re-order sequential transmission stages:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span><strong className="text-gold-400 mr-2">{displayIdx + 1}.</strong> {item}</span>
                      <span className="text-slate-500 text-xs">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow"
                >
                  Check Sequence →
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500 w-56"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-4 space-y-3">
                <span className="text-xs text-slate-400">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-900/60 hover:bg-gold-800 text-gold-200 border border-gold-700/60 rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2">
                  {constructParts.map((p, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-gold-600 text-white text-xs rounded-md flex items-center gap-1.5"
                    >
                      {p}
                      <button onClick={() => setConstructParts(prev => prev.filter((_, j) => j !== idx))} className="text-rose-300 font-bold">×</button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click reform pillars above to build package</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow"
                >
                  Verify Reform Package
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-gold-950/40 border border-gold-700/60 rounded-xl space-y-3"
              >
                <p className="text-xs font-bold text-gold-300 uppercase tracking-wider">Step-by-Step Concept Breakdown:</p>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-gold-400">{sIdx + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(r => r + 1)}
                      className="px-4 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold"
                    >
                      Next Step In Breakdown →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Review →' : 'Next Competency Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, REFLECTION & REVIEW SCHEDULE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-gold-950/60 rounded-3xl border border-emerald-600/50 text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Simulation Completed!</h2>
            <p className="text-base text-emerald-400 font-bold font-mono">
              Final Macro Score: {Math.max(0, 100 - errors * 5)}% • BKT Mastery: {masteryLevel.toUpperCase()}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
              {errors === 0
                ? 'PERFECT SCORE! You have mastered all Class 12 macroeconomic levers, from the Repo liquidity corridor to BoP and FRBM fiscal policy.'
                : errors <= 3
                ? 'Excellent performance! You demonstrate high conceptual strength in macroeconomic analysis. Review your profile below.'
                : 'Good effort! Macroeconomics requires multi-variable thinking. Review the misconceptions below and re-test in the sandbox.'}
            </p>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/50 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">Your Diagnostic Misconception Review:</h3>
              <div className="grid grid-cols-1 gap-2.5">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-amber-950/30 rounded-2xl border border-amber-800/50 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Spaced Repetition Schedule (SM-2)</p>
              <p className="text-xs text-slate-300 mt-1">
                Next scheduled retention check in: <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real World Dossier Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>📋</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                <p key={sIdx} className="text-xs text-slate-400 font-mono">{st}</p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Accomplished!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}
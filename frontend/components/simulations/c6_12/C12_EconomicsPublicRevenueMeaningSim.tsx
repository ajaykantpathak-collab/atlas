'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Cell } from 'recharts';

// Node IDs as string literals
const NODE_C12_ECON_071 = 'c12_econ_071';
const NODE_C12_ECON_072 = 'c12_econ_072';
const NODE_C12_ECON_073 = 'c12_econ_073';
const NODE_C12_ECON_074 = 'c12_econ_074';
const NODE_C12_ECON_075 = 'c12_econ_075';
const NODE_C12_ECON_076 = 'c12_econ_076';
const NODE_C12_ECON_077 = 'c12_econ_077';
const NODE_C12_ECON_078 = 'c12_econ_078';
const NODE_C12_ECON_079 = 'c12_econ_079';
const NODE_C12_ECON_080 = 'c12_econ_080';

const ALL_NODE_IDS = [
  NODE_C12_ECON_071,
  NODE_C12_ECON_072,
  NODE_C12_ECON_073,
  NODE_C12_ECON_074,
  NODE_C12_ECON_075,
  NODE_C12_ECON_076,
  NODE_C12_ECON_077,
  NODE_C12_ECON_078,
  NODE_C12_ECON_079,
  NODE_C12_ECON_080,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Chief Economic Advisor to North Block',
  intro: 'You have just been appointed Chief Economic Advisor to the Ministry of Finance, New Delhi. The Union Budget 2024-25 is on the table: ₹47.83 lakh crore of expenditure, tax reforms, huge infrastructure pushes (PM Gati Shakti), public debt roll-overs, and tricky deficit targets under the FRBM Act.',
  context: 'Navigate public revenues, direct vs indirect tax burdens, debt redemption, deficit mechanics, and the circular flow of income to keep the Republic fiscally strong and equitable.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If the Union Government borrows ₹14 lakh crore to build bullet trains and dedicated freight corridors, why is this considered "fiscally healthier" than borrowing ₹5 lakh crore to pay government salaries?',
  options: [
    'Salaries are paid in cash whereas infrastructure is paid by cheque.',
    'Infrastructure (capital capex) creates durable assets that boost future GDP and tax revenues, making debt self-liquidating; salaries (revenue expenditure) create no assets.',
    'Salaries increase the money supply directly, whereas trains decrease money supply.',
    'The Constitution prohibits borrowing for infrastructure but encourages borrowing for salaries.',
  ],
  correctIndex: 1,
  hintAfter: "Great intuition! Capital spending creates productive capacity, whereas revenue spending sustains current consumption. Let us explore the entire machinery of Public Finance!",
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

// ─── 22 CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C12_ECON_071,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Indian Constitutional law (Article 265) and economic principles, what is the defining characteristic of a "tax"?',
    options: [
      'It is a voluntary donation made to the Consolidated Fund of India.',
      'It is a compulsory payment made to the government without any direct quid pro quo.',
      'It is a fee charged strictly in proportion to direct benefits received.',
      'It is a commercial price charged for public sector goods and services.',
    ],
    correctIndex: 1,
    explanation: 'A tax is a compulsory contribution imposed by public authority without direct quid pro quo (no specific direct benefit returned to the taxpayer). This distinguishes it from fees or prices.',
    hints: [
      'Think about whether paying income tax entitles you to a special private highway lane.',
      'A tax has legal compulsion and lacks a direct commercial return (quid pro quo).',
      'The payment is mandatory under Article 265 without a proportional direct personal benefit.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C12_ECON_071,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the tax rate structure descriptions to the correct economic classification.',
    dragItems: [
      { label: 'Progressive Tax', targetId: 'rate_rising' },
      { label: 'Proportional Tax', targetId: 'rate_flat' },
      { label: 'Regressive Tax', targetId: 'rate_falling' },
      { label: 'Specific Tax', targetId: 'rate_per_unit' },
    ],
    correctMapping: {
      rate_rising: 'Progressive Tax',
      rate_flat: 'Proportional Tax',
      rate_falling: 'Regressive Tax',
      rate_per_unit: 'Specific Tax',
    },
    explanation: 'Progressive tax rate rises as income rises (Income Tax). Proportional tax has a constant rate (GST). Regressive tax takes a larger fraction from low earners. Specific tax is a fixed rupee amount per unit (e.g. ₹32/litre on petrol).',
    hints: [
      'Look at what happens to the average tax rate as income increases.',
      'A flat percentage across all brackets is proportional.',
      'A fixed rupee amount per physical unit is a specific tax.',
    ],
  },
  {
    id: 'ch_03',
    nodeId: NODE_C12_ECON_072,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is Personal Income Tax classified as a Direct Tax while GST is an Indirect Tax?',
    options: [
      'Income Tax is levied only on corporations, whereas GST is levied on foreign goods.',
      'In Income Tax, impact and incidence fall on the same person (cannot be shifted); in GST, the shopkeeper pays (impact) but shifts the burden to the customer (incidence).',
      'Income tax is collected by state governments whereas GST is collected by municipalities.',
      'GST has a higher percentage tax rate than Income Tax in India.',
    ],
    correctIndex: 1,
    explanation: 'Direct taxes cannot be shifted (Impact = Incidence). In indirect taxes like GST, the legal liability (impact) is on the seller, but the economic burden (incidence) is shifted forward to the buyer in the MRP.',
    hints: [
      'Focus on the word "shifting" and the concepts of impact vs incidence.',
      'Can a salaried TCS employee shift her income tax deduction to her friend?',
      'Direct taxes coincide at impact and incidence; indirect taxes allow shifting.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_04',
    nodeId: NODE_C12_ECON_080,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Correctly identify the four streams in the Two-Sector Circular Flow model between Households and Firms.',
    dragItems: [
      { label: 'Factor Services (Labour, Land)', targetId: 'flow_upper_real' },
      { label: 'Factor Payments (Wages, Rent)', targetId: 'flow_upper_money' },
      { label: 'Consumption Spending (₹)', targetId: 'flow_lower_money' },
      { label: 'Final Goods & Services', targetId: 'flow_lower_real' },
    ],
    correctMapping: {
      flow_upper_real: 'Factor Services (Labour, Land)',
      flow_upper_money: 'Factor Payments (Wages, Rent)',
      flow_lower_money: 'Consumption Spending (₹)',
      flow_lower_real: 'Final Goods & Services',
    },
    explanation: 'Real flows represent physical goods and factor services (outer loops). Money flows represent financial payments (wages, rent, consumer spending) running in opposite directions.',
    hints: [
      'Households supply physical factor inputs (real flow) to firms in exchange for factor payments (money flow).',
      'Firms supply finished goods (real flow) to households in exchange for consumption spending (money flow).',
      'Check the direction: physical real flows mirror financial money flows.',
    ],
  },
  {
    id: 'ch_05',
    nodeId: NODE_C12_ECON_077,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under which Article of the Constitution of India is the Annual Financial Statement (Union Budget) laid before Parliament?',
    options: [
      'Article 280 (Finance Commission)',
      'Article 112 (Union Budget)',
      'Article 360 (Financial Emergency)',
      'Article 370 (Special Status)',
    ],
    correctIndex: 1,
    explanation: 'Article 112 mandates that the President shall cause to be laid before Parliament the Annual Financial Statement (Union Budget). Article 202 governs State Budgets.',
    hints: [
      'It is in Part V of the Constitution under legislative financial procedures.',
      'State budgets are Article 202; Union budget is Article 112.',
      'The answer is Article 112.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C12_ECON_077,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of enactment of the Union Budget in the Indian Parliament.',
    sortItems: [
      'Presentation of Budget Speech by Finance Minister',
      'General Discussion in Lok Sabha and Rajya Sabha',
      'Voting on Demands for Grants by Lok Sabha',
      'Passing of Appropriation Bill & Finance Bill and Presidential Assent',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The budget begins with the FM speech, followed by general discussion, voting on demands for grants (Lok Sabha only), and enactment via the Appropriation and Finance Bills.',
    hints: [
      'The speech happens on Day 1 (typically Feb 1).',
      'Voting on spending (demands) happens before final money bills pass.',
      'Presidential assent is always the final constitutional step.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C12_ECON_074,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What percentage of India’s total public debt is Internal Debt (denominated in Indian Rupees and held by domestic institutions)?',
    options: [
      'Approximately 10% (mostly foreign World Bank loans)',
      'Approximately 50% (equally split with foreign lenders)',
      'Approximately 95% (held by RBI, commercial banks via SLR, LIC, EPFO, and small savers)',
      '100% (India has zero foreign debt by law)',
    ],
    correctIndex: 2,
    explanation: 'Roughly 95% of India’s public debt is internal, insulating the Indian economy from severe foreign exchange currency-default crises like Sri Lanka (2022) or Argentina.',
    hints: [
      'India relies overwhelmingly on domestic household savings pooled in banks, LIC, and EPFO.',
      'External sovereign debt is only around 5% of total public liabilities.',
      'The vast majority is internal rupee debt: ~95%.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_08',
    nodeId: NODE_C12_ECON_071,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under a progressive income tax regime (0% up to ₹3L, 5% on ₹3L–₹7L, 20% on ₹7L–₹10L, 30% above ₹10L), compute the total income tax payable (in ₹) on an annual income of ₹10,00,000 (ignoring cesses).',
    correctAnswer: 80000,
    tolerance: 100,
    unit: '₹',
    explanation: 'Tax = (0% of 3L) + 5% of (7L - 3L = 4L) + 20% of (10L - 7L = 3L) = ₹0 + ₹20,000 + ₹60,000 = ₹80,000. Average tax rate = 8%.',
    hints: [
      'Slab 1 (0 to 3L) = ₹0.',
      'Slab 2 (3L to 7L) is ₹4L × 5% = ₹20,000.',
      'Slab 3 (7L to 10L) is ₹3L × 20% = ₹60,000. Add them together.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C12_ECON_072,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Apple India imports 50,000 MacBooks at ₹1,00,000 each. Customs duty is 20% and GST is 18%. Who bears the legal IMPACT and who bears the ultimate economic INCIDENCE of these taxes?',
    options: [
      'Impact: Indian consumer; Incidence: Apple Inc. in California.',
      'Impact: Apple India / Importer (legally writes the cheque to Customs); Incidence: Indian consumer (recovers it in the retail price).',
      'Impact and Incidence both stay entirely with the Reserve Bank of India.',
      'Impact: Ministry of Finance; Incidence: Apple Retail staff.',
    ],
    correctIndex: 1,
    explanation: 'The importer Apple India pays the duty at the port of entry (Impact), but shifts the full duty and GST forward to the end consumer in the retail billing price (Incidence).',
    hints: [
      'Impact is the person who legally writes the cheque at the customs border.',
      'Incidence is the person whose wallet is ultimately lighter when buying the laptop.',
      'The importer bears impact; the retail buyer bears incidence.',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C12_ECON_073,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is ₹11.9 lakh crore of interest payments in Budget 2024-25 classified as Revenue Expenditure, whereas ₹2.55 lakh crore spent on Indian Railways track electrification is Capital Expenditure?',
    options: [
      'Interest payments are paid to foreigners, while railways are purely domestic.',
      'Interest payments are a recurring cost that neither creates a tangible asset nor reduces loan principal; railway electrification creates long-lasting physical productive assets.',
      'Interest payments reduce debt liabilities, whereas railway electrification increases liabilities.',
      'Capital expenditure must always exceed revenue expenditure by constitutional law.',
    ],
    correctIndex: 1,
    explanation: 'Interest payments only service past borrowing without reducing principal or creating assets (Revenue Exp). Infrastructure spending creates durable assets that expand GDP capacity (Capital Exp).',
    hints: [
      'Apply the asset/liability test: does interest create an asset or reduce debt principal?',
      'Interest is just the carrying cost of debt — consumption-like recurring spending.',
      'Railway tracks are durable productive physical assets (Capital Expenditure).',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_11',
    nodeId: NODE_C12_ECON_079,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Given: Total Expenditure = ₹45 lakh crore, Revenue Receipts = ₹28 lakh crore, Non-Debt Capital Receipts (Disinvestment & Recovery) = ₹2 lakh crore, Interest Payments = ₹10 lakh crore. Calculate the FISCAL DEFICIT (in ₹ lakh crore).',
    correctAnswer: 15,
    tolerance: 0.1,
    unit: 'lakh crore',
    explanation: 'Fiscal Deficit = Total Expenditure − (Revenue Receipts + Non-Debt Capital Receipts) = 45 − (28 + 2) = 45 − 30 = ₹15 lakh crore.',
    hints: [
      'Fiscal Deficit = Total Expenditure − Non-Borrowing Receipts.',
      'Non-borrowing receipts = Revenue Receipts (28) + Non-Debt Capital Receipts (2).',
      '45 − 30 = 15 lakh crore.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C12_ECON_079,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Using the previous question data (Fiscal Deficit = ₹15 lakh crore, Interest Payments = ₹10 lakh crore), compute the PRIMARY DEFICIT (in ₹ lakh crore).',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: 'lakh crore',
    explanation: 'Primary Deficit = Fiscal Deficit − Interest Payments = 15 − 10 = ₹5 lakh crore. This shows current fiscal policy alone requires ₹5L cr borrowing beyond legacy interest.',
    hints: [
      'Primary Deficit formula is: Fiscal Deficit − Interest Payments.',
      'Subtract the legacy interest obligation (₹10L cr) from total borrowing (₹15L cr).',
      '15 − 10 = 5 lakh crore.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C12_ECON_075,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Build the correct mathematical formula for the Annual Sinking Fund Installment (A) needed to redeem public debt (D) in (n) years earning annual compound interest (r).',
    availableParts: ['A =', '(D × r)', '/', '[(1 + r)^n − 1]', 'D × (1 + r)^n', '(D − r) / n'],
    targetState: 'A = (D × r) / [(1 + r)^n − 1]',
    validationHint: 'The numerator is D times interest rate r, divided by compound growth factor minus one.',
    explanation: 'Annual Sinking Fund Installment A = (D × r) / [(1 + r)^n − 1]. This ensures annual deposits plus compound interest grow to exactly redeem principal D at maturity year n.',
    hints: [
      'Start with "A =".',
      'Add the numerator "(D × r)", then the division sign "/".',
      'The denominator is "[(1 + r)^n − 1]".',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C12_ECON_076,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why did the FRBM Act 2003 (Section 5) ban the RBI from subscribing directly to primary issuances of Government Securities (direct monetisation)?',
    options: [
      'Because commercial banks complained they were not earning enough interest commissions.',
      'Because primary monetisation (printing currency for deficits) mechanically expands high-powered money supply and triggers severe double-digit inflation, as happened in 1990-91.',
      'Because the Supreme Court ruled money printing unconstitutional under Article 14.',
      'Because India ran out of security paper and ink at the Nashik Currency Press.',
    ],
    correctIndex: 1,
    explanation: 'Direct monetisation creates automatic high-powered money without matching physical output. At near-full capacity, this leads to an inflationary gap, rupee depreciation, and external BOP crises.',
    hints: [
      'Think about the historical ad-hoc treasury bills prior to 1997.',
      'Printing money directly to fund spending expands the monetary base (M0 and M3).',
      'Uncontrolled money creation creates chronic inflation and macro instability.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_15',
    nodeId: NODE_C12_ECON_075,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'The RBI conducts a debt conversion switch operation of ₹60,000 crore face value, exchanging old dated G-Secs with an 8.5% coupon for new 15-year bonds with a 7.0% coupon. Calculate the annual interest saving for the government (in ₹ crore).',
    correctAnswer: 900,
    tolerance: 10,
    unit: '₹ crore',
    explanation: 'Interest Saving = (Old Coupon − New Coupon) × Face Value = (8.5% − 7.0%) × ₹60,000 cr = 1.5% × ₹60,000 cr = ₹900 crore per year. Over 15 years, this saves ₹13,500 crore!',
    hints: [
      'Difference in coupon rates = 8.5% − 7.0% = 1.5%.',
      'Compute 1.5% of ₹60,000 crore.',
      '0.015 × 60,000 = 900 crore.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C12_ECON_075,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Order these Debt Redemption methods from the most fiscally radical/drastic (extinguishes debt in one confiscated stroke) to the most passive/routine (simply rolls old debt forward).',
    sortItems: [
      'Capital Levy (One-time wealth confiscation)',
      'Surplus Budget (Paying off debt from excess tax revenue)',
      'Sinking Fund (Systematic pre-funded annual accumulation)',
      'Conversion / Switch (Lowering coupon rates on existing principal)',
      'Refunding (Issuing new bonds to pay maturing old bonds without reducing principal)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Capital levy is the most drastic emergency measure. Surplus budget actually retires debt from taxes. Sinking funds pre-fund redemption. Conversion saves interest. Refunding is the standard passive roll-over.',
    hints: [
      'Capital Levy is a confiscatory one-time wealth tax (most radical).',
      'Surplus budget actually reduces debt principal from current earnings.',
      'Refunding is the standard routine roll-over used in modern finance.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C12_ECON_080,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In a two-sector model, households earn ₹80,000 crore in factor income but only spend ₹72,000 crore on consumption. If there is no government or trade, what happens to the ₹8,000 crore in goods produced but unsold?',
    options: [
      'The goods vanish from the economy and national income drops to zero.',
      'It represents unplanned inventory accumulation by firms, which in national income accounting is treated as unintended Investment (I), preserving the identity Output = C + I.',
      'The households are legally forced to return the ₹8,000 crore to the Reserve Bank of India.',
      'The circular flow completely reverses its direction from clockwise to counter-clockwise.',
    ],
    correctIndex: 1,
    explanation: 'When saving (S = ₹8,000 cr) occurs, consumption falls short of output. The unsold goods accumulate on firm shelves as unintended inventory investment (I), ensuring S = I and Total Output = C + I.',
    hints: [
      'Remember that unsold goods still exist physically on warehouse shelves.',
      'In macroeconomic accounting, inventory changes are classified as capital formation/investment.',
      'Saving equals unintended investment in this baseline identity.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C12_ECON_078,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A state government sells ₹4,000 crore of shares in a state power utility (Disinvestment) and uses the entire ₹4,000 crore to pay the arrears of government employee pensions. What are the budget classifications of these two transactions?',
    options: [
      'Receipt: Revenue Receipt; Expenditure: Capital Expenditure.',
      'Receipt: Capital Receipt (reduces asset); Expenditure: Revenue Expenditure (recurring consumption, no asset created).',
      'Receipt: Non-tax Revenue; Expenditure: Developmental Capex.',
      'Both transactions are Capital Expenditure.',
    ],
    correctIndex: 1,
    explanation: 'Disinvestment reduces the state’s financial equity asset (Capital Receipt). Paying pension arrears is recurring consumption that creates no physical asset and reduces no debt principal (Revenue Expenditure).',
    hints: [
      'Disinvestment reduces government asset ownership (PSU shares).',
      'Pensions are transfer payments with no asset creation.',
      'Capital Receipt (asset reducing) funding Revenue Expenditure (consumption).',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C12_ECON_079,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In Union Budget 2024-25, the Fiscal Deficit is 4.9% of GDP and Revenue Deficit is 1.8% of GDP. What percentage of total government borrowing is being used to finance Capital Expenditure (asset creation)?',
    options: [
      '0% — all borrowing is consumed by salaries and interest.',
      'Approximately 63.3% [(4.9 − 1.8) / 4.9], meaning over six-tenths of borrowed funds are building productive physical capital.',
      '100% — the law forbids any borrowing for revenue spending.',
      '1.8% exactly.',
    ],
    correctIndex: 1,
    explanation: 'Total borrowing = Fiscal Deficit (4.9% of GDP). Borrowing for consumption = Revenue Deficit (1.8% of GDP). Borrowing for Capital Outlay = 4.9 − 1.8 = 3.1% of GDP. Share for Capex = 3.1 / 4.9 = 63.26% (~63.3%).',
    hints: [
      'Capex share of borrowing = (Fiscal Deficit − Revenue Deficit) / Fiscal Deficit.',
      '(4.9 − 1.8) = 3.1% of GDP.',
      '3.1 / 4.9 = 63.26%.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C12_ECON_077,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'As CEA, how would you restructure a budget running a 6% Fiscal Deficit with a 4.5% Revenue Deficit to achieve long-term growth without causing recession?',
    options: [
      'Cut railway capex by 90% and double food subsidies.',
      'Expand the direct tax net via TDS/digitisation, rationalise untargeted revenue subsidies (power/fertiliser), and redirect borrowing toward high-multiplier Capital Outlays (PM Gati Shakti).',
      'Print ₹20 lakh crore via the RBI to clear all market loans immediately.',
      'Default on all internal dated G-Secs and double the corporate tax rate to 70%.',
    ],
    correctIndex: 1,
    explanation: 'The golden rule of public finance: eliminate the revenue deficit (stop borrowing for current consumption) while maintaining high-multiplier capital expenditure funded by prudent borrowing and widened tax bases.',
    hints: [
      'Focus on shifting spending from consumption (revenue) to asset-creation (capex).',
      'Widening the direct tax base improves equity without squeezing capital investment.',
      'Rationalise wasteful subsidies while protecting capex infrastructure.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C12_ECON_072,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Drag each Indian tax to its correct category: Direct Tax or Indirect Tax.',
    dragItems: [
      { label: 'Corporate Tax on Tata Motors', targetId: 'box_direct_1' },
      { label: 'Capital Gains Tax on Shares', targetId: 'box_direct_2' },
      { label: 'GST on Restaurant Dining', targetId: 'box_indirect_1' },
      { label: 'Customs Duty on Imported Solar Panels', targetId: 'box_indirect_2' },
    ],
    correctMapping: {
      box_direct_1: 'Corporate Tax on Tata Motors',
      box_direct_2: 'Capital Gains Tax on Shares',
      box_indirect_1: 'GST on Restaurant Dining',
      box_indirect_2: 'Customs Duty on Imported Solar Panels',
    },
    explanation: 'Direct taxes (Corporate Tax, Capital Gains Tax) cannot be shifted. Indirect taxes (GST, Customs Duty) are levied on transactions and passed forward to the consumer in prices.',
    hints: [
      'Taxes on income, profits, and capital gains are direct.',
      'Taxes on goods, services, and cross-border trade are indirect.',
      'Match corporate/capital gains to direct, and GST/customs to indirect.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C12_ECON_075,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A state government must redeem a ₹10,000 crore bond in 2 years. A sinking fund earns 10% compound interest annually (r = 0.10). Using A = (D × r) / [(1+r)^n − 1], calculate the annual installment A (in ₹ crore, rounded to nearest whole number). Note: (1.10)^2 = 1.21.',
    correctAnswer: 4762,
    tolerance: 5,
    unit: '₹ crore',
    explanation: 'A = (10,000 × 0.10) / (1.21 − 1) = 1,000 / 0.21 = ₹4,761.90 ≈ ₹4,762 crore per year.',
    hints: [
      'Numerator = 10,000 × 0.10 = 1,000.',
      'Denominator = (1.10)^2 − 1 = 1.21 − 1 = 0.21.',
      '1,000 / 0.21 = 4761.90 (approx 4762).',
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_ECON_071,
  title: 'Public Revenue, Expenditure, Debt & Budgetary Deficits',
  definition: 'Public finance deals with how the sovereign state raises revenue (tax and non-tax), spends on administration and capital formation, manages debt redemption, finances deficits, and structures the constitutional Annual Financial Statement.',
  eli5: 'Think of the government as the biggest household in the country. Taxes are its income, schools and highways are its expenses, bonds are its loans, and the circular flow shows how money travels from your family to companies and back again.',
  misconceptions: [
    {
      misconception: 'Proportional tax and progressive tax are identical because both involve percentages.',
      correction: 'In a proportional tax, the tax rate is constant across all income levels. In a progressive tax, the marginal tax rate rises as income increases.',
    },
    {
      misconception: 'The shopkeeper bears the GST because they write the tax cheque to the government.',
      correction: 'The shopkeeper bears the IMPACT (legal obligation) but shifts the INCIDENCE (ultimate economic burden) to the consumer via the retail price.',
    },
    {
      misconception: 'India’s high public debt means it is about to default like Sri Lanka.',
      correction: '95% of India’s debt is internal and denominated in INR, whereas Sri Lanka collapsed due to unserviceable foreign-currency external debt.',
    },
    {
      misconception: 'All government spending is wasteful consumption.',
      correction: 'Capital expenditure (highways, bullet trains, power grids) creates durable assets that expand GDP and generate future tax revenues.',
    },
    {
      misconception: 'Deficit financing is the same thing as the fiscal deficit.',
      correction: 'The fiscal deficit is the total borrowing gap; deficit financing is the specific method of filling that gap by money creation through the RBI.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is a defining feature of a tax?', options: ['Direct quid pro quo', 'Compulsory payment without direct quid pro quo', 'Voluntary contribution', 'Interest on loans'], correctIndex: 1 },
    { question: 'Which of the following is a Direct Tax?', options: ['GST', 'Customs Duty', 'Corporate Tax', 'Central Excise on Petrol'], correctIndex: 2 },
    { question: 'Which article governs the Union Budget?', options: ['Article 112', 'Article 202', 'Article 280', 'Article 356'], correctIndex: 0 },
    { question: 'Which deficit measures borrowing for current consumption?', options: ['Fiscal Deficit', 'Primary Deficit', 'Revenue Deficit', 'Monetised Deficit'], correctIndex: 2 },
    { question: 'Primary Deficit equals:', options: ['Fiscal Deficit − Revenue Deficit', 'Fiscal Deficit − Interest Payments', 'Total Expenditure − Total Receipts', 'Revenue Expenditure − Revenue Receipts'], correctIndex: 1 },
    { question: 'What percentage of India’s public debt is internal?', options: ['~50%', '~20%', '~95%', '~5%'], correctIndex: 2 },
    { question: 'In the 2-sector circular flow, the outer real flow carries:', options: ['Wages & rent', 'Factor services & final goods', 'Taxes & subsidies', 'Bank deposits'], correctIndex: 1 },
    { question: 'A sinking fund is used for:', options: ['Printing new notes', 'Accumulating funds to redeem debt principal', 'Collecting GST', 'Paying ministerial pensions'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student can compute all 3 budget deficits, distinguish direct/indirect taxes, classify revenue vs capital items, and model the 2-sector circular flow.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Tax Progressivity Lab',
    instruction: 'Adjust the tax rate sliders to see how Progressive, Proportional, and Regressive tax structures affect low-income vs high-income Indian citizens.',
    interactionType: 'tax-curves',
    nodeId: NODE_C12_ECON_071,
  },
  {
    title: 'Lab 2: Impact vs Incidence (Tax Shifting)',
    instruction: 'Drag the tax burden slider across the supply chain from Manufacturer → Retailer → Consumer to see where legal impact ends and economic incidence lands.',
    interactionType: 'tax-shifting',
    nodeId: NODE_C12_ECON_072,
  },
  {
    title: 'Lab 3: The 4-Quadrant Budget Builder',
    instruction: 'Allocate ₹47.83 lakh crore across Revenue Receipts, Capital Receipts, Revenue Expenditure, and Capital Outlays to balance the Union Budget.',
    interactionType: 'budget-quadrant',
    nodeId: NODE_C12_ECON_078,
  },
  {
    title: 'Lab 4: The Deficit Diagnostic Ladder',
    instruction: 'Simulate revenue shocks and capex expansions. Observe the Revenue Deficit, Fiscal Deficit, and Primary Deficit update in real time.',
    interactionType: 'deficit-sim',
    nodeId: NODE_C12_ECON_079,
  },
  {
    title: 'Lab 5: Two-Sector Circular Flow Engine',
    instruction: 'Toggle between Real Flows (physical factor inputs & output) and Money Flows (wages, rent, & consumer spending) to observe the macroeconomic identity Y = C.',
    interactionType: 'circular-flow',
    nodeId: NODE_C12_ECON_080,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the government increases Capital Expenditure by ₹3 lakh crore funded entirely by borrowing, what happens to the Revenue Deficit?',
    options: [
      'It increases by ₹3 lakh crore.',
      'It stays completely unchanged because Capital Expenditure is not part of the Revenue account!',
      'It drops to zero automatically.',
      'It doubles the primary deficit.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 4: Increase Capital Outlay and observe that the Revenue Deficit gauge does not move!',
    nodeId: NODE_C12_ECON_079,
  },
  {
    question: 'Predict: If market interest rates fall from 9% to 7%, how can the RBI help the government lower its debt burden without paying back any principal?',
    options: [
      'By declaring a national debt moratorium.',
      'By conducting a Debt Conversion switch operation (swapping high-coupon old bonds for low-coupon new bonds).',
      'By levying an emergency capital tax on low-income earners.',
      'By selling all government railways to foreign buyers.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Observe how Debt Conversion saves interest expenses while keeping total face value intact.',
    nodeId: NODE_C12_ECON_075,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When you switch from a Proportional GST to a Progressive Income Tax in Lab 1, what happens to the tax paid by a ₹50 Lakh earner as a percentage of their income?',
    observableOptions: [
      'It stays exactly the same percentage as the ₹3 Lakh earner.',
      'It increases significantly (from ~8% up to ~26%), adhering to the Ability-to-Pay principle.',
      'It drops to zero.',
      'It becomes negative.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_ECON_071,
  },
  {
    question: 'Observation: In Lab 5, what is the geometric relationship between the direction of the Real Flow (physical goods) and the Money Flow (rupee payments)?',
    observableOptions: [
      'Both flows move in the identical clockwise direction.',
      'The Money Flow runs in the exact opposite direction to the Real Flow at every transaction stage.',
      'The Money Flow only exists between households, never touching firms.',
      'Real flows move horizontally while money flows only move vertically.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_ECON_080,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Union Budget Analyst Project',
  description: 'Download the 1-page "Budget at a Glance" from indiabudget.gov.in for the latest financial year. Extract Revenue Receipts, Capital Receipts, Revenue Expenditure, and Capital Expenditure. Calculate the 3 deficit metrics and verify if India meets the FRBM Act glide path!',
  steps: [
    'Visit www.indiabudget.gov.in and download the Budget at a Glance PDF.',
    'Extract: Revenue Receipts (Net Tax + Non-tax), Capital Receipts (Disinvestment + Recoveries), Total Expenditure, and Interest Payments.',
    'Compute: Revenue Deficit = Rev Exp − Rev Receipts.',
    'Compute: Fiscal Deficit = Total Exp − (Rev Receipts + Non-debt Cap Receipts).',
    'Compute: Primary Deficit = Fiscal Deficit − Interest Payments.',
    'Write a 3-sentence evaluation of whether borrowing is funding consumption or productive capital formation.',
  ],
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM 1: TAX INCIDENCE & SHIFTING ───
function TaxIncidenceSvgDiagram({ stage }: { stage: number }) {
  return (
    <svg viewBox="0 0 600 160" className="w-full h-auto bg-slate-950/80 rounded-2xl border border-slate-800 p-2">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#6366f1" />
        </marker>
        <marker id="arrowhead-red" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#f43f5e" />
        </marker>
      </defs>

      {/* Nodes: Mfr, Wholesaler, Retailer, Consumer */}
      {[
        { label: 'Manufacturer', sub: 'Impact Point', x: 75, y: 55, color: '#38bdf8' },
        { label: 'Wholesaler', sub: 'Pass-through', x: 225, y: 55, color: '#818cf8' },
        { label: 'Retailer', sub: 'Tax Collector', x: 375, y: 55, color: '#c084fc' },
        { label: 'Consumer', sub: 'Incidence Point', x: 525, y: 55, color: '#f43f5e' },
      ].map((node, i) => {
        const isActive = stage === i;
        return (
          <g key={i}>
            <rect
              x={node.x - 60}
              y={node.y - 30}
              width={120}
              height={60}
              rx={10}
              fill={isActive ? '#1e1b4b' : '#0f172a'}
              stroke={isActive ? node.color : '#334155'}
              strokeWidth={isActive ? 2.5 : 1}
            />
            <text x={node.x} y={node.y - 6} fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
              {node.label}
            </text>
            <text x={node.x} y={node.y + 14} fill={node.color} fontSize="9.5" textAnchor="middle">
              {node.sub}
            </text>
          </g>
        );
      })}

      {/* Forward Shifting Arrows */}
      {[
        { from: 135, to: 165 },
        { from: 285, to: 315 },
        { from: 435, to: 465 },
      ].map((arr, i) => (
        <line
          key={i}
          x1={arr.from}
          y1={55}
          x2={arr.to}
          y2={55}
          stroke="#6366f1"
          strokeWidth="2.5"
          markerEnd="url(#arrowhead)"
        />
      ))}

      {/* Tax Burden Shifting Labels */}
      <text x="300" y="125" fill="#94a3b8" fontSize="11" textAnchor="middle">
        ⇄ Legal Impact (Point of Levy) vs Forward Shifting of GST into Final Retail Price (Incidence) ⇄
      </text>
      <rect x="40" y="140" width="10" height="10" rx="2" fill="#38bdf8" />
      <text x="55" y="149" fill="#94a3b8" fontSize="10">Impact (Legal Payer)</text>
      <rect x="440" y="140" width="10" height="10" rx="2" fill="#f43f5e" />
      <text x="455" y="149" fill="#f43f5e" fontSize="10" fontWeight="bold">Ultimate Economic Incidence</text>
    </svg>
  );
}

// ─── TOPIC-SPECIFIC SVG DIAGRAM 2: DEFICIT TAXONOMY & FOUR-QUADRANT BUDGET ───
function BudgetQuadrantSvgDiagram({ revDef, fiscDef, primDef }: { revDef: number; fiscDef: number; primDef: number }) {
  return (
    <svg viewBox="0 0 600 210" className="w-full h-auto bg-slate-950/80 rounded-2xl border border-slate-800 p-2">
      {/* Revenue Account Box */}
      <rect x="20" y="20" width="265" height="110" rx="10" fill="#064e3b" fillOpacity="0.25" stroke="#10b981" strokeWidth="1.5" />
      <text x="30" y="40" fill="#34d399" fontSize="12" fontWeight="bold">REVENUE ACCOUNT (Current Consumption)</text>
      <text x="30" y="62" fill="#e2e8f0" fontSize="10.5">✓ Revenue Receipts: Taxes + Non-tax (Dividends)</text>
      <text x="30" y="80" fill="#fca5a5" fontSize="10.5">✗ Revenue Exp: Salaries, Pensions, Subsidies, Interest</text>
      <rect x="30" y="92" width="245" height="26" rx="6" fill="#881337" fillOpacity="0.5" stroke="#f43f5e" />
      <text x="40" y="109" fill="#fecdd3" fontSize="11" fontWeight="bold">
        Revenue Deficit: ₹{revDef.toFixed(2)}L cr (Borrowing for Consumption)
      </text>

      {/* Capital Account Box */}
      <rect x="315" y="20" width="265" height="110" rx="10" fill="#1e1b4b" fillOpacity="0.35" stroke="#818cf8" strokeWidth="1.5" />
      <text x="325" y="40" fill="#a5b4fc" fontSize="12" fontWeight="bold">CAPITAL ACCOUNT (Asset & Liability)</text>
      <text x="325" y="62" fill="#e2e8f0" fontSize="10.5">✓ Non-Debt Capital Receipts: Disinvestment, Loans</text>
      <text x="325" y="80" fill="#c4b5fd" fontSize="10.5">✓ Capital Capex: Highways, High-Speed Rail, Defence</text>
      <rect x="325" y="92" width="245" height="26" rx="6" fill="#312e81" fillOpacity="0.5" stroke="#a78bfa" />
      <text x="335" y="109" fill="#e0e7ff" fontSize="11" fontWeight="bold">
        Capex Creates Productive National Wealth
      </text>

      {/* Summary Deficit Banner */}
      <rect x="20" y="145" width="560" height="50" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="1" />
      <text x="35" y="166" fill="#fbbf24" fontSize="12" fontWeight="bold">
        Fiscal Deficit = ₹{fiscDef.toFixed(2)}L cr (Total Net Borrowing Gap)
      </text>
      <text x="35" y="184" fill="#38bdf8" fontSize="11">
        Primary Deficit = Fiscal Deficit − Interest = ₹{primDef.toFixed(2)}L cr (Current Year Policy Stance)
      </text>
    </svg>
  );
}

// ─── TOPIC-SPECIFIC SVG DIAGRAM 3: 2-SECTOR CIRCULAR FLOW ───
function CircularFlowSvgDiagram({ flowMode }: { flowMode: string }) {
  return (
    <svg viewBox="0 0 600 200" className="w-full h-auto bg-slate-950/80 rounded-2xl border border-slate-800 p-2">
      <defs>
        <marker id="circ-arrow-blue" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#38bdf8" />
        </marker>
        <marker id="circ-arrow-yellow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#fbbf24" />
        </marker>
        <marker id="circ-arrow-green" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#34d399" />
        </marker>
      </defs>

      {/* Household Node */}
      <rect x="30" y="60" width="130" height="80" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
      <text x="95" y="95" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">HOUSEHOLDS</text>
      <text x="95" y="115" fill="#94a3b8" fontSize="10" textAnchor="middle">Owners of Factors</text>

      {/* Firms Node */}
      <rect x="440" y="60" width="130" height="80" rx="12" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
      <text x="505" y="95" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">FIRMS</text>
      <text x="505" y="115" fill="#94a3b8" fontSize="10" textAnchor="middle">Producers of Goods</text>

      {/* Upper Path: Factor Services (Real) vs Factor Income (Money) */}
      {(flowMode === 'both' || flowMode === 'real') && (
        <path
          d="M 120 60 Q 300 10 480 60"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          markerEnd="url(#circ-arrow-blue)"
        />
      )}
      {(flowMode === 'both' || flowMode === 'money') && (
        <path
          d="M 480 75 Q 300 35 120 75"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2.5"
          markerEnd="url(#circ-arrow-yellow)"
        />
      )}
      <text x="300" y="28" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">
        Outer Real Flow: Factor Services (Land, Labour, Capital) →
      </text>
      <text x="300" y="46" fill="#fbbf24" fontSize="10.5" fontWeight="bold" textAnchor="middle">
        ← Inner Money Flow: Factor Payments (Rent, Wages, Interest, Profit)
      </text>

      {/* Lower Path: Goods & Services (Real) vs Consumption Expenditure (Money) */}
      {(flowMode === 'both' || flowMode === 'money') && (
        <path
          d="M 120 125 Q 300 165 480 125"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2.5"
          markerEnd="url(#circ-arrow-yellow)"
        />
      )}
      {(flowMode === 'both' || flowMode === 'real') && (
        <path
          d="M 480 140 Q 300 190 120 140"
          fill="none"
          stroke="#34d399"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          markerEnd="url(#circ-arrow-green)"
        />
      )}
      <text x="300" y="160" fill="#fbbf24" fontSize="10.5" fontWeight="bold" textAnchor="middle">
        Inner Money Flow: Consumption Expenditure (₹) →
      </text>
      <text x="300" y="182" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
        ← Outer Real Flow: Final Output & Consumer Goods
      </text>
    </svg>
  );
}

function C12_EconomicsPublicRevenueMeaningSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['economics'] || { name: 'Economics', emoji: '📈', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant pattern state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab State
  // Lab 1: Tax Curves
  const [taxMode, setTaxMode] = useState<'progressive' | 'proportional' | 'regressive'>('progressive');
  const [incomeSlider, setIncomeSlider] = useState<number>(15); // in Lakhs
  // Lab 2: Tax Shifting
  const [shiftStage, setShiftStage] = useState<number>(2); // 0: Mfr, 1: Wholesaler, 2: Retailer, 3: Consumer
  const [elasticity, setElasticity] = useState<'inelastic' | 'elastic'>('inelastic');
  // Lab 3: Budget Quadrant
  const [taxRev, setTaxRev] = useState<number>(26.0); // Lakh crore
  const [nonTaxRev, setNonTaxRev] = useState<number>(4.8);
  const [borrowing, setBorrowing] = useState<number>(16.1);
  const [nonDebtCap, setNonDebtCap] = useState<number>(0.9);
  const [revExp, setRevExp] = useState<number>(36.7);
  const [capExp, setCapExp] = useState<number>(11.1);
  const [interestBill, setInterestBill] = useState<number>(11.9);
  // Lab 5: Circular flow toggle
  const [flowType, setFlowType] = useState<'real' | 'money' | 'both'>('both');
  const [flowSpeed, setFlowSpeed] = useState<number>(1);
  const [householdSaving, setHouseholdSaving] = useState<number>(0);

  // Reflection State
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Challenge & Mastery State
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
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort State
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

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C12_ECON_071);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT adaptive effect
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Live Calculated Deficits for Simulation
  const simulatedRevenueDeficit = useMemo(() => {
    return Math.max(0, revExp - (taxRev + nonTaxRev));
  }, [revExp, taxRev, nonTaxRev]);

  const simulatedFiscalDeficit = useMemo(() => {
    const totalExp = revExp + capExp;
    const nonBorrowingReceipts = taxRev + nonTaxRev + nonDebtCap;
    return Math.max(0, totalExp - nonBorrowingReceipts);
  }, [revExp, capExp, taxRev, nonTaxRev, nonDebtCap]);

  const simulatedPrimaryDeficit = useMemo(() => {
    return Math.max(0, simulatedFiscalDeficit - interestBill);
  }, [simulatedFiscalDeficit, interestBill]);

  // Live Tax Chart Data
  const taxChartData = useMemo(() => {
    const incomes = [3, 6, 10, 15, 25, 50, 100];
    return incomes.map(inc => {
      let progressiveRate = 0;
      if (inc <= 3) progressiveRate = 0;
      else if (inc <= 7) progressiveRate = ((inc - 3) * 0.05) / inc * 100;
      else if (inc <= 10) progressiveRate = (0.2 + (inc - 7) * 0.2) / inc * 100;
      else progressiveRate = (0.8 + (inc - 10) * 0.3) / inc * 100;

      const proportionalRate = 18; // Flat 18% GST style
      const regressiveRate = Math.max(2, 40 / Math.sqrt(inc)); // Salt tax burden curve

      return {
        income: `₹${inc}L`,
        Progressive: parseFloat(progressiveRate.toFixed(1)),
        Proportional: proportionalRate,
        Regressive: parseFloat(regressiveRate.toFixed(1)),
      };
    });
  }, []);

  // Budget Breakdown Data for Recharts
  const budgetQuadrantData = useMemo(() => {
    return [
      { name: 'Rev Receipts', amount: taxRev + nonTaxRev, fill: '#10b981' },
      { name: 'Cap Receipts', amount: borrowing + nonDebtCap, fill: '#06b6d4' },
      { name: 'Rev Exp', amount: revExp, fill: '#f43f5e' },
      { name: 'Cap Exp (Capex)', amount: capExp, fill: '#8b5cf6' },
    ];
  }, [taxRev, nonTaxRev, borrowing, nonDebtCap, revExp, capExp]);

  // ─── 2D Canvas Circular Flow Particle Animation ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: { t: number; speed: number; type: 'real' | 'money'; loop: 'top' | 'bottom' }[] = [];

    for (let i = 0; i < 24; i++) {
      particles.push({
        t: Math.random(),
        speed: 0.003 * flowSpeed,
        type: i % 2 === 0 ? 'real' : 'money',
        loop: i < 12 ? 'top' : 'bottom',
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw Sector Nodes
      // Households (Left)
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(40, h / 2 - 40, 100, 80, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('HOUSEHOLDS', 90, h / 2 - 10);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Factor Owners', 90, h / 2 + 10);
      ctx.fillText('& Consumers', 90, h / 2 + 25);

      // Firms (Right)
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#a855f7';
      ctx.beginPath();
      ctx.roundRect(w - 140, h / 2 - 40, 100, 80, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('FIRMS', w - 90, h / 2 - 10);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Producers', w - 90, h / 2 + 10);
      ctx.fillText('& Employers', w - 90, h / 2 + 25);

      // Draw Market Center Hubs
      // Factor Market (Top)
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#f59e0b';
      ctx.beginPath();
      ctx.roundRect(w / 2 - 70, 20, 140, 36, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('FACTOR MARKET', w / 2, 42);

      // Product Market (Bottom)
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      ctx.roundRect(w / 2 - 70, h - 56, 140, 36, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#34d399';
      ctx.fillText('PRODUCT MARKET', w / 2, h - 34);

      // Animate flowing particles
      particles.forEach(p => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;

        let x = 0;
        let y = 0;

        if (p.loop === 'top') {
          // Factor Loop
          if (p.type === 'real') {
            x = 90 + p.t * (w - 180);
            y = h / 2 - 40 - Math.sin(p.t * Math.PI) * 50;
            ctx.fillStyle = '#38bdf8';
          } else {
            x = w - 90 - p.t * (w - 180);
            y = h / 2 - 20 - Math.sin(p.t * Math.PI) * 30;
            ctx.fillStyle = '#fbbf24';
          }
        } else {
          // Product Loop
          if (p.type === 'money') {
            x = 90 + p.t * (w - 180);
            y = h / 2 + 20 + Math.sin(p.t * Math.PI) * 30;
            ctx.fillStyle = '#fbbf24';
          } else {
            x = w - 90 - p.t * (w - 180);
            y = h / 2 + 40 + Math.sin(p.t * Math.PI) * 50;
            ctx.fillStyle = '#34d399';
          }
        }

        const shouldDraw =
          flowType === 'both' ||
          (flowType === 'real' && p.type === 'real') ||
          (flowType === 'money' && p.type === 'money');

        if (shouldDraw) {
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [flowType, flowSpeed]);

  // ─── CALLBACK HANDLERS ───
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
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb economic insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Public Finance Labs. Interact with each simulation.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode activated. Test any budget configuration.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Now test your knowledge against real-world economic challenges!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the lab slider to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation!' : 'Look closely at the data chart curve.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered Indian Public Finance and Budgetary Economics.');
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
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
          speechManager.speak('Let us review the complete economic solution together.');
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
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

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

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement(prev => {
        let arr = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300">
              {title}
            </h1>
            <p className="text-xs text-slate-400">Class 12 ISC Commerce • Public Finance & Budget Master</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400 uppercase tracking-widest block font-semibold">Mastery Engine</span>
            <span className="text-sm font-bold text-emerald-400 capitalize">{masteryLevel}</span>
          </div>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 text-emerald-300 border-emerald-600/50'
                : difficulty === 'advanced'
                ? 'bg-rose-950/70 text-rose-300 border-rose-600/50'
                : 'bg-sky-950/70 text-sky-300 border-sky-600/50'
            }`}
          >
            {difficulty} Tier
          </motion.span>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700/50 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-wider text-xs mb-2">
              <span>🏛️</span> North Block Mission Briefing
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-400">
              ⚡ <strong>Your Goal:</strong> Master public revenues, direct vs indirect tax incidence, debt switch operations, capex multipliers, and the 2-sector circular flow.
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-bold uppercase">
                Curiosity Hook
              </span>
              <span className="text-xs text-slate-400">No grades — just test your economic intuition!</span>
            </div>
            <p className="text-base md:text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-2xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-950/50 border-slate-800 text-slate-500'
                      : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-indigo-500 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                <div
                  className={`p-4 rounded-2xl text-sm border ${
                    discoveryCorrect
                      ? 'bg-emerald-950/50 border-emerald-600/50 text-emerald-300'
                      : 'bg-amber-950/50 border-amber-600/50 text-amber-300'
                  }`}
                >
                  {discoveryCorrect
                    ? '✨ Brilliant! Capital spending builds productive GDP capacity that pays for itself, whereas revenue spending sustains current consumption.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white rounded-2xl font-black text-base shadow-lg shadow-indigo-600/30"
                >
                  Enter Interactive Simulation Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-indigo-400' : 'w-2 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-300 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: Tax Progressivity Lab */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {(['progressive', 'proportional', 'regressive'] as const).map(mode => (
                      <motion.button
                        key={mode}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setTaxMode(mode);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                          taxMode === mode
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {mode} Structure
                      </motion.button>
                    ))}
                  </div>

                  <div className="h-64 w-full bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={taxChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="income" stroke="#64748b" />
                        <YAxis unit="%" stroke="#64748b" domain={[0, 40]} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="Progressive"
                          stroke="#10b981"
                          strokeWidth={taxMode === 'progressive' ? 4 : 1.5}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Proportional"
                          stroke="#38bdf8"
                          strokeWidth={taxMode === 'proportional' ? 4 : 1.5}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Regressive"
                          stroke="#f43f5e"
                          strokeWidth={taxMode === 'regressive' ? 4 : 1.5}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Test Citizen Annual Income: <strong>₹{incomeSlider} Lakh</strong></span>
                      <span className="text-indigo-400 font-bold">
                        Average Tax Rate:{' '}
                        {taxMode === 'progressive'
                          ? incomeSlider <= 3
                            ? '0%'
                            : incomeSlider <= 7
                            ? `${(((incomeSlider - 3) * 0.05) / incomeSlider * 100).toFixed(1)}%`
                            : `${((0.8 + (incomeSlider - 10) * 0.3) / incomeSlider * 100).toFixed(1)}%`
                          : taxMode === 'proportional'
                          ? '18.0%'
                          : `${(40 / Math.sqrt(incomeSlider)).toFixed(1)}%`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={50}
                      value={incomeSlider}
                      aria-label="Set Annual Income in Lakhs"
                      onChange={e => {
                        setIncomeSlider(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  {/* Observation Question */}
                  <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-800/50 space-y-3">
                    <p className="text-sm font-bold text-indigo-200">🔍 {OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="space-y-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className={`w-full text-left p-3 rounded-xl text-xs transition-all border ${
                            observationAnswered && i === OBSERVATION_QUESTIONS[0].correctIndex
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: Direct vs Indirect Tax Shifting */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* SVG DIAGRAM 1 */}
                  <TaxIncidenceSvgDiagram stage={shiftStage} />

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-slate-400">Supply Chain Stage:</span>
                      <span className="px-3 py-1 bg-indigo-950 text-indigo-300 rounded-full text-xs font-bold border border-indigo-700">
                        {shiftStage === 0
                          ? '1. Manufacturer (Hindustan Unilever)'
                          : shiftStage === 1
                          ? '2. Wholesaler / Distributor'
                          : shiftStage === 2
                          ? '3. Kirana Retailer (Shopkeeper)'
                          : '4. End Consumer (You)'}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={3}
                      step={1}
                      value={shiftStage}
                      aria-label="Set Supply Chain Stage"
                      onChange={e => {
                        setShiftStage(Number(e.target.value));
                        audioManager.play('pop');
                      }}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-500 uppercase font-bold block">Legal Impact</span>
                        <span className="text-sm font-bold text-sky-400">
                          {shiftStage === 0 ? 'Manufacturer Pays GST' : 'Seller Collects & Remits'}
                        </span>
                        <p className="text-xs text-slate-400 mt-1">Person on whom the tax is legally imposed by law.</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-500 uppercase font-bold block">Economic Incidence</span>
                        <span className="text-sm font-bold text-rose-400">
                          {shiftStage === 3 ? 'Consumer Bears Full Burden' : 'Shifted Forward in Price'}
                        </span>
                        <p className="text-xs text-slate-400 mt-1">Person whose wallet actually bears the ultimate tax cost.</p>
                      </div>
                    </div>
                  </div>

                  {/* Predict-Then-Check */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-amber-400 uppercase">Predict Before Checking</span>
                    <p className="text-sm font-bold text-white">{PREDICTION_QUESTIONS[1].question}</p>
                    <div className="space-y-2">
                      {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          className={`w-full text-left p-3 rounded-xl text-xs transition-all border ${
                            predictionMade && i === PREDICTION_QUESTIONS[1].correctIndex
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-300'
                          }`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: 4-Quadrant Budget Builder */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {/* SVG DIAGRAM 2 */}
                  <BudgetQuadrantSvgDiagram
                    revDef={simulatedRevenueDeficit}
                    fiscDef={simulatedFiscalDeficit}
                    primDef={simulatedPrimaryDeficit}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Receipts Quadrants */}
                    <div className="p-4 bg-emerald-950/30 rounded-2xl border border-emerald-800/50 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-emerald-300">Revenue Receipts (₹{ (taxRev + nonTaxRev).toFixed(1) }L cr)</h4>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700">
                          No Liability / No Asset Loss
                        </span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Tax Revenue (Income Tax + GST + Corp): ₹{taxRev}L cr</span>
                        </div>
                        <input
                          type="range"
                          min={15}
                          max={35}
                          step={0.5}
                          value={taxRev}
                          aria-label="Set Tax Revenue"
                          onChange={e => setTaxRev(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                        <div className="flex justify-between">
                          <span>Non-Tax Revenue (RBI Dividend + PSU profits): ₹{nonTaxRev}L cr</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={8}
                          step={0.2}
                          value={nonTaxRev}
                          aria-label="Set Non-Tax Revenue"
                          onChange={e => setNonTaxRev(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Capital Receipts */}
                    <div className="p-4 bg-sky-950/30 rounded-2xl border border-sky-800/50 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-sky-300">Capital Receipts (₹{ (borrowing + nonDebtCap).toFixed(1) }L cr)</h4>
                        <span className="text-[10px] text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-700">
                          Creates Liability / Reduces Asset
                        </span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Market Borrowings (Debt-Creating): ₹{borrowing}L cr</span>
                        </div>
                        <input
                          type="range"
                          min={8}
                          max={22}
                          step={0.5}
                          value={borrowing}
                          aria-label="Set Market Borrowings"
                          onChange={e => setBorrowing(Number(e.target.value))}
                          className="w-full accent-sky-500"
                        />
                        <div className="flex justify-between">
                          <span>Disinvestment & Loan Recoveries (Non-Debt): ₹{nonDebtCap}L cr</span>
                        </div>
                        <input
                          type="range"
                          min={0.2}
                          max={3}
                          step={0.1}
                          value={nonDebtCap}
                          aria-label="Set Disinvestment"
                          onChange={e => setNonDebtCap(Number(e.target.value))}
                          className="w-full accent-sky-500"
                        />
                      </div>
                    </div>

                    {/* Revenue Expenditure */}
                    <div className="p-4 bg-rose-950/30 rounded-2xl border border-rose-800/50 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-rose-300">Revenue Expenditure (₹{revExp}L cr)</h4>
                        <span className="text-[10px] text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-700">
                          Consumption / No Asset Created
                        </span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Salaries + Pensions + Subsidies: ₹{revExp}L cr</span>
                        </div>
                        <input
                          type="range"
                          min={20}
                          max={45}
                          step={0.5}
                          value={revExp}
                          aria-label="Set Revenue Expenditure"
                          onChange={e => setRevExp(Number(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                      </div>
                    </div>

                    {/* Capital Expenditure */}
                    <div className="p-4 bg-purple-950/30 rounded-2xl border border-purple-800/50 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-purple-300">Capital Expenditure (₹{capExp}L cr)</h4>
                        <span className="text-[10px] text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-700">
                          Creates Assets / Reduces Debt
                        </span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Railways + Highways + Defence Capex: ₹{capExp}L cr</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={20}
                          step={0.5}
                          value={capExp}
                          aria-label="Set Capital Expenditure"
                          onChange={e => setCapExp(Number(e.target.value))}
                          className="w-full accent-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="h-44 w-full bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={budgetQuadrantData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis type="number" unit="L cr" stroke="#64748b" />
                        <YAxis type="category" dataKey="name" stroke="#64748b" width={110} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                        <Bar dataKey="amount" radius={[0, 8, 8, 0]}>
                          {budgetQuadrantData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* SLIDE 3: The Deficit Diagnostic Ladder */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  {/* Predict Before Checking */}
                  {!predictionMade && (
                    <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800/50 space-y-2">
                      <span className="text-xs font-bold text-amber-300 uppercase">Predict-Then-Check</span>
                      <p className="text-sm font-bold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2.5 bg-slate-950 rounded-xl text-xs text-slate-300 hover:border-amber-500 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Diagnostic Gauges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-rose-900/50 text-center">
                      <span className="text-xs text-slate-400 font-bold block">1. Revenue Deficit</span>
                      <span className="text-2xl font-black text-rose-400 mt-1 block">
                        ₹{simulatedRevenueDeficit.toFixed(2)}L cr
                      </span>
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        Borrowing for Consumption (FRBM Target: 0)
                      </span>
                    </div>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-amber-900/50 text-center">
                      <span className="text-xs text-slate-400 font-bold block">2. Fiscal Deficit</span>
                      <span className="text-2xl font-black text-amber-400 mt-1 block">
                        ₹{simulatedFiscalDeficit.toFixed(2)}L cr
                      </span>
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        Total Borrowing Requirement (Target: 3% GDP)
                      </span>
                    </div>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-sky-900/50 text-center">
                      <span className="text-xs text-slate-400 font-bold block">3. Primary Deficit</span>
                      <span className="text-2xl font-black text-sky-400 mt-1 block">
                        ₹{simulatedPrimaryDeficit.toFixed(2)}L cr
                      </span>
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        Deficit excluding ₹{interestBill}L cr Legacy Interest
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Adjust Annual Interest Liability: <strong>₹{interestBill}L crore</strong></span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={18}
                      step={0.5}
                      value={interestBill}
                      aria-label="Set Annual Interest Liability"
                      onChange={e => setInterestBill(Number(e.target.value))}
                      className="w-full accent-sky-500"
                    />
                  </div>
                </div>
              )}

              {/* SLIDE 4: 2-Sector Circular Flow Engine */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  {/* SVG DIAGRAM 3 */}
                  <CircularFlowSvgDiagram flowMode={flowType} />

                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div className="flex gap-2">
                      {(['both', 'real', 'money'] as const).map(type => (
                        <button
                          key={type}
                          onClick={() => {
                            setFlowType(type);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize border ${
                            flowType === type
                              ? 'bg-indigo-600 border-indigo-400 text-white'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {type} Flows
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Flow Speed:</span>
                      <input
                        type="range"
                        min={0.5}
                        max={3}
                        step={0.5}
                        value={flowSpeed}
                        aria-label="Set Flow Speed"
                        onChange={e => setFlowSpeed(Number(e.target.value))}
                        className="w-24 accent-indigo-500"
                      />
                    </div>
                  </div>

                  {/* HTML5 Canvas Animation */}
                  <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex justify-center p-2">
                    <canvas ref={canvasRef} width={580} height={260} className="w-full max-w-xl h-auto" />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-sky-400 font-bold block">Outer Real Flow (Physical)</span>
                      <p className="text-slate-400 mt-0.5">Factor inputs (Labour, Land) & finished commodities circulating clockwise.</p>
                    </div>
                    <div>
                      <span className="text-amber-400 font-bold block">Inner Money Flow (Financial)</span>
                      <p className="text-slate-400 mt-0.5">Factor rewards (Wages, Rent) & Consumer spending running counter-clockwise.</p>
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
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold border border-slate-800 disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-bold text-slate-500">Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Open Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-indigo-300">Sandbox: Fiscal Simulator Engine</h3>
                <p className="text-xs text-slate-400 mt-1">Free exploration mode. Tweak revenue, capex, and debt variables without test pressure.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-emerald-600/30"
              >
                Ready for Graded Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400">Total Revenue Receipts</span>
                <span className="text-xl font-bold text-emerald-400 block">₹{(taxRev + nonTaxRev).toFixed(1)}L cr</span>
                <input
                  type="range"
                  min={20}
                  max={45}
                  value={taxRev}
                  aria-label="Set Revenue Receipts in Sandbox"
                  onChange={e => setTaxRev(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400">Total Capital Outlay (Capex)</span>
                <span className="text-xl font-bold text-purple-400 block">₹{capExp.toFixed(1)}L cr</span>
                <input
                  type="range"
                  min={5}
                  max={25}
                  value={capExp}
                  aria-label="Set Capital Outlay in Sandbox"
                  onChange={e => setCapExp(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400">Revenue Expenditure (Salaries/Pensions)</span>
                <span className="text-xl font-bold text-rose-400 block">₹{revExp.toFixed(1)}L cr</span>
                <input
                  type="range"
                  min={25}
                  max={50}
                  value={revExp}
                  aria-label="Set Revenue Expenditure in Sandbox"
                  onChange={e => setRevExp(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>
            </div>

            {/* Live Visual Indicators */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-xs text-slate-500 font-bold">Calculated Revenue Deficit</span>
                <span className="text-lg font-black text-rose-400 block">₹{simulatedRevenueDeficit.toFixed(2)}L cr</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-bold">Calculated Fiscal Deficit</span>
                <span className="text-lg font-black text-amber-400 block">₹{simulatedFiscalDeficit.toFixed(2)}L cr</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-bold">Calculated Primary Deficit</span>
                <span className="text-lg font-black text-sky-400 block">₹{simulatedPrimaryDeficit.toFixed(2)}L cr</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: GRADED CHALLENGES (Adaptive BKT Engine) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          {/* Progress & Tier Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="px-2.5 py-0.5 bg-indigo-950 text-indigo-300 rounded-full font-bold border border-indigo-700/50 uppercase text-[10px]">
                NEP 2020: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
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
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">
                Target Node: {challenge.nodeId}
              </span>
            </div>

            <p className="text-base md:text-lg font-bold text-white mb-6 leading-relaxed">{challenge.question}</p>

            {/* MCQ Type */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Answer Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-4 rounded-2xl text-sm transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-indigo-500 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 w-full mb-1">Drag each term into its matching slot:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-xl cursor-grab text-white text-xs font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] text-center transition-all ${
                        droppedLabels[item.targetId]
                          ? 'border-emerald-500 bg-emerald-950/30'
                          : 'border-slate-700 bg-slate-950/50'
                      }`}
                    >
                      <span className="text-xs text-slate-500 font-bold mb-1">
                        Target Slot: {item.targetId.replace('box_', '').replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-sm font-bold text-emerald-300">
                        {droppedLabels[item.targetId] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Verify Matched Labels
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400">Drag to arrange in correct order:</span>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                      {displayIndex + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label="Enter numeric calculation"
                    onChange={e => setNumericInput(e.target.value)}
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono text-base w-48 focus:border-indigo-500 focus:outline-none"
                    placeholder="Enter value"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-xs shadow-lg shadow-indigo-600/30"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-950 border border-indigo-700/50 hover:bg-indigo-950 text-indigo-300 rounded-xl text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[70px] p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-indigo-900/80 border border-indigo-600 rounded-lg text-white font-mono text-xs flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click formula blocks above to build the equation...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Validate Formula Construction
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                  <span>💡</span> Step-by-Step Solution Breakdown:
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-amber-100 text-xs leading-relaxed"
                    >
                      <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Mission →' : 'Next Challenge →'}
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
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 rounded-3xl border border-emerald-600/50 text-center space-y-3">
            <span className="text-4xl block">🏆</span>
            <h2 className="text-2xl font-black text-white">Public Finance Mastery Certified!</h2>
            <p className="text-sm text-slate-300">
              You scored <strong>{Math.max(0, 100 - errors * 5)}%</strong> across Union Budget analysis, tax progressivity, and macroeconomic circular flow models.
            </p>
          </div>

          {/* ─── SPACED REPETITION VISIBILITY CARD (SRS ENGINE) ─── */}
          <div className="p-6 bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-900 rounded-3xl border-2 border-indigo-500/60 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <span className="text-xs font-black uppercase tracking-widest text-indigo-300">
                  Spaced Repetition Schedule (SM-2 SRS)
                </span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                errors === 0
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                  : errors <= 3
                  ? 'bg-amber-950 text-amber-300 border-amber-500'
                  : 'bg-rose-950 text-rose-300 border-rose-500'
              }`}>
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              Targeted retention interval:{' '}
              <strong className="text-amber-300 underline decoration-amber-500 underline-offset-4">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </strong>
              . Based on your mistake profile ({errors} {errors === 1 ? 'error' : 'errors'}), our adaptive memory algorithm has scheduled your next active recall session to lock in 95%+ retention for your ISC exams.
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className={`p-2.5 rounded-xl border ${errors === 0 ? 'bg-emerald-900/40 border-emerald-500 text-emerald-200' : 'bg-slate-950/60 border-slate-800 text-slate-500'}`}>
                <span className="font-bold block text-sm">0 Errors</span>
                <span>Review in 7 days</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${errors >= 1 && errors <= 3 ? 'bg-amber-900/40 border-amber-500 text-amber-200' : 'bg-slate-950/60 border-slate-800 text-slate-500'}`}>
                <span className="font-bold block text-sm">1–3 Errors</span>
                <span>Review in 3 days</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${errors >= 4 ? 'bg-rose-900/40 border-rose-500 text-rose-200' : 'bg-slate-950/60 border-slate-800 text-slate-500'}`}>
                <span className="font-bold block text-sm">4+ Errors</span>
                <span>Review in 1 day</span>
              </div>
            </div>
          </div>

          {/* Motivational Performance Feedback */}
          <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800">
            <h3 className="text-sm font-bold text-indigo-300 mb-1">Chief Economic Advisor Feedback</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {errors === 0
                ? 'Outstanding performance! You solved every revenue, debt, and deficit problem without error. You possess top-tier mastery for the ISC Board Examinations.'
                : errors <= 3
                ? 'Great analytical capability! You demonstrated strong comprehension of the FRBM Act and direct vs indirect tax mechanisms. Review the minor slips below.'
                : 'Good effort! Economics requires connecting accounting identities with real-world institutional policy. Review the identified misconception cards below and replay the labs.'}
            </p>
          </div>

          {/* ─── MANDATORY REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-indigo-800/60 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <span>🧠</span> Metacognitive Reflection
            </div>
            <h3 className="text-base font-black text-white">Consolidate Your Learning</h3>
            <p className="text-xs text-slate-300">Take a moment to reflect on key economic takeaways:</p>

            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-indigo-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflection1}
                  onChange={e => setReflection1(e.target.value)}
                  placeholder="e.g. How interest payments cannot create productive assets, or how 95% of India's debt is internal..."
                  rows={2}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-sky-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflection2}
                  onChange={e => setReflection2(e.target.value)}
                  placeholder="e.g. The difference between legal impact on a shopkeeper and incidence on the shopper..."
                  rows={2}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-emerald-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflection3}
                  onChange={e => setReflection3(e.target.value)}
                  placeholder="e.g. Analyzing the annual Union Budget news, evaluating GST bills, understanding sovereign bonds..."
                  rows={2}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setReflectionSaved(true);
                  audioManager.play('success');
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow"
              >
                {reflectionSaved ? '✓ Reflections Saved' : 'Save Reflection Answers'}
              </motion.button>
            </div>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-3xl border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Targeted Review: Misconceptions Encountered</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">❌ {m.misconception}</p>
                    <p className="text-emerald-300 font-medium">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <span>📊</span> Practical Case Study
            </div>
            <h3 className="text-lg font-black text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-indigo-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION ENGINE NOTIFIERS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Fiscal Milestone Reached!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C12_EconomicsPublicRevenueMeaningSim };
export default C12_EconomicsPublicRevenueMeaningSim;
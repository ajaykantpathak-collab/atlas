'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── STRING LITERAL NODE DECLARATIONS (10 Mandatory Nodes) ───
const NODE_C10_ECON_021 = 'c10_econ_021'; // Perfect Competition & Firm Demand
const NODE_C10_ECON_022 = 'c10_econ_022'; // Monopoly & Price Maker Equilibrium
const NODE_C10_ECON_023 = 'c10_econ_023'; // Monopolistic Competition & Oligopoly
const NODE_C10_ECON_024 = 'c10_econ_024'; // Evolution of Money & Barter Inconveniences
const NODE_C10_ECON_025 = 'c10_econ_025'; // Commercial Bank Functions & Deposit Accounts
const NODE_C10_ECON_026 = 'c10_econ_026'; // Central Bank Functions & Sovereign Currency Issue
const NODE_C10_ECON_027 = 'c10_econ_027'; // Qualitative Credit Controls (Margin, Rationing, Moral Suasion)
const NODE_C10_ECON_028 = 'c10_econ_028'; // Quantitative Credit Controls (CRR, SLR, Repo, Bank Rate, OMO)
const NODE_C10_ECON_029 = 'c10_econ_029'; // Demonetisation 2016 & Digital Currency (e₹)
const NODE_C10_ECON_030 = 'c10_econ_030'; // Public Finance: GST, ITC, Direct vs Indirect Taxes

const ALL_NODE_IDS = [
  NODE_C10_ECON_021,
  NODE_C10_ECON_022,
  NODE_C10_ECON_023,
  NODE_C10_ECON_024,
  NODE_C10_ECON_025,
  NODE_C10_ECON_026,
  NODE_C10_ECON_027,
  NODE_C10_ECON_028,
  NODE_C10_ECON_029,
  NODE_C10_ECON_030,
];

// ─── NARRATIVE & CONTEXTUAL SCENARIOS ───
const SCENARIO = {
  title: 'The Great Indian Economic Transition',
  intro: 'You are the Principal Economic Advisor to the Ministry of Finance & RBI Liaison Committee. From agricultural mandis in Punjab to the financial towers of Mumbai, your mission is to maintain market stability, calibrate monetary levers, manage banking credit reserves, and optimize fiscal tax structures.',
  context: 'Balance commercial bank credit creation, enforce CRR/SLR liquidity buffers, observe repo rate transmission to household EMIs, explore GST value additions, and understand how competitive and monopolistic market forces shape prices across India.',
};

// ─── DISCOVERY INTUITION HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Farmer Harjit Singh brings 40 quintals of standard-grade Sharbati wheat to the Khanna Mandi (MSP ₹2,015/quintal). If he demands ₹2,100 per quintal, what will happen in the market?',
  options: [
    'Buyers will eagerly pay more due to prestige branding value',
    'He will sell zero quintals because identical wheat is available from neighbouring farmers at ₹2,015',
    'The mandi market committee will immediately raise the minimum support price for all sellers',
    'He automatically establishes an agricultural monopoly cartel'
  ],
  correctIndex: 1,
  hintAfter: 'Under Perfect Competition, products are strictly homogeneous and individual sellers are price takers facing a horizontal demand curve (P = AR = MR)!',
};

// ─── CHALLENGE INTERFACE DEFINITION ───
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

// ─── 22 PROGRESSIVE CHALLENGES (FOUNDATION, STANDARD, ADVANCED) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Perfect Competition (Recall)
  {
    id: 'ch_01',
    nodeId: NODE_C10_ECON_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under pure Perfect Competition, what is the exact mathematical relationship between Price (P), Average Revenue (AR), and Marginal Revenue (MR)?',
    options: ['P = AR = MR', 'P > AR > MR', 'P = AR > MR', 'MR = 0 while P = AR'],
    correctIndex: 0,
    explanation: 'Because an individual firm is a price taker facing a perfectly horizontal demand curve, selling an additional unit always adds the uniform market price. Thus P = AR = MR.',
    hints: [
      'Think about whether an individual firm has any power to change the price for an extra unit.',
      'Since price remains constant for every unit sold, each unit yields identical incremental revenue.',
      'Constant price mathematically guarantees that AR equals MR equals P (P = AR = MR).'
    ],
    misconceptionIndex: 2
  },
  // 2. Foundation - Monopoly Demand (Understanding)
  {
    id: 'ch_02',
    nodeId: NODE_C10_ECON_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does a monopolist’s Marginal Revenue (MR) curve lie strictly below its Average Revenue (AR) curve?',
    options: [
      'Because total revenue falls continuously starting from unit one',
      'To sell an extra unit, the monopolist must reduce the price on all previous units',
      'Because the government imposes a progressive statutory excise tax on every extra unit',
      'Because the monopolist has zero fixed costs of production'
    ],
    correctIndex: 1,
    explanation: 'A monopolist faces a downward-sloping market demand curve. To sell an additional unit, it must lower the price across all units sold, making MR strictly lower than AR.',
    hints: [
      'Think about what happens to the price of earlier units when the seller lowers price to expand sales.',
      'Reducing price on all inframarginal units causes the revenue gain from the extra unit to be less than the selling price.',
      'Because price must drop across the entire output batch, MR is strictly less than AR.'
    ],
    misconceptionIndex: 0
  },
  // 3. Foundation - Barter Inconvenience (Recall)
  {
    id: 'ch_03',
    nodeId: NODE_C10_ECON_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which fundamental inconvenience of the Barter System requires that two trading parties must mutually desire each other’s goods simultaneously?',
    options: ['Lack of divisibility', 'Double coincidence of wants', 'Difficulty in storing wealth', 'Absence of legal tender legislation'],
    correctIndex: 1,
    explanation: 'Double coincidence of wants is the rare condition where Person A wants what Person B offers, and Person B simultaneously desires what Person A produces.',
    hints: [
      'Think of two traders searching for an exact mutual match of surpluses.',
      'It involves matching mutual desires at the exact same point in time.',
      'The formal economic term is "Double coincidence of wants".'
    ],
    misconceptionIndex: 1
  },
  // 4. Foundation - Market Structures Classification (Drag-Label)
  {
    id: 'ch_04',
    nodeId: NODE_C10_ECON_023,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each real-world Indian market example to its corresponding Market Structure model.',
    dragItems: [
      { label: 'Khanna Wheat Mandi', targetId: 'box_perf_comp' },
      { label: 'Indian Railways Mainline', targetId: 'box_monopoly' },
      { label: 'Toothpaste (Colgate/Sensodyne)', targetId: 'box_monop_comp' },
      { label: 'Telecom (Jio/Airtel/Vi)', targetId: 'box_oligopoly' }
    ],
    correctMapping: {
      box_perf_comp: 'Khanna Wheat Mandi',
      box_monopoly: 'Indian Railways Mainline',
      box_monop_comp: 'Toothpaste (Colgate/Sensodyne)',
      box_oligopoly: 'Telecom (Jio/Airtel/Vi)'
    },
    explanation: 'Wheat Mandi represents Perfect Competition (homogeneous, price taker); Indian Railways is Monopoly (sole mainline operator); Toothpastes represent Monopolistic Competition (differentiated products); Telecom represents Oligopoly (few interdependent giants).',
    hints: [
      'Indian Railways is the sole passenger broad-gauge train network operator.',
      'Toothpaste brands compete using heavy advertising and product differentiation.',
      'Three giant telecom companies control almost the entire 1.2 billion subscriber base.'
    ]
  },
  // 5. Foundation - Central Bank Functions (Recall)
  {
    id: 'ch_05',
    nodeId: NODE_C10_ECON_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 22 of the RBI Act 1934, which institution holds the sole monopoly of note issue for ₹2 to ₹2,000 banknotes in India?',
    options: ['State Bank of India (SBI)', 'Reserve Bank of India (RBI)', 'Ministry of Finance directly', 'NITI Aayog'],
    correctIndex: 1,
    explanation: 'The RBI possesses the sole sovereign right to issue currency notes in India under Section 22 of the RBI Act 1934 (while ₹1 notes and coins are minted under the Coinage Act by the Government of India).',
    hints: [
      'Examine the top of any Indian currency banknote: whose seal and promise appears?',
      'It is India’s apex central monetary authority established in 1935.',
      'The correct institution is the Reserve Bank of India (RBI).'
    ]
  },
  // 6. Foundation - Commercial Bank Deposits (Understanding)
  {
    id: 'ch_06',
    nodeId: NODE_C10_ECON_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which deposit account pays ZERO interest but offers unlimited daily withdrawals and cheque clearing for commercial operations?',
    options: ['Savings Bank Account', 'Current Account', 'Fixed Deposit Account (FD)', 'Recurring Deposit Account (RD)'],
    correctIndex: 1,
    explanation: 'Current accounts earn 0% interest and are designed for merchants and corporations requiring continuous daily liquidity, overdraft access, and unrestricted transactions.',
    hints: [
      'Salaried individuals maintain Savings; retirees hold Fixed Deposits for interest.',
      'Corporations like Reliance, Tata, and local traders use this account for high transaction frequency.',
      'This is formally called a Current Account.'
    ],
    misconceptionIndex: 3
  },
  // 7. Foundation - Direct vs Indirect Tax (Recall)
  {
    id: 'ch_07',
    nodeId: NODE_C10_ECON_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is a Direct Tax whose legal impact and economic incidence fall on the exact same individual and cannot be shifted?',
    options: ['Goods and Services Tax (GST)', 'Customs Duty on imported electronics', 'Personal Income Tax', 'Central Excise Duty on petroleum'],
    correctIndex: 2,
    explanation: 'Personal Income Tax is directly assessed on the earner and cannot be passed on or shifted to another consumer, making impact and incidence coincide.',
    hints: [
      'GST and Customs duties are embedded in shelf prices and shifted to buyers.',
      'Direct taxes are levied directly on individual income, corporate profits, or net wealth.',
      'Personal Income Tax cannot be shifted.'
    ],
    misconceptionIndex: 4
  },
  // 8. Standard - CRR / SLR Mathematical Calculation (Application)
  {
    id: 'ch_08',
    nodeId: NODE_C10_ECON_028,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'State Bank of India has Net Demand and Time Liabilities (NDTL) of ₹10,000 crore. RBI mandates CRR = 4.5% and SLR = 18.0%. What are SBI’s total lendable funds in crores?',
    correctAnswer: 7750,
    tolerance: 10,
    unit: 'crores',
    explanation: 'Required CRR = 4.5% of ₹10,000 cr = ��450 cr. Required SLR = 18.0% of ₹10,000 cr = ₹1,800 cr. Total reserves locked = ₹450 + ₹1,800 = ₹2,250 cr. Lendable funds = ₹10,000 - ₹2,250 = ₹7,750 crore.',
    hints: [
      'Calculate CRR reserve cash: 10,000 × 0.045 = 450.',
      'Calculate SLR liquid assets: 10,000 × 0.180 = 1,800.',
      'Subtract total reserves (450 + 1,800 = 2,250) from total deposits: 10,000 - 2,250 = 7,750.'
    ]
  },
  // 9. Standard - Qualitative Margin Requirement (Application)
  {
    id: 'ch_09',
    nodeId: NODE_C10_ECON_027,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A gold trader pledges gold inventory worth ₹5,00,000 to an Indian commercial bank. If RBI raises the qualitative margin requirement to 40%, what is the maximum loan (in ₹) the bank can sanction?',
    correctAnswer: 300000,
    tolerance: 1000,
    unit: 'rupees',
    explanation: 'Max Sanctioned Loan = Collateral Value × (1 - Margin Rate) = ₹5,00,000 × (1 - 0.40) = ₹5,00,000 × 0.60 = ₹3,00,000.',
    hints: [
      'The margin is the percentage of collateral value that CANNOT be borrowed against.',
      'The borrower receives (100% - 40%) = 60% of the collateral valuation.',
      'Multiply ₹5,00,000 by 0.60 to obtain ₹3,00,000.'
    ]
  },
  // 10. Standard - Oligopoly Strategic Interdependence (Analysis)
  {
    id: 'ch_10',
    nodeId: NODE_C10_ECON_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When Reliance Jio entered the Indian telecom sector with free 4G data tariffs in 2016, why were Bharti Airtel and Vodafone-Idea forced to slash their own tariffs within days?',
    options: [
      'Because telecom operates under perfect factor mobility and zero entry cost',
      'Because in an Oligopoly, firms exhibit mutual interdependence; ignoring a rival’s price cut causes immediate loss of market share',
      'Because the Telecom Regulatory Authority of India (TRAI) legislated identical tariff rates by law',
      'Because all three operators formed an explicit statutory cartel'
    ],
    correctIndex: 1,
    explanation: 'Mutual interdependence is the defining characteristic of Oligopoly. Because only a few large players dominate, any aggressive pricing move forces rivals to respond immediately to safeguard their customer base.',
    hints: [
      'Consider how many major telecom providers exist in India.',
      'If a major competitor gives away unlimited data and you do not respond, where do your subscribers migrate?',
      'This strategic reaction to rivals is called Mutual Interdependence.'
    ]
  },
  // 11. Standard - Monetary Policy Transmission (Drag-Sort)
  {
    id: 'ch_11',
    nodeId: NODE_C10_ECON_028,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of events showing how an RBI Repo Rate hike cools economic inflation.',
    sortItems: [
      'RBI raises the benchmark Repo Rate (e.g. from 4.0% to 6.5%)',
      'Commercial banks face higher overnight borrowing costs and hike MCLR/EBLR lending rates',
      'Consumer home loans, auto loans, and corporate credit contract due to costlier EMIs',
      'Aggregate demand falls across the economy, slowing price rise and cooling CPI inflation'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Repo Rate hike → Bank cost of funds ↑ → Bank lending rates (MCLR/EBLR) ↑ → Credit borrowing ↓ → Aggregate Demand ↓ → Inflation rate cools.',
    hints: [
      'The central bank initiates the monetary transmission cycle with the policy rate.',
      'Commercial banks pass this cost onto retail and commercial borrowers via higher loan interest rates.',
      'Higher interest rates compress credit and spending, which ultimately curbs inflation.'
    ]
  },
  // 12. Standard - Demonetisation 2016 Empirical Data (Analysis)
  {
    id: 'ch_12',
    nodeId: NODE_C10_ECON_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'According to the RBI Annual Report 2018, 99.3% of demonetised ₹500 and ₹1,000 currency notes returned to the banking system. What does this empirical evidence indicate?',
    options: [
      '100% of black money was permanently extinguished as unreturned ash',
      'Unaccounted cash was mostly deposited into commercial bank accounts (subject to tax audit) rather than being physically destroyed',
      'The traditional barter system permanently replaced the Indian Rupee',
      'The legal tender status of old ₹1,000 notes was immediately reinstated'
    ],
    correctIndex: 1,
    explanation: 'Because 99.3% returned, the assumption that black money would be burnt or discarded failed; instead, cash entered formal banking channels where it became subject to electronic trail and tax scrutiny.',
    hints: [
      'If nearly all currency notes returned to bank counters, were they burnt or deposited?',
      'Depositing means money entered digital bank ledgers where the Income Tax Department could issue notices.',
      'Hence cash was banked and formalised rather than destroyed.'
    ],
    misconceptionIndex: 1
  },
  // 13. Standard - GST Input Tax Credit Offset (Application)
  {
    id: 'ch_13',
    nodeId: NODE_C10_ECON_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A manufacturer purchases raw materials paying ₹18,000 in GST. After manufacturing, finished goods incur an output GST liability of ₹30,000. Utilizing Input Tax Credit (ITC), what net tax (in ₹) must be remitted to the government?',
    correctAnswer: 12000,
    tolerance: 100,
    unit: 'rupees',
    explanation: 'Net GST Payable = Output Tax Liability - Input Tax Credit (ITC) = ₹30,000 - ₹18,000 = ₹12,000. This mechanism prevents the cascading tax-on-tax effect.',
    hints: [
      'Under the GST regime, credit is granted for tax already remitted on input purchases.',
      'Net Tax Remittance = Total Output Tax minus Input Tax Credit.',
      '₹30,000 minus ₹18,000 equals ₹12,000.'
    ]
  },
  // 14. Standard - Commercial Bank Overdraft vs Cash Credit (Distinguish)
  {
    id: 'ch_14',
    nodeId: NODE_C10_ECON_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does an Overdraft facility fundamentally differ from Cash Credit in commercial banking?',
    options: [
      'Overdraft is granted on an existing Current Account up to a limit, whereas Cash Credit is a dedicated loan account against pledged inventory/book debts',
      'Overdraft is strictly reserved for 20-year residential home mortgages',
      'Cash Credit carries zero interest while Overdraft charges 30% per week',
      'There is no distinction; both are identical statutory terms in banking law'
    ],
    correctIndex: 0,
    explanation: 'Overdraft is a credit feature linked to an operational current account allowing negative balances, whereas Cash Credit is a formal working-capital facility secured against hypothecated stock or inventory.',
    hints: [
      'Consider the underlying bank account structure.',
      'Which one requires hypothecated inventory and raw material stock as primary security?',
      'Overdraft is an extension on a Current Account; Cash Credit is a separate loan account against inventory.'
    ],
    misconceptionIndex: 0
  },
  // 15. Advanced - Perfect Competition Demand Formula (Construct)
  {
    id: 'ch_15',
    nodeId: NODE_C10_ECON_021,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Construct the valid economic condition that uniquely defines Price Determination for a Firm in Perfect Competition.',
    availableParts: ['P = AR = MR', 'P = AR > MR', 'Price Taker', 'Price Maker', 'Horizontal Demand', 'Downward Demand'],
    targetState: 'P = AR = MR Price Taker Horizontal Demand',
    validationHint: 'Select 3 components in order: Revenue Identity, Firm Pricing Role, Curve Geometry.',
    explanation: 'A perfectly competitive firm is a Price Taker with a Horizontal Demand curve where P = AR = MR. In contrast, a monopolist is a Price Maker with a Downward Demand curve where P = AR > MR.',
    hints: [
      'Start with the exact identity where Price equals Average Revenue and Marginal Revenue.',
      'Select the market pricing role of an individual competitive firm.',
      'Conclude with the geometric orientation of the firm’s demand curve.'
    ]
  },
  // 16. Advanced - Central Bank Forex Market Intervention (Evaluation)
  {
    id: 'ch_16',
    nodeId: NODE_C10_ECON_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During a sudden global crude oil spike, the Indian Rupee depreciates sharply from ₹83 to ₹88 per USD. As the RBI Governor managing $640 Billion in foreign exchange reserves, what currency intervention should you authorize to stabilize the rupee?',
    options: [
      'Buy USD from the open market to absorb dollars',
      'Sell USD from forex reserves into the interbank foreign exchange market to augment dollar liquidity and soak up excess rupees',
      'Demonetise all ₹500 banknotes immediately',
      'Slash the Cash Reserve Ratio to 1% to trigger currency outflow'
    ],
    correctIndex: 1,
    explanation: 'Selling USD from official forex reserves increases the market supply of dollars relative to rupees, checking sharp rupee depreciation and anchoring exchange rate stability.',
    hints: [
      'When the US Dollar becomes excessively expensive, does the Indian forex market need MORE dollars or FEWER dollars?',
      'Supplying dollars from central bank reserves meets unfulfilled commercial demand.',
      'Selling USD from RBI reserves restores equilibrium to the exchange rate.'
    ]
  },
  // 17. Advanced - Income Tax Slab Computation (Creativity/Application)
  {
    id: 'ch_17',
    nodeId: NODE_C10_ECON_030,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Under a progressive tax regime: ₹0-3 Lakh = Nil, ₹3-7 Lakh = 5%, ₹7-10 Lakh = 10%. Calculate the total direct income tax (in ₹) payable on an annual taxable income of ₹10,00,000.',
    correctAnswer: 50000,
    tolerance: 100,
    unit: 'rupees',
    explanation: 'Slab 1 (₹0 to 3L): Nil = ₹0. Slab 2 (₹3L to 7L = ₹4,00,000 @ 5%): ₹20,000. Slab 3 (₹7L to 10L = ₹3,00,000 @ 10%): ₹30,000. Total Tax = ₹0 + ��20,000 + ₹30,000 = ₹50,000.',
    hints: [
      'Calculate tax on the bracket between ₹3,00,000 and ₹7,00,000 (span of ₹4,00,000 at 5%).',
      'Calculate tax on the bracket between ₹7,00,000 and ₹10,00,000 (span of ₹3,00,000 at 10%).',
      'Add the taxes from both brackets: ₹20,000 + ₹30,000 = ₹50,000.'
    ]
  },
  // 18. Advanced - Qualitative vs Quantitative Credit Tools (Analysis)
  {
    id: 'ch_18',
    nodeId: NODE_C10_ECON_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'If rampant speculation occurs in luxury real estate without general inflation in consumer staples, why does the RBI hike the Margin Requirement rather than raising the Bank/Repo Rate?',
    options: [
      'Because the Bank Rate is legally prohibited from changing more than once every decade',
      'Because hiking the Repo Rate raises borrowing costs across manufacturing, agriculture, and small businesses, whereas Margin hiking surgically restricts credit to real estate',
      'Because margin requirements directly print paper currency notes',
      'Because commercial banks are immune to changes in the repo rate'
    ],
    correctIndex: 1,
    explanation: 'Quantitative measures (Repo Rate, CRR) alter the TOTAL volume of credit across all sectors. Qualitative measures (Margin Requirements) surgically alter the DIRECTION and COMPOSITION of credit without harming productive sectors.',
    hints: [
      'Consider collateral-specific targeting versus general interest rate hikes across the whole economy.',
      'A repo rate hike makes tractor loans, school loans, and factory working capital costlier too.',
      'Qualitative tools restrict credit selectively to speculative asset bubbles.'
    ]
  },
  // 19. Advanced - CRR vs SLR Structural Distinction (Analysis)
  {
    id: 'ch_19',
    nodeId: NODE_C10_ECON_028,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which statement correctly distinguishes CRR from SLR on grounds of custody, asset form, and interest returns?',
    options: [
      'CRR is held with the RBI in cash earning 0% interest; SLR is held by the bank itself in liquid assets (G-Secs/gold) and earns interest returns',
      'CRR earns 12% guaranteed interest from the government; SLR is deposited with the World Bank',
      'CRR consists of physical gold in bank vaults; SLR is cash handed over to the Ministry of Finance',
      'Both reserves are deposited directly into RBI accounts with identical 6% annual returns'
    ],
    correctIndex: 0,
    explanation: 'CRR represents cash balances maintained strictly with the RBI (0% interest). SLR consists of liquid eligible assets (chiefly interest-bearing Government Securities) maintained by the commercial bank itself in its own treasury portfolio.',
    hints: [
      'Where is CRR stored? In the RBI’s cash vault account.',
      'Where does SLR stay? In the commercial bank’s own treasury portfolio of Government Securities.',
      'Only Government Securities held under SLR generate interest income.'
    ],
    misconceptionIndex: 0
  },
  // 20. Advanced - Moral Suasion vs Direct Action (Evaluation)
  {
    id: 'ch_20',
    nodeId: NODE_C10_ECON_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During the 2020 economic slowdown, the RBI issued an advisory asking commercial banks to grant a 3-month loan EMI moratorium. Which instrument was this, and why did banks comply despite zero penal fines?',
    options: [
      'Credit Rationing under Section 35A',
      'Moral Suasion — banks complied due to the apex regulatory authority, supervisory prestige, and leadership of the RBI',
      'Statutory Direct Tax Decree',
      'Open Market Operations under the FEMA Act'
    ],
    correctIndex: 1,
    explanation: 'Moral suasion is non-punitive persuasion and informal guidance by the central bank. Commercial banks comply due to ongoing regulatory oversight, trust, and institutional leadership of the apex monetary authority.',
    hints: [
      'Was this a punitive statutory order with fines or an authoritative request/appeal?',
      'It operates through moral influence, meetings, and central bank authority.',
      'This method is called Moral Suasion.'
    ]
  },
  // 21. Advanced - Digital Rupee (e₹) vs UPI (Creativity/Synthesis)
  {
    id: 'ch_21',
    nodeId: NODE_C10_ECON_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'How does the RBI’s Central Bank Digital Currency (Digital Rupee e₹) fundamentally differ from private UPI payment applications like PhonePe and Google Pay?',
    options: [
      'UPI transactions move commercial bank deposits, whereas e₹ is a direct sovereign legal tender liability of the Reserve Bank of India itself (digital cash)',
      'UPI is illegal under the Banking Regulation Act',
      'e₹ can only be spent in foreign countries',
      'There is zero economic difference; both are privately issued cryptocurrencies'
    ],
    correctIndex: 0,
    explanation: 'UPI is an electronic messaging and settlement infrastructure that transfers commercial bank account deposits. The Digital Rupee (e₹) is a direct sovereign liability of the Reserve Bank of India, functioning as digital cash without needing an intermediary bank deposit account.',
    hints: [
      'Who backs the money: an individual commercial bank’s deposit ledger or the sovereign central bank directly?',
      'e₹ is the exact digital counterpart of physical currency notes issued by the RBI.',
      'UPI moves commercial bank money; e₹ is central bank sovereign currency.'
    ]
  },
  // 22. Advanced - Tax Regressivity Analysis (Analysis/Evaluation)
  {
    id: 'ch_22',
    nodeId: NODE_C10_ECON_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is a uniform 18% GST on essential packaged groceries considered economically "regressive" despite applying the exact same statutory rate to every citizen?',
    options: [
      'Because wealthy citizens are legally exempted from paying GST bills',
      'Because the tax represents a significantly higher proportion of a low-income household’s total earnings than of a wealthy earner’s income',
      'Because GST revenues are distributed exclusively to industrialised states',
      'Because the tax is linked to changes in the central bank Repo Rate'
    ],
    correctIndex: 1,
    explanation: 'Indirect taxes are regressive in economic impact because lower-income individuals spend a much larger percentage of their total income on basic consumption goods, meaning the flat tax consumes a greater share of their earnings.',
    hints: [
      'Compare an ₹18 tax on a person earning ₹100/day versus a person earning ₹10,000/day.',
      '₹18 represents 18% of the poor person’s daily income, but only 0.18% of the wealthy person’s daily earnings.',
      'Taking a higher percentage of lower income makes an indirect tax regressive in burden.'
    ],
    misconceptionIndex: 4
  }
];

// ─── PROPS INTERFACE DEFINITION ───
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
  nodeId: NODE_C10_ECON_021,
  title: 'Markets, Banking & Public Finance Master Simulation',
  definition: 'An integrated study of Perfect Competition, Monopoly, Oligopoly, Money Evolution, Commercial Banking, Central Banking, Monetary Policy instruments (CRR, SLR, Repo, Margin), Demonetisation, and Public Finance (GST and Direct Taxes).',
  eli5: 'Explore how prices emerge in agricultural mandis, how commercial banks create credit from deposits, how the Reserve Bank of India controls inflation through interest rates, and how GST finances public infrastructure!',
  misconceptions: [
    { misconception: 'Any large corporation like Reliance or Tata is automatically a pure monopoly.', correction: 'Monopoly requires a SINGLE sole seller with NO close substitutes (e.g. Indian Railways mainline). Massive size alone does not create a monopoly.' },
    { misconception: 'Demonetisation permanently destroyed all black money in India.', correction: '99.3% of demonetised notes returned to banks. The primary effect was formalisation, digital adoption, and tax audit trails, not physical cash extinguishment.' },
    { misconception: 'Under Perfect Competition, an individual seller can set whatever price they choose.', correction: 'Firms are price takers facing a horizontal demand curve (P = AR = MR). Charging even ₹1 above the prevailing market price reduces sales to zero.' },
    { misconception: 'Current accounts pay the highest interest rates to business owners.', correction: 'Current accounts earn 0% interest and are built for unrestricted daily transaction liquidity, clearing, and overdraft access.' },
    { misconception: 'GST is a direct tax because the shopkeeper collects and pays it to the government.', correction: 'GST is an indirect tax because the ultimate economic burden is completely shifted to the end consumer in the final purchase price.' }
  ],
  diagnosticQuestions: [
    { question: 'What is the demand curve shape for an individual firm under Perfect Competition?', options: ['Downward sloping', 'Perfectly horizontal', 'Vertical', 'U-shaped'], correctIndex: 1 },
    { question: 'Which apex institution holds the sole monopoly of banknote issue in India?', options: ['State Bank of India', 'Reserve Bank of India', 'Ministry of Corporate Affairs', 'SEBI'], correctIndex: 1 },
    { question: 'What happens to commercial bank lendable funds when the RBI raises the CRR?', options: ['They increase', 'They decrease', 'They remain unaffected', 'They double'], correctIndex: 1 },
    { question: 'In which market structure is mutual strategic interdependence of firms the critical feature?', options: ['Perfect Competition', 'Monopoly', 'Oligopoly', 'Monopolistic Competition'], correctIndex: 2 },
    { question: 'What was the date of the historic 2016 Indian Demonetisation announcement?', options: ['15 August 2016', '8 November 2016', '1 July 2017', '31 March 2018'], correctIndex: 1 },
    { question: 'Which comprehensive tax reform subsumed 17 central and state indirect levies on 1 July 2017?', options: ['Direct Tax Code', 'Goods and Services Tax (GST)', 'Wealth Tax', 'Equalisation Levy'], correctIndex: 1 },
    { question: 'Where is the Statutory Liquidity Ratio (SLR) maintained by a commercial bank?', options: ['With RBI in cash', 'With the bank itself in eligible liquid assets (G-Secs)', 'In foreign central banks', 'In IMF reserve tranches'], correctIndex: 1 },
    { question: 'Which qualitative monetary tool fixes an absolute limit or ceiling on loans to specific sectors?', options: ['Margin Requirement', 'Credit Rationing', 'Moral Suasion', 'Bank Rate'], correctIndex: 1 }
  ],
  masteryCriteria: 'Demonstrates comprehensive analytical competency across 10 ICSE Economics curriculum nodes spanning market pricing, central bank monetary policy, commercial credit creation, and public tax mechanics.'
};

// ─── 6 BRILLIANT INTERACTIVE LAB EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Perfect Competition Mandi Dynamics',
    instruction: 'Adjust the Mandi Wheat Supply & Market Price slider. Observe how the individual farmer remains a price taker facing a perfectly horizontal P = AR = MR line.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_ECON_021,
  },
  {
    title: 'Lab 2: Monopoly vs Oligopoly Pricing Power',
    instruction: 'Toggle between Monopoly, Monopolistic Competition, and Oligopoly. Adjust rival count to observe how the demand curve slope and strategic interdependence change.',
    interactionType: 'toggle-market',
    nodeId: NODE_C10_ECON_022,
  },
  {
    title: 'Lab 3: Commercial Bank Reserve Multiplier',
    instruction: 'Move the CRR and SLR reserve sliders. Watch in real-time how SBI’s lendable funds and credit creation capacity expand or contract.',
    interactionType: 'slider-reserves',
    nodeId: NODE_C10_ECON_025,
  },
  {
    title: 'Lab 4: RBI Monetary Policy Transmission Chain',
    instruction: 'Change the RBI Repo Rate and observe the simulated transmission curves on commercial Bank MCLR lending rates, CPI inflation, and GDP growth.',
    interactionType: 'slider-repo',
    nodeId: NODE_C10_ECON_028,
  },
  {
    title: 'Lab 5: Qualitative Selective Credit Controls',
    instruction: 'Modify the Margin Requirement slider for gold/real-estate collateral. Notice how the central bank selectively restricts credit without touching the universal repo rate.',
    interactionType: 'slider-margin',
    nodeId: NODE_C10_ECON_027,
  },
  {
    title: 'Lab 6: GST Input Tax Credit (ITC) Ledger',
    instruction: 'Adjust Input GST paid on raw materials and Output GST on finished products to calculate the Net Tax remitted to the government without double taxation.',
    interactionType: 'slider-gst',
    nodeId: NODE_C10_ECON_030,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If the RBI increases the Cash Reserve Ratio (CRR) from 4.5% to 6.5%, what will happen immediately to commercial bank credit supply?',
    options: [
      'Commercial bank lendable funds will shrink, slowing down loan sanctioning',
      'Lendable funds will surge, causing hyper-expansion in credit',
      'Commercial bank lending interest rates will drop to zero',
      'Zero effect on deposits, reserves, or loanable funds'
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the CRR slider in Lab 3 to 6.5% and verify the immediate contraction in total lendable credit.',
    nodeId: NODE_C10_ECON_028
  },
  {
    question: 'Prediction: If an individual farmer in Khanna Mandi raises their selling price by ₹50 over the prevailing MSP, how many quintals can they sell?',
    options: [
      'All 40 quintals easily due to premium branding',
      'Zero quintals, because buyers will immediately purchase identical grain from neighbouring farmers at MSP',
      'Double their normal sales volume',
      'They will be granted a permanent statutory monopoly'
    ],
    correctIndex: 1,
    verifyInstruction: 'Set the farmer price above the MSP in Lab 1 and observe how demand collapses.',
    nodeId: NODE_C10_ECON_021
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When you increase the number of rival telecom operators from 1 to 3 in the Oligopoly simulator, what happens to pricing power?',
    observableOptions: [
      'Excess monopoly markup collapses and prices become rigid around rival matching levels',
      'The firm can charge infinite monopoly prices with zero customer loss',
      'The entire telecom sector collapses into zero production',
      'Cost of network maintenance automatically doubles'
    ],
    correctIndex: 0,
    nodeId: NODE_C10_ECON_023
  },
  {
    question: 'Observation: In the GST Input Tax Credit ledger, what prevents the cascading tax-on-tax effect on raw materials?',
    observableOptions: [
      'The tax already paid on raw material inputs is subtracted from the final output tax liability',
      'The government refunds 100% of the customer retail purchase price',
      'Customs duties completely replace the domestic sales invoice',
      'Personal income tax cancels all indirect sales taxes'
    ],
    correctIndex: 0,
    nodeId: NODE_C10_ECON_030
  }
];

// ─── POST-COMPLETION REFLECTION PROMPTS ───
const REFLECTION_PROMPTS = [
  {
    id: 'ref_1',
    question: 'What was the most surprising thing you learned about how markets, banks, or taxes operate?',
    starter: 'I was surprised to discover that...',
    example: 'Under Perfect Competition, an individual farmer cannot influence price by even ₹1, and CRR cash held with RBI earns 0% interest!'
  },
  {
    id: 'ref_2',
    question: 'How would you explain the difference between RBI Quantitative tools (Repo/CRR) and Qualitative tools (Margin) to a friend?',
    starter: 'I would explain that quantitative tools affect...',
    example: 'Quantitative tools change the overall volume of money for the whole economy, while qualitative tools target specific speculative sectors.'
  },
  {
    id: 'ref_3',
    question: 'Where in your everyday real life will you notice the impact of GST Input Tax Credit or RBI Repo Rate changes?',
    starter: 'In daily life, I will observe this when...',
    example: 'When looking at restaurant bills with CGST/SGST splits, or when home loan EMIs rise following an RBI monetary policy meeting.'
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'The Young Macro-Economist Field Investigation',
  description: 'Interview a local merchant, store owner, or your parents regarding how monetary policy and tax structures affect their monthly cash flows.',
  steps: [
    'Check if their business or home loans are linked to RBI Repo-linked lending rates (EBLR/MCLR).',
    'Examine a recent shopping or restaurant receipt and identify the CGST (Central) and SGST (State) breakdown.',
    'Ask how a shopkeeper manages Input Tax Credit (ITC) invoices when purchasing goods from distributors.',
    'Formulate a 3-point recommendation for how the RBI Monetary Policy Committee should balance inflation control with GDP growth.'
  ]
};

// ─── MAIN COMPONENT ───
function C10_EconomicsPerfectCompetitionMeaningSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['econ'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery Phase State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Brilliant Interactive Labs Simulation States
  const [mandiPrice, setMandiPrice] = useState(2015);
  const [farmerOutput, setFarmerOutput] = useState(40);
  const [selectedMarketType, setSelectedMarketType] = useState<'perfect' | 'monopoly' | 'monop_comp' | 'oligopoly'>('perfect');
  const [rivalCount, setRivalCount] = useState(3);
  const [simDeposits, setSimDeposits] = useState(10000); // in Crores
  const [simCRR, setSimCRR] = useState(4.5);
  const [simSLR, setSimSLR] = useState(18.0);
  const [simRepoRate, setSimRepoRate] = useState(6.5);
  const [simRawInputGST, setSimRawInputGST] = useState(18000);
  const [simFinishedOutputGST, setSimFinishedOutputGST] = useState(30000);
  const [simMarginReq, setSimMarginReq] = useState(25);
  const [simCollateralVal, setSimCollateralVal] = useState(500000);
  const [activeTab, setActiveTab] = useState<'market' | 'banking' | 'monetary' | 'fiscal'>('market');

  // Prediction & Observation Interactive States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Challenge and Feedback States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Post-Completion Reflection State
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({
    ref_1: '',
    ref_2: '',
    ref_3: ''
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Persistent BKT & Timer Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY ADAPTIVE DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── CALCULATED ECONOMIC VARIABLES ───
  const crrAmount = useMemo(() => (simDeposits * simCRR) / 100, [simDeposits, simCRR]);
  const slrAmount = useMemo(() => (simDeposits * simSLR) / 100, [simDeposits, simSLR]);
  const lendableFunds = useMemo(() => Math.max(0, simDeposits - crrAmount - slrAmount), [simDeposits, crrAmount, slrAmount]);
  const netGSTPayable = useMemo(() => Math.max(0, simFinishedOutputGST - simRawInputGST), [simFinishedOutputGST, simRawInputGST]);
  const maxQualitativeLoan = useMemo(() => simCollateralVal * (1 - simMarginReq / 100), [simCollateralVal, simMarginReq]);

  // Transmission data simulation for Recharts
  const transmissionData = useMemo(() => {
    const baseInflation = 8.5;
    const baseGDP = 7.8;
    return [
      { month: 'Month 0', repo: simRepoRate, mclr: Number((simRepoRate + 2.15).toFixed(2)), inflation: baseInflation, gdp: baseGDP },
      { month: 'Month 3', repo: simRepoRate, mclr: Number((simRepoRate + 2.30).toFixed(2)), inflation: Number(Math.max(3.5, baseInflation - (simRepoRate - 4.0) * 0.45).toFixed(2)), gdp: Number(Math.max(4.0, baseGDP - (simRepoRate - 4.0) * 0.20).toFixed(2)) },
      { month: 'Month 6', repo: simRepoRate, mclr: Number((simRepoRate + 2.45).toFixed(2)), inflation: Number(Math.max(3.8, baseInflation - (simRepoRate - 4.0) * 0.85).toFixed(2)), gdp: Number(Math.max(4.5, baseGDP - (simRepoRate - 4.0) * 0.35).toFixed(2)) },
      { month: 'Month 12', repo: simRepoRate, mclr: Number((simRepoRate + 2.65).toFixed(2)), inflation: Number(Math.max(4.0, baseInflation - (simRepoRate - 4.0) * 1.15).toFixed(2)), gdp: Number(Math.max(5.2, baseGDP - (simRepoRate - 4.0) * 0.45).toFixed(2)) },
    ];
  }, [simRepoRate]);

  // ─── INITIAL LOAD MASTERY (Mount Effect 1) ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY UPDATE (Effect 2) ───
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

  // ─── CANVAS 2D WAVE ANIMATION (Effect 3) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let angle = 0;

    const render = () => {
      angle += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#10b981');
      gradient.addColorStop(0.5, '#06b6d4');
      gradient.addColorStop(1, '#6366f1');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin(angle + x * 0.05) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── AUTO HINT INACTIVITY TIMER CLEANUP (Effect 4) ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── SPEECH WELCOME ON EXPLORE (Effect 5) ───
  useEffect(() => {
    if (phase === 'explore' && currentSlide === 0) {
      speechManager.speak('Welcome to the interactive economics laboratory. Explore the dynamic visual models.');
    }
  }, [phase, currentSlide]);

  // ─── 16 EXTRACTED USECALLBACK HANDLERS ───
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
      speechManager.speak('Let us inspect the complete step-by-step rationale.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent intuition! You grasped price-taking perfectly.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Manipulate the parameters below to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate economic observation!' : 'Inspect the curve slopes carefully.');
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
    let isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      speechManager.speak('Correct sequence! Transmission chain verified.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
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
    speechManager.speak('Congratulations! You have mastered markets, monetary policy, and public finance.');
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      speechManager.speak('Correct! Brilliant economic reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, 'mastered');
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
        speechManager.speak('Here is the comprehensive explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleReflectionSubmit = useCallback(() => {
    setReflectionSubmitted(true);
    setShowSparkle(true);
    setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    audioManager.play('success');
    speechManager.speak('Thank you for reflecting on your learning! Deep reflections consolidate long-term memory.');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-8 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans"
    >
      {/* ─── HEADER & REAL-TIME TOPIC BADGES ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-3xl p-3 bg-emerald-950/80 border border-emerald-700 rounded-2xl shadow-inner cursor-pointer"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
            <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mt-0.5">
              ICSE Class 10 • Commerce Stream • 10 Core Economic Nodes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase border shadow-md ${
              difficulty === 'foundation' ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300' :
              difficulty === 'advanced' ? 'bg-rose-900/60 border-rose-500 text-rose-300' :
              'bg-cyan-900/60 border-cyan-500 text-cyan-300'
            }`}
          >
            Tier: {difficulty}
          </motion.span>

          <motion.span
            whileHover={{ scale: 1.05 }}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 shadow"
          >
            Mastery: <span className="text-emerald-400 font-bold uppercase">{masteryLevel}</span>
          </motion.span>

          <motion.span
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700 shadow"
          >
            Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── CANVAS 2D WAVE INDICATOR ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full my-3"
      >
        <canvas ref={canvasRef} width={600} height={20} className="w-full opacity-75" />
      </motion.div>

      <AnimatePresence mode="wait">
        {/* ─── 1. DISCOVERY PHASE ─── */}
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 mt-4"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-indigo-950/40 rounded-2xl border border-emerald-800/60 shadow-lg"
            >
              <h2 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
                <span>🌾</span> {SCENARIO.title}
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-slate-400 mt-3 p-3 bg-slate-900/80 rounded-xl border border-slate-800"
              >
                {SCENARIO.context}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Discovery Challenge • Intuition Hook
                </span>
                <span className="text-[11px] text-slate-500 font-mono">ICSE Sec A Conceptual Check</span>
              </div>
              <p className="text-base text-white font-medium">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Option: ${opt}`}
                    className={`text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-100 shadow-lg'
                          : 'bg-slate-800/40 text-slate-500 border border-slate-800'
                        : 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span className="font-bold mr-2 text-emerald-400">[{String.fromCharCode(65 + i)}]</span> {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300 font-medium'}`}>
                    {discoveryCorrect ? '✓ Spot on! The individual competitive firm faces a perfectly horizontal demand curve.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Enter Interactive Laboratories"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-colors flex items-center gap-2"
                  >
                    Enter Interactive Laboratories →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── 2. INTERACTIVE EXPLORATION PHASE (BRILLIANT LABS) ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 mt-4"
          >
            {/* Lab Navigation Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900/90 rounded-2xl border border-slate-800"
            >
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  aria-label="Previous Lab"
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold disabled:opacity-40 border border-slate-700"
                >
                  ← Prev
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (currentSlide < EXPLORATION_STEPS.length - 1) setCurrentSlide(s => s + 1);
                    else handleAdvanceToSandbox();
                  }}
                  aria-label="Next Lab"
                  className="px-4 py-1.5 bg-emerald-600 text-slate-950 rounded-lg text-xs font-black shadow"
                >
                  {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Enter Free Sandbox →'}
                </motion.button>
              </div>
            </motion.div>

            {/* Instruction Banner */}
            <motion.p
              key={currentSlide}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-amber-300 font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-800/40"
            >
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </motion.p>

            {/* ─── LAB 1: PERFECT COMPETITION MANDI (SLIDE 0) ─── */}
            {currentSlide === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-slate-900 rounded-2xl border border-slate-800"
              >
                <div className="space-y-5">
                  <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wide">
                    Khanna Wheat Mandi Parameter Controls
                  </h4>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                      <span>Mandi Market Price (MSP): ₹{mandiPrice} / Quintal</span>
                      <span className="text-emerald-400 font-mono">P = AR = MR</span>
                    </div>
                    <input
                      type="range"
                      min={1800}
                      max={2500}
                      step={25}
                      value={mandiPrice}
                      aria-label="Mandi Price Slider"
                      onChange={(e) => setMandiPrice(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                      <span>Farmer Harjit’s Output: {farmerOutput} Quintals</span>
                      <span className="text-cyan-400 font-mono">Total Revenue: ₹{(mandiPrice * farmerOutput).toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={150}
                      step={5}
                      value={farmerOutput}
                      aria-label="Farmer Output Slider"
                      onChange={(e) => setFarmerOutput(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2"
                  >
                    <p className="text-slate-300">
                      <strong className="text-white">Price Taker Rule:</strong> Harjit supplies only a microscopic fraction of Punjab’s wheat crop. If he raises price to ₹{mandiPrice + 10}, buyers switch entirely to neighboring identical grain.
                    </p>
                    <p className="text-emerald-400 font-mono font-semibold">
                      Average Revenue (AR) = Total Rev / Q = ₹{mandiPrice} | Marginal Revenue (MR) = ΔTR / ΔQ = ₹{mandiPrice}
                    </p>
                  </motion.div>
                </div>

                {/* SVG Perfect Competition Horizontal Demand Curve */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-slate-400 mb-2">
                    Firm Horizontal Demand (P = AR = MR)
                  </span>
                  <svg viewBox="0 0 360 220" className="w-full h-48">
                    {/* Axes */}
                    <line x1="40" y1="20" x2="40" y2="180" stroke="#475569" strokeWidth="2" />
                    <line x1="40" y1="180" x2="340" y2="180" stroke="#475569" strokeWidth="2" />
                    <text x="330" y="200" fill="#94a3b8" fontSize="10" textAnchor="end">Quantity (Q - Quintals)</text>
                    <text x="30" y="25" fill="#94a3b8" fontSize="10" textAnchor="end">Price (₹)</text>

                    {/* Horizontal Line at Price */}
                    {(() => {
                      const yPos = 180 - ((mandiPrice - 1800) / 700) * 140;
                      return (
                        <g>
                          <line x1="40" y1={yPos} x2="330" y2={yPos} stroke="#10b981" strokeWidth="3" strokeDasharray="4 2" />
                          <circle cx={40 + (farmerOutput / 150) * 280} cy={yPos} r="6" fill="#06b6d4" />
                          <text x="335" y={yPos + 4} fill="#10b981" fontSize="10" fontWeight="bold">
                            P = AR = MR (₹{mandiPrice})
                          </text>
                        </g>
                      );
                    })()}
                  </svg>
                </div>
              </motion.div>
            )}

            {/* ─── LAB 2: MARKET STRUCTURES & OLIGOPOLY (SLIDE 1) ─── */}
            {currentSlide === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
              >
                <div className="flex flex-wrap gap-2">
                  {(['perfect', 'monopoly', 'monop_comp', 'oligopoly'] as const).map((type) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedMarketType(type)}
                      aria-label={`Select ${type} market`}
                      className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                        selectedMarketType === type
                          ? 'bg-emerald-600 text-slate-950 shadow-md'
                          : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                      }`}
                    >
                      {type.replace('_', ' ')}
                    </motion.button>
                  ))}
                </div>

                {selectedMarketType === 'oligopoly' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-800"
                  >
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Indian Telecom Dominant Rivals: {rivalCount} Firms (Jio, Airtel, Vi)</span>
                      <span className="text-cyan-400 font-semibold">TRAI ~89% Market Control</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={6}
                      value={rivalCount}
                      aria-label="Rivals Count Slider"
                      onChange={(e) => setRivalCount(Number(e.target.value))}
                      className="w-full accent-cyan-500"
                    />
                    <p className="text-xs text-slate-400">
                      <strong>Mutual Interdependence:</strong> If Jio slashes 4G prices, Airtel ({Math.round(100 / rivalCount)}% market share) matches immediately to prevent mass churn.
                    </p>
                  </motion.div>
                )}

                {/* SVG Demand Curve Comparison */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-300 mb-2 block">
                    Comparative Demand Slope Representation
                  </span>
                  <svg viewBox="0 0 380 180" className="w-full h-44">
                    <line x1="40" y1="10" x2="40" y2="160" stroke="#475569" strokeWidth="2" />
                    <line x1="40" y1="160" x2="360" y2="160" stroke="#475569" strokeWidth="2" />
                    {selectedMarketType === 'perfect' && (
                      <g>
                        <line x1="40" y1="80" x2="350" y2="80" stroke="#10b981" strokeWidth="3" />
                        <text x="355" y="84" fill="#10b981" fontSize="10">Horizontal (P = AR = MR)</text>
                      </g>
                    )}
                    {selectedMarketType === 'monopoly' && (
                      <g>
                        <line x1="40" y1="30" x2="330" y2="150" stroke="#ef4444" strokeWidth="3" />
                        <line x1="40" y1="30" x2="200" y2="150" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                        <text x="335" y="150" fill="#ef4444" fontSize="10">AR (Demand)</text>
                        <text x="205" y="150" fill="#f59e0b" fontSize="10">MR (Steeper)</text>
                      </g>
                    )}
                    {selectedMarketType === 'monop_comp' && (
                      <g>
                        <line x1="40" y1="40" x2="340" y2="120" stroke="#06b6d4" strokeWidth="3" />
                        <text x="345" y="120" fill="#06b6d4" fontSize="10">Flatter AR (Differentiated)</text>
                      </g>
                    )}
                    {selectedMarketType === 'oligopoly' && (
                      <g>
                        <polyline points="40,30 180,85 340,155" fill="none" stroke="#a855f7" strokeWidth="3" />
                        <text x="185" y="80" fill="#a855f7" fontSize="10">Kinked Demand Curve (Rigid Price)</text>
                      </g>
                    )}
                  </svg>
                </div>
              </motion.div>
            )}

            {/* ─── LAB 3: COMMERCIAL BANK CRR/SLR MULTIPLIER (SLIDE 2) ─── */}
            {currentSlide === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-slate-900 rounded-2xl border border-slate-800"
              >
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wide">
                    State Bank of India Balance Sheet
                  </h4>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Cash Reserve Ratio (CRR with RBI): {simCRR}%</span>
                      <span className="text-rose-400 font-semibold">₹{crrAmount.toFixed(0)} Cr (0% Return)</span>
                    </div>
                    <input
                      type="range"
                      min={3.0}
                      max={9.0}
                      step={0.5}
                      value={simCRR}
                      aria-label="CRR Slider"
                      onChange={(e) => setSimCRR(Number(e.target.value))}
                      className="w-full accent-rose-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Statutory Liquidity Ratio (SLR in G-Secs): {simSLR}%</span>
                      <span className="text-amber-400 font-semibold">₹{slrAmount.toFixed(0)} Cr (Earns Yield)</span>
                    </div>
                    <input
                      type="range"
                      min={15.0}
                      max={25.0}
                      step={0.5}
                      value={simSLR}
                      aria-label="SLR Slider"
                      onChange={(e) => setSimSLR(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800"
                  >
                    <div className="text-xs text-slate-300 flex justify-between font-bold">
                      <span>Net Lendable Credit Capacity:</span>
                      <span className="text-emerald-400 text-sm font-mono">₹{lendableFunds.toFixed(0)} Crore</span>
                    </div>
                    <div className="w-full h-3 bg-slate-800 rounded-full mt-2 overflow-hidden flex">
                      <div style={{ width: `${simCRR}%` }} className="bg-rose-500" title="CRR Reserve" />
                      <div style={{ width: `${simSLR}%` }} className="bg-amber-500" title="SLR Reserve" />
                      <div style={{ width: `${100 - simCRR - simSLR}%` }} className="bg-emerald-500" title="Lendable" />
                    </div>
                  </motion.div>
                </div>

                {/* Recharts Bar Chart Breakdown */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-center">
                  <span className="text-xs font-bold text-slate-300 mb-2">
                    Deposit Reserve Allocation (₹10,000 Cr NDTL)
                  </span>
                  <ResponsiveContainer width="100%" height={170}>
                    <BarChart data={[
                      { name: 'CRR (RBI)', amount: crrAmount, fill: '#f43f5e' },
                      { name: 'SLR (Vault G-Sec)', amount: slrAmount, fill: '#f59e0b' },
                      { name: 'Lendable Credit', amount: lendableFunds, fill: '#10b981' },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                      <YAxis stroke="#94a3b8" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                      <Bar dataKey="amount" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {/* ─── LAB 4: RBI REPO TRANSMISSION SIMULATOR (SLIDE 3) ─── */}
            {currentSlide === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wide">
                      Monetary Policy Transmission Chain
                    </h4>
                    <p className="text-xs text-slate-400">
                      Simulate RBI Repo Rate hikes to cool CPI inflation (MPC Target 4% ± 2%)
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Current Repo Rate:</span>
                    <p className="text-lg font-black text-cyan-400">{simRepoRate}%</p>
                  </div>
                </div>

                <input
                  type="range"
                  min={4.0}
                  max={9.0}
                  step={0.25}
                  value={simRepoRate}
                  aria-label="Repo Rate Slider"
                  onChange={(e) => setSimRepoRate(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <ResponsiveContainer width="100%" height={210}>
                    <LineChart data={transmissionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Line type="monotone" dataKey="mclr" name="Bank Loan Rate (MCLR %)" stroke="#f43f5e" strokeWidth={2} dot />
                      <Line type="monotone" dataKey="inflation" name="CPI Inflation (%)" stroke="#f59e0b" strokeWidth={2} dot />
                      <Line type="monotone" dataKey="gdp" name="GDP Growth (%)" stroke="#10b981" strokeWidth={2} dot />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {/* ─── LAB 5: QUALITATIVE CREDIT TOOLS (SLIDE 4) ─── */}
            {currentSlide === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-slate-900 rounded-2xl border border-slate-800"
              >
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wide">
                    Qualitative Selective Margin Control
                  </h4>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Pledged Gold/Real-Estate Collateral: ₹{simCollateralVal.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={100000}
                      max={1000000}
                      step={50000}
                      value={simCollateralVal}
                      aria-label="Collateral Slider"
                      onChange={(e) => setSimCollateralVal(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>RBI Mandated Margin Requirement: {simMarginReq}%</span>
                      <span className="text-rose-400 font-semibold">Borrower Equity: ₹{(simCollateralVal * simMarginReq / 100).toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={60}
                      step={5}
                      value={simMarginReq}
                      aria-label="Margin Requirement Slider"
                      onChange={(e) => setSimMarginReq(Number(e.target.value))}
                      className="w-full accent-rose-500"
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2"
                  >
                    <div className="flex justify-between text-xs font-bold text-slate-300">
                      <span>Max Sanctionable Loan (LTV):</span>
                      <span className="text-emerald-400 text-sm font-mono">₹{maxQualitativeLoan.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Qualitative instruments surgically curb speculative borrowing without raising interest rates on tractor loans or school fees.
                    </p>
                  </motion.div>
                </div>

                {/* SVG Margin Gauge */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                  <span className="text-xs font-bold text-slate-300 mb-3">
                    Collateral Split: Loan vs Margin Buffer
                  </span>
                  <svg viewBox="0 0 200 200" className="w-44 h-44">
                    <circle cx="100" cy="100" r="70" fill="none" stroke="#1e293b" strokeWidth="24" />
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="24"
                      strokeDasharray={`${(100 - simMarginReq) * 4.4} 440`}
                      transform="rotate(-90 100 100)"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="24"
                      strokeDasharray={`${simMarginReq * 4.4} 440`}
                      strokeDashoffset={`${-(100 - simMarginReq) * 4.4}`}
                      transform="rotate(-90 100 100)"
                    />
                    <text x="100" y="95" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">
                      {100 - simMarginReq}% Loan
                    </text>
                    <text x="100" y="115" textAnchor="middle" fill="#f43f5e" fontSize="11">
                      {simMarginReq}% Margin
                    </text>
                  </svg>
                </div>
              </motion.div>
            )}

            {/* ─── LAB 6: GST INPUT TAX CREDIT LEDGER (SLIDE 5) ─── */}
            {currentSlide === 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
              >
                <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wide">
                  GST 2017 Anti-Cascading Value Addition Ledger
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1">
                      Input Raw Material GST Paid: ₹{simRawInputGST.toLocaleString('en-IN')}
                    </label>
                    <input
                      type="range"
                      min={5000}
                      max={40000}
                      step={1000}
                      value={simRawInputGST}
                      aria-label="Input GST Slider"
                      onChange={(e) => setSimRawInputGST(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1">
                      Finished Output GST Collected: ₹{simFinishedOutputGST.toLocaleString('en-IN')}
                    </label>
                    <input
                      type="range"
                      min={10000}
                      max={80000}
                      step={1000}
                      value={simFinishedOutputGST}
                      aria-label="Output GST Slider"
                      onChange={(e) => setSimFinishedOutputGST(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                  <div className="text-xs space-y-1">
                    <p className="text-slate-400">Total Output Tax Liability: ₹{simFinishedOutputGST.toLocaleString('en-IN')}</p>
                    <p className="text-indigo-400 font-semibold">(-) Input Tax Credit (ITC Offset): ₹{simRawInputGST.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 uppercase font-bold">Net Remitted to Government:</span>
                    <p className="text-xl font-black text-emerald-400 font-mono">₹{netGSTPayable.toLocaleString('en-IN')}</p>
                    <span className="text-[10px] text-slate-500">(CGST 50% + SGST 50%)</span>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ─── SCIENTIFIC PREDICTION & OBSERVATION HOOK ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950/40 rounded-2xl border border-indigo-900/50 space-y-3"
            >
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Scientific Predict-Then-Check Protocol
              </span>
              {!predictionMade ? (
                <div>
                  <p className="text-sm text-white font-medium mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {PREDICTION_QUESTIONS[0].options.map((opt, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePrediction(idx)}
                        aria-label={`Prediction Option: ${opt}`}
                        className="p-3 text-left rounded-xl bg-slate-800/70 hover:bg-slate-750 text-xs text-slate-200 border border-slate-700 transition-colors"
                      >
                        <span className="font-bold mr-1 text-cyan-400">[{idx + 1}]</span> {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald-400 space-y-1">
                  <p className="font-semibold">✓ Prediction verified! Notice how the CRR parameter directly restricts loanable credit capacity in Lab 3.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── 3. FREE PLAYGROUND SANDBOX MODE ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 mt-4"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Free Playground Sandbox
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Stress-Test the Indian Economy</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Test extreme CRR reserves, Repo hikes, and Mandi price shocks without grading pressure.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Proceed to Challenges"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all"
              >
                Ready for Graded Challenges! →
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3"
              >
                <span className="text-xs font-bold text-cyan-400 uppercase">1. Mandi Wheat Price</span>
                <input
                  type="range"
                  min={1500}
                  max={3000}
                  value={mandiPrice}
                  aria-label="Sandbox Mandi Price"
                  onChange={(e) => setMandiPrice(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <p className="text-xs text-slate-300 font-mono">MSP: ₹{mandiPrice} | Farm Rev: ₹{(mandiPrice * farmerOutput).toLocaleString('en-IN')}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3"
              >
                <span className="text-xs font-bold text-rose-400 uppercase">2. Bank CRR Reserve</span>
                <input
                  type="range"
                  min={2.0}
                  max={12.0}
                  step={0.5}
                  value={simCRR}
                  aria-label="Sandbox CRR"
                  onChange={(e) => setSimCRR(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
                <p className="text-xs text-slate-300 font-mono">CRR: {simCRR}% | Lendable: ₹{lendableFunds.toFixed(0)} Cr</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3"
              >
                <span className="text-xs font-bold text-amber-400 uppercase">3. RBI Repo Rate</span>
                <input
                  type="range"
                  min={3.5}
                  max={10.0}
                  step={0.25}
                  value={simRepoRate}
                  aria-label="Sandbox Repo Rate"
                  onChange={(e) => setSimRepoRate(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <p className="text-xs text-slate-300 font-mono">Repo: {simRepoRate}% | MCLR Loan: {(simRepoRate + 2.3).toFixed(2)}%</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ─── 4. GRADED CHALLENGE PHASE ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 mt-4"
          >
            {/* Progress Bar & Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>
                  Challenge {currentChallenge + 1} of {filteredChallenges.length} ({challenge.type.toUpperCase()})
                </span>
                <span className="text-emerald-400 uppercase">NEP Competency: {challenge.competencyLevel}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.35 }}
                />
              </div>
            </div>

            {/* Question Card with shake feedback */}
            <motion.div
              animate={wrongShake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-2xl border transition-all shadow-xl ${
                wrongFlash ? 'bg-rose-950/70 border-rose-500' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <p className="text-base md:text-lg text-white font-semibold leading-relaxed mb-6">
                {challenge.question}
              </p>

              {/* A. MCQ / CLASSIFY / DISTINGUISH */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-100 shadow-md'
                          : 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <span className="font-bold mr-2 text-emerald-400">[{String.fromCharCode(65 + i)}]</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* B. DRAG-LABEL CHALLENGE */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: 'box_perf_comp', title: 'Perfect Competition' },
                      { id: 'box_monopoly', title: 'Pure Monopoly' },
                      { id: 'box_monop_comp', title: 'Monopolistic Competition' },
                      { id: 'box_oligopoly', title: 'Oligopoly (Few Rivals)' }
                    ].map((target) => (
                      <motion.div
                        key={target.id}
                        whileHover={{ scale: 1.01 }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(target.id)}
                        className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[90px]"
                      >
                        <span className="text-xs font-bold text-slate-400">{target.title}</span>
                        <div className="text-sm font-black text-emerald-400 mt-2">
                          {droppedLabels[target.id] || <span className="text-slate-600 font-normal italic">Drop matching structure here...</span>}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                    aria-label="Verify Dragged Labels"
                    className="px-6 py-2.5 bg-emerald-600 text-slate-950 font-black text-xs rounded-xl shadow disabled:opacity-40"
                  >
                    Verify Structure Matches
                  </motion.button>
                </div>
              )}

              {/* C. DRAG-SORT CHALLENGE */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag to reorder the stages into the correct sequence:</p>
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
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-cyan-400">
                        {displayIdx + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    aria-label="Submit Sorted Order"
                    className="px-6 py-2.5 bg-emerald-600 text-slate-950 font-black text-xs rounded-xl shadow mt-2"
                  >
                    Check Transmission Sequence
                  </motion.button>
                </div>
              )}

              {/* D. NUMERIC CHALLENGE */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter calculated value"
                      aria-label="Numeric Input Field"
                      className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-emerald-500 outline-none w-64"
                    />
                    <span className="text-sm font-semibold text-slate-400">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      aria-label="Verify Numeric Calculation"
                      className="px-6 py-3 bg-emerald-600 text-slate-950 font-black text-xs rounded-xl shadow disabled:opacity-40"
                    >
                      Verify Value
                    </motion.button>
                  </div>
                </div>
              )}

              {/* E. CONSTRUCT CHALLENGE */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-cyan-400 font-semibold">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(p => [...p, part])}
                        aria-label={`Add part: ${part}`}
                        className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 rounded-lg text-xs font-bold text-white shadow"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((p, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-emerald-900/80 border border-emerald-600 rounded-lg text-xs text-emerald-200 font-mono flex items-center gap-2"
                      >
                        {p}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setConstructParts(parts => parts.filter((_, i) => i !== idx))}
                          className="text-rose-400 font-bold hover:text-rose-200"
                        >
                          ✕
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-600">Click terms above to build the condition in sequence...</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    aria-label="Validate Construction"
                    className="px-6 py-2.5 bg-emerald-600 text-slate-950 font-black text-xs rounded-xl shadow disabled:opacity-40"
                  >
                    Verify Formulation
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Progressive Step-by-Step Explanation Disclosure */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-slate-900/95 border border-emerald-800/80 rounded-2xl space-y-4 shadow-xl"
              >
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Step-by-Step Economic Rationale
                </span>

                <div className="space-y-2">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-emerald-400">[{idx + 1}]</span> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal Next Step"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-emerald-400 border border-emerald-800/50 rounded-xl text-xs font-bold"
                    >
                      Reveal Next Reasoning Step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Next Challenge"
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Simulation 🏆' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ─── 5. COMPLETION, REFLECTION & MASTERY SUMMARY ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6 mt-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-8 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-indigo-950/70 rounded-3xl border border-emerald-600/60 shadow-2xl text-center space-y-4"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="text-5xl inline-block"
              >
                🏆
              </motion.span>
              <h2 className="text-2xl md:text-3xl font-black text-white">ICSE Economics Master Certification</h2>
              <p className="text-emerald-400 text-sm font-semibold">
                Final Proficiency Score: {Math.max(0, 100 - errors * 5)}% • Node Mastery: {masteryLevel.toUpperCase()}
              </p>
              <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                {errors === 0
                  ? 'PERFECT SCORE! You have attained comprehensive analytical mastery across all 10 market and monetary policy nodes!'
                  : errors <= 3
                  ? 'Superb performance! You possess rock-solid comprehension of ICSE Class 10 Economics concepts.'
                  : 'Good effort! Review your misconception diagnostic below to reinforce reserve ratios and tax shifting mechanics.'}
              </p>
            </motion.div>

            {/* ─── MANDATORY POST-COMPLETION REFLECTION SECTION ─── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-indigo-900/60 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                    <span>🧠</span> Post-Simulation Metacognitive Reflection
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Consolidate conceptual schemas into long-term memory through structured reflection.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-950 text-indigo-400 rounded-lg border border-indigo-800">
                  3 Prompts
                </span>
              </div>

              <div className="space-y-4">
                {REFLECTION_PROMPTS.map((prompt) => (
                  <motion.div
                    key={prompt.id}
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2"
                  >
                    <p className="text-xs font-bold text-slate-200">{prompt.question}</p>
                    <textarea
                      rows={2}
                      value={reflectionAnswers[prompt.id] || ''}
                      onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, [prompt.id]: e.target.value })}
                      placeholder={`${prompt.starter} (e.g. "${prompt.example}")`}
                      disabled={reflectionSubmitted}
                      aria-label={prompt.question}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:border-indigo-500 outline-none resize-none"
                    />
                  </motion.div>
                ))}
              </div>

              {!reflectionSubmitted ? (
                <div className="text-right pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReflectionSubmit}
                    aria-label="Submit Reflection Responses"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
                  >
                    Save Reflection Notes & Earn Long-Term Retention Badge 🎖️
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center justify-between"
                >
                  <span>✓ Reflection journal recorded to your personal ICSE mastery profile!</span>
                  <span className="font-bold uppercase tracking-wider text-[10px]">Saved</span>
                </motion.div>
              )}
            </motion.div>

            {/* Misconception Diagnostic Remediation */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-rose-950/40 border border-rose-900/60 rounded-2xl space-y-3"
              >
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                  Targeted Misconception Remediation
                </h3>
                <div className="space-y-3">
                  {hitMisconceptions.map((mIdx, i) => {
                    const m = misconceptions?.[mIdx];
                    if (!m) return null;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        className="p-4 bg-slate-900 rounded-xl border border-rose-900/40 text-xs space-y-1"
                      >
                        <p className="text-rose-400 font-semibold">❌ Trap: {m.misconception}</p>
                        <p className="text-emerald-300 font-medium">✓ ICSE Correction: {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Spaced Repetition Visibility */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase">SM-2 Spaced Repetition Schedule</span>
                <p className="text-xs text-slate-300 mt-1">
                  Next automated review scheduled in <strong className="text-white">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
                </p>
              </div>
              <span className="px-4 py-2 bg-amber-950/60 border border-amber-800 text-amber-300 rounded-xl text-xs font-bold">
                Review Cycle: Active
              </span>
            </motion.div>

            {/* Real-World Activity */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-indigo-950/40 border border-indigo-900/50 rounded-2xl space-y-3"
            >
              <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
                🌟 {REAL_WORLD_ACTIVITY.title}
              </h3>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
                {REAL_WORLD_ACTIVITY.steps.map((st, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">{idx + 1}.</span> {st}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="text-center pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('discovery');
                  setCurrentChallenge(0);
                  setErrors(0);
                  setDiscoveryAnswered(false);
                  setReflectionSubmitted(false);
                }}
                aria-label="Restart Economics Simulation"
                className="px-8 py-3 bg-slate-800 hover:bg-slate-750 text-white font-bold text-sm rounded-xl border border-slate-700 shadow-lg"
              >
                Restart Full Simulation ↺
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FEEDBACK SYSTEM OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="ICSE Economics Mastery Validated!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}

    </motion.div>
  );
}

export default C10_EconomicsPerfectCompetitionMeaningSim;
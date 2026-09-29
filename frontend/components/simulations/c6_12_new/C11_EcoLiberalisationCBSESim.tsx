'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// ALL NODE IDS FOR CISCE CLASS 11 ECONOMICS - LIBERALISATION
// ==========================================
const ALL_NODE_IDS = [
  'c11_eco_cbse_256', // Pre-1991 Indian Mixed Economy Framework
  'c11_eco_cbse_257', // Balance of Payments Crisis of 1991
  'c11_eco_cbse_258', // New Economic Policy of 1991
  'c11_eco_cbse_259', // Stabilisation Measures
  'c11_eco_cbse_260', // Rupee Devaluation of 1991
  'c11_eco_cbse_261', // Structural Reform Measures
  'c11_eco_cbse_262', // Industrial Deregulation
  'c11_eco_cbse_263', // Foreign Exchange Market Reforms
  'c11_eco_cbse_264', // Liberalisation as a Reform Strategy
  'c11_eco_cbse_265', // Financial Sector Reforms and the Changing Role of RBI
  'c11_eco_cbse_266', // Tax Reforms and Fiscal Policy
  'c11_eco_cbse_267', // Trade and Investment Policy Reforms
  'c11_eco_cbse_268', // Privatisation of Public Sector Enterprises
  'c11_eco_cbse_269', // Maharatna, Navratna and Miniratna Status for PSEs
  'c11_eco_cbse_270', // Globalisation as an Economic Process
  'c11_eco_cbse_271', // Outsourcing as an Outcome of Globalisation
  'c11_eco_cbse_272', // India's Membership in the World Trade Organisation
  'c11_eco_cbse_273', // Tariff and Non-Tariff Barriers to Trade
  'c11_eco_cbse_274', // Foreign Direct Investment and Foreign Institutional Investment
  'c11_eco_cbse_275', // Pre-Reform Indian Economic Context and Planning
  'c11_eco_cbse_276', // GDP Growth Trends and Sectoral Performance (1980-2022)
  'c11_eco_cbse_277', // Impact of Reforms on the Industrial Sector
  'c11_eco_cbse_278', // Services Sector Growth and the IT Industry
  'c11_eco_cbse_279', // Impact of Reforms on the Agriculture Sector
  'c11_eco_cbse_280', // Reforms and Fiscal Management
  'c11_eco_cbse_281', // Assessment of Economic Reforms: Opportunities and Criticisms
] as const;

type NodeId = (typeof ALL_NODE_IDS)[number];

// ==========================================
// SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: '1991 Economic Reforms & Liberalisation Command Center',
  intro:
    'Step into the Ministry of Finance in July 1991 as India faces its worst foreign exchange crisis. Reserves have plummeted to just $1.2 billion—barely enough to fund two weeks of essential imports.',
  context:
    'As the Senior Economic Advisor, you will simulate the structural reforms of LPG (Liberalisation, Privatisation, Globalisation), adjust tariff barriers, overhaul RBI regulations, execute Rupee devaluation, and observe the 30-year macroeconomic shift across Agriculture, Industry, and Services.',
};

// ==========================================
// SECTION 2: DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question:
    'In July 1991, India devalued the Indian Rupee by approximately 19-20% in two swift steps. What was the immediate macroeconomic objective of this sudden policy move?',
  options: [
    'To make imported goods cheaper for domestic consumers to reduce inflation',
    'To make Indian exports cheaper abroad, attract foreign currency, and discourage non-essential imports to stabilize the Balance of Payments',
    'To increase the tax revenue collected by state governments from export duties',
    'To replace foreign direct investment (FDI) with domestic public sector investments',
  ],
  correctIndex: 1,
  hintAfter:
    'Devaluation lowers the foreign-currency price of exports while raising domestic currency costs of imports, directly correcting a severe Trade Deficit during a foreign exchange crunch.',
};

// ==========================================
// DEFAULT PROPS / LAB INITIAL STATE
// ==========================================
interface LabState {
  forexReserves: number; // in $ Billions (0.5 to 1000)
  importWeeks: number; // weeks of import cover (1 to 60)
  rupeeDevaluationPct: number; // 0% to 30%
  industrialLicensing: boolean; // pre-1991 true, post-1991 false
  publicSectorReservedCount: number; // 17 down to 2
  mrtpLimitActive: boolean; // Monopolies & Restrictive Trade Practices Act threshold
  slrRate: number; // Statutory Liquidity Ratio (18% to 38.5%)
  crrRate: number; // Cash Reserve Ratio (4% to 15%)
  rbiRole: 'Regulator' | 'Facilitator';
  peakCustomsDuty: number; // 15% to 300%
  quantitativeRestrictions: boolean; // Import quotas active/inactive
  corporateTaxRate: number; // 22% to 45%
  fdiCapPercent: number; // 24% to 100%
  selectedYear: number; // 1990 to 2022
}

const DEFAULT_LAB_STATE: LabState = {
  forexReserves: 1.2,
  importWeeks: 2,
  rupeeDevaluationPct: 0,
  industrialLicensing: true,
  publicSectorReservedCount: 17,
  mrtpLimitActive: true,
  slrRate: 38.5,
  crrRate: 15.0,
  rbiRole: 'Regulator',
  peakCustomsDuty: 300,
  quantitativeRestrictions: true,
  corporateTaxRate: 45,
  fdiCapPercent: 24,
  selectedYear: 1991,
};

// ==========================================
// SECTION 3: EXPLORATION STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Balance of Payments Emergency & Currency Devaluation (1991 Crisis)',
    instruction:
      'Adjust the Rupee Devaluation slider and observe how import coverage and forex reserves react under emergency IMF bailouts.',
    interactionType: 'currency_devaluation_sim',
    nodeId: 'c11_eco_cbse_257' as NodeId,
  },
  {
    title: 'Lab 2: Industrial Deregulation & Licensing Overhaul (License-Permit Raj)',
    instruction:
      'Abolish industrial licensing, reduce reserved public sector industries from 17 down to 2, and dismantle MRTP asset thresholds.',
    interactionType: 'industrial_deregulation_sim',
    nodeId: 'c11_eco_cbse_262' as NodeId,
  },
  {
    title: 'Lab 3: Financial Sector Overhaul & RBI Role Transition',
    instruction:
      'Lower Statutory Liquidity Ratio (SLR) and Cash Reserve Ratio (CRR) while transitioning RBI from a rigid Regulator to a market Facilitator.',
    interactionType: 'financial_sector_sim',
    nodeId: 'c11_eco_cbse_265' as NodeId,
  },
  {
    title: 'Lab 4: Trade & Investment Liberalisation (Tariffs & WTO Alignment)',
    instruction:
      'Slashing Peak Customs Duty from 300% down to 15%, removing Quantitative Restrictions, and expanding FDI automatic approval ceilings.',
    interactionType: 'trade_policy_sim',
    nodeId: 'c11_eco_cbse_267' as NodeId,
  },
  {
    title: 'Lab 5: 30-Year Macroeconomic Trajectory & Sectoral GDP Shift (1990-2022)',
    instruction:
      'Scrub through years (1990 to 2022) to witness the structural shift of GDP from Agriculture to IT Services and Industrial output.',
    interactionType: 'macro_gdp_shift_sim',
    nodeId: 'c11_eco_cbse_276' as NodeId,
  },
];

// ==========================================
// SECTION 4: PREDICTION QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question:
      'If peak customs duty is reduced from 300% to 15% alongside the removal of quantitative import quotas, what will happen to domestic manufacturing efficiency and foreign direct investment (FDI)?',
    options: [
      'Domestic manufacturing will immediately collapse completely with zero FDI entry',
      'Increased global competition forces domestic firms to modernize, while lower tariff barriers and open policy attract surging foreign capital investment (FDI)',
      'Inflation will skyrocket to 100% because tariffs no longer collect revenues',
      'Agriculture will become 90% of total Indian GDP within five years',
    ],
    correctIndex: 1,
    verifyInstruction: 'Test this hypothesis in Lab 4 by dropping peak customs duty and expanding FDI limits!',
    nodeId: 'c11_eco_cbse_273' as NodeId,
  },
  {
    question:
      'How does reducing the Statutory Liquidity Ratio (SLR) from 38.5% to 18% impact commercial banks and private sector credit flow?',
    options: [
      'It forces commercial banks to lend 100% of their cash to the central bank',
      'It frees up a larger proportion of bank deposits for commercial lending to private businesses, boosting private investments',
      'It reduces total liquidity in the economy and triggers financial collapse',
      'It stops all private bank operations and nationalizes foreign institutions',
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 3 by lowering SLR from 38.5% down toward 18%!',
    nodeId: 'c11_eco_cbse_265' as NodeId,
  },
];

// ==========================================
// SECTION 5: OBSERVATION QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question:
      'When observing the post-1991 sectoral GDP trend from 1990 to 2022, which sector demonstrated the most dramatic surge in its percentage share of national output?',
    observableOptions: [
      'Agricultural Sector',
      'Services Sector (especially IT, Telecom, and Financial Services)',
      'Handloom and Cottage Industries',
      'Unorganized Mining Sector',
    ],
    correctIndex: 1,
    nodeId: 'c11_eco_cbse_278' as NodeId,
  },
  {
    question:
      'What structural change occurs to the Central Bank (RBI) when switching its operational mandate from "Regulator" to "Facilitator"?',
    observableOptions: [
      'RBI stops printing physical currency notes altogether',
      'RBI shifts from directly fixing interest rates and credit quotas to letting market forces determine interest rates while providing macro-prudential oversight',
      'RBI takes direct control over private commercial corporate board appointments',
      'RBI merges with international central banks into a single monetary board',
    ],
    correctIndex: 1,
    nodeId: 'c11_eco_cbse_265' as NodeId,
  },
];

// ==========================================
// SECTION 6: REAL-WORLD ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Case Study Analysis: IT Services Boom & Outward Economic Integration',
  description:
    'Examine how liberalisation of telecommunication equipment imports, software technology parks, and foreign exchange deregulation allowed Indian IT firms (e.g. Infosys, TCS, Wipro) to pioneer global IT outsourcing.',
  steps: [
    'Calculate export growth: In 1990-91, India’s software exports stood at ~$100 million. By 2021-22, software exports exceeded $150 billion.',
    'Compute the growth factor: $150,000 Million / $100 Million = 1,500x expansion over 30 years.',
    'Analyze trade balance impact: Software services invisible earnings offset a significant portion of India’s merchandise trade deficit.',
    'Formulate policy summary: Explain how removing import licensing on hardware and easing FDI caps in telecom unlocked comparative advantage in human capital.',
  ],
};

// ==========================================
// MISCONCEPTIONS (6 Topic-Specific Items)
// ==========================================
interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
  nodeId: NodeId;
}

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    title: 'Stabilisation vs Structural Reform Confusion',
    description:
      'Students often assume that short-term Stabilisation Measures and long-term Structural Reforms are identical.',
    correction:
      'Stabilisation measures (e.g., currency devaluation, inflation control, foreign reserve buildup) are short-term crisis response tools. Structural reforms (e.g., industrial deregulation, trade policy changes, privatisation) are long-term supply-side policy shifts aimed at improving economic efficiency.',
    nodeId: 'c11_eco_cbse_259',
  },
  {
    id: 'misc_2',
    title: 'Liberalisation Means Complete Removal of All Controls',
    description:
      'Students frequently believe Liberalisation implies total absence of government regulations.',
    correction:
      'Liberalisation means replacing cumbersome discretionary administrative controls (License-Permit Raj) with transparent, market-friendly regulatory frameworks overseen by independent regulators (like SEBI, IRDAI, CCI).',
    nodeId: 'c11_eco_cbse_264',
  },
  {
    id: 'misc_3',
    title: 'Privatisation vs Disinvestment Homogeneity',
    description:
      'Belief that selling a 5% minority stake in a public sector enterprise (PSE) is the same as full privatisation.',
    correction:
      'Disinvestment involves selling a fraction of equity (e.g., 5-10%) while retaining majority government control (>=51%). Privatisation occurs when government transfers majority ownership (>50%) or management control to private hands (strategic sale).',
    nodeId: 'c11_eco_cbse_268',
  },
  {
    id: 'misc_4',
    title: 'FDI and FII Are Identical Capital Inflows',
    description:
      'Confusing Foreign Direct Investment (FDI) with Foreign Institutional Investment (FII / Foreign Portfolio Investment).',
    correction:
      'FDI involves long-term physical investment in domestic assets, technology, and management control. FII involves short-term speculative purchases of equities/bonds in stock markets ("hot money") without managerial ownership.',
    nodeId: 'c11_eco_cbse_274',
  },
  {
    id: 'misc_5',
    title: 'Reforms Benefited All Sectors Equally',
    description:
      'Assuming that 1991 reforms spurred equal growth across Agriculture, Industry, and Services.',
    correction:
      'Post-1991 reforms primarily catalyzed the Services sector (IT, finance, telecom) and selective industries. Agriculture suffered from reduced public capital investment, lower subsidies, and exposure to international price volatility.',
    nodeId: 'c11_eco_cbse_279',
  },
  {
    id: 'misc_6',
    title: 'Devaluation Automatically Increases Foreign Exchange Reserves',
    description:
      'Assuming currency devaluation directly deposits dollars into government coffers without market trade mechanics.',
    correction:
      'Devaluation makes domestic exports price-competitive abroad and imports costlier. Forex reserves increase only if export volume responds elastically and trade balance improves (Marshall-Learner Condition).',
    nodeId: 'c11_eco_cbse_260',
  },
];

// ==========================================
// DIAGNOSTIC QUESTIONS (8 ITEMS)
// ==========================================
interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  nodeId: NodeId;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    question: 'Which foreign exchange reserve level triggered India to approach the IMF and World Bank in 1991?',
    options: ['$50 Billion', '$1.2 Billion (barely 2 weeks of imports)', '$100 Billion', '$25 Billion'],
    correctIndex: 1,
    explanation:
      'By mid-1991, foreign exchange reserves plunged to $1.2 billion, sufficient for only two weeks of import coverage, forcing immediate emergency reforms.',
    nodeId: 'c11_eco_cbse_257',
  },
  {
    id: 'diag_2',
    question: 'Under industrial deregulation, how many industries were initially reserved for the public sector in 1991?',
    options: ['17 industries', '3 industries', '50 industries', '0 industries'],
    correctIndex: 0,
    explanation:
      'Prior to 1991, 17 key heavy industries were reserved exclusively for the public sector. This was reduced to 8 in 1991, and later to just 2 (Atomic Energy & Railway Transport).',
    nodeId: 'c11_eco_cbse_262',
  },
  {
    id: 'diag_3',
    question: 'What shift in the RBI’s primary economic role occurred as part of financial sector reforms?',
    options: [
      'From a Market Facilitator to a Direct Commercial Lender',
      'From a Rigid Regulator fixing interest rates to a Market Facilitator enabling monetary autonomy',
      'From a Tax Collector to a Foreign Currency Trader',
      'From a Monetary Authority to a Private Bank Manager',
    ],
    correctIndex: 1,
    explanation:
      'RBI transitioned from dictating bank interest rates and credit ceilings (Regulator) to enabling commercial banks to set their own interest rates based on market conditions (Facilitator).',
    nodeId: 'c11_eco_cbse_265',
  },
  {
    id: 'diag_4',
    question: 'What is the key structural difference between FDI and FII?',
    options: [
      'FDI buys physical long-term assets & capital, while FII purchases financial stocks/bonds short-term',
      'FDI is illegal in India, while FII is government funded',
      'FDI is only for agriculture, while FII is for mining',
      'FDI comes from World Bank, while FII comes from domestic saving banks',
    ],
    correctIndex: 0,
    explanation:
      'FDI brings physical investment, capital stock, technology, and management involvement. FII represents portfolio holdings in stock markets that can be liquidated rapidly ("hot money").',
    nodeId: 'c11_eco_cbse_274',
  },
  {
    id: 'diag_5',
    question: 'Why did the New Economic Policy of 1991 devalue the Indian Rupee by ~19-20%?',
    options: [
      'To increase government tax collection on domestic retail transactions',
      'To make Indian exports cheaper for foreign buyers and discourage imports, correcting BOP deficit',
      'To satisfy domestic trade unions demanding lower wages',
      'To reduce the total quantity of agricultural food grains exported to Africa',
    ],
    correctIndex: 1,
    explanation:
      'Devaluation lowered the export prices in dollar terms while making imports costlier in rupees, stimulating export demand and tackling the BoP deficit.',
    nodeId: 'c11_eco_cbse_260',
  },
  {
    id: 'diag_6',
    question: 'Which organisation succeeded GATT (General Agreement on Tariffs and Trade) in 1995 with India as a founding member?',
    options: ['IMF', 'World Bank', 'WTO (World Trade Organization)', 'UNCTAD'],
    correctIndex: 2,
    explanation:
      'India was a founding member of the World Trade Organization (WTO), established on January 1, 1995, to regulate international trade.',
    nodeId: 'c11_eco_cbse_272',
  },
  {
    id: 'diag_7',
    question: 'What status was granted to high-performing public sector enterprises (PSEs) like ONGC, NTPC, and IOCL to give them financial operational autonomy?',
    options: ['Pancharatna Status', 'Maharatna and Navratna Status', 'Private Enterprise License', 'BIFR Referral Status'],
    correctIndex: 1,
    explanation:
      'To improve efficiency and managerial autonomy without privatisation, top PSEs were granted Navratna and Maharatna status with higher capital expenditure sanction limits.',
    nodeId: 'c11_eco_cbse_269',
  },
  {
    id: 'diag_8',
    question: 'Which sector experienced sluggish growth post-1991 due to falling public investment and subsidy reductions?',
    options: ['Information Technology', 'Telecommunications', 'Agriculture', 'Banking & Finance'],
    correctIndex: 2,
    explanation:
      'Reforms largely concentrated on industrial, financial, and foreign trade policies. Agriculture suffered from declining public investment in irrigation, infrastructure, and cutbacks in fertilizer subsidies.',
    nodeId: 'c11_eco_cbse_279',
  },
];

// ==========================================
// SECTION 7: CHALLENGES (22+ Items Across 3 Tiers)
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'classify' | 'numeric' | 'distinguish' | 'construct' | 'drag-sort' | 'multiple-choice';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'ch_1',
    nodeId: 'c11_eco_cbse_256',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Prior to 1991, the Indian economic framework was best characterized as a:',
    options: [
      'Pure Capitalist Market Economy',
      'Inward-looking Mixed Economy with excessive regulation (License Raj)',
      'Fully Privatized Free-Trade Zone',
      'Stateless Anarcho-Capitalism',
    ],
    correctIndex: 1,
    explanation:
      'Pre-1991 India followed a mixed economy model emphasizing heavy public sector intervention, strict licensing, import substitution, and high tariffs.',
    hints: [
      'Think about government control over industrial approvals.',
      'It combined private business with massive state command.',
      'It was known as the License-Permit-Quota Raj.',
    ],
  },
  {
    id: 'ch_2',
    nodeId: 'c11_eco_cbse_257',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which immediate crisis forced India to approach the IMF for a $7 Billion loan in 1991?',
    options: [
      'Hyperinflation of 500%',
      'Severe Foreign Exchange / Balance of Payments Crisis',
      'Collapse of the Stock Exchange',
      'Drought in all 28 states',
    ],
    correctIndex: 1,
    explanation:
      'Foreign exchange reserves plummeted to $1.2B in July 1991, barely sufficient for 2 weeks of imports, alongside debt service default risks.',
    hints: [
      'Look at foreign currency reserves.',
      'It relates to paying for vital imports like crude oil.',
      'Balance of Payments emergency.',
    ],
  },
  {
    id: 'ch_3',
    nodeId: 'c11_eco_cbse_258',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'The New Economic Policy (NEP) introduced in 1991 was founded on which three pillar strategies?',
    options: [
      'Nationalisation, Regulation, Tariffisation',
      'Liberalisation, Privatisation, Globalisation (LPG)',
      'Subsidisation, Centralisation, Monopolisation',
      'Urbanisation, Industrialisation, Mechanisation',
    ],
    correctIndex: 1,
    explanation: 'The core strategy of NEP 1991 is famously encapsulated by LPG: Liberalisation, Privatisation, and Globalisation.',
    hints: [
      'Acronym is LPG.',
      'Freedom for private enterprise, state divestment, global trade integration.',
      'Liberalisation, Privatisation, Globalisation.',
    ],
  },
  {
    id: 'ch_4',
    nodeId: 'c11_eco_cbse_259',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Stabilisation measures under NEP 1991 were primarily intended to achieve which short-term goal?',
    options: [
      'Build long-term highways across India',
      'Correct Balance of Payments deficits and control domestic inflation',
      'Privatise all state universities',
      'Abolish direct income taxes completely',
    ],
    correctIndex: 1,
    explanation:
      'Stabilisation measures were short-term corrective policies designed to boost foreign reserves and bring inflation under control.',
    hints: [
      'Focus on short-term macro economic stability.',
      'It tackled reserves and rising prices.',
      'BOP crisis management and inflation control.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_5',
    nodeId: 'c11_eco_cbse_262',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Under industrial policy reforms, licensing was abolished for all except a small list of hazardous or strategic industries. Which of these still requires an industrial license today?',
    options: ['Textile production', 'Electronic aerospace & defense equipment / hazardous chemicals', 'Bicycle manufacturing', 'Footwear production'],
    correctIndex: 1,
    explanation:
      'Industrial licensing was abolished for almost all sectors except hazardous chemicals, industrial explosives, defense aerospace, and specified drugs.',
    hints: [
      'Think safety, explosives, and national defense.',
      'Hazardous or security-sensitive goods.',
      'Defense equipment & hazardous chemicals.',
    ],
  },
  {
    id: 'ch_6',
    nodeId: 'c11_eco_cbse_270',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Globalisation as an economic process fundamentally involves:',
    options: [
      'Closing borders to foreign tourists',
      'Integrating national economies with the global economy through trade, capital, and labor flows',
      'Banning foreign language educational institutions',
      'Replacing gold currency with digital coins',
    ],
    correctIndex: 1,
    explanation:
      'Globalisation refers to the integration of the domestic economy with the world economy through free cross-border movement of goods, services, capital, and technology.',
    hints: [
      ' think global interconnectedness.',
      'Free flow of goods, services, and investment across national frontiers.',
      'Economic integration across countries.',
    ],
  },
  {
    id: 'ch_7',
    nodeId: 'c11_eco_cbse_271',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why did India become a premier global destination for Business Process Outsourcing (BPO) post-1991?',
    options: [
      'India had the highest tax rates in Asia',
      'Availability of skilled, English-speaking manpower at competitive wage costs alongside IT infrastructure growth',
      'Indian laws forced foreign companies to relocate headquarters to Mumbai',
      'India banned all domestic software production',
    ],
    correctIndex: 1,
    explanation:
      'India’s large pool of educated, English-speaking STEM graduates and lower labor costs made it ideal for global software development and customer care outsourcing.',
    hints: [
      'Consider labor skill and wage differentials.',
      'English proficiency + tech talents.',
      'Skilled human capital at lower cost.',
    ],
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'ch_8',
    nodeId: 'c11_eco_cbse_260',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'If the exchange rate in June 1991 was ₹21 per $1 USD, and the Rupee was devalued by 20% in July 1991, what was the new exchange rate in ₹/USD?',
    options: ['₹22.50', '₹25.20', '₹28.00', '₹30.50'],
    correctIndex: 1,
    explanation: 'Devaluation calculation: ₹21 + (20% of ₹21) = ₹21 + ₹4.20 = ₹25.20 per USD.',
    hints: [
      'Calculate 20% of 21.',
      '21 * 0.20 = 4.20.',
      'Add 4.20 to 21 = 25.20.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_9',
    nodeId: 'c11_eco_cbse_265',
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'When the RBI reduced the Statutory Liquidity Ratio (SLR) from 38.5% to 18%, how did this impact commercial bank lending capacity to private borrowers?',
    options: [
      'Reduced commercial bank lending capacity by locking up money in government securities',
      'Increased commercial bank disposable funds available for private loans by 20.5% of net demand and time liabilities (NDTL)',
      'Had zero impact on commercial bank liquidity',
      'Forced commercial banks to shut down rural branches',
    ],
    correctIndex: 1,
    explanation:
      'Lowering SLR reduces mandatory bank investments in low-yield government bonds, releasing a higher percentage of deposits into commercial credit channels.',
    hints: [
      'SLR is the percentage of deposits banks must keep in statutory liquid government assets.',
      'Dropping SLR from 38.5% to 18% unlocks funds.',
      '38.5% - 18% = 20.5% more funds released for corporate/private loans.',
    ],
  },
  {
    id: 'ch_10',
    nodeId: 'c11_eco_cbse_266',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Why were direct tax rates (such as individual income tax and corporate taxes) progressively reduced during tax reforms post-1991?',
    options: [
      'To deliberately impoverish the central government treasury',
      'To encourage honest tax compliance, reduce tax evasion, and widen the net total tax yield',
      'Because rich taxpayers staged a strike in 1992',
      'To satisfy international WTO mandates on personal income',
    ],
    correctIndex: 1,
    explanation:
      'High tax rates incentivized tax evasion and black money creation. Lowering tax rates enhanced compliance, broadened the taxpayer base, and ultimately raised total tax revenue collection.',
    hints: [
      'Laffer curve concept.',
      'Moderate tax rates discourage evasion.',
      'Promote voluntary compliance and broaden tax base.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: 'c11_eco_cbse_267',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What was the major shift in India’s Foreign Trade Policy post-1991 regarding Quantitative Restrictions (QRs)?',
    options: [
      'QRs were expanded to cover all agricultural produce',
      'Quantitative import quotas and discretionary import licenses were systematically dismantled',
      'Import quotas were replaced by a total trade embargo on North America',
      'QRs were doubled for industrial raw materials',
    ],
    correctIndex: 1,
    explanation:
      'In line with WTO guidelines and liberalisation, quantitative import quotas were systematically removed by April 2001, replacing discretionary quotas with ad-valorem tariffs.',
    hints: [
      'Quantitative restrictions set physical limits on imports.',
      'Liberalisation replaced quotas with tariffs.',
      'Dismantled import licensing and quotas.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: 'c11_eco_cbse_268',
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Which statement accurately distinguishes Disinvestment from Strategic Sale in Public Sector Enterprises?',
    options: [
      'Disinvestment sells equity in stock markets while retaining government ownership (>=51%); Strategic Sale transfers majority stake (>50%) and management control to a private buyer',
      'Disinvestment means shutting down a factory; Strategic Sale means giving it to government employees',
      'Strategic Sale is only done for profitable Navratna companies; Disinvestment is for loss-making firms',
      'There is no economic difference between the two terms',
    ],
    correctIndex: 0,
    explanation:
      'Disinvestment typically involves selling minor equity shares (e.g. 5-10%) to financial institutions/public while retaining state control. Strategic sale involves selling 51%+ along with managerial control to a strategic partner.',
    hints: [
      'Look at management control transfer.',
      'Disinvestment = minority share sale.',
      'Strategic Sale = transfer of control & majority equity.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_13',
    nodeId: 'c11_eco_cbse_273',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'How did cutting peak customs duties from 300% to 15% affect domestic manufacturing industries?',
    options: [
      'It sheltered domestic industries from all global efficiency pressures',
      'It exposed domestic manufacturers to global competition, incentivizing capital modernization and cheaper imported raw materials',
      'It completely destroyed all Indian manufacturing within 3 months',
      'It caused foreign imports to be banned entirely',
    ],
    correctIndex: 1,
    explanation:
      'Lower tariffs lowered raw material import costs while exposing domestic producers to foreign competitive pressure, driving efficiency gains and quality improvements.',
    hints: [
      'High tariffs acted as a protectionist wall.',
      'Lower tariffs reduce cost of capital inputs.',
      'Exposed domestic industry to global competition & efficiency.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: 'c11_eco_cbse_274',
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why is Foreign Direct Investment (FDI) generally preferred over Foreign Institutional Investment (FII) by macroeconomists?',
    options: [
      'FII provides long-term physical infrastructure while FDI is hot money',
      'FDI brings stable, long-term capital, physical production capacity, and technology transfer, whereas FII can be quickly withdrawn during financial distress',
      'FDI does not require foreign currency exchange',
      'FII pays higher corporate income taxes to local municipalities',
    ],
    correctIndex: 1,
    explanation:
      'FDI creates physical assets, employment, and technology spillovers with long-term commitment, whereas FII portfolio money can rapidly flight out during market volatility.',
    hints: [
      'Consider volatility vs physical asset creation.',
      'FDI is long-term physical investment.',
      'FII is volatile short-term portfolio capital ("hot money").',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_15',
    nodeId: 'c11_eco_cbse_277',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What was the primary impact of cheap manufactured imports post-liberalisation on certain domestic manufacturing sub-sectors (like capital goods)?',
    options: [
      'Domestic capital goods output grew by 500% annually',
      'Domestic capital goods sub-sectors faced slowdown due to cheaper imported machinery competition and inadequate domestic infrastructure',
      'Capital goods factories were nationalized by the state',
      'All capital goods manufacturing was shifted to rural cooperatives',
    ],
    correctIndex: 1,
    explanation:
      'Cheaper imported goods and machinery hit certain domestic capital goods industries that could not compete with lower foreign prices and superior technology.',
    hints: [
      'Think about competition from cheaper foreign imports.',
      'Domestic manufacturers faced tariff reduction pressure.',
      'Import competition depressed domestic capital goods demand.',
    ],
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'ch_16',
    nodeId: 'c11_eco_cbse_261',
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Sequence the post-1991 reform milestones chronologically from earliest (1991) to latest (2001):',
    options: [
      '1. Devaluation of Indian Rupee (July 1991)',
      '2. Abolition of Industrial Licensing for most sectors (July 1991)',
      '3. Establishment of WTO with India as Founding Member (Jan 1995)',
      '4. Complete Removal of Quantitative Restrictions on Imports (April 2001)',
    ],
    correctIndex: 0,
    explanation:
      'Chronology: Currency Devaluation (July 1 & 3, 1991) -> Industrial Deregulation (July 24, 1991) -> WTO Founding (Jan 1, 1995) -> QR Removal (April 1, 2001).',
    hints: [
      'Currency devaluation happened in the first week of July 1991.',
      'Industrial Policy Statement was announced late July 1991.',
      'WTO was created in 1995; QRs were fully phased out by April 2001.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: 'c11_eco_cbse_269',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'What is the operational rationale behind granting Maharatna and Navratna status to central public sector enterprises (CPSEs)?',
    options: [
      'To prepare them for immediate liquidation and closure',
      'To grant financial and managerial autonomy, allowing them to make major capital expenditure decisions without prior ministry approval',
      'To mandate that 100% of their profits be given to foreign investors',
      'To exempt them from domestic labor laws',
    ],
    correctIndex: 1,
    explanation:
      'Navratna/Maharatna boards receive delegated financial powers (e.g., investing up to ₹5,000 crore without government approval for Maharatna) to operate like competitive global MNCs.',
    hints: [
      'Focus on managerial independence.',
      'Allows high capital expenditure without red tape.',
      'Grants financial autonomy and operational flexibility.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: 'c11_eco_cbse_276',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'In 1990, Agriculture contributed ~30% to India’s GDP, while Services contributed ~43%. By 2020, Agriculture dropped to ~18% while Services surged to ~54%. What was the net percentage point change in the Services sector share of GDP?',
    options: ['+7 percentage points', '+11 percentage points', '+18 percentage points', '+25 percentage points'],
    correctIndex: 1,
    explanation: 'Calculation: 54% - 43% = +11 percentage points increase in Services GDP contribution.',
    hints: [
      'Subtract 1990 Services share from 2020 Services share.',
      '54% minus 43%.',
      '54 - 43 = 11.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: 'c11_eco_cbse_279',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Critical Analysis: Why did the agricultural sector register lower growth performance during the post-reform period (1991-2012)?',
    options: [
      'Farmers were forced to export 100% of food grains to European markets',
      'Reduction in public infrastructure investment (irrigation/power), withdrawal of fertilizer subsidies raising input costs, and WTO tariff reductions',
      'Agricultural land was completely nationalized by state governments',
      'Rainfall stopped completely across India for two decades',
    ],
    correctIndex: 1,
    explanation:
      'Agricultural deceleration post-1991 stemmed from shrinking public capital investment, reduced fertilizer/power subsidies, removal of minimum support price cushions, and exposure to fluctuating global prices.',
    hints: [
      'Public investment in irrigation declined.',
      'Removal of price supports and high input costs.',
      'Falling public capital formation and subsidy rationalization.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_20',
    nodeId: 'c11_eco_cbse_280',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'How did tax cuts and fiscal management policies under reforms aim to lower the Gross Fiscal Deficit as a percentage of GDP?',
    options: [
      'By stopping all salary payments to civil servants',
      'By expanding the tax base, curtailing non-developmental subsidies, and implementing the FRBM Act (Fiscal Responsibility and Budget Management)',
      'By borrowing unlimited funds from foreign commercial banks without interest',
      'By printing ₹5,000 notes every week',
    ],
    correctIndex: 1,
    explanation:
      'Fiscal consolidation relied on tax rationalization to boost revenue compliance, disinvesting inefficient state assets, curbing non-essential government expenditure, and target capping deficits under FRBM guidelines.',
    hints: [
      'Think fiscal prudence and discipline.',
      'Tax base expansion + spending discipline (FRBM Act).',
      'Revenue compliance expansion and expenditure rationalization.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: 'c11_eco_cbse_281',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In an overall macroeconomic assessment of 1991 reforms, which of the following represents a major structural criticism raised by economists?',
    options: [
      'India’s foreign exchange reserves increased too rapidly',
      'Growth was predominantly driven by capital-intensive Services (jobless growth trends) with widening rural-urban inequality and informal employment dominance',
      'Inflation was reduced to 0% forever',
      'India’s trade ratio became 0% of GDP',
    ],
    correctIndex: 1,
    explanation:
      'While GDP growth accelerated significantly post-1991, critics highlight that growth concentrated in skill-intensive services rather than employment-heavy manufacturing, leading to uneven distribution of economic gains.',
    hints: [
      'Consider employment creation vs GDP growth.',
      'Services growth requires higher education skills.',
      'Jobless growth trend & widening regional/income inequalities.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: 'c11_eco_cbse_272',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'As a WTO member, India was obligated to remove Quantitative Restrictions (QRs) and convert them into bound tariff rates. How does WTO membership impact developing countries like India?',
    options: [
      'It provides market access to global exports, but limits domestic policy space regarding agricultural subsidies (TRIPS, TRIMs, AoA)',
      'It bans developing countries from trading with developed nations',
      'It forces all member countries to adopt a single currency like the Euro',
      'It eliminates all domestic patent laws completely',
    ],
    correctIndex: 0,
    explanation:
      'WTO membership grants MFN (Most Favoured Nation) status and global market entry for exports, but mandates compliance with strict trade disciplines on tariffs, Intellectual Property (TRIPS), and domestic agricultural subsidies.',
    hints: [
      'Consider benefits (market access) vs constraints (rules on subsidies).',
      'MFN status vs obligations on trade barriers.',
      'Global market access balanced against subsidy caps & IP rules.',
    ],
  },
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS (3+ Topic Specific)
// ==========================================

// Diagram 1: BoP Foreign Exchange Reserve Depletion & Recovery Trajectory (1990-1995)
const BoPCrisisDiagram: React.FC<{ reserves: number; devaluationPct: number }> = ({ reserves, devaluationPct }) => {
  const points = [
    { year: '1989', val: 3.5 },
    { year: '1990', val: 2.2 },
    { year: 'Jul 1991', val: reserves }, // Interactive
    { year: '1992', val: Math.max(reserves + 4.5 + devaluationPct * 0.3, 5.0) },
    { year: '1993', val: Math.max(reserves + 9.8 + devaluationPct * 0.4, 10.2) },
    { year: '1995', val: Math.max(reserves + 20.0 + devaluationPct * 0.5, 22.4) },
  ];

  const width = 460;
  const height = 200;
  const padding = 40;

  const maxVal = 30;
  const getX = (i: number) => padding + (i * (width - 2 * padding)) / (points.length - 1);
  const getY = (val: number) => height - padding - (val / maxVal) * (height - 2 * padding);

  const pathD = points.reduce((acc, pt, i) => {
    return `${acc} ${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(pt.val)}`;
  }, '');

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-bold text-amber-400 flex items-[#38bdf8] gap-2">
          <span>📉</span> Foreign Exchange Reserves Trajectory ($ Billions)
        </h4>
        <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
          Devaluation Effect: +{devaluationPct}%
        </span>
      </div>
      <svg width={width} height={height} className="w-full h-auto overflow-visible">
        {/* Grid lines */}
        {[0, 10, 20, 30].map((level) => (
          <g key={level}>
            <line
              x1={padding}
              y1={getY(level)}
              x2={width - padding}
              y2={getY(level)}
              stroke="#334155"
              strokeDasharray="4 4"
            />
            <text x={padding - 8} y={getY(level) + 4} fill="#94a3b8" fontSize="10" textAnchor="end">
              ${level}B
            </text>
          </g>
        ))}

        {/* Crisis Danger Zone ($1.2B line) */}
        <line x1={padding} y1={getY(1.2)} x2={width - padding} y2={getY(1.2)} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x={width - padding - 10} y={getY(1.2) - 6} fill="#f87171" fontSize="10" textAnchor="end" fontWeight="bold">
          Emergency Threshold ($1.2B)
        </text>

        {/* Trend Area Fill */}
        <path
          d={`${pathD} L ${getX(points.length - 1)} ${getY(0)} L ${getX(0)} ${getY(0)} Z`}
          fill="url(#forexGrad)"
          opacity="0.3"
        />

        {/* Trend Line */}
        <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Gradient Def */}
        <defs>
          <linearGradient id="forexGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Data points */}
        {points.map((pt, i) => (
          <g key={i}>
            <circle
              cx={getX(i)}
              cy={getY(pt.val)}
              r={i === 2 ? 6 : 4}
              fill={i === 2 ? '#f59e0b' : '#38bdf8'}
              stroke="#0f172a"
              strokeWidth="2"
            />
            <text x={getX(i)} y={getY(pt.val) - 10} fill="#f1f5f9" fontSize="11" textAnchor="middle" fontWeight="bold">
              ${pt.val.toFixed(1)}B
            </text>
            <text x={getX(i)} y={height - 15} fill="#94a3b8" fontSize="10" textAnchor="middle">
              {pt.year}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-2 text-xs text-slate-400 text-center">
        1991 Crisis: Reserves collapsed to 2 weeks of imports. Post-devaluation & IMF stabilization reversed the drop.
      </div>
    </div>
  );
};

// Diagram 2: Industrial Licensing & De-reservation Matrix SVG Visualizer
const IndustrialLicensingVisualizer: React.FC<{
  licensingActive: boolean;
  reservedCount: number;
  mrtpActive: boolean;
}> = ({ licensingActive, reservedCount, mrtpActive }) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white shadow-xl">
      <h4 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
        <span>🏭</span> License-Permit-Quota Raj vs Liberalized Industrial Architecture
      </h4>
      <div className="grid grid-cols-3 gap-3">
        {/* Box 1: Licensing */}
        <div
          className={`p-3 rounded-lg border transition-all ${
            licensingActive
              ? 'bg-red-950/40 border-red-600/50 text-red-200'
              : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
          }`}
        >
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Industrial Licensing</div>
          <div className="text-base font-bold mt-1">{licensingActive ? '🔒 Mandatory Approval' : '🔓 Deregulated (Free Entry)'}</div>
          <div className="text-xs mt-2 text-slate-300">
            {licensingActive
              ? 'Red tape delays capacity expansion and new factory establishment.'
              : 'Automatic approval route for capital investment and expansion.'}
          </div>
        </div>

        {/* Box 2: Public Sector Reservation */}
        <div className="p-3 rounded-lg border bg-slate-800/60 border-slate-600 text-slate-200">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Reserved Industries</div>
          <div className="text-base font-bold mt-1 text-amber-400">{reservedCount} Sectors Reserved</div>
          <div className="text-xs mt-2 text-slate-300">
            {reservedCount > 5
              ? 'Pre-1991: 17 strategic heavy industries reserved strictly for state monopolies.'
              : 'Post-1991: Reduced to 2 (Atomic Energy & Railway Operations).'}
          </div>
        </div>

        {/* Box 3: MRTP Act Asset Limit */}
        <div
          className={`p-3 rounded-lg border transition-all ${
            mrtpActive
              ? 'bg-amber-950/40 border-amber-600/50 text-amber-200'
              : 'bg-gold-950/40 border-gold-500/50 text-gold-200'
          }`}
        >
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">MRTP Monopoly Limit</div>
          <div className="text-base font-bold mt-1">{mrtpActive ? '⚠️ Asset Cap Active' : '🚀 Limit Scrapped'}</div>
          <div className="text-xs mt-2 text-slate-300">
            {mrtpActive
              ? 'Firms with assets > ₹100 Crore required prior clearance to expand.'
              : 'Focus shifted to fair competition regulation under Competition Act.'}
          </div>
        </div>
      </div>
    </div>
  );
};

// Diagram 3: RBI Role Shift & Banking Liquidity Flow Diagram
const FinancialSectorDiagram: React.FC<{
  rbiRole: 'Regulator' | 'Facilitator';
  slr: number;
  crr: number;
}> = ({ rbiRole, slr, crr }) => {
  const creditToPrivate = Math.round(100 - (slr + crr));

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white shadow-xl">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-bold text-gold-400 flex items-center gap-2">
          <span>🏦</span> Central Bank (RBI) & Commercial Liquidity Flow
        </h4>
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full border ${
            rbiRole === 'Regulator'
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              : 'bg-gold-500/20 text-gold-300 border-gold-500/40'
          }`}
        >
          Role: {rbiRole}
        </span>
      </div>

      {/* Credit Allocation Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1 font-semibold">
          <span className="text-rose-400">Locked Statutory Reserve (CRR + SLR): {(slr + crr).toFixed(1)}%</span>
          <span className="text-emerald-400">Commercial Credit Capacity: {creditToPrivate.toFixed(1)}%</span>
        </div>
        <div className="w-full h-5 bg-slate-800 rounded-full overflow-hidden flex border border-slate-700">
          <div className="bg-rose-500 h-full transition-all duration-500" style={{ width: `${slr + crr}%` }} title="SLR + CRR" />
          <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${creditToPrivate}%` }} title="Private Credit" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-800/50 p-2.5 rounded border border-slate-700">
          <div className="text-slate-400 font-medium">Statutory Liquidity Ratio (SLR)</div>
          <div className="text-lg font-bold text-amber-300">{slr}%</div>
          <div className="text-slate-400 text-[11px] mt-0.5">Pre-1991: 38.5% ��� Post-1991: Phased down to ~18%</div>
        </div>
        <div className="bg-slate-800/50 p-2.5 rounded border border-slate-700">
          <div className="text-slate-400 font-medium">Cash Reserve Ratio (CRR)</div>
          <div className="text-lg font-bold text-amber-300">{crr}%</div>
          <div className="text-slate-400 text-[11px] mt-0.5">Pre-1991: 15.0% → Post-1991: Reduced to 4.0%</div>
        </div>
      </div>
    </div>
  );
};

// Diagram 4: 30-Year Sectoral Share of GDP Structural Shift (1980 - 2022)
const SectoralGDPGraph: React.FC<{ year: number }> = ({ year }) => {
  // Simple interpolation logic for GDP percentages based on year
  const t = (year - 1990) / (2022 - 1990);
  const clampedT = Math.max(0, Math.min(1, t));

  const agriPct = Math.round(31.5 - clampedT * 15.5); // ~31.5% down to 16%
  const indPct = Math.round(27.5 + Math.sin(clampedT * Math.PI) * 2.5); // ~27.5%
  const servPct = 100 - (agriPct + indPct); // Remainder -> Services (~41% up to ~55%)

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white shadow-xl">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2">
          <span>📊</span> Macro Structural Shift: GDP Sectoral Composition ({year})
        </h4>
        <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/40 font-mono">
          Year: {year}
        </span>
      </div>

      <div className="space-y-3">
        {/* Agriculture */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-emerald-400 font-medium">🌾 Agriculture & Allied Sectors</span>
            <span className="font-bold">{agriPct}% of GDP</span>
          </div>
          <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${agriPct}%` }} />
          </div>
        </div>

        {/* Industry */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-amber-400 font-medium">🏗️ Industry & Manufacturing</span>
            <span className="font-bold">{indPct}% of GDP</span>
          </div>
          <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${indPct}%` }} />
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gold-400 font-medium">💻 Services & IT Boom</span>
            <span className="font-bold">{servPct}% of GDP</span>
          </div>
          <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div className="bg-gold-500 h-full transition-all duration-300" style={{ width: `${servPct}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-slate-400 bg-slate-850 p-2 rounded border border-slate-800">
        💡 Key Takeaway: Post-1991 reforms catalyzed service-led growth (IT, telecommunications, financial services) skipping the classic heavy manufacturing dominance seen in East Asian economies.
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================
export const C11_EcoLiberalisationCBSESim: React.FC<{
  onComplete?: (score: number) => void;
}> = ({ onComplete }) => {
  // --- STATE SETUP ---
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [labState, setLabState] = useState<LabState>(DEFAULT_LAB_STATE);
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Challenge execution state
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Feedback & Audio / Visual States
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Prediction & Discovery state
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<{ [key: number]: number }>({});
  const [observationAnswers, setObservationAnswers] = useState<{ [key: number]: number }>({});

  // BKT Tracking State
  const [bktStateMap, setBktStateMap] = useState<{ [key in NodeId]?: ReturnType<typeof createBKTState> }>({});

  // SRS Tracking State
  const [srsMap, setSrsMap] = useState<{ [key in NodeId]?: ReturnType<typeof createReviewItem> }>({});

  // Auto-hint Ref Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize BKT & SRS states for all nodes
  useEffect(() => {
    const initialBkt: { [key in NodeId]?: ReturnType<typeof createBKTState> } = {};
    const initialSrs: { [key in NodeId]?: ReturnType<typeof createReviewItem> } = {};

    ALL_NODE_IDS.forEach((nodeId) => {
      initialBkt[nodeId] = createBKTState();
      initialSrs[nodeId] = createReviewItem(nodeId);
    });

    setBktStateMap(initialBkt);
    setSrsMap(initialSrs);

    // Initial voice introduction
    speechManager.speak('Welcome to the 1991 Economic Reforms and Liberalisation Interactive Command Center.');
  }, []);

  // Reset inactivity timer for auto-hinting
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 12000); // 12 seconds inactivity trigger
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIdx, activeTab, resetInactivityTimer]);

  // Current challenge derived from array
  const currentChallenge = CHALLENGES[currentChallengeIdx];

  // Answer Submission Handler for Challenges
  const handleAnswerSubmit = (optionIndex: number) => {
    if (isAnswerSubmitted) return;

    setSelectedAnswerIndex(optionIndex);
    setIsAnswerSubmitted(true);

    const isCorrect = optionIndex === currentChallenge.correctIndex;
    const currentNodeId = currentChallenge.nodeId;

    // Audio & Voice Feedback
    if (isCorrect) {
      audioManager.play('success');
      audioManager.play('sparkle');
      speechManager.speak('Correct! Excellent economic analysis.');
      setShowSparkle(true);
      setScore((prev) => prev + 10);
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect. Review the underlying economic policy mechanism.');
    }

    // Update BKT state
    const currentBkt = bktStateMap[currentNodeId] || createBKTState();
    const updatedBkt = bktUpdate(currentBkt, isCorrect);
    setBktStateMap((prev) => ({ ...prev, [currentNodeId]: updatedBkt }));

    // Update SRS state
    const currentSrs = srsMap[currentNodeId] || createReviewItem(currentNodeId);
    const updatedSrs = sm2Update(currentSrs, isCorrect ? 4 : 1);
    setSrsMap((prev) => ({ ...prev, [currentNodeId]: updatedSrs }));
  };

  // Next Challenge Handler
  const handleNextChallenge = () => {
    audioManager.play('whoosh');
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setCurrentHintIndex(0);

    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
    } else {
      // Simulation Complete
      setShowConfetti(true);
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all 22 Liberalisation challenges.');
      recordGameScore('C11_Eco_Liberalisation', score + 10);
      if (onComplete) {
        onComplete(score + 10);
      }
    }
  };

  // Lab Parameter Controller Handlers
  const handleDevaluationChange = (val: number) => {
    audioManager.play('pop');
    setLabState((prev) => {
      const newForex = Math.min(100, 1.2 + val * 0.45);
      const newWeeks = Math.min(52, Math.round(2 + val * 0.8));
      return {
        ...prev,
        rupeeDevaluationPct: val,
        forexReserves: parseFloat(newForex.toFixed(1)),
        importWeeks: newWeeks,
      };
    });
  };

  const handleYearChange = (yr: number) => {
    audioManager.play('count');
    setLabState((prev) => {
      // Automatic policy evolution by year
      const isPost1991 = yr >= 1991;
      return {
        ...prev,
        selectedYear: yr,
        industrialLicensing: yr < 1991,
        publicSectorReservedCount: yr < 1991 ? 17 : yr < 2001 ? 8 : 2,
        peakCustomsDuty: yr < 1991 ? 300 : Math.max(15, Math.round(300 - (yr - 1991) * 10)),
        slrRate: yr < 1991 ? 38.5 : Math.max(18, parseFloat((38.5 - (yr - 1991) * 0.7).toFixed(1))),
        crrRate: yr < 1991 ? 15.0 : Math.max(4.0, parseFloat((15.0 - (yr - 1991) * 0.4).toFixed(1))),
        rbiRole: isPost1991 ? 'Facilitator' : 'Regulator',
      };
    });
  };

  // Calculate overall node mastery percentage for progress header
  const overallMastery = useMemo(() => {
    let totalP = 0;
    ALL_NODE_IDS.forEach((id) => {
      const bkt = bktStateMap[id];
      if (bkt) totalP += bkt.pKnown;
    });
    return Math.round((totalP / ALL_NODE_IDS.length) * 100);
  }, [bktStateMap]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-6 flex flex-col justify-between relative overflow-hidden">
      {/* VISUAL FEEDBACK OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Simulation Complete! Mastery Recorded." />
      <SparkleBurst show={showSparkle} x={600} y={300} />

      {/* HEADER BAR */}
      <header className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-4 backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-4 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              CISCE Class 11 Economics
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gold-500/20 text-gold-300 border border-gold-500/30">
              Chapter: Liberalisation (NEP 1991)
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white mt-1 tracking-tight flex items-center gap-2">
            🏛️ 1991 Economic Reforms & Policy Command Center
          </h1>
        </div>

        {/* Overall Mastery & Score Gauge */}
        <div className="flex items-center gap-6 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Mastery Index</div>
            <div className="text-lg font-black text-emerald-400">{overallMastery}%</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-700" />
          <div className="text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Lab Score</div>
            <div className="text-lg font-black text-amber-400">{score} PTS</div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="flex gap-2 mb-6 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80">
        <button
          onClick={() => {
            setActiveTab('discovery');
            audioManager.play('tap');
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs md:text-sm transition-all ${
            activeTab === 'discovery'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          🔍 1. Discovery & Scenario
        </button>
        <button
          onClick={() => {
            setActiveTab('lab');
            audioManager.play('tap');
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs md:text-sm transition-all ${
            activeTab === 'lab'
              ? 'bg-gold-500 text-slate-950 shadow-lg shadow-gold-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          🧪 2. Interactive Policy Labs ({EXPLORATION_STEPS.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('challenges');
            audioManager.play('tap');
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs md:text-sm transition-all ${
            activeTab === 'challenges'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          🎯 3. Challenges ({currentChallengeIdx + 1}/{CHALLENGES.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('summary');
            audioManager.play('tap');
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs md:text-sm transition-all ${
            activeTab === 'summary'
              ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          📚 4. Summary & Real World
        </button>
      </nav>

      {/* TAB CONTENT AREA */}
      <main className="flex-1 mb-4">
        {/* ========================================== */}
        {/* TAB 1: DISCOVERY & SCENARIO */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-amber-400 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-xs md:text-sm text-amber-200">
                <strong>Mission Objective:</strong> {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Question Component */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Pre-Conception Assessment
              </span>
              <h3 className="text-base md:text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => {
                  const isSelected = selectedDiscoveryOpt === idx;
                  const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
                  let btnStyle = 'bg-slate-800/80 border-slate-700 hover:border-amber-500/50 text-slate-200';

                  if (discoverySubmitted) {
                    if (isCorrect) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    else if (isSelected) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (discoverySubmitted) return;
                        setSelectedDiscoveryOpt(idx);
                      }}
                      className={`p-4 rounded-xl border text-left text-xs md:text-sm transition-all ${btnStyle}`}
                    >
                      <span className="font-mono mr-2 text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {!discoverySubmitted ? (
                <button
                  disabled={selectedDiscoveryOpt === null}
                  onClick={() => {
                    setDiscoverySubmitted(true);
                    if (selectedDiscoveryOpt === DISCOVERY_QUESTION.correctIndex) {
                      audioManager.play('success');
                      speechManager.speak('Spot on! Currency devaluation boosts export competitiveness.');
                    } else {
                      audioManager.play('error');
                    }
                  }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl transition-all"
                >
                  Confirm Policy Hypothesis
                </button>
              ) : (
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-xs md:text-sm text-slate-300">
                  <strong className="text-amber-400">Economic Insight: </strong>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Prediction Questions Mapping (MANDATORY SECTION) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-gold-400 mb-4 flex items-center gap-2">
                <span>🔮</span> Predictive Policy Hypotheses ({PREDICTION_QUESTIONS.length})
              </h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pred, qIdx) => (
                  <div key={qIdx} className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                    <p className="font-bold text-sm text-white mb-3">
                      {qIdx + 1}. {pred.question}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {pred.options.map((opt, oIdx) => {
                        const isChosen = predictionAnswers[qIdx] === oIdx;
                        const isCorrect = oIdx === pred.correctIndex;
                        const isSubmitted = predictionAnswers[qIdx] !== undefined;

                        let style = 'bg-slate-800 border-slate-700 text-slate-300';
                        if (isSubmitted) {
                          if (isCorrect) style = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                          else if (isChosen) style = 'bg-rose-950 border-rose-500 text-rose-200';
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => {
                              if (isSubmitted) return;
                              setPredictionAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                              audioManager.play(oIdx === pred.correctIndex ? 'success' : 'error');
                            }}
                            className={`p-3 rounded-lg border text-xs text-left transition-all ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {predictionAnswers[qIdx] !== undefined && (
                      <div className="text-xs text-gold-300 bg-gold-950/40 p-2.5 rounded border border-gold-800/50">
                        🧪 <strong>How to Verify:</strong> {pred.verifyInstruction}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: INTERACTIVE POLICY LABS */}
        {/* ========================================== */}
        {activeTab === 'lab' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Lab Sub-Navigation Sidebar */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Interactive Experiments
              </h3>
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveLabIndex(idx);
                    audioManager.play('tap');
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1 ${
                    activeLabIndex === idx
                      ? 'bg-gold-500/15 border-gold-500 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <span className="text-xs font-bold text-gold-400">{step.title}</span>
                  <span className="text-[11px] text-slate-400 line-clamp-2">{step.instruction}</span>
                </button>
              ))}
            </div>

            {/* Main Interactive Lab Playground */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-bold text-gold-300">
                    {EXPLORATION_STEPS[activeLabIndex].title}
                  </h3>
                  <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                    Node ID: {EXPLORATION_STEPS[activeLabIndex].nodeId}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-slate-300 mb-6 bg-slate-850 p-3 rounded-xl border border-slate-800">
                  {EXPLORATION_STEPS[activeLabIndex].instruction}
                </p>

                {/* LAB 1: BOP & DEVALUATION SIMULATOR */}
                {activeLabIndex === 0 && (
                  <div className="space-y-6">
                    <BoPCrisisDiagram reserves={labState.forexReserves} devaluationPct={labState.rupeeDevaluationPct} />
                    <div className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>Rupee Emergency Devaluation (% Adjustment)</span>
                        <span className="text-amber-400 font-mono">+{labState.rupeeDevaluationPct}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        step="1"
                        value={labState.rupeeDevaluationPct}
                        onChange={(e) => handleDevaluationChange(parseFloat(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>0% (No adjustment)</span>
                        <span>19.5% (Actual 1991 Devaluation)</span>
                        <span>30% (Max Devaluation)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 2: INDUSTRIAL DEREGULATION */}
                {activeLabIndex === 1 && (
                  <div className="space-y-6">
                    <IndustrialLicensingVisualizer
                      licensingActive={labState.industrialLicensing}
                      reservedCount={labState.publicSectorReservedCount}
                      mrtpActive={labState.mrtpLimitActive}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => {
                          audioManager.play('pop');
                          setLabState((prev) => ({
                            ...prev,
                            industrialLicensing: !prev.industrialLicensing,
                          }));
                        }}
                        className={`p-4 rounded-xl border font-bold text-xs flex justify-between items-center ${
                          labState.industrialLicensing
                            ? 'bg-rose-950/40 border-rose-600 text-rose-300'
                            : 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                        }`}
                      >
                        <span>Industrial Licensing Status</span>
                        <span className="px-2 py-1 rounded bg-slate-900 border">
                          {labState.industrialLicensing ? 'Strict License Raj' : 'Abolished (Free)'}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          audioManager.play('pop');
                          setLabState((prev) => ({
                            ...prev,
                            mrtpLimitActive: !prev.mrtpLimitActive,
                          }));
                        }}
                        className={`p-4 rounded-xl border font-bold text-xs flex justify-between items-center ${
                          labState.mrtpLimitActive
                            ? 'bg-amber-950/40 border-amber-600 text-amber-300'
                            : 'bg-gold-950/40 border-gold-500 text-gold-300'
                        }`}
                      >
                        <span>MRTP Asset Ceiling (£100 Cr)</span>
                        <span className="px-2 py-1 rounded bg-slate-900 border">
                          {labState.mrtpLimitActive ? 'Enforced Cap' : 'Abolished'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* LAB 3: FINANCIAL SECTOR & RBI */}
                {activeLabIndex === 2 && (
                  <div className="space-y-6">
                    <FinancialSectorDiagram
                      rbiRole={labState.rbiRole}
                      slr={labState.slrRate}
                      crr={labState.crrRate}
                    />

                    <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Statutory Liquidity Ratio (SLR) Slider</span>
                          <span className="text-gold-400">{labState.slrRate}%</span>
                        </div>
                        <input
                          type="range"
                          min="18"
                          max="38.5"
                          step="0.5"
                          value={labState.slrRate}
                          onChange={(e) => {
                            audioManager.play('pop');
                            setLabState((prev) => ({
                              ...prev,
                              slrRate: parseFloat(e.target.value),
                            }));
                          }}
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs font-bold text-slate-300">RBI Operating Framework</span>
                        <button
                          onClick={() => {
                            audioManager.play('pop');
                            setLabState((prev) => ({
                              ...prev,
                              rbiRole: prev.rbiRole === 'Regulator' ? 'Facilitator' : 'Regulator',
                            }));
                          }}
                          className="px-4 py-2 bg-gold-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-gold-400 transition-all"
                        >
                          Switch to {labState.rbiRole === 'Regulator' ? 'Facilitator Mandate' : 'Regulator Mandate'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 4: TRADE & TARIFF POLICY */}
                {activeLabIndex === 3 && (
                  <div className="space-y-6">
                    <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 text-slate-200">
                      <h4 className="text-sm font-bold text-amber-400 mb-2">Trade Liberalisation Parameters</h4>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
                          <div className="text-xs text-slate-400">Peak Customs Duty</div>
                          <div className="text-xl font-bold text-amber-300">{labState.peakCustomsDuty}%</div>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
                          <div className="text-xs text-slate-400">Quantitative Restrictions</div>
                          <div className="text-xl font-bold text-emerald-300">
                            {labState.quantitativeRestrictions ? 'Quotas Active' : 'Removed (WTO Compliant)'}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span>Reduce Customs Tariff Barrier Rate</span>
                          <span>{labState.peakCustomsDuty}%</span>
                        </div>
                        <input
                          type="range"
                          min="15"
                          max="300"
                          step="5"
                          value={labState.peakCustomsDuty}
                          onChange={(e) => {
                            audioManager.play('pop');
                            setLabState((prev) => ({
                              ...prev,
                              peakCustomsDuty: parseInt(e.target.value, 10),
                            }));
                          }}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 5: MACRO GDP STRUCTURAL SHIFT */}
                {activeLabIndex === 4 && (
                  <div className="space-y-6">
                    <SectoralGDPGraph year={labState.selectedYear} />
                    <div className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                        <span>Timeline Scrubber (1990 - 2022 Post-Reform Era)</span>
                        <span className="text-purple-400 font-mono text-base">{labState.selectedYear}</span>
                      </div>
                      <input
                        type="range"
                        min="1990"
                        max="2022"
                        step="1"
                        value={labState.selectedYear}
                        onChange={(e) => handleYearChange(parseInt(e.target.value, 10))}
                        className="w-full accent-purple-500 cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Observation Questions Section (MANDATORY SECTION) */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <h4 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
                  <span>👀</span> Empirical Observation Prompts ({OBSERVATION_QUESTIONS.length})
                </h4>
                <div className="space-y-4">
                  {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                    <div key={oIdx} className="bg-slate-850 p-3.5 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-white mb-2">{obs.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {obs.observableOptions.map((opt, optIdx) => {
                          const isChosen = observationAnswers[oIdx] === optIdx;
                          const isCorrect = optIdx === obs.correctIndex;
                          const isSubmitted = observationAnswers[oIdx] !== undefined;

                          let btnStyle = 'bg-slate-900 border-slate-700 text-slate-300';
                          if (isSubmitted) {
                            if (isCorrect) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                            else if (isChosen) btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                if (isSubmitted) return;
                                setObservationAnswers((prev) => ({ ...prev, [oIdx]: optIdx }));
                                audioManager.play(optIdx === obs.correctIndex ? 'success' : 'error');
                              }}
                              className={`p-2.5 rounded-lg border text-xs text-left transition-all ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: CHALLENGES */}
        {/* ========================================== */}
        {activeTab === 'challenges' && (
          <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            {/* Challenge Header */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Challenge {currentChallengeIdx + 1} of {CHALLENGES.length} • Tier: {currentChallenge.difficulty}
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                Node: {currentChallenge.nodeId}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-base md:text-lg font-bold text-white mb-6 leading-relaxed">
              {currentChallenge.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3 mb-6">
              {currentChallenge.options.map((option, idx) => {
                const isSelected = selectedAnswerIndex === idx;
                const isCorrect = idx === currentChallenge.correctIndex;

                let optionStyle = 'bg-slate-800/70 border-slate-700 hover:border-emerald-500/50 text-slate-200';

                if (isAnswerSubmitted) {
                  if (isCorrect) optionStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                  else if (isSelected) optionStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleAnswerSubmit(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <span>
                      <strong className="font-mono text-slate-400 mr-2">{String.fromCharCode(65 + idx)}.</strong>
                      {option}
                    </span>
                    {isAnswerSubmitted && isCorrect && <span className="text-emerald-400 font-bold ml-2">✓</span>}
                    {isAnswerSubmitted && isSelected && !isCorrect && <span className="text-rose-400 font-bold ml-2">✗</span>}
                  </button>
                );
              })}
            </div>

            {/* Hint Bubble & Explanation Display */}
            <div className="space-y-3 mb-6">
              {showHint && (
                <HintBubble
                  show={showHint}
                  text={currentChallenge.hints[currentHintIndex]}
                />
              )}

              {isAnswerSubmitted && (
                <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl text-xs md:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400">Detailed Economic Explanation: </strong>
                  {currentChallenge.explanation}
                </div>
              )}
            </div>

            {/* Controls Bar */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowHint(true);
                  setCurrentHintIndex((prev) => (prev + 1) % currentChallenge.hints.length);
                  audioManager.play('hint');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-xl text-xs font-bold transition-all"
              >
                💡 Hint ({currentHintIndex + 1}/3)
              </button>

              {isAnswerSubmitted && (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs md:text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                >
                  <span>Next Challenge</span>
                  <span>→</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: SUMMARY & REAL WORLD */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity Rendered */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-lg font-bold text-purple-400 mb-2">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-slate-300 text-xs md:text-sm mb-4 leading-relaxed">
                {REAL_WORLD_ACTIVITY.description}
              </p>
              <div className="space-y-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <div key={sIdx} className="bg-slate-850 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <strong className="text-purple-300">Step {sIdx + 1}:</strong> {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Expansion Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-base font-bold text-rose-400 mb-4 flex items-center gap-2">
                <span>⚠️</span> Common Economic Misconceptions & Clarifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-rose-300 mb-1">{misc.title}</h4>
                    <p className="text-[11px] text-slate-400 mb-2">{misc.description}</p>
                    <div className="text-xs text-emerald-300 bg-emerald-950/30 p-2.5 rounded border border-emerald-900/40">
                      <strong>Correction: </strong>{misc.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Diagnostic Knowledge Base */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-base font-bold text-gold-400 mb-4">
                📋 Diagnostic Question Bank Review ({DIAGNOSTIC_QUESTIONS.length} Questions)
              </h3>
              <div className="space-y-3">
                {DIAGNOSTIC_QUESTIONS.map((dq) => (
                  <div key={dq.id} className="bg-slate-850 p-3.5 rounded-xl border border-slate-800 text-xs">
                    <p className="font-bold text-white mb-1">{dq.question}</p>
                    <p className="text-emerald-400 mb-1">
                      <strong>Key Answer:</strong> {dq.options[dq.correctIndex]}
                    </p>
                    <p className="text-slate-400 text-[11px]">{dq.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER METRICS */}
      <footer className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center text-[11px] text-slate-500 flex justify-between items-center">
        <span>CISCE Economics Syllabus Integration • Standard Node Mapping</span>
        <span>Active Node String Literals Tracked: {ALL_NODE_IDS.length}</span>
      </footer>
    </div>
  );
};

export default C11_EcoLiberalisationCBSESim;
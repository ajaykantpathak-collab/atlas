'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERALS ───
const NODE_C10_ECONAPP_011 = 'c10_econapp_011';
const NODE_C10_ECONAPP_012 = 'c10_econapp_012';
const NODE_C10_ECONAPP_013 = 'c10_econapp_013';
const NODE_C10_ECONAPP_014 = 'c10_econapp_014';
const NODE_C10_ECONAPP_015 = 'c10_econapp_015';
const NODE_C10_ECONAPP_016 = 'c10_econapp_016';
const NODE_C10_ECONAPP_017 = 'c10_econapp_017';
const NODE_C10_ECONAPP_018 = 'c10_econapp_018';
const NODE_C10_ECONAPP_019 = 'c10_econapp_019';
const NODE_C10_ECONAPP_020 = 'c10_econapp_020';

const ALL_NODE_IDS = [
  NODE_C10_ECONAPP_011,
  NODE_C10_ECONAPP_012,
  NODE_C10_ECONAPP_013,
  NODE_C10_ECONAPP_014,
  NODE_C10_ECONAPP_015,
  NODE_C10_ECONAPP_016,
  NODE_C10_ECONAPP_017,
  NODE_C10_ECONAPP_018,
  NODE_C10_ECONAPP_019,
  NODE_C10_ECONAPP_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Bharat Agro-Industrial Hub Transformation',
  intro: 'You are appointed chief economic advisor to the Vidarbha-Surat Agro-Industrial Cluster in India. From onion farmers and textile mills to modern semiconductor fabs and rural credit societies, producers are struggling to adjust their supplies when prices fluctuate, land is degraded, labour efficiency is challenged, and capital pipelines stall.',
  context: 'Your mission: Master the mechanics of Supply Elasticity, explore the four Factors of Production (Land, Labour, Capital, Enterprise), troubleshoot the 3-phase Capital Formation pipeline, and optimise Credit delivery to transform this regional economy into a resilient powerhouse.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In May 2024, onion market prices jumped by 60% in Nashik mandi within 48 hours. What happened to the quantity of fresh onions supplied by local farmers that week?',
  options: [
    'Quantity supplied surged by 150% because farmers instantly grew more onions overnight.',
    'Quantity supplied remained almost unchanged because planted crops take months to grow (Short-Run Inelastic Supply).',
    'Quantity supplied dropped to zero because farmers went on strike.',
    'Quantity supplied became negative because onions spoil in seconds.',
  ],
  correctIndex: 1,
  hintAfter: 'Agricultural crops have fixed biological gestation periods! Let us discover how time, storage, and factor inputs govern supply elasticity.',
};

// ─── INTERFACES ───
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
  nodeId: NODE_C10_ECONAPP_011,
  title: 'Elasticity of Supply & Factors of Production',
  definition: 'Price elasticity of supply (Es) measures the responsiveness of quantity supplied to changes in price. Production requires coordinating Land (free gifts of nature), Labour (human exertion for wages), Capital (man-made means of production), and credit mechanisms through capital formation.',
  eli5: 'Think of supply like a rubber band: some goods stretch quickly when prices pull them (elastic), while others are stiff like iron bars (inelastic). To produce anything, you need a playground (Land), players (Labour), bats and balls (Capital), and pocket money (Credit).',
  misconceptions: [
    {
      misconception: 'Es should have a negative sign like price elasticity of demand (Ed).',
      correction: 'Supply follows a direct positive law (price rises -> quantity supplied rises). Es is naturally positive, so no negative sign is needed.',
    },
    {
      misconception: 'Land in economics means only farm soil and building plots.',
      correction: 'Land covers ALL free gifts of nature: rivers, underground mineral seams (Jharia coal), sunlight, rainfall, and forests.',
    },
    {
      misconception: 'Labour efficiency in India is low because workers are inherently lazy.',
      correction: 'Low efficiency is structural: malnutrition (36% stunting in under-5s), low wages, outdated tools, and lack of technical skilling.',
    },
    {
      misconception: 'Money held idle in a locker or cash under a mattress is capital.',
      correction: 'Idle money is wealth or dormant savings. It only becomes capital when mobilised and spent on productive assets (machinery, tools, raw materials).',
    },
    {
      misconception: 'Credit is always harmful because it generates debt traps.',
      correction: 'Productive credit at fair interest (e.g. Kisan Credit Card at 7%) funds seeds and tools that boost output far beyond loan costs.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the formula for price elasticity of supply (Es)?',
      options: ['(% Change in Quantity Supplied) / (% Change in Price)', '(% Change in Price) / (% Change in Quantity Supplied)', 'Total Revenue / Quantity', 'Price * Quantity'],
      correctIndex: 0,
    },
    {
      question: 'Which of the following is considered "Land" in the strict economic sense?',
      options: ['A Mahindra 575 DI Tractor', 'The Krishna River water used for irrigation', 'A concrete warehouse building', 'A ₹10 Lakh SBI Fixed Deposit'],
      correctIndex: 1,
    },
    {
      question: 'Why is land called a "passive" factor of production?',
      options: ['Because it cannot produce anything on its own without labour and capital', 'Because it moves from one place to another', 'Because its supply can be doubled in a factory', 'Because it earns wages'],
      correctIndex: 0,
    },
    {
      question: 'Which type of division of labour is seen when Tirupur specialises in knitwear and Surat in diamonds?',
      options: ['Process-based division', 'Territorial (Geographical) division', 'Product-based micro division', 'Hierarchical delegation'],
      correctIndex: 1,
    },
    {
      question: 'What are the three essential phases of Capital Formation?',
      options: ['Mining -> Manufacturing -> Selling', 'Savings generation -> Mobilisation through intermediaries -> Investment in productive assets', 'Borrowing -> Spending -> Bankruptcy', 'Exporting -> Importing -> Taxing'],
      correctIndex: 1,
    },
    {
      question: 'An MGNREGA worker earns ₹281/day. How does this low wage impact labour efficiency?',
      options: ['Increases efficiency by motivating harder work', 'Reduces efficiency through inadequate nutrition and compromised physical stamina', 'Has zero effect on stamina', 'Instantly quadruples hourly output'],
      correctIndex: 1,
    },
    {
      question: 'Which factor most differentiates Fixed Capital from Working Capital?',
      options: ['Fixed capital lasts over multiple cycles; working capital is consumed in a single cycle', 'Fixed capital is always paper currency', 'Working capital never runs out', 'Fixed capital has zero monetary value'],
      correctIndex: 0,
    },
    {
      question: 'Why is informal credit from village moneylenders often dangerous for small farmers?',
      options: ['It charges exorbitant interest rates (36%-60% p.a.) exceeding farming returns', 'It provides too much government subsidy', 'It requires compulsory online KYC verification', 'It has zero interest rate'],
      correctIndex: 0,
    },
  ],
  masteryCriteria: 'Student understands elasticity of supply calculations and graphs, land characteristics and ecosystem impacts, labour traits and division of labour, capital types and capital formation phases, and credit mechanisms in the Indian economy.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Elasticity of Supply Lab',
    instruction: 'Adjust the Market Price slider and toggle between Perishable (Tomatoes) vs Manufactured (Smartphones) to see how supply curves respond.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_ECONAPP_011,
  },
  {
    title: 'Land Productivity & Ecosystems',
    instruction: 'Simulate land use transition: Apply irrigation & organic inputs or observe degradation from deforestation.',
    interactionType: 'click-parts',
    nodeId: NODE_C10_ECONAPP_013,
  },
  {
    title: 'Labour & Assembly Line Division',
    instruction: 'Experience Maruti Suzuki assembly: Compare single-artisan vs 4-station assembly line output.',
    interactionType: 'drag-classify',
    nodeId: NODE_C10_ECONAPP_016,
  },
  {
    title: 'Capital Formation Pipeline',
    instruction: 'Connect Household Savings -> Banking Mobilisation (SBI/LIC) -> Industrial Fixed Investment (Tata Steel Fab).',
    interactionType: 'drag-position',
    nodeId: NODE_C10_ECONAPP_019,
  },
  {
    title: 'Credit Simulator: Formal vs Informal',
    instruction: 'Compare a ₹50,000 crop loan at SBI KCC (7%) vs a Village Moneylender (48%) on net farmer income.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_ECONAPP_020,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If market price of smartphones rises by 20%, what happens to quantity supplied in a modern automated factory (Foxconn Tamil Nadu)?',
    options: [
      'Quantity supplied stays at zero forever',
      'Quantity supplied expands significantly (>20%, Elastic Supply) as extra shifts and components are added',
      'Quantity supplied drops by 50%',
      'Supply becomes perfectly vertical',
    ],
    correctIndex: 1,
    verifyInstruction: 'Select "Manufactured Goods" in the simulator and drag the price slider up to +40% to verify!',
    nodeId: NODE_C10_ECONAPP_011,
  },
  {
    question: 'Predict: If a farmer borrows ₹50,000 from an informal moneylender at 48% p.a. for a crop with ₹60,000 revenue, what happens to their net profit?',
    options: [
      'Net profit is huge (₹40,000)',
      'Most surplus is wiped out by ₹24,000 interest, triggering a dangerous debt trap',
      'The bank forgives the loan automatically',
      'Informal loans have no interest charge',
    ],
    correctIndex: 1,
    verifyInstruction: 'Switch to the Credit Simulator step and drag the informal rate slider to 48% to inspect the net margin gauge!',
    nodeId: NODE_C10_ECONAPP_020,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the supply curve slope for perishable tomatoes on harvest day?',
    observableOptions: [
      'It is nearly vertical (steep/inelastic) because harvested tomatoes cannot be held in storage for long without cold chains',
      'It is completely flat and horizontal',
      'It slopes downwards to the left',
      'It expands infinitely with zero price',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_ECONAPP_011,
  },
  {
    question: 'What happens to total output per hour when work is split across 4 specialised assembly stations instead of 1 worker doing everything?',
    observableOptions: [
      'Output multiplies 4x to 8x due to zero tool-switching time and high motor dexterity',
      'Output drops by 90%',
      'There is no change at all',
      'Workers forget what product they are making',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_ECONAPP_016,
  },
];

// ─── 24 RICH CHALLENGES (NEP 2020 Aligned) ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (1-8)
  {
    id: 'ch_01',
    nodeId: NODE_C10_ECONAPP_011,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A farmer in Punjab supplies 50 quintals of wheat at ₹2,000/quintal. When price rises to ₹2,500/quintal (a 25% increase), supply rises to 70 quintals (a 40% increase). Calculate the Price Elasticity of Supply (Es).',
    correctAnswer: 1.6,
    tolerance: 0.05,
    unit: 'Es',
    explanation: 'Es = (% Change in Qs) / (% Change in Price) = 40% / 25% = 1.6. Since Es > 1, wheat supply over this seasonal price adjustment is elastic.',
    hints: [
      'Use the percentage method formula: Es = %ΔQs / %ΔP.',
      '%ΔQs = 40%, %ΔP = 25%. Divide 40 by 25.',
      '40 / 25 = 1.6. Enter 1.6.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C10_ECONAPP_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is an accurate economic characteristic of "Land"?',
    options: [
      'It is an active factor that can produce output without human touch',
      'It is a free gift of nature, fixed in total geographical supply and immobile',
      'Its total area can be doubled inside industrial factories',
      'It suffers 100% depreciation every single year like machinery',
    ],
    correctIndex: 1,
    explanation: 'Land includes all natural gifts (soil, rivers, mineral deposits). Its total supply is fixed (India is 328.7M ha), it is spatially immobile, and it acts as a passive base for production.',
    hints: [
      'Think about whether humans can manufacture new geographical territory.',
      'Can a plot of land in Ludhiana be picked up and placed in Jaisalmer?',
      'Land is a natural, immobile, and passive factor of production.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C10_ECONAPP_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A father in Delhi teaches his daughter mathematics for 2 hours daily without any charge. In economics, why is this NOT classified as "Labour"?',
    options: [
      'Because mathematics is not mental exertion',
      'Because the activity lacks a wage/income motive',
      'Because teaching is only done by robots',
      'Because family activities are illegal in economics',
    ],
    correctIndex: 1,
    explanation: 'For human exertion to qualify as labour in economics, three conditions must hold: (1) Human exertion, (2) Mental or physical, (3) Wage/income motive. Unpaid care/parental support lacks the wage motive.',
    hints: [
      'Recall the 3 criteria of labour: human effort, mental/physical, and wage motive.',
      'Is the father receiving a monetary payment, fee, or salary?',
      'Without an income/wage motive, economic accounting does not treat the effort as labour.',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C10_ECONAPP_018,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each item to its correct Capital category in an Amul Dairy processing factory.',
    dragItems: [
      { label: 'Pasteurisation Boiler', targetId: 'box_fixed' },
      { label: 'Raw Cow Milk Stock', targetId: 'box_working' },
      { label: 'Dairy Technologist Skill', targetId: 'box_human' },
      { label: '₹5 Lakh Cash Float', targetId: 'box_money' },
    ],
    correctMapping: {
      box_fixed: 'Pasteurisation Boiler',
      box_working: 'Raw Cow Milk Stock',
      box_human: 'Dairy Technologist Skill',
      box_money: '₹5 Lakh Cash Float',
    },
    explanation: 'Boilers last multiple cycles (Fixed Capital); raw milk is consumed per batch (Working Capital); technologist knowledge is Human Capital; operating cash is Money Capital.',
    hints: [
      'What lasts for years and does not dissolve in one batch? That is Fixed Capital.',
      'Raw milk gets transformed into cheese/butter in one cycle — that is Working Capital.',
      'Skills and education represent Human Capital, while bank balances are Money Capital.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C10_ECONAPP_016,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the Indian industrial cluster with its prominent Territorial Division of Labour specialisation:',
    options: [
      'Tirupur -> Knitwear; Surat -> Diamonds; Moradabad -> Brassware',
      'Tirupur -> Coal mining; Surat -> Tea plantations; Moradabad -> IT Software',
      'Tirupur -> Automobiles; Surat -> Wheat; Moradabad -> Spices',
      'Tirupur -> Aircraft; Surat -> Forestry; Moradabad -> Petroleum',
    ],
    correctIndex: 0,
    explanation: 'Territorial (geographical) division occurs when entire regions specialise based on climate, resources, and clustered heritage skills (Tirupur for cotton knitwear, Surat for diamonds, Moradabad for brass).',
    hints: [
      'Think of Tamil Nadu knitwear exports (~₹30,000 Cr from Tirupur).',
      'Surat is world famous for polishing 90% of rough diamonds.',
      'Moradabad is historically known as "Peetal Nagri" (Brass City).',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C10_ECONAPP_019,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 3 sequential phases of Capital Formation in correct chronological order:',
    sortItems: [
      'Creation of Savings (income minus consumption)',
      'Mobilisation of Savings via Banks, LIC, Mutual Funds & Capital Markets',
      'Investment in Productive Capital Goods (Factories, Machinery, R&D)',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Capital formation begins with generating savings, mobilising those pooled funds through financial intermediaries, and finally investing in tangible/human capital assets.',
    hints: [
      'You cannot mobilise what has not yet been saved.',
      'Intermediaries like SBI or LIC channel the savings to industrialists.',
      'The final outcome is actual physical machinery and factories producing goods.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C10_ECONAPP_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary defining characteristic of an economic "Credit" transaction?',
    options: [
      'Instant permanent donation of wealth with no repayment',
      'A deferred-payment transaction where goods/funds are received now against a promise to repay in the future',
      'Printing counterfeit banknotes in a basement',
      'Bartering goods simultaneously with immediate physical exchange',
    ],
    correctIndex: 1,
    explanation: 'Credit is defined by the deferral of payment over time. The creditor provides purchasing power or goods today, and the debtor agrees to settle the obligation later, usually with interest.',
    hints: [
      'Think of buying on "Udhaar" or taking an EMI.',
      'The key element is the time gap between receiving the good and making the payment.',
      'Deferred payment is the essence of credit.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_08',
    nodeId: NODE_C10_ECONAPP_017,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How is "Efficiency of Labour" mathematically calculated?',
    options: [
      'Total Output / Total Number of Workers (or Output per Worker-Hour)',
      'Total Wages Paid * Number of Machines',
      'Land Area in Hectares / Total Hours Slept',
      'Selling Price * Inflation Rate',
    ],
    correctIndex: 0,
    explanation: 'Labour efficiency (labour productivity) is the output produced per unit of labour time, calculated as Total Output divided by Total Workers (or Worker-Hours).',
    hints: [
      'It measures how much output one worker delivers in an hour or day.',
      'Numerator is physical output; denominator is labour units/hours.',
      'Formula: Output / Labour input.',
    ],
  },

  // STANDARD TIER (9-16)
  {
    id: 'ch_09',
    nodeId: NODE_C10_ECONAPP_011,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the short-run supply of fresh tomatoes in Kolar mandi inelastic (Es < 1), whereas the supply of readymade tomato ketchup by a food processor is elastic (Es > 1)?',
    options: [
      'Fresh tomatoes are perishable and cannot be stored easily; packaged ketchup is durable, storable, and production lines can add shifts',
      'Tomato farmers dislike high prices while ketchup factories do not pay taxes',
      'Ketchup violates the law of supply while raw tomatoes obey it',
      'There is no difference; all agricultural goods are perfectly elastic',
    ],
    correctIndex: 0,
    explanation: 'Perishability and storage feasibility are core determinants of supply elasticity. Fresh tomatoes spoil fast (inelastic short-run supply), while processed ketchup can be warehoused and factory shifts scaled up (elastic supply).',
    hints: [
      'Think about what happens if you try to store fresh tomatoes for 3 weeks without cold storage.',
      'Can a ketchup factory ramp up night shifts using storable tomato paste concentrate?',
      'Storable goods with flexible production inputs have elastic supply.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C10_ECONAPP_013,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A farmer in Vidarbha produces 1,400 kg/ha of cotton under rainfed conditions. After installing PMKSY drip irrigation and using HYV hybrid seeds, their yield increases by 50%. What is the new land productivity in kg/ha?',
    correctAnswer: 2100,
    tolerance: 10,
    unit: 'kg/ha',
    explanation: 'New Productivity = 1,400 + (0.50 * 1,400) = 1,400 + 700 = 2,100 kg/ha. Combining assured water (irrigation) and technology (HYV) directly raises land productivity.',
    hints: [
      'Calculate 50% of 1,400: 0.5 * 1400 = 700.',
      'Add the 700 kg increase to the original 1,400 kg.',
      '1400 + 700 = 2100.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C10_ECONAPP_014,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the ecological degradation feedback loop caused by uncontrolled stone quarrying in the Aravalli Hills by clicking parts in sequence:',
    availableParts: [
      'Economic Demand for Construction Stone',
      'Forest Clearing & Hill Blasting',
      'Topsoil Erosion in Monsoon',
      'Groundwater Table Depletion',
      'Local Microclimate Heating & Desertification',
    ],
    targetState: 'Economic Demand for Construction Stone Forest Clearing & Hill Blasting Topsoil Erosion in Monsoon Groundwater Table Depletion Local Microclimate Heating & Desertification',
    validationHint: 'Follow cause to effect: Demand -> Mining -> Soil Loss -> Water Loss -> Desertification.',
    explanation: 'Land use conversion triggers a feedback chain: economic demand drives vegetation loss, eliminating root anchorage, which drains aquifers and causes regional desertification.',
    hints: [
      'Start with the market driver: Economic Demand for Stone.',
      'Next is physical extraction: Forest Clearing & Blasting.',
      'Followed by soil loss, groundwater drop, and final microclimate breakdown.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C10_ECONAPP_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'At Maruti Suzuki Manesar plant, 60+ sequential workstations install engines, wiring, glass, and wheels, assembling a Swift every 90 seconds. What is a key disadvantage of this intense process-based division of labour?',
    options: [
      'Worker monotony and systemic line vulnerability (if one workstation stops, the entire assembly line halts)',
      'Production costs per vehicle become exponentially higher than handmade cars',
      'Vehicles take 6 months each to assemble',
      'Workers are forced to become master craftsmen capable of building entire cars alone',
    ],
    correctIndex: 0,
    explanation: 'Process division creates high throughput but causes task monotony, loss of all-round craftsmanship, and high operational interdependence (strike or breakdown at one station halts everything).',
    hints: [
      'What happens if a worker repeats tightening the exact same bolt for 8 hours daily?',
      'What occurs to the whole line if station 14 runs out of engine mounts?',
      'Interdependence and boredom/monotony are classic disadvantages.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C10_ECONAPP_017,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'According to international data, India manufacturing labour productivity in 2019 was ~$3.50/hr vs ~$12.00/hr in China. Which explanation represents sound economic analysis rather than a stereotype?',
    options: [
      'Indian workers are biologically less active than workers elsewhere',
      'Structural gaps in childhood nutrition (36% stunting in NFHS-5), inadequate vocational tooling, and low capital-per-worker in small informal units',
      'Indian climate completely stops all industrial machinery from operating',
      'Chinese factories do not use any human workers',
    ],
    correctIndex: 1,
    explanation: 'Labour productivity depends on human capital (nutrition, schooling, vocational skills) and physical capital backing (modern tooling, automation). Malnutrition and outdated machinery cap per-hour physical output.',
    hints: [
      'Reject stereotypes about worker character.',
      'Look for structural factors: health, education, modern machines, and capital intensity.',
      'Human capital deficits and low capital endowment explain the productivity gap.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_14',
    nodeId: NODE_C10_ECONAPP_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A family in Jaipur owns 500 grams of gold jewellery stored in a home locker. A jeweller in Johari Bazaar holds 500 grams of gold bullion in their workshop to craft bridal necklaces for sale. How does economics classify these two stocks of gold?',
    options: [
      'Family gold is wealth (dormant store of value); Jeweller gold is Capital (man-made input deployed for further production)',
      'Both are working capital because both are made of gold',
      'Neither is wealth or capital because gold is illegal in economics',
      'Family gold is fixed capital; jeweller gold is not capital',
    ],
    correctIndex: 0,
    explanation: 'Wealth is any stock of assets with value. It becomes Capital only when actively employed in production to generate goods/services. Idle personal jewellery is wealth; artisan workshop bullion is working capital.',
    hints: [
      'Is the family jewellery being used to manufacture anything for the market?',
      'Is the jeweller using the bullion to produce inventory for revenue?',
      'Active use in production is the litmus test for capital.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_15',
    nodeId: NODE_C10_ECONAPP_019,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In FY 2022-23, India Gross Savings Rate was 29.3% of GDP, while Gross Fixed Capital Formation (Investment Rate) was 28.1% of GDP. What was the savings-investment gap (in percentage points) funded through foreign capital inflows (FDI/ECB)?',
    correctAnswer: 1.2,
    tolerance: 0.1,
    unit: 'percentage points',
    explanation: 'Gap = 29.3% - 28.1% = 1.2 percentage points. In an open economy, discrepancies between domestic savings and capital formation reflect net foreign resource flows and current account dynamics.',
    hints: [
      'Subtract the investment rate from the gross savings rate.',
      '29.3 minus 28.1.',
      '29.3 - 28.1 = 1.2.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C10_ECONAPP_020,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare Formal Credit (SBI Kisan Credit Card) vs Informal Credit (Village Moneylender):',
    options: [
      'Formal: 7% subsidised rate, transparent written terms; Informal: 36%-60% rate, oral terms, risk of debt traps',
      'Formal: 60% rate without records; Informal: 2% interest backed by RBI ombudsman',
      'Formal: Only accessible to moneylenders; Informal: Regulated by the Ministry of Finance',
      'Formal and Informal have identical interest rates and zero legal differences',
    ],
    correctIndex: 0,
    explanation: 'Formal credit is RBI-regulated with transparent contracts and subvented rates (~7% KCC), while informal credit relies on unwritten agreements with usurious compounding rates (36-60%).',
    hints: [
      'Which source charges exorbitant 36-60% rates without paperwork?',
      'Which institution is regulated by RBI and provides interest subvention?',
      'Formal credit offers lower interest, structured terms, and legal protection.',
    ],
    misconceptionIndex: 4,
  },

  // ADVANCED TIER (17-24)
  {
    id: 'ch_17',
    nodeId: NODE_C10_ECONAPP_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During the 2021-22 semiconductor shortage, global automotive chip supply was perfectly inelastic (Es ≈ 0) in the short run. Why did the Government of India launch the ₹76,000 Crore Semicon India Programme (subsidising fabs like Tata Electronics Dholera)?',
    options: [
      'To build long-run domestic production capacity, shifting the long-run chip supply curve rightward and making supply elastic over a 3-5 year horizon',
      'To force car manufacturers to stop using electronics permanently',
      'Because semiconductor fabs can be built in 48 hours with zero capital',
      'To convert silicon chips into agricultural fertiliser',
    ],
    correctIndex: 0,
    explanation: 'Semiconductor fabs take 2-4 years and billions of dollars to build. Long-run elasticity requires creating capital assets and input availability, transforming a zero-elasticity bottleneck into elastic domestic supply.',
    hints: [
      'Can chip factories be built in a few weeks when prices spike?',
      'How does setting up mega fabs in Gujarat and Assam alter the long-run supply curve?',
      'Government capital subsidies overcome the long gestation barrier to make supply elastic in the long run.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C10_ECONAPP_014,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under CAMPA 2016, ₹66,000 Crore has been collected from industries for "Compensatory Afforestation" when forest land is diverted. Why do ecologists argue CAMPA does NOT fully eliminate the net ecological loss?',
    options: [
      'Because commercial monoculture plantations (e.g. eucalyptus) cannot replicate the complex biodiversity, watershed recharge, and soil biology of mature natural forests',
      'Because trees planted by CAMPA absorb 100x more oxygen than normal trees',
      'Because the Indian government refuses to spend any money on saplings',
      'Because natural forests have zero economic or ecological value',
    ],
    correctIndex: 0,
    explanation: 'A natural forest ecosystem represents centuries of co-evolved canopy layers, wildlife habitats, and hydrological sponges. Monoculture timber plantations replace land area on paper but lack equivalent ecological functions.',
    hints: [
      'Does a row of single-species teak/eucalyptus support the same birds, soil fungi, and wildlife as a virgin forest?',
      'Consider the time required for hydrological recharge and carbon sequestration to match primeval forests.',
      'Area compensation is not ecological equivalence.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C10_ECONAPP_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is intensive division of labour highly successful in power-loom factories producing grey cloth, but harmful to the master artisans of Varanasi handwoven silk sarees?',
    options: [
      'Handwoven Banarasi sarees depend on the holistic artistic intuition, motif coordination, and seamless craftsmanship of a single master weaver that cannot be fragmented without destroying its unique luxury value',
      'Power looms are completely illegal under Indian commercial law',
      'Handloom weavers refuse to use any electricity or lighting',
      'Silk sarees have zero market demand in India',
    ],
    correctIndex: 0,
    explanation: 'Mass standardised manufacturing thrives on repetitive micro-specialisation. In contrast, artisanal luxury crafts require unified aesthetic judgment and holistic execution; fragmenting tasks destroys craftsmanship.',
    hints: [
      'Can the artistic soul and intricate zari motifs of a ₹50,000 saree be split across 20 uncoordinated workers?',
      'Standard goods benefit from division; custom art forms lose integrity when fragmented.',
      'Holistic craftsmanship is lost when creative tasks are mechanised and divided.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C10_ECONAPP_019,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Map the real-world Indian institutions to their precise operational role in the Capital Formation Pipeline for the ₹3.6 Lakh Crore Delhi-Mumbai Industrial Corridor (DMIC):',
    dragItems: [
      { label: '500M+ Retail Account Holders', targetId: 'pipe_savers' },
      { label: 'SBI, LIC & Japan JBIC', targetId: 'pipe_mobilisers' },
      { label: 'Western Dedicated Freight Corridor', targetId: 'pipe_investments' },
    ],
    correctMapping: {
      pipe_savers: '500M+ Retail Account Holders',
      pipe_mobilisers: 'SBI, LIC & Japan JBIC',
      pipe_investments: 'Western Dedicated Freight Corridor',
    },
    explanation: 'Households and international partners generate savings (Phase 1); financial institutions pool and allocate these funds (Phase 2); DMIC constructs high-speed freight rail and smart city infrastructure (Phase 3).',
    hints: [
      'Who foregoes immediate consumption? The retail savers and partner country investors.',
      'Which financial giants bridge the gap and underwrite the mega debt?',
      'What physical capital asset is being laid down between Delhi and Mumbai?',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C10_ECONAPP_020,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A small entrepreneur borrows ₹2,00,000 under the Mudra Kishore category at 10% annual simple interest for 1 year to buy computerized stitching machines, generating ₹60,000 in net operational surplus. How much net profit remains after paying the annual interest?',
    correctAnswer: 40000,
    tolerance: 100,
    unit: '₹',
    explanation: 'Annual Interest = 10% of ₹2,00,000 = ₹20,000. Net Profit after interest = ₹60,000 - ₹20,000 = ₹40,000. Because return (30%) exceeds borrowing cost (10%), formal credit is highly productive.',
    hints: [
      'Find the interest amount: ₹2,00,000 * 0.10.',
      'Interest = ₹20,000.',
      'Subtract ₹20,000 from the operational surplus of ₹60,000. Enter 40000.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C10_ECONAPP_017,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Between 2015 and 2022, the Skill India Mission trained ~13 million candidates under PMKVY, yet only ~30% secured verified placements. What economic principle explains why training alone did not instantly multiply labour productivity?',
    options: [
      'Labour efficiency requires the simultaneous presence of high-technology capital tooling, healthy workforce nutrition, and strong industrial demand matching the acquired skills',
      'Skills are completely useless in an industrial economy',
      'All 13 million candidates refused to accept wages higher than ₹100/day',
      'Vocational training reduces the intelligence of workers',
    ],
    correctIndex: 0,
    explanation: 'Labour is complementary to physical capital and health. Training without modern factory machinery, adequate wages/nutrition, and industrial job creation cannot convert human capital into realized output.',
    hints: [
      'Can a certified worker be productive if the factory still uses obsolete 50-year-old broken machines?',
      'Think about the interaction between human capital, physical capital endowment, and market demand.',
      'Productivity requires a holistic ecosystem: skills + modern machinery + health + capital investment.',
    ],
  },
  {
    id: 'ch_23',
    nodeId: NODE_C10_ECONAPP_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'The LARR Act 2013 mandates 4x market value compensation for rural farmland acquisition and 80% landowner consent for private industrial projects. Which economic characteristic of land justifies this high regulatory protection?',
    options: [
      'Land is strictly fixed in supply and immobile, so displaced rural farming families permanently lose their unique location-specific livelihood and generational food security base',
      'Land area can be manufactured in unlimited quantities in chemical laboratories',
      'Farmland expands automatically by 10% every monsoon season',
      'The government wants to stop all industrial development forever',
    ],
    correctIndex: 0,
    explanation: 'Because land cannot be reproduced or relocated, agricultural families lose their permanent factor endowment when displaced. Higher compensation and consent thresholds reflect land scarcity and immobility.',
    hints: [
      'If a farmer sells their fertile multi-crop plot in Singur, can they create a new duplicate plot?',
      'Reflect on the immobility and non-reproducible nature of land.',
      'Fixed supply and immobility make land acquisition irreversible for farming livelihoods.',
    ],
  },
  {
    id: 'ch_24',
    nodeId: NODE_C10_ECONAPP_018,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Reliance Industries invested over ₹60,000 Crore in the Jamnagar Refinery (Fixed Physical Capital) while employing 25,000+ specialized engineers (Human Capital). Why are Physical Capital and Human Capital considered complementary rather than pure substitutes?',
    options: [
      'Sophisticated high-tech distillation towers and catalytic crackers remain completely unproductive without skilled engineers to program, monitor, and maintain them',
      'Physical capital generates electricity while human capital consumes coal',
      'They are identical concepts with zero distinction',
      'Engineers can manually refine 1.24 million barrels of crude oil per day using bare hands without machines',
    ],
    correctIndex: 0,
    explanation: 'Capital is a passive factor without labour. Advanced physical capital requires high human capital for operation; conversely, skilled engineers achieve massive output only when leveraged by multi-billion rupee machinery.',
    hints: [
      'What happens to a ₹60,000 Crore refinery if all engineers walk away?',
      'Can the engineers refine crude oil with bare hands without the plant?',
      'They amplify each other: physical capital needs human intellect, and human intellect needs physical tools.',
    ],
    misconceptionIndex: 3,
  },
];

// ─── REAL-WORLD CAPSTONE PROJECT ───
const REAL_WORLD_ACTIVITY = {
  title: 'Economic Cluster Revitalisation Blueprint',
  description: 'Apply your economic insights to a real district in India (e.g. Nashik, Tirupur, or Jamshedpur). Formulate an integrated plan combining factor enhancements, credit subvention, and supply elasticity measures.',
  steps: [
    'Identify a major local product (e.g. Nashik Onions or Surat Synthetic Silk).',
    'Assess its short-run vs long-run Elasticity of Supply (Es) and cold storage / warehousing gaps.',
    'Formulate land conservation guidelines preventing ecosystem erosion in surrounding hills/wetlands.',
    'Design a process-based division of labour structure with vocational PMKVY training to raise hourly output.',
    'Map the capital formation route: mobilizing local cooperative savings into cold chain & solar machinery.',
    'Structure formal Kisan Credit Card / Mudra loans to eliminate dependence on usurious 48% moneylenders.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ───
export default function C10_EconApplicationsElasticitySupplyMeaningSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_ECONAPP_011,
  title = DEFAULT_PROPS.title || 'Elasticity of Supply & Factors of Production',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['econapp'] || { name: 'Economic Applications', emoji: '📈', color: 'emerald' };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');

  // ─── INTERACTIVE SIMULATION STATES (30+ useState calls) ───
  const [priceChangePct, setPriceChangePct] = useState<number>(20); // -50% to +100%
  const [goodType, setGoodType] = useState<'perishable' | 'manufactured' | 'durable_stored'>('perishable');
  const [timeHorizon, setTimeHorizon] = useState<'very_short' | 'short_run' | 'long_run'>('short_run');
  const [hasColdStorage, setHasColdStorage] = useState<boolean>(false);

  // Land lab states
  const [irrigationLevel, setIrrigationLevel] = useState<number>(30); // 0-100%
  const [technologyInput, setTechnologyInput] = useState<'traditional' | 'hyv_drip' | 'precision'>('traditional');
  const [tenureSystem, setTenureSystem] = useState<'insecure_tenant' | 'secure_owner'>('insecure_tenant');
  const [landDegradationPct, setLandDegradationPct] = useState<number>(15);

  // Labour lab states
  const [assemblyStations, setAssemblyStations] = useState<number>(1); // 1, 2, 4, 8
  const [wageLevel, setWageLevel] = useState<number>(280); // ₹280 to ₹1200 / day
  const [workerHealthScore, setWorkerHealthScore] = useState<number>(50); // 0-100
  const [skillingCertified, setSkillingCertified] = useState<boolean>(false);

  // Capital Formation states
  const [householdSavingsRate, setHouseholdSavingsRate] = useState<number>(25); // % of GDP
  const [bankIntermediationHealth, setBankIntermediationHealth] = useState<number>(75); // %
  const [npaLevelPct, setNpaLevelPct] = useState<number>(4); // %
  const [fdiInflowBillion, setFdiInflowBillion] = useState<number>(40);

  // Credit lab states
  const [creditSource, setCreditSource] = useState<'formal_bank' | 'informal_moneylender'>('formal_bank');
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [customInterestRate, setCustomInterestRate] = useState<number>(7);
  const [expectedCropRevenue, setExpectedCropRevenue] = useState<number>(85000);

  // Brilliant pattern states
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);
  const [predictionMade, setPredictionMade] = useState<boolean>(false);
  const [predictionIndex, setPredictionIndex] = useState<number>(-1);
  const [predictionVerified, setPredictionVerified] = useState<boolean>(false);
  const [observationAnswered, setObservationAnswered] = useState<boolean>(false);
  const [observationIndex, setObservationIndex] = useState<number>(-1);

  // Challenge and Feedback states
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag, Sort & Construct state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Effects
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const supplyCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── COMPUTED REAL-TIME VALUES ───
  // Elasticity calculation
  const computedEs = useMemo(() => {
    let base = 1.0;
    if (goodType === 'perishable') {
      base = hasColdStorage ? 0.8 : 0.2;
    } else if (goodType === 'manufactured') {
      base = 1.6;
    } else {
      base = 1.2;
    }

    if (timeHorizon === 'very_short') base *= 0.25;
    else if (timeHorizon === 'short_run') base *= 0.75;
    else base *= 1.8;

    return Number(base.toFixed(2));
  }, [goodType, hasColdStorage, timeHorizon]);

  const computedQuantityChangePct = useMemo(() => {
    return Number((priceChangePct * computedEs).toFixed(1));
  }, [priceChangePct, computedEs]);

  // Land Productivity calculation
  const computedLandYield = useMemo(() => {
    let baseYield = 1200; // kg/ha
    baseYield += irrigationLevel * 15;
    if (technologyInput === 'hyv_drip') baseYield *= 1.4;
    if (technologyInput === 'precision') baseYield *= 1.7;
    if (tenureSystem === 'secure_owner') baseYield *= 1.25;
    baseYield *= Math.max(0.3, (100 - landDegradationPct) / 100);
    return Math.round(baseYield);
  }, [irrigationLevel, technologyInput, tenureSystem, landDegradationPct]);

  // Labour Assembly output
  const computedLabourOutputPerHour = useMemo(() => {
    let base = 5; // units per worker
    if (assemblyStations === 1) base = 5;
    else if (assemblyStations === 2) base = 14;
    else if (assemblyStations === 4) base = 36;
    else base = 85;

    const healthFactor = workerHealthScore / 50;
    const wageIncentive = Math.min(2.0, wageLevel / 280);
    const skillMultiplier = skillingCertified ? 1.4 : 1.0;

    return Math.round(base * healthFactor * (0.5 + 0.5 * wageIncentive) * skillMultiplier);
  }, [assemblyStations, workerHealthScore, wageLevel, skillingCertified]);

  // Capital Formation Real Investment Rate
  const computedGFCF = useMemo(() => {
    const effectiveMobilisation = (bankIntermediationHealth / 100) * (1 - npaLevelPct / 100);
    const domesticInvestment = householdSavingsRate * effectiveMobilisation;
    const foreignContribution = (fdiInflowBillion / 50) * 1.5;
    return Number((domesticInvestment + foreignContribution).toFixed(1));
  }, [householdSavingsRate, bankIntermediationHealth, npaLevelPct, fdiInflowBillion]);

  // Credit Net Margin
  const computedCreditBreakdown = useMemo(() => {
    const interestRate = creditSource === 'formal_bank' ? 7 : customInterestRate;
    const interestCost = (loanAmount * interestRate) / 100;
    const totalRepayment = loanAmount + interestCost;
    const netFarmerProfit = expectedCropRevenue - totalRepayment;
    const isDebtTrap = netFarmerProfit < 0;
    return {
      interestRate,
      interestCost,
      totalRepayment,
      netFarmerProfit,
      isDebtTrap,
    };
  }, [creditSource, customInterestRate, loanAmount, expectedCropRevenue]);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECT 1: LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── EFFECT 2: BKT ADAPTIVE UPDATES ───
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

  // ─── EFFECT 3: SUPPLY GRAPH CANVAS (2D Animation) ───
  useEffect(() => {
    const canvas = supplyCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let pulse = 0;

    const render = () => {
      pulse += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const pad = 40;

      // Draw Axes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pad, pad);
      ctx.lineTo(pad, h - pad);
      ctx.lineTo(w - pad, h - pad);
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Price (P)', 10, pad + 5);
      ctx.fillText('Quantity Supplied (Q)', w - 120, h - 15);

      // Grid lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let i = pad + 40; i < w - pad; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, pad);
        ctx.lineTo(i, h - pad);
        ctx.stroke();
      }
      for (let j = pad; j < h - pad; j += 40) {
        ctx.beginPath();
        ctx.moveTo(pad, j);
        ctx.lineTo(w - pad, j);
        ctx.stroke();
      }

      // Draw Supply Curve based on computedEs
      // Higher Es = flatter curve. Es = 0 -> vertical. Es = Inf -> horizontal
      const originX = pad + 30;
      const originY = h - pad - 20;

      const slope = Math.max(0.1, 2.5 - computedEs * 1.0); // steep when Es low, flat when Es high
      const endX = Math.min(w - pad - 10, originX + (h - 2 * pad) / slope);
      const endY = originY - (endX - originX) * slope;

      ctx.strokeStyle = computedEs >= 1 ? '#10b981' : '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(endX, Math.max(pad + 10, endY));
      ctx.stroke();

      // Label on Curve
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`Supply (Es = ${computedEs})`, endX - 60, Math.max(pad + 25, endY - 10));

      // Operating Point
      const currentPriceNorm = (priceChangePct + 50) / 150; // 0 to 1
      const ptY = (h - pad - 30) - currentPriceNorm * (h - 2 * pad - 40);
      const ptX = originX + (originY - ptY) / slope;

      if (ptX >= pad && ptX <= w - pad) {
        // Dot with pulse ring
        const radius = 6 + Math.sin(pulse) * 2;
        ctx.beginPath();
        ctx.arc(ptX, ptY, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ec4899';
        ctx.fill();

        // Coordinates projection
        ctx.strokeStyle = '#ec489988';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(ptX, ptY);
        ctx.lineTo(pad, ptY);
        ctx.moveTo(ptX, ptY);
        ctx.lineTo(ptX, h - pad);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#f472b6';
        ctx.font = '10px sans-serif';
        ctx.fillText(`P: ${priceChangePct >= 0 ? '+' : ''}${priceChangePct}%`, pad + 5, ptY - 4);
        ctx.fillText(`Q: ${computedQuantityChangePct >= 0 ? '+' : ''}${computedQuantityChangePct}%`, ptX - 15, h - pad + 14);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [computedEs, priceChangePct, computedQuantityChangePct]);

  // ─── EFFECT 4: PULSE ANIMATION CANVAS FOR CHALLENGE PHASE ───
  useEffect(() => {
    if (phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const renderHeader = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradient background
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.5, '#1e1b4b');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Challenge counter
      ctx.fillStyle = '#a5b4fc';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(`CISCE Board Challenge ${currentChallenge + 1} / ${filteredChallenges.length}`, 15, 20);

      // Active radar wave
      const waveX = (frame * 3) % canvas.width;
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(waveX, 0);
      ctx.lineTo(waveX, canvas.height);
      ctx.stroke();

      animId = requestAnimationFrame(renderHeader);
    };

    renderHeader();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge, filteredChallenges.length]);

  // ─── EFFECT 5: CLEANUP INACTIVITY TIMER ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── 14+ USECALLBACK EVENT HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
      speechManager.speak('Let us study the complete step-by-step ICSE explanation together.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Touch and experiment with each variable!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test extreme economic scenarios without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    setErrors(0);
    setScoreBreakdown({ correct: 0, total: 0 });
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenge questions.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Look closely at how the visual curve adjusted.');
  }, []);

  const handlePriceSlider = useCallback((val: number) => {
    setPriceChangePct(val);
    audioManager.play('count');
    if (predictionMade && !predictionVerified && Math.abs(val) >= 20) {
      setPredictionVerified(true);
      audioManager.play('chime');
    }
  }, [predictionMade, predictionVerified]);

  const handleGoodTypeChange = useCallback((type: 'perishable' | 'manufactured' | 'durable_stored') => {
    setGoodType(type);
    audioManager.play('tap');
  }, []);

  const handleTimeHorizonChange = useCallback((horizon: 'very_short' | 'short_run' | 'long_run') => {
    setTimeHorizon(horizon);
    audioManager.play('tap');
  }, []);

  const handleAssemblyStationChange = useCallback((stations: number) => {
    setAssemblyStations(stations);
    audioManager.play('tap');
    audioManager.play('balance');
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

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the comprehensive Economic Applications simulation.');
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.05);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Well reasoned.');
      setShowConfetti(true);
      setShowExplanation(true);

      // BKT Update
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      // SRS Update
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Let us examine the full solution.');
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

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-lg"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ICSE Class 10 Economics
              </span>
              <span className="text-xs text-slate-400">Chapters 2 & 3: Production & Supply</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-0.5 tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((pTab) => (
            <motion.button
              key={pTab}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setPhase(pTab);
                audioManager.play('tap');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                phase === pTab
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {pTab === 'discovery' && '1. Hook'}
              {pTab === 'explore' && '2. Interactive Lab'}
              {pTab === 'sandbox' && '3. Sandbox'}
              {pTab === 'challenge' && '4. CISCE Quiz'}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Hero */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 rounded-2xl border border-indigo-700/40 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🌾</span> Real-World Economic Scenario
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3.5 bg-indigo-900/30 rounded-xl border border-indigo-800/40 text-xs text-indigo-200 flex items-center gap-2">
              <span className="text-base">📌</span> {SCENARIO.context}
            </div>
          </div>

          {/* Interactive Curiosity Question */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2 mb-4">
              <span>🤔</span> Discovery Challenge (Not Graded — Test Your Instincts!)
            </h3>
            <p className="text-slate-200 font-medium mb-4 leading-relaxed">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => {
                const isSelected = discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex;
                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                      discoveryAnswered
                        ? isSelected
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/50 border-slate-700/50 text-slate-400 opacity-60'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-emerald-500/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div>
                  <p className={`text-sm font-bold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '🎯 Spot on! Biological crops take a full growing season.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supply cannot react instantly in the very short run. Let us enter the simulation lab to see how price, time, and inputs determine responsiveness.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-sm shadow-lg shadow-emerald-950/80 flex items-center gap-2 flex-shrink-0"
                >
                  Enter Interactive Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (Brilliant.org Core) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Selector Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`p-3 rounded-xl text-left border transition-all ${
                  currentSlide === idx
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-300'
                }`}
              >
                <div className="text-[10px] font-bold text-slate-400 uppercase">Step {idx + 1}</div>
                <div className="text-xs font-bold truncate mt-0.5">{step.title}</div>
              </motion.button>
            ))}
          </div>

          {/* Active Exploration Workspace */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <span className="text-emerald-400">Step {currentSlide + 1}:</span> {EXPLORATION_STEPS[currentSlide].title}
                  </h3>
                  <p className="text-xs text-amber-300 mt-1 font-medium flex items-center gap-1.5">
                    <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                  </p>
                </div>
                <span className="text-xs font-mono px-3 py-1 bg-slate-800 text-slate-300 rounded-lg">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              {/* ─── SLIDE 0: SUPPLY ELASTICITY LAB ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Controls */}
                  <div className="lg:col-span-5 space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Control Variables</h4>

                    {/* Good Type Toggle */}
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1.5">1. Commodity Type</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { id: 'perishable', label: '🍅 Tomatoes', sub: 'Perishable' },
                          { id: 'manufactured', label: '📱 Phones', sub: 'Foxconn Fab' },
                          { id: 'durable_stored', label: '🔩 Steel', sub: 'Tata Steel' },
                        ].map(t => (
                          <motion.button
                            key={t.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleGoodTypeChange(t.id as any)}
                            className={`p-2 rounded-lg text-left border text-xs font-bold transition-all ${
                              goodType === t.id
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                                : 'bg-slate-850 border-slate-700 text-slate-400'
                            }`}
                          >
                            <div>{t.label}</div>
                            <div className="text-[10px] font-normal text-slate-400">{t.sub}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Time Horizon */}
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1.5">2. Time Horizon</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { id: 'very_short', label: 'Market Day' },
                          { id: 'short_run', label: '1 Quarter' },
                          { id: 'long_run', label: '2-3 Years' },
                        ].map(h => (
                          <motion.button
                            key={h.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleTimeHorizonChange(h.id as any)}
                            className={`p-2 rounded-lg text-center border text-xs font-bold ${
                              timeHorizon === h.id
                                ? 'bg-indigo-900/60 border-indigo-500 text-indigo-200'
                                : 'bg-slate-850 border-slate-700 text-slate-400'
                            }`}
                          >
                            {h.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Cold Storage Addon for perishable */}
                    {goodType === 'perishable' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-3 bg-slate-900 rounded-lg border border-slate-850 flex items-center justify-between"
                      >
                        <span className="text-xs text-slate-300">Equip Modern Cold Storage?</span>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setHasColdStorage(!hasColdStorage);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${
                            hasColdStorage
                              ? 'bg-cyan-600 border-cyan-400 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          {hasColdStorage ? '✓ Active' : '✕ Disabled'}
                        </motion.button>
                      </motion.div>
                    )}

                    {/* Price Slider */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Market Price Shock (%ΔP):</span>
                        <span className={priceChangePct >= 0 ? 'text-emerald-400 font-mono' : 'text-rose-400 font-mono'}>
                          {priceChangePct >= 0 ? '+' : ''}{priceChangePct}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={-50}
                        max={100}
                        value={priceChangePct}
                        aria-label="Market Price Shock percentage"
                        onChange={(e) => handlePriceSlider(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    {/* Real-time Calculation Card */}
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Calculated Elasticity (Es):</span>
                        <span className="font-bold font-mono text-cyan-300">{computedEs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Classification:</span>
                        <span className="font-bold text-amber-300">
                          {computedEs === 0
                            ? 'Perfectly Inelastic (Es = 0)'
                            : computedEs < 1
                            ? 'Inelastic Supply (Es < 1)'
                            : computedEs === 1
                            ? 'Unitary Elastic (Es = 1)'
                            : 'Elastic Supply (Es > 1)'}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-slate-800 pt-1.5">
                        <span className="text-slate-300 font-semibold">Quantity Supplied Response (%ΔQs):</span>
                        <span className="font-bold font-mono text-emerald-400">
                          {computedQuantityChangePct >= 0 ? '+' : ''}{computedQuantityChangePct}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Live Canvas Graph */}
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-300">Dynamic Supply Schedule Graph</span>
                        <span className="text-[10px] text-slate-400">Rendered with HTML5 Canvas 2D</span>
                      </div>
                      <canvas ref={supplyCanvasRef} width={450} height={260} className="w-full bg-slate-900 rounded-lg border border-slate-800" />
                    </div>

                    {/* Predict-then-check & Observation prompts */}
                    {!predictionMade ? (
                      <div className="mt-4 p-3 bg-indigo-950/60 rounded-xl border border-indigo-800/50">
                        <p className="text-xs text-indigo-200 font-bold mb-2">🔮 {PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(i)}
                              className="p-2 text-left bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/40 flex items-center justify-between text-xs">
                        <span className="text-emerald-300">
                          {predictionIndex === PREDICTION_QUESTIONS[0].correctIndex
                            ? '✓ Prediction verified! Notice how the supply curve for smartphones becomes flat and responsive.'
                            : '💡 Look at the curve: manufactured goods easily scale up with extra shifts, making supply elastic.'}
                        </span>
                        {!observationAnswered && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleObservation(0)}
                            className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg ml-2 flex-shrink-0"
                          >
                            Verify Observation
                          </motion.button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: LAND PRODUCTIVITY & ECOSYSTEM ─── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Controls */}
                  <div className="lg:col-span-5 space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Factors Affecting Land Productivity</h4>

                    {/* Irrigation Slider */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Canal & Tube-Well Irrigation:</span>
                        <span className="text-cyan-400 font-mono">{irrigationLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={irrigationLevel}
                        aria-label="Irrigation percentage slider"
                        onChange={(e) => {
                          setIrrigationLevel(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    {/* Technology Toggle */}
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1.5">Agritech Adoption</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { id: 'traditional', label: 'Traditional Seeds' },
                          { id: 'hyv_drip', label: 'HYV + Drip PMKSY' },
                          { id: 'precision', label: 'Precision Agri' },
                        ].map(t => (
                          <motion.button
                            key={t.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setTechnologyInput(t.id as any);
                              audioManager.play('tap');
                            }}
                            className={`p-2 rounded-lg text-center border text-xs font-bold ${
                              technologyInput === t.id
                                ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200'
                                : 'bg-slate-850 border-slate-700 text-slate-400'
                            }`}
                          >
                            {t.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Land Tenure System */}
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1.5">Land Tenure / Ownership Incentive</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'insecure_tenant', label: 'Insecure Tenancy', sub: 'Zero long-term soil investment' },
                          { id: 'secure_owner', label: 'Owner-Cultivator', sub: 'Invests in bunding & fertility' },
                        ].map(ten => (
                          <motion.button
                            key={ten.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setTenureSystem(ten.id as any);
                              audioManager.play('tap');
                            }}
                            className={`p-2 rounded-lg text-left border text-xs font-bold ${
                              tenureSystem === ten.id
                                ? 'bg-indigo-900/70 border-indigo-500 text-indigo-200'
                                : 'bg-slate-850 border-slate-700 text-slate-400'
                            }`}
                          >
                            <div>{ten.label}</div>
                            <div className="text-[10px] font-normal text-slate-400">{ten.sub}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Degradation slider */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Ecosystem Degradation (Erosion/Salinity):</span>
                        <span className="text-rose-400 font-mono">{landDegradationPct}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={80}
                        value={landDegradationPct}
                        aria-label="Land Degradation percentage"
                        onChange={(e) => {
                          setLandDegradationPct(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Right Visualization: Land Field Diagram */}
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-slate-300">Farm Plot Ecosystem & Yield Monitor</span>
                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          Yield: {computedLandYield} kg/ha
                        </span>
                      </div>

                      {/* SVG Field Visual */}
                      <svg viewBox="0 0 400 220" className="w-full bg-slate-900 rounded-xl border border-slate-800">
                        {/* Soil Layer */}
                        <rect x="20" y="130" width="360" height="70" rx="6" fill={landDegradationPct > 40 ? '#574130' : '#2b1d12'} />
                        {/* Grass/Crop canopy */}
                        <path
                          d="M 20 130 Q 80 120, 140 130 T 260 130 T 380 130 L 380 145 L 20 145 Z"
                          fill={landDegradationPct > 50 ? '#854d0e' : '#15803d'}
                        />

                        {/* Crops dynamically rendered */}
                        {Array.from({ length: 9 }).map((_, i) => {
                          const cropHeight = Math.min(45, (computedLandYield / 3000) * 45);
                          return (
                            <g key={i} transform={`translate(${45 + i * 36}, ${130 - cropHeight})`}>
                              <line x1="0" y1={cropHeight} x2="0" y2="0" stroke="#22c55e" strokeWidth="3" />
                              <circle cx="0" cy="0" r="4" fill="#eab308" />
                            </g>
                          );
                        })}

                        {/* Irrigation Sprinklers */}
                        {irrigationLevel > 20 && (
                          <g>
                            <circle cx="100" cy="110" r="3" fill="#38bdf8" />
                            <path d="M 100 110 Q 120 90, 140 115" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                            <circle cx="280" cy="110" r="3" fill="#38bdf8" />
                            <path d="M 280 110 Q 300 90, 320 115" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
                          </g>
                        )}

                        {/* Soil degradation cracks if high */}
                        {landDegradationPct > 30 && (
                          <path d="M 60 150 L 80 170 L 95 160 M 220 155 L 240 180" stroke="#78350f" strokeWidth="2" fill="none" />
                        )}

                        <text x="200" y="30" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">
                          {tenureSystem === 'secure_owner' ? 'Owner-Cultivated Green Revolution Plot' : 'Insecure Tenancy Plot'}
                        </text>
                        <text x="200" y="50" textAnchor="middle" fill="#94a3b8" fontSize="10">
                          {irrigationLevel >= 50 ? 'Assured Water (Punjab/Haryana Model)' : 'Rainfed Monsoon-Dependent (Vidarbha/Odisha)'}
                        </text>
                      </svg>
                    </div>

                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                      <span className="text-emerald-400 font-bold">Key ICSE Takeaway:</span> Productivity of Land (Output/Hectare) is not just natural fertility; it is multiplied by Irrigation, High-Yield Seeds, and secure Land Tenure reforms.
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: LABOUR & DIVISION OF LABOUR ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Controls */}
                  <div className="lg:col-span-5 space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Labour Organisation Controls</h4>

                    {/* Stations Selector */}
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1.5">
                        Assembly Line Stations (Process Division)
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[
                          { count: 1, label: '1 Master' },
                          { count: 2, label: '2 Steps' },
                          { count: 4, label: '4 Stations' },
                          { count: 8, label: '8 Stations' },
                        ].map(st => (
                          <motion.button
                            key={st.count}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAssemblyStationChange(st.count)}
                            className={`p-2 rounded-lg text-center border text-xs font-bold ${
                              assemblyStations === st.count
                                ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200'
                                : 'bg-slate-850 border-slate-700 text-slate-400'
                            }`}
                          >
                            {st.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Wage Level */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Daily Wage (Nutrition & Incentive):</span>
                        <span className="text-amber-400 font-mono">₹{wageLevel}/day</span>
                      </div>
                      <input
                        type="range"
                        min={280}
                        max={1200}
                        step={20}
                        value={wageLevel}
                        aria-label="Daily Wage level slider"
                        onChange={(e) => {
                          setWageLevel(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    {/* Health & Nutrition */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Health & Stamina (NFHS Childhood Baseline):</span>
                        <span className="text-cyan-400 font-mono">{workerHealthScore}/100</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={100}
                        value={workerHealthScore}
                        aria-label="Worker Health and Stamina slider"
                        onChange={(e) => {
                          setWorkerHealthScore(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    {/* Skill India PMKVY toggle */}
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-850 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-200">PMKVY Skill Certification</div>
                        <div className="text-[10px] text-slate-400">Standardises dexterity & tool usage</div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSkillingCertified(!skillingCertified);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          skillingCertified
                            ? 'bg-emerald-600 border-emerald-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        {skillingCertified ? '✓ Certified' : '✕ Unskilled'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Right Visualization: Car Assembly Line */}
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-slate-300">Maruti Suzuki Assembly Simulation</span>
                        <span className="text-xs font-mono px-3 py-1 bg-emerald-950 text-emerald-300 rounded-lg border border-emerald-800 font-bold">
                          Output: {computedLabourOutputPerHour} Units / Hour
                        </span>
                      </div>

                      {/* Assembly Line Diagram */}
                      <div className="grid grid-cols-4 gap-2 bg-slate-900 p-4 rounded-xl border border-slate-800 min-h-[160px] items-center">
                        {['Engine Mount', 'Chassis & Doors', 'Wiring & Glass', 'Final QC Inspection'].slice(0, assemblyStations).map((stName, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 text-center space-y-2 relative"
                          >
                            <div className="w-8 h-8 rounded-full bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-xs font-black text-emerald-300 mx-auto">
                              {idx + 1}
                            </div>
                            <div className="text-xs font-bold text-white">{stName}</div>
                            <div className="text-[10px] text-slate-400">Repetitive speed</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                      <span className="text-amber-300 font-bold">Adam Smith Principle (Pin Factory / Maruti Manesar):</span> Specialisation eliminates tool-switching waste and builds motor dexterity, multiplying total output exponentially.
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: CAPITAL FORMATION PIPELINE ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Controls */}
                  <div className="lg:col-span-5 space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">3-Phase Capital Pipeline</h4>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Phase 1: Household Savings Rate (% of GDP):</span>
                        <span className="text-emerald-400 font-mono">{householdSavingsRate}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={45}
                        value={householdSavingsRate}
                        aria-label="Household Savings Rate percentage slider"
                        onChange={(e) => {
                          setHouseholdSavingsRate(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Phase 2: Bank NPAs (Bad Loans):</span>
                        <span className="text-rose-400 font-mono">{npaLevelPct}%</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={18}
                        value={npaLevelPct}
                        aria-label="Bank NPAs percentage slider"
                        onChange={(e) => {
                          setNpaLevelPct(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Phase 3: Foreign Capital Inflows (FDI $B):</span>
                        <span className="text-cyan-400 font-mono">${fdiInflowBillion} B</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={fdiInflowBillion}
                        aria-label="Foreign Capital Inflows in Billions slider"
                        onChange={(e) => {
                          setFdiInflowBillion(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Right Flow Visualization */}
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-slate-300">Real Capital Formation (GFCF) Flow</span>
                        <span className="text-xs font-mono px-3 py-1 bg-cyan-950 text-cyan-300 rounded-lg border border-cyan-800 font-bold">
                          GFCF: {computedGFCF}% of GDP
                        </span>
                      </div>

                      {/* 3 Step Interactive Pipeline */}
                      <div className="flex flex-col md:flex-row items-center justify-between gap-2 bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-700/50 text-center flex-1 w-full">
                          <div className="text-lg">💰</div>
                          <div className="text-xs font-bold text-emerald-300">1. Savings</div>
                          <div className="text-[10px] text-slate-400">₹{householdSavingsRate}% of GDP</div>
                        </div>

                        <div className="text-slate-500 text-sm hidden md:block">➔</div>

                        <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-700/50 text-center flex-1 w-full">
                          <div className="text-lg">🏦</div>
                          <div className="text-xs font-bold text-indigo-300">2. Mobilisation</div>
                          <div className="text-[10px] text-slate-400">SBI, LIC, BSE (NPA: {npaLevelPct}%)</div>
                        </div>

                        <div className="text-slate-500 text-sm hidden md:block">➔</div>

                        <div className="p-3 bg-cyan-950/60 rounded-xl border border-cyan-700/50 text-center flex-1 w-full">
                          <div className="text-lg">🏭</div>
                          <div className="text-xs font-bold text-cyan-300">3. Investment</div>
                          <div className="text-[10px] text-slate-400">Tata Steel / DMIC Rail</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                      <span className="text-cyan-300 font-bold">Crucial Distinction:</span> Money in a mattress is only saving. It becomes Capital Formation only after financial intermediaries channel it into actual physical factories and machinery.
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: CREDIT SIMULATOR ─── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Controls */}
                  <div className="lg:col-span-5 space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Credit Source & Interest Terms</h4>

                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setCreditSource('formal_bank');
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl border text-left text-xs font-bold ${
                          creditSource === 'formal_bank'
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : 'bg-slate-850 border-slate-700 text-slate-400'
                        }`}
                      >
                        <div className="text-sm">🏛️ Formal Bank (KCC)</div>
                        <div className="text-[10px] text-slate-400 mt-1">7% Subvented Interest</div>
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setCreditSource('informal_moneylender');
                          setCustomInterestRate(48);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl border text-left text-xs font-bold ${
                          creditSource === 'informal_moneylender'
                            ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-slate-850 border-slate-700 text-slate-400'
                        }`}
                      >
                        <div className="text-sm">👤 Moneylender</div>
                        <div className="text-[10px] text-slate-400 mt-1">36% - 60% Usurious Rate</div>
                      </motion.button>
                    </div>

                    {creditSource === 'informal_moneylender' && (
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-300">Informal Moneylender Rate (% p.a.):</span>
                          <span className="text-rose-400 font-mono">{customInterestRate}%</span>
                        </div>
                        <input
                          type="range"
                          min={24}
                          max={72}
                          step={6}
                          value={customInterestRate}
                          aria-label="Informal Moneylender Interest Rate slider"
                          onChange={(e) => {
                            setCustomInterestRate(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Crop Loan Principal Required:</span>
                        <span className="text-cyan-400 font-mono">₹{loanAmount.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min={20000}
                        max={150000}
                        step={5000}
                        value={loanAmount}
                        aria-label="Crop Loan Principal Required slider"
                        onChange={(e) => {
                          setLoanAmount(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Right Visualization */}
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-slate-300">Farmer Profit & Debt-Trap Gauge</span>
                        <span
                          className={`text-xs font-mono px-3 py-1 rounded-lg border font-bold ${
                            computedCreditBreakdown.isDebtTrap
                              ? 'bg-rose-950 text-rose-300 border-rose-700'
                              : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                          }`}
                        >
                          Net Profit: ₹{computedCreditBreakdown.netFarmerProfit.toLocaleString()}
                        </span>
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Total Crop Revenue:</span>
                          <span className="font-bold text-slate-200">₹{expectedCropRevenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Loan Principal Repaid:</span>
                          <span className="font-bold text-slate-200">₹{loanAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Interest Paid ({computedCreditBreakdown.interestRate}%):</span>
                          <span className="font-bold text-rose-400">- ₹{computedCreditBreakdown.interestCost.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-bold">
                          <span className="text-white">Farmer Take-Home Surplus:</span>
                          <span className={computedCreditBreakdown.isDebtTrap ? 'text-rose-400' : 'text-emerald-400'}>
                            ₹{computedCreditBreakdown.netFarmerProfit.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      {computedCreditBreakdown.isDebtTrap ? (
                        <span className="text-rose-400 font-bold">
                          ⚠️ Debt Trap Alert: Exorbitant moneylender rates exceed farming operational surplus, forcing the farmer to borrow again just to survive.
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-bold">
                          ✓ Productive Credit: Formal credit enables input purchases ahead of harvest while preserving healthy household surplus.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Exploration Controls Navigation */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Concept
                </motion.button>
                <span className="text-xs text-slate-400 font-mono">
                  {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                  >
                    Next Concept →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-950"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>🧪</span> Free Exploration Sandbox
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Zero grading stress. Manipulate supply elasticity, land productivity, assembly division, and capital flows freely.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-sm shadow-xl shadow-emerald-950 flex items-center gap-2 flex-shrink-0"
            >
              Start Board Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1: Elasticity Quick Check */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-emerald-300">1. Supply Elasticity Gauge</div>
              <div className="text-2xl font-black text-white font-mono">{computedEs}</div>
              <input
                type="range"
                min={-50}
                max={100}
                value={priceChangePct}
                aria-label="Sandbox price change slider"
                onChange={(e) => setPriceChangePct(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="text-[11px] text-slate-400">Price Δ: {priceChangePct}% | Qs Δ: {computedQuantityChangePct}%</div>
            </div>

            {/* Box 2: Land Yield */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-cyan-300">2. Land Output (kg/ha)</div>
              <div className="text-2xl font-black text-white font-mono">{computedLandYield} kg/ha</div>
              <input
                type="range"
                min={0}
                max={100}
                value={irrigationLevel}
                aria-label="Sandbox irrigation level slider"
                onChange={(e) => setIrrigationLevel(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
              <div className="text-[11px] text-slate-400">Irrigation: {irrigationLevel}% | Tenure: {tenureSystem}</div>
            </div>

            {/* Box 3: Labour Output */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-amber-300">3. Assembly Speed</div>
              <div className="text-2xl font-black text-white font-mono">{computedLabourOutputPerHour} u/hr</div>
              <input
                type="range"
                min={280}
                max={1200}
                value={wageLevel}
                aria-label="Sandbox wage level slider"
                onChange={(e) => setWageLevel(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="text-[11px] text-slate-400">Wage: ₹{wageLevel} | Stations: {assemblyStations}</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (Adaptive CISCE Quiz) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header Animation Canvas */}
          <canvas ref={canvasRef} width={800} height={30} className="w-full rounded-xl" />

          {/* Progress and Difficulty Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">Challenge {currentChallenge + 1}</span>
              <span className="text-xs text-slate-400">of {filteredChallenges.length}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono uppercase">
                {challenge.competencyLevel}
              </span>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : difficulty === 'advanced'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
              }`}
            >
              {difficulty} TIER
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-850 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'border-rose-500 bg-rose-950/40' : 'border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">{challenge.question}</p>

            {/* ─── MCQ / CLASSIFY / DISTINGUISH ─── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => {
                  const isChosenCorrect = showExplanation && i === challenge.correctIndex;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium border transition-all ${
                        isChosenCorrect
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-850 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-750 flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* ─── NUMERIC CHALLENGE ─── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 max-w-md">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    aria-label="Numeric answer input"
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-black disabled:opacity-40"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── DRAG-LABEL CHALLENGE ─── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                {/* Draggable items palette */}
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-indigo-900/80 border border-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Targets Box */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 text-center space-y-2 min-h-[100px] flex flex-col justify-center items-center"
                    >
                      <div className="text-[11px] font-bold text-slate-400 uppercase">{targetId.replace('box_', '').replace('pipe_', '')}</div>
                      <div className="text-xs font-bold text-emerald-300">
                        {droppedLabels[targetId] || <span className="text-slate-600 text-[10px]">Drop Label Here</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black"
                >
                  Verify All Placements
                </motion.button>
              </div>
            )}

            {/* ─── DRAG-SORT CHALLENGE ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
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
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-850 rounded-xl border border-slate-700 text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-750 flex items-center justify-center text-[10px] font-bold text-slate-400">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black mt-2"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* ─── CONSTRUCT CHALLENGE ─── */}
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
                      className="px-3 py-1.5 bg-slate-800 border border-slate-700 hover:border-emerald-500 rounded-lg text-xs font-bold text-white"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[90px] p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-indigo-950 border border-indigo-700 rounded-lg text-xs font-bold text-indigo-200 flex items-center gap-2"
                    >
                      <span>{i + 1}. {part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 font-black hover:text-rose-300"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click steps above in correct causal sequence</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black"
                >
                  Validate Chain
                </motion.button>
              </div>
            )}

            {/* ─── STEP-BY-STEP PROGRESSIVE EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-amber-950/60 to-slate-900 rounded-xl border border-amber-700/60 space-y-3"
              >
                <div className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span>📜</span> CISCE Step-by-Step Model Explanation
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
                      className="text-xs text-amber-200 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-800/80 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                    >
                      Next Step of Reason →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Score →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MASTERY SUMMARY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 rounded-3xl border border-emerald-600/40 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-3xl mx-auto">
              🏆
            </div>
            <h2 className="text-3xl font-black text-white">Simulation Mastery Achieved!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              You have thoroughly explored the 10 core nodes of Economic Applications, connecting Elasticity of Supply to the four Factors of Production and modern Indian financial credit systems.
            </p>

            <div className="flex justify-center gap-6 pt-2 font-mono">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Final Score</div>
                <div className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">BKT Mastery Level</div>
                <div className="text-2xl font-black text-cyan-400 capitalize">{masteryLevel}</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Errors Logged</div>
                <div className="text-2xl font-black text-amber-400">{errors}</div>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-800/40 text-sm font-bold text-emerald-300">
            {errors === 0
              ? '🌟 PERFECT SCORE! You have mastered ICSE Economic Applications with supreme conceptual clarity!'
              : errors <= 3
              ? '👏 High Distinction! You demonstrated solid mastery over elasticity computations and institutional factor analysis.'
              : errors <= 7
              ? '👍 Well done! Review the misconceptions below to sharpen your exam precision.'
              : '💪 Good persistence! Review the spaced review schedule and re-test in the sandbox to solidify your foundation.'}
          </div>

          {/* Misconception Gaps Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-black text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <span>⚠️</span> Personalised Misconception Diagnosis
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</div>
                      <div className="text-emerald-300 font-medium">✓ ICSE Correction: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-5 bg-indigo-950/50 rounded-2xl border border-indigo-800/50 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-indigo-300 uppercase">SM-2 Spaced Repetition Schedule</div>
              <div className="text-xs text-slate-300 mt-1">
                Your memory retention curve recommends reviewing this chapter in{' '}
                <span className="text-amber-300 font-bold">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </span>
                .
              </div>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Capstone Project Blueprint */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-black text-emerald-300 flex items-center gap-2">
              <span>🚀</span> Capstone Activity: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="CISCE Mastery Recorded!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}
export { C10_EconApplicationsElasticitySupplyMeaningSim };
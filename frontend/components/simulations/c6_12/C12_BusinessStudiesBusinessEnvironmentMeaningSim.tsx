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
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

// ============================================================================
// NODE IDS & CONSTANTS
// ============================================================================
const NODE_C12_BS_001 = 'c12_bs_001';
const NODE_C12_BS_002 = 'c12_bs_002';
const NODE_C12_BS_003 = 'c12_bs_003';
const NODE_C12_BS_004 = 'c12_bs_004';
const NODE_C12_BS_005 = 'c12_bs_005';
const NODE_C12_BS_006 = 'c12_bs_006';
const NODE_C12_BS_007 = 'c12_bs_007';
const NODE_C12_BS_008 = 'c12_bs_008';
const NODE_C12_BS_009 = 'c12_bs_009';
const NODE_C12_BS_010 = 'c12_bs_010';

const ALL_NODE_IDS = [
  NODE_C12_BS_001,
  NODE_C12_BS_002,
  NODE_C12_BS_003,
  NODE_C12_BS_004,
  NODE_C12_BS_005,
  NODE_C12_BS_006,
  NODE_C12_BS_007,
  NODE_C12_BS_008,
  NODE_C12_BS_009,
  NODE_C12_BS_010,
];

// ============================================================================
// NARRATIVE SCENARIO & HOOK
// ============================================================================
const SCENARIO = {
  title: 'AutoFuture India: The EV Revolution Strategic Crisis',
  intro:
    'You have been appointed Chief Strategy Consultant to "BharatMotors Ltd", an iconic Indian auto major operating in Pune and Manesar. Overnight, the government mandates zero-emission public transport (FAME policy), a major global tech giant announces a ₹10,000 crore smart-car venture in Bengaluru, and battery raw material costs surge by 35% following Middle East shipping route changes.',
  context:
    'To save BharatMotors from obsolescence, you must scan environmental forces, balance internal resources, perform rigorous SWOT alignment, structure managerial tiers from CEO to plant floor, and apply Taylor and Fayol principles to modernise assembly lines and corporate governance.',
};

const DISCOVERY_QUESTION = {
  question:
    'On 1 April 2020, India transitioned from BS-IV to BS-VI emission standards overnight, skipping BS-V entirely. Why is this event classified as a "Totality of Forces" and "Dynamic" business environment shock rather than a mere technical upgrade?',
  options: [
    'It only forced mechanical engineers to redesign fuel injectors without touching business finances.',
    'It simultaneously forced R&D re-engineering, disrupted supply chains, raised unit costs by 15%, and coincided with lockdown demand shocks.',
    'It was completely predictable and simple, requiring zero environmental scanning or strategy pivot.',
    'It only affected foreign automotive importers with zero domestic impact on Indian suppliers.',
  ],
  correctIndex: 1,
  hintAfter:
    'The business environment is not one isolated factor — it is a dynamic web of inter-related legal, technological, and economic forces acting together!',
};

// ============================================================================
// INTERACTIVE EXPLORATION STEPS
// ============================================================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Environment Totality Radar',
    instruction:
      'Interact with the 5 Environment Factor Dials to see how macro external shocks and internal levers alter BharatMotors Market Resilience index.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_BS_001,
  },
  {
    title: 'Lab 2: Continuous Environmental Scanning Lab',
    instruction:
      'Trigger "Continuous Scanning" vs "Annual Static Audit" across 4 quarters to observe early-warning lead times and competitive survival.',
    interactionType: 'toggle-radar',
    nodeId: NODE_C12_BS_002,
  },
  {
    title: 'Lab 3: Internal vs External Factor Sorter',
    instruction:
      'Classify corporate assets (culture, cash, GST tax, supplier insolvency) to understand controllable vs uncontrollable boundaries.',
    interactionType: 'drag-classify',
    nodeId: NODE_C12_BS_003,
  },
  {
    title: 'Lab 4: 2x2 Interactive SWOT & TOWS Matrix',
    instruction:
      'Map BharatMotors internal Strengths and external Opportunities to generate an aggressive SO Growth Play (Nexon EV model).',
    interactionType: 'drag-position',
    nodeId: NODE_C12_BS_005,
  },
  {
    title: 'Lab 5: Taylor vs Fayol Shop Floor & Boardroom Simulator',
    instruction:
      'Switch between Taylor scientific time-study/piece-rates and Fayol scalar chain/esprit de corps to optimise both assembly line and management.',
    interactionType: 'drag-match',
    nodeId: NODE_C12_BS_010,
  },
];

// ============================================================================
// PREDICTIONS & OBSERVATIONS
// ============================================================================
const PREDICTION_QUESTIONS = [
  {
    question:
      'PREDICTION: If BharatMotors increases battery R&D spending by ₹1,500 crore (Internal) while the RBI cuts the repo rate by 50 bps (External), what will happen to EV adoption and break-even timeline?',
    options: [
      'Break-even time doubles because both moves drain short-term capital indiscriminately.',
      'EV adoption accelerates sharply as lower loan EMIs boost consumer demand while internal R&D cuts production cost.',
      'Zero effect, because internal capabilities never interact with macroeconomic monetary policy.',
      'Consumer demand falls because interest rates and technological readiness are inversely correlated.',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Now adjust the "Internal R&D" slider to 80% and "Repo Rate Ease" to 75% in the simulation dashboard below to observe the combined multiplier.',
    nodeId: NODE_C12_BS_001,
  },
  {
    question:
      'PREDICTION: If the central government reduces FAME-II subsidies to zero while global lithium prices surge, how can BharatMotors prevent severe margin erosion?',
    options: [
      'By scaling internal R&D and applying Taylor scientific methods to eliminate production waste and lower cell packaging costs.',
      'By shutting down all electric car manufacturing permanently and returning strictly to obsolete diesel platforms.',
      'By doing nothing because external macroeconomic factors automatically correct themselves with zero internal effort.',
      'By violating statutory minimum wage laws and firing all supervisory staff across all assembly plants.',
    ],
    correctIndex: 0,
    verifyInstruction:
      'Set "Political FAME-II" to 0% and "Internal R&D" to 95% on the sliders to verify how internal strength compensates for external policy deficits.',
    nodeId: NODE_C12_BS_002,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question:
      'OBSERVATION: When you move the "Regulatory BS-VI Mandate" slider to Maximum, what happens to traditional petrol engine asset value?',
    observableOptions: [
      'It instantly becomes an obsolete legacy liability requiring immediate capital write-down or engine re-engineering.',
      'Its profit margin increases by 50% without modifications.',
      'It stays completely unaffected because regulatory changes do not alter production technology.',
      'Suppliers automatically subsidise the entire petrol inventory.',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BS_004,
  },
];

// ============================================================================
// 21 CHALLENGES (7 Foundation, 7 Standard, 7 Advanced)
// ============================================================================
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

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Local Business Environment Audit',
  description: 'Visit a nearby retail store or small business in your locality. Identify at least 5 external environmental factors (political, economic, social, technological, legal) that influence its operations. Interview the owner about how they adapt to these factors.',
  deliverable: 'Write a one-page report classifying each factor and suggesting one improvement strategy.',
};

const CHALLENGES: Challenge[] = [
  // --------------------------------------------------------------------------
  // FOUNDATION (7 Challenges)
  // --------------------------------------------------------------------------
  {
    id: 'ch_01_bs001_recall',
    nodeId: NODE_C12_BS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which of the following correctly defines the scope of "Business Environment" according to the ISC Class 12 syllabus?',
    options: [
      'Only the external factors like government taxes and competitor price wars.',
      'The sum total of all internal factors (culture, resources, structure) AND external factors (political, economic, social, technological, legal) surrounding a firm.',
      'Only the physical natural climate and rainfall conditions surrounding a factory site.',
      'The internal board of directors meetings exclusively.',
    ],
    correctIndex: 1,
    explanation:
      'The business environment is the sum total of both internal forces (culture, resources, structure) and external forces (economic, legal, socio-cultural, technological) affecting business survival.',
    hints: [
      'Remember: Is environment restricted to only what lies outside the firm gate?',
      'Kast and Rosenzweig open-systems model proves that internal state matters just as much as outside signals.',
      'Select the option that includes BOTH internal assets and external macro forces.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_bs007_drag',
    nodeId: NODE_C12_BS_007,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Drag the managerial roles to their correct hierarchical tier in the Indian Corporate Pyramid (Companies Act 2013 structure).',
    dragItems: [
      { label: 'CEO / Key Managerial Personnel (Sec 203)', targetId: 'tier_top' },
      { label: 'Plant Head / Regional General Manager', targetId: 'tier_middle' },
      { label: 'Shop-Floor Shift Foreman / Line Lead', targetId: 'tier_lower' },
    ],
    correctMapping: {
      tier_top: 'CEO / Key Managerial Personnel (Sec 203)',
      tier_middle: 'Plant Head / Regional General Manager',
      tier_lower: 'Shop-Floor Shift Foreman / Line Lead',
    },
    explanation:
      'Top management includes KMP (CEO, MD, CFO) setting multi-year vision. Middle management (Plant GM, Dept Heads) bridges tactical plans. Lower/supervisory management (Foremen) oversees daily shift operations.',
    hints: [
      'The apex sets strategic direction for the whole enterprise.',
      'Departmental heads and plant managers translate corporate goals into divisional targets.',
      'Shift foremen directly supervise machine operators on the shop floor.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_03_bs006_understand',
    nodeId: NODE_C12_BS_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Why is management described as a "continuous cyclical process" rather than a one-time event?',
    options: [
      'Because once planning is written in January, no other manager needs to do any work.',
      'Because the controlling function measures deviations and loops directly back to planning, restarting the management cycle perpetually.',
      'Because the Companies Act mandates daily shareholder voting on every operational task.',
      'Because all managers must rotate departments every 24 hours.',
    ],
    correctIndex: 1,
    explanation:
      'Management is continuous: planning leads to organising, staffing, directing, and controlling. Controlling evaluates outcomes and feeds corrective insights back into fresh planning.',
    hints: [
      'What happens when actual production is compared with standard production in controlling?',
      'Deviations require corrective action, which initiates a revised plan.',
      'The feedback loop between controlling and planning keeps the cycle perpetual.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_04_bs004_match',
    nodeId: NODE_C12_BS_004,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Identify the correct pair distinguishing a "Specific Force" from a "General Force" in the Indian business environment:',
    options: [
      'Specific: Direct competitor Jio cutting 4G tariff; General: Pan-India rollout of Goods and Services Tax (GST).',
      'Specific: RBI changing the national repo rate; General: A local supplier delaying brake pads to Maruti.',
      'Specific: National inflation rising to 6%; General: Tata Motors launching Nexon EV.',
      'Specific: India’s population crossing 1.4 billion; General: One customer returning a defective phone.',
    ],
    correctIndex: 0,
    explanation:
      'Specific forces (customers, direct competitors, suppliers) directly hit an individual firm/industry. General forces (GST, monetary policy, legal acts) affect the entire economy across all sectors.',
    hints: [
      'Specific forces act immediately and directly at the firm level.',
      'General forces create economy-wide ripple effects for all businesses.',
      'A price war by Jio directly hits Airtel (specific), while GST reshapes taxes for every Indian company (general).',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_bs008_numeric',
    nodeId: NODE_C12_BS_008,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'In F.W. Taylor’s benchmark Bethlehem Steel pig-iron handling study (1898), scientific time-motion methods raised worker daily loading capacity from 12.5 tons to how many tons per day?',
    correctAnswer: 47,
    tolerance: 1,
    unit: 'tons/day',
    explanation:
      'Taylor selected worker Schmidt, eliminated wasted motions, standardised rest intervals, and elevated daily output from 12.5 tons to 47.0 tons per day (a nearly 4x increase) with a 60% wage raise.',
    hints: [
      'Think about Taylor’s classic Bethlehem Steel experiment recorded in "The Principles of Scientific Management" (1911).',
      'The output was nearly quadrupled from 12.5 tons.',
      'The exact historical figure is between 46 and 48 tons per day.',
    ],
  },
  {
    id: 'ch_06_bs006_sort',
    nodeId: NODE_C12_BS_006,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Arrange the 5 core sequential functions of the Management Process in their correct standard operational order.',
    sortItems: ['Planning', 'Organising', 'Staffing', 'Directing', 'Controlling'],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      'The classical management process flows sequentially: Planning (setting goals) -> Organising (allocating structure) -> Staffing (recruiting talent) -> Directing (leading/motivating) -> Controlling (checking performance).',
    hints: [
      'Start with deciding in advance what to do (Planning).',
      'Next, structure departments and resources (Organising).',
      'Fill positions (Staffing), guide action (Directing), and verify standard adherence (Controlling).',
    ],
  },
  {
    id: 'ch_07_bs001_apply',
    nodeId: NODE_C12_BS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question:
      'Haldiram’s notices a nationwide consumer trend toward low-calorie, millet-based snacks and simultaneously faces a ban on single-use plastic packaging. Which two environmental dimensions are interacting here?',
    options: [
      'Social Environment (health consciousness trends) and Legal Environment (plastic ban regulation).',
      'Political Environment and Internal Financial Culture exclusively.',
      'Technological Environment and Stock Exchange Listing Guidelines.',
      'International Maritime Law and Taylor Piece-Rate differential.',
    ],
    correctIndex: 0,
    explanation:
      'Consumer dietary preferences represent the Social Environment (lifestyle and cultural values), while statutory bans on plastic represent the Legal Environment.',
    hints: [
      'Dietary preference and lifestyle belong to which PESTLE dimension?',
      'Government statutory bans enacted by law belong to which dimension?',
      'Identify the pair combining lifestyle trends with regulatory mandates.',
    ],
  },

  // --------------------------------------------------------------------------
  // STANDARD (7 Challenges)
  // --------------------------------------------------------------------------
  {
    id: 'ch_08_bs002_apply',
    nodeId: NODE_C12_BS_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Maruti Suzuki started re-engineering its petrol engines in 2018 for the 1 April 2020 BS-VI statutory deadline, whereas a rival ignored the signal and had to discount BS-IV cars at huge losses. Which importance of Environmental Scanning did Maruti capitalise on?',
    options: [
      'Providing an Early-Warning Signal to formulate timely adaptive strategy.',
      'Eliminating the need for all middle-management supervisors.',
      'Guaranteeing 100% tax exemption under Section 135 CSR.',
      'Converting uncontrollable external laws into internal company rules.',
    ],
    correctIndex: 0,
    explanation:
      'Continuous scanning gave Maruti early lead-time to adapt R&D and supply chains, turning a severe regulatory disruption into an early-mover competitive advantage.',
    hints: [
      'Why does monitoring regulatory roadmaps 2 years ahead prevent last-minute crisis?',
      'Lead-time allows capital allocation and smooth re-engineering.',
      'This illustrates the "Early-Warning Signal" and "Coping with Change" importance.',
    ],
  },
  {
    id: 'ch_09_bs004_analysis',
    nodeId: NODE_C12_BS_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'The National Green Tribunal (NGT) banned 10-year-old diesel commercial vehicles in Delhi NCR to combat extreme PM2.5 air pollution. What is the fundamental source factor versus the regulatory instrument?',
    options: [
      'Source Factor: Environmental (severe air pollution); Regulatory Instrument: Legal (NGT Tribunal Order).',
      'Source Factor: Legal; Regulatory Instrument: Social.',
      'Source Factor: Technological; Regulatory Instrument: Economic.',
      'Source Factor: Political; Regulatory Instrument: Demographic.',
    ],
    correctIndex: 0,
    explanation:
      'The source driver is an Environmental ecological condition (air quality crisis). The court order is merely the Legal channel enforcing environmental remediation.',
    hints: [
      'Always ask: What triggered the action in the physical real world?',
      'The ecological pollution crisis was the origin.',
      'The judicial directive was the legal instrument.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_10_bs005_apply',
    nodeId: NODE_C12_BS_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Tata Motors had brand trust & commercial vehicle scale (Internal Strength), low passenger-car share (Internal Weakness), FAME subsidies & EV demand growth (External Opportunity), and foreign EV entrant threats (External Threat). Which TOWS strategy generated the Nexon EV launch in 2020?',
    options: [
      'SO Strategy (Maxi-Maxi): Deploying strong brand equity to capture the booming government-subsidised EV market ahead of rivals.',
      'WT Strategy (Mini-Mini): Shutting down all automobile manufacturing to avoid EV losses.',
      'WO Strategy: Ignoring electric vehicles and waiting for petrol price cuts.',
      'ST Strategy: Suing foreign automakers under the Competition Act 2002.',
    ],
    correctIndex: 0,
    explanation:
      'An SO (Strengths-Opportunities) strategy deploys internal capabilities (Tata brand & manufacturing muscle) to seize external opportunities (FAME EV push), capturing 74% market share.',
    hints: [
      'Combine an internal Strength with an external Opportunity.',
      'Brand trust + EV policy push = rapid market leadership.',
      'This is the definition of an aggressive Maxi-Maxi (SO) growth strategy.',
    ],
  },
  {
    id: 'ch_11_bs009_analysis',
    nodeId: NODE_C12_BS_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'A software engineer at Wipro receives conflicting deadlines from both a Project Manager and a Client Account Head. Meanwhile, Hindustan Unilever places all personal-care marketing under one Head with a single unified plan. Identify the principles involved:',
    options: [
      'Wipro violates Unity of Command (individual reporting); HUL adheres to Unity of Direction (departmental objective & plan).',
      'Wipro violates Unity of Direction; HUL violates Unity of Command.',
      'Both firms are illustrating Taylor’s Functional Foremanship.',
      'Both firms are violating the Scalar Chain principle.',
    ],
    correctIndex: 0,
    explanation:
      'Unity of Command relates to the individual employee (one superior only). Unity of Direction relates to the organisation/department (one head, one unified plan for activities with the same objective).',
    hints: [
      'Command = One boss per person.',
      'Direction = One plan per department.',
      'Dual reporting creates confusion in command; unified planning creates alignment in direction.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_12_bs009_drag',
    nodeId: NODE_C12_BS_009,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Drag each Fayol Principle to match its corresponding real-world Indian operational practice.',
    dragItems: [
      { label: 'Scalar Chain & Gang Plank', targetId: 'case_sbi' },
      { label: 'Order (Material & Social)', targetId: 'case_maruti' },
      { label: 'Subordination of Interest (Sec 166)', targetId: 'case_tata' },
    ],
    correctMapping: {
      case_sbi: 'Scalar Chain & Gang Plank',
      case_maruti: 'Order (Material & Social)',
      case_tata: 'Subordination of Interest (Sec 166)',
    },
    explanation:
      'SBI uses formal hierarchical reporting from Branch Manager to Chairman with emergency lateral shortcuts. Maruti implements shadow boards for tools and precise role matching (Order). Tata enforces director fiduciary integrity where company welfare precedes private profit (Sec 166).',
    hints: [
      'SBI has 23,000 branches structured in a strict vertical reporting chain.',
      'Maruti Manesar labels every tool location and operator station ("place for everything").',
      'Tata Code of Conduct demands conflict-of-interest recusal under Section 166 Companies Act.',
    ],
  },
  {
    id: 'ch_13_bs008_calc',
    nodeId: NODE_C12_BS_008,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A manufacturing unit sets a standard output of 50 units/day. High piece-rate is ₹20/unit (for output >= 50). Low piece-rate is ₹16/unit (for output < 50). Worker Raman produces 55 units, while Worker Shyam produces 45 units. Calculate Raman’s daily wage surplus over Shyam in Rupees.',
    correctAnswer: 380,
    tolerance: 0,
    unit: 'Rupees',
    explanation:
      'Raman gets 55 units × ₹20 = ₹1,100. Shyam gets 45 units × ₹16 = ₹720. Wage Surplus = ₹1,100 - ₹720 = ₹380.',
    hints: [
      'Calculate Raman’s total earnings at the higher rate: 55 × ₹20.',
      'Calculate Shyam’s total earnings at the lower rate: 45 × ₹16.',
      'Subtract Shyam’s earnings (₹720) from Raman’s earnings (₹1,100).',
    ],
  },
  {
    id: 'ch_14_bs003_eval',
    nodeId: NODE_C12_BS_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question:
      'Evaluate the impact of the 2016 Indian Demonetisation policy on Paytm versus a traditional brick-and-mortar unorganised jewellery merchant. What environmental phenomenon explains their contrasting outcomes?',
    options: [
      'The "Relativity" of the business environment: the same macro economic event proved to be a massive opportunity for digital fintech while posing a severe threat to cash-heavy unorganised retail.',
      'Demonetisation was an internal controllable decision taken by Paytm’s board of directors.',
      'Both businesses experienced exactly the same negative outcome due to environmental homogeneity.',
      'Demonetisation was a specific force targeting only jewelers in Mumbai.',
    ],
    correctIndex: 0,
    explanation:
      'Relativity is a key characteristic of the business environment: environmental changes affect different enterprises, industries, and regions differently.',
    hints: [
      'Why does one business boom while another struggles during the exact same macro policy shift?',
      'Think about the core characteristic: Business Environment is Relative.',
      'One firm’s threat can be another firm’s breakthrough opportunity.',
    ],
  },

  // --------------------------------------------------------------------------
  // ADVANCED (7 Challenges)
  // --------------------------------------------------------------------------
  {
    id: 'ch_15_bs005_eval',
    nodeId: NODE_C12_BS_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A legacy telecom provider in India faces a 5G spectrum auction costing ₹18,000 crore (External Threat/Resource Drain) and aggressive zero-tariff pricing from an entrant (External Threat), while possessing deep optical fibre infrastructure across 28 states (Internal Strength). Which TOWS strategy should the Board execute?',
    options: [
      'ST Strategy (Maxi-Mini): Monetise and lease its vast dark-fibre backhaul network to competitors and enterprise clients to generate immediate cash flow and withstand the tariff war.',
      'WT Strategy (Mini-Mini): Liquidate all optical fibre and terminate operations immediately.',
      'SO Strategy: Launch free 5G handsets to 100 million consumers without spectrum acquisition.',
      'WO Strategy: Rely exclusively on 2G voice SMS revenue and ignore high-speed data demands.',
    ],
    correctIndex: 0,
    explanation:
      'An ST (Strengths-Threats) strategy leverages an internal capability (extensive pan-India fibre infrastructure) to mitigate and defend against external threats (price wars and auction liquidity crunches).',
    hints: [
      'How can a massive internal asset (fibre) neutralize an external competitive threat (price war)?',
      'This uses a Strength to counteract a Threat (ST Maxi-Mini).',
      'B2B leasing of dark fibre generates high-margin defensive cash flows.',
    ],
  },
  {
    id: 'ch_16_bs008_analysis',
    nodeId: NODE_C12_BS_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Under Taylor’s Functional Foremanship, the planning department is strictly separated from the shop-floor execution team. Which pair correctly places the foreman under the PLANNING incharge versus the EXECUTION incharge?',
    options: [
      'Planning: Instruction Card Clerk & Route Clerk; Execution: Gang Boss & Speed Boss.',
      'Planning: Gang Boss & Inspector; Execution: Time and Cost Clerk & Disciplinarian.',
      'Planning: Repair Boss & Speed Boss; Execution: Route Clerk & Instruction Card Clerk.',
      'Planning: Disciplinarian & Gang Boss; Execution: Time and Cost Clerk & Inspector.',
    ],
    correctIndex: 0,
    explanation:
      'Planning Incharge oversees: (1) Route Clerk, (2) Instruction Card Clerk, (3) Time & Cost Clerk, (4) Disciplinarian. Execution Incharge oversees: (1) Gang Boss, (2) Speed Boss, (3) Repair Boss, (4) Inspector.',
    hints: [
      'Planning foremen deal with instructions, sequences, costs, and discipline.',
      'Execution foremen directly oversee machines, speeds, tools, and output quality.',
      'Gang Boss prepares machines; Speed Boss monitors rate of operation.',
    ],
  },
  {
    id: 'ch_17_bs009_eval',
    nodeId: NODE_C12_BS_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A pan-India retail giant (like DMart / Reliance Retail) centralises supplier procurement and billing software at Mumbai HQ while decentralising regional store inventory replenishment and shelf merchandising to local store managers. How does this practice align with Fayol’s principle of Centralisation and Decentralisation?',
    options: [
      'It achieves an optimal balance between retaining strategic control at the apex and granting operational autonomy at the grassroots level.',
      'It completely violates Fayol’s principle because an enterprise must be 100% centralised with zero autonomy.',
      'It proves that Fayol’s principles are strictly rigid dogmas that cannot be adapted to large retailers.',
      'It represents Taylor’s differential piece-rate rather than Fayol’s administrative principles.',
    ],
    correctIndex: 0,
    explanation:
      'Fayol emphasized that centralisation and decentralisation must be balanced according to enterprise scale: key strategic and pricing policies remain centralised, while operational execution is decentralised.',
    hints: [
      'Did Fayol advocate for total extreme centralisation or a balanced proportion?',
      'Large retail operations require centralised scale in buying and local agility in stocking.',
      'Principles of management are flexible and contingent upon situational needs.',
    ],
  },
  {
    id: 'ch_18_bs010_analysis',
    nodeId: NODE_C12_BS_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Compare Taylor’s Scientific Management with Fayol’s General Administrative Theory across perspective, primary focus, and basis of formation:',
    options: [
      'Taylor: Bottom-up shop floor, eliminating worker inefficiency via experimentation; Fayol: Top-down executive suite, overall administrative architecture via personal experience.',
      'Taylor: Top-down boardroom governance; Fayol: Bottom-up assembly-line time-motion studies.',
      'Taylor: Focused solely on human relations; Fayol: Focused solely on differential wage equations.',
      'Taylor: Principles are completely rigid laws; Fayol: Principles apply only to government public sector units.',
    ],
    correctIndex: 0,
    explanation:
      'Taylor operated from the shop floor upwards (micro task efficiency, time studies), while Fayol operated from the managing director down (macro administrative functions, 14 universal principles).',
    hints: [
      'Where did Taylor spend his career? (Midvale & Bethlehem Steel shop floors).',
      'Where did Fayol spend his career? (Managing Director of a French mining conglomerate).',
      'Taylor is bottom-up operational; Fayol is top-down administrative.',
    ],
  },
  {
    id: 'ch_19_bs002_apply',
    nodeId: NODE_C12_BS_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'The explosive rise of UPI QR code transactions at roadside tea stalls and Kirana stores across Tier-2 and Tier-3 Indian cities represents an inter-connected confluence of which environmental dimensions?',
    options: [
      'Technological (NPCI UPI architecture & smartphone penetration), Social (trust in cashless micropayments), and Economic (reduced cash handling costs).',
      'Legal and Natural Ecological forces exclusively.',
      'Political trade embargoes and international maritime shipping protocols.',
      'Taylor’s Functional Foremanship and shop floor gang boss supervision.',
    ],
    correctIndex: 0,
    explanation:
      'UPI proliferation illustrates the Inter-relatedness of business environment dimensions: telecom connectivity (Tech) + consumer adoption trust (Social) + monetary efficiency (Economic).',
    hints: [
      'Smartphone technology + cultural habit change + monetary convenience.',
      'Notice how multiple macro forces act together simultaneously.',
      'This illustrates the dynamic and inter-related nature of the Indian environment.',
    ],
  },
  {
    id: 'ch_20_bs007_creativity',
    nodeId: NODE_C12_BS_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'During a severe supply chain crisis, BharatMotors assembly lines risk shutting down because the battery supplier in Chennai needs an urgent design waiver from the Pune engineering team. The formal hierarchy requires 7 levels of upward and downward approvals taking 14 days. How should modern leadership resolve this without causing permanent organizational anarchy?',
    options: [
      'Activate Fayol’s "Gang Plank" protocol: enable direct lateral communication between the Chennai Plant Head and Pune Chief Engineer while keeping immediate superiors informed post-facto.',
      'Abolish all managerial tiers permanently and let workers vote on engineering tolerances via social media.',
      'Shut down the factory for 14 days to preserve strict hierarchy at all costs.',
      'Transfer all engineering authority to the shop floor speed boss under Taylor’s piece-rate.',
    ],
    correctIndex: 0,
    explanation:
      'Fayol designed the "Gang Plank" (bridge) specifically to avoid administrative delay in emergencies, allowing peers at the same hierarchical level to communicate laterally while keeping superiors appraised.',
    hints: [
      'Which Fayol concept provides an emergency shortcut across scalar chains?',
      'It permits lateral cross-departmental coordination in critical situations.',
      'The key condition: immediate superiors must be kept informed.',
    ],
  },
  {
    id: 'ch_21_bs008_calc_adv',
    nodeId: NODE_C12_BS_008,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'A work-study analyst conducts a Taylor time-study on an engine valve assembly task. Observed standard time per unit is 6 minutes. The worker shift lasts 8 hours (480 minutes) with 30 minutes allocated for fatigue rest breaks. Calculate the standard target output in units for one full shift.',
    correctAnswer: 75,
    tolerance: 0,
    unit: 'units/shift',
    explanation:
      'Effective working time = 480 total minutes - 30 minutes rest = 450 minutes. Standard time per unit = 6 minutes. Target standard output = 450 ÷ 6 = 75 units per shift.',
    hints: [
      'Subtract the rest interval from total shift time: 480 - 30 = 450 effective minutes.',
      'Divide effective working minutes by standard cycle time per unit (6 minutes).',
      '450 / 6 = ?',
    ],
  },
];

// ============================================================================
// PROPS INTERFACE & DEFAULT PROPS
// ============================================================================
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
  nodeId: NODE_C12_BS_001,
  title: 'Business Environment & Classical Management Principles',
  definition:
    'The business environment is the sum total of all internal and external forces that surround and influence a firm. Environmental scanning enables early warning, strategy formulation, and resource allocation. Management is the goal-oriented process of planning, organising, staffing, directing, and controlling resources. Taylor’s scientific principles focus on shop-floor operational efficiency and time-motion studies, while Fayol’s 14 principles provide the top-down administrative architecture for the entire enterprise.',
  eli5:
    'Think of running a school chai stall or an electric car company. The weather, milk prices, and government laws are the uncontrollable external environment. Your recipe, savings, and stove are internal resources. Management is planning and checking your daily sales. Taylor shows you how to chop ginger and boil water with zero wasted seconds, while Fayol shows you how to divide duties fairly so nobody fights!',
  misconceptions: [
    {
      misconception: 'The business environment includes only external factors outside the firm.',
      correction:
        'The ISC syllabus definition explicitly includes BOTH internal forces (culture, structure, resources) and external forces (economic, legal, technological).',
    },
    {
      misconception: '"Dynamic" and "Complex" mean the exact same thing.',
      correction:
        '"Dynamic" refers to change over time (e.g., telecom tariffs shifting after Jio). "Complex" refers to numerous inter-related variables interacting simultaneously.',
    },
    {
      misconception: 'Department Heads and First-Line Managers belong to Top Management.',
      correction:
        'Department Heads are Middle Management (heading a slice, not the whole company). First-Line Managers are Lower/Supervisory Management closest to operative workers.',
    },
    {
      misconception: 'Harmony not Discord and Cooperation not Individualism are the same principle.',
      correction:
        'Harmony concerns the relationship between Management and Workers (mental revolution). Cooperation concerns the relationship among workers on the assembly line (standardised uniform methods).',
    },
    {
      misconception: 'Unity of Command and Unity of Direction both mean "having one boss".',
      correction:
        'Unity of Command is individual (one employee -> one superior). Unity of Direction is departmental (one unified plan -> one head for activities with the same objective).',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the sum total of internal and external forces affecting a business called?',
      options: ['Business Environment', 'Internal Audit', 'Trade Union', 'Stock Exchange'],
      correctIndex: 0,
    },
  ],
  masteryCriteria:
    'Demonstrate 80%+ mastery across business environment dimensions, SWOT formulation, managerial level functions, and modern application of Taylor and Fayol classical management principles.',
};

// ============================================================================
// TOPIC-SPECIFIC SVG DIAGRAM 1: BUSINESS ENVIRONMENT TOTALITY CONCENTRIC RADAR
// ============================================================================
function SvgEnvironmentTotalityDiagram() {
  return (
    <svg viewBox="0 0 600 360" className="w-full h-auto max-h-72 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
      <defs>
        <radialGradient id="envCoreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
        </radialGradient>
        <radialGradient id="envSpecificGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
        </radialGradient>
        <radialGradient id="envGeneralGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
        </radialGradient>
      </defs>

      {/* Outer Circle: General / Macro Environment (PESTLE) */}
      <circle cx="300" cy="180" r="160" fill="url(#envGeneralGrad)" stroke="#6366f1" strokeWidth="2" strokeDasharray="6 4" />
      <text x="300" y="36" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="1">
        EXTERNAL GENERAL ENVIRONMENT (PESTLE: Political, Economic, Social, Tech, Legal, Ecology)
      </text>

      {/* Middle Circle: Specific / Micro Environment */}
      <circle cx="300" cy="180" r="105" fill="url(#envSpecificGrad)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 3" />
      <text x="300" y="92" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">
        SPECIFIC / OPERATING FORCES (Customers • Competitors • Suppliers • Creditors)
      </text>

      {/* Inner Core: Internal Controllable Forces */}
      <circle cx="300" cy="180" r="55" fill="url(#envCoreGrad)" stroke="#ec4899" strokeWidth="2.5" />
      <text x="300" y="174" fill="#fbcfe8" fontSize="11" fontWeight="bold" textAnchor="middle">
        INTERNAL CORE
      </text>
      <text x="300" y="190" fill="#f472b6" fontSize="9" textAnchor="middle">
        Culture • R&D • Capital
      </text>

      {/* Orbiting Labels with Indicators */}
      <g transform="translate(160, 60)">
        <rect width="90" height="22" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
        <text x="45" y="15" fill="#c7d2fe" fontSize="9" textAnchor="middle" fontWeight="bold">⚖️ Legal: BS-VI</text>
      </g>
      <g transform="translate(350, 60)">
        <rect width="105" height="22" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
        <text x="52" y="15" fill="#c7d2fe" fontSize="9" textAnchor="middle" fontWeight="bold">🏛️ Policy: FAME Subsidy</text>
      </g>
      <g transform="translate(460, 170)">
        <rect width="95" height="22" rx="6" fill="#0f2942" stroke="#3b82f6" strokeWidth="1" />
        <text x="47" y="15" fill="#bae6fd" fontSize="9" textAnchor="middle" fontWeight="bold">👥 EV Buyers</text>
      </g>
      <g transform="translate(45, 170)">
        <rect width="100" height="22" rx="6" fill="#0f2942" stroke="#3b82f6" strokeWidth="1" />
        <text x="50" y="15" fill="#bae6fd" fontSize="9" textAnchor="middle" fontWeight="bold">🏭 Battery Suppliers</text>
      </g>
      <g transform="translate(230, 315)">
        <rect width="140" height="22" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
        <text x="70" y="15" fill="#c7d2fe" fontSize="9" textAnchor="middle" fontWeight="bold">📉 Economic: RBI Repo Rate</text>
      </g>
    </svg>
  );
}

// ============================================================================
// TOPIC-SPECIFIC SVG DIAGRAM 2: MANAGEMENT HIERARCHY PYRAMID
// ============================================================================
function SvgManagementPyramidDiagram() {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto max-h-72 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
      <defs>
        <linearGradient id="pyrTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#be123c" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="pyrMidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4338ca" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="pyrLowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Top Level Tier */}
      <polygon points="300,30 230,110 370,110" fill="url(#pyrTopGrad)" stroke="#fda4af" strokeWidth="1.5" />
      <text x="300" y="75" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">TOP MANAGEMENT</text>
      <text x="300" y="92" fill="#ffe4e6" fontSize="9" textAnchor="middle">CEO • MD • Board (Sec 203 KMP)</text>

      {/* Middle Level Tier */}
      <polygon points="230,113 370,113 440,200 160,200" fill="url(#pyrMidGrad)" stroke="#a5b4fc" strokeWidth="1.5" />
      <text x="300" y="150" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">MIDDLE MANAGEMENT</text>
      <text x="300" y="168" fill="#e0e7ff" fontSize="9" textAnchor="middle">Plant Heads • Divisional GMs • Marketing Chiefs</text>

      {/* Lower / Supervisory Level Tier */}
      <polygon points="160,203 440,203 510,290 90,290" fill="url(#pyrLowGrad)" stroke="#6ee7b7" strokeWidth="1.5" />
      <text x="300" y="240" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">LOWER / SUPERVISORY MANAGEMENT</text>
      <text x="300" y="258" fill="#d1fae5" fontSize="9" textAnchor="middle">Foremen • Shift Line Leads • Inspectors</text>

      {/* Side Arrows & Labels */}
      <line x1="60" y1="280" x2="60" y2="40" stroke="#f59e0b" strokeWidth="2.5" />
      <text x="50" y="160" fill="#fbbf24" fontSize="9" fontWeight="bold" transform="rotate(-90, 50, 160)" textAnchor="middle">
        DECISION HORIZON (Strategic 5-10 Yrs → Shift 8 Hrs)
      </text>

      <line x1="540" y1="40" x2="540" y2="280" stroke="#38bdf8" strokeWidth="2.5" />
      <text x="555" y="160" fill="#38bdf8" fontSize="9" fontWeight="bold" transform="rotate(90, 555, 160)" textAnchor="middle">
        SPAN OF SUPERVISION & HEADCOUNT (1 CEO → 5000+ Operatives)
      </text>
    </svg>
  );
}

// ============================================================================
// TOPIC-SPECIFIC SVG DIAGRAM 3: FAYOL'S SCALAR CHAIN & GANG PLANK BRIDGE
// ============================================================================
function SvgScalarChainDiagram({ gangPlankActive }: { gangPlankActive: boolean }) {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto max-h-72 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
      <defs>
        <marker id="gangArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#10b981" />
        </marker>
      </defs>

      {/* Title */}
      <text x="300" y="24" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
        FAYOL’S SCALAR CHAIN WITH EMERGENCY "GANG PLANK" BYPASS
      </text>

      {/* Apex: Authority A */}
      <circle cx="300" cy="55" r="16" fill="#4f46e5" stroke="#818cf8" strokeWidth="2" />
      <text x="300" y="60" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">A</text>
      <text x="300" y="38" fill="#a5b4fc" fontSize="9" textAnchor="middle">Managing Director</text>

      {/* Left Branch: Line of Authority 1 (B -> C -> D) */}
      <line x1="290" y1="68" x2="210" y2="120" stroke="#64748b" strokeWidth="2" />
      <circle cx="210" cy="120" r="14" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
      <text x="210" y="124" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">B</text>
      <text x="160" y="124" fill="#94a3b8" fontSize="8" textAnchor="end">Dept Head 1</text>

      <line x1="210" y1="134" x2="160" y2="190" stroke="#64748b" strokeWidth="2" />
      <circle cx="160" cy="190" r="14" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
      <text x="160" y="194" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">C</text>
      <text x="110" y="194" fill="#94a3b8" fontSize="8" textAnchor="end">Superintendent</text>

      <line x1="160" y1="204" x2="120" y2="260" stroke="#64748b" strokeWidth="2" />
      <circle cx="120" cy="260" r="16" fill="#312e81" stroke="#818cf8" strokeWidth="2.5" />
      <text x="120" y="265" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">D</text>
      <text x="120" y="292" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">Plant Engineer (D)</text>

      {/* Right Branch: Line of Authority 2 (E -> F -> G) */}
      <line x1="310" y1="68" x2="390" y2="120" stroke="#64748b" strokeWidth="2" />
      <circle cx="390" cy="120" r="14" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
      <text x="390" y="124" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">E</text>
      <text x="440" y="124" fill="#94a3b8" fontSize="8" textAnchor="start">Dept Head 2</text>

      <line x1="390" y1="134" x2="440" y2="190" stroke="#64748b" strokeWidth="2" />
      <circle cx="440" cy="190" r="14" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
      <text x="440" y="194" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">F</text>
      <text x="490" y="194" fill="#94a3b8" fontSize="8" textAnchor="start">Superintendent</text>

      <line x1="440" y1="204" x2="480" y2="260" stroke="#64748b" strokeWidth="2" />
      <circle cx="480" cy="260" r="16" fill="#312e81" stroke="#818cf8" strokeWidth="2.5" />
      <text x="480" y="265" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">G</text>
      <text x="480" y="292" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">Safety Officer (G)</text>

      {/* Emergency Gang Plank Bridge between D and G */}
      {gangPlankActive ? (
        <g>
          <line
            x1="138"
            y1="260"
            x2="460"
            y2="260"
            stroke="#10b981"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            markerEnd="url(#gangArrow)"
          />
          <rect x="230" y="244" width="140" height="24" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
          <text x="300" y="260" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">
            ⚡ GANG PLANK ACTIVE
          </text>
        </g>
      ) : (
        <g>
          <line x1="138" y1="260" x2="462" y2="260" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="300" y="255" fill="#64748b" fontSize="8" textAnchor="middle">
            (Normal Route: D → C → B → A → E → F → G)
          </text>
        </g>
      )}
    </svg>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
function C12_BusinessStudiesBusinessEnvironmentMeaningSim(
  props: Props = DEFAULT_PROPS
) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C12_BS_001,
    title = DEFAULT_PROPS.title || 'Business Environment & Management',
    misconceptions = DEFAULT_PROPS.misconceptions,
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['business-studies'] || {
    name: 'Business Studies',
    emoji: '📈',
    color: 'indigo',
  };

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-Then-Check & Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Interactive Lab 1: Environment Totality Sliders
  const [policyIncentive, setPolicyIncentive] = useState(50);
  const [repoRateDiscount, setRepoRateDiscount] = useState(40);
  const [consumerEVPreference, setConsumerEVPreference] = useState(60);
  const [techBatteryCost, setTechBatteryCost] = useState(55);
  const [internalRDStrength, setInternalRDStrength] = useState(70);

  // Interactive Lab 2: Scanning Mode
  const [scanMode, setScanMode] = useState<'continuous' | 'annual'>('continuous');
  const [scanQuarter, setScanQuarter] = useState(1);

  // Interactive Lab 3: Internal/External Factor Drag Classifier
  const [classifiedFactors, setClassifiedFactors] = useState<Record<string, 'internal' | 'external'>>({});

  // Interactive Lab 4: SWOT & TOWS Strategy Builder
  const [selectedSWOTQuadrant, setSelectedSWOTQuadrant] = useState<'S' | 'W' | 'O' | 'T'>('S');
  const [activeTOWSStrategy, setActiveTOWSStrategy] = useState<'SO' | 'WO' | 'ST' | 'WT'>('SO');

  // Interactive Lab 5: Taylor vs Fayol Interactive Balancer
  const [theoristLens, setTheoristLens] = useState<'taylor' | 'fayol'>('taylor');
  const [taylorPieceRateOutput, setTaylorPieceRateOutput] = useState(52);
  const [statutoryFloorActive, setStatutoryFloorActive] = useState(true);
  const [gangPlankActive, setGangPlankActive] = useState(false);

  // Reflection responses state
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');

  // Challenge Phase Interaction States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');

  // Feedback, Hints & Animation Controls
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // --------------------------------------------------------------------------
  // CALCULATIONS & DERIVED VALUES
  // --------------------------------------------------------------------------
  const marketResilienceIndex = useMemo(() => {
    const raw =
      policyIncentive * 0.25 +
      repoRateDiscount * 0.2 +
      consumerEVPreference * 0.2 +
      techBatteryCost * 0.15 +
      internalRDStrength * 0.2;
    return Math.round(raw);
  }, [policyIncentive, repoRateDiscount, consumerEVPreference, techBatteryCost, internalRDStrength]);

  const marketChartData = useMemo(() => {
    return [
      { name: 'Policy FAME', val: policyIncentive, fill: '#6366f1' },
      { name: 'Repo Credit', val: repoRateDiscount, fill: '#3b82f6' },
      { name: 'Consumer EV', val: consumerEVPreference, fill: '#10b981' },
      { name: 'Battery Tech', val: techBatteryCost, fill: '#f59e0b' },
      { name: 'Internal R&D', val: internalRDStrength, fill: '#ec4899' },
    ];
  }, [policyIncentive, repoRateDiscount, consumerEVPreference, techBatteryCost, internalRDStrength]);

  const taylorWageCalculation = useMemo(() => {
    const standard = 50;
    const highRate = 20;
    const lowRate = 16;
    const minStatutoryDaily = 700;

    let gross =
      taylorPieceRateOutput >= standard
        ? taylorPieceRateOutput * highRate
        : taylorPieceRateOutput * lowRate;

    if (statutoryFloorActive && gross < minStatutoryDaily) {
      gross = minStatutoryDaily;
    }

    return {
      output: taylorPieceRateOutput,
      rateUsed: taylorPieceRateOutput >= standard ? highRate : lowRate,
      grossWage: gross,
      isFloorApplied: statutoryFloorActive && taylorPieceRateOutput * lowRate < minStatutoryDaily,
    };
  }, [taylorPieceRateOutput, statutoryFloorActive]);

  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // --------------------------------------------------------------------------
  // USEEFFECTS
  // --------------------------------------------------------------------------
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
    const m = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(m);
    const newDiff =
      m === 'not-started' || m === 'beginner'
        ? 'foundation'
        : m === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      angle += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 32;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.stroke();

      const pulse = 3 + Math.sin(angle * 2) * 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, scanMode]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (phase === 'discovery') {
      speechManager.speak('Welcome to Business Studies Class 12. Let us explore the dynamic business environment!');
    }
  }, [phase]);

  // --------------------------------------------------------------------------
  // USECALLBACKS
  // --------------------------------------------------------------------------
  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && activeChallenge.hints[nextLvl - 1]) {
      setCurrentHint(activeChallenge.hints[nextLvl - 1]);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLvl - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
    }
  }, [hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(
      isCorr
        ? 'Spot on! The business environment is a dynamic totality of forces.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us step inside the interactive exploration labs.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Free Sandbox. Manipulate all variables without any grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge Phase initiated. Test your knowledge and strategic competencies.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Excellent observation!' : 'Look closer at the resilience gauge.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      audioManager.play(isCorrect ? 'drop-correct' : 'drop-wrong');
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const items =
        prev.length > 0
          ? [...prev]
          : (activeChallenge.sortItems || []).map((_, i) => i);
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return items;
    });
  }, [activeChallenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the strategic simulation.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback(
    (ans: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (
        activeChallenge.type === 'classify' ||
        activeChallenge.type === 'distinguish' ||
        activeChallenge.type === 'match'
      ) {
        isCorrect = ans === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect =
          JSON.stringify(ans) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect =
          JSON.stringify(ans) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const val = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
        isCorrect =
          Math.abs(val - (activeChallenge.correctAnswer || 0)) <=
          (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = ans === activeChallenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Well analysed.');
        setShowConfetti(true);
        setShowExplanation(true);
        setSparklePos({ x: window.innerWidth / 2, y: 300 });
        setShowSparkle(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          activeChallenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(activeChallenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Hints exhausted. Let us examine the complete solution breakdown.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleSliderChange = useCallback((setter: (val: number) => void, val: number) => {
    setter(val);
    audioManager.play('count');
  }, []);

  // ============================================================================
  // RENDER UI
  // ============================================================================
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                ISC Class 12
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Interactive Commerce Simulation • NEP 2020 Competency Engine
            </p>
          </div>
        </div>

        {/* Dynamic Mode Badges */}
        <div className="flex items-center gap-2">
          <motion.span
            key={phase}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-800 border border-slate-700 text-slate-300"
          >
            Phase: {phase}
          </motion.span>
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                  : 'bg-gold-950/70 border-gold-500 text-gold-300'
              }`}
            >
              {difficulty}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* ----------------------------------------------------------------------
          PHASE 1: DISCOVERY HOOK
      ---------------------------------------------------------------------- */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Box */}
          <div className="p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-950 rounded-2xl border border-gold-700/40 shadow-inner">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm mb-2 uppercase tracking-wide">
              <span>🚨 Live Boardroom Scenario</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
            <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40 text-xs text-gold-200">
              <strong>Your Challenge:</strong> {SCENARIO.context}
            </div>
          </div>

          {/* Curiosity Discovery Question */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-semibold text-amber-300 flex items-center gap-2">
              <span>⚡ Discovery Question (Ungraded Curiosity Hook)</span>
            </h3>
            <p className="text-sm md:text-base text-slate-100 font-medium leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 gap-2 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: discoveryAnswered ? 1 : 1.01 }}
                  whileTap={{ scale: discoveryAnswered ? 1 : 0.99 }}
                  onClick={() => !discoveryAnswered && handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-700'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-gold-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800"
              >
                <p
                  className={`text-sm font-medium ${
                    discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {discoveryCorrect
                    ? '✨ Brilliant intuition! Let us master the mechanics behind totality and scanning.'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm shadow-lg shadow-gold-600/30 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ----------------------------------------------------------------------
          PHASE 2: INTERACTIVE EXPLORATION LABS (With 3 Visualizer SVGs)
      ---------------------------------------------------------------------- */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Progress Pills */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  currentSlide === idx
                    ? 'bg-gold-600 text-white shadow-md shadow-gold-600/30'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700'
                }`}
              >
                {idx + 1}. {step.title.split(':')[1] || step.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Interactive Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h2 className="text-xl font-black text-white mt-0.5">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h2>
                <p className="text-sm text-amber-300/90 mt-1 flex items-center gap-1.5 font-medium">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* SLIDE 0: Environment Totality Radar with TOPIC-SPECIFIC SVG 1 */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* SVG DIAGRAM 1: Concentric Environment Forces Radar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gold-400 uppercase tracking-wide">
                        Visualizer 1: Environment Totality & PESTLE Boundaries
                      </span>
                      <span className="text-[11px] text-slate-400">Concentric Systems Model</span>
                    </div>
                    <SvgEnvironmentTotalityDiagram />
                  </div>

                  {/* Predict-then-check block */}
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-700/50 space-y-2">
                      <p className="text-xs font-bold text-gold-300 uppercase">
                        Hypothesis Check (Predict before adjusting)
                      </p>
                      <p className="text-sm text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          >
                            <span className="font-bold mr-1 text-gold-400">
                              {String.fromCharCode(65 + i)}.
                            </span>
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                      <p className="text-[11px] text-gold-300/80 italic mt-1">
                        {PREDICTION_QUESTIONS[0].verifyInstruction}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Controls */}
                    <div className="lg:col-span-6 space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-semibold">
                          External: Political (FAME-II Subsidies)
                        </span>
                        <span className="text-gold-400 font-bold">{policyIncentive}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={policyIncentive}
                        aria-label="Political FAME-II subsidies slider"
                        onChange={(e) => handleSliderChange(setPolicyIncentive, Number(e.target.value))}
                        className="w-full accent-gold-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />

                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-semibold">
                          External: Economic (RBI Repo Rate Easing)
                        </span>
                        <span className="text-gold-400 font-bold">{repoRateDiscount}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={repoRateDiscount}
                        aria-label="Economic repo rate easing slider"
                        onChange={(e) => handleSliderChange(setRepoRateDiscount, Number(e.target.value))}
                        className="w-full accent-gold-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />

                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-semibold">
                          External: Social (Urban EV Preference)
                        </span>
                        <span className="text-emerald-400 font-bold">{consumerEVPreference}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={consumerEVPreference}
                        aria-label="Social consumer preference slider"
                        onChange={(e) => handleSliderChange(setConsumerEVPreference, Number(e.target.value))}
                        className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />

                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-semibold">
                          Internal: R&D & Battery Lab Strength
                        </span>
                        <span className="text-pink-400 font-bold">{internalRDStrength}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={internalRDStrength}
                        aria-label="Internal RD strength slider"
                        onChange={(e) => handleSliderChange(setInternalRDStrength, Number(e.target.value))}
                        className="w-full accent-pink-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Live Recharts + Score Indicator */}
                    <div className="lg:col-span-6 bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase">
                          Totality of Forces Balance
                        </span>
                        <div className="flex items-center gap-2">
                          <canvas ref={canvasRef} width={70} height={70} className="rounded-full" />
                          <div className="text-right">
                            <span className="text-2xl font-black text-gold-400">
                              {marketResilienceIndex}
                            </span>
                            <span className="text-xs text-slate-400 block">/100 Resilience</span>
                          </div>
                        </div>
                      </div>

                      <div className="h-40 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={marketChartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                            <YAxis domain={[0, 100]} stroke="#64748b" fontSize={10} tickLine={false} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: '#0f172a',
                                borderColor: '#334155',
                                borderRadius: '8px',
                                fontSize: '12px',
                              }}
                            />
                            <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                              {marketChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Observation prompt */}
                  {marketResilienceIndex > 65 && !observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2"
                    >
                      <p className="text-xs font-bold text-amber-300 uppercase">
                        Observation Check: What do you notice?
                      </p>
                      <p className="text-sm text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="text-left p-2.5 rounded-lg text-xs bg-slate-900 hover:bg-slate-750 text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 1: Continuous Scanning vs Annual Audit */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setScanMode('continuous');
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        scanMode === 'continuous'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Continuous Scanning (HUL / Tata Steel Model)
                    </button>
                    <button
                      onClick={() => {
                        setScanMode('annual');
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        scanMode === 'annual'
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Annual 1-Time Audit (Reactive Model)
                    </button>
                  </div>

                  {/* Quarter Selector */}
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {[1, 2, 3, 4].map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setScanQuarter(q);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          scanQuarter === q
                            ? 'bg-gold-950 border-gold-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="text-xs font-bold block">Quarter {q}</span>
                        <span className="text-[11px] block mt-1">
                          {q === 1 && 'Lithium Spike Alert'}
                          {q === 2 && 'SEBI ESG Disclosure'}
                          {q === 3 && 'Competitor 4G Drop'}
                          {q === 4 && 'State EV Subsidy Mandate'}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Outcome Panel */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Quarter {scanQuarter} Strategic Response Matrix
                    </h4>
                    {scanMode === 'continuous' ? (
                      <div className="p-3 bg-emerald-950/40 border border-emerald-600/40 rounded-lg text-xs text-emerald-200 space-y-1">
                        <p className="font-bold">
                          ✓ Early-Warning Triggered (Lead Time: 90 Days):
                        </p>
                        <p>
                          Firm reskilled 5,000 employees and locked long-term battery supply contracts
                          before spot market prices rose. Gross margin saved: ₹120 Crore.
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 bg-rose-950/40 border border-rose-600/40 rounded-lg text-xs text-rose-200 space-y-1">
                        <p className="font-bold">
                          ✗ Ambushed (Surprise Shock during Annual Audit in Q4):
                        </p>
                        <p>
                          Firm was blind during Q1-Q3. Competitors seized 18% market share with ₹10
                          sachets/low-cost packs while firm held unliquidated legacy stock.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 2: Internal vs External Factor Sorter & TOPIC-SPECIFIC SVG 2 */}
              {currentSlide === 2 && (
                <div className="space-y-5">
                  {/* SVG DIAGRAM 2: Management Hierarchy Pyramid */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gold-400 uppercase tracking-wide">
                        Visualizer 2: Indian Corporate Hierarchy & Managerial Tiers
                      </span>
                      <span className="text-[11px] text-slate-400">Companies Act 2013 Governance</span>
                    </div>
                    <SvgManagementPyramidDiagram />
                  </div>

                  <p className="text-xs text-slate-300">
                    Click an item below to classify it as <strong>Internal (Controllable)</strong> or{' '}
                    <strong>External (Uncontrollable)</strong>:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'f1', name: 'Tata Code of Conduct (Culture)', type: 'internal' },
                      { id: 'f2', name: 'RBI 50 bps Repo Rate Cut', type: 'external' },
                      { id: 'f3', name: 'Mysuru 14,000-seat IT Training Centre', type: 'internal' },
                      { id: 'f4', name: 'Consumer Protection Act 2019 E-comm Rules', type: 'external' },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2"
                      >
                        <p className="font-semibold text-white">{item.name}</p>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setClassifiedFactors((prev) => ({ ...prev, [item.id]: 'internal' }));
                              audioManager.play(
                                item.type === 'internal' ? 'drop-correct' : 'drop-wrong'
                              );
                            }}
                            className={`flex-1 py-1 rounded text-[10px] font-bold ${
                              classifiedFactors[item.id] === 'internal'
                                ? item.type === 'internal'
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-rose-600 text-white'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            Internal
                          </button>
                          <button
                            onClick={() => {
                              setClassifiedFactors((prev) => ({ ...prev, [item.id]: 'external' }));
                              audioManager.play(
                                item.type === 'external' ? 'drop-correct' : 'drop-wrong'
                              );
                            }}
                            className={`flex-1 py-1 rounded text-[10px] font-bold ${
                              classifiedFactors[item.id] === 'external'
                                ? item.type === 'external'
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-rose-600 text-white'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            External
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 3: 2x2 SWOT & TOWS Strategy */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {(['S', 'W', 'O', 'T'] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setSelectedSWOTQuadrant(q);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl border font-bold text-xs transition-all ${
                          selectedSWOTQuadrant === q
                            ? 'bg-gold-600 border-gold-400 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {q === 'S' && 'S (Internal Strength)'}
                        {q === 'W' && 'W (Internal Weakness)'}
                        {q === 'O' && 'O (External Opportunity)'}
                        {q === 'T' && 'T (External Threat)'}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    {selectedSWOTQuadrant === 'S' && (
                      <p>
                        <strong>Strength:</strong> Tata brand reputation and Manesar plant 1.5M unit
                        manufacturing capacity (Internal & Controllable benchmarked against rivals).
                      </p>
                    )}
                    {selectedSWOTQuadrant === 'W' && (
                      <p>
                        <strong>Weakness:</strong> Low initial passenger EV market share of 14% and ₹2,000 Cr
                        legacy diesel tooling debt.
                      </p>
                    )}
                    {selectedSWOTQuadrant === 'O' && (
                      <p>
                        <strong>Opportunity:</strong> FAME-II subsidy & 2030 national target of 30% EV
                        adoption (External & Uncontrollable).
                      </p>
                    )}
                    {selectedSWOTQuadrant === 'T' && (
                      <p>
                        <strong>Threat:</strong> Foreign competitors launching low-cost EV models with global
                        supply chain backing.
                      </p>
                    )}
                  </div>

                  {/* TOWS Selector */}
                  <div className="flex gap-2 pt-2">
                    {(['SO', 'WO', 'ST', 'WT'] as const).map((strat) => (
                      <button
                        key={strat}
                        onClick={() => {
                          setActiveTOWSStrategy(strat);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          activeTOWSStrategy === strat
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {strat} Play
                      </button>
                    ))}
                  </div>

                  <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-700/40 text-xs text-gold-200">
                    <strong>TOWS Formulation:</strong>{' '}
                    {activeTOWSStrategy === 'SO' &&
                      'Maxi-Maxi: Deploy brand trust (S) to capture FAME-II subsidies (O) via Nexon EV.'}
                    {activeTOWSStrategy === 'WO' &&
                      'Mini-Maxi: Restructure legacy debt (W) by raising green EV bonds to enter the EV boom (O).'}
                    {activeTOWSStrategy === 'ST' &&
                      'Maxi-Mini: Use nationwide 9,000-dealer service reach (S) to defend against foreign EV entrants (T).'}
                    {activeTOWSStrategy === 'WT' &&
                      'Mini-Mini: Divest loss-making diesel tooling (W) to minimize losses against competitor price wars (T).'}
                  </div>
                </div>
              )}

              {/* SLIDE 4: Taylor vs Fayol Interactive Balancer & TOPIC-SPECIFIC SVG 3 */}
              {currentSlide === 4 && (
                <div className="space-y-5">
                  {/* SVG DIAGRAM 3: Fayol's Scalar Chain & Gang Plank */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gold-400 uppercase tracking-wide">
                        Visualizer 3: Henri Fayol Scalar Chain & Emergency Gang Plank
                      </span>
                      <span className="text-[11px] text-slate-400">Administrative Management</span>
                    </div>
                    <SvgScalarChainDiagram gangPlankActive={gangPlankActive} />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setTheoristLens('taylor');
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold ${
                        theoristLens === 'taylor'
                          ? 'bg-gold-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Taylor: Scientific Shop-Floor (Task Level)
                    </button>
                    <button
                      onClick={() => {
                        setTheoristLens('fayol');
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold ${
                        theoristLens === 'fayol'
                          ? 'bg-gold-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Fayol: Top-Management Administrative (Enterprise Level)
                    </button>
                  </div>

                  {theoristLens === 'taylor' ? (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300 font-semibold">
                          Worker Daily Shift Output: {taylorPieceRateOutput} units (Std: 50)
                        </span>
                        <span className="font-bold text-gold-400">
                          Wage: ₹{taylorWageCalculation.grossWage}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={35}
                        max={65}
                        value={taylorPieceRateOutput}
                        aria-label="Taylor piece rate output slider"
                        onChange={(e) =>
                          handleSliderChange(setTaylorPieceRateOutput, Number(e.target.value))
                        }
                        className="w-full accent-gold-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="statutory"
                          checked={statutoryFloorActive}
                          onChange={(e) => setStatutoryFloorActive(e.target.checked)}
                          className="accent-gold-500 rounded"
                        />
                        <label htmlFor="statutory" className="text-[11px] text-slate-300">
                          Enforce Statutory Minimum Wage Floor (Minimum Wages Act / Code on Wages)
                        </label>
                      </div>
                      {taylorWageCalculation.isFloorApplied && (
                        <p className="text-[11px] text-amber-300">
                          ⚠️ Taylor low rate was ₹{taylorPieceRateOutput * 16}, but statutory floor
                          protected worker with ₹700 minimum wage.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
                      <p className="text-slate-300">
                        Fayol Scalar Chain: Branch Manager → AGM → DGM → GM → CGM → MD → Chairman.
                      </p>
                      <button
                        onClick={() => {
                          setGangPlankActive(!gangPlankActive);
                          audioManager.play('pop');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          gangPlankActive
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {gangPlankActive
                          ? '✓ Gang Plank Active (Lateral Emergency Link Enabled)'
                          : 'Activate Gang Plank (Emergency Bypass)'}
                      </button>
                      <p className="text-[11px] text-slate-400">
                        {gangPlankActive
                          ? 'Peer Department Heads at Tata Steel directly coordinate rolling schedules during furnace surge, informing superiors post-facto.'
                          : 'Standard strict vertical chain of command in operation.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide((s) => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs text-slate-400">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide((s) => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-5 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ----------------------------------------------------------------------
          PHASE 3: SANDBOX / FREE PLAY MODE
      ---------------------------------------------------------------------- */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">🎮 Free Strategy Sandbox</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Freely manipulate both internal company levers and external economic variables with zero grading.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 whitespace-nowrap"
            >
              I am Ready for Challenges! →
            </motion.button>
          </div>

          {/* Sandbox Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wide">
                External Force Simulators
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Govt PLI & FAME Subsidies:</span>
                  <span className="font-bold text-gold-300">{policyIncentive}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={policyIncentive}
                  aria-label="Sandbox policy incentive slider"
                  onChange={(e) => setPolicyIncentive(Number(e.target.value))}
                  className="w-full accent-gold-500 h-1.5 bg-slate-800 rounded"
                />

                <div className="flex justify-between">
                  <span className="text-slate-300">RBI Repo Monetary Liquidity:</span>
                  <span className="font-bold text-gold-300">{repoRateDiscount}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={repoRateDiscount}
                  aria-label="Sandbox repo rate discount slider"
                  onChange={(e) => setRepoRateDiscount(Number(e.target.value))}
                  className="w-full accent-gold-500 h-1.5 bg-slate-800 rounded"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-pink-400 uppercase tracking-wide">
                Internal Asset & Scientific Shop Levers
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Internal R&D Capability:</span>
                  <span className="font-bold text-pink-300">{internalRDStrength}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={internalRDStrength}
                  aria-label="Sandbox internal RD strength slider"
                  onChange={(e) => setInternalRDStrength(Number(e.target.value))}
                  className="w-full accent-pink-500 h-1.5 bg-slate-800 rounded"
                />

                <div className="flex justify-between">
                  <span className="text-slate-300">Taylor Daily Shift Assembly Rate:</span>
                  <span className="font-bold text-emerald-300">{taylorPieceRateOutput} units</span>
                </div>
                <input
                  type="range"
                  min={35}
                  max={65}
                  value={taylorPieceRateOutput}
                  aria-label="Sandbox taylor assembly rate slider"
                  onChange={(e) => setTaylorPieceRateOutput(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ----------------------------------------------------------------------
          PHASE 4: GRADED CHALLENGE ARENA
      ---------------------------------------------------------------------- */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Live Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-slate-400">
                Competency Target:{' '}
                <strong className="text-gold-400 capitalize">
                  {activeChallenge.competencyLevel}
                </strong>
              </span>
            </div>

            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500 rounded-full"
                animate={{
                  width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 shadow-lg shadow-rose-950/50'
                : 'border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-gold-950 text-gold-300 border border-gold-700/50">
                {activeChallenge.type.toUpperCase()}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Ref Node: {activeChallenge.nodeId}
              </span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {activeChallenge.question}
            </h3>

            {/* MCQ Types */}
            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="space-y-2">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-gold-500'
                      }`}
                    >
                      <span className="font-bold mr-2 text-gold-400">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag Label Diagram Type */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 w-full block mb-1">
                    Drag Labels into Targets Below:
                  </span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 text-white rounded-lg cursor-grab text-xs font-bold shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-2">
                  {activeChallenge.dragItems.map((target, idx) => (
                    <div
                      key={idx}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.targetId)}
                      className="p-3 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 hover:border-gold-500 flex items-center justify-between transition-all"
                    >
                      <span className="text-xs text-slate-400 font-semibold">
                        Target Slot {idx + 1}: [{target.targetId}]
                      </span>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-lg ${
                          droppedLabels[target.targetId]
                            ? 'bg-gold-950 border border-gold-500 text-gold-200'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {droppedLabels[target.targetId] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Drag Placement →
                </motion.button>
              </div>
            )}

            {/* Drag Sort Steps Type */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block">
                  Drag and reorder items to match standard sequential protocol:
                </span>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0', 10);
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl border border-slate-700 cursor-grab flex items-center gap-3 text-xs font-medium"
                    >
                      <span className="w-5 h-5 rounded-full bg-gold-950 text-gold-400 font-bold flex items-center justify-center text-[10px] border border-gold-700/50">
                        {displayIdx + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    handleAnswer(
                      sortArrangement.length > 0
                        ? sortArrangement
                        : activeChallenge.sortItems?.map((_, i) => i) || []
                    )
                  }
                  disabled={showExplanation}
                  className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Sequence Order →
                </motion.button>
              </div>
            )}

            {/* Numeric Input Type */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label="Numeric answer input"
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value..."
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-64 focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-xs text-slate-400 font-bold">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Explanation & Progressive Reveal Step-by-Step */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-slate-950/90 rounded-xl border border-slate-800 space-y-3"
              >
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Step-by-Step Strategic Breakdown:
                </p>
                <div className="space-y-1.5">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-gold-400 mr-1">{idx + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps <
                  activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length -
                    1 ? (
                    <button
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="text-xs text-gold-400 hover:text-gold-300 font-bold"
                    >
                      Show Next Explanatory Step →
                    </button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'View Final Boardroom Evaluation →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ----------------------------------------------------------------------
          PHASE 5: COMPLETION, MOTIVATIONAL FEEDBACK, REFLECTIONS & REAL WORLD
      ---------------------------------------------------------------------- */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Header Score Card */}
          <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-950 rounded-2xl border border-gold-700/50 text-center space-y-2">
            <h2 className="text-2xl font-black text-white">🏆 Strategic Simulation Complete</h2>
            <p className="text-sm text-gold-300">
              BharatMotors Executive Board Evaluation Score:{' '}
              <span className="text-2xl font-black text-white">
                {Math.max(0, 100 - errors * 5)}%
              </span>
            </p>
            <p className="text-xs text-slate-400">
              Demonstrated Mastery Status:{' '}
              <strong className="text-emerald-400 uppercase">{masteryLevel}</strong>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div
            className={`p-5 rounded-2xl border text-sm leading-relaxed ${
              errors === 0
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100'
                : errors <= 3
                ? 'bg-gold-950/60 border-gold-500 text-gold-100'
                : errors <= 7
                ? 'bg-amber-950/60 border-amber-500 text-amber-100'
                : 'bg-rose-950/60 border-rose-500 text-rose-100'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-base uppercase tracking-wide mb-1">
              <span>{errors === 0 ? '🌟' : errors <= 3 ? '✨' : errors <= 7 ? '👍' : '💪'}</span>
              <span>
                {errors === 0 && 'PERFECT SCORE!'}
                {errors >= 1 && errors <= 3 && 'Great work!'}
                {errors >= 4 && errors <= 7 && 'Good effort!'}
                {errors >= 8 && 'Do not give up — You WILL get this!'}
              </span>
            </div>
            <p className="text-xs opacity-90">
              {errors === 0 &&
                'You demonstrated comprehensive expertise across all syllabus nodes — from macro environmental totality to Taylor differential piece-rates and Fayol administrative governance!'}
              {errors >= 1 &&
                errors <= 3 &&
                'You navigated macro shocks, SWOT synthesis, and organizational hierarchies with strong executive competence.'}
              {errors >= 4 &&
                errors <= 7 &&
                'You have built a solid foundation across business environment scanning and classical principles. Keep practicing to master edge cases.'}
              {errors >= 8 &&
                'Business strategy and administrative theory take iteration. Revisit the interactive labs and reinforce key definitions to conquer your exams!'}
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-gold-400 font-bold text-sm uppercase tracking-wider">
                💭 Post-Simulation Strategic Reflection
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Consolidate your learning by answering these three metacognitive prompts:
            </p>

            <div className="space-y-4 pt-1">
              {/* Question 1 */}
              <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-slate-200 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                  placeholder="e.g. How Taylor's differential rates still interact with modern Indian minimum wage laws..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-gold-500 min-h-[50px] resize-none"
                />
              </div>

              {/* Question 2 */}
              <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-slate-200 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                  placeholder="e.g. Environmental scanning is like radar navigation for a ship in foggy weather..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-gold-500 min-h-[50px] resize-none"
                />
              </div>

              {/* Question 3 */}
              <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-slate-200 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflection3}
                  onChange={(e) => setReflection3(e.target.value)}
                  placeholder="e.g. Launching a startup, choosing career skills, or analyzing company stock filings..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-gold-500 min-h-[50px] resize-none"
                />
              </div>
            </div>
          </div>

          {/* REAL-WORLD ACTIVITY */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-gold-900/40 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏢</span>
              <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wide">
                Real-World Activity: The Indian Corporate Strategic Audit
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Step into the shoes of a junior strategy consultant at McKinsey India or Tata Strategic Management Group.
              Apply the concepts from this simulation to a real-world enterprise operating in India today.
            </p>

            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                Activity Steps:
              </span>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-gold-950 text-gold-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0 border border-gold-700/50">
                    1
                  </span>
                  <div>
                    <strong className="text-white">Select a Real Indian Major:</strong> Choose any publicly listed Indian company (e.g., Tata Motors, Reliance Jio, Infosys, Zomato, or Maruti Suzuki).
                  </div>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-gold-950 text-gold-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0 border border-gold-700/50">
                    2
                  </span>
                  <div>
                    <strong className="text-white">Conduct a 2-Tier Environmental Scan:</strong> Identify one macro General Force (e.g., GST rate revision, RBI repo rate shift, or AI disruption) and one Specific Force (e.g., key supplier shortage or a rival price cut) affecting their revenue.
                  </div>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-gold-950 text-gold-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0 border border-gold-700/50">
                    3
                  </span>
                  <div>
                    <strong className="text-white">Draft a 2x2 TOWS Action Matrix:</strong> Map one Internal Strength + External Opportunity (SO Play) and one Internal Weakness + External Threat (WT Play).
                  </div>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-gold-950 text-gold-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0 border border-gold-700/50">
                    4
                  </span>
                  <div>
                    <strong className="text-white">Synthesize Taylor & Fayol on the Ground:</strong> Document how the company applies Taylor’s scientific measurement at operative tasks and Fayol’s unity of command / scalar chain at executive management.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/40 rounded-xl border border-rose-800/50 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                🚨 Personalized Misconception Diagnostic Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                      <p className="text-rose-400 font-bold">❌ Myth: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ Fact: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule (SM-2) */}
          <div className="p-4 bg-amber-950/30 rounded-xl border border-amber-800/40 text-xs text-amber-200">
            <strong>📅 Spaced Repetition Review Schedule:</strong> Based on your performance, this topic
            will resurface in{' '}
            <span className="font-bold text-white">
              {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
            </span>{' '}
            to solidify retention before ISC Board Examinations.
          </div>
        </motion.div>
      )}

      {/* ----------------------------------------------------------------------
          POPUP FEEDBACK NOTIFICATIONS
      ---------------------------------------------------------------------- */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Cleared!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_BusinessStudiesBusinessEnvironmentMeaningSim;
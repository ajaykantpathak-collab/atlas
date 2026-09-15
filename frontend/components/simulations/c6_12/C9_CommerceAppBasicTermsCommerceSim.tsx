'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ICSE CLASS 9 COMMERCIAL APPLICATIONS) ───
const NODE_C9_COMMAPP_001 = 'c9_commapp_001';
const NODE_C9_COMMAPP_002 = 'c9_commapp_002';
const NODE_C9_COMMAPP_003 = 'c9_commapp_003';
const NODE_C9_COMMAPP_004 = 'c9_commapp_004';
const NODE_C9_COMMAPP_005 = 'c9_commapp_005';
const NODE_C9_COMMAPP_006 = 'c9_commapp_006';
const NODE_C9_COMMAPP_007 = 'c9_commapp_007';
const NODE_C9_COMMAPP_008 = 'c9_commapp_008';
const NODE_C9_COMMAPP_009 = 'c9_commapp_009';
const NODE_C9_COMMAPP_010 = 'c9_commapp_010';

const ALL_NODE_IDS = [
  NODE_C9_COMMAPP_001,
  NODE_C9_COMMAPP_002,
  NODE_C9_COMMAPP_003,
  NODE_C9_COMMAPP_004,
  NODE_C9_COMMAPP_005,
  NODE_C9_COMMAPP_006,
  NODE_C9_COMMAPP_007,
  NODE_C9_COMMAPP_008,
  NODE_C9_COMMAPP_009,
  NODE_C9_COMMAPP_010,
];

// ─── PREDICTION QUESTIONS (Brilliant.org Predict-Then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If a Sole Proprietorship business with ₹5 Lakh capital incurs debts of ₹12 Lakh, what will happen to the owner’s personal residential house?',
    options: [
      'The house cannot be touched because business and personal assets are legally separate.',
      'The court can seize and auction the house because a sole proprietor has unlimited liability.',
      'Only 50% of the house value can be claimed by creditors.',
      'Creditors can only claim whatever was registered as business capital.',
    ],
    correctIndex: 1,
    explanation: 'A sole proprietorship has no separate legal entity from its owner, resulting in unlimited liability where personal assets can be attached to settle business debts.',
    verifyInstruction: 'Go to Lab 2 (Liability Stress-Test), select Sole Proprietorship, drag the Debt slider past ₹5 Lakhs, and verify that personal assets get seized.',
  },
  {
    id: 'pred_2',
    question: 'What will happen to the regional groundwater aquifer table if tube well pumping extraction exceeds 100% of natural rainwater recharge?',
    options: [
      'The water table level will rise as groundwater cycles faster through the ground.',
      'The water table depth will sink deeper year after year due to a net recharge deficit.',
      'The water table will remain unchanged because groundwater is naturally inexhaustible.',
      'The water will immediately turn into mineral saltwater without any level change.',
    ],
    correctIndex: 1,
    explanation: 'Although water is a renewable resource via the hydrological cycle, extraction exceeding natural recharge rate (e.g. 165% in parts of Punjab) causes rapid quantitative aquifer depletion.',
    verifyInstruction: 'Go to Lab 3 (Groundwater Gauge), adjust the extraction slider above 100%, and watch the simulated water table sink deeper in the cross-section diagram.',
  },
];

// ─── OBSERVATION QUESTIONS (Brilliant.org Notice & Discover Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'In the Eco-Factory Lab, what happens to the Tannery River Discharge value when you switch on "Zero Liquid Discharge (ZLD)"?',
    observableOptions: [
      'The discharge drops from toxic levels directly down to 0.0 mg/L with 100% closed-loop recirculation.',
      'The discharge increases because treated water requires additional chemical flushing.',
      'The discharge remains at 45 mg/L while electricity consumption triples.',
      'The discharge changes color but the outflow volume remains identical to crude effluent.',
    ],
    correctIndex: 0,
    explanation: 'Zero Liquid Discharge (ZLD) ensures 100% of industrial effluent is treated and recycled back into plant operations, completely preventing toxic discharge into rivers.',
  },
  {
    id: 'obs_2',
    question: 'In the Corporate Department Pipeline, which department is observed directly creating customer demand and brand recall rather than physically moving boxes?',
    observableOptions: [
      'Stores Department (manages raw materials in bin cards)',
      'Production Department (operates automated packaging lines)',
      'Marketing Department (deploys advertising campaigns like the iconic Amul Girl)',
      'Sales Department (dispatches delivery vans to retail kirana stores)',
    ],
    correctIndex: 2,
    explanation: 'Marketing creates awareness, desire, and brand pull (e.g. through campaigns), while Sales converts that demand into orders, delivery, and cash collection.',
  },
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Indian Enterprise & Sustainability Quest',
  intro: 'You are appointed as the Lead Commercial Strategist for "Bharat Dynamics & Logistics", an ambitious multi-division conglomerate navigating manufacturing, FMCG goods, retail networks, sustainable green plant operations, and multi-departmental corporate governance.',
  context: 'Your mission is to understand foundational commerce vocabulary, classify industrial entities, manage ownership liability, enforce pollution controls, and coordinate eight core departments from Purchase to HR and Legal.',
};

// ─── DISCOVERY QUESTION (Curiosity Hook) ───
const DISCOVERY_QUESTION = {
  question: 'Is "Commerce" identical to "Business", or is it one specific component of it?',
  options: [
    'Commerce and Business are 100% identical terms used interchangeably',
    'Business = Industry (Production) + Commerce (Trade & Auxiliaries)',
    'Commerce only means making steel and manufacturing automobiles',
    'Business is only for small shops, while Commerce is for listed companies',
  ],
  correctIndex: 1,
  hintAfter: "Let's explore why! Business is the universal umbrella comprising production (industry) and exchange with its supporting services (commerce).",
};

// ─── CHALLENGE INTERFACE (NEP 2020 / CISCE 2026) ───
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

// ─── 22 COMPREHENSIVE CHALLENGES (ALL 10 NODES COVERED) ───
const CHALLENGES: Challenge[] = [
  // 1. Basic Terms (Recall - Foundation)
  {
    id: 'ch_001_terms',
    nodeId: NODE_C9_COMMAPP_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Tata Steel operates blast furnaces at Jamshedpur to convert iron ore into steel. Under which branch of business does this manufacturing fall?',
    options: ['Trade', 'Auxiliary to Trade', 'Industry (Production)', 'Commercial Banking'],
    correctIndex: 2,
    explanation: 'Industry is the branch of business concerned with production and conversion of raw materials into finished products (raising form utility).',
    hints: [
      'Think about whether this activity is making a physical product or exchanging it.',
      'Converting iron ore into steel changes the form of the raw material.',
      'Manufacturing and processing belong to Industry.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Auxiliaries to Trade (Understanding - Foundation)
  {
    id: 'ch_002_aux',
    nodeId: NODE_C9_COMMAPP_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'New India Assurance covers a consignment of goods against transit fire and damage. Which hindrance of trade does Insurance remove?',
    options: ['Hindrance of Place', 'Hindrance of Risk', 'Hindrance of Finance', 'Hindrance of Knowledge'],
    correctIndex: 1,
    explanation: 'Insurance removes the hindrance of risk by providing financial protection against unforeseen perils, fire, theft, and transit damage.',
    hints: [
      'What problem happens if goods burn or get damaged during transit?',
      'Transport removes place hindrance, banking removes finance hindrance.',
      'Insurance protects against financial losses caused by uncertainty and risk.',
    ],
    misconceptionIndex: 2,
  },
  // 3. Commercial Organisations (Understanding - Foundation)
  {
    id: 'ch_003_org',
    nodeId: NODE_C9_COMMAPP_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is Hindustan Unilever (HUL) classified as a commercial organisation while AIIMS New Delhi is classified as a non-commercial organisation?',
    options: [
      'HUL has offices while AIIMS has only hospital beds',
      'HUL operates with the primary motive of earning profit through business activities',
      'AIIMS does not employ any staff or managers',
      'Commercial organisations are only allowed in Maharashtra',
    ],
    correctIndex: 1,
    explanation: 'The profit motive in conducting business activities is the decisive criterion distinguishing commercial organisations like HUL from non-commercial public welfare bodies like AIIMS.',
    hints: [
      'Look at the primary purpose of existence for both entities.',
      'Both have defined structures and legal identity, but their primary motive differs.',
      'Commercial organisations exist primarily to generate profit from goods or services.',
    ],
    misconceptionIndex: 0,
  },
  // 4. Drag-Label: Hierarchy of Business (Understanding - Foundation)
  {
    id: 'ch_004_drag_hierarchy',
    nodeId: NODE_C9_COMMAPP_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each commercial component to complete the structural hierarchy of Business.',
    dragItems: [
      { label: 'Industry', targetId: 'slot_left' },
      { label: 'Commerce', targetId: 'slot_right' },
      { label: 'Trade', targetId: 'slot_trade' },
      { label: 'Auxiliaries', targetId: 'slot_aux' },
    ],
    correctMapping: {
      slot_left: 'Industry',
      slot_right: 'Commerce',
      slot_trade: 'Trade',
      slot_aux: 'Auxiliaries',
    },
    explanation: 'Business splits into Industry (production) and Commerce (exchange). Commerce further subdivides into Trade and Auxiliaries to Trade.',
    hints: [
      'Business contains production on one side and exchange on the other.',
      'Left slot is for production (Industry), right slot is for exchange (Commerce).',
      'Under Commerce, actual buying/selling is Trade, and supporting services are Auxiliaries.',
    ],
  },
  // 5. FMCG vs Consumer Durables (Analysis - Standard)
  {
    id: 'ch_005_fmcg',
    nodeId: NODE_C9_COMMAPP_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which of the following products is an example of Fast-Moving Consumer Goods (FMCG)?',
    options: [
      'Godrej Double-Door Refrigerator (₹28,000)',
      'Hero Splendor Plus Motorcycle (₹75,000)',
      'Surf Excel Detergent Powder & Lifebuoy Soap',
      'Dell Precision Engineering Workstation (₹1,50,000)',
    ],
    correctIndex: 2,
    explanation: 'FMCG refers to consumer goods sold quickly at relatively low unit cost and consumed frequently, such as soaps, detergents, biscuits, and packaged tea.',
    hints: [
      'Consider the frequency of purchase and unit cost.',
      'Refrigerators and bikes are durable goods purchased once every few years.',
      'Detergents and soaps are purchased weekly/monthly at low prices.',
    ],
    misconceptionIndex: 1,
  },
  // 6. Diversified Conglomerates: ITC Limited (Analysis - Standard)
  {
    id: 'ch_006_itc',
    nodeId: NODE_C9_COMMAPP_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is it inaccurate to classify ITC Limited solely as an FMCG company?',
    options: [
      'ITC does not produce any packaged consumer goods',
      'ITC is a diversified conglomerate operating across FMCG, Luxury Hotels, Paperboards, and Agri-Business',
      'ITC is registered as a non-profit cooperative society under Gujarat law',
      'ITC operates only as an auxiliary banking institution',
    ],
    correctIndex: 1,
    explanation: 'ITC Limited is a diversified conglomerate whose divisions span FMCG (Aashirvaad, Sunfeast), Hospitality (ITC Hotels), Paperboards (Bhadrachalam mill), and Agri-business.',
    hints: [
      'Does ITC only sell biscuits and atta, or does it own luxury hotels and paperboard plants?',
      'A company with multiple unrelated business divisions is a conglomerate.',
      'ITC spans primary, secondary, and tertiary sectors.',
    ],
    misconceptionIndex: 0,
  },
  // 7. Non-Profit Objectives vs Revenue: Amul & Tata Trusts (Understanding - Standard)
  {
    id: 'ch_007_nonprofit',
    nodeId: NODE_C9_COMMAPP_004,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Tata Trusts earns substantial investment dividends annually. Why is it classified as a non-profit organisation?',
    options: [
      'Non-profits are legally banned from earning any revenue or returns',
      'Any surplus earned is entirely reinvested in philanthropic healthcare and education, never distributed to owners as profit',
      'Tata Trusts has zero employees and no offices in India',
      'It is owned entirely by the Central Government of India',
    ],
    correctIndex: 1,
    explanation: 'Non-profit status is determined by the absence of profit distribution to private owners: all surplus is retained and applied toward charitable and societal objectives.',
    hints: [
      'Can non-profits receive revenue? Yes!',
      'Where does the money go? Does Jamsetji Tata\'s trust pay dividends to private shareholders?',
      'Surplus is reinvested in charitable institutions like the Tata Memorial Hospital.',
    ],
    misconceptionIndex: 0,
  },
  // 8. CSR Spend Calculation: Section 135 (Numeric - Standard)
  {
    id: 'ch_008_csr_calc',
    nodeId: NODE_C9_COMMAPP_004,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under Section 135 of the Companies Act 2013, an Indian company with an average net profit of ₹600 crore over the past 3 years must spend what minimum amount on CSR (in ₹ crore)?',
    correctAnswer: 12,
    tolerance: 0.1,
    unit: 'crores',
    explanation: 'Under Section 135, eligible companies must spend at least 2% of their average net profit on CSR. 2% of ₹600 crore = ₹12 crore.',
    hints: [
      'What percentage of average net profit is mandated under Section 135?',
      'The statutory requirement is 2% of average net profits of the preceding 3 years.',
      'Calculate: 600 × 0.02 = 12.',
    ],
  },
  // 9. Ownership Structures: Liability in Sole Proprietorship (Application - Standard)
  {
    id: 'ch_009_soleprop',
    nodeId: NODE_C9_COMMAPP_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Mr. Ramesh operates a kirana store with ₹5 lakh capital. His business incurs unpaid debts of ₹9 lakh. Can creditors claim his personal residential property?',
    options: [
      'No, because his liability is capped at ₹5 lakh',
      'Yes, because a sole proprietor has unlimited liability and no separate legal identity from the business',
      'No, creditors can only seize 50% of personal assets',
      'Only if the business is registered under the Companies Act 2013',
    ],
    correctIndex: 1,
    explanation: 'In a sole proprietorship, the owner and the business are one in the eyes of the law; the owner has unlimited liability, meaning personal assets can be seized to settle debts.',
    hints: [
      'Does a sole proprietorship enjoy limited liability protection?',
      'Is there a separate corporate veil between Mr. Ramesh and his grocery store?',
      'Unlimited liability means personal savings, house, and jewellery can be attached for business debts.',
    ],
    misconceptionIndex: 1,
  },
  // 10. Joint Hindu Family Business: Karta vs Coparceners (Analysis - Standard)
  {
    id: 'ch_010_jhf',
    nodeId: NODE_C9_COMMAPP_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Under the Hindu Succession (Amendment) Act 2005, what is the legal liability and status of coparceners compared to the Karta?',
    options: [
      'Karta has limited liability; coparceners have unlimited liability',
      'Karta has unlimited liability with absolute management; coparceners (sons & daughters) have liability limited to their share in family property',
      'Daughters cannot become coparceners under any circumstances',
      'Both Karta and coparceners have zero liability for all business contracts',
    ],
    correctIndex: 1,
    explanation: 'In a JHF business, the Karta manages operations with unlimited liability, whereas coparceners enjoy limited liability up to their share in ancestral property, and daughters have equal coparcenary rights after 2005.',
    hints: [
      'Who manages the family firm? The Karta!',
      'Does the Karta bear greater risk than the other family members?',
      'The 2005 amendment granted daughters equal birthright coparcenary status.',
    ],
    misconceptionIndex: 1,
  },
  // 11. Renewable vs Non-Renewable: Water & Minerals (Understanding - Foundation)
  {
    id: 'ch_011_renew',
    nodeId: NODE_C9_COMMAPP_006,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is groundwater classified as a renewable resource even when Punjab\'s water table is depleting rapidly due to tubewell extraction?',
    options: [
      'Groundwater is non-renewable because it can run out completely',
      'Water naturally cycles through evaporation and precipitation; depletion occurs because extraction rate (165%) exceeds natural recharge rate',
      'Groundwater is an artificial man-made chemical compound',
      'Punjab\'s groundwater was declared a mineral by the Ministry of Mines',
    ],
    correctIndex: 1,
    explanation: 'Water is naturally renewable through the hydrological cycle. Depletion happens due to over-use when extraction exceeds natural recharge, not because the resource lacks the capacity to regenerate.',
    hints: [
      'Think about the water cycle: evaporation, condensation, rainfall.',
      'Renewable means it can replenish itself under sustainable usage.',
      'Over-pumping for paddy cultivation causes localized depletion.',
    ],
    misconceptionIndex: 0,
  },
  // 12. Depletion vs Pollution (Distinguish - Standard)
  {
    id: 'ch_012_dep_poll',
    nodeId: NODE_C9_COMMAPP_006,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which statement correctly distinguishes Resource Depletion from Environmental Pollution?',
    options: [
      'Depletion and pollution are identical terms describing dirty water',
      'Depletion is the quantitative reduction in resource stock; Pollution is the qualitative degradation of the environment',
      'Depletion only affects air, while pollution only affects forests',
      'Pollution is caused by trees, while depletion is caused by banks',
    ],
    correctIndex: 1,
    explanation: 'Depletion reduces the physical quantity of resources available (e.g. falling groundwater level or mined iron ore); pollution degrades the physical quality of air, water, or soil through contaminants.',
    hints: [
      'One is about quantity (how much is left), one is about quality (how clean it is).',
      'An aquifer can be depleted without being contaminated.',
      'River Ganga is polluted by tannery effluent, while iron ore reserves in Bailadila are depleted.',
    ],
    misconceptionIndex: 1,
  },
  // 13. Thermal Pollution: Chimney vs Water (Misconception - Standard)
  {
    id: 'ch_013_thermal',
    nodeId: NODE_C9_COMMAPP_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is Thermal Pollution as caused by NTPC Singrauli Super Thermal Power Station?',
    options: [
      'The thick black smoke and fly ash released from the boiler chimney into the air',
      'The discharge of hot condenser cooling water into rivers/reservoirs, raising water temperature and killing aquatic life',
      'The noise generated by heavy coal conveyor belts',
      'The magnetic field created by high-voltage transmission wires',
    ],
    correctIndex: 1,
    explanation: 'Thermal pollution is the discharge of heated cooling water into water bodies, reducing dissolved oxygen and destroying aquatic ecosystems. Chimney smoke is industrial air pollution.',
    hints: [
      'Thermal means heat. Which medium receives the heated effluent?',
      'Do power plants use massive amounts of water to cool steam turbines?',
      'Hot water discharged into reservoirs reduces dissolved oxygen for fish.',
    ],
    misconceptionIndex: 0,
  },
  // 14. Drag-Label: Sources of Pollution to Affected Media (Application - Standard)
  {
    id: 'ch_014_drag_pollution',
    nodeId: NODE_C9_COMMAPP_007,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match each pollution source to its primary affected environmental medium.',
    dragItems: [
      { label: 'Vehicular PM2.5 & NOx', targetId: 'slot_air' },
      { label: 'Kanpur Tannery Chromium Effluent', targetId: 'slot_water' },
      { label: 'Pesticides (Endosulfan Runoff)', targetId: 'slot_soil' },
    ],
    correctMapping: {
      slot_air: 'Vehicular PM2.5 & NOx',
      slot_water: 'Kanpur Tannery Chromium Effluent',
      slot_soil: 'Pesticides (Endosulfan Runoff)',
    },
    explanation: 'Vehicles discharge gases into the atmosphere (Air), tanneries release heavy metal effluents into rivers (Water), and pesticides contaminate agricultural land and groundwater (Soil).',
    hints: [
      'Where do vehicle exhaust pipes release emissions?',
      'Where do tannery liquid drains discharge?',
      'Where are chemical sprays like Endosulfan applied?',
    ],
  },
  // 15. Biogas vs Natural Gas (Analysis - Standard)
  {
    id: 'ch_015_biogas',
    nodeId: NODE_C9_COMMAPP_008,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does Biogas generated from cattle dung in Wardha differ from Natural Gas extracted from KG-D6 basin?',
    options: [
      'Biogas contains no combustible gases',
      'Biogas is a renewable fuel produced by anaerobic decomposition of organic waste, while Natural Gas is a non-renewable fossil fuel',
      'Natural gas is produced by planting eucalyptus trees',
      'Both are non-renewable fossil fuels formed over millions of years',
    ],
    correctIndex: 1,
    explanation: 'Biogas (50-60% methane) is produced renewably in digesters from animal dung/biomass. Natural gas (70-90% methane) is a geological fossil fuel trapped underground.',
    hints: [
      'Can you produce biogas tomorrow from fresh cattle dung?',
      'Can you quickly produce natural gas, or did it take millions of years of geological pressure?',
      'Biogas is renewable; natural gas is a finite fossil fuel.',
    ],
    misconceptionIndex: 1,
  },
  // 16. Eco-Friendly Manufacturing: Zero Liquid Discharge (Evaluation - Advanced)
  {
    id: 'ch_016_zld',
    nodeId: NODE_C9_COMMAPP_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does Tata Steel\'s Zero Liquid Discharge (ZLD) facility at Jamshedpur protect the Subarnarekha River?',
    options: [
      'By releasing effluents only during night hours',
      'By treating, purifying, and recycling 100% of industrial wastewater back into plant operations so zero effluent enters the river',
      'By dumping solid sludge directly into municipal landfills',
      'By burning chemical wastewater in open furnaces',
    ],
    correctIndex: 1,
    explanation: 'Zero Liquid Discharge (ZLD) is an advanced eco-friendly water management system where all wastewater is purified and recirculated, eliminating any toxic discharge into natural water bodies.',
    hints: [
      'What does "Zero Liquid Discharge" literally mean?',
      'Does any drop of liquid get discharged outside into the river?',
      '100% of treated wastewater is recycled inside the manufacturing loop.',
    ],
  },
  // 17. Operating vs Support Departments (Understanding - Foundation)
  {
    id: 'ch_017_depts',
    nodeId: NODE_C9_COMMAPP_009,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which group contains only Operating Departments that directly handle the physical flow and exchange of goods?',
    options: [
      'Finance, Human Resources, Legal',
      'Purchase & Stores, Production, Marketing & Sales',
      'General Administration, Company Secretary, Internal Audit',
      'Corporate CSR, Board of Directors, Legal Cell',
    ],
    correctIndex: 1,
    explanation: 'Operating departments (Purchase & Stores, Production, Marketing & Sales) directly handle physical inputs, manufacturing, and customer transactions. Finance, HR, Admin, and Legal are support departments.',
    hints: [
      'Operating departments directly buy, make, or sell products.',
      'Support departments handle money, hiring, office buildings, and compliance.',
      'Purchase buys materials, Production makes goods, Sales delivers them.',
    ],
  },
  // 18. Drag-Sort: Purchase & Stores Five-Document Workflow (Application - Advanced)
  {
    id: 'ch_018_drag_docs',
    nodeId: NODE_C9_COMMAPP_009,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Arrange the 5 sequential documents in the standard Purchase & Stores workflow from requirement to usage.',
    sortItems: [
      '1. Purchase Indent (from Production to Purchase)',
      '2. Purchase Order - PO (issued to Supplier)',
      '3. Goods Receipt Note - GRN (issued by Stores on delivery)',
      '4. Material Requisition Slip (raised by Production to Stores)',
      '5. Stock Record / Bin Card Update',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Workflow: Production raises Indent → Purchase issues PO to supplier → Stores inspects delivery and signs GRN → Production presents Requisition Slip to draw material → Stores updates Stock Records.',
    hints: [
      'An internal request (Indent) must occur before sending a legal Purchase Order to an outside vendor.',
      'When goods arrive at the gate, Stores creates a Goods Receipt Note (GRN).',
      'To take steel out of the warehouse, Production presents a Material Requisition Slip.',
    ],
    misconceptionIndex: 2,
  },
  // 19. Marketing vs Sales Distinction (Analysis - Standard)
  {
    id: 'ch_019_mkt_sales',
    nodeId: NODE_C9_COMMAPP_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'HUL spends ₹1,400+ crore on television campaigns like "Surf Excel Daag Achhe Hain", while distributor agents book orders at 9 million kirana stores. Which function is which?',
    options: [
      'Campaign is Sales; Order booking is Marketing',
      'Campaign is Marketing (creates awareness & brand demand); Order booking is Sales (fulfils demand & books revenue)',
      'Both are exclusively handled by the General Administration department',
      'Both are legal compliance tasks under Companies Act 2013',
    ],
    correctIndex: 1,
    explanation: 'Marketing creates awareness, desire, and brand pull through advertising, research, and pricing; Sales books orders, delivers stock, invoices retailers, and collects cash.',
    hints: [
      'Marketing creates demand; Sales converts demand into cash transactions.',
      'TV ads make consumers want Surf Excel (Marketing).',
      'Distributor reps visiting shops to deliver cartons perform Sales.',
    ],
    misconceptionIndex: 0,
  },
  // 20. Statutory KMP under Section 203: CFO & CS (Analysis - Advanced)
  {
    id: 'ch_020_kmp',
    nodeId: NODE_C9_COMMAPP_010,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Under Section 203 of the Companies Act 2013, which mandatory Key Managerial Personnel (KMP) sit in the Finance and Legal departments respectively?',
    options: [
      'Production Manager & Marketing Executive',
      'Chief Financial Officer (CFO) in Finance & Company Secretary (CS) in Legal',
      'Storekeeper in Finance & HR Recruiter in Legal',
      'Security Officer in Finance & Labour Contractor in Legal',
    ],
    correctIndex: 1,
    explanation: 'Section 203 mandates every listed company to appoint whole-time KMPs: the Chief Financial Officer (Finance Department) and the Company Secretary (Legal/Secretarial Department).',
    hints: [
      'Who leads corporate financial reporting and capital management? The CFO!',
      'Who ensures board compliance, MCA filings, and Companies Act adherence? The Company Secretary!',
      'Both are statutory appointments mandated by company law.',
    ],
  },
  // 21. HR vs General Administration: Onboarding at TCS (Evaluation - Advanced)
  {
    id: 'ch_021_hr_admin',
    nodeId: NODE_C9_COMMAPP_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When a graduate joins TCS Pune, HR issues the Appointment Letter and conducts induction training. What role does General Administration play?',
    options: [
      'Admin calculates quarterly company net income for the stock exchange',
      'Admin allocates the physical workstation, laptop, RFID access card, bus transport route, and canteen pass',
      'Admin files trademark infringement cases in the Supreme Court',
      'Admin manufactures software code in the server room',
    ],
    correctIndex: 1,
    explanation: 'HR focuses on people (recruitment, appraisal, training, payroll), whereas General Administration manages physical facilities, workstations, security access, utilities, and transport logistics.',
    hints: [
      'Remember the rule: HR = People; Administration = Physical facilities and premises.',
      'Who manages desks, security gates, cafeteria passes, and employee shuttle buses?',
      'General Administration provides the physical environment for employees to work.',
    ],
    misconceptionIndex: 1,
  },
  // 22. Construct: Indian Enterprise Complete Blueprint (Creativity - Advanced)
  {
    id: 'ch_022_construct_chain',
    nodeId: NODE_C9_COMMAPP_005,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the 4 essential pillars of a modern Indian enterprise by selecting them in logical order: Legal Form -> Primary Operation -> Support Backbone -> Sustainable Goal.',
    availableParts: [
      'Private Limited Company (Limited Liability)',
      'Automated FMCG Production & Direct Retail Trade',
      'Integrated Finance, HR & Legal Compliance',
      'Zero Liquid Discharge & 100% Renewable Energy',
      'Unlimited Personal Debt Seizure',
      'Untreated Toxic River Effluent Discharge',
    ],
    targetState: 'Private Limited Company (Limited Liability) Automated FMCG Production & Direct Retail Trade Integrated Finance, HR & Legal Compliance Zero Liquid Discharge & 100% Renewable Energy',
    validationHint: 'Select the 4 positive, compliant building blocks: Company form, Operations, Support functions, and Green sustainability.',
    explanation: 'A resilient modern enterprise incorporates as a Company for limited liability, operates efficient production/trade, relies on Finance/HR/Legal support, and operates with zero liquid discharge and renewable power.',
    hints: [
      'Choose the corporate legal form with limited liability.',
      'Add clean operations, robust support departments, and zero pollution practices.',
      'Avoid parts that mention unlimited seizure or toxic river discharge.',
    ],
  },
];

// ─── PROPS INTERFACE & DEFAULT PROPS ───
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
  nodeId: NODE_C9_COMMAPP_001,
  title: 'Basic Commercial Terms, Organisation, Sustainability & Functional Departments',
  definition: 'Commerce encompasses trade and auxiliaries to trade that facilitate the exchange of goods and services produced by industry. Commercial organisations operate under distinct ownership structures, manage functional departments, and must embrace eco-friendly industrial practices.',
  eli5: 'Think of business like a grand Indian kitchen and dining hall. Industry cooks the food, Commerce brings it to your table, Finance pays for ingredients, HR hires the staff, and eco-friendly systems ensure no waste is dumped into the nearby river!',
  misconceptions: [
    {
      misconception: 'Commerce and Business mean the exact same thing.',
      correction: 'Business is the broader umbrella: Business = Industry (production) + Commerce (exchange + auxiliaries).',
    },
    {
      misconception: 'A partnership firm and a company are identical because both have multiple owners.',
      correction: 'Partners in a firm face unlimited liability (personal assets at risk) and no separate legal entity; company shareholders have limited liability and separate legal personality.',
    },
    {
      misconception: 'Thermal pollution means the black smoke and fly ash coming out of power plant chimneys.',
      correction: 'Thermal pollution is the discharge of heated cooling water into water bodies; chimney smoke is air pollution.',
    },
    {
      misconception: 'Marketing and Sales are identical terms.',
      correction: 'Marketing creates awareness and customer demand (ads, pricing, branding); Sales converts demand into orders and revenue.',
    },
    {
      misconception: 'Non-profit organisations are banned from earning any revenue or surplus.',
      correction: 'Non-profits can generate substantial surplus; the difference is that surplus is reinvested in charitable objects rather than paid as dividends to owners.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the structural formula of Business?', options: ['Business = Trade + Banking', 'Business = Industry + Commerce', 'Business = Sales + Marketing', 'Business = Company + Firm'], correctIndex: 1 },
    { question: 'Which of the following is an Auxiliary to Trade?', options: ['Steel Rolling Mill', 'Cotton Cultivation', 'Warehousing and Insurance', 'Automobile Assembly'], correctIndex: 2 },
    { question: 'Which ownership structure grants owners limited liability?', options: ['Sole Proprietorship', 'General Partnership', 'Joint Hindu Family Karta', 'Private / Public Limited Company'], correctIndex: 3 },
    { question: 'Under the Hindu Succession Act amendment of 2005, who holds coparcenary rights?', options: ['Only the eldest son', 'Both sons and daughters by birth', 'Only male family members', 'External partners'], correctIndex: 1 },
    { question: 'What is the main cause of groundwater depletion in Punjab?', options: ['Natural evaporation', 'Extraction rate exceeding natural rainfall recharge', 'Soil erosion', 'Industrial chemical bonding'], correctIndex: 1 },
    { question: 'What device fitted in car exhausts converts toxic CO and NOx into harmless gases?', options: ['Effluent Treatment Plant', 'Electrostatic Precipitator', 'Catalytic Converter', 'Cooling Tower'], correctIndex: 2 },
    { question: 'Which document is raised by the Production department to request Stores for raw materials?', options: ['Purchase Order', 'Goods Receipt Note', 'Material Requisition Slip', 'Bill of Lading'], correctIndex: 2 },
    { question: 'Under Section 203 of Companies Act 2013, which KMP is appointed in the Finance Department?', options: ['Chief Executive Officer', 'Chief Financial Officer (CFO)', 'Company Secretary (CS)', 'Chief Human Resource Officer'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery is achieved when a student accurately distinguishes all core commercial terms, identifies liability in business ownership, resolves pollution & sustainability challenges, and maps departmental workflows.',
};

// ─── INTERACTIVE EXPLORATION STEPS (Brilliant.org Learn-by-Doing) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Business Hierarchy Simulator',
    instruction: 'Toggle between Industry and Commerce. Click sub-branches to see real Indian examples (Tata Steel vs SBI).',
    interactionType: 'tree-explore',
    nodeId: NODE_C9_COMMAPP_001,
  },
  {
    title: '2. Ownership & Liability Stress-Test',
    instruction: 'Drag the Debt Slider past initial capital to observe when personal assets (house/savings) get seized in Sole Proprietorship vs protected in a Company.',
    interactionType: 'liability-slider',
    nodeId: NODE_C9_COMMAPP_005,
  },
  {
    title: '3. Groundwater Depletion & Recharge Gauge',
    instruction: 'Adjust the Tubewell Pumping Rate slider vs Rain Recharge to see aquifer levels change in real time.',
    interactionType: 'water-balance',
    nodeId: NODE_C9_COMMAPP_006,
  },
  {
    title: '4. Eco-Factory: Zero Liquid Discharge Lab',
    instruction: 'Activate ETP and Effluent Recycling to stop river contamination and observe water purity metrics rise.',
    interactionType: 'green-factory',
    nodeId: NODE_C9_COMMAPP_008,
  },
  {
    title: '5. Corporate Department Pipeline',
    instruction: 'Click each department in sequence (Purchase → Production → Marketing → Sales → Support) to trace a packet of Amul Butter from farm to consumer.',
    interactionType: 'dept-pipeline',
    nodeId: NODE_C9_COMMAPP_009,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Commercial Audit Challenge',
  description: 'Choose any iconic Indian enterprise (e.g. Tata Motors, Amul, Asian Paints, Reliance Industries). Map out its complete 4-pillar blueprint:',
  steps: [
    '1. Identify its legal ownership form (e.g., Public Limited Company / Cooperative).',
    '2. Classify its primary industry grouping and sector (Secondary FMCG / Automotive / Textile).',
    '3. Name its key environmental initiatives (e.g., Solar rooftops, Zero Liquid Discharge, FSC wood pulp).',
    '4. Explain how its Purchase, Production, Sales, Finance, and HR departments collaborate on one flagship product.',
  ],
};

// ─── MAIN COMPONENT ───
function C9_CommerceAppBasicTermsCommerceSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commapp'] || {
    name: 'Commercial Applications',
    emoji: '🏢',
    color: 'emerald',
  };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // ─── BRILLIANT INTERACTIVE EXPLORATION STATE ───
  const [activeHierarchyTab, setActiveHierarchyTab] = useState<'industry' | 'commerce'>('industry');
  const [simDebtAmount, setSimDebtAmount] = useState(8); // in Lakhs
  const [simCapitalAmount] = useState(5); // in Lakhs
  const [simStructureType, setSimStructureType] = useState<'soleprop' | 'company'>('soleprop');
  const [pumpingRate, setPumpingRate] = useState(165); // % of recharge (Punjab benchmark)
  const [aquiferLevel, setAquiferLevel] = useState(62); // meters depth
  const [etpActive, setEtpActive] = useState(false);
  const [zldActive, setZldActive] = useState(false);
  const [solarActive, setSolarActive] = useState(false);
  const [activePipelineStep, setActivePipelineStep] = useState(0);

  // ─── PREDICTION & OBSERVATION QUESTIONS INTERACTION STATE ───
  const [activePredictionIdx, setActivePredictionIdx] = useState<number | null>(null);
  const [predictionAnswered, setPredictionAnswered] = useState<Record<number, number>>({});
  const [activeObservationIdx, setActiveObservationIdx] = useState<number | null>(null);
  const [observationAnswered, setObservationAnswered] = useState<Record<number, number>>({});

  // ─── CHALLENGE INTERACTION STATE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── DISCOVERY STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── FEEDBACK UI STATE ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT EFFECT: LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE BKT UPDATE EFFECT ───
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
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME AQUIFER SIMULATION EFFECT ───
  useEffect(() => {
    const netDeficit = pumpingRate - 100;
    const calculatedDepth = Math.min(120, Math.max(20, 50 + netDeficit * 0.4));
    setAquiferLevel(calculatedDepth);
  }, [pumpingRate]);

  // ─── 2D CANVAS ANIMATION EFFECT (Water/Emissions Flow) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particleOffset = 0;

    const render = () => {
      particleOffset += 1.5;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const isGreen = etpActive || zldActive || solarActive;
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, isGreen ? '#059669' : '#dc2626');
      grad.addColorStop(1, isGreen ? '#10b981' : '#f59e0b');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(10, canvas.height / 2);
      ctx.lineTo(canvas.width - 10, canvas.height / 2);
      ctx.stroke();

      ctx.fillStyle = isGreen ? '#a7f3d0' : '#fecaca';
      for (let x = (particleOffset % 30); x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.arc(x, canvas.height / 2, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [etpActive, zldActive, solarActive, phase]);

  // ─── AUTO-HINT INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        if (challenge?.hints?.[0]) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak(challenge.hints[0]);
        }
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, challenge]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── MEMOISED CALLBACK HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on! Let us understand the complete commercial hierarchy.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Touch and manipulate the diagrams to learn.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with business liability, aquifer recharge, and green factory systems.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for the Commercial Mastery Challenges! Read carefully and apply your knowledge.');
  }, []);

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
      speechManager.speak('Let us review the step-by-step ICSE commercial explanation.');
    }
  }, [hintCount, challenge]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
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
    setSortArrangement((prev) => {
      const initial = prev.length > 0 ? prev : [0, 1, 2, 3, 4];
      const arr = [...initial];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Commercial Applications Simulation with distinction.');
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

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
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent commercial reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
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
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDebtSliderChange = useCallback((val: number) => {
    setSimDebtAmount(val);
    audioManager.play('count');
  }, []);

  const handlePumpingSliderChange = useCallback((val: number) => {
    setPumpingRate(val);
    audioManager.play('count');
  }, []);

  const handlePipelineStepClick = useCallback((stepIndex: number) => {
    setActivePipelineStep(stepIndex);
    audioManager.play('tap');
    const speechPhrases = [
      'Purchase and Stores: Raw milk and packaging film are procured and stored safely in chilling vats.',
      'Production Department: Milk is pasteurised, separated into cream, and churned into pure Amul butter.',
      'Marketing Department: daCunha hoardings featuring the iconic Amul Girl create massive brand recall and pull.',
      'Sales Department: Distributor logistics vans deliver cartons to 13 lakh retail kirana stores across India.',
      'Corporate Support: Finance pays dairy farmers, HR trains workforce, and Legal ensures FSSAI food compliance.',
    ];
    speechManager.speak(speechPhrases[stepIndex]);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/60 border border-emerald-700/50 rounded-2xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-lg md:text-xl font-extrabold text-white tracking-wide">
              {title}
            </h1>
            <p className="text-xs text-emerald-400 font-medium">
              ICSE Class 9 Commercial Applications • 10 Curriculum Nodes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            Mastery: <strong className="text-white capitalize">{masteryLevel}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── CANVAS STATUS INDICATOR ─── */}
      <div className="my-3">
        <canvas
          ref={canvasRef}
          width={800}
          height={16}
          className="w-full h-3 rounded-full border border-slate-800 shadow-inner"
        />
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 my-4"
        >
          {/* Narrative Card */}
          <div className="p-6 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 rounded-2xl border border-emerald-700/40 shadow-xl">
            <div className="flex items-center gap-2 mb-2 text-emerald-300 font-bold text-sm tracking-wide uppercase">
              <span>🌟 Scenario Briefing</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mb-2">
              {SCENARIO.title}
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-3">
              {SCENARIO.intro}
            </p>
            <p className="text-xs md:text-sm text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              📌 {SCENARIO.context}
            </p>
          </div>

          {/* Discovery Question Box */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 shadow-lg">
            <h3 className="text-base md:text-lg font-bold text-amber-300 flex items-center gap-2">
              <span>🔍 Curiosity Hook: Before we begin...</span>
            </h3>
            <p className="text-white font-medium text-sm md:text-base">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`p-4 text-left text-sm rounded-xl border transition-all duration-200 ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700/70 text-slate-200 hover:border-emerald-500/50'
                  }`}
                >
                  <span className="font-bold text-emerald-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Brilliant start! You understand the foundational scope of Business.'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Guided Exploration"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 whitespace-nowrap"
                >
                  Enter Visual Exploration Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: BRILLIANT INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 my-4">
          {/* Step Progress Tracker */}
          <div className="flex items-center justify-between px-2">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Exploration Stage {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'w-8 bg-emerald-500' : 'w-2.5 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-5"
            >
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                  <span>{EXPLORATION_STEPS[currentSlide].title}</span>
                </h3>
                <p className="text-sm text-amber-300 mt-1 flex items-center gap-2">
                  <span>👉</span>
                  <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
                </p>
              </div>

              {/* ─── INTERACTIVE LAB 1: BUSINESS HIERARCHY SIMULATOR ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex gap-3 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setActiveHierarchyTab('industry');
                        audioManager.play('tap');
                      }}
                      className={`px-5 py-2 rounded-xl text-sm font-bold border transition-colors ${
                        activeHierarchyTab === 'industry'
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      🏭 Industry (Production Branch)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setActiveHierarchyTab('commerce');
                        audioManager.play('tap');
                      }}
                      className={`px-5 py-2 rounded-xl text-sm font-bold border transition-colors ${
                        activeHierarchyTab === 'commerce'
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/30'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      🛒 Commerce (Exchange & Support)
                    </motion.button>
                  </div>

                  {/* Dynamic Hierarchy SVG */}
                  <svg viewBox="0 0 600 240" className="w-full bg-slate-900/60 rounded-xl p-2 border border-slate-800/80">
                    <rect x="220" y="10" width="160" height="40" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <text x="300" y="35" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                      BUSINESS UMBRELLA
                    </text>

                    <path d="M 300 50 L 150 90" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M 300 50 L 450 90" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />

                    <rect
                      x="70"
                      y="90"
                      width="160"
                      height="38"
                      rx="8"
                      fill={activeHierarchyTab === 'industry' ? '#4338ca' : '#1e293b'}
                      stroke="#818cf8"
                      strokeWidth="2"
                    />
                    <text x="150" y="114" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                      1. Industry (Production)
                    </text>

                    <rect
                      x="370"
                      y="90"
                      width="160"
                      height="38"
                      rx="8"
                      fill={activeHierarchyTab === 'commerce' ? '#047857' : '#1e293b'}
                      stroke="#34d399"
                      strokeWidth="2"
                    />
                    <text x="450" y="114" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                      2. Commerce (Exchange)
                    </text>

                    {activeHierarchyTab === 'industry' ? (
                      <>
                        <path d="M 150 128 L 70 170" stroke="#818cf8" strokeWidth="2" />
                        <path d="M 150 128 L 230 170" stroke="#818cf8" strokeWidth="2" />
                        <rect x="10" y="170" width="120" height="45" rx="6" fill="#312e81" stroke="#6366f1" />
                        <text x="70" y="190" textAnchor="middle" fill="#e0e7ff" fontSize="10" fontWeight="bold">
                          Primary Extraction
                        </text>
                        <text x="70" y="204" textAnchor="middle" fill="#a5b4fc" fontSize="8.5">
                          Coal India / Farming
                        </text>

                        <rect x="170" y="170" width="120" height="45" rx="6" fill="#312e81" stroke="#6366f1" />
                        <text x="230" y="190" textAnchor="middle" fill="#e0e7ff" fontSize="10" fontWeight="bold">
                          Secondary Mfg
                        </text>
                        <text x="230" y="204" textAnchor="middle" fill="#a5b4fc" fontSize="8.5">
                          Tata Steel / Maruti
                        </text>
                      </>
                    ) : (
                      <>
                        <path d="M 450 128 L 370 170" stroke="#34d399" strokeWidth="2" />
                        <path d="M 450 128 L 530 170" stroke="#34d399" strokeWidth="2" />
                        <rect x="310" y="170" width="120" height="45" rx="6" fill="#064e3b" stroke="#10b981" />
                        <text x="370" y="190" textAnchor="middle" fill="#d1fae5" fontSize="10" fontWeight="bold">
                          Trade (Buying/Selling)
                        </text>
                        <text x="370" y="204" textAnchor="middle" fill="#6ee7b7" fontSize="8.5">
                          Wholesalers & Kiranas
                        </text>

                        <rect x="470" y="170" width="120" height="45" rx="6" fill="#064e3b" stroke="#10b981" />
                        <text x="530" y="190" textAnchor="middle" fill="#d1fae5" fontSize="10" fontWeight="bold">
                          Auxiliaries to Trade
                        </text>
                        <text x="530" y="204" textAnchor="middle" fill="#6ee7b7" fontSize="8.5">
                          SBI, Insurance, Transport
                        </text>
                      </>
                    )}
                  </svg>
                </div>
              )}

              {/* ─── INTERACTIVE LAB 2: OWNERSHIP & LIABILITY STRESS TEST ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSimStructureType('soleprop');
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold ${
                          simStructureType === 'soleprop'
                            ? 'bg-rose-700 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Sole Proprietorship (Unlimited Liability)
                      </button>
                      <button
                        onClick={() => {
                          setSimStructureType('company');
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold ${
                          simStructureType === 'company'
                            ? 'bg-emerald-700 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Private Limited Company (Limited Liability)
                      </button>
                    </div>

                    <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800/60">
                      Invested Capital: ₹{simCapitalAmount} Lakhs
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Business Debt Incurred: <strong>₹{simDebtAmount} Lakhs</strong></span>
                      <span className="text-rose-400 font-semibold">
                        Unpaid Deficit: ₹{Math.max(0, simDebtAmount - simCapitalAmount)} Lakhs
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={20}
                      value={simDebtAmount}
                      onChange={(e) => handleDebtSliderChange(Number(e.target.value))}
                      aria-label="Adjust Business Debt Amount in Lakhs"
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>

                  {/* Visual Impact Box */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Business Assets Seized
                      </h4>
                      <p className="text-2xl font-black text-amber-400">
                        ₹{Math.min(simDebtAmount, simCapitalAmount)} Lakhs
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Shop stock, cash counter & furniture</p>
                    </div>

                    <div
                      className={`p-4 rounded-xl border transition-all ${
                        simStructureType === 'soleprop' && simDebtAmount > simCapitalAmount
                          ? 'bg-rose-950/70 border-rose-600 animate-pulse'
                          : 'bg-emerald-950/40 border-emerald-700/50'
                      }`}
                    >
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                        Personal Assets Seized (House, Gold, Savings)
                      </h4>
                      <p
                        className={`text-2xl font-black ${
                          simStructureType === 'soleprop' && simDebtAmount > simCapitalAmount
                            ? 'text-rose-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {simStructureType === 'soleprop'
                          ? `₹${Math.max(0, simDebtAmount - simCapitalAmount)} Lakhs`
                          : '₹0 (Protected by Corporate Veil)'}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {simStructureType === 'soleprop'
                          ? '⚠️ Unlimited Liability: Court can attach private home'
                          : '🛡️ Limited Liability: Shareholder personal assets cannot be touched'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── INTERACTIVE LAB 3: WATER AQUIFER DEPLETION SIMULATOR ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">
                      Tubewell Extraction Rate: <strong className="text-cyan-400">{pumpingRate}% of Recharge</strong>
                    </span>
                    <span className="text-amber-400 font-bold bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
                      Punjab CGWB Benchmark: 165%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={250}
                    value={pumpingRate}
                    onChange={(e) => handlePumpingSliderChange(Number(e.target.value))}
                    aria-label="Set Pumping Extraction Rate as percentage of recharge"
                    className="w-full accent-cyan-500 cursor-pointer"
                  />

                  <svg viewBox="0 0 500 180" className="w-full bg-slate-900 rounded-xl p-2 border border-slate-800">
                    <rect x="20" y="10" width="460" height="30" rx="4" fill="#78350f" />
                    <text x="40" y="30" fill="#fef3c7" fontSize="11" fontWeight="bold">
                      Topsoil / Crop Cultivation Layer (Paddy Fields)
                    </text>

                    <rect x="240" y="30" width="12" height="120" fill="#64748b" stroke="#cbd5e1" strokeWidth="1" />
                    <circle cx="246" cy="145" r="8" fill="#38bdf8" />

                    <rect
                      x="20"
                      y={45 + aquiferLevel * 0.7}
                      width="460"
                      height={120 - aquiferLevel * 0.7}
                      fill="#0284c7"
                      opacity="0.8"
                    />

                    <line
                      x1="20"
                      y1={45 + aquiferLevel * 0.7}
                      x2="480"
                      y2={45 + aquiferLevel * 0.7}
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                    />
                    <text
                      x="320"
                      y={40 + aquiferLevel * 0.7}
                      fill="#38bdf8"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      Water Table Depth: {aquiferLevel.toFixed(1)} m
                    </text>
                  </svg>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                    {pumpingRate > 100 ? (
                      <span className="text-rose-400 font-semibold">
                        ❌ Depletion Active: Water extraction exceeds natural rainfall percolation. Aquifer is sinking at ~1 meter/year.
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-semibold">
                        ✓ Sustainable Aquifer State: Extraction is within natural recharge capacity.
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* ─── INTERACTIVE LAB 4: ZERO LIQUID DISCHARGE & GREEN FACTORY ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setEtpActive((prev) => !prev);
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                        etpActive
                          ? 'bg-emerald-600 text-white border-emerald-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {etpActive ? '✓ ETP Plant Active' : '+ Activate Effluent Treatment (ETP)'}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setZldActive((prev) => !prev);
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                        zldActive
                          ? 'bg-cyan-600 text-white border-cyan-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {zldActive ? '✓ ZLD 100% Water Recirculation' : '+ Turn on Zero Liquid Discharge (ZLD)'}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSolarActive((prev) => !prev);
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                        solarActive
                          ? 'bg-amber-600 text-white border-amber-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {solarActive ? '✓ Rooftop Solar Grid Active' : '+ Switch to Rooftop Solar'}
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <p className="text-xs text-slate-400 uppercase font-semibold">Tannery River Discharge</p>
                      <p className={`text-xl font-extrabold mt-1 ${zldActive ? 'text-emerald-400' : 'text-rose-500'}`}>
                        {zldActive ? '0.0 mg/L' : etpActive ? '45 mg/L (Treated)' : '420 mg/L (Crude Toxic)'}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Discharge to Subarnarekha/Ganga</p>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <p className="text-xs text-slate-400 uppercase font-semibold">Water Recirculation</p>
                      <p className={`text-xl font-extrabold mt-1 ${zldActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                        {zldActive ? '100% Closed Loop' : etpActive ? '35% Recycled' : '0% Recycled'}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Tata Steel & ITC Benchmark</p>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <p className="text-xs text-slate-400 uppercase font-semibold">Boiler Carbon Footprint</p>
                      <p className={`text-xl font-extrabold mt-1 ${solarActive ? 'text-emerald-400' : 'text-amber-500'}`}>
                        {solarActive ? '-85% Clean Solar' : '100% Coal Emissions'}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Maruti Manesar 26MW Solar Model</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── INTERACTIVE LAB 5: AMUL PRODUCT PIPELINE ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['1. Purchase & Stores', '2. Production', '3. Marketing', '4. Sales & Retail', '5. Support Hub'].map(
                      (stepName, i) => (
                        <button
                          key={i}
                          onClick={() => handlePipelineStepClick(i)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            activePipelineStep === i
                              ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-600/30'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {stepName}
                        </button>
                      )
                    )}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <span>🏷️ Department Action Spotlight:</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {activePipelineStep === 0 &&
                        'Purchase & Stores: Purchases raw milk from 36 lakh Gujarat farmers, manages chilling centres, and inspects quality with Goods Receipt Notes.'}
                      {activePipelineStep === 1 &&
                        'Production Department: Pasteurises milk, separates cream, churns butter, adds salt, and packs it into 100g/500g tetra-packs at 84 dairy plants.'}
                      {activePipelineStep === 2 &&
                        'Marketing Department: Designs the iconic Amul Girl topical billboard campaigns (by daCunha since 1967) to maintain market demand and recall.'}
                      {activePipelineStep === 3 &&
                        'Sales Department: Dispatches butter cartons across refrigerated vans to supply 13 lakh retail stores across India, managing invoices.'}
                      {activePipelineStep === 4 &&
                        'Finance, HR & Legal: Finance disburses milk payouts, HR trains dairy operators, and Legal maintains FSSAI quality registrations.'}
                    </p>
                  </div>
                </div>
              )}

              {/* ─── PREDICTION & OBSERVATION CHECKS INSIDE EXPLORATION ─── */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
                    💡 Predict & Notice Verification Checks
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Prediction Question Widget */}
                  {PREDICTION_QUESTIONS.slice(0, 2).map((pq, pIdx) => (
                    <div key={pq.id} className="p-4 bg-slate-950/80 rounded-xl border border-indigo-900/60 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase">
                        <span>🎯 Prediction {pIdx + 1}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-200">{pq.question}</p>
                      
                      <div className="space-y-1.5">
                        {pq.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => {
                              setPredictionAnswered((prev) => ({ ...prev, [pIdx]: oIdx }));
                              audioManager.play(oIdx === pq.correctIndex ? 'success' : 'pop');
                            }}
                            className={`w-full text-left p-2 rounded-lg text-xs border transition-all ${
                              predictionAnswered[pIdx] !== undefined
                                ? oIdx === pq.correctIndex
                                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                                  : predictionAnswered[pIdx] === oIdx
                                  ? 'bg-rose-950/50 border-rose-500 text-rose-200'
                                  : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="font-bold text-indigo-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                            {opt}
                          </button>
                        ))}
                      </div>

                      {predictionAnswered[pIdx] !== undefined && (
                        <div className="p-2.5 bg-indigo-950/40 rounded-lg border border-indigo-800/40 text-[11px] text-indigo-200 space-y-1">
                          <p><strong className="text-amber-300">How to Verify:</strong> {pq.verifyInstruction}</p>
                          <p className="text-slate-400">{pq.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Observation Question Widget */}
                  {OBSERVATION_QUESTIONS.slice(0, 2).map((oq, oIdx) => (
                    <div key={oq.id} className="p-4 bg-slate-950/80 rounded-xl border border-emerald-900/60 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase">
                        <span>👁️ Observation {oIdx + 1}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-200">{oq.question}</p>
                      
                      <div className="space-y-1.5">
                        {oq.observableOptions.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => {
                              setObservationAnswered((prev) => ({ ...prev, [oIdx]: optIdx }));
                              audioManager.play(optIdx === oq.correctIndex ? 'success' : 'pop');
                            }}
                            className={`w-full text-left p-2 rounded-lg text-xs border transition-all ${
                              observationAnswered[oIdx] !== undefined
                                ? optIdx === oq.correctIndex
                                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                                  : observationAnswered[oIdx] === optIdx
                                  ? 'bg-rose-950/50 border-rose-500 text-rose-200'
                                  : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="font-bold text-emerald-400 mr-1.5">{String.fromCharCode(65 + optIdx)}.</span>
                            {opt}
                          </button>
                        ))}
                      </div>

                      {observationAnswered[oIdx] !== undefined && (
                        <div className="p-2.5 bg-emerald-950/40 rounded-lg border border-emerald-800/40 text-[11px] text-emerald-200">
                          <p><strong className="text-emerald-300">Key Insight:</strong> {oq.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide((s) => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs text-slate-500 font-medium">
                  Use labs to explore before challenge mode
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide((s) => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX (No Pressure Free Play) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5 my-4">
          <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-900/90 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-black text-emerald-300">🎮 Free Play Enterprise Sandbox</h3>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Test any combination freely! Balance debt risk, simulate aquifer stress, and activate green factory controls without scoring penalties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                1. Entity Liability Risk Tester
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setSimStructureType('soleprop')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    simStructureType === 'soleprop' ? 'bg-rose-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Sole Proprietorship
                </button>
                <button
                  onClick={() => setSimStructureType('company')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    simStructureType === 'company' ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Private Ltd Company
                </button>
              </div>
              <label className="text-xs text-slate-400 block">
                Total Debt: ₹{simDebtAmount} Lakhs (Capital: ₹5 Lakhs)
              </label>
              <input
                type="range"
                min={2}
                max={25}
                value={simDebtAmount}
                onChange={(e) => setSimDebtAmount(Number(e.target.value))}
                aria-label="Set sandbox debt in Lakhs"
                className="w-full accent-rose-500"
              />
              <p className="text-xs text-slate-300">
                Personal House Seizure Risk:{' '}
                <strong className={simStructureType === 'soleprop' && simDebtAmount > 5 ? 'text-rose-400' : 'text-emerald-400'}>
                  {simStructureType === 'soleprop' && simDebtAmount > 5
                    ? `₹${simDebtAmount - 5} Lakhs Seizable`
                    : '₹0 (Safe)'}
                </strong>
              </p>
            </div>

            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                2. Environmental Compliance Switchboard
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setZldActive(!zldActive)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    zldActive ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  ZLD Water Loop {zldActive ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={() => setSolarActive(!solarActive)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    solarActive ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Solar Power {solarActive ? 'ON' : 'OFF'}
                </button>
              </div>
              <label className="text-xs text-slate-400 block">Groundwater Extraction: {pumpingRate}%</label>
              <input
                type="range"
                min={50}
                max={250}
                value={pumpingRate}
                onChange={(e) => setPumpingRate(Number(e.target.value))}
                aria-label="Set sandbox extraction rate"
                className="w-full accent-cyan-500"
              />
              <p className="text-xs text-slate-300">
                Water Table Status:{' '}
                <strong className={pumpingRate > 100 ? 'text-rose-400' : 'text-emerald-400'}>
                  {pumpingRate > 100 ? 'Depletion Zone' : 'Recharge Balanced'}
                </strong>
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Proceed to graded mastery challenges"
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white font-black rounded-2xl shadow-xl shadow-emerald-600/30 text-sm tracking-wide"
            >
              Ready for Graded Challenges! 🎯 →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE MODE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 my-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/70 px-2.5 py-1 rounded-lg border border-emerald-800/60">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-xs text-slate-400">
                Competency: <strong className="text-slate-200 capitalize">{challenge.competencyLevel}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Score: <strong className="text-emerald-400">{scoreBreakdown.correct}</strong>/{scoreBreakdown.total}</span>
            </div>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500"
              animate={{
                width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
              }}
            />
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-colors duration-300 ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800/40">
                {challenge.nodeId}
              </span>
              <span className="text-xs text-slate-400">• {challenge.type.toUpperCase()}</span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {challenge.question}
            </h3>

            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all duration-200 ${
                        showExplanation
                          ? i === challenge.correctIndex
                            ? 'bg-emerald-900/60 border-emerald-500 text-emerald-100 font-semibold'
                            : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-50'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:border-emerald-500/50'
                      }`}
                    >
                      <span className="font-bold text-emerald-400 mr-2.5">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag these labels into the diagram slots:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3.5 py-2 bg-emerald-700 text-white rounded-lg cursor-grab text-xs font-bold shadow-md shadow-emerald-800/40 active:cursor-grabbing"
                    >
                      🖐️ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[70px] transition-colors ${
                        droppedLabels[item.targetId]
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                          : 'border-slate-700 bg-slate-900/50 text-slate-400'
                      }`}
                    >
                      <span className="text-[11px] font-semibold text-slate-400 uppercase">Target: {item.targetId}</span>
                      <strong className="text-xs text-white mt-1">
                        {droppedLabels[item.targetId] || 'Drop Label Here'}
                      </strong>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < challenge.dragItems.length}
                  aria-label="Submit Drag and Drop Answer"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs"
                >
                  Verify All Slots →
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder steps into correct operational sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => handleDragStart(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                        setDraggedItem(null);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      aria-label={`Sortable item: ${item}`}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab active:cursor-grabbing flex items-center justify-between"
                    >
                      <span>{item}</span>
                      <span className="text-slate-500 font-bold text-xs">☰ Drag</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const finalOrder =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(finalOrder);
                  }}
                  disabled={showExplanation}
                  aria-label="Submit Ordered List"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
                >
                  Confirm Sequence →
                </motion.button>
              </div>
            )}

            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    aria-label="Enter numeric value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 w-48"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numerical answer"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs"
                  >
                    Check Number →
                  </motion.button>
                </div>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      aria-label={`Add part: ${part}`}
                      className="px-3 py-1.5 bg-indigo-900/70 hover:bg-indigo-800 text-indigo-200 rounded-lg text-xs border border-indigo-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-emerald-900/60 text-emerald-200 border border-emerald-600 rounded-lg text-xs flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                        aria-label="Remove part"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">Click components above to build your answer</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Validate construct configuration"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs"
                >
                  Validate Configuration →
                </motion.button>
              </div>
            )}
          </motion.div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-900 rounded-2xl border border-amber-600/40 shadow-xl space-y-3"
            >
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <span>📖 ICSE Standard Explanation & Key Takeaway:</span>
              </div>

              {challenge.explanation
                .split('. ')
                .filter((s) => s.trim().length > 0)
                .slice(0, revealedSteps + 1)
                .map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs md:text-sm text-amber-100/90 leading-relaxed"
                  >
                    <strong className="text-amber-400 mr-1.5">{idx + 1}.</strong>
                    {sentence}
                    {!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {revealedSteps <
                challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setRevealedSteps((s) => s + 1);
                      audioManager.play('tap');
                    }}
                    aria-label="Reveal next explanation sentence"
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-xl text-xs"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label="Advance to Next Challenge"
                    className="px-7 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Finalise Results & Blueprint →'
                      : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD REPORT ─── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6 my-4"
        >
          {/* Hero Mastery Banner */}
          <div className="p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-2xl border border-emerald-600/50 shadow-2xl text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Commercial Applications Simulation Complete!
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto">
              You have successfully analyzed all 10 ICSE Commercial Applications syllabus nodes, balancing production, corporate governance, environmental laws, and support workflows.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <div className="px-5 py-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Precision Score</span>
                <strong className="text-xl text-emerald-400 font-black">
                  {Math.max(0, 100 - errors * 4)}%
                </strong>
              </div>
              <div className="px-5 py-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Calculated Mastery Tier</span>
                <strong className="text-xl text-cyan-400 font-black capitalize">
                  {masteryLevel}
                </strong>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-2">
              Motivational Feedback
            </h3>
            <p className="text-xl font-extrabold text-white mb-1">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {errors === 0
                ? 'You demonstrated flawless comprehension of business structures, environmental sustainability, and corporate departments.'
                : errors <= 3
                ? 'You have a solid grasp of commercial principles. Keep practicing to achieve a perfect 100% score!'
                : errors <= 7
                ? 'You are making good progress on foundational commercial concepts. Review the explanations to strengthen tricky areas.'
                : 'Commerce vocabulary and legal structures take practice to master. Review the labs and try again!'}
            </p>
          </div>

          {/* Reflection Section */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 shadow-lg">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span>🤔 Reflection</span>
            </h3>
            <p className="text-xs text-slate-400">
              Deepen your understanding by pondering these reflection questions:
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <p className="text-xs font-semibold text-emerald-400 mb-1">Question 1</p>
                <p className="text-sm text-slate-200 font-medium">What was the most surprising thing you learned?</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <p className="text-xs font-semibold text-emerald-400 mb-1">Question 2</p>
                <p className="text-sm text-slate-200 font-medium">How would you explain this to a friend?</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <p className="text-xs font-semibold text-emerald-400 mb-1">Question 3</p>
                <p className="text-sm text-slate-200 font-medium">Where in real life might you use this?</p>
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                ⚠️ Your Targeted Conceptual Corrections:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const item = misconceptions[idx];
                  if (!item) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-bold">❌ Misconception: {item.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ ICSE Correction: {item.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Notice */}
          <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 flex items-center gap-4">
            <span className="text-2xl">📅</span>
            <div>
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Spaced Repetition Review Schedule
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Based on your BKT score, your next spaced revision is recommended in{' '}
                <strong className="text-amber-400 font-bold">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                </strong>{' '}
                to ensure long-term memory retention for the CISCE 2026 Examination.
              </p>
            </div>
          </div>

          {/* Real World Activity Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>🚀 {REAL_WORLD_ACTIVITY.title}</span>
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              {REAL_WORLD_ACTIVITY.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_CommerceAppBasicTermsCommerceSim;
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// ─── NODE ID CONSTANTS (ALL 10 MANDATORY NODES) ───
const NODE_C12_COMM_001 = 'c12_comm_001';
const NODE_C12_COMM_002 = 'c12_comm_002';
const NODE_C12_COMM_003 = 'c12_comm_003';
const NODE_C12_COMM_004 = 'c12_comm_004';
const NODE_C12_COMM_005 = 'c12_comm_005';
const NODE_C12_COMM_006 = 'c12_comm_006';
const NODE_C12_COMM_007 = 'c12_comm_007';
const NODE_C12_COMM_008 = 'c12_comm_008';
const NODE_C12_COMM_009 = 'c12_comm_009';
const NODE_C12_COMM_010 = 'c12_comm_010';

const ALL_NODE_IDS = [
  NODE_C12_COMM_001,
  NODE_C12_COMM_002,
  NODE_C12_COMM_003,
  NODE_C12_COMM_004,
  NODE_C12_COMM_005,
  NODE_C12_COMM_006,
  NODE_C12_COMM_007,
  NODE_C12_COMM_008,
  NODE_C12_COMM_009,
  NODE_C12_COMM_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'AutoCraft Motors: Navigating India’s EV Disruption',
  intro: 'You have been appointed Chief Strategy Officer of AutoCraft India, a legacy automobile titan in Pune. Overnight, the government shifts GST on electric vehicles to 5% while hiking SUV cess to 22%, lithium prices fluctuate, UPI fuels quick digital bookings, and factory unions demand fair scientific wage standards.',
  context: 'To survive and lead, you must scan the internal and external forces, run an authentic SWOT matrix, align top-to-shopfloor management tiers, and balance Taylor’s scientific speed with Fayol’s administrative principles.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'AutoCraft India faces a 22% GST Cess hike on fossil SUVs and a new NGT pollution order, while its own plant workers seek better shift scheduling. Is the "Business Environment" ONLY the external government & market pressures?',
  options: [
    'Yes — business environment strictly refers to uncontrollable outside market forces.',
    'No — according to the ISC syllabus, it is the sum total of BOTH internal (culture, resources) and external forces.',
    'Only government laws and court orders constitute the business environment.',
    'It only includes financial market indices like NIFTY and repo rate.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Internal factors (like employee skills, corporate culture, and management structure) are equally part of the total business environment!',
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
  bloomLevel?: string;
}

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c12_comm_001)
  {
    id: 'ch_01_feat',
    nodeId: NODE_C12_COMM_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is NOT one of the 5 core features of the business environment prescribed in the ISC curriculum?',
    options: [
      'Totality of internal and external forces',
      'Dynamic nature and continuous change',
      'Absolute predictability and total management control',
      'Inter-relatedness of socio-economic factors',
    ],
    correctIndex: 2,
    explanation: 'The business environment is inherently complex, dynamic, and uncertain. No enterprise has absolute predictability or total control over its surroundings.',
    hints: [
      'Think about whether a company can 100% control everything that happens around it.',
      'Remember features: totality, specific/general, inter-relatedness, dynamic, complexity & uncertainty.',
      'Absolute control and predictability contradicts the very concept of uncertainty and dynamism.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation - Understanding (c12_comm_002)
  {
    id: 'ch_02_scan',
    nodeId: NODE_C12_COMM_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does "Environmental Scanning" differ from casually reading the morning financial newspaper?',
    options: [
      'It is identical; reading the business page is considered formal environmental scanning.',
      'It is a structured, continuous organisational process with designated teams, defined sources, and documented strategy reports.',
      'Scanning only looks at competitors secret emails via undercover operations.',
      'Scanning only happens once every 10 years during company incorporation.',
    ],
    correctIndex: 1,
    explanation: 'Environmental scanning is a structured, institutionalised process involving monitoring, evaluating, and disseminating decision-critical intelligence (e.g. ITC E-Choupal network).',
    hints: [
      'Look for the option highlighting continuous organisational structure and documented reporting.',
      'Casual reading lacks designated responsibility, source lists, and formal dissemination.',
      'Scanning must be systematic, continuous, and strategy-focused.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Drag Label (c12_comm_008)
  {
    id: 'ch_03_levels_drag',
    nodeId: NODE_C12_COMM_008,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each managerial designation to its correct tier in the 3-tier Management Pyramid.',
    dragItems: [
      { label: 'Board of Directors & CEO', targetId: 'level_top' },
      { label: 'Plant Head & Regional Sales Head', targetId: 'level_middle' },
      { label: 'Assembly Line Shift Supervisor', targetId: 'level_lower' },
    ],
    correctMapping: {
      level_top: 'Board of Directors & CEO',
      level_middle: 'Plant Head & Regional Sales Head',
      level_lower: 'Assembly Line Shift Supervisor',
    },
    explanation: 'Top management (Apex) handles 5-20 year strategy; Middle management translates strategy into departmental tactical plans; Lower/Supervisory directly oversees shopfloor workers.',
    hints: [
      'The CEO and Board sit at the highest apex of the company.',
      'Plant heads and departmental managers form the tactical middle bridge.',
      'Shift supervisors work directly at the shopfloor base.',
    ],
  },
  // 4. Foundation - Match (c12_comm_003)
  {
    id: 'ch_04_int_factors',
    nodeId: NODE_C12_COMM_003,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the ISC syllabus, which factor is an INTERNAL (largely controllable) component of the business environment?',
    options: [
      'Corporate Culture and Value Systems',
      'Reserve Bank of India Monetary Repo Rate',
      'Central Goods and Services Tax (CGST) Act',
      'Global Brent Crude Oil Prices',
    ],
    correctIndex: 0,
    explanation: 'Corporate culture, mission, objectives, structure, employee skills, and internal resources originate inside the enterprise and are controllable by leadership.',
    hints: [
      'Ask yourself: Which of these four can the board of directors directly reform internally?',
      'RBI repo rates, GST acts, and global crude are all external forces.',
      'Corporate culture is built and nurtured inside the firm.',
    ],
    misconceptionIndex: 0,
  },
  // 5. Foundation - Recall (c12_comm_009)
  {
    id: 'ch_05_taylor_recall',
    nodeId: NODE_C12_COMM_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who is recognised as the father of Scientific Management and personally consulted at Tata Steel Jamshedpur in 1912?',
    options: ['Henri Fayol', 'Frederick Winslow Taylor', 'Peter Drucker', 'Elton Mayo'],
    correctIndex: 1,
    explanation: 'F.W. Taylor authored "The Principles of Scientific Management" (1911) and introduced time-motion studies, standardisation, and differential piece rates.',
    hints: [
      'He was an American mechanical engineer who introduced stopwatch time studies.',
      'Fayol was a French mining engineer focusing on administrative top management.',
      'The pioneer of scientific shopfloor task setting is F.W. Taylor.',
    ],
  },
  // 6. Foundation - Drag Sort (c12_comm_007)
  {
    id: 'ch_06_process_sort',
    nodeId: NODE_C12_COMM_007,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 5 core management process functions in their classical sequential cycle.',
    sortItems: ['Planning', 'Organising', 'Staffing', 'Directing', 'Controlling'],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Management as a process follows the continuous cycle: Planning (setting goals) → Organising (structuring) → Staffing (recruiting) → Directing (guiding) → Controlling (verifying against targets).',
    hints: [
      'You must first decide what to do (Plan) before structuring resources (Organise).',
      'Staffing brings people in, Directing guides them, and Controlling checks output.',
      'Control feeds right back into the next round of Planning.',
    ],
  },
  // 7. Foundation - Understanding (c12_comm_010)
  {
    id: 'ch_07_fayol_command',
    nodeId: NODE_C12_COMM_010,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Fayol’s "Unity of Command" principle mandates that:',
    options: [
      'All departments in the company must follow one universal 10-year master plan.',
      'Each employee should receive orders from and be accountable to ONLY ONE direct superior.',
      'All workers across all factories must receive the exact same monthly wage.',
      'Authority must be 100% concentrated at the top managing director level.',
    ],
    correctIndex: 1,
    explanation: 'Unity of Command is an individual reporting principle: one employee, one boss. This avoids conflicting instructions and dual subordination.',
    hints: [
      'Distinguish Unity of Command (one employee, one boss) from Unity of Direction (one department, one plan).',
      'Command refers to the immediate chain of orders to an individual.',
      'It prevents an employee from being torn between two conflicting managers.',
    ],
    misconceptionIndex: 2,
  },
  // 8. Standard - Application (c12_comm_004)
  {
    id: 'ch_08_pest_app',
    nodeId: NODE_C12_COMM_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Dabur India witnessed an 80% volume jump in Chyawanprash sales during COVID-19 as Indian households embraced Ayurvedic preventive immunity. Which external factor drove this boom?',
    options: ['Political factor', 'Economic factor', 'Social factor', 'Technological factor'],
    correctIndex: 2,
    explanation: 'Shifts in health-consciousness, lifestyle preferences, and cultural consumption values represent the Social external environment.',
    hints: [
      'Ask: Did this originate from a new tax law, an RBI repo cut, or changing consumer lifestyle & health values?',
      'Consumer attitudes, family health priorities, and wellness habits are social forces.',
      'Societal value shifts alter what consumers demand.',
    ],
  },
  // 9. Standard - Analysis (c12_comm_006)
  {
    id: 'ch_09_swot_classify',
    nodeId: NODE_C12_COMM_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'AutoCraft owns a cutting-edge proprietary robotic welding platform (patented), but faces a sudden 20% spike in global imported battery-cell tariffs. How are these classified in a SWOT matrix?',
    options: [
      'Robotic platform = Opportunity; Battery tariff = Weakness',
      'Robotic platform = Strength; Battery tariff = Threat',
      'Robotic platform = Strength; Battery tariff = Weakness',
      'Robotic platform = Opportunity; Battery tariff = Threat',
    ],
    correctIndex: 1,
    explanation: 'The patented robotic platform is internal and owned (Strength). The import tariff hike is external and uncontrollable by AutoCraft (Threat).',
    hints: [
      'Apply the controllability test: Does the company own and control it internally?',
      'Patented internal tech = Strength. External customs tariff = Threat.',
      'Internal = S/W; External = O/T.',
    ],
    misconceptionIndex: 0,
  },
  // 10. Standard - Numeric Calculation (c12_comm_003)
  {
    id: 'ch_10_csr_calc',
    nodeId: NODE_C12_COMM_003,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under Section 135 of the Companies Act 2013, AutoCraft’s average net profit over the past 3 financial years was ₹350 Crore. What is its mandatory minimum annual CSR expenditure in Crores?',
    correctAnswer: 7,
    tolerance: 0.1,
    unit: 'Crore ₹',
    explanation: 'Section 135 mandates that qualifying companies spend at least 2% of their 3-year average net profit on CSR. 2% of ₹350 Cr = ₹7.00 Crore.',
    hints: [
      'Recall the statutory CSR percentage under Section 135 of Companies Act 2013.',
      'Calculate 2% of ₹350 Crore.',
      '350 × 0.02 = 7.00 Crore.',
    ],
  },
  // 11. Standard - Application (c12_comm_005)
  {
    id: 'ch_11_legal_classify',
    nodeId: NODE_C12_COMM_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The Central Consumer Protection Authority (CCPA) penalised a competitor ₹10 Lakh under Consumer Protection Act 2019 for misleading EV range claims. This force belongs to the:',
    options: [
      'Economic Environment (because money is involved in the fine)',
      'Legal Environment (because it enforces statutory provisions enacted by Parliament)',
      'Social Environment (because consumers watch TV advertisements)',
      'Internal Corporate Culture (because marketing designed the ad)',
    ],
    correctIndex: 1,
    explanation: 'Classification follows the SOURCE of the force, not the financial consequence. Enforceable statutory orders and fines from CCPA represent the Legal environment.',
    hints: [
      'Focus on the source of the force: Consumer Protection Act 2019 and CCPA statutory tribunal.',
      'Even though fines involve money, the source is statutory legislation.',
      'Legal forces stem from Acts of Parliament, court orders, and regulatory commissions.',
    ],
    misconceptionIndex: 0,
  },
  // 12. Standard - Analysis (c12_comm_010)
  {
    id: 'ch_12_direction_vs_command',
    nodeId: NODE_C12_COMM_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'TCS places all banking sector software solutions under one BFSI Vertical Head with a unified annual expansion plan. Which Fayol principle is demonstrated?',
    options: [
      'Unity of Command (individual employee has one direct supervisor)',
      'Unity of Direction (one head and one unified plan for a group of activities sharing the same objective)',
      'Scalar Chain (line of formal authority)',
      'Espirit de Corps (team spirit in a sports club)',
    ],
    correctIndex: 1,
    explanation: 'Unity of Direction is a departmental-level principle: one head and one plan for operations having the same objective. Unity of Command is strictly individual-level.',
    hints: [
      'Notice the level: Is it a single coder reporting to a team lead, or an entire vertical under one head & plan?',
      'Departmental alignment with one head and one plan = Unity of Direction.',
      'Unity of Direction coordinates functional departments; Unity of Command prevents dual subordination.',
    ],
    misconceptionIndex: 2,
  },
  // 13. Standard - Application (c12_comm_009)
  {
    id: 'ch_13_taylor_std',
    nodeId: NODE_C12_COMM_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In 1968, Asian Paints analysed every mixing and pigment dissolution step with batch cards and timers, slashing batch completion time by 40%. Which Taylor principle was applied?',
    options: [
      'Rule of Thumb and traditional intuition',
      'Science, not Rule of Thumb (scientific task setting & standardisation)',
      'Centralisation of all manual labour',
      'Maximum restriction of factory output',
    ],
    correctIndex: 1,
    explanation: 'Asian Paints replaced guesswork and traditional worker habits with systematic time-motion studies and standard batch cards: "Science, not rule of thumb."',
    hints: [
      'Look for the principle that replaces guesswork and tradition with stopwatch data and standardisation.',
      'Taylor advocated replacing rule of thumb with scientific investigation.',
      'Standardising the best method via data = Science, not Rule of Thumb.',
    ],
  },
  // 14. Standard - Construct (c12_comm_007)
  {
    id: 'ch_14_mgt_construct',
    nodeId: NODE_C12_COMM_007,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the comprehensive definition of Management by selecting the essential core components in logical order.',
    availableParts: [
      'Process of getting things done',
      'through and with others',
      'effectively and efficiently',
      'to achieve organisational goals',
    ],
    targetState: 'Process of getting things done through and with others effectively and efficiently to achieve organisational goals',
    validationHint: 'Combine: (1) Process... (2) through and with... (3) effectively and... (4) to achieve...',
    explanation: 'Management is the process of getting things done through and with others, effectively and efficiently, to achieve predetermined organisational goals.',
    hints: [
      'Start with the nature (Process of getting things done).',
      'Add the human dimension (through and with others).',
      'Include the dual criteria (effectively and efficiently) and the purpose (to achieve goals).',
    ],
  },
  // 15. Advanced - Evaluation (c12_comm_001)
  {
    id: 'ch_15_interrelatedness',
    nodeId: NODE_C12_COMM_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When Tata Motors launched the Nexon EV, FAME-II subsidies (Legal/Political) interacted with surging lithium carbonate prices (Economic) and sparse charging points (Technological). This proves which environmental feature?',
    options: [
      'Static isolation of business units',
      'Inter-relatedness: forces do not act in isolation but form a coupled dynamic system',
      'Unilateral authority of corporate boards',
      'Singular dominance of internal corporate culture',
    ],
    correctIndex: 1,
    explanation: 'Inter-relatedness means environmental forces are intricately coupled: legal policy affects economic input costs, which interact with technological infrastructure.',
    hints: [
      'Observe how 3 distinct forces (legal subsidy, economic commodity price, tech infrastructure) collided simultaneously.',
      'They do not occur in separate watertight compartments.',
      'The coupling of disparate external forces is termed Inter-relatedness.',
    ],
  },
  // 16. Advanced - Analysis (c12_comm_003)
  {
    id: 'ch_16_satyam_eval',
    nodeId: NODE_C12_COMM_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In the 2009 Satyam collapse, all Indian IT firms faced the same US recession, yet only Satyam failed due to promoter override of audit controls. This proves that:',
    options: [
      'External economic forces determine 100% of business outcomes.',
      'The internal factor (defective management structure and governance culture) was the primary vulnerability exposed by the external crisis.',
      'Indian IT is inherently non-viable.',
      'Companies Act 2013 was already in force in 2009.',
    ],
    correctIndex: 1,
    explanation: 'When identical external conditions impact an entire sector but only one firm collapses, the root failure lies in internal factors (management structure, ethics, controls).',
    hints: [
      'Why did Infosys and TCS survive the same 2008-09 global crisis while Satyam collapsed?',
      'The differentiator was internal governance structure and promoter override.',
      'External shocks expose internal structural weaknesses.',
    ],
  },
  // 17. Advanced - Evaluation (c12_comm_009)
  {
    id: 'ch_17_taylor_ethic',
    nodeId: NODE_C12_COMM_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'The 2005 strike at Honda Motorcycle Gurgaon occurred when workers protested rigid stopwatch time targets. How does ethical scientific management resolve this friction?',
    options: [
      'By deploying police forces and abolishing all wage incentives.',
      'By implementing Taylor’s "Mental Revolution" & 4th principle (development of each worker to greatest efficiency) alongside Factories Act 1948 safety limits.',
      'By reverting 100% to unscientific rule-of-thumb guesswork.',
      'By firing all human workers and replacing them immediately with imports.',
    ],
    correctIndex: 1,
    explanation: 'Taylor insisted that technical tools (time study) without the prerequisite "Mental Revolution" (mutual trust & worker training) cause conflict. Legal safeguards under Factories Act 1948 guarantee safe hours and rest.',
    hints: [
      'Scientific management without the Mental Revolution becomes mechanical exploitation.',
      'Look for the option combining the Mental Revolution, worker development, and Factories Act safeguards.',
      'Efficiency must coexist with human dignity and statutory welfare.',
    ],
  },
  // 18. Advanced - Creativity (c12_comm_006)
  {
    id: 'ch_18_swot_strategy',
    nodeId: NODE_C12_COMM_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'AutoCraft has an established nationwide dealership network (Strength) and notices rising rural demand for low-maintenance commercial electric 3-wheelers (Opportunity). What strategic move best leverages this SO intersection?',
    options: [
      'Shut down the rural dealership network to cut operating costs.',
      'Launch an affordable electric 3-wheeler distributed through existing rural dealer touchpoints (SO Growth Strategy).',
      'Wait for competitors to capture the rural EV market before making any product decisions.',
      'Petition the government to ban all electric vehicles in rural areas.',
    ],
    correctIndex: 1,
    explanation: 'An SO strategy harnesses an internal Strength (existing dealer network) to directly seize an emerging external Opportunity (rural commercial EV demand).',
    hints: [
      'SO strategy = Match an internal Strength with an external Opportunity.',
      'How can AutoCraft use its existing dealer network to capture the rural EV demand?',
      'Utilising existing distribution to roll out targeted new EV models is the classic aggressive SO move.',
    ],
  },
  // 19. Advanced - Application (c12_comm_010)
  {
    id: 'ch_19_gangplank',
    nodeId: NODE_C12_COMM_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'During a critical supply bottleneck, AutoCraft’s Purchase Officer directly coordinates with the Production Engineer at the same level without routing files through the MD. Fayol termed this bridge:',
    options: ['Scalar Break', 'Gang Plank (within the Scalar Chain)', 'Espirit Disruption', 'Dual Subordination'],
    correctIndex: 1,
    explanation: 'Fayol’s "Gang Plank" allows cross-communication between peers at the same organisational tier in emergencies, preventing fatal delays in the formal Scalar Chain.',
    hints: [
      'Fayol created an exception to the formal ladder for horizontal lateral communication.',
      'It is a direct plank connecting two points across the hierarchy.',
      'The term is Gang Plank.',
    ],
  },
  // 20. Advanced - Evaluation (c12_comm_002)
  {
    id: 'ch_20_espionage_ethic',
    nodeId: NODE_C12_COMM_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A strategy analyst bribes a rival automaker’s IT admin to steal unannounced battery R&D blueprints. Is this legitimate environmental scanning?',
    options: [
      'Yes — all competitive intelligence gathering is classified as environmental scanning.',
      'No — legitimate scanning uses public-domain data, paid research, and MIS; theft constitutes illegal corporate espionage punishable under IPC and IT Act 2000.',
      'Yes — provided the stolen data is used solely for top-management SWOT analysis.',
      'It is permissible if the competitor is a foreign multinational.',
    ],
    correctIndex: 1,
    explanation: 'Environmental scanning must operate within legal and ethical boundaries (public data, filings, market research). Deceptive theft is corporate espionage violating Section 43A of IT Act 2000 & IPC.',
    hints: [
      'Consider the ethical and legal line separating market research from criminal data theft.',
      'Scanning relies on public domain, annual reports, industry journals, and legal market research.',
      'Hacking and bribery violate the IT Act and IPC.',
    ],
  },
  // 21. Advanced - Analysis (c12_comm_005)
  {
    id: 'ch_21_global_trans',
    nodeId: NODE_C12_COMM_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When the US Federal Reserve raised interest rates in 2022-23, Foreign Institutional Investors (FIIs) pulled funds from Indian equities and the Rupee weakened to ₹83/$. Through which global channels did this impact domestic automakers?',
    options: [
      'Only through local municipal property taxes.',
      'Through Capital channels (higher corporate borrowing costs) and Commodity/Trade channels (costlier imported auto parts).',
      'Through changes in Indian joint family structures.',
      'It had zero impact on Indian manufacturing companies.',
    ],
    correctIndex: 1,
    explanation: 'Global environmental forces transmit via three primary channels: Capital (FII/interest rates), Trade (export/import costs), and Commodities (crude/dollar valuation).',
    hints: [
      'Think about what happens when foreign capital exits and the dollar gets costlier for importers.',
      'Capital channel affects financing; Trade/Currency channel affects import costs of components.',
      'Global rate hikes transmit through capital outflows and currency depreciation.',
    ],
  },
  // 22. Advanced - Recall & Application (c12_comm_008)
  {
    id: 'ch_22_kmp_law',
    nodeId: NODE_C12_COMM_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Under Section 2(51) & Section 203 of the Companies Act 2013, which group is legally defined as "Key Managerial Personnel" (KMP) belonging to Top Management?',
    options: [
      'Shift Foremen and Floor Apprentices',
      'CEO / Managing Director, Company Secretary, and Chief Financial Officer (CFO)',
      'Regional Sales Representatives and Counter Clerks',
      'Trade Union Shop Stewards',
    ],
    correctIndex: 1,
    explanation: 'Under Indian company law, Key Managerial Personnel (KMP) statutorily includes the MD/CEO, Company Secretary, and CFO, representing top-tier fiduciary governance.',
    hints: [
      'Which officers bear statutory signatory accountability for annual financial disclosures?',
      'KMP comprises the highest corporate executives: MD, CEO, CS, CFO.',
      'Section 203 mandates appointment of CEO, CS, and CFO as KMP in listed entities.',
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
  nodeId: NODE_C12_COMM_001,
  title: 'Business Environment, Scanning, SWOT & Principles of Management',
  definition: 'The business environment is the sum total of all internal and external factors (individuals, institutions, and forces) that surround a business enterprise and affect its performance, decisions, structure, and survival.',
  eli5: 'Think of a car on the highway. Internal factors are its engine, brakes, and driver skill. External factors are the rain, traffic laws, fuel prices, and road quality. Managing is steering that car safely to the destination using proven rules of road and mechanics!',
  misconceptions: [
    {
      misconception: 'Business environment means only external factors like government policies and the economy.',
      correction: 'The ISC syllabus explicitly defines the environment as BOTH internal (culture, mission, skills, capital) and external (PESTLE & Global) forces.',
    },
    {
      misconception: 'Environmental scanning is just casually browsing the daily morning newspaper.',
      correction: 'Scanning is an institutionalised, continuous organisational process with designated intelligence teams, defined sources, and documented strategy reports.',
    },
    {
      misconception: 'Unity of Command and Unity of Direction mean the exact same thing (having one boss).',
      correction: 'Unity of Command is individual-level (one employee receives orders from one boss); Unity of Direction is departmental-level (one head and one plan for an entire objective).',
    },
    {
      misconception: 'A strong corporate brand or patents are Opportunities in SWOT.',
      correction: 'A strong brand or patent is an internal asset owned and controlled by the firm, making it a STRENGTH. Opportunities are external market trends.',
    },
    {
      misconception: 'Taylor’s Scientific Management is purely mechanical and lacks any ethical responsibility.',
      correction: 'Taylor’s fourth principle requires developing every worker to maximum potential, preceded by the "Mental Revolution" of mutual trust and backed by the Factories Act 1948.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the sum total of internal and external factors surrounding a business called?', options: ['Marketing Mix', 'Business Environment', 'Scalar Chain', 'Division of Work'], correctIndex: 1 },
    { question: 'Which external factor does the Central Goods and Services Tax (CGST) Act belong to?', options: ['Social', 'Economic', 'Legal', 'Technological'], correctIndex: 2 },
    { question: 'In SWOT, what does internal controllability distinguish?', options: ['S & W from O & T', 'S & O from W & T', 'P & E from S & T', 'Top from Lower Management'], correctIndex: 0 },
    { question: 'What is the time horizon of Top Management strategic decisions?', options: ['Daily/Weekly', '1 to 5 years', '5 to 20 years', 'Under 30 minutes'], correctIndex: 2 },
    { question: 'Which principle replaces guesswork with stopwatch time and motion studies?', options: ['Espirit de Corps', 'Science, not Rule of Thumb', 'Unity of Direction', 'Equity'], correctIndex: 1 },
    { question: 'What is Fayol’s lateral emergency communication bridge called?', options: ['Gang Plank', 'Scalar Ladder', 'Unity Bridge', 'Order Link'], correctIndex: 0 },
    { question: 'Under Companies Act 2013, what percentage of 3-year average net profit is mandated for CSR?', options: ['1%', '2%', '5%', '10%'], correctIndex: 1 },
    { question: 'ITC’s E-Choupal network in 35,000 villages is an example of what process?', options: ['Corporate Espionage', 'Environmental Scanning', 'Hostile Takeover', 'Rule of Thumb'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student understands business environment features, executes scanning, classifies PESTLE/Legal/Global forces, builds 2x2 SWOT, identifies 3 tiers of management, and applies Taylor & Fayol principles.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Totality of Forces: Internal vs External Radar',
    instruction: 'Toggle between Internal and External forces to observe how AutoCraft is shaped by both inside assets and outside macro-pressures.',
    interactionType: 'toggle-radar',
    nodeId: NODE_C12_COMM_001,
  },
  {
    title: 'PESTLE & Global External Forces Lab',
    instruction: 'Drag the macro policy sliders (GST Cess, Tech Adoption, Global Fuel Price) to see immediate market impact on AutoCraft’s sales & margins.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_COMM_004,
  },
  {
    title: 'The 2x2 SWOT Synthesis Matrix',
    instruction: 'Click on each SWOT quadrant to analyse AutoCraft’s competitive balance between internal capabilities and external realities.',
    interactionType: 'click-swot',
    nodeId: NODE_C12_COMM_006,
  },
  {
    title: '3-Tier Management Pyramid: Strategic to Shopfloor',
    instruction: 'Click each tier of the management pyramid to explore decision scope, time horizon, and Indian legal accountability.',
    interactionType: 'click-pyramid',
    nodeId: NODE_C12_COMM_008,
  },
  {
    title: 'Taylor’s Scientific Stopwatch vs Fayol’s Principles',
    instruction: 'Adjust the assembly line cycle-time slider to test Taylor’s 55-second task standardisation vs worker fatigue.',
    interactionType: 'slider-taylor',
    nodeId: NODE_C12_COMM_009,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the Union Government raises the SUV GST Cess from 15% to 22% while offering a ₹10,000/kWh EV subsidy, what happens to AutoCraft’s fossil SUV vs EV sales mix?',
    options: [
      'Fossil SUV sales will surge while EV sales completely collapse.',
      'EV demand will accelerate due to price competitiveness while high-cess fossil SUV margins face pressure.',
      'Neither will be affected because taxes have zero impact on Indian car buyers.',
      'AutoCraft will be forced into immediate liquidation.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now adjust the GST Cess slider to +22% in the simulation to see the real-time sales shift.',
    nodeId: NODE_C12_COMM_004,
  },
  {
    question: 'Predict: If assembly line cycle time is arbitrarily cut from 55 seconds to 25 seconds WITHOUT worker training or rest intervals, what will happen?',
    options: [
      'Production defects will plummet to zero and worker morale will reach all-time highs.',
      'Defects will surge and worker fatigue/conflict will trigger assembly line disruption (Taylor’s caution).',
      'All workers will automatically double their speed with zero fatigue.',
      'Fayol’s Scalar chain will permanently break.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the cycle time slider below 30 seconds to observe the defect rate spike on the live chart.',
    nodeId: NODE_C12_COMM_009,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the interaction between Political/Legal subsidies and Technological adoption?',
    observableOptions: [
      'They act in complete isolation with zero mutual effect.',
      'Legal EV subsidies accelerate technological adoption by lowering consumer price barriers (Inter-relatedness).',
      'Technology always abolishes government laws.',
      'Subsidies reduce public interest in electric technology.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_COMM_001,
  },
  {
    question: 'What pattern do you notice regarding management levels and decision time horizons?',
    observableOptions: [
      'Top management deals with daily shift targets while Supervisors plan 20 years ahead.',
      'Higher levels focus on long-term non-reversible strategy (5-20 yrs); lower levels focus on daily operational tasks.',
      'All three levels perform identical daily tasks with identical time horizons.',
      'Only Middle management makes decisions; Top and Lower management do not.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_COMM_008,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Strategy Officer: The Tata Motors EV Turnaround Dossier',
  description: 'Apply the complete Chapter framework to analyse how Tata Motors transformed from a struggling passenger vehicle player into India’s undisputed EV leader (>70% market share in FY23).',
  steps: [
    'Identify 2 Internal Strengths (Ziptron EV platform, Sanand manufacturing capacity) and 1 Internal Weakness.',
    'Map 2 External Opportunities (FAME-II subsidy, rising fuel prices) and 2 External Threats (chip shortage, global lithium price swings).',
    'Explain how N. Chandrasekaran (Top Management) coordinated with Tata Power (Infrastructure) and plant supervisors to execute the Nexon EV launch.',
    'Formulate 1 Taylorist shopfloor efficiency standard and 1 Fayol administrative guideline for the EV assembly line.',
  ],
};

// ─── MAIN COMPONENT ───
function C12_CommerceBusinessEnvironmentMeaningSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commerce'] || { name: 'Commerce', emoji: '📈', color: 'indigo' };

  // ─── STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Brilliant.org Interaction State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);

  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);

  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Exploration & Interactive Sim State
  const [radarView, setRadarView] = useState<'both' | 'internal' | 'external'>('both');
  const [gstCess, setGstCess] = useState(15);
  const [evSubsidy, setEvSubsidy] = useState(10000);
  const [lithiumPrice, setLithiumPrice] = useState(25000);
  const [techAdoptionRate, setTechAdoptionRate] = useState(45);
  const [selectedSwotQuadrant, setSelectedSwotQuadrant] = useState<'S' | 'W' | 'O' | 'T'>('S');
  const [selectedManagementTier, setSelectedManagementTier] = useState<'top' | 'middle' | 'lower'>('top');
  const [cycleTimeSeconds, setCycleTimeSeconds] = useState(55);

  // Reflection State
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');

  // Challenge Handling State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── CALCULATIONS & MEMOS ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  const simMetrics = useMemo(() => {
    const fossilSalesIndex = Math.max(20, Math.min(100, 100 - (gstCess - 15) * 3));
    const evSalesIndex = Math.max(10, Math.min(100, 30 + (evSubsidy / 1000) * 3.5 + (techAdoptionRate * 0.4) - (lithiumPrice / 5000) * 2));
    const defectRatePercent = cycleTimeSeconds < 40 ? ((40 - cycleTimeSeconds) * 0.7).toFixed(1) : '0.2';
    const workerFatigueIndex = cycleTimeSeconds < 50 ? Math.min(100, 30 + (50 - cycleTimeSeconds) * 2.5) : 20;

    return {
      fossilSales: fossilSalesIndex,
      evSales: evSalesIndex,
      defectRate: defectRatePercent,
      fatigue: workerFatigueIndex,
      totalRevenueIndex: ((fossilSalesIndex * 0.6) + (evSalesIndex * 0.8)).toFixed(0),
    };
  }, [gstCess, evSubsidy, lithiumPrice, techAdoptionRate, cycleTimeSeconds]);

  const chartData = useMemo(() => [
    { name: 'Fossil SUV Sales', volume: simMetrics.fossilSales },
    { name: 'EV Portfolio Sales', volume: simMetrics.evSales },
    { name: 'Shopfloor Fatigue', volume: simMetrics.fatigue },
  ], [simMetrics]);

  // ─── EFFECTS ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C12_COMM_001);
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
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  useEffect(() => {
    if (phase === 'discovery') {
      speechManager.speak('Welcome to the AutoCraft Business Environment Simulation. Let us begin with a discovery challenge.');
    } else if (phase === 'explore') {
      speechManager.speak(EXPLORATION_STEPS[currentSlide].instruction);
    } else if (phase === 'sandbox') {
      speechManager.speak('Free exploration mode unlocked. Experiment with all variables without grading pressure.');
    } else if (phase === 'challenge') {
      speechManager.speak(`Challenge time. Question type: ${challenge.type}. Read carefully.`);
    }
  }, [phase, currentSlide, challenge.type]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = Number(simMetrics.defectRate) > 2.0 ? '#ef4444' : '#22c55e';
      ctx.lineWidth = 2.5;
      for (let x = 0; x < canvas.width; x++) {
        const freq = (100 - cycleTimeSeconds) * 0.001;
        const y = canvas.height / 2 + Math.sin(x * 0.04 + frame * freq) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const pulseX = (frame * 2) % canvas.width;
      const pulseY = canvas.height / 2 + Math.sin(pulseX * 0.04 + frame * 0.05) * 12;
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 5 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [cycleTimeSeconds, simMetrics.defectRate]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALLBACK HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const firstHint = challenge.hints[0];
        if (firstHint) {
          setCurrentHint(firstHint);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Here is a gentle hint to guide your thinking.');
        }
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, challenge.hints]);

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
      speechManager.speak('All hints explored. Let us study the complete solution.');
    }
  }, [hintCount, challenge.hints]);

  const handleDiscoveryAnswer = useCallback((index: number) => {
    setSelectedDiscoveryOpt(index);
    const isCorr = index === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Spot on! Both internal and external factors matter.' : DISCOVERY_QUESTION.hintAfter);
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
    speechManager.speak('Prediction recorded! Now adjust the parameters below to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Excellent observation skills!' : 'Examine the data coupling again.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrectTarget = challenge.correctMapping?.[targetId] === draggedItem;

    if (isCorrectTarget) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge.correctMapping]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const items = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return items;
    });
  }, [challenge.sortItems]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Business Environment and Management simulation.');
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
      const parsed = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(parsed - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent analysis.');
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
        speechManager.speak('Let us examine the complete rationale.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge.sortItems, handleAnswer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gold-900/60 border border-gold-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-gold-300 via-gold-300 to-emerald-300 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              ISC Class 12 Commerce • Unit 1 & Unit 2 Adaptive Suite
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
                : difficulty === 'standard'
                ? 'bg-gold-950/70 border-gold-500/50 text-gold-300'
                : 'bg-rose-950/70 border-rose-500/50 text-rose-300'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300">
            Mastery: {masteryLevel}
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-6 space-y-6"
        >
          <motion.div
            whileHover={{ scale: 1.005 }}
            className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-950 border border-gold-700/50 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gold-400 text-sm font-bold tracking-wider uppercase">Case Context</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-gold-900/80 text-gold-200 border border-gold-600/40">Real-World Scenario</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-3 font-mono bg-gold-950/40 p-2.5 rounded-lg border border-gold-900/60">
              📌 {SCENARIO.context}
            </p>
          </motion.div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Discovery Curiosity Hook
              </span>
              <span className="text-xs text-slate-400">(Low stakes — predict & explore)</span>
            </div>
            <p className="text-base md:text-lg font-semibold text-slate-100">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015, x: 3 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                    selectedDiscoveryOpt === i
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/80 border-rose-500 text-rose-200'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="max-w-xl">
                  <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Spot on!' : '💡 Key Concept:'} {DISCOVERY_QUESTION.hintAfter}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white font-bold text-sm shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  Step Into Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (LABS WITH MULTIPLE SVGS) ─── */}
      {phase === 'explore' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-6 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Exploration Lab</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gold-900/60 text-gold-300 border border-gold-700/50">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                    currentSlide === idx
                      ? 'bg-gold-600 text-white shadow-md shadow-gold-500/40'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {idx + 1}
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5"
            >
              <div>
                <h3 className="text-lg font-bold text-gold-300 flex items-center gap-2">
                  <span>🔬</span> {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300/90 mt-1 font-medium">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── LAB 0: SVG DIAGRAM 1 — INTERNAL VS EXTERNAL RADAR ── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(['both', 'internal', 'external'] as const).map(mode => (
                      <motion.button
                        key={mode}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setRadarView(mode);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all border ${
                          radarView === mode
                            ? 'bg-gold-600 border-gold-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {mode === 'both' ? 'Full Environment (Sum Total)' : `${mode} Forces Only`}
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG Diagram 1: Interactive Totality Radar */}
                  <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 600 320" className="w-full h-auto">
                      <circle cx="300" cy="160" r="130" fill="none" stroke="#334155" strokeDasharray="4 4" />
                      <circle cx="300" cy="160" r="75" fill="none" stroke="#475569" strokeDasharray="2 2" />

                      <circle cx="300" cy="160" r="42" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2.5" />
                      <text x="300" y="156" textAnchor="middle" fill="#e0e7ff" fontSize="11" fontWeight="bold">AutoCraft</text>
                      <text x="300" y="170" textAnchor="middle" fill="#93c5fd" fontSize="9">Firm Core</text>

                      {(radarView === 'both' || radarView === 'internal') && (
                        <g>
                          {[
                            { name: 'Culture & Ethics', angle: 0, col: '#34d399' },
                            { name: 'Mission & Goals', angle: 60, col: '#34d399' },
                            { name: 'Org Structure', angle: 120, col: '#34d399' },
                            { name: 'Worker Skills', angle: 180, col: '#34d399' },
                            { name: 'Physical Plant', angle: 240, col: '#34d399' },
                            { name: 'Capital & Funds', angle: 300, col: '#34d399' },
                          ].map((item, idx) => {
                            const rad = (item.angle * Math.PI) / 180;
                            const x = 300 + 75 * Math.cos(rad);
                            const y = 160 + 75 * Math.sin(rad);
                            return (
                              <g key={idx} className="cursor-pointer">
                                <circle cx={x} cy={y} r="16" fill="#064e3b" stroke={item.col} strokeWidth="1.5" />
                                <text x={x} y={y + 3} textAnchor="middle" fill="#ecfdf5" fontSize="7" fontWeight="bold">
                                  {item.name.split(' ')[0]}
                                </text>
                              </g>
                            );
                          })}
                        </g>
                      )}

                      {(radarView === 'both' || radarView === 'external') && (
                        <g>
                          {[
                            { name: 'Political (Make in India)', angle: 30, col: '#f59e0b' },
                            { name: 'Economic (RBI Repo)', angle: 80, col: '#f59e0b' },
                            { name: 'Social (Immunity/EV)', angle: 135, col: '#f59e0b' },
                            { name: 'Tech (UPI/Battery)', angle: 190, col: '#f59e0b' },
                            { name: 'Legal (GST/CCPA)', angle: 240, col: '#f43f5e' },
                            { name: 'Green (NGT/COP26)', angle: 290, col: '#10b981' },
                            { name: 'Global (US Fed/Crude)', angle: 335, col: '#38bdf8' },
                          ].map((item, idx) => {
                            const rad = (item.angle * Math.PI) / 180;
                            const x = 300 + 130 * Math.cos(rad);
                            const y = 160 + 130 * Math.sin(rad);
                            return (
                              <g key={idx} className="cursor-pointer">
                                <circle cx={x} cy={y} r="18" fill="#1e293b" stroke={item.col} strokeWidth="2" />
                                <text x={x} y={y + 3} textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="bold">
                                  {item.name.split(' ')[0]}
                                </text>
                              </g>
                            );
                          })}
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* ── LAB 1: PESTLE & POLICY MACRO SIMULATOR ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 rounded-xl bg-gold-950/70 border border-gold-700/60 space-y-3">
                      <p className="text-sm font-bold text-gold-200">
                        ��� Prediction Challenge: {PREDICTION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-left text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald-400 font-semibold">
                      ✓ Prediction recorded! Drag the sliders below to verify the real-time interaction.
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300 font-medium">SUV GST Cess (Legal/Political)</span>
                        <span className="text-rose-400 font-bold">{gstCess}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={30}
                        value={gstCess}
                        onChange={e => {
                          setGstCess(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-rose-500 cursor-pointer"
                        aria-label="SUV GST Cess slider"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300 font-medium">EV FAME Subsidy (Policy Push)</span>
                        <span className="text-emerald-400 font-bold">₹{evSubsidy.toLocaleString()}/kWh</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={20000}
                        step={1000}
                        value={evSubsidy}
                        onChange={e => {
                          setEvSubsidy(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="EV FAME Subsidy slider"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300 font-medium">Global Lithium Carbonate (Global Commodity)</span>
                        <span className="text-amber-400 font-bold">${lithiumPrice.toLocaleString()}/tonne</span>
                      </div>
                      <input
                        type="range"
                        min={10000}
                        max={80000}
                        step={5000}
                        value={lithiumPrice}
                        onChange={e => {
                          setLithiumPrice(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                        aria-label="Global Lithium price slider"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300 font-medium">EV Consumer Adoption (Social/Tech)</span>
                        <span className="text-gold-400 font-bold">{techAdoptionRate}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={90}
                        value={techAdoptionRate}
                        onChange={e => {
                          setTechAdoptionRate(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Tech adoption rate slider"
                      />
                    </div>
                  </div>

                  <div className="h-44 w-full bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                        <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#475569', borderRadius: '8px' }}
                        />
                        <Bar dataKey="volume" fill="#6366f1" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {!observationAnswered && (
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-gold-300 mb-2">
                        🔎 Observation Check: {OBSERVATION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-left text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── LAB 2: SVG DIAGRAM 2 — 2X2 SWOT MATRIX ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* SVG Diagram 2: 2x2 SWOT Strategic Quad */}
                  <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 540 240" className="w-full h-auto">
                      <line x1="270" y1="20" x2="270" y2="230" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
                      <line x1="20" y1="125" x2="520" y2="125" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />

                      {/* Header tags */}
                      <text x="145" y="15" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">INTERNAL (Controllable)</text>
                      <text x="395" y="15" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">EXTERNAL (Uncontrollable)</text>

                      {/* Quad S */}
                      <g onClick={() => setSelectedSwotQuadrant('S')} className="cursor-pointer">
                        <rect x="30" y="25" width="225" height="90" rx="10" fill={selectedSwotQuadrant === 'S' ? '#064e3b' : '#0f172a'} stroke="#10b981" strokeWidth={selectedSwotQuadrant === 'S' ? '2.5' : '1'} />
                        <text x="45" y="48" fill="#34d399" fontSize="12" fontWeight="bold">STRENGTHS [S]</text>
                        <text x="45" y="68" fill="#ecfdf5" fontSize="9.5">• Proprietary EV Battery IP</text>
                        <text x="45" y="85" fill="#ecfdf5" fontSize="9.5">• 3,500 Trained Engineers</text>
                        <text x="45" y="102" fill="#a7f3d0" fontSize="8.5">Strategy: Leverage for expansion</text>
                      </g>

                      {/* Quad O */}
                      <g onClick={() => setSelectedSwotQuadrant('O')} className="cursor-pointer">
                        <rect x="285" y="25" width="225" height="90" rx="10" fill={selectedSwotQuadrant === 'O' ? '#0c4a6e' : '#0f172a'} stroke="#0284c7" strokeWidth={selectedSwotQuadrant === 'O' ? '2.5' : '1'} />
                        <text x="300" y="48" fill="#38bdf8" fontSize="12" fontWeight="bold">OPPORTUNITIES [O]</text>
                        <text x="300" y="68" fill="#f0f9ff" fontSize="9.5">• 5% Low GST on Electric Cars</text>
                        <text x="300" y="85" fill="#f0f9ff" fontSize="9.5">• FAME-II Capital Subsidies</text>
                        <text x="300" y="102" fill="#bae6fd" fontSize="8.5">Strategy: Seize market whitespace</text>
                      </g>

                      {/* Quad W */}
                      <g onClick={() => setSelectedSwotQuadrant('W')} className="cursor-pointer">
                        <rect x="30" y="135" width="225" height="90" rx="10" fill={selectedSwotQuadrant === 'W' ? '#881337' : '#0f172a'} stroke="#f43f5e" strokeWidth={selectedSwotQuadrant === 'W' ? '2.5' : '1'} />
                        <text x="45" y="158" fill="#fb7185" fontSize="12" fontWeight="bold">WEAKNESSES [W]</text>
                        <text x="45" y="178" fill="#fff1f2" fontSize="9.5">• High Legacy Debt Burden</text>
                        <text x="45" y="195" fill="#fff1f2" fontSize="9.5">• Sunk Fossil Supply Contracts</text>
                        <text x="45" y="212" fill="#fecdd3" fontSize="8.5">Strategy: Restructure & upgrade</text>
                      </g>

                      {/* Quad T */}
                      <g onClick={() => setSelectedSwotQuadrant('T')} className="cursor-pointer">
                        <rect x="285" y="135" width="225" height="90" rx="10" fill={selectedSwotQuadrant === 'T' ? '#78350f' : '#0f172a'} stroke="#d97706" strokeWidth={selectedSwotQuadrant === 'T' ? '2.5' : '1'} />
                        <text x="300" y="158" fill="#fbbf24" fontSize="12" fontWeight="bold">THREATS [T]</text>
                        <text x="300" y="178" fill="#fffbeb" fontSize="9.5">• Volatile Global Lithium Tariffs</text>
                        <text x="300" y="195" fill="#fffbeb" fontSize="9.5">• Strict NGT Pollution Mandates</text>
                        <text x="300" y="212" fill="#fde68a" fontSize="8.5">Strategy: Hedge & diversify sources</text>
                      </g>
                    </svg>
                  </div>

                  <div className="p-4 rounded-xl bg-gold-950/40 border border-gold-800/60">
                    <h4 className="text-xs font-bold text-gold-300 uppercase">Selected SWOT Quadrant Focus:</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      {selectedSwotQuadrant === 'S' && 'Leverage internal Strengths to pioneer rapid product launches and cost efficiency.'}
                      {selectedSwotQuadrant === 'W' && 'Acknowledge Weaknesses transparently to prevent governance crises and retrain workforce.'}
                      {selectedSwotQuadrant === 'O' && 'Harness external Opportunities with aggressive SO expansion into underserved EV markets.'}
                      {selectedSwotQuadrant === 'T' && 'Shield against external Threats via long-term contracts, local lithium sourcing, and compliance.'}
                    </p>
                  </div>
                </div>
              )}

              {/* ── LAB 3: SVG DIAGRAM 3 — 3-TIER MANAGEMENT PYRAMID ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* SVG Diagram 3: 3-Tier Management Pyramid */}
                  <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 540 220" className="w-full h-auto">
                      {/* Top Tier Polygon */}
                      <polygon
                        points="270,20 200,80 340,80"
                        fill={selectedManagementTier === 'top' ? '#4338ca' : '#1e1b4b'}
                        stroke="#818cf8"
                        strokeWidth="2"
                        className="cursor-pointer transition-all"
                        onClick={() => setSelectedManagementTier('top')}
                      />
                      <text x="270" y="60" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">APEX: TOP TIER</text>
                      <text x="440" y="55" fill="#a5b4fc" fontSize="9">Board, CEO, CFO (5-20 yrs Strategy)</text>

                      {/* Middle Tier Trapezoid */}
                      <polygon
                        points="200,84 340,84 395,145 145,145"
                        fill={selectedManagementTier === 'middle' ? '#0369a1' : '#082f49'}
                        stroke="#38bdf8"
                        strokeWidth="2"
                        className="cursor-pointer transition-all"
                        onClick={() => setSelectedManagementTier('middle')}
                      />
                      <text x="270" y="120" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">TACTICAL: MIDDLE TIER</text>
                      <text x="440" y="118" fill="#7dd3fc" fontSize="9">Plant Heads, Reg. Sales (1-5 yrs)</text>

                      {/* Lower Tier Trapezoid */}
                      <polygon
                        points="145,149 395,149 450,210 90,210"
                        fill={selectedManagementTier === 'lower' ? '#047857' : '#022c22'}
                        stroke="#34d399"
                        strokeWidth="2"
                        className="cursor-pointer transition-all"
                        onClick={() => setSelectedManagementTier('lower')}
                      />
                      <text x="270" y="185" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">OPERATIONAL: LOWER / SHOPFLOOR</text>
                      <text x="440" y="182" fill="#6ee7b7" fontSize="9">Shift Foremen, Inspectors (Daily)</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'top', label: 'Top Management', sub: 'Apex: 5-20 yrs Horizon' },
                      { key: 'middle', label: 'Middle Management', sub: 'Bridge: 1-5 yrs Horizon' },
                      { key: 'lower', label: 'Lower / Supervisory', sub: 'Base: Daily Operational' },
                    ].map(tier => (
                      <motion.button
                        key={tier.key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedManagementTier(tier.key as any);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedManagementTier === tier.key
                            ? 'bg-gold-950 border-gold-400 text-gold-100'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                        }`}
                      >
                        <p className="text-xs font-bold">{tier.label}</p>
                        <p className="text-[10px] text-slate-400">{tier.sub}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    {selectedManagementTier === 'top' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-gold-300">Top Tier Designations</span>
                          <span className="text-[10px] bg-gold-900/60 px-2 py-0.5 rounded text-gold-200">Companies Act Sec 2(18) KMP</span>
                        </div>
                        <p className="text-xs text-slate-300">Board of Directors, CEO, MD, CFO, Company Secretary.</p>
                        <p className="text-xs text-amber-300">
                          <strong>Core Function:</strong> Formulate long-term strategy, approve multi-crore capital budgets, and bear fiduciary duty to shareholders & society (Sec 166).
                        </p>
                      </motion.div>
                    )}

                    {selectedManagementTier === 'middle' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5">
                        <span className="text-xs font-bold text-gold-300">Middle Tier Designations</span>
                        <p className="text-xs text-slate-300">Plant Heads, Regional Sales Managers, Divisional Directors.</p>
                        <p className="text-xs text-gold-300">
                          <strong>Core Function:</strong> Translate top-level strategic vision into departmental tactical plans, allocate budgets, and supervise lower managers.
                        </p>
                      </motion.div>
                    )}

                    {selectedManagementTier === 'lower' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5">
                        <span className="text-xs font-bold text-emerald-300">Lower / Supervisory Tier Designations</span>
                        <p className="text-xs text-slate-300">Shift Foremen, Quality Inspectors, Line Supervisors, Section Officers.</p>
                        <p className="text-xs text-emerald-300">
                          <strong>Core Function:</strong> Assign daily shopfloor tasks, ensure 55-second task standardisation, maintain quality, and address worker grievances.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB 4: SVG DIAGRAM 4 — FAYOL SCALAR CHAIN & TAYLOR WORKSHOP ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* SVG Diagram 4: Fayol Scalar Chain & Emergency Gang Plank */}
                  <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 540 180" className="w-full h-auto">
                      {/* Top MD node */}
                      <circle cx="270" cy="25" r="16" fill="#4f46e5" stroke="#a5b4fc" strokeWidth="2" />
                      <text x="270" y="29" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">MD (A)</text>

                      {/* Left Ladder (Production) */}
                      <line x1="260" y1="38" x2="160" y2="75" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="160" cy="75" r="14" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
                      <text x="160" y="79" textAnchor="middle" fill="#e2e8f0" fontSize="9">Head B</text>

                      <line x1="160" y1="89" x2="120" y2="135" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="120" cy="135" r="14" fill="#047857" stroke="#34d399" strokeWidth="2" />
                      <text x="120" y="139" textAnchor="middle" fill="#ecfdf5" fontSize="8.5" fontWeight="bold">Prod D</text>

                      {/* Right Ladder (Purchase) */}
                      <line x1="280" y1="38" x2="380" y2="75" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="380" cy="75" r="14" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
                      <text x="380" y="79" textAnchor="middle" fill="#e2e8f0" fontSize="9">Head L</text>

                      <line x1="380" y1="89" x2="420" y2="135" stroke="#6366f1" strokeWidth="2" />
                      <circle cx="420" cy="135" r="14" fill="#047857" stroke="#34d399" strokeWidth="2" />
                      <text x="420" y="139" textAnchor="middle" fill="#ecfdf5" fontSize="8.5" fontWeight="bold">Purch P</text>

                      {/* Gang Plank Horizontal Bridge */}
                      <line x1="134" y1="135" x2="406" y2="135" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 3" />
                      <rect x="200" y="123" width="140" height="22" rx="6" fill="#78350f" stroke="#fbbf24" strokeWidth="1" />
                      <text x="270" y="138" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">⚡ GANG PLANK BRIDGE</text>
                      <text x="270" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">Direct peer coordination in emergencies without MD delay</text>
                    </svg>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Live Assembly Rhythm & Defect Wave</span>
                      <span>Cycle Target: {cycleTimeSeconds}s / station</span>
                    </div>
                    <canvas ref={canvasRef} width={500} height={40} className="w-full bg-slate-950 rounded-lg border border-slate-800" />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">Assembly Task Cycle Time (Taylor Time Study)</span>
                      <span className={`font-bold ${cycleTimeSeconds < 40 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {cycleTimeSeconds} seconds / car
                      </span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={90}
                      value={cycleTimeSeconds}
                      onChange={e => {
                        setCycleTimeSeconds(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-gold-500 cursor-pointer"
                      aria-label="Assembly cycle time slider"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                      <span className="text-slate-400 block mb-0.5">Defect Rate (PPM Impact):</span>
                      <span className={`text-base font-bold ${Number(simMetrics.defectRate) > 1 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {simMetrics.defectRate}%
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                      <span className="text-slate-400 block mb-0.5">Worker Fatigue Level:</span>
                      <span className={`text-base font-bold ${simMetrics.fatigue > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {simMetrics.fatigue} / 100
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 italic">
                    ���� Slashing time under 40s without worker training triggers worker fatigue and quality defects — demonstrating why Taylor coupled task standardization with the <strong>Mental Revolution</strong> and human safety!
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-sm font-semibold"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-sm font-bold shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="mt-6 space-y-6"
        >
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>🎮</span> Free Play Strategic Sandbox
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                Ungraded Safe Zone
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Manipulate all external forces and shopfloor metrics simultaneously to discover how AutoCraft’s quarterly performance responds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                SUV GST Cess: <span className="text-rose-400">{gstCess}%</span>
              </label>
              <input
                type="range"
                min={10}
                max={30}
                value={gstCess}
                onChange={e => setGstCess(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                EV FAME Subsidy: <span className="text-emerald-400">₹{evSubsidy}/kWh</span>
              </label>
              <input
                type="range"
                min={0}
                max={20000}
                step={1000}
                value={evSubsidy}
                onChange={e => setEvSubsidy(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Task Cycle Time: <span className="text-gold-400">{cycleTimeSeconds}s</span>
              </label>
              <input
                type="range"
                min={20}
                max={90}
                value={cycleTimeSeconds}
                onChange={e => setCycleTimeSeconds(Number(e.target.value))}
                className="w-full accent-gold-500"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-around text-center">
            <div>
              <p className="text-xs text-slate-400">Fossil SUV Index</p>
              <p className="text-lg font-bold text-slate-200">{simMetrics.fossilSales}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">EV Portfolio Index</p>
              <p className="text-lg font-bold text-emerald-400">{simMetrics.evSales}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Revenue Score</p>
              <p className="text-lg font-bold text-gold-400">{simMetrics.totalRevenueIndex}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-600 via-gold-600 to-emerald-600 text-white font-black text-sm tracking-wide shadow-xl shadow-gold-600/20"
          >
            I Am Ready for Graded Challenges →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: GRADED CHALLENGE SUITE ─── */}
      {phase === 'challenge' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-6 space-y-5"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-gold-950 text-gold-300 border border-gold-700/50 uppercase text-[10px] font-bold">
                  Competency: {challenge.competencyLevel}
                </span>
                <span className="text-slate-400">
                  Errors: <strong className="text-rose-400">{errors}</strong>
                </span>
              </div>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-gold-400 to-emerald-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <div
            className={`p-6 rounded-2xl bg-slate-900 border transition-all duration-300 ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 shadow-lg shadow-rose-900/30'
                : 'border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-slate-100 mb-4 leading-relaxed">
              {challenge.question}
            </p>

            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag items to targets below:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 rounded-lg bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'level_top', title: 'Apex: Top Management (5-20 yrs)' },
                    { id: 'level_middle', title: 'Bridge: Middle Management (1-5 yrs)' },
                    { id: 'level_lower', title: 'Base: Lower / Supervisory (Daily)' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed min-h-[90px] flex flex-col justify-center items-center text-center transition-all ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <p className="text-xs font-bold text-slate-400 mb-1">{target.title}</p>
                      <p className="text-xs font-bold text-gold-300">
                        {droppedLabels[target.id] || '📥 Drop Designation Here'}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs shadow"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder from first step to final step:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, idx);
                        setDraggedItem(null);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-gold-400 mr-2">{idx + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-500 text-xs">☰ Reorder</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs shadow"
                >
                  Submit Ordered Sequence
                </motion.button>
              </div>
            )}

            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical figure"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs shadow"
                  >
                    Check Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-amber-300">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 rounded-lg bg-gold-900/80 hover:bg-gold-800 text-gold-200 border border-gold-600 text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-gold-700 text-white text-xs font-medium flex items-center gap-1.5"
                    >
                      {p}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-300 hover:text-rose-100 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click components above to assemble definition</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs shadow"
                >
                  Verify Definition
                </motion.button>
              </div>
            )}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-amber-950/40 border border-amber-700/60 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Comprehensive Rationale & CISCE Marking Key
                </span>
                <span className="text-xs text-amber-400">
                  Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                </span>
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
                      className="text-xs md:text-sm text-amber-100 leading-relaxed"
                    >
                      <strong className="text-amber-400 font-bold">{idx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setRevealedSteps(s => s + 1);
                      audioManager.play('pop');
                    }}
                    className="px-4 py-1.5 rounded-lg bg-amber-700/80 hover:bg-amber-600 text-white text-xs font-bold shadow"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL FEEDBACK & REFLECTION & SRS ─── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 space-y-6"
        >
          {/* Performance Hero Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-gold-950/90 via-slate-900 to-slate-950 border border-gold-700/60 shadow-2xl text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-3xl"
            >
              🏆
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Simulation Completed!</h2>
            <div className="flex justify-center gap-6">
              <div>
                <p className="text-xs text-slate-400 font-semibold">Final Score</p>
                <p className="text-3xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold">Total Errors</p>
                <p className="text-3xl font-black text-rose-400">{errors}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold">Mastery Tier</p>
                <p className="text-3xl font-black text-gold-400 capitalize">{masteryLevel}</p>
              </div>
            </div>

            {/* ─── MOTIVATIONAL FEEDBACK ─── */}
            <div className={`p-4 rounded-2xl border text-center font-bold text-lg max-w-xl mx-auto ${
              errors === 0
                ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300 shadow-lg shadow-emerald-950/50'
                : errors <= 3
                ? 'bg-gold-950/80 border-gold-500/80 text-gold-300 shadow-lg shadow-gold-950/50'
                : errors <= 7
                ? 'bg-amber-950/80 border-amber-500/80 text-amber-300 shadow-lg shadow-amber-950/50'
                : 'bg-rose-950/80 border-rose-500/80 text-rose-300 shadow-lg shadow-rose-950/50'
            }`}>
              {errors === 0 && 'PERFECT SCORE! Outstanding strategic mastery!'}
              {errors >= 1 && errors <= 3 && 'Great work! Strong grasp of business environment principles!'}
              {errors >= 4 && errors <= 7 && 'Good effort! Review the weak areas below to solidify concepts.'}
              {errors >= 8 && 'Do not give up — You WILL get this! Practice makes perfect.'}
            </div>
          </div>

          {/* ─── PROMINENT SPACED REPETITION VISIBILITY CARD ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border-2 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 ${
              errors === 0
                ? 'bg-emerald-950/50 border-emerald-500/80'
                : errors <= 3
                ? 'bg-gold-950/50 border-gold-500/80'
                : 'bg-amber-950/50 border-amber-500/80'
            }`}
          >
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-slate-700 flex items-center justify-center text-3xl shadow-inner shrink-0">
                📅
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm md:text-base font-black text-slate-100 uppercase tracking-wider">
                    Spaced Repetition Schedule (SRS)
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold-900/80 text-gold-300 border border-gold-700">
                    SM-2 Algorithm
                  </span>
                </div>
                <p className="text-sm text-slate-300 mt-1">
                  Based on your performance ({errors} {errors === 1 ? 'error' : 'errors'}), optimal memory retention requires:
                </p>
                <p className="text-base md:text-lg font-black text-amber-300 mt-0.5">
                  👉 Next Review Due:{' '}
                  <span className={`px-2.5 py-0.5 rounded-md ${
                    errors === 0 ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-500' :
                    errors <= 3 ? 'bg-gold-900/80 text-gold-200 border border-gold-500' :
                    'bg-amber-900/80 text-amber-200 border border-amber-500'
                  }`}>
                    {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
                  </span>
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs text-slate-400 block mb-1">Retention target: 92%+</span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-xs font-semibold text-slate-300 border border-slate-700 block">
                {errors === 0 ? '🌟 Long-term retention phase' : errors <= 3 ? '⚡ Reinforcement phase' : '🔄 Immediate recall phase'}
              </span>
            </div>
          </motion.div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>💭</span> Key Concept Reflection
            </h3>
            <p className="text-xs text-slate-400">
              Consolidate your critical insights before attempting board examination scenario questions.
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflection1}
                  onChange={e => setReflection1(e.target.value)}
                  placeholder="e.g. How internal culture and corporate structure are fundamentally part of the total business environment..."
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflection2}
                  onChange={e => setReflection2(e.target.value)}
                  placeholder="e.g. Think of a firm like a ship: internal factors are the hull and crew, external forces are wind and currents..."
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflection3}
                  onChange={e => setReflection3(e.target.value)}
                  placeholder="e.g. Launching a startup, scanning government EV subsidies, structuring department reporting..."
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Review Card */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-800/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Specific Misconceptions Targeted For Review:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ CISCE Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity Finale */}
          <div className="p-6 rounded-2xl bg-gold-950/50 border border-gold-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>📝</span> Real-World Strategy Case: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <p key={idx} className="text-xs text-slate-400">
                  <strong className="text-gold-400">{idx + 1}.</strong> {step}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIM FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Accomplished!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_CommerceBusinessEnvironmentMeaningSim;
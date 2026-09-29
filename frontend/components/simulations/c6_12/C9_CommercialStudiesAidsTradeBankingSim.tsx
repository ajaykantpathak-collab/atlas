'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Node IDs as string literals
const NODE_C9_COMMSTUD_011 = 'c9_commstud_011';
const NODE_C9_COMMSTUD_012 = 'c9_commstud_012';
const NODE_C9_COMMSTUD_013 = 'c9_commstud_013';
const NODE_C9_COMMSTUD_014 = 'c9_commstud_014';
const NODE_C9_COMMSTUD_015 = 'c9_commstud_015';
const NODE_C9_COMMSTUD_016 = 'c9_commstud_016';
const NODE_C9_COMMSTUD_017 = 'c9_commstud_017';
const NODE_C9_COMMSTUD_018 = 'c9_commstud_018';
const NODE_C9_COMMSTUD_019 = 'c9_commstud_019';
const NODE_C9_COMMSTUD_020 = 'c9_commstud_020';

const ALL_NODE_IDS = [
  NODE_C9_COMMSTUD_011,
  NODE_C9_COMMSTUD_012,
  NODE_C9_COMMSTUD_013,
  NODE_C9_COMMSTUD_014,
  NODE_C9_COMMSTUD_015,
  NODE_C9_COMMSTUD_016,
  NODE_C9_COMMSTUD_017,
  NODE_C9_COMMSTUD_018,
  NODE_C9_COMMSTUD_019,
  NODE_C9_COMMSTUD_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Indian Enterprise Hub: Bharat Sweets to Global Spices',
  intro: 'Rajesh Sharma started with a small sweet shop in Surat and is now expanding to an international FMCG & textile export powerhouse. To scale successfully, he must master the aids to trade (banking, insurance, warehousing, advertising, packaging), choose the right business structure, coordinate core internal departments (Production, Marketing, Finance, HR), and streamline organizational communication.',
  context: 'Step into the shoes of Rajesh’s Chief Business Strategist. Master commercial operations and solve operational bottlenecks across India.',
};

// ─── BRILLIANT-STYLE PREDICTION QUESTIONS (Predict-then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'Before adjusting the assembly line speed to 140% in the Production Lab: What will happen to the scrap waste and unit production cost when speed is pushed past 100% capacity?',
    options: [
      'Scrap waste decreases to zero and unit cost drops steadily',
      'Scrap waste increases sharply and unit cost rises due to quality tolerance loss',
      'Production output doubles with zero additional scrap',
      'Both scrap waste and cost remain completely flat'
    ],
    correctIndex: 1,
    explanation: 'Overdriving factory machinery and workers beyond rated capacity causes defect variance to rise, increasing scrap waste and pushing up unit manufacturing cost.',
    verifyInstruction: 'Navigate to Lab 4 (Internal Departments) and slide the Assembly Line Speed to 140% to verify the scrap spike and cost surge.',
  },
  {
    id: 'pred_2',
    question: 'Before running the Warehousing simulator: If a farmer holds wheat in a CWC godown for 8 months rather than selling immediately at harvest, what happens to net profit per tonne after deducting storage fees?',
    options: [
      'Net profit per tonne rises substantially because off-season scarcity price gains exceed monthly storage costs',
      'Net profit becomes negative because storage charges completely wipe out all revenues',
      'Wheat price stays identical in harvest and off-season months',
      'Storage fees increase exponentially, destroying all trade gains'
    ],
    correctIndex: 0,
    explanation: 'Warehousing creates Time Utility by bridging seasonal production and off-season demand. The seasonal market appreciation exceeds storage fees, yielding higher net profit.',
    verifyInstruction: 'Go to Lab 2 (Warehousing Time Utility) and drag the storage slider to 8 months to check the net utility gain.',
  }
];

// ─── BRILLIANT-STYLE OBSERVATION QUESTIONS (What Do You Notice Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'Look at the Aids to Trade Risk Transfer visualization: When you toggle Marine Insurance OFF (Exposed), what do you observe happens to the Uninsured Risk metric?',
    options: [
      'Uninsured Risk falls to ₹0 Lakh because banks automatically cover transit damage',
      'Uninsured Risk spikes to the full cargo value (₹300 Lakh), leaving the business exposed to total ruin upon loss',
      'The SBI Letter of Credit fee drops to zero',
      'The export ship icon disappears from the screen'
    ],
    correctIndex: 1,
    explanation: 'Without insurance, 100% of the financial risk falls upon the enterprise. Insurance does not prevent shipwrecks; it transfers the financial loss.',
    observableOptions: [
      'Uninsured Risk drops to ₹0 Lakh',
      'Uninsured Risk equals full cargo value (100% exposed)',
      'SBI fee becomes zero',
      'Dubai Port becomes inaccessible'
    ]
  },
  {
    id: 'obs_2',
    question: 'Observe the Bar Chart in the Production Department Lab: Comparing 100% Target to 140% Overdrive, what do you notice about the relationship between output and scrap?',
    options: [
      'Output rises from 5,000 to 7,000 units while scrap skyrockets from 150 kg to 960 kg (over 6x increase)',
      'Scrap remains strictly constant at 150 kg across all speed tiers',
      'Output decreases while scrap decreases',
      'Scrap becomes zero at 140% speed'
    ],
    correctIndex: 0,
    explanation: 'While output rises by 40% (5,000 to 7,000 units), scrap waste increases non-linearly by over 540% (150 kg to 960 kg), illustrating the classic production trade-off between quantity and quality.',
    observableOptions: [
      'Output rises +40% but scrap jumps >600% from 150 kg to 960 kg',
      'Scrap stays constant at 150 kg',
      'Output falls at higher speeds',
      'Scrap drops to zero at 140%'
    ]
  }
];

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Rajesh purchases ₹20 Lakh of fire insurance from ICICI Lombard for his Surat godown. Six months later, a short-circuit sparks a flame. What does the insurance actually do?',
  options: [
    'It prevents the fire from starting by using satellite thermal sensors',
    'It puts out the fire immediately with automated cloud sprinklers',
    'It transfers the financial loss by compensating Rajesh after the damage occurs',
    'It guarantees that the factory will never suffer physical damage'
  ],
  correctIndex: 2,
  hintAfter: 'Remember: Insurance is a risk-transfer mechanism that compensates financial loss — it does NOT physically prevent accidents or fires from occurring!',
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

// ──��� 24 RICH CHALLENGES (Foundation, Standard, Advanced) ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION 1 (Recall) - Banking & Insurance
  {
    id: 'ch_01',
    nodeId: NODE_C9_COMMSTUD_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the Banking Regulation Act 1949 and Insurance Act 1938, which bodies regulate Indian banking and insurance respectively?',
    options: [
      'SEBI and TRAI',
      'Reserve Bank of India (RBI) and IRDAI',
      'Ministry of Corporate Affairs and CCI',
      'NABARD and PFRDA'
    ],
    correctIndex: 1,
    explanation: 'Banking is regulated by the Reserve Bank of India (RBI, est. 1935), while Insurance is regulated by the Insurance Regulatory and Development Authority of India (IRDAI, est. 1999).',
    hints: [
      'Think of India’s central monetary bank and the dedicated insurance development authority.',
      'One issues bank notes; the other supervises insurers like LIC and ICICI Lombard.',
      'RBI governs banks under the 1949 Act; IRDAI oversees insurance under the 1938 Act.'
    ],
    misconceptionIndex: 0
  },
  // FOUNDATION 2 (Understanding) - Advertising vs Packaging
  {
    id: 'ch_02',
    nodeId: NODE_C9_COMMSTUD_012,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How do you distinguish between packaging and advertising using the physical touch test?',
    options: [
      'Advertising is always physical; packaging is digital broadcast',
      'Packaging is the physical, touchable cover protecting the product; advertising is the paid promotional message through mass media',
      'Both are identical in function because both only make products look pretty',
      'Packaging creates time utility while advertising creates place utility'
    ],
    correctIndex: 1,
    explanation: 'Packaging is the tangible protective wrapper/carton (e.g. tetra-pak, Amul foil). Advertising is the paid non-personal mass-media communication (e.g. TV commercial, digital ads).',
    hints: [
      'Can you physically hold a Cadbury wrapper in your hands?',
      'Packaging protects during storage and transport; advertising informs and persuades before the purchase.',
      'Touch test: If you can hold the wrapper, it is packaging; if it appears on TV or newspaper, it is advertising.'
    ],
    misconceptionIndex: 1
  },
  // FOUNDATION 3 (Understanding) - Sole Proprietorship vs OPC
  {
    id: 'ch_03',
    nodeId: NODE_C9_COMMSTUD_013,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Both a Sole Proprietorship and a One Person Company (OPC) have a single owner. What is the key legal difference?',
    options: [
      'Sole proprietor has limited liability; OPC owner has unlimited liability',
      'Sole proprietorship has a separate legal entity; OPC has no legal entity',
      'Sole proprietor has unlimited personal liability (no separate entity); OPC provides limited liability and a separate legal entity under Companies Act 2013',
      'There is no difference; OPC is just another name for a Kirana shop'
    ],
    correctIndex: 2,
    explanation: 'Under Section 2(62) of the Companies Act 2013, an OPC has a separate legal identity and gives the owner limited liability. A sole proprietor has unlimited personal liability.',
    hints: [
      'Consider what happens to the owner’s personal house if the business incurs massive debt.',
      'An OPC is incorporated under company law; sole proprietorship is governed by common law.',
      'OPC shields personal wealth with limited liability and separate legal personality.'
    ],
    misconceptionIndex: 2
  },
  // FOUNDATION 4 (Recall) - Public Sector forms
  {
    id: 'ch_04',
    nodeId: NODE_C9_COMMSTUD_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is classified as a Departmental Undertaking with employees as government servants and direct ministerial budget?',
    options: [
      'Oil and Natural Gas Corporation (ONGC)',
      'Life Insurance Corporation of India (LIC)',
      'Indian Railways (under Ministry of Railways)',
      'Maruti Suzuki India Limited'
    ],
    correctIndex: 2,
    explanation: 'Indian Railways is run directly as a department of the Ministry of Railways under Article 298 with no separate legal entity, making its staff civil servants.',
    hints: [
      'Look for the enterprise directly managed by a Union Ministry with its budget in the Union Budget.',
      'ONGC is a government company, LIC is a statutory corporation.',
      'Indian Railways operates directly under the Railway Ministry.'
    ],
    misconceptionIndex: 3
  },
  // FOUNDATION 5 (Recall) - 5 Ms of Production
  {
    id: 'ch_05',
    nodeId: NODE_C9_COMMSTUD_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The Production Department converts raw materials into outputs using the 5 Ms. What are the 5 Ms?',
    options: [
      'Men, Machines, Materials, Money, and Methods',
      'Marketing, Management, Media, Margins, and Money',
      'Manufacturing, Maintenance, Monitoring, Measurement, and Movement',
      'Merchandise, Models, Motives, Metrics, and Manpower'
    ],
    correctIndex: 0,
    explanation: 'The 5 Ms of production represent: Men (labour), Machines (equipment), Materials (inputs), Money (capital), and Methods (processes).',
    hints: [
      'Think of human labour, mechanical tools, physical inputs, financial resources, and operational techniques.',
      'Men, Machines, Materials...',
      'The classic 5 Ms are Men, Machines, Materials, Money, and Methods.'
    ]
  },
  // FOUNDATION 6 (Understanding) - Marketing vs Sales Timing
  {
    id: 'ch_06',
    nodeId: NODE_C9_COMMSTUD_016,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the fundamental timing difference between Marketing and Sales activities?',
    options: [
      'Sales happens before production; marketing happens after consumption',
      'Marketing occurs BEFORE the sale to identify needs and create desire; Sales happens AT the point of exchange to close the deal and collect money',
      'Marketing only deals with delivery trucks; Sales only writes advertisements',
      'Both happen simultaneously exclusively after receiving customer payment'
    ],
    correctIndex: 1,
    explanation: 'Rule of timing: Marketing happens BEFORE the sale (creating want and brand awareness); Sales happens AT the exchange (transferring goods for money).',
    hints: [
      'Does advertising create the desire before you walk into a shop, or after?',
      'Marketing builds the appetite; sales collects the cash and hands over the product.',
      'Marketing is prior to transaction; sales executes the transaction.'
    ]
  },
  // FOUNDATION 7 (Recall) - Communication Process Order
  {
    id: 'ch_07',
    nodeId: NODE_C9_COMMSTUD_019,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the 7 elements of the communication cycle in their exact sequential order.',
    sortItems: ['Sender', 'Encoding', 'Message', 'Channel', 'Receiver', 'Decoding', 'Feedback'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6],
    explanation: 'The communication cycle starts with the Sender, who Encodes the idea into a Message, transmitted via a Channel, received by the Receiver, who Decodes it and returns Feedback.',
    hints: [
      'Start with the originator of the thought (Sender) and end with the confirmation loop (Feedback).',
      'Encoding happens before transmission; decoding happens after reception.',
      'Sender -> Encoding -> Message -> Channel -> Receiver -> Decoding -> Feedback.'
    ]
  },
  // FOUNDATION 8 (Understanding) - Finance vs Accounting
  {
    id: 'ch_08',
    nodeId: NODE_C9_COMMSTUD_017,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which test best distinguishes the primary direction of Finance from Accounting?',
    options: [
      'Finance is backward-looking (tax receipts); Accounting is forward-looking (taking loans)',
      'Finance is forward-looking (planning where funds come from); Accounting is backward-looking (recording past transactions)',
      'Finance is solely handled by banks; Accounting is handled by lawyers',
      'Finance only counts coins; Accounting counts digital currency'
    ],
    correctIndex: 1,
    explanation: 'Finance looks forward (arranging future funds, capital structure); Accounting looks backward (recording, classifying, and reporting historical transactions).',
    hints: [
      'Think: "Finance finds the money; Accounting follows the money."',
      'Planning a loan for next year is finance; posting yesterday’s ledger entry is accounting.',
      'Finance = Forward-looking; Accounting = Backward-looking.'
    ]
  },

  // STANDARD 1 (Application) - Drag Label: Organizational Departments
  {
    id: 'ch_09',
    nodeId: NODE_C9_COMMSTUD_015,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Drag each organizational department to its primary core function in a modern enterprise.',
    dragItems: [
      { label: 'Production', targetId: 'dept_top' },
      { label: 'Marketing & Sales', targetId: 'dept_right' },
      { label: 'Finance & Accounts', targetId: 'dept_bottom' },
      { label: 'Human Resources', targetId: 'dept_left' }
    ],
    correctMapping: {
      dept_top: 'Production',
      dept_right: 'Marketing & Sales',
      dept_bottom: 'Finance & Accounts',
      dept_left: 'Human Resources'
    },
    explanation: 'Production creates the goods/services (5 Ms), Marketing & Sales builds demand & closes deals, Finance & Accounts funds operations & reports records, and HR develops & protects personnel.',
    hints: [
      'Top: The operational engine transforming inputs into steel, cars, or software.',
      'Right: The outward-facing team communicating value to customers.',
      'Bottom: The capital and financial tracking foundation.',
      'Left: The people development and welfare team.'
    ]
  },
  // STANDARD 2 (Application) - Numeric: Warehousing Time Utility & Inventory
  {
    id: 'ch_10',
    nodeId: NODE_C9_COMMSTUD_012,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A farmer procures 500 tonnes of wheat at ₹22,000/tonne in April. By storing it in a Central Warehousing Corporation (CWC) godown at ₹500/tonne storage fee, he sells it in November for ₹28,000/tonne. What is his net profit after warehousing in Lakhs of Rupees? (1 Lakh = 1,00,000)',
    correctAnswer: 27.5,
    tolerance: 0.1,
    unit: 'Lakh ₹',
    explanation: 'Total revenue = 500 × ₹28,000 = ₹1,40,00,000. Total cost = 500 × (₹22,000 + ₹500) = ₹1,12,50,000. Net profit = ₹27,50,000 = 27.5 Lakh ₹. Warehousing created time utility!',
    hints: [
      'Calculate revenue in November: 500 × ₹28,000 = ₹140 Lakh.',
      'Calculate total procurement plus CWC warehouse cost: 500 × ₹22,500 = ₹112.5 Lakh.',
      'Net Profit = 140 - 112.5 = 27.5 Lakh ₹.'
    ]
  },
  // STANDARD 3 (Analysis) - Service Production
  {
    id: 'ch_11',
    nodeId: NODE_C9_COMMSTUD_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student claims: "NTPC generates electricity and TCS builds software; since neither produces tangible physical goods you can touch, neither has a Production Department." How do you evaluate this?',
    options: [
      'The student is correct; service firms have no production operations',
      'The student is incorrect; production includes both tangible manufacturing and intangible service creation (converting coal into electricity or code into software)',
      'The student is partially correct because only software is a service',
      'The student is correct because electricity is an agricultural commodity'
    ],
    correctIndex: 1,
    explanation: 'Production is the broad creation of utilities encompassing tangible goods (manufacturing) and intangible services (electricity generation at NTPC, software engineering at TCS).',
    hints: [
      'Does NTPC transform coal and heat into 2,600 MW of power using machines and methods?',
      'All manufacturing is production, but not all production is manufacturing.',
      'Service creation using inputs and processes IS production in commercial studies.'
    ],
    misconceptionIndex: 4
  },
  // STANDARD 4 (Application) - Partnership Liability Analysis
  {
    id: 'ch_12',
    nodeId: NODE_C9_COMMSTUD_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Aman and Bharat run a partnership under the Partnership Act 1932. Due to Aman’s poor decision, the firm incurs a debt of ₹40 Lakh with only ₹10 Lakh in firm assets. Creditors sue Bharat alone for the remaining ₹30 Lakh. Is Bharat personally liable?',
    options: [
      'No, because Aman made the bad decision, so only Aman pays',
      'Yes, because partners have joint and several unlimited liability; creditors can recover the entire balance from any partner’s personal assets',
      'No, partners are shielded by corporate limited liability',
      'Only up to 50% of the initial capital contribution'
    ],
    correctIndex: 1,
    explanation: 'Under the Indian Partnership Act 1932, partners have joint and several unlimited liability. Creditors can recover all outstanding debts from any individual partner’s personal property.',
    hints: [
      'Think of "joint and several" liability.',
      'In a traditional partnership, individual partner mistakes bind the other partners personally.',
      'Bharat’s personal assets are fully exposed to pay the firm’s creditors.'
    ]
  },
  // STANDARD 5 (Analysis) - Channel vs Medium
  {
    id: 'ch_13',
    nodeId: NODE_C9_COMMSTUD_019,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'HDFC Bank sends an urgent loan sanction PDF document via its encrypted online web portal. Identify the Channel and Medium.',
    options: [
      'Channel = PDF document; Medium = Internet',
      'Channel = Electronic (Internet infrastructure); Medium = Encrypted PDF notification message',
      'Channel = Postal; Medium = Speed Post envelope',
      'Channel = Oral; Medium = Face-to-face consultation'
    ],
    correctIndex: 1,
    explanation: 'The Channel is the broad route/pathway (Electronic/Internet), while the Medium is the specific form the message takes (the PDF document message).',
    hints: [
      'Remember the metaphor: Channel is the road; Medium is the vehicle on the road.',
      'Electronic transmission pathway = Channel.',
      'The PDF document content = Medium.'
    ]
  },
  // STANDARD 6 (Application) - Role of Communication: Coordination
  {
    id: 'ch_14',
    nodeId: NODE_C9_COMMSTUD_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Asian Paints’ marketing team forecasts that "Teal Tide" shade will trend during Diwali and informs the Bhandup plant manager to produce 50,000 litres. Which role of communication is demonstrated?',
    options: [
      'Motivation of line workers',
      'Inter-departmental Coordination (aligning production with forecasted market demand)',
      'Statutory compliance filing',
      'External public relations advertising'
    ],
    correctIndex: 1,
    explanation: 'Coordination links separate functional departments (Marketing and Production) so they do not work at cross-purposes, preventing excess or deficit stock.',
    hints: [
      'Two departments are aligning their plans so that output matches customer appetite.',
      'Without this message, the factory might manufacture unwanted shades.',
      'Aligning departments towards a single business goal is Coordination.'
    ]
  },
  // STANDARD 7 (Application) - HR Strategic vs Personnel Admin
  {
    id: 'ch_15',
    nodeId: NODE_C9_COMMSTUD_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Infosys designs a 16-week residential software and AI training curriculum at its Mysuru campus for 50,000 engineering recruits. This is an example of:',
    options: [
      'Routine personnel record-keeping administration',
      'Strategic HR training & capability development aligning talent with future business goals',
      'Statutory labour court arbitration',
      'Sales promotion incentive'
    ],
    correctIndex: 1,
    explanation: 'Modern HR is strategic and development-oriented, investing in people capabilities to drive long-term organizational competitiveness.',
    hints: [
      'Is updating attendance registers the same as building advanced AI software skills?',
      'Strategic HR builds the human capital of the enterprise.',
      'Training and development at scale is a strategic HR objective.'
    ]
  },
  // STANDARD 8 (Evaluation) - Joint Sector Definition
  {
    id: 'ch_16',
    nodeId: NODE_C9_COMMSTUD_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'What is the defining characteristic of a Joint Sector Enterprise such as Maruti Suzuki during its 1982 incorporation?',
    options: [
      '100% ownership by the Central Government alone',
      'Shared capital and management between the Government (e.g. 26-51%) and private entrepreneurs (e.g. Suzuki)',
      'Zero private investment with no Board of Directors',
      'It is an unregistered partnership between two state governments'
    ],
    correctIndex: 1,
    explanation: 'A joint sector enterprise combines public government funds/policy support with private capital, technology, and managerial expertise under the Companies Act.',
    hints: [
      'Think of partnership between the state and a private industrial partner.',
      'Government brings land and policy; private enterprise brings modern technology.',
      'Shared public + private capital and governance defines the joint sector.'
    ]
  },

  // ADVANCED 1 (Analysis) - Construct: Communication Breakdown Recovery
  {
    id: 'ch_17',
    nodeId: NODE_C9_COMMSTUD_019,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Assemble the 4 essential steps to eliminate semantic noise and complete an organizational communication loop.',
    availableParts: ['Plain Language Encoding', 'Secure Transmission Channel', 'Receiver Decoding', 'Verifiable Feedback Response', 'Secret Jargon Code'],
    targetState: 'Plain Language Encoding Secure Transmission Channel Receiver Decoding Verifiable Feedback Response',
    validationHint: 'Select the 4 components in correct sequential order without adding jargon.',
    explanation: 'To overcome semantic noise: (1) Encode in plain words, (2) transmit via reliable channel, (3) enable accurate receiver decoding, and (4) receive verified feedback.',
    hints: [
      'Avoid "Secret Jargon Code" as jargon creates semantic noise!',
      'Follow the forward flow from Encoding to Feedback.',
      'Plain Language Encoding -> Secure Transmission Channel -> Receiver Decoding -> Verifiable Feedback Response.'
    ]
  },
  // ADVANCED 2 (Evaluation) - Form of Enterprise Optimization
  {
    id: 'ch_18',
    nodeId: NODE_C9_COMMSTUD_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Four chartered accountants in Mumbai want to pool ₹2 Crore capital and manage clients together. They want protection against personal bankruptcy if one partner commits professional negligence. Which form is ideal?',
    options: [
      'Traditional Partnership under Partnership Act 1932',
      'Sole Proprietorship',
      'Limited Liability Partnership (LLP) under LLP Act 2008',
      'Departmental Undertaking under Article 298'
    ],
    correctIndex: 2,
    explanation: 'An LLP combines operational flexibility of a partnership with corporate limited liability, protecting innocent partners from personal liability for another partner’s malpractice.',
    hints: [
      'A traditional partnership would expose all partners to unlimited liability.',
      'A company has heavier statutory filing requirements; an LLP is built specifically for professionals.',
      'The LLP Act 2008 was enacted precisely for professional firms like Big Four consulting and CAs.'
    ]
  },
  // ADVANCED 3 (Analysis) - Production Objectives Trade-off
  {
    id: 'ch_19',
    nodeId: NODE_C9_COMMSTUD_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Tata Steel Jamshedpur pushes its blast furnaces beyond rated capacity to hit 110% quantity. Consequently, carbon purity variance increases and scrap rate jumps from 2% to 7%. Which objective conflict has occurred?',
    options: [
      'Right Time vs Right Place',
      'Right Quantity pushed at the expense of Right Quality and Minimum Waste',
      'Statutory compliance vs Employee Motivation',
      'Advertising vs Packaging utility'
    ],
    correctIndex: 1,
    explanation: 'Production management requires balancing the 5 objectives. Maximizing quantity alone often impairs quality tolerances and triggers costly material wastage.',
    hints: [
      'Notice that volume went up, but defects and scrap multiplied.',
      'Production is an optimization problem balancing Quality, Quantity, Cost, Time, and Waste.',
      'Quantity was maximized while Quality and Waste controls deteriorated.'
    ]
  },
  // ADVANCED 4 (Evaluation) - Finance vs Accounting Case Analysis
  {
    id: 'ch_20',
    nodeId: NODE_C9_COMMSTUD_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Tata Motors plans a ₹5,000 Crore EV expansion at Sanand. Step A: CFO issues 8.1% Non-Convertible Debentures (NCDs) after comparing equity vs debt. Step B: Chief Accountant posts quarterly interest and files Ind-AS balance sheet disclosures. How are Step A and B classified?',
    options: [
      'Step A is Accounting (recording); Step B is Finance (planning)',
      'Step A is Finance (forward-looking fund arrangement); Step B is Accounting (backward-looking transaction recording and reporting)',
      'Both are purely statutory HR activities under Factories Act',
      'Both are Marketing sales promotion campaigns'
    ],
    correctIndex: 1,
    explanation: 'Step A is Finance (determining capital structure and raising capital forward). Step B is Accounting (recording interest accruals, compliance with Schedule III under Companies Act).',
    hints: [
      'Who decides where to get ₹5,000 Crore? Finance.',
      'Who writes the debentures in the balance sheet and calculates interest due? Accounting.',
      'Step A = Finance (forward funding); Step B = Accounting (historical reporting).'
    ]
  },
  // ADVANCED 5 (Application) - Numeric: Letter of Credit & Insurance Cover
  {
    id: 'ch_21',
    nodeId: NODE_C9_COMMSTUD_011,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A Surat textile exporter ships ₹3 Crore worth of silk to Dubai. SBI charges 1% fee to issue an export Letter of Credit (LC), and New India Assurance charges 0.5% premium for marine cargo insurance. What is the total combined cost in Lakhs of Rupees for both financial aids to trade? (1 Lakh = 1,00,000)',
    correctAnswer: 4.5,
    tolerance: 0.1,
    unit: 'Lakh ₹',
    explanation: 'SBI Bank LC fee = 1% of ₹300 Lakh = ₹3 Lakh. New India Assurance marine policy = 0.5% of ₹300 Lakh = ₹1.5 Lakh. Total aid cost = 3 + 1.5 = 4.5 Lakh ₹.',
    hints: [
      'Convert ₹3 Crore to Lakhs: 300 Lakh ₹.',
      'Calculate 1% of 300 Lakh (Banking cost) and 0.5% of 300 Lakh (Insurance cost).',
      '3 Lakh + 1.5 Lakh = 4.5 Lakh ₹.'
    ]
  },
  // ADVANCED 6 (Analysis) - Public Corporation vs Government Company
  {
    id: 'ch_22',
    nodeId: NODE_C9_COMMSTUD_014,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why can ONGC alter its corporate objects by shareholder resolution under the Companies Act 2013, whereas LIC requires an Act of Parliament to alter its core powers?',
    options: [
      'ONGC is private while LIC is owned by foreign banks',
      'ONGC is a Government Company registered under Companies Act 2013; LIC is a Public Statutory Corporation created by the LIC Act 1956',
      'LIC is a departmental undertaking with no charter',
      'Government companies are unregulated by Indian law'
    ],
    correctIndex: 1,
    explanation: 'Public Corporations (LIC, FCI) are established by special legislative statutes and require parliamentary amendment; Government Companies (ONGC, SAIL) are governed by corporate charters under company law.',
    hints: [
      'Look at the founding legal instrument of both institutions.',
      'LIC Act 1956 is a parliamentary statute; ONGC has a Memorandum of Association under Companies Act.',
      'Statutory corporations require legislative acts to amend powers.'
    ]
  },
  // ADVANCED 7 (Creativity) - Communication Role in Crisis Management
  {
    id: 'ch_23',
    nodeId: NODE_C9_COMMSTUD_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'When a bank experiences depositor panic due to social media rumours, which two communication roles must executive management immediately deploy to restore stability?',
    options: [
      'Internal sales promotion and scrap minimization',
      'Transparent Information-Sharing with public and Relationship-Building to reassure depositors',
      'Only downward disciplinary reprimands to junior clerks',
      'Filing trademark applications with ASCI'
    ],
    correctIndex: 1,
    explanation: 'In a run on a bank (e.g. Yes Bank 2020), accurate information-sharing on liquidity safety and proactive relationship-building quell panic and restore public trust.',
    hints: [
      'How does management counter wild rumors and prevent depositors from pulling deposits?',
      'Open facts (information-sharing) + trust restoration (relationship-building).',
      'Information-sharing and Relationship-building are vital crisis tools.'
    ]
  },
  // ADVANCED 8 (Evaluation) - Marketing Demand Creation
  {
    id: 'ch_24',
    nodeId: NODE_C9_COMMSTUD_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Reliance Jio offered 100% free 4G data in Sept 2016, acquiring 100 million users in 170 days without collecting money upfront. Why was this primarily a Marketing strategy rather than a Sales action?',
    options: [
      'Because the SIM cards were transported by India Post',
      'Because it focused on market penetration, brand building, and demand creation before paid monetization',
      'Because telecom operations do not have a sales department',
      'Because it was classified as a non-profit charity'
    ],
    correctIndex: 1,
    explanation: 'Since no money was exchanged for service during the free window, the initiative aimed at demand creation, habit formation, and customer acquisition (Marketing), which sales monetized later.',
    hints: [
      'Did Jio collect sales revenue during the free trial period?',
      'Marketing creates the want and adopts the market; sales converts the demand into revenue.',
      'It built brand affinity and massive demand before paid conversion.'
    ]
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

const DEFAULT_PROPS: Props = {
  nodeId: 'c9_commstud_011',
  title: 'Commercial Studies: Aids to Trade, Ownership Forms & Departmental Operations',
  definition: 'Commercial Studies encompasses the comprehensive machinery of commerce: Aids to Trade (Banking, Insurance, Advertising, Warehousing, Packaging), Forms of Ownership (Private, Public, Joint Sector), Core Internal Departments (Production, Marketing, Finance, HR), and Organizational Communication.',
  eli5: 'Think of business like building a championship IPL team: you need fuel & safety (banking & insurance), a solid home stadium (warehousing & packaging), a passionate fan base (advertising & marketing), the right team constitution (company structure), dedicated players (HR & Production), financial sponsors (Finance & Accounts), and clear captain instructions (Communication)!',
  misconceptions: [
    { misconception: 'Insurance prevents loss from happening', correction: 'Insurance transfers financial impact through compensation after loss occurs; it does not physically stop fires or shipwrecks.' },
    { misconception: 'Packaging and Advertising are the same promotional aid', correction: 'Packaging is the physical touchable protective/display container; advertising is the paid non-personal mass-media message.' },
    { misconception: 'One Person Company (OPC) is identical to a Sole Proprietorship', correction: 'An OPC has a separate legal entity and limited liability under Companies Act 2013; a sole proprietorship has unlimited liability and no separate entity.' },
    { misconception: 'Every government-owned enterprise is a Departmental Undertaking', correction: 'ONGC and SAIL are Government Companies under Companies Act; LIC is a Statutory Corporation; only entities directly run by ministries (Indian Railways) are Departmental Undertakings.' },
    { misconception: 'Service companies like NTPC and TCS have no Production Department', correction: 'Production encompasses both tangible manufacturing (steel) and intangible service production (electricity generation, software development).' },
  ],
  diagnosticQuestions: [
    { question: 'What does insurance do in commercial trade?', options: ['Extinguishes fires', 'Transfers financial risk of loss for a premium', 'Guarantees 100% profit', 'Eliminates road accidents'], correctIndex: 1 },
    { question: 'Which aid to trade creates Time Utility?', options: ['Advertising', 'Warehousing', 'Banking', 'Insurance'], correctIndex: 1 },
    { question: 'What is the liability of partners under Partnership Act 1932?', options: ['Limited to ₹10,000', 'Unlimited, joint and several', 'Zero liability', 'Limited to share capital'], correctIndex: 1 },
    { question: 'Which body regulates Indian banking under the 1949 Act?', options: ['SEBI', 'RBI', 'IRDAI', 'CCI'], correctIndex: 1 },
    { question: 'What are the 5 Ms of Production?', options: ['Men, Machines, Materials, Money, Methods', 'Media, Money, Markets, Motives, Men', 'Management, Metrics, Methods, Models, Margins', 'Machinery, Maintenance, Money, Men, Media'], correctIndex: 0 },
    { question: 'When does Marketing occur relative to Sales?', options: ['Simultaneously only', 'Before the sale to create demand', 'Only after customer pays', 'Never in retail'], correctIndex: 1 },
    { question: 'What is the primary orientation of Finance?', options: ['Backward-looking ledger posting', 'Forward-looking planning and fund sourcing', 'Checking employee leave', 'Designing advertisements'], correctIndex: 1 },
    { question: 'What closes the 7-element communication cycle?', options: ['Encoding', 'Message', 'Channel', 'Feedback'], correctIndex: 3 },
  ],
  masteryCriteria: 'Master all 10 Commercial Studies nodes: aids to trade, enterprise forms, internal departments (5 Ms, timing, direction), and 7-element communication cycles.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (Learn by Doing) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Aids to Trade & Risk Transfer Simulator',
    instruction: 'Adjust the export cargo value and risk level slider to observe how SBI Bank Letters of Credit and New India Marine Insurance secure the transaction in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_COMMSTUD_011,
  },
  {
    title: '2. Warehousing Time Utility & Cold Chain Godown',
    instruction: 'Change the storage duration slider (months) to watch seasonal wheat & milk preserve market value from harvest to off-season peak.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_COMMSTUD_012,
  },
  {
    title: '3. Ownership Structure Matrix: Unlimited vs Limited Liability',
    instruction: 'Click on different business models (Sole Prop, Partnership, OPC, LLP, JSC, PSU) to inspect legal personality and personal asset risk.',
    interactionType: 'click-parts',
    nodeId: NODE_C9_COMMSTUD_013,
  },
  {
    title: '4. The 4 Core Enterprise Departments in Action',
    instruction: 'Click on Production, Marketing & Sales, Finance & Accounts, or HR to simulate resource allocation in a ₹100 Crore manufacturing plant.',
    interactionType: 'click-parts',
    nodeId: NODE_C9_COMMSTUD_015,
  },
  {
    title: '5. The 7-Element Communication Transmission Loop',
    instruction: 'Select communication channels (Postal, Spoken, Digital Portal) to trace message encoding, decoding, and feedback while avoiding noise.',
    interactionType: 'click-parts',
    nodeId: NODE_C9_COMMSTUD_019,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Operating Officer (COO) Enterprise Blueprint',
  description: 'Design a comprehensive business plan for a new Indian organic snack brand (e.g., "Millet Magic"). Outline the required aids to trade, legal ownership form, departmental KPIs, and the communication channel structure.',
  steps: [
    'Choose an optimal legal structure (e.g. LLP or Private Ltd) to ensure limited liability.',
    'List banking facilities (SBI working capital loan) and insurance policies (ICICI Lombard fire & transit cover).',
    'Set 5 Ms and quality KPIs for the Production Department (ISO 9001, defect rate < 50 PPM).',
    'Map the 7-element communication protocol between Marketing, Sales, and Warehouse logistics.',
  ],
};

function C9_CommercialStudiesAidsTradeBankingSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commstud'] || { name: 'Commercial Studies', emoji: '📊', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant-style discovery states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Brilliant-style Predict-then-Check & Observation states in Exploration
  const [activePredictionIdx, setActivePredictionIdx] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [showPredictionFeedback, setShowPredictionFeedback] = useState<Record<number, boolean>>({});

  const [activeObservationIdx, setActiveObservationIdx] = useState<number | null>(null);
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});
  const [showObservationFeedback, setShowObservationFeedback] = useState<Record<number, boolean>>({});

  // Interactive Exploration & Sandbox variables (real-time slider connected to visualization)
  const [cargoValueCr, setCargoValueCr] = useState<number>(3); // 1 to 10 Cr
  const [hasInsurance, setHasInsurance] = useState<boolean>(true);
  const [hasBankLC, setHasBankLC] = useState<boolean>(true);
  const [storageMonths, setStorageMonths] = useState<number>(6); // 1 to 12 months
  const [selectedEntity, setSelectedEntity] = useState<string>('opc');
  const [selectedDept, setSelectedDept] = useState<string>('production');
  const [selectedCommChannel, setSelectedCommChannel] = useState<string>('digital');
  const [prodSpeed, setProdSpeed] = useState<number>(100); // 70% to 140%
  const [feedbackLoopActive, setFeedbackLoopActive] = useState<boolean>(true);
  const [showNoiseDistortion, setShowNoiseDistortion] = useState<boolean>(false);

  // Challenge states
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // Escalating hints and feedback
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Non-MCQ challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({
    q1: '',
    q2: '',
    q3: ''
  });

  // BKT Ref & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── CALCULATED EXPLORATION DATA ───
  const tradeFinanceData = useMemo(() => {
    const cargoLakh = cargoValueCr * 100;
    const sbiFeeLakh = hasBankLC ? +(cargoLakh * 0.01).toFixed(2) : 0;
    const insurancePremiumLakh = hasInsurance ? +(cargoLakh * 0.005).toFixed(2) : 0;
    const totalCoverLakh = hasInsurance ? cargoLakh : 0;
    const uninsuredRiskLakh = hasInsurance ? 0 : cargoLakh;
    return { cargoLakh, sbiFeeLakh, insurancePremiumLakh, totalCoverLakh, uninsuredRiskLakh };
  }, [cargoValueCr, hasInsurance, hasBankLC]);

  const warehouseEconomics = useMemo(() => {
    const harvestCostPerTonne = 22000;
    const storageFeePerMonth = 100;
    const totalStorageCost = storageMonths * storageFeePerMonth;
    const seasonalPricePerTonne = 22000 + storageMonths * 1000;
    const netGainPerTonne = seasonalPricePerTonne - (harvestCostPerTonne + totalStorageCost);
    return { harvestCostPerTonne, totalStorageCost, seasonalPricePerTonne, netGainPerTonne };
  }, [storageMonths]);

  const departmentMetrics = useMemo(() => {
    const baseOutput = 5000;
    const output = Math.round(baseOutput * (prodSpeed / 100));
    const defectRate = prodSpeed > 100 ? +(1.5 + (prodSpeed - 100) * 0.1).toFixed(1) : 1.2;
    const scrapKg = Math.round(output * (defectRate / 100) * 2.5);
    const costPerUnit = +(420 + (prodSpeed > 115 ? (prodSpeed - 115) * 1.8 : 0)).toFixed(1);
    return { output, defectRate, scrapKg, costPerUnit };
  }, [prodSpeed]);

  const prodChartData = useMemo(() => {
    return [
      { name: '80% Speed', output: 4000, scrap: 120, cost: 420 },
      { name: '100% Target', output: 5000, scrap: 150, cost: 420 },
      { name: '120% High', output: 6000, scrap: 525, cost: 429 },
      { name: '140% Overdrive', output: 7000, scrap: 960, cost: 465 },
    ];
  }, []);

  // ─── INITIAL LOAD FROM LOCALSTORAGE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT UPDATE EFFECT ───
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

  // ─── 2D CANVAS ANIMATION (Transaction & Communication Packet Loop) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let packetX = 20;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(20, 20);
      ctx.lineTo(canvas.width - 20, 20);
      ctx.stroke();

      const nodes = [
        { name: 'Prod', x: 30, color: '#38bdf8' },
        { name: 'Mktg', x: 110, color: '#f59e0b' },
        { name: 'Fin', x: 190, color: '#10b981' },
        { name: 'HR', x: 270, color: '#ec4899' },
      ];

      nodes.forEach(n => {
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, 20, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.fillText(n.name, n.x - 10, 36);
      });

      packetX = (packetX + 1.2) % (canvas.width - 40);
      ctx.fillStyle = '#a855f7';
      ctx.beginPath();
      ctx.arc(20 + packetX, 20, 4.5, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentSlide]);

  // ─── ESCALATING HINT HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      const hintMsg = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the step-by-step ICSE explanation together.');
    }
  }, [hintCount, activeChallenge]);

  // ─��─ AUTO HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((index: number) => {
    const isCorrect = index === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on! Insurance compensates losses after they occur.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PREDICTION HANDLER ───
  const handlePredictionSubmit = (predIdx: number, optIdx: number) => {
    setPredictionAnswers(prev => ({ ...prev, [predIdx]: optIdx }));
    setShowPredictionFeedback(prev => ({ ...prev, [predIdx]: true }));
    const isCorrect = optIdx === PREDICTION_QUESTIONS[predIdx].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great intuition! Now verify your prediction with the interactive controls.' : 'Good guess! Now interact with the lab to discover why.');
  };

  // ─── OBSERVATION HANDLER ───
  const handleObservationSubmit = (obsIdx: number, optIdx: number) => {
    setObservationAnswers(prev => ({ ...prev, [obsIdx]: optIdx }));
    setShowObservationFeedback(prev => ({ ...prev, [obsIdx]: true }));
    const isCorrect = optIdx === OBSERVATION_QUESTIONS[obsIdx].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot-on observation! You noticed the core commercial pattern.' : 'Take another look at the lab visualization to confirm the pattern.');
  };

  // ─── ADVANCE PHASE HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Commerce Labs. Manipulate variables to discover real-world business dynamics.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Adjust parameters with no grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Mode activated. Test your mastery across all ten Commercial Studies topics.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Magnificent performance! You scored ${finalScore} percent and mastered Commercial Studies.`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
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

  // ─── ANSWER EVALUATION HANDLER ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numVal = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numVal - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0.1);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = (answer as string).trim() === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Brilliant! That is completely correct.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + activeChallenge.nodeId, '85');
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
        speechManager.speak('Let us study the complete ICSE reasoning step-by-step.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // ─── DRAG AND DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
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
      const current = prev.length > 0 ? [...prev] : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      return current;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const submission = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(submission);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl">
      {/* ─── HEADER / SUBJECT BANNER ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-800/80 backdrop-blur rounded-2xl border border-slate-700/60"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-xl border border-gold-500/30">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-wide">{title}</h1>
            <p className="text-xs text-gold-300 font-medium">Class 9 ICSE Commercial Studies • Comprehensive 10-Node Mastery Lab</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider ${
              difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
              difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
              'bg-gold-500/20 text-gold-300 border border-gold-500/30'
            }`}
          >
            {difficulty} Level
          </motion.span>
          <span className="text-xs px-3 py-1.5 bg-slate-700/50 rounded-full text-slate-300">
            Mastery: <strong className="text-amber-400 capitalize">{masteryLevel}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/70 to-slate-900 rounded-2xl border border-gold-700/50">
            <h2 className="text-xl font-bold text-gold-200 flex items-center gap-2">
              <span>🏛️</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-gold-900/40 rounded-xl border border-gold-500/20">
              <p className="text-xs text-gold-300"><strong>Mission:</strong> {SCENARIO.context}</p>
            </div>
          </div>

          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Curiosity Hook • Predict First</span>
              <span className="text-xs text-slate-400">Non-graded exploration</span>
            </div>
            <p className="text-base md:text-lg font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`p-4 text-left text-sm rounded-xl border transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-medium'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-800/50 border-slate-700/40 text-slate-400'
                      : 'bg-slate-800 border-slate-700 hover:border-gold-500 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-xs text-center leading-6 mr-2 font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! Insurance is a risk-transfer mechanism.' : `👉 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Advance to Interactive Exploration"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (Interactive Guided Labs with Real-Time Visualization Sliders) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gold-300">Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}</h2>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? 'w-8 bg-gold-500' : 'w-2.5 bg-slate-700'
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
              className="p-5 md:p-6 bg-slate-800 rounded-2xl border border-slate-700 space-y-6"
            >
              <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40 flex items-start gap-2">
                <span className="text-amber-400 text-lg">💡</span>
                <p className="text-xs md:text-sm text-gold-200"><strong>Instruction:</strong> {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: Banking & Insurance Risk Transfer */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 space-y-4">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-semibold text-slate-300">Export Cargo Value: ₹{cargoValueCr} Crore</label>
                          <span className="text-xs text-gold-400 font-mono">({tradeFinanceData.cargoLakh} Lakh ₹)</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={10}
                          step={0.5}
                          value={cargoValueCr}
                          onChange={(e) => setCargoValueCr(Number(e.target.value))}
                          aria-label="Export Cargo Value Slider"
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => { setHasBankLC(!hasBankLC); audioManager.play('tap'); }}
                          className={`p-3 rounded-xl border text-left text-xs ${
                            hasBankLC ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-700 text-slate-400'
                          }`}
                        >
                          <div className="font-bold flex items-center justify-between">
                            <span>SBI Letter of Credit</span>
                            <span>{hasBankLC ? '✓ Active' : '✕ None'}</span>
                          </div>
                          <p className="mt-1 text-[11px] opacity-80">Guarantees buyer payment</p>
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => { setHasInsurance(!hasInsurance); audioManager.play('tap'); }}
                          className={`p-3 rounded-xl border text-left text-xs ${
                            hasInsurance ? 'bg-gold-950/60 border-gold-500 text-gold-200' : 'bg-rose-950/60 border-rose-500 text-rose-300'
                          }`}
                        >
                          <div className="font-bold flex items-center justify-between">
                            <span>Marine Insurance</span>
                            <span>{hasInsurance ? '✓ Protected' : '⚠ Exposed'}</span>
                          </div>
                          <p className="mt-1 text-[11px] opacity-80">Transfers transit loss</p>
                        </motion.button>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>SBI 1% Working Capital / LC Fee:</span>
                          <span className="font-bold text-emerald-400">₹{tradeFinanceData.sbiFeeLakh} Lakh</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>New India Assurance 0.5% Premium:</span>
                          <span className="font-bold text-gold-400">₹{tradeFinanceData.insurancePremiumLakh} Lakh</span>
                        </div>
                        <div className="pt-2 border-t border-slate-800 flex justify-between font-bold">
                          <span>Financial Loss Absorbed if Ship Sinks:</span>
                          <span className={tradeFinanceData.uninsuredRiskLakh > 0 ? 'text-rose-400' : 'text-emerald-400'}>
                            ₹{tradeFinanceData.uninsuredRiskLakh} Lakh {tradeFinanceData.uninsuredRiskLakh > 0 && '(Trader Ruined!)'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Visual SVG Ship & Bank Hub */}
                    <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
                      <svg viewBox="0 0 400 200" className="w-full h-auto">
                        <rect x="10" y="130" width="380" height="60" rx="10" fill="#0f172a" stroke="#1e293b" />
                        <path d="M10,150 Q100,140 200,150 T390,150" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />

                        <rect x="20" y="30" width="80" height="60" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                        <text x="60" y="55" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">Surat Exporter</text>
                        <text x="60" y="72" textAnchor="middle" fill="#818cf8" fontSize="8">₹{cargoValueCr} Cr Goods</text>

                        <rect x="160" y="20" width="80" height="40" rx="6" fill="#064e3b" stroke="#10b981" />
                        <text x="200" y="38" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">SBI Bank (RBI)</text>
                        <text x="200" y="50" textAnchor="middle" fill="#6ee7b7" fontSize="7">LC & Credit</text>

                        <rect x="160" y="70" width="80" height="40" rx="6" fill="#312e81" stroke="#818cf8" />
                        <text x="200" y="88" textAnchor="middle" fill="#e0e7ff" fontSize="9" fontWeight="bold">New India (IRDAI)</text>
                        <text x="200" y="100" textAnchor="middle" fill="#a5b4fc" fontSize="7">Marine Policy</text>

                        <g transform="translate(280, 100)">
                          <path d="M0,30 L80,30 L70,50 L10,50 Z" fill="#475569" stroke="#94a3b8" />
                          <rect x="15" y="10" width="20" height="20" fill={hasInsurance ? '#10b981' : '#f43f5e'} />
                          <rect x="40" y="10" width="20" height="20" fill={hasBankLC ? '#6366f1' : '#f43f5e'} />
                          <text x="40" y="24" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">CARGO</text>
                          <text x="40" y="44" textAnchor="middle" fill="#f8fafc" fontSize="7">Dubai Port</text>
                        </g>

                        <path d="M100,60 L160,40" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                        <path d="M100,60 L160,90" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" />
                        <path d="M240,65 L280,120" stroke="#f59e0b" strokeWidth="2" />
                      </svg>
                      <p className="text-[11px] text-slate-400 mt-2 text-center">
                        Banking provides <strong>liquidity & guarantee</strong>; Insurance provides <strong>risk transfer</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Brilliant Observation Check 1 */}
                  <div className="p-4 bg-slate-900/90 rounded-xl border border-gold-500/30">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
                      👁️ Observation Check: What do you notice?
                    </span>
                    <p className="text-xs md:text-sm text-slate-200 mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleObservationSubmit(0, oIdx)}
                          className={`p-2.5 text-left text-xs rounded-lg border transition-all ${
                            showObservationFeedback[0] && oIdx === OBSERVATION_QUESTIONS[0].correctIndex
                              ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-semibold'
                              : showObservationFeedback[0] && observationAnswers[0] === oIdx
                              ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                              : 'bg-slate-800 border-slate-700 hover:border-gold-400 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {showObservationFeedback[0] && (
                      <p className="text-xs text-gold-300 mt-2">{OBSERVATION_QUESTIONS[0].explanation}</p>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 1: Warehousing Time Utility */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* Brilliant Prediction Question 2 */}
                  <div className="p-4 bg-slate-900/90 rounded-xl border border-amber-500/30">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                      🔮 Predict Before Interacting
                    </span>
                    <p className="text-xs md:text-sm text-slate-200 mb-3">{PREDICTION_QUESTIONS[1].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[1].options.map((opt, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handlePredictionSubmit(1, pIdx)}
                          className={`p-2.5 text-left text-xs rounded-lg border transition-all ${
                            showPredictionFeedback[1] && pIdx === PREDICTION_QUESTIONS[1].correctIndex
                              ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-semibold'
                              : showPredictionFeedback[1] && predictionAnswers[1] === pIdx
                              ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                              : 'bg-slate-800 border-slate-700 hover:border-amber-400 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {showPredictionFeedback[1] && (
                      <div className="mt-2 p-2 bg-slate-950 rounded border border-slate-800 text-xs text-amber-200">
                        <strong>Verify instruction:</strong> {PREDICTION_QUESTIONS[1].verifyInstruction}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 space-y-4">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-semibold text-slate-300">Storage Duration in CWC Godown: {storageMonths} Months</label>
                          <span className="text-xs text-amber-400 font-mono">Harvest (April) → Off-Season (Month +{storageMonths})</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={10}
                          value={storageMonths}
                          onChange={(e) => setStorageMonths(Number(e.target.value))}
                          aria-label="Storage Duration Months Slider"
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                          <p className="text-[11px] text-slate-400">Harvest Cost</p>
                          <p className="text-sm font-bold text-slate-200 mt-1">₹{warehouseEconomics.harvestCostPerTonne}/t</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                          <p className="text-[11px] text-slate-400">CWC Storage Fee</p>
                          <p className="text-sm font-bold text-gold-400 mt-1">₹{warehouseEconomics.totalStorageCost}/t</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                          <p className="text-[11px] text-slate-400">Off-Season Sale</p>
                          <p className="text-sm font-bold text-emerald-400 mt-1">₹{warehouseEconomics.seasonalPricePerTonne}/t</p>
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
                        <p className="text-xs text-emerald-300">
                          <strong>Time Utility Created:</strong> By preserving quality and bridging temporal scarcity, the trader gains{' '}
                          <span className="font-bold text-amber-300">₹{warehouseEconomics.netGainPerTonne} net profit per tonne</span>{' '}
                          after paying warehousing storage charges.
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center">
                      <svg viewBox="0 0 380 180" className="w-full h-auto">
                        <path d="M40,70 L190,20 L340,70 L340,160 L40,160 Z" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                        <text x="190" y="55" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="bold">Central Warehousing Corp (CWC)</text>

                        {Array.from({ length: Math.min(10, storageMonths + 2) }).map((_, idx) => (
                          <rect
                            key={idx}
                            x={60 + (idx % 5) * 55}
                            y={85 + Math.floor(idx / 5) * 35}
                            width="45"
                            height="28"
                            rx="4"
                            fill="#d97706"
                            stroke="#fbbf24"
                          />
                        ))}
                        <text x="190" y="145" textAnchor="middle" fill="#f8fafc" fontSize="9">
                          {storageMonths} Months Preserved • Temp & Pest Regulated
                        </text>
                      </svg>
                      <p className="text-[11px] text-slate-400 mt-2">
                        Warehousing creates <strong>Time Utility</strong> by balancing seasonal production with year-round demand.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Ownership Models */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                    {[
                      { id: 'sole', name: 'Sole Prop', act: 'Common Law' },
                      { id: 'part', name: 'Partnership', act: '1932 Act' },
                      { id: 'opc', name: 'OPC', act: '2013 Act' },
                      { id: 'llp', name: 'LLP', act: '2008 Act' },
                      { id: 'jsc', name: 'JSC Company', act: '2013 Act' },
                      { id: 'coop', name: 'Cooperative', act: '1912 Act' },
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => { setSelectedEntity(item.id); audioManager.play('tap'); }}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          selectedEntity === item.id
                            ? 'bg-gold-600 border-gold-400 text-white font-bold shadow-md'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <p className="text-xs">{item.name}</p>
                        <p className="text-[10px] opacity-70 font-mono mt-0.5">{item.act}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-[11px] text-slate-400">Statutory Act & Minimum Members</p>
                      <p className="text-sm font-bold text-gold-300 mt-1">
                        {selectedEntity === 'sole' && 'Common Law • 1 Member'}
                        {selectedEntity === 'part' && 'Partnership Act 1932 • 2 Partners (Max 50)'}
                        {selectedEntity === 'opc' && 'Companies Act 2013 s.2(62) • 1 Member + Nominee'}
                        {selectedEntity === 'llp' && 'LLP Act 2008 • 2 Partners'}
                        {selectedEntity === 'jsc' && 'Companies Act 2013 • 2 (Pvt) / 7 (Public)'}
                        {selectedEntity === 'coop' && 'Cooperative Societies Act 1912 • 10 Members'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-[11px] text-slate-400">Liability of Owners</p>
                      <p className={`text-sm font-bold mt-1 ${
                        selectedEntity === 'sole' || selectedEntity === 'part' ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {selectedEntity === 'sole' && 'UNLIMITED (Personal assets exposed)'}
                        {selectedEntity === 'part' && 'UNLIMITED (Joint & Several Liability)'}
                        {selectedEntity === 'opc' && 'LIMITED to unpaid share capital'}
                        {selectedEntity === 'llp' && 'LIMITED to agreed contribution'}
                        {selectedEntity === 'jsc' && 'LIMITED to face value of shares'}
                        {selectedEntity === 'coop' && 'LIMITED to capital contribution'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-[11px] text-slate-400">Separate Legal Entity Status</p>
                      <p className={`text-sm font-bold mt-1 ${
                        selectedEntity === 'sole' || selectedEntity === 'part' ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {selectedEntity === 'sole' && 'NO separate legal entity'}
                        {selectedEntity === 'part' && 'NO separate legal entity'}
                        {selectedEntity === 'opc' && 'YES (Distinct corporate personality)'}
                        {selectedEntity === 'llp' && 'YES (Perpetual succession & legal person)'}
                        {selectedEntity === 'jsc' && 'YES (Perpetual succession)'}
                        {selectedEntity === 'coop' && 'YES (Registered body corporate)'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: 4 Core Internal Departments */}
              {currentSlide === 3 && (
                <div className="space-y-5">
                  {/* Brilliant Prediction Question 1 */}
                  <div className="p-4 bg-slate-900/90 rounded-xl border border-gold-500/30">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                      🔮 Predict Before Experimenting
                    </span>
                    <p className="text-xs md:text-sm text-slate-200 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handlePredictionSubmit(0, pIdx)}
                          className={`p-2.5 text-left text-xs rounded-lg border transition-all ${
                            showPredictionFeedback[0] && pIdx === PREDICTION_QUESTIONS[0].correctIndex
                              ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-semibold'
                              : showPredictionFeedback[0] && predictionAnswers[0] === pIdx
                              ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                              : 'bg-slate-800 border-slate-700 hover:border-gold-400 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {showPredictionFeedback[0] && (
                      <div className="mt-2 p-2 bg-slate-950 rounded border border-slate-800 text-xs text-gold-200">
                        <strong>Verify instruction:</strong> {PREDICTION_QUESTIONS[0].verifyInstruction}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: 'production', name: 'Production', icon: '⚙️', focus: '5 Ms & Output' },
                      { id: 'marketing', name: 'Marketing & Sales', icon: '📢', focus: 'Need & Exchange' },
                      { id: 'finance', name: 'Finance & Accounts', icon: '💰', focus: 'Forward & Backward' },
                      { id: 'hr', name: 'Human Resources', icon: '👥', focus: 'Welfare & Talent' },
                    ].map((d) => (
                      <motion.button
                        key={d.id}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => { setSelectedDept(d.id); audioManager.play('tap'); }}
                        className={`p-3 rounded-xl border text-left ${
                          selectedDept === d.id ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="text-xl mb-1">{d.icon}</div>
                        <p className="text-xs font-bold">{d.name}</p>
                        <p className="text-[10px] opacity-70">{d.focus}</p>
                      </motion.button>
                    ))}
                  </div>

                  {selectedDept === 'production' && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-slate-300">Assembly Line Speed: {prodSpeed}% Target</label>
                        <span className="text-xs text-gold-400">Defect Rate: {departmentMetrics.defectRate}%</span>
                      </div>
                      <input
                        type="range"
                        min={70}
                        max={140}
                        value={prodSpeed}
                        onChange={(e) => setProdSpeed(Number(e.target.value))}
                        aria-label="Assembly Line Speed Slider"
                        className="w-full accent-gold-500 cursor-pointer"
                      />

                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        <div className="p-2 bg-slate-900 rounded-lg">
                          <span className="text-slate-400">Monthly Output:</span>
                          <p className="font-bold text-white mt-0.5">{departmentMetrics.output} Units</p>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg">
                          <span className="text-slate-400">Scrap Wasted:</span>
                          <p className={`font-bold mt-0.5 ${departmentMetrics.scrapKg > 300 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {departmentMetrics.scrapKg} kg
                          </p>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg">
                          <span className="text-slate-400">Unit Cost:</span>
                          <p className="font-bold text-amber-300 mt-0.5">₹{departmentMetrics.costPerUnit}</p>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg">
                          <span className="text-slate-400">ISO 9001 Status:</span>
                          <p className={`font-bold mt-0.5 ${prodSpeed > 115 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {prodSpeed > 115 ? 'Tolerance At Risk' : 'Pass'}
                          </p>
                        </div>
                      </div>

                      <div className="h-44 w-full pt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={prodChartData}>
                            <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                            <YAxis stroke="#64748b" fontSize={11} />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', fontSize: '12px' }} />
                            <Bar dataKey="output" fill="#6366f1" name="Output Units" />
                            <Bar dataKey="scrap" fill="#f43f5e" name="Scrap (kg)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Brilliant Observation Check 2 */}
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
                          👁️ Observation Check: What do you notice in the bar chart?
                        </span>
                        <p className="text-xs text-slate-200 mb-2">{OBSERVATION_QUESTIONS[1].question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {OBSERVATION_QUESTIONS[1].options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => handleObservationSubmit(1, oIdx)}
                              className={`p-2.5 text-left text-xs rounded-lg border transition-all ${
                                showObservationFeedback[1] && oIdx === OBSERVATION_QUESTIONS[1].correctIndex
                                  ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-semibold'
                                  : showObservationFeedback[1] && observationAnswers[1] === oIdx
                                  ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                                  : 'bg-slate-800 border-slate-700 hover:border-gold-400 text-slate-300'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        {showObservationFeedback[1] && (
                          <p className="text-xs text-gold-300 mt-2">{OBSERVATION_QUESTIONS[1].explanation}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedDept === 'marketing' && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="font-bold text-amber-300">Timing Rule: Marketing BEFORE vs Sales AT</p>
                        <p className="text-slate-300 mt-1">
                          <strong>Marketing:</strong> Conducts Dabur herbal research, designs Cadbury Silk ads, and crafts Jio free data offers to <em>build desire</em>.
                        </p>
                        <p className="text-slate-300 mt-1">
                          <strong>Sales:</strong> Distributes Aashirvaad atta to 6 million Kirana stores and collects payments across counters to <em>close the deal</em>.
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedDept === 'finance' && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="font-bold text-emerald-300">Direction Test: Finance FORWARD vs Accounting BACKWARD</p>
                        <p className="text-slate-300 mt-1">
                          <strong>Finance:</strong> Tata Motors CFO evaluates equity vs debt and issues ₹5,000 Cr NCDs at 8.1% for the Sanand EV factory (Where does money come from?).
                        </p>
                        <p className="text-slate-300 mt-1">
                          <strong>Accounting:</strong> Chief Accountant writes the debenture ledger entries, computes quarterly interest accruals, and files Schedule III balance sheets.
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedDept === 'hr' && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="font-bold text-pink-300">Strategic HR vs Routine Personnel Administration</p>
                        <p className="text-slate-300 mt-1">
                          <strong>Strategic HR:</strong> Manpower planning, 16-week Mysuru tech bootcamps at Infosys, Factories Act 1948 welfare canteens, and Tata Steel Mood Meter apps.
                        </p>
                        <p className="text-slate-300 mt-1">
                          <strong>Personnel Admin:</strong> Routine leave register stamping and attendance punching.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SLIDE 4: 7-Element Communication Transmission Loop */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'postal', name: 'Postal Mail (India Post)', medium: 'Printed Speed Post Letter' },
                      { id: 'digital', name: 'Electronic Portal (InfyMe)', medium: 'Encrypted Policy PDF/Web' },
                      { id: 'oral', name: 'Spoken / Phone', medium: 'Direct Voice Call' },
                    ].map((c) => (
                      <motion.button
                        key={c.id}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => { setSelectedCommChannel(c.id); audioManager.play('tap'); }}
                        className={`p-3 rounded-xl border text-left ${
                          selectedCommChannel === c.id ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        <p className="text-xs font-bold">{c.name}</p>
                        <p className="text-[10px] opacity-70 mt-0.5">Medium: {c.medium}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <canvas ref={canvasRef} width={340} height={50} className="w-full bg-slate-900/60 rounded-xl" />

                    <div className="flex items-center justify-between gap-2 text-xs">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setShowNoiseDistortion(!showNoiseDistortion); audioManager.play('tap'); }}
                        className={`px-3 py-1.5 rounded-lg border font-semibold ${
                          showNoiseDistortion ? 'bg-rose-950 border-rose-500 text-rose-200' : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        {showNoiseDistortion ? '⚠ Semantic Noise Active' : 'Filter Noise (Plain English)'}
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setFeedbackLoopActive(!feedbackLoopActive); audioManager.play('tap'); }}
                        className={`px-3 py-1.5 rounded-lg border font-semibold ${
                          feedbackLoopActive ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-amber-950 border-amber-500 text-amber-200'
                        }`}
                      >
                        {feedbackLoopActive ? '✓ 2-Way Feedback Complete' : '✕ 1-Way (No Feedback)'}
                      </motion.button>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                      <p><strong>Channel vs Medium:</strong> Channel is the electronic highway; Medium is the specific email/PDF document travelling on it.</p>
                      <p><strong>Feedback Importance:</strong> {feedbackLoopActive ? 'Receiver acknowledged understanding; cycle closed!' : 'Without feedback, sender is left guessing if message was decoded.'}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setCurrentSlide(s => Math.max(0, s - 1)); audioManager.play('tap'); }}
              disabled={currentSlide === 0}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-sm font-semibold border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setCurrentSlide(s => s + 1); audioManager.play('whoosh'); }}
                className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (Free Play & No-Pressure Experimentation) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-700/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-emerald-300">Free Enterprise Sandbox</h2>
              <p className="text-xs text-slate-300 mt-1">Experiment freely with export values, storage time, and assembly line speeds without penalties.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30 whitespace-nowrap"
            >
              Ready for Graded Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-xs font-bold text-gold-300">1. Cargo & Risk (Cr ₹)</span>
              <input
                type="range"
                min={1}
                max={10}
                step={0.5}
                value={cargoValueCr}
                onChange={(e) => setCargoValueCr(Number(e.target.value))}
                aria-label="Sandbox Cargo Value Slider"
                className="w-full accent-gold-500 cursor-pointer"
              />
              <p className="text-xs text-slate-300">Current Value: <strong>₹{cargoValueCr} Crore</strong></p>
              <p className="text-[11px] text-gold-400">SBI Fee: ₹{tradeFinanceData.sbiFeeLakh}L | Marine: ₹{tradeFinanceData.insurancePremiumLakh}L</p>
            </div>

            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-xs font-bold text-amber-300">2. CWC Godown Storage (Months)</span>
              <input
                type="range"
                min={1}
                max={12}
                value={storageMonths}
                onChange={(e) => setStorageMonths(Number(e.target.value))}
                aria-label="Sandbox Storage Months Slider"
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-xs text-slate-300">Preserved: <strong>{storageMonths} Months</strong></p>
              <p className="text-[11px] text-amber-400">Net Utility Gain: ₹{warehouseEconomics.netGainPerTonne} / tonne</p>
            </div>

            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-3">
              <span className="text-xs font-bold text-pink-300">3. Assembly Speed (%)</span>
              <input
                type="range"
                min={80}
                max={140}
                value={prodSpeed}
                onChange={(e) => setProdSpeed(Number(e.target.value))}
                aria-label="Sandbox Assembly Speed Slider"
                className="w-full accent-pink-500 cursor-pointer"
              />
              <p className="text-xs text-slate-300">Target Speed: <strong>{prodSpeed}%</strong></p>
              <p className="text-[11px] text-pink-400">Output: {departmentMetrics.output} | Scrap: {departmentMetrics.scrapKg}kg</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="capitalize text-gold-400 font-medium">
                NEP Competency: <strong className="text-white">{activeChallenge.competencyLevel}</strong>
              </span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 shadow-rose-900/30'
                : 'bg-slate-800/90 border-slate-700'
            }`}
          >
            <p className="text-base md:text-lg font-semibold text-white leading-relaxed mb-6">
              {activeChallenge.question}
            </p>

            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`p-4 rounded-xl text-left text-sm border transition-all ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100 font-medium'
                        : showExplanation && i !== activeChallenge.correctIndex
                        ? 'bg-slate-800/40 border-slate-700/40 text-slate-400 opacity-60'
                        : 'bg-slate-900/80 border-slate-700 hover:border-gold-500 text-slate-200'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-xs text-center leading-6 mr-2 font-bold text-white">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 self-center mr-2 font-semibold">Labels:</span>
                  {activeChallenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-xs font-bold text-white cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'dept_top', title: 'Operational Core (5 Ms)' },
                    { id: 'dept_right', title: 'Demand & Revenue' },
                    { id: 'dept_bottom', title: 'Capital & Reporting' },
                    { id: 'dept_left', title: 'Talent & Welfare' }
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[100px] flex flex-col justify-center transition-colors ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/50 border-slate-700 text-slate-400'
                      }`}
                    >
                      <p className="text-[11px] font-medium">{target.title}</p>
                      <p className="text-xs font-bold mt-2 text-white">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Department Here'}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Verify Department Mapping
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
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
                      className="p-3 bg-slate-900/90 rounded-xl border border-slate-700 text-xs md:text-sm text-slate-200 flex items-center justify-between cursor-grab"
                    >
                      <span><strong className="text-gold-400 mr-2">{displayIdx + 1}.</strong> {item}</span>
                      <span className="text-slate-500 text-xs">☰ Drag to Reorder</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step={0.01}
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label="Numeric calculation answer input"
                    className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-gold-500 focus:outline-none w-52"
                  />
                  <span className="text-xs font-bold text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow-md"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-gold-300">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-slate-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((p, idx) => (
                    <div key={idx} className="px-3 py-1 bg-gold-800 rounded-lg text-xs text-white flex items-center gap-1.5">
                      <span>{p}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-300 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click elements above to assemble the sequence</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Verify Constructed Loop
                </motion.button>
              </div>
            )}
          </motion.div>

          {showExplanation && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-amber-950/40 border border-amber-600/40 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Step-by-Step ICSE Analysis</span>
                <span className="text-xs text-amber-400">Step {revealedSteps + 1} of {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length}</span>
              </div>

              <div className="space-y-2">
                {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs md:text-sm text-amber-100/90 leading-relaxed"
                  >
                    <strong className="text-amber-400 font-mono mr-1.5">{idx + 1}.</strong>
                    {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery & View Report →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-emerald-950 rounded-3xl border border-emerald-500/40 text-center space-y-3">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl font-bold text-white tracking-wide">Class 9 Commercial Studies Mastery Achieved!</h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto">
              You have completed the full simulation covering Aids to Trade, Ownership Forms (Private/Public/Joint), Internal Departments (Production, Marketing, Finance, HR), and Organizational Communication.
            </p>
            <div className="pt-2 flex justify-center gap-6 text-sm">
              <span className="px-4 py-1.5 bg-slate-800 rounded-full border border-slate-700 text-slate-300">
                Final Score: <strong className="text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong>
              </span>
              <span className="px-4 py-1.5 bg-slate-800 rounded-full border border-slate-700 text-slate-300">
                Mastery Status: <strong className="text-gold-400 capitalize">{masteryLevel}</strong>
              </span>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK (Personalized based on errors) */}
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 text-center">
            <p className="text-sm md:text-base font-bold text-emerald-300">
              {errors === 0 && 'PERFECT SCORE! Outstanding mastery across all commercial systems!'}
              {errors >= 1 && errors <= 3 && 'Great work! You demonstrated excellent commercial understanding.'}
              {errors >= 4 && errors <= 7 && 'Good effort! You grasp the key core principles.'}
              {errors >= 8 && 'Do not give up — You WILL get this! Review the key concepts and try again.'}
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>💭</span> Structured Reflection
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionAnswers.q1}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, q1: e.target.value }))}
                  placeholder="e.g. How insurance compensates financial loss rather than physically stopping accidents..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-gold-500 focus:outline-none h-20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionAnswers.q2}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, q2: e.target.value }))}
                  placeholder="e.g. Finance looks ahead to source funds while Accounting looks back to record historical data..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-gold-500 focus:outline-none h-20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionAnswers.q3}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, q3: e.target.value }))}
                  placeholder="e.g. Deciding between a partnership and an LLP when launching a startup to protect personal assets..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-gold-500 focus:outline-none h-20"
                />
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/40 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-widest">Personalized Misconception Diagnostic</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">❌ Common Fallacy: {m.misconception}</p>
                      <p className="text-emerald-300">✓ ICSE Truth: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-gold-950/50 rounded-2xl border border-gold-800/50 flex items-center justify-between text-xs">
            <span className="text-gold-200 font-medium">Spaced Repetition (SM-2): Next Automated Review Scheduled in:</span>
            <span className="px-3 py-1 bg-gold-600 text-white font-bold rounded-lg">
              {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
            </span>
          </div>

          {/* Real-World Activity Section */}
          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span>🚀</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <strong className="text-amber-400 mr-2">Step {idx + 1}:</strong> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Topic Mastery Registered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_CommercialStudiesAidsTradeBankingSim;
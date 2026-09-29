'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C11_ECON_031 = 'c11_econ_031';
const NODE_C11_ECON_032 = 'c11_econ_032';
const NODE_C11_ECON_033 = 'c11_econ_033';
const NODE_C11_ECON_053 = 'c11_econ_053';
const NODE_C11_ECON_054 = 'c11_econ_054';
const NODE_C11_ECON_055 = 'c11_econ_055';
const NODE_C11_ECON_056 = 'c11_econ_056';
const NODE_C11_ECON_057 = 'c11_econ_057';
const NODE_C11_ECON_058 = 'c11_econ_058';
const NODE_C11_ECON_059 = 'c11_econ_059';

const ALL_NODE_IDS = [
  NODE_C11_ECON_031,
  NODE_C11_ECON_032,
  NODE_C11_ECON_033,
  NODE_C11_ECON_053,
  NODE_C11_ECON_054,
  NODE_C11_ECON_055,
  NODE_C11_ECON_056,
  NODE_C11_ECON_057,
  NODE_C11_ECON_058,
  NODE_C11_ECON_059,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Architect of India’s Economic Transformation',
  intro: 'You are appointed Chief Statistical Advisor to the Ministry of Finance and NITI Aayog. From setting Five-Year Plan targets to conducting rural household sample surveys, your statistical modeling and economic planning decisions will shape national development policies for 1.4 billion citizens.',
  context: 'Navigate through economic planning strategies, empirical data collection methods, and frequency distribution modeling to guide policy makers from 1950 to 2026 and beyond.'
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In 1950, India’s corporate capital stood at ~₹800 Cr, while building just 3 steel plants required ₹600 Cr. Why could the free market NOT build them alone?',
  options: [
    'Private firms preferred investing in high-risk steel manufacturing over textiles.',
    'Market failure: private capital sought quick short-term profits, avoiding long-gestation heavy infrastructure.',
    'The Indian Constitution prohibited private companies from owning property.',
    'Importing steel from Britain was completely free with zero shipping tariffs.'
  ],
  correctIndex: 1,
  hintAfter: 'Don’t worry! Let’s explore how capital scarcity and market failure drove India’s economic planning and data systems.'
};

// ─── HISTORICAL FIVE-YEAR PLANS DATASET ───
interface PlanDataPoint {
  plan: string;
  target: number;
  actual: number;
  focus: string;
  keyProjects: string;
}

const FIVE_YEAR_PLANS_DATA: PlanDataPoint[] = [
  { plan: '1st (51-56)', target: 2.1, actual: 3.6, focus: 'Agriculture & Irrigation', keyProjects: 'Bhakra Nangal, Hirakud' },
  { plan: '2nd (56-61)', target: 4.5, actual: 4.3, focus: 'Heavy Industry (Mahalanobis)', keyProjects: 'Bhilai, Durgapur, Rourkela' },
  { plan: '3rd (61-66)', target: 5.6, actual: 2.8, focus: 'Self-Reliance & Defense', keyProjects: 'Wars & Droughts, Plan Holiday' },
  { plan: '4th (69-74)', target: 5.7, actual: 3.3, focus: 'Green Revolution & Banks', keyProjects: '14 Banks Nationalised (1969)' },
  { plan: '5th (74-78)', target: 4.4, actual: 4.8, focus: 'Garibi Hatao & Employment', keyProjects: '20-Point Programme' },
  { plan: '6th (80-85)', target: 5.2, actual: 5.7, focus: 'Infrastructure & IRDP', keyProjects: 'NREP, Rural Energy' },
  { plan: '7th (85-90)', target: 5.0, actual: 6.0, focus: 'Productivity & Modern Tech', keyProjects: 'Telecom & Broad-banding' },
  { plan: '8th (92-97)', target: 5.6, actual: 6.8, focus: 'LPG Market Reforms', keyProjects: 'P.V. Narasimha Rao & Manmohan Singh' },
  { plan: '9th (97-02)', target: 6.5, actual: 5.4, focus: 'Social Justice & Panchayats', keyProjects: 'Panchayati Raj empowerment' },
  { plan: '10th (02-07)', target: 8.0, actual: 7.6, focus: 'Governance & Monitorable Targets', keyProjects: 'Sarva Shiksha Abhiyan' },
  { plan: '11th (07-12)', target: 9.0, actual: 8.0, focus: 'Faster & Inclusive Growth', keyProjects: 'MGNREGA, Right to Education' },
  { plan: '12th (12-17)', target: 8.0, actual: 6.6, focus: 'Faster, Sustainable & Inclusive', keyProjects: 'Last Plan; NITI Aayog in 2015' }
];

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Why Plan? The Capital Scarcity Dilemma (1950)',
    instruction: 'Toggle between Market Mechanism and Planned Investment to see how public investment overcame capital scarcity to build core infrastructure.',
    interactionType: 'toggle-planning-mode',
    nodeId: NODE_C11_ECON_031
  },
  {
    title: '2. Major Objectives & Shifting Emphasis across Five-Year Plans',
    instruction: 'Slide through the 12 Five-Year Plans to analyze target vs. actual growth and how the strategic emphasis evolved from Heavy Industry to Inclusive Growth.',
    interactionType: 'slider-plan-explorer',
    nodeId: NODE_C11_ECON_032
  },
  {
    title: '3. NITI Aayog: Cooperative Federalism & Indices',
    instruction: 'Click each pillar of NITI Aayog to inspect why fund allocation moved to the Finance Commission while policy benchmarking drives state performance.',
    interactionType: 'click-niti-pillars',
    nodeId: NODE_C11_ECON_033
  },
  {
    title: '4. Statistics in Action: Primary vs. Secondary Data Collection',
    instruction: 'Select real-world economic scenarios to identify whether primary or secondary data is required and which collection method ensures high fidelity.',
    interactionType: 'match-collection-methods',
    nodeId: NODE_C11_ECON_055
  },
  {
    title: '5. Organization of Data & Frequency Distribution Engine',
    instruction: 'Adjust the class interval width and watch raw worker wage records organize into discrete or continuous frequency distributions using Sturges’ Rule.',
    interactionType: 'interactive-frequency-builder',
    nodeId: NODE_C11_ECON_059
  }
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: In exclusive class intervals (e.g., ₹200-₹250, ₹250-₹300), where does a worker with a daily wage of exactly ₹250 get counted?',
    options: [
      'In ₹200-₹250, because ₹250 is the stated upper limit',
      'In ₹250-₹300, because the upper limit is excluded from the current class',
      'In both classes simultaneously with a half-count (0.5 each)',
      'In neither class; it is omitted from the sample'
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Wage Classifier simulator below to see how exact boundary points shift smoothly to the next interval!',
    nodeId: NODE_C11_ECON_059
  },
  {
    question: 'Predict: When NITI Aayog replaced the Planning Commission in 2015, what happened to the power to allocate central financial grants to Indian states?',
    options: [
      'NITI Aayog gained direct statutory authority to disburse discretionary loans to states.',
      'Fund allocation moved away from NITI Aayog to the constitutional Finance Commission and central ministries.',
      'State governments lost all federal tax revenue sharing.',
      'The Reserve Bank of India took over annual Five-Year Plan budget allocations.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Explore the NITI Aayog architecture tab to see why it operates strictly as an advisory policy think-tank.',
    nodeId: NODE_C11_ECON_033
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice when comparing the First Plan (1951-56) achievement with the Twelfth Plan (2012-17)?',
    observableOptions: [
      'The First Plan exceeded its target (171% achievement), whereas the 12th Plan experienced a shortfall (82.5% achievement).',
      'Both plans achieved exactly 100% of their GDP growth targets without deviations.',
      'The First Plan targeted 9% growth while the 12th Plan targeted only 2.1%.',
      'Neither plan invested in infrastructure or agriculture.'
    ],
    correctIndex: 0,
    nodeId: NODE_C11_ECON_032
  },
  {
    question: 'What pattern emerges when you examine discrete variables (like household size) versus continuous variables (like MPCE)?',
    observableOptions: [
      'Discrete variables take fractional values in a single unit, while continuous variables cannot.',
      'Discrete variables count whole integer units, while continuous variables can take any decimal value along a continuum.',
      'Both discrete and continuous variables must always use inclusive class intervals.',
      'Continuous variables are purely qualitative and cannot be measured with numbers.'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_ECON_058
  }
];

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

// ─── COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C11_ECON_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On what date was the Planning Commission of India established, and through which legal instrument?',
    options: [
      'March 15, 1950, by an Executive Resolution of the Union Cabinet',
      'January 26, 1950, by Article 280 of the Indian Constitution',
      'August 15, 1947, by an Act of Parliament (Planning Act)',
      'April 1, 1951, by a Presidential Ordinance'
    ],
    correctIndex: 0,
    explanation: 'The Planning Commission was established on March 15, 1950, via a Cabinet Resolution — an executive body without statutory or constitutional backing.',
    hints: [
      'Think whether the Planning Commission was created by legislation or cabinet decree.',
      'It was established right after India became a republic in early 1950.',
      'The date is March 15, 1950, by Cabinet Resolution.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_02',
    nodeId: NODE_C11_ECON_033,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the constitutional/executive leadership roles to match the organizational structure of NITI Aayog.',
    dragItems: [
      { label: 'Prime Minister', targetId: 'box_chair' },
      { label: 'All State Chief Ministers & LGs', targetId: 'box_council' },
      { label: 'Vice-Chairman', targetId: 'box_vc' },
      { label: 'Chief Executive Officer', targetId: 'box_ceo' }
    ],
    correctMapping: {
      box_chair: 'Prime Minister',
      box_council: 'All State Chief Ministers & LGs',
      box_vc: 'Vice-Chairman',
      box_ceo: 'Chief Executive Officer'
    },
    explanation: 'NITI Aayog is headed ex-officio by the PM, with the Governing Council comprising all Chief Ministers and Lt. Governors to promote cooperative federalism.',
    hints: [
      'The head of government chairs the institution.',
      'The Governing Council gives states a direct voice at the highest level.',
      'The CEO manages administration while the Vice-Chairman provides policy leadership.'
    ]
  },
  {
    id: 'ch_03',
    nodeId: NODE_C11_ECON_032,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'The First Five-Year Plan (1951-56) targeted a GDP growth rate of 2.1% and actually achieved 3.6%. Calculate the Plan growth achievement ratio as a percentage: (Actual / Target) × 100.',
    correctAnswer: 171.4,
    tolerance: 1.0,
    unit: '%',
    explanation: 'Achievement Ratio = (3.6 / 2.1) × 100 = 171.43%. The First Plan substantially exceeded its target due to favorable monsoons and post-partition agricultural recovery.',
    hints: [
      'Divide actual growth (3.6) by targeted growth (2.1).',
      '3.6 ÷ 2.1 ≈ 1.71428.',
      'Multiply by 100 to get ~171.4%.'
    ]
  },
  {
    id: 'ch_04',
    nodeId: NODE_C11_ECON_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following represents statistics in the PLURAL sense?',
    options: [
      'The scientific method of collecting, organising, and analysing survey samples.',
      'The Census 2011 aggregate data showing India’s literacy rate at 74.04% and sex ratio at 943.',
      'A single individual farmer in Nashik earning ₹62,000 in 2024.',
      'An econometric regression formula linking interest rate to inflation.'
    ],
    correctIndex: 1,
    explanation: 'In the plural sense, statistics refers to numerical aggregates of facts systematically collected. A single isolated figure is not statistics.',
    hints: [
      'Plural sense means data/figures; singular sense means the science or method.',
      'A single person’s score or wage is an isolated number, not an aggregate.',
      'Aggregated population metrics from the Census represent statistics in the plural sense.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_05',
    nodeId: NODE_C11_ECON_056,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the progressive stages of executing a National Sample Survey (NSSO) in the correct methodological sequence.',
    sortItems: [
      'Define research objective & design structured schedule',
      'Train field enumerators in local languages',
      'Conduct face-to-face household interviews using CAPI tablets',
      'Classify, tabulate, and compute frequency distributions',
      'Publish analytical report in the MoSPI Gazette'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Statistical surveys follow a rigorous lifecycle: Survey Design → Enumerator Training → Fieldwork & CAPI Collection → Data Organisation & Tabulation → Policy Publication.',
    hints: [
      'You cannot train enumerators before drafting the questionnaire/schedule.',
      'Data collection in the field happens before data can be tabulated.',
      'Publication is the final output step after analysis.'
    ]
  },
  {
    id: 'ch_06',
    nodeId: NODE_C11_ECON_056,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why did the Census of India deploy 2.7 million enumerators with schedules rather than mailing questionnaires to households?',
    options: [
      'Schedules are legally required to be printed on glossy parchment paper.',
      'A questionnaire is filled by the respondent himself, which fails when substantial populations face literacy and linguistic barriers.',
      'Questionnaires can only be completed by registered income-tax payers.',
      'Mailed questionnaires require payment of postal customs duties by respondents.'
    ],
    correctIndex: 1,
    explanation: 'The difference lies in WHO fills the form: respondents fill questionnaires, while trained enumerators fill schedules. With ~26% illiteracy in 2011 and 22 scheduled languages, schedules ensured 100% coverage.',
    hints: [
      'Consider the difference between who records the answers.',
      'A questionnaire relies on the citizen’s ability to read and return the form.',
      'Enumerators bridge literacy gaps by asking questions orally and recording responses in schedules.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_07',
    nodeId: NODE_C11_ECON_057,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match the specific economic data requirement to its authoritative secondary source publication:',
    options: [
      'RBI Handbook of Statistics → Historical M3 Money Supply & Forex; Economic Survey → GDP growth & Fiscal Deficit; PLFS Bulletin → Quarterly Urban Unemployment',
      'Google Search Engine → Official GDP Data; Times of India → Repo Rate; WhatsApp Bulletin → Inflation Index',
      'UNDP Human Development Report → India’s Municipal Tax Collections; Census of India → Weekly Stock Prices',
      'SEBI Gazette → Literacy Rates; MoSPI → World Bank Global Lending Rates'
    ],
    correctIndex: 0,
    explanation: 'Authoritative publications: RBI Handbook for banking/money supply, Economic Survey (Ministry of Finance) for macroeconomic aggregates, and PLFS (MoSPI) for employment data.',
    hints: [
      'Remember that search engines are channels, not publishing sources.',
      'The Ministry of Finance presents the Economic Survey before the Union Budget.',
      'The NSO under MoSPI publishes the Periodic Labour Force Survey.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_08',
    nodeId: NODE_C11_ECON_059,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A field surveyor collects daily earnings from N = 100 powerloom workers. Using Sturges’ Rule k = 1 + 3.322 × log10(N), calculate the recommended number of classes k (log10(100) = 2). Round to the nearest whole integer.',
    correctAnswer: 8,
    tolerance: 0.5,
    unit: 'classes',
    explanation: 'k = 1 + 3.322 × log10(100) = 1 + 3.322 × 2 = 1 + 6.644 = 7.644 ≈ 8 classes.',
    hints: [
      'log10 of 100 is equal to 2.',
      'Multiply 3.322 by 2 = 6.644.',
      'Add 1 to get 7.644, which rounds to 8.'
    ]
  },
  {
    id: 'ch_09',
    nodeId: NODE_C11_ECON_058,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A researcher observes that the total fertility rate in a district is 2.1 children per woman. How should the variable "number of children in a household" be classified?',
    options: [
      'Continuous quantitative variable, because the reported average is 2.1',
      'Discrete quantitative variable, because an individual household can only have whole numbers of children (0, 1, 2, 3...)',
      'Qualitative categorical attribute, because it describes family lifestyle',
      'An inclusive parameter with infinite fractional subdivisions'
    ],
    correctIndex: 1,
    explanation: 'The variable itself is discrete (children are counted as integers). The fractional value 2.1 is a summary average across many households, not the variable value for a single unit.',
    hints: [
      'Can a single household have 2.1 children?',
      'Summary averages can be fractional even when the underlying variable is counted in whole integers.',
      'The variable is discrete.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_10',
    nodeId: NODE_C11_ECON_031,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is it historically incorrect to describe Indian economic planning from 1951 to 1991 as Soviet-style command planning?',
    options: [
      'Because India operated under a mixed economy where the private sector controlled ~75% of GDP including agriculture and retail through market incentives.',
      'Because the Indian Planning Commission was privatized under the Companies Act 1956.',
      'Because India never drafted written Five-Year Plan documents.',
      'Because Soviet planning only dealt with military hardware while India only produced food.'
    ],
    correctIndex: 0,
    explanation: 'Indian planning was indicative within a mixed economy. While the state controlled the "commanding heights" (heavy industry, banking, power), private agriculture and small industries responded to prices and market incentives.',
    hints: [
      'Did the Indian government set individual production quotas for 70 million private farmers?',
      'Indian planning combined public-sector leadership with private market agriculture.',
      'It was indicative planning within a mixed economy, not complete totalitarian command.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_11',
    nodeId: NODE_C11_ECON_054,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the econometric cause-and-effect policy cycle used by the RBI Monetary Policy Committee.',
    availableParts: ['Measure CPI Inflation Data', 'Forecast Price Trajectory', 'Adjust Repo Rate', 'Influence Bank Lending Rates', 'Stabilize Market Inflation'],
    targetState: 'Measure CPI Inflation Data Forecast Price Trajectory Adjust Repo Rate Influence Bank Lending Rates Stabilize Market Inflation',
    validationHint: 'Sequence from statistical measurement → forecasting → monetary policy tool → commercial credit → price stabilization.',
    explanation: 'The RBI econometric policy cycle: CPI Data Collection → Statistical Forecasting → Repo Rate Adjustment → Transmission to Commercial Lending → Inflation Stabilization.',
    hints: [
      'Start with empirical CPI measurement.',
      'Use statistical models to project inflation ahead.',
      'Change the repo rate to transmit through banking channels.'
    ]
  },
  {
    id: 'ch_12',
    nodeId: NODE_C11_ECON_033,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Analyze the structural differences between the Planning Commission and NITI Aayog:',
    options: [
      'Planning Commission: Top-down resource allocator with fund-disbursing power; NITI Aayog: Bottom-up think-tank fostering cooperative & competitive federalism through benchmark indices without fund allocation power.',
      'Planning Commission: Purely advisory without document drafting; NITI Aayog: Enforces central tax collection across all municipalities.',
      'Planning Commission: Statutory body created under Article 370; NITI Aayog: Formed by the World Bank.',
      'Planning Commission: Only focused on rural schools; NITI Aayog: Solely directs Indian Railways.'
    ],
    correctIndex: 0,
    explanation: 'The Planning Commission allocated central plan grants (top-down), whereas NITI Aayog is a strategic think tank that monitors indices (SDG Index, Aspirational Districts) with zero fund-allocation power.',
    hints: [
      'Which body had the power to write funding checks to states?',
      'Fund allocation moved to the Finance Commission (Article 280) and central ministries.',
      'NITI Aayog acts as a policy think-tank and benchmarking body.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_13',
    nodeId: NODE_C11_ECON_059,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Given exclusive class intervals ₹100-₹200, ₹200-₹300, ₹300-₹400 for daily wages of informal workers, where must wage records of ₹200.00 and ₹300.00 be placed?',
    options: [
      '₹200 in ₹100-₹200; ₹300 in ₹200-₹300',
      '₹200 in ₹200-₹300; ₹300 in ₹300-₹400',
      'Both in ₹200-₹300 simultaneously',
      'Both must be converted to an inclusive interval with 0.5 boundary reduction'
    ],
    correctIndex: 1,
    explanation: 'In exclusive intervals, the upper limit is excluded from the current class and included in the next higher class. Thus ₹200 enters ₹200-₹300 and ₹300 enters ₹300-₹400.',
    hints: [
      'Remember the universal statistical rule: Upper limit goes into the NEXT class.',
      '���200 is the lower limit of the 200-300 interval.',
      'Therefore ₹200 belongs to 200-300, and ₹300 belongs to 300-400.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_14',
    nodeId: NODE_C11_ECON_055,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When a university scholar downloads NSSO 77th Round survey tables from the MoSPI website to write a research paper on sanitation, the data is:',
    options: [
      'Primary data for the scholar',
      'Secondary data for the scholar',
      'Unreliable tertiary hearsay',
      'Raw unclassified administrative diary entries'
    ],
    correctIndex: 1,
    explanation: 'The data is primary for the NSSO (who collected it first-hand) but secondary for the scholar (who reused already-published data).',
    hints: [
      'Did the scholar visit the households personally?',
      'The classification depends on the relationship between user and collector.',
      'Since someone else collected and published it, it is secondary for the scholar.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_15',
    nodeId: NODE_C11_ECON_053,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A critic claims: "Statistics is unreliable because it can be used to prove opposite conclusions." How should an economist evaluate this limitation?',
    options: [
      'The limitation lies in unethical misuse and selective sampling by the user, not in the statistical method itself which is mathematically neutral.',
      'The critic is completely correct; mathematical statistics has no valid application in economics.',
      'Statistics can only measure moral qualities like patriotism, so economic figures are always invalid.',
      'Averages are legally banned from being cited in official government reports.'
    ],
    correctIndex: 0,
    explanation: 'The statistical method is objective and neutral. Misuse arises when biased users manipulate sample selections or omit dispersion metrics, just as a scalpel can be misused by an untrained operator.',
    hints: [
      'Is the tool flawed or is the person handling the tool misrepresenting facts?',
      'The method itself is scientifically neutral.',
      'The flaw arises from selective presentation and user bias.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_16',
    nodeId: NODE_C11_ECON_032,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Did the Eighth Five-Year Plan (1992-97) abandon the core national objectives of growth and equity when it introduced LPG reforms?',
    options: [
      'Yes, it completely deleted social justice and growth from the Constitution.',
      'No; it changed the STRATEGY (from public-sector-led to market-led growth) while retaining the fundamental OBJECTIVES of growth, modernization, self-reliance, and equity.',
      'Yes, because all government ministries were closed and privatized.',
      'No, because the Eighth Plan reverted strictly to Soviet command quotas.'
    ],
    correctIndex: 1,
    explanation: 'The Eighth Plan modified the means (strategy) from state capitalism to competitive markets, but the enduring ends (objectives) remained economic growth, equity, modernization, and self-reliance.',
    hints: [
      'Distinguish between strategic instruments (means) and developmental goals (ends).',
      'The goals of poverty reduction and growth remained unchanged.',
      'Only the delivery mechanism shifted toward private enterprise and open trade.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_17',
    nodeId: NODE_C11_ECON_059,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For the monthly household power consumption class interval 350-500 kWh, calculate the class mark (midpoint) xi.',
    correctAnswer: 425,
    tolerance: 0.1,
    unit: 'kWh',
    explanation: 'Class Mark = (Lower Limit + Upper Limit) / 2 = (350 + 500) / 2 = 850 / 2 = 425 kWh.',
    hints: [
      'Add the lower limit (350) and upper limit (500).',
      '350 + 500 = 850.',
      'Divide 850 by 2.'
    ]
  },
  {
    id: 'ch_18',
    nodeId: NODE_C11_ECON_054,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the 4-tier statistical data pipeline used in NITI Aayog’s Aspirational Districts Programme.',
    availableParts: ['Collect District Field Data (NFHS/Health)', 'Compute Composite Delta Scores', 'Publish Monthly Competitive Ranks', 'Target Interventions in Low-Ranked Districts'],
    targetState: 'Collect District Field Data (NFHS/Health) Compute Composite Delta Scores Publish Monthly Competitive Ranks Target Interventions in Low-Ranked Districts',
    validationHint: 'Sequence from raw administrative data collection to composite score calculation, public ranking, and targeted resource deployment.',
    explanation: 'The ADP statistical loop: Primary/Administrative Data Collection → Composite Index Scoring → Public Benchmark Ranking → Targeted Evidence-Based Governance.',
    hints: [
      'Start with ground-level district health/education metrics.',
      'Calculate the composite index scores.',
      'Rank the 117 aspirational districts publicly to encourage competitive federalism.'
    ]
  },
  {
    id: 'ch_19',
    nodeId: NODE_C11_ECON_056,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When investigating sensitive and confidential issues such as farmer distress and debt burdens where respondents may hesitate to answer directly, which method is most suitable?',
    options: [
      'Direct personal investigation with public loudspeakers',
      'Indirect oral investigation via credible third parties (bank managers, local sarpanchs, doctors)',
      'Unsolicited bulk email questionnaires',
      'Mailed printed postcards'
    ],
    correctIndex: 1,
    explanation: 'Indirect oral investigation interviews informed third-party informants (panchayat heads, local lenders, health officers) when victims cannot or will not speak directly.',
    hints: [
      'Direct respondents might fear stigma or legal action.',
      'Third-party informants who know the situation can provide objective testimony.',
      'This method is called indirect oral investigation.'
    ]
  },
  {
    id: 'ch_20',
    nodeId: NODE_C11_ECON_053,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What are the four systematic stages in the scope of statistics as a scientific discipline?',
    options: [
      'Speculation, Intuition, Polling, Guesswork',
      'Collection, Organisation, Presentation, Analysis & Interpretation',
      'Taxation, Allocation, Subsidisation, Privatisation',
      'Printing, Advertising, Retailing, Auditing'
    ],
    correctIndex: 1,
    explanation: 'The scope of statistics encompasses: (1) Collection of raw data, (2) Organisation & classification, (3) Presentation in tables/charts, and (4) Analysis & Interpretation for decision making.',
    hints: [
      'Think about the complete workflow from raw field surveys to policy reports.',
      'Collection comes first, followed by organizing and charting.',
      'Analysis and interpretation form the final stage.'
    ]
  },
  {
    id: 'ch_21',
    nodeId: NODE_C11_ECON_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does NITI Aayog’s SDG India Index drive state-level developmental improvements without disbursing direct financial grants?',
    options: [
      'By imposing criminal penalties on Chief Ministers of lagging states',
      'By publishing transparent biennial rankings that trigger competitive federalism and peer-to-peer policy learning across states',
      'By closing down state legislative assemblies that score below 50',
      'By taking over municipal water utilities directly from New Delhi'
    ],
    correctIndex: 1,
    explanation: 'The SDG India Index provides transparent empirical benchmarks. States (e.g., Kerala, Tamil Nadu, Himachal Pradesh) compete publicly to improve their governance rankings, driving policy reform without top-down coercion.',
    hints: [
      'Consider the psychological and political impact of public rankings.',
      'NITI Aayog uses data-driven nudges rather than financial commands.',
      'Transparent benchmarking fosters competitive federalism.'
    ]
  },
  {
    id: 'ch_22',
    nodeId: NODE_C11_ECON_058,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Drag each real-world economic indicator to its exact variable classification type.',
    dragItems: [
      { label: 'State GDP Growth Rate (6.8%)', targetId: 'box_cont' },
      { label: 'Number of Public Hospitals (42)', targetId: 'box_disc' },
      { label: 'Ownership Form (Private/Public)', targetId: 'box_cat' }
    ],
    correctMapping: {
      box_cont: 'State GDP Growth Rate (6.8%)',
      box_disc: 'Number of Public Hospitals (42)',
      box_cat: 'Ownership Form (Private/Public)'
    },
    explanation: 'GDP growth rate is continuous (measurable in decimals), hospital count is discrete (whole integers), and ownership type is categorical/qualitative.',
    hints: [
      'Can GDP growth be 6.825%? Yes, continuous.',
      'Can you have 42.5 hospitals? No, whole count (discrete).',
      'Ownership form is a non-numeric category.'
    ]
  }
];

// ─── COMPONENT PROPS INTERFACE ───
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
  nodeId: NODE_C11_ECON_031,
  title: 'Planning, NITI Aayog & Statistical Foundations in India',
  definition: 'Economic planning is the conscious governmental allocation of scarce national resources toward predefined socio-economic targets over a set period. Statistics provides the empirical science of collecting, organising, presenting, and interpreting aggregate numerical data to evaluate policy outcomes.',
  eli5: 'Economic planning is like a family making a budget so they can fix their roof and pay school fees first before spending on toys. Statistics is the doctor’s thermometer and blood test: it gives real numbers so the government knows which policies are working.',
  misconceptions: [
    {
      misconception: 'Planning meant the Indian government owned and controlled every farm and shop in the country.',
      correction: 'India had indicative planning in a mixed economy. The public sector led heavy industry, but agriculture and retail remained private market-driven.'
    },
    {
      misconception: 'A single individual earning ₹50,000 constitutes statistics.',
      correction: 'A single isolated figure is just a number. Statistics in the plural sense requires an aggregate of facts collected systematically.'
    },
    {
      misconception: 'The Planning Commission was created by an Act of Parliament and had constitutional status.',
      correction: 'Both the Planning Commission (1950) and NITI Aayog (2015) were created by Cabinet Resolutions (executive orders), not by legislative statutes.'
    },
    {
      misconception: 'In exclusive class intervals (e.g. 200-250), the value 250 is placed inside the 200-250 group.',
      correction: 'In exclusive intervals, the upper limit is excluded and placed in the next higher group (250-300).'
    },
    {
      misconception: 'NITI Aayog allocates central development funds to state governments.',
      correction: 'NITI Aayog has zero fund-allocation power. Fund sharing is handled by the constitutional Finance Commission and central ministries.'
    }
  ],
  diagnosticQuestions: [
    { question: 'What is the primary unit of planning used in India between 1951 and 2017?', options: ['One-Year Budgets', 'Five-Year Plans', 'Ten-Year Treaties', 'Rolling Quarters'], correctIndex: 1 },
    { question: 'Which steel plant was built with Soviet collaboration during the 2nd Five-Year Plan?', options: ['Bhilai', 'Durgapur', 'Rourkela', 'Tata Jamshedpur'], correctIndex: 0 },
    { question: 'When was NITI Aayog established to replace the Planning Commission?', options: ['August 15, 1947', 'January 1, 2015', 'July 1, 1991', 'March 15, 1950'], correctIndex: 1 },
    { question: 'Which body decides the constitutional sharing of central taxes with Indian states?', options: ['NITI Aayog', 'Planning Commission', 'Finance Commission (Article 280)', 'SEBI'], correctIndex: 2 },
    { question: 'Which of the following is a continuous quantitative variable?', options: ['Number of students in a class', 'Monthly per capita expenditure in rupees', 'Religion of respondent', 'Number of bank branches'], correctIndex: 1 },
    { question: 'What is the class mark of the interval 20-40?', options: ['20', '30', '40', '60'], correctIndex: 1 },
    { question: 'Who fills a statistical schedule during field investigations?', options: ['The respondent', 'The trained enumerator', 'The postal courier', 'The software server'], correctIndex: 1 },
    { question: 'What does Sturges’ Rule calculate?', options: ['GDP growth rate', 'Optimal number of class intervals', 'Bank repo rate', 'Tax devolution percentage'], correctIndex: 1 }
  ],
  masteryCriteria: 'Student understands economic planning rationale, Five-Year Plan evolutions, NITI Aayog architecture, statistical scopes, data collection methodologies, and frequency distribution mechanics.'
};

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Lead the District Planning Council',
  description: 'Select your home district. Using MoSPI PLFS data and NITI Aayog’s SDG Dashboard, construct a 3-point policy memo: (1) Primary survey strategy for informal vendors, (2) Grouped frequency distribution of local wages, and (3) Policy intervention targeting the lowest SDG indicator.',
  steps: [
    'Access the official NITI Aayog SDG India Index portal for your state.',
    'Formulate a 5-question survey schedule for 50 local market vendors.',
    'Calculate the class intervals using Sturges’ Rule and tally the wage distribution.',
    'Present your findings to your economics study group or teacher.'
  ]
};

type NitiPillarType = 'federalism' | 'thinktank' | 'sdg' | 'aim';

const NITI_PILLARS: Array<{ id: NitiPillarType; label: string; icon: string }> = [
  { id: 'federalism', label: 'Cooperative Federalism', icon: '🤝' },
  { id: 'thinktank', label: 'Policy Think-Tank', icon: '🧠' },
  { id: 'sdg', label: 'SDG India Index', icon: '📊' },
  { id: 'aim', label: 'Atal Innovation Mission', icon: '🚀' }
];

// ─── MAIN COMPONENT ───
function C11_EconomicsPlanningEconomicDevelopmentSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['econ'] || { name: 'Economics', emoji: '📈', color: 'indigo' };

  // ─── CORE SIMULATION STATES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Discovery states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-then-check states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);

  // Observation question states
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Exploration interactive lab states
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(1); // 2nd Plan default
  const [planningMode, setPlanningMode] = useState<'market' | 'planned'>('planned');
  const [selectedNitiPillar, setSelectedNitiPillar] = useState<NitiPillarType>('federalism');
  const [selectedDataSource, setSelectedDataSource] = useState<'primary' | 'secondary'>('primary');
  const [sturgesSampleSize, setSturgesSampleSize] = useState(50);
  const [customClassWidth, setCustomClassWidth] = useState(50);
  const [classifiedWageSample, setClassifiedWageSample] = useState<number>(250);

  // Challenge execution states
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive challenge inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconception tracker
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection answer inputs state
  const [reflections, setReflections] = useState({
    surprising: '',
    explainFriend: '',
    realLife: ''
  });

  // Persistent BKT state ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGE FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY INITIALIZER ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const nextDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== nextDiff) {
        setCurrentChallenge(0);
        return nextDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS 2D PARTICLE ANIMATION EFFECT ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 10) {
        const y = 15 + Math.sin((x + frame * 2) * 0.05) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const pulseX = (frame * 1.5) % canvas.width;
      const pulseY = 15 + Math.sin((pulseX + frame * 2) * 0.05) * 8;
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── 12+ USECALLBACK HANDLERS ───

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('chime');
      speechManager.speak('Let us study the complete step-by-step reasoning together.');
    }
  }, [hintCount, challenge]);

  // Inactivity Auto-hint
  useEffect(() => {
    if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        showNextHint();
      }, 10000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [phase, currentChallenge, hintCount, answerRevealed, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Spot on! Capital scarcity and market failure made economic planning essential.');
    } else {
      audioManager.play('error');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Economics Lab. Explore each principle hands-on.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter the Free Simulation Sandbox. Manipulate all variables with zero pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Let us begin your CISCE competency challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive simulator to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Accurate observation! Notice how planning realities differed from optimistic targets.');
    } else {
      audioManager.play('pop');
      speechManager.speak('Look closer at the target vs actual bars.');
    }
  }, []);

  const handlePlanSliderChange = useCallback((newIdx: number) => {
    setSelectedPlanIdx(newIdx);
    audioManager.play('count');
  }, []);

  const handlePlanningModeToggle = useCallback((mode: 'market' | 'planned') => {
    setPlanningMode(mode);
    audioManager.play('balance');
  }, []);

  const handleSturgesChange = useCallback((n: number) => {
    setSturgesSampleSize(n);
    audioManager.play('count');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === challenge.sortItems?.length ? prev : challenge.sortItems?.map((_, i) => i) || [];
      const updated = [...base];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have mastered Indian economic planning and statistical analysis.');
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
      setCurrentChallenge(prev => prev + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    resetInactivityTimer();
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const val = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.5);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent economic reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ score: 100, timestamp: Date.now() }));
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
        speechManager.speak('Hints completed. Let us examine the conceptual breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const calculatedSturgesK = useMemo(() => {
    return Math.round(1 + 3.322 * Math.log10(sturgesSampleSize));
  }, [sturgesSampleSize]);

  // Motivational Feedback Evaluator
  const motivationalFeedback = useMemo(() => {
    if (errors === 0) {
      return {
        badge: '🏆 PERFECT SCORE!',
        text: 'Flawless mastery! You demonstrated complete conceptual precision across Indian economic planning and statistical foundations.',
        color: 'text-emerald-400 border-emerald-500 bg-emerald-950/60'
      };
    } else if (errors <= 3) {
      return {
        badge: '⭐ Great work!',
        text: 'Strong economic intuition and solid quantitative reasoning! You conquered the core planning and data mechanisms.',
        color: 'text-gold-400 border-gold-500 bg-gold-950/60'
      };
    } else if (errors <= 7) {
      return {
        badge: '👍 Good effort!',
        text: 'You made steady progress through complex planning models. Review the diagnostic points below to reach mastery.',
        color: 'text-amber-400 border-amber-500 bg-amber-950/60'
      };
    } else {
      return {
        badge: '💪 Do not give up — You WILL get this!',
        text: 'Economics and statistical methods take dedicated practice. Walk through the interactive steps again to master the logic!',
        color: 'text-rose-400 border-rose-500 bg-rose-950/60'
      };
    }
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden" role="region" aria-label="Economics Planning Simulation">
      {/* Background Animated Glow Canvas */}
      <canvas ref={canvasRef} width={800} height={30} className="w-full h-8 mb-2 rounded-lg opacity-80" aria-hidden="true" />

      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700" aria-hidden="true">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gold-400 via-gold-300 to-emerald-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">Class 11 ISC Economics • Planning, NITI Aayog & Statistical Organisation</p>
          </div>
        </div>

        {/* Phase Badges & Difficulty Level */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300">
            Phase: <strong className="text-gold-400 uppercase">{phase}</strong>
          </span>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              difficulty === 'foundation' ? 'bg-emerald-950/70 text-emerald-400 border-emerald-700' :
              difficulty === 'advanced' ? 'bg-rose-950/70 text-rose-400 border-rose-700' :
              'bg-gold-950/70 text-gold-400 border-gold-700'
            }`}
          >
            {difficulty.toUpperCase()}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/80 shadow-inner">
            <h2 className="text-xl font-bold text-gold-300 flex items-center gap-2">
              <span aria-hidden="true">🏛️</span> {SCENARIO.title}
            </h2>
            <p className="text-sm md:text-base text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-400/90 mt-3 font-medium">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
              <span aria-hidden="true">💡</span>
              <span>Curiosity Hook (Non-Graded Exploration)</span>
            </div>
            <p className="text-base text-white font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all border flex items-center justify-between ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                >
                  <span><span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-medium' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Excellent intuition! Free market capital alone could not build long-gestation heavy infrastructure.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Economics Lab"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white font-bold rounded-xl shadow-lg shadow-gold-950 flex items-center gap-2"
                >
                  <span>Enter Interactive Lab</span>
                  <span aria-hidden="true">→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (BRILLIANT.ORG INTERACTIVE STEPS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Step {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}</span>
            <span className="text-gold-400">Node: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={(currentSlide + 1) * 20} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-emerald-400"
              animate={{ width: `${((currentSlide + 1) / EXPLORATION_STEPS.length) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-300 mt-1 flex items-center gap-1.5">
                  <span aria-hidden="true">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* SLIDE 0: Capital Scarcity & Planning Mechanism Simulation (SVG DIAGRAM #1) */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <motion.button
                      aria-label="Toggle Free Market Allocation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handlePlanningModeToggle('market')}
                      className={`flex-1 p-3 rounded-xl border text-xs md:text-sm font-bold ${
                        planningMode === 'market' ? 'bg-amber-950/80 border-amber-500 text-amber-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Free Market Allocation (Short-Term Profit)
                    </motion.button>
                    <motion.button
                      aria-label="Toggle Planned Investment"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handlePlanningModeToggle('planned')}
                      className={`flex-1 p-3 rounded-xl border text-xs md:text-sm font-bold ${
                        planningMode === 'planned' ? 'bg-gold-950/80 border-gold-500 text-gold-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Planned Allocation (Heavy Industry & Irrigation)
                    </motion.button>
                  </div>

                  {/* SVG DIAGRAM #1: Planning vs Market Capital Allocation */}
                  <svg viewBox="0 0 700 240" className="w-full bg-slate-950 rounded-xl p-2 border border-slate-800" aria-label="Diagram showing capital allocation paths between market and planned modes">
                    <rect x="30" y="70" width="140" height="100" rx="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                    <text x="100" y="105" textAnchor="middle" fill="#c7d2fe" fontSize="12" fontWeight="bold">National Capital</text>
                    <text x="100" y="130" textAnchor="middle" fill="#818cf8" fontSize="11">Pool (~₹800 Cr)</text>

                    <path d="M 180 120 L 260 120" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow1)" />
                    <defs>
                      <marker id="arrow1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                      </marker>
                    </defs>

                    {planningMode === 'market' ? (
                      <g>
                        <rect x="270" y="40" width="180" height="70" rx="10" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
                        <text x="360" y="70" textAnchor="middle" fill="#fef3c7" fontSize="12" fontWeight="bold">Cotton & Sugar Mills</text>
                        <text x="360" y="90" textAnchor="middle" fill="#fbbf24" fontSize="10">2-Year Gestation • 100% Capital</text>

                        <rect x="490" y="130" width="180" height="70" rx="10" fill="#334155" stroke="#64748b" strokeWidth="1" strokeDasharray="4" />
                        <text x="580" y="160" textAnchor="middle" fill="#94a3b8" fontSize="12">Steel & Power Plants</text>
                        <text x="580" y="180" textAnchor="middle" fill="#ef4444" fontSize="10">0% Allocation (Market Failure ✗)</text>
                      </g>
                    ) : (
                      <g>
                        <rect x="270" y="30" width="190" height="80" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                        <text x="365" y="60" textAnchor="middle" fill="#d1fae5" fontSize="12" fontWeight="bold">Bhakra Nangal & Hirakud</text>
                        <text x="365" y="80" textAnchor="middle" fill="#6ee7b7" fontSize="10">1st Plan: 31% Agriculture & Power ✓</text>

                        <rect x="490" y="130" width="190" height="80" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                        <text x="585" y="160" textAnchor="middle" fill="#e0e7ff" fontSize="12" fontWeight="bold">Bhilai, Durgapur, Rourkela</text>
                        <text x="585" y="180" textAnchor="middle" fill="#a5b4fc" fontSize="10">2nd Plan: Heavy Steel Capacity ✓</text>
                      </g>
                    )}
                  </svg>
                  <p className="text-xs text-slate-400 italic">
                    {planningMode === 'market'
                      ? 'In a pure market, scarce private capital flows into quick-return consumer goods, leaving core steel and irrigation unbuilt.'
                      : 'Under planning, the state mobilized foreign aid & taxes to build long-gestation commanding heights of industry.'}
                  </p>
                </div>
              )}

              {/* SLIDE 1: Five-Year Plans Target vs Actual Visualizer */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="h-64 w-full" aria-label="Five Year Plans Growth Chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={FIVE_YEAR_PLANS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="plan" stroke="#94a3b8" fontSize={10} angle={-30} textAnchor="end" />
                        <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 10]} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#475569', borderRadius: '8px' }}
                          formatter={(val: number) => [`${val}% GDP Growth`, '']}
                        />
                        <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                        <Bar dataKey="target" name="Target Growth %" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="actual" name="Actual Achieved %" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>Select Plan for In-depth Focus:</span>
                      <span className="text-gold-400 font-bold">{FIVE_YEAR_PLANS_DATA[selectedPlanIdx].plan}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={FIVE_YEAR_PLANS_DATA.length - 1}
                      value={selectedPlanIdx}
                      aria-label="Five Year Plan selection slider"
                      onChange={(e) => handlePlanSliderChange(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-xs">
                      <div className="p-2 bg-slate-900 rounded-lg">
                        <span className="text-slate-500 block">Target</span>
                        <span className="text-gold-300 font-bold text-sm">{FIVE_YEAR_PLANS_DATA[selectedPlanIdx].target}%</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg">
                        <span className="text-slate-500 block">Actual</span>
                        <span className="text-emerald-300 font-bold text-sm">{FIVE_YEAR_PLANS_DATA[selectedPlanIdx].actual}%</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg col-span-2">
                        <span className="text-slate-500 block">Core Emphasis & Key Projects</span>
                        <span className="text-amber-300 font-medium">{FIVE_YEAR_PLANS_DATA[selectedPlanIdx].focus} ({FIVE_YEAR_PLANS_DATA[selectedPlanIdx].keyProjects})</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: NITI Aayog Interactive Pillars (SVG DIAGRAM #2) */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM #2: NITI Aayog Cooperative Federalism Architecture */}
                  <svg viewBox="0 0 700 160" className="w-full bg-slate-950 rounded-xl p-2 border border-slate-800" aria-label="Diagram of NITI Aayog Governing Council and Think Tank Structure">
                    <rect x="250" y="10" width="200" height="40" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                    <text x="350" y="35" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Prime Minister (Chairperson)</text>

                    <line x1="350" y1="50" x2="350" y2="80" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="140" y1="80" x2="560" y2="80" stroke="#94a3b8" strokeWidth="2" />

                    <line x1="140" y1="80" x2="140" y2="105" stroke="#94a3b8" strokeWidth="2" />
                    <rect x="40" y="105" width="200" height="45" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                    <text x="140" y="125" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">Governing Council</text>
                    <text x="140" y="142" textAnchor="middle" fill="#a7f3d0" fontSize="9">All 28 CMs + UT LGs (Bottom-Up ✓)</text>

                    <line x1="560" y1="80" x2="560" y2="105" stroke="#94a3b8" strokeWidth="2" />
                    <rect x="460" y="105" width="200" height="45" rx="8" fill="#701a75" stroke="#f472b6" strokeWidth="2" />
                    <text x="560" y="125" textAnchor="middle" fill="#fdf2f8" fontSize="11" fontWeight="bold">Knowledge Hub & Indices</text>
                    <text x="560" y="142" textAnchor="middle" fill="#fbcfe8" fontSize="9">Zero Fund Power (Pure Advisory ✓)</text>
                  </svg>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {NITI_PILLARS.map(p => (
                      <motion.button
                        key={p.id}
                        aria-label={`Select pillar: ${p.label}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedNitiPillar(p.id)}
                        className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 ${
                          selectedNitiPillar === p.id ? 'bg-gold-950 border-gold-400 text-gold-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="text-xl" aria-hidden="true">{p.icon}</span>
                        <span>{p.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[120px] flex items-center">
                    {selectedNitiPillar === 'federalism' && (
                      <div className="space-y-1.5 text-xs text-slate-300">
                        <h4 className="text-gold-400 font-bold text-sm">Governing Council Architecture</h4>
                        <p>All 28 State Chief Ministers & UT Lt. Governors sit with the Prime Minister as equal partners in policy design.</p>
                        <p className="text-slate-400">Unlike the Planning Commission (which gave top-down plan allocations), NITI Aayog has <strong>zero fund allocation power</strong> — funds flow via the Finance Commission (Art. 280).</p>
                      </div>
                    )}
                    {selectedNitiPillar === 'thinktank' && (
                      <div className="space-y-1.5 text-xs text-slate-300">
                        <h4 className="text-gold-400 font-bold text-sm">Strategic & Technical Advice</h4>
                        <p>Staffed by domain specialists across energy, healthcare, agriculture, and AI, providing research-backed strategic roadmaps.</p>
                      </div>
                    )}
                    {selectedNitiPillar === 'sdg' && (
                      <div className="space-y-1.5 text-xs text-slate-300">
                        <h4 className="text-gold-400 font-bold text-sm">SDG India Index & Aspirational Districts</h4>
                        <p>Monitors 117 backward districts and ranks all states across 16 UN Sustainable Development Goals, driving competitive federalism.</p>
                      </div>
                    )}
                    {selectedNitiPillar === 'aim' && (
                      <div className="space-y-1.5 text-xs text-slate-300">
                        <h4 className="text-gold-400 font-bold text-sm">Atal Tinkering Labs (ATL)</h4>
                        <p>Over 10,000 innovation labs funded in Indian high schools, empowering 1M+ students with 3D printers, IoT, and robotics.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 3: Data Collection Methods */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <motion.button
                      aria-label="View Primary Data Methods"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedDataSource('primary')}
                      className={`flex-1 p-3 rounded-xl border text-xs font-bold ${
                        selectedDataSource === 'primary' ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Primary Data (Direct Fieldwork)
                    </motion.button>
                    <motion.button
                      aria-label="View Secondary Data Sources"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedDataSource('secondary')}
                      className={`flex-1 p-3 rounded-xl border text-xs font-bold ${
                        selectedDataSource === 'secondary' ? 'bg-gold-950/80 border-gold-500 text-gold-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Secondary Data (Published Registries)
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {selectedDataSource === 'primary' ? (
                      <>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <span className="text-emerald-400 font-bold block mb-1">Census 2011 Enumerator Method</span>
                          <p className="text-slate-400">2.7M enumerators carried printed schedules across 640 districts in 16 languages to overcome illiteracy and linguistic variation.</p>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <span className="text-emerald-400 font-bold block mb-1">Indirect Oral Investigation</span>
                          <p className="text-slate-400">Used for sensitive distress surveys (e.g. farmer indebtedness in Vidarbha) by interviewing third-party sarpanchs & doctors.</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <span className="text-gold-400 font-bold block mb-1">RBI Handbook of Statistics</span>
                          <p className="text-slate-400">Freely downloadable time-series data on M3 money supply, foreign exchange reserves, and bank credit from 1950 onwards.</p>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <span className="text-gold-400 font-bold block mb-1">Economic Survey (Ministry of Finance)</span>
                          <p className="text-slate-400">Annual macroeconomic report presented before the Union Budget detailing GDP growth, fiscal deficit, and sectoral trends.</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 4: Interactive Frequency Distribution & Sturges Rule (SVG DIAGRAM #3) */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM #3: Frequency Distribution Class Boundaries */}
                  <svg viewBox="0 0 700 120" className="w-full bg-slate-950 rounded-xl p-2 border border-slate-800" aria-label="Diagram showing exclusive class boundary allocation rules">
                    <rect x="50" y="20" width="180" height="60" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                    <text x="140" y="45" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Class: ₹200 – ₹250</text>
                    <text x="140" y="65" textAnchor="middle" fill="#f87171" fontSize="9">Upper limit ₹250 EXCLUDED ✗</text>

                    <path d="M 240 50 L 300 50" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow2)" />
                    <defs>
                      <marker id="arrow2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                      </marker>
                    </defs>

                    <rect x="310" y="20" width="180" height="60" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="400" y="45" textAnchor="middle" fill="#d1fae5" fontSize="11" fontWeight="bold">Class: ₹250 – ₹300</text>
                    <text x="400" y="65" textAnchor="middle" fill="#34d399" fontSize="9">₹250 Exact Wage INCLUDED ✓</text>

                    <rect x="510" y="20" width="160" height="60" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                    <text x="590" y="45" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Class: ₹300 – ₹350</text>
                    <text x="590" y="65" textAnchor="middle" fill="#64748b" fontSize="9">₹300 Lower Boundary</text>
                  </svg>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Sample Size (N respondents):</span>
                      <span className="text-gold-400 font-bold">{sturgesSampleSize} Workers</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={500}
                      value={sturgesSampleSize}
                      aria-label="Sturges sample size slider"
                      onChange={(e) => handleSturgesChange(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />

                    <div className="p-3 bg-slate-900 rounded-lg flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 block">Sturges’ Formula:</span>
                        <code className="text-gold-300 font-mono">k = 1 + 3.322 × log₁₀(N)</code>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block">Recommended Classes (k):</span>
                        <span className="text-emerald-400 font-bold text-base">{calculatedSturgesK} Classes</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-semibold text-amber-300 block">Test Boundary Value in Exclusive Intervals:</span>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={classifiedWageSample}
                        aria-label="Classified wage sample value input"
                        onChange={(e) => setClassifiedWageSample(Number(e.target.value))}
                        className="w-28 p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                      />
                      <span className="text-xs text-slate-300">
                        Placed in: <strong className="text-emerald-400 font-mono">
                          {classifiedWageSample < 200 ? 'Below ₹200' :
                           classifiedWageSample < 250 ? '₹200 - ₹250' :
                           classifiedWageSample < 300 ? '₹250 - ₹300' :
                           classifiedWageSample < 350 ? '₹300 - ₹350' : '₹350+'}
                        </strong> (Upper limit excluded from prior class)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Go to previous step"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs md:text-sm font-semibold"
            >
              ← Previous
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-md shadow-gold-950"
              >
                Next Step →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Open sandbox simulator"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg shadow-emerald-950"
              >
                Open Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX (PRESSURE-FREE EXPERIMENTATION) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-gold-300">Free Economic Simulation Sandbox</h3>
            <p className="text-xs text-slate-400 mt-1">
              Explore how sample size, class intervals, and Five-Year Plan targets interact dynamically without test grading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 block">Frequency Class Interval Width (h): ₹{customClassWidth}</span>
              <input
                type="range"
                min={20}
                max={100}
                step={10}
                value={customClassWidth}
                aria-label="Custom class width slider"
                onChange={(e) => setCustomClassWidth(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="space-y-1 text-xs font-mono text-slate-300 pt-2">
                <div className="p-2 bg-slate-950 rounded">Interval 1: ₹100 - ₹{100 + customClassWidth} (Midpoint: ₹{100 + customClassWidth / 2})</div>
                <div className="p-2 bg-slate-950 rounded">Interval 2: ₹{100 + customClassWidth} - ₹{100 + customClassWidth * 2} (Midpoint: ₹{100 + (customClassWidth * 3) / 2})</div>
                <div className="p-2 bg-slate-950 rounded">Interval 3: ₹{100 + customClassWidth * 2} - ₹{100 + customClassWidth * 3} (Midpoint: ₹{100 + (customClassWidth * 5) / 2})</div>
              </div>
            </div>

            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-300 block">Predict & Verify Checkpoint</span>
              {!predictionMade ? (
                <div className="space-y-2">
                  <p className="text-xs text-slate-300">{PREDICTION_QUESTIONS[0].question}</p>
                  {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Predict option ${i + 1}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handlePrediction(i)}
                      className="w-full text-left p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs text-slate-300"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  <p className="text-emerald-400 font-semibold">✓ Prediction confirmed!</p>
                  <p className="text-slate-300">{PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                </div>
              )}
            </div>
          </div>

          <motion.button
            aria-label="Advance to Competency Challenges"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-gold-600 hover:from-emerald-500 hover:to-gold-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950"
          >
            Ready for CISCE Competency Challenges →
          </motion.button>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE (ADAPTIVE BKT + NEP COMPETENCY) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">
              Challenge {currentChallenge + 1} of {filteredChallenges.length}
            </span>
            <span className="px-2.5 py-1 bg-gold-950 text-gold-300 border border-gold-700 rounded-full font-mono">
              Competency: {challenge.competencyLevel.toUpperCase()}
            </span>
          </div>

          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={(currentChallenge + 1) * (100 / filteredChallenges.length)} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-emerald-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base md:text-lg font-bold text-white leading-snug">{challenge.question}</h3>
              {hintCount < 3 && !showExplanation && (
                <motion.button
                  aria-label={`Show hint ${hintCount + 1} of 3`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={showNextHint}
                  className="px-3 py-1 bg-amber-950/70 hover:bg-amber-900 border border-amber-700 text-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
                >
                  <span aria-hidden="true">💡</span>
                  <span>Hint ({hintCount}/3)</span>
                </motion.button>
              )}
            </div>

            {/* MCQ Challenge Type */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm transition-all border flex items-center justify-between ${
                      wrongFlash
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span><span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span> {opt}</span>
                    {showExplanation && i === challenge.correctIndex && (
                      <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenge Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-xs text-white font-medium cursor-grab active:cursor-grabbing shadow"
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item) => (
                    <div
                      key={item.targetId}
                      role="region"
                      aria-label={`Target container for slot ${item.targetId.replace('box_', '')}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-center items-center min-h-[70px] text-xs transition-colors ${
                        droppedLabels[item.targetId]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-slate-500 text-[10px] uppercase mb-1">Target Slot: {item.targetId.replace('box_', '')}</span>
                      <span>{droppedLabels[item.targetId] ? `✓ ${droppedLabels[item.targetId]}` : 'Drop label here'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify drag and drop mappings"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIndex + 1}: ${item}`}
                      draggable
                      onDragStart={() => handleDragStart(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0', 10);
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs md:text-sm text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gold-400">{displayIndex + 1}.</span>
                        <span>{item}</span>
                      </div>
                      <span className="text-slate-500">⠿</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Submit arranged sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl"
                >
                  Submit Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge Type */}
            {challenge.type === 'numeric' && (
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    aria-label={`Numeric input for ${challenge.unit || 'value'}`}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white w-40"
                  />
                  <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    aria-label="Check calculation answer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl"
                  >
                    Check Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add component ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-gold-300"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gold-900 border border-gold-700 text-gold-200 rounded-md text-xs flex items-center gap-1.5">
                      {part}
                      <button aria-label={`Remove component ${part}`} onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))} className="text-rose-400">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Assemble cycle components in order</span>}
                </div>

                <motion.button
                  aria-label="Verify constructed policy cycle"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-amber-950/40 border border-amber-800 rounded-xl space-y-3">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Conceptual Breakdown</span>
                <div className="space-y-1.5">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                    <motion.p key={idx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-amber-200 leading-relaxed">
                      <strong className="text-amber-400">{idx + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Show next step of explanation"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-3 py-1.5 bg-amber-800 hover:bg-amber-700 text-amber-100 rounded-lg text-xs font-semibold"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Assessment' : 'Go to Next Challenge'}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY PROFILE PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-gold-950/70 rounded-2xl border border-emerald-700/80 text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-300">🎉 Simulation Complete!</h2>
            <p className="text-sm text-slate-300">You evaluated India’s economic planning models and applied statistical data organization.</p>

            {/* Personalized Motivational Feedback */}
            <div className={`p-4 rounded-xl border text-center my-3 ${motivationalFeedback.color}`}>
              <h3 className="text-lg font-extrabold">{motivationalFeedback.badge}</h3>
              <p className="text-xs md:text-sm mt-1">{motivationalFeedback.text}</p>
            </div>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Mastery Tier</span>
                <span className="text-xl font-bold text-gold-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span aria-hidden="true">💭</span> Deep Reflection & Conceptual Consolidation
            </h3>
            <div className="space-y-4 text-xs md:text-sm">
              <div className="space-y-1.5">
                <label htmlFor="ref-surprising" className="font-semibold text-slate-300 block">
                  1. What was the most surprising thing you learned about India&apos;s Five-Year Plans or NITI Aayog?
                </label>
                <textarea
                  id="ref-surprising"
                  value={reflections.surprising}
                  onChange={(e) => setReflections(r => ({ ...r, surprising: e.target.value }))}
                  placeholder="e.g., I was surprised that NITI Aayog has zero power to allocate central funds to states..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-gold-500 focus:outline-none"
                  rows={2}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ref-explain" className="font-semibold text-slate-300 block">
                  2. How would you explain the exclusive class interval boundary rule (e.g., ₹200-₹250) to a friend?
                </label>
                <textarea
                  id="ref-explain"
                  value={reflections.explainFriend}
                  onChange={(e) => setReflections(r => ({ ...r, explainFriend: e.target.value }))}
                  placeholder="e.g., The upper limit is like a strict ceiling — exact values at the boundary get bumped up into the next room..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-gold-500 focus:outline-none"
                  rows={2}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ref-reallife" className="font-semibold text-slate-300 block">
                  3. Where in real life might you use primary surveys and Sturges’ Rule?
                </label>
                <textarea
                  id="ref-reallife"
                  value={reflections.realLife}
                  onChange={(e) => setReflections(r => ({ ...r, realLife: e.target.value }))}
                  placeholder="e.g., When calculating customer spending patterns or student study hours for a school project..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-gold-500 focus:outline-none"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Targeted Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl text-xs space-y-1">
                      <p className="text-rose-400">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Fact: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800 text-xs text-amber-200">
            <h4 className="font-bold text-amber-300 mb-1">📅 SM-2 Spaced Repetition Review Schedule</h4>
            <p>
              Your next review cycle is set for <strong className="text-amber-100">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to lock these statistical planning principles into long-term memory.
            </p>
          </div>

          {/* Real-World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-300">🏛️ Real-World Activity: {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx}>• {step}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Engine Feedbacks */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_EconomicsPlanningEconomicDevelopmentSim;
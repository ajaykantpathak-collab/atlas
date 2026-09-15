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
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ALL 10 ISC CLASS 11 COMMERCE SYLLABUS NODES) ───
const NODE_C11_COMM_001 = 'c11_comm_001';
const NODE_C11_COMM_002 = 'c11_comm_002';
const NODE_C11_COMM_003 = 'c11_comm_003';
const NODE_C11_COMM_004 = 'c11_comm_004';
const NODE_C11_COMM_005 = 'c11_comm_005';
const NODE_C11_COMM_006 = 'c11_comm_006';
const NODE_C11_COMM_007 = 'c11_comm_007';
const NODE_C11_COMM_008 = 'c11_comm_008';
const NODE_C11_COMM_009 = 'c11_comm_009';
const NODE_C11_COMM_010 = 'c11_comm_010';

const ALL_NODE_IDS = [
  NODE_C11_COMM_001,
  NODE_C11_COMM_002,
  NODE_C11_COMM_003,
  NODE_C11_COMM_004,
  NODE_C11_COMM_005,
  NODE_C11_COMM_006,
  NODE_C11_COMM_007,
  NODE_C11_COMM_008,
  NODE_C11_COMM_009,
  NODE_C11_COMM_010,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The "Bharat Enterprise" Genesis: From Anand Farms to Global Markets',
  intro:
    'You have been appointed as the Chief Strategy Consultant to "Bharat Heritage & Enterprise Consortium". From dairy farmers in Anand to silk weavers in Kanchipuram, and tech startups in Bengaluru to heavy steel in Jamshedpur, your mission is to systematically map human activities, evaluate risk-reward structures, orchestrate trade and its six vital aids, balance commercial profits with CSR, and select optimal ownership forms.',
  context:
    'You will navigate real Indian commercial frameworks: MSME Act 2020 thresholds, Companies Act 2013 Section 135 CSR mandates, Banking Regulation Act 1949, and the doctrine of unlimited liability.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question:
    'A renowned cardiac surgeon in Chennai treats his own daughter at home for free on Sunday morning. On Monday morning, he charges ₹1,500 consultation fees at Apollo Hospitals. How does commercial law classify these two actions?',
  options: [
    'Both are Economic (Profession) because he is a licensed doctor under the NMC Act 2019.',
    'Sunday is Non-Economic (Domestic); Monday is Economic (Profession).',
    'Both are Non-Economic because healing human lives is an ethical duty.',
    'Sunday is Leisure; Monday is Employment.',
  ],
  correctIndex: 1,
  hintAfter:
    'Classification attaches to the SPECIFIC ACT and its motive/exchange context, NOT the person’s lifelong profession!',
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
  bloomLevel?: string;
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_COMM_001,
  title: 'Classification of Human Activities, Business & Commerce Systems',
  definition:
    'Human activities split into Economic (Business, Profession, Employment) and Non-Economic (Customary, Domestic, Leisure, Charitable). Business encompasses Industry (form utility) and Commerce (Trade + 6 Aids to Trade creating place, time, and possession utility), governed by distinct Indian statutes.',
  eli5:
    'People do things either to earn a living (economic) or for love, care, duty, and fun (non-economic). Businesses make or move goods to earn profit while bearing risk, obeying Indian commercial laws and helping society.',
  misconceptions: [
    {
      misconception: 'A homemaker cooking meals is an economic activity because the restaurant equivalent has market value.',
      correction: 'Economic activity requires an actual monetary exchange and livelihood motive. Notional or hypothetical market value does not count.',
    },
    {
      misconception: 'A doctor or CA employed on a fixed salary in a corporation is in a profession.',
      correction: 'They are in Employment. Their reward is a fixed salary under a contract of service with zero capital risk.',
    },
    {
      misconception: 'Commerce and Trade are identical synonyms.',
      correction: 'Trade is merely the buying and selling branch. Commerce = Trade + 6 Aids to Trade (Transport, Warehousing, Banking, Finance, Insurance, Advertising).',
    },
    {
      misconception: 'A firm with ₹8 Cr plant investment and ₹80 Cr turnover is a Small Enterprise.',
      correction: 'Under MSME July 2020 rules, BOTH investment and turnover limits must be met. ₹80 Cr breaches the Small limit (₹50 Cr), making it a Medium Enterprise.',
    },
    {
      misconception: 'A public limited company like Infosys or TCS belongs to the Public Sector.',
      correction: 'Infosys and TCS are in the Private Sector. "Public limited" denotes shares offered to the general public, not government ownership.',
    },
    {
      misconception: 'Sole proprietorship has a separate legal entity from its owner.',
      correction: 'The owner and business are legally identical. The proprietor bears unlimited personal liability for all business debts.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which of the following is a Non-Economic Charitable activity?',
      options: ['Amul selling butter', 'Akshaya Patra serving free mid-day meals', 'TCS software engineer coding', 'Doctor charging clinic fee'],
      correctIndex: 1,
    },
    {
      question: 'What is the mandatory statutory body regulating Chartered Accountants in India?',
      options: ['Bar Council of India', 'NMC', 'ICAI under CA Act 1949', 'SEBI'],
      correctIndex: 2,
    },
    {
      question: 'Which utility is created by Industry as opposed to Commerce?',
      options: ['Place utility', 'Time utility', 'Form utility', 'Possession utility'],
      correctIndex: 2,
    },
    {
      question: 'Under MSME 2020 norms, what is the ceiling for a Micro Enterprise?',
      options: ['Investment ≤ ₹1 Cr and Turnover ≤ ₹5 Cr', 'Investment ≤ ₹10 Cr and Turnover ≤ ₹50 Cr', 'Investment ≤ ₹25 Lakh', 'Turnover ≤ ₹10 Cr'],
      correctIndex: 0,
    },
    {
      question: 'Which aid to trade removes the "Hindrance of Time"?',
      options: ['Transportation', 'Warehousing', 'Banking', 'Advertising'],
      correctIndex: 1,
    },
    {
      question: 'Under Companies Act 2013 Section 135, what percentage of average net profit must qualifying firms spend on CSR?',
      options: ['1%', '2%', '5%', '10%'],
      correctIndex: 1,
    },
    {
      question: 'What is the defining feature of a Public-Private Partnership (PPP)?',
      options: ['Government buys supplies at lowest cost', 'Shared equity, risks, and rewards between govt and private partner', '100% private ownership', 'Tax exemption for life'],
      correctIndex: 1,
    },
    {
      question: 'If a sole proprietorship suffers a debt of ₹50 Lakh with business assets of only ₹15 Lakh, the remaining ₹35 Lakh:',
      options: ['Is forgiven by the court', 'Is paid by government subsidy', 'Can be recovered by attaching the owner’s personal house and savings', 'Is converted into equity shares'],
      correctIndex: 2,
    },
  ],
  masteryCriteria:
    'Student demonstrates 100% conceptual clarity across the 10 ISC Commerce nodes: activity classification, 6-parameter economic distinctions, 8 business characteristics, MSME dual thresholds, Commerce tree & 6 aids, supply-chain synthesis, CSR & profit roles, sector ownership tests, and sole proprietorship unlimited liability analysis.',
};

// ─── EXPLORATION STEPS (BRILLIANT.ORG STYLE — LEARN BY DOING) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Spectrum of Human Activities',
    instruction: 'Click each Indian activity card to reveal its Motive, Monetary Exchange status, and Statutory Category.',
    interactionType: 'click-activity',
    nodeId: NODE_C11_COMM_001,
  },
  {
    title: 'Lab 2: Economic Triad Comparator (Business vs Profession vs Employment)',
    instruction: 'Adjust the structural parameters to see how risk, reward, and legal codes shift across occupations.',
    interactionType: 'slider-triad',
    nodeId: NODE_C11_COMM_002,
  },
  {
    title: 'Lab 3: The MSME Dual-Threshold Matrix Visualizer',
    instruction: 'Set Investment and Turnover values to dynamically classify enterprise scale on the official MSME coordinate plane.',
    interactionType: 'slider-msme',
    nodeId: NODE_C11_COMM_004,
  },
  {
    title: 'Lab 4: The Tree of Commerce & 6 Aids-to-Trade Symphony',
    instruction: 'Trace the Alphonso Mango supply chain and inspect how the 6 Aids eliminate barriers to create multi-dimensional utility.',
    interactionType: 'flow-aids',
    nodeId: NODE_C11_COMM_006,
  },
  {
    title: 'Lab 5: The Dual Objective & Unlimited Liability Shock Meter',
    instruction: 'Balance Profit vs CSR under Section 135 and observe how Sole Proprietorship debts liquidate personal household wealth.',
    interactionType: 'simulator-matrix',
    nodeId: NODE_C11_COMM_010,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If Anjali Fabrics in Coimbatore invests ₹8 Crore in machinery and achieves ₹65 Crore annual turnover, how will the Ministry of MSME classify the firm under July 2020 rules?',
    options: [
      'Small Enterprise (because investment is under ₹10 Cr)',
      'Medium Enterprise (because turnover exceeded the ₹50 Cr Small limit)',
      'Micro Enterprise',
      'Large Enterprise',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the Turnover slider past ₹50 Cr in the MSME Sizer below to verify the dynamic dual-threshold rule.',
    nodeId: NODE_C11_COMM_004,
  },
  {
    question:
      'Predict: If a Kirana shop owner faces a sudden supplier default of ₹25 Lakh with only ₹5 Lakh in shop cash, what legal protection do his personal residential assets have?',
    options: [
      'Total protection — sole proprietorships have limited liability',
      'Zero protection — the doctrine of unlimited liability exposes personal house, car, and savings',
      '75% government relief under MSME PMEGP',
      'Protection up to ₹20 Lakh under GST Act',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the debt slider in Lab 5 to observe personal wealth liquidation in real-time.',
    nodeId: NODE_C11_COMM_010,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What pattern do you observe in the Commerce Supply Chain when Transportation or Warehousing is removed?',
    observableOptions: [
      'Form utility is destroyed, halting factory production immediately.',
      'Place and Time utility collapse, stranding goods at the factory gate and spiking market prices.',
      'The company automatically switches to a public sector enterprise.',
      'No effect, as banking covers all physical movement.',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_COMM_007,
  },
];

// ─── 22+ CHALLENGES ARRAY WITH FULL NEP 2020 COMPETENCY MAPPING ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (1-7) ──
  {
    id: 'ch_comm_001',
    nodeId: NODE_C11_COMM_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A Marwari family in Kolkata distributes homemade laddoos to neighbours during Diwali. This activity is classified as:',
    options: ['Economic — Business', 'Non-Economic — Customary', 'Economic — Employment', 'Non-Economic — Domestic'],
    correctIndex: 1,
    explanation: 'Customary activities are non-economic acts performed out of tradition or religious customs with zero monetary exchange or profit motive.',
    hints: [
      'Is there any bill, invoice, or monetary payment received?',
      'It is done as a traditional festival ritual on Diwali.',
      'Non-monetary tradition-driven acts are classified as Non-Economic Customary activities.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_comm_002',
    nodeId: NODE_C11_COMM_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A Chartered Accountant is employed as CFO at Tata Motors on a fixed annual CTC of ₹1.5 Crore. His economic classification is:',
    options: ['Profession (because he holds ICAI membership)', 'Business (because Tata Motors is a giant corporation)', 'Employment (reward is fixed salary under a contract of service)', 'Non-Economic executive service'],
    correctIndex: 2,
    explanation: 'Classification depends on the reward structure and contract of service. A fixed salary with zero capital risk constitutes Employment, even if the person holds a professional degree.',
    hints: [
      'Look at how he is rewarded: is it fees per client audit or a fixed monthly corporate salary?',
      'Does he bear the capital loss if Tata Motors loses money?',
      'Fixed remuneration under an employment contract = Employment.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_comm_003',
    nodeId: NODE_C11_COMM_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is an example of an Extractive Primary Industry in India?',
    options: ['Amul rearing Gir cows for dairy breeding', 'Coal India Limited mining coal from Jharia open-cast mines', 'Tata Steel converting iron ore into hot-rolled coils', 'Larsen & Toubro building the Chenab Railway Bridge'],
    correctIndex: 1,
    explanation: 'Extractive industries extract non-renewable or natural resources directly from the earth, sea, or air without biological reproduction.',
    hints: [
      'Extractive involves drawing out raw mineral or natural deposits from nature.',
      'Coal India draws coal directly from geological deposits.',
      'Genetic involves breeding/reproduction; Extractive involves extraction from nature.',
    ],
  },
  {
    id: 'ch_comm_004',
    nodeId: NODE_C11_COMM_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which branch of Commerce is responsible for removing the "Hindrance of Place"?',
    options: ['Warehousing', 'Transportation', 'Banking', 'Insurance'],
    correctIndex: 1,
    explanation: 'Transportation bridges the physical distance between production centers (e.g., Jamshedpur steel) and consumption locations (e.g., Chennai builders).',
    hints: [
      'Goods are made in one city but needed in another.',
      'What physical service carries goods across distances?',
      'Transportation eliminates spatial separation.',
    ],
  },
  {
    id: 'ch_comm_005',
    nodeId: NODE_C11_COMM_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is Infosys Limited classified as Private Sector even though it is a "Public Limited Company"?',
    options: [
      'Because the Government of India owns 51% of its equity.',
      'Because "Public Limited" means shares are publicly tradeable, but equity ownership is held by private individuals and institutional investors.',
      'Because it provides public IT services.',
      'Because it is exempt from all corporate taxes.',
    ],
    correctIndex: 1,
    explanation: '"Public Limited" is a corporate legal form under Companies Act 2013 Section 2(71). Sector classification is strictly determined by ownership — Infosys is owned by private shareholders, not the State.',
    hints: [
      'Does the government own Infosys?',
      '"Public Limited" refers to the stock exchange listing of shares.',
      'Private sector = private equity ownership. Public sector = government equity ownership.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_comm_006',
    nodeId: NODE_C11_COMM_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the doctrine of Unlimited Liability in a Sole Proprietorship?',
    options: [
      'The owner can borrow unlimited funds from banks without collateral.',
      'The owner’s personal assets can be legally attached to settle unpaid business debts.',
      'The business can operate in unlimited states without GST.',
      'The owner enjoys unlimited tax exemptions under the Income Tax Act.',
    ],
    correctIndex: 1,
    explanation: 'In sole proprietorship, there is no separate legal entity. The proprietor and business are one; personal house, savings, and assets are at stake for business obligations.',
    hints: [
      'If the shop fails and owes creditors, where do creditors look next?',
      'There is no corporate veil separating owner and firm.',
      'Creditors can seize personal property to satisfy unpaid debts.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_comm_007',
    nodeId: NODE_C11_COMM_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which regulatory authority governs advertising standards and misleading claims in India?',
    options: ['IRDAI', 'ASCI & Consumer Protection Act 2019 (CCPA)', 'SEBI', 'RBI'],
    correctIndex: 1,
    explanation: 'The Advertising Standards Council of India (ASCI) enforces ethical codes, while the Central Consumer Protection Authority under CPA 2019 penalises misleading advertisements.',
    hints: [
      'Recall the Patanjali Coronil misleading advertisement rulings.',
      'ASCI sets self-regulatory advertising codes in India.',
      'Consumer Protection Act 2019 empowers the CCPA against false ads.',
    ],
  },

  // ── STANDARD TIER (8-15) — APPLICATION & ANALYSIS ──
  {
    id: 'ch_comm_008',
    nodeId: NODE_C11_COMM_004,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Shakti Forgings in Ludhiana has ₹8.5 Crore invested in plant machinery and registers ₹46 Crore annual turnover. Under the MSME Act 2020 notification, enter its maximum turnover limit (in ₹ Crores) to remain in the "Small" enterprise bracket.',
    correctAnswer: 50,
    tolerance: 0,
    unit: '₹ Crore',
    explanation: 'Under the revised MSME 2020 criteria: Micro (≤ ₹1 Cr Inv / ≤ ₹5 Cr TO), Small (≤ ₹10 Cr Inv / ≤ ₹50 Cr TO), Medium (≤ ₹50 Cr Inv / ≤ ₹250 Cr TO). The Small turnover ceiling is ₹50 Crore.',
    hints: [
      'Review the composite MSME 2020 thresholds.',
      'Micro turnover cap is ₹5 Cr; Small turnover cap is 10x that.',
      'The Small turnover limit is exactly ₹50 Crore.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_comm_009',
    nodeId: NODE_C11_COMM_008,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A listed Indian cement company has an average net profit of ₹450 Crore over the preceding 3 financial years. Under Section 135 of the Companies Act 2013, calculate its mandatory minimum CSR expenditure in ₹ Crores.',
    correctAnswer: 9,
    tolerance: 0.1,
    unit: '₹ Crore',
    explanation: 'Section 135 mandates that qualifying companies must spend at least 2% of their average net profit of the preceding 3 years on CSR: 2% of ₹450 Crore = ₹9.0 Crore.',
    hints: [
      'What percentage does Section 135 mandate on 3-year average net profits?',
      'Calculate 2% of ₹450 Crore.',
      '450 × 0.02 = 9 Crore.',
    ],
  },
  {
    id: 'ch_comm_010',
    nodeId: NODE_C11_COMM_005,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match each specific Commercial Aid to the exact Hindrance it eliminates in the supply chain:',
    dragItems: [
      { label: 'Transport', targetId: 'slot_place' },
      { label: 'Warehousing', targetId: 'slot_time' },
      { label: 'Insurance', targetId: 'slot_risk' },
      { label: 'Advertising', targetId: 'slot_knowledge' },
    ],
    correctMapping: {
      slot_place: 'Transport',
      slot_time: 'Warehousing',
      slot_risk: 'Insurance',
      slot_knowledge: 'Advertising',
    },
    explanation: 'Transport overcomes Place, Warehousing overcomes Time, Insurance overcomes Risk of loss, and Advertising overcomes Knowledge gaps.',
    hints: [
      'Where goods move = Place (Transport).',
      'When goods are preserved between seasons = Time (Warehousing).',
      'Protection against fire/theft = Risk (Insurance); Customer awareness = Knowledge (Advertising).',
    ],
  },
  {
    id: 'ch_comm_011',
    nodeId: NODE_C11_COMM_007,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of value addition from raw extraction to final retail consumption:',
    sortItems: [
      'Primary Extractive Industry: Mining iron ore at Keonjhar',
      'Secondary Manufacturing Industry: Smelting steel coils at Jamshedpur',
      'Commerce (Aids): Rail freight transit & CWC warehouse storage',
      'Commerce (Trade): Wholesale distribution and retail sale to builders',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The logical economic chain flows: Extraction (Primary) → Transformation into Form Utility (Secondary) → Storage/Transit Facilitation (Aids) → Title Transfer to Buyer (Trade).',
    hints: [
      'Extraction must precede manufacturing transformation.',
      'After manufacturing, transport/warehousing aids move goods to trade markets.',
      'Final step is retail trade handover to the buyer.',
    ],
  },
  {
    id: 'ch_comm_012',
    nodeId: NODE_C11_COMM_002,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare a Salon Owner charging ₹400 for haircuts vs a Neurosurgeon charging ₹1,500 at an independent clinic. Why is the neurosurgeon in a Profession while the salon owner is in Business?',
    options: [
      'Because surgery is more expensive than haircuts.',
      'Because the neurosurgeon is mandated by law to hold an MBBS/MS registered with a statutory body (NMC Act 2019) bound by a strict disciplinary code; the salon owner requires only a municipal shop trade licence.',
      'Because salon owners do not pay GST.',
      'Because hospitals are always public sector.',
    ],
    correctIndex: 1,
    explanation: 'A Profession requires statutory gatekeeping — qualification mandated by an Act of Parliament (NMC Act, ICAI Act, Advocates Act) with disciplinary powers. Service businesses require ordinary trade licences.',
    hints: [
      'What statutory body regulates hairdressers in India? None!',
      'What statutory body regulates doctors? The National Medical Commission.',
      'Statutory qualification and code of conduct create a Profession.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_comm_013',
    nodeId: NODE_C11_COMM_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How do Commercial Studies distinguish between Business Risk and Business Uncertainty?',
    options: [
      'Risk and Uncertainty are identical terms for monetary loss.',
      'Risk is quantifiable and insurable (e.g., fire, transit damage); Uncertainty is non-quantifiable and non-insurable (e.g., pandemic lockdown, sudden consumer fashion shift).',
      'Risk applies only to companies; Uncertainty applies to sole proprietorships.',
      'Uncertainty can always be insured with LIC.',
    ],
    correctIndex: 1,
    explanation: 'Risk has calculable statistical probabilities allowing actuarial pricing by insurers. Uncertainty involves unprecedented events (like COVID-19 lockdowns) where probabilities cannot be calculated.',
    hints: [
      'Can you buy a standard insurance policy against a global pandemic shutdown prior to 2020?',
      'Can you buy a fire insurance policy for a warehouse?',
      'Insurable = Risk; Non-insurable/unpredictable = Uncertainty.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_comm_014',
    nodeId: NODE_C11_COMM_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The National Highways Authority of India (NHAI) partners with L&T under the Hybrid Annuity Model (HAM), where NHAI funds 40% in milestones and bears traffic demand risk, while L&T funds 60% and bears construction risk. This arrangement is:',
    options: [
      'A pure Private Sector procurement purchase order',
      'A pure Public Sector departmental railway operation',
      'A Public-Private Partnership (PPP / Joint Sector) characterized by shared equity, risks, and responsibilities',
      'A non-economic charitable road trust',
    ],
    correctIndex: 2,
    explanation: 'HAM is a classic Public-Private Partnership where project risk is systematically allocated between the public authority (demand/toll collection) and the private concessionaire (construction/quality).',
    hints: [
      'Both government (NHAI) and private firm (L&T) share funding and distinct risks.',
      'Is it purely private? No. Purely public? No.',
      'Shared risk and rewards = PPP (Joint Sector).',
    ],
  },
  {
    id: 'ch_comm_015',
    nodeId: NODE_C11_COMM_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does a Sole Proprietorship face severe "Limited Capital" even when the proprietor is personally hardworking and creditworthy?',
    options: [
      'The government bans sole proprietors from opening bank accounts.',
      'Capital is bounded by one individual’s personal savings, and commercial banks restrict large lending because unlimited liability creates high recovery friction upon personal default.',
      'GST laws confiscate 90% of sole proprietor retained profits.',
      'Sole proprietors are legally forbidden from reinvesting profits.',
    ],
    correctIndex: 1,
    explanation: 'Limited capital in sole proprietorship is dual-rooted: personal net worth is finite, and institutional lenders cap exposure because enforcing claims against personal assets is legally cumbersome.',
    hints: [
      'Can a sole proprietor issue public shares on the BSE to millions of investors?',
      'Why do banks hesitate to lend ₹100 Crore to an unincorporated individual?',
      'Single owner equity capacity + lender caution due to unlimited liability = Limited Capital.',
    ],
    misconceptionIndex: 0,
  },

  // ── ADVANCED TIER (16-22+) ──
  {
    id: 'ch_comm_016',
    nodeId: NODE_C11_COMM_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the 2008-2018 Tata Nano project: Tata Motors launched the Nano at ₹1 Lakh to provide affordable, safe mobility to Indian two-wheeler families, but the model suffered continuous losses and was shelved. What foundational commerce principle does this demonstrate?',
    options: [
      'Social objectives are illegal under the Companies Act 2013.',
      'Economic viability (sustainable profit) is the prerequisite foundation; pursuing a social objective without economic viability leads to operational failure because profit is what sustains business continuity.',
      'Public sector companies should never manufacture cars.',
      'Advertising should be banned for passenger vehicles.',
    ],
    correctIndex: 1,
    explanation: 'Economic objectives (profit, survival, growth) provide the financial foundation. Without profit to cover long-term costs and risk, social goals cannot be sustained.',
    hints: [
      'Can an enterprise continue serving society if its revenues consistently fail to cover its costs?',
      'Profit is the means of survival and replenishes capital.',
      'Social objectives must be built on a foundation of economic viability.',
    ],
  },
  {
    id: 'ch_comm_017',
    nodeId: NODE_C11_COMM_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An export garment unit in Tirupur has ₹9.2 Crore investment in knitting machinery and ₹54 Crore annual export turnover in FY 2024. Which classification and consequence apply under the MSME Act (as amended July 2020)?',
    options: [
      'Small Enterprise — because investment (₹9.2 Cr) is under the ₹10 Cr ceiling.',
      'Medium Enterprise — because turnover (₹54 Cr) breached the ₹50 Cr Small ceiling, even though investment remained under ₹10 Cr; it loses Micro/Small priority lending reservations.',
      'Large Enterprise — export turnover is taxed at 50% penalty.',
      'Micro Enterprise — exports are exempt from turnover calculations.',
    ],
    correctIndex: 1,
    explanation: 'Under July 2020 MSME rules, BOTH conditions must be satisfied. Crossing EITHER threshold elevates the enterprise to the next tier. ₹54 Cr turnover elevates it from Small to Medium.',
    hints: [
      'Check both investment (≤ ₹10 Cr) AND turnover (≤ ₹50 Cr) conditions.',
      'Is ₹54 Cr greater than ₹50 Cr?',
      'Breaching either limit pushes the business into Medium category.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_comm_018',
    nodeId: NODE_C11_COMM_006,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the comprehensive 6-Aid Commercial Infrastructure required for a Darjeeling Organic Tea Estate exporting first-flush tea to Hamburg, Germany:',
    availableParts: [
      'Indian Railways & Maersk Line (Transport)',
      'Siliguri Tea Board Godown & Cold Vault (Warehousing)',
      'Punjab National Bank Letter of Credit (Banking)',
      'BSE SME Equity & SIDBI Term Loan (Finance)',
      'New India Assurance Marine Cargo Policy (Insurance)',
      'ASCI-Compliant Digital Tea Campaign (Advertising)',
    ],
    targetState:
      'Indian Railways & Maersk Line (Transport) Siliguri Tea Board Godown & Cold Vault (Warehousing) Punjab National Bank Letter of Credit (Banking) BSE SME Equity & SIDBI Term Loan (Finance) New India Assurance Marine Cargo Policy (Insurance) ASCI-Compliant Digital Tea Campaign (Advertising)',
    validationHint: 'Add all 6 supporting pillars in logical order: Transport → Warehousing → Banking → Finance → Insurance → Advertising.',
    explanation: 'Every international commercial trade relies on the full ensemble: Transport moves cargo, Warehousing bridges seasons, Banking secures short-term letters of credit, Finance provides long-term capital, Insurance covers marine risk, and Advertising builds market demand.',
    hints: [
      'Select each of the 6 aids to construct the export framework.',
      'Every single aid removes a distinct barrier in the tea export journey.',
      'Combine all 6 listed institutional instruments.',
    ],
  },
  {
    id: 'ch_comm_019',
    nodeId: NODE_C11_COMM_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Akshaya Patra Foundation operates 72 automated industrial kitchens, employs 6,500+ paid cooks and technicians, and cooks 1.8 million mid-day meals daily. Under Indian tax and commercial principles, why is this classified as a Non-Economic (Charitable) activity?',
    options: [
      'Because all industrial machinery in India is classified as non-economic.',
      'Because classification is determined strictly by Motive (social welfare without profit or beneficiary exchange), as recognized by Section 12A of the Income Tax Act 1961, regardless of operating scale.',
      'Because it does not use electricity.',
      'Because mid-day meals are covered under the Factories Act.',
    ],
    correctIndex: 1,
    explanation: 'Scale, modern technology, and paid staff do not turn an activity into a business. The core legal and economic test is the absence of a profit motive and commercial exchange with beneficiaries.',
    hints: [
      'Are school children charged market prices for the food?',
      'Does the trust distribute corporate dividends to shareholders?',
      'Social welfare motive + Section 12A tax exemption = Non-Economic Charitable activity.',
    ],
  },
  {
    id: 'ch_comm_020',
    nodeId: NODE_C11_COMM_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Compare Steel Authority of India Limited (SAIL) and Tata Steel Limited. Both manufacture hot-rolled steel coils in India. How do their ownership, governing ministries, and fundamental objectives differ?',
    options: [
      'SAIL is private; Tata Steel is a departmental public undertaking.',
      'SAIL is Public Sector (majority GoI equity, Ministry of Steel, public welfare + reasonable return); Tata Steel is Private Sector (owned by Tata Sons and public shareholders, profit-driven with corporate CSR).',
      'Tata Steel is regulated by ICAI; SAIL is regulated by NMC.',
      'Both are municipal corporations with no difference.',
    ],
    correctIndex: 1,
    explanation: 'SAIL is a Central Public Sector Enterprise (CPSE) under the Ministry of Steel with majority government shareholding. Tata Steel is an investor-owned private enterprise.',
    hints: [
      'Who owns the majority shares in SAIL? The President of India / Government of India.',
      'Who owns Tata Steel? Private shareholders and Tata Sons.',
      'Public Sector vs Private Sector comparison.',
    ],
  },
  {
    id: 'ch_comm_021',
    nodeId: NODE_C11_COMM_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An independent UI/UX designer in Pune earns ₹14 Lakh/year. She considers incorporating a One Person Company (OPC) vs continuing as a Sole Proprietor. Which trade-off analysis is correct?',
    options: [
      'OPC gives unlimited liability; Sole Proprietor gives zero tax liability.',
      'Sole Proprietorship offers zero ROC compliance burden and immediate decision secrecy, but carries unlimited personal liability; OPC offers limited liability protection but requires statutory ROC filings and audit compliance.',
      'Sole Proprietorship requires ₹50 Lakh minimum capital under the Companies Act.',
      'OPC is classified as a public sector undertaking.',
    ],
    correctIndex: 1,
    explanation: 'Sole proprietorship avoids ROC filings, board resolutions, and complex audits, making it ideal for low-risk, low-debt service operations where compliance cost savings exceed the liability risk.',
    hints: [
      'What is the main legal protection an incorporated company (like OPC) gives? Limited liability.',
      'What is the cost of having a company? High ROC statutory compliance and annual audits.',
      'Weigh compliance cost vs personal liability exposure.',
    ],
  },
  {
    id: 'ch_comm_022',
    nodeId: NODE_C11_COMM_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'NABARD reported that roughly 15% of Indian perishable fruits and vegetables spoil before reaching retail markets. In terms of the Industry-Commerce-Trade relationship, which breakdown occurs?',
    options: [
      'Industry failed to create form utility at the farm stage.',
      'The Aids to Trade (specifically cold-chain warehousing and refrigerated transport) failed, causing a breakdown in Time and Place utility between agricultural production and final retail trade.',
      'Trade laws in India prohibit the sale of fruits.',
      'The banking sector failed to issue equity shares to farmers.',
    ],
    correctIndex: 1,
    explanation: 'Perishable spoilage occurs when distribution infrastructure (aids to trade: cold storage and refrigerated transit) is insufficient to maintain time and place utility between harvest and consumption.',
    hints: [
      'Did the farmer fail to grow the fruit? No, the fruit grew (primary industry succeeded).',
      'Where did the failure happen? During storage and transportation (Aids to Trade).',
      'Breakdown in time and place utility leads to post-harvest loss.',
    ],
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Capstone: Architect an Indian Agribusiness Value Chain',
  description:
    'Design an end-to-end commercial architecture for "Kashmir Apple Orchards", transforming raw farm harvesting into branded apple juice cartons exported to Dubai.',
  steps: [
    'Classify the orchard harvest as Primary Genetic Industry and juice processing as Secondary Manufacturing.',
    'Map out all 6 Aids to Trade: refrigerated road transport to JNPT, CA-atmosphere cold warehousing, pre-shipment bank credit, equity finance, marine cargo insurance, and GCC digital marketing.',
    'Formulate an MSME scaling path from Micro (≤ ₹1 Cr Inv) to Small and evaluate the shift from Sole Proprietorship to a Private Limited Company.',
    'Allocate 2% of three-year average net profits to rural grower education in Sopore under Companies Act Section 135.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C11_CommerceClassificationHumanActivitiesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_COMM_001,
  title = DEFAULT_PROPS.title || 'Classification of Human Activities, Business & Commerce Systems',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commstud'] || {
    name: 'Commerce',
    emoji: '🏢',
    color: 'indigo',
  };

  // ─── STATE MANAGEMENT ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Discovery & Predict-Check states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Escalating hints & feedback
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
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses
  const [reflections, setReflections] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Challenge Drag & Drop / Interactive inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Interactive Lab Visualizer States
  const [selectedActivityTab, setSelectedActivityTab] = useState<'doctor' | 'farmer' | 'homemaker' | 'akshaya'>('doctor');
  const [triadCapital, setTriadCapital] = useState(50);
  const [triadRisk, setTriadRisk] = useState(50);
  const [msmeInvestment, setMsmeInvestment] = useState(8);
  const [msmeTurnover, setMsmeTurnover] = useState(42);
  const [activeAidStep, setActiveAidStep] = useState<number>(0);
  const [csrProfitInput, setCsrProfitInput] = useState(200);
  const [proprietorDebt, setProprietorDebt] = useState(30);
  const [proprietorShopAssets] = useState(10);
  const [personalHouseValue] = useState(50);
  const [sandboxMode, setSandboxMode] = useState<'msme' | 'supply' | 'liability'>('msme');

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED VALUES FOR LIVE VISUALS ───
  const dynamicMsmeCategory = useMemo(() => {
    if (msmeInvestment <= 1 && msmeTurnover <= 5) return { category: 'MICRO', color: 'emerald', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500' };
    if (msmeInvestment <= 10 && msmeTurnover <= 50) return { category: 'SMALL', color: 'blue', bg: 'bg-blue-500/20 text-blue-400 border-blue-500' };
    if (msmeInvestment <= 50 && msmeTurnover <= 250) return { category: 'MEDIUM', color: 'amber', bg: 'bg-amber-500/20 text-amber-400 border-amber-500' };
    return { category: 'LARGE', color: 'rose', bg: 'bg-rose-500/20 text-rose-400 border-rose-500' };
  }, [msmeInvestment, msmeTurnover]);

  const calculatedCsr = useMemo(() => {
    return (csrProfitInput * 0.02).toFixed(2);
  }, [csrProfitInput]);

  const liabilityDeficit = useMemo(() => {
    return Math.max(0, proprietorDebt - proprietorShopAssets);
  }, [proprietorDebt, proprietorShopAssets]);

  const remainingPersonalWealth = useMemo(() => {
    return Math.max(0, personalHouseValue - liabilityDeficit);
  }, [personalHouseValue, liabilityDeficit]);

  // ─── EFFECT: LOAD INITIAL MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── EFFECT: BKT ADAPTIVE UPDATES ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── EFFECT: 2D CANVAS COMMERCE CYCLE ANIMATION ───
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

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(30, centerY);
      ctx.lineTo(width - 30, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      const xPos = 30 + ((frame * 2.5) % (width - 60));
      ctx.beginPath();
      ctx.arc(xPos, centerY, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#6366f1';
      ctx.shadowColor = '#818cf8';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      const stages = ['Industry (Raw)', 'Transport Aid', 'Warehouse Aid', 'Retail Trade'];
      stages.forEach((st, idx) => {
        const nx = 40 + (idx * (width - 80)) / 3;
        ctx.beginPath();
        ctx.arc(nx, centerY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(st, nx, centerY + 18);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── EFFECT: CLEANUP TIMER ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge?.hints?.[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
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
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(
      isCorr
        ? 'Spot on! Classification depends on the specific act and its exchange context.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Commerce Labs. Let us learn by doing!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Manipulate the parameters without any pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenges. Analyze carefully!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now verify with the interactive simulation below.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Excellent observation!' : 'Look closely at the place and time utility indicators.');
  }, []);

  const handleNextSlide = useCallback(() => {
    if (currentSlide < EXPLORATION_STEPS.length - 1) {
      setCurrentSlide((s) => s + 1);
      audioManager.play('whoosh');
    } else {
      handleAdvanceToSandbox();
    }
  }, [currentSlide, handleAdvanceToSandbox]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((s) => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

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

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have mastered the ISC Commerce foundations.');
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

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
        const val = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Well reasoned.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3000);
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
          speechManager.speak('Let us review the step-by-step statutory reasoning.');
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
    [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-2xl shadow-inner"
            aria-label="Commerce Subject Icon"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">
              ISC Class 11 • {subjectConfig.name}
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800" role="tablist">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              role="tab"
              aria-selected={phase === p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'challenge') handleAdvanceToChallenge();
                else if (p === 'sandbox') handleAdvanceToSandbox();
                else if (p === 'explore') handleAdvanceToExploration();
                else setPhase(p);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900/80 rounded-2xl border border-indigo-800/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Curiosity Hook
              </span>
              <h2 className="text-lg font-bold text-white">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300 bg-indigo-950/70 p-3 rounded-xl border border-indigo-900/50">
              📜 <strong>Legal Context:</strong> {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wide">
              Initial Diagnostic Puzzle:
            </h3>
            <p className="text-base sm:text-lg font-medium text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all border flex items-center justify-between ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="flex items-center">
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-xs font-bold text-center leading-6 mr-2">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </span>
                  {discoveryAnswered && (
                    <span className="text-base font-bold ml-2">
                      {i === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗'}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 rounded-xl bg-slate-850 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div>
                  <p className={`text-sm font-bold flex items-center gap-1.5 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    <span>{discoveryCorrect ? '✓ Spot On!' : '💡 Key Concept:'}</span>
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  aria-label="Enter Interactive Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (LEARN BY DOING WITH 3+ TOPIC SVGS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Progress & Navigation */}
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-indigo-400 uppercase">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
            </span>
            <div className="flex gap-1.5" aria-label={`Lab progress step ${currentSlide + 1} of ${EXPLORATION_STEPS.length}`}>
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    i === currentSlide ? 'bg-indigo-500' : i < currentSlide ? 'bg-indigo-900' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Workspace */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div className="border-l-4 border-indigo-500 pl-3">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-xs sm:text-sm text-indigo-300 mt-0.5">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* LAB 1: ACTIVITY SPECTRUM (TOPIC SVG 1) */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'doctor', label: 'Doctor at Apollo Clinic', tag: 'Profession' },
                      { id: 'farmer', label: 'Amul Dairy Cow Breeder', tag: 'Genetic Industry' },
                      { id: 'homemaker', label: 'Homemaker Cooking Dinner', tag: 'Domestic Non-Econ' },
                      { id: 'akshaya', label: 'Akshaya Patra Mid-Day Meals', tag: 'Charitable Non-Econ' },
                    ].map((tab) => (
                      <motion.button
                        key={tab.id}
                        aria-label={`Select ${tab.label}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedActivityTab(tab.id as 'doctor' | 'farmer' | 'homemaker' | 'akshaya');
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedActivityTab === tab.id
                            ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg'
                            : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <p className="text-xs font-bold truncate">{tab.label}</p>
                        <span className="text-[10px] text-indigo-300">{tab.tag}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Dynamic Activity Visualizer (TOPIC SVG 1) */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 200" className="w-full h-auto" aria-label="Human Activities Classification Map Diagram">
                      <rect x="20" y="20" width="260" height="160" rx="12" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1.5" />
                      <text x="150" y="45" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="bold">
                        ECONOMIC BRANCH (Livelihood)
                      </text>

                      <rect x="320" y="20" width="260" height="160" rx="12" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" />
                      <text x="450" y="45" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="bold">
                        NON-ECONOMIC BRANCH (Duty & Love)
                      </text>

                      {/* Animated spotlight on active selection */}
                      {selectedActivityTab === 'doctor' && (
                        <g>
                          <circle cx="150" cy="110" r="38" fill="#4338ca" />
                          <text x="150" y="105" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Apollo Clinic</text>
                          <text x="150" y="125" textAnchor="middle" fill="#a5b4fc" fontSize="9">Fees • NMC Act 2019</text>
                        </g>
                      )}
                      {selectedActivityTab === 'farmer' && (
                        <g>
                          <circle cx="150" cy="110" r="38" fill="#4338ca" />
                          <text x="150" y="105" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Amul Breeder</text>
                          <text x="150" y="125" textAnchor="middle" fill="#a5b4fc" fontSize="9">Profit • Primary Genetic</text>
                        </g>
                      )}
                      {selectedActivityTab === 'homemaker' && (
                        <g>
                          <circle cx="450" cy="110" r="38" fill="#15803d" />
                          <text x="450" y="105" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Home Cooking</text>
                          <text x="450" y="125" textAnchor="middle" fill="#bbf7d0" fontSize="9">Love/Care • Zero Money</text>
                        </g>
                      )}
                      {selectedActivityTab === 'akshaya' && (
                        <g>
                          <circle cx="450" cy="110" r="38" fill="#15803d" />
                          <text x="450" y="105" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Akshaya Patra</text>
                          <text x="450" y="125" textAnchor="middle" fill="#bbf7d0" fontSize="9">Sec 12A IT Act • Charity</text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* LAB 2: ECONOMIC TRIAD COMPARATOR */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Capital Commitment</span>
                        <span className="text-indigo-400 font-bold">{triadCapital > 60 ? 'High (Business)' : triadCapital > 20 ? 'Modest (Profession)' : 'Nil (Employment)'}</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Adjust Capital Commitment Slider"
                        min={0}
                        max={100}
                        value={triadCapital}
                        onChange={(e) => {
                          setTriadCapital(Number(e.target.value));
                          audioManager.play('pop');
                        }}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Risk & Liability Exposure</span>
                        <span className="text-amber-400 font-bold">{triadRisk > 60 ? 'Full Capital Loss' : triadRisk > 20 ? 'Professional Liability' : 'Nil (Salary Guaranteed)'}</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Adjust Risk and Liability Exposure Slider"
                        min={0}
                        max={100}
                        value={triadRisk}
                        onChange={(e) => {
                          setTriadRisk(Number(e.target.value));
                          audioManager.play('pop');
                        }}
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>

                  {/* Comparative Matrix Cards */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className={`p-3 rounded-xl border transition-all ${triadCapital > 50 && triadRisk > 50 ? 'bg-indigo-950 border-indigo-500 ring-2 ring-indigo-500/50' : 'bg-slate-900 border-slate-800'}`}>
                      <p className="text-xs font-bold text-white">Business</p>
                      <p className="text-[11px] text-emerald-400 mt-1">Reward: Profit</p>
                      <p className="text-[10px] text-slate-400">Owner bears full risk</p>
                    </div>
                    <div className={`p-3 rounded-xl border transition-all ${triadCapital <= 50 && triadCapital > 20 ? 'bg-indigo-950 border-indigo-500 ring-2 ring-indigo-500/50' : 'bg-slate-900 border-slate-800'}`}>
                      <p className="text-xs font-bold text-white">Profession</p>
                      <p className="text-[11px] text-indigo-400 mt-1">Reward: Fees</p>
                      <p className="text-[10px] text-slate-400">ICAI / NMC / Bar Council</p>
                    </div>
                    <div className={`p-3 rounded-xl border transition-all ${triadCapital <= 20 && triadRisk <= 20 ? 'bg-indigo-950 border-indigo-500 ring-2 ring-indigo-500/50' : 'bg-slate-900 border-slate-800'}`}>
                      <p className="text-xs font-bold text-white">Employment</p>
                      <p className="text-[11px] text-sky-400 mt-1">Reward: Salary</p>
                      <p className="text-[10px] text-slate-400">Contract of service</p>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: MSME DUAL-THRESHOLD MATRIX (TOPIC SVG 2) */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/70 rounded-xl border border-indigo-800 space-y-2">
                      <p className="text-xs font-bold text-indigo-300">PREDICTION CHALLENGE:</p>
                      <p className="text-sm font-medium text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Select prediction: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 rounded-lg text-left text-xs bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TOPIC SVG 2: MSME DUAL THRESHOLD COORDINATE PLANE */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 180" className="w-full h-auto" aria-label="MSME 2020 Dual-Criteria Matrix Diagram">
                      <rect x="10" y="10" width="580" height="160" rx="8" fill="#0f172a" />
                      {/* Grid areas */}
                      <rect x="50" y="120" width="80" height="40" fill="#065f46" fillOpacity="0.4" stroke="#10b981" />
                      <text x="90" y="145" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">MICRO</text>
                      
                      <rect x="130" y="80" width="160" height="80" fill="#1e3a8a" fillOpacity="0.4" stroke="#3b82f6" />
                      <text x="210" y="125" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">SMALL</text>

                      <rect x="290" y="30" width="240" height="130" fill="#78350f" fillOpacity="0.4" stroke="#f59e0b" />
                      <text x="410" y="95" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">MEDIUM</text>

                      {/* Axes */}
                      <line x1="50" y1="160" x2="550" y2="160" stroke="#94a3b8" strokeWidth="1.5" />
                      <line x1="50" y1="20" x2="50" y2="160" stroke="#94a3b8" strokeWidth="1.5" />
                      <text x="540" y="155" fill="#94a3b8" fontSize="9">Turnover (₹ Cr)</text>
                      <text x="55" y="30" fill="#94a3b8" fontSize="9">Inv (₹ Cr)</text>

                      {/* Dynamic Marker */}
                      {(() => {
                        const markerX = Math.min(530, 50 + (msmeTurnover / 250) * 450);
                        const markerY = Math.max(35, 160 - (msmeInvestment / 50) * 125);
                        return (
                          <g>
                            <circle cx={markerX} cy={markerY} r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                            <text x={markerX} y={markerY - 10} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                              ₹{msmeInvestment}Cr / ₹{msmeTurnover}Cr
                            </text>
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Plant & Machinery Investment</span>
                        <span className="text-white font-bold">₹ {msmeInvestment} Crore</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Adjust MSME Plant & Machinery Investment Slider"
                        min={0.2}
                        max={60}
                        step={0.5}
                        value={msmeInvestment}
                        onChange={(e) => {
                          setMsmeInvestment(Number(e.target.value));
                          audioManager.play('pop');
                        }}
                        className="w-full accent-indigo-500"
                      />
                      <p className="text-[10px] text-slate-500">Micro ≤ ₹1Cr | Small ≤ ₹10Cr | Medium ≤ ₹50Cr</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Annual Gross Turnover</span>
                        <span className="text-white font-bold">₹ {msmeTurnover} Crore</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Adjust MSME Annual Gross Turnover Slider"
                        min={1}
                        max={300}
                        step={1}
                        value={msmeTurnover}
                        onChange={(e) => {
                          setMsmeTurnover(Number(e.target.value));
                          audioManager.play('pop');
                        }}
                        className="w-full accent-indigo-500"
                      />
                      <p className="text-[10px] text-slate-500">Micro ≤ ₹5Cr | Small ≤ ₹50Cr | Medium ≤ ₹250Cr</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border flex items-center justify-between ${dynamicMsmeCategory.bg}`}>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">MSME Act 2020 Statutory Classification:</p>
                      <h4 className="text-xl font-extrabold">{dynamicMsmeCategory.category} ENTERPRISE</h4>
                    </div>
                    <div className="text-right text-xs">
                      <p>Inv Test: {msmeInvestment <= 1 ? 'Micro' : msmeInvestment <= 10 ? 'Small' : msmeInvestment <= 50 ? 'Medium' : 'Large'}</p>
                      <p>Turnover Test: {msmeTurnover <= 5 ? 'Micro' : msmeTurnover <= 50 ? 'Small' : msmeTurnover <= 250 ? 'Medium' : 'Large'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 4: COMMERCE TREE & 6 AIDS (TOPIC SVG 3) */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {!observationAnswered && (
                    <div className="p-4 bg-amber-950/60 rounded-xl border border-amber-800 space-y-2">
                      <p className="text-xs font-bold text-amber-400">OBSERVATION CHECK:</p>
                      <p className="text-sm text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Select observation: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2.5 rounded-lg text-left text-xs bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TOPIC SVG 3: THE TREE OF COMMERCE & 6 AIDS ARCHITECTURE */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 200" className="w-full h-auto" aria-label="Tree of Commerce and 6 Aids to Trade Diagram">
                      {/* Root: Business */}
                      <rect x="230" y="10" width="140" height="30" rx="6" fill="#4338ca" />
                      <text x="300" y="30" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">BUSINESS</text>

                      {/* Connectors */}
                      <path d="M 270 40 L 140 70" stroke="#6366f1" strokeWidth="2" fill="none" />
                      <path d="M 330 40 L 460 70" stroke="#6366f1" strokeWidth="2" fill="none" />

                      {/* Branch 1: Industry */}
                      <rect x="70" y="70" width="140" height="28" rx="6" fill="#1e293b" stroke="#3b82f6" />
                      <text x="140" y="88" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">INDUSTRY (Form Utility)</text>

                      {/* Branch 2: Commerce */}
                      <rect x="390" y="70" width="140" height="28" rx="6" fill="#1e293b" stroke="#10b981" />
                      <text x="460" y="88" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">COMMERCE</text>

                      {/* Sub-branches under Commerce */}
                      <path d="M 430 98 L 360 130" stroke="#10b981" strokeWidth="1.5" fill="none" />
                      <path d="M 490 98 L 510 130" stroke="#10b981" strokeWidth="1.5" fill="none" />

                      <rect x="300" y="130" width="110" height="25" rx="5" fill="#0f766e" />
                      <text x="355" y="147" textAnchor="middle" fill="#ccfbf1" fontSize="9" fontWeight="bold">TRADE (Internal / Foreign)</text>

                      <rect x="430" y="130" width="150" height="25" rx="5" fill="#047857" />
                      <text x="505" y="147" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">6 AIDS TO TRADE</text>

                      {/* Aids highlight bar */}
                      <rect x="50" y="168" width="500" height="24" rx="4" fill="#111827" stroke="#4b5563" />
                      <text x="300" y="184" textAnchor="middle" fill="#e2e8f0" fontSize="9">
                        Transport (Place) • Warehousing (Time) • Banking • Finance • Insurance (Risk) • Advertising
                      </text>
                    </svg>
                  </div>

                  {/* Interactive Mango Supply Chain Map */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Ratnagiri Alphonso Mangoes → Delhi Retail Chain
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { title: '1. Transport', sub: 'Place Hindrance (VRL Trucks)' },
                        { title: '2. Warehousing', sub: 'Time Hindrance (CONCOR Cold Vault)' },
                        { title: '3. Banking', sub: 'Short-term Working Capital (SBI)' },
                        { title: '4. Finance', sub: 'Long-term Growth (BSE SME Platform)' },
                        { title: '5. Insurance', sub: 'Risk of Peril (ICICI Lombard)' },
                        { title: '6. Advertising', sub: 'Knowledge Gap (ASCI TV/Social Ads)' },
                      ].map((aid, idx) => (
                        <motion.button
                          key={idx}
                          aria-label={`Activate aid: ${aid.title}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setActiveAidStep(idx);
                            audioManager.play('tap');
                          }}
                          className={`p-3 rounded-xl text-left border transition-all ${
                            activeAidStep === idx
                              ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <p className="text-xs font-bold">{aid.title}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{aid.sub}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: DUAL OBJECTIVES & SOLE PROPRIETOR LIABILITY */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Section 135 CSR Calculator */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase">
                        1. Companies Act Sec 135 CSR Mandate
                      </h4>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">3-Yr Avg Net Profit</span>
                        <span className="text-emerald-400 font-bold">₹ {csrProfitInput} Crore</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Adjust Section 135 CSR 3-Year Average Net Profit Slider"
                        min={0}
                        max={1000}
                        step={10}
                        value={csrProfitInput}
                        onChange={(e) => {
                          setCsrProfitInput(Number(e.target.value));
                          audioManager.play('pop');
                        }}
                        className="w-full accent-emerald-500"
                      />
                      <div className="p-3 bg-emerald-950/40 rounded-lg border border-emerald-800/40 flex justify-between items-center text-xs">
                        <span>Mandatory 2% CSR Spend:</span>
                        <span className="text-base font-extrabold text-emerald-300">₹ {calculatedCsr} Crore</span>
                      </div>
                    </div>

                    {/* Sole Proprietorship Unlimited Liability Shock Meter */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-rose-400 uppercase">
                        2. Sole Proprietor Unlimited Liability
                      </h4>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Business Debt Shock</span>
                        <span className="text-rose-400 font-bold">₹ {proprietorDebt} Lakh</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Adjust Business Debt Shock Slider"
                        min={5}
                        max={80}
                        value={proprietorDebt}
                        onChange={(e) => {
                          setProprietorDebt(Number(e.target.value));
                          audioManager.play('pop');
                        }}
                        className="w-full accent-rose-500"
                      />
                      <div className="p-3 bg-rose-950/40 rounded-lg border border-rose-800/40 text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Shop Assets Cover:</span>
                          <span className="text-white">₹ {proprietorShopAssets} Lakh</span>
                        </div>
                        <div className="flex justify-between font-bold text-rose-300">
                          <span>Personal Assets Seized:</span>
                          <span>- ₹ {liabilityDeficit} Lakh</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-300 pt-1 border-t border-rose-900/50">
                          <span>Remaining House Equity:</span>
                          <span className="font-bold text-emerald-400">₹ {remainingPersonalWealth} Lakh</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={handlePrevSlide}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 disabled:opacity-40 text-sm font-semibold border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            <motion.button
              aria-label={currentSlide < EXPLORATION_STEPS.length - 1 ? 'Go to next lab' : 'Enter free sandbox'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextSlide}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30"
            >
              {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Enter Free Sandbox →'}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-white">Commercial Systems Sandbox</h3>
                <p className="text-xs text-slate-400">Zero pressure testing environment. Manipulate any parameter freely.</p>
              </div>
              <div className="flex gap-2">
                {(['msme', 'supply', 'liability'] as const).map((m) => (
                  <button
                    key={m}
                    aria-label={`Switch sandbox mode to ${m}`}
                    onClick={() => setSandboxMode(m)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                      sandboxMode === m ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Sandbox Canvas Live Visual */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <canvas ref={canvasRef} width={600} height={60} className="w-full h-auto" />
            </div>

            {/* Mode Controls */}
            {sandboxMode === 'msme' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Investment: ₹ {msmeInvestment} Cr</span>
                  </div>
                  <input
                    type="range"
                    aria-label="Sandbox MSME Investment Slider"
                    min={0.5}
                    max={60}
                    step={0.5}
                    value={msmeInvestment}
                    onChange={(e) => setMsmeInvestment(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Turnover: ₹ {msmeTurnover} Cr</span>
                  </div>
                  <input
                    type="range"
                    aria-label="Sandbox MSME Turnover Slider"
                    min={1}
                    max={300}
                    step={1}
                    value={msmeTurnover}
                    onChange={(e) => setMsmeTurnover(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>
            )}

            {sandboxMode === 'supply' && (
              <div className="p-4 bg-slate-950 rounded-xl text-center space-y-2">
                <p className="text-xs text-indigo-300">Industry (Form) ➔ Transport (Place) ➔ Warehouse (Time) ➔ Trade (Possession)</p>
                <p className="text-xs text-slate-400">All 6 Aids to Trade are currently active and running at 100% capacity.</p>
              </div>
            )}

            {sandboxMode === 'liability' && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Simulate Debt Shock: ₹ {proprietorDebt} Lakh</span>
                  <span className="text-rose-400 font-bold">Personal Asset Attachment: ₹ {liabilityDeficit} Lakh</span>
                </div>
                <input
                  type="range"
                  aria-label="Sandbox Sole Proprietor Debt Shock Slider"
                  min={5}
                  max={100}
                  value={proprietorDebt}
                  onChange={(e) => setProprietorDebt(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <motion.button
                aria-label="Proceed to competency challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Ready for Competency Challenges! →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES & ESCALATING HINTS ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800 gap-3">
            <div>
              <span className="text-xs font-semibold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wide border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : difficulty === 'standard'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}
                >
                  {difficulty} TIER
                </motion.span>
                <span className="text-xs text-indigo-400 font-bold uppercase">
                  • NEP Level: {challenge.competencyLevel}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400">Adaptive Mastery:</span>
              <p className="text-sm font-bold text-emerald-400 capitalize">{masteryLevel}</p>
            </div>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed mb-4">
              {challenge.question}
            </p>

            {/* MCQ Types (classify, distinguish, match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={showExplanation}
                      onClick={() => handleAnswer(i)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl text-sm font-medium transition-all border flex items-center justify-between ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-xs font-bold text-center leading-6 mr-2.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </span>
                      {showExplanation && (
                        <span className="text-base font-bold ml-2">
                          {i === challenge.correctIndex ? '✓' : '✗'}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'slot_place', label: 'Hindrance of Place' },
                    { id: 'slot_time', label: 'Hindrance of Time' },
                    { id: 'slot_risk', label: 'Hindrance of Risk' },
                    { id: 'slot_knowledge', label: 'Hindrance of Knowledge' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-dashed border-slate-700 text-slate-400'
                      }`}
                      aria-label={`Drop slot for ${target.label}, current value: ${droppedLabels[target.id] || 'Empty'}`}
                    >
                      <p className="text-[11px] font-semibold text-slate-400">{target.label}</p>
                      <p className="text-sm font-bold mt-2 text-white flex items-center justify-center gap-1">
                        {droppedLabels[target.id] ? (
                          <>
                            <span>✓</span>
                            <span>{droppedLabels[target.id]}</span>
                          </>
                        ) : (
                          'Drop Here'
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify all drag and drop matches"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify All Matches
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-[10px] font-bold text-center leading-5 text-white">
                      {displayIdx + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Validate the arranged sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Validate Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label="Numeric answer input"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold text-sm w-48 focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-sm font-semibold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Check numeric calculation"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Check Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add component: ${part}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-semibold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2">
                  {constructParts.map((p, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1 bg-indigo-900 border border-indigo-500 text-indigo-200 rounded-lg text-xs flex items-center gap-2"
                    >
                      {p}
                      <button
                        aria-label={`Remove ${p}`}
                        onClick={() => setConstructParts((prev) => prev.filter((_, j) => j !== idx))}
                        className="text-rose-400 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 self-center">Click components above to assemble the export infrastructure.</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify constructed export architecture"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Export Architecture
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Step-by-Step Progressive Disclosure Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-br from-indigo-950/80 to-slate-900 rounded-2xl border border-indigo-700/60 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-indigo-400 text-sm font-bold">📖 Step-by-Step Statutory Breakdown:</span>
              </div>

              <div className="space-y-2">
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-indigo-200 leading-relaxed"
                    >
                      <span className="font-bold text-indigo-400 mr-1.5">{i + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                {revealedSteps <
                challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal next reasoning step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finish simulation' : 'Go to next challenge'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Finish Simulation →'
                      : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION SECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-3xl">
              🏆
            </div>
            <h2 className="text-2xl font-extrabold text-white">Simulation Complete!</h2>
            <p className="text-sm text-slate-300">
              Final Score: <span className="text-emerald-400 font-bold">{Math.max(0, 100 - errors * 5)}%</span> • Mastery Tier:{' '}
              <span className="text-indigo-400 font-bold capitalize">{masteryLevel}</span>
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/40">
            <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed font-medium">
              {errors === 0
                ? '🌟 Flawless Mastery! You demonstrated exceptional comprehension of Indian commercial systems, MSME thresholds, and statutory governance.'
                : errors <= 3
                ? '👏 Great work! You have a solid grasp of human activities, commercial aids, and business liability. Review your specific gaps below.'
                : '💪 Keep building! Commercial studies takes time to internalize. Review the misconception notes and spaced repetition schedule.'}
            </p>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/40 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Feedback:
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl text-xs space-y-1 border border-slate-800">
                    <p className="text-rose-400 font-semibold">✗ {m.misconception}</p>
                    <p className="text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── MANDATORY REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="text-xl">🤔</span>
              <h3 className="text-base font-bold text-white">Post-Simulation Reflection</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  aria-label="Reflection question: What was the most surprising thing you learned?"
                  rows={2}
                  value={reflections.surprising}
                  onChange={(e) => setReflections({ ...reflections, surprising: e.target.value })}
                  placeholder="e.g., How breaching turnover in MSME changes classification even if investment is low..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  aria-label="Reflection question: How would you explain this to a friend?"
                  rows={2}
                  value={reflections.explain}
                  onChange={(e) => setReflections({ ...reflections, explain: e.target.value })}
                  placeholder="e.g., Business makes goods, trade sells them, and the 6 aids bridge place, time, risk and knowledge..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  aria-label="Reflection question: Where in real life might you use this?"
                  rows={2}
                  value={reflections.realLife}
                  onChange={(e) => setReflections({ ...reflections, realLife: e.target.value })}
                  placeholder="e.g., When launching an MSME startup or advising a family business on unlimited liability..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-400">
                  {reflectionSaved ? '✓ Reflection responses saved!' : 'Take a moment to internalize key concepts.'}
                </span>
                <motion.button
                  aria-label="Save reflections"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setReflectionSaved(true);
                    audioManager.play('success');
                  }}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Save Reflection
                </motion.button>
              </div>
            </div>
          </div>

          {/* Spaced Repetition Visibility */}
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800/40 text-xs text-amber-200">
            <p className="font-bold">📅 Spaced Repetition (SM-2 Algorithm):</p>
            <p className="mt-1 text-slate-300">
              Your next review interval is scheduled in{' '}
              <strong className="text-amber-400">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</strong>.
              Regular retrieval reinforces memory retention for ISC Board Exams.
            </p>
          </div>

          {/* Real-World Capstone Activity */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 to-slate-900 rounded-3xl border border-indigo-800/50 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💼</span>
              <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="flex gap-2.5 text-xs text-slate-300">
                  <span className="font-bold text-indigo-400">{i + 1}.</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C11_CommerceClassificationHumanActivitiesSim;